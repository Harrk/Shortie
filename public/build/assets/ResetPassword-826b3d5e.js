import{T as p,o as u,c as f,w as d,a,u as r,Z as w,b as l,d as _,e as c}from"./app-4f070762.js";import{_ as V}from"./GuestLayout-d9e08685.js";import{_ as b}from"./PrimaryButton-6c6b3851.js";import{_ as t}from"./FieldInput-3735db8c.js";import"./_plugin-vue_export-helper-c27b6911.js";const y={class:"flex items-center justify-end mt-4"},N={__name:"ResetPassword",props:{email:{type:String,required:!0},token:{type:String,required:!0}},setup(m){const i=m,e=p({token:i.token,email:i.email,password:"",password_confirmation:""}),n=()=>{e.post(route("password.store"),{onFinish:()=>e.reset("password","password_confirmation")})};return(k,o)=>(u(),f(V,null,{default:d(()=>[a(r(w),{title:"Reset Password"}),l("form",{onSubmit:c(n,["prevent"])},[a(t,{id:"email",type:"email",required:!0,error:r(e).errors.email,label:"Email",modelValue:r(e).email,"onUpdate:modelValue":o[0]||(o[0]=s=>r(e).email=s)},null,8,["error","modelValue"]),a(t,{id:"password",type:"password",required:!0,error:r(e).errors.password,label:"Password",modelValue:r(e).password,"onUpdate:modelValue":o[1]||(o[1]=s=>r(e).password=s)},null,8,["error","modelValue"]),a(t,{id:"password_confirmation",type:"password",required:!0,error:r(e).errors.password_confirmation,label:"Confirm Password",modelValue:r(e).password_confirmation,"onUpdate:modelValue":o[2]||(o[2]=s=>r(e).password_confirmation=s)},null,8,["error","modelValue"]),l("div",y,[a(b,{disabled:r(e).processing,submit:!0},{default:d(()=>[_(" Reset Password ")]),_:1},8,["disabled"])])],32)]),_:1}))}};export{N as default};