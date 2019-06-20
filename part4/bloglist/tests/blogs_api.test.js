import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app.js'
import Blog from '../models/blog.js'
import helper from './test_helper.js'

const api = supertest(app)

describe('when there is initially some notes saved', () => {
    beforeEach(async () => { await Blog.remove({})

        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs is returned', async () => {
        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blogs have id field as identifier', async () => {
        const response = await api.get('/api/blogs').expect(200)
        const blogs = response.body
        expect(blogs[0].id).toBeDefined()
    })

    test('creating a new blog adds one to initial blogs', async () => {
        const newBlog = {
            title: 'Just a testing blog',
            author: 'Neil Nobody',
            url: 'http://example.com',
            likes: 0,
        }

        await api.post('/api/blogs').send(newBlog).expect(201)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    })

    test('creating a new blog without likes defaults to 0', async () => {
        const newBlog = {
            title: 'Just a testing blog',
            author: 'Neil Nobody',
            url: 'http://example.com',
        }
        await api.post('/api/blogs').send(newBlog).expect(201)

        const response = await api.get('/api/blogs').expect(200)
        expect(response.body[helper.initialBlogs.length].likes).toBe(0)
    })

    test('creating a new blog without title is a bad request', async () => {
        const newBlog = {
            author: 'Neil Nobody',
            url: 'http://example.com',
        }
        await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('creating a new blog without url is a bad request', async () => {
        const newBlog = {
            title: 'Just a testing blog',
            author: 'Neil Nobody',
        }
        await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('deleting a blog removes it', async () => {
        const id = helper.initialBlogs[0]._id
        await api.delete(`/api/blogs/${id}`).expect(204)
        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBe(helper.initialBlogs.length - 1)
    })

    test('updating a blog with likes updates it', async () => {
        const id = helper.initialBlogs[0]._id
        const likes = 100
        const update = {
            likes: likes
        }
        const response = await api.put(`/api/blogs/${id}`).send(update).expect(200)
        expect(response.body.likes).toBe(likes)
    })
})

