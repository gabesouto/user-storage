// LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../login/login.form';
import Login from '../login/page';

describe('LoginForm Component', () => {
  test('renders the login form', () => {
    render(<Login />);
    
    expect(screen.getByTestId('h2-signin')).toBeInTheDocument();
    expect(screen.getByTestId('label-email')).toBeInTheDocument();
    expect(screen.getByTestId('label-password')).toBeInTheDocument();
    expect(screen.getByTestId('h1-signin')).toBeInTheDocument();
  });

  test('allows the user to type in the email and password fields', () => {
    render(<Login />);
    
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('password-input') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

})