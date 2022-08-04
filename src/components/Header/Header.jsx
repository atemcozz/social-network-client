import React from "react";
import Button from "../UI/Button/Button";
import { GiHamburgerMenu } from "react-icons/gi";
const Header = () => {
  return (
    <header className="bg-back shadow-lg w-full fixed h-16 top-0 left-0 z-20  ">
      <div className="flex justify-between items-center mx-auto h-full max-w-screen-xl p-2">
        <div className="flex items-center justify-between gap-3">
          <Button variant={"outlined"} className="md:hidden">
            <GiHamburgerMenu size={"1.5rem"} />
          </Button>
          <div className=" text-xl font-bold text-text-base">SocialNetwork</div>
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
