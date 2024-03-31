import{_ as w}from"./AuthenticatedLayout-dfbae5eb.js";import{T as v,o as d,f as c,a as s,u as o,w as a,F as h,Z as x,b as e,O as k,r as b,d as g,t as n,g as C,i as _}from"./app-efe6f0e5.js";import{_ as y}from"./Block-1b01389e.js";import{_ as V}from"./PrimaryButton-37729bfe.js";import{_ as A}from"./Pagination-59a13ef4.js";import{_ as L}from"./FieldSelect-7a840c38.js";import{c as $}from"./index-f1c98739.js";const B={class:"flex flex-row-reverse space-x-2 space-x-reverse"},M=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-5 h-5"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 4.5v15m7.5-7.5h-15"})],-1),Z=e("span",null,[g("Add "),e("span",{class:"hidden md:inline"},"Short URL")],-1),N={class:"overflow-x-auto"},j={class:"table"},D=e("thead",null,[e("tr",null,[e("th",null,"URL"),e("th",{class:"hidden md:table-cell"},"Clicks"),e("th",{class:"hidden md:table-cell"},"Created"),e("th",null,"Actions")])],-1),R=["onClick"],S={key:0,class:"badge badge-outline badge-error badge-sm float-right"},T={class:"text-xs text-base-content/60 max-w-40 md:max-w-96 truncate"},q={class:"md:hidden text-xs text-base-content/60"},F={class:"hidden md:table-cell"},H={class:"hidden md:table-cell"},I={class:"flex flex-col space-y-2 md:flex-row-reverse md:space-y-0 md:space-x-2 md:space-x-reverse"},O=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-4 h-4"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})],-1),z=e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-4 h-4"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"})],-1),U={__name:"Index",props:["shortUrls","domains","filters"],setup(i){var u;const m=v({filters:{domain_id:((u=i.filters)==null?void 0:u.domain_id)||""}}),f=()=>{m.get(route("short-url.index"))},p=l=>{$(l)};return(l,r)=>(d(),c(h,null,[s(o(x),{title:"Short URLs"}),s(w,null,{default:a(()=>[s(y,null,{default:a(()=>[e("div",B,[s(V,{class:"btn-sm",onClick:r[0]||(r[0]=t=>o(k).visit(l.route("short-url.create")))},{default:a(()=>[M,Z]),_:1}),s(L,{modelValue:o(m).filters.domain_id,"onUpdate:modelValue":r[1]||(r[1]=t=>o(m).filters.domain_id=t),allLabel:"Any Domain",size:"sm",allowAny:!0,options:i.domains,onChange:f},null,8,["modelValue","options"])]),e("div",N,[e("table",j,[D,e("tbody",null,[(d(!0),c(h,null,b(i.shortUrls.data,t=>(d(),c("tr",{key:t.id},[e("td",null,[e("div",{class:"max-w-48 text-left md:max-w-full link tooltip","data-tip":"Copy to clipboard",onClick:G=>p(t.short_url)},n(t.short_url),9,R),t.is_active?C("",!0):(d(),c("span",S," Inactive ")),e("div",T,n(t.url),1),e("div",q,"Clicks: "+n(t.clicks),1)]),e("td",F,n(t.clicks),1),e("td",H,n(t.created_at),1),e("td",I,[s(o(_),{class:"btn btn-square btn-neutral btn-sm",href:l.route("short-url.edit",t.id)},{default:a(()=>[O]),_:2},1032,["href"]),s(o(_),{class:"btn btn-square btn-neutral btn-sm",href:l.route("short-url.show",t.id)},{default:a(()=>[z]),_:2},1032,["href"])])]))),128))])])]),s(A,{links:i.shortUrls.meta.links},null,8,["links"])]),_:1})]),_:1})],64))}};export{U as default};