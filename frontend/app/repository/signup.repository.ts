import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

export interface SignupRepositoryParams {
  email: string
  fullName: string
  password: string
  age: string
  role: string
}

async function requestSignup({
  email,
  password,
  fullName,
  role,
  age,
}: SignupRepositoryParams) {
  const { data } = await api.post('staff/create', {
    email,
    password,
    fullName,
    role,
    age: parseInt(age),
  })

  return data
}

export const signupRespository = { requestSignup }
