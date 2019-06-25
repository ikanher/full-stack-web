// JSON Web Token Handler
const jwtTokenHandler = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}

// malformed request handler
const errorHandler = (error, req, res, next) => {
    console.error(`! Error: ${error.message}`)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }
    next(error)
}

export default { errorHandler, jwtTokenHandler }
