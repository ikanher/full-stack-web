import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

import { commentBlog } from '../reducers/blogDetailReducer.js'

const CommentForm = (props) => {

    const handleSubmit = async (event) => {
        event.preventDefault()

        const comment = event.target.comment.value
        props.commentBlog(props.blogId, comment)

        event.target.comment.value = ''
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Comment</label>
                    <input name='comment' />
                </Form.Field>
                <Button type='submit' color='green' size='tiny'>Add comment</Button>
            </Form>
        </>
    )
}

const mapDispatchToProps = {
    commentBlog,
}

export default connect(null, mapDispatchToProps)(CommentForm)
