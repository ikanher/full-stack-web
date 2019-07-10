import React from 'react'
import { Link } from 'react-router-dom'

import LoggedInUserInfo from './LoggedInUserInfo.js'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            <LoggedInUserInfo />
        </div>
    )
}

export default Menu
