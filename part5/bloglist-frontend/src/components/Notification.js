import React from 'react'

const Notification = ({ message }) => {
    if (!message.msg) {
        return null
    }
    const style = {
        'padding': '20px',
        'backgroundColor': message.color || 'green',
        'color': 'white',
        'marginBottom': '15px'
    }

    return (
        <div style={style}>
            {message.msg}
        </div>
    )
}

export default Notification
