---
title: Simple Component
sidebar: auto
---
> 2020.07.23

[Simple DOM](/src/component/simple-dom)을 기반으로 만든 심플 컴포넌트 프로젝트다.

### 컴포넌트
[Recoil 버전](/src/component/recoil-feature/)에서 영감을 얻은 컴포넌트.

#### 기본 형태
```js
export const TextComponent = defineComponent({
  render: () => {
    return {
      template: '<p>Hello World</p>'
    }
  }
});
```

#### 이벤트
```js
export const TextComponent = defineComponent({
  render: () => {
    return {
      template: '<input type="text" @input="onInput">',
      events: {
        onInput: (event) => console.log(event.target.value)
      }
    }
  }
});
```

#### 내부 상태
```js
export const TextComponent = defineComponent({
  atoms: {
    textAtom: atom('')
  },
  render: ({atoms: {textAtom}}) => {
    const [text, setText] = useAtom(textAtom)
    return {
      template: `
        <input type="text" @input="onInput">
        <p>${text}</p>
      `,
      events: {
        onInput: (event) => setText(event.target.value)
      }
    }
  }
});
```

#### 글로벌 상태
```js
export const InputComponent = defineComponent({
  atoms: {inputAtom},
  render: ({atoms: {inputAtom}}) => {
    const [input, setInput] = useAtom(inputAtom);
  
    const template = `<div>
        <input 
          type="text"
          value="${input}"
          @input="setInput"
        />
    </div>`;
    const events = {setInput};
   
    return {template, events}; 
  } 
});
```

#### 부모-자식 연동
```js
const countAtom = atom(0);

export const CounterComponent = defineComponent({
  toms: {countAtom},
  render: ({atoms: {countAtom}}) => {
    const [count] = useAtom(countAtom);
  
    const template = `<div>
      ${UpCountComponent()}
      ${count}
      ${DownCountComponent()}
    </div>`;
   
    return {template}; 
  } 
});

export const UpCountComponent = defineComponent({
  atoms: {inputAtom},
  render: ({atoms: {countAtom}}) => {
    const [count, setCount] = useAtom(countAtom);
  
    const template = `<button type="button" @click="upCount">Up</button>`;
    const events = {
      upCount: () => setCount(count + 1)
    }
   
    return {template, events}; 
  } 
});

export const DownCountComponent = defineComponent({
  atoms: {inputAtom},
  render: ({atoms: {countAtom}}) => {
    const [count, setCount] = useAtom(countAtom);
  
    const template = `<button type="button" @click="downCount">Down</button>`;
    const events = {
      downCount: () => setCount(count - 1)
    }
   
    return {template, events}; 
  } 
});
```
