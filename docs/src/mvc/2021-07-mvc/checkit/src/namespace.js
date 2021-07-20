const checkit = {
  trim: (str) => {
    return str.replace(/^\s+|\s+$/g, '');
  },
  TodoTemplate: `<li class="Todo">
    <span class="checkbox"></span>
    <span class="content"></span>
  </li>`,
  escapeHTML: (str) => {
    return str.replace('&', '&amp;').replace('<', '&lt;');
  }
};
