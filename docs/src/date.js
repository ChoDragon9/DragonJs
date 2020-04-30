const clearTime = (date) => {
  const clonedDate = new Date(date);
  clonedDate.setHours(0);
  clonedDate.setMinutes(0);
  clonedDate.setSeconds(0);
  clonedDate.setMilliseconds(0);
  return clonedDate;
};
const ONE_DAY_MS = 1000 * 60 * 60 * 24;
// 1000: 1초
// 1000 * 60: 60초 = 1분
// 1000 * 60 * 60: 60분 = 1시간
// 1000 * 60 * 60 * 24: 24시간 = 1일

const currentDate = new Date('2020-04-20T10:50:00');
const targetDate = new Date('2020-04-27T10:50:00');

const diff = clearTime(targetDate) - clearTime(currentDate);
// 604800000
const dDay = diff / ONE_DAY_MS;
// D-Day: 7
