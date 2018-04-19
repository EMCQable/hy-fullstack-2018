const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
morgan.token('content', function (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))

app.get('/info', (req, res) => {
  var amount = 0
  Person
    .find({})
    .then(persons => {
      amount = persons.length
      res.send(`Puhelinluettelossa on ${amount} henkilön tiedot \n${new Date()}`)
    })
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
    .catch(err => {
      console.log(err)
      res.status.send({ error: err })
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(Person.format(person))
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(404).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(res.status(204).end())
    .catch(err => {
      res.status(400).send({ error: err })
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined
    || body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  Person
    .find({ name: person.name })
    .then(serverPerson => {
      console.log(serverPerson)
      if (serverPerson.length === 0) {
        person
          .save()
          .then(savedPerson => {
            res.json(Person.format(savedPerson))
          })
      } else {
        res.status(400).json({ error: 'duplicate' })
      }
    })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})