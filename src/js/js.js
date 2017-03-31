class Misaka {

  constructor(ele) {
    let makeIterator = (arr) => {
      if (arr.length) {
        arr[Symbol.iterator] = () => {
          let nextIndex = 0;
          return {
            next: function () {
              return nextIndex < arr.length ?
                {value: arr[nextIndex++]} :
                {done: true};
            }
          }
        }
      } else {
        arr = [arr];
      }
      return arr;

    };
    this[0] = makeIterator(ele);
    this.i18nList = {};


  }

  static ajax(option, cbk) {
    let xhr = new XMLHttpRequest();
    let pRes = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cbk(xhr.responseText);
        }
      }
    };
    xhr.open(option.method || 'get', option.url, true);
    xhr.onreadystatechange = pRes;
    xhr.send();

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

  i18n(lang) {
    lang = lang.toLowerCase();
    if (!this.i18nList[lang]) {
      Misaka.ajax({url: "./assets/i18n/" + lang + ".json"}, (txt) => {
        this.i18nList[lang] = JSON.parse(txt);
        for (let ele of this[0]) {
          ele.innerHTML = this.i18nList[lang][ele.getAttribute('data-i18n')] ? this.i18nList[lang][ele.getAttribute('data-i18n')] : ele.innerHTML;
        }
      });
    } else {
      for (let ele of this[0]) {
        ele.innerHTML = this.i18nList[lang][ele.getAttribute('data-i18n')] ? this.i18nList[lang][ele.getAttribute('data-i18n')] : ele.innerHTML;
      }
    }


  }


}

{

  let body = new Misaka(document.getElementsByTagName('body'));
  let loader = new Misaka(document.getElementsByClassName('loader'));
  let langDisplay = false;
  let myLinks = new Misaka(document.getElementsByClassName('my-link')).click((e) => {
    e.stopPropagation();
    e.preventDefault();
    body.fadeOut(() => {
      window.location.href = e.clicked.href;
    });
  });


  window.onload = () => {
    loader.fadeOut();

  };


}



