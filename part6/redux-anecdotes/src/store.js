import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer  from './reducers/anecdoteReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import filterReducer from './reducers/filterReducer.js'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
