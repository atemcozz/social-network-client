const getDateFromSQL = (date) => {
  return new Date(date)
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .toString();
};
export default getDateFromSQL;
