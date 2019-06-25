import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    url: { type: String, required: true },
    likes: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
