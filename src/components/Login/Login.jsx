import React, { useContext, useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/routes";
const Login = () => {
  const { store } = useContext(Context);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const sumbitForm = async (e) => {
    e.preventDefault();
    const data = {
      nickname: e.target.nickname.value,
      password: e.target.password.value,
    };
    await store.login(data.nickname, data.password, (err) => {
      if (err) {
        setError(err);
      } else {
        navigate(HOME_ROUTE);
      }
    });

    e.target.reset();
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Логин</div>
      <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
        {error && (
          <div className="text-white bg-danger rounded-lg p-4 break-words">
            {error}
          </div>
        )}

        <form onSubmit={sumbitForm} className="flex flex-col gap-4 ">
          <Input id="nickname" type="text" placeholder="Никнейм" required />
          <Input id="password" type="password" placeholder="Пароль" required />
          <Button>Войти</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
