import {createBrowserRouter} from "react-router-dom";
import {publicRoutes} from "./public-routes";
import {privateRoutes} from "./private-routes";

export const appRouter = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
]);
