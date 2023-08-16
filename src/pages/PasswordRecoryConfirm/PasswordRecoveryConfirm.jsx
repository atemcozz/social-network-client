import React, {useState} from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import Spinner from "../../ui/Spinner/Spinner";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import AuthLayout from "../../components/Layout/AuthLayout/AuthLayout";
import {passwordConfirmSchema} from "./password-confirm-validator";
import {AuthService} from "../../features/Auth";

const PasswordRecoveryConfirm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(passwordConfirmSchema),
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  function formSubmitAction(data) {
    setLoading(true);
    AuthService.confirmPasswordRecover(params.get("uuid"), data)
      .then(() => navigate("/login"))
      .catch(setServerError)
      .finally(() => setLoading(false));

  }

  if (loading) {
    return (
      <AuthLayout>
        <div className="flex flex-col max-w-md mx-auto">
          <Heading>Восстановление пароля</Heading>
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
        <Heading>Восстановление пароля</Heading>
        <div className="rounded-lg shadow-md bg-back p-4 flex justify-center">
          <div className={"flex flex-col gap-4 w-full"}>
            {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}
            <Form autoComplete={"off"}>
              <Form.Field label={"Новый пароль"} error={errors?.password?.message} required>
                <Input type={"password"} autoComplete={"new-password"}
                       placeholder={"Введите новый пароль"}  {...register("password")}/>
              </Form.Field>
              <Form.Field label={"Повторите новый пароль"} error={errors?.password_repeat?.message} required>
                <Input type={"password"} autoComplete={"new-password"}
                       placeholder={"Повторите новый пароль"}   {...register("password_repeat")}/>

              </Form.Field>
            </Form>
            <div className={"flex flex-col gap-2"}>
              <Button onClick={handleSubmit(formSubmitAction)}>Войти</Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordRecoveryConfirm;
