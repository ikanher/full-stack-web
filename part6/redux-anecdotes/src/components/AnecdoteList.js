import React from 'react'

import Anecdote from './Anecdote.js'
import { voteAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState().sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    const voteHandler = (id) => store.dispatch(voteAnecdote(id))

    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={voteHandler} />)}
        </>
    )
}

export default AnecdoteList
