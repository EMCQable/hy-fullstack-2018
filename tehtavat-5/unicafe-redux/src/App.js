import React from 'react'

const Statistiikka = ({ zero, store }) => {
  const stats = store.getState()
  const palautteita = stats.good + stats.bad + stats.ok

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const positiiviset = 100 * stats.good/palautteita
  const keskiarvo = (stats.good - stats.bad) / palautteita

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{stats.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{stats.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{stats.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiiviset}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={zero}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  klik = (nappi) => () => {
    this.props.store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka zero={this.klik('ZERO')} store={this.props.store} />
      </div>
    )
  }
}

export default App