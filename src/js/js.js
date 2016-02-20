{
    window.onload=()=>{
        let loader=document.getElementsByClassName('loader')[0]
        loader.classList.add('fade-animation');
        loader.addEventListener("animationend", ()=>{
            loader.style.display='none';
        })
    }
}