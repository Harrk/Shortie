import{k as Jt,l as Nt,o as D,f as F,p as Ot,m as Yt,b as L,T as xt,j as nt,a as P,u as _,w as K,F as Et,Z as jt,h as qt,n as Qt,r as Gt,t as rt,g as ot,e as Zt,d as Bt,c as Wt,q as Xt}from"./app-a928bb5a.js";import{_ as te}from"./AuthenticatedLayout-be4d0bde.js";import{_ as _t}from"./Block-f9f8103b.js";import{_ as it}from"./FieldInput-7d231ede.js";import{_ as ee}from"./PrimaryButton-7236ab79.js";import{_ as ne}from"./NeutralButton-432ffc56.js";import{_ as re}from"./_plugin-vue_export-helper-c27b6911.js";import{c as oe}from"./index-ba65651d.js";var Y={},ie=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},St={},I={};let mt;const se=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];I.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};I.getSymbolTotalCodewords=function(t){return se[t]};I.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};I.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');mt=t};I.isKanjiModeEnabled=function(){return typeof mt<"u"};I.toSJIS=function(t){return mt(t)};var Z={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+n)}}e.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},e.from=function(i,o){if(e.isValid(i))return i;try{return t(i)}catch{return o}}})(Z);function Tt(){this.buffer=[],this.length=0}Tt.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var ae=Tt;function x(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}x.prototype.set=function(e,t,n,i){const o=e*this.size+t;this.data[o]=n,i&&(this.reservedBit[o]=!0)};x.prototype.get=function(e,t){return this.data[e*this.size+t]};x.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n};x.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var le=x,Mt={};(function(e){const t=I.getSymbolSize;e.getRowColCoords=function(i){if(i===1)return[];const o=Math.floor(i/7)+2,r=t(i),s=r===145?26:Math.ceil((r-13)/(2*o-2))*2,l=[r-7];for(let a=1;a<o-1;a++)l[a]=l[a-1]-s;return l.push(6),l.reverse()},e.getPositions=function(i){const o=[],r=e.getRowColCoords(i),s=r.length;for(let l=0;l<s;l++)for(let a=0;a<s;a++)l===0&&a===0||l===0&&a===s-1||l===s-1&&a===0||o.push([r[l],r[a]]);return o}})(Mt);var Pt={};const ue=I.getSymbolSize,bt=7;Pt.getPositions=function(t){const n=ue(t);return[[0,0],[n-bt,0],[0,n-bt]]};var Rt={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},e.from=function(o){return e.isValid(o)?parseInt(o,10):void 0},e.getPenaltyN1=function(o){const r=o.size;let s=0,l=0,a=0,c=null,u=null;for(let C=0;C<r;C++){l=a=0,c=u=null;for(let g=0;g<r;g++){let f=o.get(C,g);f===c?l++:(l>=5&&(s+=t.N1+(l-5)),c=f,l=1),f=o.get(g,C),f===u?a++:(a>=5&&(s+=t.N1+(a-5)),u=f,a=1)}l>=5&&(s+=t.N1+(l-5)),a>=5&&(s+=t.N1+(a-5))}return s},e.getPenaltyN2=function(o){const r=o.size;let s=0;for(let l=0;l<r-1;l++)for(let a=0;a<r-1;a++){const c=o.get(l,a)+o.get(l,a+1)+o.get(l+1,a)+o.get(l+1,a+1);(c===4||c===0)&&s++}return s*t.N2},e.getPenaltyN3=function(o){const r=o.size;let s=0,l=0,a=0;for(let c=0;c<r;c++){l=a=0;for(let u=0;u<r;u++)l=l<<1&2047|o.get(c,u),u>=10&&(l===1488||l===93)&&s++,a=a<<1&2047|o.get(u,c),u>=10&&(a===1488||a===93)&&s++}return s*t.N3},e.getPenaltyN4=function(o){let r=0;const s=o.data.length;for(let a=0;a<s;a++)r+=o.data[a];return Math.abs(Math.ceil(r*100/s/5)-10)*t.N4};function n(i,o,r){switch(i){case e.Patterns.PATTERN000:return(o+r)%2===0;case e.Patterns.PATTERN001:return o%2===0;case e.Patterns.PATTERN010:return r%3===0;case e.Patterns.PATTERN011:return(o+r)%3===0;case e.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(r/3))%2===0;case e.Patterns.PATTERN101:return o*r%2+o*r%3===0;case e.Patterns.PATTERN110:return(o*r%2+o*r%3)%2===0;case e.Patterns.PATTERN111:return(o*r%3+(o+r)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}e.applyMask=function(o,r){const s=r.size;for(let l=0;l<s;l++)for(let a=0;a<s;a++)r.isReserved(a,l)||r.xor(a,l,n(o,a,l))},e.getBestMask=function(o,r){const s=Object.keys(e.Patterns).length;let l=0,a=1/0;for(let c=0;c<s;c++){r(c),e.applyMask(c,o);const u=e.getPenaltyN1(o)+e.getPenaltyN2(o)+e.getPenaltyN3(o)+e.getPenaltyN4(o);e.applyMask(c,o),u<a&&(a=u,l=c)}return l}})(Rt);var W={};const U=Z,j=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],q=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];W.getBlocksCount=function(t,n){switch(n){case U.L:return j[(t-1)*4+0];case U.M:return j[(t-1)*4+1];case U.Q:return j[(t-1)*4+2];case U.H:return j[(t-1)*4+3];default:return}};W.getTotalCodewordsCount=function(t,n){switch(n){case U.L:return q[(t-1)*4+0];case U.M:return q[(t-1)*4+1];case U.Q:return q[(t-1)*4+2];case U.H:return q[(t-1)*4+3];default:return}};var Lt={},X={};const J=new Uint8Array(512),Q=new Uint8Array(256);(function(){let t=1;for(let n=0;n<255;n++)J[n]=t,Q[t]=n,t<<=1,t&256&&(t^=285);for(let n=255;n<512;n++)J[n]=J[n-255]})();X.log=function(t){if(t<1)throw new Error("log("+t+")");return Q[t]};X.exp=function(t){return J[t]};X.mul=function(t,n){return t===0||n===0?0:J[Q[t]+Q[n]]};(function(e){const t=X;e.mul=function(i,o){const r=new Uint8Array(i.length+o.length-1);for(let s=0;s<i.length;s++)for(let l=0;l<o.length;l++)r[s+l]^=t.mul(i[s],o[l]);return r},e.mod=function(i,o){let r=new Uint8Array(i);for(;r.length-o.length>=0;){const s=r[0];for(let a=0;a<o.length;a++)r[a]^=t.mul(o[a],s);let l=0;for(;l<r.length&&r[l]===0;)l++;r=r.slice(l)}return r},e.generateECPolynomial=function(i){let o=new Uint8Array([1]);for(let r=0;r<i;r++)o=e.mul(o,new Uint8Array([1,t.exp(r)]));return o}})(Lt);const Ut=Lt;function wt(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}wt.prototype.initialize=function(t){this.degree=t,this.genPoly=Ut.generateECPolynomial(this.degree)};wt.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(t.length+this.degree);n.set(t);const i=Ut.mod(n,this.genPoly),o=this.degree-i.length;if(o>0){const r=new Uint8Array(this.degree);return r.set(i,o),r}return i};var ce=wt,vt={},v={},pt={};pt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var T={};const Dt="[0-9]+",fe="[A-Z $%*+\\-./:]+";let O="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";O=O.replace(/u/g,"\\u");const de="(?:(?![A-Z0-9 $%*+\\-./:]|"+O+`)(?:.|[\r
]))+`;T.KANJI=new RegExp(O,"g");T.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");T.BYTE=new RegExp(de,"g");T.NUMERIC=new RegExp(Dt,"g");T.ALPHANUMERIC=new RegExp(fe,"g");const ge=new RegExp("^"+O+"$"),he=new RegExp("^"+Dt+"$"),me=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");T.testKanji=function(t){return ge.test(t)};T.testNumeric=function(t){return he.test(t)};T.testAlphanumeric=function(t){return me.test(t)};(function(e){const t=pt,n=T;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(r,s){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?r.ccBits[0]:s<27?r.ccBits[1]:r.ccBits[2]},e.getBestModeForData=function(r){return n.testNumeric(r)?e.NUMERIC:n.testAlphanumeric(r)?e.ALPHANUMERIC:n.testKanji(r)?e.KANJI:e.BYTE},e.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},e.isValid=function(r){return r&&r.bit&&r.ccBits};function i(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+o)}}e.from=function(r,s){if(e.isValid(r))return r;try{return i(r)}catch{return s}}})(v);(function(e){const t=I,n=W,i=Z,o=v,r=pt,s=7973,l=t.getBCHDigit(s);function a(g,f,w){for(let p=1;p<=40;p++)if(f<=e.getCapacity(p,w,g))return p}function c(g,f){return o.getCharCountIndicator(g,f)+4}function u(g,f){let w=0;return g.forEach(function(p){const A=c(p.mode,f);w+=A+p.getBitsLength()}),w}function C(g,f){for(let w=1;w<=40;w++)if(u(g,w)<=e.getCapacity(w,f,o.MIXED))return w}e.from=function(f,w){return r.isValid(f)?parseInt(f,10):w},e.getCapacity=function(f,w,p){if(!r.isValid(f))throw new Error("Invalid QR Code version");typeof p>"u"&&(p=o.BYTE);const A=t.getSymbolTotalCodewords(f),m=n.getTotalCodewordsCount(f,w),y=(A-m)*8;if(p===o.MIXED)return y;const h=y-c(p,f);switch(p){case o.NUMERIC:return Math.floor(h/10*3);case o.ALPHANUMERIC:return Math.floor(h/11*2);case o.KANJI:return Math.floor(h/13);case o.BYTE:default:return Math.floor(h/8)}},e.getBestVersionForData=function(f,w){let p;const A=i.from(w,i.M);if(Array.isArray(f)){if(f.length>1)return C(f,A);if(f.length===0)return 1;p=f[0]}else p=f;return a(p.mode,p.getLength(),A)},e.getEncodedBits=function(f){if(!r.isValid(f)||f<7)throw new Error("Invalid QR Code version");let w=f<<12;for(;t.getBCHDigit(w)-l>=0;)w^=s<<t.getBCHDigit(w)-l;return f<<12|w}})(vt);var Ft={};const ft=I,kt=1335,we=21522,At=ft.getBCHDigit(kt);Ft.getEncodedBits=function(t,n){const i=t.bit<<3|n;let o=i<<10;for(;ft.getBCHDigit(o)-At>=0;)o^=kt<<ft.getBCHDigit(o)-At;return(i<<10|o)^we};var Vt={};const pe=v;function k(e){this.mode=pe.NUMERIC,this.data=e.toString()}k.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};k.prototype.getLength=function(){return this.data.length};k.prototype.getBitsLength=function(){return k.getBitsLength(this.data.length)};k.prototype.write=function(t){let n,i,o;for(n=0;n+3<=this.data.length;n+=3)i=this.data.substr(n,3),o=parseInt(i,10),t.put(o,10);const r=this.data.length-n;r>0&&(i=this.data.substr(n),o=parseInt(i,10),t.put(o,r*3+1))};var ye=k;const Ce=v,st=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function V(e){this.mode=Ce.ALPHANUMERIC,this.data=e}V.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};V.prototype.getLength=function(){return this.data.length};V.prototype.getBitsLength=function(){return V.getBitsLength(this.data.length)};V.prototype.write=function(t){let n;for(n=0;n+2<=this.data.length;n+=2){let i=st.indexOf(this.data[n])*45;i+=st.indexOf(this.data[n+1]),t.put(i,11)}this.data.length%2&&t.put(st.indexOf(this.data[n]),6)};var Ee=V,Be=function(t){for(var n=[],i=t.length,o=0;o<i;o++){var r=t.charCodeAt(o);if(r>=55296&&r<=56319&&i>o+1){var s=t.charCodeAt(o+1);s>=56320&&s<=57343&&(r=(r-55296)*1024+s-56320+65536,o+=1)}if(r<128){n.push(r);continue}if(r<2048){n.push(r>>6|192),n.push(r&63|128);continue}if(r<55296||r>=57344&&r<65536){n.push(r>>12|224),n.push(r>>6&63|128),n.push(r&63|128);continue}if(r>=65536&&r<=1114111){n.push(r>>18|240),n.push(r>>12&63|128),n.push(r>>6&63|128),n.push(r&63|128);continue}n.push(239,191,189)}return new Uint8Array(n).buffer};const _e=Be,be=v;function z(e){this.mode=be.BYTE,typeof e=="string"&&(e=_e(e)),this.data=new Uint8Array(e)}z.getBitsLength=function(t){return t*8};z.prototype.getLength=function(){return this.data.length};z.prototype.getBitsLength=function(){return z.getBitsLength(this.data.length)};z.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)};var Ae=z;const Ie=v,Ne=I;function $(e){this.mode=Ie.KANJI,this.data=e}$.getBitsLength=function(t){return t*13};$.prototype.getLength=function(){return this.data.length};$.prototype.getBitsLength=function(){return $.getBitsLength(this.data.length)};$.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=Ne.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}};var Se=$,zt={exports:{}};(function(e){var t={single_source_shortest_paths:function(n,i,o){var r={},s={};s[i]=0;var l=t.PriorityQueue.make();l.push(i,0);for(var a,c,u,C,g,f,w,p,A;!l.empty();){a=l.pop(),c=a.value,C=a.cost,g=n[c]||{};for(u in g)g.hasOwnProperty(u)&&(f=g[u],w=C+f,p=s[u],A=typeof s[u]>"u",(A||p>w)&&(s[u]=w,l.push(u,w),r[u]=c))}if(typeof o<"u"&&typeof s[o]>"u"){var m=["Could not find a path from ",i," to ",o,"."].join("");throw new Error(m)}return r},extract_shortest_path_from_predecessor_list:function(n,i){for(var o=[],r=i;r;)o.push(r),n[r],r=n[r];return o.reverse(),o},find_path:function(n,i,o){var r=t.single_source_shortest_paths(n,i,o);return t.extract_shortest_path_from_predecessor_list(r,o)},PriorityQueue:{make:function(n){var i=t.PriorityQueue,o={},r;n=n||{};for(r in i)i.hasOwnProperty(r)&&(o[r]=i[r]);return o.queue=[],o.sorter=n.sorter||i.default_sorter,o},default_sorter:function(n,i){return n.cost-i.cost},push:function(n,i){var o={value:n,cost:i};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(zt);var Te=zt.exports;(function(e){const t=v,n=ye,i=Ee,o=Ae,r=Se,s=T,l=I,a=Te;function c(m){return unescape(encodeURIComponent(m)).length}function u(m,y,h){const d=[];let E;for(;(E=m.exec(h))!==null;)d.push({data:E[0],index:E.index,mode:y,length:E[0].length});return d}function C(m){const y=u(s.NUMERIC,t.NUMERIC,m),h=u(s.ALPHANUMERIC,t.ALPHANUMERIC,m);let d,E;return l.isKanjiModeEnabled()?(d=u(s.BYTE,t.BYTE,m),E=u(s.KANJI,t.KANJI,m)):(d=u(s.BYTE_KANJI,t.BYTE,m),E=[]),y.concat(h,d,E).sort(function(b,N){return b.index-N.index}).map(function(b){return{data:b.data,mode:b.mode,length:b.length}})}function g(m,y){switch(y){case t.NUMERIC:return n.getBitsLength(m);case t.ALPHANUMERIC:return i.getBitsLength(m);case t.KANJI:return r.getBitsLength(m);case t.BYTE:return o.getBitsLength(m)}}function f(m){return m.reduce(function(y,h){const d=y.length-1>=0?y[y.length-1]:null;return d&&d.mode===h.mode?(y[y.length-1].data+=h.data,y):(y.push(h),y)},[])}function w(m){const y=[];for(let h=0;h<m.length;h++){const d=m[h];switch(d.mode){case t.NUMERIC:y.push([d,{data:d.data,mode:t.ALPHANUMERIC,length:d.length},{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.ALPHANUMERIC:y.push([d,{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.KANJI:y.push([d,{data:d.data,mode:t.BYTE,length:c(d.data)}]);break;case t.BYTE:y.push([{data:d.data,mode:t.BYTE,length:c(d.data)}])}}return y}function p(m,y){const h={},d={start:{}};let E=["start"];for(let B=0;B<m.length;B++){const b=m[B],N=[];for(let R=0;R<b.length;R++){const S=b[R],H=""+B+R;N.push(H),h[H]={node:S,lastCount:0},d[H]={};for(let et=0;et<E.length;et++){const M=E[et];h[M]&&h[M].node.mode===S.mode?(d[M][H]=g(h[M].lastCount+S.length,S.mode)-g(h[M].lastCount,S.mode),h[M].lastCount+=S.length):(h[M]&&(h[M].lastCount=S.length),d[M][H]=g(S.length,S.mode)+4+t.getCharCountIndicator(S.mode,y))}}E=N}for(let B=0;B<E.length;B++)d[E[B]].end=0;return{map:d,table:h}}function A(m,y){let h;const d=t.getBestModeForData(m);if(h=t.from(y,d),h!==t.BYTE&&h.bit<d.bit)throw new Error('"'+m+'" cannot be encoded with mode '+t.toString(h)+`.
 Suggested mode is: `+t.toString(d));switch(h===t.KANJI&&!l.isKanjiModeEnabled()&&(h=t.BYTE),h){case t.NUMERIC:return new n(m);case t.ALPHANUMERIC:return new i(m);case t.KANJI:return new r(m);case t.BYTE:return new o(m)}}e.fromArray=function(y){return y.reduce(function(h,d){return typeof d=="string"?h.push(A(d,null)):d.data&&h.push(A(d.data,d.mode)),h},[])},e.fromString=function(y,h){const d=C(y,l.isKanjiModeEnabled()),E=w(d),B=p(E,h),b=a.find_path(B.map,"start","end"),N=[];for(let R=1;R<b.length-1;R++)N.push(B.table[b[R]].node);return e.fromArray(f(N))},e.rawSplit=function(y){return e.fromArray(C(y,l.isKanjiModeEnabled()))}})(Vt);const tt=I,at=Z,Me=ae,Pe=le,Re=Mt,Le=Pt,dt=Rt,gt=W,Ue=ce,G=vt,ve=Ft,De=v,lt=Vt;function Fe(e,t){const n=e.size,i=Le.getPositions(t);for(let o=0;o<i.length;o++){const r=i[o][0],s=i[o][1];for(let l=-1;l<=7;l++)if(!(r+l<=-1||n<=r+l))for(let a=-1;a<=7;a++)s+a<=-1||n<=s+a||(l>=0&&l<=6&&(a===0||a===6)||a>=0&&a<=6&&(l===0||l===6)||l>=2&&l<=4&&a>=2&&a<=4?e.set(r+l,s+a,!0,!0):e.set(r+l,s+a,!1,!0))}}function ke(e){const t=e.size;for(let n=8;n<t-8;n++){const i=n%2===0;e.set(n,6,i,!0),e.set(6,n,i,!0)}}function Ve(e,t){const n=Re.getPositions(t);for(let i=0;i<n.length;i++){const o=n[i][0],r=n[i][1];for(let s=-2;s<=2;s++)for(let l=-2;l<=2;l++)s===-2||s===2||l===-2||l===2||s===0&&l===0?e.set(o+s,r+l,!0,!0):e.set(o+s,r+l,!1,!0)}}function ze(e,t){const n=e.size,i=G.getEncodedBits(t);let o,r,s;for(let l=0;l<18;l++)o=Math.floor(l/3),r=l%3+n-8-3,s=(i>>l&1)===1,e.set(o,r,s,!0),e.set(r,o,s,!0)}function ut(e,t,n){const i=e.size,o=ve.getEncodedBits(t,n);let r,s;for(r=0;r<15;r++)s=(o>>r&1)===1,r<6?e.set(r,8,s,!0):r<8?e.set(r+1,8,s,!0):e.set(i-15+r,8,s,!0),r<8?e.set(8,i-r-1,s,!0):r<9?e.set(8,15-r-1+1,s,!0):e.set(8,15-r-1,s,!0);e.set(i-8,8,1,!0)}function $e(e,t){const n=e.size;let i=-1,o=n-1,r=7,s=0;for(let l=n-1;l>0;l-=2)for(l===6&&l--;;){for(let a=0;a<2;a++)if(!e.isReserved(o,l-a)){let c=!1;s<t.length&&(c=(t[s]>>>r&1)===1),e.set(o,l-a,c),r--,r===-1&&(s++,r=7)}if(o+=i,o<0||n<=o){o-=i,i=-i;break}}}function He(e,t,n){const i=new Me;n.forEach(function(a){i.put(a.mode.bit,4),i.put(a.getLength(),De.getCharCountIndicator(a.mode,e)),a.write(i)});const o=tt.getSymbolTotalCodewords(e),r=gt.getTotalCodewordsCount(e,t),s=(o-r)*8;for(i.getLengthInBits()+4<=s&&i.put(0,4);i.getLengthInBits()%8!==0;)i.putBit(0);const l=(s-i.getLengthInBits())/8;for(let a=0;a<l;a++)i.put(a%2?17:236,8);return Ke(i,e,t)}function Ke(e,t,n){const i=tt.getSymbolTotalCodewords(t),o=gt.getTotalCodewordsCount(t,n),r=i-o,s=gt.getBlocksCount(t,n),l=i%s,a=s-l,c=Math.floor(i/s),u=Math.floor(r/s),C=u+1,g=c-u,f=new Ue(g);let w=0;const p=new Array(s),A=new Array(s);let m=0;const y=new Uint8Array(e.buffer);for(let b=0;b<s;b++){const N=b<a?u:C;p[b]=y.slice(w,w+N),A[b]=f.encode(p[b]),w+=N,m=Math.max(m,N)}const h=new Uint8Array(i);let d=0,E,B;for(E=0;E<m;E++)for(B=0;B<s;B++)E<p[B].length&&(h[d++]=p[B][E]);for(E=0;E<g;E++)for(B=0;B<s;B++)h[d++]=A[B][E];return h}function Je(e,t,n,i){let o;if(Array.isArray(e))o=lt.fromArray(e);else if(typeof e=="string"){let c=t;if(!c){const u=lt.rawSplit(e);c=G.getBestVersionForData(u,n)}o=lt.fromString(e,c||40)}else throw new Error("Invalid data");const r=G.getBestVersionForData(o,n);if(!r)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=r;else if(t<r)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+r+`.
