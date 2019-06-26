import React from 'react'

const Blog = ({ blog }) => {
    return (
        <p>
            <a href={blog.url} target='_blank' rel='noopener noreferrer'>
                {blog.title}
            </a>
            <span>by <i>{blog.author}</i></span>
        </p>
    )
}

export default Blog
