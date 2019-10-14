module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=14)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-router-dom")},function(e,t){e.exports=require("@babel/runtime/regenerator")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("serialize-javascript")},function(e,t,n){},function(e,t,n){},function(e,t,n){(function(t){var r=function(e){return n(8).resolve(t,e)};e.exports={type:"ssr",routes:[{path:"/",exact:!0,Component:function(){return n(9).default},controller:"page",handler:"index"},{path:"/news/:id",exact:!0,Component:function(){return n(11).default},controller:"page",handler:"index"}],baseDir:r("../"),injectCss:["/static/css/Page.chunk.css"],injectScript:["<script src='/static/js/runtime~Page.js'><\/script>","<script src='/static/js/vendor.chunk.js'><\/script>","<script src='/static/js/Page.chunk.js'><\/script>"],serverJs:r("../output/Page.server.js")}}).call(this,"/")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(1),o=(n(10),function(e){return a.a.createElement("div",{className:"normal"},a.a.createElement("div",{className:"welcome"}),a.a.createElement("ul",{className:"list"},e.news&&e.news.map(function(e){return a.a.createElement("li",{key:e.id},a.a.createElement("div",null,"文章标题: ",e.title),a.a.createElement("div",{className:"toDetail"},a.a.createElement(i.Link,{to:"/news/".concat(e.id)},"点击查看详情")))})))});o.getInitialProps=function(){return Promise.resolve({news:[{id:"1",title:"Racket v7.3 Release Notes"},{id:"2",title:"Free Dropbox Accounts Now Only Sync to Three Devices"},{id:"3",title:"Voynich Manuscript Decoded by Bristol Academic"},{id:"4",title:"Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic"},{id:"5",title:"How much do YouTube celebrities charge to advertise your product? "}]})},t.default=o},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=(n(12),{1:"Racket-on-Chez continues to improve. Snapshot builds are currently available at pre.racket-lang.org, and we expect that Racket-on-Chez will be included as a download option in the next release.",2:"This means anyone with more than three devices connected doesn't have to worry right this instant. That will change, however, when it comes time to replace one of your current devices or if you add another device to your collection. At that point, you will have to make a decision.",3:"World's most mysterious text is finally cracked: Bristol academic deciphers lost language of 600-year-old Voynich manuscript to reveal astrological sex tips, herbal remedies and other pagan beliefs",4:"After a successful test in Mexico City, fast-food chain Burger King will begin delivering food to drivers caught in traffic in Los Angeles in what they have dubbed The Traffic Jam Whopper.",5:"Product advertisement and promotion on YouTube is a function of the dedicated audience (or influence) of the individual (influencer) anchoring the advertising or promotion."}),o=function(e){return a.a.createElement("div",{className:"news-container"},"文章详情: ",e.newsDetail)};o.getInitialProps=function(e){var t=e.params.id;return Promise.resolve({newsDetail:i[t]})},t.default=o},function(e,t,n){},function(e,t){e.exports=require("ykfe-utils")},function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r);function i(e,t,n,r,a,i,o){try{var c=e[i](o),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,a)}function o(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function c(e){i(o,r,a,c,s,"next",e)}function s(e){i(o,r,a,c,s,"throw",e)}c(void 0)})}}var c=n(0),s=n.n(c),l=(n(3),n(1)),u=n(4),d=n.n(u),f=(n(5),n(6),function(e){var t=e.layoutData.serverData,n=e.layoutData.app.config,r=n.injectCss,a=n.injectScript;return s.a.createElement("html",{lang:"en"},s.a.createElement("head",null,s.a.createElement("meta",{charSet:"utf-8"}),s.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),s.a.createElement("meta",{name:"theme-color",content:"#000000"}),s.a.createElement("title",null,"React App"),r&&r.map(function(e){return s.a.createElement("link",{rel:"stylesheet",href:e,key:e})})),s.a.createElement("body",null,s.a.createElement("div",{id:"app"},function(e){return s.a.createElement("div",{className:"normal"},s.a.createElement("h1",{className:"title"},s.a.createElement(l.Link,{to:"/"},"Egg + React + SSR"),s.a.createElement("div",{className:"author"},"by ykfe")),e.children?e.children:"")}(e)),t&&s.a.createElement("script",{dangerouslySetInnerHTML:{__html:"window.__USE_SSR__=true; window.__INITIAL_DATA__ =".concat(d()(t))}}),s.a.createElement("div",{dangerouslySetInnerHTML:{__html:a&&a.join("")}})))}),p=n(7).routes,m=n(13),h=(m.getWrappedComponent,m.getComponent),v=function(){var e=o(a.a.mark(function e(t){var n,r,i;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=h(p,t.path)(),r=n.Layout||f,!n.getInitialProps){e.next=8;break}return e.next=5,n.getInitialProps(t);case 5:e.t0=e.sent,e.next=9;break;case 8:e.t0={};case 9:return i=e.t0,t.serverData=i,e.abrupt("return",s.a.createElement(l.StaticRouter,{location:t.req.url,context:i},s.a.createElement(r,{layoutData:t},s.a.createElement(n,i))));case 12:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();t.default=v}]);