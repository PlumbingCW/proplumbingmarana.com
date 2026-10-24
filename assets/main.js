(function(){
  "use strict";
  var doc=document, root=doc.documentElement;
  var drawer=doc.getElementById("mobDrawer");
  var overlay=doc.querySelector(".mob-overlay");
  var toggle=doc.querySelector(".nav-toggle");
  function setOpen(open){
    if(!drawer) return;
    drawer.classList.toggle("open",open);
    drawer.setAttribute("aria-hidden",open?"false":"true");
    if(overlay){overlay.hidden=!open;}
    if(toggle){toggle.setAttribute("aria-expanded",open?"true":"false");}
    root.style.overflow=open?"hidden":"";
  }
  if(toggle){toggle.addEventListener("click",function(){setOpen(true);});}
  doc.querySelectorAll("[data-close]").forEach(function(el){el.addEventListener("click",function(){setOpen(false);});});
  if(drawer){drawer.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){setOpen(false);});});}
  doc.addEventListener("keydown",function(e){if(e.key==="Escape"){setOpen(false);}});
  var mq=window.matchMedia("(min-width: 769px)");
  function onMq(){if(mq.matches){setOpen(false);}}
  if(mq.addEventListener){mq.addEventListener("change",onMq);}else if(mq.addListener){mq.addListener(onMq);}
  // FAQ accordion (max-height toggle)
  doc.querySelectorAll(".faq-q").forEach(function(btn){
    btn.addEventListener("click",function(){
      var panel=doc.getElementById(btn.getAttribute("aria-controls"));
      var open=btn.getAttribute("aria-expanded")==="true";
      btn.setAttribute("aria-expanded",open?"false":"true");
      if(panel){panel.style.maxHeight=open?"0px":panel.scrollHeight+"px";}
    });
  });
  window.addEventListener("resize",function(){
    doc.querySelectorAll(".faq-q[aria-expanded='true']").forEach(function(b){
      var p=doc.getElementById(b.getAttribute("aria-controls"));if(p){p.style.maxHeight=p.scrollHeight+"px";}
    });
  });
  // hide the floating call button while the footer is visible
  var fab=doc.querySelector(".float-call"), foot=doc.querySelector(".site-footer");
  if(fab && foot && "IntersectionObserver" in window){
    new IntersectionObserver(function(es){es.forEach(function(e){fab.classList.toggle("hide",e.isIntersecting);});},{threshold:0.05}).observe(foot);
  }
})();
