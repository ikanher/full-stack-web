import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
    if (!props.notification.msg) {
        return null
    }

    return (
        <Message color={props.notification.color || 'green'}>
            {props.notification.msg}
        </Message>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

export default connect(mapStateToProps, null)(Notification)
