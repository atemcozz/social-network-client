import React from "react";
import NavActions from "../UI/Sidemenu/NavActions";
const ActionSideMenu = () => {
  return (
    <aside className="hidden md:block sticky top-20 max-h-[80vh]">
      <div className="h-min bg-back p-4 rounded-lg overflow-y-auto">
        <NavActions />
      </div>
    </aside>
  );
};

export default ActionSideMenu;
