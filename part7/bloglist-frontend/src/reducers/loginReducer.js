import loginService from '../services/login.js'
import blogService from '../services/blogs.js'

const loginReducer = (state = null, action) => {
    switch(action.type) {
    case 'LOGIN_USER': {
        return action.data
    }
    case 'LOGOUT_USER': {
        return null
    }
    case 'LOGIN_LOCALSTORAGE': {
        return action.data
    }
    default:
        return state
    }
}

export const likeBlog = (id) => {
    return async (dispatch) => {
        const likedBlog = await blogService.like(id)
        dispatch({
            type: 'LIKE_BLOG',
            data: likedBlog,
        })
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('user', JSON.stringify(user))
            blogService.setToken(user.token)

            dispatch({
                type: 'LOGIN_USER',
                data: user
            })
        } catch (exception) {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: { msg: 'Wrong credentials', color: 'red' }
            })
            setTimeout(() => {
                dispatch({
                    type: 'CLEAR_NOTIFICATION',
                })
            }, 5000)
        }
    }
}

export const localStorageLogin = () => {
    return async (dispatch) => {
        const userJSON = await window.localStorage.getItem('user')
        if (userJSON) {
            const user = JSON.parse(userJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN_USER',
                data: user,
            })
        }
    }
}

export const logout = () => {
    window.localStorage.removeItem('user')
    return {
        type: 'LOGOUT_USER',
    }
}

export default loginReducer
