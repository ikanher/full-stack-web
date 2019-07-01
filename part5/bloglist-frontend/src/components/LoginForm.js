import React from 'react'
import PropTypes from 'prop-types'

import FormInputField from './FormInputField.js'

const LoginForm = ({ handleSubmit, usernameField, passwordField }) => {
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <FormInputField name='username' field={usernameField} />
                <FormInputField name='password' field={passwordField} />
                <button type='submit'>login</button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    usernameField: PropTypes.object.isRequired,
    passwordField: PropTypes.object.isRequired,
}

export default LoginForm
