import React, {useContext} from "react";
import {BsFillPersonFill} from "react-icons/bs";
import {BsBookmarkFill} from "react-icons/bs";
import {FaClock, FaFire, FaPlus, FaSearch, FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {IoTimer, IoCreate} from "react-icons/io5";
import {HiFire} from "react-icons/hi";

import {MdCategory, MdDarkMode, MdSearch} from "react-icons/md";

import Toggle from "../Toggle/Toggle";
import {ThemeContext} from "../../../providers/ThemeProvider";

import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react";
import NavLink from "../NavLink/NavLink";
import {useState} from "react";
import {useEffect} from "react";
import store from "../../../store";
import {memo} from "react";
import Button from "../Button/Button";

const NavActions = () => {


  const [theme, setTheme] = useContext(ThemeContext);
  const [route, setRoute] = useState();
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setRoute(location.pathname);
    }
  }, [location]);
  return (
    <div className="overflow-y-auto max-h-full">
      {!store.auth && (
        <>
          <NavLink to={"/login"} className="text-primary">
            <FaSignInAlt size={"32px"}/>
            Логин
          </NavLink>
          <NavLink to={"/register"} className="text-primary">
            <FaSignInAlt size={"32px"}/>
            Регистрация
          </NavLink>
        </>
      )}
      {store.auth && (
        <>
          <NavLink to={"/create"} active={route?.startsWith("/create")} className={"text-primary"}>
            <FaPlus size={"32px"}/>
            Новый пост
          </NavLink>
          <NavLink
            to={`/user/${store.user.id}`}
            active={route?.startsWith(`/user`)}
          >
            <BsFillPersonFill size={"32px"}/> Профиль
          </NavLink>
          <NavLink to={"/saved"} active={route?.startsWith("/saved")}>
            <BsBookmarkFill size={"32px"}/>
            Закладки
          </NavLink>
        </>
      )}
      <NavLink to={"/new"} active={route?.startsWith("/new")}>
        <FaClock className="" size={"32px"}/>
        Новое
      </NavLink>
      <NavLink to={"/popular"} active={route?.startsWith("/popular")}>
        <FaFire size={"32px"}/>
        Популярное
      </NavLink>
      {store.auth &&
        <NavLink to={"/feed"} active={route?.startsWith("/feed")}>
          <MdCategory size={"32px"}/> Подписки
        </NavLink>
      }
      <NavLink to={"/search"} active={route?.startsWith("/search")}>
        <FaSearch size={"32px"}/>
        Поиск
      </NavLink>
      <div className="p-2 bg-secondary flex items-center justify-between text-text-base ">
        <span className={"flex gap-2"}>
          <MdDarkMode size={"32px"}/>
          Тёмная тема
        </span>

        <Toggle
          active={theme === "theme-dark"}
          onChange={(enabled) => {
            setTheme(enabled ? "theme-dark" : "theme-light");
          }}
        />
      </div>
      {store.auth && (
        <NavLink
          onClick={() => {
            store.logout();
          }}
          to={"/new"}
        >
          <FaSignOutAlt size={"32px"}/>
          Выйти
        </NavLink>
      )}
    </div>
  );
};

export default memo(observer(NavActions));
