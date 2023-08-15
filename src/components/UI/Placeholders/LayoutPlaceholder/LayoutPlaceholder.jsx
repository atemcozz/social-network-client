import React from "react";
import PostPlaceholder from "../PostPlaceholder/PostPlaceholder";
import LinePlaceholder from "../LinePlaceholder/LinePlaceholder";
import HeaderPlaceholder from "../HeaderPlaceholder/HeaderPlaceholder";

const LayoutPlaceholder = () => {
  return (
    <div className="App bg-back-darker text-text-base">
      <HeaderPlaceholder/>
      <div className={"py-5 md:px-6 px-4 mt-16"}>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex">
            <main className="w-full lg:max-w-2xl mx-auto flex flex-col gap-4">
              <LinePlaceholder big className={"w-32"}/>
              <PostPlaceholder/>
              <PostPlaceholder/></main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPlaceholder;
