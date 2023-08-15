import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import {emailSchema} from "../validators/email-validator";
import Modal from "../../../ui/Modal/Modal";
import {GrClose} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
import {passwordSchema} from "../validators/pass-validator";
import store from "../../../store";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import {UserService} from "../api/UserService";
import InfoLabel from "../../../ui/InfoLabel/InfoLabel";
import Spinner from "../../../ui/Spinner/Spinner";

export const EmailChangeModal = ({onSubmit, onCancel}) => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(emailSchema),
  });
  const [serverError, setServerError] = useState();
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function formSubmitAction(data) {
    setLoading(true);
    UserService.updateUserEmail(data)
      .then(() => setInfo(true))
      .catch(setServerError)
      .finally(() => setLoading(false));
  }

  if (!store.user) {
    return null;
  }
  if (loading) {
    return (
      <Modal>
        <Modal.Header>
          Изменить адрес эл. почты
        </Modal.Header>
        <Modal.Content className={"max-w-md"}>
          <div className={"flex justify-center items-center h-64"}>
            <Spinner/>
          </div>
        </Modal.Content>
      </Modal>);
  }
  return (
    <Modal onBgClick={onCancel}>
      <Modal.Header>
        Изменить адрес эл. почты
        <Button variant={"secondary"} onClick={onCancel}> <GrClose size={"16px"}/></Button>
      </Modal.Header>
      <Modal.Content className={"max-w-md"}>

        <Form autoComplete={"off"}>
          {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}
          <Form.Field label={"Текущий адрес эл. почты"}>
            <Input type={"email"} value={store.user.email} disabled/>
          </Form.Field>
          <Form.Field label={"Новый адрес эл. почты"} error={errors?.email?.message} required>
            <Input type={"email"} autoComplete={"off"}
                   placeholder={"Введите адрес эл. почты"}  {...register("email")}/>

          </Form.Field>
          {info &&
            <InfoLabel>На указанный адрес электронной почты было отправлено письмо подтверждения. Следуйте изложенным
              в
              нём инструкциям для завершения настройки</InfoLabel>}
        </Form>


      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleSubmit(formSubmitAction)}>Сохранить</Button>
        <Button variant={"secondary"} onClick={(e) => {
          e.preventDefault();
          onCancel();
        }}>Отменить</Button>
      </Modal.Footer>
    </Modal>

  );

};
