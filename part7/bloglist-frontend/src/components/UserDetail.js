import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { List, Segment } from 'semantic-ui-react'

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
        <Segment>
            <h2>{user.name}</h2>
            <List bulleted celled relaxed>
                {user.blogs.map(b => <List.Item key={b.id}>{b.title}</List.Item>)}
            </List>
        </Segment>
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
