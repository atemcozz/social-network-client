import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
const Login = () => {
  const store = useStore();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initial: {
      nickname: "",
      password: "",
    },
    onSubmit: formSubmitAction,
  });
  const navigate = useNavigate();
  async function formSubmitAction(data) {
    setLoading(true);
    await store
      .login(data)
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
        <div className="flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={form.handleSubmit} className="flex flex-col gap-2">
            <Input
              name="nickname"
              type="text"
              placeholder="Никнейм"
              value={form.data.nickname}
              onChange={form.handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Пароль"
              value={form.data.password}
              onChange={form.handleChange}
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
