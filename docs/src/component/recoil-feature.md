---
title: Recoil 버전
sidebar: auto
---
> 2020.07.19

## Atom
### 유틸
#### Observer
<<< @/docs/src/component/recoil-feature/core/utils/observer.js

#### Ref
<<< @/docs/src/component/recoil-feature/core/utils/ref.js

#### Debounce
<<< @/docs/src/component/recoil-feature/core/utils/debounce.js

### atom
<<< @/docs/src/component/recoil-feature/core/atom.js

## 컴포넌트
### forEach
<<< @/docs/src/component/recoil-feature/core/utils/forEach.js

### defineComponent
<<< @/docs/src/component/recoil-feature/core/defineComponent.js

### html
<<< @/docs/src/component/recoil-feature/core/html.js

### mount
<<< @/docs/src/component/recoil-feature/core/mount.js

## 컴포넌트 사용 예제
### 마운트
<<< @/docs/src/component/recoil-feature/example/advanced.js

### Atom
<<< @/docs/src/component/recoil-feature/example/advanced/inputAtom.js

### MainComponent
<<< @/docs/src/component/recoil-feature/example/advanced/MainComponent.js

### TextComponent
<<< @/docs/src/component/recoil-feature/example/advanced/TextComponent.js

- Atom 변경 시, 다시 랜더링이 필요한 컴포넌트는 이와 같이 사용한다.
  - `defineComponent({atomA, atomB, ...}, renderFn)`

### InputComponent
<<< @/docs/src/component/recoil-feature/example/advanced/InputComponent.js

#### 고민
Atom 변경 시, 다시 랜더링되면 Focus와 입력이 종료된다.
그래서 Atom 변경 시, 다시 랜더링이 되지 않게 `defineComponent`의 첫번째 인자에 atom을 주입 못했다.

다시 랜더링 됬을 때, form 요소가 다시 랜더링 되지 않게 처리가 필요하다.

### 데모
- [데모](https://chodragon9.github.io/dragonjs/docs/src/component/recoil-feature/example/advanced.html)
