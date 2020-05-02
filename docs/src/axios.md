---
title: Axios 기능 만들기
sidebar: auto
---

::: tip Axios 
[Axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js
:::

## CRUD 기능
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)를 기반으로 Axios의 기능을 만들어 본다.

#### fetch-wrapper.js
##### 설정
```js
const DOMAIN = 'http://localhost:3000'
const DEFAULT_HEADER = {
  'Content-Type': 'application/json'
}
```

##### 코어
```js
const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const fetchGetData = (url, queryObj) => {
  return fetchData({
    url: `${url}${queryToString(queryObj)}`,
    method: HTTP_METHOD.GET
  })
}

const fetchPostData = (url, body) => {
  return fetchData({
    url,
    body,
    method: HTTP_METHOD.POST,
  })
}

const fetchPutData = (url, body) => {
  return fetchData({
    url,
    body,
    method: HTTP_METHOD.PUT,
  })
}

const fetchDeleteData = (url, body) => {
  return fetchData({
    url,
    body,
    method: HTTP_METHOD.DELETE,
  })
}

const fetchData = ({url, method, body, headers}) => {
  return fetch(`${DOMAIN}${url}`, {
    method,
    body: toHttpBody(body),
    headers: toHttpHeader({body, headers})
  })
    .then(async response => {
      const {status, statusText} = response
      const body = await extractHttpBody(response)
      return {status, statusText, body}
    })
}
```

##### 헬퍼
```js
const toHttpBody = body => {
  return isFormData(body) ? body : JSON.stringify(body)
}

const toHttpHeader = ({body, headers}) => {
  return isFormData(body) ? undefined : Object.assign(DEFAULT_HEADER, headers)
}

const extractHttpBody = response => {
  const contentType = response.headers.get('Content-Type')

  switch (true) {
    case contentType.startsWith('application/json'):
      return response.json()
    case contentType.startsWith('image'):
      return response.blob()
  }
  return response.text()
}

const isFormData = data => data instanceof FormData

const queryToString = obj => {
  if (!obj) {
    return ''
  }

  const query = Object
    .entries(obj)
    .map(item => item.join('='))
    .join('&')
  return `?${query}`
}
```

#### 사용 예
##### GET Basic
```js
fetchGetData('/get/json', { value: 10 })
  .then(response => console.log(response))
fetchGetData('/get/text')
  .then(response => console.log(response))
```

##### GET Image
```js
fetchGetData('/static/code.png')
  .then(response => {
    getElem('get-image-tag').src = URL.createObjectURL(response.body)
  })
```

##### POST Basic
```js
fetchPostData('/post/json', {data: 'json'})
  .then(response => console.log(response))
```

##### POST File Upload
```js
const file = getElem('post-file-input').files[0]
const formData = new FormData()
formData.append('uploadFile', file, file.name)

fetchPostData('/post/file', formData)
  .then(response => console.log(response))
```

##### PUT Basic
```js
fetchPutData('/put/json', {data: 'json'})
  .then(response => console.log(response))
```

##### PUT File Upload
```js
const file = getElem('put-file-input').files[0]
const formData = new FormData()
formData.append('uploadFile', file, file.name)

fetchPutData('/put/file', formData)
  .then(response => console.log(response))
```

##### DELETE Basic
```js
fetchDeleteData('/delete/json', {data: 'json'})
  .then(response => console.log(response))
```

## Credentials 설정
인증된 계정임을 식별하기 위해 Cookie를 사용하기도 한다. 해당 케이스에서 Credentials 설정이 필요하다.
Fetch API에서 Credentials를 사용하기 위해서는 다음과 같이 하면된다.

```js {6,12}
const fetchData = ({
                     url,
                     method,
                     body,
                     headers,
                     isCredentials = true
                   }) => {
  return fetch(`${DOMAIN}${url}`, {
    method,
    body: toHttpBody(body),
    headers: toHttpHeader({body, headers}),
    credentials: isCredentials ? 'include' : 'same-origin'
  })
    .then(async response => {
      const {status, statusText} = response
      const body = await extractHttpBody(response)
      return {status, statusText, body}
    })
}

```
