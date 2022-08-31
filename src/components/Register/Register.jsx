import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useContext, useState } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { EDIT_PROFILE_ROUTE, HOME_ROUTE } from "../../utils/routes";
import useForm from "../../hooks/useForm";
const Register = () => {
  const { store } = useContext(Context);
  const [error, setError] = useState();
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
    await store
      .register(data)
      .then(() => navigate(EDIT_PROFILE_ROUTE))
      .catch((e) => setError(e));

    resetForm();
  }
  return (
    <div className="flex flex-col gap-4">
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
  );
};

export default Register;
