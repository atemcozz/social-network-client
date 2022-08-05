import React, { useState } from "react";
import Button from "../UI/Button/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import NavActions from "../UI/Sidemenu/NavActions";
import { Transition } from "@headlessui/react";

const Header = () => {
  const [sideMenu, setSideMenu] = useState(false);
  return (
    <header className="bg-back shadow-lg w-full fixed h-16 top-0 left-0 z-20">
      <Transition show={sideMenu}>
        <Transition.Child
          enter="transition-opacity duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed h-[200vh] z-50 inset-0 bg-[rgba(0,0,0,0.75)]`}
            onClick={() => setSideMenu(false)}
          >
            <Transition.Child
              enter="transition ease-in-out duration-250 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-250 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div
                className={`fixed h-screen bg-back w-4/6 rounded-br-3xl rounded-tr-3xl p-4`}
                onClick={(e) => e.stopPropagation()}
              >
                <NavActions />
              </div>
            </Transition.Child>
          </div>
        </Transition.Child>
      </Transition>
      <div className="flex justify-between items-center mx-auto h-full max-w-screen-lg p-2">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant={"outlined"}
            className="md:hidden"
            onClick={() => setSideMenu(true)}
          >
            <GiHamburgerMenu size={"24px"} />
          </Button>
          <div className=" text-xl font-bold text-text-base">
            {" "}
            <span className="text-primary">Social</span>Network
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between gap-3">
          <Button variant={"outlined"}>Sign in</Button>
          <Button variant={"primary"}>Sign up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
