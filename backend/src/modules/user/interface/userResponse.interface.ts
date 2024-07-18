type UserWithoutPassword = {
  fullName: string
  id: string
  role: string
  email: string
  age: number
  createdAt: Date
}
export interface IUserResponse {
  data: UserWithoutPassword | UserWithoutPassword[]
}
