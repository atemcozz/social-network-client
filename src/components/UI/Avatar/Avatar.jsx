import React from "react";
import defaultAvatar from "../../../assets/default_avatar.png";
const Avatar = ({ src, size, onClick, pointer }) => {
  const sizes = {
    small: "w-8 h-8",
    normal: "w-12 h-12",
    large: "w-32 h-32",
  };
  return (
    <div
      className={`${sizes[size]} ${pointer ? "cursor-pointer" : ""} shrink-0`}
      onClick={onClick}
    >
      <img
        className={`${sizes[size]} object-cover rounded-full shadow`}
        src={src ? src : ""}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultAvatar;
        }}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
