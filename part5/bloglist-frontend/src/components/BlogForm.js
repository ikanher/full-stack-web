import React from 'react'

import FormInputField from './FormInputField.js'

const BlogForm = ({
    titleField,
    authorField,
    urlField,
    handleAddBlog,
}) => {
    return (
        <>
            <b>Create a new blog entry</b>
            <form onSubmit={handleAddBlog}>
                <FormInputField name='title' field={titleField} />
                <FormInputField name='author' field={authorField} />
                <FormInputField name='url' field={urlField} />
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default BlogForm
