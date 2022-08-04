import React, { useState } from "react";
import Button from "./Button";
import { BsHeart, BsHeartFill } from "react-icons/bs";
const LikeButton = ({ className, count, ...props }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Button
      variant={checked ? "danger" : "outlined"}
      className={`${className ? className : ""}`}
      onClick={() => setChecked((state) => !state)}
    >
      {checked ? <BsHeartFill size={"1.5rem"} /> : <BsHeart size={"1.5rem"} />}
      {count}
    </Button>
  );
};

export default LikeButton;
