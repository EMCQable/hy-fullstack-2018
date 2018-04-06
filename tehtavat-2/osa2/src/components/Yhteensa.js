import React from 'react'

const Yhteensa = ({kurssi}) => {
  const yht = kurssi.osat.reduce(
    (accumulator, currentValue) =>
  accumulator + currentValue.tehtavia, 0)
  return <p>yhteensä {yht} tehtävää </p>
}

export default Yhteensa