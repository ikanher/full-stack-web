import blogService from '../services/blogs.js'

const blogDetailReducer = (state = null, action) => {
    switch(action.type) {
    case 'GET_BLOG': {
        return action.data
    }
    case 'COMMENT_BLOG': {
        return action.data
    }
    case 'LIKE_BLOG': {
        return action.data
    }
    default:
        return state
    }
}

export const likeBlog = (id) => {
    return async (dispatch) => {
        const likedBlog = await blogService.like(id)
        dispatch({
            type: 'LIKE_BLOG',
            data: likedBlog,
        })
    }
}

export const commentBlog = (id, comment) => {
    return async (dispatch) => {
        const commentedBlog = await blogService.comment(id, comment)
        dispatch({
            type: 'COMMENT_BLOG',
            data: commentedBlog,
        })
    }
}

export const getBlog = (blogId) => {
    return async (dispatch) => {
        const blog = await blogService.get(blogId)
        dispatch({
            type: 'GET_BLOG',
            data: blog,
        })
    }
}

export default blogDetailReducer
