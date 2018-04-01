import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  arvostele = (paikka) => {
    return (
      () => {
        this.setState({ [paikka]: this.state[paikka] + 1 })
      }
    )
  }

  arvot = () => {
    return this.state.hyva * 1 + this.state.huono * -1
  }

  maara = () => {
    return this.state.hyva + this.state.neutraali + this.state.huono
  }

  keskiarvo = () => {
    const arvot = this.arvot()
    const maara = this.maara()
    if (maara === 0) {
      return 0
    }
    return arvot / maara
  }

  positiivisia = () => {
    const maara = this.maara()
    if (maara === 0) {
      return 0
    }
    return this.state.hyva / maara * 100
  }

  stats() {
    return (
      {
        osat: [
          {
            nimi: 'hyvä',
            arvo: this.state.hyva
          },
          {
            nimi: 'neutraali',
            arvo: this.state.neutraali
          },
          {
            nimi: 'huono',
            arvo: this.state.huono
          },
          {
            nimi: 'keskiarvo',
            arvo: this.keskiarvo()
          },
          {
            nimi: 'positiivisia',
            arvo: this.positiivisia()
          }
        ]
      })
  }

  render() {

    return (
      <div>
        <Palaute
          arvostele={this.arvostele}
        />
        <Statistics
          stats={this.stats()}
          maara={this.maara()}
        />
      </div>
    )
  }
}

const Palaute = (props) => {
  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={props.arvostele('hyva')} nimi="hyvä" />
      <Button handleClick={props.arvostele('neutraali')} nimi="neutraali" />
      <Button handleClick={props.arvostele('huono')} nimi="huono" />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.nimi}</button>
  )
}

const Statistics = ({ stats, maara }) => {
  if (maara === 0) {
    return (
      <div>
        <h1>Statistiikat</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistiikat</h1>
      <table>
        <tbody>
          <Statistic name={stats.osat[0].nimi} arvo={stats.osat[0].arvo} />
          <Statistic name={stats.osat[1].nimi} arvo={stats.osat[1].arvo} />
          <Statistic name={stats.osat[2].nimi} arvo={stats.osat[2].arvo} />
          <Statistic name={stats.osat[3].nimi} arvo={stats.osat[3].arvo} />
          <Statistic name={stats.osat[4].nimi} arvo={stats.osat[4].arvo + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ name, arvo }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{arvo}</td>
    </tr>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
