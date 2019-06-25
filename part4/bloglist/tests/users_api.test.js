import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app.js'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const api = supertest(app)

describe('when there is initially one user at db', () => {
    beforeEach(async () => { await Blog.remove({})
        await User.deleteMany({})
        const user = new User({ username: 'root', passwordHash: 'quuxquux' })
        await user.save()
    })

    afterAll(() => {
        mongoose.connection.close()
    })


    test('creation succeeds with a fresh username', async () => {
        const newUser = {
            username: 'foobar',
            name: 'Foo Bar',
            password: 'barfbarf',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users').expect(200)
        expect(response.body.length).toBe(2)

        const usernames = response.body.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const newUser = {
            username: 'root',
            name: 'Second Root',
            password: 'quuxquux',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const response = await api.get('/api/users').expect(200)
        expect(response.body.length).toBe(1)
    })

    test('creation fails with too short username', async () => {
        const newUser = {
            username: 'fo',
            name: 'Foo Bar',
            password: 'barfbarf',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username must be at least 3 char')

        const response = await api.get('/api/users').expect(200)
        expect(response.body.length).toBe(1)
    })

    test('creation fails with too short password', async () => {
        const newUser = {
            username: 'foobar',
            name: 'Foo Bar',
            password: 'ba',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password must be at least 3 char')

        const response = await api.get('/api/users').expect(200)
        expect(response.body.length).toBe(1)
    })
})


