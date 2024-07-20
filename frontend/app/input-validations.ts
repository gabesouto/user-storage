export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/
  if (re.test(email)) return true

  return false
}

export const validatePassword = (password: string) => {
  const characters = 6

  if (password.length > characters) return true

  return false
}

export const validateFullName = (fullName: string) => {
  const characters = 3
  if (fullName.length > characters && fullName.length < 50) return true

  return false
}

export const validateAge = (age: string): boolean => {
  const parsedAge = parseInt(age, 10) // Use base 10 to ensure correct parsing
  // Check if parsedAge is a number and within the valid range
  return !isNaN(parsedAge) && parsedAge > 0 && parsedAge < 120
}

export const validateLogin = (
  email: string,
  password: string,
  fullName: string,
): boolean => {
  const validateFields =
    validateEmail(email) &&
    validatePassword(password) &&
    validateFullName(fullName)

  return validateFields
}
