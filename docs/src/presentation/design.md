---
title: 설계
sidebar: auto
---

## 설계 그림
![설계 그림](./presentation-design.jpeg)

## HLD(High Level Design)
- UI 컴포넌트와 스토어로 구성된다.
- UI 컴포넌트는 역할별로 계층구조를 갖는다.
- 스토어는 단일 상태를 가진다.
  - 상태 변경은 Mutation을 통해서만 가능하다.
  - 상태 변경 요청은 Action을 통해서만 가능하다.
- 스토어는 특정 인터페이스를 통해서만 접근 가능하다.
  - `ActionInterface`
  - `GetterInterface`

### 관계
- UI 컴포넌트와 스토어의 관계다.
- 입력박스 컴포넌트는 스토어의 `ActionInterface`를 사용한다.
- 프레젠테이션 컴포넌트는 스토어의 `GetterInterface`를 사용한다.

## LLD(Low Level Design)
### Action
- `updateASTFromMarkdown`, `updateASTFromHTML` 형태의 인터페이스를 제공한다.
- 특정 입력 포맷을 AST로 변경하여, Mutation에 요청한다.

#### updateASTFromXXX
- 함수는 Tokenize와 Parse 단계로 실행된다.

### AST
```ts
type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type ImageType = 'img'
type TextType = 'text'
type ListItemType = 'li'

type ASTType = HeadingType | ImageType | TextType | ListItemType  

interface AST {
  type: ASTType
  value: string
}

type ListType = 'ul' | 'ol'
interface ListAST {
  type: ListType
  children: AST[]
}
```

### 상태변경감지
```js
Store.GetterInterface('ast', (newAst) => {})
```

### 컴포넌트
```js
export default defineComponent((ast) => {
  return ast.type === 'h1'
    ? `<h1>${ast.value}</h1>`
    : '';
})
```
```js
const renderListItem = (ast) => {
  return ast.type!=='li' ? '' : `<li>${ast.value}</li>`;
};
const render = (ast) => {
  const listItem = ast.children 
    ? ast.children.map(renderListItem).join('')
    : '';
  return ast.type === 'ul'
    ? `<ul>${listItem}</ul>`
    : '';
};

export default defineComponent(render);
```
