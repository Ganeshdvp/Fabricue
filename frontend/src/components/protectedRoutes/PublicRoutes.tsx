import type { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../types";

interface PublicRoutesProps {
  children: ReactNode;
}

export const PublicRoutes: FC<PublicRoutesProps> = ({ children }) => {
  
    const store = useSelector((store: RootState)=> store.user);

  if (store) {
    return <Navigate to="/home" replace />;
  }
  return children;
};