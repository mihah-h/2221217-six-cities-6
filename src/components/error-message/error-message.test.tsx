import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './error-message';

describe('ErrorMessage', () => {
  it('should render server error message', () => {
    render(<ErrorMessage />);

    expect(screen.getByText('Unable to load data')).toBeInTheDocument();
    expect(screen.getByText('The server is temporarily unavailable. Please try again later.')).toBeInTheDocument();
  });
});
