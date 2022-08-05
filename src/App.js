import React, { useState, createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

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
      <div className="App bg-back-darker">
        <Header />
        <Home />
      </div>
    </AppContext.Provider>
  );
}

export default App;
