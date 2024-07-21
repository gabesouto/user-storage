import axios from 'axios'
import { UserParams, UserSchemaResponse } from '../schema/user.schema'
import { z as schema } from 'zod'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Ou de onde você estiver obtendo o token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

interface UserRespositoryGetParams {
  page?: number
  limit?: number
}

export interface UserResponse {
  id: string
  fullName: string
  email: string
  age: string
  phoneNumber: string
  updatedAt: Date
  createdAt: Date
}

interface UserRespositoryGetOutputParams {
  users: UserResponse[]
  page?: number
  total?: number
}

async function fetchUsers({ page, limit }: UserRespositoryGetParams) {
  try {
    const response = await api.get(`/users`, {
      params: { page, limit },
    })

    return response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return { users: [], total: 0, page: 1 } // Alterado para garantir um retorno consistente
  }
}

async function get({
  page,
  limit,
}: UserRespositoryGetParams): Promise<UserRespositoryGetOutputParams> {
  const response = await fetchUsers({ page, limit })
  console.log('response', response)

  return {
    users: response.data,
    total: response.total,
    page: response.pages,
  }
}

async function create({
  email,
  password,
  phoneNumber,
  age,
  fullName,
}: UserParams): Promise<UserResponse> {
  try {
    const { data } = await api.post('users/create', {
      email,
      password,
      fullName,
      phoneNumber,
      age: parseInt(age),
    })

    const ServerResponseSchema = schema.object({
      user: UserSchemaResponse,
    })

    const serverResponseParsed = ServerResponseSchema.safeParse(data)

    if (!serverResponseParsed.success) {
      throw new Error('Failed to parse server response')
    }

    return serverResponseParsed.data.user
  } catch (error) {
    console.error('Failed to create user:', error)
    throw new Error('Failed to create user')
  }
}

export const dashboardRepository = { get, create }
