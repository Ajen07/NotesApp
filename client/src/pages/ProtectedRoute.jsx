import React from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
