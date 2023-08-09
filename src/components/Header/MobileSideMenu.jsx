import React from 'react';
import {Transition} from "@headlessui/react";
import NavActions from "../UI/Sidemenu/NavActions";

const MobileSideMenu = ({active, onCancel}) => {
  return (
    <Transition show={active}>
      <Transition.Child
        enter="transition-opacity duration-250"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`fixed h-[200vh] z-50 inset-0 bg-[rgba(0,0,0,0.75)]`}
          onClick={onCancel}
        >
          <Transition.Child
            enter="transition ease-in-out duration-250 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-250 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className={`fixed h-screen bg-back w-4/6 rounded-br-xl rounded-tr-xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <NavActions/>
            </div>
          </Transition.Child>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default MobileSideMenu;