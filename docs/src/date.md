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
const date = new Date(`${startDateAt}T${startTimeAt}+09:00`);
// Mon Apr 20 2020 10:50:00 GMT+0900 (대한민국 표준시)
```

#### 설명
`new Date('2020-04-20T10:50:00')` 형태로 사용하여 Date 객체를 만드는 것이다.

Date 객체에 문자열로 전달될 경우 `Date.parse()`가 해석 가능한 규약으로 전달하면 정상적으로 변환된다.
해석 가능한 규약은 RFC2822 또는 ISO 8601 포맷이다. 자세한 스팩은 [여기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)에서 참고할 수 있다. 

## Date 객체를 기획서에 제시된 포맷으로 변경하기
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

## 날짜비교

## D-Day 구하기

## 날짜 이동하기

## 시간 이동하기
