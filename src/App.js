import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Spinner from "./components/UI/Spinner/Spinner";
import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import ThemeProvider from "./providers/ThemeProvider";
import useStore from "./hooks/useStore";

function App() {
  const store = useStore();
  useEffect(() => {
    if (localStorage.getItem("refresh_token")) {
      store.checkAuth();
    } else store.setLoading(false);
  }, [store]);
  if (store.isLoading) {
    return (
      <div className="bg-back-darker text-text-base flex items-center justify-center h-screen">
        <Spinner/>
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
    <ThemeProvider>
      <Router>
        <AppRoutes/>
      </Router>
    </ThemeProvider>
  );
}

export default observer(App);
