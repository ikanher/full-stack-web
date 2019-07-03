import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteForm = ({ store }) => {

    const submitHandler = (event) => {
        event.preventDefault()
        store.dispatch(
            createAnecdote(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
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
