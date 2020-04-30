const toLong = num => `${num < 10 ? '0': ''}${num}`;
const toFormat = (baseDate, format) => {
  const [
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
  ] = [
    baseDate.getFullYear(),
    baseDate.getMonth() + 1,
    baseDate.getDate(),
    baseDate.getHours(),
    baseDate.getMinutes(),
    baseDate.getSeconds(),
  ].map(toLong);

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
};


const dateAt = new Date('2020-04-20T10:50:00');
const dateStr = toFormat(dateAt, 'YYYY.MM.DD');
const timeStr = toFormat(dateAt, 'hh:mm:ss');
const dateTimeStr = toFormat(dateAt, 'YYYY.MM.DD hh:mm');

console.log(dateStr);
console.log(timeStr);
console.log(dateTimeStr);
