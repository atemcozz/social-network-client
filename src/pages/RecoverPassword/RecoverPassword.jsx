import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import InfoLabel from "../../components/UI/InfoLabel/InfoLabel";
import AuthService from "../../services/AuthService";
import Heading from "../../components/UI/Heading";
const RecoverPassword = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  async function submitAction() {
    setLoading(true);
    AuthService.recover({ email: email.trim() })
      .then(() => {
        setEmailSent(true);
        setError(null);
      })
      .catch((e) => setError(e.response.data?.reason))
      .finally(() => setLoading(false));
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <MainLayout>
      <div className="flex flex-col gap-4 px-4">
        <Heading>Восстановление пароля</Heading>
        <div className="flex flex-col gap-4 rounded-lg shadow-md p-4 bg-back">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type={"email"}
            placeholder="Введите вашу электронную почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailSent && (
            <InfoLabel>
              На вашу электронную почту будет отправлено письмо с новым паролем
              для входа. Не сообщайте его никому.
            </InfoLabel>
          )}
          <Button onClick={submitAction}>Отправить</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecoverPassword;
