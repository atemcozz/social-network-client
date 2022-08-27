import React from "react";
import Button from "./Button";
import { BsHeart, BsHeartFill } from "react-icons/bs";
const LikeButton = ({ className, count, active = false, ...props }) => {
  return (
    <Button
      variant={active ? "like" : "outlined"}
      className={`${className ? className : ""}`}
      {...props}
    >
      {active ? <BsHeartFill size={"24px"} /> : <BsHeart size={"24px"} />}
      {count}
    </Button>
  );
};

export default LikeButton;
