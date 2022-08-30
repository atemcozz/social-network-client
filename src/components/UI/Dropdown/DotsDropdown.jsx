import React from "react";
import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const DotsDropdown = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);
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
        onClick={() => setDropdown((state) => !state)}
        className={"flex items-center"}
      >
        <BsThreeDotsVertical size="24px" />
      </button>
      <div
        ref={dropdownRef}
        className={`${
          dropdown ? "block" : "hidden"
        } absolute top-12 right-0 w-max bg-back-darker shadow rounded overflow-hidden`}
        onClick={() => setDropdown(false)}
      >
        <ul>
          {items &&
            items.map(
              (item, index) =>
                item && (
                  <li
                    key={index}
                    className="p-3 hover:bg-back-darkest ease-in duration-100 cursor-pointer flex gap-2 items-center"
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <div className="select-none">{item.name}</div>
                  </li>
                )
            )}
        </ul>
      </div>
    </div>
  );
};

export default DotsDropdown;
