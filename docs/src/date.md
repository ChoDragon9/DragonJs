---
title: Date 다루기
sidebar: auto
---

## API 응답값을 Date 객체로 만들기
API 응답값에 날짜와 시간 데이터가 전달되어 Date 객체로 바꿔야 되는 경우가 있다.
대체로 아래와 같은 형태의 데이터로 전달되었다.

```
{
  startDateAt: '2020-04-20',
  startTimeAt: '10:50:00'
}
```

API 응답값을 Date 객체로 변경하려면 다음과 같이 할 수 있다.

```js
const response = {
  startDateAt: '2020-04-20',
  startTimeAt: '10:50:00'
};

const {startDateAt, startTimeAt} = response;
const date = new Date(`${startDateAt}T${startTimeAt}`);
// Mon Apr 20 2020 10:50:00 GMT+0900 (대한민국 표준시)
```

#### 설명
`new Date('2020-04-20T10:50:00')` 형태로 사용하여 Date 객체를 만드는 것이다.

Date 객체에 문자열로 전달될 경우 `Date.parse()`가 해석 가능한 규약으로 전달하면 정상적으로 변환된다.
해석 가능한 규약은 RFC2822 또는 ISO 8601 포맷이다. 자세한 스팩은 [여기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)에서 참고할 수 있다. 

## 날짜 문자열 포맷으로 변경하기
기획서 상에서 대체로 `2020.04.20 10:50` 형태로 표시 해달라는 요구사항이 있었다.

단순히 문자열이라면 이렇게 변경 가능하다.
```js
const dateAt = '2020-04-20 10:50:00';
const format = dateAt
  .replace(/-/g, '.')
  .replace(/:\d{2}$/, '');

// 2020.04.20 10:50
```

만약에 Date 객체를 변경이 필요하다면 다음과 같이 가능하다.

```js
const dateAt = new Date('2020-04-20T10:50:00');

const year = dateAt.getFullYear();
const month = dateAt.getMonth() + 1; // Tip! month는 0부터 시작한다.
const date = dateAt.getDate();
const hours = dateAt.getHours();
const minutes = dateAt.getMinutes();

const toLong = num => `${num < 10 ? '0': ''}${num}`

const format = [
  [year, month, date].map(toLong).join('.'),
  [hours, minutes].map(toLong).join(':')
].join(' ');

// 2020.04.20 10:50
```

#### 헬퍼함수 만들기
다양한 포맷이 필요하다면 헬퍼함수로 만드는 방법도 있다.

```js
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
```

```js
const dateAt = new Date('2020-04-20T10:50:00');

const dateStr = toFormat(dateAt, 'YYYY.MM.DD');
// 2020.04.20
const timeStr = toFormat(dateAt, 'hh:mm:ss');
// 10:50:00
const dateTimeStr = toFormat(dateAt, 'YYYY.MM.DD hh:mm');
// 2020.04.20 10:50
```

## 날짜 비교하기
전달된 날짜를 기준으로 오늘인지 식별하는 경우도 있고,
지정된 범위에 날짜인지 확인하는 경우도 있다.

날짜비교는 문자열, Date 객체 모두 간단하다. 단순히 같은 포맷으로 비교연산자를 사용하면 된다.

#### 문자열로 비교하기
```js
console.log('2020-04-20' > '2020-04-21')
// false
console.log('2020-04-20' < '2020-04-21')
// true
console.log('2020-04-20' === '2020-04-20')
// true

console.log('20200420' > '20200421')
// false
console.log('20200420' < '20200421')
// true
console.log('20200420' === '20200420')
// true
``` 

#### Date 객체로 비교하기
```js
console.log(new Date('2020-04-20') > new Date('2020-04-21'))
// false
console.log(new Date('2020-04-20') < new Date('2020-04-21'))
// true
console.log(+new Date('2020-04-20') === +new Date('2020-04-20'))
// true
```
Date 객체에 일치연산자(`===`)를 사용할 때는 앞에 `+`를 붙여준다.
`+new Date()`는 `new Date().getTime()`과 동일하다. 

#### Date 객체의 시간
Date 객체로 날짜를 비교할 때 실수하기 쉬운 부분이 시간이다.
날짜는 같은 데, 시간이 다를 경우 의도한 데로 동작하지 않는 다.

```js
const savedDate = new Date('2020-04-20T23:59:59')
const currentDate = new Date('2020-04-20')

const isToday = +savedDate === +currentDate;
// false
```

Date 객체로 날짜만 비교할 때 항상 시간을 주의해야 한다.
```js
const clearTime = (date) => {
  const clonedDate = new Date(date);
  clonedDate.setHours(0)
  clonedDate.setMinutes(0)
  clonedDate.setSeconds(0)
  clonedDate.setMilliseconds(0)
  return clonedDate;
};

const savedDate = new Date('2020-04-20T23:59:59')
const currentDate = new Date('2020-04-20')

const isToday = +clearTime(savedDate) === +clearTime(currentDate);
// true
```

## D-Day 구하기
D-Day는 날짜를 비교하고, 남은 날짜를 구해주면 된다.

```js
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
```

## 날짜 이동하기
날짜를 이동할 때는 기존날짜에 추가 또는 빼기를 해주면 된다.
일단위는 이렇게 구현 가능하다.

```js
const addDate = (date, count) => {
  const clonedDate = new Date(date);
  clonedDate.setDate(clonedDate.getDate() + count);
  return clonedDate
};

const today = new Date('2020-04-20T10:50:00');
const tomorrow = addDate(today, 1);
// 2020-04-21T10:50:00
```

`clonedDate.setDate(clonedDate.getDate() + count)` 이 부분에서 `count`를 음수로 넣어주면 이전 날도 가져올 수 있다.

```js
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
```

같은 원리로 년, 월, 일, 시, 분, 초 관련 헬퍼도 만들 수 있다.

## 윤년 확인하기
윤년은 4년마다 한번씩 찾아온다. 결국 4의 배수이기 때문에
해당 년도가 윤년과 비교했을 때 4의 배수인지 확인하면 된다.

```js
const isLeapYear = (year) => {
  const LEAP_YEAR = 2000; // 윤년
  const LEAP_YEAR_PERIOD = 4; // 윤년 주기

  const diffYear = Math.abs(year - LEAP_YEAR);
  return diffYear % LEAP_YEAR_PERIOD === 0
};

console.log(isLeapYear(2016));
// true
console.log(isLeapYear(2017));
// false
console.log(isLeapYear(2018));
// false
console.log(isLeapYear(2019));
// false
console.log(isLeapYear(2020));
// true
```

## 월의 마지막 날짜 가져오기
월의 마지막 날짜는 매년 동일하기 때문에 상수다. 단, 윤년일 때 2월만 29일로 바뀐다.
이 원리로 마지막 날짜를 구할 수 있다.

```js
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
```
