import React, { createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import { NEW_POSTS_ROUTE, privateRoutes } from "./utils/routes";
import ActionSideMenu from "./components/ActionSideMenu/ActionSideMenu";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./utils/routes";
import { useContext, useState } from "react";
import { Context } from "./index";
import { observer } from "mobx-react";
import Spinner from "./components/UI/Spinner/Spinner";
import FullPost from "./components/FullPost/FullPost";
import Map from "./components/Map/Map";
import MapPicker from "./components/Map/MapPicker";
import Test from "./components/Map/Test";
import Search from "./components/Search/Search";
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
      store.setAppTheme(themeName);
    } else {
      console.error("Theme not found");
    }
  };
  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
    if (localStorage.getItem("refresh_token")) {
      store.checkAuth();
    } else store.setLoading(false);
  }, []);
  if (store.isLoading) {
    return (
      <div className="bg-back-darker text-text-base flex items-center justify-center h-screen">
        <Spinner />
      </div>
      //
    );
  }
  if (process.env.REACT_APP_TECHNICAL_WORKS === "1") {
    return (
      <div className="absolute inset-0 bg-primary text-text-base flex justify-center items-center text-xl">
        На сайте ведутся технические работы
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
        <div className="max-w-screen-lg mx-auto">
          <div className="mt-4 md:grid md:grid-cols-[2fr_minmax(0,5fr)_2fr] px-4 lg:px-0">
            <ActionSideMenu />
            <div className="w-full">
              {!store.isLoading && (
                <Routes>
                  <Route path={"/post/:id"} element={<FullPost />} />
                  <Route path={"/search"} element={<Search />} />
                  <Route path={"/map"} element={<Test />} />
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
                  <Route path="*" element={<Navigate to={NEW_POSTS_ROUTE} />} />
                </Routes>
              )}
            </div>

            <aside className="hidden md:block sticky top-20 max-h-[80vh]">
              <div className="h-96 bg-back p-4 rounded-lg"></div>
            </aside>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default observer(App);
