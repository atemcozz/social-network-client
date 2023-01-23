import React from "react";

const ErrorMessage = ({ children }) => {
  return (
    <div className="p-2 bg-danger text-white rounded-lg shadow break-words">
      {children}
    </div>
  );
};

export default ErrorMessage;
