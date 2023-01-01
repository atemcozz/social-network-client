import React from "react";
import styles from "../common/placeholder.module.css";
const AvatarPlaceholder = ({ className, size = "normal" }) => {
  const sizes = {
    small: "w-8 h-8",
    normal: "w-12 h-12",
    big: "w-24 h-24",
    large: "w-32 h-32",
  };
  return (
    <div
      className={`rounded-full ${sizes[size]} shadow-md shrink-0 ${
        styles.placeholder
      } ${className || ""}`}
    ></div>
  );
};

export default AvatarPlaceholder;
