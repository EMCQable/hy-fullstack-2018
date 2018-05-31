import React from 'react'
import { noteUpVoting } from '../reducers/anecdoteReducer'
import { timedNotify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  vote = (anecdote) => async () => {
    const notification = `you voted '${anecdote.content}'`
    this.props.noteUpVoting(anecdote)
    this.props.timedNotify(notification, 5)
  }

  render() {
    const anecdotes = this.props.anecdotesShown
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotesShown: filtered(state.anecdotes, state.filter)
  }
}

const filtered = (anecdotes, filter) => {
  return anecdotes
    .filter(a =>
      a.content
        .toLowerCase()
        .includes(filter))
    .sort((a, b) =>
      b.votes - a.votes)
}

const mapDispatchToProps = {
  noteUpVoting,
  timedNotify
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
