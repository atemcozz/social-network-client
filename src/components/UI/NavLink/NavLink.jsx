import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({
  to,
  children,
  target = "_self",
  className,
  onClick,
  active = false,
}) => {
  return (
    <Link
      to={to}
      target={target}
      onClick={onClick}
      className={classNames(
        "p-2 flex items-center gap-2 bg-secondary border-primary hover:border-r-4 hover:bg-secondary-darker ease-in duration-100 text-text-base",
        active && "border-r-4 bg-secondary-darker",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
