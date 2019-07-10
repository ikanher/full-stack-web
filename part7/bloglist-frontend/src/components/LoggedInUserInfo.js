import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../reducers/loginReducer.js'

const LoggedInUserInfo = (props) => {
    if (!props.loggedInUser) {
        return null
    }

    return (
        <>
            User {props.loggedInUser.name} logged in.
            <button onClick={() => props.logout()}>Logout</button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    }
}

const mapDispatchToProps = {
    logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUserInfo)
