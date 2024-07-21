import { signupRespository } from '../repository/signup.repository'

import { SignupParams, SignupSchema } from '../schema/signup.schema'

interface SignupControllerGetParams {
  payload: SignupParams
  onError: () => void
  onSuccess: (data: SignupParams) => void
}

async function post({
  payload,
  onError,
  onSuccess,
}: SignupControllerGetParams) {
  const parsedPayloadParam = SignupSchema.safeParse(payload)

  if (!parsedPayloadParam.success) {
    onError()
    return
  }

  try {
    const response = await signupRespository.requestSignup(
      parsedPayloadParam.data,
    )

    onSuccess(response)
  } catch (error) {
    onError()
  }
}

export const SignupController = {
  post,
}
