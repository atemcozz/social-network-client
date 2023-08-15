import React from "react";

const Radio = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};
const Item = ({ children, name, checked = false, onChange }) => {
  return (
    <div
      className="flex items-center gap-1 p-1 cursor-pointer"
      onClick={onChange}
    >
      <input
        checked={checked}
        onChange={onChange}
        type="radio"
        value=""
        name={name}
        className="w-5 h-5 text-primary focus:ring-primary focus:ring-2"
      />
      <div>{children}</div>
    </div>
  );
};
Radio.Item = Item;
export default Radio;
