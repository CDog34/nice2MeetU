'use strict';
particlesJS.load('duang', 'assets/pc.json');

class tagSlide{




    constructor(option){
        this.PADDING=option.PADDING || 100;
        this.MAX_FONT= option.PADDING || 2;
        this.MIN_FONT=option.PADDING || 0.9;
        this.BLANK_CENTER=option.PADDING || 500;
        this.stage=document.getElementById('duang');
        this.initStage();
        this.initTags(option.tags);
        this.showTags();
        setTimeout(() => {
            window.requestAnimationFrame(()=>{
                this.carouselTags()
            });
        },7000);
        window.addEventListener('resize',()=>{
            this.initStage();
        })

    }

    initStage(){
        this.stageHeight=this.stage.clientHeight;
        this.stageWidth=this.stage.clientWidth;
    }

    initTags(tags){
        this.tags=[];
        for (let tag of tags){
            let tmp=document.createElement("p");
            tmp.innerHTML=tag;
            tmp.className="tags";
            this.tags.push(tmp)
        }
    }

    showTags(){
        let tagPointer=0;
        let Duang=()=>{
            let xSeed=Math.round(Math.random());
            this.tags[tagPointer].style.left=Math.round(Math.random()*(this.stageWidth/2-this.PADDING-this.BLANK_CENTER/2))+(1-xSeed)*this.PADDING+xSeed*(this.stageWidth/2+this.BLANK_CENTER/2)+"px";
            this.tags[tagPointer].style.top=Math.round(Math.random()*(this.stageHeight-this.PADDING*2))+this.PADDING+"px";
            this.tags[tagPointer].style.fontSize=Math.random()*(this.MAX_FONT-this.MIN_FONT)+this.MIN_FONT+"em";
            this.tags[tagPointer].style.opacity=0.5;
            this.stage.appendChild(this.tags[tagPointer]);
            if (tagPointer<this.tags.length-1){

                setTimeout(() => {
                    tagPointer++;
                    Duang();
                },100);
            }else{
                tagPointer=0;
            }
        }
        Duang();
    }

    removeTags(){
        for (let tag of this.tags){
            tag.style.opacity=0;
            tag.style.top=this.stageHeight+'px';
            setTimeout(() => {
                this.stage.removeChild(tag);
            },800);
        }
    }


    carouselTags(){
        this.removeTags();
        setTimeout(() => {
            this.showTags()
        },800);
        setTimeout(() => {
            window.requestAnimationFrame(() => {
                this.carouselTags()
            });
        },7000)

    }

}



