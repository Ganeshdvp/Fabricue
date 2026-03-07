import { Navigate } from "react-router";

export const PublicRoutes = ({ store, children }) => {
  if (store) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

