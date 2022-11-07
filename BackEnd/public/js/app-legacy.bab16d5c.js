(function(){"use strict";var e={7918:function(e,t,n){n(6992),n(8674),n(9601),n(7727);var r=n(144),o=n(7524),i=n(680),u=n(2102),a=n(899),c=n(6428),s=n(7877),f=n(2877),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(o.Z,[n(s.Z,[n("router-view")],1),n(a.Z,{attrs:{color:"272727",padless:""}},[n(f.Z,{attrs:{justify:"center","no-gutters":""}},[e._l(e.iconos,(function(t){return n(i.Z,{key:t,staticClass:"my-2",attrs:{color:"white",text:"",rounded:"",icon:""}},[n(c.Z,{attrs:{size:"24px"}},[e._v(e._s(t))])],1)})),n(u.Z,{staticClass:"grey py-4 text-center white--text",attrs:{cols:"12"}},[e._v(" "+e._s((new Date).getFullYear())+" — "),n("strong",[e._v("Utal")])])],2)],1)],1)},d=[],p={data:function(){return{}}},m=p,h=n(1001),v=(0,h.Z)(m,l,d,!1,null,null,null),b=v.exports,g=(n(1539),n(8783),n(3948),n(8345));r.Z.use(g.Z);var y=[{path:"/",name:"login",component:function(){return Promise.all([n.e(237),n.e(800),n.e(443)]).then(n.bind(n,3444))}},{path:"/visualizarTemas",name:"visualizarTemas",component:function(){return Promise.all([n.e(237),n.e(800),n.e(443)]).then(n.bind(n,9792))}},{path:"/solicitudmemoria",name:"solicitudmemoria",component:function(){return Promise.all([n.e(237),n.e(563)]).then(n.bind(n,6142))}},{path:"/profesor",name:"Profesor",component:function(){return Promise.all([n.e(237),n.e(800),n.e(168)]).then(n.bind(n,9168))}},{path:"/Alumno",name:"Alumno",component:function(){return Promise.all([n.e(237),n.e(800),n.e(856)]).then(n.bind(n,856))}},{path:"/directora",name:"directora",component:function(){return Promise.all([n.e(237),n.e(800),n.e(873)]).then(n.bind(n,873))}}],w=new g.Z({routes:y}),Z=w,O=n(629);r.Z.use(O.ZP);var P=new O.ZP.Store({state:{visibilidadheader:!1,visibilidadfooter:!1},getters:{},mutations:{},actions:{},modules:{}}),k=n(9669),j=n.n(k),x=n(2346),C=n(9132);r.Z.use(C.Z);var E=new C.Z({});r.Z.use(x.Z,j()),r.Z.config.productionTip=!1,j().defaults.baseURL="http://localhost:3000/api",new r.Z({router:Z,store:P,vuetify:E,render:function(e){return e(b)}}).$mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,loaded:!1,exports:{}};return e[r](i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,r,o,i){if(!r){var u=1/0;for(f=0;f<e.length;f++){r=e[f][0],o=e[f][1],i=e[f][2];for(var a=!0,c=0;c<r.length;c++)(!1&i||u>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(a=!1,i<u&&(u=i));if(a){e.splice(f--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+({443:"about",563:"about2"}[e]||e)+"-legacy."+{168:"06456dd7",237:"4e1a1948",443:"bc2c4c09",563:"5a871323",800:"ba688333",856:"c70dc136",873:"d7a57b9d"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+({443:"about",563:"about2"}[e]||e)+"."+{168:"e76f4b02",443:"67ef2c1f",563:"f3fd5bef",800:"24679bee"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="fronted:";n.l=function(r,o,i,u){if(e[r])e[r].push(o);else{var a,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),f=0;f<s.length;f++){var l=s[f];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+i){a=l;break}}a||(c=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+i),a.src=r),e[r]=[o];var d=function(t,n){a.onerror=a.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var u=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=u,c.request=a,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=i,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++){o=u[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var u=n.miniCssF(r),a=n.p+u;if(t(u,a))return o();e(r,a,o,i)}))},o={143:0};n.f.miniCss=function(e,t){var n={168:1,443:1,563:1,800:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else if(800!=t){var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var u=n.p+n.u(t),a=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),u=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+u+")",a.name="ChunkLoadError",a.type=i,a.request=u,o[1](a)}};n.l(u,c,"chunk-"+t,t)}else e[t]=0},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,u=r[0],a=r[1],c=r[2],s=0;if(u.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var f=c(n)}for(t&&t(r);s<u.length;s++)i=u[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(f)},r=self["webpackChunkfronted"]=self["webpackChunkfronted"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(7918)}));r=n.O(r)})();
//# sourceMappingURL=app-legacy.bab16d5c.js.map