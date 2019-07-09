import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer.js'
import loginReducer from './reducers/loginReducer.js'
import notificationReducer from './reducers/notificationReducer.js'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: loginReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
