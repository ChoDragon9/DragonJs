import {component} from '../core/component.js';

export const ListComponent = component(({store, html}) => {
  const state = store.create({
    inputText: '',
    todoList: []
  });

  const actions = {
    addItem: () => {
      state.todoList.set([
        ...state.todoList.get(),
        state.inputText.get()
      ])
      state.inputText.set('', false);
    },
    changeInput: (inputText) => {
      // 렌더링을 하고 싶지 않을 때, set 두번째 인자에 false처리
      state.inputText.set(inputText, false);
    }
  };
  const render = () => {
    const dom = html(`<div>
      <h2>List Rendering</h2>
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
    input.addEventListener('input', (event) => {
      actions.changeInput(event.target.value)
    });

    return dom;
  };

  return render;
});
