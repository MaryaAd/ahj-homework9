const elementResizeEvent = require('element-resize-event');

export default class Collapse {
  constructor(element) {
    this.parent = element;
    this.button = this.parent.querySelector('.btn');
    this.container = this.parent.querySelector('.textholder');
    this.padding = 8;
    elementResizeEvent(this.container, () => {
      if (this.container.offsetHeight > 2) {
        this.container.classList.add('border');
      } else {
        this.container.classList.remove('border');
      }
      if (this.container.offsetHeight > this.padding + 2) {
        this.container.style.paddingTop = `${this.padding}px`;
        this.container.style.paddingButtom = `${this.padding}px`;
      } else {
        this.container.style.paddingTop = `${0}px`;
        this.container.style.paddingButtom = `${0}px`;
      }
    });
  }

  optionOne() {
    this.container.classList.remove('textholder-transition');
    this.container.classList.remove('textholder-second-state');
    this.button.addEventListener('click', () => {
      let start;
      let trigger;
      let progress;
      const textHolder = this.container;
      this.container.classList.remove('disabled');
      if (this.container.offsetHeight === 0) {
        trigger = 'grow';
      } else {
        trigger = 'shrink';
      }
      if (trigger === 'grow') {
        start = Date.now();
        this.container.style.height = '100%';
        const posMax = this.container.offsetHeight + 2 * this.padding;
        this.container.style.height = 0;
        window.requestAnimationFrame(function draw() {
          progress = (Date.now() - start) / 6;
          textHolder.style.height = `${progress}px`;
          if (progress <= posMax) {
            window.requestAnimationFrame(draw);
          }
        });
      } else if (trigger === 'shrink') {
        start = Date.now();
        const height = textHolder.offsetHeight;
        window.requestAnimationFrame(function draw() {
          const step = (Date.now() - start) / 6;
          if (height >= step) {
            progress = height - step;
            textHolder.style.height = `${progress}px`;
            window.requestAnimationFrame(draw);
          } else {
            textHolder.style.height = `${0}px`;
            textHolder.style.removeProperty('height');
            textHolder.classList.add('disabled');
          }
        });
      }
    });
  }

  optionTwo() {
    this.button.addEventListener('click', () => {
      this.container.classList.remove('disabled');
      this.container.classList.add('textholder-transition');
      let parentHeight = 0;
      setTimeout(() => {
        if (this.parent.offsetHeight < 80) {
          parentHeight = 2 * this.padding;
        }
        this.container.style.height = '100%';
        parentHeight += this.parent.offsetHeight;
        this.container.style.removeProperty('height');
        this.parent.style.height = `${parentHeight}px`;
        this.container.classList.toggle('textholder-second-state');
      }, 0);
    });
  }
}
