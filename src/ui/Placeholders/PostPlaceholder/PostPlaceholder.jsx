import React from "react";
import AvatarPlaceholder from "../AvatarPlaceholder/AvatarPlaceholder";
import LinePlaceholder from "../LinePlaceholder/LinePlaceholder";
import BoxPlaceholder from "../BoxPlaceholder/BoxPlaceholder";
import TagPlaceholder from "../TagPlaceholder/TagPlaceholder";

const PostPlaceholder = () => {
  return (
    <div className="flex flex-col rounded-lg shadow-md p-4 bg-back gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <AvatarPlaceholder/>

          <div className="flex flex-col justify-center gap-2">
            <LinePlaceholder className={"w-32"}/>
            <LinePlaceholder className={"w-32"}/>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-hidden">
        <LinePlaceholder big/>
        <BoxPlaceholder className={"h-16"}/>
        <BoxPlaceholder className={"h-72"}/>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <TagPlaceholder/>
        <TagPlaceholder/>
        <TagPlaceholder/>
      </div>
    </div>
  );
};

export default PostPlaceholder;
