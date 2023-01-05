import classNames from "classnames";
import React from "react";
const SidemenuButton = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "rounded-lg p-2 ease-in duration-100 bg-secondary hover:bg-secondary-darker flex items-center gap-2 text-text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SidemenuButton;
