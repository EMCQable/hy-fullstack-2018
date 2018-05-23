import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      blogs: [],
      user: null,
      error: null,
      notification: null,
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      this.setState({
        username: '',
        password: '',
        user,
        notification: 'Kirjautuminen onnistui',
      })
      blogService.setToken(user.token)

      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({
      user: null,
      notification: 'Kirjauduit ulos.'
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

  }

  handleNewBlog = (blog) => {
    this.setState({
      blogs: this.state.blogs.concat(blog),
      notification: 'Blog added'
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  like = (blog) => () => {
    let blogs = this.state.blogs;
    blogs.map(blag => {
      if (blag._id === blog._id) {
        blag.likes += 1
        blogService.put(blag, blag._id)
      }
      return blag
    })

    this.setState({ blogs })
  }

  delete = (blog) => () => {
    if (window.confirm(`Do you want to delete ${blog.title} ?`)) {
      let blogs = this.state.blogs;
      blogs = blogs.filter(blag => {
        if (blag._id === blog._id) {
          blogService.remove(blag._id)
          return false
        }
        return true
      })
      console.log(blogs )
      this.setState({ blogs })
    }
  }

  loginForm = () => (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={this.login}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

  noteForm = () => (
    <div>
      <h2>blogs</h2>

      <p>{this.state.user.username} is logged in</p>
      <button type="button" onClick={this.logout}>logout</button>
      {this.state.blogs.sort(function compareNumbers(a, b) { return b.likes - a.likes; }).map(blog =>
        <Blog blog={blog} key={blog._id} like={this.like} remove={this.delete} />
      )}
      <Togglable buttonLabel='Create'>
        <CreateBlog blogs={this.state.blogs} submitting={this.handleNewBlog} user={this.state.user}/>
      </Togglable>
    </div>
  )

  render() {
    return (
      <div>
        <NotificationMessage type="error" message={this.state.error} />
        <NotificationMessage type="notification" message={this.state.notification} />
        {this.state.user === null && this.loginForm()}

        {this.state.user !== null && this.noteForm()}
      </div>
    );
  }
}

export default App;
