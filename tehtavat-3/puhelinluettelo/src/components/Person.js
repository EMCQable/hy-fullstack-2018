import React from 'react'

const Person = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
      <td><button onClick={props.handler(props.id, props.name)}>Poista</button></td>
    </tr>
  )
}

export default Person