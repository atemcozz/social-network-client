import React from 'react';
import {FaTools} from "react-icons/fa";

const TechWorksBoundary = ({children}) => {
  if (process.env.REACT_APP_TECHNICAL_WORKS === "1") {
    return (
      <div className="fixed inset-0 bg-back text-text-base flex justify-center items-center text-xl">
        <div className={"flex flex-col gap-4 items-center font-bold text-center"}>
          <FaTools size={"64px"}/>
          На сайте ведутся технические работы
        </div>
      </div>
    );
  }
  return (
    <>
      {children}
    </>
  );
};

export default TechWorksBoundary;