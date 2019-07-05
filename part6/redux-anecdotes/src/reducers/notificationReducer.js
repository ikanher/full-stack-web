const notificationReducer = (state = '', action) => {
    switch(action.type) {
    case 'SET_NOTIFICATION': {
        return action.data
    }
    case 'CLEAR_NOTIFICATION': {
        return ''
    }
    default:
        return state
    }
}

export const setNotification = (msg) => {
    const NOTIFICATION_TIME = 5000
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: msg,
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
            })
        }, NOTIFICATION_TIME)
    }
}

export default notificationReducer
