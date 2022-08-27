import CreatePost from "../components/CreatePost/CreatePost";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export const HOME_ROUTE = "/home";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const CREATE_POST_ROUTE = "/create";
export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },

  {
    path: REGISTER_ROUTE,
    Component: Register,
  },
];
export const privateRoutes = [
  {
    path: CREATE_POST_ROUTE,
    Component: CreatePost,
  },
];
