import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './not-found';

describe('NotFound', () => {
  it('should render 404 page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to main page' })).toHaveAttribute('href', '/');
  });
});
