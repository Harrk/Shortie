import{T as u,o as p,c as f,w as l,a,u as r,Z as _,b as i,i as w,d,e as c}from"./app-125c148e.js";import{_ as V}from"./GuestLayout-972b99cd.js";import{_ as b}from"./Block-c5c12da7.js";import{_ as t}from"./FieldInput-23947682.js";import{_ as x}from"./PrimaryButton-9a3a43cf.js";import"./_plugin-vue_export-helper-c27b6911.js";const y={class:"flex items-center justify-end space-x-4 mt-4"},R={__name:"Register",setup(g){const e=u({name:"",email:"",password:"",password_confirmation:""}),m=()=>{e.post(route("register"),{onFinish:()=>e.reset("password","password_confirmation")})};return(n,o)=>(p(),f(V,null,{default:l(()=>[a(r(_),{title:"Register"}),a(b,null,{default:l(()=>[i("form",{class:"flex flex-col space-y-4",onSubmit:c(m,["prevent"])},[a(t,{id:"name",type:"name",required:!0,error:r(e).errors.name,label:"Name",modelValue:r(e).name,"onUpdate:modelValue":o[0]||(o[0]=s=>r(e).name=s)},null,8,["error","modelValue"]),a(t,{id:"email",type:"email",required:!0,error:r(e).errors.email,label:"Email",modelValue:r(e).email,"onUpdate:modelValue":o[1]||(o[1]=s=>r(e).email=s)},null,8,["error","modelValue"]),a(t,{id:"password",type:"password",required:!0,error:r(e).errors.password,label:"Password",modelValue:r(e).password,"onUpdate:modelValue":o[2]||(o[2]=s=>r(e).password=s)},null,8,["error","modelValue"]),a(t,{id:"password_confirmation",type:"password",required:!0,error:r(e).errors.password_confirmation,label:"Confirm Password",modelValue:r(e).password_confirmation,"onUpdate:modelValue":o[3]||(o[3]=s=>r(e).password_confirmation=s)},null,8,["error","modelValue"]),i("div",y,[a(r(w),{href:n.route("login"),class:"link-primary text-sm"},{default:l(()=>[d(" Already registered? ")]),_:1},8,["href"]),a(x,{disabled:r(e).processing,submit:!0},{default:l(()=>[d(" Register ")]),_:1},8,["disabled"])])],32)]),_:1})]),_:1}))}};export{R as default};
