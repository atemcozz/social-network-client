import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import PostService from "../../services/PostService";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import {
  MdContentCopy,
  MdModeEditOutline,
  MdGridOn,
  MdMenu,
} from "react-icons/md";
import DotsDropdown from "../UI/Dropdown/DotsDropdown";
import Spinner from "../UI/Spinner/Spinner";
import UserService from "../../services/UserService";
import getNoun from "../../utils/getNoun";
import { EDIT_PROFILE_ROUTE } from "../../utils/routes";
import Button from "../UI/Button/Button";
import Avatar from "../UI/Avatar/Avatar";
import GalleryItem from "../Gallery/GalleryItem";
import Tabs from "../UI/Tabs/Tabs";
import Gallery from "../Gallery/Gallery";
import PostList from "../PostList/PostList";
import Post from "../Post/Post";
const viewModes = {
  gallery: "gallery",
  posts: "posts",
};
const Profile = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStoreUser, setIsStoreUser] = useState();
  const [md, setMd] = useState();
  const [viewMode, setViewMode] = useState(viewModes.gallery);
  const [posts, postsLoading, postsError, updatePosts] = useRequest(
    () => PostService.getPostsByUser(id),
    [id]
  );
  const [user, userLoading, userError] = useRequest(
    () => UserService.getUser(id),
    [id]
  );

  useEffect(() => {
    setIsStoreUser(store.user?.id?.toString() === id);
  }, [id]);
  useEffect(() => {
    const handler = (e) => setMd(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener("change", handler);
  }, []);
  if (postsLoading || userLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col gap-4">
      {userError ? (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки пользователя произошла ошибка. Попробуйте
            перезагрузить страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {userError.toString()}
          </div>
        </>
      ) : (
        user && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 pl-6 text-xl font-bold">
                <div>Профиль </div>
                <div className="text-primary">{user.nickname}</div>
              </div>
              <DotsDropdown>
                <DotsDropdown.Item icon={<MdContentCopy size={"24px"} />}>
                  Скопировать ссылку
                </DotsDropdown.Item>
                <DotsDropdown.Item
                  icon={<MdModeEditOutline size={"24px"} />}
                  onClick={() => navigate(EDIT_PROFILE_ROUTE, { state: user })}
                >
                  Редактировать
                </DotsDropdown.Item>
              </DotsDropdown>
            </div>
            <div className="flex rounded-lg shadow-md p-4 bg-back gap-4 md:gap-10">
              {md ? (
                <Avatar src={user.avatar_url} size={"large"} />
              ) : (
                <Avatar src={user.avatar_url} size={"big"} />
              )}

              <div className="flex flex-col gap-4 justify-between">
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-bold">
                    {user.name} {user.surname}
                  </div>
                  <div className="">
                    {posts?.length}{" "}
                    {getNoun(posts?.length, "пост", "поста", "постов")}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() =>
                      navigate(EDIT_PROFILE_ROUTE, { state: user })
                    }
                    className={`${
                      isStoreUser ? "block" : "hidden"
                    } text-xs md:text-base`}
                  >
                    <MdModeEditOutline size={"24px"} />
                    Редактировать
                  </Button>
                </div>
              </div>
            </div>
          </>
        )
      )}

      {postsError ? (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки постов произошла ошибка. Попробуйте
            перезагрузить страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {postsError.toString()}
          </div>
        </>
      ) : (
        <div>
          <Tabs>
            <Tabs.Item
              active={viewMode === viewModes.gallery}
              onClick={() => setViewMode(viewModes.gallery)}
            >
              <MdGridOn size={"24px"} />
            </Tabs.Item>
            <Tabs.Item
              active={viewMode === viewModes.posts}
              onClick={() => setViewMode(viewModes.posts)}
            >
              <MdMenu size={"24px"} />
            </Tabs.Item>
          </Tabs>

          {viewMode === viewModes.gallery && (
            <Gallery>
              {posts?.map(
                (post, index) =>
                  post.attachments[0] && (
                    <Gallery.Item
                      post={post}
                      key={index}
                      onClick={() => navigate(`/post/${post.id}`)}
                    />
                  )
              )}
            </Gallery>
          )}
          {viewMode === viewModes.posts && <PostList posts={posts} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
