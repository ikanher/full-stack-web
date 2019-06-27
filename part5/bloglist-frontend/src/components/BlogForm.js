import React from 'react'

const BlogForm = ({
    title, handleTitleChange,
    author, handleAuthorChange,
    url, handleUrlChange,
    handleAddBlog,
}) => {
    return (
        <>
            <b>Create a new blog entry</b>
            <form onSubmit={handleAddBlog}>
                Title: <input value={title} onChange={handleTitleChange} />
                <br />
                Author: <input value={author} onChange={handleAuthorChange} />
                <br />
                URL: <input value={url} onChange={handleUrlChange} />
                <br />
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default BlogForm
