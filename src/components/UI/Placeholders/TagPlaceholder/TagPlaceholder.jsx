import React from "react";
import styles from "../common/placeholder.module.css";
const TagPlaceholder = ({ className }) => {
  return (
    <div
      className={`rounded-full shadow-md
  w-16 h-5 ${styles.placeholder} ${className || ""}`}
    ></div>
  );
};

export default TagPlaceholder;
