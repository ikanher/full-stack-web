import React from 'react'
import { connect } from 'react-redux'

import { login } from '../reducers/loginReducer.js'

const LoginForm = (props) => {

    const handleSubmit = async (event) => {
        event.preventDefault()
        props.login(event.target.username.value, event.target.password.value)
        event.target.username.value = ''
        event.target.password.value = ''
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <p>Username: <input name='username' /></p>
                <p>Password: <input name='password' /></p>
                <button type='submit'>login</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    login: login,
}

export default connect(null, mapDispatchToProps)(LoginForm)
