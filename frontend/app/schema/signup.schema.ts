import { z as schema } from 'zod'

export const SignupSchema = schema.object({
  email: schema.string().email(),
  fullName: schema.string(),
  password: schema.string().min(8),
  age: schema.string(),
  role: schema.string(),
})

export type SignupParams = schema.infer<typeof SignupSchema>
