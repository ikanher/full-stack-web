import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import reducer from './reducers/anecdoteReducer.js'

import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'

const App = ({ store }) => {
    return (
        <div>
            <AnecdoteList store={store} />
            <AnecdoteForm store={store} />
        </div>
    )
}

const store = createStore(reducer)

const renderApp = () => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

renderApp()

store.subscribe(renderApp)

export default App
