"use strict";(self.webpackChunkreact_1=self.webpackChunkreact_1||[]).push([[349],{6349:(s,e,t)=>{t.r(e),t.d(e,{default:()=>ss});var a=t(4420),o=t(2791);const i="MyPosts_myPosts__ipCvj",r="MyPosts_newPost__RsHX5",l="MyPosts_posts__1iPHK",n="MyPosts_body__-MSdV",c="MyPosts_userPost__iubri",d="MyPosts_input__3wZFs",u="MyPosts_button__tROL6";t(2026);const _="Post_post__2JC9L",f="Post_avatar__NyR4X",m="Post_body__QBbNz",p="Post_text__i9zxY",h="Post_likeBody__glNnR",j="Post_like__Z5l62",x="Post_likeIcon__oayR+";var P=t(184);const v=s=>s.profileMy?(0,P.jsxs)("div",{className:_,children:[(0,P.jsx)("div",{className:f,children:(0,P.jsx)("img",{src:s.profileMy.photos.large,alt:""})}),(0,P.jsxs)("div",{className:m,children:[(0,P.jsx)("div",{className:p,children:s.message}),(0,P.jsxs)("div",{className:h,children:[(0,P.jsx)("div",{className:x}),(0,P.jsx)("button",{className:j,children:s.likeCounter})]})]})]}):null;var N=t(704),b=t(5304),g=t(8186);const y=t.p+"static/media/plus.51d1f7489a93626178e7c342bb4e1221.svg";const k=t.p+"static/media/userPost.208ec46e8e9313ceb7fb416af7feb965.svg";let I=(0,b.B)(200);const S=(0,N.Z)({form:"myPost"})((s=>(0,P.jsx)("form",{onSubmit:s.handleSubmit,children:(0,P.jsxs)("label",{for:"post",className:n,children:[(0,P.jsx)("div",{className:d,children:(0,g.Gr)(null,g.II,"myPosBody","What's on your mind?",[b.C,I],null,"post")}),(0,P.jsx)("button",{className:u,children:(0,P.jsx)("img",{src:y,alt:"icon"})}),(0,P.jsx)("div",{className:c,children:(0,P.jsx)("img",{src:k,alt:"icon"})})]})}))),F=s=>{let e=[...s.posts].reverse().map((e=>(0,P.jsx)(v,{profileMy:s.profileMy,message:e.message,likeCounter:e.likeCounter},e.id)));return(0,P.jsxs)("div",{className:i,children:[(0,P.jsx)("div",{className:r,children:(0,P.jsx)(S,{onSubmit:e=>{s.addPostCriator(e.myPosBody)}})}),(0,P.jsx)("div",{className:l,children:e})]})},U="Profile_profile__5Wt+s",M={profileInfo:"ProfileInfo_profileInfo__eYDtd",images:"ProfileInfo_images__7mz7y",fon:"ProfileInfo_fon__eMPru",avararBody:"ProfileInfo_avararBody__3dkHX",avatar:"ProfileInfo_avatar__KU7H-",changeAvatar:"ProfileInfo_changeAvatar__5691p",input:"ProfileInfo_input__SfwTM",body:"ProfileInfo_body__UihLj",top:"ProfileInfo_top__eQtPu",info:"ProfileInfo_info__ByPhh",name:"ProfileInfo_name__pcQIG",status:"ProfileInfo_status__J5VjU",button:"ProfileInfo_button__4WcsJ",statusSpan:"ProfileInfo_statusSpan__YWiab",LookingForAJob:"ProfileInfo_LookingForAJob__IKXQL",skilsBody:"ProfileInfo_skilsBody__Aq2eF",skils:"ProfileInfo_skils__yDuDh",contacts:"ProfileInfo_contacts__Ovk1g",contact:"ProfileInfo_contact__rQV39"};const A=s=>{let[e,t]=(0,o.useState)(!1),[a,i]=(0,o.useState)(s.status);(0,o.useEffect)((()=>{i(s.status)}),[s.status]);return(0,P.jsxs)("div",{className:M.status,children:[!e&&(0,P.jsx)("div",{children:(0,P.jsx)("span",{className:M.statusSpan,onClick:()=>{t(!0)},children:s.status||"------"})}),e&&(0,P.jsx)("div",{children:(0,P.jsx)("input",{className:M.statusInput,onChange:s=>{i(s.currentTarget.value)},autoFocus:!0,onBlur:()=>{t(!1),s.updateUserStatus(a)},type:"text",value:a})})]})};var D=t(8478);const C={top:"ProfileDataForm_top__Gdqly",info:"ProfileDataForm_info__NXbIT",name:"ProfileDataForm_name__WiuA5",editName:"ProfileDataForm_editName__dB3UO",status:"ProfileDataForm_status__9SWje",button:"ProfileDataForm_button__n7v2I",lookingForAJob:"ProfileDataForm_lookingForAJob__T8k62",skils:"ProfileDataForm_skils__WVGPq",editSkils:"ProfileDataForm_editSkils__3fKwZ",contacts:"ProfileDataForm_contacts__M++Dd",title:"ProfileDataForm_title__ja1OU",elements:"ProfileDataForm_elements__Y0gah",contactBody:"ProfileDataForm_contactBody__z6QLt",contact:"ProfileDataForm_contact__QGH4q",editContact:"ProfileDataForm_editContact__dGGhn",elementForm:"ProfileDataForm_elementForm__2avd-"},J=s=>{let{contactsKey:e}=s;return(0,P.jsx)("div",{className:C.contactBody,children:(0,P.jsx)("div",{className:C.editContact,children:(0,g.Gr)(null,g.II,"contacts."+e,"".concat(e,"..."),[],null)})})},B=(0,N.Z)({form:"profile"})((s=>{let{profile:e,status:t,updateUserStatus:a,handleSubmit:o,error:i}=s;return(0,P.jsx)("div",{className:C.profileDataForm,children:(0,P.jsxs)("form",{onSubmit:o,children:[(0,P.jsxs)("div",{className:C.top,children:[(0,P.jsxs)("div",{className:C.info,children:[(0,P.jsxs)("div",{className:C.name,children:[(0,P.jsx)("span",{children:"full name: "}),(0,P.jsx)("div",{className:C.editName,children:(0,g.Gr)(null,g.II,"fullName","fullName...",[],null)})]}),(0,P.jsx)("div",{className:C.status,children:(0,P.jsx)(A,{status:t,updateUserStatus:a})})]}),(0,P.jsx)("button",{className:C.button,children:"Save"})]}),(0,P.jsxs)("div",{className:C.lookingForAJob,children:[(0,P.jsx)("span",{children:"LookingForAJob:"}),"  ",e.lookingForAJob?"yes":"no",(0,g.Gr)(null,g.II,"lookingForAJob",null,[],"checkbox")]}),e.lookingForAJob&&(0,P.jsxs)("div",{className:C.skils,children:[(0,P.jsx)("span",{children:"My profesional skils:"}),(0,P.jsx)("div",{className:C.editSkils,children:(0,g.Gr)(null,g.II,"lookingForAJobDescription","my profesional skils...",[],null)})]}),(0,P.jsxs)("div",{className:C.contacts,children:[(0,P.jsx)("span",{className:C.title,children:"Contacts: "}),(0,P.jsx)("div",{className:C.elements,children:Object.keys(e.contacts).map((s=>(0,P.jsx)(J,{contactsKey:s})))})]}),(0,P.jsx)("div",{children:i&&(0,P.jsx)("div",{className:C.errorSome,children:i})})]})})}));var q=t(2498);const O=t.p+"static/media/camera.d4cdb06d1b08f39ba17e89903e77ed61.svg",w=s=>{let{profile:e,status:t,updateUserStatus:a,isOwner:o,activateEditMode:i}=s;return(0,P.jsxs)("div",{children:[(0,P.jsxs)("div",{className:M.top,children:[(0,P.jsxs)("div",{className:M.info,children:[(0,P.jsx)("div",{className:M.name,children:e.fullName}),(0,P.jsx)("div",{className:M.status,children:(0,P.jsx)(A,{status:t,updateUserStatus:a})})]}),o&&(0,P.jsx)("button",{className:M.button,onClick:i,children:"Edit mode"})]}),(0,P.jsxs)("div",{className:M.LookingForAJob,children:[(0,P.jsx)("span",{children:"LookingForAJob:"}),"  ",e.lookingForAJob?"yes":"no"]}),(0,P.jsx)("div",{className:M.skils,children:e.lookingForAJob&&(0,P.jsxs)("div",{className:M.skilsBody,children:[(0,P.jsx)("span",{children:"My profesional skils:"}),(0,P.jsx)("span",{children:e.lookingForAJobDescription})]})}),(0,P.jsxs)("div",{className:M.contacts,children:[(0,P.jsx)("span",{children:"Contacts: "}),(0,P.jsx)("div",{className:M.contact,children:Object.keys(e.contacts).map((s=>(0,P.jsx)(L,{contactTitle:s,contactValue:e.contacts[s]},s)))})]})]})},G=s=>{let{profile:e,status:t,updateUserStatus:a,onSubmit:o}=s;return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)(B,{initialValues:e,onSubmit:o,profile:e,status:t,updateUserStatus:a,contacts:L})})},L=s=>{let{contactTitle:e,contactValue:t}=s;return(0,P.jsxs)("div",{children:[(0,P.jsx)("span",{children:e}),": ",t]})},z=s=>{let[e,t]=(0,o.useState)(!1);if(!s.profile)return null;return(0,P.jsxs)("div",{className:M.profileInfo,children:[(0,P.jsxs)("div",{className:M.images,children:[(0,P.jsx)("div",{className:M.fon,children:(0,P.jsx)("img",{src:q,alt:"fon"})}),(0,P.jsx)("div",{className:M.avatar,children:(0,P.jsx)("img",{src:null!=s.profile.photos.small?s.profile.photos.small:D,alt:"avatar"})}),(0,P.jsx)("label",{className:M.changeAvatar,for:"changeAvatar",children:(0,P.jsx)("img",{src:O,alt:"camera"})})]}),(0,P.jsxs)("div",{className:M.body,children:[s.isOwner&&(0,P.jsx)("input",{className:M.input,id:"changeAvatar",type:"file",onChange:e=>{e.target.files.length&&s.requestPhoto(e.target.files[0])}}),(0,P.jsx)("div",{className:M.statusBody,children:e?(0,P.jsx)(G,{onSubmit:e=>{s.updateProfile(e),s.isUpdateProgress&&t(!1)},profile:s.profile,status:s.status,updateUserStatus:s.updateUserStatus}):(0,P.jsx)(w,{isOwner:s.isOwner,profile:s.profile,status:s.status,updateUserStatus:s.updateUserStatus,activateEditMode:()=>{t(!0)}})})]})]})},Q=s=>(0,P.jsxs)("div",{className:U,children:[(0,P.jsx)(z,{status:s.status,updateUserStatus:s.updateUserStatus,profile:s.profile,isOwner:s.isOwner,requestPhoto:s.requestPhoto,updateProfile:s.updateProfile,isUpdateProgress:s.isUpdateProgress}),(0,P.jsx)(F,{posts:s.posts,addPostCriator:s.addPostCriator,profileMy:s.profileMy})]});var R=t(6070),V=t(7689),W=t(1154),E=t(2291);const K=s=>s.profilePage.status,T=s=>s.auth.userId,Z=s=>s.auth.isAuth,H=s=>s.profilePage.posts,X=s=>s.profilePage.profile,Y=s=>s.profilePage.isUpdateProgress,$=s=>s.infoPage.profileInfo;const ss=(0,W.qC)((0,a.$j)((s=>({status:K(s),autoRizedUserId:T(s),isAuth:Z(s),posts:H(s),profile:X(s),isUpdateProgress:Y(s),profileMy:$(s)})),{requestUserStatus:R.vz,updateUserStatus:R.OL,addPostCriator:R.SM,requestProfile:R.tg,requestPhoto:R.UE,updateProfile:R.ck,profileMount:R.o3}),E.Z)((s=>{let{userId:e}=(0,V.UO)(),t=e;return e||(e=s.autoRizedUserId),(0,o.useEffect)((()=>(s.requestProfile(e),s.requestUserStatus(e),s.profileMount(!0),()=>{s.profileMount(!1)})),[e]),(0,P.jsx)(Q,{...s,isOwner:!t,requestPhoto:s.requestPhoto,updateProfile:s.updateProfile})}))}}]);
//# sourceMappingURL=349.65174d75.chunk.js.map