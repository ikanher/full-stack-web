import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../reducers/loginReducer.js'

const LoggedInUserInfo = (props) => {
    if (!props.user) {
        return null
    }

    return (
        <p>
            User {props.user.name} logged in.
            <button onClick={() => props.logout()}>Logout</button>
        </p>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUserInfo)
