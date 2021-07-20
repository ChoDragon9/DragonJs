export default class Subject {
  constructor() {
    this.set = new Set()
  }
  notify (value) {
    this.set.forEach(observer => observer.update(value))
  }
  subscribe (observer) {
    this.set.add(observer)
  }
  unsubscribe (observer) {
    this.set.remove(observer)
  }
}
