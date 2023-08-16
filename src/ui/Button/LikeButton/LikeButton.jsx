import React from "react";
import Button from "../Button";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import classNames from "classnames";

const LikeButton = ({className, count, active = false, ...props}) => {
  return (
    <Button
      variant={active ? "like" : "outlined"}
      className={classNames(className)}
      {...props}
    >
      {active ? <BsHeartFill size={"24px"}/> : <BsHeart size={"24px"}/>}
      {count}
    </Button>
  );
};

export default LikeButton;
