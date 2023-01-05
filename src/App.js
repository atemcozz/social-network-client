import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Spinner from "./components/UI/Spinner/Spinner";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./providers/ThemeProvider";
import useStore from "./hooks/useStore";
import LayoutPlaceholder from "./components/UI/Placeholders/LayoutPlaceholder/LayoutPlaceholder";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();
function App() {
  const store = useStore();
  useEffect(() => {
    if (localStorage.getItem("refresh_token")) {
      store.checkAuth();
    } else store.setLoading(false);
  }, [store]);

  if (process.env.REACT_APP_TECHNICAL_WORKS === "1") {
    return (
      <div className="absolute inset-0 bg-primary text-text-base flex justify-center items-center text-xl">
        На сайте ведутся технические работы
      </div>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          {store.isLoading ? <LayoutPlaceholder /> : <AppRoutes />}
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default observer(App);
