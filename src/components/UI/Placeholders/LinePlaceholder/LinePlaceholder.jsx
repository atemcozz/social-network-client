import React from "react";
import styles from "../common/placeholder.module.css";
const LinePlaceholder = ({ className }) => {
  return (
    <div
      className={`rounded-full shadow-md h-3 ${styles.placeholder} ${
        className || ""
      }`}
    ></div>
  );
};

export default LinePlaceholder;
