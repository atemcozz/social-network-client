import React from "react";

import { MdOutlineInfo } from "react-icons/md";
const InfoLabel = ({ variant = "info", children }) => {
  return (
    <div className="bg-secondary p-2 rounded-lg flex items-center gap-1 font-bold text-sm md:text-base">
      <MdOutlineInfo size={"32px"} className="shrink-0" />
      {children}
    </div>
  );
};

export default InfoLabel;
