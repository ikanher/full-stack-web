import anecdoteService from '../services/anecdotes.js'

const anecdoteReducer = (state = [], action) => {
    switch(action.type) {
    case 'VOTE_ANECDOTE': {
        const anecdote = action.data
        return state.map(a => a.id === anecdote.id ? anecdote : a)
    }
    case 'CREATE_ANECDOTE': {
        return state.concat(action.data)
    }
    case 'INIT_ANECDOTES': {
        return action.data
    }
    default:
        return state
    }
}

export const voteAnecdote = (id) => {
    return async (dispatch) => {
        const votedAnecdote = await anecdoteService.vote(id)
        dispatch({
            type: 'VOTE_ANECDOTE',
            data: votedAnecdote,
        })
    }
}

export const createAnecdote = (anecdote) => {
    return async (dispatch) => {
        const createdAnecdote = await anecdoteService.create(anecdote)
        dispatch({
            type: 'CREATE_ANECDOTE',
            data: createdAnecdote,
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

export default anecdoteReducer
