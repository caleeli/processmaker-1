"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[652],{4685:function(e,r,o){o.d(r,{e:function(){return E}});var t=o(7294),n=o(5920),a=o(8427),l=o(5117),i=o(6817),s=Object.defineProperty,c=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,d=(e,r,o)=>r in e?s(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,u=(e,r)=>{for(var o in r||(r={}))p.call(r,o)&&d(e,o,r[o]);if(c)for(var o of c(r))f.call(r,o)&&d(e,o,r[o]);return e},b=(0,i.k)((e,{color:r,underline:o})=>({root:u({backgroundColor:"transparent",cursor:"pointer",padding:0,border:0,color:function({theme:e,color:r}){return"dimmed"===r?e.fn.dimmed():e.fn.themeColor(r||e.primaryColor,"dark"===e.colorScheme?4:7,!1,!0)}({theme:e,color:r})},e.fn.hover({textDecoration:o?"underline":"none"}))})),m=Object.defineProperty,y=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable,v=(e,r,o)=>r in e?m(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,w=(e,r)=>{for(var o in r||(r={}))h.call(r,o)&&v(e,o,r[o]);if(y)for(var o of y(r))g.call(r,o)&&v(e,o,r[o]);return e},O=(e,r)=>{var o={};for(var t in e)h.call(e,t)&&0>r.indexOf(t)&&(o[t]=e[t]);if(null!=e&&y)for(var t of y(e))0>r.indexOf(t)&&g.call(e,t)&&(o[t]=e[t]);return o};let P={underline:!0},j=(0,t.forwardRef)((e,r)=>{let o=(0,n.N4)("Anchor",P,e),{component:a,className:i,unstyled:s,variant:c,size:p,color:f,underline:d}=o,u=O(o,["component","className","unstyled","variant","size","color","underline"]),{classes:m,cx:y}=b({color:f,underline:d},{name:"Anchor",unstyled:s,variant:c,size:p});return t.createElement(l.x,w(w({component:a||"a",ref:r,className:y(m.root,i),size:p},"button"===a?{type:"button"}:null),u))});j.displayName="@mantine/core/Anchor";let E=(0,a.F)(j)},2623:function(e,r,o){o.d(r,{X:function(){return v}});var t=o(7294),n=o(5920),a=o(8427),l=o(6817),i=o(6768),s=(0,l.k)((e,{radius:r,shadow:o})=>({root:{outline:0,WebkitTapHighlightColor:"transparent",display:"block",textDecoration:"none",color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.white,boxSizing:"border-box",borderRadius:e.fn.radius(r),boxShadow:e.shadows[o]||o||"none","&[data-with-border]":{border:`${(0,i.h)(1)} solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`}}})),c=o(4523),p=Object.defineProperty,f=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,b=(e,r,o)=>r in e?p(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,m=(e,r)=>{for(var o in r||(r={}))d.call(r,o)&&b(e,o,r[o]);if(f)for(var o of f(r))u.call(r,o)&&b(e,o,r[o]);return e},y=(e,r)=>{var o={};for(var t in e)d.call(e,t)&&0>r.indexOf(t)&&(o[t]=e[t]);if(null!=e&&f)for(var t of f(e))0>r.indexOf(t)&&u.call(e,t)&&(o[t]=e[t]);return o};let h={},g=(0,t.forwardRef)((e,r)=>{let o=(0,n.N4)("Paper",h,e),{className:a,children:l,radius:i,withBorder:p,shadow:f,unstyled:d,variant:u}=o,b=y(o,["className","children","radius","withBorder","shadow","unstyled","variant"]),{classes:g,cx:v}=s({radius:i,shadow:f},{name:"Paper",unstyled:d,variant:u});return t.createElement(c.x,m({className:v(g.root,a),"data-with-border":p||void 0,ref:r},b),l)});g.displayName="@mantine/core/Paper";let v=(0,a.F)(g)},7564:function(e,r,o){o.d(r,{K:function(){return h}});var t=o(7294),n=o(5920),a=o(6817),l=o(4258),i=(0,a.k)((e,{spacing:r,align:o,justify:t})=>({root:{display:"flex",flexDirection:"column",alignItems:o,justifyContent:t,gap:(0,l.a)({size:r,sizes:e.spacing})}})),s=o(4523),c=Object.defineProperty,p=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,u=(e,r,o)=>r in e?c(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,b=(e,r)=>{for(var o in r||(r={}))f.call(r,o)&&u(e,o,r[o]);if(p)for(var o of p(r))d.call(r,o)&&u(e,o,r[o]);return e},m=(e,r)=>{var o={};for(var t in e)f.call(e,t)&&0>r.indexOf(t)&&(o[t]=e[t]);if(null!=e&&p)for(var t of p(e))0>r.indexOf(t)&&d.call(e,t)&&(o[t]=e[t]);return o};let y={spacing:"md",align:"stretch",justify:"flex-start"},h=(0,t.forwardRef)((e,r)=>{let o=(0,n.N4)("Stack",y,e),{spacing:a,className:l,align:c,justify:p,unstyled:f,variant:d}=o,u=m(o,["spacing","className","align","justify","unstyled","variant"]),{classes:h,cx:g}=i({spacing:a,align:c,justify:p},{name:"Stack",unstyled:f,variant:d});return t.createElement(s.x,b({className:g(h.root,l),ref:r},u))});h.displayName="@mantine/core/Stack"},9236:function(e,r,o){o.d(r,{D:function(){return k}});var t=o(7294),n=o(5920),a=o(6768),l=o(6817),i=Object.defineProperty,s=Object.defineProperties,c=Object.getOwnPropertyDescriptors,p=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,u=(e,r,o)=>r in e?i(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,b=(e,r)=>{for(var o in r||(r={}))f.call(r,o)&&u(e,o,r[o]);if(p)for(var o of p(r))d.call(r,o)&&u(e,o,r[o]);return e},m=(e,r)=>s(e,c(r)),y=(0,l.k)((e,{element:r,weight:o,inline:t},{size:n})=>({root:m(b({},e.fn.fontStyles()),{fontFamily:e.headings.fontFamily,fontWeight:o||e.headings.sizes[r].fontWeight||e.headings.fontWeight,fontSize:void 0!==n?n in e.headings.sizes?e.headings.sizes[n].fontSize:(0,a.h)(n):e.headings.sizes[r].fontSize,lineHeight:t?1:void 0!==n&&n in e.headings.sizes?e.headings.sizes[n].lineHeight:e.headings.sizes[r].lineHeight,margin:0})})),h=o(5117),g=Object.defineProperty,v=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable,P=(e,r,o)=>r in e?g(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,j=(e,r)=>{for(var o in r||(r={}))w.call(r,o)&&P(e,o,r[o]);if(v)for(var o of v(r))O.call(r,o)&&P(e,o,r[o]);return e},E=(e,r)=>{var o={};for(var t in e)w.call(e,t)&&0>r.indexOf(t)&&(o[t]=e[t]);if(null!=e&&v)for(var t of v(e))0>r.indexOf(t)&&O.call(e,t)&&(o[t]=e[t]);return o};let x={order:1},k=(0,t.forwardRef)((e,r)=>{let o=(0,n.N4)("Title",x,e),{className:a,order:l,children:i,unstyled:s,size:c,weight:p,inline:f,variant:d}=o,u=E(o,["className","order","children","unstyled","size","weight","inline","variant"]),{classes:b,cx:m}=y({element:`h${l}`,weight:p,inline:f},{name:"Title",unstyled:s,variant:d,size:c});return[1,2,3,4,5,6].includes(l)?t.createElement(h.x,j({variant:d,component:`h${l}`,ref:r,className:m(b.root,a)},u),i):null});k.displayName="@mantine/core/Title"},8393:function(e,r,o){o.d(r,{u:function(){return el}});var t=o(7294),n=o(4241),a=o(4731),l=o(3594),i=o(5920),s=o(4993);let c=(0,t.createContext)(!1),p=c.Provider,f=()=>(0,t.useContext)(c);function d({children:e,openDelay:r=0,closeDelay:o=0}){return t.createElement(p,{value:!0},t.createElement(s.e0,{delay:{open:r,close:o}},e))}d.displayName="@mantine/core/TooltipGroup";var u=o(6817),b=Object.defineProperty,m=Object.defineProperties,y=Object.getOwnPropertyDescriptors,h=Object.getOwnPropertySymbols,g=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,w=(e,r,o)=>r in e?b(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,O=(e,r)=>{for(var o in r||(r={}))g.call(r,o)&&w(e,o,r[o]);if(h)for(var o of h(r))v.call(r,o)&&w(e,o,r[o]);return e},P=(e,r)=>m(e,y(r)),j=(0,u.k)((e,{color:r,radius:o,width:t,multiline:n})=>({tooltip:P(O(O({},e.fn.fontStyles()),function(e,r){if(!r)return{backgroundColor:"dark"===e.colorScheme?e.colors.gray[2]:e.colors.gray[9],color:"dark"===e.colorScheme?e.black:e.white};let o=e.fn.variant({variant:"filled",color:r,primaryFallback:!1});return{backgroundColor:o.background,color:o.color}}(e,r)),{lineHeight:e.lineHeight,fontSize:e.fontSizes.sm,borderRadius:e.fn.radius(o),padding:`calc(${e.spacing.xs} / 2) ${e.spacing.xs}`,position:"absolute",whiteSpace:n?"unset":"nowrap",pointerEvents:"none",width:t}),arrow:{backgroundColor:"inherit",border:0,zIndex:1}}));let E={children:"Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"};var x=o(5983),k=o(8365),N=o(8269),S=o(4523),z=Object.defineProperty,C=Object.defineProperties,D=Object.getOwnPropertyDescriptors,I=Object.getOwnPropertySymbols,R=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable,M=(e,r,o)=>r in e?z(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,T=(e,r)=>{for(var o in r||(r={}))R.call(r,o)&&M(e,o,r[o]);if(I)for(var o of I(r))F.call(r,o)&&M(e,o,r[o]);return e},Y=(e,r)=>C(e,D(r)),L=(e,r)=>{var o={};for(var t in e)R.call(e,t)&&0>r.indexOf(t)&&(o[t]=e[t]);if(null!=e&&I)for(var t of I(e))0>r.indexOf(t)&&F.call(e,t)&&(o[t]=e[t]);return o};let H={refProp:"ref",withinPortal:!0,offset:10,position:"right",zIndex:(0,l.w)("popover")};function $(e){var r;let o=(0,i.N4)("TooltipFloating",H,e),{children:l,refProp:c,withinPortal:p,portalProps:f,style:d,className:u,classNames:b,styles:m,unstyled:y,radius:h,color:g,label:v,offset:w,position:O,multiline:P,width:z,zIndex:C,disabled:D,variant:I}=o,R=L(o,["children","refProp","withinPortal","portalProps","style","className","classNames","styles","unstyled","radius","color","label","offset","position","multiline","width","zIndex","disabled","variant"]),{handleMouseMove:F,x:M,y:$,opened:A,boundaryRef:_,floating:K,setOpened:W}=function({offset:e,position:r}){let[o,n]=(0,t.useState)(!1),a=(0,t.useRef)(),{x:l,y:i,reference:c,floating:p,refs:f,update:d,placement:u}=(0,s.YF)({placement:r,middleware:[(0,x.uY)({crossAxis:!0,padding:5,rootBoundary:"document"})]}),b=u.includes("right")?e:r.includes("left")?-1*e:0,m=u.includes("bottom")?e:r.includes("top")?-1*e:0,y=(0,t.useCallback)(({clientX:e,clientY:r})=>{c({getBoundingClientRect:()=>({width:0,height:0,x:e,y:r,left:e+b,top:r+m,right:e,bottom:r})})},[c]);return(0,t.useEffect)(()=>{if(f.floating.current){let e=a.current;e.addEventListener("mousemove",y);let r=(0,k.Kx)(f.floating.current);return r.forEach(e=>{e.addEventListener("scroll",d)}),()=>{e.removeEventListener("mousemove",y),r.forEach(e=>{e.removeEventListener("scroll",d)})}}},[c,f.floating.current,d,y,o]),{handleMouseMove:y,x:l,y:i,opened:o,setOpened:n,boundaryRef:a,floating:p}}({offset:w,position:O}),{classes:X,cx:q}=j({radius:h,color:g,multiline:P,width:z},{name:"TooltipFloating",classNames:b,styles:m,unstyled:y,variant:I});if(!(0,n.k)(l))throw Error(E.children);let B=(0,a.Y)(_,l.ref);return t.createElement(t.Fragment,null,t.createElement(N.q,Y(T({},f),{withinPortal:p}),t.createElement(S.x,Y(T({},R),{ref:K,className:q(X.tooltip,u),style:Y(T({},d),{zIndex:C,display:!D&&A?"block":"none",top:null!=$?$:"",left:null!=(r=Math.round(M))?r:""})}),v)),(0,t.cloneElement)(l,Y(T({},l.props),{[c]:B,onMouseEnter:e=>{var r,o;null==(o=(r=l.props).onMouseEnter)||o.call(r,e),F(e),W(!0)},onMouseLeave:e=>{var r,o;null==(o=(r=l.props).onMouseLeave)||o.call(r,e),W(!1)}})))}$.displayName="@mantine/core/TooltipFloating";var A=o(8556),_=o(3051),K=o(7048),W=o(212),X=o(4870),q=o(8036),B=o(3468),G=Object.defineProperty,Q=Object.defineProperties,J=Object.getOwnPropertyDescriptors,U=Object.getOwnPropertySymbols,V=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,ee=(e,r,o)=>r in e?G(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,er=(e,r)=>{for(var o in r||(r={}))V.call(r,o)&&ee(e,o,r[o]);if(U)for(var o of U(r))Z.call(r,o)&&ee(e,o,r[o]);return e},eo=(e,r)=>Q(e,J(r)),et=(e,r)=>{var o={};for(var t in e)V.call(e,t)&&0>r.indexOf(t)&&(o[t]=e[t]);if(null!=e&&U)for(var t of U(e))0>r.indexOf(t)&&Z.call(e,t)&&(o[t]=e[t]);return o};let en={position:"top",refProp:"ref",withinPortal:!1,inline:!1,arrowSize:4,arrowOffset:5,arrowRadius:0,arrowPosition:"side",offset:5,transitionProps:{duration:100,transition:"fade"},width:"auto",events:{hover:!0,focus:!1,touch:!1},zIndex:(0,l.w)("popover"),positionDependencies:[]},ea=(0,t.forwardRef)((e,r)=>{var o;let l=(0,t.useRef)(null),c=(0,i.N4)("Tooltip",en,e),{children:p,position:d,refProp:u,label:b,openDelay:m,closeDelay:y,onPositionChange:h,opened:g,withinPortal:v,portalProps:w,radius:O,color:P,classNames:k,styles:z,unstyled:C,style:D,className:I,withArrow:R,arrowSize:F,arrowOffset:M,arrowRadius:T,arrowPosition:Y,offset:L,transitionProps:H,multiline:$,width:G,events:Q,zIndex:J,disabled:U,positionDependencies:V,onClick:Z,onMouseEnter:ee,onMouseLeave:ea,inline:el,variant:ei,keepMounted:es}=c,ec=et(c,["children","position","refProp","label","openDelay","closeDelay","onPositionChange","opened","withinPortal","portalProps","radius","color","classNames","styles","unstyled","style","className","withArrow","arrowSize","arrowOffset","arrowRadius","arrowPosition","offset","transitionProps","multiline","width","events","zIndex","disabled","positionDependencies","onClick","onMouseEnter","onMouseLeave","inline","variant","keepMounted"]),{classes:ep,cx:ef,theme:ed}=j({radius:O,color:P,width:G,multiline:$},{name:"Tooltip",classNames:k,styles:z,unstyled:C,variant:ei}),eu=function(e){let[r,o]=(0,t.useState)(!1),n="boolean"==typeof e.opened,a=n?e.opened:r,l=f(),i=(0,_.M)(),{delay:c,currentId:p,setCurrentId:d}=(0,s.tj)(),u=(0,t.useCallback)(e=>{o(e),e&&d(i)},[d,i]),{x:b,y:m,reference:y,floating:h,context:g,refs:v,update:w,placement:O,middlewareData:{arrow:{x:P,y:j}={}}}=(0,s.YF)({placement:e.position,open:a,onOpenChange:u,middleware:[(0,x.cv)(e.offset),(0,x.uY)({padding:8}),(0,x.RR)(),(0,A.x7)({element:e.arrowRef,padding:e.arrowOffset}),...e.inline?[(0,x.Qo)()]:[]]}),{getReferenceProps:E,getFloatingProps:k}=(0,s.NI)([(0,s.XI)(g,{enabled:e.events.hover,delay:l?c:{open:e.openDelay,close:e.closeDelay},mouseOnly:!e.events.touch}),(0,s.KK)(g,{enabled:e.events.focus,keyboardOnly:!0}),(0,s.qs)(g,{role:"tooltip"}),(0,s.bQ)(g,{enabled:(e.opened,!1)}),(0,s.Qu)(g,{id:i})]);(0,W.L)({opened:a,position:e.position,positionDependencies:e.positionDependencies,floating:{refs:v,update:w}}),(0,K.l)(()=>{var r;null==(r=e.onPositionChange)||r.call(e,O)},[O]);let N=a&&p&&p!==i;return{x:b,y:m,arrowX:P,arrowY:j,reference:y,floating:h,getFloatingProps:k,getReferenceProps:E,isGroupPhase:N,opened:a,placement:O}}({position:(0,X._)(ed.dir,d),closeDelay:y,openDelay:m,onPositionChange:h,opened:g,events:Q,arrowRef:l,arrowOffset:M,offset:L+(R?F/2:0),positionDependencies:[...V,p],inline:el});if(!(0,n.k)(p))throw Error(E.children);let eb=(0,a.Y)(eu.reference,p.ref,r);return t.createElement(t.Fragment,null,t.createElement(N.q,eo(er({},w),{withinPortal:v}),t.createElement(q.u,eo(er({keepMounted:es,mounted:!U&&eu.opened},H),{transition:H.transition||"fade",duration:eu.isGroupPhase?10:null!=(o=H.duration)?o:100}),e=>{var r,o;return t.createElement(S.x,er(er({},ec),eu.getFloatingProps({ref:eu.floating,className:ep.tooltip,style:eo(er(er({},D),e),{zIndex:J,top:null!=(r=eu.y)?r:0,left:null!=(o=eu.x)?o:0})})),b,t.createElement(B.Y,{ref:l,arrowX:eu.arrowX,arrowY:eu.arrowY,visible:R,position:eu.placement,arrowSize:F,arrowOffset:M,arrowRadius:T,arrowPosition:Y,className:ep.arrow}))})),(0,t.cloneElement)(p,eu.getReferenceProps(er({onClick:Z,onMouseEnter:ee,onMouseLeave:ea,onMouseMove:e.onMouseMove,onPointerDown:e.onPointerDown,onPointerEnter:e.onPointerEnter,[u]:eb,className:ef(I,p.props.className)},p.props))))});ea.Group=d,ea.Floating=$,ea.displayName="@mantine/core/Tooltip";let el=ea}}]);
//# sourceMappingURL=652-aaa02d13239f7e31.js.map