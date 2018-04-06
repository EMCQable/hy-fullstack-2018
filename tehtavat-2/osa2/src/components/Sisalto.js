import React from 'react'
import Osa from'./Osa'

const Sisalto = ({kurssi}) => {
    
    const osatLista = () => {
        return (
          kurssi.osat.map(osa => <Osa key={osa.id} osa={osa}/>)
        )
      }

    return (
      <div>
        {osatLista()}
      </div>
    )
  }
export default Sisalto
