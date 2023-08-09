import classNames from "classnames";
import React from "react";
import {createPortal} from "react-dom";

const Modal = ({children, onBgClick, className}) => {
  return createPortal((
    <div
      className={classNames(
        "fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-40 h-screen", className,
      )}
      onClick={onBgClick}
    >
      <div
        className={classNames(className, "absolute shadow-lg m-4 rounded-lg overflow-hidden max-h-screen flex flex-col text-text-base",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ), document.body);
};
const Header = ({children, className, ...props}) => {
  return (
    <header
      className={classNames("px-4 pb-2 pt-4 font-bold text-lg bg-back flex justify-between items-center", className)} {...props}>
      {children}
    </header>
  );
};
const Content = ({children, className, ...props}) => {
  return (
    <div className={classNames("px-4 py-2 bg-back overflow-y-auto", className)} {...props}>
      {children}
    </div>
  );
};
const Footer = ({children, className, ...props}) => {
  return (
    <footer className={classNames("flex gap-2 justify-end px-4 py-2 bg-back", className)} {...props}>
      {children}
    </footer>);

};
Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;
export default Modal;
