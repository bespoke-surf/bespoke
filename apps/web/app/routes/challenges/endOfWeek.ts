import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(duration);

export const endOfWeek = (minutes = false, captil = true) => {
  // Get the current time in UTC
  const currentTime = dayjs().utc();

  // Get midnight of the current day in UTC
  const midnight = dayjs().utc().endOf("week");

  // Calculate the difference between the two times in milliseconds
  const diff = midnight.diff(currentTime);

  // Convert the difference to days and hours
  let duration = dayjs
    .duration(diff)
    .format(`D[${captil ? "D" : "d"}] H[${captil ? "H" : "h"}]`);
  if (minutes) {
    duration = dayjs
      .duration(diff)
      .format(
        `D[${captil ? "D" : "d"}] H[${captil ? "H" : "h"}] m[${
          captil ? "M" : "m"
        }]`
      );
  }

  return duration;
};

export const aDayToWeekEnd = (): boolean => {
  // Get the current time in UTC
  const currentTime = dayjs().utc();

  // Get midnight of the current day in UTC
  const midnight = dayjs().utc().endOf("week");

  // Calculate the difference between the two times in milliseconds
  const diff = midnight.diff(currentTime);

  // Convert the difference to days and hours
  let dd = dayjs.duration(diff).asDays();

  if (dd <= 1) {
    return true;
  }

  return false;
};
