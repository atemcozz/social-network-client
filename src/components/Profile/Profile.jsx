import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import PostService from "../../services/PostService";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import defaultAvatar from "../../assets/default_avatar.png";
import { MdContentCopy, MdModeEditOutline } from "react-icons/md";
import DotsDropdown from "../UI/Dropdown/DotsDropdown";
import Spinner from "../UI/Spinner/Spinner";
import Post from "../Post/Post";
import UserService from "../../services/UserService";
import getNoun from "../../utils/getNoun";
import { EDIT_PROFILE_ROUTE } from "../../utils/routes";
import Button from "../UI/Button/Button";
import Avatar from "../UI/Avatar/Avatar";
import GalleryItem from "../Gallery/GalleryItem";
const Profile = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStoreUser, setIsStoreUser] = useState();
  const [md, setMd] = useState();
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
        <>
          {/* <div className="pl-6 text-lg font-bold">
            {posts?.length} {getNoun(posts?.length, "пост", "поста", "постов")}
          </div> */}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
            {posts?.map(
              (post, index) =>
                post.attachments[0] && (
                  <GalleryItem
                    post={post}
                    key={index}
                    onClick={() => navigate(`/post/${post.id}`)}
                  />
                )

              // <Post key={index} post={post} onChange={updatePosts} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
