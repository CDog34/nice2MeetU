'use strict';
particlesJS.load('duang', './js/pc.json', function() {
  console.log('每天都要萌萌哒~');
});


var tags=['技术宅','大学狗','小学生真是太棒了','小透明','萌萌哒','炮姐赛高','LL大法好','js大法好','中二病','非洲人','<del>Web全栈</del>','<del>可爱的</del>男孩子'];

var view=document.getElementById('duang'),viewHeight=view.clientHeight,viewWidth=view.clientWidth,tagPointer=0;
const PADDING=100,MAX_FONT= 2,MIN_FONT=0.9,BLANK_CENTER=500;

function initTags(){
    for (var i= 0;i<tags.length;i++){
        var tag=tags[i];
        tags[i]=document.createElement("p");
        tags[i].innerHTML=tag;
        tags[i].className="tags";


    }
    console.log('Tags Ready');
}

function showTags(){
    function Duang(){
        var xSeed=Math.round(Math.random());
        tags[tagPointer].style.left=Math.round(Math.random()*(viewWidth/2-PADDING-BLANK_CENTER/2))+(1-xSeed)*PADDING+xSeed*(viewWidth/2+BLANK_CENTER/2)+"px";
        tags[tagPointer].style.top=Math.round(Math.random()*(viewHeight-PADDING*2))+PADDING+"px";
        tags[tagPointer].style.fontSize=Math.random()*(MAX_FONT-MIN_FONT)+MIN_FONT+"em";
        tags[tagPointer].style.opacity=0.5;
        view.appendChild(tags[tagPointer]);
        if (tagPointer<tags.length-1){

            setTimeout(function () {
                tagPointer++;
                Duang();
            },100);
        }else{
            tagPointer=0;
        }
    }
    Duang();
}
function removeTags(){
    for (let i=0;i<tags.length;i++){
        tags[i].style.opacity=0;
        tags[i].style.top=viewHeight+'px';
        setTimeout(function () {
            view.removeChild(tags[i]);
        },800);
    }
}


function carouselTags(t){
    removeTags();
    setTimeout(function () {
        showTags()
    },800);
   setTimeout(function () {
           window.requestAnimationFrame(carouselTags);
   },7000)

}
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function(){
            document.removeEventListener('DOMContentLoaded',this,false);
            fn();
        },false);
    }else if(document.attachEvent){
        document.attachEvent('onreadystatechange',function(){
            if(document.readyState=='complete'){
                document.detachEvent('onreadystatechange',this);
                fn();
            }
        });
    }
}
domReady(function () {
    initTags();
    showTags();
    setTimeout(function () {
        window.requestAnimationFrame(carouselTags);
    },7000);

});


