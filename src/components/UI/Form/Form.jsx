import classNames from "classnames";
import React from "react";

const Form = ({ className, onSubmit, children, ...args }) => {
  return (
    <form
      className={classNames(
        "flex flex-col gap-2 placeholder:italic",
        className
      )}
      {...args}
    >
      {children}
    </form>
  );
};
const Field = ({ label, children }) => {
  return (
    <div>
      {label && <label className="mb-2 inline-block">{label}</label>}
      {children}
    </div>
  );
};
const FieldGroup = ({ children, name, className }) => {
  return (
    <fieldset
      className={classNames("border border-secondary rounded p-3", className)}
    >
      <legend className="text-lg">{name}</legend>
      <div className="flex flex-col gap-2">{children}</div>
    </fieldset>
  );
};
Form.Field = Field;
Form.FieldGroup = FieldGroup;
export default Form;
