window.addEventListener('click', function(event) {
  if(selectorGEFELBCWISC(selectorSAEFTPU(event.target, []), 'header-switcher', 'header-switcher')) {
    document.querySelector('.component.type--header').classList.toggle('status--active-menu');
  }
});

window.addEventListener('click', function(event) {
  if(selectorGEFELBCWISC(selectorSAEFTPU(event.target, []), 'scroll-top-switcher', 'scroll-top-switcher')) {
    (function scrollUp(to, duration) {
      setTimeout(function() {
        document.querySelector('html').scrollTop = Math.max(document.querySelector('html').scrollTop + ((to - document.querySelector('html').scrollTop) / duration * 10), 0);
        if (document.querySelector('html').scrollTop > to) scrollUp(to, duration - 10);
      }, 10);
    })(0, 600);
  }
});

const sysMessages = [...document.querySelectorAll('.component.type--sys-messages')].map(element => new Messages({selector: element}));
sysMessages.forEach(messages => messages.init());

[...document.querySelectorAll('.component.type--newsletter .form')].forEach(form => {
  form.addEventListener('submit', function(event) {
    const elements = [
      {
        selector: form.querySelector('input[name="email"]'),
        rules: [
          {
            expression: new Function('value', 'return value'),
            message: {type: 'danger', title: language.newsletterFromInputEmailRequiredTitle, content: language.newsletterFromInputEmailRequiredContent}
          }
        ]
      }
    ];
    const messages = [];
    sysMessages.forEach(messages => messages.clear());
    elements.forEach(element => {
      element.selector.classList.remove('error');
    });
    elements.forEach(element => {
      element.rules.forEach(rule => {
        if(!rule.expression(element.selector.value)) {
          element.selector.classList.add('error');
          messages.push(rule.message);
        }
      });
    });
    messages.forEach(message => sysMessages.forEach(messages => messages.add(message.type, message.title, message.content)));
    messages.length && event.preventDefault();
  });
});

[...document.querySelectorAll('.component.type--slider')].map(element => new Slider({selector: element})).forEach(slider => slider.init());

[...document.querySelectorAll('.component.type--testimonials')].map(element => new SliderTestimonial({selector: element})).forEach(slider => slider.init());

const applicationFromMessages = [...document.querySelectorAll('.component.type--application-form-messages')].map(element => new Messages({selector: element}));
applicationFromMessages.forEach(messages => messages.init());

AOS.init();