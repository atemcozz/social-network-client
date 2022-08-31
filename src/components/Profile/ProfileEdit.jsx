import React, { useContext, useState, useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";
import useForm from "../../hooks/useForm";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useRequest from "../../hooks/useRequest";
import UserService from "../../services/UserService";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import ProfileEditForm from "./ProfileEditForm";
import Spinner from "../UI/Spinner/Spinner";
import Avatar from "../UI/Avatar/Avatar";
import { useEffect } from "react";
import axios from "axios";
import { LOGIN_ROUTE } from "../../utils/routes";
const ProfileEdit = () => {
  const { store } = useContext(Context);
  const [error, setError] = useState();
  const photoInput = useRef();

  const navigate = useNavigate();
  const [user, userLoading, userError] = useRequest(() =>
    UserService.getUser(store.user.id)
  );
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
    UserService.updateUser(user.id, formData)
      .then(() => {
        if (data.password) {
          store.logout();
          navigate(LOGIN_ROUTE);
        } else {
          navigate(`/user/${user.id}`);
        }
      })
      .catch((e) => setError(e.response?.data?.msg));
  }
  useEffect(() => {
    if (user) {
      setAvatar({ url: user.avatar_url });
      console.log("loaded");
    }
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col gap-4">
      {userLoading && (
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      )}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center bg-back hover:bg-back-darker p-2 rounded-full shadow text-primary"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size={"24px"} />
        </button>
        <div className="font-bold text-xl">Информация о пользователе</div>
      </div>
      <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
        {error && (
          <div className="text-white bg-danger rounded-lg p-4 break-words">
            {error}
          </div>
        )}
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
  );
};

export default ProfileEdit;
