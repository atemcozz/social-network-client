import React, {useState} from "react";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {useQuery} from "react-query";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";
import {UserService, UserSubscriptionCard} from "../../features/User";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import {NotificationCard} from "../../features/User/components/NotificationCard";
import NoContentMessage from "../../components/NoContentMessage/NoContentMessage";
import Paginator from "../../components/Paginator/Paginator";
import store from "../../store";
import {Helmet} from "react-helmet";

const Notifications = () => {

  const [timestamp, setTimestamp] = useState(Date.now());
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery(["fetchUserNotifications", page], () =>
    UserService.getUserNotifications({
      page,
      t: timestamp,
    })
      .then((res) => res.data),
  );

  function paginate(page) {
    params.set("page", page);
    setParams(params);
  }

  if (isLoading) {
    return (
      <MainLayout>
        <Helmet><title>Уведомления</title></Helmet>
        <Heading>Уведомления</Heading>
        <PostPlaceholder/>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Helmet><title>Уведомления ({notifications?.contents?.length.toString()})</title></Helmet>
      <div className="flex items-center gap-4">
        <ReturnButton/>
        <Heading>Уведомления</Heading>
      </div>
      {error && <ErrorMessage>{error?.response?.data?.message}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        {notifications?.contents?.length <= 0 && <NoContentMessage/>}
        {notifications?.contents?.map((notification, index) =>
          <NotificationCard notification={notification} key={index}/>,
        )}
        <Paginator pagesCount={notifications?.pages_count} currentPage={page} onPageChange={paginate}/>
      </div>
    </MainLayout>
  );
};
export default Notifications;
