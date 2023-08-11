import React, {useState} from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Spinner from "../../components/UI/Spinner/Spinner";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import store from "../../store";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import Heading from "../../components/UI/Heading";
import Form from "../../components/UI/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import AuthLayout from "../../components/Layout/AuthLayout/AuthLayout";
import {registerSchema} from "../../features/auth/register/register-validator";

const Login = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  function formSubmitAction(data) {
    setLoading(true);
    store
      .register(data)
      .then(() =>
        navigate("/"),
      )
      .catch(setServerError)
      .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <AuthLayout>
        <div className="flex flex-col max-w-md mx-auto">
          <Heading>Регистрация</Heading>
          <div className={"flex justify-center items-center rounded-lg shadow-md bg-back p-4 h-96"}>
            <Spinner/>
          </div>
        </div>
      </AuthLayout>
    );
  }
  return (
    <AuthLayout>
      <div className="flex flex-col max-w-md mx-auto">
        <Heading>Регистрация</Heading>
        <div className="rounded-lg shadow-md bg-back p-4 flex justify-center">
          <div className={"flex flex-col gap-4 w-full"}>
            {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}
            <Form autoComplete={"off"}>
              <Form.Field label={"Имя"} error={errors?.name?.message} required>
                <Input placeholder={"Введите имя"} {...register("name")}/>
              </Form.Field>
              <Form.Field label={"Фамилия"} error={errors?.surname?.message} required>
                <Input placeholder={"Введите имя"} {...register("surname")}/>
              </Form.Field>
              <Form.Field label={"Никнейм"} error={errors?.nickname?.message} required>
                <Input placeholder={"Введите никнейм"} {...register("nickname")}/>
              </Form.Field>
              <Form.Field label={"Адрес эл. почты"} error={errors?.email?.message} required>
                <Input type={"email"} autoComplete={"off"}
                       placeholder={"Введите адрес эл. почты"}  {...register("email")}/>
              </Form.Field>
              <Form.Field label={"Пароль"} error={errors?.password?.message} required>
                <Input type={"password"} autoComplete={"new-password"}
                       placeholder={"Введите пароль"}  {...register("password")}/>
              </Form.Field>
              <Form.Field label={"Повторите пароль"} error={errors?.password_repeat?.message} required>
                <Input type={"password"} autoComplete={"new-password"}
                       placeholder={"Повторите пароль"}   {...register("password_repeat")}/>
              </Form.Field>
            </Form>
            <div className={"flex flex-col gap-2"}>
              <Button onClick={handleSubmit(formSubmitAction)}>Зарегистрироваться</Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
