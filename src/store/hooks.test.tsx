import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { changeCity } from './action';
import { useAppDispatch, useAppSelector } from './hooks';
import { getCity } from './selectors';
import { createTestStore } from '../utils/create-test-store';

describe('Redux hooks', () => {
  it('useAppDispatch should dispatch actions to store', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAppDispatch(), { wrapper });

    result.current(changeCity('Amsterdam'));

    expect(store.getState().app.city).toBe('Amsterdam');
  });

  it('useAppSelector should return selected state', () => {
    const store = createTestStore({
      app: { city: 'Paris' },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAppSelector(getCity), { wrapper });

    expect(result.current).toBe('Paris');
  });
});
