import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Spinner from "../UI/Spinner/Spinner";
import MainLayout from "../Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
const Login = () => {
  const store = useStore();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    await store
      .login(formData)
      .then(() => navigate("/"))
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
        <div className="font-bold text-xl pl-6">Логин</div>
        <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          {error && (
            <div className="text-white bg-danger rounded-lg p-4 break-words">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSumbit} className="flex flex-col gap-2">
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
            <Button className={"mt-2"}>Войти</Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
