import{T as _,o as s,f as o,a as n,u as v,w as d,F as r,Z as k,b as t,t as a,O as b,d as y,r as h,g as w}from"./app-4f070762.js";import{A as g}from"./AuthenticatedLayout-ccde64c5.js";import{_ as c}from"./Block-3a54e001.js";import M from"./ClicksOverTime-ecb541ac.js";import{N as C}from"./NeutralButton-30dc7c81.js";import{_ as T}from"./FieldSelect-f7f12be5.js";const O={class:"flex flex-row space-x-2"},B={class:"flex-1"},j={class:"font-semibold text-xl"},D={class:"text-sm text-base-content/60"},U={class:"flex space-x-2"},z={class:"stats stats-vertical md:stats-horizontal"},V={class:"stat"},H=t("div",{class:"stat-figure text-primary"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-10 h-10",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[t("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),t("path",{d:"M3 12l3 0"}),t("path",{d:"M12 3l0 3"}),t("path",{d:"M7.8 7.8l-2.2 -2.2"}),t("path",{d:"M16.2 7.8l2.2 -2.2"}),t("path",{d:"M7.8 16.2l-2.2 2.2"}),t("path",{d:"M12 12l9 3l-4 2l-2 4l-3 -9"})])],-1),N=t("div",{class:"stat-title"},"Total Clicks",-1),S={class:"stat-value text-primary"},q=t("div",{class:"stat-desc"},"Humans and bots.",-1),A={class:"stat"},L=t("div",{class:"stat-figure text-info"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-10 h-10",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[t("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),t("path",{d:"M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),t("path",{d:"M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"}),t("path",{d:"M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),t("path",{d:"M17 10h2a2 2 0 0 1 2 2v1"}),t("path",{d:"M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),t("path",{d:"M3 13v-1a2 2 0 0 1 2 -2h2"})])],-1),$=t("div",{class:"stat-title"},"Human Clicks",-1),E={class:"stat-value text-info"},F=t("div",{class:"stat-desc"},"Only humans.",-1),G={class:"stat"},P=t("div",{class:"stat-figure text-accent"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-10 w-10",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[t("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),t("path",{d:"M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"}),t("path",{d:"M12 2v2"}),t("path",{d:"M9 12v9"}),t("path",{d:"M15 12v9"}),t("path",{d:"M5 16l4 -2"}),t("path",{d:"M15 14l4 2"}),t("path",{d:"M9 18h6"}),t("path",{d:"M10 8v.01"}),t("path",{d:"M14 8v.01"})])],-1),R=t("div",{class:"stat-title"},"Bot Clicks",-1),Z={class:"stat-value text-accent"},I=t("div",{class:"stat-desc"},"Only bots.",-1),J={class:"stat"},K=t("div",{class:"stat-figure text-secondary"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-10 w-10",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},[t("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),t("path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"}),t("path",{d:"M6 21v-2a4 4 0 0 1 4 -4h.5"}),t("path",{d:"M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"})])],-1),Q=t("div",{class:"stat-title"},"Unique Clicks",-1),W={class:"stat-value text-secondary"},X=t("div",{class:"stat-desc"},"Unique humans.",-1),Y={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},tt={class:"flex flex-col space-y-1 mt-1"},et={class:"flex-1"},st={key:1},ot={class:"flex flex-col space-y-1 mt-1"},at={class:"flex-1"},lt={key:1},it={class:"flex flex-col space-y-1 mt-1"},nt={class:"flex-1"},dt={key:1},rt={class:"flex flex-col space-y-1 mt-1"},ct={class:"flex-1"},ht={key:1},ut={class:"flex flex-col space-y-1 mt-1"},vt={class:"flex-1"},pt={key:1},ft={class:"flex flex-col space-y-1 mt-1"},xt={class:"flex-1"},mt={key:1},Mt={__name:"Show",props:["shortUrl","periods","selectedPeriod","clicks","humanClicks","botClicks","uniqueClicks","clicksOverTime","days","topDevices","topDeviceTypes","topBrowsers","topOperatingSystems","topCountries","topCities","enableGeolocation"],setup(e){const f=e,p=_({period:f.selectedPeriod}),x=()=>{p.get(route("short-url.show",f.shortUrl.id))};return(m,u)=>(s(),o(r,null,[n(v(k),{title:"Analytics"}),n(g,null,{default:d(()=>[t("div",O,[t("div",B,[t("h1",j,"Analytics: "+a(e.shortUrl.short_url),1),t("p",D,a(e.shortUrl.url),1)])]),t("div",U,[n(T,{size:"sm",options:e.periods,onChange:x,modelValue:v(p).period,"onUpdate:modelValue":u[0]||(u[0]=i=>v(p).period=i),optionLabel:"key"},null,8,["options","modelValue"]),n(C,{class:"btn-sm",onClick:u[1]||(u[1]=i=>v(b).visit(m.route("short-url.edit",e.shortUrl.id)))},{default:d(()=>[y(" Edit Short URL ")]),_:1})]),t("div",z,[t("div",V,[H,N,t("div",S,a(e.clicks),1),q]),t("div",A,[L,$,t("div",E,a(e.humanClicks),1),F]),t("div",G,[P,R,t("div",Z,a(e.botClicks),1),I]),t("div",J,[K,Q,t("div",W,a(e.uniqueClicks),1),X])]),n(c,{class:"hidden md:block",title:"Clicks Over Time"},{default:d(()=>[n(M,{darkMode:!0,data:e.clicksOverTime,intervals:e.days},null,8,["data","intervals"])]),_:1}),t("div",Y,[n(c,{title:"Top Devices"},{default:d(()=>[t("div",tt,[Object.values(e.topDevices).length?(s(!0),o(r,{key:0},h(e.topDevices,(i,l)=>(s(),o("div",{key:l,class:"text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"},[t("span",et,a(l),1),t("span",null,a(i),1)]))),128)):(s(),o("p",st,"There is no data for this period."))])]),_:1}),n(c,{title:"Top Device Types"},{default:d(()=>[t("div",ot,[Object.values(e.topDeviceTypes).length?(s(!0),o(r,{key:0},h(e.topDeviceTypes,(i,l)=>(s(),o("div",{key:l,class:"text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"},[t("span",at,a(l),1),t("span",null,a(i),1)]))),128)):(s(),o("p",lt,"There is no data for this period."))])]),_:1}),n(c,{title:"Top Operating Systems"},{default:d(()=>[t("div",it,[Object.values(e.topOperatingSystems).length?(s(!0),o(r,{key:0},h(e.topOperatingSystems,(i,l)=>(s(),o("div",{key:l,class:"text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"},[t("span",nt,a(l),1),t("span",null,a(i),1)]))),128)):(s(),o("p",dt,"There is no data for this period."))])]),_:1}),n(c,{title:"Top Browsers"},{default:d(()=>[t("div",rt,[Object.values(e.topBrowsers).length?(s(!0),o(r,{key:0},h(e.topBrowsers,(i,l)=>(s(),o("div",{key:l,class:"text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"},[t("span",ct,a(l),1),t("span",null,a(i),1)]))),128)):(s(),o("p",ht,"There is no data for this period."))])]),_:1}),e.enableGeolocation?(s(),o(r,{key:0},[n(c,{title:"Top Countries"},{default:d(()=>[t("div",ut,[Object.values(e.topCountries).length?(s(!0),o(r,{key:0},h(e.topCountries,(i,l)=>(s(),o("div",{key:l,class:"text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"},[t("span",vt,a(l),1),t("span",null,a(i),1)]))),128)):(s(),o("p",pt,"There is no data for this period."))])]),_:1}),n(c,{title:"Top Cities"},{default:d(()=>[t("div",ft,[Object.values(e.topCities).length?(s(!0),o(r,{key:0},h(e.topCities,(i,l)=>(s(),o("div",{key:l,class:"text-sm text-base-content/80 flex flex-row py-1.5 border-b border-dashed border-base-content/15"},[t("span",xt,a(l),1),t("span",null,a(i),1)]))),128)):(s(),o("p",mt,"There is no data for this period."))])]),_:1})],64)):w("",!0)])]),_:1})],64))}};export{Mt as default};
