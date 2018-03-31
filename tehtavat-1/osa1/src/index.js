import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto kurssi={kurssi}/>
      <Yhteensa kurssi={kurssi}/>
    </div>
  )
}

const Otsikko = ({kurssi}) => {
  return <h1>{kurssi.nimi}</h1>
}

const Sisalto = ({kurssi}) => {
  return (
    <div>
      <Osa osa={kurssi.osat[0]} />
      <Osa osa={kurssi.osat[1]} />
      <Osa osa={kurssi.osat[2]} />
    </div>
  )
}

const Osa = ({osa}) => {
  return (
    <p> {osa.nimi} {osa.tehtavia} </p>
  )
}

const Yhteensa = ({kurssi}) => {
  return <p>yhteensä {kurssi.osat[0].tehtavia + kurssi.osat[1].tehtavia + kurssi.osat[2].tehtavia} tehtävää </p>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
