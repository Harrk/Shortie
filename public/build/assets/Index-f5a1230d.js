import{_ as p}from"./AuthenticatedLayout-2af3e997.js";import{T as w,o as d,f as c,a as t,u as l,w as r,F as f,Z as x,b as e,O as v,r as k,d as _,t as a,i as b}from"./app-599a4c0d.js";import{_ as g}from"./Block-5a1800c3.js";import{_ as y}from"./PrimaryButton-1a2dadb2.js";import{_ as A}from"./Pagination-896cfebd.js";import{_ as V}from"./FieldSelect-689f2f2e.js";const C={class:"flex flex-row-reverse space-x-2 space-x-reverse"},$=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-5 h-5"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 4.5v15m7.5-7.5h-15"})],-1),B=e("span",null,[_("Add "),e("span",{class:"hidden md:inline"},"User")],-1),L={class:"overflow-x-auto"},N={class:"table"},U=e("thead",null,[e("tr",null,[e("th",null,"Name"),e("th",null,"Role"),e("th",{class:"hidden md:table-cell"},"Created"),e("th",null,"Actions")])],-1),j={class:"text-sm text-base-content/60"},D={class:"hidden md:table-cell"},F={class:"flex flex-col space-y-2 md:flex-row-reverse md:space-y-0 md:space-x-2 md:space-x-reverse"},H=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-4 h-4"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})],-1),E={__name:"Index",props:["users","roles","filters"],setup(o){var m;const i=w({filters:{role:((m=o.filters)==null?void 0:m.role)||""}}),h=()=>{i.get(route("user.index"))};return(u,n)=>(d(),c(f,null,[t(l(x),{title:"Users"}),t(p,null,{default:r(()=>[t(g,null,{default:r(()=>[e("div",C,[t(y,{class:"btn-sm",onClick:n[0]||(n[0]=s=>l(v).visit(u.route("user.create")))},{default:r(()=>[$,B]),_:1}),t(V,{modelValue:l(i).filters.role,"onUpdate:modelValue":n[1]||(n[1]=s=>l(i).filters.role=s),allLabel:"Any Role",size:"sm",allowAny:!0,options:o.roles,onChange:h},null,8,["modelValue","options"])]),e("div",L,[e("table",N,[U,e("tbody",null,[(d(!0),c(f,null,k(o.users.data,s=>(d(),c("tr",{key:s.id},[e("td",null,[_(a(s.name)+" ",1),e("div",j,a(s.email),1)]),e("td",null,a(s.role),1),e("td",D,a(s.created_at),1),e("td",F,[t(l(b),{class:"btn btn-square btn-neutral btn-sm",href:u.route("user.edit",s.id)},{default:r(()=>[H]),_:2},1032,["href"])])]))),128))])])]),t(A,{links:o.users.meta.links},null,8,["links"])]),_:1})]),_:1})],64))}};export{E as default};
