import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
