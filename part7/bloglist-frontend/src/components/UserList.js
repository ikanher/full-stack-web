import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../reducers/userReducer.js'

const UserList = (props) => {
    useEffect(() => {
        props.initializeUsers()
    }, [])

    return (
        <>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                    {props.users.map(u =>
                        <tr key={u.id}>
                            <td>
                                <Link to={`/users/${u.id}`}>{u.name}</Link>
                            </td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
