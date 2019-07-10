import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router, Route
} from 'react-router-dom'

import { localStorageLogin } from './reducers/loginReducer.js'

import BlogDetail from './components/BlogDetail.js'
import BlogList from './components/BlogList.js'
import LoginForm from './components/LoginForm.js'
import Menu from './components/Menu.js'
import Notification from './components/Notification.js'
import UserDetail from './components/UserDetail.js'
import UserList from './components/UserList.js'

const App = (props) => {
    useEffect(() => {
        props.localStorageLogin()
    }, [])

    return (
        <div>
            <Router>
                <Menu />
                <h1>Blogs</h1>

                <Notification />

                { !props.loggedInUser ? <LoginForm /> : null}

                <Route exact path='/' render={() =>
                    <BlogList />
                } />
                <Route exact path="/blogs/:id" render={({ match, history }) =>
                    <BlogDetail history={history} blogId={match.params.id} />
                } />
                <Route exact path='/users' render={() =>
                    <UserList />
                } />
                <Route exact path="/users/:id" render={({ match }) =>
                    <UserDetail userId={match.params.id} />
                } />
            </Router>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    }
}

const mapDispatchToProps = {
    localStorageLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
