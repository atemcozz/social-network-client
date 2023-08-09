import React, {useState} from 'react';
import store from "../../store";
import Button from "../../components/UI/Button/Button";
import AuthModal from "./AuthModal";
import {observer} from "mobx-react";


const ButtonWithAuth = ({children, onClick, showWithoutAuth = true, ...props}) => {
  const [modal, setModal] = useState(false);


  function handleClick() {
    if (store.auth) {
      onClick();
      return;
    }
    setModal(true);
  }

  if (!showWithoutAuth && !store.auth) {
    return null;
  }
  return (
    <>
      {modal && <AuthModal onCancel={() => setModal(false)}/>}
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>
    </>
  );
};

export default observer(ButtonWithAuth);