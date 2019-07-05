import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const vote = async (id) => {
    const anecdote = await get(id)
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
    return response.data
}

export default { getAll, get, create, vote }
