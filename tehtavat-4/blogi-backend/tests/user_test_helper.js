const User = require('../models/user')

const initialUsers = [
  {
    _id: '5a422a851b54a676234d17f7',
    name: 'Reac',
    username: 'Monet',
    password: 'wordy',
    adult: true,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    name: 'Canon',
    username: 'Marharet',
    password: 'manyone',
    adult: true,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    name: 'First',
    username: 'Wowzer',
    password: 'konanster',
    adult: true,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    name: 'TDDMon',
    username: 'Kountris',
    password: 'Manret',
    adult: true,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    name: 'Typet',
    username: 'Huhaat',
    password: 'Bergutta',
    adult: true,
    __v: 0
  }
]

const usersInDB = async () => {
  const users = await User.find({})

  return users
}

module.exports = {
  initialUsers, usersInDB
}