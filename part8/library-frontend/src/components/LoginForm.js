import React from 'react'

const LoginForm = ({ show, loginHandler, usernameHandler, passwordHandler }) => {
    if (!show) {
        return null
    }
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <p>
                    <label>Username</label>
                    <input name='username' onChange={usernameHandler}/>
                </p>
                <p>
                    <label>Password</label>
                    <input name='password' onChange={passwordHandler}/>
                </p>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default LoginForm
