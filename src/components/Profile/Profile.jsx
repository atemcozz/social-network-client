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
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import DotsDropdown from "../UI/Dropdown/DotsDropdown";
import Spinner from "../UI/Spinner/Spinner";
import UserService from "../../services/UserService";
import * as utils from "../../utils/utils";
import { EDIT_PROFILE_ROUTE } from "../../utils/routes";
import Button from "../UI/Button/Button";
import Avatar from "../UI/Avatar/Avatar";

import Tabs from "../UI/Tabs/Tabs";
import Gallery from "../Gallery/Gallery";
import PostList from "../PostList/PostList";
import { Link } from "react-router-dom";
const viewModes = {
  gallery: "gallery",
  posts: "posts",
};
//
const Profile = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStoreUser, setIsStoreUser] = useState();
  const [md, setMd] = useState();
  const [viewMode, setViewMode] = useState(viewModes.gallery);
  const [subscribed, setSubscribed] = useState(false);
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
    <div className="flex flex-col gap-4 px-4">
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
              <div className="flex gap-2  text-xl font-bold">
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
                  <div className="bg-back-lighter shadow rounded-md px-2 py-1 w-max">
                    {posts?.length}{" "}
                    {utils.getNoun(posts?.length, "пост", "поста", "постов")}
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
                  <Button
                    variant={subscribed ? "secondary" : "primary"}
                    onClick={() => setSubscribed((state) => !state)}
                    className={`${
                      isStoreUser ? "hidden" : "block"
                    } text-xs md:text-base`}
                  >
                    {subscribed ? (
                      <>
                        <FaUserCheck size={"24px"} /> Вы подписаны
                      </>
                    ) : (
                      <>
                        <FaUserPlus size={"24px"} /> Подписаться
                      </>
                    )}
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
        <>
          {posts?.length > 0 ? (
            <div className="rounded-lg shadow-md overflow-hidden">
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
                        <Link
                          to={`/post/${post.id}`}
                          target={"_blank"}
                          key={index}
                        >
                          <Gallery.Item post={post} />
                        </Link>
                      )
                  )}
                </Gallery>
              )}
              {viewMode === viewModes.posts && <PostList posts={posts} />}
            </div>
          ) : (
            <div className="text-xl font-bold flex justify-center">
              Постов нет
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
