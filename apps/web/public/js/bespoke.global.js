(function(){"use strict";var n=function n(n){var e;return(e=n.getAttribute("src"))===null||e===void 0?void 0:e.includes(o)};var e,i;var o="http://localhost:3000",t="http://localhost:4000";var s=null,r=document.getElementsByTagName("script");for(var a=0;a<r.length;++a){var l=r[a];l&&n(l)&&(s=r[a])}var c=(e=s)===null||e===void 0?void 0:e.getAttribute("src"),d=(i=c)===null||i===void 0?void 0:i.split("?")[1],p=new URLSearchParams(d),u=p.get("businessId"),v=new URL("".concat(t,"/store/signup-form"));u&&v.searchParams.set("businessId",u);fetch(v).then(function(n){n.json().then(function(n){var e=true,i=false,o=undefined;try{for(var t=n[Symbol.iterator](),s;!(e=(s=t.next()).done);e=true){var r=s.value;m(r)}}catch(n){i=true;o=n}finally{try{if(!e&&t.return!=null){t.return()}}finally{if(i){throw o}}}})}).catch(function(n){return console.log("fetch error",JSON.stringify(n))});var m=function(n){var e,i,o,t,s,r,a,l,c,d;var p='\n<div class="bespoke-signupform" id="'.concat(n.id,'" style="position: fixed; left: 0px; top: 0px; display: none;">\n  <div class="bespoke-signupform-container">\n    <div class="bespoke-signupform-content">\n      <div class="bespoke-signupform-iframe-scalar">\n        <iframe class="bespoke-signupform-iframe" id="bespoke-signupform-').concat(n.id,'"\n          title="').concat(n.name,'"\n          frameborder="0"\n          scrolling="no"\n          allowtransparency="true">\n        </iframe>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="bespoke-signupform" id="').concat(n.id,'-success" style="position: fixed; left: 0px; top: 0px; display: none;">\n  <div class="bespoke-signupform-container">\n    <div class="bespoke-signupform-content">\n      <div class="bespoke-signupform-iframe-scalar">\n        <iframe class="bespoke-signupform-iframe" id="bespoke-signupform-').concat(n.id,'-success"\n          title="').concat(n.name,'"\n          frameborder="0"\n          scrolling="no"\n          allowtransparency="true">\n        </iframe>\n      </div>\n    </div>\n  </div>\n</div>\n'),u='\n<style type="text/css">\n.bespoke-signupform .bespoke-signupform-iframe {\n    opacity: 1 !important;\n    visibility: visible !important;\n    position: absolute !important;\n    display: block;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height:100vh;\n}\n.bespoke-signupform-iframe-scaler {\n    width: 100%;\n    height: 0;\n    overflow: hidden;\n    display: block;\n    line-height: 0;\n}\n\n.bespoke-signupform-content {\n    line-height: 0;\n    width: 100%;\n    height: 100%;\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 0 auto;\n    text-align: left;\n    z-index: 10100000006;\n}\n\n.bespoke-signupform .bespoke-signupform-container {\n    text-align: center;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    padding: 0;\n    box-sizing: border-box;\n    display: block;\n}\n.bespoke-signupform {\n    overflow-y: auto;\n    overflow-x: hidden;\n    width: 100%;\n    height: 100%;\n    outline: none !important;\n    display: block;\n    z-index: 10100000005;\n}\n</style>\n<script type="text/javascript">\n'.concat(n.scriptJavascript,'\n</script>\n<script type="module">\n').concat(n.scriptModule,"\n</script>"),v=document.createRange().createContextualFragment(u);document.head.append(v);var m=document.createElement("div");m.innerHTML=p,document.body.append(m);var f=document.getElementById("bespoke-signupform-".concat(n.id)),g=document.getElementById("bespoke-signupform-".concat(n.id,"-success")),b=f.contentDocument||((e=f.contentWindow)===null||e===void 0?void 0:e.document);(i=b)===null||i===void 0?void 0:i.open(),(t=b)===null||t===void 0?void 0:t.write((o=n.form)===null||o===void 0?void 0:o.html),(s=b)===null||s===void 0?void 0:s.close();var h=g.contentDocument||((r=g.contentWindow)===null||r===void 0?void 0:r.document);(a=h)===null||a===void 0?void 0:a.open(),(c=h)===null||c===void 0?void 0:c.write((l=n.success)===null||l===void 0?void 0:l.html),(d=h)===null||d===void 0?void 0:d.close()}})();