import classNames from "classnames";
import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Form = ({className, children, ...props}) => {
  return (
    <form
      className={classNames(
        "flex flex-col gap-2 placeholder:italic",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};
const Field = ({label, children, error, className, required = false}) => {
  return (
    <div className={classNames(className)}>
      {label && <label className="mb-2 inline-block">
        {label}
        {required &&
          <span className={"text-danger"}>*</span>
        }
      </label>}
      {children}
      {error && <ErrorMessage className={"mt-2"}>{error}</ErrorMessage>}

    </div>
  );
};
const FieldGroup = ({children, name, className}) => {
  return (
    <fieldset
      className={classNames("border border-secondary rounded p-3", className)}
    >
      <legend className="text-lg font-bold">{name}</legend>
      <div className="flex flex-col gap-2">{children}</div>
    </fieldset>
  );
};
Form.Field = Field;
Form.FieldGroup = FieldGroup;
export default Form;
