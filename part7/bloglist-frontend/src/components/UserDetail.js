import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getUser } from '../reducers/userDetailReducer.js'

const UserDetail = (props) => {
    useEffect(() => {
        props.getUser(props.userId)
    }, [])

    const { user } = props

    if (!user) {
        return null
    }

    return (
        <>
            <h2>{user.name}</h2>
            <ul>
                {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
            </ul>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    getUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
