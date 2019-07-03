import React from 'react'

import Anecdote from './Anecdote.js'

import { voteAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification, clearNotification } from '../reducers/notificationReducer.js'

const AnecdoteList = ({ store }) => {
    const notificationTimeout = 5000
    const filter = store.getState().filter

    const anecdotes = store.getState().anecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => (a.votes < b.votes) ? 1 : -1)

    const voteHandler = (id) => {
        store.dispatch(voteAnecdote(id))
        const anecdote = store.getState().anecdotes.find(a => a.id === id).content
        store.dispatch(setNotification(`You voted '${anecdote}'`))
        setTimeout(() => store.dispatch(clearNotification()), notificationTimeout)
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={voteHandler} />)}
        </>
    )
}

export default AnecdoteList
