import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
    class ValidationError extends Error {
        constructor(message) {
            super(message)
            this.name = 'ValidationError'
        }
    }

    const validateLen = (field, str, minLen) => {
        if (str.length < minLen + 1) {
            throw new ValidationError(`${field} must be at least ${minLen} characters long`)
        }
    }

    try {
        const { username, name, password } = req.body

        validateLen('Username', username, 3)
        validateLen('Password', password, 3)

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: username,
            name: name,
            passwordHash: passwordHash,
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

export default usersRouter
