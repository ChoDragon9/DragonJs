const response = {
  startDateAt: '2020-04-20',
  startTimeAt: '10:50:00'
};

const {startDateAt, startTimeAt} = response;
const date = new Date(`${startDateAt}T${startTimeAt}`);
// Mon Apr 20 2020 10:50:00 GMT+0900 (대한민국 표준시)
