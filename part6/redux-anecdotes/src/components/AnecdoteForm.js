import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = (props) => {

    const submitHandler = async (event) => {
        event.preventDefault()

        const anecdote = {
            content: event.target.anecdote.value,
            votes: 0,
        }

        event.target.anecdote.value = ''

        props.createAnecdote(anecdote)
        props.setNotification(`Added anecdote '${anecdote.content}'`)
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
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
