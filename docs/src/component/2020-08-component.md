---
title: 2020.08 Component
sidebar: auto
---

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
<<< @/docs/src/component/2020-08-component/example/BasicComponent.js

### 컴포넌트 내부 스토어 사용
<<< @/docs/src/component/2020-08-component/example/CounterComponent.js

### 리스트 렌더링
<<< @/docs/src/component/2020-08-component/example/ListComponent.js

### 컨디션 렌더링
<<< @/docs/src/component/2020-08-component/example/ConditionComponent.js

### 부모-자식 관계
<<< @/docs/src/component/2020-08-component/example/ParentChild.js

### 공유 상태 사용
<<< @/docs/src/component/2020-08-component/example/SharedState.js

### 데모
- [데모](https://chodragon9.github.io/dragonjs/docs/src/component/2020-08-component/index.html)

## 코어 코드
### 헬퍼
<<< @/docs/src/component/2020-08-component/core/helper/html.js
<<< @/docs/src/component/2020-08-component/core/helper/map-values.js
<<< @/docs/src/component/2020-08-component/core/helper/observer.js

### 스토어
<<< @/docs/src/component/2020-08-component/core/store.js

### 컴포넌트
<<< @/docs/src/component/2020-08-component/core/component.js
