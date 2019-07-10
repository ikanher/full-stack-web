import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const Blog = (props) => {
    const { blog } = props

    return (
        <Table.Row>
            <Table.Cell>
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
            </Table.Cell>
        </Table.Row>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        loggedInUser: state.loggedInUser,
    }
}

export default connect(mapStateToProps)(Blog)
