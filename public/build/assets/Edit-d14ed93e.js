import{T as w,j as g,o as i,f as v,a as l,u as r,w as a,F as $,Z as U,b as p,c as f,g as c,d as b,t as x,e as y}from"./app-c4b2788f.js";import{_ as k}from"./AuthenticatedLayout-cde7fea9.js";import{_ as N}from"./Block-f9675468.js";import{_ as u}from"./FieldInput-652709de.js";import{_ as B}from"./PrimaryButton-7a4d2100.js";import{_ as C}from"./NeutralButton-abcc125f.js";import{_ as S}from"./FieldSelect-cc4bbcef.js";const A={class:"flex flex-row-reverse space-x-2 space-x-reverse"},O={__name:"Edit",props:["user","roles"],setup(t){const n=t,e=w({id:null,name:"",email:"",role:"User",password:"",...n.user}),d=g(()=>e.id?"Update":"Create"),V=()=>{e.id?e.put(route("user.update",e.id),{onSuccess:()=>e.reset("password")}):e.post(route("user.store"),{onSuccess:()=>{e.defaults({...n.user}),e.reset()}})},_=()=>{window.confirm("Are you sure?")&&e.delete(route("user.destroy",e.id))};return(m,s)=>(i(),v($,null,[l(r(U),{title:`${d.value} User`},null,8,["title"]),l(k,null,{default:a(()=>[l(N,{title:`${d.value} User`},{default:a(()=>[p("form",{class:"flex flex-col space-y-4",onSubmit:y(V,["prevent"])},[l(u,{label:"Name",disabled:r(e).processing,modelValue:r(e).name,"onUpdate:modelValue":s[0]||(s[0]=o=>r(e).name=o),required:!0,error:r(e).errors.name},null,8,["disabled","modelValue","error"]),l(u,{label:"Email",disabled:r(e).processing,modelValue:r(e).email,"onUpdate:modelValue":s[1]||(s[1]=o=>r(e).email=o),required:!0,error:r(e).errors.email},null,8,["disabled","modelValue","error"]),l(u,{label:"Password",disabled:r(e).processing,type:"password",modelValue:r(e).password,"onUpdate:modelValue":s[2]||(s[2]=o=>r(e).password=o),error:r(e).errors.password},null,8,["disabled","modelValue","error"]),Object.values(t.roles).length&&m.$page.props.auth.user.role==="Admin"?(i(),f(S,{key:0,modelValue:r(e).role,"onUpdate:modelValue":s[3]||(s[3]=o=>r(e).role=o),label:"Role",allowAny:!1,disabled:r(e).processing,error:r(e).errors.role,options:t.roles},null,8,["modelValue","disabled","error","options"])):c("",!0),p("div",A,[l(B,{submit:!0,disabled:r(e).processing},{default:a(()=>[b(x(d.value),1)]),_:1},8,["disabled"]),r(e).id&&r(e).id!==m.$page.props.auth.user.id?(i(),f(C,{key:0,disabled:r(e).processing,onClick:_},{default:a(()=>[b(" Delete ")]),_:1},8,["disabled"])):c("",!0)])],32)]),_:1},8,["title"])]),_:1})],64))}};export{O as default};