import React from "react";
import Header from "../Header/Header";
import ActionSideMenu from "../../ActionSideMenu/ActionSideMenu";
import SideMenu from "../SideMenu/SideMenu";

const MainLayout = ({page, children}) => {
  return (
    <div className="App bg-back-darker text-text-base">
      <Header page={page}/>
      <div className={"flex mt-16"}>
        <aside className={"hidden lg:flex flex-1"}>
        </aside>
        <main className="w-full lg:max-w-screen-md py-5 px-4">{children}</main>
        <aside className={"hidden lg:flex flex-1"}></aside>
      </div>


    </div>
  );
};

export default MainLayout;
