import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    const msg = props.notification

    return (
        msg ?
            <div style={style}>
                {msg}
            </div>
            :
            null
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

export default connect(mapStateToProps)(Notification)
