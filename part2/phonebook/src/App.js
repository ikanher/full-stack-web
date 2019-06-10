import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Phonebook from './components/Phonebook.js'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const handleFilterChange = (event) => setFilter(event.target.value)
    const handleAddPerson = (event) => {
        event.preventDefault()

        const exists = persons.some(p => p.name.toLowerCase() === newName.toLowerCase())

        if (exists) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }))
        }

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    useEffect(() => {
        const eventHandler = (response) => {
            setPersons(response.data.persons)
        }
        const promise = axios.get('http://localhost:3001/db')
        promise.then(eventHandler)
    }, [])

    return <Phonebook
        persons={persons}
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        filter={filter}
        handleFilterChange={handleFilterChange}
    />
}

export default App
