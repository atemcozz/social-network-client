import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().trim()
    .min(2, "Минимальная длина - 2 символа")
    .max(32, "Максимальная длина - 32 символа"),
  surname: yup.string().trim()
    .min(2, "Минимальная длина - 2 символа")
    .max(32, "Максимальная длина - 32 символа"),
  nickname: yup.string().trim().lowercase()
    .min(5, "Минимальная длина - 5 символов")
    .max(32, "Максимальная длина - 32 символа")
    .matches(/^[a-zA-Z0-9.]*$/, "Никнейм может содержать только английские буквы, цифры и символы точки"),
  email: yup.string().lowercase().email("Некорректный адрес эл. почты").required("Введите адрес эл. почты").trim(),
  password: yup.string().trim()
    .min(8, "Минимальная длина - 8 символов")
    .max(64, "Максимальная длина - 64 символа"),
  password_repeat: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают"),


});
