(()=>{var e={};e.id=270,e.ids=[270],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},2412:e=>{"use strict";e.exports=require("assert")},4735:e=>{"use strict";e.exports=require("events")},9021:e=>{"use strict";e.exports=require("fs")},1630:e=>{"use strict";e.exports=require("http")},5591:e=>{"use strict";e.exports=require("https")},1820:e=>{"use strict";e.exports=require("os")},3873:e=>{"use strict";e.exports=require("path")},7910:e=>{"use strict";e.exports=require("stream")},3997:e=>{"use strict";e.exports=require("tty")},9551:e=>{"use strict";e.exports=require("url")},8354:e=>{"use strict";e.exports=require("util")},4075:e=>{"use strict";e.exports=require("zlib")},6342:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var a=r(260),s=r(8203),i=r(5155),n=r.n(i),l=r(7292),o={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);r.d(t,o);let d=["",{children:["admin",{children:["packages",{children:["addPackage",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,7905)),"E:\\PROJECTS\\Travel-Agency-Booking-System\\frontend\\src\\app\\admin\\packages\\addPackage\\page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1354)),"E:\\PROJECTS\\Travel-Agency-Booking-System\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["E:\\PROJECTS\\Travel-Agency-Booking-System\\frontend\\src\\app\\admin\\packages\\addPackage\\page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/admin/packages/addPackage/page",pathname:"/admin/packages/addPackage",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},7498:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3219,23)),Promise.resolve().then(r.t.bind(r,4863,23)),Promise.resolve().then(r.t.bind(r,5155,23)),Promise.resolve().then(r.t.bind(r,802,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,8530,23)),Promise.resolve().then(r.t.bind(r,8921,23))},7250:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6959,23)),Promise.resolve().then(r.t.bind(r,3875,23)),Promise.resolve().then(r.t.bind(r,8903,23)),Promise.resolve().then(r.t.bind(r,7174,23)),Promise.resolve().then(r.t.bind(r,4178,23)),Promise.resolve().then(r.t.bind(r,7190,23)),Promise.resolve().then(r.t.bind(r,1365,23))},8436:()=>{},5236:()=>{},3896:(e,t,r)=>{Promise.resolve().then(r.bind(r,7905))},8744:(e,t,r)=>{Promise.resolve().then(r.bind(r,4749))},9334:(e,t,r)=>{"use strict";var a=r(8686);r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})},4749:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var a=r(5512),s=r(8009),i=r(9334),n=r(8429);let l=()=>{let e=(0,i.useRouter)(),[t,r]=(0,s.useState)({title:"",description:"",price:"",availableDates:[],image:null}),[l,o]=(0,s.useState)(""),[d,c]=(0,s.useState)(!1),[u,p]=(0,s.useState)(null),m=e=>{let{name:a,value:s,type:i}=e.target;if("file"===i){let a=e.target.files?.[0]||null;if(a){let e=new FileReader;e.readAsDataURL(a),e.onload=()=>{let a=e.result;p(a),r({...t,image:a})}}}else r({...t,[a]:s})},h=async r=>{if(r.preventDefault(),console.log(t.availableDates),0===t.availableDates.length){alert("Please provide at least one valid date.");return}let a=new FormData;a.append("title",t.title),a.append("description",t.description),a.append("price",t.price),a.append("availableDates",JSON.stringify(t.availableDates)),t.image&&a.append("image",t.image);let s=localStorage.getItem("authHeader");if(!s){alert("Authorization header is missing.");return}try{c(!0),await n.S.post("/admin/packages",a,{headers:{Authorization:`Bearer ${s}`}}),e.push("/admin")}catch(e){console.error("Error adding package:",e),alert("There was an error adding the package.")}finally{c(!1)}};return(0,a.jsxs)("div",{className:"p-8 max-w-4xl mx-auto",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-6",children:"Add New Package"}),(0,a.jsxs)("form",{onSubmit:h,className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block mb-1 font-semibold",children:"Title"}),(0,a.jsx)("input",{type:"text",name:"title",value:t.title,onChange:m,required:!0,className:"w-full p-2 border rounded"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block mb-1 font-semibold",children:"Description"}),(0,a.jsx)("textarea",{name:"description",value:t.description,onChange:m,required:!0,className:"w-full p-2 border rounded"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block mb-1 font-semibold",children:"Price"}),(0,a.jsx)("input",{type:"number",name:"price",value:t.price,onChange:m,required:!0,className:"w-full p-2 border rounded"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block mb-1 font-semibold",children:"Available Dates"}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("input",{type:"date",value:l,onChange:e=>o(e.target.value),className:"p-2 border rounded"}),(0,a.jsx)("button",{type:"button",onClick:()=>{l&&(r({...t,availableDates:[...t.availableDates,l]}),o(""))},className:"px-3 py-1 bg-blue-600 text-white rounded",children:"Add Date"})]}),(0,a.jsx)("ul",{className:"mt-2",children:t.availableDates.map((e,s)=>(0,a.jsxs)("li",{className:"flex items-center justify-between",children:[e,(0,a.jsx)("button",{type:"button",onClick:()=>{let e=t.availableDates.filter((e,t)=>t!==s);r({...t,availableDates:e})},className:"text-red-500 hover:underline",children:"Remove"})]},s))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block mb-1 font-semibold",children:"Image"}),(0,a.jsx)("input",{type:"file",name:"image",accept:"image/*",onChange:m,required:!0,className:"p-2 border rounded"}),u&&(0,a.jsxs)("div",{className:"mt-4",children:[(0,a.jsx)("h3",{className:"font-semibold",children:"Image Preview:"}),(0,a.jsx)("img",{src:u,alt:"Image preview",className:"w-32 h-32 object-cover mt-2"})]})]}),(0,a.jsx)("button",{type:"submit",disabled:d,className:"w-full py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 disabled:bg-gray-400",children:d?"Submitting...":"Submit"})]})]})}},8429:(e,t,r)=>{"use strict";r.d(t,{S:()=>a});let a=r(5668).A.create({baseURL:"development"===process.env.MODE?"http://localhost:5003":"/",headers:{"Content-Type":"application/json"},withCredentials:!0});a.interceptors.request.use(e=>{let t=localStorage.getItem("authHeader");return t&&e.url&&e.url.startsWith("/admin")&&(e.headers.Authorization=t),e})},7905:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let a=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"E:\\\\PROJECTS\\\\Travel-Agency-Booking-System\\\\frontend\\\\src\\\\app\\\\admin\\\\packages\\\\addPackage\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"E:\\PROJECTS\\Travel-Agency-Booking-System\\frontend\\src\\app\\admin\\packages\\addPackage\\page.tsx","default")},1354:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c,metadata:()=>d});var a=r(2740),s=r(2376),i=r.n(s),n=r(8726),l=r.n(n);r(1135);var o=r(6301);let d={title:"Create Next App",description:"Generated by create next app"};function c({children:e}){return(0,a.jsx)("html",{lang:"en",children:(0,a.jsx)("body",{className:`${i().variable} ${l().variable} antialiased`,children:(0,a.jsx)(o.Suspense,{fallback:(0,a.jsx)("div",{children:"Loading"}),children:e})})})}},440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(8077);let s=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},1135:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,779,160],()=>r(6342));module.exports=a})();