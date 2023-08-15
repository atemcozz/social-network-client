import React from "react";
import Header from "../Header/Header";
import ActionSideMenu from "../../ActionSideMenu/ActionSideMenu";

const AuthLayout = ({page, children}) => {
  return (
    <div className="App bg-back-darker text-text-base">
      <Header page={page}/>
      <div className={"py-5 md:px-6 px-4 mt-16"}>
        <div className="max-w-screen-lg mx-auto">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
