import React, {useState} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import {GrClose} from "react-icons/gr";
import LoginModal from "./login/LoginModal";
import RegisterModal from "./register/RegisterModal";
import {Link} from "react-router-dom";

const AuthModal = ({onCancel}) => {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  return (
    <Modal onBgClick={onCancel}>
      {loginModal && <LoginModal
        onSuccess={() => {
          setLoginModal(false);
          onCancel();
        }
        }
        onCancel={() => setLoginModal(false)}
      />}
      {registerModal &&
        <RegisterModal
          onSuccess={() => {
            setLoginModal(false);
            onCancel();
          }
          }
          onCancel={() => setRegisterModal(false)}
        />
      }
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

export default AuthModal;