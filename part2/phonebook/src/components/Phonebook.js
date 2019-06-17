import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    if (!message.msg) {
        return null
    }
    const style = {
        'padding': '20px',
        'backgroundColor': message.color,
        'color': 'white',
        'marginBottom': '15px'
    }

    return (
        <div style={style}>
            {message.msg}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
}

const Phonebook = ({
    persons, handleAddPerson,
    newName, handleNameChange,
    newNumber, handleNumberChange,
    filter, handleFilterChange,
    handleDeleteClick,
    notification
}) => {

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <PersonForm
                newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange}
                handleAddPerson={handleAddPerson}
            />
            <Persons entries={persons} filter={filter} handleDeleteClick={handleDeleteClick} />
        </div>
    )
}

Phonebook.propTypes = {
    persons: PropTypes.array,
    newName: PropTypes.string,
    newNumber: PropTypes.string,
    filter: PropTypes.string,
    notification: PropTypes.string,
    handleAddPerson: PropTypes.func,
    handleNameChange: PropTypes.func,
    handleNumberChange: PropTypes.func,
    handleFilterChange: PropTypes.func,
    handleDeleteClick: PropTypes.func,
}

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <>
            Filter shown with
            <input type='text' value={filter} onChange={handleFilterChange} />
        </>
    )
}

Filter.propTypes = {
    filter: PropTypes.string,
    handleFilterChange: PropTypes.func,
}

const PersonForm = ({
    newName, handleNameChange,
    newNumber, handleNumberChange,
    handleAddPerson,
}) => {

    return (
        <form onSubmit={handleAddPerson}>
            <div>
            name: <input value={newName} onChange={handleNameChange} />
                <br />
            number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

PersonForm.propTypes = {
    newName: PropTypes.string,
    newNumber: PropTypes.string,
    handleNameChange: PropTypes.func,
    handleNumberChange: PropTypes.func,
    handleAddPerson: PropTypes.func,
}

const Persons = ({ entries, filter, handleDeleteClick }) => {
    const rows = entries
        .filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
        .map(e => <Person key={e.name} entry={e} handleDeleteClick={handleDeleteClick} />)

    return (
        <>
            <h2>Persons</h2>
            {rows}
        </>
    )
}

Persons.propTypes = {
    entries: PropTypes.array,
    filter: PropTypes.string,
    handleDeleteClick: PropTypes.func,
}

const Person = ({ entry, handleDeleteClick }) => {
    const DeleteButton = ({ entry }) => {
        return <button value={entry.id} onClick={handleDeleteClick}>Delete</button>
    }

    return (
        <p>{entry.name} {entry.number} <DeleteButton entry={entry} /> </p>
    )
}

Person.propTypes = {
    entry: PropTypes.object,
    handleDeleteClick: PropTypes.func,
}

export default Phonebook
