{
    let fadeOutEle=(ele)=>{
        ele.classList.add('fade-out-animation');
        let afterOut=()=>{
            ele.classList.remove('fade-out-animation');
            ele.style.display='none';
            ele.removeEventListener("animationend",afterOut);
        };
        ele.addEventListener("animationend", afterOut)
    };

    let fadeInEle=(ele,dsp)=>{
        ele.removeAttribute('style');
        ele.style.display=dsp;
        ele.classList.add('fade-in-animation');
        let afterIn=()=>{
            ele.classList.remove('fade-in-animation');
            ele.removeEventListener("animationend",afterIn);
        };
        ele.addEventListener("animationend", afterIn)
    };


    window.onload=()=>{
        let loader=document.getElementsByClassName('loader')[0]
        fadeOutEle(loader);
    }
}