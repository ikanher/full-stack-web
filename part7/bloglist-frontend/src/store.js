import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer.js'
import blogDetailReducer from './reducers/blogDetailReducer.js'
import loginReducer from './reducers/loginReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import userReducer from './reducers/userReducer.js'
import userDetailReducer from './reducers/userDetailReducer.js'

const reducer = combineReducers({
    blogs: blogReducer,
    blog: blogDetailReducer,
    notification: notificationReducer,
    loggedInUser: loginReducer,
    users: userReducer,
    user: userDetailReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
