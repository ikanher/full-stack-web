import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification, clearNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = ({ store }) => {

    const submitHandler = (event) => {
        const notificationTimeout = 5000
        const anecdote = event.target.anecdote.value
        event.preventDefault()
        store.dispatch(createAnecdote(anecdote))
        event.target.anecdote.value = ''

        store.dispatch(setNotification(`Added anecdote '${anecdote}'`))
        setTimeout(() => store.dispatch(clearNotification()), notificationTimeout)
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

export default AnecdoteForm
