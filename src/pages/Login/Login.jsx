import React, {useState} from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Spinner from "../../ui/Spinner/Spinner";
import store from "../../store";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../features/Auth";
import AuthLayout from "../../components/Layout/AuthLayout/AuthLayout";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  function formSubmitAction(data) {
    setLoading(true);
    store
      .login(data)
      .then(() => navigate("/"))
      .catch(setServerError)
      .finally(() => setLoading(false));

  }

  if (loading) {
    return (
      <AuthLayout>
        <div className="flex flex-col max-w-md mx-auto">
          <Heading>Логин</Heading>
          <div className={"flex justify-center items-center rounded-lg shadow-md bg-back p-4 h-72"}>
            <Spinner/>
          </div>
        </div>
      </AuthLayout>
    );
  }
  return (
    <AuthLayout>
      <div className="flex flex-col max-w-md mx-auto">
        <Heading>Логин</Heading>
        <div className="rounded-lg shadow-md bg-back p-4 flex justify-center">
          <div className={"flex flex-col gap-4 w-full"}>
            {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}
            <Form autoComplete={"off"}>
              <Form.Field label={"Никнейм или адрес эл. почты"} error={errors?.login?.message} required>
                <Input placeholder={"Введите никнейм"} {...register("login")}/>
              </Form.Field>
              <Form.Field label={"Пароль"} error={errors?.password?.message} required>
                <Input type={"password"} placeholder={"Введите пароль"} {...register("password")}/>
              </Form.Field>

            </Form>
            <div className={"flex flex-col gap-2"}>
              <Button onClick={handleSubmit(formSubmitAction)}>Войти</Button>
              <Link to={"/recover"} className={""}>
                <Button variant="outlined" className={"w-full"}>
                  Забыли пароль?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
