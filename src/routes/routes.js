import CreatePost from "../components/CreatePost/CreatePost";
import Login from "../components/Login/Login";
import ProfileEdit from "../components/Profile/ProfileEdit";
import Profile from "../components/Profile/Profile";
import Register from "../components/Register/Register";
import New from "../components/Posts/New";
import Popular from "../components/Posts/Popular";
import Bookmarks from "../components/Posts/Bookmarks";
import FullPost from "../components/FullPost/FullPost";

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
    Component: Popular,
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
