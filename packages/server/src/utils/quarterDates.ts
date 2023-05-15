import dayjs from 'dayjs';
import { DAYJS_TIMESTAMPZ_FORMAT } from './constants';

export const quarterDates = () => {
  const currentDate = new Date();
  const jan = new Date(currentDate.getFullYear(), 0, 1);
  const april = new Date(currentDate.getFullYear(), 3, 1);
  const july = new Date(currentDate.getFullYear(), 6, 1);
  const oct = new Date(currentDate.getFullYear(), 9, 1);

  return { currentDate, jan, april, july, oct };
};
export const starAndEndDatesOfCurrenQuarter = () => {
  let startDate, endDate;

  const { april, currentDate, jan, july, oct } = quarterDates();
  if (currentDate >= jan && currentDate < april) {
    startDate = jan;
    endDate = april;
  } else if (currentDate >= april && currentDate <= july) {
    startDate = april;
    endDate = july;
  } else if (currentDate >= july && currentDate <= oct) {
    startDate = july;
    endDate = oct;
  } else if (currentDate >= oct && currentDate < jan) {
    startDate = oct;
    endDate = jan;
  }
  return { startDate, endDate };
};

export const getLastQuarter = () => {
  const today = dayjs();
  let quarterStartMonth;
  let quarterEndMonth;
  let quarterStartYear;
  let quarterEndYear;

  if (today.month() <= 2) {
    quarterStartMonth = 9;
    quarterEndMonth = 11;
    quarterStartYear = today.year() - 1;
    quarterEndYear = today.year() - 1;
  } else if (today.month() <= 5) {
    quarterStartMonth = 0;
    quarterEndMonth = 2;
    quarterStartYear = today.year();
    quarterEndYear = today.year();
  } else if (today.month() <= 8) {
    quarterStartMonth = 3;
    quarterEndMonth = 5;
    quarterStartYear = today.year();
    quarterEndYear = today.year();
  } else {
    quarterStartMonth = 6;
    quarterEndMonth = 8;
    quarterStartYear = today.year();
    quarterEndYear = today.year();
  }

  const quarterStart = dayjs()
    .year(quarterStartYear)
    .month(quarterStartMonth)
    .startOf('month')
    .format(DAYJS_TIMESTAMPZ_FORMAT);
  const quarterEnd = dayjs()
    .year(quarterEndYear)
    .month(quarterEndMonth)
    .endOf('month')
    .format(DAYJS_TIMESTAMPZ_FORMAT);

  return { quarterStart, quarterEnd };
};
export const getThisQuarter = () => {
  const today = dayjs();
  let quarterStartMonth;
  let quarterEndMonth;
  const quarterStartYear = today.year();
  const quarterEndYear = today.year();

  const currentMonth = today.month();

  if (currentMonth <= 2) {
    quarterStartMonth = 0;
    quarterEndMonth = 2;
  } else if (today.month() <= 5) {
    quarterStartMonth = 3;
    quarterEndMonth = 5;
  } else if (today.month() <= 8) {
    quarterStartMonth = 6;
    quarterEndMonth = 8;
  } else {
    quarterStartMonth = 8;
    quarterEndMonth = 11;
  }

  const quarterStart = dayjs()
    .year(quarterStartYear)
    .month(quarterStartMonth)
    .startOf('month')
    .format(DAYJS_TIMESTAMPZ_FORMAT);

  const quarterEnd = dayjs()
    .year(quarterEndYear)
    .month(quarterEndMonth)
    .endOf('month')
    .format(DAYJS_TIMESTAMPZ_FORMAT);

  return { quarterStart, quarterEnd };
};

export type StartOfEndOfUnitType =
  | 'yesterday'
  | 'lastWeek'
  | 'today'
  | 'thisWeek'
  | 'lastQuarter'
  | 'thisQuarter';

export const getStarAndEndOfUnits = (unit: StartOfEndOfUnitType) => {
  let startOfDay;
  let endOfDay;

  if (unit === 'yesterday' || unit == 'lastWeek') {
    startOfDay = dayjs()
      .subtract(1, unit === 'yesterday' ? 'day' : 'week')
      .startOf('day')
      .format(DAYJS_TIMESTAMPZ_FORMAT);
    endOfDay = dayjs()
      .subtract(1, unit === 'yesterday' ? 'day' : 'week')
      .endOf('day')
      .format(DAYJS_TIMESTAMPZ_FORMAT);
  }

  if (unit === 'today' || unit === 'thisWeek') {
    startOfDay = dayjs()
      .startOf(unit === 'today' ? 'day' : 'week')
      .format(DAYJS_TIMESTAMPZ_FORMAT);

    endOfDay = dayjs()
      .endOf(unit === 'today' ? 'day' : 'week')
      .format(DAYJS_TIMESTAMPZ_FORMAT);
  }

  if (unit === 'lastQuarter' || unit === 'thisQuarter') {
    if (unit === 'lastQuarter') {
      startOfDay = getLastQuarter().quarterStart;
      endOfDay = getLastQuarter().quarterEnd;
    } else {
      startOfDay = getThisQuarter().quarterStart;
      endOfDay = getThisQuarter().quarterEnd;
    }
  }
  return { startOfDay, endOfDay };
};
