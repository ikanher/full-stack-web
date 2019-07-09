import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    if (!props.notification.msg) {
        return null
    }

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: props.notification.color || 'green'
    }

    return (
        <div style={style}>
            {props.notification.msg}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

export default connect(mapStateToProps, null)(Notification)
