import{o as t,f as l,b as s,d as n,t as d,g as a}from"./app-a928bb5a.js";const i={class:"max-w-lg"},c={key:0,class:"label"},m={key:0,class:"text-red-500 text-sm"},b=["placeholder","disabled","form","value","required","type"],h={key:1,class:"text-red-500 text-sm mt-1"},x={key:2,class:"text-base-content text-sm mt-1"},f={__name:"FieldInput",props:["label","placeholder","disabled","error","modelValue","type","required","help","form"],emits:["update:modelValue"],setup(e){return(o,r)=>(t(),l("div",i,[e.label?(t(),l("label",c,[s("span",null,[n(d(e.label)+" ",1),e.required?(t(),l("span",m," * ")):a("",!0)])])):a("",!0),s("input",{placeholder:e.placeholder,disabled:e.disabled,class:"input input-bordered w-full",form:e.form,value:e.modelValue,required:e.required,type:e.type?e.type:"text",onInput:r[0]||(r[0]=u=>o.$emit("update:modelValue",u.target.value))},null,40,b),e.error?(t(),l("p",h,d(e.error),1)):a("",!0),e.help?(t(),l("p",x,d(e.help),1)):a("",!0)]))}};export{f as _};
