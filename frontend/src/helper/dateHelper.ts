import dayjs from "dayjs";

export const checkExpireDate = (dateString: string) => {
  const diffDate = dayjs(dateString).diff(dayjs().format("YYYY-MM-DD"), "d");
  if (diffDate <= 0) {
    return "danger";
  } else if (diffDate <= 60) {
    return "warning";
  } else {
    return undefined;
  }
};
