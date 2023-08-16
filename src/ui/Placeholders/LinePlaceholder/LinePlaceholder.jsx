import classNames from "classnames";
import React from "react";
import styles from "../common/placeholder.module.css";

const LinePlaceholder = ({className, big = false}) => {
  return (
    <div
      className={classNames(
        "rounded-full shadow-md",
        className,
        styles.placeholder,
        big ? "h-8" : "h-3",
      )}
    ></div>
  );
};

export default LinePlaceholder;
