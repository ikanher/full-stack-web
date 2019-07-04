import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification, clearNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = (props) => {

    const submitHandler = (event) => {
        const notificationTimeout = 5000
        const anecdote = event.target.anecdote.value
        event.preventDefault()
        props.createAnecdote(anecdote)
        event.target.anecdote.value = ''

        props.setNotification(`Added anecdote '${anecdote}'`)
        setTimeout(() => props.clearNotification(), notificationTimeout)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitHandler}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    clearNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
