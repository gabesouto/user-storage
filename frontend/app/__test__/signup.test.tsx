import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUp from '../signup/page'
import { SignupController } from '../controller/signup.controller'

jest.mock('../controller/signup.controller', () => ({
  SignupController: {
    post: jest.fn(() => Promise.resolve()),
  },
}))

describe('SignupForm', () => {
  test('shows error messages for invalid input', () => {
    render(<SignUp />)

    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), {
      target: { value: 'invalid-email' },
    })
    fireEvent.change(screen.getByPlaceholderText(/strongPassword/i), {
      target: { value: 'short' },
    })
    fireEvent.change(screen.getByPlaceholderText(/fullName/i), {
      target: { value: 'abc' },
    })
    fireEvent.change(screen.getByPlaceholderText(/25/i), {
      target: { value: '150' },
    })

    fireEvent.click(screen.getByText(/SIGN UP/i))

    expect(
      screen.getByText(
        /Your email must be in this format: example@example.com./i,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Your password must be 6 characters long./i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Your fullName must be at least 4 characters long/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Your age must be a number between 0 and 120./i),
    ).toBeInTheDocument()
  })

  test('calls SignupController.post on valid input', async () => {
    const postMock = jest.spyOn(SignupController, 'post')

    render(<SignUp />)

    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), {
      target: { value: 'valid@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText(/strongPassword/i), {
      target: { value: 'validpass' },
    })
    fireEvent.change(screen.getByPlaceholderText(/fullName/i), {
      target: { value: 'Valid Name' },
    })
    fireEvent.change(screen.getByPlaceholderText('25'), {
      target: { value: '25' },
    })

    fireEvent.click(screen.getByText(/SIGN UP/i))

    expect(postMock).toHaveBeenCalledWith({
      payload: {
        email: 'valid@example.com',
        password: 'validpass',
        fullName: 'Valid Name',
        age: '25',
        role: 'member',
      },
      onError: expect.any(Function),
      onSuccess: expect.any(Function),
    })
  })
})
