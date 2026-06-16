import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginPage from './login-page';

describe('LoginPage', () => {
  it('should render login page markup', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });
});
