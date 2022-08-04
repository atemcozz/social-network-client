import React, { useState } from "react";
import Button from "../UI/Button/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import NavActions from "../UI/Sidemenu/NavActions";
const Header = () => {
  const [sideMenu, setSideMenu] = useState(false);
  return (
    <header className="bg-back shadow-lg w-full fixed h-16 top-0 left-0 z-20  ">
      <div
        className={`z-50  inset-0 bg-[rgba(0,0,0,0.75)] ${
          sideMenu ? "fixed" : "hidden"
        } `}
        onClick={() => setSideMenu(false)}
      >
        <div
          className="fixed inset-y-0 left-0 bg-back w-4/6 rounded-br-3xl rounded-tr-3xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <NavActions />
        </div>
      </div>
      <div className="flex justify-between items-center mx-auto h-full max-w-screen-xl p-2">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant={"outlined"}
            className="md:hidden"
            onClick={() => setSideMenu(true)}
          >
            <GiHamburgerMenu size={"1.5rem"} />
          </Button>
          <div className=" text-xl font-bold text-text-base">
            {" "}
            <span className="text-primary">Social</span>Network
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button variant={"outlined"}>Sign in</Button>
          <Button variant={"primary"}>Sign up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
