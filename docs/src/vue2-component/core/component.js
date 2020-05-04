import * as _ from './fp.js'
import {createStore} from './store.js';
import {addEvent, getAttr, getElem} from './helper.js';

/**
 * @param options
  {
    data = _.always({}),
    template = _.noop,
    template({data: state, props})
    components = _.always([]),
    methods = _.always([]),
    events = _.always([]),
    beforeCreate = _.noop,
    created = _.noop
  }
 */
export const component = (options) => ({props, emit} = {}) => {
  const {
    data = _.always({}),
    template = _.noop,
    components = _.always([]),
    methods = _.always([]),
    events = _.always([]),
    beforeCreate = _.noop,
    created = _.noop
  } = options
  const state = data({props})
  const store = createStore(state)

  beforeCreate({props, data: state})

  const render = create({
    state,
    template,
    components,
    methods,
    events,
    store,
  })
  const dom = render({props, emit})
  const renderFn = replaceWith({dom, render, props})

  created({
    dom,
    props,
    data: state,
    render: renderFn,
  })
  reactive({store, state, renderFn})
  return dom
}

const create = ({
                  state,
                  template,
                  components,
                  methods,
                  events,
                  store,
                }) => ({props, emit}) => {
  const dom = parseDOM(template({data: state, props}))
  const methodResult = methods({dom, data: state, props, store, emit})

  bindEvent(events(), methodResult, dom)
  bindComponent({
    dom,
    state,
    components: components(),
    methodResult
  })
  return dom
}

const replaceWith = (params) => () => {
// render는 create와 component 함수의 반환 함수, 즉 2가지다.
  const {dom, render, props, on} = params
  const newDom = render({props, emit: on})

  dom.replaceWith(newDom)
  Object.assign(params, {dom: newDom})
}

const reactive = ({store, state, renderFn}) => {
  store.watchAll(({key, data}) => {
    state[key] = data
    renderFn()
  })
}

export const parseDOM = (template) => {
  var tmp = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  tmp.innerHTML = template
  return tmp.children[0]
}

export const bindEvent = (events, methods, dom) => {
  for (const [selector, event, methodName] of events) {
    if (selector === 'document') {
      document[event] = addEvent(methods, methodName)
    } else {
      getElem(selector, dom).forEach(elem => {
        elem[event] = addEvent(methods, methodName)
      })
    }
  }
}

export const bindComponent = ({components, dom, state, methodResult}) => {
  for (const [selector, component] of components) {
    getElem(selector, dom).forEach(elem => {
      replaceWith({
        dom: elem,
        render: component,
        props: getProps(elem, state),
        on: getOn(elem, methodResult)
      })()
    })
  }
}

// props는 자식에게 전달할 데이터
const getProps = (elem, state) => {
  const bindProps = getAttr(elem, 'bind-props')
  const props = getAttr(elem, 'props')
  if (bindProps) {
    return state[bindProps]
  } else {
    if (props) {
      return props
    }
    return {}
  }
}

// on은 자식으로부터 전달받은 콜백
const getOn = (elem, methodResult) => {
  const attr = getAttr(elem, 'on')
  if (attr && methodResult) {
    return methodResult[attr]
  }
}
