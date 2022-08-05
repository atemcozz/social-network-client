import { Switch } from "@headlessui/react";
import React, { useState, useEffect } from "react";

const Toggle = ({ className, active = false, onChange, ...props }) => {
  const [enabled, setEnabled] = useState(active);

  return (
    <Switch
      checked={enabled}
      onChange={(e) => {
        setEnabled(e);
        onChange(e);
      }}
      className={`${enabled ? "bg-primary" : "bg-back-darkest"}
    relative inline-flex w-11 h-6 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ${
      className ? className : ""
    }`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-5" : "translate-x-0"}
      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};

export default Toggle;
