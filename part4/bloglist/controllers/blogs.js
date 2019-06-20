import express from 'express'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })

    try {
        const result = await blog.save()
        res.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
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
