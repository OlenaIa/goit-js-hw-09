!function(){var t=document.body,n=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");n.addEventListener("click",(function(){a||(a=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3))})),e.addEventListener("click",(function(){a&&(clearInterval(a),a=null)}));var a=null}();
//# sourceMappingURL=01-color-switcher.0f0116bb.js.map