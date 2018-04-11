const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
morgan.token('content', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]



app.get('/info', (req, res) => {
  const amount = persons.length
  res.send(`Puhelinluettelossa on ${amount} henkilön tiedot \n${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'content missing' })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined
    || body.number === undefined) {
    return res.status(400).json({ error: 'no content' })
  }

  if (persons.filter(person =>
    person.name === body.name).length > 0) {
    return res.status(400).json({error: 'duplicate name'})
  }

  const person =
    {
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * 65535)
    }

  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})