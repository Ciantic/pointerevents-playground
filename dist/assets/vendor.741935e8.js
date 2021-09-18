const e=Symbol("solid-proxy"),t={equals:(e,t)=>e===t};let n=_;const r={},o={owned:null,cleanups:null,context:null,owner:null};var s=null;let l=null,i=null,u=null,c=null,f=0;function a(e,n){n=n?Object.assign({},t,n):t;const o={value:e,observers:null,observerSlots:null,pending:r,comparator:n.equals||void 0};return[v.bind(o),e=>("function"==typeof e&&(e=e(o.pending!==r?o.pending:o.value)),w(o,e))]}function d(e,t,n){A(m(e,t,!0,1))}function p(e,t,n){A(m(e,t,!1,1))}function h(e){if(i)return e();let t;const n=i=[];try{t=e()}finally{i=null}return O((()=>{for(let e=0;e<n.length;e+=1){const t=n[e];if(t.pending!==r){const e=t.pending;t.pending=r,w(t,e)}}}),!1),t}function g(e){let t,n=l;return l=null,t=e(),l=n,t}function y(e){!function(e,t,r){n=j;const o=m(e,t,!1,1);o.user=!0,c&&c.push(o)}((()=>g(e)))}function b(){return l}function v(){if(this.state&&this.sources){const e=u;u=null,1===this.state?A(this):x(this),u=e}if(l){const e=this.observers?this.observers.length:0;l.sources?(l.sources.push(this),l.sourceSlots.push(e)):(l.sources=[this],l.sourceSlots=[e]),this.observers?(this.observers.push(l),this.observerSlots.push(l.sources.length-1)):(this.observers=[l],this.observerSlots=[l.sources.length-1])}return this.value}function w(e,t,n){if(e.comparator&&e.comparator(e.value,t))return t;if(i)return e.pending===r&&i.push(e),e.pending=t,t;let o=!1;return e.value=t,e.observers&&e.observers.length&&O((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];o,n.pure?u.push(n):c.push(n),n.observers&&!n.state&&C(n),n.state=1}if(u.length>1e6)throw u=[],new Error}),!1),t}function A(e){if(!e.fn)return;P(e);const t=s,n=l,r=f;l=s=e,function(e,t,n){let r;try{r=e.fn(t)}catch(o){N(o)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?w(e,r):e.value=r,e.updatedAt=n)}(e,e.value,r),l=n,s=t}function m(e,t,n,r=1,l){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:s,context:null,pure:n};return null===s||s!==o&&(s.owned?s.owned.push(i):s.owned=[i]),i}function S(e){if(1!==e.state)return e.state=0;if(e.suspense&&g(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<f);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(1===(e=t[n]).state)A(e);else if(2===e.state){const t=u;u=null,x(e),u=t}}function O(e,t){if(u)return e();let r=!1;t||(u=[]),c?r=!0:c=[],f++;try{e()}catch(o){N(o)}finally{!function(e){u&&(_(u),u=null);if(e)return;c.length?h((()=>{n(c),c=null})):c=null}(r)}}function _(e){for(let t=0;t<e.length;t++)S(e[t])}function j(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:S(r)}const r=e.length;for(t=0;t<n;t++)S(e[t]);for(t=r;t<e.length;t++)S(e[t])}function x(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?S(n):2===n.state&&x(n))}}function C(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.pure?u.push(n):c.push(n),n.observers&&C(n))}}function P(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)P(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function N(e){throw e}function $(e,t){return g((()=>e(t)))}function D(e,n){return function(e,n,o){o=o?Object.assign({},t,o):t;const s=m(e,n,!0,0);return s.pending=r,s.observers=null,s.observerSlots=null,s.comparator=o.equals||void 0,A(s),v.bind(s)}(e,void 0,n?void 0:{equals:n})}function E(e,t,n){let r=n.length,o=t.length,s=r,l=0,i=0,u=t[o-1].nextSibling,c=null;for(;l<o||i<s;)if(t[l]!==n[i]){for(;t[o-1]===n[s-1];)o--,s--;if(o===l){const t=s<r?i?n[i-1].nextSibling:n[s-i]:u;for(;i<s;)e.insertBefore(n[i++],t)}else if(s===i)for(;l<o;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[s-1]&&n[i]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[i++],t[l++].nextSibling),e.insertBefore(n[--s],r),t[o]=n[s]}else{if(!c){c=new Map;let e=i;for(;e<s;)c.set(n[e],e++)}const r=c.get(t[l]);if(null!=r)if(i<r&&r<s){let u,f=l,a=1;for(;++f<o&&f<s&&null!=(u=c.get(t[f]))&&u===r+a;)a++;if(a>r-i){const o=t[l];for(;i<r;)e.insertBefore(n[i++],o)}else e.replaceChild(n[i++],t[l++])}else l++;else e.removeChild(t[l++])}}else l++,i++}function T(e,t,n){let r;return function(e,t){t&&(s=t);const n=l,r=s,i=0===e.length?o:{owned:null,cleanups:null,context:null,owner:r};let u;s=i,l=null;try{O((()=>u=e((()=>P(i)))),!0)}finally{l=n,s=r}}((o=>{r=o,k(t,e(),t.firstChild?null:void 0,n)})),()=>{r(),t.textContent=""}}function B(e,t,n){const r=document.createElement("template");r.innerHTML=e;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function q(e,t=window.document){const n=t._$DX_DELEGATE||(t._$DX_DELEGATE=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,L))}}function k(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return F(e,t,r,n);p((r=>F(e,t(),r,n)),r)}function L(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function F(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const s=typeof t,l=void 0!==r;if(e=l&&n[0]&&n[0].parentNode||e,"string"===s||"number"===s)if("number"===s&&(t=t.toString()),l){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=K(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===s)n=K(e,n,r);else{if("function"===s)return p((()=>{let o=t();for(;"function"==typeof o;)o=o();n=F(e,o,n,r)})),()=>n;if(Array.isArray(t)){const s=[];if(z(s,t,o))return p((()=>n=F(e,s,n,r,!0))),()=>n;if(0===s.length){if(n=K(e,n,r),l)return n}else Array.isArray(n)?0===n.length?G(e,s,r):E(e,n,s):null==n||""===n?G(e,s):E(e,l&&n||[e.firstChild],s);n=s}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=K(e,n,r,t);K(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}}return n}function z(e,t,n){let r=!1;for(let o=0,s=t.length;o<s;o++){let s,l=t[o];if(l instanceof Node)e.push(l);else if(null==l||!0===l||!1===l);else if(Array.isArray(l))r=z(e,l)||r;else if("string"==(s=typeof l))e.push(document.createTextNode(l));else if("function"===s)if(n){for(;"function"==typeof l;)l=l();r=z(e,Array.isArray(l)?l:[l])||r}else e.push(l),r=!0;else e.push(document.createTextNode(l.toString()))}return r}function G(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function K(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let s=t.length-1;s>=0;s--){const l=t[s];if(o!==l){const t=l.parentNode===e;r||s?t&&e.removeChild(l):t?e.replaceChild(o,l):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}const M=Symbol("store-raw"),R=Symbol("store-node"),X=Symbol("store-name");function H(t,n){let r=t[e];if(!r){Object.defineProperty(t,e,{value:r=new Proxy(t,V)});const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let e=0,s=n.length;e<s;e++){const s=n[e];if(o[s].get){const e=o[s].get.bind(r);Object.defineProperty(t,s,{get:e})}}}return r}function I(e){return null!=e&&"object"==typeof e&&(!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function J(e,t=new Set){let n,r,o,s;if(n=null!=e&&e[M])return n;if(!I(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,s=e.length;n<s;n++)o=e[n],(r=J(o,t))!==o&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const n=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let i=0,u=n.length;i<u;i++)s=n[i],l[s].get||(o=e[s],(r=J(o,t))!==o&&(e[s]=r))}return e}function Q(e){let t=e[R];return t||Object.defineProperty(e,R,{value:t={}}),t}function U(){const[e,t]=a(void 0,{equals:!1,internal:!0});return e.$=t,e}const V={get(t,n,r){if(n===M)return t;if(n===e)return r;const o=t[n];if(n===R||"__proto__"===n)return o;const s=I(o);if(b()&&("function"!=typeof o||t.hasOwnProperty(n))){let e,r;s&&(e=Q(o))&&(r=e._||(e._=U()),r()),e=Q(t),r=e[n]||(e[n]=U()),r()}return s?H(o):o},set:()=>!0,deleteProperty:()=>!0,ownKeys:function(e){if(b()){const t=Q(e);(t._||(t._=U()))()}return Reflect.ownKeys(e)},getOwnPropertyDescriptor:function(t,n){const r=Reflect.getOwnPropertyDescriptor(t,n);return!r||r.get||n===e||n===R||n===X||(delete r.value,delete r.writable,r.get=()=>t[e][n]),r}};function W(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),o=e.length,s=void 0===n,l=r||s===t in e;s?delete e[t]:e[t]=n;let i,u=Q(e);(i=u[t])&&i.$(),r&&e.length!==o&&(i=u.length)&&i.$(i,void 0),l&&(i=u._)&&i.$(i,void 0)}function Y(e,t,n=[]){let r,o=e;if(t.length>1){r=t.shift();const s=typeof r,l=Array.isArray(e);if(Array.isArray(r)){for(let o=0;o<r.length;o++)Y(e,[r[o]].concat(t),[r[o]].concat(n));return}if(l&&"function"===s){for(let o=0;o<e.length;o++)r(e[o],o)&&Y(e,[o].concat(t),[o].concat(n));return}if(l&&"object"===s){const{from:o=0,to:s=e.length-1,by:l=1}=r;for(let r=o;r<=s;r+=l)Y(e,[r].concat(t),[r].concat(n));return}if(t.length>1)return void Y(e[r],t,[r].concat(n));o=e[r],n=[r].concat(n)}let s=t[0];"function"==typeof s&&(s=s(o,n),s===o)||void 0===r&&null==s||(s=J(s),void 0===r||I(o)&&I(s)&&!Array.isArray(s)?function(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];W(e,o,t[o])}}(o,s):W(e,r,s))}function Z(e,t){const n=J(e||{});return[H(n),function(...e){h((()=>Y(n,e)))}]}export{d as a,a as b,Z as c,q as d,$ as e,p as f,k as i,D as m,y as o,T as r,B as t,g as u};