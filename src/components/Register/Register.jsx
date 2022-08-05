import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
const Register = () => {
  return (
    <div className="w-full px-4 min-h-screen flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Регистрация</div>
      <div className=" flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
        <div className="text-white bg-danger rounded-lg p-4 break-words">
          Тестовая ошибка
        </div>
        <form className="flex flex-col gap-4 ">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 ml-2 text-lg font-medium text-text-base"
            >
              Имя
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Введите имя..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="surname"
              className="block mb-2 ml-2 text-lg font-medium text-text-base"
            >
              Фамилия
            </label>
            <Input
              id="surname"
              type="text"
              placeholder="Введите фамилию..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="nickname"
              className="block mb-2 ml-2 text-lg font-medium text-text-base"
            >
              Никнейм
            </label>
            <Input
              id="nickname"
              type="text"
              placeholder="Введите никнейм..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 ml-2 text-lg font-medium text-text-base"
            >
              Пароль
            </label>
            <Input
              className="mb-2"
              id="password"
              type="password"
              placeholder="Введите пароль..."
              required
            />
            <Input
              id="password_repeat"
              type="password"
              placeholder="Повторите пароль..."
              required
            />
          </div>

          <Button>Зарегистрироваться</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
