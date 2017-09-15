var fgcolour="#FF8578"; 
var hlcolour="#DB7369"; 
var bgcolour="#B05C54"; 
var glcolour="#000000";
var speed=50; 
var delay=30; 
var alink=""; 

var w_txt, w_txl;
var w_flp=bgcolour;
var w_sty=Math.floor(Math.random()*8);
var w_cnt=-1;
var wipes=new Array();
var wrand=new Array();

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(fzzz);

function fzzz() { if (document.getElementById) {
  var i, wiper, wipei;
  wiper=document.getElementById("wipe");
  w_txt=wiper.firstChild.nodeValue;
  w_txl=w_txt.length;
  while (wiper.childNodes.length) wiper.removeChild(wiper.childNodes[0]);
  for (i=0; i<w_txl; i++) {
    wipei=document.createElement("span");
    wipei.appendChild(document.createTextNode(w_txt.charAt(i)));
    wipes[i]=wipei.style;
    wipes[i].textShadow=glcolour+" 0px 0px 5px";
    wipes[i].color=fgcolour;
    wiper.appendChild(wipei);
  }
  if (alink) {
    wiper.style.cursor="pointer";
    wiper.onclick=function() { top.location.href=alink; }
  }
  for (i=0; i<w_txl; i++) wrand[i]=i;
  wiper=setInterval("randwipe()", speed);
}}

function c(i, shade) {
  if (shade==bgcolour) wipes[i].textShadow="none";
  else wipes[i].textShadow=glcolour+" 0px 0px 5px";
  wipes[i].color=shade;
}

function randwipe() {
  var w_old;
  if (w_cnt++<w_txl+2+delay*(w_flp==fgcolour)) eval("wipe"+w_sty+"();");
  else {
    w_cnt=-1;
    w_flp=(w_flp==fgcolour)?bgcolour:fgcolour;
    w_old=w_sty;
    while (w_old==w_sty) w_sty=Math.floor(Math.random()*9);
  }
}

function dechex(dec) { return ((dec<16)?"0":"")+dec.toString(16); }

function wipe0() { 
  var half=Math.floor(w_txl/2);
  if (w_cnt<w_txl) {
    c(w_cnt, (w_cnt<half)?hlcolour:w_flp);
    c(w_txl-w_cnt-1, (w_cnt<half)?hlcolour:w_flp);
  }
}

function wipe1() { 
  var i, rand, temp;
  if (w_cnt==0) {
    for (i=0; i<w_txl; i++) {
      rand=Math.floor(Math.random()*w_txl);
      temp=wrand[i];
      wrand[i]=wrand[rand];
      wrand[rand]=temp;
    }
  }
  if (w_cnt<w_txl) c(wrand[w_cnt], hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(wrand[w_cnt-1], w_flp);
}

function wipe2() { 
  if (w_cnt<w_txl) c(w_cnt, hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(w_cnt-1, w_flp);
}

function wipe3() { 
  if (w_cnt<w_txl) c(w_txl-(w_cnt+1), hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(w_txl-w_cnt, w_flp);
}

function wipe4() { 
  if (w_cnt<w_txl) c(w_cnt, hlcolour);
  if (w_cnt>0 && w_cnt<w_txl+1) c(w_cnt-1, w_flp);
  if (w_cnt>1 && w_cnt<w_txl+2) c(w_cnt-2, hlcolour);
  if (w_cnt>2 && w_cnt<w_txl+3) c(w_cnt-3, (w_flp==fgcolour)?bgcolour:fgcolour);
  if (w_cnt==w_txl+2) w_flp=(w_flp==fgcolour)?bgcolour:fgcolour;
}

function wipe5() { 
  var i;
  if (w_cnt<w_txl+3) {
    var start=(w_flp==fgcolour)?bgcolour:fgcolour;
    var temp="#";
    for (i=1; i<6; i+=2) {
      var hex1=parseInt(start.substring(i,i+2),16);
      var hex2=parseInt(w_flp.substring(i,i+2),16);
      temp+=dechex(Math.floor(hex1+(hex2-hex1)*(w_cnt/(w_txl+2))));
    }
    for (i=0; i<w_txl; i++) c(i, temp);
  }
}

function wipe6() { 
  var i;
  if (w_cnt<6*Math.floor(w_txl/6)+3) {
    if (w_cnt%6==0 || w_cnt%6==3) for (i=0; i<w_txl; i++) c(i, hlcolour);
    else if (w_cnt%6==1) for (i=0; i<w_txl; i++) c(i, w_flp);
    else if (w_cnt%6==4) for (i=0; i<w_txl; i++) c(i, (w_flp==fgcolour)?bgcolour:fgcolour);
  }
}

function wipe7() { 
  var qtr=Math.floor(w_txl/4);
  if (w_cnt<qtr) {
    c(w_cnt, hlcolour);
    c(w_cnt+2*qtr, hlcolour);
  }
  else if (w_cnt<2*qtr) {
    c(w_cnt-qtr, w_flp);
    c(w_cnt+qtr, w_flp);
  }
  else if (w_cnt<3*qtr) {
    c(w_cnt-qtr, hlcolour);
    c(w_cnt+qtr, hlcolour);
  }
  else if (w_cnt<w_txl) {
    c(w_cnt-2*qtr, w_flp);
    c(w_cnt, w_flp);
  }
}

function wipe8() { 
  var half=Math.floor(w_txl/2);
  if (w_cnt<half) {
    c(w_cnt, hlcolour);
    c(w_txl-w_cnt-1, hlcolour);
  }
  else if (w_cnt<w_txl) {
    c(w_cnt-half, w_flp);
    c(w_txl+half-w_cnt-1, w_flp);
  }
}