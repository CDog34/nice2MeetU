class Misaka {

  constructor(ele) {
    let collection2Array = (arr) => {
      if (arr instanceof HTMLCollection) {
        let res = [];
        for (let i = 0; i < arr.length; i++) {
          res.push(arr.item(i));
        }
        return res;
      } else {
        arr = [arr];
        return arr;
      }

    };
    this[0] = collection2Array(ele);
    this.i18nList = {};


  }


  getAnimationed() {
    let div = document.createElement('div'),
      style = div.style,
      animationNames = ['animation', 'WebkitAnimation', 'OAnimation', 'msAnimation', 'MozAnimation'],
      animationName = (() => {
        for (let key of animationNames) {
          if (style[key] !== undefined) return key;
        }
        return false;
      })(),
      aniEndName = {
        animation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
        OAnimation: 'oAnimationEnd',
        msAnimation: 'MSAnimationEnd',
        MozAnimation: 'mozAnimationEnd'
      }[animationName];
    div = style = animationNames = animationName = null;
    return aniEndName;
  }

  fadeOut(cbk) {
    let fadeDone = 0;

    let itemDone = () => {

      fadeDone++;
      if (fadeDone === this[0].length && cbk) cbk();
    };
    for (let ele of this[0]) {

      ele.classList.add('fade-out-animation');
      let afterOut = () => {

        ele.classList.remove('fade-out-animation');
        ele.style.display = 'none';
        ele.removeEventListener(this.getAnimationed(), afterOut);
        itemDone();
      };
      ele.addEventListener(this.getAnimationed(), afterOut);
    }
    return this;

  }

  fadeIn(cbk) {
    let fadeDone = 0;
    let itemDone = () => {
      fadeDone++;
      if (fadeDone === this[0].length && cbk) cbk();
    };
    for (let ele of this[0]) {
      ele.removeAttribute('style');
      ele.style.display = 'block';
      ele.classList.add('fade-in-animation');

      let afterIn = () => {
        ele.classList.remove('fade-in-animation');
        ele.removeEventListener(this.getAnimationed(), afterIn);
        itemDone();
      };
      ele.addEventListener(this.getAnimationed(), afterIn)
    }
    return this;
  }

  click(handler) {
    for (let ele of this[0]) {
      if (handler) {
        ele.addEventListener('click', (e) => {
          e.clicked = ele;
          handler(e);
        });
      } else {
        ele.click();
      }
    }
    return this;
  }

  addClass(cls) {
    for (let ele of this[0]) {
      ele.classList.add(cls);
    }
    return this;
  }

  toggleClass(cls) {
    for (let ele of this[0]) {
      ele.classList.toggle(cls);
    }
    return this;
  }

  removeClass(cls) {
    for (let ele of this[0]) {
      ele.classList.remove(cls);
    }
    return this;
  }

  removeAllClass() {
    for (let ele of this[0]) {
      ele.removeAttribute('class');
    }
    return this;
  }

}