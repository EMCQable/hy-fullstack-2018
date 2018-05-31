const initialFilter = ''

const reducer = (store = initialFilter, action) => {
  switch (action.type) {
  case 'FILTER':
    return action.content
  case 'RESET':
    return ''
  default:
    return store
  }
}

export const filter = (content) => {
  return {
    type: 'FILTER',
    content
  }
}

export const reset = () => {
  return {
    type: 'RESET',
  }
}

export default reducer