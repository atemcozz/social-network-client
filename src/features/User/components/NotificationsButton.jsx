import React, {memo} from 'react';
import {Link, useLocation} from "react-router-dom";
import Button from "../../../ui/Button/Button";
import {FaBell} from "react-icons/fa";
import {useQuery} from "react-query";

import {UserService} from "../api/UserService";

export const NotificationsButton = memo(() => {
  const {
    data: notCount,
    isLoading,
    refetch,
    error,
  } = useQuery(["fetchUnreadNotificationsCount"], () => UserService.getUnreadNotificationsCount()
    .then(query => query.data), {
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });
  return (
    <Link to={"/notifications"}>
      <Button variant={"secondary"} className={"relative"}>
        <FaBell size={"24px"}/>
        {notCount?.count > 0 &&
          <div
            className={"absolute -top-1 -right-1 bg-danger rounded-full text-white text-xs w-2 h-2 p-2 flex justify-center items-center"}>
            {notCount.count}
          </div>}

      </Button>
    </Link>

  );
});
