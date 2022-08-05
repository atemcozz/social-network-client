import React from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const Login = () => {
  return (
    <div className="w-full px-4 min-h-screen flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Логин</div>
      <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
        <div className="text-white bg-danger rounded-lg p-4 break-words">
          Тестовая ошибка
        </div>
        <form className="flex flex-col gap-4 ">
          <Input id="nickname" type="text" placeholder="Никнейм" required />
          <Input id="password" type="password" placeholder="Пароль" required />
          <Button>Войти</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
