import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`bg-secondary text-text-base placeholder:text-text-base text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 ${
        className ? className : ""
      }`}
    />
  );
};

export default Input;
