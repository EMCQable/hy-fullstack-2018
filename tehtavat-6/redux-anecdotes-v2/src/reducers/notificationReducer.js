const initialNotification = 'Your house is on fire, bitch'

const reducer = (store = initialNotification, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.content
  case 'RESET':
    return ''
  default:
    return store
  }
}

export const notifyNote = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    content
  }
}

export const reset = () => {
  return {
    type: 'RESET',
  }
}

export const timedNotify = (content, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, timeout * 1000)
  }
}

export default reducer