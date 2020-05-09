---
title: 2020.05 Vue.compile 1
sidebar: auto
---

Vue의 탬플릿 바인딩, 디렉티브는 컴파일러를 통해 구현된다. 여기서는 컴파일러와 유사하게 탬플릿 바인딩을 만들어봤다.
여기에 사용된 컴파일러 이론은 [여기](https://chodragon9.github.io/blog/compiler-theory/)에서 참고 할 수 있다.

## 컴파일로 동작
### 문법 정의
컴파일러를 만들기 전에 문법 정의가 필요하다 
현재 버전에서는 어트리뷰트 없는 HTML의 탬플릿 바인딩 문법을 정의했다. 

<<< @/docs/src/vue2-compile-1/syntax.txt

### 컴파일러 동작 과정
코드로 설명하기 전 컴파일러 동작 과정에 대한 설명이다.

#### 1. 토큰화
입력된 원본 코드를 토큰으로 분리하는 작업이다.
문법에 정의된 문법 요소별로 작게 나누어 스트림으로 출력한다.

##### Input
```html
<div>{{text}} Text</div>
```

##### Output
```js
[
  '<','div','>',
  '{{','text','}}',
  ' Text',
  '</','div','>'
]
```

#### 2. 파싱
토큰들 사이의 관계를 찾고, 연관된 토큰 끼리 그룹화 한다. 파서 함수를 통해 각 토큰들의 문법적 정보를 찾고, AST(추상 구문 트리)라 부르는 객체를 만든다.

AST는 일반화된 형식이 있는 게 아니다. 필요에 따라 구조를 만들어 사용한다. 예를 들어 Vue는 파서 함수 [baseParse](https://github.com/vuejs/vue-next/blob/f0d52d5428fca7c9b4b46be9c093b96f436c8b44/packages/compiler-core/src/parse.ts#L77)의 반환값 AST는 [RootNode](https://github.com/vuejs/vue-next/blob/f0d52d5428fca7c9b4b46be9c093b96f436c8b44/packages/compiler-core/src/ast.ts#L100)다.

##### Input
```js
[
  '<','div','>',
  '{{','text','}}',
  ' Text',
  '</','div','>'
]
```
##### Output
```js
{
  type: 'Tag',
  body: [
    { type: 'Symbol', value: '<' },
    { type: 'Keyword', value: 'div' },
    { type: 'Symbol', value: '>' },
    {
      type: 'Template',
      body: [
        { type: 'Symbol', value: '{{' },
        { type: 'Keyword', value: 'text' },
        { type: 'Symbol', value: '}}' }
      ],
    },
    { type: 'StringConstant', value: ' Text' },
    { type: 'Symbol', value: '</' },
    { type: 'Keyword', value: 'div' },
    { type: 'Symbol', value: '>' }
  ],
}
```

#### 3. 변형
변형 함수를 통해 컴파일러 결과물의 도메인에 유사한 AST로 변환한다.

##### Input
```js
{
  type: 'MarkupLanguage',
  value: 'h1',
  children: [
    {type: 'Template', value: '{{text}}'}
  ]
}
```
##### Output
```js
{
  tag: 'h1',
  children: [
    {type: 'TemplateBinding', value: 'text'}
  ]
}
```

#### 4. 코드 생성
컴파일러의 마지막 단계이다. 생성 함수를 통해 이전 단계에서 만든 AST 기반으로 결과물을 만들어낸다.

##### Input
```js
{
  tag: 'h1',
  children: [
    {type: 'TemplateBinding', value: 'text'}
  ]
}
```
##### Output
```js
(state) => createElement('h1', state.text)
```

#### 5. 함수 병합
렉서 함수, 파서 함수, 변경 함수, 생성 함수들을 병합하면 컴파일러가 된다.

```js
export const compiler = (code) => {
  const tokens = lexer(code);
  const ast = parser(tokens);
  const htmlAst = transformer(ast);
  const renderFn = generator(htmlAst);
  return renderFn;
};
```

### 탬플릿 바인딩
Vue의 컴파일러 결과는 탬플릿 리터럴로 만들어진다. 그리고 결과 실행 시 `new Function`을 사용한다.
Vue 코드는 [여기](https://github.com/vuejs/vue-next/blob/e954ba21f04f0ef848c687233fcb849d75e4153f/packages/vue/src/index.ts#L67)에서 볼 수 있다.

<<< @/docs/src/vue2-compile-1/template-literal-function.js


## 컴파일러 만들기
```html
<h1>{{text}}</h1>
```
형태의 탬플릿을 컴파일하는 컴파일러이다. 이 형태만 동작한다.

### 1. 토큰화
<<< @/docs/src/vue2-compile-1/lexer.js
### 2. 파싱
<<< @/docs/src/vue2-compile-1/parser.js
### 3. 변형
<<< @/docs/src/vue2-compile-1/transformer.js
### 4. 코드 생성
<<< @/docs/src/vue2-compile-1/generator.js
### 5. 함수 병합
<<< @/docs/src/vue2-compile-1/compiler.js
### 탬플릿 바인딩 확인
<<< @/docs/src/vue2-compile-1/template-binding.js
