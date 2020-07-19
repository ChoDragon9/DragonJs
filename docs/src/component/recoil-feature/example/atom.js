import {atom, useAtom, observeAtoms} from '../core/atom.js';

const inputAtom = atom('Text');
const counterAtom = atom(0);
const [, setInput] = useAtom(inputAtom);
const [, setCounter] = useAtom(counterAtom);

observeAtoms({inputAtom, counterAtom}, () => {
  const [input] = useAtom(inputAtom);
  const [counter] = useAtom(counterAtom);
  console.log(input, counter)
});

setInput('Test1');
setInput('Test2');
setInput('Test3');
setCounter(0);
setCounter(1);
setCounter(2);
setCounter(3);
