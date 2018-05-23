import './NotificationMessage.css'
import React from 'react'

const NotificationMessage = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default NotificationMessage