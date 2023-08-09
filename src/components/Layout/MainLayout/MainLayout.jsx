import React from "react";
import Header from "../../Header/Header";
import ActionSideMenu from "../../ActionSideMenu/ActionSideMenu";

const MainLayout = ({page, children}) => {
  return (
    <div className="App bg-back-darker text-text-base">
      <Header page={page}/>
      <div className={"py-5 md:px-6 px-4"}>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex">
            <main className="w-full lg:max-w-2xl mx-auto">{children}</main>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
