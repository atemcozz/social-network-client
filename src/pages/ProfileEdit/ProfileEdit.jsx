import React, {useEffect, useState} from "react";
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

import Button from "../../ui/Button/Button";


import {MdModeEditOutline} from "react-icons/md";
import {ProfileEditForm, SecurityForm} from "../../features/User";
import Spinner from "../../ui/Spinner/Spinner";
import Avatar from "../../ui/Avatar/Avatar";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";


import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import CloudinaryService from "../../api/cloudinary/CloudinaryService";

import Heading from "../../ui/Heading";
import InfoLabel from "../../ui/InfoLabel/InfoLabel";
import store from "../../store";
import {Helmet} from "react-helmet";

const ProfileEdit = () => {

  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
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
        .catch(setServerError)
        .finally(() => setSaveLoading(false));
    };
  }

  function sendProfileData(data) {
    if (avatar) {
      data.avatar_url = avatar;
    }
    setSaveLoading(true);
    store.updateUserProfile(store.user.id, data)
      .catch(setServerError)
      .finally(() => setSaveLoading(false));
  }

  useEffect(() => {
    if (store.user) {
      setAvatar(store.user.avatar_url);
    }
  }, [store.user]);
  if (saveLoading || !store.user) {
    return (
      <MainLayout>
        <Helmet><title>Редактирование профиля</title></Helmet>
        <div className={"flex items-center justify-center h-96 bg-back rounded-lg"}>
          <Spinner/>
        </div>

      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Helmet><title>Редактирование профиля</title></Helmet>
      <div className="min-h-screen">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center bg-back hover:bg-back-darker p-2 rounded-full shadow text-primary mb-4"
            onClick={() => navigate(`/user/${store.user?.id}`)}
          >
            <BsArrowLeft size={"24px"}/>
          </button>
          <Heading>Информация о пользователе</Heading>
        </div>
        <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          <InfoLabel>Не забудьте сохранить информацию после внесения изменений</InfoLabel>
          {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}
          <div className="flex items-center justify-center">
            <Avatar src={avatar} size="large"/>
          </div>

          <Button variant="outlined" onClick={handleAvatar}>
            <MdModeEditOutline size="24px"/>
            Изменить аватар
          </Button>
          <SecurityForm/>
          <ProfileEditForm onSubmit={sendProfileData} user={store.user}/>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileEdit;
