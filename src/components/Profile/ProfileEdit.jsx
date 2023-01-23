import React, { useState, useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Button from "../UI/Button/Button";

import UserService from "../../services/UserService";

import { MdModeEditOutline } from "react-icons/md";
import ProfileEditForm from "./ProfileEditForm";
import Spinner from "../UI/Spinner/Spinner";
import Avatar from "../UI/Avatar/Avatar";
import { useEffect } from "react";
import MainLayout from "../Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
import { useQuery } from "react-query";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
const ProfileEdit = () => {
  const store = useStore();
  const [error, setError] = useState();
  const photoInput = useRef();

  const navigate = useNavigate();

  const { data: user, isLoading: userLoading } = useQuery(
    "fetchUserInfo",
    () => UserService.getUser(store.user.id).then((res) => res.data),
    { onError: (err) => setError(err) }
  );
  const [saveLoading, setSaveLoading] = useState(false);
  const [avatar, setAvatar] = useState({});

  function addAvatar(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setAvatar({
        file,
        url: URL.createObjectURL(file),
      });
    }
  }

  async function onFormSumbit(data) {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (avatar.file) {
      formData.append("avatar", avatar.file);
    }
    setSaveLoading(true);
    UserService.updateUser(user.id, formData)
      .then(() => {
        if (data.password) {
          store.logout();
          navigate("/login");
        } else {
          navigate(`/user/${user.id}`);
        }
      })
      .catch((e) => setError(e.response?.data?.msg))
      .finally(() => setSaveLoading(false));
  }

  useEffect(() => {
    if (user) {
      setAvatar({ url: user.avatar_url });
      console.log("loaded");
    }
  }, [user]);
  if (saveLoading || userLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col gap-4 px-4">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center bg-back hover:bg-back-darker p-2 rounded-full shadow text-primary"
            onClick={() => navigate(`/user/${user?.id}`)}
          >
            <BsArrowLeft size={"24px"} />
          </button>
          <div className="font-bold text-xl">Информация о пользователе</div>
        </div>
        <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div className="flex items-center justify-center">
            <Avatar src={avatar.url} size="large" />
          </div>

          <Button variant="outlined" onClick={() => photoInput.current.click()}>
            <MdModeEditOutline size="24px" />
            Изменить аватар
            <input
              type="file"
              ref={photoInput}
              accept="image/*"
              onChange={(e) => addAvatar(e)}
              className="hidden"
            />
          </Button>
          {user && (
            <ProfileEditForm
              user={user}
              onSumbit={onFormSumbit}
              onError={(e) => setError(e)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileEdit;
