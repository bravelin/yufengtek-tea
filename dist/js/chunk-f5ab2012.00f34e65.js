(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f5ab2012"],{"2ce6":function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},"371b":function(e,t,s){},"3b80":function(e,t,s){var o=s("2d2c"),i=s("2b11"),n=s("201d"),a=s("2ce6"),r="["+a+"]",u="​",c=RegExp("^"+r+r+"*"),m=RegExp(r+r+"*$"),l=function(e,t,s){var i={},r=n(function(){return!!a[e]()||u[e]()!=u}),c=i[e]=r?t(p):a[e];s&&(i[s]=c),o(o.P+o.F*r,"String",i)},p=l.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(m,"")),e};e.exports=l},4274:function(e,t,s){"use strict";var o=s("371b"),i=s.n(o);i.a},7101:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page login-custom-page"},[s("div",{staticClass:"dialog"},[s("h2",[e._v("用户登录")]),s("div",{staticClass:"input-item account"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.loginName,expression:"loginName"}],ref:"loginNameInput",attrs:{disabled:e.isProcessing,type:"text",disableautocomplete:"",autocomplete:"off",maxlength:"50",tabindex:"1"},domProps:{value:e.loginName},on:{input:function(t){t.target.composing||(e.loginName=t.target.value)}}}),s("i"),s("i"),s("i"),s("i")]),s("div",{staticClass:"input-item password"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],ref:"passwordInput",attrs:{disabled:e.isProcessing,type:"password",disableautocomplete:"",autocomplete:"off",maxlength:"50",tabindex:"2"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),s("i"),s("i"),s("i"),s("i")]),s("input",{staticStyle:{display:"none"},attrs:{type:"password",autocomplete:"off"}}),s("div",{staticClass:"remember",class:{active:e.loginRemember},on:{click:function(t){return e.switchLoginRemember()}}},[s("i",{staticClass:"iconfont"},[e._v("")]),s("div"),e._v("记住密码")]),s("div",{staticClass:"login-button"},[s("button",{on:{click:function(t){return e.doLogin()}}},[e._v("登录")])]),s("div",{staticClass:"login-tip",class:{active:e.showTip}},[e._v(e._s(e.tipStr))])]),s("div",{staticClass:"title"},[s("h1",{class:{active:e.showMainTitle}},[e._v("武夷山市智慧茗园数据平台")]),s("h4",{class:{active:e.showSubTitle}},[e._v("基于物联网监控的大数据服务，为茶叶质量保驾护航")])])])},i=[],n=(s("98c9"),s("ecac")),a=s("eb57"),r=s("c4f2"),u=localStorage,c={name:"login-index",data:function(){return{loginName:"",password:"",isProcessing:!1,tipStr:"",showTip:!1,timer:null,showMainTitle:!1,showSubTitle:!1,loginRemember:!("0"==u.getItem(n["a"].loginRemember))}},created:function(){var e=this,t=e.$store;t.commit(a["a"].SWITCH_LOADING,!1),document.body.addEventListener("keypress",e.doPresskey)},mounted:function(){var e=this;e.$nextTick(function(){var t=e.$store.state,s=t.userName,o=u.getItem(n["a"].password)||"",i=e.$refs;setTimeout(function(){i.passwordInput.value=e.password=o,i.loginNameInput.value=e.loginName=s,s?o||i.passwordInput.focus():i.loginNameInput.focus()},800),setTimeout(function(){e.showMainTitle=!0},1e3),setTimeout(function(){e.showSubTitle=!0},2e3)})},methods:{showMessage:function(e){var t=this;t.tipStr=e,t.timer&&clearTimeout(t.timer),t.showTip=!0,t.timer=setTimeout(function(){t.showTip=!1},3e3)},switchLoginRemember:function(){var e=this;e.loginRemember=!e.loginRemember,e.loginRemember?(u.setItem(n["a"].userName,e.loginName),u.setItem(n["a"].password,e.password)):(u.removeItem(n["a"].userName),u.removeItem(n["a"].password))},doLogin:function(){var e=this,t=e.$store;e.checkForm()&&(e.isProcessing=!0,t.commit(a["a"].SWITCH_LOADING,!0),e.$ajax({url:"/data/user/login",method:"post",data:{username:e.loginName.trim(),password:e.password.trim()}}).then(function(s){if(t.commit(a["a"].SWITCH_LOADING,!1),200!=s.code)e.showMessage("您输入的账号或者密码不正确！");else{e.showMessage("登录成功！");var o=s.repData;t.commit(a["a"].UPDATE_USER_INFO,{userToken:o.tokenKey,userId:"",userName:e.loginName.trim(),userRole:"DT"==o.user_type?"1":"0",password:e.password.trim(),loginRemember:e.loginRemember}),setTimeout(function(){e.$router.push({name:"home"})},500),Object(r["a"])()}setTimeout(function(){e.isProcessing=!1},100)}))},checkForm:function(){var e=this,t=e.$refs;return e.loginName.trim()?!!e.password.trim()||(t.passwordInput.focus(),e.showMessage("请输入密码！"),!1):(t.loginNameInput.focus(),e.showMessage("请输入您的账号！"),!1)},doPresskey:function(e){13===e.keyCode&&this.doLogin()}},beforeDestroy:function(){document.body.removeEventListener("keypress",this.doPresskey)}},m=c,l=(s("4274"),s("17cc")),p=Object(l["a"])(m,o,i,!1,null,null,null);t["default"]=p.exports},"98c9":function(e,t,s){"use strict";s("3b80")("trim",function(e){return function(){return e(this,3)}})}}]);