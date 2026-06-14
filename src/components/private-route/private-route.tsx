import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuth = false;

  return isAuth ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
