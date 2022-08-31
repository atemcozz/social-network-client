import React from "react";

const Modal = ({ content, active, container, onBgClick }) => {
  return (
    <div
      className={`${
        active ? "" : "hidden"
      } fixed inset-0 bg-[rgba(0,0,0,0.75)] flex justify-center items-center z-40`}
      onClick={onBgClick}
    >
      <div
        className={`${container ? "p-2 rounded-lg bg-back shadow" : ""} z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
