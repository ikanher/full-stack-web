import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import config from './utils/config.js'
import blogsRouter from './controllers/blogs.js'

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

export default app
