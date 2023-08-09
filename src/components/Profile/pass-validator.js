import * as yup from "yup";

export const passwordSchema = yup.object({
  old_password: yup.string().required("Необходим старый пароль"),
  password: yup.string().trim()
    .min(8, "Минимальная длина - 8 символов")
    .max(64, "Максимальная длина - 64 символа"),
  password_repeat: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают"),
});
