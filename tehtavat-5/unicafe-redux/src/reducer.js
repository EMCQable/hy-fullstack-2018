const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const changedState = { ...state, good: state.good + 1 }
      return changedState
    case 'OK':
      const okState = { ...state, ok: state.ok + 1 }
      return okState
    case 'BAD':
      const badState = { ...state, bad: state.bad + 1 }
      return badState
    case 'ZERO':
      const zeroedState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zeroedState
  }
  return state
}

export default counterReducer