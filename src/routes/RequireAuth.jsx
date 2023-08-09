import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import store from "../store";

const RequireAuth = ({children}) => {

  const location = useLocation();

  if (!store.auth) {
    return <Navigate to="/" state={{from: location}} replace/>;
  }
  return children;
};

export default RequireAuth;