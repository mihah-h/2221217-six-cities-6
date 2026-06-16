import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mockUser } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import Login from './login';
import MainPage from '../main-page/main-page';

vi.mock('../../utils/get-random-city', () => ({
  getRandomCity: () => 'Amsterdam',
}));

function renderLogin(api = axios.create()) {
  const store = createTestStore(undefined, api);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ),
  };
}

describe('Login', () => {
  let api: ReturnType<typeof axios.create>;
  let mockApi: MockAdapter;

  beforeEach(() => {
    api = axios.create();
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.reset();
    localStorage.clear();
  });

  it('should render login form', () => {
    renderLogin();

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should show error when password is invalid', async () => {
    renderLogin();

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@mail.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });

  it('should redirect to main page after successful login', async () => {
    mockApi.onPost('/login').reply(200, mockUser);

    renderLogin(api);

    await userEvent.type(screen.getByPlaceholderText('Email'), mockUser.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password1');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });
  });

  it('should navigate to main page with selected city on random city click', async () => {
    const { store } = renderLogin();

    await userEvent.click(screen.getByText('Amsterdam'));

    await waitFor(() => {
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    expect(store.getState().app.city).toBe('Amsterdam');
  });
});
