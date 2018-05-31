import React from 'react'
import { noteCreation } from '../reducers/anecdoteReducer'
import { timedNotify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const value = e.target.anecdote.value
    e.target.anecdote.value = ''

    this.props.noteCreation(value)

    const notification = 'You created the note \'' + value + '\''
    this.props.timedNotify(notification, 5)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  noteCreation,
  timedNotify
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
