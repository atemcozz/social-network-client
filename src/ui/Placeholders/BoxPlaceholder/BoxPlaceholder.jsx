import classNames from "classnames";
import React from "react";
import styles from "../common/placeholder.module.css";

const BoxPlaceholder = ({children, className}) => {
  return (
    <div
      className={classNames(
        "rounded-lg shadow-md h-full",
        styles.placeholder,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BoxPlaceholder;
