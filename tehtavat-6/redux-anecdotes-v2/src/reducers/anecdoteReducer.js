import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'INIT') {
    return action.anecdotes
  }
  if (action.type === 'CREATE') {
    return [...store, action.createdAnecdote]
  }

  return store
}

export const initNotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      anecdotes
    })
  }
}

export const noteCreation = (content) => {
  return async (dispatch) => {
    const anecdote = {
      content,
      votes: 0
    }

    const createdAnecdote = await anecdoteService.save(anecdote)
    dispatch({
      type: 'CREATE',
      createdAnecdote
    })
  }
}

export const noteUpVoting = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const changedAnecdote = await anecdoteService.modify(votedAnecdote)

    const id = changedAnecdote.id
    dispatch({
      type: 'VOTE',
      id
    })
  }
}
export default reducer