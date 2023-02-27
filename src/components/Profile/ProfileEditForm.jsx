import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useForm from "../../hooks/useForm";
import TextArea from "../UI/Input/TextArea";
import Dropdown from "../UI/Dropdown/Dropdown";
import countries from "../../consts/countries";
const ProfileEditForm = ({ form }) => {
  return (
    <form
      onSubmit={form.handleSubmit}
      className="flex flex-col gap-2 placeholder:italic"
    >
      <Input
        value={form.data.name}
        onChange={form.handleChange}
        name="name"
        type="text"
        placeholder="Имя"
        required
      />

      <Input
        value={form.data.surname}
        onChange={form.handleChange}
        name="surname"
        type="text"
        placeholder="Фамилия"
        required
      />

      <Input
        value={form.data.nickname}
        onChange={form.handleChange}
        name="nickname"
        type="text"
        placeholder="Никнейм"
        required
      />
      <Dropdown
        placeholder="Страна"
        items={countries.map((country) => ({
          name: country.rus,
          value: country.eng,
        }))}
      />
      <Input
        value={form.data.city}
        onChange={form.handleChange}
        name="city"
        type="text"
        placeholder="Город"
      />
      <Dropdown
        placeholder="Пол"
        items={[
          { name: "Мужской", value: "male" },
          { name: "Женский", value: "female" },
          { name: "Не выбрано", value: "" },
        ]}
      />
      <Input
        value={form.data.birth}
        onChange={form.handleChange}
        name="birth"
        type="date"
        placeholder="День рождения"
      />
      <TextArea
        value={form.data.description}
        onChange={form.handleChange}
        name="description"
        type="text"
        autoExpand
        maxHeight={450}
        placeholder="О себе"
      />

      <Input
        className={"mt-2"}
        value={form.data.password}
        onChange={form.handleChange}
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Новый пароль"
      />
      <Input
        value={form.data.password_repeat}
        onChange={form.handleChange}
        name="password_repeat"
        type="password"
        autoComplete="new-password"
        placeholder="Повторите новый пароль"
      />
      <Button className={"mt-2"}>Сохранить</Button>
    </form>
  );
};

export default ProfileEditForm;
