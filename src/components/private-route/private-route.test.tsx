import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { createTestStore } from '../../utils/create-test-store';
import PrivateRoute from './private-route';

function renderPrivateRoute(authorizationStatus: AuthorizationStatus) {
  const store = createTestStore({
    user: {
      authorizationStatus,
      user: null,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <div>Protected content</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('PrivateRoute', () => {
  it('should render spinner when authorization status is unknown', () => {
    renderPrivateRoute(AuthorizationStatus.Unknown);

    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
  });

  it('should render children when user is authorized', () => {
    renderPrivateRoute(AuthorizationStatus.Auth);

    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    renderPrivateRoute(AuthorizationStatus.NoAuth);

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });
});
