import{T as n,o as d,f,a,u as e,w as l,F as p,Z as _,d as u,t as c,b as i,e as b}from"./app-efe6f0e5.js";import{_ as g}from"./AuthenticatedLayout-dfbae5eb.js";import{_ as m}from"./Block-1b01389e.js";import{_ as h}from"./FieldInput-7a17a4db.js";import{_ as V}from"./PrimaryButton-37729bfe.js";const B={__name:"Dashboard",setup($){const r=n({url:""});return(t,s)=>(d(),f(p,null,[a(e(_),{title:"Dashboard"}),a(g,null,{default:l(()=>[a(m,null,{default:l(()=>[u(" Hi, "+c(t.$page.props.auth.user.name)+". ",1)]),_:1}),a(m,{class:"md:w-1/2",title:"Quick Create Short URL"},{default:l(()=>[i("form",{onSubmit:s[1]||(s[1]=b(o=>e(r).post(t.route("short-url.store")),["prevent"])),class:"flex flex-col space-y-4 flex-1"},[a(h,{class:"mt-2",placeholder:"https://yourreallylongurl.com...",disabled:e(r).processing,modelValue:e(r).url,"onUpdate:modelValue":s[0]||(s[0]=o=>e(r).url=o),error:e(r).errors.url},null,8,["disabled","modelValue","error"]),i("div",null,[a(V,{disabled:e(r).processing,submit:!0},{default:l(()=>[u(" Create ")]),_:1},8,["disabled"])])],32)]),_:1})]),_:1})],64))}};export{B as default};
