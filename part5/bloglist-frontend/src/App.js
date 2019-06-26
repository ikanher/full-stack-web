import React, { useState, useEffect } from 'react'

import loginService from './services/login.js'
import blogService from './services/blogs.js'

import Blog from './components/Blog.js'
import Notification from './components/Notification.js'

const App = () => {
    const NOTIFICATION_TIMEOUT = 3000

    const [ user, setUser ] = useState(null)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ notification, setNotification ] = useState({})

    const [ blogs, setBlogs ] = useState([])
    const [ title, setTitle ] = useState([])
    const [ author, setAuthor ] = useState([])
    const [ url, setUrl ] = useState([])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })

            setUser(user)
            setUsername('')
            setPassword('')

            blogService.setToken(user.token)

            window.localStorage.setItem('user', JSON.stringify(user))
        } catch (exception) {
            setNotification({ msg: 'Wrong credentials', color: 'red' })
            setTimeout(() => setNotification({}), NOTIFICATION_TIMEOUT)
        }
    }

    const loginForm = () => {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input type='text'
                            value={username}
                            name='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                    password
                        <input
                            type='password'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>login</button>
                </form>
            </>
        )
    }

    const blogForm = () => {
        const handleTitleChange = ({ target }) => setTitle(target.value)
        const handleAuthorChange = ({ target }) => setAuthor(target.value)
        const handleUrlChange = ({ target }) => setUrl(target.value)
        const handleAddBlog = async (event) => {
            event.preventDefault()
            const response = await blogService.create({ title, author, url })
            setBlogs(blogs.concat(response))
            setNotification({ msg: `A new blog ${response.title} by ${response.author} added.` })
            setTimeout(() => setNotification({}), NOTIFICATION_TIMEOUT)
            setTitle('')
            setAuthor('')
            setUrl('')
        }

        return (
            <>
                {blogs.map(b => <Blog key={b.id} blog={b} />)}
                <b>Create a new blog entry</b>
                <form onSubmit={handleAddBlog}>
                    Title: <input value={title} onChange={handleTitleChange} />
                    <br />
                    Author: <input value={author} onChange={handleAuthorChange} />
                    <br />
                    URL: <input value={url} onChange={handleUrlChange} />
                    <br />
                    <button type='submit'>Save</button>
                </form>
            </>
        )
    }

    useEffect(() => {
        const userJSON = window.localStorage.getItem('user')
        if (userJSON) {
            const user = JSON.parse(userJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchBlogs()
    }, [])

    const LoggedInUserInfo = ({ user }) => {
        const logoutButtonHandler = () => {
            window.localStorage.removeItem('user')
            setUser(null)
        }

        return (
            <p>
                User {user.name} logged in.
                <button onClick={logoutButtonHandler}>Logout</button>
            </p>
        )
    }

    return (
        <div>
            <h1>Blogs</h1>

            <Notification message={notification} />

            {user === null
                ? loginForm()
                : <LoggedInUserInfo user={user} />
            }

            {user !== null && blogForm()}
        </div>
    )
}

export default App
