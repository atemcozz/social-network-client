import classNames from "classnames";
import React, {forwardRef} from "react";

const TextArea = forwardRef(({className, autoExpand, maxHeight, ...props}, ref) => {
  return (
    <textarea

      className={classNames(
        `bg-secondary border border-secondary-darker text-text-base placeholder:text-text-base 
      text-sm rounded-lg focus:ring-primary focus:border-primary w-full 
      p-2.5 overflow-x-hidden`,
        className,
      )}
      onInput={(e) => {
        e.target.style.height = "";
        e.target.style.height =
          Math.min(e.target.scrollHeight, maxHeight) + "px";
      }}
      ref={ref}
      {...props}
    />
  );
});

export default TextArea;
