import React from 'react';
import Avatar from "../../../ui/Avatar/Avatar";
import getDateFromSQL from "../../../utils/getDateFromSQL";
import {Link} from "react-router-dom";
import PostLikeNotificationCard from "./NotificationCards/PostLikeNotificationCard";
import ReplyNotificationCard from "./NotificationCards/ReplyNotificationCard";
import CommentNotificationCard from "./NotificationCards/CommentNotificationCard";
import SubscribeNotificationCard from "./NotificationCards/SubscribeNotificationCard";

export const NotificationCard = ({notification}) => {
  switch (notification.type) {
    case "post_like":
      return <PostLikeNotificationCard notification={notification}/>;
    case "reply":
      return <ReplyNotificationCard notification={notification}/>;
    case "comment":
      return <CommentNotificationCard notification={notification}/>;
    case "subscription":
      return <SubscribeNotificationCard notification={notification}/>;
    default:
      return null;
  }
};
