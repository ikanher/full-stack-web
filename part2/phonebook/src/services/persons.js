import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)
const create = (entry) => axios.post(baseURL, entry).then(response => response.data)
const update = (entry) => axios.put(`${baseURL}/${entry.id}`, entry).then(response => response.data)
const remove = (id) => axios.delete(`${baseURL}/${id}`)
const get = (id) => axios.get(`${baseURL}/${id}`).then(response => response.data)

export default { getAll, create, update, remove, get }
