import React from "react";
import { createContext } from "react";
import Store from "../store/store";
export const StoreContext = createContext(null);
const store = new Store();
const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
