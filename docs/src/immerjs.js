// 함수 정의
const isArray = value => Array.isArray(value)
const canProduce = value => {
  return value === undefined || value === null ?
    false :
    isArray(value) || typeof value === 'object'
}

const assign = (...obj) => Object.assign(...obj)

const shallowCopy = obj => {
  if (!canProduce(obj)) return obj
  if (isArray(obj)) return obj.concat()
  return assign({}, obj)
}

const toLinkedListItem = (base, parent = null, propName = null) => {
  return {
    base,
    parent,
    propName,
    copy: null,
  }
}

const toBase = (state) => {
  return state.copy ? state.copy : state.base
}

const changeLinkedList = (state, propName, value) => {
  const nextValue = {[propName]: value}

  state.copy ?
    assign(state.copy, nextValue) :
    assign(state, {
      copy: assign(shallowCopy(state.base), nextValue)
    })

  if (state.parent) {
    changeLinkedList(state.parent, state.propName, state.copy)
  }
}

const createProxy = (base, revokes, parentState, propName) => {
  const state = toLinkedListItem(base, parentState, propName)
  const handler = {
    get (target, key) {
      const value = toBase(state)[key]
      if (canProduce(value)) {
        const {proxy} = createProxy(value, revokes, state, key)
        return proxy
      } else {
        return value
      }
    },
    set (target, key, value) {
      changeLinkedList(state, key, value)
      return true
    }
  }

  const {proxy, revoke} = Proxy.revocable(base, handler)
  revokes.push(revoke)
  return {proxy, revoke, revokes, state}
}

const produceBase = (base, fn) => {
  const {proxy, revokes, state} = createProxy(base, [])

  fn(proxy)
  revokes.forEach(fn => fn())

  return toBase(state)
}

const produce = (fn) => (base) => {
  return canProduce(base) ? produceBase(base, fn) : base
}
const baseState = [
  {
    todo: "Learn typescript",
    done: true
  },
  {
    todo: "Try immer",
    done: false
  }
]

// const nextState = produce(baseState, draftState => {
//   draftState.push({todo: "Tweet about it"})
//   draftState[1].done = true
// })
const nextState = produce(draftState => {
  draftState.push({todo: "Tweet about it"})
  draftState[1].done = true
})(baseState)

// the new item is only added to the next state,
// base state is unmodified
console.log(baseState.length === 2) // expect(baseState.length).toBe(2)
console.log(nextState.length === 3) // expect(nextState.length).toBe(3)

// same for the changed 'done' prop
console.log(baseState[1].done === false) // expect(baseState[1].done).toBe(false)
console.log(nextState[1].done === true) // expect(nextState[1].done).toBe(true)

// unchanged data is structurally shared
console.log(nextState[0] === baseState[0]) // expect(nextState[0]).toBe(baseState[0])
// changed data not (dûh)
console.log(nextState[1] !== baseState[1]) // expect(nextState[1]).not.toBe(baseState[1])
