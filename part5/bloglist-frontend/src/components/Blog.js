import React, { useState } from 'react'

const Blog = ({ blog, currentUsername, handleLikeButtonClick, handleRemoveButtonClick }) => {
    const [ expand, setExpand ] = useState(false)

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

    const LikeButton = () => <button value={blog.id} onClick={handleLikeButtonClick}>like</button>
    const RemoveButton = () => {
        if (currentUsername === blog.user.username) {
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

export default Blog
