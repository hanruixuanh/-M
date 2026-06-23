(function(){
  var root=document.documentElement, LS=window.localStorage;
  function get(k,d){var v=LS.getItem(k);return v===null?d:v;}
  var sizes=[15,16,17,18,19,20,22,24,27];
  var fi=parseInt(get("ppm_fsize","3"),10); if(isNaN(fi))fi=3;
  root.setAttribute("data-theme", get("ppm_theme","white"));
  root.setAttribute("data-font",  get("ppm_font","serif"));
  if(get("ppm_sidebar","open")==="closed"){ root.classList.add("sidebar-closed"); }
  function applySize(){
    var els=document.getElementsByClassName("page-inner");
    for(var i=0;i<els.length;i++){ els[i].style.fontSize=sizes[fi]+"px"; }
  }
  window.PPM={
    toggleSidebar:function(){ root.classList.toggle("sidebar-closed");
      LS.setItem("ppm_sidebar", root.classList.contains("sidebar-closed")?"closed":"open"); },
    setTheme:function(t){ root.setAttribute("data-theme",t); LS.setItem("ppm_theme",t); },
    setFont:function(f){ root.setAttribute("data-font",f); LS.setItem("ppm_font",f); },
    incFont:function(d){ fi=Math.max(0,Math.min(sizes.length-1,fi+d)); LS.setItem("ppm_fsize",fi); applySize(); },
    togglePanel:function(e){ if(e){e.stopPropagation();}
      document.getElementById("fontPanel").classList.toggle("open"); }
  };
  document.addEventListener("DOMContentLoaded",function(){
    applySize();
    var act=document.querySelector(".sb-ch.active,.sb-part-link.active");
    if(act){ act.scrollIntoView({block:"center"}); }
    document.addEventListener("click",function(ev){
      var p=document.getElementById("fontPanel");
      if(p&&p.classList.contains("open")&&!ev.target.closest(".tb-font")){ p.classList.remove("open"); }
    });
    document.addEventListener("keydown",function(ev){
      if(ev.key==="ArrowLeft"){var a=document.querySelector(".nav-arrow.prev:not(.disabled)"); if(a)location.href=a.href;}
      if(ev.key==="ArrowRight"){var b=document.querySelector(".nav-arrow.next:not(.disabled)"); if(b)location.href=b.href;}
    });
  });
})();