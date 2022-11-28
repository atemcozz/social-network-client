import React from "react";
import Header from "../../Header/Header";
import ActionSideMenu from "../../ActionSideMenu/ActionSideMenu";
const MainLayout = ({ children }) => {
  return (
    <div className="App bg-back-darker text-text-base">
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-4 md:grid md:grid-cols-[2fr_minmax(0,5fr)_2fr]">
          <ActionSideMenu />
          <main className="w-full">{children}</main>
          <aside className="hidden md:block sticky top-20 max-h-[80vh]">
            <div className="h-96 bg-back p-4 rounded-lg"></div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
