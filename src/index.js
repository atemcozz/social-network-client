import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/index.css";

import ErrorBoundaryPage from "./pages/ErrorBoundaryPage/ErrorBoundaryPage";
import {QueryClient, QueryClientProvider} from "react-query";
import ThemeProvider from "./providers/ThemeProvider";
import {ErrorBoundary} from "react-error-boundary";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary fallback={<ErrorBoundaryPage/>}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);
