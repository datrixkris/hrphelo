import dayjs from "dayjs";

export const isDateBeforeToday = (date: string) => {
  const today = dayjs();
  const targetDate = dayjs(date);
  return targetDate.isBefore(today);
};
