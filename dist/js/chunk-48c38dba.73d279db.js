(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48c38dba"],{"0c94":function(t,e,a){var n=a("f3d1"),i=a("5649");a("b6a7"),a("bbf1");var r=a("4242");if(!r.isSupported)throw new Error("Sorry your browser not support wordCloud");function o(t){for(var e=t.getContext("2d"),a=e.getImageData(0,0,t.width,t.height),n=e.createImageData(a),i=0,r=0,o=0;o<a.data.length;o+=4){var s=a.data[o+3];if(s>128){var l=a.data[o]+a.data[o+1]+a.data[o+2];i+=l,++r}}var c=i/r;for(o=0;o<a.data.length;o+=4){l=a.data[o]+a.data[o+1]+a.data[o+2],s=a.data[o+3];s<128||l>c?(n.data[o]=0,n.data[o+1]=0,n.data[o+2]=0,n.data[o+3]=0):(n.data[o]=255,n.data[o+1]=255,n.data[o+2]=255,n.data[o+3]=255)}e.putImageData(n,0,0)}n.registerLayout(function(t,e){t.eachSeriesByType("wordCloud",function(a){var s=i.getLayoutRect(a.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()}),l=a.getData(),c=document.createElement("canvas");c.width=s.width,c.height=s.height;var h=c.getContext("2d"),u=a.get("maskImage");if(u)try{h.drawImage(u,0,0,c.width,c.height),o(c)}catch(w){console.error("Invalid mask image"),console.error(w.toString())}var d=a.get("sizeRange"),f=a.get("rotationRange"),m=l.getDataExtent("value"),g=Math.PI/180,v=a.get("gridSize");function p(t){var e=t.detail.item;t.detail.drawn&&a.layoutInstance.ondraw&&(t.detail.drawn.gx+=s.x/v,t.detail.drawn.gy+=s.y/v,a.layoutInstance.ondraw(e[0],e[1],e[2],t.detail.drawn))}r(c,{list:l.mapArray("value",function(t,e){var a=l.getItemModel(e);return[l.getName(e),a.get("textStyle.normal.textSize",!0)||n.number.linearMap(t,m,d),e]}).sort(function(t,e){return e[1]-t[1]}),fontFamily:a.get("textStyle.normal.fontFamily")||a.get("textStyle.emphasis.fontFamily")||t.get("textStyle.fontFamily"),fontWeight:a.get("textStyle.normal.fontWeight")||a.get("textStyle.emphasis.fontWeight")||t.get("textStyle.fontWeight"),gridSize:v,ellipticity:s.height/s.width,minRotation:f[0]*g,maxRotation:f[1]*g,clearCanvas:!u,rotateRatio:1,rotationStep:a.get("rotationStep")*g,drawOutOfBound:a.get("drawOutOfBound"),shuffle:!1,shape:a.get("shape")}),c.addEventListener("wordclouddrawn",p),a.layoutInstance&&a.layoutInstance.dispose(),a.layoutInstance={ondraw:null,dispose:function(){c.removeEventListener("wordclouddrawn",p),c.addEventListener("wordclouddrawn",function(t){t.preventDefault()})}}})}),n.registerPreprocessor(function(t){var e=(t||{}).series;!n.util.isArray(e)&&(e=e?[e]:[]);var a=["shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"];function i(t){t&&n.util.each(a,function(e){t.hasOwnProperty(e)&&(t["text"+n.format.capitalFirst(e)]=t[e])})}n.util.each(e,function(t){if(t&&"wordCloud"===t.type){var e=t.textStyle||{};i(e.normal),i(e.emphasis)}})})},4242:function(t,e,a){"use strict";var n,i;
/*!
 * wordcloud2.js
 * http://timdream.org/wordcloud2.js/
 *
 * Copyright 2011 - 2013 Tim Chien
 * Released under the MIT license
 */window.setImmediate||(window.setImmediate=function(){return window.msSetImmediate||window.webkitSetImmediate||window.mozSetImmediate||window.oSetImmediate||function(){if(!window.postMessage||!window.addEventListener)return null;var t=[void 0],e="zero-timeout-message",a=function(a){var n=t.length;return t.push(a),window.postMessage(e+n.toString(36),"*"),n};return window.addEventListener("message",function(a){if("string"===typeof a.data&&a.data.substr(0,e.length)===e){a.stopImmediatePropagation();var n=parseInt(a.data.substr(e.length),36);t[n]&&(t[n](),t[n]=void 0)}},!0),window.clearImmediate=function(e){t[e]&&(t[e]=void 0)},a}()||function(t){window.setTimeout(t,0)}}()),window.clearImmediate||(window.clearImmediate=function(){return window.msClearImmediate||window.webkitClearImmediate||window.mozClearImmediate||window.oClearImmediate||function(t){window.clearTimeout(t)}}()),function(a){var r=function(){var t=document.createElement("canvas");if(!t||!t.getContext)return!1;var e=t.getContext("2d");return!!e.getImageData&&(!!e.fillText&&(!!Array.prototype.some&&!!Array.prototype.push))}(),o=function(){if(r){var t,e,a=document.createElement("canvas").getContext("2d"),n=20;while(n){if(a.font=n.toString(10)+"px sans-serif",a.measureText("Ｗ").width===t&&a.measureText("m").width===e)return n+1;t=a.measureText("Ｗ").width,e=a.measureText("m").width,n--}return 0}}(),s=function(t){for(var e,a,n=t.length;n;e=Math.floor(Math.random()*n),a=t[--n],t[n]=t[e],t[e]=a);return t},l=function(t,e){if(r){Array.isArray(t)||(t=[t]),t.forEach(function(e,a){if("string"===typeof e){if(t[a]=document.getElementById(e),!t[a])throw"The element id specified is not found."}else if(!e.tagName&&!e.appendChild)throw"You must pass valid HTML elements, or ID of the element."});var a={list:[],fontFamily:'"Trebuchet MS", "Heiti TC", "微軟正黑體", "Arial Unicode MS", "Droid Fallback Sans", sans-serif',fontWeight:"normal",color:"random-dark",minSize:0,weightFactor:1,clearCanvas:!0,backgroundColor:"#fff",gridSize:8,drawOutOfBound:!1,origin:null,drawMask:!1,maskColor:"rgba(255,0,0,0.3)",maskGapWidth:.3,wait:0,abortThreshold:0,abort:function(){},minRotation:-Math.PI/2,maxRotation:Math.PI/2,rotationStep:.1,shuffle:!0,rotateRatio:.1,shape:"circle",ellipticity:.65,classes:null,hover:null,click:null};if(e)for(var n in e)n in a&&(a[n]=e[n]);if("function"!==typeof a.weightFactor){var i=a.weightFactor;a.weightFactor=function(t){return t*i}}if("function"!==typeof a.shape)switch(a.shape){case"circle":default:a.shape="circle";break;case"cardioid":a.shape=function(t){return 1-Math.sin(t)};break;case"diamond":case"square":a.shape=function(t){var e=t%(2*Math.PI/4);return 1/(Math.cos(e)+Math.sin(e))};break;case"triangle-forward":a.shape=function(t){var e=t%(2*Math.PI/3);return 1/(Math.cos(e)+Math.sqrt(3)*Math.sin(e))};break;case"triangle":case"triangle-upright":a.shape=function(t){var e=(t+3*Math.PI/2)%(2*Math.PI/3);return 1/(Math.cos(e)+Math.sqrt(3)*Math.sin(e))};break;case"pentagon":a.shape=function(t){var e=(t+.955)%(2*Math.PI/5);return 1/(Math.cos(e)+.726543*Math.sin(e))};break;case"star":a.shape=function(t){var e=(t+.955)%(2*Math.PI/10);return(t+.955)%(2*Math.PI/5)-2*Math.PI/10>=0?1/(Math.cos(2*Math.PI/10-e)+3.07768*Math.sin(2*Math.PI/10-e)):1/(Math.cos(e)+3.07768*Math.sin(e))};break}a.gridSize=Math.max(Math.floor(a.gridSize),4);var l,c,h,u,d,f,m,g=a.gridSize,v=g-a.maskGapWidth,p=Math.abs(a.maxRotation-a.minRotation),w=Math.min(a.maxRotation,a.minRotation),b=a.rotationStep;switch(a.color){case"random-dark":m=function(){return j(10,50)};break;case"random-light":m=function(){return j(50,90)};break;default:"function"===typeof a.color&&(m=a.color);break}var x=null;"function"===typeof a.classes&&(x=a.classes);var S,y=!1,C=[],O=function(t){var e,a,n=t.currentTarget,i=n.getBoundingClientRect();t.touches?(e=t.touches[0].clientX,a=t.touches[0].clientY):(e=t.clientX,a=t.clientY);var r=e-i.left,o=a-i.top,s=Math.floor(r*(n.width/i.width||1)/g),l=Math.floor(o*(n.height/i.height||1)/g);return C[s][l]},M=function(t){var e=O(t);S!==e&&(S=e,e?a.hover(e.item,e.dimension,t):a.hover(void 0,void 0,t))},D=function(t){var e=O(t);e&&(a.click(e.item,e.dimension,t),t.preventDefault())},I=[],k=function(t){if(I[t])return I[t];var e=8*t,n=e,i=[];0===t&&i.push([u[0],u[1],0]);while(n--){var r=1;"circle"!==a.shape&&(r=a.shape(n/e*2*Math.PI)),i.push([u[0]+t*r*Math.cos(-n/e*2*Math.PI),u[1]+t*r*Math.sin(-n/e*2*Math.PI)*a.ellipticity,n/e*2*Math.PI])}return I[t]=i,i},T=function(){return a.abortThreshold>0&&(new Date).getTime()-f>a.abortThreshold},E=function(){return 0===a.rotateRatio?0:Math.random()>a.rotateRatio?0:0===p?w:w+Math.round(Math.random()*p/b)*b},F=function(t,e,n){var i=!1,r=a.weightFactor(e);if(r<=a.minSize)return!1;var s=1;r<o&&(s=function(){var t=2;while(t*r<o)t+=2;return t}());var l=document.createElement("canvas"),c=l.getContext("2d",{willReadFrequently:!0});c.font=a.fontWeight+" "+(r*s).toString(10)+"px "+a.fontFamily;var h=c.measureText(t).width/s,u=Math.max(r*s,c.measureText("m").width,c.measureText("Ｗ").width)/s,d=h+2*u,f=3*u,m=Math.ceil(d/g),v=Math.ceil(f/g);d=m*g,f=v*g;var p=-h/2,w=.4*-u,b=Math.ceil((d*Math.abs(Math.sin(n))+f*Math.abs(Math.cos(n)))/g),x=Math.ceil((d*Math.abs(Math.cos(n))+f*Math.abs(Math.sin(n)))/g),S=x*g,y=b*g;l.setAttribute("width",S),l.setAttribute("height",y),i&&(document.body.appendChild(l),c.save()),c.scale(1/s,1/s),c.translate(S*s/2,y*s/2),c.rotate(-n),c.font=a.fontWeight+" "+(r*s).toString(10)+"px "+a.fontFamily,c.fillStyle="#000",c.textBaseline="middle",c.fillText(t,p*s,(w+.5*r)*s);var C=c.getImageData(0,0,S,y).data;if(T())return!1;i&&(c.strokeRect(p*s,w,h*s,u*s),c.restore());var O,M,D,I=[],k=x,E=[b/2,x/2,b/2,x/2];while(k--){O=b;while(O--){D=g;t:{while(D--){M=g;while(M--)if(C[4*((O*g+D)*S+(k*g+M))+3]){I.push([k,O]),k<E[3]&&(E[3]=k),k>E[1]&&(E[1]=k),O<E[0]&&(E[0]=O),O>E[2]&&(E[2]=O),i&&(c.fillStyle="rgba(255, 0, 0, 0.5)",c.fillRect(k*g,O*g,g-.5,g-.5));break t}}i&&(c.fillStyle="rgba(0, 0, 255, 0.5)",c.fillRect(k*g,O*g,g-.5,g-.5))}}}return i&&(c.fillStyle="rgba(0, 255, 0, 0.5)",c.fillRect(E[3]*g,E[0]*g,(E[1]-E[3]+1)*g,(E[2]-E[0]+1)*g)),{mu:s,occupied:I,bounds:E,gw:x,gh:b,fillTextOffsetX:p,fillTextOffsetY:w,fillTextWidth:h,fillTextHeight:u,fontSize:r}},R=function(t,e,n,i,r){var o=r.length;while(o--){var s=t+r[o][0],u=e+r[o][1];if(s>=c||u>=h||s<0||u<0){if(!a.drawOutOfBound)return!1}else if(!l[s][u])return!1}return!0},A=function(e,n,i,r,o,s,l,c,h){var u,d,f=i.fontSize;u=m?m(r,o,f,s,l):a.color,d=x?x(r,o,f,s,l):a.classes;var v=i.bounds;v[3],v[0],v[1],v[3],v[2],v[0],t.forEach(function(t){if(t.getContext){var o=t.getContext("2d"),s=i.mu;o.save(),o.scale(1/s,1/s),o.font=a.fontWeight+" "+(f*s).toString(10)+"px "+a.fontFamily,o.fillStyle=u,o.translate((e+i.gw/2)*g*s,(n+i.gh/2)*g*s),0!==c&&o.rotate(-c),o.textBaseline="middle",o.fillText(r,i.fillTextOffsetX*s,(i.fillTextOffsetY+.5*f)*s),o.restore()}else{var l=document.createElement("span"),m="";m="rotate("+-c/Math.PI*180+"deg) ",1!==i.mu&&(m+="translateX(-"+i.fillTextWidth/4+"px) scale("+1/i.mu+")");var v={position:"absolute",display:"block",font:a.fontWeight+" "+f*i.mu+"px "+a.fontFamily,left:(e+i.gw/2)*g+i.fillTextOffsetX+"px",top:(n+i.gh/2)*g+i.fillTextOffsetY+"px",width:i.fillTextWidth+"px",height:i.fillTextHeight+"px",lineHeight:f+"px",whiteSpace:"nowrap",transform:m,webkitTransform:m,msTransform:m,transformOrigin:"50% 40%",webkitTransformOrigin:"50% 40%",msTransformOrigin:"50% 40%"};for(var p in u&&(v.color=u),l.textContent=r,v)l.style[p]=v[p];if(h)for(var w in h)l.setAttribute(w,h[w]);d&&(l.className+=d),t.appendChild(l)}})},$=function(e,a,n,i,r){if(!(e>=c||a>=h||e<0||a<0)){if(l[e][a]=!1,n){var o=t[0].getContext("2d");o.fillRect(e*g,a*g,v,v)}y&&(C[e][a]={item:r,dimension:i})}},P=function(e,n,i,r,o,s){var l,u,d=o.occupied,f=a.drawMask;if(f&&(l=t[0].getContext("2d"),l.save(),l.fillStyle=a.maskColor),y){var m=o.bounds;u={x:(e+m[3])*g,y:(n+m[0])*g,w:(m[1]-m[3]+1)*g,h:(m[2]-m[0]+1)*g}}var v=d.length;while(v--){var p=e+d[v][0],w=n+d[v][1];p>=c||w>=h||p<0||w<0||$(p,w,f,u,s)}f&&l.restore()},z=function(t){var e,n,i;Array.isArray(t)?(e=t[0],n=t[1]):(e=t.word,n=t.weight,i=t.attributes);var r=E(),o=F(e,n,r);if(!o)return!1;if(T())return!1;if(!a.drawOutOfBound){var l=o.bounds;if(l[1]-l[3]+1>c||l[2]-l[0]+1>h)return!1}var u=d+1,f=function(a){var s=Math.floor(a[0]-o.gw/2),l=Math.floor(a[1]-o.gh/2),c=o.gw,h=o.gh;return!!R(s,l,c,h,o.occupied)&&(A(s,l,o,e,n,d-u,a[2],r,i),P(s,l,c,h,o,t),{gx:s,gy:l,rot:r,info:o})};while(u--){var m=k(d-u);a.shuffle&&(m=[].concat(m),s(m));for(var g=0;g<m.length;g++){var v=f(m[g]);if(v)return v}}return null},_=function(e,a,n){if(a)return!t.some(function(t){var i=document.createEvent("CustomEvent");return i.initCustomEvent(e,!0,a,n||{}),!t.dispatchEvent(i)},this);t.forEach(function(t){var i=document.createEvent("CustomEvent");i.initCustomEvent(e,!0,a,n||{}),t.dispatchEvent(i)},this)},L=function(){var e=t[0];if(e.getContext)c=Math.ceil(e.width/g),h=Math.ceil(e.height/g);else{var n=e.getBoundingClientRect();c=Math.ceil(n.width/g),h=Math.ceil(n.height/g)}if(_("wordcloudstart",!0)){var i,r,o,s,m;if(u=a.origin?[a.origin[0]/g,a.origin[1]/g]:[c/2,h/2],d=Math.floor(Math.sqrt(c*c+h*h)),l=[],!e.getContext||a.clearCanvas){t.forEach(function(t){if(t.getContext){var e=t.getContext("2d");e.fillStyle=a.backgroundColor,e.clearRect(0,0,c*(g+1),h*(g+1)),e.fillRect(0,0,c*(g+1),h*(g+1))}else t.textContent="",t.style.backgroundColor=a.backgroundColor,t.style.position="relative"}),i=c;while(i--){l[i]=[],r=h;while(r--)l[i][r]=!0}}else{var v=document.createElement("canvas").getContext("2d");v.fillStyle=a.backgroundColor,v.fillRect(0,0,1,1);var p,w,b=v.getImageData(0,0,1,1).data,x=e.getContext("2d").getImageData(0,0,c*g,h*g).data;i=c;while(i--){l[i]=[],r=h;while(r--){w=g;t:while(w--){p=g;while(p--){o=4;while(o--)if(x[4*((r*g+w)*c*g+(i*g+p))+o]!==b[o]){l[i][r]=!1;break t}}}!1!==l[i][r]&&(l[i][r]=!0)}}x=v=b=void 0}if(a.hover||a.click){y=!0,i=c+1;while(i--)C[i]=[];a.hover&&e.addEventListener("mousemove",M),a.click&&(e.addEventListener("click",D),e.addEventListener("touchstart",D),e.addEventListener("touchend",function(t){t.preventDefault()}),e.style.webkitTapHighlightColor="rgba(0, 0, 0, 0)"),e.addEventListener("wordcloudstart",function t(){e.removeEventListener("wordcloudstart",t),e.removeEventListener("mousemove",M),e.removeEventListener("click",D),S=void 0})}o=0,0!==a.wait?(s=window.setTimeout,m=window.clearTimeout):(s=window.setImmediate,m=window.clearImmediate);var O=function(e,a){t.forEach(function(t){t.addEventListener(e,a)},this)},I=function(e,a){t.forEach(function(t){t.removeEventListener(e,a)},this)},k=function t(){I("wordcloudstart",t),m(E)};O("wordcloudstart",k);var E=s(function t(){if(o>=a.list.length)return m(E),_("wordcloudstop",!1),void I("wordcloudstart",k);f=(new Date).getTime();var e=z(a.list[o]),n=!_("wordclouddrawn",!0,{item:a.list[o],drawn:e});if(T()||n)return m(E),a.abort(),_("wordcloudabort",!1),_("wordcloudstop",!1),void I("wordcloudstart",k);o++,E=s(t,a.wait)},a.wait)}};L()}function j(t,e){return"hsl("+(360*Math.random()).toFixed()+","+(30*Math.random()+70).toFixed()+"%,"+(Math.random()*(e-t)+t).toFixed()+"%)"}};l.isSupported=r,l.minFontSize=o,n=[],i=function(){return l}.apply(e,n),void 0===i||(t.exports=i)}()},"54bc":function(t,e,a){t.exports=a("0c94")},5967:function(t,e,a){},6362:function(t,e,a){"use strict";var n=a("5967"),i=a.n(n);i.a},"8a00":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page home-page"},[a("div",[a("AmountRank"),a("FarmingInfo"),a("InWarehouse")],1),a("div",[a("PlantInfo"),a("Plane",{staticClass:"tea-making-wrap"},[a("div",{staticClass:"wrap-title"},[a("PlaneTitle",[t._v("采摘信息")]),a("PlaneTitle",[t._v("制茶等级")])],1),a("div",{staticClass:"charts"},[a("PickInfo"),a("LevelInfo")],1)])],1),a("div",[a("OriginData"),a("Iot"),a("OutWarehouse")],1)])},i=[],r=a("eb57"),o=a("52c1"),s=a("0706"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"farming-info-wrap"},[a("PlaneTitle",[t._v("施肥信息")]),a("div",{ref:"container",staticClass:"plane-content"}),a("div",{staticClass:"chart-title"},[a("h4",[t._v("农事活动比")])]),a("FullScreenButton",{attrs:{link:{name:"farming"}}})],1)},c=[],h=a("5f19"),u=a("3604"),d=s["a"].HOME,f=(Object(o["a"])(d).mapState,"$store.state.".concat(d,".farmingActdatas")),m={name:"app-farming-info",watch:Object(h["a"])({},f,function(){this.doInitOrRefreshChart()}),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[d].farmingActdatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[d].farmingActdatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o={tooltip:{trigger:"item",show:!0,formatter:"{b}：{d}%"},legend:{show:!0,data:r,orient:"vertical",right:"3%",top:10,itemGap:15,textStyle:{color:"#d0d0d0",fontSize:14,padding:[2,0,0,4]}},series:[{type:"pie",radius:["51%","89%"],center:["44%","50%"],label:{show:!0,position:"inside",formatter:"{d}%",fontSize:14},color:["#86D560","#AF89D6","#59ADF3"],data:i,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=u["a"].init(a),e.chart.setOption(o)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=a.getOption(),s=o.series,l=o.legend;s[0].data=i,l.data=r,a.setOption({series:s,legend:l}),setTimeout(function(){a.resize()},10)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.label,value:n.value}),e.push(n.label);return{legendData:e,seriesData:a}},doSwitchFullState:function(){}}},g=m,v=a("d2f3"),p=Object(v["a"])(g,l,c,!1,null,null,null),w=p.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"iot-wrap"},[a("PlaneTitle",[t._v("物联监控")]),a("div",{staticClass:"plane-container"},[a("div",{staticClass:"iot-item"},[a("div",[a("i",{staticClass:"iconfont"},[t._v("")]),a("div",[t._v("摄像头")])]),a("div",[t._v(t._s(t.cameraAmount))])]),a("div",{staticClass:"iot-item"},[a("div",[a("i",{staticClass:"iconfont"},[t._v("")]),a("div",[t._v("监测站")])]),a("div",[t._v(t._s(t.monitorAmount))])])]),a("FullScreenButton",{attrs:{link:{name:"iot"},full:t.screenFullState}})],1)},x=[],S=a("bd31"),y=s["a"].HOME,C=Object(o["a"])(y).mapState,O={name:"app-iot",computed:Object(S["a"])({},C(["cameraAmount","monitorAmount"]),Object(o["c"])(["screenFullState"]))},M=O,D=Object(v["a"])(M,b,x,!1,null,null,null),I=D.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"origin-wrap"},[a("PlaneTitle",[t._v("溯源排行")]),a("div",{ref:"container",staticClass:"plane-content"}),a("FullScreenButton",{attrs:{link:{name:"origin"},full:t.screenFullState}})],1)},T=[];a("54bc");var E=s["a"].HOME,F=(Object(o["a"])(E).mapState,"$store.state.".concat(E,".cityDatas")),R={name:"origin-data",computed:Object(S["a"])({},Object(o["c"])(["screenFullState"])),watch:Object(h["a"])({},F,function(){this.doInitOrRefreshChart()}),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[E].cityDatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[E].farmingActdatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}"},series:[{type:"wordCloud",gridSize:10,sizeRange:[14,40],rotationRange:[0,0],shape:"circle",autoSize:{enable:!0,minSize:12},data:t,textStyle:{normal:{color:function(){return"hsla("+[207+Math.round(10*Math.random()),75+Math.round(12*Math.random())+"%",60+Math.round(10*Math.random())+"%",.2+Math.random()].join(",")+")"}},emphasis:{shadowBlur:10,shadowColor:"#333"}}}]};e.chart=u["a"].init(a),e.chart.setOption(n)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=a.getOption(),s=o.series,l=o.legend;s[0].data=i,l.data=r,a.setOption({series:s,legend:l}),setTimeout(function(){a.resize()},10)},doSwitchFullState:function(){}}},A=R,$=Object(v["a"])(A,k,T,!1,null,null,null),P=$.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"plant-distribute-wrap"},[a("PlaneTitle",[t._v("种植分布")]),a("div",{ref:"container",staticClass:"plane-content"}),a("FullScreenButton",{attrs:{link:{name:"plant"},full:t.screenFullState}})],1)},_=[],L=s["a"].HOME,j=Object(o["a"])(L).mapState,B=("$store.state.".concat(L,".plantInfoData"),{name:"home-plant-info",computed:Object(S["a"])({},j(["plantInfoData"]),Object(o["c"])(["screenFullState"])),data:function(){return{chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.$ajax({url:"./map.json"}).then(function(e){u["a"].registerMap("wuyishan",e),t.chart=u["a"].init(t.$refs.container),t.chart.setOption({backgroundColor:"transparent",geo:{map:"wuyishan",itemStyle:{emphasis:{areaColor:"#389BB7",borderWidth:0},normal:{areaColor:"#15467d",borderColor:"#2f90cd",borderWidth:1}},label:{emphasis:{textStyle:{color:"#ffffff"}},normal:{show:!0,textStyle:{color:"#ffffff",fontSize:12}}},roam:!0,zoom:1.25},series:[{coordinateSystem:"geo",data:t.plantInfoData,hoverAnimation:!0,itemStyle:{normal:{color:"rgba(147, 235, 248, 0.8)",shadowBlur:10,shadowColor:"#333"}},rippleEffect:{brushType:"fill",period:15,scale:6},showEffectOn:"render",type:"effectScatter"}]})})})}}),W=B,H=Object(v["a"])(W,z,_,!1,null,null,null),X=H.exports,G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"in-warehouse-wrap"},[a("PlaneTitle",[t._v("入库信息")]),a("div",{ref:"container",staticClass:"plane-content"}),a("FullScreenButton",{attrs:{link:{name:"farming"}}})],1)},Y=[],U=(a("0b9e"),a("612f"),s["a"].HOME),q=Object(o["a"])(U).mapState,N="$store.state.".concat(U,".inWarehouseDatas"),J={name:"home-in-warehouse",computed:Object(S["a"])({},q(["warehouseUnit"])),watch:Object(h["a"])({},N,function(){this.doInitOrRefreshChart()}),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[U].inWarehouseDatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[U].inWarehouseDatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,r=n.values,o={tooltip:{trigger:"axis",formatter:"{b}：{c}"+e.warehouseUnit,backgroundColor:"rgba(0, 159, 253, 0.5)",axisPointer:{lineStyle:{color:"rgba(238,238,238,0.4)"}}},grid:{top:15,bottom:2,left:5,right:5,containLabel:!0},xAxis:{data:i,axisLine:{lineStyle:{color:"#0c3b71"}},axisLabel:{margin:10,interval:0,rotate:0,color:"#fff",fontSize:12}},yAxis:{axisLine:{lineStyle:{color:"#0c3b71"}},axisLabel:{interval:0,color:"#fff"},splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.2)",width:.5}}},series:[{name:"bar",type:"bar",barWidth:10,itemStyle:{normal:{barBorderRadius:5,color:new u["a"].graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#00EFF8"},{offset:1,color:"#005DBE"}])}},data:r}]};e.chart=u["a"].init(a),e.chart.setOption(o)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,r=n.values,o=a.getOption(),s=o.series,l=o.xAxis;l[0].data=i,s[0].data=r,a.setOption({series:s,xAxis:l}),setTimeout(function(){a.resize()},10)},handleChartData:function(t){var e=[],a=[];return t.forEach(function(t){e.push(t.date),a.push(t.data)}),{titles:e,values:a}},doSwitchFullState:function(){}}},V=J,K=Object(v["a"])(V,G,Y,!1,null,null,null),Q=K.exports,Z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"out-warehouse-wrap"},[a("PlaneTitle",[t._v("出库信息")]),a("div",{ref:"container",staticClass:"plane-content"}),a("FullScreenButton",{attrs:{link:{name:"farming"}}})],1)},tt=[],et=s["a"].HOME,at=Object(o["a"])(et).mapState,nt="$store.state.".concat(et,".outWarehouseDatas"),it={name:"home-out-warehouse",computed:Object(S["a"])({},at(["warehouseUnit"])),watch:Object(h["a"])({},nt,function(){this.doInitOrRefreshChart()}),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[et].outWarehouseDatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[et].outWarehouseDatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,r=n.values,o={tooltip:{trigger:"axis",formatter:"{b}：{c}"+e.warehouseUnit,backgroundColor:"rgba(0, 159, 253, 0.5)",axisPointer:{lineStyle:{color:"rgba(238,238,238,0.4)"}}},grid:{top:15,bottom:2,left:5,right:5,containLabel:!0},xAxis:{data:i,axisLine:{lineStyle:{color:"#0c3b71"}},axisLabel:{margin:10,interval:0,rotate:0,color:"#fff",fontSize:12}},yAxis:{axisLine:{lineStyle:{color:"#0c3b71"}},axisLabel:{interval:0,color:"#fff"},splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.2)",width:.5}}},series:[{name:"bar",type:"bar",barWidth:10,itemStyle:{normal:{barBorderRadius:5,color:new u["a"].graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#00EFF8"},{offset:1,color:"#005DBE"}])}},data:r}]};e.chart=u["a"].init(a),e.chart.setOption(o)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,r=n.values,o=a.getOption(),s=o.series,l=o.xAxis;l[0].data=i,s[0].data=r,a.setOption({series:s,xAxis:l}),setTimeout(function(){a.resize()},10)},handleChartData:function(t){var e=[],a=[];return t.forEach(function(t){e.push(t.date),a.push(t.data)}),{titles:e,values:a}},doSwitchFullState:function(){}}},rt=it,ot=Object(v["a"])(rt,Z,tt,!1,null,null,null),st=ot.exports,lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"amount-rank-wrap"},[a("PlaneTitle",[t._v("茶树排行")]),a("div",{ref:"container",staticClass:"plane-content"}),a("FullScreenButton",{attrs:{link:{name:"farming"}}})],1)},ct=[],ht=s["a"].HOME,ut=Object(o["a"])(ht).mapState,dt="$store.state.".concat(ht,".amountRankDatas"),ft={name:"home-amount-rank",computed:Object(S["a"])({},ut(["amountRankUnit"])),watch:Object(h["a"])({},dt,function(){this.doInitOrRefreshChart()}),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[ht].amountRankDatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[ht].amountRankDatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,r=n.values,o={grid:{top:0,left:60,right:20,bottom:15},xAxis:{show:!0,splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.2)",width:.5}},axisLine:{lineStyle:{color:"rgba(0,0,0,0)"}},axisLabel:{margin:2,interval:0,rotate:0,color:"#fff",fontSize:12}},yAxis:[{show:!0,data:i,inverse:!0,axisLine:{show:!1},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#fff",fontSize:12,margin:10}}],series:[{type:"bar",yAxisIndex:0,data:r,barWidth:10,itemStyle:{normal:{barBorderRadius:30,color:new u["a"].graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#00EFF8"},{offset:1,color:"#005DBE"}])}}}]};e.chart=u["a"].init(a),e.chart.setOption(o)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,r=n.values,o=a.getOption(),s=o.series,l=o.yAxis;s[0].data=r,l[0].data=i,a.setOption({series:s,yAxis:l}),setTimeout(function(){a.resize()},10)},handleChartData:function(t){var e=[],a=[];return t.forEach(function(t){e.push(t.place),a.push(t.data)}),{titles:e,values:a}},doSwitchFullState:function(){}}},mt=ft,gt=Object(v["a"])(mt,lt,ct,!1,null,null,null),vt=gt.exports,pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pick-info-wrap"},[a("div",{ref:"container",staticClass:"chart-container"}),a("div",{staticClass:"chart-title"},[a("h4",[t._v("茶叶总产量")]),a("div",[t._v(t._s(t.teaTotalAmount)+"吨")])])])},wt=[],bt=s["a"].HOME,xt=Object(o["a"])(bt).mapState,St="$store.state.".concat(bt,".pickDatas"),yt={name:"home-pick-info",computed:Object(S["a"])({},xt(["teaTotalAmount"]),Object(o["c"])(["screenFullState"])),watch:Object(h["a"])({},St,function(){this.doInitOrRefreshChart()}),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[bt].pickDatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[bt].pickDatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}吨 ({d}%)"},legend:{show:!0,data:r,orient:"vertical",right:"3%",top:10,itemGap:15,textStyle:{color:"#d0d0d0",fontSize:14,padding:[2,0,0,4]}},series:[{type:"pie",radius:["45%","88%"],center:["44%","50%"],label:{show:!0,position:"inside",formatter:"{d}%",fontSize:12},color:["#86D560","#AF89D6","#59ADF3","#FF999A","#FFCC67"],data:i,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=u["a"].init(a),e.chart.setOption(o)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=a.getOption(),s=o.series,l=o.legend;s[0].data=i,l.data=r,a.setOption({series:s,legend:l}),setTimeout(function(){a.resize()},10)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.label,value:n.value}),e.push(n.label);return{legendData:e,seriesData:a}},doSwitchFullState:function(){}}},Ct=yt,Ot=Object(v["a"])(Ct,pt,wt,!1,null,null,null),Mt=Ot.exports,Dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container"})},It=[],kt=s["a"].HOME,Tt=Object(o["a"])(kt).mapState,Et="$store.state.".concat(kt,".levelDatas"),Ft={name:"home-level-info",computed:Object(S["a"])({},Tt(["teaTotalAmount"]),Object(o["c"])(["screenFullState"])),watch:Object(h["a"])({},Et,function(){this.doInitOrRefreshChart()}),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[kt].levelDatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[kt].levelDatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}吨 ({d}%)"},legend:{show:!0,data:r,orient:"vertical",right:"3%",top:10,itemGap:15,textStyle:{color:"#d0d0d0",fontSize:14,padding:[2,0,0,4]}},series:[{type:"pie",radius:["45%","88%"],center:["44%","50%"],label:{show:!0,position:"inside",formatter:"{d}%",fontSize:12},color:["#86D560","#AF89D6","#59ADF3","#FF999A","#FFCC67"],data:i,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=u["a"].init(a),e.chart.setOption(o)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=a.getOption(),s=o.series,l=o.legend;s[0].data=i,l.data=r,a.setOption({series:s,legend:l}),setTimeout(function(){a.resize()},10)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.label,value:n.value}),e.push(n.label);return{legendData:e,seriesData:a}},doSwitchFullState:function(){}}},Rt=Ft,At=Object(v["a"])(Rt,Dt,It,!1,null,null,null),$t=At.exports,Pt=s["a"].HOME,zt=(Object(o["a"])(Pt).mapState,{name:"home-index",components:{FarmingInfo:w,Iot:I,OriginData:P,PlantInfo:X,InWarehouse:Q,OutWarehouse:st,AmountRank:vt,PickInfo:Mt,LevelInfo:$t},created:function(){var t=this,e=t.$store;e.commit(r["a"].SWITCH_LOADING,!1)}}),_t=zt,Lt=(a("6362"),Object(v["a"])(_t,n,i,!1,null,null,null));e["default"]=Lt.exports},b6a7:function(t,e,a){var n=a("6f0e"),i=a("f3d1");i.extendSeriesModel({type:"series.wordCloud",visualColorAccessPath:"textStyle.normal.color",optionUpdated:function(){var t=this.option;t.gridSize=Math.max(Math.floor(t.gridSize),4)},getInitialData:function(t,e){var a=n(["value"],t.data),r=new i.List(a,this);return r.initData(t.data),r},defaultOption:{maskImage:null,shape:"circle",left:"center",top:"center",width:"70%",height:"80%",sizeRange:[12,60],rotationRange:[-90,90],rotationStep:45,gridSize:8,drawOutOfBound:!1,textStyle:{normal:{fontWeight:"normal"}}}})},bbf1:function(t,e,a){var n=a("f3d1");n.extendChartView({type:"wordCloud",render:function(t,e,a){var i=this.group;i.removeAll();var r=t.getData(),o=t.get("gridSize");t.layoutInstance.ondraw=function(t,e,a,s){var l=r.getItemModel(a),c=l.getModel("textStyle.normal"),h=l.getModel("textStyle.emphasis"),u=new n.graphic.Text({style:n.graphic.setTextStyle({},c,{x:s.info.fillTextOffsetX,y:s.info.fillTextOffsetY+.5*e,text:t,textBaseline:"middle",textFill:r.getItemVisual(a,"color"),fontSize:e}),scale:[1/s.info.mu,1/s.info.mu],position:[(s.gx+s.info.gw/2)*o,(s.gy+s.info.gh/2)*o],rotation:s.rot});i.add(u),r.setItemGraphicEl(a,u),n.graphic.setHoverStyle(u,n.graphic.setTextStyle({},h,null,{forMerge:!0},!0))},this._model=t},remove:function(){this.group.removeAll(),this._model.layoutInstance.dispose()},dispose:function(){this._model.layoutInstance.dispose()}})}}]);