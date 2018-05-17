const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB } = require('./test_helper')

const auth = { Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ildvd3plciIsImlkIjoiNWE0MjJiODkxYjU0YTY3NjIzNGQxN2ZhIiwiaWF0IjoxNTI2NTYzMTAxfQ.YAmSPE235gJRbk8qyQd2rCrc60Ja-QQuznQxAgYmd3U' }

describe('on http get operations', () => {
  test('request goes through', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are there', async () => {
    const blogsInDatabase = await blogsInDB()
    expect(blogsInDatabase.length).toBe(5)
  })

  test('the first note is react patterns', async () => {
    const blogsInDatabase = await blogsInDB()
    expect(blogsInDatabase[0].title).toBe('React patterns')
  })
})

describe('when doing a http post', () => {
  test('the post is added', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set(auth)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDatabase = await blogsInDB()
    const contents = blogsInDatabase.map(r => r.title)

    expect(blogsInDatabase.length).toBe(initialBlogs.length + 1)
    expect(contents).toContain('Go To Statement Considered Harmful')
  })

  test('if \'likes\' has no value, it is set to 0', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set(auth)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDatabase = await blogsInDB()

    expect(blogsInDatabase[5].likes).toBe(0)
  })

  test('if no title returns bad request', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set(auth)
      .send(newBlog)
      .expect(400)
  })

  test('if no url returns bad request', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set(auth)
      .send(newBlog)
      .expect(400)
  })
})

describe('http delete', () => {
  test('works', async () => {

    const deleting = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }

    await api
      .delete(`/api/blogs/${deleting._id}`)
      .set(auth)
      .expect(204)

    const blogsAfterDelete = await blogsInDB()
    expect(blogsAfterDelete.length).toBe(4)

    const titles = blogsAfterDelete.map(blog => blog.title)
    expect(titles).not.toContain('React patterns')
  })
})

describe('http put', () => {
  test('can modify likes', async () => {
    const modifying = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 50,
      __v: 0
    }

    await api
      .put(`/api/blogs/${modifying._id}`)
      .send(modifying)

    const blogsAfterPut = await blogsInDB()
    expect(blogsAfterPut.length).toBe(5)

    const titles = blogsAfterPut.map(blog => blog.title)
    expect(titles).toContain('React patterns')

    const likes = blogsAfterPut.map(blog => blog.likes)
    expect(likes).toContain(50)
  })
})


beforeEach(async () => {
  await Blog.remove({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

afterAll(() => {
  server.close()
})