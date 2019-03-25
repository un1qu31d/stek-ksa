// function Slider(configuration) {
//   this.selector = configuration.selector;
//   this.selectors = {
//     slides: '.slides',
//     slide: '.slide'
//   }
//   this.class = {
//     in: 'status--in',
//     out: 'status--out'
//   };
// }
// Slider.prototype.timeOutFunction = function(callback) {
//   return window.setTimeout(callback, 3000);
// };
// Slider.prototype.getNextIndex = function(index) {
//   const plugin = this;
//   return ++index < plugin.slides.length ? index : 0;
// };
// Slider.prototype.getPreviousIndex = function(index) {
//   const plugin = this;
//   return --index >= 0 ? index : (plugin.slides.length-1);
// };
// Slider.prototype.active = function(index, previousIndex) {
//   const plugin = this;
//   plugin.index = index;
//   const slide = plugin.slides[index];
//   window.clearTimeout(plugin.timeOut);
//   plugin.slides.filter(slide => slide.classList.contains(plugin.class.out)).forEach(slide => {
//     slide.classList.remove(plugin.class.out);
//   });
//   plugin.slides.filter(slide => slide.classList.contains(plugin.class.in)).forEach(slide => {
//     slide.classList.remove(plugin.class.in);
//     slide.classList.add(plugin.class.out);
//   });
//   slide.classList.add(plugin.class.in);
//   Slider.prototype.timeOut = plugin.timeOutFunction(function() {
//     plugin.active(plugin.getNextIndex(index));
//   });
// };
// Slider.prototype.init = function() {
//   const plugin = this;
//   plugin.slides = [...plugin.selector.querySelector(plugin.selectors.slides).children];
//   plugin.active(0);
//   window.addEventListener('click', function(event) {
//     if (getParents(event.target, []).filter(element => {return element.classList.contains('next');}).length) {
//       plugin.active(plugin.getNextIndex(plugin.index));
//     }
//     if (getParents(event.target, []).filter(element => {return element.classList.contains('previous');}).length) {
//       plugin.active(plugin.getPreviousIndex(plugin.index));
//     }
//   });
// };
function Slider(configuration) {
  const plugin = this;
  plugin.selector = configuration.selector;
  plugin.selectors = {
    slides: '.slides',
    slide: '.slide'
  };
  plugin.classes = {
    controllers: 'controllers',
    next: 'next',
    previous: 'previous',
    transition: 'transition',
    active: 'active',
    start: 'start',
    end: 'end'
  };
  plugin.navigationAbility = true;
}
Slider.prototype.getActiveSlideIndex = function() {
  const plugin = this;
  return plugin.slides.indexOf(plugin.slides.filter(slide => slide.classList.contains(plugin.classes.active)).pop());
};
Slider.prototype.activeSlide = function(index, direction) {
  const plugin = this;
  plugin.navigationAbility = false;
  const activeSlides = plugin.slides.filter(slide => slide.classList.contains(plugin.classes.active));
  const from = direction === 'next' ? plugin.classes.start : plugin.classes.end;
  const to = direction === 'next' ? plugin.classes.end : plugin.classes.start;
  activeSlides.forEach(slide => {
    slide.classList.add(plugin.classes.transition);
    slide.classList.remove(plugin.classes.active);
    slide.classList.add(to);
  });
  plugin.slides[index].classList.add(from);
  window.getComputedStyle(plugin.slides[index]).getPropertyValue('transform');
  plugin.slides[index].classList.add(plugin.classes.transition);
  plugin.slides[index].classList.remove(from);
  plugin.slides[index].classList.add(plugin.classes.active);
  function transitionEndFunction(event) {
    activeSlides.forEach(slide => {
      slide.classList.remove(plugin.classes.transition);
      slide.classList.remove(to);
    });
    event.target.classList.remove(plugin.classes.transition);
    event.target.removeEventListener('transitionend', transitionEndFunction);
    plugin.navigationAbility = true;
  }
  plugin.slides[index].addEventListener('transitionend', transitionEndFunction);
};
Slider.prototype.next = function() {
  const plugin = this;
  if (plugin.navigationAbility) {
    const currentIndex = plugin.getActiveSlideIndex();
    let nextIndex = currentIndex;
    nextIndex = ++nextIndex < plugin.slides.length ? nextIndex : 0;
    if (currentIndex !== nextIndex) {
      plugin.activeSlide(nextIndex, 'next');
    }
  }
};
Slider.prototype.previous = function() {
  const plugin = this;
  if (plugin.navigationAbility) {
    const currentIndex = plugin.getActiveSlideIndex();
    let previousIndex = currentIndex;
    previousIndex = --previousIndex >= 0 ? previousIndex : (plugin.slides.length - 1);
    if (currentIndex !== previousIndex) {
      plugin.activeSlide(previousIndex, 'previous');
    }
  }
};
Slider.prototype.init = function() {
  const plugin = this;
  plugin.slides = [...plugin.selector.querySelectorAll(plugin.selectors.slide)];
  window.addEventListener('click', function(event) {
    if(selectorGEFELBCWISC(selectorSAEFTPU(event.target, []), plugin.classes.next, plugin.classes.controllers)) {
      plugin.next();
    }
    if(selectorGEFELBCWISC(selectorSAEFTPU(event.target, []), plugin.classes.previous, plugin.classes.controllers)) {
      plugin.previous();
    }
  });
};