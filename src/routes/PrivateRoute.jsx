import React from "react";
import { useContext } from "react";
import { Route } from "react-router-dom";
import { Context } from "..";

const PrivateRoute = ({ path, element, exact = false }) => {
  const { store } = useContext(Context);
  if (store.isAuth) {
    return <Route path={path} element={element} exact={exact} />;
  } else return <></>;
};

export default PrivateRoute;
