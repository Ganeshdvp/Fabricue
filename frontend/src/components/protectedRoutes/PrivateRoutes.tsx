import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {

  const store = useSelector(store=> store.user);

  if (!store) {
    return <Navigate to="/login" replace />;
  }
  return children;
};