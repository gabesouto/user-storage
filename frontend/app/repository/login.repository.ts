import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

interface LoginRepositorySignParams {
  email: string
  pass: string
}

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', token)
}

async function requestLogin({ email, pass }: LoginRepositorySignParams) {
  const { data } = await api.post('auth/login', { email, pass })

  const token = data.token
  saveTokenToLocalStorage(token) // Salvar o token no localStorage
  setToken(token) // Definir o token nos cabeçalhos do Axios
  return data
}

export const loginRepository = { requestLogin }
