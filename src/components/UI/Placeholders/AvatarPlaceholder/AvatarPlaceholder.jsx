import React from "react";
import styles from "../common/placeholder.module.css";
const AvatarPlaceholder = ({ className }) => {
  return (
    <div
      className={`rounded-full w-12 h-12 shadow-md shrink-0 ${
        styles.placeholder
      } ${className || ""}`}
    ></div>
  );
};

export default AvatarPlaceholder;
