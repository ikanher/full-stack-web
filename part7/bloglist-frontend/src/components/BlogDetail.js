import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import CommentList from './CommentList.js'

import { confirmRemoveBlog } from '../reducers/blogReducer.js'
import { likeBlog, getBlog } from '../reducers/blogDetailReducer.js'

const BlogDetail = (props) => {
    useEffect(() => {
        props.getBlog(props.blogId)
    }, [])

    const { blog } = props

    if (!blog) {
        return null
    }

    const handleLikeButtonClick = ({ target }) => {
        const blogId = target.value
        props.likeBlog(blogId)
    }

    const handleRemoveButtonClick = ({ history }) => {
        return async ({ target }) => {
            const blogId = target.value
            await props.confirmRemoveBlog(blogId)
            history.push('/')
        }
    }

    const LikeButton = ({ id }) => <button value={id} onClick={handleLikeButtonClick}>like</button>

    const RemoveButton = ({ currentUser, blog }) => {
        if (currentUser && currentUser === blog.user.username) {
            return (
                <button value={blog.id} onClick={handleRemoveButtonClick(props)}>delete</button>
            )
        }
        return null
    }

    return (
        <>
            <h2>{blog.title}</h2>
            <p><a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a></p>
            <p>has {blog.likes} likes <LikeButton id={blog.id} /></p>
            <p>added by {blog.user.name}</p>
            <RemoveButton currentUser={props.loggedInUser.username} blog={blog} />
            <CommentList comments={blog.comments} blogId={blog.id} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        blog: state.blog,
        loggedInUser: state.loggedInUser,
    }
}

const mapDispatchToProps = {
    getBlog,
    likeBlog,
    confirmRemoveBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail)
