import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useQuery} from "react-query";
import {PostList, PostService} from "../../features/Post";


import {ProfileHeader, UserService} from "../../features/User";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import UserPlaceholder from "../../ui/Placeholders/UserPlaceholder/UserPlaceholder";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import {Helmet} from "react-helmet";

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


  if (userLoading) {
    return (
      <MainLayout>
        <Helmet><title>Профиль</title></Helmet>
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
      <Helmet><title>Профиль {user?.nickname || ""}</title></Helmet>
      <div className="flex flex-col">
        <ProfileHeader user={user}/>
        <PostList posts={posts?.contents}/>
      </div>
    </MainLayout>
  );
};

export default Profile;
