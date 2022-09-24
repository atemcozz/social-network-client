import React from "react";
const Button = ({ children, variant = "primary", className, ...props }) => {
  const variants = {
    primary: `bg-primary hover:bg-primary-darker ease-in duration-100 text-white`,
    disabled: `bg-primary-disabled text-gray-400 cursor-not-allowed`,
    secondary: `bg-secondary hover:bg-secondary-darker ease-in duration-100 text-text-base`,
    danger: `bg-danger hover:bg-danger-darker ease-in duration-100 text-white`,
    like: `bg-like hover:bg-danger ease-in duration-100 text-white`,
    success: `bg-success hover:bg-success-darker ease-in duration-100 text-white`,
    outlined: `border border-primary hover:border-primary-darker text-primary hover:text-primary-darker`,
  };

  return (
    <button
      className={`rounded-lg p-2 flex items-center gap-2  ${
        variants[variant]
      } ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
