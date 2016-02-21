class Misaka{

    constructor(ele){
        let makeIterator = (arr) => {
            if (arr.length){
                arr[Symbol.iterator]= () => {
                    let nextIndex = 0;
                    return{
                        next: function(){
                            return nextIndex < arr.length ?
                            {value: arr[nextIndex++]} :
                            {done: true};
                        }
                    }
                }
            }else{
                arr[Symbol.iterator]= () => {
                    let nextIndex = 0;
                    return {
                        next: function () {
                            nextIndex += 1;
                            return nextIndex < 1 ?
                            {value: arr} :
                            {done: true};
                        }
                    }
                }
            }
            return arr;

        };
        this[0]=makeIterator(ele);
    }

    fadeOut(cbk){
        let fadeDone=0;
        let itemDone = () => {
            fadeDone++;
            if (fadeDone == this[0].length && cbk) cbk();
        };
        for (let ele of this[0]){
            ele.classList.add('fade-out-animation');
            let afterOut=()=>{
                ele.classList.remove('fade-out-animation');
                ele.style.display='none';
                ele.removeEventListener("animationend",afterOut);
                itemDone();
            };
            ele.addEventListener("animationend", afterOut)
        }
        return this;

    }

    fadeIn(cbk){
        let fadeDone=0;
        let itemDone = () => {
            fadeDone++;
            if (fadeDone == this[0].length && cbk) cbk();
        };
        for (let ele of this[0]){
            ele.removeAttribute('style');
            ele.style.display=dsp;
            ele.classList.add('fade-in-animation');
            let afterIn=()=>{
                ele.classList.remove('fade-in-animation');
                ele.removeEventListener("animationend",afterIn);
                itemDone();
            };
            ele.addEventListener("animationend", afterIn)
        }
        return this;
    }
    click(handler){
        for (let ele of this[0]){
            if (handler) {
                ele.addEventListener('click',(e) =>{
                    e.clicked=ele;
                    handler(e);
                });
            }else{
                ele.click();
            }
        }
        return this;
    }
    addClass(cls){
        for (let ele of this[0]){
           ele.classList.add(cls);
        }
        return this;
    }

    removeClass(cls){
        for (let ele of this[0]){
            ele.classList.remove(cls);
        }
        return this;
    }
    removeAllClass(){
        for (let ele of this[0]){
            ele.removeAttribute('class');
        }
        return this;
    }


}

{

    let body=new Misaka(document.getElementsByTagName('body'));
    let loader=new Misaka(document.getElementsByClassName('loader'));
    let myLinks=new Misaka(document.getElementsByClassName('my-link')).click((e)=>{
        e.stopPropagation();
        e.preventDefault();
        body.fadeOut(() => {
            window.location.href=e.clicked.href;
        });
    });



    let hashHandler = () =>{
        let hash=window.location.hash.substring(3);
        if (!hash){
            window.location.hash='#!/h';
        }
        switch (hash){
            case 'h':
                body.removeAllClass().addClass('home-showing');
                break;
            case 'i':
                body.removeAllClass().addClass('i-showing');
                break;
            case 's':
                body.removeAllClass().addClass('skill-showing');
                break;
            case 'l':
                body.removeAllClass().addClass('link-showing');
                break;
            case 'w':
                body.removeAllClass().addClass('work-showing');
                break;
            default:
                window.location.hash='#!/h';
                body.addClass('home-showing');
                break;

        }
    };
    window.onhashchange=hashHandler;


    window.onload=()=>{
        hashHandler();
        loader.fadeOut();

    };


}



