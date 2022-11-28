import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { Navigate } from "react-router-dom";

import useStore from "../hooks/useStore";

const AppRoutes = () => {
  const store = useStore();
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.Component />} />
      ))}
      {store.isAuth &&
        privateRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.Component />} />
        ))}
      <Route path="*" element={<Navigate to={"/new"} />} />
    </Routes>
  );
};

export default AppRoutes;
