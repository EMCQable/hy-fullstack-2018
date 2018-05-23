import React from 'react'
import PropTypes from 'prop-types'

export default class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  DeleteButton = () => {
    if (this.props.user && this.props.blog.user) {
      if (this.props.user._id === this.props.blog.user._id) {
        return <div><button onClick={this.props.remove(this.props.blog)}>delete</button><br /></div>
      }
    }
    return null
  }

  Author = () => {
    if (this.props.blog.user === undefined) {
      return <p>added by unknown</p>
    } else {
      return <p>added by {this.props.blog.user.name}</p>
    }
  }

  render() {

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div className='names' style={hideWhenVisible} onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div className='full' style={showWhenVisible} onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author} <br />
          <a href={this.props.blog.url}>{this.props.blog.url}</a> <br />
          {this.props.blog.likes} likes
          <button onClick={this.props.like(this.props.blog)}>like</button><br />
          <this.DeleteButton />
          <this.Author />
        </div>
      </div>
    )
  }
}

/*
const Blog = ({ this.props.blog }) => (
  <div>
    {this.props.blog.title} {this.props.blog.author}
  </div>
)

export default Blog*/