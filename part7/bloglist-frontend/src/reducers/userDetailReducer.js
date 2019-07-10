import userService from '../services/users.js'

const userDetailReducer = (state = null, action) => {
    switch(action.type) {
    case 'GET_USER': {
        return action.data
    }
    default:
        return state
    }
}

export const getUser = (userId) => {
    console.log('GETUSER')
    return async (dispatch) => {
        const user = await userService.get(userId)
        console.log('GOT USER', user)
        dispatch({
            type: 'GET_USER',
            data: user,
        })
    }
}

export default userDetailReducer
