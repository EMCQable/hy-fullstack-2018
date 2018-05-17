const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const passwordHash = await bcrypt.hash(body.password, 10)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
    const previousUsers = await User.find({username: user.username})

    if (user.name === undefined || user.username === undefined) {
      return response.status(400).json({ error: 'missing required fields' })
    } else if (body.password.length < 3){
      return response.status(400).json({error: 'password too short'})
    } else if (previousUsers.length != 0){
      return response.status(400).json({error: 'username already in use'})
    }
    if (user.adult === undefined) {
      user.adult = true
    }
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (exception){
    response.status(500).json({error:'Something went wrong'})
  }
})

/*usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})*/

/*usersRouter.put('/:id', async (request, response) => {
  User
    .findByIdAndUpdate(request.params.id, likesIncreased, { new: true })
    .then(updatedUser => {
      response.json(updatedUser)
    })
    .catch(error => {
      response.status(400).send({ error: error })
    })
})*/

module.exports = usersRouter