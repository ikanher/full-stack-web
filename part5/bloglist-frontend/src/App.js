import React, { useState, useEffect } from 'react'

import loginService from './services/login.js'
import blogService from './services/blogs.js'

import Blog from './components/Blog.js'
import BlogForm from './components/BlogForm.js'
import LoggedInUserInfo from './components/LoggedInUserInfo.js'
import LoginForm from './components/LoginForm.js'
import Notification from './components/Notification.js'
import Togglable from './components/Togglable.js'

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

    const logoutButtonHandler = () => {
        window.localStorage.removeItem('user')
        setUser(null)
        setUsername(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })

            setUser(user)
            setUsername(user.username)
            setPassword('')

            blogService.setToken(user.token)

            window.localStorage.setItem('user', JSON.stringify(user))
        } catch (exception) {
            setNotification({ msg: 'Wrong credentials', color: 'red' })
            setTimeout(() => setNotification({}), NOTIFICATION_TIMEOUT)
        }
    }

    const handleUsernameChange = ({ target }) => setUsername(target.value)
    const handlePasswordChange = ({ target }) => setPassword(target.value)

    useEffect(() => {
        const userJSON = window.localStorage.getItem('user')
        if (userJSON) {
            const user = JSON.parse(userJSON)
            setUser(user)
            setUsername(user.username)
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
                    handleUsernameChange={handleUsernameChange}
                    handlePasswordChange={handlePasswordChange}
                    username={username}
                    password={password}
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
                            currentUsername={username}
                            handleLikeButtonClick={handleLikeButtonClick}
                            handleRemoveButtonClick={handleRemoveButtonClick}
                        />
                    )}
                    <Togglable buttonLabel='New blog'>
                        <BlogForm
                            handleTitleChange={handleTitleChange}
                            handleAuthorChange={handleAuthorChange}
                            handleUrlChange={handleUrlChange}
                            handleAddBlog={handleAddBlog}
                            title={title}
                            author={author}
                            url={url}
                        />
                    </Togglable>
                </>
            }
        </div>
    )
}

export default App
