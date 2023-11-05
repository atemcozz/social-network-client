import React, {useState} from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import {useNavigate} from "react-router-dom";
import Spinner from "../../ui/Spinner/Spinner";

import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import InfoLabel from "../../ui/InfoLabel/InfoLabel";
import {AuthService} from "../../features/Auth";
import Heading from "../../ui/Heading";
import AuthLayout from "../../components/Layout/AuthLayout/AuthLayout";
import {useForm} from "react-hook-form";
import Form from "../../ui/Form";
import {Helmet} from "react-helmet";

const RecoverPassword = () => {
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const {register, handleSubmit, formState: errors} = useForm();

  async function submitAction(data) {
    setLoading(true);
    AuthService.requestPasswordRecover(data)
      .then(() => setEmailSent(true))
      .catch(setServerError)
      .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <AuthLayout>
        <Helmet><title>Восстановление пароля</title></Helmet>
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
      <Helmet><title>Восстановление пароля</title></Helmet>
      <div className="max-w-md mx-auto">
        <Heading>Восстановление пароля</Heading>
        <div className="flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          {serverError && <ErrorMessage>{serverError?.response?.data?.message}</ErrorMessage>}
          <Form>
            <Form.Field label={"Введите ваш никнейм или адрес эл. почты"} required error={errors?.login?.message}>
              <Input
                placeholder="Введите никнейм или адрес эл. почты"
                {...register("login", {required: true})}
              />
            </Form.Field>
            {emailSent && (
              <InfoLabel>
                На ваш адрес электронной почты было отправлено письмо с дальнейшими инструкциями.
              </InfoLabel>
            )}
            <Button onClick={handleSubmit(submitAction)}>Отправить</Button>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RecoverPassword;
