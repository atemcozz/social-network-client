import React from "react";
import { useEffect } from "react";
import { createContext } from "react";
import useStore from "../hooks/useStore";
export const ThemeContext = createContext(null);
const ThemeProvider = ({ children }) => {
  const store = useStore();
  const APP_THEMES = ["theme-dark", "theme-light"];
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
  }, []);
  return (
    <ThemeContext.Provider value={{ getTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
