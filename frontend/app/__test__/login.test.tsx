// LoginForm.test.js
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from '../login/page'

describe('LoginForm Component', () => {
  it('renders the login form', () => {
    render(<Login />)

    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByRole('login')).toBeInTheDocument()
  })

  it('allows the user to type in the email and password fields', () => {
    render(<Login />)

    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement
    const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })
})
