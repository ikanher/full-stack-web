import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { logout } from '../reducers/loginReducer.js'

const Navigation = (props) => {
    return (
        <Menu inverted>
            <Menu.Item link>
                <Link to='/'>Blogs</Link>
            </Menu.Item>
            <Menu.Item link>
                <Link to='/users'>Users</Link>
            </Menu.Item>
            { props.loggedInUser
                ?
                    <>
                        <Menu.Item>
                            <em>{props.loggedInUser.name} logged in</em>
                        </Menu.Item>
                        <Menu.Item link onClick={props.logout}>
                            Logout
                        </Menu.Item>
                    </>
                :
                <Menu.Item link>
                    <Link to='/login'>Login</Link>
                </Menu.Item>
            }
        </Menu>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser
    }
}

const mapDispatchToProps = {
    logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
