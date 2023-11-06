import React, {useEffect, useRef} from "react";
import {memo} from "react";
import NavActions from "../../ui/Sidemenu/NavActions";

const ActionSideMenu = () => {

  return (
    <aside className="hidden lg:block sticky top-20 max-h-[80vh] w-80 ml-6">
      <div className="h-min bg-back p-4 rounded-lg overflow-y-auto">
        <div className="rounded-lg overflow-hidden">
          <NavActions/>
        </div>
      </div>
    </aside>
  );
};

export default memo(ActionSideMenu);
