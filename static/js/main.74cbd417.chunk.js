(this["webpackJsonpexcel-web"]=this["webpackJsonpexcel-web"]||[]).push([[0],{139:function(e,t,n){e.exports=n.p+"static/media/github.741c0ae1.svg"},141:function(e,t,n){e.exports=n.p+"static/media/main-bg.197637b0.png"},142:function(e,t,n){e.exports=n.p+"static/media/login-input-bg.cf01c34c.png"},154:function(e,t,n){e.exports=n(274)},163:function(e,t,n){},229:function(e,t,n){},236:function(e,t,n){},238:function(e,t,n){},241:function(e,t,n){},246:function(e,t,n){},260:function(e,t,n){},263:function(e,t,n){},272:function(e,t,n){},273:function(e,t,n){},274:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(8),i=n.n(o),c=n(76),s=n(21),l=(n(163),n(14)),u=n(15),d=n(17),p=n(16),h=n(18),g=n(45),f=(n(67),n(34)),m=(n(165),n(150)),v=(n(106),n(78)),b=n(39),E=n.n(b),O=n(32),y=n(63),w="DINGDING_LOGIN",j="GITHUB_LOGIN",C="USER_LOGOUT",k="RECEIVE_USER_INFO",x=(n(169),n(105)),S=n(136),D=n.n(S),N=n(30),I=n.n(N),P={};P.postDinging=function(e){return new Promise((function(e,t){I.a.remove("loginCookie",{path:"/"}),setTimeout((function(){var t={userInfo:{errcode:0,username:"DingUser",avatarUrl:"https://gtms03.alicdn.com/tps/i3/TB1opXxHXXXXXahXpXXvBLt6FXX-230-230.png"}};I.a.save("loginCookie",window.btoa(JSON.stringify(t)),{path:"/"}),e(t)}),300)}))},P.getGithub=function(){var e=Object(y.a)(E.a.mark((function e(t){var n,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={userInfo:{errcode:0}},e.prev=1,e.next=4,D.a.get("https://api.github.com/users/".concat(t));case 4:r=e.sent,I.a.remove("loginCookie",{path:"/"}),void 0!==r.data.login?(n.userInfo.username=r.data.login,n.userInfo.avatarUrl=r.data.avatar_url,I.a.save("loginCookie",window.btoa(JSON.stringify(n)),{path:"/"})):(x.a.error("User name not found."),n.errcode=-1),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),x.a.error("User name not found.");case 12:return e.abrupt("return",n);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();var _=P;function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(n,!0).forEach((function(t){Object(O.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var M=function(e){return{type:k,data:e}},X=n(139),U=n.n(X),T=(n(229),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).loginGithub=function(){n.props.loginGithub(n.userName)},n.handleChange=function(e){n.userName=e.target.value},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{style:{width:"100%",height:"100%"}},a.a.createElement(v.a,{src:U.a,size:64,className:"login-github-svg"}),a.a.createElement("div",{className:"login-username-text"},"Github User Name"),a.a.createElement(m.a,{className:"login-username-input",placeholder:"User Name",onChange:this.handleChange,onPressEnter:this.loginGithub}),a.a.createElement(f.a,{type:"primary",className:"login-github-btn",onClick:this.loginGithub},"Login"))}}]),t}(a.a.Component)),G=Object(s.b)((function(e){return{login:e.login}}),{loginGithub:function(e){return function(){var t=Object(y.a)(E.a.mark((function t(n){var r;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.getGithub(e);case 2:r=t.sent,n(M(L({},r)));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}})(T),R=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).createSrc=function(){var e=n.props.options,t=e.goto,r=e.style,a=e.href,o=n.state.url+encodeURIComponent(t);return o+=r?"&style="+r:"",o+=a?"&href="+a:""},n.state={url:"https://login.dingtalk.com/login/qrcode.htm?goto="},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e={id:this.props.options.id,src:this.createSrc(),frameBorder:"0",allowtransparency:"true",scrolling:"no",width:this.props.options.width,height:this.props.options.height,className:this.props.className};return a.a.createElement("iframe",e)}}]),t}(a.a.Component);R.defaultProps={options:{id:"login_container",goto:"",style:"",href:"",width:"350px",height:"350px"},className:""};var H=R,W=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={APPID:"dingoauctaoft7kia4pdvx",REDIRECT_URI:"https://gaobowen.github.io/excel-web/login/dingding"},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){if(void 0!==this.props.location.search&&-1!==this.props.location.search.indexOf("dinglogin")){for(var e=this.props.location.search.replace("?","").split("&"),t={},n=0;n<e.length;n++){var r=e[n].split("=");t[r[0].toString()]=r[1]}return console.log("this.props.location.search.indexOf"),void this.props.loginDingding({})}}},{key:"componentDidMount",value:function(){var e=this,t=function(t){var n=t.data,r=t.origin;"https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=".concat(e.state.APPID,"&response_type=code&scope=snsapi_login&state=dinglogin&redirect_uri=").concat(e.state.REDIRECT_URI,"&loginTmpCode=").concat(n);"https://login.dingtalk.com"===r&&e.props.loginDingding({})};"undefined"!=typeof window.addEventListener?window.addEventListener("message",t,!1):"undefined"!=typeof window.attachEvent&&window.attachEvent("onmessage",t)}},{key:"loginDingding",value:function(){console.log("loginDingding")}},{key:"render",value:function(){var e={id:"login-container",goto:"https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=".concat(this.state.APPID,"&response_type=code&scope=snsapi_login&state=dinglogin&redirect_uri=").concat(this.state.REDIRECT_URI),width:"350px",height:"350px"};return a.a.createElement("div",{id:"login-container",style:{opacity:.78}},a.a.createElement(H,{options:e}))}}]),t}(a.a.Component),K=Object(s.b)((function(e){return{login:e.login}}),{loginDingding:function(e){return function(){var t=Object(y.a)(E.a.mark((function t(n){var r;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.postDinging(e);case 2:r=t.sent,console.log(r),n(M(L({},r)));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}})(W),z=(n(236),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).changeLoginMode=function(e){var t="tab-li-github"===e.target.id?"github":"dingding";n.props.history.replace("/excel-web/login/"+t),n.setState({options:{loginMode:t}})},n.state={options:{loginMode:"dingding"}},void 0!==e.location&&("/excel-web/login/github"===e.location.pathname?e.options.loginMode="github":e.options.loginMode="dingding"),n.state.options.loginMode=e.options.loginMode,n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"login-view"},a.a.createElement("div",{className:"tab-div"},a.a.createElement("ul",{className:"tabs"},a.a.createElement("li",{id:"tab-li-dingding",className:"dingding"===this.state.options.loginMode?"tab-item current":"tab-item",onClick:this.changeLoginMode},"Dingding"),a.a.createElement("li",{id:"tab-li-github",className:"dingding"===this.state.options.loginMode?"tab-item":"tab-item current",onClick:this.changeLoginMode},"Github"))),a.a.createElement("div",{className:"login-view-content",key:this.props.location.key},a.a.createElement(g.d,null,a.a.createElement(g.b,{path:"/excel-web/login/dingding",component:K}),a.a.createElement(g.b,{path:"/excel-web/login/github",component:G}),a.a.createElement(g.a,{to:"/excel-web/login/dingding"}))))}}]),t}(a.a.Component));z.defaultProps={options:{loginMode:"dingding"}};var B=Object(g.g)(z),J=n(141),Z=n.n(J),V=n(142),F=n.n(V),q=(n(238),function(e){function t(e){var n;Object(l.a)(this,t),n=Object(d.a)(this,Object(p.a)(t).call(this,e));var r=I.a.load("loginCookie");if(void 0!==r){var a=window.atob(r),o=JSON.parse(a);void 0!==o.userInfo.username&&n.props.receiveUserInfo(o)}return n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"receiveUserInfo",value:function(e){}},{key:"componentDidMount",value:function(){void 0!==this.props.userInfo.username&&this.props.history.replace("/excel-web/sheet",this.state)}},{key:"componentDidUpdate",value:function(){void 0!==this.props.userInfo.username&&this.props.history.replace("/excel-web/sheet",this.state)}},{key:"render",value:function(){return void 0!==this.props.userInfo.username?a.a.createElement("div",null):a.a.createElement("div",null,a.a.createElement("div",{className:"bgdiv"},a.a.createElement("img",{className:"bgimg",src:Z.a,alt:"loginbgimg"})),a.a.createElement("div",{className:"logincontainer"},a.a.createElement("div",null,a.a.createElement("div",{className:"loginviewbg outradius"},a.a.createElement("img",{className:"loginviewbgimg",src:F.a,alt:""})),a.a.createElement(B,null))))}}]),t}(a.a.Component)),$=Object(s.b)((function(e){return{userInfo:e.login.userInfo}}),{receiveUserInfo:M})(q),Q=n(152),Y=n(143),ee=n.n(Y),te=function(e){return{type:"CHANGED_EXCEL_SIZE",data:e}},ne=function(e){return{type:"CHANGE_EXCEL_SHEET_SELECTED",data:e}};n(241);function re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var ae=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).getCoordinates=function(e){var t=e.match(/[0-9]+/g)||[],n=e.match(/[A-Z]+/g)||[];if(1===t.length&&1===n.length){for(var r=n[0].toString(),a="A".charCodeAt(),o=0,i=0;i<r.length;i++){var c=r[i].charCodeAt()-a+1;o+=Math.pow(26,r.length-i-1)*c}return{x:o-1,y:parseInt(t[0])-1}}},n.getPositionStr=function(e){var t="A".charCodeAt(),n=parseInt(e.x),r=String.fromCharCode(n%26+t);do{if(!((n=parseInt(n/26))>0))break;r=String.fromCharCode(n%26+t-1)+r}while(parseInt(n/26)>0);return r+(e.y+1)},n.getPositionStrX=function(e){var t="A".charCodeAt(),n=parseInt(e),r=String.fromCharCode(parseInt(n%26+t));do{if(!((n=parseInt(n/26))>0))break;r=String.fromCharCode(parseInt(n%26+t-1))+r}while(parseInt(n/26)>0);return r},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return this.grid=this.props.gridDatas.dic[this.props.gridDatas.selectedKey].grid,this.totalWidth=60*this.grid[0].length,this.totalHeight=22*this.grid.length,this.totalWidth===this.props.excelSheet.width&&this.totalHeight===this.props.excelSheet.height||this.props.changedExcelSize({width:this.totalWidth,height:this.totalHeight}),a.a.createElement("div",{style:{width:this.totalWidth}},a.a.createElement(ee.a,{data:this.grid,valueRenderer:function(e){return e.value},onContextMenu:function(e,t,n,r){return t.readOnly?e.preventDefault():null},onCellsChanged:function(t){var n=e.grid.map((function(e){return Object(Q.a)(e)}));t.forEach((function(t){t.cell;var r=t.row,a=t.col,o=t.value;e.grid[r][a]=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?re(n,!0).forEach((function(t){Object(O.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):re(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n[r][a],{value:o})})),e.render()}}))}}]),t}(a.a.Component),oe=Object(s.b)((function(e){return{gridDatas:e.gridDatas,excelSheet:e.excelSheet}}),{changedExcelSize:te,changeExcelSheetSelected:ne})(ae),ie=(n(242),n(151)),ce=(n(275),n(79)),se=(n(246),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).download=function(){n.props.downloadExcel()},n.state={},n.handleMenuClick=function(e){"2"===e.key&&(n.props.logout({}),window.open(encodeURI("http://"+window.location.host+"/excel-web"),"_parent"))},n.state.downMenu=a.a.createElement(ce.a,{onClick:n.handleMenuClick},a.a.createElement(ce.a.Item,{className:"menu-item",key:"1"},n.props.login.userInfo.username),a.a.createElement(ce.a.Item,{className:"menu-item",key:"2"},"Logout")),n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"user-header"},a.a.createElement("div",{className:"header-title"},"Technology Changes Lives"),a.a.createElement("div",{className:"items"},a.a.createElement(ie.a,{overlay:this.state.downMenu,className:"item avatar"},a.a.createElement(v.a,{size:40,src:this.props.login.userInfo.avatarUrl,className:"item avatar"})),a.a.createElement("div",{className:"item split"}),a.a.createElement(f.a,{type:"primary",icon:"download",className:"item btn",onClick:this.download},"Download")))}}]),t}(a.a.Component)),le=Object(s.b)((function(e){return e}),{logout:function(e){return{type:C,data:e}},downloadExcel:function(e){return{type:"DOWNLOAD_EXCEL",data:e}}})(se),ue=(n(258),n(10)),de=(n(260),function(e){function t(){var e,n;Object(l.a)(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).iconbtn=function(e,t){return a.a.createElement("div",{className:"item",key:t},a.a.createElement(ue.a,{type:e}))},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"tools-header"},a.a.createElement("div",{className:"item split"}),["edit","copy","delete","align-center","align-left","align-right","bg-colors","bold","italic","underline","font-colors","font-size"].map((function(t,n){return e.iconbtn(t,n)})),a.a.createElement("div",{className:"item split"}),["area-chart","pie-chart","bar-chart","dot-chart","line-chart","radar-chart","fund"].map((function(e,t){return a.a.createElement("div",{className:"item",key:"chart"+t},a.a.createElement(ue.a,{type:e}))})),a.a.createElement("div",{className:"item split"}),["line-height","column-width","column-height","sort-ascending","sort-descending"].map((function(e,t){return a.a.createElement("div",{className:"item",key:"editExts"+t},a.a.createElement(ue.a,{type:e}))})))}}]),t}(a.a.Component)),pe=Object(s.b)((function(e){return e}),{})(de),he=(n(261),n(104)),ge=(n(263),he.a.TabPane),fe=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onChange=function(e){n.props.changeExcelSheetSelected({key:e})},n.onEdit=function(e,t){n[t](e)},n.add=function(){n.props.addExcelSheet()},n.remove=function(e){n.props.removeExcelSheet({key:e})},n.newTabIndex=0,n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){for(var e in this.panes=[],this.props.gridDatas.dic)this.panes.push({title:this.props.gridDatas.dic[e].name,content:"",key:e});return a.a.createElement("div",{className:"tools-footer"},a.a.createElement(he.a,{onChange:this.onChange,activeKey:this.props.gridDatas.selectedKey,type:"editable-card",onEdit:this.onEdit},this.panes.map((function(e){return a.a.createElement(ge,{tab:e.title,key:e.key},e.content)}))))}}]),t}(a.a.Component),me=Object(s.b)((function(e){return{gridDatas:e.gridDatas}}),{addExcelSheet:function(e){return{type:"ADD_EXCEL_SHEET",data:e}},removeExcelSheet:function(e){return{type:"REMOVE_EXCEL_SHEET",data:e}},changeExcelSheetName:function(e){return{type:"CHANGE_EXCEL_SHEET_NAME",data:e}},changeExcelSheetSelected:ne})(fe),ve=(n(272),function(e){function t(e){var n;Object(l.a)(this,t),n=Object(d.a)(this,Object(p.a)(t).call(this,e));var r=I.a.load("loginCookie");if(void 0!==r){var a=window.atob(r),o=JSON.parse(a);void 0!==o.userInfo.username&&n.props.receiveUserInfo(o)}return n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){void 0===this.props.login.userInfo.username&&this.props.history.replace("/excel-web/login/github")}},{key:"render",value:function(){return a.a.createElement("div",{className:"excel-main"},a.a.createElement("div",{className:"tool-header"},a.a.createElement(le,null),a.a.createElement(pe,null)),a.a.createElement("div",{className:"content-main"},a.a.createElement("div",{className:"excel-container"},a.a.createElement("div",{className:"excel-component",style:{width:this.props.excelSheet.width+300,height:parseInt(this.props.excelSheet.height)+300}},a.a.createElement(oe,null)))),a.a.createElement("div",{className:"tool-footer-container"},a.a.createElement(me,null)))}}]),t}(a.a.Component)),be=Object(s.b)((function(e){return e}),{receiveUserInfo:M,changedExcelSize:te})(ve),Ee=(n(273),function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(g.d,null,a.a.createElement(g.b,{path:"/excel-web/sheet",component:be}),a.a.createElement(g.b,{path:"/excel-web/login",component:$}),a.a.createElement(g.a,{to:"/excel-web/login"})))}}]),t}(a.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Oe=n(50),ye=n(147);function we(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function je(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?we(n,!0).forEach((function(t){Object(O.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):we(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ce={userInfo:{errcode:0}};var ke=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case w:case j:return e;case C:return I.a.remove("loginCookie",{path:"/"}),je({},Ce);case k:var n=je({},t.data);return void 0!==t.data.errcode?n.userInfo.errcode=t.data.errcode:n.userInfo.errcode=0,je({},n);default:return je({},e)}};function xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Se(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?xe(n,!0).forEach((function(t){Object(O.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):xe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var De={width:0,height:0},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGED_EXCEL_SIZE":return Se({},t.data);default:return e}},Ie=n(148),Pe=n.n(Ie),_e=n(149),Ae=n.n(_e);function Le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Me(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Le(n,!0).forEach((function(t){Object(O.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Le(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Xe=function(e){var t="A".charCodeAt(),n=parseInt(e),r=String.fromCharCode(parseInt(n%26+t));do{if(!((n=parseInt(n/26))>0))break;r=String.fromCharCode(parseInt(n%26+t-1))+r}while(parseInt(n/26)>0);return r},Ue=function(e){var t=e.match(/[0-9]+/g)||[],n=e.match(/[A-Z]+/g)||[];if(1===t.length&&1===n.length){for(var r=n[0].toString(),a="A".charCodeAt(),o=0,i=0;i<r.length;i++){var c=r[i].charCodeAt()-a+1;o+=Math.pow(26,r.length-i-1)*c}return{x:o-1,y:parseInt(t[0])-1}}},Te=function(e){for(var t=[],n=0;n<60;n++){t.push([]);for(var r=0;r<30;r++)if(0===n&&0===r)t[0].push({readOnly:!0,value:""});else if(0===n&&r>0){var a=Xe(r-1);t[0].push({readOnly:!0,value:a})}else if(n>0&&0===r)t[n].push({readOnly:!0,value:n});else if(e){if(n>0&&r>0){var o=Ue(t[0][r].value+n);t[n].push({value:"(".concat(o.x,", ").concat(o.y,")")})}}else t[n].push({value:""})}return t},Ge=function(e){var t=new Pe.a.Workbook;for(var n in e){var r=t.addWorksheet(e[n].name);r.properties.defaultRowHeight=16;for(var a=e[n].grid.length,o=e[n].grid[0].length,i=1;i<a;i++)for(var c=1;c<o;c++){var s=r.getRow(i);if(!s){var l=new Array(o).fill("");r.addRow(l),s=r.getRow(i)}s.getCell(c).value=e[n].grid[i][c].value}}t.xlsx.writeBuffer().then((function(e){return Ae.a.saveAs(new Blob([e]),"excel-web".concat(Date.now(),".xlsx"))})).catch((function(e){return console.log("Error writing excel export",e)}))},Re=function(){return(new Date).getTime().toString()+parseInt(100*Math.random())},He=function(){var e=new Array,t=Re();return e[t]={name:"Sheet1",grid:Te(!1)},e[Re()]={name:"Sheet2",grid:Te(!0)},{dic:e,selectedKey:t,length:2}}(),We=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:He,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_EXCEL_SHEET":var n=Me({},e),r=n.length+1;for(var a in n.dic)n.dic[a].name==="Sheet"+r&&r++;var o=Re();return n.dic[o]={grid:Te(),name:"Sheet"+r},n.selectedKey=o,n.length+=1,n;case"REMOVE_EXCEL_SHEET":if(e.length<2)return e;var i=new Array,c=void 0;t.data.key!==e.selectedKey&&(c=e.selectedKey);var s=!1;for(var l in e.dic)l===t.data.key?s=!0:(i[l]=e.dic[l],c||(c=l));return s?{dic:i,selectedKey:c,length:e.length-1}:e;case"CHANGE_EXCEL_SHEET_NAME":var u=Me({},e);return e[t.data.key]?(u.dic[t.data.key].name=t.data.name,u):e;case"CHANGE_EXCEL_SHEET_SELECTED":var d=Me({},e);return d.selectedKey?(d.selectedKey=t.data.key,d):e;case"DOWNLOAD_EXCEL":return Ge(e.dic),e;default:return e}},Ke=Object(Oe.d)(Object(Oe.c)({login:ke,excelSheet:Ne,gridDatas:We}),Object(Oe.a)(ye.a));i.a.render(a.a.createElement(s.a,{store:Ke},a.a.createElement(c.a,null,a.a.createElement(Ee,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[154,1,2]]]);
//# sourceMappingURL=main.74cbd417.chunk.js.map