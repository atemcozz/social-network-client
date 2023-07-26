import React from "react";

import Spinner from "../../components/UI/Spinner/Spinner";
import PostService from "../../services/PostService";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../../components/PostList/PostList";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import { useQuery } from "react-query";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Heading from "../../components/UI/Heading";
import UserService from "../../services/UserService";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserCard from "../../components/UserCard";
const UserSubscriptions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: subsData,
    isLoading: subsLoading,
    refetch: subsRefetch,
    error: subsError,
  } = useQuery("fetchUserSubscriptions", () =>
    UserService.getUserSubscriptions(id)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response?.data?.reason))
  );
  if (subsLoading) {
    return (
      <MainLayout>
        <div className="px-4">
          <Heading>Подписки</Heading>
          <PostPlaceholder />
        </div>
      </MainLayout>
    );
  }
  console.log(subsError);
  return (
    <MainLayout>
      <div className="min-h-screen px-4">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center bg-back hover:bg-back-darker p-2 rounded-full shadow text-primary mb-4"
            onClick={() => navigate(`/user/${id}`)}
          >
            <BsArrowLeft size={"24px"} />
          </button>
          <Heading>Подписки</Heading>
        </div>
        <div className="flex flex-col gap-2">
          <UserCard user={{ nickname: "atemcozz", subscribed: true }} />
          <UserCard user={{ nickname: "atemcozz", subscribed: true }} />
          <UserCard user={{ nickname: "atemcozz", subscribed: true }} />
          <UserCard user={{ nickname: "atemcozz", subscribed: true }} />
          <UserCard user={{ nickname: "atemcozz", subscribed: true }} />
        </div>
        {subsError && <ErrorMessage>{subsError}</ErrorMessage>}
      </div>
    </MainLayout>
  );
};
export default UserSubscriptions;
