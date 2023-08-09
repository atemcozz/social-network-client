import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Modal from "../../../components/UI/Modal/Modal";
import Button from "../../../components/UI/Button/Button";
import {GrClose} from "react-icons/gr";
import Form from "../../../components/UI/Form";
import Input from "../../../components/UI/Input/Input";
import {loginSchema} from "./login-validator";
import {useNavigate} from "react-router-dom";
import store from "../../../store";
import Spinner from "../../../components/UI/Spinner/Spinner";
import ErrorMessage from "../../../components/UI/ErrorMessage/ErrorMessage";

const LoginModal = ({onSuccess, onCancel}) => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  async function formSubmitAction(data) {
    setLoading(true);
    await store
      .login(data)
      .then(onSuccess)
      .catch((err) => setServerError(err))
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <Modal>
      <Modal.Header>
        Войти
        <Button variant={"secondary"} onClick={onCancel}> <GrClose size={"16px"}/></Button>
      </Modal.Header>
      <Modal.Content>
        <div className={"flex justify-center items-center w-48 h-48"}>
          <Spinner/>
        </div>
      </Modal.Content>
    </Modal>;
  }
  return (
    <Modal onBgClick={onCancel}>
      <Modal.Header>
        Войти
        <Button variant={"secondary"} onClick={onCancel}> <GrClose size={"16px"}/></Button>
      </Modal.Header>
      <Modal.Content>
        {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}

        <Form autoComplete={"off"}>
          <Form.Field label={"Никнейм"} error={errors?.nickname?.message} required>
            <Input placeholder={"Введите никнейм"} {...register("nickname")}/>
          </Form.Field>
          <Form.Field label={"Пароль"} error={errors?.password?.message} required>
            <Input type={"password"} placeholder={"Введите пароль"} {...register("password")}/>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleSubmit(formSubmitAction)}>Войти</Button>
        <Button variant={"secondary"} onClick={(e) => {
          e.preventDefault();
          onCancel();
        }}>Отменить</Button>
      </Modal.Footer>
    </Modal>

  );
};

export default LoginModal;