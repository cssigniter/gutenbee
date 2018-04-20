window.wp=window.wp||{},window.wp["gutenbee.build"]=function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=9)}([function(e,t){!function(){e.exports=window.wp.i18n}()},function(e,t){!function(){e.exports=window.wp.blocks}()},function(e,t){!function(){e.exports=window.wp.components}()},function(e,t){!function(){e.exports=window.wp.element}()},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r={NONE:"none",MEDIA:"media",ATTACHMENT:"attachment"}},function(e,t){!function(){e.exports=window.wp.data}()},function(e,t,n){(function(t){function n(e,t,n,r){var a=-1,o=e?e.length:0;for(r&&o&&(n=e[++a]);++a<o;)n=t(n,e[a],a,e);return n}function r(e){return e.split("")}function a(e){return e.match(w)||[]}function o(e){return B.test(e)}function l(e){return Z.test(e)}function i(e){return o(e)?c(e):r(e)}function c(e){return e.match(U)||[]}function u(e){return e.match(M)||[]}function s(e,t,n){var r=-1,a=e.length;t<0&&(t=-t>a?0:a+t),n=n>a?a:n,n<0&&(n+=a),a=t>n?0:n-t>>>0,t>>>=0;for(var o=Array(a);++r<a;)o[r]=e[r+t];return o}function f(e){if("string"==typeof e)return e;if(m(e))return $?$.call(e):"";var t=e+"";return"0"==t&&1/e==-h?"-0":t}function p(e,t,n){var r=e.length;return n=void 0===n?r:n,!t&&n>=r?e:s(e,t,n)}function d(e){return!!e&&"object"==typeof e}function m(e){return"symbol"==typeof e||d(e)&&Y.call(e)==v}function b(e){return null==e?"":f(e)}function g(e){return(e=b(e))&&e.replace(E,q).replace(L,"")}function y(e,t,n){return e=b(e),t=n?void 0:t,void 0===t?l(e)?u(e):a(e):e.match(t)||[]}var h=1/0,v="[object Symbol]",w=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,E=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,_="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",O="["+_+"]",x="[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]",j="[a-z\\xdf-\\xf6\\xf8-\\xff]",C="[^\\ud800-\\udfff"+_+"\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",A="\\ud83c[\\udffb-\\udfff]",S="(?:\\ud83c[\\udde6-\\uddff]){2}",k="[\\ud800-\\udbff][\\udc00-\\udfff]",I="[A-Z\\xc0-\\xd6\\xd8-\\xde]",N="(?:"+j+"|"+C+")",T="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",R="(?:\\u200d(?:"+["[^\\ud800-\\udfff]",S,k].join("|")+")[\\ufe0e\\ufe0f]?"+T+")*",D="[\\ufe0e\\ufe0f]?"+T+R,P="(?:"+["[\\u2700-\\u27bf]",S,k].join("|")+")"+D,F="(?:"+["[^\\ud800-\\udfff]"+x+"?",x,S,k,"[\\ud800-\\udfff]"].join("|")+")",z=RegExp("['’]","g"),L=RegExp(x,"g"),U=RegExp(A+"(?="+A+")|"+F+D,"g"),M=RegExp([I+"?"+j+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[O,I,"$"].join("|")+")","(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[O,I+N,"$"].join("|")+")",I+"?"+N+"+(?:['’](?:d|ll|m|re|s|t|ve))?",I+"+(?:['’](?:D|LL|M|RE|S|T|VE))?","\\d+",P].join("|"),"g"),B=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]"),Z=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,W={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},H="object"==typeof t&&t&&t.Object===Object&&t,G="object"==typeof self&&self&&self.Object===Object&&self,K=H||G||Function("return this")(),q=function(e){return function(t){return null==e?void 0:e[t]}}(W),V=Object.prototype,Y=V.toString,J=K.Symbol,Q=J?J.prototype:void 0,$=Q?Q.toString:void 0,X=function(e){return function(t){return n(y(g(t).replace(z,"")),e,"")}}(function(e,t,n){return e+(n?" ":"")+ee(t)}),ee=function(e){return function(t){t=b(t);var n=o(t)?i(t):void 0,r=n?n[0]:t.charAt(0),a=n?p(n,1).join(""):t.slice(1);return r[e]()+a}}("toUpperCase");e.exports=X}).call(t,n(15))},function(e,t,n){var r,a;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r))e.push(n.apply(null,r));else if("object"===a)for(var l in r)o.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}var o={}.hasOwnProperty;void 0!==e&&e.exports?e.exports=n:(r=[],void 0!==(a=function(){return n}.apply(t,r))&&(e.exports=a))}()},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(10);n.n(r),n(11),n(12),n(13),n(19)},function(e,t){},function(e,t,n){"use strict";var r=n(0),a=(n.n(r),n(1));n.n(a);Object(a.registerBlockType)("gutenbee/spacer",{title:Object(r.__)("GutenBee Spacer"),description:Object(r.__)("Easily add vertical spacing between elements."),icon:"minus",category:"layout",keywords:[Object(r.__)("divider"),Object(r.__)("spacer"),"hr"],attributes:{height:{type:"number",default:10}},edit:function(e){var t=e.className,n=e.attributes,r=e.setAttributes,o=e.focus,l=function(e){r({height:e})};return[wp.element.createElement("div",{key:"spacer",className:t,style:{height:n.height}}),o&&wp.element.createElement(a.InspectorControls,{key:"inspector"},wp.element.createElement(a.InspectorControls.RangeControl,{label:"Height",min:10,max:1e3,onChange:l,value:n.height}))]},save:function(e){var t=e.className,n=e.attributes;return wp.element.createElement("div",{className:t,style:{height:n.height}})}})},function(e,t,n){"use strict";var r=n(0),a=(n.n(r),n(2)),o=(n.n(a),n(1)),l=(n.n(o),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),i={SOLID:"solid",DOTTED:"dotted",DASHED:"dashed",DOUBLE:"double"},c=function(e){var t=e.className,n=e.height,r=e.style,a=e.weight,o=e.width,l=e.align,i=e.color;return wp.element.createElement("div",{key:"divider",className:t+" align-"+l,style:{height:n}},wp.element.createElement("div",{className:t+"-inner",style:{borderTopStyle:r,borderTopWidth:a,borderTopColor:i,width:o+"%"}}))};Object(o.registerBlockType)("gutenbee/divider",{title:Object(r.__)("GutenBee Divider"),description:Object(r.__)("A divider to indicate a thematic change in the content in style."),icon:"minus",category:"layout",keywords:[Object(r.__)("divider"),Object(r.__)("horizontal-line"),"hr"],attributes:{style:{type:"string",default:i.SOLID},weight:{type:"number",default:1},width:{type:"number",default:100},height:{type:"number",default:10},align:{type:"string",default:"center"},color:{type:"string",default:"#000000"}},edit:function(e){var t=e.className,n=e.attributes,u=e.setAttributes,s=e.focus,f=n.style,p=n.weight,d=n.width,m=n.height,b=n.align,g=n.color;return[wp.element.createElement(c,l({className:t},n)),s&&wp.element.createElement(o.InspectorControls,{key:"inspector"},wp.element.createElement("p",null,Object(r.__)("Style")),wp.element.createElement(a.Toolbar,{controls:Object.values(i).map(function(e,t){return{icon:"admin-appearance",title:Object(r.sprintf)(Object(r.__)("Style %s"),e),isActive:f===e,onClick:function(){return u({style:e})},subscript:t+1}})}),wp.element.createElement(o.InspectorControls.RangeControl,{label:"Weight (thickness)",min:1,max:50,value:p,onChange:function(e){return u({weight:e})}}),wp.element.createElement(o.InspectorControls.RangeControl,{label:"Width",min:1,max:100,value:d,onChange:function(e){return u({width:e})}}),wp.element.createElement(o.InspectorControls.RangeControl,{label:"Height",min:10,max:100,onChange:function(e){return u({height:e})},value:m}),wp.element.createElement("p",null,Object(r.__)("Alignment")),wp.element.createElement(o.AlignmentToolbar,{value:b,onChange:function(e){return u({align:e})}}),wp.element.createElement(a.PanelBody,{title:Object(r.__)("Color")},wp.element.createElement(o.ColorPalette,{value:g,onChange:function(e){return u({color:e})}})))]},save:function(e){var t=e.className,n=e.attributes;return wp.element.createElement(c,l({className:t},n))}})},function(e,t,n){"use strict";var r=n(0),a=(n.n(r),n(1)),o=(n.n(a),n(14)),l=n(4);Object(a.registerBlockType)("gutenbee/slideshow",{title:Object(r.__)("GutenBee Slideshow"),description:Object(r.__)("A slideshow block"),icon:"slides",category:"common",keywords:[Object(r.__)("slideshow"),Object(r.__)("gallery")],attributes:{images:{type:"array",default:[],source:"query",selector:".wp-block-gutenbee-slideshow .gutenbee-slideshow-item",query:{url:{source:"attribute",selector:"img",attribute:"src"},alt:{source:"attribute",selector:"img",attribute:"alt",default:""},id:{source:"attribute",selector:"img",attribute:"data-id"},link:{source:"attribute",selector:"img",attribute:"data-link"},caption:{type:"array",source:"children",selector:"figcaption"}}},animationStyle:{type:"string",default:"fade"},arrowNav:{type:"boolean",default:!0},dotNav:{type:"boolean",default:!0},autoplay:{type:"boolean",default:!0},infinite:{type:"boolean",default:!0},speed:{type:"number",default:300},autoplaySpeed:{type:"number",default:3e3},linkTo:{type:"string",default:l.a.NONE},color:{type:"string",default:"#FFFFFF"},size:{type:"string",default:"full"}},edit:o.a,save:function(e){var t=e.className,n=e.attributes,r=n.images,a=n.animationStyle,o=n.autoplay,i=n.arrowNav,c=n.dotNav,u=n.infinite,s=n.speed,f=n.autoplaySpeed,p=n.color,d=n.linkTo;return wp.element.createElement("div",{className:t,"data-fade":"fade"===a,"data-autoplay":o,"data-arrows":i,"data-dots":c,"data-infinite":u,"data-speed":s,"data-autoplay-speed":f,style:{color:p}},r.map(function(e,t){var n=void 0;switch(d){case l.a.MEDIA:n=e.url;break;case l.a.ATTACHMENT:n=e.link}var r=wp.element.createElement("img",{src:e.url,alt:e.alt||"","data-id":e.id,"data-link":e.link});return wp.element.createElement("div",{key:e.id||t,className:"gutenbee-slideshow-item"},n?wp.element.createElement("a",{className:"gutenbee-slideshow-item-link",href:n},r):r)}))}})},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(3),c=(n.n(i),n(0)),u=(n.n(c),n(2)),s=(n.n(u),n(1)),f=(n.n(s),n(5)),p=(n.n(f),n(6)),d=n.n(p),m=n(16),b=n(17),g=n(4),y=function(){function e(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),w=function(e){function t(){var e,n,l,i;a(this,t);for(var c=arguments.length,u=Array(c),s=0;s<c;s++)u[s]=arguments[s];return n=l=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),l.state={selectedImage:null},l.onSelectImage=function(e){return function(){l.state.selectedImage!==e&&l.setState({selectedImage:e})}},l.onRemoveImage=function(e){return function(){var t=l.props.attributes.images.filter(function(t,n){return e!==n});l.setState({selectedImage:null}),l.props.setAttributes({images:t})}},l.onSelectImages=function(e){l.props.setAttributes({images:e.map(function(e){return h({},e,{caption:e.caption?[e.caption]:[]})})})},l.setImageAttributes=function(e,t){var n=l.props,a=n.attributes.images,o=n.setAttributes;a[e]&&o({images:[].concat(r(a.slice(0,e)),[h({},a[e],t)],r(a.slice(e+1)))})},l.updateImageURLs=function(e){var t=l.props,n=t.setAttributes,r=t.attributes,a=t.images,o=r.images;n({size:e,images:o.map(function(t){return h({},t,{url:a.find(function(e){var n=e.id;return t.id===n}).sizes[e].source_url})})})},i=n,o(l,i)}return l(t,e),v(t,[{key:"componentWillReceiveProps",value:function(e){!e.isSelected&&this.props.isSelected&&this.setState({selectedImage:null})}},{key:"render",value:function(){var e=this,t=this.props,n=t.attributes,r=t.isSelected,a=t.className,o=t.setAttributes,l=t.images,f=n.images,p=n.arrowNav,h=n.dotNav,v=n.autoplay,w=n.animationStyle,E=n.infinite,_=n.speed,O=n.autoplaySpeed,x=n.color,j=n.linkTo,C=n.size,A=l||[],S=y(A,1),k=S[0],I=r&&wp.element.createElement(s.BlockControls,{key:"controls"},!!f.length&&wp.element.createElement(u.Toolbar,null,wp.element.createElement(s.MediaUpload,{onSelect:this.onSelectImages,type:"image",multiple:!0,gallery:!0,value:f.map(function(e){return e.id}),render:function(e){var t=e.open;return wp.element.createElement(u.IconButton,{className:"components-toolbar__control",label:Object(c.__)("Edit Slideshow"),icon:"edit",onClick:t})}})));return 0===f.length?wp.element.createElement(i.Fragment,null,I,wp.element.createElement(m.a,{className:a,icon:"format-gallery",label:Object(c.__)("Slideshow"),onSelectImage:this.onSelectImages,multiple:!0})):wp.element.createElement(i.Fragment,null,I,r&&wp.element.createElement(s.InspectorControls,null,wp.element.createElement("h2",null,Object(c.__)("Slideshow Settings")),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Autoplay"),checked:v,onChange:function(){o({autoplay:!v})}}),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Infinite Slide"),checked:E,onChange:function(){o({infinite:!E})}}),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Arrow Navigation"),checked:p,onChange:function(){o({arrowNav:!p})}}),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Dot Navigation"),checked:h,onChange:function(){o({dotNav:!h})}}),wp.element.createElement(u.SelectControl,{label:Object(c.__)("Link to"),value:j,onChange:function(e){o({linkTo:e})},options:[{value:g.a.ATTACHMENT,label:Object(c.__)("Attachment Page")},{value:g.a.MEDIA,label:Object(c.__)("Media File")},{value:g.a.NONE,label:Object(c.__)("None")}]}),k&&k.sizes&&wp.element.createElement(u.SelectControl,{label:Object(c.__)("Image Size"),value:C,options:Object.keys(k.sizes).map(function(e){return{value:e,label:d()(e)}}),onChange:this.updateImageURLs}),wp.element.createElement("h2",null,Object(c.__)("Animation Settings")),wp.element.createElement(u.RadioControl,{label:"Animation Style",selected:w,options:[{label:"Fade",value:"fade"},{label:"Slide",value:"slide"}],onChange:function(e){o({animationStyle:e})}}),wp.element.createElement(u.RangeControl,{label:"Animation Speed (ms)",min:50,max:5e3,value:_,onChange:function(e){o({speed:e})},step:10}),wp.element.createElement(u.RangeControl,{label:"Autoplay Speed (ms)",min:500,max:1e4,value:O,onChange:function(e){o({autoplaySpeed:e})},step:10}),wp.element.createElement(u.PanelBody,{title:Object(c.__)("Arrow and Dots Color")},wp.element.createElement(s.ColorPalette,{value:x,onChange:function(e){return o({color:e})}}))),wp.element.createElement("div",{className:a},f.map(function(t,n){return wp.element.createElement("div",{key:t.id||t.url,className:"gutenbee-gallery-item blocks-gallery-item"},wp.element.createElement(b.a,{url:t.url,alt:t.alt,id:t.id,isSelected:r&&e.state.selectedImage===n,onRemove:e.onRemoveImage(n),onSelect:e.onSelectImage(n),setAttributes:function(t){return e.setImageAttributes(n,t)},caption:t.caption}))})))}}]),t}(i.Component);t.a=Object(f.withSelect)(function(e,t){var n=e("core"),r=n.getMedia,a=t.attributes.images.map(function(e){return e.id});return{images:a.length?a.map(function(e){var t=r(e);return{id:e,sizes:t&&t.media_details.sizes}}):null}})(w)},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var r=n(2),a=(n.n(r),n(0)),o=(n.n(a),n(1)),l=(n.n(o),function(e){var t=e.className,n=e.icon,l=e.label,i=e.onSelectImage,c=e.multiple,u=void 0!==c&&c;return wp.element.createElement(r.Placeholder,{className:t,instructions:u?Object(a.__)("Add images from media library"):Object(a.__)("Add image from media library"),icon:n,label:l},wp.element.createElement(o.MediaUpload,{gallery:u,multiple:u,onSelect:i,type:"image",render:function(e){var t=e.open;return wp.element.createElement(r.Button,{isLarge:!0,onClick:t},u?Object(a.__)("Select Images"):Object(a.__)("Select Image"))}}))});t.a=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(7),i=n.n(l),c=n(3),u=(n.n(c),n(2)),s=(n.n(u),n(0)),f=(n.n(s),n(18)),p=(n.n(f),n(5)),d=(n.n(p),n(4)),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),b=f.keycodes.BACKSPACE,g=f.keycodes.DELETE,y=function(e){function t(){var e,n,o,l;r(this,t);for(var i=arguments.length,c=Array(i),u=0;u<i;u++)c[u]=arguments[u];return n=o=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),o.onImageClick=function(){o.props.isSelected||o.props.onSelect()},o.onKeyDown=function(e){o.container===document.activeElement&&o.props.isSelected&&[b,g].includes(e.keyCode)&&(e.stopPropagation(),e.preventDefault(),o.props.onRemove())},l=n,a(o,l)}return o(t,e),m(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.image,n=e.url;t&&!n&&this.props.setAttributes({url:t.source_url,alt:t.alt_text})}},{key:"render",value:function(){var e=this,t=this.props,n=t.url,r=t.alt,a=t.id,o=t.linkTo,l=t.link,c=t.isSelected,f=t.onRemove,p=void 0;switch(o){case d.a.MEDIA:p=n;break;case d.a.ATTACHMENT:p=l}var m=n?wp.element.createElement("img",{src:n,alt:r,"data-id":a,onClick:this.onImageClick}):wp.element.createElement(u.Spinner,null),b=i()({"is-selected":c,"is-transient":n&&0===n.indexOf("blob:")});return wp.element.createElement("figure",{className:b,tabIndex:"-1",onKeyDown:this.onKeyDown,ref:function(t){e.container=t}},c&&wp.element.createElement("div",{className:"blocks-gallery-item__inline-menu"},wp.element.createElement(u.IconButton,{icon:"no-alt",onClick:f,className:"blocks-gallery-item__remove",label:Object(s.__)("Remove Image")})),p?wp.element.createElement("a",{href:p},m):m)}}]),t}(c.Component);t.a=Object(p.withSelect)(function(e,t){var n=e("core"),r=n.getMedia,a=t.id;return{image:a?r(a):null}})(y)},function(e,t){!function(){e.exports=window.wp.utils}()},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=n(3),o=(n.n(a),n(0)),l=(n.n(o),n(1)),i=(n.n(l),n(2)),c=(n.n(i),n(7)),u=n.n(c),s=n(6),f=n.n(s),p=n(20),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},m={DEFAULT:"default",STACKED:"stacked",FRAMED:"framed"},b={CIRCLE:"circle",SQUARE:"square"},g=function(e){var t,n,a=e.className,o=e.view,l=e.shape,i=e.icon,c=e.size,s=e.padding,f=e.borderWidth,p=e.align,d=e.colorPrimary,b=e.colorSecondary,g=u()((t={},r(t,a,!!a),r(t,"align-"+p,!!p),r(t,a+"-"+o,!!o),r(t,a+"-shape-"+l,!!l&&o!==m.DEFAULT),t)),y=u()((n={"ep-icon-module":!0},r(n,a+"-icon",!!a),r(n,"ep-icon-module-"+i,!!i),n)),h=d,v="transparent",w="transparent",E=void 0;return o===m.STACKED&&(h=b,v=d,E=s),o===m.FRAMED&&(v=b,w=d,E=s),wp.element.createElement("div",{className:g},wp.element.createElement("span",{className:a+"-icon-wrap",style:{fontSize:c+"px",color:h,backgroundColor:v,borderColor:w,width:E?E+"em":"auto",height:E?E+"em":"auto",borderWidth:f}},wp.element.createElement("span",{className:y})))};Object(l.registerBlockType)("gutenbee/icon",{title:Object(o.__)("GutenBee Icon"),description:Object(o.__)("A flexible icon block"),icon:"star-empty",category:"layout",keywords:[Object(o.__)("icons")],attributes:{view:{type:"string",default:m.DEFAULT},shape:{type:"string",default:b.CIRCLE},icon:{type:"string",default:p.a[0]},size:{type:"number",default:40},padding:{type:"number",default:2},borderWidth:{type:"number",default:3},align:{type:"string",default:"center"},colorPrimary:{type:"string",default:"#0085ba"},colorSecondary:{type:"string",default:"#FFFFFF"}},edit:function(e){var t=e.className,n=e.attributes,r=e.setAttributes,c=e.focus,u=n.view,s=n.shape,y=n.icon,h=n.size,v=n.padding,w=n.borderWidth,E=n.align,_=n.colorPrimary,O=n.colorSecondary;return wp.element.createElement(a.Fragment,null,wp.element.createElement(g,d({className:t},n)),c&&wp.element.createElement(l.InspectorControls,{key:"inspector"},wp.element.createElement(i.SelectControl,{label:Object(o.__)("Icon"),value:y,onChange:function(e){return r({icon:e})},options:p.a.map(function(e){return{value:e,label:f()(e)}})}),wp.element.createElement(i.SelectControl,{label:Object(o.__)("View"),value:u,onChange:function(e){return r({view:e})},options:[{value:m.DEFAULT,label:Object(o.__)("Default")},{value:m.STACKED,label:Object(o.__)("Stacked")},{value:m.FRAMED,label:Object(o.__)("Framed")}]}),u!==m.DEFAULT&&wp.element.createElement(i.SelectControl,{label:Object(o.__)("Shape"),value:s,onChange:function(e){return r({shape:e})},options:[{value:b.CIRCLE,label:Object(o.__)("Circle")},{value:b.SQUARE,label:Object(o.__)("Square")}]}),wp.element.createElement(i.RangeControl,{label:"Icon Size",min:1,max:100,value:h,onChange:function(e){return r({size:e})}}),u!==m.DEFAULT&&wp.element.createElement(i.RangeControl,{label:"Padding",min:1,max:10,step:.1,value:v,onChange:function(e){return r({padding:e})}}),u===m.FRAMED&&wp.element.createElement(i.RangeControl,{label:"Border Size",min:1,max:50,step:1,value:w,onChange:function(e){return r({borderWidth:e})}}),wp.element.createElement("p",null,Object(o.__)("Alignment")),wp.element.createElement(l.AlignmentToolbar,{value:E,onChange:function(e){return r({align:e})}}),wp.element.createElement(i.PanelBody,{title:Object(o.__)("Primary Color")},wp.element.createElement(l.ColorPalette,{value:_,onChange:function(e){return r({colorPrimary:e})}})),u!==m.DEFAULT&&wp.element.createElement(i.PanelBody,{title:Object(o.__)("Secondary Color")},wp.element.createElement(l.ColorPalette,{value:O,onChange:function(e){return r({colorSecondary:e})}}))))},save:function(e){var t=e.className,n=e.attributes;return wp.element.createElement(g,d({className:t},n))}})},function(e,t,n){"use strict";var r=["add-bag","air-conditioning","alarm","american-express","bag","bag-return","bar","baseball","basket-ball","bathrobe","bathroom","bowling-ball","boxing-glove","breakfast","calculator","cart","car-rental","concierge","coupon","credit-card","cricket","delta-credit-card","disabled","discover-credit-card","diving","dollar-currency","dumbbell","elevator","euro-currency","fitness-center","free-toiletries","gavel","gift","globe","golf-ball","hairdryer","heating","iron","jcb-credit-card","laundry","linens","lounge","maestro-credit-card","mail","mastercard-card","medal","minibar","mobile-app","newspapers","no-smoking","parking","paypal","pets","piggy-bank","ping-pong","pool","pool-ball","pound-currency","radio","refrigerator","restaurant","rollers","rugby-ball","ruler","rupee-currency","safe","satellite-channels","search","secure","shower","shuttle-service","shuttlecock","skating","ski","slippers","smoking","soccer-ball","solo-credit-card","soundproof","spa","star","sun-deck","support","tag","telephone","tennis-ball","toilet","towels","transport","trophy","tv","visa-credit-card","visa-electron","volley-ball","yen-currency","wifi"];t.a=r}]);