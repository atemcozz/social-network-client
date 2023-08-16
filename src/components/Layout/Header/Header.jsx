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


const Header = ({page}) => {


  const [sideMenu, setSideMenu] = useState(false);
  return (
    <header className="bg-back shadow-lg w-full fixed h-16 top-0 left-0 z-20">

      <MobileSideMenu active={sideMenu} onCancel={() => setSideMenu(false)}/>

      <div className="flex justify-between items-center mx-auto h-full max-w-screen-xl py-2 md:px-4 ">
        <div className="flex items-center gap-3 w-64 mx-4">
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
            <div className="flex items-center ">
              <div className=" text-2xl font-bold text-text-base">Falco</div>
              <SiFalcon size={"32px"} className={"text-primary"}/>
            </div>
          </Link>
        </div>


        <div className={"hidden lg:flex flex-1 gap-2 justify-center mx-4"}>
          <Link to={"/popular"}>
            <Button variant={page === "popular" ? "primary" : "secondary"}>
              <FaFire size={"24px"}/> Популярное
            </Button>
          </Link>
          <Link to={"/new"}>
            <Button variant={page === "new" ? "primary" : "secondary"}>
              <FaClock size={"24px"}/> Новое
            </Button>
          </Link>
          {store.auth && <Link to={"/feed"}>
            <Button variant={page === "feed" ? "primary" : "secondary"}>
              <MdCategory size={"24px"}/> Подписки
            </Button>
          </Link>}

        </div>
        <div className={"hidden md:flex gap-2 items-center w-64 justify-center mx-4"}>
          {store.auth &&
            <Link to={"/create"}>
              <Button variant={"primary"}>
                <FaPlus size={"24px"}/>
                Создать
              </Button>
            </Link>
          }
          <Link to={"/search"}>
            <Button variant={"secondary"}>
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
              <Button variant={"secondary"}>
                Войти
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button variant={"primary"}>
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
