import classNames from "classnames";
import React from "react";

const TextArea = ({ className, ...props }) => {
  return (
    <textarea
      {...props}
      className={classNames(
        `bg-secondary border border-secondary-darker text-text-base placeholder:text-text-base 
      text-sm rounded-lg focus:ring-primary focus:border-primary w-full 
      p-2.5 resize-none`,
        className
      )}
    />
  );
};

export default TextArea;
