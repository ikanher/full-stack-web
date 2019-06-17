import React, { useState, useEffect } from 'react'

import Phonebook from './components/Phonebook.js'
import personService from './services/persons.js'

const App = () => {
    const notificationTimeout = 2000
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ notification, setNotification ] = useState({})

    const handleFilterChange = (event) => setFilter(event.target.value)
    const handleAddPerson = (event) => {
        event.preventDefault()

        const existing = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())
        if (existing.length > 0) {

            // exists, get id of the object
            const id = existing[0].id

            personService.get(id).then(person => {
                const msg = `${person.name} exists. Update?`
                if (window.confirm(msg)) {
                    // update the number
                    person.number = newNumber
                    personService.update(person).then(() => {
                        const newPersons = persons.filter(p => p.id !== id).concat(person)
                        setPersons(newPersons)
                        setNotification({ msg: `Number updated for ${person.name}!`, color: 'green' })
                        setTimeout(() => setNotification({}), notificationTimeout)
                    })
                }
            }).catch(() => {
                const msg = `${newName} has already been removed from server...`
                setNotification({ msg: msg, color: 'red' })
                setTimeout(() => setNotification({}), notificationTimeout)
                const newPersons = persons.filter(p => p.id !== id)
                setPersons(newPersons)
            })
        } else {
            // does not exist, create
            const entry = { name: newName, number: newNumber }
            personService.create(entry).then(person => {
                setPersons(persons.concat(person))
                setNotification({ msg: `${person.name} added!`, color: 'green' })
                setTimeout(() => setNotification({}), notificationTimeout)
            }).catch(error => {
                setNotification({ msg: error.response.data.error, color: 'red' })
                setTimeout(() => setNotification({}), notificationTimeout)
            })
        }

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    useEffect(() => {
        personService.getAll().then(persons => setPersons(persons) )
    }, [])

    const handleDeleteClick = (event) => {
        const id = event.target.value
        personService.get(id).then(person => {
            if (window.confirm(`Delete ${person.name}?`)) {
                personService.remove(id).then(() => {
                    const newPersons = persons.filter(p => p.id !== id)
                    setPersons(newPersons)
                })
            }
        })
    }

    return <Phonebook
        persons={persons}
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleDeleteClick={handleDeleteClick}
        notification={notification}
    />
}

export default App
