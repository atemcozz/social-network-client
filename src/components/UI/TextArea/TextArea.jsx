import classNames from "classnames";
import React from "react";

const TextArea = ({ className, autoExpand, maxHeight, ...props }) => {
  return (
    <textarea
      {...props}
      className={classNames(
        `bg-secondary border border-secondary-darker text-text-base placeholder:text-text-base 
      text-sm rounded-lg focus:ring-primary focus:border-primary w-full 
      p-2.5 resize-none overflow-x-hidden`,
        className
      )}
      onInput={(e) => {
        e.target.style.height = "";
        e.target.style.height =
          Math.min(e.target.scrollHeight, maxHeight) + "px";
      }}
    />
  );
};

export default TextArea;
