import React, {useEffect} from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import TextArea from "../UI/TextArea/TextArea";
import Select from "../UI/Select/Select";
import {countriesListRus} from "../../consts/countries";
import Form from "../UI/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {profileSchema} from "./profile-validator";
import {useForm, Controller} from "react-hook-form";
import store from "../../store";

const sexOptions = [
  {title: "Не выбрано", value: 0},
  {title: "Мужской", value: 1},
  {title: "Женский", value: 2},
];
const ProfileEditForm = ({user, onSubmit}) => {
  const {register, handleSubmit, formState: {errors}, control} = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: user,
  });

  return (
    <Form

      className="flex flex-col gap-2 placeholder:italic"
    >
      <Form.FieldGroup name="Личная информация">
        <div className={"flex gap-2"}>
          <Form.Field className={"flex-1"} label={"Имя"} error={errors?.name?.message} required>
            <Input {...register("name")}/>
          </Form.Field>
          <Form.Field className={"flex-1"} label={"Фамилия"} error={errors?.surname?.message} required>
            <Input {...register("surname")}/>
          </Form.Field></div>
        <Form.Field label={"Никнейм"} error={errors?.nickname?.message} required>
          <Input {...register("nickname")}/>
        </Form.Field>
        <Form.Field label={"Страна"} error={errors?.country?.message}>
          <Controller control={control}
                      name="country"
                      render={({field: {onChange, value}}) => (
                        <Select
                          placeholder="Страна"
                          selected={countriesListRus.find((option) => option.value === value)}
                          onChange={onChange}
                          options={countriesListRus}
                        />)}/>
        </Form.Field>
        <Form.Field label={"Пол"} error={errors?.sex?.message}>
          <Controller control={control}
                      name="sex"
                      render={({field: {onChange, value}}) => (
                        <Select
                          placeholder="Пол"
                          selected={sexOptions.find((option) => option.value === value)}
                          onChange={onChange}
                          options={sexOptions}
                        />)}/>
        </Form.Field>
        <Form.Field label={"О себе"} error={errors?.about?.message}>
          <TextArea
            type="text"
            autoExpand
            maxHeight={450}
            placeholder="О себе"
            {...register("about")}
          />
        </Form.Field>

      </Form.FieldGroup>
      <Button className={"mt-2"} onClick={handleSubmit(onSubmit)}>Сохранить изменения</Button>

    </Form>
  );
};

export default ProfileEditForm;
