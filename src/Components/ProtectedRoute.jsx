import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userToken"); // yoki context, reduxdan olingan auth

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
