import React from 'react'
import { connect } from 'react-redux'


const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const Notification = (props) => {
  return (
    <div style={style}>
      {props.notifications}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
