import React from 'react'

const LoggedInUserInfo = ({ user, logoutButtonHandler }) => {
    return (
        <p>
            User {user.name} logged in.
            <button onClick={logoutButtonHandler}>Logout</button>
        </p>
    )
}

export default LoggedInUserInfo
