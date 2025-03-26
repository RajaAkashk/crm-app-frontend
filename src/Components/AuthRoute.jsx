import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoute({ element }) {
  const gotToken = localStorage.getItem("authToken");

  if (!gotToken) {
    return <Navigate to="/" />;
  }

  return element;
}

export default AuthRoute;
