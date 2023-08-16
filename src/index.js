import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/index.css";

import ErrorBoundaryPage from "./pages/ErrorBoundaryPage/ErrorBoundaryPage";
import {QueryClient, QueryClientProvider} from "react-query";
import ThemeProvider from "./providers/ThemeProvider";
import {ErrorBoundary} from "react-error-boundary";
import TechWorksBoundary from "./providers/TechWorksBoundary";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary fallback={<ErrorBoundaryPage/>}>
    <TechWorksBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </QueryClientProvider>
    </TechWorksBoundary>
  </ErrorBoundary>,
);
