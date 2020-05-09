---
title: 2020.05 Vue.compile 1
sidebar: auto
---

Vue의 탬플릿 바인딩, 디렉티브는 컴파일러를 통해 구현된다. 여기서는 컴파일러와 유사하게 탬플릿 바인딩을 만들어봤다.
여기에 사용된 컴파일러 이론은 [여기](https://chodragon9.github.io/blog/compiler-theory/)에서 참고 할 수 있다.

## 컴파일러 동작
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
  '{{',
    'text',
  '}}',
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
  '{{',
    'text',
  '}}',
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
        { type: 'Symbol', value: "{{" },
        { type: 'Keyword', value: 'text' },
        { type: 'Symbol', value: "}}" }
      ],
    },
    { type: 'StringConstant', value: ' Text' },
    { type: 'Symbol', value: '</' },
    { type: 'Keyword', value: 'div' },
    { type: 'Symbol', value: '>' }
  ],
}
```

#### 3. 가상 코드 생성
파싱의 출력인 AST를 분석해서 대상 코드와 유사한 가상 코드를 생성한다.

##### Input
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
        { type: 'Symbol', value: `{{` },
        { type: 'Keyword', value: 'text' },
        { type: 'Symbol', value: `}}` }
      ],
    },
    { type: 'StringConstant', value: ' Text' },
    { type: 'Symbol', value: '</' },
    { type: 'Keyword', value: 'div' },
    { type: 'Symbol', value: '>' }
  ],
}
```
##### Output
```js
[
  'element([',
  `startElement('div')`,
  `template('text')`,
  `text(' Text')`,
  `endElement('div')`,
  '])'
]
```

#### 4. 대상 코드 생성
컴파일러의 마지막 단계이다. 가상 코드를 기반으로 대상 코드를 생성한다. 

##### Input
```js
[
  'element([',
  `startElement('div')`,
  `template('text')`,
  `text(' Text')`,
  `endElement('div')`,
  '])'
]
```
##### Output
```js
(state) => create.element([
  create.startElement('div'),
  create.template(state.text),
  create.text(' Text'),
  create.endElement('div'),
]),
```

### 컴파일러 실행 결과
> Vue의 컴파일러 결과는 탬플릿 리터럴로 만들어진다. 그리고 결과 실행 시 `new Function`을 사용한다.
Vue 코드는 [여기](https://github.com/vuejs/vue-next/blob/e954ba21f04f0ef848c687233fcb849d75e4153f/packages/vue/src/index.ts#L67)에서 볼 수 있다.

```js
const template = `<div>{{hello}} {{world}}</div>`;
const render = compiler(template);

const state = {
  hello: 'Hello',
  world: 'World!'
};
console.log(render(state));
// <div>Hello World!</div>
```

## 컴파일러 만들기
아래에 정의된 코드들은 [여기](https://github.com/ChoDragon9/dragonjs/tree/master/src/vue2-compile-1)에서 확인할 수 있다.

### 1. 문법 및 공통 코드
##### 📄 helper.js
<<< @/docs/src/vue2-compile-1/compiler/helper.js

##### 📄 syntax.js
<<< @/docs/src/vue2-compile-1/compiler/syntax.js

### 2. 컴파일러
##### 📄 compiler.js
<<< @/docs/src/vue2-compile-1/compiler/compiler.js

### 3. 문법 분석기
##### 📄 /syntax-analyzer/index.js
<<< @/docs/src/vue2-compile-1/compiler/syntax-analyzer/index.js

##### 📄 /syntax-analyzer/tokenizer.js
<<< @/docs/src/vue2-compile-1/compiler/syntax-analyzer/tokenizer.js

##### 📄 /syntax-analyzer/parser.js
<<< @/docs/src/vue2-compile-1/compiler/syntax-analyzer/parser.js

### 4. 코드 생성기
##### 📄 /code-generator/index.js
<<< @/docs/src/vue2-compile-1/compiler/code-generator/index.js

##### 📄 /code-generator/virtual-code-generator.js
<<< @/docs/src/vue2-compile-1/compiler/code-generator/virtual-code-generator.js

##### 📄 /code-generator/target-code-generator.js
<<< @/docs/src/vue2-compile-1/compiler/code-generator/target-code-generator.js

##### 📄 /code-generator/virtual-code-syntax.js
<<< @/docs/src/vue2-compile-1/compiler/code-generator/virtual-code-syntax.js

### 5. 탬플릿 바인딩
##### 📄 index.html
<<< @/docs/src/vue2-compile-1/index.html

##### 📄 template-binding.js
<<< @/docs/src/vue2-compile-1/template-binding.js

##### 💻 실행 결과
```html
<div id="template">
  <div>
    Hello World!
    <div>My Text</div>
  </div>
</div>
```
