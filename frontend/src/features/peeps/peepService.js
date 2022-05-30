import axios from 'axios'

const API_URL = '/api/peeps/'

// Create new peep
const createPeep = async (peepData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, peepData, config)

  return response.data
}

// Get user peeps
const getPeeps = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user peep
const deletePeep = async (peepId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + peepId, config)

  return response.data
}

const peepService = {
  createPeep,
  getPeeps,
  deletePeep,
}

export default peepService