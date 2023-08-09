import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Modal from "../../../components/UI/Modal/Modal";
import Button from "../../../components/UI/Button/Button";
import {GrClose} from "react-icons/gr";
import Form from "../../../components/UI/Form";
import Input from "../../../components/UI/Input/Input";
import {useNavigate} from "react-router-dom";
import store from "../../../store";
import Spinner from "../../../components/UI/Spinner/Spinner";
import ErrorMessage from "../../../components/UI/ErrorMessage/ErrorMessage";
import {registerSchema} from "./register-validator";

const RegisterModal = ({onSuccess, onCancel}) => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  function formSubmitAction(data) {
    setLoading(true);
    store
      .register(data)
      .then(() => {
        navigate("/");
        onSuccess();
      })
      .catch(setServerError)
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <Modal>
      <Modal.Header>
        Регистрация
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
        Регистрация
        <Button variant={"secondary"} onClick={onCancel}> <GrClose size={"16px"}/></Button>
      </Modal.Header>
      <Modal.Content className={"max-w-md"}>

        {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}

        <Form autoComplete={"off"}>
          <Form.Field label={"Имя"} error={errors?.name?.message} required>
            <Input placeholder={"Введите имя"} {...register("name")}/>
          </Form.Field>
          <Form.Field label={"Фамилия"} error={errors?.surname?.message} required>
            <Input placeholder={"Введите имя"} {...register("surname")}/>
          </Form.Field>
          <Form.Field label={"Никнейм"} error={errors?.nickname?.message} required>
            <Input placeholder={"Введите никнейм"} {...register("nickname")}/>
          </Form.Field>
          <Form.Field label={"Адрес эл. почты"} error={errors?.email?.message} required>
            <Input type={"email"} autoComplete={"off"}
                   placeholder={"Введите адрес эл. почты"}  {...register("email")}/>
          </Form.Field>
          <Form.Field label={"Пароль"} error={errors?.password?.message} required>
            <Input type={"password"} autoComplete={"new-password"}
                   placeholder={"Введите пароль"}  {...register("password")}/>
          </Form.Field>
          <Form.Field label={"Повторите пароль"} error={errors?.password_repeat?.message} required>
            <Input type={"password"} autoComplete={"new-password"}
                   placeholder={"Повторите пароль"}   {...register("password_repeat")}/>

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

export default RegisterModal;