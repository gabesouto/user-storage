import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

interface UserRespositoryGetParams {
  page?: number
  limit?: number
}

export interface UserResponse {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  updatedAt: Date
  createdAt: Date
}

// interface UserRespositoryGetOutputParams {
//   users: UserParams[]
//   page?: number
//   limit?: number
// }
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

async function get({
  page,
  limit,
}: UserRespositoryGetParams): Promise<{ data: UserResponse[] }> {
  const response = await fetchUsers({ page, limit })

  return response
  //   return {
  //     users: response.users,
  //     total: response.total,
  //     pages: response.pages,
  //   }
}

export const dashboardRepository = { get }
