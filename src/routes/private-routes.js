import CreatePost from "../pages/CreatePost";
import ProfileEdit from "../pages/ProfileEdit";
import Bookmarks from "../pages/Bookmarks";
import {RequireAuth} from "../features/Auth";
import Feed from "../pages/Feed/Feed";
import Notifications from "../pages/Notifications/Notifications";

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
  {
    path: "/feed",
    element: <RequireAuth> <Feed/> </RequireAuth>,
  },
  {
    path: "/notifications",
    element: <RequireAuth>
      <Notifications/>
    </RequireAuth>,
  },
];
