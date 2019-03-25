function Messages(configuration) {
  const plugin = this;
  plugin.selector = configuration.selector;
  plugin.selectors = {
    messages: '.messages',
    message: '.message'
  };
  plugin.classes = {
    messages: 'messages',
    message: 'message',
    close: 'close'
  };
}
Messages.prototype.remove = function(message) {
  const plugin = this;
  message.remove();
};
Messages.prototype.clear = function() {
  const plugin = this;
  [...plugin.selector.querySelectorAll(plugin.selectors.message)].forEach(message => plugin.remove(message));
};
Messages.prototype.add = function(type, title, content) {
  const plugin = this;
  plugin.selector.querySelector(plugin.selectors.messages).innerHTML += `<div class="message ${type}">
    <div class="close"><i class="fas fa-times"></i></div>
    ${title && `<div class="title">${title}</div>`}
    ${content && `<div class="content">${content}</div>`}
  </div>`;
};
Messages.prototype.init = function() {
  const plugin = this;
  window.addEventListener('click', function(event) {
    if(selectorGEFELBCWISC(selectorSAEFTPU(event.target, []), plugin.classes.close, plugin.classes.messages)) {
      plugin.remove(selectorGEFELBCWISC(selectorSAEFTPU(event.target, []), plugin.classes.message, plugin.classes.messages));
    }
  });
};