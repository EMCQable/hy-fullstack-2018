const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { initialUsers, usersInDB } = require('./user_test_helper')


describe('when doing a http post', () => {
  test('the post is added', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      name: 'nomen',
      username: 'Motrues',
      password: 'wordybodry',
      adult: true,
      __v: 0
    }

    await api
      .post('/api/users')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDatabase = await usersInDB()
    const contents = blogsInDatabase.map(r => r.name)

    expect(blogsInDatabase.length).toBe(initialUsers.length + 1)
    expect(contents).toContain('nomen')
  })

  test('if adult has no value, it is set to true', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      name: 'Gworker',
      username: 'mbdre',
      password: 'stuff',
      __v: 0
    }

    await api
      .post('/api/users')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersInDatabase = await usersInDB()

    expect(usersInDatabase[5].adult).toBe(true)
  })

  test('if no name returns bad request', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      username: 'mukrer',
      adult: false,
      password: 'merominkut',
      __v: 0
    }

    await api
      .post('/api/users')
      .send(newBlog)
      .expect(400)
  })

  test('if username in use returns bad request', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      username: 'Wowzer',
      name: 'okaydude',
      adult: false,
      password: 'whatisthis',
      __v: 0
    }

    await api
      .post('/api/users')
      .send(newBlog)
      .expect(400)
  })

  test('if no username, bad request', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      name: 'what name',
      password: 'morgerku',
      adult: true,
      __v: 0
    }

    await api
      .post('/api/users')
      .send(newBlog)
      .expect(400)
  })

  test('if password too short returns bad request', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      name: 'okaydure',
      username: 'stuff',
      password: 'wa',
      adult: false,
      __v: 0
    }

    await api
      .post('/api/users')
      .send(newBlog)
      .expect(400)
  })

  beforeEach(async () => {
    await User.remove({})
  
    for (let blog of initialUsers) {
      let userObject = new User(blog)
      await userObject.save()
    }
  })
  
  afterAll(() => {
    server.close()
  })
})