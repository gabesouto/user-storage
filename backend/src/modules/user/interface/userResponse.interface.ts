import { IUser } from './user.interface'

export interface IUserResponse {
  data: Partial<IUser> | Partial<IUser>[]
}
