import{o as l,f as t,t as a,g as o,b as d,F as u,k as c,z as m}from"./app-2ae77ac8.js";const b={key:0,class:"label"},y=["disabled","required","value"],h={key:0,value:""},k=["value"],x={key:1,class:"text-red-500 text-sm mt-1"},v={key:2,class:"mt-2 pl-1 text-xs text-base-content/80"},g={__name:"FieldSelect",props:["allowAny","allLabel","label","options","disabled","error","modelValue","required","size","help","optionLabel"],emits:["update:modelValue"],setup(e){return(r,n)=>(l(),t("div",null,[e.label?(l(),t("label",b,a(e.label),1)):o("",!0),d("select",{class:m(["select select-bordered max-w-lg w-full",{"select-sm":e.size==="sm"}]),disabled:e.disabled,required:e.required,value:e.modelValue,onInput:n[0]||(n[0]=s=>r.$emit("update:modelValue",s.target.value))},[e.allowAny?(l(),t("option",h,a(e.allLabel||"All"),1)):o("",!0),(l(!0),t(u,null,c(e.options,(s,i)=>(l(),t("option",{key:i,value:Array.isArray(e.options)?s:i},a(e.optionLabel==="key"?i:s),9,k))),128))],42,y),e.error?(l(),t("p",x,a(e.error),1)):o("",!0),e.help?(l(),t("p",v,a(e.help),1)):o("",!0)]))}};export{g as _};