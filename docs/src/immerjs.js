const createProxy = target => {
  const handler = {
    get (target, key) {
      console.log('GET', key)
      return target[key]
    },
    set (target, key, value) {
      console.log('SET', key, value)
      target[key] = value
    }
  }
  return Proxy.revocable(target, handler)
}

const target = {
  message: ''
}
const {proxy, revoke} = createProxy(target)

proxy.message = 'World!'
console.log('LOG', proxy.message)

revoke()

console.log(proxy.message) // Error
