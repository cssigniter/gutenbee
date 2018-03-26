window.wp=window.wp||{},window.wp["gutenbee.build"]=function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t){!function(){e.exports=window.wp.i18n}()},function(e,t){!function(){e.exports=window.wp.blocks}()},function(e,t){!function(){e.exports=window.wp.components}()},function(e,t){!function(){e.exports=window.wp.element}()},function(e,t){!function(){e.exports=window.wp.utils}()},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(7);n.n(r),n(8),n(9),n(10)},function(e,t){},function(e,t,n){"use strict";var r=n(0),a=(n.n(r),n(1));n.n(a);Object(a.registerBlockType)("gutenbee/spacer",{title:Object(r.__)("GutenBee Spacer"),description:Object(r.__)("Easily add vertical spacing between elements."),icon:"minus",category:"layout",keywords:[Object(r.__)("divider"),Object(r.__)("spacer"),"hr"],attributes:{height:{type:"number",default:10}},edit:function(e){var t=e.className,n=e.attributes,r=e.setAttributes,o=e.focus,l=function(e){r({height:e})};return[wp.element.createElement("div",{key:"spacer",className:t,style:{height:n.height}}),o&&wp.element.createElement(a.InspectorControls,{key:"inspector"},wp.element.createElement(a.InspectorControls.RangeControl,{label:"Height",min:10,max:1e3,onChange:l,value:n.height}))]},save:function(e){var t=e.className,n=e.attributes;return wp.element.createElement("div",{className:t,style:{height:n.height}})}})},function(e,t,n){"use strict";var r=n(0),a=(n.n(r),n(2)),o=(n.n(a),n(1)),l=(n.n(o),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),i={SOLID:"solid",DOTTED:"dotted",DASHED:"dashed",DOUBLE:"double"},c=function(e){var t=e.className,n=e.height,r=e.style,a=e.weight,o=e.width,l=e.align,i=e.color;return wp.element.createElement("div",{key:"divider",className:t+" align-"+l,style:{height:n}},wp.element.createElement("div",{className:t+"-inner",style:{borderTopStyle:r,borderTopWidth:a,borderTopColor:i,width:o+"%"}}))};Object(o.registerBlockType)("gutenbee/divider",{title:Object(r.__)("GutenBee Divider"),description:Object(r.__)("A divider to indicate a thematic change in the content in style."),icon:"minus",category:"layout",keywords:[Object(r.__)("divider"),Object(r.__)("horizontal-line"),"hr"],attributes:{style:{type:"string",default:i.SOLID},weight:{type:"number",default:1},width:{type:"number",default:100},height:{type:"number",default:10},align:{type:"string",default:"center"},color:{type:"string",default:"#000000"}},edit:function(e){var t=e.className,n=e.attributes,s=e.setAttributes,u=e.focus,p=n.style,m=n.weight,d=n.width,f=n.height,b=n.align,g=n.color;return[wp.element.createElement(c,l({className:t},n)),u&&wp.element.createElement(o.InspectorControls,{key:"inspector"},wp.element.createElement("p",null,Object(r.__)("Style")),wp.element.createElement(a.Toolbar,{controls:Object.values(i).map(function(e,t){return{icon:"admin-appearance",title:Object(r.sprintf)(Object(r.__)("Style %s"),e),isActive:p===e,onClick:function(){return s({style:e})},subscript:t+1}})}),wp.element.createElement(o.InspectorControls.RangeControl,{label:"Weight (thickness)",min:1,max:50,value:m,onChange:function(e){return s({weight:e})}}),wp.element.createElement(o.InspectorControls.RangeControl,{label:"Width",min:1,max:100,value:d,onChange:function(e){return s({width:e})}}),wp.element.createElement(o.InspectorControls.RangeControl,{label:"Height",min:10,max:100,onChange:function(e){return s({height:e})},value:f}),wp.element.createElement("p",null,Object(r.__)("Alignment")),wp.element.createElement(o.AlignmentToolbar,{value:b,onChange:function(e){return s({align:e})}}),wp.element.createElement(a.PanelBody,{title:Object(r.__)("Color")},wp.element.createElement(o.ColorPalette,{value:g,onChange:function(e){return s({color:e})}})))]},save:function(e){var t=e.className,n=e.attributes;return wp.element.createElement(c,l({className:t},n))}})},function(e,t,n){"use strict";var r=n(0),a=(n.n(r),n(1)),o=(n.n(a),n(11));Object(a.registerBlockType)("gutenbee/slideshow",{title:Object(r.__)("GutenBee Slideshow"),description:Object(r.__)("A slideshow block"),icon:"slides",category:"common",keywords:[Object(r.__)("slideshow"),Object(r.__)("gallery")],attributes:{images:{type:"array",default:[],source:"query",selector:".wp-block-gutenbee-slideshow .gutenbee-slideshow-item",query:{url:{source:"attribute",selector:"img",attribute:"src"},alt:{source:"attribute",selector:"img",attribute:"alt",default:""},id:{source:"attribute",selector:"img",attribute:"data-id"},caption:{type:"array",source:"children",selector:"figcaption"}}},animationStyle:{type:"string",default:"fade"},arrowNav:{type:"boolean",default:!0},dotNav:{type:"boolean",default:!0},autoplay:{type:"boolean",default:!0},infinite:{type:"boolean",default:!0},speed:{type:"number",default:300},autoplaySpeed:{type:"number",default:3e3}},edit:o.a,save:function(e){var t=e.className,n=e.attributes,r=n.images,a=n.animationStyle,o=n.autoplay,l=n.arrowNav,i=n.dotNav,c=n.infinite,s=n.speed,u=n.autoplaySpeed;return wp.element.createElement("div",{className:t,"data-fade":"fade"===a,"data-autoplay":o,"data-arrows":l,"data-dots":i,"data-infinite":c,"data-speed":s,"data-autoplay-speed":u},r.map(function(e,t){return wp.element.createElement("div",{key:e.id||t,className:"gutenbee-slideshow-item"},wp.element.createElement("img",{src:e.url,alt:e.alt||""}))}))}})},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(3),c=(n.n(i),n(0)),s=(n.n(c),n(4)),u=(n.n(s),n(2)),p=(n.n(u),n(1)),m=(n.n(p),n(12)),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),b=function(e){function t(){var e,n,l,i;a(this,t);for(var c=arguments.length,u=Array(c),p=0;p<c;p++)u[p]=arguments[p];return n=l=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),l.state={selectedImage:null},l.onSelectImage=function(e){return function(){l.state.selectedImage!==e&&l.setState({selectedImage:e})}},l.onRemoveImage=function(e){return function(){var t=l.props.attributes.images.filter(function(t,n){return e!==n});l.setState({selectedImage:null}),l.props.setAttributes({images:t})}},l.onSelectImages=function(e){l.props.setAttributes({images:e.map(function(e){return d({},e,{caption:e.caption?[e.caption]:[]})})})},l.setImageAttributes=function(e,t){var n=l.props,a=n.attributes.images,o=n.setAttributes;a[e]&&o({images:[].concat(r(a.slice(0,e)),[d({},a[e],t)],r(a.slice(e+1)))})},l.uploadFromFiles=function(e){l.addFiles(e.target.files)},l.addFiles=function(e){var t=l.props.attributes.images||[],n=l.props.setAttributes;Object(s.mediaUpload)(e,function(e){n({images:t.concat(e)})})},i=n,o(l,i)}return l(t,e),f(t,[{key:"componentWillReceiveProps",value:function(e){!e.isSelected&&this.props.isSelected&&this.setState({selectedImage:null})}},{key:"render",value:function(){var e=this,t=this.props,n=t.attributes,r=t.isSelected,a=t.className,o=t.setAttributes,l=n.images,s=n.arrowNav,d=n.dotNav,f=n.autoplay,b=n.animationStyle,g=n.infinite,y=n.speed,h=n.autoplaySpeed,w=wp.element.createElement(u.DropZone,{onFilesDrop:this.addFiles}),v=r&&wp.element.createElement(p.BlockControls,{key:"controls"},!!l.length&&wp.element.createElement(u.Toolbar,null,wp.element.createElement(p.MediaUpload,{onSelect:this.onSelectImages,type:"image",multiple:!0,gallery:!0,value:l.map(function(e){return e.id}),render:function(e){var t=e.open;return wp.element.createElement(u.IconButton,{className:"components-toolbar__control",label:Object(c.__)("Edit Slideshow"),icon:"edit",onClick:t})}})));return 0===l.length?wp.element.createElement(i.Fragment,null,v,wp.element.createElement(p.ImagePlaceholder,{className:a,icon:"format-gallery",label:Object(c.__)("Slideshow"),onSelectImage:this.onSelectImages,multiple:!0})):wp.element.createElement(i.Fragment,null,v,r&&wp.element.createElement(p.InspectorControls,null,wp.element.createElement("h2",null,Object(c.__)("Slideshow Settings")),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Autoplay"),checked:f,onChange:function(){o({autoplay:!f})}}),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Infinite Slide"),checked:g,onChange:function(){o({infinite:!g})}}),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Arrow Navigation"),checked:s,onChange:function(){o({arrowNav:!s})}}),wp.element.createElement(u.ToggleControl,{label:Object(c.__)("Dot Navigation"),checked:d,onChange:function(){o({dotNav:!d})}}),wp.element.createElement("h2",null,Object(c.__)("Animation Settings")),wp.element.createElement(u.RadioControl,{label:"Animation Style",selected:b,options:[{label:"Fade",value:"fade"},{label:"Slide",value:"slide"}],onChange:function(e){o({animationStyle:e})}}),wp.element.createElement(u.RangeControl,{label:"Animation Speed (ms)",min:50,max:5e3,value:y,onChange:function(e){o({speed:e})},step:10}),wp.element.createElement(u.RangeControl,{label:"Autoplay Speed (ms)",min:500,max:1e4,value:h,onChange:function(e){o({autoplaySpeed:e})},step:10})),wp.element.createElement("div",{className:a},w,l.map(function(t,n){return wp.element.createElement("div",{key:t.id||t.url,className:"gutenbee-gallery-item blocks-gallery-item"},wp.element.createElement(m.a,{url:t.url,alt:t.alt,id:t.id,isSelected:r&&e.state.selectedImage===n,onRemove:e.onRemoveImage(n),onSelect:e.onSelectImage(n),setAttributes:function(t){return e.setImageAttributes(n,t)},caption:t.caption}))}),r&&wp.element.createElement("div",{className:"gutenbee-gallery-item blocks-gallery-item"},wp.element.createElement(u.FormFileUpload,{multiple:!0,isLarge:!0,className:"blocks-gallery-add-item-button",onChange:this.uploadFromFiles,accept:"image/*",icon:"insert"}))))}}]),t}(i.Component);t.a=b},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(13),i=n.n(l),c=n(3),s=(n.n(c),n(2)),u=(n.n(s),n(0)),p=(n.n(u),n(4)),m=(n.n(p),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),d=p.keycodes.BACKSPACE,f=p.keycodes.DELETE,b=function(e){function t(){var e,n,o,l;r(this,t);for(var i=arguments.length,c=Array(i),s=0;s<i;s++)c[s]=arguments[s];return n=o=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),o.onImageClick=function(){o.props.isSelected||o.props.onSelect()},o.onKeyDown=function(e){o.container===document.activeElement&&o.props.isSelected&&[d,f].includes(e.keyCode)&&(e.stopPropagation(),e.preventDefault(),o.props.onRemove())},l=n,a(o,l)}return o(t,e),m(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.image;t&&t.data&&!this.props.url&&this.props.setAttributes({url:t.data.source_url,alt:t.data.alt_text})}},{key:"render",value:function(){var e=this,t=this.props,n=t.url,r=t.alt,a=t.id,o=t.linkTo,l=t.link,c=t.isSelected,p=t.onRemove,m=void 0;switch(o){case"media":m=n;break;case"attachment":m=l}var d=n?wp.element.createElement("img",{src:n,alt:r,"data-id":a,onClick:this.onImageClick}):wp.element.createElement(s.Spinner,null),f=i()({"is-selected":c,"is-transient":n&&0===n.indexOf("blob:")});return wp.element.createElement("figure",{className:f,tabIndex:"-1",onKeyDown:this.onKeyDown,ref:function(t){e.container=t}},c&&wp.element.createElement("div",{className:"blocks-gallery-item__inline-menu"},wp.element.createElement(s.IconButton,{icon:"no-alt",onClick:p,className:"blocks-gallery-item__remove",label:Object(u.__)("Remove Image")})),m?wp.element.createElement("a",{href:m},d):d)}}]),t}(c.Component);t.a=Object(s.withAPIData)(function(e){var t=e.id;return{image:t?"/wp/v2/media/"+t:{}}})(b)},function(e,t,n){var r,a;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r))e.push(n.apply(null,r));else if("object"===a)for(var l in r)o.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}var o={}.hasOwnProperty;void 0!==e&&e.exports?e.exports=n:(r=[],void 0!==(a=function(){return n}.apply(t,r))&&(e.exports=a))}()}]);