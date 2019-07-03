import React from 'react'

import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'

const App = ({ store }) => {
    return (
        <div>
            <Notification store={store} />
            <Filter store={store} />
            <AnecdoteList store={store} />
            <AnecdoteForm store={store} />
        </div>
    )
}

export default App
