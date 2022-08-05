import React, { useState, createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { HOME_ROUTE } from "./utils/routes";
import ActionSideMenu from "./components/ActionSideMenu/ActionSideMenu";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./utils/routes";
export const AppContext = createContext(null);
function App() {
  const APP_THEMES = ["theme-dark", "theme-light"];
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
  }, []);
  return (
    <AppContext.Provider
      value={{
        getTheme,
        setTheme,
      }}
    >
      <div className="App bg-back-darker text-text-base">
        <Header />
        <div className="py-4 md:px-4 flex mx-auto max-w-screen-lg justify-center">
          <ActionSideMenu />
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.Component />}
              />
            ))}
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
          </Routes>
          <aside className="hidden md:block sticky top-20 w-96 h-screen">
            <div className="h-96 bg-back p-4 rounded-lg"></div>
          </aside>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
