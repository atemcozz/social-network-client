import React, { useState } from "react";
import Button from "./Button";
import { BsHeart, BsHeartFill } from "react-icons/bs";
const LikeButton = ({ className, count, active = false, ...props }) => {
  const [checked, setChecked] = useState(active);

  return (
    <Button
      variant={checked ? "danger" : "outlined"}
      className={`${className ? className : ""}`}
      onClick={() => setChecked((state) => !state)}
    >
      {checked ? <BsHeartFill size={"24px"} /> : <BsHeart size={"24px"} />}
      {count}
    </Button>
  );
};

export default LikeButton;
