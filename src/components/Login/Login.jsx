import React, { useContext, useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/routes";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";
const Login = () => {
  const { store } = useContext(Context);
  const [error, setError] = useState();
  const [formData, handleInputChange, handleFormSumbit, resetForm] = useForm(
    {
      nickname: "",
      password: "",
    },
    formSumbitAction
  );
  const { nickname, password } = formData;
  const navigate = useNavigate();
  async function formSumbitAction() {
    await store
      .login(formData)
      .then(() => navigate(HOME_ROUTE))
      .catch((e) => setError(e));
    resetForm();
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Логин</div>
      <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
        {error && (
          <div className="text-white bg-danger rounded-lg p-4 break-words">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSumbit} className="flex flex-col gap-4 ">
          <Input
            name="nickname"
            type="text"
            placeholder="Никнейм"
            value={nickname}
            onChange={handleInputChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handleInputChange}
            required
          />
          <Button>Войти</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
