import React from 'react'
import { connect } from 'react-redux'

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
            <form onSubmit={handleSubmit}>
                <p>
                    <input name='comment' />
                    <button type='submit'>Add comment</button>
                </p>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    commentBlog,
}

export default connect(null, mapDispatchToProps)(CommentForm)
