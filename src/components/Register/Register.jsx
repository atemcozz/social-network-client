import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import Spinner from "../UI/Spinner/Spinner";
import MainLayout from "../Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
const Register = () => {
  const store = useStore();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, handleInputChange, handleFormSumbit, resetForm] = useForm(
    {
      name: "",
      surname: "",
      nickname: "",
      password: "",
      password_repeat: "",
    },
    formSumbitAction
  );
  const { name, surname, nickname, password, password_repeat } = formData;
  const navigate = useNavigate();
  async function formSumbitAction() {
    if (password !== password_repeat) {
      setError("Пароли не совпадают");
      resetForm();
      return;
    }
    const data = { name, surname, nickname, password };
    setLoading(true);
    await store
      .register(data)
      .then(() => navigate("/edit_profile"))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));

    resetForm();
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
        <div className="font-bold text-xl pl-6">Регистрация</div>
        <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          {error && (
            <div className="text-white bg-danger rounded-lg p-4 break-words">
              {error}
            </div>
          )}
          <form onSubmit={handleFormSumbit} className="flex flex-col gap-4 ">
            <Input
              value={name}
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Имя"
              required
            />

            <Input
              value={surname}
              onChange={handleInputChange}
              name="surname"
              type="text"
              placeholder="Фамилия"
              required
            />

            <Input
              value={nickname}
              onChange={handleInputChange}
              name="nickname"
              type="text"
              placeholder="Никнейм"
              required
            />
            <Input
              value={password}
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Пароль"
              required
            />
            <Input
              value={password_repeat}
              onChange={handleInputChange}
              name="password_repeat"
              type="password"
              placeholder="Повторите пароль"
              required
            />
            <Button>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
