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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 "
        >
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
