import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

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

        props.togglableRef.current.toggleVisibility()
    }

    return (
        <>
            <h3>Create a new blog entry</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input name='title' />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <input name='author' />
                </Form.Field>
                <Form.Field>
                    <label>URL</label>
                    <input name='url' />
                </Form.Field>
                <Button type='submit' size='tiny' color='green'>Save</Button>
            </Form>
        </>
    )
}

const mapDispatchToProps = {
    createBlog,
    setNotification,
}

export default connect(null, mapDispatchToProps)(BlogForm)
