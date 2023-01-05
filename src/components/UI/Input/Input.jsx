import classNames from "classnames";
import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={classNames(
        "bg-secondary border border-secondary-darker text-text-base placeholder:text-text-base text-sm rounded-lg focus:ring-primary focus:border-primary w-full p-2.5",
        className
      )}
    />
  );
};

export default Input;
