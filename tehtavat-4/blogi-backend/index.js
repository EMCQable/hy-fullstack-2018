const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./middleware')

const mongoUrl = config.mongoUrl
mongoose.connect(mongoUrl)

app.use(cors())
app.use(bodyParser.json())
app.use(middleware)

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`) //eslint-disable-line
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}