(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[407],{5243:(e,r,a)=>{Promise.resolve().then(a.bind(a,3602))},6046:(e,r,a)=>{"use strict";var l=a(6658);a.o(l,"useRouter")&&a.d(r,{useRouter:function(){return l.useRouter}}),a.o(l,"useSearchParams")&&a.d(r,{useSearchParams:function(){return l.useSearchParams}})},3602:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>u});var l=a(5155),s=a(6046),t=a(2115),n=a(6197),o=a(2651);let u=()=>{let[e,r]=(0,t.useState)(null),[a,u]=(0,t.useState)(!1),[i,c]=(0,t.useState)({name:"",email:"",phoneNumber:"",numberOfTravellers:1,specialRequest:""});(0,t.useEffect)(()=>{u(!0)},[]);let d=(0,s.useRouter)();(0,t.useEffect)(()=>{let e=new URLSearchParams(window.location.search).get("packageId");e&&r(e)},[]);let m=e=>{let{name:r,value:a}=e.target;c(e=>({...e,[r]:a}))},h=async r=>{r.preventDefault();try{let r=await n.S.post("/bookings",{...i,packageId:e});console.log("Booking successful:",r.data),d.push("/bookings/confirmations?bookingId=".concat(r.data._id))}catch(e){if(o.A.isAxiosError(e)){var a,l;console.log("Error response:",e.response),alert("Error: ".concat((null===(l=e.response)||void 0===l?void 0:null===(a=l.data)||void 0===a?void 0:a.message)||"An unknown error occurred"))}else console.log("Error:",e),alert("An unexpected error occurred")}};return a?(0,l.jsxs)("div",{className:"container mx-auto p-6",children:[(0,l.jsx)("h1",{className:"text-2xl font-bold",children:"Book Your Package"}),(0,l.jsxs)("form",{onSubmit:h,className:"space-y-4 mt-6",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"name",className:"block font-medium",children:"Name"}),(0,l.jsx)("input",{id:"name",name:"name",type:"text",value:i.name,onChange:m,className:"input input-bordered w-full",placeholder:"Your Name",required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"email",className:"block font-medium",children:"Email"}),(0,l.jsx)("input",{id:"email",name:"email",type:"email",value:i.email,onChange:m,className:"input input-bordered w-full",placeholder:"Your Email",required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"phoneNumber",className:"block font-medium",children:"Phone Number"}),(0,l.jsx)("input",{id:"phoneNumber",name:"phoneNumber",type:"text",value:i.phoneNumber,onChange:m,className:"input input-bordered w-full",placeholder:"Your Phone Number",required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"numberOfTravellers",children:"Number of Travellers"}),(0,l.jsx)("input",{type:"number",id:"numberOfTravellers",className:"input input-bordered w-full",name:"numberOfTravellers",value:i.numberOfTravellers,onChange:m,required:!0})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"specialRequest",className:"block font-medium",children:"Special Request"}),(0,l.jsx)("textarea",{id:"specialRequest",name:"specialRequest",value:i.specialRequest,onChange:m,className:"textarea textarea-bordered w-full",placeholder:"Any special requests?"})]}),(0,l.jsx)("button",{type:"submit",className:"bg-blue-600 text-white px-4 py-2 rounded",children:"Submit Booking"})]})]}):null}},6197:(e,r,a)=>{"use strict";a.d(r,{S:()=>t});var l=a(2651),s=a(2818);let t=l.A.create({baseURL:"development"===s.env.MODE?"http://localhost:5003":"/",headers:{"Content-Type":"application/json"},withCredentials:!0});t.interceptors.request.use(e=>{let r=localStorage.getItem("authHeader");return r&&e.url&&e.url.startsWith("/admin")&&(e.headers.Authorization=r),e})}},e=>{var r=r=>e(e.s=r);e.O(0,[651,441,517,358],()=>r(5243)),_N_E=e.O()}]);