import React from "react";
import {useNavigate, useParams} from "react-router-dom";

import {useQuery} from "react-query";
import PostService from "../../services/PostService";
import {useState, useEffect} from "react";
import {
  MdContentCopy,
  MdModeEditOutline,
  MdGridOn,
  MdMenu,
} from "react-icons/md";
import {FaUserPlus, FaUserCheck} from "react-icons/fa";
import DotsDropdown from "../../components/UI/Dropdown/DotsDropdown/DotsDropdown";

import UserService from "../../services/UserService";
import Button from "../../components/UI/Button/Button";
import Avatar from "../../components/UI/Avatar/Avatar";

import Tabs from "../../components/UI/Tabs/Tabs";
import Gallery from "../../components/Gallery/Gallery";
import PostList from "../../components/PostList/PostList";
import {Link} from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import store from "../../store";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import UserPlaceholder from "../../components/UI/Placeholders/UserPlaceholder/UserPlaceholder";
import classNames from "classnames";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Heading from "../../components/UI/Heading";
import getInflectedNoun from "../../utils/getInflectedNoun";
import ProfileGallery from "../../components/ProfileGallery/ProfileGallery";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

const Profile = () => {

  const {id} = useParams();
  const [subscribed, setSubscribed] = useState(false);
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery(["fetchUserInfo", id], () =>
    UserService.getUserByID(id).then((res) => res.data),
  );
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery(["fetchUserPosts", id], () =>
    PostService.getPostsByUserID(id).then((query) => query.data),
  );
  useEffect(() => {
    if (user?.subscribed) {
      setSubscribed(user?.subscribed);
    }
  }, [user]);

  function handleSubscribe() {
    UserService.subscribeUser(user.id)
      .then(() => setSubscribed((s) => !s))
      .catch(console.log);
  }

  if (userLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col gap-4">
          <UserPlaceholder/>
          <PostPlaceholder/>
        </div>
      </MainLayout>
    );
  }
  if (userError || postsError) {
    return (
      <MainLayout>
        <ErrorMessage>
          Произошла ошибка при загрузке профиля
        </ErrorMessage>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="flex flex-col">
        <ProfileHeader user={user}/>
        <PostList posts={posts?.contents}/>
      </div>
    </MainLayout>
  );
};

export default Profile;
