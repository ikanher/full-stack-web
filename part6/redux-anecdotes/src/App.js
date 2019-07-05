import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeAnecdotes } from './reducers/anecdoteReducer.js'

import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'

const App = (props) => {
    useEffect(() => {
        props.initializeAnecdotes()
    }, [props])

    return (
        <div>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

const mapDispatchToProps = {
    initializeAnecdotes
}

export default connect(null, mapDispatchToProps)(App)
