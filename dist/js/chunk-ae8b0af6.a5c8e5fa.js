(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ae8b0af6"],{"19f9":function(t,e,a){var n=a("2d2c"),i=a("1dff"),r=a("201d");t.exports=function(t,e){var a=(i.Object||{})[t]||Object[t],o={};o[t]=e(a),n(n.S+n.F*r(function(){a(1)}),"Object",o)}},4013:function(t,e,a){var n=a("aa91"),i=a("d753");a("19f9")("keys",function(){return function(t){return i(n(t))}})},"5f33":function(t,e,a){var n=a("4839"),i=a("d62f"),r=a("694f").f,o=a("62af").f,l=a("d635"),c=a("7fe4"),s=n.RegExp,h=s,f=s.prototype,u=/a/g,d=/a/g,m=new s(u)!==u;if(a("3a0f")&&(!m||a("201d")(function(){return d[a("f3ae")("match")]=!1,s(u)!=u||s(d)==d||"/a/i"!=s(u,"i")}))){s=function(t,e){var a=this instanceof s,n=l(t),r=void 0===e;return!a&&n&&t.constructor===s&&r?t:i(m?new h(n&&!r?t.source:t,e):h((n=t instanceof s)?t.source:t,n&&r?c.call(t):e),a?this:f,s)};for(var p=function(t){t in s||r(s,t,{configurable:!0,get:function(){return h[t]},set:function(e){h[t]=e}})},g=o(h),v=0;g.length>v;)p(g[v++]);f.constructor=s,s.prototype=f,a("7f00")(n,"RegExp",s)}a("4fd1")("RegExp")},"62af":function(t,e,a){var n=a("7cbd"),i=a("2ba0").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,i)}},a424:function(t,e,a){},af20:function(t,e,a){"use strict";a.r(e);var n,i,r,o,l,c,s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page farming-info-page"},[a("Map"),a("div",[a("PlantAct"),a("FertilizerAct"),a("ProtectionAct")],1)],1)},h=[],f=(a("0b9e"),a("3556")),u=a("eb57"),d=a("52c1"),m=a("0706"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"map-wrap",attrs:{full:t.mapFullState}},[a("WuyishanMap",{attrs:{curr:t.currSelectedRegion,full:t.mapFullState},on:{change:t.doMapChange}}),a("PlaneTools",{attrs:{full:t.mapFullState},on:{change:t.doFullStateChange}})],1)},g=[],v=a("df17"),b=m["a"].FARMING,S="mapFullState",x=Object(d["a"])(b).mapState,w={name:"PlantMap",components:{WuyishanMap:v["a"]},computed:Object(f["a"])({},x(["currSelectedRegion",S])),methods:{doMapChange:function(t){var e=this,a=e.$store;a.commit(b+"/"+u["a"].FARMING_CHANGE_CURR_REGION,t),a.dispatch(b+"/"+u["a"].FARMING_GET_DATA,t)},doFullStateChange:function(t){var e=this;e.$store.commit(b+"/"+u["a"].FARMING_CHANGE_FULL_STATE,{fullStateName:S,state:t})}}},A=w,y=a("17cc"),O=Object(y["a"])(A,p,g,!1,null,null,null),z=O.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"plant-act-wrap act-wrap",attrs:{full:t.plantFullState}},[a("PlaneTitle",[t._v("种植活动"),a("div",{directives:[{name:"show",rawName:"v-show",value:t.plantActLineDatas.length&&t.plantActPieDatas.length,expression:"plantActLineDatas.length && plantActPieDatas.length"}],staticClass:"unit"},[t._v("单位：亩")])]),a("div",{staticClass:"plane-content",class:{hide:!t.plantActLineDatas.length||!t.plantActPieDatas.length}},[a("PlantActPie"),a("PlantActLine")],1),a("PlaneTools",{directives:[{name:"show",rawName:"v-show",value:t.plantActLineDatas.length&&t.plantActPieDatas.length,expression:"plantActLineDatas.length && plantActPieDatas.length"}],attrs:{full:t.plantFullState},on:{change:t.doFullStateChange}}),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.plantActLineDatas.length||!t.plantActPieDatas.length,expression:"!plantActLineDatas.length || !plantActPieDatas.length"}],staticClass:"iconfont null-data-tag"},[t._v("")])],1)},D=[],L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container"})},j=[],R=a("2919"),P=a("3604"),I=m["a"].FARMING,_=Object(d["a"])(I).mapState,F="plantActPieDatas",$="$store.state.".concat(I,".").concat(F),M="plantFullState",G="$store.state.".concat(I,".").concat(M),N="$store.state.windowResizeState",E={name:"farming-plant-act-pie",computed:Object(f["a"])({},_([M,F]),{miniScreen:function(){return this.$store.state.winWidth<1300}}),watch:(n={},Object(R["a"])(n,$,function(){this.doInitOrRefreshChart()}),Object(R["a"])(n,G,function(){this.doInitOrRefreshChart()}),Object(R["a"])(n,N,function(){this.doInitOrRefreshChart()}),n),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t[F];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t[F];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=e.miniScreen,l={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}亩 ({d}%)",backgroundColor:"rgba(0, 159, 253, 0.9)",textStyle:{fontSize:14}},legend:{show:!0,data:r,orient:"vertical",right:0,top:0,itemGap:o?5:10,textStyle:{color:"#d0d0d0",fontSize:12,padding:[2,0,0,2]}},series:[{type:"pie",radius:["40%","80%"],center:["36%","50%"],minAngle:5,minShowLabelAngle:720,avoidLabelOverlap:!1,label:{show:!0,align:"left",position:"inside",normal:{show:!0,position:"inside",textStyle:{color:"rgba(255, 255, 255, 1)"},formatter:"{d}%"},formatter:"{d}%"},color:["#15467d","#87d0f6","#4775b7","#91acd4","#2663bc"],data:i,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=P["a"].init(a),e.chart.setOption(l)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=null,l=e.miniScreen;o=e[M]?{tooltip:{textStyle:{fontSize:18}},series:[{center:["47%","50%"],data:i,label:{fontSize:18}}],legend:{data:r,right:15,itemGap:20,top:15,textStyle:{fontSize:15}}}:{tooltip:{textStyle:{fontSize:14}},series:[{center:["36%","50%"],data:i,label:{fontSize:12}}],legend:{data:r,right:0,itemGap:l?5:10,top:0,textStyle:{fontSize:12}}},a.setOption(o);var c=6,s=setInterval(function(){--c>0?a.resize():window.clearInterval(s)},150)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.plant_varieties,value:n.area}),e.push(n.plant_varieties);return{legendData:e,seriesData:a}}}},T=E,k=Object(y["a"])(T,L,j,!1,null,null,null),H=k.exports,W=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container"})},U=[],B=a("f1ed"),X=m["a"].FARMING,K=Object(d["a"])(X).mapState,q="plantActLineDatas",J="$store.state.".concat(X,".").concat(q),Y="plantFullState",Q="$store.state.".concat(X,".").concat(Y),V="$store.state.windowResizeState",Z={name:"farming-plant-act-line",computed:Object(f["a"])({},K([Y,q])),watch:(i={},Object(R["a"])(i,J,function(){this.doInitOrRefreshChart()}),Object(R["a"])(i,Q,function(){this.doInitOrRefreshChart()}),Object(R["a"])(i,V,function(){this.doInitOrRefreshChart()}),i),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t[q];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t[q];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,r=n.lineDatas,o=Object(B["a"])(r,4),l=o.min,c=o.max,s=o.interval,h={grid:{top:10,left:0,right:0,bottom:0,containLabel:!0},tooltip:{trigger:"axis",formatter:"{b}：{c}亩",backgroundColor:"rgba(0, 159, 253, 0.9)",axisPointer:{lineStyle:{color:"rgba(238,238,238,0.4)"}},textStyle:{fontSize:14}},xAxis:[{type:"category",data:i,boundaryGap:!0,axisTick:{show:!0},axisLine:{lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{margin:8,textStyle:{color:"#fff",fontSize:12}}}],yAxis:[{show:!0,min:l,max:c,interval:s,splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.15)"}},axisTick:{show:!0},axisLine:{show:!0,lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{show:!0,margin:8,textStyle:{color:"#fff",fontSize:12}}}],color:["rgb(67, 81, 124)"],series:[{smooth:!0,symbol:"circle",symbolSize:6,showSymbol:!0,type:"line",data:r,areaStyle:{normal:{color:new P["a"].graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(67, 81, 124, 0.3)"},{offset:.85,color:"rgba(67, 81, 124, 0.1)"}],!1)}}}]};e.chart=P["a"].init(a),e.chart.setOption(h)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,r=n.lineDatas,o=null;if(e[Y]){var l=Object(B["a"])(r,8),c=l.min,s=l.max,h=l.interval;o={grid:{top:32,left:20,right:20,bottom:20},series:[{data:r}],xAxis:[{axisLabel:{margin:12,fontSize:15},data:i}],yAxis:[{min:c,max:s,interval:h,axisLabel:{margin:12,fontSize:15}}],tooltip:{textStyle:{fontSize:18}}}}else{var f=Object(B["a"])(r,4),u=f.min,d=f.max,m=f.interval;o={grid:{top:10,left:0,right:0,bottom:0},series:[{data:r}],xAxis:[{axisLabel:{margin:8,fontSize:12},data:i}],yAxis:[{min:u,max:d,interval:m,axisLabel:{margin:8,fontSize:12}}],tooltip:{textStyle:{fontSize:14}}}}a.setOption(o);var p=6,g=setInterval(function(){--p>0?a.resize():window.clearInterval(g)},150)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],e.push(n.month+"月"),a.push(n.area);return{titles:e,lineDatas:a}}}},tt=Z,et=Object(y["a"])(tt,W,U,!1,null,null,null),at=et.exports,nt=m["a"].FARMING,it="plantActLineDatas",rt="plantActPieDatas",ot=Object(d["a"])(nt).mapState,lt="plantFullState",ct={name:"farming-plant-act",computed:Object(f["a"])({},ot([lt,it,rt])),components:{PlantActPie:H,PlantActLine:at},methods:{doFullStateChange:function(t){var e=this;e.$store.commit(nt+"/"+u["a"].FARMING_CHANGE_FULL_STATE,{fullStateName:lt,state:t})}}},st=ct,ht=Object(y["a"])(st,C,D,!1,null,null,null),ft=ht.exports,ut=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"fertilizer-act-wrap act-wrap",attrs:{full:t.fertilizerFullState}},[a("PlaneTitle",[t._v("施肥活动"),a("div",{directives:[{name:"show",rawName:"v-show",value:t.fertilizerActLineDatas.length&&t.fertilizerActPieDatas.length,expression:"fertilizerActLineDatas.length && fertilizerActPieDatas.length"}],staticClass:"unit"},[t._v("单位：吨")])]),a("div",{staticClass:"plane-content",class:{hide:!t.fertilizerActLineDatas.length||!t.fertilizerActPieDatas.length}},[a("FertilizerActPie"),a("FertilizerActLine")],1),a("PlaneTools",{directives:[{name:"show",rawName:"v-show",value:t.fertilizerActLineDatas.length&&t.fertilizerActPieDatas.length,expression:"fertilizerActLineDatas.length && fertilizerActPieDatas.length"}],attrs:{full:t.fertilizerFullState},on:{change:t.doFullStateChange}}),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.fertilizerActLineDatas.length||!t.fertilizerActPieDatas.length,expression:"!fertilizerActLineDatas.length || !fertilizerActPieDatas.length"}],staticClass:"iconfont null-data-tag"},[t._v("")])],1)},dt=[],mt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container"})},pt=[],gt=m["a"].FARMING,vt=Object(d["a"])(gt).mapState,bt="fertilizerActPieDatas",St="$store.state.".concat(gt,".").concat(bt),xt="fertilizerFullState",wt="$store.state.".concat(gt,".").concat(xt),At="$store.state.windowResizeState",yt={name:"farming-fertilizer-act-pie",computed:Object(f["a"])({},vt([xt,bt]),{miniScreen:function(){return this.$store.state.winWidth<1300}}),watch:(r={},Object(R["a"])(r,St,function(){this.doInitOrRefreshChart()}),Object(R["a"])(r,wt,function(){this.doInitOrRefreshChart()}),Object(R["a"])(r,At,function(){this.doInitOrRefreshChart()}),r),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t[bt];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t[bt];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=e.miniScreen,l={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}吨 ({d}%)",backgroundColor:"rgba(0, 159, 253, 0.9)",textStyle:{fontSize:14}},legend:{show:!0,data:r,orient:"vertical",right:0,top:0,itemGap:o?5:10,textStyle:{color:"#d0d0d0",fontSize:12,padding:[2,0,0,2]}},series:[{type:"pie",radius:["40%","80%"],center:["36%","50%"],label:{show:!0,position:"inside",formatter:"{d}%",fontSize:12},color:["#15467d","#87d0f6","#4775b7","#91acd4","#2663bc"],data:i,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=P["a"].init(a),e.chart.setOption(l)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=null,l=e.miniScreen;o=e[xt]?{tooltip:{textStyle:{fontSize:18}},series:[{center:["47%","50%"],data:i,label:{fontSize:18}}],legend:{data:r,right:15,itemGap:20,top:15,textStyle:{fontSize:15}}}:{tooltip:{textStyle:{fontSize:14}},series:[{center:["36%","50%"],data:i,label:{fontSize:12}}],legend:{data:r,right:0,itemGap:l?5:10,top:0,textStyle:{fontSize:12}}},a.setOption(o);var c=6,s=setInterval(function(){--c>0?a.resize():window.clearInterval(s)},150)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.farm_model,value:n.weight}),e.push(n.farm_model);return{legendData:e,seriesData:a}}}},Ot=yt,zt=Object(y["a"])(Ot,mt,pt,!1,null,null,null),Ct=zt.exports,Dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container"})},Lt=[],jt=m["a"].FARMING,Rt=Object(d["a"])(jt).mapState,Pt="fertilizerActLineDatas",It="$store.state.".concat(jt,".").concat(Pt),_t="fertilizerFullState",Ft="$store.state.".concat(jt,".").concat(_t),$t="$store.state.windowResizeState",Mt={name:"farming-fertilizer-act-line",computed:Object(f["a"])({},Rt([_t,Pt])),watch:(o={},Object(R["a"])(o,It,function(){this.doInitOrRefreshChart()}),Object(R["a"])(o,Ft,function(){this.doInitOrRefreshChart()}),Object(R["a"])(o,$t,function(){this.doInitOrRefreshChart()}),o),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t[Pt];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t[Pt];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,r=n.lineDatas,o=Object(B["a"])(r,4),l=o.min,c=o.max,s=o.interval,h={grid:{top:10,left:0,right:0,bottom:0,containLabel:!0},tooltip:{trigger:"axis",formatter:"{b}：{c}吨",backgroundColor:"rgba(0, 159, 253, 0.9)",axisPointer:{lineStyle:{color:"rgba(238,238,238,0.4)"}},textStyle:{fontSize:14}},xAxis:[{type:"category",data:i,boundaryGap:!0,axisTick:{show:!0},axisLine:{lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{margin:8,textStyle:{color:"#fff",fontSize:12}}}],yAxis:[{show:!0,min:l,max:c,interval:s,splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.15)"}},axisTick:{show:!0},axisLine:{show:!0,lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{margin:8,show:!0,textStyle:{color:"#fff",fontSize:12}}}],color:["rgb(67,81,124)"],series:[{smooth:!0,symbol:"circle",symbolSize:6,showSymbol:!0,type:"line",data:r,areaStyle:{normal:{color:new P["a"].graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(67, 81, 124, 0.3)"},{offset:.85,color:"rgba(67, 81, 124, 0.1)"}],!1)}}}]};e.chart=P["a"].init(a),e.chart.setOption(h)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,r=n.lineDatas,o=null;if(e[_t]){var l=Object(B["a"])(r,8),c=l.min,s=l.max,h=l.interval;o={grid:{top:32,left:20,right:20,bottom:20},series:[{data:r}],xAxis:[{axisLabel:{margin:12,fontSize:15},data:i}],yAxis:[{min:c,max:s,interval:h,axisLabel:{margin:12,fontSize:15}}],tooltip:{textStyle:{fontSize:18}}}}else{var f=Object(B["a"])(r,4),u=f.min,d=f.max,m=f.interval;o={grid:{top:10,left:0,right:0,bottom:0},series:[{data:r}],xAxis:[{axisLabel:{margin:8,fontSize:12},data:i}],yAxis:[{min:u,max:d,interval:m,axisLabel:{margin:8,fontSize:12}}],tooltip:{textStyle:{fontSize:14}}}}a.setOption(o);var p=6,g=setInterval(function(){--p>0?a.resize():window.clearInterval(g)},150)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],e.push(n.month+"月"),a.push(n.weight);return{titles:e,lineDatas:a}}}},Gt=Mt,Nt=Object(y["a"])(Gt,Dt,Lt,!1,null,null,null),Et=Nt.exports,Tt=m["a"].FARMING,kt=Object(d["a"])(Tt).mapState,Ht="fertilizerFullState",Wt="fertilizerActLineDatas",Ut="fertilizerActPieDatas",Bt={name:"farming-fertilizer-act",computed:Object(f["a"])({},kt([Ht,Wt,Ut])),components:{FertilizerActPie:Ct,FertilizerActLine:Et},methods:{doFullStateChange:function(t){var e=this;e.$store.commit(Tt+"/"+u["a"].FARMING_CHANGE_FULL_STATE,{fullStateName:Ht,state:t})}}},Xt=Bt,Kt=Object(y["a"])(Xt,ut,dt,!1,null,null,null),qt=Kt.exports,Jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"protection-act-wrap act-wrap",attrs:{full:t.protectionFullState}},[a("PlaneTitle",[t._v("植保活动"),a("div",{directives:[{name:"show",rawName:"v-show",value:t.protectionActLineDatas.length&&t.protectionActPieDatas.length,expression:"protectionActLineDatas.length && protectionActPieDatas.length"}],staticClass:"unit"},[t._v("单位：亩")])]),a("div",{staticClass:"plane-content",class:{hide:!t.protectionActLineDatas.length||!t.protectionActPieDatas.length}},[a("ProtectionActPie"),a("ProtectionActLine")],1),a("PlaneTools",{directives:[{name:"show",rawName:"v-show",value:t.protectionActLineDatas.length&&t.protectionActPieDatas.length,expression:"protectionActLineDatas.length && protectionActPieDatas.length"}],attrs:{full:t.protectionFullState},on:{change:t.doFullStateChange}}),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.protectionActLineDatas.length||!t.protectionActPieDatas.length,expression:"!protectionActLineDatas.length || !protectionActPieDatas.length"}],staticClass:"iconfont null-data-tag"},[t._v("")])],1)},Yt=[],Qt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container"})},Vt=[],Zt=m["a"].FARMING,te=Object(d["a"])(Zt).mapState,ee="protectionActPieDatas",ae="$store.state.".concat(Zt,".").concat(ee),ne="protectionFullState",ie="$store.state.".concat(Zt,".").concat(ne),re="$store.state.windowResizeState",oe={name:"farming-fertilizer-act-pie",computed:Object(f["a"])({},te([ne,ee])),watch:(l={},Object(R["a"])(l,ae,function(){this.doInitOrRefreshChart()}),Object(R["a"])(l,ie,function(){this.doInitOrRefreshChart()}),Object(R["a"])(l,re,function(){this.doInitOrRefreshChart()}),Object(R["a"])(l,"miniScreen",function(){return this.$store.state.winWidth<1300}),l),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t[ee];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t[ee];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=e.miniScreen,l={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}亩 ({d}%)",backgroundColor:"rgba(0, 159, 253, 0.9)",textStyle:{fontSize:14}},legend:{show:!0,data:r,orient:"vertical",right:0,top:0,itemGap:o?5:10,textStyle:{color:"#d0d0d0",fontSize:12,padding:[2,0,0,2]}},series:[{type:"pie",radius:["40%","80%"],center:["36%","50%"],label:{show:!0,position:"inside",formatter:"{d}%",fontSize:12},color:["#4775b7","#91acd4","#2663bc"],data:i,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=P["a"].init(a),e.chart.setOption(l)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,r=n.legendData,o=null,l=e.miniScreen;o=e[ne]?{tooltip:{textStyle:{fontSize:18}},series:[{center:["47%","50%"],data:i,label:{fontSize:18}}],legend:{data:r,right:15,itemGap:20,top:15,textStyle:{fontSize:15}}}:{tooltip:{textStyle:{fontSize:14}},series:[{center:["36%","50%"],data:i,label:{fontSize:12}}],legend:{data:r,right:0,itemGap:l?5:10,top:0,textStyle:{fontSize:12}}},a.setOption(o);var c=6,s=setInterval(function(){--c>0?a.resize():window.clearInterval(s)},150)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.farm_model,value:n.weight}),e.push(n.farm_model);return{legendData:e,seriesData:a}}}},le=oe,ce=Object(y["a"])(le,Qt,Vt,!1,null,null,null),se=ce.exports,he=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container"})},fe=[],ue=m["a"].FARMING,de=Object(d["a"])(ue).mapState,me="protectionActLineDatas",pe="$store.state.".concat(ue,".").concat(me),ge="protectionFullState",ve="$store.state.".concat(ue,".").concat(ge),be="$store.state.windowResizeState",Se={name:"farming-fertilizer-act-line",computed:Object(f["a"])({},de([ge,me])),watch:(c={},Object(R["a"])(c,pe,function(){this.doInitOrRefreshChart()}),Object(R["a"])(c,ve,function(){this.doInitOrRefreshChart()}),Object(R["a"])(c,be,function(){this.doInitOrRefreshChart()}),c),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t[me];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t[me];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,r=n.lineDatas,o=Object(B["a"])(r,4),l=o.min,c=o.max,s=o.interval,h={grid:{top:10,left:0,right:0,bottom:0,containLabel:!0},tooltip:{trigger:"axis",formatter:"{b}：{c}亩",backgroundColor:"rgba(0, 159, 253, 0.9)",axisPointer:{lineStyle:{color:"rgba(238,238,238,0.4)"}},textStyle:{fontSize:14}},xAxis:[{type:"category",data:i,boundaryGap:!0,axisTick:{show:!0},axisLine:{lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{margin:8,textStyle:{color:"#fff",fontSize:12}}}],yAxis:[{show:!0,min:l,max:c,interval:s,splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.15)"}},axisTick:{show:!0},axisLine:{show:!0,lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{show:!0,textStyle:{color:"#fff",fontSize:12}}}],color:["rgb(67, 81, 124)"],series:[{smooth:!0,symbol:"circle",symbolSize:6,showSymbol:!0,type:"line",data:r,areaStyle:{normal:{color:new P["a"].graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(67, 81, 124, 0.3)"},{offset:.85,color:"rgba(67, 81, 124, 0.1)"}],!1)}}}]};e.chart=P["a"].init(a),e.chart.setOption(h)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,r=n.lineDatas,o=null;if(e[ge]){var l=Object(B["a"])(r,8),c=l.min,s=l.max,h=l.interval;o={grid:{top:32,left:20,right:20,bottom:20},series:[{data:r}],xAxis:[{axisLabel:{margin:12,fontSize:15},data:i}],yAxis:[{min:c,max:s,interval:h,axisLabel:{margin:12,fontSize:15}}],tooltip:{textStyle:{fontSize:18}}}}else{var f=Object(B["a"])(r,4),u=f.min,d=f.max,m=f.interval;o={grid:{top:10,left:0,right:0,bottom:0},series:[{data:r}],xAxis:[{axisLabel:{margin:8,fontSize:12},data:i}],yAxis:[{min:u,max:d,interval:m,axisLabel:{margin:8,fontSize:12}}],tooltip:{textStyle:{fontSize:14}}}}a.setOption(o);var p=6,g=setInterval(function(){--p>0?a.resize():window.clearInterval(g)},150)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],e.push(n.month+"月"),a.push(n.weight);return{titles:e,lineDatas:a}}}},xe=Se,we=Object(y["a"])(xe,he,fe,!1,null,null,null),Ae=we.exports,ye=m["a"].FARMING,Oe=Object(d["a"])(ye).mapState,ze="protectionFullState",Ce="protectionActLineDatas",De="protectionActPieDatas",Le={name:"farming-fertilizer-act",components:{ProtectionActPie:se,ProtectionActLine:Ae},computed:Object(f["a"])({},Oe([ze,Ce,De])),methods:{doFullStateChange:function(t){var e=this;e.$store.commit(ye+"/"+u["a"].FARMING_CHANGE_FULL_STATE,{fullStateName:ze,state:t})}}},je=Le,Re=Object(y["a"])(je,Jt,Yt,!1,null,null,null),Pe=Re.exports,Ie=m["a"].FARMING,_e=(Object(d["a"])(Ie).mapState,{name:"farming-info-index",components:{Map:z,PlantAct:ft,FertilizerAct:qt,ProtectionAct:Pe},computed:Object(f["a"])({},Object(d["c"])(["screenFullState"])),created:function(){var t=this,e=t.$store;e.dispatch(Ie+"/"+u["a"].FARMING_GET_DATA),e.commit(u["a"].SWITCH_LOADING,!1)},beforeDestroy:function(){var t=this,e=t.$store;e.commit(Ie+"/"+u["a"].FARMING_CHANGE_CURR_REGION,"");var a=["plantFullState","protectionFullState","fertilizerFullState","mapFullState"];a.forEach(function(t){e.commit(Ie+"/"+u["a"].FARMING_CHANGE_FULL_STATE,{fullStateName:t,state:!1})})}}),Fe=_e,$e=(a("e841"),Object(y["a"])(Fe,s,h,!1,null,null,null));e["default"]=$e.exports},bb28:function(t,e,a){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}function i(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function o(t){return n(t)||i(t)||r()}a.d(e,"a",function(){return o})},df17:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wuyishan-map-container"},[a("div",{ref:"container"}),a("div",{staticClass:"curr-region"},[a("a",{on:{click:function(e){return t.doClearMap()}}},[t._v("武夷山市")]),a("i",{directives:[{name:"show",rawName:"v-show",value:t.curr,expression:"curr"}]}),a("a",[t._v(t._s(t.curr))])])])},i=[],r=(a("0b9e"),a("3a23"),a("612f"),a("4013"),a("44a2"),a("3604")),o=a("1a1e"),l={"星村镇":{color:"rgba(31, 80, 150, 0.7)",selected:!1},"兴田镇":{color:"rgba(134, 184, 255, 0.7)",selected:!1},"洋庄乡":{color:"rgba(71, 120, 190, 0.7)",selected:!1},"五夫镇":{color:"rgba(75, 147, 250, 0.7)",selected:!1},"上梅乡":{color:"rgba(31, 80, 150, 0.7)",selected:!1},"岚谷乡":{color:"rgba(31, 80, 150, 0.7)",selected:!1},"吴屯乡":{color:"rgba(75, 147, 250, 0.7)",selected:!1},"新丰街道":{color:"rgba(134, 184, 255, 0.7)",selected:!1},"崇安街道":{color:"rgba(31, 80, 150, 0.7)",selected:!1},"武夷街道":{color:"rgba(75, 147, 250, 0.7)",selected:!1}},c=["","星村镇","兴田镇","洋庄乡","五夫镇","上梅乡","岚谷乡","吴屯乡","新丰街道","崇安街道","武夷街道"],s={name:"WuyishanMap",props:{curr:{type:String,default:"",required:!0},full:{type:Boolean,default:!1}},watch:{full:function(){var t=this;t.refresh()}},data:function(){return{chart:null,currSelectedRegion:"",mapRegions:Object.keys(l).map(function(t){return{name:t,selected:l[t].selected,itemStyle:{areaColor:l[t].color}}}),currPlaceIndex:0,timer:null,autoChange:!1}},created:function(){var t=this;if(t.curr)for(var e=0;e<t.mapRegions.length;e++)if(t.mapRegions[e].name==t.curr){t.mapRegions[e].selected=!0;break}document.addEventListener("keypress",t.doHandleKeyPress)},mounted:function(){var t=this;t.$nextTick(function(){t.$ajax({url:"./map.json"}).then(function(e){r["a"].registerMap("wuyishan",e),t.chart=r["a"].init(t.$refs.container),t.chart.setOption({backgroundColor:"transparent",geo:{map:"wuyishan",selectedMode:"single",itemStyle:{emphasis:{areaColor:"#238cff",borderWidth:0},normal:{areaColor:"#1f5096",borderColor:"#3B5077",borderWidth:0}},label:{emphasis:{textStyle:{color:"#d0d0d0",fontSize:16,fontWeight:"bold"}},normal:{show:!0,textStyle:{color:"#d0d0d0",fontSize:12}}},regions:t.mapRegions,roam:!0,zoom:1.2}}),t.chart.on("click",function(e){t.doClickMap(e.name)}),window.addEventListener("resize",t.refresh)})})},methods:{doClickMap:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1?arguments[1]:void 0,a=this;a.curr==t&&(t="");var n=a.chart;n.getOption();if(a.mapRegions.forEach(function(e){e.selected=e.name==t}),n.setOption({geo:{regions:a.mapRegions}}),a.$emit("change",t),!e)for(var i=0;i<c.length;i++)if(c[i]==t){a.currPlaceIndex=i;break}},doClearMap:function(){var t=this;t.doClickMap("")},refresh:function(){var t=this;setTimeout(function(){var e=t.chart;if(e){var a=null;a=t.full?{geo:{label:{normal:{textStyle:{fontSize:16}},emphasis:{textStyle:{fontSize:21}}}}}:{geo:{label:{normal:{textStyle:{fontSize:12}},emphasis:{textStyle:{fontSize:16}}}}},e.setOption(a),e.resize()}},120)},doAutoChange:function(){var t=this;t.currPlaceIndex++,t.currPlaceIndex>10&&(t.currPlaceIndex=0),t.doClickMap(c[t.currPlaceIndex],!0),t.timer=setTimeout(function(){t.doAutoChange()},o["a"].mapAutoChangeTime)},doHandleKeyPress:function(t){var e=this;32==t.keyCode&&e.chart&&(e.autoChange?e.timer&&clearInterval(e.timer):e.doAutoChange(),e.autoChange=!e.autoChange)}},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.refresh),document.removeEventListener("keypress",t.doHandleKeyPress),t.timer&&clearInterval(t.timer)}},h=s,f=a("17cc"),u=Object(f["a"])(h,n,i,!1,null,null,null);e["a"]=u.exports},e841:function(t,e,a){"use strict";var n=a("a424"),i=a.n(n);i.a},f1ed:function(t,e,a){"use strict";a.d(e,"b",function(){return i}),a.d(e,"a",function(){return r}),a.d(e,"c",function(){return o});var n=a("bb28");a("5f33"),a("f91a");function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd hh:mm:ss",a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var n in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[n]:("00"+a[n]).substr((""+a[n]).length)));return e}function r(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=0,r=Math.max.apply(Math,Object(n["a"])(t)),o=0;if(r==i)o=2,r=o*e;else{o=Math.ceil((r-i)/e);var l=Math.pow(10,(o+"").length-1);o=Math.ceil(o/l+a)*l,r=e*o}return{min:i,max:r,interval:o}}var o={ios:/\(i[^;]+;( U;)? CPU.+Mac OS X/}}}]);