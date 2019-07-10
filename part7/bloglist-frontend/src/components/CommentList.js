import React from 'react'
import { connect } from 'react-redux'
import { List, Segment } from 'semantic-ui-react'

import CommentForm from './CommentForm.js'

const CommentList = (props) => {
    if (props.comments.length === 0) {
        return (
            <Segment>
                <h3>No comments</h3>
                { props.loggedInUser ? <CommentForm blogId={props.blogId} /> : null }
            </Segment>
        )
    }
    return (
        <Segment>
            <h3>Comments</h3>
            { props.loggedInUser ? <CommentForm blogId={props.blogId} /> : null }
            <List bulleted celled relaxed>
                {props.comments.map(c => <List.Item key={c.id}>{c.text}</List.Item>)}
            </List>
        </Segment>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    }
}

export default connect(mapStateToProps)(CommentList)
