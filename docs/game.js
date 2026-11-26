var hh={speed:27,lift:0,tail:1.05},Bo={speed:23,lift:.34,tail:1.35},pa={speed:20,lift:.78,tail:2.05},Ps={speed:40,lift:.08,tail:4.15},vd=22,yd=30;function zo(s,e){let t=Math.min(1,e/s.aimDistance);return s.startY+(s.endY-s.startY)*t+4*s.lift*t*(1-t)}function hr(s,e,t){return t.x=s.startX+s.headingX*e,t.y=zo(s,e),t.z=s.startZ+s.headingZ*e,t}function Et(s,e,t){let n=Math.max(0,Math.min(1,(s-e)/(t-e)));return n*n*(3-2*n)}function ko(s){return Math.max(0,Math.min(1,(s-.3)/(.91-.3)))}var uh=(s,e,t)=>Math.min(t,Math.max(e,s)),Tn={bruiser:{crown:[4.91,0],name:"\u94C1\u62F3\u961F\u957F",skill:"\u9707\u6865\u91CD\u62F3",prompt:"\u91CD\u62F3\u84C4\u529B\uFF0C\u907F\u5F00\u62F3\u5370",color:"#ffc66c",height:4.5,aim:2.05,warm:.86,flight:.65,cooldown:6.3},diver:{crown:[3.74,-1.78],name:"\u6F6E\u94B3\u5DE8\u87F9",skill:"\u53CC\u94B3\u6F6E\u6C50",prompt:"\u53CC\u94B3\u5408\u51FB\uFF0C\u4E24\u9053\u6C34\u73AF\u4E4B\u95F4\u6709\u7A7A\u9699",color:"#39e4d5",height:2.32,aim:1.12,warm:.9,flight:.86,cooldown:6.3},warden:{crown:[3.47,-1.49],name:"\u91D1\u89D2\u91CD\u7280",skill:"\u94C1\u89D2\u51B2\u950B",prompt:"\u91CD\u7280\u538B\u4F4E\u4E86\u89D2\uFF0C\u95EA\u5F00\u91D1\u8272\u76F4\u9053",color:"#ffb847",height:2.84,aim:1.55,warm:1.12,flight:.82,cooldown:7.1},drill:{crown:[3.79,-1.65],name:"\u7D2B\u6676\u5730\u9F99",skill:"\u5730\u8109\u6676\u523A",prompt:"\u6676\u523A\u9010\u4E2A\u5192\u51FA\uFF0C\u79BB\u5F00\u7D2B\u5708",color:"#ce82ff",height:3.39,aim:1.6,warm:.89,flight:.52,cooldown:6.4},kestrel:{crown:[4.12,-2.03],name:"\u51B0\u7FFC\u98DE\u9F99",skill:"\u6781\u5BD2\u5410\u606F",prompt:"\u51B0\u9F99\u6B63\u5728\u5438\u6C14\uFF0C\u79BB\u5F00\u971C\u84DD\u6247\u5F62",color:"#78eaff",height:3.35,aim:1.92,warm:1.15,flight:.45,cooldown:6.5},engine:{crown:[3.72,-1.9],name:"\u7194\u7089\u86DB\u673A",skill:"\u7194\u82AF\u53CC\u70AE",prompt:"\u53CC\u70AE\u9501\u5B9A\uFF0C\u79BB\u5F00\u6A59\u7EA2\u843D\u70B9",color:"#ff8253",height:2.68,aim:1.33,warm:.94,flight:1.12,cooldown:6.8}},fh=(s,e)=>uh((s.age-s.warm-e.delay)/s.flight,0,1);function Md(s,e,t,n,i=0){if(e.shape==="circle")return Math.hypot(t-e.x,n-e.z)<e.radius+i;let r=e.x-s.x,a=e.z-s.z,o=Math.hypot(r,a)||1,c=((t-s.x)*r+(n-s.z)*a)/o,l=e.shape==="cone"?e.radius*uh(c/o,.05,1):e.radius;return c>-.1&&c<o+1.65+i&&Math.abs((t-s.x)*a-(n-s.z)*r)/o<l+i}function hg(s){let e=s.boss,t=e.kind,n=Tn[t],i=s.x,r=s.captainZ,a=i>.7?-1:1,o=[],c=(l,h,f,u=0,d="circle")=>o.push({x:uh(l,-5.85,5.85),z:h,radius:f,delay:u,shape:d,hit:!1});return t==="diver"?(c(i-1.55,r,.96),c(i+1.55,r,.96,.13)):t==="warden"?c(e.x,r+.42,1.04,0,"strip"):t==="drill"?(c(i,r-.64,.89),c(i+a*.68,r+.07,.88,.26),c(i+a*1.45,r+.68,.91,.52)):t==="kestrel"?c(i,r+.74,1.31,0,"cone"):t==="engine"?(c(i,r-.17,1.12),c(i+a*2.42,r+.52,1.14,.37)):c(i,r-.44,1.16),e.skill={kind:t,x:e.x,z:e.z+.38,height:n.aim,age:0,warm:n.warm,flight:n.flight,marks:o,casualties:0,damagedCaptain:!1},s.notice(n.prompt),e.skill}function ug(s,e,t){let n=s.stage<7?2:3;if(s.event(e.kind+"Strike",t.x,.1,t.z),s.allies=s.allies.filter(i=>{if(e.casualties>=n||!Md(e,t,i.x,i.z,.12))return!0;let r=s.fall(i,"blue",.7,t.x);return r.vy=e.kind==="engine"?3.8:2.6,e.casualties++,!1}),!(e.damagedCaptain||!Md(e,t,s.x,s.captainZ,.16))){if(e.damagedCaptain=!0,s.buffs.shield>0){s.event("shieldHit",s.x,.6,s.captainZ);return}e.kind==="kestrel"&&(s.chill=1.6),!(s.hitGuard>0)&&(s.hurt=1,s.hitGuard=1.15,s.armor--,s.armor<=0&&(s.lossReason="signature",s.finish(!1)))}}function bd(s,e){let t=s.boss;if(!t.skill){t.nextCast-=e,t.z>=-26&&t.z<-5.2&&!s.activeGround.some(i=>i.finale&&!i.crossed&&Math.abs(i.z-t.z)<7)&&!t.vault&&!t.attackT&&t.nextCast<=0&&hg(s);return}let n=t.skill;n.age+=e,!n.fired&&n.age>=n.warm&&(n.fired=!0,s.event(n.kind+"Cast",t.x,Tn[n.kind].aim,t.z+.37));for(let i of n.marks)if(!i.hit&&fh(n,i)>=1&&(i.hit=!0,ug(s,n,i),!s.playing))return;n.age>n.warm+n.flight+n.marks.at(-1).delay+.65&&(t.skill=null,t.nextCast=Tn[t.kind].cooldown)}var Pi=s=>4.4*s,ma=s=>["\u5DE6\u8DEF","\u4E2D\u8DEF","\u53F3\u8DEF"][s+1],ur={quay:{floor:"#c6bac1",joint:"#a699a6",line:"#8e7f8f",rim:"#fff2dc",deep:"#1e5368",glint:"#73b3b0",frame:"#517180"},timber:{floor:"#c69968",joint:"#956c49",line:"#785940",rim:"#ffe2a4",deep:"#28564e",glint:"#95bea0",frame:"#816448"},quarry:{floor:"#d4af8a",joint:"#ad8867",line:"#966d4d",rim:"#ffe9b1",deep:"#814e3f",glint:"#d99b68",frame:"#986f58"},forge:{floor:"#a0acb5",joint:"#728290",line:"#485f74",rim:"#f5cf83",deep:"#293b4e",glint:"#85afaf",frame:"#546a79"},ice:{floor:"#c2dce5",joint:"#94b8ce",line:"#769bb7",rim:"#f9ffff",deep:"#245779",glint:"#a5e7e7",frame:"#6e96ad"},cinder:{floor:"#a59aa3",joint:"#786d7c",line:"#675969",rim:"#ffd392",deep:"#512c3c",glint:"#fa9452",frame:"#6e5261"}},wt=(s,e,t=3.6)=>({kind:"gap",lane:s,at:e,length:t}),Dt=(s,e)=>({kind:"bridge",lane:s,at:e,length:4.4}),ht=(s,e,t="reserve")=>({kind:"cache",lane:s,at:e,reward:t}),Jt=(s,e)=>({kind:"coil",lane:s,at:e}),$t=(s,e,t)=>({kind:"belt",lane:s,at:e,direction:t,length:8.2}),fg=[["\u6E2F\u53E3\u5916\u6865","quay","bruiser",!1,[ht(-1,59,"squad")]],["\u65AD\u6728\u6808\u6865","timber","diver",!0,[wt(1,42),ht(-1,75,"engineer")]],["\u540A\u7D22\u7801\u5934","quay","warden",!1,[Dt(1,49),ht(-1,83,"medic")]],["\u91C7\u77F3\u5C94\u9053","quarry","drill",!1,[ht(1,37,"reserve"),wt(-1,65),Jt(0,94)]],["\u7ED3\u51B0\u7684\u8D27\u7EBF","ice","kestrel",!0,[$t(-1,41,1),wt(1,69),ht(0,89,"frost")]],["\u94F8\u94C1\u8239\u575E","forge","engine",!1,[Jt(-1,39),Dt(1,68),ht(-1,96,"engineer")]],["\u6797\u95F4\u6D6E\u6865","timber","bruiser",!0,[wt(-1,35),ht(1,53,"engineer"),wt(1,82),$t(0,104,-1)]],["\u76D0\u4ED3\u95F8\u53E3","quay","diver",!1,[ht(1,37,"medic"),Dt(-1,60),Jt(1,82),wt(0,105)]],["\u53CC\u58C1\u77FF\u5ECA","quarry","warden",!1,[ht(-1,35,"reserve"),ht(1,55,"frost"),wt(0,80),Dt(-1,105)]],["\u7089\u524D\u6025\u5F2F","cinder","drill",!0,[$t(1,39,-1),Jt(0,61),Dt(-1,86),ht(1,107,"reserve")]],["\u51B0\u6CB3\u6E21\u53E3","ice","diver",!0,[wt(0,37),Dt(1,60),ht(-1,84,"engineer"),wt(-1,107)]],["\u94A2\u6881\u63A5\u529B","forge","warden",!1,[$t(0,34,1),ht(1,53,"medic"),Dt(-1,77),Jt(0,106)]],["\u6811\u6D77\u6551\u63F4","timber","kestrel",!1,[ht(-1,33,"medic"),wt(1,58),$t(0,80,-1),ht(-1,105,"reserve")]],["\u6F6E\u6C50\u53CC\u95F8","quay","engine",!0,[Dt(-1,36),Jt(1,54),Dt(1,81),ht(0,108,"frost")]],["\u788E\u77F3\u8FD0\u6CB3","quarry","drill",!0,[Jt(1,35),wt(-1,57),ht(0,78,"engineer"),wt(1,99),$t(-1,116,1)]],["\u7070\u70EC\u8F6C\u8FD0\u7AD9","cinder","bruiser",!1,[$t(-1,38,1),ht(0,52,"reserve"),Jt(1,75),Dt(-1,97),wt(1,119)]],["\u971C\u955C\u5F2F\u6865","ice","kestrel",!0,[$t(0,35,-1),wt(1,55),ht(-1,73,"engineer"),$t(1,93,-1),wt(0,116),ht(-1,138,"reserve")]],["\u91CD\u9524\u88C5\u914D\u7EBF","forge","engine",!1,[ht(1,36,"frost"),$t(-1,55,1),Dt(1,75),Jt(0,98),ht(-1,121,"reserve")]],["\u60AC\u6728\u8D27\u67B6","timber","warden",!0,[Dt(1,37),wt(-1,56),ht(0,79,"medic"),wt(1,101),Jt(-1,123)]],["\u706F\u5854\u591C\u822A","quay","diver",!0,[Jt(0,34),ht(-1,54,"engineer"),Dt(1,77),$t(0,96,1),wt(-1,120)]],["\u6DF1\u4E95\u6298\u8FD4","quarry","drill",!1,[wt(1,37),$t(0,56,-1),ht(-1,78,"frost"),Dt(1,102),Jt(0,123)]],["\u7089\u6E23\u957F\u5824","cinder","engine",!0,[ht(-1,35,"reserve"),Dt(1,54),Jt(-1,74),$t(0,94,-1),wt(1,119)]],["\u51B0\u810A\u53CC\u7D22","ice","warden",!1,[Dt(-1,34),ht(1,52,"engineer"),wt(0,72),Dt(1,94),wt(-1,124),ht(-1,143,"squad")]],["\u98CE\u8F6E\u5DE5\u573A","forge","kestrel",!0,[$t(1,35,-1),Jt(0,55),$t(-1,75,1),ht(1,95,"medic"),Dt(0,121)]],["\u6797\u8C37\u6700\u540E\u4E00\u8DE8","timber","diver",!0,[wt(-1,34),ht(1,52,"engineer"),Dt(0,72),wt(1,93),Jt(-1,114),ht(1,134,"reserve")]],["\u5916\u6E2F\u5C01\u9501\u7EBF","quay","bruiser",!1,[ht(1,35,"reserve"),Dt(-1,55),$t(0,75,1),Jt(1,95),Dt(1,115),wt(-1,134)]],["\u8FDE\u9501\u77FF\u4E95","quarry","drill",!0,[Jt(-1,33),ht(0,51,"frost"),wt(1,72),$t(-1,91,1),Dt(1,112),ht(-1,132,"medic")]],["\u6781\u591C\u51B0\u5824","ice","kestrel",!0,[wt(1,33),$t(-1,51,1),Dt(0,73),ht(-1,92,"engineer"),wt(0,114),$t(1,136,-1)]],["\u7EA2\u7089\u4E09\u7EBF","forge","warden",!1,[Dt(1,35),Jt(-1,53),ht(0,73,"reserve"),wt(-1,93),Dt(0,114),Jt(1,135)]],["\u7194\u5FC3\u7EC8\u6865","cinder","engine",!0,[ht(-1,34,"engineer"),wt(1,52),Dt(-1,72),Jt(0,91),$t(1,110,-1),Dt(1,132),ht(-1,151,"medic")]]],ga=fg.map(([s,e,t,n,i],r)=>({number:r+1,name:s,theme:e,boss:t,vault:n,features:i,finale:226+r*4+[0,8,3,12,5][r%5],restEvery:[44,40,48,42,46][r%5],restLength:5.75+[.4,1.2,.15,.7,1.1][r%5]})),ss=ga.length;function xa(s,e){let t={glass:21,crates:49,shutter:78},n=s.kind==="cover"?t[s.variant]:s.kind==="cache"?60:s.kind==="bridge"?42:29,i=Math.round(n+(e-1)*(s.kind==="cover"?.75:1.15));return{...s,x:Pi(s.lane),z:-s.at,hp:i,maxHp:i,state:"ready",age:0,flash:0,half:s.kind==="cover"?1.94:s.kind==="cache"?1.67:.74,depth:s.kind==="cover"?.46:s.kind==="cache"?.38:.34}}function Ls(s){return s.kind==="gap"&&s.state!=="repaired"||s.kind==="bridge"&&s.state==="cut"}function Ho(s,e,t,n=0){return Ls(s)&&Math.abs(e-s.x)<4.4/2-.14-n&&Math.abs(t-s.z)<s.length/2-n}var Li=4.4-.4,Yn={plus:{label:"+3",hp:10,count:3,tone:"blue"},squad:{label:"+5",hp:39,count:5,tone:"blue"},merge:{label:"\u70AE+5",hp:45,tone:"gold"},range:{label:"\u8FDC\u5C04",hp:28,tone:"blue"},longshot:{label:"\u7A7F\u7532\u8FDC\u5C04",hp:37,tone:"gold"},rapid:{label:"\u8FDE\u5C04",hp:35,tone:"gold"},shield:{label:"\u62A4\u76FE",hp:41,tone:"blue"},blast:{label:"\u7206\u7834",hp:44,tone:"gold"},plasma:{label:"\u7535\u6D46",hp:45,tone:"blue"},spread:{label:"\u53CC\u53D1",hp:41,tone:"gold"},drone:{label:"\u652F\u63F4",hp:45,tone:"blue"},reserve:{label:"+6",hp:38,count:6,tone:"blue"},engineer:{label:"\u67B6\u6865",hp:35,tone:"gold"},medic:{label:"\u6551\u63F4",hp:30,tone:"blue"},frost:{label:"\u51B0\u5E55",hp:37,tone:"blue"},fever:{label:"\u72C2\u70ED",hp:48,tone:"gold"}};function dh(s,e,t,n){let i=Yn[t].hp+(t==="plus"?Math.min(8,n-1):(n-1)*1.05);return{x:s,at:e,z:-e,type:t,hp:i,maxHp:i,active:!0,flash:0}}var Sd=[[0,1,"glass","range","plus"],[1,-1,"crates","spread","squad"],[-1,0,"shutter","longshot","shield"],[1,0,"glass","blast","reserve"],[0,-1,"crates","drone","range"],[-1,1,"shutter","fever","squad"],[0,1,"glass","plasma","medic"],[1,-1,"crates","reserve","rapid"],[-1,0,"shutter","longshot","range"]];function Ed(s,e=[]){let t=[];function n(i,r,a){let o=dh(Pi(i),r,a,s);return t.push(o),o}n(0,11,"plus"),n(-1,16,"merge"),n(1,25,"squad");for(let i=0;i<10;i++){let r=36+i*16.2,[a,o,c,l,h]=Sd[(i+(s-1)*2)%Sd.length],f=s%2?1:-1,u=(m,_,y)=>!e.some(M=>M.lane===m&&M.at+(M.length||1)/2>=_-1.5&&M.at-(M.length||1)/2<=y+1.5),p=[...new Set([a*f,o*f,-1,0,1])].find(m=>u(m,r-3.6,r));if(p!==void 0){let m=n(p,r,l);m.coverSpec={kind:"cover",variant:c,lane:p,at:r-3.6,reward:l}}let x=r+(i%2?1.8:-.9),g=[o*f,0,-1,1].find(m=>m!==p&&u(m,x,x));g!==void 0&&n(g,x,h)}return t}var ph=(s,e,t)=>Math.min(t,Math.max(e,s)),mh=5.32,dg=.94;function gh(s){let e=s.boss,t=s.x,n=s.captainZ,i=Math.hypot(t-e.x,n-e.z);for(let r of s.allies){let a=Math.hypot(r.x-e.x,r.z-e.z);a<i&&(i=a,t=r.x,n=r.z)}return{x:t,z:n,distance:i}}function xh(s,e,t){let n=[];function i(r,a,o){r.z+o+.65<e||r.z-o-.65>t||n.push({x:r.x,z:r.z,half:a+dg,depth:o+.65})}for(let r of s.gates)r.active&&i(r,Li/2,.16);s.wall.hp>0&&i(s.wall,2.14,.32);for(let r of s.features)(r.kind==="cover"||r.kind==="cache")&&r.hp>0&&r.state==="ready"&&i(r,r.half,r.depth);return n}function _a(s,e,t){let n=xh(s,e,t),i=[...new Set([...s.wave||[0],0,-1,1])],r,a=1/0;for(let o of i){let c=o===0?-.42:Pi(o),l=n.filter(h=>Math.abs(c-h.x)<h.half+.12).length;if(l<a&&(r={lane:o,x:c,conflicts:l},a=l),!l)break}return r}function wd(s,e,t,n){let i=s.boss,r=i.z+s.worldAdvance,a=ph(i.pursuing?t.x:i.escortX??-.42,-mh,mh),o=i.pursuing?Math.min(r+n,Math.max(i.z-e*3.9,t.z-1.35)):r+n,c=xh(s,Math.min(r,o)-.2,Math.max(r,o)+3),l=a,h=x=>c.every(g=>Math.abs(x-g.x)>=g.half+.025);if(!h(a)||!h(i.x)){let x=[a,i.x,Pi(-1),0,Pi(1)];for(let m of c)x.push(m.x-m.half-.07,m.x+m.half+.07);let g=1/0;for(let m of x){if(Math.abs(m)>mh||!h(m))continue;let _=Math.abs(m-i.x)+.48*Math.abs(m-a);_<g&&(g=_,l=m)}}let f=(i.pursuing?5.1:c.length?3.5:1.2)*e,u=i.x+ph(l-i.x,-f,f),d=o;for(let x of c)Math.abs(u-x.x)>=x.half||Math.abs(d-x.z)>=x.depth||(Math.abs(i.x-x.x)>=x.half?u=x.x+Math.sign(i.x-x.x)*(x.half+.002):r<=x.z?d=Math.min(d,x.z-x.depth-.002):d=Math.max(d,x.z+x.depth+.002));let p=u-i.x;i.marched+=Math.hypot(p,d-r),i.yaw+=(ph(Math.atan2(p,Math.max(e*2,d-r)),-.6,.6)-i.yaw)*(1-Math.exp(-8*e)),i.x=u,i.z=d}function Td(s,e,t){let n=s.worldAdvance>0?2.3:0;return!xh(s,t-n*1.55,t+.25).some(i=>Math.abs(e-i.x)<i.half&&i.z-i.depth<=t&&i.z+n*1.55+i.depth>=t)}var Go=(s,e,t)=>Math.max(e,Math.min(t,s)),pg=new Set(["cache","bridge","coil","cover"]);function mg(s,e,t){let n=dh(e.x,s.distance-e.z+.85,t,s.stage);n.z=s.distance-n.at,s.gates.push(n),s.event("supplyBreak",e.x,.65,n.z)}function Ad(s,e,t){if(e.state!=="ready")return;let n=e.variant==="shutter"&&Math.abs(t.x-e.x)<.51,i=t.damage;if(n&&(i*=2.25),e.variant==="crates"&&t.kind==="rocket"&&(i*=1.4),e.hp=Math.max(0,e.hp-i),e.flash=1,e.hp>0){s.event(n?"latchHit":"wallHit",t.x,.65,t.z,.55);return}if(e.age=0,e.kind==="cover")if(e.state="open",e.variant==="glass"){s.event("glassBreak",e.x,.48,e.z);let r=a=>{a.alive&&Math.hypot(a.x-e.x,a.z-e.z)<2.45&&s.kill(a,.82,e.x)};for(let a of s.columns)for(let o of a.units)r(o);for(let a of s.runners)r(a)}else s.event(e.variant==="crates"?"crateBreak":"wallBreak",e.x,.48,e.z);else if(e.kind==="cache")e.state="open",s.event("wallBreak",e.x,.57,e.z),mg(s,e,e.reward);else if(e.kind==="bridge")e.state="cut",s.event("chainSnap",e.x,.85,e.z),s.notice(ma(e.lane)+"\u540A\u6865\u5DF2\u843D\uFF0C\u589E\u63F4\u88AB\u622A\u65AD");else if(e.kind==="coil"){e.state="discharged",s.event("discharge",e.x,.5,e.z,1.35);let r=a=>{a.alive&&Math.abs(a.z-e.z)<7&&Math.abs(a.x-e.x)<5.1&&s.kill(a,.9,e.x)};for(let a of s.columns)for(let o of a.units)r(o);for(let a of s.runners)r(a);s.boss.active&&!s.boss.defeated&&Math.abs(s.boss.z-e.z)<6&&Math.abs(s.boss.x-e.x)<5&&s.damageBoss(t,24)}}function Rd(s){let e=s.boss,t=s.bossStride,n=Math.max(4,(-23-e.z)*t/(2.3+t)),i=e.z+n+3,r=_a(s,e.z-1.1,i+3.8);for(let o of[-2,-4,-6]){if(!r.conflicts)break;let c=Math.max(e.z+5,e.z+n+3+o),l=_a(s,e.z-1.1,c+3.8);l.conflicts<r.conflicts&&(r=l,i=c)}e.x=e.escortX=r.x;let a=xa({kind:"gap",lane:r.lane,length:4,at:s.distance-i},s.stage);a.z=s.distance-a.at,a.finale=!0,s.features.push(a)}function Cd(s,e){s.activeGround.length=0;for(let t of s.features)if(t.z=s.distance-t.at,t.age+=e,t.flash=Math.max(0,t.flash-e*6),!(t.z<s.entryZ-12||t.z>15)){if((t.kind==="bridge"||t.kind==="gap"||t.kind==="belt")&&s.activeGround.push(t),!t.warned&&t.z>-22&&t.z<-14&&t.state==="ready"&&!t.finale){t.warned=!0;let n=ma(t.lane),i={gap:n+"\u65AD\u6865\uFF0C\u63D0\u524D\u6362\u9053",bridge:"\u6253\u65AD"+n+"\u540A\u7D22\uFF0C\u622A\u4F4F\u589E\u63F4",cache:"\u6253\u788E"+n+"\u7816\u5899\uFF0C\u53D6\u51FA\u8865\u7ED9",cover:t.variant==="glass"?n+"\u73BB\u7483\u74F6\uFF0C\u51FB\u788E\u53EF\u9707\u5012\u8FD1\u5175":t.variant==="crates"?n+"\u6728\u7BB1\uFF0C\u91CD\u70AE\u62C6\u5F97\u5FEB":n+"\u94A2\u95F8\uFF0C\u7784\u51C6\u6A59\u8272\u9501\u6263",coil:"\u51FB\u4E2D"+n+"\u7EBF\u5708\uFF0C\u653E\u7535\u6E05\u5175",belt:n+"\u4F20\u9001\u5E26\u5411"+(t.direction>0?"\u53F3":"\u5DE6")};s.notice(i[t.kind])}if(pg.has(t.kind)&&(t.target??(t.target={mechanism:t}),t.target.x=t.x,t.target.z=t.z+(t.kind==="bridge"?t.length/2+.24:0)),s.phase!=="clear"&&!t.escorted&&t.kind==="cache"&&t.z>=s.entryZ-5&&t.z<-8){t.escorted=!0;for(let n=0;n<2;n++)for(let i=-1;i<=1;i++){let r=s.grunt(t.x+i*.48,s.entryZ-.95-n*.59);r.speed=2.62,s.runners.push(r)}}if(s.phase!=="clear"&&t.kind==="bridge"&&t.state==="ready"&&t.z>=-7.1&&(t.state="linked",t.age=0,s.flanks.push({x:t.lane===0?4.44:t.x,remaining:16+Math.floor(s.stage/3),next:0}),s.notice(ma(t.lane)+"\u540A\u6865\u63A5\u901A\uFF0C\u589E\u63F4\u6765\u4E86")),t.kind==="belt"&&Math.abs(t.z-s.captainZ)<t.length/2&&Math.abs(s.x-t.x)<4.4/2-.1&&!s.rope&&s.aim(s.targetX+t.direction*e*1.32),Ls(t)&&s.planks&&t.z>-5.2&&t.z<1&&Math.abs(s.x-t.x)<4.4/2+.2&&!s.rope&&(s.planks--,t.state="repaired",t.age=0,s.event("plus",t.x,.24,t.z),s.notice(ma(t.lane)+"\u5DF2\u642D\u597D\u4FBF\u6865")),Ls(t)&&Math.abs(t.z)<t.length/2+2.8&&(s.allies=s.allies.filter(n=>{if(!Ho(t,n.x,n.z,.14))return!0;let i=s.fall(n,"blue",0);return i.intoGap=!0,i.vy=-.5,!1}),!s.rope&&Ho(t,s.x,s.captainZ,.22))){if(s.armor--,s.hurt=1,s.armor<=0){s.lossReason="gap",s.finish(!1);return}let n=t.lane===-1?1:t.lane===1?-1:s.x>=t.x?1:-1;s.rope={age:0,from:s.x,to:t.x+n*(4.4/2+.75)},s.aim(s.rope.to),s.hitGuard=1.05,s.notice("\u5B89\u5168\u7EF3\u62C9\u56DE\u961F\u957F\uFF0C\u62A4\u7532 \u22121")}}for(let t of s.flanks)if(t.next-=e,t.remaining>0&&t.next<=0){t.next+=.16,t.remaining--;let n=s.grunt(t.x+(t.remaining%3-1)*.12,s.entryZ-.92);n.speed=3.18,n.flank=!0,s.runners.push(n)}s.flanks=s.flanks.filter(t=>t.remaining>0)}function Id(s,e,t){e.lift=0;for(let n of s.activeGround){let i=e.z-n.z;if(n.kind==="belt"&&Math.abs(i)<n.length/2&&Math.abs(e.x-n.x)<4.4/2){e.x=Go(e.x+n.direction*t*.65,-6,6);continue}if(!Ls(n)||i<-n.length/2-4.3||i>n.length/2+.45||Math.abs(e.x-n.x)>4.4/2+.16)continue;if(e.role==="vault"){let o=Go((i+n.length/2+.55)/(n.length+1.1),0,1);e.lift=1.08*Math.sin(Math.PI*o);return}let r=n.lane===-1?1:n.lane===1||e.laneX<n.x?-1:1,a=n.x+r*(4.4/2+.24);if(e.x+=Go(a-e.x,-3.8*t,3.8*t),Ho(n,e.x,e.z,.22)){e.alive=!1;let o=s.fall(e,"red",0);o.intoGap=!0,o.vy=-.7}return}}function Pd(s,e){let t=s.boss;t.vault={piece:e,t:0,from:t.z-e.z,to:e.length/2+1.08},t.attackT=0,t.recovery=.15,e.crossed=!0}function Ld(s,e){let t=s.boss,n=t.vault;n.airDash&&(n.piece.z+=s.worldAdvance),n.t+=e;let i=Go((n.t-.21)/.89,0,1),r=i*i*(3-2*i);t.z=n.piece.z+n.from+(n.to-n.from)*r,t.lift=2.5*4*i*(1-i),n.t>=1.1&&!n.landed&&(n.landed=!0,s.event("vaultLand",t.x,.06,t.z,.9)),n.t>=1.35&&(t.vault=null,t.lift=0,t.recovery=.34)}var Pn=(s,e,t)=>Math.max(e,Math.min(t,s)),Xo=Math.PI*2,Nd=21,Dd=5.45,gg=1.38,Vo=11,xg=.565,_h=2.47,Ud=[[-1,1],[1,0],[-1,0],[1],[0,-1],[1,-1],[0],[0,1],[-1]],Wo=11;function vh(s,e){let t=0,n=s,i=8;for(;n>=i;)n-=i,t++,i=8+6*t;let r=Xo*n/i+.21+t*.18,a=.93+(e-1)*.46+t*.51;return[Math.cos(r)*a,Math.sin(r)*a*.92]}var qo=class{constructor(e=()=>{}){this.emit=e,this.reset()}reset(e=1){this.stage=Pn(Math.trunc(Number(e))||1,1,ss),this.route=ga[this.stage-1],this.features=this.route.features.map(i=>xa(i,this.stage)),this.activeGround=[],this.flanks=[],this.rope=null,this.planks=0,this.overrun=null,this.parade=null,this.chill=0,this.hint=null,this.hintSequence=0,this.rallyZ=-100,this.seed=129920+(this.stage-1)*1141,this.sequence=0,this.phase="ready",this.elapsed=0,this.distance=0,this.captainZ=0,this.targetZ=0,this.caught=!1,this.caughtBy=null,this.lossReason=null,this.worldAdvance=0,this.x=0,this.targetX=this.x,this.velocity=0,this.upgrades=0,this.scale=1,this.visualScale=1,this.recoil=0,this.mergeGlow=0,this.hurt=0,this.armor=3,this.shots=[],this.incoming=[],this.enemyFireTimer=0,this.allies=[],this.falling=[],this.deliveries=[],this.runners=[],this.rocketTimer=.18,this.volleyTimer=.06,this.volley=0,this.buffs={rapid:0,shield:0,plasma:0,spread:0,drone:0,fever:0,frost:0,range:0,longshot:0},this.supportTimer=0,this.feverMeter=0,this.row=0,this.toNextRow=0,this.entryZ??(this.entryZ=-46),this.finaleRow=this.route.finale,this.lastRow=this.finaleRow+48,this.hitGuard=0,this.score=0,this.recruits=0,this.endTime=0;let t=72+(this.stage-1)*2.1;this.wall={x:4.13,z:-Nd,hp:t,maxHp:t,flash:0};let n=365+(this.stage-1)*27;this.boss={x:-.42,z:this.entryZ-1.4,hp:n,maxHp:n,marched:0,hit:0,lift:0,active:!1,defeated:!1,removed:!1,skill:null,nextCast:0,kind:this.route.boss,vault:null,moveClock:0,special:0,pattern:0,brace:0,defeatAge:0,attackT:0,impactDone:!1,pursuing:!1,yaw:0,recovery:0,leapFromX:0,leapFromZ:0,landX:0,landZ:0},this.gates=Ed(this.stage,this.features),this.gates[2].cover=this.wall;for(let i of this.gates)i.coverSpec&&(i.cover=xa(i.coverSpec,this.stage),this.features.push(i.cover));this.bossStride=1.02+Math.min(.27,(this.stage-1)*.014),this.marchSpeed=_h+Math.min(.28,(this.stage-1)*.012),this.wave=null,this.columns=Array.from({length:Vo},(i,r)=>({index:r,minX:1/0,maxX:-1/0,units:[]})),this.recruit(this.x,!0)}rand(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}grunt(e,t){let n=e+(this.rand()-.5)*.16;return{x:n,laneX:n,z:t+(this.rand()-.5)*.08,id:++this.sequence,phase:this.rand()*Xo,marched:0,yaw:0,size:.92+this.rand()*.13,alive:!0}}event(e,t,n,i,r=1){this.emit({kind:e,x:t,y:n,z:i,strength:r})}notice(e){this.hint={id:++this.hintSequence,text:e}}start(){this.phase==="ready"&&(this.phase="run")}aim(e,t=this.targetZ){this.targetZ=Pn(t,0,gg),this.targetX=Pn(e,-Dd,Dd)}get playing(){return this.phase==="run"||this.phase==="boss"||this.phase==="clear"}get cannonDamage(){return 26+this.upgrades*5+Math.round((this.stage-1)*.88)}nextSlot(){let e=new Set(this.allies.map(n=>n.slot));for(let n of this.deliveries)n.slot!=null&&e.add(n.slot);let t=0;for(;e.has(t);)t++;return t}recruit(e,t=!1,n=this.nextSlot()){if(this.allies.length>=48)return;let[i,r]=vh(n,this.scale);this.allies.push({slot:n,x:Pn(e+i,-6.28,6.28),z:this.captainZ+r,age:t?2:0,phase:this.rand()*Xo}),t||this.recruits++}openCard(e){if(!e.active||e.cover?.hp>0)return;if(e.active=!1,e.collectedAt=this.elapsed,e.pop=0,this.event("supplyBreak",e.x,.62,e.z),e.type==="blast"){let n=e.x;this.blast({x:n,power:5.8},e.z-1.5),this.boss.active&&Math.hypot(this.boss.x-n,this.boss.z-e.z+1.5)<4.6&&this.damageBoss({kind:"rocket"},48);return}let t=Yn[e.type].count;for(let n=0;n<(t||1);n++){let i=t?this.nextSlot():null;if(i!=null&&i>=48)break;this.deliveries.push({type:e.type,slot:i,sx:e.x,sz:e.z,x:e.x,z:e.z,y:.46,age:-n*.065,progress:0,phase:this.rand()*Xo})}}updateDeliveries(e){for(let t of this.deliveries){if(t.age+=e,t.age<0)continue;let n=Math.min(1,t.age/.58),i=n*(2-n),[r,a]=t.slot==null?[0,-.18]:vh(t.slot,this.scale);if(t.progress=n,t.x=t.sx+(Pn(this.x+r,-6.28,6.28)-t.sx)*i,t.z=t.sz+(this.captainZ+a-t.sz)*i,t.y=.46*(1-n)+Math.sin(Math.PI*n)*(1.05+Math.min(1.25,Math.abs(t.sz)*.075)),!(n<1))if(t.slot!=null)this.recruit(this.x,!1,t.slot),this.event("plus",t.x,.12,t.z,.7);else{if(t.type==="merge")this.upgrades++,this.scale=1+Math.min(.64,this.upgrades*.13);else if(t.type==="engineer")this.planks=Math.min(2,this.planks+1),this.notice("\u4FBF\u6865 +1\uFF0C\u9760\u8FD1\u7F3A\u53E3\u81EA\u52A8\u67B6\u6865");else if(t.type==="medic"){this.armor=Math.min(3,this.armor+1);for(let o=0;o<2;o++)this.recruit(this.x);this.notice("\u6551\u63F4\u5230\u961F\uFF0C\u62A4\u7532 +1")}else if(t.type==="range"||t.type==="longshot")this.buffs[t.type]=t.type==="range"?7:5.5,this.notice(t.type==="range"?"\u5168\u961F\u8FDC\u5C04 \xB7 7\u79D2":"\u7A7F\u7532\u8FDC\u5C04 \xB7 5.5\u79D2");else{let o=t.type==="fever"?4.2:t.type==="shield"?5:6;this.buffs[t.type]=o}this.mergeGlow=1,this.event("merge",this.x,.23,this.captainZ)}}this.deliveries=this.deliveries.filter(t=>t.progress<1)}crossGates(){for(let e of this.gates){if(e.z=this.distance-e.at,!e.active){e.pop=this.elapsed-e.collectedAt;continue}this.caught||Math.abs(e.z-this.captainZ)>.83||Math.abs(this.x-e.x)<=Li/2+this.scale*.16&&this.openCard(e)}}marchPastBoss(e,t){let n=this.boss,i=e.z-n.z;if(!e.passSide&&e.x===e.laneX&&(i<-3.3||i>6.4))return;let r=n.attackT>0?n.landZ:n.z+.45,a=1-Et(Math.abs(i),1.45,3.25),o=n.attackT>0?1-Et(Math.abs(e.z-r),1.25,3.45):0,c=Math.max(1.42*a,1.9*o*Et(n.attackT,0,.31));if(c?e.passSide||(e.passSide=e.x<n.x?-1:1):e.passSide=0,!c&&e.x===e.laneX)return;let l=e.passSide||1,h=Math.max(.2,l>0?6.4-n.x:n.x+6.4),f=Pn(Math.abs(e.laneX-n.x)/h,0,1),u=e.laneX+l*c*(1-f);e.x+=(u-e.x)*(1-Math.exp(-9*t)),!c&&Math.abs(e.x-e.laneX)<.002&&(e.x=e.laneX)}spawnRow(){let e=Math.floor(this.row/Wo),t=this.row%Wo;if(!this.wave||this.row%(Wo*2)===0){let i=Math.floor(e/2)+(this.stage-1)*2,r=this.stage%2?1:-1;this.wave=Ud[i%Ud.length].map(c=>c*r);let a=this.distance+6+(-this.entryZ-6)*3.65/(3.65+this.marchSpeed),o=this.gates.find(c=>c.coverSpec&&Math.abs(c.at-a)<5.2);if(o&&i%3!==2){let c=o.coverSpec.lane;this.wave=this.wave.filter(l=>l!==c),this.wave.length||(this.wave=[c===0?r:0])}}let n=this.wave.length===1;for(let i of this.columns){let r=i.index,a=n?9:r<6?6:5,o=n||r<6?r:r-6,c=this.wave[n||r<6?0:1];if(o>=a||t<2&&(o===0||o===a-1))continue;let l=n?.43:.52,h=(this.row%2-.5)*.15,f=Pi(c)+(o-(a-1)/2)*l+h,u=this.entryZ-.86-.12*(o%2),d=i.units.at(-1),p=d?Math.min(u,d.z-.4):u,x=this.grunt(f,p);if(i.minX=Math.min(i.minX,x.x),i.maxX=Math.max(i.maxX,x.x),t===5&&i.index===e*7%Vo&&this.stage>=2){let g=["gunner"];this.stage>=3&&g.push("weaver","brute","vault"),this.stage>=4&&g.push("guard"),this.stage>=5&&g.push("bomber","standard"),this.stage>=7&&g.push("courier"),x.role=g[(e+this.stage)%g.length];let m=x.role==="brute"||x.role==="guard";x.size*=m?1.42:1.1,x.hp=m?9+this.stage*.65:3.2+this.stage*.27,x.speed=m?2.02:x.role==="weaver"?3.47:2.77,this.runners.push(x)}else t===2&&(i.index===e*3%Vo||i.index===(e*3+5)%Vo)?(x.speed=3.4+this.rand()*.25,this.runners.push(x)):i.units.push(x)}this.row++}moveGrunt(e,t,n){if(this.phase==="clear"&&(e.spent||e.z>this.captainZ+.75)&&(!e.overBody||e.z>e.overBody.z+1.06)){e.spent=!0,e.overBody=null;let h=this.x+(e.id%5-2)*.28,f=this.captainZ-2.15-e.id%3*.28,u=Pn(h-e.x,-5.1*t,5.1*t),d=Pn(f-e.z,-4.7*t,4.7*t);e.x+=u,e.z+=d,e.marched+=Math.hypot(u,d-this.worldAdvance),Math.abs(d)+Math.abs(u)>.001&&(e.yaw+=(Math.atan2(u,d)-e.yaw)*(1-Math.exp(-7*t)));return}let i=e.speed>=3.12,r=!e.spent&&e.z>=this.captainZ+(i?-8.4:-6.9)&&e.z<this.captainZ+1.65,a=e.x,o=e.speed??this.marchSpeed,c=0;if(r){let h=this.x,f=this.captainZ,u=Math.abs(h-e.x);for(let g of n){let m=Math.abs(g.x-e.x);m<u&&(u=m,h=g.x,f=g.z)}o*=i?1.48:1.32;let d=Math.max(.075,(f-e.z-.32)/(this.worldAdvance/t+o)),p=i?12.2:11.6,x=(e.id%7-3)*.065;c=Pn((h+x-e.x)/d,-p,p)*t,e.role==="weaver"&&(c+=Math.sin(e.phase+e.marched*7)*t*.74),e.x+=c}else if(e.spent)e.overX!=null&&(e.x+=Pn(e.overX-e.x,-3.3*t,3.3*t));else if(this.boss.active&&!this.boss.defeated){let h=e.x;this.marchPastBoss(e,t),c=e.x-h}if(this.activeGround.length?Id(this,e,t):e.lift=0,!e.alive)return;this.buffs.frost>0&&(o*=.48,e.x=a+(e.x-a)*.6),Math.abs(e.z-this.rallyZ)<2.7&&(o*=1.17),c=e.x-a;let l=o*t;e.z+=this.worldAdvance+l,e.marched+=Math.hypot(l,c),e.yaw+=(Math.atan2(c,l)-e.yaw)*(1-Math.exp(-9*t)),e.role==="gunner"&&!e.fired&&e.z>=-14&&e.z<-4&&this.enemyFireTimer<=0&&(this.enemyRound(e.x,e.z,.65,0,e),e.fired=!0),!e.spent&&e.z>this.captainZ-2&&e.z<this.captainZ+2.3&&this.contact(e)}advanceCrowd(e){this.rallyZ=this.runners.find(n=>n.alive&&n.role==="standard"&&n.z>-10)?.z??-100;let t=this.allies.filter(n=>n.z<=this.captainZ+.18);for(let n of this.columns){n.minX=1/0,n.maxX=-1/0;let i=0,r=!1;for(let a of n.units)a.alive&&(this.moveGrunt(a,e,t),!(!a.alive||a.z>10&&this.phase!=="clear")&&(n.minX=Math.min(n.minX,a.x),n.maxX=Math.max(n.maxX,a.x),i&&n.units[i-1].z<a.z&&(r=!0),n.units[i++]=a));n.units.length=i,r&&n.units.sort((a,o)=>o.z-a.z)}for(let n of this.runners)n.alive&&this.moveGrunt(n,e,t);for(this.runners=this.runners.filter(n=>n.alive&&(n.z<10||this.phase==="clear")),this.toNextRow-=this.worldAdvance+this.marchSpeed*e;this.row<this.lastRow&&this.toNextRow<=0;)this.spawnRow(),this.toNextRow+=xg+(this.row%Wo===0?.38:0),this.row>=70&&Math.abs(this.row-this.finaleRow)>10&&(this.row-70)%this.route.restEvery===0&&(this.toNextRow+=this.route.restLength)}contact(e){if(!this.playing||this.caught)return;let t=this.allies.findIndex(r=>Math.abs(r.x-e.x)<.32&&Math.abs(r.z-e.z)<.32),n=Math.abs(e.x-this.x)<.39*this.scale&&Math.abs(e.z-this.captainZ)<.4;if(t<0&&!n)return!1;let i=e.startZ!=null;if(i||e.role==="bomber"?e.alive=!1:(e.spent=!0,e.overX=t>=0?this.allies[t].x:this.x),this.hitGuard>0)return!0;if(this.hitGuard=this.buffs.shield>0?.46:1.26-Math.min(.21,this.stage*.007),this.buffs.shield>0)return this.event("shieldHit",e.x,.35,e.z),!0;if(this.hurt=1,e.role==="bomber")return this.event("impact",e.x,.1,e.z,.87),this.allies=this.allies.filter(r=>Math.hypot(r.x-e.x,r.z-e.z)>.95?!0:(this.fall(r,"blue",1.2,e.x),!1)),n&&!this.allies.length&&--this.armor<=0&&(this.lossReason="infantry",this.finish(!1,e)),!0;if(t<0&&this.allies.length){let r=1/0;this.allies.forEach((a,o)=>{let c=(a.x-e.x)**2+(a.z-e.z)**2;c<r&&(r=c,t=o)})}if(t>=0){let r=this.allies.splice(t,1)[0],a=this.fall(r,"blue",0);a.prone=!0,a.dir=r.x>=e.x?1:-1,i||(e.overX=r.x,e.overBody=a)}else--this.armor<=0&&(this.lossReason=i&&e.shooter===this.boss?"bossShot":"infantry",this.finish(!1,i?e.shooter:e));return!0}enemyRound(e,t,n,i=0,r=this.boss){let o=this.x+i-e,c=Math.max(1,this.captainZ-t),l=Math.hypot(o,c);this.incoming.push({x:e,z:t,y:n,startY:n,startZ:t,shooter:r,vx:o*7.4/l,vz:c*7.4/l,alive:!0}),this.enemyFireTimer=1.35,this.event("hostileMuzzle",e,n,t)}advanceIncoming(e){this.enemyFireTimer=Math.max(0,this.enemyFireTimer-e);for(let t of this.incoming)t.x+=t.vx*e,t.z+=t.vz*e,t.y=.45+(t.startY-.45)*Pn(t.z/t.startZ,0,1),t.z>this.captainZ-2&&t.z<this.captainZ+2.3&&this.contact(t)&&this.event("hostileMuzzle",t.x,t.y,t.z);this.incoming=this.incoming.filter(t=>t.alive&&t.z<6)}pushWall(e,t=this.wall,n=2.14){let i=(r,a,o)=>t.hp>0&&Math.abs(r-t.x)<n+o&&Math.abs(a-t.z)<.32+o;this.allies=this.allies.filter(r=>{if(!i(r.x,r.z,.19))return!0;this.fall(r,"blue",0);let a=this.falling[this.falling.length-1];return a.pushed=!0,a.front=t.z+.55,!1}),!this.caught&&i(this.x,this.captainZ,.32*this.visualScale)&&(this.caught=!0,this.caughtBy=t),this.caught&&this.caughtBy===t&&(this.captainZ=Math.max(this.captainZ,t.z+.38),this.captainZ>=4.5&&(this.lossReason="wall",this.finish(!1)))}fall(e,t,n,i=e.x){if(this.falling.length>=96){let a=this.falling.findIndex(o=>o.side==="red");this.falling.splice(a<0?0:a,1)}let r={x:e.x,z:e.z,y:.07,t:0,side:t,phase:e.phase||0,size:e.size||1,id:e.id||0,vx:(e.x-i)*1.05+(this.rand()-.5)*2.8*n,vz:(this.rand()-.5)*2.4*n,vy:(1.65+this.rand()*2.3)*n,spin:(this.rand()-.5)*8,roll:(this.rand()-.5)*7};return this.falling.push(r),r}kill(e,t=1,n=e.x){if(!(!e.alive||e.overBody&&e.z<e.overBody.z+.84)&&(e.alive=!1,this.score++,this.buffs.fever<=0&&(this.feverMeter+=.21,this.feverMeter>=100&&(this.feverMeter=0,this.buffs.fever=4.2,this.event("merge",this.x,.2,this.captainZ))),this.fall(e,"red",t,n),e.role==="courier"&&this.playing)){let i={x:e.x,z:e.z,type:"medic",active:!0};this.openCard(i)}}closeEnemy(e,t){let i=null,r=(a,o)=>{let c=t-a.z;c<0||c>2.35+o||Math.hypot(a.x-e,c)>2.35+o||(!i||a.z>i.z||a.z===i.z&&Math.abs(a.x-e)<Math.abs(i.x-e))&&(i=a)};this.boss.active&&!this.boss.defeated&&r(this.boss,.78);for(let a of this.columns)if(!(a.maxX<e-2.35-.25||a.minX>e+2.35+.25))for(let o of a.units){if(o.z<t-2.35-.25)break;o.alive&&r(o,.2)}for(let a of this.runners)a.alive&&r(a,.2);return i}launch(e,t,n,i,r,a,o=0){let c=1/Math.hypot(1,o),l={kind:i===pa?"rocket":"shot",profile:i,power:r,damage:a,headingX:o*c,headingZ:-c,startX:e,startY:t,startZ:n,x:e,y:t,z:n,distance:0,range:this.buffs.range>0||this.buffs.longshot>0?yd:vd,age:0,afterHit:0,finished:!1,pierce:i===Ps?3:this.buffs.longshot>0&&i!==pa?1:0},h=this.firstHit(l,l.range);if(o===0&&(!h||h.distance>2.35)){let u=this.closeEnemy(e,n);if(u){let d=u.x-e,p=Math.min(-.06,u.z-n),x=Math.hypot(d,p);l.headingX=d/x,l.headingZ=p/x,l.range=Math.min(l.range,x+.75),h=this.firstHit(l,l.range)}}l.aimDistance=Math.max(.12,h?h.distance:l.range),l.endY=h?.target===this.boss?Tn[this.boss.kind].aim:h?.target===this.wall||h?.target.type||h?.target.mechanism?.72:.48;let f=(this.boss.z-n)/l.headingZ;i===pa&&this.boss.active&&!this.boss.defeated&&f>0&&f<l.range&&Math.abs(e+l.headingX*f-this.boss.x)<=1.26&&h?.target!==this.wall&&!h?.target.type&&!h?.target.mechanism&&(l.aimDistance=Math.max(.12,f),l.endY=Tn[this.boss.kind].aim),l.lift=i.lift*Math.min(1,l.aimDistance/9),this.shots.push(l)}shoot(e){let t=this.buffs.fever>0,n=(t?.62:this.buffs.rapid>0?.72:1)*(this.chill>0?1.32:1);if(this.rocketTimer-=e,this.rocketTimer<=0){this.rocketTimer+=.69*n,this.recoil=1;let i=this.x+.295*this.visualScale,r=1.31*this.visualScale,a=this.captainZ-.6*this.visualScale,o=1+Math.min(1.7,this.upgrades*.28);this.launch(i,r,a,pa,o,this.cannonDamage),this.event("muzzle",i,r,a,o)}if(this.volleyTimer-=e,this.volleyTimer<=0){this.volleyTimer+=.27*n,this.volley++;for(let i of this.allies){if(i.age<.12)continue;let r=i.x+.13,a=i.z-.22,o=(t||this.buffs.plasma>0)&&(i.slot+this.volley)%3===0,c=o?Ps:i.slot%4===1?Bo:hh;this.launch(r,.58,a,c,1,o?6:2.8),(t||this.buffs.spread>0)&&i.slot%2===0&&this.launch(r,.58,a,hh,1,2.8,(this.volley%2?1:-1)*.09)}this.allies.length&&this.event("smallShot",this.x,.6,0,.7)}if(this.supportTimer-=e,this.buffs.drone>0&&this.supportTimer<=0){this.supportTimer=.36;for(let i of[-1,1])this.launch(this.x+i*1.15,1.3,this.captainZ-.32,Ps,1,6)}}firstHit(e,t){let n=e.headingX,i=e.headingZ,r=e.x+n*t,a=e.z+i*t,o=e.kind==="rocket"?.15:.07,c=null,l=(h,f,u)=>{if(h.overBody&&h.z<h.overBody.z+.84)return;let d=f+o,p=u+o,x=Math.max(0,(h.z+p-e.z)/i),g=Math.min(t,(h.z-p-e.z)/i);if(Math.abs(n)<1e-6){if(Math.abs(e.x-h.x)>d)return}else{let m=(h.x-d-e.x)/n,_=(h.x+d-e.x)/n;x=Math.max(x,Math.min(m,_)),g=Math.min(g,Math.max(m,_))}if(!(x>g||c&&x>=c.distance)){if(e.aimDistance!==void 0&&h!==this.wall&&!h.type&&!h.mechanism){let m=h.lift||0,_=m+(h===this.boss?Tn[h.kind].height:.92*(h.size||1))+o,y=zo(e,e.distance+x),M=zo(e,e.distance+g);if(Math.min(y,M)>_||Math.max(y,M)<m-o)return;y>_&&y>M&&(x+=(g-x)*(y-_)/(y-M))}c={target:h,distance:x}}};this.wall.hp>0&&l(this.wall,2.1,.32);for(let h of this.features)h.target&&h.state==="ready"&&h.target.z>=a-.7&&h.target.z<=e.z+.7&&l(h.target,h.half,h.depth);for(let h of this.gates)h.active&&!(h.cover?.hp>0)&&h.z>=a-.36&&h.z<=e.z+.36&&l(h,Li/2,.15);this.boss.active&&!this.boss.defeated&&l(this.boss,1.26,.7);for(let h of this.columns)if(!(h.maxX<Math.min(e.x,r)-.42||h.minX>Math.max(e.x,r)+.42))for(let f of h.units){if(f.z<a-.42)break;f.alive&&f.z<e.z+.42&&l(f,.245,.23)}for(let h of this.runners)h.alive&&l(h,.25*h.size,.23*h.size);return c}blast(e,t){let n=.95+e.power*.48;for(let i of this.columns)if(!(i.maxX<e.x-n||i.minX>e.x+n))for(let r of i.units){if(r.z<t-n)break;r.alive&&(r.x-e.x)**2+(r.z-t)**2<n*n&&this.kill(r,1.18,e.x)}for(let i of this.runners)i.alive&&(i.x-e.x)**2+(i.z-t)**2<n*n&&this.kill(i,1.18,e.x);this.event("impact",e.x,.06,t,e.power)}damageBoss(e,t){let n=this.boss;n.defeated||(n.hp=Math.max(0,n.hp-t*(n.brace>.6?.55:1)),n.hit=e.kind==="rocket"?.77:Math.max(n.hit,.1),n.hp<=0&&(n.defeated=!0,n.skill=null,n.defeatAge=0,this.phase="clear",this.lastRow=this.row,this.event("finisher",n.x,2.3,n.z,1.5)))}resolveHit(e,t){if(t.mechanism){Ad(this,t.mechanism,e);return}if(t===this.wall)t.hp=Math.max(0,t.hp-e.damage*.72),t.flash=1,this.event(t.hp<=0?"wallBreak":"wallHit",e.x,.85,e.z,e.kind==="rocket"?1.15:.45);else if(t.type&&Yn[t.type])t.hp=Math.max(0,t.hp-e.damage),t.flash=1,t.hp<=0?this.openCard(t):this.event("cardHit",e.x,.6,e.z,.7);else if(t===this.boss)this.event(e.kind==="rocket"?"impact":"hit",e.x,e.y,e.z,e.kind==="rocket"?e.power*.7:.7),this.damageBoss(e,e.damage);else if(e.kind==="rocket"){this.blast(e,t.z);let n=this.boss;n.active&&n.lift<.85&&Math.hypot(e.x-n.x,t.z-n.z)<1.65+e.power*.48&&this.damageBoss(e,e.damage*.65)}else t.hp!=null&&(t.hp-=e.damage*(t.role==="guard"&&e.profile!==Ps?.65:1)),(t.hp==null||t.hp<=0)&&this.kill(t,.72),this.event("hit",e.x,.45,e.z,.65)}advanceShots(e){let t=[];for(let n of this.shots){if(n.age+=e,n.finished){n.afterHit+=e,n.afterHit*n.profile.speed<n.profile.tail&&t.push(n);continue}let i=Math.min(e*n.profile.speed,n.range-n.distance);for(;i>0&&!n.finished&&this.playing;){let r=this.firstHit(n,i),a=r?r.distance:i;n.distance+=a,!r&&n.range-n.distance<1e-8&&(n.distance=n.range),i-=a,hr(n,n.distance,n),r&&this.resolveHit(n,r.target);let o=r&&n.pierce>0&&r.target.alive===!1;o&&n.pierce--,n.finished=!!r&&!o||n.distance>=n.range-1e-8}if(!this.playing)break;t.push(n)}this.shots=this.playing?t:[]}updateFalling(e){for(let t of this.falling){if(t.prone){t.t+=e,t.z+=this.worldAdvance;continue}if(t.intoGap){t.t+=e,t.vy-=e*8,t.y+=t.vy*e,t.z+=this.worldAdvance;continue}if(t.pushed){t.z=Math.max(t.z,t.front),t.z+=this.worldAdvance,t.y=0,t.z>7&&(t.t=2);continue}t.t+=e,t.x+=t.vx*e,t.z+=t.vz*e+this.worldAdvance*.38,t.y+=t.vy*e,t.vy-=(t.gravity??8.6)*e,t.y<.05&&(t.y=.05,t.vx*=.9,t.vz*=.9)}this.falling=this.falling.filter(t=>t.t<(t.prone?this.overrun?4.9:2.1:1.02))}slamSquad(){let e=this.boss;if(this.event("slam",e.landX,.08,e.landZ,1.08),this.allies=this.allies.filter(t=>{let n=t.x-e.landX,i=t.z-e.landZ,r=Math.hypot(n,i);if(r>2.15+.19)return!0;let a=this.fall(t,"blue",0),o=r>.01?Math.atan2(i,n):t.phase,c=3+2.1*(1-Math.min(1,r/2.15));return a.vx=Math.cos(o)*c,a.vz=Math.sin(o)*c,a.vy=4+c*.38,a.gravity=13.5,a.spin=-Math.sin(o)*5,a.roll=Math.cos(o)*5,!1}),!(Math.hypot(this.x-e.landX,this.captainZ-e.landZ)>2.15+.26)){if(this.buffs.shield>0){this.buffs.shield=0,this.event("shieldHit",this.x,.7,this.captainZ);return}this.hurt=1,this.hitGuard=1.15,this.armor--,this.armor<=0&&(this.lossReason="slam",this.finish(!1))}}advanceBoss(e){let t=this.boss;if(t.defeated){let f=t.defeatAge;t.defeatAge+=e,f<.92&&t.defeatAge>=.92&&this.landBoss(),t.removed||(t.z+=this.worldAdvance),f<1.62&&t.defeatAge>=1.62&&(t.removed=!0,this.event("bossBurst",t.x,.62,t.z-1.15,1.4)),t.removed&&t.defeatAge>2.05&&!this.flanks.length&&!this.deliveries.length&&this.row>=this.lastRow&&!this.runners.length&&this.columns.every(u=>u.units.length===0)&&this.finish(!0);return}if(!t.active){this.row>=this.finaleRow&&(t.z=this.entryZ-1.5,t.active=!0,this.phase="boss",this.route.vault?Rd(this):t.x=t.escortX=_a(this,t.z-1.3,t.z+6).x);return}if(bd(this,e),!this.playing)return;if(t.vault){Ld(this,e);return}if(t.recovery=Math.max(0,t.recovery-e),t.attackT>0){t.attackT+=e;let f=ko(t.attackT),u=Et(f,0,1);t.x=t.leapFromX+(t.landX-t.leapFromX)*u,t.z=t.leapFromZ+(t.landZ-.68-t.leapFromZ)*u,t.lift=2.15*4*f*(1-f),t.attackT>=.91&&!t.impactDone&&(t.impactDone=!0,this.slamSquad()),t.attackT>=1.48&&(t.attackT=0,t.recovery=1.14);return}for(let f of this.activeGround){if(f.crossed||!Ls(f)||Math.abs(t.x-f.x)>1.9)continue;let u=f.z-f.length/2-t.z;if(u<=1.05&&u>=-.5){Pd(this,f);return}}t.moveClock+=e;let n=t.moveClock%5.2;t.brace=t.kind==="warden"?Et(n,.92,1.32)*(1-Et(n,2.45,2.95)):0,t.special=t.kind==="drill"?Et(n,1.1,1.55)*(1-Et(n,2.35,2.85)):0;let i=t.skill?.kind==="warden"&&t.skill.fired&&!t.skill.marks[0].hit?2.2:0;!t.pursuing&&t.z>=this.captainZ-9.7&&(t.pursuing=!0);let r=t.pursuing?gh(this):null,a=t.pursuing?2.75:this.bossStride,o=e*a*(1-.38*t.brace+.78*t.special+i);if(wd(this,e,r,o),t.kind==="kestrel"&&t.z>-11&&t.z<-7&&!t.glided&&!t.skill){t.glided=!0,t.vault={piece:{z:t.z+2},from:-2,to:2.1,t:0,airDash:!0};return}if(!t.pursuing||t.recovery>0||t.skill)return;let c=gh(this);if(c.distance>3.38)return;let l=Pn(c.x,-5.32,5.32),h=c.z;Td(this,l,h-.68)&&(t.leapFromX=t.x,t.leapFromZ=t.z,t.landX=l,t.landZ=h,t.attackT=.001,t.impactDone=!1)}landBoss(){this.event("victory",this.boss.x,.1,this.boss.z-1.35,1.05)}finish(e,t=null){if(this.playing){if(this.phase=e?"won":"lost",this.endTime=0,this.shots=[],this.incoming=[],e){let n=[...this.allies].sort((i,r)=>i.z-r.z);for(let i=0;i<n.length;i+=5){let r=n.slice(i,i+5).sort((a,o)=>a.x-o.x);r.forEach((a,o)=>{a.exitX=(o-(r.length-1)/2)*.58,a.exitZ=.98+Math.floor(i/5)*.64})}this.parade={complete:!1,originX:this.x},this.recoil=0,this.event("rally",this.x,.14,this.captainZ);return}if(this.event("loss",this.x,0,this.captainZ),this.lossReason==="infantry"){let n=t?.alive&&t.id?t:null;if(!n){let i=r=>{!r.alive||r.z>this.captainZ+.36||(!n||Math.hypot(r.x-this.x,r.z-this.captainZ)<Math.hypot(n.x-this.x,n.z-this.captainZ))&&(n=r)};for(let r of this.columns)for(let a of r.units)i(a);this.runners.forEach(i)}n||(n=this.grunt(this.x,this.entryZ-1),this.runners.push(n)),this.overrun={x:this.x,z:this.captainZ,crossed:!1,attacker:n.id,approach:Math.max(2.35,(this.captainZ-n.z+1.6)/4)};for(let i of this.allies){let r=this.fall(i,"blue",0);r.prone=!0,r.dir=i.x>=this.x?1:-1}this.allies=[]}else this.event("impact",this.x,0,this.captainZ,1.25)}}advanceOverrun(e){let t=this.overrun;this.worldAdvance=.36*e,this.distance+=this.worldAdvance,this.captainZ+=this.worldAdvance,t.z=this.captainZ,this.wall.z+=this.worldAdvance;for(let i of this.gates)i.z+=this.worldAdvance;for(let i of this.features)i.z+=this.worldAdvance;let n=i=>{if(!i.alive||i.z>10)return;let r=i.id===t.attacker,a=(r?Math.max((i.speed||_h)*1.68,t.approach):(i.speed||_h)*1.68)*e,o=0;if((r||i.z>t.z-7)&&i.z<t.z+.46){let l=i.id===t.attacker?0:(i.id%7-3)*.15,h=r?11:4.9;o=Pn(t.x+l-i.x,-h*e,h*e),i.x+=o}r&&Math.abs(i.x-t.x)>.43&&i.z<t.z+.48&&(a=Math.min(a,Math.max(0,t.z+.15-i.z)));let c=i.z;i.z+=a+this.worldAdvance,i.marched+=Math.hypot(o,a),i.yaw+=(Math.atan2(o,a)-i.yaw)*(1-Math.exp(-8*e)),c<t.z+1.05&&i.z>=t.z+1.05&&Math.abs(i.x-t.x)<1.15&&(t.crossed=!0)};for(let i of this.columns)for(let r of i.units)n(r);this.runners.forEach(n)}advanceParade(e){let t=this.parade;if(t.complete)return;let n=this.endTime,r=(7.4+Math.min(18,n*8.6))*Et(n,.12,.58)*e;this.x=t.originX*(1-Et(n,.16,1.65)),this.velocity=0,this.captainZ-=r;let a=this.captainZ;for(let o of this.allies)o.age+=e,o.x+=(this.x+o.exitX-o.x)*(1-Math.exp(-4.8*e)),o.z-=r,o.z+=(this.captainZ+o.exitZ-o.z)*(1-Math.exp(-4.2*e)),a=Math.max(a,o.z);t.complete=a<this.entryZ-2.8}get resultReady(){return this.parade?this.parade.complete:this.boss.defeated&&this.boss.defeatAge<2.05?!1:this.overrun?this.overrun.crossed&&this.endTime>=2.5:this.endTime>.86}tick(e,t=0,n=0){if(this.worldAdvance=0,!this.playing){(this.phase==="won"||this.phase==="lost")&&(this.endTime+=e,this.parade&&this.advanceParade(e),this.overrun&&this.advanceOverrun(e),this.phase==="lost"&&this.boss.defeated&&this.boss.defeatAge<2.05&&this.advanceBoss(e),this.boss.hit=Math.max(0,this.boss.hit-4*e),this.updateFalling(e));return}this.elapsed+=e,this.chill=Math.max(0,this.chill-e);for(let a of Object.keys(this.buffs))this.buffs[a]=Math.max(0,this.buffs[a]-e);for(let a of this.gates)a.flash=Math.max(0,a.flash-e*7);this.hitGuard=Math.max(0,this.hitGuard-e),this.hurt=Math.max(0,this.hurt-4*e),this.mergeGlow=Math.max(0,this.mergeGlow-2.25*e),this.recoil=Math.max(0,this.recoil-5.1*e),this.wall.flash=Math.max(0,this.wall.flash-4.6*e),this.boss.hit=Math.max(0,this.boss.hit-5.4*e),this.visualScale+=(this.scale-this.visualScale)*(1-Math.exp(-8*e)),this.caught&&this.caughtBy?.hp<=0&&(this.caught=!1,this.caughtBy=null),(t||n)&&this.aim(this.targetX+t*10.2*e,this.targetZ+n*3.1*e),this.caught||(this.captainZ+=(this.targetZ-this.captainZ)*(1-Math.exp(-16*e)));let i=this.x;if(this.rope){let a=this.rope;a.age+=e,this.x=a.from+(a.to-a.from)*Et(a.age,0,.58),a.age>=.58&&(this.rope=null,this.aim(a.to))}else this.caught||(this.x+=(this.targetX-this.x)*(1-Math.exp(-21*e)));this.velocity=(this.x-i)/Math.max(e,.001);let r=this.boss.active?2.3:3.65;if(this.worldAdvance=r*e,this.distance+=this.worldAdvance,this.wall.z=this.distance-Nd,Cd(this,e),!!this.playing){this.crossGates(),this.updateDeliveries(e);for(let a of this.allies){a.age+=e;let[o,c]=vh(a.slot,this.scale),l=Pn(this.x+o,-6.28,6.28);a.x+=(l-a.x)*(1-Math.exp(-19*e)),a.z+=(this.captainZ+c-a.z)*(1-Math.exp(-14*e))}this.pushWall(e);for(let a of this.features)(a.kind==="cache"||a.kind==="cover"&&a.variant!=="glass")&&a.state==="ready"&&a.z>-4&&a.z<11&&this.pushWall(e,a,a.half);this.playing&&(this.advanceCrowd(e),this.advanceIncoming(e),this.updateFalling(e),this.playing&&(this.advanceBoss(e),this.playing&&(this.caught||this.shoot(e),this.advanceShots(e))))}}};var Rp=0,lu=1,Cp=2;var mo=1,Ip=2,Yr=3,$n=0,In=1,Gt=2,$s=0,Zr=1,cu=2,hu=3,uu=4,Pp=5;var js=100,Lp=101,Np=102,Dp=103,Up=104,Fp=200,Op=201,Bp=202,zp=203,fu=204,du=205,kp=206,Hp=207,Gp=208,Vp=209,Wp=210,Xp=211,qp=212,Yp=213,Zp=214,Sl=0,El=1,wl=2,Ar=3,Tl=4,Al=5,Rl=6,Cl=7,go=0,Kp=1,Jp=2,Si=0,pu=1,mu=2,gu=3,xu=4,_u=5,vu=6,yu=7,Yh="attached",$p="detached",Mu=300,Qs=301,Kr=302,Ql=303,ec=304,vi=1e3,Kn=1001,Rr=1002,Yt=1003,tc=1004;var er=1005;var Zt=1006,Jr=1007;var Un=1008;var Fn=1009,bu=1010,Su=1011,$r=1012,nc=1013,ui=1014,Xn=1015,fi=1016,ic=1017,sc=1018,tr=1020,Eu=35902,wu=35899,Tu=1021,Au=1022,jn=1023,ki=1026,Ji=1027,rc=1028,ac=1029,_s=1030,oc=1031;var lc=1033,xo=33776,_o=33777,vo=33778,yo=33779,cc=35840,hc=35841,uc=35842,fc=35843,dc=36196,pc=37492,mc=37496,gc=37488,xc=37489,Mo=37490,_c=37491,vc=37808,yc=37809,Mc=37810,bc=37811,Sc=37812,Ec=37813,wc=37814,Tc=37815,Ac=37816,Rc=37817,Cc=37818,Ic=37819,Pc=37820,Lc=37821,Nc=36492,Dc=36494,Uc=36495,Fc=36283,Oc=36284,bo=36285,Bc=36286;var zs=2300,ks=2301,Ml=2302,Zh=2303,Kh=2400,Jh=2401,$h=2402,jp=2500;var Ru=0,So=1,jr=2,Qp=3200;var Qr=0,e0=1,$i="",gt="srgb",Rn="srgb-linear",Na="linear",Tt="srgb";var bl=7680;var t0=519,n0=512,i0=513,s0=514,Cu=515,r0=516,a0=517,Iu=518,Pu=519,Lu=35044,Mn=35048;var Nu="300 es",Jn=2e3,Cr=2001;function _g(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function vg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ir(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function o0(){let s=Ir("canvas");return s.style.display="block",s}var Fd={},Pr=null;function Da(...s){let e="THREE."+s.shift();Pr?Pr("log",e,...s):console.log(e,...s)}function l0(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function ze(...s){s=l0(s);let e="THREE."+s.shift();if(Pr)Pr("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Je(...s){s=l0(s);let e="THREE."+s.shift();if(Pr)Pr("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Bs(...s){let e=s.join(" ");e in Fd||(Fd[e]=!0,ze(...s))}function c0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var h0={[Sl]:Sl,[wl]:Rl,[Tl]:Tl,[Ar]:Al,[El]:El,[Rl]:wl,[Cl]:Cl,[Al]:Ar},yi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},_n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Od=1234567,Ca=Math.PI/180,Hs=180/Math.PI;function di(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_n[s&255]+_n[s>>8&255]+_n[s>>16&255]+_n[s>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[n&255]+_n[n>>8&255]+_n[n>>16&255]+_n[n>>24&255]).toLowerCase()}function at(s,e,t){return Math.max(e,Math.min(t,s))}function Du(s,e){return(s%e+e)%e}function yg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Mg(s,e,t){return s!==e?(t-s)/(e-s):0}function Ia(s,e,t){return(1-t)*s+t*e}function bg(s,e,t,n){return Ia(s,e,1-Math.exp(-t*n))}function Sg(s,e=1){return e-Math.abs(Du(s,e*2)-e)}function Eg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function wg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Tg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ag(s,e){return s+Math.random()*(e-s)}function Rg(s){return s*(.5-Math.random())}function Cg(s){s!==void 0&&(Od=s);let e=Od+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ig(s){return s*Ca}function Pg(s){return s*Hs}function Lg(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Ng(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Uu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Dg(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),d=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*f,c*u,o*l);break;case"YZY":s.set(c*u,o*h,c*f,o*l);break;case"ZXZ":s.set(c*f,c*u,o*h,o*l);break;case"XZX":s.set(o*h,c*p,c*d,o*l);break;case"YXY":s.set(c*d,o*h,c*p,o*l);break;case"ZYZ":s.set(c*p,c*d,o*h,o*l);break;default:ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function zc(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Fu(s,e){if(e.constructor===Float32Array)return s;let t=zc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function Ou(s,e){if(e.constructor===Float32Array)return s;let t=zc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}var Xe={DEG2RAD:Ca,RAD2DEG:Hs,generateUUID:di,clamp:at,euclideanModulo:Du,mapLinear:yg,inverseLerp:Mg,lerp:Ia,damp:bg,pingpong:Sg,smoothstep:Eg,smootherstep:wg,randInt:Tg,randFloat:Ag,randFloatSpread:Rg,seededRandom:Cg,degToRad:Ig,radToDeg:Pg,isPowerOfTwo:Lg,ceilPowerOfTwo:Ng,floorPowerOfTwo:Uu,setQuaternionFromProperEuler:Dg,normalize:Ou,denormalize:Fu},Vu=class Vu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Vu.prototype.isVector2=!0;var ce=Vu,an=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],d=r[a+1],p=r[a+2],x=r[a+3];if(f!==x||c!==u||l!==d||h!==p){let g=c*u+l*d+h*p+f*x;g<0&&(u=-u,d=-d,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){let _=Math.acos(g),y=Math.sin(_);m=Math.sin(m*_)/y,o=Math.sin(o*_)/y,c=c*m+u*o,l=l*m+d*o,h=h*m+p*o,f=f*m+x*o}else{c=c*m+u*o,l=l*m+d*o,h=h*m+p*o,f=f*m+x*o;let _=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=_,l*=_,h*=_,f*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return e[t]=o*p+h*f+c*d-l*u,e[t+1]=c*p+h*u+l*f-o*d,e[t+2]=l*p+h*d+o*u-c*f,e[t+3]=h*p-o*f-c*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),f=o(r/2),u=c(n/2),d=c(i/2),p=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"YZX":this._x=u*h*f+l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f-u*d*p;break;case"XZY":this._x=u*h*f-l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f+u*d*p;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-i)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+l)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(at(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Wu=class Wu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=i+c*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return yh.copy(this).projectOnVector(e),this.sub(yh)}reflect(e){return this.sub(yh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Wu.prototype.isVector3=!0;var P=Wu,yh=new P,Bd=new an,Xu=class Xu{constructor(e,t,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],x=i[0],g=i[3],m=i[6],_=i[1],y=i[4],M=i[7],w=i[2],b=i[5],v=i[8];return r[0]=a*x+o*_+c*w,r[3]=a*g+o*y+c*b,r[6]=a*m+o*M+c*v,r[1]=l*x+h*_+f*w,r[4]=l*g+h*y+f*b,r[7]=l*m+h*M+f*v,r[2]=u*x+d*_+p*w,r[5]=u*g+d*y+p*b,r[8]=u*m+d*M+p*v,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*r,d=l*r-a*c,p=t*f+n*u+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=f*x,e[1]=(i*l-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=u*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-o*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Bs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Mh.makeScale(e,t)),this}rotate(e){return Bs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Mh.makeRotation(-e)),this}translate(e,t){return Bs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Mh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Xu.prototype.isMatrix3=!0;var $e=Xu,Mh=new $e,zd=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kd=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ug(){let s={enabled:!0,workingColorSpace:Rn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Tt&&(i.r=zi(i.r),i.g=zi(i.g),i.b=zi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Tt&&(i.r=Tr(i.r),i.g=Tr(i.g),i.b=Tr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===$i?Na:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Rn]:{primaries:e,whitePoint:n,transfer:Na,toXYZ:zd,fromXYZ:kd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gt},outputColorSpaceConfig:{drawingBufferColorSpace:gt}},[gt]:{primaries:e,whitePoint:n,transfer:Tt,toXYZ:zd,fromXYZ:kd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gt}}}),s}var lt=Ug();function zi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Tr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var fr,Il=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fr===void 0&&(fr=Ir("canvas")),fr.width=e.width,fr.height=e.height;let i=fr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=fr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ir("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=zi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(zi(t[n]/255)*255):t[n]=zi(t[n]);return{data:t,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fg=0,Lr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(bh(i[a].image)):r.push(bh(i[a]))}else r=bh(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function bh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Il.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}var Og=0,Sh=new P,on=class s extends yi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Kn,i=Kn,r=Zt,a=Un,o=jn,c=Fn,l=s.DEFAULT_ANISOTROPY,h=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=di(),this.name="",this.source=new Lr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Sh).x}get height(){return this.source.getSize(Sh).y}get depth(){return this.source.getSize(Sh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ze(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vi:e.x=e.x-Math.floor(e.x);break;case Kn:e.x=e.x<0?0:1;break;case Rr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vi:e.y=e.y-Math.floor(e.y);break;case Kn:e.y=e.y<0?0:1;break;case Rr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Mu;on.DEFAULT_ANISOTROPY=1;var qu=class qu{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,M=(d+1)/2,w=(m+1)/2,b=(h+u)/4,v=(f+x)/4,S=(p+g)/4;return y>M&&y>w?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=b/n,r=v/n):M>w?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=b/i,r=S/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=v/r,i=S/r),this.set(n,i,r,t),this}let _=Math.sqrt((g-p)*(g-p)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(f-x)/_,this.z=(u-h)/_,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this.w=at(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this.w=at(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};qu.prototype.isVector4=!0;var xt=qu,Pl=class extends yi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new on({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Lr(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},kn=class extends Pl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ua=class extends on{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ll=class extends on{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var jl=class jl{constructor(e,t,n,i,r,a,o,c,l,h,f,u,d,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,f,u,d,p,x,g)}set(e,t,n,i,r,a,o,c,l,h,f,u,d,p,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/dr.setFromMatrixColumn(e,0).length(),r=1/dr.setFromMatrixColumn(e,1).length(),a=1/dr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*h,d=a*f,p=o*h,x=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=d+p*l,t[5]=u-x*l,t[9]=-o*c,t[2]=x-u*l,t[6]=p+d*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,d=c*f,p=l*h,x=l*f;t[0]=u+x*o,t[4]=p*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-p,t[6]=x+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,d=c*f,p=l*h,x=l*f;t[0]=u-x*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,d=a*f,p=o*h,x=o*f;t[0]=c*h,t[4]=p*l-d,t[8]=u*l+x,t[1]=c*f,t[5]=x*l+u,t[9]=d*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,d=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=x-u*f,t[8]=p*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*f+p,t[10]=u-x*f}else if(e.order==="XZY"){let u=a*c,d=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+x,t[5]=a*h,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*h,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bg,e,zg)}lookAt(e,t,n){let i=this.elements;return Bn.subVectors(e,t),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),as.crossVectors(n,Bn),as.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),as.crossVectors(n,Bn)),as.normalize(),Zo.crossVectors(Bn,as),i[0]=as.x,i[4]=Zo.x,i[8]=Bn.x,i[1]=as.y,i[5]=Zo.y,i[9]=Bn.y,i[2]=as.z,i[6]=Zo.z,i[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],x=n[6],g=n[10],m=n[14],_=n[3],y=n[7],M=n[11],w=n[15],b=i[0],v=i[4],S=i[8],I=i[12],C=i[1],N=i[5],z=i[9],X=i[13],D=i[2],q=i[6],G=i[10],L=i[14],K=i[3],A=i[7],V=i[11],H=i[15];return r[0]=a*b+o*C+c*D+l*K,r[4]=a*v+o*N+c*q+l*A,r[8]=a*S+o*z+c*G+l*V,r[12]=a*I+o*X+c*L+l*H,r[1]=h*b+f*C+u*D+d*K,r[5]=h*v+f*N+u*q+d*A,r[9]=h*S+f*z+u*G+d*V,r[13]=h*I+f*X+u*L+d*H,r[2]=p*b+x*C+g*D+m*K,r[6]=p*v+x*N+g*q+m*A,r[10]=p*S+x*z+g*G+m*V,r[14]=p*I+x*X+g*L+m*H,r[3]=_*b+y*C+M*D+w*K,r[7]=_*v+y*N+M*q+w*A,r[11]=_*S+y*z+M*G+w*V,r[15]=_*I+y*X+M*L+w*H,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],p=e[3],x=e[7],g=e[11],m=e[15],_=c*d-l*u,y=o*d-l*f,M=o*u-c*f,w=a*d-l*h,b=a*u-c*h,v=a*f-o*h;return t*(x*_-g*y+m*M)-n*(p*_-g*w+m*b)+i*(p*y-x*w+m*v)-r*(p*M-x*b+g*v)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+i*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],p=e[12],x=e[13],g=e[14],m=e[15],_=t*o-n*a,y=t*c-i*a,M=t*l-r*a,w=n*c-i*o,b=n*l-r*o,v=i*l-r*c,S=h*x-f*p,I=h*g-u*p,C=h*m-d*p,N=f*g-u*x,z=f*m-d*x,X=u*m-d*g,D=_*X-y*z+M*N+w*C-b*I+v*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let q=1/D;return e[0]=(o*X-c*z+l*N)*q,e[1]=(i*z-n*X-r*N)*q,e[2]=(x*v-g*b+m*w)*q,e[3]=(u*b-f*v-d*w)*q,e[4]=(c*C-a*X-l*I)*q,e[5]=(t*X-i*C+r*I)*q,e[6]=(g*M-p*v-m*y)*q,e[7]=(h*v-u*M+d*y)*q,e[8]=(a*z-o*C+l*S)*q,e[9]=(n*C-t*z-r*S)*q,e[10]=(p*b-x*M+m*_)*q,e[11]=(f*M-h*b-d*_)*q,e[12]=(o*I-a*N-c*S)*q,e[13]=(t*N-n*I+i*S)*q,e[14]=(x*y-p*w-g*_)*q,e[15]=(h*w-f*y+u*_)*q,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,f=o+o,u=r*l,d=r*h,p=r*f,x=a*h,g=a*f,m=o*f,_=c*l,y=c*h,M=c*f,w=n.x,b=n.y,v=n.z;return i[0]=(1-(x+m))*w,i[1]=(d+M)*w,i[2]=(p-y)*w,i[3]=0,i[4]=(d-M)*b,i[5]=(1-(u+m))*b,i[6]=(g+_)*b,i[7]=0,i[8]=(p+y)*v,i[9]=(g-_)*v,i[10]=(1-(u+x))*v,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=dr.set(i[0],i[1],i[2]).length(),o=dr.set(i[4],i[5],i[6]).length(),c=dr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),ai.copy(this);let l=1/a,h=1/o,f=1/c;return ai.elements[0]*=l,ai.elements[1]*=l,ai.elements[2]*=l,ai.elements[4]*=h,ai.elements[5]*=h,ai.elements[6]*=h,ai.elements[8]*=f,ai.elements[9]*=f,ai.elements[10]*=f,t.setFromRotationMatrix(ai),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,r,a,o=Jn,c=!1){let l=this.elements,h=2*r/(t-e),f=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===Jn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Cr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Jn,c=!1){let l=this.elements,h=2/(t-e),f=2/(n-i),u=-(t+e)/(t-e),d=-(n+i)/(n-i),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===Jn)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Cr)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};jl.prototype.isMatrix4=!0;var Ve=jl,dr=new P,ai=new Ve,Bg=new P(0,0,0),zg=new P(1,1,1),as=new P,Zo=new P,Bn=new P,Hd=new Ve,Gd=new an,Qt=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(at(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-at(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(at(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-at(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(at(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-at(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gd.setFromEuler(this),this.setFromQuaternion(Gd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qt.DEFAULT_ORDER="XYZ";var Fa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},kg=0,Vd=new P,pr=new an,Ni=new Ve,Ko=new P,va=new P,Hg=new P,Gg=new an,Wd=new P(1,0,0),Xd=new P(0,1,0),qd=new P(0,0,1),Yd={type:"added"},Vg={type:"removed"},mr={type:"childadded",child:null},Eh={type:"childremoved",child:null},Pt=class s extends yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new P,t=new Qt,n=new an,i=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ve},normalMatrix:{value:new $e}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.multiply(pr),this}rotateOnWorldAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.premultiply(pr),this}rotateX(e){return this.rotateOnAxis(Wd,e)}rotateY(e){return this.rotateOnAxis(Xd,e)}rotateZ(e){return this.rotateOnAxis(qd,e)}translateOnAxis(e,t){return Vd.copy(e).applyQuaternion(this.quaternion),this.position.add(Vd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wd,e)}translateY(e){return this.translateOnAxis(Xd,e)}translateZ(e){return this.translateOnAxis(qd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ko.copy(e):Ko.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),va.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ni.lookAt(va,Ko,this.up):Ni.lookAt(Ko,va,this.up),this.quaternion.setFromRotationMatrix(Ni),i&&(Ni.extractRotation(i.matrixWorld),pr.setFromRotationMatrix(Ni),this.quaternion.premultiply(pr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yd),mr.child=e,this.dispatchEvent(mr),mr.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vg),Eh.child=e,this.dispatchEvent(Eh),Eh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yd),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(va,e,Hg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(va,Gg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new P(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ct=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Wg={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&u>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wg)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},u0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},os={h:0,s:0,l:0},Jo={h:0,s:0,l:0};function wh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Te=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=lt.workingColorSpace){if(e=Du(e,1),t=at(t,0,1),n=at(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=wh(a,r,e+1/3),this.g=wh(a,r,e),this.b=wh(a,r,e-1/3)}return lt.colorSpaceToWorking(this,i),this}setStyle(e,t=gt){function n(r){r!==void 0&&parseFloat(r)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ze("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){let n=u0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}copyLinearToSRGB(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return lt.workingToColorSpace(vn.copy(this),e),Math.round(at(vn.r*255,0,255))*65536+Math.round(at(vn.g*255,0,255))*256+Math.round(at(vn.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(vn.copy(this),t);let n=vn.r,i=vn.g,r=vn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(i-r)/f+(i<r?6:0);break;case i:c=(r-n)/f+2;break;case r:c=(n-i)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=gt){lt.workingToColorSpace(vn.copy(this),e);let t=vn.r,n=vn.g,i=vn.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(os),this.setHSL(os.h+e,os.s+t,os.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(os),e.getHSL(Jo);let n=Ia(os.h,Jo.h,t),i=Ia(os.s,Jo.s,t),r=Ia(os.l,Jo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},vn=new Te;Te.NAMES=u0;var Oa=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qt,this.environmentIntensity=1,this.environmentRotation=new Qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},oi=new P,Di=new P,Th=new P,Ui=new P,gr=new P,xr=new P,Zd=new P,Ah=new P,Rh=new P,Ch=new P,Ih=new xt,Ph=new xt,Lh=new xt,fs=class s{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),oi.subVectors(e,t),i.cross(oi);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){oi.subVectors(i,t),Di.subVectors(n,t),Th.subVectors(e,t);let a=oi.dot(oi),o=oi.dot(Di),c=oi.dot(Th),l=Di.dot(Di),h=Di.dot(Th),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(l*c-o*h)*u,p=(a*h-o*c)*u;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Ui)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ui.x),c.addScaledVector(a,Ui.y),c.addScaledVector(o,Ui.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return Ih.setScalar(0),Ph.setScalar(0),Lh.setScalar(0),Ih.fromBufferAttribute(e,t),Ph.fromBufferAttribute(e,n),Lh.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ih,r.x),a.addScaledVector(Ph,r.y),a.addScaledVector(Lh,r.z),a}static isFrontFacing(e,t,n,i){return oi.subVectors(n,t),Di.subVectors(e,t),oi.cross(Di).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return oi.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),oi.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;gr.subVectors(i,n),xr.subVectors(r,n),Ah.subVectors(e,n);let c=gr.dot(Ah),l=xr.dot(Ah);if(c<=0&&l<=0)return t.copy(n);Rh.subVectors(e,i);let h=gr.dot(Rh),f=xr.dot(Rh);if(h>=0&&f<=h)return t.copy(i);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),t.copy(n).addScaledVector(gr,a);Ch.subVectors(e,r);let d=gr.dot(Ch),p=xr.dot(Ch);if(p>=0&&d<=p)return t.copy(r);let x=d*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(xr,o);let g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return Zd.subVectors(r,i),o=(f-h)/(f-h+(d-p)),t.copy(i).addScaledVector(Zd,o);let m=1/(g+x+u);return a=x*m,o=u*m,t.copy(n).addScaledVector(gr,a).addScaledVector(xr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,li):li.fromBufferAttribute(r,a),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$o.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$o.copy(n.boundingBox)),$o.applyMatrix4(e.matrixWorld),this.union($o)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ya),jo.subVectors(this.max,ya),_r.subVectors(e.a,ya),vr.subVectors(e.b,ya),yr.subVectors(e.c,ya),ls.subVectors(vr,_r),cs.subVectors(yr,vr),Ns.subVectors(_r,yr);let t=[0,-ls.z,ls.y,0,-cs.z,cs.y,0,-Ns.z,Ns.y,ls.z,0,-ls.x,cs.z,0,-cs.x,Ns.z,0,-Ns.x,-ls.y,ls.x,0,-cs.y,cs.x,0,-Ns.y,Ns.x,0];return!Nh(t,_r,vr,yr,jo)||(t=[1,0,0,0,1,0,0,0,1],!Nh(t,_r,vr,yr,jo))?!1:(Qo.crossVectors(ls,cs),t=[Qo.x,Qo.y,Qo.z],Nh(t,_r,vr,yr,jo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Fi=[new P,new P,new P,new P,new P,new P,new P,new P],li=new P,$o=new Hn,_r=new P,vr=new P,yr=new P,ls=new P,cs=new P,Ns=new P,ya=new P,jo=new P,Qo=new P,Ds=new P;function Nh(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ds.fromArray(s,r);let o=i.x*Math.abs(Ds.x)+i.y*Math.abs(Ds.y)+i.z*Math.abs(Ds.z),c=e.dot(Ds),l=t.dot(Ds),h=n.dot(Ds);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var jt=new P,el=new ce,Xg=0,zt=class extends yi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Lu,this.updateRanges=[],this.gpuType=Xn,this.version=0,this._normalizationScale=e!==void 0?zc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)el.fromBufferAttribute(this,t),el.applyMatrix3(e),this.setXY(t,el.x,el.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Fu(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ou(e,this.array)}};var Ba=class extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var za=class extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ye=class extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},qg=new Hn,Ma=new P,Dh=new P,Ln=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qg.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ma.subVectors(e,this.center);let t=Ma.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ma,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ma.copy(e.center).add(Dh)),this.expandByPoint(Ma.copy(e.center).sub(Dh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Yg=0,Zn=new Ve,Uh=new Pt,Mr=new P,zn=new Hn,ba=new Hn,dn=new P,vt=class s extends yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_g(e)?za:Ba)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $e().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,n){return Zn.makeTranslation(e,t,n),this.applyMatrix4(Zn),this}scale(e,t,n){return Zn.makeScale(e,t,n),this.applyMatrix4(Zn),this}lookAt(e){return Uh.lookAt(e),Uh.updateMatrix(),this.applyMatrix4(Uh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ye(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];zn.setFromBufferAttribute(r),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];ba.setFromBufferAttribute(o),this.morphTargetsRelative?(dn.addVectors(zn.min,ba.min),zn.expandByPoint(dn),dn.addVectors(zn.max,ba.max),zn.expandByPoint(dn)):(zn.expandByPoint(ba.min),zn.expandByPoint(ba.max))}zn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)dn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(dn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)dn.fromBufferAttribute(o,l),c&&(Mr.fromBufferAttribute(e,l),dn.add(Mr)),i=Math.max(i,n.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let I=0;I<n.count;I++)o[I]=new P,c[I]=new P;let h=new P,f=new P,u=new P,d=new ce,p=new ce,x=new ce,g=new P,m=new P;function _(I,C,N){l[I]=l[C]=l[N]=1,h.fromBufferAttribute(n,I),f.fromBufferAttribute(n,C),u.fromBufferAttribute(n,N),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,C),x.fromBufferAttribute(r,N),f.sub(h),u.sub(h),p.sub(d),x.sub(d);let z=1/(p.x*x.y-x.x*p.y);isFinite(z)&&(g.copy(f).multiplyScalar(x.y).addScaledVector(u,-p.y).multiplyScalar(z),m.copy(u).multiplyScalar(p.x).addScaledVector(f,-x.x).multiplyScalar(z),o[I].add(g),o[C].add(g),o[N].add(g),c[I].add(m),c[C].add(m),c[N].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let I=0,C=y.length;I<C;++I){let N=y[I],z=N.start,X=N.count;for(let D=z,q=z+X;D<q;D+=3)_(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let M=new P,w=new P,b=new P,v=new P;function S(I){b.fromBufferAttribute(i,I),v.copy(b);let C=o[I];M.copy(C),M.sub(b.multiplyScalar(b.dot(C))).normalize(),w.crossVectors(v,C);let z=w.dot(c[I])<0?-1:1;a.setXYZW(I,M.x,M.y,M.z,z)}for(let I=0,C=n.count;I<C;++I)l[I]&&S(I);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,f=new P;if(e)for(let u=0,d=e.count;u<d;u+=3){let p=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h),d=0,p=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?d=c[x]*o.data.stride+o.offset:d=c[x]*h;for(let m=0;m<h;m++)u[p++]=l[d++]}return new zt(u,h,f)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let u=l[h],d=e(u,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Lu,this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Kd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Kd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Kd(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=di()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}var An=new P,Ur=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?zc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Da("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Da("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Fu(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ou(e,this.data.array)}},Fh=new P,Zg=new P,Kg=new $e,ci=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Fh.subVectors(n,t).cross(Zg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Fh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Kg.getNormalMatrix(e),i=this.coplanarPoint(Fh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Jg=0,yn=class extends yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=di(),this.name="",this.type="Material",this.blending=Zr,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fu,this.blendDst=du,this.blendEquation=js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=Ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=t0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bl,this.stencilZFail=bl,this.stencilZPass=bl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ze(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Te().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ci().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ce().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ce().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Oi=new P,Oh=new P,tl=new P,nl=new P,Gs=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Oh.copy(e).add(t).multiplyScalar(.5),tl.copy(t).sub(e).normalize(),nl.copy(this.origin).sub(Oh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(tl),o=nl.dot(this.direction),c=-nl.dot(tl),l=nl.lengthSq(),h=Math.abs(1-a*a),f,u,d,p;if(h>0)if(f=a*c-o,u=a*o-c,p=r*h,f>=0)if(u>=-p)if(u<=p){let x=1/h;f*=x,u*=x,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Oh).addScaledVector(tl,u),d}intersectSphere(e,t){if(e.radius<0)return null;Oi.subVectors(e.center,this.origin);let n=Oi.dot(this.direction),i=Oi.dot(Oi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,n,i,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,d=e.z-a.z,p=t.x-a.x,x=t.y-a.y,g=t.z-a.z,m=n.x-a.x,_=n.y-a.y,y=n.z-a.z,M=Math.abs(c),w=Math.abs(l),b=Math.abs(h),v,S,I,C,N,z,X,D,q,G,L,K;if(M>=w&&M>=b?(I=c,z=f,q=p,K=m,c>=0?(v=l,S=h,C=u,N=d,X=x,D=g,G=_,L=y):(v=h,S=l,C=d,N=u,X=g,D=x,G=y,L=_)):w>=b?(I=l,z=u,q=x,K=_,l>=0?(v=h,S=c,C=d,N=f,X=g,D=p,G=y,L=m):(v=c,S=h,C=f,N=d,X=p,D=g,G=m,L=y)):(I=h,z=d,q=g,K=y,h>=0?(v=c,S=l,C=f,N=u,X=p,D=x,G=m,L=_):(v=l,S=c,C=u,N=f,X=x,D=p,G=_,L=m)),I===0)return null;let A=v/I,V=S/I,H=1/I,W=C-A*z,k=N-V*z,O=X-A*q,re=D-V*q,pe=G-A*K,Ie=L-V*K,me=pe*re-Ie*O,Oe=W*Ie-k*pe,ft=O*k-re*W;if(i){if(me<0||Oe<0||ft<0)return null}else if((me<0||Oe<0||ft<0)&&(me>0||Oe>0||ft>0))return null;let Ne=me+Oe+ft;if(Ne===0)return null;let Ke=H*(me*z+Oe*q+ft*K);return(Ne>0?Ke<0:Ke>0)?null:this.at(Ke/Ne,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},It=class extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=go,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Jd=new Ve,Us=new Gs,il=new Ln,$d=new P,sl=new P,rl=new P,al=new P,Bh=new P,ol=new P,jd=new P,ll=new P,je=class extends Pt{constructor(e=new vt,t=new It){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){ol.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(Bh.fromBufferAttribute(f,e),a?ol.addScaledVector(Bh,h):ol.addScaledVector(Bh.sub(t),h))}t.add(ol)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),il.copy(n.boundingSphere),il.applyMatrix4(r),Us.copy(e.ray).recast(e.near),!(il.containsPoint(Us.origin)===!1&&(Us.intersectSphere(il,$d)===null||Us.origin.distanceToSquared($d)>(e.far-e.near)**2))&&(Jd.copy(r).invert(),Us.copy(e.ray).applyMatrix4(Jd),!(n.boundingBox!==null&&Us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Us)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){let g=u[p],m=a[g.materialIndex],_=Math.max(g.start,d.start),y=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let M=_,w=y;M<w;M+=3){let b=o.getX(M),v=o.getX(M+1),S=o.getX(M+2);i=cl(this,m,e,n,l,h,f,b,v,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){let _=o.getX(g),y=o.getX(g+1),M=o.getX(g+2);i=cl(this,a,e,n,l,h,f,_,y,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){let g=u[p],m=a[g.materialIndex],_=Math.max(g.start,d.start),y=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let M=_,w=y;M<w;M+=3){let b=M,v=M+1,S=M+2;i=cl(this,m,e,n,l,h,f,b,v,S),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){let _=g,y=g+1,M=g+2;i=cl(this,a,e,n,l,h,f,_,y,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function $g(s,e,t,n,i,r,a,o){let c;if(e.side===In?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===$n,o),c===null)return null;ll.copy(o),ll.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(ll);return l<t.near||l>t.far?null:{distance:l,point:ll.clone(),object:s}}function cl(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,sl),s.getVertexPosition(c,rl),s.getVertexPosition(l,al);let h=$g(s,e,t,n,sl,rl,al,jd);if(h){let f=new P;fs.getBarycoord(jd,sl,rl,al,f),i&&(h.uv=fs.getInterpolatedAttribute(i,o,c,l,f,new ce)),r&&(h.uv1=fs.getInterpolatedAttribute(r,o,c,l,f,new ce)),a&&(h.normal=fs.getInterpolatedAttribute(a,o,c,l,f,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new P,materialIndex:0};fs.getNormal(sl,rl,al,u.normal),h.face=u,h.barycoord=f}return h}var Sa=new xt,Qd=new xt,ep=new xt,jg=new xt,tp=new Ve,hl=new P,zh=new Ln,np=new Ve,kh=new Gs,ka=class extends je{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yh,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Hn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,hl),this.boundingBox.expandByPoint(hl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,hl),this.boundingSphere.expandByPoint(hl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zh.copy(this.boundingSphere),zh.applyMatrix4(i),e.ray.intersectsSphere(zh)!==!1&&(np.copy(i).invert(),kh.copy(e.ray).applyMatrix4(np),!(this.boundingBox!==null&&kh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,kh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Yh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$p?this.bindMatrixInverse.copy(this.bindMatrix).invert():ze("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Qd.fromBufferAttribute(i.attributes.skinIndex,e),ep.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Sa.copy(t),t.set(0,0,0,0)):(Sa.set(t.x,t.y,t.z,1),t.set(0,0,0)),Sa.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=ep.getComponent(r);if(a!==0){let o=Qd.getComponent(r);tp.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(jg.copy(Sa).applyMatrix4(tp),a)}}return t.isVector4&&(t.w=Sa.w),t.applyMatrix4(this.bindMatrixInverse)}},Fr=class extends Pt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Or=class extends on{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Yt,h=Yt,f,u){super(null,a,o,c,l,h,i,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ip=new Ve,Qg=new Ve,Ha=class s{constructor(e=[],t=[]){this.uuid=di(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ze("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ve;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Qg;ip.multiplyMatrices(o,t[r]),ip.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Or(t,e,e,jn,Xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(ze("Skeleton: No bone found with UUID:",r),a=new Fr),this.bones.push(a),this.boneInverses.push(new Ve().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},en=class extends zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},br=new Ve,sp=new Ve,ul=[],rp=new Hn,ex=new Ve,Ea=new je,wa=new Ln,tn=class extends je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new en(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ex)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,br),rp.copy(e.boundingBox).applyMatrix4(br),this.boundingBox.union(rp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,br),wa.copy(e.boundingSphere).applyMatrix4(br),this.boundingSphere.union(wa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ea.geometry=this.geometry,Ea.material=this.material,Ea.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wa.copy(this.boundingSphere),wa.applyMatrix4(n),e.ray.intersectsSphere(wa)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,br),sp.multiplyMatrices(n,br),Ea.matrixWorld=sp,Ea.raycast(e,ul);for(let a=0,o=ul.length;a<o;a++){let c=ul[a];c.instanceId=r,c.object=this,t.push(c)}ul.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new en(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Or(new Float32Array(i*this.count),i,this.count,rc,Xn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Fs=new Ln,tx=new ce(.5,.5),fl=new P,ds=class{constructor(e=new ci,t=new ci,n=new ci,i=new ci,r=new ci,a=new ci){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],x=r[9],g=r[10],m=r[11],_=r[12],y=r[13],M=r[14],w=r[15];if(i[0].setComponents(l-a,d-h,m-p,w-_).normalize(),i[1].setComponents(l+a,d+h,m+p,w+_).normalize(),i[2].setComponents(l+o,d+f,m+x,w+y).normalize(),i[3].setComponents(l-o,d-f,m-x,w-y).normalize(),n)i[4].setComponents(c,u,g,M).normalize(),i[5].setComponents(l-c,d-u,m-g,w-M).normalize();else if(i[4].setComponents(l-c,d-u,m-g,w-M).normalize(),t===Jn)i[5].setComponents(l+c,d+u,m+g,w+M).normalize();else if(t===Cr)i[5].setComponents(c,u,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fs)}intersectsSprite(e){Fs.center.set(0,0,0);let t=tx.distanceTo(e.center);return Fs.radius=.7071067811865476+t,Fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(fl.x=i.normal.x>0?e.max.x:e.min.x,fl.y=i.normal.y>0?e.max.y:e.min.y,fl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(fl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ap=new Ve,Nl=class s{constructor(){this.coordinateSystem=Jn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];ap.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new ds),n[i].setFromProjectionMatrix(ap,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new ds),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};var Br=class extends yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Dl=new P,Ul=new P,op=new Ve,Ta=new Gs,dl=new Ln,Hh=new P,lp=new P,Vs=class extends Pt{constructor(e=new vt,t=new Br){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Dl.fromBufferAttribute(t,i-1),Ul.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Dl.distanceTo(Ul);e.setAttribute("lineDistance",new Ye(n,1))}else ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dl.copy(n.boundingSphere),dl.applyMatrix4(i),dl.radius+=r,e.ray.intersectsSphere(dl)===!1)return;op.copy(i).invert(),Ta.copy(e.ray).applyMatrix4(op);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=l){let m=h.getX(x),_=h.getX(x+1),y=pl(this,e,Ta,c,m,_,x);y&&t.push(y)}if(this.isLineLoop){let x=h.getX(p-1),g=h.getX(d),m=pl(this,e,Ta,c,x,g,p-1);m&&t.push(m)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=l){let m=pl(this,e,Ta,c,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=pl(this,e,Ta,c,p-1,d,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function pl(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(Dl.fromBufferAttribute(o,i),Ul.fromBufferAttribute(o,r),t.distanceSqToSegment(Dl,Ul,Hh,lp)>n)return;Hh.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(Hh);if(!(l<e.near||l>e.far))return{distance:l,point:lp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var cp=new P,hp=new P,Ga=class extends Vs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)cp.fromBufferAttribute(t,i),hp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+cp.distanceTo(hp);e.setAttribute("lineDistance",new Ye(n,1))}else ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Va=class extends Vs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},zr=class extends yn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},up=new Ve,jh=new Gs,ml=new Ln,gl=new P,Wa=class extends Pt{constructor(e=new vt,t=new zr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ml.copy(n.boundingSphere),ml.applyMatrix4(i),ml.radius+=r,e.ray.intersectsSphere(ml)===!1)return;up.copy(i).invert(),jh.copy(e.ray).applyMatrix4(up);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let p=u,x=d;p<x;p++){let g=l.getX(p);gl.fromBufferAttribute(f,g),fp(gl,g,c,i,e,t,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=u,x=d;p<x;p++)gl.fromBufferAttribute(f,p),fp(gl,p,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function fp(s,e,t,n,i,r,a){let o=jh.distanceSqToPoint(s);if(o<t){let c=new P;jh.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Xa=class extends on{constructor(e=[],t=Qs,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Gn=class extends on{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Hi=class extends on{constructor(e,t,n=ui,i,r,a,o=Yt,c=Yt,l,h=ki,f=1){if(h!==ki&&h!==Ji)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},qa=class extends Hi{constructor(e,t=ui,n=Qs,i,r,a=Yt,o=Yt,c,l=ki){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ya=class extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Nn=class s extends vt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ye(l,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(f,2));function p(x,g,m,_,y,M,w,b,v,S,I){let C=M/v,N=w/S,z=M/2,X=w/2,D=b/2,q=v+1,G=S+1,L=0,K=0,A=new P;for(let V=0;V<G;V++){let H=V*N-X;for(let W=0;W<q;W++){let k=W*C-z;A[x]=k*_,A[g]=H*y,A[m]=D,l.push(A.x,A.y,A.z),A[x]=0,A[g]=0,A[m]=b>0?1:-1,h.push(A.x,A.y,A.z),f.push(W/v),f.push(1-V/S),L+=1}}for(let V=0;V<S;V++)for(let H=0;H<v;H++){let W=u+H+q*V,k=u+H+q*(V+1),O=u+(H+1)+q*(V+1),re=u+(H+1)+q*V;c.push(W,k,re),c.push(k,O,re),K+=6}o.addGroup(d,K,I),d+=K,u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ln=class s extends vt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,x=[],g=n/2,m=0;_(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ye(f,3)),this.setAttribute("normal",new Ye(u,3)),this.setAttribute("uv",new Ye(d,2));function _(){let M=new P,w=new P,b=0,v=(t-e)/n;for(let S=0;S<=r;S++){let I=[],C=S/r,N=C*(t-e)+e;for(let z=0;z<=i;z++){let X=z/i,D=X*c+o,q=Math.sin(D),G=Math.cos(D);w.x=N*q,w.y=-C*n+g,w.z=N*G,f.push(w.x,w.y,w.z),M.set(q,v,G).normalize(),u.push(M.x,M.y,M.z),d.push(X,1-C),I.push(p++)}x.push(I)}for(let S=0;S<i;S++)for(let I=0;I<r;I++){let C=x[I][S],N=x[I+1][S],z=x[I+1][S+1],X=x[I][S+1];(e>0||I!==0)&&(h.push(C,N,X),b+=3),(t>0||I!==r-1)&&(h.push(N,z,X),b+=3)}l.addGroup(m,b,0),m+=b}function y(M){let w=p,b=new ce,v=new P,S=0,I=M===!0?e:t,C=M===!0?1:-1;for(let z=1;z<=i;z++)f.push(0,g*C,0),u.push(0,C,0),d.push(.5,.5),p++;let N=p;for(let z=0;z<=i;z++){let D=z/i*c+o,q=Math.cos(D),G=Math.sin(D);v.x=I*G,v.y=g*C,v.z=I*q,f.push(v.x,v.y,v.z),u.push(0,C,0),b.x=q*.5+.5,b.y=G*.5*C+.5,d.push(b.x,b.y),p++}for(let z=0;z<i;z++){let X=w+z,D=N+z;M===!0?h.push(D,D+1,X):h.push(D+1,D,X),S+=3}l.addGroup(m,S,M===!0?1:2),m+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ps=class s extends ln{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},kr=class s extends vt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),l(n),h(),this.setAttribute("position",new Ye(r,3)),this.setAttribute("normal",new Ye(r.slice(),3)),this.setAttribute("uv",new Ye(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let y=new P,M=new P,w=new P;for(let b=0;b<t.length;b+=3)d(t[b+0],y),d(t[b+1],M),d(t[b+2],w),c(y,M,w,_)}function c(_,y,M,w){let b=w+1,v=[];for(let S=0;S<=b;S++){v[S]=[];let I=_.clone().lerp(M,S/b),C=y.clone().lerp(M,S/b),N=b-S;for(let z=0;z<=N;z++)z===0&&S===b?v[S][z]=I:v[S][z]=I.clone().lerp(C,z/N)}for(let S=0;S<b;S++)for(let I=0;I<2*(b-S)-1;I++){let C=Math.floor(I/2);I%2===0?(u(v[S][C+1]),u(v[S+1][C]),u(v[S][C])):(u(v[S][C+1]),u(v[S+1][C+1]),u(v[S+1][C]))}}function l(_){let y=new P;for(let M=0;M<r.length;M+=3)y.x=r[M+0],y.y=r[M+1],y.z=r[M+2],y.normalize().multiplyScalar(_),r[M+0]=y.x,r[M+1]=y.y,r[M+2]=y.z}function h(){let _=new P;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];let M=g(_)/2/Math.PI+.5,w=m(_)/Math.PI+.5;a.push(M,1-w)}p(),f()}function f(){for(let _=0;_<a.length;_+=6){let y=a[_+0],M=a[_+2],w=a[_+4],b=Math.max(y,M,w),v=Math.min(y,M,w);b>.9&&v<.1&&(y<.2&&(a[_+0]+=1),M<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function u(_){r.push(_.x,_.y,_.z)}function d(_,y){let M=_*3;y.x=e[M+0],y.y=e[M+1],y.z=e[M+2]}function p(){let _=new P,y=new P,M=new P,w=new P,b=new ce,v=new ce,S=new ce;for(let I=0,C=0;I<r.length;I+=9,C+=6){_.set(r[I+0],r[I+1],r[I+2]),y.set(r[I+3],r[I+4],r[I+5]),M.set(r[I+6],r[I+7],r[I+8]),b.set(a[C+0],a[C+1]),v.set(a[C+2],a[C+3]),S.set(a[C+4],a[C+5]),w.copy(_).add(y).add(M).divideScalar(3);let N=g(w);x(b,C+0,_,N),x(v,C+2,y,N),x(S,C+4,M,N)}}function x(_,y,M,w){w<0&&_.x===1&&(a[y]=_.x-1),M.x===0&&M.z===0&&(a[y]=w/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},Za=class s extends kr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);let h=n[i],u=n[i+1]-h,d=(a-h)/u;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new ce:new P);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,i=[],r=[],a=[],o=new P,c=new Ve;for(let d=0;d<=e;d++){let p=d/e;i[d]=this.getTangentAt(p,new P)}r[0]=new P,a[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(at(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,p))}a[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(at(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(i[p],d*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Hr=class extends Vn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ce){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,d=l-this.aY;c=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Fl=class extends Hr{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Bu(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+f)+(c-o)/f;u*=h,d*=h,i(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var dp=new P,pp=new P,Gh=new Bu,Vh=new Bu,Wh=new Bu,Gi=class extends Vn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(pp.subVectors(i[0],i[1]).add(i[0]),l=pp);let f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(dp.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=dp),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(f),d),x=Math.pow(f.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),Gh.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,p,x,g),Vh.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,p,x,g),Wh.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(Gh.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Vh.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Wh.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(Gh.calc(c),Vh.calc(c),Wh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function mp(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function nx(s,e){let t=1-s;return t*t*e}function ix(s,e){return 2*(1-s)*s*e}function sx(s,e){return s*s*e}function Pa(s,e,t,n){return nx(s,e)+ix(s,t)+sx(s,n)}function rx(s,e){let t=1-s;return t*t*t*e}function ax(s,e){let t=1-s;return 3*t*t*s*e}function ox(s,e){return 3*(1-s)*s*s*e}function lx(s,e){return s*s*s*e}function La(s,e,t,n,i){return rx(s,e)+ax(s,t)+ox(s,n)+lx(s,i)}var Ka=class extends Vn{constructor(e=new ce,t=new ce,n=new ce,i=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(La(e,i.x,r.x,a.x,o.x),La(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ol=class extends Vn{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(La(e,i.x,r.x,a.x,o.x),La(e,i.y,r.y,a.y,o.y),La(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ja=class extends Vn{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bl=class extends Vn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$a=class extends Vn{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Pa(e,i.x,r.x,a.x),Pa(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ja=class extends Vn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Pa(e,i.x,r.x,a.x),Pa(e,i.y,r.y,a.y),Pa(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qa=class extends Vn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(mp(o,c.x,l.x,h.x,f.x),mp(o,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ce().fromArray(i))}return this}},zl=Object.freeze({__proto__:null,ArcCurve:Fl,CatmullRomCurve3:Gi,CubicBezierCurve:Ka,CubicBezierCurve3:Ol,EllipseCurve:Hr,LineCurve:Ja,LineCurve3:Bl,QuadraticBezierCurve:$a,QuadraticBezierCurve3:ja,SplineCurve:Qa}),kl=class extends Vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new zl[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},Ws=class extends kl{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ja(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new $a(this.currentPoint.clone(),new ce(e,t),new ce(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new Ka(this.currentPoint.clone(),new ce(e,t),new ce(n,i),new ce(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Qa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){let l=new Hr(e,t,n,i,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Gr=class extends Ws{constructor(e){super(e),this.uuid=di(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Ws().fromJSON(i))}return this}};function cx(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=f0(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=px(s,e,r,t)),s.length>80*t){o=s[0],c=s[1];let h=o,f=c;for(let u=t;u<i;u+=t){let d=s[u],p=s[u+1];d<o&&(o=d),p<c&&(c=p),d>h&&(h=d),p>f&&(f=p)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return eo(r,a,t,o,c,l,0),a}function f0(s,e,t,n,i){let r;if(i===wx(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=gp(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=gp(a/n|0,s[a],s[a+1],r);return r&&Vr(r,r.next)&&(no(r),r=r.next),r}function Xs(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Vr(t,t.next)||Xt(t.prev,t,t.next)===0)){if(no(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function eo(s,e,t,n,i,r,a){if(!s)return;!a&&r&&vx(s,n,i,r);let o=s;for(;s.prev!==s.next;){let c=s.prev,l=s.next;if(r?ux(s,n,i,r):hx(s)){e.push(c.i,s.i,l.i),no(s),s=l.next,o=l.next;continue}if(s=l,s===o){a?a===1?(s=fx(Xs(s),e),eo(s,e,t,n,i,r,2)):a===2&&dx(s,e,t,n,i,r):eo(Xs(s),e,t,n,i,r,1);break}}}function hx(s){let e=s.prev,t=s,n=s.next;if(Xt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,r,a),f=Math.min(o,c,l),u=Math.max(i,r,a),d=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=f&&p.y<=d&&Aa(i,o,r,c,a,l,p.x,p.y)&&Xt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function ux(s,e,t,n){let i=s.prev,r=s,a=s.next;if(Xt(i,r,a)>=0)return!1;let o=i.x,c=r.x,l=a.x,h=i.y,f=r.y,u=a.y,d=Math.min(o,c,l),p=Math.min(h,f,u),x=Math.max(o,c,l),g=Math.max(h,f,u),m=Qh(d,p,e,t,n),_=Qh(x,g,e,t,n),y=s.prevZ,M=s.nextZ;for(;y&&y.z>=m&&M&&M.z<=_;){if(y.x>=d&&y.x<=x&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&Aa(o,h,c,f,l,u,y.x,y.y)&&Xt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=d&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Aa(o,h,c,f,l,u,M.x,M.y)&&Xt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=m;){if(y.x>=d&&y.x<=x&&y.y>=p&&y.y<=g&&y!==i&&y!==a&&Aa(o,h,c,f,l,u,y.x,y.y)&&Xt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=_;){if(M.x>=d&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Aa(o,h,c,f,l,u,M.x,M.y)&&Xt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function fx(s,e){let t=s;do{let n=t.prev,i=t.next.next;!Vr(n,i)&&p0(n,t,t.next,i)&&to(n,i)&&to(i,n)&&(e.push(n.i,t.i,i.i),no(t),no(t.next),t=s=i),t=t.next}while(t!==s);return Xs(t)}function dx(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&bx(a,o)){let c=m0(a,o);a=Xs(a,a.next),c=Xs(c,c.next),eo(a,e,t,n,i,r,0),eo(c,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function px(s,e,t,n){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:s.length,l=f0(s,o,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Mx(l))}i.sort(mx);for(let r=0;r<i.length;r++)t=gx(i[r],t);return t}function mx(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function gx(s,e){let t=xx(s,e);if(!t)return e;let n=m0(t,s);return Xs(n,n.next),Xs(t,t.next)}function xx(s,e){let t=e,n=s.x,i=s.y,r=-1/0,a;if(Vr(s,t))return t;do{if(Vr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let f=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&d0(i<l?n:r,i,c,l,i<l?r:n,i,t.x,t.y)){let f=Math.abs(i-t.y)/(n-t.x);to(t,s)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&_x(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function _x(s,e){return Xt(s.prev,s,e.prev)<0&&Xt(e.next,s,s.next)<0}function vx(s,e,t,n){let i=s;do i.z===0&&(i.z=Qh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,yx(i)}function yx(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function Qh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Mx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function d0(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function Aa(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&d0(s,e,t,n,i,r,a,o)}function bx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Sx(s,e)&&(to(s,e)&&to(e,s)&&Ex(s,e)&&(Xt(s.prev,s,e.prev)||Xt(s,e.prev,e))||Vr(s,e)&&Xt(s.prev,s,s.next)>0&&Xt(e.prev,e,e.next)>0)}function Xt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Vr(s,e){return s.x===e.x&&s.y===e.y}function p0(s,e,t,n){let i=_l(Xt(s,e,t)),r=_l(Xt(s,e,n)),a=_l(Xt(t,n,s)),o=_l(Xt(t,n,e));return!!(i!==r&&a!==o||i===0&&xl(s,t,e)||r===0&&xl(s,n,e)||a===0&&xl(t,s,n)||o===0&&xl(t,e,n))}function xl(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function _l(s){return s>0?1:s<0?-1:0}function Sx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&p0(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function to(s,e){return Xt(s.prev,s,s.next)<0?Xt(s,e,s.next)>=0&&Xt(s,s.prev,e)>=0:Xt(s,e,s.prev)<0||Xt(s,s.next,e)<0}function Ex(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function m0(s,e){let t=eu(s.i,s.x,s.y),n=eu(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function gp(s,e,t,n){let i=eu(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function no(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function eu(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wx(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var tu=class{static triangulate(e,t,n=2){return cx(e,t,n)}},Os=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];xp(e),_p(n,e);let a=e.length;t.forEach(xp);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,_p(n,t[c]);let o=tu.triangulate(n,i);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function xp(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function _p(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var io=class s extends vt{constructor(e=new Gr([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new Ye(i,3)),this.setAttribute("uv",new Ye(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Tx,y,M=!1,w,b,v,S;if(m){y=m.getSpacedPoints(h),M=!0,u=!1;let ie=m.isCatmullRomCurve3?m.closed:!1;w=m.computeFrenetFrames(h,ie),b=new P,v=new P,S=new P}u||(g=0,d=0,p=0,x=0);let I=o.extractPoints(l),C=I.shape,N=I.holes;if(!Os.isClockWise(C)){C=C.reverse();for(let ie=0,ae=N.length;ie<ae;ie++){let oe=N[ie];Os.isClockWise(oe)&&(N[ie]=oe.reverse())}}function X(ie){let oe=10000000000000001e-36,Ee=ie[0];for(let ge=1;ge<=ie.length;ge++){let He=ge%ie.length,Le=ie[He],et=Le.x-Ee.x,tt=Le.y-Ee.y,dt=et*et+tt*tt,U=Math.max(Math.abs(Le.x),Math.abs(Le.y),Math.abs(Ee.x),Math.abs(Ee.y)),At=oe*U*U;if(dt<=At){ie.splice(He,1),ge--;continue}Ee=Le}}X(C),N.forEach(X);let D=N.length,q=C;for(let ie=0;ie<D;ie++){let ae=N[ie];C=C.concat(ae)}function G(ie,ae,oe){return ae||Je("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(ae,oe)}let L=C.length;function K(ie,ae,oe){let Ee,ge,He,Le=ie.x-ae.x,et=ie.y-ae.y,tt=oe.x-ie.x,dt=oe.y-ie.y,U=Le*Le+et*et,At=Le*dt-et*tt;if(Math.abs(At)>Number.EPSILON){let it=Math.sqrt(U),St=Math.sqrt(tt*tt+dt*dt),ue=ae.x-et/it,Ht=ae.y+Le/it,Ge=oe.x-dt/St,ee=oe.y+tt/St,R=((Ge-ue)*dt-(ee-Ht)*tt)/(Le*dt-et*tt);Ee=ue+Le*R-ie.x,ge=Ht+et*R-ie.y;let E=Ee*Ee+ge*ge;if(E<=2)return new ce(Ee,ge);He=Math.sqrt(E/2)}else{let it=!1;Le>Number.EPSILON?tt>Number.EPSILON&&(it=!0):Le<-Number.EPSILON?tt<-Number.EPSILON&&(it=!0):Math.sign(et)===Math.sign(dt)&&(it=!0),it?(Ee=-et,ge=Le,He=Math.sqrt(U)):(Ee=Le,ge=et,He=Math.sqrt(U/2))}return new ce(Ee/He,ge/He)}let A=[];for(let ie=0,ae=q.length,oe=ae-1,Ee=ie+1;ie<ae;ie++,oe++,Ee++)oe===ae&&(oe=0),Ee===ae&&(Ee=0),A[ie]=K(q[ie],q[oe],q[Ee]);let V=[],H,W=A.concat();for(let ie=0,ae=D;ie<ae;ie++){let oe=N[ie];H=[];for(let Ee=0,ge=oe.length,He=ge-1,Le=Ee+1;Ee<ge;Ee++,He++,Le++)He===ge&&(He=0),Le===ge&&(Le=0),H[Ee]=K(oe[Ee],oe[He],oe[Le]);V.push(H),W=W.concat(H)}let k;if(g===0)k=Os.triangulateShape(q,N);else{let ie=[],ae=[];for(let oe=0;oe<g;oe++){let Ee=oe/g,ge=d*Math.cos(Ee*Math.PI/2),He=p*Math.sin(Ee*Math.PI/2)+x;for(let Le=0,et=q.length;Le<et;Le++){let tt=G(q[Le],A[Le],He);Oe(tt.x,tt.y,-ge),Ee===0&&ie.push(tt)}for(let Le=0,et=D;Le<et;Le++){let tt=N[Le];H=V[Le];let dt=[];for(let U=0,At=tt.length;U<At;U++){let it=G(tt[U],H[U],He);Oe(it.x,it.y,-ge),Ee===0&&dt.push(it)}Ee===0&&ae.push(dt)}}k=Os.triangulateShape(ie,ae)}let O=k.length,re=p+x;for(let ie=0;ie<L;ie++){let ae=u?G(C[ie],W[ie],re):C[ie];M?(v.copy(w.normals[0]).multiplyScalar(ae.x),b.copy(w.binormals[0]).multiplyScalar(ae.y),S.copy(y[0]).add(v).add(b),Oe(S.x,S.y,S.z)):Oe(ae.x,ae.y,0)}for(let ie=1;ie<=h;ie++)for(let ae=0;ae<L;ae++){let oe=u?G(C[ae],W[ae],re):C[ae];M?(v.copy(w.normals[ie]).multiplyScalar(oe.x),b.copy(w.binormals[ie]).multiplyScalar(oe.y),S.copy(y[ie]).add(v).add(b),Oe(S.x,S.y,S.z)):Oe(oe.x,oe.y,f/h*ie)}for(let ie=g-1;ie>=0;ie--){let ae=ie/g,oe=d*Math.cos(ae*Math.PI/2),Ee=p*Math.sin(ae*Math.PI/2)+x;for(let ge=0,He=q.length;ge<He;ge++){let Le=G(q[ge],A[ge],Ee);Oe(Le.x,Le.y,f+oe)}for(let ge=0,He=N.length;ge<He;ge++){let Le=N[ge];H=V[ge];for(let et=0,tt=Le.length;et<tt;et++){let dt=G(Le[et],H[et],Ee);M?Oe(dt.x,dt.y+y[h-1].y,y[h-1].x+oe):Oe(dt.x,dt.y,f+oe)}}}pe(),Ie();function pe(){let ie=i.length/3;if(u){let ae=0,oe=L*ae;for(let Ee=0;Ee<O;Ee++){let ge=k[Ee];ft(ge[2]+oe,ge[1]+oe,ge[0]+oe)}ae=h+g*2,oe=L*ae;for(let Ee=0;Ee<O;Ee++){let ge=k[Ee];ft(ge[0]+oe,ge[1]+oe,ge[2]+oe)}}else{for(let ae=0;ae<O;ae++){let oe=k[ae];ft(oe[2],oe[1],oe[0])}for(let ae=0;ae<O;ae++){let oe=k[ae];ft(oe[0]+L*h,oe[1]+L*h,oe[2]+L*h)}}n.addGroup(ie,i.length/3-ie,0)}function Ie(){let ie=i.length/3,ae=0;me(q,ae),ae+=q.length;for(let oe=0,Ee=N.length;oe<Ee;oe++){let ge=N[oe];me(ge,ae),ae+=ge.length}n.addGroup(ie,i.length/3-ie,1)}function me(ie,ae){let oe=ie.length;for(;--oe>=0;){let Ee=oe,ge=oe-1;ge<0&&(ge=ie.length-1);for(let He=0,Le=h+g*2;He<Le;He++){let et=L*He,tt=L*(He+1),dt=ae+Ee+et,U=ae+ge+et,At=ae+ge+tt,it=ae+Ee+tt;Ne(dt,U,At,it)}}}function Oe(ie,ae,oe){c.push(ie),c.push(ae),c.push(oe)}function ft(ie,ae,oe){Ke(ie),Ke(ae),Ke(oe);let Ee=i.length/3,ge=_.generateTopUV(n,i,Ee-3,Ee-2,Ee-1);Qe(ge[0]),Qe(ge[1]),Qe(ge[2])}function Ne(ie,ae,oe,Ee){Ke(ie),Ke(ae),Ke(Ee),Ke(ae),Ke(oe),Ke(Ee);let ge=i.length/3,He=_.generateSideWallUV(n,i,ge-6,ge-3,ge-2,ge-1);Qe(He[0]),Qe(He[1]),Qe(He[3]),Qe(He[1]),Qe(He[2]),Qe(He[3])}function Ke(ie){i.push(c[ie*3+0]),i.push(c[ie*3+1]),i.push(c[ie*3+2])}function Qe(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ax(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new zl[i.type]().fromJSON(i)),new s(n,e.options)}},Tx={generateTopUV:function(s,e,t,n,i){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[i*3],h=e[i*3+1];return[new ce(r,a),new ce(o,c),new ce(l,h)]},generateSideWallUV:function(s,e,t,n,i,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[i*3],d=e[i*3+1],p=e[i*3+2],x=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new ce(a,1-c),new ce(l,1-f),new ce(u,1-p),new ce(x,1-m)]:[new ce(o,1-c),new ce(h,1-f),new ce(d,1-p),new ce(g,1-m)]}};function Ax(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var qs=class s extends kr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},so=class s extends vt{constructor(e=[new ce(0,-.5),new ce(.5,0),new ce(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=at(i,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,f=new P,u=new ce,d=new P,p=new P,x=new P,g=0,m=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:g=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,d.x=m*1,d.y=-g,d.z=m*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:x.normalize(),c.push(x.x,x.y,x.z);break;default:g=e[_+1].x-e[_].x,m=e[_+1].y-e[_].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(p)}for(let _=0;_<=t;_++){let y=n+_*h*i,M=Math.sin(y),w=Math.cos(y);for(let b=0;b<=e.length-1;b++){f.x=e[b].x*M,f.y=e[b].y,f.z=e[b].x*w,a.push(f.x,f.y,f.z),u.x=_/t,u.y=b/(e.length-1),o.push(u.x,u.y);let v=c[3*b+0]*M,S=c[3*b+1],I=c[3*b+0]*w;l.push(v,S,I)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let M=y+_*e.length,w=M,b=M+e.length,v=M+e.length+1,S=M+1;r.push(w,b,S),r.push(v,S,b)}this.setIndex(r),this.setAttribute("position",new Ye(a,3)),this.setAttribute("uv",new Ye(o,2)),this.setAttribute("normal",new Ye(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},Ys=class s extends kr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},kt=class s extends vt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,f=e/o,u=t/c,d=[],p=[],x=[],g=[];for(let m=0;m<h;m++){let _=m*u-a;for(let y=0;y<l;y++){let M=y*f-r;p.push(M,-_,0),x.push(0,0,1),g.push(y/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<o;_++){let y=_+l*m,M=_+l*(m+1),w=_+1+l*(m+1),b=_+1+l*m;d.push(y,M,b),d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new Ye(p,3)),this.setAttribute("normal",new Ye(x,3)),this.setAttribute("uv",new Ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},ro=class s extends vt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],c=[],l=[],h=[],f=e,u=(t-e)/i,d=new P,p=new ce;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let m=r+g/n*a;d.x=f*Math.cos(m),d.y=f*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,h.push(p.x,p.y)}f+=u}for(let x=0;x<i;x++){let g=x*(n+1);for(let m=0;m<n;m++){let _=m+g,y=_,M=_+n+1,w=_+n+2,b=_+1;o.push(y,M,b),o.push(M,w,b)}}this.setIndex(o),this.setAttribute("position",new Ye(c,3)),this.setAttribute("normal",new Ye(l,3)),this.setAttribute("uv",new Ye(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var hi=class s extends vt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new P,u=new P,d=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let _=[],y=m/n,M=a+y*o,w=e*Math.cos(M),b=Math.sqrt(e*e-w*w),v=0;m===0&&a===0?v=.5/t:m===n&&c===Math.PI&&(v=-.5/t);for(let S=0;S<=t;S++){let I=S/t,C=i+I*r;f.x=-b*Math.cos(C),f.y=w,f.z=b*Math.sin(C),p.push(f.x,f.y,f.z),u.copy(f).normalize(),x.push(u.x,u.y,u.z),g.push(I+v,1-y),_.push(l++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<t;_++){let y=h[m][_+1],M=h[m][_],w=h[m+1][_],b=h[m+1][_+1];(m!==0||a>0)&&d.push(y,M,b),(m!==n-1||c<Math.PI)&&d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new Ye(p,3)),this.setAttribute("normal",new Ye(x,3)),this.setAttribute("uv",new Ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Wn=class s extends vt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],h=[],f=[],u=new P,d=new P,p=new P;for(let x=0;x<=n;x++){let g=a+x/n*o;for(let m=0;m<=i;m++){let _=m/i*r;d.x=(e+t*Math.cos(g))*Math.cos(_),d.y=(e+t*Math.cos(g))*Math.sin(_),d.z=t*Math.sin(g),l.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),p.subVectors(d,u).normalize(),h.push(p.x,p.y,p.z),f.push(m/i),f.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){let m=(i+1)*x+g-1,_=(i+1)*(x-1)+g-1,y=(i+1)*(x-1)+g,M=(i+1)*x+g;c.push(m,_,M),c.push(_,y,M)}this.setIndex(c),this.setAttribute("position",new Ye(l,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Zs=class s extends vt{constructor(e=new ja(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,c=new P,l=new ce,h=new P,f=[],u=[],d=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Ye(f,3)),this.setAttribute("normal",new Ye(u,3)),this.setAttribute("uv",new Ye(d,2));function x(){for(let y=0;y<t;y++)g(y);g(r===!1?t:0),_(),m()}function g(y){h=e.getPointAt(y/t,h);let M=a.normals[y],w=a.binormals[y];for(let b=0;b<=i;b++){let v=b/i*Math.PI*2,S=Math.sin(v),I=-Math.cos(v);c.x=I*M.x+S*w.x,c.y=I*M.y+S*w.y,c.z=I*M.z+S*w.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,f.push(o.x,o.y,o.z)}}function m(){for(let y=1;y<=t;y++)for(let M=1;M<=i;M++){let w=(i+1)*(y-1)+(M-1),b=(i+1)*y+(M-1),v=(i+1)*y+M,S=(i+1)*(y-1)+M;p.push(w,b,S),p.push(b,v,S)}}function _(){for(let y=0;y<=t;y++)for(let M=0;M<=i;M++)l.x=y/t,l.y=M/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new zl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function nr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(vp(i))i.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(vp(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function bn(s){let e={};for(let t=0;t<s.length;t++){let n=nr(s[t]);for(let i in n)e[i]=n[i]}return e}function vp(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Rx(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function zu(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}var g0={clone:nr,merge:bn},Cx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ix=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ft=class extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cx,this.fragmentShader=Ix,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=nr(e.uniforms),this.uniformsGroups=Rx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Te().setHex(i.value);break;case"v2":this.uniforms[n].value=new ce().fromArray(i.value);break;case"v3":this.uniforms[n].value=new P().fromArray(i.value);break;case"v4":this.uniforms[n].value=new xt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new $e().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ve().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Hl=class extends Ft{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Vi=class extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qr,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cn=class extends Vi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return at(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Bs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Bs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ot=class extends yn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Te(16777215),this.specular=new Te(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qr,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=go,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ao=class extends yn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qr,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=go,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Gl=class extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vl=class extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function us(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Ra(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function Px(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function yp(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Lx(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Mi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Wl=class extends Mi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kh,endingEnd:Kh}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Jh:r=e,o=2*t-n;break;case $h:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Jh:a=e,c=2*n-t;break;case $h:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-t)/(i-t),x=p*p,g=x*p,m=-u*g+2*u*x-u*p,_=(1+u)*g+(-1.5-2*u)*x+(-.5+u)*p+1,y=(-1-d)*g+(1.5+d)*x+.5*p,M=d*g-d*x;for(let w=0;w!==o;++w)r[w]=m*a[h+w]+_*a[l+w]+y*a[c+w]+M*a[f+w];return r}},Xl=class extends Mi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),f=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*f+a[c+u]*h;return r}},ql=class extends Mi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Yl=class extends Mi{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(n-t)/(i-t),x=1-p;for(let g=0;g!==o;++g)r[g]=a[l+g]*x+a[c+g]*p;return r}let u=o*2,d=e-1;for(let p=0;p!==o;++p){let x=a[l+p],g=a[c+p],m=d*u+p*2,_=f[m],y=f[m+1],M=e*u+p*2,w=h[M],b=h[M+1],v=Dx(n,t,_,w,i);r[p]=x0(v,x,y,b,g)}return r}};function x0(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function Nx(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Dx(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){let o=x0(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;let c=Nx(r,e,t,n,i);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Dn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=us(t,this.TimeBufferType),this.values=us(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:us(e.times,Array),values:us(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Ra(e.settings)&&(n.settings={inTangents:us(e.settings.inTangents,Array),outTangents:us(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ql(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case zs:t=this.InterpolantFactoryMethodDiscrete;break;case ks:t=this.InterpolantFactoryMethodLinear;break;case Ml:t=this.InterpolantFactoryMethodSmooth;break;case Zh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ze("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zs;case this.InterpolantFactoryMethodLinear:return ks;case this.InterpolantFactoryMethodSmooth:return Ml;case this.InterpolantFactoryMethodBezier:return Zh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;Ra(this.settings)&&(Mp(this.settings.inTangents,e),Mp(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Ra(this.settings)&&(bp(this.settings.inTangents,e),bp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Je("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Je("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&vg(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){Je("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ml,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let f=o*n,u=f-n,d=f+n;for(let p=0;p!==n;++p){let x=t[f+p];if(x!==t[u+p]||x!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[f+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Ra(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Mp(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]+=e}function bp(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}Dn.prototype.ValueTypeName="";Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=ks;var Wi=class extends Dn{constructor(e,t,n){super(e,t,n)}};Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=zs;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var oo=class extends Dn{constructor(e,t,n,i){super(e,t,n,i)}};oo.prototype.ValueTypeName="color";var Xi=class extends Dn{constructor(e,t,n,i){super(e,t,n,i)}};Xi.prototype.ValueTypeName="number";var Zl=class extends Mi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)an.slerpFlat(r,0,a,l-o,a,l,c);return r}},qi=class extends Dn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Zl(this.times,this.values,this.getValueSize(),e)}};qi.prototype.ValueTypeName="quaternion";qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Yi=class extends Dn{constructor(e,t,n){super(e,t,n)}};Yi.prototype.ValueTypeName="string";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=zs;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;var ms=class extends Dn{constructor(e,t,n,i){super(e,t,n,i)}};ms.prototype.ValueTypeName="vector";var lo=class{constructor(e="",t=-1,n=[],i=jp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=di(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Fx(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Dn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=Px(c);c=yp(c,1,h),l=yp(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Xi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let f=h[1],u=i[f];u||(i[f]=u=[]),u.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Ux(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Xi;case"vector":case"vector2":case"vector3":case"vector4":return ms;case"color":return oo;case"quaternion":return qi;case"bool":case"boolean":return Wi;case"string":return Yi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Fx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Ux(s.type);if(s.times===void 0){let n=[],i=[];Lx(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Ra(s.settings)&&(t.settings={inTangents:us(s.settings.inTangents,Float32Array),outTangents:us(s.settings.outTangents,Float32Array)}),t}var _i={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Sp(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Sp(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Sp(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Kl=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let d=l[f],p=l[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},_0=new Kl,bi=class{constructor(e){this.manager=e!==void 0?e:_0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Bi={},nu=class extends Error{constructor(e,t){super(e),this.response=t}},Wr=class extends bi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=_i.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Bi[e]!==void 0){Bi[e].push({onLoad:t,onProgress:n,onError:i});return}Bi[e]=[],Bi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&ze("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Bi[e],f=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=u?parseInt(u):0,p=d!==0,x=0,g=new ReadableStream({start(m){_();function _(){f.read().then(({done:y,value:M})=>{if(y)m.close();else{x+=M.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:d});for(let b=0,v=h.length;b<v;b++){let S=h[b];S.onProgress&&S.onProgress(w)}m.enqueue(M),_()}},y=>{m.error(y)})}}});return new Response(g)}else throw new nu(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),u=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{_i.add(`file:${e}`,l);let h=Bi[e];delete Bi[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Bi[e];if(h===void 0)throw this.manager.itemError(e),l;delete Bi[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Sr=new WeakMap,Jl=class extends bi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=_i.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let f=Sr.get(a);f===void 0&&(f=[],Sr.set(a,f)),f.push({onLoad:t,onError:i})}return a}let o=Ir("img");function c(){h(),t&&t(this);let f=Sr.get(this)||[];for(let u=0;u<f.length;u++){let d=f[u];d.onLoad&&d.onLoad(this)}Sr.delete(this),r.manager.itemEnd(e)}function l(f){h(),i&&i(f),_i.remove(`image:${e}`);let u=Sr.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onError&&p.onError(f)}Sr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),_i.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var Zi=class extends bi{constructor(e){super(e)}load(e,t,n,i){let r=new on,a=new Jl(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Ks=class extends Pt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},co=class extends Ks{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Xh=new Ve,Ep=new P,wp=new P,Xr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=Fn,this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ds,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ep.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ep),wp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Xh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Xh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,c=i?i.x/r.x:0,l=i?i.y/r.y:0;e.coordinateSystem===Cr||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Xh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},vl=new P,yl=new an,xi=new P,ho=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(vl,yl,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vl,yl,xi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(vl,yl,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vl,yl,xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},hs=new P,Tp=new ce,Ap=new ce,rn=class extends ho{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(Ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hs.x,hs.y).multiplyScalar(-e/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hs.x,hs.y).multiplyScalar(-e/hs.z)}getViewSize(e,t){return this.getViewBounds(e,Tp,Ap),t.subVectors(Ap,Tp)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ca*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},iu=class extends Xr{constructor(){super(new rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Hs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},uo=class extends Ks{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new iu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},su=class extends Xr{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}},fo=class extends Ks{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new su}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Js=class extends ho{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ru=class extends Xr{constructor(){super(new Js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},gs=class extends Ks{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new ru}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ki=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},xs=class extends vt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var qh=new WeakMap,po=class extends bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ze("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ze("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=_i.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{qh.has(a)===!0?(i&&i(qh.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return _i.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),qh.set(c,l),_i.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});_i.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Er=-90,wr=1,qr=class extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new rn(Er,wr,e,t);i.layers=this.layers,this.add(i);let r=new rn(Er,wr,e,t);r.layers=this.layers,this.add(r);let a=new rn(Er,wr,e,t);a.layers=this.layers,this.add(a);let o=new rn(Er,wr,e,t);o.layers=this.layers,this.add(o);let c=new rn(Er,wr,e,t);c.layers=this.layers,this.add(c);let l=new rn(Er,wr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},$l=class extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var ku="\\[\\]\\.:\\/",Ox=new RegExp("["+ku+"]","g"),Hu="[^"+ku+"]",Bx="[^"+ku.replace("\\.","")+"]",zx=/((?:WC+[\/:])*)/.source.replace("WC",Hu),kx=/(WCOD+)?/.source.replace("WCOD",Bx),Hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hu),Gx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hu),Vx=new RegExp("^"+zx+kx+Hx+Gx+"$"),Wx=["material","materials","bones","map"],au=class{constructor(e,t,n){let i=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ox,"")}static parseTrackName(e){let t=Vx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Wx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=au;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var tS=new Float32Array(1);var Yu=class Yu{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};Yu.prototype.isMatrix2=!0;var ou=Yu;function Gu(s,e,t,n){let i=Xx(n);switch(t){case Tu:return s*e;case rc:return s*e/i.components*i.byteLength;case ac:return s*e/i.components*i.byteLength;case _s:return s*e*2/i.components*i.byteLength;case oc:return s*e*2/i.components*i.byteLength;case Au:return s*e*3/i.components*i.byteLength;case jn:return s*e*4/i.components*i.byteLength;case lc:return s*e*4/i.components*i.byteLength;case xo:case _o:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case vo:case yo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case hc:case fc:return Math.max(s,16)*Math.max(e,8)/4;case cc:case uc:return Math.max(s,8)*Math.max(e,8)/2;case dc:case pc:case gc:case xc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case mc:case Mo:case _c:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case vc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Mc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case bc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ec:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case wc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Tc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ac:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ic:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Pc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Lc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Nc:case Dc:case Uc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Fc:case Oc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case bo:case Bc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xx(s){switch(s){case Fn:case bu:return{byteLength:1,components:1};case $r:case Su:case fi:return{byteLength:2,components:1};case ic:case sc:return{byteLength:2,components:4};case ui:case nc:case Xn:return{byteLength:4,components:1};case Eu:case wu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function k0(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Yx(s){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,f=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let h=c.array,f=c.updateRanges;if(s.bindBuffer(l,o),f.length===0)s.bufferSubData(l,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],x=f[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,f[u]=x)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let x=f[d];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Zx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kx=`#ifdef USE_ALPHAHASH
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
#endif`,Jx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$x=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e1=`#ifdef USE_AOMAP
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
#endif`,t1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n1=`#ifdef USE_BATCHING
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
#endif`,i1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,o1=`#ifdef USE_IRIDESCENCE
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
#endif`,l1=`#ifdef USE_BUMPMAP
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
#endif`,c1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,h1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,f1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,d1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,p1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,m1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,g1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,x1=`#define PI 3.141592653589793
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
} // validated`,_1=`vec3 transformedNormal = objectNormal;
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
#endif`,v1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,y1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,M1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,b1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,S1="gl_FragColor = linearToOutputTexel( gl_FragColor );",E1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,w1=`#ifdef USE_ENVMAP
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
#endif`,T1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,A1=`#ifdef USE_ENVMAP
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
#endif`,R1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,C1=`#ifdef USE_ENVMAP
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
#endif`,I1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,L1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,D1=`#ifdef USE_GRADIENTMAP
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
}`,U1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,F1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,O1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,z1=`#ifdef USE_ENVMAP
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
#endif`,k1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,H1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,G1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,V1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,W1=`PhysicalMaterial material;
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
#endif`,X1=`uniform sampler2D dfgLUT;
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
}`,q1=`
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
#endif`,Y1=`#if defined( RE_IndirectDiffuse )
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
#endif`,Z1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,K1=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,J1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,e_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,t_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,i_=`#if defined( USE_POINTS_UV )
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
#endif`,s_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,r_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,a_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,o_=`#if defined( USE_MORPHCOLORS )
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
#endif`,l_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c_=`#ifdef USE_MORPHTARGETS
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
#endif`,h_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,f_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,d_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,g_=`#ifdef USE_NORMALMAP
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
#endif`,x_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,__=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,v_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,M_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,b_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,S_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,w_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,R_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,C_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,I_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,P_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,L_=`float getShadowMask() {
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
}`,N_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,D_=`#ifdef USE_SKINNING
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
#endif`,U_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,F_=`#ifdef USE_SKINNING
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
#endif`,O_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,B_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,k_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,H_=`#ifdef USE_TRANSMISSION
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
#endif`,G_=`#ifdef USE_TRANSMISSION
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
#endif`,V_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Z_=`uniform sampler2D t2D;
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
}`,K_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J_=`uniform float backgroundBlurriness;
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
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q_=`#include <common>
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
}`,ev=`#if DEPTH_PACKING == 3200
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
}`,tv=`#define DISTANCE
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
}`,nv=`#define DISTANCE
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
}`,iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rv=`uniform float scale;
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
}`,av=`uniform vec3 diffuse;
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
}`,ov=`#include <common>
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
}`,lv=`uniform vec3 diffuse;
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
}`,cv=`#define LAMBERT
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
}`,hv=`#define LAMBERT
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
}`,uv=`#define MATCAP
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
}`,fv=`#define MATCAP
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
}`,dv=`#define NORMAL
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
}`,pv=`#define NORMAL
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
}`,mv=`#define PHONG
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
}`,gv=`#define PHONG
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
}`,xv=`#define STANDARD
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
}`,_v=`#define STANDARD
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
}`,vv=`#define TOON
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
}`,yv=`#define TOON
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
}`,Mv=`uniform float size;
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
}`,bv=`uniform vec3 diffuse;
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
}`,Sv=`#include <common>
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
}`,Ev=`uniform vec3 color;
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
}`,wv=`uniform float rotation;
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
}`,Tv=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Zx,alphahash_pars_fragment:Kx,alphamap_fragment:Jx,alphamap_pars_fragment:$x,alphatest_fragment:jx,alphatest_pars_fragment:Qx,aomap_fragment:e1,aomap_pars_fragment:t1,batching_pars_vertex:n1,batching_vertex:i1,begin_vertex:s1,beginnormal_vertex:r1,bsdfs:a1,iridescence_fragment:o1,bumpmap_pars_fragment:l1,clipping_planes_fragment:c1,clipping_planes_pars_fragment:h1,clipping_planes_pars_vertex:u1,clipping_planes_vertex:f1,color_fragment:d1,color_pars_fragment:p1,color_pars_vertex:m1,color_vertex:g1,common:x1,defaultnormal_vertex:_1,displacementmap_pars_vertex:v1,displacementmap_vertex:y1,emissivemap_fragment:M1,emissivemap_pars_fragment:b1,colorspace_fragment:S1,colorspace_pars_fragment:E1,envmap_fragment:w1,envmap_common_pars_fragment:T1,envmap_pars_fragment:A1,envmap_pars_vertex:R1,envmap_physical_pars_fragment:z1,envmap_vertex:C1,fog_vertex:I1,fog_pars_vertex:P1,fog_fragment:L1,fog_pars_fragment:N1,gradientmap_pars_fragment:D1,lightmap_pars_fragment:U1,lights_lambert_fragment:F1,lights_lambert_pars_fragment:O1,lights_pars_begin:B1,lights_toon_fragment:k1,lights_toon_pars_fragment:H1,lights_phong_fragment:G1,lights_phong_pars_fragment:V1,lights_physical_fragment:W1,lights_physical_pars_fragment:X1,lights_fragment_begin:q1,lights_fragment_maps:Y1,lights_fragment_end:Z1,lightprobes_pars_fragment:K1,logdepthbuf_fragment:J1,logdepthbuf_pars_fragment:$1,logdepthbuf_pars_vertex:j1,logdepthbuf_vertex:Q1,map_fragment:e_,map_pars_fragment:t_,map_particle_fragment:n_,map_particle_pars_fragment:i_,metalnessmap_fragment:s_,metalnessmap_pars_fragment:r_,morphinstance_vertex:a_,morphcolor_vertex:o_,morphnormal_vertex:l_,morphtarget_pars_vertex:c_,morphtarget_vertex:h_,normal_fragment_begin:u_,normal_fragment_maps:f_,normal_pars_fragment:d_,normal_pars_vertex:p_,normal_vertex:m_,normalmap_pars_fragment:g_,clearcoat_normal_fragment_begin:x_,clearcoat_normal_fragment_maps:__,clearcoat_pars_fragment:v_,iridescence_pars_fragment:y_,opaque_fragment:M_,packing:b_,premultiplied_alpha_fragment:S_,project_vertex:E_,dithering_fragment:w_,dithering_pars_fragment:T_,roughnessmap_fragment:A_,roughnessmap_pars_fragment:R_,shadowmap_pars_fragment:C_,shadowmap_pars_vertex:I_,shadowmap_vertex:P_,shadowmask_pars_fragment:L_,skinbase_vertex:N_,skinning_pars_vertex:D_,skinning_vertex:U_,skinnormal_vertex:F_,specularmap_fragment:O_,specularmap_pars_fragment:B_,tonemapping_fragment:z_,tonemapping_pars_fragment:k_,transmission_fragment:H_,transmission_pars_fragment:G_,uv_pars_fragment:V_,uv_pars_vertex:W_,uv_vertex:X_,worldpos_vertex:q_,background_vert:Y_,background_frag:Z_,backgroundCube_vert:K_,backgroundCube_frag:J_,cube_vert:$_,cube_frag:j_,depth_vert:Q_,depth_frag:ev,distance_vert:tv,distance_frag:nv,equirect_vert:iv,equirect_frag:sv,linedashed_vert:rv,linedashed_frag:av,meshbasic_vert:ov,meshbasic_frag:lv,meshlambert_vert:cv,meshlambert_frag:hv,meshmatcap_vert:uv,meshmatcap_frag:fv,meshnormal_vert:dv,meshnormal_frag:pv,meshphong_vert:mv,meshphong_frag:gv,meshphysical_vert:xv,meshphysical_frag:_v,meshtoon_vert:vv,meshtoon_frag:yv,points_vert:Mv,points_frag:bv,shadow_vert:Sv,shadow_frag:Ev,sprite_vert:wv,sprite_frag:Tv},Ae={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},wi={basic:{uniforms:bn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:bn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Te(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:bn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:bn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:bn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Te(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:bn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:bn([Ae.points,Ae.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:bn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:bn([Ae.common,Ae.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:bn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:bn([Ae.sprite,Ae.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:bn([Ae.common,Ae.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:bn([Ae.lights,Ae.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};wi.physical={uniforms:bn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var kc={r:0,b:0,g:0},Av=new Ve,H0=new $e;H0.set(-1,0,0,0,1,0,0,0,1);function Rv(s,e,t,n,i,r){let a=new Te(0),o=i===!0?0:1,c,l,h=null,f=0,u=null;function d(_){let y=_.isScene===!0?_.background:null;if(y&&y.isTexture){let M=_.backgroundBlurriness>0;y=e.get(y,M)}return y}function p(_){let y=!1,M=d(_);M===null?g(a,o):M&&M.isColor&&(g(M,1),y=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(_,y){let M=d(y);M&&M.isCubeTexture?(l===void 0&&(l=new je(new Nn(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:nr(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,b,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Av.makeRotationFromEuler(y.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(H0),l.material.toneMapped=lt.getTransfer(M.colorSpace)!==Tt,(h!==M||f!==M.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,u=s.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new je(new kt(2,2),new Ft({name:"BackgroundMaterial",uniforms:nr(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=lt.getTransfer(M.colorSpace)!==Tt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,u=s.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function g(_,y){_.getRGB(kc,zu(s)),t.buffers.color.setClear(kc.r,kc.g,kc.b,y,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),o=y,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,g(a,o)},render:p,addToRenderList:x,dispose:m}}function Cv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(N,z,X,D,q){let G=!1,L=f(N,D,X,z);r!==L&&(r=L,l(r.object)),G=d(N,D,X,q),G&&p(N,D,X,q),q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,M(N,z,X,D),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return s.createVertexArray()}function l(N){return s.bindVertexArray(N)}function h(N){return s.deleteVertexArray(N)}function f(N,z,X,D){let q=D.wireframe===!0,G=n[z.id];G===void 0&&(G={},n[z.id]=G);let L=N.isInstancedMesh===!0?N.id:0,K=G[L];K===void 0&&(K={},G[L]=K);let A=K[X.id];A===void 0&&(A={},K[X.id]=A);let V=A[q];return V===void 0&&(V=u(c()),A[q]=V),V}function u(N){let z=[],X=[],D=[];for(let q=0;q<t;q++)z[q]=0,X[q]=0,D[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:X,attributeDivisors:D,object:N,attributes:{},index:null}}function d(N,z,X,D){let q=r.attributes,G=z.attributes,L=0,K=X.getAttributes();for(let A in K)if(K[A].location>=0){let H=q[A],W=G[A];if(W===void 0&&(A==="instanceMatrix"&&N.instanceMatrix&&(W=N.instanceMatrix),A==="instanceColor"&&N.instanceColor&&(W=N.instanceColor)),H===void 0||H.attribute!==W||W&&H.data!==W.data)return!0;L++}return r.attributesNum!==L||r.index!==D}function p(N,z,X,D){let q={},G=z.attributes,L=0,K=X.getAttributes();for(let A in K)if(K[A].location>=0){let H=G[A];H===void 0&&(A==="instanceMatrix"&&N.instanceMatrix&&(H=N.instanceMatrix),A==="instanceColor"&&N.instanceColor&&(H=N.instanceColor));let W={};W.attribute=H,H&&H.data&&(W.data=H.data),q[A]=W,L++}r.attributes=q,r.attributesNum=L,r.index=D}function x(){let N=r.newAttributes;for(let z=0,X=N.length;z<X;z++)N[z]=0}function g(N){m(N,0)}function m(N,z){let X=r.newAttributes,D=r.enabledAttributes,q=r.attributeDivisors;X[N]=1,D[N]===0&&(s.enableVertexAttribArray(N),D[N]=1),q[N]!==z&&(s.vertexAttribDivisor(N,z),q[N]=z)}function _(){let N=r.newAttributes,z=r.enabledAttributes;for(let X=0,D=z.length;X<D;X++)z[X]!==N[X]&&(s.disableVertexAttribArray(X),z[X]=0)}function y(N,z,X,D,q,G,L){L===!0?s.vertexAttribIPointer(N,z,X,q,G):s.vertexAttribPointer(N,z,X,D,q,G)}function M(N,z,X,D){x();let q=D.attributes,G=X.getAttributes(),L=z.defaultAttributeValues;for(let K in G){let A=G[K];if(A.location>=0){let V=q[K];if(V===void 0&&(K==="instanceMatrix"&&N.instanceMatrix&&(V=N.instanceMatrix),K==="instanceColor"&&N.instanceColor&&(V=N.instanceColor)),V!==void 0){let H=V.normalized,W=V.itemSize,k=e.get(V);if(k===void 0)continue;let O=k.buffer,re=k.type,pe=k.bytesPerElement,Ie=re===s.INT||re===s.UNSIGNED_INT||V.gpuType===nc;if(V.isInterleavedBufferAttribute){let me=V.data,Oe=me.isInterleavedBuffer===!0?me.stride:me.itemSize,ft=V.offset;if(me.isInstancedInterleavedBuffer||me.isInstancedBufferAttribute){for(let Ne=0;Ne<A.locationSize;Ne++)m(A.location+Ne,me.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Ne=0;Ne<A.locationSize;Ne++)g(A.location+Ne);s.bindBuffer(s.ARRAY_BUFFER,O);for(let Ne=0;Ne<A.locationSize;Ne++)y(A.location+Ne,W/A.locationSize,re,H,Oe*pe,(ft+W/A.locationSize*Ne)*pe,Ie)}else{if(V.isInstancedBufferAttribute){for(let me=0;me<A.locationSize;me++)m(A.location+me,V.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let me=0;me<A.locationSize;me++)g(A.location+me);s.bindBuffer(s.ARRAY_BUFFER,O);for(let me=0;me<A.locationSize;me++)y(A.location+me,W/A.locationSize,re,H,W*pe,W/A.locationSize*me*pe,Ie)}}else if(L!==void 0){let H=L[K];if(H!==void 0)switch(H.length){case 2:s.vertexAttrib2fv(A.location,H);break;case 3:s.vertexAttrib3fv(A.location,H);break;case 4:s.vertexAttrib4fv(A.location,H);break;default:s.vertexAttrib1fv(A.location,H)}}}}_()}function w(){I();for(let N in n){let z=n[N];for(let X in z){let D=z[X];for(let q in D){let G=D[q];for(let L in G)h(G[L].object),delete G[L];delete D[q]}}delete n[N]}}function b(N){if(n[N.id]===void 0)return;let z=n[N.id];for(let X in z){let D=z[X];for(let q in D){let G=D[q];for(let L in G)h(G[L].object),delete G[L];delete D[q]}}delete n[N.id]}function v(N){for(let z in n){let X=n[z];for(let D in X){let q=X[D];if(q[N.id]===void 0)continue;let G=q[N.id];for(let L in G)h(G[L].object),delete G[L];delete q[N.id]}}}function S(N){for(let z in n){let X=n[z],D=N.isInstancedMesh===!0?N.id:0,q=X[D];if(q!==void 0){for(let G in q){let L=q[G];for(let K in L)h(L[K].object),delete L[K];delete q[G]}delete X[D],Object.keys(X).length===0&&delete n[z]}}}function I(){C(),a=!0,r!==i&&(r=i,l(r.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:S,releaseStatesOfProgram:v,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function Iv(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Pv(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let v=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(v){return!(v!==jn&&n.convert(v)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){let S=v===fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==Fn&&v!==Xn&&!S&&n.convert(v)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(v){if(v==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(ze("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&ze("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),b=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:M,maxSamples:w,samples:b}}function Lv(s){let e=this,t=null,n=0,i=!1,r=!1,a=new ci,o=new $e,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,m=s.get(f);if(!i||p===null||p.length===0||r&&!g)r?h(null):l();else{let _=r?0:n,y=_*4,M=m.clippingState||null;c.value=M,M=h(p,u,y,d);for(let w=0;w!==y;++w)M[w]=t[w];m.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,p){let x=f!==null?f.length:0,g=null;if(x!==0){if(g=c.value,p!==!0||g===null){let m=d+x*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,M=d;y!==x;++y,M+=4)a.copy(f[y]).applyMatrix4(_,o),a.normal.toArray(g,M),g[M+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var To=class extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Xa(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Nn(5,5,5),r=new Ft({name:"CubemapFromEquirect",uniforms:nr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:In,blending:$s});r.uniforms.tEquirect.value=t;let a=new je(i,r),o=t.minFilter;return t.minFilter===Un&&(t.minFilter=Zt),new qr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},v0=256,Nv=3,Dv=20,G0=256,V0=16,Uv=3,Fv=new P,Ov=new Te,Gc=class s{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new qr(1,10,null),this._boxMesh=new je(new Nn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=Fv}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let f=c.autoClear,u=c.autoClearColor,d=c.autoClearDepth,p=c.autoClearStencil,x=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(e.background=c.getClearColor(Ov));let g=new qr(n,i,h);return g.position.copy(o),g.update(c,e),c.autoClear=f,c.autoClearColor=u,c.autoClearDepth=d,c.autoClearStencil=p,e.background=x,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=b0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=M0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(v0,Uu(e))}_fromTexture(e,t){e.mapping===Qs||e.mapping===Kr?this._setSize(e.image.length===0?v0:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=y0(e,!1,!1),n=Math.log2(e)-Nv;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=y0(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Qs||e.mapping===Kr?(this._cubemapMaterial===null&&(this._cubemapMaterial=b0()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=M0()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Bv(),this._integrationMaterial=zv());let t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/V0);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-Uv)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(G0*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=kv());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(r,0,n)}};function y0(s,e,t){return new To(s,{minFilter:Un,generateMipmaps:e,type:fi,colorSpace:Rn,depthBuffer:t})}function Ao(s,e,t){return new Ft({name:s,uniforms:e,vertexShader:ot.cube_vert,fragmentShader:t,side:In,blending:$s,depthTest:!1,depthWrite:!1})}function Bv(){return Ao("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${G0}u

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
	`)}function zv(){return Ao("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:V0}},`

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
	`)}function kv(){return Ao("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Dv}
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
	`)}function M0(){return Ao("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function b0(){return Ao("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Hv(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Ql||d===ec)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let x=new To(p.height);return x.fromEquirectangularTexture(s,u),e.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,p=d===Ql||d===ec,x=d===Qs||d===Kr;if(p||x){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Gc(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let _=u.image;return p&&_&&_.height>0||x&&_&&c(_)?(n===null&&(n=new Gc(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===Ql?u.mapping=Qs:d===ec&&(u.mapping=Kr),u}function c(u){let d=0,p=6;for(let x=0;x<p;x++)u[x]!==void 0&&d++;return d===p}function l(u){let d=u.target;d.removeEventListener("dispose",l);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function Gv(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Bs("WebGLRenderer: "+n+" extension not supported."),i}}}function Vv(s,e,t,n){let i={},r=new WeakMap,a=new FinalizationRegistry(p=>delete i[p]);function o(p){c(p.target)}function c(p){p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete i[p.id],a.unregister(p);let x=r.get(p);x&&(e.remove(x),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function l(p,x){return i[x.id]!==void 0||(x.addEventListener("dispose",o),i[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function h(p){let x=p.attributes;for(let g in x)e.update(x[g],s.ARRAY_BUFFER)}function f(p){let x=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let _=x!==null?x.array.length:g.array.length/3-1,y=g.count>=65535?za:Ba,M=new y(Math.ceil(_/3)*6,1),w=M.array;if(x!==null){let v=x.array;m=x.version;for(let S=0,I=0;S<_;S+=3){let C=v[S+0],N=v[S+1],z=v[S+2];w[I++]=C,w[I++]=N,w[I++]=N,w[I++]=z,w[I++]=z,w[I++]=C}}else{m=g.version;for(let v=0,S=0;v<_;v+=3){let I=v+0,C=v+1,N=v+2;w[S++]=I,w[S++]=C,w[S++]=C,w[S++]=N,w[S++]=N,w[S++]=I}}M.version=m;let b=r.get(p);b&&e.remove(b),r.set(p,M)}function u(p){let x=r.get(p);if(x){let g=p.index;g!==null&&x.version<g.version&&f(p)}else f(p);return r.get(p)}function d(){for(let p in i){let x=i[p].deref();x!==void 0&&c(x)}}return{get:l,update:h,getWireframeAttribute:u,dispose:d}}function Wv(s,e,t){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){s.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let x=0;for(let g=0;g<d;g++)x+=u[g];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Xv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function qv(s,e,t){let n=new WeakMap,i=new xt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let I=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",I)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),x===!0&&(y=3);let M=o.attributes.position.count*y,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let b=new Float32Array(M*w*4*f),v=new Ua(b,M,w,f);v.type=Xn,v.needsUpdate=!0;let S=y*4;for(let C=0;C<f;C++){let N=g[C],z=m[C],X=_[C],D=M*w*4*C;for(let q=0;q<N.count;q++){let G=q*S;d===!0&&(i.fromBufferAttribute(N,q),b[D+G+0]=i.x,b[D+G+1]=i.y,b[D+G+2]=i.z,b[D+G+3]=0),p===!0&&(i.fromBufferAttribute(z,q),b[D+G+4]=i.x,b[D+G+5]=i.y,b[D+G+6]=i.z,b[D+G+7]=0),x===!0&&(i.fromBufferAttribute(X,q),b[D+G+8]=i.x,b[D+G+9]=i.y,b[D+G+10]=i.z,b[D+G+11]=X.itemSize===4?i.w:1)}}u={count:f,texture:v,size:new ce(M,w)},n.set(o,u),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let p=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(s,"morphTargetBaseInfluence",p),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Yv(s,e,t,n,i){let r=new WeakMap;function a(l){let h=i.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Zv={[pu]:"LINEAR_TONE_MAPPING",[mu]:"REINHARD_TONE_MAPPING",[gu]:"CINEON_TONE_MAPPING",[xu]:"ACES_FILMIC_TONE_MAPPING",[vu]:"AGX_TONE_MAPPING",[yu]:"NEUTRAL_TONE_MAPPING",[_u]:"CUSTOM_TONE_MAPPING"};function Kv(s,e,t,n,i,r){let a=new kn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,h=new vt;h.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ye([0,2,0,0,2,0],2));let f=new Hl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new je(h,f),d=new Js(-1,1,1,-1,0,1),p=null,x=null,g=!1,m,_=null,y=[],M=!1;this.setSize=function(w,b){a.setSize(w,b),o!==null&&o.setSize(w,b),c!==null&&c.setSize(w,b);for(let v=0;v<y.length;v++){let S=y[v];S.setSize&&S.setSize(w,b)}},this.setEffects=function(w){y=w,M=y.length>0&&y[0].isRenderPass===!0;let b=a.width,v=a.height;y.length>0&&o===null&&(o=new kn(b,v,{type:fi,depthBuffer:!1,stencilBuffer:!1}),c=new kn(b,v,{type:fi,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&y.some(I=>I.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&l===null&&(l=new Hi(b,v),r===!0&&(l.format=Ji,l.type=tr)),a.dispose(),a.depthTexture=S?l:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let I=0;I<y.length;I++){let C=y[I];C.setSize&&C.setSize(b,v),S&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(l)}},this.begin=function(w,b){if(g||w.toneMapping===Si&&y.length===0)return!1;if(_=b,b!==null){let v=b.width,S=b.height;(a.width!==v||a.height!==S)&&this.setSize(v,S)}return M===!1&&w.setRenderTarget(a),m=w.toneMapping,w.toneMapping=Si,!0},this.hasRenderPass=function(){return M},this.end=function(w,b){w.toneMapping=m,g=!0;let v=a,S=o;for(let I=0;I<y.length;I++){let C=y[I];C.enabled!==!1&&(C.render(w,S,v,b),C.needsSwap!==!1&&(v=S,S=S===o?c:o))}if(p!==w.outputColorSpace||x!==w.toneMapping){p=w.outputColorSpace,x=w.toneMapping,f.defines={},lt.getTransfer(p)===Tt&&(f.defines.SRGB_TRANSFER="");let I=Zv[x];I&&(f.defines[I]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=v.texture,w.setRenderTarget(_),w.render(u,d),_=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),f.dispose()}}var W0=new on,X0=new Hi(1,1),q0=new qa(1),Y0=new Ua,Z0=new Ll,K0=new Xa,S0=[],E0=[],w0=new Float32Array(16),T0=new Float32Array(9),A0=new Float32Array(4);function ta(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=S0[i];if(r===void 0&&(r=new Float32Array(i),S0[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function cn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function hn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Wc(s,e){let t=E0[e];t===void 0&&(t=new Int32Array(e),E0[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Jv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function $v(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;s.uniform2fv(this.addr,e),hn(t,e)}}function jv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(cn(t,e))return;s.uniform3fv(this.addr,e),hn(t,e)}}function Qv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;s.uniform4fv(this.addr,e),hn(t,e)}}function ey(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),hn(t,e)}else{if(cn(t,n))return;A0.set(n),s.uniformMatrix2fv(this.addr,!1,A0),hn(t,n)}}function ty(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),hn(t,e)}else{if(cn(t,n))return;T0.set(n),s.uniformMatrix3fv(this.addr,!1,T0),hn(t,n)}}function ny(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),hn(t,e)}else{if(cn(t,n))return;w0.set(n),s.uniformMatrix4fv(this.addr,!1,w0),hn(t,n)}}function iy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function sy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;s.uniform2iv(this.addr,e),hn(t,e)}}function ry(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;s.uniform3iv(this.addr,e),hn(t,e)}}function ay(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;s.uniform4iv(this.addr,e),hn(t,e)}}function oy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function ly(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;s.uniform2uiv(this.addr,e),hn(t,e)}}function cy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;s.uniform3uiv(this.addr,e),hn(t,e)}}function hy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;s.uniform4uiv(this.addr,e),hn(t,e)}}function Xc(s){return s.version===0&&(s.compareFunction=Pu,s.needsUpdate=!0),s}function uy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Xc(X0):r=W0,t.setTexture2D(e||r,i)}function fy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Z0,i)}function dy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Xc(q0):r=K0,t.setTextureCube(e||r,i)}function py(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Y0,i)}function my(s){switch(s){case 5126:return Jv;case 35664:return $v;case 35665:return jv;case 35666:return Qv;case 35674:return ey;case 35675:return ty;case 35676:return ny;case 5124:case 35670:return iy;case 35667:case 35671:return sy;case 35668:case 35672:return ry;case 35669:case 35673:return ay;case 5125:return oy;case 36294:return ly;case 36295:return cy;case 36296:return hy;case 35678:case 36198:case 36298:case 36306:case 35682:return uy;case 35679:case 36299:case 36307:return fy;case 35680:case 36300:case 36308:case 36293:return dy;case 36289:case 36303:case 36311:case 36292:return py}}function gy(s,e){s.uniform1fv(this.addr,e)}function xy(s,e){let t=ta(e,this.size,2);s.uniform2fv(this.addr,t)}function _y(s,e){let t=ta(e,this.size,3);s.uniform3fv(this.addr,t)}function vy(s,e){let t=ta(e,this.size,4);s.uniform4fv(this.addr,t)}function yy(s,e){let t=ta(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function My(s,e){let t=ta(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function by(s,e){let t=ta(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Sy(s,e){s.uniform1iv(this.addr,e)}function Ey(s,e){s.uniform2iv(this.addr,e)}function wy(s,e){s.uniform3iv(this.addr,e)}function Ty(s,e){s.uniform4iv(this.addr,e)}function Ay(s,e){s.uniform1uiv(this.addr,e)}function Ry(s,e){s.uniform2uiv(this.addr,e)}function Cy(s,e){s.uniform3uiv(this.addr,e)}function Iy(s,e){s.uniform4uiv(this.addr,e)}function Py(s,e,t){let n=this.cache,i=e.length,r=Wc(t,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Xc(X0):a=W0;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function Ly(s,e,t){let n=this.cache,i=e.length,r=Wc(t,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Z0,r[a])}function Ny(s,e,t){let n=this.cache,i=e.length,r=Wc(t,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Xc(q0):a=K0;for(let o=0;o!==i;++o)t.setTextureCube(e[o]||a,r[o])}function Dy(s,e,t){let n=this.cache,i=e.length,r=Wc(t,i);cn(n,r)||(s.uniform1iv(this.addr,r),hn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Y0,r[a])}function Uy(s){switch(s){case 5126:return gy;case 35664:return xy;case 35665:return _y;case 35666:return vy;case 35674:return yy;case 35675:return My;case 35676:return by;case 5124:case 35670:return Sy;case 35667:case 35671:return Ey;case 35668:case 35672:return wy;case 35669:case 35673:return Ty;case 5125:return Ay;case 36294:return Ry;case 36295:return Cy;case 36296:return Iy;case 35678:case 36198:case 36298:case 36306:case 35682:return Py;case 35679:case 36299:case 36307:return Ly;case 35680:case 36300:case 36308:case 36293:return Ny;case 36289:case 36303:case 36311:case 36292:return Dy}}var Ju=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=my(t.type)}},$u=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Uy(t.type)}},ju=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Zu=/(\w+)(\])?(\[|\.)?/g;function R0(s,e){s.seq.push(e),s.map[e.id]=e}function Fy(s,e,t){let n=s.name,i=n.length;for(Zu.lastIndex=0;;){let r=Zu.exec(n),a=Zu.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){R0(t,l===void 0?new Ju(o,s,e):new $u(o,s,e));break}else{let f=t.map[o];f===void 0&&(f=new ju(o),R0(t,f)),t=f}}}var ea=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Fy(o,c,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function C0(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var Oy=37297,By=0;function zy(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var I0=new $e;function ky(s){lt._getMatrix(I0,lt.workingColorSpace,s);let e=`mat3( ${I0.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(s)){case Na:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function P0(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+zy(s.getShaderSource(e),o)}else return r}function Hy(s,e){let t=ky(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Gy={[pu]:"Linear",[mu]:"Reinhard",[gu]:"Cineon",[xu]:"ACESFilmic",[vu]:"AgX",[yu]:"Neutral",[_u]:"Custom"};function Vy(s,e){let t=Gy[e];return t===void 0?(ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Hc=new P;function Wy(){lt.getLuminanceCoefficients(Hc);let s=Hc.x.toFixed(4),e=Hc.y.toFixed(4),t=Hc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xy(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function qy(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Yy(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function wo(s){return s!==""}function L0(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function N0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qu(s){return s.replace(Zy,Ky)}function Ky(s,e){let t=ot[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Qu(t)}var Jy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function D0(s){return s.replace(Jy,$y)}function $y(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function U0(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var jy={[mo]:"SHADOWMAP_TYPE_PCF",[Yr]:"SHADOWMAP_TYPE_VSM"};function Qy(s){return jy[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var eM={[Kr]:"ENVMAP_MODE_REFRACTION"};function tM(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":eM[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var nM={[go]:"ENVMAP_BLENDING_MULTIPLY",[Kp]:"ENVMAP_BLENDING_MIX",[Jp]:"ENVMAP_BLENDING_ADD"};function iM(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":nM[s.combine]||"ENVMAP_BLENDING_NONE"}function sM(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Qy(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=tM(t),f=iM(t),u=Xy(t),d=qy(r),p=i.createProgram(),x,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(wo).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(wo).join(`
`),g.length>0&&(g+=`
`)):(x=[U0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),g=[U0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?ot.tonemapping_pars_fragment:"",t.toneMapping!==Si?Vy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Hy("linearToOutputTexel",t.outputColorSpace),Wy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wo).join(`
`)),a=Qu(a),a=L0(a,t),a=N0(a,t),o=Qu(o),o=L0(o,t),o=N0(o,t),a=D0(a),o=D0(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,x=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===Nu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=m+x+a,y=m+g+o,M=C0(i,i.VERTEX_SHADER,_),w=C0(i,i.FRAGMENT_SHADER,y);i.attachShader(p,M),i.attachShader(p,w),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function b(C){if(s.debug.checkShaderErrors){let N=i.getProgramInfoLog(p)||"",z=i.getShaderInfoLog(M)||"",X=i.getShaderInfoLog(w)||"",D=N.trim(),q=z.trim(),G=X.trim(),L=!0,K=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(L=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,M,w);else{let A=P0(i,M,"vertex"),V=P0(i,w,"fragment");Je("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+A+`
`+V)}else D!==""?ze("WebGLProgram: Program Info Log:",D):(q===""||G==="")&&(K=!1);K&&(C.diagnostics={runnable:L,programLog:D,vertexShader:{log:q,prefix:x},fragmentShader:{log:G,prefix:g}})}i.deleteShader(M),i.deleteShader(w),v=new ea(i,p),S=Yy(i,p)}let v;this.getUniforms=function(){return v===void 0&&b(this),v};let S;this.getAttributes=function(){return S===void 0&&b(this),S};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(p,Oy)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=By++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=w,this}var rM=0,ef=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new tf(e),t.set(e,n)),n}},tf=class{constructor(e){this.id=rM++,this.code=e,this.usedTimes=0}};function aM(s){return s===_s||s===Mo||s===bo}function oM(s,e,t,n,i,r){let a=new Fa,o=new ef,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(v){return c.add(v),v===0?"uv":`uv${v}`}function p(v,S,I,C,N,z){let X=C.fog,D=N.geometry,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,L=e.get(v.envMap||q,G),K=u[v.type],A=n.precision;v.precision!==null&&(A=n.getMaxPrecision(v.precision),A!==v.precision&&ze("WebGLProgram.getParameters:",v.precision,"not supported, using",A,"instead."));let V=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,H=V!==void 0?V.length:0,W=0;D.morphAttributes.position!==void 0&&(W=1),D.morphAttributes.normal!==void 0&&(W=2),D.morphAttributes.color!==void 0&&(W=3);let k,O,re,pe;if(K){let we=wi[K];k=we.vertexShader,O=we.fragmentShader}else{k=v.vertexShader,O=v.fragmentShader;let we=o.getVertexShaderStage(v),Rt=o.getFragmentShaderStage(v);o.update(v,we,Rt),re=we.id,pe=Rt.id}let Ie=s.getRenderTarget(),me=s.state.buffers.depth.getReversed(),Oe=N.isInstancedMesh===!0,ft=N.isBatchedMesh===!0,Ne=!!v.map,Ke=!!v.matcap,Qe=!!L,ie=Qe&&L.isPMREMTexture===!0,ae=!!v.aoMap,oe=!!v.lightMap,Ee=!!v.bumpMap&&v.wireframe===!1,ge=!!v.normalMap,He=!!v.displacementMap,Le=!!v.emissiveMap,et=!!v.metalnessMap,tt=!!v.roughnessMap,dt=v.anisotropy>0,U=v.clearcoat>0,At=v.diffuseRoughness>0,it=v.dispersion>0,St=v.retroreflectivity>0,ue=v.iridescence>0,Ht=v.sheen>0,Ge=v.transmission>0,ee=dt&&!!v.anisotropyMap,R=U&&!!v.clearcoatMap,E=U&&!!v.clearcoatNormalMap,Y=U&&!!v.clearcoatRoughnessMap,le=At&&!!v.diffuseRoughnessMap,se=ue&&!!v.iridescenceMap,xe=ue&&!!v.iridescenceThicknessMap,be=Ht&&!!v.sheenColorMap,Q=Ht&&!!v.sheenRoughnessMap,te=!!v.specularMap,ve=!!v.specularColorMap,F=!!v.specularIntensityMap,ne=Ge&&!!v.transmissionMap,j=Ge&&!!v.thicknessMap,ye=!!v.gradientMap,fe=!!v.alphaMap,_e=v.alphaTest>0,ke=!!v.alphaHash,rt=!!v.extensions,he=Si;v.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(he=s.toneMapping);let We=ie?L.isCompressedCubeTexture?L.image[0].mipmaps:L.mipmaps:null,st={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:k,fragmentShader:O,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:pe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:A,batching:ft,batchingColor:ft&&N._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&N.instanceColor!==null,instancingMorph:Oe&&N.morphTexture!==null,outputColorSpace:Ie===null?s.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ne,matcap:Ke,envMap:Qe,envMapMode:Qe&&L.mapping,envMapPMREM:ie,envMapMaxLod:ie?We.length-1:null,envMapSize:ie?We[0].width:null,aoMap:ae,lightMap:oe,bumpMap:Ee,normalMap:ge,displacementMap:He,emissiveMap:Le,normalMapObjectSpace:ge&&v.normalMapType===e0,normalMapTangentSpace:ge&&v.normalMapType===Qr,packedNormalMap:ge&&v.normalMapType===Qr&&aM(v.normalMap.format),metalnessMap:et,roughnessMap:tt,anisotropy:dt,anisotropyMap:ee,clearcoat:U,clearcoatMap:R,clearcoatNormalMap:E,clearcoatRoughnessMap:Y,diffuseRoughness:At,diffuseRoughnessMap:le,dispersion:it,retroreflection:St,iridescence:ue,iridescenceMap:se,iridescenceThicknessMap:xe,sheen:Ht,sheenColorMap:be,sheenRoughnessMap:Q,specularMap:te,specularColorMap:ve,specularIntensityMap:F,transmission:Ge,transmissionMap:ne,thicknessMap:j,gradientMap:ye,opaque:v.transparent===!1&&v.blending===Zr&&v.alphaToCoverage===!1,alphaMap:fe,alphaTest:_e,alphaHash:ke,combine:v.combine,mapUv:Ne&&d(v.map.channel),aoMapUv:ae&&d(v.aoMap.channel),lightMapUv:oe&&d(v.lightMap.channel),bumpMapUv:Ee&&d(v.bumpMap.channel),normalMapUv:ge&&d(v.normalMap.channel),displacementMapUv:He&&d(v.displacementMap.channel),emissiveMapUv:Le&&d(v.emissiveMap.channel),metalnessMapUv:et&&d(v.metalnessMap.channel),roughnessMapUv:tt&&d(v.roughnessMap.channel),anisotropyMapUv:ee&&d(v.anisotropyMap.channel),clearcoatMapUv:R&&d(v.clearcoatMap.channel),clearcoatNormalMapUv:E&&d(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&d(v.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:le&&d(v.diffuseRoughnessMap.channel),iridescenceMapUv:se&&d(v.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&d(v.iridescenceThicknessMap.channel),sheenColorMapUv:be&&d(v.sheenColorMap.channel),sheenRoughnessMapUv:Q&&d(v.sheenRoughnessMap.channel),specularMapUv:te&&d(v.specularMap.channel),specularColorMapUv:ve&&d(v.specularColorMap.channel),specularIntensityMapUv:F&&d(v.specularIntensityMap.channel),transmissionMapUv:ne&&d(v.transmissionMap.channel),thicknessMapUv:j&&d(v.thicknessMap.channel),alphaMapUv:fe&&d(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(ge||dt),vertexNormals:!!D.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!D.attributes.uv&&(Ne||fe),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||D.attributes.normal===void 0&&ge===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:me,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:W,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:z.filter(we=>we.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:he,decodeVideoTexture:Ne&&v.map.isVideoTexture===!0&&lt.getTransfer(v.map.colorSpace)===Tt,decodeVideoTextureEmissive:Le&&v.emissiveMap.isVideoTexture===!0&&lt.getTransfer(v.emissiveMap.colorSpace)===Tt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Gt,flipSided:v.side===In,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:rt&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&v.extensions.multiDraw===!0||ft)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function x(v){let S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)S.push(I),S.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(g(S,v),m(S,v),S.push(s.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function g(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapPMREM),v.push(S.envMapMaxLod),v.push(S.envMapSize),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.diffuseRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.numSunLights),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numSunLightShadows),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.numLightProbeGrids),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function m(v,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function _(v){let S=u[v.type],I;if(S){let C=wi[S];I=g0.clone(C.uniforms)}else I=v.uniforms;return I}function y(v,S){let I=h.get(S);return I!==void 0?++I.usedTimes:(I=new sM(s,S,v,i),l.push(I),h.set(S,I)),I}function M(v){if(--v.usedTimes===0){let S=l.indexOf(v);l[S]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function b(){o.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:_,acquireProgram:y,releaseProgram:M,releaseShaderCache:w,programs:l,dispose:b}}function lM(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function cM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function F0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function O0(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,x,g,m){let _=s[e];return _===void 0?(_={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},s[e]=_):(_.id=u.id,_.object=u,_.geometry=d,_.material=p,_.materialVariant=a(u),_.groupOrder=x,_.renderOrder=u.renderOrder,_.z=g,_.group=m),e++,_}function c(u,d,p,x,g,m,_){_.reversedDepth===!0&&(g=-g);let y=o(u,d,p,x,g,m);p.transmission>0?n.push(y):p.transparent===!0?i.push(y):t.push(y)}function l(u,d,p,x,g,m){let _=o(u,d,p,x,g,m);p.transmission>0?n.unshift(_):p.transparent===!0?i.unshift(_):t.unshift(_)}function h(u,d){t.length>1&&t.sort(u||cM),n.length>1&&n.sort(d||F0),i.length>1&&i.sort(d||F0)}function f(){for(let u=e,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:f,sort:h}}function hM(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new O0,s.set(n,[a])):i>=r.length?(a=new O0,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function uM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new Te};break;case"SpotLight":t={position:new P,direction:new P,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function fM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var dM=0;function pM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function mM(s){let e=new uM,t=fM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let i=new P,r=new Ve,a=new Ve;function o(l){let h=0,f=0,u=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let d=0,p=0,x=0,g=0,m=0,_=0,y=0,M=0,w=0,b=0,v=0,S=0,I=0,C=0;l.sort(pM);for(let z=0,X=l.length;z<X;z++){let D=l[z],q=D.color,G=D.intensity,L=D.distance,K=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===_s?K=D.shadow.map.texture:K=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=q.r*G,f+=q.g*G,u+=q.b*G;else if(D.isLightProbe){for(let A=0;A<9;A++)n.probe[A].addScaledVector(D.sh.coefficients[A],G);C++}else if(D.isSunLight){let A=e.get(D);if(A.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let V=D.shadow,H=t.get(D);H.shadowIntensity=V.intensity,H.shadowBias=V.bias,H.shadowNormalBias=V.normalBias,H.shadowRadius=V.radius,H.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),n.sunShadow[p]=H,n.sunShadowMap[p]=K;let W=V.getViewportCount();for(let k=0;k<W;k++)n.sunShadowMatrix[x+k]=V.getMatrix(k),n.sunShadowCascade[x+k]=V._cascadeData[k];x+=W,p++}n.sun[d]=A,d++}else if(D.isDirectionalLight){let A=e.get(D);if(A.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let V=D.shadow,H=t.get(D);H.shadowIntensity=V.intensity,H.shadowBias=V.bias,H.shadowNormalBias=V.normalBias,H.shadowRadius=V.radius,H.shadowMapSize=V.mapSize,n.directionalShadow[g]=H,n.directionalShadowMap[g]=K,n.directionalShadowMatrix[g]=D.shadow.matrix,w++}n.directional[g]=A,g++}else if(D.isSpotLight){let A=e.get(D);A.position.setFromMatrixPosition(D.matrixWorld),A.color.copy(q).multiplyScalar(G),A.distance=L,A.coneCos=Math.cos(D.angle),A.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),A.decay=D.decay,n.spot[_]=A;let V=D.shadow;if(D.map&&(n.spotLightMap[S]=D.map,S++,V.updateMatrices(D),D.castShadow&&I++),n.spotLightMatrix[_]=V.matrix,D.castShadow){let H=t.get(D);H.shadowIntensity=V.intensity,H.shadowBias=V.bias,H.shadowNormalBias=V.normalBias,H.shadowRadius=V.radius,H.shadowMapSize=V.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=K,v++}_++}else if(D.isRectAreaLight){let A=e.get(D);A.color.copy(q).multiplyScalar(G),A.halfWidth.set(D.width*.5,0,0),A.halfHeight.set(0,D.height*.5,0),n.rectArea[y]=A,y++}else if(D.isPointLight){let A=e.get(D);if(A.color.copy(D.color).multiplyScalar(D.intensity),A.distance=D.distance,A.decay=D.decay,D.castShadow){let V=D.shadow,H=t.get(D);H.shadowIntensity=V.intensity,H.shadowBias=V.bias,H.shadowNormalBias=V.normalBias,H.shadowRadius=V.radius,H.shadowMapSize=V.mapSize,H.shadowCameraNear=V.camera.near,H.shadowCameraFar=V.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=K,n.pointShadowMatrix[m]=D.shadow.matrix,b++}n.point[m]=A,m++}else if(D.isHemisphereLight){let A=e.get(D);A.skyColor.copy(D.color).multiplyScalar(G),A.groundColor.copy(D.groundColor).multiplyScalar(G),n.hemi[M]=A,M++}}y>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let N=n.hash;(N.sunLength!==d||N.directionalLength!==g||N.pointLength!==m||N.spotLength!==_||N.rectAreaLength!==y||N.hemiLength!==M||N.numSunShadows!==p||N.numDirectionalShadows!==w||N.numPointShadows!==b||N.numSpotShadows!==v||N.numSpotMaps!==S||N.numLightProbes!==C)&&(n.sun.length=d,n.directional.length=g,n.spot.length=_,n.rectArea.length=y,n.point.length=m,n.hemi.length=M,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.spotLightMatrix.length=v+S-I,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=C,N.sunLength=d,N.directionalLength=g,N.pointLength=m,N.spotLength=_,N.rectAreaLength=y,N.hemiLength=M,N.numSunShadows=p,N.numDirectionalShadows=w,N.numPointShadows=b,N.numSpotShadows=v,N.numSpotMaps=S,N.numLightProbes=C,n.version=dM++)}function c(l,h){let f=0,u=0,d=0,p=0,x=0,g=0,m=h.matrixWorldInverse;for(let _=0,y=l.length;_<y;_++){let M=l[_];if(M.isSunLight){let w=n.sun[f];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),f++}else if(M.isDirectionalLight){let w=n.directional[u];w.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),u++}else if(M.isSpotLight){let w=n.spot[p];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),p++}else if(M.isRectAreaLight){let w=n.rectArea[x];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){let w=n.point[d];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){let w=n.hemi[g];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function B0(s){let e=new mM(s),t=[],n=[],i=[];function r(f){h.camera=f,t.length=0,n.length=0,i.length=0}function a(f){f.isLightProbeGrid?i.push(f):t.push(f)}function o(f){n.push(f)}function c(){e.setup(t),i.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function l(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function gM(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new B0(s),e.set(i,[o])):r>=a.length?(o=new B0(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var xM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_M=`uniform sampler2D shadow_pass;
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
}`,vM=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],yM=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],z0=new Ve,Eo=new P,Ku=new P;function MM(s,e,t){let n=new ds,i=new ce,r=new ce,a=new xt,o=new Gl,c=new Vl,l={},h=t.maxTextureSize,f={[$n]:In,[In]:$n,[Gt]:Gt},u=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:xM,fragmentShader:_M}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new vt;p.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new je(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mo;let m=this.type;this.render=function(b,v,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===Ip&&(ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=mo);let I=s.getRenderTarget(),C=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),z=s.state;z.setBlending($s),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let X=m!==this.type;X&&v.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(q=>q.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,q=b.length;D<q;D++){let G=b[D],L=G.shadow;if(L===void 0){ze("WebGLShadowMap:",G,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;i.copy(L.mapSize);let K=L.getFrameExtents();i.multiply(K),r.copy(L.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/K.x),i.x=r.x*K.x,L.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/K.y),i.y=r.y*K.y,L.mapSize.y=r.y));let A=s.state.buffers.depth.getReversed();if(L.camera._reversedDepth=A,L.map===null||X===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Yr){if(G.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new kn(i.x,i.y,{format:_s,type:fi,minFilter:Zt,magFilter:Zt,generateMipmaps:!1}),L.map.texture.name=G.name+".shadowMap",L.map.depthTexture=new Hi(i.x,i.y,Xn),L.map.depthTexture.name=G.name+".shadowMapDepth",L.map.depthTexture.format=ki,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Yt,L.map.depthTexture.magFilter=Yt}else G.isPointLight?(L.map=new To(i.x),L.map.depthTexture=new qa(i.x,ui)):(L.map=new kn(i.x,i.y),L.map.depthTexture=new Hi(i.x,i.y,ui)),L.map.depthTexture.name=G.name+".shadowMap",L.map.depthTexture.format=ki,this.type===mo?(L.map.depthTexture.compareFunction=A?Iu:Cu,L.map.depthTexture.minFilter=Zt,L.map.depthTexture.magFilter=Zt):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Yt,L.map.depthTexture.magFilter=Yt);L.camera.updateProjectionMatrix()}L.map.isWebGLCubeRenderTarget!==!0&&(L.map.width!==i.x||L.map.height!==i.y)&&L.map.setSize(i.x,i.y);let V=L.map.isWebGLCubeRenderTarget?6:L.getViewportCount();G.isPointLight!==!0&&L.updateMatrices(G,S);let H=(L.camera.layers.mask&4294967294)!==0?L.camera.layers:S.layers;for(let W=0;W<V;W++){let k=L.getCamera(W);if(G.isPointLight){let O=L.camera,re=L.matrix,pe=G.distance||O.far;pe!==O.far&&(O.far=pe,O.updateProjectionMatrix()),Eo.setFromMatrixPosition(G.matrixWorld),O.position.copy(Eo),Ku.copy(O.position),Ku.add(vM[W]),O.up.copy(yM[W]),O.lookAt(Ku),O.updateMatrixWorld(),re.makeTranslation(-Eo.x,-Eo.y,-Eo.z),z0.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),L._frustum.setFromProjectionMatrix(z0,O.coordinateSystem,O.reversedDepth)}if(L.map.isWebGLCubeRenderTarget)s.setRenderTarget(L.map,W),s.clear();else{W===0&&(s.setRenderTarget(L.map),s.clear());let O=L.getViewport(W);a.set(r.x*O.x,r.y*O.y,r.x*O.z,r.y*O.w),z.viewport(a)}n=L.getFrustum(W),M(v,S,k,G,H,this.type)}L.isPointLightShadow!==!0&&this.type===Yr&&_(L,S),L.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(I,C,N)};function _(b,v){let S=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new kn(i.x,i.y,{format:_s,type:fi}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(v,null,S,u,x,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(v,null,S,d,x,null)}function y(b,v,S,I){let C=null,N=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0)C=N;else if(C=S.isPointLight===!0?c:o,s.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){let z=C.uuid,X=v.uuid,D=l[z];D===void 0&&(D={},l[z]=D);let q=D[X];q===void 0&&(q=C.clone(),D[X]=q,v.addEventListener("dispose",w)),C=q}if(C.visible=v.visible,C.wireframe=v.wireframe,I===Yr?C.side=v.shadowSide!==null?v.shadowSide:v.side:C.side=v.shadowSide!==null?v.shadowSide:f[v.side],C.alphaMap=v.alphaMap,C.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,C.map=v.map,C.clipShadows=v.clipShadows,C.clippingPlanes=v.clippingPlanes,C.clipIntersection=v.clipIntersection,C.displacementMap=v.displacementMap,C.displacementScale=v.displacementScale,C.displacementBias=v.displacementBias,C.wireframeLinewidth=v.wireframeLinewidth,C.linewidth=v.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let z=s.properties.get(C);z.light=S}return C}function M(b,v,S,I,C,N){if(b.visible===!1)return;if(b.layers.test(C)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&N===Yr)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);let D=e.update(b),q=b.material;if(Array.isArray(q)){let G=D.groups;for(let L=0,K=G.length;L<K;L++){let A=G[L],V=q[A.materialIndex];if(V&&V.visible){let H=y(b,V,I,N);b.onBeforeShadow(s,b,v,S,D,H,A),s.renderBufferDirect(S,null,D,H,b,A),b.onAfterShadow(s,b,v,S,D,H,A)}}}else if(q.visible){let G=y(b,q,I,N);b.onBeforeShadow(s,b,v,S,D,G,null),s.renderBufferDirect(S,null,D,G,b,null),b.onAfterShadow(s,b,v,S,D,G,null)}}let X=b.children;for(let D=0,q=X.length;D<q;D++)M(X[D],v,S,I,C,N)}function w(b){b.target.removeEventListener("dispose",w);for(let S in l){let I=l[S],C=b.target.uuid;C in I&&(I[C].dispose(),delete I[C])}}}function bM(s,e){function t(){let F=!1,ne=new xt,j=null,ye=new xt(0,0,0,0);return{setMask:function(fe){j!==fe&&!F&&(s.colorMask(fe,fe,fe,fe),j=fe)},setLocked:function(fe){F=fe},setClear:function(fe,_e,ke,rt,he){he===!0&&(fe*=rt,_e*=rt,ke*=rt),ne.set(fe,_e,ke,rt),ye.equals(ne)===!1&&(s.clearColor(fe,_e,ke,rt),ye.copy(ne))},reset:function(){F=!1,j=null,ye.set(-1,0,0,0)}}}function n(){let F=!1,ne=!1,j=null,ye=null,fe=null;return{setReversed:function(_e){if(ne!==_e){let ke=e.get("EXT_clip_control");_e?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),ne=_e;let rt=fe;fe=null,this.setClear(rt)}},getReversed:function(){return ne},setTest:function(_e){_e?me(s.DEPTH_TEST):Oe(s.DEPTH_TEST)},setMask:function(_e){j!==_e&&!F&&(s.depthMask(_e),j=_e)},setFunc:function(_e){if(ne&&(_e=h0[_e]),ye!==_e){switch(_e){case Sl:s.depthFunc(s.NEVER);break;case El:s.depthFunc(s.ALWAYS);break;case wl:s.depthFunc(s.LESS);break;case Ar:s.depthFunc(s.LEQUAL);break;case Tl:s.depthFunc(s.EQUAL);break;case Al:s.depthFunc(s.GEQUAL);break;case Rl:s.depthFunc(s.GREATER);break;case Cl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ye=_e}},setLocked:function(_e){F=_e},setClear:function(_e){fe!==_e&&(fe=_e,ne&&(_e=1-_e),s.clearDepth(_e))},reset:function(){F=!1,j=null,ye=null,fe=null,ne=!1}}}function i(){let F=!1,ne=null,j=null,ye=null,fe=null,_e=null,ke=null,rt=null,he=null;return{setTest:function(We){F||(We?me(s.STENCIL_TEST):Oe(s.STENCIL_TEST))},setMask:function(We){ne!==We&&!F&&(s.stencilMask(We),ne=We)},setFunc:function(We,st,we){(j!==We||ye!==st||fe!==we)&&(s.stencilFunc(We,st,we),j=We,ye=st,fe=we)},setOp:function(We,st,we){(_e!==We||ke!==st||rt!==we)&&(s.stencilOp(We,st,we),_e=We,ke=st,rt=we)},setLocked:function(We){F=We},setClear:function(We){he!==We&&(s.clearStencil(We),he=We)},reset:function(){F=!1,ne=null,j=null,ye=null,fe=null,_e=null,ke=null,rt=null,he=null}}}let r=new t,a=new n,o=new i,c={},l=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],x=null,g=!1,m=null,_=null,y=null,M=null,w=null,b=null,v=null,S=new Te(0,0,0),I=0,C=!1,N=null,z=null,X=null,D=null,q=null,G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,K=0,A=s.getParameter(s.VERSION);A.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(A)[1]),L=K>=1):A.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(A)[1]),L=K>=2);let V=null,H={},W=s.getParameter(s.SCISSOR_BOX),k=s.getParameter(s.VIEWPORT),O=new xt().fromArray(W),re=new xt().fromArray(k);function pe(F,ne,j,ye){let fe=new Uint8Array(4),_e=s.createTexture();s.bindTexture(F,_e),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ke=0;ke<j;ke++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(ne,0,s.RGBA,1,1,ye,0,s.RGBA,s.UNSIGNED_BYTE,fe):s.texImage2D(ne+ke,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,fe);return _e}let Ie={};Ie[s.TEXTURE_2D]=pe(s.TEXTURE_2D,s.TEXTURE_2D,1),Ie[s.TEXTURE_CUBE_MAP]=pe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ie[s.TEXTURE_2D_ARRAY]=pe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ie[s.TEXTURE_3D]=pe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),me(s.DEPTH_TEST),a.setFunc(Ar),Ee(!1),ge(lu),me(s.CULL_FACE),ae($s);function me(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function Oe(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function ft(F,ne){return u[F]!==ne?(s.bindFramebuffer(F,ne),u[F]=ne,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ne),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ne(F,ne){let j=p,ye=!1;if(F){j=d.get(ne),j===void 0&&(j=[],d.set(ne,j));let fe=F.textures;if(j.length!==fe.length||j[0]!==s.COLOR_ATTACHMENT0){for(let _e=0,ke=fe.length;_e<ke;_e++)j[_e]=s.COLOR_ATTACHMENT0+_e;j.length=fe.length,ye=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,ye=!0);ye&&s.drawBuffers(j)}function Ke(F){return x!==F?(s.useProgram(F),x=F,!0):!1}let Qe={[js]:s.FUNC_ADD,[Lp]:s.FUNC_SUBTRACT,[Np]:s.FUNC_REVERSE_SUBTRACT};Qe[Dp]=s.MIN,Qe[Up]=s.MAX;let ie={[Fp]:s.ZERO,[Op]:s.ONE,[Bp]:s.SRC_COLOR,[fu]:s.SRC_ALPHA,[Wp]:s.SRC_ALPHA_SATURATE,[Gp]:s.DST_COLOR,[kp]:s.DST_ALPHA,[zp]:s.ONE_MINUS_SRC_COLOR,[du]:s.ONE_MINUS_SRC_ALPHA,[Vp]:s.ONE_MINUS_DST_COLOR,[Hp]:s.ONE_MINUS_DST_ALPHA,[Xp]:s.CONSTANT_COLOR,[qp]:s.ONE_MINUS_CONSTANT_COLOR,[Yp]:s.CONSTANT_ALPHA,[Zp]:s.ONE_MINUS_CONSTANT_ALPHA};function ae(F,ne,j,ye,fe,_e,ke,rt,he,We){if(F===$s){g===!0&&(Oe(s.BLEND),g=!1);return}if(g===!1&&(me(s.BLEND),g=!0),F!==Pp){if(F!==m||We!==C){if((_!==js||w!==js)&&(s.blendEquation(s.FUNC_ADD),_=js,w=js),We)switch(F){case Zr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cu:s.blendFunc(s.ONE,s.ONE);break;case hu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case uu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Je("WebGLState: Invalid blending: ",F);break}else switch(F){case Zr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cu:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case hu:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uu:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",F);break}y=null,M=null,b=null,v=null,S.set(0,0,0),I=0,m=F,C=We}return}fe=fe||ne,_e=_e||j,ke=ke||ye,(ne!==_||fe!==w)&&(s.blendEquationSeparate(Qe[ne],Qe[fe]),_=ne,w=fe),(j!==y||ye!==M||_e!==b||ke!==v)&&(s.blendFuncSeparate(ie[j],ie[ye],ie[_e],ie[ke]),y=j,M=ye,b=_e,v=ke),(rt.equals(S)===!1||he!==I)&&(s.blendColor(rt.r,rt.g,rt.b,he),S.copy(rt),I=he),m=F,C=!1}function oe(F,ne){F.side===Gt?Oe(s.CULL_FACE):me(s.CULL_FACE);let j=F.side===In;ne&&(j=!j),Ee(j),F.blending===Zr&&F.transparent===!1?ae($s):ae(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let ye=F.stencilWrite;o.setTest(ye),ye&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Le(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?me(s.SAMPLE_ALPHA_TO_COVERAGE):Oe(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ee(F){N!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),N=F)}function ge(F){F!==Rp?(me(s.CULL_FACE),F!==z&&(F===lu?s.cullFace(s.BACK):F===Cp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Oe(s.CULL_FACE),z=F}function He(F){F!==X&&(L&&s.lineWidth(F),X=F)}function Le(F,ne,j){F?(me(s.POLYGON_OFFSET_FILL),(D!==ne||q!==j)&&(D=ne,q=j,a.getReversed()&&(ne=-ne,j=-j),s.polygonOffset(ne,j))):Oe(s.POLYGON_OFFSET_FILL)}function et(F){F?me(s.SCISSOR_TEST):Oe(s.SCISSOR_TEST)}function tt(F){F===void 0&&(F=s.TEXTURE0+G-1),V!==F&&(s.activeTexture(F),V=F)}function dt(F,ne,j){j===void 0&&(V===null?j=s.TEXTURE0+G-1:j=V);let ye=H[j];ye===void 0&&(ye={type:void 0,texture:void 0},H[j]=ye),(ye.type!==F||ye.texture!==ne)&&(V!==j&&(s.activeTexture(j),V=j),s.bindTexture(F,ne||Ie[F]),ye.type=F,ye.texture=ne)}function U(){let F=H[V];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function At(){try{s.compressedTexImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function it(){try{s.compressedTexImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function St(){try{s.texSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function ue(){try{s.texSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function Ht(){try{s.compressedTexSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function Ge(){try{s.compressedTexSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function ee(){try{s.texStorage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function R(){try{s.texStorage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function E(){try{s.texImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function Y(){try{s.texImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function le(F){return f[F]!==void 0?f[F]:s.getParameter(F)}function se(F,ne){f[F]!==ne&&(s.pixelStorei(F,ne),f[F]=ne)}function xe(F){O.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),O.copy(F))}function be(F){re.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),re.copy(F))}function Q(F,ne){let j=l.get(ne);j===void 0&&(j=new WeakMap,l.set(ne,j));let ye=j.get(F);ye===void 0&&(ye=s.getUniformBlockIndex(ne,F.name),s.uniformBlockBinding(ne,ye,ye),j.set(F,ye))}function te(F,ne,j){let fe=l.get(ne).get(F);c[fe]!==j&&(s.bindBufferBase(s.UNIFORM_BUFFER,fe,j),c[fe]=j)}function ve(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},V=null,H={},u={},c={},d=new WeakMap,p=[],x=null,g=!1,m=null,_=null,y=null,M=null,w=null,b=null,v=null,S=new Te(0,0,0),I=0,C=!1,N=null,z=null,X=null,D=null,q=null,O.set(0,0,s.canvas.width,s.canvas.height),re.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:me,disable:Oe,bindFramebuffer:ft,drawBuffers:Ne,useProgram:Ke,setBlending:ae,setMaterial:oe,setFlipSided:Ee,setCullFace:ge,setLineWidth:He,setPolygonOffset:Le,setScissorTest:et,activeTexture:tt,bindTexture:dt,unbindTexture:U,compressedTexImage2D:At,compressedTexImage3D:it,texImage2D:E,texImage3D:Y,pixelStorei:se,getParameter:le,updateUBOMapping:Q,uniformBlockBinding:te,texStorage2D:ee,texStorage3D:R,texSubImage2D:St,texSubImage3D:ue,compressedTexSubImage2D:Ht,compressedTexSubImage3D:Ge,scissor:xe,viewport:be,reset:ve}}function SM(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ce,h=new WeakMap,f=new Set,u,d=new WeakMap,p=new Set,x=new FinalizationRegistry(R=>p.delete(R)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,E){return g?new OffscreenCanvas(R,E):Ir("canvas")}function _(R,E,Y){let le=1,se=ee(R);if((se.width>Y||se.height>Y)&&(le=Y/Math.max(se.width,se.height)),le<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let xe=Math.floor(le*se.width),be=Math.floor(le*se.height);u===void 0&&(u=m(xe,be));let Q=E?m(xe,be):u;return Q.width=xe,Q.height=be,Q.getContext("2d").drawImage(R,0,0,xe,be),ze("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+xe+"x"+be+")."),Q}else return"data"in R&&ze("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),R;return R}function y(R){return R.generateMipmaps}function M(R){s.generateMipmap(R)}function w(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(R,E,Y,le,se,xe=!1){if(R!==null){if(s[R]!==void 0)return s[R];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let be;le&&(be=e.get("EXT_texture_norm16"),be||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=E;if(E===s.RED&&(Y===s.FLOAT&&(Q=s.R32F),Y===s.HALF_FLOAT&&(Q=s.R16F),Y===s.UNSIGNED_BYTE&&(Q=s.R8),Y===s.UNSIGNED_SHORT&&be&&(Q=be.R16_EXT),Y===s.SHORT&&be&&(Q=be.R16_SNORM_EXT)),E===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(Q=s.R8UI),Y===s.UNSIGNED_SHORT&&(Q=s.R16UI),Y===s.UNSIGNED_INT&&(Q=s.R32UI),Y===s.BYTE&&(Q=s.R8I),Y===s.SHORT&&(Q=s.R16I),Y===s.INT&&(Q=s.R32I)),E===s.RG&&(Y===s.FLOAT&&(Q=s.RG32F),Y===s.HALF_FLOAT&&(Q=s.RG16F),Y===s.UNSIGNED_BYTE&&(Q=s.RG8),Y===s.UNSIGNED_SHORT&&be&&(Q=be.RG16_EXT),Y===s.SHORT&&be&&(Q=be.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(Y===s.UNSIGNED_BYTE&&(Q=s.RG8UI),Y===s.UNSIGNED_SHORT&&(Q=s.RG16UI),Y===s.UNSIGNED_INT&&(Q=s.RG32UI),Y===s.BYTE&&(Q=s.RG8I),Y===s.SHORT&&(Q=s.RG16I),Y===s.INT&&(Q=s.RG32I)),E===s.RGB_INTEGER&&(Y===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),Y===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),Y===s.UNSIGNED_INT&&(Q=s.RGB32UI),Y===s.BYTE&&(Q=s.RGB8I),Y===s.SHORT&&(Q=s.RGB16I),Y===s.INT&&(Q=s.RGB32I)),E===s.RGBA_INTEGER&&(Y===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),Y===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),Y===s.UNSIGNED_INT&&(Q=s.RGBA32UI),Y===s.BYTE&&(Q=s.RGBA8I),Y===s.SHORT&&(Q=s.RGBA16I),Y===s.INT&&(Q=s.RGBA32I)),E===s.RGB&&(Y===s.UNSIGNED_SHORT&&be&&(Q=be.RGB16_EXT),Y===s.SHORT&&be&&(Q=be.RGB16_SNORM_EXT),Y===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),Y===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),E===s.RGBA){let te=xe?Na:lt.getTransfer(se);Y===s.FLOAT&&(Q=s.RGBA32F),Y===s.HALF_FLOAT&&(Q=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(Q=te===Tt?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT&&be&&(Q=be.RGBA16_EXT),Y===s.SHORT&&be&&(Q=be.RGBA16_SNORM_EXT),Y===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(R,E){let Y;return R?E===null||E===ui||E===tr?Y=s.DEPTH24_STENCIL8:E===Xn?Y=s.DEPTH32F_STENCIL8:E===$r&&(Y=s.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ui||E===tr?Y=s.DEPTH_COMPONENT24:E===Xn?Y=s.DEPTH_COMPONENT32F:E===$r&&(Y=s.DEPTH_COMPONENT16),Y}function S(R,E){return y(R)===!0||R.isFramebufferTexture&&R.minFilter!==Yt&&R.minFilter!==Zt?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function I(R){let E=new WeakRef(R);n.get(R).__ref=E,p.add(E),x.register(R,E,E)}function C(R){let E=n.get(R).__ref;E!==void 0&&(p.delete(E),x.unregister(E))}function N(R){X(R.target)}function z(R){D(R.target)}function X(R){R.removeEventListener("dispose",N),C(R),G(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&f.delete(R)}function D(R){R.removeEventListener("dispose",z),C(R),K(R)}function q(){for(let R of p){let E=R.deref();E!==void 0&&(E.isRenderTarget===!0?D(E):X(E))}p.clear(),f.clear()}function G(R){let E=n.get(R);if(E.__webglInit===void 0)return;let Y=R.source,le=d.get(Y);if(le){let se=le[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&L(R),Object.keys(le).length===0&&d.delete(Y)}n.remove(R)}function L(R){let E=n.get(R);s.deleteTexture(E.__webglTexture);let Y=R.source,le=d.get(Y);delete le[E.__cacheKey],a.memory.textures--}function K(R){let E=n.get(R);E.__depthDisposeCallback&&E.__depthDisposeCallback();let Y=R.depthTexture;if(Y&&Y.renderTarget===R&&X(Y),R.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(E.__webglFramebuffer[se]))for(let xe=0;xe<E.__webglFramebuffer[se].length;xe++)s.deleteFramebuffer(E.__webglFramebuffer[se][xe]);else s.deleteFramebuffer(E.__webglFramebuffer[se]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[se])}else{if(Array.isArray(E.__webglFramebuffer))for(let se=0;se<E.__webglFramebuffer.length;se++)s.deleteFramebuffer(E.__webglFramebuffer[se]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let se=0;se<E.__webglColorRenderbuffer.length;se++)E.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[se]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let le=R.textures;for(let se=0,xe=le.length;se<xe;se++){let be=n.get(le[se]);be.__webglTexture&&(s.deleteTexture(be.__webglTexture),a.memory.textures--),n.remove(le[se])}n.remove(R)}let A=0;function V(){A=0}function H(){return A}function W(R){A=R}function k(){let R=A;return R>=i.maxTextures&&ze("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),A+=1,R}function O(R){let E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.mipmapsAutoUpdate),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function re(R,E){let Y=n.get(R);if(R.isVideoTexture&&Ht(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&Y.__version!==R.version){let le=R.image;if(le===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{oe(Y,R,E);return}}else R.isExternalTexture&&(Y.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+E)}function pe(R,E){let Y=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){oe(Y,R,E);return}else R.isExternalTexture&&(Y.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+E)}function Ie(R,E){let Y=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){oe(Y,R,E);return}t.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+E)}function me(R,E){let Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Ee(Y,R,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+E)}let Oe={[vi]:s.REPEAT,[Kn]:s.CLAMP_TO_EDGE,[Rr]:s.MIRRORED_REPEAT},ft={[Yt]:s.NEAREST,[tc]:s.NEAREST_MIPMAP_NEAREST,[er]:s.NEAREST_MIPMAP_LINEAR,[Zt]:s.LINEAR,[Jr]:s.LINEAR_MIPMAP_NEAREST,[Un]:s.LINEAR_MIPMAP_LINEAR},Ne={[n0]:s.NEVER,[Pu]:s.ALWAYS,[i0]:s.LESS,[Cu]:s.LEQUAL,[s0]:s.EQUAL,[Iu]:s.GEQUAL,[r0]:s.GREATER,[a0]:s.NOTEQUAL};function Ke(R,E){if(E.type===Xn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Zt||E.magFilter===Jr||E.magFilter===er||E.magFilter===Un||E.minFilter===Zt||E.minFilter===Jr||E.minFilter===er||E.minFilter===Un)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,Oe[E.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,Oe[E.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,Oe[E.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,ft[E.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,ft[E.minFilter]),E.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Ne[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Yt||E.minFilter!==er&&E.minFilter!==Un||E.type===Xn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Qe(R,E){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",N),I(E));let le=E.source,se=d.get(le);se===void 0&&(se={},d.set(le,se));let xe=O(E);if(xe!==R.__cacheKey){se[xe]===void 0&&(se[xe]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),se[xe].usedTimes++;let be=se[R.__cacheKey];be!==void 0&&(se[R.__cacheKey].usedTimes--,be.usedTimes===0&&L(E)),R.__cacheKey=xe,R.__webglTexture=se[xe].texture}return Y}function ie(R,E,Y){return Math.floor(Math.floor(R/Y)/E)}function ae(R,E,Y,le){let xe=R.updateRanges;if(xe.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,Y,le,E.data);else{xe.sort((F,ne)=>F.start-ne.start);let be=0;for(let F=1;F<xe.length;F++){let ne=xe[be],j=xe[F],ye=ne.start+ne.count,fe=ie(j.start,E.width,4),_e=ie(ne.start,E.width,4);j.start<=ye+1&&fe===_e&&ie(j.start+j.count-1,E.width,4)===fe?ne.count=Math.max(ne.count,j.start+j.count-ne.start):(++be,xe[be]=j)}xe.length=be+1;let Q=t.getParameter(s.UNPACK_ROW_LENGTH),te=t.getParameter(s.UNPACK_SKIP_PIXELS),ve=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let F=0,ne=xe.length;F<ne;F++){let j=xe[F],ye=Math.floor(j.start/4),fe=Math.ceil(j.count/4),_e=ye%E.width,ke=Math.floor(ye/E.width),rt=fe,he=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(s.UNPACK_SKIP_ROWS,ke),t.texSubImage2D(s.TEXTURE_2D,0,_e,ke,rt,he,Y,le,E.data)}R.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Q),t.pixelStorei(s.UNPACK_SKIP_PIXELS,te),t.pixelStorei(s.UNPACK_SKIP_ROWS,ve)}}function oe(R,E,Y){let le=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(le=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(le=s.TEXTURE_3D);let se=Qe(R,E),xe=E.source;t.bindTexture(le,R.__webglTexture,s.TEXTURE0+Y);let be=n.get(xe);if(xe.version!==be.__version||se===!0){if(t.activeTexture(s.TEXTURE0+Y),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let he=lt.getPrimaries(lt.workingColorSpace),We=E.colorSpace===$i?null:lt.getPrimaries(E.colorSpace),st=E.colorSpace===$i||he===We?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,st)}t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let te=_(E.image,!1,i.maxTextureSize);te=Ge(E,te);let ve=r.convert(E.format,E.colorSpace),F=r.convert(E.type),ne=b(E.internalFormat,ve,F,E.normalized,E.colorSpace,E.isVideoTexture);Ke(le,E);let j,ye=E.mipmaps,fe=E.isVideoTexture!==!0,_e=be.__version===void 0||se===!0,ke=xe.dataReady,rt=S(E,te);if(E.isDepthTexture)ne=v(E.format===Ji,E.type),_e&&(fe?t.texStorage2D(s.TEXTURE_2D,1,ne,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,ne,te.width,te.height,0,ve,F,null));else if(E.isDataTexture)if(ye.length>0){fe&&_e&&t.texStorage2D(s.TEXTURE_2D,rt,ne,ye[0].width,ye[0].height);for(let he=0,We=ye.length;he<We;he++)j=ye[he],fe?ke&&t.texSubImage2D(s.TEXTURE_2D,he,0,0,j.width,j.height,ve,F,j.data):t.texImage2D(s.TEXTURE_2D,he,ne,j.width,j.height,0,ve,F,j.data);E.generateMipmaps=!1}else fe?(_e&&t.texStorage2D(s.TEXTURE_2D,rt,ne,te.width,te.height),ke&&ae(E,te,ve,F)):t.texImage2D(s.TEXTURE_2D,0,ne,te.width,te.height,0,ve,F,te.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){fe&&_e&&t.texStorage3D(s.TEXTURE_2D_ARRAY,rt,ne,ye[0].width,ye[0].height,te.depth);for(let he=0,We=ye.length;he<We;he++)if(j=ye[he],E.format!==jn)if(ve!==null)if(fe){if(ke)if(E.layerUpdates.size>0){let st=Gu(j.width,j.height,E.format,E.type);for(let we of E.layerUpdates){let Rt=j.data.subarray(we*st/j.data.BYTES_PER_ELEMENT,(we+1)*st/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,he,0,0,we,j.width,j.height,1,ve,Rt)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,he,0,0,0,j.width,j.height,te.depth,ve,j.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,he,ne,j.width,j.height,te.depth,0,j.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else fe?ke&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,he,0,0,0,j.width,j.height,te.depth,ve,F,j.data):t.texImage3D(s.TEXTURE_2D_ARRAY,he,ne,j.width,j.height,te.depth,0,ve,F,j.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{fe&&_e&&t.texStorage2D(s.TEXTURE_2D,rt,ne,ye[0].width,ye[0].height);for(let he=0,We=ye.length;he<We;he++)j=ye[he],E.format!==jn?ve!==null?fe?ke&&t.compressedTexSubImage2D(s.TEXTURE_2D,he,0,0,j.width,j.height,ve,j.data):t.compressedTexImage2D(s.TEXTURE_2D,he,ne,j.width,j.height,0,j.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?ke&&t.texSubImage2D(s.TEXTURE_2D,he,0,0,j.width,j.height,ve,F,j.data):t.texImage2D(s.TEXTURE_2D,he,ne,j.width,j.height,0,ve,F,j.data)}else if(E.isDataArrayTexture)if(fe){if(_e&&t.texStorage3D(s.TEXTURE_2D_ARRAY,rt,ne,te.width,te.height,te.depth),ke)if(E.layerUpdates.size>0){let he=Gu(te.width,te.height,E.format,E.type);for(let We of E.layerUpdates){let st=te.data.subarray(We*he/te.data.BYTES_PER_ELEMENT,(We+1)*he/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,We,te.width,te.height,1,ve,F,st)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ve,F,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ne,te.width,te.height,te.depth,0,ve,F,te.data);else if(E.isData3DTexture)fe?(_e&&t.texStorage3D(s.TEXTURE_3D,rt,ne,te.width,te.height,te.depth),ke&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ve,F,te.data)):t.texImage3D(s.TEXTURE_3D,0,ne,te.width,te.height,te.depth,0,ve,F,te.data);else if(E.isFramebufferTexture){if(_e)if(fe)t.texStorage2D(s.TEXTURE_2D,rt,ne,te.width,te.height);else{let he=te.width,We=te.height;for(let st=0;st<rt;st++)t.texImage2D(s.TEXTURE_2D,st,ne,he,We,0,ve,F,null),he>>=1,We>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){let he=s.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),te.parentNode!==he){he.appendChild(te),f.add(E),he.onpaint=We=>{let st=We.changedElements;for(let we of f)st.includes(we.image)&&(we.needsUpdate=!0)},he.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,te);else{let st=s.RGBA,we=s.RGBA,Rt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,st,we,Rt,te)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(ye.length>0){if(fe&&_e){let he=ee(ye[0]);t.texStorage2D(s.TEXTURE_2D,rt,ne,he.width,he.height)}for(let he=0,We=ye.length;he<We;he++)j=ye[he],fe?ke&&t.texSubImage2D(s.TEXTURE_2D,he,0,0,ve,F,j):t.texImage2D(s.TEXTURE_2D,he,ne,ve,F,j);E.generateMipmaps=!1}else if(fe){if(_e){let he=ee(te);t.texStorage2D(s.TEXTURE_2D,rt,ne,he.width,he.height)}ke&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ve,F,te)}else t.texImage2D(s.TEXTURE_2D,0,ne,ve,F,te);y(E)&&E.mipmapsAutoUpdate===!0&&M(le),be.__version=xe.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function Ee(R,E,Y){if(E.image.length!==6)return;let le=Qe(R,E),se=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+Y);let xe=n.get(se);if(se.version!==xe.__version||le===!0){t.activeTexture(s.TEXTURE0+Y);let be=lt.getPrimaries(lt.workingColorSpace),Q=E.colorSpace===$i?null:lt.getPrimaries(E.colorSpace),te=E.colorSpace===$i||be===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ve=E.isCompressedTexture||E.image[0].isCompressedTexture,F=E.image[0]&&E.image[0].isDataTexture,ne=[];for(let we=0;we<6;we++)!ve&&!F?ne[we]=_(E.image[we],!0,i.maxCubemapSize):ne[we]=F?E.image[we].image:E.image[we],ne[we]=Ge(E,ne[we]);let j=ne[0],ye=r.convert(E.format,E.colorSpace),fe=r.convert(E.type),_e=b(E.internalFormat,ye,fe,E.normalized,E.colorSpace),ke=E.isVideoTexture!==!0,rt=xe.__version===void 0||le===!0,he=se.dataReady,We=S(E,j);Ke(s.TEXTURE_CUBE_MAP,E);let st;if(E.isDepthTexture){if(_e=v(E.format===Ji,E.type),rt)if(ke)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,_e,j.width,j.height);else for(let we=0;we<6;we++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_e,j.width,j.height,0,ye,fe,null)}else if(ve){ke&&rt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,We,_e,j.width,j.height);for(let we=0;we<6;we++){st=ne[we].mipmaps;for(let Rt=0;Rt<st.length;Rt++){let un=st[Rt];E.format!==jn?ye!==null?ke?he&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt,0,0,un.width,un.height,ye,un.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt,_e,un.width,un.height,0,un.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt,0,0,un.width,un.height,ye,fe,un.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt,_e,un.width,un.height,0,ye,fe,un.data)}}}else{if(st=E.mipmaps,ke&&rt){st.length>0&&We++;let we=ee(ne[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,We,_e,we.width,we.height)}for(let we=0;we<6;we++)if(F){ke?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,ne[we].width,ne[we].height,ye,fe,ne[we].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_e,ne[we].width,ne[we].height,0,ye,fe,ne[we].data);for(let Rt=0;Rt<st.length;Rt++){let ns=st[Rt].image[we].image;ke?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt+1,0,0,ns.width,ns.height,ye,fe,ns.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt+1,_e,ns.width,ns.height,0,ye,fe,ns.data)}}else{ke?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,ye,fe,ne[we]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_e,ye,fe,ne[we]);for(let Rt=0;Rt<st.length;Rt++){let un=st[Rt];ke?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt+1,0,0,ye,fe,un.image[we]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Rt+1,_e,ye,fe,un.image[we])}}}y(E)&&E.mipmapsAutoUpdate===!0&&M(s.TEXTURE_CUBE_MAP),xe.__version=se.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ge(R,E,Y,le,se,xe){let be=r.convert(Y.format,Y.colorSpace),Q=r.convert(Y.type),te=b(Y.internalFormat,be,Q,Y.normalized,Y.colorSpace),ve=n.get(E),F=n.get(Y);if(F.__renderTarget=E,!ve.__hasExternalTextures){let ne=Math.max(1,E.width>>xe),j=Math.max(1,E.height>>xe);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?t.texImage3D(se,xe,te,ne,j,E.depth,0,be,Q,null):t.texImage2D(se,xe,te,ne,j,0,be,Q,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),ue(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,se,F.__webglTexture,0,St(E)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,le,se,F.__webglTexture,xe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function He(R,E,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,R),E.depthBuffer){let le=E.depthTexture,se=le&&le.isDepthTexture?le.type:null,xe=v(E.stencilBuffer,se),be=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ue(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(E),xe,E.width,E.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(E),xe,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,xe,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,R)}else{let le=E.textures;for(let se=0;se<le.length;se++){let xe=le[se],be=r.convert(xe.format,xe.colorSpace),Q=r.convert(xe.type),te=b(xe.internalFormat,be,Q,xe.normalized,xe.colorSpace);ue(E)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(E),te,E.width,E.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(E),te,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,te,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Le(R,E,Y){let le=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let se=n.get(E.depthTexture);se.__renderTarget=E;let xe=le?E.depthTexture.image[0]:E.depthTexture.image;(!se.__webglTexture||xe.width!==E.width||xe.height!==E.height)&&(xe.width=E.width,xe.height=E.height,E.depthTexture.needsUpdate=!0),le?me(E.depthTexture,0):re(E.depthTexture,0);let be=se.__webglTexture,Q=St(E),te=le?s.TEXTURE_CUBE_MAP_POSITIVE_X+Y:s.TEXTURE_2D,ve=E.depthTexture.format===Ji?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===ki)ue(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ve,te,be,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,ve,te,be,0);else if(E.depthTexture.format===Ji)ue(E)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ve,te,be,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,ve,te,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function et(R){let E=n.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){let le=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),le){let se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,le.removeEventListener("dispose",se)};le.addEventListener("dispose",se),E.__depthDisposeCallback=se}E.__boundDepthTexture=le}if(R.depthTexture&&!E.__autoAllocateDepthBuffer)if(Y)for(let le=0;le<6;le++)Le(E.__webglFramebuffer[le],R,le);else R.texture.mipmaps.length>0?Le(E.__webglFramebuffer[0],R,0):Le(E.__webglFramebuffer,R,0);else if(Y){E.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[le]),E.__webglDepthbuffer[le]===void 0)E.__webglDepthbuffer[le]=s.createRenderbuffer(),He(E.__webglDepthbuffer[le],R,!1);else{let se=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=E.__webglDepthbuffer[le];s.bindRenderbuffer(s.RENDERBUFFER,xe),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,xe)}}else if(R.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),He(E.__webglDepthbuffer,R,!1);else{let se=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,xe),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,xe)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function tt(R,E,Y){let le=n.get(R);E!==void 0&&ge(le.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&et(R)}function dt(R){let E=R.texture,Y=n.get(R),le=n.get(E);R.addEventListener("dispose",z),I(R);let se=R.textures,xe=R.isWebGLCubeRenderTarget===!0,be=se.length>1;if(be||(le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture()),le.__version=E.version,a.memory.textures++),xe){Y.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps.length>0){Y.__webglFramebuffer[Q]=[];for(let te=0;te<E.mipmaps.length;te++)Y.__webglFramebuffer[Q][te]=s.createFramebuffer()}else Y.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(E.mipmaps.length>0){Y.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)Y.__webglFramebuffer[Q]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(be)for(let Q=0,te=se.length;Q<te;Q++){let ve=n.get(se[Q]);ve.__webglTexture===void 0&&(ve.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&ue(R)===!1){Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let Q=0;Q<se.length;Q++){let te=se[Q];Y.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[Q]);let ve=r.convert(te.format,te.colorSpace),F=r.convert(te.type),ne=b(te.internalFormat,ve,F,te.normalized,te.colorSpace,R.isXRRenderTarget===!0),j=St(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,j,ne,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,Y.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),He(Y.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(xe){t.bindTexture(s.TEXTURE_CUBE_MAP,le.__webglTexture),Ke(s.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)ge(Y.__webglFramebuffer[Q][te],R,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else ge(Y.__webglFramebuffer[Q],R,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);y(E)?M(s.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}else if(be){for(let Q=0,te=se.length;Q<te;Q++){let ve=se[Q],F=n.get(ve),ne=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ne=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ne,F.__webglTexture),Ke(ne,ve),ge(Y.__webglFramebuffer,R,ve,s.COLOR_ATTACHMENT0+Q,ne,0),y(ve)&&M(ne)}t.unbindTexture()}else{let Q=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Q=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Q,le.__webglTexture),Ke(Q,E),E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)ge(Y.__webglFramebuffer[te],R,E,s.COLOR_ATTACHMENT0,Q,te);else ge(Y.__webglFramebuffer,R,E,s.COLOR_ATTACHMENT0,Q,0);y(E)?M(Q):E.mipmaps.length>0&&s.texParameteri(Q,s.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}R.depthBuffer&&et(R)}function U(R){let E=R.textures;for(let Y=0,le=E.length;Y<le;Y++){let se=E[Y];if(y(se)&&se.mipmapsAutoUpdate===!0){let xe=w(R),be=n.get(se).__webglTexture;t.bindTexture(xe,be),M(xe),t.unbindTexture()}}}let At=[];function it(R){if(R.samples>0){if(ue(R)===!1){let E=R.textures,Y=R.width,le=R.height,se=s.COLOR_BUFFER_BIT,xe=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(R),Q=E.length>1;if(Q)for(let ve=0;ve<E.length;ve++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ve=0;ve<E.length;ve++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[ve]);let F=n.get(E[ve]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,F,0)}s.blitFramebuffer(0,0,Y,le,0,0,Y,le,se,s.NEAREST),c===!0&&(At.length=0,At.push(s.COLOR_ATTACHMENT0+ve),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&At.push(xe),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,At))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let ve=0;ve<E.length;ve++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,be.__webglColorRenderbuffer[ve]);let F=n.get(E[ve]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,F,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&c){let E=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function St(R){return Math.min(i.maxSamples,R.samples)}function ue(R){let E=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ht(R){let E=a.render.frame;h.get(R)!==E&&(h.set(R,E),R.update())}function Ge(R,E){let Y=R.colorSpace,le=R.format,se=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Y!==Rn&&Y!==$i&&(lt.getTransfer(Y)===Tt?(le!==jn||se!==Fn)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",Y)),E}function ee(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=V,this.getTextureUnits=H,this.setTextureUnits=W,this.setTexture2D=re,this.setTexture2DArray=pe,this.setTexture3D=Ie,this.setTextureCube=me,this.rebindTextures=tt,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=ue,this.dispose=q}function EM(s,e){function t(n,i=$i){let r,a=lt.getTransfer(i);if(n===Fn)return s.UNSIGNED_BYTE;if(n===ic)return s.UNSIGNED_SHORT_4_4_4_4;if(n===sc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Eu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===wu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===bu)return s.BYTE;if(n===Su)return s.SHORT;if(n===$r)return s.UNSIGNED_SHORT;if(n===nc)return s.INT;if(n===ui)return s.UNSIGNED_INT;if(n===Xn)return s.FLOAT;if(n===fi)return s.HALF_FLOAT;if(n===Tu)return s.ALPHA;if(n===Au)return s.RGB;if(n===jn)return s.RGBA;if(n===ki)return s.DEPTH_COMPONENT;if(n===Ji)return s.DEPTH_STENCIL;if(n===rc)return s.RED;if(n===ac)return s.RED_INTEGER;if(n===_s)return s.RG;if(n===oc)return s.RG_INTEGER;if(n===lc)return s.RGBA_INTEGER;if(n===xo||n===_o||n===vo||n===yo)if(a===Tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_o)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cc||n===hc||n===uc||n===fc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===cc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===uc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===dc||n===pc||n===mc||n===gc||n===xc||n===Mo||n===_c)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===dc||n===pc)return a===Tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===mc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===gc)return r.COMPRESSED_R11_EAC;if(n===xc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Mo)return r.COMPRESSED_RG11_EAC;if(n===_c)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===vc||n===yc||n===Mc||n===bc||n===Sc||n===Ec||n===wc||n===Tc||n===Ac||n===Rc||n===Cc||n===Ic||n===Pc||n===Lc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===bc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ec)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ac)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Cc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ic)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lc)return a===Tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Nc||n===Dc||n===Uc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Nc)return a===Tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Dc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fc||n===Oc||n===bo||n===Bc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===tr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var wM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,TM=`
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

}`,nf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ya(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ft({vertexShader:wM,fragmentShader:TM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new kt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},sf=class extends yi{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,p=null,x=typeof XRWebGLBinding<"u",g=new nf,m={},_=t.getContextAttributes(),y=null,M=null,w=[],b=[],v=new ce,S=null,I=null,C=new rn;C.viewport=new xt;let N=new rn;N.viewport=new xt;let z=[C,N],X=new $l,D=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let re=w[O];return re===void 0&&(re=new Nr,w[O]=re),re.getTargetRaySpace()},this.getControllerGrip=function(O){let re=w[O];return re===void 0&&(re=new Nr,w[O]=re),re.getGripSpace()},this.getHand=function(O){let re=w[O];return re===void 0&&(re=new Nr,w[O]=re),re.getHandSpace()};function G(O){let re=b.indexOf(O.inputSource);if(re===-1)return;let pe=w[re];pe!==void 0&&(pe.update(O.inputSource,O.frame,l||a),pe.dispatchEvent({type:O.type,data:O.inputSource}))}function L(){i.removeEventListener("select",G),i.removeEventListener("selectstart",G),i.removeEventListener("selectend",G),i.removeEventListener("squeeze",G),i.removeEventListener("squeezestart",G),i.removeEventListener("squeezeend",G),i.removeEventListener("end",L),i.removeEventListener("inputsourceschange",K);for(let O=0;O<w.length;O++){let re=b[O];re!==null&&(b[O]=null,w[O].disconnect(re))}D=null,q=null,g.reset();for(let O in m)delete m[O];if(e.setRenderTarget(y),d=null,u=null,f=null,i=null,M=null,k.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(v.width,v.height,!1),I!==null){let O=I.camera;O.fov=I.fov,O.zoom=I.zoom,O.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,n.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(O){l=O},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(i,t)),f},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(O){if(i=O,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",G),i.addEventListener("selectstart",G),i.addEventListener("selectend",G),i.addEventListener("squeeze",G),i.addEventListener("squeezestart",G),i.addEventListener("squeezeend",G),i.addEventListener("end",L),i.addEventListener("inputsourceschange",K),_.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(v),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ie=null,me=null;_.depth&&(me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=_.stencil?Ji:ki,Ie=_.stencil?tr:ui);let Oe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Oe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new kn(u.textureWidth,u.textureHeight,{format:jn,type:Fn,depthTexture:new Hi(u.textureWidth,u.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let pe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new kn(d.framebufferWidth,d.framebufferHeight,{format:jn,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),k.setContext(i),k.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(O){for(let re=0;re<O.removed.length;re++){let pe=O.removed[re],Ie=b.indexOf(pe);Ie>=0&&(b[Ie]=null,w[Ie].disconnect(pe))}for(let re=0;re<O.added.length;re++){let pe=O.added[re],Ie=b.indexOf(pe);if(Ie===-1){for(let Oe=0;Oe<w.length;Oe++)if(Oe>=b.length){b.push(pe),Ie=Oe;break}else if(b[Oe]===null){b[Oe]=pe,Ie=Oe;break}if(Ie===-1)break}let me=w[Ie];me&&me.connect(pe)}}function A(O,re){re===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(re.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(i===null)return;let re=O.near,pe=O.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(pe=g.depthFar)),X.near=N.near=C.near=re,X.far=N.far=C.far=pe,(D!==X.near||q!==X.far)&&(i.updateRenderState({depthNear:X.near,depthFar:X.far}),D=X.near,q=X.far),X.layers.mask=O.layers.mask|6,C.layers.mask=X.layers.mask&-5,N.layers.mask=X.layers.mask&-3;let Ie=O.parent,me=X.cameras;A(X,Ie);for(let Oe=0;Oe<me.length;Oe++)A(me[Oe],Ie);X.projectionMatrix.copy(C.projectionMatrix),X.projectionMatrixInverse.copy(C.projectionMatrixInverse),I===null&&O.isPerspectiveCamera&&(I={camera:O,fov:O.fov,zoom:O.zoom}),V(O,X,Ie)};function V(O,re,pe){pe===null?O.matrix.copy(re.matrixWorld):(O.matrix.copy(pe.matrixWorld),O.matrix.invert(),O.matrix.multiply(re.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(re.projectionMatrix),O.projectionMatrixInverse.copy(re.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Hs*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(O){c=O,u!==null&&(u.fixedFoveation=O),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=O)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function(O){return m[O]};let H=null;function W(O,re){if(h=re.getViewerPose(l||a),p=re,h!==null){let pe=h.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Ie=!1;pe.length!==X.cameras.length&&(X.cameras.length=0,Ie=!0);for(let Ne=0;Ne<pe.length;Ne++){let Ke=pe[Ne],Qe=null;if(d!==null)Qe=d.getViewport(Ke);else{let ae=f.getViewSubImage(u,Ke);Qe=ae.viewport,Ne===0&&(e.setRenderTargetTextures(M,ae.colorTexture,ae.depthStencilTexture),e.setRenderTarget(M))}let ie=z[Ne];ie===void 0&&(ie=new rn,ie.layers.enable(Ne),ie.viewport=new xt,z[Ne]=ie),ie.matrix.fromArray(Ke.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Ke.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Ne===0&&(X.matrix.copy(ie.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ie===!0&&X.cameras.push(ie)}let me=i.enabledFeatures;if(me&&me.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){f=n.getBinding();let Ne=f.getDepthInformation(pe[0]);Ne&&Ne.isValid&&Ne.texture&&g.init(Ne,i.renderState)}if(me&&me.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let Ne=0;Ne<pe.length;Ne++){let Ke=pe[Ne].camera;if(Ke){let Qe=m[Ke];Qe||(Qe=new Ya,m[Ke]=Qe);let ie=f.getCameraImage(Ke);Qe.sourceTexture=ie}}}}for(let pe=0;pe<w.length;pe++){let Ie=b[pe],me=w[pe];Ie!==null&&me!==void 0&&me.update(Ie,re,l||a)}H&&H(O,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),p=null}let k=new k0;k.setAnimationLoop(W),this.setAnimationLoop=function(O){H=O},this.dispose=function(){}}},AM=new Ve,J0=new $e;J0.set(-1,0,0,0,1,0,0,0,1);function RM(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,zu(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,y,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,M)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,_,y):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===In&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===In&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let _=e.get(m),y=_.envMap,M=_.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(AM.makeRotationFromEuler(M)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(J0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,_,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,_){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===In&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let _=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function CM(s,e,t,n){let i={},r={};function a(_,y){let M=y.program;n.uniformBlockBinding(_,M,i[_.id])}function o(_,y){let M=i[_.id];M===void 0&&(p(_),M=c(_),i[_.id]=M,_.addEventListener("dispose",g));let w=y.program;n.updateUBOMapping(_,w);let b=e.render.frame;r[_.id]!==b&&(l(_),r[_.id]=b)}function c(_){let y=s.createBuffer(),M=_.__size,w=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,M,w),s.bindBuffer(s.UNIFORM_BUFFER,null),y}function l(_){let y=i[_.id],M=_.uniforms,w=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let b=0,v=M.length;b<v;b++){let S=M[b];if(Array.isArray(S))for(let I=0,C=S.length;I<C;I++)h(S[I],b,I,w);else h(S,b,0,w)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(_,y,M,w){if(u(_,y,M,w)===!0){let b=_.__offset,v=_.value;if(Array.isArray(v)){let S=0;for(let I=0;I<v.length;I++){let C=v[I],N=x(C,!0);f(C,_.__data,S),S+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else f(v,_.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,_.__data)}}function f(_,y,M){typeof _=="number"||typeof _=="boolean"?y[M]=_:_.isMatrix3?(y[M]=_.elements[0],y[M+1]=_.elements[1],y[M+2]=_.elements[2],y[M+3]=0,y[M+4]=_.elements[3],y[M+5]=_.elements[4],y[M+6]=_.elements[5],y[M+7]=0,y[M+8]=_.elements[6],y[M+9]=_.elements[7],y[M+10]=_.elements[8],y[M+11]=0):ArrayBuffer.isView(_)?y.set(_.subarray(0,y.length-M),M):_.toArray(y,M)}function u(_,y,M,w){let b=_.value,v=y+"_"+M;if(Array.isArray(b)){w[v]===void 0&&(w[v]=[]);let S=w[v],I=!1;for(let C=0;C<b.length;C++)d(b[C],S,C)===!0&&(I=!0);return I}return d(b,w,v)}function d(_,y,M){if(y[M]===void 0)return typeof _=="number"||typeof _=="boolean"?y[M]=_:ArrayBuffer.isView(_)?y[M]=_.slice():y[M]=_.clone(),!0;{let w=y[M];if(typeof _=="number"||typeof _=="boolean"){if(w!==_)return y[M]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(w.equals(_)===!1)return w.copy(_),!0}}return!1}function p(_){let y=_.uniforms,M=0,w=16;for(let v=0,S=y.length;v<S;v++){let I=Array.isArray(y[v])?y[v]:[y[v]];for(let C=0,N=I.length;C<N;C++){let z=I[C],X=Array.isArray(z.value)?z.value:[z.value],D=Array.isArray(y[v])||Array.isArray(z.value),q=M;for(let L=0,K=X.length;L<K;L++){let A=X[L],V=x(A,D),H=M%w,W=H%V.boundary,k=H+W;M+=W,k!==0&&w-k<V.storage&&(M+=w-k),L===0&&(q=M),M+=V.storage}let G=z.type==="int"?Int32Array:z.type==="uint"?Uint32Array:Float32Array;z.__data=new G((M-q)/Float32Array.BYTES_PER_ELEMENT),z.__offset=q}}let b=M%w;return b>0&&(M+=w-b),_.__size=M,_.__cache={},this}function x(_,y){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=16,M.storage=48):_.isMatrix4?(M.boundary=16,M.storage=64):_.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",_),y===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function g(_){let y=_.target;y.removeEventListener("dispose",g),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function m(){for(let _ in i)s.deleteBuffer(i[_]);i={},r={}}return{bind:a,update:o,dispose:m}}var IM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ei=null;function PM(){return Ei===null&&(Ei=new Or(IM,16,16,_s,fi),Ei.name="DFG_LUT",Ei.minFilter=Zt,Ei.magFilter=Zt,Ei.wrapS=Kn,Ei.wrapT=Kn,Ei.generateMipmaps=!1,Ei.needsUpdate=!0),Ei}var Vc=class{constructor(e={}){let{canvas:t=o0(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Fn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=d,g=new Set([lc,oc,ac]),m=new Set([Fn,ui,$r,tr,ic,sc]),_=new Uint32Array(4),y=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},w=null,b=null,v=[],S=[],I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,N=!1,z=null,X=null,D=null,q=null;this._outputColorSpace=gt;let G=0,L=0,K=null,A=-1,V=null,H=new xt,W=new xt,k=null,O=new Te(0),re=0,pe=t.width,Ie=t.height,me=1,Oe=null,ft=null,Ne=new xt(0,0,pe,Ie),Ke=new xt(0,0,pe,Ie),Qe=!1,ie=new ds,ae=new Nl,oe=!1,Ee=!1,ge=new Ve,He=new P,Le=new xt,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},tt=!1;function dt(){return K===null?me:1}let U=n;function At(T,B){return t.getContext(T,B)}let it,St,ue,Ht,Ge,ee,R,E,Y,le,se,xe,be,Q,te,ve,F,ne,j,ye,fe,_e,ke;try{let T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",We,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",we,!1),U===null){let B="webgl2";if(U=At(B,T),U===null)throw At(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}rt()}catch(T){throw t.removeEventListener("webglcontextlost",We,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",we,!1),Je("WebGLRenderer: "+T.message),T}function rt(){it=new Gv(U),it.init(),fe=new EM(U,it),St=new Pv(U,it,e,fe),ue=new bM(U,it),St.reversedDepthBuffer&&u&&ue.buffers.depth.setReversed(!0),X=U.createFramebuffer(),D=U.createFramebuffer(),q=U.createFramebuffer(),Ht=new Xv(U),Ge=new lM,ee=new SM(U,it,ue,Ge,St,fe,Ht),R=new Hv(C),E=new Yx(U),_e=new Cv(U,E),Y=new Vv(U,E,Ht,_e),le=new Yv(U,Y,E,_e,Ht),ne=new qv(U,St,ee),te=new Lv(Ge),se=new oM(C,R,it,St,_e,te),xe=new RM(C,Ge),be=new hM,Q=new gM(it),F=new Rv(C,R,ue,le,p,c),ve=new MM(C,le,St),ke=new CM(U,Ht,St,ue),j=new Iv(U,it,Ht),ye=new Wv(U,it,Ht),Ht.programs=se.programs,C.capabilities=St,C.extensions=it,C.properties=Ge,C.renderLists=be,C.shadowMap=ve,C.state=ue,C.info=Ht}x!==Fn&&(I=new Kv(x,t.width,t.height,o,i,r));let he=new sf(C,U);this.xr=he,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let T=it.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=it.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(T){T!==void 0&&(me=T,this.setSize(pe,Ie,!1))},this.getSize=function(T){return T.set(pe,Ie)},this.setSize=function(T,B,$=!0){if(he.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=T,Ie=B,t.width=Math.floor(T*me),t.height=Math.floor(B*me),$===!0&&(t.style.width=T+"px",t.style.height=B+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(pe*me,Ie*me).floor()},this.setDrawingBufferSize=function(T,B,$){pe=T,Ie=B,me=$,t.width=Math.floor(T*$),t.height=Math.floor(B*$),this.setViewport(0,0,T,B)},this.setEffects=function(T){if(x===Fn){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let B=0;B<T.length;B++)if(T[B].isOutputPass===!0){ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(H)},this.getViewport=function(T){return T.copy(Ne)},this.setViewport=function(T,B,$,Z){T.isVector4?Ne.set(T.x,T.y,T.z,T.w):Ne.set(T,B,$,Z),ue.viewport(H.copy(Ne).multiplyScalar(dt()).round())},this.getScissor=function(T){return T.copy(Ke)},this.setScissor=function(T,B,$,Z){T.isVector4?Ke.set(T.x,T.y,T.z,T.w):Ke.set(T,B,$,Z),ue.scissor(W.copy(Ke).multiplyScalar(dt()).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(T){ue.setScissorTest(Qe=T)},this.setOpaqueSort=function(T){Oe=T},this.setTransparentSort=function(T){ft=T},this.getClearColor=function(T){return T.copy(F.getClearColor())},this.setClearColor=function(){F.setClearColor(...arguments)},this.getClearAlpha=function(){return F.getClearAlpha()},this.setClearAlpha=function(){F.setClearAlpha(...arguments)},this.clear=function(T=!0,B=!0,$=!0){let Z=0;if(T){let J=!1;if(K!==null){let Se=K.texture.format;J=g.has(Se)}if(J){let Se=K.texture.type,De=m.has(Se),Me=F.getClearColor(),Ce=F.getClearAlpha(),Be=Me.r,nt=Me.g,pt=Me.b;De?(_[0]=Be,_[1]=nt,_[2]=pt,_[3]=Ce,U.clearBufferuiv(U.COLOR,0,_)):(y[0]=Be,y[1]=nt,y[2]=pt,y[3]=Ce,U.clearBufferiv(U.COLOR,0,y))}else Z|=U.COLOR_BUFFER_BIT}B&&(Z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(Z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&U.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),z=T},this.dispose=function(){t.removeEventListener("webglcontextlost",We,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",we,!1),F.dispose(),be.dispose(),Q.dispose(),ee.dispose(),Ge.dispose(),R.dispose(),le.dispose(),Y.dispose(),_e.dispose(),ke.dispose(),se.dispose(),he.dispose(),he.removeEventListener("sessionstart",cd),he.removeEventListener("sessionend",hd),Rs.stop()};function We(T){T.preventDefault(),Da("WebGLRenderer: Context Lost."),N=!0}function st(){Da("WebGLRenderer: Context Restored."),N=!1;let T=Ht.autoReset,B=ve.enabled,$=ve.autoUpdate,Z=ve.needsUpdate,J=ve.type;rt(),Ht.autoReset=T,ve.enabled=B,ve.autoUpdate=$,ve.needsUpdate=Z,ve.type=J}function we(T){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Rt(T){let B=T.target;B.removeEventListener("dispose",Rt),un(B)}function un(T){ns(T),Ge.remove(T)}function ns(T){let B=Ge.get(T).programs;B!==void 0&&(B.forEach(function($){se.releaseProgram($)}),T.isShaderMaterial&&se.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,$,Z,J,Se){B===null&&(B=et);let De=J.isMesh&&J.matrixWorld.determinantAffine()<0,Me=og(T,B,$,Z,J);ue.setMaterial(Z,De);let Ce=$.index,Be=1;if(Z.wireframe===!0){if(Ce=Y.getWireframeAttribute($),Ce===void 0)return;Be=2}let nt=$.drawRange,pt=$.attributes.position,Ue=nt.start*Be,mt=(nt.start+nt.count)*Be;Se!==null&&(Ue=Math.max(Ue,Se.start*Be),mt=Math.min(mt,(Se.start+Se.count)*Be)),Ce!==null?(Ue=Math.max(Ue,0),mt=Math.min(mt,Ce.count)):pt!=null&&(Ue=Math.max(Ue,0),mt=Math.min(mt,pt.count));let Kt=mt-Ue;if(Kt<0||Kt===1/0)return;_e.setup(J,Z,Me,$,Ce);let Bt,Nt=j;if(Ce!==null&&(Bt=E.get(Ce),Nt=ye,Nt.setIndex(Bt)),J.isMesh)Z.wireframe===!0?(ue.setLineWidth(Z.wireframeLinewidth*dt()),Nt.setMode(U.LINES)):Nt.setMode(U.TRIANGLES);else if(J.isLine){let gn=Z.linewidth;gn===void 0&&(gn=1),ue.setLineWidth(gn*dt()),J.isLineSegments?Nt.setMode(U.LINES):J.isLineLoop?Nt.setMode(U.LINE_LOOP):Nt.setMode(U.LINE_STRIP)}else J.isPoints?Nt.setMode(U.POINTS):J.isSprite&&Nt.setMode(U.TRIANGLES);if(J.isBatchedMesh)if(it.get("WEBGL_multi_draw"))Nt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let gn=J._multiDrawStarts,Fe=J._multiDrawCounts,wn=J._multiDrawCount,bt=Ce?E.get(Ce).bytesPerElement:1,Cs=Ge.get(Z).currentProgram.getUniforms();for(let xn=0;xn<wn;xn++)Cs.setValue(U,"_gl_DrawID",xn),Nt.render(gn[xn]/bt,Fe[xn])}else if(J.isInstancedMesh)Nt.renderInstances(Ue,Kt,J.count);else if($.isInstancedBufferGeometry){let gn=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Fe=Math.min($.instanceCount,gn);Nt.renderInstances(Ue,Kt,Fe)}else Nt.render(Ue,Kt)};function ld(T,B,$,Z){z!==null&&T.isNodeMaterial&&z.setObject(Z,T),oe===!0&&te.setState(T,$,!1),T.transparent===!0&&T.side===Gt&&T.forceSinglePass===!1?(T.side=In,T.needsUpdate=!0,da(T,B,Z),T.side=$n,T.needsUpdate=!0,da(T,B,Z),T.side=Gt):da(T,B,Z)}this.compile=function(T,B,$=null){$===null&&($=T),z!==null&&z.renderStart(T,B,$),b=Q.get($),b.init(B),S.push(b),$.traverseVisible(function(J){J.isLight&&J.layers.test(B.layers)&&(b.pushLight(J),J.castShadow&&b.pushShadow(J))}),T!==$&&T.traverseVisible(function(J){J.isLight&&J.layers.test(B.layers)&&(b.pushLight(J),J.castShadow&&b.pushShadow(J))}),b.setupLights(),z!==null&&z.updateLights(b.state.lightsArray),Ee=this.localClippingEnabled,oe=te.init(this.clippingPlanes,Ee),oe===!0&&te.setGlobalState(this.clippingPlanes,B),z!==null&&ve.render(b.state.shadowsArray,$,B);let Z=new Set;return T.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let Se=J.material;if(Se)if(Array.isArray(Se))for(let De=0;De<Se.length;De++){let Me=Se[De];ld(Me,$,B,J),Z.add(Me)}else ld(Se,$,B,J),Z.add(Se)}),b=S.pop(),z!==null&&z.renderEnd(),Z},this.compileAsync=function(T,B,$=null){let Z=this.compile(T,B,$);return new Promise(J=>{function Se(){if(Z.forEach(function(De){let Ce=Ge.get(De).currentProgram;(Ce===void 0||Ce.isReady())&&Z.delete(De)}),Z.size===0){J(T);return}setTimeout(Se,10)}it.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let lh=null;function rg(T){lh&&lh(T)}function cd(){Rs.stop()}function hd(){Rs.start()}let Rs=new k0;Rs.setAnimationLoop(rg),typeof self<"u"&&Rs.setContext(self),this.setAnimationLoop=function(T){lh=T,he.setAnimationLoop(T),T===null?Rs.stop():Rs.start()},he.addEventListener("sessionstart",cd),he.addEventListener("sessionend",hd),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;z!==null&&z.renderStart(T,B);let $=he.enabled===!0&&he.isPresenting===!0,Z=I!==null&&(K===null||$)&&I.begin(C,K);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(he.cameraAutoUpdate===!0&&he.updateCamera(B),B=he.getCamera()),T.isScene===!0&&T.onBeforeRender(C,T,B,K),b=Q.get(T,S.length),b.init(B),b.state.textureUnits=ee.getTextureUnits(),S.push(b),ge.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?ae.setFromArrayCamera(B):ie.setFromProjectionMatrix(ge,Jn,B.reversedDepth),Ee=this.localClippingEnabled,oe=te.init(this.clippingPlanes,Ee),w=be.get(T,v.length),w.init(),v.push(w),this.info.render.frame++,he.enabled===!0&&he.isPresenting===!0){let De=C.xr.getDepthSensingMesh();De!==null&&ch(De,B,-1/0,C.sortObjects)}ch(T,B,0,C.sortObjects),w.finish(),z!==null&&z.updateLights(b.state.lightsArray),C.sortObjects===!0&&w.sort(Oe,ft),tt=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,tt&&F.addToRenderList(w,T),this.info.autoReset===!0&&this.info.reset(),oe===!0&&te.beginShadows();let J=b.state.shadowsArray;if(ve.render(J,T,B),oe===!0&&te.endShadows(),(Z&&I.hasRenderPass())===!1){let De=w.opaque,Me=w.transmissive;if(b.setupLights(),B.isArrayCamera){let Ce=B.cameras;if(Me.length>0)for(let Be=0,nt=Ce.length;Be<nt;Be++){let pt=Ce[Be];fd(De,Me,T,pt)}tt&&F.render(T);for(let Be=0,nt=Ce.length;Be<nt;Be++){let pt=Ce[Be];ud(w,T,pt,pt.viewport)}}else Me.length>0&&fd(De,Me,T,B),tt&&F.render(T),ud(w,T,B)}K!==null&&L===0&&(ee.updateMultisampleRenderTarget(K),ee.updateRenderTargetMipmap(K)),Z&&I.end(C),T.isScene===!0&&T.onAfterRender(C,T,B),_e.resetDefaultState(),A=-1,V=null,S.pop(),S.length>0?(b=S[S.length-1],ee.setTextureUnits(b.state.textureUnits),oe===!0&&te.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,v.pop(),v.length>0?w=v[v.length-1]:w=null,z!==null&&z.renderEnd()};function ch(T,B,$,Z){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)$=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){let De=B.isArrayCamera?ae:ie;if(!T.frustumCulled||T.intersectsFrustum(De)){Z&&Le.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ge);let Me=le.update(T),Ce=T.material;Ce.visible&&w.push(T,Me,Ce,$,Le.z,null,B)}}else if(T.isMesh||T.isLine||T.isPoints){let De=B.isArrayCamera?ae:ie;if(!T.frustumCulled||T.intersectsFrustum(De)){let Me=le.update(T),Ce=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Le.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Le.copy(Me.boundingSphere.center)),Le.applyMatrix4(T.matrixWorld).applyMatrix4(ge)),Array.isArray(Ce)){let Be=Me.groups;for(let nt=0,pt=Be.length;nt<pt;nt++){let Ue=Be[nt],mt=Ce[Ue.materialIndex];mt&&mt.visible&&w.push(T,Me,mt,$,Le.z,Ue,B)}}else Ce.visible&&w.push(T,Me,Ce,$,Le.z,null,B)}}}let Se=T.children;for(let De=0,Me=Se.length;De<Me;De++)ch(Se[De],B,$,Z)}function ud(T,B,$,Z){let{opaque:J,transmissive:Se,transparent:De}=T;b.setupLightsView($),oe===!0&&te.setGlobalState(C.clippingPlanes,$),Z&&ue.viewport(H.copy(Z)),J.length>0&&Fo(J,B,$),Se.length>0&&Fo(Se,B,$),De.length>0&&Fo(De,B,$),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function fd(T,B,$,Z){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[Z.id]===void 0){let Ue=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[Z.id]=new kn(1,1,{generateMipmaps:!0,type:Ue?fi:Fn,minFilter:Un,samples:Math.max(4,St.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:lt.workingColorSpace})}let Se=b.state.transmissionRenderTarget[Z.id],De=Z.viewport||H;Se.setSize(De.z*C.transmissionResolutionScale,De.w*C.transmissionResolutionScale);let Me=C.getRenderTarget(),Ce=C.getActiveCubeFace(),Be=C.getActiveMipmapLevel();C.setRenderTarget(Se),C.getClearColor(O),re=C.getClearAlpha(),re<1&&C.setClearColor(16777215,.5),C.clear(),tt&&F.render($);let nt=C.toneMapping;C.toneMapping=Si;let pt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),b.setupLightsView(Z),oe===!0&&te.setGlobalState(C.clippingPlanes,Z),Fo(T,$,Z),ee.updateMultisampleRenderTarget(Se),ee.updateRenderTargetMipmap(Se),it.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let mt=0,Kt=B.length;mt<Kt;mt++){let Bt=B[mt],{object:Nt,geometry:gn,material:Fe,group:wn}=Bt;if(Fe.side===Gt&&Nt.layers.test(Z.layers)){let bt=Fe.side;Fe.side=In,Fe.needsUpdate=!0,dd(Nt,$,Z,gn,Fe,wn),Fe.side=bt,Fe.needsUpdate=!0,Ue=!0}}Ue===!0&&(ee.updateMultisampleRenderTarget(Se),ee.updateRenderTargetMipmap(Se))}C.setRenderTarget(Me,Ce,Be),C.setClearColor(O,re),pt!==void 0&&(Z.viewport=pt),C.toneMapping=nt}function Fo(T,B,$){let Z=B.isScene===!0?B.overrideMaterial:null;for(let J=0,Se=T.length;J<Se;J++){let De=T[J],{object:Me,geometry:Ce,group:Be}=De,nt=De.material;nt.allowOverride===!0&&Z!==null&&(nt=Z),Me.layers.test($.layers)&&dd(Me,B,$,Ce,nt,Be)}}function dd(T,B,$,Z,J,Se){z!==null&&J.isNodeMaterial&&z.setObject(T,J),T.onBeforeRender(C,B,$,Z,J,Se),T.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),J.onBeforeRender(C,B,$,Z,T,Se),J.transparent===!0&&J.side===Gt&&J.forceSinglePass===!1?(J.side=In,J.needsUpdate=!0,C.renderBufferDirect($,B,Z,J,T,Se),J.side=$n,J.needsUpdate=!0,C.renderBufferDirect($,B,Z,J,T,Se),J.side=Gt):C.renderBufferDirect($,B,Z,J,T,Se),T.onAfterRender(C,B,$,Z,J,Se)}function pd(T){let B=0;for(let $ of T)$.texture!==null&&B++;return B}function da(T,B,$){B.isScene!==!0&&(B=et);let Z=Ge.get(T),J=b.state.lights,Se=b.state.shadowsArray,De=J.state.version,Me=se.getParameters(T,J.state,Se,B,$,b.state.lightProbeGridArray),Ce=se.getProgramCacheKey(Me),Be=Z.programs;Z.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?B.environment:null,Z.fog=B.fog;let nt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;Z.envMap=R.get(T.envMap||Z.environment,nt),Z.envMapRotation=Z.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Be===void 0&&(T.addEventListener("dispose",Rt),Be=new Map,Z.programs=Be,Z.programVariants=new Map);let pt=Be.get(Ce);if(pt!==void 0){if(Z.currentProgram===pt&&Z.lightsStateVersion===De)return gd(T,Me),pt}else Me.uniforms=se.getUniforms(T),z!==null&&T.isNodeMaterial&&z.build(T,$,Me),T.onBeforeCompile(Me,C),pt=se.acquireProgram(Me,Ce),Be.set(Ce,pt),Z.uniforms=Me.uniforms;let Ue=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ue.clippingPlanes=te.uniform),gd(T,Me),Z.needsLights=cg(T),Z.lightsStateVersion=De,Z.needsLights&&(Ue.ambientLightColor.value=J.state.ambient,Ue.lightProbe.value=J.state.probe,Ue.sunLights.value=J.state.sun,Ue.sunLightShadows.value=J.state.sunShadow,Ue.directionalLights.value=J.state.directional,Ue.directionalLightShadows.value=J.state.directionalShadow,Ue.spotLights.value=J.state.spot,Ue.spotLightShadows.value=J.state.spotShadow,Ue.rectAreaLights.value=J.state.rectArea,Ue.ltc_1.value=J.state.rectAreaLTC1,Ue.ltc_2.value=J.state.rectAreaLTC2,Ue.pointLights.value=J.state.point,Ue.pointLightShadows.value=J.state.pointShadow,Ue.hemisphereLights.value=J.state.hemi,Ue.sunShadowMatrix.value=J.state.sunShadowMatrix,Ue.sunShadowCascade.value=J.state.sunShadowCascade,Ue.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Ue.spotLightMatrix.value=J.state.spotLightMatrix,Ue.spotLightMap.value=J.state.spotLightMap,Ue.pointShadowMatrix.value=J.state.pointShadowMatrix),Z.numLightProbeGrids=pd(b.state.lightProbeGridArray),Z.currentProgram=pt,Z.uniformsList=null,pt}function ag(T,B,$,Z,J){let Se=Ge.get(T),De=Se.currentProgram.id+","+Z+","+J,Me=Se.programVariants.get(De);return Me===void 0?(Me=da(T,B,$),Se.programVariants.set(De,Me)):(Se.currentProgram=Me,Se.uniformsList=null,Se.outputColorSpace=Z,Se.toneMapping=J),Me}function md(T){if(T.uniformsList===null){let B=T.currentProgram.getUniforms();T.uniformsList=ea.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function gd(T,B){let $=Ge.get(T);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function og(T,B,$,Z,J){B.isScene!==!0&&(B=et),ee.resetTextureUnits();let Se=B.fog,De=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?B.environment:null,Me=K===null?C.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:lt.workingColorSpace,Ce=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Be=R.get(Z.envMap||De,Ce),nt=Z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pt=!!$.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ue=!!$.morphAttributes.position,mt=!!$.morphAttributes.normal,Kt=!!$.morphAttributes.color,Bt=Si;Z.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Bt=C.toneMapping);let Nt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,gn=Nt!==void 0?Nt.length:0,Fe=Ge.get(Z),wn=b.state.lights;if(oe===!0&&(Ee===!0||T!==V)){let Wt=T===V&&Z.id===A;te.setState(Z,T,Wt)}let bt=!1,Cs=!1;Z.version===Fe.__version?Fe.needsLights&&Fe.lightsStateVersion!==wn.state.version||J.isBatchedMesh&&Fe.batching===!1||!J.isBatchedMesh&&Fe.batching===!0||J.isBatchedMesh&&Fe.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&Fe.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&Fe.instancing===!1||!J.isInstancedMesh&&Fe.instancing===!0||J.isSkinnedMesh&&Fe.skinning===!1||!J.isSkinnedMesh&&Fe.skinning===!0||J.isInstancedMesh&&Fe.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Fe.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Fe.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Fe.instancingMorph===!1&&J.morphTexture!==null||Fe.envMap!==Be||Z.fog===!0&&Fe.fog!==Se||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==te.numPlanes||Fe.numIntersection!==te.numIntersection)||Fe.vertexAlphas!==nt||Fe.vertexTangents!==pt||Fe.morphTargets!==Ue||Fe.morphNormals!==mt||Fe.morphColors!==Kt||Fe.morphTargetsCount!==gn||Fe.numLightProbeGrids!==pd(b.state.lightProbeGridArray)?bt=!0:(Fe.outputColorSpace!==Me||Fe.toneMapping!==Bt)&&(Cs=!0):(bt=!0,Fe.__version=Z.version);let xn=Fe.currentProgram;(bt===!0||Cs===!0)&&(xn=Cs===!0?ag(Z,B,J,Me,Bt):da(Z,B,J),z&&Z.isNodeMaterial&&z.onUpdateProgram(Z,xn,Fe));let Oo=!1,is=!1,Is=!1,_t=xn.getUniforms(),pn=Fe.uniforms;if(ue.useProgram(xn.program)&&(Oo=!0,is=!0,Is=!0),Z.id!==A&&(A=Z.id,is=!0),Oo||V!==T){ue.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),_t.setValue(U,"projectionMatrix",T.projectionMatrix),_t.setValue(U,"viewMatrix",T.matrixWorldInverse);let fn=_t.map.cameraPosition;fn!==void 0&&fn.setValue(U,He.setFromMatrixPosition(T.matrixWorld)),St.logarithmicDepthBuffer&&_t.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&_t.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),V!==T&&(V=T,is=!0,Is=!0)}if(Fe.needsLights&&(wn.state.sunShadowMap.length>0&&_t.setValue(U,"sunShadowMap",wn.state.sunShadowMap,ee),wn.state.directionalShadowMap.length>0&&_t.setValue(U,"directionalShadowMap",wn.state.directionalShadowMap,ee),wn.state.spotShadowMap.length>0&&_t.setValue(U,"spotShadowMap",wn.state.spotShadowMap,ee),wn.state.pointShadowMap.length>0&&_t.setValue(U,"pointShadowMap",wn.state.pointShadowMap,ee)),J.isSkinnedMesh){_t.setOptional(U,J,"bindMatrix"),_t.setOptional(U,J,"bindMatrixInverse");let Wt=J.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),_t.setValue(U,"boneTexture",Wt.boneTexture,ee))}J.isBatchedMesh&&(_t.setOptional(U,J,"batchingTexture"),_t.setValue(U,"batchingTexture",J._matricesTexture,ee),_t.setOptional(U,J,"batchingIdTexture"),_t.setValue(U,"batchingIdTexture",J._indirectTexture,ee),_t.setOptional(U,J,"batchingColorTexture"),J._colorsTexture!==null&&_t.setValue(U,"batchingColorTexture",J._colorsTexture,ee));let ri=$.morphAttributes;if((ri.position!==void 0||ri.normal!==void 0||ri.color!==void 0)&&ne.update(J,$,xn),(is||Fe.receiveShadow!==J.receiveShadow)&&(Fe.receiveShadow=J.receiveShadow,_t.setValue(U,"receiveShadow",J.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&B.environment!==null&&(pn.envMapIntensity.value=B.environmentIntensity),pn.dfgLUT!==void 0&&(pn.dfgLUT.value=PM()),is){if(_t.setValue(U,"toneMappingExposure",C.toneMappingExposure),Fe.needsLights&&lg(pn,Is),Se&&Z.fog===!0&&xe.refreshFogUniforms(pn,Se),xe.refreshMaterialUniforms(pn,Z,me,Ie,b.state.transmissionRenderTarget[T.id]),Fe.needsLights&&Fe.numLightProbeGrids>0){let Wt=M,fn=0;for(let Ii of b.state.lightProbeGridArray)Ii.texture!==null&&(Wt.textures[fn]=Ii.texture,Wt.min[fn]=Ii.boundingBox.min,Wt.max[fn]=Ii.boundingBox.max,Wt.resolution[fn]=Ii.resolution,fn++);for(let Ii in Wt)Wt[Ii].length=fn;pn.probesSH.value=Wt.textures,pn.probesMin.value=Wt.min,pn.probesMax.value=Wt.max,pn.probesResolution.value=Wt.resolution}ea.upload(U,md(Fe),pn,ee)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ea.upload(U,md(Fe),pn,ee),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&_t.setValue(U,"center",J.center),_t.setValue(U,"modelViewMatrix",J.modelViewMatrix),_t.setValue(U,"normalMatrix",J.normalMatrix),_t.setValue(U,"modelMatrix",J.matrixWorld),Z.uniformsGroups!==void 0){let Wt=Z.uniformsGroups;for(let fn=0,Ii=Wt.length;fn<Ii;fn++){let _d=Wt[fn];ke.update(_d,xn),ke.bind(_d,xn)}}return xn}function lg(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.sunLights.needsUpdate=B,T.sunLightShadows.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function cg(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(T,B,$){let Z=Ge.get(T);Z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Ge.get(T.texture).__webglTexture=B,Ge.get(T.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:$,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,B){let $=Ge.get(T);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,$=0){K=T,G=B,L=$;let Z=null,J=!1,Se=!1;if(T){let Me=Ge.get(T);if(Me.__useDefaultFramebuffer!==void 0){ue.bindFramebuffer(U.FRAMEBUFFER,Me.__webglFramebuffer),H.copy(T.viewport),W.copy(T.scissor),k=T.scissorTest,ue.viewport(H),ue.scissor(W),ue.setScissorTest(k),A=-1;return}else if(Me.__webglFramebuffer===void 0)ee.setupRenderTarget(T);else if(Me.__hasExternalTextures)ee.rebindTextures(T,Ge.get(T.texture).__webglTexture,Ge.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let nt=T.depthTexture;if(Me.__boundDepthTexture!==nt){if(nt!==null&&Ge.has(nt)&&(T.width!==nt.image.width||T.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(T)}}let Ce=T.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(Se=!0);let Be=Ge.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[B])?Z=Be[B][$]:Z=Be[B],J=!0):T.samples>0&&ee.useMultisampledRTT(T)===!1?Z=Ge.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?Z=Be[$]:Z=Be,H.copy(T.viewport),W.copy(T.scissor),k=T.scissorTest}else H.copy(Ne).multiplyScalar(me).floor(),W.copy(Ke).multiplyScalar(me).floor(),k=Qe;if($!==0&&(Z=X),ue.bindFramebuffer(U.FRAMEBUFFER,Z)&&ue.drawBuffers(T,Z),ue.viewport(H),ue.scissor(W),ue.setScissorTest(k),J){let Me=Ge.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,Me.__webglTexture,$)}else if(Se){let Me=B;for(let Ce=0;Ce<T.textures.length;Ce++){let Be=Ge.get(T.textures[Ce]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ce,Be.__webglTexture,$,Me)}}else if(T!==null&&$!==0){let Me=Ge.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Me.__webglTexture,$)}A=-1};function xd(T){let B=Ge.get(T);return(B.__readFormat!==T.format||B.__readType!==T.type)&&(B.__readFormat=T.format,B.__readType=T.type,B.__formatReadable=St.textureFormatReadable(T.format),B.__typeReadable=St.textureTypeReadable(T.type)),B}this.readRenderTargetPixels=function(T,B,$,Z,J,Se,De,Me=0){if(!(T&&T.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ge.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Ce=Ce[De],Array.isArray(Ce)&&(Ce=Ce[0])),Ce){ue.bindFramebuffer(U.FRAMEBUFFER,Ce);try{let Be=T.textures[Me],nt=Be.format,pt=Be.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Me);let Ue=xd(Be);if(Ue.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ue.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-Z&&$>=0&&$<=T.height-J&&U.readPixels(B,$,Z,J,fe.convert(nt),fe.convert(pt),Se)}finally{let Be=K!==null?Ge.get(K).__webglFramebuffer:null;ue.bindFramebuffer(U.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(T,B,$,Z,J,Se,De,Me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Ge.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Ce=Ce[De],Array.isArray(Ce)&&(Ce=Ce[0])),Ce)if(B>=0&&B<=T.width-Z&&$>=0&&$<=T.height-J){ue.bindFramebuffer(U.FRAMEBUFFER,Ce);let Be=T.textures[Me],nt=Be.format,pt=Be.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Me);let Ue=xd(Be);if(Ue.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let mt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,mt),U.bufferData(U.PIXEL_PACK_BUFFER,Se.byteLength,U.STREAM_READ),U.readPixels(B,$,Z,J,fe.convert(nt),fe.convert(pt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Kt=K!==null?Ge.get(K).__webglFramebuffer:null;ue.bindFramebuffer(U.FRAMEBUFFER,Kt);let Bt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await c0(U,Bt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,mt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Se),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(mt),U.deleteSync(Bt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,B=null,$=0){let Z=Math.pow(2,-$),J=Math.floor(T.image.width*Z),Se=Math.floor(T.image.height*Z),De=B!==null?B.x:0,Me=B!==null?B.y:0;ee.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,De,Me,J,Se),ue.unbindTexture()},this.copyTextureToTexture=function(T,B,$=null,Z=null,J=0,Se=0){let De,Me,Ce,Be,nt,pt,Ue,mt,Kt,Bt=T.isCompressedTexture?T.mipmaps[Se]:T.image;if($!==null)De=$.max.x-$.min.x,Me=$.max.y-$.min.y,Ce=$.isBox3?$.max.z-$.min.z:1,Be=$.min.x,nt=$.min.y,pt=$.isBox3?$.min.z:0;else{let _t=Math.pow(2,-J);De=Math.floor(Bt.width*_t),Me=Math.floor(Bt.height*_t),T.isDataArrayTexture?Ce=Bt.depth:T.isData3DTexture?Ce=Math.floor(Bt.depth*_t):Ce=1,Be=0,nt=0,pt=0}Z!==null?(Ue=Z.x,mt=Z.y,Kt=Z.z):(Ue=0,mt=0,Kt=0);let Nt=fe.convert(B.format),gn=fe.convert(B.type),Fe;B.isData3DTexture?(ee.setTexture3D(B,0),Fe=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(ee.setTexture2DArray(B,0),Fe=U.TEXTURE_2D_ARRAY):(ee.setTexture2D(B,0),Fe=U.TEXTURE_2D),ue.activeTexture(U.TEXTURE0),ue.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),ue.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),ue.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);let wn=ue.getParameter(U.UNPACK_ROW_LENGTH),bt=ue.getParameter(U.UNPACK_IMAGE_HEIGHT),Cs=ue.getParameter(U.UNPACK_SKIP_PIXELS),xn=ue.getParameter(U.UNPACK_SKIP_ROWS),Oo=ue.getParameter(U.UNPACK_SKIP_IMAGES);ue.pixelStorei(U.UNPACK_ROW_LENGTH,Bt.width),ue.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Bt.height),ue.pixelStorei(U.UNPACK_SKIP_PIXELS,Be),ue.pixelStorei(U.UNPACK_SKIP_ROWS,nt),ue.pixelStorei(U.UNPACK_SKIP_IMAGES,pt);let is=T.isDataArrayTexture||T.isData3DTexture,Is=B.isDataArrayTexture||B.isData3DTexture;if(T.isDepthTexture){let _t=Ge.get(T),pn=Ge.get(B),ri=Ge.get(_t.__renderTarget),Wt=Ge.get(pn.__renderTarget);ue.bindFramebuffer(U.READ_FRAMEBUFFER,ri.__webglFramebuffer),ue.bindFramebuffer(U.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let fn=0;fn<Ce;fn++)is&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ge.get(T).__webglTexture,J,pt+fn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ge.get(B).__webglTexture,Se,Kt+fn)),U.blitFramebuffer(Be,nt,Be+De,nt+Me,Ue,mt,Ue+De,mt+Me,U.DEPTH_BUFFER_BIT,U.NEAREST);ue.bindFramebuffer(U.READ_FRAMEBUFFER,null),ue.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(J!==0||T.isRenderTargetTexture||Ge.has(T)){let _t=Ge.get(T),pn=Ge.get(B);ue.bindFramebuffer(U.READ_FRAMEBUFFER,D),ue.bindFramebuffer(U.DRAW_FRAMEBUFFER,q);for(let ri=0;ri<Ce;ri++)is?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,_t.__webglTexture,J,pt+ri):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,_t.__webglTexture,J),Is?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,pn.__webglTexture,Se,Kt+ri):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pn.__webglTexture,Se),J!==0?U.blitFramebuffer(Be,nt,Be+De,nt+Me,Ue,mt,Ue+De,mt+Me,U.COLOR_BUFFER_BIT,U.NEAREST):Is?U.copyTexSubImage3D(Fe,Se,Ue,mt,Kt+ri,Be,nt,De,Me):U.copyTexSubImage2D(Fe,Se,Ue,mt,Be,nt,De,Me);ue.bindFramebuffer(U.READ_FRAMEBUFFER,null),ue.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Is?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Fe,Se,Ue,mt,Kt,De,Me,Ce,Nt,gn,Bt.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(Fe,Se,Ue,mt,Kt,De,Me,Ce,Nt,Bt.data):U.texSubImage3D(Fe,Se,Ue,mt,Kt,De,Me,Ce,Nt,gn,Bt):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Se,Ue,mt,De,Me,Nt,gn,Bt.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Se,Ue,mt,Bt.width,Bt.height,Nt,Bt.data):U.texSubImage2D(U.TEXTURE_2D,Se,Ue,mt,De,Me,Nt,gn,Bt);ue.pixelStorei(U.UNPACK_ROW_LENGTH,wn),ue.pixelStorei(U.UNPACK_IMAGE_HEIGHT,bt),ue.pixelStorei(U.UNPACK_SKIP_PIXELS,Cs),ue.pixelStorei(U.UNPACK_SKIP_ROWS,xn),ue.pixelStorei(U.UNPACK_SKIP_IMAGES,Oo),Se===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&U.generateMipmap(Fe),ue.unbindTexture()},this.initRenderTarget=function(T){Ge.get(T).__webglFramebuffer===void 0&&ee.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ee.setTextureCube(T,0):T.isData3DTexture?ee.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ee.setTexture2DArray(T,0):ee.setTexture2D(T,0),ue.unbindTexture()},this.resetState=function(){G=0,L=0,K=null,ue.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}};var rf=["diver","warden","drill","kestrel","engine"];function $0(){let s=new Zi,e=new Map,t=new Map;function n(i){if(!rf.includes(i)||e.has(i))return Promise.resolve(!0);if(!t.has(i)){let r="./art/"+i+"-skin.webp",a=s.loadAsync(r).catch(()=>s.loadAsync(r)).then(o=>(o.colorSpace=gt,e.set(i,o),!0)).catch(()=>!1).finally(()=>t.delete(i));t.set(i,a)}return t.get(i)}return{get:i=>e.get(i),prepare:n}}function j0(s,e,t){let n=t.clone(),i=[];s.updateMatrixWorld(!0);let r=s.matrixWorld.clone().invert(),a=new Ve,o=new P,c=.52,l=Math.cos(c),h=Math.sin(c),f=1/0,u=-1/0,d=1/0,p=-1/0;s.traverse(x=>{if(!x.isMesh||x.material!==t)return;let g=x.geometry,m=g.getAttribute("position"),_=g.getAttribute("normal"),y=new Float32Array(m.count*3);a.multiplyMatrices(r,x.matrixWorld);let M=new $e().getNormalMatrix(a);for(let w=0;w<m.count;w++){o.fromBufferAttribute(m,w).applyMatrix4(a);let b=o.y*l-o.z*h;f=Math.min(f,o.x),u=Math.max(u,o.x),d=Math.min(d,b),p=Math.max(p,b),y[3*w]=o.x,y[3*w+1]=b,o.fromBufferAttribute(_,w).applyMatrix3(M).normalize(),y[3*w+2]=Xe.smoothstep(o.y*h+o.z*l,-.34,.35)}i.push([g,y,x])});for(let[x,g,m]of i){for(let _=0;_<g.length;_+=3)g[_]=.014+.972*(g[_]-f)/(u-f),g[_+1]=.015+.97*(g[_+1]-d)/(p-d);x.setAttribute("portraitUv",new zt(g,3)),m.material=n}n.onBeforeCompile=x=>{x.uniforms.paintedSurface={value:e},x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 portraitUv;varying vec3 paintCoord;varying vec3 sculpture;`).replace("#include <begin_vertex>",`#include <begin_vertex>
paintCoord=portraitUv;sculpture=position;`),x.fragmentShader=x.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D paintedSurface;varying vec3 paintCoord;varying vec3 sculpture;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec4 skin=texture2D(paintedSurface,paintCoord.xy);
        vec3 base=diffuseColor.rgb;
        float baseL=dot(base,vec3(.26,.55,.19));float skinL=dot(skin.rgb,vec3(.26,.55,.19));
        float contrast=clamp(pow((skinL+.075)/(.27+.075),.47),.54,1.65);
        float weight=skin.a*paintCoord.z;
        diffuseColor.rgb=mix(base, mix(base*contrast,skin.rgb,.50),weight*.83);
        float grain=sin(sculpture.x*29.+sin(sculpture.y*18.))*sin(sculpture.z*24.+sculpture.y*13.);
        diffuseColor.rgb*=1.+.032*grain;`)}}var Q0=`
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
  }`;function em(s,e){let n={diver:4,warden:2.79,drill:3.13,kestrel:4.55,engine:4.11}[s],i=n*e.image.height/e.image.width,r=new Ft({uniforms:{paint:{value:e},motion:{value:new xt},kind:{value:rf.indexOf(s)},fall:{value:0},bodyWidth:{value:n},bodyHeight:{value:i},hit:{value:0}},vertexShader:Q0,fragmentShader:`varying vec2 tex;uniform sampler2D paint;uniform float hit;
   void main(){vec4 p=texture2D(paint,tex);if(p.a<.27)discard;gl_FragColor=vec4(mix(p.rgb,vec3(1.,.76,.42),hit*.29),p.a);
   #include <colorspace_fragment>
   }`,side:Gt,alphaToCoverage:!0}),a=new je(new kt(1,1,30,30),r);return a.frustumCulled=!1,{mesh:a,pose(o){let c=r.uniforms;c.motion.value.set(s==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),c.fall.value=o.down,c.hit.value=o.hit}}}var LM={captain:[[.43,.77,.31,.24,.99],[.44,.48,.34,.2,.83],[.16,.49,.16,.19,.65],[.8,.49,.18,.22,.71],[.84,.76,.13,.34,.92],[.43,.17,.18,.23,.74],[.65,.2,.14,.22,.69]],infantry:[[.5,.76,.38,.24,.98],[.5,.47,.28,.22,.85],[.19,.47,.15,.2,.6],[.82,.46,.14,.2,.62],[.37,.2,.19,.23,.69],[.66,.2,.17,.22,.65],[.46,.09,.17,.1,.76]],diver:[[.5,.64,.29,.27,1],[.2,.29,.17,.2,.82],[.82,.28,.17,.2,.82],[.5,.49,.15,.13,.62]],warden:[[.5,.7,.36,.32,1.04],[.53,.42,.22,.19,.75],[.64,.44,.12,.19,.98],[.24,.18,.15,.22,.59],[.76,.18,.14,.21,.59]],drill:[[.36,.47,.26,.27,1.02],[.68,.27,.25,.21,.72],[.7,.8,.25,.16,.65]],kestrel:[[.51,.48,.15,.27,.95],[.5,.34,.12,.13,.82],[.3,.18,.15,.17,.5],[.71,.26,.14,.13,.52]],engine:[[.5,.6,.3,.32,.95],[.5,.37,.18,.19,.83],[.31,.82,.14,.18,.65],[.69,.82,.14,.18,.65]]};function qc(s,e,t,n){let i=s==="infantry"||s==="captain",r=s==="captain"?44:i?22:80,o=Math.max(i?30:54,Math.round(r*e.image.height/e.image.width)),c=document.createElement("canvas");c.width=r+1,c.height=o+1;let l=c.getContext("2d",{willReadFrequently:!0});l.drawImage(e.image,0,0,r+1,o+1);let h=l.getImageData(0,0,r+1,o+1).data,f=(r+1)*(o+1),u=new Float32Array(f);for(let b=0;b<f;b++)u[b]=h[b*4+3]>88?1e3:0;for(let b=1;b<o;b++)for(let v=1;v<r;v++){let S=b*(r+1)+v;u[S]=Math.min(u[S],u[S-1]+1,u[S-r-1]+1,u[S-r-2]+1.414)}for(let b=o-1;b>0;b--)for(let v=r-1;v>0;v--){let S=b*(r+1)+v;u[S]=Math.min(u[S],u[S+1]+1,u[S+r+1]+1,u[S+r+2]+1.414)}let d=[],p=[],x=[],g=[],m=new Uint8Array(r*o),_=i?.43:.64,y=Math.cos(_),M=Math.sin(_);for(let b of[!0,!1])for(let v=0;v<=o;v++)for(let S=0;S<=r;S++){let I=v*(r+1)+S,C=S/r,N=1-v/o,z=0;for(let[A,V,H,W,k]of LM[s])z=Math.max(z,k*Math.exp(-1.6*(((C-A)/H)**2+((N-V)/W)**2)));let X=Math.min(1,u[I]/(r*.11)),D=i?Xe.smoothstep(X,0,1)*Xe.smoothstep(h[I*4+3],65,215):Math.pow(X,.6),q=(.28*h[I*4]+.55*h[I*4+1]+.17*h[I*4+2])/255,G=(.023+D*((s==="kestrel"?.085:.2)+z*.86))*Math.min(1.26,t/3),L=b?G*(.87+q*.13):-(i?.67:.99)*G,K=N*n;d.push((C-.5)*t,K*y+L*M+.025,(i?.09:.46)-K*M+L*y),p.push(C,N),g.push(b?1:0)}for(let b=0;b<o;b++)for(let v=0;v<r;v++){let S=b*(r+1)+v;m[b*r+v]=[S,S+1,S+r+1,S+r+2].some(I=>h[I*4+3]>80)?1:0}for(let b=0;b<o;b++)for(let v=0;v<r;v++){if(!m[b*r+v])continue;let S=b*(r+1)+v,I=S+1,C=S+r+1,N=C+1;x.push(S,C,I,I,C,N,S+f,I+f,C+f,I+f,N+f,C+f);let z=(X,D)=>x.push(X,D,X+f,D,D+f,X+f);(!v||!m[b*r+v-1])&&z(C,S),(v===r-1||!m[b*r+v+1])&&z(I,N),(!b||!m[(b-1)*r+v])&&z(S,I),(b===o-1||!m[(b+1)*r+v])&&z(N,C)}let w=new vt;return w.setAttribute("position",new Ye(d,3)),w.setAttribute("uv",new Ye(p,2)),w.setAttribute("surface",new Ye(g,1)),w.setIndex(x),w.computeVertexNormals(),w}function tm(s,e){let t={diver:4.12,warden:2.9,drill:3.15,kestrel:4.43,engine:4.08}[s],n=t*e.image.height/e.image.width,i=qc(s,e,t,n),r=new Ft({side:Gt,alphaToCoverage:!0,uniforms:{paint:{value:e},motion:{value:new xt},kind:{value:rf.indexOf(s)},fall:{value:0},bodyWidth:{value:t},bodyHeight:{value:n},hit:{value:0}},vertexShader:Q0.replace("varying vec2 tex;","attribute float surface;varying float cap;varying vec3 ns;varying vec2 tex;").replace("tex=uv;","tex=uv;cap=surface;ns=normalize(normalMatrix*normal);").replace("gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);",`
     vec3 sculpt=position;
     sculpt.x+=drawX*bodyWidth;sculpt.y+=drawY*bodyHeight*.84;sculpt.z-=drawY*bodyHeight*.44;
     sculpt.z+=depth+foot*base*walk*.16;
     if(kind>1.5 && kind<2.5){float jaw=(1.-smoothstep(.12,.24,abs(x+.12)))*(1.-smoothstep(.11,.23,abs(y-.30)));sculpt.y-=jaw*(windup*.10+act*.15);}
     if(kind>2.5 && kind<3.5)sculpt.z+=edge*(.19*sin(beat)-fall*.42);
     gl_Position=projectionMatrix*modelViewMatrix*vec4(sculpt,1.);`),fragmentShader:`varying vec2 tex;varying float cap;varying vec3 ns;uniform sampler2D paint;uniform float hit;
     void main(){vec4 p=texture2D(paint,tex);if(p.a<.25)discard;
       float light=.86+.16*max(0.,dot(normalize(ns),normalize(vec3(-.52,.76,.56))));
       vec3 rgb=p.rgb*light*mix(.48,1.,cap);
       gl_FragColor=vec4(mix(rgb,vec3(1.,.78,.42),hit*.30),p.a);
       #include <colorspace_fragment>
     }`}),a=new je(i,r);return a.frustumCulled=!1,{mesh:a,pose(o){r.uniforms.motion.value.set(s==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),r.uniforms.fall.value=o.down,r.uniforms.hit.value=o.hit}}}var na=.18700000000000003,im=Math.PI*2;function nm(s){if(s<.55)return 1-2*s/.55;let e=(s-.55)/(1-.55),t=e*e*(3-2*e),n=2*(1-.55)/.55*e*(1-e)*(1-2*e);return-1+2*t-n}function vs(s,e,t){let n=s/im%1,i=(n+.5)%1;t[0]=nm(n)*e,t[1]=nm(i)*e;let r=Math.max(n,i),a=r>.55?Math.sin(Math.PI*(r-.55)/(1-.55))**2:0;return t[2]=(r===n?1:-1)*a*e,t}function ia(s){return s.phase+im*s.marched/(.68*s.size)}function af(s,e,t,n,i){let r=s==="captain",a=s!=="red",o=r?qc("captain",e,1.13,1.73):qc("infantry",e,a?.47:.53,.86);o.setAttribute("stepPose",n);let c=new Ft({side:$n,alphaToCoverage:!0,defines:r?{CAPTAIN:1}:{},uniforms:{recoil:{value:0},lean:{value:0},portrait:{value:e},reverse:{value:t},facing:{value:a?-1:1}},vertexShader:`
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
        float isRight = smoothstep(-0.04, 0.04, lateral);
        float stride = mix(stepPose.z, stepPose.y, isRight);
        float lift = max(0., (isRight * 2. - 1.) * stepPose.w);
        float leg = 1. - smoothstep(0.15, 0.43, uv.y);
        float arm = smoothstep(0.14, 0.33, abs(lateral))
                  * smoothstep(0.27, 0.41, uv.y) * (1.-smoothstep(0.47, 0.64, uv.y));
        vec3 p = position;
        p.z += facing * stride * (${na} * leg - 0.105 * arm);
        p.y += 0.104 * lift * leg + 0.019 * abs(stepPose.w) * (1. - leg) + stride * arm * 0.038;
        p.x += 0.014 * stepPose.y * uv.y + arm * stride * 0.018;
        #ifdef CAPTAIN
          float shoulder = smoothstep(.53, .73, tex.x) * smoothstep(.41, .61, tex.y);
          p.x += .079 + lean * tex.y * .14 + shoulder * recoil * .026;
          p.z += facing * stride * (.078 * leg - .032 * arm) + shoulder * recoil * .21;
          p.y -= shoulder * recoil * .082;
        #endif
        normalView = normalize(normalMatrix * mat3(instanceMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.);
      }`,fragmentShader:`
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
        float light = .87 + .17 * max(0., dot(normalize(normalView), normalize(vec3(-.52,.76,.56))));
        color *= light;
        if (flash <= -1.) {
          vec3 faded = mix(color, vec3(dot(color, vec3(.30,.59,.11))), .36) * .74;
          color = mix(faded, vec3(1.,.85,.64), clamp(-flash-1.,0.,1.)*.67);
        }
        color = mix(color, vec3(1.,.70,.16), clamp(flash,0.,1.)*.86);
        gl_FragColor = vec4(color, coverage);
        #include <colorspace_fragment>
      }`}),l=new tn(o,c,i);return l.name=r?"\u84DD\u961F\u91CD\u70AE\u961F\u957F":a?"\u84DD\u961F\u91CE\u6218\u5236\u670D":"\u7EA2\u961F\u91CE\u6218\u5236\u670D",l.count=0,l.frustumCulled=!1,l}function sm(s,e){let t=new Float32Array(3),n=new en(new Float32Array(4),4).setUsage(Mn),i=af("captain",s,e,n,1);return i.setMatrixAt(0,new Ve),i.count=1,{mesh:i,pose(r,a,o,c,l){vs(r*9.03,a,t),n.setXYZW(0,Math.min(.66,l*.55),t[0],t[1],t[2]),n.needsUpdate=!0,i.material.uniforms.lean.value=c,i.material.uniforms.recoil.value=o}}}function Ro(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new vt;c.morphTargetsRelative=o;let l=0;for(let h=0;h<s.length;++h){let f=s[h],u=0,d=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in f.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[p].length!==s[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(f.morphAttributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(t){let h=0,f=[];for(let u=0;u<s.length;++u){let d=s[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=s[u].attributes.position.count}c.setIndex(f)}for(let h in r){let f=rm(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let x=0;x<a[h].length;++x)d.push(a[h][x][u]);let p=rm(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function rm(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new zt(a,t,n),c=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute){let f=c/t;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<t;p++){let x=h.getComponent(u,p);o.setComponent(u+f,p,x)}}else a.set(h.array,c);c+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function of(s,e){if(e===Ru)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===jr||e===So){let t=s.getIndex();if(t===null){let r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===jr)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var NM=Math.PI*2,Sn=[0,0,0],ys={blue:1085152,blueShade:479381,ice:7985151,navy:1453392,skin:15840638,skinShade:13208928,khaki:13675111,tan:11960903,leather:5518632,dark:2434352,gun:2504008,steel:8492968,red:15150389,wine:9377830,orange:16756781,gold:15775821};function DM(s,e=16,t=1,n=null){let i=[],r=[],a=n?e+1:e,o=n?n[0]:0,c=n?n[1]-n[0]:NM;for(let[h,f,u,d=0,p=0]of s)for(let x=0;x<a;x++){let g=o+c*x/e,m=Math.sin(g),_=Math.cos(g);i.push(d+f*Math.sign(m)*Math.abs(m)**t,h,p+u*Math.sign(_)*Math.abs(_)**t)}for(let h=0;h<s.length-1;h++)for(let f=0;f<e;f++){let u=n?f+1:(f+1)%a,d=h*a+f,p=h*a+u;r.push(d,p,d+a,p,p+a,d+a)}if(!n)for(let h of[!1,!0]){let f=h?s.length-1:0,[u,,,d=0,p=0]=s[f],x=i.length/3;i.push(d,u,p);let g=f*a;for(let m=0;m<e;m++){let _=g+m,y=g+(m+1)%e;h?r.push(x,_,y):r.push(x,y,_)}}let l=new vt;return l.setAttribute("position",new Ye(i,3)),l.setIndex(r),l.computeVertexNormals(),l}function UM(s=12,e=8){return new hi(1,s,e)}function ei(s,e,t,n=t,i=8){let r=new P(...s),a=new P(...e),o=a.clone().sub(r),c=new ln(n,t,o.length(),i);c.applyQuaternion(new an().setFromUnitVectors(new P(0,1,0),o.normalize()));let l=r.add(a).multiplyScalar(.5);return c.translate(l.x,l.y,l.z)}function Co(s,e,t=6){let n=new Gi(s.map(i=>new P(...i)));return new Zs(n,(s.length-1)*3,e,t,!1)}function FM(){let s=new Ot({vertexColors:!0,shininess:18,specular:3156007});return s.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <begin_vertex>",`#include <begin_vertex>
fabricPoint=position;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec2 stitch=vec2(fabricPoint.x+.42*fabricPoint.z,fabricPoint.y)*175.;
        vec2 weight=1.-smoothstep(vec2(.75),vec2(2.7),fwidth(stitch));
        float thread=dot(sin(stitch*3.14159),weight)*.024;
        diffuseColor.rgb*=1.+thread;`)},{cloth:s,lacquer:new Ot({vertexColors:!0,shininess:58,specular:7175302}),metal:new Ot({vertexColors:!0,shininess:78,specular:10201786})}}var ji=class{constructor(){this.byFinish=new Map}add(e,t,n=Sn,i=[1,1,1],r=Sn,a="cloth"){let o=new Ve().compose(new P(...n),new an().setFromEuler(new Qt(...r)),new P(...i));e.applyMatrix4(o),e.deleteAttribute("uv"),e.clearGroups();let c=e.attributes.position.count;e.index===null&&e.setIndex(Array.from({length:c},(f,u)=>u));let l=new Te(t),h=new Float32Array(c*3);for(let f=0;f<c;f++){let u=f*3;h[u]=l.r,h[u+1]=l.g,h[u+2]=l.b}e.setAttribute("color",new zt(h,3)),this.limb!==void 0&&e.setAttribute("limb",new Ye(new Float32Array(c).fill(this.limb),1)),this.byFinish.has(a)||this.byFinish.set(a,[]),this.byFinish.get(a).push(e)}shape(e,t,n={}){let{sides:i=16,power:r=1,arc:a=null,at:o,scale:c,rotate:l,finish:h}=n;this.add(DM(e,i,r,a),t,o,c,l,h)}ell(e,t,n,i=Sn,r="cloth",a=14,o=8){this.add(UM(a,o),e,t,n,i,r)}box(e,t,n,i=Sn,r="cloth"){this.add(new Nn(1,1,1),e,t,n,i,r)}joinGeometry(){let e=Ro([...this.byFinish.values()].flat(),!1);return e.computeBoundingSphere(),e.computeBoundingBox(),e}attach(e,t){for(let[n,i]of this.byFinish){let r=new je(Ro(i,!1),t[n]);r.castShadow=!0,e.add(r)}}};function Ms(s,e=0,t=0,n=0){let i=new Ct;return i.position.set(e,t,n),s.add(i),i}function om(s,e="near"){let t=s==="red",n=e==="far",i=new ji,r=t?15873338:1351656,a=t?11542827:1399980,o=t?10829881:12949854,c=n?6:10,l=n?5:8;for(let f of[-1,1]){i.limb=f;let u=f*.081;i.shape([[.01,.058,.105,u,-.031],[.05,.068,.11,u,-.032],[.12,.05,.067,u]],3484976,{sides:n?4:6,power:.72}),i.shape([[.075,.055,.058,u],[.22,.068,.074,u*.91],[.3,.073,.078,u*.83]],t?6701875:2906496,{sides:n?4:6})}i.limb=0,i.shape([[.235,.117,.081],[.3,.151,.114],[.42,.153,.101],[.485,.118,.084]],o,{sides:n?5:8,power:.89}),n||(i.shape([[.274,.137,.11],[.307,.151,.117]],6899252,{sides:8}),i.box(10712389,[0,.365,.097],[.093,.118,.045],[.03,0,.08]));for(let f of[-1,1]){i.limb=f*2;let u=f*.166;i.shape([[.26,.037,.044,u*1.12,-.031],[.298,.055,.06,u*1.07,-.03],[.386,.052,.057,u,.007],[.444,.05,.058,u*.91]],15772528,{sides:n?4:6}),n||i.ell(o,[u*.88,.427,.008],[.083,.078,.092],Sn,"cloth",6,3)}if(i.limb=0,i.shape([[.43,.072,.073,0,-.012],[.462,.127,.1,0,-.016],[.548,.161,.14],[.635,.162,.149]],16761484,{sides:l,power:.82}),n||(i.ell(14129257,[-.151,.546,.005],[.033,.046,.041],Sn,"cloth",5,3),i.ell(14129257,[.151,.546,.005],[.033,.046,.041],Sn,"cloth",5,3)),i.shape([[.548,.177,.162,0,.009],[.585,.221,.198],[.613,.215,.195]],a,{sides:c}),i.shape([[.595,.224,.2],[.644,.229,.211],[.744,.204,.19],[.818,.132,.124],[.847,.054,.052]],r,{sides:c}),!n){if(i.shape([[.589,.221,.201],[.605,.226,.205]],t?16145742:7194613,{sides:10}),i.limb=0,t){for(let f of[.66,.698])i.box(16768401,[0,f,-.203],[.09,.019,.017],[-.23,0,0]);i.add(ei([-.093,.449,-.096],[.107,.291,-.111],.017,.018,5),5847082),i.box(14923627,[.027,.356,-.127],[.041,.031,.014],[0,0,-.57]);for(let f of[-1,1])i.box(7422515,[f*.093,.302,-.098],[.067,.065,.04],[0,-f*.23,0]),i.box(12621402,[f*.093,.318,-.121],[.055,.018,.012]),i.box(14198113,[f*.11,.448,-.031],[.054,.019,.097],[0,0,-f*.28])}else{i.box(3690845,[0,.351,.116],[.194,.177,.086]),i.box(5010046,[0,.356,.163],[.159,.118,.02]),i.add(ei([-.109,.447,.13],[.109,.447,.13],.039,.039,8),14334075);for(let f of[-1,1])i.box(7031092,[f*.053,.372,.179],[.023,.171,.018]),i.box(14727549,[f*.053,.335,.189],[.036,.025,.014]);i.add(Co([[0,.65,.205],[0,.739,.189],[0,.808,.127],[0,.845,.05],[0,.852,-.027]],.014,6),9558778)}t||(i.limb=2,i.add(ei([.163,.264,.032],[.173,.525,-.19],.026,.026,5),ys.gun),i.add(ei([.173,.51,-.18],[.173,.656,-.268],.013,.013,5),2966610))}if(t){i.ell(a,[0,.583,-.12],[.18,.019,.133],[-.14,0,0],"cloth",8,3),i.ell(15706736,[0,.514,-.139],[.042,.042,.061],Sn,"cloth",5,3),n&&i.box(16762755,[0,.68,-.196],[.09,.027,.013],[-.28,0,0]);for(let f of[-1,1])i.ell(4336940,[f*.061,.536,-.14],[.026,.022,.015],[0,-f*.28,-f*.12],"cloth",5,3)}let h=i.joinGeometry();return h.scale(1.055,1.016,1),t&&h.rotateY(Math.PI),h.computeBoundingBox(),h}function lm(s){let e=new ji;if(s==="guard")e.box(5399670,[.12,.32,.155],[.25,.34,.065],[-.12,0,-.045]),e.box(11978175,[.12,.36,.194],[.2,.038,.014]);else if(s==="gunner")e.add(ei([.14,.33,.07],[.13,.37,.39],.04,.03,6),3490385),e.add(ei([.13,.37,.38],[.13,.38,.47],.038,.038,6),8159365);else if(s==="standard")e.add(ei([-.18,.19,-.05],[-.18,1.09,-.05],.025,.02,6),7626823),e.box(15382366,[-.18,1.08,-.04],[.078,.06,.078]),e.box(10890041,[-.01,.93,-.05],[.33,.22,.043],[-.08,0,-.09]),e.box(16767874,[-.035,.92,-.02],[.18,.043,.02]);else if(s==="courier")e.box(13744003,[.18,.34,.1],[.26,.22,.14],[0,0,-.16]),e.box(16773587,[.18,.34,.177],[.17,.145,.018]),e.box(12011077,[.18,.34,.196],[.035,.12,.01]),e.box(12011077,[.18,.34,.196],[.12,.035,.01]);else if(s==="vault")e.add(ei([.22,.07,.46],[.16,1.19,-.53],.027,.017,8),16764021),e.add(ei([.2,.32,.24],[.195,.47,.11],.033,.033,8),4411998);else{e.box(6636858,[0,.38,.12],[.23,.15,.082]);for(let t of[-.068,0,.068])e.add(ei([t,.32,.163],[t,.45,.17],.029,.029,6),14633778)}return e.joinGeometry()}function am(s,e,t){let n=Ms(s,e*.117,.607,0),i=new ji;return i.shape([[-.385,.063,.064,e*.013,.016],[-.29,.086,.082,e*.012,.012],[-.165,.103,.103,e*.007,-.005],[-.032,.111,.114],[.036,.079,.086]],3629962,{sides:12}),i.shape([[-.59,.078,.142,e*.013,-.045],[-.553,.091,.153,e*.012,-.044],[-.493,.092,.141,e*.012,-.036],[-.448,.079,.082,e*.012,.012],[-.299,.08,.077,e*.012,.018]],5586993,{sides:12,power:.74}),i.shape([[-.606,.081,.143,e*.013,-.045],[-.586,.092,.151,e*.013,-.046],[-.565,.092,.151,e*.013,-.045]],3485490,{sides:12,power:.7}),i.shape([[-.327,.081,.079,e*.012,.015],[-.291,.086,.084,e*.012,.014]],9134660,{sides:12}),i.attach(n,t),n}function cm(){let s=new Ct,e=FM(),t=Ms(s),n=am(t,-1,e),i=am(t,1,e),r=Ms(t,0,.62),a=new ji;a.shape([[-.075,.183,.122],[.005,.217,.15],[.102,.221,.156],[.264,.274,.19],[.367,.285,.177],[.416,.191,.131]],ys.khaki,{power:.8}),a.shape([[-.046,.216,.146],[-.008,.226,.155],[.045,.227,.158]],ys.leather,{sides:16,power:.8}),a.shape([[.358,.185,.128],[.392,.187,.136],[.431,.165,.12]],15977614,{sides:14}),a.shape([[.375,.102,.106],[.502,.106,.099]],ys.skinShade);let o=[];for(let m of[-1,1]){let _=m*.158;a.add(Co([[_*.8,.005,.155],[_*.85,.135,.179],[_,.29,.168],[_,.37,.126],[_*.85,.405,.014],[_*.81,.36,-.111]],.027),7950390),a.box(12164198,[_*.89,.22,.192],[.064,.035,.015],[0,0,m*.065],"metal");let y=Ms(r,_*1.47,.34,0),M=Ms(y,-_*1.47,-.34,0);o.push(y);let w=new ji;w.shape([[.144,.078,.084,_*1.62,.042],[.207,.102,.109,_*1.66,.022],[.307,.107,.112,_*1.6],[.342,.07,.073,_*1.47]],13210966,{sides:12}),w.add(ei([_*1.74,.18,.038],[_*1.88,.074,-.092],.066,.059,10),ys.skin),w.ell(9069123,[_*1.88,.078,-.105],[.07,.068,.076],[.22,0,0]),w.attach(M,e)}for(let m of[-1,1])a.box(13015648,[m*.124,.22,-.157],[.126,.101,.03],[.08,m*.16,0]),a.box(15122300,[m*.124,.249,-.174],[.13,.037,.016],[.1,m*.16,0]);a.box(13280874,[0,-.011,-.153],[.1,.061,.021],Sn,"metal"),a.box(9987129,[0,.077,.144],[.17,.112,.074],[.08,0,0]),a.box(12289103,[0,.101,.184],[.172,.062,.02],[.12,0,0]),a.add(Co([[-.165,.034,.158],[-.002,.169,.207],[.153,.292,.17]],.033),9463616),a.attach(r,e);let c=Ms(r,-.027,.461,-.015),l=new ji;l.shape([[0,.093,.078],[.024,.142,.126,0,-.012],[.078,.189,.162,0,-.016],[.204,.211,.181,0,-.004],[.278,.203,.176],[.327,.142,.137]],ys.skin,{sides:18,power:.83});for(let m of[-1,1])l.ell(14788213,[m*.201,.145,.001],[.037,.072,.053]),l.add(Co([[m*.199,.245,.062],[m*.192,.112,.045],[m*.148,.014,-.001],[m*.068,-.005,-.052]],.019),7885632);l.shape([[.192,.18,.168,0,.009],[.219,.223,.202],[.264,.224,.202]],7229755,{sides:20,arc:[-.69*Math.PI,.69*Math.PI]}),l.ell(13996641,[0,.132,-.167],[.052,.049,.05]);for(let m of[-1,1])l.ell(5519405,[m*.08,.168,-.155],[.042,.013,.016],[0,-m*.31,-m*.09]),l.ell(3882042,[m*.076,.15,-.164],[.018,.021,.014],[0,-m*.28,0],"lacquer",9,5);l.add(Co([[-.054,.079,-.157],[0,.07,-.169],[.053,.078,-.155]],.009),11892307),l.shape([[.207,.224,.212,0,.015],[.243,.273,.242,0,.011],[.279,.285,.253],[.302,.279,.248]],ys.blueShade,{sides:24,finish:"lacquer"}),l.shape([[.255,.275,.251],[.272,.286,.258],[.288,.282,.253]],6867711,{sides:24,finish:"lacquer"}),l.shape([[.281,.278,.25],[.331,.288,.257],[.413,.275,.249],[.498,.23,.222],[.574,.144,.155],[.609,.055,.068],[.614,.014,.022]],ys.blue,{sides:28,finish:"lacquer"}),l.shape([[.296,.281,.252],[.312,.289,.259],[.325,.292,.261]],12114656,{sides:30,finish:"metal"});for(let m of[-1,1])l.ell(14793848,[m*.255,.325,.114],[.013,.016,.014],Sn,"metal",8,5);l.attach(c,e);let h=Ms(r,.295,.691,-.03),f=new ji;function u(m,_,y,M,w,b="metal",v=18){f.add(ei([0,0,M],[0,0,w],_,y,v),m,Sn,[1,1,1],Sn,b)}u(2505549,.106,.11,-.48,.367),u(3558238,.13,.12,-.5,-.375),u(6928350,.142,.142,-.495,-.471),u(2110276,.142,.142,-.549,-.498),u(7442078,.147,.147,-.558,-.541),u(1252139,.105,.105,-.561,-.56),u(2635849,.144,.134,-.275,-.12),u(5540523,.141,.135,-.254,-.205),u(3305115,.125,.129,-.044,.161);for(let m of[-.292,-.119,.148,.203,.249,.294])u(m<.15?8559533:6058374,.139,.139,m,m+.021);u(2504006,.146,.137,.178,.346),u(10005948,.154,.153,.322,.36),u(2503748,.127,.123,.359,.373),u(1319473,.087,.086,.374,.375),f.box(3756390,[0,.095,-.1],[.093,.09,.202],Sn,"metal"),f.box(7785452,[0,.147,-.12],[.103,.023,.105],Sn,"metal"),f.box(3229274,[.098,.066,.061],[.052,.047,.189],Sn,"metal"),f.ell(8701671,[.123,.065,.02],[.012,.022,.036],Sn,"lacquer"),f.attach(h,e);let d=Ms(h,0,0,-.57),p;function x(m,_){p=sm(m,_),t.visible=!1,s.add(p.mesh)}function g({time:m=0,run:_=0,recoil:y=0,merge:M=0,lean:w=0}={}){p&&p.pose(m,_,y,w,M);let b=m*10.9;n.rotation.x=Math.sin(b)*.53*_,i.rotation.x=-Math.sin(b)*.53*_;let v=Math.sin(b)*_;o[0].rotation.x=-v*.46,o[1].rotation.x=v*.15+y*.12,r.rotation.y=v*.055,t.position.y=(1-Math.cos(b*2))*.019*_,r.rotation.z=-w*.13+Math.sin(b)*.021*_,r.rotation.x=-.058*_+y*.085,c.rotation.z=w*.026,h.position.z=-.03+y*.155,h.rotation.x=y*.14,e.cloth.emissive.setRGB(M*.43,M*.21,M*.05),e.lacquer.emissive.setRGB(M*.37,M*.31,M*.11),e.metal.emissive.setRGB(M*.29,M*.22,M*.07)}return{root:s,animate:g,muzzle:d,paint:x}}var Io=new P;function ti(s,e,t,n,i,r){let a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;Io.copy(e),Io[n]=0,Io.normalize();let l=.5*a/(a+o),h=1-Io.angleTo(s)/c;return Math.sign(Io[t])===1?h*l:o/(a+o)+l+l*(1-h)}var Yc=class s extends Nn{constructor(e=1,t=1,n=1,i=2,r=.1){let a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new P,l=new P,h=new P(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=f.length/6,x=new P,g=.5/a;for(let m=0,_=0;m<f.length;m+=3,_+=2)switch(c.fromArray(f,m),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),f[m+0]=h.x*Math.sign(c.x)+l.x*r,f[m+1]=h.y*Math.sign(c.y)+l.y*r,f[m+2]=h.z*Math.sign(c.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:x.set(1,0,0),d[_+0]=ti(x,l,"z","y",r,n),d[_+1]=1-ti(x,l,"y","z",r,t);break;case 1:x.set(-1,0,0),d[_+0]=1-ti(x,l,"z","y",r,n),d[_+1]=1-ti(x,l,"y","z",r,t);break;case 2:x.set(0,1,0),d[_+0]=1-ti(x,l,"x","z",r,e),d[_+1]=ti(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),d[_+0]=1-ti(x,l,"x","z",r,e),d[_+1]=1-ti(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),d[_+0]=1-ti(x,l,"x","y",r,e),d[_+1]=1-ti(x,l,"y","x",r,t);break;case 5:x.set(0,0,-1),d[_+0]=ti(x,l,"x","y",r,e),d[_+1]=1-ti(x,l,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};function nn(s,e,t,n=0){return n?new Yc(s,e,t,1,n):new Nn(s,e,t)}function ut(s,e,t,n,i,r=null){let a=s.index?s.toNonIndexed():s;a!==s&&s.dispose(),a.deleteAttribute("uv"),r&&a.applyQuaternion(new an().setFromEuler(r)),a.translate(t,n,i);let o=new Te(e),c=a.getAttribute("position").count,l=new Float32Array(c*3);for(let h=0;h<l.length;h+=3)o.toArray(l,h);return a.setAttribute("color",new zt(l,3)),a}function ni(s){let e=Ro(s,!1);for(let t of s)t.dispose();return e}function ii(s,e,t,n,i=8){let r=new P(...s),a=new P(...e),o=a.clone().sub(r),c=new ln(t,t,o.length(),i);c.applyQuaternion(new an().setFromUnitVectors(new P(0,1,0),o.normalize()));let l=r.lerp(a,.5);return ut(c,n,l.x,l.y,l.z)}var fm=s=>new P(...s),En=(s=0,e=0,t=0)=>new Qt(s,e,t),dm=Math.PI*2,pm=new Ot({vertexColors:!0,shininess:35,specular:6511190,side:Gt}),OM=new It({vertexColors:!0,toneMapped:!1,side:Gt}),Ze=(s,e,t,n,i,r,a,o=null)=>{let c=new hi(1,28,16);return c.scale(i,r,a),ut(c,s,e,t,n,o)},Zc=(s,e,t,n,i,r,a,o=.045,c=null)=>ut(nn(i,r,a,o),s,e,t,n,c),ir=(s,e,t,n,i,r,a,o=null,c=24)=>ut(new ln(i,r,a,c),s,e,t,n,o),Kc=(s,e,t,n,i,r,a=null)=>ut(new Wn(i,r,8,32),s,e,t,n,a);function Jc(s,e,t=.04){return ut(new Zs(new Gi(e.map(fm)),Math.max(9,e.length*5),t,8,!1),s,0,0,0)}function Lt(s,e,t,n=14){let i=new Gi(e.map(fm)),r=(e.length-1)*5,a=i.computeFrenetFrames(r,!1),o=[],c=[];for(let h=0;h<=r;h++){let f=h/r,u=i.getPointAt(f),d=f*(t.length-1),p=Math.min(t.length-2,Math.floor(d)),x=Xe.lerp(t[p],t[p+1],d-p);for(let g=0;g<n;g++){let m=g*dm/n,_=u.clone().addScaledVector(a.normals[h],x*Math.cos(m)).addScaledVector(a.binormals[h],x*Math.sin(m));if(o.push(_.x,_.y,_.z),h){let y=h*n+g,M=h*n+(g+1)%n;c.push(y-n,M-n,y,M-n,M,y)}}}let l=new vt;return l.setAttribute("position",new Ye(o,3)),l.setIndex(c),l.computeVertexNormals(),ut(l,s,0,0,0)}function hm(s,e){let t=[],n=[];for(let r=1;r<s.length-1;r++)for(let a of[0,r,r+1]){t.push(...s[a]);let o=new Te(e[a%e.length]);n.push(o.r,o.g,o.b)}let i=new vt;return i.setAttribute("position",new Ye(t,3)),i.setAttribute("color",new Ye(n,3)),i.computeVertexNormals(),i}function $c(s,e,t,n,i,r,a=0){let o=new ln(.035,i,r,5,1);return o.translate(0,r/2,0),ut(o,s,e,t,n,En(0,.2,a))}function BM(){let s=[];function e(a,o=0,c=0,l=0){let h=new Ct;return h.position.set(o,c,l),a?.add(h),h.userData.geometry=[],h.userData.light=[],s.push(h),h}let t=e(null),n=(a,...o)=>a.userData.geometry.push(...o),i=(a,...o)=>a.userData.light.push(...o);function r(){for(let a of s)for(let[o,c]of[["geometry",pm],["light",OM]]){let l=a.userData[o];l.length&&a.add(new je(ni(l),c)),delete a.userData[o]}}return{root:t,joint:e,add:n,glow:i,finish:r}}function cf(s,e,t,n,i,r,a=!0){for(let o of[-1,1])s.add(e,Ze("#28313b",o*t,n,i,.15,.106,.095,En(0,o*.35,-o*.27))),s.glow(e,Ze(r,o*t,n+.006,i+.055,.114,.068,.06,En(0,o*.35,-o*.27))),a&&s.add(e,Ze("#271f2e",o*t,n,i+.11,.027,.052,.017))}function lf(s,e,t,n,i,r,a=!1){for(let o=0;o<r;o++){let c=n*(o/(r-1)-.5),l=.12+(o===0||o===r-1?.08:0);s.add(e,Lt("#f7dfb0",[[c,i,t-Math.abs(c)*.15],[c*.98,i+(a?1:-1)*l,t+.035]],[.049,.004],8))}}function mm(s,e,t,n,i,r=!1){let a=s.joint(e,...t),[o,c,l]=n,[h,f,u]=i;s.add(a,Lt(f,[[0,0,0],o],[r?.17:.19,.12]),Ze(u,...o,.16,.15,.15));let d=s.joint(a,...o),p=c.map((g,m)=>g-o[m]),x=l.map((g,m)=>g-o[m]);return s.add(d,Lt(h,[[0,0,0],p,x],[.13,.092,.009],12)),r?(s.add(a,ii([0,.09,.1],[o[0],o[1]+.085,o[2]+.08],.041,"#e9b277")),s.add(d,ii([0,.03,.06],[p[0],p[1]+.12,p[2]+.05],.042,"#dba26b"),Ze(f,...p,.13,.09,.14))):s.add(d,Ze(f,...p,.13,.095,.13)),{g:a,shank:d}}function zM(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.04,-.12),a=t(r,0,-.06,.8),o=[],c=[],l="#176f70",h="#30a59a",f="#124e59",u="#f07846",d="#fcbb71";n(r,Ze(f,0,-.1,0,1.23,.55,1),Ze(l,0,.24,-.05,1.39,.77,1.06),Ze(h,0,.48,-.13,1.08,.55,.84));for(let p of[-1,1]){n(r,Lt("#248d87",[[p*.15,.87,.13],[p*.56,1.01,-.17],[p*.72,1.12,-.42]],[.135,.12,.009]));for(let _=0;_<5;_++)n(r,Ze("#65ae96",p*(.26+_*.14),.88-_*.07,-.36+_*.032,.055,.039,.075));n(r,Jc("#93c9ac",[[p*.18,.96,.09],[p*.58,.83,.31],[p*1.07,.59,.33],[p*1.26,.29,.19]],.036));for(let _=0;_<3;_++){let y=.4-_*.46;n(r,Lt(h,[[p*1,.32,y],[p*1.36,.38,y-.13],[p*1.45,.58,y-.26]],[.21,.13,.006]));let M=[p*.92,-.09,y];o.push({...mm(s,r,M,[[p*.58,.18,-.14],[p*.91,-.78,.02],[p*1,-.97,.31]],[f,l,u]),phase:_*.98+(p<0?Math.PI:0),s:p})}let x=t(r,p*.9,.06,.39),g=t(x,p*.41,.25,.5);n(x,Lt(f,[[0,0,0],[p*.37,.05,.22],[p*.41,.25,.5]],[.27,.23,.24])),n(g,Ze(u,0,.05,.05,.45,.34,.49,En(.12,0,-p*.12)),Lt(u,[[p*.23,.12,.2],[p*.39,.22,.55],[p*.33,.31,.89],[-p*.015,.33,1.08]],[.23,.19,.1,.008]),Jc(d,[[p*.29,.23,.32],[p*.39,.33,.62],[p*.24,.37,.9]],.047));let m=t(g,-p*.13,.02,.24);n(m,Lt("#e78954",[[0,0,0],[-p*.18,.02,.32],[-p*.19,.12,.62],[p*.033,.25,.8]],[.19,.16,.095,.007]));for(let _=0;_<4;_++)n(g,Ze(d,-p*.02,.29,.07+_*.11,.074,.054,.06));c.push({arm:x,palm:g,finger:m,s:p}),n(r,Lt(f,[[p*.39,.45,.55],[p*.48,.71,.62],[p*.49,.85,.72]],[.13,.095,.08])),n(r,Ze(f,p*.49,.86,.74,.22,.16,.17)),i(r,Ze("#ffd777",p*.49,.88,.865,.146,.11,.077)),n(r,Ze("#333442",p*.49,.9,.927,.036,.078,.02));for(let _=0;_<3;_++)n(a,Lt(d,[[p*(.14+_*.1),.07,.03],[p*(.16+_*.14),-.12,.21],[p*(.13+_*.14),-.29,.27]],[.078,.055,.007]));for(let _=0;_<3;_++){let y=-.39-_*.17;n(r,Kc("#ded5a1",p*(.46+_*.1),.88-_*.06,y,.077,.025,En(Math.PI/2,0,0)))}}return n(r,Jc("#a7dac4",[[0,.59,.81],[0,.96,.21],[0,1.01,-.18],[0,.75,-.78]],.034)),p=>{r.position.y=1.04+p.bob*.08-p.down*.29,r.rotation.z=p.stride*.044+p.down*.18,r.rotation.x=-p.cast*.14,o.forEach(({g:x,shank:g,phase:m,s:_})=>{let y=p.beat+m;x.rotation.y=_*.25*Math.sin(y)*p.walk,g.rotation.z=_*(Math.max(0,Math.cos(y))*.28*p.walk+p.down*.45)}),c.forEach(({arm:x,palm:g,finger:m,s:_})=>{x.rotation.x=-.14+.2*p.stride*_-.55*p.cast-.58*p.air+.5*p.down,g.rotation.y=_*(.43-.31*p.cast),m.rotation.y=_*(.17+.37*p.cast+.09*Math.sin(p.time*3))})}}function kM(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.24,-.26),a=t(r,0,.18,.7),o=[],c="#57484b",l="#b67b35",h="#e9b858",f="#ffe3a8";n(r,Ze(c,0,.03,-.17,.94,.77,1.36),Ze("#8e612f",0,.18,.18,1.04,.84,.94));for(let d=0;d<3;d++){let p=.36-d*.48,x=1-d*.12;n(r,Ze(d%2?l:"#c89348",0,.53-d*.09,p,.98*x,.53*x,.55));for(let g of[-1,1])n(r,ii([g*.6*x,.9-d*.1,p+.12],[g*.92*x,.46-d*.1,p+.04],.048,h),Ze("#5b5052",g*.9*x,.49-d*.09,p+.11,.07,.07,.07))}n(a,Ze(c,0,.11,.27,.64,.63,.68),Ze("#866344",0,-.11,.72,.56,.37,.56),Ze("#624c41",0,-.2,1.03,.5,.25,.25),Lt(f,[[0,.12,.88],[.08,.43,1.13],[.23,.82,1.37],[.35,1.19,1.4]],[.245,.181,.078,.004]),Lt("#d6ae76",[[0,.45,.6],[0,.67,.69],[0,.87,.78]],[.16,.1,.005]));for(let d of[-1,1]){n(a,Ze("#493d42",d*.275,-.16,1.205,.105,.064,.038),Lt(c,[[d*.41,.39,.1],[d*.62,.56,.04],[d*.69,.68,-.13]],[.16,.14,.015]),Ze(l,d*.46,.33,.63,.27,.11,.26,En(0,d*.42,-d*.31)));for(let p of[-.86,.62]){let x=t(r,d*.64,-.11,p),g=t(x,0,-.54,.05);n(x,Ze(c,d*.055,-.19,0,.3,.46,.34),Ze(l,d*.12,-.2,.045,.29,.23,.32)),n(g,Ze(c,0,-.13,0,.235,.33,.25),Ze("#423d43",0,-.39,.095,.267,.16,.34));for(let m=-1;m<=1;m++)n(g,Ze("#c3a580",m*.123,-.41,.29,.075,.074,.11));o.push({g:x,knee:g,phase:(p<0?Math.PI:0)+(d<0?Math.PI:0)})}}cf(s,a,.447,.22,.72,"#ffb333");let u=t(r,0,.12,-1.22);return n(u,Lt(c,[[0,0,0],[.13,-.22,-.34],[.12,-.45,-.47]],[.11,.073,.035]),Ze("#342f3a",.12,-.47,-.48,.08,.13,.085)),d=>{r.position.y=1.24+.1*d.bob-.26*d.cast-.35*d.down,r.rotation.z=.06*d.stride+.25*d.down,a.rotation.x=.025+.18*d.stride+.48*d.cast-.47*d.fire+.2*d.down;for(let{g:p,knee:x,phase:g}of o){let m=Math.sin(d.beat+g)*d.walk;p.rotation.x=-m*.39+.25*d.down,x.rotation.x=Math.max(0,m)*.39+.35*d.air}u.rotation.z=.28*Math.sin(d.time*3)}}function HM(s){let{root:e,joint:t,add:n,glow:i}=s,r=[],a=[[.25,2.04,.83,.71],[.45,1.52,.17,.77],[.28,1.05,-.46,.68],[-.32,.69,-.91,.57],[-.84,.53,-1.15,.48],[-1.22,.48,-.87,.32],[-1.39,.57,-.39,.2]];for(let l=0;l<a.length;l++){let[h,f,u,d]=a[l],p=t(e,h,f,u);n(p,Ze(l%2?"#623c81":"#654194",0,0,0,d,d*.78,d*.98),Ze(l%2?"#a969bd":"#9659af",0,d*.23,-.03,d*1.06,d*.71,d*.64));for(let x of[-1,1])n(p,Ze("#50365e",x*d*.78,-.09,.08,d*.21,d*.19,d*.5),$c(l%2?"#cc80ee":"#a17de8",x*d*.62,d*.43,-.1,d*.26,d*.78,-x*.5)),i(p,Ze("#edacff",x*d*.72,d*.5,.075,d*.22,d*.043,d*.09));n(p,$c("#e5b0ff",0,d*.62,-.14,d*.23,d*.67,-.12)),r.push(p)}let o=t(r[0],0,.37,.34),c=t(o,0,-.12,.11);n(o,Ze("#75469a",0,.18,.02,.69,.49,.61),Ze("#9954af",0,.1,.4,.56,.23,.44),Ze("#392744",0,-.043,.41,.51,.11,.44)),n(c,Ze("#b579ab",0,-.19,.37,.47,.145,.45)),lf(s,o,.67,.83,-.012,7),lf(s,c,.62,.67,-.13,5,!0);for(let l of[-1,1])n(o,Lt("#cea6ef",[[l*.45,.32,.1],[l*.65,.69,-.06],[l*.69,.91,-.32]],[.19,.135,.01]),Lt("#a07ccf",[[l*.48,.11,-.04],[l*.78,.36,-.23],[l*.94,.44,-.49]],[.19,.1,.007]),Ze("#b17cba",l*.4,.32,.44,.24,.105,.19,En(0,l*.37,-l*.32)));for(let l of[-1,1])n(o,Lt("#c491da",[[l*.18,.31,.63],[l*.39,.42,.54],[l*.66,.5,.24]],[.1,.16,.035]),Lt("#cba7d1",[[l*.49,.09,.31],[l*.67,-.03,.53],[l*.57,-.19,.75]],[.12,.085,.005]));return cf(s,o,.39,.235,.51,"#a3ffe6"),l=>{r.forEach((h,f)=>{let[,u,d]=a[f];h.position.x=a[f][0]+Math.sin(l.beat*.68-f*.71)*(.13+f*.044)*l.walk,h.position.y=u*(1-.57*l.down-.36*l.cast)+Math.sin(l.beat*.63-f*.73)*.074*l.walk,h.position.z=d+f*.035*l.cast,h.rotation.z=.12*Math.sin(l.beat*.7-f*.61)*l.walk+.27*l.down}),o.rotation.x=-.22*l.cast-.36*l.fire+.1*Math.sin(l.beat)*l.walk,c.rotation.x=.4+.31*l.cast+.36*l.fire+.04*Math.sin(l.time*3)}}function GM(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.72,-.26),a=t(r,0,.4,.8),o=t(a,0,-.16,.28),c=[],l=[],h=[];n(r,Ze("#387bab",0,.09,-.08,.65,.59,1.1),Ze("#a4d6df",0,-.18,.12,.48,.35,.8),Ze("#397aa7",0,.3,.58,.45,.49,.64)),n(a,Ze("#599fc2",0,.11,.14,.46,.39,.61),Ze("#92cbd6",0,-.01,.5,.38,.2,.47),Ze("#296382",0,-.14,.58,.35,.1,.38)),n(o,Ze("#b1e3e3",0,-.12,.3,.31,.12,.34)),lf(s,a,.76,.53,-.11,5);for(let u of[-1,1]){n(a,Lt("#e1f3e6",[[u*.28,.27,0],[u*.45,.58,-.24],[u*.48,.72,-.51]],[.13,.085,.006]),Lt("#80d5e1",[[u*.27,.07,-.08],[u*.54,.17,-.25],[u*.66,.22,-.47]],[.14,.08,.01]));let d=t(r,u*.39,.32,.04),p=t(d,u*.75,.4,-.12);n(d,Lt("#5296b7",[[0,0,0],[u*.38,.16,.02],[u*.76,.39,-.12]],[.18,.12,.095]),hm([[0,0,0],[u*.76,.4,-.12],[u*.68,.1,-.93],[u*.14,-.08,-.76]],["#4a9fc7","#8ddfe5","#3b81b0","#306d9c"]));let x=[[u*1.13,.38,-.3],[u*1.23,.08,-.72],[u*.97,-.11,-1],[u*.4,-.23,-.99]];for(let g=0;g<3;g++){let m=x[g],_=x[g+1],y=m.map((M,w)=>(M+_[w])*.5);y[0]*=.91,y[1]+=.045,y[2]+=.12,n(p,hm([[0,0,0],m,y,_],["#9ee6e3","#72c6df","#348bb9","#81cfe4"]),Lt("#d0ecdc",[[0,0,0],[m[0]*.56,m[1]*.58+.05,m[2]*.47],m],[.055,.042,.009]))}n(p,Lt("#c5e8df",[[0,0,0],x[3]],[.046,.008]),Lt("#b2e8e2",[[0,0,0],[u*.09,.12,.1],[u*.12,.16,.22]],[.08,.05,.004])),c.push({arm:d,elbow:p,s:u});for(let g of[-.57,.41]){let m=t(r,u*.37,-.23,g);n(m,Lt("#407ea5",[[0,0,0],[u*.12,-.32,.05],[u*.14,-.49,.23]],[.15,.095,.069]));for(let _ of[-1,0,1])n(m,Lt("#dcebd5",[[u*.14,-.49,.23],[u*.15+_*.09,-.57,.38]],[.053,.006]));l.push({leg:m,s:u,z:g})}}for(let u of[-1,1])n(a,Lt("#4b92af",[[u*.11,.24,.55],[u*.31,.32,.47],[u*.48,.39,.21]],[.052,.095,.021]));cf(s,a,.315,.14,.54,"#f9c45b");let f=r;for(let u=0;u<5;u++){let d=t(f,0,u?-.015:0,u?-.33:-.83),p=.28-u*.042;n(d,Lt("#4789ad",[[0,0,.06],[0,-.025,-.27],[0,.01,-.4]],[p,p*.8,p*.64]),$c("#acdfe4",0,p*.59,-.16,.065,.17-u*.014)),h.push(d),f=d}for(let u=0;u<4;u++)n(r,$c("#d5ede7",0,.5,.41-u*.31,.084,.23));return u=>{let d=Math.sin(u.time*4.9);r.position.y=1.7+.1*d*(1-u.down)-.69*u.down-.3*u.cast,r.rotation.x=-.13*u.cast+.17*u.fire+.18*u.down,a.rotation.x=.1*Math.sin(u.time*2.4)+.32*u.fire,o.rotation.x=.08+.36*u.cast+.4*u.fire;for(let{arm:p,elbow:x,s:g}of c)p.rotation.z=g*(.06+.32*d*(1-u.down)+.39*u.cast-.65*u.down),x.rotation.y=g*(.12+.12*Math.sin(u.time*4.9-.6)+.7*u.down);for(let{leg:p,s:x,z:g}of l)p.rotation.x=.32+.13*Math.sin(u.beat+x+(g>0?Math.PI:0))+.35*u.air;h.forEach((p,x)=>p.rotation.y=.16*Math.sin(u.time*3-x*.6))}}function VM(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.14,-.17),a=[],o=[],c=t(r,0,.14,.88),l="#394955",h="#8a4239",f="#d09253",u="#27313d",d="#ffc669";n(r,Ze(u,0,0,-.06,.99,.63,1.15),Ze(h,0,.24,-.15,1.06,.68,1.08));for(let p=0;p<3;p++)n(r,ir(p===1?f:l,0,.6+p*.13,-.22,.71-p*.075,.74-p*.073,.15),Kc("#c4874f",0,.65+p*.13,-.22,.705-p*.072,.043,En(Math.PI/2)));n(r,ir(u,0,.98,-.22,.48,.56,.11)),i(r,ir("#ff9642",0,1.035,-.22,.414,.414,.035));for(let p=-2;p<=2;p++)n(r,Zc(l,p*.14,1.07,-.22,.052,.04,.66-.09*Math.abs(p),.014));n(c,ir(u,0,0,.1,.54,.54,.27,En(Math.PI/2)),Kc(f,0,0,.265,.48,.077)),i(c,Ze("#ff8235",0,0,.245,.39,.39,.105),Ze("#ffe395",0,0,.326,.17,.17,.054));for(let p=0;p<8;p++){let x=p*dm/8;n(c,Zc(l,Math.cos(x)*.32,Math.sin(x)*.32,.35,.24,.066,.053,.016,En(0,0,x+.32)))}for(let p of[-1,1]){for(let g=0;g<4;g++){let m=.62-g*.45,_=[p*(.5+Math.sin(g*Math.PI/3)*.12),.39,m*.42],y=[p*(.9+Math.sin(g*Math.PI/3)*.18),-.75,m*.78];a.push({...mm(s,r,[p*.75,-.06,m],[_,y,[y[0]+p*.16,-1.04,y[2]+.27]],[l,h,f],!0),s:p,phase:g*1.5+(p<0?Math.PI:0)})}let x=t(r,p*.74,.56,-.25);o.push({g:x,s:p}),n(x,ir(l,0,.28,0,.245,.265,.76,En(.26)),ir(f,0,.62,.095,.258,.26,.13,En(.26)),ir(u,0,.72,.118,.22,.22,.1,En(.26)),Kc("#e4a361",0,.78,.132,.232,.045,En(Math.PI/2+.26)),Jc(f,[[p*.17,0,-.1],[p*.27,.28,-.12],[p*.2,.46,-.06]],.05)),i(x,Ze(d,0,.742,.13,.142,.042,.14)),n(r,Zc(h,p*.76,.3,.45,.47,.43,.52,.1,En(0,p*.16,-p*.25)));for(let g=0;g<3;g++)i(r,Zc("#ffa64f",p*(.67+g*.075),.31,.72,.036,.18,.033,.007,En(0,0,-p*.18)))}return p=>{r.position.y=1.14+.066*p.bob-.15*p.cast-.42*p.down,r.rotation.z=.042*p.stride+.21*p.down,c.rotation.z=.14*p.time+.67*p.cast,a.forEach(({g:x,shank:g,s:m,phase:_})=>{let y=p.beat+_;x.rotation.y=m*.22*Math.sin(y)*p.walk,g.rotation.z=m*(.25*Math.max(0,Math.cos(y))*p.walk+.36*p.down)}),o.forEach(({g:x,s:g})=>{x.rotation.x=.17+.4*p.cast-.25*p.fire,x.rotation.z=g*(.18+.12*p.down),x.position.y=.56-.14*p.fire})}}var um={diver:zM,warden:kM,drill:HM,kestrel:GM,engine:VM};function gm(s,e){let t=new Map,n;return function(r,a){if(n!==r){let u=t.get(n);if(u&&(u.root.visible=!1,u.volume&&(u.volume.mesh.visible=u.portrait.mesh.visible=!1)),um[r]&&!t.has(r)){let d=BM(),p=um[r](d);d.finish(),s.add(d.root),t.set(r,{root:d.root,sample:p})}n=r}let o=t.get(r);if(!o)return!1;let c=e.get(r);!o.volume&&c&&(j0(o.root,c,pm),o.volume=tm(r,c),o.portrait=em(r,c),s.add(o.volume.mesh,o.portrait.mesh));let l=a.march*4.35,h=Xe.smoothstep(a.defeat,.12,.94);if(o.volume){o.portrait.mesh.visible=a.mode==="ai",o.volume.mesh.visible=!o.portrait.mesh.visible;let u=Xe.smoothstep(h,.3,.92);o.root.visible=o.volume.mesh.visible&&u>.01,o.root.scale.set(.63*u,.66*u,.68*u),o.root.position.set(0,.07,-.95),(o.portrait.mesh.visible?o.portrait:o.volume).pose({...a,down:h})}else o.root.visible=!0,o.root.scale.setScalar(1),o.root.position.set(0,0,0);if(!o.root.visible)return!0;let f=Math.sin(Math.PI*Xe.clamp((a.vault-.21)/.89,0,1))+Math.sin(Math.PI*Xe.clamp((a.attack-.23)/.65,0,1));return o.sample({time:a.time,beat:l,walk:a.walk*(1-h),stride:Math.sin(l)*a.walk*(1-h),bob:(.5-.5*Math.cos(l*2))*a.walk,down:h,air:f,cast:a.charge||0,fire:a.release||0}),!0}}function xm(s){let e=new Map,t=new Map,n=s.clone();return _m(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function _m(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)_m(s.children[n],e.children[n],t)}var jc=class extends bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new gf(t)}),this.register(function(t){return new xf(t)}),this.register(function(t){return new _f(t)}),this.register(function(t){return new Af(t)}),this.register(function(t){return new Rf(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new yf(t)}),this.register(function(t){return new Mf(t)}),this.register(function(t){return new bf(t)}),this.register(function(t){return new Sf(t)}),this.register(function(t){return new mf(t)}),this.register(function(t){return new Ef(t)}),this.register(function(t){return new vf(t)}),this.register(function(t){return new Tf(t)}),this.register(function(t){return new wf(t)}),this.register(function(t){return new df(t)}),this.register(function(t){return new Qc(t,ct.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Qc(t,ct.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new If(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Ki.extractUrlBase(e);a=Ki.resolveURL(l,this.path)}else a=Ki.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Wr(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Sm){try{a[ct.KHR_BINARY_GLTF]=new Pf(e)}catch(f){i&&i(f);return}r=JSON.parse(a[ct.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Bf(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,a[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let f=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(f){case ct.KHR_MATERIALS_UNLIT:a[f]=new pf;break;case ct.KHR_DRACO_MESH_COMPRESSION:a[f]=new Lf(r,this.dracoLoader);break;case ct.KHR_TEXTURE_TRANSFORM:a[f]=new Nf;break;case ct.KHR_MESH_QUANTIZATION:a[f]=new Df;break;default:u.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function WM(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function qt(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var ct={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},df=class{constructor(e){this.parser=e,this.name=ct.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Te(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Rn);let f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new gs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new fo(h),l.distance=f;break;case"spot":l=new uo(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ti(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},pf=class{constructor(){this.name=ct.KHR_MATERIALS_UNLIT}getMaterialType(){return It}extendParams(e,t,n){let i=[];e.color=new Te(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Rn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,gt))}return Promise.all(i)}},mf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},gf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ce(r,r)}return Promise.all(i)}},xf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(i)}},_f=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_DISPERSION}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},vf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},yf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SHEEN}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new Te(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Rn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,gt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Mf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},bf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_VOLUME}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Te().setRGB(r[0],r[1],r[2],Rn),Promise.all(i)}},Sf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IOR}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Ef=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SPECULAR}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Te().setRGB(r[0],r[1],r[2],Rn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,gt)),Promise.all(i)}},wf=class{constructor(e){this.parser=e,this.name=ct.EXT_MATERIALS_BUMP}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Tf=class{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return qt(this.parser,e,this.name)!==null?Cn:null}extendMaterialParams(e,t){let n=qt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Af=class{constructor(e){this.parser=e,this.name=ct.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Rf=class{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Cf=class{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Qc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,f=i.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,f,u,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*f);return a.decodeGltfBuffer(new Uint8Array(d),h,f,u,i.mode,i.filter),d})})}else return null}},If=class{constructor(e){this.name=ct.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==si.TRIANGLES&&l.mode!==si.TRIANGLE_STRIP&&l.mode!==si.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),f=h.isGroup?h.children:[h],u=l[0].count,d=[];for(let p of f){let x=new Ve,g=new P,m=new an,_=new P(1,1,1),y=new tn(p.geometry,p.material,u);for(let w=0;w<u;w++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,w),c.SCALE&&_.fromBufferAttribute(c.SCALE,w),y.setMatrixAt(w,x.compose(g,m,_));let M=null;for(let w in c)if(w==="_COLOR_0"){let b=c[w];y.instanceColor=new en(b.array,b.itemSize,b.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(M===null){let v=y.geometry;M=new vt,M.name=v.name;for(let S in v.attributes)M.setAttribute(S,v.attributes[S]);for(let S in v.morphAttributes)M.morphAttributes[S]=v.morphAttributes[S];v.index!==null&&M.setIndex(v.index),M.morphTargetsRelative=v.morphTargetsRelative;for(let S of v.groups)M.addGroup(S.start,S.count,S.materialIndex);v.boundingBox!==null&&(M.boundingBox=v.boundingBox.clone()),v.boundingSphere!==null&&(M.boundingSphere=v.boundingSphere.clone()),M.drawRange.start=v.drawRange.start,M.drawRange.count=v.drawRange.count,M.userData=Object.assign({},v.userData),y.geometry=M}let b=c[w];M.setAttribute(w,new en(b.array,b.itemSize,b.normalized))}Pt.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Sm="glTF",Po=12,vm={JSON:1313821514,BIN:5130562},Pf=class{constructor(e){this.name=ct.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Po),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Sm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Po,r=new DataView(e,Po),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===vm.JSON){let l=new Uint8Array(e,Po+a,o);this.content=n.decode(l)}else if(c===vm.BIN){let l=Po+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Lf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ct.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let f=Ff[h]||h.toLowerCase();o[f]=a[h]}for(let h in e.attributes){let f=Ff[h]||h.toLowerCase();if(a[h]!==void 0){let u=n.accessors[e.attributes[h]],d=sa[u.componentType];l[f]=d.name,c[f]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,u){i.decodeDracoFile(h,function(d){for(let p in d.attributes){let x=d.attributes[p],g=c[p];g!==void 0&&(x.normalized=g)}f(d)},o,l,Rn,u)})})}},Nf=class{constructor(){this.name=ct.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Df=class{constructor(){this.name=ct.KHR_MESH_QUANTIZATION}},eh=class extends Mi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,f=(n-t)/h,u=f*f,d=u*f,p=e*l,x=p-l,g=-2*d+3*u,m=d-u,_=1-g,y=m-u+f;for(let M=0;M!==o;M++){let w=a[x+M+o],b=a[x+M+c]*h,v=a[p+M+o],S=a[p+M]*h;r[M]=_*w+y*b+g*v+m*S}return r}},XM=new an,Uf=class extends eh{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return XM.fromArray(r).normalize().toArray(r),r}},si={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},sa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ym={9728:Yt,9729:Zt,9984:tc,9985:Jr,9986:er,9987:Un},Mm={33071:Kn,33648:Rr,10497:vi},hf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ff={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},bs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},qM={CUBICSPLINE:void 0,LINEAR:ks,STEP:zs},uf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function YM(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Vi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:$n})),s.DefaultMaterial}function sr(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ti(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ZM(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(i=!0),f.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let f=e[l];if(n){let u=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):s.attributes.position;a.push(u)}if(i){let u=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):s.attributes.normal;o.push(u)}if(r){let u=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):s.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],f=l[1],u=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=f),r&&(s.morphAttributes.color=u),s.morphTargetsRelative=!0,s})}function KM(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function JM(s){let e,t=s.extensions&&s.extensions[ct.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ff(t.attributes):e=s.indices+":"+ff(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ff(s.targets[n]);return e}function ff(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Of(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function $M(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var jM=new Ve,Bf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new WM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?(this.textureLoader=new Zi(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new po(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Wr(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return sr(r,o,i),Ti(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ct.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Ki.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=hf[i.type],o=sa[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new zt(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=hf[i.type],l=sa[i.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,u=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,x,g;if(d&&d!==f){let m=Math.floor(u/d),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,y=t.cache.get(_);y||(x=new l(o,m*d,i.count*d/h),y=new Dr(x,d/h),t.cache.add(_,y)),g=new Ur(y,c,u%d/h,p)}else o===null?x=new l(i.count*c):x=new l(o,u,i.count*c),g=new zt(x,c,p);if(i.sparse!==void 0){let m=hf.SCALAR,_=sa[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,w=new _(a[1],y,i.sparse.count*m),b=new l(a[2],M,i.sparse.count*c);o!==null&&(g=new zt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let v=0,S=w.length;v<S;v++){let I=w[v];if(g.setX(I,b[v*c]),c>=2&&g.setY(I,b[v*c+1]),c>=3&&g.setZ(I,b[v*c+2]),c>=4&&g.setW(I,b[v*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let u=(r.samplers||{})[a.sampler]||{};return h.magFilter=ym[u.magFilter]||Zt,h.minFilter=ym[u.minFilter]||Un,h.wrapS=Mm[u.wrapS]||vi,h.wrapT=Mm[u.wrapT]||vi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Yt&&h.minFilter!==Zt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1,h;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)h=n.getDependency("bufferView",a.bufferView).then(function(u){return new Promise(function(d,p){t.parse(u,d,p)})});else{if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let x=d;t.isImageBitmapLoader===!0&&(x=function(g){let m=new on(g);m.needsUpdate=!0,d(m)}),t.load(Ki.resolveURL(u,r.path),x,void 0,p)})})}let f=h.then(function(u){return l===!0&&o.revokeObjectURL(c),Ti(u,a),u.userData.mimeType=a.mimeType||$M(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=f,f}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ct.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ct.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[ct.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new zr,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Br,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Vi}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[ct.KHR_MATERIALS_UNLIT]){let f=i[ct.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),l.push(f.extendParams(o,r,t))}else{let f=r.pbrMetallicRoughness||{};if(o.color=new Te(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){let u=f.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Rn),o.opacity=u[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",f.baseColorTexture,gt)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Gt);let h=r.alphaMode||uf.OPAQUE;if(h===uf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===uf.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==It&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ce(1,1),r.normalTexture.scale!==void 0)){let f=r.normalTexture.scale;o.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&a!==It&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==It){let f=r.emissiveFactor;o.emissive=new Te().setRGB(f[0],f[1],f[2],Rn)}return r.emissiveTexture!==void 0&&a!==It&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,gt)),Promise.all(l).then(function(){let f=new a(o);return r.name&&(f.name=r.name),Ti(f,r),t.associations.set(f,{materials:e}),r.extensions&&sr(i,f,r),f})}createUniqueName(e){let t=Ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[ct.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return bm(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=JM(l),f=i[h];if(f)a.push(f.promise);else{let u;l.extensions&&l.extensions[ct.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=bm(new vt,l,t),l.mode===si.TRIANGLE_STRIP?u=u.then(d=>of(d,So)):l.mode===si.TRIANGLE_FAN&&(u=u.then(d=>of(d,jr))),i[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?YM(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let d=0,p=h.length;d<p;d++){let x=h[d],g=a[d],m,_=l[d];if(g.mode===si.TRIANGLES||g.mode===si.TRIANGLE_STRIP||g.mode===si.TRIANGLE_FAN||g.mode===void 0){let y=r.isSkinnedMesh===!0,M=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");y&&M===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=y&&M?new ka(x,_):new je(x,_),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===si.LINES)m=new Ga(x,_);else if(g.mode===si.LINE_STRIP)m=new Vs(x,_);else if(g.mode===si.LINE_LOOP)m=new Va(x,_);else if(g.mode===si.POINTS)m=new Wa(x,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&KM(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Ti(m,r),g.extensions&&sr(i,m,g),t.assignFinalMaterial(m),f.push(m)}for(let d=0,p=f.length;d<p;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return r.extensions&&sr(i,f[0],r),f[0];let u=new Ct;r.extensions&&sr(i,u,r),t.associations.set(u,{meshes:e});for(let d=0,p=f.length;d<p;d++)u.add(f[d]);return u})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new rn(Xe.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Js(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ti(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let f=a[l];if(f){o.push(f);let u=new Ve;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Ha(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let f=0,u=i.channels.length;f<u;f++){let d=i.channels[f],p=i.samplers[d.sampler],x=d.target,g=x.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,_=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",_)),l.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){let u=f[0],d=f[1],p=f[2],x=f[3],g=f[4],m=[];for(let y=0,M=u.length;y<M;y++){let w=u[y],b=d[y],v=p[y],S=x[y],I=g[y];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let C=n._createAnimationTracks(w,b,v,S,I);if(C)for(let N=0;N<C.length;N++)m.push(C[N])}let _=new lo(r,void 0,m);return Ti(_,i),_})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],f=l[1],u=l[2];u!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(u,jM)});for(let d=0,p=f.length;d<p;d++)h.add(f[d]);if(h.userData.pivot!==void 0&&f.length>0){let d=h.userData.pivot,p=f[0];h.pivot=new P().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Fr:l.length>1?h=new Ct:l.length===1?h=l[0]:h=new Pt,h!==l[0])for(let f=0,u=l.length;f<u;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=a),Ti(h,r),r.extensions&&sr(n,h,r),r.matrix!==void 0){let f=new Ve;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let f=i.associations.get(h);i.associations.set(h,{...f})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Ct;n.name&&(r.name=i.createUniqueName(n.name)),Ti(r,n),n.extensions&&sr(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,f=c.length;h<f;h++){let u=c[h];u.parent!==null?r.add(xm(u)):r.add(u)}let l=h=>{let f=new Map;for(let[u,d]of i.associations)(u instanceof yn||u instanceof on)&&f.set(u,d);return h.traverse(u=>{let d=i.associations.get(u);d!=null&&f.set(u,d)}),f};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}bs[r.path]===bs.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(bs[r.path]){case bs.weights:h=Xi;break;case bs.rotation:h=qi;break;case bs.translation:case bs.scale:h=ms;break;default:n.itemSize===1?h=Xi:h=ms;break}let f=i.interpolation!==void 0?qM[i.interpolation]:ks,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){let x=new h(c[d]+"."+bs[r.path],t.array,u,f);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Of(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof qi?Uf:eh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function QM(s,e,t){let n=e.attributes,i=new Hn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),o.normalized){let h=Of(sa[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new P,c=new P;for(let l=0,h=r.length;l<h;l++){let f=r[l];if(f.POSITION!==void 0){let u=t.json.accessors[f.POSITION],d=u.min,p=u.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),u.normalized){let x=Of(sa[u.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new Ln;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function bm(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=Ff[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return lt.workingColorSpace!==Rn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${lt.workingColorSpace}" not supported.`),Ti(s,e),QM(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?ZM(s,e.targets,t):s})}async function Em(){let{scene:s}=await new jc().loadAsync("./art/brawler.glb"),e=$0(),t=g=>s.getObjectByName(g),n=t("Pelvis"),i=t("Spine"),r=t("Head"),a=n.position.y,o=["L","R"].map(g=>Object.fromEntries(["Hip","Knee","Ankle","Arm","Elbow","Wrist"].map(m=>[m,t(m+g)]))),c=t("Brawler");c.frustumCulled=!1;let l=c.material;l.color.setScalar(.7),l.bumpMap=l.map,l.bumpScale=.016,l.emissiveMap=l.map,l.emissive.setScalar(.3);let h=new Gr;h.moveTo(-.17,-.125),h.lineTo(.17,-.125),h.quadraticCurveTo(.21,-.125,.21,-.088),h.lineTo(.21,.092),h.quadraticCurveTo(.21,.125,.17,.125),h.lineTo(-.17,.125),h.quadraticCurveTo(-.21,.125,-.21,.086),h.lineTo(-.21,-.086),h.quadraticCurveTo(-.21,-.125,-.17,-.125);let f=new Ws;f.moveTo(-.145,-.072),f.lineTo(-.145,.072),f.lineTo(.145,.072),f.lineTo(.145,-.072),f.closePath(),h.holes.push(f);let u=new je(new io(h,{depth:.027,bevelThickness:.009,bevelSize:.009,bevelSegments:2}),new Vi({color:12166028,metalness:.37,roughness:.52}));u.position.set(0,.15,.85),u.rotation.x=-.11,n.add(u);let d=gm(s,e),p=new Float32Array(3);function x({time:g,walk:m,march:_,attack:y,hit:M,defeat:w,kind:b="bruiser",vault:v=0,brace:S=0,drive:I=0,charge:C=0,release:N=0,mode:z}){let X=d(b,{time:g,walk:m,march:_,attack:y,defeat:w,vault:v,charge:C,release:N,mode:z,hit:M});if(c.visible=u.visible=!X,X)return;let D=Math.min(1,v/1.35),q=Math.sin(Math.PI*Math.max(0,Math.min(1,(v-.21)/.89))),G=Et(v,0,.14)*(1-Et(v,.14,.32)),L=Et(v,1.04,1.13)*(1-Et(v,1.14,1.35)),K=1-Et(w,0,.38),A=K*Et(y,0,.19)*(1-Et(y,.2,.3+.1)),V=K*Math.sin(Math.PI*ko(y)),H=K*Et(y,.11,.53)*(1-Et(y,.68,.91)),W=K*Et(y,.68,.91)*(1-Et(y,1.01,1.48)),k=K*Et(y,.91,1)*(1-Et(y,1.01,1.39)),O=Et(w,.12,.58),re=Et(w,.82,1.34),pe=m*(1-Et(y,.015,.16)+Et(y,1.32,1.48))*(1-O)*(1-.9*Math.sin(Math.PI*D)),Ie=.41,me=_==null?g*6.75:_*Math.PI*.55/Ie;vs(me,pe,p);let Oe=p[0];n.position.y=a+(-.105+(.5-.5*Math.cos(2*me))*.047)*pe-.3*A-.48*k-.17*O-.32*G-.26*L,n.rotation.set(.055*A-.075*V,Oe*.105,Oe*.043-O*.075),i.rotation.set(.06+.24*G+.19*L-.14*q+.13*I+.24*A-.18*H+.42*W-.084*M,-Oe*.16,-.057*Oe-.16*O),b==="bruiser"&&(i.rotation.x+=.16*C+.31*N),r.rotation.set(-.29-.12*A+.07*H-.34*W+.21*O,Oe*.052,.032*Oe);for(let[ft,Ne]of o.entries()){let Ke=ft?1:-1,Qe=p[ft],ie=Math.max(0,(ft===0?1:-1)*p[2]),ae=-Ne.Knee.position.y,oe=-Ne.Ankle.position.y,Ee=ae+oe+n.position.y-a-ie*.22,ge=Ie*Qe,He=Math.min(ae+oe-1e-5,Math.hypot(Ee,ge)),Le=dt=>Math.acos(Xe.clamp(dt,-1,1)),et=Math.atan2(-ge,Ee)-Le((ae*ae+He*He-oe*oe)/(2*ae*He)),tt=Math.PI-Le((ae*ae+oe*oe-He*He)/(2*ae*oe));Ne.Hip.rotation.x=et-(.62+ft*.13)*q-(.6+ft*.11)*V+Ke*.27*O,Ne.Knee.rotation.x=tt+.78*q+.22*L+.86*V+.22*O,Ne.Ankle.rotation.x=-et-tt+.19*Qe-.31*V,Ne.Arm.rotation.set(.37*Qe-.76*q+.18*G-(ft?0:.82)*S-(ft?.65:0)*I-.24*A-(2.04+ft*.09)*H-.38*W,Ke*(.23*H+.1*W+.22*q),Ke*(.035+.12*A+.28*H+.055*W+.69*O-.26*re)),Ne.Elbow.rotation.x=-.26-.17*Math.max(0,-Qe)-.4*A-.65*H+.12*W-.4*O,Ne.Arm.rotation.x-=1.36*C+.11*N,Ne.Elbow.rotation.x-=.34*C,Ne.Wrist.rotation.set(-.24-.13*H+.22*W,Ke*.58*H,Ke*(.075*Qe+.11*H))}l.emissive.setRGB(.3+M*.36,.3+M*.21,.3+M*.12)}return{root:s,pose:x,prepare:e.prepare}}var wm=new Ot({vertexColors:!0,shininess:33,specular:5527131}),pi=(s=0,e=0,t=0)=>new Qt(s,e,t),yt=(s,e,t,n,i,r,a,o=0,c=null)=>ut(nn(s,e,t,o),n,i,r,a,c),Vt=(s,e,t,n,i,r,a,o=null,c=16)=>ut(new ln(s,e,t,c),n,i,r,a,o),zf=(s,e,t,n,i,r,a=null)=>ut(new Wn(s,e,7,30),t,n,i,r,a),ra=s=>new je(ni(s),wm),qn="#506272",Ss="#e4aa48",th="#f6dda0",Qi="#394655",kf="#b78053",cT=Xe.clamp;function nb(s){let e=[],t=[];if(s==="glass"){e.push(yt(3.87,.17,.83,kf,0,.11,0,.04),yt(3.83,.28,.075,qn,0,.26,.38,.025));for(let n of[-1.79,1.79])e.push(yt(.15,.62,.77,Qi,n,.35,0,.03));for(let[n,i]of[0,-1.12,1.12].entries()){let r=n===0?1.14:.91,a=[Vt(.38,.32,.12,"#176c72",i,.23,0),Vt(.38,.38,r*.59,"#45bdb3",i,.28+r*.29,0),Vt(.13,.38,r*.32,"#7ae1cc",i,.28+r*.74,0),Vt(.13,.13,.22,"#309994",i,.34+r*.93,0),Vt(.167,.167,.09,"#f7cf7a",i,.46+r*.93,0),Vt(.39,.39,.14,"#f7edbe",i,.37+r*.3,0),yt(.06,r*.34,.045,"#ddfff2",i-.21,.48+r*.38,.3,.015,pi(0,0,-.12))];t.push(ra(a))}}else if(s==="crates"){e.push(yt(3.89,.15,.91,Qi,0,.09,0,.035));for(let[n,i]of[0,-1.24,1.24].entries()){let r=n===0?1.35:.96,a=[yt(1.18,r,.78,n?"#b77d49":"#cf925c",i,.17+r/2,0,.065)];for(let o of[-1,1]){a.push(yt(.105,r,.085,"#f0c685",i+o*.48,.17+r/2,.4,.013),yt(1.14,.078,.085,"#704d3c",i,.17+r*(o>0?.9:.12),.405,.012),ii([i+o*.46,.27,.46],[i-o*.46,r+.04,.46],.052,"#ebc188",6));for(let c of[.3,r+.01])a.push(Vt(.038,.038,.022,qn,i+o*.48,c,.458,pi(Math.PI/2),8))}t.push(ra(a))}}else{e.push(yt(3.89,.16,.92,Qi,0,.09,0,.05),yt(3.84,1.12,.6,"#56697b",0,.71,0,.06));for(let n=0;n<5;n++)e.push(yt(3.62,.12,.14,n%2?"#8ea3ad":"#a7b7bf",0,.29+n*.21,.3,.025));for(let n of[-1.79,1.79]){e.push(yt(.21,1.37,.7,qn,n,.67,0,.04));for(let i of[.3,.73,1.14])e.push(yt(.22,.14,.06,"#f2bc59",n,i,.369,0,pi(0,0,.18)))}e.push(yt(.93,.74,.14,Qi,0,.8,.36,.055),zf(.258,.067,"#ffb94e",0,.83,.46),Vt(.15,.15,.06,"#ee702e",0,.83,.47,pi(Math.PI/2),16))}return e.push(yt(1.13,.32,.08,Qi,0,.23,.455,.035)),{base:ra(e),sections:t}}function ib(s,e=4.4,t=1,n){if(s==="cover")return nb(n);let i=[],r=[],a=[];if(s==="gap"||s==="bridge"){let o=e/2;for(let l of[-1,1]){i.push(yt(4.22,.43,.25,qn,0,-.2,l*(o+.04),.035));for(let h=-3;h<=3;h++)i.push(yt(.29,.025,.19,h%2?Ss:Qi,h*.53,.025,l*(o+.21),0,pi(0,.23,0)));for(let h of[-1,1]){let f=h*1.97;i.push(yt(.2,.83,.24,Qi,f,-.39,l*o,.025),ii([f,-.85,l*o],[f,-.1,l*(o+.65)],.055,qn))}}let c=Math.round(e/.4);for(let l=0;l<c;l++){let h=(l+.5)*e/c;r.push(yt(4.03,.14,e/c-.025,l%3===0?"#c59762":kf,0,.01,h,.018));for(let f of[-1.54,1.54])r.push(Vt(.056,.056,.015,qn,f,.085,h,null,7))}for(let l of[-1.5,1.5])r.push(yt(.19,.28,e,qn,l,-.14,o,.024));if(s==="bridge"){for(let l of[-1,1]){let h=l*1.92;i.push(yt(.21,1.72,.34,qn,h,.82,-o,.04),Vt(.23,.23,.12,Ss,h,1.68,-o,pi(0,0,Math.PI/2)),ii([h,.12,-o-.42],[h,1.3,-o],.054,th))}i.push(Vt(.16,.16,3.9,qn,0,.11,-o,pi(0,0,Math.PI/2))),i.push(yt(1.33,.61,.41,qn,0,.33,o+.24,.055),yt(1.45,.09,.48,Ss,0,.64,o+.24,.025))}else for(let l=0;l<5;l++)i.push(ii([l*.63-1.25,-.11,-o],[l*.63-1.21,-.18,-o+.28+l%2*.18],.024,qn,6))}else if(s==="cache"){for(let o=0;o<3;o++)for(let c=0;c<5;c++){let l=["#af7149","#ba8051","#cf955f","#a56745"];i.push(yt(.643,.366,.65,l[(c+2*o)%4],(c-2)*.665,.22+o*.385,0,.033))}for(let o of[-1.53,1.53]){i.push(yt(.17,1.24,.75,Ss,o,.6,0,.035));for(let c of[.19,.57,1.02])i.push(Vt(.047,.047,.034,th,o,c,.389,pi(Math.PI/2),8))}i.push(yt(3.38,.11,.72,Qi,0,1.18,0,.025),yt(1.7,.61,.07,Qi,0,.63,.345,.055))}else if(s==="coil"){i.push(Vt(.78,.9,.22,qn,0,.12,0,null,28),Vt(.26,.34,.96,"#b2d5ce",0,.68,0,null,28));for(let o=0;o<7;o++)i.push(zf(.39-o*.016,.044,o%2?"#cc8548":"#f3b867",0,.3+o*.115,0,pi(Math.PI/2)));i.push(Vt(.25,.3,.2,Ss,0,1.19,0),ut(new qs(.21,1),"#96ffff",0,1.39,0))}else if(s==="belt"){i.push(yt(3.9,.065,e,"#697981",0,.035,0,.045));for(let o of[-1.92,1.92])i.push(yt(.1,.11,e,Ss,o,.074,0,.022));for(let o=0;o<11;o++)i.push(yt(3.74,.045,.055,"#475765",0,.08,(o-5)*e/11));for(let o=0;o<5;o++)for(let c of[-1,1])a.push(ii([-.24*t,.107,(o-2)*1.53+c*.3],[.24*t,.107,(o-2)*1.53],.052,th,6))}return{base:ra(i),deck:r.length?ra(r):null,arrows:a.length?ra(a):null}}function sb(){let s=document.createElement("canvas");s.width=320,s.height=104;let e=s.getContext("2d"),t=new Gn(s);t.colorSpace=gt;let n=new je(new kt(1.56,.51),new It({map:t,transparent:!0,depthWrite:!1,toneMapped:!1})),i="";return{mesh:n,label(r){r!==i&&(i=r,e.clearRect(0,0,320,104),e.font='900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif',e.textAlign="center",e.textBaseline="middle",e.lineWidth=9,e.strokeStyle="#2e3b48",e.strokeText(r,160,56),e.fillStyle="#fff3cf",e.fillText(r,160,56),t.needsUpdate=!0)},dispose(){t.dispose(),n.geometry.dispose(),n.material.dispose()}}}function rb(s){let e=ur[s],t=[];for(let n of[-1,1]){let i=n*6.68;if(t.push(yt(.25,4.6,.38,e.frame,i,-2.36,0,.025),ii([i,-2.4,0],[i,-.3,2.1],.085,e.frame)),s==="timber"){for(let r of[0,.45])t.push(Vt(.13,.18,2,"#956b48",i+n*r,-.4,1.3+r,null,9));t.push(ii([i,.32,1.3],[i,.28,4.9],.046,"#bda77e"));for(let[r,a]of[[2.1,1.8],[1.5,3]]){t.push(Vt(.15,.19,1.8,kf,i+n*a,-3,1+a,null,7));for(let o=0;o<3;o++)t.push(ut(new ps(.77-o*.18,r*.57,8),["#477b62","#599170","#79a181"][o],i+n*a,-2.65+o*.45,1+a))}}else if(s==="quarry"||s==="cinder"||s==="ice"){for(let r=0;r<4;r++){let a=new ps(.58+r*.13,1.4+r%2*1.3,s==="ice"?5:7);t.push(ut(a,s==="ice"?["#85bdce","#b2dce4"][r%2]:r%2?e.frame:e.joint,i+n*(1+r*.55),-2.5+.28*r,r*1.35,pi(.09*r,.6*r,n*.16)))}s==="cinder"&&t.push(Vt(.23,.34,.49,"#c78047",i,-.02,0),Vt(.18,.21,.14,"#ffcb76",i,.28,0))}else s==="forge"?t.push(Vt(.28,.28,3.5,"#657f8e",i+n*.36,-.53,.4,pi(Math.PI/2)),zf(.32,.056,Ss,i+n*.36,-.53,1.75),yt(.46,.51,.44,qn,i,.21,0,.045)):(t.push(Vt(.18,.24,.48,"#737f85",i,.13,0),Vt(.27,.25,.11,Ss,i,.42,0)),t.push(Vt(.34,.48,.58,"#c16649",i+n*1.6,-3.07,1.6),Vt(.18,.3,.23,th,i+n*1.6,-2.68,1.6)))}return ni(t)}function Tm(s){let e=Array.from({length:10},()=>new xt(0,-1e3,0,0));function t(_){_.onBeforeCompile=y=>{y.uniforms.roadCuts={value:e},y.vertexShader=y.vertexShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
deckPosition=(modelMatrix*vec4(transformed,1.)).xyz;`),y.fragmentShader=y.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition; uniform vec4 roadCuts[10];`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
for(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}`)}}let n=new je(new kt(140,154),new Ft({uniforms:{deep:{value:new Te},crest:{value:new Te},clock:{value:0},origin:{value:0}},vertexShader:"varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",fragmentShader:`varying vec3 pos; uniform vec3 deep,crest;uniform float clock,origin;
      void main(){vec2 q=vec2(pos.x,pos.z-origin);float n=sin(q.y*1.36+sin(q.x*.78+clock*.34)*1.5+clock*.45)+.6*sin(q.x*1.45-q.y*.84-clock*.29);
      float streak=smoothstep(1.36,1.53,n);float light=.10+.13*sin(q.x*.14+q.y*.16)+streak*.33;
      gl_FragColor=vec4(mix(deep,crest,max(0.,light)),1.);
      #include <colorspace_fragment>
      }`}));n.rotation.x=-Math.PI/2,n.position.set(0,-3.7,-43),s.add(n);let i=new Map,r=new Map,a=new Map,o=new Ve,c,l,h=new ln(.035,.035,1,8),f=new Ot({color:11246457}),u=new P,d=new P,p=new P,x=new P(0,1,0);function g(_){let y=[_.kind,_.variant||"",_.length||0,_.direction||0].join(":");i.has(y)||i.set(y,ib(_.kind,_.length,_.direction,_.variant));let M=i.get(y),w=new Ct,b=M.base.clone();w.add(b);let v=(M.sections||[]).map(z=>z.clone());for(let z of v)w.add(z);let S,I,C,N=[];if(M.deck&&(S=M.deck.clone(),S.position.z=-_.length/2,w.add(S)),M.arrows&&(I=M.arrows.clone(),w.add(I)),(_.kind==="cache"||_.kind==="bridge"||_.kind==="coil"||_.kind==="cover")&&(C=sb(),w.add(C.mesh),C.mesh.position.set(0,_.kind==="cover"?.25:_.kind==="cache"?.66:_.kind==="coil"?.55:.43,_.kind==="cover"?.512:_.kind==="bridge"?_.length/2+.48:_.kind==="coil"?.56:.397),_.kind==="cover"&&C.mesh.scale.setScalar(.78)),_.kind==="bridge")for(let z=0;z<2;z++){let X=new je(h,f);w.add(X),N.push(X)}return s.add(w),{g:w,base:b,leaf:S,arrows:I,chains:N,sections:v,label:C}}function m(_){let y=_.route.theme;if(y!==c){if(c&&(r.get(c).visible=!1),c=y,!r.has(y)){let b=new tn(rb(y),wm,10);b.frustumCulled=!1,r.set(y,b),s.add(b)}r.get(y).visible=!0,n.material.uniforms.deep.value.set(ur[y].deep),n.material.uniforms.crest.value.set(ur[y].glint)}let M=r.get(y);for(let b=0;b<10;b++)M.setMatrixAt(b,o.makeTranslation(0,0,12-b*10+_.distance%10));if(M.instanceMatrix.needsUpdate=!0,n.material.uniforms.clock.value=_.elapsed,n.material.uniforms.origin.value=_.distance,_.features!==l){for(let b of a.values())b.g.removeFromParent(),b.label?.dispose();a.clear(),l=_.features}let w=0;for(let b of _.features){if(b.z<-68||b.z>14){let S=a.get(b);S&&(S.g.visible=!1);continue}let v=a.get(b)||g(b);if(a.set(b,v),v.g.visible=!0,v.g.position.set(b.x,0,b.z),b.kind==="cover"){let S=b.hp/b.maxHp;v.sections.forEach((I,C)=>{I.visible=S>C*.34}),v.g.rotation.z=Math.sin(b.age*95)*b.flash*.033}if(_.parade&&b.kind!=="bridge"&&b.kind!=="gap"&&(v.g.position.y-=1.8*Xe.smoothstep(_.endTime,0,.48),_.endTime>=.49&&(v.g.visible=!1)),b.kind==="gap"||b.kind==="bridge"){_.parade&&(v.exitAngle??(v.exitAngle=v.leaf.visible?v.leaf.rotation.x:Math.PI/2),v.leaf.position.y=.03),w<e.length&&e[w++].set(b.x,b.z,4.4/2-.055,b.length/2),v.leaf.visible=!!_.parade||b.kind==="bridge"||b.state==="repaired";let S=Xe.smoothstep(b.age,0,.58);v.leaf.rotation.x=_.parade?v.exitAngle*(1-Xe.smoothstep(_.endTime,0,.45)):b.state==="cut"?-.2+1.6*S:b.state==="ready"&&b.kind==="bridge"?-.2:b.state==="linked"?-.2*(1-S):0,b.state==="repaired"&&(v.leaf.position.y=.03+.22*(1-S));for(let I=0;I<v.chains.length;I++){let C=v.chains[I],N=(I?1:-1)*1.83;C.visible=b.state!=="cut"&&b.state!=="repaired",u.set(N,1.63,-b.length/2),d.set(N,-Math.sin(v.leaf.rotation.x)*b.length+.1,-b.length/2+Math.cos(v.leaf.rotation.x)*b.length),p.subVectors(d,u),C.scale.y=p.length(),C.position.copy(u).lerp(d,.5),C.quaternion.setFromUnitVectors(x,p.normalize())}}v.arrows&&(v.arrows.position.x=Math.sin(_.elapsed*5)*.39*b.direction),v.label&&(v.label.mesh.visible=b.state==="ready",v.label.mesh.visible&&v.label.label((b.kind==="cover"?"":b.kind==="bridge"?"\u65AD\u7D22 ":b.kind==="coil"?"\u7535 ":"\u7BB1 ")+Math.ceil(b.hp))),(b.kind==="cache"||b.kind==="coil"||b.kind==="cover")&&b.state!=="ready"&&v.base.scale.setScalar(1-Xe.smoothstep(b.age,0,.24))}for(let b=w;b<e.length;b++)e[b].set(0,-1e3,0,0)}return{cutDeck:t,update:m}}var Hf=13.2,ar=14,oa=-110,rr=ar-oa,aa=(ar+oa)/2,Gf=-.18;function Am(s){let e=ur[s],t=parseInt(e.floor.slice(1),16),n=document.createElement("canvas");n.width=256,n.height=192;let i=n.getContext("2d"),r=i.createImageData(n.width,n.height),a=941;for(let l=0;l<n.height;l++)for(let h=0;h<n.width;h++){a=Math.imul(1664525,a)+1013904223>>>0;let f=(a/4294967296-.5)*3,u=Math.min(h,n.width-1-h),d=f-Math.max(0,1-u/4)*12,p=(l*n.width+h)*4;r.data[p]=(t>>16)+d,r.data[p+1]=(t>>8&255)+d,r.data[p+2]=(t&255)+d,r.data[p+3]=255}i.putImageData(r,0,0),i.fillStyle="rgba(81,74,91,.21)",i.fillRect(0,0,n.width,1.5),i.fillStyle="rgba(244,236,233,.36)",i.fillRect(0,2,n.width,1);for(let l of[7,249])for(let h of[9,183])i.fillStyle="#a59aa4",i.fillRect(l-1,h-1,2.5,2.5);let o=(l,h,f,u,d,p=1)=>{i.strokeStyle=d,i.lineWidth=p,i.beginPath(),i.moveTo(l,h),i.lineTo(f,u),i.stroke()};if(s==="timber")for(let l=0;l<8;l++){let h=l*24;o(0,h,256,h,e.joint,2),o(0,h+2,256,h+2,"#efc398",1);for(let f=0;f<4;f++){let u=(l*41+f*71)%244;i.strokeStyle="rgba(112,69,43,.20)",i.beginPath(),i.moveTo(u,h+12),i.bezierCurveTo(u+13,h+6,u+17,h+15,u+38,h+10),i.stroke()}}else if(s==="forge")for(let l=0;l<3;l++)for(let h=0;h<4;h++){let f=l*85+7,u=h*48+5;i.strokeStyle=e.joint,i.strokeRect(f,u,71,35);for(let d=0;d<4;d++)o(f+7+d*4,u+26,f+12+d*4,u+19,"#82939f")}else if(s==="quarry"||s==="cinder")for(let l=0;l<4;l++){let h=l*48;o(0,h,256,h+1,e.joint,1.5);for(let f=0;f<4;f++){let u=f*76+l%2*32;o(u,h,u+2,h+48,e.joint)}}else if(s==="ice")for(let l=0;l<12;l++){let h=l*63%249,f=l*47%175;o(h,f,h+14,f+13,"#e2f4fa",1.4),o(h+7,f+7,h+17,f+6,"#a0c4d7")}for(let l of[256/3,512/3]){i.fillStyle=e.line,i.fillRect(l-1.7,0,3.4,192),i.fillStyle=e.rim,i.fillRect(l-.25,0,1.2,192);for(let h=7;h<192;h+=48)i.fillRect(l-1.6,h,3,12)}let c=new Gn(n);return c.colorSpace=gt,c.wrapT=vi,c.repeat.y=rr/8,c}function ab(s,e){let t=new Map,n,i=Am("quay");t.set("quay",i);let r=new je(new kt(Hf,rr),new ao({map:i}));r.rotation.x=-Math.PI/2,r.position.set(0,0,aa),r.receiveShadow=!0,s.add(r);let a=[ut(nn(Hf+.13,.38,rr),"#535568",0,-.205,aa)];for(let c of[-1,1]){let l=c*Hf/2;a.push(ut(nn(.13,.19,rr),"#7c7b8a",l,.018,aa)),a.push(ut(nn(.095,.042,rr),"#a6a1af",l+c*.01,.121,aa)),a.push(ut(nn(.055,.22,rr),"#444759",l+c*.074,-.14,aa)),a.push(ut(nn(.048,.022,rr),"#8b8391",l-c*.085,.006,aa))}let o=new je(ni(a),new Ot({vertexColors:!0,shininess:18}));return s.add(o),e.cutDeck(r.material),e.cutDeck(o.material),c=>{let l=c.route.theme;t.has(l)||t.set(l,Am(l)),n!==l&&(r.material.map=t.get(l),n=l),r.material.map.offset.y=c.distance/8%1}}function ob(s){let e=Yn[s].tone==="gold",t=document.createElement("canvas");t.width=704,t.height=208;let n=t.getContext("2d"),i=t.width,r=t.height,a=n.createLinearGradient(0,0,0,r);a.addColorStop(0,e?"#ffe749":"#40afff"),a.addColorStop(.1,e?"#ffdd22":"#269bfa"),a.addColorStop(.68,e?"#ffd419":"#178cf0"),a.addColorStop(1,e?"#efbb09":"#1276d7"),n.fillStyle=a,n.fillRect(0,0,i,r);let o=Yn[s].label,c=Yn[s].count?151:122;n.font=`900 ${c}px "Arial Rounded MT Bold","Arial Black","PingFang SC","Microsoft YaHei",sans-serif`,n.textAlign="center",n.lineJoin="round",n.lineCap="round";let l=n.measureText(o),h=r/2+(l.actualBoundingBoxAscent-l.actualBoundingBoxDescent)/2;n.translate(i/2,h+1),n.scale(Math.min(1.05,i*.85/l.width),1),n.lineWidth=e?15:18,n.strokeStyle="#17212b",n.strokeText(o,0,0),n.fillStyle="#ffffff",n.fillText(o,0,0);let f=new Gn(t);return f.colorSpace=gt,f.anisotropy=4,f}function Rm(s,e){let t=[],n=[];function i(a,o,c,l,h,f,u,d){let p=c/2,x=[[-p,0],[p,0],[p+h,-l],[-p+h,-l]],g=[[-p+d,-d],[p-d,-d],[p+h-d,-l+d],[-p+h+d,-l+d]],m=[...x,...g],_=[0,0,0,0,f,f,u,u],y=[4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7];for(let M of y){let w=m[M];t.push(a+w[0],.008,o+w[1]),n.push(1,1,1,_[M])}}i(0,.1,s*1.01,e*.87,e*.92,.32,.22,.045),i(0,.17,s+.06,.32,.028,.2,.16,.07);let r=new vt;return r.setAttribute("position",new Ye(t,3)),r.setAttribute("color",new Ye(n,4)),r}function lb(s,e,t){let n=Yn[e].tone==="gold",i=Li,r=1.09,a=.17,o=n?"#ffd526":"#2095ef",c=n?"#e8aa10":"#1e76ce",l=n?"#ffe663":"#55b4ff",h=[],f=[ut(nn(i-.1,r,a,.047),o,0,r/2,0)];for(let w of[-1,1]){let b=w*(i/2-.046);f.push(ut(nn(.085,r+.087,.205),l,b,r/2+.021,0)),h.push(ut(nn(.16,.115,.33),c,b,.057,.058))}f.push(ut(nn(i-.16,.047,.123),l,0,r-.012,-.003));let u=ni(f);u.rotateX(Gf),u.translate(0,.059,.015);let d=ni([u,...h]),p=new kt(i-.19,r-.086);p.translate(0,r/2+.007,a/2+.004),p.rotateX(Gf),p.translate(0,.059,.015);let x=[d,p,Rm(i,r)],g=[new Ot({vertexColors:!0,shininess:52,specular:6511457}),new It({map:ob(e),toneMapped:!1}),t],m=16,_,y=new Ve;function M(w){if(_)for(let b of _)s.remove(b),b.dispose();m=w,_=x.map((b,v)=>{let S=new tn(b,g[v],m);return S.count=0,S.frustumCulled=!1,v===2&&(S.renderOrder=1),s.add(S),S}),_[0].instanceMatrix.setUsage(Mn);for(let b of _.slice(1))b.instanceMatrix=_[0].instanceMatrix}return M(m),(w,b)=>{let v=0;for(let I of w)(I.active||I.pop<.28)&&I.type===e&&I.z>=oa&&I.z<ar&&v++;v>m&&M(Xe.ceilPowerOfTwo(v));let S=0;for(let I of w){if(!I.active&&!(I.pop<.28)||I.type!==e||I.z<oa||I.z>=ar)continue;let C=I.active?0:I.pop/.28,N=(1+.24*Math.sin(Math.PI*C)+I.flash*.065)*(1-C*C);y.makeScale(N,N*(1-b)*(1+.18*Math.sin(C*Math.PI)),N),y.setPosition(I.x+.22*(I.x<0?1:-1)*C,Math.sin(C*Math.PI)*.38-b*.13,I.z),_[0].setMatrixAt(S++,y)}for(let I of _)I.count=S;_[0].instanceMatrix.needsUpdate=S>0}}var cb=[[[[-.72,1.01],[-1.01,1.09],[-1.19,1.01],[-1.41,1.17]],[[-1.01,1.09],[-.93,1.24],[-1.02,1.39],[-.89,1.56]],[[-1.19,1.01],[-1.32,.86],[-1.51,.81]]],[[[-1.41,1.17],[-1.59,1.12],[-1.74,1.22],[-1.96,1.2]],[[-.72,1.01],[-.83,.82],[-.69,.66],[-.72,.53],[-.51,.31],[-.58,.15]],[[.48,1.18],[.65,1.33],[.82,1.36],[.95,1.56]],[[.65,1.33],[.72,1.08],[.98,.68],[1.19,.63],[1.38,.43]]],[[[.98,.68],[1.21,.88],[1.41,.8],[1.63,.97],[1.9,.9]],[[1.19,.63],[1.1,.42],[1.2,.31],[1.12,.12]],[[-.72,.53],[-1.03,.51],[-1.21,.37],[-1.47,.4]],[[-1.02,1.39],[-1.29,1.42],[-1.46,1.56]]]];function hb(s){let e=[];for(let t of s)for(let n=1;n<t.length;n++){let[i,r]=t[n-1],[a,o]=t[n],c=Math.hypot(a-i,o-r)+.018,l=new Qt(0,0,Math.atan2(o-r,a-i)),h=n===1?.039:.031;e.push(ut(new kt(c,h),"#302e39",(i+a)/2,(r+o)/2,.227,l)),e.push(ut(new kt(c,h*.38),"#e3dee1",(i+a)/2,(r+o)/2+h*.41,.229,l))}return ni(e)}function ub(s,e){let t=new Ct;s.add(t);let n=4.28,i=1.65,r=[ut(nn(n-.08,i-.08,.39,.057),"#61616d",0,i/2,0)];for(let x of[-1,1]){let g=x*(n/2-.085);r.push(ut(nn(.165,i,.47,.038),"#858493",g,i/2,0)),r.push(ut(nn(.14,i-.12,.032),"#9998a4",g,i/2,.228));for(let m of[.15,i-.16]){let _=new Qt(Math.PI/2,0,0);r.push(ut(new ln(.074,.074,.023,10),"#40414e",g,m,.254,_)),r.push(ut(new ln(.052,.061,.032,6),"#a9a8af",g,m,.273,_))}}for(let x of[.084,i-.079])r.push(ut(nn(n-.28,.11,.43,.019),"#898795",0,x,0));let a=document.createElement("canvas");a.width=256,a.height=112;let o=a.getContext("2d"),c=new Gn(a);c.colorSpace=gt;let l=new je(new kt(1.8,.79),new It({map:c,transparent:!0,depthWrite:!1,toneMapped:!1}));l.position.set(0,.84,.253),t.add(l);let h,f=new Ot({vertexColors:!0,shininess:36,specular:6841713,emissive:16774637,emissiveIntensity:0});t.add(new je(ni(r),f));let u=new je(Rm(n,i),e);u.renderOrder=1,t.add(u);let d=new It({vertexColors:!0}),p=cb.map(x=>{let g=new je(hb(x),d);return t.add(g),g});return x=>{if(t.visible=!!(x&&x.hp>0&&x.z>=oa&&x.z<ar),!t.visible)return;t.position.set(x.x,0,x.z);let g=Math.ceil(x.hp);g!==h&&(o.clearRect(0,0,a.width,a.height),o.font='900 102px "Arial Black",sans-serif',o.textAlign="center",o.textBaseline="middle",o.lineWidth=9,o.strokeStyle="#333340",o.strokeText(String(g),128,60),o.fillStyle="#f4edf0",o.fillText(String(g),128,60),c.needsUpdate=!0,h=g);let m=x.hp/Math.max(1,x.maxHp);f.emissiveIntensity=Math.sqrt(Xe.clamp(x.flash||0,0,1))*.35,p[0].visible=m<.93,p[1].visible=m<=.67,p[2].visible=m<=.36}}function Cm(s){let e=new Ct;e.name="Course",s.add(e);let t=Tm(e),n=ab(e,t),i=new It({color:3158603,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),r=Object.keys(Yn).map(d=>lb(e,d,i)),a=new tn(new Nn(1,.073,.065),new It,80);a.frustumCulled=!1,e.add(a);let o=new Ve,c=new Te("#253347"),l=new Te("#f5fffe"),h=ni([ut(nn(.43,.32,.1,.04),"#3e505d",0,0,.01),ut(new Wn(.132,.045,7,18,Math.PI),"#ffe3a2",0,.13,.04),ut(nn(.12,.1,.022,.017),"#f3be63",0,0,.072)]),f=new tn(h,new Ot({vertexColors:!0}),40);f.frustumCulled=!1,f.instanceMatrix.setUsage(Mn),e.add(f);let u=ub(e,i);return{update(d){let{gates:p,wall:x}=d;t.update(d),n(d);let g=d.parade?Xe.smoothstep(d.endTime,0,.4):0;for(let y of r)y(g===1?[]:p,g);let m=0,_=0;for(let y of p){if(!d.parade&&y.active&&y.cover?.hp>0&&y.z>oa&&y.z<ar&&(o.makeRotationX(Gf).setPosition(y.x+Li/2-.35,.72,y.z+.18),f.setMatrixAt(_++,o)),d.parade||!y.active||y.hp>=y.maxHp||y.z<-45||y.z>ar)continue;let M=Li-.38,w=M*y.hp/y.maxHp;for(let[b,v,S,I]of[[M,y.x,y.z+.18,c],[w,y.x-(M-w)/2,y.z+.22,l]])o.makeScale(b,1,1).setPosition(v,.13,S),a.setMatrixAt(m,o),a.setColorAt(m++,I)}f.count=_,f.instanceMatrix.needsUpdate=_>0,a.count=m,m&&(a.instanceMatrix.needsUpdate=!0,a.instanceColor.needsUpdate=!0),u(x)},dispose(){let d=new Set,p=new Set,x=new Set;e.traverse(g=>{g.isMesh&&(d.add(g.geometry),p.add(g.material),g.material.map&&x.add(g.material.map),g.isInstancedMesh&&g.dispose())}),e.removeFromParent();for(let g of d)g.dispose();for(let g of p)g.dispose();for(let g of x)g.dispose()}}}var fb=new kt(1,1),Vf=new hi(1,16,10),Lo=s=>new It({color:s,toneMapped:!1}),db=new Ot({color:4213080,shininess:65}),Wf=Lo(16760162),Im=Lo(13565951),Xf=new P,xT=new P,pb=new P(0,1,0),qf=Xe.clamp;function mb(){return new Ft({uniforms:{ink:{value:new Te},style:{value:0},time:{value:0},progress:{value:0},after:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 tex;uniform vec3 ink;uniform float style,time,progress,after;
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
    }`})}function Ai(s,e,t){let n=new je(s,e);return t.add(n),n}function gb(s,e,t,n){Xf.subVectors(t,e);let i=Xf.length();s.position.copy(e).lerp(t,.5),s.scale.set(n,i,n),s.quaternion.setFromUnitVectors(pb,Xf.normalize())}function xb(s){let e=new Ct;s.add(e);let t=mb(),n=Ai(fb,t,e);n.renderOrder=3;let i=new Ct;e.add(i);let r=new Ot({color:3330759,emissive:1210479,transparent:!0,opacity:.8,shininess:90});Ai(Vf,r,i).scale.set(.42,.28,.45);let a=Ai(new Wn(.46,.053,6,25,Math.PI*1.65),Im,i);a.rotation.x=-1.2;let o=new Ct;e.add(o),Ai(Vf,db,o).scale.set(.235,.29,.235),Ai(new Wn(.235,.04,6,20),Wf,o).rotation.x=1.3;let l=Ai(Vf,Wf,o);l.position.y=.22,l.scale.setScalar(.12);let h=Ai(new ln(1,.2,1,12,1,!0),new It({color:6478335,transparent:!0,opacity:.41,toneMapped:!1,depthWrite:!1,side:Gt}),e),f=new Ct;e.add(f);let u=[Lo("#e8beff"),Lo("#ab65dd"),Lo("#83eaff")];for(let x=0;x<7;x++){let g=Ai(new ps(1,1,5),u[x%2],f),m=x*2.4;g.position.set(Math.cos(m)*(.27+x*.05),.4,Math.sin(m)*(.27+x*.05)),g.rotation.set(Math.sin(m)*.32,x*.9,Math.cos(m)*.38),g.scale.set(.13+x%3*.035,.66+x%3*.35,.17)}let d=new Ct;e.add(d);for(let x=0;x<7;x++)Ai(new Ys(1),Im,d).scale.set(.055,.09,.28);let p=Ai(new Wn(1,.09,6,32,Math.PI*1.4),Wf,e);return p.rotation.x=-Math.PI/2,{root:e,mat:t,mark:n,bubble:i,shell:o,beam:h,ridge:f,streaks:d,wave:p}}function Pm(s){let e=Array.from({length:3},()=>xb(s)),t=new P,n=new P;return function(r){let a=r.skill;e.forEach((o,c)=>{let l=a?.marks[c];if(o.root.visible=!!l&&!r.defeated,!o.root.visible)return;let h=a.age-l.delay,f=fh(a,l),u=qf((h-a.warm-a.flight)/.62,0,1),d=h>=a.warm,p=f>=1,x=l.x-a.x,g=l.z-a.z,m=o.mat.uniforms;m.ink.value.set(Tn[a.kind].color);let _=qf(h/a.warm,0,1);if(m.progress.value=d?f:_,m.after.value=u,m.time.value=a.age,m.style.value=l.shape==="circle"?0:l.shape==="strip"?1:2,o.mark.visible=h>=-.12&&u<1,l.shape==="circle")o.mark.rotation.set(-Math.PI/2,0,0),o.mark.scale.set(2*l.radius,2*l.radius,1),o.mark.position.set(l.x,.059,l.z);else{let b=Math.hypot(x,g),v=Math.atan2(x,g);o.mark.position.set((l.x+a.x)/2+Math.sin(v)*.82,.06,(l.z+a.z)/2+Math.cos(v)*.82),o.mark.rotation.order="YXZ",o.mark.rotation.set(Math.PI/2,v,0),o.mark.material.side=Gt,o.mark.scale.set(2*l.radius,b+1.64,1)}let y=d&&!p;o.bubble.visible=y&&a.kind==="diver",o.shell.visible=y&&a.kind==="engine";let M=o.bubble.visible?o.bubble:o.shell;if(M.visible){let b=a.x+(c?1:-1)*.8,v=a.kind==="engine"?4.6:.57;M.position.set(Xe.lerp(b,l.x,f),a.height*(1-f)+.17+Math.sin(Math.PI*f)*v,Xe.lerp(a.z,l.z,f)),M.rotation.y=f*7}let w=a.kind==="kestrel";if(o.beam.visible=w&&d&&u<.82,o.streaks.visible=o.beam.visible,o.beam.visible){let b=qf(f*1.25,0,1);t.set(a.x,a.height,a.z+.59),n.set(l.x,.34,l.z).lerp(t,1-b),gb(o.beam,t,n,l.radius*(1-u*.55)),o.beam.material.opacity=(.31+.12*Math.sin(a.age*24))*(1-u),o.streaks.children.forEach((v,S)=>{let I=(a.age*1.9+S*.136)%1;v.position.copy(t).lerp(n,I),v.position.x+=Math.sin(S*1.8+a.age*11)*I*.78,v.position.y+=Math.cos(S*1.4+a.age*12)*I*.26})}o.ridge.visible=a.kind==="drill"&&p&&u<1,o.ridge.visible&&(o.ridge.position.set(l.x,.025,l.z),o.ridge.scale.set(1,Math.max(.02,Math.sin(Math.PI*Math.pow(u,.58))*1.35),1)),o.wave.visible=y&&(a.kind==="bruiser"||a.kind==="warden"),o.wave.visible&&(o.wave.position.set(a.x+x*f,.13,a.z+g*f),o.wave.scale.set(1.1+.37*f,.4+.25*f,1),o.wave.rotation.z=Math.atan2(x,g)-.59)})}}var Yf=128,Zf=4,Re={glow:0,smoke:1,glint:2,wave:3,crack:4,plus:5,arrow:6,flash:7,goldWave:8,ember:9};function _b(){let s=document.createElement("canvas");s.width=s.height=Yf*Zf;let e=s.getContext("2d");function t(a,o){e.save(),e.translate((a%Zf+.5)*Yf,(Math.floor(a/Zf)+.5)*Yf),o(),e.restore()}function n(a,o,c,l){let h=e.createRadialGradient(a,o,0,a,o,c);for(let[f,u]of l)h.addColorStop(f,u);e.fillStyle=h,e.fillRect(a-c,o-c,c*2,c*2)}let i="rgba(255,255,255,0)";t(Re.glow,()=>{n(0,0,57,[[0,"#fff"],[.18,"rgba(255,255,255,.94)"],[.43,"rgba(255,255,255,.41)"],[1,i]])}),t(Re.smoke,()=>{let a=[[-14,8,37],[18,8,32],[9,-13,32],[-15,-13,27],[3,3,40]];for(let[o,c,l]of a)n(o,c,l,[[0,"rgba(255,255,255,.62)"],[.38,"rgba(255,255,255,.42)"],[.77,"rgba(255,255,255,.13)"],[1,i]])}),t(Re.glint,()=>{n(0,0,44,[[0,"#fff"],[.16,"rgba(255,255,255,.9)"],[1,i]]),e.fillStyle="#fff",e.beginPath();for(let a=0;a<8;a++){let o=a*Math.PI/4,c=a%2?5:a%4?45:32,l=Math.cos(o)*c,h=Math.sin(o)*c;a===0?e.moveTo(l,h):e.lineTo(l,h)}e.closePath(),e.fill()}),t(Re.wave,()=>{n(0,0,60,[[0,i],[.7,i],[.78,"rgba(255,255,255,.26)"],[.86,"rgba(255,255,255,.94)"],[.9,"rgba(255,255,255,.60)"],[1,i]])}),t(Re.goldWave,()=>{n(0,0,58,[[0,"rgba(255,255,255,.25)"],[.41,"rgba(255,255,255,.08)"],[.66,i],[.81,"rgba(255,255,255,.18)"],[.88,"#fff"],[.92,"rgba(255,255,255,.65)"],[1,i]])}),t(Re.crack,()=>{n(0,0,40,[[0,"#c14d0d"],[.19,"rgba(158,63,22,.9)"],[.62,"rgba(80,52,51,.24)"],[1,"rgba(80,52,51,0)"]]);let a=783,o=()=>(a=a*16807%2147483647,a/2147483647);e.lineCap="round",e.lineJoin="round";for(let c=0;c<11;c++){let l=(c+o()*.55)*2*Math.PI/11,h=31+o()*29,f=0,u=0;for(let d=1;d<=4;d++){let p=l+(o()-.5)*.23,x=h*d/4,g=Math.cos(p)*x,m=Math.sin(p)*x;if(e.beginPath(),e.moveTo(f,u),e.lineTo(g,m),e.lineWidth=(5-d)*.62+.35,e.strokeStyle=d===1?"#793714":"#493e41",e.stroke(),d===2||d===3){let _=p+(o()>.5?.65:-.66);e.beginPath(),e.moveTo(g,m),e.lineTo(g+Math.cos(_)*9,m+Math.sin(_)*9),e.lineWidth=1,e.stroke()}f=g,u=m}}e.beginPath();for(let c=0;c<15;c++){let l=c*Math.PI*2/15,h=5+o()*10,f=Math.cos(l)*h,u=Math.sin(l)*h;c?e.lineTo(f,u):e.moveTo(f,u)}e.closePath(),e.fillStyle="#ff9021",e.fill()}),t(Re.plus,()=>{e.font="1000 80px Arial Black, Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.strokeStyle="#754508",e.lineWidth=9,e.strokeText("+1",0,6,110),e.strokeStyle="#422916",e.lineWidth=6.5,e.strokeText("+1",0,2,110);let a=e.createLinearGradient(0,-28,0,32);a.addColorStop(0,"#fff592"),a.addColorStop(.31,"#fff020"),a.addColorStop(1,"#ffbe00"),e.fillStyle=a,e.fillText("+1",0,2,110)}),t(Re.arrow,()=>{e.shadowColor="#00baff",e.shadowBlur=9,e.beginPath(),e.moveTo(0,-47),e.lineTo(35,-7),e.lineTo(16,-7),e.lineTo(16,40),e.lineTo(-16,40),e.lineTo(-16,-7),e.lineTo(-35,-7),e.closePath();let a=e.createLinearGradient(0,-45,0,40);a.addColorStop(0,"#f2ffff"),a.addColorStop(.45,"#67fff4"),a.addColorStop(1,"rgba(10,201,255,.38)"),e.fillStyle=a,e.fill(),e.shadowBlur=0,e.lineWidth=2,e.strokeStyle="rgba(227,255,255,.82)",e.stroke()}),t(Re.flash,()=>{n(0,0,58,[[0,"#fff"],[.21,"#fff"],[.36,"rgba(255,255,255,.85)"],[.71,"rgba(255,255,255,.18)"],[1,i]]);for(let a=0;a<9;a++){let o=a*Math.PI*2/9+.2,c=a%3===1?48:31;e.save(),e.rotate(o),e.beginPath(),e.moveTo(8,-4.2),e.lineTo(c,0),e.lineTo(8,4.2),e.closePath(),e.fillStyle="rgba(255,255,255,.76)",e.fill(),e.restore()}}),t(Re.ember,()=>{e.save(),e.scale(.45,1),n(0,0,53,[[0,"#fff"],[.37,"#fff"],[.65,"rgba(255,255,255,.58)"],[1,i]]),e.restore()});let r=new Gn(s);return r.colorSpace=gt,r}function vb(s,e){let t=new kt(1,1),n=new xs;n.setIndex(t.index),n.setAttribute("position",t.getAttribute("position")),n.setAttribute("uv",t.getAttribute("uv"));let i={};for(let[c,l]of[["anchor",3],["sizeModeTile",4],["tint",4],["rotation",1]]){let h=new en(new Float32Array(e*l),l);h.setUsage(Mn),n.setAttribute(c,h),i[c]=h}let r=new Ft({uniforms:{atlas:{value:_b()}},transparent:!0,depthWrite:!1,side:Gt,toneMapped:!1,vertexShader:`
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
      }`});r.forceSinglePass=!0;let a=new je(n,r);a.frustumCulled=!1,a.renderOrder=8,n.instanceCount=0,s.add(a);let o=0;return{clear(){o=0},write(c,l,h,f,u,d,p,x,g,m=0){o>=e||g<.008||(i.anchor.setXYZ(o,c,l,h),i.sizeModeTile.setXYZW(o,f,u,d?1:0,p),i.tint.setXYZW(o,x.r,x.g,x.b,g),i.rotation.setX(o,m),o++)},flush(){a.visible=o>0,n.instanceCount=o;for(let c of Object.values(i))c.clearUpdateRanges(),o&&c.addUpdateRange(0,o*c.itemSize),c.needsUpdate=!0}}}function Kf(s,e){let t=s.map(([a,o])=>new ce(o,a)),n=new so(t,e),i=new Float32Array(n.attributes.position.count*3),r=s.map(([,,a])=>new Te(a));for(let a=0;a<n.attributes.position.count;a++)r[a%r.length].toArray(i,a*3);return n.setAttribute("color",new zt(i,3)),n.rotateX(-Math.PI/2),n}function nh(s,e,t,n,i){let r=new tn(e,t,n);return r.instanceMatrix.setUsage(Mn),r.count=0,r.frustumCulled=!1,r.renderOrder=i,s.add(r),r}var Pe=Object.fromEntries(Object.entries({white:"#ffffff",pearl:"#fff5dc",aqua:"#64ffff",blue:"#18ccff",gold:"#ffd02f",orange:"#ff861d",fire:"#ff5a16",violet:"#c181ff",frost:"#a0edff",surf:"#68f4d5",dust:"#ece0cd",smoke:"#928180",steel:"#8f99a3"}).map(([s,e])=>[s,new Te(e)])),yb=["#555c69","#8e97a3","#abb4bc","#727986","#a5a7aa"].map(s=>new Te(s)),Mt=(s,e)=>s+(e-s)*Math.random(),No=(s,e,t)=>Math.min(t,Math.max(e,s)),Ri=Math.PI*2;function Mb(s,e){let t=new kt(1,1,5,1),n=new xs().copy(t),i=new en(new Float32Array(e*3),3),r=new en(new Float32Array(e*3),3),a=new en(new Float32Array(e*4),4);for(let[l,h]of[["trailStart",i],["trailEnd",r],["trailStyle",a]])n.setAttribute(l,h.setUsage(Mn));let o=new Ft({transparent:!0,depthWrite:!1,toneMapped:!1,side:Gt,vertexShader:`
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
        float radius = trailStyle.y * mix(0.19,1.0,smoothstep(0.0,0.83,t));
        vec3 vertex = center + side*(uv.y*2.0-1.0)*radius;
        gl_Position = projectionMatrix*viewMatrix*vec4(vertex,1.0);
        vUv=uv; vStyle=trailStyle.zw;
      }`,fragmentShader:`
      varying vec2 vUv;
      varying vec2 vStyle;
      void main() {
        float edge=abs(vUv.y*2.0-1.0);
        float pulse=step(0.5,vStyle.x)*(1.0-step(1.5,vStyle.x));
        float flame=step(1.5,vStyle.x);
        float gap=smoothstep(0.33,0.39,vUv.x)*(1.0-smoothstep(0.48,0.55,vUv.x));
        vec3 rim=mix(vec3(.012,.39,.96),vec3(.018,.67,.62),pulse);
        rim=mix(rim,vec3(.97,.24,.026),flame);
        vec3 core=mix(vec3(.70,1.0,1.0),vec3(1.0,.84,.40),flame);
        float alpha=(1.0-smoothstep(.64,1.0,edge))*smoothstep(0.0,.28,vUv.x);
        gl_FragColor=vec4(mix(rim,core,(1.0-smoothstep(.10,.61,edge))*vUv.x),alpha*vStyle.y*(1.0-.94*pulse*gap));
        #include <colorspace_fragment>
      }`});o.forceSinglePass=!0;let c=new je(n,o);return c.frustumCulled=!1,c.renderOrder=4,n.instanceCount=0,s.add(c),{write(l,h,f,u,d,p,x){i.setXYZ(l,h.x,h.y,h.z),r.setXYZ(l,f.x,f.y,f.z),a.setXYZW(l,u,d,p,x)},flush(l){if(n.instanceCount=l,c.visible=l>0,!!l)for(let h of[i,r,a])h.clearUpdateRanges(),h.addUpdateRange(0,l*h.itemSize),h.needsUpdate=!0}}}function Lm(s){let e=vb(s,650),t=nh(s,Kf([[-.33,.004,"#1395ec"],[-.14,.026,"#28d7ff"],[.1,.039,"#b4fbff"],[.24,.025,"#e8ffff"],[.3,.002,"#ebffff"]],7),new It({vertexColors:!0,toneMapped:!1}),320,3),n=nh(s,Kf([[-.38,.003,"#b9430d"],[-.37,.127,"#dd7117"],[-.31,.18,"#ff9c1a"],[-.25,.19,"#ffc32d"],[-.21,.158,"#ef8d18"],[-.15,.166,"#ffb824"],[.23,.175,"#ffce36"],[.37,.16,"#ffcb2c"],[.48,.117,"#ffdb46"],[.54,.059,"#ffdc56"],[.56,.001,"#fff1a3"]],14),new Ot({vertexColors:!0,emissive:3609856,specular:16772528,shininess:62}),24,3),i=nh(s,Kf([[-1.52,.003,"#ef5615"],[-1.18,.07,"#fc641b"],[-.77,.114,"#ff9f13"],[-.49,.149,"#ffe039"],[-.31,.112,"#fff8af"]],10),new It({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1}),24,6),r=nh(s,new Za(1,0),new Ot({color:16777215,specular:5660779,shininess:18}),88,2),a=new Pt,o=[],c=[],l=[],h=[],f=5;function u(G,L,K,A,V,H,W,k={}){if(o.length>=260){if(!k.priority&&G!==Re.plus&&G!==Re.arrow&&G!==Re.crack)return;let re=o.findIndex(pe=>pe.tile===Re.smoke||pe.tile===Re.glint||pe.tile===Re.glow);if(re<0)return;l.push(o[re]),o[re]=o[o.length-1],o.pop()}let O=l.pop()||{};O.tile=G,O.x=L,O.y=K,O.z=A,O.start=V,O.end=H,O.life=W,O.age=0,O.color=k.color||Pe.white,O.alpha=k.alpha??1,O.ratio=k.ratio??1,O.vx=k.vx||0,O.vy=k.vy||0,O.vz=k.vz||0,O.gravity=k.gravity||0,O.angle=k.angle||0,O.spin=k.spin||0,O.flat=k.flat||!1,O.world=k.world??!0,O.hold=k.hold??.12,o.push(O)}function d(G,L,K,A,V,H){for(let W=0;W<V;W++){let k=(W+Math.random()*.5)*Ri/V,O=Mt(.12,.42)*A,re=Mt(.75,2.15)*A;u(Re.smoke,G+Math.cos(k)*O,L+Mt(.02,.14),K+Math.sin(k)*O,Mt(.23,.47)*A,Mt(.71,1.12)*A,Mt(.36,.6),{color:H,alpha:Mt(.4,.63),vx:Math.cos(k)*re,vz:Math.sin(k)*re,vy:Mt(.35,1.05),spin:Mt(-1.5,1.5),angle:k})}}function p(G,L,K,A,V){for(let H=0;H<V;H++){let W=(H+Math.random())*Ri/V,k=Mt(1.8,4.3)*A;u(Re.ember,G,L,K,Mt(.22,.39)*A,.035,Mt(.21,.42),{color:H%3?Pe.orange:Pe.pearl,vx:Math.cos(W)*k,vz:Math.sin(W)*k,vy:Mt(.8,2.5)*A,gravity:5,angle:W,spin:Mt(-2,2),ratio:1.7})}}let x=["#65d8cd","#dafff3","#4cb9b2"].map(G=>new Te(G)),g=["#e4b879","#925c3b","#c28b57"].map(G=>new Te(G));function m(G,L,K,A,V,H=!1,W=yb){for(let k=0;k<A&&c.length<r.instanceMatrix.count;k++){let O=h.pop()||{};if(O.x=G+Mt(-1.75,1.75)*V,O.y=L+Mt(.14,.9),O.z=K+Mt(-.24,.3),O.vx=Mt(-2.8,2.8),O.vz=Mt(-1.8,3.5),O.vy=Mt(2.2,5.2),H){let re=(k+Math.random())*Ri/A,pe=Mt(2.2,4.4);O.x=G+Math.cos(re)*.48,O.z=K+Math.sin(re)*.48,O.vx=Math.cos(re)*pe,O.vz=Math.sin(re)*pe}O.size=Mt(.085,.245)*V,O.stretch=Mt(.52,1.65),O.rx=Mt(-2,2),O.ry=Mt(-2,2),O.spin=Mt(2,8),O.age=0,O.life=Mt(.52,1.04),O.color=W[k%W.length],c.push(O)}}let _=new qs(1,2),y=new Ft({uniforms:{age:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec3 orb; varying vec3 eye; varying vec3 n; void main(){
      orb=position;vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);
      eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,fragmentShader:`varying vec3 orb;varying vec3 eye;varying vec3 n;uniform float age;
      void main(){float swirl=sin(orb.y*9.+sin(orb.z*5.+age*8.))*sin(orb.x*6.-age*6.);
        float heat=clamp(max(0.,dot(normalize(n),normalize(eye)))+.13*swirl-age*.7,0.,1.);
        vec3 fire=mix(vec3(.94,.16,.026),vec3(1.,.80,.20),smoothstep(.12,.53,heat));
        fire=mix(fire,vec3(1.,.98,.77),smoothstep(.55,.86,heat));
        gl_FragColor=vec4(fire,1.-smoothstep(.52,1.,age));}`}),M=new Ct,w=[[0,.2,0,1.02],[-.62,.06,.08,.65],[.55,.14,-.2,.74],[-.16,.57,-.13,.64],[.33,.36,.36,.48]];for(let[G,L,K,A]of w){let V=new je(_,y);V.position.set(G,L,K),V.scale.setScalar(A),V.renderOrder=3,M.add(V)}M.visible=!1,s.add(M);let b=1;function v(G,L,K,A,V=1){let H=No(V,.62,2.05);switch(G){case"cardHit":u(Re.glint,L,K,A+.1,.35,.7,.12,{color:Pe.pearl}),p(L,K,A,.45,3);return;case"supplyBreak":u(Re.flash,L,K,A,.46,1.45,.13,{color:Pe.pearl}),u(Re.wave,L,.07,A,.4,2.45,.32,{flat:!0,color:Pe.aqua}),p(L,K,A,.86,10);return;case"shieldHit":u(Re.wave,L,.1,A,.4,1.75,.26,{flat:!0,color:Pe.aqua}),u(Re.glint,L,K,A,.26,.68,.14,{color:Pe.pearl});return;case"hostileMuzzle":u(Re.flash,L,K,A,.32,.63,.14,{color:Pe.orange});return;case"bruiserCast":case"wardenCast":for(let W of[-1,1])d(L+W*.6,.16,A,1,4,Pe.dust);return;case"diverCast":for(let W of[-1,1])u(Re.wave,L+W*.95,K,A,.32,1.45,.32,{color:Pe.surf});return;case"drillCast":d(L,.2,A,1.21,7,Pe.violet);return;case"kestrelCast":u(Re.glow,L,K,A+.43,.32,1.37,.36,{color:Pe.frost});return;case"engineCast":for(let W of[-1,1])u(Re.flash,L+W*.72,K+.32,A-.2,.4,1.12,.17,{color:Pe.orange});return;case"bruiserStrike":case"wardenStrike":u(Re.crack,L,.043,A,1.4,2.55,.77,{flat:!0,hold:.31}),d(L,.16,A,1.18,8,Pe.dust),m(L,.12,A,7,.55,!0);return;case"diverStrike":u(Re.wave,L,.09,A,.31,2.29,.46,{flat:!0,color:Pe.surf});for(let W=0;W<9;W++){let k=W*Ri/9;u(Re.glow,L,.22,A,.18,.06,.43,{color:Pe.aqua,vx:Math.cos(k)*2.1,vz:Math.sin(k)*2.1,vy:1.5,gravity:3.6})}return;case"drillStrike":d(L,.17,A,.77,5,Pe.violet),u(Re.glint,L,.35,A,.26,1,.19,{color:Pe.violet});return;case"kestrelStrike":u(Re.wave,L,.08,A,.35,2.78,.54,{flat:!0,color:Pe.frost}),d(L,.28,A,.98,7,Pe.frost);return;case"engineStrike":u(Re.flash,L,.45,A,.82,2.2,.19,{color:Pe.orange,priority:!0}),u(Re.wave,L,.07,A,.34,2.63,.37,{flat:!0,color:Pe.gold}),d(L,.2,A,1.1,8,Pe.smoke),p(L,.3,A,1.08,12);return;case"finisher":p(L,K,A,1.35,16),u(Re.flash,L,K,A,.65,1.45,.13,{color:Pe.pearl});return;case"hit":if(f<1)return;f--,p(L,K,A,.48,3),u(Re.glint,L,K,A,.26,.47,.105,{color:Pe.aqua,angle:Mt(0,Ri)});return;case"muzzle":u(Re.flash,L,K,A,.47*H,.83*H,.105,{color:Pe.pearl,angle:Mt(0,Ri),world:!1}),u(Re.glow,L,K,A,.82*H,.38*H,.13,{color:Pe.orange,alpha:.7,world:!1});return;case"impact":case"slam":{let W=G==="slam",k=H*(W?1.4:1),O=W?.16:Math.max(.17,K*.58);if(W){m(L,.04,A,12,.61,!0);for(let re of[-1,1])u(Re.flash,L+re*.57,.12,A,.58,.93,.1,{color:Pe.pearl})}u(Re.crack,L,.035,A,2.02*k,2.33*k,W?2:1.42,{flat:!0,angle:Mt(0,Ri),hold:.62}),u(Re.wave,L,.065,A,.42*k,W?2*2.15/.81:3.16*k,.32,{flat:!0,color:W?Pe.gold:Pe.pearl,alpha:.83}),u(Re.flash,L,O,A,.6*k,1.85*k,.16,{color:Pe.gold,angle:Mt(0,Ri)}),u(Re.glow,L,O+.06,A,.39*k,.93*k,.1,{color:Pe.pearl}),d(L,.17,A,k,W?12:7,W?Pe.dust:Pe.smoke),p(L,O,A,k,W?10:5);return}case"wallHit":u(Re.flash,L,Math.max(K,.4),A+.12,.38*H,1.12*H,.13,{color:Pe.pearl}),d(L,Math.max(.35,K),A,.61*H,3,Pe.steel),p(L,Math.max(.4,K),A,.59*H,3);return;case"wallBreak":m(L,.24,A,22,Math.min(1.17,H)),u(Re.flash,L,.72,A,.85*H,2.8*H,.19,{color:Pe.pearl}),u(Re.wave,L,.062,A,.6,4.7,.38,{flat:!0,color:Pe.dust});for(let W=-1;W<=1;W++)d(L+W*1.17,.3,A,.98,4,Pe.steel);p(L,.8,A,H,7);return;case"plus":{u(Re.wave,L,.09,A,.12,1.28,.23,{flat:!0,color:Pe.aqua});let W=Math.max(0,K);u(Re.goldWave,L,.055,A,.22,.96,.34,{flat:!0,world:!1,color:Pe.gold}),u(Re.glow,L,W+.36,A,.45,.82,.28,{ratio:1.75,world:!1,color:Pe.gold}),u(Re.glint,L+.08,W+.57,A,.35,.14,.23,{world:!1,color:Pe.pearl}),u(Re.plus,L+Mt(-.13,.13),W+.83,A,.8,1.04,.65,{world:!1,vy:1.1,hold:.62});return}case"merge":{u(Re.goldWave,L,.12,A,2.15,.32,.27,{flat:!0,color:Pe.gold});let W=No(H*1.55,1.5,2.5);u(Re.goldWave,L,.061,A,.38,W,.46,{flat:!0,world:!1,color:Pe.aqua,hold:.3}),u(Re.goldWave,L,.077,A,.17,W*.72,.38,{flat:!0,world:!1,color:Pe.gold}),u(Re.glow,L,K+.62,A,.77*H,1.6*H,.32,{color:Pe.gold,world:!1,ratio:1.3,alpha:.72});for(let k=0;k<3;k++){let O=(k+.16)*Ri/3;u(Re.arrow,L+Math.cos(O)*W*.31,K+.3,A+Math.sin(O)*W*.34,.38,.65,.51+k*.035,{color:Pe.white,hold:.42,vy:1.55+.15*k,world:!1})}return}case"victory":case"vaultLand":u(Re.wave,L,.06,A,.55,G==="victory"?3.9:2.7,.33,{flat:!0,color:Pe.dust,alpha:.7});for(let W of[-1,1])d(L+W*.63,.12,A,.88,4,Pe.dust);return;case"bossBurst":b=0,M.position.set(L,.8,A),M.visible=!0,u(Re.goldWave,L,.08,A,.6,5.55,.48,{flat:!0,color:Pe.gold,priority:!0});for(let[W,k,O]of[[0,0,2.85],[-.58,.23,1.65],[.67,-.2,1.9]])u(Re.glow,L+W,K+.19,A+k,O*.54,O*1.13,.34,{color:Pe.orange,vy:.83,priority:!0}),u(Re.flash,L+W,K+.22,A+k,O*.31,O,.22,{color:Pe.gold,angle:W*2.4,vy:.9,priority:!0});u(Re.glint,L,K+.35,A,.8,2.65,.13,{color:Pe.pearl,priority:!0}),m(L,.42,A,17,.91,!0),p(L,K+.38,A,1.57,24),d(L,.35,A,1.5,10,Pe.smoke);return;case"glassBreak":m(L,K,A,18,.92,!1,x),u(Re.wave,L,.06,A,.5,4.85,.31,{flat:!0,color:Pe.aqua});for(let W of[-1.09,0,1.09])u(Re.glint,L+W,K+.25,A,.19,.74,.2,{color:Pe.pearl});return;case"crateBreak":m(L,K,A,16,1.04,!1,g),d(L,.32,A,.7,5,Pe.smoke);return;case"latchHit":p(L,K,A,1.06,8);return;case"rally":u(Re.wave,L,.08,A,.46,3.05,.49,{flat:!0,color:Pe.aqua});return;case"chainSnap":for(let W of[-1,1])p(L+W*1.86,1.04,A,1.15,9);u(Re.flash,L,K,A,.38,1.4,.15,{color:Pe.pearl});return;case"discharge":u(Re.wave,L,.1,A,.45,8.5,.35,{flat:!0,color:Pe.aqua}),u(Re.flash,L,K+.45,A,.63,3.4,.23,{color:Pe.aqua});for(let W=0;W<7;W++){let k=W*Ri/7;u(Re.glint,L+Math.cos(k)*1.46,.5,A+Math.sin(k)*1.46,.25,1.03,.26,{color:Pe.pearl,angle:k})}return}}let S=new P(0,0,-1),I=new P,C=new P,N=new P,z=Mb(s,384);function X(G,L){let K=0,A=0,V=0;for(let H of G){let W=H.kind==="rocket",k=H.profile===Ps,O=H.profile===Bo||k,re=Math.max(0,H.distance-H.profile.tail+H.afterHit*H.profile.speed);if(hr(H,re,C),H.distance-re>.012&&V<384){hr(H,(re+H.distance)*.5,N);let pe=N.y-(C.y+H.y)*.5,Ie=H.range>4?No((H.range-re)/1.6,0,1):1;z.write(V++,C,H,pe,W?.093:k?.092:O?.066:.052,W?2:O?1:0,Ie*.91)}if(!H.finished){if(hr(H,H.distance+.015,N),I.set(N.x-H.x,N.y-H.y,N.z-H.z).normalize(),a.quaternion.setFromUnitVectors(S,I),a.position.set(H.x,H.y,H.z),!W&&K<t.instanceMatrix.count)a.scale.set(O?1.54:1.13,O?1.54:1.13,O?.62:.83),a.updateMatrix(),t.setMatrixAt(K++,a.matrix),H.age<.045&&e.write(H.startX,H.startY,H.startZ,.21,.21,!1,Re.flash,Pe.aqua,.65*(1-H.age/.045));else if(W&&A<n.instanceMatrix.count){let pe=.63+Math.min(.19,H.power*.055);a.scale.setScalar(pe),a.updateMatrix(),n.setMatrixAt(A,a.matrix),a.scale.z*=.9,a.updateMatrix(),i.setMatrixAt(A++,a.matrix),L>0&&Math.floor(H.age*16)!==Math.floor(Math.max(0,H.age-L)*16)&&u(Re.smoke,C.x,C.y,C.z,.14*pe,.39*pe,.19,{color:Pe.dust,alpha:.38,vy:.19,world:!1})}}}z.flush(V),t.count=K,n.count=i.count=A,t.visible=K>0,n.visible=i.visible=A>0,K&&(t.instanceMatrix.needsUpdate=!0),A&&(n.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0)}function D(G,L,K,A=[]){if(M.visible){b+=G;let W=Math.min(1,b/.44);M.position.z+=L,M.position.y+=.74*G,M.scale.setScalar(.28+.94*Math.sin(Math.PI*Math.sqrt(W))),y.uniforms.age.value=W,W>=1&&(M.visible=!1)}let V=No(G,0,.12);f=Math.min(6,f+V*21),e.clear(),X(K,V);for(let W of A)e.write(W.x-W.vx*.038,W.y,W.z-W.vz*.038,.3,.52,!1,Re.glow,Pe.fire,.8),e.write(W.x,W.y,W.z,.3,.34,!1,Re.glint,Pe.gold,.98);for(let W=o.length-1;W>=0;W--){let k=o[W];if(k.age+=V,k.age>=k.life){l.push(k),o[W]=o[o.length-1],o.pop();continue}k.x+=k.vx*V,k.y+=k.vy*V,k.z+=k.vz*V+(k.world?L:0),k.vy-=k.gravity*V,k.angle+=k.spin*V}for(let W=0;W<2;W++)for(let k of o){if((k.tile===Re.plus||k.tile===Re.arrow)!==(W===1))continue;let re=k.age/k.life,pe=1-(1-re)*(1-re),Ie=Xe.lerp(k.start,k.end,pe),me=1-No((re-k.hold)/(1-k.hold),0,1);e.write(k.x,k.y,k.z,Ie,Ie*k.ratio,k.flat,k.tile,k.color,k.alpha*me,k.angle)}e.flush();let H=0;for(let W=c.length-1;W>=0;W--){let k=c[W];if(k.age+=V,k.age>=k.life){h.push(k),c[W]=c[c.length-1],c.pop();continue}k.x+=k.vx*V,k.z+=k.vz*V+L,k.y+=k.vy*V,k.vy-=11*V,k.y<k.size*.4&&(k.y=k.size*.4,k.vy=Math.abs(k.vy)*.22,k.vx*=.78,k.vz*=.78);let O=Math.min(1,(k.life-k.age)*5);a.position.set(k.x,k.y,k.z),a.rotation.set(k.rx+k.age*k.spin,k.ry-k.age*k.spin*.56,k.age*k.spin*.77),a.scale.set(k.size*k.stretch*O,k.size*.74*O,k.size*O),a.updateMatrix(),r.setMatrixAt(H,a.matrix),r.setColorAt(H++,k.color)}r.count=H,r.visible=H>0,H&&(r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0)}function q(){M.visible=!1,l.push(...o),h.push(...c),o.length=c.length=0,f=5,z.flush(0);for(let G of[t,n,i,r])G.count=0,G.visible=!1;e.clear(),e.flush()}return q(),{update:D,burst:v,reset:q}}var Nm={ally:{width:.467,height:.86,pivot:.49,pad:.008,capacity:180,grid:[6,8]},captain:{width:1.13,height:1.73,pivot:.43,pad:.009,capacity:1,grid:[13,16]},grunt:{width:.522,height:.86,pivot:.5,pad:.011,capacity:1800,grid:[6,8]}},ih=Xe.clamp,la=Xe.smoothstep,bb=`
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
    float sideSign = smoothstep(pivot-0.07,pivot+0.07,uv.x)*2.0-1.0;
    float boots = (1.0-smoothstep(0.08,0.34,uv.y));
    float arms = smoothstep(.15,.32,abs(uv.x-pivot)) * smoothstep(.22,.38,uv.y)
               * (1.0-smoothstep(.46,.63,uv.y));
    float lift = max(0.0,sideSign*feet.z);
    float swing = mix(feet.y,feet.x,sideSign*.5+.5);
    #ifdef CAPTAIN
      arms *= mix(1.0,0.18,smoothstep(pivot,pivot+0.12,uv.x));
    #endif
    point.x += swing * (0.042*arms-0.032*boots) + stride*.014*uv.y;
    point.y += .141*lift*boots + .026*abs(feet.z)*(1.0-boots) + swing*.058*arms;
    float depthSwing = (boots*${na/.86}-arms*.16)*swing*dimensions.y;
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
`,Sb=`
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
`;function Eb(s,e,t,n,i){let r=Nm[e],a=new Float32Array(3),o=new kt(1,1,...r.grid),c=new xs().copy(o),l={};for(let[d,p]of[["anchor",3],["dimensions",2],["motion",4],["feet",3],["fallAngle",1],["treatment",4]]){let x=new en(new Float32Array(r.capacity*p),p);x.setUsage(Mn),l[d]=x,c.setAttribute(d,x)}c.instanceCount=0,t.colorSpace=gt,t.magFilter=Zt,t.minFilter=Un,t.generateMipmaps=!0;let h=new Ft({uniforms:{portrait:{value:t},cameraRight:{value:n},cameraLift:{value:i},pivot:{value:r.pivot},padding:{value:r.pad}},defines:e==="captain"?{CAPTAIN:1}:e==="ally"?{ALLY:1}:{},vertexShader:bb,fragmentShader:Sb,depthWrite:!0,transparent:!1,toneMapped:!1,alphaToCoverage:!0}),f=new je(c,h);f.name=`AI ${e}`,f.visible=!1,f.frustumCulled=!1,s.add(f);let u=0;return{begin(){u=0},clear(){u=0,c.instanceCount=0,f.visible=!1},add(d,p,x,g,m,_,y,M=0,w=0,b=0,v=0,S=0,I=0,C=0){u>=r.capacity||g<=.001||m<=.001||(l.fallAngle.setX(u,C),l.anchor.setXYZ(u,d,p,x),l.dimensions.setXY(u,r.width*g,r.height*m),l.motion.setXYZW(u,_,y,M,w),vs(_,y,a),l.feet.setXYZ(u,a[0],a[1],a[2]),l.treatment.setXYZW(u,b,v,S,I),u++)},flush(){if(c.instanceCount=u,f.visible=u>0,!!u)for(let d of Object.values(l))d.clearUpdateRanges(),d.addUpdateRange(0,u*d.itemSize),d.needsUpdate=!0}}}async function Dm(s){let e=new Zi,t=Object.keys(Nm),n=await Promise.allSettled(t.map(u=>e.loadAsync(`./art/${u}-field.webp`))),i=n.find(u=>u.status==="rejected");if(i){for(let u of n)u.status==="fulfilled"&&u.value.dispose();throw new Error("\u89D2\u8272\u63D2\u753B\u52A0\u8F7D\u5931\u8D25",{cause:i.reason})}let r=new P,a=new P,o=new P,c=Object.fromEntries(t.map((u,d)=>[u,Eb(s,u,n[d].value,r,a)])),l=Object.values(c),h=()=>l.forEach(u=>u.clear());function f(u,d,p,x){if(x!=="ai"&&x!=="hybrid"){h();return}for(let y of l)y.begin();d.updateWorldMatrix(!0,!1),r.setFromMatrixColumn(d.matrixWorld,0),r.y=0,r.normalize(),o.setFromMatrixColumn(d.matrixWorld,1),a.set(0,1,0).lerp(o,.42).normalize();let g=x==="ai",m=u.phase==="ready"?.3:u.playing||u.overrun||u.parade?1:0,_=p*10.8+(u.parade?u.endTime*5.6:0);for(let y of u.columns)for(let M of y.units)M.alive&&c.grunt.add(M.x,M.lift||0,M.z,M.size,M.size,ia(M),m);for(let y of u.runners)y.alive&&c.grunt.add(y.x,y.lift||0,y.z,y.size,y.size,ia(y),m);for(let y of u.allies){let M=ih(y.age/.32,0,1),w=.81+.19*M+.095*Math.sin(M*Math.PI);c.ally.add(y.x,.035*Math.sin(M*Math.PI),y.z,w,w,_+y.phase,m,0,0,.8*(1-M),.22*(1-M))}for(let y of u.deliveries){if(y.slot==null||y.age<0)continue;let M=.65+.35*y.progress;c.ally.add(y.x,y.y,y.z,M,M,_+y.phase,.55,0,0,.42,.24)}{for(let y of u.falling){if(y.prone){let S=la(y.t,0,.42),I=y.size*(u.overrun?1:1-la(y.t,1.78,2.1));c.ally.add(y.x,.09*S,y.z,I,I,0,0,.1*S*y.dir,0,0,0,.3*S,0,1.5*S);continue}let M=ih(y.t/1.02,0,1),w=y.size*(1-la(M,.78,1)),b=y.roll*y.t+.16*Math.sin(y.spin*y.t);(y.side==="red"?c.grunt:c.ally).add(y.x,y.y,y.z,w,w,_+y.phase,0,b,0,0,.64*(1-la(M,.04,.31)),.72*la(M,.05,.31))}if(g&&(u.phase!=="lost"||u.overrun||u.endTime<.25)){let y=u.visualScale,M=u.overrun?la(u.endTime,0,.5):0,w=u.phase==="lost"&&!u.overrun?ih(u.endTime/.25,0,1):0;c.captain.add(u.x,u.rope?.68*Math.sin(Math.PI*u.rope.age/.58):.1*M,u.captainZ,y,y*(1-.55*w),_*.83,u.overrun?0:m,-.38*w-.12*M,u.recoil,.66*u.mergeGlow,.14*u.mergeGlow+.48*u.hurt+.32*w,0,ih(u.velocity*.007,-.095,.095),1.5*M)}}for(let y of l)y.flush()}return{draw:f,clear:h,captainTexture:n[t.indexOf("captain")].value,gruntTexture:n[t.indexOf("grunt")].value,allyTexture:n[t.indexOf("ally")].value}}var sn=new Pt;function Um(s,e,t){let n=new Float32Array(3),i=om(e,"near"),r=new en(new Float32Array(t*4),4).setUsage(Mn);i.setAttribute("stepPose",r);let a=new Ot({vertexColors:!0,shininess:37,specular:3225412});a.customProgramCacheKey=()=>"infantry-walk-"+e,a.onBeforeCompile=h=>{h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
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
        vec2 sole = position.yz + vec2(.118*lift,facing*${na}*stride);
        transformed.yz = mix(transformed.yz,sole,boot);
        transformed.y += .022*abs(stepPose.w)*(1.0-boot);
        transformed.x += stepPose.y*.018*position.y + sign(limb)*arm*.009*stride;`),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
varying float vGlow;`).replace("#include <color_fragment>",`#include <color_fragment>
      if (vGlow <= -1.0) {
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.34)*.74;
        diffuseColor.rgb = mix(faded,vec3(1.,.85,.64),clamp(-vGlow-1.,0.,1.)*.64);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.72,.18), clamp(vGlow,0.0,1.0)*.94);`)};let o=new tn(i,a,t),c;o.count=0,o.frustumCulled=!1,o.instanceMatrix.setUsage(Mn),s.add(o);let l=0;return{paint(h,f){c=af(e,h,f,r,t),c.instanceMatrix=o.instanceMatrix,s.add(c)},begin(){l=0},put(h,f,u,d,p=0,x=0,g=0,m=0,_=0,y=0){l>=t||(sn.position.set(h,f,u),sn.rotation.set(x,g,m),sn.scale.setScalar(d),sn.updateMatrix(),o.setMatrixAt(l,sn.matrix),vs(_,y,n),r.setXYZW(l,p,n[0],n[1],n[2]),l++)},end(){o.count=l,o.visible=l>0&&!c,c&&(c.count=l,c.visible=l>0),o.instanceMatrix.needsUpdate=!0,r.needsUpdate=!0}}}function wb(s){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(30,33,1,32,32,31);n.addColorStop(0,"rgba(22,23,45,.63)"),n.addColorStop(.5,"rgba(24,27,49,.47)"),n.addColorStop(.83,"rgba(32,32,53,.20)"),n.addColorStop(1,"rgba(32,32,53,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let i=new Gn(e);i.colorSpace=gt;let r=new kt(1,1);r.rotateX(-Math.PI/2);let a=new tn(r,new It({map:i,transparent:!0,depthWrite:!1,toneMapped:!1}),1600);a.frustumCulled=!1,a.instanceMatrix.setUsage(Mn),a.renderOrder=1,s.add(a);let o=0;return{begin(){o=0},put(c,l,h,f=1){o>=1600||(sn.position.set(c+h*.3,.021,l-h*.2),sn.rotation.set(0,.65,0),sn.scale.set(h*1.4,.95,h*.79*f),sn.updateMatrix(),a.setMatrixAt(o++,sn.matrix))},end(){a.count=o,a.instanceMatrix.needsUpdate=!0}}}function sh(s,e,t,n,i){let r=new ro(e,s,64);r.rotateX(-Math.PI/2);let a=new je(r,new It({color:t,transparent:!0,opacity:n,depthWrite:!1,toneMapped:!1}));return a.renderOrder=3,i.add(a),a}function Fm(s,e){let t=new Vc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});t.setClearColor(599616,0),t.outputColorSpace=gt;let n=new Oa;n.add(new co(16054527,8753847,1.55));let i=new gs(16772828,2);i.position.set(-8,16,6),n.add(i);let r=new gs(12839167,.63);r.position.set(7,8,-8),n.add(r);let a=new rn(41,1,.15,150),o=new P,c=cm();n.add(c.root);let l=sh(2.15,2.15-.055,16748086,.82,n),h=sh(2.15,2.15-.115,16761949,.38,n),f,u=Em().then(A=>{f=A,n.add(A.root)}),d=Um(n,"blue",180),p=Um(n,"red",1800),x=wb(n),g=sh(.68,.634,6618933,.94,n),m=sh(.72,.606,6749239,.21,n),_=new je(new hi(1,28,12,0,Math.PI*2,0,Math.PI/2),new Ft({transparent:!0,depthWrite:!1,vertexShader:"varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}",fragmentShader:"varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),2.1);gl_FragColor=vec4(.27,.86,1.,.024+.41*rim);}"}));n.add(_);let y=new tn(new Ys(.18),new Ot({color:7133695,emissive:1530771}),20);y.frustumCulled=!1,n.add(y);let M={},w=new Ot({vertexColors:!0});for(let A of["gunner","guard","bomber","standard","vault","courier"]){let V=new tn(lm(A),w,32);V.frustumCulled=!1,n.add(V),M[A]=V}let b=Pm(n),v=Cm(n),S=Lm(n),I=null,C=Dm(n).then(A=>(I=A,c.paint(A.captainTexture,A.gruntTexture),d.paint(A.allyTexture,A.gruntTexture),p.paint(A.gruntTexture,A.allyTexture),!0)).catch(A=>(console.warn("\u89D2\u8272\u8D34\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u5DF2\u4F7F\u7528 3D \u6A21\u578B",A),!1)),N=Promise.all([u,C]).then(([,A])=>A),z=-3.72,X=0,D=1,q=1,G=Math.min(devicePixelRatio||1,1.65),L=()=>{D=e.clientWidth,q=e.clientHeight,a.aspect=D/Math.max(1,q),a.fov=Xe.clamp(41+(.54-a.aspect)*27,37,47),a.updateProjectionMatrix(),t.setPixelRatio(G),t.setSize(D,q,!1)};L();function K(A,V,H,W,k){I||(k="3d");let O=A.playing,re=k!=="ai",pe=1-Math.exp(-8.5*H),Ie=A.boss.defeatAge,me=A.boss.defeated?.18*Xe.smoothstep(Ie,0,.42)*(1-Xe.smoothstep(Ie,.82,1.65)):0,Oe=19.5*Math.tan(Xe.degToRad(a.fov/2))*a.aspect,ft=Math.sign(A.x)*Math.max(0,Math.abs(A.x)-Oe*.54),Ne=Xe.lerp(ft,A.boss.x,me),Ke=(A.boss.z+5.4)*me;z+=(Ne-z)*pe,X=Math.max(0,X-H*1.75);let Qe=Math.sin(V*58)*X*X*.19,ie=Math.sin(V*72)*X*X*.12;a.position.set(z+Qe,15+ie-me*1.2,13.2+Ke),a.lookAt(z+.06+Qe,.12,-7.45+Ke),a.updateMatrixWorld();let ae=O||A.overrun||A.parade?1:0,oe=V*10.8+(A.parade?A.endTime*5.6:0);v.update(A),x.begin(),d.begin(),p.begin();for(let ee of A.columns)for(let R of ee.units){if(!R.alive||R.z<A.entryZ-3)continue;k==="3d"&&p.put(R.x,R.lift||0,R.z,R.size,0,0,R.yaw,0,ia(R),ae);let E=Xe.smoothstep(R.z,-45,-30);E>0&&x.put(R.x,R.z,.64*E)}for(let ee of Object.values(M))ee.count=0;for(let ee of A.runners){if(!ee.alive)continue;let R=M[ee.role];R&&R.count<R.instanceMatrix.count&&(sn.position.set(ee.x,(ee.lift||0)+.012,ee.z),sn.rotation.set(0,ee.yaw,0),sn.scale.setScalar(ee.size),sn.updateMatrix(),R.setMatrixAt(R.count++,sn.matrix)),k==="3d"&&p.put(ee.x,ee.lift||0,ee.z,ee.size,0,0,ee.yaw,0,ia(ee),ae),x.put(ee.x,ee.z,.67)}for(let ee of Object.values(M))ee.instanceMatrix.needsUpdate=ee.count>0;for(let ee of A.allies){let R=1;ee.age<.25&&(R=.55+.45*Math.min(1,ee.age/.15)+Math.sin(Math.PI*Math.min(1,ee.age/.25))*.18),k==="3d"&&d.put(ee.x,0,ee.z,R,Math.max(0,1-ee.age*2.8),0,-A.velocity*.014,0,oe+ee.phase,ae),x.put(ee.x,ee.z,.71*R)}let Ee=0;function ge(ee,R,E,Y){Ee>=y.instanceMatrix.count||(sn.position.set(ee,R,E),sn.rotation.set(.18,V*4,0),sn.scale.setScalar(Y),sn.updateMatrix(),y.setMatrixAt(Ee++,sn.matrix))}for(let ee of A.deliveries)ee.age<0||(ee.slot==null?ge(ee.x,ee.y+.14,ee.z,1.5):k==="3d"&&d.put(ee.x,ee.y,ee.z,.65+.35*ee.progress,.42,0,0,0,oe+ee.phase,.55));if(A.buffs.drone>0)for(let ee of[-1,1])ge(A.x+ee*1.15,1.3+.06*Math.sin(V*6),A.captainZ-.32,1);y.count=Ee,y.instanceMatrix.needsUpdate=Ee>0,_.visible=O&&A.buffs.shield>0,_.visible&&(_.position.set(A.x,.06,A.captainZ),_.scale.set(1.52*A.scale,1.55,1.28*A.scale));for(let ee of A.falling){let R=Xe.smoothstep(ee.t,0,.42),E=(ee.size||1)*(ee.prone?A.overrun?1:1-Xe.smoothstep(ee.t,1.78,2.1):1-Math.pow(Math.min(1,ee.t/1.02),4));k==="3d"&&(ee.side==="red"?p:d).put(ee.x,ee.prone?.15*R:ee.y,ee.z,E,-2+Xe.smoothstep(ee.t,.018,.15),ee.prone?1.48*R:ee.spin*ee.t,ee.prone?.12*ee.dir:ee.phase,ee.prone?.16*R*ee.dir:ee.roll*ee.t),ee.y<2&&x.put(ee.x,ee.z,.64*E)}let He=A.phase==="lost",Le=A.visualScale,et=A.overrun?Xe.smoothstep(A.endTime,0,.5):0,tt=He&&!A.overrun;c.root.visible=re&&(!tt||A.endTime<.4);let dt=A.rope?.68*Math.sin(Math.PI*A.rope.age/.58):0;c.root.position.set(A.x,A.overrun?.25*et:tt?Math.sin(Math.min(1,A.endTime/.4)*Math.PI)*.64:dt,A.captainZ),c.root.rotation.set(1.45*et,He?0:-A.velocity*.018,tt?-A.endTime*5:-.16*et),c.root.scale.setScalar(Le*(tt?Math.max(.05,1-A.endTime*2):1)),c.animate({time:V+(A.parade?A.endTime*.54:0),run:A.parade?1:O?.91:He?0:.09,recoil:A.recoil,merge:Math.max(A.mergeGlow,A.hurt*.62),lean:Xe.clamp(A.velocity/9,-1,1)});let U=A.boss;f.root.visible=U.active&&!U.removed&&U.z<9;let At=Xe.smoothstep(Ie,.25,.92),it=Ie>.92?Math.sin((Ie-.92)*19)*Math.exp(-9*(Ie-.92)):0,St=U.lift*(1-Xe.smoothstep(Ie,0,.3));f.root.position.set(U.x-.26*At,St+.27*At+Math.max(0,it)*.16,U.z-.62*At),f.root.rotation.set(-1.49*At+.13*it,U.yaw*(1-At),-.3*At),b(U);let ue=U.skill,Ht=ue?Xe.smoothstep(ue.age,0,ue.warm)*(1-Xe.smoothstep(ue.age,ue.warm,ue.warm+.3)):0,Ge=ue?Math.sin(Math.PI*Xe.clamp((ue.age-ue.warm)/.52,0,1)):0;f.pose({charge:Ht,release:Ge,mode:k,time:V,walk:O&&U.active&&!U.defeated?1:0,march:U.marched,attack:U.attackT,hit:U.hit,defeat:Ie,kind:U.kind,vault:U.vault?.t||0,brace:U.brace,drive:U.special}),l.visible=h.visible=O&&!U.defeated&&U.attackT>0&&U.attackT<.91,l.visible&&(l.position.set(U.landX,.047,U.landZ),h.position.set(U.landX,.051,U.landZ),h.scale.setScalar(.3+.7*Xe.smoothstep(U.attackT,0,.91))),(!He||A.overrun)&&x.put(A.x,A.captainZ+et*.4,1.3*Le),f.root.visible&&x.put(U.x,U.z-At,3.65-St*.38,1.12+At*.65);for(let ee of[m,g])ee.visible=!He&&!A.parade,ee.position.set(A.x,.048,A.captainZ),ee.scale.setScalar(Le);x.end(),d.end(),p.end(),I&&I.draw(A,a,V,k),S.update(H,W,A.shots,A.incoming),t.render(n,a)}return{draw:K,assets:N,prepareBoss:A=>u.then(()=>f.prepare(A)),resize:L,entryZ(){let A=Math.atan2(14.88,20.65);return 13.2-15/Math.tan(A-Xe.degToRad(a.fov/2))},project(A,V,H){return o.set(A,V,H).project(a),{x:(o.x+1)*D/2,y:(1-o.y)*q/2}},feedback(A){S.burst(A.kind,A.x,A.y,A.z,A.strength),A.kind==="slam"||A.kind==="wallBreak"||A.kind==="bossBurst"?X=.85:A.kind==="victory"||A.kind==="vaultLand"?X=Math.max(X,.5):A.kind==="impact"&&(X=Math.max(X,.25))},reset(A){z=A*.94,X=0,S.reset()},lowerResolution(){G<=1||(G=Math.max(1,G-.22),L())}}}var Om=Math.PI*2,Bm={muzzle:{duration:.25,gain:.33,interval:.18},smallShot:{duration:.08,gain:.076,interval:.105},impact:{duration:.31,gain:.28,interval:.12},wallHit:{duration:.16,gain:.16,interval:.13},cardHit:{duration:.1,gain:.11,interval:.13},supplyBreak:{duration:.25,gain:.21,interval:.1},shieldHit:{duration:.16,gain:.14,interval:.14},wallBreak:{duration:.43,gain:.35,interval:.4},plus:{duration:.22,gain:.18,interval:.105},merge:{duration:.41,gain:.23,interval:.18},slam:{duration:.49,gain:.42,interval:.5},bruiserStrike:{duration:.31,gain:.28,interval:.22},diverStrike:{duration:.36,gain:.22,interval:.1},wardenCast:{duration:.68,gain:.26,interval:.5},drillStrike:{duration:.32,gain:.21,interval:.18},kestrelCast:{duration:.66,gain:.23,interval:.42},engineStrike:{duration:.44,gain:.3,interval:.24},bossBurst:{duration:.79,gain:.4,interval:.7},glassBreak:{duration:.39,gain:.24,interval:.17},crateBreak:{duration:.32,gain:.24,interval:.2},latchHit:{duration:.16,gain:.16,interval:.1},rally:{duration:.9,gain:.28,interval:1},chainSnap:{duration:.29,gain:.28,interval:.23},discharge:{duration:.41,gain:.26,interval:.23},vaultLand:{duration:.25,gain:.21,interval:.4},victory:{duration:.79,gain:.28,interval:.7},loss:{duration:.63,gain:.25,interval:.57},hit:{duration:.09,gain:.075,interval:.14}};function Tb(s,e){let t=s.createBuffer(1,Math.ceil(Bm[e].duration*24e3),24e3),n=t.getChannelData(0),i=981273;function r(h,f,u){let d=Math.floor(h*24e3),p=Math.min(n.length,d+Math.ceil(f*24e3)),x=Math.min(.005,f*.1),g=Math.min(.012,f*.16);for(let m=d;m<p;m++){let _=(m-d)/24e3,y=Math.min(1,_/x,(f-_)/g)*Math.exp(-3.35*_/f);n[m]+=u(_/f)*y}}function a(h,f,u,d,p,x=.12){let g=0;r(h,f,m=>{let _=d+(u-d)*(1-m)**3;return g+=Om*_/24e3,p*(Math.sin(g)+x*Math.sin(2*g+.15))})}function o(h,f,u,d){let p=0,x=0,g=1-Math.exp(-Om*u/24e3);r(h,f,()=>(i=Math.imul(1664525,i)+1013904223>>>0,p+=g*(i/2147483648-1-p),x+=.014*(p-x),d*(p-x*.65)))}function c(h,f,u,d){a(h,f,u*1.013,u,d,.16),a(h,f*.35,u*2.52,u*2.5,d*.11)}switch(e){case"cardHit":c(0,.09,1150,.42);break;case"supplyBreak":o(0,.068,4200,.51),c(.015,.18,906,.44),c(.07,.16,1326,.36);break;case"shieldHit":a(0,.15,740,365,.56,.18);break;case"muzzle":a(0,.2,213,61,.76,.48),o(0,.093,2400,.64),o(.023,.212,580,.57);break;case"smallShot":a(0,.054,1550,580,.33,.1),o(0,.042,3600,.56);break;case"impact":a(0,.23,115,49,.63,.52),o(.004,.25,1050,.89),o(.044,.23,370,.47);break;case"wallHit":o(0,.045,3100,.56),a(0,.124,650,440,.36),a(.008,.14,1050,750,.19);break;case"wallBreak":a(0,.23,174,57,.61,.33),o(0,.27,1970,.96);for(let[h,f]of[[.079,750],[.147,490],[.227,330]])o(h,.045,2850,.41),a(h,.13,f,f*.81,.22);break;case"plus":c(0,.107,622,.56),c(.06,.15,932,.68);break;case"merge":a(0,.24,320,752,.24),c(0,.16,523,.53),c(.075,.19,659,.59),c(.147,.24,988,.68);break;case"slam":o(0,.18,2e3,.78),a(0,.36,167,43,.96,.58),o(.035,.39,520,.84),o(.092,.13,1400,.44);break;case"bruiserStrike":o(0,.27,670,.7),a(0,.27,153,61,.74);break;case"diverStrike":o(0,.27,2300,.67),a(.01,.26,480,120,.42);break;case"wardenCast":a(0,.44,96,53,.77,.5),o(.05,.57,820,.68);break;case"drillStrike":c(0,.24,1450,.59),c(.05,.24,860,.5);break;case"kestrelCast":o(0,.56,3300,.58),a(.04,.52,830,1320,.35);break;case"engineStrike":a(0,.36,140,45,.81,.45),o(.015,.34,1350,.85);break;case"vaultLand":a(0,.2,115,49,.7),o(.01,.19,720,.61);break;case"glassBreak":o(0,.075,5100,.58);for(let[h,f]of[[0,2110],[.035,1560],[.075,2940],[.12,1020]])c(h,.19,f,.34);break;case"crateBreak":o(0,.17,1280,.8),o(.065,.14,2310,.43),a(0,.19,128,62,.39);break;case"latchHit":c(0,.14,1290,.58),o(0,.035,3e3,.3);break;case"rally":for(let[h,f]of[392,494,587,784].entries())c(h*.116,.34,f,.53);break;case"chainSnap":o(0,.048,4300,.65),c(.012,.19,1280,.45),c(.059,.18,711,.28);break;case"discharge":a(0,.29,1620,143,.66,.4),o(.05,.29,2900,.49);break;case"bossBurst":a(0,.5,182,41,1,.44),o(0,.12,4600,.85),o(.048,.54,850,.84),c(.23,.28,784,.32),c(.37,.39,1047,.33);break;case"victory":a(0,.35,144,48,.84,.37),o(.032,.31,720,.7);break;case"loss":c(0,.21,392,.57),c(.116,.22,330,.58),a(.246,.35,262,196,.64,.22);break;case"hit":o(0,.061,1290,.58),a(.003,.07,580,280,.24);break}let l=.001;for(let h of n)l=Math.max(l,Math.abs(h));for(let h=0;h<n.length;h++)n[h]*=.89/l;return t}function zm(){let s,e,t,n,i=!1,r=!1,a=new Map,o=new Map,c=new Set;function l(d){c.delete(d),d.source.onended=null,d.source.disconnect(),d.gain.disconnect()}function h(){for(let d of c)d.source.stop(),l(d);o.clear()}function f(){if(!s)return;let d=s.currentTime;t.gain.cancelScheduledValues(d),t.gain.setTargetAtTime(i&&!r?.8:0,d,.008)}function u(){if(i&&s&&s.state!=="closed")return s.resume().catch(()=>{})}return{unlock(){if(i=!0,!s){let p=window.AudioContext||window.webkitAudioContext;if(!p)return;try{s=new p({latencyHint:"interactive"})}catch{return}e=s.createDynamicsCompressor(),e.threshold.value=-12,e.knee.value=9,e.ratio.value=5,e.attack.value=.004,e.release.value=.12,t=s.createGain(),t.gain.value=0,e.connect(t),t.connect(s.destination)}f();let d=u();return n?n.then(u):d},setMuted(d){r=!!d,r&&h(),f()},play(d,p=1){let x=Bm[d];if(!x||!i||r||!s||s.state!=="running"||!(p>0))return;let g=s.currentTime;if(g-(o.get(d)??-1/0)<x.interval||c.size>=16)return;o.set(d,g),a.has(d)||a.set(d,Tb(s,d));let m=s.createBufferSource(),_=s.createGain(),y={source:m,gain:_};m.buffer=a.get(d);let M=d==="plus"||d==="merge"||d==="victory"||d==="loss";m.playbackRate.value=M?1:.95+Math.random()*.1,_.gain.value=x.gain*Math.min(1.36,.45+.55*Math.sqrt(p)),m.connect(_),_.connect(e),c.add(y),m.onended=()=>l(y),m.start()},pause(){if(i=!1,h(),f(),!s||s.state==="closed")return;let d=s.suspend().catch(()=>{});return n=d,d.then(()=>{n===d&&(n=void 0)}),d}}}var qe=s=>document.getElementById(s),Ts=qe("stage"),ua=qe("game"),Ab=qe("start"),Do=qe("startButton"),Wm=qe("veil"),ca=qe("bossbar"),Es=qe("tip"),Xm={hybrid:"\u6DF7\u5408",ai:"AI \u8D34\u56FE","3d":"\u7EAF 3D"},qm={hybrid:"\u961F\u957F\u548C Boss \u4F7F\u7528 3D\uFF0C\u7EA2\u84DD\u5C0F\u5175\u4F7F\u7528\u52A8\u6001\u539F\u753B\u3002",ai:"\u4F7F\u7528\u539F\u753B\u89D2\u8272\u548C\u52A8\u6001\u8D34\u56FE\u3002","3d":"\u6240\u6709\u89D2\u8272\u90FD\u4F7F\u7528 3D \u6A21\u578B\uFF0C\u53EF\u770B\u6E05\u8DD1\u52A8\u3001\u70AE\u8EAB\u540E\u5750\u548C\u53CC\u62F3\u7838\u5730\u3002"},Rb=matchMedia("(pointer:coarse)").matches;qe("instruction").textContent=Rb?"\u5DE6\u53F3\u62D6\u52A8 \xB7 \u4E0B\u62C9\u540E\u64A4 \xB7 \u81EA\u52A8\u5F00\u706B":"\u65B9\u5411\u952E / WASD \u79FB\u52A8 \xB7 \u81EA\u52A8\u5F00\u706B";function Ym(s){try{return localStorage.getItem(s)}catch{return null}}function Zm(s,e){try{localStorage.setItem(s,e)}catch{}}var Cb=new URL(location.href).searchParams.get("art"),es=[Cb,Ym("squad-art"),"hybrid"].find(s=>Object.prototype.hasOwnProperty.call(Xm,s)),ws=Ym("squad-mute")==="1",On=null,fa=!1,jf=!1,mn=null,oh=null,As=!0,ha=0,or=0,Qf=0,Jf=0,$f=0,Km=0,ed=!1,td=!1,nd=!1,id=0,Ci=null,lr=new Set,ts=zm();ts.setMuted(ws);function Jm(){let s=ws?"\u5F00\u542F\u58F0\u97F3":"\u5173\u95ED\u58F0\u97F3";qe("soundIcon").setAttribute("href",ws?"#i-mute":"#i-sound"),qe("sound").setAttribute("aria-label",s),qe("sound").title=s}Jm();var de=new qo(s=>{s.kind!=="smallShot"&&s.kind!=="loss"&&On?.feedback(s),ts.play(s.kind,s.strength)}),rh=Number(new URL(location.href).searchParams.get("stage"));Number.isInteger(rh)&&rh>=1&&rh<=ss&&de.reset(rh);for(let s of ga){let e=document.createElement("button"),t=document.createElement("b");t.textContent=String(s.number).padStart(2,"0"),e.append(t,document.createTextNode(s.name)),e.dataset.level=s.number,e.setAttribute("aria-label","\u7B2C "+s.number+" \u5173 "+s.name),e.addEventListener("click",()=>ad(s.number)),qe("stageList").append(e)}function sd(){lr.clear(),Ci=null}function ah(s,e){Es.textContent=s,Es.hidden=!1,Km=de.elapsed+e}function rd(s,e){if(Object.prototype.hasOwnProperty.call(Xm,s)){es=jf?s:"3d",Ts.dataset.art=es,As=!0,e&&Zm("squad-art",es);for(let t of qe("options").children)t.setAttribute("aria-pressed",String(t.dataset.art===es)),t.disabled=!jf&&t.dataset.art!=="3d";mn==="art"&&(qe("detail").textContent=qm[es])}}function Uo(){fa&&($m(),de.start(),ts.unlock(),Ab.hidden=!0,qe("pause").hidden=!1,Ts.dataset.phase=de.phase)}function ad(s=de.stage){sd(),de.reset(s),On.prepareBoss(de.boss.kind).then(()=>{As=!0}),On.reset(de.x),ha=0,Qf=0,Es.hidden=!0,ed=!1,td=!1,nd=!1,id=0;let e=new URL(location.href);e.searchParams.set("stage",de.stage),history.replaceState(null,"",e),Uo()}function cr(s){if(fa){if(sd(),ha=0,mn=s,As=!0,Wm.hidden=!1,qe("options").hidden=s!=="art",qe("stageList").hidden=s!=="levels",qe("dialog").classList.toggle("levels",s==="levels"),qe("selectStage").hidden=s!=="pause"&&s!=="result",s==="levels"){ts.pause(),qe("dialogTitle").textContent="\u9009\u62E9\u5173\u5361",qe("detail").textContent="",qe("continue").textContent="\u8FD4\u56DE";for(let e of qe("stageList").children)e.setAttribute("aria-current",String(+e.dataset.level===de.stage))}if(qe("secondary").hidden=s!=="pause",s==="art"&&(ts.pause(),qe("dialogTitle").textContent="\u89D2\u8272\u753B\u9762",qe("detail").textContent=qm[es],qe("continue").textContent="\u786E\u5B9A",rd(es,!1)),s==="pause"&&(ts.pause(),qe("dialogTitle").textContent="\u5DF2\u6682\u505C",qe("detail").textContent="\u7B2C "+de.stage+" \u5173 \xB7 "+de.route.name,qe("continue").textContent="\u7EE7\u7EED\u6E38\u620F"),s==="result"){let e=de.phase==="won";if(e)qe("dialogTitle").textContent=de.stage===ss?"\u5168\u90E8\u901A\u5173":`\u7B2C ${de.stage} \u5173\u901A\u8FC7`,qe("detail").textContent=`\u5C0F\u961F\u5DF2\u7A7F\u8FC7\u6218\u573A\uFF0C\u5171\u51FB\u5012 ${de.score} \u540D\u7EA2\u5175\u3002`;else{let t={signature:["\u961F\u957F\u51FA\u5C40",Tn[de.boss.kind].name+"\u7684"+Tn[de.boss.kind].skill+"\u547D\u4E2D\u4E86\u961F\u957F\u3002"],bossShot:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u5F39\u5E55\u51FB\u5012\u3002"],gap:["\u961F\u957F\u5760\u6865","\u9047\u5230\u7F3A\u53E3\u65F6\uFF0C\u63D0\u524D\u6362\u9053\uFF0C\u6216\u5E26\u4E0A\u67B6\u6865\u8865\u7ED9\u3002"],infantry:["\u5C0F\u961F\u5168\u706D","\u7EA2\u5175\u5DF2\u8D8A\u8FC7\u9632\u7EBF\u3002"],wall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u786C\u5899\u63A8\u51FA\u4E86\u8DD1\u9053\u3002"],breach:["\u9632\u7EBF\u5931\u5B88","Boss \u7A81\u7834\u4E86\u9632\u7EBF\u3002"],slam:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u843D\u5730\u51B2\u51FB\u51FB\u5012\u3002"]},n=de.boss.active&&!de.boss.defeated?`Boss \u8FD8\u5269 ${Math.ceil(de.boss.hp)} / ${de.boss.maxHp} \u751F\u547D`:"\u7EA2\u5175\u7A81\u7834\u4E86\u961F\u4F0D\u3002",[i,r]=t[de.lossReason]||["\u5C0F\u961F\u5168\u706D",n];qe("dialogTitle").textContent=i,qe("detail").textContent=r}qe("continue").textContent=e&&de.stage<ss?"\u4E0B\u4E00\u5173":"\u518D\u73A9\u4E00\u6B21"}if(s==="levels"){let e=qe("stageList").querySelector("[aria-current=true]");e.focus({preventScroll:!0}),e.scrollIntoView({block:"nearest"})}else qe("continue").focus({preventScroll:!0})}}function $m(){As=!0,mn=null,oh=null,Wm.hidden=!0,ha=0}function jm(){let s=mn,e=oh;if($m(),s==="result"){ad(de.phase==="won"?de.stage<ss?de.stage+1:1:de.stage);return}if((s==="art"||s==="levels")&&e){cr(e);return}de.playing?ts.unlock():de.phase==="ready"&&Do.focus({preventScroll:!0})}function Qm(){!fa||!de.playing&&de.phase!=="ready"&&!de.resultReady||(oh=mn,cr("levels"))}qe("level").addEventListener("click",Qm);qe("selectStage").addEventListener("click",Qm);qe("continue").addEventListener("click",jm);qe("secondary").addEventListener("click",()=>ad());Do.addEventListener("click",Uo);qe("sound").addEventListener("click",()=>{ws=!ws,Zm("squad-mute",ws?"1":"0"),ts.setMuted(ws),ws||ts.unlock(),Jm()});qe("pause").addEventListener("click",()=>{de.playing&&cr("pause")});qe("styles").addEventListener("click",()=>{oh=mn,cr("art")});for(let s of qe("options").children)s.addEventListener("click",()=>rd(s.dataset.art,!0));ua.addEventListener("pointerdown",s=>{!fa||mn||!s.isPrimary||s.button!==0||(de.phase==="ready"&&Uo(),de.playing&&(s.preventDefault(),Ci={id:s.pointerId,start:s.clientX,startY:s.clientY,world:de.targetX,back:de.targetZ},ua.setPointerCapture(s.pointerId)))});ua.addEventListener("pointermove",s=>{!Ci||s.pointerId!==Ci.id||mn||de.aim(Ci.world+(s.clientX-Ci.start)*14.8/Ts.clientWidth,Ci.back+(s.clientY-Ci.startY)*11/Ts.clientHeight)});function Ib(s){s.pointerId===Ci?.id&&(Ci=null)}for(let s of["pointerup","pointercancel","lostpointercapture"])ua.addEventListener(s,Ib);var eg=["ArrowLeft","KeyA"],tg=["ArrowRight","KeyD"],ng=["ArrowUp","KeyW"],ig=["ArrowDown","KeyS"];window.addEventListener("keydown",s=>{if(!fa||s.altKey||s.ctrlKey||s.metaKey)return;let e=s.code;if(mn){mn!=="result"&&(e==="Escape"||e==="KeyP")&&!s.repeat&&(s.preventDefault(),jm());return}if(eg.includes(e)||tg.includes(e)||ng.includes(e)||ig.includes(e)){s.preventDefault(),de.phase==="ready"&&Uo(),lr.add(e);return}s.repeat||((e==="Space"||e==="Enter")&&de.phase==="ready"&&!(s.target instanceof HTMLButtonElement&&s.target!==Do)?(s.preventDefault(),Uo()):(e==="KeyP"||e==="Escape"||e==="Space")&&de.playing&&!(e==="Space"&&s.target instanceof HTMLButtonElement)&&(s.preventDefault(),cr("pause")))});window.addEventListener("keyup",s=>lr.delete(s.code));function od(){sd(),de.playing&&!mn&&cr("pause")}window.addEventListener("blur",od);document.addEventListener("visibilitychange",()=>{or=0,document.hidden&&od()});var km=-1,Hm=-1,Gm=-1;function Pb(){let s=de.allies.length,e=de.cannonDamage,t=qe("level"),n="\u7B2C "+de.stage+" \u5173";t.textContent!==n&&(t.textContent=n),t.title=de.route.name+" \xB7 \u9009\u62E9\u5173\u5361";let a=[Object.entries(de.buffs).filter(([,h])=>h>0).map(([h,f])=>Yn[h].label+" "+Math.ceil(f)+"\u79D2").join(" \xB7 "),de.planks?"\u4FBF\u6865 \xD7"+de.planks:"",de.chill>0?"\u971C\u51BB "+Math.ceil(de.chill)+"\u79D2":""].filter(Boolean).join(" \xB7 "),o=qe("buffs");o.textContent!==a&&(o.textContent=a),o.hidden=!a||!de.playing,s!==km&&(qe("count").textContent=s,km=s),e!==Hm&&(qe("power").textContent=e,Hm=e),Ts.dataset.phase=de.phase;let c=qe("armorMeter");if(c.hidden=!de.playing||de.armor===3,!c.hidden){let h=On.project(de.x,1.94*de.visualScale,de.captainZ);c.style.transform="translate("+h.x.toFixed(1)+"px,"+h.y.toFixed(1)+"px)",c.dataset.value!==String(de.armor)&&(c.dataset.value=de.armor,c.setAttribute("aria-label","\u961F\u957F\u62A4\u7532 "+de.armor+" / 3"))}let l=de.boss;if(ca.hidden=!l.active||l.defeated||On.project(l.x,0,l.z).y<3,!ca.hidden){qe("bossName").textContent!==Tn[l.kind].name&&(qe("bossName").textContent=Tn[l.kind].name);let[h,f]=Tn[l.kind].crown,u=On.project(l.x,h+l.lift,l.z+f);ca.style.transform=`translate(${u.x.toFixed(1)}px,${Math.max(53,u.y).toFixed(1)}px)`}l.hp!==Gm&&(ca.firstElementChild.style.transform=`scaleX(${l.hp/l.maxHp})`,ca.lastElementChild.textContent=Math.ceil(l.hp),Gm=l.hp),de.playing&&!mn&&(!ed&&de.wall.hp>0&&de.distance>=10&&de.wall.z<0&&(ed=!0,ah("\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00",3)),de.wall.hp<=0&&Es.textContent==="\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00"&&(Es.hidden=!0),!ca.hidden&&!td&&(td=!0,ah("\u5BF9\u51C6 Boss \u5F00\u706B\uFF0C\u8DF3\u8D77\u65F6\u907F\u5F00\u843D\u70B9",2.2)),l.defeated&&!nd&&l.defeatAge>=.92&&(nd=!0,ah("Boss \u5DF2\u5012\u4E0B\uFF0C\u6E05\u7406\u5269\u4F59\u7EA2\u5175",2.3)),de.hint&&de.hint.id!==id&&(id=de.hint.id,ah(de.hint.text,2.1)),!Es.hidden&&de.elapsed>=Km&&(Es.hidden=!0)),!de.playing&&de.phase!=="ready"&&(Es.hidden=!0,qe("pause").hidden=!0,de.resultReady&&!mn&&cr("result"))}function sg(s){if(requestAnimationFrame(sg),document.hidden)return;if(mn&&!As){or=s;return}if(!mn&&de.phase==="ready"&&or&&s-or<1e3/29&&!As)return;As=!1;let e=or?(s-or)/1e3:1/60;or=s;let t=Math.min(.08,Math.max(0,e)),n=0;if(!mn){if(Qf+=t,de.playing||de.phase==="won"||de.phase==="lost")for(ha+=t;ha>=1/60;){let i=Number(tg.some(a=>lr.has(a)))-Number(eg.some(a=>lr.has(a))),r=Number(ig.some(a=>lr.has(a)))-Number(ng.some(a=>lr.has(a)));de.tick(1/60,i,r),n+=de.worldAdvance,ha-=1/60}de.playing&&($f+=t,e>.031&&Jf++,$f>2.1&&(Jf>24&&On.lowerResolution(),Jf=0,$f=0))}On.draw(de,Qf,mn?0:t,n,es),Pb()}function Vm(s){let e=qe("problem");e.hidden=!1,e.textContent=s;let t=document.createElement("button");t.textContent="\u91CD\u65B0\u8F7D\u5165",t.onclick=()=>location.reload(),e.append(t)}async function Lb(){try{On=Fm(ua,Ts),On.reset(de.x);let s=()=>{On.resize(),de.entryZ=On.entryZ(),As=!0};s(),new ResizeObserver(s).observe(Ts),window.addEventListener("resize",s),ua.addEventListener("webglcontextlost",e=>{e.preventDefault(),od(),Vm("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u6E38\u620F\u3002")}),jf=await On.assets,await On.prepareBoss(de.boss.kind),rd(es,!1),fa=!0,Ts.dataset.phase="ready",Do.disabled=!1,Do.lastElementChild.textContent="\u5F00\u59CB\u6E38\u620F",requestAnimationFrame(sg)}catch(s){console.error(s),Vm("\u6E38\u620F\u9700\u8981\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5728 Safari \u6216 Chrome \u4E2D\u6253\u5F00\u3002")}}Lb();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
