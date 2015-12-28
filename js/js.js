particlesJS.load('duang', './js/pc.json', function() {
  console.log('每天都要萌萌哒~');
});
var tags=['技术宅','大学狗','小学生真是太棒了','小透明','萌萌哒','炮姐赛高','LL大法好','js大法好','中二病','非洲人','<del>Web全栈</del>','<del>可爱的</del>男孩子'];

var view=document.getElementsByTagName('body')[0],viewHeight=view.clientHeight,viewWidth=view.clientWidth,tagPointer=0;
const PADDING=100,MAX_FONT= 2,MIN_FONT=0.9,BLANK_CENTER=500;

for (var i= 0;i<tags.length;i++){
  var tag=tags[i];
  tags[i]=document.createElement("p");
  tags[i].innerHTML=tag;
  tags[i].className="tags";
  var xSeed=Math.round(Math.random());
  tags[i].style.left=Math.round(Math.random()*(viewWidth/2-PADDING-BLANK_CENTER/2))+(1-xSeed)*PADDING+xSeed*(viewWidth/2+BLANK_CENTER/2)+"px";
  tags[i].style.top=Math.round(Math.random()*(viewHeight-PADDING*2))+PADDING+"px";
  tags[i].style.fontSize=Math.round(Math.random()*(MAX_FONT-MIN_FONT))+MIN_FONT+"em";

}
console.log('Tags Get Daze√');
function Duang(){
  view.appendChild(tags[tagPointer]);
  if (tagPointer<tags.length-1){

    setTimeout(function () {
      tagPointer++;
      Duang();
    },100);
  }
}
Duang();

