import React from 'react'
import { connect } from 'react-redux'

import CommentForm from './CommentForm.js'

const CommentList = (props) => {
    if (props.comments.length === 0) {
        return (
            <>
                <h3>No comments</h3>
                { props.loggedInUser ? <CommentForm blogId={props.blogId} /> : null }
            </>
        )
    }
    return (
        <>
            <h3>Comments</h3>
            { props.loggedInUser ? <CommentForm blogId={props.blogId} /> : null }
            <ul>
                {props.comments.map(c => <li key={c.id}>{c.text}</li>)}
            </ul>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser,
    }
}

export default connect(mapStateToProps)(CommentList)
