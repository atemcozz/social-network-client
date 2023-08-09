import * as yup from "yup";

export const emailSchema = yup.object({
  email: yup.string().lowercase().email("Некорректный адрес эл. почты").required("Введите адрес эл. почты").trim(),
});
