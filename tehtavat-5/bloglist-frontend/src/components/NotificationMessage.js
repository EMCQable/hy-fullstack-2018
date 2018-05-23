import './NotificationMessage.css'
import React from 'react'
import PropTypes from 'prop-types'

const NotificationMessage = ({ message, type }) => {
  NotificationMessage.propTypes = {
    type: PropTypes.string.isRequired,
  }

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