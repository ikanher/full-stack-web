import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer.js'
import { localStorageLogin } from './reducers/loginReducer.js'

import Blog from './components/Blog.js'
import BlogForm from './components/BlogForm.js'
import LoggedInUserInfo from './components/LoggedInUserInfo.js'
import LoginForm from './components/LoginForm.js'
import Notification from './components/Notification.js'
import Togglable from './components/Togglable.js'

const App = (props) => {
    useEffect(() => {
        props.localStorageLogin()
        props.initializeBlogs()
    }, [])

    return (
        <div>
            <h1>Blogs</h1>

            <Notification />

            { !props.user ?
                <LoginForm />
                :
                <>
                    <LoggedInUserInfo />
                    {props.blogs.map(b =>
                        <Blog key={b.id} blog={b} />
                    )}
                    <Togglable buttonLabel='New blog'>
                        <BlogForm />
                    </Togglable>
                </>
            }
        </div>
    )
}

const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: sortBlogs(state.blogs),
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    localStorageLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
