import classNames from "classnames";
import React from "react";

const Tabs = ({ children }) => {
  return (
    <div className="font-medium text-text-base  bg-back-lighter">
      <ul className="flex flex-wrap">{children}</ul>
    </div>
  );
};
const Item = ({ children, active, onClick }) => {
  return (
    <li
      className={classNames(
        `flex items-center justify-center p-2 border-b-2 
       hover:border-primary hover:bg-secondary cursor-pointer flex-1
       ease-in duration-100`,
        active ? "border-primary" : "border-transparent"
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
Tabs.Item = Item;
export default Tabs;
