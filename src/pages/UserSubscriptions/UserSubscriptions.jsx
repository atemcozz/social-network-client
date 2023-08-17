import React from "react";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {useQuery} from "react-query";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";
import {UserService, UserSubscriptionCard} from "../../features/User";
import {useNavigate, useParams} from "react-router-dom";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import NoContentMessage from "../../components/NoContentMessage/NoContentMessage";

const UserSubscriptions = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {
    data: subs,
    isLoading: subsLoading,
    refetch: subsRefetch,
    error,
  } = useQuery(["fetchUserSubscriptions", id], () =>
    UserService.getUserSubscriptions(id)
      .then((res) => res.data),
  );
  const {
    data: user,
    isLoading: userLoading,
  } = useQuery(["fetchUser", id], () =>
    UserService.getUserByID(id)
      .then((res) => res.data),
  );
  if (subsLoading || userLoading) {
    return (
      <MainLayout>
        <Heading>Подписки</Heading>
        <PostPlaceholder/>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="flex items-center gap-4">
          <ReturnButton/>
          <Heading>Подписки {user?.nickname && <span className={"text-primary"}>{user.nickname}</span>} </Heading>
        </div>
        {error && <ErrorMessage>{error?.response?.data?.message}</ErrorMessage>}
        <div className="flex flex-col gap-2">
          {(!subs || !subs.length) && (
            <NoContentMessage/>
          )}
          {subs?.map((user, index) =>
            <UserSubscriptionCard user={user} key={index}/>,
          )}
        </div>

      </div>
    </MainLayout>
  );
};
export default UserSubscriptions;
