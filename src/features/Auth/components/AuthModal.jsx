import React from 'react';
import Modal from "../../../ui/Modal/Modal";
import Button from "../../../ui/Button/Button";
import {GrClose} from "react-icons/gr";
import {Link} from "react-router-dom";

export const AuthModal = ({onCancel}) => {
  return (
    <Modal onBgClick={onCancel}>
      <Modal.Header>
        Авторизация
        <Button variant={"secondary"} onClick={onCancel}> <GrClose size={"16px"}/></Button>
      </Modal.Header>
      <Modal.Content>
        <div className={"break-words mb-4 text-center"}><strong>Войдите</strong> или <strong>зарегистрируйтесь</strong>
          <br/> для
          получения полного доступа ко всем
          возможностям ресурса
        </div>

      </Modal.Content>
      <Modal.Footer>
        <div className={"flex-1 flex justify-center gap-2"}>
          <Link to={"/login"}>
            <Button variant={"secondary"}>
              Войти
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button>
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </Modal.Footer>
    </Modal>

  );
};