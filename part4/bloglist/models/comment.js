import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
