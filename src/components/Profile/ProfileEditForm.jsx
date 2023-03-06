import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useForm from "../../hooks/useForm";
import TextArea from "../UI/TextArea/TextArea";
import Dropdown from "../UI/Dropdown/Dropdown";
import countries from "../../consts/countries";
import Form from "../UI/Form";
const ProfileEditForm = ({ form }) => {
  return (
    <Form
      onSubmit={form.handleSubmit}
      className="flex flex-col gap-2 placeholder:italic"
    >
      <Form.FieldGroup name="Личная информация">
        <Form.Field label={"Имя"}>
          <Input
            value={form.data.name}
            onChange={form.handleChange}
            name="name"
            type="text"
            placeholder="Имя"
            required
          />
        </Form.Field>
        <Form.Field label={"Фамилия"}>
          <Input
            value={form.data.surname}
            onChange={form.handleChange}
            name="surname"
            type="text"
            placeholder="Фамилия"
            required
          />
        </Form.Field>
        <Form.Field label={"Никнейм"}>
          <Input
            value={form.data.nickname}
            onChange={form.handleChange}
            name="nickname"
            type="text"
            placeholder="Никнейм"
            required
          />
        </Form.Field>
        <Form.Field label={"Страна"}>
          <Dropdown
            placeholder="Страна"
            items={countries.map((country) => ({
              name: country.rus,
              value: country.eng,
            }))}
          />
        </Form.Field>
        <Form.Field label={"Город"}>
          <Input
            value={form.data.city}
            onChange={form.handleChange}
            name="city"
            type="text"
            placeholder="Город"
          />
        </Form.Field>
        <Form.Field label={"Пол"}>
          <Dropdown
            placeholder="Пол"
            items={[
              { name: "Мужской", value: "male" },
              { name: "Женский", value: "female" },
              { name: "Не выбрано", value: "" },
            ]}
          />
        </Form.Field>
        <Form.Field label={"День рождения"}>
          <Input
            value={form.data.birth}
            onChange={form.handleChange}
            name="birth"
            type="date"
            placeholder="День рождения"
          />
        </Form.Field>
        <Form.Field label={"О себе"}>
          <TextArea
            value={form.data.description}
            onChange={form.handleChange}
            name="description"
            type="text"
            autoExpand
            maxHeight={450}
            placeholder="О себе"
          />
        </Form.Field>
      </Form.FieldGroup>
      <Form.FieldGroup name="Пароль">
        <Form.Field label={"Новый пароль"}>
          <Input
            value={form.data.password}
            onChange={form.handleChange}
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Новый пароль"
          />
        </Form.Field>
        <Form.Field label={"Повторите пароль"}>
          <Input
            value={form.data.password_repeat}
            onChange={form.handleChange}
            name="password_repeat"
            type="password"
            autoComplete="new-password"
            placeholder="Повторите новый пароль"
          />
        </Form.Field>
      </Form.FieldGroup>
      <Button className={"mt-2"}>Сохранить</Button>
    </Form>
  );
};

export default ProfileEditForm;
