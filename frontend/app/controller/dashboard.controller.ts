import {
  dashboardRepository,
  UserResponse,
} from '../repository/dashboard.repository'
import { UserSchema, UserUpdateParams } from '../schema/user.schema'

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

interface UserCreateControllerParams {
  id: string
  updateUserOnScreen: () => void
  onError: () => void
  userToUpdate: UserUpdateParams
}
function update({
  id,
  updateUserOnScreen,

  userToUpdate,
}: UserCreateControllerParams) {
  dashboardRepository.update(id, userToUpdate).then(() => {
    updateUserOnScreen()
  })
}

interface dashboardControllerDeleteParams {
  userId: string
  onError: () => void
  onSuccess: (userId: string) => void
}

function deleteUser({
  userId,
  onError,
  onSuccess,
}: dashboardControllerDeleteParams) {
  dashboardRepository
    .deleteUser(userId)
    .then(() => onSuccess(userId))
    .catch(() => onError())
}

export const dashboardController = {
  get,
  create,
  update,
  deleteUser,
}
