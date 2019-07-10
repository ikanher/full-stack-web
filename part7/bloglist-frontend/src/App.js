import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router, Route
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import { localStorageLogin } from './reducers/loginReducer.js'

import BlogDetail from './components/BlogDetail.js'
import BlogList from './components/BlogList.js'
import LoginForm from './components/LoginForm.js'
import Navigation from './components/Navigation.js'
import Notification from './components/Notification.js'
import UserDetail from './components/UserDetail.js'
import UserList from './components/UserList.js'

const App = (props) => {
    useEffect(() => {
        props.localStorageLogin()
    }, [])

    return (
        <Container>
            <Router>
                <Navigation />
                <h1>Blogs</h1>

                <Notification />

                <Route exact path='/' render={() =>
                    <BlogList />
                } />
                <Route exact path='/login' render={({ history }) =>
                    <LoginForm history={history} />
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
        </Container>
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
