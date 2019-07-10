const notificationReducer = (state = {}, action) => {
    switch(action.type) {
    case 'SET_NOTIFICATION': {
        return action.data
    }
    case 'CLEAR_NOTIFICATION': {
        return {}
    }
    default:
        return state
    }
}

export const setNotification = (notification) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification,
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
            })
        }, 5000)
    }
}

export default notificationReducer
