import {createStore} from '../../core/store.js';

export const store = createStore({
  state: {
    presentation: null,
    name: '',
    age: '',
  },
  mutation: {
    mutatePresentation: (state, presentation) => {
      return {...state, presentation}
    },
    mutateName: (state, name) => {
      return {...state, name}
    },
    mutateAge: (state, age) => {
      return {...state, age}
    }
  },
  actions: {
    updatePresentation: (context, payload) => {
      context.commit('mutatePresentation', payload);
    },
    updatePersonInfo: (context, {name, age}) => {
      console.log(context.state);
      context.commit('mutateName', name);
      context.commit('mutateAge', age);
    }
  }
});
