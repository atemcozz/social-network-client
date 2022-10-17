import React from "react";

const TextArea = ({ className, ...props }) => {
  return (
    <textarea
      {...props}
      className={`bg-secondary border border-secondary-darker text-text-base placeholder:text-text-base 
      text-sm rounded-lg focus:ring-primary focus:border-primary block w-full 
      p-2.5 resize-none ${className ? className : ""}`}
    />
  );
};

export default TextArea;
