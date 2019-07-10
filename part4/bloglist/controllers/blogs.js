import express from 'express'
import jwt from 'jsonwebtoken'

import Blog from '../models/blog.js'
import Comment from '../models/comment.js'
import User from '../models/user.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { text: 1 })

    res.json(blog)
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id,
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/comments/:id', async (req, res, next) => {
    const body = req.body

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(req.params.id)

        const comment = new Comment({
            text: body.text,
            blog: req.params.id,
        })

        const savedComment = await comment.save()

        blog.comments = blog.comments.concat(savedComment._id)
        const savedBlog = await blog.save()

        await savedBlog
            .populate('user', { username: 1, name: 1 })
            .populate('comments', { text: 1 })
            .execPopulate()

        res.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(req.params.id)

        if (blog.user.toString() === user._id.toString()) {
            await Blog.findByIdAndRemove(req.params.id)
            return res.status(204).end()
        } else {
            return res.status(401).json({ error: 'cannot delete - wrong user' })
        }

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const blog = {
        likes: req.body.likes
    }
    try {
        const updated = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.status(200).json(updated)
    } catch (exception) {
        next(exception)
    }
})

export default blogsRouter
