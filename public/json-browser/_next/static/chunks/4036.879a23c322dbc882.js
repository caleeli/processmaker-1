"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4036],{9834:function(e,t,r){r.d(t,{A:function(){return I}});var n=r(7294),o=r(5920),a=r(8427),i=r(6768),l=r(6817),c=r(4258),d=Object.defineProperty,u=Object.defineProperties,s=Object.getOwnPropertyDescriptors,f=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,h=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&h(e,r,t[r]);if(f)for(var r of f(t))b.call(t,r)&&h(e,r,t[r]);return e},g=(e,t)=>u(e,s(t));let y=["subtle","filled","outline","light","default","transparent","gradient"],v={xs:(0,i.h)(18),sm:(0,i.h)(22),md:(0,i.h)(28),lg:(0,i.h)(34),xl:(0,i.h)(44)};var w=(0,l.k)((e,{radius:t,color:r,gradient:n},{variant:o,size:a})=>({root:g(m({position:"relative",borderRadius:e.fn.radius(t),padding:0,lineHeight:1,display:"flex",alignItems:"center",justifyContent:"center",height:(0,c.a)({size:a,sizes:v}),minHeight:(0,c.a)({size:a,sizes:v}),width:(0,c.a)({size:a,sizes:v}),minWidth:(0,c.a)({size:a,sizes:v})},function({variant:e,theme:t,color:r,gradient:n}){let o=t.fn.variant({color:r,variant:e,gradient:n});return"gradient"===e?{border:0,backgroundImage:o.background,color:o.color,"&:hover":t.fn.hover({backgroundSize:"200%"})}:y.includes(e)?m({border:`${(0,i.h)(1)} solid ${o.border}`,backgroundColor:o.background,color:o.color},t.fn.hover({backgroundColor:o.hover})):null}({variant:o,theme:e,color:r,gradient:n})),{"&:active":e.activeStyles,"& [data-action-icon-loader]":{maxWidth:"70%"},"&:disabled, &[data-disabled]":{color:e.colors.gray["dark"===e.colorScheme?6:4],cursor:"not-allowed",backgroundColor:"transparent"===o?void 0:e.fn.themeColor("gray","dark"===e.colorScheme?8:1),borderColor:"transparent"===o?void 0:e.fn.themeColor("gray","dark"===e.colorScheme?8:1),backgroundImage:"none",pointerEvents:"none","&:active":{transform:"none"}},"&[data-loading]":{pointerEvents:"none","&::before":g(m({content:'""'},e.fn.cover((0,i.h)(-1))),{backgroundColor:"dark"===e.colorScheme?e.fn.rgba(e.colors.dark[7],.5):"rgba(255, 255, 255, .5)",borderRadius:e.fn.radius(t),cursor:"not-allowed"})}})})),O=r(966),k=r(4736),x=Object.defineProperty,j=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable,S=(e,t,r)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,N=(e,t)=>{for(var r in t||(t={}))E.call(t,r)&&S(e,r,t[r]);if(j)for(var r of j(t))P.call(t,r)&&S(e,r,t[r]);return e},C=(e,t)=>{var r={};for(var n in e)E.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&j)for(var n of j(e))0>t.indexOf(n)&&P.call(e,n)&&(r[n]=e[n]);return r};let R={color:"gray",size:"md",variant:"subtle"},L=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("ActionIcon",R,e),{className:a,color:i,children:l,radius:c,size:d,variant:u,gradient:s,disabled:f,loaderProps:p,loading:b,unstyled:h,__staticSelector:m}=r,g=C(r,["className","color","children","radius","size","variant","gradient","disabled","loaderProps","loading","unstyled","__staticSelector"]),{classes:y,cx:v,theme:x}=w({radius:c,color:i,gradient:s},{name:["ActionIcon",m],unstyled:h,size:d,variant:u}),j=n.createElement(O.a,N({color:x.fn.variant({color:i,variant:u}).color,size:"100%","data-action-icon-loader":!0},p));return n.createElement(k.k,N({className:v(y.root,a),ref:t,disabled:f,"data-disabled":f||void 0,"data-loading":b||void 0,unstyled:h},g),b?j:l)});L.displayName="@mantine/core/ActionIcon";let I=(0,a.F)(L)},4685:function(e,t,r){r.d(t,{e:function(){return j}});var n=r(7294),o=r(5920),a=r(8427),i=r(5117),l=r(6817),c=Object.defineProperty,d=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,f=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))u.call(t,r)&&f(e,r,t[r]);if(d)for(var r of d(t))s.call(t,r)&&f(e,r,t[r]);return e},b=(0,l.k)((e,{color:t,underline:r})=>({root:p({backgroundColor:"transparent",cursor:"pointer",padding:0,border:0,color:function({theme:e,color:t}){return"dimmed"===t?e.fn.dimmed():e.fn.themeColor(t||e.primaryColor,"dark"===e.colorScheme?4:7,!1,!0)}({theme:e,color:t})},e.fn.hover({textDecoration:r?"underline":"none"}))})),h=Object.defineProperty,m=Object.getOwnPropertySymbols,g=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable,v=(e,t,r)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,w=(e,t)=>{for(var r in t||(t={}))g.call(t,r)&&v(e,r,t[r]);if(m)for(var r of m(t))y.call(t,r)&&v(e,r,t[r]);return e},O=(e,t)=>{var r={};for(var n in e)g.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&m)for(var n of m(e))0>t.indexOf(n)&&y.call(e,n)&&(r[n]=e[n]);return r};let k={underline:!0},x=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("Anchor",k,e),{component:a,className:l,unstyled:c,variant:d,size:u,color:s,underline:f}=r,p=O(r,["component","className","unstyled","variant","size","color","underline"]),{classes:h,cx:m}=b({color:s,underline:f},{name:"Anchor",unstyled:c,variant:d,size:u});return n.createElement(i.x,w(w({component:a||"a",ref:t,className:m(h.root,l),size:u},"button"===a?{type:"button"}:null),p))});x.displayName="@mantine/core/Anchor";let j=(0,a.F)(x)},7841:function(e,t,r){r.d(t,{z:function(){return G}});var n=r(7294),o=r(5920),a=r(4258),i=r(8427),l=r(6817),c=r(6768),d=(0,l.k)((e,{orientation:t,buttonBorderWidth:r})=>({root:{display:"flex",flexDirection:"vertical"===t?"column":"row","& [data-button]":{"&:first-of-type:not(:last-of-type)":{borderBottomRightRadius:0,["vertical"===t?"borderBottomLeftRadius":"borderTopRightRadius"]:0,["vertical"===t?"borderBottomWidth":"borderRightWidth"]:`calc(${(0,c.h)(r)} / 2)`},"&:last-of-type:not(:first-of-type)":{borderTopLeftRadius:0,["vertical"===t?"borderTopRightRadius":"borderBottomLeftRadius"]:0,["vertical"===t?"borderTopWidth":"borderLeftWidth"]:`calc(${(0,c.h)(r)} / 2)`},"&:not(:first-of-type):not(:last-of-type)":{borderRadius:0,["vertical"===t?"borderTopWidth":"borderLeftWidth"]:`calc(${(0,c.h)(r)} / 2)`,["vertical"===t?"borderBottomWidth":"borderRightWidth"]:`calc(${(0,c.h)(r)} / 2)`},"& + [data-button]":{["vertical"===t?"marginTop":"marginLeft"]:`calc(${r} * -1)`,"@media (min-resolution: 192dpi)":{["vertical"===t?"marginTop":"marginLeft"]:0}}}}})),u=r(4523),s=Object.defineProperty,f=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,h=(e,t,r)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&h(e,r,t[r]);if(f)for(var r of f(t))b.call(t,r)&&h(e,r,t[r]);return e},g=(e,t)=>{var r={};for(var n in e)p.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&f)for(var n of f(e))0>t.indexOf(n)&&b.call(e,n)&&(r[n]=e[n]);return r};let y={orientation:"horizontal",buttonBorderWidth:1},v=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("ButtonGroup",y,e),{className:a,orientation:i,buttonBorderWidth:l,unstyled:c}=r,s=g(r,["className","orientation","buttonBorderWidth","unstyled"]),{classes:f,cx:p}=d({orientation:i,buttonBorderWidth:l},{name:"ButtonGroup",unstyled:c});return n.createElement(u.x,m({className:p(f.root,a),ref:t},s))});v.displayName="@mantine/core/ButtonGroup";var w=r(5227),O=Object.defineProperty,k=Object.defineProperties,x=Object.getOwnPropertyDescriptors,j=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable,S=(e,t,r)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,N=(e,t)=>{for(var r in t||(t={}))E.call(t,r)&&S(e,r,t[r]);if(j)for(var r of j(t))P.call(t,r)&&S(e,r,t[r]);return e},C=(e,t)=>k(e,x(t));let R=["filled","outline","light","white","default","subtle","gradient"],L={xs:{height:w.J.xs,paddingLeft:(0,c.h)(14),paddingRight:(0,c.h)(14)},sm:{height:w.J.sm,paddingLeft:(0,c.h)(18),paddingRight:(0,c.h)(18)},md:{height:w.J.md,paddingLeft:(0,c.h)(22),paddingRight:(0,c.h)(22)},lg:{height:w.J.lg,paddingLeft:(0,c.h)(26),paddingRight:(0,c.h)(26)},xl:{height:w.J.xl,paddingLeft:(0,c.h)(32),paddingRight:(0,c.h)(32)},"compact-xs":{height:(0,c.h)(22),paddingLeft:(0,c.h)(7),paddingRight:(0,c.h)(7)},"compact-sm":{height:(0,c.h)(26),paddingLeft:(0,c.h)(8),paddingRight:(0,c.h)(8)},"compact-md":{height:(0,c.h)(30),paddingLeft:(0,c.h)(10),paddingRight:(0,c.h)(10)},"compact-lg":{height:(0,c.h)(34),paddingLeft:(0,c.h)(12),paddingRight:(0,c.h)(12)},"compact-xl":{height:(0,c.h)(40),paddingLeft:(0,c.h)(14),paddingRight:(0,c.h)(14)}},I=e=>({display:e?"block":"inline-block",width:e?"100%":"auto"});var A=(0,l.k)((e,{radius:t,fullWidth:r,compact:n,withLeftIcon:o,withRightIcon:i,color:l,gradient:d},{variant:u,size:s})=>({root:C(N(C(N(N(N(N({},function({compact:e,size:t,withLeftIcon:r,withRightIcon:n}){if(e)return L[`compact-${t}`];let o=L[t];return o?C(N({},o),{paddingLeft:r?`calc(${o.paddingLeft}  / 1.5)`:o.paddingLeft,paddingRight:n?`calc(${o.paddingRight}  / 1.5)`:o.paddingRight}):{}}({compact:n,size:s,withLeftIcon:o,withRightIcon:i})),e.fn.fontStyles()),e.fn.focusStyles()),I(r)),{borderRadius:e.fn.radius(t),fontWeight:600,position:"relative",lineHeight:1,fontSize:(0,a.a)({size:s,sizes:e.fontSizes}),userSelect:"none",cursor:"pointer"}),function({variant:e,theme:t,color:r,gradient:n}){if(!R.includes(e))return null;let o=t.fn.variant({color:r,variant:e,gradient:n});return"gradient"===e?N({border:0,backgroundImage:o.background,color:o.color},t.fn.hover({backgroundSize:"200%"})):N({border:`${(0,c.h)(1)} solid ${o.border}`,backgroundColor:o.background,color:o.color},t.fn.hover({backgroundColor:o.hover}))}({variant:u,theme:e,color:l,gradient:d})),{"&:active":e.activeStyles,"&:disabled, &[data-disabled]":{borderColor:"transparent",backgroundColor:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[2],color:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[5],cursor:"not-allowed",backgroundImage:"none",pointerEvents:"none","&:active":{transform:"none"}},"&[data-loading]":{pointerEvents:"none","&::before":C(N({content:'""'},e.fn.cover((0,c.h)(-1))),{backgroundColor:"dark"===e.colorScheme?e.fn.rgba(e.colors.dark[7],.5):"rgba(255, 255, 255, .5)",borderRadius:e.fn.radius(t),cursor:"not-allowed"})}}),icon:{display:"flex",alignItems:"center"},leftIcon:{marginRight:e.spacing.xs},rightIcon:{marginLeft:e.spacing.xs},centerLoader:{position:"absolute",left:"50%",transform:"translateX(-50%)",opacity:.5},inner:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",overflow:"visible"},label:{whiteSpace:"nowrap",height:"100%",overflow:"hidden",display:"flex",alignItems:"center"}})),z=r(966),T=r(4736),W=Object.defineProperty,B=Object.getOwnPropertySymbols,$=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,_=(e,t,r)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,F=(e,t)=>{for(var r in t||(t={}))$.call(t,r)&&_(e,r,t[r]);if(B)for(var r of B(t))H.call(t,r)&&_(e,r,t[r]);return e},D=(e,t)=>{var r={};for(var n in e)$.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&B)for(var n of B(e))0>t.indexOf(n)&&H.call(e,n)&&(r[n]=e[n]);return r};let J={size:"sm",type:"button",variant:"filled",loaderPosition:"left"},q=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("Button",J,e),{className:i,size:l,color:c,type:d,disabled:u,children:s,leftIcon:f,rightIcon:p,fullWidth:b,variant:h,radius:m,uppercase:g,compact:y,loading:v,loaderPosition:w,loaderProps:O,gradient:k,classNames:x,styles:j,unstyled:E}=r,P=D(r,["className","size","color","type","disabled","children","leftIcon","rightIcon","fullWidth","variant","radius","uppercase","compact","loading","loaderPosition","loaderProps","gradient","classNames","styles","unstyled"]),{classes:S,cx:N,theme:C}=A({radius:m,color:c,fullWidth:b,compact:y,gradient:k,withLeftIcon:!!f,withRightIcon:!!p},{name:"Button",unstyled:E,classNames:x,styles:j,variant:h,size:l}),R=C.fn.variant({color:c,variant:h}),I=n.createElement(z.a,F({color:R.color,size:`calc(${(0,a.a)({size:l,sizes:L}).height} / 2)`},O));return n.createElement(T.k,F({className:N(S.root,i),type:d,disabled:u,"data-button":!0,"data-disabled":u||void 0,"data-loading":v||void 0,ref:t,unstyled:E},P),n.createElement("div",{className:S.inner},(f||v&&"left"===w)&&n.createElement("span",{className:N(S.icon,S.leftIcon)},v&&"left"===w?I:f),v&&"center"===w&&n.createElement("span",{className:S.centerLoader},I),n.createElement("span",{className:S.label,style:{textTransform:g?"uppercase":void 0}},s),(p||v&&"right"===w)&&n.createElement("span",{className:N(S.icon,S.rightIcon)},v&&"right"===w?I:p)))});q.displayName="@mantine/core/Button",q.Group=v;let G=(0,i.F)(q)},971:function(e,t,r){r.d(t,{P:function(){return P}});var n=r(7294),o=r(6768),a=r(5920),i=r(8427),l=r(9834),c=Object.defineProperty,d=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,f=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))u.call(t,r)&&f(e,r,t[r]);if(d)for(var r of d(t))s.call(t,r)&&f(e,r,t[r]);return e},b=(e,t)=>{var r={};for(var n in e)u.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&d)for(var n of d(e))0>t.indexOf(n)&&s.call(e,n)&&(r[n]=e[n]);return r};function h(e){let{width:t,height:r,style:o}=e,a=b(e,["width","height","style"]);return n.createElement("svg",p({viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:p({width:t,height:r},o)},a),n.createElement("path",{d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}h.displayName="@mantine/core/CloseIcon";var m=Object.defineProperty,g=Object.getOwnPropertySymbols,y=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,w=(e,t,r)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,O=(e,t)=>{for(var r in t||(t={}))y.call(t,r)&&w(e,r,t[r]);if(g)for(var r of g(t))v.call(t,r)&&w(e,r,t[r]);return e},k=(e,t)=>{var r={};for(var n in e)y.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&g)for(var n of g(e))0>t.indexOf(n)&&v.call(e,n)&&(r[n]=e[n]);return r};let x={xs:(0,o.h)(12),sm:(0,o.h)(16),md:(0,o.h)(20),lg:(0,o.h)(28),xl:(0,o.h)(34)},j={size:"sm"},E=(0,n.forwardRef)((e,t)=>{let r=(0,a.N4)("CloseButton",j,e),{iconSize:i,size:c,children:d}=r,u=k(r,["iconSize","size","children"]),s=(0,o.h)(i||x[c]);return n.createElement(l.A,O({ref:t,__staticSelector:"CloseButton",size:c},u),d||n.createElement(h,{width:s,height:s}))});E.displayName="@mantine/core/CloseButton";let P=(0,i.F)(E)},3990:function(e,t,r){r.d(t,{i:function(){return f}});var n=r(7294),o=r(4241);let a=/input|select|textarea|button|object/,i="a, input, select, textarea, button, object, [tabindex]";function l(e){let t=e.getAttribute("tabindex");return null===t&&(t=void 0),parseInt(t,10)}function c(e){let t=e.nodeName.toLowerCase(),r=!Number.isNaN(l(e)),n=a.test(t)&&!e.disabled||e instanceof HTMLAnchorElement&&e.href||r;return n&&function(e){let t=e.getAttribute("aria-hidden")||e.getAttribute("hidden")||"hidden"===e.getAttribute("type");if(t)return!1;let r=e;for(;r&&r!==document.body&&11!==r.nodeType;){if("none"===r.style.display)return!1;r=r.parentNode}return!0}(e)}function d(e){let t=l(e),r=Number.isNaN(t);return(r||t>=0)&&c(e)}var u=r(9058),s=r(4731);function f({children:e,active:t=!0,refProp:r="ref"}){let a=function(e=!0){let t=(0,n.useRef)(),r=(0,n.useRef)(null),o=e=>{let t=e.querySelector("[data-autofocus]");if(!t){let r=Array.from(e.querySelectorAll(i));!(t=r.find(d)||r.find(c)||null)&&c(e)&&(t=e)}t&&t.focus({preventScroll:!0})},a=(0,n.useCallback)(n=>{if(e){if(null===n){r.current&&(r.current(),r.current=null);return}r.current=function(e,t="body > :not(script)"){let r=(0,u.k)(),n=Array.from(document.querySelectorAll(t)).map(t=>{var n;if((null==(n=null==t?void 0:t.shadowRoot)?void 0:n.contains(e))||t.contains(e))return;let o=t.getAttribute("aria-hidden"),a=t.getAttribute("data-hidden"),i=t.getAttribute("data-focus-id");return t.setAttribute("data-focus-id",r),null===o||"false"===o?t.setAttribute("aria-hidden","true"):a||i||t.setAttribute("data-hidden",o),{node:t,ariaHidden:a||null}});return()=>{n.forEach(e=>{e&&r===e.node.getAttribute("data-focus-id")&&(null===e.ariaHidden?e.node.removeAttribute("aria-hidden"):e.node.setAttribute("aria-hidden",e.ariaHidden),e.node.removeAttribute("data-focus-id"),e.node.removeAttribute("data-hidden"))})}}(n),t.current!==n&&(n?(setTimeout(()=>{n.getRootNode()&&o(n)}),t.current=n):t.current=null)}},[e]);return(0,n.useEffect)(()=>{if(!e)return;t.current&&setTimeout(()=>o(t.current));let n=e=>{"Tab"===e.key&&t.current&&function(e,t){let r=Array.from(e.querySelectorAll(i)).filter(d);if(!r.length){t.preventDefault();return}let n=r[t.shiftKey?0:r.length-1],o=e.getRootNode(),a=n===o.activeElement||e===o.activeElement;if(!a)return;t.preventDefault();let l=r[t.shiftKey?r.length-1:0];l&&l.focus()}(t.current,e)};return document.addEventListener("keydown",n),()=>{document.removeEventListener("keydown",n),r.current&&r.current()}},[e]),a}(t),l=(0,s.Y)(a,null==e?void 0:e.ref);return(0,o.k)(e)?(0,n.cloneElement)(e,{[r]:l}):e}f.displayName="@mantine/core/FocusTrap"},2623:function(e,t,r){r.d(t,{X:function(){return v}});var n=r(7294),o=r(5920),a=r(8427),i=r(6817),l=r(6768),c=(0,i.k)((e,{radius:t,shadow:r})=>({root:{outline:0,WebkitTapHighlightColor:"transparent",display:"block",textDecoration:"none",color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.white,boxSizing:"border-box",borderRadius:e.fn.radius(t),boxShadow:e.shadows[r]||r||"none","&[data-with-border]":{border:`${(0,l.h)(1)} solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`}}})),d=r(4523),u=Object.defineProperty,s=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,b=(e,t,r)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))f.call(t,r)&&b(e,r,t[r]);if(s)for(var r of s(t))p.call(t,r)&&b(e,r,t[r]);return e},m=(e,t)=>{var r={};for(var n in e)f.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&s)for(var n of s(e))0>t.indexOf(n)&&p.call(e,n)&&(r[n]=e[n]);return r};let g={},y=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("Paper",g,e),{className:a,children:i,radius:l,withBorder:u,shadow:s,unstyled:f,variant:p}=r,b=m(r,["className","children","radius","withBorder","shadow","unstyled","variant"]),{classes:y,cx:v}=c({radius:l,shadow:s},{name:"Paper",unstyled:f,variant:p});return n.createElement(d.x,h({className:v(y.root,a),"data-with-border":u||void 0,ref:t},b),i)});y.displayName="@mantine/core/Paper";let v=(0,a.F)(y)},5117:function(e,t,r){r.d(t,{x:function(){return N}});var n=r(7294),o=r(5920),a=r(8427),i=r(6817),l=r(4258),c=Object.defineProperty,d=Object.defineProperties,u=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,b=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))f.call(t,r)&&b(e,r,t[r]);if(s)for(var r of s(t))p.call(t,r)&&b(e,r,t[r]);return e},m=(e,t)=>d(e,u(t)),g=(0,i.k)((e,{color:t,lineClamp:r,truncate:n,inline:o,inherit:a,underline:i,gradient:c,weight:d,transform:u,align:s,strikethrough:f,italic:p},{size:b})=>{let g=e.fn.variant({variant:"gradient",gradient:c});return{root:m(h(h(h(h({},e.fn.fontStyles()),e.fn.focusStyles()),"number"==typeof r?{overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:r,WebkitBoxOrient:"vertical"}:null),function({theme:e,truncate:t}){return"start"===t?{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",direction:"ltr"===e.dir?"rtl":"ltr",textAlign:"ltr"===e.dir?"right":"left"}:t?{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}:null}({theme:e,truncate:n})),{color:function({theme:e,color:t}){return"dimmed"===t?e.fn.dimmed():"string"==typeof t&&(t in e.colors||t.split(".")[0]in e.colors)?e.fn.variant({variant:"filled",color:t}).background:t||"inherit"}({color:t,theme:e}),fontFamily:a?"inherit":e.fontFamily,fontSize:a||void 0===b?"inherit":(0,l.a)({size:b,sizes:e.fontSizes}),lineHeight:a?"inherit":o?1:e.lineHeight,textDecoration:function({underline:e,strikethrough:t}){let r=[];return e&&r.push("underline"),t&&r.push("line-through"),r.length>0?r.join(" "):"none"}({underline:i,strikethrough:f}),WebkitTapHighlightColor:"transparent",fontWeight:a?"inherit":d,textTransform:u,textAlign:s,fontStyle:p?"italic":void 0}),gradient:{backgroundImage:g.background,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}}),y=r(4523),v=Object.defineProperty,w=Object.getOwnPropertySymbols,O=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,x=(e,t,r)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,j=(e,t)=>{for(var r in t||(t={}))O.call(t,r)&&x(e,r,t[r]);if(w)for(var r of w(t))k.call(t,r)&&x(e,r,t[r]);return e},E=(e,t)=>{var r={};for(var n in e)O.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&w)for(var n of w(e))0>t.indexOf(n)&&k.call(e,n)&&(r[n]=e[n]);return r};let P={variant:"text"},S=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("Text",P,e),{className:a,size:i,weight:l,transform:c,color:d,align:u,variant:s,lineClamp:f,truncate:p,gradient:b,inline:h,inherit:m,underline:v,strikethrough:w,italic:O,classNames:k,styles:x,unstyled:S,span:N,__staticSelector:C}=r,R=E(r,["className","size","weight","transform","color","align","variant","lineClamp","truncate","gradient","inline","inherit","underline","strikethrough","italic","classNames","styles","unstyled","span","__staticSelector"]),{classes:L,cx:I}=g({color:d,lineClamp:f,truncate:p,inline:h,inherit:m,underline:v,strikethrough:w,italic:O,weight:l,transform:c,align:u,gradient:b},{unstyled:S,name:C||"Text",variant:s,size:i});return n.createElement(y.x,j({ref:t,className:I(L.root,{[L.gradient]:"gradient"===s},a),component:N?"span":"div"},R))});S.displayName="@mantine/core/Text";let N=(0,a.F)(S)},6362:function(e,t,r){r.d(t,{u:function(){return a}});var n=r(7294),o=r(7048);function a({opened:e,shouldReturnFocus:t=!0}){let r=(0,n.useRef)(),a=()=>{var e;r.current&&"focus"in r.current&&"function"==typeof r.current.focus&&(null==(e=r.current)||e.focus({preventScroll:!0}))};return(0,o.l)(()=>{let n=-1,o=e=>{"Tab"===e.key&&window.clearTimeout(n)};return document.addEventListener("keydown",o),e?r.current=document.activeElement:t&&(n=window.setTimeout(a,10)),()=>{window.clearTimeout(n),document.removeEventListener("keydown",o)}},[e,t]),a}},4137:function(e,t,r){r.d(t,{s:function(){return o}});var n=r(7294);function o(e,t,r){(0,n.useEffect)(()=>(window.addEventListener(e,t,r),()=>window.removeEventListener(e,t,r)),[e,t])}},8216:function(e,t,r){r.d(t,{R:function(){return o}});var n=r(7294);function o(e){let t=(0,n.createContext)(null);return[({children:e,value:r})=>n.createElement(t.Provider,{value:r},e),()=>{let r=(0,n.useContext)(t);if(null===r)throw Error(e);return r}]}},8357:function(e,t,r){r.d(t,{w_:function(){return c}});var n=r(7294),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=n.createContext&&n.createContext(o),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},l=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)0>t.indexOf(n[o])&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function c(e){return function(t){return n.createElement(d,i({attr:i({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,i({key:r},t.attr),e(t.child))})}(e.child))}}function d(e){var t=function(t){var r,o=e.attr,a=e.size,c=e.title,d=l(e,["attr","size","title"]),u=a||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,d,{className:r,style:i(i({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),c&&n.createElement("title",null,c),e.children)};return void 0!==a?n.createElement(a.Consumer,null,function(e){return t(e)}):t(o)}}}]);
//# sourceMappingURL=4036.879a23c322dbc882.js.map