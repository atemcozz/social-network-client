import React, { useContext } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { IoTimer, IoCreate } from "react-icons/io5";
import { HiFire } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { MdMap, MdSearch } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Toggle from "../Toggle/Toggle";
import { AppContext } from "../../../App";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
  CREATE_POST_ROUTE,
  NEW_POSTS_ROUTE,
  POPULAR_POSTS_ROUTE,
} from "../../../utils/routes";
import { Context } from "../../../index";
import { observer } from "mobx-react";
import NavLink from "../NavLink/NavLink";
import { useState } from "react";
import { useEffect } from "react";
const NavActions = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const { getTheme, setTheme } = useContext(AppContext);
  const [route, setRoute] = useState();
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setRoute(location.pathname);
    }
  }, [location]);
  return (
    <div className="overflow-y-auto max-h-full">
      {!store.isAuth && (
        <>
          <NavLink to={LOGIN_ROUTE} className="text-primary">
            <FaSignInAlt size={"32px"} />
            Логин
          </NavLink>
          <NavLink to={REGISTER_ROUTE} className="text-primary">
            <FaSignInAlt size={"32px"} />
            Регистрация
          </NavLink>
        </>
      )}
      {store.isAuth && (
        <NavLink
          to={`/user/${store.user.id}`}
          active={route?.startsWith(`/user`)}
        >
          <BsFillPersonFill size={"32px"} /> Профиль
        </NavLink>
      )}
      <NavLink to={NEW_POSTS_ROUTE} active={route?.startsWith("/new")}>
        <IoTimer size={"32px"} />
        Новое
      </NavLink>
      <NavLink to={POPULAR_POSTS_ROUTE} active={route?.startsWith("/popular")}>
        <HiFire size={"32px"} />
        Популярное
      </NavLink>
      <NavLink to={"/search"} active={route?.startsWith("/search")}>
        <MdSearch size={"32px"} />
        Поиск
      </NavLink>
      {/* <Button variant={"secondary"}>
        <BiCategory size={"32px"} />
        Поиск
      </Button> */}

      {store.isAuth && (
        <>
          <NavLink to={CREATE_POST_ROUTE} active={route?.startsWith("/create")}>
            <IoCreate size={"32px"} />
            Новый пост
          </NavLink>
          {/* <Button variant={"secondary"}>
            <BsBookmarkFill size={"32px"} />
            Закладки
          </Button> */}
        </>
      )}

      <div className="p-2 bg-secondary flex items-center justify-between gap-2 text-text-base ">
        Тёмная тема
        <Toggle
          active={getTheme() === "theme-dark"}
          onChange={(enabled) => {
            setTheme(enabled ? "theme-dark" : "theme-light");
          }}
        />
      </div>
      {store.isAuth && (
        <NavLink
          onClick={() => {
            store.logout();
          }}
          to={HOME_ROUTE}
        >
          <FaSignOutAlt size={"32px"} />
          Выйти
        </NavLink>
      )}
    </div>
  );
};

export default observer(NavActions);
