import {useEffect} from "react";
import store from "../store";

export const useAuthorization = () => {
  useEffect(() => {
    if (localStorage.getItem("refresh_token")) {
      store.verifyAuth();
    } else store.setUserLoading(false);
  }, [store]);
  return [store.userLoading];
};