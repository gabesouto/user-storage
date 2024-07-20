// LoginForm.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from '../login/page'

describe('LoginForm Component', () => {
  it('renders the login form', () => {
    render(<Login />)

    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByRole('login')).toBeInTheDocument()
  })
})
