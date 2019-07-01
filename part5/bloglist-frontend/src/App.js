import React, { useState, useEffect } from 'react'

import loginService from './services/login.js'
import blogService from './services/blogs.js'

import Blog from './components/Blog.js'
import BlogForm from './components/BlogForm.js'
import LoggedInUserInfo from './components/LoggedInUserInfo.js'
import LoginForm from './components/LoginForm.js'
import Notification from './components/Notification.js'
import Togglable from './components/Togglable.js'

import { useField } from './hooks'

const App = () => {
    const NOTIFICATION_TIMEOUT = 3000

    const [ user, setUser ] = useState(null)
    const usernameField = useField('text')
    const passwordField = useField('text')

    const [ notification, setNotification ] = useState({})

    const [ blogs, setBlogs ] = useState([])

    const titleField = useField('text')
    const authorField = useField('text')
    const urlField = useField('text')

    const handleAddBlog = async (event) => {
        event.preventDefault()

        const title = titleField.value
        const author = authorField.value
        const url = urlField.value

        const response = await blogService.create({ title, author, url })

        setBlogs(blogs.concat(response))
        setNotification({ msg: `A new blog ${response.title} by ${response.author} added.` })
        setTimeout(() => setNotification({}), NOTIFICATION_TIMEOUT)

        titleField.reset()
        authorField.reset()
        urlField.reset()
    }

    const logoutButtonHandler = () => {
        window.localStorage.removeItem('user')
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const username = usernameField.value
            const password = passwordField.value
            const user = await loginService.login({ username, password })

            setUser(user)

            blogService.setToken(user.token)

            window.localStorage.setItem('user', JSON.stringify(user))

            usernameField.reset()
            passwordField.reset()

        } catch (exception) {
            setNotification({ msg: 'Wrong credentials', color: 'red' })
            setTimeout(() => setNotification({}), NOTIFICATION_TIMEOUT)
            passwordField.reset()
        }
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

    const handleLikeButtonClick = async ({ target }) => {
        const blogId = target.value
        await blogService.like(blogId)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
    }

    const handleRemoveButtonClick = async ({ target }) => {
        const blogId = target.value
        const blog = await blogService.get(blogId)

        if (window.confirm(`Remove blog ${blog.title} ?`)) {
            await blogService.remove(blogId)
            const newBlogs = blogs.filter(b => b.id !== blogId)
            setBlogs(newBlogs)
        }
    }

    return (
        <div>
            <h1>Blogs</h1>

            <Notification message={notification} />

            { user === null ?
                <LoginForm
                    handleSubmit={handleLogin}
                    usernameField={usernameField}
                    passwordField={passwordField}
                />
                :
                <>
                    <LoggedInUserInfo
                        user={user}
                        logoutButtonHandler={logoutButtonHandler}
                    />
                    {blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1).map(b =>
                        <Blog
                            key={b.id}
                            blog={b}
                            currentUser={user}
                            handleLikeButtonClick={handleLikeButtonClick}
                            handleRemoveButtonClick={handleRemoveButtonClick}
                        />
                    )}
                    <Togglable buttonLabel='New blog'>
                        <BlogForm
                            titleField={titleField}
                            authorField={authorField}
                            urlField={urlField}
                            handleAddBlog={handleAddBlog}
                            title={titleField.value}
                            author={authorField.value}
                            url={urlField.value}
                        />
                    </Togglable>
                </>
            }
        </div>
    )
}

export default App
