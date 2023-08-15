import classNames from "classnames";
import React, {forwardRef} from "react";

const Input = forwardRef(({className, ...props}, ref) => {
  return (
    <input

      className={classNames(
        `bg-secondary border border-secondary-darker text-text-base placeholder:text-text-base text-sm \
              rounded-lg w-full p-2.5 disabled:text-text-secondary disabled:border-0 disabled:bg-secondary-darker`,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
