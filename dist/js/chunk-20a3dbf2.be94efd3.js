(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20a3dbf2"],{"28a5":function(t,e,a){a("214f")("split",2,function(t,e,n){"use strict";var i=a("aae3"),o=n,r=[].push,l="split",s="length",c="lastIndex";if("c"=="abbc"[l](/(b)*/)[1]||4!="test"[l](/(?:)/,-1)[s]||2!="ab"[l](/(?:ab)*/)[s]||4!="."[l](/(.?)(.?)/)[s]||"."[l](/()()/)[s]>1||""[l](/.?/)[s]){var u=void 0===/()??/.exec("")[1];n=function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!i(t))return o.call(a,t,e);var n,l,h,f,d,m=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),S=0,g=void 0===e?4294967295:e>>>0,v=new RegExp(t.source,p+"g");u||(n=new RegExp("^"+v.source+"$(?!\\s)",p));while(l=v.exec(a)){if(h=l.index+l[0][s],h>S&&(m.push(a.slice(S,l.index)),!u&&l[s]>1&&l[0].replace(n,function(){for(d=1;d<arguments[s]-2;d++)void 0===arguments[d]&&(l[d]=void 0)}),l[s]>1&&l.index<a[s]&&r.apply(m,l.slice(1)),f=l[0][s],S=h,m[s]>=g))break;v[c]===l.index&&v[c]++}return S===a[s]?!f&&v.test("")||m.push(""):m.push(a.slice(S)),m[s]>g?m.slice(0,g):m}}else"0"[l](void 0,0)[s]&&(n=function(t,e){return void 0===t&&0===e?[]:o.call(this,t,e)});return[function(a,i){var o=t(this),r=void 0==a?void 0:a[e];return void 0!==r?r.call(a,o,i):n.call(String(o),a,i)},n]})},6362:function(t,e,a){"use strict";var n=a("f00b"),i=a.n(n);i.a},"8a00":function(t,e,a){"use strict";a.r(e);var n,i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page home-page"},[a("div",[a("AmountRank"),a("FarmingInfo"),a("PickInfo")],1),a("div",[a("PlantInfo"),a("WarehouseInfo")],1),a("div",[a("OriginData"),a("Iot"),a("LevelInfo")],1)])},o=[],r=(a("f3e2"),a("cadf"),a("551c"),a("097d"),a("eb57")),l=a("2f62"),s=a("0706"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"farming-info-wrap",attrs:{full:t.farmingInfoFullState}},[a("PlaneTitle",[t._v("施肥信息")]),a("div",{ref:"container",staticClass:"plane-content"}),a("PlaneTools",{attrs:{full:t.farmingInfoFullState},on:{change:t.doFullStateChange}})],1)},u=[],h=(a("6b54"),a("87b3"),a("6d67"),a("55dd"),a("ac6a"),a("ade3")),f=a("be94"),d=a("3604"),m=s["a"].HOME,p=Object(l["a"])(m).mapState,S="farmingActdatas",g="farmingInfoFullState",v="$store.state.".concat(m,".").concat(S),b="$store.state.".concat(m,".").concat(g),x="$store.state.windowResizeState",O={name:"app-farming-info",computed:Object(f["a"])({},p([g]),{miniScreen:function(){return this.$store.state.winWidth<1300}}),watch:(n={},Object(h["a"])(n,v,function(){console.log(12),this.doInitOrRefreshChart()}),Object(h["a"])(n,b,function(){this.doInitOrRefreshChart()}),Object(h["a"])(n,x,function(){this.doInitOrRefreshChart()}),n),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[m][S];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[m][S];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.values,o=n.titles,r=(e.miniScreen,{grid:{top:16,left:0,right:5,bottom:0,containLabel:!0},tooltip:{trigger:"axis",formatter:"{b}月：{c}kg",backgroundColor:"rgba(0, 159, 253, 0.9)",axisPointer:{lineStyle:{color:"rgba(238, 238, 238, 0.4)"}},textStyle:{fontSize:14}},xAxis:[{type:"category",data:o,boundaryGap:!0,axisTick:{show:!0},axisLine:{lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{margin:8,textStyle:{color:"#fff",fontSize:12}}}],yAxis:[{show:!0,splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(38, 99, 188, 0.3)"}},axisTick:{show:!0},axisLine:{show:!0,lineStyle:{color:"rgba(38, 99, 188, 0.5)"}},axisLabel:{show:!0,margin:8,textStyle:{color:"#fff",fontSize:12}}}],color:["#4775b7"],series:[{smooth:!0,type:"line",symbol:"circle",symbolSize:.02,data:i,lineStyle:{type:"dotted",width:1,color:"rgba(0, 159, 253, 0.65)"},areaStyle:{normal:{color:new d["a"].graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(71, 117, 183, 0.3)"},{offset:.85,color:"rgba(71, 117, 183, 0.1)"}],!1)}}}]});e.chart=d["a"].init(a),e.chart.setOption(r)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,o=n.values,r=null;r=e[g]?{grid:{top:32,left:20,right:20,bottom:20},series:[{data:o}],xAxis:[{axisLabel:{margin:12,fontSize:15},data:i}],yAxis:[{axisLabel:{margin:12,fontSize:15}}],tooltip:{textStyle:{fontSize:18}}}:{grid:{top:10,left:0,right:5,bottom:0},series:[{data:o}],xAxis:[{axisLabel:{margin:8,fontSize:12},data:i}],yAxis:[{axisLabel:{margin:8,fontSize:12}}],tooltip:{textStyle:{fontSize:14}}},a.setOption(r),setTimeout(function(){a.resize()},200)},handleChartData:function(t){console.log(t);var e=this,a={},n=0,i=t.map(function(t){return t.value}).sort(function(t,e){return t-e>0?1:-1});i.forEach(function(t,e){0===e?(a[t]=14+2*t.toString().length,n=t):i[e-1]!==t&&(a[t]=a[n]+3,n=t)});var o=[],r=[],l=0,s=e[g]?42:28;return t.forEach(function(t){o.push(t.label+"月"),l=a[t.value],l=l>s?s:l,r.push({name:t.label,value:t.value,emphasis:{label:!0},label:{show:!0,padding:0,borderWidth:e[g]?2:1,borderColor:"rgba(0, 159, 253, 0.3)",borderRadius:l,verticalAlign:"middle",align:"center",width:l,height:l,lineHeight:l,fontSize:e[g]?14:9,color:"#fff",rich:{}}})}),{titles:o,values:r}},doFullStateChange:function(t){var e=this;e.$store.commit(m+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:g,state:t})}}},C=O,w=a("2877"),y=Object(w["a"])(C,c,u,!1,null,null,null);y.options.__file="FarmingInfo.vue";var _=y.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"iot-wrap"},[a("PlaneTitle",[t._v("物联监控")]),a("div",{staticClass:"plane-container"},[a("div",{staticClass:"iot-item"},[a("div",[a("i",{staticClass:"iconfont"},[t._v("")]),a("div",[t._v("摄像头")])]),a("div",[t._v(t._s(t.cameraAmount))])]),a("div",{staticClass:"iot-item"},[a("div",[a("i",{staticClass:"iconfont"},[t._v("")]),a("div",[t._v("监测站")])]),a("div",[t._v(t._s(t.monitorAmount))])])])],1)},$=[],E=s["a"].HOME,I=Object(l["a"])(E).mapState,R={name:"app-iot",computed:Object(f["a"])({},I(["cameraAmount","monitorAmount","waterFertilizerAmount"]))},A=R,T=Object(w["a"])(A,z,$,!1,null,null,null);T.options.__file="Iot.vue";var L,F=T.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"origin-wrap",attrs:{full:t.originDataFullState}},[a("PlaneTitle",[t._v("溯源排行")]),a("div",{ref:"container",staticClass:"plane-content"}),a("PlaneTools",{attrs:{full:t.originDataFullState},on:{change:t.doFullStateChange}})],1)},k=[];a("87a1");var j=s["a"].HOME,M=Object(l["a"])(j).mapState,H="cityDatas",P="$store.state.".concat(j,".").concat(H),G="originDataFullState",W="$store.state.".concat(j,".").concat(G),N="$store.state.windowResizeState",U={name:"home-origin-data",computed:Object(f["a"])({},M([G]),{miniScreen:function(){return this.$store.state.winWidth<1300}}),watch:(L={},Object(h["a"])(L,P,function(){this.doInitOrRefreshChart()}),Object(h["a"])(L,W,function(){this.doInitOrRefreshChart()}),Object(h["a"])(L,N,function(){this.doInitOrRefreshChart()}),L),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[j][H];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[j][H];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.miniScreen,i={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}",backgroundColor:"rgba(0, 159, 253, 0.9)",textStyle:{fontSize:14}},series:[{type:"wordCloud",gridSize:10,sizeRange:n?[12,22]:[14,30],rotationRange:[0,0],shape:"circle",autoSize:{enable:!0,minSize:12},data:t,textStyle:{normal:{color:function(){return"hsla("+[207+Math.round(10*Math.random()),75+Math.round(12*Math.random())+"%",60+Math.round(10*Math.random())+"%",.2+Math.random()].join(",")+")"}},emphasis:{shadowBlur:10,shadowColor:"#333"}}}]};e.chart=d["a"].init(a),e.chart.setOption(i)},refresh:function(t){var e=this,a=e.chart,n=e.miniScreen,i=null;i=e[G]?{series:[{data:t,gridSize:20,sizeRange:[14,50]}],tooltip:{textStyle:{fontSize:18}}}:{series:[{data:t,gridSize:10,sizeRange:n?[12,22]:[14,30]}],tooltip:{textStyle:{fontSize:14}}},a.setOption(i),setTimeout(function(){a.resize()},200)},doFullStateChange:function(t){var e=this;e.$store.commit(j+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:G,state:t})}}},B=U,J=Object(w["a"])(B,D,k,!1,null,null,null);J.options.__file="OriginData.vue";var K=J.exports,X=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"plant-distribute-wrap",attrs:{full:t.mapFullState}},[a("WuyishanMap",{attrs:{curr:t.currSelectedRegion,full:t.mapFullState},on:{change:t.doMapChange}}),a("PlaneTools",{attrs:{full:t.mapFullState},on:{change:t.doFullStateChange}})],1)},q=[],Q=a("df17"),V=s["a"].HOME,Y=Object(l["a"])(V).mapState,Z="mapFullState",tt={name:"home-plant-info",components:{WuyishanMap:Q["a"]},computed:Object(f["a"])({},Y(["currSelectedRegion",Z])),methods:{doMapChange:function(t){var e=this,a=e.$store;a.commit(V+"/"+r["a"].HOME_CHANGE_CURR_REGION,t),a.dispatch(V+"/"+r["a"].HOME_GET_AMOUNT_RANK_DATA,t)},doFullStateChange:function(t){var e=this;e.$store.commit(V+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:Z,state:t})}}},et=tt,at=Object(w["a"])(et,X,q,!1,null,null,null);at.options.__file="PlantInfo.vue";var nt,it=at.exports,ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"warehouse-info-wrap",attrs:{full:t.warehouseFullState}},[a("PlaneTitle",[t._v("入库出库")]),a("div",{ref:"container",staticClass:"plane-content"}),a("PlaneTools",{attrs:{full:t.warehouseFullState},on:{change:t.doFullStateChange}})],1)},rt=[],lt=s["a"].HOME,st=Object(l["a"])(lt).mapState,ct="warehouseDatas",ut="warehouseFullState",ht="$store.state.".concat(lt,".").concat(ct),ft="$store.state.".concat(lt,".").concat(ut),dt="$store.state.windowResizeState",mt={name:"home-warehouse",computed:Object(f["a"])({},st(["warehouseUnit",ut]),{miniScreen:function(){return this.$store.state.winWidth<1300}}),watch:(nt={},Object(h["a"])(nt,ht,function(){this.doInitOrRefreshChart()}),Object(h["a"])(nt,ft,function(){this.doInitOrRefreshChart()}),Object(h["a"])(nt,dt,function(){this.doInitOrRefreshChart()}),nt),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[lt][ct];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[lt][ct];e&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,o=n.values,r=e.miniScreen,l={tooltip:{trigger:"axis",formatter:"{b0}<br/>{a0}: {c0} ".concat(e.warehouseUnit,"<br/>{a1}: {c1} ").concat(e.warehouseUnit),backgroundColor:"rgba(0, 159, 253, 0.9)",axisPointer:{lineStyle:{color:"rgba(238,238,238,0.4)"}},textStyle:{fontSize:14}},legend:{show:!0,data:["入库","出库"],right:0,top:18,itemGap:r?5:15,textStyle:{color:"#d0d0d0",fontSize:r?12:14,padding:[2,0,0,r?0:2]}},grid:{top:48,bottom:2,left:5,right:5,containLabel:!0},xAxis:{data:i,axisLine:{lineStyle:{color:"#0c3b71"}},axisLabel:{margin:8,interval:0,rotate:0,color:"#fff",fontSize:12}},yAxis:[{axisLine:{lineStyle:{color:"#0c3b71"}},axisLabel:{margin:8,interval:0,color:"#fff",fontSize:12},splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.2)",width:.5}}}],color:["#91acd4","#2663bc"],series:[{name:"入库",type:"bar",barWidth:r?8:10,itemStyle:{normal:{barBorderRadius:5}},data:o[0]},{name:"出库",type:"bar",barWidth:r?8:10,itemStyle:{normal:{barBorderRadius:5}},data:o[1]}]};e.chart=d["a"].init(a),e.chart.setOption(l)},refresh:function(t){var e=this,a=e.chart,n=e.miniScreen,i=e.handleChartData(t),o=i.titles,r=i.values,l=null;l=e[ut]?{tooltip:{textStyle:{fontSize:18}},xAxis:[{data:o,axisLabel:{margin:12,fontSize:15}}],yAxis:[{axisLabel:{margin:12,fontSize:15}}],grid:{top:58,bottom:20,left:25,right:25},series:[{barWidth:20,data:r[0]},{barWidth:20,data:r[1]}],legend:{itemGap:15,right:20,textStyle:{fontSize:16,padding:[2,0,0,2]}}}:{tooltip:{textStyle:{fontSize:14}},xAxis:[{data:o,axisLabel:{margin:8,fontSize:12}}],yAxis:[{axisLabel:{margin:8,fontSize:12}}],grid:{top:48,bottom:2,left:5,right:5},series:[{barWidth:n?8:10,data:r[0]},{barWidth:10,data:r[1]}],legend:{itemGap:n?5:15,right:0,textStyle:{fontSize:n?12:14,padding:[2,0,0,n?0:2]}}},a.setOption(l),setTimeout(function(){a.resize()},100)},handleChartData:function(t){var e=[],a=[[],[]];return t.in.forEach(function(t){e.push(t.month+"月"),a[0].push(t.amount)}),t.out.forEach(function(t){a[1].push(t.amount)}),{titles:e,values:a}},doFullStateChange:function(t){var e=this;e.$store.commit(lt+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:ut,state:t})}}},pt=mt,St=Object(w["a"])(pt,ot,rt,!1,null,null,null);St.options.__file="WarehouseInfo.vue";var gt,vt=St.exports,bt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"amount-rank-wrap",attrs:{full:t.amountRankFullState}},[a("PlaneTitle",[t._v("茶树排行")]),a("div",{ref:"container",staticClass:"plane-content"}),a("PlaneTools",{attrs:{full:t.amountRankFullState},on:{change:t.doFullStateChange}})],1)},xt=[],Ot=(a("28a5"),s["a"].HOME),Ct=Object(l["a"])(Ot).mapState,wt="amountRankDatas",yt="amountRankFullState",_t="$store.state.".concat(Ot,".").concat(wt),zt="$store.state.".concat(Ot,".").concat(yt),$t="$store.state.windowResizeState",Et={name:"home-amount-rank",computed:Object(f["a"])({},Ct(["amountRankUnit",yt,"amountRankDatas"])),watch:(gt={},Object(h["a"])(gt,_t,function(){this.doInitOrRefreshChart()}),Object(h["a"])(gt,zt,function(){this.doInitOrRefreshChart()}),Object(h["a"])(gt,$t,function(){this.doInitOrRefreshChart()}),gt),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[Ot][wt];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[Ot][wt];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.titles,o=n.values,r={grid:{top:10,left:5,right:10,bottom:0,containLabel:!0},tooltip:{trigger:"axis",formatter:"{b}：{c} 亩",backgroundColor:"rgba(0, 159, 253, 0.9)",axisPointer:{lineStyle:{color:"rgba(238,238,238,0.4)"}},textStyle:{fontSize:14}},yAxis:[{show:!0,splitLine:{show:!0,lineStyle:{type:"dosh",color:"rgba(238, 238, 238, 0.2)",width:.5}},axisLine:{lineStyle:{color:"#0c3b71"}},axisLabel:{margin:8,interval:0,rotate:0,color:"#fff",fontSize:12}}],xAxis:{show:!0,data:i,inverse:!0,axisLine:{lineStyle:{color:"#0c3b71"}},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#fff",fontSize:12,margin:5,formatter:function(t){return t.split("").join("\n")}}},series:[{type:"bar",yAxisIndex:0,data:o,barWidth:10,itemStyle:{normal:{barBorderRadius:30,color:new d["a"].graphic.LinearGradient(0,0,1,1,[{offset:0,color:"#2663bc"},{offset:1,color:"#003366"}])}}}]};e.chart=d["a"].init(a),e.chart.setOption(r)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.titles,o=n.values,r=null;r=e[yt]?{grid:{top:25,left:20,right:20,bottom:20},xAxis:{axisLabel:{margin:12,fontSize:15},data:i},yAxis:[{axisLabel:{margin:12,fontSize:15}}],tooltip:{textStyle:{fontSize:18}},series:[{barWidth:20,data:o}]}:{grid:{top:10,left:5,right:10,bottom:0},xAxis:{axisLabel:{margin:5,fontSize:12},data:i},yAxis:[{axisLabel:{margin:8,fontSize:12}}],tooltip:{textStyle:{fontSize:14}},series:[{barWidth:10,data:o}]},a.setOption(r),setTimeout(function(){a.resize()},100)},handleChartData:function(t){var e=[],a=[];return t.forEach(function(t){e.push(t.town.length<5?t.town:t.town.substring(0,4)+"…"),a.push(t.area)}),{titles:e,values:a}},doFullStateChange:function(t){var e=this;e.$store.commit(Ot+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:yt,state:t})}}},It=Et,Rt=Object(w["a"])(It,bt,xt,!1,null,null,null);Rt.options.__file="AmountRank.vue";var At,Tt=Rt.exports,Lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"pick-info-wrap",attrs:{full:t.pickInfoFullState}},[a("PlaneTitle",[t._v("采摘信息")]),a("div",{staticClass:"plane-content"},[a("div",{ref:"container",staticClass:"chart-container"}),a("div",{staticClass:"chart-title"},[a("h4",[t._v("茶叶总产量")]),a("div",[t._v(t._s(t.teaTotalAmount)),a("span",[t._v("吨")])])])]),a("PlaneTools",{attrs:{full:t.pickInfoFullState},on:{change:t.doFullStateChange}})],1)},Ft=[],Dt=s["a"].HOME,kt=Object(l["a"])(Dt).mapState,jt="$store.state.".concat(Dt,".pickDatas"),Mt="pickInfoFullState",Ht="$store.state.".concat(Dt,".").concat(Mt),Pt="$store.state.windowResizeState",Gt={name:"home-pick-info",computed:Object(f["a"])({},kt(["teaTotalAmount",Mt]),{miniScreen:function(){return this.$store.state.winWidth<1300}}),watch:(At={},Object(h["a"])(At,jt,function(){this.doInitOrRefreshChart()}),Object(h["a"])(At,Ht,function(){this.doInitOrRefreshChart()}),Object(h["a"])(At,Pt,function(){this.doInitOrRefreshChart()}),At),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[Dt].pickDatas;e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[Dt].pickDatas;e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.miniScreen,i=e.handleChartData(t),o=i.seriesData,r=i.legendData,l={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}吨 ({d}%)",backgroundColor:"rgba(0, 159, 253, 0.9)",textStyle:{fontSize:14}},legend:{show:!0,data:r,orient:"vertical",right:n?0:"3%",top:10,itemGap:n?5:15,textStyle:{color:"#d0d0d0",fontSize:n?12:14,padding:[2,0,0,n?0:4]}},series:[{type:"pie",radius:["45%",n?"80%":"88%"],center:[n?"38%":"44%","50%"],label:{show:!0,position:"inside",formatter:"{d}%",fontSize:12},color:["#43517c","#87d0f6","#4775b7","#91acd4","#15467d"],data:o,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=d["a"].init(a),e.chart.setOption(l)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,o=n.legendData,r=null,l=e.miniScreen;r=e[Mt]?{tooltip:{textStyle:{fontSize:18}},series:[{center:[l?"38%":"44%","50%"],radius:["45%","88%"],data:i,label:{fontSize:16}}],legend:{data:o,right:"3.5%",itemGap:20,top:20,textStyle:{fontSize:16}}}:{tooltip:{textStyle:{fontSize:14}},series:[{center:[l?"38%":"44%","50%"],radius:["45%",l?"80%":"88%"],data:i,label:{fontSize:12}}],legend:{data:o,right:l?0:"3%",itemGap:l?5:15,top:10,textStyle:{fontSize:l?12:14,padding:[2,0,0,l?0:4]}}},a.setOption(r),setTimeout(function(){a.resize()},200)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.label,value:n.value}),e.push(n.label);return{legendData:e,seriesData:a}},doFullStateChange:function(t){var e=this;e.$store.commit(Dt+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:Mt,state:t})}}},Wt=Gt,Nt=Object(w["a"])(Wt,Lt,Ft,!1,null,null,null);Nt.options.__file="PickInfo.vue";var Ut,Bt=Nt.exports,Jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Plane",{staticClass:"level-info-wrap",attrs:{full:t.levelInfoFullState}},[a("PlaneTitle",[t._v("制茶工艺")]),a("div",{ref:"container",staticClass:"plane-content"}),a("PlaneTools",{attrs:{full:t.levelInfoFullState},on:{change:t.doFullStateChange}})],1)},Kt=[],Xt=s["a"].HOME,qt=Object(l["a"])(Xt).mapState,Qt="levelDatas",Vt="levelInfoFullState",Yt="$store.state.".concat(Xt,".").concat(Qt),Zt="$store.state.".concat(Xt,".").concat(Vt),te="$store.state.windowResizeState",ee={name:"home-level-info",computed:Object(f["a"])({},qt(["teaTotalAmount",Vt]),{miniScreen:function(){return this.$store.state.winWidth<1300}}),watch:(Ut={},Object(h["a"])(Ut,Yt,function(){this.doInitOrRefreshChart()}),Object(h["a"])(Ut,Zt,function(){this.doInitOrRefreshChart()}),Object(h["a"])(Ut,te,function(){this.doInitOrRefreshChart()}),Ut),data:function(){return{container:null,chart:null}},mounted:function(){var t=this;t.$nextTick(function(){t.container=t.$refs.container;var e=t.$store.state[Xt][Qt];e.length&&!t.chart&&t.init(e)})},methods:{doInitOrRefreshChart:function(){var t=this,e=t.$store.state[Xt][Qt];e&&e.length&&t.container&&(t.chart?t.refresh(e):t.init(e))},init:function(t){var e=this,a=e.container,n=e.handleChartData(t),i=n.seriesData,o=n.legendData,r=e.miniScreen,l={tooltip:{trigger:"item",show:!0,formatter:"{b}：{c}吨 ({d}%)",backgroundColor:"rgba(0, 159, 253, 0.9)",textStyle:{fontSize:14}},legend:{show:!0,data:o,orient:"vertical",right:r?0:"3%",top:10,itemGap:r?5:15,textStyle:{color:"#d0d0d0",fontSize:r?12:14,padding:[2,0,0,r?0:4]}},series:[{type:"pie",radius:["45%",r?"80%":"88%"],center:[r?"38%":"44%","50%"],label:{show:!0,position:"inside",formatter:"{d}%",fontSize:12},color:["#43517c","#87d0f6","#4775b7","#91acd4","#15467d"],data:i,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};e.chart=d["a"].init(a),e.chart.setOption(l)},refresh:function(t){var e=this,a=e.chart,n=e.handleChartData(t),i=n.seriesData,o=n.legendData,r=null,l=e.miniScreen;r=e[Vt]?{tooltip:{textStyle:{fontSize:18}},series:[{center:[l?"38%":"44%","50%"],radius:["45%","88%"],data:i,label:{fontSize:16}}],legend:{data:o,right:"4%",top:20,itemGap:20,textStyle:{fontSize:16}}}:{tooltip:{textStyle:{fontSize:14}},series:[{center:[l?"38%":"44%","50%"],radius:["45%",l?"80%":"88%"],data:i,label:{fontSize:12}}],legend:{data:o,right:l?0:"3%",itemGap:l?5:15,top:10,textStyle:{fontSize:l?12:14,padding:[2,0,0,l?0:4]}}},a.setOption(r),setTimeout(function(){a.resize()},200)},handleChartData:function(t){for(var e=[],a=[],n=null,i=0;i<t.length;i++)n=t[i],a.push({name:n.grade,value:n.gravity}),e.push(n.grade);return{legendData:e,seriesData:a}},doFullStateChange:function(t){var e=this;e.$store.commit(Xt+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:Vt,state:t})}}},ae=ee,ne=Object(w["a"])(ae,Jt,Kt,!1,null,null,null);ne.options.__file="LevelInfo.vue";var ie=ne.exports,oe=s["a"].HOME,re=(Object(l["a"])(oe).mapState,{name:"home-index",components:{FarmingInfo:_,Iot:F,OriginData:K,PlantInfo:it,WarehouseInfo:vt,AmountRank:Tt,PickInfo:Bt,LevelInfo:ie},created:function(){var t=this,e=t.$store;e.commit(r["a"].SWITCH_LOADING,!1),e.dispatch(oe+"/"+r["a"].HOME_GET_AMOUNT_RANK_DATA)},beforeDestroy:function(){var t=this,e=t.$store,a=["mapFullState","amountRankFullState","farmingInfoFullState","pickInfoFullState","warehouseFullState","originDataFullState","levelInfoFullState"];a.forEach(function(t){e.commit(oe+"/"+r["a"].HOME_CHANGE_FULL_STATE,{fullStateName:t,state:!1})})}}),le=re,se=(a("6362"),Object(w["a"])(le,i,o,!1,null,null,null));se.options.__file="Index.vue";e["default"]=se.exports},df17:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wuyishan-map-container"},[a("div",{ref:"container"}),a("div",{staticClass:"curr-region"},[a("a",{on:{click:function(e){t.doClearMap()}}},[t._v("武夷山市")]),a("i",{directives:[{name:"show",rawName:"v-show",value:t.curr,expression:"curr"}]}),a("a",[t._v(t._s(t.curr))])])])},i=[],o=(a("ac6a"),a("f3e2"),a("7f7f"),a("3604")),r=10,l={name:"WuyishanMap",props:{curr:{type:String,default:"",required:!0},full:{type:Boolean,default:!1}},watch:{full:function(){var t=this;t.refresh()}},data:function(){return{chart:null,mapDatas:[{name:"星村镇",value:0},{name:"兴田镇",value:0},{name:"洋庄乡",value:0},{name:"五夫镇",value:0},{name:"上梅乡",value:0},{name:"岚谷乡",value:0},{name:"吴屯乡",value:0},{name:"新丰街道",value:0},{name:"崇安街道",value:0},{name:"武夷街道",value:0}]}},created:function(){var t=this;if(t.curr)for(var e=0;e<t.mapDatas.length;e++)if(t.mapDatas[e].name==t.curr){t.mapDatas[e].value=r;break}},mounted:function(){var t=this;t.$nextTick(function(){t.$ajax({url:"./map.json"}).then(function(e){o["a"].registerMap("wuyishan",e),t.chart=o["a"].init(t.$refs.container),t.chart.setOption({backgroundColor:"transparent",dataRange:{show:!1,x:"left",y:"bottom",splitList:[{start:0,end:0,color:"#15467d"},{start:r,end:r,color:"#389BB7"}]},series:[{type:"map",mapType:"wuyishan",itemStyle:{emphasis:{areaColor:"rgba(56,155,183, 0.5)",borderWidth:0},normal:{areaColor:"#15467d",borderColor:"#2f90cd",borderWidth:1}},label:{emphasis:{textStyle:{color:"#ffffff",fontSize:15}},normal:{show:!0,textStyle:{color:"#ffffff",fontSize:12}}},roam:!0,zoom:1.2,data:t.mapDatas}]}),t.chart.on("click",function(e){t.doClickMap(e.name)}),window.addEventListener("resize",t.refresh)})})},methods:{doClickMap:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=this;if(e.currSelectedRegion!=t){var a=e.chart,n=a.getOption();e.mapDatas.forEach(function(e){e.value=e.name==t?r:0});var i=n.series;i[0].data=e.mapDatas,a.setOption({series:i}),e.$emit("change",t)}},doClearMap:function(){var t=this;t.doClickMap("")},refresh:function(){var t=this;setTimeout(function(){var e=t.chart;if(e){var a=null;a=t.full?{series:[{label:{normal:{textStyle:{fontSize:16}}}}]}:{series:[{label:{normal:{textStyle:{fontSize:12}}}}]},e.setOption(a),e.resize()}},120)}},beforeDestroy:function(){var t=this;window.removeEventListener("resize",t.refresh)}},s=l,c=a("2877"),u=Object(c["a"])(s,n,i,!1,null,null,null);u.options.__file="WuyishanMap.vue";e["a"]=u.exports},f00b:function(t,e,a){}}]);