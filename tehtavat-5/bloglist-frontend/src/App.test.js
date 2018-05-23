import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app


  describe('when user is not logged', () => {
    beforeAll(() => {
      app = mount(<App />)
    })

    it('only renders the login form when not logged in', () => {
      app.update()
      const loginComponents = app.find('.loginform')
      expect(loginComponents.text()).toContain('salasana')
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        name: 'Reac',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1vbmV0IiwiaWQiOiI1YTQyMmE4NTFiNTRhNjc2MjM0ZDE3ZjciLCJpYXQiOjE1MjY5ODgyODZ9.lAti6DePDRnkLVnCquyubtmUtw20zzvZjQkdhGE--M4',
        username: 'Monet',
      }
      localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      app = mount(<App />)

    })

    it('renders the blogs when logged in', () => {

      app.update()

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})