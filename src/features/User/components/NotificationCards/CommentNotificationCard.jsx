import React from 'react';
import Avatar from "../../../../ui/Avatar/Avatar";
import {Link} from "react-router-dom";
import getDateFromSQL from "../../../../utils/getDateFromSQL";

const CommentNotificationCard = ({notification}) => {
  return (
    <div className={"bg-back shadow rounded-lg p-2"}>
      <div className={"flex gap-2 items-center"}>
        <Avatar src={notification.sender_avatar_url}/>
        <div className={"flex-1"}>
          Пользователь{" "}
          <Link to={`/user/${notification.sender_id}`}
                className={"text-primary hover:text-primary-darker font-bold"}>
            {notification.sender_nickname}{" "}
          </Link>
          прокомментировал вашу запись{" "}
          <Link to={`/post/${notification.payload.post_id}`}
                className={"text-primary hover:text-primary-darker font-bold"}>
            {notification.payload.post_title}
          </Link>
        </div>
        <span className="font-light text-xs self-start">
              {getDateFromSQL(notification.created_at)}
        </span>
      </div>
    </div>
  );
};

export default CommentNotificationCard;