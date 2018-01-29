!function(e){function t(r){if(n[r])return n[r].exports;var l=n[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),l=(n.n(r),n(2)),i=(n.n(l),n(3)),a=(n.n(i),n(4));n.n(a)},function(e,t){},function(e,t){},function(e,t){var n=wp.i18n.__,r=wp.blocks,l=r.registerBlockType,i=r.InspectorControls;l("gutenbee/spacer",{title:n("GutenBee Spacer"),description:n("Easily add vertical spacing between elements."),icon:"minus",category:"layout",keywords:[n("divider"),n("spacer"),"hr"],attributes:{height:{type:"number",default:10}},edit:function(e){var t=e.className,n=e.attributes,r=e.setAttributes,l=e.focus,a=function(e){r({height:e})};return[wp.element.createElement("div",{key:"spacer",className:t,style:{height:n.height}}),l&&wp.element.createElement(i,{key:"inspector"},wp.element.createElement(i.RangeControl,{label:"Height",min:10,max:1e3,onChange:a,value:n.height}))]},save:function(e){var t=e.className,n=e.attributes;return wp.element.createElement("div",{className:t,style:{height:n.height}})}})},function(e,t){var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r=wp.i18n,l=r.__,i=r.sprintf,a=wp.blocks,o=a.registerBlockType,c=a.InspectorControls,s=a.AlignmentToolbar,u=a.ColorPalette,m=wp.components,p=m.PanelBody,d=m.Toolbar,h={SOLID:"solid",DOTTED:"dotted",DASHED:"dashed",DOUBLE:"double"},g=function(e){var t=e.className,n=e.height,r=e.style,l=e.weight,i=e.width,a=e.align,o=e.color;return wp.element.createElement("div",{key:"divider",className:t+" align-"+a,style:{height:n}},wp.element.createElement("div",{className:t+"-inner",style:{borderTopStyle:r,borderTopWidth:l,borderTopColor:o,width:i+"%"}}))};o("gutenbee/divider",{title:l("GutenBee Divider"),description:l("A divider to indicate a thematic change in the content in style."),icon:"minus",category:"layout",keywords:[l("divider"),l("horizontal-line"),"hr"],attributes:{style:{type:"string",default:h.SOLID},weight:{type:"number",default:1},width:{type:"number",default:100},height:{type:"number",default:10},align:{type:"string",default:"center"},color:{type:"string",default:"#000000"}},edit:function(e){var t=e.className,r=e.attributes,a=e.setAttributes,o=e.focus,m=r.style,f=r.weight,y=r.width,w=r.height,b=r.align,v=r.color;return[wp.element.createElement(g,n({className:t},r)),o&&wp.element.createElement(c,{key:"inspector"},wp.element.createElement("p",null,l("Style")),wp.element.createElement(d,{controls:Object.values(h).map(function(e,t){return{icon:"admin-appearance",title:i(l("Style %s"),e),isActive:m===e,onClick:function(){return a({style:e})},subscript:t+1}})}),wp.element.createElement(c.RangeControl,{label:"Weight (thickness)",min:1,max:50,value:f,onChange:function(e){return a({weight:e})}}),wp.element.createElement(c.RangeControl,{label:"Width",min:1,max:100,value:y,onChange:function(e){return a({width:e})}}),wp.element.createElement(c.RangeControl,{label:"Height",min:10,max:100,onChange:function(e){return a({height:e})},value:w}),wp.element.createElement("p",null,l("Alignment")),wp.element.createElement(s,{value:b,onChange:function(e){return a({align:e})}}),wp.element.createElement(p,{title:l("Color")},wp.element.createElement(u,{value:v,onChange:function(e){return a({color:e})}})))]},save:function(e){var t=e.className,r=e.attributes;return wp.element.createElement(g,n({className:t},r))}})}]);