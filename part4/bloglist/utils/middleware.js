// malformed request handler
const errorHandler = (error, req, res, next) => {
    console.error(`! Error: ${error.message}`)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    }
    next(error)
}

export default errorHandler
