import { createStore, combineReducers, applyMiddleware } from 'redux'

import anecdotes from './reducers/anecdoteReducer'
import notifications from './reducers/notificationReducer'
import filter from './reducers/filterReducer'

import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdotes,
  notifications,
  filter
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store