import CreatePost from "../pages/CreatePost";
import Login from "../pages/Login";
import ProfileEdit from "../pages/ProfileEdit";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import New from "../pages/New";
import Popular from "../pages/Popular";
import Bookmarks from "../pages/Bookmarks";
import FullPost from "../pages/FullPost";
import Search from "../pages/Search";
import RecoverPassword from "../pages/RecoverPassword";

export const publicRoutes = [
  {
    path: "/",
    Component: New,
  },
  {
    path: "/new",
    Component: New,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/user/:id",
    Component: Profile,
  },
  {
    path: "/popular",
    Component: Popular,
  },
  {
    path: "/post/:id",
    Component: FullPost,
  },
  {
    path: "/search",
    Component: Search,
  },
  { path: "/recover", Component: RecoverPassword },
];
export const privateRoutes = [
  {
    path: "/create",
    Component: CreatePost,
  },
  {
    path: "/edit_profile",
    Component: ProfileEdit,
  },
  {
    path: "/saved",
    Component: Bookmarks,
  },
];
