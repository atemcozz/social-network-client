import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useForm from "../../hooks/useForm";
const ProfileEditForm = ({ user, onSumbit, onError }) => {
  const [formData, handleInputChange, handleFormSumbit, resetForm] = useForm(
    {
      nickname: user.nickname,
      name: user.name,
      surname: user.surname,
      password: "",
      password_repeat: "",
    },
    sumbitForm
  );
  function sumbitForm() {
    if (password || password_repeat) {
      if (password !== password_repeat) {
        onError("Пароли не совпадают");
        return;
      }
      onSumbit({ name, surname, nickname, password });
    } else {
      onSumbit({ name, surname, nickname });
    }
  }
  const { nickname, name, surname, password, password_repeat } = formData;
  return (
    <form
      onSubmit={handleFormSumbit}
      className="flex flex-col gap-4 placeholder:italic"
    >
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
        autoComplete="new-password"
        placeholder="Новый пароль"
      />
      <Input
        value={password_repeat}
        onChange={handleInputChange}
        name="password_repeat"
        type="password"
        autoComplete="new-password"
        placeholder="Повторите новый пароль"
      />
      <Button>Сохранить</Button>
    </form>
  );
};

export default ProfileEditForm;
