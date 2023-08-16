import React from "react";
import {SiFalcon} from "react-icons/si";
import ButtonPlaceholder from "../ButonPlaceholder/ButtonPlaceholder";

const HeaderPlaceholder = ({page}) => {


  return (
    <header className="bg-back shadow-lg w-full fixed h-16 top-0 left-0 z-20">

      <div className="flex justify-between items-center mx-auto h-full max-w-screen-xl py-2 ">
        <div className="flex items-center gap-3 w-64 mx-4">
          <div className="flex items-center ">
            <div className=" text-2xl font-bold text-text-base">Falco</div>
            <SiFalcon size={"32px"} className={"text-primary"}/>
          </div>
        </div>

        <div className={"hidden md:flex flex-1 gap-2 justify-center mx-4"}>
          <ButtonPlaceholder/>
          <ButtonPlaceholder/>
        </div>
        <div className={"hidden md:flex gap-2 items-center w-64 justify-center mx-4"}>
          <ButtonPlaceholder/>
        </div>

      </div>
    </header>
  );
};

export default HeaderPlaceholder;
