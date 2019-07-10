import express from 'express'

import Blog from '../models/blog.js'
import Comment from '../models/comment.js'
import User from '../models/user.js'

const testingRouter = express.Router()

testingRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await Comment.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})

export default testingRouter
