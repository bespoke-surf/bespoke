import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(duration);

export const endOfDay = (minutes = false, capital = true) => {
  // Get the current time in UTC
  const currentTime = dayjs().utc();

  // Get midnight of the current day in UTC
  const midnight = dayjs().utc().endOf("day");

  // Calculate the difference between the two times in milliseconds
  const diff = midnight.diff(currentTime);

  // Convert the difference to days and hours
  let duration = dayjs.duration(diff).format(`H[${capital ? "H" : "h"}]`);
  if (minutes) {
    duration = dayjs
      .duration(diff)
      .format(`H[${capital ? "H" : "h"}] m[${capital ? "M" : "m"}]`);
  }

  return duration;
};
