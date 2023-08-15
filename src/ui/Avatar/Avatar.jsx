import React from "react";
import defaultAvatar from "../../assets/default_avatar.png";
import {useState} from "react";
import classNames from "classnames";

const Avatar = ({src, size = "normal", onClick, pointer}) => {
  const [loading, setLoading] = useState(true);
  const sizes = {
    small: "w-8 h-8",
    normal: "w-12 h-12",
    big: "w-24 h-24",
    large: "w-32 h-32",
  };
  return (
    <div
      className={classNames(
        sizes[size],
        pointer && "cursor-pointer",
        "shrink-0",
      )}
      onClick={onClick}
    >
      {loading && (
        <img
          className={classNames(
            sizes[size],
            "object-cover rounded-full shadow",
          )}
          src={defaultAvatar}
          alt="avatar"
        />
      )}
      <img
        className={classNames(
          sizes[size],
          loading ? "hidden" : "inline",
          "object-cover rounded-full shadow",
        )}
        src={src || ""}
        onError={({currentTarget}) => {
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
