import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

import { initializeUsers } from '../reducers/userReducer.js'

const UserList = (props) => {
    useEffect(() => {
        props.initializeUsers()
    }, [])

    return (
        <>
            <h2>Users</h2>
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Blogs created</Table.HeaderCell>
                    </Table.Row>
                    {props.users.map(u =>
                        <Table.Row key={u.id}>
                            <Table.Cell>
                                <Link to={`/users/${u.id}`}>{u.name}</Link>
                            </Table.Cell>
                            <Table.Cell>{u.blogs.length}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = {
    initializeUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
