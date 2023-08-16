import classNames from "classnames";
import React, {useRef, useState} from "react";
import {MdArrowDropDown} from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";

const Select = ({options, selected, onChange, placeholder = "Выбрать"}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  function handleOptionClick(value) {
    onChange(value);

  }

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });
  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => {
          setIsOpen((state) => !state);
        }}
        className={
          "bg-secondary text-text-base text-sm rounded-lg w-full p-2.5 flex items-center gap-1 cursor-pointer"
        }
      >
        <MdArrowDropDown size="24px"/>
        {selected?.title || placeholder}
      </div>
      {isOpen &&
        <ul className={classNames(
          "absolute top-12 right-0 left-0 bg-secondary shadow-lg rounded z-10 max-h-64 overflow-auto",
        )}
            onClick={() => setIsOpen(false)}>
          {options?.map((item, index) => (
            <Option onClick={handleOptionClick} key={index} option={item}/>
          ))}
        </ul>}

    </div>
  );
};
const Option = ({onClick, option: {value, title}}) => {
  return (
    <li
      className="w-full p-3 bg-secondary hover:bg-secondary-darker ease-in duration-100 cursor-pointer flex gap-2 items-center select-none"
      value={value}
      onClick={() => onClick(value)}
      tabIndex={0}
    >
      {title}
    </li>
  );
};
export default Select;
