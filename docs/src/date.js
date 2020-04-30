const addDate = (date, count) => {
  const clonedDate = new Date(date);
  clonedDate.setDate(clonedDate.getDate() + count);
  return clonedDate
};
const subtractDate = (date, count) => {
  return addDate(date, -count)
};

const today = new Date('2020-04-20T10:50:00');
const tomorrow = addDate(today, 1);
// 2020-04-21T10:50:00
const yesterday = subtractDate(today, 1);
// 2020-04-19T10:50:00
