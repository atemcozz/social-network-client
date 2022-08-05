import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { IoTimer } from "react-icons/io5";
import { HiFire } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import SidemenuButton from "./SidemenuButton";
const NavActions = () => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-full">
      <SidemenuButton className=" text-text-base">
        <BsFillPersonFill size={"2rem"} /> Профиль
      </SidemenuButton>
      <SidemenuButton>
        <IoTimer size={"2rem"} />
        Новое
      </SidemenuButton>
      <SidemenuButton>
        <HiFire size={"2rem"} />
        Популярное
      </SidemenuButton>
      <SidemenuButton>
        <BiCategory size={"2rem"} />
        Категории
      </SidemenuButton>
      <SidemenuButton variant="secondary">
        <BsBookmarkFill size={"2rem"} />
        Закладки
      </SidemenuButton>
    </div>
  );
};

export default NavActions;
