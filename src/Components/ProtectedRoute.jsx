import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // yoki state.auth.token

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
