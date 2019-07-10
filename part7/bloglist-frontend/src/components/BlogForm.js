import React from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'

const BlogForm = (props) => {

    const handleSubmit = async (event) => {
        event.preventDefault()

        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value

        props.createBlog({ title, author, url })
        const notification = {
            msg: `A new blog ${title} by ${author} added.`
        }
        props.setNotification(notification)

        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
    }

    return (
        <>
            <b>Create a new blog entry</b>
            <form onSubmit={handleSubmit}>
                <p>Title: <input name='title' /></p>
                <p>Author: <input name='author' /></p>
                <p>URL: <input name='url' /></p>
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createBlog,
    setNotification,
}

export default connect(null, mapDispatchToProps)(BlogForm)
