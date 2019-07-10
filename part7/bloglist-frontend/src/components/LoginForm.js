import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

import { login } from '../reducers/loginReducer.js'

const LoginForm = (props) => {

    const handleSubmit = async (event) => {
        event.preventDefault()
        props.login(event.target.username.value, event.target.password.value)
        event.target.username.value = ''
        event.target.password.value = ''
        props.history.push('/')
    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input name='username' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input name='password' />
                </Form.Field>
                <Button type='submit' size='tiny'>Login</Button>
            </Form>
        </>
    )
}

const mapDispatchToProps = {
    login: login,
}

export default connect(null, mapDispatchToProps)(LoginForm)
