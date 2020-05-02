const toLinkedListItem = (base, parent = null, propName = null) => {
  return {
    base,
    parent,
    propName,
    copy: null,
  }
}

const toLinkedList = (base, parent = null, propName = null, list = []) => {
  const state = toLinkedListItem(base, parent, propName)

  list.push(state)

  for (const propName in base) {
    if (typeof base[propName] === 'object') {
      toLinkedList(base[propName], state, propName, list)
    }
  }

  if (parent) {
    return state
  } else {
    return list
  }
}

const changeLinkedList = (state, propName, value) => {
  if (state.copy) {
    state.copy[propName] = value
  } else {
    state.copy = Object.assign({}, state.base, {[propName]: value})
  }

  if (state.parent) {
    changeLinkedList(state.parent, state.propName, state.copy)
  }
}

const toBase = (list) => {
  return list[0].copy ? list[0].copy : list[0].base
}

const base = {
  value: 'Hello',
  inner: {message: 'Hello World'}
}
const state = toLinkedList(base)

console.log(base === toBase(state))
// true

changeLinkedList(state[1], 'message', 'World')
console.log(base === toBase(state))
// false
