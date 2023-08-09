import CreatePost from "../pages/CreatePost";
import ProfileEdit from "../pages/ProfileEdit";
import Bookmarks from "../pages/Bookmarks";
import RequireAuth from "./RequireAuth";

export const privateRoutes = [
  {
    path: "/create",
    element: <RequireAuth> <CreatePost/> </RequireAuth>,
  },
  {
    path: "/edit_profile",
    element: <RequireAuth> <ProfileEdit/> </RequireAuth>,
  },
  {
    path: "/saved",
    element: <RequireAuth> <Bookmarks/> </RequireAuth>,
  },
];
