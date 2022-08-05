import React from "react";
import NavActions from "../UI/Sidemenu/NavActions";
const ActionSideMenu = () => {
  return (
    <aside className="hidden md:block sticky top-0 w-96 h-screen">
      <div className="h-min bg-back p-4 rounded-lg">
        <NavActions />
      </div>
    </aside>
  );
};

export default ActionSideMenu;
