import {
  dashboardRepository,
  UserResponse,
} from '../repository/dashboard.repository'
import { UserSchema } from '../schema/user.schema'

interface TodoControllerGetParams {
  page?: number
  limit?: number
}

async function get({ page }: TodoControllerGetParams) {
  return await dashboardRepository.get({
    page,
    limit: 5,
  })
}

export interface UserCreateParams {
  fullName: string
  password: string
  email: string
  age: string
  phoneNumber: string
}
interface dashboardControllerCreateParams {
  user: UserCreateParams
  onError: () => void
  onSuccess: (user: UserResponse) => void
}

function create({ user, onError, onSuccess }: dashboardControllerCreateParams) {
  const parsedContentParam = UserSchema.safeParse(user)

  if (!parsedContentParam.success) {
    onError()
    console.log('falha')

    return
  }
  dashboardRepository
    .create(user)
    .then((newUser) => {
      onSuccess(newUser)
    })
    .catch(() => {
      onError()
    })
}

export const dashboardController = {
  get,
  create,
}
