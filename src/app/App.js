import React, {useEffect} from "react";
import {observer} from "mobx-react";
import LayoutPlaceholder from "../ui/Placeholders/LayoutPlaceholder/LayoutPlaceholder";
import {RouterProvider} from "react-router-dom";
import {appRouter} from "../routes/router";
import {useAuthorization} from "../hooks/useAuthorization";

function App() {
  const [userLoading] = useAuthorization();
  if (userLoading) {
    return <LayoutPlaceholder/>;
  }
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default observer(App);