`);const s=He(t,n,o),l=tt.getSymbolSize(t),a=new Pe(l);return Fe(a,t),ke(a),Ve(a,t),ut(a,n,0),t>=7&&ze(a,t),$e(a,s),isNaN(i)&&(i=dt.getBestMask(a,ut.bind(null,a,n))),dt.applyMask(i,a),ut(a,n,i),{modules:a,version:t,errorCorrectionLevel:n,maskPattern:i,segments:o}}St.create=function(t,n){if(typeof t>"u"||t==="")throw new Error("No input text");let i=at.M,o,r;return typeof n<"u"&&(i=at.from(n.errorCorrectionLevel,at.M),o=G.from(n.version),r=dt.from(n.maskPattern),n.toSJISFunc&&tt.setToSJISFunction(n.toSJISFunc)),Je(t,o,i,r)};var $t={},yt={};(function(e){function t(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let i=n.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+n);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(r){return[r,r]}))),i.length===6&&i.push("F","F");const o=parseInt(i.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+i.slice(0,6).join("")}}e.getOptions=function(i){i||(i={}),i.color||(i.color={});const o=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,r=i.width&&i.width>=21?i.width:void 0,s=i.scale||4;return{width:r,scale:r?4:s,margin:o,color:{dark:t(i.color.dark||"#000000ff"),light:t(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},e.getScale=function(i,o){return o.width&&o.width>=i+o.margin*2?o.width/(i+o.margin*2):o.scale},e.getImageWidth=function(i,o){const r=e.getScale(i,o);return Math.floor((i+o.margin*2)*r)},e.qrToImageData=function(i,o,r){const s=o.modules.size,l=o.modules.data,a=e.getScale(s,r),c=Math.floor((s+r.margin*2)*a),u=r.margin*a,C=[r.color.light,r.color.dark];for(let g=0;g<c;g++)for(let f=0;f<c;f++){let w=(g*c+f)*4,p=r.color.light;if(g>=u&&f>=u&&g<c-u&&f<c-u){const A=Math.floor((g-u)/a),m=Math.floor((f-u)/a);p=C[l[A*s+m]?1:0]}i[w++]=p.r,i[w++]=p.g,i[w++]=p.b,i[w]=p.a}}})(yt);(function(e){const t=yt;function n(o,r,s){o.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=s,r.width=s,r.style.height=s+"px",r.style.width=s+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(r,s,l){let a=l,c=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(c=i()),a=t.getOptions(a);const u=t.getImageWidth(r.modules.size,a),C=c.getContext("2d"),g=C.createImageData(u,u);return t.qrToImageData(g.data,r,a),n(C,c,u),C.putImageData(g,0,0),c},e.renderToDataURL=function(r,s,l){let a=l;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const c=e.render(r,s,a),u=a.type||"image/png",C=a.rendererOpts||{};return c.toDataURL(u,C.quality)}})($t);var Ht={};const Oe=yt;function It(e,t){const n=e.a/255,i=t+'="'+e.hex+'"';return n<1?i+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':i}function ct(e,t,n){let i=e+t;return typeof n<"u"&&(i+=" "+n),i}function Ye(e,t,n){let i="",o=0,r=!1,s=0;for(let l=0;l<e.length;l++){const a=Math.floor(l%t),c=Math.floor(l/t);!a&&!r&&(r=!0),e[l]?(s++,l>0&&a>0&&e[l-1]||(i+=r?ct("M",a+n,.5+c+n):ct("m",o,0),o=0,r=!1),a+1<t&&e[l+1]||(i+=ct("h",s),s=0)):o++}return i}Ht.render=function(t,n,i){const o=Oe.getOptions(n),r=t.modules.size,s=t.modules.data,l=r+o.margin*2,a=o.color.light.a?"<path "+It(o.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",c="<path "+It(o.color.dark,"stroke")+' d="'+Ye(s,r,o.margin)+'"/>',u='viewBox="0 0 '+l+" "+l+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+u+' shape-rendering="crispEdges">'+a+c+`</svg>
`;return typeof i=="function"&&i(null,g),g};const xe=ie,ht=St,Kt=$t,je=Ht;function Ct(e,t,n,i,o){const r=[].slice.call(arguments,1),s=r.length,l=typeof r[s-1]=="function";if(!l&&!xe())throw new Error("Callback required as last argument");if(l){if(s<2)throw new Error("Too few arguments provided");s===2?(o=n,n=t,t=i=void 0):s===3&&(t.getContext&&typeof o>"u"?(o=i,i=void 0):(o=i,i=n,n=t,t=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(n=t,t=i=void 0):s===2&&!t.getContext&&(i=n,n=t,t=void 0),new Promise(function(a,c){try{const u=ht.create(n,i);a(e(u,t,i))}catch(u){c(u)}})}try{const a=ht.create(n,i);o(null,e(a,t,i))}catch(a){o(a)}}Y.create=ht.create;Y.toCanvas=Ct.bind(null,Kt.render);Y.toDataURL=Ct.bind(null,Kt.renderToDataURL);Y.toString=Ct.bind(null,function(e,t,n){return je.render(e,n)});const qe=e=>(Ot("data-v-51fdce4e"),e=e(),Yt(),e),Qe={id:"qr-code-wrapper",class:"p-2 lg:p-3 bg-base-300 rounded-lg"},Ge=qe(()=>L("canvas",{id:"qr-code",class:"inline-block"},null,-1)),Ze=[Ge],We={__name:"QRCode",props:{data:{type:String,required:!0}},setup(e){const t=e,n=()=>{let i=document.getElementById("qr-code"),o={margin:1,scale:12};Y.toCanvas(i,t.data,o,function(r){r&&console.error(r)})};return Jt(()=>n()),Nt(t,()=>n()),(i,o)=>(D(),F("div",Qe,Ze))}},Xe=re(We,[["__scopeId","data-v-51fdce4e"]]),tn={class:"md:flex md:flex-row md:space-x-4"},en={class:"flex flex-col space-y-4 flex-1"},nn={key:0},rn=L("label",{class:"label"}," Domain ",-1),on=["value"],sn={key:0,class:"text-red-500 text-sm mt-1"},an={class:"md:w-1/4 pt-10"},ln={class:"flex flex-row-reverse space-x-2 space-x-reverse mt-4"},pn={__name:"Edit",props:["shortUrl","domains","copy"],setup(e){const t=e,n=xt({id:null,domain_id:null,slug:"",url:"",short_url:"",...t.shortUrl}),i=nt(()=>n.id?"Update":"Create"),o=nt(()=>t.domains[n.domain_id]),r=nt(()=>`${o.value}/${n.slug}`),s=()=>{n.id?n.put(route("short-url.update",n.id)):n.post(route("short-url.store"),{onSuccess:()=>{n.defaults({...t.shortUrl}),n.reset()}})},l=()=>{oe(r.value)&&Xt.dark("Short URL copied to clipboard",{type:"success"})},a=()=>{window.confirm("Are you sure?")&&n.delete(route("short-url.destroy",n.id))};return Nt(()=>t.copy,c=>{c&&l()},{immediate:!0}),(c,u)=>(D(),F(Et,null,[P(_(jt),{title:`${i.value} Short URL`},null,8,["title"]),P(te,null,{default:K(()=>[P(_t,{title:`${i.value} Short URL`},{default:K(()=>[L("form",{id:"short-url-form",onSubmit:Zt(s,["prevent"])},[L("div",tn,[L("div",en,[P(it,{label:"URL",placeholder:"https://yourreallylongurl.com...",disabled:_(n).processing,modelValue:_(n).url,"onUpdate:modelValue":u[0]||(u[0]=C=>_(n).url=C),error:_(n).errors.url,required:!0},null,8,["disabled","modelValue","error"]),Object.values(e.domains).length>1?(D(),F("div",nn,[rn,qt(L("select",{class:"select select-bordered max-w-lg w-full","onUpdate:modelValue":u[1]||(u[1]=C=>_(n).domain_id=C),required:""},[(D(!0),F(Et,null,Gt(e.domains,(C,g)=>(D(),F("option",{key:g,value:g},rt(C),9,on))),128))],512),[[Qt,_(n).domain_id]]),_(n).errors.domain_id?(D(),F("p",sn,rt(_(n).errors.domain_id),1)):ot("",!0)])):ot("",!0),P(it,{label:"Slug",placeholder:"",disabled:_(n).processing,modelValue:_(n).slug,"onUpdate:modelValue":u[2]||(u[2]=C=>_(n).slug=C),error:_(n).errors.slug,required:!0},null,8,["disabled","modelValue","error"])]),L("div",an,[P(Xe,{class:"max-w-32 mx-auto lg:max-w-48",data:r.value},null,8,["data"])])])],32)]),_:1},8,["title"]),P(_t,{title:"Behaviour"},{default:K(()=>[P(it,{label:"Max visits",placeholder:"No limit",disabled:_(n).processing,modelValue:_(n).max_visits,"onUpdate:modelValue":u[3]||(u[3]=C=>_(n).max_visits=C),error:_(n).errors.max_visits,type:"number",help:"The Short URL will deactivate once it reaches the maximum number of visits specified. Leave blank for no limit.",form:"short-url-form"},null,8,["disabled","modelValue","error"])]),_:1}),L("div",ln,[P(ee,{disabled:_(n).processing,submit:!0,form:"short-url-form"},{default:K(()=>[Bt(rt(i.value),1)]),_:1},8,["disabled"]),_(n).id?(D(),Wt(ne,{key:0,disabled:_(n).processing,onClick:u[4]||(u[4]=C=>a())},{default:K(()=>[Bt(" Delete ")]),_:1},8,["disabled"])):ot("",!0)])]),_:1})],64))}};export{pn as default};
