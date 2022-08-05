import React, { useState, createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

import ActionSideMenu from "./components/ActionSideMenu/ActionSideMenu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
export const AppContext = createContext(null);
function App() {
  const APP_THEMES = ["theme-dark", "theme-light"];
  const [currentAppTheme, setCurrentAppTheme] = useState("theme-dark");
  const setTheme = (themeName) => {
    if (APP_THEMES.includes(themeName)) {
      setCurrentAppTheme(themeName);
      APP_THEMES.forEach((theme) => document.body.classList.remove(theme));
      document.body.classList.add(themeName);
    } else {
      console.error("Theme not found");
    }
  };
  return (
    <AppContext.Provider
      value={{
        currentAppTheme,
        setTheme,
      }}
    >
      <div className="App bg-back-darker text-text-base">
        <Header />
        <div className="py-4 md:px-4 flex mx-auto max-w-screen-lg justify-center">
          <ActionSideMenu />
          {/* <Home /> */}
          {/* <Login /> */}
          <Register />
          <aside className="hidden md:block sticky top-20 w-96 h-screen">
            <div className="h-96 bg-back p-4 rounded-lg"></div>
          </aside>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
