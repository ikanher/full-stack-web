import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import { initializeBlogs } from '../reducers/blogReducer.js'

import Blog from './Blog.js'
import BlogForm from './BlogForm.js'
import Togglable from './Togglable.js'

const BlogList = (props) => {
    useEffect(() => {
        props.initializeBlogs()
    }, [])

    const togglableRef = React.createRef()

    return (
        <>
            { props.loggedInUser ?
                <Togglable buttonLabel='New blog' ref={togglableRef}>
                    <BlogForm togglableRef={togglableRef} />
                </Togglable>
                : null
            }
            <Table striped celled>
                <Table.Body>
                    {props.blogs.map(b =>
                        <Blog key={b.id} blog={b} />
                    )}
                </Table.Body>
            </Table>
        </>
    )
}


const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
    return {
        blogs: sortBlogs(state.blogs),
        loggedInUser: state.loggedInUser,
    }
}

const mapDispatchToProps = {
    initializeBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
