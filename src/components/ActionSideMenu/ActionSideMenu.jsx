import React from "react";
import NavActions from "../UI/Sidemenu/NavActions";
const ActionSideMenu = () => {
  return (
    <aside className="hidden md:flex flex-col sticky top-20 w-96 max-h-[70vh]">
      <div className="h-min bg-back p-4 rounded-lg overflow-y-auto flex-0">
        <NavActions />
      </div>
    </aside>
  );
};

export default ActionSideMenu;
