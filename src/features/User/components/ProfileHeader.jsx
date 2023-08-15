import React, {useEffect, useState} from 'react';
import Heading from "../../../ui/Heading";
import DotsDropdown from "../../../ui/Dropdown/DotsDropdown/DotsDropdown";
import {MdContentCopy, MdModeEditOutline} from "react-icons/md";
import Avatar from "../../../ui/Avatar/Avatar";
import getInflectedNoun from "../../../utils/getInflectedNoun";
import Button from "../../../ui/Button/Button";
import classNames from "classnames";
import {FaMapMarkerAlt, FaUser, FaUserCheck, FaUserPlus} from "react-icons/fa";
import {UserService} from "../api/UserService";
import {Link, useNavigate} from "react-router-dom";
import store from "../../../store";
import {countriesListRus} from "../../../consts/countries";

export const ProfileHeader = ({user}) => {

  const navigate = useNavigate();
  const [md, setMd] = useState();
  const [subscribed, setSubscribed] = useState(user.subscribed);
  useEffect(() => {
    const handler = (e) => setMd(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener("change", handler);
  }, []);

  function copyLink() {
    return navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/user/${user.id}`,
    );
  }

  function handleSubscribe() {
    setSubscribed(s => !s);
    return UserService.subscribeUser(user.id);
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading>
          <span>Профиль</span>{" "}
          <span className="text-primary">{user.nickname}</span>
        </Heading>
        <DotsDropdown>
          <DotsDropdown.Item icon={<MdContentCopy size={"24px"}/>} onClick={copyLink}>
            Скопировать ссылку
          </DotsDropdown.Item>
          {store?.user?.id === user.id && (
            <DotsDropdown.Item
              icon={<MdModeEditOutline size={"24px"}/>}
              onClick={() => navigate("/edit_profile", {state: user})}
            >
              Редактировать
            </DotsDropdown.Item>
          )}
        </DotsDropdown>
      </div>
      <div className="flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back  mb-4">
        <div className={"flex gap-4 flex-wrap"}>
          {md ? (
            <Avatar src={user.avatar_url} size={"large"}/>
          ) : (
            <Avatar src={user.avatar_url} size={"big"}/>
          )}
          <div className="flex flex-col gap-2 max-w-full">
            <div className={"flex flex-col gap-1"}>
              <div className="text-xl font-bold">
                {user.nickname}
              </div>
              <div className="">
                {user.name} {user.surname}
              </div>
            </div>

            <div className={"flex flex-col gap-1"}>
              {user.country ?
                <span className={"flex gap-1 items-center"}>
                  <FaMapMarkerAlt size={"16px"}/>
                  {countriesListRus.find((option) => option.value === user.country).title}
                </span> : null
              }
              {user.sex ?
                <span className={"flex gap-1 items-center"}>
                  <FaUser size={"16px"}/>
                  {user.sex === 1 ? "Мужской" : "Женский"}
                </span> : null
              }
            </div>

          </div>
          <div className={"flex flex-col gap-2 justify-between flex-1 md:ml-4"}>
            <div className={"flex items-center flex-1"}>
              <div className={"flex justify-center gap-2 flex-1"}>
                <div className={"flex flex-col items-center p-1 flex-1 cursor-pointer"}>
                  <span className={"text-xl font-bold"}>{user.posts_count}</span>
                  <span>{getInflectedNoun(
                    user.posts_count,
                    "пост",
                    "поста",
                    "постов",
                  )}</span>
                </div>
                <Link to={"subscriptions"} className={"flex flex-col items-center p-1 flex-1  cursor-pointer"}>
                  <span className={"text-xl font-bold"}>{user.subscriptions_count}</span>
                  <span>подписок</span>
                </Link>
                <Link to={"subscribers"} className={"flex flex-col items-center p-1 flex-1 cursor-pointer"}>
                  <span className={"text-xl font-bold"}>{user.subscribers_count}</span>
                  <span>подписчиков</span>
                </Link>
              </div>
            </div>
            <div className={"flex gap-2 flex-wrap"}>
              {store?.user?.id === user.id &&
                <Button
                  onClick={() => navigate("/edit_profile", {state: user})}
                  className={classNames(
                    "text-xs md:text-base",
                  )}
                >
                  <MdModeEditOutline size={"24px"}/>
                  Редактировать
                </Button>}
              {store?.user?.id !== user.id && store?.auth &&
                <Button
                  variant={subscribed ? "secondary" : "primary"}
                  onClick={handleSubscribe}
                  className={classNames(
                    "text-xs md:text-base",
                  )}
                >
                  {subscribed ? (
                    <>
                      <FaUserCheck size={"24px"}/> Вы подписаны
                    </>
                  ) : (
                    <>
                      <FaUserPlus size={"24px"}/> Подписаться
                    </>)}
                </Button>
              }
            </div>

          </div>
        </div>
        {user.about &&
          <div className={"bg-secondary rounded-lg p-2 break-words max-w-full overflow-hidden"}>
            {user.about}
          </div>}


      </div>
    </div>

  );
};
