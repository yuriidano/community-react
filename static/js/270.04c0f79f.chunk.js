"use strict";(self.webpackChunkreact_1=self.webpackChunkreact_1||[]).push([[270],{270:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var r=a(1134);const t={chat:"Chat_chat__RURbJ",messages:"Chat_messages__AFQob",message:"Chat_message__fVFtr",messageOvner:"Chat_messageOvner__25wPX",avatar:"Chat_avatar__eIe73",body:"Chat_body__p348B",bodyOvner:"Chat_bodyOvner__DYGND",name:"Chat_name__sWK9S",nameOvner:"Chat_nameOvner__w3bES",messageText:"Chat_messageText__1U4I1",s:"Chat_s__AM6UJ"};var n=a(1418),c=a.n(n),m=a(3085),l=a(2791),h=a(6143),d=a(184);const i=()=>(0,d.jsxs)("div",{className:t.chat,children:[(0,d.jsx)(o,{}),(0,d.jsx)(g,{})]}),o=()=>{const e=(0,m.TL)(),s=(0,m.CG)((e=>e.chat.messages)),a=(0,l.useRef)(null),[r,n]=(0,l.useState)(!0);return(0,l.useEffect)((()=>{e((0,h.pm)())}),[]),(0,l.useEffect)((()=>{a.current&&r&&(a.current.scrollTop=a.current.scrollHeight)}),[s]),(0,d.jsx)("div",{className:t.messages,ref:a,onScroll:e=>{const s=e.currentTarget;Math.abs(s.scrollHeight-s.scrollTop-s.clientHeight)<30?!r&&n(!0):r&&n(!1)},children:s.map((e=>(0,d.jsx)(_,{...e})))})},_=l.memo((e=>{let{message:s,photo:a,userName:r,userId:n}=e,l=(0,m.CG)((e=>e.auth.userId));return console.log(l),(0,d.jsxs)("div",{className:c()(t.message,{[t.messageOvner]:l===n}),children:[(0,d.jsx)("div",{className:t.avatar,children:(0,d.jsx)("img",{src:a,alt:"avatar"})}),(0,d.jsxs)("div",{className:c()(t.body,{[t.bodyOvner]:l===n}),children:[(0,d.jsx)("div",{className:c()(t.name,{[t.nameOvner]:l===n}),children:r}),(0,d.jsx)("div",{className:t.messageText,children:s})]})]})})),g=()=>{const e=(0,m.TL)(),{register:s,handleSubmit:a,reset:n,formState:{errors:l}}=(0,r.cI)();return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("form",{onSubmit:a((s=>{const{message:a}=s;e((0,h.bG)(a)),n({message:""})})),children:[(0,d.jsx)("div",{children:(0,d.jsx)("textarea",{...s("message",{required:"field is required"}),className:c()(t.messageArea,{[t.error]:l.message})})}),l.message&&(0,d.jsx)("span",{className:t.errorSpan,children:l.message.message}),(0,d.jsx)("button",{className:t.button,children:"find"})]})})},u=()=>(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(i,{})})}}]);
//# sourceMappingURL=270.04c0f79f.chunk.js.map