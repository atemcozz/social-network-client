import React from "react";
import { useContext } from "react";
import { Route } from "react-router-dom";
import useStore from "../hooks/useStore";

const PrivateRoute = ({ path, element, exact = false }) => {
  const store = useStore();
  if (store.isAuth) {
    return <Route path={path} element={element} exact={exact} />;
  } else return <></>;
};

export default PrivateRoute;
