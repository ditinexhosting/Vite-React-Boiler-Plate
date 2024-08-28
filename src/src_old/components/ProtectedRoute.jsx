import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  //return <Outlet />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;