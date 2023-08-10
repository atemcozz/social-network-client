import New from "../pages/New";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Popular from "../pages/Popular";
import FullPost from "../pages/FullPost";
import Search from "../pages/Search";
import RecoverPassword from "../pages/RecoverPassword";
import UserSubscriptions from "../pages/UserSubscriptions";
import PostModalPage from "../pages/PostModalPage/PostModalPage";
import PasswordRecoveryConfirm from "../pages/PasswordRecoryConfirm/PasswordRecoveryConfirm";
import UserSubscribers from "../pages/UserSubscribers/UserSubscribers";

export const publicRoutes = [
  {
    path: "/",
    element: <New/>,
  },
  {
    path: "/new",
    element: <New/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/user/:id",
    children: [
      {
        index: true,
        element: <Profile/>,
      },
      {
        path: "subscriptions",
        element: <UserSubscriptions/>,
      },
      {
        path: "subscribers",
        element: <UserSubscribers/>,
      },
    ],

  },
  {
    path: "/popular",
    element: <Popular/>,
  },
  {
    path: "/post/:id",
    element: <FullPost/>,
  },
  {
    path: "/search",
    element: <Search/>,
  },
  {
    path: "/recover",
    children: [
      {
        index: true,
        element: <RecoverPassword/>,
      },
      {
        path: "password_change",
        element: <PasswordRecoveryConfirm/>,
      },
    ],
  },
];