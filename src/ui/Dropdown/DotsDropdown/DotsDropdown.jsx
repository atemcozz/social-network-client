import classNames from "classnames";
import React, {useEffect, useRef, useState} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";

const DotsDropdown = ({children}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const menuRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    children && (
      <div className="relative">
        <button
          ref={menuRef}
          onClick={() => setDropdown((state) => !state)}
          className={"flex items-center"}
        >
          <BsThreeDotsVertical size="24px"/>
        </button>
        <div
          ref={dropdownRef}
          className={classNames(
            dropdown ? "block" : "hidden",
            "absolute top-0 right-0 w-max bg-secondary shadow rounded overflow-hidden z-10",
          )}
          onClick={() => setDropdown(false)}
        >
          <ul>{children}</ul>
        </div>
      </div>
    )
  );
};
const Item = ({icon, onClick, children}) => {
  return (
    <li
      onClick={onClick}
    >
      <a href="#"
         tabIndex={0}
         className={"p-3 w-full h-full inline-block bg-secondary focus:bg-secondary-darker hover:bg-secondary-darker ease-in duration-100 cursor-pointer"}>
        <span className={"flex gap-2"}>
          {icon}
          {children}
        </span>
      </a>
    </li>
  );
};
DotsDropdown.Item = Item;
export default DotsDropdown;
