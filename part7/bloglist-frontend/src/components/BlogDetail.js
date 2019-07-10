import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Segment } from 'semantic-ui-react'

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

    const LikeButton = ({ id }) =>
        <Button size='mini' value={id} onClick={handleLikeButtonClick}>Like</Button>

    const RemoveButton = ({ currentUser, blog }) => {
        if (currentUser && currentUser.username === blog.user.username) {
            return (
                <Button
                    color='red'
                    size='tiny'
                    value={blog.id}
                    onClick={handleRemoveButtonClick(props)}
                >
                    Delete
                </Button>
            )
        }
        return null
    }

    return (
        <>
            <Segment>
                <h2>{blog.title}</h2>
                <Segment><a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a></Segment>
                <Segment>Has {blog.likes} likes <LikeButton id={blog.id} /></Segment>
                <Segment>Added by {blog.user.name}</Segment>
                <RemoveButton currentUser={props.loggedInUser} blog={blog} />
                <CommentList comments={blog.comments} blogId={blog.id} />
            </Segment>
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
