import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
      <h2>Lisää uusi </h2>
      <form onSubmit={props.onSubmit}>
        <div>
          Nimi: <input name='newName' value={props.newName} onChange={props.onChange} />
        </div>
        <div>
          Numero: <input name='newNumber' value={props.newNumber} onChange={props.onChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm