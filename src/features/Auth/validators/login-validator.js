import * as yup from "yup";

export const loginSchema = yup.object({
  login: yup.string().trim().required("Введите никнейм или адрес эл. почты"),
  password: yup.string().trim().required("Введите пароль"),
});