import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

interface LoginRepositorySignParams {
  email: string
  pass: string
}

async function requestLogin({ email, pass }: LoginRepositorySignParams) {
  const { data } = await api.post('auth/login', { email, pass })

  return data
}

export const loginRepository = { requestLogin }
