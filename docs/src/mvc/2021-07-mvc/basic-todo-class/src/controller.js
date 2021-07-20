class Controller {
  constructor(model, view) {
    Object.assign(this, {model, view})
  }

  addTodoItem (item) {
    this.model.addTodoItem(item)
  }

  removeTodoItem (item) {
    this.model.removeTodoItem(item)
  }
}

export default Controller
