import React from 'react';
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import NotificationMsg from './components/NotificationMsg'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      message: null,
      error: null,
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let person = {
      name: this.state.newName,
      number: this.state.newNumber,
    }

    const names = this.state.persons.map(person => person.name.toUpperCase())
    if (names.includes(this.state.newName.toUpperCase())) {
      if (window.confirm('Haluatko korvata henkilön ' + person.name + ' numeron uudella?')) {
        person = this.state.persons.find(person => person.name === this.state.newName)
        person.number = this.state.newNumber
        personService
          .update(person.id, person)
          .then(newPerson => {
            const newPersons = this.state.persons.filter(per => per.id !== person.id)
            this.setState({
              persons: newPersons.concat(newPerson),
              message: `Vaihdettiin henkilölle ${person.name} uusi numero`
            })
          })
          .catch(error =>
            this.setState({
              error: 'Jokin meni vikaan. Joku on ehkä poistanut nimen muualla.',
              persons: this.state.persons.filter(p => p.id !== person.id)
            })
          )
        setTimeout(() => {
          this.setState({
            error: null,
            message: null
          })
        }, 5000)
      }
      return
    }

    personService
      .create(person)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: '',
          message: `Lisättiin ${newPerson.name} luetteloon`
        })
      })
    setTimeout(() => {
      this.setState({
        error: null,
        message: null
      })
    }, 5000)
  }

  removePerson = (id, name) => () => {
    if (window.confirm('Poistetaanko ' + name + '?')) {
      personService
        .remove(id)
        .then(data => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== id),
            message: `${name} poistettu`
          })
        })
        .catch(err =>
          this.setState({
            error: 'Jokin meni vikaan. Nimi oli ehkä jo poistettu aikaisemmin.',
            persons: this.state.persons.filter(p => p.id !== id)
          })

        )
      setTimeout(() => {
        this.setState({
          message: null,
          error: null
        })
      }, 5000)
    }
  }

  personnel = () => {
    const filtered =
      this.state.filter.length === 0 ?
        this.state.persons :
        this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()))
    return (
      filtered.map(person =>
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          handler={this.removePerson}
        />
      )
    )
  }

  render() {
    return (
      <div>
        <NotificationMsg
          message={this.state.message}
          type="message"
        />
        <NotificationMsg
          message={this.state.error}
          type="error"
        />
        <h2>Puhelinluettelo</h2>
        Etsi: <Filter value={this.state.filter} onChange={this.handleFieldChange} />
        <PersonForm
          onSubmit={this.handleSubmit}
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          onChange={this.handleFieldChange}
        />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {this.personnel()}
          </tbody>
        </table>
      </div >
    )
  }
}

export default App
