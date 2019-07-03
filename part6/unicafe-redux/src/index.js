import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
    const goodHandler = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }

    const okHandler = () => {
        store.dispatch({
            type: 'OK'
        })
    }

    const badHandler = () => {
        store.dispatch({
            type: 'BAD'
        })
    }

    const resetHandler = () => {
        store.dispatch({
            type: 'RESET'
        })
    }

    return (
        <div>
            <button onClick={goodHandler}>good</button>
            <button onClick={okHandler}>neutral</button>
            <button onClick={badHandler}>bad</button>
            <button onClick={resetHandler}>reset stats</button>
            <div>good {store.getState().good}</div>
            <div>neutral {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()

store.subscribe(renderApp)
