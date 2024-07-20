import { loginRepository } from '../repository/login.repository'
import { LoginParams, LoginSchema } from '../schema/login.schema'

interface loginControllerGetParams {
  payload: LoginParams
  onError: () => void
  onSuccess: (access_token: string) => void
}

async function post({ payload, onError, onSuccess }: loginControllerGetParams) {
  const parsedPayloadParam = LoginSchema.safeParse(payload)

  if (!parsedPayloadParam.success) {
    onError()
    return
  }

  try {
    const response = await loginRepository.requestLogin({
      email: parsedPayloadParam.data.email,
      pass: parsedPayloadParam.data.pass,
    })

    onSuccess(response.access_token)
  } catch (error) {
    onError()
  }
}

export const loginController = {
  post,
}
