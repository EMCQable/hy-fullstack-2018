const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  /*Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })*/
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.url === undefined || blog.title === undefined) {
    return response.status(400).json({error: 'missing required fields'})
  }
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  await blog.save()
  response.status(201).json(blog)

  /* const blog = new Blog(request.body)
 
   blog
     .save()
     .then(result => {
       response.status(201).json(result)
     })*/
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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