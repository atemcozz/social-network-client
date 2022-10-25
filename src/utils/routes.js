import CreatePost from "../components/CreatePost/CreatePost";
import Home from "../components/Posts/New";
import Login from "../components/Login/Login";
import ProfileEdit from "../components/Profile/ProfileEdit";
import Profile from "../components/Profile/Profile";
import Register from "../components/Register/Register";
import New from "../components/Posts/New";
import Popular from "../components/Posts/Popular";

export const HOME_ROUTE = "/new";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const CREATE_POST_ROUTE = "/create";
export const USER_PROFILE_ROUTE = "/user/:id";
export const EDIT_PROFILE_ROUTE = "/user/edit";
export const NEW_POSTS_ROUTE = "/new";
export const POPULAR_POSTS_ROUTE = "/popular";

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
  {
    path: USER_PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: NEW_POSTS_ROUTE,
    Component: New,
  },
  {
    path: POPULAR_POSTS_ROUTE,
    Component: Popular,
  },
];
export const privateRoutes = [
  {
    path: CREATE_POST_ROUTE,
    Component: CreatePost,
  },
  {
    path: EDIT_PROFILE_ROUTE,
    Component: ProfileEdit,
  },
];
