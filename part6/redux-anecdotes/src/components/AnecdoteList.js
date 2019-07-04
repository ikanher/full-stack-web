import React from 'react'
import { connect } from 'react-redux'

import Anecdote from './Anecdote.js'

import { voteAnecdote } from '../reducers/anecdoteReducer.js'
import { setNotification, clearNotification } from '../reducers/notificationReducer.js'

const AnecdoteList = (props) => {
    const notificationTimeout = 5000

    const voteHandler = (id) => {
        props.voteAnecdote(id)
        const anecdote = props.anecdotes.find(a => a.id === id).content
        props.setNotification(`You voted '${anecdote}'`)
        setTimeout(() => props.clearNotification(), notificationTimeout)
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {props.anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={voteHandler} />)}
        </>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    return anecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => (a.votes < b.votes) ? 1 : -1)
}

const mapStateToProps = (state) => {
    return {
        anecdotes: anecdotesToShow(state),
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification,
    clearNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
