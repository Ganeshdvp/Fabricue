import { Navigate } from "react-router";

export const PrivateRoutes = ({ store, children }) => {
  if (!store) {
    return <Navigate to="/login" replace />;
  }
  return children;
};