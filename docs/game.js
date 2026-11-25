var Ri=(i,t,e)=>Math.max(t,Math.min(e,i)),ul=Math.PI*2,cl=21,pf=86,fh=5.45,hl=11,ph=.435,mh=-2.65;function gh(i,t){let e=0,n=i,s=8;for(;n>=s;)n-=s,e++,s=8+6*e;let r=ul*n/s+.21+e*.18,a=.93+(t-1)*.46+e*.51;return[Math.cos(r)*a,Math.sin(r)*a*.92]}var ea=class{constructor(t=()=>{}){this.emit=t,this.reset()}reset(){this.seed=129920,this.sequence=0,this.phase="ready",this.elapsed=0,this.distance=0,this.captainZ=0,this.caught=!1,this.lossReason=null,this.round=(this.round??-1)+1,this.worldAdvance=0,this.x=-3.95,this.targetX=this.x,this.velocity=0,this.absorbed=0,this.scale=1,this.visualScale=1,this.recoil=0,this.mergeGlow=0,this.hurt=0,this.armor=3,this.shots=[],this.allies=[],this.falling=[],this.merging=[],this.runners=[],this.rocketTimer=.18,this.rushTimer=3.8,this.hitGuard=0,this.score=0,this.recruits=0,this.endTime=0,this.wall={x:4.13,z:-cl,hp:72,maxHp:72,flash:0},this.boss={x:-.42,z:-39,hp:800,maxHp:800,hit:0,slam:0,active:!1,attackT:0,impactDone:!1,recovery:0},this.gates=[];let t=(e,n,s)=>this.gates.push({x:e,at:n,z:-n,type:s,active:!0});for(let e=0;e<80;e++){t(-4.65,2.7+e*2.42,"merge");let n=cl+2.35+e*2.12;t(3.1,n,"plus"),t(5.15,n,"plus")}this.columns=Array.from({length:hl},(e,n)=>{let s=mh+n*ph,r=[];for(let a=0;a<104;a++)r.push(this.grunt(s+(a%2-.5)*.13,-12.6-a*.49-n%2*.18));return{x:s,index:n,units:r}});for(let e=0;e<8;e++)this.recruit(this.x,!0)}rand(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}grunt(t,e){return{x:t+(this.rand()-.5)*.16,z:e+(this.rand()-.5)*.08,id:++this.sequence,phase:this.rand()*ul,size:.92+this.rand()*.13,alive:!0}}event(t,e,n,s,r=1){this.emit({kind:t,x:e,y:n,z:s,strength:r})}start(){this.phase==="ready"&&(this.phase="run")}aim(t){this.targetX=Ri(t,-fh,fh)}get playing(){return this.phase==="run"||this.phase==="boss"}recruit(t,e=!1){if(this.allies.length>=48)return;let n=new Set(this.allies.map(o=>o.slot)),s=0;for(;n.has(s);)s++;let[r,a]=gh(s,this.scale);this.allies.push({slot:s,x:e?this.x+r:t,z:e?a:-.26,age:e?2:0,shotTimer:.14+this.rand()*.47,phase:this.rand()*ul}),e||(this.recruits++,this.event("plus",t,0,-.08))}crossGates(){let t=.72+Math.min(.75,this.allies.length*.017);for(let e of this.gates){if(e.collectedAt!=null&&(e.pop=this.elapsed-e.collectedAt),e.z=this.distance-e.at,!e.active||e.z<-t||e.z>1.45||this.caught)continue;let n=e.type==="plus"?.86:1.28;if(Math.abs(this.x-e.x)>n+t*.61)continue;if(e.type==="plus"){e.active=!1,e.pop=0,e.collectedAt=this.elapsed,this.recruit(e.x);continue}if(!this.allies.length)continue;e.active=!1,e.pop=0,e.collectedAt=this.elapsed;let s=Math.min(this.allies.length,1+Math.floor(this.absorbed/5)+Math.floor(this.allies.length/9));this.allies.sort((a,o)=>Math.abs(a.x-e.x)-Math.abs(o.x-e.x));let r=this.allies.splice(0,s);for(let a of r)this.merging.push({x:a.x,z:a.z,t:0,phase:a.phase});this.absorbed+=r.length,this.scale=1+Math.min(1.12,this.absorbed*.042)+Math.min(.32,Math.max(0,this.absorbed-27)*.009),this.mergeGlow=1,this.event("merge",this.x,0,0,Math.min(2,1+r.length*.07))}}advanceCrowd(t){let e=1.55*t+this.worldAdvance*.48;for(let n of this.columns){let s=[];for(let a of n.units)a.alive&&(a.z+=e,!(a.z>10)&&(this.contact(a),a.alive&&s.push(a)));n.units=s;let r=s.length?s[s.length-1].z:-63;for(;r>-70;)r-=.49,s.push(this.grunt(n.x+(this.rand()-.5)*.13,r))}if(this.rushTimer-=t,this.rushTimer<=0&&!this.boss.active){this.rushTimer=1.3+this.rand()*.75;let n=Ri(Math.round((this.x-mh)/ph),0,hl-1),s=2+Math.floor(this.rand()*3);for(let r=0;r<s;r++){let a=this.columns[Ri(n+Math.round((this.rand()-.5)*4),0,hl-1)],o=a.units.findIndex(c=>c.z<-6),l=o<0?null:a.units.splice(o,1)[0];l&&(l.speed=2+this.rand()*.62,this.runners.push(l))}}for(let n of this.runners){if(!n.alive)continue;n.z+=(n.speed+this.worldAdvance/Math.max(t,.001)*.25)*t;let s=n.z>-7?1:.32;n.x+=Ri(this.x-n.x,-s*t,s*t),this.contact(n)}this.runners=this.runners.filter(n=>n.alive&&n.z<10)}contact(t){!this.playing||this.caught||Math.abs(t.x-this.x)>.47*this.scale||Math.abs(t.z)>.42||(t.alive=!1,!(this.hitGuard>0)&&(this.hitGuard=this.allies.length?.64:1.16,this.hurt=1,this.allies.length?this.fall(this.allies.pop(),"blue",.7):--this.armor<=0&&this.finish(!1)))}pushWall(t){let e=this.wall,n=(s,r,a)=>e.hp>0&&Math.abs(s-e.x)<2.14+a&&Math.abs(r-e.z)<.32+a;this.allies=this.allies.filter(s=>{if(!n(s.x,s.z,.19))return!0;this.fall(s,"blue",0);let r=this.falling[this.falling.length-1];return r.pushed=!0,r.front=e.z+.55,!1}),n(this.x,this.captainZ,.32*this.visualScale)&&(this.caught=!0),this.caught&&(this.captainZ=Math.max(this.captainZ,e.z+.38),this.captainZ>=4.5&&(this.lossReason="wall",this.finish(!1)))}fall(t,e,n,s=t.x){this.falling.length>95&&this.falling.shift(),this.falling.push({x:t.x,z:t.z,y:.07,t:0,side:e,phase:t.phase||0,size:t.size||1,id:t.id||0,vx:(t.x-s)*1.05+(this.rand()-.5)*2.8*n,vz:(this.rand()-.5)*2.4*n,vy:(1.65+this.rand()*2.3)*n,spin:(this.rand()-.5)*8,roll:(this.rand()-.5)*7})}kill(t,e=1,n=t.x){t.alive&&(t.alive=!1,this.score++,this.fall(t,"red",e,n))}shoot(t){if(this.rocketTimer-=t,this.rocketTimer<=0){this.rocketTimer+=.78,this.recoil=1;let n=this.x+.295*this.visualScale,s=1.31*this.visualScale,r=-.6*this.visualScale,a=1+Math.min(2.1,this.absorbed*.05);this.shots.push({kind:"rocket",x:n,y:s,z:r,originY:s,power:a,age:0,damage:26+Math.min(174,this.absorbed*4.85)}),this.wall.hp>0&&this.wall.z<r&&Math.abs(n-this.wall.x)<2.1&&this.shots.push({...this.shots[this.shots.length-1],wallRound:!0}),this.event("muzzle",n,s,r,a)}let e=!1;for(let n of this.allies)n.shotTimer-=t,!(n.shotTimer>0||n.age<.15)&&(n.shotTimer+=.46+this.rand()*.17,e=!0,this.shots.push({kind:"shot",x:n.x+.13,y:.58,z:n.z-.22,originY:.58,power:1,age:0,damage:2.5}));e&&this.event("smallShot",this.x,.6,0,.64)}frontEnemy(t){let e=null,n=(s,r)=>{s.z<-52||s.z>(r==="boss"?4.5:.45)||e&&(s.z<e.target.z||s.z===e.target.z&&Math.abs(s.x-t)>=Math.abs(e.target.x-t))||(e={target:s,type:r})};this.boss.active&&this.boss.hp>0&&n(this.boss,"boss");for(let s of this.columns)for(let r of s.units)if(!(!r.alive||r.z>.45)){n(r,"grunt");break}for(let s of this.runners)s.alive&&n(s,"grunt");return e}blast(t,e){let n=.95+t.power*.48;for(let s of this.columns)if(!(Math.abs(s.x-t.x)>n+.14))for(let r of s.units){if(r.z<e-n)break;r.alive&&(r.x-t.x)**2+(r.z-e)**2<n*n&&this.kill(r,1.18,t.x)}for(let s of this.runners)s.alive&&(s.x-t.x)**2+(s.z-e)**2<n*n&&this.kill(s,1.18,t.x);this.event("impact",t.x,.06,e,t.power)}advanceShots(t){let e=[];for(let n of this.shots){n.age+=t;let s=n.lock;if(n.wallRound){if(this.wall.hp<=0)continue;s={type:"wall",target:this.wall}}else(!s||s.target.alive===!1||s.type==="grunt"&&s.target.z>.45)&&(s=this.frontEnemy(n.x));if(!s)continue;n.lock=s;let r=s.target,a=s.type==="wall"?0:r.x-n.x,o=(s.type==="boss"?2.15:s.type==="wall"?.86:.48)-n.y,l=r.z+(s.type==="boss"?.55:.12)-n.z,c=Math.max(.001,Math.hypot(a,o,l)),h=t*(n.kind==="rocket"?20:30);n.dirX=a/c,n.dirY=o/c,n.dirZ=l/c;let f=Math.min(h,c);if(n.x+=n.dirX*f,n.y+=n.dirY*f,n.z+=n.dirZ*f,c>h+.1){e.push(n);continue}if(s.type==="wall")r.hp=Math.max(0,r.hp-n.damage*.72),r.flash=1,this.event(r.hp<=0?"wallBreak":"wallHit",n.x,.85,r.z+.22,n.kind==="rocket"?1.15:.45);else if(s.type==="boss"){if(r.hp=Math.max(0,r.hp-n.damage),r.hit=n.kind==="rocket"?.77:Math.max(r.hit,.1),this.event(n.kind==="rocket"?"impact":"hit",n.x,n.y,n.z,n.kind==="rocket"?n.power*.7:.7),r.hp<=0){this.finish(!0);break}}else n.kind==="rocket"?this.blast(n,r.z):(this.kill(r,.72),this.event("hit",r.x,.45,r.z,.65))}this.shots=this.playing?e:[]}updateFalling(t){for(let e of this.falling){if(e.pushed){e.z=Math.max(e.z,e.front),e.z+=this.worldAdvance,e.y=0,e.z>7&&(e.t=2);continue}e.t+=t,e.x+=e.vx*t,e.z+=e.vz*t+this.worldAdvance*.38,e.y+=e.vy*t,e.vy-=8.6*t,e.y<.05&&(e.y=.05,e.vx*=.9,e.vz*=.9)}this.falling=this.falling.filter(e=>e.t<1.02);for(let e of this.merging)e.t+=t;this.merging=this.merging.filter(e=>e.t<.32)}advanceBoss(t){let e=this.boss;if(!e.active){e.z=-39+this.distance*.18,this.distance>=pf&&(e.active=!0,this.phase="boss");return}if(e.recovery=Math.max(0,e.recovery-t),e.attackT>0){if(e.attackT+=t,e.slam=Math.min(1,e.attackT/1.02),e.attackT>=.8&&!e.impactDone&&(e.impactDone=!0,this.event("slam",e.x,.08,e.z+1,2.1),Math.abs(e.x-this.x)<2.25&&Math.abs(e.z)<2.7)){this.finish(!1);return}e.attackT>=1.09&&(e.slam=0,e.attackT=0,e.recovery=.55);return}if(e.z+=t*2.48,e.z>4.5){this.lossReason="breach",this.finish(!1);return}e.x=Ri(e.x+Ri(this.x-e.x,-t*.9,t*.9),-1.13,-.1),e.z>-2.05&&e.z<.6&&Math.abs(e.x-this.x)<1.7&&e.recovery<=0&&(e.attackT=.001,e.impactDone=!1)}landBoss(){let t=this.boss.z-1.55,e=n=>{let s=n.x-this.boss.x,r=n.z-t;if(!n.alive||(s/2.45)**2+(r/3.6)**2>1)return;this.kill(n,1.25,this.boss.x);let a=this.falling[this.falling.length-1];a.vx=Math.sign(s||1)*(3.8+Math.abs(s)),a.vz=r*1.9};for(let n of this.columns){for(let s of n.units)e(s);n.units=n.units.filter(s=>s.alive)}for(let n of this.runners)e(n);this.runners=this.runners.filter(n=>n.alive),this.event("victory",this.boss.x,.1,t,1.3)}finish(t){if(this.playing)if(this.phase=t?"won":"lost",this.endTime=0,t)this.shots=[],this.event("finisher",this.boss.x,2.3,this.boss.z,1.5);else{if(this.event("loss",this.x,0,0),this.lossReason!=="wall"){for(let e of this.allies)this.fall(e,"blue",1.45,this.x);this.allies=[]}this.event("impact",this.x,0,0,1.6)}}tick(t,e=0){if(this.worldAdvance=0,!this.playing){if(this.phase==="won"||this.phase==="lost"){let r=this.endTime;this.endTime+=t,this.boss.hit=Math.max(0,this.boss.hit-4*t),this.phase==="won"&&r<.92&&this.endTime>=.92&&this.landBoss(),this.updateFalling(t)}return}this.elapsed+=t,this.hitGuard=Math.max(0,this.hitGuard-t),this.hurt=Math.max(0,this.hurt-4*t),this.mergeGlow=Math.max(0,this.mergeGlow-2.25*t),this.recoil=Math.max(0,this.recoil-5.1*t),this.wall.flash=Math.max(0,this.wall.flash-4.6*t),this.boss.hit=Math.max(0,this.boss.hit-5.4*t),this.visualScale+=(this.scale-this.visualScale)*(1-Math.exp(-8*t)),e&&this.aim(this.targetX+e*10.2*t);let n=this.x;this.caught||(this.x+=(this.targetX-this.x)*(1-Math.exp(-21*t))),this.velocity=(this.x-n)/Math.max(t,.001);let s=this.boss.active?2.3:3.65;this.worldAdvance=s*t,this.distance+=this.worldAdvance,this.wall.z=this.distance-cl,this.crossGates();for(let r of this.allies){r.age+=t;let[a,o]=gh(r.slot,this.scale),l=Ri(this.x+a,-6.28,6.28);r.x+=(l-r.x)*(1-Math.exp(-19*t)),r.z+=(o-r.z)*(1-Math.exp(-14*t))}this.pushWall(t),this.playing&&(this.advanceCrowd(t),this.updateFalling(t),this.playing&&(this.advanceBoss(t),this.playing&&(this.caught||this.shoot(t),this.advanceShots(t))))}};var $h=0,Xl=1,Kh=2;var wr=1,Qh=2,bs=3,xi=0,en=1,vn=2,Fi=0,Es=1,ql=2,Yl=3,Zl=4,jh=5;var Oi=100,tu=101,eu=102,nu=103,iu=104,su=200,ru=201,au=202,ou=203,Jl=204,$l=205,lu=206,cu=207,hu=208,uu=209,du=210,fu=211,pu=212,mu=213,gu=214,Ra=0,Ca=1,Ia=2,ls=3,Pa=4,La=5,Da=6,Na=7,Ar=0,xu=1,_u=2,zn=0,Kl=1,Ql=2,jl=3,tc=4,ec=5,nc=6,ic=7;var sc=300,Bi=301,Ts=302,ho=303,uo=304,cs=1e3,Un=1001,Ua=1002,ze=1003,vu=1004;var Rr=1005;var Ge=1006,fo=1007;var In=1008;var on=1009,rc=1010,ac=1011,ws=1012,po=1013,Pn=1014,yn=1015,Ln=1016,mo=1017,go=1018,zi=1020,oc=35902,lc=35899,cc=1021,hc=1022,Dn=1023,$n=1026,jn=1027,xo=1028,_o=1029,_i=1030,vo=1031;var yo=1033,Cr=33776,Ir=33777,Pr=33778,Lr=33779,Mo=35840,So=35841,bo=35842,Eo=35843,To=36196,wo=37492,Ao=37496,Ro=37488,Co=37489,Dr=37490,Io=37491,Po=37808,Lo=37809,Do=37810,No=37811,Uo=37812,Fo=37813,Oo=37814,Bo=37815,zo=37816,ko=37817,Go=37818,Ho=37819,Vo=37820,Wo=37821,Xo=36492,qo=36494,Yo=36495,Zo=36283,Jo=36284,Nr=36285,$o=36286;var qs=2300,Fa=2301,Ta=2302,Ul=2303,Fl=2400,Ol=2401,Bl=2402;var yu=3200;var Ur=0,Mu=1,ti="",Ee="srgb",Ys="srgb-linear",Zs="linear",de="srgb";var wa=7680;var Su=519,bu=512,Eu=513,Tu=514,uc=515,wu=516,Au=517,dc=518,fc=519,Ru=35044,Mn=35048;var pc="300 es",mn=2e3,hs=2001;function mf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function gf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cu(){let i=us("canvas");return i.style.display="block",i}var xh={},ds=null;function mc(...i){let t="THREE."+i.shift();ds?ds("log",t,...i):console.log(t,...i)}function Iu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Bt(...i){i=Iu(i);let t="THREE."+i.shift();if(ds)ds("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function zt(...i){i=Iu(i);let t="THREE."+i.shift();if(ds)ds("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Gs(...i){let t=i.join(" ");t in xh||(xh[t]=!0,Bt(...i))}function Pu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Lu={[Ra]:Ra,[Ia]:Da,[Pa]:Pa,[ls]:La,[Ca]:Ca,[Da]:Ia,[Na]:Na,[La]:ls},Fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_h=1234567,Hs=Math.PI/180,fs=180/Math.PI;function ki(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[i&255]+We[i>>8&255]+We[i>>16&255]+We[i>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function Kt(i,t,e){return Math.max(t,Math.min(e,i))}function gc(i,t){return(i%t+t)%t}function xf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function _f(i,t,e){return i!==t?(e-i)/(t-i):0}function Vs(i,t,e){return(1-e)*i+e*t}function vf(i,t,e,n){return Vs(i,t,1-Math.exp(-e*n))}function yf(i,t=1){return t-Math.abs(gc(i,t*2)-t)}function Mf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Sf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function bf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Ef(i,t){return i+Math.random()*(t-i)}function Tf(i){return i*(.5-Math.random())}function wf(i){i!==void 0&&(_h=i);let t=_h+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Af(i){return i*Hs}function Rf(i){return i*fs}function Cf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function If(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Pf(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),f=r((t-n)/2),u=a((t-n)/2),d=r((n-t)/2),p=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*f,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*f,o*c);break;case"ZXZ":i.set(l*f,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*h,o*c);break;default:Bt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _c(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Du(i,t){if(t.constructor===Float32Array)return i;let e=_c(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Nu(i,t){if(t.constructor===Float32Array)return i;let e=_c(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var Ae={DEG2RAD:Hs,RAD2DEG:fs,generateUUID:ki,clamp:Kt,euclideanModulo:gc,mapLinear:xf,inverseLerp:_f,lerp:Vs,damp:vf,pingpong:yf,smoothstep:Mf,smootherstep:Sf,randInt:bf,randFloat:Ef,randFloatSpread:Tf,seededRandom:wf,degToRad:Af,radToDeg:Rf,isPowerOfTwo:Cf,ceilPowerOfTwo:If,floorPowerOfTwo:xc,setQuaternionFromProperEuler:Pf,normalize:Nu,denormalize:Du},Ec=class Ec{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ec.prototype.isVector2=!0;var rt=Ec,je=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],u=r[a+0],d=r[a+1],p=r[a+2],v=r[a+3];if(f!==v||l!==u||c!==d||h!==p){let g=l*u+c*d+h*p+f*v;g<0&&(u=-u,d=-d,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){let _=Math.acos(g),S=Math.sin(_);m=Math.sin(m*_)/S,o=Math.sin(o*_)/S,l=l*m+u*o,c=c*m+d*o,h=h*m+p*o,f=f*m+v*o}else{l=l*m+u*o,c=c*m+d*o,h=h*m+p*o,f=f*m+v*o;let _=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=_,c*=_,h*=_,f*=_}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+h*f+l*d-c*u,t[e+1]=l*p+h*u+c*f-o*d,t[e+2]=c*p+h*d+o*u-l*f,t[e+3]=h*p-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),f=o(r/2),u=l(n/2),d=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"YZX":this._x=u*h*f+c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f-u*d*p;break;case"XZY":this._x=u*h*f-c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f+u*d*p;break;default:Bt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Tc=class Tc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return dl.copy(this).projectOnVector(t),this.sub(dl)}reflect(t){return this.sub(dl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Tc.prototype.isVector3=!0;var N=Tc,dl=new N,vh=new je,wc=class wc{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],v=s[0],g=s[3],m=s[6],_=s[1],S=s[4],y=s[7],A=s[2],T=s[5],x=s[8];return r[0]=a*v+o*_+l*A,r[3]=a*g+o*S+l*T,r[6]=a*m+o*y+l*x,r[1]=c*v+h*_+f*A,r[4]=c*g+h*S+f*T,r[7]=c*m+h*y+f*x,r[2]=u*v+d*_+p*A,r[5]=u*g+d*S+p*T,r[8]=u*m+d*y+p*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,p=e*f+n*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return t[0]=f*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Gs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fl.makeScale(t,e)),this}rotate(t){return Gs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fl.makeRotation(-t)),this}translate(t,e){return Gs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};wc.prototype.isMatrix3=!0;var Vt=wc,fl=new Vt,yh=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mh=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lf(){let i={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===de&&(s.r=Jn(s.r),s.g=Jn(s.g),s.b=Jn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===de&&(s.r=os(s.r),s.g=os(s.g),s.b=os(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ti?Zs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ys]:{primaries:t,whitePoint:n,transfer:Zs,toXYZ:yh,fromXYZ:Mh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:n,transfer:de,toXYZ:yh,fromXYZ:Mh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),i}var se=Lf();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var qi,Oa=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qi===void 0&&(qi=us("canvas")),qi.width=t.width,qi.height=t.height;let s=qi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=us("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Jn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Jn(e[n]/255)*255):e[n]=Jn(e[n]);return{data:e,width:t.width,height:t.height}}else return Bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Df=0,ps=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=ki(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(pl(s[a].image)):r.push(pl(s[a]))}else r=pl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function pl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Oa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Bt("Texture: Unable to serialize Texture."),{})}var Nf=0,ml=new N,qe=class i extends Fn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Un,s=Un,r=Ge,a=In,o=Dn,l=on,c=i.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=ki(),this.name="",this.source=new ps(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ml).x}get height(){return this.source.getSize(ml).y}get depth(){return this.source.getSize(ml).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cs:t.x=t.x-Math.floor(t.x);break;case Un:t.x=t.x<0?0:1;break;case Ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cs:t.y=t.y-Math.floor(t.y);break;case Un:t.y=t.y<0?0:1;break;case Ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=sc;qe.DEFAULT_ANISOTROPY=1;var Ac=class Ac{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,y=(d+1)/2,A=(m+1)/2,T=(h+u)/4,x=(f+v)/4,M=(p+g)/4;return S>y&&S>A?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=T/n,r=x/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=M/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=x/r,s=M/r),this.set(n,s,r,e),this}let _=Math.sqrt((g-p)*(g-p)+(f-v)*(f-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(f-v)/_,this.z=(u-h)/_,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this.w=Kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this.w=Kt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ac.prototype.isVector4=!0;var Se=Ac,Ba=class extends Fn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ge,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new qe({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ge,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ps(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},hn=class extends Ba{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Js=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var za=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var co=class co{constructor(t,e,n,s,r,a,o,l,c,h,f,u,d,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,f,u,d,p,v,g)}set(t,e,n,s,r,a,o,l,c,h,f,u,d,p,v,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new co().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Yi.setFromMatrixColumn(t,0).length(),r=1/Yi.setFromMatrixColumn(t,1).length(),a=1/Yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=a*h,d=a*f,p=o*h,v=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+p*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,p=c*h,v=c*f;e[0]=u+v*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-p,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,p=c*h,v=c*f;e[0]=u-v*o,e[4]=-a*f,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,d=a*f,p=o*h,v=o*f;e[0]=l*h,e[4]=p*c-d,e[8]=u*c+v,e[1]=l*f,e[5]=v*c+u,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,d=a*c,p=o*l,v=o*c;e[0]=l*h,e[4]=v-u*f,e[8]=p*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+p,e[10]=u-v*f}else if(t.order==="XZY"){let u=a*l,d=a*c,p=o*l,v=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+v,e[5]=a*h,e[9]=d*f-p,e[2]=p*f-d,e[6]=o*h,e[10]=v*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Uf,t,Ff)}lookAt(t,e,n){let s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),ri.crossVectors(n,ln),ri.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),ri.crossVectors(n,ln)),ri.normalize(),na.crossVectors(ln,ri),s[0]=ri.x,s[4]=na.x,s[8]=ln.x,s[1]=ri.y,s[5]=na.y,s[9]=ln.y,s[2]=ri.z,s[6]=na.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],v=n[6],g=n[10],m=n[14],_=n[3],S=n[7],y=n[11],A=n[15],T=s[0],x=s[4],M=s[8],C=s[12],I=s[1],w=s[5],R=s[9],O=s[13],L=s[2],B=s[6],V=s[10],H=s[14],et=s[3],X=s[7],Q=s[11],tt=s[15];return r[0]=a*T+o*I+l*L+c*et,r[4]=a*x+o*w+l*B+c*X,r[8]=a*M+o*R+l*V+c*Q,r[12]=a*C+o*O+l*H+c*tt,r[1]=h*T+f*I+u*L+d*et,r[5]=h*x+f*w+u*B+d*X,r[9]=h*M+f*R+u*V+d*Q,r[13]=h*C+f*O+u*H+d*tt,r[2]=p*T+v*I+g*L+m*et,r[6]=p*x+v*w+g*B+m*X,r[10]=p*M+v*R+g*V+m*Q,r[14]=p*C+v*O+g*H+m*tt,r[3]=_*T+S*I+y*L+A*et,r[7]=_*x+S*w+y*B+A*X,r[11]=_*M+S*R+y*V+A*Q,r[15]=_*C+S*O+y*H+A*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],p=t[3],v=t[7],g=t[11],m=t[15],_=l*d-c*u,S=o*d-c*f,y=o*u-l*f,A=a*d-c*h,T=a*u-l*h,x=a*f-o*h;return e*(v*_-g*S+m*y)-n*(p*_-g*A+m*T)+s*(p*S-v*A+m*x)-r*(p*y-v*T+g*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],p=t[12],v=t[13],g=t[14],m=t[15],_=e*o-n*a,S=e*l-s*a,y=e*c-r*a,A=n*l-s*o,T=n*c-r*o,x=s*c-r*l,M=h*v-f*p,C=h*g-u*p,I=h*m-d*p,w=f*g-u*v,R=f*m-d*v,O=u*m-d*g,L=_*O-S*R+y*w+A*I-T*C+x*M;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/L;return t[0]=(o*O-l*R+c*w)*B,t[1]=(s*R-n*O-r*w)*B,t[2]=(v*x-g*T+m*A)*B,t[3]=(u*T-f*x-d*A)*B,t[4]=(l*I-a*O-c*C)*B,t[5]=(e*O-s*I+r*C)*B,t[6]=(g*y-p*x-m*S)*B,t[7]=(h*x-u*y+d*S)*B,t[8]=(a*R-o*I+c*M)*B,t[9]=(n*I-e*R-r*M)*B,t[10]=(p*T-v*y+m*_)*B,t[11]=(f*y-h*T-d*_)*B,t[12]=(o*C-a*w-l*M)*B,t[13]=(e*w-n*C+s*M)*B,t[14]=(v*S-p*A-g*_)*B,t[15]=(h*A-f*S+u*_)*B,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,p=r*f,v=a*h,g=a*f,m=o*f,_=l*c,S=l*h,y=l*f,A=n.x,T=n.y,x=n.z;return s[0]=(1-(v+m))*A,s[1]=(d+y)*A,s[2]=(p-S)*A,s[3]=0,s[4]=(d-y)*T,s[5]=(1-(u+m))*T,s[6]=(g+_)*T,s[7]=0,s[8]=(p+S)*x,s[9]=(g-_)*x,s[10]=(1-(u+v))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Yi.set(s[0],s[1],s[2]).length(),o=Yi.set(s[4],s[5],s[6]).length(),l=Yi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),wn.copy(this);let c=1/a,h=1/o,f=1/l;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=f,wn.elements[9]*=f,wn.elements[10]*=f,e.setFromRotationMatrix(wn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=mn,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),p,v;if(l)p=r/(a-r),v=a*r/(a-r);else if(o===mn)p=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===hs)p=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=mn,l=!1){let c=this.elements,h=2/(e-t),f=2/(n-s),u=-(e+t)/(e-t),d=-(n+s)/(n-s),p,v;if(l)p=1/(a-r),v=a/(a-r);else if(o===mn)p=-2/(a-r),v=-(a+r)/(a-r);else if(o===hs)p=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};co.prototype.isMatrix4=!0;var he=co,Yi=new N,wn=new he,Uf=new N(0,0,0),Ff=new N(1,1,1),ri=new N,na=new N,ln=new N,Sh=new he,bh=new je,tn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Sh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Sh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bh.setFromEuler(this),this.setFromQuaternion(bh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};tn.DEFAULT_ORDER="XYZ";var $s=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Of=0,Eh=new N,Zi=new je,Wn=new he,ia=new N,Ns=new N,Bf=new N,zf=new je,Th=new N(1,0,0),wh=new N(0,1,0),Ah=new N(0,0,1),Rh={type:"added"},kf={type:"removed"},Ji={type:"childadded",child:null},gl={type:"childremoved",child:null},Pe=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new tn,n=new je,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Vt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(Th,t)}rotateY(t){return this.rotateOnAxis(wh,t)}rotateZ(t){return this.rotateOnAxis(Ah,t)}translateOnAxis(t,e){return Eh.copy(t).applyQuaternion(this.quaternion),this.position.add(Eh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Th,t)}translateY(t){return this.translateOnAxis(wh,t)}translateZ(t){return this.translateOnAxis(Ah,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ia.copy(t):ia.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Ns,ia,this.up):Wn.lookAt(ia,Ns,this.up),this.quaternion.setFromRotationMatrix(Wn),s&&(Wn.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(Wn),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(zt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rh),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null):zt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(kf),gl.child=t,this.dispatchEvent(gl),gl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rh),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,t,Bf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,zf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pe.DEFAULT_UP=new N(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var sn=class extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Gf={type:"move"},ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let g=e.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&u>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new sn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},sa={h:0,s:0,l:0};function xl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=gc(t,1),e=Kt(e,0,1),n=Kt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=xl(a,r,t+1/3),this.g=xl(a,r,t),this.b=xl(a,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&Bt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Bt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let n=Uu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return se.workingToColorSpace(Xe.copy(this),t),Math.round(Kt(Xe.r*255,0,255))*65536+Math.round(Kt(Xe.g*255,0,255))*256+Math.round(Kt(Xe.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(Xe.copy(this),e);let n=Xe.r,s=Xe.g,r=Xe.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=Ee){se.workingToColorSpace(Xe.copy(this),t);let e=Xe.r,n=Xe.g,s=Xe.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ai),this.setHSL(ai.h+t,ai.s+e,ai.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ai),t.getHSL(sa);let n=Vs(ai.h,sa.h,e),s=Vs(ai.s,sa.s,e),r=Vs(ai.l,sa.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Xe=new kt;kt.NAMES=Uu;var Ks=class extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},An=new N,Xn=new N,_l=new N,qn=new N,$i=new N,Ki=new N,Ch=new N,vl=new N,yl=new N,Ml=new N,Sl=new Se,bl=new Se,El=new Se,hi=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),An.subVectors(t,e),s.cross(An);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){An.subVectors(s,e),Xn.subVectors(n,e),_l.subVectors(t,e);let a=An.dot(An),o=An.dot(Xn),l=An.dot(_l),c=Xn.dot(Xn),h=Xn.dot(_l),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qn.x),l.addScaledVector(a,qn.y),l.addScaledVector(o,qn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Sl.setScalar(0),bl.setScalar(0),El.setScalar(0),Sl.fromBufferAttribute(t,e),bl.fromBufferAttribute(t,n),El.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Sl,r.x),a.addScaledVector(bl,r.y),a.addScaledVector(El,r.z),a}static isFrontFacing(t,e,n,s){return An.subVectors(n,e),Xn.subVectors(t,e),An.cross(Xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),An.cross(Xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;$i.subVectors(s,n),Ki.subVectors(r,n),vl.subVectors(t,n);let l=$i.dot(vl),c=Ki.dot(vl);if(l<=0&&c<=0)return e.copy(n);yl.subVectors(t,s);let h=$i.dot(yl),f=Ki.dot(yl);if(h>=0&&f<=h)return e.copy(s);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector($i,a);Ml.subVectors(t,r);let d=$i.dot(Ml),p=Ki.dot(Ml);if(p>=0&&d<=p)return e.copy(r);let v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(Ki,o);let g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return Ch.subVectors(r,s),o=(f-h)/(f-h+(d-p)),e.copy(s).addScaledVector(Ch,o);let m=1/(g+v+u);return a=v*m,o=u*m,e.copy(n).addScaledVector($i,a).addScaledVector(Ki,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},On=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Rn):Rn.fromBufferAttribute(r,a),Rn.applyMatrix4(t.matrixWorld),this.expandByPoint(Rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ra.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ra.copy(n.boundingBox)),ra.applyMatrix4(t.matrixWorld),this.union(ra)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Rn),Rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Us),aa.subVectors(this.max,Us),Qi.subVectors(t.a,Us),ji.subVectors(t.b,Us),ts.subVectors(t.c,Us),oi.subVectors(ji,Qi),li.subVectors(ts,ji),Ci.subVectors(Qi,ts);let e=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Ci.z,Ci.y,oi.z,0,-oi.x,li.z,0,-li.x,Ci.z,0,-Ci.x,-oi.y,oi.x,0,-li.y,li.x,0,-Ci.y,Ci.x,0];return!Tl(e,Qi,ji,ts,aa)||(e=[1,0,0,0,1,0,0,0,1],!Tl(e,Qi,ji,ts,aa))?!1:(oa.crossVectors(oi,li),e=[oa.x,oa.y,oa.z],Tl(e,Qi,ji,ts,aa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Yn=[new N,new N,new N,new N,new N,new N,new N,new N],Rn=new N,ra=new On,Qi=new N,ji=new N,ts=new N,oi=new N,li=new N,Ci=new N,Us=new N,aa=new N,oa=new N,Ii=new N;function Tl(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ii.fromArray(i,r);let o=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),l=t.dot(Ii),c=e.dot(Ii),h=n.dot(Ii);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ie=new N,la=new rt,Hf=0,Le=class extends Fn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Hf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ru,this.updateRanges=[],this.gpuType=yn,this.version=0,this._normalizationScale=t!==void 0?_c(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)la.fromBufferAttribute(this,e),la.applyMatrix3(t),this.setXY(e,la.x,la.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Du(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Nu(t,this.array)}};var Qs=class extends Le{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var js=class extends Le{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var qt=class extends Le{constructor(t,e,n){super(new Float32Array(t),e,n)}},Vf=new On,Fs=new N,wl=new N,ui=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Vf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);let e=Fs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(wl)),this.expandByPoint(Fs.copy(t.center).sub(wl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Wf=0,pn=new he,Al=new Pe,es=new N,cn=new On,Os=new On,Be=new N,ve=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(mf(t)?js:Qs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,n){return pn.makeTranslation(t,e,n),this.applyMatrix4(pn),this}scale(t,e,n){return pn.makeScale(t,e,n),this.applyMatrix4(pn),this}lookAt(t){return Al.lookAt(t),Al.updateMatrix(),this.applyMatrix4(Al.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Os.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(cn.min,Os.min),cn.expandByPoint(Be),Be.addVectors(cn.max,Os.max),cn.expandByPoint(Be)):(cn.expandByPoint(Os.min),cn.expandByPoint(Os.max))}cn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Be.fromBufferAttribute(o,c),l&&(es.fromBufferAttribute(t,c),Be.add(es)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Le(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let C=0;C<n.count;C++)o[C]=new N,l[C]=new N;let h=new N,f=new N,u=new N,d=new rt,p=new rt,v=new rt,g=new N,m=new N;function _(C,I,w){c[C]=c[I]=c[w]=1,h.fromBufferAttribute(n,C),f.fromBufferAttribute(n,I),u.fromBufferAttribute(n,w),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,I),v.fromBufferAttribute(r,w),f.sub(h),u.sub(h),p.sub(d),v.sub(d);let R=1/(p.x*v.y-v.x*p.y);isFinite(R)&&(g.copy(f).multiplyScalar(v.y).addScaledVector(u,-p.y).multiplyScalar(R),m.copy(u).multiplyScalar(p.x).addScaledVector(f,-v.x).multiplyScalar(R),o[C].add(g),o[I].add(g),o[w].add(g),l[C].add(m),l[I].add(m),l[w].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let C=0,I=S.length;C<I;++C){let w=S[C],R=w.start,O=w.count;for(let L=R,B=R+O;L<B;L+=3)_(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let y=new N,A=new N,T=new N,x=new N;function M(C){T.fromBufferAttribute(s,C),x.copy(T);let I=o[C];y.copy(I),y.sub(T.multiplyScalar(T.dot(I))).normalize(),A.crossVectors(x,I);let R=A.dot(l[C])<0?-1:1;a.setXYZW(C,y.x,y.y,y.z,R)}for(let C=0,I=n.count;C<I;++C)c[C]&&M(C);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Le(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,f=new N;if(t)for(let u=0,d=t.count;u<d;u+=3){let p=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),d=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let m=0;m<h;m++)u[p++]=c[d++]}return new Le(u,h,f)}if(this.index===null)return Bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Rl=new N,Xf=new N,qf=new Vt,Cn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Rl.subVectors(n,e).cross(Xf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Rl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||qf.getNormalMatrix(t),s=this.coplanarPoint(Rl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Yf=0,Kn=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=Es,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jl,this.blendDst=$l,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Su,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wa,this.stencilZFail=wa,this.stencilZPass=wa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Bt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Cn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new rt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new rt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Zn=new N,Cl=new N,ca=new N,ha=new N,ka=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Cl.copy(t).add(e).multiplyScalar(.5),ca.copy(e).sub(t).normalize(),ha.copy(this.origin).sub(Cl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ca),o=ha.dot(this.direction),l=-ha.dot(ca),c=ha.lengthSq(),h=Math.abs(1-a*a),f,u,d,p;if(h>0)if(f=a*l-o,u=a*o-l,p=r*h,f>=0)if(u>=-p)if(u<=p){let v=1/h;f*=v,u*=v,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=p?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Cl).addScaledVector(ca,u),d}intersectSphere(t,e){if(t.radius<0)return null;Zn.subVectors(t.center,this.origin);let n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,p=e.x-a.x,v=e.y-a.y,g=e.z-a.z,m=n.x-a.x,_=n.y-a.y,S=n.z-a.z,y=Math.abs(l),A=Math.abs(c),T=Math.abs(h),x,M,C,I,w,R,O,L,B,V,H,et;if(y>=A&&y>=T?(C=l,R=f,B=p,et=m,l>=0?(x=c,M=h,I=u,w=d,O=v,L=g,V=_,H=S):(x=h,M=c,I=d,w=u,O=g,L=v,V=S,H=_)):A>=T?(C=c,R=u,B=v,et=_,c>=0?(x=h,M=l,I=d,w=f,O=g,L=p,V=S,H=m):(x=l,M=h,I=f,w=d,O=p,L=g,V=m,H=S)):(C=h,R=d,B=g,et=S,h>=0?(x=l,M=c,I=f,w=u,O=p,L=v,V=m,H=_):(x=c,M=l,I=u,w=f,O=v,L=p,V=_,H=m)),C===0)return null;let X=x/C,Q=M/C,tt=1/C,Tt=I-X*R,Ut=w-Q*R,Y=O-X*B,_t=L-Q*B,bt=V-X*et,Dt=H-Q*et,xt=bt*_t-Dt*Y,It=Tt*Dt-Ut*bt,pe=Y*Ut-_t*Tt;if(s){if(xt<0||It<0||pe<0)return null}else if((xt<0||It<0||pe<0)&&(xt>0||It>0||pe>0))return null;let nt=xt+It+pe;if(nt===0)return null;let At=tt*(xt*R+It*B+pe*et);return(nt>0?At<0:At>0)?null:this.at(At/nt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},rn=class extends Kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Ar,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ih=new he,Pi=new ka,ua=new ui,Ph=new N,da=new N,fa=new N,pa=new N,Il=new N,ma=new N,Lh=new N,ga=new N,ye=class extends Pe{constructor(t=new ve,e=new rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ma.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(Il.fromBufferAttribute(f,t),a?ma.addScaledVector(Il,h):ma.addScaledVector(Il.sub(e),h))}e.add(ma)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(ua.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(ua,Ph)===null||Pi.origin.distanceToSquared(Ph)>(t.far-t.near)**2))&&(Ih.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(Ih),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=u.length;p<v;p++){let g=u[p],m=a[g.materialIndex],_=Math.max(g.start,d.start),S=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let y=_,A=S;y<A;y+=3){let T=o.getX(y),x=o.getX(y+1),M=o.getX(y+2);s=xa(this,m,t,n,c,h,f,T,x,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){let _=o.getX(g),S=o.getX(g+1),y=o.getX(g+2);s=xa(this,a,t,n,c,h,f,_,S,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=u.length;p<v;p++){let g=u[p],m=a[g.materialIndex],_=Math.max(g.start,d.start),S=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let y=_,A=S;y<A;y+=3){let T=y,x=y+1,M=y+2;s=xa(this,m,t,n,c,h,f,T,x,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){let _=g,S=g+1,y=g+2;s=xa(this,a,t,n,c,h,f,_,S,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Zf(i,t,e,n,s,r,a,o){let l;if(t.side===en?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===xi,o),l===null)return null;ga.copy(o),ga.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ga);return c<e.near||c>e.far?null:{distance:c,point:ga.clone(),object:i}}function xa(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,da),i.getVertexPosition(l,fa),i.getVertexPosition(c,pa);let h=Zf(i,t,e,n,da,fa,pa,Lh);if(h){let f=new N;hi.getBarycoord(Lh,da,fa,pa,f),s&&(h.uv=hi.getInterpolatedAttribute(s,o,l,c,f,new rt)),r&&(h.uv1=hi.getInterpolatedAttribute(r,o,l,c,f,new rt)),a&&(h.normal=hi.getInterpolatedAttribute(a,o,l,c,f,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new N,materialIndex:0};hi.getNormal(da,fa,pa,u.normal),h.face=u,h.barycoord=f}return h}var tr=class extends qe{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ze,h=ze,f,u){super(null,a,o,l,c,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var gn=class extends Le{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ns=new he,Dh=new he,_a=[],Nh=new On,Jf=new he,Bs=new ye,zs=new ui,Bn=class extends ye{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new gn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Jf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new On),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),Nh.copy(t.boundingBox).applyMatrix4(ns),this.boundingBox.union(Nh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ui),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),zs.copy(t.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(zs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),t.ray.intersectsSphere(zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ns),Dh.multiplyMatrices(n,ns),Bs.matrixWorld=Dh,Bs.raycast(t,_a);for(let a=0,o=_a.length;a<o;a++){let l=_a[a];l.instanceId=r,l.object=this,e.push(l)}_a.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new gn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new tr(new Float32Array(s*this.count),s,this.count,xo,yn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Li=new ui,$f=new rt(.5,.5),va=new N,di=class{constructor(t=new Cn,e=new Cn,n=new Cn,s=new Cn,r=new Cn,a=new Cn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],v=r[9],g=r[10],m=r[11],_=r[12],S=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-a,d-h,m-p,A-_).normalize(),s[1].setComponents(c+a,d+h,m+p,A+_).normalize(),s[2].setComponents(c+o,d+f,m+v,A+S).normalize(),s[3].setComponents(c-o,d-f,m-v,A-S).normalize(),n)s[4].setComponents(l,u,g,y).normalize(),s[5].setComponents(c-l,d-u,m-g,A-y).normalize();else if(s[4].setComponents(c-l,d-u,m-g,A-y).normalize(),e===mn)s[5].setComponents(c+l,d+u,m+g,A+y).normalize();else if(e===hs)s[5].setComponents(l,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){Li.center.set(0,0,0);let e=$f.distanceTo(t.center);return Li.radius=.7071067811865476+e,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(va.x=s.normal.x>0?t.max.x:t.min.x,va.y=s.normal.y>0?t.max.y:t.min.y,va.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(va)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Uh=new he,Ga=class i{constructor(){this.coordinateSystem=mn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Uh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new di),n[s].setFromProjectionMatrix(Uh,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new di),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var er=class extends qe{constructor(t=[],e=Bi,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},xn=class extends qe{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Qn=class extends qe{constructor(t,e,n=Pn,s,r,a,o=ze,l=ze,c,h=$n,f=1){if(h!==$n&&h!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ps(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},nr=class extends Qn{constructor(t,e=Pn,n=Bi,s,r,a=ze,o=ze,l,c=$n){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ir=class extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},_n=class i extends ve{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,n,e,t,a,r,0),p("z","y","x",1,-1,n,e,-t,a,r,1),p("x","z","y",1,1,t,n,e,s,a,2),p("x","z","y",1,-1,t,n,-e,s,a,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(f,2));function p(v,g,m,_,S,y,A,T,x,M,C){let I=y/x,w=A/M,R=y/2,O=A/2,L=T/2,B=x+1,V=M+1,H=0,et=0,X=new N;for(let Q=0;Q<V;Q++){let tt=Q*w-O;for(let Tt=0;Tt<B;Tt++){let Ut=Tt*I-R;X[v]=Ut*_,X[g]=tt*S,X[m]=L,c.push(X.x,X.y,X.z),X[v]=0,X[g]=0,X[m]=T>0?1:-1,h.push(X.x,X.y,X.z),f.push(Tt/x),f.push(1-Q/M),H+=1}}for(let Q=0;Q<M;Q++)for(let tt=0;tt<x;tt++){let Tt=u+tt+B*Q,Ut=u+tt+B*(Q+1),Y=u+(tt+1)+B*(Q+1),_t=u+(tt+1)+B*Q;l.push(Tt,Ut,_t),l.push(Ut,Y,_t),et+=6}o.addGroup(d,et,C),d+=et,u+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var fi=class i extends ve{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,v=[],g=n/2,m=0;_(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(u,3)),this.setAttribute("uv",new qt(d,2));function _(){let y=new N,A=new N,T=0,x=(e-t)/n;for(let M=0;M<=r;M++){let C=[],I=M/r,w=I*(e-t)+t;for(let R=0;R<=s;R++){let O=R/s,L=O*l+o,B=Math.sin(L),V=Math.cos(L);A.x=w*B,A.y=-I*n+g,A.z=w*V,f.push(A.x,A.y,A.z),y.set(B,x,V).normalize(),u.push(y.x,y.y,y.z),d.push(O,1-I),C.push(p++)}v.push(C)}for(let M=0;M<s;M++)for(let C=0;C<r;C++){let I=v[C][M],w=v[C+1][M],R=v[C+1][M+1],O=v[C][M+1];(t>0||C!==0)&&(h.push(I,w,O),T+=3),(e>0||C!==r-1)&&(h.push(w,R,O),T+=3)}c.addGroup(m,T,0),m+=T}function S(y){let A=p,T=new rt,x=new N,M=0,C=y===!0?t:e,I=y===!0?1:-1;for(let R=1;R<=s;R++)f.push(0,g*I,0),u.push(0,I,0),d.push(.5,.5),p++;let w=p;for(let R=0;R<=s;R++){let L=R/s*l+o,B=Math.cos(L),V=Math.sin(L);x.x=C*V,x.y=g*I,x.z=C*B,f.push(x.x,x.y,x.z),u.push(0,I,0),T.x=B*.5+.5,T.y=V*.5*I+.5,d.push(T.x,T.y),p++}for(let R=0;R<s;R++){let O=A+R,L=w+R;y===!0?h.push(L,L+1,O):h.push(L+1,L,O),M+=3}c.addGroup(m,M,y===!0?1:2),m+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ha=class i extends ve{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let S=new N,y=new N,A=new N;for(let T=0;T<e.length;T+=3)d(e[T+0],S),d(e[T+1],y),d(e[T+2],A),l(S,y,A,_)}function l(_,S,y,A){let T=A+1,x=[];for(let M=0;M<=T;M++){x[M]=[];let C=_.clone().lerp(y,M/T),I=S.clone().lerp(y,M/T),w=T-M;for(let R=0;R<=w;R++)R===0&&M===T?x[M][R]=C:x[M][R]=C.clone().lerp(I,R/w)}for(let M=0;M<T;M++)for(let C=0;C<2*(T-M)-1;C++){let I=Math.floor(C/2);C%2===0?(u(x[M][I+1]),u(x[M+1][I]),u(x[M][I])):(u(x[M][I+1]),u(x[M+1][I+1]),u(x[M+1][I]))}}function c(_){let S=new N;for(let y=0;y<r.length;y+=3)S.x=r[y+0],S.y=r[y+1],S.z=r[y+2],S.normalize().multiplyScalar(_),r[y+0]=S.x,r[y+1]=S.y,r[y+2]=S.z}function h(){let _=new N;for(let S=0;S<r.length;S+=3){_.x=r[S+0],_.y=r[S+1],_.z=r[S+2];let y=g(_)/2/Math.PI+.5,A=m(_)/Math.PI+.5;a.push(y,1-A)}p(),f()}function f(){for(let _=0;_<a.length;_+=6){let S=a[_+0],y=a[_+2],A=a[_+4],T=Math.max(S,y,A),x=Math.min(S,y,A);T>.9&&x<.1&&(S<.2&&(a[_+0]+=1),y<.2&&(a[_+2]+=1),A<.2&&(a[_+4]+=1))}}function u(_){r.push(_.x,_.y,_.z)}function d(_,S){let y=_*3;S.x=t[y+0],S.y=t[y+1],S.z=t[y+2]}function p(){let _=new N,S=new N,y=new N,A=new N,T=new rt,x=new rt,M=new rt;for(let C=0,I=0;C<r.length;C+=9,I+=6){_.set(r[C+0],r[C+1],r[C+2]),S.set(r[C+3],r[C+4],r[C+5]),y.set(r[C+6],r[C+7],r[C+8]),T.set(a[I+0],a[I+1]),x.set(a[I+2],a[I+3]),M.set(a[I+4],a[I+5]),A.copy(_).add(S).add(y).divideScalar(3);let w=g(A);v(T,I+0,_,w),v(x,I+2,S,w),v(M,I+4,y,w)}}function v(_,S,y,A){A<0&&_.x===1&&(a[S]=_.x-1),y.x===0&&y.z===0&&(a[S]=A/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}},sr=class i extends Ha{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Bt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new rt:new N);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new N,s=[],r=[],a=[],o=new N,l=new he;for(let d=0;d<=t;d++){let p=d/t;s[d]=this.getTangentAt(p,new N)}r[0]=new N,a[0]=new N;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(Kt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Kt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},gs=class extends un{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new rt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Va=class extends gs{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vc(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Fh=new N,Oh=new N,Pl=new vc,Ll=new vc,Dl=new vc,xs=class extends un{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Oh.subVectors(s[0],s[1]).add(s[0]),c=Oh);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Fh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Fh),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Pl.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,p,v,g),Ll.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,p,v,g),Dl.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(Pl.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),Ll.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Dl.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(Pl.calc(l),Ll.calc(l),Dl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Bh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Kf(i,t){let e=1-i;return e*e*t}function Qf(i,t){return 2*(1-i)*i*t}function jf(i,t){return i*i*t}function Ws(i,t,e,n){return Kf(i,t)+Qf(i,e)+jf(i,n)}function tp(i,t){let e=1-i;return e*e*e*t}function ep(i,t){let e=1-i;return 3*e*e*i*t}function np(i,t){return 3*(1-i)*i*i*t}function ip(i,t){return i*i*i*t}function Xs(i,t,e,n,s){return tp(i,t)+ep(i,e)+np(i,n)+ip(i,s)}var rr=class extends un{constructor(t=new rt,e=new rt,n=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new rt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Xs(t,s.x,r.x,a.x,o.x),Xs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Wa=class extends un{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Xs(t,s.x,r.x,a.x,o.x),Xs(t,s.y,r.y,a.y,o.y),Xs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ar=class extends un{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xa=class extends un{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},or=class extends un{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ws(t,s.x,r.x,a.x),Ws(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},lr=class extends un{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ws(t,s.x,r.x,a.x),Ws(t,s.y,r.y,a.y),Ws(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},cr=class extends un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Bh(o,l.x,c.x,h.x,f.x),Bh(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new rt().fromArray(s))}return this}},qa=Object.freeze({__proto__:null,ArcCurve:Va,CatmullRomCurve3:xs,CubicBezierCurve:rr,CubicBezierCurve3:Wa,EllipseCurve:gs,LineCurve:ar,LineCurve3:Xa,QuadraticBezierCurve:or,QuadraticBezierCurve3:lr,SplineCurve:cr}),Ya=class extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qa[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new qa[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},hr=class extends Ya{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ar(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new or(this.currentPoint.clone(),new rt(t,e),new rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new rr(this.currentPoint.clone(),new rt(t,e),new rt(n,s),new rt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new cr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new gs(t,e,n,s,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},_s=class extends hr{constructor(t){super(t),this.uuid=ki(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new hr().fromJSON(s))}return this}};function sp(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Fu(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=cp(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,f=l;for(let u=e;u<s;u+=e){let d=i[u],p=i[u+1];d<o&&(o=d),p<l&&(l=p),d>h&&(h=d),p>f&&(f=p)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return ur(r,a,e,o,l,c,0),a}function Fu(i,t,e,n,s){let r;if(s===yp(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=zh(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=zh(a/n|0,i[a],i[a+1],r);return r&&vs(r,r.next)&&(fr(r),r=r.next),r}function Ni(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(vs(e,e.next)||Te(e.prev,e,e.next)===0)){if(fr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ur(i,t,e,n,s,r,a){if(!i)return;!a&&r&&pp(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?ap(i,n,s,r):rp(i)){t.push(l.i,i.i,c.i),fr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=op(Ni(i),t),ur(i,t,e,n,s,r,2)):a===2&&lp(i,t,e,n,s,r):ur(Ni(i),t,e,n,s,r,1);break}}}function rp(i){let t=i.prev,e=i,n=i.next;if(Te(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),f=Math.min(o,l,c),u=Math.max(s,r,a),d=Math.max(o,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=f&&p.y<=d&&ks(s,o,r,l,a,c,p.x,p.y)&&Te(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function ap(i,t,e,n){let s=i.prev,r=i,a=i.next;if(Te(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(o,l,c),p=Math.min(h,f,u),v=Math.max(o,l,c),g=Math.max(h,f,u),m=zl(d,p,t,e,n),_=zl(v,g,t,e,n),S=i.prevZ,y=i.nextZ;for(;S&&S.z>=m&&y&&y.z<=_;){if(S.x>=d&&S.x<=v&&S.y>=p&&S.y<=g&&S!==s&&S!==a&&ks(o,h,l,f,c,u,S.x,S.y)&&Te(S.prev,S,S.next)>=0||(S=S.prevZ,y.x>=d&&y.x<=v&&y.y>=p&&y.y<=g&&y!==s&&y!==a&&ks(o,h,l,f,c,u,y.x,y.y)&&Te(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;S&&S.z>=m;){if(S.x>=d&&S.x<=v&&S.y>=p&&S.y<=g&&S!==s&&S!==a&&ks(o,h,l,f,c,u,S.x,S.y)&&Te(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;y&&y.z<=_;){if(y.x>=d&&y.x<=v&&y.y>=p&&y.y<=g&&y!==s&&y!==a&&ks(o,h,l,f,c,u,y.x,y.y)&&Te(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function op(i,t){let e=i;do{let n=e.prev,s=e.next.next;!vs(n,s)&&Bu(n,e,e.next,s)&&dr(n,s)&&dr(s,n)&&(t.push(n.i,e.i,s.i),fr(e),fr(e.next),e=i=s),e=e.next}while(e!==i);return Ni(e)}function lp(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&xp(a,o)){let l=zu(a,o);a=Ni(a,a.next),l=Ni(l,l.next),ur(a,t,e,n,s,r,0),ur(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function cp(i,t,e,n){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Fu(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(gp(c))}s.sort(hp);for(let r=0;r<s.length;r++)e=up(s[r],e);return e}function hp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function up(i,t){let e=dp(i,t);if(!e)return t;let n=zu(e,i);return Ni(n,n.next),Ni(e,e.next)}function dp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,a;if(vs(i,e))return e;do{if(vs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Ou(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let f=Math.abs(s-e.y)/(n-e.x);dr(e,i)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&fp(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function fp(i,t){return Te(i.prev,i,t.prev)<0&&Te(t.next,i,i.next)<0}function pp(i,t,e,n){let s=i;do s.z===0&&(s.z=zl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,mp(s)}function mp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function zl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function gp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Ou(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function ks(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Ou(i,t,e,n,s,r,a,o)}function xp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!_p(i,t)&&(dr(i,t)&&dr(t,i)&&vp(i,t)&&(Te(i.prev,i,t.prev)||Te(i,t.prev,t))||vs(i,t)&&Te(i.prev,i,i.next)>0&&Te(t.prev,t,t.next)>0)}function Te(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function vs(i,t){return i.x===t.x&&i.y===t.y}function Bu(i,t,e,n){let s=Ma(Te(i,t,e)),r=Ma(Te(i,t,n)),a=Ma(Te(e,n,i)),o=Ma(Te(e,n,t));return!!(s!==r&&a!==o||s===0&&ya(i,e,t)||r===0&&ya(i,n,t)||a===0&&ya(e,i,n)||o===0&&ya(e,t,n))}function ya(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ma(i){return i>0?1:i<0?-1:0}function _p(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Bu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function dr(i,t){return Te(i.prev,i,i.next)<0?Te(i,t,i.next)>=0&&Te(i,i.prev,t)>=0:Te(i,t,i.prev)<0||Te(i,i.next,t)<0}function vp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function zu(i,t){let e=kl(i.i,i.x,i.y),n=kl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function zh(i,t,e,n){let s=kl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function fr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function kl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function yp(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Gl=class{static triangulate(t,e,n=2){return sp(t,e,n)}},Di=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];kh(t),Gh(n,t);let a=t.length;e.forEach(kh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Gh(n,e[l]);let o=Gl.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function kh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Gh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var pr=class i extends ve{constructor(t=new _s([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new qt(s,3)),this.setAttribute("uv",new qt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:Mp,S,y=!1,A,T,x,M;if(m){S=m.getSpacedPoints(h),y=!0,u=!1;let j=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,j),T=new N,x=new N,M=new N}u||(g=0,d=0,p=0,v=0);let C=o.extractPoints(c),I=C.shape,w=C.holes;if(!Di.isClockWise(I)){I=I.reverse();for(let j=0,ht=w.length;j<ht;j++){let ot=w[j];Di.isClockWise(ot)&&(w[j]=ot.reverse())}}function O(j){let ot=10000000000000001e-36,Et=j[0];for(let vt=1;vt<=j.length;vt++){let Yt=vt%j.length,Lt=j[Yt],te=Lt.x-Et.x,ee=Lt.y-Et.y,ce=te*te+ee*ee,F=Math.max(Math.abs(Lt.x),Math.abs(Lt.y),Math.abs(Et.x),Math.abs(Et.y)),Re=ot*F*F;if(ce<=Re){j.splice(Yt,1),vt--;continue}Et=Lt}}O(I),w.forEach(O);let L=w.length,B=I;for(let j=0;j<L;j++){let ht=w[j];I=I.concat(ht)}function V(j,ht,ot){return ht||zt("ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(ht,ot)}let H=I.length;function et(j,ht,ot){let Et,vt,Yt,Lt=j.x-ht.x,te=j.y-ht.y,ee=ot.x-j.x,ce=ot.y-j.y,F=Lt*Lt+te*te,Re=Lt*ce-te*ee;if(Math.abs(Re)>Number.EPSILON){let Qt=Math.sqrt(F),ge=Math.sqrt(ee*ee+ce*ce),pt=ht.x-te/Qt,we=ht.y+Lt/Qt,Ot=ot.x-ce/ge,Ht=ot.y+ee/ge,P=((Ot-pt)*ce-(Ht-we)*ee)/(Lt*ce-te*ee);Et=pt+Lt*P-j.x,vt=we+te*P-j.y;let b=Et*Et+vt*vt;if(b<=2)return new rt(Et,vt);Yt=Math.sqrt(b/2)}else{let Qt=!1;Lt>Number.EPSILON?ee>Number.EPSILON&&(Qt=!0):Lt<-Number.EPSILON?ee<-Number.EPSILON&&(Qt=!0):Math.sign(te)===Math.sign(ce)&&(Qt=!0),Qt?(Et=-te,vt=Lt,Yt=Math.sqrt(F)):(Et=Lt,vt=te,Yt=Math.sqrt(F/2))}return new rt(Et/Yt,vt/Yt)}let X=[];for(let j=0,ht=B.length,ot=ht-1,Et=j+1;j<ht;j++,ot++,Et++)ot===ht&&(ot=0),Et===ht&&(Et=0),X[j]=et(B[j],B[ot],B[Et]);let Q=[],tt,Tt=X.concat();for(let j=0,ht=L;j<ht;j++){let ot=w[j];tt=[];for(let Et=0,vt=ot.length,Yt=vt-1,Lt=Et+1;Et<vt;Et++,Yt++,Lt++)Yt===vt&&(Yt=0),Lt===vt&&(Lt=0),tt[Et]=et(ot[Et],ot[Yt],ot[Lt]);Q.push(tt),Tt=Tt.concat(tt)}let Ut;if(g===0)Ut=Di.triangulateShape(B,w);else{let j=[],ht=[];for(let ot=0;ot<g;ot++){let Et=ot/g,vt=d*Math.cos(Et*Math.PI/2),Yt=p*Math.sin(Et*Math.PI/2)+v;for(let Lt=0,te=B.length;Lt<te;Lt++){let ee=V(B[Lt],X[Lt],Yt);It(ee.x,ee.y,-vt),Et===0&&j.push(ee)}for(let Lt=0,te=L;Lt<te;Lt++){let ee=w[Lt];tt=Q[Lt];let ce=[];for(let F=0,Re=ee.length;F<Re;F++){let Qt=V(ee[F],tt[F],Yt);It(Qt.x,Qt.y,-vt),Et===0&&ce.push(Qt)}Et===0&&ht.push(ce)}}Ut=Di.triangulateShape(j,ht)}let Y=Ut.length,_t=p+v;for(let j=0;j<H;j++){let ht=u?V(I[j],Tt[j],_t):I[j];y?(x.copy(A.normals[0]).multiplyScalar(ht.x),T.copy(A.binormals[0]).multiplyScalar(ht.y),M.copy(S[0]).add(x).add(T),It(M.x,M.y,M.z)):It(ht.x,ht.y,0)}for(let j=1;j<=h;j++)for(let ht=0;ht<H;ht++){let ot=u?V(I[ht],Tt[ht],_t):I[ht];y?(x.copy(A.normals[j]).multiplyScalar(ot.x),T.copy(A.binormals[j]).multiplyScalar(ot.y),M.copy(S[j]).add(x).add(T),It(M.x,M.y,M.z)):It(ot.x,ot.y,f/h*j)}for(let j=g-1;j>=0;j--){let ht=j/g,ot=d*Math.cos(ht*Math.PI/2),Et=p*Math.sin(ht*Math.PI/2)+v;for(let vt=0,Yt=B.length;vt<Yt;vt++){let Lt=V(B[vt],X[vt],Et);It(Lt.x,Lt.y,f+ot)}for(let vt=0,Yt=w.length;vt<Yt;vt++){let Lt=w[vt];tt=Q[vt];for(let te=0,ee=Lt.length;te<ee;te++){let ce=V(Lt[te],tt[te],Et);y?It(ce.x,ce.y+S[h-1].y,S[h-1].x+ot):It(ce.x,ce.y,f+ot)}}}bt(),Dt();function bt(){let j=s.length/3;if(u){let ht=0,ot=H*ht;for(let Et=0;Et<Y;Et++){let vt=Ut[Et];pe(vt[2]+ot,vt[1]+ot,vt[0]+ot)}ht=h+g*2,ot=H*ht;for(let Et=0;Et<Y;Et++){let vt=Ut[Et];pe(vt[0]+ot,vt[1]+ot,vt[2]+ot)}}else{for(let ht=0;ht<Y;ht++){let ot=Ut[ht];pe(ot[2],ot[1],ot[0])}for(let ht=0;ht<Y;ht++){let ot=Ut[ht];pe(ot[0]+H*h,ot[1]+H*h,ot[2]+H*h)}}n.addGroup(j,s.length/3-j,0)}function Dt(){let j=s.length/3,ht=0;xt(B,ht),ht+=B.length;for(let ot=0,Et=w.length;ot<Et;ot++){let vt=w[ot];xt(vt,ht),ht+=vt.length}n.addGroup(j,s.length/3-j,1)}function xt(j,ht){let ot=j.length;for(;--ot>=0;){let Et=ot,vt=ot-1;vt<0&&(vt=j.length-1);for(let Yt=0,Lt=h+g*2;Yt<Lt;Yt++){let te=H*Yt,ee=H*(Yt+1),ce=ht+Et+te,F=ht+vt+te,Re=ht+vt+ee,Qt=ht+Et+ee;nt(ce,F,Re,Qt)}}}function It(j,ht,ot){l.push(j),l.push(ht),l.push(ot)}function pe(j,ht,ot){At(j),At(ht),At(ot);let Et=s.length/3,vt=_.generateTopUV(n,s,Et-3,Et-2,Et-1);jt(vt[0]),jt(vt[1]),jt(vt[2])}function nt(j,ht,ot,Et){At(j),At(ht),At(Et),At(ht),At(ot),At(Et);let vt=s.length/3,Yt=_.generateSideWallUV(n,s,vt-6,vt-3,vt-2,vt-1);jt(Yt[0]),jt(Yt[1]),jt(Yt[3]),jt(Yt[1]),jt(Yt[2]),jt(Yt[3])}function At(j){s.push(l[j*3+0]),s.push(l[j*3+1]),s.push(l[j*3+2])}function jt(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Sp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new qa[s.type]().fromJSON(s)),new i(n,t.options)}},Mp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new rt(r,a),new rt(o,l),new rt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],u=t[s*3],d=t[s*3+1],p=t[s*3+2],v=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new rt(a,1-l),new rt(c,1-f),new rt(u,1-p),new rt(v,1-m)]:[new rt(o,1-l),new rt(h,1-f),new rt(d,1-p),new rt(g,1-m)]}};function Sp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var mr=class i extends ve{constructor(t=[new rt(0,-.5),new rt(.5,0),new rt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Kt(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,f=new N,u=new rt,d=new N,p=new N,v=new N,g=0,m=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,d.x=m*1,d.y=-g,d.z=m*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:v.normalize(),l.push(v.x,v.y,v.z);break;default:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(p)}for(let _=0;_<=e;_++){let S=n+_*h*s,y=Math.sin(S),A=Math.cos(S);for(let T=0;T<=t.length-1;T++){f.x=t[T].x*y,f.y=t[T].y,f.z=t[T].x*A,a.push(f.x,f.y,f.z),u.x=_/e,u.y=T/(t.length-1),o.push(u.x,u.y);let x=l[3*T+0]*y,M=l[3*T+1],C=l[3*T+0]*A;c.push(x,M,C)}}for(let _=0;_<e;_++)for(let S=0;S<t.length-1;S++){let y=S+_*t.length,A=y,T=y+t.length,x=y+t.length+1,M=y+1;r.push(A,T,M),r.push(x,M,T)}this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("uv",new qt(o,2)),this.setAttribute("normal",new qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var Ye=class i extends ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,f=t/o,u=e/l,d=[],p=[],v=[],g=[];for(let m=0;m<h;m++){let _=m*u-a;for(let S=0;S<c;S++){let y=S*f-r;p.push(y,-_,0),v.push(0,0,1),g.push(S/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<o;_++){let S=_+c*m,y=_+c*(m+1),A=_+1+c*(m+1),T=_+1+c*m;d.push(S,y,T),d.push(y,A,T)}this.setIndex(d),this.setAttribute("position",new qt(p,3)),this.setAttribute("normal",new qt(v,3)),this.setAttribute("uv",new qt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},gr=class i extends ve{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],f=t,u=(e-t)/s,d=new N,p=new rt;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){let m=r+g/n*a;d.x=f*Math.cos(m),d.y=f*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,h.push(p.x,p.y)}f+=u}for(let v=0;v<s;v++){let g=v*(n+1);for(let m=0;m<n;m++){let _=m+g,S=_,y=_+n+1,A=_+n+2,T=_+1;o.push(S,y,T),o.push(y,A,T)}}this.setIndex(o),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var xr=class i extends ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],f=new N,u=new N,d=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){let _=[],S=m/n,y=a+S*o,A=t*Math.cos(y),T=Math.sqrt(t*t-A*A),x=0;m===0&&a===0?x=.5/e:m===n&&l===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){let C=M/e,I=s+C*r;f.x=-T*Math.cos(I),f.y=A,f.z=T*Math.sin(I),p.push(f.x,f.y,f.z),u.copy(f).normalize(),v.push(u.x,u.y,u.z),g.push(C+x,1-S),_.push(c++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<e;_++){let S=h[m][_+1],y=h[m][_],A=h[m+1][_],T=h[m+1][_+1];(m!==0||a>0)&&d.push(S,y,T),(m!==n-1||l<Math.PI)&&d.push(y,A,T)}this.setIndex(d),this.setAttribute("position",new qt(p,3)),this.setAttribute("normal",new qt(v,3)),this.setAttribute("uv",new qt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var _r=class i extends ve{constructor(t=new lr(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,l=new N,c=new rt,h=new N,f=[],u=[],d=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(u,3)),this.setAttribute("uv",new qt(d,2));function v(){for(let S=0;S<e;S++)g(S);g(r===!1?e:0),_(),m()}function g(S){h=t.getPointAt(S/e,h);let y=a.normals[S],A=a.binormals[S];for(let T=0;T<=s;T++){let x=T/s*Math.PI*2,M=Math.sin(x),C=-Math.cos(x);l.x=C*y.x+M*A.x,l.y=C*y.y+M*A.y,l.z=C*y.z+M*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,f.push(o.x,o.y,o.z)}}function m(){for(let S=1;S<=e;S++)for(let y=1;y<=s;y++){let A=(s+1)*(S-1)+(y-1),T=(s+1)*S+(y-1),x=(s+1)*S+y,M=(s+1)*(S-1)+y;p.push(A,T,M),p.push(T,x,M)}}function _(){for(let S=0;S<=e;S++)for(let y=0;y<=s;y++)c.x=S/e,c.y=y/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new qa[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Gi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Hh(s))s.isRenderTargetTexture?(Bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Hh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Je(i){let t={};for(let e=0;e<i.length;e++){let n=Gi(i[e]);for(let s in n)t[s]=n[s]}return t}function Hh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function bp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function yc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var ku={clone:Gi,merge:Je},Ep=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,an=class extends Kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ep,this.fragmentShader=Tp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gi(t.uniforms),this.uniformsGroups=bp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new kt().setHex(s.value);break;case"v2":this.uniforms[n].value=new rt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Se().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Vt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new he().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Za=class extends an{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ze=class extends Kn{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new kt(16777215),this.specular=new kt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Ar,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var vr=class extends Kn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=Ar,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ja=class extends Kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},$a=class extends Kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function is(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Sa(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var pi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ka=class extends pi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fl,endingEnd:Fl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ol:r=t,o=2*e-n;break;case Bl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ol:a=t,l=2*n-e;break;case Bl:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-e)/(s-e),v=p*p,g=v*p,m=-u*g+2*u*v-u*p,_=(1+u)*g+(-1.5-2*u)*v+(-.5+u)*p+1,S=(-1-d)*g+(1.5+d)*v+.5*p,y=d*g-d*v;for(let A=0;A!==o;++A)r[A]=m*a[h+A]+_*a[c+A]+S*a[l+A]+y*a[f+A];return r}},Qa=class extends pi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),f=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*h;return r}},ja=class extends pi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},to=class extends pi{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(n-e)/(s-e),v=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*v+a[l+g]*p;return r}let u=o*2,d=t-1;for(let p=0;p!==o;++p){let v=a[c+p],g=a[l+p],m=d*u+p*2,_=f[m],S=f[m+1],y=t*u+p*2,A=h[y],T=h[y+1],x=Ap(n,e,_,A,s);r[p]=Gu(x,v,S,T,g)}return r}};function Gu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function wp(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Ap(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Gu(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=wp(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var dn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=is(e,this.TimeBufferType),this.values=is(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:is(t.times,Array),values:is(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Sa(t.settings)&&(n.settings={inTangents:is(t.settings.inTangents,Array),outTangents:is(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ja(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Qa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new to(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case qs:e=this.InterpolantFactoryMethodDiscrete;break;case Fa:e=this.InterpolantFactoryMethodLinear;break;case Ta:e=this.InterpolantFactoryMethodSmooth;break;case Ul:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Bt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qs;case this.InterpolantFactoryMethodLinear:return Fa;case this.InterpolantFactoryMethodSmooth:return Ta;case this.InterpolantFactoryMethodBezier:return Ul}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;Sa(this.settings)&&(Vh(this.settings.inTangents,t),Vh(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Sa(this.settings)&&(Wh(this.settings.inTangents,t),Wh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(zt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(zt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){zt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){zt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&gf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){zt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ta,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*n,u=f-n,d=f+n;for(let p=0;p!==n;++p){let v=e[f+p];if(v!==e[u+p]||v!==e[d+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)e[u+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Sa(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Vh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function Wh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}dn.prototype.ValueTypeName="";dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=Fa;var mi=class extends dn{constructor(t,e,n){super(t,e,n)}};mi.prototype.ValueTypeName="bool";mi.prototype.ValueBufferType=Array;mi.prototype.DefaultInterpolation=qs;mi.prototype.InterpolantFactoryMethodLinear=void 0;mi.prototype.InterpolantFactoryMethodSmooth=void 0;var eo=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}};eo.prototype.ValueTypeName="color";var no=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}};no.prototype.ValueTypeName="number";var io=class extends pi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)je.slerpFlat(r,0,a,c-o,a,c,l);return r}},yr=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new io(this.times,this.values,this.getValueSize(),t)}};yr.prototype.ValueTypeName="quaternion";yr.prototype.InterpolantFactoryMethodSmooth=void 0;var gi=class extends dn{constructor(t,e,n){super(t,e,n)}};gi.prototype.ValueTypeName="string";gi.prototype.ValueBufferType=Array;gi.prototype.DefaultInterpolation=qs;gi.prototype.InterpolantFactoryMethodLinear=void 0;gi.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends dn{constructor(t,e,n,s){super(t,e,n,s)}};so.prototype.ValueTypeName="vector";var Aa={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(Xh(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!Xh(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Xh(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var ro=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Hu=new ro,ys=class{constructor(t){this.manager=t!==void 0?t:Hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ys.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss=new WeakMap,ao=class extends ys{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,a=Aa.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let f=ss.get(a);f===void 0&&(f=[],ss.set(a,f)),f.push({onLoad:e,onError:s})}return a}let o=us("img");function l(){h(),e&&e(this);let f=ss.get(this)||[];for(let u=0;u<f.length;u++){let d=f[u];d.onLoad&&d.onLoad(this)}ss.delete(this),r.manager.itemEnd(t)}function c(f){h(),s&&s(f),Aa.remove(`image:${t}`);let u=ss.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onError&&p.onError(f)}ss.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Aa.add(`image:${t}`,o),r.manager.itemStart(t),o.fetchPriority=this.priority,o.src=t,o}};var Mr=class extends ys{constructor(t){super(t)}load(t,e,n,s){let r=new qe,a=new ao(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Sr=class extends Pe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},br=class extends Sr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Nl=new he,qh=new N,Yh=new N,oo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new di,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;qh.setFromMatrixPosition(t.matrixWorld),e.position.copy(qh),Yh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Nl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Nl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===hs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Nl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ba=new N,Ea=new je,Nn=new N,Er=class extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ba,Ea,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ba,Ea,Nn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ba,Ea,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ba,Ea,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ci=new N,Zh=new rt,Jh=new rt,Qe=class extends Er{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fs*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,Zh,Jh),e.subVectors(Jh,Zh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Tr=class extends Er{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Hl=class extends oo{constructor(){super(new Tr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ms=class extends Sr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new Hl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Ui=class extends ve{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var rs=-90,as=1,Ss=class extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Qe(rs,as,t,e);s.layers=this.layers,this.add(s);let r=new Qe(rs,as,t,e);r.layers=this.layers,this.add(r);let a=new Qe(rs,as,t,e);a.layers=this.layers,this.add(a);let o=new Qe(rs,as,t,e);o.layers=this.layers,this.add(o);let l=new Qe(rs,as,t,e);l.layers=this.layers,this.add(l);let c=new Qe(rs,as,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=v,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},lo=class extends Qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Mc="\\[\\]\\.:\\/",Rp=new RegExp("["+Mc+"]","g"),Sc="[^"+Mc+"]",Cp="[^"+Mc.replace("\\.","")+"]",Ip=/((?:WC+[\/:])*)/.source.replace("WC",Sc),Pp=/(WCOD+)?/.source.replace("WCOD",Cp),Lp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sc),Dp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sc),Np=new RegExp("^"+Ip+Pp+Lp+Dp+"$"),Up=["material","materials","bones","map"],Vl=class{constructor(t,e,n){let s=n||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Rp,"")}static parseTrackName(t){let e=Np.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Up.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Bt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){zt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){zt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){zt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){zt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){zt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){zt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;zt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){zt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=Vl;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ev=new Float32Array(1);var Rc=class Rc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Rc.prototype.isMatrix2=!0;var Wl=Rc;function bc(i,t,e,n){let s=Fp(n);switch(e){case cc:return i*t;case xo:return i*t/s.components*s.byteLength;case _o:return i*t/s.components*s.byteLength;case _i:return i*t*2/s.components*s.byteLength;case vo:return i*t*2/s.components*s.byteLength;case hc:return i*t*3/s.components*s.byteLength;case Dn:return i*t*4/s.components*s.byteLength;case yo:return i*t*4/s.components*s.byteLength;case Cr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pr:case Lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case So:case Eo:return Math.max(i,16)*Math.max(t,8)/4;case Mo:case bo:return Math.max(i,8)*Math.max(t,8)/2;case To:case wo:case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ao:case Dr:case Io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case No:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case zo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ko:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Go:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Vo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Xo:case qo:case Yo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Zo:case Jo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Nr:case $o:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Fp(i){switch(i){case on:case rc:return{byteLength:1,components:1};case ws:case ac:case Ln:return{byteLength:2,components:1};case mo:case go:return{byteLength:2,components:4};case Pn:case po:case yn:return{byteLength:4,components:1};case oc:case lc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function hd(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Vp(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++u,f[u]=v)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let v=f[d];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Wp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$p=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,jp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,t0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,e0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,n0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,i0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,s0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,c0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,h0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,u0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,d0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,f0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,p0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,m0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,g0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,x0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,v0="gl_FragColor = linearToOutputTexel( gl_FragColor );",y0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,M0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,S0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,b0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,T0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,w0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,A0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,R0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,C0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,I0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,P0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,L0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,N0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,U0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,F0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,O0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,B0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,z0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,k0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,G0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,H0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,V0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,W0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,X0=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,q0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Y0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Z0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,K0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Q0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,j0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,em=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,im=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,am=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,om=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,um=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,dm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_m=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,vm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ym=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Em=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Im=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Dm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Um=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Om=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$m=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Km=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ng=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ig=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ag=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,lg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ug=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:Wp,alphahash_pars_fragment:Xp,alphamap_fragment:qp,alphamap_pars_fragment:Yp,alphatest_fragment:Zp,alphatest_pars_fragment:Jp,aomap_fragment:$p,aomap_pars_fragment:Kp,batching_pars_vertex:Qp,batching_vertex:jp,begin_vertex:t0,beginnormal_vertex:e0,bsdfs:n0,iridescence_fragment:i0,bumpmap_pars_fragment:s0,clipping_planes_fragment:r0,clipping_planes_pars_fragment:a0,clipping_planes_pars_vertex:o0,clipping_planes_vertex:l0,color_fragment:c0,color_pars_fragment:h0,color_pars_vertex:u0,color_vertex:d0,common:f0,defaultnormal_vertex:p0,displacementmap_pars_vertex:m0,displacementmap_vertex:g0,emissivemap_fragment:x0,emissivemap_pars_fragment:_0,colorspace_fragment:v0,colorspace_pars_fragment:y0,envmap_fragment:M0,envmap_common_pars_fragment:S0,envmap_pars_fragment:b0,envmap_pars_vertex:E0,envmap_physical_pars_fragment:U0,envmap_vertex:T0,fog_vertex:w0,fog_pars_vertex:A0,fog_fragment:R0,fog_pars_fragment:C0,gradientmap_pars_fragment:I0,lightmap_pars_fragment:P0,lights_lambert_fragment:L0,lights_lambert_pars_fragment:D0,lights_pars_begin:N0,lights_toon_fragment:F0,lights_toon_pars_fragment:O0,lights_phong_fragment:B0,lights_phong_pars_fragment:z0,lights_physical_fragment:k0,lights_physical_pars_fragment:G0,lights_fragment_begin:H0,lights_fragment_maps:V0,lights_fragment_end:W0,lightprobes_pars_fragment:X0,logdepthbuf_fragment:q0,logdepthbuf_pars_fragment:Y0,logdepthbuf_pars_vertex:Z0,logdepthbuf_vertex:J0,map_fragment:$0,map_pars_fragment:K0,map_particle_fragment:Q0,map_particle_pars_fragment:j0,metalnessmap_fragment:tm,metalnessmap_pars_fragment:em,morphinstance_vertex:nm,morphcolor_vertex:im,morphnormal_vertex:sm,morphtarget_pars_vertex:rm,morphtarget_vertex:am,normal_fragment_begin:om,normal_fragment_maps:lm,normal_pars_fragment:cm,normal_pars_vertex:hm,normal_vertex:um,normalmap_pars_fragment:dm,clearcoat_normal_fragment_begin:fm,clearcoat_normal_fragment_maps:pm,clearcoat_pars_fragment:mm,iridescence_pars_fragment:gm,opaque_fragment:xm,packing:_m,premultiplied_alpha_fragment:vm,project_vertex:ym,dithering_fragment:Mm,dithering_pars_fragment:Sm,roughnessmap_fragment:bm,roughnessmap_pars_fragment:Em,shadowmap_pars_fragment:Tm,shadowmap_pars_vertex:wm,shadowmap_vertex:Am,shadowmask_pars_fragment:Rm,skinbase_vertex:Cm,skinning_pars_vertex:Im,skinning_vertex:Pm,skinnormal_vertex:Lm,specularmap_fragment:Dm,specularmap_pars_fragment:Nm,tonemapping_fragment:Um,tonemapping_pars_fragment:Fm,transmission_fragment:Om,transmission_pars_fragment:Bm,uv_pars_fragment:zm,uv_pars_vertex:km,uv_vertex:Gm,worldpos_vertex:Hm,background_vert:Vm,background_frag:Wm,backgroundCube_vert:Xm,backgroundCube_frag:qm,cube_vert:Ym,cube_frag:Zm,depth_vert:Jm,depth_frag:$m,distance_vert:Km,distance_frag:Qm,equirect_vert:jm,equirect_frag:tg,linedashed_vert:eg,linedashed_frag:ng,meshbasic_vert:ig,meshbasic_frag:sg,meshlambert_vert:rg,meshlambert_frag:ag,meshmatcap_vert:og,meshmatcap_frag:lg,meshnormal_vert:cg,meshnormal_frag:hg,meshphong_vert:ug,meshphong_frag:dg,meshphysical_vert:fg,meshphysical_frag:pg,meshtoon_vert:mg,meshtoon_frag:gg,points_vert:xg,points_frag:_g,shadow_vert:vg,shadow_frag:yg,sprite_vert:Mg,sprite_frag:Sg},Mt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},Gn={basic:{uniforms:Je([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Je([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new kt(0)},envMapIntensity:{value:1}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Je([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Je([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Je([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new kt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Je([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Je([Mt.points,Mt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Je([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Je([Mt.common,Mt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Je([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Je([Mt.sprite,Mt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distance:{uniforms:Je([Mt.common,Mt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distance_vert,fragmentShader:$t.distance_frag},shadow:{uniforms:Je([Mt.lights,Mt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Gn.physical={uniforms:Je([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Vt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var Ko={r:0,b:0,g:0},bg=new he,ud=new Vt;ud.set(-1,0,0,0,1,0,0,0,1);function Eg(i,t,e,n,s,r){let a=new kt(0),o=s===!0?0:1,l,c,h=null,f=0,u=null;function d(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){let y=_.backgroundBlurriness>0;S=t.get(S,y)}return S}function p(_){let S=!1,y=d(_);y===null?g(a,o):y&&y.isColor&&(g(y,1),S=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(_,S){let y=d(S);y&&y.isCubeTexture?(c===void 0&&(c=new ye(new _n(1,1,1),new an({name:"BackgroundCubeMaterial",uniforms:Gi(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(bg.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ud),c.material.toneMapped=se.getTransfer(y.colorSpace)!==de,(h!==y||f!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ye(new Ye(2,2),new an({name:"BackgroundMaterial",uniforms:Gi(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=se.getTransfer(y.colorSpace)!==de,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function g(_,S){_.getRGB(Ko,yc(i)),e.buffers.color.setClear(Ko.r,Ko.g,Ko.b,S,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,S=1){a.set(_),o=S,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,g(a,o)},render:p,addToRenderList:v,dispose:m}}function Tg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(w,R,O,L,B){let V=!1,H=f(w,L,O,R);r!==H&&(r=H,c(r.object)),V=d(w,L,O,B),V&&p(w,L,O,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,y(w,R,O,L),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return i.createVertexArray()}function c(w){return i.bindVertexArray(w)}function h(w){return i.deleteVertexArray(w)}function f(w,R,O,L){let B=L.wireframe===!0,V=n[R.id];V===void 0&&(V={},n[R.id]=V);let H=w.isInstancedMesh===!0?w.id:0,et=V[H];et===void 0&&(et={},V[H]=et);let X=et[O.id];X===void 0&&(X={},et[O.id]=X);let Q=X[B];return Q===void 0&&(Q=u(l()),X[B]=Q),Q}function u(w){let R=[],O=[],L=[];for(let B=0;B<e;B++)R[B]=0,O[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:O,attributeDivisors:L,object:w,attributes:{},index:null}}function d(w,R,O,L){let B=r.attributes,V=R.attributes,H=0,et=O.getAttributes();for(let X in et)if(et[X].location>=0){let tt=B[X],Tt=V[X];if(Tt===void 0&&(X==="instanceMatrix"&&w.instanceMatrix&&(Tt=w.instanceMatrix),X==="instanceColor"&&w.instanceColor&&(Tt=w.instanceColor)),tt===void 0||tt.attribute!==Tt||Tt&&tt.data!==Tt.data)return!0;H++}return r.attributesNum!==H||r.index!==L}function p(w,R,O,L){let B={},V=R.attributes,H=0,et=O.getAttributes();for(let X in et)if(et[X].location>=0){let tt=V[X];tt===void 0&&(X==="instanceMatrix"&&w.instanceMatrix&&(tt=w.instanceMatrix),X==="instanceColor"&&w.instanceColor&&(tt=w.instanceColor));let Tt={};Tt.attribute=tt,tt&&tt.data&&(Tt.data=tt.data),B[X]=Tt,H++}r.attributes=B,r.attributesNum=H,r.index=L}function v(){let w=r.newAttributes;for(let R=0,O=w.length;R<O;R++)w[R]=0}function g(w){m(w,0)}function m(w,R){let O=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;O[w]=1,L[w]===0&&(i.enableVertexAttribArray(w),L[w]=1),B[w]!==R&&(i.vertexAttribDivisor(w,R),B[w]=R)}function _(){let w=r.newAttributes,R=r.enabledAttributes;for(let O=0,L=R.length;O<L;O++)R[O]!==w[O]&&(i.disableVertexAttribArray(O),R[O]=0)}function S(w,R,O,L,B,V,H){H===!0?i.vertexAttribIPointer(w,R,O,B,V):i.vertexAttribPointer(w,R,O,L,B,V)}function y(w,R,O,L){v();let B=L.attributes,V=O.getAttributes(),H=R.defaultAttributeValues;for(let et in V){let X=V[et];if(X.location>=0){let Q=B[et];if(Q===void 0&&(et==="instanceMatrix"&&w.instanceMatrix&&(Q=w.instanceMatrix),et==="instanceColor"&&w.instanceColor&&(Q=w.instanceColor)),Q!==void 0){let tt=Q.normalized,Tt=Q.itemSize,Ut=t.get(Q);if(Ut===void 0)continue;let Y=Ut.buffer,_t=Ut.type,bt=Ut.bytesPerElement,Dt=_t===i.INT||_t===i.UNSIGNED_INT||Q.gpuType===po;if(Q.isInterleavedBufferAttribute){let xt=Q.data,It=xt.isInterleavedBuffer===!0?xt.stride:xt.itemSize,pe=Q.offset;if(xt.isInstancedInterleavedBuffer||xt.isInstancedBufferAttribute){for(let nt=0;nt<X.locationSize;nt++)m(X.location+nt,xt.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let nt=0;nt<X.locationSize;nt++)g(X.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let nt=0;nt<X.locationSize;nt++)S(X.location+nt,Tt/X.locationSize,_t,tt,It*bt,(pe+Tt/X.locationSize*nt)*bt,Dt)}else{if(Q.isInstancedBufferAttribute){for(let xt=0;xt<X.locationSize;xt++)m(X.location+xt,Q.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let xt=0;xt<X.locationSize;xt++)g(X.location+xt);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let xt=0;xt<X.locationSize;xt++)S(X.location+xt,Tt/X.locationSize,_t,tt,Tt*bt,Tt/X.locationSize*xt*bt,Dt)}}else if(H!==void 0){let tt=H[et];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(X.location,tt);break;case 3:i.vertexAttrib3fv(X.location,tt);break;case 4:i.vertexAttrib4fv(X.location,tt);break;default:i.vertexAttrib1fv(X.location,tt)}}}}_()}function A(){C();for(let w in n){let R=n[w];for(let O in R){let L=R[O];for(let B in L){let V=L[B];for(let H in V)h(V[H].object),delete V[H];delete L[B]}}delete n[w]}}function T(w){if(n[w.id]===void 0)return;let R=n[w.id];for(let O in R){let L=R[O];for(let B in L){let V=L[B];for(let H in V)h(V[H].object),delete V[H];delete L[B]}}delete n[w.id]}function x(w){for(let R in n){let O=n[R];for(let L in O){let B=O[L];if(B[w.id]===void 0)continue;let V=B[w.id];for(let H in V)h(V[H].object),delete V[H];delete B[w.id]}}}function M(w){for(let R in n){let O=n[R],L=w.isInstancedMesh===!0?w.id:0,B=O[L];if(B!==void 0){for(let V in B){let H=B[V];for(let et in H)h(H[et].object),delete H[et];delete B[V]}delete O[L],Object.keys(O).length===0&&delete n[R]}}}function C(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function wg(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ag(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==Dn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let M=x===Ln&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==on&&x!==yn&&!M&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Bt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Bt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:y,maxSamples:A,samples:T}}function Rg(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Cn,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,m=i.get(f);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{let _=r?0:n,S=_*4,y=m.clippingState||null;l.value=y,y=h(p,u,S,d);for(let A=0;A!==S;++A)y[A]=e[A];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,p){let v=f!==null?f.length:0,g=null;if(v!==0){if(g=l.value,p!==!0||g===null){let m=d+v*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let S=0,y=d;S!==v;++S,y+=4)a.copy(f[S]).applyMatrix4(_,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}var Br=class extends hn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new er(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new _n(5,5,5),r=new an({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Fi});r.uniforms.tEquirect.value=e;let a=new ye(s,r),o=e.minFilter;return e.minFilter===In&&(e.minFilter=Ge),new Ss(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},Vu=256,Cg=3,Ig=20,dd=256,fd=16,Pg=3,Lg=new N,Dg=new kt,jo=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ss(1,10,null),this._boxMesh=new ye(new _n(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Lg}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,u=l.autoClearColor,d=l.autoClearDepth,p=l.autoClearStencil,v=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(t.background=l.getClearColor(Dg));let g=new Ss(n,s,h);return g.position.copy(o),g.update(l,t),l.autoClear=f,l.autoClearColor=u,l.autoClearDepth=d,l.autoClearStencil=p,t.background=v,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Vu,xc(t))}_fromTexture(t,e){t.mapping===Bi||t.mapping===Ts?this._setSize(t.image.length===0?Vu:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Wu(t,!1,!1),n=Math.log2(t)-Cg;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Wu(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Bi||t.mapping===Ts?(this._cubemapMaterial===null&&(this._cubemapMaterial=qu()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Xu()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Ng(),this._integrationMaterial=Ug());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/fd);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-Pg)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(dd*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Fg());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Wu(i,t,e){return new Br(i,{minFilter:In,generateMipmaps:t,type:Ln,colorSpace:Ys,depthBuffer:e})}function zr(i,t,e){return new an({name:i,uniforms:t,vertexShader:$t.cube_vert,fragmentShader:e,side:en,blending:Fi,depthTest:!1,depthWrite:!1})}function Ng(){return zr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${dd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Ug(){return zr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:fd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Fg(){return zr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ig}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Xu(){return zr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function qu(){return zr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Og(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===ho||d===uo)if(t.has(u)){let p=t.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let v=new Br(p.height);return v.fromEquirectangularTexture(i,u),t.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,p=d===ho||d===uo,v=d===Bi||d===Ts;if(p||v){let g=e.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new jo(i)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let _=u.image;return p&&_&&_.height>0||v&&_&&l(_)?(n===null&&(n=new jo(i)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===ho?u.mapping=Bi:d===uo&&(u.mapping=Ts),u}function l(u){let d=0,p=6;for(let v=0;v<p;v++)u[v]!==void 0&&d++;return d===p}function c(u){let d=u.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Bg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Gs("WebGLRenderer: "+n+" extension not supported."),s}}}function zg(i,t,e,n){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let g in p.attributes)t.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let v=r.get(p);v&&(t.remove(v),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,v){return s[v.id]!==void 0||(v.addEventListener("dispose",o),s[v.id]=new WeakRef(v),a.register(v,v.id,v),e.memory.geometries++),v}function h(p){let v=p.attributes;for(let g in v)t.update(v[g],i.ARRAY_BUFFER)}function f(p){let v=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let _=v!==null?v.array.length:g.array.length/3-1,S=g.count>=65535?js:Qs,y=new S(Math.ceil(_/3)*6,1),A=y.array;if(v!==null){let x=v.array;m=v.version;for(let M=0,C=0;M<_;M+=3){let I=x[M+0],w=x[M+1],R=x[M+2];A[C++]=I,A[C++]=w,A[C++]=w,A[C++]=R,A[C++]=R,A[C++]=I}}else{m=g.version;for(let x=0,M=0;x<_;x+=3){let C=x+0,I=x+1,w=x+2;A[M++]=C,A[M++]=I,A[M++]=I,A[M++]=w,A[M++]=w,A[M++]=C}}y.version=m;let T=r.get(p);T&&t.remove(T),r.set(p,y)}function u(p){let v=r.get(p);if(v){let g=p.index;g!==null&&v.version<g.version&&f(p)}else f(p);return r.get(p)}function d(){for(let p in s){let v=s[p].deref();v!==void 0&&l(v)}}return{get:c,update:h,getWireframeAttribute:u,dispose:d}}function kg(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){i.drawElements(n,u,r,f*a),e.update(u,n,1)}function c(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*a,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let v=0;for(let g=0;g<d;g++)v+=u[g];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Gg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:zt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Hg(i,t,e){let n=new WeakMap,s=new Se;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let C=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],S=0;d===!0&&(S=1),p===!0&&(S=2),v===!0&&(S=3);let y=o.attributes.position.count*S,A=1;y>t.maxTextureSize&&(A=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*A*4*f),x=new Js(T,y,A,f);x.type=yn,x.needsUpdate=!0;let M=S*4;for(let I=0;I<f;I++){let w=g[I],R=m[I],O=_[I],L=y*A*4*I;for(let B=0;B<w.count;B++){let V=B*M;d===!0&&(s.fromBufferAttribute(w,B),T[L+V+0]=s.x,T[L+V+1]=s.y,T[L+V+2]=s.z,T[L+V+3]=0),p===!0&&(s.fromBufferAttribute(R,B),T[L+V+4]=s.x,T[L+V+5]=s.y,T[L+V+6]=s.z,T[L+V+7]=0),v===!0&&(s.fromBufferAttribute(O,B),T[L+V+8]=s.x,T[L+V+9]=s.y,T[L+V+10]=s.z,T[L+V+11]=O.itemSize===4?s.w:1)}}u={count:f,texture:x,size:new rt(y,A)},n.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Vg(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Wg={[Kl]:"LINEAR_TONE_MAPPING",[Ql]:"REINHARD_TONE_MAPPING",[jl]:"CINEON_TONE_MAPPING",[tc]:"ACES_FILMIC_TONE_MAPPING",[nc]:"AGX_TONE_MAPPING",[ic]:"NEUTRAL_TONE_MAPPING",[ec]:"CUSTOM_TONE_MAPPING"};function Xg(i,t,e,n,s,r){let a=new hn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new ve;h.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new qt([0,2,0,0,2,0],2));let f=new Za({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new ye(h,f),d=new Tr(-1,1,1,-1,0,1),p=null,v=null,g=!1,m,_=null,S=[],y=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let x=0;x<S.length;x++){let M=S[x];M.setSize&&M.setSize(A,T)}},this.setEffects=function(A){S=A,y=S.length>0&&S[0].isRenderPass===!0;let T=a.width,x=a.height;S.length>0&&o===null&&(o=new hn(T,x,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),l=new hn(T,x,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&S.some(C=>C.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new Qn(T,x),r===!0&&(c.format=jn,c.type=zi)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let C=0;C<S.length;C++){let I=S[C];I.setSize&&I.setSize(T,x),M&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(c)}},this.begin=function(A,T){if(g||A.toneMapping===zn&&S.length===0)return!1;if(_=T,T!==null){let x=T.width,M=T.height;(a.width!==x||a.height!==M)&&this.setSize(x,M)}return y===!1&&A.setRenderTarget(a),m=A.toneMapping,A.toneMapping=zn,!0},this.hasRenderPass=function(){return y},this.end=function(A,T){A.toneMapping=m,g=!0;let x=a,M=o;for(let C=0;C<S.length;C++){let I=S[C];I.enabled!==!1&&(I.render(A,M,x,T),I.needsSwap!==!1&&(x=M,M=M===o?l:o))}if(p!==A.outputColorSpace||v!==A.toneMapping){p=A.outputColorSpace,v=A.toneMapping,f.defines={},se.getTransfer(p)===de&&(f.defines.SRGB_TRANSFER="");let C=Wg[v];C&&(f.defines[C]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(_),A.render(u,d),_=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}var pd=new qe,md=new Qn(1,1),gd=new nr(1),xd=new Js,_d=new za,vd=new er,Yu=[],Zu=[],Ju=new Float32Array(16),$u=new Float32Array(9),Ku=new Float32Array(4);function Rs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Yu[s];if(r===void 0&&(r=new Float32Array(s),Yu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function De(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ne(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function el(i,t){let e=Zu[t];e===void 0&&(e=new Int32Array(t),Zu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function qg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2fv(this.addr,t),Ne(e,t)}}function Zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;i.uniform3fv(this.addr,t),Ne(e,t)}}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4fv(this.addr,t),Ne(e,t)}}function $g(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ne(e,t)}else{if(De(e,n))return;Ku.set(n),i.uniformMatrix2fv(this.addr,!1,Ku),Ne(e,n)}}function Kg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ne(e,t)}else{if(De(e,n))return;$u.set(n),i.uniformMatrix3fv(this.addr,!1,$u),Ne(e,n)}}function Qg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ne(e,t)}else{if(De(e,n))return;Ju.set(n),i.uniformMatrix4fv(this.addr,!1,Ju),Ne(e,n)}}function jg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function tx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2iv(this.addr,t),Ne(e,t)}}function ex(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3iv(this.addr,t),Ne(e,t)}}function nx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4iv(this.addr,t),Ne(e,t)}}function ix(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function sx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2uiv(this.addr,t),Ne(e,t)}}function rx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3uiv(this.addr,t),Ne(e,t)}}function ax(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4uiv(this.addr,t),Ne(e,t)}}function nl(i){return i.version===0&&(i.compareFunction=fc,i.needsUpdate=!0),i}function ox(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=nl(md):r=pd,e.setTexture2D(t||r,s)}function lx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||_d,s)}function cx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=nl(gd):r=vd,e.setTextureCube(t||r,s)}function hx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||xd,s)}function ux(i){switch(i){case 5126:return qg;case 35664:return Yg;case 35665:return Zg;case 35666:return Jg;case 35674:return $g;case 35675:return Kg;case 35676:return Qg;case 5124:case 35670:return jg;case 35667:case 35671:return tx;case 35668:case 35672:return ex;case 35669:case 35673:return nx;case 5125:return ix;case 36294:return sx;case 36295:return rx;case 36296:return ax;case 35678:case 36198:case 36298:case 36306:case 35682:return ox;case 35679:case 36299:case 36307:return lx;case 35680:case 36300:case 36308:case 36293:return cx;case 36289:case 36303:case 36311:case 36292:return hx}}function dx(i,t){i.uniform1fv(this.addr,t)}function fx(i,t){let e=Rs(t,this.size,2);i.uniform2fv(this.addr,e)}function px(i,t){let e=Rs(t,this.size,3);i.uniform3fv(this.addr,e)}function mx(i,t){let e=Rs(t,this.size,4);i.uniform4fv(this.addr,e)}function gx(i,t){let e=Rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function xx(i,t){let e=Rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function _x(i,t){let e=Rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function vx(i,t){i.uniform1iv(this.addr,t)}function yx(i,t){i.uniform2iv(this.addr,t)}function Mx(i,t){i.uniform3iv(this.addr,t)}function Sx(i,t){i.uniform4iv(this.addr,t)}function bx(i,t){i.uniform1uiv(this.addr,t)}function Ex(i,t){i.uniform2uiv(this.addr,t)}function Tx(i,t){i.uniform3uiv(this.addr,t)}function wx(i,t){i.uniform4uiv(this.addr,t)}function Ax(i,t,e){let n=this.cache,s=t.length,r=el(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ne(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=nl(md):a=pd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Rx(i,t,e){let n=this.cache,s=t.length,r=el(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ne(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||_d,r[a])}function Cx(i,t,e){let n=this.cache,s=t.length,r=el(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ne(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=nl(gd):a=vd;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function Ix(i,t,e){let n=this.cache,s=t.length,r=el(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ne(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||xd,r[a])}function Px(i){switch(i){case 5126:return dx;case 35664:return fx;case 35665:return px;case 35666:return mx;case 35674:return gx;case 35675:return xx;case 35676:return _x;case 5124:case 35670:return vx;case 35667:case 35671:return yx;case 35668:case 35672:return Mx;case 35669:case 35673:return Sx;case 5125:return bx;case 36294:return Ex;case 36295:return Tx;case 36296:return wx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ax;case 35679:case 36299:case 36307:return Rx;case 35680:case 36300:case 36308:case 36293:return Cx;case 36289:case 36303:case 36311:case 36292:return Ix}}var Pc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ux(e.type)}},Lc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Px(e.type)}},Dc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Cc=/(\w+)(\])?(\[|\.)?/g;function Qu(i,t){i.seq.push(t),i.map[t.id]=t}function Lx(i,t,e){let n=i.name,s=n.length;for(Cc.lastIndex=0;;){let r=Cc.exec(n),a=Cc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Qu(e,c===void 0?new Pc(o,i,t):new Lc(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new Dc(o),Qu(e,f)),e=f}}}var As=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Lx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function ju(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Dx=37297,Nx=0;function Ux(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var td=new Vt;function Fx(i){se._getMatrix(td,se.workingColorSpace,i);let t=`mat3( ${td.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case Zs:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return Bt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ed(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Ux(i.getShaderSource(t),o)}else return r}function Ox(i,t){let e=Fx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Bx={[Kl]:"Linear",[Ql]:"Reinhard",[jl]:"Cineon",[tc]:"ACESFilmic",[nc]:"AgX",[ic]:"Neutral",[ec]:"Custom"};function zx(i,t){let e=Bx[t];return e===void 0?(Bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Qo=new N;function kx(){se.getLuminanceCoefficients(Qo);let i=Qo.x.toFixed(4),t=Qo.y.toFixed(4),e=Qo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Or).join(`
`)}function Hx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Or(i){return i!==""}function nd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function id(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Wx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nc(i){return i.replace(Wx,Xx)}function Xx(i,t){let e=$t[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Nc(e)}var qx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sd(i){return i.replace(qx,Yx)}function Yx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Zx={[wr]:"SHADOWMAP_TYPE_PCF",[bs]:"SHADOWMAP_TYPE_VSM"};function Jx(i){return Zx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var $x={[Ts]:"ENVMAP_MODE_REFRACTION"};function Kx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":$x[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Qx={[Ar]:"ENVMAP_BLENDING_MULTIPLY",[xu]:"ENVMAP_BLENDING_MIX",[_u]:"ENVMAP_BLENDING_ADD"};function jx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Qx[i.combine]||"ENVMAP_BLENDING_NONE"}function t_(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Jx(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Kx(e),f=jx(e),u=Gx(e),d=Hx(r),p=s.createProgram(),v,g,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Or).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Or).join(`
`),g.length>0&&(g+=`
`)):(v=[rd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Or).join(`
`),g=[rd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?$t.tonemapping_pars_fragment:"",e.toneMapping!==zn?zx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,Ox("linearToOutputTexel",e.outputColorSpace),kx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Or).join(`
`)),a=Nc(a),a=nd(a,e),a=id(a,e),o=Nc(o),o=nd(o,e),o=id(o,e),a=sd(a),o=sd(o),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,v=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",e.glslVersion===pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=m+v+a,S=m+g+o,y=ju(s,s.VERTEX_SHADER,_),A=ju(s,s.FRAGMENT_SHADER,S);s.attachShader(p,y),s.attachShader(p,A),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function T(I){if(i.debug.checkShaderErrors){let w=s.getProgramInfoLog(p)||"",R=s.getShaderInfoLog(y)||"",O=s.getShaderInfoLog(A)||"",L=w.trim(),B=R.trim(),V=O.trim(),H=!0,et=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,y,A);else{let X=ed(s,y,"vertex"),Q=ed(s,A,"fragment");zt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+L+`
`+X+`
`+Q)}else L!==""?Bt("WebGLProgram: Program Info Log:",L):(B===""||V==="")&&(et=!1);et&&(I.diagnostics={runnable:H,programLog:L,vertexShader:{log:B,prefix:v},fragmentShader:{log:V,prefix:g}})}s.deleteShader(y),s.deleteShader(A),x=new As(s,p),M=Vx(s,p)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(p,Dx)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Nx++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=y,this.fragmentShader=A,this}var e_=0,Uc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Fc(t),e.set(t,n)),n}},Fc=class{constructor(t){this.id=e_++,this.code=t,this.usedTimes=0}};function n_(i){return i===_i||i===Dr||i===Nr}function i_(i,t,e,n,s,r){let a=new $s,o=new Uc,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,M,C,I,w,R){let O=I.fog,L=w.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,H=t.get(x.envMap||B,V),et=u[x.type],X=n.precision;x.precision!==null&&(X=n.getMaxPrecision(x.precision),X!==x.precision&&Bt("WebGLProgram.getParameters:",x.precision,"not supported, using",X,"instead."));let Q=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,tt=Q!==void 0?Q.length:0,Tt=0;L.morphAttributes.position!==void 0&&(Tt=1),L.morphAttributes.normal!==void 0&&(Tt=2),L.morphAttributes.color!==void 0&&(Tt=3);let Ut,Y,_t,bt;if(et){let yt=Gn[et];Ut=yt.vertexShader,Y=yt.fragmentShader}else{Ut=x.vertexShader,Y=x.fragmentShader;let yt=o.getVertexShaderStage(x),fe=o.getFragmentShaderStage(x);o.update(x,yt,fe),_t=yt.id,bt=fe.id}let Dt=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),It=w.isInstancedMesh===!0,pe=w.isBatchedMesh===!0,nt=!!x.map,At=!!x.matcap,jt=!!H,j=jt&&H.isPMREMTexture===!0,ht=!!x.aoMap,ot=!!x.lightMap,Et=!!x.bumpMap&&x.wireframe===!1,vt=!!x.normalMap,Yt=!!x.displacementMap,Lt=!!x.emissiveMap,te=!!x.metalnessMap,ee=!!x.roughnessMap,ce=x.anisotropy>0,F=x.clearcoat>0,Re=x.diffuseRoughness>0,Qt=x.dispersion>0,ge=x.retroreflectivity>0,pt=x.iridescence>0,we=x.sheen>0,Ot=x.transmission>0,Ht=ce&&!!x.anisotropyMap,P=F&&!!x.clearcoatMap,b=F&&!!x.clearcoatNormalMap,k=F&&!!x.clearcoatRoughnessMap,it=Re&&!!x.diffuseRoughnessMap,K=pt&&!!x.iridescenceMap,lt=pt&&!!x.iridescenceThicknessMap,mt=we&&!!x.sheenColorMap,Z=we&&!!x.sheenRoughnessMap,J=!!x.specularMap,ut=!!x.specularColorMap,D=!!x.specularIntensityMap,$=Ot&&!!x.transmissionMap,q=Ot&&!!x.thicknessMap,dt=!!x.gradientMap,at=!!x.alphaMap,ct=x.alphaTest>0,Nt=!!x.alphaHash,Jt=!!x.extensions,st=zn;x.toneMapped&&(Dt===null||Dt.isXRRenderTarget===!0)&&(st=i.toneMapping);let Ft=j?H.isCompressedCubeTexture?H.image[0].mipmaps:H.mipmaps:null,Zt={shaderID:et,shaderType:x.type,shaderName:x.name,vertexShader:Ut,fragmentShader:Y,defines:x.defines,customVertexShaderID:_t,customFragmentShaderID:bt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:X,batching:pe,batchingColor:pe&&w._colorsTexture!==null,instancing:It,instancingColor:It&&w.instanceColor!==null,instancingMorph:It&&w.morphTexture!==null,outputColorSpace:Dt===null?i.outputColorSpace:Dt.isXRRenderTarget===!0?Dt.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:nt,matcap:At,envMap:jt,envMapMode:jt&&H.mapping,envMapPMREM:j,envMapMaxLod:j?Ft.length-1:null,envMapSize:j?Ft[0].width:null,aoMap:ht,lightMap:ot,bumpMap:Et,normalMap:vt,displacementMap:Yt,emissiveMap:Lt,normalMapObjectSpace:vt&&x.normalMapType===Mu,normalMapTangentSpace:vt&&x.normalMapType===Ur,packedNormalMap:vt&&x.normalMapType===Ur&&n_(x.normalMap.format),metalnessMap:te,roughnessMap:ee,anisotropy:ce,anisotropyMap:Ht,clearcoat:F,clearcoatMap:P,clearcoatNormalMap:b,clearcoatRoughnessMap:k,diffuseRoughness:Re,diffuseRoughnessMap:it,dispersion:Qt,retroreflection:ge,iridescence:pt,iridescenceMap:K,iridescenceThicknessMap:lt,sheen:we,sheenColorMap:mt,sheenRoughnessMap:Z,specularMap:J,specularColorMap:ut,specularIntensityMap:D,transmission:Ot,transmissionMap:$,thicknessMap:q,gradientMap:dt,opaque:x.transparent===!1&&x.blending===Es&&x.alphaToCoverage===!1,alphaMap:at,alphaTest:ct,alphaHash:Nt,combine:x.combine,mapUv:nt&&d(x.map.channel),aoMapUv:ht&&d(x.aoMap.channel),lightMapUv:ot&&d(x.lightMap.channel),bumpMapUv:Et&&d(x.bumpMap.channel),normalMapUv:vt&&d(x.normalMap.channel),displacementMapUv:Yt&&d(x.displacementMap.channel),emissiveMapUv:Lt&&d(x.emissiveMap.channel),metalnessMapUv:te&&d(x.metalnessMap.channel),roughnessMapUv:ee&&d(x.roughnessMap.channel),anisotropyMapUv:Ht&&d(x.anisotropyMap.channel),clearcoatMapUv:P&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:b&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:it&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:K&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:Z&&d(x.sheenRoughnessMap.channel),specularMapUv:J&&d(x.specularMap.channel),specularColorMapUv:ut&&d(x.specularColorMap.channel),specularIntensityMapUv:D&&d(x.specularIntensityMap.channel),transmissionMapUv:$&&d(x.transmissionMap.channel),thicknessMapUv:q&&d(x.thicknessMap.channel),alphaMapUv:at&&d(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(vt||ce),vertexNormals:!!L.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!L.attributes.uv&&(nt||at),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||L.attributes.normal===void 0&&vt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:xt,skinning:w.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:Tt,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:R.filter(yt=>yt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:nt&&x.map.isVideoTexture===!0&&se.getTransfer(x.map.colorSpace)===de,decodeVideoTextureEmissive:Lt&&x.emissiveMap.isVideoTexture===!0&&se.getTransfer(x.emissiveMap.colorSpace)===de,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vn,flipSided:x.side===en,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Jt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&x.extensions.multiDraw===!0||pe)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Zt.vertexUv1s=l.has(1),Zt.vertexUv2s=l.has(2),Zt.vertexUv3s=l.has(3),l.clear(),Zt}function v(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)M.push(C),M.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(g(M,x),m(M,x),M.push(i.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function g(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function m(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function _(x){let M=u[x.type],C;if(M){let I=Gn[M];C=ku.clone(I.uniforms)}else C=x.uniforms;return C}function S(x,M){let C=h.get(M);return C!==void 0?++C.usedTimes:(C=new t_(i,M,x,s),c.push(C),h.set(M,C)),C}function y(x){if(--x.usedTimes===0){let M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:p,getProgramCacheKey:v,getUniforms:_,acquireProgram:S,releaseProgram:y,releaseShaderCache:A,programs:c,dispose:T}}function s_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function r_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function ad(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function od(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,v,g,m){let _=i[t];return _===void 0?(_={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:g,group:m},i[t]=_):(_.id=u.id,_.object=u,_.geometry=d,_.material=p,_.materialVariant=a(u),_.groupOrder=v,_.renderOrder=u.renderOrder,_.z=g,_.group=m),t++,_}function l(u,d,p,v,g,m,_){_.reversedDepth===!0&&(g=-g);let S=o(u,d,p,v,g,m);p.transmission>0?n.push(S):p.transparent===!0?s.push(S):e.push(S)}function c(u,d,p,v,g,m){let _=o(u,d,p,v,g,m);p.transmission>0?n.unshift(_):p.transparent===!0?s.unshift(_):e.unshift(_)}function h(u,d){e.length>1&&e.sort(u||r_),n.length>1&&n.sort(d||ad),s.length>1&&s.sort(d||ad)}function f(){for(let u=t,d=i.length;u<d;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function a_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new od,i.set(n,[a])):s>=r.length?(a=new od,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function o_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new kt};break;case"SpotLight":e={position:new N,direction:new N,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function l_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var c_=0;function h_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function u_(i){let t=new o_,e=l_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let s=new N,r=new he,a=new he;function o(c){let h=0,f=0,u=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,_=0,S=0,y=0,A=0,T=0,x=0,M=0,C=0,I=0;c.sort(h_);for(let R=0,O=c.length;R<O;R++){let L=c[R],B=L.color,V=L.intensity,H=L.distance,et=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===_i?et=L.shadow.map.texture:et=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=B.r*V,f+=B.g*V,u+=B.b*V;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],V);I++}else if(L.isSunLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,tt=e.get(L);tt.shadowIntensity=Q.intensity,tt.shadowBias=Q.bias,tt.shadowNormalBias=Q.normalBias,tt.shadowRadius=Q.radius,tt.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[p]=tt,n.sunShadowMap[p]=et;let Tt=Q.getViewportCount();for(let Ut=0;Ut<Tt;Ut++)n.sunShadowMatrix[v+Ut]=Q.getMatrix(Ut),n.sunShadowCascade[v+Ut]=Q._cascadeData[Ut];v+=Tt,p++}n.sun[d]=X,d++}else if(L.isDirectionalLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,tt=e.get(L);tt.shadowIntensity=Q.intensity,tt.shadowBias=Q.bias,tt.shadowNormalBias=Q.normalBias,tt.shadowRadius=Q.radius,tt.shadowMapSize=Q.mapSize,n.directionalShadow[g]=tt,n.directionalShadowMap[g]=et,n.directionalShadowMatrix[g]=L.shadow.matrix,A++}n.directional[g]=X,g++}else if(L.isSpotLight){let X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(B).multiplyScalar(V),X.distance=H,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[_]=X;let Q=L.shadow;if(L.map&&(n.spotLightMap[M]=L.map,M++,Q.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[_]=Q.matrix,L.castShadow){let tt=e.get(L);tt.shadowIntensity=Q.intensity,tt.shadowBias=Q.bias,tt.shadowNormalBias=Q.normalBias,tt.shadowRadius=Q.radius,tt.shadowMapSize=Q.mapSize,n.spotShadow[_]=tt,n.spotShadowMap[_]=et,x++}_++}else if(L.isRectAreaLight){let X=t.get(L);X.color.copy(B).multiplyScalar(V),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[S]=X,S++}else if(L.isPointLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){let Q=L.shadow,tt=e.get(L);tt.shadowIntensity=Q.intensity,tt.shadowBias=Q.bias,tt.shadowNormalBias=Q.normalBias,tt.shadowRadius=Q.radius,tt.shadowMapSize=Q.mapSize,tt.shadowCameraNear=Q.camera.near,tt.shadowCameraFar=Q.camera.far,n.pointShadow[m]=tt,n.pointShadowMap[m]=et,n.pointShadowMatrix[m]=L.shadow.matrix,T++}n.point[m]=X,m++}else if(L.isHemisphereLight){let X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(V),X.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[y]=X,y++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Mt.LTC_FLOAT_1,n.rectAreaLTC2=Mt.LTC_FLOAT_2):(n.rectAreaLTC1=Mt.LTC_HALF_1,n.rectAreaLTC2=Mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let w=n.hash;(w.sunLength!==d||w.directionalLength!==g||w.pointLength!==m||w.spotLength!==_||w.rectAreaLength!==S||w.hemiLength!==y||w.numSunShadows!==p||w.numDirectionalShadows!==A||w.numPointShadows!==T||w.numSpotShadows!==x||w.numSpotMaps!==M||w.numLightProbes!==I)&&(n.sun.length=d,n.directional.length=g,n.spot.length=_,n.rectArea.length=S,n.point.length=m,n.hemi.length=y,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+M-C,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=I,w.sunLength=d,w.directionalLength=g,w.pointLength=m,w.spotLength=_,w.rectAreaLength=S,w.hemiLength=y,w.numSunShadows=p,w.numDirectionalShadows=A,w.numPointShadows=T,w.numSpotShadows=x,w.numSpotMaps=M,w.numLightProbes=I,n.version=c_++)}function l(c,h){let f=0,u=0,d=0,p=0,v=0,g=0,m=h.matrixWorldInverse;for(let _=0,S=c.length;_<S;_++){let y=c[_];if(y.isSunLight){let A=n.sun[f];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(m),f++}else if(y.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),u++}else if(y.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let A=n.rectArea[v];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){let A=n.point[d];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let A=n.hemi[g];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function ld(i){let t=new u_(i),e=[],n=[],s=[];function r(f){h.camera=f,e.length=0,n.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):e.push(f)}function o(f){n.push(f)}function l(){t.setup(e),s.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function c(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function d_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new ld(i),t.set(s,[o])):r>=a.length?(o=new ld(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var f_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,p_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,m_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],g_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],cd=new he,Fr=new N,Ic=new N;function x_(i,t,e){let n=new di,s=new rt,r=new rt,a=new Se,o=new Ja,l=new $a,c={},h=e.maxTextureSize,f={[xi]:en,[en]:xi,[vn]:vn},u=new an({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:f_,fragmentShader:p_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new ve;p.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ye(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wr;let m=this.type;this.render=function(T,x,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Qh&&(Bt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=wr);let C=i.getRenderTarget(),I=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),R=i.state;R.setBlending(Fi),R.buffers.depth.getReversed()===!0?R.buffers.color.setClear(0,0,0,0):R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);let O=m!==this.type;O&&x.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(B=>B.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,B=T.length;L<B;L++){let V=T[L],H=V.shadow;if(H===void 0){Bt("WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let et=H.getFrameExtents();s.multiply(et),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/et.x),s.x=r.x*et.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/et.y),s.y=r.y*et.y,H.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=X,H.map===null||O===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===bs){if(V.isPointLight){Bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new hn(s.x,s.y,{format:_i,type:Ln,minFilter:Ge,magFilter:Ge,generateMipmaps:!1}),H.map.texture.name=V.name+".shadowMap",H.map.depthTexture=new Qn(s.x,s.y,yn),H.map.depthTexture.name=V.name+".shadowMapDepth",H.map.depthTexture.format=$n,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ze,H.map.depthTexture.magFilter=ze}else V.isPointLight?(H.map=new Br(s.x),H.map.depthTexture=new nr(s.x,Pn)):(H.map=new hn(s.x,s.y),H.map.depthTexture=new Qn(s.x,s.y,Pn)),H.map.depthTexture.name=V.name+".shadowMap",H.map.depthTexture.format=$n,this.type===wr?(H.map.depthTexture.compareFunction=X?dc:uc,H.map.depthTexture.minFilter=Ge,H.map.depthTexture.magFilter=Ge):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ze,H.map.depthTexture.magFilter=ze);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);let Q=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();V.isPointLight!==!0&&H.updateMatrices(V,M);let tt=(H.camera.layers.mask&4294967294)!==0?H.camera.layers:M.layers;for(let Tt=0;Tt<Q;Tt++){let Ut=H.getCamera(Tt);if(V.isPointLight){let Y=H.camera,_t=H.matrix,bt=V.distance||Y.far;bt!==Y.far&&(Y.far=bt,Y.updateProjectionMatrix()),Fr.setFromMatrixPosition(V.matrixWorld),Y.position.copy(Fr),Ic.copy(Y.position),Ic.add(m_[Tt]),Y.up.copy(g_[Tt]),Y.lookAt(Ic),Y.updateMatrixWorld(),_t.makeTranslation(-Fr.x,-Fr.y,-Fr.z),cd.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),H._frustum.setFromProjectionMatrix(cd,Y.coordinateSystem,Y.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,Tt),i.clear();else{Tt===0&&(i.setRenderTarget(H.map),i.clear());let Y=H.getViewport(Tt);a.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),R.viewport(a)}n=H.getFrustum(Tt),y(x,M,Ut,V,tt,this.type)}H.isPointLightShadow!==!0&&this.type===bs&&_(H,M),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(C,I,w)};function _(T,x){let M=t.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null?T.mapPass=new hn(s.x,s.y,{format:_i,type:Ln}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(x,null,M,u,v,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(x,null,M,d,v,null)}function S(T,x,M,C){let I=null,w=M.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(w!==void 0)I=w;else if(I=M.isPointLight===!0?l:o,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let R=I.uuid,O=x.uuid,L=c[R];L===void 0&&(L={},c[R]=L);let B=L[O];B===void 0&&(B=I.clone(),L[O]=B,x.addEventListener("dispose",A)),I=B}if(I.visible=x.visible,I.wireframe=x.wireframe,C===bs?I.side=x.shadowSide!==null?x.shadowSide:x.side:I.side=x.shadowSide!==null?x.shadowSide:f[x.side],I.alphaMap=x.alphaMap,I.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,I.map=x.map,I.clipShadows=x.clipShadows,I.clippingPlanes=x.clippingPlanes,I.clipIntersection=x.clipIntersection,I.displacementMap=x.displacementMap,I.displacementScale=x.displacementScale,I.displacementBias=x.displacementBias,I.wireframeLinewidth=x.wireframeLinewidth,I.linewidth=x.linewidth,M.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let R=i.properties.get(I);R.light=M}return I}function y(T,x,M,C,I,w){if(T.visible===!1)return;if(T.layers.test(I)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===bs)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,T.matrixWorld);let L=t.update(T),B=T.material;if(Array.isArray(B)){let V=L.groups;for(let H=0,et=V.length;H<et;H++){let X=V[H],Q=B[X.materialIndex];if(Q&&Q.visible){let tt=S(T,Q,C,w);T.onBeforeShadow(i,T,x,M,L,tt,X),i.renderBufferDirect(M,null,L,tt,T,X),T.onAfterShadow(i,T,x,M,L,tt,X)}}}else if(B.visible){let V=S(T,B,C,w);T.onBeforeShadow(i,T,x,M,L,V,null),i.renderBufferDirect(M,null,L,V,T,null),T.onAfterShadow(i,T,x,M,L,V,null)}}let O=T.children;for(let L=0,B=O.length;L<B;L++)y(O[L],x,M,C,I,w)}function A(T){T.target.removeEventListener("dispose",A);for(let M in c){let C=c[M],I=T.target.uuid;I in C&&(C[I].dispose(),delete C[I])}}}function __(i,t){function e(){let D=!1,$=new Se,q=null,dt=new Se(0,0,0,0);return{setMask:function(at){q!==at&&!D&&(i.colorMask(at,at,at,at),q=at)},setLocked:function(at){D=at},setClear:function(at,ct,Nt,Jt,st){st===!0&&(at*=Jt,ct*=Jt,Nt*=Jt),$.set(at,ct,Nt,Jt),dt.equals($)===!1&&(i.clearColor(at,ct,Nt,Jt),dt.copy($))},reset:function(){D=!1,q=null,dt.set(-1,0,0,0)}}}function n(){let D=!1,$=!1,q=null,dt=null,at=null;return{setReversed:function(ct){if($!==ct){let Nt=t.get("EXT_clip_control");ct?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT),$=ct;let Jt=at;at=null,this.setClear(Jt)}},getReversed:function(){return $},setTest:function(ct){ct?xt(i.DEPTH_TEST):It(i.DEPTH_TEST)},setMask:function(ct){q!==ct&&!D&&(i.depthMask(ct),q=ct)},setFunc:function(ct){if($&&(ct=Lu[ct]),dt!==ct){switch(ct){case Ra:i.depthFunc(i.NEVER);break;case Ca:i.depthFunc(i.ALWAYS);break;case Ia:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case Pa:i.depthFunc(i.EQUAL);break;case La:i.depthFunc(i.GEQUAL);break;case Da:i.depthFunc(i.GREATER);break;case Na:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=ct}},setLocked:function(ct){D=ct},setClear:function(ct){at!==ct&&(at=ct,$&&(ct=1-ct),i.clearDepth(ct))},reset:function(){D=!1,q=null,dt=null,at=null,$=!1}}}function s(){let D=!1,$=null,q=null,dt=null,at=null,ct=null,Nt=null,Jt=null,st=null;return{setTest:function(Ft){D||(Ft?xt(i.STENCIL_TEST):It(i.STENCIL_TEST))},setMask:function(Ft){$!==Ft&&!D&&(i.stencilMask(Ft),$=Ft)},setFunc:function(Ft,Zt,yt){(q!==Ft||dt!==Zt||at!==yt)&&(i.stencilFunc(Ft,Zt,yt),q=Ft,dt=Zt,at=yt)},setOp:function(Ft,Zt,yt){(ct!==Ft||Nt!==Zt||Jt!==yt)&&(i.stencilOp(Ft,Zt,yt),ct=Ft,Nt=Zt,Jt=yt)},setLocked:function(Ft){D=Ft},setClear:function(Ft){st!==Ft&&(i.clearStencil(Ft),st=Ft)},reset:function(){D=!1,$=null,q=null,dt=null,at=null,ct=null,Nt=null,Jt=null,st=null}}}let r=new e,a=new n,o=new s,l={},c=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],v=null,g=!1,m=null,_=null,S=null,y=null,A=null,T=null,x=null,M=new kt(0,0,0),C=0,I=!1,w=null,R=null,O=null,L=null,B=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,et=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(X)[1]),H=et>=1):X.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),H=et>=2);let Q=null,tt={},Tt=i.getParameter(i.SCISSOR_BOX),Ut=i.getParameter(i.VIEWPORT),Y=new Se().fromArray(Tt),_t=new Se().fromArray(Ut);function bt(D,$,q,dt){let at=new Uint8Array(4),ct=i.createTexture();i.bindTexture(D,ct),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Nt=0;Nt<q;Nt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D($,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D($+Nt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return ct}let Dt={};Dt[i.TEXTURE_2D]=bt(i.TEXTURE_2D,i.TEXTURE_2D,1),Dt[i.TEXTURE_CUBE_MAP]=bt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Dt[i.TEXTURE_2D_ARRAY]=bt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Dt[i.TEXTURE_3D]=bt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),xt(i.DEPTH_TEST),a.setFunc(ls),Et(!1),vt(Xl),xt(i.CULL_FACE),ht(Fi);function xt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function It(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function pe(D,$){return u[D]!==$?(i.bindFramebuffer(D,$),u[D]=$,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=$),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=$),!0):!1}function nt(D,$){let q=p,dt=!1;if(D){q=d.get($),q===void 0&&(q=[],d.set($,q));let at=D.textures;if(q.length!==at.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Nt=at.length;ct<Nt;ct++)q[ct]=i.COLOR_ATTACHMENT0+ct;q.length=at.length,dt=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,dt=!0);dt&&i.drawBuffers(q)}function At(D){return v!==D?(i.useProgram(D),v=D,!0):!1}let jt={[Oi]:i.FUNC_ADD,[tu]:i.FUNC_SUBTRACT,[eu]:i.FUNC_REVERSE_SUBTRACT};jt[nu]=i.MIN,jt[iu]=i.MAX;let j={[su]:i.ZERO,[ru]:i.ONE,[au]:i.SRC_COLOR,[Jl]:i.SRC_ALPHA,[du]:i.SRC_ALPHA_SATURATE,[hu]:i.DST_COLOR,[lu]:i.DST_ALPHA,[ou]:i.ONE_MINUS_SRC_COLOR,[$l]:i.ONE_MINUS_SRC_ALPHA,[uu]:i.ONE_MINUS_DST_COLOR,[cu]:i.ONE_MINUS_DST_ALPHA,[fu]:i.CONSTANT_COLOR,[pu]:i.ONE_MINUS_CONSTANT_COLOR,[mu]:i.CONSTANT_ALPHA,[gu]:i.ONE_MINUS_CONSTANT_ALPHA};function ht(D,$,q,dt,at,ct,Nt,Jt,st,Ft){if(D===Fi){g===!0&&(It(i.BLEND),g=!1);return}if(g===!1&&(xt(i.BLEND),g=!0),D!==jh){if(D!==m||Ft!==I){if((_!==Oi||A!==Oi)&&(i.blendEquation(i.FUNC_ADD),_=Oi,A=Oi),Ft)switch(D){case Es:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ql:i.blendFunc(i.ONE,i.ONE);break;case Yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:zt("WebGLState: Invalid blending: ",D);break}else switch(D){case Es:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ql:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Yl:zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zl:zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:zt("WebGLState: Invalid blending: ",D);break}S=null,y=null,T=null,x=null,M.set(0,0,0),C=0,m=D,I=Ft}return}at=at||$,ct=ct||q,Nt=Nt||dt,($!==_||at!==A)&&(i.blendEquationSeparate(jt[$],jt[at]),_=$,A=at),(q!==S||dt!==y||ct!==T||Nt!==x)&&(i.blendFuncSeparate(j[q],j[dt],j[ct],j[Nt]),S=q,y=dt,T=ct,x=Nt),(Jt.equals(M)===!1||st!==C)&&(i.blendColor(Jt.r,Jt.g,Jt.b,st),M.copy(Jt),C=st),m=D,I=!1}function ot(D,$){D.side===vn?It(i.CULL_FACE):xt(i.CULL_FACE);let q=D.side===en;$&&(q=!q),Et(q),D.blending===Es&&D.transparent===!1?ht(Fi):ht(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let dt=D.stencilWrite;o.setTest(dt),dt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Lt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?xt(i.SAMPLE_ALPHA_TO_COVERAGE):It(i.SAMPLE_ALPHA_TO_COVERAGE)}function Et(D){w!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),w=D)}function vt(D){D!==$h?(xt(i.CULL_FACE),D!==R&&(D===Xl?i.cullFace(i.BACK):D===Kh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):It(i.CULL_FACE),R=D}function Yt(D){D!==O&&(H&&i.lineWidth(D),O=D)}function Lt(D,$,q){D?(xt(i.POLYGON_OFFSET_FILL),(L!==$||B!==q)&&(L=$,B=q,a.getReversed()&&($=-$,q=-q),i.polygonOffset($,q))):It(i.POLYGON_OFFSET_FILL)}function te(D){D?xt(i.SCISSOR_TEST):It(i.SCISSOR_TEST)}function ee(D){D===void 0&&(D=i.TEXTURE0+V-1),Q!==D&&(i.activeTexture(D),Q=D)}function ce(D,$,q){q===void 0&&(Q===null?q=i.TEXTURE0+V-1:q=Q);let dt=tt[q];dt===void 0&&(dt={type:void 0,texture:void 0},tt[q]=dt),(dt.type!==D||dt.texture!==$)&&(Q!==q&&(i.activeTexture(q),Q=q),i.bindTexture(D,$||Dt[D]),dt.type=D,dt.texture=$)}function F(){let D=tt[Q];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Re(){try{i.compressedTexImage2D(...arguments)}catch(D){zt("WebGLState:",D)}}function Qt(){try{i.compressedTexImage3D(...arguments)}catch(D){zt("WebGLState:",D)}}function ge(){try{i.texSubImage2D(...arguments)}catch(D){zt("WebGLState:",D)}}function pt(){try{i.texSubImage3D(...arguments)}catch(D){zt("WebGLState:",D)}}function we(){try{i.compressedTexSubImage2D(...arguments)}catch(D){zt("WebGLState:",D)}}function Ot(){try{i.compressedTexSubImage3D(...arguments)}catch(D){zt("WebGLState:",D)}}function Ht(){try{i.texStorage2D(...arguments)}catch(D){zt("WebGLState:",D)}}function P(){try{i.texStorage3D(...arguments)}catch(D){zt("WebGLState:",D)}}function b(){try{i.texImage2D(...arguments)}catch(D){zt("WebGLState:",D)}}function k(){try{i.texImage3D(...arguments)}catch(D){zt("WebGLState:",D)}}function it(D){return f[D]!==void 0?f[D]:i.getParameter(D)}function K(D,$){f[D]!==$&&(i.pixelStorei(D,$),f[D]=$)}function lt(D){Y.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Y.copy(D))}function mt(D){_t.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),_t.copy(D))}function Z(D,$){let q=c.get($);q===void 0&&(q=new WeakMap,c.set($,q));let dt=q.get(D);dt===void 0&&(dt=i.getUniformBlockIndex($,D.name),i.uniformBlockBinding($,dt,dt),q.set(D,dt))}function J(D,$,q){let at=c.get($).get(D);l[at]!==q&&(i.bindBufferBase(i.UNIFORM_BUFFER,at,q),l[at]=q)}function ut(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},Q=null,tt={},u={},l={},d=new WeakMap,p=[],v=null,g=!1,m=null,_=null,S=null,y=null,A=null,T=null,x=null,M=new kt(0,0,0),C=0,I=!1,w=null,R=null,O=null,L=null,B=null,Y.set(0,0,i.canvas.width,i.canvas.height),_t.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:xt,disable:It,bindFramebuffer:pe,drawBuffers:nt,useProgram:At,setBlending:ht,setMaterial:ot,setFlipSided:Et,setCullFace:vt,setLineWidth:Yt,setPolygonOffset:Lt,setScissorTest:te,activeTexture:ee,bindTexture:ce,unbindTexture:F,compressedTexImage2D:Re,compressedTexImage3D:Qt,texImage2D:b,texImage3D:k,pixelStorei:K,getParameter:it,updateUBOMapping:Z,uniformBlockBinding:J,texStorage2D:Ht,texStorage3D:P,texSubImage2D:ge,texSubImage3D:pt,compressedTexSubImage2D:we,compressedTexSubImage3D:Ot,scissor:lt,viewport:mt,reset:ut}}function v_(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap,f=new Set,u,d=new WeakMap,p=new Set,v=new FinalizationRegistry(P=>p.delete(P)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,b){return g?new OffscreenCanvas(P,b):us("canvas")}function _(P,b,k){let it=1,K=Ht(P);if((K.width>k||K.height>k)&&(it=k/Math.max(K.width,K.height)),it<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let lt=Math.floor(it*K.width),mt=Math.floor(it*K.height);u===void 0&&(u=m(lt,mt));let Z=b?m(lt,mt):u;return Z.width=lt,Z.height=mt,Z.getContext("2d").drawImage(P,0,0,lt,mt),Bt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+lt+"x"+mt+")."),Z}else return"data"in P&&Bt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),P;return P}function S(P){return P.generateMipmaps}function y(P){i.generateMipmap(P)}function A(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(P,b,k,it,K,lt=!1){if(P!==null){if(i[P]!==void 0)return i[P];Bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let mt;it&&(mt=t.get("EXT_texture_norm16"),mt||Bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=b;if(b===i.RED&&(k===i.FLOAT&&(Z=i.R32F),k===i.HALF_FLOAT&&(Z=i.R16F),k===i.UNSIGNED_BYTE&&(Z=i.R8),k===i.UNSIGNED_SHORT&&mt&&(Z=mt.R16_EXT),k===i.SHORT&&mt&&(Z=mt.R16_SNORM_EXT)),b===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.R8UI),k===i.UNSIGNED_SHORT&&(Z=i.R16UI),k===i.UNSIGNED_INT&&(Z=i.R32UI),k===i.BYTE&&(Z=i.R8I),k===i.SHORT&&(Z=i.R16I),k===i.INT&&(Z=i.R32I)),b===i.RG&&(k===i.FLOAT&&(Z=i.RG32F),k===i.HALF_FLOAT&&(Z=i.RG16F),k===i.UNSIGNED_BYTE&&(Z=i.RG8),k===i.UNSIGNED_SHORT&&mt&&(Z=mt.RG16_EXT),k===i.SHORT&&mt&&(Z=mt.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RG8UI),k===i.UNSIGNED_SHORT&&(Z=i.RG16UI),k===i.UNSIGNED_INT&&(Z=i.RG32UI),k===i.BYTE&&(Z=i.RG8I),k===i.SHORT&&(Z=i.RG16I),k===i.INT&&(Z=i.RG32I)),b===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),k===i.UNSIGNED_INT&&(Z=i.RGB32UI),k===i.BYTE&&(Z=i.RGB8I),k===i.SHORT&&(Z=i.RGB16I),k===i.INT&&(Z=i.RGB32I)),b===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),k===i.UNSIGNED_INT&&(Z=i.RGBA32UI),k===i.BYTE&&(Z=i.RGBA8I),k===i.SHORT&&(Z=i.RGBA16I),k===i.INT&&(Z=i.RGBA32I)),b===i.RGB&&(k===i.UNSIGNED_SHORT&&mt&&(Z=mt.RGB16_EXT),k===i.SHORT&&mt&&(Z=mt.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),b===i.RGBA){let J=lt?Zs:se.getTransfer(K);k===i.FLOAT&&(Z=i.RGBA32F),k===i.HALF_FLOAT&&(Z=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Z=J===de?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&mt&&(Z=mt.RGBA16_EXT),k===i.SHORT&&mt&&(Z=mt.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(P,b){let k;return P?b===null||b===Pn||b===zi?k=i.DEPTH24_STENCIL8:b===yn?k=i.DEPTH32F_STENCIL8:b===ws&&(k=i.DEPTH24_STENCIL8,Bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Pn||b===zi?k=i.DEPTH_COMPONENT24:b===yn?k=i.DEPTH_COMPONENT32F:b===ws&&(k=i.DEPTH_COMPONENT16),k}function M(P,b){return S(P)===!0||P.isFramebufferTexture&&P.minFilter!==ze&&P.minFilter!==Ge?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function C(P){let b=new WeakRef(P);n.get(P).__ref=b,p.add(b),v.register(P,b,b)}function I(P){let b=n.get(P).__ref;b!==void 0&&(p.delete(b),v.unregister(b))}function w(P){O(P.target)}function R(P){L(P.target)}function O(P){P.removeEventListener("dispose",w),I(P),V(P),P.isVideoTexture&&h.delete(P),P.isHTMLTexture&&f.delete(P)}function L(P){P.removeEventListener("dispose",R),I(P),et(P)}function B(){for(let P of p){let b=P.deref();b!==void 0&&(b.isRenderTarget===!0?L(b):O(b))}p.clear(),f.clear()}function V(P){let b=n.get(P);if(b.__webglInit===void 0)return;let k=P.source,it=d.get(k);if(it){let K=it[b.__cacheKey];K.usedTimes--,K.usedTimes===0&&H(P),Object.keys(it).length===0&&d.delete(k)}n.remove(P)}function H(P){let b=n.get(P);i.deleteTexture(b.__webglTexture);let k=P.source,it=d.get(k);delete it[b.__cacheKey],a.memory.textures--}function et(P){let b=n.get(P);b.__depthDisposeCallback&&b.__depthDisposeCallback();let k=P.depthTexture;if(k&&k.renderTarget===P&&O(k),P.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let lt=0;lt<b.__webglFramebuffer[K].length;lt++)i.deleteFramebuffer(b.__webglFramebuffer[K][lt]);else i.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)i.deleteFramebuffer(b.__webglFramebuffer[K]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let it=P.textures;for(let K=0,lt=it.length;K<lt;K++){let mt=n.get(it[K]);mt.__webglTexture&&(i.deleteTexture(mt.__webglTexture),a.memory.textures--),n.remove(it[K])}n.remove(P)}let X=0;function Q(){X=0}function tt(){return X}function Tt(P){X=P}function Ut(){let P=X;return P>=s.maxTextures&&Bt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,P}function Y(P){let b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.mipmapsAutoUpdate),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function _t(P,b){let k=n.get(P);if(P.isVideoTexture&&we(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&k.__version!==P.version){let it=P.image;if(it===null)Bt("WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)Bt("WebGLRenderer: Texture marked for update but image is incomplete");else{ot(k,P,b);return}}else P.isExternalTexture&&(k.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+b)}function bt(P,b){let k=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&k.__version!==P.version){ot(k,P,b);return}else P.isExternalTexture&&(k.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+b)}function Dt(P,b){let k=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&k.__version!==P.version){ot(k,P,b);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+b)}function xt(P,b){let k=n.get(P);if(P.version>0&&k.__version!==P.version){Et(k,P,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+b)}let It={[cs]:i.REPEAT,[Un]:i.CLAMP_TO_EDGE,[Ua]:i.MIRRORED_REPEAT},pe={[ze]:i.NEAREST,[vu]:i.NEAREST_MIPMAP_NEAREST,[Rr]:i.NEAREST_MIPMAP_LINEAR,[Ge]:i.LINEAR,[fo]:i.LINEAR_MIPMAP_NEAREST,[In]:i.LINEAR_MIPMAP_LINEAR},nt={[bu]:i.NEVER,[fc]:i.ALWAYS,[Eu]:i.LESS,[uc]:i.LEQUAL,[Tu]:i.EQUAL,[dc]:i.GEQUAL,[wu]:i.GREATER,[Au]:i.NOTEQUAL};function At(P,b){if(b.type===yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Ge||b.magFilter===fo||b.magFilter===Rr||b.magFilter===In||b.minFilter===Ge||b.minFilter===fo||b.minFilter===Rr||b.minFilter===In)&&Bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,It[b.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,It[b.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,It[b.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,pe[b.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,pe[b.minFilter]),b.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,nt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ze||b.minFilter!==Rr&&b.minFilter!==In||b.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function jt(P,b){let k=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",w),C(b));let it=b.source,K=d.get(it);K===void 0&&(K={},d.set(it,K));let lt=Y(b);if(lt!==P.__cacheKey){K[lt]===void 0&&(K[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),K[lt].usedTimes++;let mt=K[P.__cacheKey];mt!==void 0&&(K[P.__cacheKey].usedTimes--,mt.usedTimes===0&&H(b)),P.__cacheKey=lt,P.__webglTexture=K[lt].texture}return k}function j(P,b,k){return Math.floor(Math.floor(P/k)/b)}function ht(P,b,k,it){let lt=P.updateRanges;if(lt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,k,it,b.data);else{lt.sort((D,$)=>D.start-$.start);let mt=0;for(let D=1;D<lt.length;D++){let $=lt[mt],q=lt[D],dt=$.start+$.count,at=j(q.start,b.width,4),ct=j($.start,b.width,4);q.start<=dt+1&&at===ct&&j(q.start+q.count-1,b.width,4)===at?$.count=Math.max($.count,q.start+q.count-$.start):(++mt,lt[mt]=q)}lt.length=mt+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),ut=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let D=0,$=lt.length;D<$;D++){let q=lt[D],dt=Math.floor(q.start/4),at=Math.ceil(q.count/4),ct=dt%b.width,Nt=Math.floor(dt/b.width),Jt=at,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ct),e.pixelStorei(i.UNPACK_SKIP_ROWS,Nt),e.texSubImage2D(i.TEXTURE_2D,0,ct,Nt,Jt,st,k,it,b.data)}P.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,ut)}}function ot(P,b,k){let it=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(it=i.TEXTURE_3D);let K=jt(P,b),lt=b.source;e.bindTexture(it,P.__webglTexture,i.TEXTURE0+k);let mt=n.get(lt);if(lt.version!==mt.__version||K===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let st=se.getPrimaries(se.workingColorSpace),Ft=b.colorSpace===ti?null:se.getPrimaries(b.colorSpace),Zt=b.colorSpace===ti||st===Ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt)}e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let J=_(b.image,!1,s.maxTextureSize);J=Ot(b,J);let ut=r.convert(b.format,b.colorSpace),D=r.convert(b.type),$=T(b.internalFormat,ut,D,b.normalized,b.colorSpace,b.isVideoTexture);At(it,b);let q,dt=b.mipmaps,at=b.isVideoTexture!==!0,ct=mt.__version===void 0||K===!0,Nt=lt.dataReady,Jt=M(b,J);if(b.isDepthTexture)$=x(b.format===jn,b.type),ct&&(at?e.texStorage2D(i.TEXTURE_2D,1,$,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,$,J.width,J.height,0,ut,D,null));else if(b.isDataTexture)if(dt.length>0){at&&ct&&e.texStorage2D(i.TEXTURE_2D,Jt,$,dt[0].width,dt[0].height);for(let st=0,Ft=dt.length;st<Ft;st++)q=dt[st],at?Nt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,ut,D,q.data):e.texImage2D(i.TEXTURE_2D,st,$,q.width,q.height,0,ut,D,q.data);b.generateMipmaps=!1}else at?(ct&&e.texStorage2D(i.TEXTURE_2D,Jt,$,J.width,J.height),Nt&&ht(b,J,ut,D)):e.texImage2D(i.TEXTURE_2D,0,$,J.width,J.height,0,ut,D,J.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){at&&ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Jt,$,dt[0].width,dt[0].height,J.depth);for(let st=0,Ft=dt.length;st<Ft;st++)if(q=dt[st],b.format!==Dn)if(ut!==null)if(at){if(Nt)if(b.layerUpdates.size>0){let Zt=bc(q.width,q.height,b.format,b.type);for(let yt of b.layerUpdates){let fe=q.data.subarray(yt*Zt/q.data.BYTES_PER_ELEMENT,(yt+1)*Zt/q.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,yt,q.width,q.height,1,ut,fe)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,q.width,q.height,J.depth,ut,q.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,$,q.width,q.height,J.depth,0,q.data,0,0);else Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?Nt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,q.width,q.height,J.depth,ut,D,q.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,$,q.width,q.height,J.depth,0,ut,D,q.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{at&&ct&&e.texStorage2D(i.TEXTURE_2D,Jt,$,dt[0].width,dt[0].height);for(let st=0,Ft=dt.length;st<Ft;st++)q=dt[st],b.format!==Dn?ut!==null?at?Nt&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,ut,q.data):e.compressedTexImage2D(i.TEXTURE_2D,st,$,q.width,q.height,0,q.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?Nt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,ut,D,q.data):e.texImage2D(i.TEXTURE_2D,st,$,q.width,q.height,0,ut,D,q.data)}else if(b.isDataArrayTexture)if(at){if(ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Jt,$,J.width,J.height,J.depth),Nt)if(b.layerUpdates.size>0){let st=bc(J.width,J.height,b.format,b.type);for(let Ft of b.layerUpdates){let Zt=J.data.subarray(Ft*st/J.data.BYTES_PER_ELEMENT,(Ft+1)*st/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ft,J.width,J.height,1,ut,D,Zt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ut,D,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,$,J.width,J.height,J.depth,0,ut,D,J.data);else if(b.isData3DTexture)at?(ct&&e.texStorage3D(i.TEXTURE_3D,Jt,$,J.width,J.height,J.depth),Nt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ut,D,J.data)):e.texImage3D(i.TEXTURE_3D,0,$,J.width,J.height,J.depth,0,ut,D,J.data);else if(b.isFramebufferTexture){if(ct)if(at)e.texStorage2D(i.TEXTURE_2D,Jt,$,J.width,J.height);else{let st=J.width,Ft=J.height;for(let Zt=0;Zt<Jt;Zt++)e.texImage2D(i.TEXTURE_2D,Zt,$,st,Ft,0,ut,D,null),st>>=1,Ft>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){let st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),J.parentNode!==st){st.appendChild(J),f.add(b),st.onpaint=Ft=>{let Zt=Ft.changedElements;for(let yt of f)Zt.includes(yt.image)&&(yt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{let Zt=i.RGBA,yt=i.RGBA,fe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Zt,yt,fe,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(dt.length>0){if(at&&ct){let st=Ht(dt[0]);e.texStorage2D(i.TEXTURE_2D,Jt,$,st.width,st.height)}for(let st=0,Ft=dt.length;st<Ft;st++)q=dt[st],at?Nt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,ut,D,q):e.texImage2D(i.TEXTURE_2D,st,$,ut,D,q);b.generateMipmaps=!1}else if(at){if(ct){let st=Ht(J);e.texStorage2D(i.TEXTURE_2D,Jt,$,st.width,st.height)}Nt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,D,J)}else e.texImage2D(i.TEXTURE_2D,0,$,ut,D,J);S(b)&&b.mipmapsAutoUpdate===!0&&y(it),mt.__version=lt.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function Et(P,b,k){if(b.image.length!==6)return;let it=jt(P,b),K=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+k);let lt=n.get(K);if(K.version!==lt.__version||it===!0){e.activeTexture(i.TEXTURE0+k);let mt=se.getPrimaries(se.workingColorSpace),Z=b.colorSpace===ti?null:se.getPrimaries(b.colorSpace),J=b.colorSpace===ti||mt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let ut=b.isCompressedTexture||b.image[0].isCompressedTexture,D=b.image[0]&&b.image[0].isDataTexture,$=[];for(let yt=0;yt<6;yt++)!ut&&!D?$[yt]=_(b.image[yt],!0,s.maxCubemapSize):$[yt]=D?b.image[yt].image:b.image[yt],$[yt]=Ot(b,$[yt]);let q=$[0],dt=r.convert(b.format,b.colorSpace),at=r.convert(b.type),ct=T(b.internalFormat,dt,at,b.normalized,b.colorSpace),Nt=b.isVideoTexture!==!0,Jt=lt.__version===void 0||it===!0,st=K.dataReady,Ft=M(b,q);At(i.TEXTURE_CUBE_MAP,b);let Zt;if(b.isDepthTexture){if(ct=x(b.format===jn,b.type),Jt)if(Nt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ct,q.width,q.height);else for(let yt=0;yt<6;yt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ct,q.width,q.height,0,dt,at,null)}else if(ut){Nt&&Jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ct,q.width,q.height);for(let yt=0;yt<6;yt++){Zt=$[yt].mipmaps;for(let fe=0;fe<Zt.length;fe++){let Fe=Zt[fe];b.format!==Dn?dt!==null?Nt?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe,0,0,Fe.width,Fe.height,dt,Fe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe,ct,Fe.width,Fe.height,0,Fe.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe,0,0,Fe.width,Fe.height,dt,at,Fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe,ct,Fe.width,Fe.height,0,dt,at,Fe.data)}}}else{if(Zt=b.mipmaps,Nt&&Jt){Zt.length>0&&Ft++;let yt=Ht($[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ct,yt.width,yt.height)}for(let yt=0;yt<6;yt++)if(D){Nt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,$[yt].width,$[yt].height,dt,at,$[yt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ct,$[yt].width,$[yt].height,0,dt,at,$[yt].data);for(let fe=0;fe<Zt.length;fe++){let ii=Zt[fe].image[yt].image;Nt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe+1,0,0,ii.width,ii.height,dt,at,ii.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe+1,ct,ii.width,ii.height,0,dt,at,ii.data)}}else{Nt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,dt,at,$[yt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ct,dt,at,$[yt]);for(let fe=0;fe<Zt.length;fe++){let Fe=Zt[fe];Nt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe+1,0,0,dt,at,Fe.image[yt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,fe+1,ct,dt,at,Fe.image[yt])}}}S(b)&&b.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),lt.__version=K.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function vt(P,b,k,it,K,lt){let mt=r.convert(k.format,k.colorSpace),Z=r.convert(k.type),J=T(k.internalFormat,mt,Z,k.normalized,k.colorSpace),ut=n.get(b),D=n.get(k);if(D.__renderTarget=b,!ut.__hasExternalTextures){let $=Math.max(1,b.width>>lt),q=Math.max(1,b.height>>lt);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,lt,J,$,q,b.depth,0,mt,Z,null):e.texImage2D(K,lt,J,$,q,0,mt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),pt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,K,D.__webglTexture,0,ge(b)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,K,D.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Yt(P,b,k){if(i.bindRenderbuffer(i.RENDERBUFFER,P),b.depthBuffer){let it=b.depthTexture,K=it&&it.isDepthTexture?it.type:null,lt=x(b.stencilBuffer,K),mt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(b),lt,b.width,b.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(b),lt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,lt,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,mt,i.RENDERBUFFER,P)}else{let it=b.textures;for(let K=0;K<it.length;K++){let lt=it[K],mt=r.convert(lt.format,lt.colorSpace),Z=r.convert(lt.type),J=T(lt.internalFormat,mt,Z,lt.normalized,lt.colorSpace);pt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(b),J,b.width,b.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(b),J,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,J,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Lt(P,b,k){let it=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(b.depthTexture);K.__renderTarget=b;let lt=it?b.depthTexture.image[0]:b.depthTexture.image;(!K.__webglTexture||lt.width!==b.width||lt.height!==b.height)&&(lt.width=b.width,lt.height=b.height,b.depthTexture.needsUpdate=!0),it?xt(b.depthTexture,0):_t(b.depthTexture,0);let mt=K.__webglTexture,Z=ge(b),J=it?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,ut=b.depthTexture.format===jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===$n)pt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ut,J,mt,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,ut,J,mt,0);else if(b.depthTexture.format===jn)pt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ut,J,mt,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,ut,J,mt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function te(P){let b=n.get(P),k=P.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==P.depthTexture){let it=P.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),it){let K=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,it.removeEventListener("dispose",K)};it.addEventListener("dispose",K),b.__depthDisposeCallback=K}b.__boundDepthTexture=it}if(P.depthTexture&&!b.__autoAllocateDepthBuffer)if(k)for(let it=0;it<6;it++)Lt(b.__webglFramebuffer[it],P,it);else P.texture.mipmaps.length>0?Lt(b.__webglFramebuffer[0],P,0):Lt(b.__webglFramebuffer,P,0);else if(k){b.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[it]),b.__webglDepthbuffer[it]===void 0)b.__webglDepthbuffer[it]=i.createRenderbuffer(),Yt(b.__webglDepthbuffer[it],P,!1);else{let K=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=b.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,lt)}}else if(P.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Yt(b.__webglDepthbuffer,P,!1);else{let K=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,lt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(P,b,k){let it=n.get(P);b!==void 0&&vt(it.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&te(P)}function ce(P){let b=P.texture,k=n.get(P),it=n.get(b);P.addEventListener("dispose",R),C(P);let K=P.textures,lt=P.isWebGLCubeRenderTarget===!0,mt=K.length>1;if(mt||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=b.version,a.memory.textures++),lt){k.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(b.mipmaps.length>0){k.__webglFramebuffer[Z]=[];for(let J=0;J<b.mipmaps.length;J++)k.__webglFramebuffer[Z][J]=i.createFramebuffer()}else k.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(b.mipmaps.length>0){k.__webglFramebuffer=[];for(let Z=0;Z<b.mipmaps.length;Z++)k.__webglFramebuffer[Z]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(mt)for(let Z=0,J=K.length;Z<J;Z++){let ut=n.get(K[Z]);ut.__webglTexture===void 0&&(ut.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&pt(P)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Z=0;Z<K.length;Z++){let J=K[Z];k.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[Z]);let ut=r.convert(J.format,J.colorSpace),D=r.convert(J.type),$=T(J.internalFormat,ut,D,J.normalized,J.colorSpace,P.isXRRenderTarget===!0),q=ge(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,q,$,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,k.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Yt(k.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),At(i.TEXTURE_CUBE_MAP,b);for(let Z=0;Z<6;Z++)if(b.mipmaps.length>0)for(let J=0;J<b.mipmaps.length;J++)vt(k.__webglFramebuffer[Z][J],P,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,J);else vt(k.__webglFramebuffer[Z],P,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);S(b)?y(i.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}else if(mt){for(let Z=0,J=K.length;Z<J;Z++){let ut=K[Z],D=n.get(ut),$=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&($=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,D.__webglTexture),At($,ut),vt(k.__webglFramebuffer,P,ut,i.COLOR_ATTACHMENT0+Z,$,0),S(ut)&&y($)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Z=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,it.__webglTexture),At(Z,b),b.mipmaps.length>0)for(let J=0;J<b.mipmaps.length;J++)vt(k.__webglFramebuffer[J],P,b,i.COLOR_ATTACHMENT0,Z,J);else vt(k.__webglFramebuffer,P,b,i.COLOR_ATTACHMENT0,Z,0);S(b)?y(Z):b.mipmaps.length>0&&i.texParameteri(Z,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}P.depthBuffer&&te(P)}function F(P){let b=P.textures;for(let k=0,it=b.length;k<it;k++){let K=b[k];if(S(K)&&K.mipmapsAutoUpdate===!0){let lt=A(P),mt=n.get(K).__webglTexture;e.bindTexture(lt,mt),y(lt),e.unbindTexture()}}}let Re=[];function Qt(P){if(P.samples>0){if(pt(P)===!1){let b=P.textures,k=P.width,it=P.height,K=i.COLOR_BUFFER_BIT,lt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=n.get(P),Z=b.length>1;if(Z)for(let ut=0;ut<b.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer),P.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let ut=0;ut<b.length;ut++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,mt.__webglColorRenderbuffer[ut]);let D=n.get(b[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,D,0)}i.blitFramebuffer(0,0,k,it,0,0,k,it,K,i.NEAREST),l===!0&&(Re.length=0,Re.push(i.COLOR_ATTACHMENT0+ut),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&Re.push(lt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Re))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ut=0;ut<b.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,mt.__webglColorRenderbuffer[ut]);let D=n.get(b[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,D,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let b=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ge(P){return Math.min(s.maxSamples,P.samples)}function pt(P){let b=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function we(P){let b=a.render.frame;h.get(P)!==b&&(h.set(P,b),P.update())}function Ot(P,b){let k=P.colorSpace,it=P.format,K=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||k!==Ys&&k!==ti&&(se.getTransfer(k)===de?(it!==Dn||K!==on)&&Bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):zt("WebGLTextures: Unsupported texture color space:",k)),b}function Ht(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=Ut,this.resetTextureUnits=Q,this.getTextureUnits=tt,this.setTextureUnits=Tt,this.setTexture2D=_t,this.setTexture2DArray=bt,this.setTexture3D=Dt,this.setTextureCube=xt,this.rebindTextures=ee,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=pt,this.dispose=B}function y_(i,t){function e(n,s=ti){let r,a=se.getTransfer(s);if(n===on)return i.UNSIGNED_BYTE;if(n===mo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===oc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===lc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rc)return i.BYTE;if(n===ac)return i.SHORT;if(n===ws)return i.UNSIGNED_SHORT;if(n===po)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Ln)return i.HALF_FLOAT;if(n===cc)return i.ALPHA;if(n===hc)return i.RGB;if(n===Dn)return i.RGBA;if(n===$n)return i.DEPTH_COMPONENT;if(n===jn)return i.DEPTH_STENCIL;if(n===xo)return i.RED;if(n===_o)return i.RED_INTEGER;if(n===_i)return i.RG;if(n===vo)return i.RG_INTEGER;if(n===yo)return i.RGBA_INTEGER;if(n===Cr||n===Ir||n===Pr||n===Lr)if(a===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===So||n===bo||n===Eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===So)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===To||n===wo||n===Ao||n===Ro||n===Co||n===Dr||n===Io)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===To||n===wo)return a===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ao)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ro)return r.COMPRESSED_R11_EAC;if(n===Co)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Dr)return r.COMPRESSED_RG11_EAC;if(n===Io)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Po||n===Lo||n===Do||n===No||n===Uo||n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Go||n===Ho||n===Vo||n===Wo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Po)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Do)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===No)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ko)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Go)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ho)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wo)return a===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xo||n===qo||n===Yo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xo)return a===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zo||n===Jo||n===Nr||n===$o)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Nr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$o)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var M_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Oc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ir(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new an({vertexShader:M_,fragmentShader:S_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ye(new Ye(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bc=class extends Fn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,p=null,v=typeof XRWebGLBinding<"u",g=new Oc,m={},_=e.getContextAttributes(),S=null,y=null,A=[],T=[],x=new rt,M=null,C=null,I=new Qe;I.viewport=new Se;let w=new Qe;w.viewport=new Se;let R=[I,w],O=new lo,L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let _t=A[Y];return _t===void 0&&(_t=new ms,A[Y]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(Y){let _t=A[Y];return _t===void 0&&(_t=new ms,A[Y]=_t),_t.getGripSpace()},this.getHand=function(Y){let _t=A[Y];return _t===void 0&&(_t=new ms,A[Y]=_t),_t.getHandSpace()};function V(Y){let _t=T.indexOf(Y.inputSource);if(_t===-1)return;let bt=A[_t];bt!==void 0&&(bt.update(Y.inputSource,Y.frame,c||a),bt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",et);for(let Y=0;Y<A.length;Y++){let _t=T[Y];_t!==null&&(T[Y]=null,A[Y].disconnect(_t))}L=null,B=null,g.reset();for(let Y in m)delete m[Y];if(t.setRenderTarget(S),d=null,u=null,f=null,s=null,y=null,Ut.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(x.width,x.height,!1),C!==null){let Y=C.camera;Y.fov=C.fov,Y.zoom=C.zoom,Y.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",H),s.addEventListener("inputsourceschange",et),_.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(x),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Dt=null,xt=null;_.depth&&(xt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=_.stencil?jn:$n,Dt=_.stencil?zi:Pn);let It={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(It),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new hn(u.textureWidth,u.textureHeight,{format:Dn,type:on,depthTexture:new Qn(u.textureWidth,u.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let bt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new hn(d.framebufferWidth,d.framebufferHeight,{format:Dn,type:on,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ut.setContext(s),Ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function et(Y){for(let _t=0;_t<Y.removed.length;_t++){let bt=Y.removed[_t],Dt=T.indexOf(bt);Dt>=0&&(T[Dt]=null,A[Dt].disconnect(bt))}for(let _t=0;_t<Y.added.length;_t++){let bt=Y.added[_t],Dt=T.indexOf(bt);if(Dt===-1){for(let It=0;It<A.length;It++)if(It>=T.length){T.push(bt),Dt=It;break}else if(T[It]===null){T[It]=bt,Dt=It;break}if(Dt===-1)break}let xt=A[Dt];xt&&xt.connect(bt)}}function X(Y,_t){_t===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(_t.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let _t=Y.near,bt=Y.far;g.texture!==null&&(g.depthNear>0&&(_t=g.depthNear),g.depthFar>0&&(bt=g.depthFar)),O.near=w.near=I.near=_t,O.far=w.far=I.far=bt,(L!==O.near||B!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),L=O.near,B=O.far),O.layers.mask=Y.layers.mask|6,I.layers.mask=O.layers.mask&-5,w.layers.mask=O.layers.mask&-3;let Dt=Y.parent,xt=O.cameras;X(O,Dt);for(let It=0;It<xt.length;It++)X(xt[It],Dt);O.projectionMatrix.copy(I.projectionMatrix),O.projectionMatrixInverse.copy(I.projectionMatrixInverse),C===null&&Y.isPerspectiveCamera&&(C={camera:Y,fov:Y.fov,zoom:Y.zoom}),Q(Y,O,Dt)};function Q(Y,_t,bt){bt===null?Y.matrix.copy(_t.matrixWorld):(Y.matrix.copy(bt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(_t.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(_t.projectionMatrix),Y.projectionMatrixInverse.copy(_t.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=fs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(Y){return m[Y]};let tt=null;function Tt(Y,_t){if(h=_t.getViewerPose(c||a),p=_t,h!==null){let bt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let Dt=!1;bt.length!==O.cameras.length&&(O.cameras.length=0,Dt=!0);for(let nt=0;nt<bt.length;nt++){let At=bt[nt],jt=null;if(d!==null)jt=d.getViewport(At);else{let ht=f.getViewSubImage(u,At);jt=ht.viewport,nt===0&&(t.setRenderTargetTextures(y,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(y))}let j=R[nt];j===void 0&&(j=new Qe,j.layers.enable(nt),j.viewport=new Se,R[nt]=j),j.matrix.fromArray(At.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(At.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(jt.x,jt.y,jt.width,jt.height),nt===0&&(O.matrix.copy(j.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Dt===!0&&O.cameras.push(j)}let xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=n.getBinding();let nt=f.getDepthInformation(bt[0]);nt&&nt.isValid&&nt.texture&&g.init(nt,s.renderState)}if(xt&&xt.includes("camera-access")&&v){t.state.unbindTexture(),f=n.getBinding();for(let nt=0;nt<bt.length;nt++){let At=bt[nt].camera;if(At){let jt=m[At];jt||(jt=new ir,m[At]=jt);let j=f.getCameraImage(At);jt.sourceTexture=j}}}}for(let bt=0;bt<A.length;bt++){let Dt=T[bt],xt=A[bt];Dt!==null&&xt!==void 0&&xt.update(Dt,_t,c||a)}tt&&tt(Y,_t),_t.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_t}),p=null}let Ut=new hd;Ut.setAnimationLoop(Tt),this.setAnimationLoop=function(Y){tt=Y},this.dispose=function(){}}},b_=new he,yd=new Vt;yd.set(-1,0,0,0,1,0,0,0,1);function E_(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,yc(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,_,S,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,_,S):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===en&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===en&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let _=t.get(m),S=_.envMap,y=_.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(yd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,S){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=S*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,_){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){let _=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function T_(i,t,e,n){let s={},r={};function a(_,S){let y=S.program;n.uniformBlockBinding(_,y,s[_.id])}function o(_,S){let y=s[_.id];y===void 0&&(p(_),y=l(_),s[_.id]=y,_.addEventListener("dispose",g));let A=S.program;n.updateUBOMapping(_,A);let T=t.render.frame;r[_.id]!==T&&(c(_),r[_.id]=T)}function l(_){let S=i.createBuffer(),y=_.__size,A=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,y,A),i.bindBuffer(i.UNIFORM_BUFFER,null),S}function c(_){let S=s[_.id],y=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let T=0,x=y.length;T<x;T++){let M=y[T];if(Array.isArray(M))for(let C=0,I=M.length;C<I;C++)h(M[C],T,C,A);else h(M,T,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,S,y,A){if(u(_,S,y,A)===!0){let T=_.__offset,x=_.value;if(Array.isArray(x)){let M=0;for(let C=0;C<x.length;C++){let I=x[C],w=v(I,!0);f(I,_.__data,M),M+=w.storage/Float32Array.BYTES_PER_ELEMENT}}else f(x,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,_.__data)}}function f(_,S,y){typeof _=="number"||typeof _=="boolean"?S[y]=_:_.isMatrix3?(S[y]=_.elements[0],S[y+1]=_.elements[1],S[y+2]=_.elements[2],S[y+3]=0,S[y+4]=_.elements[3],S[y+5]=_.elements[4],S[y+6]=_.elements[5],S[y+7]=0,S[y+8]=_.elements[6],S[y+9]=_.elements[7],S[y+10]=_.elements[8],S[y+11]=0):ArrayBuffer.isView(_)?S.set(_.subarray(0,S.length-y),y):_.toArray(S,y)}function u(_,S,y,A){let T=_.value,x=S+"_"+y;if(Array.isArray(T)){A[x]===void 0&&(A[x]=[]);let M=A[x],C=!1;for(let I=0;I<T.length;I++)d(T[I],M,I)===!0&&(C=!0);return C}return d(T,A,x)}function d(_,S,y){if(S[y]===void 0)return typeof _=="number"||typeof _=="boolean"?S[y]=_:ArrayBuffer.isView(_)?S[y]=_.slice():S[y]=_.clone(),!0;{let A=S[y];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return S[y]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(A.equals(_)===!1)return A.copy(_),!0}}return!1}function p(_){let S=_.uniforms,y=0,A=16;for(let x=0,M=S.length;x<M;x++){let C=Array.isArray(S[x])?S[x]:[S[x]];for(let I=0,w=C.length;I<w;I++){let R=C[I],O=Array.isArray(R.value)?R.value:[R.value],L=Array.isArray(S[x])||Array.isArray(R.value),B=y;for(let H=0,et=O.length;H<et;H++){let X=O[H],Q=v(X,L),tt=y%A,Tt=tt%Q.boundary,Ut=tt+Tt;y+=Tt,Ut!==0&&A-Ut<Q.storage&&(y+=A-Ut),H===0&&(B=y),y+=Q.storage}let V=R.type==="int"?Int32Array:R.type==="uint"?Uint32Array:Float32Array;R.__data=new V((y-B)/Float32Array.BYTES_PER_ELEMENT),R.__offset=B}}let T=y%A;return T>0&&(y+=A-T),_.__size=y,_.__cache={},this}function v(_,S){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=16,y.storage=48):_.isMatrix4?(y.boundary=16,y.storage=64):_.isTexture?Bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(y.boundary=16,y.storage=_.byteLength):Bt("WebGLRenderer: Unsupported uniform value type.",_),S===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function g(_){let S=_.target;S.removeEventListener("dispose",g),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function m(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:a,update:o,dispose:m}}var w_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),kn=null;function A_(){return kn===null&&(kn=new tr(w_,16,16,_i,Ln),kn.name="DFG_LUT",kn.minFilter=Ge,kn.magFilter=Ge,kn.wrapS=Un,kn.wrapT=Un,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}var tl=class{constructor(t={}){let{canvas:e=Cu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=on}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let v=d,g=new Set([yo,vo,_o]),m=new Set([on,Pn,ws,zi,mo,go]),_=new Uint32Array(4),S=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},A=null,T=null,x=[],M=[],C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,w=!1,R=null,O=null,L=null,B=null;this._outputColorSpace=Ee;let V=0,H=0,et=null,X=-1,Q=null,tt=new Se,Tt=new Se,Ut=null,Y=new kt(0),_t=0,bt=e.width,Dt=e.height,xt=1,It=null,pe=null,nt=new Se(0,0,bt,Dt),At=new Se(0,0,bt,Dt),jt=!1,j=new di,ht=new Ga,ot=!1,Et=!1,vt=new he,Yt=new N,Lt=new Se,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ee=!1;function ce(){return et===null?xt:1}let F=n;function Re(E,U){return e.getContext(E,U)}let Qt,ge,pt,we,Ot,Ht,P,b,k,it,K,lt,mt,Z,J,ut,D,$,q,dt,at,ct,Nt;try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Ft,!1),e.addEventListener("webglcontextrestored",Zt,!1),e.addEventListener("webglcontextcreationerror",yt,!1),F===null){let U="webgl2";if(F=Re(U,E),F===null)throw Re(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Jt()}catch(E){throw e.removeEventListener("webglcontextlost",Ft,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),zt("WebGLRenderer: "+E.message),E}function Jt(){Qt=new Bg(F),Qt.init(),at=new y_(F,Qt),ge=new Ag(F,Qt,t,at),pt=new __(F,Qt),ge.reversedDepthBuffer&&u&&pt.buffers.depth.setReversed(!0),O=F.createFramebuffer(),L=F.createFramebuffer(),B=F.createFramebuffer(),we=new Gg(F),Ot=new s_,Ht=new v_(F,Qt,pt,Ot,ge,at,we),P=new Og(I),b=new Vp(F),ct=new Tg(F,b),k=new zg(F,b,we,ct),it=new Vg(F,k,b,ct,we),$=new Hg(F,ge,Ht),J=new Rg(Ot),K=new i_(I,P,Qt,ge,ct,J),lt=new E_(I,Ot),mt=new a_,Z=new d_(Qt),D=new Eg(I,P,pt,it,p,l),ut=new x_(I,it,ge),Nt=new T_(F,we,ge,pt),q=new wg(F,Qt,we),dt=new kg(F,Qt,we),we.programs=K.programs,I.capabilities=ge,I.extensions=Qt,I.properties=Ot,I.renderLists=mt,I.shadowMap=ut,I.state=pt,I.info=we}v!==on&&(C=new Xg(v,e.width,e.height,o,s,r));let st=new Bc(I,F);this.xr=st,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let E=Qt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Qt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return xt},this.setPixelRatio=function(E){E!==void 0&&(xt=E,this.setSize(bt,Dt,!1))},this.getSize=function(E){return E.set(bt,Dt)},this.setSize=function(E,U,W=!0){if(st.isPresenting){Bt("WebGLRenderer: Can't change size while VR device is presenting.");return}bt=E,Dt=U,e.width=Math.floor(E*xt),e.height=Math.floor(U*xt),W===!0&&(e.style.width=E+"px",e.style.height=U+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(bt*xt,Dt*xt).floor()},this.setDrawingBufferSize=function(E,U,W){bt=E,Dt=U,xt=W,e.width=Math.floor(E*W),e.height=Math.floor(U*W),this.setViewport(0,0,E,U)},this.setEffects=function(E){if(v===on){zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let U=0;U<E.length;U++)if(E[U].isOutputPass===!0){Bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(tt)},this.getViewport=function(E){return E.copy(nt)},this.setViewport=function(E,U,W,z){E.isVector4?nt.set(E.x,E.y,E.z,E.w):nt.set(E,U,W,z),pt.viewport(tt.copy(nt).multiplyScalar(ce()).round())},this.getScissor=function(E){return E.copy(At)},this.setScissor=function(E,U,W,z){E.isVector4?At.set(E.x,E.y,E.z,E.w):At.set(E,U,W,z),pt.scissor(Tt.copy(At).multiplyScalar(ce()).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(E){pt.setScissorTest(jt=E)},this.setOpaqueSort=function(E){It=E},this.setTransparentSort=function(E){pe=E},this.getClearColor=function(E){return E.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,W=!0){let z=0;if(E){let G=!1;if(et!==null){let gt=et.texture.format;G=g.has(gt)}if(G){let gt=et.texture.type,wt=m.has(gt),ft=D.getClearColor(),St=D.getClearAlpha(),Pt=ft.r,Xt=ft.g,ne=ft.b;wt?(_[0]=Pt,_[1]=Xt,_[2]=ne,_[3]=St,F.clearBufferuiv(F.COLOR,0,_)):(S[0]=Pt,S[1]=Xt,S[2]=ne,S[3]=St,F.clearBufferiv(F.COLOR,0,S))}else z|=F.COLOR_BUFFER_BIT}U&&(z|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(z|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&F.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),R=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Ft,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),D.dispose(),mt.dispose(),Z.dispose(),Ht.dispose(),Ot.dispose(),P.dispose(),it.dispose(),k.dispose(),ct.dispose(),Nt.dispose(),K.dispose(),st.dispose(),st.removeEventListener("sessionstart",ih),st.removeEventListener("sessionend",sh),Ti.stop()};function Ft(E){E.preventDefault(),mc("WebGLRenderer: Context Lost."),w=!0}function Zt(){mc("WebGLRenderer: Context Restored."),w=!1;let E=we.autoReset,U=ut.enabled,W=ut.autoUpdate,z=ut.needsUpdate,G=ut.type;Jt(),we.autoReset=E,ut.enabled=U,ut.autoUpdate=W,ut.needsUpdate=z,ut.type=G}function yt(E){zt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function fe(E){let U=E.target;U.removeEventListener("dispose",fe),Fe(U)}function Fe(E){ii(E),Ot.remove(E)}function ii(E){let U=Ot.get(E).programs;U!==void 0&&(U.forEach(function(W){K.releaseProgram(W)}),E.isShaderMaterial&&K.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,W,z,G,gt){U===null&&(U=te);let wt=G.isMesh&&G.matrixWorld.determinantAffine()<0,ft=uf(E,U,W,z,G);pt.setMaterial(z,wt);let St=W.index,Pt=1;if(z.wireframe===!0){if(St=k.getWireframeAttribute(W),St===void 0)return;Pt=2}let Xt=W.drawRange,ne=W.attributes.position,Rt=Xt.start*Pt,ie=(Xt.start+Xt.count)*Pt;gt!==null&&(Rt=Math.max(Rt,gt.start*Pt),ie=Math.min(ie,(gt.start+gt.count)*Pt)),St!==null?(Rt=Math.max(Rt,0),ie=Math.min(ie,St.count)):ne!=null&&(Rt=Math.max(Rt,0),ie=Math.min(ie,ne.count));let Ce=ie-Rt;if(Ce<0||Ce===1/0)return;ct.setup(G,z,ft,W,St);let _e,xe=q;if(St!==null&&(_e=b.get(St),xe=dt,xe.setIndex(_e)),G.isMesh)z.wireframe===!0?(pt.setLineWidth(z.wireframeLinewidth*ce()),xe.setMode(F.LINES)):xe.setMode(F.TRIANGLES);else if(G.isLine){let He=z.linewidth;He===void 0&&(He=1),pt.setLineWidth(He*ce()),G.isLineSegments?xe.setMode(F.LINES):G.isLineLoop?xe.setMode(F.LINE_LOOP):xe.setMode(F.LINE_STRIP)}else G.isPoints?xe.setMode(F.POINTS):G.isSprite&&xe.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))xe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let He=G._multiDrawStarts,Ct=G._multiDrawCounts,Ke=G._multiDrawCount,ue=St?b.get(St).bytesPerElement:1,wi=Ot.get(z).currentProgram.getUniforms();for(let Ve=0;Ve<Ke;Ve++)wi.setValue(F,"_gl_DrawID",Ve),xe.render(He[Ve]/ue,Ct[Ve])}else if(G.isInstancedMesh)xe.renderInstances(Rt,Ce,G.count);else if(W.isInstancedBufferGeometry){let He=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ct=Math.min(W.instanceCount,He);xe.renderInstances(Rt,Ce,Ct)}else xe.render(Rt,Ce)};function nh(E,U,W,z){R!==null&&E.isNodeMaterial&&R.setObject(z,E),ot===!0&&J.setState(E,W,!1),E.transparent===!0&&E.side===vn&&E.forceSinglePass===!1?(E.side=en,E.needsUpdate=!0,Ds(E,U,z),E.side=xi,E.needsUpdate=!0,Ds(E,U,z),E.side=vn):Ds(E,U,z)}this.compile=function(E,U,W=null){W===null&&(W=E),R!==null&&R.renderStart(E,U,W),T=Z.get(W),T.init(U),M.push(T),W.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),E!==W&&E.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights(),R!==null&&R.updateLights(T.state.lightsArray),Et=this.localClippingEnabled,ot=J.init(this.clippingPlanes,Et),ot===!0&&J.setGlobalState(this.clippingPlanes,U),R!==null&&ut.render(T.state.shadowsArray,W,U);let z=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let gt=G.material;if(gt)if(Array.isArray(gt))for(let wt=0;wt<gt.length;wt++){let ft=gt[wt];nh(ft,W,U,G),z.add(ft)}else nh(gt,W,U,G),z.add(gt)}),T=M.pop(),R!==null&&R.renderEnd(),z},this.compileAsync=function(E,U,W=null){let z=this.compile(E,U,W);return new Promise(G=>{function gt(){if(z.forEach(function(wt){let St=Ot.get(wt).currentProgram;(St===void 0||St.isReady())&&z.delete(wt)}),z.size===0){G(E);return}setTimeout(gt,10)}Qt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let ol=null;function cf(E){ol&&ol(E)}function ih(){Ti.stop()}function sh(){Ti.start()}let Ti=new hd;Ti.setAnimationLoop(cf),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(E){ol=E,st.setAnimationLoop(E),E===null?Ti.stop():Ti.start()},st.addEventListener("sessionstart",ih),st.addEventListener("sessionend",sh),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;R!==null&&R.renderStart(E,U);let W=st.enabled===!0&&st.isPresenting===!0,z=C!==null&&(et===null||W)&&C.begin(I,et);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(U),U=st.getCamera()),E.isScene===!0&&E.onBeforeRender(I,E,U,et),T=Z.get(E,M.length),T.init(U),T.state.textureUnits=Ht.getTextureUnits(),M.push(T),vt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?ht.setFromArrayCamera(U):j.setFromProjectionMatrix(vt,mn,U.reversedDepth),Et=this.localClippingEnabled,ot=J.init(this.clippingPlanes,Et),A=mt.get(E,x.length),A.init(),x.push(A),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){let wt=I.xr.getDepthSensingMesh();wt!==null&&ll(wt,U,-1/0,I.sortObjects)}ll(E,U,0,I.sortObjects),A.finish(),R!==null&&R.updateLights(T.state.lightsArray),I.sortObjects===!0&&A.sort(It,pe),ee=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,ee&&D.addToRenderList(A,E),this.info.autoReset===!0&&this.info.reset(),ot===!0&&J.beginShadows();let G=T.state.shadowsArray;if(ut.render(G,E,U),ot===!0&&J.endShadows(),(z&&C.hasRenderPass())===!1){let wt=A.opaque,ft=A.transmissive;if(T.setupLights(),U.isArrayCamera){let St=U.cameras;if(ft.length>0)for(let Pt=0,Xt=St.length;Pt<Xt;Pt++){let ne=St[Pt];ah(wt,ft,E,ne)}ee&&D.render(E);for(let Pt=0,Xt=St.length;Pt<Xt;Pt++){let ne=St[Pt];rh(A,E,ne,ne.viewport)}}else ft.length>0&&ah(wt,ft,E,U),ee&&D.render(E),rh(A,E,U)}et!==null&&H===0&&(Ht.updateMultisampleRenderTarget(et),Ht.updateRenderTargetMipmap(et)),z&&C.end(I),E.isScene===!0&&E.onAfterRender(I,E,U),ct.resetDefaultState(),X=-1,Q=null,M.pop(),M.length>0?(T=M[M.length-1],Ht.setTextureUnits(T.state.textureUnits),ot===!0&&J.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,R!==null&&R.renderEnd()};function ll(E,U,W,z){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){let wt=U.isArrayCamera?ht:j;if(!E.frustumCulled||E.intersectsFrustum(wt)){z&&Lt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(vt);let ft=it.update(E),St=E.material;St.visible&&A.push(E,ft,St,W,Lt.z,null,U)}}else if(E.isMesh||E.isLine||E.isPoints){let wt=U.isArrayCamera?ht:j;if(!E.frustumCulled||E.intersectsFrustum(wt)){let ft=it.update(E),St=E.material;if(z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Lt.copy(E.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Lt.copy(ft.boundingSphere.center)),Lt.applyMatrix4(E.matrixWorld).applyMatrix4(vt)),Array.isArray(St)){let Pt=ft.groups;for(let Xt=0,ne=Pt.length;Xt<ne;Xt++){let Rt=Pt[Xt],ie=St[Rt.materialIndex];ie&&ie.visible&&A.push(E,ft,ie,W,Lt.z,Rt,U)}}else St.visible&&A.push(E,ft,St,W,Lt.z,null,U)}}}let gt=E.children;for(let wt=0,ft=gt.length;wt<ft;wt++)ll(gt[wt],U,W,z)}function rh(E,U,W,z){let{opaque:G,transmissive:gt,transparent:wt}=E;T.setupLightsView(W),ot===!0&&J.setGlobalState(I.clippingPlanes,W),z&&pt.viewport(tt.copy(z)),G.length>0&&jr(G,U,W),gt.length>0&&jr(gt,U,W),wt.length>0&&jr(wt,U,W),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function ah(E,U,W,z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){let Rt=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new hn(1,1,{generateMipmaps:!0,type:Rt?Ln:on,minFilter:In,samples:Math.max(4,ge.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:se.workingColorSpace})}let gt=T.state.transmissionRenderTarget[z.id],wt=z.viewport||tt;gt.setSize(wt.z*I.transmissionResolutionScale,wt.w*I.transmissionResolutionScale);let ft=I.getRenderTarget(),St=I.getActiveCubeFace(),Pt=I.getActiveMipmapLevel();I.setRenderTarget(gt),I.getClearColor(Y),_t=I.getClearAlpha(),_t<1&&I.setClearColor(16777215,.5),I.clear(),ee&&D.render(W);let Xt=I.toneMapping;I.toneMapping=zn;let ne=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),ot===!0&&J.setGlobalState(I.clippingPlanes,z),jr(E,W,z),Ht.updateMultisampleRenderTarget(gt),Ht.updateRenderTargetMipmap(gt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let ie=0,Ce=U.length;ie<Ce;ie++){let _e=U[ie],{object:xe,geometry:He,material:Ct,group:Ke}=_e;if(Ct.side===vn&&xe.layers.test(z.layers)){let ue=Ct.side;Ct.side=en,Ct.needsUpdate=!0,oh(xe,W,z,He,Ct,Ke),Ct.side=ue,Ct.needsUpdate=!0,Rt=!0}}Rt===!0&&(Ht.updateMultisampleRenderTarget(gt),Ht.updateRenderTargetMipmap(gt))}I.setRenderTarget(ft,St,Pt),I.setClearColor(Y,_t),ne!==void 0&&(z.viewport=ne),I.toneMapping=Xt}function jr(E,U,W){let z=U.isScene===!0?U.overrideMaterial:null;for(let G=0,gt=E.length;G<gt;G++){let wt=E[G],{object:ft,geometry:St,group:Pt}=wt,Xt=wt.material;Xt.allowOverride===!0&&z!==null&&(Xt=z),ft.layers.test(W.layers)&&oh(ft,U,W,St,Xt,Pt)}}function oh(E,U,W,z,G,gt){R!==null&&G.isNodeMaterial&&R.setObject(E,G),E.onBeforeRender(I,U,W,z,G,gt),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(I,U,W,z,E,gt),G.transparent===!0&&G.side===vn&&G.forceSinglePass===!1?(G.side=en,G.needsUpdate=!0,I.renderBufferDirect(W,U,z,G,E,gt),G.side=xi,G.needsUpdate=!0,I.renderBufferDirect(W,U,z,G,E,gt),G.side=vn):I.renderBufferDirect(W,U,z,G,E,gt),E.onAfterRender(I,U,W,z,G,gt)}function lh(E){let U=0;for(let W of E)W.texture!==null&&U++;return U}function Ds(E,U,W){U.isScene!==!0&&(U=te);let z=Ot.get(E),G=T.state.lights,gt=T.state.shadowsArray,wt=G.state.version,ft=K.getParameters(E,G.state,gt,U,W,T.state.lightProbeGridArray),St=K.getProgramCacheKey(ft),Pt=z.programs;z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;let Xt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;z.envMap=P.get(E.envMap||z.environment,Xt),z.envMapRotation=z.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Pt===void 0&&(E.addEventListener("dispose",fe),Pt=new Map,z.programs=Pt,z.programVariants=new Map);let ne=Pt.get(St);if(ne!==void 0){if(z.currentProgram===ne&&z.lightsStateVersion===wt)return hh(E,ft),ne}else ft.uniforms=K.getUniforms(E),R!==null&&E.isNodeMaterial&&R.build(E,W,ft),E.onBeforeCompile(ft,I),ne=K.acquireProgram(ft,St),Pt.set(St,ne),z.uniforms=ft.uniforms;let Rt=z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Rt.clippingPlanes=J.uniform),hh(E,ft),z.needsLights=ff(E),z.lightsStateVersion=wt,z.needsLights&&(Rt.ambientLightColor.value=G.state.ambient,Rt.lightProbe.value=G.state.probe,Rt.sunLights.value=G.state.sun,Rt.sunLightShadows.value=G.state.sunShadow,Rt.directionalLights.value=G.state.directional,Rt.directionalLightShadows.value=G.state.directionalShadow,Rt.spotLights.value=G.state.spot,Rt.spotLightShadows.value=G.state.spotShadow,Rt.rectAreaLights.value=G.state.rectArea,Rt.ltc_1.value=G.state.rectAreaLTC1,Rt.ltc_2.value=G.state.rectAreaLTC2,Rt.pointLights.value=G.state.point,Rt.pointLightShadows.value=G.state.pointShadow,Rt.hemisphereLights.value=G.state.hemi,Rt.sunShadowMatrix.value=G.state.sunShadowMatrix,Rt.sunShadowCascade.value=G.state.sunShadowCascade,Rt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Rt.spotLightMatrix.value=G.state.spotLightMatrix,Rt.spotLightMap.value=G.state.spotLightMap,Rt.pointShadowMatrix.value=G.state.pointShadowMatrix),z.numLightProbeGrids=lh(T.state.lightProbeGridArray),z.currentProgram=ne,z.uniformsList=null,ne}function hf(E,U,W,z,G){let gt=Ot.get(E),wt=gt.currentProgram.id+","+z+","+G,ft=gt.programVariants.get(wt);return ft===void 0?(ft=Ds(E,U,W),gt.programVariants.set(wt,ft)):(gt.currentProgram=ft,gt.uniformsList=null,gt.outputColorSpace=z,gt.toneMapping=G),ft}function ch(E){if(E.uniformsList===null){let U=E.currentProgram.getUniforms();E.uniformsList=As.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function hh(E,U){let W=Ot.get(E);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function uf(E,U,W,z,G){U.isScene!==!0&&(U=te),Ht.resetTextureUnits();let gt=U.fog,wt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,ft=et===null?I.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:se.workingColorSpace,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Pt=P.get(z.envMap||wt,St),Xt=z.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ne=!!W.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Rt=!!W.morphAttributes.position,ie=!!W.morphAttributes.normal,Ce=!!W.morphAttributes.color,_e=zn;z.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(_e=I.toneMapping);let xe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,He=xe!==void 0?xe.length:0,Ct=Ot.get(z),Ke=T.state.lights;if(ot===!0&&(Et===!0||E!==Q)){let be=E===Q&&z.id===X;J.setState(z,E,be)}let ue=!1,wi=!1;z.version===Ct.__version?Ct.needsLights&&Ct.lightsStateVersion!==Ke.state.version||G.isBatchedMesh&&Ct.batching===!1||!G.isBatchedMesh&&Ct.batching===!0||G.isBatchedMesh&&Ct.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Ct.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Ct.instancing===!1||!G.isInstancedMesh&&Ct.instancing===!0||G.isSkinnedMesh&&Ct.skinning===!1||!G.isSkinnedMesh&&Ct.skinning===!0||G.isInstancedMesh&&Ct.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ct.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ct.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ct.instancingMorph===!1&&G.morphTexture!==null||Ct.envMap!==Pt||z.fog===!0&&Ct.fog!==gt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==J.numPlanes||Ct.numIntersection!==J.numIntersection)||Ct.vertexAlphas!==Xt||Ct.vertexTangents!==ne||Ct.morphTargets!==Rt||Ct.morphNormals!==ie||Ct.morphColors!==Ce||Ct.morphTargetsCount!==He||Ct.numLightProbeGrids!==lh(T.state.lightProbeGridArray)?ue=!0:(Ct.outputColorSpace!==ft||Ct.toneMapping!==_e)&&(wi=!0):(ue=!0,Ct.__version=z.version);let Ve=Ct.currentProgram;(ue===!0||wi===!0)&&(Ve=wi===!0?hf(z,U,G,ft,_e):Ds(z,U,G),R&&z.isNodeMaterial&&R.onUpdateProgram(z,Ve,Ct));let ta=!1,si=!1,Ai=!1,ae=Ve.getUniforms(),ke=Ct.uniforms;if(pt.useProgram(Ve.program)&&(ta=!0,si=!0,Ai=!0),z.id!==X&&(X=z.id,si=!0),ta||Q!==E){pt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ae.setValue(F,"projectionMatrix",E.projectionMatrix),ae.setValue(F,"viewMatrix",E.matrixWorldInverse);let Oe=ae.map.cameraPosition;Oe!==void 0&&Oe.setValue(F,Yt.setFromMatrixPosition(E.matrixWorld)),ge.logarithmicDepthBuffer&&ae.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ae.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),Q!==E&&(Q=E,si=!0,Ai=!0)}if(Ct.needsLights&&(Ke.state.sunShadowMap.length>0&&ae.setValue(F,"sunShadowMap",Ke.state.sunShadowMap,Ht),Ke.state.directionalShadowMap.length>0&&ae.setValue(F,"directionalShadowMap",Ke.state.directionalShadowMap,Ht),Ke.state.spotShadowMap.length>0&&ae.setValue(F,"spotShadowMap",Ke.state.spotShadowMap,Ht),Ke.state.pointShadowMap.length>0&&ae.setValue(F,"pointShadowMap",Ke.state.pointShadowMap,Ht)),G.isSkinnedMesh){ae.setOptional(F,G,"bindMatrix"),ae.setOptional(F,G,"bindMatrixInverse");let be=G.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),ae.setValue(F,"boneTexture",be.boneTexture,Ht))}G.isBatchedMesh&&(ae.setOptional(F,G,"batchingTexture"),ae.setValue(F,"batchingTexture",G._matricesTexture,Ht),ae.setOptional(F,G,"batchingIdTexture"),ae.setValue(F,"batchingIdTexture",G._indirectTexture,Ht),ae.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&ae.setValue(F,"batchingColorTexture",G._colorsTexture,Ht));let Tn=W.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&$.update(G,W,Ve),(si||Ct.receiveShadow!==G.receiveShadow)&&(Ct.receiveShadow=G.receiveShadow,ae.setValue(F,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(ke.envMapIntensity.value=U.environmentIntensity),ke.dfgLUT!==void 0&&(ke.dfgLUT.value=A_()),si){if(ae.setValue(F,"toneMappingExposure",I.toneMappingExposure),Ct.needsLights&&df(ke,Ai),gt&&z.fog===!0&&lt.refreshFogUniforms(ke,gt),lt.refreshMaterialUniforms(ke,z,xt,Dt,T.state.transmissionRenderTarget[E.id]),Ct.needsLights&&Ct.numLightProbeGrids>0){let be=y,Oe=0;for(let Vn of T.state.lightProbeGridArray)Vn.texture!==null&&(be.textures[Oe]=Vn.texture,be.min[Oe]=Vn.boundingBox.min,be.max[Oe]=Vn.boundingBox.max,be.resolution[Oe]=Vn.resolution,Oe++);for(let Vn in be)be[Vn].length=Oe;ke.probesSH.value=be.textures,ke.probesMin.value=be.min,ke.probesMax.value=be.max,ke.probesResolution.value=be.resolution}As.upload(F,ch(Ct),ke,Ht)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(As.upload(F,ch(Ct),ke,Ht),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ae.setValue(F,"center",G.center),ae.setValue(F,"modelViewMatrix",G.modelViewMatrix),ae.setValue(F,"normalMatrix",G.normalMatrix),ae.setValue(F,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){let be=z.uniformsGroups;for(let Oe=0,Vn=be.length;Oe<Vn;Oe++){let dh=be[Oe];Nt.update(dh,Ve),Nt.bind(dh,Ve)}}return Ve}function df(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.sunLights.needsUpdate=U,E.sunLightShadows.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function ff(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(E,U,W){let z=Ot.get(E);z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Ot.get(E.texture).__webglTexture=U,Ot.get(E.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:W,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){let W=Ot.get(E);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,W=0){et=E,V=U,H=W;let z=null,G=!1,gt=!1;if(E){let ft=Ot.get(E);if(ft.__useDefaultFramebuffer!==void 0){pt.bindFramebuffer(F.FRAMEBUFFER,ft.__webglFramebuffer),tt.copy(E.viewport),Tt.copy(E.scissor),Ut=E.scissorTest,pt.viewport(tt),pt.scissor(Tt),pt.setScissorTest(Ut),X=-1;return}else if(ft.__webglFramebuffer===void 0)Ht.setupRenderTarget(E);else if(ft.__hasExternalTextures)Ht.rebindTextures(E,Ot.get(E.texture).__webglTexture,Ot.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Xt=E.depthTexture;if(ft.__boundDepthTexture!==Xt){if(Xt!==null&&Ot.has(Xt)&&(E.width!==Xt.image.width||E.height!==Xt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ht.setupDepthRenderbuffer(E)}}let St=E.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(gt=!0);let Pt=Ot.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pt[U])?z=Pt[U][W]:z=Pt[U],G=!0):E.samples>0&&Ht.useMultisampledRTT(E)===!1?z=Ot.get(E).__webglMultisampledFramebuffer:Array.isArray(Pt)?z=Pt[W]:z=Pt,tt.copy(E.viewport),Tt.copy(E.scissor),Ut=E.scissorTest}else tt.copy(nt).multiplyScalar(xt).floor(),Tt.copy(At).multiplyScalar(xt).floor(),Ut=jt;if(W!==0&&(z=O),pt.bindFramebuffer(F.FRAMEBUFFER,z)&&pt.drawBuffers(E,z),pt.viewport(tt),pt.scissor(Tt),pt.setScissorTest(Ut),G){let ft=Ot.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,ft.__webglTexture,W)}else if(gt){let ft=U;for(let St=0;St<E.textures.length;St++){let Pt=Ot.get(E.textures[St]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+St,Pt.__webglTexture,W,ft)}}else if(E!==null&&W!==0){let ft=Ot.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ft.__webglTexture,W)}X=-1};function uh(E){let U=Ot.get(E);return(U.__readFormat!==E.format||U.__readType!==E.type)&&(U.__readFormat=E.format,U.__readType=E.type,U.__formatReadable=ge.textureFormatReadable(E.format),U.__typeReadable=ge.textureTypeReadable(E.type)),U}this.readRenderTargetPixels=function(E,U,W,z,G,gt,wt,ft=0){if(!(E&&E.isWebGLRenderTarget)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=Ot.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&wt!==void 0&&(St=St[wt],Array.isArray(St)&&(St=St[0])),St){pt.bindFramebuffer(F.FRAMEBUFFER,St);try{let Pt=E.textures[ft],Xt=Pt.format,ne=Pt.type;E.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ft);let Rt=uh(Pt);if(Rt.__formatReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Rt.__typeReadable===!1){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-z&&W>=0&&W<=E.height-G&&F.readPixels(U,W,z,G,at.convert(Xt),at.convert(ne),gt)}finally{let Pt=et!==null?Ot.get(et).__webglFramebuffer:null;pt.bindFramebuffer(F.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(E,U,W,z,G,gt,wt,ft=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=Ot.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&wt!==void 0&&(St=St[wt],Array.isArray(St)&&(St=St[0])),St)if(U>=0&&U<=E.width-z&&W>=0&&W<=E.height-G){pt.bindFramebuffer(F.FRAMEBUFFER,St);let Pt=E.textures[ft],Xt=Pt.format,ne=Pt.type;E.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ft);let Rt=uh(Pt);if(Rt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Rt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ie=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ie),F.bufferData(F.PIXEL_PACK_BUFFER,gt.byteLength,F.STREAM_READ),F.readPixels(U,W,z,G,at.convert(Xt),at.convert(ne),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ce=et!==null?Ot.get(et).__webglFramebuffer:null;pt.bindFramebuffer(F.FRAMEBUFFER,Ce);let _e=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Pu(F,_e,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ie),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,gt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(ie),F.deleteSync(_e),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,W=0){let z=Math.pow(2,-W),G=Math.floor(E.image.width*z),gt=Math.floor(E.image.height*z),wt=U!==null?U.x:0,ft=U!==null?U.y:0;Ht.setTexture2D(E,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,wt,ft,G,gt),pt.unbindTexture()},this.copyTextureToTexture=function(E,U,W=null,z=null,G=0,gt=0){let wt,ft,St,Pt,Xt,ne,Rt,ie,Ce,_e=E.isCompressedTexture?E.mipmaps[gt]:E.image;if(W!==null)wt=W.max.x-W.min.x,ft=W.max.y-W.min.y,St=W.isBox3?W.max.z-W.min.z:1,Pt=W.min.x,Xt=W.min.y,ne=W.isBox3?W.min.z:0;else{let ae=Math.pow(2,-G);wt=Math.floor(_e.width*ae),ft=Math.floor(_e.height*ae),E.isDataArrayTexture?St=_e.depth:E.isData3DTexture?St=Math.floor(_e.depth*ae):St=1,Pt=0,Xt=0,ne=0}z!==null?(Rt=z.x,ie=z.y,Ce=z.z):(Rt=0,ie=0,Ce=0);let xe=at.convert(U.format),He=at.convert(U.type),Ct;U.isData3DTexture?(Ht.setTexture3D(U,0),Ct=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ht.setTexture2DArray(U,0),Ct=F.TEXTURE_2D_ARRAY):(Ht.setTexture2D(U,0),Ct=F.TEXTURE_2D),pt.activeTexture(F.TEXTURE0),pt.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),pt.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),pt.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);let Ke=pt.getParameter(F.UNPACK_ROW_LENGTH),ue=pt.getParameter(F.UNPACK_IMAGE_HEIGHT),wi=pt.getParameter(F.UNPACK_SKIP_PIXELS),Ve=pt.getParameter(F.UNPACK_SKIP_ROWS),ta=pt.getParameter(F.UNPACK_SKIP_IMAGES);pt.pixelStorei(F.UNPACK_ROW_LENGTH,_e.width),pt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_e.height),pt.pixelStorei(F.UNPACK_SKIP_PIXELS,Pt),pt.pixelStorei(F.UNPACK_SKIP_ROWS,Xt),pt.pixelStorei(F.UNPACK_SKIP_IMAGES,ne);let si=E.isDataArrayTexture||E.isData3DTexture,Ai=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){let ae=Ot.get(E),ke=Ot.get(U),Tn=Ot.get(ae.__renderTarget),be=Ot.get(ke.__renderTarget);pt.bindFramebuffer(F.READ_FRAMEBUFFER,Tn.__webglFramebuffer),pt.bindFramebuffer(F.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Oe=0;Oe<St;Oe++)si&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ot.get(E).__webglTexture,G,ne+Oe),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ot.get(U).__webglTexture,gt,Ce+Oe)),F.blitFramebuffer(Pt,Xt,Pt+wt,Xt+ft,Rt,ie,Rt+wt,ie+ft,F.DEPTH_BUFFER_BIT,F.NEAREST);pt.bindFramebuffer(F.READ_FRAMEBUFFER,null),pt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||Ot.has(E)){let ae=Ot.get(E),ke=Ot.get(U);pt.bindFramebuffer(F.READ_FRAMEBUFFER,L),pt.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let Tn=0;Tn<St;Tn++)si?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ae.__webglTexture,G,ne+Tn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ae.__webglTexture,G),Ai?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.__webglTexture,gt,Ce+Tn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ke.__webglTexture,gt),G!==0?F.blitFramebuffer(Pt,Xt,Pt+wt,Xt+ft,Rt,ie,Rt+wt,ie+ft,F.COLOR_BUFFER_BIT,F.NEAREST):Ai?F.copyTexSubImage3D(Ct,gt,Rt,ie,Ce+Tn,Pt,Xt,wt,ft):F.copyTexSubImage2D(Ct,gt,Rt,ie,Pt,Xt,wt,ft);pt.bindFramebuffer(F.READ_FRAMEBUFFER,null),pt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Ai?E.isDataTexture||E.isData3DTexture?F.texSubImage3D(Ct,gt,Rt,ie,Ce,wt,ft,St,xe,He,_e.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Ct,gt,Rt,ie,Ce,wt,ft,St,xe,_e.data):F.texSubImage3D(Ct,gt,Rt,ie,Ce,wt,ft,St,xe,He,_e):E.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,gt,Rt,ie,wt,ft,xe,He,_e.data):E.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,gt,Rt,ie,_e.width,_e.height,xe,_e.data):F.texSubImage2D(F.TEXTURE_2D,gt,Rt,ie,wt,ft,xe,He,_e);pt.pixelStorei(F.UNPACK_ROW_LENGTH,Ke),pt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ue),pt.pixelStorei(F.UNPACK_SKIP_PIXELS,wi),pt.pixelStorei(F.UNPACK_SKIP_ROWS,Ve),pt.pixelStorei(F.UNPACK_SKIP_IMAGES,ta),gt===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&F.generateMipmap(Ct),pt.unbindTexture()},this.initRenderTarget=function(E){Ot.get(E).__webglFramebuffer===void 0&&Ht.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ht.setTextureCube(E,0):E.isData3DTexture?Ht.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ht.setTexture2DArray(E,0):Ht.setTexture2D(E,0),pt.unbindTexture()},this.resetState=function(){V=0,H=0,et=null,pt.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}};function Gr(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new ve;l.morphTargetsRelative=o;let c=0;for(let h=0;h<i.length;++h){let f=i[h],u=0,d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in f.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(f.morphAttributes[p]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0,f=[];for(let u=0;u<i.length;++u){let d=i[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=i[u].attributes.position.count}l.setIndex(f)}for(let h in r){let f=Md(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let v=0;v<a[h].length;++v)d.push(a[h][v][u]);let p=Md(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Md(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Le(a,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let f=l/e;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<e;p++){let v=h.getComponent(u,p);o.setComponent(u+f,p,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var zc=Math.PI*2,me=[0,0,0],vi={blue:1085152,blueShade:479381,ice:7985151,navy:1453392,skin:15840638,skinShade:13208928,khaki:13675111,tan:11960903,leather:5518632,dark:2434352,gun:2504008,steel:8492968,red:15150389,wine:9377830,orange:16756781,gold:15775821};function R_(i,t=16,e=1,n=null){let s=[],r=[],a=n?t+1:t,o=n?n[0]:0,l=n?n[1]-n[0]:zc;for(let[h,f,u,d=0,p=0]of i)for(let v=0;v<a;v++){let g=o+l*v/t,m=Math.sin(g),_=Math.cos(g);s.push(d+f*Math.sign(m)*Math.abs(m)**e,h,p+u*Math.sign(_)*Math.abs(_)**e)}for(let h=0;h<i.length-1;h++)for(let f=0;f<t;f++){let u=n?f+1:(f+1)%a,d=h*a+f,p=h*a+u;r.push(d,p,d+a,p,p+a,d+a)}if(!n)for(let h of[!1,!0]){let f=h?i.length-1:0,[u,,,d=0,p=0]=i[f],v=s.length/3;s.push(d,u,p);let g=f*a;for(let m=0;m<t;m++){let _=g+m,S=g+(m+1)%t;h?r.push(v,_,S):r.push(v,S,_)}}let c=new ve;return c.setAttribute("position",new qt(s,3)),c.setIndex(r),c.computeVertexNormals(),c}function C_(i=12,t=8){return new xr(1,i,t)}function il(i,t,e,n=e,s=8){let r=new N(...i),a=new N(...t),o=a.clone().sub(r),l=new fi(n,e,o.length(),s);l.applyQuaternion(new je().setFromUnitVectors(new N(0,1,0),o.normalize()));let c=r.add(a).multiplyScalar(.5);return l.translate(c.x,c.y,c.z)}function nn(i,t,e=6){let n=new xs(i.map(s=>new N(...s)));return new _r(n,(i.length-1)*3,t,e,!1)}function I_(i){let t=new N;for(let a of i)t.add(new N(...a));t.divideScalar(i.length);let e=[...t.toArray(),...i.flat()],n=[],s=i.reduce((a,o,l)=>{let c=i[(l+1)%i.length];return a+o[0]*c[1]-o[1]*c[0]},0)>0;for(let a=0;a<i.length;a++){let o=a+1,l=(a+1)%i.length+1;n.push(0,s?o:l,s?l:o)}let r=new ve;return r.setAttribute("position",new qt(e,3)),r.setIndex(n),r.computeVertexNormals(),r}function Td(){return{cloth:new Ze({vertexColors:!0,shininess:21,specular:3156007}),lacquer:new Ze({vertexColors:!0,shininess:58,specular:7175302}),metal:new Ze({vertexColors:!0,shininess:78,specular:10201786})}}var bn=class{constructor(){this.byFinish=new Map}add(t,e,n=me,s=[1,1,1],r=me,a="cloth"){let o=new he().compose(new N(...n),new je().setFromEuler(new tn(...r)),new N(...s));t.applyMatrix4(o),t.deleteAttribute("uv"),t.clearGroups();let l=t.attributes.position.count;t.index===null&&t.setIndex(Array.from({length:l},(f,u)=>u));let c=new kt(e),h=new Float32Array(l*3);for(let f=0;f<l;f++){let u=f*3;h[u]=c.r,h[u+1]=c.g,h[u+2]=c.b}t.setAttribute("color",new Le(h,3)),this.byFinish.has(a)||this.byFinish.set(a,[]),this.byFinish.get(a).push(t)}shape(t,e,n={}){let{sides:s=16,power:r=1,arc:a=null,at:o,scale:l,rotate:c,finish:h}=n;this.add(R_(t,s,r,a),e,o,l,c,h)}ell(t,e,n,s=me,r="cloth",a=14,o=8){this.add(C_(a,o),t,e,n,s,r)}box(t,e,n,s=me,r="cloth"){this.add(new _n(1,1,1),t,e,n,s,r)}joinGeometry(){let t=Gr([...this.byFinish.values()].flat(),!1);return t.computeBoundingSphere(),t.computeBoundingBox(),t}attach(t,e){for(let[n,s]of this.byFinish){let r=new ye(Gr(s,!1),e[n]);r.castShadow=!0,t.add(r)}}};function Sn(i,t=0,e=0,n=0){let s=new sn;return s.position.set(t,e,n),i.add(s),s}function wd(i,t="near"){let e=i==="red",n=t==="far",s=new bn,r=e?15873338:1351656,a=e?11542827:1399980,o=e?12285259:14004599,l=n?6:10,c=n?5:8;for(let f of[-1,1]){let u=f*.081;s.shape([[.01,.058,.09,u,-.022],[.05,.068,.103,u,-.025],[.12,.05,.067,u]],3484976,{sides:n?4:6,power:.72}),s.shape([[.075,.055,.058,u],[.22,.068,.074,u*.91],[.3,.073,.078,u*.83]],e?6701875:2906496,{sides:n?4:6})}s.shape([[.235,.117,.081],[.3,.151,.114],[.42,.153,.101],[.485,.118,.084]],o,{sides:n?5:8,power:.89}),n||(s.shape([[.274,.137,.11],[.307,.151,.117]],6899252,{sides:8}),s.box(10712389,[0,.365,.097],[.093,.118,.045],[.03,0,.08]));for(let f of[-1,1]){let u=f*.166;s.shape([[.26,.037,.044,u*1.12,-.031],[.298,.055,.06,u*1.07,-.03],[.386,.052,.057,u,.007],[.444,.05,.058,u*.91]],15772528,{sides:n?4:6}),n||s.ell(o,[u*.88,.427,.008],[.083,.078,.092],me,"cloth",6,3)}if(s.shape([[.43,.072,.073,0,-.012],[.462,.127,.1,0,-.016],[.548,.161,.14],[.635,.162,.149]],16761484,{sides:c,power:.82}),n||(s.ell(14129257,[-.151,.546,.005],[.033,.046,.041],me,"cloth",5,3),s.ell(14129257,[.151,.546,.005],[.033,.046,.041],me,"cloth",5,3)),s.shape([[.548,.177,.162,0,.009],[.585,.221,.198],[.613,.215,.195]],a,{sides:l}),s.shape([[.595,.224,.2],[.644,.229,.211],[.744,.204,.19],[.818,.132,.124],[.847,.054,.052]],r,{sides:l}),n||(s.shape([[.589,.221,.201],[.605,.226,.205]],e?16145742:7194613,{sides:10}),e?s.ell(14390363,[0,.536,-.135],[.043,.038,.046],me,"cloth",5,3):(s.add(il([.163,.264,.032],[.173,.525,-.19],.026,.026,5),vi.gun),s.add(il([.173,.51,-.18],[.173,.656,-.268],.013,.013,5),2966610))),e&&!n)for(let f of[-1,1])s.ell(5452840,[f*.064,.54,-.137],[.029,.012,.011],[0,-f*.28,-f*.12],"cloth",5,3);let h=s.joinGeometry();return h.scale(1.055,1.016,1),e&&h.rotateY(Math.PI),h.computeBoundingBox(),h}function Sd(i,t,e){let n=Sn(i,t*.117,.607,0),s=new bn;return s.shape([[-.385,.063,.064,t*.013,.016],[-.29,.086,.082,t*.012,.012],[-.165,.103,.103,t*.007,-.005],[-.032,.111,.114],[.036,.079,.086]],3629962,{sides:12}),s.shape([[-.59,.078,.142,t*.013,-.045],[-.553,.091,.153,t*.012,-.044],[-.493,.092,.141,t*.012,-.036],[-.448,.079,.082,t*.012,.012],[-.299,.08,.077,t*.012,.018]],5586993,{sides:12,power:.74}),s.shape([[-.606,.081,.143,t*.013,-.045],[-.586,.092,.151,t*.013,-.046],[-.565,.092,.151,t*.013,-.045]],3485490,{sides:12,power:.7}),s.shape([[-.327,.081,.079,t*.012,.015],[-.291,.086,.084,t*.012,.014]],9134660,{sides:12}),s.attach(n,e),n}function Ad(){let i=new sn,t=Td(),e=Sn(i),n=Sd(e,-1,t),s=Sd(e,1,t),r=Sn(e,0,.62),a=new bn;a.shape([[-.075,.183,.122],[.005,.217,.15],[.102,.221,.156],[.264,.274,.19],[.367,.285,.177],[.416,.191,.131]],vi.khaki,{power:.8}),a.shape([[-.046,.216,.146],[-.008,.226,.155],[.045,.227,.158]],vi.leather,{sides:16,power:.8}),a.shape([[.358,.185,.128],[.392,.187,.136],[.431,.165,.12]],15977614,{sides:14}),a.shape([[.375,.102,.106],[.502,.106,.099]],vi.skinShade);for(let p of[-1,1]){let v=p*.158;a.add(nn([[v*.8,.005,.155],[v*.85,.135,.179],[v,.29,.168],[v,.37,.126],[v*.85,.405,.014],[v*.81,.36,-.111]],.027),7950390),a.box(12164198,[v*.89,.22,.192],[.064,.035,.015],[0,0,p*.065],"metal"),a.shape([[.144,.078,.084,v*1.62,.042],[.207,.102,.109,v*1.66,.022],[.307,.107,.112,v*1.6],[.342,.07,.073,v*1.47]],13210966,{sides:12}),a.add(il([v*1.74,.18,.038],[v*1.88,.074,-.092],.066,.059,10),vi.skin),a.ell(9069123,[v*1.88,.078,-.105],[.07,.068,.076],[.22,0,0])}for(let p of[-1,1])a.box(13015648,[p*.124,.22,-.157],[.126,.101,.03],[.08,p*.16,0]),a.box(15122300,[p*.124,.249,-.174],[.13,.037,.016],[.1,p*.16,0]);a.box(13280874,[0,-.011,-.153],[.1,.061,.021],me,"metal"),a.box(9987129,[0,.077,.144],[.17,.112,.074],[.08,0,0]),a.box(12289103,[0,.101,.184],[.172,.062,.02],[.12,0,0]),a.add(nn([[-.165,.034,.158],[-.002,.169,.207],[.153,.292,.17]],.033),9463616),a.attach(r,t);let o=Sn(r,-.027,.461,-.015),l=new bn;l.shape([[0,.093,.078],[.024,.142,.126,0,-.012],[.078,.189,.162,0,-.016],[.204,.211,.181,0,-.004],[.278,.203,.176],[.327,.142,.137]],vi.skin,{sides:18,power:.83});for(let p of[-1,1])l.ell(14788213,[p*.201,.145,.001],[.037,.072,.053]),l.add(nn([[p*.199,.245,.062],[p*.192,.112,.045],[p*.148,.014,-.001],[p*.068,-.005,-.052]],.019),7885632);l.shape([[.192,.18,.168,0,.009],[.219,.223,.202],[.264,.224,.202]],7229755,{sides:20,arc:[-.69*Math.PI,.69*Math.PI]}),l.ell(13996641,[0,.132,-.167],[.052,.049,.05]);for(let p of[-1,1])l.ell(5519405,[p*.08,.168,-.155],[.042,.013,.016],[0,-p*.31,-p*.09]),l.ell(3882042,[p*.076,.15,-.164],[.018,.021,.014],[0,-p*.28,0],"lacquer",9,5);l.add(nn([[-.054,.079,-.157],[0,.07,-.169],[.053,.078,-.155]],.009),11892307),l.shape([[.207,.224,.212,0,.015],[.243,.273,.242,0,.011],[.279,.285,.253],[.302,.279,.248]],vi.blueShade,{sides:24,finish:"lacquer"}),l.shape([[.255,.275,.251],[.272,.286,.258],[.288,.282,.253]],6867711,{sides:24,finish:"lacquer"}),l.shape([[.281,.278,.25],[.331,.288,.257],[.413,.275,.249],[.498,.23,.222],[.574,.144,.155],[.609,.055,.068],[.614,.014,.022]],vi.blue,{sides:28,finish:"lacquer"}),l.attach(o,t);let c=Sn(r,.295,.691,-.03),h=new bn;function f(p,v,g,m,_,S="metal",y=18){h.add(il([0,0,m],[0,0,_],v,g,y),p,me,[1,1,1],me,S)}f(2505549,.106,.11,-.48,.367),f(3558238,.13,.12,-.5,-.375),f(6928350,.142,.142,-.495,-.471),f(2110276,.142,.142,-.549,-.498),f(7442078,.147,.147,-.558,-.541),f(1252139,.105,.105,-.561,-.56),f(2635849,.144,.134,-.275,-.12),f(5540523,.141,.135,-.254,-.205),f(3305115,.125,.129,-.044,.161);for(let p of[-.292,-.119,.148,.203,.249,.294])f(p<.15?8559533:6058374,.139,.139,p,p+.021);f(2504006,.146,.137,.178,.346),f(10005948,.154,.153,.322,.36),f(2503748,.127,.123,.359,.373),f(1319473,.087,.086,.374,.375),h.box(3756390,[0,.095,-.1],[.093,.09,.202],me,"metal"),h.box(7785452,[0,.147,-.12],[.103,.023,.105],me,"metal"),h.box(3229274,[.098,.066,.061],[.052,.047,.189],me,"metal"),h.ell(8701671,[.123,.065,.02],[.012,.022,.036],me,"lacquer"),h.attach(c,t);let u=Sn(c,0,0,-.57);function d({time:p=0,run:v=0,recoil:g=0,merge:m=0,lean:_=0}={}){let S=p*10.9;n.rotation.x=Math.sin(S)*.53*v,s.rotation.x=-Math.sin(S)*.53*v,e.position.y=Math.abs(Math.sin(S))*.035*v,r.rotation.z=-_*.13+Math.sin(S)*.021*v,r.rotation.x=-.058*v+g*.085,o.rotation.z=_*.026,c.position.z=-.03+g*.155,c.rotation.x=g*.14,t.cloth.emissive.setRGB(m*.43,m*.21,m*.05),t.lacquer.emissive.setRGB(m*.37,m*.31,m*.11),t.metal.emissive.setRGB(m*.29,m*.22,m*.07)}return{root:i,animate:d,muzzle:u}}function bd(i,t,e){let n=Sn(i,t*.43,1.68,-.015),s=new bn;return s.shape([[-1.25,.174,.178,t*.045,-.045],[-.942,.204,.209,t*.048,.014],[-.791,.233,.242,t*.04,.064],[-.594,.252,.269,t*.028,.048],[-.285,.29,.323,t*.007,.015],[-.07,.315,.347],[.125,.259,.29]],3617601,{sides:16,power:.89}),s.shape([[-1.638,.214,.317,t*.048,.095],[-1.545,.228,.328,t*.048,.115],[-1.44,.224,.31,t*.048,.103],[-1.325,.191,.225,t*.047,.035],[-1.087,.21,.199,t*.044,-.009],[-.956,.203,.192,t*.043,.007]],6827825,{sides:16,power:.76,finish:"lacquer"}),s.shape([[-1.677,.214,.32,t*.048,.102],[-1.64,.232,.337,t*.048,.105],[-1.579,.231,.331,t*.048,.109]],3681590,{sides:16,power:.67}),s.shape([[-1.072,.21,.201,t*.045,-.001],[-.979,.221,.21,t*.045,.007],[-.931,.208,.203,t*.044,.009]],8863291,{sides:16,power:.84}),s.add(nn([[t*.208,-1.044,.035],[t*.214,-1.234,.049],[t*.221,-1.365,.088]],.012),11756368),s.attach(n,e),n}function Ed(i,t,e){let n=Sn(i,t*1.105,1.01,.006),s=new bn;s.shape([[-.946,.183,.212,t*.247,.066],[-.832,.245,.272,t*.24,.068],[-.69,.312,.324,t*.227,.084],[-.565,.35,.358,t*.208,.104],[-.464,.349,.348,t*.183,.09],[-.364,.304,.297,t*.155,.055],[-.21,.275,.265,t*.112,.023],[.015,.261,.243,t*.044,-.004],[.127,.216,.205,-t*.021,-.014]],15836013,{sides:20,power:.91}),s.shape([[-.385,.331,.334,t*.164,.018],[-.32,.384,.365,t*.139,.008],[-.155,.407,.387,t*.104,-.012],[.037,.387,.372,t*.048,-.017],[.171,.311,.32,t*.009,-.022],[.204,.206,.213,-t*.01,-.025]],13444657,{sides:18,power:.87,finish:"lacquer"}),s.shape([[-.395,.335,.339,t*.162,.02],[-.361,.362,.351,t*.152,.015],[-.332,.374,.359,t*.141,.011]],9642036,{sides:18,finish:"lacquer"}),s.ell(15094599,[t*.211,.096,.238],[.101,.037,.063],[0,0,-t*.2],"lacquer",10,6),s.attach(n,e);let r=Sn(n,t*.242,-.841,.063),a=new bn;a.shape([[-.638,.167,.19,t*.089,.089],[-.5,.219,.237,t*.094,.058],[-.359,.27,.268,t*.088,.034],[-.184,.292,.283,t*.063,.006],[-.045,.251,.249,t*.025],[.084,.177,.194]],15770481,{sides:16,power:.9}),a.shape([[-.672,.25,.256,t*.103,.102],[-.624,.275,.271,t*.1,.092],[-.516,.256,.251,t*.096,.07],[-.448,.224,.227,t*.095,.062]],10231597,{sides:16,power:.75,finish:"lacquer"}),a.shape([[-1.063,.216,.244,t*.109,.176],[-1.021,.295,.307,t*.123,.164],[-.925,.336,.337,t*.129,.154],[-.766,.337,.322,t*.124,.132],[-.65,.272,.262,t*.109,.115],[-.592,.2,.2,t*.104,.102]],14430257,{sides:18,power:.63,finish:"lacquer"}),a.ell(13707822,[-t*.105,-.822,.265],[.147,.208,.17],[-.17,0,t*.4],"lacquer");for(let o=0;o<4;o++){let l=(o-1.5)*.131;a.ell(o%2?14959422:14628919,[t*.115+l,-.919,.423-Math.abs(l)*.17],[.069,.106,.08],[-.15,0,0],"lacquer",10,6)}return a.add(nn([[t*.272,-.665,.286],[t*.324,-.776,.353],[t*.321,-.893,.377]],.011),16739403),a.attach(r,e),{shoulder:n,elbow:r}}function P_(i){let t=[[-.223,.748,.473,0,-.017],[-.139,.836,.523,0,-.022],[.105,.91,.563,0,-.022],[.403,1.011,.614,0,-.017],[.702,1.164,.636,0,-.031],[.909,1.238,.601,0,-.054],[1.079,1.122,.505,0,-.067],[1.207,.788,.365,0,-.078],[1.24,.489,.302,0,-.092]],e=[.425,.432,.429,.433,.455,.563,.617,.628,.52],n=36,s=[],r=[];for(let o=0;o<t.length;o++){let[l,c,h,f,u]=t[o],d=e[o];for(let p=0;p<=n;p++){let v=d+(zc-2*d)*p/n;s.push(f+c*Math.sin(v),l,u+h*Math.cos(v))}}for(let o=0;o<t.length-1;o++)for(let l=0;l<n;l++){let c=o*(n+1)+l,h=c+1,f=h+n+1,u=c+n+1;r.push(c,h,u,h,f,u)}let a=new ve;a.setAttribute("position",new qt(s,3)),a.setIndex(r),a.computeVertexNormals(),i.add(a,14230834,me,[1,1,1],me,"lacquer");for(let o of[-1,1]){let l=t.map(([h,f,u,,d],p)=>[o*f*Math.sin(e[p]),h,d+u*Math.cos(e[p])]);i.add(nn(l,.044,8),9312552),i.add(nn(l.map(([h,f,u])=>[h-o*.013,f,u+.03]),.01,5),16354152),i.add(nn([[o*.71,-.158,.279],[o*.85,.14,.292],[o*.92,.39,.326],[o*1.02,.66,.293]],.014),11803696);let c=[[o*.397,.401,.564],[o*.723,.711,.515],[o*.832,.826,.428],[o*.687,.916,.474],[o*.826,1.048,.352],[o*.53,1.207,.289],[o*.394,1.211,.234],[o*.459,.972,.51]];i.add(I_(c),15156032,me,[1,1,1],me,"lacquer"),i.add(nn([c[0],c[1],c[2]],.012),15686219),i.ell(15315293,[o*.675,.812,.526],[.038,.039,.017],me,"metal",9,6),i.add(nn([[o*.627,.319,.464],[o*.798,.398,.407],[o*.893,.436,.353]],.027),9970736),i.ell(14197845,[o*.77,.389,.431],[.025,.029,.018],me,"metal",8,5)}}function L_(i,t,e){let n=new bn;n.shape([[-.08,.226,.218,0,-.005],[.026,.28,.245,0,.008],[.102,.315,.262,0,.035],[.228,.365,.304,0,.036],[.402,.385,.34,0,.003],[.557,.401,.341,0,-.032],[.694,.359,.308,0,-.044],[.766,.267,.267,0,-.041]],15969651,{sides:24,power:.77}),n.shape([[-.023,.234,.206,0,.03],[.03,.277,.226,0,.062],[.121,.291,.193,0,.076]],15309411,{sides:18,power:.82});for(let s of[-1,1])n.ell(15572841,[s*.378,.366,-.013],[.077,.124,.078],[0,.13*s,-.07*s]),n.ell(14254172,[s*.411,.365,.037],[.036,.07,.03]),n.ell(16100980,[s*.224,.335,.265],[.14,.092,.07],[.02,.2*s,-s*.23]),n.ell(7814702,[s*.16,.461,.312],[.118,.065,.048],[0,s*.13,s*.16]),n.ell(16772309,[s*.156,.472,.342],[.092,.047,.033],[0,s*.13,s*.14]),n.ell(2438722,[s*.128,.473,.367],[.037,.039,.018],[0,s*.12,0],"lacquer",12,7),n.ell(16515071,[s*.128-.009,.487,.383],[.01,.012,.004],me,"lacquer",8,5),n.ell(11756324,[s*.16,.548,.335],[.159,.052,.065],[0,s*.16,s*.32]),n.ell(16099377,[s*.168,.564,.347],[.143,.048,.055],[0,s*.16,s*.3]),n.shape([[.202,.026,.025,s*.339,.057],[.313,.045,.054,s*.35,.053],[.489,.061,.075,s*.337,.052],[.588,.043,.057,s*.321,.057]],13137961,{sides:10});n.ell(15376747,[0,.43,.341],[.067,.135,.067],[-.103,0,0]),n.ell(16757371,[0,.362,.379],[.098,.079,.089]),n.shape([[.037,.102,.059,0,.239],[.08,.163,.095,0,.236],[.152,.197,.096,0,.226],[.211,.205,.092,0,.218]],12875558,{sides:16,power:.81}),n.shape([[-.047,.063,.063,0,.239],[0,.128,.091,0,.257],[.083,.177,.117,0,.251],[.154,.187,.116,0,.248],[.186,.157,.085,0,.253]],15835182,{sides:19,power:.83,finish:"lacquer"}),n.add(nn([[-.122,.246,.321],[-.056,.255,.351],[.008,.258,.352],[.084,.245,.34],[.123,.239,.322]],.015),7814701);for(let s of[-1,1])n.ell(14914603,[s*.09,.282,.327],[.097,.032,.036],[0,s*.1,-s*.21]);if(e===0){n.shape([[.544,.355,.286,0,-.068],[.674,.378,.309,0,-.065],[.785,.349,.311,.002,-.066],[.84,.258,.263,.014,-.091]],14191411,{sides:24,power:.83,arc:[.92,zc-.92]});let s=[[.685,.309,.263,0,-.014],[.754,.362,.309,.01,-.018],[.836,.376,.301,.021,-.014],[.96,.339,.264,.045,-.045],[1.095,.248,.201,.081,-.104],[1.201,.132,.111,.104,-.169],[1.294,.022,.029,.129,-.231]];n.shape(s,14850346,{sides:26,power:.8});let r=[[-.275,.132,.71,.403,-.038,-.228,.083,16363057],[-.204,.205,.702,.561,.015,-.364,.1,16430402],[-.088,.235,.694,.573,.118,-.411,.106,15638056],[.031,.242,.687,.725,.095,-.514,.105,16760638],[.147,.213,.697,.564,.097,-.419,.092,15835947],[.244,.148,.705,.657,.094,-.434,.082,16758585],[.297,.074,.705,.445,.092,-.318,.076,15572004]];for(let[a,o,l,c,h,f,u,d]of r)n.shape([[l,u*.48,u*.52,a,o],[l+c*.16,u,u*1.08,a+h*.04,o+f*.01],[l+c*.39,u,u*.9,a+h*.22,o+f*.12],[l+c*.66,u*.65,u*.65,a+h*.5,o+f*.38],[l+c*.85,u*.3,u*.33,a+h*.8,o+f*.73],[l+c,.003,.004,a+h,o+f]],d,{sides:11,power:.86})}else{let s=e===1,r=s?6963506:3749707;n.shape([[.53,.39,.34,0,-.02],[.65,.445,.38],[.83,.43,.395],[.94,.34,.31],[1.01,.13,.12]],r,{sides:32});for(let a of[-1,1])s?(n.ell(5780265,[a*.39,.52,0],[.1,.22,.21]),n.ell(14064725,[a*.445,.54,.03],[.065,.14,.13],me,"metal"),n.ell(5584161,[a*.178,.737,.335],[.196,.134,.09],[0,a*.29,a*.09]),n.ell(15908197,[a*.178,.744,.391],[.181,.119,.061],[0,a*.29,a*.09],"metal"),n.ell(2714499,[a*.178,.744,.425],[.15,.09,.048],[0,a*.29,a*.09],"lacquer"),n.ell(10085096,[a*.17,.771,.458],[.083,.013,.009],[0,a*.28,.19])):n.ell(15973465,[a*.37,.66,.16],[.046,.05,.023],me,"metal");s||(n.shape([[.69,.42,.39],[.75,.54,.47,0,.034],[.86,.53,.48,0,.045],[.93,.46,.43,0,.055]],9972537,{sides:36}),n.ell(2499384,[0,.657,.275],[.413,.044,.29],[-.13,0,0],"lacquer"),n.add(nn([[-.34,.72,.27],[0,.7,.408],[.34,.72,.27]],.022),15248460),n.ell(16763236,[0,.812,.5],[.083,.089,.022],me,"metal"))}n.attach(i,t)}function kc(i=0){let t=new sn,e=Td(),n=Sn(t),s=bd(n,-1,e),r=bd(n,1,e),a=Sn(n,0,1.9,-.014),o=new bn;o.shape([[-.36,.641,.399],[-.13,.751,.457],[.033,.775,.472],[.096,.741,.449]],3945024,{sides:22,power:.8}),o.shape([[-.13,.757,.457],[-.092,.78,.471],[.015,.78,.469],[.043,.755,.454]],6437686,{sides:22,power:.84}),o.box(16760161,[0,-.041,.469],[.242,.117,.037],me,"metal"),o.box(7820091,[0,-.039,.495],[.179,.063,.023],me,"metal"),o.shape([[-.136,.675,.433,0,.025],[.018,.767,.498,0,.017],[.254,.838,.548],[.519,.92,.579,0,-.013],[.779,.993,.584,0,-.02],[.973,.909,.507,0,-.034],[1.094,.637,.377,0,-.031]],15852747,{sides:26,power:.88}),o.shape([[.855,.18,.05,0,.509],[.928,.272,.094,0,.449],[1.013,.425,.151,0,.357],[1.135,.464,.261,0,.152],[1.316,.338,.264,0,.04]],15311210,{sides:22,power:.88}),o.add(nn([[-.411,1.078,.423],[-.289,.958,.502],[0,.848,.554],[.289,.958,.502],[.411,1.078,.423]],.024),16773081),o.shape([[1.059,.424,.326],[1.168,.388,.303],[1.396,.284,.247],[1.481,.239,.207]],15179884,{sides:18,power:.88}),P_(o);for(let d of[-1,1])o.ell(i===1?6636855:10036792,[d*.95,1,-.035],[.32,.13,.37],[0,0,-d*.32],"lacquer"),o.add(nn([[d*.71,1.12,.08],[d*.91,1.115,.17],[d*1.12,1.015,.18]],.029),16170081);for(let d=0;d<3;d++)o.box([15905357,4630974,13061177][d],[.64+.082*d,.62,.528],[.07,.067,.027],me,"metal");o.attach(a,e);let l=Sn(a,0,1.413,.034);l.scale.set(1.24,1.08,1.17),L_(l,e,i);let c=[Ed(a,-1,e),Ed(a,1,e)],h=Ae.clamp,f=(d,p,v)=>Ae.smoothstep(v,d,p);function u({time:d=0,run:p=0,slam:v=0,hit:g=0,defeat:m=0}={}){let _=d*6.48,S=f(.02,.53,v)*(1-f(.59,.79,v)),y=f(.58,.78,v)*(1-f(.88,1,v)),A=1-h(S+y,0,1),T=p*A;s.rotation.x=Math.sin(_)*.28*T+y*.28,r.rotation.x=-Math.sin(_)*.28*T+y*.28,s.position.y=r.position.y=1.68+y*.055,n.position.y=Math.abs(Math.sin(_))*.057*T+S*.11,a.position.y=1.9-y*.7,a.rotation.x=-S*.17+y*.73-g*.034,a.rotation.z=Math.sin(_)*.025*T,l.rotation.x=S*.19-y*.36,l.rotation.y=Math.sin(_*.5)*.049*T;for(let M=0;M<c.length;M++){let C=M===0?-1:1;c[M].shoulder.rotation.x=C*Math.sin(_)*.17*T-S*2.43-y*.94,c[M].shoulder.rotation.z=C*(.041+.26*S-.065*y),c[M].elbow.rotation.x=-.105-S*.71-y*.09}if(m>0){let M=f(.12,.53,m),C=f(.83,1.23,m);a.position.y-=.42*M,a.rotation.z-=.19*M,l.rotation.x+=.27*M;for(let[I,w]of c.entries())w.shoulder.rotation.z+=(I?1:-1)*(.76*M-.46*C),w.elbow.rotation.x-=.54*M-.32*C;s.rotation.x+=.62*M,r.rotation.x-=.36*M}let x=h(g,0,1);e.cloth.emissive.setRGB(x*.44,x*.31,x*.21),e.lacquer.emissive.setRGB(x*.52,x*.35,x*.21),e.metal.emissive.setRGB(x*.35,x*.31,x*.24)}return{root:t,animate:u}}var Hr=new N;function En(i,t,e,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Hr.copy(t),Hr[n]=0,Hr.normalize();let c=.5*a/(a+o),h=1-Hr.angleTo(i)/l;return Math.sign(Hr[e])===1?h*c:o/(a+o)+c+c*(1-h)}var sl=class i extends _n{constructor(t=1,e=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new N,c=new N,h=new N(t,e,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=f.length/6,v=new N,g=.5/a;for(let m=0,_=0;m<f.length;m+=3,_+=2)switch(l.fromArray(f,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),f[m+0]=h.x*Math.sign(l.x)+c.x*r,f[m+1]=h.y*Math.sign(l.y)+c.y*r,f[m+2]=h.z*Math.sign(l.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:v.set(1,0,0),d[_+0]=En(v,c,"z","y",r,n),d[_+1]=1-En(v,c,"y","z",r,e);break;case 1:v.set(-1,0,0),d[_+0]=1-En(v,c,"z","y",r,n),d[_+1]=1-En(v,c,"y","z",r,e);break;case 2:v.set(0,1,0),d[_+0]=1-En(v,c,"x","z",r,t),d[_+1]=En(v,c,"z","x",r,n);break;case 3:v.set(0,-1,0),d[_+0]=1-En(v,c,"x","z",r,t),d[_+1]=1-En(v,c,"z","x",r,n);break;case 4:v.set(0,0,1),d[_+0]=1-En(v,c,"x","y",r,t),d[_+1]=1-En(v,c,"y","x",r,e);break;case 5:v.set(0,0,-1),d[_+0]=En(v,c,"x","y",r,t),d[_+1]=1-En(v,c,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};var Gc=13.2,Vr=14,Wr=-110,Hi=Vr-Wr,Cs=(Vr+Wr)/2,Rd=-.18;function fn(i,t,e,n=0){return n?new sl(i,t,e,1,n):new _n(i,t,e)}function Ue(i,t,e,n,s,r=null){let a=i.index?i.toNonIndexed():i;a!==i&&i.dispose(),a.deleteAttribute("uv"),r&&a.applyQuaternion(new je().setFromEuler(r)),a.translate(e,n,s);let o=new kt(t),l=a.getAttribute("position").count,c=new Float32Array(l*3);for(let h=0;h<c.length;h+=3)o.toArray(c,h);return a.setAttribute("color",new Le(c,3)),a}function Xr(i){let t=Gr(i,!1);for(let e of i)e.dispose();return t}function D_(){let i=document.createElement("canvas");i.width=256,i.height=192;let t=i.getContext("2d"),e=t.createImageData(i.width,i.height),n=941;for(let r=0;r<i.height;r++)for(let a=0;a<i.width;a++){n=Math.imul(1664525,n)+1013904223>>>0;let o=(n/4294967296-.5)*3,l=Math.min(a,i.width-1-a),c=o-Math.max(0,1-l/4)*12,h=(r*i.width+a)*4;e.data[h]=189+c,e.data[h+1]=179+c,e.data[h+2]=188+c,e.data[h+3]=255}t.putImageData(e,0,0);let s=new xn(i);return s.colorSpace=Ee,s.wrapT=cs,s.repeat.y=Hi/8,s}function N_(i){let t=D_(),e=new ye(new Ye(Gc,Hi),new vr({map:t}));e.rotation.x=-Math.PI/2,e.position.set(0,0,Cs),e.receiveShadow=!0,i.add(e);let n=[Ue(fn(Gc+.13,.38,Hi),"#535568",0,-.205,Cs)];for(let r of[-1,1]){let a=r*Gc/2;n.push(Ue(fn(.13,.19,Hi),"#7c7b8a",a,.018,Cs)),n.push(Ue(fn(.095,.042,Hi),"#a6a1af",a+r*.01,.121,Cs)),n.push(Ue(fn(.055,.22,Hi),"#444759",a+r*.074,-.14,Cs)),n.push(Ue(fn(.048,.022,Hi),"#8b8391",a-r*.085,.006,Cs))}let s=new ye(Xr(n),new Ze({vertexColors:!0,shininess:18}));return i.add(s),t}function U_(i){let t=i==="merge",e=document.createElement("canvas");e.width=t?512:384,e.height=208;let n=e.getContext("2d"),s=e.width,r=e.height,a=n.createLinearGradient(0,0,0,r);a.addColorStop(0,t?"#ffe749":"#40afff"),a.addColorStop(.1,t?"#ffdd22":"#269bfa"),a.addColorStop(.68,t?"#ffd419":"#178cf0"),a.addColorStop(1,t?"#efbb09":"#1276d7"),n.fillStyle=a,n.fillRect(0,0,s,r);let o=t?"\u5347\u70AE":"+1",l=t?122:147;n.font=`900 ${l}px "Arial Rounded MT Bold", "Arial Black", "Helvetica Neue", Arial, sans-serif`,n.textAlign="center",n.lineJoin="round",n.lineCap="round";let c=n.measureText(o),h=r/2+(c.actualBoundingBoxAscent-c.actualBoundingBoxDescent)/2;n.translate(s/2,h+1),n.scale(Math.min(1.25,s*(t?.8:.63)/c.width),1),n.lineWidth=t?15:18,n.strokeStyle="#17212b",n.strokeText(o,0,0),n.fillStyle="#ffffff",n.fillText(o,0,0);let f=new xn(e);return f.colorSpace=Ee,f.anisotropy=4,f}function Pd(i,t){let e=[],n=[];function s(a,o,l,c,h,f,u,d){let p=l/2,v=[[-p,0],[p,0],[p+h,-c],[-p+h,-c]],g=[[-p+d,-d],[p-d,-d],[p+h-d,-c+d],[-p+h+d,-c+d]],m=[...v,...g],_=[0,0,0,0,f,f,u,u],S=[4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7];for(let y of S){let A=m[y];e.push(a+A[0],.008,o+A[1]),n.push(1,1,1,_[y])}}s(0,.1,i*1.01,t*.87,t*.92,.32,.22,.045),s(0,.17,i+.06,.32,.028,.2,.16,.07);let r=new ve;return r.setAttribute("position",new qt(e,3)),r.setAttribute("color",new qt(n,4)),r}function Cd(i,t,e){let n=t==="merge",s=n?2.65:1.82,r=n?1.03:.91,a=.17,o=n?"#ffd526":"#2095ef",l=n?"#e8aa10":"#1e76ce",c=n?"#ffe663":"#55b4ff",h=[],f=[Ue(fn(s-.1,r,a,.047),o,0,r/2,0)];for(let A of[-1,1]){let T=A*(s/2-.046);f.push(Ue(fn(.085,r+.087,.205),c,T,r/2+.021,0)),h.push(Ue(fn(.16,.115,.33),l,T,.057,.058))}f.push(Ue(fn(s-.16,.047,.123),c,0,r-.012,-.003));let u=Xr(f);u.rotateX(Rd),u.translate(0,.059,.015);let d=Xr([u,...h]),p=new Ye(s-.19,r-.086);p.translate(0,r/2+.007,a/2+.004),p.rotateX(Rd),p.translate(0,.059,.015);let v=[d,p,Pd(s,r)],g=[new Ze({vertexColors:!0,shininess:52,specular:6511457}),new rn({map:U_(t),toneMapped:!1}),e],m=128,_,S=new he;function y(A){if(_)for(let T of _)i.remove(T),T.dispose();m=A,_=v.map((T,x)=>{let M=new Bn(T,g[x],m);return M.count=0,M.frustumCulled=!1,x===2&&(M.renderOrder=1),i.add(M),M}),_[0].instanceMatrix.setUsage(Mn);for(let T of _.slice(1))T.instanceMatrix=_[0].instanceMatrix}return y(m),A=>{let T=0;for(let M of A)(M.active||M.pop<.28)&&M.type===t&&M.z>=Wr&&M.z<Vr&&T++;T>m&&y(Ae.ceilPowerOfTwo(T));let x=0;for(let M of A){if(!M.active&&!(M.pop<.28)||M.type!==t||M.z<Wr||M.z>=Vr)continue;let C=M.active?0:M.pop/.28,I=(1+.24*Math.sin(Math.PI*C))*(1-C*C);S.makeScale(I,I*(1+.18*Math.sin(C*Math.PI)),I),S.setPosition(M.x+.22*(M.x<0?1:-1)*C,Math.sin(C*Math.PI)*.38,M.z),_[0].setMatrixAt(x++,S)}for(let M of _)M.count=x;_[0].instanceMatrix.needsUpdate=x>0}}function Id(i,t){let e=new _s;return i.forEach(([n,s],r)=>r?e.lineTo(n,s):e.moveTo(n,s)),e.closePath(),new pr(e,{depth:t,bevelEnabled:!0,bevelSegments:1,bevelSize:.033,bevelThickness:.03,steps:1})}var F_=[[[[-.72,1.01],[-1.01,1.09],[-1.19,1.01],[-1.41,1.17]],[[-1.01,1.09],[-.93,1.24],[-1.02,1.39],[-.89,1.56]],[[-1.19,1.01],[-1.32,.86],[-1.51,.81]]],[[[-1.41,1.17],[-1.59,1.12],[-1.74,1.22],[-1.96,1.2]],[[-.72,1.01],[-.83,.82],[-.69,.66],[-.72,.53],[-.51,.31],[-.58,.15]],[[.48,1.18],[.65,1.33],[.82,1.36],[.95,1.56]],[[.65,1.33],[.72,1.08],[.98,.68],[1.19,.63],[1.38,.43]]],[[[.98,.68],[1.21,.88],[1.41,.8],[1.63,.97],[1.9,.9]],[[1.19,.63],[1.1,.42],[1.2,.31],[1.12,.12]],[[-.72,.53],[-1.03,.51],[-1.21,.37],[-1.47,.4]],[[-1.02,1.39],[-1.29,1.42],[-1.46,1.56]]]];function O_(i){let t=[];for(let e of i)for(let n=1;n<e.length;n++){let[s,r]=e[n-1],[a,o]=e[n],l=Math.hypot(a-s,o-r)+.018,c=new tn(0,0,Math.atan2(o-r,a-s)),h=n===1?.039:.031;t.push(Ue(new Ye(l,h),"#302e39",(s+a)/2,(r+o)/2,.227,c)),t.push(Ue(new Ye(l,h*.38),"#e3dee1",(s+a)/2,(r+o)/2+h*.41,.229,c))}return Xr(t)}function B_(i,t){let e=new sn;i.add(e);let n=4.28,s=1.65,r=[Ue(fn(n-.08,s-.08,.39,.057),"#61616d",0,s/2,0)];for(let u of[-1,1]){let d=u*(n/2-.085);r.push(Ue(fn(.165,s,.47,.038),"#858493",d,s/2,0)),r.push(Ue(fn(.14,s-.12,.032),"#9998a4",d,s/2,.228));for(let p of[.15,s-.16]){let v=new tn(Math.PI/2,0,0);r.push(Ue(new fi(.074,.074,.023,10),"#40414e",d,p,.254,v)),r.push(Ue(new fi(.052,.061,.032,6),"#a9a8af",d,p,.273,v))}}for(let u of[.084,s-.079])r.push(Ue(fn(n-.28,.11,.43,.019),"#898795",0,u,0));let a=[[-.39,.105],[-.11,.105],[-.11,.37],[.11,.37],[.11,.105],[.39,.105],[.39,-.105],[.11,-.105],[.11,-.37],[-.11,-.37],[-.11,-.105],[-.39,-.105]],o=[[-.24,.26],[.025,.43],[.23,.43],[.23,-.43],[-.015,-.43],[-.015,.16],[-.17,.075]];r.push(Ue(Id(a,.115),"#a6a4ab",-.34,.81,.206)),r.push(Ue(Id(o,.115),"#afacb3",.42,.83,.206));let l=new Ze({vertexColors:!0,shininess:36,specular:6841713,emissive:16774637,emissiveIntensity:0});e.add(new ye(Xr(r),l));let c=new ye(Pd(n,s),t);c.renderOrder=1,e.add(c);let h=new rn({vertexColors:!0}),f=F_.map(u=>{let d=new ye(O_(u),h);return e.add(d),d});return u=>{if(e.visible=!!(u&&u.hp>0&&u.z>=Wr&&u.z<Vr),!e.visible)return;e.position.set(u.x,0,u.z);let d=u.hp/Math.max(1,u.maxHp);l.emissiveIntensity=Math.sqrt(Ae.clamp(u.flash||0,0,1))*.82,f[0].visible=d<.93,f[1].visible=d<=.67,f[2].visible=d<=.36}}function Ld(i){let t=new sn;t.name="Course",i.add(t);let e=N_(t),n=new rn({color:3158603,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),s=Cd(t,"merge",n),r=Cd(t,"plus",n),a=B_(t,n);return{update({distance:o=0,gates:l=[],wall:c}){e.offset.y=o/8%1,s(l),r(l),a(c)},dispose(){let o=new Set,l=new Set,c=new Set;t.traverse(h=>{h.isMesh&&(o.add(h.geometry),l.add(h.material),h.material.map&&c.add(h.material.map),h.isInstancedMesh&&h.dispose())}),t.removeFromParent();for(let h of o)h.dispose();for(let h of l)h.dispose();for(let h of c)h.dispose()}}}var Hc=128,Vc=4,Wt={glow:0,smoke:1,glint:2,wave:3,crack:4,plus:5,arrow:6,flash:7,goldWave:8,ember:9};function z_(){let i=document.createElement("canvas");i.width=i.height=Hc*Vc;let t=i.getContext("2d");function e(a,o){t.save(),t.translate((a%Vc+.5)*Hc,(Math.floor(a/Vc)+.5)*Hc),o(),t.restore()}function n(a,o,l,c){let h=t.createRadialGradient(a,o,0,a,o,l);for(let[f,u]of c)h.addColorStop(f,u);t.fillStyle=h,t.fillRect(a-l,o-l,l*2,l*2)}let s="rgba(255,255,255,0)";e(Wt.glow,()=>{n(0,0,57,[[0,"#fff"],[.18,"rgba(255,255,255,.94)"],[.43,"rgba(255,255,255,.41)"],[1,s]])}),e(Wt.smoke,()=>{let a=[[-14,8,37],[18,8,32],[9,-13,32],[-15,-13,27],[3,3,40]];for(let[o,l,c]of a)n(o,l,c,[[0,"rgba(255,255,255,.62)"],[.38,"rgba(255,255,255,.42)"],[.77,"rgba(255,255,255,.13)"],[1,s]])}),e(Wt.glint,()=>{n(0,0,44,[[0,"#fff"],[.16,"rgba(255,255,255,.9)"],[1,s]]),t.fillStyle="#fff",t.beginPath();for(let a=0;a<8;a++){let o=a*Math.PI/4,l=a%2?5:a%4?45:32,c=Math.cos(o)*l,h=Math.sin(o)*l;a===0?t.moveTo(c,h):t.lineTo(c,h)}t.closePath(),t.fill()}),e(Wt.wave,()=>{n(0,0,60,[[0,s],[.7,s],[.78,"rgba(255,255,255,.26)"],[.86,"rgba(255,255,255,.94)"],[.9,"rgba(255,255,255,.60)"],[1,s]])}),e(Wt.goldWave,()=>{n(0,0,58,[[0,"rgba(255,255,255,.25)"],[.41,"rgba(255,255,255,.08)"],[.66,s],[.81,"rgba(255,255,255,.18)"],[.88,"#fff"],[.92,"rgba(255,255,255,.65)"],[1,s]])}),e(Wt.crack,()=>{n(0,0,40,[[0,"#c14d0d"],[.19,"rgba(158,63,22,.9)"],[.62,"rgba(80,52,51,.24)"],[1,"rgba(80,52,51,0)"]]);let a=783,o=()=>(a=a*16807%2147483647,a/2147483647);t.lineCap="round",t.lineJoin="round";for(let l=0;l<11;l++){let c=(l+o()*.55)*2*Math.PI/11,h=31+o()*29,f=0,u=0;for(let d=1;d<=4;d++){let p=c+(o()-.5)*.23,v=h*d/4,g=Math.cos(p)*v,m=Math.sin(p)*v;if(t.beginPath(),t.moveTo(f,u),t.lineTo(g,m),t.lineWidth=(5-d)*.62+.35,t.strokeStyle=d===1?"#793714":"#493e41",t.stroke(),d===2||d===3){let _=p+(o()>.5?.65:-.66);t.beginPath(),t.moveTo(g,m),t.lineTo(g+Math.cos(_)*9,m+Math.sin(_)*9),t.lineWidth=1,t.stroke()}f=g,u=m}}t.beginPath();for(let l=0;l<15;l++){let c=l*Math.PI*2/15,h=5+o()*10,f=Math.cos(c)*h,u=Math.sin(c)*h;l?t.lineTo(f,u):t.moveTo(f,u)}t.closePath(),t.fillStyle="#ff9021",t.fill()}),e(Wt.plus,()=>{t.font="1000 80px Arial Black, Arial, sans-serif",t.textAlign="center",t.textBaseline="middle",t.lineJoin="round",t.strokeStyle="#754508",t.lineWidth=9,t.strokeText("+1",0,6,110),t.strokeStyle="#422916",t.lineWidth=6.5,t.strokeText("+1",0,2,110);let a=t.createLinearGradient(0,-28,0,32);a.addColorStop(0,"#fff592"),a.addColorStop(.31,"#fff020"),a.addColorStop(1,"#ffbe00"),t.fillStyle=a,t.fillText("+1",0,2,110)}),e(Wt.arrow,()=>{t.shadowColor="#00baff",t.shadowBlur=9,t.beginPath(),t.moveTo(0,-47),t.lineTo(35,-7),t.lineTo(16,-7),t.lineTo(16,40),t.lineTo(-16,40),t.lineTo(-16,-7),t.lineTo(-35,-7),t.closePath();let a=t.createLinearGradient(0,-45,0,40);a.addColorStop(0,"#f2ffff"),a.addColorStop(.45,"#67fff4"),a.addColorStop(1,"rgba(10,201,255,.38)"),t.fillStyle=a,t.fill(),t.shadowBlur=0,t.lineWidth=2,t.strokeStyle="rgba(227,255,255,.82)",t.stroke()}),e(Wt.flash,()=>{n(0,0,58,[[0,"#fff"],[.21,"#fff"],[.36,"rgba(255,255,255,.85)"],[.71,"rgba(255,255,255,.18)"],[1,s]]);for(let a=0;a<9;a++){let o=a*Math.PI*2/9+.2,l=a%3===1?48:31;t.save(),t.rotate(o),t.beginPath(),t.moveTo(8,-4.2),t.lineTo(l,0),t.lineTo(8,4.2),t.closePath(),t.fillStyle="rgba(255,255,255,.76)",t.fill(),t.restore()}}),e(Wt.ember,()=>{t.save(),t.scale(.45,1),n(0,0,53,[[0,"#fff"],[.37,"#fff"],[.65,"rgba(255,255,255,.58)"],[1,s]]),t.restore()});let r=new xn(i);return r.colorSpace=Ee,r}function k_(i,t){let e=new Ye(1,1),n=new Ui;n.setIndex(e.index),n.setAttribute("position",e.getAttribute("position")),n.setAttribute("uv",e.getAttribute("uv"));let s={};for(let[l,c]of[["anchor",3],["sizeModeTile",4],["tint",4],["rotation",1]]){let h=new gn(new Float32Array(t*c),c);h.setUsage(Mn),n.setAttribute(l,h),s[l]=h}let r=new an({uniforms:{atlas:{value:z_()}},transparent:!0,depthWrite:!1,side:vn,toneMapped:!1,vertexShader:`
      attribute vec3 anchor;
      attribute vec4 sizeModeTile;
      attribute vec4 tint;
      attribute float rotation;
      varying vec2 vUv;
      varying vec4 vTint;
      void main() {
        float c = cos(rotation), s = sin(rotation);
        vec2 p = position.xy * sizeModeTile.xy;
        p = vec2(c*p.x-s*p.y, s*p.x+c*p.y);
        vec4 view = modelViewMatrix * vec4(anchor, 1.0);
        if (sizeModeTile.z > 0.5) {
          view += modelViewMatrix * vec4(p.x, 0.0, -p.y, 0.0);
        } else {
          view.xy += p;
        }
        gl_Position = projectionMatrix * view;
        float frame = sizeModeTile.w;
        vUv = (uv + vec2(mod(frame, 4.0), 3.0-floor(frame/4.0))) * 0.25;
        vTint = tint;
      }`,fragmentShader:`
      uniform sampler2D atlas;
      varying vec2 vUv;
      varying vec4 vTint;
      void main() {
        vec4 pixel = texture2D(atlas, vUv) * vTint;
        if (pixel.a < 0.007) discard;
        gl_FragColor = pixel;
        #include <colorspace_fragment>
      }`});r.forceSinglePass=!0;let a=new ye(n,r);a.frustumCulled=!1,a.renderOrder=8,n.instanceCount=0,i.add(a);let o=0;return{clear(){o=0},write(l,c,h,f,u,d,p,v,g,m=0){o>=t||g<.008||(s.anchor.setXYZ(o,l,c,h),s.sizeModeTile.setXYZW(o,f,u,d?1:0,p),s.tint.setXYZW(o,v.r,v.g,v.b,g),s.rotation.setX(o,m),o++)},flush(){a.visible=o>0,n.instanceCount=o;for(let l of Object.values(s))l.clearUpdateRanges(),o&&l.addUpdateRange(0,o*l.itemSize),l.needsUpdate=!0}}}function Wc(i,t){let e=i.map(([a,o])=>new rt(o,a)),n=new mr(e,t),s=new Float32Array(n.attributes.position.count*3),r=i.map(([,,a])=>new kt(a));for(let a=0;a<n.attributes.position.count;a++)r[a%r.length].toArray(s,a*3);return n.setAttribute("color",new Le(s,3)),n.rotateX(-Math.PI/2),n}function rl(i,t,e,n,s){let r=new Bn(t,e,n);return r.instanceMatrix.setUsage(Mn),r.count=0,r.frustumCulled=!1,r.renderOrder=s,i.add(r),r}var oe=Object.fromEntries(Object.entries({white:"#ffffff",pearl:"#fff5dc",aqua:"#64ffff",blue:"#18ccff",gold:"#ffd02f",orange:"#ff861d",fire:"#ff5a16",dust:"#ece0cd",smoke:"#928180",steel:"#8f99a3"}).map(([i,t])=>[i,new kt(t)])),Dd=["#555c69","#8e97a3","#abb4bc","#727986","#a5a7aa"].map(i=>new kt(i)),le=(i,t)=>i+(t-i)*Math.random(),al=(i,t,e)=>Math.min(e,Math.max(t,i)),yi=Math.PI*2;function Nd(i){let t=k_(i,650),e=rl(i,Wc([[-.33,.004,"#1395ec"],[-.14,.026,"#28d7ff"],[.1,.039,"#b4fbff"],[.24,.025,"#e8ffff"],[.3,.002,"#ebffff"]],7),new rn({vertexColors:!0,toneMapped:!1}),320,3),n=rl(i,Wc([[-.38,.003,"#b9430d"],[-.37,.127,"#dd7117"],[-.31,.18,"#ff9c1a"],[-.25,.19,"#ffc32d"],[-.21,.158,"#ef8d18"],[-.15,.166,"#ffb824"],[.23,.175,"#ffce36"],[.37,.16,"#ffcb2c"],[.48,.117,"#ffdb46"],[.54,.059,"#ffdc56"],[.56,.001,"#fff1a3"]],14),new Ze({vertexColors:!0,emissive:3609856,specular:16772528,shininess:62}),24,3),s=rl(i,Wc([[-1.52,.003,"#ef5615"],[-1.18,.07,"#fc641b"],[-.77,.114,"#ff9f13"],[-.49,.149,"#ffe039"],[-.31,.112,"#fff8af"]],10),new rn({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1}),24,6),r=rl(i,new sr(1,0),new Ze({color:16777215,specular:5660779,shininess:18}),88,2),a=new Pe,o=[],l=[],c=[],h=[],f=5;function u(T,x,M,C,I,w,R,O={}){if(o.length>=260){if(T!==Wt.plus&&T!==Wt.arrow&&T!==Wt.crack)return;let B=o.findIndex(V=>V.tile===Wt.smoke||V.tile===Wt.glint||V.tile===Wt.glow);if(B<0)return;c.push(o[B]),o[B]=o[o.length-1],o.pop()}let L=c.pop()||{};L.tile=T,L.x=x,L.y=M,L.z=C,L.start=I,L.end=w,L.life=R,L.age=0,L.color=O.color||oe.white,L.alpha=O.alpha??1,L.ratio=O.ratio??1,L.vx=O.vx||0,L.vy=O.vy||0,L.vz=O.vz||0,L.gravity=O.gravity||0,L.angle=O.angle||0,L.spin=O.spin||0,L.flat=O.flat||!1,L.world=O.world??!0,L.hold=O.hold??.12,o.push(L)}function d(T,x,M,C,I,w){for(let R=0;R<I;R++){let O=(R+Math.random()*.5)*yi/I,L=le(.12,.42)*C,B=le(.75,2.15)*C;u(Wt.smoke,T+Math.cos(O)*L,x+le(.02,.14),M+Math.sin(O)*L,le(.23,.47)*C,le(.71,1.12)*C,le(.36,.6),{color:w,alpha:le(.4,.63),vx:Math.cos(O)*B,vz:Math.sin(O)*B,vy:le(.35,1.05),spin:le(-1.5,1.5),angle:O})}}function p(T,x,M,C,I){for(let w=0;w<I;w++){let R=(w+Math.random())*yi/I,O=le(1.8,4.3)*C;u(Wt.ember,T,x,M,le(.22,.39)*C,.035,le(.21,.42),{color:w%3?oe.orange:oe.pearl,vx:Math.cos(R)*O,vz:Math.sin(R)*O,vy:le(.8,2.5)*C,gravity:5,angle:R,spin:le(-2,2),ratio:1.7})}}function v(T,x,M,C,I){for(let w=0;w<C&&l.length<r.instanceMatrix.count;w++){let R=h.pop()||{};R.x=T+le(-1.75,1.75)*I,R.y=x+le(.14,.9),R.z=M+le(-.24,.3),R.vx=le(-2.8,2.8),R.vz=le(-1.8,3.5),R.vy=le(2.2,5.2),R.size=le(.085,.245)*I,R.stretch=le(.52,1.65),R.rx=le(-2,2),R.ry=le(-2,2),R.spin=le(2,8),R.age=0,R.life=le(.52,1.04),R.color=Dd[w%Dd.length],l.push(R)}}function g(T,x,M,C,I=1){let w=al(I,.62,2.05);switch(T){case"finisher":p(x,M,C,1.35,16),u(Wt.flash,x,M,C,.65,1.45,.13,{color:oe.pearl});return;case"hit":if(f<1)return;f--,p(x,M,C,.48,3),u(Wt.glint,x,M,C,.26,.47,.105,{color:oe.aqua,angle:le(0,yi)});return;case"muzzle":u(Wt.flash,x,M,C,.47*w,.83*w,.105,{color:oe.pearl,angle:le(0,yi),world:!1}),u(Wt.glow,x,M,C,.82*w,.38*w,.13,{color:oe.orange,alpha:.7,world:!1});return;case"impact":case"slam":{let R=T==="slam",O=w*(R?1.4:1),L=R?.16:Math.max(.17,M*.58);u(Wt.crack,x,.035,C,2.02*O,2.33*O,R?2:1.42,{flat:!0,angle:le(0,yi),hold:.62}),u(Wt.wave,x,.065,C,.42*O,(R?4:3.16)*O,.32,{flat:!0,color:R?oe.gold:oe.pearl,alpha:.83}),u(Wt.flash,x,L,C,.6*O,1.85*O,.16,{color:oe.gold,angle:le(0,yi)}),u(Wt.glow,x,L+.06,C,.39*O,.93*O,.1,{color:oe.pearl}),d(x,.17,C,O,R?12:7,R?oe.dust:oe.smoke),p(x,L,C,O,R?10:5);return}case"wallHit":u(Wt.flash,x,Math.max(M,.4),C+.12,.38*w,1.12*w,.13,{color:oe.pearl}),d(x,Math.max(.35,M),C,.61*w,3,oe.steel),p(x,Math.max(.4,M),C,.59*w,3);return;case"wallBreak":v(x,.24,C,22,Math.min(1.17,w)),u(Wt.flash,x,.72,C,.85*w,2.8*w,.19,{color:oe.pearl}),u(Wt.wave,x,.062,C,.6,4.7,.38,{flat:!0,color:oe.dust});for(let R=-1;R<=1;R++)d(x+R*1.17,.3,C,.98,4,oe.steel);p(x,.8,C,w,7);return;case"plus":{u(Wt.wave,x,.09,C,.12,1.28,.23,{flat:!0,color:oe.aqua});let R=Math.max(0,M);u(Wt.goldWave,x,.055,C,.22,.96,.34,{flat:!0,world:!1,color:oe.gold}),u(Wt.glow,x,R+.36,C,.45,.82,.28,{ratio:1.75,world:!1,color:oe.gold}),u(Wt.glint,x+.08,R+.57,C,.35,.14,.23,{world:!1,color:oe.pearl}),u(Wt.plus,x+le(-.13,.13),R+.83,C,.8,1.04,.65,{world:!1,vy:1.1,hold:.62});return}case"merge":{u(Wt.goldWave,x,.12,C,2.15,.32,.27,{flat:!0,color:oe.gold});let R=al(w*1.55,1.5,2.5);u(Wt.goldWave,x,.061,C,.38,R,.46,{flat:!0,world:!1,color:oe.aqua,hold:.3}),u(Wt.goldWave,x,.077,C,.17,R*.72,.38,{flat:!0,world:!1,color:oe.gold}),u(Wt.glow,x,M+.62,C,.77*w,1.6*w,.32,{color:oe.gold,world:!1,ratio:1.3,alpha:.72});for(let O=0;O<3;O++){let L=(O+.16)*yi/3;u(Wt.arrow,x+Math.cos(L)*R*.31,M+.3,C+Math.sin(L)*R*.34,.38,.65,.51+O*.035,{color:oe.white,hold:.42,vy:1.55+.15*O,world:!1})}return}case"victory":u(Wt.goldWave,x,.07,C,.5,5.2*w,.71,{flat:!0,color:oe.gold}),u(Wt.flash,x,M+.3,C,.6,2.8*w,.24,{color:oe.pearl}),p(x,M+.6,C,1.6*w,19),d(x,.25,C,1.4,8,oe.dust);return}}let m=new N(0,0,-1),_=new N;function S(T,x){let M=0,C=0;a.rotation.set(0,0,0);for(let I of T)if(_.set(I.dirX,I.dirY,I.dirZ),a.quaternion.setFromUnitVectors(m,_),I.kind==="shot"){if(M>=e.instanceMatrix.count)continue;a.position.set(I.x,I.y,I.z),a.scale.set(1.22,1.22,1.55),a.updateMatrix(),e.setMatrixAt(M++,a.matrix),t.write(I.x-_.x*.12,I.y-_.y*.12,I.z-_.z*.12,.155,.92,!0,Wt.glow,oe.blue,.66)}else if(I.kind==="rocket"&&C<n.instanceMatrix.count){let w=Math.min(1.54,1+.045*Math.sqrt(Math.max(0,I.power||0))),R=I.age||0;a.position.set(I.x,I.y,I.z),a.scale.setScalar(w),a.updateMatrix(),n.setMatrixAt(C,a.matrix),a.scale.z*=.91+.11*Math.sin(R*67),a.updateMatrix(),s.setMatrixAt(C++,a.matrix),t.write(I.x-_.x*.73*w,I.y-_.y*.73*w,I.z-_.z*.73*w,.7*w,1.9*w,!0,Wt.glow,oe.orange,.64),x>0&&Math.floor(R*14)!==Math.floor(Math.max(0,R-x)*14)&&u(Wt.smoke,I.x-_.x*w+le(-.1,.1),I.y-_.y*w,I.z-_.z*w,.22*w,.57*w,.29,{color:oe.smoke,alpha:.39,vy:.16,vz:.47,angle:le(0,yi)})}e.count=M,n.count=s.count=C,e.visible=M>0,n.visible=s.visible=C>0,M&&(e.instanceMatrix.needsUpdate=!0),C&&(n.instanceMatrix.needsUpdate=!0,s.instanceMatrix.needsUpdate=!0)}function y(T,x,M){let C=al(T,0,.12);f=Math.min(6,f+C*21),t.clear(),S(M,C);for(let w=o.length-1;w>=0;w--){let R=o[w];if(R.age+=C,R.age>=R.life){c.push(R),o[w]=o[o.length-1],o.pop();continue}R.x+=R.vx*C,R.y+=R.vy*C,R.z+=R.vz*C+(R.world?x:0),R.vy-=R.gravity*C,R.angle+=R.spin*C}for(let w=0;w<2;w++)for(let R of o){if((R.tile===Wt.plus||R.tile===Wt.arrow)!==(w===1))continue;let L=R.age/R.life,B=1-(1-L)*(1-L),V=Ae.lerp(R.start,R.end,B),H=1-al((L-R.hold)/(1-R.hold),0,1);t.write(R.x,R.y,R.z,V,V*R.ratio,R.flat,R.tile,R.color,R.alpha*H,R.angle)}t.flush();let I=0;for(let w=l.length-1;w>=0;w--){let R=l[w];if(R.age+=C,R.age>=R.life){h.push(R),l[w]=l[l.length-1],l.pop();continue}R.x+=R.vx*C,R.z+=R.vz*C+x,R.y+=R.vy*C,R.vy-=11*C,R.y<R.size*.4&&(R.y=R.size*.4,R.vy=Math.abs(R.vy)*.22,R.vx*=.78,R.vz*=.78);let O=Math.min(1,(R.life-R.age)*5);a.position.set(R.x,R.y,R.z),a.rotation.set(R.rx+R.age*R.spin,R.ry-R.age*R.spin*.56,R.age*R.spin*.77),a.scale.set(R.size*R.stretch*O,R.size*.74*O,R.size*O),a.updateMatrix(),r.setMatrixAt(I,a.matrix),r.setColorAt(I++,R.color)}r.count=I,r.visible=I>0,I&&(r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0)}function A(){c.push(...o),h.push(...l),o.length=l.length=0,f=5;for(let T of[e,n,s,r])T.count=0,T.visible=!1;t.clear(),t.flush()}return A(),{update:y,burst:g,reset:A}}var Ud={ally:{width:.475,height:.86,pivot:.5,pad:.008,capacity:180,grid:[3,5]},captain:{width:1.13,height:1.73,pivot:.43,pad:.009,capacity:1,grid:[13,16]},grunt:{width:.515,height:.86,pivot:.5,pad:.011,capacity:1800,grid:[3,5]},boss:{width:3.94,height:4.7,pivot:.5,pad:.01,capacity:1,grid:[8,10]}},qr=Ae.clamp,Yr=Ae.smoothstep,G_=`
  attribute vec3 anchor;
  attribute vec2 dimensions;
  attribute vec4 motion;
  attribute vec4 treatment;
  uniform vec3 cameraRight;
  uniform vec3 cameraLift;
  uniform float pivot;
  uniform float padding;
  #ifdef BOSS
    attribute float piece;
    vec2 turnAt(vec2 p, vec2 hinge, float angle) {
      float c=cos(angle), s=sin(angle); p-=hinge;
      return hinge + vec2(c*p.x-s*p.y,s*p.x+c*p.y);
    }
  #endif
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    imageUv = uv;
    #ifdef BOSS
      imageUv = (uv+vec2(mod(piece,3.0),1.0-floor(piece/3.0)))/vec2(3.0,2.0);
      bool posing = motion.w > 0.001;
      if ((posing && piece < 0.5) || (!posing && piece > 0.5)) {
        gl_Position=vec4(2.0,2.0,2.0,1.0);
        return;
      }
    #endif
    colorTreatment = treatment.xyz;
    vec2 point = vec2(uv.x - pivot, (uv.y-padding)/(1.0-2.0*padding));
    float stride = sin(motion.x), run = motion.y;
    float legs = 1.0-smoothstep(0.08, 0.38, uv.y);
    float sideSign = smoothstep(pivot-0.05, pivot+0.05, uv.x)*2.0-1.0;
    point.x += run * stride * (0.023*legs + 0.014*uv.y);
    point.y += run * (0.048*max(0.0, sideSign*stride)*legs + 0.013*stride*stride*uv.y);
    point.x += treatment.w*uv.y;
    #ifdef CAPTAIN
      float barrel = smoothstep(0.53,0.78,uv.x)*smoothstep(0.40,0.62,uv.y);
      point.y -= (barrel*0.093+uv.y*0.017)*motion.w;
      point.x += barrel*motion.w*0.023;
    #endif
    point *= dimensions;
    #ifdef BOSS
      float wind = smoothstep(0.02,0.53,motion.w)*(1.0-smoothstep(0.59,0.78,motion.w));
      float impact = smoothstep(0.59,0.78,motion.w)*(1.0-smoothstep(0.89,1.0,motion.w));
      if (piece > 1.5) {
        float side = piece<3.5 ? -1.0 : 1.0;
        vec2 shoulder = vec2(side<0.0 ? 0.211 : 0.795,0.727);
        vec2 elbow = vec2(side<0.0 ? 0.122 : 0.858,side<0.0 ? 0.50 : 0.493);
        shoulder.x-=pivot; elbow.x-=pivot;
        if (piece==3.0 || piece==5.0) {
          point=turnAt(point,elbow*dimensions,side*(0.87*wind-0.10*impact));
        }
        point=turnAt(point,shoulder*dimensions,side*(2.01*wind-0.11*impact));
      }
      point.x *= 1.0+impact*0.072;
      point.y *= 1.0+wind*0.049-impact*0.235;
    #endif
    float angle = motion.z, c = cos(angle), s = sin(angle);
    // A falling unit tumbles around the waist. Upright runners remain boot-anchored.
    vec2 center = vec2(0.0,dimensions.y*0.42);
    point -= center;
    point = vec2(c*point.x-s*point.y,s*point.x+c*point.y)+center;
    vec3 world = anchor + cameraRight*point.x + cameraLift*point.y;
    gl_Position = projectionMatrix*viewMatrix*vec4(world, 1.0);
    #ifdef BOSS
      float layer = (piece==3.0 || piece==5.0) ? 1.0 : ((piece==2.0 || piece==4.0) ? 2.0 : 3.0);
      gl_Position.z -= layer*0.000020*gl_Position.w;
    #endif
  }
`,H_=`
  uniform sampler2D portrait;
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    vec4 pixel = texture2D(portrait,imageUv);
    // Keep occlusion correct between rows, the hero, fences and fully 3D units.
    // Mild coverage AA retains fine helmet/gun edges at distant mip levels.
    float coverage = smoothstep(0.23,0.70,pixel.a);
    if (coverage < 0.11) discard;
    float luma = dot(pixel.rgb,vec3(0.2126,0.7152,0.0722));
    vec3 ash = vec3(0.13,0.15,0.18) + vec3(0.48,0.48,0.50)*luma;
    vec3 rgb = mix(pixel.rgb,ash,colorTreatment.z);
    vec3 gold = vec3(1.0,0.40,0.012)+vec3(0.20,0.5,0.36)*luma;
    rgb = mix(rgb,gold,colorTreatment.x);
    vec3 highlight = mix(vec3(0.60,0.66,0.70),vec3(1.0,0.98,0.88),sqrt(clamp(luma,0.0,1.0)));
    rgb = mix(rgb,highlight,min(colorTreatment.y,0.75));
    gl_FragColor = vec4(rgb,coverage);
    #include <colorspace_fragment>
  }
`;function V_(i){let e=document.createElement("canvas");e.width=448*3,e.height=448*2;let n=e.getContext("2d");function s(v){let g=new Path2D;g.moveTo(...v[0]);for(let m=1;m<v.length;m++)g.lineTo(...v[m]);return g.closePath(),g}let r=s([[-2,-2],[80,-2],[82,99],[90,127],[102,148],[115,162],[123,190],[128,226],[135,245],[125,262],[110,277],[101,296],[118,305],[136,329],[140,362],[127,392],[104,418],[-2,424]]),a=s([[429,-2],[514,-2],[514,425],[381,425],[351,398],[337,369],[344,342],[355,324],[372,310],[385,299],[373,289],[363,273],[360,257],[366,234],[374,205],[385,176],[398,148],[412,120]]),o=s([[-2,225],[12,235],[43,253],[77,266],[111,273],[128,258],[143,244],[146,514],[-2,514]]),l=s([[345,279],[366,264],[390,253],[415,248],[438,247],[461,251],[483,263],[496,277],[514,288],[514,514],[345,514]]),c=i.image;function h(v,g){n.save(),n.translate(v%3*448,Math.floor(v/3)*448),n.scale(448/512,448/512),n.beginPath(),n.rect(0,0,512,512),n.clip(),g(),n.restore()}function f(v,g,m,_,S,y){let A=n.createRadialGradient(v-m*.25,g-_*.27,1,v,g,Math.max(m,_));A.addColorStop(0,S),A.addColorStop(1,y),n.fillStyle=A,n.beginPath(),n.ellipse(v,g,m,_,0,0,2*Math.PI),n.fill()}let u=()=>n.drawImage(c,0,0,512,512);h(0,u),h(1,()=>{u(),n.globalCompositeOperation="destination-out",n.fill(r),n.fill(a),n.globalCompositeOperation="destination-over",f(110,145,29,32,"#eb3a31","#9c201d"),f(404,146,28,32,"#e2352f","#9d211e")});function d(v,g,m,_,S,y){h(v,()=>{_?(f(S,y,23,23,"#ed9a60","#b85b34"),n.clip(g),n.clip(m),u()):(n.clip(g),u(),n.globalCompositeOperation="destination-out",n.fill(m),n.globalCompositeOperation="destination-over",f(S,y-4,25,18,"#e3392e","#a5221e"))})}d(2,r,o,!1,62,256),d(3,r,o,!0,62,256),d(4,a,l,!1,439,260),d(5,a,l,!0,439,260);let p=new xn(e);return i.dispose(),p}function W_(){let i=[],t=[],e=[],n=[],s=[[0,0,0,1,1],[3,0,.16,.3,.58],[5,.65,.12,1,.58],[2,0,.44,.31,.86],[4,.68,.41,1,.86],[1,.14,0,.86,1]];for(let[a,o,l,c,h]of s){let d=e.length;for(let p=0;p<=10;p++)for(let v=0;v<=8;v++){let g=o+(c-o)*v/8,m=l+(h-l)*p/10;if(i.push(g-.5,m-.5,0),t.push(g,m),e.push(a),v===8||p===10)continue;let _=d+p*9+v,S=_+1,y=_+8+1,A=y+1;n.push(_,S,y,S,A,y)}}let r=new ve;return r.setIndex(n),r.setAttribute("position",new qt(i,3)),r.setAttribute("uv",new qt(t,2)),r.setAttribute("piece",new qt(e,1)),r}function X_(i,t,e,n,s){let r=Ud[t],a=t==="boss"?W_():new Ye(1,1,...r.grid);t==="boss"&&(e=V_(e));let o=new Ui().copy(a),l={};for(let[u,d]of[["anchor",3],["dimensions",2],["motion",4],["treatment",4]]){let p=new gn(new Float32Array(r.capacity*d),d);p.setUsage(Mn),l[u]=p,o.setAttribute(u,p)}o.instanceCount=0,e.colorSpace=Ee,e.magFilter=Ge,e.minFilter=In,e.generateMipmaps=!0;let c=new an({uniforms:{portrait:{value:e},cameraRight:{value:n},cameraLift:{value:s},pivot:{value:r.pivot},padding:{value:r.pad}},defines:t==="boss"?{BOSS:1}:t==="captain"?{CAPTAIN:1}:{},vertexShader:G_,fragmentShader:H_,depthWrite:!0,transparent:!1,toneMapped:!1,alphaToCoverage:!0}),h=new ye(o,c);h.name=`AI ${t}`,h.visible=!1,h.frustumCulled=!1,i.add(h);let f=0;return{begin(){f=0},clear(){f=0,o.instanceCount=0,h.visible=!1},add(u,d,p,v,g,m,_,S=0,y=0,A=0,T=0,x=0,M=0){f>=r.capacity||v<=.001||g<=.001||(l.anchor.setXYZ(f,u,d,p),l.dimensions.setXY(f,r.width*v,r.height*g),l.motion.setXYZW(f,m,_,S,y),l.treatment.setXYZW(f,A,T,x,M),f++)},flush(){if(o.instanceCount=f,h.visible=f>0,!!f)for(let u of Object.values(l))u.clearUpdateRanges(),u.addUpdateRange(0,f*u.itemSize),u.needsUpdate=!0}}}async function Fd(i){let t=new Mr,e=Object.keys(Ud),n=await Promise.allSettled(e.map(u=>t.loadAsync(`./art/${u}.webp`))),s=n.find(u=>u.status==="rejected");if(s){for(let u of n)u.status==="fulfilled"&&u.value.dispose();throw new Error("\u89D2\u8272\u63D2\u753B\u52A0\u8F7D\u5931\u8D25",{cause:s.reason})}let r=new N,a=new N,o=new N,l=Object.fromEntries(e.map((u,d)=>[u,X_(i,u,n[d].value,r,a)])),c=Object.values(l),h=()=>c.forEach(u=>u.clear());function f(u,d,p,v){if(v!=="ai"&&v!=="hybrid"){h();return}for(let S of c)S.begin();d.updateWorldMatrix(!0,!1),r.setFromMatrixColumn(d.matrixWorld,0),r.y=0,r.normalize(),o.setFromMatrixColumn(d.matrixWorld,1),a.set(0,1,0).lerp(o,.42).normalize();let g=v==="ai",m=u.phase==="ready"?.3:u.playing?1:0,_=p*9.2;if(g)for(let S of u.columns)for(let y of S.units)y.alive&&l.grunt.add(y.x,0,y.z,y.size,y.size,_+y.phase,m);for(let S of u.runners)S.alive&&l.grunt.add(S.x,0,S.z,S.size,S.size,_*1.13+S.phase,m);for(let S of u.allies){let y=qr(S.age/.32,0,1),A=.81+.19*y+.095*Math.sin(y*Math.PI);l.ally.add(S.x,.035*Math.sin(y*Math.PI),S.z,A,A,_+S.phase,m,0,0,.8*(1-y),.22*(1-y))}for(let S of u.merging){let y=qr(S.t/.32,0,1),A=Yr(y,0,1),T=1-.85*A;l.ally.add(Ae.lerp(S.x,u.x,A),.5*Math.sin(y*Math.PI),S.z*(1-A),T,T,_+S.phase,.25,.23*Math.sin(y*Math.PI),0,.15+.7*y,.22+.37*y)}if(g){for(let y of u.falling){let A=qr(y.t/1.02,0,1),T=y.size*(1-Yr(A,.78,1)),x=y.roll*y.t+.16*Math.sin(y.spin*y.t);(y.side==="red"?l.grunt:l.ally).add(y.x,y.y,y.z,T,T,_+y.phase,0,x,0,0,.64*(1-Yr(A,.04,.31)),.72*Yr(A,.05,.31))}if(u.phase!=="lost"||u.endTime<.25){let y=u.visualScale,A=u.phase==="lost"?qr(u.endTime/.25,0,1):0;l.captain.add(u.x,0,u.captainZ,y,y*(1-.55*A),_*.83,m,-.38*A,u.recoil,.66*u.mergeGlow,.14*u.mergeGlow+.48*u.hurt+.32*A,0,qr(u.velocity*.007,-.095,.095))}let S=u.boss;if(u.round%3===0){let y=u.phase==="won"?Yr(u.endTime,.25,.92):0,A=1;l.boss.add(S.x,0,S.z,(1+.12*y)*A,(1-.62*y)*A,p*6.35,m*(S.active?.65:.16)*(1-S.slam),-.97*y,S.slam,0,.54*S.hit,.5*y)}}for(let S of c)S.flush()}return{draw:f,clear:h}}var Hn=new Pe,Bd={value:0},zd={value:1};function Xc(i,t,e,n){let s=wd(t,e),r=new gn(new Float32Array(n),1).setUsage(Mn);s.setAttribute("unitGlow",r);let a=new Ze({vertexColors:!0,shininess:37,specular:3225412});a.onBeforeCompile=c=>{c.uniforms.walkTime=Bd,c.uniforms.gaitAmount=zd,c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
attribute float unitGlow; varying float vGlow; uniform float walkTime; uniform float gaitAmount;`).replace("#include <begin_vertex>",`#include <begin_vertex>
      vGlow=unitGlow; float phase=walkTime*10.2 + float(gl_InstanceID)*2.39996;
      float gait=sin(phase + (position.x<0.0 ? 3.14159 : 0.0));
      float foot=(1.0-smoothstep(0.14,0.39,position.y))*gaitAmount;
      transformed.z += gait*.105*foot;
      transformed.y += max(0.0,gait)*.054*foot + abs(sin(phase))*.019*gaitAmount;`),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
varying float vGlow;`).replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(.82,.93,1.0), clamp(-vGlow,0.0,1.0)*.88);
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.72,.18), clamp(vGlow,0.0,1.0)*.94);`)};let o=new Bn(s,a,n);o.count=0,o.frustumCulled=!1,o.instanceMatrix.setUsage(Mn),i.add(o);let l=0;return{begin(){l=0},put(c,h,f,u,d=0,p=0,v=0,g=0){l>=n||(Hn.position.set(c,h,f),Hn.rotation.set(p,v,g),Hn.scale.setScalar(u),Hn.updateMatrix(),o.setMatrixAt(l,Hn.matrix),r.setX(l,d),l++)},end(){o.count=l,o.visible=l>0,o.instanceMatrix.needsUpdate=!0,r.needsUpdate=!0}}}function q_(i){let t=document.createElement("canvas");t.width=t.height=64;let e=t.getContext("2d"),n=e.createRadialGradient(30,33,1,32,32,31);n.addColorStop(0,"rgba(22,23,45,.63)"),n.addColorStop(.5,"rgba(24,27,49,.47)"),n.addColorStop(.83,"rgba(32,32,53,.20)"),n.addColorStop(1,"rgba(32,32,53,0)"),e.fillStyle=n,e.fillRect(0,0,64,64);let s=new xn(t);s.colorSpace=Ee;let r=new Ye(1,1);r.rotateX(-Math.PI/2);let a=new Bn(r,new rn({map:s,transparent:!0,depthWrite:!1,toneMapped:!1}),1600);a.frustumCulled=!1,a.instanceMatrix.setUsage(Mn),a.renderOrder=1,i.add(a);let o=0;return{begin(){o=0},put(l,c,h,f=1){o>=1600||(Hn.position.set(l+h*.3,.021,c-h*.2),Hn.rotation.set(0,.65,0),Hn.scale.set(h*1.4,.95,h*.79*f),Hn.updateMatrix(),a.setMatrixAt(o++,Hn.matrix))},end(){a.count=o,a.instanceMatrix.needsUpdate=!0}}}function Od(i,t,e,n,s){let r=new gr(t,i,64);r.rotateX(-Math.PI/2);let a=new ye(r,new rn({color:e,transparent:!0,opacity:n,depthWrite:!1,toneMapped:!1}));return a.renderOrder=3,s.add(a),a}function kd(i,t){let e=new tl({canvas:i,antialias:!0,alpha:!0,powerPreference:"high-performance"});e.setClearColor(599616,0),e.outputColorSpace=Ee;let n=new Ks;n.add(new br(16054527,8753847,1.55));let s=new Ms(16772828,2);s.position.set(-8,16,6),n.add(s);let r=new Ms(12839167,.63);r.position.set(7,8,-8),n.add(r);let a=new Qe(41,1,.15,150),o=new N,l=Ad(),c=[kc()];n.add(l.root,c[0].root);let h=Xc(n,"blue","near",180),f=Xc(n,"red","near",900),u=Xc(n,"red","far",1200),d=q_(n),p=Od(.68,.634,6618933,.94,n),v=Od(.72,.606,6749239,.21,n),g=Ld(n),m=Nd(n),_=null,S=Fd(n).then(w=>(_=w,!0)).catch(w=>(console.warn("\u89D2\u8272\u8D34\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u5DF2\u4F7F\u7528 3D \u6A21\u578B",w),!1)),y=-3.72,A=0,T=1,x=1,M=Math.min(devicePixelRatio||1,1.65),C=()=>{T=t.clientWidth,x=t.clientHeight,a.aspect=T/Math.max(1,x),a.fov=Ae.clamp(41+(.54-a.aspect)*27,37,47),a.updateProjectionMatrix(),e.setPixelRatio(M),e.setSize(T,x,!1)};C();function I(w,R,O,L,B){_||(B="3d");let V=w.round%3;c[V]||(c[V]=kc(V),n.add(c[V].root));for(let nt of c)nt&&(nt.root.visible=!1);let H=c[V],et=w.playing,X=B!=="ai",Q=1-Math.exp(-8.5*O),tt=w.phase==="won"?Ae.smoothstep(w.endTime,0,.64):0,Tt=Ae.lerp(w.x*.94,w.boss.x,tt),Ut=(w.boss.z+5.4)*tt;y+=(Tt-y)*Q,A=Math.max(0,A-O*1.75);let Y=Math.sin(R*58)*A*A*.19,_t=Math.sin(R*72)*A*A*.12;a.position.set(y+Y,15+_t-tt*1.2,13.2+Ut),a.lookAt(y+.06+Y,.12,-7.45+Ut),a.updateMatrixWorld(),Bd.value=R,zd.value=et?1:.13,g.update(w),d.begin(),h.begin(),f.begin(),u.begin();for(let nt of w.columns)for(let At of nt.units)!At.alive||At.z<-61||(X&&(At.z<-18?u:f).put(At.x,0,At.z,At.size,0,0,.06*Math.sin(At.phase),0),At.z>=-32&&d.put(At.x,At.z,.64));for(let nt of w.runners)nt.alive&&(B==="3d"&&f.put(nt.x,0,nt.z,nt.size,0,0,.15*Math.sin(nt.phase),0),d.put(nt.x,nt.z,.67));for(let nt of w.allies){let At=1;nt.age<.25&&(At=.55+.45*Math.min(1,nt.age/.15)+Math.sin(Math.PI*Math.min(1,nt.age/.25))*.18),B==="3d"&&h.put(nt.x,0,nt.z,At,Math.max(0,1-nt.age*2.8),0,-w.velocity*.014,0),d.put(nt.x,nt.z,.71*At)}for(let nt of w.merging){let At=Math.min(1,nt.t/.32);B==="3d"&&h.put(Ae.lerp(nt.x,w.x,At),Math.sin(At*Math.PI)*.55,Ae.lerp(nt.z,0,At),1-At*.68,1-At*.28)}for(let nt of w.falling){let At=(nt.size||1)*(1-Math.pow(Math.min(1,nt.t/1.02),4));X&&(nt.side==="red"?f:h).put(nt.x,nt.y,nt.z,At,-Math.max(.39,1-nt.t*.82),nt.spin*nt.t,nt.phase,nt.roll*nt.t),nt.y<2&&d.put(nt.x,nt.z,.64*At)}let bt=w.phase==="lost",Dt=w.phase==="won",xt=w.visualScale;l.root.visible=X&&(!bt||w.endTime<.32),l.root.position.set(w.x,bt?Math.sin(Math.min(1,w.endTime/.33)*Math.PI)*.68:0,w.captainZ),l.root.rotation.set(0,-w.velocity*.018,bt?-w.endTime*5:0),l.root.scale.setScalar(xt*(bt?Math.max(.05,1-w.endTime*2):1)),l.animate({time:R,run:et?.91:.09,recoil:w.recoil,merge:Math.max(w.mergeGlow,w.hurt*.62),lean:Ae.clamp(w.velocity/9,-1,1)}),H.root.visible=X||V!==0;let It=Dt?Ae.smoothstep(w.endTime,.25,.92):0,pe=Dt&&w.endTime>.92?Math.sin((w.endTime-.92)*19)*Math.exp(-9*(w.endTime-.92)):0;H.root.position.set(w.boss.x-.26*It,.27*It+Math.max(0,pe)*.16,w.boss.z-.62*It),H.root.rotation.set(-1.49*It+.13*pe,0,-.3*It),H.animate({time:R,run:et?w.boss.active?.91:.45:.12,slam:w.boss.slam,hit:w.boss.hit,defeat:Dt?w.endTime:0}),bt||d.put(w.x,w.captainZ,1.3*xt),d.put(w.boss.x,w.boss.z-It,3.9,1.12+It*.65);for(let nt of[v,p])nt.visible=!bt,nt.position.set(w.x,.048,w.captainZ),nt.scale.setScalar(xt);d.end(),h.end(),f.end(),u.end(),_&&_.draw(w,a,R,B),m.update(O,L,w.shots),e.render(n,a)}return{draw:I,assets:S,resize:C,project(w,R,O){return o.set(w,R,O).project(a),{x:(o.x+1)*T/2,y:(1-o.y)*x/2}},feedback(w){m.burst(w.kind,w.x,w.y,w.z,w.strength),w.kind==="slam"||w.kind==="wallBreak"||w.kind==="victory"?A=.85:w.kind==="impact"&&(A=Math.max(A,.25))},reset(w){y=w*.94,A=0,m.reset()},lowerResolution(){M<=1||(M=Math.max(1,M-.22),C())}}}var Gd=Math.PI*2,Hd={muzzle:{duration:.25,gain:.33,interval:.18},smallShot:{duration:.08,gain:.076,interval:.105},impact:{duration:.31,gain:.28,interval:.12},wallHit:{duration:.16,gain:.16,interval:.13},wallBreak:{duration:.43,gain:.35,interval:.4},plus:{duration:.22,gain:.18,interval:.105},merge:{duration:.41,gain:.23,interval:.18},slam:{duration:.49,gain:.42,interval:.5},victory:{duration:.79,gain:.28,interval:.7},loss:{duration:.63,gain:.25,interval:.57},hit:{duration:.09,gain:.075,interval:.14}};function Y_(i,t){let e=i.createBuffer(1,Math.ceil(Hd[t].duration*24e3),24e3),n=e.getChannelData(0),s=981273;function r(h,f,u){let d=Math.floor(h*24e3),p=Math.min(n.length,d+Math.ceil(f*24e3)),v=Math.min(.005,f*.1),g=Math.min(.012,f*.16);for(let m=d;m<p;m++){let _=(m-d)/24e3,S=Math.min(1,_/v,(f-_)/g)*Math.exp(-3.35*_/f);n[m]+=u(_/f)*S}}function a(h,f,u,d,p,v=.12){let g=0;r(h,f,m=>{let _=d+(u-d)*(1-m)**3;return g+=Gd*_/24e3,p*(Math.sin(g)+v*Math.sin(2*g+.15))})}function o(h,f,u,d){let p=0,v=0,g=1-Math.exp(-Gd*u/24e3);r(h,f,()=>(s=Math.imul(1664525,s)+1013904223>>>0,p+=g*(s/2147483648-1-p),v+=.014*(p-v),d*(p-v*.65)))}function l(h,f,u,d){a(h,f,u*1.013,u,d,.16),a(h,f*.35,u*2.52,u*2.5,d*.11)}switch(t){case"muzzle":a(0,.2,213,61,.76,.48),o(0,.093,2400,.64),o(.023,.212,580,.57);break;case"smallShot":a(0,.054,1550,580,.33,.1),o(0,.042,3600,.56);break;case"impact":a(0,.23,115,49,.63,.52),o(.004,.25,1050,.89),o(.044,.23,370,.47);break;case"wallHit":o(0,.045,3100,.56),a(0,.124,650,440,.36),a(.008,.14,1050,750,.19);break;case"wallBreak":a(0,.23,174,57,.61,.33),o(0,.27,1970,.96);for(let[h,f]of[[.079,750],[.147,490],[.227,330]])o(h,.045,2850,.41),a(h,.13,f,f*.81,.22);break;case"plus":l(0,.107,622,.56),l(.06,.15,932,.68);break;case"merge":a(0,.24,320,752,.24),l(0,.16,523,.53),l(.075,.19,659,.59),l(.147,.24,988,.68);break;case"slam":o(0,.18,2e3,.78),a(0,.36,167,43,.96,.58),o(.035,.39,520,.84),o(.092,.13,1400,.44);break;case"victory":l(0,.21,523,.54),l(.105,.22,659,.61),l(.205,.25,784,.64),l(.33,.42,1047,.7),l(.34,.4,784,.24);break;case"loss":l(0,.21,392,.57),l(.116,.22,330,.58),a(.246,.35,262,196,.64,.22);break;case"hit":o(0,.061,1290,.58),a(.003,.07,580,280,.24);break}let c=.001;for(let h of n)c=Math.max(c,Math.abs(h));for(let h=0;h<n.length;h++)n[h]*=.89/c;return e}function Vd(){let i,t,e,n,s=!1,r=!1,a=new Map,o=new Map,l=new Set;function c(d){l.delete(d),d.source.onended=null,d.source.disconnect(),d.gain.disconnect()}function h(){for(let d of l)d.source.stop(),c(d);o.clear()}function f(){if(!i)return;let d=i.currentTime;e.gain.cancelScheduledValues(d),e.gain.setTargetAtTime(s&&!r?.8:0,d,.008)}function u(){if(s&&i&&i.state!=="closed")return i.resume().catch(()=>{})}return{unlock(){if(s=!0,!i){let p=window.AudioContext||window.webkitAudioContext;if(!p)return;try{i=new p({latencyHint:"interactive"})}catch{return}t=i.createDynamicsCompressor(),t.threshold.value=-12,t.knee.value=9,t.ratio.value=5,t.attack.value=.004,t.release.value=.12,e=i.createGain(),e.gain.value=0,t.connect(e),e.connect(i.destination)}f();let d=u();return n?n.then(u):d},setMuted(d){r=!!d,r&&h(),f()},play(d,p=1){let v=Hd[d];if(!v||!s||r||!i||i.state!=="running"||!(p>0))return;let g=i.currentTime;if(g-(o.get(d)??-1/0)<v.interval||l.size>=16)return;o.set(d,g),a.has(d)||a.set(d,Y_(i,d));let m=i.createBufferSource(),_=i.createGain(),S={source:m,gain:_};m.buffer=a.get(d);let y=d==="plus"||d==="merge"||d==="victory"||d==="loss";m.playbackRate.value=y?1:.95+Math.random()*.1,_.gain.value=v.gain*Math.min(1.36,.45+.55*Math.sqrt(p)),m.connect(_),_.connect(t),l.add(S),m.onended=()=>c(S),m.start()},pause(){if(s=!1,h(),f(),!i||i.state==="closed")return;let d=i.suspend().catch(()=>{});return n=d,d.then(()=>{n===d&&(n=void 0)}),d}}}var re=i=>document.getElementById(i),Wi=re("stage"),Ps=re("game"),Z_=re("start"),Jr=re("startButton"),Jd=re("veil"),Zr=re("bossbar"),Mi=re("tip"),$d={hybrid:"\u6DF7\u5408",ai:"AI \u8D34\u56FE","3d":"\u7EAF 3D"},Kd={hybrid:"\u968F\u961F\u5C0F\u5175\u548C\u51B2\u950B\u7EA2\u5175\u7528 AI \u89D2\u8272\u56FE\uFF0C\u961F\u957F\u3001Boss \u548C\u5BC6\u96C6\u5175\u9635\u7528 3D\u3002",ai:"\u56DB\u79CD\u89D2\u8272\u90FD\u4F7F\u7528 AI \u89D2\u8272\u56FE\uFF0C\u8D5B\u9053\u3001\u5F39\u9053\u548C\u78B0\u649E\u4FDD\u7559 3D\u3002","3d":"\u6240\u6709\u89D2\u8272\u90FD\u4F7F\u7528 3D \u6A21\u578B\uFF0C\u53EF\u770B\u6E05\u8DD1\u52A8\u3001\u70AE\u8EAB\u540E\u5750\u548C\u53CC\u62F3\u7838\u5730\u3002"},J_=matchMedia("(pointer:coarse)").matches;re("instruction").textContent=J_?"\u5DE6\u53F3\u62D6\u52A8 \xB7 \u81EA\u52A8\u5F00\u706B":"\u2190 \u2192 \u6216 A / D \u79FB\u52A8 \xB7 \u81EA\u52A8\u5F00\u706B";function Qd(i){try{return localStorage.getItem(i)}catch{return null}}function jd(i,t){try{localStorage.setItem(i,t)}catch{}}var $_=new URL(location.href).searchParams.get("art"),ei=[$_,Qd("squad-art"),"hybrid"].find(i=>Object.prototype.hasOwnProperty.call($d,i)),Si=Qd("squad-mute")==="1",ni=null,Qr=!1,Zc=!1,$e=null,Qc=null,Xi=!0,Is=0,Vi=0,Jc=0,qc=0,Yc=0,tf=0,$c=!1,Kc=!1,bi=null,$r=new Set,Ei=Vd();Ei.setMuted(Si);function ef(){let i=Si?"\u5F00\u542F\u58F0\u97F3":"\u5173\u95ED\u58F0\u97F3";re("soundIcon").setAttribute("href",Si?"#i-mute":"#i-sound"),re("sound").setAttribute("aria-label",i),re("sound").title=i}ef();var Gt=new ea(i=>{i.kind!=="smallShot"&&i.kind!=="loss"&&ni?.feedback(i),Ei.play(i.kind,i.strength)});function jc(){$r.clear(),bi=null}function Wd(i,t){Mi.textContent=i,Mi.hidden=!1,tf=Gt.elapsed+t}function th(i,t){if(Object.prototype.hasOwnProperty.call($d,i)){ei=Zc?i:"3d",Wi.dataset.art=ei,Xi=!0,t&&jd("squad-art",ei);for(let e of re("options").children)e.setAttribute("aria-pressed",String(e.dataset.art===ei)),e.disabled=!Zc&&e.dataset.art!=="3d";$e==="art"&&(re("detail").textContent=Kd[ei])}}function Kr(){Qr&&(sf(),Gt.start(),Ei.unlock(),Z_.hidden=!0,re("pause").hidden=!1,Wi.dataset.phase=Gt.phase)}function nf(){jc(),Gt.reset(),ni.reset(Gt.x),Is=0,Jc=0,Mi.hidden=!0,$c=!1,Kc=!1,Kr()}function Ls(i){if(Qr){if(jc(),Is=0,$e=i,Xi=!0,Jd.hidden=!1,re("options").hidden=i!=="art",re("secondary").hidden=i!=="pause",i==="art"&&(Ei.pause(),re("dialogTitle").textContent="\u89D2\u8272\u753B\u9762",re("detail").textContent=Kd[ei],re("continue").textContent="\u786E\u5B9A",th(ei,!1)),i==="pause"&&(Ei.pause(),re("dialogTitle").textContent="\u5DF2\u6682\u505C",re("detail").textContent="",re("continue").textContent="\u7EE7\u7EED\u6E38\u620F"),i==="result"){let t=Gt.phase==="won";re("dialogTitle").textContent=t?"\u7A81\u7834\u6210\u529F":Gt.lossReason==="wall"?"\u961F\u957F\u51FA\u5C40":Gt.lossReason==="breach"?"\u9632\u7EBF\u5931\u5B88":"\u5C0F\u961F\u5168\u706D",re("detail").textContent=t?`\u51FB\u8D25 Boss\uFF0C\u51FB\u9000 ${Gt.score} \u540D\u7EA2\u5175\u3002`:Gt.lossReason==="wall"?"\u961F\u957F\u88AB\u786C\u5899\u63A8\u51FA\u4E86\u8DD1\u9053\u3002":Gt.lossReason==="breach"?"Boss \u7A81\u7834\u4E86\u9632\u7EBF\u3002":Gt.boss.active?`Boss \u8FD8\u5269 ${Math.ceil(Gt.boss.hp)} / 800 \u751F\u547D`:"\u7EA2\u5175\u7A81\u7834\u4E86\u961F\u4F0D\u3002",re("continue").textContent="\u518D\u73A9\u4E00\u6B21"}re("continue").focus({preventScroll:!0})}}function sf(){Xi=!0,$e=null,Qc=null,Jd.hidden=!0,Is=0}function rf(){let i=$e,t=Qc;if(sf(),i==="result"){nf();return}if(i==="art"&&t){Ls(t);return}Gt.playing?Ei.unlock():Gt.phase==="ready"&&Jr.focus({preventScroll:!0})}re("continue").addEventListener("click",rf);re("secondary").addEventListener("click",nf);Jr.addEventListener("click",Kr);re("sound").addEventListener("click",()=>{Si=!Si,jd("squad-mute",Si?"1":"0"),Ei.setMuted(Si),Si||Ei.unlock(),ef()});re("pause").addEventListener("click",()=>{Gt.playing&&Ls("pause")});re("styles").addEventListener("click",()=>{Qc=$e,Ls("art")});for(let i of re("options").children)i.addEventListener("click",()=>th(i.dataset.art,!0));Ps.addEventListener("pointerdown",i=>{!Qr||$e||!i.isPrimary||i.button!==0||(Gt.phase==="ready"&&Kr(),Gt.playing&&(i.preventDefault(),bi={id:i.pointerId,start:i.clientX,world:Gt.targetX},Ps.setPointerCapture(i.pointerId)))});Ps.addEventListener("pointermove",i=>{!bi||i.pointerId!==bi.id||$e||Gt.aim(bi.world+(i.clientX-bi.start)*14.8/Wi.clientWidth)});function K_(i){i.pointerId===bi?.id&&(bi=null)}for(let i of["pointerup","pointercancel","lostpointercapture"])Ps.addEventListener(i,K_);var af=["ArrowLeft","KeyA"],of=["ArrowRight","KeyD"];window.addEventListener("keydown",i=>{if(!Qr||i.altKey||i.ctrlKey||i.metaKey)return;let t=i.code;if($e){$e!=="result"&&(t==="Escape"||t==="KeyP")&&!i.repeat&&(i.preventDefault(),rf());return}if(af.includes(t)||of.includes(t)){i.preventDefault(),Gt.phase==="ready"&&Kr(),$r.add(t);return}i.repeat||((t==="Space"||t==="Enter")&&Gt.phase==="ready"&&!(i.target instanceof HTMLButtonElement&&i.target!==Jr)?(i.preventDefault(),Kr()):(t==="KeyP"||t==="Escape"||t==="Space")&&Gt.playing&&!(t==="Space"&&i.target instanceof HTMLButtonElement)&&(i.preventDefault(),Ls("pause")))});window.addEventListener("keyup",i=>$r.delete(i.code));function eh(){jc(),Gt.playing&&!$e&&Ls("pause")}window.addEventListener("blur",eh);document.addEventListener("visibilitychange",()=>{Vi=0,document.hidden&&eh()});var Xd=-1,qd=-1,Yd=-1;function Q_(){let i=Gt.allies.length,t=Math.round(26+Math.min(174,Gt.absorbed*4.85));i!==Xd&&(re("count").textContent=i,Xd=i),t!==qd&&(re("power").textContent=t,qd=t),Wi.dataset.phase=Gt.phase;let e=Gt.boss;if(Zr.hidden=!e.active||Gt.phase==="won",!Zr.hidden){let n=ni.project(e.x,4.91,e.z);Zr.style.transform=`translate(${n.x.toFixed(1)}px,${Math.max(53,n.y).toFixed(1)}px)`}e.hp!==Yd&&(Zr.firstElementChild.style.transform=`scaleX(${e.hp/e.maxHp})`,Zr.lastElementChild.textContent=Math.ceil(e.hp),Yd=e.hp),Gt.playing&&!$e&&(!$c&&Gt.wall.hp>0&&Gt.distance>=10&&Gt.wall.z<0&&($c=!0,Wd("\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00",3)),Gt.wall.hp<=0&&Mi.textContent==="\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00"&&(Mi.hidden=!0),e.active&&!Kc&&(Kc=!0,Wd("\u5BF9\u51C6 Boss\uFF0C\u6301\u7EED\u5F00\u706B",1.7)),!Mi.hidden&&Gt.elapsed>=tf&&(Mi.hidden=!0)),!Gt.playing&&Gt.phase!=="ready"&&(Mi.hidden=!0,re("pause").hidden=!0,Gt.endTime>(Gt.phase==="won"?2.05:.86)&&!$e&&Ls("result"))}function lf(i){if(requestAnimationFrame(lf),document.hidden)return;if($e&&!Xi){Vi=i;return}if(!$e&&Gt.phase==="ready"&&Vi&&i-Vi<1e3/29&&!Xi)return;Xi=!1;let t=Vi?(i-Vi)/1e3:1/60;Vi=i;let e=Math.min(.08,Math.max(0,t)),n=0;if(!$e){if(Jc+=e,Gt.playing||Gt.phase==="won"||Gt.phase==="lost")for(Is+=e;Is>=1/60;){let s=Number(of.some(r=>$r.has(r)))-Number(af.some(r=>$r.has(r)));Gt.tick(1/60,s),n+=Gt.worldAdvance,Is-=1/60}Gt.playing&&(Yc+=e,t>.031&&qc++,Yc>2.1&&(qc>24&&ni.lowerResolution(),qc=0,Yc=0))}ni.draw(Gt,Jc,$e?0:e,n,ei),Q_()}function Zd(i){let t=re("problem");t.hidden=!1,t.textContent=i;let e=document.createElement("button");e.textContent="\u91CD\u65B0\u8F7D\u5165",e.onclick=()=>location.reload(),t.append(e)}async function j_(){try{ni=kd(Ps,Wi),ni.reset(Gt.x);let i=()=>{ni.resize(),Xi=!0};new ResizeObserver(i).observe(Wi),window.addEventListener("resize",i),Ps.addEventListener("webglcontextlost",t=>{t.preventDefault(),eh(),Zd("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u6E38\u620F\u3002")}),Zc=await ni.assets,th(ei,!1),Qr=!0,Wi.dataset.phase="ready",Jr.disabled=!1,Jr.lastElementChild.textContent="\u5F00\u59CB\u6E38\u620F",requestAnimationFrame(lf)}catch(i){console.error(i),Zd("\u6E38\u620F\u9700\u8981\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5728 Safari \u6216 Chrome \u4E2D\u6253\u5F00\u3002")}}j_();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
