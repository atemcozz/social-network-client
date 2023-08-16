import React from "react";
import PostPlaceholder from "../PostPlaceholder/PostPlaceholder";
import LinePlaceholder from "../LinePlaceholder/LinePlaceholder";
import HeaderPlaceholder from "../HeaderPlaceholder/HeaderPlaceholder";

const LayoutPlaceholder = () => {
  return (
    <div className="App bg-back-darker text-text-base">
      <HeaderPlaceholder/>
      <div className={"flex mt-16"}>
        <aside className={"hidden lg:flex flex-1"}>
        </aside>
        <main className="w-full lg:max-w-screen-md py-5 px-4 flex flex-col gap-4">
          <LinePlaceholder big className={"w-32"}/>
          <PostPlaceholder/>
          <PostPlaceholder/></main>
        <aside className={"hidden lg:flex flex-1"}></aside>
      </div>
    </div>
  );
};

export default LayoutPlaceholder;
