import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useContext, useState } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/routes";
const Register = () => {
  const { store } = useContext(Context);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function sumbitForm(e) {
    e.preventDefault();
    const data = {
      name: e.target.name,
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
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Регистрация</div>
      <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
        <div className="text-white bg-danger rounded-lg p-4 break-words">
          Тестовая ошибка
        </div>
        <form onSubmit={sumbitForm} className="flex flex-col gap-4 ">
          <Input id="name" type="text" placeholder="Имя" required />

          <Input id="surname" type="text" placeholder="Фамилия" required />

          <Input id="nickname" type="text" placeholder="Никнейм" required />
          <Input id="password" type="password" placeholder="Пароль" required />
          <Input
            id="password_repeat"
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
