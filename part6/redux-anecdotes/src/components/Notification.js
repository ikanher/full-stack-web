import React from 'react'

const Notification = ({ store }) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    const msg = store.getState().notification

    return (
        msg ?
            <div style={style}>
                {msg}
            </div>
            :
            null
    )
}

export default Notification
