(function(t){function e(e){for(var n,i,c=e[0],s=e[1],l=e[2],u=0,d=[];u<c.length;u++)i=c[u],r[i]&&d.push(r[i][0]),r[i]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);m&&m(e);while(d.length)d.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,i=1;i<a.length;i++){var c=a[i];0!==r[c]&&(n=!1)}n&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},i={app:0},r={app:0},o=[];function c(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-c09ff5b6":"ea2fb6f9","chunk-203c0bcb":"21322353","chunk-182cd121":"877f8288","chunk-2cbfeab0":"badab883","chunk-31b06417":"f277e2ce","chunk-44715deb":"0d5e9425","chunk-50ded482":"235841c8","chunk-b1b6f392":"1947a44a"}[t]+".js"}function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(t){var e=[],a={"chunk-182cd121":1,"chunk-2cbfeab0":1,"chunk-31b06417":1,"chunk-44715deb":1,"chunk-50ded482":1,"chunk-b1b6f392":1};i[t]?e.push(i[t]):0!==i[t]&&a[t]&&e.push(i[t]=new Promise(function(e,a){for(var n="css/"+({}[t]||t)+"."+{"chunk-c09ff5b6":"31d6cfe0","chunk-203c0bcb":"31d6cfe0","chunk-182cd121":"a9352fcc","chunk-2cbfeab0":"955ad712","chunk-31b06417":"b489b910","chunk-44715deb":"341558c3","chunk-50ded482":"6dd41b1c","chunk-b1b6f392":"8cac60b1"}[t]+".css",r=s.p+n,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var l=o[c],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===r))return e()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){l=d[c],u=l.getAttribute("data-href");if(u===n||u===r)return e()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=e,m.onerror=function(e){var n=e&&e.target&&e.target.src||r,o=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete i[t],m.parentNode.removeChild(m),a(o)},m.href=r;var h=document.getElementsByTagName("head")[0];h.appendChild(m)}).then(function(){i[t]=0}));var n=r[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise(function(e,a){n=r[t]=[e,a]});e.push(n[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=c(t),l=function(e){u.onerror=u.onload=null,clearTimeout(d);var a=r[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+n+": "+i+")");o.type=n,o.request=i,a[1](o)}r[t]=void 0}};var d=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var m=u;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0706":function(t,e,a){"use strict";e["a"]={HOME:"home",IOT:"iot",FARMING:"farming",PLANT:"plant",WAREHOUSE:"warehouse",ORIGIN:"origin"}},"1a1e":function(t,e,a){"use strict";e["a"]={mapStyle:"amap://styles/darkblue",fm1MarkerImgUrl:{normal:"./images/fm1.png",active:"./images/fm1_active.png"},fm2MarkerImgUrl:{normal:"./images/fm2.png",active:"./images/fm2_active.png"},gunMarkerImgUrl:{normal:"./images/gun.png",active:"./images/gun_active.png"},wfMarkerImgUrl:{normal:"./images/wf.png",active:"./images/wf_active.png"},sphereMarkerImgUrl:{normal:"./images/sphere.png",active:"./images/sphere_active.png"},photoMarkerImgUrl:{normal:"./images/360.png",active:"./images/360_active.png"},iotMonitorMap:{center:[117.8689366,27.658368],zoom:14},proxyUrl:"https://proxy.yufengtek.com/",baseUrl:"https://tea.yufengtek.com/tea-IIS-Web",socketUrl:"wss://tea.yufengtek.com/tea-IIS-Web/myHandler"}},"2b2a":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("5c07"),a("53da"),a("2556"),a("d0f8");var n=a("6e6d"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.winHeight+"px"},attrs:{id:"app"}},[a("Sky"),a("NavMenu"),a("router-view",{style:{height:t.pageHeight+"px"}}),a("Spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]})],1)},r=[],o=a("3f47"),c=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"spinner-wrap"},[a("div",{staticClass:"spinner"},[a("div",{staticClass:"spinner-container container1"},[a("div",{staticClass:"circle1"}),a("div",{staticClass:"circle2"}),a("div",{staticClass:"circle3"}),a("div",{staticClass:"circle4"})]),a("div",{staticClass:"spinner-container container2"},[a("div",{staticClass:"circle1"}),a("div",{staticClass:"circle2"}),a("div",{staticClass:"circle3"}),a("div",{staticClass:"circle4"})]),a("div",{staticClass:"spinner-container container3"},[a("div",{staticClass:"circle1"}),a("div",{staticClass:"circle2"}),a("div",{staticClass:"circle3"}),a("div",{staticClass:"circle4"})])])])}],l=a("17cc"),u={},d=Object(l["a"])(u,c,s,!1,null,null,null),m=d.exports,h=a("52c1"),f=a("eb57"),_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav-menu"},[t._m(0),a("ul",{staticClass:"menu"},[a("router-link",{attrs:{tag:"li",to:{name:"home"}}},[t._v("智慧全息")]),a("router-link",{attrs:{tag:"li",to:{name:"iot"}}},[t._v("物联监控")]),a("router-link",{attrs:{tag:"li",to:{name:"plant"}}},[t._v("种植分布")]),a("router-link",{attrs:{tag:"li",to:{name:"farming"}}},[t._v("农事活动")]),a("router-link",{attrs:{tag:"li",to:{name:"warehouse"}}},[t._v("出库入库")]),a("router-link",{attrs:{tag:"li",to:{name:"origin"}}},[t._v("溯源数据")])],1),a("AppTitle")],1)},p=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logo"},[a("div",[t._v("智所未见 尽在未来")])])}],T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-title"},[a("canvas",{ref:"bg"}),a("h3",[t._v("武夷山市智慧茗园数据平台")])])},A=[],E=a("96f8"),g=a.n(E),v={name:"app-title",mounted:function(){var t=this;t.$nextTick(function(){t.draw(),window.addEventListener("resize",t.draw)})},methods:{draw:function(){var t=this,e=window.getComputedStyle(t.$el,null),a=g()(e.width),n=g()(e.height);if(isNaN(a)||isNaN(n))setTimeout(function(){t.draw()},1e3);else{var i=t.$refs.bg;i.width=a,i.height=n;var r=i.getContext("2d"),o=a-2,c=n-1;r.clearRect(0,0,a,n),r.beginPath(),r.strokeStyle="rgba(53, 121, 255, 0.25)",r.lineWidth=2,r.moveTo(o,c),r.lineTo(24,c),r.lineTo(0,49.5),r.stroke(),r.beginPath(),r.lineWidth=4,r.moveTo(19,c-9),r.lineTo(o,c-9),r.stroke(),r.beginPath(),r.lineWidth=6,r.moveTo(0,c-1),r.lineTo(6,c-1),r.stroke()}}},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.draw)}},b=v,O=Object(l["a"])(b,T,A,!1,null,null,null),I=O.exports,S={name:"NavMenu",components:{AppTitle:I}},D=S,w=Object(l["a"])(D,_,p,!1,null,null,null),R=w.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("canvas",{staticClass:"app-bg"})},y=[],F=(a("244e"),a("eb12")),N=a("ba94"),G=100;function k(t,e){if(arguments.length<2&&(e=t,t=0),t>e){var a=e;e=t,t=a}return Math.floor(Math.random()*(e-t+1))+t}function H(t,e){var a=Math.max(t,e),n=Math.round(Math.sqrt(a*a+a*a));return n/2}var P,U=function(){function t(e,a,n,i,r){Object(F["a"])(this,t),this.ctx=n,this.ctx2=i,this.canvas2=r,this.orbitRadius=k(H(e,a)),this.radius=k(60,this.orbitRadius)/15,this.radius>19&&(this.radius=19),this.orbitX=e/2,this.orbitY=a/2,this.timePassed=k(0,G),this.speed=k(this.orbitRadius)/8e5,this.alpha=k(2,10)/10}return Object(N["a"])(t,[{key:"draw",value:function(){var t=Math.sin(this.timePassed)*this.orbitRadius+this.orbitX,e=Math.cos(this.timePassed)*this.orbitRadius+this.orbitY;this.ctx.globalAlpha=this.alpha,this.ctx.drawImage(this.canvas2,t-this.radius/2,e-this.radius/2,this.radius,this.radius),this.timePassed+=this.speed}}]),t}(),M=window,L={data:function(){return{stars:[],ctx:null,hue:0,w:0,h:0,requestId:null}},created:function(){console.log(M.requestAnimationFrame),M.requestAnimationFrame=M.requestAnimationFrame||M.webkitRequestAnimationFrame||M.mozRequestAnimationFrame||M.msRequestAnimationFrame,M.cancelAnimationFrame=M.cancelAnimationFrame||M.webkitCancelAnimationFrame||M.mozCancelAnimationFrame||M.msCancelAnimationFrame},mounted:function(){var t=this;t.$nextTick(function(){var e=t.$el;t.ctx=e.getContext("2d"),t.draw()}),M.addEventListener("resize",t.doResize)},methods:{doResize:function(){var t=this;t.requestId&&M.cancelAnimationFrame(t.requestId),t.ctx.clearRect(0,0,t.w,t.h),t.draw()},draw:function(){var t=this,e=t.$el,a=t.ctx,n=t.w=e.width=window.innerWidth,i=t.h=e.height=window.innerHeight,r=t.hue=217,o=680,c=document.createElement("canvas"),s=c.getContext("2d");c.width=100,c.height=100;var l=c.width/2,u=s.createRadialGradient(l,l,0,l,l,l);u.addColorStop(.025,"#fff"),u.addColorStop(.1,"hsl("+r+", 61%, 33%)"),u.addColorStop(.25,"hsl("+r+", 64%, 6%)"),u.addColorStop(1,"transparent"),s.fillStyle=u,s.beginPath(),s.arc(l,l,l,0,2*Math.PI),s.fill(),t.stars=[];for(var d=0;d<o;d++)t.stars.push(new U(n,i,a,s,c));t.animation()},animation:function(){var t=this,e=t.ctx;e.globalCompositeOperation="source-over",e.globalAlpha=.8,e.fillStyle="hsla("+t.hue+", 64%, 6%, 0.9)",e.fillRect(0,0,t.w,t.h),e.globalCompositeOperation="lighter";for(var a=1,n=t.stars.length;a<n;a++)t.stars[a].draw();t.requestId=M.requestAnimationFrame(t.animation)}},beforeDestroy:function(){var t=this;t.requestId&&M.cancelAnimationFrame(t.requestId),window.removeEventListener("onresize",t.doResize)}},x=L,j=Object(l["a"])(x,C,y,!1,null,null,null),W=j.exports,Y={name:"app",components:{Spinner:m,NavMenu:R,Sky:W},data:function(){return{}},computed:Object(o["a"])({},Object(h["c"])(["loading","winHeight","screenFullState"]),{pageHeight:function(){var t=this.$store.state,e=t.winHeight-105;return e>540?e:540}}),created:function(){var t=this,e=t.$store,a=window;a.addEventListener("resize",function(){e.commit(f["a"].GET_WINDOW_SIZE)}),e.commit(f["a"].GET_WINDOW_SIZE)}},q=Y,V=(a("5c0b"),Object(l["a"])(q,i,r,!1,null,null,null)),z=V.exports,$=(a("3a23"),a("b89d")),K=window,B=document,Z=(P={},Object($["a"])(P,f["a"].SWITCH_LOADING,function(t,e){t.loading=e}),Object($["a"])(P,f["a"].SWITCH_SCREEN_FULL,function(t,e){t.screenFullState=e}),Object($["a"])(P,f["a"].GET_WINDOW_SIZE,function(t){t.winHeight=B.documentElement.clientHeight||K.innerHeight,t.winWidth=B.documentElement.clientWidth||K.innerWidth,B.body.style.minHeight=t.winHeight+"px";var e=t.windowResizeState+1;e=e>99999?1:e,t.windowResizeState=e}),Object($["a"])(P,f["a"].SET_CURR_ROUTER,function(t,e){var a=t.currRouter;a.from=e.from,a.to=e.to,a.query=e.query,a.instance=e.instance,a.to||(t.loading=!1,t.screenFullState=!1)}),P),J=a("0706"),Q=(a("44a2"),a("ab56"),a("3f46")),X=a.n(Q),tt=a("7f43"),et=a.n(tt),at=a("1a1e"),nt=a("0e4f");et.a.defaults.baseURL="",et.a.interceptors.request.use(function(t){return t},function(t){return X.a.reject(t)}),et.a.interceptors.response.use(function(t){return X.a.resolve(t)},function(t){return X.a.reject(t)});var it,rt,ot,ct,st,lt,ut,dt,mt,ht=function(t){return/post/i.test(t.method)&&!t.headers&&(t.headers={"Content-Type":"application/x-www-form-urlencoded"},t.data=nt.stringify(t.data)),/json/.test(t.url)||(t.url=at["a"].baseUrl+t.url),new X.a(function(e,a){et.a.request(t).then(function(t){e(t.data)},function(t){a(t)})})},ft=Object($["a"])({},f["a"].HOME_GET_AMOUNT_RANK_DATA,function(t,e){var a=e?{addr:e||""}:"",n=t.state;ht({url:"/bigdata/home/detail",method:"post",data:a}).then(function(t){if(200==t.code){var e=t.repData;n.amountRankDatas=e.planting.sort(function(t,e){return t.area>e.area?1:-1}),n.farmingActdatas=e.fertiliz.map(function(t){return{label:t.month,value:t.weight}}),n.pickDatas=t.repData.picking.map(function(t){return{label:t.classify,value:t.amount}}),n.teaTotalAmount=null==e.totalPicking||0==e.totalPicking.length?n.teaTotalAmount:e.totalPicking;var a={};a.in=0==e.inStock.length?n.warehouseDatas.in:e.inStock,a.out=0==e.inStock.length?n.warehouseDatas.out:e.outStock,n.warehouseDatas=a,n.cityDatas=e.origin.map(function(t){return{value:t.counts,name:t.cityname}}),n.cameraAmount=e.cameraCount.count,n.monitorAmount=e.fielddstation.count,n.waterFertilizerAmount=0,n.levelDatas=e.craft}})}),_t=(it={},Object($["a"])(it,f["a"].HOME_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(it,f["a"].HOME_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),it),pt={namespaced:!0,state:{cameraAmount:0,monitorAmount:0,waterFertilizerAmount:0,farmingActdatas:[],pickDatas:[],teaTotalAmount:"",levelDatas:[],amountRankUnit:"亩",amountRankDatas:[],warehouseUnit:"吨",warehouseDatas:[],cityDatas:[],currSelectedRegion:"",amountRankFullState:!1,farmingInfoFullState:!1,pickInfoFullState:!1,warehouseFullState:!1,originDataFullState:!1,levelInfoFullState:!1,mapFullState:!1},actions:ft,mutations:_t},Tt=(a("f91a"),a("48fb"),a("4ccc"),a("612f"),a("0b9e"),rt={},Object($["a"])(rt,f["a"].CHANGE_ACTIVE_IOT_TYPE,function(t,e){var a=t.state,n=a.iotDatas;if("camera"==e){for(var i=0,r=null,o=0;o<n.length;o++)if(r=n[o],"1"==r.camera_type){i=o;break}r&&(t.state.camera=r,t.commit(f["a"].CHANGE_ACTIVE_MARKER,{id:i,type:f["a"].IOT_TYPE_GUN}),t.dispatch(f["a"].GET_GUN_DATA,r))}else n.length&&(t.dispatch(f["a"].GET_FM1_DATA,n[0].sno),t.commit(f["a"].CHANGE_ACTIVE_MARKER,{id:0,type:f["a"].IOT_TYPE_FM1}))}),Object($["a"])(rt,f["a"].GET_IOT_DATA,function(t,e){var a=t.state;ht({url:"/data/monitor/selectStation",method:"post"}).then(function(n){if(200==n.code){var i=n.repData;i.cameraVos.forEach(function(t){t.type="1"==t.camera_type?f["a"].IOT_TYPE_GUN:f["a"].IOT_TYPE_360,t.isActive=!1}),i.emVos.forEach(function(t){t.type=f["a"].IOT_TYPE_SPHERE,t.isActive=!1}),i.Fm1.forEach(function(t){t.type=f["a"].IOT_TYPE_FM1,t.isActive=!1}),i.Fm2.forEach(function(t){t.type=f["a"].IOT_TYPE_FM2,t.isActive=!1});var r=[],o=0;if(e)if("camera"==e){r=i.cameraVos,r.map(function(t,e){t.index=e});for(var c=0;c<r.length;c++)if("1"==r[c].camera_type){o=c;break}t.state.camera=i.cameraVos[o],t.commit(f["a"].CHANGE_ACTIVE_MARKER,{id:o,type:f["a"].IOT_TYPE_GUN}),t.dispatch(f["a"].GET_GUN_DATA,i.cameraVos[o])}else r=i.Fm1.concat(i.emVos).concat(i.Fm2),r.forEach(function(t,e){t.index=e}),t.dispatch(f["a"].GET_FM1_DATA,r[0].sno),t.commit(f["a"].CHANGE_ACTIVE_MARKER,{id:0,type:f["a"].IOT_TYPE_FM1});else r=i.Fm1.concat(i.emVos).concat(i.Fm2).concat(i.cameraVos),r.forEach(function(t,e){t.index=e}),t.dispatch(f["a"].GET_FM1_DATA,r[0].sno);r[o].isActive=!0,a.cameraAmount=i.cameraVos.length,a.monitorAmount=i.Fm1.length+i.Fm2.length+i.emVos.length,a.iotDatas=r}})}),Object($["a"])(rt,f["a"].GET_FM1_DATA,function(t,e){var a=t.state,n=a.fm1,i=n.data,r=a.fm1.time,o=a.fm1.type;a.fm1.sno=e||a.fm1.sno,ht({url:"/data/monitor/getflddata?sno="+a.fm1.sno,method:"post"}).then(function(t){if(200==t.code){var e=t.repData,a=e.todayData||[],c=e.sevenData||[],s=a.length-1,l=a[s];i.temperature=l.flddata_temp.toFixed(2),i.humidity=l.flddata_humid.toFixed(2),i.light=l.flddata_sunlux.toFixed(2),i.pressure=l.flddata_pa.toFixed(2),"HOUR"==r?"temperature"==o?n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_temp.toFixed(2)}}):"humidity"==o?n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_humid.toFixed(2)}}):"light"==o?n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_sunlux.toFixed(2)}}):"pressure"==o&&(n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_pa.toFixed(2)}})):"WEEK"==r&&("temperature"==o?n.chartDatas=c.map(function(t){return{title:t.days,data:t.flddata_temp.toFixed(2)}}):"humidity"==o?n.chartDatas=c.map(function(t){return{title:t.days,data:t.flddata_humid.toFixed(2)}}):"light"==o?n.chartDatas=c.map(function(t){return{title:t.days,data:t.flddata_sunlux.toFixed(2)}}):"pressure"==o&&(n.chartDatas=c.map(function(t){return{title:t.days,data:t.flddata_pa.toFixed(2)}})))}else i.temperature="-",i.humidity="-",i.light="-",i.pressure="-",n.chartDatas=[]})}),Object($["a"])(rt,f["a"].GET_FM2_DATA,function(t,e){var a=t.state,n=a.fm2,i=n.data,r=a.fm2.time,o=a.fm2.type;a.fm2.sno=e||a.fm2.sno,ht({url:"/data/monitor/getFmbData?sno="+t.state.fm2.sno,method:"post"}).then(function(t){if(200==t.code){var e=t.repData,a=e.todayData||[],c=e.sevenData||[],s=a.length-1,l=a[s];i.temperature=l.soiltemp.toString(),i.humidity=g()(l.soilmture).toFixed(2),i.wind=g()(l.windspd).toFixed(2),i.rain=g()(l.rain).toFixed(2),"HOUR"==r?"temperature"==o?n.chartDatas=a.map(function(t){return{title:t.txtime,data:g()(t.soiltemp).toFixed(2)}}):"humidity"==o?n.chartDatas=a.map(function(t){return{title:t.txtime,data:g()(t.soilmture).toFixed(2)}}):"wind"==o?n.chartDatas=a.map(function(t){return{title:t.txtime,data:g()(t.windspd).toFixed(2),rotate:g()(t.winddir).toFixed(2)}}):"rain"==o&&(n.chartDatas=a.map(function(t){return{title:t.txtime,data:g()(t.rain).toFixed(2)}})):"WEEK"==r&&("temperature"==o?n.chartDatas=c.map(function(t){return{title:t.days,data:g()(t.soiltemp).toFixed(2)}}):"humidity"==o?n.chartDatas=c.map(function(t){return{title:t.days,data:g()(t.soilmture).toFixed(2)}}):"wind"==o?n.chartDatas=c.map(function(t){return{title:t.days,data:g()(t.windspd).toFixed(2),rotate:g()(t.winddir).toFixed(2)}}):"rain"==o&&(n.chartDatas=c.map(function(t){return{title:t.days,data:g()(t.rain).toFixed(2)}})))}else i.temperature="-",i.humidity="-",i.wind="-",i.rain="-",n.chartDatas=[]})}),Object($["a"])(rt,f["a"].CHANGE_PHOTO_VIEW_URL,function(t,e){var a=t.state;ht({url:"/data/monitor/getemdata?em_devid="+e,method:"post"}).then(function(t){var e=t.repData[11].replace(/http/,"https");a.photoViewUrl=e||a.photoViewUrl})}),Object($["a"])(rt,f["a"].GET_GUN_DATA,function(t,e){var a=t.state;a.camera=e,a.videoUrl=a.camera.camera_url}),Object($["a"])(rt,f["a"].GET_360_DATA,function(t,e){var a=t.state;a.camera=e,a.videoUrl360=a.camera.camera_url}),Object($["a"])(rt,f["a"].CHANGE_GUN_DIRECTION,function(t,e){var a=t.state.camera.camera_sno;ht("up"==e?{url:"/data/momitor/CameraStop?sno="+a,method:"post"}:{url:"/data/momitor/CameraRun?sno="+a+"&direction="+g()(e),method:"post"})}),rt),At=(ot={},Object($["a"])(ot,f["a"].CHANGE_ACTIVE_MARKER,function(t,e){var a=t.currActive;a.id=e.id,a.type=e.type}),Object($["a"])(ot,f["a"].SWITCH_FM1_TYPE,function(t,e){var a=t.fm1;a.type=e.value,a.name=e.name,"temperature"==e.value?a.chartUnit="℃":"humidity"==e.value?a.chartUnit="%":"light"==e.value?a.chartUnit="Lux":"pressure"==e.value&&(a.chartUnit="Pa")}),Object($["a"])(ot,f["a"].SWITCH_FM1_TIME_TYPE,function(t,e){t.fm1.time=e}),Object($["a"])(ot,f["a"].SWITCH_FM2_TYPE,function(t,e){var a=t.fm2;a.type=e.value,a.name=e.name,"temperature"==e.value?a.chartUnit="℃":"humidity"==e.value?a.chartUnit="%":"wind"==e.value?a.chartUnit="m/s":"rain"==e.value&&(a.chartUnit="mm")}),Object($["a"])(ot,f["a"].SWITCH_FM2_TIME_TYPE,function(t,e){t.fm2.time=e}),Object($["a"])(ot,f["a"].SWITCH_WF_TYPE,function(t,e){var a=t.wf;a.type=e.value,a.name=e.name,"ec"==e.value?a.chartUnit="mS/cm":"ph"==e.value?a.chartUnit="":"water"==e.value?a.chartUnit="L":"fertilizer"==e.value&&(a.chartUnit="kg")}),Object($["a"])(ot,f["a"].SWITCH_WF_TIME_TYPE,function(t,e){t.wf.time=e}),Object($["a"])(ot,f["a"].IOT_CHANGE_FULL_STATE,function(t,e){e.subModuleName?t[e.subModuleName][e.fullStateName]=e.state:t[e.fullStateName]=e.state}),ot),Et={namespaced:!0,state:{cameraAmount:0,monitorAmount:0,waterFertilizerAmount:0,iotDatas:[],camera:[],emVos:[],fm1List:[],fm2List:[],photoViewUrl:"",currActive:{type:f["a"].IOT_TYPE_FM1,id:0},fm1:{type:"temperature",name:"温度",chartUnit:"℃",time:"HOUR",data:{temperature:"-",humidity:"-",light:"-",pressure:"-"},sno:"",chartDatas:[],curveChartFullState:!1},fm2:{type:"wind",name:"风速",chartUnit:"m/s",time:"HOUR",data:{wind:"-",rain:"-",temperature:"-",humidity:"-"},sno:"",chartDatas:[],curveChartFullState:!1},wf:{type:"ec",name:"EC",chartUnit:"mS/cm",time:"HOUR",data:{ec:"-",ph:"-",water:"-",fertilizer:"-"},chartDatas:[],curveChartFullState:!1},photoViewerFullState:!1,camera360FullState:!1,videoUrl:"",videoUrl360:"",mapSise:14},actions:Tt,mutations:At},gt=Object($["a"])({},f["a"].PLANT_GET_STAT_DATA,function(t,e){var a=e?{addr:e||""}:"",n=[{label:"山场总数",data:"-",unit:"家"},{label:"种植面积",data:"-",unit:"亩"},{label:"预估产量",data:"-",unit:"吨"}];ht({url:"/bigdata/plant/detail",method:"post",data:a}).then(function(e){var a=e.repData;n[0].data=null==a.gardenCount?0:a.gardenCount,n[1].data=null==a.gardenArea?0:a.gardenArea,n[2].data=null==a.yield?0:a.yield.toFixed(2),t.state.totalData=n,t.state.treeAgeDistributeDatas=a.treeAge,t.state.varietiesDatas=a.treeVarieties;for(var i=0,r=0;r<a.treeVarieties.length;r++)i=a.treeVarieties[r].area+i;t.state.varietiesTotalData=i.toFixed(2),t.state.amountRankDatas=a.plantRanking,t.state.teaFarmTypeDatas=a.plantQuality;for(var o=0,c=0;c<a.plantQuality.length;c++)o=a.plantQuality[c].area+o;t.state.farmTotalArea=o.toFixed(2)})}),vt=(ct={},Object($["a"])(ct,f["a"].PLANT_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(ct,f["a"].PLANT_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),ct),bt={namespaced:!0,state:{currSelectedRegion:"",amountRankUnit:"亩",amountRankDatas:[],farmTotalArea:0,teaFarmTypeDatas:[],varietiesTotalData:0,varietiesDatas:[],treeAgeDistributeUnit:"亩",treeAgeDistributeDatas:[],totalData:[],totalDataFullState:!1,treeAgeFullState:!1,teaVarietiesFullState:!1,plantRankFullState:!1,teaFarmFullState:!1,mapFullState:!1},actions:gt,mutations:vt},Ot=Object($["a"])({},f["a"].FARMING_GET_PLANT_ACT_DATA,function(t,e){var a=e?{address_country:"",address_town:e||""}:{address_country:"",address_town:""},n=t.state;ht({url:"/data/farm/getData",method:"post",data:a}).then(function(t){if(200==t.code){var e=t.repData;n.plantActPieDatas=e.yearPlant,n.plantActLineDatas=e.monthPlant,n.fertilizerActPieDatas=e.yearFaramA,n.fertilizerActLineDatas=e.monthFaramA,n.protectionActPieDatas=e.yearFaramB,n.protectionActLineDatas=e.monthFaramB}})}),It=(st={},Object($["a"])(st,f["a"].FARMING_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(st,f["a"].FARMING_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),st),St={namespaced:!0,state:{currSelectedRegion:"",plantActPieDatas:[],plantActLineDatas:[],fertilizerActPieDatas:[],fertilizerActLineDatas:[],protectionActPieDatas:[],protectionActLineDatas:[],mapFullState:!1,plantFullState:!1,protectionFullState:!1,fertilizerFullState:!1},actions:Ot,mutations:It},Dt=Object($["a"])({},f["a"].WAREHOUSE_GET_TODAY_DATA,function(t,e){var a=e?{addr:e||""}:"",n=t.state;ht({url:"/bigdata/warehouse/detail",method:"post",data:a}).then(function(t){if(200==t.code){var e=t.repData;n.toDayInAmount=e.inStock?e.inStock.weight:0,n.toDayOutAmount=e.outStock?e.outStock.weight:0,n.thisYearInDatas=e.thisYearInStock.map(function(t){return{label:t.omonth,value:t.weight}}),n.thisYearOutDatas=e.thisYearOutStock.map(function(t){return{label:t.omonth,value:t.weight}});var a=[],i=[],r=[{omonth:"1月",weight:0},{omonth:"2月",weight:0},{omonth:"3月",weight:0},{omonth:"4月",weight:0},{omonth:"5月",weight:0},{omonth:"6月",weight:0},{omonth:"7月",weight:0},{omonth:"8月",weight:0},{omonth:"9月",weight:0},{omonth:"10月",weight:0},{omonth:"11月",weight:0},{omonth:"12月",weight:0}],o=(new Date).getFullYear();a.push({year:o-1,list:r}),a.push({year:o,list:e.thisYearInStock}),n.historyInDatas=a.map(function(t){return{year:t.year.toString(),list:t.list.map(function(t){return{label:t.omonth,value:t.weight}})}}),i.push({year:o-1,list:r}),i.push({year:o,list:e.thisYearOutStock}),n.historyOutDatas=i.map(function(t){return{year:t.year.toString(),list:t.list.map(function(t){return{label:t.omonth,value:t.weight}})}})}})}),wt=(lt={},Object($["a"])(lt,f["a"].WAREHOUSE_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(lt,f["a"].WAREHOUSE_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),lt),Rt={namespaced:!0,state:{currSelectedRegion:"",toDayInAmount:0,toDayOutAmount:0,thisYearInDatas:[],thisYearOutDatas:[],historyInDatas:[],historyOutDatas:[],mapFullState:!1,inCircleChartFullState:!1,outCircleChartFullState:!1,inLineChartFullState:!1,outLineChartFullState:!1,inConstrastFullState:!1,outConstrastFullState:!1},actions:Dt,mutations:wt},Ct=(ut={},Object($["a"])(ut,f["a"].GET_ORIGIN_DATA,function(t){var e=t.state;ht({url:"/bigdata/origin/detail",method:"post"}).then(function(t){if(200==t.code){var a=t.repData;e.cityDatas=a.originCity.map(function(t){return{value:t.count,name:t.city}}),e.countStatDatas=a.originCount;var n=[];a.originCity.forEach(function(t,e){n[e]=[t.latitude,t.longitude]}),e.mapDatas=a.originCity.map(function(t,e){return{value:n[e].concat(t.count),name:t.city}})}})}),Object($["a"])(ut,f["a"].GET_ORIGIN_LIST_DATA,function(t,e){var a=t.state;1==e.currentPage&&(a.addressList=[]);var n={currentPage:e.currentPage,originDate:e.originDate||""};ht({url:"/bigdata/origin/pageList",method:"post",data:n}).then(function(t){if(200==t.code){var n=t.repData;a.addressList=n.originList,a.totalPage=n.pageInfo.totalPages,a.currentPage=e.currentPage,a.originDate=e.originDate}})}),ut),yt=(dt={},Object($["a"])(dt,f["a"].ORIGIN_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),Object($["a"])(dt,f["a"].ORIGIN_REAL_TIME_DATA,function(t,e){var a=e.type,n=e.data;1==a?t.addressList[0].list.unshift(n):2==a&&t.addressList.unshift(n)}),dt),Ft={namespaced:!0,state:{cityDatas:[],countStatDatas:[],addressList:[],totalPage:1,currentPage:1,originDate:"",mapDatas:[],mapFullState:!1,cityRankFullState:!1,countStateFullState:!1},actions:Ct,mutations:yt},Nt=(mt={},Object($["a"])(mt,J["a"].HOME,pt),Object($["a"])(mt,J["a"].IOT,Et),Object($["a"])(mt,J["a"].PLANT,bt),Object($["a"])(mt,J["a"].FARMING,St),Object($["a"])(mt,J["a"].WAREHOUSE,Rt),Object($["a"])(mt,J["a"].ORIGIN,Ft),mt);n["default"].use(h["b"]);var Gt=new h["b"].Store({state:{winHeight:0,winWidth:0,currRouter:{from:"",to:"",query:null,instance:null},chartFullPage:!1,loading:!1,screenFullState:!1,windowResizeState:0},mutations:Z,modules:Nt}),kt=a("8663");n["default"].use(kt["a"]);var Ht=new kt["a"]({base:"",linkActiveClass:"active",routes:[{path:"/home",name:"home",component:function(){return Promise.all([a.e("chunk-c09ff5b6"),a.e("chunk-203c0bcb"),a.e("chunk-182cd121")]).then(a.bind(null,"8a00"))}},{path:"/iot",name:"iot",component:function(){return Promise.all([a.e("chunk-c09ff5b6"),a.e("chunk-b1b6f392")]).then(a.bind(null,"ecf9"))}},{path:"/plant",name:"plant",component:function(){return Promise.all([a.e("chunk-c09ff5b6"),a.e("chunk-31b06417")]).then(a.bind(null,"3501"))}},{path:"/farming",name:"farming",component:function(){return Promise.all([a.e("chunk-c09ff5b6"),a.e("chunk-50ded482")]).then(a.bind(null,"af20"))}},{path:"/warehouse",name:"warehouse",component:function(){return Promise.all([a.e("chunk-c09ff5b6"),a.e("chunk-44715deb")]).then(a.bind(null,"bc30"))}},{path:"/origin",name:"origin",component:function(){return Promise.all([a.e("chunk-c09ff5b6"),a.e("chunk-203c0bcb"),a.e("chunk-2cbfeab0")]).then(a.bind(null,"7f36"))}},{path:"*",redirect:{name:"home"}}]});Ht.beforeEach(function(t,e,a){Gt.commit({type:f["a"].SET_CURR_ROUTER,from:e.name,to:t.name,query:t.query,instance:Ht}),t.name&&t.name!==e.name&&Gt.commit(f["a"].SWITCH_LOADING,!0),a(!0)});var Pt=Ht,Ut=a("adfa"),Mt=a.n(Ut),Lt=(a("5a14"),a("07cd"),a("18da"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"plane",class:{"full-screen":t.full}},[a("canvas",{ref:"bg"}),t._t("default")],2)}),xt=[],jt=["rgba(53, 121, 255, 0.15)","rgba(18, 35, 87, 0.5)","rgba(53, 121, 255, 0.2)"],Wt={name:"Plane",props:{full:{type:Boolean,default:!1}},watch:{full:function(){var t=this;setTimeout(function(){t.draw()},500)}},mounted:function(){var t=this;t.$nextTick(function(){t.draw(),window.addEventListener("resize",t.draw)})},methods:{draw:function(){var t=this,e=t.$el,a=getComputedStyle(e,null),n=g()(a.width),i=g()(a.height);if(isNaN(n)||isNaN(i))setTimeout(function(){t.draw()},1e3);else{var r=t.$refs.bg;r.width=n,r.height=i;var o=r.getContext("2d");o.clearRect(0,0,n,i);var c=4,s=.5;o.strokeStyle=jt[0],o.fillStyle=jt[1],o.lineWidth=1,o.beginPath(),o.moveTo(c,s),o.lineTo(n-c-.5,s),o.quadraticCurveTo(n-.5,s,n-.5,s+c),o.lineTo(n-.5,i-c),o.quadraticCurveTo(n-.5,i-.5,n-c-.5,i-.5),o.lineTo(c,i-.5),o.quadraticCurveTo(.5,i-.5,.5,i-c-.5),o.lineTo(.5,c),o.quadraticCurveTo(.5,s,c,s),o.stroke(),o.fill();var l=9;o.strokeStyle=jt[2],o.lineWidth=2,o.beginPath(),o.moveTo(.5,c+l),o.lineTo(.5,c),o.quadraticCurveTo(.5,s,c,s),o.lineTo(c+l,s),o.moveTo(n-c-.5-l,s),o.lineTo(n-c-.5,s),o.quadraticCurveTo(n-.5,s,n-.5,s+c),o.lineTo(n-.5,s+c+l),o.moveTo(n-.5,i-c-l),o.lineTo(n-.5,i-c),o.quadraticCurveTo(n-.5,i-.5,n-c-.5,i-.5),o.lineTo(n-c-.5-l,i-.5),o.moveTo(c+l,i-.5),o.lineTo(c,i-.5),o.quadraticCurveTo(.5,i-.5,.5,i-c-.5),o.lineTo(.5,i-c-.5-l),o.stroke()}}},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.draw)}},Yt=Wt,qt=Object(l["a"])(Yt,Lt,xt,!1,null,null,null),Vt=qt.exports,zt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h2",{staticClass:"plane-title"},[a("i"),t._t("default")],2)},$t=[],Kt={},Bt=Object(l["a"])(Kt,zt,$t,!1,null,null,null),Zt=Bt.exports,Jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-tools"},[a("i",{staticClass:"iconfont full-icon",domProps:{innerHTML:t._s(t.full?"&#xe621;":"&#xe629;")},on:{click:function(e){return t.change()}}}),a("i",{staticClass:"iconfont download-icon",on:{click:function(e){return t.download()}}},[t._v("")])])},Qt=[],Xt={name:"PlaneTools",props:{full:{type:Boolean,default:!1}},methods:{change:function(){var t=this;t.$emit("change",!t.full)},download:function(){var t=this,e=t.$el,a=e.parentNode,n=a.querySelectorAll(".plane-content canvas");if(n.length||(n=a.querySelectorAll(".wuyishan-map-container canvas")),n.length){var i=a.querySelector(".plane-title"),r=i?i.innerText:Math.random().toString(36).substr(2),o=0,c=0;n.forEach(function(t){t.height>c&&(c=t.height),o+=t.width}),o+=40+10*(n.length-1),c+=40;var s=document.createElement("canvas");s.width=o,s.height=c;var l=s.getContext("2d");l.fillStyle="rgba(18, 35, 87, 0.98)",l.fillRect(0,0,o,c);for(var u=20,d=null,m=0;m<n.length;m++)d=n[m],l.drawImage(d,u,20,d.width,d.height),u=u+d.width+10;var h=document.createElement("a");h.download=r,h.href=s.toDataURL("image/png"),document.body.appendChild(h),h.click(),h.remove()}}}},te=Xt,ee=Object(l["a"])(te,Jt,Qt,!1,null,null,null),ae=ee.exports,ne=a("396f"),ie=new WebSocket(at["a"].socketUrl);ie.onopen=function(t){console.log("web socket open...")},ie.onmessage=function(t){var e=Object(ne["a"])(t.data),a=Gt.state[J["a"].ORIGIN];if("string"==e)try{var n=JSON.parse(t.data);Gt.dispatch(J["a"].ORIGIN+"/"+f["a"].GET_ORIGIN_DATA),a.addressList[0]&&n.date==a.addressList[0].date?Gt.commit(J["a"].ORIGIN+"/"+f["a"].ORIGIN_REAL_TIME_DATA,{type:1,data:n}):Gt.commit(J["a"].ORIGIN+"/"+f["a"].ORIGIN_REAL_TIME_DATA,{type:2,data:{date:n.date,list:[n]}})}catch(i){console.log(t.data,i)}},ie.onerror=function(t){console.log("socket error....",t)},ie.onclose=function(t){console.log("socket close....",t)},ie.send=function(t){console.log("send successful...",t)};var re=ie;n["default"].config.productionTip=!1,n["default"].prototype.$ajax=ht,n["default"].prototype.$socket=re,n["default"].use(Mt.a),n["default"].component("Plane",Vt),n["default"].component("PlaneTitle",Zt),n["default"].component("PlaneTools",ae),new n["default"]({router:Pt,store:Gt,render:function(t){return t(z)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("2b2a"),i=a.n(n);i.a},eb57:function(t,e,a){"use strict";a("0b9e");var n=["SWITCH_LOADING","SWITCH_SCREEN_FULL","GET_WINDOW_SIZE","SET_CURR_ROUTER","GET_IOT_DATA","CHANGE_ACTIVE_IOT_TYPE","CHANGE_ACTIVE_MARKER","GET_FM1_DATA","SWITCH_FM1_TYPE","SWITCH_FM1_TIME_TYPE","GET_FM2_DATA","GET_FM2_CHART_DATA","SWITCH_FM2_TYPE","SWITCH_FM2_TIME_TYPE","SWITCH_WF_TYPE","SWITCH_WF_TIME_TYPE","IOT_CHANGE_FULL_STATE","CHANGE_PHOTO_VIEW_URL","IOT_TYPE_FM1","IOT_TYPE_FM2","IOT_TYPE_GUN","IOT_TYPE_SPHERE","IOT_TYPE_WF","IOT_TYPE_360","FARMING_CHANGE_CURR_REGION","FARMING_GET_PLANT_ACT_DATA","FARMING_GET_FERTILIZER_ACT_DATA","FARMING_GET_PROTECTION_ACT_DATA","FARMING_CHANGE_FULL_STATE","WAREHOUSE_CHANGE_CURR_REGION","WAREHOUSE_GET_TODAY_DATA","WAREHOUSE_GET_THIS_YEAR_IN_DATA","WAREHOUSE_GET_THIS_YEAR_OUT_DATA","WAREHOUSE_GET_HISTORY_IN_DATA","WAREHOUSE_GET_HISTORY_OUT_DATA","WAREHOUSE_CHANGE_FULL_STATE","PLANT_CHANGE_CURR_REGION","PLANT_GET_STAT_DATA","PLANT_GET_TREE_AGE_DATA","PLANT_GET_TEA_FARM_DATA","PLANT_GET_TEA_VARIETIES_DATA","PLANT_GET_AMOUNT_RANK","PLANT_CHANGE_FULL_STATE","HOME_CHANGE_CURR_REGION","HOME_GET_AMOUNT_RANK_DATA","HOME_GET_FARMING_ACT_DATA","HOME_GET_PICK_DATA","HOME_GET_WAREHOUSE_DATA","HOME_GET_CITY_DATA","HOME_GET_MONITOR_AMOUNT","HOME_GET_TEA_LEVEL_DATA","HOME_CHANGE_FULL_STATE","ORIGIN_CHANGE_FULL_STATE","GET_ORIGIN_DATA","GET_ORIGIN_LIST_DATA","CHANGE_PHOTO_VIEW_URL","GET_GUN_DATA","CHANGE_GUN_DIRECTION","GET_360_DATA","ORIGIN_REAL_TIME_DATA"],i={};n.forEach(function(t){i[t]=t}),e["a"]=i}});