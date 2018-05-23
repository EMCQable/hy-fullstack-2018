import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Erik',
    likes: 5,
    url: 'www.google.com'
  }

  it('contains only author and title before clicked and full info after', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} like={mockHandler} remove={mockHandler}/>)

    const nameDiv = blogComponent.find('.names')
    expect(nameDiv.text()).toContain(blog.title)
    expect(nameDiv.text()).toContain(blog.author)
    nameDiv.simulate('click')
  
    const contentDiv =  blogComponent.find('.full')
    expect(contentDiv.text()).toContain(blog.likes)
    expect(contentDiv.text()).toContain(blog.url)
  })
})