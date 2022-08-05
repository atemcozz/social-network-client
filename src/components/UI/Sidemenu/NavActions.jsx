import React, { useContext } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { IoTimer } from "react-icons/io5";
import { HiFire } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Toggle from "../Toggle/Toggle";
import { AppContext } from "../../../App";
import Button from "../Button/Button";
const NavActions = () => {
  const { currentAppTheme, setTheme } = useContext(AppContext);
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-full">
      <Button variant={"primary"} className={"md:hidden"}>
        <FaSignInAlt size={"32px"} />
        Логин
      </Button>
      <Button variant={"primary"} className={"md:hidden"}>
        <FaSignInAlt size={"32px"} />
        Регистрация
      </Button>
      <Button variant={"secondary"} className=" text-text-base">
        <BsFillPersonFill size={"32px"} /> Профиль
      </Button>
      <Button variant={"secondary"}>
        <IoTimer size={"32px"} />
        Новое
      </Button>
      <Button variant={"secondary"}>
        <HiFire size={"32px"} />
        Популярное
      </Button>
      <Button variant={"secondary"}>
        <BiCategory size={"32px"} />
        Категории
      </Button>
      <Button variant={"secondary"}>
        <BsBookmarkFill size={"32px"} />
        Закладки
      </Button>

      <div className="rounded-lg p-2 bg-secondary flex items-center justify-between gap-2 text-text-base ">
        Тёмная тема
        <Toggle
          active={currentAppTheme === "theme-dark"}
          onChange={(enabled) => {
            setTheme(enabled ? "theme-dark" : "theme-light");
          }}
        />
      </div>
      <Button variant={"secondary"}>
        <FaSignOutAlt size={"32px"} />
        Выйти
      </Button>
    </div>
  );
};

export default NavActions;
