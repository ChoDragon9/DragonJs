---
title: Fragment DOM
sidebar: auto
---

Virtual DOM과 유사한 역할을 하며, Document**Fragment**를 사용한 Virtual **DOM**으로 **Fragment DOM**으로 명명했다.

## Interface
```ts
// Component 생성 시, 작성하는 함수
type render = (state) => FragmentDOM

type patch = (FragmentDOM, AutualDOM) => void

type isNodeChanged = (FragmentDOM, AutualDOM) => boolean
type isAttributeChanged = (FragmentDOM, AutualDOM) => boolean
```

## patch 전략
### Node
같은 레벨의 Node를 순회하며 비교한다. 비교 후 변경 사항이 있을 때, Replace를 하고 해당 Node의 순회를 종료한다.

### Attribute
Attribute는 하나라도 변경되면 모두 변경한다.

### Node와 Attribute 우선순위?
Attribute 변경은 신규 추가/삭제에 미발생한다. 기존 Node에만 Attribute를 변경한다.

## 코어
### /core/render.js
<<< @/docs/src/component/fragment-dom/core/render.js

#### 사용예
<<< @/docs/src/component/fragment-dom/step1.js

### /core/patch.js
<<< @/docs/src/component/fragment-dom/core/patch.js

#### 사용예
<<< @/docs/src/component/fragment-dom/step2.js

## 사용케이스
### 상태 변경 후 패치
<<< @/docs/src/component/fragment-dom/step3.js

- [데모](https://chodragon9.github.io/dragonjs/docs/src/component/fragment-dom/index.html)
