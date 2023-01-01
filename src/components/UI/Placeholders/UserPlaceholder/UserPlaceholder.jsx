import React from "react";
import AvatarPlaceholder from "../AvatarPlaceholder/AvatarPlaceholder";
import LinePlaceholder from "../LinePlaceholder/LinePlaceholder";
import BoxPlaceholder from "../BoxPlaceholder/BoxPlaceholder";
const UserPlaceholder = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <LinePlaceholder big className={"w-32"} />
      </div>
      <div className="flex rounded-lg shadow-md p-4 bg-back gap-4 md:gap-10">
        <AvatarPlaceholder size="big" />

        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-2">
            <LinePlaceholder big className={"w-36"} />
            <LinePlaceholder className={"w-24"} />
            <LinePlaceholder className={"w-16"} />
          </div>
          <div className="flex gap-2 h-8">
            <BoxPlaceholder className={"w-16"} />
            <BoxPlaceholder className={"w-16"} />
            <BoxPlaceholder className={"w-16"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlaceholder;
