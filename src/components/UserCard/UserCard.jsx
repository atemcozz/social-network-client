import React from "react";
import Button from "../UI/Button/Button";
import classNames from "classnames";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import Avatar from "../UI/Avatar/Avatar";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import { useState } from "react";
const UserCard = ({ user }) => {
  const [subscribed, setSubscribed] = useState(user.subscribed);
  function handleSubscribe() {
    UserService.subscribeUser(user.id)
      .then(() => setSubscribed((s) => !s))
      .catch(console.log);
  }
  return (
    <div className="rounded-lg bg-back p-2 flex justify-between items-center max-w-full">
      <div className="flex items-center gap-2">
        <Link to={`/user/${user.id}`} target={"_blank"}>
          <Avatar src={user.avatar_url} size="normal" />
        </Link>

        {user.nickname}
      </div>
      {user.subscribed ? (
        <Button
          variant={user.subscribed ? "secondary" : "primary"}
          onClick={handleSubscribe}
          className={classNames("text-xs md:text-base")}
        >
          <FaUserCheck size={"24px"} /> Вы подписаны
        </Button>
      ) : (
        <Button
          variant={user.subscribed ? "secondary" : "primary"}
          onClick={handleSubscribe}
          className={classNames("text-xs md:text-base")}
        >
          <FaUserPlus size={"24px"} /> Подписаться
        </Button>
      )}
    </div>
  );
};

export default UserCard;
