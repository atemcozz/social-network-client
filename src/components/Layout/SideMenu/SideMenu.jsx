import React, {useEffect, useState} from 'react';
import NavLink from "../../../ui/NavLink/NavLink";
import {FaClock, FaFire, FaSearch} from "react-icons/fa";
import {Link, useLocation} from "react-router-dom";
import Button from "../../../ui/Button/Button";

const SideMenu = () => {
  const [route, setRoute] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setRoute(location.pathname);
    }
  }, [location]);
  return (
    <div className={"w-64 bg-back shadow-lg h-screen fixed rounded-lg mt-4 ml-4"}>
      <div className={"flex flex-col gap-2 pt-4 px-4"}>
        <Link to={"/new"}>
          <Button variant={route?.startsWith("/new") ? "primary" : "secondary"} className={"w-full"}>
            <FaClock className="" size={"32px"}/>
            Новое
          </Button>
        </Link>
        <Link to={"/popular"}>
          <Button variant={route?.startsWith("/popular") ? "primary" : "secondary"} className={"w-full"}>
            <FaFire size={"32px"}/>
            Популярное
          </Button>
        </Link>
        <Link to={"/search"}>
          <Button variant={route?.startsWith("/search") ? "primary" : "secondary"} className={"w-full"}>
            <FaSearch size={"32px"}/>
            Поиск
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;