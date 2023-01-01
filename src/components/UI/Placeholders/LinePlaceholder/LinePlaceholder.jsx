import React from "react";
import styles from "../common/placeholder.module.css";
const LinePlaceholder = ({ className, big = false }) => {
  return (
    <div
      className={`rounded-full shadow-md ${big ? "h-8" : "h-3"} ${
        styles.placeholder
      } ${className || ""}`}
    ></div>
  );
};

export default LinePlaceholder;
