import React from 'react'

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
                persons={persons} handleAddPerson={handleAddPerson}
                newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange}
            />
            <Persons entries={persons} filter={filter} handleDeleteClick={handleDeleteClick} />
        </div>
    )
}

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <>
            Filter shown with
            <input type='text' value={filter} onChange={handleFilterChange} />
        </>
    )
}

const PersonForm = ({
        persons, handleAddPerson,
        newName, handleNameChange,
        newNumber, handleNumberChange
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

const Person = ({ entry, handleDeleteClick }) => {
    const DeleteButton = ({ entry }) => {
        return <button value={entry.id} onClick={handleDeleteClick}>Delete</button> 
    }

    return (
        <p>{entry.name} {entry.number} <DeleteButton entry={entry} /> </p>
    )
}

export default Phonebook
