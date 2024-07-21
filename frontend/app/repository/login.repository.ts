import { api } from './api'

interface LoginRepositorySignParams {
  email: string
  pass: string
}

async function requestLogin({ email, pass }: LoginRepositorySignParams) {
  const { data } = await api.post('auth/login', { email, pass })

  return data
}

export const loginRepository = { requestLogin }
