import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Heading from "../../components/UI/Heading";
const Register = () => {
  const store = useStore();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initial: {
      name: "",
      surname: "",
      nickname: "",
      password: "",
      password_repeat: "",
    },
    onSubmit: formSubmitAction,
    validate(data) {
      if (form.data.password !== form.data.password_repeat) {
        return "Пароли не совпадают";
      }
    },
  });
  const navigate = useNavigate();
  function formSubmitAction(data) {
    setLoading(true);
    store
      .register(data)
      .then(() => navigate("/edit_profile"))
      .catch(setError)
      .finally(() => setLoading(false));
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <MainLayout>
      <div className="flex flex-col gap-4 px-4">
        <Heading>Регистрация</Heading>

        <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          {form.errors?.length > 0 && (
            <ErrorMessage>{form.errors[0]} </ErrorMessage>
          )}
          {error && <ErrorMessage>{error} </ErrorMessage>}
          <form onSubmit={form.handleSubmit} className="flex flex-col gap-2 ">
            <Input
              value={form.data.name}
              onChange={form.handleChange}
              name="name"
              type="text"
              placeholder="Имя"
              required
            />

            <Input
              value={form.data.surname}
              onChange={form.handleChange}
              name="surname"
              type="text"
              placeholder="Фамилия"
              required
            />
            <Input
              value={form.data.email}
              onChange={form.handleChange}
              name="email"
              type="email"
              placeholder="Электронная почта"
              required
            />
            <Input
              value={form.data.nickname}
              onChange={form.handleChange}
              name="nickname"
              type="text"
              placeholder="Никнейм"
              required
            />
            <Input
              value={form.data.password}
              onChange={form.handleChange}
              name="password"
              type="password"
              placeholder="Пароль"
              autoComplete="new-password"
              required
              className={"mt-2"}
            />
            <Input
              value={form.data.password_repeat}
              onChange={form.handleChange}
              name="password_repeat"
              type="password"
              autoComplete="off"
              placeholder="Повторите пароль"
              required
            />
            <Button className={"mt-2"}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
