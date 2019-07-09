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
    const NOTIFICATION_TIME = 3000
    return async (dispatch) => {
        setTimeout(() => {
            console.log("TIMEOUT!!!")
            dispatch({
                type: 'CLEAR_NOTIFICATION',
            })
        }, NOTIFICATION_TIME)

        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification,
        })
    }
}

export default notificationReducer
