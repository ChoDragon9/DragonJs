import Controller from './src/controller.js';
import Model from './src/model.js';
import View from './src/view.js';

const model = new Model();
const view = new View(model);
const controller = new Controller(model, view);

view.setController(controller);

document
  .getElementById('app')
  .appendChild(view.build());
