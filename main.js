"use strict";(()=>{var Lt=Object.defineProperty;var Et=(i,t,e)=>t in i?Lt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var m=(i,t,e)=>(Et(i,typeof t!="symbol"?t+"":t,e),e);var C={_inherit:function(i){i._getEvents=this._getEvents,i.on=this.on,i.once=this.once,i.removeListener=this.removeListener,i.emit=this.emit},_getEvents:function(){var i=this.events;return i||(this.events=i={})},on:function(i,t){var e=this,s=e._getEvents()[i];return s||(s=e.events[i]=[]),s.push(t),this},once:function(i,t){var e=this;e.on(i,function s(){if(e.removeListener(i,s))return t.apply(this,arguments)})},removeListener:function(i,t){var e=this,s=e._getEvents()[i];if(s){var o=s.indexOf(t);if(o>=0)return s.splice(o,1),!0}return!1},emit:function(){var i=this,t=arguments[0],e=Array.prototype.slice.call(arguments,1),s=this._getEvents()[t];s&&s.forEach(o=>{o.apply(i,e)})}};Array.prototype.forEach||(Array.prototype.forEach=function(i,t){var e,s;if(this===null)throw new TypeError("this is null or not defined");var o=Object(this),n=o.length>>>0;if({}.toString.call(i)!="[object Function]")throw new TypeError(i+" is not a function");for(t&&(e=t),s=0;s<n;){var r;s in o&&(r=o[s],i.call(e,r,s,o)),s++}});Array.prototype.remove=function(i){var t=this.indexOf(i);return t>=0?this.splice(t,1):null};Array.prototype.insertBefore=function(i,t){var e=this.indexOf(t);if(e<0)throw"insertBefore: before not found";this.splice(e,0,i)};Array.prototype.insertAfter=function(i,t){var e=this.indexOf(t);if(e<0)throw"insertAfter: after not found";this.splice(e+1,0,i)};Array.prototype.sample=function(){return this[Math.floor(this.length*Math.random())]};Array.prototype.max=function(){return Math.max.apply(Math,array)};Array.prototype.min=function(){return Math.min.apply(Math,array)};Array.prototype.maxF=function(i){return this.reduce((t,e)=>t===void 0||i(t,e)<0?e:t,void 0)};Array.prototype.minF=function(i){return this.reduce((t,e)=>t===void 0||i(t,e)>0?e:t,void 0)};Array.prototype.contains=function(i){return this.indexOf(i)!==-1};Array.prototype.compact=function(){return this.filter(i=>i!=null)};Object.prototype.merge=function(i,t){for(var e in t)t.hasOwnProperty(e)&&(i[e]=t[e])};Object.values=function(i){var t=[];for(var e in i)i.hasOwnProperty(e)&&t.push(i[e]);return t};Object.keys=function(i){var t=[];for(var e in i)i.hasOwnProperty(e)&&t.push(e);return t};Boolean.prototype.toNumber=function(){return this?1:0};Math.rnd=function(){return(Math.random()-.5)*2};Math.clamp=function(i,t,e){return Math.max(t,Math.min(e,i))};Math.sign=function(i){return i===0?0:i<0?-1:1};Math.easeInOutCubic=function(i){return i/=1/2,i<1?1/2*i*i*i:(i-=2,1/2*(i*i*i+2))};Math.easeOutQuad=function(i){return-1*i*(i-2)};var it={};C._inherit(it);(function(){var i=!1;function t(){i||(i=!0,it.emit("load"))}if(document.addEventListener&&document.addEventListener("DOMContentLoaded",t,!1),/KHTML|WebKit|iCab/i.test(navigator.userAgent))var e=setInterval(()=>{/loaded|complete/i.test(document.readyState)&&(t(),clearInterval(e))},10);window.onload=t})();var nt=it;var I=class{constructor(t){this.root=null,this._nextProp=Symbol("_next"+t)}push(t){if(this._nextProp in t)throw typeof t+" "+t.constructor+" already in list "+this._nextProp;t[this._nextProp]=this.root,this.root=t}pop(){if(!(this._nextProp in t))throw typeof t+" "+t.constructor+" not in list "+this._nextProp;let t=this.root;return this.root=t[this._nextProp],t}each(t){let e=this.root;if(!e)return;let s=null,o;for(;e;){o=e[this._nextProp];let n=t(e,I.BREAK,I.DELETE);if(n===I.DELETE){s?s[this._nextProp]=o:this.root=o,delete e[this._nextProp],e=o;continue}else if(n===I.BREAK)break;s=e,e=o}}*iterate(){let t=this.root;if(!t)return;let e=null,s;for(;t;)s=t[this._nextProp],yield t,e=t,t=s}[Symbol.iterator](){return this.iterate()}contains(t){let e=!1;return this.each((s,o)=>{if(s===t)return e=!0,o}),e}},z=I;m(z,"BREAK",Symbol("BREAK")),m(z,"DELETE",Symbol("DELETE"));var st=z;var b=class{constructor(t){this.root=null,this.tail=null,this._nextProp=Symbol("_next"+t),this._prevProp=Symbol("_prev"+t),this.listeners={added:[],removed:[]}}get first(){return this.root}push(t){if(this._nextProp in t)throw typeof t+" "+t.constructor+" already in list "+this._nextProp;let e=this.root;e&&(e[this._prevProp]=t),t[this._nextProp]=e,t[this._prevProp]=null,this.root=t,this.tail||(this.tail=t),this.each(function(s){if(s[this._nextProp]===s)throw"koek"});for(let s of this.listeners.added)s(t)}pop(){this.remove(this.root)}remove(t){if(!(this._nextProp in t))throw typeof t+" "+t.constructor+" not in list "+this._nextProp;let e=t[this._prevProp],s=t[this._nextProp];this.root===t?this.root=s:e[this._nextProp]=s,s&&(this.tail=e,s[this._prevProp]=e),delete t[this._nextProp],delete t[this._prevProp];for(let o of this.listeners.removed)o(t)}each(t){let e=this.root;if(!e)return;let s;for(;e;){s=e[this._nextProp];let o=t.call(this,e,b.BREAK,b.DELETE);if(o===b.DELETE){this.remove(e),e=s;continue}else{if(o===b.BREAK)break;e=s}}}*iterate(){let t=this.root;if(!t)return;let e;for(;t;)e=t[this._nextProp],yield t,t=e}[Symbol.iterator](){return this.iterate()}eachReverse(t){let e=this.tail;if(!e)return;let s;for(;e;){s=e[this._prevProp];let o=t(e,b.BREAK,b.DELETE);if(o===b.DELETE){this.remove(e),e=s;continue}else{if(o===b.BREAK)break;e=s}}}insertBefore(t,e){let s=t&&t[this._prevProp],o=t;e[this._nextProp]=o,e[this._prevProp]=s,o&&(o[this._prevProp]=e),s?s[this._nextProp]=e:this.root=e;for(let n of this.listeners.added)n(e)}},F=b;m(F,"DELETE",Symbol("DELETE")),m(F,"BREAK",Symbol("BREAK"));var ot=F;function rt(){var i=this;this.lists={},this.objects=new ot("object"),this.named={},this.pendingAdd=new st("pendingAdd"),this.pendingRemove=new st("pendingRemove")}var S=rt.prototype;S.add=function(i){this.pendingAdd.push(i)};S.createIndexList=function(i){var t=new ot(i);return t.property=i,t};S.remove=function(i){this.pendingRemove.contains(i)||this.pendingRemove.push(i)};S.clear=function(i){var t=this;t.handlePending();for(let e of t.objects)t.remove(e);t.handlePending()};S.handlePending=function(){var i=this;i.pendingAdd.root,i.pendingAdd.each((t,e,s)=>{console.assert(!t._objectmanager),t._objectmanager=i,i.objects.push(t);for(var o in i.lists)(t[i.lists[o].property]||t.constructor[i.lists[o].property])&&i.lists[o].push(t);if(t.name){if(i.named[t.name])throw"Another object with the same name was already added.";i.named[t.name]=t}return s}),i.pendingRemove.each((t,e,s)=>{delete t.__pendingRemove,console.assert(t._objectmanager===i),t._objectmanager=null,i.objects.remove(t);for(var o in i.lists)(t[i.lists[o].property]||t.constructor[i.lists[o].property])&&i.lists[o].remove(t);return t.name&&delete i.named[t.name],s})};var at=rt;var K=class{constructor(t){this.context=t}clear(){this.save(),this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,9e3,9e3),this.restore()}fillStyle(t){if(t)this.context.fillStyle=t;else return t}strokeStyle(t){if(t)this.context.strokeStyle=t;else return t}font(t){this.context.font=t}circle(t,e,s){this.context.beginPath(),this.context.arc(t,e,s,0,Math.PI*2,!0),this.context.closePath()}rectangle(t,e,s,o){this.context.rect(t,e,s,o)}polygon(t){if(this.context.beginPath(),t.length>0){this.context.moveTo(t[0].x,t[0].y);for(var e=1;e<t.length;e++)this.context.lineTo(t[e].x,t[e].y)}this.context.closePath()}strokePolygon(t){this.polygon(t),this.context.stroke()}fillPolygon(t){this.polygon(t),this.context.fill()}strokeRectangle(t,e,s,o){this.context.strokeRect(t,e,s,o)}fillRectangle(t,e,s,o){this.context.fillRect(t,e,s,o)}strokeCircle(t,e,s){this.circle(t,e,s),this.context.stroke()}fillCircle(t,e,s){this.circle(t,e,s),this.context.fill()}fillLoading(t,e,s,o){var n=this.context,r=(o*360-90)*(Math.PI/180),l=(0-90)*(Math.PI/180);n.beginPath(),n.moveTo(t,e),n.lineTo(t+Math.cos(l)*s,e+Math.sin(l)*s),n.arc(t,e,s,l,r,!1),n.lineTo(t,e),n.closePath(),n.fill()}shadow(t,e,s,o,n){this.context.shadowColor=t,this.context.shadowBlur=e,this.context.shadowOffsetX=s,this.context.shadowOffsetY=o,n(),this.context.shadowColor="",this.context.shadowBlur=0,this.context.shadowOffsetX=0,this.context.shadowOffsetY=0}line(t,e,s,o){this.context.beginPath(),this.context.moveTo(t,e),this.context.lineTo(s,o),this.context.closePath()}strokeLine(t,e,s,o){this.line(t,e,s,o),this.context.stroke()}strokeCross(t,e,s){this.strokeLine(t-s,e-s,t+s,e+s),this.strokeLine(t+s,e-s,t-s,e+s)}strokePlus(t,e,s){this.strokeLine(t-s,e,t+s,e),this.strokeLine(t,e-s,t,e+s)}translate(t,e,s){this.save(),this.context.translate(t,e),s(),this.restore()}rotate(t,e,s,o){this.save(),this.context.translate(t,e),this.context.rotate(s),this.context.translate(-t,-e),o(),this.restore()}scale(t,e,s,o,n){this.save(),this.context.translate(t,e),this.context.scale(s,o),this.context.translate(-t,-e),n(),this.restore()}scalerotate(t,e,s,o,n,r){this.save(),this.context.translate(t,e),this.context.rotate(n),this.context.scale(s,o),this.context.translate(-t,-e),r(),this.restore()}drawImage(t,e,s,o,n,r,l,u,a){!t||this.context.drawImage.apply(this.context,arguments)}drawCenteredImage(t,e,s){this.drawImage(t,e-t.width/2,s-t.height/2)}drawRotatedImage(t,e,s,o){this.rotate(e,s,o,()=>{this.drawImage(t,e,s)})}fillCenteredText(t,e,s){var o=this.context.measureText(t);this.context.fillText(t,e-o.width/2,s)}fillText(t,e,s){this.context.fillText(t,e,s)}save(){this._depth||(this._depth=0),this._depth++,this.context.save()}restore(){if(this._depth<=0)throw console.log("NOES"),"NOES";this.context.restore(),this._depth--}};function ht(i,t){function e(s,o){if(s<i.length){var n=i[s],r=[function(){return e(s+1,arguments)}];return Array.prototype.unshift.apply(r,o),n.apply(null,r)}else return t.apply(null,o)}return function(){e(0,arguments)}}function lt(i,t,e){var s=this;this.objects=new at,this.objects.lists.update=this.objects.createIndexList("updatable"),this.objects.lists.draw=this.objects.createIndexList("drawable"),this.chains={draw:[],update:[]},this.chains.draw.push(this.chains.draw.objects=function(r,l){for(let u of s.objects.lists.draw)u.draw(r);l(r)}),this.chains.update.push(this.chains.update.objects=function(l,u){for(let a of s.objects.lists.update)a.update(l);s.objects.handlePending(),u(l)}),this.canvas=t,this.graphics=new K(t.getContext("2d",{alpha:!1})),this.time=0;var o=0;e.forEach(r=>{var l=r(s,n);l!==n&&n()});function n(){o++,o===e.length&&setTimeout(i,0)}this.components=e}var B=lt.prototype;C._inherit(B);Object.defineProperty(B,"width",{get:function(){return this.canvas.width}});Object.defineProperty(B,"height",{get:function(){return this.canvas.height}});B.start=function(){if(this.isRunning)throw"Already started";var i=this,t={};i.time=0,i.running=t,this.canvas.setAttribute("tabIndex","0"),this.canvas.focus(),this.canvas.oncontextmenu=function(){return!1};var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/60)},s=new Date().getTime();e(o);function o(){var n=new Date().getTime(),r=(n-s)/1e3;s=n,r=1/60,ht(i.chains.update,l=>{})(r),i.time+=r,i.graphics.clear(),ht(i.chains.draw,l=>{})(i.graphics),i.running===t&&e(o)}};B.stop=function(){delete this.running};var ct=lt;function dt(i){return i.state=null,i.changeState=function(t){this.state&&this.state.disable(),this.state=t,this.state&&this.state.enable()},{create:function(t){}}}var ut=class{constructor({game:t}){m(this,"level",null);this.game=t}changeLevel(t){if(this.level){for(let e of this.game.objects.objects)this.game.objects.remove(e);this.level.disable&&this.level.disable()}if(this.game.objects.handlePending(),this.game.emit("levelunloaded"),this.level=t,this.level){for(let e of this.level.objects)this.game.objects.add(e);this.level.enable&&this.level.enable()}this.game.objects.handlePending(),this.game.emit("levelchanged")}restartLevel(){this.changeLevel(this.level.clone({game:this.game}))}hasNextLevel(t){let e=t||this.level;return e&&e.nextLevel}nextLevel(t){let e=(t||this.level).nextLevel({game:this.game});this.changeLevel(e)}},mt=ut;var V=class{constructor(t,e){this.x=t,this.y=e}set(t,e){return this.x=t,this.y=e,this}add(t,e){return this.x+=t,this.y+=e,this}substract(t,e){return this.x-=t,this.y-=e,this}multiply(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t,this.y/=t,this}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}length2(){return this.x*this.x+this.y*this.y}distanceTo(t,e){var s=this.x-t;s*=s;var o=this.y-e;return o*=o,Math.sqrt(s+o)}normalize(){var t=this.length();if(t===0)throw"Normalizing 0!";return this.x/=t,this.y/=t,this}normalizeOr(t,e){var s=this.length();return s===0?(this.x=t,this.y=e,this):(this.x/=s,this.y/=s,this)}normalizeOrZero(){return this.normalizeOr(0,0)}dot(t,e){return this.x*t+this.y*e}negate(){return this.x=-this.x,this.y=-this.y,this}normalRight(){var t=this.x;return this.x=-this.y,this.y=t,this}normalLeft(){var t=this.x;return this.x=this.y,this.y=-t,this}equals(t,e){return this.x===t&&this.y===e}toString(){return"Vector("+this.x+","+this.y+")"}rotate(t){var e=this.length(),s=Math.atan2(this.y,this.x)+t;return this.x=Math.cos(s)*e,this.y=Math.sin(s)*e,this}angleToward(t,e){var s=Math.atan2(this.y,this.x),o=Math.atan2(e,t);return s<-Math.PI/2&&o>Math.PI/2&&(s+=Math.PI*2),o<-Math.PI/2&&s>Math.PI/2&&(o+=Math.PI*2),o-s}angle(){return Math.atan2(this.y,this.x)}clone(){return new V(this.x,this.y)}setV(t){return this.set(t.x,t.y)}addV(t){return this.add(t.x,t.y)}substractV(t){return this.substract(t.x,t.y)}multiplyV(t){return this.multiply(t.x,t.y)}divideV(t){return this.divide(t.x,t.y)}normalizeOrV(t){return this.normalizeOr(t.x,t.y)}dotV(t){return this.dot(t.x,t.y)}equalsV(t){return this.equals(t.x,t.y)}distanceToV(t){return this.distanceTo(t.x,t.y)}angleTowardV(t){return this.angleToward(t.x,t.y)}static distance(t,e,s,o){var n=t-s;n*=n;var r=e-o;return r*=r,Math.sqrt(n+r)}},N=V;m(N,"zero",new V(0,0)),m(N,"xaxis",new V(1,0)),m(N,"yaxis",new V(0,1));var c=N;function ft(i){i.objects.lists.collide=i.objects.createIndexList("collide"),i.objects.lists.collidable=i.objects.createIndexList("collidable"),i.on("postupdate",()=>{i.emit("precollision"),t(),i.emit("postcollision")});function t(){var e=new c(0,0),s=new c(0,0),o=[];for(let a of i.objects.lists.collidable)o=o.concat(a.collisionlines);for(let a of i.objects.lists.collide){if(!a.velocity)return;a.surfaces=[];for(var n=0;n<5;n++){let f=function(g){for(var x=0;x<g.length;x++){var w=g[x];if(!(w.normal.dotV(a.velocity)>0)){e.setV(w.normal),e.normalRight();var L=w.start.distanceToV(w.end);s.setV(a.position),s.substractV(w.start);var j=w.normal.dotV(s)-a.collisionRadius,M=e.dotV(s);if(!(j<-a.collisionRadius*2))if(j<0){var E;M>0&&M<L?(j*=-1,r.push({lineSegment:w,offset:j})):M<0&&M>-a.collisionRadius?(E=a.position.distanceToV(w.start),E<a.collisionRadius&&(e.setV(a.position),e.substractV(w.start),e.normalize(),r.push({lineSegment:w,offset:a.collisionRadius-E}))):M>L&&M<L+a.collisionRadius&&(E=a.position.distanceToV(w.end),E<a.collisionRadius&&(e.setV(a.position),e.substractV(w.end),e.normalize(),r.push({lineSegment:w,offset:a.collisionRadius-E})))}else continue}}};var r=[];if(f(o),r.length>0){r.sort((g,x)=>x.offset-g.offset);var l=r[0];a.position.add(l.lineSegment.normal.x*l.offset,l.lineSegment.normal.y*l.offset);var u=a.velocity.dotV(l.lineSegment.normal);a.velocity.substract(l.lineSegment.normal.x*u,l.lineSegment.normal.y*u),a.surfaces.push(l),a.collide(l)}else{a.surface=null;break}}}}}var W={27:"escape",32:"space",38:"up",40:"down",39:"right",37:"left",13:"enter",16:"shift",219:"[",221:"]"},R;for(R=0;R<27;R++)W[R+65]=String.fromCharCode(R+97);for(R=0;R<10;R++)W[R+48]=String.fromCharCode(R+48);function pt(i){i.keys={},i.canvas.addEventListener("keyup",t=>{var e=W[t.keyCode];e&&(i.keys[e]&&(delete i.keys[e],i.emit("keyup",e)),t.preventDefault())},!0),i.canvas.addEventListener("keydown",t=>{var e=W[t.keyCode];e&&(i.keys[e]||(i.keys[e]=!0,i.emit("keydown",e)),t.preventDefault())},!0)}function Ct(i,t){for(var e in t)i[e]=t[e]}function wt(i){var t={ready:0,total:0,errors:0};Ct(t,C);var e={status:t,images:{},audio:{},loadImage:s,loadAudio:o};function s(l,u){var a=this,f=document.getElementById("image_"+l);return f?(a.images[l]=f,u(null,f)):(f=new Image,f.src="assets/"+l+".png",f.onload=function(){a.images[l]=f,u(null,f)},f.onerror=function(){u("Could not load image "+l)},f)}function o(l,u){var a=this,f=!1,g=10,x=0,w=document.getElementById("audio_"+l);if(w)return a.audio[l]=w,u(null,w);w=new Audio("assets/"+l+".wav");try{w.addEventListener("canplaythrough",j,!1)}catch(M){console.error(M)}function L(){if(!f){if(x>5e3)return u("Could not load audio "+l);w.readyState?j():(x+=g,setTimeout(L,g))}}function j(){w.removeEventListener("canplaythrough",j),f=!0,a.audio[l]=w,u(null,w)}L()}var n=!1,r=null;return It(e,i,l=>{l&&console.error(l),n=!0,r&&r()}),function(l,u){if(l.resources=e,!n)return r=u,u}}function It(i,t,e){var s=this,o=i.status;function n(u,a){!t[u]||t[u].forEach(f=>{o.total++,a.call(i,f,r)})}n("images",i.loadImage),n("audio",i.loadAudio);function r(u){u?(o.errors++,o.emit("changed"),l()):(o.ready++,o.emit("changed"),l())}function l(){o.total<=o.ready+o.errors&&(o.errors>0?e("Not all resources were loaded"):e())}}var xt=class{constructor({game:t,debug:e}){this.game=t,this.update=this.update.bind(this),this.draw=this.draw.bind(this),t.objects.lists.touchable=t.objects.createIndexList("touchable"),t.chains.update.insertBefore(this.update,t.chains.update.objects),e&&t.chains.draw.push(this.draw)}update(t,e){e(t);for(let s of this.game.objects.lists.touchable){for(let o of this.game.objects.lists.touchable)this.detectTouch(s,o);if(s.touching.size)for(let o of s.touching)this.detectTouch(s,o)}}detectTouch(t,e){if(t!==e){var s=t._objectmanager&&e._objectmanager&&t.position.distanceToV(e.position)<=t.touchRadius+e.touchRadius;this.handleTouch(t,e,s),this.handleTouch(e,t,s)}}handleTouch(t,e,s){t.touching||(t.touching=new Set);var o=t.touching.has(e);s!==o&&(s?(t.touching.add(e),t.touch&&t.touch(e)):(t.touching.delete(e),t.untouch&&t.untouch(e)))}draw(t,e){e(t);for(let s of this.game.objects.lists.touchable)t.strokeStyle("red"),t.strokeCircle(s.position.x,s.position.y,s.touchRadius)}},yt=xt;var gt=class{constructor({game:t}){this.game=t,this.reload=this.reload.bind(this),this.mousemove=this.mousemove.bind(this),this.keydown=this.keydown.bind(this),this.draw=this.draw.bind(this)}enable(){this.timeout=setTimeout(this.reload,3e3),this.game.once("keydown",this.keydown),this.game.once("mousemove",this.mousemove),this.game.chains.draw.unshift(this.draw)}reload(){document.location.reload(!0)}keydown(){this.disable()}mousemove(){this.disable()}draw(t,e){e(t),t.fillStyle("#ff0000"),t.fillCircle(this.game.width,0,30),t.fillStyle("black")}disable(){clearTimeout(this.timeout),game.chains.draw.remove(this.draw)}},vt=gt;var bt=class extends c{constructor({game:t,debug:e}){super(0,0);m(this,"over",!1);m(this,"buttons",{});this.game=t,this.mouseup=this.mouseup.bind(this),this.mousedown=this.mousedown.bind(this),this.mousemove=this.mousemove.bind(this),this.mousewheel=this.mousewheel.bind(this),this.DOMMouseScroll=this.DOMMouseScroll.bind(this),this.game.canvas.addEventListener("pointerup",this.mouseup,!0),this.game.canvas.addEventListener("pointerdown",this.mousedown,!0),this.game.canvas.addEventListener("pointermove",this.mousemove,!0),this.game.canvas.addEventListener("mousewheel",this.mousewheel,!0),this.game.canvas.addEventListener("DOMMouseScroll",this.DOMMouseScroll,!0),e&&t.chains.draw.push(this.drawDebug)}getMousePosition(t){let e=this.game.canvas.getBoundingClientRect(),s=e.right-e.left,o=e.bottom-e.top,n=new c(t.pageX-e.x,t.pageY-e.y);return n.x*=this.game.width/s,n.y*=this.game.height/o,n}mouseup(t){return this.game.mouse.buttons[t.button]&&(this.setV(this.getMousePosition(t)),delete this.buttons[t.button],this.game.emit("mouseup",t.button,this.x,this.y)),!1}mousedown(t){return this.buttons[t.button]||(this.setV(this.getMousePosition(t)),this.buttons[t.button]=!0,this.game.emit("mousedown",t.button,this.x,this.y)),!1}mousemove(t){this.setV(this.getMousePosition(t)),this.game.emit("mousemove",this.x,this.y)}mousewheel(t){this.setV(this.getMousePosition(t)),this.game.emit("mousewheel",t.deltaY,this.x,this.y)}DOMMouseScroll(t){this.setV(this.getMousePosition(t)),this.game.emit("mousewheel",-t.detail)}drawDebug(t,e){t.fillStyle(this.buttons.length?"red":"blue");let s=new c;this.game.camera.screenToWorld(this,s),t.fillCircle(s.x,s.y,20),e(t)}},Rt=bt;var k=class{constructor({x:t,y:e}){this.position=new c(t,e)}};function P(i,t,e){return i+(t-i)*e}function kt(i){return i[i.length*Math.random()|0]}var T=class extends k{constructor({x:t,y:e,image:s,origin:o}){super({x:t,y:e});m(this,"bobAngle",.1);m(this,"bobRate",.2);o||(o=new c(s.width/2,s.height-10)),this.origin=o,this.image=s,this.velocity=new c(0,0),this.position=new c(t,e),this.state="Idle",this.angle=0,this.animationTime=0}draw(t){t.save(),t.context.translate(this.position.x,this.position.y),t.context.scale(this.flipped?-1:1,1),t.context.rotate(this.angle),t.drawImage(this.image,-this.origin.x,-this.origin.y),t.restore()}update(t){this.position.addV(this.velocity.clone().multiply(t)),this.walkingAnimation(t)}walkingAnimation(t){switch(this.animationTime+=t,this.state){case"Idle":this.angle=0;break;case"Walking":{this.updateBobbing(t);break}}}updateBobbing(t,e=this.bobRate,s=this.bobAngle){let o=this.animationTime%(e*2)>e;this.angle=o?-s:s}};var O=class extends T{constructor({x:t,y:e,image:s,origin:o}){super({x:t,y:e,image:s,origin:o});m(this,"collisionRadius",40);m(this,"touchable",!0);m(this,"touchRadius",41);m(this,"bobAngle",.05);this.movement=new c(0,0)}update(t){super.update(t),this.velocity.setV(this.movement.clone().multiply(300)),this.movement.x!=0||this.movement.y!=0?this.state="Walking":this.state="Idle"}touch(t){}};var q=class{constructor({game:t,player:e,onFail:s,onSuccess:o}){this.game=t,this.player=e,this.panicOMeterValue=0,this.time=30,this.onFail=s,this.onSuccess=o,this.draw=this.draw.bind(this),this.update=this.update.bind(this),this.keydown=this.keydown.bind(this),this.resetPanicCountdown()}enable(){this.game.resources.audio.bell.play(),this.game.chains.update.push(this.update),this.game.chains.draw.push(this.draw),this.game.on("keydown",this.keydown)}disable(){this.game.chains.update.remove(this.update),this.game.chains.draw.remove(this.draw),this.game.removeListener("keydown",this.keydown)}keydown(t){}update(t,e){this.updateMovement(t),this.updatePanicKids(t),this.updatePanicOMeter(t),this.time-=t,this.time<=1.8&&this.game.resources.audio.bell.play(),this.time<=0&&this.onSuccess(),e(t)}updateMovement(t){function e(r){return r?1:0}let s=this.game.keys,o=e(s.d)-e(s.a),n=e(s.s)-e(s.w);this.player.movement.set(o,n).normalizeOrZero()}updatePanicKids(t){this.panicCountdown-=t,this.panicCountdown<=0&&this.panicChild()}updatePanicOMeter(t){let e=0;for(let s of this.game.objects.lists.kids)e+=s.state=="Panic"?1:0;e=e/5,e>this.panicOMeterValue&&(this.panicOMeterValue+=t),e<this.panicOMeterValue&&(this.panicOMeterValue-=t),this.panicOMeterValue>=1&&this.onFail()}draw(t,e){this.drawClock(t),this.drawPanicOMeter(t),e(t)}drawClock(t){let e=this.game.resources.images.clock_background;t.drawCenteredImage(e,200,200),t.fillStyle("#7CFC00"),t.fillLoading(200,200,130,-this.time/30);let s=this.game.resources.images.clock_stripes;t.drawCenteredImage(s,200,200);let o=this.game.resources.images.clock_hand;t.rotate(200,200,-this.time/30*Math.PI*2-.5*Math.PI,()=>{t.drawCenteredImage(o,200,200)})}drawPanicOMeter(t){let e=this.game.resources.images.panic_o_meter,s=this.game.resources.images.needle;t.drawCenteredImage(e,2400,150),t.rotate(2400,250,P(-1*Math.PI,-.01*Math.PI,this.panicOMeterValue),()=>{t.drawCenteredImage(s,2400,250)})}panicChild(){let t=[...this.game.objects.lists.kids].filter(s=>s.state!=="Panic");kt(t).panic(),this.resetPanicCountdown()}resetPanicCountdown(){this.panicCountdown=P(3,5,Math.random())}};var G=class{constructor(t,e,s,o){this.start=new c(t,e),this.end=new c(s,o),this.normal=new c(0,0),this.recalculate()}recalculate(){var t=this.normal;t.setV(this.end),t.substractV(this.start),this.length=t.length(),t.normalize(),t.normalLeft()}};var p=new c,$=new c;function Pt(i){var t=[],e=i[i.length-1];return i.forEach(function(s){t.push(new G(e.x,e.y,s.x,s.y)),e=s}),t}function Vt(i,t,e,s){for(var o=0;o<e.length;o++){var n=e[o];if(!(n.normal.dot(i.velocity.x,i.velocity.y)>0)){p.setV(n.normal),p.normalRight();var r=n.start.distanceToV(n.end);$.set(i.position.x,i.position.y),$.substractV(n.start);var l=n.normal.dotV($)-t,u=p.dotV($);if(!(l<-t*2))if(l<0){var a;u>0&&u<r?(l*=-1,s.push({object:n,normal:n.normal,offset:l})):u<0&&u>-t?(a=n.start.distanceTo(i.position.x,i.position.y),a<t&&(p.set(i.position.x,i.position.y),p.substractV(n.start),p.normalize(),s.push({object:n,normal:n.normal,offset:t-a}))):u>r&&u<r+t&&(a=n.end.distanceTo(i.position.x,i.position.y),a<t&&(p.set(i.position.x,i.position.y),p.substractV(n.end),p.normalize(),s.push({object:n,normal:n.normal,offset:t-a})))}else continue}}}function Tt(i,t){return t.offset-i.offset}function Ot(i,t,e,s){for(var o=0;o<5;o++){var n=[];if(Vt(i,i.collisionRadius,e,n),n.length>0){n.sort(Tt);var r=n[0];p.set(i.position.x,i.position.y),p.add(r.normal.x*r.offset,r.normal.y*r.offset),i.position.x=p.x,i.position.y=p.y;var l=r.normal.dot(i.velocity.x,i.velocity.y);p.set(i.velocity.x,i.velocity.y),p.substract((1+t)*r.normal.x*l,(1+t)*r.normal.y*l),i.velocity.x=p.x,i.velocity.y=p.y,s.push(n[0])}else break}}function At(i,t,e){var g,x;let s=(g=i.mass)!=null?g:1,o=(x=t.mass)!=null?x:1,n=i.collisionRadius,r=t.collisionRadius;p.set(i.position.x,i.position.y),p.substract(t.position.x,t.position.y);var l=p.length();if(l<n+r){var u=s+o;p.normalizeOrZero();var a=n+r-l-1;i.position.x+=a*p.x*(o/u),i.position.y+=a*p.y*(o/u),t.position.x-=a*p.x*(s/u),t.position.y-=a*p.y*(s/u);var f=p.dot(i.velocity.x-t.velocity.x,i.velocity.y-t.velocity.y);return f<0&&(p.multiply(f*(1+e)),i.velocity.x-=p.x*(o/u),i.velocity.y-=p.y*(o/u),t.velocity.x+=p.x*(s/u),t.velocity.y+=p.y*(s/u)),{object:i,normal:p.clone(),bounced:f<0}}return null}function _t(i,t){for(var e=i.map(function(n){return[n,[]]}),s=0;s<5;s++){var o=!0;if(e.forEach(function(n){var r=n[0],l=n[1],u=l.length;Ot(r,.7,t,l);var a=r;e.forEach(function(f){if(n!==f){var g=f[0],x=At(a,g,.7);x&&(n[1].push(x),f[1].push({object:a,normal:x.normal.clone().negate()}))}}),u!==l.length&&(o=!1)}),o)break}return e}var Z=class{constructor({game:t,onNext:e}){this.game=t,this.onNext=e,this.update=this.update.bind(this),this.draw=this.draw.bind(this),this.keydown=this.keydown.bind(this),this.mousedown=this.mousedown.bind(this)}enable(){this.game.resources.audio.fail.play(),this.game.chains.draw.insertBefore(this.draw,this.game.chains.draw.objects),this.game.chains.update.unshift(this.update),this.game.on("keydown",this.keydown),this.game.on("mousedown",this.mousedown)}disable(){this.game.chains.draw.remove(this.draw),this.game.chains.update.remove(this.update),this.game.removeListener("keydown",this.keydown),this.game.removeListener("mousedown",this.mousedown)}mousedown(){this.onNext()}keydown(t){t==="space"&&this.onNext()}update(t,e){}draw(t,e){t.drawImage(this.game.resources.images.failed,0,0)}};var A=class extends T{constructor({x:t,y:e,image:s,exclamation:o,tears:n,origin:r}){super({x:t,y:e,image:s,origin:r});m(this,"kid",!0);m(this,"collisionRadius",20);m(this,"touchable",!0);m(this,"touchRadius",21);m(this,"bobAngle",.1);m(this,"areaRadius",500);this.exclamation=o,this.tears=n,this.time=P(1,5,Math.random()),this.areaCenter=new c(t,e)}update(t){if(super.update(t),this.time-=t,this.state==="Walking")this.velocity.setV(this.targetPosition).substractV(this.position).normalizeOrZero().multiply(100);else if(this.state==="Idle")this.velocity.set(0,0);else if(this.state==="Panic"){let e=this.velocity.length2()===0?new c(1,0).rotate(Math.PI*2*Math.random()):this.velocity.clone().normalize();this.velocity.setV(e).multiply(200),this.updateBobbing(t,this.bobRate/2)}this.time>0||this[`transitionFrom${this.state}`]()}transitionFromIdle(){this.state="Walking",this.time=P(.5,2,Math.random()),this.targetPosition=new c(this.areaRadius,0).rotate(Math.random()*Math.PI*2).addV(this.areaCenter)}transitionFromWalking(){this.state="Idle",this.time=P(3,5,Math.random()),this.velocity.set(0,0)}transitionFromPanic(){this.transitionFromIdle()}touch(t){t instanceof O&&this.transitionFromIdle()}panic(){this.state="Panic",this.time=99999}draw(t){if(super.draw(t),this.state==="Panic"){let e=this.tears[this.time*4%this.tears.length|0];t.drawCenteredImage(e,this.position.x,this.position.y-113),t.drawCenteredImage(this.exclamation,this.position.x,this.position.y-200)}}drawDebug(t){t.strokeStyle("blue"),t.strokeCircle(this.areaCenter.x,this.areaCenter.y,this.areaRadius),this.targetPosition&&t.strokeCross(this.targetPosition.x,this.targetPosition.y,20)}};var d=class extends k{constructor({x:t,y:e,collisionRadius:s}){super({x:t,y:e});m(this,"mass",1e3);this.velocity=new c(0,0),this.collisionRadius=s}};var H=class extends k{constructor(){super(...arguments);m(this,"start",!0);m(this,"export",!0);m(this,"editorVisible",!0)}drawForeground(t){t.drawCenteredImage(images.test,this.position.x,this.position.y)}};var y=class extends k{constructor({x:t,y:e,image:s,origin:o,collisionRadius:n}){super({x:t,y:e,collisionRadius:n});m(this,"mass",1e3);o||(o=new c(s.width/2,s.height)),this.image=s,this.origin=o,this.velocity=new c(0,0),n!==!1&&(this.collisionRadius=n||80)}draw(t){t.save(),t.context.translate(this.position.x,this.position.y),t.drawImage(this.image,-this.origin.x,-this.origin.y),t.restore()}};function v({game:i}){let t=i.resources.images;return[new H({x:700,y:500}),new y({image:t.school,x:1400,y:250,collisionRadius:100,origin:new c(t.school.width/2,.7*t.school.height)}),new y({image:t.tree_1,x:400,y:1200,collisionRadius:100,origin:new c(t.tree_1.width/2,.7*t.tree_1.height)}),new y({image:t.tree_2,x:2400,y:700,collisionRadius:110,origin:new c(t.tree_2.width/2,.7*t.tree_2.height)}),new y({image:t.tiny_tree_1,x:500,y:550,collisionRadius:50,origin:new c(t.tiny_tree_1.width/2,.9*t.tiny_tree_1.height)}),new y({image:t.tiny_tree_2,x:2300,y:1300,collisionRadius:50,origin:new c(t.tiny_tree_2.width/2,.9*t.tiny_tree_2.height)}),new y({image:t.bush_1,x:400,y:600,collisionRadius:70,origin:new c(t.bush_1.width/2,.7*t.bush_1.height)}),new y({image:t.bush_2,x:2100,y:1400,collisionRadius:50,origin:new c(t.bush_2.width/2,.7*t.bush_2.height)}),new y({image:t.bush_3,x:600,y:1250,collisionRadius:50,origin:new c(t.bush_3.width/2,.7*t.bush_3.height)}),new y({image:t.bushes_1,x:1200,y:800,collisionRadius:80,origin:new c(t.bushes_1.width/2,.7*t.bushes_1.height)}),new y({image:t.bushes_2,x:2500,y:800,collisionRadius:80,origin:new c(t.bushes_2.width/2,.6*t.bushes_2.height)}),new y({image:t.seesaw,x:1500,y:1200,collisionRadius:!1,origin:new c(t.seesaw.width/2,.8*t.seesaw.height)}),new y({image:t.slide,x:1800,y:500,collisionRadius:!1,origin:new c(t.slide.width/2,.7*t.slide.height)}),new y({image:t.swings,x:700,y:900,collisionRadius:!1}),new d({x:937,y:882,collisionRadius:20}),new d({x:1008,y:819,collisionRadius:20}),new d({x:487,y:832,collisionRadius:20}),new d({x:402,y:878,collisionRadius:20}),new d({x:1656,y:573,collisionRadius:20}),new d({x:1723,y:557,collisionRadius:20}),new d({x:1785,y:548,collisionRadius:20}),new d({x:1845,y:535,collisionRadius:20}),new d({x:1890,y:531,collisionRadius:20}),new d({x:1930,y:528,collisionRadius:20}),new d({x:1962,y:528,collisionRadius:20}),new d({x:1227,y:1231,collisionRadius:20}),new d({x:1290,y:1228,collisionRadius:20}),new d({x:1338,y:1226,collisionRadius:20}),new d({x:1392,y:1226,collisionRadius:20}),new d({x:1470,y:1219,collisionRadius:20}),new d({x:1544,y:1212,collisionRadius:20}),new d({x:1609,y:1201,collisionRadius:20}),new d({x:1678,y:1201,collisionRadius:20}),new d({x:1733,y:1201,collisionRadius:20}),new d({x:1757,y:1209,collisionRadius:20}),new d({x:2020,y:1408,collisionRadius:20}),new d({x:2171,y:1392,collisionRadius:20}),new d({x:2395,y:829,collisionRadius:20}),new d({x:1088,y:809,collisionRadius:20}),new d({x:1300,y:816,collisionRadius:20}),new d({x:527,y:832,collisionRadius:20}),new d({x:598,y:834,collisionRadius:20}),new d({x:632,y:834,collisionRadius:20}),new d({x:697,y:829,collisionRadius:20}),new d({x:745,y:831,collisionRadius:20}),new d({x:792,y:831,collisionRadius:20}),new d({x:828,y:831,collisionRadius:20}),new d({x:871,y:827,collisionRadius:20}),new d({x:905,y:822,collisionRadius:20}),new d({x:943,y:822,collisionRadius:20}),new d({x:966,y:816,collisionRadius:20}),new d({x:458,y:873,collisionRadius:20}),new d({x:502,y:869,collisionRadius:20}),new d({x:597,y:876,collisionRadius:20}),new d({x:658,y:870,collisionRadius:20}),new d({x:707,y:870,collisionRadius:20}),new d({x:752,y:866,collisionRadius:20}),new d({x:820,y:866,collisionRadius:20}),new d({x:878,y:872,collisionRadius:20}),new d({x:1754,y:547,collisionRadius:20})]}function _({game:i,amount:t}){let e=i.resources.images,s=[],o=t;function n(){return e[`child_${Math.floor(Math.random()*(6-1+1)+1)}`]}for(;o>0;){let r=n(),l=i.getRandomPosition();s.push(new A({image:r,exclamation:e.exclamation,tears:[e.tears_1,e.tears_2],x:l.x,y:l.y,origin:new c(r.width/2,.9*r.height),getRandomPosition:i.getRandomPosition})),o--}return s}function Q({game:i}){let t=50;return{objects:[...v({game:i}),..._({game:i,amount:t})],clone:Q}}function U({game:i}){let t=32;return{objects:[...v({game:i}),..._({game:i,amount:t})],clone:U,nextLevel:Q}}function J({game:i}){let t=15;return{objects:[...v({game:i}),..._({game:i,amount:t})],nextLevel:U,clone:J}}function Y({game:i}){let t=10;return{objects:[...v({game:i}),..._({game:i,amount:t})],nextLevel:J,clone:Y}}function D({game:i}){let t=i.resources.images,e=[];for(let s of[1,2,3,4,5,6]){let o=t[`child_${s}`],n=i.getRandomPosition();e.push(new A({image:o,exclamation:t.exclamation,tears:[t.tears_1,t.tears_2],x:n.x,y:n.y,origin:new c(o.width/2,.9*o.height),getRandomPosition:i.getRandomPosition}))}return{objects:[...v({game:i}),...e],nextLevel:Y,clone:D}}var X=class{constructor({game:t,onNext:e}){this.game=t,this.onNext=e,this.update=this.update.bind(this),this.draw=this.draw.bind(this),this.keydown=this.keydown.bind(this),this.mousedown=this.mousedown.bind(this)}enable(){this.game.chains.draw.insertBefore(this.draw,this.game.chains.draw.objects),this.game.chains.update.unshift(this.update),this.game.on("keydown",this.keydown),this.game.on("mousedown",this.mousedown)}disable(){this.game.chains.draw.remove(this.draw),this.game.chains.update.remove(this.update),this.game.removeListener("keydown",this.keydown),this.game.removeListener("mousedown",this.mousedown)}mousedown(t){console.log(t),this.onNext()}keydown(t){console.log(t),t==="space"&&this.onNext()}update(t,e){}draw(t,e){t.drawImage(this.game.resources.images.next_level,0,0)}};var tt=class{constructor({game:t,onNext:e}){this.game=t,this.onNext=e,this.update=this.update.bind(this),this.draw=this.draw.bind(this),this.keydown=this.keydown.bind(this),this.mousedown=this.mousedown.bind(this)}enable(){this.game.resources.audio.fail.play(),this.game.chains.draw.insertBefore(this.draw,this.game.chains.draw.objects),this.game.chains.update.unshift(this.update),this.game.on("keydown",this.keydown),this.game.on("mousedown",this.mousedown)}disable(){this.game.chains.draw.remove(this.draw),this.game.chains.update.remove(this.update),this.game.removeListener("keydown",this.keydown),this.game.removeListener("mousedown",this.mousedown)}mousedown(){this.onNext()}keydown(t){t==="space"&&this.onNext()}update(t,e){}draw(t,e){t.drawImage(this.game.resources.images.end,0,0)}};var jt=class extends c{constructor({game:t,worldWidth:e}){super(0,0);m(this,"zoom",1);this.game=t,this.worldWidth=e!=null?e:t.width,this.draw=this.draw.bind(this),this.game.chains.draw.camera=this.draw,this.game.chains.draw.insertBefore(this.draw,this.game.chains.draw.objects),this.reset()}screenToWorld(t,e){var s=this.getPixelsPerMeter();e.x=t.x/s+this.game.camera.x,e.y=t.y/s+this.game.camera.y}getPixelsPerMeter(){let t=this.worldWidth;return this.game.width/t/this.game.camera.zoom}reset(){this.x=0,this.y=0}draw(t,e){var s=this.getPixelsPerMeter();t.save(),t.context.scale(s,s),t.context.lineWidth/=s,t.context.translate(this.x,-this.y),e(t),t.restore()}},Mt=jt;var et=class{constructor({game:t,onNext:e}){this.game=t,this.onNext=e,this.update=this.update.bind(this),this.draw=this.draw.bind(this),this.info=!1,this.keydown=this.keydown.bind(this),this.mousedown=this.mousedown.bind(this)}enable(){this.game.chains.draw.insertBefore(this.draw,this.game.chains.draw.objects),this.game.chains.update.unshift(this.update),this.game.on("keydown",this.keydown),this.game.on("mousedown",this.mousedown)}disable(){this.game.chains.draw.remove(this.draw),this.game.chains.update.remove(this.update),this.game.removeListener("keydown",this.keydown),this.game.removeListener("mousedown",this.mousedown)}mousedown(){this.info?this.onNext():this.info=!0}keydown(t){t==="space"&&(this.info?this.onNext():this.info=!0)}update(t,e){}draw(t,e){t.drawImage(this.game.resources.images.start,0,0),this.info&&t.drawImage(this.game.resources.images.info,0,0)}};var h,St={audio:["test","bell","fail"],images:["test","blurred_grass","bush_1","bush_2","bush_3","bushes_1","bushes_2","child_1","child_2","child_3","child_4","child_5","child_6","school","stones","teacher","tiny_tree_1","tiny_tree_2","tree_1","tree_2","seesaw","slide","swings","exclamation","panic_o_meter","needle","failed","tears_1","tears_2","next_level","clock_background","clock_hand","clock_stripes","end","start","info"]};nt.once("load",()=>{let i=document.getElementById("main");h=new ct(Bt,i,[pt,wt(St),dt,ft]),h.mouse=new Rt({game:h}),h.resources.status.on("changed",()=>{h.graphics.context.clearRect(0,0,h.width,h.height),h.graphics.context.fillStyle="black",h.graphics.context.font="arial",h.graphics.fillCenteredText(`Preloading ${h.resources.status.ready} / ${h.resources.status.total}...`,400,300)})});function Bt(i){i&&console.error(i);let t=h.resources.images;h.objects.lists.start=h.objects.createIndexList("start"),h.objects.lists.player=h.objects.createIndexList("player"),h.objects.lists.draw=h.objects.createIndexList("draw"),h.objects.lists.update=h.objects.createIndexList("update"),h.objects.lists.collidable=h.objects.createIndexList("collisionRadius"),h.objects.lists.kids=h.objects.createIndexList("kid"),h.autoRefresh=new vt({game:h}),h.touchSystem=new yt({game:h,debug:!1}),h.levelSystem=new mt({game:h}),h.camera=new Mt({game:h,worldWidth:2800});function e(a,f){a.fillStyle("lightgray"),a.fillRectangle(0,0,h.width,h.height),f(a)}function s(a,f){a.drawImage(t.stones,0,0),a.drawImage(t.blurred_grass,0,0),f(a)}h.chains.draw.insertBefore(e,h.chains.draw.camera),h.chains.draw.insertAfter(s,h.chains.draw.camera),h.chains.draw.push((a,f)=>{let g=[...h.objects.lists.draw].sort((x,w)=>x.position.y-w.position.y);for(let x of g)x.draw(a);f(a)});let o=Pt([new c(0,390),new c(0,1600),new c(2800,1600),new c(2800,336)]);h.chains.update.push((a,f)=>{_t([...h.objects.lists.collidable],o),f(a)}),h.getRandomPosition=function(){return new c(P(0,2800,Math.random()),P(500,1575,Math.random()))};let n;h.on("levelchanged",()=>{for(let a of h.objects.lists.start){n=new O({x:a.position.x,y:a.position.y,image:t.teacher}),h.objects.add(n);break}});function r(){h.changeState(new q({game:h,player:n,onFail:l,onSuccess:u}))}function l(){h.changeState(new Z({game:h,player:n,onNext:()=>{h.levelSystem.restartLevel(),r()}}))}function u(){h.levelSystem.hasNextLevel()?h.changeState(new X({game:h,player:n,onNext:()=>{h.levelSystem.nextLevel(),r()}})):h.changeState(new tt({game:h,player:n,onNext:()=>{h.levelSystem.changeLevel(D({game:h})),r()}}))}h.changeState(new et({game:h,onNext:()=>{h.levelSystem.changeLevel(D({game:h})),r()}})),h.start(),window.game=h}})();
//# sourceMappingURL=main.js.map
