import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `bearer ${newToken}`

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const get = async blogId => {
    const response = await axios.get(`${baseUrl}/${blogId}`)
    return response.data
}

const create = async blog => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const remove = async blogId => {
    const config = { headers: { Authorization: token } }
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

const like = async blogId => {
    const blog = await get(blogId)
    const update = {
        likes: blog.likes + 1
    }
    const response = await axios.put(`${baseUrl}/${blogId}`, update)
    return response.data
}

export default { getAll, create, get, remove, like, setToken }
