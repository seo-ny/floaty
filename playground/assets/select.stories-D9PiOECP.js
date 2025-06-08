const L={START:"start",CENTER:"center",END:"end"},E={X:"x",Y:"y"},w={BOTTOM:"bottom",TOP:"top",LEFT:"left",RIGHT:"right"},N=[w.BOTTOM,w.TOP],ee=[w.BOTTOM,w.RIGHT],V={placement:"bottom",strategy:"absolute",boundary:"clippingAncestors",rootBoundary:"viewport",padding:0,behaviors:[],onAfterComputePosition:null},m={x:0,y:0,width:0,height:0},te=(e="bottom")=>{const t=N.includes(e);return{mainAxis:t?E.Y:E.X,crossAxis:t?E.X:E.Y}},ne=(e=null)=>{const t=[];let n=e==null?void 0:e.parentElement;for(;b(n)&&n!==document.body&&n!==document.documentElement;){const o=getComputedStyle(n),r=o.overflow+o.overflowX+o.overflowY;/(auto|scroll)/.test(r)&&t.push(n),n=n.parentElement}return t.concat(document.body,document.documentElement,window)},oe=(e=null)=>{const t=[];let n=e==null?void 0:e.parentElement;for(;b(n);){const o=getComputedStyle(n),r=o.overflow+o.overflowX+o.overflowY;/(auto|scroll|clip|hidden)/.test(r)&&t.push(n),n=n.parentElement}return t},re=(e=[],t=m)=>{if(!e.length)return[];e.some(o=>!b(o))&&y("[getClippingAncestors] overflowAncestors에 유효하지 않은 요소가 포함되어 있음",{overflowAncestors:e});const n=(o=null)=>{const r=O(o);return t.x<r.x||t.x+t.width>r.x+r.width||t.y<r.y||t.y+t.height>r.y+r.height};return e.filter(n)},le=(e=null)=>{let t=document.documentElement,n=e==null?void 0:e.parentElement;for(;b(n);){const{position:o}=getComputedStyle(n);if(/^(relative|absolute|sticky|fixed)$/.test(o)){t=n;break}n=n.parentElement}return t},ie=(e,t)=>new Error(e,{cause:t}),y=(e,t)=>{throw ie(e,t)},se=({referenceEl:e=null,floatingElRect:t=m,boundary:n="clippingAncestors",rootBoundary:o="viewport",padding:r=0})=>{b(e)||y("[detectOverflow] referenceEl이 HTMLElement가 아님",{referenceEl:e});const l=ce({referenceEl:e,floatingElRect:t,boundary:n,rootBoundary:o,padding:r});return{[w.TOP]:l.y-t.y,[w.BOTTOM]:t.y+t.height-(l.y+l.height),[w.LEFT]:l.x-t.x,[w.RIGHT]:t.x+t.width-(l.x+l.width)}},ce=({referenceEl:e=null,floatingElRect:t=m,boundary:n="clippingAncestors",rootBoundary:o="viewport",padding:r=0})=>{b(e)||y("[getClippingRect] referenceEl이 HTMLElement가 아님",{referenceEl:e});const l=n==="clippingAncestors"?re(oe(e),t).filter(b).map(O):[n].filter(q),s=o==="viewport"?z():$(),i=(u,c)=>{const p=Math.max(u.x,c.x),d=Math.max(u.y,c.y),h=Math.min(u.x+u.width,c.x+c.width),v=Math.min(u.y+u.height,c.y+c.height),x=Math.max(0,h-p),A=Math.max(0,v-d);return{x:p,y:d,width:x,height:A}},a=l.reduce(i,s);return r?_(a,r):a},ae=(e=m,t=null)=>{const n=le(t),o=F(n),r=e.x-o.x,l=e.y-o.y;return{x:r,y:l,width:e.width,height:e.height}},X=(e="bottom")=>{const[t="bottom",n="center"]=e.split("-");return{direction:t,alignment:n}},Y=({placement:e="bottom",rects:t={reference:m,floating:m}})=>{M(t)||y("[getInitialRect] rects가 유효하지 않음",{rects:t});const{direction:n,alignment:o}=X(e),{mainAxis:r,crossAxis:l}=te(n),{reference:s,floating:i}=t;let a={x:0,y:0,width:0,height:0};const u={x:s.x,y:s.y},c=r===E.Y?"height":"width",p=l===E.X?"width":"height",d=ue(n)?s[c]:-i[c];a[r]=u[r]+(d||0);const h={[L.START]:0,[L.CENTER]:(s[p]-i[p])*.5,[L.END]:s[p]-i[p]};return a[l]=u[l]+(h[o]||0),a={...a,[c]:i[c],[p]:i[p]},console.log("[getInitialRect]",{initialRect:a}),a},C=(e=null)=>(b(e)||y("[getElementRect] el이 HTMLElement가 아님",{el:e}),e.getBoundingClientRect()||m),O=(e=null)=>{b(e)||y("[getElementInnerRect] el이 HTMLElement가 아님",{el:e});const t=C(e),{clientLeft:n,clientTop:o,clientWidth:r,clientHeight:l}=e,s=t.x+n,i=t.y+o;return{x:s,y:i,width:r,height:l}},F=(e=null)=>{b(e)||y("[getElementScrollContentRect] el이 HTMLElement가 아님",{el:e});const t=O(e),{scrollWidth:n,scrollHeight:o,scrollLeft:r,scrollTop:l}=e,s=t.x-r,i=t.y-l;return{x:s,y:i,width:n,height:o}},_=(e=m,t=0)=>({x:e.x+t,y:e.y+t,width:e.width-t*2,height:e.height-t*2}),z=()=>{var e,t,n,o;const r=((e=window.visualViewport)==null?void 0:e.width)??window.innerWidth??0,l=((t=window.visualViewport)==null?void 0:t.height)??window.innerHeight??0,s=((n=window.visualViewport)==null?void 0:n.offsetLeft)??window.scrollX??0,i=((o=window.visualViewport)==null?void 0:o.offsetTop)??window.scrollY??0;return{x:s,y:i,width:r,height:l}},$=()=>{const e=document.documentElement,t=document.body,n=window.scrollX??e.scrollLeft??t.scrollLeft??0,o=window.scrollY??e.scrollTop??t.scrollTop??0,r=Math.max(t.scrollWidth,t.offsetWidth,e.scrollWidth,e.clientWidth,e.offsetWidth),l=Math.max(t.scrollHeight,t.offsetHeight,e.scrollHeight,e.clientHeight,e.offsetHeight);return{x:0-n,y:0-o,width:r,height:l}},de=Object.freeze(Object.defineProperty({__proto__:null,getDocumentRect:$,getElementInnerRect:O,getElementRect:C,getElementScrollContentRect:F,getInitialRect:Y,getViewportRect:z,insetRect:_},Symbol.toStringTag,{value:"Module"})),b=(e=null)=>e&&e instanceof HTMLElement,q=(e=null)=>e&&typeof e=="object"&&"x"in e&&"y"in e&&"width"in e&&"height"in e,M=(e={})=>typeof e=="object"&&e!==null&&!Array.isArray(e)?Object.values(e).every(t=>q(t)):!1,ue=(e="bottom")=>ee.includes(e),pe=(e="bottom")=>N.includes(e),ge=({options:e={mainAxis:0,crossAxis:0,alignmentAxis:0},x:t=0,y:n=0,rects:o={reference:m,floating:m},placement:r="bottom"})=>{M(o)||y("[offset] rects가 유효하지 않음",{rects:o});const{mainAxis:l=0,crossAxis:s=0,alignmentAxis:i=0}=e,{START:a}=L,{direction:u,alignment:c}=X(r),p=pe(u),d={mainAxis:l,crossAxis:s,alignmentAxis:c===a?i:-i},h=p?d.alignmentAxis||d.crossAxis:d.mainAxis,v=p?d.mainAxis:d.alignmentAxis||d.crossAxis,x={x:t+h,y:n+v};return{x:x.x,y:x.y,width:o.floating.width,height:o.floating.height}},G={offset:ge},me=(e={})=>{const t=e.name??"",n=typeof G[t]=="function";return n||console.warn("[getValidBehaviors] 유효하지 않은 behavior가 포함되어 있습니다.",{behavior:e}),n},he=({currentRect:e=m,behavior:t={},rects:n={reference:m,floating:m},placement:o="bottom"})=>{const{name:r,options:l}=t,s=G[r],{x:i,y:a}=s({options:l,...e,rects:n,placement:o});return{x:i,y:a}},fe=({behaviors:e=[],initialRect:t=m,rects:n={reference:m,floating:m},placement:o="bottom"})=>{M(n)||y("[computeWithBehaviors] rects가 유효하지 않습니다.",{rects:n}),Array.isArray(e)||y("[computeWithBehaviors] behaviors가 배열이 아님",{behaviors:e});const r=e.filter(me).reduce((l,s)=>he({currentRect:l,behavior:s,rects:n,placement:o}),t);return{x:r.x,y:r.y,width:n.floating.width,height:n.floating.height}},ye=async(e=null,t=null,n=V)=>{var o;(!b(e)||!b(t))&&y("[computePosition] referenceEl 또는 floatingEl이 HTMLElement가 아님",{referenceEl:e,floatingEl:t});const r={reference:C(e),floating:C(t)},l=Y({placement:n.placement,rects:r}),s=fe({behaviors:n.behaviors,initialRect:l,rects:r,placement:n.placement});se({referenceEl:e,floatingElRect:s,boundary:n.boundary,rootBoundary:n.rootBoundary,padding:n.padding}),console.log("[computePosition]",{computedRect:s});const i={absolute:()=>ae(s,e),fixed:()=>s};return i[n.strategy]||y("[adjustPositionByStrategy] strategy가 유효하지 않음",{strategy:n.strategy}),(o=i[n.strategy])==null?void 0:o.call(i)},be=async(e=null,t=null,n={})=>{const o=ne(e),r=async u=>{try{const c={...V,...n},{x:p,y:d}=await ye(e,t,c);if(typeof c.onAfterComputePosition=="function"){const h={elements:{reference:e,floating:t},position:{x:p,y:d}};c.onAfterComputePosition(h)}else requestAnimationFrame(()=>{Object.assign(t.style,{position:c.strategy,left:`${p}px`,top:`${d}px`})});return{x:p,y:d}}catch(c){return console.error(c),{x:0,y:0}}},l=()=>{o.forEach(u=>{u.addEventListener("scroll",r,{passive:!0})}),window.addEventListener("resize",r)},s=()=>{o.forEach(u=>{u.removeEventListener("scroll",r,{passive:!0})}),window.removeEventListener("resize",r)},{x:i,y:a}=await r();return l(),{x:i,y:a,clear:s}};function xe({options:e=[],placeholder:t="선택해주세요.",onSelect:n=()=>{},maxVisibleItems:o=4}){const r=we();document.head.appendChild(r);const l=document.createElement("div");l.className="select";const s=document.createElement("div");s.className="select-trigger",s.textContent=t;const i=document.createElement("div");i.className="dropdown-menu";const a=document.createElement("ul");a.className="menu-list";let u=!1,c=null,p=null,d=null,h=null;function v(){x(),Q(p)}async function x(){if(u=!u,u){if(A(d),typeof c=="function"){const{clear:g}=await c();h=g}}else S(),h()}function A(g=null){i.classList.add("open"),i.style.maxHeight=K(),H(g)}function S(){i.classList.remove("open"),i.style.maxHeight="none"}function K(){const g=a.children[0];return g&&o<e.length?`${o*g.getBoundingClientRect().height}px`:"none"}function H(g=null){Array.from(a.children).forEach(f=>{f.classList.remove("selected")}),g&&g.classList.add("selected")}function Q(g=null){const f=e.findIndex(({value:Z})=>Z===g);f!==-1&&a.children[f].scrollIntoView({behavior:"smooth",block:"nearest"})}function U(g={},f=null){p=g.value,d=f,s.textContent=g.label,H(d),x(),d!=null&&d.classList.add("selected"),typeof n=="function"&&n(p)}return e.forEach(g=>{const f=document.createElement("li");f.className="menu-item",f.textContent=g.label,f.addEventListener("click",()=>U(g,f)),a.appendChild(f)}),s.addEventListener("click",v),i.appendChild(a),l.appendChild(s),l.appendChild(i),{selectEl:l,referenceEl:s,floatingEl:i,setOnOpen:g=>{c=g}}}function we(){const e=document.createElement("style");return e.textContent=`
    * {
      box-sizing: border-box;
    }
    .select {
      display: inline-block;
      width: 140px;
    }
    .select-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 8px 12px;
      cursor: pointer;
      user-select: none;
      border-radius: 4px;
      background-color: lightsteelblue;
    }
    .dropdown-menu {
      overflow: auto;
      display: none;
      pointer-events: none;
      position: absolute;
      min-width: max-content; // placement: right일 때 너비 줄어드는 문제 방지 or size 미들웨어 사용 가능
      padding: 2px 0;
      border-radius: 4px;
      background-color: lightblue;
      z-index: 10;
      transition: opacity 300ms ease;
    }
    .dropdown-menu.open {
      display: block;
      pointer-events: auto;
    }
    .dropdown-menu::-webkit-scrollbar {
      width: 9px;
      background-color: lightblue;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .dropdown-menu::-webkit-scrollbar-thumb {
      border: 3px solid lightblue;
      background-clip: padding-box;
      border-radius: 999px;
      background-color: white;
    }
    ul.menu-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li.menu-item {
      padding: 8px 12px;
      border-radius: 8px;
      border-width: 2px 4px;
      border-style: solid;
      border-color: lightblue;
      cursor: pointer;
    }
    li.menu-item.selected {
      background-color: white;
    }
    li.menu-item:hover {
      background-color: lightcyan;
    }
  `,e}const k=(e={select:{}})=>{const{select:{options:t,placeholder:n,onSelect:o,maxVisibleItems:r}={},placement:l,strategy:s,boundary:i,rootBoundary:a,padding:u,behaviors:c,onAfterComputePosition:p}=e,{selectEl:d,referenceEl:h,floatingEl:v,setOnOpen:x}=xe({options:t,placeholder:n,onSelect:o,maxVisibleItems:r});return requestAnimationFrame(()=>{const A=document.querySelector(".wrapper"),S=i==="Rect"?de.getElementScrollContentRect(A):i;x(()=>be(h,v,{placement:l,strategy:s,boundary:S,rootBoundary:a,padding:u,behaviors:c,onAfterComputePosition:p}))}),d},ve=async(e=!0)=>{try{return e?await fetch("https://run.mocky.io/v3/75d3bb6e-c577-41ac-97f1-3fe72b1210e2").then(n=>n.json())||[]:[{value:"red",label:"빨간색"},{value:"blue",label:"파란색"},{value:"green",label:"초록색"},{value:"yellow",label:"노란색"},{value:"purple",label:"보라색"},{value:"orange",label:"주황색"},{value:"pink",label:"분홍색"},{value:"brown",label:"갈색"},{value:"gray",label:"회색"},{value:"black",label:"검은색"},{value:"white",label:"흰색"}]}catch(t){throw console.error("[getColorList]",{err:t}),t}},Ee={title:"components/select",render:k,loaders:[async()=>({colorList:await ve()})],args:{placement:"bottom",boundary:"clippingAncestors",rootBoundary:"viewport",padding:0,behaviors:[{name:"offset",options:{mainAxis:10,alignmentAxis:50}}],onAfterComputePosition:null},argTypes:{placement:{description:"floatingEl을 referenceEl을 기준으로 어느 쪽에 배치하고 정렬시킬 것인가",control:"select",options:["bottom","bottoms-start","bottom-end","top","top-start","top-end","left","left-start","left-end","right","right-start","right-end"]},strategy:{table:{disable:!0}},boundary:{description:"(개발자가 설정할) floatingEl이 넘치는지 판단할 기준이 되는 경계 (여길 넘으면 안돼!)",control:"inline-radio",options:["clippingAncestors","Rect"]},rootBoundary:{description:"(boundary와 별도로) floatingEl이 무조건 넘칠 수밖에 없는 시스템적 경계 (여기 넘으면 안 보여!)",control:"inline-radio",options:["viewport","document"]},padding:{description:"floatingEl이 넘치는지 판단하는 경계(교집합 영역)의 padding",control:"inline-radio",options:[0,10,30,50,100]},behaviors:{description:"floatingEl이 넘칠 경우 취할 동작들 정의 (순서 중요, 동작별 상세 옵션은 문서 참고)",control:"object"},onAfterComputePosition:{description:"위치 계산 직후 실행될 사용자 정의 로직 (ex. 스타일 업데이트)",control:"object"},select:{table:{disable:!0}}}},J=(e="absolute")=>({select:{options:[],placeholder:"선택하시오.",maxVisibleItems:8},placement:"right-start",strategy:e,onAfterComputePosition:({elements:t,position:n})=>{requestAnimationFrame(()=>{Object.assign(t.floating.style,{position:e,left:`${n.x}px`,top:`${n.y}px`})})}}),T={args:J("absolute"),render:(e,{loaded:t})=>k({...e,select:{...e.select,options:t.colorList}})},R={args:J("fixed"),render:(e,{loaded:t})=>k({...e,select:{...e.select,options:t.colorList}})};var B,I,P;T.parameters={...T.parameters,docs:{...(B=T.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: getDefaultArgsWithStrategy("absolute"),
  render: (args, {
    loaded
  }) => {
    return Template({
      ...args,
      select: {
        ...args.select,
        options: loaded.colorList
      }
    });
  }
}`,...(P=(I=T.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var W,j,D;R.parameters={...R.parameters,docs:{...(W=R.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: getDefaultArgsWithStrategy("fixed"),
  render: (args, {
    loaded
  }) => {
    return Template({
      ...args,
      select: {
        ...args.select,
        options: loaded.colorList
      }
    });
  }
}`,...(D=(j=R.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};const Ae=["Absolute","Fixed"];export{T as Absolute,R as Fixed,Ae as __namedExportsOrder,Ee as default};
