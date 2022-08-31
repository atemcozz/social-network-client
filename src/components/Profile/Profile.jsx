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
const Profile = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, postsLoading, postsError] = useRequest(
    () => PostService.getPostsByUser(id),
    id
  );
  const [user, userLoading, userError] = useRequest(
    () => UserService.getUser(id),
    id
  );
  const [isStoreUser, setIsStoreUser] = useState(true);
  useEffect(() => {}, [id]);
  return (
    <div className="min-h-screen flex flex-col gap-4">
      {postsLoading ||
        (userLoading && (
          <div className="flex items-center justify-center w-full h-[30vh]">
            <Spinner />
          </div>
        ))}
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
              <DotsDropdown
                items={[
                  {
                    name: "Скопировать ссылку",
                    icon: <MdContentCopy size={"24px"} />,
                  },
                  {
                    name: "Редактировать",
                    icon: <MdModeEditOutline size={"24px"} />,
                    onClick: () =>
                      navigate(EDIT_PROFILE_ROUTE, { state: user }),
                  },
                ]}
              />
            </div>
            <div className="flex rounded-lg shadow-md p-4 bg-back gap-10">
              <Avatar src={user.avatar_url} size="large" />
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
                    className={`${isStoreUser ? "block" : "hidden"}`}
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
        posts?.map((post, index) => <Post key={index} post={post} />)
      )}
    </div>
  );
};

export default Profile;
