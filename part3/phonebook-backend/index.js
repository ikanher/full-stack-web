import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    }
]

const app = express()

// middleware
app.use(bodyParser.json())

// cross origin requests
app.use(cors())

// morgan body token
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// frontend
app.use(express.static('build'))

// routes
app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people.<br/><br/>${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id == id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const newPersons = persons.filter(p => p.id !== id)
    persons = newPersons
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const id = Math.round(Math.random() * 10**9) // random id

    let person = req.body
    if (!person.name) {
        res.status(400).json({ error: 'name missing in request' })
    }
    if (!person.number) {
        res.status(400).json({ error: 'number missing in request' })
    }
    if (persons.some(p => p.name === person.name)) {
        res.status(400).json({ error: 'name must unique' })
    }
    person.id = Math.round(Math.random() * 10**9)

    persons.push(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
