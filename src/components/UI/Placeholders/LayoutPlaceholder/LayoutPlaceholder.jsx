import React from "react";
import Header from "../../../Header/Header";
import BoxPlaceholder from "../BoxPlaceholder/BoxPlaceholder";
import PostPlaceholder from "../PostPlaceholder/PostPlaceholder";
import LinePlaceholder from "../LinePlaceholder/LinePlaceholder";
const LayoutPlaceholder = () => {
  return (
    <div className="App bg-back-darker text-text-base">
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-4 md:grid md:grid-cols-[2fr_minmax(0,5fr)_2fr] items-start">
          <aside className="hidden md:block sticky top-20 rounded-lg shadow-md bg-back p-4 h-96">
            <BoxPlaceholder className={"flex flex-col gap-2"} />
          </aside>
          <div className="px-4 flex flex-col gap-4">
            <LinePlaceholder big className={"w-32"} />
            <PostPlaceholder />
            <PostPlaceholder />
          </div>
          <aside className="flex-col gap-6 hidden md:flex sticky top-20 rounded-lg shadow-md bg-back p-4">
            {/* <BoxPlaceholder className={"flex flex-col gap-2"} /> */}
            <LinePlaceholder big />
            <LinePlaceholder big />
            <LinePlaceholder big />
            <LinePlaceholder big />
            <LinePlaceholder big />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LayoutPlaceholder;
