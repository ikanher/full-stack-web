import blogService from '../services/blogs.js'
import userService from '../services/users.js'

const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'CREATE_BLOG': {
        return state.concat(action.data)
    }
    case 'REMOVE_BLOG': {
        const blogId = action.data
        return state.filter(b => b.id !== blogId)
    }
    case 'CONFIRM_REMOVE_BLOG': {
        return state
    }
    case 'INIT_BLOGS': {
        return action.data
    }
    default:
        return state
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        let createdBlog = await blogService.create(blog)

        let user = await userService.get(createdBlog.user)
        delete user.blogs
        createdBlog.user = user

        dispatch({
            type: 'CREATE_BLOG',
            data: createdBlog,
        })
    }
}

export const confirmRemoveBlog = (blogId) => {
    return async (dispatch) => {
        const blog = await blogService.get(blogId)
        if (window.confirm(`Remove blog ${blog.title} ?`)) {
            await blogService.remove(blogId)
            dispatch({
                type: 'REMOVE_BLOG',
                data: blogId,
            })
        }
    }
}

export const removeBlog = (blogId) => {
    return async (dispatch) => {
        await blogService.remove(blogId)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blogId,
        })
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export default blogReducer
