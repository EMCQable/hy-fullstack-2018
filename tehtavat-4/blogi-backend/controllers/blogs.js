const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs)
  /*Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })*/
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const idToFind = decodedToken.id
    const user = await User.findById(idToFind)
    const userid = user.id

    const blog = new Blog(body)
    user.blogs.push(blog.id)
    await User.findByIdAndUpdate(user.id, user)

    blog.user = user.id

    if (blog.url === undefined || blog.title === undefined) {
      return response.status(400).json({ error: 'missing required fields' })
    }

    if (blog.likes === undefined) {
      blog.likes = 0
    }
    await blog.save()
    response.status(201).json(blog)

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      response.status(500).json({ error: 'something went wrong...' })
    }
  }

})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const userid = decodedToken.id

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const toBeRemoved = await Blog.findById(request.params.id)

    if (toBeRemoved.user === undefined || toBeRemoved.user.toString() === userid.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(403).json({ error: 'trying to remove resource owned by someone else' })
    }
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const likesIncreased = {
    likes: request.body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, likesIncreased, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => {
      response.status(400).send({ error: error })
    })
})

module.exports = blogsRouter
