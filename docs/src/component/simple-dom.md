---
title: Simple DOM
sidebar: auto
---
> 2020.07.23

현실적으로 서비스를 운영할 때, 마크업은 탬플릿 형태로 반영된다.
탬플릿 형태를 사용하는 형태로 심플한 패치 기능 프로젝트다.

## Interface
```ts
type parse = (template) => FragmentDOM
type bindEvents = (FragmentDOM, events) => void
type patch = (FragmentDOM, AutualDOM) => void
```

### Core
[Fragment DOM](/src/component/fragment-dom/)에서 영감을 얻은 코어.

```js
const template = `<div>
  <input type="text" @click="onClick">
</div>`;
const events = {
  onClick: (event) => {
    console.log(event.target.value)
  }
};

const fragmentDOM = parse(template);
const autualDOM = document.querySelector('#app');

bindEvents(fragmentDOM, events);
patch(fragmentDOM, autualDOM);
```
