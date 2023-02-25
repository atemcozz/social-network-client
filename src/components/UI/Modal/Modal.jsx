import classNames from "classnames";
import React from "react";

const Modal = ({ children, active, container, onBgClick }) => {
  return (
    <div
      className={classNames(
        { hidden: !active },
        "fixed inset-0 bg-[rgba(0,0,0,0.75)] flex justify-center items-center z-40"
      )}
      onClick={onBgClick}
    >
      <div
        className={classNames(
          container && "p-2 rounded-lg bg-back shadow",
          "z-50"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
