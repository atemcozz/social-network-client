import CreatePost from "../pages/CreatePost/CreatePost";
import Login from "../pages/Login/Login";
import ProfileEdit from "../pages/ProfileEdit/ProfileEdit";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import New from "../pages/New/New";
import Popular from "../pages/Popular/Popular";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import FullPost from "../pages/FullPost/FullPost";
import Search from "../pages/Search/Search";

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
