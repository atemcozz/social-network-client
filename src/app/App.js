import React, {useEffect} from "react";
import {observer} from "mobx-react";
import LayoutPlaceholder from "../components/UI/Placeholders/LayoutPlaceholder/LayoutPlaceholder";
import {RouterProvider} from "react-router-dom";
import {appRouter} from "../routes/router";
import store from "../store";

function App() {
  useEffect(() => {
    if (localStorage.getItem("refresh_token")) {
      store.verifyAuth();
    } else store.setUserLoading(false);
  }, [store]);

  if (process.env.REACT_APP_TECHNICAL_WORKS === "1") {
    return (
      <div className="absolute inset-0 bg-primary text-text-base flex justify-center items-center text-xl">
        На сайте ведутся технические работы
      </div>
    );
  }
  return (
    <>
      {store.userLoading ?
        <LayoutPlaceholder/> : <RouterProvider router={appRouter}/>}
    </>
  );
}

export default observer(App);
