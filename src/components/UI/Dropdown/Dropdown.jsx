import classNames from "classnames";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
const Dropdown = ({ items, defaultItem, placeholder }) => {
  const [dropdown, setDropdown] = useState(false);
  const [value, setValue] = useState({ name: placeholder, value: "" });
  const dropdownRef = useRef();
  const menuRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
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
    <div className="relative">
      <button
        ref={menuRef}
        onClick={(e) => {
          e.preventDefault();
          setDropdown((state) => !state);
        }}
        className={
          "bg-secondary text-text-base text-sm rounded-lg w-full p-2.5 flex items-center gap-1"
        }
      >
        <MdArrowDropDown size="24px" />
        {value?.name}
      </button>
      <div
        ref={dropdownRef}
        className={classNames(
          dropdown ? "block" : "hidden",
          "absolute top-0 right-0 left-0 bg-back-darker shadow rounded z-10 max-h-64 overflow-auto"
        )}
        onClick={() => setDropdown(false)}
      >
        <ul>
          {items?.map((item) => (
            <Item onClick={() => setValue(item)}>{item.name}</Item>
          ))}
        </ul>
      </div>
    </div>
  );
};
const Item = ({ icon, onClick, children }) => {
  return (
    <li
      className="w-full p-3 hover:bg-back-darkest ease-in duration-100 cursor-pointer flex gap-2 items-center"
      onClick={onClick}
    >
      {icon}
      <div className="select-none">{children}</div>
    </li>
  );
};
Dropdown.Item = Item;
export default Dropdown;
