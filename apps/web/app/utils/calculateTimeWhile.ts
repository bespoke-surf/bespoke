import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const calculateTimeWhile = (date: string): string => {
  const utcDate = dayjs.utc();
  const currentDateUTC = dayjs.utc(date);

  const days = `${currentDateUTC.format("MMM DD YYYY")} at ${currentDateUTC
    .local()
    .format("hh:mm a")}`;

  const hours = `${utcDate.diff(currentDateUTC, "hour")}hrs ago`;
  const time = ` at ${currentDateUTC.local().format("hh:mm a")}`;

  const minutes = `${utcDate.diff(currentDateUTC, "minute")}mins ago`;
  const hoursDiff = utcDate.diff(currentDateUTC, "hours");

  const minuteDiff = utcDate.diff(currentDateUTC, "minutes");

  if (hoursDiff > 24) {
    return days;
  }

  if (hoursDiff >= 1) {
    return time;
  }

  if (minuteDiff >= 1) {
    return minutes;
  }

  if (minuteDiff < 1) {
    return "Just now";
  }

  return hours;
};
