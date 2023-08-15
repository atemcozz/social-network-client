import * as yup from "yup";

export const profileSchema = yup.object({
  name: yup.string().trim()
    .min(2, "Минимальная длина - 2 символа")
    .max(32, "Максимальная длина - 32 символа"),
  surname: yup.string().trim()
    .min(2, "Минимальная длина - 2 символа")
    .max(32, "Максимальная длина - 32 символа"),
  nickname: yup.string().trim().lowercase()
    .min(5, "Минимальная длина - 5 символов")
    .max(32, "Максимальная длина - 32 символа"),
  country: yup.string().nullable().default(null),
  sex: yup.number().integer().min(0).max(3).default(0),
  about: yup.string().trim().optional().max(300, "Максимальная длина - 300 символов").default(""),
});
