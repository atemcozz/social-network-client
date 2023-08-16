import React from 'react';
import {FiMeh} from "react-icons/fi";

const NoContentMessage = () => {
  return (
    <div className={"flex justify-center items-center  p-2 shadow rounded-lg h-64 bg-back"}>
      <span className={"font-bold text-xl flex flex-col items-center gap-4"}>
        <FiMeh size={"64px"}/>
        Здесь ничего нет :(
      </span>
    </div>
  );
};

export default NoContentMessage;