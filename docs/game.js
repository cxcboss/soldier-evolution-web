var Vh={speed:27,lift:0,tail:1.05},Fr={speed:23,lift:.34,tail:1.35},$i={speed:20,lift:.78,tail:2.05},Ji={speed:40,lift:.08,tail:4.15},s0=22,r0=30;function hl(i,e){let t=Math.min(1,e/i.aimDistance);return i.startY+(i.endY-i.startY)*t+4*i.lift*t*(1-t)}function Or(i,e,t){return t.x=i.startX+i.headingX*e,t.y=hl(i,e),t.z=i.startZ+i.headingZ*e,t}function Tt(i,e,t){let n=Math.max(0,Math.min(1,(i-e)/(t-e)));return n*n*(3-2*n)}function ul(i){return Tt(i,.04,.42)*(1-Tt(i,.48,.62))}function fl(i){return Tt(i,.48,.62)*(1-Tt(i,.66,.86))}var Wh=(i,e,t)=>Math.min(t,Math.max(e,i)),En={bruiser:{crown:[4.91,0],name:"\u94C1\u62F3\u961F\u957F",skill:"\u9707\u6865\u91CD\u62F3",prompt:"\u91CD\u62F3\u84C4\u529B\uFF0C\u907F\u5F00\u62F3\u5370",color:"#ffc66c",height:4.5,aim:2.05,warm:.86,flight:.65,cooldown:6.3},diver:{crown:[3.74,-1.78],name:"\u6F6E\u94B3\u5DE8\u87F9",skill:"\u53CC\u94B3\u6F6E\u6C50",prompt:"\u53CC\u94B3\u5408\u51FB\uFF0C\u4E24\u9053\u6C34\u73AF\u4E4B\u95F4\u6709\u7A7A\u9699",color:"#39e4d5",height:2.32,aim:1.12,warm:.9,flight:.86,cooldown:6.3},warden:{crown:[3.47,-1.49],name:"\u91D1\u89D2\u91CD\u7280",skill:"\u94C1\u89D2\u51B2\u950B",prompt:"\u91CD\u7280\u538B\u4F4E\u4E86\u89D2\uFF0C\u95EA\u5F00\u91D1\u8272\u76F4\u9053",color:"#ffb847",height:2.84,aim:1.55,warm:1.12,flight:.82,cooldown:7.1},drill:{crown:[3.79,-1.65],name:"\u7D2B\u6676\u5730\u9F99",skill:"\u5730\u8109\u6676\u523A",prompt:"\u6676\u523A\u9010\u4E2A\u5192\u51FA\uFF0C\u79BB\u5F00\u7D2B\u5708",color:"#ce82ff",height:3.39,aim:1.6,warm:.89,flight:.52,cooldown:6.4},kestrel:{crown:[4.12,-2.03],name:"\u51B0\u7FFC\u98DE\u9F99",skill:"\u6781\u5BD2\u5410\u606F",prompt:"\u51B0\u9F99\u6B63\u5728\u5438\u6C14\uFF0C\u79BB\u5F00\u971C\u84DD\u6247\u5F62",color:"#78eaff",height:3.35,aim:1.92,warm:1.15,flight:.45,cooldown:6.5},engine:{crown:[3.72,-1.9],name:"\u7194\u7089\u86DB\u673A",skill:"\u7194\u82AF\u53CC\u70AE",prompt:"\u53CC\u70AE\u9501\u5B9A\uFF0C\u79BB\u5F00\u6A59\u7EA2\u843D\u70B9",color:"#ff8253",height:2.68,aim:1.33,warm:.94,flight:1.12,cooldown:6.8}},Xh=(i,e)=>Wh((i.age-i.warm-e.delay)/i.flight,0,1);function I1(i,e,t,n,s=0){if(e.shape==="circle")return Math.hypot(t-e.x,n-e.z)<e.radius+s;let r=e.x-i.x,a=e.z-i.z,o=Math.hypot(r,a)||1,l=((t-i.x)*r+(n-i.z)*a)/o,c=e.shape==="cone"?e.radius*Wh(l/o,.05,1):e.radius;return l>-.1&&l<o+1.65+s&&Math.abs((t-i.x)*a-(n-i.z)*r)/o<c+s}function L1(i){let e=i.boss,t=e.kind,n=En[t],s=i.x,r=i.captainZ,a=s>.7?-1:1,o=[],l=(c,u,f,d=0,h="circle")=>o.push({x:Wh(c,-5.85,5.85),z:u,radius:f,delay:d,shape:h,hit:!1});return t==="diver"?(l(s-1.55,r,.96),l(s+1.55,r,.96,.13)):t==="warden"?l(e.x,r+.42,1.04,0,"strip"):t==="drill"?(l(s,r-.64,.89),l(s+a*.68,r+.07,.88,.26),l(s+a*1.45,r+.68,.91,.52)):t==="kestrel"?l(s,r+.74,1.31,0,"cone"):t==="engine"?(l(s,r-.17,1.12),l(s+a*2.42,r+.52,1.14,.37)):l(s,r-.44,1.16),e.skill={kind:t,x:e.x,z:e.z+.38,height:n.aim,age:0,warm:n.warm,flight:n.flight,marks:o,casualties:0,damagedCaptain:!1},i.notice(n.prompt),e.skill}function D1(i,e,t){if(i.event(e.kind+"Strike",t.x,.1,t.z),i.damageSquadArea){let n=i.stage===3?3:2;i.damageSquadArea(t.x,t.z,t.radius+.18,n,"signature",e.kind)}e.kind==="kestrel"&&I1(e,t,i.x,i.captainZ,.6)&&(i.chill=1.6)}function a0(i,e){let t=i.boss,n=t.hp>0&&t.hp<=t.maxHp*.5,s=i.route.siege&&n;if(n&&!t.enraged&&t.active&&!t.defeated&&(t.enraged=!0,t.nextCast=Math.min(t.nextCast,s?1.3:1.8),i.event("bossEnrage",t.x,1.2,t.z,1.25),i.notice(s?"\u5730\u9F99\u8FDB\u5165\u72C2\u653B\uFF0C\u8FDE\u7EED\u907F\u5F00\u6676\u523A":En[t.kind].name+"\u8FDB\u5165\u72C2\u66B4\uFF0C\u653B\u52BF\u52A0\u5FEB\uFF01")),s&&!t.secondWind&&(t.secondWind=!0),!t.skill){t.nextCast-=e,t.z>=-30&&t.z<(s?-1.65:-5.2)&&!i.activeGround.some(a=>a.finale&&!a.crossed&&Math.abs(a.z-t.z)<7)&&!t.vault&&!t.attackT&&t.nextCast<=0&&L1(i);return}let r=t.skill;r.age+=e,!r.fired&&r.age>=r.warm&&(r.fired=!0,i.event(r.kind+"Cast",t.x,En[r.kind].aim,t.z+.37));for(let a of r.marks)if(!a.hit&&Xh(r,a)>=1&&(a.hit=!0,D1(i,r,a),!i.playing))return;r.age>r.warm+r.flight+r.marks.at(-1).delay+.65&&(t.skill=null,t.nextCast=s?1.8:En[t.kind].cooldown*(t.enraged?.76:1))}var ji=i=>4.4*i,Qs=i=>["\u5DE6\u8DEF","\u4E2D\u8DEF","\u53F3\u8DEF"][i+1],ei={quay:{floor:"#dfd6cc",joint:"#b0a399",line:"#7c92a8",rim:"#fff7ec",deep:"#0a3a63",glint:"#42b8cc",frame:"#49617c",railTop:"#f3f7fc",lampGlow:"#ffd468",hemiSky:"#fff8ec",hemiGround:"#3e6f91",hemiIntensity:1.46,keyLight:"#ffe9c4",keyIntensity:2.34,rimLight:"#6ad8ff",rimIntensity:.98,fog:"#174c78",fogDensity:.0068,skyTop:"#0d346b",skyHorizon:"#4899cc",sunColor:"#ffe399",moteColor:"#fff5d6",moteStyle:"breeze",exposure:1.05},timber:{floor:"#cba680",joint:"#886242",line:"#725238",rim:"#f5dec0",deep:"#0d3a3c",glint:"#43b896",frame:"#684c35",railTop:"#deb98e",lampGlow:"#7ef7ff",hemiSky:"#f4ffea",hemiGround:"#355c47",hemiIntensity:1.42,keyLight:"#ffebc2",keyIntensity:2.28,rimLight:"#6ff7d4",rimIntensity:1.05,fog:"#164544",fogDensity:.0074,skyTop:"#113c47",skyHorizon:"#469480",sunColor:"#ffe9a6",moteColor:"#b5ffea",moteStyle:"breeze",exposure:1.04},cinder:{floor:"#70636e",joint:"#e65b29",line:"#ff8e3a",rim:"#bfb0ba",deep:"#330b08",glint:"#ff7224",frame:"#4d3640",railTop:"#a38996",lampGlow:"#ff6e26",hemiSky:"#ffd9c2",hemiGround:"#822814",hemiIntensity:1.44,keyLight:"#ffd2a6",keyIntensity:2.4,rimLight:"#ff5e28",rimIntensity:1.42,fog:"#401514",fogDensity:.0082,skyTop:"#220912",skyHorizon:"#a83a1d",sunColor:"#ff8038",moteColor:"#ff9d42",moteStyle:"embers",exposure:1.08}},N1=[{number:1,name:"\u9633\u5149\u5916\u6E2F",theme:"quay",first:1,last:1},{number:2,name:"\u96F7\u9706\u6797\u8C37",theme:"timber",first:2,last:2},{number:3,name:"\u7194\u5FC3\u88C2\u8C37",theme:"cinder",first:3,last:3}],qh=(i,e)=>({kind:"skyfall",lane:i,at:e,radius:1.88}),U1=(i,e,t=3.6)=>({kind:"gap",lane:i,at:e,length:t}),F1=(i,e)=>({kind:"bridge",lane:i,at:e,length:4.4}),dl=(i,e,t="merge")=>({kind:"cache",lane:i,at:e,reward:t}),Yh=(i,e)=>({kind:"coil",lane:i,at:e}),O1=(i,e,t)=>({kind:"belt",lane:i,at:e,direction:t,length:8.2}),js=(i,e)=>({kind:"barrel",lane:i,at:e,radius:3.85}),Zh=(i,e)=>({kind:"roller",lane:i,at:e,speed:6.2}),Kh=(i,e)=>({kind:"lavaVent",lane:i,at:e,radius:2.05}),B1=[{name:"\u5408\u5175\u7834\u9635 \xB7 \u6CB9\u6876\u8FDE\u7206",tagline:"\u5408\u5175\u8FDB\u9636 \xB7 \u8FDE\u73AF\u6CB9\u6876 \xB7 \u94C1\u62F3\u8FDE\u7838",badge:"\u5408\u6210\u6559\u5B66",theme:"quay",boss:"bruiser",vault:!1,pressure:.56,bossHP:3400,wallHP:52,approachLength:132,features:[js(0,32),js(1,35.5),dl(-1,56,"merge"),js(-1,74),js(0,77.5),js(1,102),dl(1,108,"flameSquad")]},{name:"\u78C1\u66B4\u5F2F\u9053 \xB7 \u6EDA\u6728\u5947\u88AD",tagline:"\u5F2F\u9053\u6EDA\u6728 \xB7 \u7535\u78C1\u8FDE\u9501\u5854 \xB7 \u5DE8\u87AF\u72C2\u7838",badge:"\u673A\u5173\u5947\u88AD",theme:"timber",boss:"diver",vault:!0,pressure:.72,bossHP:4600,wallHP:70,approachLength:146,features:[Yh(0,31),Zh(-1,46),O1(1,58,-1),Zh(1,72),Yh(-1,82),F1(1,96),Zh(0,112),dl(-1,120,"merge")]},{name:"\u7194\u5FC3\u72C2\u6F6E \xB7 \u6CF0\u5766\u89C9\u9192",tagline:"\u7194\u5CA9\u55B7\u53D1 \xB7 \u6D41\u661F\u706B\u96E8 \xB7 \u7EC8\u6781\u6307\u6325\u5B98",badge:"\u7EC8\u6781\u72C2\u6F6E",theme:"cinder",boss:"engine",vault:!0,pressure:.88,bossHP:6400,wallHP:92,approachLength:158,features:[Kh(0,30),js(1,42),qh(-1,55),Kh(1,68),Yh(0,79),qh(0,92),Kh(-1,104),U1(1,116),qh(1,126),js(0,134),dl(-1,138,"merge")]}],yi=B1.map((i,e)=>{let t=e+1,n=N1[e],s=.565/Math.sqrt(i.pressure),r=6.2/i.pressure,a=42,o=Math.round(i.approachLength/(s+.38/11+r/a));return{number:t,name:i.name,tagline:i.tagline,badge:i.badge,chapter:n,theme:i.theme,boss:i.boss,vault:i.vault,features:i.features,pressure:i.pressure,siege:t===3,rowSpacing:s,restEvery:a,restLength:r,finale:o,bossHP:i.bossHP,wallHP:i.wallHP,contactGrace:.42}}),Nn=yi.length;function Ba(i,e){let t={glass:20,crates:44,shutter:72},n=i.kind==="cover"?t[i.variant]:i.kind==="cache"?54:i.kind==="bridge"?38:i.kind==="barrel"?14:i.kind==="roller"?46:24,s=yi[Math.min(e,Nn)-1].pressure,r=Math.round((.68+.32*s)*n);return{...i,x:ji(i.lane),z:-i.at,hp:r,maxHp:r,state:"ready",age:0,flash:0,half:i.kind==="cover"?1.94:i.kind==="cache"?1.67:i.kind==="roller"?1.78:i.kind==="barrel"?1.15:.78,depth:i.kind==="cover"?.46:i.kind==="roller"?.72:.44}}function er(i){return i.kind==="gap"&&i.state!=="repaired"||i.kind==="bridge"&&i.state==="cut"}function pl(i,e,t,n=0){return er(i)&&Math.abs(e-i.x)<4.4/2-.14-n&&Math.abs(t-i.z)<i.length/2-n}var _i=4.4-.4,cn={plus:{label:"\u6B65\u5175+3",hp:10,count:3,unitKind:"rifle",tone:"blue"},squad:{label:"\u6B65\u5175+5",hp:32,count:5,unitKind:"rifle",tone:"blue"},reserve:{label:"\u6B65\u5175+6",hp:38,count:6,unitKind:"rifle",tone:"blue"},merge:{label:"\u5408\u6210\u8FDB\u5316",hp:16,tone:"gold"},shieldSquad:{label:"\u91CD\u76FE+2",hp:24,count:2,unitKind:"shield",tone:"blue"},flameSquad:{label:"\u706B\u7130+2",hp:26,count:2,unitKind:"flame",tone:"gold"},teslaSquad:{label:"\u7535\u78C1+2",hp:26,count:2,unitKind:"tesla",tone:"blue"},double:{label:"\xD72 \u6269\u7F16",hp:46,tone:"gold"},rapid:{label:"\u6781\u901F\u8FDE\u5C04",hp:30,tone:"gold"},shield:{label:"\u5168\u519B\u62A4\u76FE",hp:32,tone:"blue"},blast:{label:"\u9AD8\u7206\u8F70\u70B8",hp:34,tone:"gold"},plasma:{label:"\u7535\u6D46\u8D2F\u7A7F",hp:34,tone:"blue"},spread:{label:"\u53CC\u500D\u5F39\u5E55",hp:34,tone:"gold"},drone:{label:"\u6D6E\u6E38\u70AE\u53F0",hp:36,tone:"blue"},engineer:{label:"\u7D27\u6025\u67B6\u6865",hp:28,tone:"gold"},fever:{label:"\u5168\u519B\u72C2\u70ED",hp:40,tone:"gold"}};function $h(i,e,t,n){let s=Math.max(1,Math.min(Nn,n)),a=(cn[t]||cn.plus).hp+(s-1)*4,o=Math.round(a*(.72+.28*yi[s-1].pressure));return{x:i,at:e,z:-e,type:t,hp:o,maxHp:o,active:!0,flash:0}}var o0=[[-1,1,null,"plus","flameSquad"],[0,-1,"glass","merge","plus"],[1,-1,null,"shieldSquad","squad"],[-1,1,"crates","merge","flameSquad"],[0,1,null,"rapid","squad"],[1,-1,"glass","merge","blast"],[-1,0,null,"merge","reserve"]],k1=[[0,1,null,"teslaSquad","plus"],[-1,1,"glass","merge","shieldSquad"],[1,-1,null,"teslaSquad","squad"],[0,-1,"crates","merge","plasma"],[-1,1,null,"engineer","reserve"],[1,0,"shutter","merge","drone"],[0,-1,null,"merge","spread"]],z1=[[-1,1,null,"flameSquad","teslaSquad"],[0,1,"glass","merge","squad"],[1,-1,"crates","double","shieldSquad"],[-1,0,null,"merge","flameSquad"],[1,-1,"shutter","fever","merge"],[0,1,null,"double","teslaSquad"],[-1,1,"crates","merge","drone"],[0,-1,null,"merge","shield"]],H1={1:o0,2:k1,3:z1};function l0(i,e=[]){let t=Math.max(1,Math.min(Nn,i)),n=[];function s(o,l,c){let u=$h(ji(o),l,c,t);return n.push(u),u}s(0,10.5,"plus"),s(-1,17,"merge"),s(1,24.5,t===2?"teslaSquad":"flameSquad");let r=H1[t]||o0,a=(o,l,c)=>!e.some(u=>u.lane===o&&u.at+(u.length||1.6)/2>=l-1.8&&u.at-(u.length||1.6)/2<=c+1.8);for(let o=0;o<r.length;o++){let l=37+o*16.5,[c,u,f,d,h]=r[o],x=[...new Set([c,u,0,-1,1])].find(v=>a(v,l-3.6,l));if(x!==void 0){let v=s(x,l,d);f&&(v.coverSpec={kind:"cover",variant:f,lane:x,at:l-3.6,reward:d})}let g=l+(o%2?1.5:-.8),m=[u,0,-1,1].find(v=>v!==x&&a(v,g,g));m!==void 0&&s(m,g,h)}return n}var Jh=(i,e,t)=>Math.min(t,Math.max(e,i)),jh=5.32,G1=.94;function ml(i){let e=i.boss,t=i.x,n=i.captainZ,s=Math.hypot(t-e.x,n-e.z),r=i.squad||i.allies||[];if(r.length){s=1/0;for(let a of r){let o=Math.hypot(a.x-e.x,a.z-e.z);o<s&&(s=o,t=a.x,n=a.z)}}return{x:t,z:n,distance:s}}function Qh(i,e,t){let n=[];function s(r,a,o){r.z+o+.65<e||r.z-o-.65>t||n.push({x:r.x,z:r.z,half:a+G1,depth:o+.65})}for(let r of i.gates)r.active&&s(r,_i/2,.16);i.wall.hp>0&&s(i.wall,2.14,.32);for(let r of i.features)(r.kind==="cover"||r.kind==="cache")&&r.hp>0&&r.state==="ready"&&s(r,r.half,r.depth);return n}function ka(i,e,t){let n=Qh(i,e,t),s=[...new Set([...i.wave||[0],0,-1,1])],r,a=1/0;for(let o of s){let l=o===0?-.42:ji(o),c=n.filter(u=>Math.abs(l-u.x)<u.half+.12).length;if(c<a&&(r={lane:o,x:l,conflicts:c},a=c),!c)break}return r}function c0(i,e,t,n){let s=i.boss,r=s.z+i.worldAdvance,a=Jh(s.pursuing?t.x:s.escortX??-.42,-jh,jh),o=s.pursuing?Math.min(r+n,Math.max(s.z-e*3.9,t.z-1.35)):r+n,l=Qh(i,Math.min(r,o)-.2,Math.max(r,o)+3),c=a,u=x=>l.every(g=>Math.abs(x-g.x)>=g.half+.025);if(!u(a)||!u(s.x)){let x=[a,s.x,ji(-1),0,ji(1)];for(let m of l)x.push(m.x-m.half-.07,m.x+m.half+.07);let g=1/0;for(let m of x){if(Math.abs(m)>jh||!u(m))continue;let v=Math.abs(m-s.x)+.48*Math.abs(m-a);v<g&&(g=v,c=m)}}let f=(s.pursuing?5.1:l.length?3.5:1.2)*e,d=s.x+Jh(c-s.x,-f,f),h=o;for(let x of l)Math.abs(d-x.x)>=x.half||Math.abs(h-x.z)>=x.depth||(Math.abs(s.x-x.x)>=x.half?d=x.x+Math.sign(s.x-x.x)*(x.half+.002):r<=x.z?h=Math.min(h,x.z-x.depth-.002):h=Math.max(h,x.z+x.depth+.002));let p=d-s.x;s.marched+=Math.hypot(p,h-r),s.yaw+=(Jh(Math.atan2(p,Math.max(e*2,h-r)),-.6,.6)-s.yaw)*(1-Math.exp(-8*e)),s.x=d,s.z=h}function h0(i,e,t){let n=i.worldAdvance>0?i.roadSpeed:0;return!Qh(i,t-n*1.55,t+.25).some(s=>Math.abs(e-s.x)<s.half&&s.z-s.depth<=t&&s.z+n*1.55+s.depth>=t)}var Br=(i,e,t)=>Math.max(e,Math.min(t,i)),u0=new Set(["cache","bridge","coil","cover","barrel","roller"]);function V1(i,e,t){let n=$h(e.x,i.distance-e.z+.85,t,i.stage);n.z=i.distance-n.at,i.gates.push(n),i.event("supplyBreak",e.x,.65,n.z)}function f0(i,e,t){e.state="exploded",e.hp=0,e.age=0,i.event("barrelBlast",e.x,.5,e.z,1.45),i.addPopup?.(e.x,1.35,e.z,"\u8FDE\u73AF\u7206\u7834!","crit");let n=e.radius||3.85,s=r=>{r.alive&&Math.hypot(r.x-e.x,r.z-e.z)<n&&i.kill(r,1.55,e.x)};for(let r of i.columns)for(let a of r.units)s(a);for(let r of i.runners)s(r);i.boss.active&&!i.boss.defeated&&Math.hypot(i.boss.x-e.x,i.boss.z-e.z)<n+1.4&&i.damageBoss(t||{kind:"rocket"},180);for(let r of i.features)r!==e&&r.kind==="barrel"&&r.state==="ready"&&Math.hypot(r.x-e.x,r.z-e.z)<5.8&&(r.chainTimer=.14)}function d0(i,e,t){if(e.state!=="ready")return;let n=e.variant==="shutter"&&Math.abs(t.x-e.x)<.51,s=t.damage;if(n&&(s*=2.25),(e.variant==="crates"||e.kind==="roller")&&t.kind==="rocket"&&(s*=1.45),e.hp=Math.max(0,e.hp-s),e.flash=1,e.hp>0){n&&i.addPopup&&i.addPopup(t.x,1.15,t.z,"\u5F31\u70B9 \xD72.2","crit"),i.event(n?"latchHit":"wallHit",t.x,.65,t.z,.55);return}if(i.addOverdrive?.(8),i.addCombo?.(2),e.age=0,e.kind==="barrel"){f0(i,e,t);return}if(e.kind==="roller"){e.state="broken",i.event("crateBreak",e.x,.65,e.z,1.35),i.addPopup?.(e.x,1.35,e.z,"\u51FB\u788E\u6EDA\u6728 \xB7 \u63F4\u5175+3!","buff");for(let r=0;r<3;r++)i.recruit(e.x+(r-1)*.4,!1,"rifle");return}if(e.kind==="cover")if(e.state="open",e.variant==="glass"){i.event("glassBreak",e.x,.48,e.z);let r=a=>{a.alive&&Math.hypot(a.x-e.x,a.z-e.z)<2.45&&i.kill(a,.82,e.x)};for(let a of i.columns)for(let o of a.units)r(o);for(let a of i.runners)r(a)}else i.event(e.variant==="crates"?"crateBreak":"wallBreak",e.x,.48,e.z);else if(e.kind==="cache")e.state="open",i.event("wallBreak",e.x,.57,e.z),V1(i,e,e.reward);else if(e.kind==="bridge")e.state="cut",i.event("chainSnap",e.x,.85,e.z),i.notice(Qs(e.lane)+"\u540A\u6865\u5DF2\u65AD\uFF0C\u622A\u65AD\u589E\u63F4");else if(e.kind==="coil"){e.state="discharged",i.event("discharge",e.x,.5,e.z,1.45),i.addPopup?.(e.x,1.5,e.z,"\u7535\u78C1\u8FDE\u9501\u653E\u7535!","buff");let r=0,a=o=>{o.alive&&Math.abs(o.z-e.z)<7.5&&Math.abs(o.x-e.x)<5.5&&(r<12&&(i.addLightning?.(e.x,1.32,e.z,o.x,.55,o.z),r++),i.kill(o,1,e.x))};for(let o of i.columns)for(let l of o.units)a(l);for(let o of i.runners)a(o);i.boss.active&&!i.boss.defeated&&Math.abs(i.boss.z-e.z)<6.5&&Math.abs(i.boss.x-e.x)<5.5&&(i.addLightning?.(e.x,1.32,e.z,i.boss.x,1.6,i.boss.z),i.damageBoss(t,120))}}function p0(i){let e=i.boss,t=i.bossEntryStride,n=Math.max(4,(-23-e.z)*t/(2.3+t)),s=e.z+n+3,r=ka(i,e.z-1.1,s+3.8);for(let o of[-2,-4,-6]){if(!r.conflicts)break;let l=Math.max(e.z+5,e.z+n+3+o),c=ka(i,e.z-1.1,l+3.8);c.conflicts<r.conflicts&&(r=c,s=l)}e.x=e.escortX=r.x;let a=Ba({kind:"gap",lane:r.lane,length:4,at:i.distance-s},i.stage);a.z=i.distance-a.at,a.finale=!0,i.features.push(a)}function W1(i,e){let s=.66-e.z;if(e.state==="ready"&&i.phase!=="clear"&&s<=8.4&&(e.state="warning",e.age=0,i.notice(Qs(e.lane)+"\u70BD\u70ED\u9668\u77F3\u5760\u843D\uFF0C\u95EA\u907F\u7EA2\u5708\uFF01")),e.state!=="warning"||(e.progress=Br(1-s/8.4,0,1),e.fallProgress=Br(1-s/(.55*i.roadSpeed),0,1),s>0))return;e.state="landed",e.age=0,i.event("barrelBlast",e.x,.2,e.z,1.35);let r=(a,o)=>Math.hypot(a-e.x,o-e.z)<=e.radius;for(let a of i.columns)for(let o of a.units)o.alive&&r(o.x,o.z)&&i.kill(o,1.3,e.x);for(let a of i.runners)a.alive&&r(a.x,a.z)&&i.kill(a,1.3,e.x);i.damageSquadArea?.(e.x,e.z,e.radius,3,"skyfall")}function X1(i,e,t){if(e.z<-28||e.z>8)return;e.ventClock=(e.ventClock??(e.lane+1)*.7)+t;let n=e.ventClock%2.4,s=e.erupting;if(e.warming=n>=.75&&n<1.6,e.erupting=n>=1.6&&n<2.25,e.ventProgress=e.warming?(n-.75)/.85:e.erupting?1:0,e.erupting&&!s){i.event("lavaBurst",e.x,.25,e.z,1.25);let r=e.radius||2.05;for(let a of i.columns)for(let o of a.units)o.alive&&Math.hypot(o.x-e.x,o.z-e.z)<r&&i.kill(o,1.15,e.x);for(let a of i.runners)a.alive&&Math.hypot(a.x-e.x,a.z-e.z)<r&&i.kill(a,1.15,e.x);i.damageSquadArea?.(e.x,e.z,r*.92,2,"lava")}}function q1(i,e,t){if(e.state==="ready"){e.z>-32&&(e.rollOffset=(e.rollOffset||0)+(e.speed||6.2)*t,e.z=i.distance-e.at+e.rollOffset,e.rollSpin=(e.rollSpin||0)+t*6.5),!e.warned&&e.z>-26&&e.z<-12&&(e.warned=!0,i.notice(Qs(e.lane)+"\u5DE8\u6728\u6EDA\u6765\uFF01\u95EA\u907F\u6216\u96C6\u706B\u8F70\u788E")),e.target&&(e.target.x=e.x,e.target.z=e.z);for(let n of i.columns)for(let s of n.units)s.alive&&Math.abs(s.x-e.x)<1.8&&Math.abs(s.z-e.z)<.72&&i.kill(s,1.1,e.x);!e.hitSquad&&Math.abs(e.z-i.captainZ)<1.15&&i.damageSquadArea?.(e.x,e.z,1.9,3,"roller")>0&&(e.hitSquad=!0)}}function m0(i,e){i.activeGround.length=0;for(let t of i.features){if((t.kind!=="roller"||t.state!=="ready"||t.z<=-32)&&(t.z=i.distance-t.at+(t.rollOffset||0)),t.age+=e,t.flash=Math.max(0,t.flash-e*6),t.kind==="barrel"&&t.state==="ready"&&t.chainTimer>0&&(t.chainTimer-=e,t.chainTimer<=0)){f0(i,t,null);continue}if(!(t.z<i.entryZ-12||t.z>15)){if(t.kind==="skyfall"){if(W1(i,t),!i.playing)return;continue}if(t.kind==="lavaVent"){if(X1(i,t,e),!i.playing)return;continue}if(t.kind==="roller"){if(u0.has(t.kind)&&(t.target??(t.target={mechanism:t}),t.target.x=t.x,t.target.z=t.z),q1(i,t,e),!i.playing)return;continue}if((t.kind==="bridge"||t.kind==="gap"||t.kind==="belt")&&i.activeGround.push(t),!t.warned&&t.z>-22&&t.z<-13&&t.state==="ready"&&!t.finale){t.warned=!0;let n=Qs(t.lane),s={gap:n+"\u65AD\u6865\uFF0C\u63D0\u524D\u6362\u9053",bridge:"\u6253\u65AD"+n+"\u540A\u7D22\uFF0C\u622A\u65AD\u589E\u63F4",cache:"\u6253\u788E"+n+"\u7816\u5899\uFF0C\u83B7\u53D6\u5408\u6210\u8865\u7ED9",barrel:"\u5F15\u7206"+n+"\u6C7D\u6CB9\u6876\uFF0C\u8FDE\u9501\u6E05\u5C4F\uFF01",cover:t.variant==="glass"?n+"\u73BB\u7483\u74F6\uFF0C\u51FB\u788E\u9707\u5012\u7EA2\u5175":t.variant==="crates"?n+"\u6728\u7BB1\uFF0C\u91CD\u70AE\u62C6\u5F97\u5FEB":n+"\u94A2\u95F8\uFF0C\u7784\u51C6\u6A59\u8272\u9501\u6263",coil:"\u51FB\u4E2D"+n+"\u7535\u78C1\u5854\uFF0C\u89E6\u53D1\u95EA\u7535\u94FE\uFF01",belt:n+"\u4F20\u9001\u5E26\u5411"+(t.direction>0?"\u53F3":"\u5DE6")};s[t.kind]&&i.notice(s[t.kind])}if(u0.has(t.kind)&&(t.target??(t.target={mechanism:t}),t.target.x=t.x,t.target.z=t.z+(t.kind==="bridge"?t.length/2+.24:0)),i.phase!=="clear"&&!t.escorted&&t.kind==="cache"&&t.z>=i.entryZ-5&&t.z<-8){t.escorted=!0;for(let n=0;n<2;n++)for(let s=-1;s<=1;s++){let r=i.grunt(t.x+s*.48,i.entryZ-.95-n*.59);r.speed=2.62,i.runners.push(r)}}if(i.phase!=="clear"&&t.kind==="bridge"&&t.state==="ready"&&t.z>=-7.1&&(t.state="linked",t.age=0,i.flanks.push({x:t.lane===0?4.44:t.x,remaining:16,next:0}),i.notice(Qs(t.lane)+"\u540A\u6865\u63A5\u901A\uFF0C\u654C\u519B\u589E\u63F4\u6765\u88AD")),t.kind==="belt"&&Math.abs(t.z-i.captainZ)<t.length/2&&Math.abs(i.x-t.x)<4.4/2-.1&&!i.rope&&i.aim(i.targetX+t.direction*e*1.45),er(t)&&i.planks&&t.z>-5.2&&t.z<1&&Math.abs(i.x-t.x)<4.4/2+.2&&!i.rope&&(i.planks--,t.state="repaired",t.age=0,i.event("plus",t.x,.24,t.z),i.notice(Qs(t.lane)+"\u5DF2\u642D\u597D\u4FBF\u6865")),er(t)&&Math.abs(t.z)<t.length/2+2.8){for(let n=i.squad.length-1;n>=0;n--){let s=i.squad[n];if(pl(t,s.x,s.z,.16)&&i.squad.length>1){i.squad.splice(n,1);let r=i.fall(s,"blue",0);r.intoGap=!0,r.vy=-.6}}if(!i.rope&&pl(t,i.x,i.captainZ,.25)){let n=t.lane===-1?1:t.lane===1?-1:i.x>=t.x?1:-1;i.rope={age:0,from:i.x,to:t.x+n*(4.4/2+.75)},i.aim(i.rope.to),i.damageSquadArea?.(t.x,t.z,2.2,2,"gap"),i.notice("\u89E6\u53D1\u5B89\u5168\u7EF3\u62C9\u56DE\uFF0C\u5C0F\u5FC3\u65AD\u6865\uFF01")}}}}for(let t of i.flanks)if(t.next-=e,t.remaining>0&&t.next<=0){t.next+=.16,t.remaining--;let n=i.grunt(t.x+(t.remaining%3-1)*.12,i.entryZ-.92);n.speed=3.18,n.flank=!0,i.runners.push(n)}i.flanks=i.flanks.filter(t=>t.remaining>0)}function g0(i,e,t){e.lift=0;for(let n of i.activeGround){let s=e.z-n.z;if(n.kind==="belt"&&Math.abs(s)<n.length/2&&Math.abs(e.x-n.x)<4.4/2){e.x=Br(e.x+n.direction*t*.65,-6,6);continue}if(!er(n)||s<-n.length/2-4.3||s>n.length/2+.45||Math.abs(e.x-n.x)>4.4/2+.16)continue;if(e.role==="vault"){let o=Br((s+n.length/2+.55)/(n.length+1.1),0,1);e.lift=1.08*Math.sin(Math.PI*o);return}let r=n.lane===-1?1:n.lane===1||e.laneX<n.x?-1:1,a=n.x+r*(4.4/2+.24);if(e.x+=Br(a-e.x,-3.8*t,3.8*t),pl(n,e.x,e.z,.22)){e.alive=!1;let o=i.fall(e,"red",0);o.intoGap=!0,o.vy=-.7}return}}function x0(i,e){let t=i.boss;t.vault={piece:e,t:0,from:t.z-e.z,to:e.length/2+1.08},t.attackT=0,t.slamChain=0,t.recovery=.15,e.crossed=!0}function v0(i,e){let t=i.boss,n=t.vault;n.airDash&&(n.piece.z+=i.worldAdvance),n.t+=e;let s=Br((n.t-.21)/.89,0,1),r=s*s*(3-2*s);t.z=n.piece.z+n.from+(n.to-n.from)*r,t.lift=2.5*4*s*(1-s),n.t>=1.1&&!n.landed&&(n.landed=!0,i.event("vaultLand",t.x,.06,t.z,.9)),n.t>=1.35&&(t.vault=null,t.lift=0,t.recovery=.34)}var $t={rifle:{id:"rifle",name:"\u84DD\u76D4\u6B65\u5175",short:"\u6B65\u5175",tier:1,hp:1,scale:.98,damage:3.1,fireRate:1,weapon:"rifle",role:"base",color:"#38b6ff",frontBias:0},shield:{id:"shield",name:"\u91CD\u76FE\u536B\u5175",short:"\u91CD\u76FE",tier:1,hp:3,scale:1.12,damage:3.8,fireRate:.88,weapon:"pulse",role:"tank",color:"#9ad4ff",frontBias:1},flame:{id:"flame",name:"\u70C8\u7130\u5175",short:"\u706B\u7130",tier:1,hp:1,scale:1.04,damage:5.5,fireRate:.76,weapon:"flame",role:"special",color:"#ff8a34",frontBias:0},tesla:{id:"tesla",name:"\u7535\u78C1\u5DE5\u5175",short:"\u7535\u78C1",tier:1,hp:1,scale:1.04,damage:5.8,fireRate:.82,weapon:"tesla",role:"special",color:"#4ef2ff",frontBias:0},assault:{id:"assault",name:"\u53CC\u67AA\u7A81\u51FB\u5175",short:"\u7A81\u51FB",tier:2,hp:3,scale:1.34,damage:7.4,fireRate:1.32,weapon:"twin",role:"heavy",color:"#47d1ff",frontBias:-1},pyro:{id:"pyro",name:"\u70C8\u7130\u706B\u7BAD\u5175",short:"\u708E\u70AE",tier:2,hp:3,scale:1.38,damage:18,fireRate:.62,weapon:"miniRocket",role:"heavy",color:"#ff7029",frontBias:-1},storm:{id:"storm",name:"\u96F7\u9706\u7535\u6D46\u5175",short:"\u96F7\u9706",tier:2,hp:3,scale:1.38,damage:13.5,fireRate:.92,weapon:"chainArc",role:"heavy",color:"#52f7ff",frontBias:-1},captain:{id:"captain",name:"\u91CD\u70AE\u961F\u957F",short:"\u961F\u957F",tier:3,hp:6,scale:1.78,damage:38,fireRate:.52,weapon:"cannon",role:"captain",color:"#ffd238",frontBias:-2},titan:{id:"titan",name:"\u94A2\u94C1\u6307\u6325\u5B98",short:"\u6CF0\u5766",tier:4,hp:10,scale:2.16,damage:66,fireRate:.62,weapon:"titanCannon",role:"titan",color:"#ffec70",frontBias:-3}},Y1=[{inputs:["captain","captain"],output:"titan",label:"\u7EC8\u6781\u5408\u6210 \xB7 \u94A2\u94C1\u6307\u6325\u5B98!"},{anyTier:2,count:2,output:"captain",label:"\u8FDB\u9636\u5408\u6210 \xB7 \u91CD\u70AE\u961F\u957F!"},{special:"flame",baseCount:2,output:"pyro",label:"\u878D\u5408\u8FDB\u5316 \xB7 \u70C8\u7130\u706B\u7BAD\u5175!"},{inputs:["flame","flame"],output:"pyro",label:"\u878D\u5408\u8FDB\u5316 \xB7 \u70C8\u7130\u706B\u7BAD\u5175!"},{special:"tesla",baseCount:2,output:"storm",label:"\u878D\u5408\u8FDB\u5316 \xB7 \u96F7\u9706\u7535\u6D46\u5175!"},{inputs:["tesla","tesla"],output:"storm",label:"\u878D\u5408\u8FDB\u5316 \xB7 \u96F7\u9706\u7535\u6D46\u5175!"},{inputs:["rifle","rifle","rifle"],output:"assault",label:"\u5408\u5175\u5347\u7EA7 \xB7 \u53CC\u67AA\u7A81\u51FB\u5175!"},{anyTier:1,count:3,output:"assault",label:"\u5408\u5175\u5347\u7EA7 \xB7 \u53CC\u67AA\u7A81\u51FB\u5175!"}];function y0(i,e=!1){for(let t of Y1)if(!(e&&t.output==="titan"&&i.filter(n=>n.kind==="captain").length<2)){if(t.inputs){let n=[],s=!0;for(let r of t.inputs){let a=i.findIndex((o,l)=>o.kind===r&&!n.includes(l));if(a<0){s=!1;break}n.push(a)}if(s)return{consumedIndices:n,output:t.output,label:t.label}}else if(t.special){let n=i.findIndex(r=>r.kind===t.special);if(n<0)continue;let s=[];for(let r=0;r<i.length&&s.length<t.baseCount;r++)r!==n&&i[r].kind==="rifle"&&s.push(r);if(s.length===t.baseCount)return{consumedIndices:[n,...s],output:t.output,label:t.label}}else if(t.anyTier){let n=[];for(let s=0;s<i.length&&n.length<t.count;s++)$t[i[s].kind].tier===t.anyTier&&n.push(s);if(n.length===t.count)return{consumedIndices:n,output:t.output,label:t.label}}}return null}function _0(i){let e=[],t=[],n=[],s=[];for(let u of i){let f=$t[u.kind];f.tier>=3?e.push(u):f.tier===2?t.push(u):u.kind==="shield"?n.push(u):s.push(u)}let r=1.05;e.forEach((u,f)=>{let d=(f-(e.length-1)/2)*r;u.formX=d,u.formZ=.08+Math.abs(d)*.14});let a=e.length?1.18:.62;t.forEach((u,f)=>{if(!e.length&&t.length===1){u.formX=0,u.formZ=0;return}let d=t.length<=4?Math.PI*1.15:Math.PI*1.65,h=t.length===1?-Math.PI/2:-Math.PI/2+(f/(t.length-1)-.5)*d,p=a+Math.floor(f/6)*.62;u.formX=Math.cos(h)*p*1.08,u.formZ=Math.sin(h)*p*.62+.05});let o=e.length?1.72:t.length?1.38:.92;n.forEach((u,f)=>{let d=n.length===1?0:f/(n.length-1)-.5,h=-Math.PI/2+d*Math.min(Math.PI*.72,n.length*.28);u.formX=Math.cos(h)*o*1.12,u.formZ=Math.sin(h)*o*.72-.26});let l=e.length?1.85:t.length?1.42:.78,c=0;for(let u of s){if(!e.length&&!t.length&&s.length<=3){let g=c++;u.formX=(g-(s.length-1)/2)*.88,u.formZ=g===1&&s.length===3?-.32:.16;continue}let f=0,d=c++,h=6;for(;d>=h;)d-=h,f++,h=6+f*5;let p=Math.PI*2*d/h-Math.PI/2+f*.32,x=l+f*.68;u.formX=Math.cos(p)*x*1.08,u.formZ=Math.sin(p)*x*.88}}function gl(i){let e=0,t=0,n=0,s=0,r=0;for(let a of i){let o=$t[a.kind];o.tier===1?e++:o.tier===2?t++:o.tier===3?n++:s++,r+=Math.round(o.damage*o.fireRate)}return{total:i.length,t1:e,t2:t,t3:n,t4:s,power:r}}var _n=(i,e,t)=>Math.max(e,Math.min(t,i)),xl=Math.PI*2,M0=21,b0=5.45,K1=1.65,vl=11,eu=2.52,S0=[[-1,1],[1,0],[-1,0],[1],[0,-1],[1,-1],[0],[0,1],[-1]],yl=11,_l=[{tier:1,name:"\u65B0\u5175\u6392",need:0,fireRate:1,critBonus:0,blastBonus:1},{tier:2,name:"\u91CD\u88C5\u5408\u6210\u8FDE",need:14,fireRate:1.08,critBonus:.08,blastBonus:1.08},{tier:3,name:"\u91CD\u70AE\u7A81\u51FB\u8425",need:36,fireRate:1.15,critBonus:.15,blastBonus:1.18},{tier:4,name:"\u94A2\u94C1\u6CF0\u5766\u519B\u56E2",need:72,fireRate:1.22,critBonus:.22,blastBonus:1.28}];function kr(i,e){let t=0;for(let n=0;n<i.length;n++){let s=i[n];e(s)&&(i[t++]=s)}i.length=t}var Ml=class{constructor(e=()=>{}){this.emit=e,this.reset()}get allies(){return this.squad}set allies(e){this.squad=e}reset(e=1){this.stage=_n(Math.trunc(Number(e))||1,1,Nn),this.route=yi[this.stage-1],this.features=this.route.features.map(s=>Ba(s,this.stage)),this.activeGround=[],this.flanks=[],this.rope=null,this.planks=0,this.overrun=null,this.parade=null,this.chill=0,this.hint=null,this.hintSequence=0,this.rallyZ=-100,this.seed=129920+(this.stage-1)*1141,this.sequence=0,this.phase="ready",this.elapsed=0,this.distance=0,this.captainZ=0,this.targetZ=0,this.caught=!1,this.caughtBy=null,this.lossReason=null,this.worldAdvance=0,this.x=0,this.targetX=this.x,this.velocity=0,this.upgrades=0,this.scale=1,this.visualScale=1,this.recoil=0,this.mergeGlow=0,this.hurt=0,this.armor=3,this.shots=[],this.incoming=[],this.enemyFireTimer=0,this.squad=[],this.merges=[],this.lightningArcs=[],this.falling=[],this.deliveries=[],this.runners=[],this.volley=0,this.buffs={rapid:0,shield:0,plasma:0,spread:0,drone:0,fever:0,frost:0,range:0,longshot:0},this.supportTimer=0,this.feverMeter=0,this.bonuses={extraAllies:0,cannonMult:1,critChanceBonus:0,overdriveRateMult:1,startingOverdrive:0},this.evoPoints=0,this.tier=1,this.combo=0,this.maxCombo=0,this.comboTimer=0,this.overdrive=0,this.overdriveActive=0,this.popups=[],this._frontage=[],this.row=0,this.toNextRow=0,this.entryZ??(this.entryZ=-46),this.finaleRow=this.route.finale,this.lastRow=this.finaleRow+(this.route.siege?24:16),this.hitGuard=0,this.score=0,this.recruits=0,this.mergeCount=0,this.endTime=0;let t=this.route.wallHP;this.wall={x:4.13,z:-M0,hp:t,maxHp:t,flash:0};let n=this.route.bossHP;this.boss={x:-.42,z:this.entryZ-1.4,hp:n,maxHp:n,marched:0,hit:0,lift:0,active:!1,defeated:!1,removed:!1,skill:null,nextCast:0,kind:this.route.boss,vault:null,moveClock:0,special:0,pattern:0,brace:0,defeatAge:0,defeatKnockStage:0,knockbackVel:0,enraged:!1,attackT:0,slamChain:0,slamHand:0,impactDone:!1,pursuing:!1,yaw:0,recovery:0,leapFromX:0,leapFromZ:0,landX:0,landZ:0},this.gates=l0(this.stage,this.features),this.gates[2].cover=this.wall;for(let s of this.gates)s.coverSpec&&(s.cover=Ba(s.coverSpec,this.stage),this.features.push(s.cover));this.bossEntryStride=8.15,this.bossStride=1.08+(this.stage-1)*.14,this.marchSpeed=eu+(this.stage-1)*.12,this.wave=null,this.columns=Array.from({length:vl},(s,r)=>({index:r,minX:1/0,maxX:-1/0,units:[]}));for(let s=0;s<3;s++)this.recruit(this.x,!0,"rifle");this.refreshFormation(!0)}rand(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}grunt(e,t){let n=e+(this.rand()-.5)*.16;return{x:n,laneX:n,z:t+(this.rand()-.5)*.08,id:++this.sequence,phase:this.rand()*xl,marched:0,yaw:0,size:1.18+this.rand()*.16,alive:!0}}event(e,t,n,s,r=1,a=null){this.emit({kind:e,x:t,y:n,z:s,strength:r,supply:a})}notice(e){this.hint={id:++this.hintSequence,text:e}}addPopup(e,t,n,s,r="dmg"){this.popups.length>=26||this.popups.push({x:e,y:t,z:n,text:s,kind:r})}addLightning(e,t,n,s,r,a){this.lightningArcs.length>=28||this.lightningArcs.push({ax:e,ay:t,az:n,bx:s,by:r,bz:a,age:0,life:.24})}start(){this.phase==="ready"&&(this.phase="run",this.stage===1?this.notice("\u5148\u5403\u300C\u6B65\u5175+3\u300D\uFF0C\u518D\u5403\u91D1\u95E8\u300C\u5408\u6210\u8FDB\u5316\u300D\u5408\u51FA\u5927\u5175\uFF01"):this.stage===2?this.notice("\u96F7\u9706\u6797\u8C37\uFF1A\u6CE8\u610F\u5F2F\u9053\u5DE8\u6728\uFF0C\u6253\u7206\u7535\u78C1\u5854\u6E05\u5C4F\uFF01"):this.notice("\u7194\u5FC3\u88C2\u8C37\uFF1A\u8EB2\u907F\u7194\u5CA9\u55B7\u53D1\uFF0C\u5408\u51FA\u7EC8\u6781\u94A2\u94C1\u6307\u6325\u5B98\uFF01"))}aim(e,t=this.targetZ){this.targetZ=_n(t,0,K1),this.targetX=_n(e,-b0,b0)}get playing(){return this.phase==="run"||this.phase==="boss"||this.phase==="clear"}get roadSpeed(){return this.boss.active?this.boss.defeated?2.1:2.25-1.55*Tt(this.boss.z,-16,-9):3.65}get cannonDamage(){let e=gl(this.squad),t=(this.bonuses?.cannonMult||1)*(1+this.upgrades*.08);return Math.max(10,Math.round(e.power*t))}get highestUnitTier(){let e=1;for(let t of this.squad){let n=$t[t.kind].tier;n>e&&(e=n)}return e}applyBonuses(e){if(!e)return;this.bonuses={...this.bonuses,...e},e.startingOverdrive>0&&(this.overdrive=Math.min(100,e.startingOverdrive));let t=Math.max(0,Math.trunc(e.extraAllies||0));for(let n=0;n<t;n++)this.recruit(this.x,!0,"rifle");this.refreshFormation(!0)}refreshFormation(e=!1){_0(this.squad);let t=this.highestUnitTier;if(this.scale=1+(t-1)*.16,e)for(let n of this.squad)n.x=_n(this.x+n.formX,-6.2,6.2),n.z=this.captainZ+n.formZ}recruit(e,t=!1,n="rifle"){if(this.squad.length>=44&&!this.performMerge(1,!0))return null;let s=$t[n]||$t.rifle,r={id:++this.sequence,kind:s.id,hp:s.hp,maxHp:s.hp,x:_n(e+(this.rand()-.5)*.5,-6.2,6.2),z:this.captainZ+(this.rand()-.5)*.4,formX:0,formZ:0,age:t?2:0,phase:this.rand()*xl,hurt:0,recoil:0,fireTimer:.08+this.rand()*.24,slot:this.squad.length};return this.squad.push(r),t||(this.recruits++,this.addEvo(s.tier===1?1.5:4.5)),this.refreshFormation(t),r}performMerge(e=2,t=!1){let n=!1;for(let s=0;s<e;s++){let r=y0(this.squad,t);if(!r)break;n=!0,this.mergeCount++;let a=[...r.consumedIndices].sort((d,h)=>h-d),o=[],l=0,c=0;for(let d of a){let h=this.squad.splice(d,1)[0];o.push(h),l+=h.x,c+=h.z}l/=o.length,c/=o.length;let u=this.recruit(l,!1,r.output);if(u){u.x=l,u.z=c,u.age=0,u.mergeBirth=1;for(let d of o)this.merges.push({sx:d.x,sz:d.z,x:d.x,z:d.z,y:.2,kind:d.kind,target:u,age:0,duration:.34})}let f=$t[r.output];this.mergeGlow=1,this.addOverdrive(10),this.addEvo(f.tier*6),this.event(f.tier>=3?"evolve":"merge",l,.55,c,1+f.tier*.2),this.addPopup(l,1.85+f.tier*.25,c,r.label,"evolve"),f.tier>=3&&this.notice(r.label),this.refreshFormation(!1)}if(!n&&!t){this.upgrades++;for(let s=0;s<2;s++)this.recruit(this.x,!1,"rifle");this.addPopup(this.x,1.8,this.captainZ,"\u589E\u63F4\u5F3A\u5316 +2!","buff"),this.event("merge",this.x,.3,this.captainZ,1)}return n}addCombo(e=1){this.playing&&(this.combo+=e,this.combo>this.maxCombo&&(this.maxCombo=this.combo),this.comboTimer=3.4)}addOverdrive(e){if(!this.playing||this.overdriveActive>0)return;let t=this.bonuses?.overdriveRateMult||1;this.overdrive=Math.min(100,this.overdrive+e*t)}addEvo(e){if(!this.playing)return;this.evoPoints+=e;let t=this.highestUnitTier,n=Math.max(this.tier,t);for(let s of _l)this.evoPoints>=s.need&&s.tier>n&&(n=s.tier);if(n>this.tier){this.tier=n;let s=_l[n-1];this.mergeGlow=1,this.event("evolve",this.x,.35,this.captainZ,1.25),this.addPopup(this.x,2.35,this.captainZ,`\u519B\u56E2\u8FDB\u9636 \xB7 ${s.name}`,"evolve")}}get comboDamageMult(){return this.combo>=80?1.2:this.combo>=40?1.12:this.combo>=15?1.06:1}get critChance(){let e=_l[(this.tier||1)-1].critBonus,t=this.combo>=80?.16:this.combo>=40?.1:this.combo>=15?.05:0,n=this.overdriveActive>0?.38:0;return Math.min(.85,e+t+n+(this.bonuses?.critChanceBonus||0))}triggerOverdrive(){if(!this.playing||this.caught||this.overdrive<100||this.overdriveActive>0)return!1;this.overdrive=0,this.overdriveActive=4.4,this.buffs.shield=Math.max(this.buffs.shield,2),this.mergeGlow=1,this.recoil=1,this.event("overdrive",this.x,.4,this.captainZ,1.55),this.addPopup(this.x,2.4,this.captainZ,"\u6218\u672F\u8D85\u8F7D \xB7 \u7EC8\u6781\u9F50\u5C04!","evolve"),this.notice("\u6218\u672F\u8D85\u8F7D\u542F\u52A8\uFF01\u5168\u519B\u8D85\u9891 + \u62A4\u76FE\u5B88\u62A4");let e=Math.max(36,Math.round(this.cannonDamage*.52));for(let t of[-.24,-.12,0,.12,.24]){let n=this.launch(this.x+t*1.15,1.28,this.captainZ-.5,$i,1.55,e,t);n&&(n.crit=!0)}return!0}openCard(e){if(!e.active||e.cover?.hp>0)return;if(e.active=!1,e.collectedAt=this.elapsed,e.pop=0,this.event("supplyBreak",e.x,.62,e.z,1,e.type),this.addOverdrive(7),e.type==="blast"){let n=e.x;this.blast({x:n,power:6.2},e.z-1.5),this.boss.active&&Math.hypot(this.boss.x-n,this.boss.z-e.z+1.5)<5&&this.damageBoss({kind:"rocket"},140);return}let t=cn[e.type]||cn.plus;if(t.count){let n=t.unitKind||"rifle";for(let s=0;s<t.count;s++)this.deliveries.push({type:e.type,unitKind:n,slot:s,sx:e.x,sz:e.z,x:e.x,z:e.z,y:.46,age:-s*.055,progress:0,phase:this.rand()*xl});return}this.deliveries.push({type:e.type,slot:null,sx:e.x,sz:e.z,x:e.x,z:e.z,y:.46,age:0,progress:0,phase:this.rand()*xl})}updateDeliveries(e){for(let t of this.deliveries){if(t.age+=e,t.age<0)continue;let n=Math.min(1,t.age/.5),s=n*(2-n);if(t.progress=n,t.x=t.sx+(this.x-t.sx)*s,t.z=t.sz+(this.captainZ-t.sz)*s,t.y=.46*(1-n)+Math.sin(Math.PI*n)*(1+Math.min(1.2,Math.abs(t.sz)*.07)),!(n<1))if(t.slot!=null)this.recruit(this.x,!1,t.unitKind||"rifle"),this.event("plus",t.x,.16,t.z,.75);else if(t.type==="merge")this.performMerge(2,!1);else if(t.type==="double"){let r=Math.min(10,Math.max(4,Math.floor(this.squad.length*.75)));for(let a=0;a<r;a++)this.recruit(this.x,!1,"rifle");this.addPopup(this.x,2,this.captainZ,`\xD72 \u6269\u7F16 +${r}!`,"evolve"),this.event("evolve",this.x,.3,this.captainZ,1.15),this.performMerge(1,!0)}else if(t.type==="engineer")this.planks=Math.min(2,this.planks+1),this.notice("\u4FBF\u6865 +1\uFF0C\u9760\u8FD1\u7F3A\u53E3\u81EA\u52A8\u67B6\u6865"),this.event("merge",this.x,.23,this.captainZ,1,t.type);else{let r=t.type==="fever"?4.8:t.type==="shield"?5.5:6.5;this.buffs[t.type]=r,this.mergeGlow=1,this.addPopup(this.x,1.9,this.captainZ,cn[t.type].label+"!","buff"),this.event("merge",this.x,.23,this.captainZ,1,t.type)}}kr(this.deliveries,t=>t.progress<1);for(let t of this.merges){t.age+=e;let n=_n(t.age/t.duration,0,1),s=t.target?t.target.x:this.x,r=t.target?t.target.z:this.captainZ,a=(1-n)*Math.sin(n*Math.PI*2.5)*.55;t.x=t.sx+(s-t.sx)*n*n+a,t.z=t.sz+(r-t.sz)*n*n,t.y=.25+Math.sin(Math.PI*n)*.95}kr(this.merges,t=>t.age<t.duration)}crossGates(){for(let e of this.gates){if(e.z=this.distance-e.at,!e.active){e.pop=this.elapsed-e.collectedAt;continue}this.caught||Math.abs(e.z-this.captainZ)>.9||Math.abs(this.x-e.x)<=_i/2+.35&&this.openCard(e)}}marchPastBoss(e,t){let n=this.boss,s=e.z-n.z;if(!e.passSide&&e.x===e.laneX&&(s<-3.3||s>6.4))return;let r=n.attackT>0?n.landZ:n.z+.45,a=1-Tt(Math.abs(s),1.45,3.25),o=n.attackT>0?1-Tt(Math.abs(e.z-r),1.25,3.45):0,l=Math.max(1.42*a,1.9*o*Tt(n.attackT,0,.31));if(l?e.passSide||(e.passSide=e.x<n.x?-1:1):e.passSide=0,!l&&e.x===e.laneX)return;let c=e.passSide||1,u=Math.max(.2,c>0?6.4-n.x:n.x+6.4),f=_n(Math.abs(e.laneX-n.x)/u,0,1),d=e.laneX+c*l*(1-f);e.x+=(d-e.x)*(1-Math.exp(-9*t)),!l&&Math.abs(e.x-e.laneX)<.002&&(e.x=e.laneX)}spawnRow(){let e=Math.floor(this.row/yl),t=this.row%yl;if(!this.wave||this.row%(yl*2)===0){let a=Math.floor(e/2)+(this.stage-1)*2,o=this.stage%2?1:-1;this.wave=S0[a%S0.length].map(u=>u*o);let l=this.distance+6+(-this.entryZ-6)*3.65/(3.65+this.marchSpeed),c=this.gates.find(u=>u.coverSpec&&Math.abs(u.at-l)<5.2);if(c&&a%3!==2){let u=c.coverSpec.lane;this.wave=this.wave.filter(f=>f!==u),this.wave.length||(this.wave=[u===0?o:0])}}let n=this.wave.length===1,r=this.row>=this.finaleRow-40?this.route.siege?.72:.5:1;for(let a of this.columns){let o=a.index,l=n?9:o<6?6:5,c=Math.max(2,Math.round(Math.min(l,l*(.35+.65*this.route.pressure))*r)),u=n||o<6?o:o-6,f=this.wave[n||o<6?0:1];if(u>=c||t<2&&(u===0||u===c-1))continue;let d=n?.54:.64,h=(this.row%2-.5)*.16,p=ji(f)+(u-(c-1)/2)*d+h,x=this.entryZ-.86-.14*(u%2),g=a.units.at(-1),m=g?Math.min(x,g.z-.52):x,v=this.grunt(p,m);if(a.minX=Math.min(a.minX,v.x),a.maxX=Math.max(a.maxX,v.x),t===5&&a.index===e*7%vl){let M=this.stage===1?["gunner","brute"]:this.stage===2?["gunner","guard","weaver","vault"]:["gunner","guard","bomber","brute","standard"];v.role=M[(e+this.stage)%M.length];let _=v.role==="brute"||v.role==="guard";v.size*=_?1.32:1.1,v.hp=_?10+this.stage*2:4+this.stage,v.speed=_?2.05:v.role==="weaver"?3.45:2.82,this.runners.push(v)}else t===2&&(a.index===e*3%vl||a.index===(e*3+5)%vl)?(v.speed=3.45+this.rand()*.25,this.runners.push(v)):a.units.push(v)}this.row++}moveGrunt(e,t,n){if(this.phase==="clear"&&(e.spent||e.z>this.captainZ+.75)&&(!e.overBody||e.z>e.overBody.z+1.06)){e.spent=!0,e.overBody=null;let u=this.x+(e.id%5-2)*.28,f=this.captainZ-2.15-e.id%3*.28,d=_n(u-e.x,-5.1*t,5.1*t),h=_n(f-e.z,-4.7*t,4.7*t);e.x+=d,e.z+=h,e.marched+=Math.hypot(d,h-this.worldAdvance),Math.abs(h)+Math.abs(d)>.001&&(e.yaw+=(Math.atan2(d,h)-e.yaw)*(1-Math.exp(-7*t)));return}let s=e.speed>=3.12,r=!e.spent&&e.z>=this.captainZ+(s?-8.4:-6.9)&&e.z<this.captainZ+1.65,a=e.x,o=e.speed??this.marchSpeed,l=0;if(r){let u=this.x,f=this.captainZ,d=1/0;for(let g of n){let m=Math.abs(g.x-e.x);m<d&&(d=m,u=g.x,f=g.z)}o*=s?1.48:1.32;let h=Math.max(.075,(f-e.z-.32)/(this.worldAdvance/t+o)),p=s?12.2:11.6,x=(e.id%7-3)*.065;l=_n((u+x-e.x)/h,-p,p)*t,e.role==="weaver"&&(l+=Math.sin(e.phase+e.marched*7)*t*.74),e.x+=l}else if(e.spent)e.overX!=null&&(e.x+=_n(e.overX-e.x,-3.3*t,3.3*t));else if(this.boss.active&&!this.boss.defeated){let u=e.x;this.marchPastBoss(e,t),l=e.x-u}if(this.activeGround.length?g0(this,e,t):e.lift=0,!e.alive)return;this.buffs.frost>0&&(o*=.48,e.x=a+(e.x-a)*.6),Math.abs(e.z-this.rallyZ)<2.7&&(o*=1.17),l=e.x-a;let c=o*t;e.z+=this.worldAdvance+c,e.marched+=Math.hypot(c,l),e.yaw+=(Math.atan2(l,c)-e.yaw)*(1-Math.exp(-9*t)),e.role==="gunner"&&!e.fired&&e.z>=-14&&e.z<-4&&this.enemyFireTimer<=0&&(this.enemyRound(e.x,e.z,.65,0,e),e.fired=!0),!e.spent&&e.z>this.captainZ-2.3&&e.z<this.captainZ+2.3&&this.contact(e)}advanceCrowd(e){this.rallyZ=this.runners.find(n=>n.alive&&n.role==="standard"&&n.z>-10)?.z??-100;let t=this._frontage;t.length=0;for(let n=0;n<this.squad.length;n++){let s=this.squad[n];s.z<=this.captainZ+.5&&t.push(s)}for(let n of this.columns){n.minX=1/0,n.maxX=-1/0;let s=0,r=!1;for(let a of n.units)a.alive&&(this.moveGrunt(a,e,t),!(!a.alive||a.z>10&&this.phase!=="clear")&&(n.minX=Math.min(n.minX,a.x),n.maxX=Math.max(n.maxX,a.x),s&&n.units[s-1].z<a.z&&(r=!0),n.units[s++]=a));n.units.length=s,r&&n.units.sort((a,o)=>o.z-a.z)}for(let n of this.runners)n.alive&&this.moveGrunt(n,e,t);for(kr(this.runners,n=>n.alive&&(n.z<10||this.phase==="clear")),this.toNextRow-=this.worldAdvance+this.marchSpeed*e;this.row<this.lastRow&&this.toNextRow<=0;)this.spawnRow(),this.toNextRow+=this.route.rowSpacing+(this.row%yl===0?.38:0),this.row>=70&&Math.abs(this.row-this.finaleRow)>10&&(this.row-70)%this.route.restEvery===0&&(this.toNextRow+=this.route.restLength)}pickVictimIndex(e,t,n=.72){let s=!1;for(let l=0;l<this.squad.length;l++){let c=this.squad[l],u=.36*$t[c.kind].scale;if(Math.abs(c.x-e)<u+.16&&Math.abs(c.z-t)<u+.16){s=!0;break}}if(!s)return-1;let r=-1,a=1/0,o=1/0;for(let l=0;l<this.squad.length;l++){let c=this.squad[l],u=$t[c.kind],f=Math.hypot(c.x-e,c.z-t),d=u.tier===1?Math.max(n,2.35):n+u.scale*.25;if(f>d)continue;let h=c.kind==="shield"?0:u.tier;(h<a||h===a&&f<o)&&(a=h,o=f,r=l)}return r}damageUnitAt(e,t,n="infantry",s=.85,r=null){if(e<0||e>=this.squad.length)return!1;let a=this.squad[e];if(a.hp--,a.hurt=1,this.hurt=Math.max(this.hurt,.85),a.hp>0)return this.event("shieldHit",a.x,.45,a.z,.8),this.addPopup(a.x,1.15,a.z,`HP ${a.hp}/${a.maxHp}`,"rocket"),!0;this.squad.splice(e,1);let o=this.fall(a,"blue",s,t);return o.size=$t[a.kind].scale,s===0&&(o.prone=!0,o.dir=a.x>=t?1:-1),this.refreshFormation(!1),this.squad.length===0&&(this.lossReason=n,this.finish(!1,r)),!0}damageSquadArea(e,t,n,s=3,r="slam",a=""){if(!this.playing||!this.squad.length)return 0;if(this.buffs.shield>0)return this.event("shieldHit",this.x,.7,this.captainZ),0;let o=[];for(let c=0;c<this.squad.length;c++){let u=this.squad[c],f=Math.hypot(u.x-e,u.z-t);f<=n+.28*$t[u.kind].scale&&o.push({u,d:f,rank:u.kind==="shield"?0:$t[u.kind].tier})}if(!o.length)return 0;o.sort((c,u)=>c.rank-u.rank||c.d-u.d);let l=0;for(let c of o){if(l>=s||!this.playing)break;let u=this.squad.indexOf(c.u);u<0||(this.damageUnitAt(u,e,r,a==="engine"?1.5:1.15),l++)}return l>0&&this.combo>=5&&(this.combo=0,this.comboTimer=0),l}contact(e){if(!this.playing||this.caught||!this.squad.length)return!1;let t=this.pickVictimIndex(e.x,e.z,.78);if(t<0)return!1;let n=e.startZ!=null;if(n||e.role==="bomber"?e.alive=!1:(e.spent=!0,e.overX=this.squad[t].x),this.hitGuard>0)return!0;if(this.hitGuard=this.buffs.shield>0?.36:this.route.contactGrace,this.buffs.shield>0)return this.event("shieldHit",e.x,.35,e.z),!0;if(this.combo>=6&&(this.combo=0,this.comboTimer=0),e.role==="bomber")return this.event("impact",e.x,.1,e.z,.9),this.damageSquadArea(e.x,e.z,1.35,3,"infantry"),!0;let s=this.squad[t],r=n&&e.shooter===this.boss?"bossShot":"infantry";return this.damageUnitAt(t,e.x,r,n?.7:0,n?e.shooter:e),!n&&s.hp<=0&&this.falling.length&&(e.overBody=this.falling[this.falling.length-1]),!0}enemyRound(e,t,n,s=0,r=this.boss){let o=this.x+s-e,l=Math.max(1,this.captainZ-t),c=Math.hypot(o,l);this.incoming.push({x:e,z:t,y:n,startY:n,startZ:t,shooter:r,vx:o*7.4/c,vz:l*7.4/c,alive:!0}),this.enemyFireTimer=1.35,this.event("hostileMuzzle",e,n,t)}advanceIncoming(e){this.enemyFireTimer=Math.max(0,this.enemyFireTimer-e);for(let t of this.incoming)t.x+=t.vx*e,t.z+=t.vz*e,t.y=.45+(t.startY-.45)*_n(t.z/t.startZ,0,1),t.z>this.captainZ-2.3&&t.z<this.captainZ+2.3&&this.contact(t)&&this.event("hostileMuzzle",t.x,t.y,t.z);kr(this.incoming,t=>t.alive&&t.z<6)}pushWall(e,t=this.wall,n=2.14){let s=(r,a,o)=>t.hp>0&&Math.abs(r-t.x)<n+o&&Math.abs(a-t.z)<.34+o;for(let r=this.squad.length-1;r>=0;r--){let a=this.squad[r];if(s(a.x,a.z,.22)&&this.squad.length>1){this.squad.splice(r,1);let o=this.fall(a,"blue",0);o.pushed=!0,o.front=t.z+.55}}!this.caught&&s(this.x,this.captainZ,.36)&&(this.caught=!0,this.caughtBy=t),this.caught&&this.caughtBy===t&&(this.captainZ=Math.max(this.captainZ,t.z+.42),this.captainZ>=4.5&&(this.lossReason="wall",this.finish(!1)))}fall(e,t,n,s=e.x){if(this.falling.length>=96){let a=this.falling.findIndex(o=>o.side==="red");this.falling.splice(a<0?0:a,1)}let r={x:e.x,z:e.z,y:.07,t:0,side:t,phase:e.phase||0,size:e.size||1,id:e.id||0,vx:(e.x-s)*1.15+(this.rand()-.5)*3.1*n,vz:(this.rand()-.5)*2.6*n,vy:(1.85+this.rand()*2.5)*n,spin:(this.rand()-.5)*8.5,roll:(this.rand()-.5)*7.5};return this.falling.push(r),r}kill(e,t=1,n=e.x){!e.alive||e.overBody&&e.z<e.overBody.z+.84||(e.alive=!1,this.score++,this.addCombo(1),this.addOverdrive(.75),this.addEvo(.18),this.buffs.fever<=0&&(this.feverMeter+=.25,this.feverMeter>=100&&(this.feverMeter=0,this.buffs.fever=4.2,this.event("merge",this.x,.2,this.captainZ))),this.fall(e,"red",t,n))}closeEnemy(e,t){let s=null,r=(a,o)=>{let l=t-a.z;l<0||l>2.6+o||Math.hypot(a.x-e,l)>2.6+o||(!s||a.z>s.z||a.z===s.z&&Math.abs(a.x-e)<Math.abs(s.x-e))&&(s=a)};this.boss.active&&!this.boss.defeated&&r(this.boss,.85);for(let a of this.columns)if(!(a.maxX<e-2.6-.25||a.minX>e+2.6+.25))for(let o of a.units){if(o.z<t-2.6-.25)break;o.alive&&r(o,.2)}for(let a of this.runners)a.alive&&r(a,.2);return s}launch(e,t,n,s,r,a,o=0,l=""){let c=1/Math.hypot(1,o),u={kind:s===$i?"rocket":"shot",profile:s,weaponTag:l,power:r,damage:a,headingX:o*c,headingZ:-c,startX:e,startY:t,startZ:n,x:e,y:t,z:n,distance:0,range:this.buffs.range>0||this.buffs.longshot>0?r0:s0,age:0,afterHit:0,finished:!1,pierce:s===Ji||l==="tesla"||l==="chainArc"?2:this.buffs.longshot>0&&s!==$i?1:0},f=this.firstHit(u,u.range);if(o===0&&(!f||f.distance>2.4)){let h=this.closeEnemy(e,n);if(h){let p=h.x-e,x=Math.min(-.06,h.z-n),g=Math.hypot(p,x);u.headingX=p/g,u.headingZ=x/g,u.range=Math.min(u.range,g+.75),f=this.firstHit(u,u.range)}}u.aimDistance=Math.max(.12,f?f.distance:u.range),u.endY=f?.target===this.boss?En[this.boss.kind].aim:f?.target===this.wall||f?.target.type||f?.target.mechanism?.72:.48;let d=(this.boss.z-n)/u.headingZ;return s===$i&&this.boss.active&&!this.boss.defeated&&d>0&&d<u.range&&Math.abs(e+u.headingX*d-this.boss.x)<=1.3&&f?.target!==this.wall&&!f?.target.type&&!f?.target.mechanism&&(u.aimDistance=Math.max(.12,d),u.endY=En[this.boss.kind].aim),u.lift=s.lift*Math.min(1,u.aimDistance/9),this.shots.push(u),u}shoot(e){let t=_l[(this.tier||1)-1],n=this.buffs.fever>0||this.overdriveActive>0,s=t.fireRate*(n?1.55:this.buffs.rapid>0?1.36:1)*(this.chill>0?.75:1),r=(this.bonuses?.cannonMult||1)*(1+this.upgrades*.08),a=this.critChance,o=!1;for(let l of this.squad){if(l.age<.14)continue;l.recoil=Math.max(0,l.recoil-e*5.2);let c=$t[l.kind];if(l.fireTimer-=e*s*c.fireRate,l.fireTimer>0)continue;let u=c.weapon==="cannon"||c.weapon==="titanCannon"?.64:c.weapon==="miniRocket"?.56:.3;l.fireTimer+=u,l.recoil=1;let f=c.damage*r,d=a>0&&this.rand()<a,h=l.x+.14*c.scale,p=.58*c.scale,x=l.z-.25*c.scale;if(c.weapon==="titanCannon"){let g=this.launch(h,p*1.15,x-.25,$i,1.55,f,0,"titan");g&&d&&(g.crit=!0);for(let m of[-1,1]){let v=this.launch(l.x+m*.55,p,x,Ji,1,f*.34,m*.09,"chainArc");v&&(v.crit=!0)}this.recoil=1,this.event("muzzle",h,p*1.15,x-.25,1.45)}else if(c.weapon==="cannon"){let g=this.launch(h,p*1.18,x-.22,$i,1.25,f,0,"cannon");g&&d&&(g.crit=!0),this.recoil=1,this.event("muzzle",h,p*1.18,x-.22,1.15)}else if(c.weapon==="miniRocket"){let g=this.launch(h,p*1.05,x,$i,.85,f,0,"flame");g&&d&&(g.crit=!0),this.event("muzzle",h,p,x,.82)}else if(c.weapon==="chainArc"||c.weapon==="tesla"){let g=this.launch(h,p,x,Ji,1,f,0,c.weapon);g&&d&&(g.crit=!0),o=!0}else if(c.weapon==="twin"){for(let g of[-.14,.14]){let m=this.launch(l.x+g,p,x,Fr,1,f*.65,g*.12,"twin");m&&d&&(m.crit=!0)}o=!0}else if(c.weapon==="flame"){let g=this.launch(h,p,x,Fr,.72,f,0,"flame");g&&(g.crit=!0),o=!0}else{let g=n||this.buffs.plasma>0,m=g?Ji:c.weapon==="pulse"?Fr:Vh,v=this.launch(h,p,x,m,1,g?f*1.45:f);v&&d&&(v.crit=!0),(n||this.buffs.spread>0)&&l.id%2===0&&this.launch(h,p,x,Vh,1,f*.9,(this.volley%2?1:-1)*.085),o=!0}}if(o&&(this.volley++,this.event("smallShot",this.x,.6,this.captainZ,.7)),this.supportTimer-=e,(this.buffs.drone>0||this.overdriveActive>0)&&this.supportTimer<=0){this.supportTimer=.34;for(let l of[-1,1]){let c=this.launch(this.x+l*1.25,1.32,this.captainZ-.32,Ji,1,8*r,0,"chainArc");c&&(c.crit=!0)}}}chainLightning(e,t,n,s=2,r=8){let a=e,o=t,l=new Set([n]);for(let c=0;c<s;c++){let u=null,f=3.2;for(let d of this.columns)if(!(d.maxX<a-3.3||d.minX>a+3.3))for(let h of d.units){if(!h.alive||l.has(h))continue;let p=Math.hypot(h.x-a,h.z-o);p<f&&(f=p,u=h)}if(!u)break;l.add(u),this.addLightning(a,.58,o,u.x,.58,u.z),u.hp!=null&&(u.hp-=r),(u.hp==null||u.hp<=0)&&this.kill(u,.95,a),a=u.x,o=u.z}}firstHit(e,t){let n=e.headingX,s=e.headingZ,r=e.x+n*t,a=e.z+s*t,o=e.kind==="rocket"?.16:.08,l=null,c=(d,h,p)=>{if(d.overBody&&d.z<d.overBody.z+.84)return;let x=h+o,g=p+o,m=Math.max(0,(d.z+g-e.z)/s),v=Math.min(t,(d.z-g-e.z)/s);if(Math.abs(n)<1e-6){if(Math.abs(e.x-d.x)>x)return}else{let M=(d.x-x-e.x)/n,_=(d.x+x-e.x)/n;m=Math.max(m,Math.min(M,_)),v=Math.min(v,Math.max(M,_))}if(!(m>v||l&&m>=l.distance)){if(e.aimDistance!==void 0&&d!==this.wall&&!d.type&&!d.mechanism){let M=d.lift||0,_=M+(d===this.boss?En[d.kind].height:.92*(d.size||1))+o,b=hl(e,e.distance+m),S=hl(e,e.distance+v);if(Math.min(b,S)>_||Math.max(b,S)<M-o)return;b>_&&b>S&&(m+=(v-m)*(b-_)/(b-S))}l={target:d,distance:m}}},u=Math.min(e.x,r),f=Math.max(e.x,r);this.wall.hp>0&&this.wall.z>=a-.5&&this.wall.z<=e.z+.5&&c(this.wall,2.1,.32);for(let d of this.features)d.target&&d.state==="ready"&&d.target.z>=a-.8&&d.target.z<=e.z+.8&&d.target.x+d.half+o>=u&&d.target.x-d.half-o<=f&&c(d.target,d.half,d.depth);for(let d of this.gates)d.active&&!(d.cover?.hp>0)&&d.z>=a-.36&&d.z<=e.z+.36&&d.x+_i/2+o>=u&&d.x-_i/2-o<=f&&c(d,_i/2,.15);this.boss.active&&!this.boss.defeated&&c(this.boss,1.32,.72);for(let d of this.columns)if(!(d.maxX<u-.42||d.minX>f+.42))for(let h of d.units){if(h.z<a-.48)break;h.alive&&h.z<e.z+.48&&c(h,.3,.28)}for(let d of this.runners)d.alive&&d.z>=a-.5&&d.z<=e.z+.5&&d.x+.5>=u&&d.x-.5<=f&&c(d,.25*d.size,.23*d.size);return l}blast(e,t){let n=1.05+e.power*.52;for(let s of this.columns)if(!(s.maxX<e.x-n||s.minX>e.x+n))for(let r of s.units){if(r.z<t-n)break;r.alive&&(r.x-e.x)**2+(r.z-t)**2<n*n&&this.kill(r,1.25,e.x)}for(let s of this.runners)s.alive&&(s.x-e.x)**2+(s.z-t)**2<n*n&&this.kill(s,1.25,e.x);this.event("impact",e.x,.08,t,e.power)}damageBoss(e,t){let n=this.boss;n.defeated||(n.hp=Math.max(0,n.hp-t*(n.brace>.6?.55:1)),n.hit=e.kind==="rocket"?.85:Math.max(n.hit,.16),e.kind==="rocket"&&n.z>-18&&!n.vault&&(n.z-=.08),n.hp<=0&&(n.defeated=!0,n.skill=null,n.attackT=0,n.slamChain=0,n.defeatAge=0,n.defeatKnockStage=0,n.knockbackVel=7.4,this.phase="clear",this.lastRow=this.row,this.event("finisher",n.x,2.1,n.z,1.6),this.addPopup(n.x,2.8,n.z,"\u51FB\u9000\u7EC8\u7ED3!","evolve")))}resolveHit(e,t){if(t.mechanism){d0(this,t.mechanism,e);return}if(t===this.wall)t.hp=Math.max(0,t.hp-e.damage*.76),t.flash=1,this.event(t.hp<=0?"wallBreak":"wallHit",e.x,.85,e.z,e.kind==="rocket"?1.15:.45);else if(t.type&&cn[t.type])t.hp=Math.max(0,t.hp-e.damage),t.flash=1,t.hp<=0?this.openCard(t):this.event("cardHit",e.x,.6,e.z,.7,t.type);else if(t===this.boss){let n=!!e.crit,s=this.comboDamageMult*(n?1.48:1),r=e.damage*(e.profile===$i?3.2:1)*s,a=r*(this.boss.brace>.6?.55:1);this.event(e.kind==="rocket"?"impact":n?"critHit":"hit",e.x,e.y,e.z,e.kind==="rocket"?e.power*.75:n?.95:.7),(e.kind==="rocket"||n)&&this.addPopup(e.x+(this.rand()-.5)*.5,e.y+.45,e.z,n?`${Math.round(a)}!`:`${Math.round(a)}`,n?"crit":"rocket"),this.addOverdrive(e.kind==="rocket"?2.5:.4),e.kind==="rocket"?this.addCombo(1):this.comboTimer>0&&(this.comboTimer=Math.max(this.comboTimer,2.4)),this.damageBoss(e,r)}else if(e.kind==="rocket"||e.weaponTag==="flame"){this.blast({x:e.x,power:e.kind==="rocket"?e.power:.55},t.z);let n=this.boss;n.active&&n.lift<.85&&Math.hypot(e.x-n.x,t.z-n.z)<1.65+e.power*.48&&this.damageBoss(e,e.damage*.65)}else{let n=!!e.crit,s=e.damage*(n?1.5:1);t.hp!=null&&(t.hp-=s*(t.role==="guard"&&e.profile!==Ji?.65:1)),(t.hp==null||t.hp<=0)&&this.kill(t,n?1.05:.72),(e.weaponTag==="tesla"||e.weaponTag==="chainArc")&&this.chainLightning(e.x,e.z,t,e.weaponTag==="chainArc"?3:2,s*.75),n&&t.role&&this.addPopup(e.x,.9,e.z,`${Math.round(s)}!`,"crit"),this.event(n?"critHit":"hit",e.x,.45,e.z,n?.85:.65)}}advanceShots(e){let t=[];for(let n of this.shots){if(n.age+=e,n.finished){n.afterHit+=e,n.afterHit*n.profile.speed<n.profile.tail&&t.push(n);continue}let s=Math.min(e*n.profile.speed,n.range-n.distance);for(;s>0&&!n.finished&&this.playing;){let r=this.firstHit(n,s),a=r?r.distance:s;n.distance+=a,!r&&n.range-n.distance<1e-8&&(n.distance=n.range),s-=a,Or(n,n.distance,n),r&&this.resolveHit(n,r.target);let o=r&&n.pierce>0&&r.target.alive===!1;o&&n.pierce--,n.finished=!!r&&!o||n.distance>=n.range-1e-8}if(!this.playing)break;t.push(n)}this.shots=this.playing?t:[]}updateFalling(e){for(let t of this.falling){if(t.prone){t.t+=e,t.z+=this.worldAdvance;continue}if(t.intoGap){t.t+=e,t.vy-=e*8,t.y+=t.vy*e,t.z+=this.worldAdvance;continue}if(t.pushed){t.z=Math.max(t.z,t.front),t.z+=this.worldAdvance,t.y=0,t.z>7&&(t.t=2);continue}t.t+=e,t.x+=t.vx*e,t.z+=t.vz*e+this.worldAdvance*.38,t.y+=t.vy*e,t.vy-=(t.gravity??8.6)*e,t.y<.05&&(t.y=.05,t.vx*=.9,t.vz*=.9)}kr(this.falling,t=>t.t<(t.prone?this.overrun?4.9:2.1:1.02))}slamSquad(){let e=this.boss,t=e.slamHand===2,n=t?2.05*1.18:2.05;this.event("slam",e.landX,.1,e.landZ,t?1.45:1.08),this.damageSquadArea(e.landX,e.landZ,n,t?4:2,"slam")}advanceBoss(e){let t=this.boss;if(t.defeated){let d=t.defeatAge;if(t.defeatAge+=e,t.defeatAge<.85){let h=t.knockbackVel*e;t.z-=h,t.knockbackVel=Math.max(1.4,t.knockbackVel-e*6.8),t.marched-=h*1.3;let p=Math.floor(t.defeatAge/.16);if(p>t.defeatKnockStage){t.defeatKnockStage=p,t.hit=1;let x=t.x+(this.rand()-.5)*1.4,g=1.2+this.rand()*1.1;this.event("critHit",x,g,t.z+.4,1.25)}}else if(!t.removed){let h=Math.max(0,1-(t.defeatAge-.85)/.55)*2.2*e;t.z-=h,d<1.36&&t.defeatAge>=1.36&&this.landBoss()}d<2.05&&t.defeatAge>=2.05&&(t.removed=!0,this.event("bossBurst",t.x,.72,t.z-1.3,1.65)),t.removed&&t.defeatAge>2.45&&!this.flanks.length&&!this.deliveries.length&&this.row>=this.lastRow&&!this.runners.length&&this.columns.every(h=>h.units.length===0)&&this.finish(!0);return}if(!t.active){this.row>=this.finaleRow&&(t.z=this.entryZ-1.5,t.active=!0,this.phase="boss",this.route.vault?p0(this):t.x=t.escortX=ka(this,t.z-1.3,t.z+6).x);return}if(a0(this,e),!this.playing)return;if(t.vault){v0(this,e);return}if(t.recovery=Math.max(0,t.recovery-e),t.attackT>0){let d=t.enraged?1.18:1;t.attackT+=e*d;let h=Tt(t.attackT,.35,.62);if(t.x=t.leapFromX+(t.landX-t.leapFromX)*.48*h,t.z=t.leapFromZ+(t.landZ-1.85-t.leapFromZ)*.42*h,t.lift=t.slamHand===2?Math.sin(Math.PI*Tt(t.attackT,.16,.62))*1.15:0,t.attackT>=.62&&!t.impactDone&&(t.impactDone=!0,this.slamSquad()),t.attackT>=.86){t.slamChain--;let p=ml(this);t.slamChain>0&&this.playing&&p.distance<=5.4?(t.slamHand=(t.slamHand+1)%3,t.leapFromX=t.x,t.leapFromZ=t.z,t.landX=_n(p.x+(t.slamHand===0?-.4:t.slamHand===1?.4:0),-5.2,5.2),t.landZ=_n(p.z,-2.5,2),t.attackT=.001,t.impactDone=!1):(t.attackT=0,t.lift=0,t.recovery=t.enraged?.48:.72)}return}for(let d of this.activeGround){if(d.crossed||!er(d)||Math.abs(t.x-d.x)>1.9)continue;let h=d.z-d.length/2-t.z;if(h<=1.05&&h>=-.5){x0(this,d);return}}t.moveClock+=e;let n=t.moveClock%5.2;t.brace=t.kind==="warden"?Tt(n,.92,1.32)*(1-Tt(n,2.45,2.95)):0,t.special=t.kind==="drill"?Tt(n,1.1,1.55)*(1-Tt(n,2.35,2.85)):0;let s=t.skill?.kind==="warden"&&t.skill.fired&&!t.skill.marks[0].hit?2.2:0;!t.pursuing&&t.z>=this.captainZ-11.5&&(t.pursuing=!0);let r=t.pursuing?ml(this):null,a=1-Tt(t.z,-23,-15),o=t.pursuing?t.enraged?3.35:2.9:this.bossStride+(this.bossEntryStride-this.bossStride)*a,l=e*o*(1-.38*t.brace+.78*t.special+s);if(c0(this,e,r,l),!t.pursuing||t.recovery>0||t.skill)return;let c=ml(this);if(c.distance>4.6)return;let u=_n(c.x,-5.2,5.2),f=_n(c.z,-2.5,2);h0(this,u,f-.68)&&(t.leapFromX=t.x,t.leapFromZ=t.z,t.landX=u,t.landZ=f,t.slamHand=0,t.slamChain=t.enraged?4:3,t.attackT=.001,t.impactDone=!1)}landBoss(){this.event("victory",this.boss.x,.12,this.boss.z-1.65,1.35)}finish(e,t=null){if(this.playing){if(this.phase=e?"won":"lost",this.endTime=0,this.shots=[],this.incoming=[],e){let n=[...this.squad].sort((s,r)=>s.z-r.z);for(let s=0;s<n.length;s+=5){let r=n.slice(s,s+5).sort((a,o)=>a.x-o.x);r.forEach((a,o)=>{a.exitX=(o-(r.length-1)/2)*.68,a.exitZ=Math.floor(s/5)*.78})}this.parade={complete:!1,originX:this.x},this.recoil=0,this.event("rally",this.x,.14,this.captainZ);return}if(this.event("loss",this.x,0,this.captainZ),this.lossReason==="infantry"){let n=t?.alive&&t.id?t:null;if(!n)for(let s of this.columns){for(let r of s.units)if(r.alive&&r.z<=this.captainZ+.5){n=r;break}if(n)break}n||(n=this.grunt(this.x,this.entryZ-1),this.runners.push(n)),this.overrun={x:this.x,z:this.captainZ,crossed:!1,attacker:n.id,approach:Math.max(2.35,(this.captainZ-n.z+1.6)/3.5)}}else this.event("impact",this.x,0,this.captainZ,1.25)}}advanceOverrun(e){let t=this.overrun;this.worldAdvance=.36*e,this.distance+=this.worldAdvance,this.captainZ+=this.worldAdvance,t.z=this.captainZ,this.wall.z+=this.worldAdvance;for(let s of this.gates)s.z+=this.worldAdvance;for(let s of this.features)s.z+=this.worldAdvance;let n=s=>{if(!s.alive||s.z>10)return;let r=s.id===t.attacker,a=(r?Math.max((s.speed||eu)*1.68,t.approach):(s.speed||eu)*1.68)*e,o=0;if((r||s.z>t.z-7)&&s.z<t.z+.46){let c=s.id===t.attacker?0:(s.id%7-3)*.15,u=r?11:4.9;o=_n(t.x+c-s.x,-u*e,u*e),s.x+=o}let l=s.z;s.z+=a+this.worldAdvance,s.marched+=Math.hypot(o,a),s.yaw+=(Math.atan2(o,a)-s.yaw)*(1-Math.exp(-8*e)),l<t.z+1.05&&s.z>=t.z+1.05&&Math.abs(s.x-t.x)<1.15&&(t.crossed=!0)};for(let s of this.columns)for(let r of s.units)n(r);this.runners.forEach(n)}advanceParade(e){let t=this.parade;if(t.complete)return;let n=this.endTime,r=(7.4+Math.min(18,n*8.6))*Tt(n,.12,.58)*e;this.x=t.originX*(1-Tt(n,.16,1.65)),this.velocity=0,this.captainZ-=r;let a=this.captainZ;for(let o of this.squad)o.age+=e,o.x+=(this.x+o.exitX-o.x)*(1-Math.exp(-4.8*e)),o.z-=r,o.z+=(this.captainZ+o.exitZ-o.z)*(1-Math.exp(-4.2*e)),a=Math.max(a,o.z);t.complete=a<this.entryZ-2.8}get resultReady(){return this.parade?this.parade.complete:this.boss.defeated&&this.boss.defeatAge<2.45?!1:this.overrun?this.overrun.crossed&&this.endTime>=2.2:this.endTime>.86}tick(e,t=0,n=0){this.worldAdvance=0;for(let r of this.lightningArcs)r.age+=e;if(kr(this.lightningArcs,r=>r.age<r.life),!this.playing){(this.phase==="won"||this.phase==="lost")&&(this.endTime+=e,this.parade&&this.advanceParade(e),this.overrun&&this.advanceOverrun(e),this.phase==="lost"&&this.boss.defeated&&this.boss.defeatAge<2.45&&this.advanceBoss(e),this.boss.hit=Math.max(0,this.boss.hit-4*e),this.updateFalling(e));return}this.elapsed+=e,this.chill=Math.max(0,this.chill-e),this.overdriveActive=Math.max(0,this.overdriveActive-e),this.comboTimer>0&&(this.comboTimer=Math.max(0,this.comboTimer-e),this.comboTimer<=0&&(this.combo=0));for(let r of Object.keys(this.buffs))this.buffs[r]=Math.max(0,this.buffs[r]-e);for(let r of this.gates)r.flash=Math.max(0,r.flash-e*7);if(this.hitGuard=Math.max(0,this.hitGuard-e),this.hurt=Math.max(0,this.hurt-4*e),this.mergeGlow=Math.max(0,this.mergeGlow-2.25*e),this.recoil=Math.max(0,this.recoil-5.1*e),this.wall.flash=Math.max(0,this.wall.flash-4.6*e),this.boss.hit=Math.max(0,this.boss.hit-5.4*e),this.visualScale+=(this.scale-this.visualScale)*(1-Math.exp(-8*e)),this.caught&&this.caughtBy?.hp<=0&&(this.caught=!1,this.caughtBy=null),t||n){let r=t*(this.targetX-this.x)<0?this.x:this.targetX;this.aim(r+t*10.6*e,this.targetZ+n*3.4*e)}this.caught||(this.captainZ+=(this.targetZ-this.captainZ)*(1-Math.exp(-16*e)));let s=this.x;if(this.rope){let r=this.rope;r.age+=e,this.x=r.from+(r.to-r.from)*Tt(r.age,0,.58),r.age>=.58&&(this.rope=null,this.aim(r.to))}else this.caught||(this.x+=(this.targetX-this.x)*(1-Math.exp(-26*e)));if(this.velocity=(this.x-s)/Math.max(e,.001),this.worldAdvance=this.roadSpeed*e,this.distance+=this.worldAdvance,this.wall.z=this.distance-M0,m0(this,e),!!this.playing){this.crossGates(),this.updateDeliveries(e);for(let r of this.squad){r.age+=e,r.hurt=Math.max(0,r.hurt-e*4.5),r.mergeBirth>0&&(r.mergeBirth=Math.max(0,r.mergeBirth-e*2.6));let a=_n(this.x+r.formX,-6.2,6.2),o=this.captainZ+r.formZ;r.x+=(a-r.x)*(1-Math.exp(-18*e)),r.z+=(o-r.z)*(1-Math.exp(-15*e))}this.squad.length>=22&&this.merges.length===0&&this.performMerge(1,!0),this.pushWall(e);for(let r of this.features)(r.kind==="cache"||r.kind==="cover"&&r.variant!=="glass")&&r.state==="ready"&&r.z>-4&&r.z<11&&this.pushWall(e,r,r.half);this.playing&&(this.advanceCrowd(e),this.advanceIncoming(e),this.updateFalling(e),this.playing&&(this.advanceBoss(e),this.playing&&(this.caught||this.shoot(e),this.advanceShots(e))))}}};var gp=0,Vu=1,xp=2;var Po=1,vp=2,_a=3,di=0,Hn=1,Zt=2,Sr=0,Bs=1,Gn=2,Wu=3,Xu=4,yp=5;var Er=100,_p=101,Mp=102,bp=103,Sp=104,Ep=200,wp=201,Tp=202,Ap=203,qu=204,Yu=205,Rp=206,Cp=207,Pp=208,Ip=209,Lp=210,Dp=211,Np=212,Up=213,Fp=214,Jl=0,jl=1,Ql=2,ta=3,ec=4,tc=5,nc=6,ic=7,Ac=0,Op=1,Bp=2,Hi=0,Zu=1,Ku=2,$u=3,Io=4,Ju=5,ju=6,Qu=7,Ru="attached",kp="detached",ef=300,wr=301,Ma=302,Rc=303,Cc=304,wi=1e3,hi=1001,na=1002,nn=1003,Pc=1004;var Tr=1005;var sn=1006,ba=1007;var Zn=1008;var Kn=1009,tf=1010,nf=1011,Sa=1012,Ic=1013,Ai=1014,oi=1015,Ri=1016,Lc=1017,Dc=1018,Ar=1020,sf=35902,rf=35899,af=1021,of=1022,pi=1023,os=1026,xs=1027,Nc=1028,Uc=1029,ks=1030,Fc=1031;var Oc=1033,Lo=33776,Do=33777,No=33778,Uo=33779,Bc=35840,kc=35841,zc=35842,Hc=35843,Gc=36196,Vc=37492,Wc=37496,Xc=37488,qc=37489,Fo=37490,Yc=37491,Zc=37808,Kc=37809,$c=37810,Jc=37811,jc=37812,Qc=37813,eh=37814,th=37815,nh=37816,ih=37817,sh=37818,rh=37819,ah=37820,oh=37821,lh=36492,ch=36494,hh=36495,uh=36283,fh=36284,Oo=36285,dh=36286;var or=2300,lr=2301,Kl=2302,Cu=2303,Pu=2400,Iu=2401,Lu=2402,zp=2500;var lf=0,Bo=1,Ea=2,Hp=3200;var ko=0,Gp=1,vs="",At="srgb",Fn="srgb-linear",eo="linear",Ut="srgb";var $l=7680;var Vp=519,Wp=512,Xp=513,qp=514,cf=515,Yp=516,Zp=517,hf=518,uf=519,ff=35044,Gt=35048;var df="300 es",ui=2e3,ia=2001;function $1(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function J1(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function sa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Kp(){let i=sa("canvas");return i.style.display="block",i}var E0={},ra=null;function to(...i){let e="THREE."+i.shift();ra?ra("log",e,...i):console.log(e,...i)}function $p(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ze(...i){i=$p(i);let e="THREE."+i.shift();if(ra)ra("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function it(...i){i=$p(i);let e="THREE."+i.shift();if(ra)ra("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ar(...i){let e=i.join(" ");e in E0||(E0[e]=!0,Ze(...i))}function Jp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var jp={[Jl]:Jl,[Ql]:nc,[ec]:ec,[ta]:tc,[jl]:jl,[nc]:Ql,[ic]:ic,[tc]:ta},Oi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],w0=1234567,$a=Math.PI/180,cr=180/Math.PI;function Ci(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Cn[i&255]+Cn[i>>8&255]+Cn[i>>16&255]+Cn[i>>24&255]+"-"+Cn[e&255]+Cn[e>>8&255]+"-"+Cn[e>>16&15|64]+Cn[e>>24&255]+"-"+Cn[t&63|128]+Cn[t>>8&255]+"-"+Cn[t>>16&255]+Cn[t>>24&255]+Cn[n&255]+Cn[n>>8&255]+Cn[n>>16&255]+Cn[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function pf(i,e){return(i%e+e)%e}function j1(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Q1(i,e,t){return i!==e?(t-i)/(e-i):0}function Ja(i,e,t){return(1-t)*i+t*e}function ex(i,e,t,n){return Ja(i,e,1-Math.exp(-t*n))}function tx(i,e=1){return e-Math.abs(pf(i,e*2)-e)}function nx(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ix(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function sx(i,e){return i+Math.floor(Math.random()*(e-i+1))}function rx(i,e){return i+Math.random()*(e-i)}function ax(i){return i*(.5-Math.random())}function ox(i){i!==void 0&&(w0=i);let e=w0+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lx(i){return i*$a}function cx(i){return i*cr}function hx(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function ux(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function mf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fx(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),f=r((e-n)/2),d=a((e-n)/2),h=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*f,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*p,l*h,o*c);break;case"YXY":i.set(l*h,o*u,l*p,o*c);break;case"ZYZ":i.set(l*p,l*h,o*u,o*c);break;default:Ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ph(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function gf(i,e){if(e.constructor===Float32Array)return i;let t=ph(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function xf(i,e){if(e.constructor===Float32Array)return i;let t=ph(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Ue={DEG2RAD:$a,RAD2DEG:cr,generateUUID:Ci,clamp:mt,euclideanModulo:pf,mapLinear:j1,inverseLerp:Q1,lerp:Ja,damp:ex,pingpong:tx,smoothstep:nx,smootherstep:ix,randInt:sx,randFloat:rx,randFloatSpread:ax,seededRandom:ox,degToRad:lx,radToDeg:cx,isPowerOfTwo:hx,ceilPowerOfTwo:ux,floorPowerOfTwo:mf,setQuaternionFromProperEuler:fx,normalize:xf,denormalize:gf},Sf=class Sf{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Sf.prototype.isVector2=!0;var ye=Sf,rn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],f=n[s+3],d=r[a+0],h=r[a+1],p=r[a+2],x=r[a+3];if(f!==x||l!==d||c!==h||u!==p){let g=l*d+c*h+u*p+f*x;g<0&&(d=-d,h=-h,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){let v=Math.acos(g),M=Math.sin(v);m=Math.sin(m*v)/M,o=Math.sin(o*v)/M,l=l*m+d*o,c=c*m+h*o,u=u*m+p*o,f=f*m+x*o}else{l=l*m+d*o,c=c*m+h*o,u=u*m+p*o,f=f*m+x*o;let v=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=v,c*=v,u*=v,f*=v}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],f=r[a],d=r[a+1],h=r[a+2],p=r[a+3];return e[t]=o*p+u*f+l*h-c*d,e[t+1]=l*p+u*d+c*f-o*h,e[t+2]=c*p+u*h+o*d-l*f,e[t+3]=u*p-o*f-l*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),f=o(r/2),d=l(n/2),h=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=d*u*f+c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f-d*h*p;break;case"YXZ":this._x=d*u*f+c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f+d*h*p;break;case"ZXY":this._x=d*u*f-c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f-d*h*p;break;case"ZYX":this._x=d*u*f-c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f+d*h*p;break;case"YZX":this._x=d*u*f+c*h*p,this._y=c*h*f+d*u*p,this._z=c*u*p-d*h*f,this._w=c*u*f-d*h*p;break;case"XZY":this._x=d*u*f-c*h*p,this._y=c*h*f-d*u*p,this._z=c*u*p+d*h*f,this._w=c*u*f+d*h*p;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=n+o+f;if(d>0){let h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(a-s)*h}else if(n>o&&n>f){let h=2*Math.sqrt(1+n-o-f);this._w=(u-l)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+c)/h}else if(o>f){let h=2*Math.sqrt(1+o-n-f);this._w=(r-c)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(l+u)/h}else{let h=2*Math.sqrt(1+f-n-o);this._w=(a-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ef=class Ef{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(T0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(T0.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return tu.copy(this).projectOnVector(e),this.sub(tu)}reflect(e){return this.sub(tu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ef.prototype.isVector3=!0;var D=Ef,tu=new D,T0=new rn,wf=class wf{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],d=n[2],h=n[5],p=n[8],x=s[0],g=s[3],m=s[6],v=s[1],M=s[4],_=s[7],b=s[2],S=s[5],y=s[8];return r[0]=a*x+o*v+l*b,r[3]=a*g+o*M+l*S,r[6]=a*m+o*_+l*y,r[1]=c*x+u*v+f*b,r[4]=c*g+u*M+f*S,r[7]=c*m+u*_+f*y,r[2]=d*x+h*v+p*b,r[5]=d*g+h*M+p*S,r[8]=d*m+h*_+p*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*r,h=c*r-a*l,p=t*f+n*d+s*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=f*x,e[1]=(s*c-u*n)*x,e[2]=(o*n-s*a)*x,e[3]=d*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=h*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ar("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nu.makeScale(e,t)),this}rotate(e){return ar("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nu.makeRotation(-e)),this}translate(e,t){return ar("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};wf.prototype.isMatrix3=!0;var st=wf,nu=new st,A0=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),R0=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dx(){let i={enabled:!0,workingColorSpace:Fn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ut&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(s.r=ea(s.r),s.g=ea(s.g),s.b=ea(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vs?eo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Fn]:{primaries:e,whitePoint:n,transfer:eo,toXYZ:A0,fromXYZ:R0,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:A0,fromXYZ:R0,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),i}var vt=dx();function as(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ea(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var zr,sc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zr===void 0&&(zr=sa("canvas")),zr.width=e.width,zr.height=e.height;let s=zr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=zr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=as(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(as(t[n]/255)*255):t[n]=as(t[n]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},px=0,aa=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:px++}),this.uuid=Ci(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(iu(s[a].image)):r.push(iu(s[a]))}else r=iu(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function iu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?sc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}var mx=0,su=new D,pn=class i extends Oi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=hi,s=hi,r=sn,a=Zn,o=pi,l=Kn,c=i.DEFAULT_ANISOTROPY,u=vs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=Ci(),this.name="",this.source=new aa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(su).x}get height(){return this.source.getSize(su).y}get depth(){return this.source.getSize(su).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ef)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wi:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wi:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=ef;pn.DEFAULT_ANISOTROPY=1;var Tf=class Tf{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],h=l[5],p=l[9],x=l[2],g=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(p+g)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,_=(h+1)/2,b=(m+1)/2,S=(u+d)/4,y=(f+x)/4,E=(p+g)/4;return M>_&&M>b?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=S/n,r=y/n):_>b?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=S/s,r=E/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=y/r,s=E/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(f-x)/v,this.z=(d-u)/v,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Tf.prototype.isVector4=!0;var bt=Tf,rc=class extends Oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new pn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new aa(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ii=class extends rc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},no=class extends pn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ac=class extends pn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Tc=class Tc{constructor(e,t,n,s,r,a,o,l,c,u,f,d,h,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,f,d,h,p,x,g)}set(e,t,n,s,r,a,o,l,c,u,f,d,h,p,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=d,m[3]=h,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Tc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Hr.setFromMatrixColumn(e,0).length(),r=1/Hr.setFromMatrixColumn(e,1).length(),a=1/Hr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let d=a*u,h=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=h+p*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=p+h*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*u,h=l*f,p=c*u,x=c*f;t[0]=d+x*o,t[4]=p*o-h,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*u,h=l*f,p=c*u,x=c*f;t[0]=d-x*o,t[4]=-a*f,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*u,h=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=p*c-h,t[8]=d*c+x,t[1]=l*f,t[5]=x*c+d,t[9]=h*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=x-d*f,t[8]=p*f+h,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*f+p,t[10]=d-x*f}else if(e.order==="XZY"){let d=a*l,h=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+x,t[5]=a*u,t[9]=h*f-p,t[2]=p*f-h,t[6]=o*u,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gx,e,xx)}lookAt(e,t,n){let s=this.elements;return ti.subVectors(e,t),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),ws.crossVectors(n,ti),ws.lengthSq()===0&&(Math.abs(n.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),ws.crossVectors(n,ti)),ws.normalize(),bl.crossVectors(ti,ws),s[0]=ws.x,s[4]=bl.x,s[8]=ti.x,s[1]=ws.y,s[5]=bl.y,s[9]=ti.y,s[2]=ws.z,s[6]=bl.z,s[10]=ti.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],d=n[9],h=n[13],p=n[2],x=n[6],g=n[10],m=n[14],v=n[3],M=n[7],_=n[11],b=n[15],S=s[0],y=s[4],E=s[8],C=s[12],R=s[1],A=s[5],L=s[9],O=s[13],I=s[2],G=s[6],q=s[10],V=s[14],re=s[3],X=s[7],ee=s[11],ae=s[15];return r[0]=a*S+o*R+l*I+c*re,r[4]=a*y+o*A+l*G+c*X,r[8]=a*E+o*L+l*q+c*ee,r[12]=a*C+o*O+l*V+c*ae,r[1]=u*S+f*R+d*I+h*re,r[5]=u*y+f*A+d*G+h*X,r[9]=u*E+f*L+d*q+h*ee,r[13]=u*C+f*O+d*V+h*ae,r[2]=p*S+x*R+g*I+m*re,r[6]=p*y+x*A+g*G+m*X,r[10]=p*E+x*L+g*q+m*ee,r[14]=p*C+x*O+g*V+m*ae,r[3]=v*S+M*R+_*I+b*re,r[7]=v*y+M*A+_*G+b*X,r[11]=v*E+M*L+_*q+b*ee,r[15]=v*C+M*O+_*V+b*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],h=e[14],p=e[3],x=e[7],g=e[11],m=e[15],v=l*h-c*d,M=o*h-c*f,_=o*d-l*f,b=a*h-c*u,S=a*d-l*u,y=a*f-o*u;return t*(x*v-g*M+m*_)-n*(p*v-g*b+m*S)+s*(p*M-x*b+m*y)-r*(p*_-x*S+g*y)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],h=e[11],p=e[12],x=e[13],g=e[14],m=e[15],v=t*o-n*a,M=t*l-s*a,_=t*c-r*a,b=n*l-s*o,S=n*c-r*o,y=s*c-r*l,E=u*x-f*p,C=u*g-d*p,R=u*m-h*p,A=f*g-d*x,L=f*m-h*x,O=d*m-h*g,I=v*O-M*L+_*A+b*R-S*C+y*E;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/I;return e[0]=(o*O-l*L+c*A)*G,e[1]=(s*L-n*O-r*A)*G,e[2]=(x*y-g*S+m*b)*G,e[3]=(d*S-f*y-h*b)*G,e[4]=(l*R-a*O-c*C)*G,e[5]=(t*O-s*R+r*C)*G,e[6]=(g*_-p*y-m*M)*G,e[7]=(u*y-d*_+h*M)*G,e[8]=(a*L-o*R+c*E)*G,e[9]=(n*R-t*L-r*E)*G,e[10]=(p*S-x*_+m*v)*G,e[11]=(f*_-u*S-h*v)*G,e[12]=(o*C-a*A-l*E)*G,e[13]=(t*A-n*C+s*E)*G,e[14]=(x*M-p*b-g*v)*G,e[15]=(u*b-f*M+d*v)*G,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,d=r*c,h=r*u,p=r*f,x=a*u,g=a*f,m=o*f,v=l*c,M=l*u,_=l*f,b=n.x,S=n.y,y=n.z;return s[0]=(1-(x+m))*b,s[1]=(h+_)*b,s[2]=(p-M)*b,s[3]=0,s[4]=(h-_)*S,s[5]=(1-(d+m))*S,s[6]=(g+v)*S,s[7]=0,s[8]=(p+M)*y,s[9]=(g-v)*y,s[10]=(1-(d+x))*y,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Hr.set(s[0],s[1],s[2]).length(),o=Hr.set(s[4],s[5],s[6]).length(),l=Hr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Mi.copy(this);let c=1/a,u=1/o,f=1/l;return Mi.elements[0]*=c,Mi.elements[1]*=c,Mi.elements[2]*=c,Mi.elements[4]*=u,Mi.elements[5]*=u,Mi.elements[6]*=u,Mi.elements[8]*=f,Mi.elements[9]*=f,Mi.elements[10]*=f,t.setFromRotationMatrix(Mi),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=ui,l=!1){let c=this.elements,u=2*r/(t-e),f=2*r/(n-s),d=(t+e)/(t-e),h=(n+s)/(n-s),p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===ui)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===ia)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ui,l=!1){let c=this.elements,u=2/(t-e),f=2/(n-s),d=-(t+e)/(t-e),h=-(n+s)/(n-s),p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===ui)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===ia)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Tc.prototype.isMatrix4=!0;var Ke=Tc,Hr=new D,Mi=new Ke,gx=new D(0,0,0),xx=new D(1,1,1),ws=new D,bl=new D,ti=new D,C0=new Ke,P0=new rn,qt=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],d=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-mt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return C0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(C0,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return P0.setFromEuler(this),this.setFromQuaternion(P0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qt.DEFAULT_ORDER="XYZ";var io=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},vx=0,I0=new D,Gr=new rn,es=new Ke,Sl=new D,za=new D,yx=new D,_x=new rn,L0=new D(1,0,0),D0=new D(0,1,0),N0=new D(0,0,1),U0={type:"added"},Mx={type:"removed"},Vr={type:"childadded",child:null},ru={type:"childremoved",child:null},Lt=class i extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vx++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new qt,n=new rn,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ke},normalMatrix:{value:new st}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new io,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gr.setFromAxisAngle(e,t),this.quaternion.multiply(Gr),this}rotateOnWorldAxis(e,t){return Gr.setFromAxisAngle(e,t),this.quaternion.premultiply(Gr),this}rotateX(e){return this.rotateOnAxis(L0,e)}rotateY(e){return this.rotateOnAxis(D0,e)}rotateZ(e){return this.rotateOnAxis(N0,e)}translateOnAxis(e,t){return I0.copy(e).applyQuaternion(this.quaternion),this.position.add(I0.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(L0,e)}translateY(e){return this.translateOnAxis(D0,e)}translateZ(e){return this.translateOnAxis(N0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(es.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Sl.copy(e):Sl.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),za.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?es.lookAt(za,Sl,this.up):es.lookAt(Sl,za,this.up),this.quaternion.setFromRotationMatrix(es),s&&(es.extractRotation(s.matrixWorld),Gr.setFromRotationMatrix(es),this.quaternion.premultiply(Gr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(U0),Vr.child=e,this.dispatchEvent(Vr),Vr.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Mx),ru.child=e,this.dispatchEvent(ru),ru.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),es.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),es.multiply(e.parent.matrixWorld)),e.applyMatrix4(es),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(U0),Vr.child=e,this.dispatchEvent(Vr),Vr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(za,e,yx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(za,_x,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),h.length>0&&(n.animations=h),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Lt.DEFAULT_UP=new D(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Nt=class extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},bx={type:"move"},oa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,p=.005;c.inputState.pinching&&d>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bx)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Nt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Qp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ts={h:0,s:0,l:0},El={h:0,s:0,l:0};function au(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=vt.workingColorSpace){if(e=pf(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=au(a,r,e+1/3),this.g=au(a,r,e),this.b=au(a,r,e-1/3)}return vt.colorSpaceToWorking(this,s),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){let n=Qp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=as(e.r),this.g=as(e.g),this.b=as(e.b),this}copyLinearToSRGB(e){return this.r=ea(e.r),this.g=ea(e.g),this.b=ea(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return vt.workingToColorSpace(Pn.copy(this),e),Math.round(mt(Pn.r*255,0,255))*65536+Math.round(mt(Pn.g*255,0,255))*256+Math.round(mt(Pn.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(Pn.copy(this),t);let n=Pn.r,s=Pn.g,r=Pn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(Pn.copy(this),t),e.r=Pn.r,e.g=Pn.g,e.b=Pn.b,e}getStyle(e=At){vt.workingToColorSpace(Pn.copy(this),e);let t=Pn.r,n=Pn.g,s=Pn.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ts),this.setHSL(Ts.h+e,Ts.s+t,Ts.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ts),e.getHSL(El);let n=Ja(Ts.h,El.h,t),s=Ja(Ts.s,El.s,t),r=Ja(Ts.l,El.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new be;be.NAMES=Qp;var so=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new be(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ro=class extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qt,this.environmentIntensity=1,this.environmentRotation=new qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},bi=new D,ts=new D,ou=new D,ns=new D,Wr=new D,Xr=new D,F0=new D,lu=new D,cu=new D,hu=new D,uu=new bt,fu=new bt,du=new bt,Is=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),bi.subVectors(e,t),s.cross(bi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){bi.subVectors(s,t),ts.subVectors(n,t),ou.subVectors(e,t);let a=bi.dot(bi),o=bi.dot(ts),l=bi.dot(ou),c=ts.dot(ts),u=ts.dot(ou),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,h=(c*l-o*u)*d,p=(a*u-o*l)*d;return r.set(1-h-p,p,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ns)===null?!1:ns.x>=0&&ns.y>=0&&ns.x+ns.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ns)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ns.x),l.addScaledVector(a,ns.y),l.addScaledVector(o,ns.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return uu.setScalar(0),fu.setScalar(0),du.setScalar(0),uu.fromBufferAttribute(e,t),fu.fromBufferAttribute(e,n),du.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(uu,r.x),a.addScaledVector(fu,r.y),a.addScaledVector(du,r.z),a}static isFrontFacing(e,t,n,s){return bi.subVectors(n,t),ts.subVectors(e,t),bi.cross(ts).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),ts.subVectors(this.a,this.b),bi.cross(ts).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Wr.subVectors(s,n),Xr.subVectors(r,n),lu.subVectors(e,n);let l=Wr.dot(lu),c=Xr.dot(lu);if(l<=0&&c<=0)return t.copy(n);cu.subVectors(e,s);let u=Wr.dot(cu),f=Xr.dot(cu);if(u>=0&&f<=u)return t.copy(s);let d=l*f-u*c;if(d<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),t.copy(n).addScaledVector(Wr,a);hu.subVectors(e,r);let h=Wr.dot(hu),p=Xr.dot(hu);if(p>=0&&h<=p)return t.copy(r);let x=h*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Xr,o);let g=u*p-h*f;if(g<=0&&f-u>=0&&h-p>=0)return F0.subVectors(r,s),o=(f-u)/(f-u+(h-p)),t.copy(s).addScaledVector(F0,o);let m=1/(g+x+d);return a=x*m,o=d*m,t.copy(n).addScaledVector(Wr,a).addScaledVector(Xr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},si=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Si):Si.fromBufferAttribute(r,a),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wl.copy(n.boundingBox)),wl.applyMatrix4(e.matrixWorld),this.union(wl)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ha),Tl.subVectors(this.max,Ha),qr.subVectors(e.a,Ha),Yr.subVectors(e.b,Ha),Zr.subVectors(e.c,Ha),As.subVectors(Yr,qr),Rs.subVectors(Zr,Yr),tr.subVectors(qr,Zr);let t=[0,-As.z,As.y,0,-Rs.z,Rs.y,0,-tr.z,tr.y,As.z,0,-As.x,Rs.z,0,-Rs.x,tr.z,0,-tr.x,-As.y,As.x,0,-Rs.y,Rs.x,0,-tr.y,tr.x,0];return!pu(t,qr,Yr,Zr,Tl)||(t=[1,0,0,0,1,0,0,0,1],!pu(t,qr,Yr,Zr,Tl))?!1:(Al.crossVectors(As,Rs),t=[Al.x,Al.y,Al.z],pu(t,qr,Yr,Zr,Tl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(is[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),is[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),is[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),is[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),is[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),is[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),is[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),is[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(is),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},is=[new D,new D,new D,new D,new D,new D,new D,new D],Si=new D,wl=new si,qr=new D,Yr=new D,Zr=new D,As=new D,Rs=new D,tr=new D,Ha=new D,Tl=new D,Al=new D,nr=new D;function pu(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){nr.fromArray(i,r);let o=s.x*Math.abs(nr.x)+s.y*Math.abs(nr.y)+s.z*Math.abs(nr.z),l=e.dot(nr),c=t.dot(nr),u=n.dot(nr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var hn=new D,Rl=new ye,Sx=0,zt=class extends Oi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ff,this.updateRanges=[],this.gpuType=oi,this.version=0,this._normalizationScale=e!==void 0?ph(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rl.fromBufferAttribute(this,t),Rl.applyMatrix3(e),this.setXY(t,Rl.x,Rl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix3(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):gf(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):xf(e,this.array)}};var la=class extends zt{constructor(e,t,n){super(new Uint8Array(e),t,n)}};var ao=class extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var oo=class extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var $e=class extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ex=new si,Ga=new D,mu=new D,Wn=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ex.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ga.subVectors(e,this.center);let t=Ga.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ga,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ga.copy(e.center).add(mu)),this.expandByPoint(Ga.copy(e.center).sub(mu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wx=0,ci=new Ke,gu=new Lt,Kr=new D,ni=new si,Va=new si,Mn=new D,St=class i extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($1(e)?oo:ao)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ci.makeRotationFromQuaternion(e),this.applyMatrix4(ci),this}rotateX(e){return ci.makeRotationX(e),this.applyMatrix4(ci),this}rotateY(e){return ci.makeRotationY(e),this.applyMatrix4(ci),this}rotateZ(e){return ci.makeRotationZ(e),this.applyMatrix4(ci),this}translate(e,t,n){return ci.makeTranslation(e,t,n),this.applyMatrix4(ci),this}scale(e,t,n){return ci.makeScale(e,t,n),this.applyMatrix4(ci),this}lookAt(e){return gu.lookAt(e),gu.updateMatrix(),this.applyMatrix4(gu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $e(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];ni.setFromBufferAttribute(r),this.morphTargetsRelative?(Mn.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(Mn),Mn.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(Mn)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(ni.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Va.setFromBufferAttribute(o),this.morphTargetsRelative?(Mn.addVectors(ni.min,Va.min),ni.expandByPoint(Mn),Mn.addVectors(ni.max,Va.max),ni.expandByPoint(Mn)):(ni.expandByPoint(Va.min),ni.expandByPoint(Va.max))}ni.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Mn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Mn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Mn.fromBufferAttribute(o,c),l&&(Kr.fromBufferAttribute(e,c),Mn.add(Kr)),s=Math.max(s,n.distanceToSquared(Mn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let C=0;C<n.count;C++)o[C]=new D,l[C]=new D;let u=new D,f=new D,d=new D,h=new ye,p=new ye,x=new ye,g=new D,m=new D;function v(C,R,A){c[C]=c[R]=c[A]=1,u.fromBufferAttribute(n,C),f.fromBufferAttribute(n,R),d.fromBufferAttribute(n,A),h.fromBufferAttribute(r,C),p.fromBufferAttribute(r,R),x.fromBufferAttribute(r,A),f.sub(u),d.sub(u),p.sub(h),x.sub(h);let L=1/(p.x*x.y-x.x*p.y);isFinite(L)&&(g.copy(f).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(f,-x.x).multiplyScalar(L),o[C].add(g),o[R].add(g),o[A].add(g),l[C].add(m),l[R].add(m),l[A].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let C=0,R=M.length;C<R;++C){let A=M[C],L=A.start,O=A.count;for(let I=L,G=L+O;I<G;I+=3)v(e.getX(I+0),e.getX(I+1),e.getX(I+2))}let _=new D,b=new D,S=new D,y=new D;function E(C){S.fromBufferAttribute(s,C),y.copy(S);let R=o[C];_.copy(R),_.sub(S.multiplyScalar(S.dot(R))).normalize(),b.crossVectors(y,R);let L=b.dot(l[C])<0?-1:1;a.setXYZW(C,_.x,_.y,_.z,L)}for(let C=0,R=n.count;C<R;++C)c[C]&&E(C);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,h=n.count;d<h;d++)n.setXYZ(d,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,u=new D,f=new D;if(e)for(let d=0,h=e.count;d<h;d+=3){let p=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,h=t.count;d<h;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mn.fromBufferAttribute(e,t),Mn.normalize(),e.setXYZ(t,Mn.x,Mn.y,Mn.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u),h=0,p=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?h=l[x]*o.data.stride+o.offset:h=l[x]*u;for(let m=0;m<u;m++)d[p++]=c[h++]}return new zt(d,u,f)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){let d=c[u],h=e(d,n);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){let h=c[f];u.push(h.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],f=r[c];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ca=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ff,this.updateRanges=[],this.version=0,this.uuid=Ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=O0(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=O0(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function O0(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Ci()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var Un=new D,ha=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?ph(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Un.fromBufferAttribute(this,t),Un.applyMatrix4(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Un.fromBufferAttribute(this,t),Un.applyNormalMatrix(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Un.fromBufferAttribute(this,t),Un.transformDirection(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){to("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){to("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):gf(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):xf(e,this.data.array)}},xu=new D,Tx=new D,Ax=new st,Ei=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=xu.subVectors(n,t).cross(Tx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(xu),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ax.getNormalMatrix(e),s=this.coplanarPoint(xu).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rx=0,On=class extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rx++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=Bs,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qu,this.blendDst=Yu,this.blendEquation=Er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=ta,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$l,this.stencilZFail=$l,this.stencilZPass=$l,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Ei().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ye().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ye().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ss=new D,vu=new D,Cl=new D,Pl=new D,hr=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ss)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ss.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ss.copy(this.origin).addScaledVector(this.direction,t),ss.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){vu.copy(e).add(t).multiplyScalar(.5),Cl.copy(t).sub(e).normalize(),Pl.copy(this.origin).sub(vu);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Cl),o=Pl.dot(this.direction),l=-Pl.dot(Cl),c=Pl.lengthSq(),u=Math.abs(1-a*a),f,d,h,p;if(u>0)if(f=a*l-o,d=a*o-l,p=r*u,f>=0)if(d>=-p)if(d<=p){let x=1/u;f*=x,d*=x,h=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;else d<=-p?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),h=-f*f+d*(d+2*l)+c):d<=p?(f=0,d=Math.min(Math.max(-r,-l),r),h=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),h=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(vu).addScaledVector(Cl,d),h}intersectSphere(e,t){if(e.radius<0)return null;ss.subVectors(e.center,this.origin);let n=ss.dot(this.direction),s=ss.dot(ss)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ss)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,h=e.z-a.z,p=t.x-a.x,x=t.y-a.y,g=t.z-a.z,m=n.x-a.x,v=n.y-a.y,M=n.z-a.z,_=Math.abs(l),b=Math.abs(c),S=Math.abs(u),y,E,C,R,A,L,O,I,G,q,V,re;if(_>=b&&_>=S?(C=l,L=f,G=p,re=m,l>=0?(y=c,E=u,R=d,A=h,O=x,I=g,q=v,V=M):(y=u,E=c,R=h,A=d,O=g,I=x,q=M,V=v)):b>=S?(C=c,L=d,G=x,re=v,c>=0?(y=u,E=l,R=h,A=f,O=g,I=p,q=M,V=m):(y=l,E=u,R=f,A=h,O=p,I=g,q=m,V=M)):(C=u,L=h,G=g,re=M,u>=0?(y=l,E=c,R=f,A=d,O=p,I=x,q=m,V=v):(y=c,E=l,R=d,A=f,O=x,I=p,q=v,V=m)),C===0)return null;let X=y/C,ee=E/C,ae=1/C,Ie=R-X*L,Fe=A-ee*L,ie=O-X*G,F=I-ee*G,te=q-X*re,H=V-ee*re,j=te*F-H*ie,z=Ie*H-Fe*te,Ge=ie*Fe-F*Ie;if(s){if(j<0||z<0||Ge<0)return null}else if((j<0||z<0||Ge<0)&&(j>0||z>0||Ge>0))return null;let de=j+z+Ge;if(de===0)return null;let Re=ae*(j*L+z*G+Ge*re);return(de>0?Re<0:Re>0)?null:this.at(Re/de,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gt=class extends On{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.combine=Ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},B0=new Ke,ir=new hr,Il=new Wn,k0=new D,Ll=new D,Dl=new D,Nl=new D,yu=new D,Ul=new D,z0=new D,Fl=new D,Qe=class extends Lt{constructor(e=new St,t=new gt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ul.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],f=r[l];u!==0&&(yu.fromBufferAttribute(f,e),a?Ul.addScaledVector(yu,u):Ul.addScaledVector(yu.sub(t),u))}t.add(Ul)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Il.copy(n.boundingSphere),Il.applyMatrix4(r),ir.copy(e.ray).recast(e.near),!(Il.containsPoint(ir.origin)===!1&&(ir.intersectSphere(Il,k0)===null||ir.origin.distanceToSquared(k0)>(e.far-e.near)**2))&&(B0.copy(r).invert(),ir.copy(e.ray).applyMatrix4(B0),!(n.boundingBox!==null&&ir.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ir)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let g=d[p],m=a[g.materialIndex],v=Math.max(g.start,h.start),M=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let _=v,b=M;_<b;_+=3){let S=o.getX(_),y=o.getX(_+1),E=o.getX(_+2);s=Ol(this,m,e,n,c,u,f,S,y,E),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){let v=o.getX(g),M=o.getX(g+1),_=o.getX(g+2);s=Ol(this,a,e,n,c,u,f,v,M,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let g=d[p],m=a[g.materialIndex],v=Math.max(g.start,h.start),M=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let _=v,b=M;_<b;_+=3){let S=_,y=_+1,E=_+2;s=Ol(this,m,e,n,c,u,f,S,y,E),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){let v=g,M=g+1,_=g+2;s=Ol(this,a,e,n,c,u,f,v,M,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Cx(i,e,t,n,s,r,a,o){let l;if(e.side===Hn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===di,o),l===null)return null;Fl.copy(o),Fl.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Fl);return c<t.near||c>t.far?null:{distance:c,point:Fl.clone(),object:i}}function Ol(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ll),i.getVertexPosition(l,Dl),i.getVertexPosition(c,Nl);let u=Cx(i,e,t,n,Ll,Dl,Nl,z0);if(u){let f=new D;Is.getBarycoord(z0,Ll,Dl,Nl,f),s&&(u.uv=Is.getInterpolatedAttribute(s,o,l,c,f,new ye)),r&&(u.uv1=Is.getInterpolatedAttribute(r,o,l,c,f,new ye)),a&&(u.normal=Is.getInterpolatedAttribute(a,o,l,c,f,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new D,materialIndex:0};Is.getNormal(Ll,Dl,Nl,d.normal),u.face=d,u.barycoord=f}return u}var Wa=new bt,H0=new bt,G0=new bt,Px=new bt,V0=new Ke,Bl=new D,_u=new Wn,W0=new Ke,Mu=new hr,ur=class extends Qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ru,this.bindMatrix=new Ke,this.bindMatrixInverse=new Ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new si),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Bl),this.boundingBox.expandByPoint(Bl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Bl),this.boundingSphere.expandByPoint(Bl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_u.copy(this.boundingSphere),_u.applyMatrix4(s),e.ray.intersectsSphere(_u)!==!1&&(W0.copy(s).invert(),Mu.copy(e.ray).applyMatrix4(W0),!(this.boundingBox!==null&&Mu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Mu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ru?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===kp?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ze("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;H0.fromBufferAttribute(s.attributes.skinIndex,e),G0.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Wa.copy(t),t.set(0,0,0,0)):(Wa.set(t.x,t.y,t.z,1),t.set(0,0,0)),Wa.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=G0.getComponent(r);if(a!==0){let o=H0.getComponent(r);V0.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Px.copy(Wa).applyMatrix4(V0),a)}}return t.isVector4&&(t.w=Wa.w),t.applyMatrix4(this.bindMatrixInverse)}},Ls=class extends Lt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ua=class extends pn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=nn,u=nn,f,d){super(null,a,o,l,c,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},X0=new Ke,Ix=new Ke,fr=class i{constructor(e=[],t=[]){this.uuid=Ci(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ze("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Ix;X0.multiplyMatrices(o,t[r]),X0.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ua(t,e,e,pi,oi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ze("Skeleton: No bone found with UUID:",r),a=new Ls),this.bones.push(a),this.boneInverses.push(new Ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Jt=class extends zt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},$r=new Ke,q0=new Ke,kl=[],Y0=new si,Lx=new Ke,Xa=new Qe,qa=new Wn,Ft=class extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jt(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Lx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new si),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$r),Y0.copy(e.boundingBox).applyMatrix4($r),this.boundingBox.union(Y0)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$r),qa.copy(e.boundingSphere).applyMatrix4($r),this.boundingSphere.union(qa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Xa.geometry=this.geometry,Xa.material=this.material,Xa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qa.copy(this.boundingSphere),qa.applyMatrix4(n),e.ray.intersectsSphere(qa)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$r),q0.multiplyMatrices(n,$r),Xa.matrixWorld=q0,Xa.raycast(e,kl);for(let a=0,o=kl.length;a<o;a++){let l=kl[a];l.instanceId=r,l.object=this,t.push(l)}kl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Jt(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ua(new Float32Array(s*this.count),s,this.count,Nc,oi));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},sr=new Wn,Dx=new ye(.5,.5),zl=new D,Ds=class{constructor(e=new Ei,t=new Ei,n=new Ei,s=new Ei,r=new Ei,a=new Ei){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ui,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],d=r[6],h=r[7],p=r[8],x=r[9],g=r[10],m=r[11],v=r[12],M=r[13],_=r[14],b=r[15];if(s[0].setComponents(c-a,h-u,m-p,b-v).normalize(),s[1].setComponents(c+a,h+u,m+p,b+v).normalize(),s[2].setComponents(c+o,h+f,m+x,b+M).normalize(),s[3].setComponents(c-o,h-f,m-x,b-M).normalize(),n)s[4].setComponents(l,d,g,_).normalize(),s[5].setComponents(c-l,h-d,m-g,b-_).normalize();else if(s[4].setComponents(c-l,h-d,m-g,b-_).normalize(),t===ui)s[5].setComponents(c+l,h+d,m+g,b+_).normalize();else if(t===ia)s[5].setComponents(l,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),sr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(sr)}intersectsSprite(e){sr.center.set(0,0,0);let t=Dx.distanceTo(e.center);return sr.radius=.7071067811865476+t,sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(sr)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(zl.x=s.normal.x>0?e.max.x:e.min.x,zl.y=s.normal.y>0?e.max.y:e.min.y,zl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(zl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Z0=new Ke,oc=class i{constructor(){this.coordinateSystem=ui,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Z0.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ds),n[s].setFromProjectionMatrix(Z0,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Ds),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Ns=class extends On{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},lc=new D,cc=new D,K0=new Ke,Ya=new hr,Hl=new Wn,bu=new D,$0=new D,dr=class extends Lt{constructor(e=new St,t=new Ns){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)lc.fromBufferAttribute(t,s-1),cc.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=lc.distanceTo(cc);e.setAttribute("lineDistance",new $e(n,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(s),Hl.radius+=r,e.ray.intersectsSphere(Hl)===!1)return;K0.copy(s).invert(),Ya.copy(e.ray).applyMatrix4(K0);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let h=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=h,g=p-1;x<g;x+=c){let m=u.getX(x),v=u.getX(x+1),M=Gl(this,e,Ya,l,m,v,x);M&&t.push(M)}if(this.isLineLoop){let x=u.getX(p-1),g=u.getX(h),m=Gl(this,e,Ya,l,x,g,p-1);m&&t.push(m)}}else{let h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=h,g=p-1;x<g;x+=c){let m=Gl(this,e,Ya,l,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=Gl(this,e,Ya,l,p-1,h,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gl(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(lc.fromBufferAttribute(o,s),cc.fromBufferAttribute(o,r),t.distanceSqToSegment(lc,cc,bu,$0)>n)return;bu.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(bu);if(!(c<e.near||c>e.far))return{distance:c,point:$0.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var J0=new D,j0=new D,pr=class extends dr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)J0.fromBufferAttribute(t,s),j0.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+J0.distanceTo(j0);e.setAttribute("lineDistance",new $e(n,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},lo=class extends dr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},fa=class extends On{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Q0=new Ke,Du=new hr,Vl=new Wn,Wl=new D,co=class extends Lt{constructor(e=new St,t=new fa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vl.copy(n.boundingSphere),Vl.applyMatrix4(s),Vl.radius+=r,e.ray.intersectsSphere(Vl)===!1)return;Q0.copy(s).invert(),Du.copy(e.ray).applyMatrix4(Q0);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),h=Math.min(c.count,a.start+a.count);for(let p=d,x=h;p<x;p++){let g=c.getX(p);Wl.fromBufferAttribute(f,g),ep(Wl,g,l,s,e,t,this)}}else{let d=Math.max(0,a.start),h=Math.min(f.count,a.start+a.count);for(let p=d,x=h;p<x;p++)Wl.fromBufferAttribute(f,p),ep(Wl,p,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ep(i,e,t,n,s,r,a){let o=Du.distanceSqToPoint(i);if(o<t){let l=new D;Du.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ho=class extends pn{constructor(e=[],t=wr,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Bn=class extends pn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ls=class extends pn{constructor(e,t,n=Ai,s,r,a,o=nn,l=nn,c,u=os,f=1){if(u!==os&&u!==xs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:f};super(d,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new aa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},uo=class extends ls{constructor(e,t=Ai,n=wr,s,r,a=nn,o=nn,l,c=os){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fo=class extends pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},kn=class i extends St{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],f=[],d=0,h=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(u,3)),this.setAttribute("uv",new $e(f,2));function p(x,g,m,v,M,_,b,S,y,E,C){let R=_/y,A=b/E,L=_/2,O=b/2,I=S/2,G=y+1,q=E+1,V=0,re=0,X=new D;for(let ee=0;ee<q;ee++){let ae=ee*A-O;for(let Ie=0;Ie<G;Ie++){let Fe=Ie*R-L;X[x]=Fe*v,X[g]=ae*M,X[m]=I,c.push(X.x,X.y,X.z),X[x]=0,X[g]=0,X[m]=S>0?1:-1,u.push(X.x,X.y,X.z),f.push(Ie/y),f.push(1-ee/E),V+=1}}for(let ee=0;ee<E;ee++)for(let ae=0;ae<y;ae++){let Ie=d+ae+G*ee,Fe=d+ae+G*(ee+1),ie=d+(ae+1)+G*(ee+1),F=d+(ae+1)+G*ee;l.push(Ie,Fe,F),l.push(Fe,ie,F),re+=6}o.addGroup(h,re,C),h+=re,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var mr=class i extends St{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new D,u=new ye;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){let h=n+f/t*s;c.x=e*Math.cos(h),c.y=e*Math.sin(h),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new $e(a,3)),this.setAttribute("normal",new $e(o,3)),this.setAttribute("uv",new $e(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},an=class i extends St{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],d=[],h=[],p=0,x=[],g=n/2,m=0;v(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new $e(f,3)),this.setAttribute("normal",new $e(d,3)),this.setAttribute("uv",new $e(h,2));function v(){let _=new D,b=new D,S=0,y=(t-e)/n;for(let E=0;E<=r;E++){let C=[],R=E/r,A=R*(t-e)+e;for(let L=0;L<=s;L++){let O=L/s,I=O*l+o,G=Math.sin(I),q=Math.cos(I);b.x=A*G,b.y=-R*n+g,b.z=A*q,f.push(b.x,b.y,b.z),_.set(G,y,q).normalize(),d.push(_.x,_.y,_.z),h.push(O,1-R),C.push(p++)}x.push(C)}for(let E=0;E<s;E++)for(let C=0;C<r;C++){let R=x[C][E],A=x[C+1][E],L=x[C+1][E+1],O=x[C][E+1];(e>0||C!==0)&&(u.push(R,A,O),S+=3),(t>0||C!==r-1)&&(u.push(A,L,O),S+=3)}c.addGroup(m,S,0),m+=S}function M(_){let b=p,S=new ye,y=new D,E=0,C=_===!0?e:t,R=_===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,g*R,0),d.push(0,R,0),h.push(.5,.5),p++;let A=p;for(let L=0;L<=s;L++){let I=L/s*l+o,G=Math.cos(I),q=Math.sin(I);y.x=C*q,y.y=g*R,y.z=C*G,f.push(y.x,y.y,y.z),d.push(0,R,0),S.x=G*.5+.5,S.y=q*.5*R+.5,h.push(S.x,S.y),p++}for(let L=0;L<s;L++){let O=b+L,I=A+L;_===!0?u.push(I,I+1,O):u.push(I+1,I,O),E+=3}c.addGroup(m,E,_===!0?1:2),m+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ti=class i extends an{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},da=class i extends St{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new $e(r,3)),this.setAttribute("normal",new $e(r.slice(),3)),this.setAttribute("uv",new $e(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let M=new D,_=new D,b=new D;for(let S=0;S<t.length;S+=3)h(t[S+0],M),h(t[S+1],_),h(t[S+2],b),l(M,_,b,v)}function l(v,M,_,b){let S=b+1,y=[];for(let E=0;E<=S;E++){y[E]=[];let C=v.clone().lerp(_,E/S),R=M.clone().lerp(_,E/S),A=S-E;for(let L=0;L<=A;L++)L===0&&E===S?y[E][L]=C:y[E][L]=C.clone().lerp(R,L/A)}for(let E=0;E<S;E++)for(let C=0;C<2*(S-E)-1;C++){let R=Math.floor(C/2);C%2===0?(d(y[E][R+1]),d(y[E+1][R]),d(y[E][R])):(d(y[E][R+1]),d(y[E+1][R+1]),d(y[E+1][R]))}}function c(v){let M=new D;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function u(){let v=new D;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let _=g(v)/2/Math.PI+.5,b=m(v)/Math.PI+.5;a.push(_,1-b)}p(),f()}function f(){for(let v=0;v<a.length;v+=6){let M=a[v+0],_=a[v+2],b=a[v+4],S=Math.max(M,_,b),y=Math.min(M,_,b);S>.9&&y<.1&&(M<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),b<.2&&(a[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function h(v,M){let _=v*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function p(){let v=new D,M=new D,_=new D,b=new D,S=new ye,y=new ye,E=new ye;for(let C=0,R=0;C<r.length;C+=9,R+=6){v.set(r[C+0],r[C+1],r[C+2]),M.set(r[C+3],r[C+4],r[C+5]),_.set(r[C+6],r[C+7],r[C+8]),S.set(a[R+0],a[R+1]),y.set(a[R+2],a[R+3]),E.set(a[R+4],a[R+5]),b.copy(v).add(M).add(_).divideScalar(3);let A=g(b);x(S,R+0,v,A),x(y,R+2,M,A),x(E,R+4,_,A)}}function x(v,M,_,b){b<0&&v.x===1&&(a[M]=v.x-1),_.x===0&&_.z===0&&(a[M]=b/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},gr=class i extends da{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var ri=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],d=n[s+1]-u,h=(a-u)/d;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ye:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new Ke;for(let h=0;h<=e;h++){let p=h/e;s[h]=this.getTangentAt(p,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(mt(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(l.makeRotationAxis(o,p))}a[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(mt(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],h*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},pa=class extends ri{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ye){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,h=c-this.aY;l=d*u-h*f+this.aX,c=d*f+h*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},hc=class extends pa{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function vf(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,f){let d=(a-r)/c-(o-r)/(c+u)+(o-a)/u,h=(o-a)/u-(l-a)/(u+f)+(l-o)/f;d*=u,h*=u,s(a,o,d,h)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var tp=new D,np=new D,Su=new vf,Eu=new vf,wu=new vf,cs=class extends ri{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(np.subVectors(s[0],s[1]).add(s[0]),c=np);let f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(tp.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=tp),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(f),h),x=Math.pow(f.distanceToSquared(d),h),g=Math.pow(d.distanceToSquared(u),h);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),Su.initNonuniformCatmullRom(c.x,f.x,d.x,u.x,p,x,g),Eu.initNonuniformCatmullRom(c.y,f.y,d.y,u.y,p,x,g),wu.initNonuniformCatmullRom(c.z,f.z,d.z,u.z,p,x,g)}else this.curveType==="catmullrom"&&(Su.initCatmullRom(c.x,f.x,d.x,u.x,this.tension),Eu.initCatmullRom(c.y,f.y,d.y,u.y,this.tension),wu.initCatmullRom(c.z,f.z,d.z,u.z,this.tension));return n.set(Su.calc(l),Eu.calc(l),wu.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ip(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Nx(i,e){let t=1-i;return t*t*e}function Ux(i,e){return 2*(1-i)*i*e}function Fx(i,e){return i*i*e}function ja(i,e,t,n){return Nx(i,e)+Ux(i,t)+Fx(i,n)}function Ox(i,e){let t=1-i;return t*t*t*e}function Bx(i,e){let t=1-i;return 3*t*t*i*e}function kx(i,e){return 3*(1-i)*i*i*e}function zx(i,e){return i*i*i*e}function Qa(i,e,t,n,s){return Ox(i,e)+Bx(i,t)+kx(i,n)+zx(i,s)}var po=class extends ri{constructor(e=new ye,t=new ye,n=new ye,s=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ye){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Qa(e,s.x,r.x,a.x,o.x),Qa(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},uc=class extends ri{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Qa(e,s.x,r.x,a.x,o.x),Qa(e,s.y,r.y,a.y,o.y),Qa(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},mo=class extends ri{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fc=class extends ri{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},go=class extends ri{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ja(e,s.x,r.x,a.x),ja(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xo=class extends ri{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ja(e,s.x,r.x,a.x),ja(e,s.y,r.y,a.y),ja(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vo=class extends ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(ip(o,l.x,c.x,u.x,f.x),ip(o,l.y,c.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ye().fromArray(s))}return this}},dc=Object.freeze({__proto__:null,ArcCurve:hc,CatmullRomCurve3:cs,CubicBezierCurve:po,CubicBezierCurve3:uc,EllipseCurve:pa,LineCurve:mo,LineCurve3:fc,QuadraticBezierCurve:go,QuadraticBezierCurve3:xo,SplineCurve:vo}),pc=class extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new dc[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},xr=class extends pc{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new mo(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new go(this.currentPoint.clone(),new ye(e,t),new ye(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new po(this.currentPoint.clone(),new ye(e,t),new ye(n,s),new ye(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new vo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new pa(e,t,n,s,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ma=class extends xr{constructor(e){super(e),this.uuid=Ci(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new xr().fromJSON(s))}return this}};function Hx(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=em(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=qx(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let u=o,f=l;for(let d=t;d<s;d+=t){let h=i[d],p=i[d+1];h<o&&(o=h),p<l&&(l=p),h>u&&(u=h),p>f&&(f=p)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return yo(r,a,t,o,l,c,0),a}function em(i,e,t,n,s){let r;if(s===iv(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=sp(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=sp(a/n|0,i[a],i[a+1],r);return r&&ga(r,r.next)&&(Mo(r),r=r.next),r}function vr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ga(t,t.next)||Qt(t.prev,t,t.next)===0)){if(Mo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function yo(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Jx(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Vx(i,n,s,r):Gx(i)){e.push(l.i,i.i,c.i),Mo(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Wx(vr(i),e),yo(i,e,t,n,s,r,2)):a===2&&Xx(i,e,t,n,s,r):yo(vr(i),e,t,n,s,r,1);break}}}function Gx(i){let e=i.prev,t=i,n=i.next;if(Qt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),f=Math.min(o,l,c),d=Math.max(s,r,a),h=Math.max(o,l,c),p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=d&&p.y>=f&&p.y<=h&&Za(s,o,r,l,a,c,p.x,p.y)&&Qt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Vx(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Qt(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,f=r.y,d=a.y,h=Math.min(o,l,c),p=Math.min(u,f,d),x=Math.max(o,l,c),g=Math.max(u,f,d),m=Nu(h,p,e,t,n),v=Nu(x,g,e,t,n),M=i.prevZ,_=i.nextZ;for(;M&&M.z>=m&&_&&_.z<=v;){if(M.x>=h&&M.x<=x&&M.y>=p&&M.y<=g&&M!==s&&M!==a&&Za(o,u,l,f,c,d,M.x,M.y)&&Qt(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=h&&_.x<=x&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&Za(o,u,l,f,c,d,_.x,_.y)&&Qt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=m;){if(M.x>=h&&M.x<=x&&M.y>=p&&M.y<=g&&M!==s&&M!==a&&Za(o,u,l,f,c,d,M.x,M.y)&&Qt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=h&&_.x<=x&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&Za(o,u,l,f,c,d,_.x,_.y)&&Qt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Wx(i,e){let t=i;do{let n=t.prev,s=t.next.next;!ga(n,s)&&nm(n,t,t.next,s)&&_o(n,s)&&_o(s,n)&&(e.push(n.i,t.i,s.i),Mo(t),Mo(t.next),t=i=s),t=t.next}while(t!==i);return vr(t)}function Xx(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ev(a,o)){let l=im(a,o);a=vr(a,a.next),l=vr(l,l.next),yo(a,e,t,n,s,r,0),yo(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function qx(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=em(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Qx(c))}s.sort(Yx);for(let r=0;r<s.length;r++)t=Zx(s[r],t);return t}function Yx(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Zx(i,e){let t=Kx(i,e);if(!t)return e;let n=im(t,i);return vr(n,n.next),vr(t,t.next)}function Kx(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(ga(i,t))return t;do{if(ga(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&tm(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let f=Math.abs(s-t.y)/(n-t.x);_o(t,i)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&$x(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function $x(i,e){return Qt(i.prev,i,e.prev)<0&&Qt(e.next,i,i.next)<0}function Jx(i,e,t,n){let s=i;do s.z===0&&(s.z=Nu(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,jx(s)}function jx(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Nu(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Qx(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function tm(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Za(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&tm(i,e,t,n,s,r,a,o)}function ev(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!tv(i,e)&&(_o(i,e)&&_o(e,i)&&nv(i,e)&&(Qt(i.prev,i,e.prev)||Qt(i,e.prev,e))||ga(i,e)&&Qt(i.prev,i,i.next)>0&&Qt(e.prev,e,e.next)>0)}function Qt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ga(i,e){return i.x===e.x&&i.y===e.y}function nm(i,e,t,n){let s=ql(Qt(i,e,t)),r=ql(Qt(i,e,n)),a=ql(Qt(t,n,i)),o=ql(Qt(t,n,e));return!!(s!==r&&a!==o||s===0&&Xl(i,t,e)||r===0&&Xl(i,n,e)||a===0&&Xl(t,i,n)||o===0&&Xl(t,e,n))}function Xl(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ql(i){return i>0?1:i<0?-1:0}function tv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&nm(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function _o(i,e){return Qt(i.prev,i,i.next)<0?Qt(i,e,i.next)>=0&&Qt(i,i.prev,e)>=0:Qt(i,e,i.prev)<0||Qt(i,i.next,e)<0}function nv(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function im(i,e){let t=Uu(i.i,i.x,i.y),n=Uu(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function sp(i,e,t,n){let s=Uu(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Mo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Uu(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function iv(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Fu=class{static triangulate(e,t,n=2){return Hx(e,t,n)}},rr=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];rp(e),ap(n,e);let a=e.length;t.forEach(rp);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,ap(n,t[l]);let o=Fu.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function rp(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ap(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var bo=class i extends St{constructor(e=new ma([new ye(.5,.5),new ye(-.5,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new $e(s,3)),this.setAttribute("uv",new $e(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:h-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:sv,M,_=!1,b,S,y,E;if(m){M=m.getSpacedPoints(u),_=!0,d=!1;let N=m.isCatmullRomCurve3?m.closed:!1;b=m.computeFrenetFrames(u,N),S=new D,y=new D,E=new D}d||(g=0,h=0,p=0,x=0);let C=o.extractPoints(c),R=C.shape,A=C.holes;if(!rr.isClockWise(R)){R=R.reverse();for(let N=0,J=A.length;N<J;N++){let W=A[N];rr.isClockWise(W)&&(A[N]=W.reverse())}}function O(N){let W=10000000000000001e-36,Y=N[0];for(let xe=1;xe<=N.length;xe++){let We=xe%N.length,Be=N[We],tt=Be.x-Y.x,nt=Be.y-Y.y,pt=tt*tt+nt*nt,B=Math.max(Math.abs(Be.x),Math.abs(Be.y),Math.abs(Y.x),Math.abs(Y.y)),kt=W*B*B;if(pt<=kt){N.splice(We,1),xe--;continue}Y=Be}}O(R),A.forEach(O);let I=A.length,G=R;for(let N=0;N<I;N++){let J=A[N];R=R.concat(J)}function q(N,J,W){return J||it("ExtrudeGeometry: vec does not exist"),N.clone().addScaledVector(J,W)}let V=R.length;function re(N,J,W){let Y,xe,We,Be=N.x-J.x,tt=N.y-J.y,nt=W.x-N.x,pt=W.y-N.y,B=Be*Be+tt*tt,kt=Be*pt-tt*nt;if(Math.abs(kt)>Number.EPSILON){let rt=Math.sqrt(B),ot=Math.sqrt(nt*nt+pt*pt),_e=J.x-tt/rt,Pt=J.y+Be/rt,qe=W.x-pt/ot,je=W.y+nt/ot,P=((qe-_e)*pt-(je-Pt)*nt)/(Be*pt-tt*nt);Y=_e+Be*P-N.x,xe=Pt+tt*P-N.y;let w=Y*Y+xe*xe;if(w<=2)return new ye(Y,xe);We=Math.sqrt(w/2)}else{let rt=!1;Be>Number.EPSILON?nt>Number.EPSILON&&(rt=!0):Be<-Number.EPSILON?nt<-Number.EPSILON&&(rt=!0):Math.sign(tt)===Math.sign(pt)&&(rt=!0),rt?(Y=-tt,xe=Be,We=Math.sqrt(B)):(Y=Be,xe=tt,We=Math.sqrt(B/2))}return new ye(Y/We,xe/We)}let X=[];for(let N=0,J=G.length,W=J-1,Y=N+1;N<J;N++,W++,Y++)W===J&&(W=0),Y===J&&(Y=0),X[N]=re(G[N],G[W],G[Y]);let ee=[],ae,Ie=X.concat();for(let N=0,J=I;N<J;N++){let W=A[N];ae=[];for(let Y=0,xe=W.length,We=xe-1,Be=Y+1;Y<xe;Y++,We++,Be++)We===xe&&(We=0),Be===xe&&(Be=0),ae[Y]=re(W[Y],W[We],W[Be]);ee.push(ae),Ie=Ie.concat(ae)}let Fe;if(g===0)Fe=rr.triangulateShape(G,A);else{let N=[],J=[];for(let W=0;W<g;W++){let Y=W/g,xe=h*Math.cos(Y*Math.PI/2),We=p*Math.sin(Y*Math.PI/2)+x;for(let Be=0,tt=G.length;Be<tt;Be++){let nt=q(G[Be],X[Be],We);z(nt.x,nt.y,-xe),Y===0&&N.push(nt)}for(let Be=0,tt=I;Be<tt;Be++){let nt=A[Be];ae=ee[Be];let pt=[];for(let B=0,kt=nt.length;B<kt;B++){let rt=q(nt[B],ae[B],We);z(rt.x,rt.y,-xe),Y===0&&pt.push(rt)}Y===0&&J.push(pt)}}Fe=rr.triangulateShape(N,J)}let ie=Fe.length,F=p+x;for(let N=0;N<V;N++){let J=d?q(R[N],Ie[N],F):R[N];_?(y.copy(b.normals[0]).multiplyScalar(J.x),S.copy(b.binormals[0]).multiplyScalar(J.y),E.copy(M[0]).add(y).add(S),z(E.x,E.y,E.z)):z(J.x,J.y,0)}for(let N=1;N<=u;N++)for(let J=0;J<V;J++){let W=d?q(R[J],Ie[J],F):R[J];_?(y.copy(b.normals[N]).multiplyScalar(W.x),S.copy(b.binormals[N]).multiplyScalar(W.y),E.copy(M[N]).add(y).add(S),z(E.x,E.y,E.z)):z(W.x,W.y,f/u*N)}for(let N=g-1;N>=0;N--){let J=N/g,W=h*Math.cos(J*Math.PI/2),Y=p*Math.sin(J*Math.PI/2)+x;for(let xe=0,We=G.length;xe<We;xe++){let Be=q(G[xe],X[xe],Y);z(Be.x,Be.y,f+W)}for(let xe=0,We=A.length;xe<We;xe++){let Be=A[xe];ae=ee[xe];for(let tt=0,nt=Be.length;tt<nt;tt++){let pt=q(Be[tt],ae[tt],Y);_?z(pt.x,pt.y+M[u-1].y,M[u-1].x+W):z(pt.x,pt.y,f+W)}}}te(),H();function te(){let N=s.length/3;if(d){let J=0,W=V*J;for(let Y=0;Y<ie;Y++){let xe=Fe[Y];Ge(xe[2]+W,xe[1]+W,xe[0]+W)}J=u+g*2,W=V*J;for(let Y=0;Y<ie;Y++){let xe=Fe[Y];Ge(xe[0]+W,xe[1]+W,xe[2]+W)}}else{for(let J=0;J<ie;J++){let W=Fe[J];Ge(W[2],W[1],W[0])}for(let J=0;J<ie;J++){let W=Fe[J];Ge(W[0]+V*u,W[1]+V*u,W[2]+V*u)}}n.addGroup(N,s.length/3-N,0)}function H(){let N=s.length/3,J=0;j(G,J),J+=G.length;for(let W=0,Y=A.length;W<Y;W++){let xe=A[W];j(xe,J),J+=xe.length}n.addGroup(N,s.length/3-N,1)}function j(N,J){let W=N.length;for(;--W>=0;){let Y=W,xe=W-1;xe<0&&(xe=N.length-1);for(let We=0,Be=u+g*2;We<Be;We++){let tt=V*We,nt=V*(We+1),pt=J+Y+tt,B=J+xe+tt,kt=J+xe+nt,rt=J+Y+nt;de(pt,B,kt,rt)}}}function z(N,J,W){l.push(N),l.push(J),l.push(W)}function Ge(N,J,W){Re(N),Re(J),Re(W);let Y=s.length/3,xe=v.generateTopUV(n,s,Y-3,Y-2,Y-1);ce(xe[0]),ce(xe[1]),ce(xe[2])}function de(N,J,W,Y){Re(N),Re(J),Re(Y),Re(J),Re(W),Re(Y);let xe=s.length/3,We=v.generateSideWallUV(n,s,xe-6,xe-3,xe-2,xe-1);ce(We[0]),ce(We[1]),ce(We[3]),ce(We[1]),ce(We[2]),ce(We[3])}function Re(N){s.push(l[N*3+0]),s.push(l[N*3+1]),s.push(l[N*3+2])}function ce(N){r.push(N.x),r.push(N.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return rv(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new dc[s.type]().fromJSON(s)),new i(n,e.options)}},sv={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new ye(r,a),new ye(o,l),new ye(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],f=e[n*3+2],d=e[s*3],h=e[s*3+1],p=e[s*3+2],x=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ye(a,1-l),new ye(c,1-f),new ye(d,1-p),new ye(x,1-m)]:[new ye(o,1-l),new ye(u,1-f),new ye(h,1-p),new ye(g,1-m)]}};function rv(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Bi=class i extends da{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},So=class i extends St{constructor(e=[new ye(0,-.5),new ye(.5,0),new ye(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=mt(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],u=1/t,f=new D,d=new ye,h=new D,p=new D,x=new D,g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,h.x=m*1,h.y=-g,h.z=m*0,x.copy(h),h.normalize(),l.push(h.x,h.y,h.z);break;case e.length-1:x.normalize(),l.push(x.x,x.y,x.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,h.x=m*1,h.y=-g,h.z=m*0,p.copy(h),h.x+=x.x,h.y+=x.y,h.z+=x.z,h.normalize(),l.push(h.x,h.y,h.z),x.copy(p)}for(let v=0;v<=t;v++){let M=n+v*u*s,_=Math.sin(M),b=Math.cos(M);for(let S=0;S<=e.length-1;S++){f.x=e[S].x*_,f.y=e[S].y,f.z=e[S].x*b,a.push(f.x,f.y,f.z),d.x=v/t,d.y=S/(e.length-1),o.push(d.x,d.y);let y=l[3*S+0]*_,E=l[3*S+1],C=l[3*S+0]*b;c.push(y,E,C)}}for(let v=0;v<t;v++)for(let M=0;M<e.length-1;M++){let _=M+v*e.length,b=_,S=_+e.length,y=_+e.length+1,E=_+1;r.push(b,S,E),r.push(y,E,S)}this.setIndex(r),this.setAttribute("position",new $e(a,3)),this.setAttribute("uv",new $e(o,2)),this.setAttribute("normal",new $e(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},fi=class i extends da{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ot=class i extends St{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,f=e/o,d=t/l,h=[],p=[],x=[],g=[];for(let m=0;m<u;m++){let v=m*d-a;for(let M=0;M<c;M++){let _=M*f-r;p.push(_,-v,0),x.push(0,0,1),g.push(M/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<o;v++){let M=v+c*m,_=v+c*(m+1),b=v+1+c*(m+1),S=v+1+c*m;h.push(M,_,S),h.push(_,b,S)}this.setIndex(h),this.setAttribute("position",new $e(p,3)),this.setAttribute("normal",new $e(x,3)),this.setAttribute("uv",new $e(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},hs=class i extends St{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],u=[],f=e,d=(t-e)/s,h=new D,p=new ye;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let m=r+g/n*a;h.x=f*Math.cos(m),h.y=f*Math.sin(m),l.push(h.x,h.y,h.z),c.push(0,0,1),p.x=(h.x/t+1)/2,p.y=(h.y/t+1)/2,u.push(p.x,p.y)}f+=d}for(let x=0;x<s;x++){let g=x*(n+1);for(let m=0;m<n;m++){let v=m+g,M=v,_=v+n+1,b=v+n+2,S=v+1;o.push(M,_,S),o.push(_,b,S)}}this.setIndex(o),this.setAttribute("position",new $e(l,3)),this.setAttribute("normal",new $e(c,3)),this.setAttribute("uv",new $e(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Xn=class i extends St{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],f=new D,d=new D,h=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let v=[],M=m/n,_=a+M*o,b=e*Math.cos(_),S=Math.sqrt(e*e-b*b),y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){let C=E/t,R=s+C*r;f.x=-S*Math.cos(R),f.y=b,f.z=S*Math.sin(R),p.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),g.push(C+y,1-M),v.push(c++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){let M=u[m][v+1],_=u[m][v],b=u[m+1][v],S=u[m+1][v+1];(m!==0||a>0)&&h.push(M,_,S),(m!==n-1||l<Math.PI)&&h.push(_,b,S)}this.setIndex(h),this.setAttribute("position",new $e(p,3)),this.setAttribute("normal",new $e(x,3)),this.setAttribute("uv",new $e(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ai=class i extends St{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],u=[],f=[],d=new D,h=new D,p=new D;for(let x=0;x<=n;x++){let g=a+x/n*o;for(let m=0;m<=s;m++){let v=m/s*r;h.x=(e+t*Math.cos(g))*Math.cos(v),h.y=(e+t*Math.cos(g))*Math.sin(v),h.z=t*Math.sin(g),c.push(h.x,h.y,h.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),p.subVectors(h,d).normalize(),u.push(p.x,p.y,p.z),f.push(m/s),f.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=s;g++){let m=(s+1)*x+g-1,v=(s+1)*(x-1)+g-1,M=(s+1)*(x-1)+g,_=(s+1)*x+g;l.push(m,v,_),l.push(v,M,_)}this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(u,3)),this.setAttribute("uv",new $e(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var yr=class i extends St{constructor(e=new xo(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new D,l=new D,c=new ye,u=new D,f=[],d=[],h=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new $e(f,3)),this.setAttribute("normal",new $e(d,3)),this.setAttribute("uv",new $e(h,2));function x(){for(let M=0;M<t;M++)g(M);g(r===!1?t:0),v(),m()}function g(M){u=e.getPointAt(M/t,u);let _=a.normals[M],b=a.binormals[M];for(let S=0;S<=s;S++){let y=S/s*Math.PI*2,E=Math.sin(y),C=-Math.cos(y);l.x=C*_.x+E*b.x,l.y=C*_.y+E*b.y,l.z=C*_.z+E*b.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,f.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=t;M++)for(let _=1;_<=s;_++){let b=(s+1)*(M-1)+(_-1),S=(s+1)*M+(_-1),y=(s+1)*M+_,E=(s+1)*(M-1)+_;p.push(b,S,E),p.push(S,y,E)}}function v(){for(let M=0;M<=t;M++)for(let _=0;_<=s;_++)c.x=M/t,c.y=_/s,h.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new dc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Rr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(op(s))s.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(op(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function In(i){let e={};for(let t=0;t<i.length;t++){let n=Rr(i[t]);for(let s in n)e[s]=n[s]}return e}function op(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function av(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function yf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:vt.workingColorSpace}var sm={clone:Rr,merge:In},ov=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Bt=class extends On{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ov,this.fragmentShader=lv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rr(e.uniforms),this.uniformsGroups=av(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new be().setHex(s.value);break;case"v2":this.uniforms[n].value=new ye().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new st().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ke().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},mc=class extends Bt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},qn=class extends On{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ko,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},zn=class extends qn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return ar('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){ar('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Yt=class extends On{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new be(16777215),this.specular=new be(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ko,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.combine=Ac,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var gc=class extends On{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xc=class extends On{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ps(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ka(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function cv(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function lp(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function hv(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var ki=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},vc=class extends ki{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pu,endingEnd:Pu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Iu:r=e,o=2*t-n;break;case Lu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Iu:a=e,l=2*n-t;break;case Lu:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,h=this._weightNext,p=(n-t)/(s-t),x=p*p,g=x*p,m=-d*g+2*d*x-d*p,v=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*p+1,M=(-1-h)*g+(1.5+h)*x+.5*p,_=h*g-h*x;for(let b=0;b!==o;++b)r[b]=m*a[u+b]+v*a[c+b]+M*a[l+b]+_*a[f+b];return r}},yc=class extends ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),f=1-u;for(let d=0;d!==o;++d)r[d]=a[c+d]*f+a[l+d]*u;return r}},_c=class extends ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Mc=class extends ki{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let p=(n-t)/(s-t),x=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*x+a[l+g]*p;return r}let d=o*2,h=e-1;for(let p=0;p!==o;++p){let x=a[c+p],g=a[l+p],m=h*d+p*2,v=f[m],M=f[m+1],_=e*d+p*2,b=u[_],S=u[_+1],y=fv(n,t,v,b,s);r[p]=rm(y,x,M,S,g)}return r}};function rm(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function uv(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function fv(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=rm(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=uv(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Yn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ps(t,this.TimeBufferType),this.values=Ps(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ps(e.times,Array),values:Ps(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ka(e.settings)&&(n.settings={inTangents:Ps(e.settings.inTangents,Array),outTangents:Ps(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _c(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Mc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case or:t=this.InterpolantFactoryMethodDiscrete;break;case lr:t=this.InterpolantFactoryMethodLinear;break;case Kl:t=this.InterpolantFactoryMethodSmooth;break;case Cu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ze("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return or;case this.InterpolantFactoryMethodLinear:return lr;case this.InterpolantFactoryMethodSmooth:return Kl;case this.InterpolantFactoryMethodBezier:return Cu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Ka(this.settings)&&(cp(this.settings.inTangents,e),cp(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ka(this.settings)&&(hp(this.settings.inTangents,e),hp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(it("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(it("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){it("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){it("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&J1(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){it("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Kl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let f=o*n,d=f-n,h=f+n;for(let p=0;p!==n;++p){let x=t[f+p];if(x!==t[d+p]||x!==t[h+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,d=a*n;for(let h=0;h!==n;++h)t[d+h]=t[f+h]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ka(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function cp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function hp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Yn.prototype.ValueTypeName="";Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=lr;var us=class extends Yn{constructor(e,t,n){super(e,t,n)}};us.prototype.ValueTypeName="bool";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=or;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var Eo=class extends Yn{constructor(e,t,n,s){super(e,t,n,s)}};Eo.prototype.ValueTypeName="color";var fs=class extends Yn{constructor(e,t,n,s){super(e,t,n,s)}};fs.prototype.ValueTypeName="number";var bc=class extends ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)rn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ds=class extends Yn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new bc(this.times,this.values,this.getValueSize(),e)}};ds.prototype.ValueTypeName="quaternion";ds.prototype.InterpolantFactoryMethodSmooth=void 0;var ps=class extends Yn{constructor(e,t,n){super(e,t,n)}};ps.prototype.ValueTypeName="string";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=or;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var Us=class extends Yn{constructor(e,t,n,s){super(e,t,n,s)}};Us.prototype.ValueTypeName="vector";var wo=class{constructor(e="",t=-1,n=[],s=zp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Ci(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(pv(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Yn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=cv(l);l=lp(l,1,u),c=lp(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new fs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let f=u[1],d=s[f];d||(s[f]=d=[]),d.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function dv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fs;case"vector":case"vector2":case"vector3":case"vector4":return Us;case"color":return Eo;case"quaternion":return ds;case"bool":case"boolean":return us;case"string":return ps}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function pv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=dv(i.type);if(i.times===void 0){let n=[],s=[];hv(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Ka(i.settings)&&(t.settings={inTangents:Ps(i.settings.inTangents,Float32Array),outTangents:Ps(i.settings.outTangents,Float32Array)}),t}var Fi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(up(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!up(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function up(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Sc=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=c.length;f<d;f+=2){let h=c[f],p=c[f+1];if(h.global&&(h.lastIndex=0),h.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},am=new Sc,zi=class{constructor(e){this.manager=e!==void 0?e:am,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};zi.DEFAULT_MATERIAL_NAME="__DEFAULT";var rs={},Ou=class extends Error{constructor(e,t){super(e),this.response=t}},xa=class extends zi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Fi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(rs[e]!==void 0){rs[e].push({onLoad:t,onProgress:n,onError:s});return}rs[e]=[],rs[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ze("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=rs[e],f=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=d?parseInt(d):0,p=h!==0,x=0,g=new ReadableStream({start(m){v();function v(){f.read().then(({done:M,value:_})=>{if(M)m.close();else{x+=_.byteLength;let b=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:h});for(let S=0,y=u.length;S<y;S++){let E=u[S];E.onProgress&&E.onProgress(b)}m.enqueue(_),v()}},M=>{m.error(M)})}}});return new Response(g)}else throw new Ou(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),d=f&&f[1]?f[1].toLowerCase():void 0,h=new TextDecoder(d);return c.arrayBuffer().then(p=>h.decode(p))}}}).then(c=>{Fi.add(`file:${e}`,c);let u=rs[e];delete rs[e];for(let f=0,d=u.length;f<d;f++){let h=u[f];h.onLoad&&h.onLoad(c)}}).catch(c=>{let u=rs[e];if(u===void 0)throw this.manager.itemError(e),c;delete rs[e];for(let f=0,d=u.length;f<d;f++){let h=u[f];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Jr=new WeakMap,Ec=class extends zi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Fi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let f=Jr.get(a);f===void 0&&(f=[],Jr.set(a,f)),f.push({onLoad:t,onError:s})}return a}let o=sa("img");function l(){u(),t&&t(this);let f=Jr.get(this)||[];for(let d=0;d<f.length;d++){let h=f[d];h.onLoad&&h.onLoad(this)}Jr.delete(this),r.manager.itemEnd(e)}function c(f){u(),s&&s(f),Fi.remove(`image:${e}`);let d=Jr.get(this)||[];for(let h=0;h<d.length;h++){let p=d[h];p.onError&&p.onError(f)}Jr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Fi.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var ms=class extends zi{constructor(e){super(e)}load(e,t,n,s){let r=new pn,a=new Ec(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},_r=class extends Lt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},To=class extends _r{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Tu=new Ke,fp=new D,dp=new D,va=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=Kn,this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ds,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;fp.setFromMatrixPosition(e.matrixWorld),t.position.copy(fp),dp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Tu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Tu,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ia||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Tu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Yl=new D,Zl=new rn,Ui=new D,Ao=class extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Yl,Zl,Ui),Ui.x===1&&Ui.y===1&&Ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yl,Zl,Ui.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Yl,Zl,Ui),Ui.x===1&&Ui.y===1&&Ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yl,Zl,Ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Cs=new D,pp=new ye,mp=new ye,dn=class extends Ao{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=cr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan($a*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cr*2*Math.atan(Math.tan($a*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cs.x,Cs.y).multiplyScalar(-e/Cs.z),Cs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cs.x,Cs.y).multiplyScalar(-e/Cs.z)}getViewSize(e,t){return this.getViewBounds(e,pp,mp),t.subVectors(mp,pp)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan($a*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Bu=class extends va{constructor(){super(new dn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=cr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Ro=class extends _r{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Bu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},ku=class extends va{constructor(){super(new dn(90,1,.5,500)),this.isPointLightShadow=!0}},Mr=class extends _r{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ku}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},br=class extends Ao{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},zu=class extends va{constructor(){super(new br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fs=class extends _r{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new zu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var gs=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Os=class extends St{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Au=new WeakMap,Co=class extends zi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ze("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ze("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Fi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Au.has(a)===!0?(s&&s(Au.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Fi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Au.set(l,c),Fi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Fi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var jr=-90,Qr=1,ya=class extends Lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new dn(jr,Qr,e,t);s.layers=this.layers,this.add(s);let r=new dn(jr,Qr,e,t);r.layers=this.layers,this.add(r);let a=new dn(jr,Qr,e,t);a.layers=this.layers,this.add(a);let o=new dn(jr,Qr,e,t);o.layers=this.layers,this.add(o);let l=new dn(jr,Qr,e,t);l.layers=this.layers,this.add(l);let c=new dn(jr,Qr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===ui)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},wc=class extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var _f="\\[\\]\\.:\\/",mv=new RegExp("["+_f+"]","g"),Mf="[^"+_f+"]",gv="[^"+_f.replace("\\.","")+"]",xv=/((?:WC+[\/:])*)/.source.replace("WC",Mf),vv=/(WCOD+)?/.source.replace("WCOD",gv),yv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mf),_v=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mf),Mv=new RegExp("^"+xv+vv+yv+_v+"$"),bv=["material","materials","bones","map"],Hu=class{constructor(e,t,n){let s=n||Wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Wt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(mv,"")}static parseTrackName(e){let t=Mv.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);bv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){it("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){it("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){it("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){it("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){it("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){it("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){it("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;it("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){it("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Wt.Composite=Hu;Wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Wt.prototype.GetterByBindingType=[Wt.prototype._getValue_direct,Wt.prototype._getValue_array,Wt.prototype._getValue_arrayElement,Wt.prototype._getValue_toArray];Wt.prototype.SetterByBindingTypeAndVersioning=[[Wt.prototype._setValue_direct,Wt.prototype._setValue_direct_setNeedsUpdate,Wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_array,Wt.prototype._setValue_array_setNeedsUpdate,Wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_arrayElement,Wt.prototype._setValue_arrayElement_setNeedsUpdate,Wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_fromArray,Wt.prototype._setValue_fromArray_setNeedsUpdate,Wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var JS=new Float32Array(1);var Af=class Af{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Af.prototype.isMatrix2=!0;var Gu=Af;function bf(i,e,t,n){let s=Sv(n);switch(t){case af:return i*e;case Nc:return i*e/s.components*s.byteLength;case Uc:return i*e/s.components*s.byteLength;case ks:return i*e*2/s.components*s.byteLength;case Fc:return i*e*2/s.components*s.byteLength;case of:return i*e*3/s.components*s.byteLength;case pi:return i*e*4/s.components*s.byteLength;case Oc:return i*e*4/s.components*s.byteLength;case Lo:case Do:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case No:case Uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kc:case Hc:return Math.max(i,16)*Math.max(e,8)/4;case Bc:case zc:return Math.max(i,8)*Math.max(e,8)/2;case Gc:case Vc:case Xc:case qc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wc:case Fo:case Yc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case $c:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case jc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Qc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case eh:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case th:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case nh:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ih:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case sh:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case rh:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ah:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case oh:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case lh:case ch:case hh:return Math.ceil(i/4)*Math.ceil(e/4)*16;case uh:case fh:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Oo:case dh:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sv(i){switch(i){case Kn:case tf:return{byteLength:1,components:1};case Sa:case nf:case Ri:return{byteLength:2,components:1};case Lc:case Dc:return{byteLength:2,components:4};case Ai:case Ic:case oi:return{byteLength:4,components:1};case sf:case rf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Rm(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function wv(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((h,p)=>h.start-p.start);let d=0;for(let h=1;h<f.length;h++){let p=f[d],x=f[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,f[d]=x)}f.length=d+1;for(let h=0,p=f.length;h<p;h++){let x=f[h];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Tv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Av=`#ifdef USE_ALPHAHASH
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
#endif`,Rv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Iv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lv=`#ifdef USE_AOMAP
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
#endif`,Dv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nv=`#ifdef USE_BATCHING
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
#endif`,Uv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ov=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kv=`#ifdef USE_IRIDESCENCE
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
#endif`,zv=`#ifdef USE_BUMPMAP
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
#endif`,Hv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Gv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Zv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Kv=`#define PI 3.141592653589793
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
} // validated`,$v=`vec3 transformedNormal = objectNormal;
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
#endif`,Jv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ey=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ty="gl_FragColor = linearToOutputTexel( gl_FragColor );",ny=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,iy=`#ifdef USE_ENVMAP
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
#endif`,sy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,ry=`#ifdef USE_ENVMAP
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
#endif`,ay=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,oy=`#ifdef USE_ENVMAP
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
#endif`,ly=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fy=`#ifdef USE_GRADIENTMAP
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
}`,dy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,py=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,my=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gy=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,xy=`#ifdef USE_ENVMAP
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
#endif`,vy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_y=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,My=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,by=`PhysicalMaterial material;
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
#endif`,Sy=`uniform sampler2D dfgLUT;
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
}`,Ey=`
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
#endif`,wy=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ty=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ay=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Ry=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Py=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Iy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ly=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ny=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Uy=`#if defined( USE_POINTS_UV )
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
#endif`,Fy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Oy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,By=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ky=`#if defined( USE_MORPHCOLORS )
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
#endif`,zy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hy=`#ifdef USE_MORPHTARGETS
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
#endif`,Gy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Zy=`#ifdef USE_NORMALMAP
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
#endif`,Ky=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$y=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,t_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,n_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,i_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,s_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,r_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,a_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,o_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,l_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,c_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,h_=`float getShadowMask() {
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
}`,u_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,f_=`#ifdef USE_SKINNING
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
#endif`,d_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,p_=`#ifdef USE_SKINNING
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
#endif`,m_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,g_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,x_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,y_=`#ifdef USE_TRANSMISSION
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
#endif`,__=`#ifdef USE_TRANSMISSION
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
#endif`,M_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,w_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,T_=`uniform sampler2D t2D;
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
}`,A_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,R_=`uniform float backgroundBlurriness;
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
}`,C_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I_=`#include <common>
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
}`,L_=`#if DEPTH_PACKING == 3200
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
}`,D_=`#define DISTANCE
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
}`,N_=`#define DISTANCE
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
}`,U_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O_=`uniform float scale;
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
}`,B_=`uniform vec3 diffuse;
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
}`,k_=`#include <common>
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
}`,z_=`uniform vec3 diffuse;
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
}`,H_=`#define LAMBERT
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
}`,G_=`#define LAMBERT
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
}`,V_=`#define MATCAP
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
}`,W_=`#define MATCAP
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
}`,X_=`#define NORMAL
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
}`,q_=`#define NORMAL
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
}`,Y_=`#define PHONG
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
}`,Z_=`#define PHONG
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
}`,K_=`#define STANDARD
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
}`,$_=`#define STANDARD
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
}`,J_=`#define TOON
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
}`,j_=`#define TOON
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
}`,Q_=`uniform float size;
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
}`,eM=`uniform vec3 diffuse;
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
}`,tM=`#include <common>
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
}`,nM=`uniform vec3 color;
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
}`,iM=`uniform float rotation;
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
}`,sM=`uniform vec3 diffuse;
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
}`,xt={alphahash_fragment:Tv,alphahash_pars_fragment:Av,alphamap_fragment:Rv,alphamap_pars_fragment:Cv,alphatest_fragment:Pv,alphatest_pars_fragment:Iv,aomap_fragment:Lv,aomap_pars_fragment:Dv,batching_pars_vertex:Nv,batching_vertex:Uv,begin_vertex:Fv,beginnormal_vertex:Ov,bsdfs:Bv,iridescence_fragment:kv,bumpmap_pars_fragment:zv,clipping_planes_fragment:Hv,clipping_planes_pars_fragment:Gv,clipping_planes_pars_vertex:Vv,clipping_planes_vertex:Wv,color_fragment:Xv,color_pars_fragment:qv,color_pars_vertex:Yv,color_vertex:Zv,common:Kv,defaultnormal_vertex:$v,displacementmap_pars_vertex:Jv,displacementmap_vertex:jv,emissivemap_fragment:Qv,emissivemap_pars_fragment:ey,colorspace_fragment:ty,colorspace_pars_fragment:ny,envmap_fragment:iy,envmap_common_pars_fragment:sy,envmap_pars_fragment:ry,envmap_pars_vertex:ay,envmap_physical_pars_fragment:xy,envmap_vertex:oy,fog_vertex:ly,fog_pars_vertex:cy,fog_fragment:hy,fog_pars_fragment:uy,gradientmap_pars_fragment:fy,lightmap_pars_fragment:dy,lights_lambert_fragment:py,lights_lambert_pars_fragment:my,lights_pars_begin:gy,lights_toon_fragment:vy,lights_toon_pars_fragment:yy,lights_phong_fragment:_y,lights_phong_pars_fragment:My,lights_physical_fragment:by,lights_physical_pars_fragment:Sy,lights_fragment_begin:Ey,lights_fragment_maps:wy,lights_fragment_end:Ty,lightprobes_pars_fragment:Ay,logdepthbuf_fragment:Ry,logdepthbuf_pars_fragment:Cy,logdepthbuf_pars_vertex:Py,logdepthbuf_vertex:Iy,map_fragment:Ly,map_pars_fragment:Dy,map_particle_fragment:Ny,map_particle_pars_fragment:Uy,metalnessmap_fragment:Fy,metalnessmap_pars_fragment:Oy,morphinstance_vertex:By,morphcolor_vertex:ky,morphnormal_vertex:zy,morphtarget_pars_vertex:Hy,morphtarget_vertex:Gy,normal_fragment_begin:Vy,normal_fragment_maps:Wy,normal_pars_fragment:Xy,normal_pars_vertex:qy,normal_vertex:Yy,normalmap_pars_fragment:Zy,clearcoat_normal_fragment_begin:Ky,clearcoat_normal_fragment_maps:$y,clearcoat_pars_fragment:Jy,iridescence_pars_fragment:jy,opaque_fragment:Qy,packing:e_,premultiplied_alpha_fragment:t_,project_vertex:n_,dithering_fragment:i_,dithering_pars_fragment:s_,roughnessmap_fragment:r_,roughnessmap_pars_fragment:a_,shadowmap_pars_fragment:o_,shadowmap_pars_vertex:l_,shadowmap_vertex:c_,shadowmask_pars_fragment:h_,skinbase_vertex:u_,skinning_pars_vertex:f_,skinning_vertex:d_,skinnormal_vertex:p_,specularmap_fragment:m_,specularmap_pars_fragment:g_,tonemapping_fragment:x_,tonemapping_pars_fragment:v_,transmission_fragment:y_,transmission_pars_fragment:__,uv_pars_fragment:M_,uv_pars_vertex:b_,uv_vertex:S_,worldpos_vertex:E_,background_vert:w_,background_frag:T_,backgroundCube_vert:A_,backgroundCube_frag:R_,cube_vert:C_,cube_frag:P_,depth_vert:I_,depth_frag:L_,distance_vert:D_,distance_frag:N_,equirect_vert:U_,equirect_frag:F_,linedashed_vert:O_,linedashed_frag:B_,meshbasic_vert:k_,meshbasic_frag:z_,meshlambert_vert:H_,meshlambert_frag:G_,meshmatcap_vert:V_,meshmatcap_frag:W_,meshnormal_vert:X_,meshnormal_frag:q_,meshphong_vert:Y_,meshphong_frag:Z_,meshphysical_vert:K_,meshphysical_frag:$_,meshtoon_vert:J_,meshtoon_frag:j_,points_vert:Q_,points_frag:eM,shadow_vert:tM,shadow_frag:nM,sprite_vert:iM,sprite_frag:sM},Ne={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Vi={basic:{uniforms:In([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:xt.meshbasic_vert,fragmentShader:xt.meshbasic_frag},lambert:{uniforms:In([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new be(0)},envMapIntensity:{value:1}}]),vertexShader:xt.meshlambert_vert,fragmentShader:xt.meshlambert_frag},phong:{uniforms:In([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:xt.meshphong_vert,fragmentShader:xt.meshphong_frag},standard:{uniforms:In([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag},toon:{uniforms:In([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new be(0)}}]),vertexShader:xt.meshtoon_vert,fragmentShader:xt.meshtoon_frag},matcap:{uniforms:In([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:xt.meshmatcap_vert,fragmentShader:xt.meshmatcap_frag},points:{uniforms:In([Ne.points,Ne.fog]),vertexShader:xt.points_vert,fragmentShader:xt.points_frag},dashed:{uniforms:In([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xt.linedashed_vert,fragmentShader:xt.linedashed_frag},depth:{uniforms:In([Ne.common,Ne.displacementmap]),vertexShader:xt.depth_vert,fragmentShader:xt.depth_frag},normal:{uniforms:In([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:xt.meshnormal_vert,fragmentShader:xt.meshnormal_frag},sprite:{uniforms:In([Ne.sprite,Ne.fog]),vertexShader:xt.sprite_vert,fragmentShader:xt.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xt.background_vert,fragmentShader:xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:xt.backgroundCube_vert,fragmentShader:xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xt.cube_vert,fragmentShader:xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xt.equirect_vert,fragmentShader:xt.equirect_frag},distance:{uniforms:In([Ne.common,Ne.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xt.distance_vert,fragmentShader:xt.distance_frag},shadow:{uniforms:In([Ne.lights,Ne.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:xt.shadow_vert,fragmentShader:xt.shadow_frag}};Vi.physical={uniforms:In([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new st},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag};var mh={r:0,b:0,g:0},rM=new Ke,Cm=new st;Cm.set(-1,0,0,0,1,0,0,0,1);function aM(i,e,t,n,s,r){let a=new be(0),o=s===!0?0:1,l,c,u=null,f=0,d=null;function h(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){let _=v.backgroundBlurriness>0;M=e.get(M,_)}return M}function p(v){let M=!1,_=h(v);_===null?g(a,o):_&&_.isColor&&(g(_,1),M=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(v,M){let _=h(M);_&&_.isCubeTexture?(c===void 0&&(c=new Qe(new kn(1,1,1),new Bt({name:"BackgroundCubeMaterial",uniforms:Rr(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,S,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(rM.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Cm),c.material.toneMapped=vt.getTransfer(_.colorSpace)!==Ut,(u!==_||f!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,d=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Qe(new Ot(2,2),new Bt({name:"BackgroundMaterial",uniforms:Rr(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=vt.getTransfer(_.colorSpace)!==Ut,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,f=_.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,M){v.getRGB(mh,yf(i)),t.buffers.color.setClear(mh.r,mh.g,mh.b,M,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:p,addToRenderList:x,dispose:m}}function oM(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(A,L,O,I,G){let q=!1,V=f(A,I,O,L);r!==V&&(r=V,c(r.object)),q=h(A,I,O,G),q&&p(A,I,O,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(A,L,O,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(A){return i.bindVertexArray(A)}function u(A){return i.deleteVertexArray(A)}function f(A,L,O,I){let G=I.wireframe===!0,q=n[L.id];q===void 0&&(q={},n[L.id]=q);let V=A.isInstancedMesh===!0?A.id:0,re=q[V];re===void 0&&(re={},q[V]=re);let X=re[O.id];X===void 0&&(X={},re[O.id]=X);let ee=X[G];return ee===void 0&&(ee=d(l()),X[G]=ee),ee}function d(A){let L=[],O=[],I=[];for(let G=0;G<t;G++)L[G]=0,O[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:I,object:A,attributes:{},index:null}}function h(A,L,O,I){let G=r.attributes,q=L.attributes,V=0,re=O.getAttributes();for(let X in re)if(re[X].location>=0){let ae=G[X],Ie=q[X];if(Ie===void 0&&(X==="instanceMatrix"&&A.instanceMatrix&&(Ie=A.instanceMatrix),X==="instanceColor"&&A.instanceColor&&(Ie=A.instanceColor)),ae===void 0||ae.attribute!==Ie||Ie&&ae.data!==Ie.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function p(A,L,O,I){let G={},q=L.attributes,V=0,re=O.getAttributes();for(let X in re)if(re[X].location>=0){let ae=q[X];ae===void 0&&(X==="instanceMatrix"&&A.instanceMatrix&&(ae=A.instanceMatrix),X==="instanceColor"&&A.instanceColor&&(ae=A.instanceColor));let Ie={};Ie.attribute=ae,ae&&ae.data&&(Ie.data=ae.data),G[X]=Ie,V++}r.attributes=G,r.attributesNum=V,r.index=I}function x(){let A=r.newAttributes;for(let L=0,O=A.length;L<O;L++)A[L]=0}function g(A){m(A,0)}function m(A,L){let O=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;O[A]=1,I[A]===0&&(i.enableVertexAttribArray(A),I[A]=1),G[A]!==L&&(i.vertexAttribDivisor(A,L),G[A]=L)}function v(){let A=r.newAttributes,L=r.enabledAttributes;for(let O=0,I=L.length;O<I;O++)L[O]!==A[O]&&(i.disableVertexAttribArray(O),L[O]=0)}function M(A,L,O,I,G,q,V){V===!0?i.vertexAttribIPointer(A,L,O,G,q):i.vertexAttribPointer(A,L,O,I,G,q)}function _(A,L,O,I){x();let G=I.attributes,q=O.getAttributes(),V=L.defaultAttributeValues;for(let re in q){let X=q[re];if(X.location>=0){let ee=G[re];if(ee===void 0&&(re==="instanceMatrix"&&A.instanceMatrix&&(ee=A.instanceMatrix),re==="instanceColor"&&A.instanceColor&&(ee=A.instanceColor)),ee!==void 0){let ae=ee.normalized,Ie=ee.itemSize,Fe=e.get(ee);if(Fe===void 0)continue;let ie=Fe.buffer,F=Fe.type,te=Fe.bytesPerElement,H=F===i.INT||F===i.UNSIGNED_INT||ee.gpuType===Ic;if(ee.isInterleavedBufferAttribute){let j=ee.data,z=j.isInterleavedBuffer===!0?j.stride:j.itemSize,Ge=ee.offset;if(j.isInstancedInterleavedBuffer||j.isInstancedBufferAttribute){for(let de=0;de<X.locationSize;de++)m(X.location+de,j.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let de=0;de<X.locationSize;de++)g(X.location+de);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let de=0;de<X.locationSize;de++)M(X.location+de,Ie/X.locationSize,F,ae,z*te,(Ge+Ie/X.locationSize*de)*te,H)}else{if(ee.isInstancedBufferAttribute){for(let j=0;j<X.locationSize;j++)m(X.location+j,ee.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let j=0;j<X.locationSize;j++)g(X.location+j);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let j=0;j<X.locationSize;j++)M(X.location+j,Ie/X.locationSize,F,ae,Ie*te,Ie/X.locationSize*j*te,H)}}else if(V!==void 0){let ae=V[re];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(X.location,ae);break;case 3:i.vertexAttrib3fv(X.location,ae);break;case 4:i.vertexAttrib4fv(X.location,ae);break;default:i.vertexAttrib1fv(X.location,ae)}}}}v()}function b(){C();for(let A in n){let L=n[A];for(let O in L){let I=L[O];for(let G in I){let q=I[G];for(let V in q)u(q[V].object),delete q[V];delete I[G]}}delete n[A]}}function S(A){if(n[A.id]===void 0)return;let L=n[A.id];for(let O in L){let I=L[O];for(let G in I){let q=I[G];for(let V in q)u(q[V].object),delete q[V];delete I[G]}}delete n[A.id]}function y(A){for(let L in n){let O=n[L];for(let I in O){let G=O[I];if(G[A.id]===void 0)continue;let q=G[A.id];for(let V in q)u(q[V].object),delete q[V];delete G[A.id]}}}function E(A){for(let L in n){let O=n[L],I=A.isInstancedMesh===!0?A.id:0,G=O[I];if(G!==void 0){for(let q in G){let V=G[q];for(let re in V)u(V[re].object),delete V[re];delete G[q]}delete O[I],Object.keys(O).length===0&&delete n[L]}}}function C(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:R,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfObject:E,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function lM(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let h=0;h<u;h++)d+=c[h];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function cM(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(y){return!(y!==pi&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(y){let E=y===Ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==Kn&&y!==oi&&!E&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(y){if(y==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ze("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&Ze("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,maxSamples:b,samples:S}}function hM(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Ei,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let h=f.length!==0||d||n!==0||s;return s=d,n=f.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){let p=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,m=i.get(f);if(!s||p===null||p.length===0||r&&!g)r?u(null):c();else{let v=r?0:n,M=v*4,_=m.clippingState||null;l.value=_,_=u(p,d,M,h);for(let b=0;b!==M;++b)_[b]=t[b];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,d,h,p){let x=f!==null?f.length:0,g=null;if(x!==0){if(g=l.value,p!==!0||g===null){let m=h+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,_=h;M!==x;++M,_+=4)a.copy(f[M]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var Go=class extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ho(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new kn(5,5,5),r=new Bt({name:"CubemapFromEquirect",uniforms:Rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Hn,blending:Sr});r.uniforms.tEquirect.value=t;let a=new Qe(s,r),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=sn),new ya(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},om=256,uM=3,fM=20,Pm=256,Im=16,dM=3,pM=new D,mM=new be,xh=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ya(1,10,null),this._boxMesh=new Qe(new kn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=pM}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,d=l.autoClearColor,h=l.autoClearDepth,p=l.autoClearStencil,x=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(e.background=l.getClearColor(mM));let g=new ya(n,s,u);return g.position.copy(o),g.update(l,e),l.autoClear=f,l.autoClearColor=d,l.autoClearDepth=h,l.autoClearStencil=p,e.background=x,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(om,mf(e))}_fromTexture(e,t){e.mapping===wr||e.mapping===Ma?this._setSize(e.image.length===0?om:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=lm(e,!1,!1),n=Math.log2(e)-uM;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=lm(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===wr||e.mapping===Ma?(this._cubemapMaterial===null&&(this._cubemapMaterial=hm()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=cm()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=gM(),this._integrationMaterial=xM());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Im);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-dM)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(Pm*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=vM());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function lm(i,e,t){return new Go(i,{minFilter:Zn,generateMipmaps:e,type:Ri,colorSpace:Fn,depthBuffer:t})}function Vo(i,e,t){return new Bt({name:i,uniforms:e,vertexShader:xt.cube_vert,fragmentShader:t,side:Hn,blending:Sr,depthTest:!1,depthWrite:!1})}function gM(){return Vo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Pm}u

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
	`)}function xM(){return Vo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Im}},`

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
	`)}function vM(){return Vo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${fM}
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
	`)}function cm(){return Vo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function hm(){return Vo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function yM(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,h=!1){return d==null?null:h?a(d):r(d)}function r(d){if(d&&d.isTexture){let h=d.mapping;if(h===Rc||h===Cc)if(e.has(d)){let p=e.get(d).texture;return o(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let x=new Go(p.height);return x.fromEquirectangularTexture(i,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let h=d.mapping,p=h===Rc||h===Cc,x=h===wr||h===Ma;if(p||x){let g=t.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new xh(i)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let v=d.image;return p&&v&&v.height>0||x&&v&&l(v)?(n===null&&(n=new xh(i)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,h){return h===Rc?d.mapping=wr:h===Cc&&(d.mapping=Ma),d}function l(d){let h=0,p=6;for(let x=0;x<p;x++)d[x]!==void 0&&h++;return h===p}function c(d){let h=d.target;h.removeEventListener("dispose",c);let p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(d){let h=d.target;h.removeEventListener("dispose",u);let p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function _M(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ar("WebGLRenderer: "+n+" extension not supported."),s}}}function MM(i,e,t,n){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){l(p.target)}function l(p){p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let x=r.get(p);x&&(e.remove(x),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function c(p,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function u(p){let x=p.attributes;for(let g in x)e.update(x[g],i.ARRAY_BUFFER)}function f(p){let x=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let v=x!==null?x.array.length:g.array.length/3-1,M=g.count>=65535?oo:ao,_=new M(Math.ceil(v/3)*6,1),b=_.array;if(x!==null){let y=x.array;m=x.version;for(let E=0,C=0;E<v;E+=3){let R=y[E+0],A=y[E+1],L=y[E+2];b[C++]=R,b[C++]=A,b[C++]=A,b[C++]=L,b[C++]=L,b[C++]=R}}else{m=g.version;for(let y=0,E=0;y<v;y+=3){let C=y+0,R=y+1,A=y+2;b[E++]=C,b[E++]=R,b[E++]=R,b[E++]=A,b[E++]=A,b[E++]=C}}_.version=m;let S=r.get(p);S&&e.remove(S),r.set(p,_)}function d(p){let x=r.get(p);if(x){let g=p.index;g!==null&&x.version<g.version&&f(p)}else f(p);return r.get(p)}function h(){for(let p in s){let x=s[p].deref();x!==void 0&&l(x)}}return{get:c,update:u,getWireframeAttribute:d,dispose:h}}function bM(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function c(f,d,h){h!==0&&(i.drawElementsInstanced(n,d,r,f*a,h),t.update(d,n,h))}function u(f,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,h);let x=0;for(let g=0;g<h;g++)x+=d[g];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function SM(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function EM(i,e,t){let n=new WeakMap,s=new bt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,d=n.get(o);if(d===void 0||d.count!==f){let C=function(){y.dispose(),n.delete(o),o.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();let h=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],M=0;h===!0&&(M=1),p===!0&&(M=2),x===!0&&(M=3);let _=o.attributes.position.count*M,b=1;_>e.maxTextureSize&&(b=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let S=new Float32Array(_*b*4*f),y=new no(S,_,b,f);y.type=oi,y.needsUpdate=!0;let E=M*4;for(let R=0;R<f;R++){let A=g[R],L=m[R],O=v[R],I=_*b*4*R;for(let G=0;G<A.count;G++){let q=G*E;h===!0&&(s.fromBufferAttribute(A,G),S[I+q+0]=s.x,S[I+q+1]=s.y,S[I+q+2]=s.z,S[I+q+3]=0),p===!0&&(s.fromBufferAttribute(L,G),S[I+q+4]=s.x,S[I+q+5]=s.y,S[I+q+6]=s.z,S[I+q+7]=0),x===!0&&(s.fromBufferAttribute(O,G),S[I+q+8]=s.x,S[I+q+9]=s.y,S[I+q+10]=s.z,S[I+q+11]=O.itemSize===4?s.w:1)}}d={count:f,texture:y,size:new ye(_,b)},n.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let x=0;x<c.length;x++)h+=c[x];let p=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function wM(i,e,t,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,f=c.geometry,d=e.get(c,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var TM={[Zu]:"LINEAR_TONE_MAPPING",[Ku]:"REINHARD_TONE_MAPPING",[$u]:"CINEON_TONE_MAPPING",[Io]:"ACES_FILMIC_TONE_MAPPING",[ju]:"AGX_TONE_MAPPING",[Qu]:"NEUTRAL_TONE_MAPPING",[Ju]:"CUSTOM_TONE_MAPPING"};function AM(i,e,t,n,s,r){let a=new ii(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,u=new St;u.setAttribute("position",new $e([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new $e([0,2,0,0,2,0],2));let f=new mc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Qe(u,f),h=new br(-1,1,1,-1,0,1),p=null,x=null,g=!1,m,v=null,M=[],_=!1;this.setSize=function(b,S){a.setSize(b,S),o!==null&&o.setSize(b,S),l!==null&&l.setSize(b,S);for(let y=0;y<M.length;y++){let E=M[y];E.setSize&&E.setSize(b,S)}},this.setEffects=function(b){M=b,_=M.length>0&&M[0].isRenderPass===!0;let S=a.width,y=a.height;M.length>0&&o===null&&(o=new ii(S,y,{type:Ri,depthBuffer:!1,stencilBuffer:!1}),l=new ii(S,y,{type:Ri,depthBuffer:!1,stencilBuffer:!1}));let E=s===!0&&M.some(C=>C.needsDepthTexture===!0);E!==(a.depthTexture!==null)&&(E===!0&&c===null&&(c=new ls(S,y),r===!0&&(c.format=xs,c.type=Ar)),a.dispose(),a.depthTexture=E?c:null,a.resolveDepthBuffer=E,a.storeMultisampledDepthBuffer=E);for(let C=0;C<M.length;C++){let R=M[C];R.setSize&&R.setSize(S,y),E&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(b,S){if(g||b.toneMapping===Hi&&M.length===0)return!1;if(v=S,S!==null){let y=S.width,E=S.height;(a.width!==y||a.height!==E)&&this.setSize(y,E)}return _===!1&&b.setRenderTarget(a),m=b.toneMapping,b.toneMapping=Hi,!0},this.hasRenderPass=function(){return _},this.end=function(b,S){b.toneMapping=m,g=!0;let y=a,E=o;for(let C=0;C<M.length;C++){let R=M[C];R.enabled!==!1&&(R.render(b,E,y,S),R.needsSwap!==!1&&(y=E,E=E===o?l:o))}if(p!==b.outputColorSpace||x!==b.toneMapping){p=b.outputColorSpace,x=b.toneMapping,f.defines={},vt.getTransfer(p)===Ut&&(f.defines.SRGB_TRANSFER="");let C=TM[x];C&&(f.defines[C]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=y.texture,b.setRenderTarget(v),b.render(d,h),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),f.dispose()}}var Lm=new pn,Dm=new ls(1,1),Nm=new uo(1),Um=new no,Fm=new ac,Om=new ho,um=[],fm=[],dm=new Float32Array(16),pm=new Float32Array(9),mm=new Float32Array(4);function Ta(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=um[s];if(r===void 0&&(r=new Float32Array(s),um[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function mn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function yh(i,e){let t=fm[e];t===void 0&&(t=new Int32Array(e),fm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function RM(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function CM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mn(t,e))return;i.uniform2fv(this.addr,e),gn(t,e)}}function PM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mn(t,e))return;i.uniform3fv(this.addr,e),gn(t,e)}}function IM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mn(t,e))return;i.uniform4fv(this.addr,e),gn(t,e)}}function LM(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(mn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gn(t,e)}else{if(mn(t,n))return;mm.set(n),i.uniformMatrix2fv(this.addr,!1,mm),gn(t,n)}}function DM(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(mn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gn(t,e)}else{if(mn(t,n))return;pm.set(n),i.uniformMatrix3fv(this.addr,!1,pm),gn(t,n)}}function NM(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(mn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gn(t,e)}else{if(mn(t,n))return;dm.set(n),i.uniformMatrix4fv(this.addr,!1,dm),gn(t,n)}}function UM(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function FM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mn(t,e))return;i.uniform2iv(this.addr,e),gn(t,e)}}function OM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mn(t,e))return;i.uniform3iv(this.addr,e),gn(t,e)}}function BM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mn(t,e))return;i.uniform4iv(this.addr,e),gn(t,e)}}function kM(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function zM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mn(t,e))return;i.uniform2uiv(this.addr,e),gn(t,e)}}function HM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mn(t,e))return;i.uniform3uiv(this.addr,e),gn(t,e)}}function GM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mn(t,e))return;i.uniform4uiv(this.addr,e),gn(t,e)}}function _h(i){return i.version===0&&(i.compareFunction=uf,i.needsUpdate=!0),i}function VM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=_h(Dm):r=Lm,t.setTexture2D(e||r,s)}function WM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Fm,s)}function XM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=_h(Nm):r=Om,t.setTextureCube(e||r,s)}function qM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Um,s)}function YM(i){switch(i){case 5126:return RM;case 35664:return CM;case 35665:return PM;case 35666:return IM;case 35674:return LM;case 35675:return DM;case 35676:return NM;case 5124:case 35670:return UM;case 35667:case 35671:return FM;case 35668:case 35672:return OM;case 35669:case 35673:return BM;case 5125:return kM;case 36294:return zM;case 36295:return HM;case 36296:return GM;case 35678:case 36198:case 36298:case 36306:case 35682:return VM;case 35679:case 36299:case 36307:return WM;case 35680:case 36300:case 36308:case 36293:return XM;case 36289:case 36303:case 36311:case 36292:return qM}}function ZM(i,e){i.uniform1fv(this.addr,e)}function KM(i,e){let t=Ta(e,this.size,2);i.uniform2fv(this.addr,t)}function $M(i,e){let t=Ta(e,this.size,3);i.uniform3fv(this.addr,t)}function JM(i,e){let t=Ta(e,this.size,4);i.uniform4fv(this.addr,t)}function jM(i,e){let t=Ta(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function QM(i,e){let t=Ta(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function eb(i,e){let t=Ta(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function tb(i,e){i.uniform1iv(this.addr,e)}function nb(i,e){i.uniform2iv(this.addr,e)}function ib(i,e){i.uniform3iv(this.addr,e)}function sb(i,e){i.uniform4iv(this.addr,e)}function rb(i,e){i.uniform1uiv(this.addr,e)}function ab(i,e){i.uniform2uiv(this.addr,e)}function ob(i,e){i.uniform3uiv(this.addr,e)}function lb(i,e){i.uniform4uiv(this.addr,e)}function cb(i,e,t){let n=this.cache,s=e.length,r=yh(t,s);mn(n,r)||(i.uniform1iv(this.addr,r),gn(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=_h(Dm):a=Lm;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function hb(i,e,t){let n=this.cache,s=e.length,r=yh(t,s);mn(n,r)||(i.uniform1iv(this.addr,r),gn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Fm,r[a])}function ub(i,e,t){let n=this.cache,s=e.length,r=yh(t,s);mn(n,r)||(i.uniform1iv(this.addr,r),gn(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=_h(Nm):a=Om;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function fb(i,e,t){let n=this.cache,s=e.length,r=yh(t,s);mn(n,r)||(i.uniform1iv(this.addr,r),gn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Um,r[a])}function db(i){switch(i){case 5126:return ZM;case 35664:return KM;case 35665:return $M;case 35666:return JM;case 35674:return jM;case 35675:return QM;case 35676:return eb;case 5124:case 35670:return tb;case 35667:case 35671:return nb;case 35668:case 35672:return ib;case 35669:case 35673:return sb;case 5125:return rb;case 36294:return ab;case 36295:return ob;case 36296:return lb;case 35678:case 36198:case 36298:case 36306:case 35682:return cb;case 35679:case 36299:case 36307:return hb;case 35680:case 36300:case 36308:case 36293:return ub;case 36289:case 36303:case 36311:case 36292:return fb}}var Pf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=YM(t.type)}},If=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=db(t.type)}},Lf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Rf=/(\w+)(\])?(\[|\.)?/g;function gm(i,e){i.seq.push(e),i.map[e.id]=e}function pb(i,e,t){let n=i.name,s=n.length;for(Rf.lastIndex=0;;){let r=Rf.exec(n),a=Rf.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){gm(t,c===void 0?new Pf(o,i,e):new If(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Lf(o),gm(t,f)),t=f}}}var wa=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);pb(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function xm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var mb=37297,gb=0;function xb(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var vm=new st;function vb(i){vt._getMatrix(vm,vt.workingColorSpace,i);let e=`mat3( ${vm.elements.map(t=>t.toFixed(4))} )`;switch(vt.getTransfer(i)){case eo:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ym(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+xb(i.getShaderSource(e),o)}else return r}function yb(i,e){let t=vb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var _b={[Zu]:"Linear",[Ku]:"Reinhard",[$u]:"Cineon",[Io]:"ACESFilmic",[ju]:"AgX",[Qu]:"Neutral",[Ju]:"Custom"};function Mb(i,e){let t=_b[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var gh=new D;function bb(){vt.getLuminanceCoefficients(gh);let i=gh.x.toFixed(4),e=gh.y.toFixed(4),t=gh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ho).join(`
`)}function Eb(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ho(i){return i!==""}function _m(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Mm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Tb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Df(i){return i.replace(Tb,Ab)}function Ab(i,e){let t=xt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Df(t)}var Rb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bm(i){return i.replace(Rb,Cb)}function Cb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sm(i){let e=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Pb={[Po]:"SHADOWMAP_TYPE_PCF",[_a]:"SHADOWMAP_TYPE_VSM"};function Ib(i){return Pb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Lb={[Ma]:"ENVMAP_MODE_REFRACTION"};function Db(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Lb[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Nb={[Ac]:"ENVMAP_BLENDING_MULTIPLY",[Op]:"ENVMAP_BLENDING_MIX",[Bp]:"ENVMAP_BLENDING_ADD"};function Ub(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Nb[i.combine]||"ENVMAP_BLENDING_NONE"}function Fb(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Ib(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=Db(t),f=Ub(t),d=Sb(t),h=Eb(r),p=s.createProgram(),x,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ho).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ho).join(`
`),g.length>0&&(g+=`
`)):(x=[Sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ho).join(`
`),g=[Sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hi?"#define TONE_MAPPING":"",t.toneMapping!==Hi?xt.tonemapping_pars_fragment:"",t.toneMapping!==Hi?Mb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",xt.colorspace_pars_fragment,yb("linearToOutputTexel",t.outputColorSpace),bb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ho).join(`
`)),a=Df(a),a=_m(a,t),a=Mm(a,t),o=Df(o),o=_m(o,t),o=Mm(o,t),a=bm(a),o=bm(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,x=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===df?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===df?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let v=m+x+a,M=m+g+o,_=xm(s,s.VERTEX_SHADER,v),b=xm(s,s.FRAGMENT_SHADER,M);s.attachShader(p,_),s.attachShader(p,b),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function S(R){if(i.debug.checkShaderErrors){let A=s.getProgramInfoLog(p)||"",L=s.getShaderInfoLog(_)||"",O=s.getShaderInfoLog(b)||"",I=A.trim(),G=L.trim(),q=O.trim(),V=!0,re=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,_,b);else{let X=ym(s,_,"vertex"),ee=ym(s,b,"fragment");it("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+X+`
`+ee)}else I!==""?Ze("WebGLProgram: Program Info Log:",I):(G===""||q==="")&&(re=!1);re&&(R.diagnostics={runnable:V,programLog:I,vertexShader:{log:G,prefix:x},fragmentShader:{log:q,prefix:g}})}s.deleteShader(_),s.deleteShader(b),y=new wa(s,p),E=wb(s,p)}let y;this.getUniforms=function(){return y===void 0&&S(this),y};let E;this.getAttributes=function(){return E===void 0&&S(this),E};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(p,mb)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gb++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=_,this.fragmentShader=b,this}var Ob=0,Nf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Uf(e),t.set(e,n)),n}},Uf=class{constructor(e){this.id=Ob++,this.code=e,this.usedTimes=0}};function Bb(i){return i===ks||i===Fo||i===Oo}function kb(i,e,t,n,s,r){let a=new io,o=new Nf,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(y){return l.add(y),y===0?"uv":`uv${y}`}function p(y,E,C,R,A,L){let O=R.fog,I=A.geometry,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,V=e.get(y.envMap||G,q),re=d[y.type],X=n.precision;y.precision!==null&&(X=n.getMaxPrecision(y.precision),X!==y.precision&&Ze("WebGLProgram.getParameters:",y.precision,"not supported, using",X,"instead."));let ee=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ae=ee!==void 0?ee.length:0,Ie=0;I.morphAttributes.position!==void 0&&(Ie=1),I.morphAttributes.normal!==void 0&&(Ie=2),I.morphAttributes.color!==void 0&&(Ie=3);let Fe,ie,F,te;if(re){let Pe=Vi[re];Fe=Pe.vertexShader,ie=Pe.fragmentShader}else{Fe=y.vertexShader,ie=y.fragmentShader;let Pe=o.getVertexShaderStage(y),It=o.getFragmentShaderStage(y);o.update(y,Pe,It),F=Pe.id,te=It.id}let H=i.getRenderTarget(),j=i.state.buffers.depth.getReversed(),z=A.isInstancedMesh===!0,Ge=A.isBatchedMesh===!0,de=!!y.map,Re=!!y.matcap,ce=!!V,N=ce&&V.isPMREMTexture===!0,J=!!y.aoMap,W=!!y.lightMap,Y=!!y.bumpMap&&y.wireframe===!1,xe=!!y.normalMap,We=!!y.displacementMap,Be=!!y.emissiveMap,tt=!!y.metalnessMap,nt=!!y.roughnessMap,pt=y.anisotropy>0,B=y.clearcoat>0,kt=y.diffuseRoughness>0,rt=y.dispersion>0,ot=y.retroreflectivity>0,_e=y.iridescence>0,Pt=y.sheen>0,qe=y.transmission>0,je=pt&&!!y.anisotropyMap,P=B&&!!y.clearcoatMap,w=B&&!!y.clearcoatNormalMap,Z=B&&!!y.clearcoatRoughnessMap,ve=kt&&!!y.diffuseRoughnessMap,fe=_e&&!!y.iridescenceMap,Te=_e&&!!y.iridescenceThicknessMap,Ce=Pt&&!!y.sheenColorMap,oe=Pt&&!!y.sheenRoughnessMap,le=!!y.specularMap,Ee=!!y.specularColorMap,U=!!y.specularIntensityMap,ue=qe&&!!y.transmissionMap,se=qe&&!!y.thicknessMap,we=!!y.gradientMap,Se=!!y.alphaMap,Ae=y.alphaTest>0,Ve=!!y.alphaHash,ht=!!y.extensions,he=Hi;y.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(he=i.toneMapping);let Ye=N?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,lt={shaderID:re,shaderType:y.type,shaderName:y.name,vertexShader:Fe,fragmentShader:ie,defines:y.defines,customVertexShaderID:F,customFragmentShaderID:te,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:X,batching:Ge,batchingColor:Ge&&A._colorsTexture!==null,instancing:z,instancingColor:z&&A.instanceColor!==null,instancingMorph:z&&A.morphTexture!==null,outputColorSpace:H===null?i.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:vt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:de,matcap:Re,envMap:ce,envMapMode:ce&&V.mapping,envMapPMREM:N,envMapMaxLod:N?Ye.length-1:null,envMapSize:N?Ye[0].width:null,aoMap:J,lightMap:W,bumpMap:Y,normalMap:xe,displacementMap:We,emissiveMap:Be,normalMapObjectSpace:xe&&y.normalMapType===Gp,normalMapTangentSpace:xe&&y.normalMapType===ko,packedNormalMap:xe&&y.normalMapType===ko&&Bb(y.normalMap.format),metalnessMap:tt,roughnessMap:nt,anisotropy:pt,anisotropyMap:je,clearcoat:B,clearcoatMap:P,clearcoatNormalMap:w,clearcoatRoughnessMap:Z,diffuseRoughness:kt,diffuseRoughnessMap:ve,dispersion:rt,retroreflection:ot,iridescence:_e,iridescenceMap:fe,iridescenceThicknessMap:Te,sheen:Pt,sheenColorMap:Ce,sheenRoughnessMap:oe,specularMap:le,specularColorMap:Ee,specularIntensityMap:U,transmission:qe,transmissionMap:ue,thicknessMap:se,gradientMap:we,opaque:y.transparent===!1&&y.blending===Bs&&y.alphaToCoverage===!1,alphaMap:Se,alphaTest:Ae,alphaHash:Ve,combine:y.combine,mapUv:de&&h(y.map.channel),aoMapUv:J&&h(y.aoMap.channel),lightMapUv:W&&h(y.lightMap.channel),bumpMapUv:Y&&h(y.bumpMap.channel),normalMapUv:xe&&h(y.normalMap.channel),displacementMapUv:We&&h(y.displacementMap.channel),emissiveMapUv:Be&&h(y.emissiveMap.channel),metalnessMapUv:tt&&h(y.metalnessMap.channel),roughnessMapUv:nt&&h(y.roughnessMap.channel),anisotropyMapUv:je&&h(y.anisotropyMap.channel),clearcoatMapUv:P&&h(y.clearcoatMap.channel),clearcoatNormalMapUv:w&&h(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&h(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ve&&h(y.diffuseRoughnessMap.channel),iridescenceMapUv:fe&&h(y.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&h(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&h(y.sheenColorMap.channel),sheenRoughnessMapUv:oe&&h(y.sheenRoughnessMap.channel),specularMapUv:le&&h(y.specularMap.channel),specularColorMapUv:Ee&&h(y.specularColorMap.channel),specularIntensityMapUv:U&&h(y.specularIntensityMap.channel),transmissionMapUv:ue&&h(y.transmissionMap.channel),thicknessMapUv:se&&h(y.thicknessMap.channel),alphaMapUv:Se&&h(y.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(xe||pt),vertexNormals:!!I.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!I.attributes.uv&&(de||Se),fog:!!O,useFog:y.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||I.attributes.normal===void 0&&xe===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:j,skinning:A.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:Ie,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:L.filter(Pe=>Pe.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:de&&y.map.isVideoTexture===!0&&vt.getTransfer(y.map.colorSpace)===Ut,decodeVideoTextureEmissive:Be&&y.emissiveMap.isVideoTexture===!0&&vt.getTransfer(y.emissiveMap.colorSpace)===Ut,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Zt,flipSided:y.side===Hn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ht&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ht&&y.extensions.multiDraw===!0||Ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return lt.vertexUv1s=l.has(1),lt.vertexUv2s=l.has(2),lt.vertexUv3s=l.has(3),l.clear(),lt}function x(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let C in y.defines)E.push(C),E.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(g(E,y),m(E,y),E.push(i.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function g(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapPMREM),y.push(E.envMapMaxLod),y.push(E.envMapSize),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.diffuseRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.numSunLights),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numSunLightShadows),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.numLightProbeGrids),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function m(y,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.diffuseRoughness&&a.enable(25),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function v(y){let E=d[y.type],C;if(E){let R=Vi[E];C=sm.clone(R.uniforms)}else C=y.uniforms;return C}function M(y,E){let C=u.get(E);return C!==void 0?++C.usedTimes:(C=new Fb(i,E,y,s),c.push(C),u.set(E,C)),C}function _(y){if(--y.usedTimes===0){let E=c.indexOf(y);c[E]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function b(y){o.remove(y)}function S(){o.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:v,acquireProgram:M,releaseProgram:_,releaseShaderCache:b,programs:c,dispose:S}}function zb(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Hb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Em(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wm(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function o(d,h,p,x,g,m){let v=i[e];return v===void 0?(v={id:d.id,object:d,geometry:h,material:p,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:g,group:m},i[e]=v):(v.id=d.id,v.object=d,v.geometry=h,v.material=p,v.materialVariant=a(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=g,v.group=m),e++,v}function l(d,h,p,x,g,m,v){v.reversedDepth===!0&&(g=-g);let M=o(d,h,p,x,g,m);p.transmission>0?n.push(M):p.transparent===!0?s.push(M):t.push(M)}function c(d,h,p,x,g,m){let v=o(d,h,p,x,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?s.unshift(v):t.unshift(v)}function u(d,h){t.length>1&&t.sort(d||Hb),n.length>1&&n.sort(h||Em),s.length>1&&s.sort(h||Em)}function f(){for(let d=e,h=i.length;d<h;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function Gb(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new wm,i.set(n,[a])):s>=r.length?(a=new wm,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Vb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new D,color:new be};break;case"SpotLight":t={position:new D,direction:new D,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function Wb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Xb=0;function qb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Yb(i){let e=new Vb,t=Wb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new Ke,a=new Ke;function o(c){let u=0,f=0,d=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let h=0,p=0,x=0,g=0,m=0,v=0,M=0,_=0,b=0,S=0,y=0,E=0,C=0,R=0;c.sort(qb);for(let L=0,O=c.length;L<O;L++){let I=c[L],G=I.color,q=I.intensity,V=I.distance,re=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ks?re=I.shadow.map.texture:re=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=G.r*q,f+=G.g*q,d+=G.b*q;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],q);R++}else if(I.isSunLight){let X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let ee=I.shadow,ae=t.get(I);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[p]=ae,n.sunShadowMap[p]=re;let Ie=ee.getViewportCount();for(let Fe=0;Fe<Ie;Fe++)n.sunShadowMatrix[x+Fe]=ee.getMatrix(Fe),n.sunShadowCascade[x+Fe]=ee._cascadeData[Fe];x+=Ie,p++}n.sun[h]=X,h++}else if(I.isDirectionalLight){let X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let ee=I.shadow,ae=t.get(I);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize=ee.mapSize,n.directionalShadow[g]=ae,n.directionalShadowMap[g]=re,n.directionalShadowMatrix[g]=I.shadow.matrix,b++}n.directional[g]=X,g++}else if(I.isSpotLight){let X=e.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(G).multiplyScalar(q),X.distance=V,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[v]=X;let ee=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,ee.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[v]=ee.matrix,I.castShadow){let ae=t.get(I);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize=ee.mapSize,n.spotShadow[v]=ae,n.spotShadowMap[v]=re,y++}v++}else if(I.isRectAreaLight){let X=e.get(I);X.color.copy(G).multiplyScalar(q),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[M]=X,M++}else if(I.isPointLight){let X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){let ee=I.shadow,ae=t.get(I);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize=ee.mapSize,ae.shadowCameraNear=ee.camera.near,ae.shadowCameraFar=ee.camera.far,n.pointShadow[m]=ae,n.pointShadowMap[m]=re,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=X,m++}else if(I.isHemisphereLight){let X=e.get(I);X.skyColor.copy(I.color).multiplyScalar(q),X.groundColor.copy(I.groundColor).multiplyScalar(q),n.hemi[_]=X,_++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;let A=n.hash;(A.sunLength!==h||A.directionalLength!==g||A.pointLength!==m||A.spotLength!==v||A.rectAreaLength!==M||A.hemiLength!==_||A.numSunShadows!==p||A.numDirectionalShadows!==b||A.numPointShadows!==S||A.numSpotShadows!==y||A.numSpotMaps!==E||A.numLightProbes!==R)&&(n.sun.length=h,n.directional.length=g,n.spot.length=v,n.rectArea.length=M,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+E-C,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,A.sunLength=h,A.directionalLength=g,A.pointLength=m,A.spotLength=v,A.rectAreaLength=M,A.hemiLength=_,A.numSunShadows=p,A.numDirectionalShadows=b,A.numPointShadows=S,A.numSpotShadows=y,A.numSpotMaps=E,A.numLightProbes=R,n.version=Xb++)}function l(c,u){let f=0,d=0,h=0,p=0,x=0,g=0,m=u.matrixWorldInverse;for(let v=0,M=c.length;v<M;v++){let _=c[v];if(_.isSunLight){let b=n.sun[f];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(m),f++}else if(_.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(_.isSpotLight){let b=n.spot[p];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(_.width*.5,0,0),b.halfHeight.set(0,_.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){let b=n.point[h];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),h++}else if(_.isHemisphereLight){let b=n.hemi[g];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function Tm(i){let e=new Yb(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):t.push(f)}function o(f){n.push(f)}function l(){e.setup(t),s.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function c(f){e.setupView(t,f)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Zb(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Tm(i),e.set(s,[o])):r>=a.length?(o=new Tm(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Kb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$b=`uniform sampler2D shadow_pass;
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
}`,Jb=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],jb=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Am=new Ke,zo=new D,Cf=new D;function Qb(i,e,t){let n=new Ds,s=new ye,r=new ye,a=new bt,o=new gc,l=new xc,c={},u=t.maxTextureSize,f={[di]:Hn,[Hn]:di,[Zt]:Zt},d=new Bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:Kb,fragmentShader:$b}),h=d.clone();h.defines.HORIZONTAL_PASS=1;let p=new St;p.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Qe(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Po;let m=this.type;this.render=function(S,y,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===vp&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Po);let C=i.getRenderTarget(),R=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Sr),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let O=m!==this.type;O&&y.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=S.length;I<G;I++){let q=S[I],V=q.shadow;if(V===void 0){Ze("WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let re=V.getFrameExtents();s.multiply(re),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/re.x),s.x=r.x*re.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/re.y),s.y=r.y*re.y,V.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=X,V.map===null||O===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===_a){if(q.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new ii(s.x,s.y,{format:ks,type:Ri,minFilter:sn,magFilter:sn,generateMipmaps:!1}),V.map.texture.name=q.name+".shadowMap",V.map.depthTexture=new ls(s.x,s.y,oi),V.map.depthTexture.name=q.name+".shadowMapDepth",V.map.depthTexture.format=os,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=nn,V.map.depthTexture.magFilter=nn}else q.isPointLight?(V.map=new Go(s.x),V.map.depthTexture=new uo(s.x,Ai)):(V.map=new ii(s.x,s.y),V.map.depthTexture=new ls(s.x,s.y,Ai)),V.map.depthTexture.name=q.name+".shadowMap",V.map.depthTexture.format=os,this.type===Po?(V.map.depthTexture.compareFunction=X?hf:cf,V.map.depthTexture.minFilter=sn,V.map.depthTexture.magFilter=sn):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=nn,V.map.depthTexture.magFilter=nn);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let ee=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();q.isPointLight!==!0&&V.updateMatrices(q,E);let ae=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:E.layers;for(let Ie=0;Ie<ee;Ie++){let Fe=V.getCamera(Ie);if(q.isPointLight){let ie=V.camera,F=V.matrix,te=q.distance||ie.far;te!==ie.far&&(ie.far=te,ie.updateProjectionMatrix()),zo.setFromMatrixPosition(q.matrixWorld),ie.position.copy(zo),Cf.copy(ie.position),Cf.add(Jb[Ie]),ie.up.copy(jb[Ie]),ie.lookAt(Cf),ie.updateMatrixWorld(),F.makeTranslation(-zo.x,-zo.y,-zo.z),Am.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Am,ie.coordinateSystem,ie.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,Ie),i.clear();else{Ie===0&&(i.setRenderTarget(V.map),i.clear());let ie=V.getViewport(Ie);a.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),L.viewport(a)}n=V.getFrustum(Ie),_(y,E,Fe,q,ae,this.type)}V.isPointLightShadow!==!0&&this.type===_a&&v(V,E),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(C,R,A)};function v(S,y){let E=e.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,h.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),S.mapPass===null?S.mapPass=new ii(s.x,s.y,{format:ks,type:Ri}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(y,null,E,d,x,null),h.uniforms.shadow_pass.value=S.mapPass.texture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(y,null,E,h,x,null)}function M(S,y,E,C){let R=null,A=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(A!==void 0)R=A;else if(R=E.isPointLight===!0?l:o,i.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let L=R.uuid,O=y.uuid,I=c[L];I===void 0&&(I={},c[L]=I);let G=I[O];G===void 0&&(G=R.clone(),I[O]=G,y.addEventListener("dispose",b)),R=G}if(R.visible=y.visible,R.wireframe=y.wireframe,C===_a?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:f[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,E.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let L=i.properties.get(R);L.light=E}return R}function _(S,y,E,C,R,A){if(S.visible===!1)return;if(S.layers.test(R)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===_a)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);let I=e.update(S),G=S.material;if(Array.isArray(G)){let q=I.groups;for(let V=0,re=q.length;V<re;V++){let X=q[V],ee=G[X.materialIndex];if(ee&&ee.visible){let ae=M(S,ee,C,A);S.onBeforeShadow(i,S,y,E,I,ae,X),i.renderBufferDirect(E,null,I,ae,S,X),S.onAfterShadow(i,S,y,E,I,ae,X)}}}else if(G.visible){let q=M(S,G,C,A);S.onBeforeShadow(i,S,y,E,I,q,null),i.renderBufferDirect(E,null,I,q,S,null),S.onAfterShadow(i,S,y,E,I,q,null)}}let O=S.children;for(let I=0,G=O.length;I<G;I++)_(O[I],y,E,C,R,A)}function b(S){S.target.removeEventListener("dispose",b);for(let E in c){let C=c[E],R=S.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}function e2(i,e){function t(){let U=!1,ue=new bt,se=null,we=new bt(0,0,0,0);return{setMask:function(Se){se!==Se&&!U&&(i.colorMask(Se,Se,Se,Se),se=Se)},setLocked:function(Se){U=Se},setClear:function(Se,Ae,Ve,ht,he){he===!0&&(Se*=ht,Ae*=ht,Ve*=ht),ue.set(Se,Ae,Ve,ht),we.equals(ue)===!1&&(i.clearColor(Se,Ae,Ve,ht),we.copy(ue))},reset:function(){U=!1,se=null,we.set(-1,0,0,0)}}}function n(){let U=!1,ue=!1,se=null,we=null,Se=null;return{setReversed:function(Ae){if(ue!==Ae){let Ve=e.get("EXT_clip_control");Ae?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),ue=Ae;let ht=Se;Se=null,this.setClear(ht)}},getReversed:function(){return ue},setTest:function(Ae){Ae?j(i.DEPTH_TEST):z(i.DEPTH_TEST)},setMask:function(Ae){se!==Ae&&!U&&(i.depthMask(Ae),se=Ae)},setFunc:function(Ae){if(ue&&(Ae=jp[Ae]),we!==Ae){switch(Ae){case Jl:i.depthFunc(i.NEVER);break;case jl:i.depthFunc(i.ALWAYS);break;case Ql:i.depthFunc(i.LESS);break;case ta:i.depthFunc(i.LEQUAL);break;case ec:i.depthFunc(i.EQUAL);break;case tc:i.depthFunc(i.GEQUAL);break;case nc:i.depthFunc(i.GREATER);break;case ic:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=Ae}},setLocked:function(Ae){U=Ae},setClear:function(Ae){Se!==Ae&&(Se=Ae,ue&&(Ae=1-Ae),i.clearDepth(Ae))},reset:function(){U=!1,se=null,we=null,Se=null,ue=!1}}}function s(){let U=!1,ue=null,se=null,we=null,Se=null,Ae=null,Ve=null,ht=null,he=null;return{setTest:function(Ye){U||(Ye?j(i.STENCIL_TEST):z(i.STENCIL_TEST))},setMask:function(Ye){ue!==Ye&&!U&&(i.stencilMask(Ye),ue=Ye)},setFunc:function(Ye,lt,Pe){(se!==Ye||we!==lt||Se!==Pe)&&(i.stencilFunc(Ye,lt,Pe),se=Ye,we=lt,Se=Pe)},setOp:function(Ye,lt,Pe){(Ae!==Ye||Ve!==lt||ht!==Pe)&&(i.stencilOp(Ye,lt,Pe),Ae=Ye,Ve=lt,ht=Pe)},setLocked:function(Ye){U=Ye},setClear:function(Ye){he!==Ye&&(i.clearStencil(Ye),he=Ye)},reset:function(){U=!1,ue=null,se=null,we=null,Se=null,Ae=null,Ve=null,ht=null,he=null}}}let r=new t,a=new n,o=new s,l={},c=new WeakMap,u={},f={},d={},h=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,b=null,S=null,y=null,E=new be(0,0,0),C=0,R=!1,A=null,L=null,O=null,I=null,G=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,re=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(X)[1]),V=re>=1):X.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),V=re>=2);let ee=null,ae={},Ie=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),ie=new bt().fromArray(Ie),F=new bt().fromArray(Fe);function te(U,ue,se,we){let Se=new Uint8Array(4),Ae=i.createTexture();i.bindTexture(U,Ae),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ve=0;Ve<se;Ve++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(ue+Ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return Ae}let H={};H[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),H[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),H[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(ta),Y(!1),xe(Vu),j(i.CULL_FACE),J(Sr);function j(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function z(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Ge(U,ue){return d[U]!==ue?(i.bindFramebuffer(U,ue),d[U]=ue,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ue),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function de(U,ue){let se=p,we=!1;if(U){se=h.get(ue),se===void 0&&(se=[],h.set(ue,se));let Se=U.textures;if(se.length!==Se.length||se[0]!==i.COLOR_ATTACHMENT0){for(let Ae=0,Ve=Se.length;Ae<Ve;Ae++)se[Ae]=i.COLOR_ATTACHMENT0+Ae;se.length=Se.length,we=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,we=!0);we&&i.drawBuffers(se)}function Re(U){return x!==U?(i.useProgram(U),x=U,!0):!1}let ce={[Er]:i.FUNC_ADD,[_p]:i.FUNC_SUBTRACT,[Mp]:i.FUNC_REVERSE_SUBTRACT};ce[bp]=i.MIN,ce[Sp]=i.MAX;let N={[Ep]:i.ZERO,[wp]:i.ONE,[Tp]:i.SRC_COLOR,[qu]:i.SRC_ALPHA,[Lp]:i.SRC_ALPHA_SATURATE,[Pp]:i.DST_COLOR,[Rp]:i.DST_ALPHA,[Ap]:i.ONE_MINUS_SRC_COLOR,[Yu]:i.ONE_MINUS_SRC_ALPHA,[Ip]:i.ONE_MINUS_DST_COLOR,[Cp]:i.ONE_MINUS_DST_ALPHA,[Dp]:i.CONSTANT_COLOR,[Np]:i.ONE_MINUS_CONSTANT_COLOR,[Up]:i.CONSTANT_ALPHA,[Fp]:i.ONE_MINUS_CONSTANT_ALPHA};function J(U,ue,se,we,Se,Ae,Ve,ht,he,Ye){if(U===Sr){g===!0&&(z(i.BLEND),g=!1);return}if(g===!1&&(j(i.BLEND),g=!0),U!==yp){if(U!==m||Ye!==R){if((v!==Er||b!==Er)&&(i.blendEquation(i.FUNC_ADD),v=Er,b=Er),Ye)switch(U){case Bs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gn:i.blendFunc(i.ONE,i.ONE);break;case Wu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",U);break}else switch(U){case Bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wu:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xu:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",U);break}M=null,_=null,S=null,y=null,E.set(0,0,0),C=0,m=U,R=Ye}return}Se=Se||ue,Ae=Ae||se,Ve=Ve||we,(ue!==v||Se!==b)&&(i.blendEquationSeparate(ce[ue],ce[Se]),v=ue,b=Se),(se!==M||we!==_||Ae!==S||Ve!==y)&&(i.blendFuncSeparate(N[se],N[we],N[Ae],N[Ve]),M=se,_=we,S=Ae,y=Ve),(ht.equals(E)===!1||he!==C)&&(i.blendColor(ht.r,ht.g,ht.b,he),E.copy(ht),C=he),m=U,R=!1}function W(U,ue){U.side===Zt?z(i.CULL_FACE):j(i.CULL_FACE);let se=U.side===Hn;ue&&(se=!se),Y(se),U.blending===Bs&&U.transparent===!1?J(Sr):J(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let we=U.stencilWrite;o.setTest(we),we&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Be(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):z(i.SAMPLE_ALPHA_TO_COVERAGE)}function Y(U){A!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),A=U)}function xe(U){U!==gp?(j(i.CULL_FACE),U!==L&&(U===Vu?i.cullFace(i.BACK):U===xp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):z(i.CULL_FACE),L=U}function We(U){U!==O&&(V&&i.lineWidth(U),O=U)}function Be(U,ue,se){U?(j(i.POLYGON_OFFSET_FILL),(I!==ue||G!==se)&&(I=ue,G=se,a.getReversed()&&(ue=-ue,se=-se),i.polygonOffset(ue,se))):z(i.POLYGON_OFFSET_FILL)}function tt(U){U?j(i.SCISSOR_TEST):z(i.SCISSOR_TEST)}function nt(U){U===void 0&&(U=i.TEXTURE0+q-1),ee!==U&&(i.activeTexture(U),ee=U)}function pt(U,ue,se){se===void 0&&(ee===null?se=i.TEXTURE0+q-1:se=ee);let we=ae[se];we===void 0&&(we={type:void 0,texture:void 0},ae[se]=we),(we.type!==U||we.texture!==ue)&&(ee!==se&&(i.activeTexture(se),ee=se),i.bindTexture(U,ue||H[U]),we.type=U,we.texture=ue)}function B(){let U=ae[ee];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function kt(){try{i.compressedTexImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function rt(){try{i.compressedTexImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function ot(){try{i.texSubImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function _e(){try{i.texSubImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function Pt(){try{i.compressedTexSubImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function qe(){try{i.compressedTexSubImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function je(){try{i.texStorage2D(...arguments)}catch(U){it("WebGLState:",U)}}function P(){try{i.texStorage3D(...arguments)}catch(U){it("WebGLState:",U)}}function w(){try{i.texImage2D(...arguments)}catch(U){it("WebGLState:",U)}}function Z(){try{i.texImage3D(...arguments)}catch(U){it("WebGLState:",U)}}function ve(U){return f[U]!==void 0?f[U]:i.getParameter(U)}function fe(U,ue){f[U]!==ue&&(i.pixelStorei(U,ue),f[U]=ue)}function Te(U){ie.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ie.copy(U))}function Ce(U){F.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),F.copy(U))}function oe(U,ue){let se=c.get(ue);se===void 0&&(se=new WeakMap,c.set(ue,se));let we=se.get(U);we===void 0&&(we=i.getUniformBlockIndex(ue,U.name),i.uniformBlockBinding(ue,we,we),se.set(U,we))}function le(U,ue,se){let Se=c.get(ue).get(U);l[Se]!==se&&(i.bindBufferBase(i.UNIFORM_BUFFER,Se,se),l[Se]=se)}function Ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},ee=null,ae={},d={},l={},h=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,b=null,S=null,y=null,E=new be(0,0,0),C=0,R=!1,A=null,L=null,O=null,I=null,G=null,ie.set(0,0,i.canvas.width,i.canvas.height),F.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:z,bindFramebuffer:Ge,drawBuffers:de,useProgram:Re,setBlending:J,setMaterial:W,setFlipSided:Y,setCullFace:xe,setLineWidth:We,setPolygonOffset:Be,setScissorTest:tt,activeTexture:nt,bindTexture:pt,unbindTexture:B,compressedTexImage2D:kt,compressedTexImage3D:rt,texImage2D:w,texImage3D:Z,pixelStorei:fe,getParameter:ve,updateUBOMapping:oe,uniformBlockBinding:le,texStorage2D:je,texStorage3D:P,texSubImage2D:ot,texSubImage3D:_e,compressedTexSubImage2D:Pt,compressedTexSubImage3D:qe,scissor:Te,viewport:Ce,reset:Ee}}function t2(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,u=new WeakMap,f=new Set,d,h=new WeakMap,p=new Set,x=new FinalizationRegistry(P=>p.delete(P)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,w){return g?new OffscreenCanvas(P,w):sa("canvas")}function v(P,w,Z){let ve=1,fe=je(P);if((fe.width>Z||fe.height>Z)&&(ve=Z/Math.max(fe.width,fe.height)),ve<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let Te=Math.floor(ve*fe.width),Ce=Math.floor(ve*fe.height);d===void 0&&(d=m(Te,Ce));let oe=w?m(Te,Ce):d;return oe.width=Te,oe.height=Ce,oe.getContext("2d").drawImage(P,0,0,Te,Ce),Ze("WebGLRenderer: Texture has been resized from ("+fe.width+"x"+fe.height+") to ("+Te+"x"+Ce+")."),oe}else return"data"in P&&Ze("WebGLRenderer: Image in DataTexture is too big ("+fe.width+"x"+fe.height+")."),P;return P}function M(P){return P.generateMipmaps}function _(P){i.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(P,w,Z,ve,fe,Te=!1){if(P!==null){if(i[P]!==void 0)return i[P];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Ce;ve&&(Ce=e.get("EXT_texture_norm16"),Ce||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=w;if(w===i.RED&&(Z===i.FLOAT&&(oe=i.R32F),Z===i.HALF_FLOAT&&(oe=i.R16F),Z===i.UNSIGNED_BYTE&&(oe=i.R8),Z===i.UNSIGNED_SHORT&&Ce&&(oe=Ce.R16_EXT),Z===i.SHORT&&Ce&&(oe=Ce.R16_SNORM_EXT)),w===i.RED_INTEGER&&(Z===i.UNSIGNED_BYTE&&(oe=i.R8UI),Z===i.UNSIGNED_SHORT&&(oe=i.R16UI),Z===i.UNSIGNED_INT&&(oe=i.R32UI),Z===i.BYTE&&(oe=i.R8I),Z===i.SHORT&&(oe=i.R16I),Z===i.INT&&(oe=i.R32I)),w===i.RG&&(Z===i.FLOAT&&(oe=i.RG32F),Z===i.HALF_FLOAT&&(oe=i.RG16F),Z===i.UNSIGNED_BYTE&&(oe=i.RG8),Z===i.UNSIGNED_SHORT&&Ce&&(oe=Ce.RG16_EXT),Z===i.SHORT&&Ce&&(oe=Ce.RG16_SNORM_EXT)),w===i.RG_INTEGER&&(Z===i.UNSIGNED_BYTE&&(oe=i.RG8UI),Z===i.UNSIGNED_SHORT&&(oe=i.RG16UI),Z===i.UNSIGNED_INT&&(oe=i.RG32UI),Z===i.BYTE&&(oe=i.RG8I),Z===i.SHORT&&(oe=i.RG16I),Z===i.INT&&(oe=i.RG32I)),w===i.RGB_INTEGER&&(Z===i.UNSIGNED_BYTE&&(oe=i.RGB8UI),Z===i.UNSIGNED_SHORT&&(oe=i.RGB16UI),Z===i.UNSIGNED_INT&&(oe=i.RGB32UI),Z===i.BYTE&&(oe=i.RGB8I),Z===i.SHORT&&(oe=i.RGB16I),Z===i.INT&&(oe=i.RGB32I)),w===i.RGBA_INTEGER&&(Z===i.UNSIGNED_BYTE&&(oe=i.RGBA8UI),Z===i.UNSIGNED_SHORT&&(oe=i.RGBA16UI),Z===i.UNSIGNED_INT&&(oe=i.RGBA32UI),Z===i.BYTE&&(oe=i.RGBA8I),Z===i.SHORT&&(oe=i.RGBA16I),Z===i.INT&&(oe=i.RGBA32I)),w===i.RGB&&(Z===i.UNSIGNED_SHORT&&Ce&&(oe=Ce.RGB16_EXT),Z===i.SHORT&&Ce&&(oe=Ce.RGB16_SNORM_EXT),Z===i.UNSIGNED_INT_5_9_9_9_REV&&(oe=i.RGB9_E5),Z===i.UNSIGNED_INT_10F_11F_11F_REV&&(oe=i.R11F_G11F_B10F)),w===i.RGBA){let le=Te?eo:vt.getTransfer(fe);Z===i.FLOAT&&(oe=i.RGBA32F),Z===i.HALF_FLOAT&&(oe=i.RGBA16F),Z===i.UNSIGNED_BYTE&&(oe=le===Ut?i.SRGB8_ALPHA8:i.RGBA8),Z===i.UNSIGNED_SHORT&&Ce&&(oe=Ce.RGBA16_EXT),Z===i.SHORT&&Ce&&(oe=Ce.RGBA16_SNORM_EXT),Z===i.UNSIGNED_SHORT_4_4_4_4&&(oe=i.RGBA4),Z===i.UNSIGNED_SHORT_5_5_5_1&&(oe=i.RGB5_A1)}return(oe===i.R16F||oe===i.R32F||oe===i.RG16F||oe===i.RG32F||oe===i.RGBA16F||oe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function y(P,w){let Z;return P?w===null||w===Ai||w===Ar?Z=i.DEPTH24_STENCIL8:w===oi?Z=i.DEPTH32F_STENCIL8:w===Sa&&(Z=i.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ai||w===Ar?Z=i.DEPTH_COMPONENT24:w===oi?Z=i.DEPTH_COMPONENT32F:w===Sa&&(Z=i.DEPTH_COMPONENT16),Z}function E(P,w){return M(P)===!0||P.isFramebufferTexture&&P.minFilter!==nn&&P.minFilter!==sn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function C(P){let w=new WeakRef(P);n.get(P).__ref=w,p.add(w),x.register(P,w,w)}function R(P){let w=n.get(P).__ref;w!==void 0&&(p.delete(w),x.unregister(w))}function A(P){O(P.target)}function L(P){I(P.target)}function O(P){P.removeEventListener("dispose",A),R(P),q(P),P.isVideoTexture&&u.delete(P),P.isHTMLTexture&&f.delete(P)}function I(P){P.removeEventListener("dispose",L),R(P),re(P)}function G(){for(let P of p){let w=P.deref();w!==void 0&&(w.isRenderTarget===!0?I(w):O(w))}p.clear(),f.clear()}function q(P){let w=n.get(P);if(w.__webglInit===void 0)return;let Z=P.source,ve=h.get(Z);if(ve){let fe=ve[w.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&V(P),Object.keys(ve).length===0&&h.delete(Z)}n.remove(P)}function V(P){let w=n.get(P);i.deleteTexture(w.__webglTexture);let Z=P.source,ve=h.get(Z);delete ve[w.__cacheKey],a.memory.textures--}function re(P){let w=n.get(P);w.__depthDisposeCallback&&w.__depthDisposeCallback();let Z=P.depthTexture;if(Z&&Z.renderTarget===P&&O(Z),P.isWebGLCubeRenderTarget)for(let fe=0;fe<6;fe++){if(Array.isArray(w.__webglFramebuffer[fe]))for(let Te=0;Te<w.__webglFramebuffer[fe].length;Te++)i.deleteFramebuffer(w.__webglFramebuffer[fe][Te]);else i.deleteFramebuffer(w.__webglFramebuffer[fe]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[fe])}else{if(Array.isArray(w.__webglFramebuffer))for(let fe=0;fe<w.__webglFramebuffer.length;fe++)i.deleteFramebuffer(w.__webglFramebuffer[fe]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let fe=0;fe<w.__webglColorRenderbuffer.length;fe++)w.__webglColorRenderbuffer[fe]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[fe]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let ve=P.textures;for(let fe=0,Te=ve.length;fe<Te;fe++){let Ce=n.get(ve[fe]);Ce.__webglTexture&&(i.deleteTexture(Ce.__webglTexture),a.memory.textures--),n.remove(ve[fe])}n.remove(P)}let X=0;function ee(){X=0}function ae(){return X}function Ie(P){X=P}function Fe(){let P=X;return P>=s.maxTextures&&Ze("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,P}function ie(P){let w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.mipmapsAutoUpdate),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function F(P,w){let Z=n.get(P);if(P.isVideoTexture&&Pt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&Z.__version!==P.version){let ve=P.image;if(ve===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{W(Z,P,w);return}}else P.isExternalTexture&&(Z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,Z.__webglTexture,i.TEXTURE0+w)}function te(P,w){let Z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Z.__version!==P.version){W(Z,P,w);return}else P.isExternalTexture&&(Z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,Z.__webglTexture,i.TEXTURE0+w)}function H(P,w){let Z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Z.__version!==P.version){W(Z,P,w);return}t.bindTexture(i.TEXTURE_3D,Z.__webglTexture,i.TEXTURE0+w)}function j(P,w){let Z=n.get(P);if(P.version>0&&Z.__version!==P.version){Y(Z,P,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture,i.TEXTURE0+w)}let z={[wi]:i.REPEAT,[hi]:i.CLAMP_TO_EDGE,[na]:i.MIRRORED_REPEAT},Ge={[nn]:i.NEAREST,[Pc]:i.NEAREST_MIPMAP_NEAREST,[Tr]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[ba]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},de={[Wp]:i.NEVER,[uf]:i.ALWAYS,[Xp]:i.LESS,[cf]:i.LEQUAL,[qp]:i.EQUAL,[hf]:i.GEQUAL,[Yp]:i.GREATER,[Zp]:i.NOTEQUAL};function Re(P,w){if(w.type===oi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===sn||w.magFilter===ba||w.magFilter===Tr||w.magFilter===Zn||w.minFilter===sn||w.minFilter===ba||w.minFilter===Tr||w.minFilter===Zn)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,z[w.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,z[w.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,z[w.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Ge[w.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Ge[w.minFilter]),w.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,de[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===nn||w.minFilter!==Tr&&w.minFilter!==Zn||w.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let Z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ce(P,w){let Z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",A),C(w));let ve=w.source,fe=h.get(ve);fe===void 0&&(fe={},h.set(ve,fe));let Te=ie(w);if(Te!==P.__cacheKey){fe[Te]===void 0&&(fe[Te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Z=!0),fe[Te].usedTimes++;let Ce=fe[P.__cacheKey];Ce!==void 0&&(fe[P.__cacheKey].usedTimes--,Ce.usedTimes===0&&V(w)),P.__cacheKey=Te,P.__webglTexture=fe[Te].texture}return Z}function N(P,w,Z){return Math.floor(Math.floor(P/Z)/w)}function J(P,w,Z,ve){let Te=P.updateRanges;if(Te.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,Z,ve,w.data);else{Te.sort((U,ue)=>U.start-ue.start);let Ce=0;for(let U=1;U<Te.length;U++){let ue=Te[Ce],se=Te[U],we=ue.start+ue.count,Se=N(se.start,w.width,4),Ae=N(ue.start,w.width,4);se.start<=we+1&&Se===Ae&&N(se.start+se.count-1,w.width,4)===Se?ue.count=Math.max(ue.count,se.start+se.count-ue.start):(++Ce,Te[Ce]=se)}Te.length=Ce+1;let oe=t.getParameter(i.UNPACK_ROW_LENGTH),le=t.getParameter(i.UNPACK_SKIP_PIXELS),Ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let U=0,ue=Te.length;U<ue;U++){let se=Te[U],we=Math.floor(se.start/4),Se=Math.ceil(se.count/4),Ae=we%w.width,Ve=Math.floor(we/w.width),ht=Se,he=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ae),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ve),t.texSubImage2D(i.TEXTURE_2D,0,Ae,Ve,ht,he,Z,ve,w.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,oe),t.pixelStorei(i.UNPACK_SKIP_PIXELS,le),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function W(P,w,Z){let ve=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ve=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ve=i.TEXTURE_3D);let fe=ce(P,w),Te=w.source;t.bindTexture(ve,P.__webglTexture,i.TEXTURE0+Z);let Ce=n.get(Te);if(Te.version!==Ce.__version||fe===!0){if(t.activeTexture(i.TEXTURE0+Z),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let he=vt.getPrimaries(vt.workingColorSpace),Ye=w.colorSpace===vs?null:vt.getPrimaries(w.colorSpace),lt=w.colorSpace===vs||he===Ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt)}t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let le=v(w.image,!1,s.maxTextureSize);le=qe(w,le);let Ee=r.convert(w.format,w.colorSpace),U=r.convert(w.type),ue=S(w.internalFormat,Ee,U,w.normalized,w.colorSpace,w.isVideoTexture);Re(ve,w);let se,we=w.mipmaps,Se=w.isVideoTexture!==!0,Ae=Ce.__version===void 0||fe===!0,Ve=Te.dataReady,ht=E(w,le);if(w.isDepthTexture)ue=y(w.format===xs,w.type),Ae&&(Se?t.texStorage2D(i.TEXTURE_2D,1,ue,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,ue,le.width,le.height,0,Ee,U,null));else if(w.isDataTexture)if(we.length>0){Se&&Ae&&t.texStorage2D(i.TEXTURE_2D,ht,ue,we[0].width,we[0].height);for(let he=0,Ye=we.length;he<Ye;he++)se=we[he],Se?Ve&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,se.width,se.height,Ee,U,se.data):t.texImage2D(i.TEXTURE_2D,he,ue,se.width,se.height,0,Ee,U,se.data);w.generateMipmaps=!1}else Se?(Ae&&t.texStorage2D(i.TEXTURE_2D,ht,ue,le.width,le.height),Ve&&J(w,le,Ee,U)):t.texImage2D(i.TEXTURE_2D,0,ue,le.width,le.height,0,Ee,U,le.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Se&&Ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ht,ue,we[0].width,we[0].height,le.depth);for(let he=0,Ye=we.length;he<Ye;he++)if(se=we[he],w.format!==pi)if(Ee!==null)if(Se){if(Ve)if(w.layerUpdates.size>0){let lt=bf(se.width,se.height,w.format,w.type);for(let Pe of w.layerUpdates){let It=se.data.subarray(Pe*lt/se.data.BYTES_PER_ELEMENT,(Pe+1)*lt/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,Pe,se.width,se.height,1,Ee,It)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,se.width,se.height,le.depth,Ee,se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,ue,se.width,se.height,le.depth,0,se.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?Ve&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,se.width,se.height,le.depth,Ee,U,se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,ue,se.width,se.height,le.depth,0,Ee,U,se.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Se&&Ae&&t.texStorage2D(i.TEXTURE_2D,ht,ue,we[0].width,we[0].height);for(let he=0,Ye=we.length;he<Ye;he++)se=we[he],w.format!==pi?Ee!==null?Se?Ve&&t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,se.width,se.height,Ee,se.data):t.compressedTexImage2D(i.TEXTURE_2D,he,ue,se.width,se.height,0,se.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?Ve&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,se.width,se.height,Ee,U,se.data):t.texImage2D(i.TEXTURE_2D,he,ue,se.width,se.height,0,Ee,U,se.data)}else if(w.isDataArrayTexture)if(Se){if(Ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ht,ue,le.width,le.height,le.depth),Ve)if(w.layerUpdates.size>0){let he=bf(le.width,le.height,w.format,w.type);for(let Ye of w.layerUpdates){let lt=le.data.subarray(Ye*he/le.data.BYTES_PER_ELEMENT,(Ye+1)*he/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ye,le.width,le.height,1,Ee,U,lt)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ee,U,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ue,le.width,le.height,le.depth,0,Ee,U,le.data);else if(w.isData3DTexture)Se?(Ae&&t.texStorage3D(i.TEXTURE_3D,ht,ue,le.width,le.height,le.depth),Ve&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ee,U,le.data)):t.texImage3D(i.TEXTURE_3D,0,ue,le.width,le.height,le.depth,0,Ee,U,le.data);else if(w.isFramebufferTexture){if(Ae)if(Se)t.texStorage2D(i.TEXTURE_2D,ht,ue,le.width,le.height);else{let he=le.width,Ye=le.height;for(let lt=0;lt<ht;lt++)t.texImage2D(i.TEXTURE_2D,lt,ue,he,Ye,0,Ee,U,null),he>>=1,Ye>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){let he=i.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),le.parentNode!==he){he.appendChild(le),f.add(w),he.onpaint=Ye=>{let lt=Ye.changedElements;for(let Pe of f)lt.includes(Pe.image)&&(Pe.needsUpdate=!0)},he.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,le);else{let lt=i.RGBA,Pe=i.RGBA,It=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,lt,Pe,It,le)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(we.length>0){if(Se&&Ae){let he=je(we[0]);t.texStorage2D(i.TEXTURE_2D,ht,ue,he.width,he.height)}for(let he=0,Ye=we.length;he<Ye;he++)se=we[he],Se?Ve&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Ee,U,se):t.texImage2D(i.TEXTURE_2D,he,ue,Ee,U,se);w.generateMipmaps=!1}else if(Se){if(Ae){let he=je(le);t.texStorage2D(i.TEXTURE_2D,ht,ue,he.width,he.height)}Ve&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,U,le)}else t.texImage2D(i.TEXTURE_2D,0,ue,Ee,U,le);M(w)&&w.mipmapsAutoUpdate===!0&&_(ve),Ce.__version=Te.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Y(P,w,Z){if(w.image.length!==6)return;let ve=ce(P,w),fe=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+Z);let Te=n.get(fe);if(fe.version!==Te.__version||ve===!0){t.activeTexture(i.TEXTURE0+Z);let Ce=vt.getPrimaries(vt.workingColorSpace),oe=w.colorSpace===vs?null:vt.getPrimaries(w.colorSpace),le=w.colorSpace===vs||Ce===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let Ee=w.isCompressedTexture||w.image[0].isCompressedTexture,U=w.image[0]&&w.image[0].isDataTexture,ue=[];for(let Pe=0;Pe<6;Pe++)!Ee&&!U?ue[Pe]=v(w.image[Pe],!0,s.maxCubemapSize):ue[Pe]=U?w.image[Pe].image:w.image[Pe],ue[Pe]=qe(w,ue[Pe]);let se=ue[0],we=r.convert(w.format,w.colorSpace),Se=r.convert(w.type),Ae=S(w.internalFormat,we,Se,w.normalized,w.colorSpace),Ve=w.isVideoTexture!==!0,ht=Te.__version===void 0||ve===!0,he=fe.dataReady,Ye=E(w,se);Re(i.TEXTURE_CUBE_MAP,w);let lt;if(w.isDepthTexture){if(Ae=y(w.format===xs,w.type),ht)if(Ve)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Ae,se.width,se.height);else for(let Pe=0;Pe<6;Pe++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Ae,se.width,se.height,0,we,Se,null)}else if(Ee){Ve&&ht&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ye,Ae,se.width,se.height);for(let Pe=0;Pe<6;Pe++){lt=ue[Pe].mipmaps;for(let It=0;It<lt.length;It++){let tn=lt[It];w.format!==pi?we!==null?Ve?he&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It,0,0,tn.width,tn.height,we,tn.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It,Ae,tn.width,tn.height,0,tn.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It,0,0,tn.width,tn.height,we,Se,tn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It,Ae,tn.width,tn.height,0,we,Se,tn.data)}}}else{if(lt=w.mipmaps,Ve&&ht){lt.length>0&&Ye++;let Pe=je(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ye,Ae,Pe.width,Pe.height)}for(let Pe=0;Pe<6;Pe++)if(U){Ve?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,0,0,ue[Pe].width,ue[Pe].height,we,Se,ue[Pe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Ae,ue[Pe].width,ue[Pe].height,0,we,Se,ue[Pe].data);for(let It=0;It<lt.length;It++){let Li=lt[It].image[Pe].image;Ve?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It+1,0,0,Li.width,Li.height,we,Se,Li.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It+1,Ae,Li.width,Li.height,0,we,Se,Li.data)}}else{Ve?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,0,0,we,Se,ue[Pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Ae,we,Se,ue[Pe]);for(let It=0;It<lt.length;It++){let tn=lt[It];Ve?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It+1,0,0,we,Se,tn.image[Pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,It+1,Ae,we,Se,tn.image[Pe])}}}M(w)&&w.mipmapsAutoUpdate===!0&&_(i.TEXTURE_CUBE_MAP),Te.__version=fe.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function xe(P,w,Z,ve,fe,Te){let Ce=r.convert(Z.format,Z.colorSpace),oe=r.convert(Z.type),le=S(Z.internalFormat,Ce,oe,Z.normalized,Z.colorSpace),Ee=n.get(w),U=n.get(Z);if(U.__renderTarget=w,!Ee.__hasExternalTextures){let ue=Math.max(1,w.width>>Te),se=Math.max(1,w.height>>Te);fe===i.TEXTURE_3D||fe===i.TEXTURE_2D_ARRAY?t.texImage3D(fe,Te,le,ue,se,w.depth,0,Ce,oe,null):t.texImage2D(fe,Te,le,ue,se,0,Ce,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),_e(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ve,fe,U.__webglTexture,0,ot(w)):(fe===i.TEXTURE_2D||fe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ve,fe,U.__webglTexture,Te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(P,w,Z){if(i.bindRenderbuffer(i.RENDERBUFFER,P),w.depthBuffer){let ve=w.depthTexture,fe=ve&&ve.isDepthTexture?ve.type:null,Te=y(w.stencilBuffer,fe),Ce=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(w),Te,w.width,w.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(w),Te,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Te,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,P)}else{let ve=w.textures;for(let fe=0;fe<ve.length;fe++){let Te=ve[fe],Ce=r.convert(Te.format,Te.colorSpace),oe=r.convert(Te.type),le=S(Te.internalFormat,Ce,oe,Te.normalized,Te.colorSpace);_e(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(w),le,w.width,w.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(w),le,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,le,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Be(P,w,Z){let ve=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let fe=n.get(w.depthTexture);fe.__renderTarget=w;let Te=ve?w.depthTexture.image[0]:w.depthTexture.image;(!fe.__webglTexture||Te.width!==w.width||Te.height!==w.height)&&(Te.width=w.width,Te.height=w.height,w.depthTexture.needsUpdate=!0),ve?j(w.depthTexture,0):F(w.depthTexture,0);let Ce=fe.__webglTexture,oe=ot(w),le=ve?i.TEXTURE_CUBE_MAP_POSITIVE_X+Z:i.TEXTURE_2D,Ee=w.depthTexture.format===xs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===os)_e(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,le,Ce,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,le,Ce,0);else if(w.depthTexture.format===xs)_e(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,le,Ce,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,le,Ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(P){let w=n.get(P),Z=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){let ve=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ve){let fe=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ve.removeEventListener("dispose",fe)};ve.addEventListener("dispose",fe),w.__depthDisposeCallback=fe}w.__boundDepthTexture=ve}if(P.depthTexture&&!w.__autoAllocateDepthBuffer)if(Z)for(let ve=0;ve<6;ve++)Be(w.__webglFramebuffer[ve],P,ve);else P.texture.mipmaps.length>0?Be(w.__webglFramebuffer[0],P,0):Be(w.__webglFramebuffer,P,0);else if(Z){w.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[ve]),w.__webglDepthbuffer[ve]===void 0)w.__webglDepthbuffer[ve]=i.createRenderbuffer(),We(w.__webglDepthbuffer[ve],P,!1);else{let fe=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=w.__webglDepthbuffer[ve];i.bindRenderbuffer(i.RENDERBUFFER,Te),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,Te)}}else if(P.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),We(w.__webglDepthbuffer,P,!1);else{let fe=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Te),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,Te)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(P,w,Z){let ve=n.get(P);w!==void 0&&xe(ve.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Z!==void 0&&tt(P)}function pt(P){let w=P.texture,Z=n.get(P),ve=n.get(w);P.addEventListener("dispose",L),C(P);let fe=P.textures,Te=P.isWebGLCubeRenderTarget===!0,Ce=fe.length>1;if(Ce||(ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture()),ve.__version=w.version,a.memory.textures++),Te){Z.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(w.mipmaps.length>0){Z.__webglFramebuffer[oe]=[];for(let le=0;le<w.mipmaps.length;le++)Z.__webglFramebuffer[oe][le]=i.createFramebuffer()}else Z.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(w.mipmaps.length>0){Z.__webglFramebuffer=[];for(let oe=0;oe<w.mipmaps.length;oe++)Z.__webglFramebuffer[oe]=i.createFramebuffer()}else Z.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let oe=0,le=fe.length;oe<le;oe++){let Ee=n.get(fe[oe]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&_e(P)===!1){Z.__webglMultisampledFramebuffer=i.createFramebuffer(),Z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let oe=0;oe<fe.length;oe++){let le=fe[oe];Z.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Z.__webglColorRenderbuffer[oe]);let Ee=r.convert(le.format,le.colorSpace),U=r.convert(le.type),ue=S(le.internalFormat,Ee,U,le.normalized,le.colorSpace,P.isXRRenderTarget===!0),se=ot(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,se,ue,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,Z.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(Z.__webglDepthRenderbuffer=i.createRenderbuffer(),We(Z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Te){t.bindTexture(i.TEXTURE_CUBE_MAP,ve.__webglTexture),Re(i.TEXTURE_CUBE_MAP,w);for(let oe=0;oe<6;oe++)if(w.mipmaps.length>0)for(let le=0;le<w.mipmaps.length;le++)xe(Z.__webglFramebuffer[oe][le],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,le);else xe(Z.__webglFramebuffer[oe],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);M(w)?_(i.TEXTURE_CUBE_MAP):w.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}else if(Ce){for(let oe=0,le=fe.length;oe<le;oe++){let Ee=fe[oe],U=n.get(Ee),ue=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ue=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,U.__webglTexture),Re(ue,Ee),xe(Z.__webglFramebuffer,P,Ee,i.COLOR_ATTACHMENT0+oe,ue,0),M(Ee)&&_(ue)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(oe=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,ve.__webglTexture),Re(oe,w),w.mipmaps.length>0)for(let le=0;le<w.mipmaps.length;le++)xe(Z.__webglFramebuffer[le],P,w,i.COLOR_ATTACHMENT0,oe,le);else xe(Z.__webglFramebuffer,P,w,i.COLOR_ATTACHMENT0,oe,0);M(w)?_(oe):w.mipmaps.length>0&&i.texParameteri(oe,i.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}P.depthBuffer&&tt(P)}function B(P){let w=P.textures;for(let Z=0,ve=w.length;Z<ve;Z++){let fe=w[Z];if(M(fe)&&fe.mipmapsAutoUpdate===!0){let Te=b(P),Ce=n.get(fe).__webglTexture;t.bindTexture(Te,Ce),_(Te),t.unbindTexture()}}}let kt=[];function rt(P){if(P.samples>0){if(_e(P)===!1){let w=P.textures,Z=P.width,ve=P.height,fe=i.COLOR_BUFFER_BIT,Te=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(P),oe=w.length>1;if(oe)for(let Ee=0;Ee<w.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),P.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ee=0;Ee<w.length;Ee++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(fe|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(fe|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ee]);let U=n.get(w[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,U,0)}i.blitFramebuffer(0,0,Z,ve,0,0,Z,ve,fe,i.NEAREST),l===!0&&(kt.length=0,kt.push(i.COLOR_ATTACHMENT0+Ee),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&kt.push(Te),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,kt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let Ee=0;Ee<w.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ee]);let U=n.get(w[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,U,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let w=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function ot(P){return Math.min(s.maxSamples,P.samples)}function _e(P){let w=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Pt(P){let w=a.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function qe(P,w){let Z=P.colorSpace,ve=P.format,fe=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Z!==Fn&&Z!==vs&&(vt.getTransfer(Z)===Ut?(ve!==pi||fe!==Kn)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",Z)),w}function je(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=Fe,this.resetTextureUnits=ee,this.getTextureUnits=ae,this.setTextureUnits=Ie,this.setTexture2D=F,this.setTexture2DArray=te,this.setTexture3D=H,this.setTextureCube=j,this.rebindTextures=nt,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=_e,this.dispose=G}function n2(i,e){function t(n,s=vs){let r,a=vt.getTransfer(s);if(n===Kn)return i.UNSIGNED_BYTE;if(n===Lc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Dc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===tf)return i.BYTE;if(n===nf)return i.SHORT;if(n===Sa)return i.UNSIGNED_SHORT;if(n===Ic)return i.INT;if(n===Ai)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===Ri)return i.HALF_FLOAT;if(n===af)return i.ALPHA;if(n===of)return i.RGB;if(n===pi)return i.RGBA;if(n===os)return i.DEPTH_COMPONENT;if(n===xs)return i.DEPTH_STENCIL;if(n===Nc)return i.RED;if(n===Uc)return i.RED_INTEGER;if(n===ks)return i.RG;if(n===Fc)return i.RG_INTEGER;if(n===Oc)return i.RGBA_INTEGER;if(n===Lo||n===Do||n===No||n===Uo)if(a===Ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Do)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Do)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===No)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Uo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bc||n===kc||n===zc||n===Hc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Bc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Hc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Gc||n===Vc||n===Wc||n===Xc||n===qc||n===Fo||n===Yc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Gc||n===Vc)return a===Ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wc)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Xc)return r.COMPRESSED_R11_EAC;if(n===qc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fo)return r.COMPRESSED_RG11_EAC;if(n===Yc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Zc||n===Kc||n===$c||n===Jc||n===jc||n===Qc||n===eh||n===th||n===nh||n===ih||n===sh||n===rh||n===ah||n===oh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zc)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Kc)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$c)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jc)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jc)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Qc)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===eh)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===th)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===nh)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ih)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sh)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===rh)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ah)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===oh)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===lh||n===ch||n===hh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===lh)return a===Ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ch)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===hh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uh||n===fh||n===Oo||n===dh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===uh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ar?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var i2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,s2=`
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

}`,Ff=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Bt({vertexShader:i2,fragmentShader:s2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new Ot(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Of=class extends Oi{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,h=null,p=null,x=typeof XRWebGLBinding<"u",g=new Ff,m={},v=t.getContextAttributes(),M=null,_=null,b=[],S=[],y=new ye,E=null,C=null,R=new dn;R.viewport=new bt;let A=new dn;A.viewport=new bt;let L=[R,A],O=new wc,I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let F=b[ie];return F===void 0&&(F=new oa,b[ie]=F),F.getTargetRaySpace()},this.getControllerGrip=function(ie){let F=b[ie];return F===void 0&&(F=new oa,b[ie]=F),F.getGripSpace()},this.getHand=function(ie){let F=b[ie];return F===void 0&&(F=new oa,b[ie]=F),F.getHandSpace()};function q(ie){let F=S.indexOf(ie.inputSource);if(F===-1)return;let te=b[F];te!==void 0&&(te.update(ie.inputSource,ie.frame,c||a),te.dispatchEvent({type:ie.type,data:ie.inputSource}))}function V(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",re);for(let ie=0;ie<b.length;ie++){let F=S[ie];F!==null&&(S[ie]=null,b[ie].disconnect(F))}I=null,G=null,g.reset();for(let ie in m)delete m[ie];if(e.setRenderTarget(M),h=null,d=null,f=null,s=null,_=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(y.width,y.height,!1),C!==null){let ie=C.camera;ie.fov=C.fov,ie.zoom=C.zoom,ie.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",V),s.addEventListener("inputsourceschange",re),v.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,H=null,j=null;v.depth&&(j=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=v.stencil?xs:os,H=v.stencil?Ar:Ai);let z={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(z),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new ii(d.textureWidth,d.textureHeight,{format:pi,type:Kn,depthTexture:new ls(d.textureWidth,d.textureHeight,H,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let te={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),_=new ii(h.framebufferWidth,h.framebufferHeight,{format:pi,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function re(ie){for(let F=0;F<ie.removed.length;F++){let te=ie.removed[F],H=S.indexOf(te);H>=0&&(S[H]=null,b[H].disconnect(te))}for(let F=0;F<ie.added.length;F++){let te=ie.added[F],H=S.indexOf(te);if(H===-1){for(let z=0;z<b.length;z++)if(z>=S.length){S.push(te),H=z;break}else if(S[z]===null){S[z]=te,H=z;break}if(H===-1)break}let j=b[H];j&&j.connect(te)}}function X(ie,F){F===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(F.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;let F=ie.near,te=ie.far;g.texture!==null&&(g.depthNear>0&&(F=g.depthNear),g.depthFar>0&&(te=g.depthFar)),O.near=A.near=R.near=F,O.far=A.far=R.far=te,(I!==O.near||G!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,G=O.far),O.layers.mask=ie.layers.mask|6,R.layers.mask=O.layers.mask&-5,A.layers.mask=O.layers.mask&-3;let H=ie.parent,j=O.cameras;X(O,H);for(let z=0;z<j.length;z++)X(j[z],H);O.projectionMatrix.copy(R.projectionMatrix),O.projectionMatrixInverse.copy(R.projectionMatrixInverse),C===null&&ie.isPerspectiveCamera&&(C={camera:ie,fov:ie.fov,zoom:ie.zoom}),ee(ie,O,H)};function ee(ie,F,te){te===null?ie.matrix.copy(F.matrixWorld):(ie.matrix.copy(te.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(F.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(F.projectionMatrix),ie.projectionMatrixInverse.copy(F.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=cr*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(ie){l=ie,d!==null&&(d.fixedFoveation=ie),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=ie)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(ie){return m[ie]};let ae=null;function Ie(ie,F){if(u=F.getViewerPose(c||a),p=F,u!==null){let te=u.views;h!==null&&(e.setRenderTargetFramebuffer(_,h.framebuffer),e.setRenderTarget(_));let H=!1;te.length!==O.cameras.length&&(O.cameras.length=0,H=!0);for(let de=0;de<te.length;de++){let Re=te[de],ce=null;if(h!==null)ce=h.getViewport(Re);else{let J=f.getViewSubImage(d,Re);ce=J.viewport,de===0&&(e.setRenderTargetTextures(_,J.colorTexture,J.depthStencilTexture),e.setRenderTarget(_))}let N=L[de];N===void 0&&(N=new dn,N.layers.enable(de),N.viewport=new bt,L[de]=N),N.matrix.fromArray(Re.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(Re.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(ce.x,ce.y,ce.width,ce.height),de===0&&(O.matrix.copy(N.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),H===!0&&O.cameras.push(N)}let j=s.enabledFeatures;if(j&&j.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=n.getBinding();let de=f.getDepthInformation(te[0]);de&&de.isValid&&de.texture&&g.init(de,s.renderState)}if(j&&j.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let de=0;de<te.length;de++){let Re=te[de].camera;if(Re){let ce=m[Re];ce||(ce=new fo,m[Re]=ce);let N=f.getCameraImage(Re);ce.sourceTexture=N}}}}for(let te=0;te<b.length;te++){let H=S[te],j=b[te];H!==null&&j!==void 0&&j.update(H,F,c||a)}ae&&ae(ie,F),F.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:F}),p=null}let Fe=new Rm;Fe.setAnimationLoop(Ie),this.setAnimationLoop=function(ie){ae=ie},this.dispose=function(){}}},r2=new Ke,Bm=new st;Bm.set(-1,0,0,0,1,0,0,0,1);function a2(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,yf(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,v,M,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&h(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,v,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Hn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Hn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let v=e.get(m),M=v.envMap,_=v.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(r2.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Bm),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function h(g,m,v){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Hn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function o2(i,e,t,n){let s={},r={};function a(v,M){let _=M.program;n.uniformBlockBinding(v,_,s[v.id])}function o(v,M){let _=s[v.id];_===void 0&&(p(v),_=l(v),s[v.id]=_,v.addEventListener("dispose",g));let b=M.program;n.updateUBOMapping(v,b);let S=e.render.frame;r[v.id]!==S&&(c(v),r[v.id]=S)}function l(v){let M=i.createBuffer(),_=v.__size,b=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,_,b),i.bindBuffer(i.UNIFORM_BUFFER,null),M}function c(v){let M=s[v.id],_=v.uniforms,b=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let S=0,y=_.length;S<y;S++){let E=_[S];if(Array.isArray(E))for(let C=0,R=E.length;C<R;C++)u(E[C],S,C,b);else u(E,S,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(v,M,_,b){if(d(v,M,_,b)===!0){let S=v.__offset,y=v.value;if(Array.isArray(y)){let E=0;for(let C=0;C<y.length;C++){let R=y[C],A=x(R,!0);f(R,v.__data,E),E+=A.storage/Float32Array.BYTES_PER_ELEMENT}}else f(y,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,v.__data)}}function f(v,M,_){typeof v=="number"||typeof v=="boolean"?M[_]=v:v.isMatrix3?(M[_]=v.elements[0],M[_+1]=v.elements[1],M[_+2]=v.elements[2],M[_+3]=0,M[_+4]=v.elements[3],M[_+5]=v.elements[4],M[_+6]=v.elements[5],M[_+7]=0,M[_+8]=v.elements[6],M[_+9]=v.elements[7],M[_+10]=v.elements[8],M[_+11]=0):ArrayBuffer.isView(v)?M.set(v.subarray(0,M.length-_),_):v.toArray(M,_)}function d(v,M,_,b){let S=v.value,y=M+"_"+_;if(Array.isArray(S)){b[y]===void 0&&(b[y]=[]);let E=b[y],C=!1;for(let R=0;R<S.length;R++)h(S[R],E,R)===!0&&(C=!0);return C}return h(S,b,y)}function h(v,M,_){if(M[_]===void 0)return typeof v=="number"||typeof v=="boolean"?M[_]=v:ArrayBuffer.isView(v)?M[_]=v.slice():M[_]=v.clone(),!0;{let b=M[_];if(typeof v=="number"||typeof v=="boolean"){if(b!==v)return M[_]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(b.equals(v)===!1)return b.copy(v),!0}}return!1}function p(v){let M=v.uniforms,_=0,b=16;for(let y=0,E=M.length;y<E;y++){let C=Array.isArray(M[y])?M[y]:[M[y]];for(let R=0,A=C.length;R<A;R++){let L=C[R],O=Array.isArray(L.value)?L.value:[L.value],I=Array.isArray(M[y])||Array.isArray(L.value),G=_;for(let V=0,re=O.length;V<re;V++){let X=O[V],ee=x(X,I),ae=_%b,Ie=ae%ee.boundary,Fe=ae+Ie;_+=Ie,Fe!==0&&b-Fe<ee.storage&&(_+=b-Fe),V===0&&(G=_),_+=ee.storage}let q=L.type==="int"?Int32Array:L.type==="uint"?Uint32Array:Float32Array;L.__data=new q((_-G)/Float32Array.BYTES_PER_ELEMENT),L.__offset=G}}let S=_%b;return S>0&&(_+=b-S),v.__size=_,v.__cache={},this}function x(v,M){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=16,_.storage=48):v.isMatrix4?(_.boundary=16,_.storage=64):v.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(_.boundary=16,_.storage=v.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",v),M===!0&&(_.boundary=16,_.storage=Math.ceil(_.storage/16)*16),_}function g(v){let M=v.target;M.removeEventListener("dispose",g),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function m(){for(let v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:m}}var l2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gi=null;function c2(){return Gi===null&&(Gi=new ua(l2,16,16,ks,Ri),Gi.name="DFG_LUT",Gi.minFilter=sn,Gi.magFilter=sn,Gi.wrapS=hi,Gi.wrapT=hi,Gi.generateMipmaps=!1,Gi.needsUpdate=!0),Gi}var vh=class{constructor(e={}){let{canvas:t=Kp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=Kn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=h,g=new Set([Oc,Fc,Uc]),m=new Set([Kn,Ai,Sa,Ar,Lc,Dc]),v=new Uint32Array(4),M=new Int32Array(4),_={textures:[],min:[],max:[],resolution:[]},b=null,S=null,y=[],E=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,A=!1,L=null,O=null,I=null,G=null;this._outputColorSpace=At;let q=0,V=0,re=null,X=-1,ee=null,ae=new bt,Ie=new bt,Fe=null,ie=new be(0),F=0,te=t.width,H=t.height,j=1,z=null,Ge=null,de=new bt(0,0,te,H),Re=new bt(0,0,te,H),ce=!1,N=new Ds,J=new oc,W=!1,Y=!1,xe=new Ke,We=new D,Be=new bt,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},nt=!1;function pt(){return re===null?j:1}let B=n;function kt(T,k){return t.getContext(T,k)}let rt,ot,_e,Pt,qe,je,P,w,Z,ve,fe,Te,Ce,oe,le,Ee,U,ue,se,we,Se,Ae,Ve;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Ye,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),B===null){let k="webgl2";if(B=kt(k,T),B===null)throw kt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ht()}catch(T){throw t.removeEventListener("webglcontextlost",Ye,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),it("WebGLRenderer: "+T.message),T}function ht(){rt=new _M(B),rt.init(),Se=new n2(B,rt),ot=new cM(B,rt,e,Se),_e=new e2(B,rt),ot.reversedDepthBuffer&&d&&_e.buffers.depth.setReversed(!0),O=B.createFramebuffer(),I=B.createFramebuffer(),G=B.createFramebuffer(),Pt=new SM(B),qe=new zb,je=new t2(B,rt,_e,qe,ot,Se,Pt),P=new yM(R),w=new wv(B),Ae=new oM(B,w),Z=new MM(B,w,Pt,Ae),ve=new wM(B,Z,w,Ae,Pt),ue=new EM(B,ot,je),le=new hM(qe),fe=new kb(R,P,rt,ot,Ae,le),Te=new a2(R,qe),Ce=new Gb,oe=new Zb(rt),U=new aM(R,P,_e,ve,p,l),Ee=new Qb(R,ve,ot),Ve=new o2(B,Pt,ot,_e),se=new lM(B,rt,Pt),we=new bM(B,rt,Pt),Pt.programs=fe.programs,R.capabilities=ot,R.extensions=rt,R.properties=qe,R.renderLists=Ce,R.shadowMap=Ee,R.state=_e,R.info=Pt}x!==Kn&&(C=new AM(x,t.width,t.height,o,s,r));let he=new Of(R,B);this.xr=he,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let T=rt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=rt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(T){T!==void 0&&(j=T,this.setSize(te,H,!1))},this.getSize=function(T){return T.set(te,H)},this.setSize=function(T,k,Q=!0){if(he.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}te=T,H=k,t.width=Math.floor(T*j),t.height=Math.floor(k*j),Q===!0&&(t.style.width=T+"px",t.style.height=k+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(te*j,H*j).floor()},this.setDrawingBufferSize=function(T,k,Q){te=T,H=k,j=Q,t.width=Math.floor(T*Q),t.height=Math.floor(k*Q),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(x===Kn){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ae)},this.getViewport=function(T){return T.copy(de)},this.setViewport=function(T,k,Q,K){T.isVector4?de.set(T.x,T.y,T.z,T.w):de.set(T,k,Q,K),_e.viewport(ae.copy(de).multiplyScalar(pt()).round())},this.getScissor=function(T){return T.copy(Re)},this.setScissor=function(T,k,Q,K){T.isVector4?Re.set(T.x,T.y,T.z,T.w):Re.set(T,k,Q,K),_e.scissor(Ie.copy(Re).multiplyScalar(pt()).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(T){_e.setScissorTest(ce=T)},this.setOpaqueSort=function(T){z=T},this.setTransparentSort=function(T){Ge=T},this.getClearColor=function(T){return T.copy(U.getClearColor())},this.setClearColor=function(){U.setClearColor(...arguments)},this.getClearAlpha=function(){return U.getClearAlpha()},this.setClearAlpha=function(){U.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,Q=!0){let K=0;if(T){let $=!1;if(re!==null){let De=re.texture.format;$=g.has(De)}if($){let De=re.texture.type,ke=m.has(De),Le=U.getClearColor(),Oe=U.getClearAlpha(),Xe=Le.r,ct=Le.g,Et=Le.b;ke?(v[0]=Xe,v[1]=ct,v[2]=Et,v[3]=Oe,B.clearBufferuiv(B.COLOR,0,v)):(M[0]=Xe,M[1]=ct,M[2]=Et,M[3]=Oe,B.clearBufferiv(B.COLOR,0,M))}else K|=B.COLOR_BUFFER_BIT}k&&(K|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(K|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&B.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),L=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Ye,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),U.dispose(),Ce.dispose(),oe.dispose(),je.dispose(),qe.dispose(),P.dispose(),ve.dispose(),Z.dispose(),Ae.dispose(),Ve.dispose(),fe.dispose(),he.dispose(),he.removeEventListener("sessionstart",ol),he.removeEventListener("sessionend",pe),at.stop()};function Ye(T){T.preventDefault(),to("WebGLRenderer: Context Lost."),A=!0}function lt(){to("WebGLRenderer: Context Restored."),A=!1;let T=Pt.autoReset,k=Ee.enabled,Q=Ee.autoUpdate,K=Ee.needsUpdate,$=Ee.type;ht(),Pt.autoReset=T,Ee.enabled=k,Ee.autoUpdate=Q,Ee.needsUpdate=K,Ee.type=$}function Pe(T){it("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function It(T){let k=T.target;k.removeEventListener("dispose",It),tn(k)}function tn(T){Li(T),qe.remove(T)}function Li(T){let k=qe.get(T).programs;k!==void 0&&(k.forEach(function(Q){fe.releaseProgram(Q)}),T.isShaderMaterial&&fe.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,Q,K,$,De){k===null&&(k=tt);let ke=$.isMesh&&$.matrixWorld.determinantAffine()<0,Le=R1(T,k,Q,K,$);_e.setMaterial(K,ke);let Oe=Q.index,Xe=1;if(K.wireframe===!0){if(Oe=Z.getWireframeAttribute(Q),Oe===void 0)return;Xe=2}let ct=Q.drawRange,Et=Q.attributes.position,ze=ct.start*Xe,wt=(ct.start+ct.count)*Xe;De!==null&&(ze=Math.max(ze,De.start*Xe),wt=Math.min(wt,(De.start+De.count)*Xe)),Oe!==null?(ze=Math.max(ze,0),wt=Math.min(wt,Oe.count)):Et!=null&&(ze=Math.max(ze,0),wt=Math.min(wt,Et.count));let ln=wt-ze;if(ln<0||ln===1/0)return;Ae.setup($,K,Le,Q,Oe);let Xt,Vt=se;if(Oe!==null&&(Xt=w.get(Oe),Vt=we,Vt.setIndex(Xt)),$.isMesh)K.wireframe===!0?(_e.setLineWidth(K.wireframeLinewidth*pt()),Vt.setMode(B.LINES)):Vt.setMode(B.TRIANGLES);else if($.isLine){let An=K.linewidth;An===void 0&&(An=1),_e.setLineWidth(An*pt()),$.isLineSegments?Vt.setMode(B.LINES):$.isLineLoop?Vt.setMode(B.LINE_LOOP):Vt.setMode(B.LINE_STRIP)}else $.isPoints?Vt.setMode(B.POINTS):$.isSprite&&Vt.setMode(B.TRIANGLES);if($.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))Vt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let An=$._multiDrawStarts,He=$._multiDrawCounts,Dn=$._multiDrawCount,Dt=Oe?w.get(Oe).bytesPerElement:1,$s=qe.get(K).currentProgram.getUniforms();for(let Rn=0;Rn<Dn;Rn++)$s.setValue(B,"_gl_DrawID",Rn),Vt.render(An[Rn]/Dt,He[Rn])}else if($.isInstancedMesh)Vt.renderInstances(ze,ln,$.count);else if(Q.isInstancedBufferGeometry){let An=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,He=Math.min(Q.instanceCount,An);Vt.renderInstances(ze,ln,He)}else Vt.render(ze,ln)};function al(T,k,Q,K){L!==null&&T.isNodeMaterial&&L.setObject(K,T),W===!0&&le.setState(T,Q,!1),T.transparent===!0&&T.side===Zt&&T.forceSinglePass===!1?(T.side=Hn,T.needsUpdate=!0,Ks(T,k,K),T.side=di,T.needsUpdate=!0,Ks(T,k,K),T.side=Zt):Ks(T,k,K)}this.compile=function(T,k,Q=null){Q===null&&(Q=T),L!==null&&L.renderStart(T,k,Q),S=oe.get(Q),S.init(k),E.push(S),Q.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),T!==Q&&T.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),S.setupLights(),L!==null&&L.updateLights(S.state.lightsArray),Y=this.localClippingEnabled,W=le.init(this.clippingPlanes,Y),W===!0&&le.setGlobalState(this.clippingPlanes,k),L!==null&&Ee.render(S.state.shadowsArray,Q,k);let K=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let De=$.material;if(De)if(Array.isArray(De))for(let ke=0;ke<De.length;ke++){let Le=De[ke];al(Le,Q,k,$),K.add(Le)}else al(De,Q,k,$),K.add(De)}),S=E.pop(),L!==null&&L.renderEnd(),K},this.compileAsync=function(T,k,Q=null){let K=this.compile(T,k,Q);return new Promise($=>{function De(){if(K.forEach(function(ke){let Oe=qe.get(ke).currentProgram;(Oe===void 0||Oe.isReady())&&K.delete(ke)}),K.size===0){$(T);return}setTimeout(De,10)}rt.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let Qn=null;function Gh(T){Qn&&Qn(T)}function ol(){at.stop()}function pe(){at.start()}let at=new Rm;at.setAnimationLoop(Gh),typeof self<"u"&&at.setContext(self),this.setAnimationLoop=function(T){Qn=T,he.setAnimationLoop(T),T===null?at.stop():at.start()},he.addEventListener("sessionstart",ol),he.addEventListener("sessionend",pe),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;L!==null&&L.renderStart(T,k);let Q=he.enabled===!0&&he.isPresenting===!0,K=C!==null&&(re===null||Q)&&C.begin(R,re);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(he.cameraAutoUpdate===!0&&he.updateCamera(k),k=he.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,k,re),S=oe.get(T,E.length),S.init(k),S.state.textureUnits=je.getTextureUnits(),E.push(S),xe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),k.isArrayCamera?J.setFromArrayCamera(k):N.setFromProjectionMatrix(xe,ui,k.reversedDepth),Y=this.localClippingEnabled,W=le.init(this.clippingPlanes,Y),b=Ce.get(T,y.length),b.init(),y.push(b),this.info.render.frame++,he.enabled===!0&&he.isPresenting===!0){let ke=R.xr.getDepthSensingMesh();ke!==null&&fn(ke,k,-1/0,R.sortObjects)}fn(T,k,0,R.sortObjects),b.finish(),L!==null&&L.updateLights(S.state.lightsArray),R.sortObjects===!0&&b.sort(z,Ge),nt=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,nt&&U.addToRenderList(b,T),this.info.autoReset===!0&&this.info.reset(),W===!0&&le.beginShadows();let $=S.state.shadowsArray;if(Ee.render($,T,k),W===!0&&le.endShadows(),(K&&C.hasRenderPass())===!1){let ke=b.opaque,Le=b.transmissive;if(S.setupLights(),k.isArrayCamera){let Oe=k.cameras;if(Le.length>0)for(let Xe=0,ct=Oe.length;Xe<ct;Xe++){let Et=Oe[Xe];ll(ke,Le,T,Et)}nt&&U.render(T);for(let Xe=0,ct=Oe.length;Xe<ct;Xe++){let Et=Oe[Xe];_s(b,T,Et,Et.viewport)}}else Le.length>0&&ll(ke,Le,T,k),nt&&U.render(T),_s(b,T,k)}re!==null&&V===0&&(je.updateMultisampleRenderTarget(re),je.updateRenderTargetMipmap(re)),K&&C.end(R),T.isScene===!0&&T.onAfterRender(R,T,k),Ae.resetDefaultState(),X=-1,ee=null,E.pop(),E.length>0?(S=E[E.length-1],je.setTextureUnits(S.state.textureUnits),W===!0&&le.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,y.pop(),y.length>0?b=y[y.length-1]:b=null,L!==null&&L.renderEnd()};function fn(T,k,Q,K){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)Q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)S.pushLight(T),T.castShadow&&S.pushShadow(T);else if(T.isSprite){let ke=k.isArrayCamera?J:N;if(!T.frustumCulled||T.intersectsFrustum(ke)){K&&Be.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xe);let Le=ve.update(T),Oe=T.material;Oe.visible&&b.push(T,Le,Oe,Q,Be.z,null,k)}}else if(T.isMesh||T.isLine||T.isPoints){let ke=k.isArrayCamera?J:N;if(!T.frustumCulled||T.intersectsFrustum(ke)){let Le=ve.update(T),Oe=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Be.copy(T.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Be.copy(Le.boundingSphere.center)),Be.applyMatrix4(T.matrixWorld).applyMatrix4(xe)),Array.isArray(Oe)){let Xe=Le.groups;for(let ct=0,Et=Xe.length;ct<Et;ct++){let ze=Xe[ct],wt=Oe[ze.materialIndex];wt&&wt.visible&&b.push(T,Le,wt,Q,Be.z,ze,k)}}else Oe.visible&&b.push(T,Le,Oe,Q,Be.z,null,k)}}}let De=T.children;for(let ke=0,Le=De.length;ke<Le;ke++)fn(De[ke],k,Q,K)}function _s(T,k,Q,K){let{opaque:$,transmissive:De,transparent:ke}=T;S.setupLightsView(Q),W===!0&&le.setGlobalState(R.clippingPlanes,Q),K&&_e.viewport(ae.copy(K)),$.length>0&&Ms($,k,Q),De.length>0&&Ms(De,k,Q),ke.length>0&&Ms(ke,k,Q),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function ll(T,k,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[K.id]===void 0){let ze=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[K.id]=new ii(1,1,{generateMipmaps:!0,type:ze?Ri:Kn,minFilter:Zn,samples:Math.max(4,ot.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:vt.workingColorSpace})}let De=S.state.transmissionRenderTarget[K.id],ke=K.viewport||ae;De.setSize(ke.z*R.transmissionResolutionScale,ke.w*R.transmissionResolutionScale);let Le=R.getRenderTarget(),Oe=R.getActiveCubeFace(),Xe=R.getActiveMipmapLevel();R.setRenderTarget(De),R.getClearColor(ie),F=R.getClearAlpha(),F<1&&R.setClearColor(16777215,.5),R.clear(),nt&&U.render(Q);let ct=R.toneMapping;R.toneMapping=Hi;let Et=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),S.setupLightsView(K),W===!0&&le.setGlobalState(R.clippingPlanes,K),Ms(T,Q,K),je.updateMultisampleRenderTarget(De),je.updateRenderTargetMipmap(De),rt.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let wt=0,ln=k.length;wt<ln;wt++){let Xt=k[wt],{object:Vt,geometry:An,material:He,group:Dn}=Xt;if(He.side===Zt&&Vt.layers.test(K.layers)){let Dt=He.side;He.side=Hn,He.needsUpdate=!0,Di(Vt,Q,K,An,He,Dn),He.side=Dt,He.needsUpdate=!0,ze=!0}}ze===!0&&(je.updateMultisampleRenderTarget(De),je.updateRenderTargetMipmap(De))}R.setRenderTarget(Le,Oe,Xe),R.setClearColor(ie,F),Et!==void 0&&(K.viewport=Et),R.toneMapping=ct}function Ms(T,k,Q){let K=k.isScene===!0?k.overrideMaterial:null;for(let $=0,De=T.length;$<De;$++){let ke=T[$],{object:Le,geometry:Oe,group:Xe}=ke,ct=ke.material;ct.allowOverride===!0&&K!==null&&(ct=K),Le.layers.test(Q.layers)&&Di(Le,k,Q,Oe,ct,Xe)}}function Di(T,k,Q,K,$,De){L!==null&&$.isNodeMaterial&&L.setObject(T,$),T.onBeforeRender(R,k,Q,K,$,De),T.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(R,k,Q,K,T,De),$.transparent===!0&&$.side===Zt&&$.forceSinglePass===!1?($.side=Hn,$.needsUpdate=!0,R.renderBufferDirect(Q,k,K,$,T,De),$.side=di,$.needsUpdate=!0,R.renderBufferDirect(Q,k,K,$,T,De),$.side=Zt):R.renderBufferDirect(Q,k,K,$,T,De),T.onAfterRender(R,k,Q,K,$,De)}function bs(T){let k=0;for(let Q of T)Q.texture!==null&&k++;return k}function Ks(T,k,Q){k.isScene!==!0&&(k=tt);let K=qe.get(T),$=S.state.lights,De=S.state.shadowsArray,ke=$.state.version,Le=fe.getParameters(T,$.state,De,k,Q,S.state.lightProbeGridArray),Oe=fe.getProgramCacheKey(Le),Xe=K.programs;K.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,K.fog=k.fog;let ct=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;K.envMap=P.get(T.envMap||K.environment,ct),K.envMapRotation=K.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Xe===void 0&&(T.addEventListener("dispose",It),Xe=new Map,K.programs=Xe,K.programVariants=new Map);let Et=Xe.get(Oe);if(Et!==void 0){if(K.currentProgram===Et&&K.lightsStateVersion===ke)return t0(T,Le),Et}else Le.uniforms=fe.getUniforms(T),L!==null&&T.isNodeMaterial&&L.build(T,Q,Le),T.onBeforeCompile(Le,R),Et=fe.acquireProgram(Le,Oe),Xe.set(Oe,Et),K.uniforms=Le.uniforms;let ze=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(ze.clippingPlanes=le.uniform),t0(T,Le),K.needsLights=P1(T),K.lightsStateVersion=ke,K.needsLights&&(ze.ambientLightColor.value=$.state.ambient,ze.lightProbe.value=$.state.probe,ze.sunLights.value=$.state.sun,ze.sunLightShadows.value=$.state.sunShadow,ze.directionalLights.value=$.state.directional,ze.directionalLightShadows.value=$.state.directionalShadow,ze.spotLights.value=$.state.spot,ze.spotLightShadows.value=$.state.spotShadow,ze.rectAreaLights.value=$.state.rectArea,ze.ltc_1.value=$.state.rectAreaLTC1,ze.ltc_2.value=$.state.rectAreaLTC2,ze.pointLights.value=$.state.point,ze.pointLightShadows.value=$.state.pointShadow,ze.hemisphereLights.value=$.state.hemi,ze.sunShadowMatrix.value=$.state.sunShadowMatrix,ze.sunShadowCascade.value=$.state.sunShadowCascade,ze.directionalShadowMatrix.value=$.state.directionalShadowMatrix,ze.spotLightMatrix.value=$.state.spotLightMatrix,ze.spotLightMap.value=$.state.spotLightMap,ze.pointShadowMatrix.value=$.state.pointShadowMatrix),K.numLightProbeGrids=bs(S.state.lightProbeGridArray),K.currentProgram=Et,K.uniformsList=null,Et}function A1(T,k,Q,K,$){let De=qe.get(T),ke=De.currentProgram.id+","+K+","+$,Le=De.programVariants.get(ke);return Le===void 0?(Le=Ks(T,k,Q),De.programVariants.set(ke,Le)):(De.currentProgram=Le,De.uniformsList=null,De.outputColorSpace=K,De.toneMapping=$),Le}function e0(T){if(T.uniformsList===null){let k=T.currentProgram.getUniforms();T.uniformsList=wa.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function t0(T,k){let Q=qe.get(T);Q.outputColorSpace=k.outputColorSpace,Q.batching=k.batching,Q.batchingColor=k.batchingColor,Q.instancing=k.instancing,Q.instancingColor=k.instancingColor,Q.instancingMorph=k.instancingMorph,Q.skinning=k.skinning,Q.morphTargets=k.morphTargets,Q.morphNormals=k.morphNormals,Q.morphColors=k.morphColors,Q.morphTargetsCount=k.morphTargetsCount,Q.numClippingPlanes=k.numClippingPlanes,Q.numIntersection=k.numClipIntersection,Q.vertexAlphas=k.vertexAlphas,Q.vertexTangents=k.vertexTangents,Q.toneMapping=k.toneMapping}function R1(T,k,Q,K,$){k.isScene!==!0&&(k=tt),je.resetTextureUnits();let De=k.fog,ke=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?k.environment:null,Le=re===null?R.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:vt.workingColorSpace,Oe=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Xe=P.get(K.envMap||ke,Oe),ct=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Et=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),ze=!!Q.morphAttributes.position,wt=!!Q.morphAttributes.normal,ln=!!Q.morphAttributes.color,Xt=Hi;K.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Xt=R.toneMapping);let Vt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,An=Vt!==void 0?Vt.length:0,He=qe.get(K),Dn=S.state.lights;if(W===!0&&(Y===!0||T!==ee)){let jt=T===ee&&K.id===X;le.setState(K,T,jt)}let Dt=!1,$s=!1;K.version===He.__version?He.needsLights&&He.lightsStateVersion!==Dn.state.version||$.isBatchedMesh&&He.batching===!1||!$.isBatchedMesh&&He.batching===!0||$.isBatchedMesh&&He.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&He.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&He.instancing===!1||!$.isInstancedMesh&&He.instancing===!0||$.isSkinnedMesh&&He.skinning===!1||!$.isSkinnedMesh&&He.skinning===!0||$.isInstancedMesh&&He.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&He.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&He.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&He.instancingMorph===!1&&$.morphTexture!==null||He.envMap!==Xe||K.fog===!0&&He.fog!==De||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==le.numPlanes||He.numIntersection!==le.numIntersection)||He.vertexAlphas!==ct||He.vertexTangents!==Et||He.morphTargets!==ze||He.morphNormals!==wt||He.morphColors!==ln||He.morphTargetsCount!==An||He.numLightProbeGrids!==bs(S.state.lightProbeGridArray)?Dt=!0:(He.outputColorSpace!==Le||He.toneMapping!==Xt)&&($s=!0):(Dt=!0,He.__version=K.version);let Rn=He.currentProgram;(Dt===!0||$s===!0)&&(Rn=$s===!0?A1(K,k,$,Le,Xt):Ks(K,k,$),L&&K.isNodeMaterial&&L.onUpdateProgram(K,Rn,He));let cl=!1,Ss=!1,Js=!1,Ct=Rn.getUniforms(),Sn=He.uniforms;if(_e.useProgram(Rn.program)&&(cl=!0,Ss=!0,Js=!0),K.id!==X&&(X=K.id,Ss=!0),cl||ee!==T){_e.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Ct.setValue(B,"projectionMatrix",T.projectionMatrix),Ct.setValue(B,"viewMatrix",T.matrixWorldInverse);let yn=Ct.map.cameraPosition;yn!==void 0&&yn.setValue(B,We.setFromMatrixPosition(T.matrixWorld)),ot.logarithmicDepthBuffer&&Ct.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Ct.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),ee!==T&&(ee=T,Ss=!0,Js=!0)}if(He.needsLights&&(Dn.state.sunShadowMap.length>0&&Ct.setValue(B,"sunShadowMap",Dn.state.sunShadowMap,je),Dn.state.directionalShadowMap.length>0&&Ct.setValue(B,"directionalShadowMap",Dn.state.directionalShadowMap,je),Dn.state.spotShadowMap.length>0&&Ct.setValue(B,"spotShadowMap",Dn.state.spotShadowMap,je),Dn.state.pointShadowMap.length>0&&Ct.setValue(B,"pointShadowMap",Dn.state.pointShadowMap,je)),$.isSkinnedMesh){Ct.setOptional(B,$,"bindMatrix"),Ct.setOptional(B,$,"bindMatrixInverse");let jt=$.skeleton;jt&&(jt.boneTexture===null&&jt.computeBoneTexture(),Ct.setValue(B,"boneTexture",jt.boneTexture,je))}$.isBatchedMesh&&(Ct.setOptional(B,$,"batchingTexture"),Ct.setValue(B,"batchingTexture",$._matricesTexture,je),Ct.setOptional(B,$,"batchingIdTexture"),Ct.setValue(B,"batchingIdTexture",$._indirectTexture,je),Ct.setOptional(B,$,"batchingColorTexture"),$._colorsTexture!==null&&Ct.setValue(B,"batchingColorTexture",$._colorsTexture,je));let vi=Q.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&ue.update($,Q,Rn),(Ss||He.receiveShadow!==$.receiveShadow)&&(He.receiveShadow=$.receiveShadow,Ct.setValue(B,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&k.environment!==null&&(Sn.envMapIntensity.value=k.environmentIntensity),Sn.dfgLUT!==void 0&&(Sn.dfgLUT.value=c2()),Ss){if(Ct.setValue(B,"toneMappingExposure",R.toneMappingExposure),He.needsLights&&C1(Sn,Js),De&&K.fog===!0&&Te.refreshFogUniforms(Sn,De),Te.refreshMaterialUniforms(Sn,K,j,H,S.state.transmissionRenderTarget[T.id]),He.needsLights&&He.numLightProbeGrids>0){let jt=_,yn=0;for(let Ki of S.state.lightProbeGridArray)Ki.texture!==null&&(jt.textures[yn]=Ki.texture,jt.min[yn]=Ki.boundingBox.min,jt.max[yn]=Ki.boundingBox.max,jt.resolution[yn]=Ki.resolution,yn++);for(let Ki in jt)jt[Ki].length=yn;Sn.probesSH.value=jt.textures,Sn.probesMin.value=jt.min,Sn.probesMax.value=jt.max,Sn.probesResolution.value=jt.resolution}wa.upload(B,e0(He),Sn,je)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(wa.upload(B,e0(He),Sn,je),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Ct.setValue(B,"center",$.center),Ct.setValue(B,"modelViewMatrix",$.modelViewMatrix),Ct.setValue(B,"normalMatrix",$.normalMatrix),Ct.setValue(B,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){let jt=K.uniformsGroups;for(let yn=0,Ki=jt.length;yn<Ki;yn++){let i0=jt[yn];Ve.update(i0,Rn),Ve.bind(i0,Rn)}}return Rn}function C1(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function P1(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(T,k,Q){let K=qe.get(T);K.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),qe.get(T.texture).__webglTexture=k,qe.get(T.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Q,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){let Q=qe.get(T);Q.__webglFramebuffer=k,Q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,Q=0){re=T,q=k,V=Q;let K=null,$=!1,De=!1;if(T){let Le=qe.get(T);if(Le.__useDefaultFramebuffer!==void 0){_e.bindFramebuffer(B.FRAMEBUFFER,Le.__webglFramebuffer),ae.copy(T.viewport),Ie.copy(T.scissor),Fe=T.scissorTest,_e.viewport(ae),_e.scissor(Ie),_e.setScissorTest(Fe),X=-1;return}else if(Le.__webglFramebuffer===void 0)je.setupRenderTarget(T);else if(Le.__hasExternalTextures)je.rebindTextures(T,qe.get(T.texture).__webglTexture,qe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let ct=T.depthTexture;if(Le.__boundDepthTexture!==ct){if(ct!==null&&qe.has(ct)&&(T.width!==ct.image.width||T.height!==ct.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");je.setupDepthRenderbuffer(T)}}let Oe=T.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(De=!0);let Xe=qe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Xe[k])?K=Xe[k][Q]:K=Xe[k],$=!0):T.samples>0&&je.useMultisampledRTT(T)===!1?K=qe.get(T).__webglMultisampledFramebuffer:Array.isArray(Xe)?K=Xe[Q]:K=Xe,ae.copy(T.viewport),Ie.copy(T.scissor),Fe=T.scissorTest}else ae.copy(de).multiplyScalar(j).floor(),Ie.copy(Re).multiplyScalar(j).floor(),Fe=ce;if(Q!==0&&(K=O),_e.bindFramebuffer(B.FRAMEBUFFER,K)&&_e.drawBuffers(T,K),_e.viewport(ae),_e.scissor(Ie),_e.setScissorTest(Fe),$){let Le=qe.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+k,Le.__webglTexture,Q)}else if(De){let Le=k;for(let Oe=0;Oe<T.textures.length;Oe++){let Xe=qe.get(T.textures[Oe]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Oe,Xe.__webglTexture,Q,Le)}}else if(T!==null&&Q!==0){let Le=qe.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Le.__webglTexture,Q)}X=-1};function n0(T){let k=qe.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=ot.textureFormatReadable(T.format),k.__typeReadable=ot.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,Q,K,$,De,ke,Le=0){if(!(T&&T.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ke!==void 0&&(Oe=Oe[ke],Array.isArray(Oe)&&(Oe=Oe[0])),Oe){_e.bindFramebuffer(B.FRAMEBUFFER,Oe);try{let Xe=T.textures[Le],ct=Xe.format,Et=Xe.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Le);let ze=n0(Xe);if(ze.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ze.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-K&&Q>=0&&Q<=T.height-$&&B.readPixels(k,Q,K,$,Se.convert(ct),Se.convert(Et),De)}finally{let Xe=re!==null?qe.get(re).__webglFramebuffer:null;_e.bindFramebuffer(B.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(T,k,Q,K,$,De,ke,Le=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ke!==void 0&&(Oe=Oe[ke],Array.isArray(Oe)&&(Oe=Oe[0])),Oe)if(k>=0&&k<=T.width-K&&Q>=0&&Q<=T.height-$){_e.bindFramebuffer(B.FRAMEBUFFER,Oe);let Xe=T.textures[Le],ct=Xe.format,Et=Xe.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Le);let ze=n0(Xe);if(ze.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ze.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let wt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,wt),B.bufferData(B.PIXEL_PACK_BUFFER,De.byteLength,B.STREAM_READ),B.readPixels(k,Q,K,$,Se.convert(ct),Se.convert(Et),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let ln=re!==null?qe.get(re).__webglFramebuffer:null;_e.bindFramebuffer(B.FRAMEBUFFER,ln);let Xt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Jp(B,Xt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,wt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,De),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(wt),B.deleteSync(Xt),De}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,Q=0){let K=Math.pow(2,-Q),$=Math.floor(T.image.width*K),De=Math.floor(T.image.height*K),ke=k!==null?k.x:0,Le=k!==null?k.y:0;je.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,Q,0,0,ke,Le,$,De),_e.unbindTexture()},this.copyTextureToTexture=function(T,k,Q=null,K=null,$=0,De=0){let ke,Le,Oe,Xe,ct,Et,ze,wt,ln,Xt=T.isCompressedTexture?T.mipmaps[De]:T.image;if(Q!==null)ke=Q.max.x-Q.min.x,Le=Q.max.y-Q.min.y,Oe=Q.isBox3?Q.max.z-Q.min.z:1,Xe=Q.min.x,ct=Q.min.y,Et=Q.isBox3?Q.min.z:0;else{let Ct=Math.pow(2,-$);ke=Math.floor(Xt.width*Ct),Le=Math.floor(Xt.height*Ct),T.isDataArrayTexture?Oe=Xt.depth:T.isData3DTexture?Oe=Math.floor(Xt.depth*Ct):Oe=1,Xe=0,ct=0,Et=0}K!==null?(ze=K.x,wt=K.y,ln=K.z):(ze=0,wt=0,ln=0);let Vt=Se.convert(k.format),An=Se.convert(k.type),He;k.isData3DTexture?(je.setTexture3D(k,0),He=B.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(je.setTexture2DArray(k,0),He=B.TEXTURE_2D_ARRAY):(je.setTexture2D(k,0),He=B.TEXTURE_2D),_e.activeTexture(B.TEXTURE0),_e.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,k.flipY),_e.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),_e.pixelStorei(B.UNPACK_ALIGNMENT,k.unpackAlignment);let Dn=_e.getParameter(B.UNPACK_ROW_LENGTH),Dt=_e.getParameter(B.UNPACK_IMAGE_HEIGHT),$s=_e.getParameter(B.UNPACK_SKIP_PIXELS),Rn=_e.getParameter(B.UNPACK_SKIP_ROWS),cl=_e.getParameter(B.UNPACK_SKIP_IMAGES);_e.pixelStorei(B.UNPACK_ROW_LENGTH,Xt.width),_e.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Xt.height),_e.pixelStorei(B.UNPACK_SKIP_PIXELS,Xe),_e.pixelStorei(B.UNPACK_SKIP_ROWS,ct),_e.pixelStorei(B.UNPACK_SKIP_IMAGES,Et);let Ss=T.isDataArrayTexture||T.isData3DTexture,Js=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){let Ct=qe.get(T),Sn=qe.get(k),vi=qe.get(Ct.__renderTarget),jt=qe.get(Sn.__renderTarget);_e.bindFramebuffer(B.READ_FRAMEBUFFER,vi.__webglFramebuffer),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,jt.__webglFramebuffer);for(let yn=0;yn<Oe;yn++)Ss&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,qe.get(T).__webglTexture,$,Et+yn),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,qe.get(k).__webglTexture,De,ln+yn)),B.blitFramebuffer(Xe,ct,Xe+ke,ct+Le,ze,wt,ze+ke,wt+Le,B.DEPTH_BUFFER_BIT,B.NEAREST);_e.bindFramebuffer(B.READ_FRAMEBUFFER,null),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||qe.has(T)){let Ct=qe.get(T),Sn=qe.get(k);_e.bindFramebuffer(B.READ_FRAMEBUFFER,I),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,G);for(let vi=0;vi<Oe;vi++)Ss?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ct.__webglTexture,$,Et+vi):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ct.__webglTexture,$),Js?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Sn.__webglTexture,De,ln+vi):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Sn.__webglTexture,De),$!==0?B.blitFramebuffer(Xe,ct,Xe+ke,ct+Le,ze,wt,ze+ke,wt+Le,B.COLOR_BUFFER_BIT,B.NEAREST):Js?B.copyTexSubImage3D(He,De,ze,wt,ln+vi,Xe,ct,ke,Le):B.copyTexSubImage2D(He,De,ze,wt,Xe,ct,ke,Le);_e.bindFramebuffer(B.READ_FRAMEBUFFER,null),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Js?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(He,De,ze,wt,ln,ke,Le,Oe,Vt,An,Xt.data):k.isCompressedArrayTexture?B.compressedTexSubImage3D(He,De,ze,wt,ln,ke,Le,Oe,Vt,Xt.data):B.texSubImage3D(He,De,ze,wt,ln,ke,Le,Oe,Vt,An,Xt):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,De,ze,wt,ke,Le,Vt,An,Xt.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,De,ze,wt,Xt.width,Xt.height,Vt,Xt.data):B.texSubImage2D(B.TEXTURE_2D,De,ze,wt,ke,Le,Vt,An,Xt);_e.pixelStorei(B.UNPACK_ROW_LENGTH,Dn),_e.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Dt),_e.pixelStorei(B.UNPACK_SKIP_PIXELS,$s),_e.pixelStorei(B.UNPACK_SKIP_ROWS,Rn),_e.pixelStorei(B.UNPACK_SKIP_IMAGES,cl),De===0&&k.generateMipmaps===!0&&k.mipmapsAutoUpdate===!0&&B.generateMipmap(He),_e.unbindTexture()},this.initRenderTarget=function(T){qe.get(T).__webglFramebuffer===void 0&&je.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?je.setTextureCube(T,0):T.isData3DTexture?je.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?je.setTexture2DArray(T,0):je.setTexture2D(T,0),_e.unbindTexture()},this.resetState=function(){q=0,V=0,re=null,_e.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}};var Bf=["diver","warden","drill","kestrel","engine"];function km(){let i=new ms,e=new Map,t=new Map;function n(s){if(!Bf.includes(s)||e.has(s))return Promise.resolve(!0);if(!t.has(s)){let r="./art/"+s+"-skin.webp",a=i.loadAsync(r).catch(()=>i.loadAsync(r)).then(o=>(o.colorSpace=At,e.set(s,o),!0)).catch(()=>!1).finally(()=>t.delete(s));t.set(s,a)}return t.get(s)}return{get:s=>e.get(s),prepare:n}}function zm(i,e,t,n){let s=t.clone(),r=[];i.updateMatrixWorld(!0);let a=i.matrixWorld.clone().invert(),o=new Ke,l=new D,c=.52,u=Math.cos(c),f=Math.sin(c),d=1/0,h=-1/0,p=1/0,x=-1/0;i.traverse(_=>{if(!_.isMesh||_.material!==t)return;let b=_.geometry,S=b.getAttribute("position"),y=b.getAttribute("normal"),E=new Float32Array(S.count*3);o.multiplyMatrices(a,_.matrixWorld);let C=new st().getNormalMatrix(o);for(let R=0;R<S.count;R++){l.fromBufferAttribute(S,R).applyMatrix4(o);let A=l.y*u-l.z*f;d=Math.min(d,l.x),h=Math.max(h,l.x),p=Math.min(p,A),x=Math.max(x,A),E[3*R]=l.x,E[3*R+1]=A,l.fromBufferAttribute(y,R).applyMatrix3(C).normalize(),E[3*R+2]=Ue.smoothstep(l.y*f+l.z*u,-.34,.35)}r.push([b,E,_])});for(let[_,b,S]of r){for(let y=0;y<b.length;y+=3)b[y]=.014+.972*(b[y]-d)/(h-d),b[y+1]=.015+.97*(b[y+1]-p)/(x-p);_.setAttribute("portraitUv",new zt(b,3)),S.material=s}let g={diver:[49,7775390],warden:[39,12360288],drill:[82,11772892],kestrel:[63,9025223],engine:[61,10586738]},[m,v]=g[n];s.shininess=m,s.specular.setHex(v);let M={value:0};return s.onBeforeCompile=_=>{_.uniforms.paintedSurface={value:e},_.uniforms.creatureImpact=M,_.uniforms.creatureFinish={value:Bf.indexOf(n)},_.vertexShader=_.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 portraitUv;varying vec3 paintCoord;varying vec3 sculpture;`).replace("#include <begin_vertex>",`#include <begin_vertex>
paintCoord=portraitUv;sculpture=position;`),_.fragmentShader=_.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D paintedSurface;uniform float creatureImpact;uniform float creatureFinish;varying vec3 paintCoord;varying vec3 sculpture;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec4 skin=texture2D(paintedSurface,paintCoord.xy);
        vec3 base=diffuseColor.rgb;
        float skinL=dot(skin.rgb,vec3(.26,.55,.19));
        float contrast=clamp(pow((skinL+.075)/(.27+.075),.47),.54,1.65);
        float weight=skin.a*paintCoord.z;
        diffuseColor.rgb=mix(base, mix(base*contrast,skin.rgb,.79),weight*.94);
        float grain=sin(sculpture.x*29.+sin(sculpture.y*18.))*sin(sculpture.z*24.+sculpture.y*13.);
        // Registered paint supplies the large markings. Local detail follows the moving joint.
        float neighbor=dot(texture2D(paintedSurface,paintCoord.xy+vec2(.008,.011)).rgb,vec3(.26,.55,.19));
        float carving=clamp((skinL-neighbor)/(.12+skinL),-.32,.38)*weight;
        vec2 st=vec2(sculpture.x+sculpture.z*.44,sculpture.y+sculpture.z*.68);
        float relief;
        if(creatureFinish<.5) {
          vec2 p=st*19.;p.x+=.5*mod(floor(p.y),2.);
          relief=-.10*smoothstep(.28,.43,length(fract(p)-.5))+.035*grain;
        } else if(creatureFinish<1.5) {
          relief=.044*grain+.035*cos(st.y*65.+sin(st.x*11.)*2.);
        } else if(creatureFinish<2.5) {
          relief=.063*abs(sin(st.x*19.+st.y*11.))+.031*grain;
        } else if(creatureFinish<3.5) {
          relief=.054*cos(st.y*39.+sin(st.x*18.))+.018*grain;
        } else {
          relief=.028*cos(st.y*64.+st.x*3.)+.018*grain;
        }
        float detail=1.-smoothstep(.016,.055,max(fwidth(st.x),fwidth(st.y)));
        diffuseColor.rgb*=1.+detail*relief+carving*.38;
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(1.,.75,.46),.36*creatureImpact);`)},M}var h2=`
  varying vec2 tex;uniform vec4 motion;uniform float kind,fall,bodyWidth,bodyHeight;
  void main(){tex=uv;float x=uv.x-.5,y=uv.y,sgn=sign(x);
    float edge=smoothstep(.13,.43,abs(x)),base=1.-smoothstep(.12,.40,y);
    float beat=motion.x,walk=motion.y,windup=motion.z,act=motion.w;
    float foot=sin(beat+step(0.,x)*3.1416);
    float drawX=0.,drawY=0.,depth=0.;
    if(kind<.5){drawX=edge*sgn*(.021*sin(beat*.7)+.049*windup-.055*act);drawY=edge*(.023*foot*walk+.068*windup-.066*act);}
    else if(kind<1.5){drawY=-.085*windup*smoothstep(.09,.60,y)+.036*act;depth=.15*windup-.10*act;}
    else if(kind<2.5){drawX=.049*sin(beat*.64+y*4.4)*(1.-fall)+.025*act;drawY=-windup*.11*y+act*.07*y;}
    else if(kind<3.5){float wing=edge*smoothstep(.24,.54,y);drawY=wing*(sin(beat)*.094+.105*windup-.15*fall);drawX=-sgn*wing*(.022*(1.+sin(beat))+.09*fall);depth=wing*sin(beat)*.33;}
    else{drawY=edge*foot*.038*walk+(1.-edge)*(-.043*windup+.039*act)*y;drawX=edge*foot*.024*walk;}
    drawY+=base*max(0.,foot)*.061*walk+.014*abs(sin(beat))*walk*(1.-base);
    vec3 p=vec3((x+drawX)*bodyWidth,(y+drawY)*bodyHeight*.89+.028,-(y+drawY)*bodyHeight*.43+.16+depth);
    p.z+=.16*(1.-min(1.,2.*abs(x)))*sin(y*3.1416);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
  }`,u2={captain:[[.43,.77,.31,.24,.99],[.44,.48,.34,.2,.83],[.16,.49,.16,.19,.65],[.8,.49,.18,.22,.71],[.84,.76,.13,.34,.92],[.43,.17,.18,.23,.74],[.65,.2,.14,.22,.69]],infantry:[[.5,.76,.38,.24,.98],[.5,.47,.28,.22,.85],[.19,.47,.15,.2,.6],[.82,.46,.14,.2,.62],[.37,.2,.19,.23,.69],[.66,.2,.17,.22,.65],[.46,.09,.17,.1,.76]],diver:[[.5,.64,.29,.27,1],[.2,.29,.17,.2,.82],[.82,.28,.17,.2,.82],[.5,.49,.15,.13,.62]],warden:[[.5,.7,.36,.32,1.04],[.53,.42,.22,.19,.75],[.64,.44,.12,.19,.98],[.24,.18,.15,.22,.59],[.76,.18,.14,.21,.59]],drill:[[.36,.47,.26,.27,1.02],[.68,.27,.25,.21,.72],[.7,.8,.25,.16,.65]],kestrel:[[.51,.48,.15,.27,.95],[.5,.34,.12,.13,.82],[.3,.18,.15,.17,.5],[.71,.26,.14,.13,.52]],engine:[[.5,.6,.3,.32,.95],[.5,.37,.18,.19,.83],[.31,.82,.14,.18,.65],[.69,.82,.14,.18,.65]]};function Mh(i,e,t,n){let s=i==="infantry"||i==="captain",r=i==="captain"?44:s?22:80,o=Math.max(s?30:54,Math.round(r*e.image.height/e.image.width)),l=document.createElement("canvas");l.width=r+1,l.height=o+1;let c=l.getContext("2d",{willReadFrequently:!0});c.drawImage(e.image,0,0,r+1,o+1);let u=c.getImageData(0,0,r+1,o+1).data,f=(r+1)*(o+1),d=new Float32Array(f);for(let S=0;S<f;S++)d[S]=u[S*4+3]>88?1e3:0;for(let S=1;S<o;S++)for(let y=1;y<r;y++){let E=S*(r+1)+y;d[E]=Math.min(d[E],d[E-1]+1,d[E-r-1]+1,d[E-r-2]+1.414)}for(let S=o-1;S>0;S--)for(let y=r-1;y>0;y--){let E=S*(r+1)+y;d[E]=Math.min(d[E],d[E+1]+1,d[E+r+1]+1,d[E+r+2]+1.414)}let h=[],p=[],x=[],g=[],m=new Uint8Array(r*o),v=s?.43:.64,M=Math.cos(v),_=Math.sin(v);for(let S of[!0,!1])for(let y=0;y<=o;y++)for(let E=0;E<=r;E++){let C=y*(r+1)+E,R=E/r,A=1-y/o,L=0;for(let[X,ee,ae,Ie,Fe]of u2[i])L=Math.max(L,Fe*Math.exp(-1.6*(((R-X)/ae)**2+((A-ee)/Ie)**2)));let O=Math.min(1,d[C]/(r*.11)),I=s?Ue.smoothstep(O,0,1)*Ue.smoothstep(u[C*4+3],65,215):Math.pow(O,.6),G=(.28*u[C*4]+.55*u[C*4+1]+.17*u[C*4+2])/255,q=(.023+I*((i==="kestrel"?.085:.2)+L*.86))*Math.min(1.26,t/3),V=S?q*(.87+G*.13):-(s?.67:.99)*q,re=A*n;h.push((R-.5)*t,re*M+V*_+.025,(s?.09:.46)-re*_+V*M),p.push(R,A),g.push(S?1:0)}for(let S=0;S<o;S++)for(let y=0;y<r;y++){let E=S*(r+1)+y;m[S*r+y]=[E,E+1,E+r+1,E+r+2].some(C=>u[C*4+3]>80)?1:0}for(let S=0;S<o;S++)for(let y=0;y<r;y++){if(!m[S*r+y])continue;let E=S*(r+1)+y,C=E+1,R=E+r+1,A=R+1;x.push(E,R,C,C,R,A,E+f,C+f,R+f,C+f,A+f,R+f);let L=(O,I)=>x.push(O,I,O+f,I,I+f,O+f);(!y||!m[S*r+y-1])&&L(R,E),(y===r-1||!m[S*r+y+1])&&L(C,A),(!S||!m[(S-1)*r+y])&&L(E,C),(S===o-1||!m[(S+1)*r+y])&&L(A,R)}let b=new St;return b.setAttribute("position",new $e(h,3)),b.setAttribute("uv",new $e(p,2)),b.setAttribute("surface",new $e(g,1)),b.setIndex(x),b.computeVertexNormals(),b}function Hm(i,e){let t={diver:4.12,warden:2.9,drill:3.15,kestrel:4.43,engine:4.08}[i],n=t*e.image.height/e.image.width,s=Mh(i,e,t,n),r=new Bt({side:Zt,alphaToCoverage:!0,uniforms:{paint:{value:e},motion:{value:new bt},kind:{value:Bf.indexOf(i)},fall:{value:0},bodyWidth:{value:t},bodyHeight:{value:n},hit:{value:0}},vertexShader:h2.replace("varying vec2 tex;","attribute float surface;varying float cap;varying vec3 ns;varying vec2 tex;").replace("tex=uv;","tex=uv;cap=surface;ns=normalize(normalMatrix*normal);").replace("gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);",`
     vec3 sculpt=position;
     sculpt.x+=drawX*bodyWidth;sculpt.y+=drawY*bodyHeight*.84;sculpt.z-=drawY*bodyHeight*.44;
     sculpt.z+=depth+foot*base*walk*.16;
     if(kind>1.5 && kind<2.5){float jaw=(1.-smoothstep(.12,.24,abs(x+.12)))*(1.-smoothstep(.11,.23,abs(y-.30)));sculpt.y-=jaw*(windup*.10+act*.15);}
     if(kind>2.5 && kind<3.5)sculpt.z+=edge*(.19*sin(beat+abs(x)*1.1)-fall*.42);
     if(kind<.5)sculpt.z+=edge*(.22*windup-.31*act);
     if(kind>3.5)sculpt.z-=smoothstep(.47,.85,y)*edge*act*.24;
     gl_Position=projectionMatrix*modelViewMatrix*vec4(sculpt,1.);`),fragmentShader:`varying vec2 tex;varying float cap;varying vec3 ns;uniform sampler2D paint;uniform float hit;
     void main(){vec4 p=texture2D(paint,tex);if(p.a<.25)discard;
       vec3 n=normalize(ns);
       float light=.88+.16*max(0.,dot(n,normalize(vec3(-.52,.76,.56))));
       vec3 rgb=p.rgb*light*mix(.53,1.,cap);
       float gloss=pow(max(0.,dot(n,normalize(vec3(-.33,.56,.76)))),22.);
       rgb+=.035*cap*gloss*vec3(.77,.90,1.);
       gl_FragColor=vec4(mix(rgb,vec3(1.,.78,.42),hit*.30),p.a);
       #include <colorspace_fragment>
     }`}),a=new Qe(s,r);return a.frustumCulled=!1,{mesh:a,pose(o){r.uniforms.motion.value.set(i==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),r.uniforms.fall.value=o.down,r.uniforms.hit.value=o.hit}}}var Wo=new D;function mi(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Wo.copy(e),Wo[n]=0,Wo.normalize();let c=.5*a/(a+o),u=1-Wo.angleTo(i)/l;return Math.sign(Wo[t])===1?u*c:o/(a+o)+c+c*(1-u)}var bh=class i extends kn{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new D,c=new D,u=new D(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,d=this.attributes.normal.array,h=this.attributes.uv.array,p=f.length/6,x=new D,g=.5/a;for(let m=0,v=0;m<f.length;m+=3,v+=2)switch(l.fromArray(f,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),f[m+0]=u.x*Math.sign(l.x)+c.x*r,f[m+1]=u.y*Math.sign(l.y)+c.y*r,f[m+2]=u.z*Math.sign(l.z)+c.z*r,d[m+0]=c.x,d[m+1]=c.y,d[m+2]=c.z,Math.floor(m/p)){case 0:x.set(1,0,0),h[v+0]=mi(x,c,"z","y",r,n),h[v+1]=1-mi(x,c,"y","z",r,t);break;case 1:x.set(-1,0,0),h[v+0]=1-mi(x,c,"z","y",r,n),h[v+1]=1-mi(x,c,"y","z",r,t);break;case 2:x.set(0,1,0),h[v+0]=1-mi(x,c,"x","z",r,e),h[v+1]=mi(x,c,"z","x",r,n);break;case 3:x.set(0,-1,0),h[v+0]=1-mi(x,c,"x","z",r,e),h[v+1]=1-mi(x,c,"z","x",r,n);break;case 4:x.set(0,0,1),h[v+0]=1-mi(x,c,"x","y",r,e),h[v+1]=1-mi(x,c,"y","x",r,t);break;case 5:x.set(0,0,-1),h[v+0]=mi(x,c,"x","y",r,e),h[v+1]=1-mi(x,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};function Xo(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new St;l.morphTargetsRelative=o;let c=0;for(let u=0;u<i.length;++u){let f=i[u],d=0,h=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in f.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(f.morphAttributes[p]),h++}if(h!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,u),c+=p}}if(t){let u=0,f=[];for(let d=0;d<i.length;++d){let h=i[d].index;for(let p=0;p<h.count;++p)f.push(h.getX(p)+u);u+=i[d].attributes.position.count}l.setIndex(f)}for(let u in r){let f=Gm(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,f)}for(let u in a){let f=a[u][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<f;++d){let h=[];for(let x=0;x<a[u].length;++x)h.push(a[u][x][d]);let p=Gm(h);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}}return l}function Gm(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let u=i[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let a=new e(r),o=new zt(a,t,n),l=0;for(let c=0;c<i.length;++c){let u=i[c];if(u.isInterleavedBufferAttribute){let f=l/t;for(let d=0,h=u.count;d<h;d++)for(let p=0;p<t;p++){let x=u.getComponent(d,p);o.setComponent(d+f,p,x)}}else a.set(u.array,l);l+=u.count*t}return s!==void 0&&(o.gpuType=s),o}function kf(i,e){if(e===lf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ea||e===Bo){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Ea)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function on(i,e,t,n=0){return n?new bh(i,e,t,1,n):new kn(i,e,t)}function Je(i,e,t,n,s,r=null){let a=i.index?i.toNonIndexed():i;a!==i&&i.dispose(),a.deleteAttribute("uv"),r&&a.applyQuaternion(new rn().setFromEuler(r)),a.translate(t,n,s);let o=new be(e),l=a.getAttribute("position").count,c=new Float32Array(l*3);for(let u=0;u<c.length;u+=3)o.toArray(c,u);return a.setAttribute("color",new zt(c,3)),a}function bn(i){let e=Xo(i,!1);for(let t of i)t.dispose();return e}function wn(i,e,t,n,s=8){let r=new D(...i),a=new D(...e),o=a.clone().sub(r),l=new an(t,t,o.length(),s);l.applyQuaternion(new rn().setFromUnitVectors(new D(0,1,0),o.normalize()));let c=r.lerp(a,.5);return Je(l,n,c.x,c.y,c.z)}var Xm=i=>new D(...i),Ht=(i=0,e=0,t=0)=>new qt(i,e,t),zf=Math.PI*2,qm=new Yt({vertexColors:!0,shininess:51,specular:7366501,side:Zt}),f2=new gt({vertexColors:!0,toneMapped:!1,side:Zt}),et=(i,e,t,n,s,r,a,o=null)=>{let l=Math.max(s,r,a),c=l<.11?10:l<.25?14:l<.56?20:28,u=new Xn(1,c,Math.ceil(c*.55));return u.scale(s,r,a),Je(u,i,e,t,n,o)},qo=(i,e,t,n,s,r,a,o=.045,l=null)=>Je(on(s,r,a,o),i,e,t,n,l),zs=(i,e,t,n,s,r,a,o=null,l=24)=>Je(new an(s,r,a,l),i,e,t,n,o),Yo=(i,e,t,n,s,r,a=null)=>Je(new ai(s,r,8,32),i,e,t,n,a);function Aa(i,e,t=.04){return Je(new yr(new cs(e.map(Xm)),Math.max(9,e.length*5),t,8,!1),i,0,0,0)}function ut(i,e,t,n=14){let s=new cs(e.map(Xm)),r=(e.length-1)*5,a=s.computeFrenetFrames(r,!1),o=[],l=[];for(let u=0;u<=r;u++){let f=u/r,d=s.getPointAt(f),h=f*(t.length-1),p=Math.min(t.length-2,Math.floor(h)),x=Ue.lerp(t[p],t[p+1],h-p);for(let g=0;g<n;g++){let m=g*zf/n,v=d.clone().addScaledVector(a.normals[u],x*Math.cos(m)).addScaledVector(a.binormals[u],x*Math.sin(m));if(o.push(v.x,v.y,v.z),u){let M=u*n+g,_=u*n+(g+1)%n;l.push(M-n,_-n,M,_-n,_,M)}}}let c=new St;return c.setAttribute("position",new $e(o,3)),c.setIndex(l),c.computeVertexNormals(),Je(c,i,0,0,0)}function Vm(i,e){let t=[],n=[];for(let r=1;r<i.length-1;r++)for(let a of[0,r,r+1]){t.push(...i[a]);let o=new be(e[a%e.length]);n.push(o.r,o.g,o.b)}let s=new St;return s.setAttribute("position",new $e(t,3)),s.setAttribute("color",new $e(n,3)),s.computeVertexNormals(),s}function Tn(i,e,t,n,s,r,a,o,l=null){let c=[[0,1],[.66,.64],[1,.08],[.82,-.53],[0,-1],[-.82,-.53],[-1,.08],[-.66,.64]],u=c.map(([b,S])=>[b*r,0,S*o]),f=c.map(([b,S])=>[b*r,a*.24,S*o]),d=c.map(([b,S])=>[b*r*.86,a*.53,S*o*.87]),h=[0,a,o*.06],p=[],x=[],g=new be(i),m=new be(e),v=g.clone().multiplyScalar(.48);function M(b,S,y,E){p.push(...b,...y,...S);for(let C=0;C<3;C++)x.push(E.r,E.g,E.b)}for(let b=0;b<c.length;b++){let S=(b+1)%c.length;M(u[b],f[b],u[S],v),M(u[S],f[b],f[S],v),M(f[b],d[b],f[S],m),M(f[S],d[b],d[S],m),M(d[b],h,d[S],g)}let _=new St;return _.setAttribute("position",new $e(p,3)),_.setAttribute("color",new $e(x,3)),_.computeVertexNormals(),l&&_.applyQuaternion(new rn().setFromEuler(l)),_.translate(t,n,s)}function d2(i,e,t){let s=[],r=[],a=[],o=new be("#307fa8"),l=new be("#94ddec");for(let f=0;f<=5;f++)for(let d=0;d<=5;d++){let h=f/5,p=d/5,x=Math.sin(Math.PI*p),g=h*(1-.25*x*h*h);s.push(Ue.lerp(i[0],e[0],p)*g,Ue.lerp(i[1],e[1],p)*g-.19*x*h+.06*Math.sin(Math.PI*h),Ue.lerp(i[2],e[2],p)*g);let m=o.clone().lerp(l,.22+.51*(1-x)+.17*h);if(r.push(m.r,m.g,m.b),f&&d){let v=f*6+d,M=v-1,_=v-6,b=_-1;t<0?a.push(b,v,_,b,M,v):a.push(b,_,v,b,v,M)}}let c=new St;c.setAttribute("position",new $e(s,3)),c.setAttribute("color",new $e(r,3)),c.setIndex(a),c.computeVertexNormals();let u=c.toNonIndexed();return c.dispose(),u}function Cr(i,e,t,n,s,r,a=0){let o=new an(.035,s,r,5,1);return o.translate(0,r/2,0),Je(o,i,e,t,n,Ht(0,.2,a))}function p2(){let i=new Nt,e=[];function t(a,o=0,l=0,c=0){let u=new Ls;return u.position.set(o,l,c),a.add(u),u.userData.geometry=[],u.userData.light=[],e.push(u),u}let n=(a,...o)=>a.userData.geometry.push(...o),s=(a,...o)=>a.userData.light.push(...o);function r(){i.updateMatrixWorld(!0);let a=new fr(e);for(let[o,l]of[["geometry",qm],["light",f2]]){let c=[];if(e.forEach((f,d)=>{let h=f.userData[o];if(delete f.userData[o],!h.length)return;let p=bn(h).applyMatrix4(f.matrixWorld),x=p.getAttribute("position").count,g=new Uint8Array(x*4),m=new Uint8Array(x*4);for(let v=0;v<g.length;v+=4)g[v]=d,m[v]=255;p.setAttribute("skinIndex",new la(g,4)),p.setAttribute("skinWeight",new la(m,4,!0)),c.push(p)}),!c.length)continue;let u=new ur(bn(c),l);i.add(u),u.bind(a,new Ke),u.frustumCulled=!1}}return{root:i,joint:t,add:n,glow:s,finish:r}}function Sh(i,e,t,n,s,r,a=!0){for(let o of[-1,1])i.add(e,et("#28313b",o*t,n,s,.15,.106,.095,Ht(0,o*.35,-o*.27))),i.glow(e,et(r,o*t,n+.006,s+.055,.114,.068,.06,Ht(0,o*.35,-o*.27))),a&&i.add(e,et("#271f2e",o*t,n,s+.11,.027,.052,.017))}function Eh(i,e,t,n,s,r,a=!1){for(let o=0;o<r;o++){let l=n*(o/(r-1)-.5),c=.12+(o===0||o===r-1?.08:0);i.add(e,ut("#f7dfb0",[[l,s,t-Math.abs(l)*.15],[l*.98,s+(a?1:-1)*c,t+.035]],[.049,.004],8))}}function Ym(i,e,t,n,s,r=!1){let a=i.joint(e,...t),[o,l,c]=n,[u,f,d]=s;i.add(a,ut(f,[[0,0,0],o],[r?.17:.19,.12]),et(d,...o,.16,.15,.15));let h=i.joint(a,...o),p=l.map((g,m)=>g-o[m]),x=c.map((g,m)=>g-o[m]);if(i.add(h,ut(u,[[0,0,0],p,x],[.13,.092,.009],12)),r){let g=p.map(m=>m*.56);i.add(h,ut(f,[p.map(m=>m*.09),g,p.map(m=>m*.81)],[.145,.17,.105],10),wn(p.map(m=>m*.25),p.map(m=>m*.32),.172,d,12),wn(p.map(m=>m*.64),p.map(m=>m*.69),.143,d,12)),i.add(a,wn([0,.09,.1],[o[0],o[1]+.085,o[2]+.08],.041,"#e9b277")),i.add(h,wn([0,.03,.06],[p[0],p[1]+.12,p[2]+.05],.042,"#dba26b"),et(f,...p,.13,.09,.14))}else i.add(h,et(f,...p,.13,.095,.13));return{g:a,shank:h}}function m2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.04,-.12),a=t(r,0,-.06,.8),o=[],l=[],c="#176f70",u="#30a59a",f="#124e59",d="#f07846",h="#fcbb71";n(r,et(f,0,-.1,0,1.23,.55,1),et(c,0,.24,-.05,1.39,.77,1.06),et(u,0,.48,-.13,1.08,.55,.84));for(let p of[-1,1]){n(r,ut("#248d87",[[p*.15,.87,.13],[p*.56,1.01,-.17],[p*.72,1.12,-.42]],[.135,.12,.009]));for(let v=0;v<5;v++)n(r,et("#65ae96",p*(.26+v*.14),.88-v*.07,-.36+v*.032,.055,.039,.075));n(r,Aa("#93c9ac",[[p*.18,.96,.09],[p*.58,.83,.31],[p*1.07,.59,.33],[p*1.26,.29,.19]],.036));for(let v=0;v<3;v++){let M=.4-v*.46;n(r,ut(u,[[p*1,.32,M],[p*1.36,.38,M-.13],[p*1.45,.58,M-.26]],[.21,.13,.006]));let _=[p*.92,-.09,M];o.push({...Ym(i,r,_,[[p*.58,.18,-.14],[p*.91,-.78,.02],[p*1,-.97,.31]],[f,c,d]),phase:v*.98+(p<0?Math.PI:0),s:p})}let x=t(r,p*.9,.06,.39),g=t(x,p*.41,.25,.5);n(x,ut(f,[[0,0,0],[p*.37,.05,.22],[p*.41,.25,.5]],[.27,.23,.24])),n(g,et(d,0,.05,.05,.45,.34,.49,Ht(.12,0,-p*.12)),ut(d,[[p*.23,.12,.2],[p*.39,.22,.55],[p*.33,.31,.89],[-p*.015,.33,1.08]],[.23,.19,.1,.008]),Aa(h,[[p*.29,.23,.32],[p*.39,.33,.62],[p*.24,.37,.9]],.047));let m=t(g,-p*.13,.02,.24);n(m,ut("#e78954",[[0,0,0],[-p*.18,.02,.32],[-p*.19,.12,.62],[p*.033,.25,.8]],[.19,.16,.095,.007]));for(let v=0;v<4;v++)n(g,et(h,-p*.02,.29,.07+v*.11,.074,.054,.06));l.push({arm:x,palm:g,finger:m,s:p}),n(r,ut(f,[[p*.39,.45,.55],[p*.48,.71,.62],[p*.49,.85,.72]],[.13,.095,.08])),n(r,et(f,p*.49,.86,.74,.22,.16,.17)),s(r,et("#ffd777",p*.49,.88,.865,.146,.11,.077)),n(r,et("#333442",p*.49,.9,.927,.036,.078,.02));for(let v=0;v<3;v++)n(a,ut(h,[[p*(.14+v*.1),.07,.03],[p*(.16+v*.14),-.12,.21],[p*(.13+v*.14),-.29,.27]],[.078,.055,.007]));for(let v=0;v<3;v++){let M=-.39-v*.17;n(r,Yo("#ded5a1",p*(.46+v*.1),.88-v*.06,M,.077,.025,Ht(Math.PI/2,0,0)))}}n(r,Aa("#a7dac4",[[0,.59,.81],[0,.96,.21],[0,1.01,-.18],[0,.75,-.78]],.034));for(let p of[-1,1]){for(let x=0;x<2;x++){let g=p*(.36+x*.24),m=-.54+x*.18,v=[g+p*.2,1.57-x*.13,m-.11];n(r,ut("#e77648",[[g,.84,m],[g+p*.03,1.09,m],[g+p*.17,1.31-x*.06,m-.04],v],[.12,.092,.061,.022],10),ut("#ff9c5e",[[g+p*.09,1.19,m-.02],[g-p*.08,1.35,m+.025],[g-p*.06,1.47,m+.055]],[.062,.04,.011],9),ut("#f59853",[[g+p*.15,1.28-x*.04,m-.04],[g+p*.29,1.34,m-.11],[g+p*.33,1.46,m-.16]],[.055,.035,.01],9))}n(r,Tn("#126d72","#91cba9",p*.48,.9,.7,.24,.1,.23,Ht(.15,p*.12,-p*.36))),n(a,ut("#efc69c",[[p*.26,.13,.15],[p*.37,.03,.38],[p*.2,-.13,.44]],[.115,.071,.004],12))}for(let p of[-1,1])n(r,ut("#195a5c",[[p*.27,.86,.9],[p*.47,.99,.865],[p*.68,1.02,.73]],[.052,.116,.033],12));n(a,et("#362a2f",0,.07,.27,.28,.12,.13)),Eh(i,a,.36,.39,.11,5),n(r,Tn("#209f95","#98dfbb",0,.86,-.03,.7,.27,.82));for(let p of[-1,1])n(r,Tn("#197c7f","#7ecaaa",p*.79,.67,-.18,.39,.23,.55,Ht(.08,p*.28,-p*.35)));for(let{palm:p,finger:x,s:g}of l){g<0&&p.scale.set(1.24,1.28,1.15),n(p,Tn("#fb7c3d","#ffd27a",0,.27,.2,.33,.13,.43,Ht(.04,0,-g*.16)));for(let m=0;m<3;m++){let v=.44+m*.17;n(p,ut("#ffda8e",[[g*.23,.19,v],[g*.09,.16,v+.04]],[.078,.007],9)),n(x,ut("#f6c583",[[-g*.13,.13,v-.23],[-g*.02,.14,v-.15]],[.065,.004],9))}}return p=>{let x=p.slamHand===2;a.rotation.x=.07+.12*Math.sin(p.time*3.2)+.28*p.cast-.18*p.fire+.24*p.raise,r.position.y=1.04+p.bob*.08+.26*p.raise-.44*p.strike-p.down*.29,r.rotation.z=p.stride*.044+p.down*.18+p.knock*Math.sin(p.time*26)*.14,r.rotation.x=-p.cast*.14-.28*p.raise+.36*p.strike-.32*p.knock,o.forEach(({g,shank:m,phase:v,s:M})=>{let _=p.beat+v;g.rotation.y=M*.25*Math.sin(_)*p.walk,m.rotation.z=M*(Math.max(0,Math.cos(_))*.28*p.walk+p.down*.45+p.knock*.25)}),l.forEach(({arm:g,palm:m,finger:v,s:M})=>{let _=x||(M<0?p.slamHand===0:p.slamHand===1),b=_?p.raise:0,S=_?p.strike:0;g.rotation.x=-.14+.2*p.stride*M-.55*p.cast-1.65*b+.82*S-.58*p.air-.9*p.knock+.5*p.down,m.rotation.y=M*(.1-.26*p.cast+.26*p.fire-.32*b+.38*S),v.rotation.y=M*(-.28-.32*p.cast+.64*p.fire-.45*b+.72*S+.09*Math.sin(p.time*3))})}}function g2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.24,-.26),a=t(r,0,.18,.7),o=[],l="#57484b",c="#b67b35",u="#e9b858",f="#ffe3a8";n(r,et(l,0,.03,-.17,.94,.77,1.36),et("#8e612f",0,.18,.18,1.04,.84,.94));for(let h=0;h<3;h++){let p=.36-h*.48,x=1-h*.12;n(r,et(h%2?c:"#c89348",0,.53-h*.09,p,.98*x,.53*x,.55));for(let g of[-1,1])n(r,wn([g*.6*x,.9-h*.1,p+.12],[g*.92*x,.46-h*.1,p+.04],.048,u),et("#5b5052",g*.9*x,.49-h*.09,p+.11,.07,.07,.07))}n(a,et(l,0,.11,.27,.64,.63,.68),et("#866344",0,-.11,.72,.56,.37,.56),et("#624c41",0,-.2,1.03,.5,.25,.25),ut(f,[[0,.12,.88],[.04,.43,1.17],[.22,.86,1.47],[.46,1.48,1.35]],[.3,.22,.115,.004]),ut("#d6ae76",[[0,.45,.6],[0,.67,.69],[0,.87,.78]],[.16,.1,.005]));for(let h of[-1,1]){n(a,et("#493d42",h*.275,-.16,1.205,.105,.064,.038),ut(l,[[h*.41,.39,.1],[h*.62,.56,.04],[h*.69,.68,-.13]],[.16,.14,.015]),et(c,h*.46,.33,.63,.27,.11,.26,Ht(0,h*.42,-h*.31)));for(let p of[-.86,.62]){let x=t(r,h*.64,-.11,p),g=t(x,0,-.54,.05);n(x,et(l,h*.055,-.19,0,.3,.46,.34),et(c,h*.12,-.2,.045,.29,.23,.32)),n(g,et(l,0,-.13,0,.235,.33,.25),et("#423d43",0,-.39,.095,.267,.16,.34));for(let m=-1;m<=1;m++)n(g,et("#c3a580",m*.123,-.41,.29,.075,.074,.11));o.push({g:x,knee:g,phase:(p<0?Math.PI:0)+(h<0?Math.PI:0)})}}Sh(i,a,.447,.22,.72,"#ffb333");let d=t(r,0,.12,-1.22);n(d,ut(l,[[0,0,0],[.13,-.22,-.34],[.12,-.45,-.47]],[.11,.073,.035]),et("#342f3a",.12,-.47,-.48,.08,.13,.085));for(let h=0;h<3;h++){let p=.38-h*.48,x=1-h*.12;n(r,Tn("#cf9440","#ffe093",0,1-h*.1,p,x*.44,.14,.36))}for(let h=0;h<3;h++){let p=.31-h*.48,x=1-h*.12;for(let g of[-1,1])n(r,Aa("#795533",[[g*.24*x,1.02-h*.09,p+.12],[g*.59*x,.91-h*.1,p+.24],[g*.9*x,.54-h*.1,p+.16]],.026))}Sh(i,a,.488,.295,.8,"#e7a73e"),n(a,Tn("#c28b3d","#ffd46b",0,.58,.34,.46,.18,.46,Ht(.35)));for(let h of[-1,1]){n(r,Tn("#ba7827","#ffd473",h*.71,.7,.17,.48,.25,.69,Ht(.03,h*.1,-h*.61))),n(a,Tn("#935b32","#ffd181",h*.51,.2,.44,.26,.12,.42,Ht(.38,h*.18,-h*.55))),n(a,Aa("#ecd287",[[h*.08,.16,.89],[h*.14,.19,1],[h*.14,.25,1.08]],.035));for(let p=0;p<3;p++)n(r,et("#69484b",h*(.63+p*.09),.96-p*.102,.46-p*.03,.05,.042,.052))}return h=>{a.rotation.y=.065*h.stride-.1*Math.sin(h.time*3)*h.cast,r.position.y=1.24+.1*h.bob-.26*h.cast-.35*h.down,r.rotation.z=.06*h.stride+.25*h.down,a.rotation.x=.025+.18*h.stride+.48*h.cast-.47*h.fire+.2*h.down;for(let{g:p,knee:x,phase:g}of o){let m=Math.sin(h.beat+g)*h.walk;p.rotation.x=-m*.39+.25*h.down,x.rotation.x=Math.max(0,m)*.39+.35*h.air}d.rotation.z=.28*Math.sin(h.time*3)}}function x2(i){let{root:e,joint:t,add:n,glow:s}=i,r=[],a=[[-.32,1.76,.88,.69],[-.07,1.14,.63,.75],[.51,.63,.49,.73],[.91,.48,-.12,.68],[.72,.47,-.75,.63],[.19,.49,-1.1,.56],[-.4,.52,-1.12,.52],[-.85,.58,-.76,.46],[-.99,.77,-.27,.4],[-.85,1.16,-.14,.36],[-.64,1.59,-.35,.31],[-.3,1.95,-.62,.25],[.14,2.07,-.66,.19],[.46,1.95,-.64,.14],[.54,1.72,-.63,.078]];for(let c=0;c<a.length;c++){let[u,f,d,h]=a[c],p=t(e,u,f,d);n(p,et(c%2?"#623c81":"#654194",0,0,0,h,h*.78,h*.98),et(c%2?"#a969bd":"#9659af",0,h*.23,-.03,h*1.06,h*.71,h*.64));for(let x of[-1,1])n(p,et("#50365e",x*h*.78,-.09,.08,h*.21,h*.19,h*.5),Cr(c%2?"#cc80ee":"#a17de8",x*h*.62,h*.43,-.1,h*.26,h*.78,-x*.5)),s(p,et("#edacff",x*h*.72,h*.5,.075,h*.22,h*.043,h*.09));if(n(p,Cr("#e5b0ff",0,h*.62,-.14,h*.23,h*.67,-.12)),n(p,Tn(c%2?"#9f62cb":"#8251b7","#d39ae8",0,h*.61,.025,h*.82,h*.32,h*.69)),c+1<a.length){let[x,g,m,v]=a[c+1],M=[x-u,g-f,m-d];n(p,ut(c%2?"#6e498c":"#8453a4",[[0,0,0],M.map(_=>_*.55),M],[h*.79,(h+v)*.44,v*.78],16))}r.push(p)}let o=t(r[0],0,.37,.34),l=t(o,0,-.12,.11);n(o,et("#75469a",0,.18,.02,.69,.49,.61),et("#9954af",0,.1,.4,.56,.23,.44),et("#392744",0,-.043,.41,.51,.11,.44)),n(l,et("#b579ab",0,-.19,.37,.47,.145,.45)),Eh(i,o,.67,.83,-.012,7),Eh(i,l,.62,.67,-.13,5,!0);for(let c of[-1,1])n(o,ut("#cea6ef",[[c*.45,.32,.1],[c*.65,.69,-.06],[c*.69,.91,-.32]],[.19,.135,.01]),ut("#a07ccf",[[c*.48,.11,-.04],[c*.78,.36,-.23],[c*.94,.44,-.49]],[.19,.1,.007]),et("#b17cba",c*.4,.32,.44,.24,.105,.19,Ht(0,c*.37,-c*.32)));for(let c of[-1,1])n(o,ut("#c491da",[[c*.18,.31,.63],[c*.39,.42,.54],[c*.66,.5,.24]],[.1,.16,.035]),ut("#cba7d1",[[c*.49,.09,.31],[c*.67,-.03,.53],[c*.57,-.19,.75]],[.12,.085,.005]));Sh(i,o,.39,.235,.51,"#a3ffe6");for(let c of[-1,1])n(o,Cr("#86bdf3",c*.43,.43,-.11,.16,.62,-c*.45),Cr("#d6b8ff",c*.56,.36,-.21,.12,.41,-c*.67));n(l,Tn("#713f83","#e19acd",0,-.16,.34,.44,.12,.34)),n(l,et("#512c4b",0,-.061,.4,.25,.05,.18));for(let c of[-1,1])n(o,ut("#ffe8c5",[[c*.36,.08,.61],[c*.37,-.1,.81],[c*.3,-.28,.87]],[.092,.06,.006],12)),n(o,Tn("#754593","#cc8dee",c*.38,.35,.4,.25,.1,.25,Ht(.22,-c*.22,-c*.44)));return c=>{r.forEach((u,f)=>{let[,d,h]=a[f];u.position.x=a[f][0]+Math.sin(c.beat*.68-f*.71)*(.075+Math.min(4,f)*.026)*c.walk,u.position.y=d*(1-.57*c.down-.36*c.cast)+Math.sin(c.beat*.63-f*.73)*.074*c.walk,u.position.z=h+f*.035*c.cast+Math.max(0,1-f*.2)*.36*c.fire,u.rotation.z=.12*Math.sin(c.beat*.7-f*.61)*c.walk+.27*c.down}),o.rotation.x=-.22*c.cast-.36*c.fire+.1*Math.sin(c.beat)*c.walk,l.rotation.x=.4+.31*c.cast+.36*c.fire+.04*Math.sin(c.time*3)}}function v2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.72,-.26),a=t(r,0,.4,.8),o=t(a,0,-.16,.28),l=[],c=[],u=[];n(r,et("#387bab",0,.09,-.08,.65,.59,1.1),et("#a4d6df",0,-.18,.12,.48,.35,.8),et("#397aa7",0,.3,.58,.45,.49,.64)),n(a,et("#599fc2",0,.11,.14,.46,.39,.61),et("#92cbd6",0,-.01,.5,.38,.2,.47),et("#296382",0,-.14,.58,.35,.1,.38)),n(o,et("#b1e3e3",0,-.12,.3,.31,.12,.34)),Eh(i,a,.76,.53,-.11,5);for(let h of[-1,1]){n(a,ut("#e1f3e6",[[h*.28,.27,0],[h*.45,.58,-.24],[h*.48,.72,-.51]],[.13,.085,.006]),ut("#80d5e1",[[h*.27,.07,-.08],[h*.54,.17,-.25],[h*.66,.22,-.47]],[.14,.08,.01]));let p=t(r,h*.39,.32,.04),x=t(p,h*.76,.72,-.26);n(p,ut("#5296b7",[[0,0,0],[h*.38,.26,-.08],[h*.76,.72,-.26]],[.18,.12,.095]),Vm([[0,0,0],[h*.76,.72,-.26],[h*.82,.08,.74],[h*.14,-.08,.47]],["#4a9fc7","#8ddfe5","#3b81b0","#306d9c"]));let g=[[h*.98,.33,-.32],[h*1.2,-.005,.18],[h*1.16,-.36,.77],[h*.78,-.62,1.05],[h*.4,-.66,.98]];for(let m=0;m<g.length-1;m++){let v=g[m],M=g[m+1];n(x,d2(v,M,h),ut("#d0ecdc",[[0,0,0],[v[0]*.56,v[1]*.58+.05,v[2]*.47],v],[.055,.042,.009]))}n(x,ut("#c5e8df",[[0,0,0],g[g.length-1]],[.046,.008]),ut("#b2e8e2",[[0,0,0],[h*.09,.12,.1],[h*.12,.16,.22]],[.08,.05,.004])),l.push({arm:p,elbow:x,s:h});for(let m of[-.57,.41]){let v=t(r,h*.37,-.23,m);n(v,ut("#407ea5",[[0,0,0],[h*.12,-.32,.05],[h*.14,-.49,.23]],[.15,.095,.069]));for(let M of[-1,0,1])n(v,ut("#dcebd5",[[h*.14,-.49,.23],[h*.15+M*.09,-.57,.38]],[.053,.006]));c.push({leg:v,s:h,z:m})}}for(let h of[-1,1])n(a,ut("#4b92af",[[h*.11,.24,.55],[h*.31,.32,.47],[h*.48,.39,.21]],[.052,.095,.021]));Sh(i,a,.315,.14,.54,"#f9c45b");let f=r;for(let h=0;h<5;h++){let p=t(f,0,h?-.015:0,h?-.33:-.83),x=.28-h*.042;n(p,ut("#4789ad",[[0,0,.06],[0,-.025,-.27],[0,.01,-.4]],[x,x*.8,x*.64]),Cr("#acdfe4",0,x*.59,-.16,.065,.17-h*.014)),u.push(p),f=p}for(let h=0;h<4;h++){let p=.47-h*.28;n(r,Tn(h%2?"#68b4d3":"#559fc9","#d1eef0",0,.48,p,.39-h*.035,.13,.26))}n(a,Tn("#4085a8","#a9dce8",0,.15,.52,.28,.12,.4,Ht(.17)));for(let h of[-1,1])n(a,ut("#316785",[[h*.16,.22,.63],[h*.34,.29,.52],[h*.48,.36,.22]],[.06,.1,.012],11),ut("#f6f2df",[[h*.25,-.045,.72],[h*.28,-.17,.85],[h*.25,-.28,.86]],[.066,.039,.005],10));n(a,Cr("#b8eef8",0,.38,.1,.14,.44));let d=u[u.length-1];for(let h of[-1,1])n(d,Vm([[0,.03,-.11],[h*.29,.12,-.32],[h*.35,.1,-.63],[0,-.02,-.49]],["#bbeffd","#2689ae","#b2eff7","#246c98"])),n(d,ut("#daeff3",[[0,.05,-.1],[h*.22,.12,-.33],[h*.35,.1,-.63]],[.06,.035,.006],10)),n(a,Tn("#57a6ca","#b4edf1",h*.31,.27,.12,.2,.105,.31,Ht(.16,0,-h*.25)));for(let{arm:h,elbow:p,s:x}of l)n(h,Tn("#3f8fba","#d7f1e8",x*.39,.27,-.05,.22,.1,.43,Ht(-.03,x*.94,-x*.28))),n(p,ut("#c1eafa",[[0,.04,.02],[x*.22,.22,.18],[x*.32,.33,.11]],[.1,.055,.005],10));for(let h=0;h<4;h++)n(r,Cr("#d5ede7",0,.5,.41-h*.31,.084,.23));return h=>{let p=Math.sin(h.time*4.9);r.position.y=1.7+.1*p*(1-h.down)-.69*h.down-.3*h.cast,r.rotation.x=-.13*h.cast+.17*h.fire+.18*h.down,a.rotation.x=.1*Math.sin(h.time*2.4)+.32*h.fire,o.rotation.x=.08+.36*h.cast+.4*h.fire;for(let{arm:x,elbow:g,s:m}of l)x.rotation.z=m*(.06+.32*p*(1-h.down)+.39*h.cast-.65*h.down),g.rotation.z=m*(.21*Math.sin(h.time*4.9-.85)*(1-h.down)-.18*h.fire),g.rotation.y=m*(.12+.12*Math.sin(h.time*4.9-.6)+.7*h.down);for(let{leg:x,s:g,z:m}of c)x.rotation.x=.32+.13*Math.sin(h.beat+g+(m>0?Math.PI:0))+.35*h.air;u.forEach((x,g)=>x.rotation.y=.16*Math.sin(h.time*3-g*.6))}}function y2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.14,-.17),a=[],o=[],l=t(r,0,.14,.88),c="#394955",u="#8a4239",f="#d09253",d="#27313d",h="#ffc669";n(r,et(d,0,0,-.06,.99,.63,1.15),et(u,0,.24,-.15,1.06,.68,1.08));for(let x=0;x<3;x++)n(r,zs(x===1?f:c,0,.6+x*.13,-.22,.71-x*.075,.74-x*.073,.15),Yo("#c4874f",0,.65+x*.13,-.22,.705-x*.072,.043,Ht(Math.PI/2)));n(r,zs(d,0,.98,-.22,.48,.56,.11)),s(r,zs("#ff9642",0,1.035,-.22,.414,.414,.035));for(let x=-2;x<=2;x++)n(r,qo(c,x*.14,1.07,-.22,.052,.04,.66-.09*Math.abs(x),.014));n(l,zs(d,0,0,.1,.54,.54,.27,Ht(Math.PI/2)),Yo(f,0,0,.265,.48,.077)),s(l,et("#ff8235",0,0,.245,.39,.39,.105),et("#ffe395",0,0,.326,.17,.17,.054));for(let x=0;x<8;x++){let g=x*zf/8;n(l,qo(c,Math.cos(g)*.32,Math.sin(g)*.32,.35,.24,.066,.053,.016,Ht(0,0,g+.32)))}for(let x of[-1,1]){for(let m=0;m<4;m++){let v=.62-m*.45,M=[x*(.5+Math.sin(m*Math.PI/3)*.12),.39,v*.42],_=[x*(.9+Math.sin(m*Math.PI/3)*.18),-.75,v*.78];a.push({...Ym(i,r,[x*.75,-.06,v],[M,_,[_[0]+x*.16,-1.04,_[2]+.27]],[c,u,f],!0),s:x,phase:m*1.5+(x<0?Math.PI:0)})}let g=t(r,x*.74,.56,-.25);o.push({g,s:x}),n(g,zs(c,0,.28,0,.245,.265,.76,Ht(.26)),zs(f,0,.62,.095,.258,.26,.13,Ht(.26)),zs(d,0,.72,.118,.22,.22,.1,Ht(.26)),Yo("#e4a361",0,.78,.132,.232,.045,Ht(Math.PI/2+.26)),Aa(f,[[x*.17,0,-.1],[x*.27,.28,-.12],[x*.2,.46,-.06]],.05)),s(g,et(h,0,.742,.13,.142,.042,.14)),n(r,qo(u,x*.76,.3,.45,.47,.43,.52,.1,Ht(0,x*.16,-x*.25)));for(let m=0;m<3;m++)s(r,qo("#ffa64f",x*(.67+m*.075),.31,.72,.036,.18,.033,.007,Ht(0,0,-x*.18)))}for(let x of[-1,1])n(l,qo(c,x*.142,0,.37,.066,.46,.06,.023));s(l,et("#ffe295",0,0,.391,.061,.236,.034));let p=t(r,0,1.11,-.22);n(p,zs(f,0,.01,0,.094,.116,.06));for(let x=0;x<6;x++){let g=x*zf/6;n(p,Tn("#5b6970","#dda064",.21*Math.sin(g),0,.21*Math.cos(g),.085,.042,.17,Ht(0,g+.61,.13)))}for(let{g:x,s:g}of o){for(let m=0;m<3;m++)n(x,Yo("#be8451",0,.39+m*.083,.04+m*.022,.253,.018,Ht(Math.PI/2+.26)));n(r,Tn("#a64b36","#d8944f",g*.7,.65,.43,.4,.17,.4,Ht(.05,g*.2,-g*.42)))}return x=>{let g=x.slamHand===2;p.rotation.y=x.time*2.8+x.cast*1.2+x.fire*.7+x.raise*3.2,r.position.y=1.14+.066*x.bob+.34*x.raise-.48*x.strike-.15*x.cast-.42*x.down,r.rotation.z=.042*x.stride+.21*x.down+x.knock*Math.sin(x.time*25)*.16,r.rotation.x=-.32*x.raise+.42*x.strike-.34*x.knock,l.rotation.z=.14*x.time+.67*x.cast+1.4*x.raise,a.forEach(({g:m,shank:v,s:M,phase:_},b)=>{let S=x.beat+_,E=b%4===0&&(g||(M<0?x.slamHand===0:x.slamHand===1));m.rotation.y=M*.22*Math.sin(S)*x.walk,m.rotation.x=E?-.95*x.raise+.52*x.strike:-.35*x.knock,v.rotation.z=M*(.25*Math.max(0,Math.cos(S))*x.walk+.36*x.down+(E?-.55*x.raise+.42*x.strike:0)+.25*x.knock)}),o.forEach(({g:m,s:v})=>{let M=g||(v<0?x.slamHand===0:x.slamHand===1);m.rotation.x=.22+.54*x.cast-.34*x.fire-(M?.95*x.raise-.78*x.strike:0)-.5*x.knock,m.rotation.z=v*(.18+.12*x.down+.24*x.knock),m.position.y=.56-.14*x.fire+(M?.18*x.raise-.18*x.strike:0)})}}var Hf={diver:[[2.86,-.93,.74]],warden:[[2.85,-.79,.52],[3.5,2.1,.45]],drill:[[3.18,.69,.56],[2.38,-.83,.54]],kestrel:[[3.6,-.8,1.85],[3.3,.35,.44]],engine:[[2.77,-.49,.8],[2.29,-1.2,.44]]},_2={diver:1.08,warden:1.19,drill:1.03,kestrel:1.05,engine:1.09},Wm={diver:m2,warden:g2,drill:x2,kestrel:v2,engine:y2};function Zm(i,e){let t=new Map,n;return function(r,a){if(n!==r){let m=t.get(n);m&&(m.root&&(m.root.visible=!1),m.portrait&&(m.portrait.mesh.visible=!1)),Wm[r]&&!t.has(r)&&t.set(r,{}),n=r}let o=t.get(r);if(!o)return!1;let l=e.get(r),c=a.mode==="ai"&&l,u=a.march*4.35,f=Tt(a.defeat,0,.08)*(1-Tt(a.defeat,.82,.96)),d=Ue.smoothstep(a.defeat,.84,1.38),h=a.attack>0?1-Tt(a.defeat,0,.15):0,p=h*ul(a.attack),x=h*fl(a.attack);if(c)return o.portrait||(o.portrait=Hm(r,l),i.add(o.portrait.mesh)),o.root&&(o.root.visible=!1),o.portrait.mesh.visible=!0,o.portrait.pose({...a,down:d}),!0;if(!o.root){let m=p2();o.sample=Wm[r](m),m.finish(),o.root=m.root,i.add(m.root)}!o.paintState&&l&&(o.paintState=zm(o.root,l,qm,r)),o.portrait&&(o.portrait.mesh.visible=!1),o.root.visible=!0,o.root.scale.setScalar(_2[r]),o.paintState&&(o.paintState.value=Math.max(0,a.hit,f*.72));let g=Math.sin(Math.PI*Ue.clamp((a.vault-.21)/.89,0,1))+(a.slamHand===2&&a.attack>0?Math.sin(Math.PI*Tt(a.attack,.16,.62)):0);return o.sample({time:a.time,beat:u,walk:a.walk*(1-d)*(1-.75*h)+f*.6,stride:Math.sin(u)*a.walk*(1-d),bob:(.5-.5*Math.cos(u*2))*a.walk,down:d,knock:f,raise:p,strike:x,slamHand:a.slamHand||0,air:g,cast:a.charge||0,fire:a.release||0}),!0}}var wh=`
  vec3 paintHelmet(vec3 color, float height, bool enemy) {
    float crown = smoothstep(.64, .76, height);
    float pigment = enemy ? color.r : color.b;
    float other = enemy ? max(color.g, color.b) : color.r;
    float chroma = (pigment - other) / max(.015, pigment);
    float mask = crown * smoothstep(.32, .75, chroma);
    vec3 lacquer;
    if (enemy) {
      lacquer = vec3(color.r + .42 * color.r * (1. - color.r), color.g * .80, color.b * .86);
    } else {
      lacquer = vec3(color.r * .87, color.g + .21 * color.b * (1. - color.g),
                     color.b + .54 * color.b * (1. - color.b));
    }
    return mix(color, lacquer, mask);
  }
`;var Ra=.18700000000000003,$m=Math.PI*2;function Km(i){if(i<.55)return 1-2*i/.55;let e=(i-.55)/(1-.55),t=e*e*(3-2*e),n=2*(1-.55)/.55*e*(1-e)*(1-2*e);return-1+2*t-n}function Hs(i,e,t){let n=i/$m%1,s=(n+.5)%1;t[0]=Km(n)*e,t[1]=Km(s)*e;let r=Math.max(n,s),a=r>.55?Math.sin(Math.PI*(r-.55)/(1-.55))**2:0;return t[2]=(r===n?1:-1)*a*e,t}function Ca(i){return i.phase+$m*i.marched/(.68*i.size)}function M2(i,e){let t=e==="captain",n=t?1.16:e==="red"?.54:.49,s=i.attributes.position,r=i.attributes.uv,a=t?.42:.5,o=t?1.73:.88,l=Math.cos(.43),c=Math.sin(.43),u=t?.79:.65,f=Math.sin(u),d=Math.cos(u),h=Ue.smoothstep,p=(x,g,m,v,M,_)=>{let b=((x-m)/M)**2+((g-v)/_)**2;return 1-h(b,.13,1)};for(let x=0;x<s.count;x++){let g=r.getX(x),m=r.getY(x),v=i.attributes.surface.getX(x),M=p(g,m,a,.818,t?.285:.4,.19),_=p(g,m,a,.726,t?.33:.425,.055),b=p(g,m,.18,.552,.16,.135)+p(g,m,.82,.552,.16,.135),S=p(g,m,.29,.105,.135,.135)+p(g,m,.69,.118,.135,.13),y=p(g,m,.285,.34,.115,.076)+p(g,m,.69,.35,.11,.078),E=(1-h(Math.abs(g-(.82-.93*m)),.024,.075))*p(g,m,.47,.475,.35,.2),C=e==="blue"?p(g,m,.5,.452,.29,.145):0,R=t?p(g,m,.836,.754,.156,.29):0,A=t?Math.hypot((g-.842)/.139,(m-.666)/.086):2,L=(1-h(A,.6,.78))*v,O=h(A,.58,.78)*(1-h(A,.89,1.07)),I=n*(.14*M+.071*_+.075*b+.09*S+.069*y+.054*E+.13*C+.21*R+.092*O-.18*L),G=v?1:-.45,q=m*o*l+.025,V=.09-m*o*c,re=(s.getY(x)-q)*c+(s.getZ(x)-V)*l+I*G,X=s.getX(x)+(g-a)*n*(.079*_+.033*M)+(g-.5)*n*(.04*S+.065*b);s.setXYZ(x,X,q+re*f,V+re*d)}i.computeVertexNormals()}function Gf(i,e,t,n,s){let r=i==="captain",a=i!=="red",o=r?Mh("captain",e,1.16,1.73):Mh("infantry",e,a?.49:.54,.88);M2(o,i),o.setAttribute("stepPose",n);let l=new Bt({side:di,alphaToCoverage:!0,defines:r?{CAPTAIN:1}:{},uniforms:{recoil:{value:0},lean:{value:0},portrait:{value:e},reverse:{value:t},facing:{value:a?-1:1}},vertexShader:`
      #ifdef CAPTAIN
        uniform float recoil, lean;
      #endif
      attribute vec4 stepPose;
      attribute float surface;
      uniform float facing;
      varying vec2 tex;
      varying float cap, flash;
      varying vec3 normalView;
      void main() {
        tex = uv; cap = surface; flash = stepPose.x;
        float lateral = uv.x - 0.5;
        // \u9510\u5316\u5DE6\u53F3\u817F\u5206\u754C\u5E76\u4FDD\u6301\u5FAE\u5916\u5C55\u7AD9\u8DDD\uFF0C\u6D88\u9664\u884C\u8D70\u65F6\u53CC\u811A\u50CF\u7C98\u8FDE\u5728\u4E00\u8D77\u7684\u89C2\u611F
        float isRight = smoothstep(-0.014, 0.014, lateral);
        float stride = mix(stepPose.z, stepPose.y, isRight);
        float lift = max(0., (isRight * 2. - 1.) * stepPose.w);
        float leg = 1. - smoothstep(0.16, 0.42, uv.y);
        float arm = smoothstep(0.14, 0.33, abs(lateral))
                  * smoothstep(0.27, 0.41, uv.y) * (1.-smoothstep(0.47, 0.64, uv.y));
        vec3 p = position;
        float heel = leg * (1. - smoothstep(.085,.20,uv.y));
        float chest = smoothstep(.28,.48,uv.y) * (1.-smoothstep(.58,.72,uv.y));
        p.x += (isRight - .5) * (.046 * leg + .026 * lift * heel) + .016 * stepPose.y * chest;
        p.z += .042 * facing * stepPose.y * lateral * chest;
        p.y += heel * max(.0, -stride) * .022;
        p.z += facing * stride * (${Ra} * leg - 0.105 * arm);
        p.y += 0.112 * lift * leg + 0.018 * abs(stepPose.w) * (1. - leg) + stride * arm * 0.038;
        p.x += 0.012 * stepPose.y * chest + arm * stride * 0.016;
        #ifdef CAPTAIN
          float shoulder = smoothstep(.53, .73, tex.x) * smoothstep(.41, .61, tex.y);
          p.x += .079 + lean * tex.y * .14 + shoulder * recoil * .026;
          p.z += facing * stride * (.078 * leg - .032 * arm) + shoulder * recoil * .21;
          p.y -= shoulder * recoil * .082;
        #endif
        normalView = normalize(normalMatrix * mat3(instanceMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.);
      }`,fragmentShader:`
      ${wh}
      uniform sampler2D portrait, reverse;
      uniform float facing;
      varying vec2 tex;
      varying float cap, flash;
      varying vec3 normalView;
      void main() {
        vec4 paint = texture2D(portrait, tex);
        float coverage = smoothstep(0.23, 0.70, paint.a);
        if (coverage < 0.11) discard;
        vec3 color = paint.rgb;
        float back = (1. - cap) * smoothstep(.1, .67, -normalize(normalView).z);
        if (back > 0.) {
          vec4 opposite = texture2D(reverse, vec2(1. - tex.x, tex.y));
          float value = dot(opposite.rgb, vec3(.25, .58, .17));
          float helmet = smoothstep(.63, .72, tex.y);
          float coat = smoothstep(.29, .38, tex.y) * (1. - smoothstep(.54, .65, tex.y));
          vec3 dye = facing > 0. ? vec3(.64,.054,.036) : vec3(.037,.25,.68);
          vec3 clothDye = facing > 0. ? dye : vec3(.59,.32,.13);
          float trousers = (1. - smoothstep(.29, .38, tex.y)) * smoothstep(.13, .23, tex.y);
          vec3 kit = mix(opposite.rgb, clothDye * (.26 + value * 2.1), coat * .8);
          kit = mix(kit, (facing > 0. ? vec3(.095,.073,.069) : dye) * (.24 + value * 2.1), trousers);
          kit = mix(kit, dye * (.26 + value * 2.1), helmet);
          color = mix(color, kit, back * opposite.a);
        }
        color = paintHelmet(color, tex.y, facing > 0.);
        float light = .87 + .17 * max(0., dot(normalize(normalView), normalize(vec3(-.52,.76,.56))));
        color *= light;
        if (flash <= -1.) {
          vec3 faded = mix(color, vec3(dot(color, vec3(.30,.59,.11))), .36) * .74;
          color = mix(faded, vec3(1.,.85,.64), clamp(-flash-1.,0.,1.)*.67);
        }
        color = mix(color, vec3(1.,.70,.16), clamp(flash,0.,1.)*.86);
        gl_FragColor = vec4(color, coverage);
        #include <colorspace_fragment>
      }`}),c=new Ft(o,l,s);return c.name=r?"\u84DD\u961F\u91CD\u70AE\u961F\u957F":a?"\u84DD\u961F\u91CE\u6218\u5236\u670D":"\u7EA2\u961F\u91CE\u6218\u5236\u670D",c.count=0,c.frustumCulled=!1,c}function Jm(i,e){let t=new Float32Array(3),n=new Jt(new Float32Array(4),4).setUsage(Gt),s=Gf("captain",i,e,n,1);return s.setMatrixAt(0,new Ke),s.count=1,{mesh:s,pose(r,a,o,l,c){Hs(r*9.03,a,t),n.setXYZW(0,Math.min(.66,c*.55),t[0],t[1],t[2]),n.needsUpdate=!0,s.material.uniforms.lean.value=l,s.material.uniforms.recoil.value=o}}}var b2=Math.PI*2,dt=[0,0,0],Gs={blue:1085152,blueShade:479381,ice:7985151,navy:1453392,skin:15840638,skinShade:13208928,khaki:13675111,tan:11960903,leather:5518632,dark:2434352,gun:2504008,steel:8492968,red:15150389,wine:9377830,orange:16756781,gold:15775821};function S2(i,e=16,t=1,n=null){let s=[],r=[],a=n?e+1:e,o=n?n[0]:0,l=n?n[1]-n[0]:b2;for(let[u,f,d,h=0,p=0]of i)for(let x=0;x<a;x++){let g=o+l*x/e,m=Math.sin(g),v=Math.cos(g);s.push(h+f*Math.sign(m)*Math.abs(m)**t,u,p+d*Math.sign(v)*Math.abs(v)**t)}for(let u=0;u<i.length-1;u++)for(let f=0;f<e;f++){let d=n?f+1:(f+1)%a,h=u*a+f,p=u*a+d;r.push(h,p,h+a,p,p+a,h+a)}if(!n)for(let u of[!1,!0]){let f=u?i.length-1:0,[d,,,h=0,p=0]=i[f],x=s.length/3;s.push(h,d,p);let g=f*a;for(let m=0;m<e;m++){let v=g+m,M=g+(m+1)%e;u?r.push(x,v,M):r.push(x,M,v)}}let c=new St;return c.setAttribute("position",new $e(s,3)),c.setIndex(r),c.computeVertexNormals(),c}function E2(i=12,e=8){return new Xn(1,i,e)}function Rt(i,e,t,n=t,s=8){let r=new D(...i),a=new D(...e),o=a.clone().sub(r),l=new an(n,t,o.length(),s);l.applyQuaternion(new rn().setFromUnitVectors(new D(0,1,0),o.normalize()));let c=r.add(a).multiplyScalar(.5);return l.translate(c.x,c.y,c.z)}function Zo(i,e,t=6){let n=new cs(i.map(s=>new D(...s)));return new yr(n,(i.length-1)*3,e,t,!1)}function w2(){let i=new Yt({vertexColors:!0,shininess:18,specular:3156007});return i.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <begin_vertex>",`#include <begin_vertex>
fabricPoint=position;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec2 stitch=vec2(fabricPoint.x+.42*fabricPoint.z,fabricPoint.y)*175.;
        vec2 weight=1.-smoothstep(vec2(.75),vec2(2.7),fwidth(stitch));
        float thread=dot(sin(stitch*3.14159),weight)*.024;
        diffuseColor.rgb*=1.+thread;`)},{cloth:i,lacquer:new Yt({vertexColors:!0,shininess:58,specular:7175302}),metal:new Yt({vertexColors:!0,shininess:78,specular:10201786})}}var gi=class{constructor(){this.byFinish=new Map}add(e,t,n=dt,s=[1,1,1],r=dt,a="cloth"){let o=new Ke().compose(new D(...n),new rn().setFromEuler(new qt(...r)),new D(...s));e.applyMatrix4(o),e.deleteAttribute("uv"),e.clearGroups();let l=e.attributes.position.count;e.index===null&&e.setIndex(Array.from({length:l},(f,d)=>d));let c=new be(t),u=new Float32Array(l*3);for(let f=0;f<l;f++){let d=f*3;u[d]=c.r,u[d+1]=c.g,u[d+2]=c.b}e.setAttribute("color",new zt(u,3)),this.limb!==void 0&&e.setAttribute("limb",new $e(new Float32Array(l).fill(this.limb),1)),this.byFinish.has(a)||this.byFinish.set(a,[]),this.byFinish.get(a).push(e)}shape(e,t,n={}){let{sides:s=16,power:r=1,arc:a=null,at:o,scale:l,rotate:c,finish:u}=n;this.add(S2(e,s,r,a),t,o,l,c,u)}ell(e,t,n,s=dt,r="cloth",a=14,o=8){this.add(E2(a,o),e,t,n,s,r)}box(e,t,n,s=dt,r="cloth"){this.add(new kn(1,1,1),e,t,n,s,r)}joinGeometry(){let e=Xo([...this.byFinish.values()].flat(),!1);return e.computeBoundingSphere(),e.computeBoundingBox(),e}attach(e,t){for(let[n,s]of this.byFinish){let r=new Qe(Xo(s,!1),t[n]);r.castShadow=!0,e.add(r)}}};function Vs(i,e=0,t=0,n=0){let s=new Nt;return s.position.set(e,t,n),i.add(s),s}function Qm(i,e="near"){let t=i==="red",n=e==="far",s=new gi,r=t?15873338:1351656,a=t?11542827:1399980,o=t?10829881:12949854,l=n?6:16,c=n?5:12;for(let f of[-1,1]){s.limb=f;let d=f*.118;s.shape([[.01,.05,.102,d,-.028],[.05,.058,.108,d,-.03],[.12,.046,.064,d]],3484976,{sides:n?4:6,power:.72}),n||(s.shape([[.009,.052,.104,d,-.028],[.028,.06,.11,d,-.032],[.046,.059,.108,d,-.032]],2370101,{sides:8,power:.74}),s.ell(t?6181198:3763096,[d,.19,-.05],[.048,.056,.028],dt,"cloth",8,4)),s.shape([[.075,.048,.054,d],[.22,.06,.068,d*.92],[.3,.065,.072,d*.86]],t?6701875:2906496,{sides:n?4:6})}s.limb=0,s.shape([[.235,.117,.081],[.3,.151,.114],[.42,.153,.101],[.485,.118,.084]],o,{sides:n?5:8,power:.89}),n||(s.shape([[.274,.137,.11],[.307,.151,.117]],6899252,{sides:8}),s.box(10712389,[0,.365,.097],[.093,.118,.045],[.03,0,.08]));for(let f of[-1,1]){s.limb=f*2;let d=f*.166;s.shape([[.26,.037,.044,d*1.12,-.031],[.298,.055,.06,d*1.07,-.03],[.386,.052,.057,d,.007],[.444,.05,.058,d*.91]],15772528,{sides:n?4:6}),n||(s.ell(o,[d*.88,.427,.008],[.083,.078,.092],dt,"cloth",8,4),s.ell(t?7880249:3494521,[d*.91,.456,.006],[.091,.048,.096],dt,"metal",8,4),s.ell(t?12928064:3436462,[d*.91,.47,.008],[.084,.046,.089],dt,"lacquer",8,4))}if(s.limb=0,s.shape([[.43,.072,.073,0,-.012],[.462,.127,.1,0,-.016],[.548,.161,.14],[.635,.162,.149]],16761484,{sides:c,power:.82}),n||(s.ell(14129257,[-.151,.546,.005],[.033,.046,.041],dt,"cloth",5,3),s.ell(14129257,[.151,.546,.005],[.033,.046,.041],dt,"cloth",5,3)),s.shape([[.548,.177,.162,0,.009],[.585,.221,.198],[.613,.215,.195]],a,{sides:l}),s.shape([[.595,.224,.2],[.644,.229,.211],[.744,.204,.19],[.818,.132,.124],[.847,.054,.052]],r,{sides:l}),!n){if(s.shape([[.589,.221,.201],[.605,.226,.205]],t?16145742:7194613,{sides:10}),s.limb=0,t){for(let f of[.66,.698])s.box(16768401,[0,f,-.203],[.09,.019,.017],[-.23,0,0]);s.add(Rt([-.093,.449,-.096],[.107,.291,-.111],.017,.018,5),5847082),s.box(14923627,[.027,.356,-.127],[.041,.031,.014],[0,0,-.57]);for(let f of[-1,1])s.box(7422515,[f*.093,.302,-.098],[.067,.065,.04],[0,-f*.23,0]),s.box(12621402,[f*.093,.318,-.121],[.055,.018,.012]),s.box(14198113,[f*.11,.448,-.031],[.054,.019,.097],[0,0,-f*.28])}else{s.box(3690845,[0,.351,.116],[.194,.177,.086]),s.box(5010046,[0,.356,.163],[.159,.118,.02]),s.add(Rt([-.109,.447,.13],[.109,.447,.13],.039,.039,8),14334075);for(let f of[-1,1])s.box(7031092,[f*.053,.372,.179],[.023,.171,.018]),s.box(14727549,[f*.053,.335,.189],[.036,.025,.014]);s.add(Zo([[0,.65,.205],[0,.739,.189],[0,.808,.127],[0,.845,.05],[0,.852,-.027]],.014,6),9558778)}t||(s.limb=2,s.add(Rt([.163,.264,.032],[.173,.525,-.19],.026,.026,5),Gs.gun),s.add(Rt([.173,.51,-.18],[.173,.656,-.268],.013,.013,5),2966610))}if(t){s.ell(a,[0,.583,-.12],[.18,.019,.133],[-.14,0,0],"cloth",8,3),s.ell(15706736,[0,.514,-.139],[.042,.042,.061],dt,"cloth",5,3),n&&s.box(16762755,[0,.68,-.196],[.09,.027,.013],[-.28,0,0]);for(let f of[-1,1])s.ell(4336940,[f*.061,.536,-.14],[.026,.022,.015],[0,-f*.28,-f*.12],"cloth",5,3)}let u=s.joinGeometry();return u.scale(1.055,1.016,1),t&&u.rotateY(Math.PI),u.computeBoundingBox(),u}function eg(i){let e=new gi;if(i==="guard"){e.box(5399670,[.12,.32,.155],[.25,.34,.065],[-.12,0,-.045]),e.box(11978175,[.12,.36,.194],[.2,.038,.014]),e.shape([[.088,.055,.029,.114,.16],[.188,.12,.034,.119,.167],[.27,.124,.033,.12,.167]],4675694,{sides:8,power:.65});for(let t of[-1,1])e.add(Rt([.12+t*.121,.2,.183],[.12+t*.12,.477,.145],.012,.013,6),11842726),e.ell(14991228,[.12+t*.096,.426,.185],[.016,.016,.008],dt,"metal",6,4)}else if(i==="gunner")e.add(Rt([.14,.33,.07],[.13,.37,.39],.04,.03,6),3490385),e.add(Rt([.13,.37,.38],[.13,.38,.47],.038,.038,8),8159365),e.box(5003622,[.14,.345,.203],[.095,.105,.19],[0,.03,0]),e.box(12752981,[.14,.411,.203],[.08,.033,.15]),e.add(Rt([.13,.378,.464],[.13,.379,.478],.025,.023,8),2369586);else if(i==="standard")e.add(Rt([-.18,.19,-.05],[-.18,1.09,-.05],.025,.02,6),7626823),e.box(15382366,[-.18,1.08,-.04],[.078,.06,.078]),e.box(10890041,[-.01,.93,-.05],[.33,.22,.043],[-.08,0,-.09]),e.box(16767874,[-.035,.92,-.02],[.18,.043,.02]),e.box(7218740,[.166,.916,-.054],[.064,.186,.034],[.05,-.36,-.11]),e.add(Rt([-.178,1.1,-.051],[-.178,1.18,-.051],.034,.006,8),15843698);else if(i==="courier"){e.box(13744003,[.18,.34,.1],[.26,.22,.14],[0,0,-.16]),e.box(16773587,[.18,.34,.177],[.17,.145,.018]),e.box(12011077,[.18,.34,.196],[.035,.12,.01]),e.box(12011077,[.18,.34,.196],[.12,.035,.01]);for(let t of[.07,.285])e.box(7165760,[t,.342,.163],[.024,.19,.032]),e.box(15847304,[t,.385,.179],[.038,.032,.018]);e.add(Rt([.109,.464,.101],[.232,.464,.101],.022,.022,8),5851958)}else if(i==="vault")e.add(Rt([.22,.07,.46],[.16,1.19,-.53],.027,.017,8),16764021),e.add(Rt([.2,.32,.24],[.195,.47,.11],.033,.033,8),4411998),e.add(Rt([.164,1.1,-.45],[.159,1.175,-.517],.023,.029,8),5929882),e.ell(13856567,[.159,1.19,-.53],[.034,.039,.035],dt,"lacquer",8,4);else{e.box(6636858,[0,.38,.12],[.23,.15,.082]);for(let t of[-.068,0,.068])e.add(Rt([t,.32,.163],[t,.45,.17],.029,.029,8),14633778),e.add(Rt([t,.43,.17],[t,.457,.171],.032,.027,8),13611132);e.box(4870755,[0,.374,.199],[.224,.031,.019]),e.box(15253895,[.034,.374,.21],[.041,.028,.012])}return e.joinGeometry()}function tg(i){let e=new gi;if(i==="shield")e.box(2056872,[0,.42,-.34],[.56,.62,.07],[.12,0,0],"metal"),e.box(8120575,[0,.44,-.382],[.4,.44,.025],[.12,0,0],"lacquer"),e.box(16765516,[0,.72,-.31],[.6,.065,.085],[.12,0,0],"metal"),e.box(16765516,[0,.14,-.37],[.52,.06,.08],[.12,0,0],"metal"),e.box(2647976,[0,.43,.165],[.3,.28,.09],dt,"metal"),e.box(8974591,[0,.45,.22],[.16,.14,.03],dt,"lacquer");else if(i==="flame"){for(let t of[-1,1])e.add(Rt([t*.095,.25,.175],[t*.095,.63,.175],.072,.072,10),15747108),e.add(Rt([t*.095,.61,.175],[t*.095,.69,.175],.045,.045,8),16764744),e.box(2831168,[t*.095,.44,.175],[.155,.042,.155],dt,"metal");e.add(Rt([.23,.36,.06],[.23,.44,-.46],.048,.042,8),3488840),e.add(Rt([.23,.44,-.45],[.23,.45,-.58],.062,.038,8),16747044)}else if(i==="tesla"){e.box(2507873,[0,.42,.16],[.26,.34,.11],dt,"metal"),e.add(Rt([0,.46,.2],[0,.94,.2],.044,.034,8),3828364);for(let t of[.62,.72,.82])e.add(Rt([0,t,.2],[0,t+.035,.2],.105,.105,10),16761677);e.ell(8060927,[0,.97,.2],[.1,.1,.1],dt,"lacquer",10,6),e.add(Rt([.22,.36,.02],[.22,.44,-.48],.038,.032,8),3463423)}else if(i==="assault"){for(let t of[-1,1])e.ell(16763709,[t*.21,.51,0],[.125,.095,.135],dt,"metal",10,6),e.add(Rt([t*.24,.37,.08],[t*.24,.4,-.52],.046,.04,8),2702159),e.add(Rt([t*.24,.4,-.5],[t*.24,.4,-.62],.052,.048,8),6479103);e.box(2379384,[0,.43,.18],[.3,.3,.14],dt,"metal"),e.box(16765516,[0,.52,.26],[.22,.06,.035],dt,"metal")}else if(i==="pyro"){e.add(Rt([.24,.64,.24],[.24,.68,-.54],.105,.108,12),14170914),e.add(Rt([.24,.68,-.52],[.24,.69,-.63],.125,.115,12),16763709),e.add(Rt([.24,.64,.22],[.24,.63,.31],.122,.11,12),3356741);for(let t of[-1,1])e.ell(16739110,[t*.21,.51,0],[.13,.1,.14],dt,"lacquer",10,6);e.box(4531236,[-.04,.45,.19],[.28,.34,.15],dt,"metal"),e.ell(16756275,[-.04,.66,.19],[.095,.095,.095],dt,"lacquer",8,6)}else{for(let t of[-1,1])e.add(Rt([t*.22,.48,.12],[t*.25,.96,.14],.052,.04,8),2513016),e.ell(8060927,[t*.25,.99,.14],[.095,.095,.095],dt,"lacquer",10,6),e.ell(3855103,[t*.2,.5,0],[.12,.095,.13],dt,"metal",10,6);e.add(Rt([.24,.4,.06],[.24,.45,-.64],.052,.042,8),2506585),e.add(Rt([.24,.45,-.35],[.24,.45,-.62],.068,.058,8),7272191)}return e.joinGeometry()}function jm(i,e,t){let n=Vs(i,e*.134,.607,0),s=new gi;return s.shape([[-.385,.063,.064,e*.013,.016],[-.29,.086,.082,e*.012,.012],[-.165,.103,.103,e*.007,-.005],[-.032,.111,.114],[.036,.079,.086]],3629962,{sides:12}),s.shape([[-.59,.078,.142,e*.013,-.045],[-.553,.091,.153,e*.012,-.044],[-.493,.092,.141,e*.012,-.036],[-.448,.079,.082,e*.012,.012],[-.299,.08,.077,e*.012,.018]],5586993,{sides:12,power:.74}),s.shape([[-.606,.081,.143,e*.013,-.045],[-.586,.092,.151,e*.013,-.046],[-.565,.092,.151,e*.013,-.045]],3485490,{sides:12,power:.7}),s.shape([[-.327,.081,.079,e*.012,.015],[-.291,.086,.084,e*.012,.014]],9134660,{sides:12}),s.attach(n,t),n}function ng(i="captain"){let e=i==="titan",t=new Nt,n=w2(),s=Vs(t),r=jm(s,-1,n),a=jm(s,1,n),o=Vs(s,0,.62),l=new gi;l.shape([[-.075,.183,.122],[.005,.217,.15],[.102,.221,.156],[.264,.274,.19],[.367,.285,.177],[.416,.191,.131]],Gs.khaki,{power:.8}),l.shape([[-.046,.216,.146],[-.008,.226,.155],[.045,.227,.158]],Gs.leather,{sides:16,power:.8}),l.shape([[.358,.185,.128],[.392,.187,.136],[.431,.165,.12]],15977614,{sides:14}),l.shape([[.375,.102,.106],[.502,.106,.099]],Gs.skinShade);let c=[];for(let M of[-1,1]){let _=M*.158;l.add(Zo([[_*.8,.005,.155],[_*.85,.135,.179],[_,.29,.168],[_,.37,.126],[_*.85,.405,.014],[_*.81,.36,-.111]],.027),7950390),l.box(12164198,[_*.89,.22,.192],[.064,.035,.015],[0,0,M*.065],"metal");let b=Vs(o,_*1.47,.34,0),S=Vs(b,-_*1.47,-.34,0);c.push(b);let y=new gi;y.shape([[.144,.078,.084,_*1.62,.042],[.207,.102,.109,_*1.66,.022],[.307,.107,.112,_*1.6],[.342,.07,.073,_*1.47]],13210966,{sides:12}),y.add(Rt([_*1.74,.18,.038],[_*1.88,.074,-.092],.066,.059,10),Gs.skin),y.ell(9069123,[_*1.88,.078,-.105],[.07,.068,.076],[.22,0,0]),y.attach(S,n)}for(let M of[-1,1])l.box(13015648,[M*.124,.22,-.157],[.126,.101,.03],[.08,M*.16,0]),l.box(15122300,[M*.124,.249,-.174],[.13,.037,.016],[.1,M*.16,0]);l.box(13280874,[0,-.011,-.153],[.1,.061,.021],dt,"metal"),l.box(9987129,[0,.077,.144],[.17,.112,.074],[.08,0,0]),l.box(12289103,[0,.101,.184],[.172,.062,.02],[.12,0,0]),l.add(Zo([[-.165,.034,.158],[-.002,.169,.207],[.153,.292,.17]],.033),9463616),l.attach(o,n);let u=Vs(o,-.027,.461,-.015),f=new gi;f.shape([[0,.093,.078],[.024,.142,.126,0,-.012],[.078,.189,.162,0,-.016],[.204,.211,.181,0,-.004],[.278,.203,.176],[.327,.142,.137]],Gs.skin,{sides:18,power:.83});for(let M of[-1,1])f.ell(14788213,[M*.201,.145,.001],[.037,.072,.053]),f.add(Zo([[M*.199,.245,.062],[M*.192,.112,.045],[M*.148,.014,-.001],[M*.068,-.005,-.052]],.019),7885632);f.shape([[.192,.18,.168,0,.009],[.219,.223,.202],[.264,.224,.202]],7229755,{sides:20,arc:[-.69*Math.PI,.69*Math.PI]}),f.ell(13996641,[0,.132,-.167],[.052,.049,.05]);for(let M of[-1,1])f.ell(5519405,[M*.08,.168,-.155],[.042,.013,.016],[0,-M*.31,-M*.09]),f.ell(3882042,[M*.076,.15,-.164],[.018,.021,.014],[0,-M*.28,0],"lacquer",9,5);f.add(Zo([[-.054,.079,-.157],[0,.07,-.169],[.053,.078,-.155]],.009),11892307),f.shape([[.207,.224,.212,0,.015],[.243,.273,.242,0,.011],[.279,.285,.253],[.302,.279,.248]],Gs.blueShade,{sides:24,finish:"lacquer"}),f.shape([[.255,.275,.251],[.272,.286,.258],[.288,.282,.253]],6867711,{sides:24,finish:"lacquer"}),f.shape([[.281,.278,.25],[.331,.288,.257],[.413,.275,.249],[.498,.23,.222],[.574,.144,.155],[.609,.055,.068],[.614,.014,.022]],Gs.blue,{sides:28,finish:"lacquer"}),f.shape([[.296,.281,.252],[.312,.289,.259],[.325,.292,.261]],12114656,{sides:30,finish:"metal"});for(let M of[-1,1])f.ell(14793848,[M*.255,.325,.114],[.013,.016,.014],dt,"metal",8,5);f.attach(u,n);let d=Vs(o,.295,.691,-.03),h=new gi;function p(M,_,b,S,y,E="metal",C=18){h.add(Rt([0,0,S],[0,0,y],_,b,C),M,dt,[1,1,1],dt,E)}p(2505549,.106,.11,-.48,.367),p(3558238,.13,.12,-.5,-.375),p(6928350,.142,.142,-.495,-.471),p(2110276,.142,.142,-.549,-.498),p(7442078,.147,.147,-.558,-.541),p(1252139,.105,.105,-.561,-.56),p(2635849,.144,.134,-.275,-.12),p(5540523,.141,.135,-.254,-.205),p(3305115,.125,.129,-.044,.161);for(let M of[-.292,-.119,.148,.203,.249,.294])p(M<.15?8559533:6058374,.139,.139,M,M+.021);if(p(2504006,.146,.137,.178,.346),p(10005948,.154,.153,.322,.36),p(2503748,.127,.123,.359,.373),p(1319473,.087,.086,.374,.375),h.box(3756390,[0,.095,-.1],[.093,.09,.202],dt,"metal"),h.box(7785452,[0,.147,-.12],[.103,.023,.105],dt,"metal"),h.box(3229274,[.098,.066,.061],[.052,.047,.189],dt,"metal"),h.ell(8701671,[.123,.065,.02],[.012,.022,.036],dt,"lacquer"),e){let M=new gi;M.box(16765503,[0,.56,.02],[.34,.1,.24],dt,"metal"),M.ell(16773258,[0,.66,.02],[.11,.11,.11],dt,"lacquer",10,6),M.attach(u,n);let _=new gi;for(let b of[-1,1])_.ell(16763192,[b*.34,.36,0],[.155,.13,.17],dt,"metal",10,6),_.box(2784468,[b*.44,.48,.26],[.44,.16,.06],[.2,-b*.45,b*.36],"lacquer"),_.box(7992063,[b*.52,.54,.3],[.32,.075,.03],[.2,-b*.45,b*.36],"lacquer");_.add(Rt([-.3,.69,-.52],[-.3,.69,.34],.11,.115,14),16760120,dt,[1,1,1],dt,"metal"),_.add(Rt([-.3,.69,-.56],[-.3,.69,-.48],.135,.135,14),7992063,dt,[1,1,1],dt,"lacquer"),_.attach(o,n)}h.attach(d,n);let x=Vs(d,0,0,-.57),g;function m(M,_){e||(g=Jm(M,_),s.visible=!1,t.add(g.mesh))}function v({time:M=0,run:_=0,recoil:b=0,merge:S=0,lean:y=0}={}){g&&g.pose(M,_,b,y,S);let E=M*10.9;r.rotation.x=Math.sin(E)*.53*_,a.rotation.x=-Math.sin(E)*.53*_;let C=Math.sin(E)*_;c[0].rotation.x=-C*.46,c[1].rotation.x=C*.15+b*.12,o.rotation.y=C*.055,s.position.y=(1-Math.cos(E*2))*.019*_,o.rotation.z=-y*.13+Math.sin(E)*.021*_,o.rotation.x=-.058*_+b*.085,u.rotation.z=y*.026,d.position.z=-.03+b*.155,d.rotation.x=b*.14,n.cloth.emissive.setRGB(S*.43,S*.21,S*.05),n.lacquer.emissive.setRGB(S*.37,S*.31,S*.11),n.metal.emissive.setRGB(S*.29,S*.22,S*.07)}return{root:t,animate:v,muzzle:x,paint:m}}function ig(i){let e=new Map,t=new Map,n=i.clone();return sg(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function sg(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)sg(i.children[n],e.children[n],t)}var Th=class extends zi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Kf(t)}),this.register(function(t){return new $f(t)}),this.register(function(t){return new Jf(t)}),this.register(function(t){return new ad(t)}),this.register(function(t){return new od(t)}),this.register(function(t){return new ld(t)}),this.register(function(t){return new Qf(t)}),this.register(function(t){return new ed(t)}),this.register(function(t){return new td(t)}),this.register(function(t){return new nd(t)}),this.register(function(t){return new Zf(t)}),this.register(function(t){return new id(t)}),this.register(function(t){return new jf(t)}),this.register(function(t){return new rd(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new qf(t)}),this.register(function(t){return new Ah(t,yt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ah(t,yt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new cd(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=gs.extractUrlBase(e);a=gs.resolveURL(c,this.path)}else a=gs.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new xa(this.manager);l.setPriority(this.priority),l.setCache(this.cache),l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===cg){try{a[yt.KHR_BINARY_GLTF]=new hd(e)}catch(f){s&&s(f);return}r=JSON.parse(a[yt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new xd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let f=this.pluginCallbacks[u](c);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,a[f.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let f=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(f){case yt.KHR_MATERIALS_UNLIT:a[f]=new Yf;break;case yt.KHR_DRACO_MESH_COMPRESSION:a[f]=new ud(r,this.dracoLoader);break;case yt.KHR_TEXTURE_TRANSFORM:a[f]=new fd;break;case yt.KHR_MESH_QUANTIZATION:a[f]=new dd;break;default:d.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function T2(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function en(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var yt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},qf=class{constructor(e){this.parser=e,this.name=yt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new be(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Fn);let f=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Fs(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Mr(u),c.distance=f;break;case"spot":c=new Ro(u),c.distance=f,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Wi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Yf=class{constructor(){this.name=yt.KHR_MATERIALS_UNLIT}getMaterialType(){return gt}extendParams(e,t,n){let s=[];e.color=new be(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Fn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(s)}},Zf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Kf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ye(r,r)}return Promise.all(s)}},$f=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(s)}},Jf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},jf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Qf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SHEEN}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new be(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Fn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,At)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},ed=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},td=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_VOLUME}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new be().setRGB(r[0],r[1],r[2],Fn),Promise.all(s)}},nd=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IOR}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},id=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new be().setRGB(r[0],r[1],r[2],Fn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,At)),Promise.all(s)}},sd=class{constructor(e){this.parser=e,this.name=yt.EXT_MATERIALS_BUMP}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},rd=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return en(this.parser,e,this.name)!==null?zn:null}extendMaterialParams(e,t){let n=en(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},ad=class{constructor(e){this.parser=e,this.name=yt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},od=class{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},ld=class{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},Ah=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,f=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,f,d,s.mode,s.filter).then(function(h){return h.buffer}):a.ready.then(function(){let h=new ArrayBuffer(u*f);return a.decodeGltfBuffer(new Uint8Array(h),u,f,d,s.mode,s.filter),h})})}else return null}},cd=class{constructor(e){this.name=yt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==xi.TRIANGLES&&c.mode!==xi.TRIANGLE_STRIP&&c.mode!==xi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),f=u.isGroup?u.children:[u],d=c[0].count,h=[];for(let p of f){let x=new Ke,g=new D,m=new rn,v=new D(1,1,1),M=new Ft(p.geometry,p.material,d);for(let b=0;b<d;b++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,b),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,b),l.SCALE&&v.fromBufferAttribute(l.SCALE,b),M.setMatrixAt(b,x.compose(g,m,v));let _=null;for(let b in l)if(b==="_COLOR_0"){let S=l[b];M.instanceColor=new Jt(S.array,S.itemSize,S.normalized)}else if(b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"){if(_===null){let y=M.geometry;_=new St,_.name=y.name;for(let E in y.attributes)_.setAttribute(E,y.attributes[E]);for(let E in y.morphAttributes)_.morphAttributes[E]=y.morphAttributes[E];y.index!==null&&_.setIndex(y.index),_.morphTargetsRelative=y.morphTargetsRelative;for(let E of y.groups)_.addGroup(E.start,E.count,E.materialIndex);y.boundingBox!==null&&(_.boundingBox=y.boundingBox.clone()),y.boundingSphere!==null&&(_.boundingSphere=y.boundingSphere.clone()),_.drawRange.start=y.drawRange.start,_.drawRange.count=y.drawRange.count,_.userData=Object.assign({},y.userData),M.geometry=_}let S=l[b];_.setAttribute(b,new Jt(S.array,S.itemSize,S.normalized))}Lt.prototype.copy.call(M,p),this.parser.assignFinalMaterial(M),h.push(M)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}},cg="glTF",Ko=12,rg={JSON:1313821514,BIN:5130562},hd=class{constructor(e){this.name=yt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ko),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==cg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Ko,r=new DataView(e,Ko),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===rg.JSON){let c=new Uint8Array(e,Ko+a,o);this.content=n.decode(c)}else if(l===rg.BIN){let c=Ko+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ud=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=yt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let f=md[u]||u.toLowerCase();o[f]=a[u]}for(let u in e.attributes){let f=md[u]||u.toLowerCase();if(a[u]!==void 0){let d=n.accessors[e.attributes[u]],h=Pa[d.componentType];c[f]=h.name,l[f]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(f,d){s.decodeDracoFile(u,function(h){for(let p in h.attributes){let x=h.attributes[p],g=l[p];g!==void 0&&(x.normalized=g)}f(h)},o,c,Fn,d)})})}},fd=class{constructor(){this.name=yt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},dd=class{constructor(){this.name=yt.KHR_MESH_QUANTIZATION}},Rh=class extends ki{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,f=(n-t)/u,d=f*f,h=d*f,p=e*c,x=p-c,g=-2*h+3*d,m=h-d,v=1-g,M=m-d+f;for(let _=0;_!==o;_++){let b=a[x+_+o],S=a[x+_+l]*u,y=a[p+_+o],E=a[p+_]*u;r[_]=v*b+M*S+g*y+m*E}return r}},A2=new rn,pd=class extends Rh{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return A2.fromArray(r).normalize().toArray(r),r}},xi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Pa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ag={9728:nn,9729:sn,9984:Pc,9985:ba,9986:Tr,9987:Zn},og={33071:hi,33648:na,10497:wi},Vf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},md={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ws={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},R2={CUBICSPLINE:void 0,LINEAR:lr,STEP:or},Wf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function C2(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new qn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:di})),i.DefaultMaterial}function Pr(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Wi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function P2(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let f=e[c];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let f=e[c];if(n){let d=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;a.push(d)}if(s){let d=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],f=c[1],d=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function I2(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function L2(i){let e,t=i.extensions&&i.extensions[yt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Xf(t.attributes):e=i.indices+":"+Xf(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Xf(i.targets[n]);return e}function Xf(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function gd(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function D2(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var N2=new Ke,xd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new T2,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?(this.textureLoader=new ms(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Co(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xa(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Pr(r,o,s),Wi(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())r(u,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[yt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(gs.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Vf[s.type],o=Pa[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new zt(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Vf[s.type],c=Pa[s.componentType],u=c.BYTES_PER_ELEMENT,f=u*l,d=s.byteOffset||0,h=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0,x,g;if(h&&h!==f){let m=Math.floor(d/h),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,M=t.cache.get(v);M||(x=new c(o,m*h,s.count*h/u),M=new ca(x,h/u),t.cache.add(v,M)),g=new ha(M,l,d%h/u,p)}else o===null?x=new c(s.count*l):x=new c(o,d,s.count*l),g=new zt(x,l,p);if(s.sparse!==void 0){let m=Vf.SCALAR,v=Pa[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,b=new v(a[1],M,s.sparse.count*m),S=new c(a[2],_,s.sparse.count*l);o!==null&&(g=new zt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let y=0,E=b.length;y<E;y++){let C=b[y];if(g.setX(C,S[y*l]),l>=2&&g.setY(C,S[y*l+1]),l>=3&&g.setZ(C,S[y*l+2]),l>=4&&g.setW(C,S[y*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return u.magFilter=ag[d.magFilter]||sn,u.minFilter=ag[d.minFilter]||Zn,u.wrapS=og[d.wrapS]||wi,u.wrapT=og[d.wrapT]||wi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==nn&&u.minFilter!==sn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1,u;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)u=n.getDependency("bufferView",a.bufferView).then(function(d){return new Promise(function(h,p){t.parse(d,h,p)})});else{if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(d){c=!0;let h=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(h),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");u=Promise.resolve(l).then(function(d){return new Promise(function(h,p){let x=h;t.isImageBitmapLoader===!0&&(x=function(g){let m=new pn(g);m.needsUpdate=!0,h(m)}),t.load(gs.resolveURL(d,r.path),x,void 0,p)})})}let f=u.then(function(d){return c===!0&&o.revokeObjectURL(l),Wi(d,a),d.userData.mimeType=a.mimeType||D2(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=f,f}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[yt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[yt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[yt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new fa,On.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ns,On.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return qn}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[yt.KHR_MATERIALS_UNLIT]){let f=s[yt.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),c.push(f.extendParams(o,r,t))}else{let f=r.pbrMetallicRoughness||{};if(o.color=new be(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){let d=f.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Fn),o.opacity=d[3]}f.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",f.baseColorTexture,At)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Zt);let u=r.alphaMode||Wf.OPAQUE;if(u===Wf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Wf.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==gt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ye(1,1),r.normalTexture.scale!==void 0)){let f=r.normalTexture.scale;o.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&a!==gt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==gt){let f=r.emissiveFactor;o.emissive=new be().setRGB(f[0],f[1],f[2],Fn)}return r.emissiveTexture!==void 0&&a!==gt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,At)),Promise.all(c).then(function(){let f=new a(o);return r.name&&(f.name=r.name),Wi(f,r),t.associations.set(f,{materials:e}),r.extensions&&Pr(s,f,r),f})}createUniqueName(e){let t=Wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[yt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return lg(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=L2(c),f=s[u];if(f)a.push(f.promise);else{let d;c.extensions&&c.extensions[yt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=lg(new St,c,t),c.mode===xi.TRIANGLE_STRIP?d=d.then(h=>kf(h,Bo)):c.mode===xi.TRIANGLE_FAN&&(d=d.then(h=>kf(h,Ea))),s[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?C2(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],f=[];for(let h=0,p=u.length;h<p;h++){let x=u[h],g=a[h],m,v=c[h];if(g.mode===xi.TRIANGLES||g.mode===xi.TRIANGLE_STRIP||g.mode===xi.TRIANGLE_FAN||g.mode===void 0){let M=r.isSkinnedMesh===!0,_=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");M&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=M&&_?new ur(x,v):new Qe(x,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===xi.LINES)m=new pr(x,v);else if(g.mode===xi.LINE_STRIP)m=new dr(x,v);else if(g.mode===xi.LINE_LOOP)m=new lo(x,v);else if(g.mode===xi.POINTS)m=new co(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&I2(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Wi(m,r),g.extensions&&Pr(s,m,g),t.assignFinalMaterial(m),f.push(m)}for(let h=0,p=f.length;h<p;h++)t.associations.set(f[h],{meshes:e,primitives:h});if(f.length===1)return r.extensions&&Pr(s,f[0],r),f[0];let d=new Nt;r.extensions&&Pr(s,d,r),t.associations.set(d,{meshes:e});for(let h=0,p=f.length;h<p;h++)d.add(f[h]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new dn(Ue.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new br(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Wi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let f=a[c];if(f){o.push(f);let d=new Ke;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new fr(o,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let f=0,d=s.channels.length;f<d;f++){let h=s.channels[f],p=s.samplers[h.sampler],x=h.target,g=x.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,v=s.parameters!==void 0?s.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",v)),c.push(p),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(f){let d=f[0],h=f[1],p=f[2],x=f[3],g=f[4],m=[];for(let M=0,_=d.length;M<_;M++){let b=d[M],S=h[M],y=p[M],E=x[M],C=g[M];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();let R=n._createAnimationTracks(b,S,y,E,C);if(R)for(let A=0;A<R.length;A++)m.push(R[A])}let v=new wo(r,void 0,m);return Wi(v,s),v})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let u=c[0],f=c[1],d=c[2];d!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(d,N2)});for(let h=0,p=f.length;h<p;h++)u.add(f[h]);if(u.userData.pivot!==void 0&&f.length>0){let h=u.userData.pivot,p=f[0];u.pivot=new D().fromArray(h),u.position.x-=h[0],u.position.y-=h[1],u.position.z-=h[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(r.isBone===!0?u=new Ls:c.length>1?u=new Nt:c.length===1?u=c[0]:u=new Lt,u!==c[0])for(let f=0,d=c.length;f<d;f++)u.add(c[f]);if(r.name&&(u.userData.name=r.name,u.name=a),Wi(u,r),r.extensions&&Pr(n,u,r),r.matrix!==void 0){let f=new Ke;f.fromArray(r.matrix),u.applyMatrix4(f)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let f=s.associations.get(u);s.associations.set(u,{...f})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Nt;n.name&&(r.name=s.createUniqueName(n.name)),Wi(r,n),n.extensions&&Pr(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,f=l.length;u<f;u++){let d=l[u];d.parent!==null?r.add(ig(d)):r.add(d)}let c=u=>{let f=new Map;for(let[d,h]of s.associations)(d instanceof On||d instanceof pn)&&f.set(d,h);return u.traverse(d=>{let h=s.associations.get(d);h!=null&&f.set(d,h)}),f};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];function c(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}Ws[r.path]===Ws.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let u;switch(Ws[r.path]){case Ws.weights:u=fs;break;case Ws.rotation:u=ds;break;case Ws.translation:case Ws.scale:u=Us;break;default:n.itemSize===1?u=fs:u=Us;break}let f=s.interpolation!==void 0?R2[s.interpolation]:lr,d=this._getArrayFromAccessor(n);for(let h=0,p=l.length;h<p;h++){let x=new u(l[h]+"."+Ws[r.path],t.array,d,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=gd(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof ds?pd:Rh;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function U2(i,e,t){let n=e.attributes,s=new si;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),o.normalized){let u=gd(Pa[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new D,l=new D;for(let c=0,u=r.length;c<u;c++){let f=r[c];if(f.POSITION!==void 0){let d=t.json.accessors[f.POSITION],h=d.min,p=d.max;if(h!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(p[2]))),d.normalized){let x=gd(Pa[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new Wn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function lg(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=md[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return vt.workingColorSpace!==Fn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${vt.workingColorSpace}" not supported.`),Wi(i,e),U2(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?P2(i,e.targets,t):i})}function hg(){let i=new Nt,e=km(),t=Zm(i,e),n=new Float32Array(3),s=null,r=null;function a(){return s||(s=new Th().loadAsync("./art/brawler.glb?v=ringmaster2").then(({scene:c})=>{i.add(c);let u=b=>c.getObjectByName(b),f=u("Pelvis"),d=u("Spine"),h=u("Head"),p=f.position.y,x=["L","R"].map(b=>Object.fromEntries(["Hip","Knee","Ankle","Arm","Elbow","Wrist"].map(S=>[S,u(S+b)]))),g=u("Brawler");g.frustumCulled=!1;let m=g.material;m.color.setScalar(.84),m.emissiveMap=m.map,m.emissive.setScalar(.24);let v=new ma;v.moveTo(-.17,-.125),v.lineTo(.17,-.125),v.quadraticCurveTo(.21,-.125,.21,-.088),v.lineTo(.21,.092),v.quadraticCurveTo(.21,.125,.17,.125),v.lineTo(-.17,.125),v.quadraticCurveTo(-.21,.125,-.21,.086),v.lineTo(-.21,-.086),v.quadraticCurveTo(-.21,-.125,-.17,-.125);let M=new xr;M.moveTo(-.145,-.072),M.lineTo(-.145,.072),M.lineTo(.145,.072),M.lineTo(.145,-.072),M.closePath(),v.holes.push(M);let _=new Qe(new bo(v,{depth:.027,bevelThickness:.009,bevelSize:.009,bevelSegments:2}),new qn({color:13217934,metalness:.48,roughness:.42}));return _.position.set(0,.15,.85),_.rotation.x=-.11,f.add(_),r={model:c,pelvis:f,spine:d,head:h,hipsY:p,limbs:x,skin:g,material:m,buckle:_},!0}),s)}function o(c){return c==="bruiser"?a():e.prepare(c)}function l({time:c,walk:u,march:f,attack:d,slamHand:h=0,hit:p,defeat:x,kind:g="bruiser",vault:m=0,brace:v=0,drive:M=0,charge:_=0,release:b=0,mode:S}){let y=t(g,{time:c,walk:u,march:f,attack:d,slamHand:h,defeat:x,vault:m,charge:_,release:b,mode:S,hit:p});if(r&&(r.skin.visible=r.buckle.visible=!y),y||!r)return;let{pelvis:E,spine:C,head:R,hipsY:A,limbs:L,material:O}=r,I=Math.min(1,m/1.35),G=Math.sin(Math.PI*Math.max(0,Math.min(1,(m-.21)/.89))),q=Tt(m,0,.14)*(1-Tt(m,.14,.32)),V=Tt(m,1.04,1.13)*(1-Tt(m,1.14,1.35)),re=d>0?1-Tt(x,0,.15):0,X=re*ul(d),ee=re*fl(d),ae=h===2,Ie=ae&&d>0?re*Math.sin(Math.PI*Tt(d,.16,.62)):0,Fe=Tt(x,0,.08)*(1-Tt(x,.82,.96)),ie=Fe*Math.abs(Math.sin(x*28)),F=Tt(x,.84,1.38),te=Tt(x,1.38,1.85),H=u*(1-.82*re)*(1-F)*(1-.9*Math.sin(Math.PI*I))+Fe*.85,j=.41,z=f==null?c*6.75:f*Math.PI*.55/j;Hs(z,Math.min(1,H),n);let Ge=n[0],de=h===0?1:h===1?-1:0;E.position.y=A+(-.105+(.5-.5*Math.cos(2*z))*.047)*Math.min(1,H)+.14*X-.56*ee-.16*ie-.18*F-.32*q-.26*V,E.rotation.set(-.1*X+.14*ee-.12*Ie-.14*Fe,Ge*.105+de*(.28*X-.34*ee),Ge*.043-F*.08+Fe*Math.sin(x*22)*.12),C.rotation.set(.06+.24*q+.19*V-.14*G+.13*M-.34*X+.72*ee-.09*p-.38*Fe-.22*ie-.18*F,-Ge*.16+de*(.42*X-.48*ee),-.057*Ge-.15*F+Fe*Math.sin(x*19)*.14),g==="bruiser"&&(C.rotation.x+=.16*_+.31*b),R.rotation.set(-.25+.18*X-.42*ee-.35*Fe+.24*F,Ge*.052-de*.18*X,.032*Ge+Fe*Math.sin(x*26)*.16);for(let[ce,N]of L.entries()){let J=ce?1:-1,W=n[ce],Y=Math.max(0,(ce===0?1:-1)*n[2]),xe=-N.Knee.position.y,We=-N.Ankle.position.y,Be=xe+We+E.position.y-A-Y*.22,tt=j*W,nt=Math.min(xe+We-1e-5,Math.hypot(Be,tt)),pt=qe=>Math.acos(Ue.clamp(qe,-1,1)),B=Math.atan2(-tt,Be)-pt((xe*xe+nt*nt-We*We)/(2*xe*nt)),kt=Math.PI-pt((xe*xe+We*We-nt*nt)/(2*xe*We));N.Hip.rotation.x=B-(.62+ce*.13)*G-(.58+ce*.1)*Ie+.22*ee+J*.28*F,N.Knee.rotation.x=kt+.78*G+.22*V+.82*Ie+.32*ee+.24*F,N.Ankle.rotation.x=-B-kt+.19*W-.31*Ie;let rt=ae||h===ce,ot=rt?X:0,_e=rt?ee:0,Pt=!rt&&re>0?X:0;N.Arm.rotation.set(.37*W-.76*G+.18*q-(ce?0:.82)*v-(ce?.65:0)*M-(ae?2.68:2.58)*ot-.88*_e+.42*Pt-.88*Fe-.45*ie,J*(.28*ot-.16*_e+.22*G+.42*Fe),J*(.05+.34*ot-.12*_e+.25*Pt+.78*Fe+.68*F-.24*te)),N.Elbow.rotation.x=-.26-.17*Math.max(0,-W)-.58*ot-.14*_e-.48*Fe-.38*F,N.Arm.rotation.x-=1.36*_+.11*b,N.Elbow.rotation.x-=.34*_,N.Wrist.rotation.set(-.24-.15*ot+.28*_e,J*.52*ot,J*(.075*W+.12*ot))}let Re=Math.max(p,ie*.85);O.emissive.setRGB(.24+Re*.62,.24+Re*.32,.24+Re*.18)}return{root:i,pose:l,prepare:o}}var O2={timber:[1.85,.077],quarry:[3.35,.105],forge:[3.7,.084],ice:[4.05,.069],cinder:[3.8,.119]},B2=[0,0],vd=`
  uniform vec4 roadCurve;
  float lateralBend(float z){
    float offset = roadCurve.x * (cos(roadCurve.z - z * roadCurve.y) - roadCurve.w)
                 * smoothstep(5.0, 21.0, -z);
    float limit = max(0.6, -z * 0.18 - 0.8);
    return offset * inversesqrt(1.0 + (offset / limit) * (offset / limit));
  }`,ug=new WeakSet,dg=new WeakMap;function fg(i){if(ug.has(i)||i.userData.unbent)return;ug.add(i);let e=i.onBeforeCompile,t=i.customProgramCacheKey();i.customProgramCacheKey=()=>t+"-road-bend",i.onBeforeCompile=function(n,s){e.call(this,n,s),Object.assign(n.uniforms,dg.get(s));let r="if (roadCurve.x != 0.0) gl_Position += roadRight * lateralBend(dot(roadDepth, gl_Position));",a=n.vertexShader;a.includes("#include <project_vertex>")?a=a.replace("#include <project_vertex>",`#include <project_vertex>
`+r):a=a.replace(/gl_Position\s*=[^;]+;/g,o=>o+`
`+r),n.vertexShader=vd+`
uniform vec4 roadDepth, roadRight;
`+a},i.needsUpdate=!0}function pg(i,e){let t=new bt,n=new bt,s=new bt,r=new Ke;dg.set(i,{roadCurve:{value:t},roadRight:{value:n},roadDepth:{value:s}});let a=-1,o=!0;function l(u){u.material&&(Array.isArray(u.material)?u.material.forEach(fg):fg(u.material),u.frustumCulled=!1)}function c(u){u&&u.traverse(l)}return{markDirty(){o=!0},scanNode:c,prepareScene(){let u=e.children.length;for(let f=0;f<e.children.length;f++){let d=e.children[f];u=u*31+d.children.length+(d.visible?1:0)|0}!o&&u===a||(a=u,o=!1,e.traverseVisible(l))},setRoute(u,f,d){let[h,p]=O2[u]||B2,x=d*p+f%5*.69+.63;t.set(h,p,x,Math.cos(x))},offset(u){let f=t.x*(Math.cos(t.z-u*t.y)-t.w)*Ue.smoothstep(-u,5,21),d=Math.max(.6,-u*.18-.8);return f/Math.hypot(1,f/d)},setCamera(u){r.multiplyMatrices(u.projectionMatrix,u.matrixWorldInverse),n.fromArray(r.elements,0);let f=r.invert().elements;s.set(f[2],f[6],f[10],f[14])},curve:t}}var yd="M4 17h24v3H4z M6 16c0-6 4-11 10-11s10 5 10 11z M10 22h12c-1 4-3 6-6 6s-5-2-6-6z",k2={plus:yd,squad:yd,reserve:yd,merge:"M16 2l4 8 9 1-6.5 6 1.5 9L16 21.5 8 26l1.5-9L3 11l9-1z",shieldSquad:"M16 2l12 5v8c0 6-5 12-12 15C9 27 4 21 4 15V7z M11 11h10v10H11z",flameSquad:"M16 2c3 7 9 8 8 15 2-1 3-3 4-5 6 12-5 18-12 17C7 27 4 20 8 12c0 3 2 4 3 4-1-6 4-9 5-14z",teslaSquad:"M17 1L5 17h9l-2 14 15-19h-9l4-11z",double:"M4 10l5 6-5 6h4l3-4 3 4h4l-5-6 5-6h-4l-3 4-3-4zm16 12v-4h5v-3h-5v-4h7V8H17v14h10v-3z",rapid:"M3 11l8 5-8 5v-4l3-1-3-1z M11 8l12 8-12 8v-5l5-3-5-3z M22 9l8 7-8 7v-5l3-2-3-2z",shield:"M16 2l12 5v8c0 6-5 12-12 15C9 27 4 21 4 15V7z M16 7v17c5-3 7-6 7-10V10z",blast:"M14 12l5-2 1-5 4 1-2 6c5 3 6 8 3 13-3 5-12 6-17 1-4-4-4-12 1-15z M23 3l3-2 2 2-4 3z",plasma:"M17 1L5 18h9l-2 13 16-20H17l4-10z",spread:"M6 29V13H2l7-10 7 10h-4v16z M20 26V11h-4l7-9 7 9h-4v15z",drone:"M11 13h10l3 4-4 4h-8l-4-4z M3 6l8 5-2 3-8-5z M21 11l8-5 2 3-8 5z M1 24l8-5 2 3-8 5z M21 22l2-3 8 5-2 3z",engineer:"M2 23h28v4H2z M4 21V6h4v6c5 4 11 4 16 0V6h4v15h-4v-5l-4 2v3h-3v-2h-3v2h-3v-3l-3-2v5z",fever:"M15 1c2 8 8 8 7 15 3-1 4-4 4-6 8 16-5 23-12 20C4 28 2 21 7 13c0 4 2 5 3 5-1-7 5-10 5-17z"},mg={blue:{top:"#36acf9",bottom:"#0574e4",rim:"#81d7ff",light:"#f6fcff",ink:"#ffffff",shade:"#1150a9",badge:"#1678d2"},gold:{top:"#ffe336",bottom:"#efbf0c",rim:"#ffeb79",light:"#fff9ce",ink:"#ffffff",shade:"#916808",badge:"#c78b0d"}};function Ia(i,e,t){i.beginPath(),e.forEach(([n,s],r)=>r?i.lineTo(n,s):i.moveTo(n,s)),i.closePath(),i.fillStyle=t,i.fill()}function gg(i,e,t,n,s){let r=mg[cn[e].tone];i.save(),i.translate(t,n),i.scale(s/100,s/100);let a=[[-34,-46],[34,-46],[48,-31],[48,21],[33,35],[0,49],[-33,35],[-48,21],[-48,-31]];Ia(i,a,r.shade),i.scale(.94,.94),Ia(i,a,r.rim),i.scale(.88,.88);let o=i.createLinearGradient(0,-45,0,45);o.addColorStop(0,r.badge),o.addColorStop(1,r.shade),Ia(i,a,o),i.scale(2,2),i.translate(-16,-16);let l=new Path2D(k2[e]);i.translate(0,1.3),i.fillStyle=r.shade,i.fill(l,"evenodd"),i.translate(0,-1.3),i.fillStyle=r.light,i.fill(l,"evenodd"),i.restore()}function xg(i){let e=new Bn(i);return e.colorSpace=At,e.anisotropy=4,e}function z2(i,e,t,n,s,r){i.save(),i.translate(t,n),i.scale(s/640,r/196);let a=mg[cn[e].tone],o=i.createLinearGradient(0,0,0,196);o.addColorStop(0,a.top),o.addColorStop(.52,a.bottom),o.addColorStop(1,a.shade),i.fillStyle=o,i.fillRect(0,0,640,196),Ia(i,[[0,0],[152,0],[104,196],[0,196]],a.shade);let l=i.createLinearGradient(160,0,560,180);l.addColorStop(0,"rgba(255,255,255,0.22)"),l.addColorStop(.45,"rgba(255,255,255,0.04)"),l.addColorStop(.55,"rgba(255,255,255,0.16)"),l.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=l,i.fillRect(105,8,530,110),Ia(i,[[0,0],[640,0],[640,10],[14,10],[0,22]],a.rim),i.fillStyle="rgba(255,255,255,.18)",i.fillRect(14,178,612,4);for(let h of[14,626])for(let p of[23,175])i.fillStyle=a.shade,i.fillRect(h-4,p-3,8,6),i.fillStyle=a.light,i.fillRect(h-3,p-3,6,2);for(let h of[548,574,600])Ia(i,[[h,152],[h+14,152],[h+8,165],[h-6,165]],a.rim);gg(i,e,71,98,106);let c=cn[e],u=c.count?150:124;i.font="900 "+u+'px "Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif',i.textAlign="center";let f=i.measureText(c.label),d=98+(f.actualBoundingBoxAscent-f.actualBoundingBoxDescent)/2;i.translate(362,d),i.scale(Math.min(1,405/f.width),1),i.lineJoin="round",i.lineWidth=c.count?16:12,i.strokeStyle="#14263b",i.strokeText(c.label,0,3),i.fillStyle=a.ink,i.fillText(c.label,0,0),i.restore()}function vg(){let i=Object.keys(cn),e=4,t=Math.ceil(i.length/e),n=512,s=160,r=document.createElement("canvas");r.width=e*n,r.height=t*s;let a=r.getContext("2d"),o=new Map;return i.forEach((l,c)=>{let u=c%e,f=Math.floor(c/e);z2(a,l,u*n,f*s,n,s),o.set(l,[u/e,1-(f+1)/t])}),{map:xg(r),cells:o,scaleU:1/e,scaleV:1/t}}function yg(i){let e=Object.keys(cn),t=Math.ceil(Math.sqrt(e.length)),n=128,s=document.createElement("canvas");s.width=s.height=t*n;let r=s.getContext("2d"),a=new Map;e.forEach((h,p)=>{let x=p%t,g=Math.floor(p/t);gg(r,h,(x+.5)*n,(g+.5)*n,118),a.set(h,[x/t,1-(g+1)/t])});let o=new gt({map:xg(s),side:Zt,alphaTest:.26,toneMapped:!1});o.onBeforeCompile=h=>{h.vertexShader=`attribute vec2 badgeCell;
`+h.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
vMapUv = vMapUv * `+(1/t).toFixed(6)+" + badgeCell;")};let l=new Ot(.99,.99),c=40,u=new Jt(new Float32Array(c*2),2);u.setUsage(Gt),l.setAttribute("badgeCell",u);let f=new Ft(l,o,c);f.name="Flying supply insignia",f.count=0,f.frustumCulled=!1,f.instanceMatrix.setUsage(Gt),i.add(f);let d=new Lt;return{update(h){let p=0;for(let x of h){if(x.slot!=null||x.age<0||p>=c)continue;let g=x.progress;d.scale.setScalar(.65+.62*Math.sin(Math.PI*g)),d.rotation.set(-.57,Math.sin(g*Math.PI*2)*.48,.13*Math.sin(g*Math.PI*2)),d.position.set(x.x,x.y+.35,x.z),d.updateMatrix(),f.setMatrixAt(p,d.matrix);let m=a.get(x.type);u.setXY(p++,m[0],m[1])}f.count=p,f.visible=p>0,p&&(f.instanceMatrix.clearUpdateRanges(),f.instanceMatrix.addUpdateRange(0,p*16),f.instanceMatrix.needsUpdate=!0,u.clearUpdateRanges(),u.addUpdateRange(0,p*2),u.needsUpdate=!0)}}}function _g(i){let e=[],t="#386167",n="#394852",s="#d9a35c",r="#866047",a=(h,p,x,g,m,v,M,_=null)=>e.push(Je(on(h,p,x),g,m,v,M,_)),o=(h,p,x,g,m,v,M,_,b=null)=>e.push(Je(new an(h,p,x,g),m,v,M,_,b)),l=(h,p,x,g)=>e.push(wn(h,p,x,g,6));function c(h,p,x,g,m,v,M,_){let b=new Bi(1);b.scale(g,m,v),e.push(Je(b,M,h,p,x,new qt(.09,_,.15)))}function u(h,p,x){a(3.6,.38,x,"#806d5b",h,-1.8,p);for(let g of[-1,1]){a(.13,.19,x,"#c7a073",h+1.67*g,-1.52,p);for(let m of[-1,1])o(.16,.24,2.9,8,r,h+1.45*g,-2.65,p+m*(x/2-.25))}for(let g=0;g<x/.45;g++)a(3.25,.034,.026,"#a78869",h,-1.58,p-x/2+.2+g*.45)}function f(h,p){o(1.2,1.65,1.9,12,"#8c8e83",h,-2.72,p),o(.66,.9,2.55,14,"#ebe4c4",h,-.55,p),o(.72,.8,.68,14,"#b95843",h,-.42,p),o(.86,.66,.22,14,n,h,.82,p),o(.6,.6,.7,12,"#fbdc91",h,1.24,p);for(let x=0;x<8;x++){let g=x*Math.PI/4;o(.045,.045,.83,5,t,h+.61*Math.cos(g),1.25,p+.61*Math.sin(g))}o(.05,.9,.52,12,"#587579",h,1.92,p),o(.04,.04,.39,8,s,h,2.32,p)}function d(h,p,x){let g=h>0?-1:1,m=h+g*1.9,v=-1.5+x;a(.75,.48,.76,n,h,-1.25,p);for(let M of[-.28,.28]){a(.12,x,.12,"#d4a354",h,-1.51+x/2,p+M),l([h,v-.77,p+M],[m,v+.32,p+M],.06,s),l([h,v+.34,p+M],[m,v+.32,p+M],.075,s);for(let _=0;_<4;_++)l([h,-1.37+_*x/4,p+M],[h,-1.37+(_+1)*x/4,p-M],.035,t)}a(.59,.57,.82,"#a47849",h-g*.28,v+.14,p),o(.14,.14,.75,10,n,m,v+.29,p,new qt(Math.PI/2,0,0)),l([m,v+.26,p],[m,v-.79,p],.025,n),a(.7,.47,.69,"#b77749",m,v-1.02,p);for(let M of[-.2,.2])a(.73,.5,.045,n,m,v-1.02,p+M)}if(i==="quay"){f(-8.95,-2);for(let h=0;h<4;h++)c(-9-.56*(h%2),-3.55,-.2+h*.65,.93,.55,1.1,"#87958b",h*.7);u(9.1,15,5.1),d(9.5,15.85,2.55);for(let[h,p]of[[8.38,13.6],[9.4,13.4],[8.43,14.36]])a(.8,.58,.65,"#bd906c",h,-1.28,p),a(.09,.61,.675,t,h-.23,-1.28,p)}else if(i==="timber"){for(let[h,p,x]of[[-9,-1,3.9],[-10.7,-3,4.6],[-9.4,1.2,3],[10,14,3.8],[11.1,16,4.1]]){c(h,-3.54,p,1.95,.85,2.1,"#73877a",h),o(.14,.25,x*.72,8,r,h,-2+x*.23,p);for(let g=0;g<3;g++)o(.02,(1.5-g*.28)*x/4,x*.51,8,["#3e6857","#4f8069","#74a186"][g],h,-2+x*(.38+g*.22),p)}u(8.65,17.5,4.1);for(let h of[16.4,18.6])for(let p of[8.1,9.2])a(.14,2.8,.14,r,p,-.18,h);a(1.72,.14,3.06,"#cb9760",8.65,1.18,17.5),o(0,1.83,.71,4,"#587c70",8.65,1.6,17.5,new qt(0,.785,0))}else if(i==="quarry"||i==="cinder"||i==="ice"){let h=i==="ice",p=i==="cinder",x=h?["#8dbdcc","#b4d4db","#d5e9e7"]:p?["#433f49","#57505e","#736362"]:["#957765","#a7866d","#c1a383"];for(let[g,m]of[[-1,0],[1,17]])for(let v=0;v<6;v++){let M=g*(8.6+v%3*.98),_=m+(v%2*2-1)*(v*.64+.4),b=1.32+v%3*.77;c(M,-3.29,_,2.12,b,2.32,x[0],v*1.27),p?(o(.58,.8,b,6,x[v%3],M,-2+b*.26,_),o(.49,.51,.09,6,"#b96845",M,-2+b*.76,_)):(c(M,-3.25+b*.44,_,1.62,b*.68,1.95,x[1],v*1.27),c(M,-3.17+b*.72,_,1.18,b*.45,1.49,x[2],v*1.27)),h&&v%2===0&&o(.01,.44,1.75,5,"#a5edf0",M,-.95,_,new qt(0,0,g*.24))}!p&&!h&&(u(9.7,10,4.3),d(9.6,10.5,3.4))}else if(i==="forge"){u(-9.4,0,6.1),d(-9.5,0,4.1),u(9.3,15,7.2);for(let[h,p,x]of[[8.8,16,3.8],[10,14.8,2.9]]){o(.37,.43,x,14,"#637d83",h,-1.4+x/2,p);for(let g of[.17,.57,.95])o(.42,.42,.12,14,s,h,-1.4+g*x,p);o(.29,.29,.06,14,n,h,-1.36+x,p)}for(let h of[12.1,13.2])a(2.2,.63,.82,"#a86c49",9.24,-1.26,h)}return bn(e)}var _d=new Yt({vertexColors:!0,shininess:33,specular:5527131}),xn=(i=0,e=0,t=0)=>new qt(i,e,t),ft=(i,e,t,n,s,r,a,o=0,l=null)=>Je(on(i,e,t,o),n,s,r,a,l),_t=(i,e,t,n,s,r,a,o=null,l=16)=>Je(new an(i,e,t,l),n,s,r,a,o),$o=(i,e,t,n,s,r,a=null)=>Je(new ai(i,e,7,30),t,n,s,r,a),Xi=i=>new Qe(bn(i),_d),$n="#506272",ys="#e4aa48",Ch="#f6dda0",li="#394655",Md="#b78053",p3=Ue.clamp;function H2(i){let e=[],t=[];if(i==="glass"){e.push(ft(3.87,.17,.83,Md,0,.11,0,.04),ft(3.83,.28,.075,$n,0,.26,.38,.025));for(let n of[-1.79,1.79])e.push(ft(.15,.62,.77,li,n,.35,0,.03));for(let[n,s]of[0,-1.12,1.12].entries()){let r=n===0?1.14:.91,a=[_t(.38,.32,.12,"#176c72",s,.23,0),_t(.38,.38,r*.59,"#45bdb3",s,.28+r*.29,0),_t(.13,.38,r*.32,"#7ae1cc",s,.28+r*.74,0),_t(.13,.13,.22,"#309994",s,.34+r*.93,0),_t(.167,.167,.09,"#f7cf7a",s,.46+r*.93,0),_t(.39,.39,.14,"#f7edbe",s,.37+r*.3,0),ft(.06,r*.34,.045,"#ddfff2",s-.21,.48+r*.38,.3,.015,xn(0,0,-.12))];t.push(Xi(a))}}else if(i==="crates"){e.push(ft(3.89,.15,.91,li,0,.09,0,.035));for(let[n,s]of[0,-1.24,1.24].entries()){let r=n===0?1.35:.96,a=[ft(1.18,r,.78,n?"#b77d49":"#cf925c",s,.17+r/2,0,.065)];for(let o of[-1,1]){a.push(ft(.105,r,.085,"#f0c685",s+o*.48,.17+r/2,.4,.013),ft(1.14,.078,.085,"#704d3c",s,.17+r*(o>0?.9:.12),.405,.012),wn([s+o*.46,.27,.46],[s-o*.46,r+.04,.46],.052,"#ebc188",6));for(let l of[.3,r+.01])a.push(_t(.038,.038,.022,$n,s+o*.48,l,.458,xn(Math.PI/2),8))}t.push(Xi(a))}}else{e.push(ft(3.89,.16,.92,li,0,.09,0,.05),ft(3.84,1.12,.6,"#56697b",0,.71,0,.06));for(let n=0;n<5;n++)e.push(ft(3.62,.12,.14,n%2?"#8ea3ad":"#a7b7bf",0,.29+n*.21,.3,.025));for(let n of[-1.79,1.79]){e.push(ft(.21,1.37,.7,$n,n,.67,0,.04));for(let s of[.3,.73,1.14])e.push(ft(.22,.14,.06,"#f2bc59",n,s,.369,0,xn(0,0,.18)))}e.push(ft(.93,.74,.14,li,0,.8,.36,.055),$o(.258,.067,"#ffb94e",0,.83,.46),_t(.15,.15,.06,"#ee702e",0,.83,.47,xn(Math.PI/2),16))}return e.push(ft(1.13,.32,.08,li,0,.23,.455,.035)),{base:Xi(e),sections:t}}function G2(i="quay"){let e=[];if(i==="cinder")e.push(Je(new gr(.84,1),"#2c1e24",0,.84,0),Je(new Bi(.72,1),"#ff5416",0,.84,0),Je(new fi(.56,1),"#ffd54f",.24,1.02,.16),Je(new fi(.46,0),"#ff8624",-.32,.72,.28));else{e.push(ft(1.52,1.19,1.24,"#a97748",0,.82,0,.055),ft(1.68,.15,1.39,$n,0,.25,0,.033),ft(1.65,.12,1.38,"#66737b",0,1.46,0,.03),ft(1.58,.25,.074,"#ffc76c",0,1.12,.631),$o(.175,.046,ys,0,1.66,0));for(let c of[-1,1]){e.push(ft(.18,1.34,1.32,"#495866",c*.61,.86,0,.025)),e.push(ft(.23,.17,1.48,li,c*.52,.11,0,.03));for(let u of[.39,1.32])e.push(_t(.047,.047,.045,Ch,c*.61,u,.669,xn(Math.PI/2),8));e.push(wn([c*.48,.44,.644],[-c*.47,.95,.644],.046,"#ddbb89",6))}for(let c=-2;c<=2;c++)e.push(ft(.09,.24,.02,li,c*.22,1.12,.676,0,xn(0,0,-.42)))}let t=[];for(let c=0;c<12;c++){let u=c*Math.PI/6,f=new hs(.95,1,8,1,u+.035,Math.PI/6-.07);if(f.rotateX(-Math.PI/2),t.push(Je(f,c%3?"#ffbb49":"#fff0aa",0,.013,0)),c%3===0){let d=new Ti(.075,.17,3);d.rotateX(Math.PI/2),d.rotateY(Math.PI/2+u),t.push(Je(d,"#fff0aa",Math.cos(u)*.87,.01,-Math.sin(u)*.87))}}let n=new gt({vertexColors:!0,toneMapped:!1,depthWrite:!1}),s=new Qe(bn(t),n);s.renderOrder=3;let r=new mr(1,48);r.rotateX(-Math.PI/2);let a=new Qe(r,new gt({color:"#ff7e31",transparent:!0,opacity:.13,depthWrite:!1}));a.renderOrder=2;let o=new hs(.96,1,48);o.rotateX(-Math.PI/2);let l=new Qe(o,new gt({color:"#fff0a4",transparent:!0,opacity:.77,depthWrite:!1}));return l.renderOrder=3,{base:Xi(e),halo:s,tint:a,sweep:l}}function V2(){let i=[],e=[[0,0,-.26,1.06],[-.56,0,.24,.96],[.56,0,.24,.96]];for(let[t,,n,s]of e){let r=1.12*s,a=.36*s;i.push(_t(a,a,r,"#e82d26",t,r*.5,n,null,14),_t(a*1.045,a*1.045,r*.22,"#ffd038",t,r*.52,n,null,14),_t(a*1.06,a*1.06,.06,"#2a2d36",t,r*.24,n,null,14),_t(a*1.06,a*1.06,.06,"#2a2d36",t,r*.78,n,null,14),_t(a*.96,a*.96,.07,"#4c5460",t,r+.02,n,null,12),_t(.08*s,.08*s,.08,"#ffe066",t+.14*s,r+.06,n,null,8))}return i.push(ft(1.96,.1,1.24,li,0,.05,.05,.03)),{base:Xi(i)}}function W2(){let i=new Qe(new Ot(3.4,9.5),new gt({color:"#ff4229",transparent:!0,opacity:.22,depthWrite:!1,toneMapped:!1}));i.rotation.x=-Math.PI/2,i.position.set(0,.036,4.75),i.renderOrder=2;let e=[_t(.56,.56,3.55,"#8c5a32",0,0,0,xn(0,0,Math.PI/2),16),_t(.49,.49,3.6,"#d9aa73",0,0,0,xn(0,0,Math.PI/2),14)];for(let n of[-1.25,0,1.25]){e.push(_t(.59,.59,.2,li,n,0,0,xn(0,0,Math.PI/2),14));for(let s=0;s<6;s++){let r=s*Math.PI/3+n*.4,a=new Ti(.095,.28,5);a.rotateZ(-Math.PI/2),a.rotateX(r),e.push(Je(a,"#f4c85a",n,Math.cos(r)*.66,Math.sin(r)*.66,xn(r,0,0)))}}let t=Xi(e);return t.position.set(0,.58,0),{base:i,rollDrum:t}}function X2(){let i=[_t(1.48,1.82,.24,"#36232b",0,.12,0,null,18),$o(1.26,.22,"#522c34",0,.22,0,xn(Math.PI/2))];for(let o=0;o<6;o++){let l=o*Math.PI/3;i.push(Je(new Ti(.32,.58,5),o%2?"#452b34":"#63363b",Math.cos(l)*1.4,.32,Math.sin(l)*1.4,xn(.18,l,.14)))}let e=Xi(i),t=new Qe((()=>{let o=new mr(1.16,24);return o.rotateX(-Math.PI/2),o})(),new gt({color:"#ff5d14",toneMapped:!1}));t.position.y=.22;let n=new Qe((()=>{let o=new mr(.62,18);return o.rotateX(-Math.PI/2),o})(),new gt({color:"#ffd64a",toneMapped:!1}));n.position.y=.24,e.add(t,n);let s=new Qe((()=>{let o=new hs(.75,1,32);return o.rotateX(-Math.PI/2),o})(),new gt({color:"#ff962e",transparent:!0,opacity:.78,depthWrite:!1,toneMapped:!1,blending:Gn}));s.position.y=.055,s.renderOrder=3;let r=[_t(.76,1.08,4.3,"#ff4510",0,2.15,0,null,14),_t(.45,.68,4.55,"#ffcc38",0,2.28,0,null,12),Je(new Xn(1,12,8),"#ffe66e",0,4.3,0)],a=new Qe(bn(r),new gt({vertexColors:!0,transparent:!0,opacity:.94,depthWrite:!1,toneMapped:!1,blending:Gn}));return a.renderOrder=5,a.visible=!1,{base:e,ventGlow:s,ventPlume:a}}function q2(i,e=4.4,t=1,n,s="quay"){if(i==="cover")return H2(n);if(i==="skyfall")return G2(s);if(i==="barrel")return V2();if(i==="roller")return W2();if(i==="lavaVent")return X2();let r=[],a=[],o=[];if(i==="gap"||i==="bridge"){let l=e/2;for(let u of[-1,1]){r.push(ft(4.22,.43,.25,$n,0,-.2,u*(l+.04),.035));for(let f=-3;f<=3;f++)r.push(ft(.29,.025,.19,f%2?ys:li,f*.53,.025,u*(l+.21),0,xn(0,.23,0)));for(let f of[-1,1]){let d=f*1.97;r.push(ft(.2,.83,.24,li,d,-.39,u*l,.025),wn([d,-.85,u*l],[d,-.1,u*(l+.65)],.055,$n))}}let c=Math.round(e/.4);for(let u=0;u<c;u++){let f=(u+.5)*e/c;a.push(ft(4.03,.14,e/c-.025,u%3===0?"#c59762":Md,0,.01,f,.018));for(let d of[-1.54,1.54])a.push(_t(.056,.056,.015,$n,d,.085,f,null,7))}for(let u of[-1.5,1.5])a.push(ft(.19,.28,e,$n,u,-.14,l,.024));if(i==="bridge"){for(let u of[-1,1]){let f=u*1.92;r.push(ft(.21,1.72,.34,$n,f,.82,-l,.04),_t(.23,.23,.12,ys,f,1.68,-l,xn(0,0,Math.PI/2)),wn([f,.12,-l-.42],[f,1.3,-l],.054,Ch))}r.push(_t(.16,.16,3.9,$n,0,.11,-l,xn(0,0,Math.PI/2))),r.push(ft(1.33,.61,.41,$n,0,.33,l+.24,.055),ft(1.45,.09,.48,ys,0,.64,l+.24,.025))}else for(let u=0;u<5;u++)r.push(wn([u*.63-1.25,-.11,-l],[u*.63-1.21,-.18,-l+.28+u%2*.18],.024,$n,6))}else if(i==="cache"){for(let l=0;l<3;l++)for(let c=0;c<5;c++){let u=["#af7149","#ba8051","#cf955f","#a56745"];r.push(ft(.643,.366,.65,u[(c+2*l)%4],(c-2)*.665,.22+l*.385,0,.033))}for(let l of[-1.53,1.53]){r.push(ft(.17,1.24,.75,ys,l,.6,0,.035));for(let c of[.19,.57,1.02])r.push(_t(.047,.047,.034,Ch,l,c,.389,xn(Math.PI/2),8))}r.push(ft(3.38,.11,.72,li,0,1.18,0,.025),ft(1.7,.61,.07,li,0,.63,.345,.055))}else if(i==="coil"){r.push(_t(.78,.9,.22,$n,0,.12,0,null,28),_t(.26,.34,.96,"#b2d5ce",0,.68,0,null,28));for(let l=0;l<7;l++)r.push($o(.39-l*.016,.044,l%2?"#cc8548":"#f3b867",0,.3+l*.115,0,xn(Math.PI/2)));r.push(_t(.25,.3,.2,ys,0,1.19,0),Je(new Bi(.21,1),"#96ffff",0,1.39,0))}else if(i==="belt"){r.push(ft(3.9,.065,e,"#697981",0,.035,0,.045));for(let l of[-1.92,1.92])r.push(ft(.1,.11,e,ys,l,.074,0,.022));for(let l=0;l<11;l++)r.push(ft(3.74,.045,.055,"#475765",0,.08,(l-5)*e/11));for(let l=0;l<5;l++)for(let c of[-1,1])o.push(wn([-.24*t,.107,(l-2)*1.53+c*.3],[.24*t,.107,(l-2)*1.53],.052,Ch,6))}return{base:Xi(r),deck:a.length?Xi(a):null,arrows:o.length?Xi(o):null}}function Y2(){let i=document.createElement("canvas");i.width=320,i.height=104;let e=i.getContext("2d"),t=new Bn(i);t.colorSpace=At;let n=new Qe(new Ot(1.56,.51),new gt({map:t,transparent:!0,depthWrite:!1,toneMapped:!1})),s="";return{mesh:n,label(r){r!==s&&(s=r,e.clearRect(0,0,320,104),e.font='900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif',e.textAlign="center",e.textBaseline="middle",e.lineWidth=9,e.strokeStyle="#2e3b48",e.strokeText(r,160,56),e.fillStyle="#fff3cf",e.fillText(r,160,56),t.needsUpdate=!0)},dispose(){t.dispose(),n.geometry.dispose(),n.material.dispose()}}}function Mg(i,e){let t=i.getAttribute("color"),n=ei[e]||ei.quay,s=new be(n.fog||"#14243d"),r=new be(n.skyHorizon||"#8294ab"),a=new be,o=new be;for(let l=0;l<t.count;l++){a.fromBufferAttribute(t,l);let c=a.r*.213+a.g*.715+a.b*.072;o.lerpColors(s,r,Math.min(1,Math.sqrt(c)*1.12)),a.lerp(o,.22),t.setXYZ(l,a.r,a.g,a.b)}return i}function Z2(i){let e=[];for(let t of[-1,1]){let n=t*6.68;i==="cinder"?e.push(_t(.24,.2,.22,"#ff9838",n,.34,0,null,10),Je(new fi(.22,0),"#ffe384",n,.56,0)):i==="ice"?e.push(Je(new fi(.23,0),"#a8ffff",n,.58,0)):i==="forge"?e.push(ft(.32,.22,.26,"#ffaa44",n,.56,0,.04)):e.push(_t(.2,.22,.28,"#ffd966",n,.56,0,null,12),Je(new Xn(.2,10,8),"#fff5b8",n,.7,0))}return bn(e)}function K2(i){let e=ei[i],t=[];for(let n of[-1,1]){let s=n*6.68;if(t.push(ft(.32,4.7,.44,e.frame,s,-2.35,0,.03),wn([s,-2.4,0],[s,-.25,2.3],.09,e.frame),ft(.56,.24,.56,e.frame,s,.22,0,.04),_t(.26,.3,.14,ys,s,.36,0,null,10)),i==="timber"){for(let r of[0,.48])t.push(_t(.13,.18,2,"#9d6e45",s+n*r,-.4,1.3+r,null,9));t.push(wn([s,.32,1.3],[s,.28,4.9],.05,"#d1b586"));for(let[r,a]of[[2.3,1.9],[1.7,3.2]]){t.push(_t(.16,.21,1.9,Md,s+n*a,-3,1+a,null,7));for(let o=0;o<3;o++)t.push(Je(new Ti(.84-o*.19,r*.58,8),["#2d7a56","#3d9968","#68be7f"][o],s+n*a,-2.62+o*.48,1+a))}}else if(i==="quarry"||i==="cinder"||i==="ice"){for(let r=0;r<4;r++){let a=new Ti(.62+r*.15,1.6+r%2*1.4,i==="ice"?5:7);t.push(Je(a,i==="ice"?["#67c7e8","#a6eef7"][r%2]:i==="cinder"?["#3d2b36","#5c3b3d"][r%2]:["#b8744e","#cf8d63"][r%2],s+n*(1.1+r*.6),-2.45+.3*r,r*1.35,xn(.09*r,.6*r,n*.16)))}i==="cinder"&&t.push(_t(.28,.38,.44,"#59363a",s,.02,0),_t(.24,.27,.12,"#ff7a33",s,.24,0))}else i==="forge"?t.push(_t(.3,.3,3.6,"#5c788a",s+n*.38,-.53,.4,xn(Math.PI/2)),$o(.34,.06,ys,s+n*.38,-.53,1.75),ft(.52,.54,.48,$n,s,.21,0,.045)):t.push(_t(.06,.28,.16,"#395570",s,.84,0,null,10),_t(.38,.52,.64,"#d9533f",s+n*1.85,-3.02,2.2),_t(.22,.34,.26,"#fff2d2",s+n*1.85,-2.58,2.2))}return bn(t)}function bg(i,e=new bt){let t=Array.from({length:10},()=>new bt(0,-1e3,0,0));function n(S){S.onBeforeCompile=y=>{y.uniforms.roadCuts={value:t},y.vertexShader=y.vertexShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
deckPosition=(modelMatrix*vec4(transformed,1.)).xyz;`),y.fragmentShader=y.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition; uniform vec4 roadCuts[10];`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
for(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}`)}}let s=new Qe(new Ot(160,170),new Bt({uniforms:{deep:{value:new be},crest:{value:new be},fogColor:{value:new be},clock:{value:0},origin:{value:0},biome:{value:0},roadCurve:{value:e}},vertexShader:"varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",fragmentShader:`${vd}
      varying vec3 pos; uniform vec3 deep, crest, fogColor; uniform float clock, origin, biome;
      void main(){
        vec2 q=vec2(pos.x,pos.z-origin);
        float swell=sin(q.x*.65+clock*.55)*.95+sin(q.x*.28-q.y*.22+clock*.35)*.62;
        float wave=sin(q.y*1.95+swell+clock*.95)+.55*sin(q.x*.92-q.y*1.65-clock*.52);
        float shelf=smoothstep(-.75,.95,sin(q.x*.24+q.y*.19)+.48*sin(q.x*.46-q.y*.25));
        float sparkle=pow(smoothstep(.88,1.52,wave),2.2)*(.32+.45*shelf);
        float shore=abs(q.x-lateralBend(pos.z));
        // \u7D27\u8D34\u5927\u6865\u62A4\u680F\u5916\u7F18\u7684\u767D\u8272\u6D77\u6D6A\u62CD\u5CB8\u6CE1\u6CAB / \u7194\u5CA9\u4EAE\u8FB9
        float bankFoam=smoothstep(8.3,6.65,shore)*smoothstep(6.1,6.75,shore)*(.42+.35*sin(q.y*2.4+clock*2.2));
        vec3 c;
        if(biome>1.5){
          // \u7194\u5FC3\u88C2\u8C37\uFF1A\u7FFB\u6D8C\u6CB8\u817E\u7684\u70BD\u70ED\u91D1\u6A59\u7194\u5CA9\u6CB3\u4E0E\u51B7\u5374\u9ED1\u66DC\u6D6E\u58F3
          float crust=abs(sin(q.x*.56+sin(q.y*.78+clock*.32)+q.y*.52));
          float vein=1.-smoothstep(.0,.18,crust);
          float pulse=.72+.28*sin(clock*1.9+q.y*.65+q.x*.4);
          vec3 magma=mix(vec3(1.,.28,.04),vec3(1.,.86,.32),vein*pulse);
          c=mix(deep,magma,clamp(.14+.16*shelf+vein*.92+bankFoam*.45,0.,1.));
        }else if(biome>.5){
          // \u6781\u5149\u51B0\u6CB3\uFF1A\u6E05\u900F\u51B0\u84DD\u6D77\u9762\u4E0E\u6D6E\u51B0\u6676\u68F1\u9AD8\u5149
          float seam=abs(sin(q.x*.72+q.y*.52+sin(q.y*.48)));
          float floe=1.-smoothstep(.0,.11,seam);
          c=mix(deep,crest,clamp(.16+.24*shelf+floe*.42+sparkle*.65+bankFoam*.6,0.,1.));
          c+=vec3(.78,.98,1.)*sparkle*.38;
        }else{
          // \u6E2F\u53E3/\u6797\u8C37/\u77FF\u5CE1/\u8239\u575E\uFF1A\u6F84\u6F88\u52A8\u6001\u6C34\u6CE2\u4E0E\u5915\u9633\u6CE2\u5149\u95EA\u70C1
          float gleam=.14+.26*shelf+sparkle*.85+bankFoam*.75;
          c=mix(deep,crest,clamp(gleam,0.,1.));
          c+=vec3(1.,.96,.85)*(sparkle*.28+bankFoam*.25);
        }
        // \u6865\u5E95\u8F7B\u6295\u5F71 + \u8FDC\u666F\u81EA\u7136\u878D\u5165\u5929\u9645\u96FE\u8272
        c*=mix(.58,1.,smoothstep(5.2,8.4,shore));
        float distFade=smoothstep(-28.,-105.,pos.z);
        c=mix(c,fogColor,distFade*.85);
        gl_FragColor=vec4(c,1.);
      #include <colorspace_fragment>
      }`}));s.rotation.x=-Math.PI/2,s.position.set(0,-3.7,-43),s.material.userData.unbent=!0,i.add(s);let r=new Map,a=new Map,o=new Map,l=new Map,c=new Map,u=new Ke,f=new gt({vertexColors:!0,toneMapped:!1}),d,h,p=new an(.035,.035,1,8),x=new Yt({color:11246457}),g=new D,m=new D,v=new D,M=new D(0,1,0);function _(S,y){let E=[S.kind,S.variant||"",S.length||0,S.direction||0,S.kind==="skyfall"?y:""].join(":");r.has(E)||r.set(E,q2(S.kind,S.length,S.direction,S.variant,y));let C=r.get(E),R=new Nt,A=C.base.clone();R.add(A);let L=(C.sections||[]).map(ae=>ae.clone());for(let ae of L)R.add(ae);let O,I,G,q,V,re,X;if(C.rollDrum&&(V=C.rollDrum.clone(),R.add(V)),C.ventGlow&&(re=C.ventGlow.clone(),X=C.ventPlume.clone(),R.add(re,X)),C.halo){q={halo:C.halo.clone(),tint:C.tint.clone(),sweep:C.sweep.clone()};for(let ae of Object.values(q))R.add(ae);q.tint.position.y=.038,q.halo.position.y=.044,q.sweep.position.y=.048}let ee=[];if(C.deck&&(O=C.deck.clone(),O.position.z=-S.length/2,R.add(O)),C.arrows&&(I=C.arrows.clone(),R.add(I)),(S.kind==="cache"||S.kind==="bridge"||S.kind==="coil"||S.kind==="cover"||S.kind==="barrel"||S.kind==="roller")&&(G=Y2(),R.add(G.mesh),G.mesh.position.set(0,S.kind==="cover"?.25:S.kind==="cache"?.66:S.kind==="coil"?.55:S.kind==="barrel"?1.56:S.kind==="roller"?1.62:.43,S.kind==="cover"?.512:S.kind==="bridge"?S.length/2+.48:S.kind==="coil"?.56:S.kind==="barrel"?.55:S.kind==="roller"?.25:.397),(S.kind==="cover"||S.kind==="barrel"||S.kind==="roller")&&G.mesh.scale.setScalar(.76)),S.kind==="bridge")for(let ae=0;ae<2;ae++){let Ie=new Qe(p,x);R.add(Ie),ee.push(Ie)}return i.add(R),{g:R,base:A,leaf:O,arrows:I,chains:ee,sections:L,label:G,drop:q,rollDrum:V,ventGlow:re,ventPlume:X}}function b(S){let y=S.route.theme;if(y!==d){if(d&&(a.get(d).visible=!1,o.get(d).visible=!1,l.get(d).visible=!1),d=y,!a.has(y)){let A=new Ft(Mg(K2(y),y),_d,10);A.frustumCulled=!1;let L=new Ft(Z2(y),f,10);L.frustumCulled=!1,L.instanceMatrix=A.instanceMatrix;let O=new Ft(Mg(_g(y),y),_d,3);O.frustumCulled=!1,l.set(y,O),i.add(O),a.set(y,A),o.set(y,L),i.add(A,L)}a.get(y).visible=!0,o.get(y).visible=!0,l.get(y).visible=!0,s.material.uniforms.biome.value=y==="cinder"?2:y==="ice"?1:0,s.material.uniforms.deep.value.set(ei[y].deep),s.material.uniforms.crest.value.set(ei[y].glint),s.material.uniforms.fogColor.value.set(ei[y].fog)}let E=l.get(y);for(let A=0;A<E.count;A++)E.setMatrixAt(A,u.makeTranslation(0,0,-36-A*47+S.distance%47));E.instanceMatrix.needsUpdate=!0;let C=a.get(y);for(let A=0;A<10;A++)C.setMatrixAt(A,u.makeTranslation(0,0,12-A*10+S.distance%10));if(C.instanceMatrix.needsUpdate=!0,s.material.uniforms.clock.value=S.elapsed,s.material.uniforms.origin.value=S.distance,S.features!==h){for(let A of c.values())A.g.removeFromParent(),A.label?.dispose();c.clear(),h=S.features}let R=0;for(let A of S.features){if(A.z<-68||A.z>14){let O=c.get(A);O&&(O.g.visible=!1);continue}let L=c.get(A)||_(A,y);if(c.set(A,L),L.g.visible=!0,L.g.position.set(A.x,0,A.z),A.kind==="barrel")if(L.g.rotation.z=Math.sin(S.elapsed*75)*(A.flash||0)*.08,A.state!=="ready"){let O=1-Ue.smoothstep(A.age,0,.16);L.base.scale.setScalar(Math.max(.001,O)),O<=.01&&(L.g.visible=!1)}else L.base.scale.setScalar(1);if(A.kind==="roller"&&L.rollDrum){let O=A.state==="ready";if(L.base.visible=O,L.base.material.opacity=.16+.12*Math.sin(S.elapsed*12),L.rollDrum.rotation.x=A.rollSpin||0,L.rollDrum.position.y=.58+Math.abs(Math.sin((A.rollSpin||0)*2))*.06,O)L.rollDrum.scale.setScalar(1);else{let I=1-Ue.smoothstep(A.age,0,.2);L.rollDrum.scale.setScalar(Math.max(.001,I)),I<=.01&&(L.g.visible=!1)}}if(A.kind==="lavaVent"&&L.ventGlow&&L.ventPlume){let O=A.radius||2.05;if(L.ventGlow.visible=!!(A.warming||A.erupting),L.ventGlow.visible){let I=A.ventProgress||0,G=A.erupting?O*(1.05+.08*Math.sin(S.elapsed*28)):O*(.45+.55*I);L.ventGlow.scale.setScalar(G),L.ventGlow.material.opacity=A.erupting?.92:.35+.5*I}if(L.ventPlume.visible=!!A.erupting,L.ventPlume.visible){L.ventPlume.rotation.y=S.elapsed*7.5;let I=.88+.18*Math.sin(S.elapsed*32);L.ventPlume.scale.set(I,.92+.14*Math.cos(S.elapsed*26),I)}}if(L.drop){let O=A.state==="warning",I=A.state==="landed";if(L.g.visible=O||I&&A.age<.85,!L.g.visible)continue;let G=A.fallProgress||0,q=A.age,V=A.radius;if(L.drop.halo.visible=L.drop.tint.visible=O,L.drop.halo.scale.setScalar(V),L.drop.tint.scale.setScalar(V),L.drop.sweep.visible=O||q<.38,L.drop.sweep.scale.setScalar(V*(O?.1+.88*A.progress:1+.77*Ue.smoothstep(q,0,.38))),L.base.visible=!0,O){let re=7.9+10*(1-Ue.smoothstep(A.progress,.08,.71));L.base.position.y=re*(1-G*G),L.base.rotation.set(.12*(1-G),.39*(1-G),.13*(1-G)),L.base.scale.setScalar(1)}else{let re=Math.sin(q*20)*Math.exp(-q*10);L.base.position.y=Math.abs(re)*.32,L.base.rotation.set(.08*re,0,.14*re),L.base.scale.setScalar(1-Ue.smoothstep(q,.34,.83))}}if(A.kind==="cover"){let O=A.hp/A.maxHp;L.sections.forEach((I,G)=>{I.visible=O>G*.34}),L.g.rotation.z=Math.sin(A.age*95)*A.flash*.033}if(S.parade&&A.kind!=="bridge"&&A.kind!=="gap"&&(L.g.position.y-=1.8*Ue.smoothstep(S.endTime,0,.48),S.endTime>=.49&&(L.g.visible=!1)),A.kind==="gap"||A.kind==="bridge"){S.parade&&(L.exitAngle??(L.exitAngle=L.leaf.visible?L.leaf.rotation.x:Math.PI/2),L.leaf.position.y=.03),R<t.length&&t[R++].set(A.x,A.z,4.4/2-.055,A.length/2),L.leaf.visible=!!S.parade||A.kind==="bridge"||A.state==="repaired";let O=Ue.smoothstep(A.age,0,.58);L.leaf.rotation.x=S.parade?L.exitAngle*(1-Ue.smoothstep(S.endTime,0,.45)):A.state==="cut"?-.2+1.6*O:A.state==="ready"&&A.kind==="bridge"?-.2:A.state==="linked"?-.2*(1-O):0,A.state==="repaired"&&(L.leaf.position.y=.03+.22*(1-O));for(let I=0;I<L.chains.length;I++){let G=L.chains[I],q=(I?1:-1)*1.83;G.visible=A.state!=="cut"&&A.state!=="repaired",g.set(q,1.63,-A.length/2),m.set(q,-Math.sin(L.leaf.rotation.x)*A.length+.1,-A.length/2+Math.cos(L.leaf.rotation.x)*A.length),v.subVectors(m,g),G.scale.y=v.length(),G.position.copy(g).lerp(m,.5),G.quaternion.setFromUnitVectors(M,v.normalize())}}L.arrows&&(L.arrows.position.x=Math.sin(S.elapsed*5)*.39*A.direction),L.label&&(L.label.mesh.visible=A.state==="ready",L.label.mesh.visible&&L.label.label((A.kind==="cover"?"":A.kind==="bridge"?"\u65AD\u7D22 ":A.kind==="coil"?"\u7535 ":A.kind==="barrel"?"\u7206 ":A.kind==="roller"?"\u6728 ":"\u7BB1 ")+Math.ceil(A.hp))),(A.kind==="cache"||A.kind==="coil"||A.kind==="cover")&&A.state!=="ready"&&L.base.scale.setScalar(1-Ue.smoothstep(A.age,0,.24))}for(let A=R;A<t.length;A++)t[A].set(0,-1e3,0,0)}return{cutDeck:n,update:b}}var bd=13.2,Da=14,Jo=-110,Ph=Da-Jo,La=(Da+Jo)/2,Sd=-.18;function Sg(i){let e=ei[i],t=parseInt(e.floor.slice(1),16),n=1024,s=768,r=document.createElement("canvas");r.width=n,r.height=s;let a=r.getContext("2d"),o=document.createElement("canvas");o.width=512,o.height=384;let l=o.getContext("2d");l.fillStyle="#a8a8a8",l.fillRect(0,0,512,384);let c=a.createImageData(n,s),u=t>>16&255,f=t>>8&255,d=t&255,h=941+i.charCodeAt(0)*31;for(let m=0;m<s;m++)for(let v=0;v<n;v++){h=Math.imul(1664525,h)+1013904223>>>0;let M=(h/4294967296-.5)*9,_=Math.min(v,n-1-v),b=Math.max(0,1-_/44)*28,S=2.6*Math.cos(v*.032+Math.sin(m*.025)),y=M+S-b,E=(m*n+v)*4;c.data[E]=Math.max(0,Math.min(255,u+y)),c.data[E+1]=Math.max(0,Math.min(255,f+y)),c.data[E+2]=Math.max(0,Math.min(255,d+y)),c.data[E+3]=255}a.putImageData(c,0,0),a.scale(4,4),l.scale(2,2);let p=(m,v,M,_,b,S,y=1)=>{m.strokeStyle=S,m.lineWidth=y,m.beginPath(),m.moveTo(v,M),m.lineTo(_,b),m.stroke()};if(a.fillStyle="rgba(35,38,54,.22)",a.fillRect(0,0,256,1.8),a.fillStyle="rgba(255,250,245,.34)",a.fillRect(0,2.2,256,1.1),l.fillStyle="#383838",l.fillRect(0,0,256,2.2),l.fillStyle="#dedede",l.fillRect(0,2.2,256,1.2),i==="quay"){for(let m of[24,61,108,148,195,232]){let v=a.createLinearGradient(m-8,0,m+8,0);v.addColorStop(0,"rgba(65,78,96,0)"),v.addColorStop(.5,"rgba(62,74,95,.075)"),v.addColorStop(1,"rgba(65,78,96,0)"),a.fillStyle=v,a.fillRect(m-8,0,16,192)}for(let m of[48,96,144])p(a,0,m,256,m,"rgba(72,76,92,.24)",1.1),p(a,0,m+1.4,256,m+1.4,"rgba(255,250,242,.38)",.9),p(l,0,m,256,m,"#4a4a4a",1.4),p(l,0,m+1.5,256,m+1.5,"#dcdcdc",.9);for(let[m,v]of[[7,42],[244,136]]){a.fillStyle="#798798",a.fillRect(m,v,5,15);for(let M=1.5;M<14;M+=2.2)p(a,m+.5,v+M,m+4.5,v+M,"#3e4c5e",.9)}}else if(i==="timber")for(let m=0;m<8;m++){let v=m*24;a.fillStyle=m%2?"rgba(92,58,32,.08)":"rgba(255,232,195,.07)",a.fillRect(0,v,256,24),p(a,0,v,256,v,e.joint,1.8),p(a,0,v+2,256,v+2,e.rim,.85),p(l,0,v,256,v,"#2c2c2c",2),p(l,0,v+2,256,v+2,"#e2e2e2",1);for(let M=0;M<5;M++){let _=(m*41+M*59)%236;a.strokeStyle="rgba(92,58,32,.22)",a.lineWidth=.85,a.beginPath(),a.moveTo(_,v+11),a.bezierCurveTo(_+14,v+5,_+22,v+17,_+42,v+11),a.stroke()}for(let M of[12,82,174,244])a.fillStyle="#53453c",a.beginPath(),a.arc(M,v+12,1.7,0,Math.PI*2),a.fill()}else if(i==="forge")for(let m=0;m<3;m++)for(let v=0;v<4;v++){let M=m*85+6,_=v*48+5;a.fillStyle=(m+v)%2?"rgba(30,45,66,.09)":"rgba(235,245,255,.06)",a.fillRect(M,_,73,38),a.strokeStyle=e.joint,a.lineWidth=1.4,a.strokeRect(M,_,73,38),l.strokeStyle="#363636",l.lineWidth=1.6,l.strokeRect(M,_,73,38);for(let b=0;b<5;b++)p(a,M+8+b*11,_+27,M+14+b*11,_+18,"#c5d2df",1),p(l,M+8+b*11,_+27,M+14+b*11,_+18,"#eeeeee",1.2)}else if(i==="quarry")for(let m=0;m<4;m++){let v=m*48;p(a,0,v,256,v,e.joint,1.6),p(a,0,v+1.8,256,v+1.8,e.rim,.8),p(l,0,v,256,v,"#383838",1.8);for(let M=0;M<4;M++){let _=M*66+m%2*28;a.fillStyle=(M+m)%2?"rgba(130,75,45,.08)":"rgba(255,236,210,.06)",a.fillRect(_,v+2,64,44),p(a,_,v,_+1.5,v+48,e.joint,1.3),p(l,_,v,_+1.5,v+48,"#383838",1.5)}}else if(i==="cinder")for(let m=0;m<4;m++){let v=m*48;p(a,0,v,256,v,"#ff6e26",1.35),p(a,0,v+1.2,256,v+1.2,"#3d2224",1),p(l,0,v,256,v,"#242424",2);for(let M=0;M<4;M++){let _=M*68+m%2*30;a.fillStyle=(M+m)%2?"rgba(32,20,28,.16)":"rgba(255,120,60,.05)",a.fillRect(_,v+2,66,44),p(a,_,v,_+2,v+48,"rgba(255,108,42,.52)",1.2),p(l,_,v,_+2,v+48,"#282828",1.6)}}else if(i==="ice"){for(let m=0;m<192;m+=48)p(a,0,m,256,m,e.joint,1.2),p(a,0,m+1.5,256,m+1.5,"#ffffff",.9),p(l,0,m,256,m,"#505050",1.4);for(let m=0;m<14;m++){let v=m*61%244,M=m*43%176;p(a,v,M,v+18,M+16,"rgba(255,255,255,.72)",1.5),p(a,v+8,M+8,v+21,M+6,"rgba(110,195,235,.55)",1),p(l,v,M,v+18,M+16,"#f0f0f0",1.5)}}for(let m of[-1,1]){let v=m<0?1.6:250.4;a.fillStyle="rgba(24,34,48,.42)",a.fillRect(v,0,4,192),a.fillStyle="rgba(255,250,242,.55)",a.fillRect(v+.8,0,.9,192);for(let M of[28,125])a.fillStyle="#5f6b7d",a.fillRect(v-.6,M,5.4,11),a.fillStyle=e.lampGlow||e.rim,a.fillRect(v+.7,M+2.2,2.8,4.2)}for(let m of[256/3,512/3]){a.fillStyle=e.line,a.fillRect(m-1.7,0,3.4,192),a.fillStyle=e.rim,a.fillRect(m-.3,0,1.15,192);for(let v=8;v<192;v+=32)a.fillStyle=e.rim,a.fillRect(m-1.5,v,3,9.5)}let x=new Bn(r);x.colorSpace=At,x.wrapT=wi,x.anisotropy=4,x.repeat.y=Ph/8;let g=new Bn(o);return g.wrapT=wi,g.repeat.y=Ph/8,{map:x,bumpMap:g}}function $2(i,e){let t=new Map,n,s=Sg("quay");t.set("quay",s);let r=new qn({map:s.map,bumpMap:s.bumpMap,bumpScale:.045,roughness:.76,metalness:.08}),a=new Qe(new Ot(bd,Ph,1,100),r);a.rotation.x=-Math.PI/2,a.position.set(0,0,La),a.receiveShadow=!0,i.add(a);let o=(d,h)=>new kn(d,h,Ph,1,1,100),l=[Je(o(bd+.16,.42),"#4e586e",0,-.22,La)];for(let d of[-1,1]){let h=d*bd/2;l.push(Je(o(.16,.22),"#7e8699",h,.03,La)),l.push(Je(o(.115,.052),"#d6dce8",h+d*.01,.148,La)),l.push(Je(o(.06,.24),"#3b4356",h+d*.085,-.14,La)),l.push(Je(o(.055,.025),"#9ea4b2",h-d*.09,.008,La))}let c=new qn({vertexColors:!0,roughness:.56,metalness:.28}),u=new Qe(bn(l),c);i.add(u),e.cutDeck(a.material),e.cutDeck(u.material);let f={quay:[.76,.08,.045],timber:[.84,.04,.06],quarry:[.86,.05,.065],forge:[.46,.42,.055],ice:[.34,.16,.04],cinder:[.74,.14,.065]};return d=>{let h=d.route.theme;if(t.has(h)||t.set(h,Sg(h)),n!==h){let x=t.get(h);r.map=x.map,r.bumpMap=x.bumpMap;let[g,m,v]=f[h]||f.quay;r.roughness=g,r.metalness=m,r.bumpScale=v,r.needsUpdate=!0,c.color.set(ei[h].railTop||"#ffffff"),n=h}let p=d.distance/8%1;r.map.offset.y=p,r.bumpMap.offset.y=p}}function Eg(i,e){let t=[],n=[];function s(a,o,l,c,u,f,d,h){let p=l/2,x=[[-p,0],[p,0],[p+u,-c],[-p+u,-c]],g=[[-p+h,-h],[p-h,-h],[p+u-h,-c+h],[-p+u+h,-c+h]],m=[...x,...g],v=[0,0,0,0,f,f,d,d],M=[4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7];for(let _ of M){let b=m[_];t.push(a+b[0],.008,o+b[1]),n.push(1,1,1,v[_])}}s(0,.1,i*1.01,e*.87,e*.92,.34,.22,.045),s(0,.17,i+.06,.32,.028,.22,.16,.07);let r=new St;return r.setAttribute("position",new $e(t,3)),r.setAttribute("color",new $e(n,4)),r}function J2(i,e){let t=_i,n=1.09,s=.17;function r(M){let _=M?"#f5c218":"#1f83ec",b=M?"#9c7112":"#1b53a0",S=M?"#fff078":"#8fd5ff",y=[],E=[Je(on(t-.1,n,s,.047),_,0,n/2,0)];for(let R of[-1,1]){let A=R*(t/2-.046);E.push(Je(on(.085,n+.087,.205),S,A,n/2+.021,0)),y.push(Je(on(.23,.13,.4,.035),b,A,.065,.058)),E.push(Je(on(.13,.19,.23,.027),b,A,n-.04,0)),E.push(Je(on(.115,.044,.24),S,A,n-.09,0))}E.push(Je(on(t-.16,.047,.123),S,0,n-.012,-.003));let C=bn(E);return C.rotateX(Sd),C.translate(0,.059,.015),bn([C,...y])}let a=new Ot(t-.19,n-.086);a.translate(0,n/2+.007,s/2+.004),a.rotateX(Sd),a.translate(0,.059,.015);let o=Eg(t,n),l=vg(),c=new qn({vertexColors:!0,roughness:.36,metalness:.32}),u=new gt({map:l.map,toneMapped:!1});u.customProgramCacheKey=()=>"gate-sign-atlas",u.onBeforeCompile=M=>{M.vertexShader=`attribute vec2 signCell;
`+M.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
vMapUv = vMapUv * vec2(${l.scaleU.toFixed(6)}, ${l.scaleV.toFixed(6)}) + signCell;`)};let f=64,d=new Ft(r(!1),c,f),h=new Ft(r(!0),c,f),p=new Jt(new Float32Array(f*2),2);p.setUsage(Gt),a.setAttribute("signCell",p);let x=new Ft(a,u,f),g=new Ft(o,e,f);g.renderOrder=1;for(let M of[d,h,x,g])M.count=0,M.visible=!1,M.frustumCulled=!1,M.instanceMatrix.setUsage(Gt),i.add(M);g.instanceMatrix=x.instanceMatrix;let m=new Ke;function v(M,_){M.count=_,M.visible=_>0,_>0&&(M.instanceMatrix.clearUpdateRanges(),M.instanceMatrix.addUpdateRange(0,_*16),M.instanceMatrix.needsUpdate=!0)}return(M,_)=>{let b=0,S=0,y=0;for(let E of M){if(y>=f)break;if(!E.active&&!(E.pop<.28)||E.z<Jo||E.z>=Da)continue;let C=l.cells.get(E.type);if(!C)continue;let R=E.active?0:E.pop/.28,A=(1+.24*Math.sin(Math.PI*R)+(E.flash||0)*.08)*(1-R*R);m.makeScale(A,A*(1-_)*(1+.18*Math.sin(R*Math.PI)),A),m.setPosition(E.x+.22*(E.x<0?1:-1)*R,Math.sin(R*Math.PI)*.38-_*.13,E.z),cn[E.type].tone==="gold"?h.setMatrixAt(S++,m):d.setMatrixAt(b++,m),x.setMatrixAt(y,m),p.setXY(y,C[0],C[1]),y++}v(d,b),v(h,S),v(x,y),g.count=y,g.visible=y>0,y>0&&(p.clearUpdateRanges(),p.addUpdateRange(0,y*2),p.needsUpdate=!0)}}var j2=[[[[-.72,1.01],[-1.01,1.09],[-1.19,1.01],[-1.41,1.17]],[[-1.01,1.09],[-.93,1.24],[-1.02,1.39],[-.89,1.56]],[[-1.19,1.01],[-1.32,.86],[-1.51,.81]]],[[[-1.41,1.17],[-1.59,1.12],[-1.74,1.22],[-1.96,1.2]],[[-.72,1.01],[-.83,.82],[-.69,.66],[-.72,.53],[-.51,.31],[-.58,.15]],[[.48,1.18],[.65,1.33],[.82,1.36],[.95,1.56]],[[.65,1.33],[.72,1.08],[.98,.68],[1.19,.63],[1.38,.43]]],[[[.98,.68],[1.21,.88],[1.41,.8],[1.63,.97],[1.9,.9]],[[1.19,.63],[1.1,.42],[1.2,.31],[1.12,.12]],[[-.72,.53],[-1.03,.51],[-1.21,.37],[-1.47,.4]],[[-1.02,1.39],[-1.29,1.42],[-1.46,1.56]]]];function Q2(i){let e=[];for(let t of i)for(let n=1;n<t.length;n++){let[s,r]=t[n-1],[a,o]=t[n],l=Math.hypot(a-s,o-r)+.018,c=new qt(0,0,Math.atan2(o-r,a-s)),u=n===1?.042:.033;e.push(Je(new Ot(l,u),"#25222f",(s+a)/2,(r+o)/2,.228,c)),e.push(Je(new Ot(l,u*.4),"#f2e5d6",(s+a)/2,(r+o)/2+u*.42,.23,c))}return bn(e)}function eS(i,e){let t=new Nt;i.add(t);let n=4.28,s=1.65,r=[Je(on(n-.08,s-.08,.41,.06),"#525969",0,s/2,0)];for(let x of[-1,1]){let g=x*(n/2-.085);r.push(Je(on(.18,s+.04,.5,.04),"#7b8496",g,s/2,0)),r.push(Je(on(.14,s-.14,.036),"#9aa4b5",g,s/2,.242));for(let m of[.16,s-.16]){let v=new qt(Math.PI/2,0,0);r.push(Je(new an(.076,.076,.025,10),"#343a47",g,m,.265,v)),r.push(Je(new an(.052,.061,.036,6),"#d9b56c",g,m,.285,v))}}for(let x of[.11,s-.09]){r.push(Je(on(n-.26,.16,.45,.02),"#333947",0,x,0));for(let g=-5;g<=5;g++)(g+10)%2===0&&r.push(Je(on(.24,.135,.035),"#f7be31",g*.34,x,.228,new qt(0,0,-.35)))}r.push(Je(on(1.96,.86,.04,.02),"#394152",0,.84,.215));let a=document.createElement("canvas");a.width=256,a.height=112;let o=a.getContext("2d"),l=new Bn(a);l.colorSpace=At;let c=new Qe(new Ot(1.8,.79),new gt({map:l,transparent:!0,depthWrite:!1,toneMapped:!1}));c.position.set(0,.84,.258),t.add(c);let u,f=new qn({vertexColors:!0,roughness:.48,metalness:.38,emissive:16765606,emissiveIntensity:0});t.add(new Qe(bn(r),f));let d=new Qe(Eg(n,s),e);d.renderOrder=1,t.add(d);let h=new gt({vertexColors:!0}),p=j2.map(x=>{let g=new Qe(Q2(x),h);return t.add(g),g});return x=>{if(t.visible=!!(x&&x.hp>0&&x.z>=Jo&&x.z<Da),!t.visible)return;let g=Ue.clamp(x.flash||0,0,1);t.position.set(x.x,0,x.z),t.scale.set(1+g*.026,1-g*.032,1+g*.04);let m=Math.ceil(x.hp);m!==u&&(o.clearRect(0,0,a.width,a.height),o.font='900 100px "Arial Black",sans-serif',o.textAlign="center",o.textBaseline="middle",o.lineWidth=10,o.strokeStyle="#1b2230",o.strokeText(String(m),128,59),o.fillStyle="#fff5dc",o.fillText(String(m),128,59),l.needsUpdate=!0,u=m);let v=x.hp/Math.max(1,x.maxHp);f.emissiveIntensity=Math.sqrt(g)*.55,p[0].visible=v<.93,p[1].visible=v<=.67,p[2].visible=v<=.36}}function wg(i,e){let t=new Nt;t.name="Course",i.add(t);let n=bg(t,e),s=$2(t,n),r=new gt({color:2500930,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),a=J2(t,r),o=new Ft(new kn(1,.08,.07),new gt({toneMapped:!1}),80);o.frustumCulled=!1,o.instanceMatrix.setUsage(Gt),t.add(o);let l=new Ke,c=new be("#1d2b3f"),u=new be("#7dffdb"),f=bn([Je(on(.43,.32,.1,.04),"#3e505d",0,0,.01),Je(new ai(.132,.045,7,18,Math.PI),"#ffe3a2",0,.13,.04),Je(on(.12,.1,.022,.017),"#f3be63",0,0,.072)]),d=new Ft(f,new Yt({vertexColors:!0,shininess:48}),40);d.frustumCulled=!1,d.instanceMatrix.setUsage(Gt),t.add(d);let h=eS(t,r);return{update(p){let{gates:x,wall:g}=p;n.update(p),s(p);let m=p.parade?Ue.smoothstep(p.endTime,0,.4):0;a(m===1?[]:x,m);let v=0,M=0;for(let _ of x){if(!p.parade&&_.active&&_.cover?.hp>0&&_.z>Jo&&_.z<Da&&M<40&&(l.makeRotationX(Sd).setPosition(_.x+_i/2-.35,.72,_.z+.18),d.setMatrixAt(M++,l)),p.parade||!_.active||_.hp>=_.maxHp||_.z<-45||_.z>Da||v>78)continue;let b=_i-.38,S=b*_.hp/_.maxHp;for(let[y,E,C,R]of[[b,_.x,_.z+.18,c],[S,_.x-(b-S)/2,_.z+.22,u]])l.makeScale(y,1,1).setPosition(E,.13,C),o.setMatrixAt(v,l),o.setColorAt(v++,R)}d.count=M,d.visible=M>0,M&&(d.instanceMatrix.clearUpdateRanges(),d.instanceMatrix.addUpdateRange(0,M*16),d.instanceMatrix.needsUpdate=!0),o.count=v,o.visible=v>0,v&&(o.instanceMatrix.clearUpdateRanges(),o.instanceMatrix.addUpdateRange(0,v*16),o.instanceMatrix.needsUpdate=!0,o.instanceColor.clearUpdateRanges(),o.instanceColor.addUpdateRange(0,v*3),o.instanceColor.needsUpdate=!0),h(g)},dispose(){let p=new Set,x=new Set,g=new Set;t.traverse(m=>{m.isMesh&&(p.add(m.geometry),x.add(m.material),m.material.map&&g.add(m.material.map),m.material.bumpMap&&g.add(m.material.bumpMap),m.isInstancedMesh&&m.dispose())}),t.removeFromParent();for(let m of p)m.dispose();for(let m of x)m.dispose();for(let m of g)m.dispose()}}}var tS=new Ot(1,1),Ed=new Xn(1,16,10),jo=i=>new gt({color:i,toneMapped:!1}),nS=new Yt({color:4213080,shininess:65}),wd=jo(16760162),Tg=jo(13565951),Td=new D,S3=new D,iS=new D(0,1,0),Ad=Ue.clamp;function sS(){return new Bt({uniforms:{ink:{value:new be},style:{value:0},time:{value:0},progress:{value:0},after:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 tex;uniform vec3 ink;uniform float style,time,progress,after;
    void main(){ vec2 q=tex*2.-1.;float d,segment=1.;float scan=0.;
      if(style<.5){d=length(q);segment=step(.24,fract(atan(q.y,q.x)*1.91+.1));scan=1.-smoothstep(.015,.045,abs(d-progress*.92));}
      else{float w=style>1.5?mix(.09,1.,tex.y):1.;d=abs(q.x)/w;
        segment=step(.18,fract(tex.y*17.));scan=1.-smoothstep(.017,.045,abs(tex.y-progress));}
      float aa=max(fwidth(d)*1.4,.016);
      float mask=1.-smoothstep(1.-aa,1.,d);
      float edge=smoothstep(.84-aa,.89,d)*(1.-smoothstep(.97,1.,d));
      float hatch=.045*step(.70,fract(q.x*3.5+q.y*5.));
      float a=(.085+hatch+.53*edge*segment+.27*scan+.15*progress)*mask*(1.-after);
      gl_FragColor=vec4(mix(ink,vec3(1.),edge*.35),a);
      #include <colorspace_fragment>
    }`})}function qi(i,e,t){let n=new Qe(i,e);return t.add(n),n}function rS(i,e,t,n){Td.subVectors(t,e);let s=Td.length();i.position.copy(e).lerp(t,.5),i.scale.set(n,s,n),i.quaternion.setFromUnitVectors(iS,Td.normalize())}function aS(i){let e=new Nt;i.add(e);let t=sS(),n=qi(tS,t,e);n.renderOrder=3;let s=new Nt;e.add(s);let r=new Yt({color:3330759,emissive:1210479,transparent:!0,opacity:.8,shininess:90});qi(Ed,r,s).scale.set(.42,.28,.45);let a=qi(new ai(.46,.053,6,25,Math.PI*1.65),Tg,s);a.rotation.x=-1.2;let o=new Nt;e.add(o),qi(Ed,nS,o).scale.set(.235,.29,.235),qi(new ai(.235,.04,6,20),wd,o).rotation.x=1.3;let c=qi(Ed,wd,o);c.position.y=.22,c.scale.setScalar(.12);let u=qi(new an(1,.2,1,12,1,!0),new gt({color:6478335,transparent:!0,opacity:.41,toneMapped:!1,depthWrite:!1,side:Zt}),e),f=new Nt;e.add(f);let d=[jo("#e8beff"),jo("#ab65dd"),jo("#83eaff")];for(let x=0;x<7;x++){let g=qi(new Ti(1,1,5),d[x%2],f),m=x*2.4;g.position.set(Math.cos(m)*(.27+x*.05),.4,Math.sin(m)*(.27+x*.05)),g.rotation.set(Math.sin(m)*.32,x*.9,Math.cos(m)*.38),g.scale.set(.13+x%3*.035,.66+x%3*.35,.17)}let h=new Nt;e.add(h);for(let x=0;x<7;x++)qi(new fi(1),Tg,h).scale.set(.055,.09,.28);let p=qi(new ai(1,.09,6,32,Math.PI*1.4),wd,e);return p.rotation.x=-Math.PI/2,{root:e,mat:t,mark:n,bubble:s,shell:o,beam:u,ridge:f,streaks:h,wave:p}}function Ag(i){let e=Array.from({length:3},()=>aS(i)),t=new D,n=new D;return function(r){let a=r.skill;e.forEach((o,l)=>{let c=a?.marks[l];if(o.root.visible=!!c&&!r.defeated,!o.root.visible)return;let u=a.age-c.delay,f=Xh(a,c),d=Ad((u-a.warm-a.flight)/.62,0,1),h=u>=a.warm,p=f>=1,x=c.x-a.x,g=c.z-a.z,m=o.mat.uniforms;m.ink.value.set(En[a.kind].color);let v=Ad(u/a.warm,0,1);if(m.progress.value=h?f:v,m.after.value=d,m.time.value=a.age,m.style.value=c.shape==="circle"?0:c.shape==="strip"?1:2,o.mark.visible=u>=-.12&&d<1,c.shape==="circle")o.mark.rotation.set(-Math.PI/2,0,0),o.mark.scale.set(2*c.radius,2*c.radius,1),o.mark.position.set(c.x,.059,c.z);else{let S=Math.hypot(x,g),y=Math.atan2(x,g);o.mark.position.set((c.x+a.x)/2+Math.sin(y)*.82,.06,(c.z+a.z)/2+Math.cos(y)*.82),o.mark.rotation.order="YXZ",o.mark.rotation.set(Math.PI/2,y,0),o.mark.material.side=Zt,o.mark.scale.set(2*c.radius,S+1.64,1)}let M=h&&!p;o.bubble.visible=M&&a.kind==="diver",o.shell.visible=M&&a.kind==="engine";let _=o.bubble.visible?o.bubble:o.shell;if(_.visible){let S=a.x+(l?1:-1)*.8,y=a.kind==="engine"?4.6:.57;_.position.set(Ue.lerp(S,c.x,f),a.height*(1-f)+.17+Math.sin(Math.PI*f)*y,Ue.lerp(a.z,c.z,f)),_.rotation.y=f*7}let b=a.kind==="kestrel";if(o.beam.visible=b&&h&&d<.82,o.streaks.visible=o.beam.visible,o.beam.visible){let S=Ad(f*1.25,0,1);t.set(a.x,a.height,a.z+.59),n.set(c.x,.34,c.z).lerp(t,1-S),rS(o.beam,t,n,c.radius*(1-d*.55)),o.beam.material.opacity=(.31+.12*Math.sin(a.age*24))*(1-d),o.streaks.children.forEach((y,E)=>{let C=(a.age*1.9+E*.136)%1;y.position.copy(t).lerp(n,C),y.position.x+=Math.sin(E*1.8+a.age*11)*C*.78,y.position.y+=Math.cos(E*1.4+a.age*12)*C*.26})}o.ridge.visible=a.kind==="drill"&&p&&d<1,o.ridge.visible&&(o.ridge.position.set(c.x,.025,c.z),o.ridge.scale.set(1,Math.max(.02,Math.sin(Math.PI*Math.pow(d,.58))*1.35),1)),o.wave.visible=M&&(a.kind==="bruiser"||a.kind==="warden"),o.wave.visible&&(o.wave.position.set(a.x+x*f,.13,a.z+g*f),o.wave.scale.set(1.1+.37*f,.4+.25*f,1),o.wave.rotation.z=Math.atan2(x,g)-.59)})}}var Rd=128,Cd=4,ge={glow:0,smoke:1,glint:2,wave:3,crack:4,plus:5,arrow:6,flash:7,goldWave:8,ember:9};function oS(){let i=document.createElement("canvas");i.width=i.height=Rd*Cd;let e=i.getContext("2d");function t(a,o){e.save(),e.translate((a%Cd+.5)*Rd,(Math.floor(a/Cd)+.5)*Rd),o(),e.restore()}function n(a,o,l,c){let u=e.createRadialGradient(a,o,0,a,o,l);for(let[f,d]of c)u.addColorStop(f,d);e.fillStyle=u,e.fillRect(a-l,o-l,l*2,l*2)}let s="rgba(255,255,255,0)";t(ge.glow,()=>{n(0,0,57,[[0,"#fff"],[.18,"rgba(255,255,255,.94)"],[.43,"rgba(255,255,255,.41)"],[1,s]])}),t(ge.smoke,()=>{let a=[[-14,8,37],[18,8,32],[9,-13,32],[-15,-13,27],[3,3,40]];for(let[o,l,c]of a)n(o,l,c,[[0,"rgba(255,255,255,.62)"],[.38,"rgba(255,255,255,.42)"],[.77,"rgba(255,255,255,.13)"],[1,s]])}),t(ge.glint,()=>{n(0,0,44,[[0,"#fff"],[.16,"rgba(255,255,255,.9)"],[1,s]]),e.fillStyle="#fff",e.beginPath();for(let a=0;a<8;a++){let o=a*Math.PI/4,l=a%2?5:a%4?45:32,c=Math.cos(o)*l,u=Math.sin(o)*l;a===0?e.moveTo(c,u):e.lineTo(c,u)}e.closePath(),e.fill()}),t(ge.wave,()=>{n(0,0,60,[[0,s],[.7,s],[.78,"rgba(255,255,255,.26)"],[.86,"rgba(255,255,255,.94)"],[.9,"rgba(255,255,255,.60)"],[1,s]])}),t(ge.goldWave,()=>{n(0,0,58,[[0,"rgba(255,255,255,.25)"],[.41,"rgba(255,255,255,.08)"],[.66,s],[.81,"rgba(255,255,255,.18)"],[.88,"#fff"],[.92,"rgba(255,255,255,.65)"],[1,s]])}),t(ge.crack,()=>{n(0,0,40,[[0,"#c14d0d"],[.19,"rgba(158,63,22,.9)"],[.62,"rgba(80,52,51,.24)"],[1,"rgba(80,52,51,0)"]]);let a=783,o=()=>(a=a*16807%2147483647,a/2147483647);e.lineCap="round",e.lineJoin="round";for(let l=0;l<11;l++){let c=(l+o()*.55)*2*Math.PI/11,u=31+o()*29,f=0,d=0;for(let h=1;h<=4;h++){let p=c+(o()-.5)*.23,x=u*h/4,g=Math.cos(p)*x,m=Math.sin(p)*x;if(e.beginPath(),e.moveTo(f,d),e.lineTo(g,m),e.lineWidth=(5-h)*.62+.35,e.strokeStyle=h===1?"#793714":"#493e41",e.stroke(),h===2||h===3){let v=p+(o()>.5?.65:-.66);e.beginPath(),e.moveTo(g,m),e.lineTo(g+Math.cos(v)*9,m+Math.sin(v)*9),e.lineWidth=1,e.stroke()}f=g,d=m}}e.beginPath();for(let l=0;l<15;l++){let c=l*Math.PI*2/15,u=5+o()*10,f=Math.cos(c)*u,d=Math.sin(c)*u;l?e.lineTo(f,d):e.moveTo(f,d)}e.closePath(),e.fillStyle="#ff9021",e.fill()}),t(ge.plus,()=>{e.font="1000 80px Arial Black, Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.strokeStyle="#754508",e.lineWidth=9,e.strokeText("+1",0,6,110),e.strokeStyle="#422916",e.lineWidth=6.5,e.strokeText("+1",0,2,110);let a=e.createLinearGradient(0,-28,0,32);a.addColorStop(0,"#fff592"),a.addColorStop(.31,"#fff020"),a.addColorStop(1,"#ffbe00"),e.fillStyle=a,e.fillText("+1",0,2,110)}),t(ge.arrow,()=>{e.shadowColor="#00baff",e.shadowBlur=9,e.beginPath(),e.moveTo(0,-47),e.lineTo(35,-7),e.lineTo(16,-7),e.lineTo(16,40),e.lineTo(-16,40),e.lineTo(-16,-7),e.lineTo(-35,-7),e.closePath();let a=e.createLinearGradient(0,-45,0,40);a.addColorStop(0,"#f2ffff"),a.addColorStop(.45,"#67fff4"),a.addColorStop(1,"rgba(10,201,255,.38)"),e.fillStyle=a,e.fill(),e.shadowBlur=0,e.lineWidth=2,e.strokeStyle="rgba(227,255,255,.82)",e.stroke()}),t(ge.flash,()=>{n(0,0,58,[[0,"#fff"],[.21,"#fff"],[.36,"rgba(255,255,255,.85)"],[.71,"rgba(255,255,255,.18)"],[1,s]]);for(let a=0;a<9;a++){let o=a*Math.PI*2/9+.2,l=a%3===1?48:31;e.save(),e.rotate(o),e.beginPath(),e.moveTo(8,-4.2),e.lineTo(l,0),e.lineTo(8,4.2),e.closePath(),e.fillStyle="rgba(255,255,255,.76)",e.fill(),e.restore()}}),t(ge.ember,()=>{e.save(),e.scale(.45,1),n(0,0,53,[[0,"#fff"],[.37,"#fff"],[.65,"rgba(255,255,255,.58)"],[1,s]]),e.restore()});let r=new Bn(i);return r.colorSpace=At,r}function Rg(i,e,t,n=!1,s=8){let r=new Ot(1,1),a=new Os;a.setIndex(r.index),a.setAttribute("position",r.getAttribute("position")),a.setAttribute("uv",r.getAttribute("uv"));let o={};for(let[f,d]of[["anchor",3],["sizeModeTile",4],["tint",4],["rotation",1]]){let h=new Jt(new Float32Array(e*d),d);h.setUsage(Gt),a.setAttribute(f,h),o[f]=h}let l=new Bt({uniforms:{atlas:{value:t}},transparent:!0,depthWrite:!1,side:Zt,toneMapped:!1,blending:n?Gn:Bs,vertexShader:`
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
      }`});l.forceSinglePass=!0;let c=new Qe(a,l);c.frustumCulled=!1,c.renderOrder=s,a.instanceCount=0,i.add(c);let u=0;return{clear(){u=0},write(f,d,h,p,x,g,m,v,M,_=0){u>=e||M<.008||(o.anchor.setXYZ(u,f,d,h),o.sizeModeTile.setXYZW(u,p,x,g?1:0,m),o.tint.setXYZW(u,v.r,v.g,v.b,M),o.rotation.setX(u,_),u++)},flush(){if(c.visible=u>0,a.instanceCount=u,!!u)for(let f of Object.values(o))f.clearUpdateRanges(),f.addUpdateRange(0,u*f.itemSize),f.needsUpdate=!0}}}function Pd(i,e){let t=i.map(([a,o])=>new ye(o,a)),n=new So(t,e),s=new Float32Array(n.attributes.position.count*3),r=i.map(([,,a])=>new be(a));for(let a=0;a<n.attributes.position.count;a++)r[a%r.length].toArray(s,a*3);return n.setAttribute("color",new zt(s,3)),n.rotateX(-Math.PI/2),n}function Ih(i,e,t,n,s){let r=new Ft(e,t,n);return r.instanceMatrix.setUsage(Gt),r.count=0,r.frustumCulled=!1,r.renderOrder=s,i.add(r),r}var Me=Object.fromEntries(Object.entries({white:"#ffffff",pearl:"#fff5dc",aqua:"#64ffff",blue:"#18ccff",gold:"#ffd02f",orange:"#ff861d",fire:"#ff5a16",violet:"#c181ff",frost:"#a0edff",surf:"#68f4d5",dust:"#ece0cd",smoke:"#928180",steel:"#8f99a3"}).map(([i,e])=>[i,new be(e)])),lS=["#555c69","#8e97a3","#abb4bc","#727986","#a5a7aa"].map(i=>new be(i)),Mt=(i,e)=>i+(e-i)*Math.random(),Ir=(i,e,t)=>Math.min(t,Math.max(e,i)),Jn=Math.PI*2;function cS(i,e){let t=new Ot(1,1,5,1),n=new Os().copy(t),s=new Jt(new Float32Array(e*3),3),r=new Jt(new Float32Array(e*3),3),a=new Jt(new Float32Array(e*4),4);for(let[c,u]of[["trailStart",s],["trailEnd",r],["trailStyle",a]])n.setAttribute(c,u.setUsage(Gt));let o=new Bt({transparent:!0,depthWrite:!1,toneMapped:!1,blending:Gn,side:Zt,vertexShader:`
      attribute vec3 trailStart, trailEnd;
      attribute vec4 trailStyle;
      varying vec2 vUv;
      varying vec2 vStyle;
      void main() {
        float t = uv.x;
        vec3 path = trailEnd - trailStart;
        vec3 center = mix(trailStart, trailEnd, t);
        center.y += 4.0*t*(1.0-t)*trailStyle.x;
        path.y += 4.0*(1.0-2.0*t)*trailStyle.x;
        vec3 side = normalize(cross(path, cameraPosition-center));
        float radius = trailStyle.y * mix(0.24,1.15,smoothstep(0.0,0.8,t));
        vec3 vertex = center + side*(uv.y*2.0-1.0)*radius;
        gl_Position = projectionMatrix*viewMatrix*vec4(vertex,1.0);
        vUv=uv; vStyle=trailStyle.zw;
      }`,fragmentShader:`
      varying vec2 vUv;
      varying vec2 vStyle;
      void main() {
        float edge=abs(vUv.y*2.0-1.0);
        float pulse=step(0.5,vStyle.x)*(1.0-step(1.5,vStyle.x));
        float flame=step(1.5,vStyle.x)*(1.0-step(2.5,vStyle.x));
        float elite=step(2.5,vStyle.x);
        float gap=smoothstep(0.33,0.39,vUv.x)*(1.0-smoothstep(0.48,0.55,vUv.x));
        vec3 rim=mix(vec3(.06,.56,1.0),vec3(.08,.92,.84),pulse);
        rim=mix(rim,vec3(1.0,.36,.04),flame);
        rim=mix(rim,vec3(1.0,.78,.14),elite);
        vec3 core=mix(vec3(.82,1.0,1.0),vec3(1.0,.94,.62),max(flame,elite));
        float alpha=(1.0-smoothstep(.58,1.0,edge))*smoothstep(0.0,.24,vUv.x);
        gl_FragColor=vec4(mix(rim,core,(1.0-smoothstep(.08,.56,edge))*vUv.x),alpha*vStyle.y*(1.0-.88*pulse*gap));
        #include <colorspace_fragment>
      }`});o.forceSinglePass=!0;let l=new Qe(n,o);return l.frustumCulled=!1,l.renderOrder=4,n.instanceCount=0,i.add(l),{write(c,u,f,d,h,p,x){s.setXYZ(c,u.x,u.y,u.z),r.setXYZ(c,f.x,f.y,f.z),a.setXYZW(c,d,h,p,x)},flush(c){if(n.instanceCount=c,l.visible=c>0,!!c)for(let u of[s,r,a])u.clearUpdateRanges(),u.addUpdateRange(0,c*u.itemSize),u.needsUpdate=!0}}}function Cg(i){let e=oS(),t=Rg(i,420,e,!1,8),n=Rg(i,560,e,!0,9),s=Ih(i,Pd([[-.38,.006,"#13a8ff"],[-.16,.038,"#3de5ff"],[.12,.056,"#c4fdff"],[.28,.036,"#f2ffff"],[.36,.004,"#ffffff"]],7),new gt({vertexColors:!0,toneMapped:!1}),360,3),r=Ih(i,Pd([[-.38,.003,"#b9430d"],[-.37,.127,"#dd7117"],[-.31,.18,"#ff9c1a"],[-.25,.19,"#ffc32d"],[-.21,.158,"#ef8d18"],[-.15,.166,"#ffb824"],[.23,.175,"#ffce36"],[.37,.16,"#ffcb2c"],[.48,.117,"#ffdb46"],[.54,.059,"#ffdc56"],[.56,.001,"#fff1a3"]],14),new Yt({vertexColors:!0,emissive:3609856,specular:16772528,shininess:62}),24,3),a=Ih(i,Pd([[-1.52,.003,"#ef5615"],[-1.18,.07,"#fc641b"],[-.77,.114,"#ff9f13"],[-.49,.149,"#ffe039"],[-.31,.112,"#fff8af"]],10),new gt({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1}),24,6),o=Ih(i,new gr(1,0),new Yt({color:16777215,specular:5660779,shininess:18}),88,2),l=336,c=new Float32Array(l*2*3),u=new Float32Array(l*2*3),f=new St,d=new zt(c,3).setUsage(Gt),h=new zt(u,3).setUsage(Gt);f.setAttribute("position",d),f.setAttribute("color",h),f.setDrawRange(0,0);let p=new pr(f,new Ns({vertexColors:!0,transparent:!0,opacity:.96,depthWrite:!1,toneMapped:!1,blending:Gn}));p.frustumCulled=!1,p.renderOrder=10,i.add(p);let x=new Lt,g=[],m=[],v=[],M=[],_=5;function b(te,H,j,z,Ge,de,Re,ce={}){if(g.length>=260){if(!ce.priority&&te!==ge.plus&&te!==ge.arrow&&te!==ge.crack)return;let J=g.findIndex(W=>W.tile===ge.smoke||W.tile===ge.glint||W.tile===ge.glow);if(J<0)return;v.push(g[J]),g[J]=g[g.length-1],g.pop()}let N=v.pop()||{};N.tile=te,N.x=H,N.y=j,N.z=z,N.start=Ge,N.end=de,N.life=Re,N.age=0,N.color=ce.color||Me.white,N.alpha=ce.alpha??1,N.ratio=ce.ratio??1,N.vx=ce.vx||0,N.vy=ce.vy||0,N.vz=ce.vz||0,N.gravity=ce.gravity||0,N.angle=ce.angle||0,N.spin=ce.spin||0,N.flat=ce.flat||!1,N.world=ce.world??!0,N.hold=ce.hold??.12,g.push(N)}function S(te,H,j,z,Ge,de){for(let Re=0;Re<Ge;Re++){let ce=(Re+Math.random()*.5)*Jn/Ge,N=Mt(.12,.42)*z,J=Mt(.75,2.15)*z;b(ge.smoke,te+Math.cos(ce)*N,H+Mt(.02,.14),j+Math.sin(ce)*N,Mt(.23,.47)*z,Mt(.71,1.12)*z,Mt(.36,.6),{color:de,alpha:Mt(.4,.63),vx:Math.cos(ce)*J,vz:Math.sin(ce)*J,vy:Mt(.35,1.05),spin:Mt(-1.5,1.5),angle:ce})}}function y(te,H,j,z,Ge){for(let de=0;de<Ge;de++){let Re=(de+Math.random())*Jn/Ge,ce=Mt(1.8,4.3)*z;b(ge.ember,te,H,j,Mt(.22,.39)*z,.035,Mt(.21,.42),{color:de%3?Me.orange:Me.pearl,vx:Math.cos(Re)*ce,vz:Math.sin(Re)*ce,vy:Mt(.8,2.5)*z,gravity:5,angle:Re,spin:Mt(-2,2),ratio:1.7})}}let E=["#65d8cd","#dafff3","#4cb9b2"].map(te=>new be(te)),C=["#e4b879","#925c3b","#c28b57"].map(te=>new be(te));function R(te,H,j,z,Ge,de=!1,Re=lS){for(let ce=0;ce<z&&m.length<o.instanceMatrix.count;ce++){let N=M.pop()||{};if(N.x=te+Mt(-1.75,1.75)*Ge,N.y=H+Mt(.14,.9),N.z=j+Mt(-.24,.3),N.vx=Mt(-2.8,2.8),N.vz=Mt(-1.8,3.5),N.vy=Mt(2.2,5.2),de){let J=(ce+Math.random())*Jn/z,W=Mt(2.2,4.4);N.x=te+Math.cos(J)*.48,N.z=j+Math.sin(J)*.48,N.vx=Math.cos(J)*W,N.vz=Math.sin(J)*W}N.size=Mt(.085,.245)*Ge,N.stretch=Mt(.52,1.65),N.rx=Mt(-2,2),N.ry=Mt(-2,2),N.spin=Mt(2,8),N.age=0,N.life=Mt(.52,1.04),N.color=Re[ce%Re.length],m.push(N)}}let A=new Bi(1,2),L=new Bt({uniforms:{age:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec3 orb; varying vec3 eye; varying vec3 n; void main(){
      orb=position;vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);
      eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,fragmentShader:`varying vec3 orb;varying vec3 eye;varying vec3 n;uniform float age;
      void main(){float swirl=sin(orb.y*9.+sin(orb.z*5.+age*8.))*sin(orb.x*6.-age*6.);
        float heat=clamp(max(0.,dot(normalize(n),normalize(eye)))+.13*swirl-age*.7,0.,1.);
        vec3 fire=mix(vec3(.94,.16,.026),vec3(1.,.80,.20),smoothstep(.12,.53,heat));
        fire=mix(fire,vec3(1.,.98,.77),smoothstep(.55,.86,heat));
        gl_FragColor=vec4(fire,1.-smoothstep(.52,1.,age));}`}),O=new Nt,I=[[0,.2,0,1.02],[-.62,.06,.08,.65],[.55,.14,-.2,.74],[-.16,.57,-.13,.64],[.33,.36,.36,.48]];for(let[te,H,j,z]of I){let Ge=new Qe(A,L);Ge.position.set(te,H,j),Ge.scale.setScalar(z),Ge.renderOrder=3,O.add(Ge)}O.visible=!1,i.add(O);let G=1;function q(te,H,j,z,Ge=1,de=null){let Re=cn[de]?.tone==="gold"?Me.gold:Me.surf,ce=Ir(Ge,.62,2.05);switch(te){case"cardHit":b(ge.glint,H,j,z+.1,.33,.72,.12,{color:Re}),y(H,j,z,.45,3);return;case"supplyBreak":b(ge.flash,H,j,z,.46,1.45,.13,{color:Me.pearl}),b(ge.wave,H,.07,z,.42,2.9,.36,{flat:!0,color:Re});for(let N of[-1,1])b(ge.glint,H+N*1.44,j,z,.48,.1,.33,{color:Re,vx:-N*3.6,vy:1.1,ratio:1.6});y(H,j,z,.73,6);return;case"shieldHit":b(ge.wave,H,.1,z,.4,1.75,.26,{flat:!0,color:Me.aqua}),b(ge.glint,H,j,z,.26,.68,.14,{color:Me.pearl});return;case"hostileMuzzle":b(ge.flash,H,j,z,.32,.63,.14,{color:Me.orange});return;case"bruiserCast":case"wardenCast":for(let N of[-1,1])S(H+N*.6,.16,z,1,4,Me.dust);return;case"diverCast":for(let N of[-1,1])b(ge.wave,H+N*.95,j,z,.32,1.45,.32,{color:Me.surf});return;case"drillCast":S(H,.2,z,1.21,7,Me.violet);return;case"kestrelCast":b(ge.glow,H,j,z+.43,.32,1.37,.36,{color:Me.frost});return;case"engineCast":for(let N of[-1,1])b(ge.flash,H+N*.72,j+.32,z-.2,.4,1.12,.17,{color:Me.orange});return;case"bruiserStrike":case"wardenStrike":b(ge.crack,H,.043,z,1.4,2.55,.77,{flat:!0,hold:.31}),S(H,.16,z,1.18,8,Me.dust),R(H,.12,z,7,.55,!0);return;case"diverStrike":b(ge.wave,H,.09,z,.31,2.29,.46,{flat:!0,color:Me.surf});for(let N=0;N<9;N++){let J=N*Jn/9;b(ge.glow,H,.22,z,.18,.06,.43,{color:Me.aqua,vx:Math.cos(J)*2.1,vz:Math.sin(J)*2.1,vy:1.5,gravity:3.6})}return;case"drillStrike":S(H,.17,z,.77,5,Me.violet),b(ge.glint,H,.35,z,.26,1,.19,{color:Me.violet});return;case"kestrelStrike":b(ge.wave,H,.08,z,.35,2.78,.54,{flat:!0,color:Me.frost}),S(H,.28,z,.98,7,Me.frost);return;case"engineStrike":b(ge.flash,H,.45,z,.82,2.2,.19,{color:Me.orange,priority:!0}),b(ge.wave,H,.07,z,.34,2.63,.37,{flat:!0,color:Me.gold}),S(H,.2,z,1.1,8,Me.smoke),y(H,.3,z,1.08,12);return;case"finisher":y(H,j,z,1.35,16),b(ge.flash,H,j,z,.65,1.45,.13,{color:Me.pearl});return;case"hit":if(_<1)return;_--,y(H,j,z,.48,3),b(ge.glint,H,j,z,.26,.47,.105,{color:Me.aqua,angle:Mt(0,Jn)});return;case"muzzle":b(ge.flash,H,j,z,.47*ce,.83*ce,.105,{color:Me.pearl,angle:Mt(0,Jn),world:!1}),b(ge.glow,H,j,z,.82*ce,.38*ce,.13,{color:Me.orange,alpha:.7,world:!1});return;case"impact":case"slam":{let N=te==="slam",J=ce*(N?1.4:1),W=N?.16:Math.max(.17,j*.58);if(N){R(H,.04,z,12,.61,!0);for(let Y of[-1,1])b(ge.flash,H+Y*.57,.12,z,.58,.93,.1,{color:Me.pearl})}b(ge.crack,H,.035,z,2.02*J,2.33*J,N?2:1.42,{flat:!0,angle:Mt(0,Jn),hold:.62}),b(ge.wave,H,.065,z,.42*J,N?2*2.05/.81:3.16*J,.32,{flat:!0,color:N?Me.gold:Me.pearl,alpha:.83}),b(ge.flash,H,W,z,.6*J,1.85*J,.16,{color:Me.gold,angle:Mt(0,Jn)}),b(ge.glow,H,W+.06,z,.39*J,.93*J,.1,{color:Me.pearl}),S(H,.17,z,J,N?12:7,N?Me.dust:Me.smoke),y(H,W,z,J,N?10:5);return}case"wallHit":b(ge.flash,H,Math.max(j,.4),z+.12,.38*ce,1.12*ce,.13,{color:Me.pearl}),S(H,Math.max(.35,j),z,.61*ce,3,Me.steel),y(H,Math.max(.4,j),z,.59*ce,3);return;case"wallBreak":R(H,.24,z,22,Math.min(1.17,ce)),b(ge.flash,H,.72,z,.85*ce,2.8*ce,.19,{color:Me.pearl}),b(ge.wave,H,.062,z,.6,4.7,.38,{flat:!0,color:Me.dust});for(let N=-1;N<=1;N++)S(H+N*1.17,.3,z,.98,4,Me.steel);y(H,.8,z,ce,7);return;case"plus":{b(ge.wave,H,.09,z,.12,1.28,.23,{flat:!0,color:Me.aqua});let N=Math.max(0,j);b(ge.goldWave,H,.055,z,.22,.96,.34,{flat:!0,world:!1,color:Me.gold}),b(ge.glow,H,N+.36,z,.45,.82,.28,{ratio:1.75,world:!1,color:Me.gold}),b(ge.glint,H+.08,N+.57,z,.35,.14,.23,{world:!1,color:Me.pearl}),b(ge.plus,H+Mt(-.13,.13),N+.83,z,.8,1.04,.65,{world:!1,vy:1.1,hold:.62});return}case"merge":{if(de==="range"||de==="longshot"){for(let J=0;J<3;J++)b(ge.arrow,H,.12,z-.8-J*.68,.72-J*.09,.22,.48+J*.04,{flat:!0,color:Re,vz:-3.3,world:!1});b(ge.wave,H,.07,z,.32,2.45,.35,{flat:!0,color:Re});return}b(ge.goldWave,H,.12,z,2.15,.32,.27,{flat:!0,color:Me.gold});let N=Ir(ce*1.55,1.5,2.5);b(ge.goldWave,H,.061,z,.38,N,.46,{flat:!0,world:!1,color:Me.aqua,hold:.3}),b(ge.goldWave,H,.077,z,.17,N*.72,.38,{flat:!0,world:!1,color:Me.gold}),b(ge.glow,H,j+.62,z,.77*ce,1.6*ce,.32,{color:Me.gold,world:!1,ratio:1.3,alpha:.72});for(let J=0;J<3;J++){let W=(J+.16)*Jn/3;b(ge.arrow,H+Math.cos(W)*N*.31,j+.3,z+Math.sin(W)*N*.34,.38,.65,.51+J*.035,{color:Me.white,hold:.42,vy:1.55+.15*J,world:!1})}return}case"victory":case"vaultLand":b(ge.wave,H,.06,z,.55,te==="victory"?3.9:2.7,.33,{flat:!0,color:Me.dust,alpha:.7});for(let N of[-1,1])S(H+N*.63,.12,z,.88,4,Me.dust);return;case"bossBurst":G=0,O.position.set(H,.8,z),O.visible=!0,b(ge.goldWave,H,.08,z,.6,5.55,.48,{flat:!0,color:Me.gold,priority:!0});for(let[N,J,W]of[[0,0,2.85],[-.58,.23,1.65],[.67,-.2,1.9]])b(ge.glow,H+N,j+.19,z+J,W*.54,W*1.13,.34,{color:Me.orange,vy:.83,priority:!0}),b(ge.flash,H+N,j+.22,z+J,W*.31,W,.22,{color:Me.gold,angle:N*2.4,vy:.9,priority:!0});b(ge.glint,H,j+.35,z,.8,2.65,.13,{color:Me.pearl,priority:!0}),R(H,.42,z,17,.91,!0),y(H,j+.38,z,1.57,24),S(H,.35,z,1.5,10,Me.smoke);return;case"glassBreak":R(H,j,z,18,.92,!1,E),b(ge.wave,H,.06,z,.5,4.85,.31,{flat:!0,color:Me.aqua});for(let N of[-1.09,0,1.09])b(ge.glint,H+N,j+.25,z,.19,.74,.2,{color:Me.pearl});return;case"crateBreak":R(H,j,z,16,1.04,!1,C),S(H,.32,z,.7,5,Me.smoke);return;case"latchHit":y(H,j,z,1.06,8);return;case"rally":b(ge.wave,H,.08,z,.46,3.05,.49,{flat:!0,color:Me.aqua});return;case"chainSnap":for(let N of[-1,1])y(H+N*1.86,1.04,z,1.15,9);b(ge.flash,H,j,z,.38,1.4,.15,{color:Me.pearl});return;case"evolve":b(ge.goldWave,H,.09,z,.5,4.8,.56,{flat:!0,world:!1,color:Me.gold,priority:!0}),b(ge.wave,H,.11,z,.35,3.6,.45,{flat:!0,world:!1,color:Me.aqua,priority:!0}),b(ge.flash,H,j+.9,z,.85,2.8,.25,{color:Me.gold,world:!1,priority:!0}),y(H,j+.65,z,1.35,16);for(let N=0;N<4;N++){let J=N*Jn/4+.4;b(ge.arrow,H+Math.cos(J)*.9,j+.45,z+Math.sin(J)*.7,.55,.95,.62,{color:Me.gold,vy:2.1,hold:.45,world:!1,priority:!0})}return;case"overdrive":b(ge.goldWave,H,.1,z,.6,8.2,.52,{flat:!0,world:!1,color:Me.gold,priority:!0}),b(ge.wave,H,.12,z,.5,6.4,.42,{flat:!0,world:!1,color:Me.orange,priority:!0}),b(ge.flash,H,j+.9,z,1.1,3.6,.26,{color:Me.pearl,world:!1,priority:!0}),y(H,j+.7,z,1.7,22);return;case"critHit":b(ge.glint,H,j,z,.45,1.15,.18,{color:Me.gold,angle:Mt(0,Jn),priority:!0}),b(ge.flash,H,j,z,.32,.95,.14,{color:Me.pearl,priority:!0}),y(H,j,z,.85,7);return;case"bossEnrage":b(ge.wave,H,.12,z,.7,7.2,.55,{flat:!0,color:Me.fire,priority:!0}),b(ge.flash,H,j+1.1,z,.9,3.4,.3,{color:Me.orange,priority:!0}),y(H,j+.9,z,1.5,18);return;case"barrelBlast":G=0,O.position.set(H,.72,z),O.visible=!0,b(ge.crack,H,.04,z,2.2*ce,2.9*ce,1.9,{flat:!0,angle:Mt(0,Jn),hold:.55,priority:!0}),b(ge.goldWave,H,.08,z,.55,5.4*ce,.42,{flat:!0,color:Me.orange,priority:!0}),b(ge.wave,H,.1,z,.4,4.4*ce,.34,{flat:!0,color:Me.gold,priority:!0}),b(ge.flash,H,j+.5,z,.9*ce,2.8*ce,.22,{color:Me.pearl,priority:!0}),R(H,.35,z,18,.85,!0),y(H,j+.4,z,1.45*ce,20),S(H,.32,z,1.35*ce,10,Me.smoke);return;case"lavaBurst":b(ge.wave,H,.09,z,.45,4.2*ce,.44,{flat:!0,color:Me.fire,priority:!0}),b(ge.flash,H,j+1.2,z,.85,2.6,.28,{color:Me.orange,ratio:2.2,priority:!0});for(let N=0;N<12;N++){let J=N*Jn/12+Mt(-.15,.15);b(ge.ember,H,.4,z,.32,.06,Mt(.45,.78),{color:N%2?Me.gold:Me.fire,vx:Math.cos(J)*Mt(1.2,3.2),vz:Math.sin(J)*Mt(1.2,3.2),vy:Mt(4.5,7.6),gravity:11,ratio:1.8,priority:!0})}S(H,.4,z,1.15,6,Me.smoke);return;case"discharge":b(ge.wave,H,.1,z,.45,8.5,.35,{flat:!0,color:Me.aqua}),b(ge.flash,H,j+.45,z,.63,3.4,.23,{color:Me.aqua});for(let N=0;N<7;N++){let J=N*Jn/7;b(ge.glint,H+Math.cos(J)*1.46,.5,z+Math.sin(J)*1.46,.25,1.03,.26,{color:Me.pearl,angle:J})}return}}let V=new D(0,0,-1),re=new D,X=new D,ee=new D,ae=cS(i,384);function Ie(te,H){let j=0,z=0,Ge=0;for(let de of te){let Re=de.kind==="rocket",ce=de.profile===Ji,N=de.profile===Fr||ce,J=Math.max(0,de.distance-de.profile.tail+de.afterHit*de.profile.speed);if(Or(de,J,X),de.distance-J>.012&&Ge<384){Or(de,(J+de.distance)*.5,ee);let W=ee.y-(X.y+de.y)*.5,Y=de.range>4?Ir((de.range-J)/1.6,0,1):1;ae.write(Ge++,X,de,W,Re?.128:ce?.118:de.crit?.1:N?.085:.068,Re?2:de.crit?3:N?1:0,Y*.96)}if(!de.finished){if(Or(de,de.distance+.015,ee),re.set(ee.x-de.x,ee.y-de.y,ee.z-de.z).normalize(),x.quaternion.setFromUnitVectors(V,re),x.position.set(de.x,de.y,de.z),!Re&&j<s.instanceMatrix.count){let W=de.crit?1.75:N?1.58:1.2;x.scale.set(W,W,N?.75:.95),x.updateMatrix(),s.setMatrixAt(j++,x.matrix),de.age<.05&&n.write(de.startX,de.startY,de.startZ,de.crit?.36:.26,de.crit?.36:.26,!1,ge.flash,de.crit?Me.gold:Me.aqua,.78*(1-de.age/.05))}else if(Re&&z<r.instanceMatrix.count){let W=.72+Math.min(.24,de.power*.068);x.scale.setScalar(W),x.updateMatrix(),r.setMatrixAt(z,x.matrix),x.scale.z*=1.05,x.updateMatrix(),a.setMatrixAt(z++,x.matrix),H>0&&Math.floor(de.age*16)!==Math.floor(Math.max(0,de.age-H)*16)&&b(ge.smoke,X.x,X.y,X.z,.16*W,.44*W,.22,{color:Me.dust,alpha:.42,vy:.22,world:!1})}}}ae.flush(Ge),s.count=j,r.count=a.count=z,s.visible=j>0,r.visible=a.visible=z>0,j&&(s.instanceMatrix.clearUpdateRanges(),s.instanceMatrix.addUpdateRange(0,j*16),s.instanceMatrix.needsUpdate=!0),z&&(r.instanceMatrix.clearUpdateRanges(),r.instanceMatrix.addUpdateRange(0,z*16),r.instanceMatrix.needsUpdate=!0,a.instanceMatrix.clearUpdateRanges(),a.instanceMatrix.addUpdateRange(0,z*16),a.instanceMatrix.needsUpdate=!0)}let Fe=te=>te===ge.glow||te===ge.glint||te===ge.wave||te===ge.goldWave||te===ge.flash||te===ge.ember;function ie(te,H,j,z=[],Ge=[],de=[]){if(O.visible){G+=te;let W=Math.min(1,G/.44);O.position.z+=H,O.position.y+=.74*te,O.scale.setScalar(.28+.94*Math.sin(Math.PI*Math.sqrt(W))),L.uniforms.age.value=W,W>=1&&(O.visible=!1)}let Re=Ir(te,0,.12);_=Math.min(8,_+Re*26),t.clear(),n.clear(),Ie(j,Re);for(let W of de){let Y=Ir(W.age/W.duration,0,1);n.write(W.x,W.y+.35,W.z,.55+.4*(1-Y),.55+.4*(1-Y),!1,ge.glow,Y>.55?Me.gold:Me.aqua,.92),n.write(W.x,W.y+.35,W.z,.42,.42,!1,ge.glint,Me.pearl,.95)}let ce=0,N=l*2;for(let W of Ge){let Y=1-Ir(W.age/W.life,0,1);if(!(Y<=.02)){n.write(W.bx,W.by,W.bz,.52*Y,.52*Y,!1,ge.glint,Me.aqua,Y);for(let xe=0;xe<2;xe++){let Be=xe===0?.34:.16,tt=(xe===0?.32:.92)*Y,nt=(xe===0?.92:1)*Y,pt=1*Y,B=W.ax,kt=W.ay,rt=W.az;for(let ot=1;ot<=6&&!(ce+2>N);ot++){let _e=ot/6,Pt=Math.sin(_e*Math.PI),qe=W.ax+(W.bx-W.ax)*_e+(ot<6?(Math.random()-.5)*2*Be*Pt:0),je=W.ay+(W.by-W.ay)*_e+(ot<6?(Math.random()-.35)*Be*Pt+.12*Pt:0),P=W.az+(W.bz-W.az)*_e+(ot<6?(Math.random()-.5)*1.4*Be*Pt:0),w=ce*3;c[w]=B,c[w+1]=kt,c[w+2]=rt,c[w+3]=qe,c[w+4]=je,c[w+5]=P,u[w]=u[w+3]=tt,u[w+1]=u[w+4]=nt,u[w+2]=u[w+5]=pt,ce+=2,B=qe,kt=je,rt=P}}}}f.setDrawRange(0,ce),p.visible=ce>0,ce>0&&(d.clearUpdateRanges(),d.addUpdateRange(0,ce*3),d.needsUpdate=!0,h.clearUpdateRanges(),h.addUpdateRange(0,ce*3),h.needsUpdate=!0);for(let W of z)n.write(W.x-W.vx*.038,W.y,W.z-W.vz*.038,.36,.58,!1,ge.glow,Me.fire,.88),n.write(W.x,W.y,W.z,.34,.38,!1,ge.glint,Me.gold,1);for(let W=g.length-1;W>=0;W--){let Y=g[W];if(Y.age+=Re,Y.age>=Y.life){v.push(Y),g[W]=g[g.length-1],g.pop();continue}Y.x+=Y.vx*Re,Y.y+=Y.vy*Re,Y.z+=Y.vz*Re+(Y.world?H:0),Y.vy-=Y.gravity*Re,Y.angle+=Y.spin*Re}for(let W=0;W<2;W++)for(let Y of g){if((Y.tile===ge.plus||Y.tile===ge.arrow)!==(W===1))continue;let We=Y.age/Y.life,Be=1-(1-We)*(1-We),tt=Ue.lerp(Y.start,Y.end,Be),nt=1-Ir((We-Y.hold)/(1-Y.hold),0,1);(Fe(Y.tile)?n:t).write(Y.x,Y.y,Y.z,tt,tt*Y.ratio,Y.flat,Y.tile,Y.color,Y.alpha*nt,Y.angle)}t.flush(),n.flush();let J=0;for(let W=m.length-1;W>=0;W--){let Y=m[W];if(Y.age+=Re,Y.age>=Y.life){M.push(Y),m[W]=m[m.length-1],m.pop();continue}Y.x+=Y.vx*Re,Y.z+=Y.vz*Re+H,Y.y+=Y.vy*Re,Y.vy-=11*Re,Y.y<Y.size*.4&&(Y.y=Y.size*.4,Y.vy=Math.abs(Y.vy)*.22,Y.vx*=.78,Y.vz*=.78);let xe=Math.min(1,(Y.life-Y.age)*5);x.position.set(Y.x,Y.y,Y.z),x.rotation.set(Y.rx+Y.age*Y.spin,Y.ry-Y.age*Y.spin*.56,Y.age*Y.spin*.77),x.scale.set(Y.size*Y.stretch*xe,Y.size*.74*xe,Y.size*xe),x.updateMatrix(),o.setMatrixAt(J,x.matrix),o.setColorAt(J++,Y.color)}o.count=J,o.visible=J>0,J&&(o.instanceMatrix.clearUpdateRanges(),o.instanceMatrix.addUpdateRange(0,J*16),o.instanceMatrix.needsUpdate=!0,o.instanceColor.clearUpdateRanges(),o.instanceColor.addUpdateRange(0,J*3),o.instanceColor.needsUpdate=!0)}function F(){O.visible=!1,v.push(...g),M.push(...m),g.length=m.length=0,_=6,ae.flush(0);for(let te of[s,r,a,o])te.count=0,te.visible=!1;t.clear(),t.flush(),n.clear(),n.flush(),f.setDrawRange(0,0),p.visible=!1}return F(),{update:ie,burst:q,reset:F}}var Pg={ally:{width:.49,height:.88,pivot:.49,pad:.008,capacity:220,grid:[8,10]},captain:{width:1.16,height:1.73,pivot:.43,pad:.009,capacity:12,grid:[16,20]},grunt:{width:.54,height:.88,pivot:.5,pad:.011,capacity:1800,grid:[8,10]}},Lh=Ue.clamp,Na=Ue.smoothstep,hS=`
  attribute vec3 anchor;
  attribute float fallAngle;
  attribute vec2 dimensions;
  attribute vec4 motion;
  attribute vec3 feet;
  attribute vec4 treatment;
  uniform vec3 cameraRight;
  uniform vec3 cameraLift;
  uniform float pivot;
  uniform float padding;
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    imageUv = uv;
    colorTreatment = treatment.xyz;
    vec2 point = vec2(uv.x - pivot, (uv.y-padding)/(1.0-2.0*padding));
    float stride = feet.x;
    // \u9510\u5316\u5DE6\u53F3\u817F\u5206\u7F1D\u5E76\u8D4B\u4E88\u8F7B\u5EA6\u81EA\u7136\u7AD9\u8DDD\uFF0C\u79FB\u9664\u5185\u6536\u6A2A\u62C9\u504F\u79FB\uFF0C\u5F7B\u5E95\u6D88\u9664\u53CC\u811A\u7C98\u8FDE
    float sideSign = smoothstep(pivot-0.018,pivot+0.018,uv.x)*2.0-1.0;
    float boots = (1.0-smoothstep(0.08,0.34,uv.y));
    float arms = smoothstep(.15,.32,abs(uv.x-pivot)) * smoothstep(.22,.38,uv.y)
               * (1.0-smoothstep(.46,.63,uv.y));
    float lift = max(0.0,sideSign*feet.z);
    float swing = mix(feet.y,feet.x,sideSign*.5+.5);
    #ifdef CAPTAIN
      arms *= mix(1.0,0.18,smoothstep(pivot,pivot+0.12,uv.x));
    #endif
    float ankle = 1.0-smoothstep(.08,.21,uv.y);
    float chest = smoothstep(.28,.49,uv.y)*(1.0-smoothstep(.58,.72,uv.y));
    point.x += swing * (0.042*arms) + sideSign * (0.036*boots + 0.022*lift*ankle) + stride*.022*chest;
    point.y += ankle*max(0.,-swing)*.022;
    point.y += .148*lift*boots + .024*abs(feet.z)*(1.0-boots) + swing*.058*arms;
    float depthSwing = stride*.033*(uv.x-pivot)*chest + (boots*${Ra/.86}-arms*.16)*swing*dimensions.y;
    #ifdef ALLY
      depthSwing *= -1.0;
    #endif
    #ifdef CAPTAIN
      depthSwing *= -1.0;
    #endif
    point.x += treatment.w*uv.y;
    #ifdef CAPTAIN
      float barrel = smoothstep(0.53,0.78,uv.x)*smoothstep(0.40,0.62,uv.y);
      point.y -= (barrel*0.093+uv.y*0.017)*motion.w;
      point.x += barrel*motion.w*0.023;
    #endif
    point *= dimensions;
    float angle = motion.z, c = cos(angle), s = sin(angle);
    // A falling unit tumbles around the waist. Upright runners remain boot-anchored.
    vec2 center = vec2(0.0,dimensions.y*0.42);
    point -= center;
    point = vec2(c*point.x-s*point.y,s*point.x+c*point.y)+center;
    vec3 bodyAxis = normalize(mix(cameraLift,vec3(0.,.035,1.),sin(fallAngle)));
    vec3 world = anchor + cameraRight*point.x + bodyAxis*point.y;
    world.z += depthSwing;
    gl_Position = projectionMatrix*viewMatrix*vec4(world, 1.0);
  }
`,uS=`
  ${wh}
  uniform sampler2D portrait;
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    vec4 pixel = texture2D(portrait,imageUv);
    // Keep occlusion correct between rows, the hero, fences and fully 3D units.
    // Mild coverage AA retains fine helmet/gun edges at distant mip levels.
    float coverage = smoothstep(0.23,0.70,pixel.a);
    if (coverage < 0.11) discard;
    #if defined(ALLY) || defined(CAPTAIN)
      pixel.rgb = paintHelmet(pixel.rgb, imageUv.y, false);
    #else
      pixel.rgb = paintHelmet(pixel.rgb, imageUv.y, true);
    #endif
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
`;function fS(i,e,t,n,s){let r=Pg[e],a=new Float32Array(3),o=new Ot(1,1,...r.grid),l=new Os().copy(o),c={};for(let[h,p]of[["anchor",3],["dimensions",2],["motion",4],["feet",3],["fallAngle",1],["treatment",4]]){let x=new Jt(new Float32Array(r.capacity*p),p);x.setUsage(Gt),c[h]=x,l.setAttribute(h,x)}l.instanceCount=0,t.colorSpace=At,t.magFilter=sn,t.minFilter=Zn,t.generateMipmaps=!0;let u=new Bt({uniforms:{portrait:{value:t},cameraRight:{value:n},cameraLift:{value:s},pivot:{value:r.pivot},padding:{value:r.pad}},defines:e==="captain"?{CAPTAIN:1}:e==="ally"?{ALLY:1}:{},vertexShader:hS,fragmentShader:uS,depthWrite:!0,transparent:!1,toneMapped:!1,alphaToCoverage:!0}),f=new Qe(l,u);f.name=`AI ${e}`,f.visible=!1,f.frustumCulled=!1,i.add(f);let d=0;return{begin(){d=0},clear(){d=0,l.instanceCount=0,f.visible=!1},add(h,p,x,g,m,v,M,_=0,b=0,S=0,y=0,E=0,C=0,R=0){d>=r.capacity||g<=.001||m<=.001||(c.fallAngle.setX(d,R),c.anchor.setXYZ(d,h,p,x),c.dimensions.setXY(d,r.width*g,r.height*m),c.motion.setXYZW(d,v,M,_,b),Hs(v,M,a),c.feet.setXYZ(d,a[0],a[1],a[2]),c.treatment.setXYZW(d,S,y,E,C),d++)},flush(){if(l.instanceCount=d,f.visible=d>0,!!d)for(let h of Object.values(c))h.clearUpdateRanges(),h.addUpdateRange(0,d*h.itemSize),h.needsUpdate=!0}}}async function Ig(i){let e=new ms,t=Object.keys(Pg),n=await Promise.allSettled(t.map(d=>e.loadAsync(`./art/${d}-field.webp?v=kit2`))),s=n.find(d=>d.status==="rejected");if(s){for(let d of n)d.status==="fulfilled"&&d.value.dispose();throw new Error("\u89D2\u8272\u63D2\u753B\u52A0\u8F7D\u5931\u8D25",{cause:s.reason})}let r=new D,a=new D,o=new D,l=Object.fromEntries(t.map((d,h)=>[d,fS(i,d,n[h].value,r,a)])),c=Object.values(l),u=()=>c.forEach(d=>d.clear());function f(d,h,p,x){if(x!=="ai"&&x!=="hybrid"){u();return}for(let b of c)b.begin();h.updateWorldMatrix(!0,!1),r.setFromMatrixColumn(h.matrixWorld,0),r.y=0,r.normalize(),o.setFromMatrixColumn(h.matrixWorld,1),a.set(0,1,0).lerp(o,.42).normalize();let g=x==="ai",m=d.phase==="ready"?.3:d.playing||d.overrun||d.parade?1:0,v=p*10.8+(d.parade?d.endTime*5.6:0);for(let b of d.columns)for(let S of b.units)S.alive&&l.grunt.add(S.x,S.lift||0,S.z,S.size,S.size,Ca(S),m);for(let b of d.runners)b.alive&&l.grunt.add(b.x,b.lift||0,b.z,b.size,b.size,Ca(b),m);let M=Lh(d.velocity*.007,-.095,.095),_=d.rope?.68*Math.sin(Math.PI*d.rope.age/.58):0;for(let b of d.squad){let S=$t[b.kind]||$t.rifle,y=Lh(b.age/.34,0,1),E=.72+.28*y+.14*Math.sin(y*Math.PI)+(b.mergeBirth||0)*.22;if(S.tier>=3){if(!g)continue;let O=(b.kind==="titan"?1.28:1.04)*E,I=b.kind==="titan"?.56:.22;l.captain.add(b.x,_+.04*Math.sin(y*Math.PI),b.z,O,O,v*.83+b.phase,m,0,b.recoil||0,Math.max(I,(b.mergeBirth||0)*.8),.16*(b.mergeBirth||0)+.52*(b.hurt||0),0,M,0);continue}let C=S.scale*E,R=S.tier===2?b.kind==="pyro"?.44:.26:b.kind==="flame"?.38:b.kind==="shield"?.08:0,A=Math.max(.75*(1-y),(b.mergeBirth||0)*.85,R),L=.22*(1-y)+(b.hurt||0)*.55+(b.kind==="tesla"||b.kind==="storm"?.16:0)+(d.buffs.fever>0||d.overdriveActive>0?.14:0);l.ally.add(b.x,_+.045*Math.sin(y*Math.PI),b.z,C,C,v+b.phase,m,0,0,A,L,0,M*.65)}for(let b of d.merges||[]){let S=Lh(b.age/b.duration,0,1),y=($t[b.kind]?.scale||1)*(1-.52*S);l.ally.add(b.x,b.y,b.z,y,y,v*1.4,.4,S*2.2,0,.88,.45)}for(let b of d.deliveries){if(b.slot==null||b.age<0)continue;let S=$t[b.unitKind]?.scale||1,y=(.65+.35*b.progress)*S;l.ally.add(b.x,b.y,b.z,y,y,v+b.phase,.55,0,0,.45,.26)}for(let b of d.falling){if(b.prone){let R=Na(b.t,0,.42),A=b.size*(d.overrun?1:1-Na(b.t,1.78,2.1));l.ally.add(b.x,.09*R,b.z,A,A,0,0,.1*R*b.dir,0,0,0,.3*R,0,1.5*R);continue}let S=Lh(b.t/.72,0,1),y=b.size*(1-Na(S,.55,1)),E=b.roll*b.t+.16*Math.sin(b.spin*b.t);(b.side==="red"?l.grunt:l.ally).add(b.x,b.y,b.z,y,y,v+b.phase,0,E,0,.55*(1-Na(S,.08,.45)),.72*(1-Na(S,.03,.26)),.22*Na(S,.25,.75))}for(let b of c)b.flush()}return{draw:f,clear:u,captainTexture:n[t.indexOf("captain")].value,gruntTexture:n[t.indexOf("grunt")].value,allyTexture:n[t.indexOf("ally")].value}}var Id=72;function Lg(i,e){let t=new To(16184831,6452108,1.38);i.add(t);let n=new Fs(16773336,2.25);n.position.set(-9,17,7),i.add(n);let s=new Fs(8967423,.85);s.position.set(8,9,-10),i.add(s);let r=[0,1].map(()=>{let b=new Mr(16751421,0,15,1.6);return b.visible=!0,i.add(b),{light:b,active:!1,age:1,life:.35,peak:0}}),a=0,o={topColor:{value:new be("#0c2c57")},horizonColor:{value:new be("#3b7cb0")},sunColor:{value:new be("#ffe29c")},sunPos:{value:new ye(-.42,.72)},aurora:{value:0},clock:{value:0}},l=new Bt({uniforms:o,depthWrite:!1,depthTest:!1,toneMapped:!1,vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.9999, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 topColor, horizonColor, sunColor;
      uniform vec2 sunPos;
      uniform float aurora, clock;
      varying vec2 vUv;
      void main() {
        float h = clamp(vUv.y, 0.0, 1.0);
        // \u4E0A\u90E8\u4E3A\u9AD8\u7A7A\uFF0C\u4E2D\u4E0A\u90E8\u4E3A\u5929\u9645\u7EBF\u4E91\u971E\u5149\u5E26\uFF0C\u4E0B\u90E8\u81EA\u7136\u8FC7\u6E21\u5230\u6DF1\u6C34\u8272
        float skyBand = smoothstep(0.54, 1.0, h);
        vec3 col = mix(horizonColor, topColor, pow(skyBand, 0.72));
        // \u5730\u5E73\u7EBF\u6563\u5C04\u4EAE\u5E26
        float bandGlow = exp(-pow((h - 0.78) * 6.5, 2.0)) * 0.24;
        col += sunColor * bandGlow;
        // \u592A\u9633 / \u7EA2\u6708\u67D4\u5149\u6655
        vec2 aspectUv = vec2((vUv.x - 0.5) * 0.62, vUv.y);
        float d = length(aspectUv - vec2(sunPos.x * 0.62, sunPos.y));
        col += sunColor * (exp(-d * 4.5) * 0.42 + smoothstep(0.075, 0.045, d) * 0.55);
        // \u6781\u5149\u5E26\uFF08\u51B0\u6CB3\u7AE0\u8282\u6FC0\u6D3B\uFF09
        if (aurora > 0.01) {
          float wave = sin(vUv.x * 8.0 + clock * 0.45 + sin(vUv.x * 3.2 - clock * 0.25) * 1.4);
          float ribbon = exp(-pow((h - 0.87 - wave * 0.045) * 15.0, 2.0));
          float ribbon2 = exp(-pow((h - 0.92 + wave * 0.03) * 18.0, 2.0));
          vec3 auraCol = mix(vec3(0.18, 0.96, 0.72), vec3(0.55, 0.45, 1.0), vUv.x);
          col += auraCol * (ribbon * 0.42 + ribbon2 * 0.28) * aurora;
        }
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `});l.userData.unbent=!0;let c=new Qe(new Ot(2,2),l);c.frustumCulled=!1,c.renderOrder=-100,i.add(c);let u=new so(1456219,.0085);i.fog=u;let f=new Ot(.16,.16),d=new Bt({transparent:!0,depthWrite:!1,toneMapped:!1,blending:Gn,uniforms:{tint:{value:new be("#fff1cc")}},vertexShader:`
      varying vec2 vUv;
      varying float vAlpha;
      void main() {
        vUv = uv;
        vec4 mvCenter = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float scale = length(vec3(instanceMatrix[0].xyz));
        mvCenter.xy += position.xy * scale;
        vAlpha = smoothstep(-58.0, -36.0, mvCenter.z) * smoothstep(2.0, -4.0, mvCenter.z);
        gl_Position = projectionMatrix * mvCenter;
      }
    `,fragmentShader:`
      uniform vec3 tint;
      varying vec2 vUv;
      varying float vAlpha;
      void main() {
        float r = length(vUv - 0.5) * 2.0;
        float glow = smoothstep(1.0, 0.12, r);
        float alpha = glow * glow * 0.62 * vAlpha;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(tint, alpha);
      }
    `}),h=new Ft(f,d,Id);h.frustumCulled=!1,h.renderOrder=7,h.instanceMatrix.setUsage(Gt),i.add(h);let p=Array.from({length:Id},(b,S)=>({x:(S*73%100/100-.5)*22,y:.4+S*37%100/100*6.5,z:-48+S*53%100/100*56,phase:S*1.13,size:.65+S*29%100/85})),x=new Lt,g=null,m="breeze";function v(b){if(b===g)return;g=b;let S=ei[b]||ei.quay;t.color.set(S.hemiSky),t.groundColor.set(S.hemiGround),t.intensity=S.hemiIntensity??1.38,n.color.set(S.keyLight),n.intensity=S.keyIntensity??2.25,s.color.set(S.rimLight),s.intensity=S.rimIntensity??.88,u.color.set(S.fog),u.density=S.fogDensity??.0082,e.setClearColor(S.deep,1),e.toneMappingExposure=S.exposure??1.06,o.topColor.value.set(S.skyTop),o.horizonColor.value.set(S.skyHorizon),o.sunColor.value.set(S.sunColor),o.aurora.value=b==="ice"?1:0,d.uniforms.tint.value.set(S.moteColor),m=S.moteStyle||"breeze"}function M(b,S,y,E,C=8,R=.28){let A=r[a++%r.length];A.light.position.set(b,Math.max(.6,S+.45),y),A.light.color.setHex(E),A.light.intensity=C,A.active=!0,A.peak=C,A.life=R,A.age=0}function _(b,S,y,E){v(b),o.clock.value=S;for(let O of r){if(!O.active)continue;O.age+=y,O.light.position.z+=E;let I=O.age/O.life;I>=1?(O.light.intensity=0,O.active=!1):O.light.intensity=O.peak*(1-I)*(1-I)}let C=m==="embers",R=m==="snow",A=C?2.1:R?-1.45:-.35,L=C?.65:R?1.15:.9;for(let O=0;O<Id;O++){let I=p[O];I.z+=E*.92+(R?1.6:.8)*y,I.y+=A*y,I.x+=Math.sin(S*1.4+I.phase)*L*y,I.z>9&&(I.z-=56),I.y<.25&&(I.y=6.8),I.y>7.2&&(I.y=.35),I.x>11.5&&(I.x=-11.5),I.x<-11.5&&(I.x=11.5);let G=.72+.28*Math.sin(S*4.2+I.phase);x.position.set(I.x,I.y,I.z),x.rotation.set(0,0,0),x.scale.setScalar(I.size*(C?1.15:R?1.1:.95)*G),x.updateMatrix(),h.setMatrixAt(O,x.matrix)}h.instanceMatrix.needsUpdate=!0}return{update:_,flashLight:M,applyTheme:v}}var Kt=new Lt;function Dh(i,e){i.count=e,i.visible=e>0,e>0&&(i.instanceMatrix.clearUpdateRanges(),i.instanceMatrix.addUpdateRange(0,e*16),i.instanceMatrix.needsUpdate=!0)}function Dg(i,e,t){let n=new Float32Array(3),s=Qm(e,"near"),r=new Jt(new Float32Array(t*4),4).setUsage(Gt);s.setAttribute("stepPose",r);let a=new Yt({vertexColors:!0,shininess:42,specular:3884372});a.customProgramCacheKey=()=>"infantry-walk-"+e,a.onBeforeCompile=u=>{u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
        attribute float limb;
        attribute vec4 stepPose;
        varying float vGlow;
        const float facing = ${e==="red"?"1.0":"-1.0"};
        mat2 swingJoint() {
          float arm = step(1.5,abs(limb));
          float stride = limb < 0.0 ? stepPose.z : stepPose.y;
          float s = facing * stride * mix(-.62,.78,arm) * step(.5,abs(limb));
          float c = sqrt(max(.01,1.0-s*s));
          return mat2(c,s,-s,c);
        }`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
        mat2 jointTurn = swingJoint();
        objectNormal.yz = jointTurn * objectNormal.yz;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vGlow = stepPose.x;
        float arm = step(1.5,abs(limb));
        float leg = step(.5,abs(limb))*(1.0-arm);
        float stride = limb<0.0 ? stepPose.z : stepPose.y;
        float lift = max(0.0,sign(limb)*stepPose.w);
        float pivot = mix(.29,.438,arm);
        transformed.yz = jointTurn * (position.yz-vec2(pivot,0.0))+vec2(pivot,0.0);
        float boot = leg*(1.0-smoothstep(.105,.28,position.y));
        vec2 sole = position.yz + vec2(.126*lift,facing*${Ra}*stride);
        transformed.yz = mix(transformed.yz,sole,boot);
        transformed.y += .022*abs(stepPose.w)*(1.0-boot);
        // \u53BB\u6389\u53CC\u817F\u6A2A\u5411\u4EA4\u9519\u6643\u52A8\uFF0C\u62AC\u811A\u65F6\u5FAE\u5FAE\u5916\u5C55\uFF0C\u786E\u4FDD\u53CC\u811A\u6B65\u4F10\u5E72\u8106\u5206\u660E\u7EDD\u4E0D\u7C98\u8FDE
        transformed.x += leg*sign(limb)*(.014*lift) + (1.0-leg)*stepPose.y*.014*position.y + sign(limb)*arm*.009*stride;`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
varying float vGlow;`).replace("#include <color_fragment>",`#include <color_fragment>
      if (vGlow <= -1.0) {
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.18)*.86;
        diffuseColor.rgb = mix(faded,vec3(1.,.90,.66),clamp(-vGlow-1.,0.,1.)*.74);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.78,.24), clamp(vGlow,0.0,1.0)*.94);`)};let o=new Ft(s,a,t),l;o.count=0,o.visible=!1,o.frustumCulled=!1,o.instanceMatrix.setUsage(Gt),i.add(o);let c=0;return{paint(u,f){return l=Gf(e,u,f,r,t),l.instanceMatrix=o.instanceMatrix,i.add(l),l},begin(){c=0},put(u,f,d,h,p=0,x=0,g=0,m=0,v=0,M=0){c>=t||(Kt.position.set(u,f,d),Kt.rotation.set(x,g,m),Kt.scale.setScalar(h),Kt.updateMatrix(),o.setMatrixAt(c,Kt.matrix),Hs(v,M,n),r.setXYZW(c,p,n[0],n[1],n[2]),c++)},end(){o.count=c,o.visible=c>0&&!l,l&&(l.count=c,l.visible=c>0),c>0&&(o.instanceMatrix.clearUpdateRanges(),o.instanceMatrix.addUpdateRange(0,c*16),o.instanceMatrix.needsUpdate=!0,r.clearUpdateRanges(),r.addUpdateRange(0,c*4),r.needsUpdate=!0)}}}function dS(i){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(35,32,2,34,32,29);n.addColorStop(0,"rgba(24,28,50,.48)"),n.addColorStop(.53,"rgba(28,31,54,.34)"),n.addColorStop(.83,"rgba(36,39,62,.14)"),n.addColorStop(1,"rgba(36,39,62,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let s=t.createRadialGradient(23,32,1,24,32,17);s.addColorStop(0,"rgba(18,20,40,.52)"),s.addColorStop(.57,"rgba(22,25,46,.28)"),s.addColorStop(1,"rgba(22,25,46,0)"),t.fillStyle=s,t.fillRect(0,0,64,64);let r=new Bn(e);r.colorSpace=At;let a=new Ot(1,1);a.rotateX(-Math.PI/2);let o=new Ft(a,new gt({map:r,transparent:!0,depthWrite:!1,toneMapped:!1}),1600);o.count=0,o.visible=!1,o.frustumCulled=!1,o.instanceMatrix.setUsage(Gt),o.renderOrder=1,i.add(o);let l=0;return{begin(){l=0},put(c,u,f,d=1,h=1){l>=1600||(Kt.position.set(c+f*.29*h,.021,u-f*.19*h),Kt.rotation.set(0,.65,0),Kt.scale.set(f*1.68*h,.95,f*.85*d),Kt.updateMatrix(),o.setMatrixAt(l++,Kt.matrix))},end(){Dh(o,l)}}}function Ng(i,e,t,n,s){let r=new hs(e,i,64);r.rotateX(-Math.PI/2);let a=new Qe(r,new gt({color:t,transparent:!0,opacity:n,depthWrite:!1,toneMapped:!1}));return a.renderOrder=3,s.add(a),a}function pS(i){let e=new Ot(2.15,2.15);e.rotateX(-Math.PI/2);let t={uTime:{value:0},uColor:{value:new be("#3af2c8")},uAccent:{value:new be("#9effea")},uTier:{value:1},uBoost:{value:0}},n=new Bt({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,blending:Gn,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
      uniform float uTime, uTier, uBoost;
      uniform vec3 uColor, uAccent;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r > 1.0) discard;
        float angle = atan(p.y, p.x);
        // \u4E3B\u5149\u5708
        float mainRing = exp(-pow((r - 0.68) * 26.0, 2.0));
        // \u65CB\u8F6C\u6218\u672F\u523B\u5EA6\u73AF
        float ticks = step(0.32, fract((angle + uTime * (0.9 + uTier * 0.35)) * (3.0 + uTier) / 3.14159));
        float outerRing = exp(-pow((r - 0.84) * 32.0, 2.0)) * (0.45 + 0.55 * ticks);
        // \u5185\u5708\u67D4\u548C\u80FD\u91CF\u586B\u5145 + \u8109\u51B2\u626B\u6CE2
        float pulse = exp(-pow((r - fract(uTime * (0.85 + uBoost * 0.6)) * 0.72) * 18.0, 2.0)) * 0.4;
        float coreGlow = smoothstep(0.66, 0.15, r) * (0.14 + 0.14 * uBoost);
        float intensity = mainRing * 0.95 + outerRing * (0.38 + 0.16 * uTier) + pulse + coreGlow;
        vec3 col = mix(uColor, uAccent, mainRing * 0.65 + uBoost * 0.35);
        float alpha = clamp(intensity * (0.78 + 0.22 * uBoost), 0.0, 1.0);
        if (alpha < 0.015) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `}),s=new Qe(e,n);s.renderOrder=3,i.add(s);let r=[["#36e6c4","#b6fff0"],["#3ab8ff","#b8ecff"],["#ffb82e","#fff099"],["#ff6d2e","#fff7b2"]];return{mesh:s,update(a,o){let l=a.phase==="lost";if(s.visible=!l&&!a.parade,!s.visible)return;let c=Math.max(1,Math.min(4,a.tier||1)),u=a.buffs.fever>0||a.overdriveActive>0?1:0,[f,d]=u?["#ffbe2e","#ffffff"]:r[c-1];t.uColor.value.set(f),t.uAccent.value.set(d),t.uTime.value=o,t.uTier.value=c,t.uBoost.value=u,s.position.set(a.x,.048,a.captainZ),s.scale.setScalar(a.visualScale*(1+u*.12))}}}function Ug(i,e){let t=new vh({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"});t.setClearColor(668502,1),t.outputColorSpace=At,t.toneMapping=Io,t.toneMappingExposure=1.04;let n=new ro,s=pg(t,n),r=Lg(n,t),a=new dn(41,1,.15,165),o=new D,l=[],c=[];function u(F,te){let H=F==="titan"?c:l;for(;H.length<=te;){let j=ng(F);F==="captain"&&L&&j.paint(L.captainTexture,L.gruntTexture),j.root.visible=!1,n.add(j.root),s.markDirty(),H.push(j)}return H[te]}let f=Ng(2.05,2.05-.085,16739108,.92,n),d=Ng(2.05,2.05-.16,16765516,.56,n),h=hg();n.add(h.root);let p=Dg(n,"blue",180),x=Dg(n,"red",1800),g=dS(n),m=pS(n),v=new Qe(new Xn(1,28,12,0,Math.PI*2,0,Math.PI/2),new Bt({transparent:!0,depthWrite:!1,blending:Gn,vertexShader:"varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}",fragmentShader:"varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),1.85);gl_FragColor=vec4(.28,.88,1.,.06+.62*rim);}"}));n.add(v);let M=new Ft(new fi(.21),new Yt({color:7661823,emissive:1931448,shininess:90}),20);M.count=0,M.visible=!1,M.frustumCulled=!1,M.instanceMatrix.setUsage(Gt),n.add(M);let _={},b=new Yt({vertexColors:!0,shininess:46});for(let F of["gunner","guard","bomber","standard","vault","courier"]){let te=new Ft(eg(F),b,32);te.count=0,te.visible=!1,te.frustumCulled=!1,te.instanceMatrix.setUsage(Gt),n.add(te),_[F]=te}let S={},y=new Yt({vertexColors:!0,shininess:68,specular:8033970});for(let F of["shield","flame","tesla","assault","pyro","storm"]){let te=new Ft(tg(F),y,44);te.count=0,te.visible=!1,te.frustumCulled=!1,te.instanceMatrix.setUsage(Gt),n.add(te),S[F]=te}let E=Ag(n),C=yg(n),R=wg(n,s.curve),A=Cg(n),L=null,I=Ig(n).then(F=>{L=F;for(let te of l)te.paint(F.captainTexture,F.gruntTexture);return p.paint(F.allyTexture,F.gruntTexture),x.paint(F.gruntTexture,F.allyTexture),s.markDirty(),!0}).catch(F=>(console.warn("\u89D2\u8272\u8D34\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u5DF2\u4F7F\u7528 3D \u6A21\u578B",F),!1)),G=-3.72,q=0,V=0,re=0,X=41,ee=1,ae=1,Ie=Math.min(devicePixelRatio||1,1.75),Fe=()=>{ee=e.clientWidth,ae=e.clientHeight,a.aspect=ee/Math.max(1,ae),X=Ue.clamp(41+(.54-a.aspect)*27,37,47),a.fov=X,a.updateProjectionMatrix(),t.setPixelRatio(Ie),t.setSize(ee,ae,!1)};Fe();function ie(F,te,H,j,z){L||(z="3d");let Ge=F.playing,de=z!=="ai",Re=1-Math.exp(-8.5*H);s.setRoute(F.route.theme,F.stage,F.distance),r.update(F.route.theme,te,H,j);let ce=F.boss.defeatAge,N=F.boss.defeated?.18*Ue.smoothstep(ce,0,.42)*(1-Ue.smoothstep(ce,.82,1.65)):0,J=19.5*Math.tan(Ue.degToRad(X/2))*a.aspect,W=Math.sign(F.x)*Math.max(0,Math.abs(F.x)-J*.54),Y=s.curve.x>0,xe=Y?Ue.clamp(W,-1,1):W,We=F.boss.x+s.offset(F.boss.z),Be=1-Ue.smoothstep(a.aspect,.6,.92),tt=F.boss.active?Be*Ue.smoothstep(F.boss.z,-16,-4)*(1-Ue.smoothstep(ce,1.45,2.05)):0,nt=Ue.lerp(F.x,We,.55),pt=Ue.lerp(xe,nt,tt*.85),B=Ue.lerp(pt,We,N),kt=(F.boss.z+5.4)*N;Y&&!F.boss.active&&(G=Ue.clamp(G,-1,1)),G+=(B-G)*Re;let rt=tt*(3.1+Math.min(3.2,Math.abs(F.x-We)*.48));q+=(rt-q)*Re,V=Math.max(0,V-H*1.9),re=Math.max(0,re-H*4.8);let ot=X+re*2.1;Math.abs(a.fov-ot)>.02&&(a.fov=ot,a.updateProjectionMatrix());let _e=Math.sin(te*62)*V*V*.21,Pt=Math.sin(te*76)*V*V*.14,je=(Y?Ue.clamp(19.5+(.5-a.aspect)*29,17.5,23.4):15.2)+q,P=13.2+(je-15)*.81,w=Y?(G-s.offset(-22)*.45)/30:0,Z=Ue.degToRad(X/2),ve=Math.atan2(14.88,20.65),fe=13.2-15/Math.tan(ve-Z),Te=Math.atan2(je,P-fe)+Z,Ce=P-(je-.12)/Math.tan(Te);a.position.set(G+_e+w*P,je+Pt-N*1.2,P+kt),a.lookAt(G+.06+_e+w*Ce,.12,Ce+kt),a.updateMatrixWorld(),s.setCamera(a);let oe=Ge||F.overrun||F.parade?1:0,le=te*10.8+(F.parade?F.endTime*5.6:0);R.update(F),g.begin(),p.begin(),x.begin();for(let pe of F.columns)for(let at of pe.units){if(!at.alive||at.z<F.entryZ-3)continue;z==="3d"&&x.put(at.x,at.lift||0,at.z,at.size,0,0,at.yaw,0,Ca(at),oe);let fn=Ue.smoothstep(at.z,-45,-30);fn>0&&g.put(at.x,at.z,.66*at.size*fn)}let Ee={gunner:0,guard:0,bomber:0,standard:0,vault:0,courier:0};for(let pe of F.runners){if(!pe.alive)continue;let at=_[pe.role];at&&Ee[pe.role]<at.instanceMatrix.count&&(Kt.position.set(pe.x,(pe.lift||0)+.012,pe.z),Kt.rotation.set(0,pe.yaw,0),Kt.scale.setScalar(pe.size),Kt.updateMatrix(),at.setMatrixAt(Ee[pe.role]++,Kt.matrix)),z==="3d"&&x.put(pe.x,pe.lift||0,pe.z,pe.size,0,0,pe.yaw,0,Ca(pe),oe),g.put(pe.x,pe.z,.68*pe.size)}for(let[pe,at]of Object.entries(_))Dh(at,Ee[pe]);let U={shield:0,flame:0,tesla:0,assault:0,pyro:0,storm:0},ue=0,se=0,we=F.rope?.68*Math.sin(Math.PI*F.rope.age/.58):0,Se=F.phase==="lost",Ae=Ue.clamp(F.velocity/9,-1,1);for(let pe of F.squad){let at=$t[pe.kind]||$t.rifle,fn=1;if(pe.age<.28&&(fn=.58+.42*Math.min(1,pe.age/.16)+Math.sin(Math.PI*Math.min(1,pe.age/.28))*.2),pe.mergeBirth>0&&(fn+=pe.mergeBirth*.24),at.tier>=3){let Di=pe.kind==="titan";if(de){let bs=u(Di?"titan":"captain",Di?se++:ue++);bs.root.visible=!0;let Ks=(Di?1.24:.96)*fn;bs.root.position.set(pe.x,we,pe.z),bs.root.rotation.set(0,-F.velocity*.018,0),bs.root.scale.setScalar(Ks),bs.animate({time:te+pe.phase*.12+(F.parade?F.endTime*.54:0),run:F.parade?1:Ge?.91:Se?0:.14,recoil:pe.recoil||0,merge:Math.max(pe.mergeBirth||0,(pe.hurt||0)*.7,Di?.08:0,F.overdriveActive>0?.35:0),lean:Ae})}g.put(pe.x,pe.z,(Di?1.52:1.18)*fn,1,1.26);continue}let _s=at.scale*fn,ll=oe?Math.abs(Math.sin(le+pe.phase))*.045:0;if(z==="3d"){let Di=Math.max(0,1-pe.age*2.8,(pe.mergeBirth||0)*.9,(pe.hurt||0)*.75,at.tier===2?.22:0);p.put(pe.x,we,pe.z,_s,Di,0,-F.velocity*.014,0,le+pe.phase,oe)}let Ms=S[pe.kind];Ms&&U[pe.kind]<Ms.instanceMatrix.count&&(Kt.position.set(pe.x,we+ll,pe.z),Kt.rotation.set(0,-F.velocity*.014,0),Kt.scale.setScalar(_s),Kt.updateMatrix(),Ms.setMatrixAt(U[pe.kind]++,Kt.matrix)),g.put(pe.x,pe.z,.72*_s)}for(let pe=ue;pe<l.length;pe++)l[pe].root.visible=!1;for(let pe=se;pe<c.length;pe++)c[pe].root.visible=!1;for(let[pe,at]of Object.entries(S))Dh(at,U[pe]);if(z==="3d")for(let pe of F.merges||[]){let at=Ue.clamp(pe.age/pe.duration,0,1),fn=($t[pe.kind]?.scale||1)*(1-.55*at);p.put(pe.x,pe.y,pe.z,fn,.95,0,at*8,0,le*1.3,.4)}let Ve=0;function ht(pe,at,fn,_s){Ve>=M.instanceMatrix.count||(Kt.position.set(pe,at,fn),Kt.rotation.set(.18,te*4,0),Kt.scale.setScalar(_s),Kt.updateMatrix(),M.setMatrixAt(Ve++,Kt.matrix))}C.update(F.deliveries);for(let pe of F.deliveries)if(!(pe.age<0||pe.slot==null)&&z==="3d"){let at=$t[pe.unitKind]?.scale||1;p.put(pe.x,pe.y,pe.z,(.65+.35*pe.progress)*at,.42,0,0,0,le+pe.phase,.55)}if(F.buffs.drone>0||F.overdriveActive>0)for(let pe of[-1,1])ht(F.x+pe*1.18,1.32+.08*Math.sin(te*6),F.captainZ-.32,1.08);Dh(M,Ve),v.visible=Ge&&(F.buffs.shield>0||F.overdriveActive>0),v.visible&&(v.position.set(F.x,.06,F.captainZ),v.scale.set(1.56*F.scale,1.58,1.32*F.scale));for(let pe of F.falling){let at=Ue.smoothstep(pe.t,0,.42),fn=(pe.size||1)*(pe.prone?F.overrun?1:1-Ue.smoothstep(pe.t,1.78,2.1):1-Math.pow(Math.min(1,pe.t/.75),3.4));z==="3d"&&(pe.side==="red"?x:p).put(pe.x,pe.prone?.15*at:pe.y,pe.z,fn,-2+Ue.smoothstep(pe.t,.018,.16),pe.prone?1.48*at:pe.spin*pe.t,pe.prone?.12*pe.dir:pe.phase,pe.prone?.16*at*pe.dir:pe.roll*pe.t),pe.y<2&&g.put(pe.x,pe.z,.64*fn)}let he=F.boss;h.root.visible=he.active&&!he.removed&&he.z<9;let Ye=he.defeated?Ue.smoothstep(ce,0,.08)*(1-Ue.smoothstep(ce,.82,.94)):0,lt=he.defeated?Ue.smoothstep(ce,.84,1.38):0,Pe=lt*lt,It=he.defeated&&ce>1.38?Math.sin((ce-1.38)*20)*Math.exp(-8.5*(ce-1.38)):0,tn=he.lift*(1-Ue.smoothstep(ce,0,.2));h.root.position.set(he.x+Ye*Math.sin(ce*28)*.14-.22*Pe,tn+.3*Pe+Math.max(0,It)*.22,he.z-.45*Pe);let Li=-.2*Ye-.16*Ye*Math.abs(Math.sin(ce*24))-1.54*Pe+.15*It,al=Ye*Math.sin(ce*19)*.11-.24*Pe;h.root.rotation.set(Li,he.yaw*(1-Pe),al),E(he);let Qn=he.skill,Gh=Qn?Ue.smoothstep(Qn.age,0,Qn.warm)*(1-Ue.smoothstep(Qn.age,Qn.warm,Qn.warm+.3)):0,ol=Qn?Math.sin(Math.PI*Ue.clamp((Qn.age-Qn.warm)/.52,0,1)):0;if(h.pose({charge:Gh,release:ol,mode:z,time:te,walk:Ge&&he.active&&!he.defeated?1:0,march:he.marched,attack:he.attackT,slamHand:he.slamHand||0,hit:Math.max(he.hit,he.enraged?.16+.1*Math.sin(te*9):0),defeat:ce,kind:he.kind,vault:he.vault?.t||0,brace:he.brace,drive:he.special}),f.visible=d.visible=Ge&&!he.defeated&&he.attackT>0&&he.attackT<.62,f.visible){let pe=he.slamHand===2,at=pe?1.18:1;f.material.color.setHex(pe?16723750:16743209),f.position.set(he.landX,.047,he.landZ),f.scale.setScalar(at),d.position.set(he.landX,.051,he.landZ),d.scale.setScalar(at*(.28+.72*Ue.smoothstep(he.attackT,0,.62)))}h.root.visible&&g.put(he.x,he.z-Pe*1.1,3.65-tn*.38,1.12+Pe*.75,1.15),m.update(F,te),g.end(),p.end(),x.end(),L&&L.draw(F,a,te,z),A.update(H,j,F.shots,F.incoming,F.lightningArcs,F.merges),s.prepareScene(),t.render(n,a)}return{draw:ie,assets:I,prepareBoss:F=>h.prepare(F).then(te=>(s.markDirty(),te)),resize:Fe,entryZ(){let F=Math.atan2(14.88,20.65);return 13.2-15/Math.tan(F-Ue.degToRad(X/2))},project(F,te,H){return o.set(F+s.offset(H),te,H).project(a),{x:(o.x+1)*ee/2,y:(1-o.y)*ae/2}},feedback(F){A.burst(F.kind,F.x,F.y,F.z,F.strength,F.supply),F.kind==="slam"||F.kind==="wallBreak"||F.kind==="bossBurst"||F.kind==="barrelBlast"?(V=F.kind==="barrelBlast"?.86:.92,re=.75,r.flashLight(F.x,F.y+.4,F.z,16742946,16,.38)):F.kind==="lavaBurst"?(V=Math.max(V,.56),re=Math.max(re,.4),r.flashLight(F.x,1.2,F.z,16732696,14,.34)):F.kind==="overdrive"||F.kind==="evolve"?(V=Math.max(V,.68),re=Math.max(re,.9),r.flashLight(F.x,1.1,F.z,16765509,16,.45)):F.kind==="bossEnrage"?(V=Math.max(V,.72),re=Math.max(re,.65),r.flashLight(F.x,1.4,F.z,16726822,15,.42)):F.kind==="victory"||F.kind==="vaultLand"?(V=Math.max(V,.55),r.flashLight(F.x,.5,F.z,16762460,9,.3)):F.kind==="impact"||F.kind==="discharge"?(V=Math.max(V,.3),re=Math.max(re,.22),r.flashLight(F.x,.4,F.z,F.kind==="discharge"?4583679:16749104,10,.22)):F.kind==="muzzle"?r.flashLight(F.x,F.y,F.z,16758861,6,.12):F.kind==="critHit"&&(V=Math.max(V,.22),r.flashLight(F.x,F.y,F.z,16768601,8,.15))},reset(F){G=F*.94,q=0,V=0,re=0,A.reset()},lowerResolution(){Ie<=1||(Ie=Math.max(1,Ie-.25),Fe())}}}var Fg=Math.PI*2,Og={muzzle:{duration:.25,gain:.33,interval:.18},smallShot:{duration:.08,gain:.076,interval:.105},impact:{duration:.31,gain:.28,interval:.12},wallHit:{duration:.16,gain:.16,interval:.13},cardHit:{duration:.1,gain:.11,interval:.13},supplyBreak:{duration:.25,gain:.21,interval:.1},shieldHit:{duration:.16,gain:.14,interval:.14},wallBreak:{duration:.43,gain:.35,interval:.4},plus:{duration:.22,gain:.18,interval:.105},longRange:{duration:.44,gain:.25,interval:.18},guardUp:{duration:.38,gain:.22,interval:.18},merge:{duration:.41,gain:.23,interval:.18},slam:{duration:.49,gain:.42,interval:.5},bruiserStrike:{duration:.31,gain:.28,interval:.22},diverStrike:{duration:.36,gain:.22,interval:.1},wardenCast:{duration:.68,gain:.26,interval:.5},drillStrike:{duration:.32,gain:.21,interval:.18},kestrelCast:{duration:.66,gain:.23,interval:.42},engineStrike:{duration:.44,gain:.3,interval:.24},bossBurst:{duration:.79,gain:.4,interval:.7},glassBreak:{duration:.39,gain:.24,interval:.17},crateBreak:{duration:.32,gain:.24,interval:.2},latchHit:{duration:.16,gain:.16,interval:.1},rally:{duration:.9,gain:.28,interval:1},chainSnap:{duration:.29,gain:.28,interval:.23},discharge:{duration:.41,gain:.26,interval:.23},vaultLand:{duration:.25,gain:.21,interval:.4},victory:{duration:.79,gain:.28,interval:.7},loss:{duration:.63,gain:.25,interval:.57},hit:{duration:.09,gain:.075,interval:.14},critHit:{duration:.16,gain:.18,interval:.11},evolve:{duration:.82,gain:.32,interval:.6},overdrive:{duration:.76,gain:.38,interval:.6},bossEnrage:{duration:.72,gain:.34,interval:.8},barrelBlast:{duration:.62,gain:.42,interval:.12},lavaBurst:{duration:.56,gain:.32,interval:.25},buy:{duration:.32,gain:.24,interval:.12}};function mS(i,e){let t=i.createBuffer(1,Math.ceil(Og[e].duration*24e3),24e3),n=t.getChannelData(0),s=981273;function r(u,f,d){let h=Math.floor(u*24e3),p=Math.min(n.length,h+Math.ceil(f*24e3)),x=Math.min(.005,f*.1),g=Math.min(.012,f*.16);for(let m=h;m<p;m++){let v=(m-h)/24e3,M=Math.min(1,v/x,(f-v)/g)*Math.exp(-3.35*v/f);n[m]+=d(v/f)*M}}function a(u,f,d,h,p,x=.12){let g=0;r(u,f,m=>{let v=h+(d-h)*(1-m)**3;return g+=Fg*v/24e3,p*(Math.sin(g)+x*Math.sin(2*g+.15))})}function o(u,f,d,h){let p=0,x=0,g=1-Math.exp(-Fg*d/24e3);r(u,f,()=>(s=Math.imul(1664525,s)+1013904223>>>0,p+=g*(s/2147483648-1-p),x+=.014*(p-x),h*(p-x*.65)))}function l(u,f,d,h){a(u,f,d*1.013,d,h,.16),a(u,f*.35,d*2.52,d*2.5,h*.11)}switch(e){case"cardHit":l(0,.09,1150,.42);break;case"supplyBreak":o(0,.068,4200,.51),l(.015,.18,906,.44),l(.07,.16,1326,.36);break;case"shieldHit":a(0,.15,740,365,.56,.18);break;case"muzzle":a(0,.2,213,61,.76,.48),o(0,.093,2400,.64),o(.023,.212,580,.57);break;case"smallShot":a(0,.054,1550,580,.33,.1),o(0,.042,3600,.56);break;case"impact":a(0,.23,115,49,.63,.52),o(.004,.25,1050,.89),o(.044,.23,370,.47);break;case"wallHit":o(0,.045,3100,.56),a(0,.124,650,440,.36),a(.008,.14,1050,750,.19);break;case"wallBreak":a(0,.23,174,57,.61,.33),o(0,.27,1970,.96);for(let[u,f]of[[.079,750],[.147,490],[.227,330]])o(u,.045,2850,.41),a(u,.13,f,f*.81,.22);break;case"plus":l(0,.107,622,.56),l(.06,.15,932,.68);break;case"longRange":l(0,.15,523,.48),l(.07,.17,784,.55),a(.14,.28,960,1175,.38);break;case"guardUp":a(0,.26,245,370,.45,.2),l(.055,.28,622,.57);break;case"merge":a(0,.24,320,752,.24),l(0,.16,523,.53),l(.075,.19,659,.59),l(.147,.24,988,.68);break;case"slam":o(0,.18,2e3,.78),a(0,.36,167,43,.96,.58),o(.035,.39,520,.84),o(.092,.13,1400,.44);break;case"bruiserStrike":o(0,.27,670,.7),a(0,.27,153,61,.74);break;case"diverStrike":o(0,.27,2300,.67),a(.01,.26,480,120,.42);break;case"wardenCast":a(0,.44,96,53,.77,.5),o(.05,.57,820,.68);break;case"drillStrike":l(0,.24,1450,.59),l(.05,.24,860,.5);break;case"kestrelCast":o(0,.56,3300,.58),a(.04,.52,830,1320,.35);break;case"engineStrike":a(0,.36,140,45,.81,.45),o(.015,.34,1350,.85);break;case"vaultLand":a(0,.2,115,49,.7),o(.01,.19,720,.61);break;case"glassBreak":o(0,.075,5100,.58);for(let[u,f]of[[0,2110],[.035,1560],[.075,2940],[.12,1020]])l(u,.19,f,.34);break;case"crateBreak":o(0,.17,1280,.8),o(.065,.14,2310,.43),a(0,.19,128,62,.39);break;case"latchHit":l(0,.14,1290,.58),o(0,.035,3e3,.3);break;case"rally":for(let[u,f]of[392,494,587,784].entries())l(u*.116,.34,f,.53);break;case"chainSnap":o(0,.048,4300,.65),l(.012,.19,1280,.45),l(.059,.18,711,.28);break;case"discharge":a(0,.29,1620,143,.66,.4),o(.05,.29,2900,.49);break;case"bossBurst":a(0,.5,182,41,1,.44),o(0,.12,4600,.85),o(.048,.54,850,.84),l(.23,.28,784,.32),l(.37,.39,1047,.33);break;case"victory":a(0,.35,144,48,.84,.37),o(.032,.31,720,.7);break;case"loss":l(0,.21,392,.57),l(.116,.22,330,.58),a(.246,.35,262,196,.64,.22);break;case"hit":o(0,.061,1290,.58),a(.003,.07,580,280,.24);break;case"critHit":l(0,.12,1760,.56),a(0,.1,880,1320,.36,.2),o(0,.045,4200,.35);break;case"evolve":for(let[u,f]of[523,659,784,1047,1319].entries())l(u*.072,.34,f,.56);a(.04,.45,262,523,.35,.22);break;case"overdrive":a(0,.52,220,46,.95,.52),o(0,.34,2400,.85),l(.06,.3,659,.42),l(.14,.34,988,.48);break;case"bossEnrage":a(0,.56,135,58,.88,.55),o(.04,.52,1150,.72),a(.18,.42,180,92,.52,.35);break;case"barrelBlast":a(0,.42,155,38,.98,.55),o(0,.14,3800,.88),o(.04,.46,720,.9);break;case"lavaBurst":a(0,.46,120,48,.72,.4),o(0,.5,1650,.86);break;case"buy":l(0,.12,880,.52),l(.075,.2,1319,.62);break}let c=.001;for(let u of n)c=Math.max(c,Math.abs(u));for(let u=0;u<n.length;u++)n[u]*=.89/c;return t}function Bg(){let i,e,t,n,s=!1,r=!1,a=new Map,o=new Map,l=new Set;function c(h){l.delete(h),h.source.onended=null,h.source.disconnect(),h.gain.disconnect()}function u(){for(let h of l)h.source.stop(),c(h);o.clear()}function f(){if(!i)return;let h=i.currentTime;t.gain.cancelScheduledValues(h),t.gain.setTargetAtTime(s&&!r?.8:0,h,.008)}function d(){if(s&&i&&i.state!=="closed")return i.resume().catch(()=>{})}return{unlock(){if(s=!0,!i){let p=window.AudioContext||window.webkitAudioContext;if(!p)return;try{i=new p({latencyHint:"interactive"})}catch{return}e=i.createDynamicsCompressor(),e.threshold.value=-12,e.knee.value=9,e.ratio.value=5,e.attack.value=.004,e.release.value=.12,t=i.createGain(),t.gain.value=0,e.connect(t),t.connect(i.destination)}f();let h=d();return n?n.then(d):h},setMuted(h){r=!!h,r&&u(),f()},play(h,p=1,x=null){h==="merge"&&(x==="range"||x==="longshot"?h="longRange":(x==="shield"||x==="medic")&&(h="guardUp"));let g=Og[h];if(!g||!s||r||!i||i.state!=="running"||!(p>0))return;let m=i.currentTime;if(m-(o.get(h)??-1/0)<g.interval||l.size>=16)return;o.set(h,m),a.has(h)||a.set(h,mS(i,h));let v=i.createBufferSource(),M=i.createGain(),_={source:v,gain:M};v.buffer=a.get(h);let b=h==="plus"||h==="merge"||h==="victory"||h==="loss";v.playbackRate.value=b?1:.95+Math.random()*.1,M.gain.value=g.gain*Math.min(1.36,.45+.55*Math.sqrt(p)),v.connect(M),M.connect(e),l.add(_),v.onended=()=>c(_),v.start()},pause(){if(s=!1,u(),f(),!i||i.state==="closed")return;let h=i.suspend().catch(()=>{});return n=h,h.then(()=>{n===h&&(n=void 0)}),h}}}var kg="xiaobing-jinhua-save-v3",Nh=[{id:"squad",name:"\u8D77\u59CB\u7F16\u5236",desc:"\u5F00\u5C40\u989D\u5916\u643A\u5E26\u58EB\u5175\u51FA\u51FB",maxLevel:5,costs:[80,160,280,440,650],format:i=>i?`+${i*2} \u58EB\u5175`:"\u57FA\u7840\u7F16\u5236",nextText:i=>`+${(i+1)*2} \u58EB\u5175`},{id:"cannon",name:"\u91CD\u70AE\u53E3\u5F84",desc:"\u6C38\u4E45\u63D0\u5347\u961F\u957F\u4E3B\u70AE\u4E0E\u9F50\u5C04\u4F24\u5BB3",maxLevel:5,costs:[90,180,310,480,700],format:i=>i?`+${i*12}% \u70AE\u4F24`:"\u6807\u51C6\u53E3\u5F84",nextText:i=>`+${(i+1)*12}% \u70AE\u4F24`},{id:"crit",name:"\u9AD8\u7206\u88C5\u836F",desc:"\u63D0\u5347\u5168\u961F\u66B4\u51FB\u7387\u4E0E\u66B4\u51FB\u7A7F\u900F\u611F",maxLevel:5,costs:[100,190,320,500,720],format:i=>i?`+${i*6}% \u66B4\u51FB`:"\u6807\u51C6\u88C5\u836F",nextText:i=>`+${(i+1)*6}% \u66B4\u51FB`},{id:"charge",name:"\u8D85\u8F7D\u7535\u5BB9",desc:"\u52A0\u5FEB\u6218\u672F\u8D85\u8F7D\u5145\u80FD\u5E76\u63D0\u5347\u521D\u59CB\u80FD\u91CF",maxLevel:5,costs:[85,170,290,450,660],format:i=>i?`+${i*18}% \u5145\u80FD`:"\u6807\u51C6\u7535\u5BB9",nextText:i=>`+${(i+1)*18}% \u5145\u80FD`}];function gS(){return{coins:0,stars:{},bestCombo:0,totalKills:0,upgrades:{squad:0,cannon:0,crit:0,charge:0}}}function zg(i=globalThis.localStorage){let e=gS();if(!i)return e;try{let t=i.getItem(kg);if(!t)return e;let n=JSON.parse(t);if(!n||typeof n!="object")return e;if(e.coins=Math.max(0,Math.trunc(Number(n.coins)||0)),e.bestCombo=Math.max(0,Math.trunc(Number(n.bestCombo)||0)),e.totalKills=Math.max(0,Math.trunc(Number(n.totalKills)||0)),n.stars&&typeof n.stars=="object")for(let[s,r]of Object.entries(n.stars)){let a=Math.trunc(Number(s)||0),o=Math.trunc(Number(r)||0);a>=1&&a<=3&&o>=1&&o<=3&&(e.stars[String(a)]=o)}if(n.upgrades&&typeof n.upgrades=="object")for(let s of Nh){let r=Math.trunc(Number(n.upgrades[s.id])||0);e.upgrades[s.id]=Math.max(0,Math.min(s.maxLevel,r))}}catch{return e}return e}function Ld(i,e=globalThis.localStorage){if(e)try{e.setItem(kg,JSON.stringify(i))}catch{}}function Qo(i){let e=i?.upgrades||{};return{extraAllies:(e.squad||0)*2,cannonMult:1+(e.cannon||0)*.12,critChanceBonus:(e.crit||0)*.06,overdriveRateMult:1+(e.charge||0)*.18,startingOverdrive:(e.charge||0)>=3?(e.charge-2)*14:0}}function Hg(i,e,t){let n=String(e.stage),s=i.stars[n]||0,r=0,a=[];if(t){r=1,a.push({ok:!0,text:"\u51FB\u8D25\u9996\u9886\u901A\u8FC7\u5173\u5361"});let d=e.squad.some(p=>p.kind==="captain"||p.kind==="titan");d&&r++,a.push({ok:d,text:"\u6210\u529F\u5408\u6210\u91CD\u70AE\u961F\u957F\u6216\u94A2\u94C1\u6307\u6325\u5B98"});let h=(e.maxCombo||0)>=25||e.squad.length>=8;h&&r++,a.push({ok:h,text:"\u6700\u9AD8\u8FDE\u51FB \u2265 25 \u6216 \u5B58\u6D3B\u5175\u529B \u2265 8"})}let o=45+e.stage*10,l=Math.min(120,Math.floor((e.score||0)*.45)),c=Math.min(80,Math.floor((e.maxCombo||0)*.8)),u=t&&r>s?(r-s)*35:0,f=t?o+l+c+u:Math.max(20,Math.floor(o*.35+l*.55));return i.coins+=f,i.totalKills+=e.score||0,i.bestCombo=Math.max(i.bestCombo,e.maxCombo||0),t&&r>s&&(i.stars[n]=r),{stars:r,prevStars:s,isNewBest:t&&r>s,reward:f,firstStarBonus:u,criteria:a}}function Gg(i,e){let t=Nh.find(r=>r.id===e);if(!t)return!1;let n=i.upgrades[e]||0;if(n>=t.maxLevel)return!1;let s=t.costs[n];return i.coins<s?!1:(i.coins-=s,i.upgrades[e]=n+1,!0)}function Dd(i){return Object.values(i.stars||{}).reduce((e,t)=>e+t,0)}var me=i=>document.getElementById(i),Zi=me("stage"),Oa=me("game"),Yd=me("start"),nl=me("startButton"),r1=me("veil"),Lr=me("bossbar"),xS=me("bossHud"),el=me("bossAlert"),Uh=me("squadRoster"),Fh=me("comboBox"),kh=me("overdriveBtn"),Vg=me("screenFx"),Xs=me("tip"),a1={hybrid:"\u6DF7\u5408",ai:"\u539F\u753B","3d":"\u7EAF 3D"},o1={hybrid:"\u5408\u6210\u91CD\u70AE\u961F\u957F\u3001\u94A2\u94C1\u6307\u6325\u5B98\u4E0E Boss \u5168\u90E8 3D \u7CBE\u96D5\uFF0C\u58EB\u5175\u53E0\u52A0 3D \u4E13\u5C5E\u88C5\u5907\u4E0E\u539F\u753B\u8D28\u611F\u3002",ai:"\u6240\u6709\u5175\u79CD\u4F7F\u7528\u52A8\u6001\u539F\u753B\u4E0E\u6D41\u5149\u7279\u6548\u3002","3d":"\u5168\u5458\u7EAF 3D \u6A21\u578B\uFF0C\u53EF\u8FD1\u8DDD\u79BB\u68C0\u89C6\u5206\u660E\u6B65\u6001\u30013D \u5175\u79CD\u88C5\u5907\u3001\u9AD8\u4E3E\u8FDE\u7838\u4E0E\u51FB\u9000\u5012\u5730\u3002"},vS=matchMedia("(pointer:coarse)").matches;me("instruction").textContent=vS?"\u5DE6\u53F3\u62D6\u52A8 \xB7 \u5403\u91D1\u95E8\u5408\u5175\u8FDB\u9636 \xB7 \u6EE1\u80FD\u70B9\u8D85\u8F7D\u9F50\u5C04":"WASD / \u65B9\u5411\u952E\u79FB\u52A8 \xB7 \u5403\u91D1\u95E8\u5408\u5175\u8FDB\u9636 \xB7 \u7A7A\u683C/E \u952E\u8D85\u8F7D";function l1(i){try{return localStorage.getItem(i)}catch{return null}}function c1(i,e){try{localStorage.setItem(i,e)}catch{}}var Vn=zg(),yS=new URL(location.href).searchParams.get("art"),Pi=[yS,l1("squad-art"),"hybrid"].find(i=>Object.prototype.hasOwnProperty.call(a1,i)),qs=l1("squad-mute")==="1",un=null,Ur=!1,Od=!1,vn=null,sl=null,Ii=!0,Ua=0,Dr=0,zh=0,Ys=0,Nd=0,Ud=0,h1=0,Bd=0,kd=!1,zd=!1,Hd=!1,Gd=0,Vd=!1,Yi=null,Fa=390,Zd=844,u1=66;function f1(){Fa=Zi.clientWidth||390,Zd=Zi.clientHeight||844;let i=me("level")?.closest(".hud");u1=i?i.offsetTop+i.offsetHeight+22:66}var Nr=new Set,jn=Bg();jn.setMuted(qs);function d1(){let i=qs?"\u5F00\u542F\u58F0\u97F3":"\u5173\u95ED\u58F0\u97F3";me("soundIcon").setAttribute("href",qs?"#i-mute":"#i-sound"),me("sound").setAttribute("aria-label",i),me("sound").title=i}d1();var Kd=24,$d=Array.from({length:Kd},()=>{let i=document.createElement("span");return i.className="popup",i.hidden=!0,me("popups").append(i),{el:i,active:!1,x:0,y:0,age:0,life:.72,vx:0,vy:0}}),_S=0;function MS(i){if(!un)return;let e=un.project(i.x,i.y,i.z);if(e.x<-40||e.x>Fa+40||e.y<10||e.y>Zd)return;let t=$d[_S++%Kd];t.active=!0,t.x=e.x,t.y=e.y,t.age=0,t.life=i.kind==="evolve"?1.25:i.kind==="crit"?.8:.64,t.vx=(Math.random()-.5)*26,t.vy=i.kind==="evolve"?-54:-64,t.el.dataset.kind=i.kind||"rocket",t.el.textContent=i.text,t.el.hidden=!1,t.el.style.opacity="1",t.el.style.transform=`translate3d(${e.x.toFixed(1)}px,${e.y.toFixed(1)}px,0) translate(-50%,-50%) scale(1.18)`}function Wg(i){for(let e=0;e<Kd;e++){let t=$d[e];if(!t.active)continue;t.age+=i;let n=t.age/t.life;if(n>=1){t.active=!1,t.el.hidden=!0;continue}t.x+=t.vx*i,t.y+=t.vy*i,t.vy*=Math.exp(-3.6*i);let s=n<.16?1.26-n:1-n*.16,r=n<.6?1:1-(n-.6)/.4;t.el.style.opacity=r.toFixed(2),t.el.style.transform=`translate3d(${t.x.toFixed(1)}px,${t.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${s.toFixed(2)})`}}function bS(){for(let i of $d)i.active=!1,i.el.hidden=!0}var ne=new Ml(i=>{i.kind!=="smallShot"&&i.kind!=="loss"&&un?.feedback(i),jn.play(i.kind,i.strength,i.supply),i.kind==="overdrive"||i.kind==="bossBurst"||i.kind==="finisher"||i.kind==="barrelBlast"?Ys=Math.max(Ys,.045):(i.kind==="wallBreak"||i.kind==="evolve"||i.kind==="bossEnrage")&&(Ys=Math.max(Ys,.032))}),Oh=Number(new URL(location.href).searchParams.get("stage"));Number.isInteger(Oh)&&Oh>=1&&Oh<=Nn&&ne.reset(Oh);ne.applyBonuses(Qo(Vn));var p1=new Map,m1=new Map,g1=new Map;for(let i of yi){let e=document.createElement("button");e.className="stage-card",e.type="button",e.role="radio",e.dataset.level=String(i.number),e.dataset.theme=i.theme;let t=document.createElement("div");t.className="stage-card-head";let n=document.createElement("span");n.className="stage-card-num",n.textContent=String(i.number).padStart(2,"0");let s=document.createElement("span");s.className="stage-card-stars",g1.set(i.number,s),t.append(n,s);let r=document.createElement("strong");r.className="stage-card-title",r.textContent=i.chapter.name;let a=document.createElement("span");a.className="stage-card-sub",a.textContent=i.badge,e.append(t,r,a),e.addEventListener("click",()=>SS(i.number)),me("homeStages").append(e),p1.set(i.number,e);let o=document.createElement("button");o.className="campaign-card",o.dataset.level=String(i.number),o.dataset.theme=i.theme;let l=document.createElement("b");l.className="campaign-num",l.textContent=String(i.number).padStart(2,"0");let c=document.createElement("div");c.className="campaign-info";let u=document.createElement("header"),f=document.createElement("small");f.textContent=`${i.chapter.name} \xB7 ${i.badge}`;let d=document.createElement("span");d.className="stage-stars",m1.set(i.number,d),u.append(f,d);let h=document.createElement("h3");h.textContent=i.name;let p=document.createElement("p");p.textContent=i.tagline,c.append(u,h,p),o.append(l,c),o.addEventListener("click",()=>Hh(i.number)),me("stageList").append(o)}function SS(i){if(ne.phase!=="ready"){Hh(i);return}ne.reset(i),ne.applyBonuses(Qo(Vn)),rl(),un?.reset(ne.x),un?.prepareBoss(ne.boss.kind).then(()=>{Ii=!0}),Ii=!0;let e=new URL(location.href);e.searchParams.set("stage",ne.stage),history.replaceState(null,"",e)}function rl(){me("missionBadge").textContent=ne.route.badge||"\u7CBE\u54C1\u5173\u5361",me("missionName").textContent=ne.route.name,me("missionTagline").textContent=ne.route.tagline||"",me("homeStars").textContent=`${Dd(Vn)} / ${Nn*3}`,me("homeCoins").textContent=String(Vn.coins);for(let[i,e]of p1.entries())e.setAttribute("aria-checked",String(i===ne.stage))}function Wd(){for(let i of yi){let e=Vn.stars[String(i.number)]||0,t="\u2605".repeat(e)+"\u2606".repeat(3-e);g1.get(i.number).textContent=t,m1.get(i.number).textContent=t}}Wd();rl();function x1(){me("armoryCoins").textContent=String(Vn.coins);let i=me("armoryList");i.textContent="";for(let e of Nh){let t=Vn.upgrades[e.id]||0,n=t>=e.maxLevel,s=n?0:e.costs[t],r=document.createElement("div");r.className="armory-item";let a=document.createElement("div");a.className="armory-info";let o=document.createElement("h4");o.textContent=e.name;let l=document.createElement("span");l.textContent=`Lv.${t}/${e.maxLevel} \xB7 ${e.format(t)}`,o.append(l);let c=document.createElement("p");c.textContent=n?`${e.desc}\uFF08\u5DF2\u6EE1\u7EA7\uFF09`:`${e.desc} \u2192 ${e.nextText(t)}`,a.append(o,c);let u=document.createElement("button");u.className="armory-buy",u.disabled=n||Vn.coins<s,u.textContent=n?"\u5DF2\u6EE1\u7EA7":`${s} \u519B\u9977`,u.addEventListener("click",()=>{Gg(Vn,e.id)&&(Ld(Vn),jn.unlock(),jn.play("buy",1),x1(),rl(),ne.phase==="ready"&&(ne.reset(ne.stage),ne.applyBonuses(Qo(Vn)),Ii=!0))}),r.append(a,u),i.append(r)}}function Jd(){Nr.clear(),Yi=null}function Bh(i,e){Xs.textContent=i,Xs.hidden=!1,h1=ne.elapsed+e}function jd(i,e){if(Object.prototype.hasOwnProperty.call(a1,i)){Pi=Od?i:"3d",Zi.dataset.art=Pi,Ii=!0,e&&c1("squad-art",Pi);for(let t of me("options").children)t.setAttribute("aria-pressed",String(t.dataset.art===Pi)),t.disabled=!Od&&t.dataset.art!=="3d";vn==="art"&&(me("detail").textContent=o1[Pi])}}function il(){Ur&&(v1(),ne.start(),jn.unlock(),Yd.hidden=!0,me("pause").hidden=!1,Zi.dataset.phase=ne.phase,f1())}function Hh(i=ne.stage){Jd(),bS(),ne.reset(i),ne.applyBonuses(Qo(Vn)),rl(),un.prepareBoss(ne.boss.kind).then(()=>{Ii=!0}),un.reset(ne.x),Ua=0,zh=0,Ys=0,Xs.hidden=!0,el.hidden=!0,Bd=0,kd=!1,zd=!1,Hd=!1,Gd=0,Vd=!1,Xd="",tl="";let e=new URL(location.href);e.searchParams.set("stage",ne.stage),history.replaceState(null,"",e),il()}function Zs(i){if(!Ur)return;Jd(),Ua=0,vn=i,Ii=!0,r1.hidden=!1,Zi.querySelector(".hud").inert=!0,Yd.inert=!0;let e=i==="result"?ne.phase:i,t={art:"art",levels:"map",pause:"pause",won:"medal",lost:"retreat",armory:"wrench"};if(me("dialog").dataset.panel=e,me("dialogIcon").setAttribute("href","#i-"+(t[e]||"flag")),me("dialogChapter").textContent=i==="levels"?`\u4E09\u5173\u7CBE\u54C1\u8FDC\u5F81 \xB7 \u5DF2\u6536\u96C6 ${Dd(Vn)} / ${Nn*3} \u2605`:i==="armory"?"\u519B\u56E2\u6C38\u4E45\u5F3A\u5316":`\u7B2C ${ne.stage} \u5173 \xB7 ${ne.route.chapter.name}`,me("resultStats").hidden=i!=="result",me("resultStars").hidden=i!=="result",me("armoryPanel").hidden=i!=="armory",me("options").hidden=i!=="art",me("stageList").hidden=i!=="levels",me("dialog").classList.toggle("levels",i==="levels"),me("selectStage").hidden=i!=="pause"&&i!=="result",me("armoryAction").hidden=i!=="result",me("secondary").hidden=i!=="pause",i==="levels"){jn.pause(),Wd(),me("dialogTitle").textContent="\u9009\u62E9\u5173\u5361",me("detail").textContent="\u4E09\u5173\u5404\u6709\u72EC\u7ACB\u673A\u5173\u3001\u5730\u5F62\u4E0E Boss \u6F14\u51FA\uFF0C\u70B9\u9009\u7ACB\u523B\u5F00\u6218\u3002",me("continue").textContent="\u8FD4\u56DE";for(let n of me("stageList").querySelectorAll("[data-level]"))n.setAttribute("aria-current",String(+n.dataset.level===ne.stage))}if(i==="armory"&&(jn.pause(),x1(),me("dialogTitle").textContent="\u519B\u68B0\u6574\u5907",me("detail").textContent="\u6D88\u8017\u8FDC\u5F81\u519B\u9977\u6C38\u4E45\u5F3A\u5316\u5C0F\u961F\u521D\u59CB\u6218\u529B\u4E0E\u589E\u63F4\u89C4\u6A21\u3002",me("continue").textContent="\u5B8C\u6210\u6574\u5907"),i==="art"&&(jn.pause(),me("dialogTitle").textContent="\u89D2\u8272\u753B\u9762",me("detail").textContent=o1[Pi],me("continue").textContent="\u786E\u5B9A",jd(Pi,!1)),i==="pause"&&(jn.pause(),me("dialogTitle").textContent="\u6218\u672F\u6682\u505C",me("detail").textContent=ne.route.name+" \xB7 "+ne.route.tagline,me("continue").textContent="\u7EE7\u7EED\u6218\u6597"),i==="result"){let n=ne.phase==="won";if(me("resultKills").textContent=ne.score,me("resultMerges").textContent=ne.mergeCount,me("resultCombo").textContent=ne.maxCombo,!Vd){Vd=!0;let s=Hg(Vn,ne,n);Ld(Vn),rl(),Wd();let r=me("starRow").children;for(let a=0;a<3;a++)r[a].classList.toggle("lit",a<s.stars);me("resultReward").textContent=`+${s.reward} \u519B\u9977`+(s.firstStarBonus?" (\u9996\u661F\u7FFB\u500D)":"")}if(n)me("dialogTitle").textContent=ne.stage===Nn?"\u4E09\u5173\u5168\u5236\u9738!":`\u7B2C ${ne.stage} \u5173\u5236\u80DC!`,me("detail").textContent=ne.stage<Nn?`\u4E0B\u4E00\u6218\uFF1A${yi[ne.stage].chapter.name} \xB7 ${yi[ne.stage].name}`:"\u4E09\u5173\u7CBE\u54C1\u6218\u5F79\u5168\u90E8\u901A\u5173\uFF01\u53EF\u7EE7\u7EED\u51B2\u523A\u5168 9 \u661F\u4E0E\u94A2\u94C1\u6307\u6325\u5B98\uFF01";else{let s={signature:["\u5168\u519B\u8986\u6CA1",En[ne.boss.kind].name+"\u7684"+En[ne.boss.kind].skill+"\u51FB\u6E83\u4E86\u9635\u5217\u3002"],bossShot:["\u5168\u519B\u8986\u6CA1","\u961F\u4F0D\u88AB\u9996\u9886\u5F39\u5E55\u538B\u57AE\u3002"],gap:["\u5760\u5165\u65AD\u6865","\u9047\u5230\u65AD\u6865\u7F3A\u53E3\u63D0\u524D\u6362\u9053\u907F\u5F00\u3002"],infantry:["\u9632\u7EBF\u544A\u7834","\u7EA2\u5175\u51B2\u950B\u6D88\u8017\u5149\u4E86\u62A4\u536B\u4E0E\u6838\u5FC3\u5927\u5175\u3002"],skyfall:["\u9668\u77F3\u7838\u6BC1","\u6CE8\u610F\u7EA2\u5708\u9884\u8B66\uFF0C\u63D0\u524D\u8D70\u4F4D\u95EA\u907F\u9668\u77F3\uFF01"],lava:["\u7194\u5CA9\u541E\u566C","\u7194\u5CA9\u88C2\u53E3\u84C4\u529B\u53D8\u4EAE\u65F6\u53CA\u65F6\u5207\u9053\u907F\u5F00\uFF01"],roller:["\u6EDA\u6728\u78BE\u538B","\u5DE6\u53F3\u95EA\u907F\u6EDA\u6728\uFF0C\u6216\u96C6\u706B\u8F70\u788E\u5B83\u83B7\u53D6 +3 \u63F4\u5175\uFF01"],wall:["\u63A8\u4E0B\u6865\u9762","\u88AB\u88C5\u7532\u786C\u5899\u63A8\u5230\u4E86\u8DD1\u9053\u8FB9\u7F18\u3002"],breach:["\u9632\u7EBF\u5931\u5B88","Boss \u7A81\u7834\u4E86\u6865\u9762\u9632\u7EBF\u3002"],slam:["\u91CD\u62F3\u7838\u6E83","Boss \u8FDE\u7EED\u4E3E\u624B\u7838\u5730\u65F6\u6CE8\u610F\u907F\u5F00\u5730\u9762\u7EA2\u5708\uFF01"]},r=ne.boss.active&&!ne.boss.defeated?`\u9996\u9886\u5269\u4F59 ${Math.ceil(ne.boss.hp)} / ${ne.boss.maxHp} \u751F\u547D`:"\u5C0F\u961F\u9635\u4EA1\uFF0C\u591A\u5403\u91D1\u95E8\u5408\u6210\u5927\u5175\u518D\u6218\uFF01",[a,o]=s[ne.lossReason]||["\u6218\u6597\u5931\u5229",r];me("dialogTitle").textContent=a,me("detail").textContent=o}me("continue").textContent=n&&ne.stage<Nn?"\u5F81\u6218\u4E0B\u4E00\u5173":"\u518D\u6B21\u6311\u6218"}i==="levels"?me("stageList").querySelector("[aria-current=true]")?.focus({preventScroll:!0}):me("continue").focus({preventScroll:!0})}function v1(){Ii=!0,vn=null,sl=null,r1.hidden=!0,Zi.querySelector(".hud").inert=!1,Yd.inert=!1,Ua=0}function y1(){let i=vn,e=sl;if(v1(),i==="result"){Hh(ne.phase==="won"?ne.stage<Nn?ne.stage+1:1:ne.stage);return}if((i==="art"||i==="levels"||i==="armory")&&e){Zs(e);return}ne.playing?jn.unlock():ne.phase==="ready"&&nl.focus({preventScroll:!0})}function _1(){!Ur||!ne.playing&&ne.phase!=="ready"&&!ne.resultReady||(sl=vn,Zs("levels"))}function M1(){Ur&&(sl=vn,Zs("armory"))}me("level").addEventListener("click",_1);me("selectStage").addEventListener("click",_1);me("openArmory").addEventListener("click",M1);me("armoryAction").addEventListener("click",M1);me("continue").addEventListener("click",y1);me("secondary").addEventListener("click",()=>Hh());nl.addEventListener("click",il);kh.addEventListener("pointerdown",i=>{i.stopPropagation(),!(!ne.playing||vn)&&(jn.unlock(),ne.triggerOverdrive())});me("sound").addEventListener("click",()=>{qs=!qs,c1("squad-mute",qs?"1":"0"),jn.setMuted(qs),qs||jn.unlock(),d1()});me("pause").addEventListener("click",()=>{ne.playing&&Zs("pause")});me("styles").addEventListener("click",()=>{sl=vn,Zs("art")});for(let i of me("options").children)i.addEventListener("click",()=>jd(i.dataset.art,!0));Oa.addEventListener("pointerdown",i=>{!Ur||vn||!i.isPrimary||i.button!==0||(ne.phase==="ready"&&il(),ne.playing&&(i.preventDefault(),Yi={id:i.pointerId,x:i.clientX,y:i.clientY},Oa.setPointerCapture(i.pointerId)))});Oa.addEventListener("pointermove",i=>{!Yi||i.pointerId!==Yi.id||vn||(ne.aim(ne.targetX+(i.clientX-Yi.x)*14.8/Fa,ne.targetZ+(i.clientY-Yi.y)*11/Zd),Yi.x=i.clientX,Yi.y=i.clientY)});function ES(i){i.pointerId===Yi?.id&&(Yi=null)}for(let i of["pointerup","pointercancel","lostpointercapture"])Oa.addEventListener(i,ES);var b1=["ArrowLeft","KeyA"],S1=["ArrowRight","KeyD"],E1=["ArrowUp","KeyW"],w1=["ArrowDown","KeyS"];window.addEventListener("keydown",i=>{if(!Ur||i.altKey||i.ctrlKey||i.metaKey)return;let e=i.code;if(vn){vn!=="result"&&(e==="Escape"||e==="KeyP")&&!i.repeat&&(i.preventDefault(),y1());return}if(b1.includes(e)||S1.includes(e)||E1.includes(e)||w1.includes(e)){i.preventDefault(),ne.phase==="ready"&&il(),Nr.add(e);return}i.repeat||((e==="Space"||e==="Enter")&&ne.phase==="ready"&&!(i.target instanceof HTMLButtonElement&&i.target!==nl)?(i.preventDefault(),il()):(e==="KeyE"||e==="Space"||e==="ShiftLeft"||e==="ShiftRight")&&ne.playing&&!(e==="Space"&&i.target instanceof HTMLButtonElement)?ne.overdrive>=100&&(i.preventDefault(),jn.unlock(),ne.triggerOverdrive()):(e==="KeyP"||e==="Escape")&&ne.playing&&(i.preventDefault(),Zs("pause")))});window.addEventListener("keyup",i=>Nr.delete(i.code));function Qd(){Jd(),ne.playing&&!vn&&Zs("pause")}window.addEventListener("blur",Qd);document.addEventListener("visibilitychange",()=>{Dr=0,document.hidden&&Qd()});var Xg=-1,qg=-1,Yg=-1,Zg=-1,Kg=-1,tl="",$g=-1,Jg=-1,Fd="",jg="",Xd="",Qg=1,e1=null,t1=-1,qd=matchMedia("(prefers-reduced-motion: reduce)"),wS=2*Math.PI*27;function n1(i,e,t){if(e===t)return;let n=me(i);if(n.textContent=e,!(!ne.playing||t<0||qd.matches||!n.animate)){for(let s of n.getAnimations())s.cancel();n.animate([{transform:"scale(1.22)",color:e>t?"#ffe366":"#ff937d"},{transform:"scale(1)",color:"#ffffff"}],{duration:220,easing:"ease-out"})}}function i1(){if(ne.popups.length){for(let h=0;h<ne.popups.length;h++)MS(ne.popups[h]);ne.popups.length=0}let i=gl(ne.squad),e=i.total,t=ne.cannonDamage,n=me("level"),s="\u7B2C "+ne.stage+" \u5173";me("levelText").textContent!==s&&(me("levelText").textContent=s);let r=Math.min(100,Math.floor(100*ne.row/ne.finaleRow));r!==t1&&(me("progress").firstElementChild.style.transform="scaleX("+r/100+")",me("progress").setAttribute("aria-valuenow",String(r)),t1=r),n.title=ne.route.name+" \xB7 \u5207\u6362\u5173\u5361";let a=ne.playing,o=ne.boss,l=o.active&&!o.defeated&&un.project(o.x,0,o.z).y>=4;if(Uh.hidden=!a||l,a&&!l){let h=ne.highestUnitTier,p=`${h}:${i.t1}:${i.t2}:${i.t3}:${i.t4}`;if(p!==tl){let x=tl&&h>Number(tl.split(":")[0]);tl=p,Uh.dataset.tier=String(h),me("evoLevel").textContent=`T${h}`,me("rosterT1").textContent=String(i.t1),me("chipT2").hidden=i.t2===0,me("rosterT2").textContent=String(i.t2),me("chipT3").hidden=i.t3===0,me("rosterT3").textContent=String(i.t3),me("chipT4").hidden=i.t4===0,me("rosterT4").textContent=String(i.t4),x&&!qd.matches&&Uh.animate&&Uh.animate([{transform:"scale(1.18)"},{transform:"scale(1)"}],{duration:280,easing:"ease-out"})}}let c=[];ne.overdriveActive>0&&c.push(["\u8D85\u8F7D\u8D85\u9891",Math.ceil(ne.overdriveActive)+"s","gold"]);for(let[h,p]of Object.entries(ne.buffs))if(p>0&&cn[h]){let x=cn[h];c.push([x.label,Math.ceil(p)+"s",h==="frost"?"ice":x.tone])}ne.planks&&c.push(["\u4FBF\u6865","\xD7"+ne.planks,"gold"]),ne.chill>0&&c.push(["\u971C\u51BB\u51CF\u901F",Math.ceil(ne.chill)+"s","ice"]);let u=a?c.map(h=>h.join(":")).join("|"):"";if(u!==Xd){Xd=u;let h=me("buffs");h.hidden=!u,h.textContent="";for(let[p,x,g]of c){let m=document.createElement("span");m.className="buff-chip",m.dataset.tone=g;let v=document.createElement("small");v.textContent=x,m.append(p,v),h.append(m)}}let f=a&&ne.combo>=3;if(Fh.hidden=!f,f&&(ne.combo!==$g&&($g=ne.combo,me("comboCount").textContent=String(ne.combo),me("comboMult").textContent=`\xD7${ne.comboDamageMult.toFixed(2)} \u706B\u529B`,Fh.dataset.hot=ne.combo>=80?"3":ne.combo>=40?"2":ne.combo>=15?"1":"0",!qd.matches&&Fh.animate&&Fh.animate([{transform:"scale(1.16)"},{transform:"scale(1)"}],{duration:150,easing:"ease-out"})),me("comboFill").style.transform=`scaleX(${Math.max(0,Math.min(1,ne.comboTimer/3.4)).toFixed(3)})`),kh.hidden=!a,a){let h=ne.overdriveActive>0,p=h?Math.round(ne.overdriveActive/4.4*100):Math.floor(ne.overdrive),x=!h&&ne.overdrive>=100,g=h?"active":x?"ready":"charge";g!==Fd&&(Fd=g,kh.dataset.ready=String(x),kh.dataset.active=String(h)),(p!==Jg||g!==Fd)&&(Jg=p,me("odArc").style.strokeDashoffset=(wS*(1-p/100)).toFixed(1),me("odLabel").textContent=h?"\u8D85\u8F7D\u4E2D":x?"\u9F50\u5C04!":p+"%")}let d=a?ne.hurt>.25?"hurt":ne.overdriveActive>0||ne.buffs.fever>0?"overdrive":ne.chill>0?"chill":"":"";if(d!==jg&&(jg=d,d?Vg.dataset.fx=d:delete Vg.dataset.fx),n1("count",e,Xg),n1("power",t,qg),Xg=e,qg=t,Zi.dataset.phase=ne.phase,Lr.hidden=!l,xS.hidden=!l,l){let h=En[o.kind],[p,x]=h.crown,g=o.z+x*Math.cos(o.yaw),m=un.project(o.x,p+o.lift,g);if(Pi!=="ai"&&Hf[o.kind]){m.y=1/0;for(let[R,A,L]of Hf[o.kind]){let O=o.z+A*Math.cos(o.yaw)-L*Math.abs(Math.sin(o.yaw));m.y=Math.min(m.y,un.project(o.x,R+o.lift,O).y-9)}}let v=un.project(o.x+1,p+o.lift,g).x-m.x,M=Math.round(Math.min(Fa*.28,114,Math.max(66,v*2.55)));Kg!==M&&(Lr.style.setProperty("--hp-width",M+"px"),Kg=M),me("bossName").textContent!==h.name&&(me("bossName").textContent=h.name,me("bossHudName").textContent=h.name,me("bossHudSkill").textContent=h.skill),me("bossHudRage").hidden=!o.enraged;let _=u1+48,b=1-Math.min(1,Math.max(0,(m.y+4-_)/27));e1!==o&&(Qg=m.x<Fa/2?1:-1,e1=o);let S=M/2+6,y=Math.max(S,Math.min(Fa-S,m.x+Qg*b*(M/2+v*1.7))),E=Math.max(_,m.y+4);Lr.style.transform=`translate(${y.toFixed(1)}px,${E.toFixed(1)}px) translate(-50%, -100%)`;let C=Math.ceil(o.hp);if(C!==Yg||o.maxHp!==Zg){let R=Math.max(0,o.hp/o.maxHp);Lr.firstElementChild.style.transform=`scaleX(${R})`,Lr.lastElementChild.textContent=C,Lr.setAttribute("aria-valuenow",String(C)),Lr.setAttribute("aria-valuemax",String(o.maxHp)),me("bossHudFill").style.transform=`scaleX(${R})`,me("bossHudHp").textContent=`${C} / ${o.maxHp}`,Yg=C,Zg=o.maxHp}}ne.playing&&!vn&&(!kd&&ne.wall.hp>0&&ne.distance>=10&&ne.wall.z<0&&(kd=!0,Bh("\u6253\u788E\u786C\u5899\u62A2\u593A\u8FDB\u5316\u8865\u7ED9\uFF0C\u6216\u5411\u5DE6\u907F\u5F00\uFF01",2.8)),ne.wall.hp<=0&&Xs.textContent==="\u6253\u788E\u786C\u5899\u62A2\u593A\u8FDB\u5316\u8865\u7ED9\uFF0C\u6216\u5411\u5DE6\u907F\u5F00\uFF01"&&(Xs.hidden=!0),l&&!zd&&(zd=!0,me("bossAlertName").textContent=`${En[o.kind].name} \xB7 ${En[o.kind].skill}`,el.hidden=!1,Bd=ne.elapsed+1.9,Bh(En[o.kind].name+"\u6765\u88AD\uFF01\u5C0F\u5FC3\u8FDE\u7EED\u9AD8\u4E3E\u7838\u5730\u7EA2\u5708",2.4)),!el.hidden&&ne.elapsed>=Bd&&(el.hidden=!0),o.defeated&&!Hd&&o.defeatAge>=1.38&&(Hd=!0,Bh("\u9996\u9886\u5DF2\u88AB\u51FB\u9000\u51FB\u5012\uFF01\u6E05\u626B\u6B8B\u654C\u593A\u53D6\u80DC\u5229",2.3)),ne.hint&&ne.hint.id!==Gd&&(Gd=ne.hint.id,Bh(ne.hint.text,2.2)),!Xs.hidden&&ne.elapsed>=h1&&(Xs.hidden=!0)),!ne.playing&&ne.phase!=="ready"&&(Xs.hidden=!0,el.hidden=!0,me("pause").hidden=!0,ne.resultReady&&!vn&&Zs("result"))}function T1(i){if(requestAnimationFrame(T1),document.hidden)return;if(vn&&!Ii){Dr=i;return}if(!vn&&ne.phase==="ready"&&Dr&&i-Dr<1e3/29&&!Ii)return;Ii=!1;let e=Dr?(i-Dr)/1e3:1/60;Dr=i;let t=Math.min(.08,Math.max(0,e)),n=0;if(!vn){if(Ys>0){Ys=Math.max(0,Ys-t),Wg(t*.45),un.draw(ne,zh,0,0,Pi),i1();return}if(zh+=t,Wg(t),ne.playing||ne.phase==="won"||ne.phase==="lost")for(Ua+=t;Ua>=1/60;){let s=Number(S1.some(a=>Nr.has(a)))-Number(b1.some(a=>Nr.has(a))),r=Number(w1.some(a=>Nr.has(a)))-Number(E1.some(a=>Nr.has(a)));ne.tick(1/60,s,r),n+=ne.worldAdvance,Ua-=1/60}ne.playing&&(Ud+=t,e>.031&&Nd++,Ud>2.1&&(Nd>24&&un.lowerResolution(),Nd=0,Ud=0))}un.draw(ne,zh,vn?0:t,n,Pi),i1()}function s1(i){let e=me("problem");e.hidden=!1,e.textContent=i;let t=document.createElement("button");t.textContent="\u91CD\u65B0\u8F7D\u5165",t.onclick=()=>location.reload(),e.append(t)}async function TS(){try{un=Ug(Oa,Zi),un.reset(ne.x);let i=()=>{un.resize(),f1(),ne.entryZ=un.entryZ(),Ii=!0};i(),new ResizeObserver(i).observe(Zi),window.addEventListener("resize",i),Oa.addEventListener("webglcontextlost",t=>{t.preventDefault(),Qd(),s1("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u6E38\u620F\u3002")});let[e]=await Promise.all([un.assets,un.prepareBoss(ne.boss.kind)]);Od=e,jd(Pi,!1),Ur=!0,Zi.dataset.phase="ready",nl.disabled=!1,nl.lastElementChild.textContent="\u7ACB\u523B\u51FA\u51FB",requestAnimationFrame(T1)}catch(i){console.error(i),s1("\u6E38\u620F\u9700\u8981\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5728 Safari \u6216 Chrome \u4E2D\u6253\u5F00\u3002")}}TS();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
