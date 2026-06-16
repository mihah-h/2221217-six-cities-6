import { AuthorizationStatus } from '../../const';
import { mockUser } from '../../mocks/mock-data';
import { setAuthorizationStatus, setUser } from '../action';
import { initialUserState, userReducer } from './user-reducer';

describe('userReducer', () => {
  it('should return initial state with default action', () => {
    const result = userReducer(undefined, { type: 'UNKNOWN' } as never);

    expect(result).toEqual(initialUserState);
  });

  it('should set authorization status', () => {
    const result = userReducer(
      initialUserState,
      setAuthorizationStatus(AuthorizationStatus.Auth),
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user', () => {
    const result = userReducer(initialUserState, setUser(mockUser));

    expect(result.user).toEqual(mockUser);
  });
});
