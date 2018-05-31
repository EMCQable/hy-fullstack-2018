import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const save = async (object) => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const modify = async (object) => {
  const id = object.id
  console.log(object.id)
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

export default { getAll, save, modify }