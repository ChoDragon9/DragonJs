const isLeapYear = (year) => {
  const LEAP_YEAR = 2000;
  const LEAP_YEAR_PERIOD = 4;

  const diffYear = Math.abs(year - LEAP_YEAR);
  return diffYear % LEAP_YEAR_PERIOD === 0
};
const toLastDay = (year, month) => {
  const LAST_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const LEAP_YEAR_LAST_DATE = 29;
  const MONTH_FEBRUARY = 2;

  if (isLeapYear(year) && month === MONTH_FEBRUARY) {
    return LEAP_YEAR_LAST_DATE
  }
  return LAST_DAYS[month - 1]
};

console.log(toLastDay(2019, 2));
// 28
console.log(toLastDay(2020, 2));
// 29
console.log(toLastDay(2020, 12));
// 31
