import{T as p,j as f,o as d,f as _,a,u as t,w as s,F as b,Z as v,b as n,d as m,t as x,c as $,g as V,e as g}from"./app-125c148e.js";import{_ as k}from"./AuthenticatedLayout-4508e713.js";import{_ as y}from"./Block-c5c12da7.js";import{_ as w}from"./FieldInput-23947682.js";import{_ as B}from"./PrimaryButton-9a3a43cf.js";import{_ as C}from"./NeutralButton-3bd5258f.js";const D={class:"flex flex-row-reverse space-x-2 space-x-reverse"},j={__name:"Edit",props:["domain"],setup(l){const e=p({id:null,url:"",...l.domain}),r=f(()=>e.id?"Update":"Create"),u=()=>{e.id?e.put(route("domain.update",e.id)):e.post(route("domain.store"))};return(c,o)=>(d(),_(b,null,[a(t(v),{title:`${r.value} Domain`},null,8,["title"]),a(k,null,{default:s(()=>[a(y,{title:`${r.value} Domains`},{default:s(()=>[n("form",{class:"flex flex-col space-y-4",onSubmit:g(u,["prevent"])},[a(w,{label:"URL",placeholder:"https://your-domain.com",disabled:t(e).processing,modelValue:t(e).url,"onUpdate:modelValue":o[0]||(o[0]=i=>t(e).url=i),required:!0,error:t(e).errors.url},null,8,["disabled","modelValue","error"]),n("div",D,[a(B,{submit:!0,disabled:t(e).processing},{default:s(()=>[m(x(r.value),1)]),_:1},8,["disabled"]),t(e).id?(d(),$(C,{key:0,disabled:l.domain.short_urls_count||t(e).processing,onClick:o[1]||(o[1]=i=>t(e).delete(c.route("domain.destroy",t(e).id)))},{default:s(()=>[m(" Delete ")]),_:1},8,["disabled"])):V("",!0)])],32)]),_:1},8,["title"])]),_:1})],64))}};export{j as default};