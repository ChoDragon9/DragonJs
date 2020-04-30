const dateAt = new Date('2020-04-20T10:50:00');

const year = dateAt.getFullYear();
const month = dateAt.getMonth() + 1; // Tip! month는 0부터 시작한다.
const day = dateAt.getDate();
const hours = dateAt.getHours();
const minutes = dateAt.getMinutes();

const toLong = num => `${num < 10 ? '0': ''}${num}`

const format = [
  [year, month, day].map(toLong).join('.'),
  [hours, minutes].map(toLong).join(':')
].join(' ');

console.log(format);
