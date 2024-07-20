import { z as schema } from 'zod'

export const LoginSchema = schema.object({
  email: schema.string().email(),
  pass: schema.string().min(8),
})

export type LoginParams = schema.infer<typeof LoginSchema>
