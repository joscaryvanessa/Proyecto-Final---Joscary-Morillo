import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';

export default function PrivateRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname }}
    />
  );
}
