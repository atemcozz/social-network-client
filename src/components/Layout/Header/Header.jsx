import React, {useState, useEffect} from "react";
import Button from "../../../ui/Button/Button";
import {GiHamburgerMenu} from "react-icons/gi";
import NavActions from "../../../ui/Sidemenu/NavActions";
import {Transition} from "@headlessui/react";
import {Link, useNavigate} from "react-router-dom";

import {FaSearch, FaPlus, FaFire, FaClock, FaAngleDown} from "react-icons/fa";
import {MdCategory} from "react-icons/md";
import {SiFalcon} from "react-icons/si";
import store from "../../../store";
import {ProfileHeaderDropdown} from "../../../features/User";
import {observer} from "mobx-react";
import MobileSideMenu from "./MobileSideMenu";
import {NotificationsButton} from "../../../features/User";
import FalcoIcon from "../../../ui/Icons/FalcoIcon/FalcoIcon";


const Header = ({page}) => {


  const [sideMenu, setSideMenu] = useState(false);
  return (
    <header className="bg-back shadow-lg w-full fixed h-16 top-0 left-0 z-20">

      <MobileSideMenu active={sideMenu} onCancel={() => setSideMenu(false)}/>

      <div className="flex justify-between items-center mx-auto h-full max-w-screen-xl py-2 md:px-4 ">
        <div className="flex items-center gap-3 flex-1 mx-4">
          {!store.userLoading && (
            <Button
              variant={"outlined"}
              className="lg:hidden"
              onClick={() => setSideMenu(true)}
            >
              <GiHamburgerMenu size={"24px"}/>
            </Button>
          )}
          <Link to={"/"}>
            <span className="flex items-center ">
              <span className="text-2xl font-bold text-text-base">Falco</span>
              <FalcoIcon width={32} height={32}/>
            </span>
          </Link>
        </div>


        <div className={"hidden lg:flex flex-1 gap-2 justify-center mx-4"}>
          <Link to={"/popular"}>
            <Button variant={page === "popular" ? "primary" : "secondary"} tabIndex={"-1"}>
              <FaFire size={"24px"}/> Популярное
            </Button>
          </Link>
          <Link to={"/new"}>
            <Button variant={page === "new" ? "primary" : "secondary"} tabIndex={"-1"}>
              <FaClock size={"24px"}/> Новое
            </Button>
          </Link>
          {store.auth && <Link to={"/feed"}>
            <Button variant={page === "feed" ? "primary" : "secondary"} tabIndex={"-1"}>
              <MdCategory size={"24px"}/> Подписки
            </Button>
          </Link>}

        </div>
        <div className={"hidden md:flex gap-2 items-center justify-center mx-4 flex-1"}>
          {store.auth &&
            <Link to={"/create"}>
              <Button variant={"primary"} tabIndex={"-1"}>
                <FaPlus size={"24px"}/>
                Создать
              </Button>
            </Link>
          }
          <Link to={"/search"}>
            <Button variant={"secondary"} tabIndex={"-1"}>
              <FaSearch size={"24px"}/>
            </Button>
          </Link>

          {store.auth && store.user &&
            <>
              <NotificationsButton/>
              <ProfileHeaderDropdown user={store.user}/>
            </>
          }
          {!store.auth && <div className="flex items-center justify-between gap-2">
            <Link to={"/login"}>
              <Button variant={"secondary"} tabIndex={"-1"}>
                Войти
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button variant={"primary"} tabIndex={"-1"}>
                Регистрация
              </Button>
            </Link>
          </div>}
        </div>
        <div className={"flex md:hidden mx-4"}>
          {store.auth && store.user &&
            <NotificationsButton/>
          }
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
