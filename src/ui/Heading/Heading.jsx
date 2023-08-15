import classNames from "classnames";
import React from "react";

const Heading = ({ children, className, ...args }) => {
  return (
    <h1 className={classNames("font-bold text-xl mb-4", className)} {...args}>
      {children}
    </h1>
  );
};

export default Heading;
