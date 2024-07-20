import axios from 'axios'
import { UserParams } from '../schema/user.schema'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

interface UserRespositoryGetParams {
  page?: number
  limit?: number
}

interface UserRespositoryGetOutputParams {
  users: UserParams[]
  page?: number
  limit?: number
}
async function fetchUsers({ page, limit }: UserRespositoryGetParams) {
  try {
    const response = await api.get(`users?page=${page}&&limit=${limit}`)

    const usersFromServer = response.data

    return usersFromServer
  } catch (error) {
    console.error('Failed to fetch users:', error)

    return []
  }
}

async function get({ page, limit }: UserRespositoryGetParams): Promise<any> {
  const response = await fetchUsers({ page, limit })

  return response

  //   return {
  //     users: response.users,
  //     total: response.total,
  //     pages: response.pages,
  //   }
}

export const dashboardRepository = { get }
