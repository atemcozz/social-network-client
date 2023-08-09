import React, {useState} from 'react';
import Form from "../UI/Form";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import PasswordChangeModal from "./PasswordChangeModal";
import EmailChangeModal from "./EmailChangeModal";
import store from "../../store";

const SecurityForm = () => {
  const [pwdModal, setPwdModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  function handlePasswordButton(e) {
    e.preventDefault();
    setPwdModal(true);
  }

  function handleEmailButton(e) {
    e.preventDefault();
    setEmailModal(true);
  }

  if (!store.user) return null;
  return (
    <>
      {pwdModal &&
        <PasswordChangeModal onCancel={() => setPwdModal(false)} onSubmit={() => setPwdModal(false)}/>
      }
      {emailModal &&
        <EmailChangeModal onCancel={() => setEmailModal(false)} onSubmit={() => setPwdModal(false)}/>
      }

      <Form>
        <Form.FieldGroup name="Безопасность">
          <div className={"flex flex-wrap gap-8"}>
            <div className={"flex flex-1 flex-wrap justify-between items-start gap-2"}>
              <div className={"flex flex-col gap-1"}>
                <span>Пароль</span>
                <input
                  className={"text-sm text-text-secondary bg-transparent"}
                  disabled
                  value={"**********"}
                  size={10}
                  type={"password"}
                />
              </div>
              <Button onClick={handlePasswordButton}>Изменить</Button>
            </div>
            <div className={"flex flex-1 flex-wrap justify-between items-start gap-2"}>
              <div className={"flex flex-col gap-1"}>
                <span>Электронная почта</span>
                <span
                  className={"text-sm text-text-secondary"}

                >{store?.user?.email}</span>
              </div>
              <Button onClick={handleEmailButton}>Изменить</Button>
            </div>
          </div>
        </Form.FieldGroup>
      </Form>
    </>
  );
};

export default SecurityForm;