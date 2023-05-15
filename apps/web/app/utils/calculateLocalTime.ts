import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(LocalizedFormat);

export const calculateLocalTime = (
  date: string | undefined,
  format: string
) => {
  if (date) {
    return dayjs.utc(date).local().format(format);
  }
  return "";
};
