---
title: 2020.08 Component
sidebar: auto
---

컴포넌트 생성 기능을 간단하게 만들 수 있으면서, 쉽게 사용가능한 형태로 제작하기 위함.

## 설계
```ts
type RenderFunction = () => HTMLElement
type CreateComponent = (context, args) => RenderFunction
type component = (createComponent: CreateComponent) => (args: any) => createComponent(context, args) 
```

### Basic
```js
export const BasicComponent = component(({fragment}) => {
  const render = () => {
    return fragment(`<div>Hello World!</div>`);
  }

  return render
})
```

### State
```js
export const CounterComponent = component(({store, fragment}) => {
  const state = store.create({
    count: 0,
  });
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1);
    },
     downCount: () => {
      state.count.set(state.count.get() - 1);
    }
  };
  const render = () => {
    const dom = fragment(`<div>
      <button type="text" class="up">Up</button>
      <button type="text" class="down">Down</button>
      <div>${state.count.get()}</div>
    </div>`);

    dom
      .querySelector('.up')
      .addEventListener('click', actions.upCount)
    dom
      .querySelector('.down')
      .addEventListener('click', actions.downCount)
  
    return dom;
  }

  return render
})
```

### List Rendering
```js
export const ListComponent = component(({store, fragment}) => {
  const state = store.create({
    inputText: '',
    todoList: []
  });
  const actions = {
    addItem: () => {
      state.todoList.set([
        ...store.todoList.get(),
        state.inputText.get()
      ])
    },
    changeInput: (inputText) => {
      // 렌더링을 하고 싶지 않을 때, set 두번째 인자에 false처리
      state.inputText.set(inputText, false);
    }
  };
  const render = () => {
    const dom = fragment(`<div>
         <input type="text">
         <button type="button">Add</button>
         <ol>
           ${state.todoList.get().map((item) => {
             return `<li>${item}</li>` 
           }).join('')}
         </ol>
     </div>`)

    const input = dom.querySelector('input');
    const button = dom.querySelector('button');
    button.addEventListener('click', () => {
      actions.addItem();
      input.value = '';
    });
    input.addEventListener('click', (event) => {
      actions.changeInput(event.target.value)
    });
    
    return dom;
  };
});
```

### Condition Rendering
```js
export const ListComponent = component(({store, fragment}) => {
  const state = store.create({
    toggle: false,
  });
  const actions = {
    toggle: () => {
      state.toggle.set(!state.toggle.get())
    }
  };
  
  const render = () => {
    const dom = fragment(`<div>
      <button type="button">Toggle</button>
      ${store.toggle.get() ? '<div>Hello World</div>' : ''}
    </div>`);
   
    dom
      .querySelector('button')
      .addEventListener('click', actions.toggle);
    
    return dom;
  };
  
  return render
});
```

### Parent-Child
```js
export const BaseButton = component(({fragment}, {props, emit}) => {
  const actions = {
    onClick: () => {
      emit('click')
    }
  };
  const render = () => {
    const dom = fragment(`<div>
       <button type="button">${props.buttonName}</button>
     </div>`)
    dom
      .querySelector('button')
      .addEventListener('click', actions.onClick);
    return dom;
  };

  return render;
})
```


```js
export const CounterButton = component(({fragment, store}) => {
  const state = store.create({
    count: 0
  });
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1)
    }
  };
  const render = () => {
    const props = {
      buttonName: 'Up Count'
    };
    const emit = {
      upCount: actions.upCount
    };
    const dom = fragment(`<div>
       <div>${state.count.get()}</div>
       <BaseButton />
     </div>`);
    
    dom
      .querySelector('BaseButton')
      .replaceWith(ButtonComponent({props, emit}))
    
    return dom;
  };
  
  return render;
});
```

### Shared State
```js
const sharedState = store.create({
  count: 0
});
export const CounterButton = component(({fragment, store}) => {
  const state = store.share(sharedState);
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1)
    }
  };
  const render = () => {
    const props = {
      buttonName: 'Up Count'
    };
    const emit = {
      upCount: actions.upCount
    };
    const dom = fragment(`<div>
       <button type="button">Up Count</button>
     </div>`);
    
    dom
      .querySelector('button')
      .addEventListener('click', actions.upCount)
    
    return dom;
  };
  
  return render;
});

export const MainComponent = component(({fragment}) => {
  return () => {
    const dom = fragment(`<div>
      <CounterButton1 />
      <CounterButton2 />
    </div>`);
    
    dom
      .querySelector('CounterButton1')
      .replaceWith(CounterButton())
    dom
      .querySelector('CounterButton2')
      .replaceWith(CounterButton())

    return dom;
  }
});
```
