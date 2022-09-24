import React from "react";
import defaultAvatar from "../../../assets/default_avatar.png";
import { useState } from "react";
const Avatar = ({ src, size, onClick, pointer }) => {
  const [loading, setLoading] = useState(true);
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
      {loading && (
        <img
          className={`${sizes[size]} object-cover rounded-full shadow`}
          src={defaultAvatar}
          alt="avatar"
        />
      )}
      <img
        className={`${sizes[size]} object-cover rounded-full shadow ${
          loading ? "hidden" : "inline"
        }`}
        src={src ? src : ""}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultAvatar;
        }}
        onLoad={() => setLoading(false)}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
