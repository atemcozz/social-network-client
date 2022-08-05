import React from "react";
import NavActions from "../UI/Sidemenu/NavActions";
const ActionSideMenu = () => {
  return (
    <aside className="hidden md:block h-min bg-back w-96 p-4 rounded-lg">
      <NavActions />
    </aside>
  );
};

export default ActionSideMenu;
