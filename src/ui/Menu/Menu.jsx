import React, {forwardRef, useRef, useState} from 'react';
import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";
import {FaAngleDown} from "react-icons/fa";

const Menu = ({active, children}) => {

  return (
    <div className={"relative mt-1"}>

      {active &&
        <ul className={"absolute bg-secondary right-0 shadow-lg rounded overflow-hidden z-10 w-max"}>
          {children}
        </ul>
      }
    </div>
  );
};
Menu.Item = forwardRef(({onClick, children}, ref) => {
  return <li
    ref={ref}
    className="p-3 bg-secondary hover:bg-secondary-darker ease-in duration-100 cursor-pointer flex gap-2 items-center"
    onClick={onClick}>
    {children}
  </li>;
});
export default Menu;