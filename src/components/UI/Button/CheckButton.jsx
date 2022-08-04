import React, { useState } from "react";
import Button from "./Button";

const CheckButton = ({ children, className, ...props }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Button
      variant={checked ? "primary" : "outlined"}
      className={`${className ? className : ""}`}
      onClick={() => setChecked((state) => !state)}
    >
      {children}
    </Button>
  );
};

export default CheckButton;
