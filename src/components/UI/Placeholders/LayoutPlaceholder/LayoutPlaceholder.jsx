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
        <div className="mt-4 md:grid md:grid-cols-[2fr_minmax(0,5fr)_2fr]">
          <aside className="hidden md:block sticky top-20 h-96 rounded-lg shadow-md h-full bg-back p-4">
            <BoxPlaceholder />
          </aside>
          <div className="px-4">
            <LinePlaceholder className={"h-7 w-32 mb-4"} />
            <PostPlaceholder />
          </div>
          <aside className="hidden md:block sticky top-20 h-96 rounded-lg shadow-md h-full bg-back p-4">
            <BoxPlaceholder />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LayoutPlaceholder;
