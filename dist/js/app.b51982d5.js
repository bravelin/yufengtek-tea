(function(t){function e(e){for(var n,i,s=e[0],c=e[1],u=e[2],l=0,d=[];l<s.length;l++)i=s[l],r[i]&&d.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);m&&m(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,i=1;i<a.length;i++){var s=a[i];0!==r[s]&&(n=!1)}n&&(o.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},i={app:0},r={app:0},o=[];function s(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-293b0e84":"a3fc6f21","chunk-5b519a3c":"bee3535c","chunk-2514576c":"b6edbf8c","chunk-50eba7f3":"d07d61fa","chunk-62e2f1a4":"44cefec3","chunk-64109cc9":"66949333","chunk-72507f84":"fe8aad71","chunk-ae8b0af6":"a5c8e5fa","chunk-d0041948":"c377710c"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(t){var e=[],a={"chunk-293b0e84":1,"chunk-2514576c":1,"chunk-62e2f1a4":1,"chunk-64109cc9":1,"chunk-72507f84":1,"chunk-ae8b0af6":1,"chunk-d0041948":1};i[t]?e.push(i[t]):0!==i[t]&&a[t]&&e.push(i[t]=new Promise(function(e,a){for(var n="css/"+({}[t]||t)+"."+{"chunk-293b0e84":"3128bf64","chunk-5b519a3c":"31d6cfe0","chunk-2514576c":"08ffa52f","chunk-50eba7f3":"31d6cfe0","chunk-62e2f1a4":"a9352fcc","chunk-64109cc9":"bffe3964","chunk-72507f84":"341558c3","chunk-ae8b0af6":"6dd41b1c","chunk-d0041948":"b489b910"}[t]+".css",r=c.p+n,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var u=o[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===r))return e()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===n||l===r)return e()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=e,m.onerror=function(e){var n=e&&e.target&&e.target.src||r,o=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete i[t],m.parentNode.removeChild(m),a(o)},m.href=r;var h=document.getElementsByTagName("head")[0];h.appendChild(m)}).then(function(){i[t]=0}));var n=r[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise(function(e,a){n=r[t]=[e,a]});e.push(n[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(t),u=function(e){l.onerror=l.onload=null,clearTimeout(d);var a=r[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+n+": "+i+")");o.type=n,o.request=i,a[1](o)}r[t]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var m=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0706":function(t,e,a){"use strict";e["a"]={HOME:"home",IOT:"iot",FARMING:"farming",PLANT:"plant",WAREHOUSE:"warehouse",ORIGIN:"origin"}},"1a1e":function(t,e,a){"use strict";e["a"]={mapStyle:"amap://styles/darkblue",fm1MarkerImgUrl:{normal:"./images/fm1.png",active:"./images/fm1_active.png"},fm2MarkerImgUrl:{normal:"./images/fm2.png",active:"./images/fm2_active.png"},gunMarkerImgUrl:{normal:"./images/gun.png",active:"./images/gun_active.png"},wfMarkerImgUrl:{normal:"./images/wf.png",active:"./images/wf_active.png"},sphereMarkerImgUrl:{normal:"./images/sphere.png",active:"./images/sphere_active.png"},photoMarkerImgUrl:{normal:"./images/360.png",active:"./images/360_active.png"},iotMonitorMap:{center:[117.9289366,27.659368],zoom:13},proxyUrl:"https://proxy.yufengtek.com/",baseUrl:"http://tea.yufengtek.com/tea-IIS-Web",socketUrl:"wss://tea.yufengtek.com/tea-IIS-Web/myHandler",mapAutoChangeTime:5e3}},"2b2a":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("5c07"),a("53da"),a("2556"),a("d0f8");var n=a("6e6d"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.winHeight+"px"},attrs:{id:"app"}},[a("Sky"),a("NavMenu",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}]}),a("router-view",{style:{height:t.pageHeight+"px"}}),a("Spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]})],1)},r=[],o=a("3556"),s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},c=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"spinner-wrap"},[a("div",{staticClass:"spinner"},[a("div",{staticClass:"spinner-container container1"},[a("div",{staticClass:"circle1"}),a("div",{staticClass:"circle2"}),a("div",{staticClass:"circle3"}),a("div",{staticClass:"circle4"})]),a("div",{staticClass:"spinner-container container2"},[a("div",{staticClass:"circle1"}),a("div",{staticClass:"circle2"}),a("div",{staticClass:"circle3"}),a("div",{staticClass:"circle4"})]),a("div",{staticClass:"spinner-container container3"},[a("div",{staticClass:"circle1"}),a("div",{staticClass:"circle2"}),a("div",{staticClass:"circle3"}),a("div",{staticClass:"circle4"})])])])}],u=a("17cc"),l={},d=Object(u["a"])(l,s,c,!1,null,null,null),m=d.exports,h=a("52c1"),f=a("eb57"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav-menu"},[a("div",{staticClass:"logo",on:{dblclick:function(e){return t.doLogout()}}},[a("div",[t._v("智所未见 尽在未来")])]),a("ul",{staticClass:"menu"},[a("router-link",{attrs:{tag:"li",to:{name:"home"}}},[t._v("智慧全息")]),a("router-link",{attrs:{tag:"li",to:{name:"iot"}}},[t._v("物联监控")]),a("router-link",{attrs:{tag:"li",to:{name:"plant"}}},[t._v("种植分布")]),a("router-link",{attrs:{tag:"li",to:{name:"farming"}}},[t._v("农事活动")]),a("router-link",{attrs:{tag:"li",to:{name:"warehouse"}}},[t._v("出库入库")]),a("router-link",{attrs:{tag:"li",to:{name:"origin"}}},[t._v("溯源数据")])],1),a("AppTitle")],1)},_=[],T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-title"},[a("canvas",{ref:"bg"}),a("h3",[t._v("武夷山市智慧茗园数据平台")])])},g=[],v={name:"app-title",mounted:function(){var t=this;t.$nextTick(function(){t.draw(),window.addEventListener("resize",t.draw)})},methods:{draw:function(){var t=this,e=window.getComputedStyle(t.$el,null),a=parseInt(e.width),n=parseInt(e.height);if(isNaN(a)||isNaN(n))setTimeout(function(){t.draw()},1e3);else{var i=t.$refs.bg;i.width=a,i.height=n;var r=i.getContext("2d"),o=a-2,s=n-1;r.clearRect(0,0,a,n),r.beginPath(),r.strokeStyle="rgba(53, 121, 255, 0.25)",r.lineWidth=2,r.moveTo(o,s),r.lineTo(24,s),r.lineTo(0,49.5),r.stroke(),r.beginPath(),r.lineWidth=4,r.moveTo(19,s-9),r.lineTo(o,s-9),r.stroke(),r.beginPath(),r.lineWidth=6,r.moveTo(0,s-1),r.lineTo(6,s-1),r.stroke()}}},beforeDestroy:function(){window.removeEventListener("resize",this.draw)}},A=v,E=Object(u["a"])(A,T,g,!1,null,null,null),I=E.exports,b={name:"NavMenu",components:{AppTitle:I},methods:{doLogout:function(){var t=this,e=t.$store;t.$ajax({url:"/data/user/loginOut"}),e.commit(f["a"].CLEAR_USER_INFO),t.$router.push({name:"login"})}}},O=b,D=Object(u["a"])(O,p,_,!1,null,null,null),S=D.exports,R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("canvas",{staticClass:"app-bg"})},w=[],y=(a("244e"),a("962b")),F=a("78e7"),C=100;function N(t,e){if(arguments.length<2&&(e=t,t=0),t>e){var a=e;e=t,t=a}return Math.floor(Math.random()*(e-t+1))+t}function k(t,e){var a=Math.max(t,e),n=Math.round(Math.sqrt(a*a+a*a));return n/2}var G,P=function(){function t(e,a,n,i,r){Object(y["a"])(this,t),this.ctx=n,this.ctx2=i,this.canvas2=r,this.orbitRadius=N(k(e,a)),this.radius=N(60,this.orbitRadius)/15,this.radius>19&&(this.radius=19),this.orbitX=e/2,this.orbitY=a/2,this.timePassed=N(0,C),this.speed=N(this.orbitRadius)/8e5,this.alpha=N(2,10)/10}return Object(F["a"])(t,[{key:"draw",value:function(){var t=Math.sin(this.timePassed)*this.orbitRadius+this.orbitX,e=Math.cos(this.timePassed)*this.orbitRadius+this.orbitY;this.ctx.globalAlpha=this.alpha,this.ctx.drawImage(this.canvas2,t-this.radius/2,e-this.radius/2,this.radius,this.radius),this.timePassed+=this.speed}}]),t}(),H=window,U={data:function(){return{stars:[],ctx:null,hue:0,w:0,h:0,requestId:null}},created:function(){H.requestAnimationFrame=H.requestAnimationFrame||H.webkitRequestAnimationFrame||H.mozRequestAnimationFrame||H.msRequestAnimationFrame,H.cancelAnimationFrame=H.cancelAnimationFrame||H.webkitCancelAnimationFrame||H.mozCancelAnimationFrame||H.msCancelAnimationFrame},mounted:function(){var t=this;t.$nextTick(function(){var e=t.$el;t.ctx=e.getContext("2d"),t.draw()}),H.addEventListener("resize",t.doResize)},methods:{doResize:function(){var t=this;t.requestId&&H.cancelAnimationFrame(t.requestId),t.ctx.clearRect(0,0,t.w,t.h),t.draw()},draw:function(){var t=this,e=t.$el,a=t.ctx,n=t.w=e.width=window.innerWidth,i=t.h=e.height=window.innerHeight,r=t.hue=217,o=680,s=document.createElement("canvas"),c=s.getContext("2d");s.width=100,s.height=100;var u=s.width/2,l=c.createRadialGradient(u,u,0,u,u,u);l.addColorStop(.025,"#fff"),l.addColorStop(.1,"hsl("+r+", 61%, 33%)"),l.addColorStop(.25,"hsl("+r+", 64%, 6%)"),l.addColorStop(1,"transparent"),c.fillStyle=l,c.beginPath(),c.arc(u,u,u,0,2*Math.PI),c.fill(),t.stars=[];for(var d=0;d<o;d++)t.stars.push(new P(n,i,a,c,s));t.animation()},animation:function(){var t=this,e=t.ctx;e.globalCompositeOperation="source-over",e.globalAlpha=.8,e.fillStyle="hsla("+t.hue+", 64%, 6%, 0.9)",e.fillRect(0,0,t.w,t.h),e.globalCompositeOperation="lighter";for(var a=1,n=t.stars.length;a<n;a++)t.stars[a].draw();t.requestId=H.requestAnimationFrame(t.animation)}},beforeDestroy:function(){var t=this;t.requestId&&H.cancelAnimationFrame(t.requestId),window.removeEventListener("onresize",t.doResize)}},L=U,M=Object(u["a"])(L,R,w,!1,null,null,null),x=M.exports,j={name:"app",components:{Spinner:m,NavMenu:S,Sky:x},computed:Object(o["a"])({},Object(h["c"])(["loading","winHeight","screenFullState"]),{pageHeight:function(){var t=this.$store.state,e=t.winHeight-105;return e>540?e:540},isLogin:function(){return"login"===this.$store.state.currRouter.to}}),created:function(){var t=this,e=t.$store,a=window;a.addEventListener("resize",function(){e.commit(f["a"].GET_WINDOW_SIZE)}),e.commit(f["a"].GET_WINDOW_SIZE)}},W=j,Y=(a("5c0b"),Object(u["a"])(W,i,r,!1,null,null,null)),q=Y.exports,$=(a("3a23"),a("2919")),z=a("ecac"),V=window,B=document,K=localStorage,Z=(G={},Object($["a"])(G,f["a"].SWITCH_LOADING,function(t,e){t.loading=e}),Object($["a"])(G,f["a"].SWITCH_SCREEN_FULL,function(t,e){t.screenFullState=e}),Object($["a"])(G,f["a"].GET_WINDOW_SIZE,function(t){t.winHeight=B.documentElement.clientHeight||V.innerHeight,t.winWidth=B.documentElement.clientWidth||V.innerWidth,B.body.style.minHeight=t.winHeight+"px";var e=t.windowResizeState+1;e=e>99999?1:e,t.windowResizeState=e}),Object($["a"])(G,f["a"].SET_CURR_ROUTER,function(t,e){var a=t.currRouter;a.from=e.from,a.to=e.to,a.query=e.query,a.instance=e.instance,a.to||(t.loading=!1,t.screenFullState=!1)}),Object($["a"])(G,f["a"].UPDATE_USER_INFO,function(t,e){t.userToken=e.userToken,t.userId=e.userId,t.userName=e.userName,t.userRole=e.userRole,K.setItem(z["a"].userToken,t.userToken),K.setItem(z["a"].userId,t.userId),K.setItem(z["a"].userName,t.userName),K.setItem(z["a"].userRole,t.userRole),K.setItem(z["a"].password,e.password)}),Object($["a"])(G,f["a"].CLEAR_USER_INFO,function(t){t.userToken="",t.userId="",t.userName="",t.userRole="",K.removeItem(z["a"].userToken),K.removeItem(z["a"].userId),K.removeItem(z["a"].userName),K.removeItem(z["a"].userRole),K.removeItem(z["a"].password)}),G),J=a("0706"),X=(a("44a2"),a("ab56"),a("7f43")),Q=a.n(X),tt=a("1a1e"),et=a("0e4f");Q.a.defaults.baseURL="",Q.a.interceptors.request.use(function(t){return t.headers["valToken"]=Nt.state.userToken,t},function(t){return Promise.reject(t)}),Q.a.interceptors.response.use(function(t){return Promise.resolve(t)},function(t){return Promise.reject(t)});var at,nt,it,rt,ot,st,ct,ut,lt,dt=function(t){return/post/i.test(t.method)&&!t.headers&&(t.headers={"Content-Type":"application/x-www-form-urlencoded"},t.data=et.stringify(t.data)),/json/.test(t.url)||(t.url=tt["a"].baseUrl+t.url),new Promise(function(e,a){Q.a.request(t).then(function(t){"w1005"==t.data.code?Nt.state.currRouter.instance.push({name:"login"}):e(t.data)},function(t){a(t)})})},mt=Object($["a"])({},f["a"].HOME_GET_DATA,function(t){var e=t.state,a=e.currSelectedRegion?{addr:e.currSelectedRegion}:{};dt({url:"/bigdata/home/detail",method:"post",data:a}).then(function(t){if(200==t.code){var a=t.repData;e.amountRankDatas=a.planting.sort(function(t,e){return t.area>e.area?1:-1}),e.farmingActdatas=a.fertiliz.map(function(t){return{label:t.month,value:t.weight}}),e.pickDatas=a.picking.map(function(t){return{label:t.classify,value:t.amount}}),e.teaTotalAmount=null==a.totalPicking||0==a.totalPicking.length?e.teaTotalAmount:a.totalPicking;var n={};n.in=0==a.inStock.length?e.warehouseDatas.in:a.inStock,n.out=0==a.inStock.length?e.warehouseDatas.out:a.outStock,e.warehouseDatas=n,e.cityDatas=a.origin.map(function(t){return{value:t.counts,name:t.cityname}}),e.cameraAmount=a.cameraCount.count,e.monitorAmount=a.fielddstation.count,e.levelDatas=a.craft}else e.amountRankDatas=[],e.farmingActdatas=[],e.pickDatas=[],e.teaTotalAmount="-",e.warehouseDatas.in=[],e.warehouseDatas.out=[],e.cityDatas=[],e.cameraAmount="-",e.monitorAmount="-",e.levelDatas=[]})}),ht=(at={},Object($["a"])(at,f["a"].HOME_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(at,f["a"].HOME_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),at),ft={namespaced:!0,state:{cameraAmount:0,monitorAmount:0,waterFertilizerAmount:0,farmingActdatas:[],pickDatas:[],teaTotalAmount:"",levelDatas:[],amountRankUnit:"亩",amountRankDatas:[],warehouseUnit:"吨",warehouseDatas:{in:[],out:[]},cityDatas:[],currSelectedRegion:"",amountRankFullState:!1,farmingInfoFullState:!1,pickInfoFullState:!1,warehouseFullState:!1,originDataFullState:!1,levelInfoFullState:!1,mapFullState:!1},actions:mt,mutations:ht},pt=(a("f91a"),a("48fb"),a("4ccc"),a("612f"),a("0b9e"),nt={},Object($["a"])(nt,f["a"].GET_IOT_DATA,function(t){var e=t.state;dt({url:"/data/monitor/selectStation",method:"post"}).then(function(a){if(200==a.code){var n=a.repData;n.cameraVos.forEach(function(t){t.type="1"==t.camera_type?f["a"].IOT_TYPE_GUN:f["a"].IOT_TYPE_360,t.isActive=!1}),n.emVos.forEach(function(t){t.type=f["a"].IOT_TYPE_SPHERE,t.isActive=!1}),n.Fm1.forEach(function(t){t.type=f["a"].IOT_TYPE_FM1,t.isActive=!1}),n.Fm2.forEach(function(t){t.type=f["a"].IOT_TYPE_FM2,t.isActive=!1});var i=[];i=n.Fm1.concat(n.emVos).concat(n.Fm2).concat(n.cameraVos),e.iotDatas.length!=i.length&&(i.forEach(function(t,e){t.index=e}),e.currActive.type=f["a"].IOT_TYPE_FM1,e.currActive.index=0,i[0].isActive=!0,t.dispatch(f["a"].GET_FM1_DATA,i[0].sno),e.cameraAmount=n.cameraVos.length,e.monitorAmount=n.Fm1.length+n.Fm2.length+n.emVos.length,e.iotDatas=i)}})}),Object($["a"])(nt,f["a"].GET_FM1_DATA,function(t,e){var a=t.state,n=a.fm1,i=n.data,r=a.fm1.time,o=a.fm1.type;a.fm1.sno=e||a.fm1.sno,dt({url:"/data/monitor/getflddata?sno="+a.fm1.sno,method:"post"}).then(function(t){if(200==t.code){var e=t.repData,a=e.todayData||[],s=e.sevenData||[];if(a.length){var c=a.length-1,u=a[c];i.temperature=u.flddata_temp.toFixed(2),i.humidity=u.flddata_humid.toFixed(2),i.light=u.flddata_sunlux.toFixed(2),i.pressure=u.flddata_pa.toFixed(2)}else i.temperature="-",i.humidity="-",i.light="-",i.pressure="-";"HOUR"==r?"temperature"==o?n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_temp.toFixed(2)}}):"humidity"==o?n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_humid.toFixed(2)}}):"light"==o?n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_sunlux.toFixed(2)}}):"pressure"==o&&(n.chartDatas=a.map(function(t){return{title:t.flddata_txtime,data:t.flddata_pa.toFixed(2)}})):"WEEK"==r&&("temperature"==o?n.chartDatas=s.map(function(t){return{title:t.days,data:t.flddata_temp.toFixed(2)}}):"humidity"==o?n.chartDatas=s.map(function(t){return{title:t.days,data:t.flddata_humid.toFixed(2)}}):"light"==o?n.chartDatas=s.map(function(t){return{title:t.days,data:t.flddata_sunlux.toFixed(2)}}):"pressure"==o&&(n.chartDatas=s.map(function(t){return{title:t.days,data:t.flddata_pa.toFixed(2)}})))}else i.temperature="-",i.humidity="-",i.light="-",i.pressure="-",n.chartDatas=[]})}),Object($["a"])(nt,f["a"].GET_FM2_DATA,function(t,e){var a=t.state,n=a.fm2,i=n.data,r=a.fm2.time,o=a.fm2.type;a.fm2.sno=e||a.fm2.sno,dt({url:"/data/monitor/getFmbData?sno="+a.fm2.sno,method:"post"}).then(function(t){if(200==t.code){var e=t.repData,a=e.todayData||[],s=e.sevenData||[];if(a.length){var c=a.length-1,u=a[c];i.temperature=u.soiltemp.toString(),i.humidity=parseInt(u.soilmture).toFixed(2),i.wind=parseInt(u.windspd).toFixed(2),i.rain=parseInt(u.rain).toFixed(2)}else i.temperature="-",i.humidity="-",i.wind="-",i.rain="-";"HOUR"==r?"temperature"==o?n.chartDatas=a.map(function(t){return{title:t.txtime,data:parseInt(t.soiltemp).toFixed(2)}}):"humidity"==o?n.chartDatas=a.map(function(t){return{title:t.txtime,data:parseInt(t.soilmture).toFixed(2)}}):"wind"==o?n.chartDatas=a.map(function(t){return{title:t.txtime,data:parseInt(t.windspd).toFixed(2),rotate:parseInt(t.winddir).toFixed(2)}}):"rain"==o&&(n.chartDatas=a.map(function(t){return{title:t.txtime,data:parseInt(t.rain).toFixed(2)}})):"WEEK"==r&&("temperature"==o?n.chartDatas=s.map(function(t){return{title:t.days,data:parseInt(t.soiltemp).toFixed(2)}}):"humidity"==o?n.chartDatas=s.map(function(t){return{title:t.days,data:parseInt(t.soilmture).toFixed(2)}}):"wind"==o?n.chartDatas=s.map(function(t){return{title:t.days,data:parseInt(t.windspd).toFixed(2),rotate:parseInt(t.winddir).toFixed(2)}}):"rain"==o&&(n.chartDatas=s.map(function(t){return{title:t.days,data:parseInt(t.rain).toFixed(2)}})))}else i.temperature="-",i.humidity="-",i.wind="-",i.rain="-",n.chartDatas=[]})}),Object($["a"])(nt,f["a"].CHANGE_ACTIVE_IOT_TYPE,function(t,e){var a=t.state,n=a.iotDatas;if("camera"==e){for(var i=0,r=null,o=0;o<n.length;o++)if(r=n[o],"1"==r.camera_type){i=o;break}r&&(t.state.camera=r,t.commit(f["a"].CHANGE_ACTIVE_MARKER,{index:i,type:f["a"].IOT_TYPE_GUN}),t.commit(f["a"].GET_GUN_DATA,r))}else n.length&&(t.dispatch(f["a"].GET_FM1_DATA,n[0].sno),t.commit(f["a"].CHANGE_ACTIVE_MARKER,{index:0,type:f["a"].IOT_TYPE_FM1}))}),Object($["a"])(nt,f["a"].CHANGE_PHOTO_VIEW_URL,function(t,e){var a=t.state;dt({url:"/data/monitor/getemdata?em_devid="+e,method:"post"}).then(function(t){var e=t.repData[11].replace(/http/,"https");a.photoViewUrl=e||a.photoViewUrl})}),Object($["a"])(nt,f["a"].CHANGE_GUN_DIRECTION,function(t,e){var a=t.state.camera.camera_sno;dt("up"==e?{url:"/data/momitor/CameraStop?sno="+a,method:"post"}:{url:"/data/momitor/CameraRun?sno="+a+"&direction="+parseInt(e),method:"post"})}),nt),_t=(it={},Object($["a"])(it,f["a"].CHANGE_ACTIVE_MARKER,function(t,e){var a=t.currActive,n=t.iotDatas[a.index];n&&(n.isActive=!1),a.index=e.index,a.type=e.type,t.iotDatas[a.index].isActive=!0}),Object($["a"])(it,f["a"].SWITCH_FM1_TYPE,function(t,e){var a=t.fm1;a.type=e.value,a.name=e.name,"temperature"==e.value?a.chartUnit="℃":"humidity"==e.value?a.chartUnit="%":"light"==e.value?a.chartUnit="Lux":"pressure"==e.value&&(a.chartUnit="Pa")}),Object($["a"])(it,f["a"].SWITCH_FM1_TIME_TYPE,function(t,e){t.fm1.time=e}),Object($["a"])(it,f["a"].SWITCH_FM2_TYPE,function(t,e){var a=t.fm2;a.type=e.value,a.name=e.name,"temperature"==e.value?a.chartUnit="℃":"humidity"==e.value?a.chartUnit="%":"wind"==e.value?a.chartUnit="m/s":"rain"==e.value&&(a.chartUnit="mm")}),Object($["a"])(it,f["a"].SWITCH_FM2_TIME_TYPE,function(t,e){t.fm2.time=e}),Object($["a"])(it,f["a"].SWITCH_WF_TYPE,function(t,e){var a=t.wf;a.type=e.value,a.name=e.name,"ec"==e.value?a.chartUnit="mS/cm":"ph"==e.value?a.chartUnit="":"water"==e.value?a.chartUnit="L":"fertilizer"==e.value&&(a.chartUnit="kg")}),Object($["a"])(it,f["a"].SWITCH_WF_TIME_TYPE,function(t,e){t.wf.time=e}),Object($["a"])(it,f["a"].IOT_CHANGE_FULL_STATE,function(t,e){e.subModuleName?t[e.subModuleName][e.fullStateName]=e.state:t[e.fullStateName]=e.state}),Object($["a"])(it,f["a"].GET_GUN_DATA,function(t,e){t.camera=e,t.videoUrl=t.camera.camera_url}),Object($["a"])(it,f["a"].GET_360_DATA,function(t,e){t.camera=e,t.videoUrl360=t.camera.camera_url}),it),Tt={namespaced:!0,state:{cameraAmount:0,monitorAmount:0,waterFertilizerAmount:0,iotDatas:[],camera:[],emVos:[],fm1List:[],fm2List:[],photoViewUrl:"",currActive:{type:f["a"].IOT_TYPE_FM1,index:0},fm1:{type:"temperature",name:"温度",chartUnit:"℃",time:"HOUR",data:{temperature:"-",humidity:"-",light:"-",pressure:"-"},sno:"",chartDatas:[],curveChartFullState:!1},fm2:{type:"wind",name:"风速",chartUnit:"m/s",time:"HOUR",data:{wind:"-",rain:"-",temperature:"-",humidity:"-"},sno:"",chartDatas:[],curveChartFullState:!1},wf:{type:"ec",name:"EC",chartUnit:"mS/cm",time:"HOUR",data:{ec:"-",ph:"-",water:"-",fertilizer:"-"},chartDatas:[],curveChartFullState:!1},photoViewerFullState:!1,camera360FullState:!1,videoUrl:"",videoUrl360:""},actions:pt,mutations:_t},gt=(a("9788"),Object($["a"])({},f["a"].PLANT_GET_DATA,function(t){var e=t.state,a=e.currSelectedRegion?{addr:e.currSelectedRegion}:{},n=[{label:"山场总数",data:"-",unit:"家"},{label:"种植面积",data:"-",unit:"亩"},{label:"预估产量",data:"-",unit:"吨"}];dt({url:"/bigdata/plant/detail",method:"post",data:a}).then(function(t){if(200==t.code){var a=t.repData;n[0].data=null==a.gardenCount?0:a.gardenCount,n[1].data=null==a.gardenArea?0:a.gardenArea,n[2].data=null==a.yield?0:a.yield.toFixed(2),e.totalData=n,e.treeAgeDistributeDatas=a.treeAge||[],e.varietiesDatas=a.treeVarieties||[];var i=e.varietiesDatas.reduce(function(t,e){return t+e.area},0);e.varietiesTotalData=i.toFixed(2),e.amountRankDatas=a.plantRanking||[],e.teaFarmTypeDatas=a.plantQuality||[];var r=e.teaFarmTypeDatas.reduce(function(t,e){return t+e.area},0);e.farmTotalArea=r.toFixed(2)}else e.treeAgeDistributeDatas=[],e.varietiesDatas=[],e.varietiesTotalData="-",e.amountRankDatas=[],e.teaFarmTypeDatas=[],e.farmTotalArea="-"})})),vt=(rt={},Object($["a"])(rt,f["a"].PLANT_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(rt,f["a"].PLANT_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),rt),At={namespaced:!0,state:{currSelectedRegion:"",amountRankUnit:"亩",amountRankDatas:[],farmTotalArea:0,teaFarmTypeDatas:[],varietiesTotalData:0,varietiesDatas:[],treeAgeDistributeUnit:"亩",treeAgeDistributeDatas:[],totalData:[],totalDataFullState:!1,treeAgeFullState:!1,teaVarietiesFullState:!1,plantRankFullState:!1,teaFarmFullState:!1,mapFullState:!1},actions:gt,mutations:vt},Et=Object($["a"])({},f["a"].FARMING_GET_DATA,function(t){var e=t.state,a={address_country:"",address_town:e.currSelectedRegion};dt({url:"/data/farm/getData",method:"post",data:a}).then(function(t){if(200==t.code){var a=t.repData;e.plantActPieDatas=a.yearPlant||[],e.plantActLineDatas=a.monthPlant||[],e.fertilizerActPieDatas=a.yearFaramA||[],e.fertilizerActLineDatas=a.monthFaramA||[],e.protectionActPieDatas=a.yearFaramB||[],e.protectionActLineDatas=a.monthFaramB||[]}else e.plantActPieDatas=[],e.plantActLineDatas=[],e.fertilizerActPieDatas=[],e.fertilizerActLineDatas=[],e.protectionActPieDatas=[],e.protectionActLineDatas=[]})}),It=(ot={},Object($["a"])(ot,f["a"].FARMING_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(ot,f["a"].FARMING_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),ot),bt={namespaced:!0,state:{currSelectedRegion:"",plantActPieDatas:[],plantActLineDatas:[],fertilizerActPieDatas:[],fertilizerActLineDatas:[],protectionActPieDatas:[],protectionActLineDatas:[],mapFullState:!1,plantFullState:!1,protectionFullState:!1,fertilizerFullState:!1},actions:Et,mutations:It},Ot=Object($["a"])({},f["a"].WAREHOUSE_GET_DATA,function(t){var e=t.state,a=e.currSelectedRegion?{addr:e.currSelectedRegion}:{};dt({url:"/bigdata/warehouse/detail",method:"post",data:a}).then(function(t){if(200==t.code){var a=t.repData;e.toDayInAmount=a.inStock?a.inStock.weight:0,e.toDayOutAmount=a.outStock?a.outStock.weight:0,e.thisYearInDatas=a.thisYearInStock.map(function(t){return{label:t.omonth,value:t.weight}}),e.thisYearOutDatas=a.thisYearOutStock.map(function(t){return{label:t.omonth,value:t.weight}});var n=[],i=[],r=["1","2","3","4","5","6","7","8","9","10","11","12"].map(function(t){return{omonth:"".concat(t,"月"),weight:0}}),o=(new Date).getFullYear();n.push({year:o-1,list:r}),n.push({year:o,list:a.thisYearInStock}),e.historyInDatas=n.map(function(t){return{year:t.year.toString(),list:t.list.map(function(t){return{label:t.omonth,value:t.weight}})}}),i.push({year:o-1,list:r}),i.push({year:o,list:a.thisYearOutStock}),e.historyOutDatas=i.map(function(t){return{year:t.year.toString(),list:t.list.map(function(t){return{label:t.omonth,value:t.weight}})}})}else e.toDayInAmount="-",e.toDayOutAmount="-",e.thisYearInDatas=[],e.thisYearOutDatas=[],e.historyInDatas=[],e.historyOutDatas=[]})}),Dt=(st={},Object($["a"])(st,f["a"].WAREHOUSE_CHANGE_CURR_REGION,function(t,e){t.currSelectedRegion=e}),Object($["a"])(st,f["a"].WAREHOUSE_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),st),St={namespaced:!0,state:{currSelectedRegion:"",toDayInAmount:0,toDayOutAmount:0,thisYearInDatas:[],thisYearOutDatas:[],historyInDatas:[],historyOutDatas:[],mapFullState:!1,inCircleChartFullState:!1,outCircleChartFullState:!1,inLineChartFullState:!1,outLineChartFullState:!1,inConstrastFullState:!1,outConstrastFullState:!1},actions:Ot,mutations:Dt},Rt=(ct={},Object($["a"])(ct,f["a"].GET_ORIGIN_DATA,function(t){var e=t.state;dt({url:"/bigdata/origin/detail",method:"post"}).then(function(t){if(200==t.code){var a=t.repData;e.cityDatas=a.originCity.map(function(t){return{value:t.count,name:t.city}}),e.countStatDatas=a.originCount||[];var n=[];a.originCity.forEach(function(t,e){n[e]=[t.latitude,t.longitude]}),e.mapDatas=a.originCity.map(function(t,e){return{value:n[e].concat(t.count),name:t.city}})}else e.cityDatas=[],e.countStatDatas=[],e.mapDatas=[]})}),Object($["a"])(ct,f["a"].GET_ORIGIN_LIST_DATA,function(t,e){var a=t.state;1==e.currentPage&&(a.addressList=[]);var n={currentPage:e.currentPage,originDate:e.originDate||""};dt({url:"/bigdata/origin/pageList",method:"post",data:n}).then(function(t){if(200==t.code){var n=t.repData;a.addressList=n.originList,a.totalPage=n.pageInfo.totalPages,a.currentPage=e.currentPage,a.originDate=e.originDate}})}),ct),wt=(ut={},Object($["a"])(ut,f["a"].ORIGIN_CHANGE_FULL_STATE,function(t,e){t[e.fullStateName]=e.state}),Object($["a"])(ut,f["a"].ORIGIN_REAL_TIME_DATA,function(t,e){var a=e.type,n=e.data;1==a?t.addressList[0].list.unshift(n):2==a&&t.addressList.unshift(n)}),ut),yt={namespaced:!0,state:{cityDatas:[],countStatDatas:[],addressList:[],totalPage:1,currentPage:1,originDate:"",mapDatas:[],mapFullState:!1,cityRankFullState:!1,countStateFullState:!1},actions:Rt,mutations:wt},Ft=(lt={},Object($["a"])(lt,J["a"].HOME,ft),Object($["a"])(lt,J["a"].IOT,Tt),Object($["a"])(lt,J["a"].PLANT,At),Object($["a"])(lt,J["a"].FARMING,bt),Object($["a"])(lt,J["a"].WAREHOUSE,St),Object($["a"])(lt,J["a"].ORIGIN,yt),lt);n["default"].use(h["b"]);var Ct=localStorage,Nt=new h["b"].Store({state:{winHeight:0,winWidth:0,currRouter:{from:"",to:"",query:null,instance:null},chartFullPage:!1,loading:!1,screenFullState:!1,windowResizeState:0,userToken:Ct.getItem(z["a"].userToken)||"",userId:Ct.getItem(z["a"].userId)||"",userName:Ct.getItem(z["a"].userName)||"",userRole:Ct.getItem(z["a"].userRole)||""},mutations:Z,modules:Ft}),kt=a("1e6f");n["default"].use(kt["a"]);var Gt=new kt["a"]({base:"",linkActiveClass:"active",routes:[{path:"/login",name:"login",component:function(){return a.e("chunk-293b0e84").then(a.bind(null,"e426"))}},{path:"/home",name:"home",component:function(){return Promise.all([a.e("chunk-5b519a3c"),a.e("chunk-50eba7f3"),a.e("chunk-62e2f1a4")]).then(a.bind(null,"8a00"))}},{path:"/iot",name:"iot",component:function(){return Promise.all([a.e("chunk-5b519a3c"),a.e("chunk-2514576c")]).then(a.bind(null,"ecf9"))}},{path:"/plant",name:"plant",component:function(){return Promise.all([a.e("chunk-5b519a3c"),a.e("chunk-d0041948")]).then(a.bind(null,"3501"))}},{path:"/farming",name:"farming",component:function(){return Promise.all([a.e("chunk-5b519a3c"),a.e("chunk-ae8b0af6")]).then(a.bind(null,"af20"))}},{path:"/warehouse",name:"warehouse",component:function(){return Promise.all([a.e("chunk-5b519a3c"),a.e("chunk-72507f84")]).then(a.bind(null,"bc30"))}},{path:"/origin",name:"origin",component:function(){return Promise.all([a.e("chunk-5b519a3c"),a.e("chunk-50eba7f3"),a.e("chunk-64109cc9")]).then(a.bind(null,"7f36"))}},{path:"*",redirect:{name:"home"}}]});Gt.beforeEach(function(t,e,a){Nt.commit({type:f["a"].SET_CURR_ROUTER,from:e.name,to:t.name,query:t.query,instance:Gt}),t.name&&t.name!==e.name&&Nt.commit(f["a"].SWITCH_LOADING,!0),a(!0)});var Pt=Gt,Ht=a("12f8"),Ut=a.n(Ht),Lt=(a("6fe9"),a("e1ad"),a("18da"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"plane",class:{"full-screen":t.full}},[a("canvas",{ref:"bg"}),t._t("default")],2)}),Mt=[],xt=["rgba(53, 121, 255, 0.15)","rgba(18, 35, 87, 0.5)","rgba(53, 121, 255, 0.2)"],jt={name:"Plane",props:{full:{type:Boolean,default:!1}},watch:{full:function(){var t=this;setTimeout(function(){t.draw()},500)}},mounted:function(){var t=this;t.$nextTick(function(){t.draw(),window.addEventListener("resize",t.draw)})},methods:{draw:function(){var t=this,e=t.$el,a=getComputedStyle(e,null),n=parseInt(a.width),i=parseInt(a.height);if(isNaN(n)||isNaN(i))setTimeout(function(){t.draw()},1e3);else{var r=t.$refs.bg;r.width=n,r.height=i;var o=r.getContext("2d");o.clearRect(0,0,n,i);var s=4,c=.5;o.strokeStyle=xt[0],o.fillStyle=xt[1],o.lineWidth=1,o.beginPath(),o.moveTo(s,c),o.lineTo(n-s-.5,c),o.quadraticCurveTo(n-.5,c,n-.5,c+s),o.lineTo(n-.5,i-s),o.quadraticCurveTo(n-.5,i-.5,n-s-.5,i-.5),o.lineTo(s,i-.5),o.quadraticCurveTo(.5,i-.5,.5,i-s-.5),o.lineTo(.5,s),o.quadraticCurveTo(.5,c,s,c),o.stroke(),o.fill();var u=9;o.strokeStyle=xt[2],o.lineWidth=2,o.beginPath(),o.moveTo(.5,s+u),o.lineTo(.5,s),o.quadraticCurveTo(.5,c,s,c),o.lineTo(s+u,c),o.moveTo(n-s-.5-u,c),o.lineTo(n-s-.5,c),o.quadraticCurveTo(n-.5,c,n-.5,c+s),o.lineTo(n-.5,c+s+u),o.moveTo(n-.5,i-s-u),o.lineTo(n-.5,i-s),o.quadraticCurveTo(n-.5,i-.5,n-s-.5,i-.5),o.lineTo(n-s-.5-u,i-.5),o.moveTo(s+u,i-.5),o.lineTo(s,i-.5),o.quadraticCurveTo(.5,i-.5,.5,i-s-.5),o.lineTo(.5,i-s-.5-u),o.stroke()}}},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.draw)}},Wt=jt,Yt=Object(u["a"])(Wt,Lt,Mt,!1,null,null,null),qt=Yt.exports,$t=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h2",{staticClass:"plane-title"},[a("i"),t._t("default")],2)},zt=[],Vt={},Bt=Object(u["a"])(Vt,$t,zt,!1,null,null,null),Kt=Bt.exports,Zt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-tools"},[a("i",{staticClass:"iconfont full-icon",domProps:{innerHTML:t._s(t.full?"&#xe621;":"&#xe629;")},on:{click:function(e){return t.change()}}}),a("i",{staticClass:"iconfont download-icon",on:{click:function(e){return t.download()}}},[t._v("")])])},Jt=[],Xt={name:"PlaneTools",props:{full:{type:Boolean,default:!1}},methods:{change:function(){var t=this;t.$emit("change",!t.full)},download:function(){var t=this,e=t.$el,a=e.parentNode,n=a.querySelectorAll(".plane-content canvas");if(n.length||(n=a.querySelectorAll(".wuyishan-map-container canvas")),n.length){var i=a.querySelector(".plane-title"),r=i?i.innerText:Math.random().toString(36).substr(2),o=0,s=0;n.forEach(function(t){t.height>s&&(s=t.height),o+=t.width}),o+=40+10*(n.length-1),s+=40;var c=document.createElement("canvas");c.width=o,c.height=s;var u=c.getContext("2d");u.fillStyle="rgba(18, 35, 87, 0.98)",u.fillRect(0,0,o,s);for(var l=20,d=null,m=0;m<n.length;m++)d=n[m],u.drawImage(d,l,20,d.width,d.height),l=l+d.width+10;var h=document.createElement("a");h.download=r,h.href=c.toDataURL("image/png"),document.body.appendChild(h),h.click(),h.remove()}}}},Qt=Xt,te=Object(u["a"])(Qt,Zt,Jt,!1,null,null,null),ee=te.exports,ae=(a("b5ad"),a("59fa"),a("ea65"),a("f8c5"),{camera:[J["a"].HOME,J["a"].IOT],craft:[J["a"].HOME],farm:[J["a"].FARMING],fm1:[J["a"].HOME,J["a"].IOT],fm2:[J["a"].HOME,J["a"].IOT],plant:[J["a"].HOME,J["a"].PLANT,J["a"].FARMING],stock:[J["a"].WAREHOUSE,J["a"].HOME],pick:[J["a"].HOME,J["a"].PLANT]}),ne=null,ie="",re=new WebSocket(tt["a"].socketUrl);function oe(t){var e=Nt.state.currRouter.to;t==e&&(t==J["a"].HOME?Nt.dispatch(J["a"].HOME+"/"+f["a"].HOME_GET_DATA):t==J["a"].IOT?Nt.dispatch(J["a"].IOT+"/"+f["a"].GET_IOT_DATA):t==J["a"].PLANT?Nt.dispatch(J["a"].PLANT+"/"+f["a"].PLANT_GET_DATA):t==J["a"].FARMING?Nt.dispatch(J["a"].FARMING+"/"+f["a"].FARMING_GET_DATA):t==J["a"].WAREHOUSE&&Nt.dispatch(J["a"].WAREHOUSE+"/"+f["a"].WAREHOUSE_GET_DATA)),ne=null,ie=""}re.onopen=function(t){console.log("origin web socket open...")},re.onmessage=function(t){var e=t.data,a=Nt.state.currRouter.to;if(e.startsWith("change:")){var n=e.slice(8,-1).split(","),i=new Set([]);n.forEach(function(t){ae[t]&&ae[t].forEach(function(t){i.add(t)})}),i.has(a)&&(console.log("needRefresh...."),ne&&ie!=a&&(clearTimeout(ne),console.log("cancel page：",ie," refresh...")),ie!=a&&(ie=a,ne=setTimeout(function(){oe(a)},3e3)))}else if(e.startsWith("{")&&/(home|origin)/.test(a)){var r=Nt.state[J["a"].ORIGIN];try{var o=JSON.parse(t.data);"home"==a?Nt.dispatch(J["a"].HOME+"/"+f["a"].HOME_GET_DATA):(Nt.dispatch(J["a"].ORIGIN+"/"+f["a"].GET_ORIGIN_DATA),r.addressList[0]&&o.date==r.addressList[0].date?Nt.commit(J["a"].ORIGIN+"/"+f["a"].ORIGIN_REAL_TIME_DATA,{type:1,data:o}):Nt.commit(J["a"].ORIGIN+"/"+f["a"].ORIGIN_REAL_TIME_DATA,{type:2,data:{date:o.date,list:[o]}}))}catch(s){console.log(t.data,s)}}},re.onerror=function(t){console.log("socket error....",t)},re.onclose=function(t){console.log("socket close....",t)},re.send=function(t){console.log("send successful...",t)};var se=re;n["default"].config.productionTip=!1,n["default"].prototype.$ajax=dt,n["default"].prototype.$socket=se,n["default"].use(Ut.a),n["default"].component("Plane",qt),n["default"].component("PlaneTitle",Kt),n["default"].component("PlaneTools",ee),new n["default"]({router:Pt,store:Nt,render:function(t){return t(q)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("2b2a"),i=a.n(n);i.a},eb57:function(t,e,a){"use strict";a("0b9e");var n=["SWITCH_LOADING","SWITCH_SCREEN_FULL","GET_WINDOW_SIZE","SET_CURR_ROUTER","UPDATE_USER_INFO","CLEAR_USER_INFO","GET_IOT_DATA","CHANGE_ACTIVE_IOT_TYPE","CHANGE_ACTIVE_MARKER","GET_FM1_DATA","SWITCH_FM1_TYPE","SWITCH_FM1_TIME_TYPE","GET_FM2_DATA","GET_FM2_CHART_DATA","SWITCH_FM2_TYPE","SWITCH_FM2_TIME_TYPE","SWITCH_WF_TYPE","SWITCH_WF_TIME_TYPE","IOT_CHANGE_FULL_STATE","CHANGE_PHOTO_VIEW_URL","IOT_TYPE_FM1","IOT_TYPE_FM2","IOT_TYPE_GUN","IOT_TYPE_SPHERE","IOT_TYPE_WF","IOT_TYPE_360","CHANGE_PHOTO_VIEW_URL","GET_GUN_DATA","CHANGE_GUN_DIRECTION","GET_360_DATA","ORIGIN_REAL_TIME_DATA","FARMING_CHANGE_CURR_REGION","FARMING_GET_DATA","FARMING_CHANGE_FULL_STATE","WAREHOUSE_CHANGE_CURR_REGION","WAREHOUSE_GET_DATA","WAREHOUSE_CHANGE_FULL_STATE","PLANT_CHANGE_CURR_REGION","PLANT_GET_DATA","PLANT_CHANGE_FULL_STATE","HOME_CHANGE_CURR_REGION","HOME_GET_DATA","HOME_CHANGE_FULL_STATE","ORIGIN_CHANGE_FULL_STATE","GET_ORIGIN_DATA","GET_ORIGIN_LIST_DATA"],i={};n.forEach(function(t){i[t]=t}),e["a"]=i},ecac:function(t,e,a){"use strict";var n="tea-sys-client";e["a"]={userToken:"".concat(n,"-token"),userId:"".concat(n,"-userid"),userRole:"".concat(n,"-userrole"),userName:"".concat(n,"-username"),password:"".concat(n,"-password")}}});