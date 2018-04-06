import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = (
      {
        countries: [],
        filter: '',
      }
    )
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClick = (name) => () => {
    this.setState({ filter: name })
  }

  countries = () => {
    const filtered =
      this.state.filter.length === 0 ?
        this.state.countries :
        this.state.countries.filter(country =>
          country.name.toUpperCase()
            .includes(this.state.filter.toUpperCase()))

    if (filtered.length >= 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (filtered.length > 1) {
      return (
        <ul>
          {
            filtered.map(country =>
              <Country 
                key={country.name}
                name={country.name}
                handleClick={this.handleClick}
              />
            )
          }
        </ul>
      )
    }

    return (
      filtered.map(country =>
        <CountryDetail
          key={country.name}
          name={country.name}
          capital={country.capital}
          population={country.population}
          imgsrc={country.flag}
        />
      )
    )
  }

  render() {
    return (
      <div>
        <CountryFilter filter={this.state.filter} onChange={this.handleFieldChange} />
        {this.countries()}
      </div>
    );
  }
}

export default App;

const CountryFilter = ({ filter, onChange }) => {

  return (
    <input name='filter' value={filter} onChange={onChange} />
  )
}

const CountryDetail = (props) => {
  return (
    <div>
      <h2> {props.name} </h2>
      <p> Capital: {props.capital} </p>
      <p> Population: {props.population} </p>
      <img src={props.imgsrc} alt={props.name}/>
    </div>
  )
}

const Country = ({name, handleClick}) => {
  return (
    <div onClick={handleClick(name)}>
      <li name={name} >{name}</li>
    </div>
  )
}