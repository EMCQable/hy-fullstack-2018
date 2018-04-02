import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: Array.apply(null, Array(anecdotes.length)).map(Number.prototype.valueOf,0)
    }
  }

  next = () => () => {
    this.setState({ selected: Math.floor(Math.random()* anecdotes.length) })
  }

  vote = () => () => {
    const tempArr = this.state.votes
    tempArr[this.state.selected] = this.state.votes[this.state.selected] +1
    this.setState({votes: tempArr})
    console.log(this.state.votes)
    console.log(this.mostVotes())
  }

  mostVotes = () => {
    let most = 0
    let index = 0
    for (let i = 0; i < this.state.votes.length; i++){
      if (this.state.votes[i] > most){
        most = this.state.votes[i]
        index = i
      }
    }
    return index
  }

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p> Has {this.state.votes[this.state.selected]} votes </p>
        <button onClick={this.vote()} > Vote </button>
        <button onClick={this.next()} > Next </button>
        <h1>Anecdote with most votes</h1>
        <p>{this.props.anecdotes[this.mostVotes()]}</p>
        <p> Has {this.state.votes[this.mostVotes()]} Votes. </p>
      </div>
    )
  }
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
