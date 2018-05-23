import React, { Component } from 'react'
import blogService from '../services/blogs'

export default class CreateBlog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      url: '',
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        author: this.state.author,
        title: this.state.title,
        url: this.state.url
      })
      this.props.submitting(blog)
      this.setState({
        author: '',
        title: '',
        url: '',
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Add a new blog</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            Title
    <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Author
    <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Url
    <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div >
    );
  }
}