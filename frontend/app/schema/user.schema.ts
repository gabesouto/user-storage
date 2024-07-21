import { z as schema } from 'zod'

export const UserSchema = schema.object({
  email: schema.string().email(),
  fullName: schema.string(),
  password: schema.string().min(8),
  age: schema.string(),
  phoneNumber: schema.string(),
})

export const UserSchemaResponse = schema.object({
  id: schema.string().uuid(),
  email: schema.string().email(),
  fullName: schema.string(),
  password: schema.string().min(8),
  age: schema.string(),
  phoneNumber: schema.string(),
  createdAt: schema.date(),
  updatedAt: schema.date(),
})

export type UserParams = schema.infer<typeof UserSchema>
