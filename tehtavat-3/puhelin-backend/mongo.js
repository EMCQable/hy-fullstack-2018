const mongoose = require('mongoose')

require('dotenv').config()
// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = process.env.MONGODB_URI

mongoose.connect(url)

const Person = mongoose.model('person', {
  name: String,
  number: String,
  id: Number,
})

const args = process.argv

if (args.length === 2) {
  Person
    .find({})
    .then(result => {
      console.log('puhelinluettelo:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: args[2],
    number: args[3],
    id: Math.floor(Math.random() * 65535)
  })

  person
    .save()
    .then(response => {
      console.log('lisätään henkilö ', args[2], ' numero ', args[3], ' luetteloon')
      mongoose.connection.close()
    })
}