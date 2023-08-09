import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {passwordSchema} from "./pass-validator";
import Form from "../UI/Form";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import {GrClose} from "react-icons/gr";
import UserService from "../../services/UserService";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";

const PasswordChangeModal = ({onSubmit, onCancel}) => {
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(passwordSchema),
  });

  function formSubmitAction(data) {
    store.updateUserPassword(data)
      .then(() => navigate("/login"))
      .catch(setServerError);
  }

  return (
    <Modal onBgClick={onCancel}>
      <Modal.Header>
        Изменить пароль
        <Button variant={"secondary"} onClick={onCancel}> <GrClose size={"16px"}/></Button>
      </Modal.Header>
      <Modal.Content>
        {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}
        <Form autoComplete={"off"}>
          <Form.Field label={"Старый пароль"} error={errors?.old_password?.message} required>
            <Input type={"password"} autoComplete={"off"}
                   placeholder={"Введите старый пароль"}  {...register("old_password")}/>
          </Form.Field>
          <Form.Field label={"Новый пароль"} error={errors?.password?.message} required>
            <Input type={"password"} autoComplete={"new-password"}
                   placeholder={"Введите новый пароль"}  {...register("password")}/>
          </Form.Field>
          <Form.Field label={"Повторите новый пароль"} error={errors?.password_repeat?.message} required>
            <Input type={"password"} autoComplete={"new-password"}
                   placeholder={"Повторите новый пароль"}   {...register("password_repeat")}/>

          </Form.Field>
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

export default PasswordChangeModal;