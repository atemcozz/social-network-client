export const errors = {
  ERR_NICKNAME_ALREADY_TAKEN: "Данный никнейм уже занят",
  ERR_NICKNAME_TOO_SHORT: "Никнейм должен содержать как минимум 6 символов",
  ERR_PASSWORD_TOO_SHORT: "Пароль должен содержать как минимум 8 символов",
  ERR_NAME_TOO_SHORT: "Имя должно содержать как минимум 2 символа",
  ERR_SURNAME_TOO_SHORT: "Фамилия должна содержать как минимум 2 символа",
  ERR_AVATAR_LOAD: "Ошибка загрузки аватара",
  ERR_WRONG_NICKNAME_PASSWORD: "Неверный никнейм или пароль",
  ERR_TOKEN_NOT_FOUND: "Ошибка аутентификации, произведите повторный вход",
  ERR_POST_TITLE_REQUIRED: "Необходимо название поста",
  ERR_ATTACHMENT_REQUIRED: "Необходимо минимум одно вложение",
  ERR_POST_NOT_FOUND: "Пост не найден",
  ERR_POSTS_NOT_FOUND: "Посты не найдены",
  ERR_USER_NOT_FOUND: "Пользователь не найден",
  ERR_USERS_NOT_FOUND: "Пользователи не найдены",
};
export function getError(reason) {
  return errors[reason] || reason;
}
