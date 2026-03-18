import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const PublicRoutes = ({ children }) => {
  
    const store = useSelector(store=> store.user);

  if (store) {
    return <Navigate to="/home" replace />;
  }
  return children;
};