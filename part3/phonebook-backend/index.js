import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config.js'

import Person from './models/person.mjs'

const app = express()

// middleware

// frontend
app.use(express.static('build'))

// json body parser
app.use(bodyParser.json())

// morgan body token
morgan.token('body', (req) => JSON.stringify(req.body))

// logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// routes
app.get('/info', (req, res) => {
    Person.estimatedDocumentCount().then(count => {
        res.send(`Phonebook has info for ${count} people.<br/><br/>${new Date()}`)
    }).catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => res.json(persons.map(p => p.toJSON())))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(note => {
        if (note) {
            res.json(note.toJSON())
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({ error: 'name missing in request' })
    }
    if (!req.body.number) {
        res.status(400).json({ error: 'number missing in request' })
    }
    Person.find({ name: req.body.name }).then(response => {
        if (response.length > 0) {
            res.status(400).json({ error: 'name must unique' })
        }
    }).catch(error => next(error))

    const person = new Person({
        name: req.body.name,
        number: req.body.number,
    })

    person.save().then(p => res.json(p.toJSON())).catch(error => next(Error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

// unknown endpoint handler
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// malformed id handler
const errorHandler = (error, req, res, next) => {
    console.error(`! Error: ${error.message}`)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
