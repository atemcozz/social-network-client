import React, {useState} from "react";
import {useEffect} from "react";
import {createContext} from "react";

export const ThemeContext = createContext(null);
const ThemeProvider = ({children}) => {
  const APP_THEMES = ["theme-light", "theme-dark"];
  const [theme, setTheme] = useState(APP_THEMES[0]);
  const applyTheme = (themeName) => {
    if (APP_THEMES.includes(themeName)) {
      APP_THEMES.forEach((theme) => document.body.classList.remove(theme));
      document.body.classList.add(themeName);
      localStorage.setItem("theme", themeName);
      setTheme(themeName);
    } else {
      applyTheme(APP_THEMES[0]);
    }
  };
  useEffect(() => {
    applyTheme(localStorage.getItem("theme"));
  });
  return (
    <ThemeContext.Provider value={[theme, applyTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
