(function(t){function a(a){for(var n,r,s=a[0],c=a[1],u=a[2],l=0,d=[];l<s.length;l++)r=s[l],i[r]&&d.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);m&&m(a);while(d.length)d.shift()();return o.push.apply(o,u||[]),e()}function e(){for(var t,a=0;a<o.length;a++){for(var e=o[a],n=!0,r=1;r<e.length;r++){var s=e[r];0!==i[s]&&(n=!1)}n&&(o.splice(a--,1),t=c(c.s=e[0]))}return t}var n={},r={app:0},i={app:0},o=[];function s(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-e4c029e8":"b022027d","chunk-54f65e34":"7dabe5bc","chunk-6b294a7e":"2e0fc028","chunk-20a3dbf2":"3a3169d2","chunk-bb753b2a":"9b568045","chunk-85a73d78":"a5f71424","chunk-a1452faa":"1e632205","chunk-acdae08a":"a965af75"}[t]+".js"}function c(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,c),e.l=!0,e.exports}c.e=function(t){var a=[],e={"chunk-54f65e34":1,"chunk-20a3dbf2":1,"chunk-bb753b2a":1,"chunk-85a73d78":1,"chunk-a1452faa":1,"chunk-acdae08a":1};r[t]?a.push(r[t]):0!==r[t]&&e[t]&&a.push(r[t]=new Promise(function(a,e){for(var n="css/"+({}[t]||t)+"."+{"chunk-e4c029e8":"31d6cfe0","chunk-54f65e34":"2e4b8643","chunk-6b294a7e":"31d6cfe0","chunk-20a3dbf2":"18290466","chunk-bb753b2a":"0c8137bc","chunk-85a73d78":"f9179014","chunk-a1452faa":"b45e3f1b","chunk-acdae08a":"8bc96785"}[t]+".css",r=c.p+n,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var s=i[o],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===n||u===r))return a()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){s=l[o],u=s.getAttribute("data-href");if(u===n||u===r)return a()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=a,d.onerror=function(a){var n=a&&a.target&&a.target.src||r,i=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");i.request=n,e(i)},d.href=r;var m=document.getElementsByTagName("head")[0];m.appendChild(d)}).then(function(){r[t]=0}));var n=i[t];if(0!==n)if(n)a.push(n[2]);else{var o=new Promise(function(a,e){n=i[t]=[a,e]});a.push(n[2]=o);var u,l=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(t),u=function(a){d.onerror=d.onload=null,clearTimeout(m);var e=i[t];if(0!==e){if(e){var n=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.src,o=new Error("Loading chunk "+t+" failed.\n("+n+": "+r+")");o.type=n,o.request=r,e[1](o)}i[t]=void 0}};var m=setTimeout(function(){u({type:"timeout",target:d})},12e4);d.onerror=d.onload=u,l.appendChild(d)}return Promise.all(a)},c.m=t,c.c=n,c.d=function(t,a,e){c.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,a){if(1&a&&(t=c(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(c.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var n in t)c.d(e,n,function(a){return t[a]}.bind(null,n));return e},c.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(a,"a",a),a},c.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},c.p="",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=a,u=u.slice();for(var d=0;d<u.length;d++)a(u[d]);var m=l;o.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"0706":function(t,a,e){"use strict";a["a"]={HOME:"home",IOT:"iot",FARMING:"farming",PLANT:"plant",WAREHOUSE:"warehouse",ORIGIN:"origin"}},"56d7":function(t,a,e){"use strict";e.r(a);e("cadf"),e("551c"),e("097d");var n=e("2b0e"),r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{style:{height:t.winHeight+"px"},attrs:{id:"app"}},[e("Sky"),e("NavMenu"),e("router-view",{style:{height:t.pageHeight+"px"}}),e("Spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]})],1)},i=[],o=e("be94"),s=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},c=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"spinner-wrap"},[e("div",{staticClass:"spinner"},[e("div",{staticClass:"spinner-container container1"},[e("div",{staticClass:"circle1"}),e("div",{staticClass:"circle2"}),e("div",{staticClass:"circle3"}),e("div",{staticClass:"circle4"})]),e("div",{staticClass:"spinner-container container2"},[e("div",{staticClass:"circle1"}),e("div",{staticClass:"circle2"}),e("div",{staticClass:"circle3"}),e("div",{staticClass:"circle4"})]),e("div",{staticClass:"spinner-container container3"},[e("div",{staticClass:"circle1"}),e("div",{staticClass:"circle2"}),e("div",{staticClass:"circle3"}),e("div",{staticClass:"circle4"})])])])}],u=e("2877"),l={},d=Object(u["a"])(l,s,c,!1,null,null,null);d.options.__file="Spinner.vue";var m=d.exports,f={getMonitorData:"./api-json/monitor.json",getFmsData:"./api-json/fms.json",getFmsHourChartData:"./api-json/iot.hour.json",getFmsWeekChartData:"./api-json/iot.week.json",home:"/data/monitor/selectStation"},h=e("2f62"),p=e("eb57"),_=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"nav-menu"},[t._m(0),e("ul",{staticClass:"menu"},[e("router-link",{attrs:{tag:"li",to:{name:"home"}}},[t._v("智慧全息")]),e("router-link",{attrs:{tag:"li",to:{name:"iot"}}},[t._v("物联监控")]),e("router-link",{attrs:{tag:"li",to:{name:"plant"}}},[t._v("种植分布")]),e("router-link",{attrs:{tag:"li",to:{name:"farming"}}},[t._v("农事活动")]),e("router-link",{attrs:{tag:"li",to:{name:"warehouse"}}},[t._v("出库入库")]),e("router-link",{attrs:{tag:"li",to:{name:"origin"}}},[t._v("溯源数据")])],1),e("AppTitle")],1)},T=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"logo"},[e("div",[t._v("智所未见 尽在未来")])])}],E=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"app-title"},[e("canvas",{ref:"bg"}),e("h3",[t._v("武夷山市智慧茗园数据平台")])])},A=[],v={name:"app-title",mounted:function(){var t=this;t.$nextTick(function(){t.draw(),window.addEventListener("resize",t.draw)})},methods:{draw:function(){var t=this,a=window.getComputedStyle(t.$el,null),e=parseInt(a.width),n=parseInt(a.height);if(isNaN(e)||isNaN(n))setTimeout(function(){t.draw()},1e3);else{var r=t.$refs.bg;r.width=e,r.height=n;var i=r.getContext("2d"),o=e-2,s=n-1;i.clearRect(0,0,e,n),i.beginPath(),i.strokeStyle="rgba(53, 121, 255, 0.25)",i.lineWidth=2,i.moveTo(o,s),i.lineTo(24,s),i.lineTo(0,49.5),i.stroke(),i.beginPath(),i.lineWidth=4,i.moveTo(19,s-9),i.lineTo(o,s-9),i.stroke(),i.beginPath(),i.lineWidth=6,i.moveTo(0,s-1),i.lineTo(6,s-1),i.stroke()}}},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.draw)}},D=v,g=Object(u["a"])(D,E,A,!1,null,null,null);g.options.__file="AppTitle.vue";var b=g.exports,O={name:"NavMenu",components:{AppTitle:b}},S=O,I=Object(u["a"])(S,_,T,!1,null,null,null);I.options.__file="NavMenu.vue";var R=I.exports,F=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("canvas",{staticClass:"app-bg"})},w=[],y=(e("6c7b"),e("d4ec")),C=e("bee2"),N=680;function G(t,a){if(arguments.length<2&&(a=t,t=0),t>a){var e=a;a=t,t=e}return Math.floor(Math.random()*(a-t+1))+t}function k(t,a){var e=Math.max(t,a),n=Math.round(Math.sqrt(e*e+e*e));return n/2}var H=function(){function t(a,e,n,r,i){Object(y["a"])(this,t),this.ctx=n,this.ctx2=r,this.canvas2=i,this.orbitRadius=G(k(a,e)),this.radius=G(60,this.orbitRadius)/15,this.radius>19&&(this.radius=19),this.orbitX=a/2,this.orbitY=e/2,this.timePassed=G(0,N),this.speed=G(this.orbitRadius)/605e3,this.alpha=G(2,10)/10}return Object(C["a"])(t,[{key:"draw",value:function(){var t=Math.sin(this.timePassed)*this.orbitRadius+this.orbitX,a=Math.cos(this.timePassed)*this.orbitRadius+this.orbitY;this.ctx.globalAlpha=this.alpha,this.ctx.drawImage(this.canvas2,t-this.radius/2,a-this.radius/2,this.radius,this.radius),this.timePassed+=this.speed}}]),t}(),U=window,P={data:function(){return{stars:[],ctx:null,hue:0,w:0,h:0,requestId:null}},created:function(){U.requestAnimationFrame=U.requestAnimationFrame||U.webkitRequestAnimationFrame||U.mozRequestAnimationFrame||U.msRequestAnimationFrame,U.cancelAnimationFrame=U.cancelAnimationFrame||U.webkitCancelAnimationFrame||U.mozCancelAnimationFrame||U.msCancelAnimationFrame},mounted:function(){var t=this;t.$nextTick(function(){var a=t.$el;t.ctx=a.getContext("2d"),t.draw()}),U.addEventListener("resize",t.doResize)},methods:{doResize:function(){var t=this;t.requestId&&U.cancelAnimationFrame(t.requestId),t.ctx.clearRect(0,0,t.w,t.h),t.draw()},draw:function(){var t=this,a=t.$el,e=t.ctx,n=t.w=a.width=window.innerWidth,r=t.h=a.height=window.innerHeight,i=t.hue=217,o=680,s=document.createElement("canvas"),c=s.getContext("2d");s.width=100,s.height=100;var u=s.width/2,l=c.createRadialGradient(u,u,0,u,u,u);l.addColorStop(.025,"#fff"),l.addColorStop(.1,"hsl("+i+", 61%, 33%)"),l.addColorStop(.25,"hsl("+i+", 64%, 6%)"),l.addColorStop(1,"transparent"),c.fillStyle=l,c.beginPath(),c.arc(u,u,u,0,2*Math.PI),c.fill(),t.stars=[];for(var d=0;d<o;d++)t.stars.push(new H(n,r,e,c,s));t.animation()},animation:function(){var t=this,a=t.ctx;a.globalCompositeOperation="source-over",a.globalAlpha=.8,a.fillStyle="hsla("+t.hue+", 64%, 6%, 0.9)",a.fillRect(0,0,t.w,t.h),a.globalCompositeOperation="lighter";for(var e=1,n=t.stars.length;e<n;e++)t.stars[e].draw();t.requestId=U.requestAnimationFrame(t.animation)}},beforeDestroy:function(){var t=this;t.requestId&&U.cancelAnimationFrame(t.requestId),window.removeEventListener("onresize",t.doResize)}},L=P,x=Object(u["a"])(L,F,w,!1,null,null,null);x.options.__file="Sky.vue";var M=x.exports,j={name:"app",components:{Spinner:m,NavMenu:R,Sky:M},data:function(){return{}},computed:Object(o["a"])({},Object(h["c"])(["loading","winHeight","screenFullState"]),{pageHeight:function(){var t=this.$store.state,a=t.winHeight-105;return a>540?a:540}}),created:function(){var t=this,a=t.$store,e=window;e.addEventListener("resize",function(){a.commit(p["a"].GET_WINDOW_SIZE)}),a.commit(p["a"].GET_WINDOW_SIZE)}},W=j,Y=(e("5c0b"),Object(u["a"])(W,r,i,!1,null,null,null));Y.options.__file="App.vue";var q,z=Y.exports,V=(e("7f7f"),e("ade3")),$=window,K=document,B=(q={},Object(V["a"])(q,p["a"].SWITCH_LOADING,function(t,a){t.loading=a}),Object(V["a"])(q,p["a"].SWITCH_SCREEN_FULL,function(t,a){t.screenFullState=a}),Object(V["a"])(q,p["a"].GET_WINDOW_SIZE,function(t){t.winHeight=K.documentElement.clientHeight||$.innerHeight,t.winWidth=K.documentElement.clientWidth||$.innerWidth,K.body.style.minHeight=t.winHeight+"px",t.windowResizeState=t.windowResizeState+1}),Object(V["a"])(q,p["a"].SET_CURR_ROUTER,function(t,a){var e=t.currRouter;e.from=a.from,e.to=a.to,e.query=a.query,e.instance=a.instance,e.to||(t.loading=!1,t.screenFullState=!1)}),q),Z=e("0706"),J=(e("6d67"),e("55dd"),e("bc3a")),X=e.n(J),Q=e("4328");X.a.defaults.baseURL="",X.a.interceptors.request.use(function(t){return t},function(t){return Promise.reject(t)}),X.a.interceptors.response.use(function(t){return Promise.resolve(t)},function(t){return Promise.reject(t)});var tt,at,et,nt,rt,it,ot,st,ct,ut=function(t){return/post/i.test(t.method)&&!t.headers&&(t.headers={"Content-Type":"application/x-www-form-urlencoded"},t.data=Q.stringify(t.data)),new Promise(function(a,e){X.a.request(t).then(function(t){a(t.data)},function(t){e(t)})})},lt=e("f1ed"),dt=Object(V["a"])({},p["a"].HOME_GET_AMOUNT_RANK_DATA,function(t,a){var e=a?{addr:a||""}:"";ut({url:lt["a"].globeURL+"/bigdata/home/detail",method:"post",data:e}).then(function(a){t.state.amountRankDatas=a.repData.planting.sort(function(t,a){return t.area>a.area?1:-1}),t.state.farmingActdatas=a.repData.fertiliz.map(function(t){return{label:t.month,value:t.weight}});var e=0;t.state.pickDatas=a.repData.picking.map(function(t){return e=t.amount,{label:t.classify,value:e}}),t.state.teaTotalAmount=a.repData.totalPicking;var n={};n.in=a.repData.inStock,n.out=a.repData.inStock,t.state.warehouseDatas=n;var r=a.repData.origin.map(function(t){return{value:t.counts,name:t.cityname}});t.state.cityDatas=r,t.state.cameraAmount=a.repData.cameraCount.count,t.state.monitorAmount=a.repData.fielddstation.count,t.state.waterFertilizerAmount=0,t.state.levelDatas=a.repData.craft})}),mt=(tt={},Object(V["a"])(tt,p["a"].HOME_CHANGE_CURR_REGION,function(t,a){t.currSelectedRegion=a}),Object(V["a"])(tt,p["a"].HOME_CHANGE_FULL_STATE,function(t,a){t[a.fullStateName]=a.state}),tt),ft={namespaced:!0,state:{cameraAmount:116,monitorAmount:234,waterFertilizerAmount:205,farmingActdatas:[],pickDatas:[],teaTotalAmount:"",levelDatas:[],amountRankUnit:"亩",amountRankDatas:[],warehouseUnit:"吨",warehouseDatas:[],cityDatas:[],currSelectedRegion:"",amountRankFullState:!1,farmingInfoFullState:!1,pickInfoFullState:!1,warehouseFullState:!1,originDataFullState:!1,levelInfoFullState:!1,mapFullState:!1},actions:dt,mutations:mt},ht=(e("ac6a"),e("f3e2"),at={},Object(V["a"])(at,p["a"].GET_IOT_DATA,function(t,a){ut({url:lt["a"].globeURL+"/data/monitor/selectStation",method:"post"}).then(function(e){e.repData.cameraVos.map(function(t){t.type="1"==t.camera_type?p["a"].IOT_TYPE_GUN:p["a"].IOT_TYPE_360,t.isActive=!1}),e.repData.emVos.map(function(t){t.type=p["a"].IOT_TYPE_SPHERE,t.isActive=!1}),e.repData.Fm1.map(function(t){t.type=p["a"].IOT_TYPE_FM1,t.isActive=!1}),e.repData.Fm2.map(function(t){t.type=p["a"].IOT_TYPE_FM2,t.isActive=!1});var n=[],r=0;if(a)if("camera"==a){n=e.repData.cameraVos,n.map(function(t,a){t.index=a});for(var i=0;i<n.length;){if("1"==n[i].camera_type){r=i;break}i++}t.state.camera=e.repData.cameraVos[r],t.commit(p["a"].CHANGE_ACTIVE_MARKER,{id:r,type:p["a"].IOT_TYPE_GUN}),t.dispatch(p["a"].GET_GUN_DATA,e.repData.cameraVos[r])}else n=e.repData.Fm1.concat(e.repData.emVos).concat(e.repData.Fm2),n.map(function(t,a){t.index=a}),t.dispatch(p["a"].GET_FM1_DATA,n[0].sno),t.commit(p["a"].CHANGE_ACTIVE_MARKER,{id:0,type:p["a"].IOT_TYPE_FM1});else n=e.repData.Fm1.concat(e.repData.emVos).concat(e.repData.Fm2).concat(e.repData.cameraVos),n.map(function(t,a){t.index=a}),t.dispatch(p["a"].GET_FM1_DATA,n[0].sno),t.dispatch(p["a"].GET_FM1_CHART_DATA);n[r].isActive=!0,t.state.cameraAmount=e.repData.cameraVos.length,t.state.monitorAmount=e.repData.Fm1.length+e.repData.Fm2.length+e.repData.emVos.length,t.state.iotDatas=n})}),Object(V["a"])(at,p["a"].GET_FM1_DATA,function(t,a){var e=t.state,n=e.fm1,r=e.fm1.time,i=e.fm1.type;t.state.fm1.sno=a||t.state.fm1.sno,ut({url:lt["a"].globeURL+"/data/monitor/getflddata?sno="+t.state.fm1.sno,method:"post"}).then(function(t){if("HOUR"==r){t.repData.todayData.length;var a=[];"temperature"==i?(t.repData.todayData.forEach(function(t){return a.push({title:t.flddata_txtime,data:t.flddata_temp}),a}),e.fm1.chartDatas=a):"humidity"==i?(t.repData.todayData.forEach(function(t){return a.push({title:t.flddata_txtime,data:t.flddata_humid}),a}),e.fm1.chartDatas=a):"light"==i?(t.repData.todayData.forEach(function(t){return a.push({title:t.flddata_txtime,data:t.flddata_sunlux}),a}),e.fm1.chartDatas=a):"pressure"==i&&(t.repData.todayData.forEach(function(t){return a.push({title:t.flddata_txtime,data:t.flddata_pa}),a}),e.fm1.chartDatas=a)}else if("WEEK"==r){var o=t.repData.sevenData.length-1;n.data.temperature=t.repData.sevenData[o].flddata_temp.toFixed(2),n.data.humidity=t.repData.sevenData[o].flddata_humid.toFixed(2),n.data.light=t.repData.sevenData[o].flddata_sunlux.toFixed(2),n.data.pressure=t.repData.sevenData[o].flddata_pa.toFixed(2);var s=[];"temperature"==i?(t.repData.sevenData.forEach(function(t){return s.push({title:t.days,data:t.flddata_temp.toFixed(2)}),s}),e.fm1.chartDatas=s):"humidity"==i?(t.repData.sevenData.forEach(function(t){return s.push({title:t.days,data:t.flddata_humid.toFixed(2)}),s}),e.fm1.chartDatas=s):"light"==i?(t.repData.sevenData.forEach(function(t){return s.push({title:t.days,data:t.flddata_sunlux.toFixed(2)}),s}),e.fm1.chartDatas=s):"pressure"==i&&(t.repData.sevenData.forEach(function(t){return s.push({title:t.days,data:t.flddata_pa.toFixed(2)}),s}),e.fm1.chartDatas=s)}})}),Object(V["a"])(at,p["a"].GET_FM1_CHART_DATA,function(t){var a=t.state,e=a.fm1,n=a.fm1.time;ut({url:lt["a"].globeURL+"/data/momitor/getflddataLast?sno="+t.state.fm1.sno,method:"post"}).then(function(t){"HOUR"==n&&(e.data.temperature=t.repData.data.flddata_temp,e.data.humidity=t.repData.data.flddata_humid,e.data.light=t.repData.data.flddata_sunlux,e.data.pressure=t.repData.data.flddata_pa,console.log(e))})}),Object(V["a"])(at,p["a"].GET_FM2_DATA,function(t,a){var e=t.state,n=e.fm2,r=e.fm2.time,i=e.fm2.type;t.state.fm2.sno=a||t.state.fm2.sno,ut({url:lt["a"].globeURL+"/data/monitor/getFmbData?sno="+t.state.fm2.sno,method:"post"}).then(function(t){if("HOUR"==r){var a=t.repData.todayData.length-1;n.data.temperature=parseInt(t.repData.todayData[a].soiltemp).toFixed(2),n.data.humidity=parseInt(t.repData.todayData[a].soilmture).toFixed(2),n.data.wind=parseInt(t.repData.todayData[a].windspd).toFixed(2),n.data.rain=parseInt(t.repData.todayData[a].rain).toFixed(2);var o=[];"temperature"==i?(t.repData.todayData.forEach(function(t){return o.push({title:t.txtime,data:parseInt(t.soiltemp).toFixed(2)}),o}),e.fm2.chartDatas=o):"humidity"==i?(t.repData.todayData.forEach(function(t){return o.push({title:t.txtime,data:parseInt(t.soilmture).toFixed(2)}),o}),e.fm2.chartDatas=o):"wind"==i?(t.repData.todayData.forEach(function(t){return o.push({title:t.txtime,data:parseInt(t.windspd).toFixed(2),rotate:parseInt(t.winddir).toFixed(2)}),o}),e.fm2.chartDatas=o):"rain"==i&&(t.repData.todayData.forEach(function(t){return o.push({title:t.txtime,data:parseInt(t.rain).toFixed(2)}),o}),e.fm2.chartDatas=o)}else if("WEEK"==r){var s=t.repData.sevenData.length-1;n.data.temperature=parseInt(t.repData.sevenData[s].soiltemp).toFixed(2),n.data.humidity=parseInt(t.repData.sevenData[s].soilmture).toFixed(2),n.data.wind=parseInt(t.repData.sevenData[s].windspd).toFixed(2),n.data.rain=parseInt(t.repData.sevenData[s].rain).toFixed(2);var c=[];"temperature"==i?(t.repData.sevenData.forEach(function(t){return c.push({title:t.days,data:parseInt(t.soiltemp).toFixed(2)}),c}),e.fm2.chartDatas=c):"humidity"==i?(t.repData.sevenData.forEach(function(t){return c.push({title:t.days,data:parseInt(t.soilmture).toFixed(2)}),c}),e.fm2.chartDatas=c):"wind"==i?(t.repData.sevenData.forEach(function(t){return c.push({title:t.days,data:parseInt(t.windspd).toFixed(2),rotate:parseInt(t.winddir).toFixed(2)}),c}),e.fm2.chartDatas=c):"rain"==i&&(t.repData.sevenData.forEach(function(t){return c.push({title:t.days,data:parseInt(t.rain).toFixed(2)}),c}),e.fm2.chartDatas=c)}})}),Object(V["a"])(at,p["a"].GET_FM2_CHART_DATA,function(t){var a=t.state,e=a.fm2,n=a.fm2.time;ut({url:lt["a"].globeURL+"/data/momitor/getFmbDataLast?sno="+t.state.fm2.sno,method:"post"}).then(function(t){"HOUR"==n&&(e.data.temperature=parseInt(t.repData.soiltemp).toFixed(2),e.data.humidity=parseInt(t.repData.soilmture).toFixed(2),e.data.wind=parseInt(t.repData.windspd).toFixed(2),e.data.rain=parseInt(t.repData.rain).toFixed(2))})}),Object(V["a"])(at,p["a"].GET_WF_DATA,function(t){var a=t.state,e=a.wf;setTimeout(function(){e.data.ec=(2e3*Math.random()).toFixed(2),e.data.ph=(14*Math.random()).toFixed(0),e.data.water=(5e3*Math.random()).toFixed(1),e.data.fertilizer=(3e3*Math.random()).toFixed(1)},1200)}),Object(V["a"])(at,p["a"].GET_WF_CHART_DATA,function(t){var a=t.state,e=a.wf.time,n=a.wf.type,r=50;"ec"==n?r=2e3:"ph"==n?r=14:"water"==n?r=5e3:"fertilizer"==n&&(r=3e3),"HOUR"==e?ut({url:f.getFmsHourChartData}).then(function(t){var e=t.todayBrokenLineList||[];a.wf.chartDatas=e.map(function(t){return{title:"water"==n||"fertilizer"==n?t.month:t.template_txdate,data:parseInt(r*Math.random())}})}):"WEEK"==e&&ut({url:f.getFmsWeekChartData}).then(function(t){var e=t.weekDayBrokenLineList||[];a.wf.chartDatas=e.map(function(t){return{title:"water"==n||"fertilizer"==n?t.month:t.template_txdate,data:parseInt(r*Math.random())}})})}),Object(V["a"])(at,p["a"].CHANGE_PHOTO_VIEW_URL,function(t,a){ut({url:lt["a"].globeURL+"/data/monitor/getemdata?em_devid="+a,method:"post"}).then(function(a){t.state.photoViewUrl=a.repData[11]||t.state.photoViewUrl})}),Object(V["a"])(at,p["a"].GET_GUN_DATA,function(t,a){t.state.camera=a,console.log(a),t.state.videoUrl=27.27==a.address_gislatd?"rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b":t.state.camera.camera_url,console.log(t.state.videoUrl)}),Object(V["a"])(at,p["a"].GET_360_DATA,function(t,a){t.state.camera=a,t.state.videoUrl360=t.state.camera.camera_url}),Object(V["a"])(at,p["a"].CHANGE_GUN_DIRECTION,function(t,a){var e=t.state.camera.camera_sno;parseInt(a);"up"==a?ut({url:lt["a"].globeURL+"/data/momitor/CameraStop?sno="+e,method:"post"}).then(function(t){console.log(t)}):ut({url:lt["a"].globeURL+"/data/momitor/CameraRun?sno="+e+"&direction="+parseInt(a),method:"post"}).then(function(t){console.log(t)})}),at),pt=(et={},Object(V["a"])(et,p["a"].CHANGE_ACTIVE_MARKER,function(t,a){var e=t.currActive;e.Id;e.id=a.id,e.type=a.type}),Object(V["a"])(et,p["a"].SWITCH_FM1_TYPE,function(t,a){var e=t.fm1;e.type=a.value,e.name=a.name,"temperature"==a.value?e.chartUnit="℃":"humidity"==a.value?e.chartUnit="%":"light"==a.value?e.chartUnit="Lux":"pressure"==a.value&&(e.chartUnit="Pa")}),Object(V["a"])(et,p["a"].SWITCH_FM1_TIME_TYPE,function(t,a){t.fm1.time=a}),Object(V["a"])(et,p["a"].SWITCH_FM2_TYPE,function(t,a){var e=t.fm2;e.type=a.value,e.name=a.name,"temperature"==a.value?e.chartUnit="℃":"humidity"==a.value?e.chartUnit="%":"wind"==a.value?e.chartUnit="m/s":"rain"==a.value&&(e.chartUnit="mm")}),Object(V["a"])(et,p["a"].SWITCH_FM2_TIME_TYPE,function(t,a){t.fm2.time=a}),Object(V["a"])(et,p["a"].SWITCH_WF_TYPE,function(t,a){var e=t.wf;e.type=a.value,e.name=a.name,"ec"==a.value?e.chartUnit="mS/cm":"ph"==a.value?e.chartUnit="":"water"==a.value?e.chartUnit="L":"fertilizer"==a.value&&(e.chartUnit="kg")}),Object(V["a"])(et,p["a"].SWITCH_WF_TIME_TYPE,function(t,a){t.wf.time=a}),Object(V["a"])(et,p["a"].IOT_CHANGE_FULL_STATE,function(t,a){t[a.fullStateName]=a.state}),Object(V["a"])(et,p["a"].IOT_TYPE_OF_DISPLAY,function(t,a){t.display=a.fullStateName}),et),_t={namespaced:!0,state:{cameraAmount:0,monitorAmount:0,waterFertilizerAmount:0,iotDatas:[],camera:[],emVos:[],Fm1:[],Fm2:[],photoViewUrl:"./360/01.jpg",currActive:{type:p["a"].IOT_TYPE_FM1,id:"001"},fm1:{type:"temperature",name:"温度",chartUnit:"℃",time:"HOUR",data:{temperature:"12.13",humidity:"52.7",light:"9987.0",pressure:"988.51"},sno:"",chartDatas:[],curveChartFullState:!1},fm2:{type:"wind",name:"风速",chartUnit:"m/s",time:"HOUR",data:{wind:"12",rain:"52",temperature:"17",humidity:"16"},sno:"",chartDatas:[],curveChartFullState:!1},wf:{type:"ec",name:"EC",chartUnit:"mS/cm",time:"HOUR",data:{ec:"12",ph:"7",water:"17",fertilizer:"16"},chartDatas:[],curveChartFullState:!1},photoViewerFullState:!1,videoUrl:"",videoUrl360:"",display:""},actions:ht,mutations:pt},Tt=Object(V["a"])({},p["a"].PLANT_GET_STAT_DATA,function(t,a){var e=a?{addr:a||""}:"",n=[{label:"茶园总数",data:"1322",unit:"家"},{label:"茶园面积",data:"14.2万",unit:"亩"},{label:"预估产量",data:"1988",unit:"吨"}];ut({url:lt["a"].globeURL+"/bigdata/plant/detail",method:"post",data:e}).then(function(a){var e=a.repData;n[0].data=e.gardenCount,n[1].data=e.gardenArea,t.state.totalData=n,t.state.treeAgeDistributeDatas=e.treeAge,t.state.varietiesDatas=e.treeVarieties;for(var r=0,i=0;i<e.treeVarieties.length;i++)r=e.treeVarieties[i].area;t.state.varietiesTotalData=r,t.state.amountRankDatas=e.plantRanking,t.state.teaFarmTypeDatas=e.plantQuality;for(var o=0,s=0;s<e.treeVarieties.length;s++)o=e.treeVarieties[s].area;t.state.farmTotalArea=o})}),Et=(nt={},Object(V["a"])(nt,p["a"].PLANT_CHANGE_CURR_REGION,function(t,a){t.currSelectedRegion=a}),Object(V["a"])(nt,p["a"].PLANT_CHANGE_FULL_STATE,function(t,a){t[a.fullStateName]=a.state}),nt),At={namespaced:!0,state:{currSelectedRegion:"",amountRankUnit:"亩",amountRankDatas:[],farmTotalArea:0,teaFarmTypeDatas:[],varietiesTotalData:0,varietiesDatas:[],treeAgeDistributeUnit:"亩",treeAgeDistributeDatas:[],totalData:[],totalDataFullState:!1,treeAgeFullState:!1,teaVarietiesFullState:!1,plantRankFullState:!1,teaFarmFullState:!1,mapFullState:!1},actions:Tt,mutations:Et},vt=Object(V["a"])({},p["a"].FARMING_GET_PLANT_ACT_DATA,function(t,a){var e=a?{address_country:"武夷山市",address_town:a||""}:{address_country:"武夷山市",address_town:""};ut({url:lt["a"].globeURL+"/data/farm/getData",method:"post",data:e}).then(function(a){200==a.code&&(t.state.plantActPieDatas=a.repData.yearPlant,t.state.plantActLineDatas=a.repData.monthPlant,t.state.fertilizerActPieDatas=a.repData.yearFaramB,t.state.fertilizerActLineDatas=a.repData.monthFaramB,t.state.protectionActPieDatas=a.repData.yearFaramA,t.state.protectionActLineDatas=a.repData.monthFaramA)})}),Dt=(rt={},Object(V["a"])(rt,p["a"].FARMING_CHANGE_CURR_REGION,function(t,a){t.currSelectedRegion=a}),Object(V["a"])(rt,p["a"].FARMING_CHANGE_FULL_STATE,function(t,a){t[a.fullStateName]=a.state}),rt),gt={namespaced:!0,state:{currSelectedRegion:"",plantActPieDatas:[],plantActLineDatas:[],fertilizerActPieDatas:[],fertilizerActLineDatas:[],protectionActPieDatas:[],protectionActLineDatas:[],mapFullState:!1,plantFullState:!1,protectionFullState:!1,fertilizerFullState:!1},actions:vt,mutations:Dt},bt=(e("6b54"),e("87b3"),Object(V["a"])({},p["a"].WAREHOUSE_GET_TODAY_DATA,function(t,a){var e=a?{addr:a||""}:"";ut({url:lt["a"].globeURL+"/bigdata/warehouse/detail",method:"post",data:e}).then(function(a){if(200==a.code){var e=a.repData;t.state.toDayInAmount=e.inStock?e.inStock.weight:0,t.state.toDayOutAmount=e.outStock?e.outStock.weight:0,t.state.thisYearInDatas=e.thisYearInStock.map(function(t){return{label:t.omonth,value:t.weight}}),t.state.thisYearOutDatas=e.thisYearOutStock.map(function(t){return{label:t.omonth,value:t.weight}});var n=[],r=[],i=(new Date).getFullYear();n.push({year:i-1,list:e.lastYearInStock}),n.push({year:i,list:e.thisYearInStock}),console.log(n),t.state.historyInDatas=n.map(function(t){return{year:t.year.toString(),list:t.list.map(function(t){return{label:t.omonth,value:t.weight}})}}),r.push({year:i-1,list:e.lastYearOutStock}),r.push({year:i,list:e.thisYearOutStock}),t.state.historyOutDatas=r.map(function(t){return{year:t.year.toString(),list:t.list.map(function(t){return{label:t.omonth,value:t.weight}})}})}})})),Ot=(it={},Object(V["a"])(it,p["a"].WAREHOUSE_CHANGE_CURR_REGION,function(t,a){t.currSelectedRegion=a}),Object(V["a"])(it,p["a"].WAREHOUSE_CHANGE_FULL_STATE,function(t,a){t[a.fullStateName]=a.state}),it),St={namespaced:!0,state:{currSelectedRegion:"",toDayInAmount:0,toDayOutAmount:0,thisYearInDatas:[],thisYearOutDatas:[],historyInDatas:[],historyOutDatas:[],mapFullState:!1,inCircleChartFullState:!1,outCircleChartFullState:!1,inLineChartFullState:!1,outLineChartFullState:!1,inConstrastFullState:!1,outConstrastFullState:!1},actions:bt,mutations:Ot},It=e("53ca"),Rt=(ot={},Object(V["a"])(ot,p["a"].GET_ORIGIN_DATA,function(t){ut({url:lt["a"].globeURL+"/bigdata/origin/detail",method:"post"}).then(function(a){t.state.cityDatas=a.repData.originCity.map(function(t){return{value:t.count,name:t.city}}),t.state.countStatDatas=a.repData.originCount;var e=[];a.repData.originCity.map(function(t,a){e[a]=[t.latitude,t.longitude]}),t.state.mapDatas=a.repData.originCity.map(function(t,a){return{value:e[a].concat(t.count),name:t.city}})})}),Object(V["a"])(ot,p["a"].GET_ORIGIN_LIST_DATA,function(t,a){1==a.currentPage&&(t.state.addressList=[]);var e={currentPage:a.currentPage,originDate:a.originDate||""};ut({url:lt["a"].globeURL+"/bigdata/origin/pageList",method:"post",data:e}).then(function(e){200==e.code&&(t.state.addressList=e.repData.originList,t.state.totalPage=e.repData.pageInfo.totalPages,t.state.currentPage=a.currentPage,t.state.originDate=a.originDate)})}),Object(V["a"])(ot,p["a"].GETWEBSOCKET,function(t,a){var e="wss://tea.yufengtek.com/tea-IIS-Web/myHandler";t.state.websocket=new WebSocket(e),t.state.websocket.onopen=function(t){},t.state.websocket.onmessage=function(a){console.log(a);var e=Object(It["a"])(a.data);if("string"==e){var n=JSON.parse(a.data);if(n.date==t.state.addressList[0].date)t.state.addressList[0].list.unshift(n);else{var r={date:n.date,list:[n]};t.state.addressList.unshift(r)}}},t.state.websocket.onclose=function(t){console.log(t),console.log("连接关闭")},t.state.websocket.send=function(t){console.log("发送成功")}}),ot),Ft=(st={},Object(V["a"])(st,p["a"].ORIGIN_CHANGE_FULL_STATE,function(t,a){t[a.fullStateName]=a.state}),Object(V["a"])(st,p["a"].WEBSOCKET,function(t,a){t[a.websocket]=a.websocket}),st),wt={namespaced:!0,state:{cityDatas:[],countStatDatas:[],addressList:[],totalPage:1,currentPage:1,originDate:"",websocket:null,mapDatas:[],mapFullState:!1,cityRankFullState:!1,countStateFullState:!1},actions:Rt,mutations:Ft},yt=(ct={},Object(V["a"])(ct,Z["a"].HOME,ft),Object(V["a"])(ct,Z["a"].IOT,_t),Object(V["a"])(ct,Z["a"].PLANT,At),Object(V["a"])(ct,Z["a"].FARMING,gt),Object(V["a"])(ct,Z["a"].WAREHOUSE,St),Object(V["a"])(ct,Z["a"].ORIGIN,wt),ct);n["default"].use(h["b"]);var Ct=new h["b"].Store({state:{winHeight:0,winWidth:0,currRouter:{from:"",to:"",query:null,instance:null},chartFullPage:!1,loading:!1,screenFullState:!1,windowResizeState:0,htttp:"heeppdhf"},mutations:B,modules:yt}),Nt=e("8c4f");n["default"].use(Nt["a"]);var Gt=new Nt["a"]({base:"",linkActiveClass:"active",routes:[{path:"/home",name:"home",component:function(){return Promise.all([e.e("chunk-e4c029e8"),e.e("chunk-6b294a7e"),e.e("chunk-20a3dbf2")]).then(e.bind(null,"8a00"))}},{path:"/iot",name:"iot",component:function(){return Promise.all([e.e("chunk-e4c029e8"),e.e("chunk-85a73d78")]).then(e.bind(null,"ecf9"))}},{path:"/plant",name:"plant",component:function(){return Promise.all([e.e("chunk-e4c029e8"),e.e("chunk-a1452faa")]).then(e.bind(null,"3501"))}},{path:"/farming",name:"farming",component:function(){return Promise.all([e.e("chunk-e4c029e8"),e.e("chunk-54f65e34")]).then(e.bind(null,"af20"))}},{path:"/warehouse",name:"warehouse",component:function(){return Promise.all([e.e("chunk-e4c029e8"),e.e("chunk-acdae08a")]).then(e.bind(null,"bc30"))}},{path:"/origin",name:"origin",component:function(){return Promise.all([e.e("chunk-e4c029e8"),e.e("chunk-6b294a7e"),e.e("chunk-bb753b2a")]).then(e.bind(null,"7f36"))}},{path:"*",redirect:{name:"home"}}]});Gt.beforeEach(function(t,a,e){Ct.commit({type:p["a"].SET_CURR_ROUTER,from:a.name,to:t.name,query:t.query,instance:Gt}),t.name&&t.name!==a.name&&Ct.commit(p["a"].SWITCH_LOADING,!0),e(!0)});var kt=Gt,Ht=e("2901"),Ut=e.n(Ht),Pt=(e("aaf0"),e("fda2"),e("fa71"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"plane",class:{"full-screen":t.full}},[e("canvas",{ref:"bg"}),t._t("default")],2)}),Lt=[],xt=["rgba(53, 121, 255, 0.15)","rgba(18, 35, 87, 0.5)","rgba(53, 121, 255, 0.2)"],Mt={name:"Plane",props:{full:{type:Boolean,default:!1}},watch:{full:function(){var t=this;setTimeout(function(){t.draw()},500)}},mounted:function(){var t=this;t.$nextTick(function(){t.draw(),window.addEventListener("resize",t.draw)})},methods:{draw:function(){var t=this,a=t.$el,e=getComputedStyle(a,null),n=parseInt(e.width),r=parseInt(e.height);if(isNaN(n)||isNaN(r))setTimeout(function(){t.draw()},1e3);else{var i=t.$refs.bg;i.width=n,i.height=r;var o=i.getContext("2d");o.clearRect(0,0,n,r);var s=4,c=.5;o.strokeStyle=xt[0],o.fillStyle=xt[1],o.lineWidth=1,o.beginPath(),o.moveTo(s,c),o.lineTo(n-s-.5,c),o.quadraticCurveTo(n-.5,c,n-.5,c+s),o.lineTo(n-.5,r-s),o.quadraticCurveTo(n-.5,r-.5,n-s-.5,r-.5),o.lineTo(s,r-.5),o.quadraticCurveTo(.5,r-.5,.5,r-s-.5),o.lineTo(.5,s),o.quadraticCurveTo(.5,c,s,c),o.stroke(),o.fill();var u=9;o.strokeStyle=xt[2],o.lineWidth=2,o.beginPath(),o.moveTo(.5,s+u),o.lineTo(.5,s),o.quadraticCurveTo(.5,c,s,c),o.lineTo(s+u,c),o.moveTo(n-s-.5-u,c),o.lineTo(n-s-.5,c),o.quadraticCurveTo(n-.5,c,n-.5,c+s),o.lineTo(n-.5,c+s+u),o.moveTo(n-.5,r-s-u),o.lineTo(n-.5,r-s),o.quadraticCurveTo(n-.5,r-.5,n-s-.5,r-.5),o.lineTo(n-s-.5-u,r-.5),o.moveTo(s+u,r-.5),o.lineTo(s,r-.5),o.quadraticCurveTo(.5,r-.5,.5,r-s-.5),o.lineTo(.5,r-s-.5-u),o.stroke()}}},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.draw)}},jt=Mt,Wt=Object(u["a"])(jt,Pt,Lt,!1,null,null,null);Wt.options.__file="Plane.vue";var Yt=Wt.exports,qt=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("h2",{staticClass:"plane-title"},[e("i"),t._t("default")],2)},zt=[],Vt={},$t=Object(u["a"])(Vt,qt,zt,!1,null,null,null);$t.options.__file="PlaneTitle.vue";var Kt=$t.exports,Bt=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel-tools"},[e("i",{staticClass:"iconfont full-icon",domProps:{innerHTML:t._s(t.full?"&#xe621;":"&#xe629;")},on:{click:function(a){t.change()}}}),e("i",{staticClass:"iconfont download-icon",on:{click:function(a){t.download()}}},[t._v("")])])},Zt=[],Jt={name:"PlaneTools",props:{full:{type:Boolean,default:!1}},created:function(){},methods:{change:function(){var t=this;t.$emit("change",!t.full)},download:function(){var t=this,a=t.$el,e=a.parentNode,n=e.querySelectorAll(".plane-content canvas");if(n.length||(n=e.querySelectorAll(".wuyishan-map-container canvas")),n.length){var r=e.querySelector(".plane-title"),i=r?r.innerText:Math.random().toString(36).substr(2),o=0,s=0;n.forEach(function(t){t.height>s&&(s=t.height),o+=t.width}),o+=40+10*(n.length-1),s+=40;var c=document.createElement("canvas");c.width=o,c.height=s;var u=c.getContext("2d");u.fillStyle="rgba(18, 35, 87, 0.98)",u.fillRect(0,0,o,s);for(var l=20,d=null,m=0;m<n.length;m++)d=n[m],u.drawImage(d,l,20,d.width,d.height),l=l+d.width+10;var f=document.createElement("a");f.download=i,f.href=c.toDataURL("image/png"),document.body.appendChild(f),f.click(),f.remove()}}}},Xt=Jt,Qt=Object(u["a"])(Xt,Bt,Zt,!1,null,null,null);Qt.options.__file="PlaneTools.vue";var ta=Qt.exports;n["default"].config.productionTip=!1,n["default"].prototype.$ajax=ut,n["default"].use(Ut.a),n["default"].component("Plane",Yt),n["default"].component("PlaneTitle",Kt),n["default"].component("PlaneTools",ta),new n["default"]({router:kt,store:Ct,render:function(t){return t(z)}}).$mount("#app")},"5c0b":function(t,a,e){"use strict";var n=e("5e27"),r=e.n(n);r.a},"5e27":function(t,a,e){},eb57:function(t,a,e){"use strict";e("f3e2");var n=["SWITCH_LOADING","SWITCH_SCREEN_FULL","GET_WINDOW_SIZE","SET_CURR_ROUTER","GET_IOT_DATA","CHANGE_ACTIVE_MARKER","GET_FM1_DATA","GET_FM1_CHART_DATA","SWITCH_FM1_TYPE","SWITCH_FM1_TIME_TYPE","GET_FM2_DATA","GET_FM2_CHART_DATA","SWITCH_FM2_TYPE","SWITCH_FM2_TIME_TYPE","GET_WF_DATA","GET_WF_CHART_DATA","SWITCH_WF_TYPE","SWITCH_WF_TIME_TYPE","IOT_CHANGE_FULL_STATE","IOT_TYPE_OF_DISPLAY","CHANGE_PHOTO_VIEW_URL","IOT_TYPE_FM1","IOT_TYPE_FM2","IOT_TYPE_GUN","IOT_TYPE_SPHERE","IOT_TYPE_WF","IOT_TYPE_360","FARMING_CHANGE_CURR_REGION","FARMING_GET_PLANT_ACT_DATA","FARMING_GET_FERTILIZER_ACT_DATA","FARMING_GET_PROTECTION_ACT_DATA","FARMING_CHANGE_FULL_STATE","WAREHOUSE_CHANGE_CURR_REGION","WAREHOUSE_GET_TODAY_DATA","WAREHOUSE_GET_THIS_YEAR_IN_DATA","WAREHOUSE_GET_THIS_YEAR_OUT_DATA","WAREHOUSE_GET_HISTORY_IN_DATA","WAREHOUSE_GET_HISTORY_OUT_DATA","WAREHOUSE_CHANGE_FULL_STATE","PLANT_CHANGE_CURR_REGION","PLANT_GET_STAT_DATA","PLANT_GET_TREE_AGE_DATA","PLANT_GET_TEA_FARM_DATA","PLANT_GET_TEA_VARIETIES_DATA","PLANT_GET_AMOUNT_RANK","PLANT_CHANGE_FULL_STATE","HOME_CHANGE_CURR_REGION","HOME_GET_AMOUNT_RANK_DATA","HOME_GET_FARMING_ACT_DATA","HOME_GET_PICK_DATA","HOME_GET_WAREHOUSE_DATA","HOME_GET_CITY_DATA","HOME_GET_MONITOR_AMOUNT","HOME_GET_TEA_LEVEL_DATA","HOME_CHANGE_FULL_STATE","ORIGIN_CHANGE_FULL_STATE","GET_ORIGIN_DATA","GET_ORIGIN_LIST_DATA","CHANGE_PHOTO_VIEW_URL","WEBSOCKET","GETWEBSOCKET","GET_GUN_DATA","CHANGE_GUN_DIRECTION","GET_360_DATA"],r={};n.forEach(function(t){r[t]=t}),a["a"]=r},f1ed:function(t,a,e){"use strict";e.d(a,"b",function(){return n});e("a481"),e("386d"),e("4917"),e("3b2b"),e("cadf"),e("551c"),e("097d");function n(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd hh:mm:ss",e={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var n in/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+n+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?e[n]:("00"+e[n]).substr((""+e[n]).length)));return a}var r="https://tea.yufengtek.com/tea-IIS-Web",i="tea.yufengtek.com/tea-IIS-Web";a["a"]={globeURL:r,globeUrlTwo:i}}});