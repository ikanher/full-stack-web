import React, { useState } from 'react'
import { connect } from 'react-redux'

import { likeBlog, confirmRemoveBlog } from '../reducers/blogReducer.js'

const Blog = (props) => {
    const [ expand, setExpand ] = useState(false)
    const { blog } = props

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const expandStyle = {
        display: expand ? 'block' : 'none'
    }

    const handleLikeButtonClick = async ({ target }) => {
        const blogId = target.value
        props.likeBlog(blogId)
    }

    const handleRemoveButtonClick = async ({ target }) => {
        const blogId = target.value
        props.confirmRemoveBlog(blogId)
    }

    const LikeButton = () => <button value={blog.id} onClick={handleLikeButtonClick}>like</button>

    const RemoveButton = () => {
        if (props.user.username === blog.user.username) {
            return (
                <button value={blog.id} onClick={handleRemoveButtonClick}>delete</button>
            )
        }
        return null
    }

    return (
        <div style={blogStyle} className='blogEntry'>
            <div onClick={() => setExpand(!expand)} id='mainInfo'>
                {blog.title} {blog.author}
            </div>
            <div style={expandStyle} id='additionalInfo'>
                <a href={blog.url}>{blog.url}</a>
                <br />
                likes {blog.likes} <LikeButton />
                <br />
                added by: {blog.user ? blog.user.name : <i>Unknown</i>}
                <br />
                <RemoveButton />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
    }
}

const mapDispatchToProps = {
    likeBlog,
    confirmRemoveBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
