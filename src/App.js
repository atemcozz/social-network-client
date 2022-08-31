import React, { useState, createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { HOME_ROUTE, privateRoutes } from "./utils/routes";
import ActionSideMenu from "./components/ActionSideMenu/ActionSideMenu";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./utils/routes";
import { useContext } from "react";
import { Context } from "./index";
import { observer } from "mobx-react";
import Spinner from "./components/UI/Spinner/Spinner";
import FullPost from "./components/FullPost/FullPost";
export const AppContext = createContext(null);
function App() {
  const APP_THEMES = ["theme-dark", "theme-light"];
  const { store } = useContext(Context);
  const getTheme = () => {
    return localStorage.getItem("theme");
  };
  const setTheme = (themeName) => {
    if (APP_THEMES.includes(themeName)) {
      APP_THEMES.forEach((theme) => document.body.classList.remove(theme));
      document.body.classList.add(themeName);
      localStorage.setItem("theme", themeName);
    } else {
      console.error("Theme not found");
    }
  };
  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
    if (localStorage.getItem("token")) {
      store.checkAuth();
    } else store.setLoading(false);
  }, []);
  if (store.isLoading) {
    return (
      <div className="bg-back-darker text-text-bas flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <AppContext.Provider
      value={{
        getTheme,
        setTheme,
      }}
    >
      <div className="App bg-back-darker text-text-base">
        <Header />
        <div className="py-4 md:px-4 flex mx-auto max-w-screen-lg justify-center ">
          <ActionSideMenu />
          <div className="w-full px-4 max-w-xl">
            {!store.isLoading && (
              <Routes>
                <Route path={"/post/:id"} element={<FullPost />} />
                {publicRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.Component />}
                  />
                ))}
                {store.isAuth &&
                  privateRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.Component />}
                    />
                  ))}
                <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
              </Routes>
            )}
          </div>

          <aside className="hidden md:block sticky top-20 w-96 max-h-[80vh]">
            <div className="h-96 bg-back p-4 rounded-lg"></div>
          </aside>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default observer(App);
