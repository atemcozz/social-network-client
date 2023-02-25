import React, { useState, useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button/Button";

import UserService from "../../services/UserService";

import { MdModeEditOutline } from "react-icons/md";
import ProfileEditForm from "../../components/Profile/ProfileEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import Avatar from "../../components/UI/Avatar/Avatar";
import { useEffect } from "react";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
import { useQuery } from "react-query";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import CloudinaryService from "../../services/CloudinaryService";
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

  function handleAvatar(event) {
    event.preventDefault();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      setSaveLoading(true);
      CloudinaryService.uploadImage(file)
        .then((res) => setAvatar(res?.data?.secure_url))
        .catch(setError)
        .finally(() => setSaveLoading(false));
    };
  }

  async function onFormSumbit(data) {
    let _data = {};

    for (const key in data) {
      _data[key] = data[key];
    }
    if (avatar) {
      _data.avatar = avatar;
    }
    setSaveLoading(true);
    UserService.updateUser(user.id, _data)
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
      setAvatar(user.avatar_url);
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
            <Avatar src={avatar} size="large" />
          </div>

          <Button variant="outlined" onClick={handleAvatar}>
            <MdModeEditOutline size="24px" />
            Изменить аватар
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
