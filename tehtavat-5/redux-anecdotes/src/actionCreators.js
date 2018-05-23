const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export default {
  noteCreation(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content,
        votes: 0,
        id: generateId()
      }
    }
  },
  voting(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
}
