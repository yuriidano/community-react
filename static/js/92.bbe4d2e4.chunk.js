"use strict";(self.webpackChunkreact_1=self.webpackChunkreact_1||[]).push([[92],{5083:(e,s,a)=>{a.r(s),a.d(s,{default:()=>w});const t={chat:"Chat_chat__RURbJ",messages:"Chat_messages__AFQob"};var r=a(1134),c=a(2791);const o={form:"ChatForm_form__5XF+Y",formBody:"ChatForm_formBody__9As5v",messageArea:"ChatForm_messageArea__CerHm",button:"ChatForm_button__O8-cB",buttonDisabled:"ChatForm_buttonDisabled__SKi20",icon:"ChatForm_icon__XzG4I"};var l=a(1418),m=a.n(l),_=a(148),n=a(3085),i=a(6143),d=a(184);const h=()=>{const e=(0,n.TL)(),s=(0,n.CG)((e=>e.chat.status)),[a,t]=(0,c.useState)(!0),{register:l,handleSubmit:h,reset:u,formState:{errors:g}}=(0,r.cI)();return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("form",{onSubmit:h((s=>{const{message:a}=s;e((0,i.bG)(a)),u({message:""}),t(!0)})),className:o.form,children:[(0,d.jsx)("div",{className:o.formBody,children:(0,d.jsx)("textarea",{onInput:e=>{let s=e.currentTarget;""!==s.value?t(!1):t(!0),s.style.height="auto",s.style.height=s.scrollHeight+"px"},...l("message",{required:"field is required"}),className:m()(o.messageArea,{[o.error]:g.message}),placeholder:"Message"})}),(0,d.jsx)("button",{disabled:"ready"!==s||a,className:m()(o.button,{[o.buttonDisabled]:a}),children:(0,d.jsx)(_.Z,{className:m()(o.icon)})})]})})},u="Messahes_messages__wt3F-",g="Messahes_bottomBody__mO8TD",x="Messahes_bottomBodyHiden__SujgE",j="Messahes_arrowBottom__tUfpw";var b=a(7976);const v="Message_message__6jXwy",f="Message_messageOvner__-c7eq",N="Message_avatar__YZOh4",C="Message_body__aVEQH",M="Message_bodyOvner__cQtaq",p="Message_name__OP0Zh",y="Message_nameOvner__0IgH2",F="Message_messageText__wSul4",S=c.memo((e=>{let{message:s,photo:a,userName:t,userId:r}=e,c=(0,n.CG)((e=>e.auth.userId));return(0,d.jsxs)("div",{className:m()(v,{[f]:c===r}),children:[(0,d.jsx)("div",{className:N,children:(0,d.jsx)("img",{src:a,alt:"avatar"})}),(0,d.jsxs)("div",{className:m()(C,{[M]:c===r}),children:[(0,d.jsx)("div",{className:m()(p,{[y]:c===r}),children:t}),(0,d.jsx)("div",{className:F,children:s})]})]})})),H=()=>{const e=(0,n.TL)(),s=(0,n.CG)((e=>e.chat.messages)),a=(0,c.useRef)(null),[t,r]=(0,c.useState)(!0);return(0,c.useEffect)((()=>(e((0,i.pm)()),()=>{e((0,i.NG)())})),[]),(0,c.useEffect)((()=>{a.current&&t&&(a.current.scrollTop=a.current.scrollHeight)}),[s,t]),(0,d.jsxs)("div",{className:u,ref:a,onScroll:e=>{const s=e.currentTarget;Math.abs(s.scrollHeight-s.scrollTop-s.clientHeight)<30?!t&&r(!0):t&&r(!1)},children:[(0,d.jsx)("div",{onClick:()=>{r(!0)},className:m()(g,{[x]:t}),children:(0,d.jsx)(b.Z,{className:j})}),s.map((e=>(0,d.jsx)(S,{...e},e.id)))]})},T=()=>(0,d.jsxs)("div",{className:t.chat,children:[(0,d.jsx)("div",{className:t.messages,children:(0,d.jsx)("div",{children:(0,d.jsx)(H,{})})}),(0,d.jsx)("div",{className:t.chatForm,children:(0,d.jsx)(h,{})})]}),w=()=>(0,d.jsx)(T,{})}}]);
//# sourceMappingURL=92.bbe4d2e4.chunk.js.map