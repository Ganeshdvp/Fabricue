import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../types";
import type { FC, ReactNode } from "react";

interface PrivateRoutesProps {
  children: ReactNode
}

export const PrivateRoutes: FC<PrivateRoutesProps> = ({ children }) => {

  const store = useSelector((store: RootState)=> store.user);

  if (!store) {
    return <Navigate to="/" replace />;
  }
  return children;
};