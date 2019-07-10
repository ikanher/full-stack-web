import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Blog = (props) => {
    const { blog } = props

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className='blogEntry'>
            <div id='mainInfo'>
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        loggedInUser: state.loggedInUser,
    }
}

export default connect(mapStateToProps)(Blog)
