function vanillaJsVue(options){
  let template = null;
  const watcher = {};

  const vModel = {
    name: 'v-model',
    bind: (elem, variableName) => {
      elem.value = options.data[variableName];
      elem.oninput = ((variableName => () => {
        options.data[variableName] = elem.value;
      })(variableName));
    }
  };

  const vOnClick = {
    name: 'v-onclick',
    bind: (elem, callbackName) => {
      elem.onclick = ((callbackName => event => {
        options.methods[callbackName].call(options.data, event);
      })(callbackName));
    }
  };

  const platformDirectives = [
    vOnClick,
    vModel
  ];

  const initTemplate = () => {
    template = useTemplate(options.el);
    template.bindData(options.data);
  };

  const runWatcher = (keyName, newVal) => {
    let callbacks = [];
    if(watcher.hasOwnProperty(keyName)){
      callbacks = watcher[keyName];
      callbacks.forEach(callback => {
        callback.call(options.data, newVal);
      });
    }
  };

  const initWatch = () => {
    let keyName;

    for(keyName in options.watch){
      watcher[keyName] = watcher[keyName] || [];
      watcher[keyName].push(options.watch[keyName]);
    }

    for(keyName in options.data){
      (((dataObj, keyName, template) => {
        Observer(
          dataObj,
          keyName,
          (newValue) => {
            template.bindData({
              [keyName]: newValue
            });
            runWatcher(keyName, newValue);
          }
        );
      })(options.data, keyName, template));
    }
  };

  const initDirective = () => {
    let directiveName = '';

    platformDirectives.forEach(directive => {
      Directive.define(directive);
    });

    for(directiveName in options.directives){
      Directive.define({
        name: directiveName,
        bind: ((bindCallback => (elem, args) => {
          bindCallback(elem, ...args);
        })(options.directives[directiveName].bind))
      });
    }

    Directive.render(options.el);
  };

  const initComponents = () => {
    let componentName = '';
    for(componentName in options.components){
      Component.define({
        name: componentName,
        template: options.components[componentName].template
      });
    }

    Component.render(options.el);
  };

  const init = () => {
    initTemplate();
    initWatch();
    initDirective();
    initComponents();
  };

  init(options);
}
