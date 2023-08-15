import React, {useState} from "react";
import Button from "../Button/Button";
import classNames from "classnames";

const ErrorMessage = ({children, className, ...props}) => {
  return (
    <div className={classNames("p-2 bg-danger text-white rounded-lg shadow break-words", className)}>
      {children}
    </div>
  );
};
export default ErrorMessage;
