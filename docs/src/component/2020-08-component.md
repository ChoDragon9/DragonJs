---
title: 2020.08 Component
sidebar: auto
---

## 목표
이 펫 프로젝트의 목표는 다음과 같다.

- 최종적으로 라이트한 프로젝트에 사용할 수준으로 제작한다.
- 컴포넌트 정의 기능을 간단하게 만들 수 있어야 한다.
  - 아키텍처 레벨의 코드는 난이도가 높을 가능성이 크기 때문이다. 
- 컴포넌트 사용을 쉽게 사용 가능한 형태로 제작해야 한다.
- 지원 기능
  - 상태 변경 시, 다시 렌더링되는 기능
  - 부모-자식 관계를 가질 수 있는 기능
  - 공유상태를 사용할 수 있는 기능

## 컴포넌트 사용법
### 기본 컴포넌트
<<< @/docs/src/component/2020-08-component/BasicComponent.js

- `component`로 컴포넌트를 선언한다.
- `component` 인자에 함수를 전달하는 데, 해당 함수를 `createComponent`로 명명한다.
- `createComponent` 함수는 항상 함수를 반환해야 하는 데. 해당 함수는 `render`로 명명한다.
- `createComponent`는 첫번째 인자에 `html`가 전달된다.
  - `html`은 `template`을 인자로 받아, **DOM을 반환**한다.
 

### 컴포넌트 내부 스토어 사용
<<< @/docs/src/component/2020-08-component/CounterComponent.js

- `createComponent`는 첫번째 인자에 `html`과 함께, `store`가 전달된다.
- `store`는 **컴포넌트 내부 스토어**다.
- `store.useState`로 **컴포넌트 상태를 등록**한다.
  - 등록된 상태는 `get`으로 조회, `set`으로 수정 할 수 있다.
  - `set`이 실행되면 `render`로 **다시 렌더링**한다.
- DOM 이벤트는 DOM API로 등록한다.

### 리스트 렌더링
<<< @/docs/src/component/2020-08-component/ListComponent.js

- 리스트 렌더링은 Array API를 사용한다.
- `set` 함수의 두번째 인자에 `false`를 전달하면, 해당 상태를 전파 하지 않는다.

### 컨디션 렌더링
<<< @/docs/src/component/2020-08-component/ConditionComponent.js

- 컨디션 렌디링은 연산자를 사용한다.

### 부모-자식 관계
<<< @/docs/src/component/2020-08-component/ParentChild.js

- 자식 컴포넌트는 `replaceWith`으로 DOM을 변경한다.
- 자식 컴포넌트에 `{props, emit}`을 전달할 수 있다.
  - `props`는 자식에게 전달할 상태를 담는다.
  - `emit`은 자식에게 전달 받을 함수를 담는다.
- 자식 컴포넌트에 전달된 `{props, emit}`은 `createComponent`의 두번째 인자로 전달된다.
- `props`, `emit` 자료구조는 강제성이 없으나, 인자 네이밍은 강제한다.

### 공유 상태 사용
<<< @/docs/src/component/2020-08-component/SharedState.js

- 공유 상태를 사용하려면, `store.share`로 스토어를 등록한다.
- 등록된 스토어를 바로 사용하지 않고, 공유 상태를 사용한다.

### 마운트
<<< @/docs/src/component/2020-08-component/app.js

- 컴포넌트 함수의 반환값은 DOM임으로 `appendChild`로 마운트한다.

### 데모
- [데모](https://chodragon9.github.io/dragonjs/docs/src/component/2020-08-component/index.html)

## 코어 코드
### 헬퍼
#### mapValues
<<< @/docs/src/component/2020-08-component/core/helper/map-values.js

- Object의 값을 변경해주는 map 함수다.

#### html
<<< @/docs/src/component/2020-08-component/core/helper/html.js

- 템플릿을 DOM으로 변환하는 역할을 한다.

#### observer
<<< @/docs/src/component/2020-08-component/core/helper/observer.js

- 옵져버 패턴을 구현한 함수다.

### 스토어
<<< @/docs/src/component/2020-08-component/core/store.js

- `createStore` 실행 시, `subject`를 생성한다.
- `useState`로 상태를 등록한다.
- `share`로 스토어의 상태변경전파를 공유한다.
- `_subscribe`, `_unsubscribe`는 코어레벨에서 사용된다.

### 컴포넌트
<<< @/docs/src/component/2020-08-component/core/component.js

- `createComponent`를 인자로 받는다.
- `createComponent`를 실행하여 `render`를 반환 받는다.
- `render`를 최초에 실행 후 반환한다.
- `store`를 감시하며, 상태 전파을 받으면 `render`를 재실행하고 DOM을 교체한다.
