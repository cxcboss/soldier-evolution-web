var dh={speed:27,lift:0,tail:1.05},Go={speed:23,lift:.34,tail:1.35},_a={speed:20,lift:.78,tail:2.05},Us={speed:40,lift:.08,tail:4.15},Rd=22,Cd=30;function Vo(s,e){let t=Math.min(1,e/s.aimDistance);return s.startY+(s.endY-s.startY)*t+4*s.lift*t*(1-t)}function dr(s,e,t){return t.x=s.startX+s.headingX*e,t.y=Vo(s,e),t.z=s.startZ+s.headingZ*e,t}function wt(s,e,t){let n=Math.max(0,Math.min(1,(s-e)/(t-e)));return n*n*(3-2*n)}function Wo(s){return Math.max(0,Math.min(1,(s-.3)/(.91-.3)))}var ph=(s,e,t)=>Math.min(t,Math.max(e,s)),Rn={bruiser:{crown:[4.91,0],name:"\u94C1\u62F3\u961F\u957F",skill:"\u9707\u6865\u91CD\u62F3",prompt:"\u91CD\u62F3\u84C4\u529B\uFF0C\u907F\u5F00\u62F3\u5370",color:"#ffc66c",height:4.5,aim:2.05,warm:.86,flight:.65,cooldown:6.3},diver:{crown:[3.74,-1.78],name:"\u6F6E\u94B3\u5DE8\u87F9",skill:"\u53CC\u94B3\u6F6E\u6C50",prompt:"\u53CC\u94B3\u5408\u51FB\uFF0C\u4E24\u9053\u6C34\u73AF\u4E4B\u95F4\u6709\u7A7A\u9699",color:"#39e4d5",height:2.32,aim:1.12,warm:.9,flight:.86,cooldown:6.3},warden:{crown:[3.47,-1.49],name:"\u91D1\u89D2\u91CD\u7280",skill:"\u94C1\u89D2\u51B2\u950B",prompt:"\u91CD\u7280\u538B\u4F4E\u4E86\u89D2\uFF0C\u95EA\u5F00\u91D1\u8272\u76F4\u9053",color:"#ffb847",height:2.84,aim:1.55,warm:1.12,flight:.82,cooldown:7.1},drill:{crown:[3.79,-1.65],name:"\u7D2B\u6676\u5730\u9F99",skill:"\u5730\u8109\u6676\u523A",prompt:"\u6676\u523A\u9010\u4E2A\u5192\u51FA\uFF0C\u79BB\u5F00\u7D2B\u5708",color:"#ce82ff",height:3.39,aim:1.6,warm:.89,flight:.52,cooldown:6.4},kestrel:{crown:[4.12,-2.03],name:"\u51B0\u7FFC\u98DE\u9F99",skill:"\u6781\u5BD2\u5410\u606F",prompt:"\u51B0\u9F99\u6B63\u5728\u5438\u6C14\uFF0C\u79BB\u5F00\u971C\u84DD\u6247\u5F62",color:"#78eaff",height:3.35,aim:1.92,warm:1.15,flight:.45,cooldown:6.5},engine:{crown:[3.72,-1.9],name:"\u7194\u7089\u86DB\u673A",skill:"\u7194\u82AF\u53CC\u70AE",prompt:"\u53CC\u70AE\u9501\u5B9A\uFF0C\u79BB\u5F00\u6A59\u7EA2\u843D\u70B9",color:"#ff8253",height:2.68,aim:1.33,warm:.94,flight:1.12,cooldown:6.8}},mh=(s,e)=>ph((s.age-s.warm-e.delay)/s.flight,0,1);function Id(s,e,t,n,i=0){if(e.shape==="circle")return Math.hypot(t-e.x,n-e.z)<e.radius+i;let r=e.x-s.x,a=e.z-s.z,o=Math.hypot(r,a)||1,c=((t-s.x)*r+(n-s.z)*a)/o,l=e.shape==="cone"?e.radius*ph(c/o,.05,1):e.radius;return c>-.1&&c<o+1.65+i&&Math.abs((t-s.x)*a-(n-s.z)*r)/o<l+i}function Lg(s){let e=s.boss,t=e.kind,n=Rn[t],i=s.x,r=s.captainZ,a=i>.7?-1:1,o=[],c=(l,h,f,u=0,d="circle")=>o.push({x:ph(l,-5.85,5.85),z:h,radius:f,delay:u,shape:d,hit:!1});return t==="diver"?(c(i-1.55,r,.96),c(i+1.55,r,.96,.13)):t==="warden"?c(e.x,r+.42,1.04,0,"strip"):t==="drill"?(c(i,r-.64,.89),c(i+a*.68,r+.07,.88,.26),c(i+a*1.45,r+.68,.91,.52)):t==="kestrel"?c(i,r+.74,1.31,0,"cone"):t==="engine"?(c(i,r-.17,1.12),c(i+a*2.42,r+.52,1.14,.37)):c(i,r-.44,1.16),e.skill={kind:t,x:e.x,z:e.z+.38,height:n.aim,age:0,warm:n.warm,flight:n.flight,marks:o,casualties:0,damagedCaptain:!1},s.notice(n.prompt),e.skill}function Ng(s,e,t){let n=s.stage<7?2:3;if(s.event(e.kind+"Strike",t.x,.1,t.z),s.allies=s.allies.filter(i=>{if(e.casualties>=n||!Id(e,t,i.x,i.z,.12))return!0;let r=s.fall(i,"blue",.7,t.x);return r.vy=e.kind==="engine"?3.8:2.6,e.casualties++,!1}),!(e.damagedCaptain||!Id(e,t,s.x,s.captainZ,.16))){if(e.damagedCaptain=!0,s.buffs.shield>0){s.event("shieldHit",s.x,.6,s.captainZ);return}e.kind==="kestrel"&&(s.chill=1.6),!(s.hitGuard>0)&&(s.hurt=1,s.hitGuard=1.15,s.armor--,s.armor<=0&&(s.lossReason="signature",s.finish(!1)))}}function Pd(s,e){let t=s.boss,n=s.route.siege&&t.hp<=t.maxHp*.5;if(n&&!t.secondWind&&(t.secondWind=!0,t.nextCast=Math.min(t.nextCast,1.3),s.notice("\u5730\u9F99\u8FDB\u5165\u72C2\u653B\uFF0C\u8FDE\u7EED\u907F\u5F00\u6676\u523A")),!t.skill){t.nextCast-=e,t.z>=-26&&t.z<(n?-1.65:-5.2)&&!s.activeGround.some(r=>r.finale&&!r.crossed&&Math.abs(r.z-t.z)<7)&&!t.vault&&!t.attackT&&t.nextCast<=0&&Lg(s);return}let i=t.skill;i.age+=e,!i.fired&&i.age>=i.warm&&(i.fired=!0,s.event(i.kind+"Cast",t.x,Rn[i.kind].aim,t.z+.37));for(let r of i.marks)if(!r.hit&&mh(i,r)>=1&&(r.hit=!0,Ng(s,i,r),!s.playing))return;i.age>i.warm+i.flight+i.marks.at(-1).delay+.65&&(t.skill=null,t.nextCast=n?1.8:Rn[t.kind].cooldown)}var Ui=s=>4.4*s,pr=s=>["\u5DE6\u8DEF","\u4E2D\u8DEF","\u53F3\u8DEF"][s+1],mr={quay:{floor:"#bdbfb6",joint:"#99a39c",line:"#798880",rim:"#ffedc4",deep:"#1e5462",glint:"#84c4b5",frame:"#4b7480"},timber:{floor:"#c69968",joint:"#956c49",line:"#785940",rim:"#ffe2a4",deep:"#28564e",glint:"#95bea0",frame:"#816448"},quarry:{floor:"#d4af8a",joint:"#ad8867",line:"#966d4d",rim:"#ffe9b1",deep:"#814e3f",glint:"#d99b68",frame:"#986f58"},forge:{floor:"#a0acb5",joint:"#728290",line:"#485f74",rim:"#f5cf83",deep:"#293b4e",glint:"#85afaf",frame:"#546a79"},ice:{floor:"#c2dce5",joint:"#94b8ce",line:"#769bb7",rim:"#f9ffff",deep:"#245779",glint:"#a5e7e7",frame:"#6e96ad"},cinder:{floor:"#a59aa3",joint:"#786d7c",line:"#675969",rim:"#ffd392",deep:"#512c3c",glint:"#fa9452",frame:"#6e5261"}},gh=[["\u706F\u5854\u5916\u6E2F","quay"],["\u60AC\u7D22\u6797\u8C37","timber"],["\u56DE\u58F0\u77FF\u5CE1","quarry"],["\u94A2\u94C1\u8239\u575E","forge"],["\u6781\u5149\u51B0\u6CB3","ice"],["\u7194\u5FC3\u88C2\u8C37","cinder"]].map(([s,e],t)=>({number:t+1,name:s,theme:e,first:t*5+1,last:t*5+5})),Gt=(s,e)=>({kind:"skyfall",lane:s,at:e,radius:1.82}),Tt=(s,e,t=3.6)=>({kind:"gap",lane:s,at:e,length:t}),Pt=(s,e)=>({kind:"bridge",lane:s,at:e,length:4.4}),pt=(s,e,t="reserve")=>({kind:"cache",lane:s,at:e,reward:t}),tn=(s,e)=>({kind:"coil",lane:s,at:e}),rn=(s,e,t)=>({kind:"belt",lane:s,at:e,direction:t,length:8.2}),Dg=[["\u6E2F\u53E3\u5916\u6865","bruiser",!1,[pt(-1,59,"squad")]],["\u5378\u8D27\u6808\u6865","diver",!0,[Tt(1,42),pt(-1,75,"engineer")]],["\u540A\u7D22\u7801\u5934","warden",!1,[Pt(1,49),pt(-1,83,"medic")]],["\u6D77\u5824\u5C94\u53E3","drill",!1,[pt(1,37,"reserve"),Tt(-1,65),tn(0,94)]],["\u706F\u5854\u822A\u9053","kestrel",!0,[rn(-1,41,1),Tt(1,69),pt(0,89,"frost")]],["\u6797\u573A\u540A\u8FD0\u7EBF","engine",!1,[Gt(1,55),tn(-1,39),Pt(1,68),pt(-1,96,"engineer")]],["\u6797\u95F4\u6D6E\u6865","bruiser",!0,[Tt(-1,35),pt(1,53,"engineer"),Tt(1,82),rn(0,104,-1)]],["\u6728\u6599\u95F8\u53E3","diver",!1,[Gt(-1,73),pt(1,37,"medic"),Pt(-1,60),tn(1,82),Tt(0,105)]],["\u53CC\u7D22\u5CE1\u5ECA","warden",!1,[pt(-1,35,"reserve"),pt(1,55,"frost"),Tt(0,80),Pt(-1,105)]],["\u60AC\u7D22\u5C01\u9501\u6218","drill",!0,[Gt(1,51),Gt(0,74),Gt(-1,99),Pt(-1,40),tn(0,61),Pt(1,86),pt(1,107,"reserve")]],["\u6EAA\u8C37\u77FF\u53E3","diver",!0,[Tt(0,37),Pt(1,60),pt(-1,84,"engineer"),Tt(-1,107)]],["\u8FD0\u77FF\u659C\u5761","warden",!1,[Gt(1,64),rn(0,34,1),pt(1,53,"medic"),Pt(-1,77),tn(0,106)]],["\u5CE1\u8C37\u6551\u63F4","kestrel",!1,[pt(-1,33,"medic"),Tt(1,58),rn(0,80,-1),pt(-1,105,"reserve")]],["\u6C34\u95F8\u77FF\u9053","engine",!0,[Pt(-1,36),tn(1,54),Pt(1,81),pt(0,108,"frost")]],["\u788E\u77F3\u8F6C\u8FD0\u6865","drill",!0,[Gt(0,88),tn(1,35),Tt(-1,57),pt(0,78,"engineer"),Tt(1,99),rn(-1,116,1)]],["\u7801\u5934\u88C5\u914D\u7EBF","bruiser",!1,[Gt(1,65),rn(-1,38,1),pt(0,52,"reserve"),tn(1,75),Pt(-1,97),Tt(1,119)]],["\u56DE\u8F6C\u8239\u53F0","kestrel",!0,[rn(0,35,-1),Tt(1,55),pt(-1,73,"engineer"),rn(1,93,-1),Tt(0,116),pt(-1,138,"reserve")]],["\u91CD\u9524\u88C5\u914D\u7EBF","engine",!1,[Gt(0,62),Gt(1,110),pt(1,36,"frost"),rn(-1,55,1),Pt(1,75),tn(0,98),pt(-1,121,"reserve")]],["\u8239\u575E\u540A\u67B6","warden",!0,[Pt(1,37),Tt(-1,56),pt(0,79,"medic"),Tt(1,101),tn(-1,123)]],["\u9F99\u95E8\u591C\u822A","diver",!0,[Gt(-1,65),Gt(0,108),tn(0,34),pt(-1,54,"engineer"),Pt(1,77),rn(0,96,1),Tt(-1,120)]],["\u51BB\u6CB3\u6E21\u53E3","drill",!1,[Gt(0,67),Tt(1,37),rn(0,56,-1),pt(-1,78,"frost"),Pt(1,102),tn(0,123)]],["\u6D6E\u51B0\u957F\u5824","engine",!0,[pt(-1,35,"reserve"),Pt(1,54),tn(-1,74),rn(0,94,-1),Tt(1,119)]],["\u51B0\u810A\u53CC\u7D22","warden",!1,[Gt(1,64),Gt(-1,107),Pt(-1,34),pt(1,52,"engineer"),Tt(0,72),Pt(1,94),Tt(-1,124),pt(-1,143,"squad")]],["\u6781\u5730\u98CE\u5ECA","kestrel",!0,[rn(1,35,-1),tn(0,55),rn(-1,75,1),pt(1,95,"medic"),Pt(0,121)]],["\u51B0\u5CE1\u6700\u540E\u4E00\u8DE8","diver",!0,[Gt(1,65),Gt(0,104),Tt(-1,34),pt(1,52,"engineer"),Pt(0,72),Tt(1,93),tn(-1,114),pt(1,134,"reserve")]],["\u7070\u70EC\u5C01\u9501\u7EBF","bruiser",!1,[Gt(1,65),pt(1,35,"reserve"),Pt(-1,55),rn(0,75,1),tn(1,95),Pt(1,115),Tt(-1,134)]],["\u7194\u5CA9\u7AD6\u4E95","drill",!0,[Gt(1,62),Gt(-1,105),tn(-1,33),pt(0,51,"frost"),Tt(1,72),rn(-1,91,1),Pt(1,112),pt(-1,132,"medic")]],["\u9ED1\u66DC\u65AD\u5D16","kestrel",!0,[Tt(1,33),rn(-1,51,1),Pt(0,73),pt(-1,92,"engineer"),Tt(0,114),rn(1,136,-1)]],["\u7EA2\u7089\u4E09\u7EBF","warden",!1,[Gt(0,64),Gt(-1,108),Pt(1,35),tn(-1,53),pt(0,73,"reserve"),Tt(-1,93),Pt(0,114),tn(1,135)]],["\u7194\u5FC3\u7EC8\u6865","engine",!0,[Gt(0,63),Gt(-1,101),Gt(0,142),pt(-1,34,"engineer"),Tt(1,52),Pt(-1,72),tn(0,91),rn(1,110,-1),Pt(1,132),pt(-1,151,"medic")]]],Ug=[.45,.68,.53,.6,.65,.7,.76,.81,.93,1.62],Fi=Dg.map(([s,e,t,n],i)=>{let r=i+1,a=gh[Math.floor(i/5)],o=Ug[i]??.87+(r-11)*.019,c=r===10,l=.565/Math.sqrt(o),h=6.4/o,f=r<=3?[135,154,144][i]:151+i*2.55+(c?15:0),u=c?60:44,d=Math.round(f/(l+.38/11+h/u));return{number:r,name:s,chapter:a,theme:a.theme,boss:e,vault:t,features:n,pressure:o,siege:c,rowSpacing:l,restEvery:u,restLength:h,finale:d,bossHP:Math.round((385+i*26)*o*(c?1.85:1)),wallHP:Math.round((72+i*1.55)*Math.min(1.35,o)),contactGrace:1.24/Math.sqrt(o)}}),xi=Fi.length;function ya(s,e){let t={glass:21,crates:49,shutter:78},n=s.kind==="cover"?t[s.variant]:s.kind==="cache"?60:s.kind==="bridge"?42:29,i=Math.round((.56+.44*Fi[e-1].pressure)*(n+(e-1)*(s.kind==="cover"?.75:1.15)));return{...s,x:Ui(s.lane),z:-s.at,hp:i,maxHp:i,state:"ready",age:0,flash:0,half:s.kind==="cover"?1.94:s.kind==="cache"?1.67:.74,depth:s.kind==="cover"?.46:s.kind==="cache"?.38:.34}}function Fs(s){return s.kind==="gap"&&s.state!=="repaired"||s.kind==="bridge"&&s.state==="cut"}function Xo(s,e,t,n=0){return Fs(s)&&Math.abs(e-s.x)<4.4/2-.14-n&&Math.abs(t-s.z)<s.length/2-n}var Oi=4.4-.4,xn={plus:{label:"+3",hp:10,count:3,tone:"blue"},squad:{label:"+5",hp:39,count:5,tone:"blue"},merge:{label:"\u70AE+5",hp:45,tone:"gold"},range:{label:"\u8FDC\u5C04",hp:28,tone:"blue"},longshot:{label:"\u7A7F\u7532\u8FDC\u5C04",hp:37,tone:"gold"},rapid:{label:"\u8FDE\u5C04",hp:35,tone:"gold"},shield:{label:"\u62A4\u76FE",hp:41,tone:"blue"},blast:{label:"\u7206\u7834",hp:44,tone:"gold"},plasma:{label:"\u7535\u6D46",hp:45,tone:"blue"},spread:{label:"\u53CC\u53D1",hp:41,tone:"gold"},drone:{label:"\u652F\u63F4",hp:45,tone:"blue"},reserve:{label:"+6",hp:38,count:6,tone:"blue"},engineer:{label:"\u67B6\u6865",hp:35,tone:"gold"},medic:{label:"\u6551\u63F4",hp:30,tone:"blue"},frost:{label:"\u51B0\u5E55",hp:37,tone:"blue"},fever:{label:"\u72C2\u70ED",hp:48,tone:"gold"}};function vh(s,e,t,n){let i=xn[t].hp+(t==="plus"?Math.min(8,n-1):(n-1)*1.05),r=Math.round(i*(.66+.34*Fi[n-1].pressure));return{x:s,at:e,z:-e,type:t,hp:r,maxHp:r,active:!0,flash:0}}var Ld=[[0,1,"glass","range","plus"],[1,-1,"crates","spread","squad"],[-1,0,"shutter","longshot","shield"],[1,0,"glass","blast","reserve"],[0,-1,"crates","drone","range"],[-1,1,"shutter","fever","squad"],[0,1,"glass","plasma","medic"],[1,-1,"crates","reserve","rapid"],[-1,0,"shutter","longshot","range"]],xh=[[0,1,"glass","range","plus"],[1,-1,null,"merge","squad"],[-1,0,"glass","blast","squad"],[0,1,null,"squad","range"]],Nd=[[0,1,"glass","plasma","plus"],[1,0,"crates","squad","shield"],[0,-1,"shutter","longshot","blast"],[-1,1,"glass","drone","rapid"],[1,0,"shutter","reserve","range"],[0,-1,"crates","medic","shield"]];function Dd(s,e=[]){let t=[];function n(i,r,a){let o=vh(Ui(i),r,a,s);return t.push(o),o}n(0,11,"plus"),n(-1,16,"merge"),n(1,25,"squad"),s===1&&n(0,28,"blast"),s===8&&n(0,29,"reserve");for(let i=0;i<10;i++){let r=36+i*16.2,a=Ld[(i+(s-1)*2)%Ld.length];s===10&&(a=Nd[i%Nd.length]),s===1&&(a=xh[i%xh.length]),s===8&&i<2&&(a=xh[i]);let[o,c,l,h]=a,f=(s===12||s===15)&&i===1?"reserve":a[4],u=s%2?1:-1,d=(v,M,_)=>!e.some(E=>E.lane===v&&E.at+(E.length||1)/2>=M-1.5&&E.at-(E.length||1)/2<=_+1.5),x=[...new Set([o*u,c*u,-1,0,1])].find(v=>d(v,r-3.6,r));if(x!==void 0){let v=n(x,r,h);l&&(v.coverSpec={kind:"cover",variant:l,lane:x,at:r-3.6,reward:h})}let g=r+(i%2?1.8:-.9),m=[c*u,0,-1,1].find(v=>v!==x&&d(v,g,g));m!==void 0&&n(m,g,f)}return t}var _h=(s,e,t)=>Math.min(t,Math.max(e,s)),yh=5.32,Fg=.94;function Mh(s){let e=s.boss,t=s.x,n=s.captainZ,i=Math.hypot(t-e.x,n-e.z);for(let r of s.allies){let a=Math.hypot(r.x-e.x,r.z-e.z);a<i&&(i=a,t=r.x,n=r.z)}return{x:t,z:n,distance:i}}function bh(s,e,t){let n=[];function i(r,a,o){r.z+o+.65<e||r.z-o-.65>t||n.push({x:r.x,z:r.z,half:a+Fg,depth:o+.65})}for(let r of s.gates)r.active&&i(r,Oi/2,.16);s.wall.hp>0&&i(s.wall,2.14,.32);for(let r of s.features)(r.kind==="cover"||r.kind==="cache")&&r.hp>0&&r.state==="ready"&&i(r,r.half,r.depth);return n}function Ma(s,e,t){let n=bh(s,e,t),i=[...new Set([...s.wave||[0],0,-1,1])],r,a=1/0;for(let o of i){let c=o===0?-.42:Ui(o),l=n.filter(h=>Math.abs(c-h.x)<h.half+.12).length;if(l<a&&(r={lane:o,x:c,conflicts:l},a=l),!l)break}return r}function Ud(s,e,t,n){let i=s.boss,r=i.z+s.worldAdvance,a=_h(i.pursuing?t.x:i.escortX??-.42,-yh,yh),o=i.pursuing?Math.min(r+n,Math.max(i.z-e*3.9,t.z-1.35)):r+n,c=bh(s,Math.min(r,o)-.2,Math.max(r,o)+3),l=a,h=x=>c.every(g=>Math.abs(x-g.x)>=g.half+.025);if(!h(a)||!h(i.x)){let x=[a,i.x,Ui(-1),0,Ui(1)];for(let m of c)x.push(m.x-m.half-.07,m.x+m.half+.07);let g=1/0;for(let m of x){if(Math.abs(m)>yh||!h(m))continue;let v=Math.abs(m-i.x)+.48*Math.abs(m-a);v<g&&(g=v,l=m)}}let f=(i.pursuing?5.1:c.length?3.5:1.2)*e,u=i.x+_h(l-i.x,-f,f),d=o;for(let x of c)Math.abs(u-x.x)>=x.half||Math.abs(d-x.z)>=x.depth||(Math.abs(i.x-x.x)>=x.half?u=x.x+Math.sign(i.x-x.x)*(x.half+.002):r<=x.z?d=Math.min(d,x.z-x.depth-.002):d=Math.max(d,x.z+x.depth+.002));let p=u-i.x;i.marched+=Math.hypot(p,d-r),i.yaw+=(_h(Math.atan2(p,Math.max(e*2,d-r)),-.6,.6)-i.yaw)*(1-Math.exp(-8*e)),i.x=u,i.z=d}function Fd(s,e,t){let n=s.worldAdvance>0?2.3:0;return!bh(s,t-n*1.55,t+.25).some(i=>Math.abs(e-i.x)<i.half&&i.z-i.depth<=t&&i.z+n*1.55+i.depth>=t)}var gr=(s,e,t)=>Math.max(e,Math.min(t,s)),Og=new Set(["cache","bridge","coil","cover"]);function Bg(s,e,t){let n=vh(e.x,s.distance-e.z+.85,t,s.stage);n.z=s.distance-n.at,s.gates.push(n),s.event("supplyBreak",e.x,.65,n.z)}function Od(s,e,t){if(e.state!=="ready")return;let n=e.variant==="shutter"&&Math.abs(t.x-e.x)<.51,i=t.damage;if(n&&(i*=2.25),e.variant==="crates"&&t.kind==="rocket"&&(i*=1.4),e.hp=Math.max(0,e.hp-i),e.flash=1,e.hp>0){s.event(n?"latchHit":"wallHit",t.x,.65,t.z,.55);return}if(e.age=0,e.kind==="cover")if(e.state="open",e.variant==="glass"){s.event("glassBreak",e.x,.48,e.z);let r=a=>{a.alive&&Math.hypot(a.x-e.x,a.z-e.z)<2.45&&s.kill(a,.82,e.x)};for(let a of s.columns)for(let o of a.units)r(o);for(let a of s.runners)r(a)}else s.event(e.variant==="crates"?"crateBreak":"wallBreak",e.x,.48,e.z);else if(e.kind==="cache")e.state="open",s.event("wallBreak",e.x,.57,e.z),Bg(s,e,e.reward);else if(e.kind==="bridge")e.state="cut",s.event("chainSnap",e.x,.85,e.z),s.notice(pr(e.lane)+"\u540A\u6865\u5DF2\u843D\uFF0C\u589E\u63F4\u88AB\u622A\u65AD");else if(e.kind==="coil"){e.state="discharged",s.event("discharge",e.x,.5,e.z,1.35);let r=a=>{a.alive&&Math.abs(a.z-e.z)<7&&Math.abs(a.x-e.x)<5.1&&s.kill(a,.9,e.x)};for(let a of s.columns)for(let o of a.units)r(o);for(let a of s.runners)r(a);s.boss.active&&!s.boss.defeated&&Math.abs(s.boss.z-e.z)<6&&Math.abs(s.boss.x-e.x)<5&&s.damageBoss(t,24)}}function Bd(s){let e=s.boss,t=s.bossStride,n=Math.max(4,(-23-e.z)*t/(2.3+t)),i=e.z+n+3,r=Ma(s,e.z-1.1,i+3.8);for(let o of[-2,-4,-6]){if(!r.conflicts)break;let c=Math.max(e.z+5,e.z+n+3+o),l=Ma(s,e.z-1.1,c+3.8);l.conflicts<r.conflicts&&(r=l,i=c)}e.x=e.escortX=r.x;let a=ya({kind:"gap",lane:r.lane,length:4,at:s.distance-i},s.stage);a.z=s.distance-a.at,a.finale=!0,s.features.push(a)}function zg(s,e){let i=.66-e.z;if(e.state==="ready"&&s.phase!=="clear"&&i<=7.8&&(e.state="warning",e.age=0,s.notice(pr(e.lane)+"\u540A\u8D27\u5760\u843D\uFF0C\u907F\u5F00\u5730\u6807")),e.state!=="warning")return;e.progress=gr(1-i/7.8,0,1);let r=s.boss.active?2.3:3.65;if(e.fallProgress=gr(1-i/(.55*r),0,1),i>0)return;e.state="landed",e.age=0,s.event("impact",e.x,.18,e.z,1.35);let a=(c,l)=>Math.hypot(c-e.x,l-e.z)<=e.radius;function o(c){c.alive&&a(c.x,c.z)&&s.kill(c,1.08,e.x)}for(let c of s.columns)for(let l of c.units)o(l);for(let c of s.runners)o(c);if(s.allies=s.allies.filter(c=>a(c.x,c.z)?(s.fall(c,"blue",1.15,e.x),!1):!0),!!a(s.x,s.captainZ)){if(s.buffs.shield>0){s.event("shieldHit",s.x,.55,s.captainZ);return}s.hitGuard>0||(s.hurt=1,s.hitGuard=1.2,--s.armor<=0&&(s.lossReason="skyfall",s.finish(!1)))}}function zd(s,e){s.activeGround.length=0;for(let t of s.features)if(t.z=s.distance-t.at,t.age+=e,t.flash=Math.max(0,t.flash-e*6),!(t.z<s.entryZ-12||t.z>15)){if(t.kind==="skyfall"){if(zg(s,t),!s.playing)return;continue}if((t.kind==="bridge"||t.kind==="gap"||t.kind==="belt")&&s.activeGround.push(t),!t.warned&&t.z>-22&&t.z<-14&&t.state==="ready"&&!t.finale){t.warned=!0;let n=pr(t.lane),i={gap:n+"\u65AD\u6865\uFF0C\u63D0\u524D\u6362\u9053",bridge:"\u6253\u65AD"+n+"\u540A\u7D22\uFF0C\u622A\u4F4F\u589E\u63F4",cache:"\u6253\u788E"+n+"\u7816\u5899\uFF0C\u53D6\u51FA\u8865\u7ED9",cover:t.variant==="glass"?n+"\u73BB\u7483\u74F6\uFF0C\u51FB\u788E\u53EF\u9707\u5012\u8FD1\u5175":t.variant==="crates"?n+"\u6728\u7BB1\uFF0C\u91CD\u70AE\u62C6\u5F97\u5FEB":n+"\u94A2\u95F8\uFF0C\u7784\u51C6\u6A59\u8272\u9501\u6263",coil:"\u51FB\u4E2D"+n+"\u7EBF\u5708\uFF0C\u653E\u7535\u6E05\u5175",belt:n+"\u4F20\u9001\u5E26\u5411"+(t.direction>0?"\u53F3":"\u5DE6")};s.notice(i[t.kind])}if(Og.has(t.kind)&&(t.target??(t.target={mechanism:t}),t.target.x=t.x,t.target.z=t.z+(t.kind==="bridge"?t.length/2+.24:0)),s.phase!=="clear"&&!t.escorted&&t.kind==="cache"&&t.z>=s.entryZ-5&&t.z<-8){t.escorted=!0;for(let n=0;n<2;n++)for(let i=-1;i<=1;i++){let r=s.grunt(t.x+i*.48,s.entryZ-.95-n*.59);r.speed=2.62,s.runners.push(r)}}if(s.phase!=="clear"&&t.kind==="bridge"&&t.state==="ready"&&t.z>=-7.1&&(t.state="linked",t.age=0,s.flanks.push({x:t.lane===0?4.44:t.x,remaining:s.route.siege?27:16+Math.floor(s.stage/3),next:0}),s.notice(pr(t.lane)+"\u540A\u6865\u63A5\u901A\uFF0C\u589E\u63F4\u6765\u4E86")),t.kind==="belt"&&Math.abs(t.z-s.captainZ)<t.length/2&&Math.abs(s.x-t.x)<4.4/2-.1&&!s.rope&&s.aim(s.targetX+t.direction*e*1.32),Fs(t)&&s.planks&&t.z>-5.2&&t.z<1&&Math.abs(s.x-t.x)<4.4/2+.2&&!s.rope&&(s.planks--,t.state="repaired",t.age=0,s.event("plus",t.x,.24,t.z),s.notice(pr(t.lane)+"\u5DF2\u642D\u597D\u4FBF\u6865")),Fs(t)&&Math.abs(t.z)<t.length/2+2.8&&(s.allies=s.allies.filter(n=>{if(!Xo(t,n.x,n.z,.14))return!0;let i=s.fall(n,"blue",0);return i.intoGap=!0,i.vy=-.5,!1}),!s.rope&&Xo(t,s.x,s.captainZ,.22))){if(s.armor--,s.hurt=1,s.armor<=0){s.lossReason="gap",s.finish(!1);return}let n=t.lane===-1?1:t.lane===1?-1:s.x>=t.x?1:-1;s.rope={age:0,from:s.x,to:t.x+n*(4.4/2+.75)},s.aim(s.rope.to),s.hitGuard=1.05,s.notice("\u5B89\u5168\u7EF3\u62C9\u56DE\u961F\u957F\uFF0C\u62A4\u7532 \u22121")}}for(let t of s.flanks)if(t.next-=e,t.remaining>0&&t.next<=0){t.next+=.16,t.remaining--;let n=s.grunt(t.x+(t.remaining%3-1)*.12,s.entryZ-.92);n.speed=3.18,n.flank=!0,s.route.siege&&t.remaining%5===0&&(n.role="guard",n.size*=1.32,n.hp=9),s.runners.push(n)}s.flanks=s.flanks.filter(t=>t.remaining>0)}function kd(s,e,t){e.lift=0;for(let n of s.activeGround){let i=e.z-n.z;if(n.kind==="belt"&&Math.abs(i)<n.length/2&&Math.abs(e.x-n.x)<4.4/2){e.x=gr(e.x+n.direction*t*.65,-6,6);continue}if(!Fs(n)||i<-n.length/2-4.3||i>n.length/2+.45||Math.abs(e.x-n.x)>4.4/2+.16)continue;if(e.role==="vault"){let o=gr((i+n.length/2+.55)/(n.length+1.1),0,1);e.lift=1.08*Math.sin(Math.PI*o);return}let r=n.lane===-1?1:n.lane===1||e.laneX<n.x?-1:1,a=n.x+r*(4.4/2+.24);if(e.x+=gr(a-e.x,-3.8*t,3.8*t),Xo(n,e.x,e.z,.22)){e.alive=!1;let o=s.fall(e,"red",0);o.intoGap=!0,o.vy=-.7}return}}function Hd(s,e){let t=s.boss;t.vault={piece:e,t:0,from:t.z-e.z,to:e.length/2+1.08},t.attackT=0,t.recovery=.15,e.crossed=!0}function Gd(s,e){let t=s.boss,n=t.vault;n.airDash&&(n.piece.z+=s.worldAdvance),n.t+=e;let i=gr((n.t-.21)/.89,0,1),r=i*i*(3-2*i);t.z=n.piece.z+n.from+(n.to-n.from)*r,t.lift=2.5*4*i*(1-i),n.t>=1.1&&!n.landed&&(n.landed=!0,s.event("vaultLand",t.x,.06,t.z,.9)),n.t>=1.35&&(t.vault=null,t.lift=0,t.recovery=.34)}var On=(s,e,t)=>Math.max(e,Math.min(t,s)),Zo=Math.PI*2,Vd=21,Wd=5.45,kg=1.38,qo=11,Sh=2.47,Xd=[[-1,1],[1,0],[-1,0],[1],[0,-1],[1,-1],[0],[0,1],[-1]],Yo=11;function Eh(s,e){let t=0,n=s,i=8;for(;n>=i;)n-=i,t++,i=8+6*t;let r=Zo*n/i+.21+t*.18,a=.93+(e-1)*.46+t*.51;return[Math.cos(r)*a,Math.sin(r)*a*.92]}var Ko=class{constructor(e=()=>{}){this.emit=e,this.reset()}reset(e=1){this.stage=On(Math.trunc(Number(e))||1,1,xi),this.route=Fi[this.stage-1],this.features=this.route.features.map(i=>ya(i,this.stage)),this.activeGround=[],this.flanks=[],this.rope=null,this.planks=0,this.overrun=null,this.parade=null,this.chill=0,this.hint=null,this.hintSequence=0,this.rallyZ=-100,this.seed=129920+(this.stage-1)*1141,this.sequence=0,this.phase="ready",this.elapsed=0,this.distance=0,this.captainZ=0,this.targetZ=0,this.caught=!1,this.caughtBy=null,this.lossReason=null,this.worldAdvance=0,this.x=0,this.targetX=this.x,this.velocity=0,this.upgrades=0,this.scale=1,this.visualScale=1,this.recoil=0,this.mergeGlow=0,this.hurt=0,this.armor=3,this.shots=[],this.incoming=[],this.enemyFireTimer=0,this.allies=[],this.falling=[],this.deliveries=[],this.runners=[],this.rocketTimer=.18,this.volleyTimer=.06,this.volley=0,this.buffs={rapid:0,shield:0,plasma:0,spread:0,drone:0,fever:0,frost:0,range:0,longshot:0},this.supportTimer=0,this.feverMeter=0,this.row=0,this.toNextRow=0,this.entryZ??(this.entryZ=-46),this.finaleRow=this.route.finale,this.lastRow=this.finaleRow+48,this.hitGuard=0,this.score=0,this.recruits=0,this.endTime=0;let t=this.route.wallHP;this.wall={x:4.13,z:-Vd,hp:t,maxHp:t,flash:0};let n=this.route.bossHP;this.boss={x:-.42,z:this.entryZ-1.4,hp:n,maxHp:n,marched:0,hit:0,lift:0,active:!1,defeated:!1,removed:!1,skill:null,nextCast:0,kind:this.route.boss,vault:null,moveClock:0,special:0,pattern:0,brace:0,defeatAge:0,attackT:0,impactDone:!1,pursuing:!1,yaw:0,recovery:0,leapFromX:0,leapFromZ:0,landX:0,landZ:0},this.gates=Dd(this.stage,this.features),this.gates[2].cover=this.wall;for(let i of this.gates)i.coverSpec&&(i.cover=ya(i.coverSpec,this.stage),this.features.push(i.cover));this.bossStride=1.02+Math.min(.27,(this.stage-1)*.014),this.marchSpeed=Sh+Math.min(.28,(this.stage-1)*.012),this.wave=null,this.columns=Array.from({length:qo},(i,r)=>({index:r,minX:1/0,maxX:-1/0,units:[]})),this.recruit(this.x,!0)}rand(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}grunt(e,t){let n=e+(this.rand()-.5)*.16;return{x:n,laneX:n,z:t+(this.rand()-.5)*.08,id:++this.sequence,phase:this.rand()*Zo,marched:0,yaw:0,size:.92+this.rand()*.13,alive:!0}}event(e,t,n,i,r=1,a=null){this.emit({kind:e,x:t,y:n,z:i,strength:r,supply:a})}notice(e){this.hint={id:++this.hintSequence,text:e}}start(){this.phase==="ready"&&(this.phase="run",this.stage===1&&this.notice("\u5DE6\u53F3\u79FB\u52A8\uFF0C\u5BF9\u51C6 +3 \u62DB\u52DF\u58EB\u5175"))}aim(e,t=this.targetZ){this.targetZ=On(t,0,kg),this.targetX=On(e,-Wd,Wd)}get playing(){return this.phase==="run"||this.phase==="boss"||this.phase==="clear"}get cannonDamage(){return 26+this.upgrades*5+Math.round((this.stage-1)*.88)}nextSlot(){let e=new Set(this.allies.map(n=>n.slot));for(let n of this.deliveries)n.slot!=null&&e.add(n.slot);let t=0;for(;e.has(t);)t++;return t}recruit(e,t=!1,n=this.nextSlot()){if(this.allies.length>=48)return;let[i,r]=Eh(n,this.scale);this.allies.push({slot:n,x:On(e+i,-6.28,6.28),z:this.captainZ+r,age:t?2:0,phase:this.rand()*Zo}),t||this.recruits++}openCard(e){if(!e.active||e.cover?.hp>0)return;if(e.active=!1,e.collectedAt=this.elapsed,e.pop=0,this.event("supplyBreak",e.x,.62,e.z,1,e.type),e.type==="blast"){let n=e.x;this.blast({x:n,power:5.8},e.z-1.5),this.boss.active&&Math.hypot(this.boss.x-n,this.boss.z-e.z+1.5)<4.6&&this.damageBoss({kind:"rocket"},48);return}let t=xn[e.type].count;for(let n=0;n<(t||1);n++){let i=t?this.nextSlot():null;if(i!=null&&i>=48)break;this.deliveries.push({type:e.type,slot:i,sx:e.x,sz:e.z,x:e.x,z:e.z,y:.46,age:-n*.065,progress:0,phase:this.rand()*Zo})}}updateDeliveries(e){for(let t of this.deliveries){if(t.age+=e,t.age<0)continue;let n=Math.min(1,t.age/.58),i=n*(2-n),[r,a]=t.slot==null?[0,-.18]:Eh(t.slot,this.scale);if(t.progress=n,t.x=t.sx+(On(this.x+r,-6.28,6.28)-t.sx)*i,t.z=t.sz+(this.captainZ+a-t.sz)*i,t.y=.46*(1-n)+Math.sin(Math.PI*n)*(1.05+Math.min(1.25,Math.abs(t.sz)*.075)),!(n<1))if(t.slot!=null)this.recruit(this.x,!1,t.slot),this.event("plus",t.x,.12,t.z,.7);else{if(t.type==="merge")this.upgrades++,this.scale=1+Math.min(.64,this.upgrades*.13);else if(t.type==="engineer")this.planks=Math.min(2,this.planks+1),this.notice("\u4FBF\u6865 +1\uFF0C\u9760\u8FD1\u7F3A\u53E3\u81EA\u52A8\u67B6\u6865");else if(t.type==="medic"){this.armor=Math.min(3,this.armor+1);for(let o=0;o<2;o++)this.recruit(this.x);this.notice("\u6551\u63F4\u5230\u961F\uFF0C\u62A4\u7532 +1")}else if(t.type==="range"||t.type==="longshot")this.buffs[t.type]=t.type==="range"?7:5.5,this.notice(t.type==="range"?"\u5168\u961F\u8FDC\u5C04 \xB7 7\u79D2":"\u7A7F\u7532\u8FDC\u5C04 \xB7 5.5\u79D2");else{let o=t.type==="fever"?4.2:t.type==="shield"?5:6;this.buffs[t.type]=o}this.mergeGlow=1,this.event("merge",this.x,.23,this.captainZ,1,t.type)}}this.deliveries=this.deliveries.filter(t=>t.progress<1)}crossGates(){for(let e of this.gates){if(e.z=this.distance-e.at,!e.active){e.pop=this.elapsed-e.collectedAt;continue}this.caught||Math.abs(e.z-this.captainZ)>.83||Math.abs(this.x-e.x)<=Oi/2+this.scale*.16&&this.openCard(e)}}marchPastBoss(e,t){let n=this.boss,i=e.z-n.z;if(!e.passSide&&e.x===e.laneX&&(i<-3.3||i>6.4))return;let r=n.attackT>0?n.landZ:n.z+.45,a=1-wt(Math.abs(i),1.45,3.25),o=n.attackT>0?1-wt(Math.abs(e.z-r),1.25,3.45):0,c=Math.max(1.42*a,1.9*o*wt(n.attackT,0,.31));if(c?e.passSide||(e.passSide=e.x<n.x?-1:1):e.passSide=0,!c&&e.x===e.laneX)return;let l=e.passSide||1,h=Math.max(.2,l>0?6.4-n.x:n.x+6.4),f=On(Math.abs(e.laneX-n.x)/h,0,1),u=e.laneX+l*c*(1-f);e.x+=(u-e.x)*(1-Math.exp(-9*t)),!c&&Math.abs(e.x-e.laneX)<.002&&(e.x=e.laneX)}spawnRow(){let e=Math.floor(this.row/Yo),t=this.row%Yo;if(!this.wave||this.row%(Yo*2)===0){let i=Math.floor(e/2)+(this.stage-1)*2,r=this.stage%2?1:-1;this.wave=Xd[i%Xd.length].map(c=>c*r);let a=this.distance+6+(-this.entryZ-6)*3.65/(3.65+this.marchSpeed),o=this.gates.find(c=>c.coverSpec&&Math.abs(c.at-a)<5.2);if(o&&i%3!==2){let c=o.coverSpec.lane;this.wave=this.wave.filter(l=>l!==c),this.wave.length||(this.wave=[c===0?r:0])}}let n=this.wave.length===1;for(let i of this.columns){let r=i.index,a=n?9:r<6?6:5,o=Math.min(a,Math.round(a*(.32+.68*this.route.pressure))),c=n||r<6?r:r-6,l=this.wave[n||r<6?0:1];if(c>=o||t<2&&(c===0||c===o-1))continue;let h=n?.43:.52,f=(this.row%2-.5)*.15,u=Ui(l)+(c-(o-1)/2)*h+f,d=this.entryZ-.86-.12*(c%2),p=i.units.at(-1),x=p?Math.min(d,p.z-.4):d,g=this.grunt(u,x);if(i.minX=Math.min(i.minX,g.x),i.maxX=Math.max(i.maxX,g.x),t===5&&i.index===e*7%qo&&this.stage>=2){let m=["gunner"];this.stage>=3&&m.push("weaver","brute","vault"),this.stage>=4&&m.push("guard"),this.stage>=5&&m.push("bomber","standard"),this.stage>=7&&m.push("courier"),g.role=m[(e+this.stage)%m.length];let v=g.role==="brute"||g.role==="guard";g.size*=v?1.42:1.1,g.hp=v?9+this.stage*.65:3.2+this.stage*.27,g.speed=v?2.02:g.role==="weaver"?3.47:2.77,this.runners.push(g)}else t===2&&(i.index===e*3%qo||i.index===(e*3+5)%qo)?(g.speed=3.4+this.rand()*.25,this.runners.push(g)):i.units.push(g)}this.row++}moveGrunt(e,t,n){if(this.phase==="clear"&&(e.spent||e.z>this.captainZ+.75)&&(!e.overBody||e.z>e.overBody.z+1.06)){e.spent=!0,e.overBody=null;let h=this.x+(e.id%5-2)*.28,f=this.captainZ-2.15-e.id%3*.28,u=On(h-e.x,-5.1*t,5.1*t),d=On(f-e.z,-4.7*t,4.7*t);e.x+=u,e.z+=d,e.marched+=Math.hypot(u,d-this.worldAdvance),Math.abs(d)+Math.abs(u)>.001&&(e.yaw+=(Math.atan2(u,d)-e.yaw)*(1-Math.exp(-7*t)));return}let i=e.speed>=3.12,r=!e.spent&&e.z>=this.captainZ+(i?-8.4:-6.9)&&e.z<this.captainZ+1.65,a=e.x,o=e.speed??this.marchSpeed,c=0;if(r){let h=this.x,f=this.captainZ,u=Math.abs(h-e.x);for(let g of n){let m=Math.abs(g.x-e.x);m<u&&(u=m,h=g.x,f=g.z)}o*=i?1.48:1.32;let d=Math.max(.075,(f-e.z-.32)/(this.worldAdvance/t+o)),p=i?12.2:11.6,x=(e.id%7-3)*.065;c=On((h+x-e.x)/d,-p,p)*t,e.role==="weaver"&&(c+=Math.sin(e.phase+e.marched*7)*t*.74),e.x+=c}else if(e.spent)e.overX!=null&&(e.x+=On(e.overX-e.x,-3.3*t,3.3*t));else if(this.boss.active&&!this.boss.defeated){let h=e.x;this.marchPastBoss(e,t),c=e.x-h}if(this.activeGround.length?kd(this,e,t):e.lift=0,!e.alive)return;this.buffs.frost>0&&(o*=.48,e.x=a+(e.x-a)*.6),Math.abs(e.z-this.rallyZ)<2.7&&(o*=1.17),c=e.x-a;let l=o*t;e.z+=this.worldAdvance+l,e.marched+=Math.hypot(l,c),e.yaw+=(Math.atan2(c,l)-e.yaw)*(1-Math.exp(-9*t)),e.role==="gunner"&&!e.fired&&e.z>=-14&&e.z<-4&&this.enemyFireTimer<=0&&(this.enemyRound(e.x,e.z,.65,0,e),e.fired=!0),!e.spent&&e.z>this.captainZ-2&&e.z<this.captainZ+2.3&&this.contact(e)}advanceCrowd(e){this.rallyZ=this.runners.find(n=>n.alive&&n.role==="standard"&&n.z>-10)?.z??-100;let t=this.allies.filter(n=>n.z<=this.captainZ+.18);for(let n of this.columns){n.minX=1/0,n.maxX=-1/0;let i=0,r=!1;for(let a of n.units)a.alive&&(this.moveGrunt(a,e,t),!(!a.alive||a.z>10&&this.phase!=="clear")&&(n.minX=Math.min(n.minX,a.x),n.maxX=Math.max(n.maxX,a.x),i&&n.units[i-1].z<a.z&&(r=!0),n.units[i++]=a));n.units.length=i,r&&n.units.sort((a,o)=>o.z-a.z)}for(let n of this.runners)n.alive&&this.moveGrunt(n,e,t);for(this.runners=this.runners.filter(n=>n.alive&&(n.z<10||this.phase==="clear")),this.toNextRow-=this.worldAdvance+this.marchSpeed*e;this.row<this.lastRow&&this.toNextRow<=0;)this.spawnRow(),this.toNextRow+=this.route.rowSpacing+(this.row%Yo===0?.38:0),this.row>=70&&Math.abs(this.row-this.finaleRow)>10&&(this.row-70)%this.route.restEvery===0&&(this.toNextRow+=this.route.restLength)}contact(e){if(!this.playing||this.caught)return;let t=this.allies.findIndex(r=>Math.abs(r.x-e.x)<.32&&Math.abs(r.z-e.z)<.32),n=Math.abs(e.x-this.x)<.39*this.scale&&Math.abs(e.z-this.captainZ)<.4;if(t<0&&!n)return!1;let i=e.startZ!=null;if(i||e.role==="bomber"?e.alive=!1:(e.spent=!0,e.overX=t>=0?this.allies[t].x:this.x),this.hitGuard>0)return!0;if(this.hitGuard=this.buffs.shield>0?.46:this.route.contactGrace,this.buffs.shield>0)return this.event("shieldHit",e.x,.35,e.z),!0;if(this.hurt=1,e.role==="bomber")return this.event("impact",e.x,.1,e.z,.87),this.allies=this.allies.filter(r=>Math.hypot(r.x-e.x,r.z-e.z)>.95?!0:(this.fall(r,"blue",1.2,e.x),!1)),n&&!this.allies.length&&--this.armor<=0&&(this.lossReason="infantry",this.finish(!1,e)),!0;if(t<0&&this.allies.length){let r=1/0;this.allies.forEach((a,o)=>{let c=(a.x-e.x)**2+(a.z-e.z)**2;c<r&&(r=c,t=o)})}if(t>=0){let r=this.allies.splice(t,1)[0],a=this.fall(r,"blue",0);a.prone=!0,a.dir=r.x>=e.x?1:-1,i||(e.overX=r.x,e.overBody=a)}else--this.armor<=0&&(this.lossReason=i&&e.shooter===this.boss?"bossShot":"infantry",this.finish(!1,i?e.shooter:e));return!0}enemyRound(e,t,n,i=0,r=this.boss){let o=this.x+i-e,c=Math.max(1,this.captainZ-t),l=Math.hypot(o,c);this.incoming.push({x:e,z:t,y:n,startY:n,startZ:t,shooter:r,vx:o*7.4/l,vz:c*7.4/l,alive:!0}),this.enemyFireTimer=1.35,this.event("hostileMuzzle",e,n,t)}advanceIncoming(e){this.enemyFireTimer=Math.max(0,this.enemyFireTimer-e);for(let t of this.incoming)t.x+=t.vx*e,t.z+=t.vz*e,t.y=.45+(t.startY-.45)*On(t.z/t.startZ,0,1),t.z>this.captainZ-2&&t.z<this.captainZ+2.3&&this.contact(t)&&this.event("hostileMuzzle",t.x,t.y,t.z);this.incoming=this.incoming.filter(t=>t.alive&&t.z<6)}pushWall(e,t=this.wall,n=2.14){let i=(r,a,o)=>t.hp>0&&Math.abs(r-t.x)<n+o&&Math.abs(a-t.z)<.32+o;this.allies=this.allies.filter(r=>{if(!i(r.x,r.z,.19))return!0;this.fall(r,"blue",0);let a=this.falling[this.falling.length-1];return a.pushed=!0,a.front=t.z+.55,!1}),!this.caught&&i(this.x,this.captainZ,.32*this.visualScale)&&(this.caught=!0,this.caughtBy=t),this.caught&&this.caughtBy===t&&(this.captainZ=Math.max(this.captainZ,t.z+.38),this.captainZ>=4.5&&(this.lossReason="wall",this.finish(!1)))}fall(e,t,n,i=e.x){if(this.falling.length>=96){let a=this.falling.findIndex(o=>o.side==="red");this.falling.splice(a<0?0:a,1)}let r={x:e.x,z:e.z,y:.07,t:0,side:t,phase:e.phase||0,size:e.size||1,id:e.id||0,vx:(e.x-i)*1.05+(this.rand()-.5)*2.8*n,vz:(this.rand()-.5)*2.4*n,vy:(1.65+this.rand()*2.3)*n,spin:(this.rand()-.5)*8,roll:(this.rand()-.5)*7};return this.falling.push(r),r}kill(e,t=1,n=e.x){if(!(!e.alive||e.overBody&&e.z<e.overBody.z+.84)&&(e.alive=!1,this.score++,this.buffs.fever<=0&&(this.feverMeter+=.21,this.feverMeter>=100&&(this.feverMeter=0,this.buffs.fever=4.2,this.event("merge",this.x,.2,this.captainZ))),this.fall(e,"red",t,n),e.role==="courier"&&this.playing)){let i={x:e.x,z:e.z,type:"medic",active:!0};this.openCard(i)}}closeEnemy(e,t){let i=null,r=(a,o)=>{let c=t-a.z;c<0||c>2.35+o||Math.hypot(a.x-e,c)>2.35+o||(!i||a.z>i.z||a.z===i.z&&Math.abs(a.x-e)<Math.abs(i.x-e))&&(i=a)};this.boss.active&&!this.boss.defeated&&r(this.boss,.78);for(let a of this.columns)if(!(a.maxX<e-2.35-.25||a.minX>e+2.35+.25))for(let o of a.units){if(o.z<t-2.35-.25)break;o.alive&&r(o,.2)}for(let a of this.runners)a.alive&&r(a,.2);return i}launch(e,t,n,i,r,a,o=0){let c=1/Math.hypot(1,o),l={kind:i===_a?"rocket":"shot",profile:i,power:r,damage:a,headingX:o*c,headingZ:-c,startX:e,startY:t,startZ:n,x:e,y:t,z:n,distance:0,range:this.buffs.range>0||this.buffs.longshot>0?Cd:Rd,age:0,afterHit:0,finished:!1,pierce:i===Us?3:this.buffs.longshot>0&&i!==_a?1:0},h=this.firstHit(l,l.range);if(o===0&&(!h||h.distance>2.35)){let u=this.closeEnemy(e,n);if(u){let d=u.x-e,p=Math.min(-.06,u.z-n),x=Math.hypot(d,p);l.headingX=d/x,l.headingZ=p/x,l.range=Math.min(l.range,x+.75),h=this.firstHit(l,l.range)}}l.aimDistance=Math.max(.12,h?h.distance:l.range),l.endY=h?.target===this.boss?Rn[this.boss.kind].aim:h?.target===this.wall||h?.target.type||h?.target.mechanism?.72:.48;let f=(this.boss.z-n)/l.headingZ;i===_a&&this.boss.active&&!this.boss.defeated&&f>0&&f<l.range&&Math.abs(e+l.headingX*f-this.boss.x)<=1.26&&h?.target!==this.wall&&!h?.target.type&&!h?.target.mechanism&&(l.aimDistance=Math.max(.12,f),l.endY=Rn[this.boss.kind].aim),l.lift=i.lift*Math.min(1,l.aimDistance/9),this.shots.push(l)}shoot(e){let t=this.buffs.fever>0,n=(t?.62:this.buffs.rapid>0?.72:1)*(this.chill>0?1.32:1);if(this.rocketTimer-=e,this.rocketTimer<=0){this.rocketTimer+=.69*n,this.recoil=1;let i=this.x+.295*this.visualScale,r=1.31*this.visualScale,a=this.captainZ-.6*this.visualScale,o=1+Math.min(1.7,this.upgrades*.28);this.launch(i,r,a,_a,o,this.cannonDamage),this.event("muzzle",i,r,a,o)}if(this.volleyTimer-=e,this.volleyTimer<=0){this.volleyTimer+=.27*n,this.volley++;for(let i of this.allies){if(i.age<.12)continue;let r=i.x+.13,a=i.z-.22,o=(t||this.buffs.plasma>0)&&(i.slot+this.volley)%3===0,c=o?Us:i.slot%4===1?Go:dh;this.launch(r,.58,a,c,1,o?6:2.8),(t||this.buffs.spread>0)&&i.slot%2===0&&this.launch(r,.58,a,dh,1,2.8,(this.volley%2?1:-1)*.09)}this.allies.length&&this.event("smallShot",this.x,.6,0,.7)}if(this.supportTimer-=e,this.buffs.drone>0&&this.supportTimer<=0){this.supportTimer=.36;for(let i of[-1,1])this.launch(this.x+i*1.15,1.3,this.captainZ-.32,Us,1,6)}}firstHit(e,t){let n=e.headingX,i=e.headingZ,r=e.x+n*t,a=e.z+i*t,o=e.kind==="rocket"?.15:.07,c=null,l=(h,f,u)=>{if(h.overBody&&h.z<h.overBody.z+.84)return;let d=f+o,p=u+o,x=Math.max(0,(h.z+p-e.z)/i),g=Math.min(t,(h.z-p-e.z)/i);if(Math.abs(n)<1e-6){if(Math.abs(e.x-h.x)>d)return}else{let m=(h.x-d-e.x)/n,v=(h.x+d-e.x)/n;x=Math.max(x,Math.min(m,v)),g=Math.min(g,Math.max(m,v))}if(!(x>g||c&&x>=c.distance)){if(e.aimDistance!==void 0&&h!==this.wall&&!h.type&&!h.mechanism){let m=h.lift||0,v=m+(h===this.boss?Rn[h.kind].height:.92*(h.size||1))+o,M=Vo(e,e.distance+x),_=Vo(e,e.distance+g);if(Math.min(M,_)>v||Math.max(M,_)<m-o)return;M>v&&M>_&&(x+=(g-x)*(M-v)/(M-_))}c={target:h,distance:x}}};this.wall.hp>0&&l(this.wall,2.1,.32);for(let h of this.features)h.target&&h.state==="ready"&&h.target.z>=a-.7&&h.target.z<=e.z+.7&&l(h.target,h.half,h.depth);for(let h of this.gates)h.active&&!(h.cover?.hp>0)&&h.z>=a-.36&&h.z<=e.z+.36&&l(h,Oi/2,.15);this.boss.active&&!this.boss.defeated&&l(this.boss,1.26,.7);for(let h of this.columns)if(!(h.maxX<Math.min(e.x,r)-.42||h.minX>Math.max(e.x,r)+.42))for(let f of h.units){if(f.z<a-.42)break;f.alive&&f.z<e.z+.42&&l(f,.245,.23)}for(let h of this.runners)h.alive&&l(h,.25*h.size,.23*h.size);return c}blast(e,t){let n=.95+e.power*.48;for(let i of this.columns)if(!(i.maxX<e.x-n||i.minX>e.x+n))for(let r of i.units){if(r.z<t-n)break;r.alive&&(r.x-e.x)**2+(r.z-t)**2<n*n&&this.kill(r,1.18,e.x)}for(let i of this.runners)i.alive&&(i.x-e.x)**2+(i.z-t)**2<n*n&&this.kill(i,1.18,e.x);this.event("impact",e.x,.06,t,e.power)}damageBoss(e,t){let n=this.boss;n.defeated||(n.hp=Math.max(0,n.hp-t*(n.brace>.6?.55:1)),n.hit=e.kind==="rocket"?.77:Math.max(n.hit,.1),n.hp<=0&&(n.defeated=!0,n.skill=null,n.defeatAge=0,this.phase="clear",this.lastRow=this.row,this.event("finisher",n.x,2.3,n.z,1.5)))}resolveHit(e,t){if(t.mechanism){Od(this,t.mechanism,e);return}if(t===this.wall)t.hp=Math.max(0,t.hp-e.damage*.72),t.flash=1,this.event(t.hp<=0?"wallBreak":"wallHit",e.x,.85,e.z,e.kind==="rocket"?1.15:.45);else if(t.type&&xn[t.type])t.hp=Math.max(0,t.hp-e.damage),t.flash=1,t.hp<=0?this.openCard(t):this.event("cardHit",e.x,.6,e.z,.7,t.type);else if(t===this.boss)this.event(e.kind==="rocket"?"impact":"hit",e.x,e.y,e.z,e.kind==="rocket"?e.power*.7:.7),this.damageBoss(e,e.damage);else if(e.kind==="rocket"){this.blast(e,t.z);let n=this.boss;n.active&&n.lift<.85&&Math.hypot(e.x-n.x,t.z-n.z)<1.65+e.power*.48&&this.damageBoss(e,e.damage*.65)}else t.hp!=null&&(t.hp-=e.damage*(t.role==="guard"&&e.profile!==Us?.65:1)),(t.hp==null||t.hp<=0)&&this.kill(t,.72),this.event("hit",e.x,.45,e.z,.65)}advanceShots(e){let t=[];for(let n of this.shots){if(n.age+=e,n.finished){n.afterHit+=e,n.afterHit*n.profile.speed<n.profile.tail&&t.push(n);continue}let i=Math.min(e*n.profile.speed,n.range-n.distance);for(;i>0&&!n.finished&&this.playing;){let r=this.firstHit(n,i),a=r?r.distance:i;n.distance+=a,!r&&n.range-n.distance<1e-8&&(n.distance=n.range),i-=a,dr(n,n.distance,n),r&&this.resolveHit(n,r.target);let o=r&&n.pierce>0&&r.target.alive===!1;o&&n.pierce--,n.finished=!!r&&!o||n.distance>=n.range-1e-8}if(!this.playing)break;t.push(n)}this.shots=this.playing?t:[]}updateFalling(e){for(let t of this.falling){if(t.prone){t.t+=e,t.z+=this.worldAdvance;continue}if(t.intoGap){t.t+=e,t.vy-=e*8,t.y+=t.vy*e,t.z+=this.worldAdvance;continue}if(t.pushed){t.z=Math.max(t.z,t.front),t.z+=this.worldAdvance,t.y=0,t.z>7&&(t.t=2);continue}t.t+=e,t.x+=t.vx*e,t.z+=t.vz*e+this.worldAdvance*.38,t.y+=t.vy*e,t.vy-=(t.gravity??8.6)*e,t.y<.05&&(t.y=.05,t.vx*=.9,t.vz*=.9)}this.falling=this.falling.filter(t=>t.t<(t.prone?this.overrun?4.9:2.1:1.02))}slamSquad(){let e=this.boss;if(this.event("slam",e.landX,.08,e.landZ,1.08),this.allies=this.allies.filter(t=>{let n=t.x-e.landX,i=t.z-e.landZ,r=Math.hypot(n,i);if(r>2.15+.19)return!0;let a=this.fall(t,"blue",0),o=r>.01?Math.atan2(i,n):t.phase,c=3+2.1*(1-Math.min(1,r/2.15));return a.vx=Math.cos(o)*c,a.vz=Math.sin(o)*c,a.vy=4+c*.38,a.gravity=13.5,a.spin=-Math.sin(o)*5,a.roll=Math.cos(o)*5,!1}),!(Math.hypot(this.x-e.landX,this.captainZ-e.landZ)>2.15+.26)){if(this.buffs.shield>0){this.buffs.shield=0,this.event("shieldHit",this.x,.7,this.captainZ);return}this.hurt=1,this.hitGuard=1.15,this.armor--,this.armor<=0&&(this.lossReason="slam",this.finish(!1))}}advanceBoss(e){let t=this.boss;if(t.defeated){let f=t.defeatAge;t.defeatAge+=e,f<.92&&t.defeatAge>=.92&&this.landBoss(),t.removed||(t.z+=this.worldAdvance),f<1.62&&t.defeatAge>=1.62&&(t.removed=!0,this.event("bossBurst",t.x,.62,t.z-1.15,1.4)),t.removed&&t.defeatAge>2.05&&!this.flanks.length&&!this.deliveries.length&&this.row>=this.lastRow&&!this.runners.length&&this.columns.every(u=>u.units.length===0)&&this.finish(!0);return}if(!t.active){this.row>=this.finaleRow&&(t.z=this.entryZ-1.5,t.active=!0,this.phase="boss",this.route.vault?Bd(this):t.x=t.escortX=Ma(this,t.z-1.3,t.z+6).x);return}if(Pd(this,e),!this.playing)return;if(t.vault){Gd(this,e);return}if(t.recovery=Math.max(0,t.recovery-e),t.attackT>0){t.attackT+=e;let f=Wo(t.attackT),u=wt(f,0,1);t.x=t.leapFromX+(t.landX-t.leapFromX)*u,t.z=t.leapFromZ+(t.landZ-.68-t.leapFromZ)*u,t.lift=2.15*4*f*(1-f),t.attackT>=.91&&!t.impactDone&&(t.impactDone=!0,this.slamSquad()),t.attackT>=1.48&&(t.attackT=0,t.recovery=1.14);return}for(let f of this.activeGround){if(f.crossed||!Fs(f)||Math.abs(t.x-f.x)>1.9)continue;let u=f.z-f.length/2-t.z;if(u<=1.05&&u>=-.5){Hd(this,f);return}}t.moveClock+=e;let n=t.moveClock%5.2;t.brace=t.kind==="warden"?wt(n,.92,1.32)*(1-wt(n,2.45,2.95)):0,t.special=t.kind==="drill"?wt(n,1.1,1.55)*(1-wt(n,2.35,2.85)):0;let i=t.skill?.kind==="warden"&&t.skill.fired&&!t.skill.marks[0].hit?2.2:0;!t.pursuing&&t.z>=this.captainZ-9.7&&(t.pursuing=!0);let r=t.pursuing?Mh(this):null,a=t.pursuing?2.75:this.bossStride,o=e*a*(1-.38*t.brace+.78*t.special+i);if(Ud(this,e,r,o),t.kind==="kestrel"&&t.z>-11&&t.z<-7&&!t.glided&&!t.skill){t.glided=!0,t.vault={piece:{z:t.z+2},from:-2,to:2.1,t:0,airDash:!0};return}if(!t.pursuing||t.recovery>0||t.skill)return;let c=Mh(this);if(c.distance>3.38)return;let l=On(c.x,-5.32,5.32),h=c.z;Fd(this,l,h-.68)&&(t.leapFromX=t.x,t.leapFromZ=t.z,t.landX=l,t.landZ=h,t.attackT=.001,t.impactDone=!1)}landBoss(){this.event("victory",this.boss.x,.1,this.boss.z-1.35,1.05)}finish(e,t=null){if(this.playing){if(this.phase=e?"won":"lost",this.endTime=0,this.shots=[],this.incoming=[],e){let n=[...this.allies].sort((i,r)=>i.z-r.z);for(let i=0;i<n.length;i+=5){let r=n.slice(i,i+5).sort((a,o)=>a.x-o.x);r.forEach((a,o)=>{a.exitX=(o-(r.length-1)/2)*.58,a.exitZ=.98+Math.floor(i/5)*.64})}this.parade={complete:!1,originX:this.x},this.recoil=0,this.event("rally",this.x,.14,this.captainZ);return}if(this.event("loss",this.x,0,this.captainZ),this.lossReason==="infantry"){let n=t?.alive&&t.id?t:null;if(!n){let i=r=>{!r.alive||r.z>this.captainZ+.36||(!n||Math.hypot(r.x-this.x,r.z-this.captainZ)<Math.hypot(n.x-this.x,n.z-this.captainZ))&&(n=r)};for(let r of this.columns)for(let a of r.units)i(a);this.runners.forEach(i)}n||(n=this.grunt(this.x,this.entryZ-1),this.runners.push(n)),this.overrun={x:this.x,z:this.captainZ,crossed:!1,attacker:n.id,approach:Math.max(2.35,(this.captainZ-n.z+1.6)/4)};for(let i of this.allies){let r=this.fall(i,"blue",0);r.prone=!0,r.dir=i.x>=this.x?1:-1}this.allies=[]}else this.event("impact",this.x,0,this.captainZ,1.25)}}advanceOverrun(e){let t=this.overrun;this.worldAdvance=.36*e,this.distance+=this.worldAdvance,this.captainZ+=this.worldAdvance,t.z=this.captainZ,this.wall.z+=this.worldAdvance;for(let i of this.gates)i.z+=this.worldAdvance;for(let i of this.features)i.z+=this.worldAdvance;let n=i=>{if(!i.alive||i.z>10)return;let r=i.id===t.attacker,a=(r?Math.max((i.speed||Sh)*1.68,t.approach):(i.speed||Sh)*1.68)*e,o=0;if((r||i.z>t.z-7)&&i.z<t.z+.46){let l=i.id===t.attacker?0:(i.id%7-3)*.15,h=r?11:4.9;o=On(t.x+l-i.x,-h*e,h*e),i.x+=o}r&&Math.abs(i.x-t.x)>.43&&i.z<t.z+.48&&(a=Math.min(a,Math.max(0,t.z+.15-i.z)));let c=i.z;i.z+=a+this.worldAdvance,i.marched+=Math.hypot(o,a),i.yaw+=(Math.atan2(o,a)-i.yaw)*(1-Math.exp(-8*e)),c<t.z+1.05&&i.z>=t.z+1.05&&Math.abs(i.x-t.x)<1.15&&(t.crossed=!0)};for(let i of this.columns)for(let r of i.units)n(r);this.runners.forEach(n)}advanceParade(e){let t=this.parade;if(t.complete)return;let n=this.endTime,r=(7.4+Math.min(18,n*8.6))*wt(n,.12,.58)*e;this.x=t.originX*(1-wt(n,.16,1.65)),this.velocity=0,this.captainZ-=r;let a=this.captainZ;for(let o of this.allies)o.age+=e,o.x+=(this.x+o.exitX-o.x)*(1-Math.exp(-4.8*e)),o.z-=r,o.z+=(this.captainZ+o.exitZ-o.z)*(1-Math.exp(-4.2*e)),a=Math.max(a,o.z);t.complete=a<this.entryZ-2.8}get resultReady(){return this.parade?this.parade.complete:this.boss.defeated&&this.boss.defeatAge<2.05?!1:this.overrun?this.overrun.crossed&&this.endTime>=2.5:this.endTime>.86}tick(e,t=0,n=0){if(this.worldAdvance=0,!this.playing){(this.phase==="won"||this.phase==="lost")&&(this.endTime+=e,this.parade&&this.advanceParade(e),this.overrun&&this.advanceOverrun(e),this.phase==="lost"&&this.boss.defeated&&this.boss.defeatAge<2.05&&this.advanceBoss(e),this.boss.hit=Math.max(0,this.boss.hit-4*e),this.updateFalling(e));return}this.elapsed+=e,this.chill=Math.max(0,this.chill-e);for(let a of Object.keys(this.buffs))this.buffs[a]=Math.max(0,this.buffs[a]-e);for(let a of this.gates)a.flash=Math.max(0,a.flash-e*7);if(this.hitGuard=Math.max(0,this.hitGuard-e),this.hurt=Math.max(0,this.hurt-4*e),this.mergeGlow=Math.max(0,this.mergeGlow-2.25*e),this.recoil=Math.max(0,this.recoil-5.1*e),this.wall.flash=Math.max(0,this.wall.flash-4.6*e),this.boss.hit=Math.max(0,this.boss.hit-5.4*e),this.visualScale+=(this.scale-this.visualScale)*(1-Math.exp(-8*e)),this.caught&&this.caughtBy?.hp<=0&&(this.caught=!1,this.caughtBy=null),t||n){let a=t*(this.targetX-this.x)<0?this.x:this.targetX;this.aim(a+t*10.2*e,this.targetZ+n*3.1*e)}this.caught||(this.captainZ+=(this.targetZ-this.captainZ)*(1-Math.exp(-16*e)));let i=this.x;if(this.rope){let a=this.rope;a.age+=e,this.x=a.from+(a.to-a.from)*wt(a.age,0,.58),a.age>=.58&&(this.rope=null,this.aim(a.to))}else this.caught||(this.x+=(this.targetX-this.x)*(1-Math.exp(-26*e)));this.velocity=(this.x-i)/Math.max(e,.001);let r=this.boss.active?2.3:3.65;if(this.worldAdvance=r*e,this.distance+=this.worldAdvance,this.wall.z=this.distance-Vd,zd(this,e),!!this.playing){this.crossGates(),this.updateDeliveries(e);for(let a of this.allies){a.age+=e;let[o,c]=Eh(a.slot,this.scale),l=On(this.x+o,-6.28,6.28);a.x+=(l-a.x)*(1-Math.exp(-19*e)),a.z+=(this.captainZ+c-a.z)*(1-Math.exp(-14*e))}this.pushWall(e);for(let a of this.features)(a.kind==="cache"||a.kind==="cover"&&a.variant!=="glass")&&a.state==="ready"&&a.z>-4&&a.z<11&&this.pushWall(e,a,a.half);this.playing&&(this.advanceCrowd(e),this.advanceIncoming(e),this.updateFalling(e),this.playing&&(this.advanceBoss(e),this.playing&&(this.caught||this.shoot(e),this.advanceShots(e))))}}};var Bp=0,du=1,zp=2;var vo=1,kp=2,jr=3,ni=0,Nn=1,Ht=2,er=0,Qr=1,pu=2,mu=3,gu=4,Hp=5;var tr=100,Gp=101,Vp=102,Wp=103,Xp=104,qp=200,Yp=201,Zp=202,Kp=203,xu=204,vu=205,Jp=206,$p=207,jp=208,Qp=209,e0=210,t0=211,n0=212,i0=213,s0=214,Tl=0,Al=1,Rl=2,Lr=3,Cl=4,Il=5,Pl=6,Ll=7,_o=0,r0=1,a0=2,Ti=0,_u=1,yu=2,Mu=3,bu=4,Su=5,Eu=6,wu=7,jh="attached",o0="detached",Tu=300,nr=301,ea=302,nc=303,ic=304,bi=1e3,ei=1001,Nr=1002,$t=1003,sc=1004;var ir=1005;var jt=1006,ta=1007;var Hn=1008;var Gn=1009,Au=1010,Ru=1011,na=1012,rc=1013,di=1014,$n=1015,pi=1016,ac=1017,oc=1018,sr=1020,Cu=35902,Iu=35899,Pu=1021,Lu=1022,ii=1023,Xi=1026,is=1027,lc=1028,cc=1029,Es=1030,hc=1031;var uc=1033,yo=33776,Mo=33777,bo=33778,So=33779,fc=35840,dc=35841,pc=35842,mc=35843,gc=36196,xc=37492,vc=37496,_c=37488,yc=37489,Eo=37490,Mc=37491,bc=37808,Sc=37809,Ec=37810,wc=37811,Tc=37812,Ac=37813,Rc=37814,Cc=37815,Ic=37816,Pc=37817,Lc=37818,Nc=37819,Dc=37820,Uc=37821,Fc=36492,Oc=36494,Bc=36495,zc=36283,kc=36284,wo=36285,Hc=36286;var Vs=2300,Ws=2301,El=2302,Qh=2303,eu=2400,tu=2401,nu=2402,l0=2500;var Nu=0,To=1,ia=2,c0=3200;var sa=0,h0=1,ss="",vt="srgb",In="srgb-linear",Fa="linear",At="srgb";var wl=7680;var u0=519,f0=512,d0=513,p0=514,Du=515,m0=516,g0=517,Uu=518,Fu=519,Ou=35044,cn=35048;var Bu="300 es",ti=2e3,Dr=2001;function Hg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Gg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ur(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function x0(){let s=Ur("canvas");return s.style.display="block",s}var qd={},Fr=null;function Oa(...s){let e="THREE."+s.shift();Fr?Fr("log",e,...s):console.log(e,...s)}function v0(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function ke(...s){s=v0(s);let e="THREE."+s.shift();if(Fr)Fr("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function je(...s){s=v0(s);let e="THREE."+s.shift();if(Fr)Fr("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Gs(...s){let e=s.join(" ");e in qd||(qd[e]=!0,ke(...s))}function _0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var y0={[Tl]:Tl,[Rl]:Pl,[Cl]:Cl,[Lr]:Il,[Al]:Al,[Pl]:Rl,[Ll]:Ll,[Il]:Lr},Si=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yd=1234567,La=Math.PI/180,Xs=180/Math.PI;function mi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mn[s&255]+Mn[s>>8&255]+Mn[s>>16&255]+Mn[s>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]).toLowerCase()}function ot(s,e,t){return Math.max(e,Math.min(t,s))}function zu(s,e){return(s%e+e)%e}function Vg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Wg(s,e,t){return s!==e?(t-s)/(e-s):0}function Na(s,e,t){return(1-t)*s+t*e}function Xg(s,e,t,n){return Na(s,e,1-Math.exp(-t*n))}function qg(s,e=1){return e-Math.abs(zu(s,e*2)-e)}function Yg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Zg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Kg(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Jg(s,e){return s+Math.random()*(e-s)}function $g(s){return s*(.5-Math.random())}function jg(s){s!==void 0&&(Yd=s);let e=Yd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qg(s){return s*La}function ex(s){return s*Xs}function tx(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function nx(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ku(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ix(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),d=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*f,c*u,o*l);break;case"YZY":s.set(c*u,o*h,c*f,o*l);break;case"ZXZ":s.set(c*f,c*u,o*h,o*l);break;case"XZX":s.set(o*h,c*p,c*d,o*l);break;case"YXY":s.set(c*d,o*h,c*p,o*l);break;case"ZYZ":s.set(c*p,c*d,o*h,o*l);break;default:ke("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Gc(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Hu(s,e){if(e.constructor===Float32Array)return s;let t=Gc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function Gu(s,e){if(e.constructor===Float32Array)return s;let t=Gc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}var Be={DEG2RAD:La,RAD2DEG:Xs,generateUUID:mi,clamp:ot,euclideanModulo:zu,mapLinear:Vg,inverseLerp:Wg,lerp:Na,damp:Xg,pingpong:qg,smoothstep:Yg,smootherstep:Zg,randInt:Kg,randFloat:Jg,randFloatSpread:$g,seededRandom:jg,degToRad:Qg,radToDeg:ex,isPowerOfTwo:tx,ceilPowerOfTwo:nx,floorPowerOfTwo:ku,setQuaternionFromProperEuler:ix,normalize:Gu,denormalize:Hu},Zu=class Zu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Zu.prototype.isVector2=!0;var ce=Zu,on=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],d=r[a+1],p=r[a+2],x=r[a+3];if(f!==x||c!==u||l!==d||h!==p){let g=c*u+l*d+h*p+f*x;g<0&&(u=-u,d=-d,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){let v=Math.acos(g),M=Math.sin(v);m=Math.sin(m*v)/M,o=Math.sin(o*v)/M,c=c*m+u*o,l=l*m+d*o,h=h*m+p*o,f=f*m+x*o}else{c=c*m+u*o,l=l*m+d*o,h=h*m+p*o,f=f*m+x*o;let v=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=v,l*=v,h*=v,f*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return e[t]=o*p+h*f+c*d-l*u,e[t+1]=c*p+h*u+l*f-o*d,e[t+2]=l*p+h*d+o*u-c*f,e[t+3]=h*p-o*f-c*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),f=o(r/2),u=c(n/2),d=c(i/2),p=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"YZX":this._x=u*h*f+l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f-u*d*p;break;case"XZY":this._x=u*h*f-l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f+u*d*p;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-i)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+l)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ku=class Ku{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=i+c*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wh.copy(this).projectOnVector(e),this.sub(wh)}reflect(e){return this.sub(wh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ku.prototype.isVector3=!0;var N=Ku,wh=new N,Zd=new on,Ju=class Ju{constructor(e,t,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],x=i[0],g=i[3],m=i[6],v=i[1],M=i[4],_=i[7],E=i[2],S=i[5],y=i[8];return r[0]=a*x+o*v+c*E,r[3]=a*g+o*M+c*S,r[6]=a*m+o*_+c*y,r[1]=l*x+h*v+f*E,r[4]=l*g+h*M+f*S,r[7]=l*m+h*_+f*y,r[2]=u*x+d*v+p*E,r[5]=u*g+d*M+p*S,r[8]=u*m+d*_+p*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*r,d=l*r-a*c,p=t*f+n*u+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=f*x,e[1]=(i*l-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=u*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-o*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Gs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Th.makeScale(e,t)),this}rotate(e){return Gs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Th.makeRotation(-e)),this}translate(e,t){return Gs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Th.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ju.prototype.isMatrix3=!0;var Qe=Ju,Th=new Qe,Kd=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jd=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sx(){let s={enabled:!0,workingColorSpace:In,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===At&&(i.r=Wi(i.r),i.g=Wi(i.g),i.b=Wi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(i.r=Pr(i.r),i.g=Pr(i.g),i.b=Pr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ss?Fa:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[In]:{primaries:e,whitePoint:n,transfer:Fa,toXYZ:Kd,fromXYZ:Jd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:vt},outputColorSpaceConfig:{drawingBufferColorSpace:vt}},[vt]:{primaries:e,whitePoint:n,transfer:At,toXYZ:Kd,fromXYZ:Jd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:vt}}}),s}var ht=sx();function Wi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Pr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var xr,Nl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xr===void 0&&(xr=Ur("canvas")),xr.width=e.width,xr.height=e.height;let i=xr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=xr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ur("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Wi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wi(t[n]/255)*255):t[n]=Wi(t[n]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},rx=0,Or=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=mi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ah(i[a].image)):r.push(Ah(i[a]))}else r=Ah(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ah(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Nl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}var ax=0,Rh=new N,ln=class s extends Si{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=ei,i=ei,r=jt,a=Hn,o=ii,c=Gn,l=s.DEFAULT_ANISOTROPY,h=ss){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ax++}),this.uuid=mi(),this.name="",this.source=new Or(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Rh).x}get height(){return this.source.getSize(Rh).y}get depth(){return this.source.getSize(Rh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bi:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case Nr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bi:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case Nr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=Tu;ln.DEFAULT_ANISOTROPY=1;var $u=class $u{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,_=(d+1)/2,E=(m+1)/2,S=(h+u)/4,y=(f+x)/4,b=(p+g)/4;return M>_&&M>E?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=S/n,r=y/n):_>E?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=S/i,r=b/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=y/r,i=b/r),this.set(n,i,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(f-x)/v,this.z=(u-h)/v,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$u.prototype.isVector4=!0;var ut=$u,Dl=class extends Si{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new ln({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Or(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yn=class extends Dl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ba=class extends ln{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$t,this.minFilter=$t,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ul=class extends ln{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$t,this.minFilter=$t,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var tc=class tc{constructor(e,t,n,i,r,a,o,c,l,h,f,u,d,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,f,u,d,p,x,g)}set(e,t,n,i,r,a,o,c,l,h,f,u,d,p,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/vr.setFromMatrixColumn(e,0).length(),r=1/vr.setFromMatrixColumn(e,1).length(),a=1/vr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*h,d=a*f,p=o*h,x=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=d+p*l,t[5]=u-x*l,t[9]=-o*c,t[2]=x-u*l,t[6]=p+d*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,d=c*f,p=l*h,x=l*f;t[0]=u+x*o,t[4]=p*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-p,t[6]=x+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,d=c*f,p=l*h,x=l*f;t[0]=u-x*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,d=a*f,p=o*h,x=o*f;t[0]=c*h,t[4]=p*l-d,t[8]=u*l+x,t[1]=c*f,t[5]=x*l+u,t[9]=d*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,d=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=x-u*f,t[8]=p*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*f+p,t[10]=u-x*f}else if(e.order==="XZY"){let u=a*c,d=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+x,t[5]=a*h,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*h,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ox,e,lx)}lookAt(e,t,n){let i=this.elements;return Xn.subVectors(e,t),Xn.lengthSq()===0&&(Xn.z=1),Xn.normalize(),fs.crossVectors(n,Xn),fs.lengthSq()===0&&(Math.abs(n.z)===1?Xn.x+=1e-4:Xn.z+=1e-4,Xn.normalize(),fs.crossVectors(n,Xn)),fs.normalize(),$o.crossVectors(Xn,fs),i[0]=fs.x,i[4]=$o.x,i[8]=Xn.x,i[1]=fs.y,i[5]=$o.y,i[9]=Xn.y,i[2]=fs.z,i[6]=$o.z,i[10]=Xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],x=n[6],g=n[10],m=n[14],v=n[3],M=n[7],_=n[11],E=n[15],S=i[0],y=i[4],b=i[8],A=i[12],R=i[1],D=i[5],k=i[9],X=i[13],U=i[2],G=i[6],V=i[10],P=i[14],Y=i[3],L=i[7],J=i[11],I=i[15];return r[0]=a*S+o*R+c*U+l*Y,r[4]=a*y+o*D+c*G+l*L,r[8]=a*b+o*k+c*V+l*J,r[12]=a*A+o*X+c*P+l*I,r[1]=h*S+f*R+u*U+d*Y,r[5]=h*y+f*D+u*G+d*L,r[9]=h*b+f*k+u*V+d*J,r[13]=h*A+f*X+u*P+d*I,r[2]=p*S+x*R+g*U+m*Y,r[6]=p*y+x*D+g*G+m*L,r[10]=p*b+x*k+g*V+m*J,r[14]=p*A+x*X+g*P+m*I,r[3]=v*S+M*R+_*U+E*Y,r[7]=v*y+M*D+_*G+E*L,r[11]=v*b+M*k+_*V+E*J,r[15]=v*A+M*X+_*P+E*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],p=e[3],x=e[7],g=e[11],m=e[15],v=c*d-l*u,M=o*d-l*f,_=o*u-c*f,E=a*d-l*h,S=a*u-c*h,y=a*f-o*h;return t*(x*v-g*M+m*_)-n*(p*v-g*E+m*S)+i*(p*M-x*E+m*y)-r*(p*_-x*S+g*y)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+i*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],p=e[12],x=e[13],g=e[14],m=e[15],v=t*o-n*a,M=t*c-i*a,_=t*l-r*a,E=n*c-i*o,S=n*l-r*o,y=i*l-r*c,b=h*x-f*p,A=h*g-u*p,R=h*m-d*p,D=f*g-u*x,k=f*m-d*x,X=u*m-d*g,U=v*X-M*k+_*D+E*R-S*A+y*b;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/U;return e[0]=(o*X-c*k+l*D)*G,e[1]=(i*k-n*X-r*D)*G,e[2]=(x*y-g*S+m*E)*G,e[3]=(u*S-f*y-d*E)*G,e[4]=(c*R-a*X-l*A)*G,e[5]=(t*X-i*R+r*A)*G,e[6]=(g*_-p*y-m*M)*G,e[7]=(h*y-u*_+d*M)*G,e[8]=(a*k-o*R+l*b)*G,e[9]=(n*R-t*k-r*b)*G,e[10]=(p*S-x*_+m*v)*G,e[11]=(f*_-h*S-d*v)*G,e[12]=(o*A-a*D-c*b)*G,e[13]=(t*D-n*A+i*b)*G,e[14]=(x*M-p*E-g*v)*G,e[15]=(h*E-f*M+u*v)*G,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,f=o+o,u=r*l,d=r*h,p=r*f,x=a*h,g=a*f,m=o*f,v=c*l,M=c*h,_=c*f,E=n.x,S=n.y,y=n.z;return i[0]=(1-(x+m))*E,i[1]=(d+_)*E,i[2]=(p-M)*E,i[3]=0,i[4]=(d-_)*S,i[5]=(1-(u+m))*S,i[6]=(g+v)*S,i[7]=0,i[8]=(p+M)*y,i[9]=(g-v)*y,i[10]=(1-(u+x))*y,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=vr.set(i[0],i[1],i[2]).length(),o=vr.set(i[4],i[5],i[6]).length(),c=vr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),li.copy(this);let l=1/a,h=1/o,f=1/c;return li.elements[0]*=l,li.elements[1]*=l,li.elements[2]*=l,li.elements[4]*=h,li.elements[5]*=h,li.elements[6]*=h,li.elements[8]*=f,li.elements[9]*=f,li.elements[10]*=f,t.setFromRotationMatrix(li),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,r,a,o=ti,c=!1){let l=this.elements,h=2*r/(t-e),f=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===ti)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Dr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=ti,c=!1){let l=this.elements,h=2/(t-e),f=2/(n-i),u=-(t+e)/(t-e),d=-(n+i)/(n-i),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===ti)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Dr)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};tc.prototype.isMatrix4=!0;var Ge=tc,vr=new N,li=new Ge,ox=new N(0,0,0),lx=new N(1,1,1),fs=new N,$o=new N,Xn=new N,$d=new Ge,jd=new on,Vt=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ot(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $d.makeRotationFromQuaternion(e),this.setFromRotationMatrix($d,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jd.setFromEuler(this),this.setFromQuaternion(jd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vt.DEFAULT_ORDER="XYZ";var za=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},cx=0,Qd=new N,_r=new on,Bi=new Ge,jo=new N,ba=new N,hx=new N,ux=new on,ep=new N(1,0,0),tp=new N(0,1,0),np=new N(0,0,1),ip={type:"added"},fx={type:"removed"},yr={type:"childadded",child:null},Ch={type:"childremoved",child:null},Rt=class s extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cx++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new N,t=new Vt,n=new on,i=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ge},normalMatrix:{value:new Qe}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new za,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _r.setFromAxisAngle(e,t),this.quaternion.multiply(_r),this}rotateOnWorldAxis(e,t){return _r.setFromAxisAngle(e,t),this.quaternion.premultiply(_r),this}rotateX(e){return this.rotateOnAxis(ep,e)}rotateY(e){return this.rotateOnAxis(tp,e)}rotateZ(e){return this.rotateOnAxis(np,e)}translateOnAxis(e,t){return Qd.copy(e).applyQuaternion(this.quaternion),this.position.add(Qd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ep,e)}translateY(e){return this.translateOnAxis(tp,e)}translateZ(e){return this.translateOnAxis(np,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jo.copy(e):jo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ba.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(ba,jo,this.up):Bi.lookAt(jo,ba,this.up),this.quaternion.setFromRotationMatrix(Bi),i&&(Bi.extractRotation(i.matrixWorld),_r.setFromRotationMatrix(Bi),this.quaternion.premultiply(_r.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ip),yr.child=e,this.dispatchEvent(yr),yr.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(fx),Ch.child=e,this.dispatchEvent(Ch),Ch.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ip),yr.child=e,this.dispatchEvent(yr),yr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ba,e,hx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ba,ux,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Rt.DEFAULT_UP=new N(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var It=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},dx={type:"move"},Br=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new It,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new It,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new It,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&u>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(dx)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new It;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},M0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ds={h:0,s:0,l:0},Qo={h:0,s:0,l:0};function Ih(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var we=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ht.workingColorSpace){if(e=zu(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ih(a,r,e+1/3),this.g=Ih(a,r,e),this.b=Ih(a,r,e-1/3)}return ht.colorSpaceToWorking(this,i),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){let n=M0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=Pr(e.r),this.g=Pr(e.g),this.b=Pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return ht.workingToColorSpace(bn.copy(this),e),Math.round(ot(bn.r*255,0,255))*65536+Math.round(ot(bn.g*255,0,255))*256+Math.round(ot(bn.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(bn.copy(this),t);let n=bn.r,i=bn.g,r=bn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(i-r)/f+(i<r?6:0);break;case i:c=(r-n)/f+2;break;case r:c=(n-i)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(bn.copy(this),t),e.r=bn.r,e.g=bn.g,e.b=bn.b,e}getStyle(e=vt){ht.workingToColorSpace(bn.copy(this),e);let t=bn.r,n=bn.g,i=bn.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ds),this.setHSL(ds.h+e,ds.s+t,ds.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ds),e.getHSL(Qo);let n=Na(ds.h,Qo.h,t),i=Na(ds.s,Qo.s,t),r=Na(ds.l,Qo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bn=new we;we.NAMES=M0;var ka=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vt,this.environmentIntensity=1,this.environmentRotation=new Vt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ci=new N,zi=new N,Ph=new N,ki=new N,Mr=new N,br=new N,sp=new N,Lh=new N,Nh=new N,Dh=new N,Uh=new ut,Fh=new ut,Oh=new ut,vs=class s{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ci.subVectors(e,t),i.cross(ci);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){ci.subVectors(i,t),zi.subVectors(n,t),Ph.subVectors(e,t);let a=ci.dot(ci),o=ci.dot(zi),c=ci.dot(Ph),l=zi.dot(zi),h=zi.dot(Ph),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(l*c-o*h)*u,p=(a*h-o*c)*u;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,ki)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ki.x),c.addScaledVector(a,ki.y),c.addScaledVector(o,ki.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return Uh.setScalar(0),Fh.setScalar(0),Oh.setScalar(0),Uh.fromBufferAttribute(e,t),Fh.fromBufferAttribute(e,n),Oh.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Uh,r.x),a.addScaledVector(Fh,r.y),a.addScaledVector(Oh,r.z),a}static isFrontFacing(e,t,n,i){return ci.subVectors(n,t),zi.subVectors(e,t),ci.cross(zi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),ci.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Mr.subVectors(i,n),br.subVectors(r,n),Lh.subVectors(e,n);let c=Mr.dot(Lh),l=br.dot(Lh);if(c<=0&&l<=0)return t.copy(n);Nh.subVectors(e,i);let h=Mr.dot(Nh),f=br.dot(Nh);if(h>=0&&f<=h)return t.copy(i);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),t.copy(n).addScaledVector(Mr,a);Dh.subVectors(e,r);let d=Mr.dot(Dh),p=br.dot(Dh);if(p>=0&&d<=p)return t.copy(r);let x=d*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(br,o);let g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return sp.subVectors(r,i),o=(f-h)/(f-h+(d-p)),t.copy(i).addScaledVector(sp,o);let m=1/(g+x+u);return a=x*m,o=u*m,t.copy(n).addScaledVector(Mr,a).addScaledVector(br,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,hi):hi.fromBufferAttribute(r,a),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),el.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),el.copy(n.boundingBox)),el.applyMatrix4(e.matrixWorld),this.union(el)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sa),tl.subVectors(this.max,Sa),Sr.subVectors(e.a,Sa),Er.subVectors(e.b,Sa),wr.subVectors(e.c,Sa),ps.subVectors(Er,Sr),ms.subVectors(wr,Er),Os.subVectors(Sr,wr);let t=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-Os.z,Os.y,ps.z,0,-ps.x,ms.z,0,-ms.x,Os.z,0,-Os.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-Os.y,Os.x,0];return!Bh(t,Sr,Er,wr,tl)||(t=[1,0,0,0,1,0,0,0,1],!Bh(t,Sr,Er,wr,tl))?!1:(nl.crossVectors(ps,ms),t=[nl.x,nl.y,nl.z],Bh(t,Sr,Er,wr,tl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Hi=[new N,new N,new N,new N,new N,new N,new N,new N],hi=new N,el=new Zn,Sr=new N,Er=new N,wr=new N,ps=new N,ms=new N,Os=new N,Sa=new N,tl=new N,nl=new N,Bs=new N;function Bh(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Bs.fromArray(s,r);let o=i.x*Math.abs(Bs.x)+i.y*Math.abs(Bs.y)+i.z*Math.abs(Bs.z),c=e.dot(Bs),l=t.dot(Bs),h=n.dot(Bs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var nn=new N,il=new ce,px=0,kt=class extends Si{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:px++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ou,this.updateRanges=[],this.gpuType=$n,this.version=0,this._normalizationScale=e!==void 0?Gc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)il.fromBufferAttribute(this,t),il.applyMatrix3(e),this.setXY(t,il.x,il.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix3(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Hu(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Gu(e,this.array)}};var Ha=class extends kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ga=class extends kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var We=class extends kt{constructor(e,t,n){super(new Float32Array(e),t,n)}},mx=new Zn,Ea=new N,zh=new N,Bn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):mx.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ea.subVectors(e,this.center);let t=Ea.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ea,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ea.copy(e.center).add(zh)),this.expandByPoint(Ea.copy(e.center).sub(zh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},gx=0,Qn=new Ge,kh=new Rt,Tr=new N,qn=new Zn,wa=new Zn,mn=new N,_t=class s extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gx++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hg(e)?Ga:Ha)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Qn.makeRotationFromQuaternion(e),this.applyMatrix4(Qn),this}rotateX(e){return Qn.makeRotationX(e),this.applyMatrix4(Qn),this}rotateY(e){return Qn.makeRotationY(e),this.applyMatrix4(Qn),this}rotateZ(e){return Qn.makeRotationZ(e),this.applyMatrix4(Qn),this}translate(e,t,n){return Qn.makeTranslation(e,t,n),this.applyMatrix4(Qn),this}scale(e,t,n){return Qn.makeScale(e,t,n),this.applyMatrix4(Qn),this}lookAt(e){return kh.lookAt(e),kh.updateMatrix(),this.applyMatrix4(kh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tr).negate(),this.translate(Tr.x,Tr.y,Tr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new We(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];qn.setFromBufferAttribute(r),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,qn.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,qn.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(qn.min),this.boundingBox.expandByPoint(qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(qn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];wa.setFromBufferAttribute(o),this.morphTargetsRelative?(mn.addVectors(qn.min,wa.min),qn.expandByPoint(mn),mn.addVectors(qn.max,wa.max),qn.expandByPoint(mn)):(qn.expandByPoint(wa.min),qn.expandByPoint(wa.max))}qn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)mn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(mn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)mn.fromBufferAttribute(o,l),c&&(Tr.fromBufferAttribute(e,l),mn.add(Tr)),i=Math.max(i,n.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new kt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let A=0;A<n.count;A++)o[A]=new N,c[A]=new N;let h=new N,f=new N,u=new N,d=new ce,p=new ce,x=new ce,g=new N,m=new N;function v(A,R,D){l[A]=l[R]=l[D]=1,h.fromBufferAttribute(n,A),f.fromBufferAttribute(n,R),u.fromBufferAttribute(n,D),d.fromBufferAttribute(r,A),p.fromBufferAttribute(r,R),x.fromBufferAttribute(r,D),f.sub(h),u.sub(h),p.sub(d),x.sub(d);let k=1/(p.x*x.y-x.x*p.y);isFinite(k)&&(g.copy(f).multiplyScalar(x.y).addScaledVector(u,-p.y).multiplyScalar(k),m.copy(u).multiplyScalar(p.x).addScaledVector(f,-x.x).multiplyScalar(k),o[A].add(g),o[R].add(g),o[D].add(g),c[A].add(m),c[R].add(m),c[D].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let A=0,R=M.length;A<R;++A){let D=M[A],k=D.start,X=D.count;for(let U=k,G=k+X;U<G;U+=3)v(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let _=new N,E=new N,S=new N,y=new N;function b(A){S.fromBufferAttribute(i,A),y.copy(S);let R=o[A];_.copy(R),_.sub(S.multiplyScalar(S.dot(R))).normalize(),E.crossVectors(y,R);let k=E.dot(c[A])<0?-1:1;a.setXYZW(A,_.x,_.y,_.z,k)}for(let A=0,R=n.count;A<R;++A)l[A]&&b(A);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,f=new N;if(e)for(let u=0,d=e.count;u<d;u+=3){let p=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mn.fromBufferAttribute(e,t),mn.normalize(),e.setXYZ(t,mn.x,mn.y,mn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h),d=0,p=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?d=c[x]*o.data.stride+o.offset:d=c[x]*h;for(let m=0;m<h;m++)u[p++]=l[d++]}return new kt(u,h,f)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let u=l[h],d=e(u,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ou,this.updateRanges=[],this.version=0,this.uuid=mi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=rp(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=rp(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function rp(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=mi()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}var Cn=new N,kr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?Gc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyMatrix4(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyNormalMatrix(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.transformDirection(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Oa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Oa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Hu(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Gu(e,this.data.array)}},Hh=new N,xx=new N,vx=new Qe,ui=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Hh.subVectors(n,t).cross(xx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Hh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||vx.getNormalMatrix(e),i=this.coplanarPoint(Hh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},_x=0,Sn=class extends Si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_x++}),this.uuid=mi(),this.name="",this.type="Material",this.blending=Qr,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xu,this.blendDst=vu,this.blendEquation=tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=u0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wl,this.stencilZFail=wl,this.stencilZPass=wl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new we().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ui().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ce().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ce().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Gi=new N,Gh=new N,sl=new N,rl=new N,qs=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gi.copy(this.origin).addScaledVector(this.direction,t),Gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Gh.copy(e).add(t).multiplyScalar(.5),sl.copy(t).sub(e).normalize(),rl.copy(this.origin).sub(Gh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(sl),o=rl.dot(this.direction),c=-rl.dot(sl),l=rl.lengthSq(),h=Math.abs(1-a*a),f,u,d,p;if(h>0)if(f=a*c-o,u=a*o-c,p=r*h,f>=0)if(u>=-p)if(u<=p){let x=1/h;f*=x,u*=x,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Gh).addScaledVector(sl,u),d}intersectSphere(e,t){if(e.radius<0)return null;Gi.subVectors(e.center,this.origin);let n=Gi.dot(this.direction),i=Gi.dot(Gi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Gi)!==null}intersectTriangle(e,t,n,i,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,d=e.z-a.z,p=t.x-a.x,x=t.y-a.y,g=t.z-a.z,m=n.x-a.x,v=n.y-a.y,M=n.z-a.z,_=Math.abs(c),E=Math.abs(l),S=Math.abs(h),y,b,A,R,D,k,X,U,G,V,P,Y;if(_>=E&&_>=S?(A=c,k=f,G=p,Y=m,c>=0?(y=l,b=h,R=u,D=d,X=x,U=g,V=v,P=M):(y=h,b=l,R=d,D=u,X=g,U=x,V=M,P=v)):E>=S?(A=l,k=u,G=x,Y=v,l>=0?(y=h,b=c,R=d,D=f,X=g,U=p,V=M,P=m):(y=c,b=h,R=f,D=d,X=p,U=g,V=m,P=M)):(A=h,k=d,G=g,Y=M,h>=0?(y=c,b=l,R=f,D=u,X=p,U=x,V=m,P=v):(y=l,b=c,R=u,D=f,X=x,U=p,V=v,P=m)),A===0)return null;let L=y/A,J=b/A,I=1/A,te=R-L*k,W=D-J*k,F=X-L*G,ee=U-J*G,re=V-L*Y,Ne=P-J*Y,ye=re*ee-Ne*F,Ce=te*Ne-W*re,ct=F*W-ee*te;if(i){if(ye<0||Ce<0||ct<0)return null}else if((ye<0||Ce<0||ct<0)&&(ye>0||Ce>0||ct>0))return null;let De=ye+Ce+ct;if(De===0)return null;let Je=I*(ye*k+Ce*G+ct*Y);return(De>0?Je<0:Je>0)?null:this.at(Je/De,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},yt=class extends Sn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=_o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ap=new Ge,zs=new qs,al=new Bn,op=new N,ol=new N,ll=new N,cl=new N,Vh=new N,hl=new N,lp=new N,ul=new N,Ke=class extends Rt{constructor(e=new _t,t=new yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){hl.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(Vh.fromBufferAttribute(f,e),a?hl.addScaledVector(Vh,h):hl.addScaledVector(Vh.sub(t),h))}t.add(hl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),al.copy(n.boundingSphere),al.applyMatrix4(r),zs.copy(e.ray).recast(e.near),!(al.containsPoint(zs.origin)===!1&&(zs.intersectSphere(al,op)===null||zs.origin.distanceToSquared(op)>(e.far-e.near)**2))&&(ap.copy(r).invert(),zs.copy(e.ray).applyMatrix4(ap),!(n.boundingBox!==null&&zs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zs)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){let g=u[p],m=a[g.materialIndex],v=Math.max(g.start,d.start),M=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let _=v,E=M;_<E;_+=3){let S=o.getX(_),y=o.getX(_+1),b=o.getX(_+2);i=fl(this,m,e,n,l,h,f,S,y,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){let v=o.getX(g),M=o.getX(g+1),_=o.getX(g+2);i=fl(this,a,e,n,l,h,f,v,M,_),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=u.length;p<x;p++){let g=u[p],m=a[g.materialIndex],v=Math.max(g.start,d.start),M=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let _=v,E=M;_<E;_+=3){let S=_,y=_+1,b=_+2;i=fl(this,m,e,n,l,h,f,S,y,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){let v=g,M=g+1,_=g+2;i=fl(this,a,e,n,l,h,f,v,M,_),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function yx(s,e,t,n,i,r,a,o){let c;if(e.side===Nn?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===ni,o),c===null)return null;ul.copy(o),ul.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(ul);return l<t.near||l>t.far?null:{distance:l,point:ul.clone(),object:s}}function fl(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,ol),s.getVertexPosition(c,ll),s.getVertexPosition(l,cl);let h=yx(s,e,t,n,ol,ll,cl,lp);if(h){let f=new N;vs.getBarycoord(lp,ol,ll,cl,f),i&&(h.uv=vs.getInterpolatedAttribute(i,o,c,l,f,new ce)),r&&(h.uv1=vs.getInterpolatedAttribute(r,o,c,l,f,new ce)),a&&(h.normal=vs.getInterpolatedAttribute(a,o,c,l,f,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new N,materialIndex:0};vs.getNormal(ol,ll,cl,u.normal),h.face=u,h.barycoord=f}return h}var Ta=new ut,cp=new ut,hp=new ut,Mx=new ut,up=new Ge,dl=new N,Wh=new Bn,fp=new Ge,Xh=new qs,Va=class extends Ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jh,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Zn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,dl),this.boundingBox.expandByPoint(dl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,dl),this.boundingSphere.expandByPoint(dl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wh.copy(this.boundingSphere),Wh.applyMatrix4(i),e.ray.intersectsSphere(Wh)!==!1&&(fp.copy(i).invert(),Xh.copy(e.ray).applyMatrix4(fp),!(this.boundingBox!==null&&Xh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Xh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ut,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===o0?this.bindMatrixInverse.copy(this.bindMatrix).invert():ke("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;cp.fromBufferAttribute(i.attributes.skinIndex,e),hp.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ta.copy(t),t.set(0,0,0,0)):(Ta.set(t.x,t.y,t.z,1),t.set(0,0,0)),Ta.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=hp.getComponent(r);if(a!==0){let o=cp.getComponent(r);up.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Mx.copy(Ta).applyMatrix4(up),a)}}return t.isVector4&&(t.w=Ta.w),t.applyMatrix4(this.bindMatrixInverse)}},Hr=class extends Rt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Gr=class extends ln{constructor(e=null,t=1,n=1,i,r,a,o,c,l=$t,h=$t,f,u){super(null,a,o,c,l,h,i,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},dp=new Ge,bx=new Ge,Wa=class s{constructor(e=[],t=[]){this.uuid=mi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ke("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:bx;dp.multiplyMatrices(o,t[r]),dp.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Gr(t,e,e,ii,$n);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(ke("Skeleton: No bone found with UUID:",r),a=new Hr),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Jt=class extends kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ar=new Ge,pp=new Ge,pl=[],mp=new Zn,Sx=new Ge,Aa=new Ke,Ra=new Bn,Yt=class extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jt(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Sx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ar),mp.copy(e.boundingBox).applyMatrix4(Ar),this.boundingBox.union(mp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ar),Ra.copy(e.boundingSphere).applyMatrix4(Ar),this.boundingSphere.union(Ra)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Aa.geometry=this.geometry,Aa.material=this.material,Aa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ra.copy(this.boundingSphere),Ra.applyMatrix4(n),e.ray.intersectsSphere(Ra)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ar),pp.multiplyMatrices(n,Ar),Aa.matrixWorld=pp,Aa.raycast(e,pl);for(let a=0,o=pl.length;a<o;a++){let c=pl[a];c.instanceId=r,c.object=this,t.push(c)}pl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Jt(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gr(new Float32Array(i*this.count),i,this.count,lc,$n));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ks=new Bn,Ex=new ce(.5,.5),ml=new N,_s=class{constructor(e=new ui,t=new ui,n=new ui,i=new ui,r=new ui,a=new ui){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ti,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],x=r[9],g=r[10],m=r[11],v=r[12],M=r[13],_=r[14],E=r[15];if(i[0].setComponents(l-a,d-h,m-p,E-v).normalize(),i[1].setComponents(l+a,d+h,m+p,E+v).normalize(),i[2].setComponents(l+o,d+f,m+x,E+M).normalize(),i[3].setComponents(l-o,d-f,m-x,E-M).normalize(),n)i[4].setComponents(c,u,g,_).normalize(),i[5].setComponents(l-c,d-u,m-g,E-_).normalize();else if(i[4].setComponents(l-c,d-u,m-g,E-_).normalize(),t===ti)i[5].setComponents(l+c,d+u,m+g,E+_).normalize();else if(t===Dr)i[5].setComponents(c,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ks.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ks)}intersectsSprite(e){ks.center.set(0,0,0);let t=Ex.distanceTo(e.center);return ks.radius=.7071067811865476+t,ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(ks)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ml.x=i.normal.x>0?e.max.x:e.min.x,ml.y=i.normal.y>0?e.max.y:e.min.y,ml.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ml)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},gp=new Ge,Fl=class s{constructor(){this.coordinateSystem=ti,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];gp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new _s),n[i].setFromProjectionMatrix(gp,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new _s),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};var Vr=class extends Sn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ol=new N,Bl=new N,xp=new Ge,Ca=new qs,gl=new Bn,qh=new N,vp=new N,Ys=class extends Rt{constructor(e=new _t,t=new Vr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Ol.fromBufferAttribute(t,i-1),Bl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ol.distanceTo(Bl);e.setAttribute("lineDistance",new We(n,1))}else ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gl.copy(n.boundingSphere),gl.applyMatrix4(i),gl.radius+=r,e.ray.intersectsSphere(gl)===!1)return;xp.copy(i).invert(),Ca.copy(e.ray).applyMatrix4(xp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=l){let m=h.getX(x),v=h.getX(x+1),M=xl(this,e,Ca,c,m,v,x);M&&t.push(M)}if(this.isLineLoop){let x=h.getX(p-1),g=h.getX(d),m=xl(this,e,Ca,c,x,g,p-1);m&&t.push(m)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=l){let m=xl(this,e,Ca,c,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=xl(this,e,Ca,c,p-1,d,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function xl(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(Ol.fromBufferAttribute(o,i),Bl.fromBufferAttribute(o,r),t.distanceSqToSegment(Ol,Bl,qh,vp)>n)return;qh.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(qh);if(!(l<e.near||l>e.far))return{distance:l,point:vp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var _p=new N,yp=new N,Xa=class extends Ys{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)_p.fromBufferAttribute(t,i),yp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+_p.distanceTo(yp);e.setAttribute("lineDistance",new We(n,1))}else ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},qa=class extends Ys{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Wr=class extends Sn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Mp=new Ge,iu=new qs,vl=new Bn,_l=new N,Ya=class extends Rt{constructor(e=new _t,t=new Wr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vl.copy(n.boundingSphere),vl.applyMatrix4(i),vl.radius+=r,e.ray.intersectsSphere(vl)===!1)return;Mp.copy(i).invert(),iu.copy(e.ray).applyMatrix4(Mp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let p=u,x=d;p<x;p++){let g=l.getX(p);_l.fromBufferAttribute(f,g),bp(_l,g,c,i,e,t,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=u,x=d;p<x;p++)_l.fromBufferAttribute(f,p),bp(_l,p,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function bp(s,e,t,n,i,r,a){let o=iu.distanceSqToPoint(s);if(o<t){let c=new N;iu.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Za=class extends ln{constructor(e=[],t=nr,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},zn=class extends ln{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qi=class extends ln{constructor(e,t,n=di,i,r,a,o=$t,c=$t,l,h=Xi,f=1){if(h!==Xi&&h!==is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Or(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ka=class extends qi{constructor(e,t=di,n=nr,i,r,a=$t,o=$t,c,l=Xi){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ja=class extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Pn=class s extends _t{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(f,2));function p(x,g,m,v,M,_,E,S,y,b,A){let R=_/y,D=E/b,k=_/2,X=E/2,U=S/2,G=y+1,V=b+1,P=0,Y=0,L=new N;for(let J=0;J<V;J++){let I=J*D-X;for(let te=0;te<G;te++){let W=te*R-k;L[x]=W*v,L[g]=I*M,L[m]=U,l.push(L.x,L.y,L.z),L[x]=0,L[g]=0,L[m]=S>0?1:-1,h.push(L.x,L.y,L.z),f.push(te/y),f.push(1-J/b),P+=1}}for(let J=0;J<b;J++)for(let I=0;I<y;I++){let te=u+I+G*J,W=u+I+G*(J+1),F=u+(I+1)+G*(J+1),ee=u+(I+1)+G*J;c.push(te,W,ee),c.push(W,F,ee),Y+=6}o.addGroup(d,Y,A),d+=Y,u+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var $a=class s extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new N,h=new ce;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){let d=n+f/t*i;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new We(a,3)),this.setAttribute("normal",new We(o,3)),this.setAttribute("uv",new We(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Qt=class s extends _t{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,x=[],g=n/2,m=0;v(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new We(f,3)),this.setAttribute("normal",new We(u,3)),this.setAttribute("uv",new We(d,2));function v(){let _=new N,E=new N,S=0,y=(t-e)/n;for(let b=0;b<=r;b++){let A=[],R=b/r,D=R*(t-e)+e;for(let k=0;k<=i;k++){let X=k/i,U=X*c+o,G=Math.sin(U),V=Math.cos(U);E.x=D*G,E.y=-R*n+g,E.z=D*V,f.push(E.x,E.y,E.z),_.set(G,y,V).normalize(),u.push(_.x,_.y,_.z),d.push(X,1-R),A.push(p++)}x.push(A)}for(let b=0;b<i;b++)for(let A=0;A<r;A++){let R=x[A][b],D=x[A+1][b],k=x[A+1][b+1],X=x[A][b+1];(e>0||A!==0)&&(h.push(R,D,X),S+=3),(t>0||A!==r-1)&&(h.push(D,k,X),S+=3)}l.addGroup(m,S,0),m+=S}function M(_){let E=p,S=new ce,y=new N,b=0,A=_===!0?e:t,R=_===!0?1:-1;for(let k=1;k<=i;k++)f.push(0,g*R,0),u.push(0,R,0),d.push(.5,.5),p++;let D=p;for(let k=0;k<=i;k++){let U=k/i*c+o,G=Math.cos(U),V=Math.sin(U);y.x=A*V,y.y=g*R,y.z=A*G,f.push(y.x,y.y,y.z),u.push(0,R,0),S.x=G*.5+.5,S.y=V*.5*R+.5,d.push(S.x,S.y),p++}for(let k=0;k<i;k++){let X=E+k,U=D+k;_===!0?h.push(U,U+1,X):h.push(U+1,U,X),b+=3}l.addGroup(m,b,_===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Yi=class s extends Qt{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Xr=class s extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),l(n),h(),this.setAttribute("position",new We(r,3)),this.setAttribute("normal",new We(r.slice(),3)),this.setAttribute("uv",new We(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let M=new N,_=new N,E=new N;for(let S=0;S<t.length;S+=3)d(t[S+0],M),d(t[S+1],_),d(t[S+2],E),c(M,_,E,v)}function c(v,M,_,E){let S=E+1,y=[];for(let b=0;b<=S;b++){y[b]=[];let A=v.clone().lerp(_,b/S),R=M.clone().lerp(_,b/S),D=S-b;for(let k=0;k<=D;k++)k===0&&b===S?y[b][k]=A:y[b][k]=A.clone().lerp(R,k/D)}for(let b=0;b<S;b++)for(let A=0;A<2*(S-b)-1;A++){let R=Math.floor(A/2);A%2===0?(u(y[b][R+1]),u(y[b+1][R]),u(y[b][R])):(u(y[b][R+1]),u(y[b+1][R+1]),u(y[b+1][R]))}}function l(v){let M=new N;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){let v=new N;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let _=g(v)/2/Math.PI+.5,E=m(v)/Math.PI+.5;a.push(_,1-E)}p(),f()}function f(){for(let v=0;v<a.length;v+=6){let M=a[v+0],_=a[v+2],E=a[v+4],S=Math.max(M,_,E),y=Math.min(M,_,E);S>.9&&y<.1&&(M<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),E<.2&&(a[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function d(v,M){let _=v*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function p(){let v=new N,M=new N,_=new N,E=new N,S=new ce,y=new ce,b=new ce;for(let A=0,R=0;A<r.length;A+=9,R+=6){v.set(r[A+0],r[A+1],r[A+2]),M.set(r[A+3],r[A+4],r[A+5]),_.set(r[A+6],r[A+7],r[A+8]),S.set(a[R+0],a[R+1]),y.set(a[R+2],a[R+3]),b.set(a[R+4],a[R+5]),E.copy(v).add(M).add(_).divideScalar(3);let D=g(E);x(S,R+0,v,D),x(y,R+2,M,D),x(b,R+4,_,D)}}function x(v,M,_,E){E<0&&v.x===1&&(a[M]=v.x-1),_.x===0&&_.z===0&&(a[M]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},ja=class s extends Xr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var Kn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);let h=n[i],u=n[i+1]-h,d=(a-h)/u;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new ce:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new N,i=[],r=[],a=[],o=new N,c=new Ge;for(let d=0;d<=e;d++){let p=d/e;i[d]=this.getTangentAt(p,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ot(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,p))}a[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(ot(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(i[p],d*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},qr=class extends Kn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ce){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,d=l-this.aY;c=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},zl=class extends qr{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Vu(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+f)+(c-o)/f;u*=h,d*=h,i(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var Sp=new N,Ep=new N,Yh=new Vu,Zh=new Vu,Kh=new Vu,Zi=class extends Kn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new N){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(Ep.subVectors(i[0],i[1]).add(i[0]),l=Ep);let f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Sp.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Sp),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(f),d),x=Math.pow(f.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),Yh.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,p,x,g),Zh.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,p,x,g),Kh.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(Yh.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Zh.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Kh.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(Yh.calc(c),Zh.calc(c),Kh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new N().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function wp(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function wx(s,e){let t=1-s;return t*t*e}function Tx(s,e){return 2*(1-s)*s*e}function Ax(s,e){return s*s*e}function Da(s,e,t,n){return wx(s,e)+Tx(s,t)+Ax(s,n)}function Rx(s,e){let t=1-s;return t*t*t*e}function Cx(s,e){let t=1-s;return 3*t*t*s*e}function Ix(s,e){return 3*(1-s)*s*s*e}function Px(s,e){return s*s*s*e}function Ua(s,e,t,n,i){return Rx(s,e)+Cx(s,t)+Ix(s,n)+Px(s,i)}var Qa=class extends Kn{constructor(e=new ce,t=new ce,n=new ce,i=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ua(e,i.x,r.x,a.x,o.x),Ua(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},kl=class extends Kn{constructor(e=new N,t=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new N){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ua(e,i.x,r.x,a.x,o.x),Ua(e,i.y,r.y,a.y,o.y),Ua(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},eo=class extends Kn{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Hl=class extends Kn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},to=class extends Kn{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Da(e,i.x,r.x,a.x),Da(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},no=class extends Kn{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Da(e,i.x,r.x,a.x),Da(e,i.y,r.y,a.y),Da(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},io=class extends Kn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(wp(o,c.x,l.x,h.x,f.x),wp(o,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ce().fromArray(i))}return this}},Gl=Object.freeze({__proto__:null,ArcCurve:zl,CatmullRomCurve3:Zi,CubicBezierCurve:Qa,CubicBezierCurve3:kl,EllipseCurve:qr,LineCurve:eo,LineCurve3:Hl,QuadraticBezierCurve:to,QuadraticBezierCurve3:no,SplineCurve:io}),Vl=class extends Kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Gl[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},Zs=class extends Vl{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new eo(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new to(this.currentPoint.clone(),new ce(e,t),new ce(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new Qa(this.currentPoint.clone(),new ce(e,t),new ce(n,i),new ce(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new io(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){let l=new qr(e,t,n,i,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Yr=class extends Zs{constructor(e){super(e),this.uuid=mi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Zs().fromJSON(i))}return this}};function Lx(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=b0(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Ox(s,e,r,t)),s.length>80*t){o=s[0],c=s[1];let h=o,f=c;for(let u=t;u<i;u+=t){let d=s[u],p=s[u+1];d<o&&(o=d),p<c&&(c=p),d>h&&(h=d),p>f&&(f=p)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return so(r,a,t,o,c,l,0),a}function b0(s,e,t,n,i){let r;if(i===Zx(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=Tp(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Tp(a/n|0,s[a],s[a+1],r);return r&&Zr(r,r.next)&&(ao(r),r=r.next),r}function Ks(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Zr(t,t.next)||qt(t.prev,t,t.next)===0)){if(ao(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function so(s,e,t,n,i,r,a){if(!s)return;!a&&r&&Gx(s,n,i,r);let o=s;for(;s.prev!==s.next;){let c=s.prev,l=s.next;if(r?Dx(s,n,i,r):Nx(s)){e.push(c.i,s.i,l.i),ao(s),s=l.next,o=l.next;continue}if(s=l,s===o){a?a===1?(s=Ux(Ks(s),e),so(s,e,t,n,i,r,2)):a===2&&Fx(s,e,t,n,i,r):so(Ks(s),e,t,n,i,r,1);break}}}function Nx(s){let e=s.prev,t=s,n=s.next;if(qt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,r,a),f=Math.min(o,c,l),u=Math.max(i,r,a),d=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=f&&p.y<=d&&Ia(i,o,r,c,a,l,p.x,p.y)&&qt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Dx(s,e,t,n){let i=s.prev,r=s,a=s.next;if(qt(i,r,a)>=0)return!1;let o=i.x,c=r.x,l=a.x,h=i.y,f=r.y,u=a.y,d=Math.min(o,c,l),p=Math.min(h,f,u),x=Math.max(o,c,l),g=Math.max(h,f,u),m=su(d,p,e,t,n),v=su(x,g,e,t,n),M=s.prevZ,_=s.nextZ;for(;M&&M.z>=m&&_&&_.z<=v;){if(M.x>=d&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Ia(o,h,c,f,l,u,M.x,M.y)&&qt(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=d&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Ia(o,h,c,f,l,u,_.x,_.y)&&qt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=m;){if(M.x>=d&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Ia(o,h,c,f,l,u,M.x,M.y)&&qt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Ia(o,h,c,f,l,u,_.x,_.y)&&qt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Ux(s,e){let t=s;do{let n=t.prev,i=t.next.next;!Zr(n,i)&&E0(n,t,t.next,i)&&ro(n,i)&&ro(i,n)&&(e.push(n.i,t.i,i.i),ao(t),ao(t.next),t=s=i),t=t.next}while(t!==s);return Ks(t)}function Fx(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Xx(a,o)){let c=w0(a,o);a=Ks(a,a.next),c=Ks(c,c.next),so(a,e,t,n,i,r,0),so(c,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Ox(s,e,t,n){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:s.length,l=b0(s,o,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Wx(l))}i.sort(Bx);for(let r=0;r<i.length;r++)t=zx(i[r],t);return t}function Bx(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function zx(s,e){let t=kx(s,e);if(!t)return e;let n=w0(t,s);return Ks(n,n.next),Ks(t,t.next)}function kx(s,e){let t=e,n=s.x,i=s.y,r=-1/0,a;if(Zr(s,t))return t;do{if(Zr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let f=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&S0(i<l?n:r,i,c,l,i<l?r:n,i,t.x,t.y)){let f=Math.abs(i-t.y)/(n-t.x);ro(t,s)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&Hx(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function Hx(s,e){return qt(s.prev,s,e.prev)<0&&qt(e.next,s,s.next)<0}function Gx(s,e,t,n){let i=s;do i.z===0&&(i.z=su(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Vx(i)}function Vx(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function su(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Wx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function S0(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function Ia(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&S0(s,e,t,n,i,r,a,o)}function Xx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!qx(s,e)&&(ro(s,e)&&ro(e,s)&&Yx(s,e)&&(qt(s.prev,s,e.prev)||qt(s,e.prev,e))||Zr(s,e)&&qt(s.prev,s,s.next)>0&&qt(e.prev,e,e.next)>0)}function qt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Zr(s,e){return s.x===e.x&&s.y===e.y}function E0(s,e,t,n){let i=Ml(qt(s,e,t)),r=Ml(qt(s,e,n)),a=Ml(qt(t,n,s)),o=Ml(qt(t,n,e));return!!(i!==r&&a!==o||i===0&&yl(s,t,e)||r===0&&yl(s,n,e)||a===0&&yl(t,s,n)||o===0&&yl(t,e,n))}function yl(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Ml(s){return s>0?1:s<0?-1:0}function qx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&E0(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function ro(s,e){return qt(s.prev,s,s.next)<0?qt(s,e,s.next)>=0&&qt(s,s.prev,e)>=0:qt(s,e,s.prev)<0||qt(s,s.next,e)<0}function Yx(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function w0(s,e){let t=ru(s.i,s.x,s.y),n=ru(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Tp(s,e,t,n){let i=ru(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ao(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ru(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Zx(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var au=class{static triangulate(e,t,n=2){return Lx(e,t,n)}},Hs=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Ap(e),Rp(n,e);let a=e.length;t.forEach(Ap);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Rp(n,t[c]);let o=au.triangulate(n,i);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Ap(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Rp(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var oo=class s extends _t{constructor(e=new Yr([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new We(i,3)),this.setAttribute("uv",new We(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Kx,M,_=!1,E,S,y,b;if(m){M=m.getSpacedPoints(h),_=!0,u=!1;let se=m.isCatmullRomCurve3?m.closed:!1;E=m.computeFrenetFrames(h,se),S=new N,y=new N,b=new N}u||(g=0,d=0,p=0,x=0);let A=o.extractPoints(l),R=A.shape,D=A.holes;if(!Hs.isClockWise(R)){R=R.reverse();for(let se=0,he=D.length;se<he;se++){let le=D[se];Hs.isClockWise(le)&&(D[se]=le.reverse())}}function X(se){let le=10000000000000001e-36,Ae=se[0];for(let ge=1;ge<=se.length;ge++){let Xe=ge%se.length,Le=se[Xe],nt=Le.x-Ae.x,it=Le.y-Ae.y,mt=nt*nt+it*it,z=Math.max(Math.abs(Le.x),Math.abs(Le.y),Math.abs(Ae.x),Math.abs(Ae.y)),Kt=le*z*z;if(mt<=Kt){se.splice(Xe,1),ge--;continue}Ae=Le}}X(R),D.forEach(X);let U=D.length,G=R;for(let se=0;se<U;se++){let he=D[se];R=R.concat(he)}function V(se,he,le){return he||je("ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(he,le)}let P=R.length;function Y(se,he,le){let Ae,ge,Xe,Le=se.x-he.x,nt=se.y-he.y,it=le.x-se.x,mt=le.y-se.y,z=Le*Le+nt*nt,Kt=Le*mt-nt*it;if(Math.abs(Kt)>Number.EPSILON){let st=Math.sqrt(z),St=Math.sqrt(it*it+mt*mt),xe=he.x-nt/st,Nt=he.y+Le/st,Ve=le.x-mt/St,Ye=le.y+it/St,C=((Ve-xe)*mt-(Ye-Nt)*it)/(Le*mt-nt*it);Ae=xe+Le*C-se.x,ge=Nt+nt*C-se.y;let w=Ae*Ae+ge*ge;if(w<=2)return new ce(Ae,ge);Xe=Math.sqrt(w/2)}else{let st=!1;Le>Number.EPSILON?it>Number.EPSILON&&(st=!0):Le<-Number.EPSILON?it<-Number.EPSILON&&(st=!0):Math.sign(nt)===Math.sign(mt)&&(st=!0),st?(Ae=-nt,ge=Le,Xe=Math.sqrt(z)):(Ae=Le,ge=nt,Xe=Math.sqrt(z/2))}return new ce(Ae/Xe,ge/Xe)}let L=[];for(let se=0,he=G.length,le=he-1,Ae=se+1;se<he;se++,le++,Ae++)le===he&&(le=0),Ae===he&&(Ae=0),L[se]=Y(G[se],G[le],G[Ae]);let J=[],I,te=L.concat();for(let se=0,he=U;se<he;se++){let le=D[se];I=[];for(let Ae=0,ge=le.length,Xe=ge-1,Le=Ae+1;Ae<ge;Ae++,Xe++,Le++)Xe===ge&&(Xe=0),Le===ge&&(Le=0),I[Ae]=Y(le[Ae],le[Xe],le[Le]);J.push(I),te=te.concat(I)}let W;if(g===0)W=Hs.triangulateShape(G,D);else{let se=[],he=[];for(let le=0;le<g;le++){let Ae=le/g,ge=d*Math.cos(Ae*Math.PI/2),Xe=p*Math.sin(Ae*Math.PI/2)+x;for(let Le=0,nt=G.length;Le<nt;Le++){let it=V(G[Le],L[Le],Xe);Ce(it.x,it.y,-ge),Ae===0&&se.push(it)}for(let Le=0,nt=U;Le<nt;Le++){let it=D[Le];I=J[Le];let mt=[];for(let z=0,Kt=it.length;z<Kt;z++){let st=V(it[z],I[z],Xe);Ce(st.x,st.y,-ge),Ae===0&&mt.push(st)}Ae===0&&he.push(mt)}}W=Hs.triangulateShape(se,he)}let F=W.length,ee=p+x;for(let se=0;se<P;se++){let he=u?V(R[se],te[se],ee):R[se];_?(y.copy(E.normals[0]).multiplyScalar(he.x),S.copy(E.binormals[0]).multiplyScalar(he.y),b.copy(M[0]).add(y).add(S),Ce(b.x,b.y,b.z)):Ce(he.x,he.y,0)}for(let se=1;se<=h;se++)for(let he=0;he<P;he++){let le=u?V(R[he],te[he],ee):R[he];_?(y.copy(E.normals[se]).multiplyScalar(le.x),S.copy(E.binormals[se]).multiplyScalar(le.y),b.copy(M[se]).add(y).add(S),Ce(b.x,b.y,b.z)):Ce(le.x,le.y,f/h*se)}for(let se=g-1;se>=0;se--){let he=se/g,le=d*Math.cos(he*Math.PI/2),Ae=p*Math.sin(he*Math.PI/2)+x;for(let ge=0,Xe=G.length;ge<Xe;ge++){let Le=V(G[ge],L[ge],Ae);Ce(Le.x,Le.y,f+le)}for(let ge=0,Xe=D.length;ge<Xe;ge++){let Le=D[ge];I=J[ge];for(let nt=0,it=Le.length;nt<it;nt++){let mt=V(Le[nt],I[nt],Ae);_?Ce(mt.x,mt.y+M[h-1].y,M[h-1].x+le):Ce(mt.x,mt.y,f+le)}}}re(),Ne();function re(){let se=i.length/3;if(u){let he=0,le=P*he;for(let Ae=0;Ae<F;Ae++){let ge=W[Ae];ct(ge[2]+le,ge[1]+le,ge[0]+le)}he=h+g*2,le=P*he;for(let Ae=0;Ae<F;Ae++){let ge=W[Ae];ct(ge[0]+le,ge[1]+le,ge[2]+le)}}else{for(let he=0;he<F;he++){let le=W[he];ct(le[2],le[1],le[0])}for(let he=0;he<F;he++){let le=W[he];ct(le[0]+P*h,le[1]+P*h,le[2]+P*h)}}n.addGroup(se,i.length/3-se,0)}function Ne(){let se=i.length/3,he=0;ye(G,he),he+=G.length;for(let le=0,Ae=D.length;le<Ae;le++){let ge=D[le];ye(ge,he),he+=ge.length}n.addGroup(se,i.length/3-se,1)}function ye(se,he){let le=se.length;for(;--le>=0;){let Ae=le,ge=le-1;ge<0&&(ge=se.length-1);for(let Xe=0,Le=h+g*2;Xe<Le;Xe++){let nt=P*Xe,it=P*(Xe+1),mt=he+Ae+nt,z=he+ge+nt,Kt=he+ge+it,st=he+Ae+it;De(mt,z,Kt,st)}}}function Ce(se,he,le){c.push(se),c.push(he),c.push(le)}function ct(se,he,le){Je(se),Je(he),Je(le);let Ae=i.length/3,ge=v.generateTopUV(n,i,Ae-3,Ae-2,Ae-1);$e(ge[0]),$e(ge[1]),$e(ge[2])}function De(se,he,le,Ae){Je(se),Je(he),Je(Ae),Je(he),Je(le),Je(Ae);let ge=i.length/3,Xe=v.generateSideWallUV(n,i,ge-6,ge-3,ge-2,ge-1);$e(Xe[0]),$e(Xe[1]),$e(Xe[3]),$e(Xe[1]),$e(Xe[2]),$e(Xe[3])}function Je(se){i.push(c[se*3+0]),i.push(c[se*3+1]),i.push(c[se*3+2])}function $e(se){r.push(se.x),r.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Jx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Gl[i.type]().fromJSON(i)),new s(n,e.options)}},Kx={generateTopUV:function(s,e,t,n,i){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[i*3],h=e[i*3+1];return[new ce(r,a),new ce(o,c),new ce(l,h)]},generateSideWallUV:function(s,e,t,n,i,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[i*3],d=e[i*3+1],p=e[i*3+2],x=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new ce(a,1-c),new ce(l,1-f),new ce(u,1-p),new ce(x,1-m)]:[new ce(o,1-c),new ce(h,1-f),new ce(d,1-p),new ce(g,1-m)]}};function Jx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ki=class s extends Xr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},lo=class s extends _t{constructor(e=[new ce(0,-.5),new ce(.5,0),new ce(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ot(i,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,f=new N,u=new ce,d=new N,p=new N,x=new N,g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,d.x=m*1,d.y=-g,d.z=m*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:x.normalize(),c.push(x.x,x.y,x.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(p)}for(let v=0;v<=t;v++){let M=n+v*h*i,_=Math.sin(M),E=Math.cos(M);for(let S=0;S<=e.length-1;S++){f.x=e[S].x*_,f.y=e[S].y,f.z=e[S].x*E,a.push(f.x,f.y,f.z),u.x=v/t,u.y=S/(e.length-1),o.push(u.x,u.y);let y=c[3*S+0]*_,b=c[3*S+1],A=c[3*S+0]*E;l.push(y,b,A)}}for(let v=0;v<t;v++)for(let M=0;M<e.length-1;M++){let _=M+v*e.length,E=_,S=_+e.length,y=_+e.length+1,b=_+1;r.push(E,S,b),r.push(y,b,S)}this.setIndex(r),this.setAttribute("position",new We(a,3)),this.setAttribute("uv",new We(o,2)),this.setAttribute("normal",new We(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},Js=class s extends Xr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Ft=class s extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,f=e/o,u=t/c,d=[],p=[],x=[],g=[];for(let m=0;m<h;m++){let v=m*u-a;for(let M=0;M<l;M++){let _=M*f-r;p.push(_,-v,0),x.push(0,0,1),g.push(M/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<o;v++){let M=v+l*m,_=v+l*(m+1),E=v+1+l*(m+1),S=v+1+l*m;d.push(M,_,S),d.push(_,E,S)}this.setIndex(d),this.setAttribute("position",new We(p,3)),this.setAttribute("normal",new We(x,3)),this.setAttribute("uv",new We(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},ys=class s extends _t{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],c=[],l=[],h=[],f=e,u=(t-e)/i,d=new N,p=new ce;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let m=r+g/n*a;d.x=f*Math.cos(m),d.y=f*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,h.push(p.x,p.y)}f+=u}for(let x=0;x<i;x++){let g=x*(n+1);for(let m=0;m<n;m++){let v=m+g,M=v,_=v+n+1,E=v+n+2,S=v+1;o.push(M,_,S),o.push(_,E,S)}}this.setIndex(o),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(l,3)),this.setAttribute("uv",new We(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var fi=class s extends _t{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new N,u=new N,d=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let v=[],M=m/n,_=a+M*o,E=e*Math.cos(_),S=Math.sqrt(e*e-E*E),y=0;m===0&&a===0?y=.5/t:m===n&&c===Math.PI&&(y=-.5/t);for(let b=0;b<=t;b++){let A=b/t,R=i+A*r;f.x=-S*Math.cos(R),f.y=E,f.z=S*Math.sin(R),p.push(f.x,f.y,f.z),u.copy(f).normalize(),x.push(u.x,u.y,u.z),g.push(A+y,1-M),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){let M=h[m][v+1],_=h[m][v],E=h[m+1][v],S=h[m+1][v+1];(m!==0||a>0)&&d.push(M,_,S),(m!==n-1||c<Math.PI)&&d.push(_,E,S)}this.setIndex(d),this.setAttribute("position",new We(p,3)),this.setAttribute("normal",new We(x,3)),this.setAttribute("uv",new We(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Jn=class s extends _t{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],h=[],f=[],u=new N,d=new N,p=new N;for(let x=0;x<=n;x++){let g=a+x/n*o;for(let m=0;m<=i;m++){let v=m/i*r;d.x=(e+t*Math.cos(g))*Math.cos(v),d.y=(e+t*Math.cos(g))*Math.sin(v),d.z=t*Math.sin(g),l.push(d.x,d.y,d.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),p.subVectors(d,u).normalize(),h.push(p.x,p.y,p.z),f.push(m/i),f.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){let m=(i+1)*x+g-1,v=(i+1)*(x-1)+g-1,M=(i+1)*(x-1)+g,_=(i+1)*x+g;c.push(m,v,_),c.push(v,M,_)}this.setIndex(c),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var $s=class s extends _t{constructor(e=new no(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,c=new N,l=new ce,h=new N,f=[],u=[],d=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new We(f,3)),this.setAttribute("normal",new We(u,3)),this.setAttribute("uv",new We(d,2));function x(){for(let M=0;M<t;M++)g(M);g(r===!1?t:0),v(),m()}function g(M){h=e.getPointAt(M/t,h);let _=a.normals[M],E=a.binormals[M];for(let S=0;S<=i;S++){let y=S/i*Math.PI*2,b=Math.sin(y),A=-Math.cos(y);c.x=A*_.x+b*E.x,c.y=A*_.y+b*E.y,c.z=A*_.z+b*E.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,f.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=t;M++)for(let _=1;_<=i;_++){let E=(i+1)*(M-1)+(_-1),S=(i+1)*M+(_-1),y=(i+1)*M+_,b=(i+1)*(M-1)+_;p.push(E,S,b),p.push(S,y,b)}}function v(){for(let M=0;M<=t;M++)for(let _=0;_<=i;_++)l.x=M/t,l.y=_/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Gl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function rr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(Cp(i))i.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Cp(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function En(s){let e={};for(let t=0;t<s.length;t++){let n=rr(s[t]);for(let i in n)e[i]=n[i]}return e}function Cp(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function $x(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Wu(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}var T0={clone:rr,merge:En},jx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ot=class extends Sn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jx,this.fragmentShader=Qx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=$x(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new we().setHex(i.value);break;case"v2":this.uniforms[n].value=new ce().fromArray(i.value);break;case"v3":this.uniforms[n].value=new N().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ut().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Qe().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ge().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Wl=class extends Ot{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ji=class extends Sn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sa,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ln=class extends Ji{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Gs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Gs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Bt=class extends Sn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new we(16777215),this.specular=new we(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sa,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=_o,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var co=class extends Sn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sa,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=_o,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Xl=class extends Sn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=c0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ql=class extends Sn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xs(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Pa(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function e1(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ip(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function t1(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Ei=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Yl=class extends Ei{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:eu,endingEnd:eu}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case tu:r=e,o=2*t-n;break;case nu:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case tu:a=e,c=2*n-t;break;case nu:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-t)/(i-t),x=p*p,g=x*p,m=-u*g+2*u*x-u*p,v=(1+u)*g+(-1.5-2*u)*x+(-.5+u)*p+1,M=(-1-d)*g+(1.5+d)*x+.5*p,_=d*g-d*x;for(let E=0;E!==o;++E)r[E]=m*a[h+E]+v*a[l+E]+M*a[c+E]+_*a[f+E];return r}},Zl=class extends Ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),f=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*f+a[c+u]*h;return r}},Kl=class extends Ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Jl=class extends Ei{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(n-t)/(i-t),x=1-p;for(let g=0;g!==o;++g)r[g]=a[l+g]*x+a[c+g]*p;return r}let u=o*2,d=e-1;for(let p=0;p!==o;++p){let x=a[l+p],g=a[c+p],m=d*u+p*2,v=f[m],M=f[m+1],_=e*u+p*2,E=h[_],S=h[_+1],y=i1(n,t,v,E,i);r[p]=A0(y,x,M,S,g)}return r}};function A0(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function n1(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function i1(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){let o=A0(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;let c=n1(r,e,t,n,i);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var kn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xs(t,this.TimeBufferType),this.values=xs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xs(e.times,Array),values:xs(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Pa(e.settings)&&(n.settings={inTangents:xs(e.settings.inTangents,Array),outTangents:xs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Zl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Yl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Jl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Vs:t=this.InterpolantFactoryMethodDiscrete;break;case Ws:t=this.InterpolantFactoryMethodLinear;break;case El:t=this.InterpolantFactoryMethodSmooth;break;case Qh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ke("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vs;case this.InterpolantFactoryMethodLinear:return Ws;case this.InterpolantFactoryMethodSmooth:return El;case this.InterpolantFactoryMethodBezier:return Qh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;Pa(this.settings)&&(Pp(this.settings.inTangents,e),Pp(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Pa(this.settings)&&(Lp(this.settings.inTangents,e),Lp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){je("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){je("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Gg(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){je("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===El,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let f=o*n,u=f-n,d=f+n;for(let p=0;p!==n;++p){let x=t[f+p];if(x!==t[u+p]||x!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[f+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Pa(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Pp(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]+=e}function Lp(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}kn.prototype.ValueTypeName="";kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=Ws;var $i=class extends kn{constructor(e,t,n){super(e,t,n)}};$i.prototype.ValueTypeName="bool";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=Vs;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;var ho=class extends kn{constructor(e,t,n,i){super(e,t,n,i)}};ho.prototype.ValueTypeName="color";var ji=class extends kn{constructor(e,t,n,i){super(e,t,n,i)}};ji.prototype.ValueTypeName="number";var $l=class extends Ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)on.slerpFlat(r,0,a,l-o,a,l,c);return r}},Qi=class extends kn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new $l(this.times,this.values,this.getValueSize(),e)}};Qi.prototype.ValueTypeName="quaternion";Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var es=class extends kn{constructor(e,t,n){super(e,t,n)}};es.prototype.ValueTypeName="string";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=Vs;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;var Ms=class extends kn{constructor(e,t,n,i){super(e,t,n,i)}};Ms.prototype.ValueTypeName="vector";var uo=class{constructor(e="",t=-1,n=[],i=l0){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=mi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(r1(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(kn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=e1(c);c=Ip(c,1,h),l=Ip(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new ji(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let f=h[1],u=i[f];u||(i[f]=u=[]),u.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function s1(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ji;case"vector":case"vector2":case"vector3":case"vector4":return Ms;case"color":return ho;case"quaternion":return Qi;case"bool":case"boolean":return $i;case"string":return es}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function r1(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=s1(s.type);if(s.times===void 0){let n=[],i=[];t1(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Pa(s.settings)&&(t.settings={inTangents:xs(s.settings.inTangents,Float32Array),outTangents:xs(s.settings.outTangents,Float32Array)}),t}var Mi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Np(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Np(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Np(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var jl=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let d=l[f],p=l[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},R0=new jl,wi=class{constructor(e){this.manager=e!==void 0?e:R0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};wi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vi={},ou=class extends Error{constructor(e,t){super(e),this.response=t}},Kr=class extends wi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Mi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Vi[e]!==void 0){Vi[e].push({onLoad:t,onProgress:n,onError:i});return}Vi[e]=[],Vi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&ke("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Vi[e],f=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=u?parseInt(u):0,p=d!==0,x=0,g=new ReadableStream({start(m){v();function v(){f.read().then(({done:M,value:_})=>{if(M)m.close();else{x+=_.byteLength;let E=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:d});for(let S=0,y=h.length;S<y;S++){let b=h[S];b.onProgress&&b.onProgress(E)}m.enqueue(_),v()}},M=>{m.error(M)})}}});return new Response(g)}else throw new ou(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),u=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{Mi.add(`file:${e}`,l);let h=Vi[e];delete Vi[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Vi[e];if(h===void 0)throw this.manager.itemError(e),l;delete Vi[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Rr=new WeakMap,Ql=class extends wi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Mi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let f=Rr.get(a);f===void 0&&(f=[],Rr.set(a,f)),f.push({onLoad:t,onError:i})}return a}let o=Ur("img");function c(){h(),t&&t(this);let f=Rr.get(this)||[];for(let u=0;u<f.length;u++){let d=f[u];d.onLoad&&d.onLoad(this)}Rr.delete(this),r.manager.itemEnd(e)}function l(f){h(),i&&i(f),Mi.remove(`image:${e}`);let u=Rr.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onError&&p.onError(f)}Rr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Mi.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var ts=class extends wi{constructor(e){super(e)}load(e,t,n,i){let r=new ln,a=new Ql(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},js=class extends Rt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},fo=class extends js{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Jh=new Ge,Dp=new N,Up=new N,Jr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _s,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Dp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Dp),Up.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Up),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Jh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Jh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,c=i?i.x/r.x:0,l=i?i.y/r.y:0;e.coordinateSystem===Dr||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Jh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},bl=new N,Sl=new on,yi=new N,po=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bl,Sl,yi),yi.x===1&&yi.y===1&&yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bl,Sl,yi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(bl,Sl,yi),yi.x===1&&yi.y===1&&yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bl,Sl,yi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},gs=new N,Fp=new ce,Op=new ce,an=class extends po{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(La*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xs*2*Math.atan(Math.tan(La*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gs.x,gs.y).multiplyScalar(-e/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gs.x,gs.y).multiplyScalar(-e/gs.z)}getViewSize(e,t){return this.getViewBounds(e,Fp,Op),t.subVectors(Op,Fp)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(La*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},lu=class extends Jr{constructor(){super(new an(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Xs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},mo=class extends js{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new lu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},cu=class extends Jr{constructor(){super(new an(90,1,.5,500)),this.isPointLightShadow=!0}},go=class extends js{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new cu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Qs=class extends po{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},hu=class extends Jr{constructor(){super(new Qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bs=class extends js{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new hu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ns=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ss=class extends _t{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var $h=new WeakMap,xo=class extends wi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ke("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ke("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Mi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{$h.has(a)===!0?(i&&i($h.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Mi.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),$h.set(c,l),Mi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Mi.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Cr=-90,Ir=1,$r=class extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new an(Cr,Ir,e,t);i.layers=this.layers,this.add(i);let r=new an(Cr,Ir,e,t);r.layers=this.layers,this.add(r);let a=new an(Cr,Ir,e,t);a.layers=this.layers,this.add(a);let o=new an(Cr,Ir,e,t);o.layers=this.layers,this.add(o);let c=new an(Cr,Ir,e,t);c.layers=this.layers,this.add(c);let l=new an(Cr,Ir,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===ti)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ec=class extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Xu="\\[\\]\\.:\\/",a1=new RegExp("["+Xu+"]","g"),qu="[^"+Xu+"]",o1="[^"+Xu.replace("\\.","")+"]",l1=/((?:WC+[\/:])*)/.source.replace("WC",qu),c1=/(WCOD+)?/.source.replace("WCOD",o1),h1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qu),u1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qu),f1=new RegExp("^"+l1+c1+h1+u1+"$"),d1=["material","materials","bones","map"],uu=class{constructor(e,t,n){let i=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(a1,"")}static parseTrackName(e){let t=f1.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);d1.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;je("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=uu;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var AS=new Float32Array(1);var ju=class ju{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};ju.prototype.isMatrix2=!0;var fu=ju;function Yu(s,e,t,n){let i=p1(n);switch(t){case Pu:return s*e;case lc:return s*e/i.components*i.byteLength;case cc:return s*e/i.components*i.byteLength;case Es:return s*e*2/i.components*i.byteLength;case hc:return s*e*2/i.components*i.byteLength;case Lu:return s*e*3/i.components*i.byteLength;case ii:return s*e*4/i.components*i.byteLength;case uc:return s*e*4/i.components*i.byteLength;case yo:case Mo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case bo:case So:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case dc:case mc:return Math.max(s,16)*Math.max(e,8)/4;case fc:case pc:return Math.max(s,8)*Math.max(e,8)/2;case gc:case xc:case _c:case yc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case vc:case Eo:case Mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ec:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case wc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ac:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ic:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Nc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Dc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Fc:case Oc:case Bc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case zc:case kc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case wo:case Hc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function p1(s){switch(s){case Gn:case Au:return{byteLength:1,components:1};case na:case Ru:case pi:return{byteLength:2,components:1};case ac:case oc:return{byteLength:2,components:4};case di:case rc:case $n:return{byteLength:4,components:1};case Cu:case Iu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function J0(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function g1(s){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,f=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let h=c.array,f=c.updateRanges;if(s.bindBuffer(l,o),f.length===0)s.bufferSubData(l,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],x=f[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,f[u]=x)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let x=f[d];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var x1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v1=`#ifdef USE_ALPHAHASH
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
#endif`,_1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,y1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,b1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,S1=`#ifdef USE_AOMAP
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
#endif`,E1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,w1=`#ifdef USE_BATCHING
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
#endif`,T1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,I1=`#ifdef USE_IRIDESCENCE
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
#endif`,P1=`#ifdef USE_BUMPMAP
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
#endif`,L1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,N1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,U1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,O1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,B1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,z1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,k1=`#define PI 3.141592653589793
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
} // validated`,H1=`vec3 transformedNormal = objectNormal;
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
#endif`,G1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,W1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,X1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,q1="gl_FragColor = linearToOutputTexel( gl_FragColor );",Y1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Z1=`#ifdef USE_ENVMAP
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
#endif`,K1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,J1=`#ifdef USE_ENVMAP
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
#endif`,$1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
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
#endif`,Q1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ev=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iv=`#ifdef USE_GRADIENTMAP
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
}`,sv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,av=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ov=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,lv=`#ifdef USE_ENVMAP
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
#endif`,cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dv=`PhysicalMaterial material;
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
#endif`,pv=`uniform sampler2D dfgLUT;
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
}`,mv=`
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
#endif`,gv=`#if defined( RE_IndirectDiffuse )
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
#endif`,xv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vv=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,_v=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ev=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tv=`#if defined( USE_POINTS_UV )
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
#endif`,Av=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Iv=`#if defined( USE_MORPHCOLORS )
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
#endif`,Pv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lv=`#ifdef USE_MORPHTARGETS
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
#endif`,Nv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Uv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zv=`#ifdef USE_NORMALMAP
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
#endif`,kv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$v=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,t_=`float getShadowMask() {
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
}`,n_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i_=`#ifdef USE_SKINNING
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
#endif`,s_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r_=`#ifdef USE_SKINNING
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
#endif`,a_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,o_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,h_=`#ifdef USE_TRANSMISSION
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
#endif`,u_=`#ifdef USE_TRANSMISSION
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
#endif`,f_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,g_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,x_=`uniform sampler2D t2D;
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
}`,v_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,__=`uniform float backgroundBlurriness;
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
}`,y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,M_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b_=`#include <common>
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
}`,S_=`#if DEPTH_PACKING == 3200
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
}`,E_=`#define DISTANCE
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
}`,w_=`#define DISTANCE
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
}`,T_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R_=`uniform float scale;
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
}`,C_=`uniform vec3 diffuse;
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
}`,I_=`#include <common>
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
}`,P_=`uniform vec3 diffuse;
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
}`,L_=`#define LAMBERT
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
}`,N_=`#define LAMBERT
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
}`,D_=`#define MATCAP
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
}`,U_=`#define MATCAP
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
}`,F_=`#define NORMAL
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
}`,O_=`#define NORMAL
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
}`,B_=`#define PHONG
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
}`,z_=`#define PHONG
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
}`,k_=`#define STANDARD
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
}`,H_=`#define STANDARD
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
}`,G_=`#define TOON
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
}`,V_=`#define TOON
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
}`,W_=`uniform float size;
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
}`,X_=`uniform vec3 diffuse;
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
}`,q_=`#include <common>
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
}`,Y_=`uniform vec3 color;
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
}`,Z_=`uniform float rotation;
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
}`,K_=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:x1,alphahash_pars_fragment:v1,alphamap_fragment:_1,alphamap_pars_fragment:y1,alphatest_fragment:M1,alphatest_pars_fragment:b1,aomap_fragment:S1,aomap_pars_fragment:E1,batching_pars_vertex:w1,batching_vertex:T1,begin_vertex:A1,beginnormal_vertex:R1,bsdfs:C1,iridescence_fragment:I1,bumpmap_pars_fragment:P1,clipping_planes_fragment:L1,clipping_planes_pars_fragment:N1,clipping_planes_pars_vertex:D1,clipping_planes_vertex:U1,color_fragment:F1,color_pars_fragment:O1,color_pars_vertex:B1,color_vertex:z1,common:k1,defaultnormal_vertex:H1,displacementmap_pars_vertex:G1,displacementmap_vertex:V1,emissivemap_fragment:W1,emissivemap_pars_fragment:X1,colorspace_fragment:q1,colorspace_pars_fragment:Y1,envmap_fragment:Z1,envmap_common_pars_fragment:K1,envmap_pars_fragment:J1,envmap_pars_vertex:$1,envmap_physical_pars_fragment:lv,envmap_vertex:j1,fog_vertex:Q1,fog_pars_vertex:ev,fog_fragment:tv,fog_pars_fragment:nv,gradientmap_pars_fragment:iv,lightmap_pars_fragment:sv,lights_lambert_fragment:rv,lights_lambert_pars_fragment:av,lights_pars_begin:ov,lights_toon_fragment:cv,lights_toon_pars_fragment:hv,lights_phong_fragment:uv,lights_phong_pars_fragment:fv,lights_physical_fragment:dv,lights_physical_pars_fragment:pv,lights_fragment_begin:mv,lights_fragment_maps:gv,lights_fragment_end:xv,lightprobes_pars_fragment:vv,logdepthbuf_fragment:_v,logdepthbuf_pars_fragment:yv,logdepthbuf_pars_vertex:Mv,logdepthbuf_vertex:bv,map_fragment:Sv,map_pars_fragment:Ev,map_particle_fragment:wv,map_particle_pars_fragment:Tv,metalnessmap_fragment:Av,metalnessmap_pars_fragment:Rv,morphinstance_vertex:Cv,morphcolor_vertex:Iv,morphnormal_vertex:Pv,morphtarget_pars_vertex:Lv,morphtarget_vertex:Nv,normal_fragment_begin:Dv,normal_fragment_maps:Uv,normal_pars_fragment:Fv,normal_pars_vertex:Ov,normal_vertex:Bv,normalmap_pars_fragment:zv,clearcoat_normal_fragment_begin:kv,clearcoat_normal_fragment_maps:Hv,clearcoat_pars_fragment:Gv,iridescence_pars_fragment:Vv,opaque_fragment:Wv,packing:Xv,premultiplied_alpha_fragment:qv,project_vertex:Yv,dithering_fragment:Zv,dithering_pars_fragment:Kv,roughnessmap_fragment:Jv,roughnessmap_pars_fragment:$v,shadowmap_pars_fragment:jv,shadowmap_pars_vertex:Qv,shadowmap_vertex:e_,shadowmask_pars_fragment:t_,skinbase_vertex:n_,skinning_pars_vertex:i_,skinning_vertex:s_,skinnormal_vertex:r_,specularmap_fragment:a_,specularmap_pars_fragment:o_,tonemapping_fragment:l_,tonemapping_pars_fragment:c_,transmission_fragment:h_,transmission_pars_fragment:u_,uv_pars_fragment:f_,uv_pars_vertex:d_,uv_vertex:p_,worldpos_vertex:m_,background_vert:g_,background_frag:x_,backgroundCube_vert:v_,backgroundCube_frag:__,cube_vert:y_,cube_frag:M_,depth_vert:b_,depth_frag:S_,distance_vert:E_,distance_frag:w_,equirect_vert:T_,equirect_frag:A_,linedashed_vert:R_,linedashed_frag:C_,meshbasic_vert:I_,meshbasic_frag:P_,meshlambert_vert:L_,meshlambert_frag:N_,meshmatcap_vert:D_,meshmatcap_frag:U_,meshnormal_vert:F_,meshnormal_frag:O_,meshphong_vert:B_,meshphong_frag:z_,meshphysical_vert:k_,meshphysical_frag:H_,meshtoon_vert:G_,meshtoon_frag:V_,points_vert:W_,points_frag:X_,shadow_vert:q_,shadow_frag:Y_,sprite_vert:Z_,sprite_frag:K_},Te={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},Ri={basic:{uniforms:En([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:En([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:En([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:En([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:En([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new we(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:En([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:En([Te.points,Te.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:En([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:En([Te.common,Te.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:En([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:En([Te.sprite,Te.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distance:{uniforms:En([Te.common,Te.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distance_vert,fragmentShader:lt.distance_frag},shadow:{uniforms:En([Te.lights,Te.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};Ri.physical={uniforms:En([Ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};var Vc={r:0,b:0,g:0},J_=new Ge,$0=new Qe;$0.set(-1,0,0,0,1,0,0,0,1);function $_(s,e,t,n,i,r){let a=new we(0),o=i===!0?0:1,c,l,h=null,f=0,u=null;function d(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){let _=v.backgroundBlurriness>0;M=e.get(M,_)}return M}function p(v){let M=!1,_=d(v);_===null?g(a,o):_&&_.isColor&&(g(_,1),M=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(v,M){let _=d(M);_&&_.isCubeTexture?(l===void 0&&(l=new Ke(new Pn(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:rr(Ri.backgroundCube.uniforms),vertexShader:Ri.backgroundCube.vertexShader,fragmentShader:Ri.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,S,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(J_.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply($0),l.material.toneMapped=ht.getTransfer(_.colorSpace)!==At,(h!==_||f!==_.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ke(new Ft(2,2),new Ot({name:"BackgroundMaterial",uniforms:rr(Ri.background.uniforms),vertexShader:Ri.background.vertexShader,fragmentShader:Ri.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=ht.getTransfer(_.colorSpace)!==At,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=_,f=_.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,M){v.getRGB(Vc,Wu(s)),t.buffers.color.setClear(Vc.r,Vc.g,Vc.b,M,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:p,addToRenderList:x,dispose:m}}function j_(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(D,k,X,U,G){let V=!1,P=f(D,U,X,k);r!==P&&(r=P,l(r.object)),V=d(D,U,X,G),V&&p(D,U,X,G),G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,_(D,k,X,U),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return s.createVertexArray()}function l(D){return s.bindVertexArray(D)}function h(D){return s.deleteVertexArray(D)}function f(D,k,X,U){let G=U.wireframe===!0,V=n[k.id];V===void 0&&(V={},n[k.id]=V);let P=D.isInstancedMesh===!0?D.id:0,Y=V[P];Y===void 0&&(Y={},V[P]=Y);let L=Y[X.id];L===void 0&&(L={},Y[X.id]=L);let J=L[G];return J===void 0&&(J=u(c()),L[G]=J),J}function u(D){let k=[],X=[],U=[];for(let G=0;G<t;G++)k[G]=0,X[G]=0,U[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:X,attributeDivisors:U,object:D,attributes:{},index:null}}function d(D,k,X,U){let G=r.attributes,V=k.attributes,P=0,Y=X.getAttributes();for(let L in Y)if(Y[L].location>=0){let I=G[L],te=V[L];if(te===void 0&&(L==="instanceMatrix"&&D.instanceMatrix&&(te=D.instanceMatrix),L==="instanceColor"&&D.instanceColor&&(te=D.instanceColor)),I===void 0||I.attribute!==te||te&&I.data!==te.data)return!0;P++}return r.attributesNum!==P||r.index!==U}function p(D,k,X,U){let G={},V=k.attributes,P=0,Y=X.getAttributes();for(let L in Y)if(Y[L].location>=0){let I=V[L];I===void 0&&(L==="instanceMatrix"&&D.instanceMatrix&&(I=D.instanceMatrix),L==="instanceColor"&&D.instanceColor&&(I=D.instanceColor));let te={};te.attribute=I,I&&I.data&&(te.data=I.data),G[L]=te,P++}r.attributes=G,r.attributesNum=P,r.index=U}function x(){let D=r.newAttributes;for(let k=0,X=D.length;k<X;k++)D[k]=0}function g(D){m(D,0)}function m(D,k){let X=r.newAttributes,U=r.enabledAttributes,G=r.attributeDivisors;X[D]=1,U[D]===0&&(s.enableVertexAttribArray(D),U[D]=1),G[D]!==k&&(s.vertexAttribDivisor(D,k),G[D]=k)}function v(){let D=r.newAttributes,k=r.enabledAttributes;for(let X=0,U=k.length;X<U;X++)k[X]!==D[X]&&(s.disableVertexAttribArray(X),k[X]=0)}function M(D,k,X,U,G,V,P){P===!0?s.vertexAttribIPointer(D,k,X,G,V):s.vertexAttribPointer(D,k,X,U,G,V)}function _(D,k,X,U){x();let G=U.attributes,V=X.getAttributes(),P=k.defaultAttributeValues;for(let Y in V){let L=V[Y];if(L.location>=0){let J=G[Y];if(J===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(J=D.instanceColor)),J!==void 0){let I=J.normalized,te=J.itemSize,W=e.get(J);if(W===void 0)continue;let F=W.buffer,ee=W.type,re=W.bytesPerElement,Ne=ee===s.INT||ee===s.UNSIGNED_INT||J.gpuType===rc;if(J.isInterleavedBufferAttribute){let ye=J.data,Ce=ye.isInterleavedBuffer===!0?ye.stride:ye.itemSize,ct=J.offset;if(ye.isInstancedInterleavedBuffer||ye.isInstancedBufferAttribute){for(let De=0;De<L.locationSize;De++)m(L.location+De,ye.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let De=0;De<L.locationSize;De++)g(L.location+De);s.bindBuffer(s.ARRAY_BUFFER,F);for(let De=0;De<L.locationSize;De++)M(L.location+De,te/L.locationSize,ee,I,Ce*re,(ct+te/L.locationSize*De)*re,Ne)}else{if(J.isInstancedBufferAttribute){for(let ye=0;ye<L.locationSize;ye++)m(L.location+ye,J.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ye=0;ye<L.locationSize;ye++)g(L.location+ye);s.bindBuffer(s.ARRAY_BUFFER,F);for(let ye=0;ye<L.locationSize;ye++)M(L.location+ye,te/L.locationSize,ee,I,te*re,te/L.locationSize*ye*re,Ne)}}else if(P!==void 0){let I=P[Y];if(I!==void 0)switch(I.length){case 2:s.vertexAttrib2fv(L.location,I);break;case 3:s.vertexAttrib3fv(L.location,I);break;case 4:s.vertexAttrib4fv(L.location,I);break;default:s.vertexAttrib1fv(L.location,I)}}}}v()}function E(){A();for(let D in n){let k=n[D];for(let X in k){let U=k[X];for(let G in U){let V=U[G];for(let P in V)h(V[P].object),delete V[P];delete U[G]}}delete n[D]}}function S(D){if(n[D.id]===void 0)return;let k=n[D.id];for(let X in k){let U=k[X];for(let G in U){let V=U[G];for(let P in V)h(V[P].object),delete V[P];delete U[G]}}delete n[D.id]}function y(D){for(let k in n){let X=n[k];for(let U in X){let G=X[U];if(G[D.id]===void 0)continue;let V=G[D.id];for(let P in V)h(V[P].object),delete V[P];delete G[D.id]}}}function b(D){for(let k in n){let X=n[k],U=D.isInstancedMesh===!0?D.id:0,G=X[U];if(G!==void 0){for(let V in G){let P=G[V];for(let Y in P)h(P[Y].object),delete P[Y];delete G[V]}delete X[U],Object.keys(X).length===0&&delete n[k]}}}function A(){R(),a=!0,r!==i&&(r=i,l(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function Q_(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ey(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(y){return!(y!==ii&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(y){let b=y===pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==Gn&&y!==$n&&!b&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(ke("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&ke("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,maxSamples:E,samples:S}}function ty(s){let e=this,t=null,n=0,i=!1,r=!1,a=new ui,o=new Qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,m=s.get(f);if(!i||p===null||p.length===0||r&&!g)r?h(null):l();else{let v=r?0:n,M=v*4,_=m.clippingState||null;c.value=_,_=h(p,u,M,d);for(let E=0;E!==M;++E)_[E]=t[E];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,p){let x=f!==null?f.length:0,g=null;if(x!==0){if(g=c.value,p!==!0||g===null){let m=d+x*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,_=d;M!==x;++M,_+=4)a.copy(f[M]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var Co=class extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Za(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Pn(5,5,5),r=new Ot({name:"CubemapFromEquirect",uniforms:rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nn,blending:er});r.uniforms.tEquirect.value=t;let a=new Ke(i,r),o=t.minFilter;return t.minFilter===Hn&&(t.minFilter=jt),new $r(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},C0=256,ny=3,iy=20,j0=256,Q0=16,sy=3,ry=new N,ay=new we,Xc=class s{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new $r(1,10,null),this._boxMesh=new Ke(new Pn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=ry}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let f=c.autoClear,u=c.autoClearColor,d=c.autoClearDepth,p=c.autoClearStencil,x=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(e.background=c.getClearColor(ay));let g=new $r(n,i,h);return g.position.copy(o),g.update(c,e),c.autoClear=f,c.autoClearColor=u,c.autoClearDepth=d,c.autoClearStencil=p,e.background=x,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=L0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=P0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(C0,ku(e))}_fromTexture(e,t){e.mapping===nr||e.mapping===ea?this._setSize(e.image.length===0?C0:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=I0(e,!1,!1),n=Math.log2(e)-ny;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=I0(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===nr||e.mapping===ea?(this._cubemapMaterial===null&&(this._cubemapMaterial=L0()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=P0()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=oy(),this._integrationMaterial=ly());let t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Q0);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-sy)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(j0*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=cy());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(r,0,n)}};function I0(s,e,t){return new Co(s,{minFilter:Hn,generateMipmaps:e,type:pi,colorSpace:In,depthBuffer:t})}function Io(s,e,t){return new Ot({name:s,uniforms:e,vertexShader:lt.cube_vert,fragmentShader:t,side:Nn,blending:er,depthTest:!1,depthWrite:!1})}function oy(){return Io("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${j0}u

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
	`)}function ly(){return Io("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Q0}},`

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
	`)}function cy(){return Io("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${iy}
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
	`)}function P0(){return Io("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function L0(){return Io("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function hy(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===nc||d===ic)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let x=new Co(p.height);return x.fromEquirectangularTexture(s,u),e.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,p=d===nc||d===ic,x=d===nr||d===ea;if(p||x){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Xc(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let v=u.image;return p&&v&&v.height>0||x&&v&&c(v)?(n===null&&(n=new Xc(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===nc?u.mapping=nr:d===ic&&(u.mapping=ea),u}function c(u){let d=0,p=6;for(let x=0;x<p;x++)u[x]!==void 0&&d++;return d===p}function l(u){let d=u.target;d.removeEventListener("dispose",l);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function uy(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Gs("WebGLRenderer: "+n+" extension not supported."),i}}}function fy(s,e,t,n){let i={},r=new WeakMap,a=new FinalizationRegistry(p=>delete i[p]);function o(p){c(p.target)}function c(p){p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete i[p.id],a.unregister(p);let x=r.get(p);x&&(e.remove(x),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function l(p,x){return i[x.id]!==void 0||(x.addEventListener("dispose",o),i[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function h(p){let x=p.attributes;for(let g in x)e.update(x[g],s.ARRAY_BUFFER)}function f(p){let x=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let v=x!==null?x.array.length:g.array.length/3-1,M=g.count>=65535?Ga:Ha,_=new M(Math.ceil(v/3)*6,1),E=_.array;if(x!==null){let y=x.array;m=x.version;for(let b=0,A=0;b<v;b+=3){let R=y[b+0],D=y[b+1],k=y[b+2];E[A++]=R,E[A++]=D,E[A++]=D,E[A++]=k,E[A++]=k,E[A++]=R}}else{m=g.version;for(let y=0,b=0;y<v;y+=3){let A=y+0,R=y+1,D=y+2;E[b++]=A,E[b++]=R,E[b++]=R,E[b++]=D,E[b++]=D,E[b++]=A}}_.version=m;let S=r.get(p);S&&e.remove(S),r.set(p,_)}function u(p){let x=r.get(p);if(x){let g=p.index;g!==null&&x.version<g.version&&f(p)}else f(p);return r.get(p)}function d(){for(let p in i){let x=i[p].deref();x!==void 0&&c(x)}}return{get:l,update:h,getWireframeAttribute:u,dispose:d}}function dy(s,e,t){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){s.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let x=0;for(let g=0;g<d;g++)x+=u[g];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function py(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function my(s,e,t){let n=new WeakMap,i=new ut;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let A=function(){y.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],M=0;d===!0&&(M=1),p===!0&&(M=2),x===!0&&(M=3);let _=o.attributes.position.count*M,E=1;_>e.maxTextureSize&&(E=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let S=new Float32Array(_*E*4*f),y=new Ba(S,_,E,f);y.type=$n,y.needsUpdate=!0;let b=M*4;for(let R=0;R<f;R++){let D=g[R],k=m[R],X=v[R],U=_*E*4*R;for(let G=0;G<D.count;G++){let V=G*b;d===!0&&(i.fromBufferAttribute(D,G),S[U+V+0]=i.x,S[U+V+1]=i.y,S[U+V+2]=i.z,S[U+V+3]=0),p===!0&&(i.fromBufferAttribute(k,G),S[U+V+4]=i.x,S[U+V+5]=i.y,S[U+V+6]=i.z,S[U+V+7]=0),x===!0&&(i.fromBufferAttribute(X,G),S[U+V+8]=i.x,S[U+V+9]=i.y,S[U+V+10]=i.z,S[U+V+11]=X.itemSize===4?i.w:1)}}u={count:f,texture:y,size:new ce(_,E)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let p=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(s,"morphTargetBaseInfluence",p),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function gy(s,e,t,n,i){let r=new WeakMap;function a(l){let h=i.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var xy={[_u]:"LINEAR_TONE_MAPPING",[yu]:"REINHARD_TONE_MAPPING",[Mu]:"CINEON_TONE_MAPPING",[bu]:"ACES_FILMIC_TONE_MAPPING",[Eu]:"AGX_TONE_MAPPING",[wu]:"NEUTRAL_TONE_MAPPING",[Su]:"CUSTOM_TONE_MAPPING"};function vy(s,e,t,n,i,r){let a=new Yn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,h=new _t;h.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new We([0,2,0,0,2,0],2));let f=new Wl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Ke(h,f),d=new Qs(-1,1,1,-1,0,1),p=null,x=null,g=!1,m,v=null,M=[],_=!1;this.setSize=function(E,S){a.setSize(E,S),o!==null&&o.setSize(E,S),c!==null&&c.setSize(E,S);for(let y=0;y<M.length;y++){let b=M[y];b.setSize&&b.setSize(E,S)}},this.setEffects=function(E){M=E,_=M.length>0&&M[0].isRenderPass===!0;let S=a.width,y=a.height;M.length>0&&o===null&&(o=new Yn(S,y,{type:pi,depthBuffer:!1,stencilBuffer:!1}),c=new Yn(S,y,{type:pi,depthBuffer:!1,stencilBuffer:!1}));let b=i===!0&&M.some(A=>A.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&l===null&&(l=new qi(S,y),r===!0&&(l.format=is,l.type=sr)),a.dispose(),a.depthTexture=b?l:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let A=0;A<M.length;A++){let R=M[A];R.setSize&&R.setSize(S,y),b&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(l)}},this.begin=function(E,S){if(g||E.toneMapping===Ti&&M.length===0)return!1;if(v=S,S!==null){let y=S.width,b=S.height;(a.width!==y||a.height!==b)&&this.setSize(y,b)}return _===!1&&E.setRenderTarget(a),m=E.toneMapping,E.toneMapping=Ti,!0},this.hasRenderPass=function(){return _},this.end=function(E,S){E.toneMapping=m,g=!0;let y=a,b=o;for(let A=0;A<M.length;A++){let R=M[A];R.enabled!==!1&&(R.render(E,b,y,S),R.needsSwap!==!1&&(y=b,b=b===o?c:o))}if(p!==E.outputColorSpace||x!==E.toneMapping){p=E.outputColorSpace,x=E.toneMapping,f.defines={},ht.getTransfer(p)===At&&(f.defines.SRGB_TRANSFER="");let A=xy[x];A&&(f.defines[A]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=y.texture,E.setRenderTarget(v),E.render(u,d),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),f.dispose()}}var em=new ln,tm=new qi(1,1),nm=new Ka(1),im=new Ba,sm=new Ul,rm=new Za,N0=[],D0=[],U0=new Float32Array(16),F0=new Float32Array(9),O0=new Float32Array(4);function aa(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=N0[i];if(r===void 0&&(r=new Float32Array(i),N0[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function hn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function un(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Yc(s,e){let t=D0[e];t===void 0&&(t=new Int32Array(e),D0[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function _y(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function yy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;s.uniform2fv(this.addr,e),un(t,e)}}function My(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;s.uniform3fv(this.addr,e),un(t,e)}}function by(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;s.uniform4fv(this.addr,e),un(t,e)}}function Sy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;O0.set(n),s.uniformMatrix2fv(this.addr,!1,O0),un(t,n)}}function Ey(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;F0.set(n),s.uniformMatrix3fv(this.addr,!1,F0),un(t,n)}}function wy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;U0.set(n),s.uniformMatrix4fv(this.addr,!1,U0),un(t,n)}}function Ty(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Ay(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;s.uniform2iv(this.addr,e),un(t,e)}}function Ry(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;s.uniform3iv(this.addr,e),un(t,e)}}function Cy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;s.uniform4iv(this.addr,e),un(t,e)}}function Iy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Py(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;s.uniform2uiv(this.addr,e),un(t,e)}}function Ly(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;s.uniform3uiv(this.addr,e),un(t,e)}}function Ny(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;s.uniform4uiv(this.addr,e),un(t,e)}}function Zc(s){return s.version===0&&(s.compareFunction=Fu,s.needsUpdate=!0),s}function Dy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Zc(tm):r=em,t.setTexture2D(e||r,i)}function Uy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||sm,i)}function Fy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Zc(nm):r=rm,t.setTextureCube(e||r,i)}function Oy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||im,i)}function By(s){switch(s){case 5126:return _y;case 35664:return yy;case 35665:return My;case 35666:return by;case 35674:return Sy;case 35675:return Ey;case 35676:return wy;case 5124:case 35670:return Ty;case 35667:case 35671:return Ay;case 35668:case 35672:return Ry;case 35669:case 35673:return Cy;case 5125:return Iy;case 36294:return Py;case 36295:return Ly;case 36296:return Ny;case 35678:case 36198:case 36298:case 36306:case 35682:return Dy;case 35679:case 36299:case 36307:return Uy;case 35680:case 36300:case 36308:case 36293:return Fy;case 36289:case 36303:case 36311:case 36292:return Oy}}function zy(s,e){s.uniform1fv(this.addr,e)}function ky(s,e){let t=aa(e,this.size,2);s.uniform2fv(this.addr,t)}function Hy(s,e){let t=aa(e,this.size,3);s.uniform3fv(this.addr,t)}function Gy(s,e){let t=aa(e,this.size,4);s.uniform4fv(this.addr,t)}function Vy(s,e){let t=aa(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Wy(s,e){let t=aa(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Xy(s,e){let t=aa(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function qy(s,e){s.uniform1iv(this.addr,e)}function Yy(s,e){s.uniform2iv(this.addr,e)}function Zy(s,e){s.uniform3iv(this.addr,e)}function Ky(s,e){s.uniform4iv(this.addr,e)}function Jy(s,e){s.uniform1uiv(this.addr,e)}function $y(s,e){s.uniform2uiv(this.addr,e)}function jy(s,e){s.uniform3uiv(this.addr,e)}function Qy(s,e){s.uniform4uiv(this.addr,e)}function eM(s,e,t){let n=this.cache,i=e.length,r=Yc(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Zc(tm):a=em;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function tM(s,e,t){let n=this.cache,i=e.length,r=Yc(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||sm,r[a])}function nM(s,e,t){let n=this.cache,i=e.length,r=Yc(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Zc(nm):a=rm;for(let o=0;o!==i;++o)t.setTextureCube(e[o]||a,r[o])}function iM(s,e,t){let n=this.cache,i=e.length,r=Yc(t,i);hn(n,r)||(s.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||im,r[a])}function sM(s){switch(s){case 5126:return zy;case 35664:return ky;case 35665:return Hy;case 35666:return Gy;case 35674:return Vy;case 35675:return Wy;case 35676:return Xy;case 5124:case 35670:return qy;case 35667:case 35671:return Yy;case 35668:case 35672:return Zy;case 35669:case 35673:return Ky;case 5125:return Jy;case 36294:return $y;case 36295:return jy;case 36296:return Qy;case 35678:case 36198:case 36298:case 36306:case 35682:return eM;case 35679:case 36299:case 36307:return tM;case 35680:case 36300:case 36308:case 36293:return nM;case 36289:case 36303:case 36311:case 36292:return iM}}var tf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=By(t.type)}},nf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sM(t.type)}},sf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Qu=/(\w+)(\])?(\[|\.)?/g;function B0(s,e){s.seq.push(e),s.map[e.id]=e}function rM(s,e,t){let n=s.name,i=n.length;for(Qu.lastIndex=0;;){let r=Qu.exec(n),a=Qu.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){B0(t,l===void 0?new tf(o,s,e):new nf(o,s,e));break}else{let f=t.map[o];f===void 0&&(f=new sf(o),B0(t,f)),t=f}}}var ra=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);rM(o,c,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function z0(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var aM=37297,oM=0;function lM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var k0=new Qe;function cM(s){ht._getMatrix(k0,ht.workingColorSpace,s);let e=`mat3( ${k0.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(s)){case Fa:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function H0(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+lM(s.getShaderSource(e),o)}else return r}function hM(s,e){let t=cM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var uM={[_u]:"Linear",[yu]:"Reinhard",[Mu]:"Cineon",[bu]:"ACESFilmic",[Eu]:"AgX",[wu]:"Neutral",[Su]:"Custom"};function fM(s,e){let t=uM[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Wc=new N;function dM(){ht.getLuminanceCoefficients(Wc);let s=Wc.x.toFixed(4),e=Wc.y.toFixed(4),t=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ro).join(`
`)}function mM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function gM(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ro(s){return s!==""}function G0(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function V0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var xM=/^[ \t]*#include +<([\w\d./]+)>/gm;function rf(s){return s.replace(xM,vM)}function vM(s,e){let t=lt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return rf(t)}var _M=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function W0(s){return s.replace(_M,yM)}function yM(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function X0(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var MM={[vo]:"SHADOWMAP_TYPE_PCF",[jr]:"SHADOWMAP_TYPE_VSM"};function bM(s){return MM[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var SM={[ea]:"ENVMAP_MODE_REFRACTION"};function EM(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":SM[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var wM={[_o]:"ENVMAP_BLENDING_MULTIPLY",[r0]:"ENVMAP_BLENDING_MIX",[a0]:"ENVMAP_BLENDING_ADD"};function TM(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":wM[s.combine]||"ENVMAP_BLENDING_NONE"}function AM(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=bM(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=EM(t),f=TM(t),u=pM(t),d=mM(r),p=i.createProgram(),x,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Ro).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Ro).join(`
`),g.length>0&&(g+=`
`)):(x=[X0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ro).join(`
`),g=[X0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ti?"#define TONE_MAPPING":"",t.toneMapping!==Ti?lt.tonemapping_pars_fragment:"",t.toneMapping!==Ti?fM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,hM("linearToOutputTexel",t.outputColorSpace),dM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ro).join(`
`)),a=rf(a),a=G0(a,t),a=V0(a,t),o=rf(o),o=G0(o,t),o=V0(o,t),a=W0(a),o=W0(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,x=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===Bu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let v=m+x+a,M=m+g+o,_=z0(i,i.VERTEX_SHADER,v),E=z0(i,i.FRAGMENT_SHADER,M);i.attachShader(p,_),i.attachShader(p,E),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function S(R){if(s.debug.checkShaderErrors){let D=i.getProgramInfoLog(p)||"",k=i.getShaderInfoLog(_)||"",X=i.getShaderInfoLog(E)||"",U=D.trim(),G=k.trim(),V=X.trim(),P=!0,Y=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(P=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,_,E);else{let L=H0(i,_,"vertex"),J=H0(i,E,"fragment");je("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+L+`
`+J)}else U!==""?ke("WebGLProgram: Program Info Log:",U):(G===""||V==="")&&(Y=!1);Y&&(R.diagnostics={runnable:P,programLog:U,vertexShader:{log:G,prefix:x},fragmentShader:{log:V,prefix:g}})}i.deleteShader(_),i.deleteShader(E),y=new ra(i,p),b=gM(i,p)}let y;this.getUniforms=function(){return y===void 0&&S(this),y};let b;this.getAttributes=function(){return b===void 0&&S(this),b};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(p,aM)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=oM++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=_,this.fragmentShader=E,this}var RM=0,af=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new of(e),t.set(e,n)),n}},of=class{constructor(e){this.id=RM++,this.code=e,this.usedTimes=0}};function CM(s){return s===Es||s===Eo||s===wo}function IM(s,e,t,n,i,r){let a=new za,o=new af,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(y){return c.add(y),y===0?"uv":`uv${y}`}function p(y,b,A,R,D,k){let X=R.fog,U=D.geometry,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,P=e.get(y.envMap||G,V),Y=u[y.type],L=n.precision;y.precision!==null&&(L=n.getMaxPrecision(y.precision),L!==y.precision&&ke("WebGLProgram.getParameters:",y.precision,"not supported, using",L,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,I=J!==void 0?J.length:0,te=0;U.morphAttributes.position!==void 0&&(te=1),U.morphAttributes.normal!==void 0&&(te=2),U.morphAttributes.color!==void 0&&(te=3);let W,F,ee,re;if(Y){let Ee=Ri[Y];W=Ee.vertexShader,F=Ee.fragmentShader}else{W=y.vertexShader,F=y.fragmentShader;let Ee=o.getVertexShaderStage(y),Ct=o.getFragmentShaderStage(y);o.update(y,Ee,Ct),ee=Ee.id,re=Ct.id}let Ne=s.getRenderTarget(),ye=s.state.buffers.depth.getReversed(),Ce=D.isInstancedMesh===!0,ct=D.isBatchedMesh===!0,De=!!y.map,Je=!!y.matcap,$e=!!P,se=$e&&P.isPMREMTexture===!0,he=!!y.aoMap,le=!!y.lightMap,Ae=!!y.bumpMap&&y.wireframe===!1,ge=!!y.normalMap,Xe=!!y.displacementMap,Le=!!y.emissiveMap,nt=!!y.metalnessMap,it=!!y.roughnessMap,mt=y.anisotropy>0,z=y.clearcoat>0,Kt=y.diffuseRoughness>0,st=y.dispersion>0,St=y.retroreflectivity>0,xe=y.iridescence>0,Nt=y.sheen>0,Ve=y.transmission>0,Ye=mt&&!!y.anisotropyMap,C=z&&!!y.clearcoatMap,w=z&&!!y.clearcoatNormalMap,q=z&&!!y.clearcoatRoughnessMap,oe=Kt&&!!y.diffuseRoughnessMap,j=xe&&!!y.iridescenceMap,ue=xe&&!!y.iridescenceThicknessMap,ve=Nt&&!!y.sheenColorMap,ie=Nt&&!!y.sheenRoughnessMap,ne=!!y.specularMap,me=!!y.specularColorMap,O=!!y.specularIntensityMap,H=Ve&&!!y.transmissionMap,K=Ve&&!!y.thicknessMap,de=!!y.gradientMap,pe=!!y.alphaMap,_e=y.alphaTest>0,He=!!y.alphaHash,at=!!y.extensions,fe=Ti;y.toneMapped&&(Ne===null||Ne.isXRRenderTarget===!0)&&(fe=s.toneMapping);let qe=se?P.isCompressedCubeTexture?P.image[0].mipmaps:P.mipmaps:null,rt={shaderID:Y,shaderType:y.type,shaderName:y.name,vertexShader:W,fragmentShader:F,defines:y.defines,customVertexShaderID:ee,customFragmentShaderID:re,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:L,batching:ct,batchingColor:ct&&D._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&D.instanceColor!==null,instancingMorph:Ce&&D.morphTexture!==null,outputColorSpace:Ne===null?s.outputColorSpace:Ne.isXRRenderTarget===!0?Ne.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:De,matcap:Je,envMap:$e,envMapMode:$e&&P.mapping,envMapPMREM:se,envMapMaxLod:se?qe.length-1:null,envMapSize:se?qe[0].width:null,aoMap:he,lightMap:le,bumpMap:Ae,normalMap:ge,displacementMap:Xe,emissiveMap:Le,normalMapObjectSpace:ge&&y.normalMapType===h0,normalMapTangentSpace:ge&&y.normalMapType===sa,packedNormalMap:ge&&y.normalMapType===sa&&CM(y.normalMap.format),metalnessMap:nt,roughnessMap:it,anisotropy:mt,anisotropyMap:Ye,clearcoat:z,clearcoatMap:C,clearcoatNormalMap:w,clearcoatRoughnessMap:q,diffuseRoughness:Kt,diffuseRoughnessMap:oe,dispersion:st,retroreflection:St,iridescence:xe,iridescenceMap:j,iridescenceThicknessMap:ue,sheen:Nt,sheenColorMap:ve,sheenRoughnessMap:ie,specularMap:ne,specularColorMap:me,specularIntensityMap:O,transmission:Ve,transmissionMap:H,thicknessMap:K,gradientMap:de,opaque:y.transparent===!1&&y.blending===Qr&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:_e,alphaHash:He,combine:y.combine,mapUv:De&&d(y.map.channel),aoMapUv:he&&d(y.aoMap.channel),lightMapUv:le&&d(y.lightMap.channel),bumpMapUv:Ae&&d(y.bumpMap.channel),normalMapUv:ge&&d(y.normalMap.channel),displacementMapUv:Xe&&d(y.displacementMap.channel),emissiveMapUv:Le&&d(y.emissiveMap.channel),metalnessMapUv:nt&&d(y.metalnessMap.channel),roughnessMapUv:it&&d(y.roughnessMap.channel),anisotropyMapUv:Ye&&d(y.anisotropyMap.channel),clearcoatMapUv:C&&d(y.clearcoatMap.channel),clearcoatNormalMapUv:w&&d(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&d(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&d(y.diffuseRoughnessMap.channel),iridescenceMapUv:j&&d(y.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&d(y.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&d(y.sheenColorMap.channel),sheenRoughnessMapUv:ie&&d(y.sheenRoughnessMap.channel),specularMapUv:ne&&d(y.specularMap.channel),specularColorMapUv:me&&d(y.specularColorMap.channel),specularIntensityMapUv:O&&d(y.specularIntensityMap.channel),transmissionMapUv:H&&d(y.transmissionMap.channel),thicknessMapUv:K&&d(y.thicknessMap.channel),alphaMapUv:pe&&d(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ge||mt),vertexNormals:!!U.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&(De||pe),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||U.attributes.normal===void 0&&ge===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ye,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:te,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:k.filter(Ee=>Ee.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&A.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:De&&y.map.isVideoTexture===!0&&ht.getTransfer(y.map.colorSpace)===At,decodeVideoTextureEmissive:Le&&y.emissiveMap.isVideoTexture===!0&&ht.getTransfer(y.emissiveMap.colorSpace)===At,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ht,flipSided:y.side===Nn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:at&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&y.extensions.multiDraw===!0||ct)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return rt.vertexUv1s=c.has(1),rt.vertexUv2s=c.has(2),rt.vertexUv3s=c.has(3),c.clear(),rt}function x(y){let b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(let A in y.defines)b.push(A),b.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(g(b,y),m(b,y),b.push(s.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function g(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapPMREM),y.push(b.envMapMaxLod),y.push(b.envMapSize),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.diffuseRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.numSunLights),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numSunLightShadows),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.numLightProbeGrids),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function m(y,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function v(y){let b=u[y.type],A;if(b){let R=Ri[b];A=T0.clone(R.uniforms)}else A=y.uniforms;return A}function M(y,b){let A=h.get(b);return A!==void 0?++A.usedTimes:(A=new AM(s,b,y,i),l.push(A),h.set(b,A)),A}function _(y){if(--y.usedTimes===0){let b=l.indexOf(y);l[b]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function S(){o.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:v,acquireProgram:M,releaseProgram:_,releaseShaderCache:E,programs:l,dispose:S}}function PM(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function LM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function q0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Y0(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,x,g,m){let v=s[e];return v===void 0?(v={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},s[e]=v):(v.id=u.id,v.object=u,v.geometry=d,v.material=p,v.materialVariant=a(u),v.groupOrder=x,v.renderOrder=u.renderOrder,v.z=g,v.group=m),e++,v}function c(u,d,p,x,g,m,v){v.reversedDepth===!0&&(g=-g);let M=o(u,d,p,x,g,m);p.transmission>0?n.push(M):p.transparent===!0?i.push(M):t.push(M)}function l(u,d,p,x,g,m){let v=o(u,d,p,x,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):t.unshift(v)}function h(u,d){t.length>1&&t.sort(u||LM),n.length>1&&n.sort(d||q0),i.length>1&&i.sort(d||q0)}function f(){for(let u=e,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:f,sort:h}}function NM(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Y0,s.set(n,[a])):i>=r.length?(a=new Y0,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function DM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new we};break;case"SpotLight":t={position:new N,direction:new N,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new N,halfWidth:new N,halfHeight:new N};break}return s[e.id]=t,t}}}function UM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var FM=0;function OM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function BM(s){let e=new DM,t=UM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let i=new N,r=new Ge,a=new Ge;function o(l){let h=0,f=0,u=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let d=0,p=0,x=0,g=0,m=0,v=0,M=0,_=0,E=0,S=0,y=0,b=0,A=0,R=0;l.sort(OM);for(let k=0,X=l.length;k<X;k++){let U=l[k],G=U.color,V=U.intensity,P=U.distance,Y=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Es?Y=U.shadow.map.texture:Y=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=G.r*V,f+=G.g*V,u+=G.b*V;else if(U.isLightProbe){for(let L=0;L<9;L++)n.probe[L].addScaledVector(U.sh.coefficients[L],V);R++}else if(U.isSunLight){let L=e.get(U);if(L.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let J=U.shadow,I=t.get(U);I.shadowIntensity=J.intensity,I.shadowBias=J.bias,I.shadowNormalBias=J.normalBias,I.shadowRadius=J.radius,I.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[p]=I,n.sunShadowMap[p]=Y;let te=J.getViewportCount();for(let W=0;W<te;W++)n.sunShadowMatrix[x+W]=J.getMatrix(W),n.sunShadowCascade[x+W]=J._cascadeData[W];x+=te,p++}n.sun[d]=L,d++}else if(U.isDirectionalLight){let L=e.get(U);if(L.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let J=U.shadow,I=t.get(U);I.shadowIntensity=J.intensity,I.shadowBias=J.bias,I.shadowNormalBias=J.normalBias,I.shadowRadius=J.radius,I.shadowMapSize=J.mapSize,n.directionalShadow[g]=I,n.directionalShadowMap[g]=Y,n.directionalShadowMatrix[g]=U.shadow.matrix,E++}n.directional[g]=L,g++}else if(U.isSpotLight){let L=e.get(U);L.position.setFromMatrixPosition(U.matrixWorld),L.color.copy(G).multiplyScalar(V),L.distance=P,L.coneCos=Math.cos(U.angle),L.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),L.decay=U.decay,n.spot[v]=L;let J=U.shadow;if(U.map&&(n.spotLightMap[b]=U.map,b++,J.updateMatrices(U),U.castShadow&&A++),n.spotLightMatrix[v]=J.matrix,U.castShadow){let I=t.get(U);I.shadowIntensity=J.intensity,I.shadowBias=J.bias,I.shadowNormalBias=J.normalBias,I.shadowRadius=J.radius,I.shadowMapSize=J.mapSize,n.spotShadow[v]=I,n.spotShadowMap[v]=Y,y++}v++}else if(U.isRectAreaLight){let L=e.get(U);L.color.copy(G).multiplyScalar(V),L.halfWidth.set(U.width*.5,0,0),L.halfHeight.set(0,U.height*.5,0),n.rectArea[M]=L,M++}else if(U.isPointLight){let L=e.get(U);if(L.color.copy(U.color).multiplyScalar(U.intensity),L.distance=U.distance,L.decay=U.decay,U.castShadow){let J=U.shadow,I=t.get(U);I.shadowIntensity=J.intensity,I.shadowBias=J.bias,I.shadowNormalBias=J.normalBias,I.shadowRadius=J.radius,I.shadowMapSize=J.mapSize,I.shadowCameraNear=J.camera.near,I.shadowCameraFar=J.camera.far,n.pointShadow[m]=I,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=U.shadow.matrix,S++}n.point[m]=L,m++}else if(U.isHemisphereLight){let L=e.get(U);L.skyColor.copy(U.color).multiplyScalar(V),L.groundColor.copy(U.groundColor).multiplyScalar(V),n.hemi[_]=L,_++}}M>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Te.LTC_FLOAT_1,n.rectAreaLTC2=Te.LTC_FLOAT_2):(n.rectAreaLTC1=Te.LTC_HALF_1,n.rectAreaLTC2=Te.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let D=n.hash;(D.sunLength!==d||D.directionalLength!==g||D.pointLength!==m||D.spotLength!==v||D.rectAreaLength!==M||D.hemiLength!==_||D.numSunShadows!==p||D.numDirectionalShadows!==E||D.numPointShadows!==S||D.numSpotShadows!==y||D.numSpotMaps!==b||D.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=g,n.spot.length=v,n.rectArea.length=M,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+b-A,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,D.sunLength=d,D.directionalLength=g,D.pointLength=m,D.spotLength=v,D.rectAreaLength=M,D.hemiLength=_,D.numSunShadows=p,D.numDirectionalShadows=E,D.numPointShadows=S,D.numSpotShadows=y,D.numSpotMaps=b,D.numLightProbes=R,n.version=FM++)}function c(l,h){let f=0,u=0,d=0,p=0,x=0,g=0,m=h.matrixWorldInverse;for(let v=0,M=l.length;v<M;v++){let _=l[v];if(_.isSunLight){let E=n.sun[f];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(m),f++}else if(_.isDirectionalLight){let E=n.directional[u];E.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(m),u++}else if(_.isSpotLight){let E=n.spot[p];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let E=n.rectArea[x];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){let E=n.point[d];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){let E=n.hemi[g];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function Z0(s){let e=new BM(s),t=[],n=[],i=[];function r(f){h.camera=f,t.length=0,n.length=0,i.length=0}function a(f){f.isLightProbeGrid?i.push(f):t.push(f)}function o(f){n.push(f)}function c(){e.setup(t),i.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function l(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function zM(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Z0(s),e.set(i,[o])):r>=a.length?(o=new Z0(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var kM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HM=`uniform sampler2D shadow_pass;
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
}`,GM=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],VM=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],K0=new Ge,Ao=new N,ef=new N;function WM(s,e,t){let n=new _s,i=new ce,r=new ce,a=new ut,o=new Xl,c=new ql,l={},h=t.maxTextureSize,f={[ni]:Nn,[Nn]:ni,[Ht]:Ht},u=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:kM,fragmentShader:HM}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new _t;p.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ke(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vo;let m=this.type;this.render=function(S,y,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===kp&&(ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=vo);let A=s.getRenderTarget(),R=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),k=s.state;k.setBlending(er),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let X=m!==this.type;X&&y.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(G=>G.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,G=S.length;U<G;U++){let V=S[U],P=V.shadow;if(P===void 0){ke("WebGLShadowMap:",V,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;i.copy(P.mapSize);let Y=P.getFrameExtents();i.multiply(Y),r.copy(P.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Y.x),i.x=r.x*Y.x,P.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Y.y),i.y=r.y*Y.y,P.mapSize.y=r.y));let L=s.state.buffers.depth.getReversed();if(P.camera._reversedDepth=L,P.map===null||X===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===jr){if(V.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new Yn(i.x,i.y,{format:Es,type:pi,minFilter:jt,magFilter:jt,generateMipmaps:!1}),P.map.texture.name=V.name+".shadowMap",P.map.depthTexture=new qi(i.x,i.y,$n),P.map.depthTexture.name=V.name+".shadowMapDepth",P.map.depthTexture.format=Xi,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=$t,P.map.depthTexture.magFilter=$t}else V.isPointLight?(P.map=new Co(i.x),P.map.depthTexture=new Ka(i.x,di)):(P.map=new Yn(i.x,i.y),P.map.depthTexture=new qi(i.x,i.y,di)),P.map.depthTexture.name=V.name+".shadowMap",P.map.depthTexture.format=Xi,this.type===vo?(P.map.depthTexture.compareFunction=L?Uu:Du,P.map.depthTexture.minFilter=jt,P.map.depthTexture.magFilter=jt):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=$t,P.map.depthTexture.magFilter=$t);P.camera.updateProjectionMatrix()}P.map.isWebGLCubeRenderTarget!==!0&&(P.map.width!==i.x||P.map.height!==i.y)&&P.map.setSize(i.x,i.y);let J=P.map.isWebGLCubeRenderTarget?6:P.getViewportCount();V.isPointLight!==!0&&P.updateMatrices(V,b);let I=(P.camera.layers.mask&4294967294)!==0?P.camera.layers:b.layers;for(let te=0;te<J;te++){let W=P.getCamera(te);if(V.isPointLight){let F=P.camera,ee=P.matrix,re=V.distance||F.far;re!==F.far&&(F.far=re,F.updateProjectionMatrix()),Ao.setFromMatrixPosition(V.matrixWorld),F.position.copy(Ao),ef.copy(F.position),ef.add(GM[te]),F.up.copy(VM[te]),F.lookAt(ef),F.updateMatrixWorld(),ee.makeTranslation(-Ao.x,-Ao.y,-Ao.z),K0.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),P._frustum.setFromProjectionMatrix(K0,F.coordinateSystem,F.reversedDepth)}if(P.map.isWebGLCubeRenderTarget)s.setRenderTarget(P.map,te),s.clear();else{te===0&&(s.setRenderTarget(P.map),s.clear());let F=P.getViewport(te);a.set(r.x*F.x,r.y*F.y,r.x*F.z,r.y*F.w),k.viewport(a)}n=P.getFrustum(te),_(y,b,W,V,I,this.type)}P.isPointLightShadow!==!0&&this.type===jr&&v(P,b),P.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(A,R,D)};function v(S,y){let b=e.update(x);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new Yn(i.x,i.y,{format:Es,type:pi}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(y,null,b,u,x,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(y,null,b,d,x,null)}function M(S,y,b,A){let R=null,D=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(D!==void 0)R=D;else if(R=b.isPointLight===!0?c:o,s.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let k=R.uuid,X=y.uuid,U=l[k];U===void 0&&(U={},l[k]=U);let G=U[X];G===void 0&&(G=R.clone(),U[X]=G,y.addEventListener("dispose",E)),R=G}if(R.visible=y.visible,R.wireframe=y.wireframe,A===jr?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:f[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let k=s.properties.get(R);k.light=b}return R}function _(S,y,b,A,R,D){if(S.visible===!1)return;if(S.layers.test(R)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&D===jr)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);let U=e.update(S),G=S.material;if(Array.isArray(G)){let V=U.groups;for(let P=0,Y=V.length;P<Y;P++){let L=V[P],J=G[L.materialIndex];if(J&&J.visible){let I=M(S,J,A,D);S.onBeforeShadow(s,S,y,b,U,I,L),s.renderBufferDirect(b,null,U,I,S,L),S.onAfterShadow(s,S,y,b,U,I,L)}}}else if(G.visible){let V=M(S,G,A,D);S.onBeforeShadow(s,S,y,b,U,V,null),s.renderBufferDirect(b,null,U,V,S,null),S.onAfterShadow(s,S,y,b,U,V,null)}}let X=S.children;for(let U=0,G=X.length;U<G;U++)_(X[U],y,b,A,R,D)}function E(S){S.target.removeEventListener("dispose",E);for(let b in l){let A=l[b],R=S.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function XM(s,e){function t(){let O=!1,H=new ut,K=null,de=new ut(0,0,0,0);return{setMask:function(pe){K!==pe&&!O&&(s.colorMask(pe,pe,pe,pe),K=pe)},setLocked:function(pe){O=pe},setClear:function(pe,_e,He,at,fe){fe===!0&&(pe*=at,_e*=at,He*=at),H.set(pe,_e,He,at),de.equals(H)===!1&&(s.clearColor(pe,_e,He,at),de.copy(H))},reset:function(){O=!1,K=null,de.set(-1,0,0,0)}}}function n(){let O=!1,H=!1,K=null,de=null,pe=null;return{setReversed:function(_e){if(H!==_e){let He=e.get("EXT_clip_control");_e?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),H=_e;let at=pe;pe=null,this.setClear(at)}},getReversed:function(){return H},setTest:function(_e){_e?ye(s.DEPTH_TEST):Ce(s.DEPTH_TEST)},setMask:function(_e){K!==_e&&!O&&(s.depthMask(_e),K=_e)},setFunc:function(_e){if(H&&(_e=y0[_e]),de!==_e){switch(_e){case Tl:s.depthFunc(s.NEVER);break;case Al:s.depthFunc(s.ALWAYS);break;case Rl:s.depthFunc(s.LESS);break;case Lr:s.depthFunc(s.LEQUAL);break;case Cl:s.depthFunc(s.EQUAL);break;case Il:s.depthFunc(s.GEQUAL);break;case Pl:s.depthFunc(s.GREATER);break;case Ll:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}de=_e}},setLocked:function(_e){O=_e},setClear:function(_e){pe!==_e&&(pe=_e,H&&(_e=1-_e),s.clearDepth(_e))},reset:function(){O=!1,K=null,de=null,pe=null,H=!1}}}function i(){let O=!1,H=null,K=null,de=null,pe=null,_e=null,He=null,at=null,fe=null;return{setTest:function(qe){O||(qe?ye(s.STENCIL_TEST):Ce(s.STENCIL_TEST))},setMask:function(qe){H!==qe&&!O&&(s.stencilMask(qe),H=qe)},setFunc:function(qe,rt,Ee){(K!==qe||de!==rt||pe!==Ee)&&(s.stencilFunc(qe,rt,Ee),K=qe,de=rt,pe=Ee)},setOp:function(qe,rt,Ee){(_e!==qe||He!==rt||at!==Ee)&&(s.stencilOp(qe,rt,Ee),_e=qe,He=rt,at=Ee)},setLocked:function(qe){O=qe},setClear:function(qe){fe!==qe&&(s.clearStencil(qe),fe=qe)},reset:function(){O=!1,H=null,K=null,de=null,pe=null,_e=null,He=null,at=null,fe=null}}}let r=new t,a=new n,o=new i,c={},l=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,E=null,S=null,y=null,b=new we(0,0,0),A=0,R=!1,D=null,k=null,X=null,U=null,G=null,V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,Y=0,L=s.getParameter(s.VERSION);L.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(L)[1]),P=Y>=1):L.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),P=Y>=2);let J=null,I={},te=s.getParameter(s.SCISSOR_BOX),W=s.getParameter(s.VIEWPORT),F=new ut().fromArray(te),ee=new ut().fromArray(W);function re(O,H,K,de){let pe=new Uint8Array(4),_e=s.createTexture();s.bindTexture(O,_e),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let He=0;He<K;He++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(H,0,s.RGBA,1,1,de,0,s.RGBA,s.UNSIGNED_BYTE,pe):s.texImage2D(H+He,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pe);return _e}let Ne={};Ne[s.TEXTURE_2D]=re(s.TEXTURE_2D,s.TEXTURE_2D,1),Ne[s.TEXTURE_CUBE_MAP]=re(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ne[s.TEXTURE_2D_ARRAY]=re(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ne[s.TEXTURE_3D]=re(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(s.DEPTH_TEST),a.setFunc(Lr),Ae(!1),ge(du),ye(s.CULL_FACE),he(er);function ye(O){h[O]!==!0&&(s.enable(O),h[O]=!0)}function Ce(O){h[O]!==!1&&(s.disable(O),h[O]=!1)}function ct(O,H){return u[O]!==H?(s.bindFramebuffer(O,H),u[O]=H,O===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=H),O===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=H),!0):!1}function De(O,H){let K=p,de=!1;if(O){K=d.get(H),K===void 0&&(K=[],d.set(H,K));let pe=O.textures;if(K.length!==pe.length||K[0]!==s.COLOR_ATTACHMENT0){for(let _e=0,He=pe.length;_e<He;_e++)K[_e]=s.COLOR_ATTACHMENT0+_e;K.length=pe.length,de=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,de=!0);de&&s.drawBuffers(K)}function Je(O){return x!==O?(s.useProgram(O),x=O,!0):!1}let $e={[tr]:s.FUNC_ADD,[Gp]:s.FUNC_SUBTRACT,[Vp]:s.FUNC_REVERSE_SUBTRACT};$e[Wp]=s.MIN,$e[Xp]=s.MAX;let se={[qp]:s.ZERO,[Yp]:s.ONE,[Zp]:s.SRC_COLOR,[xu]:s.SRC_ALPHA,[e0]:s.SRC_ALPHA_SATURATE,[jp]:s.DST_COLOR,[Jp]:s.DST_ALPHA,[Kp]:s.ONE_MINUS_SRC_COLOR,[vu]:s.ONE_MINUS_SRC_ALPHA,[Qp]:s.ONE_MINUS_DST_COLOR,[$p]:s.ONE_MINUS_DST_ALPHA,[t0]:s.CONSTANT_COLOR,[n0]:s.ONE_MINUS_CONSTANT_COLOR,[i0]:s.CONSTANT_ALPHA,[s0]:s.ONE_MINUS_CONSTANT_ALPHA};function he(O,H,K,de,pe,_e,He,at,fe,qe){if(O===er){g===!0&&(Ce(s.BLEND),g=!1);return}if(g===!1&&(ye(s.BLEND),g=!0),O!==Hp){if(O!==m||qe!==R){if((v!==tr||E!==tr)&&(s.blendEquation(s.FUNC_ADD),v=tr,E=tr),qe)switch(O){case Qr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pu:s.blendFunc(s.ONE,s.ONE);break;case mu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:je("WebGLState: Invalid blending: ",O);break}else switch(O){case Qr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pu:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case mu:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gu:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",O);break}M=null,_=null,S=null,y=null,b.set(0,0,0),A=0,m=O,R=qe}return}pe=pe||H,_e=_e||K,He=He||de,(H!==v||pe!==E)&&(s.blendEquationSeparate($e[H],$e[pe]),v=H,E=pe),(K!==M||de!==_||_e!==S||He!==y)&&(s.blendFuncSeparate(se[K],se[de],se[_e],se[He]),M=K,_=de,S=_e,y=He),(at.equals(b)===!1||fe!==A)&&(s.blendColor(at.r,at.g,at.b,fe),b.copy(at),A=fe),m=O,R=!1}function le(O,H){O.side===Ht?Ce(s.CULL_FACE):ye(s.CULL_FACE);let K=O.side===Nn;H&&(K=!K),Ae(K),O.blending===Qr&&O.transparent===!1?he(er):he(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let de=O.stencilWrite;o.setTest(de),de&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Le(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ye(s.SAMPLE_ALPHA_TO_COVERAGE):Ce(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(O){D!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),D=O)}function ge(O){O!==Bp?(ye(s.CULL_FACE),O!==k&&(O===du?s.cullFace(s.BACK):O===zp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ce(s.CULL_FACE),k=O}function Xe(O){O!==X&&(P&&s.lineWidth(O),X=O)}function Le(O,H,K){O?(ye(s.POLYGON_OFFSET_FILL),(U!==H||G!==K)&&(U=H,G=K,a.getReversed()&&(H=-H,K=-K),s.polygonOffset(H,K))):Ce(s.POLYGON_OFFSET_FILL)}function nt(O){O?ye(s.SCISSOR_TEST):Ce(s.SCISSOR_TEST)}function it(O){O===void 0&&(O=s.TEXTURE0+V-1),J!==O&&(s.activeTexture(O),J=O)}function mt(O,H,K){K===void 0&&(J===null?K=s.TEXTURE0+V-1:K=J);let de=I[K];de===void 0&&(de={type:void 0,texture:void 0},I[K]=de),(de.type!==O||de.texture!==H)&&(J!==K&&(s.activeTexture(K),J=K),s.bindTexture(O,H||Ne[O]),de.type=O,de.texture=H)}function z(){let O=I[J];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Kt(){try{s.compressedTexImage2D(...arguments)}catch(O){je("WebGLState:",O)}}function st(){try{s.compressedTexImage3D(...arguments)}catch(O){je("WebGLState:",O)}}function St(){try{s.texSubImage2D(...arguments)}catch(O){je("WebGLState:",O)}}function xe(){try{s.texSubImage3D(...arguments)}catch(O){je("WebGLState:",O)}}function Nt(){try{s.compressedTexSubImage2D(...arguments)}catch(O){je("WebGLState:",O)}}function Ve(){try{s.compressedTexSubImage3D(...arguments)}catch(O){je("WebGLState:",O)}}function Ye(){try{s.texStorage2D(...arguments)}catch(O){je("WebGLState:",O)}}function C(){try{s.texStorage3D(...arguments)}catch(O){je("WebGLState:",O)}}function w(){try{s.texImage2D(...arguments)}catch(O){je("WebGLState:",O)}}function q(){try{s.texImage3D(...arguments)}catch(O){je("WebGLState:",O)}}function oe(O){return f[O]!==void 0?f[O]:s.getParameter(O)}function j(O,H){f[O]!==H&&(s.pixelStorei(O,H),f[O]=H)}function ue(O){F.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),F.copy(O))}function ve(O){ee.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),ee.copy(O))}function ie(O,H){let K=l.get(H);K===void 0&&(K=new WeakMap,l.set(H,K));let de=K.get(O);de===void 0&&(de=s.getUniformBlockIndex(H,O.name),s.uniformBlockBinding(H,de,de),K.set(O,de))}function ne(O,H,K){let pe=l.get(H).get(O);c[pe]!==K&&(s.bindBufferBase(s.UNIFORM_BUFFER,pe,K),c[pe]=K)}function me(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},J=null,I={},u={},c={},d=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,E=null,S=null,y=null,b=new we(0,0,0),A=0,R=!1,D=null,k=null,X=null,U=null,G=null,F.set(0,0,s.canvas.width,s.canvas.height),ee.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:Ce,bindFramebuffer:ct,drawBuffers:De,useProgram:Je,setBlending:he,setMaterial:le,setFlipSided:Ae,setCullFace:ge,setLineWidth:Xe,setPolygonOffset:Le,setScissorTest:nt,activeTexture:it,bindTexture:mt,unbindTexture:z,compressedTexImage2D:Kt,compressedTexImage3D:st,texImage2D:w,texImage3D:q,pixelStorei:j,getParameter:oe,updateUBOMapping:ie,uniformBlockBinding:ne,texStorage2D:Ye,texStorage3D:C,texSubImage2D:St,texSubImage3D:xe,compressedTexSubImage2D:Nt,compressedTexSubImage3D:Ve,scissor:ue,viewport:ve,reset:me}}function qM(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ce,h=new WeakMap,f=new Set,u,d=new WeakMap,p=new Set,x=new FinalizationRegistry(C=>p.delete(C)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,w){return g?new OffscreenCanvas(C,w):Ur("canvas")}function v(C,w,q){let oe=1,j=Ye(C);if((j.width>q||j.height>q)&&(oe=q/Math.max(j.width,j.height)),oe<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ue=Math.floor(oe*j.width),ve=Math.floor(oe*j.height);u===void 0&&(u=m(ue,ve));let ie=w?m(ue,ve):u;return ie.width=ue,ie.height=ve,ie.getContext("2d").drawImage(C,0,0,ue,ve),ke("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+ue+"x"+ve+")."),ie}else return"data"in C&&ke("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),C;return C}function M(C){return C.generateMipmaps}function _(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function S(C,w,q,oe,j,ue=!1){if(C!==null){if(s[C]!==void 0)return s[C];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ve;oe&&(ve=e.get("EXT_texture_norm16"),ve||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=w;if(w===s.RED&&(q===s.FLOAT&&(ie=s.R32F),q===s.HALF_FLOAT&&(ie=s.R16F),q===s.UNSIGNED_BYTE&&(ie=s.R8),q===s.UNSIGNED_SHORT&&ve&&(ie=ve.R16_EXT),q===s.SHORT&&ve&&(ie=ve.R16_SNORM_EXT)),w===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(ie=s.R8UI),q===s.UNSIGNED_SHORT&&(ie=s.R16UI),q===s.UNSIGNED_INT&&(ie=s.R32UI),q===s.BYTE&&(ie=s.R8I),q===s.SHORT&&(ie=s.R16I),q===s.INT&&(ie=s.R32I)),w===s.RG&&(q===s.FLOAT&&(ie=s.RG32F),q===s.HALF_FLOAT&&(ie=s.RG16F),q===s.UNSIGNED_BYTE&&(ie=s.RG8),q===s.UNSIGNED_SHORT&&ve&&(ie=ve.RG16_EXT),q===s.SHORT&&ve&&(ie=ve.RG16_SNORM_EXT)),w===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(ie=s.RG8UI),q===s.UNSIGNED_SHORT&&(ie=s.RG16UI),q===s.UNSIGNED_INT&&(ie=s.RG32UI),q===s.BYTE&&(ie=s.RG8I),q===s.SHORT&&(ie=s.RG16I),q===s.INT&&(ie=s.RG32I)),w===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(ie=s.RGB8UI),q===s.UNSIGNED_SHORT&&(ie=s.RGB16UI),q===s.UNSIGNED_INT&&(ie=s.RGB32UI),q===s.BYTE&&(ie=s.RGB8I),q===s.SHORT&&(ie=s.RGB16I),q===s.INT&&(ie=s.RGB32I)),w===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(ie=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(ie=s.RGBA16UI),q===s.UNSIGNED_INT&&(ie=s.RGBA32UI),q===s.BYTE&&(ie=s.RGBA8I),q===s.SHORT&&(ie=s.RGBA16I),q===s.INT&&(ie=s.RGBA32I)),w===s.RGB&&(q===s.UNSIGNED_SHORT&&ve&&(ie=ve.RGB16_EXT),q===s.SHORT&&ve&&(ie=ve.RGB16_SNORM_EXT),q===s.UNSIGNED_INT_5_9_9_9_REV&&(ie=s.RGB9_E5),q===s.UNSIGNED_INT_10F_11F_11F_REV&&(ie=s.R11F_G11F_B10F)),w===s.RGBA){let ne=ue?Fa:ht.getTransfer(j);q===s.FLOAT&&(ie=s.RGBA32F),q===s.HALF_FLOAT&&(ie=s.RGBA16F),q===s.UNSIGNED_BYTE&&(ie=ne===At?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT&&ve&&(ie=ve.RGBA16_EXT),q===s.SHORT&&ve&&(ie=ve.RGBA16_SNORM_EXT),q===s.UNSIGNED_SHORT_4_4_4_4&&(ie=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(ie=s.RGB5_A1)}return(ie===s.R16F||ie===s.R32F||ie===s.RG16F||ie===s.RG32F||ie===s.RGBA16F||ie===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function y(C,w){let q;return C?w===null||w===di||w===sr?q=s.DEPTH24_STENCIL8:w===$n?q=s.DEPTH32F_STENCIL8:w===na&&(q=s.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===di||w===sr?q=s.DEPTH_COMPONENT24:w===$n?q=s.DEPTH_COMPONENT32F:w===na&&(q=s.DEPTH_COMPONENT16),q}function b(C,w){return M(C)===!0||C.isFramebufferTexture&&C.minFilter!==$t&&C.minFilter!==jt?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function A(C){let w=new WeakRef(C);n.get(C).__ref=w,p.add(w),x.register(C,w,w)}function R(C){let w=n.get(C).__ref;w!==void 0&&(p.delete(w),x.unregister(w))}function D(C){X(C.target)}function k(C){U(C.target)}function X(C){C.removeEventListener("dispose",D),R(C),V(C),C.isVideoTexture&&h.delete(C),C.isHTMLTexture&&f.delete(C)}function U(C){C.removeEventListener("dispose",k),R(C),Y(C)}function G(){for(let C of p){let w=C.deref();w!==void 0&&(w.isRenderTarget===!0?U(w):X(w))}p.clear(),f.clear()}function V(C){let w=n.get(C);if(w.__webglInit===void 0)return;let q=C.source,oe=d.get(q);if(oe){let j=oe[w.__cacheKey];j.usedTimes--,j.usedTimes===0&&P(C),Object.keys(oe).length===0&&d.delete(q)}n.remove(C)}function P(C){let w=n.get(C);s.deleteTexture(w.__webglTexture);let q=C.source,oe=d.get(q);delete oe[w.__cacheKey],a.memory.textures--}function Y(C){let w=n.get(C);w.__depthDisposeCallback&&w.__depthDisposeCallback();let q=C.depthTexture;if(q&&q.renderTarget===C&&X(q),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(w.__webglFramebuffer[j]))for(let ue=0;ue<w.__webglFramebuffer[j].length;ue++)s.deleteFramebuffer(w.__webglFramebuffer[j][ue]);else s.deleteFramebuffer(w.__webglFramebuffer[j]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[j])}else{if(Array.isArray(w.__webglFramebuffer))for(let j=0;j<w.__webglFramebuffer.length;j++)s.deleteFramebuffer(w.__webglFramebuffer[j]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let j=0;j<w.__webglColorRenderbuffer.length;j++)w.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[j]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let oe=C.textures;for(let j=0,ue=oe.length;j<ue;j++){let ve=n.get(oe[j]);ve.__webglTexture&&(s.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(oe[j])}n.remove(C)}let L=0;function J(){L=0}function I(){return L}function te(C){L=C}function W(){let C=L;return C>=i.maxTextures&&ke("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),L+=1,C}function F(C){let w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.mipmapsAutoUpdate),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function ee(C,w){let q=n.get(C);if(C.isVideoTexture&&Nt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&q.__version!==C.version){let oe=C.image;if(oe===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{le(q,C,w);return}}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+w)}function re(C,w){let q=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){le(q,C,w);return}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+w)}function Ne(C,w){let q=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){le(q,C,w);return}t.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+w)}function ye(C,w){let q=n.get(C);if(C.version>0&&q.__version!==C.version){Ae(q,C,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+w)}let Ce={[bi]:s.REPEAT,[ei]:s.CLAMP_TO_EDGE,[Nr]:s.MIRRORED_REPEAT},ct={[$t]:s.NEAREST,[sc]:s.NEAREST_MIPMAP_NEAREST,[ir]:s.NEAREST_MIPMAP_LINEAR,[jt]:s.LINEAR,[ta]:s.LINEAR_MIPMAP_NEAREST,[Hn]:s.LINEAR_MIPMAP_LINEAR},De={[f0]:s.NEVER,[Fu]:s.ALWAYS,[d0]:s.LESS,[Du]:s.LEQUAL,[p0]:s.EQUAL,[Uu]:s.GEQUAL,[m0]:s.GREATER,[g0]:s.NOTEQUAL};function Je(C,w){if(w.type===$n&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===jt||w.magFilter===ta||w.magFilter===ir||w.magFilter===Hn||w.minFilter===jt||w.minFilter===ta||w.minFilter===ir||w.minFilter===Hn)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Ce[w.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Ce[w.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Ce[w.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,ct[w.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,ct[w.minFilter]),w.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,De[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===$t||w.minFilter!==ir&&w.minFilter!==Hn||w.type===$n&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function $e(C,w){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",D),A(w));let oe=w.source,j=d.get(oe);j===void 0&&(j={},d.set(oe,j));let ue=F(w);if(ue!==C.__cacheKey){j[ue]===void 0&&(j[ue]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,q=!0),j[ue].usedTimes++;let ve=j[C.__cacheKey];ve!==void 0&&(j[C.__cacheKey].usedTimes--,ve.usedTimes===0&&P(w)),C.__cacheKey=ue,C.__webglTexture=j[ue].texture}return q}function se(C,w,q){return Math.floor(Math.floor(C/q)/w)}function he(C,w,q,oe){let ue=C.updateRanges;if(ue.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,q,oe,w.data);else{ue.sort((O,H)=>O.start-H.start);let ve=0;for(let O=1;O<ue.length;O++){let H=ue[ve],K=ue[O],de=H.start+H.count,pe=se(K.start,w.width,4),_e=se(H.start,w.width,4);K.start<=de+1&&pe===_e&&se(K.start+K.count-1,w.width,4)===pe?H.count=Math.max(H.count,K.start+K.count-H.start):(++ve,ue[ve]=K)}ue.length=ve+1;let ie=t.getParameter(s.UNPACK_ROW_LENGTH),ne=t.getParameter(s.UNPACK_SKIP_PIXELS),me=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let O=0,H=ue.length;O<H;O++){let K=ue[O],de=Math.floor(K.start/4),pe=Math.ceil(K.count/4),_e=de%w.width,He=Math.floor(de/w.width),at=pe,fe=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(s.UNPACK_SKIP_ROWS,He),t.texSubImage2D(s.TEXTURE_2D,0,_e,He,at,fe,q,oe,w.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,ie),t.pixelStorei(s.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(s.UNPACK_SKIP_ROWS,me)}}function le(C,w,q){let oe=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(oe=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(oe=s.TEXTURE_3D);let j=$e(C,w),ue=w.source;t.bindTexture(oe,C.__webglTexture,s.TEXTURE0+q);let ve=n.get(ue);if(ue.version!==ve.__version||j===!0){if(t.activeTexture(s.TEXTURE0+q),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let fe=ht.getPrimaries(ht.workingColorSpace),qe=w.colorSpace===ss?null:ht.getPrimaries(w.colorSpace),rt=w.colorSpace===ss||fe===qe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt)}t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let ne=v(w.image,!1,i.maxTextureSize);ne=Ve(w,ne);let me=r.convert(w.format,w.colorSpace),O=r.convert(w.type),H=S(w.internalFormat,me,O,w.normalized,w.colorSpace,w.isVideoTexture);Je(oe,w);let K,de=w.mipmaps,pe=w.isVideoTexture!==!0,_e=ve.__version===void 0||j===!0,He=ue.dataReady,at=b(w,ne);if(w.isDepthTexture)H=y(w.format===is,w.type),_e&&(pe?t.texStorage2D(s.TEXTURE_2D,1,H,ne.width,ne.height):t.texImage2D(s.TEXTURE_2D,0,H,ne.width,ne.height,0,me,O,null));else if(w.isDataTexture)if(de.length>0){pe&&_e&&t.texStorage2D(s.TEXTURE_2D,at,H,de[0].width,de[0].height);for(let fe=0,qe=de.length;fe<qe;fe++)K=de[fe],pe?He&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,K.width,K.height,me,O,K.data):t.texImage2D(s.TEXTURE_2D,fe,H,K.width,K.height,0,me,O,K.data);w.generateMipmaps=!1}else pe?(_e&&t.texStorage2D(s.TEXTURE_2D,at,H,ne.width,ne.height),He&&he(w,ne,me,O)):t.texImage2D(s.TEXTURE_2D,0,H,ne.width,ne.height,0,me,O,ne.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){pe&&_e&&t.texStorage3D(s.TEXTURE_2D_ARRAY,at,H,de[0].width,de[0].height,ne.depth);for(let fe=0,qe=de.length;fe<qe;fe++)if(K=de[fe],w.format!==ii)if(me!==null)if(pe){if(He)if(w.layerUpdates.size>0){let rt=Yu(K.width,K.height,w.format,w.type);for(let Ee of w.layerUpdates){let Ct=K.data.subarray(Ee*rt/K.data.BYTES_PER_ELEMENT,(Ee+1)*rt/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,Ee,K.width,K.height,1,me,Ct)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,K.width,K.height,ne.depth,me,K.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,fe,H,K.width,K.height,ne.depth,0,K.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pe?He&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,K.width,K.height,ne.depth,me,O,K.data):t.texImage3D(s.TEXTURE_2D_ARRAY,fe,H,K.width,K.height,ne.depth,0,me,O,K.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{pe&&_e&&t.texStorage2D(s.TEXTURE_2D,at,H,de[0].width,de[0].height);for(let fe=0,qe=de.length;fe<qe;fe++)K=de[fe],w.format!==ii?me!==null?pe?He&&t.compressedTexSubImage2D(s.TEXTURE_2D,fe,0,0,K.width,K.height,me,K.data):t.compressedTexImage2D(s.TEXTURE_2D,fe,H,K.width,K.height,0,K.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pe?He&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,K.width,K.height,me,O,K.data):t.texImage2D(s.TEXTURE_2D,fe,H,K.width,K.height,0,me,O,K.data)}else if(w.isDataArrayTexture)if(pe){if(_e&&t.texStorage3D(s.TEXTURE_2D_ARRAY,at,H,ne.width,ne.height,ne.depth),He)if(w.layerUpdates.size>0){let fe=Yu(ne.width,ne.height,w.format,w.type);for(let qe of w.layerUpdates){let rt=ne.data.subarray(qe*fe/ne.data.BYTES_PER_ELEMENT,(qe+1)*fe/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,qe,ne.width,ne.height,1,me,O,rt)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,me,O,ne.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,H,ne.width,ne.height,ne.depth,0,me,O,ne.data);else if(w.isData3DTexture)pe?(_e&&t.texStorage3D(s.TEXTURE_3D,at,H,ne.width,ne.height,ne.depth),He&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,me,O,ne.data)):t.texImage3D(s.TEXTURE_3D,0,H,ne.width,ne.height,ne.depth,0,me,O,ne.data);else if(w.isFramebufferTexture){if(_e)if(pe)t.texStorage2D(s.TEXTURE_2D,at,H,ne.width,ne.height);else{let fe=ne.width,qe=ne.height;for(let rt=0;rt<at;rt++)t.texImage2D(s.TEXTURE_2D,rt,H,fe,qe,0,me,O,null),fe>>=1,qe>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){let fe=s.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),ne.parentNode!==fe){fe.appendChild(ne),f.add(w),fe.onpaint=qe=>{let rt=qe.changedElements;for(let Ee of f)rt.includes(Ee.image)&&(Ee.needsUpdate=!0)},fe.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ne);else{let rt=s.RGBA,Ee=s.RGBA,Ct=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,rt,Ee,Ct,ne)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(de.length>0){if(pe&&_e){let fe=Ye(de[0]);t.texStorage2D(s.TEXTURE_2D,at,H,fe.width,fe.height)}for(let fe=0,qe=de.length;fe<qe;fe++)K=de[fe],pe?He&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,me,O,K):t.texImage2D(s.TEXTURE_2D,fe,H,me,O,K);w.generateMipmaps=!1}else if(pe){if(_e){let fe=Ye(ne);t.texStorage2D(s.TEXTURE_2D,at,H,fe.width,fe.height)}He&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,me,O,ne)}else t.texImage2D(s.TEXTURE_2D,0,H,me,O,ne);M(w)&&w.mipmapsAutoUpdate===!0&&_(oe),ve.__version=ue.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Ae(C,w,q){if(w.image.length!==6)return;let oe=$e(C,w),j=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+q);let ue=n.get(j);if(j.version!==ue.__version||oe===!0){t.activeTexture(s.TEXTURE0+q);let ve=ht.getPrimaries(ht.workingColorSpace),ie=w.colorSpace===ss?null:ht.getPrimaries(w.colorSpace),ne=w.colorSpace===ss||ve===ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let me=w.isCompressedTexture||w.image[0].isCompressedTexture,O=w.image[0]&&w.image[0].isDataTexture,H=[];for(let Ee=0;Ee<6;Ee++)!me&&!O?H[Ee]=v(w.image[Ee],!0,i.maxCubemapSize):H[Ee]=O?w.image[Ee].image:w.image[Ee],H[Ee]=Ve(w,H[Ee]);let K=H[0],de=r.convert(w.format,w.colorSpace),pe=r.convert(w.type),_e=S(w.internalFormat,de,pe,w.normalized,w.colorSpace),He=w.isVideoTexture!==!0,at=ue.__version===void 0||oe===!0,fe=j.dataReady,qe=b(w,K);Je(s.TEXTURE_CUBE_MAP,w);let rt;if(w.isDepthTexture){if(_e=y(w.format===is,w.type),at)if(He)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,_e,K.width,K.height);else for(let Ee=0;Ee<6;Ee++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,_e,K.width,K.height,0,de,pe,null)}else if(me){He&&at&&t.texStorage2D(s.TEXTURE_CUBE_MAP,qe,_e,K.width,K.height);for(let Ee=0;Ee<6;Ee++){rt=H[Ee].mipmaps;for(let Ct=0;Ct<rt.length;Ct++){let dn=rt[Ct];w.format!==ii?de!==null?He?fe&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct,0,0,dn.width,dn.height,de,dn.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct,_e,dn.width,dn.height,0,dn.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct,0,0,dn.width,dn.height,de,pe,dn.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct,_e,dn.width,dn.height,0,de,pe,dn.data)}}}else{if(rt=w.mipmaps,He&&at){rt.length>0&&qe++;let Ee=Ye(H[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,qe,_e,Ee.width,Ee.height)}for(let Ee=0;Ee<6;Ee++)if(O){He?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,H[Ee].width,H[Ee].height,de,pe,H[Ee].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,_e,H[Ee].width,H[Ee].height,0,de,pe,H[Ee].data);for(let Ct=0;Ct<rt.length;Ct++){let cs=rt[Ct].image[Ee].image;He?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct+1,0,0,cs.width,cs.height,de,pe,cs.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct+1,_e,cs.width,cs.height,0,de,pe,cs.data)}}else{He?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,de,pe,H[Ee]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,_e,de,pe,H[Ee]);for(let Ct=0;Ct<rt.length;Ct++){let dn=rt[Ct];He?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct+1,0,0,de,pe,dn.image[Ee]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,Ct+1,_e,de,pe,dn.image[Ee])}}}M(w)&&w.mipmapsAutoUpdate===!0&&_(s.TEXTURE_CUBE_MAP),ue.__version=j.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function ge(C,w,q,oe,j,ue){let ve=r.convert(q.format,q.colorSpace),ie=r.convert(q.type),ne=S(q.internalFormat,ve,ie,q.normalized,q.colorSpace),me=n.get(w),O=n.get(q);if(O.__renderTarget=w,!me.__hasExternalTextures){let H=Math.max(1,w.width>>ue),K=Math.max(1,w.height>>ue);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?t.texImage3D(j,ue,ne,H,K,w.depth,0,ve,ie,null):t.texImage2D(j,ue,ne,H,K,0,ve,ie,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),xe(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,oe,j,O.__webglTexture,0,St(w)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,oe,j,O.__webglTexture,ue),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Xe(C,w,q){if(s.bindRenderbuffer(s.RENDERBUFFER,C),w.depthBuffer){let oe=w.depthTexture,j=oe&&oe.isDepthTexture?oe.type:null,ue=y(w.stencilBuffer,j),ve=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;xe(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(w),ue,w.width,w.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(w),ue,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ue,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ve,s.RENDERBUFFER,C)}else{let oe=w.textures;for(let j=0;j<oe.length;j++){let ue=oe[j],ve=r.convert(ue.format,ue.colorSpace),ie=r.convert(ue.type),ne=S(ue.internalFormat,ve,ie,ue.normalized,ue.colorSpace);xe(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(w),ne,w.width,w.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(w),ne,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ne,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Le(C,w,q){let oe=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=n.get(w.depthTexture);j.__renderTarget=w;let ue=oe?w.depthTexture.image[0]:w.depthTexture.image;(!j.__webglTexture||ue.width!==w.width||ue.height!==w.height)&&(ue.width=w.width,ue.height=w.height,w.depthTexture.needsUpdate=!0),oe?ye(w.depthTexture,0):ee(w.depthTexture,0);let ve=j.__webglTexture,ie=St(w),ne=oe?s.TEXTURE_CUBE_MAP_POSITIVE_X+q:s.TEXTURE_2D,me=w.depthTexture.format===is?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===Xi)xe(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,ne,ve,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,me,ne,ve,0);else if(w.depthTexture.format===is)xe(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,ne,ve,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,me,ne,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(C){let w=n.get(C),q=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){let oe=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),oe){let j=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,oe.removeEventListener("dispose",j)};oe.addEventListener("dispose",j),w.__depthDisposeCallback=j}w.__boundDepthTexture=oe}if(C.depthTexture&&!w.__autoAllocateDepthBuffer)if(q)for(let oe=0;oe<6;oe++)Le(w.__webglFramebuffer[oe],C,oe);else C.texture.mipmaps.length>0?Le(w.__webglFramebuffer[0],C,0):Le(w.__webglFramebuffer,C,0);else if(q){w.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[oe]),w.__webglDepthbuffer[oe]===void 0)w.__webglDepthbuffer[oe]=s.createRenderbuffer(),Xe(w.__webglDepthbuffer[oe],C,!1);else{let j=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=w.__webglDepthbuffer[oe];s.bindRenderbuffer(s.RENDERBUFFER,ue),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,ue)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Xe(w.__webglDepthbuffer,C,!1);else{let j=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ue),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,ue)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function it(C,w,q){let oe=n.get(C);w!==void 0&&ge(oe.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&nt(C)}function mt(C){let w=C.texture,q=n.get(C),oe=n.get(w);C.addEventListener("dispose",k),A(C);let j=C.textures,ue=C.isWebGLCubeRenderTarget===!0,ve=j.length>1;if(ve||(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=w.version,a.memory.textures++),ue){q.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(w.mipmaps.length>0){q.__webglFramebuffer[ie]=[];for(let ne=0;ne<w.mipmaps.length;ne++)q.__webglFramebuffer[ie][ne]=s.createFramebuffer()}else q.__webglFramebuffer[ie]=s.createFramebuffer()}else{if(w.mipmaps.length>0){q.__webglFramebuffer=[];for(let ie=0;ie<w.mipmaps.length;ie++)q.__webglFramebuffer[ie]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(ve)for(let ie=0,ne=j.length;ie<ne;ie++){let me=n.get(j[ie]);me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&xe(C)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ie=0;ie<j.length;ie++){let ne=j[ie];q.__webglColorRenderbuffer[ie]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[ie]);let me=r.convert(ne.format,ne.colorSpace),O=r.convert(ne.type),H=S(ne.internalFormat,me,O,ne.normalized,ne.colorSpace,C.isXRRenderTarget===!0),K=St(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,K,H,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ie,s.RENDERBUFFER,q.__webglColorRenderbuffer[ie])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),Xe(q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ue){t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture),Je(s.TEXTURE_CUBE_MAP,w);for(let ie=0;ie<6;ie++)if(w.mipmaps.length>0)for(let ne=0;ne<w.mipmaps.length;ne++)ge(q.__webglFramebuffer[ie][ne],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ne);else ge(q.__webglFramebuffer[ie],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);M(w)?_(s.TEXTURE_CUBE_MAP):w.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}else if(ve){for(let ie=0,ne=j.length;ie<ne;ie++){let me=j[ie],O=n.get(me),H=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(H=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(H,O.__webglTexture),Je(H,me),ge(q.__webglFramebuffer,C,me,s.COLOR_ATTACHMENT0+ie,H,0),M(me)&&_(H)}t.unbindTexture()}else{let ie=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ie,oe.__webglTexture),Je(ie,w),w.mipmaps.length>0)for(let ne=0;ne<w.mipmaps.length;ne++)ge(q.__webglFramebuffer[ne],C,w,s.COLOR_ATTACHMENT0,ie,ne);else ge(q.__webglFramebuffer,C,w,s.COLOR_ATTACHMENT0,ie,0);M(w)?_(ie):w.mipmaps.length>0&&s.texParameteri(ie,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&nt(C)}function z(C){let w=C.textures;for(let q=0,oe=w.length;q<oe;q++){let j=w[q];if(M(j)&&j.mipmapsAutoUpdate===!0){let ue=E(C),ve=n.get(j).__webglTexture;t.bindTexture(ue,ve),_(ue),t.unbindTexture()}}}let Kt=[];function st(C){if(C.samples>0){if(xe(C)===!1){let w=C.textures,q=C.width,oe=C.height,j=s.COLOR_BUFFER_BIT,ue=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=n.get(C),ie=w.length>1;if(ie)for(let me=0;me<w.length;me++)t.bindFramebuffer(s.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ve.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let me=0;me<w.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),ie){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ve.__webglColorRenderbuffer[me]);let O=n.get(w[me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,O,0)}s.blitFramebuffer(0,0,q,oe,0,0,q,oe,j,s.NEAREST),c===!0&&(Kt.length=0,Kt.push(s.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&Kt.push(ue),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Kt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ie)for(let me=0;me<w.length;me++){t.bindFramebuffer(s.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,ve.__webglColorRenderbuffer[me]);let O=n.get(w[me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ve.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,O,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let w=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function St(C){return Math.min(i.maxSamples,C.samples)}function xe(C){let w=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Nt(C){let w=a.render.frame;h.get(C)!==w&&(h.set(C,w),C.update())}function Ve(C,w){let q=C.colorSpace,oe=C.format,j=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==In&&q!==ss&&(ht.getTransfer(q)===At?(oe!==ii||j!==Gn)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",q)),w}function Ye(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=J,this.getTextureUnits=I,this.setTextureUnits=te,this.setTexture2D=ee,this.setTexture2DArray=re,this.setTexture3D=Ne,this.setTextureCube=ye,this.rebindTextures=it,this.setupRenderTarget=mt,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=xe,this.dispose=G}function YM(s,e){function t(n,i=ss){let r,a=ht.getTransfer(i);if(n===Gn)return s.UNSIGNED_BYTE;if(n===ac)return s.UNSIGNED_SHORT_4_4_4_4;if(n===oc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Cu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Iu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Au)return s.BYTE;if(n===Ru)return s.SHORT;if(n===na)return s.UNSIGNED_SHORT;if(n===rc)return s.INT;if(n===di)return s.UNSIGNED_INT;if(n===$n)return s.FLOAT;if(n===pi)return s.HALF_FLOAT;if(n===Pu)return s.ALPHA;if(n===Lu)return s.RGB;if(n===ii)return s.RGBA;if(n===Xi)return s.DEPTH_COMPONENT;if(n===is)return s.DEPTH_STENCIL;if(n===lc)return s.RED;if(n===cc)return s.RED_INTEGER;if(n===Es)return s.RG;if(n===hc)return s.RG_INTEGER;if(n===uc)return s.RGBA_INTEGER;if(n===yo||n===Mo||n===bo||n===So)if(a===At)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===yo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===So)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===yo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===bo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===So)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fc||n===dc||n===pc||n===mc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===dc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gc||n===xc||n===vc||n===_c||n===yc||n===Eo||n===Mc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===gc||n===xc)return a===At?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===_c)return r.COMPRESSED_R11_EAC;if(n===yc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Eo)return r.COMPRESSED_RG11_EAC;if(n===Mc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===bc||n===Sc||n===Ec||n===wc||n===Tc||n===Ac||n===Rc||n===Cc||n===Ic||n===Pc||n===Lc||n===Nc||n===Dc||n===Uc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ec)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ac)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ic)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Lc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Nc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fc||n===Oc||n===Bc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Fc)return a===At?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zc||n===kc||n===wo||n===Hc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===zc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var ZM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,KM=`
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

}`,lf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ja(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ot({vertexShader:ZM,fragmentShader:KM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new Ft(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cf=class extends Si{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,p=null,x=typeof XRWebGLBinding<"u",g=new lf,m={},v=t.getContextAttributes(),M=null,_=null,E=[],S=[],y=new ce,b=null,A=null,R=new an;R.viewport=new ut;let D=new an;D.viewport=new ut;let k=[R,D],X=new ec,U=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let ee=E[F];return ee===void 0&&(ee=new Br,E[F]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(F){let ee=E[F];return ee===void 0&&(ee=new Br,E[F]=ee),ee.getGripSpace()},this.getHand=function(F){let ee=E[F];return ee===void 0&&(ee=new Br,E[F]=ee),ee.getHandSpace()};function V(F){let ee=S.indexOf(F.inputSource);if(ee===-1)return;let re=E[ee];re!==void 0&&(re.update(F.inputSource,F.frame,l||a),re.dispatchEvent({type:F.type,data:F.inputSource}))}function P(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",P),i.removeEventListener("inputsourceschange",Y);for(let F=0;F<E.length;F++){let ee=S[F];ee!==null&&(S[F]=null,E[F].disconnect(ee))}U=null,G=null,g.reset();for(let F in m)delete m[F];if(e.setRenderTarget(M),d=null,u=null,f=null,i=null,_=null,W.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(y.width,y.height,!1),A!==null){let F=A.camera;F.fov=A.fov,F.zoom=A.zoom,F.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){r=F,n.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,n.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(F){l=F},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(i,t)),f},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(F){if(i=F,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",P),i.addEventListener("inputsourceschange",Y),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ne=null,ye=null;v.depth&&(ye=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=v.stencil?is:Xi,Ne=v.stencil?sr:di);let Ce={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Ce),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new Yn(u.textureWidth,u.textureHeight,{format:ii,type:Gn,depthTexture:new qi(u.textureWidth,u.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let re={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Yn(d.framebufferWidth,d.framebufferHeight,{format:ii,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),W.setContext(i),W.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y(F){for(let ee=0;ee<F.removed.length;ee++){let re=F.removed[ee],Ne=S.indexOf(re);Ne>=0&&(S[Ne]=null,E[Ne].disconnect(re))}for(let ee=0;ee<F.added.length;ee++){let re=F.added[ee],Ne=S.indexOf(re);if(Ne===-1){for(let Ce=0;Ce<E.length;Ce++)if(Ce>=S.length){S.push(re),Ne=Ce;break}else if(S[Ce]===null){S[Ce]=re,Ne=Ce;break}if(Ne===-1)break}let ye=E[Ne];ye&&ye.connect(re)}}function L(F,ee){ee===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(ee.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(i===null)return;let ee=F.near,re=F.far;g.texture!==null&&(g.depthNear>0&&(ee=g.depthNear),g.depthFar>0&&(re=g.depthFar)),X.near=D.near=R.near=ee,X.far=D.far=R.far=re,(U!==X.near||G!==X.far)&&(i.updateRenderState({depthNear:X.near,depthFar:X.far}),U=X.near,G=X.far),X.layers.mask=F.layers.mask|6,R.layers.mask=X.layers.mask&-5,D.layers.mask=X.layers.mask&-3;let Ne=F.parent,ye=X.cameras;L(X,Ne);for(let Ce=0;Ce<ye.length;Ce++)L(ye[Ce],Ne);X.projectionMatrix.copy(R.projectionMatrix),X.projectionMatrixInverse.copy(R.projectionMatrixInverse),A===null&&F.isPerspectiveCamera&&(A={camera:F,fov:F.fov,zoom:F.zoom}),J(F,X,Ne)};function J(F,ee,re){re===null?F.matrix.copy(ee.matrixWorld):(F.matrix.copy(re.matrixWorld),F.matrix.invert(),F.matrix.multiply(ee.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(ee.projectionMatrix),F.projectionMatrixInverse.copy(ee.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Xs*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(F){c=F,u!==null&&(u.fixedFoveation=F),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=F)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function(F){return m[F]};let I=null;function te(F,ee){if(h=ee.getViewerPose(l||a),p=ee,h!==null){let re=h.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let Ne=!1;re.length!==X.cameras.length&&(X.cameras.length=0,Ne=!0);for(let De=0;De<re.length;De++){let Je=re[De],$e=null;if(d!==null)$e=d.getViewport(Je);else{let he=f.getViewSubImage(u,Je);$e=he.viewport,De===0&&(e.setRenderTargetTextures(_,he.colorTexture,he.depthStencilTexture),e.setRenderTarget(_))}let se=k[De];se===void 0&&(se=new an,se.layers.enable(De),se.viewport=new ut,k[De]=se),se.matrix.fromArray(Je.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(Je.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set($e.x,$e.y,$e.width,$e.height),De===0&&(X.matrix.copy(se.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ne===!0&&X.cameras.push(se)}let ye=i.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){f=n.getBinding();let De=f.getDepthInformation(re[0]);De&&De.isValid&&De.texture&&g.init(De,i.renderState)}if(ye&&ye.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let De=0;De<re.length;De++){let Je=re[De].camera;if(Je){let $e=m[Je];$e||($e=new Ja,m[Je]=$e);let se=f.getCameraImage(Je);$e.sourceTexture=se}}}}for(let re=0;re<E.length;re++){let Ne=S[re],ye=E[re];Ne!==null&&ye!==void 0&&ye.update(Ne,ee,l||a)}I&&I(F,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),p=null}let W=new J0;W.setAnimationLoop(te),this.setAnimationLoop=function(F){I=F},this.dispose=function(){}}},JM=new Ge,am=new Qe;am.set(-1,0,0,0,1,0,0,0,1);function $M(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Wu(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,M,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,v,M):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Nn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Nn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let v=e.get(m),M=v.envMap,_=v.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(JM.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(am),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,v){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Nn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function jM(s,e,t,n){let i={},r={};function a(v,M){let _=M.program;n.uniformBlockBinding(v,_,i[v.id])}function o(v,M){let _=i[v.id];_===void 0&&(p(v),_=c(v),i[v.id]=_,v.addEventListener("dispose",g));let E=M.program;n.updateUBOMapping(v,E);let S=e.render.frame;r[v.id]!==S&&(l(v),r[v.id]=S)}function c(v){let M=s.createBuffer(),_=v.__size,E=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,_,E),s.bindBuffer(s.UNIFORM_BUFFER,null),M}function l(v){let M=i[v.id],_=v.uniforms,E=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let S=0,y=_.length;S<y;S++){let b=_[S];if(Array.isArray(b))for(let A=0,R=b.length;A<R;A++)h(b[A],S,A,E);else h(b,S,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(v,M,_,E){if(u(v,M,_,E)===!0){let S=v.__offset,y=v.value;if(Array.isArray(y)){let b=0;for(let A=0;A<y.length;A++){let R=y[A],D=x(R,!0);f(R,v.__data,b),b+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else f(y,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,S,v.__data)}}function f(v,M,_){typeof v=="number"||typeof v=="boolean"?M[_]=v:v.isMatrix3?(M[_]=v.elements[0],M[_+1]=v.elements[1],M[_+2]=v.elements[2],M[_+3]=0,M[_+4]=v.elements[3],M[_+5]=v.elements[4],M[_+6]=v.elements[5],M[_+7]=0,M[_+8]=v.elements[6],M[_+9]=v.elements[7],M[_+10]=v.elements[8],M[_+11]=0):ArrayBuffer.isView(v)?M.set(v.subarray(0,M.length-_),_):v.toArray(M,_)}function u(v,M,_,E){let S=v.value,y=M+"_"+_;if(Array.isArray(S)){E[y]===void 0&&(E[y]=[]);let b=E[y],A=!1;for(let R=0;R<S.length;R++)d(S[R],b,R)===!0&&(A=!0);return A}return d(S,E,y)}function d(v,M,_){if(M[_]===void 0)return typeof v=="number"||typeof v=="boolean"?M[_]=v:ArrayBuffer.isView(v)?M[_]=v.slice():M[_]=v.clone(),!0;{let E=M[_];if(typeof v=="number"||typeof v=="boolean"){if(E!==v)return M[_]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(E.equals(v)===!1)return E.copy(v),!0}}return!1}function p(v){let M=v.uniforms,_=0,E=16;for(let y=0,b=M.length;y<b;y++){let A=Array.isArray(M[y])?M[y]:[M[y]];for(let R=0,D=A.length;R<D;R++){let k=A[R],X=Array.isArray(k.value)?k.value:[k.value],U=Array.isArray(M[y])||Array.isArray(k.value),G=_;for(let P=0,Y=X.length;P<Y;P++){let L=X[P],J=x(L,U),I=_%E,te=I%J.boundary,W=I+te;_+=te,W!==0&&E-W<J.storage&&(_+=E-W),P===0&&(G=_),_+=J.storage}let V=k.type==="int"?Int32Array:k.type==="uint"?Uint32Array:Float32Array;k.__data=new V((_-G)/Float32Array.BYTES_PER_ELEMENT),k.__offset=G}}let S=_%E;return S>0&&(_+=E-S),v.__size=_,v.__cache={},this}function x(v,M){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=16,_.storage=48):v.isMatrix4?(_.boundary=16,_.storage=64):v.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(_.boundary=16,_.storage=v.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",v),M===!0&&(_.boundary=16,_.storage=Math.ceil(_.storage/16)*16),_}function g(v){let M=v.target;M.removeEventListener("dispose",g),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function m(){for(let v in i)s.deleteBuffer(i[v]);i={},r={}}return{bind:a,update:o,dispose:m}}var QM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ai=null;function eb(){return Ai===null&&(Ai=new Gr(QM,16,16,Es,pi),Ai.name="DFG_LUT",Ai.minFilter=jt,Ai.magFilter=jt,Ai.wrapS=ei,Ai.wrapT=ei,Ai.generateMipmaps=!1,Ai.needsUpdate=!0),Ai}var qc=class{constructor(e={}){let{canvas:t=x0(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Gn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=d,g=new Set([uc,hc,cc]),m=new Set([Gn,di,na,sr,ac,oc]),v=new Uint32Array(4),M=new Int32Array(4),_={textures:[],min:[],max:[],resolution:[]},E=null,S=null,y=[],b=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,D=!1,k=null,X=null,U=null,G=null;this._outputColorSpace=vt;let V=0,P=0,Y=null,L=-1,J=null,I=new ut,te=new ut,W=null,F=new we(0),ee=0,re=t.width,Ne=t.height,ye=1,Ce=null,ct=null,De=new ut(0,0,re,Ne),Je=new ut(0,0,re,Ne),$e=!1,se=new _s,he=new Fl,le=!1,Ae=!1,ge=new Ge,Xe=new N,Le=new ut,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},it=!1;function mt(){return Y===null?ye:1}let z=n;function Kt(T,B){return t.getContext(T,B)}let st,St,xe,Nt,Ve,Ye,C,w,q,oe,j,ue,ve,ie,ne,me,O,H,K,de,pe,_e,He;try{let T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",qe,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),z===null){let B="webgl2";if(z=Kt(B,T),z===null)throw Kt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}at()}catch(T){throw t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),je("WebGLRenderer: "+T.message),T}function at(){st=new uy(z),st.init(),pe=new YM(z,st),St=new ey(z,st,e,pe),xe=new XM(z,st),St.reversedDepthBuffer&&u&&xe.buffers.depth.setReversed(!0),X=z.createFramebuffer(),U=z.createFramebuffer(),G=z.createFramebuffer(),Nt=new py(z),Ve=new PM,Ye=new qM(z,st,xe,Ve,St,pe,Nt),C=new hy(R),w=new g1(z),_e=new j_(z,w),q=new fy(z,w,Nt,_e),oe=new gy(z,q,w,_e,Nt),H=new my(z,St,Ye),ne=new ty(Ve),j=new IM(R,C,st,St,_e,ne),ue=new $M(R,Ve),ve=new NM,ie=new zM(st),O=new $_(R,C,xe,oe,p,c),me=new WM(R,oe,St),He=new jM(z,Nt,St,xe),K=new Q_(z,st,Nt),de=new dy(z,st,Nt),Nt.programs=j.programs,R.capabilities=St,R.extensions=st,R.properties=Ve,R.renderLists=ve,R.shadowMap=me,R.state=xe,R.info=Nt}x!==Gn&&(A=new vy(x,t.width,t.height,o,i,r));let fe=new cf(R,z);this.xr=fe,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let T=st.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=st.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(T){T!==void 0&&(ye=T,this.setSize(re,Ne,!1))},this.getSize=function(T){return T.set(re,Ne)},this.setSize=function(T,B,Q=!0){if(fe.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}re=T,Ne=B,t.width=Math.floor(T*ye),t.height=Math.floor(B*ye),Q===!0&&(t.style.width=T+"px",t.style.height=B+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(re*ye,Ne*ye).floor()},this.setDrawingBufferSize=function(T,B,Q){re=T,Ne=B,ye=Q,t.width=Math.floor(T*Q),t.height=Math.floor(B*Q),this.setViewport(0,0,T,B)},this.setEffects=function(T){if(x===Gn){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let B=0;B<T.length;B++)if(T[B].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(De)},this.setViewport=function(T,B,Q,Z){T.isVector4?De.set(T.x,T.y,T.z,T.w):De.set(T,B,Q,Z),xe.viewport(I.copy(De).multiplyScalar(mt()).round())},this.getScissor=function(T){return T.copy(Je)},this.setScissor=function(T,B,Q,Z){T.isVector4?Je.set(T.x,T.y,T.z,T.w):Je.set(T,B,Q,Z),xe.scissor(te.copy(Je).multiplyScalar(mt()).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(T){xe.setScissorTest($e=T)},this.setOpaqueSort=function(T){Ce=T},this.setTransparentSort=function(T){ct=T},this.getClearColor=function(T){return T.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(T=!0,B=!0,Q=!0){let Z=0;if(T){let $=!1;if(Y!==null){let be=Y.texture.format;$=g.has(be)}if($){let be=Y.texture.type,Ue=m.has(be),Me=O.getClearColor(),Re=O.getClearAlpha(),ze=Me.r,tt=Me.g,gt=Me.b;Ue?(v[0]=ze,v[1]=tt,v[2]=gt,v[3]=Re,z.clearBufferuiv(z.COLOR,0,v)):(M[0]=ze,M[1]=tt,M[2]=gt,M[3]=Re,z.clearBufferiv(z.COLOR,0,M))}else Z|=z.COLOR_BUFFER_BIT}B&&(Z|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),k=T},this.dispose=function(){t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),O.dispose(),ve.dispose(),ie.dispose(),Ye.dispose(),Ve.dispose(),C.dispose(),oe.dispose(),q.dispose(),_e.dispose(),He.dispose(),j.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",vd),fe.removeEventListener("sessionend",_d),Ls.stop()};function qe(T){T.preventDefault(),Oa("WebGLRenderer: Context Lost."),D=!0}function rt(){Oa("WebGLRenderer: Context Restored."),D=!1;let T=Nt.autoReset,B=me.enabled,Q=me.autoUpdate,Z=me.needsUpdate,$=me.type;at(),Nt.autoReset=T,me.enabled=B,me.autoUpdate=Q,me.needsUpdate=Z,me.type=$}function Ee(T){je("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ct(T){let B=T.target;B.removeEventListener("dispose",Ct),dn(B)}function dn(T){cs(T),Ve.remove(T)}function cs(T){let B=Ve.get(T).programs;B!==void 0&&(B.forEach(function(Q){j.releaseProgram(Q)}),T.isShaderMaterial&&j.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,Q,Z,$,be){B===null&&(B=nt);let Ue=$.isMesh&&$.matrixWorld.determinantAffine()<0,Me=Cg(T,B,Q,Z,$);xe.setMaterial(Z,Ue);let Re=Q.index,ze=1;if(Z.wireframe===!0){if(Re=q.getWireframeAttribute(Q),Re===void 0)return;ze=2}let tt=Q.drawRange,gt=Q.attributes.position,Fe=tt.start*ze,xt=(tt.start+tt.count)*ze;be!==null&&(Fe=Math.max(Fe,be.start*ze),xt=Math.min(xt,(be.start+be.count)*ze)),Re!==null?(Fe=Math.max(Fe,0),xt=Math.min(xt,Re.count)):gt!=null&&(Fe=Math.max(Fe,0),xt=Math.min(xt,gt.count));let en=xt-Fe;if(en<0||en===1/0)return;_e.setup($,Z,Me,Q,Re);let zt,Dt=K;if(Re!==null&&(zt=w.get(Re),Dt=de,Dt.setIndex(zt)),$.isMesh)Z.wireframe===!0?(xe.setLineWidth(Z.wireframeLinewidth*mt()),Dt.setMode(z.LINES)):Dt.setMode(z.TRIANGLES);else if($.isLine){let _n=Z.linewidth;_n===void 0&&(_n=1),xe.setLineWidth(_n*mt()),$.isLineSegments?Dt.setMode(z.LINES):$.isLineLoop?Dt.setMode(z.LINE_LOOP):Dt.setMode(z.LINE_STRIP)}else $.isPoints?Dt.setMode(z.POINTS):$.isSprite&&Dt.setMode(z.TRIANGLES);if($.isBatchedMesh)if(st.get("WEBGL_multi_draw"))Dt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let _n=$._multiDrawStarts,Oe=$._multiDrawCounts,An=$._multiDrawCount,Et=Re?w.get(Re).bytesPerElement:1,Ns=Ve.get(Z).currentProgram.getUniforms();for(let yn=0;yn<An;yn++)Ns.setValue(z,"_gl_DrawID",yn),Dt.render(_n[yn]/Et,Oe[yn])}else if($.isInstancedMesh)Dt.renderInstances(Fe,en,$.count);else if(Q.isInstancedBufferGeometry){let _n=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Oe=Math.min(Q.instanceCount,_n);Dt.renderInstances(Fe,en,Oe)}else Dt.render(Fe,en)};function xd(T,B,Q,Z){k!==null&&T.isNodeMaterial&&k.setObject(Z,T),le===!0&&ne.setState(T,Q,!1),T.transparent===!0&&T.side===Ht&&T.forceSinglePass===!1?(T.side=Nn,T.needsUpdate=!0,va(T,B,Z),T.side=ni,T.needsUpdate=!0,va(T,B,Z),T.side=Ht):va(T,B,Z)}this.compile=function(T,B,Q=null){Q===null&&(Q=T),k!==null&&k.renderStart(T,B,Q),S=ie.get(Q),S.init(B),b.push(S),Q.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),T!==Q&&T.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),S.setupLights(),k!==null&&k.updateLights(S.state.lightsArray),Ae=this.localClippingEnabled,le=ne.init(this.clippingPlanes,Ae),le===!0&&ne.setGlobalState(this.clippingPlanes,B),k!==null&&me.render(S.state.shadowsArray,Q,B);let Z=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let be=$.material;if(be)if(Array.isArray(be))for(let Ue=0;Ue<be.length;Ue++){let Me=be[Ue];xd(Me,Q,B,$),Z.add(Me)}else xd(be,Q,B,$),Z.add(be)}),S=b.pop(),k!==null&&k.renderEnd(),Z},this.compileAsync=function(T,B,Q=null){let Z=this.compile(T,B,Q);return new Promise($=>{function be(){if(Z.forEach(function(Ue){let Re=Ve.get(Ue).currentProgram;(Re===void 0||Re.isReady())&&Z.delete(Ue)}),Z.size===0){$(T);return}setTimeout(be,10)}st.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let uh=null;function Ag(T){uh&&uh(T)}function vd(){Ls.stop()}function _d(){Ls.start()}let Ls=new J0;Ls.setAnimationLoop(Ag),typeof self<"u"&&Ls.setContext(self),this.setAnimationLoop=function(T){uh=T,fe.setAnimationLoop(T),T===null?Ls.stop():Ls.start()},fe.addEventListener("sessionstart",vd),fe.addEventListener("sessionend",_d),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;k!==null&&k.renderStart(T,B);let Q=fe.enabled===!0&&fe.isPresenting===!0,Z=A!==null&&(Y===null||Q)&&A.begin(R,Y);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(B),B=fe.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,B,Y),S=ie.get(T,b.length),S.init(B),S.state.textureUnits=Ye.getTextureUnits(),b.push(S),ge.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?he.setFromArrayCamera(B):se.setFromProjectionMatrix(ge,ti,B.reversedDepth),Ae=this.localClippingEnabled,le=ne.init(this.clippingPlanes,Ae),E=ve.get(T,y.length),E.init(),y.push(E),this.info.render.frame++,fe.enabled===!0&&fe.isPresenting===!0){let Ue=R.xr.getDepthSensingMesh();Ue!==null&&fh(Ue,B,-1/0,R.sortObjects)}fh(T,B,0,R.sortObjects),E.finish(),k!==null&&k.updateLights(S.state.lightsArray),R.sortObjects===!0&&E.sort(Ce,ct),it=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,it&&O.addToRenderList(E,T),this.info.autoReset===!0&&this.info.reset(),le===!0&&ne.beginShadows();let $=S.state.shadowsArray;if(me.render($,T,B),le===!0&&ne.endShadows(),(Z&&A.hasRenderPass())===!1){let Ue=E.opaque,Me=E.transmissive;if(S.setupLights(),B.isArrayCamera){let Re=B.cameras;if(Me.length>0)for(let ze=0,tt=Re.length;ze<tt;ze++){let gt=Re[ze];Md(Ue,Me,T,gt)}it&&O.render(T);for(let ze=0,tt=Re.length;ze<tt;ze++){let gt=Re[ze];yd(E,T,gt,gt.viewport)}}else Me.length>0&&Md(Ue,Me,T,B),it&&O.render(T),yd(E,T,B)}Y!==null&&P===0&&(Ye.updateMultisampleRenderTarget(Y),Ye.updateRenderTargetMipmap(Y)),Z&&A.end(R),T.isScene===!0&&T.onAfterRender(R,T,B),_e.resetDefaultState(),L=-1,J=null,b.pop(),b.length>0?(S=b[b.length-1],Ye.setTextureUnits(S.state.textureUnits),le===!0&&ne.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,y.pop(),y.length>0?E=y[y.length-1]:E=null,k!==null&&k.renderEnd()};function fh(T,B,Q,Z){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)Q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)S.pushLight(T),T.castShadow&&S.pushShadow(T);else if(T.isSprite){let Ue=B.isArrayCamera?he:se;if(!T.frustumCulled||T.intersectsFrustum(Ue)){Z&&Le.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ge);let Me=oe.update(T),Re=T.material;Re.visible&&E.push(T,Me,Re,Q,Le.z,null,B)}}else if(T.isMesh||T.isLine||T.isPoints){let Ue=B.isArrayCamera?he:se;if(!T.frustumCulled||T.intersectsFrustum(Ue)){let Me=oe.update(T),Re=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Le.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Le.copy(Me.boundingSphere.center)),Le.applyMatrix4(T.matrixWorld).applyMatrix4(ge)),Array.isArray(Re)){let ze=Me.groups;for(let tt=0,gt=ze.length;tt<gt;tt++){let Fe=ze[tt],xt=Re[Fe.materialIndex];xt&&xt.visible&&E.push(T,Me,xt,Q,Le.z,Fe,B)}}else Re.visible&&E.push(T,Me,Re,Q,Le.z,null,B)}}}let be=T.children;for(let Ue=0,Me=be.length;Ue<Me;Ue++)fh(be[Ue],B,Q,Z)}function yd(T,B,Q,Z){let{opaque:$,transmissive:be,transparent:Ue}=T;S.setupLightsView(Q),le===!0&&ne.setGlobalState(R.clippingPlanes,Q),Z&&xe.viewport(I.copy(Z)),$.length>0&&ko($,B,Q),be.length>0&&ko(be,B,Q),Ue.length>0&&ko(Ue,B,Q),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Md(T,B,Q,Z){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[Z.id]===void 0){let Fe=st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[Z.id]=new Yn(1,1,{generateMipmaps:!0,type:Fe?pi:Gn,minFilter:Hn,samples:Math.max(4,St.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ht.workingColorSpace})}let be=S.state.transmissionRenderTarget[Z.id],Ue=Z.viewport||I;be.setSize(Ue.z*R.transmissionResolutionScale,Ue.w*R.transmissionResolutionScale);let Me=R.getRenderTarget(),Re=R.getActiveCubeFace(),ze=R.getActiveMipmapLevel();R.setRenderTarget(be),R.getClearColor(F),ee=R.getClearAlpha(),ee<1&&R.setClearColor(16777215,.5),R.clear(),it&&O.render(Q);let tt=R.toneMapping;R.toneMapping=Ti;let gt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),S.setupLightsView(Z),le===!0&&ne.setGlobalState(R.clippingPlanes,Z),ko(T,Q,Z),Ye.updateMultisampleRenderTarget(be),Ye.updateRenderTargetMipmap(be),st.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let xt=0,en=B.length;xt<en;xt++){let zt=B[xt],{object:Dt,geometry:_n,material:Oe,group:An}=zt;if(Oe.side===Ht&&Dt.layers.test(Z.layers)){let Et=Oe.side;Oe.side=Nn,Oe.needsUpdate=!0,bd(Dt,Q,Z,_n,Oe,An),Oe.side=Et,Oe.needsUpdate=!0,Fe=!0}}Fe===!0&&(Ye.updateMultisampleRenderTarget(be),Ye.updateRenderTargetMipmap(be))}R.setRenderTarget(Me,Re,ze),R.setClearColor(F,ee),gt!==void 0&&(Z.viewport=gt),R.toneMapping=tt}function ko(T,B,Q){let Z=B.isScene===!0?B.overrideMaterial:null;for(let $=0,be=T.length;$<be;$++){let Ue=T[$],{object:Me,geometry:Re,group:ze}=Ue,tt=Ue.material;tt.allowOverride===!0&&Z!==null&&(tt=Z),Me.layers.test(Q.layers)&&bd(Me,B,Q,Re,tt,ze)}}function bd(T,B,Q,Z,$,be){k!==null&&$.isNodeMaterial&&k.setObject(T,$),T.onBeforeRender(R,B,Q,Z,$,be),T.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(R,B,Q,Z,T,be),$.transparent===!0&&$.side===Ht&&$.forceSinglePass===!1?($.side=Nn,$.needsUpdate=!0,R.renderBufferDirect(Q,B,Z,$,T,be),$.side=ni,$.needsUpdate=!0,R.renderBufferDirect(Q,B,Z,$,T,be),$.side=Ht):R.renderBufferDirect(Q,B,Z,$,T,be),T.onAfterRender(R,B,Q,Z,$,be)}function Sd(T){let B=0;for(let Q of T)Q.texture!==null&&B++;return B}function va(T,B,Q){B.isScene!==!0&&(B=nt);let Z=Ve.get(T),$=S.state.lights,be=S.state.shadowsArray,Ue=$.state.version,Me=j.getParameters(T,$.state,be,B,Q,S.state.lightProbeGridArray),Re=j.getProgramCacheKey(Me),ze=Z.programs;Z.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?B.environment:null,Z.fog=B.fog;let tt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;Z.envMap=C.get(T.envMap||Z.environment,tt),Z.envMapRotation=Z.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",Ct),ze=new Map,Z.programs=ze,Z.programVariants=new Map);let gt=ze.get(Re);if(gt!==void 0){if(Z.currentProgram===gt&&Z.lightsStateVersion===Ue)return wd(T,Me),gt}else Me.uniforms=j.getUniforms(T),k!==null&&T.isNodeMaterial&&k.build(T,Q,Me),T.onBeforeCompile(Me,R),gt=j.acquireProgram(Me,Re),ze.set(Re,gt),Z.uniforms=Me.uniforms;let Fe=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=ne.uniform),wd(T,Me),Z.needsLights=Pg(T),Z.lightsStateVersion=Ue,Z.needsLights&&(Fe.ambientLightColor.value=$.state.ambient,Fe.lightProbe.value=$.state.probe,Fe.sunLights.value=$.state.sun,Fe.sunLightShadows.value=$.state.sunShadow,Fe.directionalLights.value=$.state.directional,Fe.directionalLightShadows.value=$.state.directionalShadow,Fe.spotLights.value=$.state.spot,Fe.spotLightShadows.value=$.state.spotShadow,Fe.rectAreaLights.value=$.state.rectArea,Fe.ltc_1.value=$.state.rectAreaLTC1,Fe.ltc_2.value=$.state.rectAreaLTC2,Fe.pointLights.value=$.state.point,Fe.pointLightShadows.value=$.state.pointShadow,Fe.hemisphereLights.value=$.state.hemi,Fe.sunShadowMatrix.value=$.state.sunShadowMatrix,Fe.sunShadowCascade.value=$.state.sunShadowCascade,Fe.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Fe.spotLightMatrix.value=$.state.spotLightMatrix,Fe.spotLightMap.value=$.state.spotLightMap,Fe.pointShadowMatrix.value=$.state.pointShadowMatrix),Z.numLightProbeGrids=Sd(S.state.lightProbeGridArray),Z.currentProgram=gt,Z.uniformsList=null,gt}function Rg(T,B,Q,Z,$){let be=Ve.get(T),Ue=be.currentProgram.id+","+Z+","+$,Me=be.programVariants.get(Ue);return Me===void 0?(Me=va(T,B,Q),be.programVariants.set(Ue,Me)):(be.currentProgram=Me,be.uniformsList=null,be.outputColorSpace=Z,be.toneMapping=$),Me}function Ed(T){if(T.uniformsList===null){let B=T.currentProgram.getUniforms();T.uniformsList=ra.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function wd(T,B){let Q=Ve.get(T);Q.outputColorSpace=B.outputColorSpace,Q.batching=B.batching,Q.batchingColor=B.batchingColor,Q.instancing=B.instancing,Q.instancingColor=B.instancingColor,Q.instancingMorph=B.instancingMorph,Q.skinning=B.skinning,Q.morphTargets=B.morphTargets,Q.morphNormals=B.morphNormals,Q.morphColors=B.morphColors,Q.morphTargetsCount=B.morphTargetsCount,Q.numClippingPlanes=B.numClippingPlanes,Q.numIntersection=B.numClipIntersection,Q.vertexAlphas=B.vertexAlphas,Q.vertexTangents=B.vertexTangents,Q.toneMapping=B.toneMapping}function Cg(T,B,Q,Z,$){B.isScene!==!0&&(B=nt),Ye.resetTextureUnits();let be=B.fog,Ue=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?B.environment:null,Me=Y===null?R.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ht.workingColorSpace,Re=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,ze=C.get(Z.envMap||Ue,Re),tt=Z.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,gt=!!Q.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Fe=!!Q.morphAttributes.position,xt=!!Q.morphAttributes.normal,en=!!Q.morphAttributes.color,zt=Ti;Z.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(zt=R.toneMapping);let Dt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,_n=Dt!==void 0?Dt.length:0,Oe=Ve.get(Z),An=S.state.lights;if(le===!0&&(Ae===!0||T!==J)){let Xt=T===J&&Z.id===L;ne.setState(Z,T,Xt)}let Et=!1,Ns=!1;Z.version===Oe.__version?Oe.needsLights&&Oe.lightsStateVersion!==An.state.version||$.isBatchedMesh&&Oe.batching===!1||!$.isBatchedMesh&&Oe.batching===!0||$.isBatchedMesh&&Oe.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Oe.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Oe.instancing===!1||!$.isInstancedMesh&&Oe.instancing===!0||$.isSkinnedMesh&&Oe.skinning===!1||!$.isSkinnedMesh&&Oe.skinning===!0||$.isInstancedMesh&&Oe.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Oe.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Oe.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Oe.instancingMorph===!1&&$.morphTexture!==null||Oe.envMap!==ze||Z.fog===!0&&Oe.fog!==be||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ne.numPlanes||Oe.numIntersection!==ne.numIntersection)||Oe.vertexAlphas!==tt||Oe.vertexTangents!==gt||Oe.morphTargets!==Fe||Oe.morphNormals!==xt||Oe.morphColors!==en||Oe.morphTargetsCount!==_n||Oe.numLightProbeGrids!==Sd(S.state.lightProbeGridArray)?Et=!0:(Oe.outputColorSpace!==Me||Oe.toneMapping!==zt)&&(Ns=!0):(Et=!0,Oe.__version=Z.version);let yn=Oe.currentProgram;(Et===!0||Ns===!0)&&(yn=Ns===!0?Rg(Z,B,$,Me,zt):va(Z,B,$),k&&Z.isNodeMaterial&&k.onUpdateProgram(Z,yn,Oe));let Ho=!1,hs=!1,Ds=!1,Mt=yn.getUniforms(),gn=Oe.uniforms;if(xe.useProgram(yn.program)&&(Ho=!0,hs=!0,Ds=!0),Z.id!==L&&(L=Z.id,hs=!0),Ho||J!==T){xe.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Mt.setValue(z,"projectionMatrix",T.projectionMatrix),Mt.setValue(z,"viewMatrix",T.matrixWorldInverse);let pn=Mt.map.cameraPosition;pn!==void 0&&pn.setValue(z,Xe.setFromMatrixPosition(T.matrixWorld)),St.logarithmicDepthBuffer&&Mt.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Mt.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),J!==T&&(J=T,hs=!0,Ds=!0)}if(Oe.needsLights&&(An.state.sunShadowMap.length>0&&Mt.setValue(z,"sunShadowMap",An.state.sunShadowMap,Ye),An.state.directionalShadowMap.length>0&&Mt.setValue(z,"directionalShadowMap",An.state.directionalShadowMap,Ye),An.state.spotShadowMap.length>0&&Mt.setValue(z,"spotShadowMap",An.state.spotShadowMap,Ye),An.state.pointShadowMap.length>0&&Mt.setValue(z,"pointShadowMap",An.state.pointShadowMap,Ye)),$.isSkinnedMesh){Mt.setOptional(z,$,"bindMatrix"),Mt.setOptional(z,$,"bindMatrixInverse");let Xt=$.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),Mt.setValue(z,"boneTexture",Xt.boneTexture,Ye))}$.isBatchedMesh&&(Mt.setOptional(z,$,"batchingTexture"),Mt.setValue(z,"batchingTexture",$._matricesTexture,Ye),Mt.setOptional(z,$,"batchingIdTexture"),Mt.setValue(z,"batchingIdTexture",$._indirectTexture,Ye),Mt.setOptional(z,$,"batchingColorTexture"),$._colorsTexture!==null&&Mt.setValue(z,"batchingColorTexture",$._colorsTexture,Ye));let oi=Q.morphAttributes;if((oi.position!==void 0||oi.normal!==void 0||oi.color!==void 0)&&H.update($,Q,yn),(hs||Oe.receiveShadow!==$.receiveShadow)&&(Oe.receiveShadow=$.receiveShadow,Mt.setValue(z,"receiveShadow",$.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&B.environment!==null&&(gn.envMapIntensity.value=B.environmentIntensity),gn.dfgLUT!==void 0&&(gn.dfgLUT.value=eb()),hs){if(Mt.setValue(z,"toneMappingExposure",R.toneMappingExposure),Oe.needsLights&&Ig(gn,Ds),be&&Z.fog===!0&&ue.refreshFogUniforms(gn,be),ue.refreshMaterialUniforms(gn,Z,ye,Ne,S.state.transmissionRenderTarget[T.id]),Oe.needsLights&&Oe.numLightProbeGrids>0){let Xt=_,pn=0;for(let Di of S.state.lightProbeGridArray)Di.texture!==null&&(Xt.textures[pn]=Di.texture,Xt.min[pn]=Di.boundingBox.min,Xt.max[pn]=Di.boundingBox.max,Xt.resolution[pn]=Di.resolution,pn++);for(let Di in Xt)Xt[Di].length=pn;gn.probesSH.value=Xt.textures,gn.probesMin.value=Xt.min,gn.probesMax.value=Xt.max,gn.probesResolution.value=Xt.resolution}ra.upload(z,Ed(Oe),gn,Ye)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ra.upload(z,Ed(Oe),gn,Ye),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Mt.setValue(z,"center",$.center),Mt.setValue(z,"modelViewMatrix",$.modelViewMatrix),Mt.setValue(z,"normalMatrix",$.normalMatrix),Mt.setValue(z,"modelMatrix",$.matrixWorld),Z.uniformsGroups!==void 0){let Xt=Z.uniformsGroups;for(let pn=0,Di=Xt.length;pn<Di;pn++){let Ad=Xt[pn];He.update(Ad,yn),He.bind(Ad,yn)}}return yn}function Ig(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.sunLights.needsUpdate=B,T.sunLightShadows.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Pg(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(T,B,Q){let Z=Ve.get(T);Z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Ve.get(T.texture).__webglTexture=B,Ve.get(T.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:Q,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,B){let Q=Ve.get(T);Q.__webglFramebuffer=B,Q.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,Q=0){Y=T,V=B,P=Q;let Z=null,$=!1,be=!1;if(T){let Me=Ve.get(T);if(Me.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(z.FRAMEBUFFER,Me.__webglFramebuffer),I.copy(T.viewport),te.copy(T.scissor),W=T.scissorTest,xe.viewport(I),xe.scissor(te),xe.setScissorTest(W),L=-1;return}else if(Me.__webglFramebuffer===void 0)Ye.setupRenderTarget(T);else if(Me.__hasExternalTextures)Ye.rebindTextures(T,Ve.get(T.texture).__webglTexture,Ve.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let tt=T.depthTexture;if(Me.__boundDepthTexture!==tt){if(tt!==null&&Ve.has(tt)&&(T.width!==tt.image.width||T.height!==tt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ye.setupDepthRenderbuffer(T)}}let Re=T.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(be=!0);let ze=Ve.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[B])?Z=ze[B][Q]:Z=ze[B],$=!0):T.samples>0&&Ye.useMultisampledRTT(T)===!1?Z=Ve.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?Z=ze[Q]:Z=ze,I.copy(T.viewport),te.copy(T.scissor),W=T.scissorTest}else I.copy(De).multiplyScalar(ye).floor(),te.copy(Je).multiplyScalar(ye).floor(),W=$e;if(Q!==0&&(Z=X),xe.bindFramebuffer(z.FRAMEBUFFER,Z)&&xe.drawBuffers(T,Z),xe.viewport(I),xe.scissor(te),xe.setScissorTest(W),$){let Me=Ve.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,Me.__webglTexture,Q)}else if(be){let Me=B;for(let Re=0;Re<T.textures.length;Re++){let ze=Ve.get(T.textures[Re]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Re,ze.__webglTexture,Q,Me)}}else if(T!==null&&Q!==0){let Me=Ve.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Me.__webglTexture,Q)}L=-1};function Td(T){let B=Ve.get(T);return(B.__readFormat!==T.format||B.__readType!==T.type)&&(B.__readFormat=T.format,B.__readType=T.type,B.__formatReadable=St.textureFormatReadable(T.format),B.__typeReadable=St.textureTypeReadable(T.type)),B}this.readRenderTargetPixels=function(T,B,Q,Z,$,be,Ue,Me=0){if(!(T&&T.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Ve.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ue!==void 0&&(Re=Re[Ue],Array.isArray(Re)&&(Re=Re[0])),Re){xe.bindFramebuffer(z.FRAMEBUFFER,Re);try{let ze=T.textures[Me],tt=ze.format,gt=ze.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Me);let Fe=Td(ze);if(Fe.__formatReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Fe.__typeReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-Z&&Q>=0&&Q<=T.height-$&&z.readPixels(B,Q,Z,$,pe.convert(tt),pe.convert(gt),be)}finally{let ze=Y!==null?Ve.get(Y).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(T,B,Q,Z,$,be,Ue,Me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Ve.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ue!==void 0&&(Re=Re[Ue],Array.isArray(Re)&&(Re=Re[0])),Re)if(B>=0&&B<=T.width-Z&&Q>=0&&Q<=T.height-$){xe.bindFramebuffer(z.FRAMEBUFFER,Re);let ze=T.textures[Me],tt=ze.format,gt=ze.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Me);let Fe=Td(ze);if(Fe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Fe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,xt),z.bufferData(z.PIXEL_PACK_BUFFER,be.byteLength,z.STREAM_READ),z.readPixels(B,Q,Z,$,pe.convert(tt),pe.convert(gt),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let en=Y!==null?Ve.get(Y).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,en);let zt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await _0(z,zt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,xt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,be),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(xt),z.deleteSync(zt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,B=null,Q=0){let Z=Math.pow(2,-Q),$=Math.floor(T.image.width*Z),be=Math.floor(T.image.height*Z),Ue=B!==null?B.x:0,Me=B!==null?B.y:0;Ye.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,Q,0,0,Ue,Me,$,be),xe.unbindTexture()},this.copyTextureToTexture=function(T,B,Q=null,Z=null,$=0,be=0){let Ue,Me,Re,ze,tt,gt,Fe,xt,en,zt=T.isCompressedTexture?T.mipmaps[be]:T.image;if(Q!==null)Ue=Q.max.x-Q.min.x,Me=Q.max.y-Q.min.y,Re=Q.isBox3?Q.max.z-Q.min.z:1,ze=Q.min.x,tt=Q.min.y,gt=Q.isBox3?Q.min.z:0;else{let Mt=Math.pow(2,-$);Ue=Math.floor(zt.width*Mt),Me=Math.floor(zt.height*Mt),T.isDataArrayTexture?Re=zt.depth:T.isData3DTexture?Re=Math.floor(zt.depth*Mt):Re=1,ze=0,tt=0,gt=0}Z!==null?(Fe=Z.x,xt=Z.y,en=Z.z):(Fe=0,xt=0,en=0);let Dt=pe.convert(B.format),_n=pe.convert(B.type),Oe;B.isData3DTexture?(Ye.setTexture3D(B,0),Oe=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Ye.setTexture2DArray(B,0),Oe=z.TEXTURE_2D_ARRAY):(Ye.setTexture2D(B,0),Oe=z.TEXTURE_2D),xe.activeTexture(z.TEXTURE0),xe.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),xe.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),xe.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);let An=xe.getParameter(z.UNPACK_ROW_LENGTH),Et=xe.getParameter(z.UNPACK_IMAGE_HEIGHT),Ns=xe.getParameter(z.UNPACK_SKIP_PIXELS),yn=xe.getParameter(z.UNPACK_SKIP_ROWS),Ho=xe.getParameter(z.UNPACK_SKIP_IMAGES);xe.pixelStorei(z.UNPACK_ROW_LENGTH,zt.width),xe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,zt.height),xe.pixelStorei(z.UNPACK_SKIP_PIXELS,ze),xe.pixelStorei(z.UNPACK_SKIP_ROWS,tt),xe.pixelStorei(z.UNPACK_SKIP_IMAGES,gt);let hs=T.isDataArrayTexture||T.isData3DTexture,Ds=B.isDataArrayTexture||B.isData3DTexture;if(T.isDepthTexture){let Mt=Ve.get(T),gn=Ve.get(B),oi=Ve.get(Mt.__renderTarget),Xt=Ve.get(gn.__renderTarget);xe.bindFramebuffer(z.READ_FRAMEBUFFER,oi.__webglFramebuffer),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,Xt.__webglFramebuffer);for(let pn=0;pn<Re;pn++)hs&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ve.get(T).__webglTexture,$,gt+pn),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ve.get(B).__webglTexture,be,en+pn)),z.blitFramebuffer(ze,tt,ze+Ue,tt+Me,Fe,xt,Fe+Ue,xt+Me,z.DEPTH_BUFFER_BIT,z.NEAREST);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||Ve.has(T)){let Mt=Ve.get(T),gn=Ve.get(B);xe.bindFramebuffer(z.READ_FRAMEBUFFER,U),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,G);for(let oi=0;oi<Re;oi++)hs?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Mt.__webglTexture,$,gt+oi):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Mt.__webglTexture,$),Ds?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,gn.__webglTexture,be,en+oi):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,gn.__webglTexture,be),$!==0?z.blitFramebuffer(ze,tt,ze+Ue,tt+Me,Fe,xt,Fe+Ue,xt+Me,z.COLOR_BUFFER_BIT,z.NEAREST):Ds?z.copyTexSubImage3D(Oe,be,Fe,xt,en+oi,ze,tt,Ue,Me):z.copyTexSubImage2D(Oe,be,Fe,xt,ze,tt,Ue,Me);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Ds?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(Oe,be,Fe,xt,en,Ue,Me,Re,Dt,_n,zt.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(Oe,be,Fe,xt,en,Ue,Me,Re,Dt,zt.data):z.texSubImage3D(Oe,be,Fe,xt,en,Ue,Me,Re,Dt,_n,zt):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,be,Fe,xt,Ue,Me,Dt,_n,zt.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,be,Fe,xt,zt.width,zt.height,Dt,zt.data):z.texSubImage2D(z.TEXTURE_2D,be,Fe,xt,Ue,Me,Dt,_n,zt);xe.pixelStorei(z.UNPACK_ROW_LENGTH,An),xe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Et),xe.pixelStorei(z.UNPACK_SKIP_PIXELS,Ns),xe.pixelStorei(z.UNPACK_SKIP_ROWS,yn),xe.pixelStorei(z.UNPACK_SKIP_IMAGES,Ho),be===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&z.generateMipmap(Oe),xe.unbindTexture()},this.initRenderTarget=function(T){Ve.get(T).__webglFramebuffer===void 0&&Ye.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ye.setTextureCube(T,0):T.isData3DTexture?Ye.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ye.setTexture2DArray(T,0):Ye.setTexture2D(T,0),xe.unbindTexture()},this.resetState=function(){V=0,P=0,Y=null,xe.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}};var hf=["diver","warden","drill","kestrel","engine"];function om(){let s=new ts,e=new Map,t=new Map;function n(i){if(!hf.includes(i)||e.has(i))return Promise.resolve(!0);if(!t.has(i)){let r="./art/"+i+"-skin.webp",a=s.loadAsync(r).catch(()=>s.loadAsync(r)).then(o=>(o.colorSpace=vt,e.set(i,o),!0)).catch(()=>!1).finally(()=>t.delete(i));t.set(i,a)}return t.get(i)}return{get:i=>e.get(i),prepare:n}}function lm(s,e,t){let n=t.clone(),i=[];s.updateMatrixWorld(!0);let r=s.matrixWorld.clone().invert(),a=new Ge,o=new N,c=.52,l=Math.cos(c),h=Math.sin(c),f=1/0,u=-1/0,d=1/0,p=-1/0;s.traverse(x=>{if(!x.isMesh||x.material!==t)return;let g=x.geometry,m=g.getAttribute("position"),v=g.getAttribute("normal"),M=new Float32Array(m.count*3);a.multiplyMatrices(r,x.matrixWorld);let _=new Qe().getNormalMatrix(a);for(let E=0;E<m.count;E++){o.fromBufferAttribute(m,E).applyMatrix4(a);let S=o.y*l-o.z*h;f=Math.min(f,o.x),u=Math.max(u,o.x),d=Math.min(d,S),p=Math.max(p,S),M[3*E]=o.x,M[3*E+1]=S,o.fromBufferAttribute(v,E).applyMatrix3(_).normalize(),M[3*E+2]=Be.smoothstep(o.y*h+o.z*l,-.34,.35)}i.push([g,M,x])});for(let[x,g,m]of i){for(let v=0;v<g.length;v+=3)g[v]=.014+.972*(g[v]-f)/(u-f),g[v+1]=.015+.97*(g[v+1]-d)/(p-d);x.setAttribute("portraitUv",new kt(g,3)),m.material=n}n.onBeforeCompile=x=>{x.uniforms.paintedSurface={value:e},x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
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
        diffuseColor.rgb*=1.+.032*grain;`)}}var cm=`
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
  }`;function hm(s,e){let n={diver:4,warden:2.79,drill:3.13,kestrel:4.55,engine:4.11}[s],i=n*e.image.height/e.image.width,r=new Ot({uniforms:{paint:{value:e},motion:{value:new ut},kind:{value:hf.indexOf(s)},fall:{value:0},bodyWidth:{value:n},bodyHeight:{value:i},hit:{value:0}},vertexShader:cm,fragmentShader:`varying vec2 tex;uniform sampler2D paint;uniform float hit;
   void main(){vec4 p=texture2D(paint,tex);if(p.a<.27)discard;gl_FragColor=vec4(mix(p.rgb,vec3(1.,.76,.42),hit*.29),p.a);
   #include <colorspace_fragment>
   }`,side:Ht,alphaToCoverage:!0}),a=new Ke(new Ft(1,1,30,30),r);return a.frustumCulled=!1,{mesh:a,pose(o){let c=r.uniforms;c.motion.value.set(s==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),c.fall.value=o.down,c.hit.value=o.hit}}}var tb={captain:[[.43,.77,.31,.24,.99],[.44,.48,.34,.2,.83],[.16,.49,.16,.19,.65],[.8,.49,.18,.22,.71],[.84,.76,.13,.34,.92],[.43,.17,.18,.23,.74],[.65,.2,.14,.22,.69]],infantry:[[.5,.76,.38,.24,.98],[.5,.47,.28,.22,.85],[.19,.47,.15,.2,.6],[.82,.46,.14,.2,.62],[.37,.2,.19,.23,.69],[.66,.2,.17,.22,.65],[.46,.09,.17,.1,.76]],diver:[[.5,.64,.29,.27,1],[.2,.29,.17,.2,.82],[.82,.28,.17,.2,.82],[.5,.49,.15,.13,.62]],warden:[[.5,.7,.36,.32,1.04],[.53,.42,.22,.19,.75],[.64,.44,.12,.19,.98],[.24,.18,.15,.22,.59],[.76,.18,.14,.21,.59]],drill:[[.36,.47,.26,.27,1.02],[.68,.27,.25,.21,.72],[.7,.8,.25,.16,.65]],kestrel:[[.51,.48,.15,.27,.95],[.5,.34,.12,.13,.82],[.3,.18,.15,.17,.5],[.71,.26,.14,.13,.52]],engine:[[.5,.6,.3,.32,.95],[.5,.37,.18,.19,.83],[.31,.82,.14,.18,.65],[.69,.82,.14,.18,.65]]};function Kc(s,e,t,n){let i=s==="infantry"||s==="captain",r=s==="captain"?44:i?22:80,o=Math.max(i?30:54,Math.round(r*e.image.height/e.image.width)),c=document.createElement("canvas");c.width=r+1,c.height=o+1;let l=c.getContext("2d",{willReadFrequently:!0});l.drawImage(e.image,0,0,r+1,o+1);let h=l.getImageData(0,0,r+1,o+1).data,f=(r+1)*(o+1),u=new Float32Array(f);for(let S=0;S<f;S++)u[S]=h[S*4+3]>88?1e3:0;for(let S=1;S<o;S++)for(let y=1;y<r;y++){let b=S*(r+1)+y;u[b]=Math.min(u[b],u[b-1]+1,u[b-r-1]+1,u[b-r-2]+1.414)}for(let S=o-1;S>0;S--)for(let y=r-1;y>0;y--){let b=S*(r+1)+y;u[b]=Math.min(u[b],u[b+1]+1,u[b+r+1]+1,u[b+r+2]+1.414)}let d=[],p=[],x=[],g=[],m=new Uint8Array(r*o),v=i?.43:.64,M=Math.cos(v),_=Math.sin(v);for(let S of[!0,!1])for(let y=0;y<=o;y++)for(let b=0;b<=r;b++){let A=y*(r+1)+b,R=b/r,D=1-y/o,k=0;for(let[L,J,I,te,W]of tb[s])k=Math.max(k,W*Math.exp(-1.6*(((R-L)/I)**2+((D-J)/te)**2)));let X=Math.min(1,u[A]/(r*.11)),U=i?Be.smoothstep(X,0,1)*Be.smoothstep(h[A*4+3],65,215):Math.pow(X,.6),G=(.28*h[A*4]+.55*h[A*4+1]+.17*h[A*4+2])/255,V=(.023+U*((s==="kestrel"?.085:.2)+k*.86))*Math.min(1.26,t/3),P=S?V*(.87+G*.13):-(i?.67:.99)*V,Y=D*n;d.push((R-.5)*t,Y*M+P*_+.025,(i?.09:.46)-Y*_+P*M),p.push(R,D),g.push(S?1:0)}for(let S=0;S<o;S++)for(let y=0;y<r;y++){let b=S*(r+1)+y;m[S*r+y]=[b,b+1,b+r+1,b+r+2].some(A=>h[A*4+3]>80)?1:0}for(let S=0;S<o;S++)for(let y=0;y<r;y++){if(!m[S*r+y])continue;let b=S*(r+1)+y,A=b+1,R=b+r+1,D=R+1;x.push(b,R,A,A,R,D,b+f,A+f,R+f,A+f,D+f,R+f);let k=(X,U)=>x.push(X,U,X+f,U,U+f,X+f);(!y||!m[S*r+y-1])&&k(R,b),(y===r-1||!m[S*r+y+1])&&k(A,D),(!S||!m[(S-1)*r+y])&&k(b,A),(S===o-1||!m[(S+1)*r+y])&&k(D,R)}let E=new _t;return E.setAttribute("position",new We(d,3)),E.setAttribute("uv",new We(p,2)),E.setAttribute("surface",new We(g,1)),E.setIndex(x),E.computeVertexNormals(),E}function um(s,e){let t={diver:4.12,warden:2.9,drill:3.15,kestrel:4.43,engine:4.08}[s],n=t*e.image.height/e.image.width,i=Kc(s,e,t,n),r=new Ot({side:Ht,alphaToCoverage:!0,uniforms:{paint:{value:e},motion:{value:new ut},kind:{value:hf.indexOf(s)},fall:{value:0},bodyWidth:{value:t},bodyHeight:{value:n},hit:{value:0}},vertexShader:cm.replace("varying vec2 tex;","attribute float surface;varying float cap;varying vec3 ns;varying vec2 tex;").replace("tex=uv;","tex=uv;cap=surface;ns=normalize(normalMatrix*normal);").replace("gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);",`
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
     }`}),a=new Ke(i,r);return a.frustumCulled=!1,{mesh:a,pose(o){r.uniforms.motion.value.set(s==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),r.uniforms.fall.value=o.down,r.uniforms.hit.value=o.hit}}}var oa=.18700000000000003,dm=Math.PI*2;function fm(s){if(s<.55)return 1-2*s/.55;let e=(s-.55)/(1-.55),t=e*e*(3-2*e),n=2*(1-.55)/.55*e*(1-e)*(1-2*e);return-1+2*t-n}function ws(s,e,t){let n=s/dm%1,i=(n+.5)%1;t[0]=fm(n)*e,t[1]=fm(i)*e;let r=Math.max(n,i),a=r>.55?Math.sin(Math.PI*(r-.55)/(1-.55))**2:0;return t[2]=(r===n?1:-1)*a*e,t}function la(s){return s.phase+dm*s.marched/(.68*s.size)}function uf(s,e,t,n,i){let r=s==="captain",a=s!=="red",o=r?Kc("captain",e,1.13,1.73):Kc("infantry",e,a?.47:.53,.86);o.setAttribute("stepPose",n);let c=new Ot({side:ni,alphaToCoverage:!0,defines:r?{CAPTAIN:1}:{},uniforms:{recoil:{value:0},lean:{value:0},portrait:{value:e},reverse:{value:t},facing:{value:a?-1:1}},vertexShader:`
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
        p.z += facing * stride * (${oa} * leg - 0.105 * arm);
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
      }`}),l=new Yt(o,c,i);return l.name=r?"\u84DD\u961F\u91CD\u70AE\u961F\u957F":a?"\u84DD\u961F\u91CE\u6218\u5236\u670D":"\u7EA2\u961F\u91CE\u6218\u5236\u670D",l.count=0,l.frustumCulled=!1,l}function pm(s,e){let t=new Float32Array(3),n=new Jt(new Float32Array(4),4).setUsage(cn),i=uf("captain",s,e,n,1);return i.setMatrixAt(0,new Ge),i.count=1,{mesh:i,pose(r,a,o,c,l){ws(r*9.03,a,t),n.setXYZW(0,Math.min(.66,l*.55),t[0],t[1],t[2]),n.needsUpdate=!0,i.material.uniforms.lean.value=c,i.material.uniforms.recoil.value=o}}}function Po(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new _t;c.morphTargetsRelative=o;let l=0;for(let h=0;h<s.length;++h){let f=s[h],u=0,d=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in f.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[p].length!==s[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(f.morphAttributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(t){let h=0,f=[];for(let u=0;u<s.length;++u){let d=s[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=s[u].attributes.position.count}c.setIndex(f)}for(let h in r){let f=mm(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let x=0;x<a[h].length;++x)d.push(a[h][x][u]);let p=mm(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function mm(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new kt(a,t,n),c=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute){let f=c/t;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<t;p++){let x=h.getComponent(u,p);o.setComponent(u+f,p,x)}}else a.set(h.array,c);c+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function ff(s,e){if(e===Nu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ia||e===To){let t=s.getIndex();if(t===null){let r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ia)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var nb=Math.PI*2,wn=[0,0,0],Ts={blue:1085152,blueShade:479381,ice:7985151,navy:1453392,skin:15840638,skinShade:13208928,khaki:13675111,tan:11960903,leather:5518632,dark:2434352,gun:2504008,steel:8492968,red:15150389,wine:9377830,orange:16756781,gold:15775821};function ib(s,e=16,t=1,n=null){let i=[],r=[],a=n?e+1:e,o=n?n[0]:0,c=n?n[1]-n[0]:nb;for(let[h,f,u,d=0,p=0]of s)for(let x=0;x<a;x++){let g=o+c*x/e,m=Math.sin(g),v=Math.cos(g);i.push(d+f*Math.sign(m)*Math.abs(m)**t,h,p+u*Math.sign(v)*Math.abs(v)**t)}for(let h=0;h<s.length-1;h++)for(let f=0;f<e;f++){let u=n?f+1:(f+1)%a,d=h*a+f,p=h*a+u;r.push(d,p,d+a,p,p+a,d+a)}if(!n)for(let h of[!1,!0]){let f=h?s.length-1:0,[u,,,d=0,p=0]=s[f],x=i.length/3;i.push(d,u,p);let g=f*a;for(let m=0;m<e;m++){let v=g+m,M=g+(m+1)%e;h?r.push(x,v,M):r.push(x,M,v)}}let l=new _t;return l.setAttribute("position",new We(i,3)),l.setIndex(r),l.computeVertexNormals(),l}function sb(s=12,e=8){return new fi(1,s,e)}function si(s,e,t,n=t,i=8){let r=new N(...s),a=new N(...e),o=a.clone().sub(r),c=new Qt(n,t,o.length(),i);c.applyQuaternion(new on().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.add(a).multiplyScalar(.5);return c.translate(l.x,l.y,l.z)}function Lo(s,e,t=6){let n=new Zi(s.map(i=>new N(...i)));return new $s(n,(s.length-1)*3,e,t,!1)}function rb(){let s=new Bt({vertexColors:!0,shininess:18,specular:3156007});return s.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <begin_vertex>",`#include <begin_vertex>
fabricPoint=position;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec2 stitch=vec2(fabricPoint.x+.42*fabricPoint.z,fabricPoint.y)*175.;
        vec2 weight=1.-smoothstep(vec2(.75),vec2(2.7),fwidth(stitch));
        float thread=dot(sin(stitch*3.14159),weight)*.024;
        diffuseColor.rgb*=1.+thread;`)},{cloth:s,lacquer:new Bt({vertexColors:!0,shininess:58,specular:7175302}),metal:new Bt({vertexColors:!0,shininess:78,specular:10201786})}}var rs=class{constructor(){this.byFinish=new Map}add(e,t,n=wn,i=[1,1,1],r=wn,a="cloth"){let o=new Ge().compose(new N(...n),new on().setFromEuler(new Vt(...r)),new N(...i));e.applyMatrix4(o),e.deleteAttribute("uv"),e.clearGroups();let c=e.attributes.position.count;e.index===null&&e.setIndex(Array.from({length:c},(f,u)=>u));let l=new we(t),h=new Float32Array(c*3);for(let f=0;f<c;f++){let u=f*3;h[u]=l.r,h[u+1]=l.g,h[u+2]=l.b}e.setAttribute("color",new kt(h,3)),this.limb!==void 0&&e.setAttribute("limb",new We(new Float32Array(c).fill(this.limb),1)),this.byFinish.has(a)||this.byFinish.set(a,[]),this.byFinish.get(a).push(e)}shape(e,t,n={}){let{sides:i=16,power:r=1,arc:a=null,at:o,scale:c,rotate:l,finish:h}=n;this.add(ib(e,i,r,a),t,o,c,l,h)}ell(e,t,n,i=wn,r="cloth",a=14,o=8){this.add(sb(a,o),e,t,n,i,r)}box(e,t,n,i=wn,r="cloth"){this.add(new Pn(1,1,1),e,t,n,i,r)}joinGeometry(){let e=Po([...this.byFinish.values()].flat(),!1);return e.computeBoundingSphere(),e.computeBoundingBox(),e}attach(e,t){for(let[n,i]of this.byFinish){let r=new Ke(Po(i,!1),t[n]);r.castShadow=!0,e.add(r)}}};function As(s,e=0,t=0,n=0){let i=new It;return i.position.set(e,t,n),s.add(i),i}function xm(s,e="near"){let t=s==="red",n=e==="far",i=new rs,r=t?15873338:1351656,a=t?11542827:1399980,o=t?10829881:12949854,c=n?6:10,l=n?5:8;for(let f of[-1,1]){i.limb=f;let u=f*.081;i.shape([[.01,.058,.105,u,-.031],[.05,.068,.11,u,-.032],[.12,.05,.067,u]],3484976,{sides:n?4:6,power:.72}),i.shape([[.075,.055,.058,u],[.22,.068,.074,u*.91],[.3,.073,.078,u*.83]],t?6701875:2906496,{sides:n?4:6})}i.limb=0,i.shape([[.235,.117,.081],[.3,.151,.114],[.42,.153,.101],[.485,.118,.084]],o,{sides:n?5:8,power:.89}),n||(i.shape([[.274,.137,.11],[.307,.151,.117]],6899252,{sides:8}),i.box(10712389,[0,.365,.097],[.093,.118,.045],[.03,0,.08]));for(let f of[-1,1]){i.limb=f*2;let u=f*.166;i.shape([[.26,.037,.044,u*1.12,-.031],[.298,.055,.06,u*1.07,-.03],[.386,.052,.057,u,.007],[.444,.05,.058,u*.91]],15772528,{sides:n?4:6}),n||i.ell(o,[u*.88,.427,.008],[.083,.078,.092],wn,"cloth",6,3)}if(i.limb=0,i.shape([[.43,.072,.073,0,-.012],[.462,.127,.1,0,-.016],[.548,.161,.14],[.635,.162,.149]],16761484,{sides:l,power:.82}),n||(i.ell(14129257,[-.151,.546,.005],[.033,.046,.041],wn,"cloth",5,3),i.ell(14129257,[.151,.546,.005],[.033,.046,.041],wn,"cloth",5,3)),i.shape([[.548,.177,.162,0,.009],[.585,.221,.198],[.613,.215,.195]],a,{sides:c}),i.shape([[.595,.224,.2],[.644,.229,.211],[.744,.204,.19],[.818,.132,.124],[.847,.054,.052]],r,{sides:c}),!n){if(i.shape([[.589,.221,.201],[.605,.226,.205]],t?16145742:7194613,{sides:10}),i.limb=0,t){for(let f of[.66,.698])i.box(16768401,[0,f,-.203],[.09,.019,.017],[-.23,0,0]);i.add(si([-.093,.449,-.096],[.107,.291,-.111],.017,.018,5),5847082),i.box(14923627,[.027,.356,-.127],[.041,.031,.014],[0,0,-.57]);for(let f of[-1,1])i.box(7422515,[f*.093,.302,-.098],[.067,.065,.04],[0,-f*.23,0]),i.box(12621402,[f*.093,.318,-.121],[.055,.018,.012]),i.box(14198113,[f*.11,.448,-.031],[.054,.019,.097],[0,0,-f*.28])}else{i.box(3690845,[0,.351,.116],[.194,.177,.086]),i.box(5010046,[0,.356,.163],[.159,.118,.02]),i.add(si([-.109,.447,.13],[.109,.447,.13],.039,.039,8),14334075);for(let f of[-1,1])i.box(7031092,[f*.053,.372,.179],[.023,.171,.018]),i.box(14727549,[f*.053,.335,.189],[.036,.025,.014]);i.add(Lo([[0,.65,.205],[0,.739,.189],[0,.808,.127],[0,.845,.05],[0,.852,-.027]],.014,6),9558778)}t||(i.limb=2,i.add(si([.163,.264,.032],[.173,.525,-.19],.026,.026,5),Ts.gun),i.add(si([.173,.51,-.18],[.173,.656,-.268],.013,.013,5),2966610))}if(t){i.ell(a,[0,.583,-.12],[.18,.019,.133],[-.14,0,0],"cloth",8,3),i.ell(15706736,[0,.514,-.139],[.042,.042,.061],wn,"cloth",5,3),n&&i.box(16762755,[0,.68,-.196],[.09,.027,.013],[-.28,0,0]);for(let f of[-1,1])i.ell(4336940,[f*.061,.536,-.14],[.026,.022,.015],[0,-f*.28,-f*.12],"cloth",5,3)}let h=i.joinGeometry();return h.scale(1.055,1.016,1),t&&h.rotateY(Math.PI),h.computeBoundingBox(),h}function vm(s){let e=new rs;if(s==="guard")e.box(5399670,[.12,.32,.155],[.25,.34,.065],[-.12,0,-.045]),e.box(11978175,[.12,.36,.194],[.2,.038,.014]);else if(s==="gunner")e.add(si([.14,.33,.07],[.13,.37,.39],.04,.03,6),3490385),e.add(si([.13,.37,.38],[.13,.38,.47],.038,.038,6),8159365);else if(s==="standard")e.add(si([-.18,.19,-.05],[-.18,1.09,-.05],.025,.02,6),7626823),e.box(15382366,[-.18,1.08,-.04],[.078,.06,.078]),e.box(10890041,[-.01,.93,-.05],[.33,.22,.043],[-.08,0,-.09]),e.box(16767874,[-.035,.92,-.02],[.18,.043,.02]);else if(s==="courier")e.box(13744003,[.18,.34,.1],[.26,.22,.14],[0,0,-.16]),e.box(16773587,[.18,.34,.177],[.17,.145,.018]),e.box(12011077,[.18,.34,.196],[.035,.12,.01]),e.box(12011077,[.18,.34,.196],[.12,.035,.01]);else if(s==="vault")e.add(si([.22,.07,.46],[.16,1.19,-.53],.027,.017,8),16764021),e.add(si([.2,.32,.24],[.195,.47,.11],.033,.033,8),4411998);else{e.box(6636858,[0,.38,.12],[.23,.15,.082]);for(let t of[-.068,0,.068])e.add(si([t,.32,.163],[t,.45,.17],.029,.029,6),14633778)}return e.joinGeometry()}function gm(s,e,t){let n=As(s,e*.117,.607,0),i=new rs;return i.shape([[-.385,.063,.064,e*.013,.016],[-.29,.086,.082,e*.012,.012],[-.165,.103,.103,e*.007,-.005],[-.032,.111,.114],[.036,.079,.086]],3629962,{sides:12}),i.shape([[-.59,.078,.142,e*.013,-.045],[-.553,.091,.153,e*.012,-.044],[-.493,.092,.141,e*.012,-.036],[-.448,.079,.082,e*.012,.012],[-.299,.08,.077,e*.012,.018]],5586993,{sides:12,power:.74}),i.shape([[-.606,.081,.143,e*.013,-.045],[-.586,.092,.151,e*.013,-.046],[-.565,.092,.151,e*.013,-.045]],3485490,{sides:12,power:.7}),i.shape([[-.327,.081,.079,e*.012,.015],[-.291,.086,.084,e*.012,.014]],9134660,{sides:12}),i.attach(n,t),n}function _m(){let s=new It,e=rb(),t=As(s),n=gm(t,-1,e),i=gm(t,1,e),r=As(t,0,.62),a=new rs;a.shape([[-.075,.183,.122],[.005,.217,.15],[.102,.221,.156],[.264,.274,.19],[.367,.285,.177],[.416,.191,.131]],Ts.khaki,{power:.8}),a.shape([[-.046,.216,.146],[-.008,.226,.155],[.045,.227,.158]],Ts.leather,{sides:16,power:.8}),a.shape([[.358,.185,.128],[.392,.187,.136],[.431,.165,.12]],15977614,{sides:14}),a.shape([[.375,.102,.106],[.502,.106,.099]],Ts.skinShade);let o=[];for(let m of[-1,1]){let v=m*.158;a.add(Lo([[v*.8,.005,.155],[v*.85,.135,.179],[v,.29,.168],[v,.37,.126],[v*.85,.405,.014],[v*.81,.36,-.111]],.027),7950390),a.box(12164198,[v*.89,.22,.192],[.064,.035,.015],[0,0,m*.065],"metal");let M=As(r,v*1.47,.34,0),_=As(M,-v*1.47,-.34,0);o.push(M);let E=new rs;E.shape([[.144,.078,.084,v*1.62,.042],[.207,.102,.109,v*1.66,.022],[.307,.107,.112,v*1.6],[.342,.07,.073,v*1.47]],13210966,{sides:12}),E.add(si([v*1.74,.18,.038],[v*1.88,.074,-.092],.066,.059,10),Ts.skin),E.ell(9069123,[v*1.88,.078,-.105],[.07,.068,.076],[.22,0,0]),E.attach(_,e)}for(let m of[-1,1])a.box(13015648,[m*.124,.22,-.157],[.126,.101,.03],[.08,m*.16,0]),a.box(15122300,[m*.124,.249,-.174],[.13,.037,.016],[.1,m*.16,0]);a.box(13280874,[0,-.011,-.153],[.1,.061,.021],wn,"metal"),a.box(9987129,[0,.077,.144],[.17,.112,.074],[.08,0,0]),a.box(12289103,[0,.101,.184],[.172,.062,.02],[.12,0,0]),a.add(Lo([[-.165,.034,.158],[-.002,.169,.207],[.153,.292,.17]],.033),9463616),a.attach(r,e);let c=As(r,-.027,.461,-.015),l=new rs;l.shape([[0,.093,.078],[.024,.142,.126,0,-.012],[.078,.189,.162,0,-.016],[.204,.211,.181,0,-.004],[.278,.203,.176],[.327,.142,.137]],Ts.skin,{sides:18,power:.83});for(let m of[-1,1])l.ell(14788213,[m*.201,.145,.001],[.037,.072,.053]),l.add(Lo([[m*.199,.245,.062],[m*.192,.112,.045],[m*.148,.014,-.001],[m*.068,-.005,-.052]],.019),7885632);l.shape([[.192,.18,.168,0,.009],[.219,.223,.202],[.264,.224,.202]],7229755,{sides:20,arc:[-.69*Math.PI,.69*Math.PI]}),l.ell(13996641,[0,.132,-.167],[.052,.049,.05]);for(let m of[-1,1])l.ell(5519405,[m*.08,.168,-.155],[.042,.013,.016],[0,-m*.31,-m*.09]),l.ell(3882042,[m*.076,.15,-.164],[.018,.021,.014],[0,-m*.28,0],"lacquer",9,5);l.add(Lo([[-.054,.079,-.157],[0,.07,-.169],[.053,.078,-.155]],.009),11892307),l.shape([[.207,.224,.212,0,.015],[.243,.273,.242,0,.011],[.279,.285,.253],[.302,.279,.248]],Ts.blueShade,{sides:24,finish:"lacquer"}),l.shape([[.255,.275,.251],[.272,.286,.258],[.288,.282,.253]],6867711,{sides:24,finish:"lacquer"}),l.shape([[.281,.278,.25],[.331,.288,.257],[.413,.275,.249],[.498,.23,.222],[.574,.144,.155],[.609,.055,.068],[.614,.014,.022]],Ts.blue,{sides:28,finish:"lacquer"}),l.shape([[.296,.281,.252],[.312,.289,.259],[.325,.292,.261]],12114656,{sides:30,finish:"metal"});for(let m of[-1,1])l.ell(14793848,[m*.255,.325,.114],[.013,.016,.014],wn,"metal",8,5);l.attach(c,e);let h=As(r,.295,.691,-.03),f=new rs;function u(m,v,M,_,E,S="metal",y=18){f.add(si([0,0,_],[0,0,E],v,M,y),m,wn,[1,1,1],wn,S)}u(2505549,.106,.11,-.48,.367),u(3558238,.13,.12,-.5,-.375),u(6928350,.142,.142,-.495,-.471),u(2110276,.142,.142,-.549,-.498),u(7442078,.147,.147,-.558,-.541),u(1252139,.105,.105,-.561,-.56),u(2635849,.144,.134,-.275,-.12),u(5540523,.141,.135,-.254,-.205),u(3305115,.125,.129,-.044,.161);for(let m of[-.292,-.119,.148,.203,.249,.294])u(m<.15?8559533:6058374,.139,.139,m,m+.021);u(2504006,.146,.137,.178,.346),u(10005948,.154,.153,.322,.36),u(2503748,.127,.123,.359,.373),u(1319473,.087,.086,.374,.375),f.box(3756390,[0,.095,-.1],[.093,.09,.202],wn,"metal"),f.box(7785452,[0,.147,-.12],[.103,.023,.105],wn,"metal"),f.box(3229274,[.098,.066,.061],[.052,.047,.189],wn,"metal"),f.ell(8701671,[.123,.065,.02],[.012,.022,.036],wn,"lacquer"),f.attach(h,e);let d=As(h,0,0,-.57),p;function x(m,v){p=pm(m,v),t.visible=!1,s.add(p.mesh)}function g({time:m=0,run:v=0,recoil:M=0,merge:_=0,lean:E=0}={}){p&&p.pose(m,v,M,E,_);let S=m*10.9;n.rotation.x=Math.sin(S)*.53*v,i.rotation.x=-Math.sin(S)*.53*v;let y=Math.sin(S)*v;o[0].rotation.x=-y*.46,o[1].rotation.x=y*.15+M*.12,r.rotation.y=y*.055,t.position.y=(1-Math.cos(S*2))*.019*v,r.rotation.z=-E*.13+Math.sin(S)*.021*v,r.rotation.x=-.058*v+M*.085,c.rotation.z=E*.026,h.position.z=-.03+M*.155,h.rotation.x=M*.14,e.cloth.emissive.setRGB(_*.43,_*.21,_*.05),e.lacquer.emissive.setRGB(_*.37,_*.31,_*.11),e.metal.emissive.setRGB(_*.29,_*.22,_*.07)}return{root:s,animate:g,muzzle:d,paint:x}}var No=new N;function ri(s,e,t,n,i,r){let a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;No.copy(e),No[n]=0,No.normalize();let l=.5*a/(a+o),h=1-No.angleTo(s)/c;return Math.sign(No[t])===1?h*l:o/(a+o)+l+l*(1-h)}var Jc=class s extends Pn{constructor(e=1,t=1,n=1,i=2,r=.1){let a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new N,l=new N,h=new N(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=f.length/6,x=new N,g=.5/a;for(let m=0,v=0;m<f.length;m+=3,v+=2)switch(c.fromArray(f,m),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),f[m+0]=h.x*Math.sign(c.x)+l.x*r,f[m+1]=h.y*Math.sign(c.y)+l.y*r,f[m+2]=h.z*Math.sign(c.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:x.set(1,0,0),d[v+0]=ri(x,l,"z","y",r,n),d[v+1]=1-ri(x,l,"y","z",r,t);break;case 1:x.set(-1,0,0),d[v+0]=1-ri(x,l,"z","y",r,n),d[v+1]=1-ri(x,l,"y","z",r,t);break;case 2:x.set(0,1,0),d[v+0]=1-ri(x,l,"x","z",r,e),d[v+1]=ri(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),d[v+0]=1-ri(x,l,"x","z",r,e),d[v+1]=1-ri(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),d[v+0]=1-ri(x,l,"x","y",r,e),d[v+1]=1-ri(x,l,"y","x",r,t);break;case 5:x.set(0,0,-1),d[v+0]=ri(x,l,"x","y",r,e),d[v+1]=1-ri(x,l,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};function fn(s,e,t,n=0){return n?new Jc(s,e,t,1,n):new Pn(s,e,t)}function et(s,e,t,n,i,r=null){let a=s.index?s.toNonIndexed():s;a!==s&&s.dispose(),a.deleteAttribute("uv"),r&&a.applyQuaternion(new on().setFromEuler(r)),a.translate(t,n,i);let o=new we(e),c=a.getAttribute("position").count,l=new Float32Array(c*3);for(let h=0;h<l.length;h+=3)o.toArray(l,h);return a.setAttribute("color",new kt(l,3)),a}function Un(s){let e=Po(s,!1);for(let t of s)t.dispose();return e}function Fn(s,e,t,n,i=8){let r=new N(...s),a=new N(...e),o=a.clone().sub(r),c=new Qt(t,t,o.length(),i);c.applyQuaternion(new on().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.lerp(a,.5);return et(c,n,l.x,l.y,l.z)}var bm=s=>new N(...s),Tn=(s=0,e=0,t=0)=>new Vt(s,e,t),Sm=Math.PI*2,Em=new Bt({vertexColors:!0,shininess:35,specular:6511190,side:Ht}),ab=new yt({vertexColors:!0,toneMapped:!1,side:Ht}),Ze=(s,e,t,n,i,r,a,o=null)=>{let c=new fi(1,28,16);return c.scale(i,r,a),et(c,s,e,t,n,o)},$c=(s,e,t,n,i,r,a,o=.045,c=null)=>et(fn(i,r,a,o),s,e,t,n,c),ar=(s,e,t,n,i,r,a,o=null,c=24)=>et(new Qt(i,r,a,c),s,e,t,n,o),jc=(s,e,t,n,i,r,a=null)=>et(new Jn(i,r,8,32),s,e,t,n,a);function Qc(s,e,t=.04){return et(new $s(new Zi(e.map(bm)),Math.max(9,e.length*5),t,8,!1),s,0,0,0)}function Lt(s,e,t,n=14){let i=new Zi(e.map(bm)),r=(e.length-1)*5,a=i.computeFrenetFrames(r,!1),o=[],c=[];for(let h=0;h<=r;h++){let f=h/r,u=i.getPointAt(f),d=f*(t.length-1),p=Math.min(t.length-2,Math.floor(d)),x=Be.lerp(t[p],t[p+1],d-p);for(let g=0;g<n;g++){let m=g*Sm/n,v=u.clone().addScaledVector(a.normals[h],x*Math.cos(m)).addScaledVector(a.binormals[h],x*Math.sin(m));if(o.push(v.x,v.y,v.z),h){let M=h*n+g,_=h*n+(g+1)%n;c.push(M-n,_-n,M,_-n,_,M)}}}let l=new _t;return l.setAttribute("position",new We(o,3)),l.setIndex(c),l.computeVertexNormals(),et(l,s,0,0,0)}function ym(s,e){let t=[],n=[];for(let r=1;r<s.length-1;r++)for(let a of[0,r,r+1]){t.push(...s[a]);let o=new we(e[a%e.length]);n.push(o.r,o.g,o.b)}let i=new _t;return i.setAttribute("position",new We(t,3)),i.setAttribute("color",new We(n,3)),i.computeVertexNormals(),i}function eh(s,e,t,n,i,r,a=0){let o=new Qt(.035,i,r,5,1);return o.translate(0,r/2,0),et(o,s,e,t,n,Tn(0,.2,a))}function ob(){let s=[];function e(a,o=0,c=0,l=0){let h=new It;return h.position.set(o,c,l),a?.add(h),h.userData.geometry=[],h.userData.light=[],s.push(h),h}let t=e(null),n=(a,...o)=>a.userData.geometry.push(...o),i=(a,...o)=>a.userData.light.push(...o);function r(){for(let a of s)for(let[o,c]of[["geometry",Em],["light",ab]]){let l=a.userData[o];l.length&&a.add(new Ke(Un(l),c)),delete a.userData[o]}}return{root:t,joint:e,add:n,glow:i,finish:r}}function pf(s,e,t,n,i,r,a=!0){for(let o of[-1,1])s.add(e,Ze("#28313b",o*t,n,i,.15,.106,.095,Tn(0,o*.35,-o*.27))),s.glow(e,Ze(r,o*t,n+.006,i+.055,.114,.068,.06,Tn(0,o*.35,-o*.27))),a&&s.add(e,Ze("#271f2e",o*t,n,i+.11,.027,.052,.017))}function df(s,e,t,n,i,r,a=!1){for(let o=0;o<r;o++){let c=n*(o/(r-1)-.5),l=.12+(o===0||o===r-1?.08:0);s.add(e,Lt("#f7dfb0",[[c,i,t-Math.abs(c)*.15],[c*.98,i+(a?1:-1)*l,t+.035]],[.049,.004],8))}}function wm(s,e,t,n,i,r=!1){let a=s.joint(e,...t),[o,c,l]=n,[h,f,u]=i;s.add(a,Lt(f,[[0,0,0],o],[r?.17:.19,.12]),Ze(u,...o,.16,.15,.15));let d=s.joint(a,...o),p=c.map((g,m)=>g-o[m]),x=l.map((g,m)=>g-o[m]);return s.add(d,Lt(h,[[0,0,0],p,x],[.13,.092,.009],12)),r?(s.add(a,Fn([0,.09,.1],[o[0],o[1]+.085,o[2]+.08],.041,"#e9b277")),s.add(d,Fn([0,.03,.06],[p[0],p[1]+.12,p[2]+.05],.042,"#dba26b"),Ze(f,...p,.13,.09,.14))):s.add(d,Ze(f,...p,.13,.095,.13)),{g:a,shank:d}}function lb(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.04,-.12),a=t(r,0,-.06,.8),o=[],c=[],l="#176f70",h="#30a59a",f="#124e59",u="#f07846",d="#fcbb71";n(r,Ze(f,0,-.1,0,1.23,.55,1),Ze(l,0,.24,-.05,1.39,.77,1.06),Ze(h,0,.48,-.13,1.08,.55,.84));for(let p of[-1,1]){n(r,Lt("#248d87",[[p*.15,.87,.13],[p*.56,1.01,-.17],[p*.72,1.12,-.42]],[.135,.12,.009]));for(let v=0;v<5;v++)n(r,Ze("#65ae96",p*(.26+v*.14),.88-v*.07,-.36+v*.032,.055,.039,.075));n(r,Qc("#93c9ac",[[p*.18,.96,.09],[p*.58,.83,.31],[p*1.07,.59,.33],[p*1.26,.29,.19]],.036));for(let v=0;v<3;v++){let M=.4-v*.46;n(r,Lt(h,[[p*1,.32,M],[p*1.36,.38,M-.13],[p*1.45,.58,M-.26]],[.21,.13,.006]));let _=[p*.92,-.09,M];o.push({...wm(s,r,_,[[p*.58,.18,-.14],[p*.91,-.78,.02],[p*1,-.97,.31]],[f,l,u]),phase:v*.98+(p<0?Math.PI:0),s:p})}let x=t(r,p*.9,.06,.39),g=t(x,p*.41,.25,.5);n(x,Lt(f,[[0,0,0],[p*.37,.05,.22],[p*.41,.25,.5]],[.27,.23,.24])),n(g,Ze(u,0,.05,.05,.45,.34,.49,Tn(.12,0,-p*.12)),Lt(u,[[p*.23,.12,.2],[p*.39,.22,.55],[p*.33,.31,.89],[-p*.015,.33,1.08]],[.23,.19,.1,.008]),Qc(d,[[p*.29,.23,.32],[p*.39,.33,.62],[p*.24,.37,.9]],.047));let m=t(g,-p*.13,.02,.24);n(m,Lt("#e78954",[[0,0,0],[-p*.18,.02,.32],[-p*.19,.12,.62],[p*.033,.25,.8]],[.19,.16,.095,.007]));for(let v=0;v<4;v++)n(g,Ze(d,-p*.02,.29,.07+v*.11,.074,.054,.06));c.push({arm:x,palm:g,finger:m,s:p}),n(r,Lt(f,[[p*.39,.45,.55],[p*.48,.71,.62],[p*.49,.85,.72]],[.13,.095,.08])),n(r,Ze(f,p*.49,.86,.74,.22,.16,.17)),i(r,Ze("#ffd777",p*.49,.88,.865,.146,.11,.077)),n(r,Ze("#333442",p*.49,.9,.927,.036,.078,.02));for(let v=0;v<3;v++)n(a,Lt(d,[[p*(.14+v*.1),.07,.03],[p*(.16+v*.14),-.12,.21],[p*(.13+v*.14),-.29,.27]],[.078,.055,.007]));for(let v=0;v<3;v++){let M=-.39-v*.17;n(r,jc("#ded5a1",p*(.46+v*.1),.88-v*.06,M,.077,.025,Tn(Math.PI/2,0,0)))}}return n(r,Qc("#a7dac4",[[0,.59,.81],[0,.96,.21],[0,1.01,-.18],[0,.75,-.78]],.034)),p=>{r.position.y=1.04+p.bob*.08-p.down*.29,r.rotation.z=p.stride*.044+p.down*.18,r.rotation.x=-p.cast*.14,o.forEach(({g:x,shank:g,phase:m,s:v})=>{let M=p.beat+m;x.rotation.y=v*.25*Math.sin(M)*p.walk,g.rotation.z=v*(Math.max(0,Math.cos(M))*.28*p.walk+p.down*.45)}),c.forEach(({arm:x,palm:g,finger:m,s:v})=>{x.rotation.x=-.14+.2*p.stride*v-.55*p.cast-.58*p.air+.5*p.down,g.rotation.y=v*(.43-.31*p.cast),m.rotation.y=v*(.17+.37*p.cast+.09*Math.sin(p.time*3))})}}function cb(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.24,-.26),a=t(r,0,.18,.7),o=[],c="#57484b",l="#b67b35",h="#e9b858",f="#ffe3a8";n(r,Ze(c,0,.03,-.17,.94,.77,1.36),Ze("#8e612f",0,.18,.18,1.04,.84,.94));for(let d=0;d<3;d++){let p=.36-d*.48,x=1-d*.12;n(r,Ze(d%2?l:"#c89348",0,.53-d*.09,p,.98*x,.53*x,.55));for(let g of[-1,1])n(r,Fn([g*.6*x,.9-d*.1,p+.12],[g*.92*x,.46-d*.1,p+.04],.048,h),Ze("#5b5052",g*.9*x,.49-d*.09,p+.11,.07,.07,.07))}n(a,Ze(c,0,.11,.27,.64,.63,.68),Ze("#866344",0,-.11,.72,.56,.37,.56),Ze("#624c41",0,-.2,1.03,.5,.25,.25),Lt(f,[[0,.12,.88],[.08,.43,1.13],[.23,.82,1.37],[.35,1.19,1.4]],[.245,.181,.078,.004]),Lt("#d6ae76",[[0,.45,.6],[0,.67,.69],[0,.87,.78]],[.16,.1,.005]));for(let d of[-1,1]){n(a,Ze("#493d42",d*.275,-.16,1.205,.105,.064,.038),Lt(c,[[d*.41,.39,.1],[d*.62,.56,.04],[d*.69,.68,-.13]],[.16,.14,.015]),Ze(l,d*.46,.33,.63,.27,.11,.26,Tn(0,d*.42,-d*.31)));for(let p of[-.86,.62]){let x=t(r,d*.64,-.11,p),g=t(x,0,-.54,.05);n(x,Ze(c,d*.055,-.19,0,.3,.46,.34),Ze(l,d*.12,-.2,.045,.29,.23,.32)),n(g,Ze(c,0,-.13,0,.235,.33,.25),Ze("#423d43",0,-.39,.095,.267,.16,.34));for(let m=-1;m<=1;m++)n(g,Ze("#c3a580",m*.123,-.41,.29,.075,.074,.11));o.push({g:x,knee:g,phase:(p<0?Math.PI:0)+(d<0?Math.PI:0)})}}pf(s,a,.447,.22,.72,"#ffb333");let u=t(r,0,.12,-1.22);return n(u,Lt(c,[[0,0,0],[.13,-.22,-.34],[.12,-.45,-.47]],[.11,.073,.035]),Ze("#342f3a",.12,-.47,-.48,.08,.13,.085)),d=>{r.position.y=1.24+.1*d.bob-.26*d.cast-.35*d.down,r.rotation.z=.06*d.stride+.25*d.down,a.rotation.x=.025+.18*d.stride+.48*d.cast-.47*d.fire+.2*d.down;for(let{g:p,knee:x,phase:g}of o){let m=Math.sin(d.beat+g)*d.walk;p.rotation.x=-m*.39+.25*d.down,x.rotation.x=Math.max(0,m)*.39+.35*d.air}u.rotation.z=.28*Math.sin(d.time*3)}}function hb(s){let{root:e,joint:t,add:n,glow:i}=s,r=[],a=[[.25,2.04,.83,.71],[.45,1.52,.17,.77],[.28,1.05,-.46,.68],[-.32,.69,-.91,.57],[-.84,.53,-1.15,.48],[-1.22,.48,-.87,.32],[-1.39,.57,-.39,.2]];for(let l=0;l<a.length;l++){let[h,f,u,d]=a[l],p=t(e,h,f,u);n(p,Ze(l%2?"#623c81":"#654194",0,0,0,d,d*.78,d*.98),Ze(l%2?"#a969bd":"#9659af",0,d*.23,-.03,d*1.06,d*.71,d*.64));for(let x of[-1,1])n(p,Ze("#50365e",x*d*.78,-.09,.08,d*.21,d*.19,d*.5),eh(l%2?"#cc80ee":"#a17de8",x*d*.62,d*.43,-.1,d*.26,d*.78,-x*.5)),i(p,Ze("#edacff",x*d*.72,d*.5,.075,d*.22,d*.043,d*.09));n(p,eh("#e5b0ff",0,d*.62,-.14,d*.23,d*.67,-.12)),r.push(p)}let o=t(r[0],0,.37,.34),c=t(o,0,-.12,.11);n(o,Ze("#75469a",0,.18,.02,.69,.49,.61),Ze("#9954af",0,.1,.4,.56,.23,.44),Ze("#392744",0,-.043,.41,.51,.11,.44)),n(c,Ze("#b579ab",0,-.19,.37,.47,.145,.45)),df(s,o,.67,.83,-.012,7),df(s,c,.62,.67,-.13,5,!0);for(let l of[-1,1])n(o,Lt("#cea6ef",[[l*.45,.32,.1],[l*.65,.69,-.06],[l*.69,.91,-.32]],[.19,.135,.01]),Lt("#a07ccf",[[l*.48,.11,-.04],[l*.78,.36,-.23],[l*.94,.44,-.49]],[.19,.1,.007]),Ze("#b17cba",l*.4,.32,.44,.24,.105,.19,Tn(0,l*.37,-l*.32)));for(let l of[-1,1])n(o,Lt("#c491da",[[l*.18,.31,.63],[l*.39,.42,.54],[l*.66,.5,.24]],[.1,.16,.035]),Lt("#cba7d1",[[l*.49,.09,.31],[l*.67,-.03,.53],[l*.57,-.19,.75]],[.12,.085,.005]));return pf(s,o,.39,.235,.51,"#a3ffe6"),l=>{r.forEach((h,f)=>{let[,u,d]=a[f];h.position.x=a[f][0]+Math.sin(l.beat*.68-f*.71)*(.13+f*.044)*l.walk,h.position.y=u*(1-.57*l.down-.36*l.cast)+Math.sin(l.beat*.63-f*.73)*.074*l.walk,h.position.z=d+f*.035*l.cast,h.rotation.z=.12*Math.sin(l.beat*.7-f*.61)*l.walk+.27*l.down}),o.rotation.x=-.22*l.cast-.36*l.fire+.1*Math.sin(l.beat)*l.walk,c.rotation.x=.4+.31*l.cast+.36*l.fire+.04*Math.sin(l.time*3)}}function ub(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.72,-.26),a=t(r,0,.4,.8),o=t(a,0,-.16,.28),c=[],l=[],h=[];n(r,Ze("#387bab",0,.09,-.08,.65,.59,1.1),Ze("#a4d6df",0,-.18,.12,.48,.35,.8),Ze("#397aa7",0,.3,.58,.45,.49,.64)),n(a,Ze("#599fc2",0,.11,.14,.46,.39,.61),Ze("#92cbd6",0,-.01,.5,.38,.2,.47),Ze("#296382",0,-.14,.58,.35,.1,.38)),n(o,Ze("#b1e3e3",0,-.12,.3,.31,.12,.34)),df(s,a,.76,.53,-.11,5);for(let u of[-1,1]){n(a,Lt("#e1f3e6",[[u*.28,.27,0],[u*.45,.58,-.24],[u*.48,.72,-.51]],[.13,.085,.006]),Lt("#80d5e1",[[u*.27,.07,-.08],[u*.54,.17,-.25],[u*.66,.22,-.47]],[.14,.08,.01]));let d=t(r,u*.39,.32,.04),p=t(d,u*.75,.4,-.12);n(d,Lt("#5296b7",[[0,0,0],[u*.38,.16,.02],[u*.76,.39,-.12]],[.18,.12,.095]),ym([[0,0,0],[u*.76,.4,-.12],[u*.68,.1,-.93],[u*.14,-.08,-.76]],["#4a9fc7","#8ddfe5","#3b81b0","#306d9c"]));let x=[[u*1.13,.38,-.3],[u*1.23,.08,-.72],[u*.97,-.11,-1],[u*.4,-.23,-.99]];for(let g=0;g<3;g++){let m=x[g],v=x[g+1],M=m.map((_,E)=>(_+v[E])*.5);M[0]*=.91,M[1]+=.045,M[2]+=.12,n(p,ym([[0,0,0],m,M,v],["#9ee6e3","#72c6df","#348bb9","#81cfe4"]),Lt("#d0ecdc",[[0,0,0],[m[0]*.56,m[1]*.58+.05,m[2]*.47],m],[.055,.042,.009]))}n(p,Lt("#c5e8df",[[0,0,0],x[3]],[.046,.008]),Lt("#b2e8e2",[[0,0,0],[u*.09,.12,.1],[u*.12,.16,.22]],[.08,.05,.004])),c.push({arm:d,elbow:p,s:u});for(let g of[-.57,.41]){let m=t(r,u*.37,-.23,g);n(m,Lt("#407ea5",[[0,0,0],[u*.12,-.32,.05],[u*.14,-.49,.23]],[.15,.095,.069]));for(let v of[-1,0,1])n(m,Lt("#dcebd5",[[u*.14,-.49,.23],[u*.15+v*.09,-.57,.38]],[.053,.006]));l.push({leg:m,s:u,z:g})}}for(let u of[-1,1])n(a,Lt("#4b92af",[[u*.11,.24,.55],[u*.31,.32,.47],[u*.48,.39,.21]],[.052,.095,.021]));pf(s,a,.315,.14,.54,"#f9c45b");let f=r;for(let u=0;u<5;u++){let d=t(f,0,u?-.015:0,u?-.33:-.83),p=.28-u*.042;n(d,Lt("#4789ad",[[0,0,.06],[0,-.025,-.27],[0,.01,-.4]],[p,p*.8,p*.64]),eh("#acdfe4",0,p*.59,-.16,.065,.17-u*.014)),h.push(d),f=d}for(let u=0;u<4;u++)n(r,eh("#d5ede7",0,.5,.41-u*.31,.084,.23));return u=>{let d=Math.sin(u.time*4.9);r.position.y=1.7+.1*d*(1-u.down)-.69*u.down-.3*u.cast,r.rotation.x=-.13*u.cast+.17*u.fire+.18*u.down,a.rotation.x=.1*Math.sin(u.time*2.4)+.32*u.fire,o.rotation.x=.08+.36*u.cast+.4*u.fire;for(let{arm:p,elbow:x,s:g}of c)p.rotation.z=g*(.06+.32*d*(1-u.down)+.39*u.cast-.65*u.down),x.rotation.y=g*(.12+.12*Math.sin(u.time*4.9-.6)+.7*u.down);for(let{leg:p,s:x,z:g}of l)p.rotation.x=.32+.13*Math.sin(u.beat+x+(g>0?Math.PI:0))+.35*u.air;h.forEach((p,x)=>p.rotation.y=.16*Math.sin(u.time*3-x*.6))}}function fb(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.14,-.17),a=[],o=[],c=t(r,0,.14,.88),l="#394955",h="#8a4239",f="#d09253",u="#27313d",d="#ffc669";n(r,Ze(u,0,0,-.06,.99,.63,1.15),Ze(h,0,.24,-.15,1.06,.68,1.08));for(let p=0;p<3;p++)n(r,ar(p===1?f:l,0,.6+p*.13,-.22,.71-p*.075,.74-p*.073,.15),jc("#c4874f",0,.65+p*.13,-.22,.705-p*.072,.043,Tn(Math.PI/2)));n(r,ar(u,0,.98,-.22,.48,.56,.11)),i(r,ar("#ff9642",0,1.035,-.22,.414,.414,.035));for(let p=-2;p<=2;p++)n(r,$c(l,p*.14,1.07,-.22,.052,.04,.66-.09*Math.abs(p),.014));n(c,ar(u,0,0,.1,.54,.54,.27,Tn(Math.PI/2)),jc(f,0,0,.265,.48,.077)),i(c,Ze("#ff8235",0,0,.245,.39,.39,.105),Ze("#ffe395",0,0,.326,.17,.17,.054));for(let p=0;p<8;p++){let x=p*Sm/8;n(c,$c(l,Math.cos(x)*.32,Math.sin(x)*.32,.35,.24,.066,.053,.016,Tn(0,0,x+.32)))}for(let p of[-1,1]){for(let g=0;g<4;g++){let m=.62-g*.45,v=[p*(.5+Math.sin(g*Math.PI/3)*.12),.39,m*.42],M=[p*(.9+Math.sin(g*Math.PI/3)*.18),-.75,m*.78];a.push({...wm(s,r,[p*.75,-.06,m],[v,M,[M[0]+p*.16,-1.04,M[2]+.27]],[l,h,f],!0),s:p,phase:g*1.5+(p<0?Math.PI:0)})}let x=t(r,p*.74,.56,-.25);o.push({g:x,s:p}),n(x,ar(l,0,.28,0,.245,.265,.76,Tn(.26)),ar(f,0,.62,.095,.258,.26,.13,Tn(.26)),ar(u,0,.72,.118,.22,.22,.1,Tn(.26)),jc("#e4a361",0,.78,.132,.232,.045,Tn(Math.PI/2+.26)),Qc(f,[[p*.17,0,-.1],[p*.27,.28,-.12],[p*.2,.46,-.06]],.05)),i(x,Ze(d,0,.742,.13,.142,.042,.14)),n(r,$c(h,p*.76,.3,.45,.47,.43,.52,.1,Tn(0,p*.16,-p*.25)));for(let g=0;g<3;g++)i(r,$c("#ffa64f",p*(.67+g*.075),.31,.72,.036,.18,.033,.007,Tn(0,0,-p*.18)))}return p=>{r.position.y=1.14+.066*p.bob-.15*p.cast-.42*p.down,r.rotation.z=.042*p.stride+.21*p.down,c.rotation.z=.14*p.time+.67*p.cast,a.forEach(({g:x,shank:g,s:m,phase:v})=>{let M=p.beat+v;x.rotation.y=m*.22*Math.sin(M)*p.walk,g.rotation.z=m*(.25*Math.max(0,Math.cos(M))*p.walk+.36*p.down)}),o.forEach(({g:x,s:g})=>{x.rotation.x=.17+.4*p.cast-.25*p.fire,x.rotation.z=g*(.18+.12*p.down),x.position.y=.56-.14*p.fire})}}var Mm={diver:lb,warden:cb,drill:hb,kestrel:ub,engine:fb};function Tm(s,e){let t=new Map,n;return function(r,a){if(n!==r){let u=t.get(n);if(u&&(u.root.visible=!1,u.volume&&(u.volume.mesh.visible=u.portrait.mesh.visible=!1)),Mm[r]&&!t.has(r)){let d=ob(),p=Mm[r](d);d.finish(),s.add(d.root),t.set(r,{root:d.root,sample:p})}n=r}let o=t.get(r);if(!o)return!1;let c=e.get(r);!o.volume&&c&&(lm(o.root,c,Em),o.volume=um(r,c),o.portrait=hm(r,c),s.add(o.volume.mesh,o.portrait.mesh));let l=a.march*4.35,h=Be.smoothstep(a.defeat,.12,.94);if(o.volume){o.portrait.mesh.visible=a.mode==="ai",o.volume.mesh.visible=!o.portrait.mesh.visible;let u=Be.smoothstep(h,.3,.92);o.root.visible=o.volume.mesh.visible&&u>.01,o.root.scale.set(.63*u,.66*u,.68*u),o.root.position.set(0,.07,-.95),(o.portrait.mesh.visible?o.portrait:o.volume).pose({...a,down:h})}else o.root.visible=!0,o.root.scale.setScalar(1),o.root.position.set(0,0,0);if(!o.root.visible)return!0;let f=Math.sin(Math.PI*Be.clamp((a.vault-.21)/.89,0,1))+Math.sin(Math.PI*Be.clamp((a.attack-.23)/.65,0,1));return o.sample({time:a.time,beat:l,walk:a.walk*(1-h),stride:Math.sin(l)*a.walk*(1-h),bob:(.5-.5*Math.cos(l*2))*a.walk,down:h,air:f,cast:a.charge||0,fire:a.release||0}),!0}}function Am(s){let e=new Map,t=new Map,n=s.clone();return Rm(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Rm(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Rm(s.children[n],e.children[n],t)}var th=class extends wi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Mf(t)}),this.register(function(t){return new bf(t)}),this.register(function(t){return new Sf(t)}),this.register(function(t){return new Lf(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new wf(t)}),this.register(function(t){return new Tf(t)}),this.register(function(t){return new Af(t)}),this.register(function(t){return new Rf(t)}),this.register(function(t){return new yf(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Ef(t)}),this.register(function(t){return new Pf(t)}),this.register(function(t){return new If(t)}),this.register(function(t){return new vf(t)}),this.register(function(t){return new nh(t,ft.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new nh(t,ft.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Uf(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=ns.extractUrlBase(e);a=ns.resolveURL(l,this.path)}else a=ns.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Kr(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Nm){try{a[ft.KHR_BINARY_GLTF]=new Ff(e)}catch(f){i&&i(f);return}r=JSON.parse(a[ft.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Vf(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,a[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let f=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(f){case ft.KHR_MATERIALS_UNLIT:a[f]=new _f;break;case ft.KHR_DRACO_MESH_COMPRESSION:a[f]=new Of(r,this.dracoLoader);break;case ft.KHR_TEXTURE_TRANSFORM:a[f]=new Bf;break;case ft.KHR_MESH_QUANTIZATION:a[f]=new zf;break;default:u.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function db(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Zt(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var ft={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},vf=class{constructor(e){this.parser=e,this.name=ft.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new we(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],In);let f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new bs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new go(h),l.distance=f;break;case"spot":l=new mo(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ci(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},_f=class{constructor(){this.name=ft.KHR_MATERIALS_UNLIT}getMaterialType(){return yt}extendParams(e,t,n){let i=[];e.color=new we(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],In),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,vt))}return Promise.all(i)}},yf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Mf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ce(r,r)}return Promise.all(i)}},bf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(i)}},Sf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Ef=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},wf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SHEEN}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],In)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,vt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Tf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Af=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_VOLUME}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(r[0],r[1],r[2],In),Promise.all(i)}},Rf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IOR}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Cf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(r[0],r[1],r[2],In),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,vt)),Promise.all(i)}},If=class{constructor(e){this.parser=e,this.name=ft.EXT_MATERIALS_BUMP}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Pf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Zt(this.parser,e,this.name)!==null?Ln:null}extendMaterialParams(e,t){let n=Zt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Lf=class{constructor(e){this.parser=e,this.name=ft.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Nf=class{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Df=class{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},nh=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,f=i.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,f,u,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*f);return a.decodeGltfBuffer(new Uint8Array(d),h,f,u,i.mode,i.filter),d})})}else return null}},Uf=class{constructor(e){this.name=ft.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==ai.TRIANGLES&&l.mode!==ai.TRIANGLE_STRIP&&l.mode!==ai.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),f=h.isGroup?h.children:[h],u=l[0].count,d=[];for(let p of f){let x=new Ge,g=new N,m=new on,v=new N(1,1,1),M=new Yt(p.geometry,p.material,u);for(let E=0;E<u;E++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,E),c.SCALE&&v.fromBufferAttribute(c.SCALE,E),M.setMatrixAt(E,x.compose(g,m,v));let _=null;for(let E in c)if(E==="_COLOR_0"){let S=c[E];M.instanceColor=new Jt(S.array,S.itemSize,S.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(_===null){let y=M.geometry;_=new _t,_.name=y.name;for(let b in y.attributes)_.setAttribute(b,y.attributes[b]);for(let b in y.morphAttributes)_.morphAttributes[b]=y.morphAttributes[b];y.index!==null&&_.setIndex(y.index),_.morphTargetsRelative=y.morphTargetsRelative;for(let b of y.groups)_.addGroup(b.start,b.count,b.materialIndex);y.boundingBox!==null&&(_.boundingBox=y.boundingBox.clone()),y.boundingSphere!==null&&(_.boundingSphere=y.boundingSphere.clone()),_.drawRange.start=y.drawRange.start,_.drawRange.count=y.drawRange.count,_.userData=Object.assign({},y.userData),M.geometry=_}let S=c[E];_.setAttribute(E,new Jt(S.array,S.itemSize,S.normalized))}Rt.prototype.copy.call(M,p),this.parser.assignFinalMaterial(M),d.push(M)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Nm="glTF",Do=12,Cm={JSON:1313821514,BIN:5130562},Ff=class{constructor(e){this.name=ft.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Do),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Nm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Do,r=new DataView(e,Do),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Cm.JSON){let l=new Uint8Array(e,Do+a,o);this.content=n.decode(l)}else if(c===Cm.BIN){let l=Do+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Of=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ft.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let f=Hf[h]||h.toLowerCase();o[f]=a[h]}for(let h in e.attributes){let f=Hf[h]||h.toLowerCase();if(a[h]!==void 0){let u=n.accessors[e.attributes[h]],d=ca[u.componentType];l[f]=d.name,c[f]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,u){i.decodeDracoFile(h,function(d){for(let p in d.attributes){let x=d.attributes[p],g=c[p];g!==void 0&&(x.normalized=g)}f(d)},o,l,In,u)})})}},Bf=class{constructor(){this.name=ft.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},zf=class{constructor(){this.name=ft.KHR_MESH_QUANTIZATION}},ih=class extends Ei{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,f=(n-t)/h,u=f*f,d=u*f,p=e*l,x=p-l,g=-2*d+3*u,m=d-u,v=1-g,M=m-u+f;for(let _=0;_!==o;_++){let E=a[x+_+o],S=a[x+_+c]*h,y=a[p+_+o],b=a[p+_]*h;r[_]=v*E+M*S+g*y+m*b}return r}},pb=new on,kf=class extends ih{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return pb.fromArray(r).normalize().toArray(r),r}},ai={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ca={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Im={9728:$t,9729:jt,9984:sc,9985:ta,9986:ir,9987:Hn},Pm={33071:ei,33648:Nr,10497:bi},mf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Hf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Rs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},mb={CUBICSPLINE:void 0,LINEAR:Ws,STEP:Vs},gf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function gb(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ji({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ni})),s.DefaultMaterial}function or(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ci(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function xb(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(i=!0),f.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let f=e[l];if(n){let u=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):s.attributes.position;a.push(u)}if(i){let u=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):s.attributes.normal;o.push(u)}if(r){let u=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):s.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],f=l[1],u=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=f),r&&(s.morphAttributes.color=u),s.morphTargetsRelative=!0,s})}function vb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _b(s){let e,t=s.extensions&&s.extensions[ft.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+xf(t.attributes):e=s.indices+":"+xf(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+xf(s.targets[n]);return e}function xf(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Gf(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yb(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Mb=new Ge,Vf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new db,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?(this.textureLoader=new ts(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new xo(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Kr(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return or(r,o,i),Ci(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ft.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(ns.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=mf[i.type],o=ca[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new kt(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=mf[i.type],l=ca[i.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,u=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,x,g;if(d&&d!==f){let m=Math.floor(u/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,M=t.cache.get(v);M||(x=new l(o,m*d,i.count*d/h),M=new zr(x,d/h),t.cache.add(v,M)),g=new kr(M,c,u%d/h,p)}else o===null?x=new l(i.count*c):x=new l(o,u,i.count*c),g=new kt(x,c,p);if(i.sparse!==void 0){let m=mf.SCALAR,v=ca[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,E=new v(a[1],M,i.sparse.count*m),S=new l(a[2],_,i.sparse.count*c);o!==null&&(g=new kt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let y=0,b=E.length;y<b;y++){let A=E[y];if(g.setX(A,S[y*c]),c>=2&&g.setY(A,S[y*c+1]),c>=3&&g.setZ(A,S[y*c+2]),c>=4&&g.setW(A,S[y*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let u=(r.samplers||{})[a.sampler]||{};return h.magFilter=Im[u.magFilter]||jt,h.minFilter=Im[u.minFilter]||Hn,h.wrapS=Pm[u.wrapS]||bi,h.wrapT=Pm[u.wrapT]||bi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==$t&&h.minFilter!==jt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1,h;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)h=n.getDependency("bufferView",a.bufferView).then(function(u){return new Promise(function(d,p){t.parse(u,d,p)})});else{if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let x=d;t.isImageBitmapLoader===!0&&(x=function(g){let m=new ln(g);m.needsUpdate=!0,d(m)}),t.load(ns.resolveURL(u,r.path),x,void 0,p)})})}let f=h.then(function(u){return l===!0&&o.revokeObjectURL(c),Ci(u,a),u.userData.mimeType=a.mimeType||yb(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=f,f}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ft.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ft.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[ft.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Wr,Sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Vr,Sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Ji}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[ft.KHR_MATERIALS_UNLIT]){let f=i[ft.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),l.push(f.extendParams(o,r,t))}else{let f=r.pbrMetallicRoughness||{};if(o.color=new we(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){let u=f.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],In),o.opacity=u[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",f.baseColorTexture,vt)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ht);let h=r.alphaMode||gf.OPAQUE;if(h===gf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===gf.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==yt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ce(1,1),r.normalTexture.scale!==void 0)){let f=r.normalTexture.scale;o.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&a!==yt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==yt){let f=r.emissiveFactor;o.emissive=new we().setRGB(f[0],f[1],f[2],In)}return r.emissiveTexture!==void 0&&a!==yt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,vt)),Promise.all(l).then(function(){let f=new a(o);return r.name&&(f.name=r.name),Ci(f,r),t.associations.set(f,{materials:e}),r.extensions&&or(i,f,r),f})}createUniqueName(e){let t=Ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[ft.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Lm(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=_b(l),f=i[h];if(f)a.push(f.promise);else{let u;l.extensions&&l.extensions[ft.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=Lm(new _t,l,t),l.mode===ai.TRIANGLE_STRIP?u=u.then(d=>ff(d,To)):l.mode===ai.TRIANGLE_FAN&&(u=u.then(d=>ff(d,ia))),i[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?gb(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let d=0,p=h.length;d<p;d++){let x=h[d],g=a[d],m,v=l[d];if(g.mode===ai.TRIANGLES||g.mode===ai.TRIANGLE_STRIP||g.mode===ai.TRIANGLE_FAN||g.mode===void 0){let M=r.isSkinnedMesh===!0,_=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");M&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=M&&_?new Va(x,v):new Ke(x,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===ai.LINES)m=new Xa(x,v);else if(g.mode===ai.LINE_STRIP)m=new Ys(x,v);else if(g.mode===ai.LINE_LOOP)m=new qa(x,v);else if(g.mode===ai.POINTS)m=new Ya(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&vb(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Ci(m,r),g.extensions&&or(i,m,g),t.assignFinalMaterial(m),f.push(m)}for(let d=0,p=f.length;d<p;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return r.extensions&&or(i,f[0],r),f[0];let u=new It;r.extensions&&or(i,u,r),t.associations.set(u,{meshes:e});for(let d=0,p=f.length;d<p;d++)u.add(f[d]);return u})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new an(Be.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Qs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ci(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let f=a[l];if(f){o.push(f);let u=new Ge;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Wa(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let f=0,u=i.channels.length;f<u;f++){let d=i.channels[f],p=i.samplers[d.sampler],x=d.target,g=x.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,v=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",v)),l.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){let u=f[0],d=f[1],p=f[2],x=f[3],g=f[4],m=[];for(let M=0,_=u.length;M<_;M++){let E=u[M],S=d[M],y=p[M],b=x[M],A=g[M];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let R=n._createAnimationTracks(E,S,y,b,A);if(R)for(let D=0;D<R.length;D++)m.push(R[D])}let v=new uo(r,void 0,m);return Ci(v,i),v})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],f=l[1],u=l[2];u!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(u,Mb)});for(let d=0,p=f.length;d<p;d++)h.add(f[d]);if(h.userData.pivot!==void 0&&f.length>0){let d=h.userData.pivot,p=f[0];h.pivot=new N().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Hr:l.length>1?h=new It:l.length===1?h=l[0]:h=new Rt,h!==l[0])for(let f=0,u=l.length;f<u;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=a),Ci(h,r),r.extensions&&or(n,h,r),r.matrix!==void 0){let f=new Ge;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let f=i.associations.get(h);i.associations.set(h,{...f})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new It;n.name&&(r.name=i.createUniqueName(n.name)),Ci(r,n),n.extensions&&or(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,f=c.length;h<f;h++){let u=c[h];u.parent!==null?r.add(Am(u)):r.add(u)}let l=h=>{let f=new Map;for(let[u,d]of i.associations)(u instanceof Sn||u instanceof ln)&&f.set(u,d);return h.traverse(u=>{let d=i.associations.get(u);d!=null&&f.set(u,d)}),f};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Rs[r.path]===Rs.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(Rs[r.path]){case Rs.weights:h=ji;break;case Rs.rotation:h=Qi;break;case Rs.translation:case Rs.scale:h=Ms;break;default:n.itemSize===1?h=ji:h=Ms;break}let f=i.interpolation!==void 0?mb[i.interpolation]:Ws,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){let x=new h(c[d]+"."+Rs[r.path],t.array,u,f);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Gf(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Qi?kf:ih;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function bb(s,e,t){let n=e.attributes,i=new Zn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){let h=Gf(ca[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new N,c=new N;for(let l=0,h=r.length;l<h;l++){let f=r[l];if(f.POSITION!==void 0){let u=t.json.accessors[f.POSITION],d=u.min,p=u.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),u.normalized){let x=Gf(ca[u.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new Bn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Lm(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=Hf[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return ht.workingColorSpace!==In&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ht.workingColorSpace}" not supported.`),Ci(s,e),bb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?xb(s,e.targets,t):s})}async function Dm(){let{scene:s}=await new th().loadAsync("./art/brawler.glb"),e=om(),t=g=>s.getObjectByName(g),n=t("Pelvis"),i=t("Spine"),r=t("Head"),a=n.position.y,o=["L","R"].map(g=>Object.fromEntries(["Hip","Knee","Ankle","Arm","Elbow","Wrist"].map(m=>[m,t(m+g)]))),c=t("Brawler");c.frustumCulled=!1;let l=c.material;l.color.setScalar(.7),l.bumpMap=l.map,l.bumpScale=.016,l.emissiveMap=l.map,l.emissive.setScalar(.3);let h=new Yr;h.moveTo(-.17,-.125),h.lineTo(.17,-.125),h.quadraticCurveTo(.21,-.125,.21,-.088),h.lineTo(.21,.092),h.quadraticCurveTo(.21,.125,.17,.125),h.lineTo(-.17,.125),h.quadraticCurveTo(-.21,.125,-.21,.086),h.lineTo(-.21,-.086),h.quadraticCurveTo(-.21,-.125,-.17,-.125);let f=new Zs;f.moveTo(-.145,-.072),f.lineTo(-.145,.072),f.lineTo(.145,.072),f.lineTo(.145,-.072),f.closePath(),h.holes.push(f);let u=new Ke(new oo(h,{depth:.027,bevelThickness:.009,bevelSize:.009,bevelSegments:2}),new Ji({color:12166028,metalness:.37,roughness:.52}));u.position.set(0,.15,.85),u.rotation.x=-.11,n.add(u);let d=Tm(s,e),p=new Float32Array(3);function x({time:g,walk:m,march:v,attack:M,hit:_,defeat:E,kind:S="bruiser",vault:y=0,brace:b=0,drive:A=0,charge:R=0,release:D=0,mode:k}){let X=d(S,{time:g,walk:m,march:v,attack:M,defeat:E,vault:y,charge:R,release:D,mode:k,hit:_});if(c.visible=u.visible=!X,X)return;let U=Math.min(1,y/1.35),G=Math.sin(Math.PI*Math.max(0,Math.min(1,(y-.21)/.89))),V=wt(y,0,.14)*(1-wt(y,.14,.32)),P=wt(y,1.04,1.13)*(1-wt(y,1.14,1.35)),Y=1-wt(E,0,.38),L=Y*wt(M,0,.19)*(1-wt(M,.2,.3+.1)),J=Y*Math.sin(Math.PI*Wo(M)),I=Y*wt(M,.11,.53)*(1-wt(M,.68,.91)),te=Y*wt(M,.68,.91)*(1-wt(M,1.01,1.48)),W=Y*wt(M,.91,1)*(1-wt(M,1.01,1.39)),F=wt(E,.12,.58),ee=wt(E,.82,1.34),re=m*(1-wt(M,.015,.16)+wt(M,1.32,1.48))*(1-F)*(1-.9*Math.sin(Math.PI*U)),Ne=.41,ye=v==null?g*6.75:v*Math.PI*.55/Ne;ws(ye,re,p);let Ce=p[0];n.position.y=a+(-.105+(.5-.5*Math.cos(2*ye))*.047)*re-.3*L-.48*W-.17*F-.32*V-.26*P,n.rotation.set(.055*L-.075*J,Ce*.105,Ce*.043-F*.075),i.rotation.set(.06+.24*V+.19*P-.14*G+.13*A+.24*L-.18*I+.42*te-.084*_,-Ce*.16,-.057*Ce-.16*F),S==="bruiser"&&(i.rotation.x+=.16*R+.31*D),r.rotation.set(-.29-.12*L+.07*I-.34*te+.21*F,Ce*.052,.032*Ce);for(let[ct,De]of o.entries()){let Je=ct?1:-1,$e=p[ct],se=Math.max(0,(ct===0?1:-1)*p[2]),he=-De.Knee.position.y,le=-De.Ankle.position.y,Ae=he+le+n.position.y-a-se*.22,ge=Ne*$e,Xe=Math.min(he+le-1e-5,Math.hypot(Ae,ge)),Le=mt=>Math.acos(Be.clamp(mt,-1,1)),nt=Math.atan2(-ge,Ae)-Le((he*he+Xe*Xe-le*le)/(2*he*Xe)),it=Math.PI-Le((he*he+le*le-Xe*Xe)/(2*he*le));De.Hip.rotation.x=nt-(.62+ct*.13)*G-(.6+ct*.11)*J+Je*.27*F,De.Knee.rotation.x=it+.78*G+.22*P+.86*J+.22*F,De.Ankle.rotation.x=-nt-it+.19*$e-.31*J,De.Arm.rotation.set(.37*$e-.76*G+.18*V-(ct?0:.82)*b-(ct?.65:0)*A-.24*L-(2.04+ct*.09)*I-.38*te,Je*(.23*I+.1*te+.22*G),Je*(.035+.12*L+.28*I+.055*te+.69*F-.26*ee)),De.Elbow.rotation.x=-.26-.17*Math.max(0,-$e)-.4*L-.65*I+.12*te-.4*F,De.Arm.rotation.x-=1.36*R+.11*D,De.Elbow.rotation.x-=.34*R,De.Wrist.rotation.set(-.24-.13*I+.22*te,Je*.58*I,Je*(.075*$e+.11*I))}l.emissive.setRGB(.3+_*.36,.3+_*.21,.3+_*.12)}return{root:s,pose:x,prepare:e.prepare}}var wb={timber:[1.85,.077],quarry:[3.35,.105],forge:[3.7,.084],ice:[4.05,.069],cinder:[3.8,.119]},Tb=[0,0],Wf=`
  uniform vec4 roadCurve;
  float lateralBend(float z){
    float offset = roadCurve.x * (cos(roadCurve.z - z * roadCurve.y) - roadCurve.w)
                 * smoothstep(5.0, 21.0, -z);
    float limit = max(0.6, -z * 0.18 - 0.8);
    return offset * inversesqrt(1.0 + (offset / limit) * (offset / limit));
  }`,Um=new WeakSet,Om=new WeakMap;function Fm(s){if(Um.has(s)||s.userData.unbent)return;Um.add(s);let e=s.onBeforeCompile,t=s.customProgramCacheKey();s.customProgramCacheKey=()=>t+"-road-bend",s.onBeforeCompile=function(n,i){e.call(this,n,i),Object.assign(n.uniforms,Om.get(i));let r="if (roadCurve.x != 0.0) gl_Position += roadRight * lateralBend(dot(roadDepth, gl_Position));",a=n.vertexShader;a.includes("#include <project_vertex>")?a=a.replace("#include <project_vertex>",`#include <project_vertex>
`+r):a=a.replace(/gl_Position\s*=[^;]+;/g,o=>o+`
`+r),n.vertexShader=Wf+`
uniform vec4 roadDepth, roadRight;
`+a},s.needsUpdate=!0}function Bm(s,e){let t=new ut,n=new ut,i=new ut,r=new Ge;Om.set(s,{roadCurve:{value:t},roadRight:{value:n},roadDepth:{value:i}});function a(o){o.material&&(Array.isArray(o.material)?o.material.forEach(Fm):Fm(o.material),o.frustumCulled=!1)}return{prepareScene(){e.traverseVisible(a)},setRoute(o,c,l){let[h,f]=wb[o]||Tb,u=l*f+c%5*.69+.63;t.set(h,f,u,Math.cos(u))},offset(o){let c=t.x*(Math.cos(t.z-o*t.y)-t.w)*Be.smoothstep(-o,5,21),l=Math.max(.6,-o*.18-.8);return c/Math.hypot(1,c/l)},setCamera(o){r.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),n.fromArray(r.elements,0);let c=r.invert().elements;i.set(c[2],c[6],c[10],c[14])},curve:t}}var Xf="M4 17h24v3H4z M6 16c0-6 4-11 10-11s10 5 10 11z M10 22h12c-1 4-3 6-6 6s-5-2-6-6z",Ab={plus:Xf,squad:Xf,reserve:Xf,merge:"M3 16l17-10 5 8-16 10z M6 23l5-3 4 7-6 2z M21 5l3-2 6 10-3 2z",range:"M3 20l14-10 3 4L7 25z M14 7l15-4-6 15-2-7z",longshot:"M3 20L18 9l3 4L7 25z M16 6l14-4-6 14-2-7z M3 12l8-6 2 2-8 7z M12 26l7-6 2 2-7 6z",rapid:"M3 11l8 5-8 5v-4l3-1-3-1z M11 8l12 8-12 8v-5l5-3-5-3z M22 9l8 7-8 7v-5l3-2-3-2z",shield:"M16 2l12 5v8c0 6-5 12-12 15C9 27 4 21 4 15V7z M16 7v17c5-3 7-6 7-10V10z",blast:"M14 12l5-2 1-5 4 1-2 6c5 3 6 8 3 13-3 5-12 6-17 1-4-4-4-12 1-15z M23 3l3-2 2 2-4 3z",plasma:"M17 1L5 18h9l-2 13 16-20H17l4-10z",spread:"M6 29V13H2l7-10 7 10h-4v16z M20 26V11h-4l7-9 7 9h-4v15z",drone:"M11 13h10l3 4-4 4h-8l-4-4z M3 6l8 5-2 3-8-5z M21 11l8-5 2 3-8 5z M1 24l8-5 2 3-8 5z M21 22l2-3 8 5-2 3z",engineer:"M2 23h28v4H2z M4 21V6h4v6c5 4 11 4 16 0V6h4v15h-4v-5l-4 2v3h-3v-2h-3v2h-3v-3l-3-2v5z",medic:"M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z",frost:"M14 1h4v10l8-5 2 4-9 6 9 6-2 4-8-5v10h-4V21l-8 5-2-4 9-6-9-6 2-4 8 5z",fever:"M15 1c2 8 8 8 7 15 3-1 4-4 4-6 8 16-5 23-12 20C4 28 2 21 7 13c0 4 2 5 3 5-1-7 5-10 5-17z"},zm={blue:{top:"#226b86",bottom:"#103754",rim:"#67cbcb",light:"#e1ffef",ink:"#f7fcf2",shade:"#082a3f",badge:"#147f94"},gold:{top:"#ffce66",bottom:"#eca341",rim:"#ffdd7e",light:"#fff5c5",ink:"#332b28",shade:"#744722",badge:"#93501d"}};function ha(s,e,t){s.beginPath(),e.forEach(([n,i],r)=>r?s.lineTo(n,i):s.moveTo(n,i)),s.closePath(),s.fillStyle=t,s.fill()}function km(s,e,t,n,i){let r=zm[xn[e].tone];s.save(),s.translate(t,n),s.scale(i/100,i/100);let a=[[-34,-46],[34,-46],[48,-31],[48,21],[33,35],[0,49],[-33,35],[-48,21],[-48,-31]];ha(s,a,r.shade),s.scale(.94,.94),ha(s,a,r.rim),s.scale(.88,.88);let o=s.createLinearGradient(0,-45,0,45);o.addColorStop(0,r.badge),o.addColorStop(1,r.shade),ha(s,a,o),s.scale(2,2),s.translate(-16,-16);let c=new Path2D(Ab[e]);s.translate(0,1.3),s.fillStyle=r.shade,s.fill(c,"evenodd"),s.translate(0,-1.3),s.fillStyle=r.light,s.fill(c,"evenodd"),s.restore()}function Hm(s){let e=new zn(s);return e.colorSpace=vt,e.anisotropy=4,e}function Gm(s){let e=document.createElement("canvas");e.width=640,e.height=196;let t=e.getContext("2d"),n=zm[xn[s].tone],i=t.createLinearGradient(0,0,0,196);i.addColorStop(0,n.top),i.addColorStop(.64,n.bottom),i.addColorStop(1,n.bottom),t.fillStyle=i,t.fillRect(0,0,640,196),ha(t,[[0,0],[200,0],[153,196],[0,196]],n.shade),ha(t,[[0,0],[640,0],[640,8],[12,8],[0,20]],n.rim),t.fillStyle="rgba(255,255,255,.10)",t.fillRect(13,177,614,3);for(let l of[13,627])for(let h of[22,175])t.fillStyle=n.shade,t.fillRect(l-4,h-3,8,6),t.fillStyle=n.light,t.fillRect(l-3,h-3,6,2);for(let l of[551,576,601])ha(t,[[l,154],[l+13,154],[l+7,164],[l-6,164]],n.rim);km(t,s,92,96,144);let r=xn[s],a=r.count?145:113;t.font="900 "+a+'px "Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif',t.textAlign="center";let o=t.measureText(r.label),c=96+(o.actualBoundingBoxAscent-o.actualBoundingBoxDescent)/2;return t.translate(381,c),t.scale(Math.min(1,376/o.width),1),t.fillStyle=xn[s].tone==="gold"?"#ffda7d":"#082d47",t.fillText(r.label,0,4),t.fillStyle=n.ink,t.fillText(r.label,0,0),Hm(e)}function Vm(s){let e=Object.keys(xn),t=Math.ceil(Math.sqrt(e.length)),n=128,i=document.createElement("canvas");i.width=i.height=t*n;let r=i.getContext("2d"),a=new Map;e.forEach((d,p)=>{let x=p%t,g=Math.floor(p/t);km(r,d,(x+.5)*n,(g+.5)*n,118),a.set(d,[x/t,1-(g+1)/t])});let o=new yt({map:Hm(i),side:Ht,alphaTest:.26,toneMapped:!1});o.onBeforeCompile=d=>{d.vertexShader=`attribute vec2 badgeCell;
`+d.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
vMapUv = vMapUv * `+(1/t).toFixed(6)+" + badgeCell;")};let c=new Ft(.99,.99),l=40,h=new Jt(new Float32Array(l*2),2);h.setUsage(cn),c.setAttribute("badgeCell",h);let f=new Yt(c,o,l);f.name="Flying supply insignia",f.count=0,f.frustumCulled=!1,f.instanceMatrix.setUsage(cn),s.add(f);let u=new Rt;return{update(d){let p=0;for(let x of d){if(x.slot!=null||x.age<0||p>=l)continue;let g=x.progress;u.scale.setScalar(.65+.62*Math.sin(Math.PI*g)),u.rotation.set(-.57,Math.sin(g*Math.PI*2)*.48,.13*Math.sin(g*Math.PI*2)),u.position.set(x.x,x.y+.35,x.z),u.updateMatrix(),f.setMatrixAt(p,u.matrix);let m=a.get(x.type);h.setXY(p++,m[0],m[1])}f.count=p,p&&(f.instanceMatrix.needsUpdate=!0,h.needsUpdate=!0)}}}function Wm(s){let e=[],t="#386167",n="#394852",i="#d9a35c",r="#866047",a=(d,p,x,g,m,v,M,_=null)=>e.push(et(fn(d,p,x),g,m,v,M,_)),o=(d,p,x,g,m,v,M,_,E=null)=>e.push(et(new Qt(d,p,x,g),m,v,M,_,E)),c=(d,p,x,g)=>e.push(Fn(d,p,x,g,6));function l(d,p,x,g,m,v,M,_){let E=new Ki(1);E.scale(g,m,v),e.push(et(E,M,d,p,x,new Vt(.09,_,.15)))}function h(d,p,x){a(3.6,.38,x,"#806d5b",d,-1.8,p);for(let g of[-1,1]){a(.13,.19,x,"#c7a073",d+1.67*g,-1.52,p);for(let m of[-1,1])o(.16,.24,2.9,8,r,d+1.45*g,-2.65,p+m*(x/2-.25))}for(let g=0;g<x/.45;g++)a(3.25,.034,.026,"#a78869",d,-1.58,p-x/2+.2+g*.45)}function f(d,p){o(1.2,1.65,1.9,12,"#8c8e83",d,-2.72,p),o(.66,.9,2.55,14,"#ebe4c4",d,-.55,p),o(.72,.8,.68,14,"#b95843",d,-.42,p),o(.86,.66,.22,14,n,d,.82,p),o(.6,.6,.7,12,"#fbdc91",d,1.24,p);for(let x=0;x<8;x++){let g=x*Math.PI/4;o(.045,.045,.83,5,t,d+.61*Math.cos(g),1.25,p+.61*Math.sin(g))}o(.05,.9,.52,12,"#587579",d,1.92,p),o(.04,.04,.39,8,i,d,2.32,p)}function u(d,p,x){let g=d>0?-1:1,m=d+g*1.9,v=-1.5+x;a(.75,.48,.76,n,d,-1.25,p);for(let M of[-.28,.28]){a(.12,x,.12,"#d4a354",d,-1.51+x/2,p+M),c([d,v-.77,p+M],[m,v+.32,p+M],.06,i),c([d,v+.34,p+M],[m,v+.32,p+M],.075,i);for(let _=0;_<4;_++)c([d,-1.37+_*x/4,p+M],[d,-1.37+(_+1)*x/4,p-M],.035,t)}a(.59,.57,.82,"#a47849",d-g*.28,v+.14,p),o(.14,.14,.75,10,n,m,v+.29,p,new Vt(Math.PI/2,0,0)),c([m,v+.26,p],[m,v-.79,p],.025,n),a(.7,.47,.69,"#b77749",m,v-1.02,p);for(let M of[-.2,.2])a(.73,.5,.045,n,m,v-1.02,p+M)}if(s==="quay"){f(-8.95,-2);for(let d=0;d<4;d++)l(-9-.56*(d%2),-3.55,-.2+d*.65,.93,.55,1.1,"#87958b",d*.7);h(9.1,15,5.1),u(9.5,15.85,2.55);for(let[d,p]of[[8.38,13.6],[9.4,13.4],[8.43,14.36]])a(.8,.58,.65,"#bd906c",d,-1.28,p),a(.09,.61,.675,t,d-.23,-1.28,p)}else if(s==="timber"){for(let[d,p,x]of[[-9,-1,3.9],[-10.7,-3,4.6],[-9.4,1.2,3],[10,14,3.8],[11.1,16,4.1]]){l(d,-3.54,p,1.95,.85,2.1,"#73877a",d),o(.14,.25,x*.72,8,r,d,-2+x*.23,p);for(let g=0;g<3;g++)o(.02,(1.5-g*.28)*x/4,x*.51,8,["#3e6857","#4f8069","#74a186"][g],d,-2+x*(.38+g*.22),p)}h(8.65,17.5,4.1);for(let d of[16.4,18.6])for(let p of[8.1,9.2])a(.14,2.8,.14,r,p,-.18,d);a(1.72,.14,3.06,"#cb9760",8.65,1.18,17.5),o(0,1.83,.71,4,"#587c70",8.65,1.6,17.5,new Vt(0,.785,0))}else if(s==="quarry"||s==="cinder"||s==="ice"){let d=s==="ice",p=s==="cinder",x=d?["#8dbdcc","#b4d4db","#d5e9e7"]:p?["#433f49","#57505e","#736362"]:["#957765","#a7866d","#c1a383"];for(let[g,m]of[[-1,0],[1,17]])for(let v=0;v<6;v++){let M=g*(8.6+v%3*.98),_=m+(v%2*2-1)*(v*.64+.4),E=1.32+v%3*.77;l(M,-3.29,_,2.12,E,2.32,x[0],v*1.27),p?(o(.58,.8,E,6,x[v%3],M,-2+E*.26,_),o(.49,.51,.09,6,"#b96845",M,-2+E*.76,_)):(l(M,-3.25+E*.44,_,1.62,E*.68,1.95,x[1],v*1.27),l(M,-3.17+E*.72,_,1.18,E*.45,1.49,x[2],v*1.27)),d&&v%2===0&&o(.01,.44,1.75,5,"#a5edf0",M,-.95,_,new Vt(0,0,g*.24))}!p&&!d&&(h(9.7,10,4.3),u(9.6,10.5,3.4))}else if(s==="forge"){h(-9.4,0,6.1),u(-9.5,0,4.1),h(9.3,15,7.2);for(let[d,p,x]of[[8.8,16,3.8],[10,14.8,2.9]]){o(.37,.43,x,14,"#637d83",d,-1.4+x/2,p);for(let g of[.17,.57,.95])o(.42,.42,.12,14,i,d,-1.4+g*x,p);o(.29,.29,.06,14,n,d,-1.36+x,p)}for(let d of[12.1,13.2])a(2.2,.63,.82,"#a86c49",9.24,-1.26,d)}return Un(e)}var qf=new Bt({vertexColors:!0,shininess:33,specular:5527131}),jn=(s=0,e=0,t=0)=>new Vt(s,e,t),dt=(s,e,t,n,i,r,a,o=0,c=null)=>et(fn(s,e,t,o),n,i,r,a,c),Wt=(s,e,t,n,i,r,a,o=null,c=16)=>et(new Qt(s,e,t,c),n,i,r,a,o),sh=(s,e,t,n,i,r,a=null)=>et(new Jn(s,e,7,30),t,n,i,r,a),lr=s=>new Ke(Un(s),qf),Vn="#506272",as="#e4aa48",Uo="#f6dda0",gi="#394655",Yf="#b78053",Hw=Be.clamp;function Rb(s){let e=[],t=[];if(s==="glass"){e.push(dt(3.87,.17,.83,Yf,0,.11,0,.04),dt(3.83,.28,.075,Vn,0,.26,.38,.025));for(let n of[-1.79,1.79])e.push(dt(.15,.62,.77,gi,n,.35,0,.03));for(let[n,i]of[0,-1.12,1.12].entries()){let r=n===0?1.14:.91,a=[Wt(.38,.32,.12,"#176c72",i,.23,0),Wt(.38,.38,r*.59,"#45bdb3",i,.28+r*.29,0),Wt(.13,.38,r*.32,"#7ae1cc",i,.28+r*.74,0),Wt(.13,.13,.22,"#309994",i,.34+r*.93,0),Wt(.167,.167,.09,"#f7cf7a",i,.46+r*.93,0),Wt(.39,.39,.14,"#f7edbe",i,.37+r*.3,0),dt(.06,r*.34,.045,"#ddfff2",i-.21,.48+r*.38,.3,.015,jn(0,0,-.12))];t.push(lr(a))}}else if(s==="crates"){e.push(dt(3.89,.15,.91,gi,0,.09,0,.035));for(let[n,i]of[0,-1.24,1.24].entries()){let r=n===0?1.35:.96,a=[dt(1.18,r,.78,n?"#b77d49":"#cf925c",i,.17+r/2,0,.065)];for(let o of[-1,1]){a.push(dt(.105,r,.085,"#f0c685",i+o*.48,.17+r/2,.4,.013),dt(1.14,.078,.085,"#704d3c",i,.17+r*(o>0?.9:.12),.405,.012),Fn([i+o*.46,.27,.46],[i-o*.46,r+.04,.46],.052,"#ebc188",6));for(let c of[.3,r+.01])a.push(Wt(.038,.038,.022,Vn,i+o*.48,c,.458,jn(Math.PI/2),8))}t.push(lr(a))}}else{e.push(dt(3.89,.16,.92,gi,0,.09,0,.05),dt(3.84,1.12,.6,"#56697b",0,.71,0,.06));for(let n=0;n<5;n++)e.push(dt(3.62,.12,.14,n%2?"#8ea3ad":"#a7b7bf",0,.29+n*.21,.3,.025));for(let n of[-1.79,1.79]){e.push(dt(.21,1.37,.7,Vn,n,.67,0,.04));for(let i of[.3,.73,1.14])e.push(dt(.22,.14,.06,"#f2bc59",n,i,.369,0,jn(0,0,.18)))}e.push(dt(.93,.74,.14,gi,0,.8,.36,.055),sh(.258,.067,"#ffb94e",0,.83,.46),Wt(.15,.15,.06,"#ee702e",0,.83,.47,jn(Math.PI/2),16))}return e.push(dt(1.13,.32,.08,gi,0,.23,.455,.035)),{base:lr(e),sections:t}}function Cb(){let s=[dt(1.52,1.19,1.24,"#a97748",0,.82,0,.055),dt(1.68,.15,1.39,Vn,0,.25,0,.033),dt(1.65,.12,1.38,"#66737b",0,1.46,0,.03),dt(1.58,.25,.074,"#ffc76c",0,1.12,.631),sh(.175,.046,as,0,1.66,0)];for(let c of[-1,1]){s.push(dt(.18,1.34,1.32,"#495866",c*.61,.86,0,.025)),s.push(dt(.23,.17,1.48,gi,c*.52,.11,0,.03));for(let l of[.39,1.32])s.push(Wt(.047,.047,.045,Uo,c*.61,l,.669,jn(Math.PI/2),8));s.push(Fn([c*.48,.44,.644],[-c*.47,.95,.644],.046,"#ddbb89",6))}for(let c=-2;c<=2;c++)s.push(dt(.09,.24,.02,gi,c*.22,1.12,.676,0,jn(0,0,-.42)));let e=[];for(let c=0;c<12;c++){let l=c*Math.PI/6,h=new ys(.95,1,8,1,l+.035,Math.PI/6-.07);if(h.rotateX(-Math.PI/2),e.push(et(h,c%3?"#ffbb49":"#fff0aa",0,.013,0)),c%3===0){let f=new Yi(.075,.17,3);f.rotateX(Math.PI/2),f.rotateY(Math.PI/2+l),e.push(et(f,"#fff0aa",Math.cos(l)*.87,.01,-Math.sin(l)*.87))}}let t=new yt({vertexColors:!0,toneMapped:!1,depthWrite:!1}),n=new Ke(Un(e),t);n.renderOrder=3;let i=new $a(1,48);i.rotateX(-Math.PI/2);let r=new Ke(i,new yt({color:"#ff7e31",transparent:!0,opacity:.13,depthWrite:!1}));r.renderOrder=2;let a=new ys(.96,1,48);a.rotateX(-Math.PI/2);let o=new Ke(a,new yt({color:"#fff0a4",transparent:!0,opacity:.77,depthWrite:!1}));return o.renderOrder=3,{base:lr(s),halo:n,tint:r,sweep:o}}function Ib(s,e=4.4,t=1,n){if(s==="cover")return Rb(n);if(s==="skyfall")return Cb();let i=[],r=[],a=[];if(s==="gap"||s==="bridge"){let o=e/2;for(let l of[-1,1]){i.push(dt(4.22,.43,.25,Vn,0,-.2,l*(o+.04),.035));for(let h=-3;h<=3;h++)i.push(dt(.29,.025,.19,h%2?as:gi,h*.53,.025,l*(o+.21),0,jn(0,.23,0)));for(let h of[-1,1]){let f=h*1.97;i.push(dt(.2,.83,.24,gi,f,-.39,l*o,.025),Fn([f,-.85,l*o],[f,-.1,l*(o+.65)],.055,Vn))}}let c=Math.round(e/.4);for(let l=0;l<c;l++){let h=(l+.5)*e/c;r.push(dt(4.03,.14,e/c-.025,l%3===0?"#c59762":Yf,0,.01,h,.018));for(let f of[-1.54,1.54])r.push(Wt(.056,.056,.015,Vn,f,.085,h,null,7))}for(let l of[-1.5,1.5])r.push(dt(.19,.28,e,Vn,l,-.14,o,.024));if(s==="bridge"){for(let l of[-1,1]){let h=l*1.92;i.push(dt(.21,1.72,.34,Vn,h,.82,-o,.04),Wt(.23,.23,.12,as,h,1.68,-o,jn(0,0,Math.PI/2)),Fn([h,.12,-o-.42],[h,1.3,-o],.054,Uo))}i.push(Wt(.16,.16,3.9,Vn,0,.11,-o,jn(0,0,Math.PI/2))),i.push(dt(1.33,.61,.41,Vn,0,.33,o+.24,.055),dt(1.45,.09,.48,as,0,.64,o+.24,.025))}else for(let l=0;l<5;l++)i.push(Fn([l*.63-1.25,-.11,-o],[l*.63-1.21,-.18,-o+.28+l%2*.18],.024,Vn,6))}else if(s==="cache"){for(let o=0;o<3;o++)for(let c=0;c<5;c++){let l=["#af7149","#ba8051","#cf955f","#a56745"];i.push(dt(.643,.366,.65,l[(c+2*o)%4],(c-2)*.665,.22+o*.385,0,.033))}for(let o of[-1.53,1.53]){i.push(dt(.17,1.24,.75,as,o,.6,0,.035));for(let c of[.19,.57,1.02])i.push(Wt(.047,.047,.034,Uo,o,c,.389,jn(Math.PI/2),8))}i.push(dt(3.38,.11,.72,gi,0,1.18,0,.025),dt(1.7,.61,.07,gi,0,.63,.345,.055))}else if(s==="coil"){i.push(Wt(.78,.9,.22,Vn,0,.12,0,null,28),Wt(.26,.34,.96,"#b2d5ce",0,.68,0,null,28));for(let o=0;o<7;o++)i.push(sh(.39-o*.016,.044,o%2?"#cc8548":"#f3b867",0,.3+o*.115,0,jn(Math.PI/2)));i.push(Wt(.25,.3,.2,as,0,1.19,0),et(new Ki(.21,1),"#96ffff",0,1.39,0))}else if(s==="belt"){i.push(dt(3.9,.065,e,"#697981",0,.035,0,.045));for(let o of[-1.92,1.92])i.push(dt(.1,.11,e,as,o,.074,0,.022));for(let o=0;o<11;o++)i.push(dt(3.74,.045,.055,"#475765",0,.08,(o-5)*e/11));for(let o=0;o<5;o++)for(let c of[-1,1])a.push(Fn([-.24*t,.107,(o-2)*1.53+c*.3],[.24*t,.107,(o-2)*1.53],.052,Uo,6))}return{base:lr(i),deck:r.length?lr(r):null,arrows:a.length?lr(a):null}}function Pb(){let s=document.createElement("canvas");s.width=320,s.height=104;let e=s.getContext("2d"),t=new zn(s);t.colorSpace=vt;let n=new Ke(new Ft(1.56,.51),new yt({map:t,transparent:!0,depthWrite:!1,toneMapped:!1})),i="";return{mesh:n,label(r){r!==i&&(i=r,e.clearRect(0,0,320,104),e.font='900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif',e.textAlign="center",e.textBaseline="middle",e.lineWidth=9,e.strokeStyle="#2e3b48",e.strokeText(r,160,56),e.fillStyle="#fff3cf",e.fillText(r,160,56),t.needsUpdate=!0)},dispose(){t.dispose(),n.geometry.dispose(),n.material.dispose()}}}function Lb(s){let e=mr[s],t=[];for(let n of[-1,1]){let i=n*6.68;if(t.push(dt(.25,4.6,.38,e.frame,i,-2.36,0,.025),Fn([i,-2.4,0],[i,-.3,2.1],.085,e.frame)),s==="timber"){for(let r of[0,.45])t.push(Wt(.13,.18,2,"#956b48",i+n*r,-.4,1.3+r,null,9));t.push(Fn([i,.32,1.3],[i,.28,4.9],.046,"#bda77e"));for(let[r,a]of[[2.1,1.8],[1.5,3]]){t.push(Wt(.15,.19,1.8,Yf,i+n*a,-3,1+a,null,7));for(let o=0;o<3;o++)t.push(et(new Yi(.77-o*.18,r*.57,8),["#477b62","#599170","#79a181"][o],i+n*a,-2.65+o*.45,1+a))}}else if(s==="quarry"||s==="cinder"||s==="ice"){for(let r=0;r<4;r++){let a=new Yi(.58+r*.13,1.4+r%2*1.3,s==="ice"?5:7);t.push(et(a,s==="ice"?["#85bdce","#b2dce4"][r%2]:r%2?e.frame:e.joint,i+n*(1+r*.55),-2.5+.28*r,r*1.35,jn(.09*r,.6*r,n*.16)))}s==="cinder"&&t.push(Wt(.23,.34,.49,"#c78047",i,-.02,0),Wt(.18,.21,.14,"#ffcb76",i,.28,0))}else s==="forge"?t.push(Wt(.28,.28,3.5,"#657f8e",i+n*.36,-.53,.4,jn(Math.PI/2)),sh(.32,.056,as,i+n*.36,-.53,1.75),dt(.46,.51,.44,Vn,i,.21,0,.045)):(t.push(Wt(.18,.24,.48,"#737f85",i,.13,0),Wt(.27,.25,.11,as,i,.42,0)),t.push(Wt(.34,.48,.58,"#c16649",i+n*1.6,-3.07,1.6),Wt(.18,.3,.23,Uo,i+n*1.6,-2.68,1.6)))}return Un(t)}function Xm(s,e=new ut){let t=Array.from({length:10},()=>new ut(0,-1e3,0,0));function n(_){_.onBeforeCompile=E=>{E.uniforms.roadCuts={value:t},E.vertexShader=E.vertexShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
deckPosition=(modelMatrix*vec4(transformed,1.)).xyz;`),E.fragmentShader=E.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition; uniform vec4 roadCuts[10];`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
for(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}`)}}let i=new Ke(new Ft(140,154),new Ot({uniforms:{deep:{value:new we},crest:{value:new we},clock:{value:0},origin:{value:0},biome:{value:0},roadCurve:{value:e}},vertexShader:"varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",fragmentShader:`${Wf}
      varying vec3 pos; uniform vec3 deep, crest; uniform float clock, origin, biome;
      void main(){
        vec2 q=vec2(pos.x,pos.z-origin);
        float swell=sin(q.x*.78+clock*.30)*.9+sin(q.x*.29-q.y*.19)*.54;
        float wave=sin(q.y*2.1+swell+clock*.56)+.45*sin(q.x*.82-q.y*1.8-clock*.31);
        float shelf=smoothstep(-.8,.95,sin(q.x*.27+q.y*.21)+.47*sin(q.x*.5-q.y*.24));
        float foam=smoothstep(1.17,1.44,wave)*(.16+.40*shelf);
        float gleam=.07+.17*shelf+foam;
        if(biome>1.5){
          float seam=abs(sin(q.x*.68+sin(q.y*.91)+q.y*.64));
          gleam=.035+.13*shelf+(.53+.27*sin(clock*.9+q.y*.7))*(1.-smoothstep(0.,.085,seam));
        }else if(biome>.5){
          float seam=abs(sin(q.x*.82+q.y*.6+sin(q.y*.55)));
          gleam=.20+.25*shelf+.19*(1.-smoothstep(0.,.075,seam))+foam*.2;
        }
        float shore=abs(q.x-lateralBend(pos.z));
        vec3 c=mix(deep,crest,clamp(gleam,0.,1.));
        c*=mix(.62,1.,smoothstep(5.6,9.7,shore));
        gl_FragColor=vec4(c,1.);
      #include <colorspace_fragment>
      }`}));i.rotation.x=-Math.PI/2,i.position.set(0,-3.7,-43),i.material.userData.unbent=!0,s.add(i);let r=new Map,a=new Map,o=new Map,c=new Map,l=new Ge,h,f,u=new Qt(.035,.035,1,8),d=new Bt({color:11246457}),p=new N,x=new N,g=new N,m=new N(0,1,0);function v(_){let E=[_.kind,_.variant||"",_.length||0,_.direction||0].join(":");r.has(E)||r.set(E,Ib(_.kind,_.length,_.direction,_.variant));let S=r.get(E),y=new It,b=S.base.clone();y.add(b);let A=(S.sections||[]).map(G=>G.clone());for(let G of A)y.add(G);let R,D,k,X;if(S.halo){X={halo:S.halo.clone(),tint:S.tint.clone(),sweep:S.sweep.clone()};for(let G of Object.values(X))y.add(G);X.tint.position.y=.038,X.halo.position.y=.044,X.sweep.position.y=.048}let U=[];if(S.deck&&(R=S.deck.clone(),R.position.z=-_.length/2,y.add(R)),S.arrows&&(D=S.arrows.clone(),y.add(D)),(_.kind==="cache"||_.kind==="bridge"||_.kind==="coil"||_.kind==="cover")&&(k=Pb(),y.add(k.mesh),k.mesh.position.set(0,_.kind==="cover"?.25:_.kind==="cache"?.66:_.kind==="coil"?.55:.43,_.kind==="cover"?.512:_.kind==="bridge"?_.length/2+.48:_.kind==="coil"?.56:.397),_.kind==="cover"&&k.mesh.scale.setScalar(.78)),_.kind==="bridge")for(let G=0;G<2;G++){let V=new Ke(u,d);y.add(V),U.push(V)}return s.add(y),{g:y,base:b,leaf:R,arrows:D,chains:U,sections:A,label:k,drop:X}}function M(_){let E=_.route.theme;if(E!==h){if(h&&(a.get(h).visible=!1,o.get(h).visible=!1),h=E,!a.has(E)){let A=new Yt(Lb(E),qf,10);A.frustumCulled=!1;let R=new Yt(Wm(E),qf,3);R.frustumCulled=!1,o.set(E,R),s.add(R),a.set(E,A),s.add(A)}a.get(E).visible=!0,o.get(E).visible=!0,i.material.uniforms.biome.value=E==="cinder"?2:E==="ice"?1:0,i.material.uniforms.deep.value.set(mr[E].deep),i.material.uniforms.crest.value.set(mr[E].glint)}let S=o.get(E);for(let A=0;A<S.count;A++)S.setMatrixAt(A,l.makeTranslation(0,0,-36-A*47+_.distance%47));S.instanceMatrix.needsUpdate=!0;let y=a.get(E);for(let A=0;A<10;A++)y.setMatrixAt(A,l.makeTranslation(0,0,12-A*10+_.distance%10));if(y.instanceMatrix.needsUpdate=!0,i.material.uniforms.clock.value=_.elapsed,i.material.uniforms.origin.value=_.distance,_.features!==f){for(let A of c.values())A.g.removeFromParent(),A.label?.dispose();c.clear(),f=_.features}let b=0;for(let A of _.features){if(A.z<-68||A.z>14){let D=c.get(A);D&&(D.g.visible=!1);continue}let R=c.get(A)||v(A);if(c.set(A,R),R.g.visible=!0,R.g.position.set(A.x,0,A.z),R.drop){let D=A.state==="warning",k=A.state==="landed";if(R.g.visible=D||k&&A.age<.85,!R.g.visible)continue;let X=A.fallProgress||0,U=A.age,G=A.radius;if(R.drop.halo.visible=R.drop.tint.visible=D,R.drop.halo.scale.setScalar(G),R.drop.tint.scale.setScalar(G),R.drop.sweep.visible=D||U<.38,R.drop.sweep.scale.setScalar(G*(D?.1+.88*A.progress:1+.77*Be.smoothstep(U,0,.38))),R.base.visible=!0,D){let V=7.9+10*(1-Be.smoothstep(A.progress,.08,.71));R.base.position.y=V*(1-X*X),R.base.rotation.set(.12*(1-X),.39*(1-X),.13*(1-X)),R.base.scale.setScalar(1)}else{let V=Math.sin(U*20)*Math.exp(-U*10);R.base.position.y=Math.abs(V)*.32,R.base.rotation.set(.08*V,0,.14*V),R.base.scale.setScalar(1-Be.smoothstep(U,.34,.83))}}if(A.kind==="cover"){let D=A.hp/A.maxHp;R.sections.forEach((k,X)=>{k.visible=D>X*.34}),R.g.rotation.z=Math.sin(A.age*95)*A.flash*.033}if(_.parade&&A.kind!=="bridge"&&A.kind!=="gap"&&(R.g.position.y-=1.8*Be.smoothstep(_.endTime,0,.48),_.endTime>=.49&&(R.g.visible=!1)),A.kind==="gap"||A.kind==="bridge"){_.parade&&(R.exitAngle??(R.exitAngle=R.leaf.visible?R.leaf.rotation.x:Math.PI/2),R.leaf.position.y=.03),b<t.length&&t[b++].set(A.x,A.z,4.4/2-.055,A.length/2),R.leaf.visible=!!_.parade||A.kind==="bridge"||A.state==="repaired";let D=Be.smoothstep(A.age,0,.58);R.leaf.rotation.x=_.parade?R.exitAngle*(1-Be.smoothstep(_.endTime,0,.45)):A.state==="cut"?-.2+1.6*D:A.state==="ready"&&A.kind==="bridge"?-.2:A.state==="linked"?-.2*(1-D):0,A.state==="repaired"&&(R.leaf.position.y=.03+.22*(1-D));for(let k=0;k<R.chains.length;k++){let X=R.chains[k],U=(k?1:-1)*1.83;X.visible=A.state!=="cut"&&A.state!=="repaired",p.set(U,1.63,-A.length/2),x.set(U,-Math.sin(R.leaf.rotation.x)*A.length+.1,-A.length/2+Math.cos(R.leaf.rotation.x)*A.length),g.subVectors(x,p),X.scale.y=g.length(),X.position.copy(p).lerp(x,.5),X.quaternion.setFromUnitVectors(m,g.normalize())}}R.arrows&&(R.arrows.position.x=Math.sin(_.elapsed*5)*.39*A.direction),R.label&&(R.label.mesh.visible=A.state==="ready",R.label.mesh.visible&&R.label.label((A.kind==="cover"?"":A.kind==="bridge"?"\u65AD\u7D22 ":A.kind==="coil"?"\u7535 ":"\u7BB1 ")+Math.ceil(A.hp))),(A.kind==="cache"||A.kind==="coil"||A.kind==="cover")&&A.state!=="ready"&&R.base.scale.setScalar(1-Be.smoothstep(A.age,0,.24))}for(let A=b;A<t.length;A++)t[A].set(0,-1e3,0,0)}return{cutDeck:n,update:M}}var Zf=13.2,cr=14,fa=-110,Kf=cr-fa,ua=(cr+fa)/2,Jf=-.18;function qm(s){let e=mr[s],t=parseInt(e.floor.slice(1),16),n=document.createElement("canvas");n.width=512,n.height=384;let i=n.getContext("2d"),r=i.createImageData(n.width,n.height),a=941;for(let l=0;l<n.height;l++)for(let h=0;h<n.width;h++){a=Math.imul(1664525,a)+1013904223>>>0;let f=(a/4294967296-.5)*5.2,u=Math.min(h,n.width-1-h),d=f+1.1*Math.cos(h*.069+Math.sin(l*.049))-Math.max(0,1-u/12)*16,p=(l*n.width+h)*4;r.data[p]=(t>>16)+d,r.data[p+1]=(t>>8&255)+d,r.data[p+2]=(t&255)+d,r.data[p+3]=255}i.putImageData(r,0,0),i.scale(2,2),i.fillStyle="rgba(81,74,91,.21)",i.fillRect(0,0,n.width,1.5),i.fillStyle="rgba(244,236,233,.36)",i.fillRect(0,2,n.width,1);for(let l of[7,249])for(let h of[9,183])i.fillStyle="#a59aa4",i.fillRect(l-1,h-1,2.5,2.5);let o=(l,h,f,u,d,p=1)=>{i.strokeStyle=d,i.lineWidth=p,i.beginPath(),i.moveTo(l,h),i.lineTo(f,u),i.stroke()};if(s==="quay"){for(let l of[21,63,105,149,193,235]){let h=i.createLinearGradient(l-6,0,l+6,0);h.addColorStop(0,"rgba(93,91,91,0)"),h.addColorStop(.48,"rgba(93,91,91,.075)"),h.addColorStop(1,"rgba(93,91,91,0)"),i.fillStyle=h,i.fillRect(l-6,0,12,192)}o(0,96,256,96,"rgba(91,91,100,.32)",1.05),o(0,97.5,256,97.5,"rgba(255,249,238,.40)");for(let[l,h]of[[6,41],[246,137]]){i.fillStyle="#898b8a",i.fillRect(l,h,4.1,13);for(let f=1;f<13;f+=2)o(l+.45,h+f,l+3.7,h+f,"#555f65",.72)}for(let[l,h]of[[28,5],[112,100],[228,100]])o(l,h,l+3,h+2,"rgba(84,87,92,.24)",.75),o(l+3,h+2,l+6,h+1,"rgba(84,87,92,.19)",.6)}else if(s==="timber")for(let l=0;l<8;l++){let h=l*24;o(0,h,256,h,e.joint,2),o(0,h+2,256,h+2,"#efc398",1);for(let f=0;f<4;f++){let u=(l*41+f*71)%244;i.strokeStyle="rgba(112,69,43,.20)",i.beginPath(),i.moveTo(u,h+12),i.bezierCurveTo(u+13,h+6,u+17,h+15,u+38,h+10),i.stroke()}}else if(s==="forge")for(let l=0;l<3;l++)for(let h=0;h<4;h++){let f=l*85+7,u=h*48+5;i.strokeStyle=e.joint,i.strokeRect(f,u,71,35);for(let d=0;d<4;d++)o(f+7+d*4,u+26,f+12+d*4,u+19,"#82939f")}else if(s==="quarry"||s==="cinder")for(let l=0;l<4;l++){let h=l*48;o(0,h,256,h+1,e.joint,1.5);for(let f=0;f<4;f++){let u=f*76+l%2*32;o(u,h,u+2,h+48,e.joint)}}else if(s==="ice")for(let l=0;l<12;l++){let h=l*63%249,f=l*47%175;o(h,f,h+14,f+13,"#e2f4fa",1.4),o(h+7,f+7,h+17,f+6,"#a0c4d7")}for(let l of[-1,1]){let h=l<0?1.6:250.6;i.fillStyle="rgba(46,55,64,.32)",i.fillRect(h,0,3.8,192),i.fillStyle="rgba(239,230,203,.58)",i.fillRect(h+.7,0,.8,192);for(let f of[28,125])i.fillStyle="#626c6d",i.fillRect(h-.5,f,5.2,10),i.fillStyle=e.rim,i.fillRect(h+.65,f+2.1,2.7,3.7)}for(let l of[256/3,512/3]){i.fillStyle=e.line,i.fillRect(l-1.7,0,3.4,192),i.fillStyle=e.rim,i.fillRect(l-.25,0,1.2,192);for(let h=7;h<192;h+=48)i.fillRect(l-1.6,h,3,12)}let c=new zn(n);return c.colorSpace=vt,c.wrapT=bi,c.anisotropy=4,c.repeat.y=Kf/8,c}function Nb(s,e){let t=new Map,n,i=qm("quay");t.set("quay",i);let r=new Ke(new Ft(Zf,Kf,1,100),new co({map:i}));r.rotation.x=-Math.PI/2,r.position.set(0,0,ua),r.receiveShadow=!0,s.add(r);let a=(l,h)=>new Pn(l,h,Kf,1,1,100),o=[et(a(Zf+.13,.38),"#535568",0,-.205,ua)];for(let l of[-1,1]){let h=l*Zf/2;o.push(et(a(.13,.19),"#7c7b8a",h,.018,ua)),o.push(et(a(.095,.042),"#a6a1af",h+l*.01,.121,ua)),o.push(et(a(.055,.22),"#444759",h+l*.074,-.14,ua)),o.push(et(a(.048,.022),"#8b8391",h-l*.085,.006,ua))}let c=new Ke(Un(o),new Bt({vertexColors:!0,shininess:18}));return s.add(c),e.cutDeck(r.material),e.cutDeck(c.material),l=>{let h=l.route.theme;t.has(h)||t.set(h,qm(h)),n!==h&&(r.material.map=t.get(h),n=h),r.material.map.offset.y=l.distance/8%1}}function Ym(s,e){let t=[],n=[];function i(a,o,c,l,h,f,u,d){let p=c/2,x=[[-p,0],[p,0],[p+h,-l],[-p+h,-l]],g=[[-p+d,-d],[p-d,-d],[p+h-d,-l+d],[-p+h+d,-l+d]],m=[...x,...g],v=[0,0,0,0,f,f,u,u],M=[4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7];for(let _ of M){let E=m[_];t.push(a+E[0],.008,o+E[1]),n.push(1,1,1,v[_])}}i(0,.1,s*1.01,e*.87,e*.92,.32,.22,.045),i(0,.17,s+.06,.32,.028,.2,.16,.07);let r=new _t;return r.setAttribute("position",new We(t,3)),r.setAttribute("color",new We(n,4)),r}function Db(s,e,t){let n=xn[e].tone==="gold",i=Oi,r=1.09,a=.17,o=n?"#b77e39":"#345565",c="#323e42",l=n?"#f0bf68":"#7db7ba",h=[],f=[et(fn(i-.1,r,a,.047),o,0,r/2,0)];for(let E of[-1,1]){let S=E*(i/2-.046);f.push(et(fn(.085,r+.087,.205),l,S,r/2+.021,0)),h.push(et(fn(.23,.13,.4,.035),c,S,.065,.058)),f.push(et(fn(.13,.19,.23,.027),c,S,r-.04,0)),f.push(et(fn(.115,.044,.24),l,S,r-.09,0))}f.push(et(fn(i-.16,.047,.123),l,0,r-.012,-.003));let u=Un(f);u.rotateX(Jf),u.translate(0,.059,.015);let d=Un([u,...h]),p=new Ft(i-.19,r-.086);p.translate(0,r/2+.007,a/2+.004),p.rotateX(Jf),p.translate(0,.059,.015);let x=[d,p,Ym(i,r)],g=[new Bt({vertexColors:!0,shininess:52,specular:6775634}),new yt({map:Gm(e),toneMapped:!1}),t],m=16,v,M=new Ge;function _(E){if(v)for(let S of v)s.remove(S),S.dispose();m=E,v=x.map((S,y)=>{let b=new Yt(S,g[y],m);return b.count=0,b.frustumCulled=!1,y===2&&(b.renderOrder=1),s.add(b),b}),v[0].instanceMatrix.setUsage(cn);for(let S of v.slice(1))S.instanceMatrix=v[0].instanceMatrix}return _(m),(E,S)=>{let y=0;for(let A of E)(A.active||A.pop<.28)&&A.type===e&&A.z>=fa&&A.z<cr&&y++;y>m&&_(Be.ceilPowerOfTwo(y));let b=0;for(let A of E){if(!A.active&&!(A.pop<.28)||A.type!==e||A.z<fa||A.z>=cr)continue;let R=A.active?0:A.pop/.28,D=(1+.24*Math.sin(Math.PI*R)+A.flash*.065)*(1-R*R);M.makeScale(D,D*(1-S)*(1+.18*Math.sin(R*Math.PI)),D),M.setPosition(A.x+.22*(A.x<0?1:-1)*R,Math.sin(R*Math.PI)*.38-S*.13,A.z),v[0].setMatrixAt(b++,M)}for(let A of v)A.count=b;v[0].instanceMatrix.needsUpdate=b>0}}var Ub=[[[[-.72,1.01],[-1.01,1.09],[-1.19,1.01],[-1.41,1.17]],[[-1.01,1.09],[-.93,1.24],[-1.02,1.39],[-.89,1.56]],[[-1.19,1.01],[-1.32,.86],[-1.51,.81]]],[[[-1.41,1.17],[-1.59,1.12],[-1.74,1.22],[-1.96,1.2]],[[-.72,1.01],[-.83,.82],[-.69,.66],[-.72,.53],[-.51,.31],[-.58,.15]],[[.48,1.18],[.65,1.33],[.82,1.36],[.95,1.56]],[[.65,1.33],[.72,1.08],[.98,.68],[1.19,.63],[1.38,.43]]],[[[.98,.68],[1.21,.88],[1.41,.8],[1.63,.97],[1.9,.9]],[[1.19,.63],[1.1,.42],[1.2,.31],[1.12,.12]],[[-.72,.53],[-1.03,.51],[-1.21,.37],[-1.47,.4]],[[-1.02,1.39],[-1.29,1.42],[-1.46,1.56]]]];function Fb(s){let e=[];for(let t of s)for(let n=1;n<t.length;n++){let[i,r]=t[n-1],[a,o]=t[n],c=Math.hypot(a-i,o-r)+.018,l=new Vt(0,0,Math.atan2(o-r,a-i)),h=n===1?.039:.031;e.push(et(new Ft(c,h),"#302e39",(i+a)/2,(r+o)/2,.227,l)),e.push(et(new Ft(c,h*.38),"#e3dee1",(i+a)/2,(r+o)/2+h*.41,.229,l))}return Un(e)}function Ob(s,e){let t=new It;s.add(t);let n=4.28,i=1.65,r=[et(fn(n-.08,i-.08,.39,.057),"#61616d",0,i/2,0)];for(let x of[-1,1]){let g=x*(n/2-.085);r.push(et(fn(.165,i,.47,.038),"#858493",g,i/2,0)),r.push(et(fn(.14,i-.12,.032),"#9998a4",g,i/2,.228));for(let m of[.15,i-.16]){let v=new Vt(Math.PI/2,0,0);r.push(et(new Qt(.074,.074,.023,10),"#40414e",g,m,.254,v)),r.push(et(new Qt(.052,.061,.032,6),"#a9a8af",g,m,.273,v))}}for(let x of[.084,i-.079])r.push(et(fn(n-.28,.11,.43,.019),"#898795",0,x,0));let a=document.createElement("canvas");a.width=256,a.height=112;let o=a.getContext("2d"),c=new zn(a);c.colorSpace=vt;let l=new Ke(new Ft(1.8,.79),new yt({map:c,transparent:!0,depthWrite:!1,toneMapped:!1}));l.position.set(0,.84,.253),t.add(l);let h,f=new Bt({vertexColors:!0,shininess:36,specular:6841713,emissive:16774637,emissiveIntensity:0});t.add(new Ke(Un(r),f));let u=new Ke(Ym(n,i),e);u.renderOrder=1,t.add(u);let d=new yt({vertexColors:!0}),p=Ub.map(x=>{let g=new Ke(Fb(x),d);return t.add(g),g});return x=>{if(t.visible=!!(x&&x.hp>0&&x.z>=fa&&x.z<cr),!t.visible)return;t.position.set(x.x,0,x.z);let g=Math.ceil(x.hp);g!==h&&(o.clearRect(0,0,a.width,a.height),o.font='900 102px "Arial Black",sans-serif',o.textAlign="center",o.textBaseline="middle",o.lineWidth=9,o.strokeStyle="#333340",o.strokeText(String(g),128,60),o.fillStyle="#f4edf0",o.fillText(String(g),128,60),c.needsUpdate=!0,h=g);let m=x.hp/Math.max(1,x.maxHp);f.emissiveIntensity=Math.sqrt(Be.clamp(x.flash||0,0,1))*.35,p[0].visible=m<.93,p[1].visible=m<=.67,p[2].visible=m<=.36}}function Zm(s,e){let t=new It;t.name="Course",s.add(t);let n=Xm(t,e),i=Nb(t,n),r=new yt({color:3158603,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),a=Object.keys(xn).map(p=>Db(t,p,r)),o=new Yt(new Pn(1,.073,.065),new yt,80);o.frustumCulled=!1,t.add(o);let c=new Ge,l=new we("#253347"),h=new we("#9ff9d9"),f=Un([et(fn(.43,.32,.1,.04),"#3e505d",0,0,.01),et(new Jn(.132,.045,7,18,Math.PI),"#ffe3a2",0,.13,.04),et(fn(.12,.1,.022,.017),"#f3be63",0,0,.072)]),u=new Yt(f,new Bt({vertexColors:!0}),40);u.frustumCulled=!1,u.instanceMatrix.setUsage(cn),t.add(u);let d=Ob(t,r);return{update(p){let{gates:x,wall:g}=p;n.update(p),i(p);let m=p.parade?Be.smoothstep(p.endTime,0,.4):0;for(let _ of a)_(m===1?[]:x,m);let v=0,M=0;for(let _ of x){if(!p.parade&&_.active&&_.cover?.hp>0&&_.z>fa&&_.z<cr&&(c.makeRotationX(Jf).setPosition(_.x+Oi/2-.35,.72,_.z+.18),u.setMatrixAt(M++,c)),p.parade||!_.active||_.hp>=_.maxHp||_.z<-45||_.z>cr)continue;let E=Oi-.38,S=E*_.hp/_.maxHp;for(let[y,b,A,R]of[[E,_.x,_.z+.18,l],[S,_.x-(E-S)/2,_.z+.22,h]])c.makeScale(y,1,1).setPosition(b,.13,A),o.setMatrixAt(v,c),o.setColorAt(v++,R)}u.count=M,u.instanceMatrix.needsUpdate=M>0,o.count=v,v&&(o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0),d(g)},dispose(){let p=new Set,x=new Set,g=new Set;t.traverse(m=>{m.isMesh&&(p.add(m.geometry),x.add(m.material),m.material.map&&g.add(m.material.map),m.isInstancedMesh&&m.dispose())}),t.removeFromParent();for(let m of p)m.dispose();for(let m of x)m.dispose();for(let m of g)m.dispose()}}}var Bb=new Ft(1,1),$f=new fi(1,16,10),Fo=s=>new yt({color:s,toneMapped:!1}),zb=new Bt({color:4213080,shininess:65}),jf=Fo(16760162),Km=Fo(13565951),Qf=new N,Jw=new N,kb=new N(0,1,0),ed=Be.clamp;function Hb(){return new Ot({uniforms:{ink:{value:new we},style:{value:0},time:{value:0},progress:{value:0},after:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 tex;uniform vec3 ink;uniform float style,time,progress,after;
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
    }`})}function Ii(s,e,t){let n=new Ke(s,e);return t.add(n),n}function Gb(s,e,t,n){Qf.subVectors(t,e);let i=Qf.length();s.position.copy(e).lerp(t,.5),s.scale.set(n,i,n),s.quaternion.setFromUnitVectors(kb,Qf.normalize())}function Vb(s){let e=new It;s.add(e);let t=Hb(),n=Ii(Bb,t,e);n.renderOrder=3;let i=new It;e.add(i);let r=new Bt({color:3330759,emissive:1210479,transparent:!0,opacity:.8,shininess:90});Ii($f,r,i).scale.set(.42,.28,.45);let a=Ii(new Jn(.46,.053,6,25,Math.PI*1.65),Km,i);a.rotation.x=-1.2;let o=new It;e.add(o),Ii($f,zb,o).scale.set(.235,.29,.235),Ii(new Jn(.235,.04,6,20),jf,o).rotation.x=1.3;let l=Ii($f,jf,o);l.position.y=.22,l.scale.setScalar(.12);let h=Ii(new Qt(1,.2,1,12,1,!0),new yt({color:6478335,transparent:!0,opacity:.41,toneMapped:!1,depthWrite:!1,side:Ht}),e),f=new It;e.add(f);let u=[Fo("#e8beff"),Fo("#ab65dd"),Fo("#83eaff")];for(let x=0;x<7;x++){let g=Ii(new Yi(1,1,5),u[x%2],f),m=x*2.4;g.position.set(Math.cos(m)*(.27+x*.05),.4,Math.sin(m)*(.27+x*.05)),g.rotation.set(Math.sin(m)*.32,x*.9,Math.cos(m)*.38),g.scale.set(.13+x%3*.035,.66+x%3*.35,.17)}let d=new It;e.add(d);for(let x=0;x<7;x++)Ii(new Js(1),Km,d).scale.set(.055,.09,.28);let p=Ii(new Jn(1,.09,6,32,Math.PI*1.4),jf,e);return p.rotation.x=-Math.PI/2,{root:e,mat:t,mark:n,bubble:i,shell:o,beam:h,ridge:f,streaks:d,wave:p}}function Jm(s){let e=Array.from({length:3},()=>Vb(s)),t=new N,n=new N;return function(r){let a=r.skill;e.forEach((o,c)=>{let l=a?.marks[c];if(o.root.visible=!!l&&!r.defeated,!o.root.visible)return;let h=a.age-l.delay,f=mh(a,l),u=ed((h-a.warm-a.flight)/.62,0,1),d=h>=a.warm,p=f>=1,x=l.x-a.x,g=l.z-a.z,m=o.mat.uniforms;m.ink.value.set(Rn[a.kind].color);let v=ed(h/a.warm,0,1);if(m.progress.value=d?f:v,m.after.value=u,m.time.value=a.age,m.style.value=l.shape==="circle"?0:l.shape==="strip"?1:2,o.mark.visible=h>=-.12&&u<1,l.shape==="circle")o.mark.rotation.set(-Math.PI/2,0,0),o.mark.scale.set(2*l.radius,2*l.radius,1),o.mark.position.set(l.x,.059,l.z);else{let S=Math.hypot(x,g),y=Math.atan2(x,g);o.mark.position.set((l.x+a.x)/2+Math.sin(y)*.82,.06,(l.z+a.z)/2+Math.cos(y)*.82),o.mark.rotation.order="YXZ",o.mark.rotation.set(Math.PI/2,y,0),o.mark.material.side=Ht,o.mark.scale.set(2*l.radius,S+1.64,1)}let M=d&&!p;o.bubble.visible=M&&a.kind==="diver",o.shell.visible=M&&a.kind==="engine";let _=o.bubble.visible?o.bubble:o.shell;if(_.visible){let S=a.x+(c?1:-1)*.8,y=a.kind==="engine"?4.6:.57;_.position.set(Be.lerp(S,l.x,f),a.height*(1-f)+.17+Math.sin(Math.PI*f)*y,Be.lerp(a.z,l.z,f)),_.rotation.y=f*7}let E=a.kind==="kestrel";if(o.beam.visible=E&&d&&u<.82,o.streaks.visible=o.beam.visible,o.beam.visible){let S=ed(f*1.25,0,1);t.set(a.x,a.height,a.z+.59),n.set(l.x,.34,l.z).lerp(t,1-S),Gb(o.beam,t,n,l.radius*(1-u*.55)),o.beam.material.opacity=(.31+.12*Math.sin(a.age*24))*(1-u),o.streaks.children.forEach((y,b)=>{let A=(a.age*1.9+b*.136)%1;y.position.copy(t).lerp(n,A),y.position.x+=Math.sin(b*1.8+a.age*11)*A*.78,y.position.y+=Math.cos(b*1.4+a.age*12)*A*.26})}o.ridge.visible=a.kind==="drill"&&p&&u<1,o.ridge.visible&&(o.ridge.position.set(l.x,.025,l.z),o.ridge.scale.set(1,Math.max(.02,Math.sin(Math.PI*Math.pow(u,.58))*1.35),1)),o.wave.visible=M&&(a.kind==="bruiser"||a.kind==="warden"),o.wave.visible&&(o.wave.position.set(a.x+x*f,.13,a.z+g*f),o.wave.scale.set(1.1+.37*f,.4+.25*f,1),o.wave.rotation.z=Math.atan2(x,g)-.59)})}}var td=128,nd=4,Se={glow:0,smoke:1,glint:2,wave:3,crack:4,plus:5,arrow:6,flash:7,goldWave:8,ember:9};function Wb(){let s=document.createElement("canvas");s.width=s.height=td*nd;let e=s.getContext("2d");function t(a,o){e.save(),e.translate((a%nd+.5)*td,(Math.floor(a/nd)+.5)*td),o(),e.restore()}function n(a,o,c,l){let h=e.createRadialGradient(a,o,0,a,o,c);for(let[f,u]of l)h.addColorStop(f,u);e.fillStyle=h,e.fillRect(a-c,o-c,c*2,c*2)}let i="rgba(255,255,255,0)";t(Se.glow,()=>{n(0,0,57,[[0,"#fff"],[.18,"rgba(255,255,255,.94)"],[.43,"rgba(255,255,255,.41)"],[1,i]])}),t(Se.smoke,()=>{let a=[[-14,8,37],[18,8,32],[9,-13,32],[-15,-13,27],[3,3,40]];for(let[o,c,l]of a)n(o,c,l,[[0,"rgba(255,255,255,.62)"],[.38,"rgba(255,255,255,.42)"],[.77,"rgba(255,255,255,.13)"],[1,i]])}),t(Se.glint,()=>{n(0,0,44,[[0,"#fff"],[.16,"rgba(255,255,255,.9)"],[1,i]]),e.fillStyle="#fff",e.beginPath();for(let a=0;a<8;a++){let o=a*Math.PI/4,c=a%2?5:a%4?45:32,l=Math.cos(o)*c,h=Math.sin(o)*c;a===0?e.moveTo(l,h):e.lineTo(l,h)}e.closePath(),e.fill()}),t(Se.wave,()=>{n(0,0,60,[[0,i],[.7,i],[.78,"rgba(255,255,255,.26)"],[.86,"rgba(255,255,255,.94)"],[.9,"rgba(255,255,255,.60)"],[1,i]])}),t(Se.goldWave,()=>{n(0,0,58,[[0,"rgba(255,255,255,.25)"],[.41,"rgba(255,255,255,.08)"],[.66,i],[.81,"rgba(255,255,255,.18)"],[.88,"#fff"],[.92,"rgba(255,255,255,.65)"],[1,i]])}),t(Se.crack,()=>{n(0,0,40,[[0,"#c14d0d"],[.19,"rgba(158,63,22,.9)"],[.62,"rgba(80,52,51,.24)"],[1,"rgba(80,52,51,0)"]]);let a=783,o=()=>(a=a*16807%2147483647,a/2147483647);e.lineCap="round",e.lineJoin="round";for(let c=0;c<11;c++){let l=(c+o()*.55)*2*Math.PI/11,h=31+o()*29,f=0,u=0;for(let d=1;d<=4;d++){let p=l+(o()-.5)*.23,x=h*d/4,g=Math.cos(p)*x,m=Math.sin(p)*x;if(e.beginPath(),e.moveTo(f,u),e.lineTo(g,m),e.lineWidth=(5-d)*.62+.35,e.strokeStyle=d===1?"#793714":"#493e41",e.stroke(),d===2||d===3){let v=p+(o()>.5?.65:-.66);e.beginPath(),e.moveTo(g,m),e.lineTo(g+Math.cos(v)*9,m+Math.sin(v)*9),e.lineWidth=1,e.stroke()}f=g,u=m}}e.beginPath();for(let c=0;c<15;c++){let l=c*Math.PI*2/15,h=5+o()*10,f=Math.cos(l)*h,u=Math.sin(l)*h;c?e.lineTo(f,u):e.moveTo(f,u)}e.closePath(),e.fillStyle="#ff9021",e.fill()}),t(Se.plus,()=>{e.font="1000 80px Arial Black, Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.strokeStyle="#754508",e.lineWidth=9,e.strokeText("+1",0,6,110),e.strokeStyle="#422916",e.lineWidth=6.5,e.strokeText("+1",0,2,110);let a=e.createLinearGradient(0,-28,0,32);a.addColorStop(0,"#fff592"),a.addColorStop(.31,"#fff020"),a.addColorStop(1,"#ffbe00"),e.fillStyle=a,e.fillText("+1",0,2,110)}),t(Se.arrow,()=>{e.shadowColor="#00baff",e.shadowBlur=9,e.beginPath(),e.moveTo(0,-47),e.lineTo(35,-7),e.lineTo(16,-7),e.lineTo(16,40),e.lineTo(-16,40),e.lineTo(-16,-7),e.lineTo(-35,-7),e.closePath();let a=e.createLinearGradient(0,-45,0,40);a.addColorStop(0,"#f2ffff"),a.addColorStop(.45,"#67fff4"),a.addColorStop(1,"rgba(10,201,255,.38)"),e.fillStyle=a,e.fill(),e.shadowBlur=0,e.lineWidth=2,e.strokeStyle="rgba(227,255,255,.82)",e.stroke()}),t(Se.flash,()=>{n(0,0,58,[[0,"#fff"],[.21,"#fff"],[.36,"rgba(255,255,255,.85)"],[.71,"rgba(255,255,255,.18)"],[1,i]]);for(let a=0;a<9;a++){let o=a*Math.PI*2/9+.2,c=a%3===1?48:31;e.save(),e.rotate(o),e.beginPath(),e.moveTo(8,-4.2),e.lineTo(c,0),e.lineTo(8,4.2),e.closePath(),e.fillStyle="rgba(255,255,255,.76)",e.fill(),e.restore()}}),t(Se.ember,()=>{e.save(),e.scale(.45,1),n(0,0,53,[[0,"#fff"],[.37,"#fff"],[.65,"rgba(255,255,255,.58)"],[1,i]]),e.restore()});let r=new zn(s);return r.colorSpace=vt,r}function Xb(s,e){let t=new Ft(1,1),n=new Ss;n.setIndex(t.index),n.setAttribute("position",t.getAttribute("position")),n.setAttribute("uv",t.getAttribute("uv"));let i={};for(let[c,l]of[["anchor",3],["sizeModeTile",4],["tint",4],["rotation",1]]){let h=new Jt(new Float32Array(e*l),l);h.setUsage(cn),n.setAttribute(c,h),i[c]=h}let r=new Ot({uniforms:{atlas:{value:Wb()}},transparent:!0,depthWrite:!1,side:Ht,toneMapped:!1,vertexShader:`
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
      }`});r.forceSinglePass=!0;let a=new Ke(n,r);a.frustumCulled=!1,a.renderOrder=8,n.instanceCount=0,s.add(a);let o=0;return{clear(){o=0},write(c,l,h,f,u,d,p,x,g,m=0){o>=e||g<.008||(i.anchor.setXYZ(o,c,l,h),i.sizeModeTile.setXYZW(o,f,u,d?1:0,p),i.tint.setXYZW(o,x.r,x.g,x.b,g),i.rotation.setX(o,m),o++)},flush(){a.visible=o>0,n.instanceCount=o;for(let c of Object.values(i))c.clearUpdateRanges(),o&&c.addUpdateRange(0,o*c.itemSize),c.needsUpdate=!0}}}function id(s,e){let t=s.map(([a,o])=>new ce(o,a)),n=new lo(t,e),i=new Float32Array(n.attributes.position.count*3),r=s.map(([,,a])=>new we(a));for(let a=0;a<n.attributes.position.count;a++)r[a%r.length].toArray(i,a*3);return n.setAttribute("color",new kt(i,3)),n.rotateX(-Math.PI/2),n}function rh(s,e,t,n,i){let r=new Yt(e,t,n);return r.instanceMatrix.setUsage(cn),r.count=0,r.frustumCulled=!1,r.renderOrder=i,s.add(r),r}var Ie=Object.fromEntries(Object.entries({white:"#ffffff",pearl:"#fff5dc",aqua:"#64ffff",blue:"#18ccff",gold:"#ffd02f",orange:"#ff861d",fire:"#ff5a16",violet:"#c181ff",frost:"#a0edff",surf:"#68f4d5",dust:"#ece0cd",smoke:"#928180",steel:"#8f99a3"}).map(([s,e])=>[s,new we(e)])),qb=["#555c69","#8e97a3","#abb4bc","#727986","#a5a7aa"].map(s=>new we(s)),bt=(s,e)=>s+(e-s)*Math.random(),Oo=(s,e,t)=>Math.min(t,Math.max(e,s)),Pi=Math.PI*2;function Yb(s,e){let t=new Ft(1,1,5,1),n=new Ss().copy(t),i=new Jt(new Float32Array(e*3),3),r=new Jt(new Float32Array(e*3),3),a=new Jt(new Float32Array(e*4),4);for(let[l,h]of[["trailStart",i],["trailEnd",r],["trailStyle",a]])n.setAttribute(l,h.setUsage(cn));let o=new Ot({transparent:!0,depthWrite:!1,toneMapped:!1,side:Ht,vertexShader:`
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
      }`});o.forceSinglePass=!0;let c=new Ke(n,o);return c.frustumCulled=!1,c.renderOrder=4,n.instanceCount=0,s.add(c),{write(l,h,f,u,d,p,x){i.setXYZ(l,h.x,h.y,h.z),r.setXYZ(l,f.x,f.y,f.z),a.setXYZW(l,u,d,p,x)},flush(l){if(n.instanceCount=l,c.visible=l>0,!!l)for(let h of[i,r,a])h.clearUpdateRanges(),h.addUpdateRange(0,l*h.itemSize),h.needsUpdate=!0}}}function $m(s){let e=Xb(s,650),t=rh(s,id([[-.33,.004,"#1395ec"],[-.14,.026,"#28d7ff"],[.1,.039,"#b4fbff"],[.24,.025,"#e8ffff"],[.3,.002,"#ebffff"]],7),new yt({vertexColors:!0,toneMapped:!1}),320,3),n=rh(s,id([[-.38,.003,"#b9430d"],[-.37,.127,"#dd7117"],[-.31,.18,"#ff9c1a"],[-.25,.19,"#ffc32d"],[-.21,.158,"#ef8d18"],[-.15,.166,"#ffb824"],[.23,.175,"#ffce36"],[.37,.16,"#ffcb2c"],[.48,.117,"#ffdb46"],[.54,.059,"#ffdc56"],[.56,.001,"#fff1a3"]],14),new Bt({vertexColors:!0,emissive:3609856,specular:16772528,shininess:62}),24,3),i=rh(s,id([[-1.52,.003,"#ef5615"],[-1.18,.07,"#fc641b"],[-.77,.114,"#ff9f13"],[-.49,.149,"#ffe039"],[-.31,.112,"#fff8af"]],10),new yt({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1}),24,6),r=rh(s,new ja(1,0),new Bt({color:16777215,specular:5660779,shininess:18}),88,2),a=new Rt,o=[],c=[],l=[],h=[],f=5;function u(V,P,Y,L,J,I,te,W={}){if(o.length>=260){if(!W.priority&&V!==Se.plus&&V!==Se.arrow&&V!==Se.crack)return;let ee=o.findIndex(re=>re.tile===Se.smoke||re.tile===Se.glint||re.tile===Se.glow);if(ee<0)return;l.push(o[ee]),o[ee]=o[o.length-1],o.pop()}let F=l.pop()||{};F.tile=V,F.x=P,F.y=Y,F.z=L,F.start=J,F.end=I,F.life=te,F.age=0,F.color=W.color||Ie.white,F.alpha=W.alpha??1,F.ratio=W.ratio??1,F.vx=W.vx||0,F.vy=W.vy||0,F.vz=W.vz||0,F.gravity=W.gravity||0,F.angle=W.angle||0,F.spin=W.spin||0,F.flat=W.flat||!1,F.world=W.world??!0,F.hold=W.hold??.12,o.push(F)}function d(V,P,Y,L,J,I){for(let te=0;te<J;te++){let W=(te+Math.random()*.5)*Pi/J,F=bt(.12,.42)*L,ee=bt(.75,2.15)*L;u(Se.smoke,V+Math.cos(W)*F,P+bt(.02,.14),Y+Math.sin(W)*F,bt(.23,.47)*L,bt(.71,1.12)*L,bt(.36,.6),{color:I,alpha:bt(.4,.63),vx:Math.cos(W)*ee,vz:Math.sin(W)*ee,vy:bt(.35,1.05),spin:bt(-1.5,1.5),angle:W})}}function p(V,P,Y,L,J){for(let I=0;I<J;I++){let te=(I+Math.random())*Pi/J,W=bt(1.8,4.3)*L;u(Se.ember,V,P,Y,bt(.22,.39)*L,.035,bt(.21,.42),{color:I%3?Ie.orange:Ie.pearl,vx:Math.cos(te)*W,vz:Math.sin(te)*W,vy:bt(.8,2.5)*L,gravity:5,angle:te,spin:bt(-2,2),ratio:1.7})}}let x=["#65d8cd","#dafff3","#4cb9b2"].map(V=>new we(V)),g=["#e4b879","#925c3b","#c28b57"].map(V=>new we(V));function m(V,P,Y,L,J,I=!1,te=qb){for(let W=0;W<L&&c.length<r.instanceMatrix.count;W++){let F=h.pop()||{};if(F.x=V+bt(-1.75,1.75)*J,F.y=P+bt(.14,.9),F.z=Y+bt(-.24,.3),F.vx=bt(-2.8,2.8),F.vz=bt(-1.8,3.5),F.vy=bt(2.2,5.2),I){let ee=(W+Math.random())*Pi/L,re=bt(2.2,4.4);F.x=V+Math.cos(ee)*.48,F.z=Y+Math.sin(ee)*.48,F.vx=Math.cos(ee)*re,F.vz=Math.sin(ee)*re}F.size=bt(.085,.245)*J,F.stretch=bt(.52,1.65),F.rx=bt(-2,2),F.ry=bt(-2,2),F.spin=bt(2,8),F.age=0,F.life=bt(.52,1.04),F.color=te[W%te.length],c.push(F)}}let v=new Ki(1,2),M=new Ot({uniforms:{age:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec3 orb; varying vec3 eye; varying vec3 n; void main(){
      orb=position;vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);
      eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,fragmentShader:`varying vec3 orb;varying vec3 eye;varying vec3 n;uniform float age;
      void main(){float swirl=sin(orb.y*9.+sin(orb.z*5.+age*8.))*sin(orb.x*6.-age*6.);
        float heat=clamp(max(0.,dot(normalize(n),normalize(eye)))+.13*swirl-age*.7,0.,1.);
        vec3 fire=mix(vec3(.94,.16,.026),vec3(1.,.80,.20),smoothstep(.12,.53,heat));
        fire=mix(fire,vec3(1.,.98,.77),smoothstep(.55,.86,heat));
        gl_FragColor=vec4(fire,1.-smoothstep(.52,1.,age));}`}),_=new It,E=[[0,.2,0,1.02],[-.62,.06,.08,.65],[.55,.14,-.2,.74],[-.16,.57,-.13,.64],[.33,.36,.36,.48]];for(let[V,P,Y,L]of E){let J=new Ke(v,M);J.position.set(V,P,Y),J.scale.setScalar(L),J.renderOrder=3,_.add(J)}_.visible=!1,s.add(_);let S=1;function y(V,P,Y,L,J=1,I=null){let te=xn[I]?.tone==="gold"?Ie.gold:Ie.surf,W=Oo(J,.62,2.05);switch(V){case"cardHit":u(Se.glint,P,Y,L+.1,.33,.72,.12,{color:te}),p(P,Y,L,.45,3);return;case"supplyBreak":u(Se.flash,P,Y,L,.46,1.45,.13,{color:Ie.pearl}),u(Se.wave,P,.07,L,.42,2.9,.36,{flat:!0,color:te});for(let F of[-1,1])u(Se.glint,P+F*1.44,Y,L,.48,.1,.33,{color:te,vx:-F*3.6,vy:1.1,ratio:1.6});p(P,Y,L,.73,6);return;case"shieldHit":u(Se.wave,P,.1,L,.4,1.75,.26,{flat:!0,color:Ie.aqua}),u(Se.glint,P,Y,L,.26,.68,.14,{color:Ie.pearl});return;case"hostileMuzzle":u(Se.flash,P,Y,L,.32,.63,.14,{color:Ie.orange});return;case"bruiserCast":case"wardenCast":for(let F of[-1,1])d(P+F*.6,.16,L,1,4,Ie.dust);return;case"diverCast":for(let F of[-1,1])u(Se.wave,P+F*.95,Y,L,.32,1.45,.32,{color:Ie.surf});return;case"drillCast":d(P,.2,L,1.21,7,Ie.violet);return;case"kestrelCast":u(Se.glow,P,Y,L+.43,.32,1.37,.36,{color:Ie.frost});return;case"engineCast":for(let F of[-1,1])u(Se.flash,P+F*.72,Y+.32,L-.2,.4,1.12,.17,{color:Ie.orange});return;case"bruiserStrike":case"wardenStrike":u(Se.crack,P,.043,L,1.4,2.55,.77,{flat:!0,hold:.31}),d(P,.16,L,1.18,8,Ie.dust),m(P,.12,L,7,.55,!0);return;case"diverStrike":u(Se.wave,P,.09,L,.31,2.29,.46,{flat:!0,color:Ie.surf});for(let F=0;F<9;F++){let ee=F*Pi/9;u(Se.glow,P,.22,L,.18,.06,.43,{color:Ie.aqua,vx:Math.cos(ee)*2.1,vz:Math.sin(ee)*2.1,vy:1.5,gravity:3.6})}return;case"drillStrike":d(P,.17,L,.77,5,Ie.violet),u(Se.glint,P,.35,L,.26,1,.19,{color:Ie.violet});return;case"kestrelStrike":u(Se.wave,P,.08,L,.35,2.78,.54,{flat:!0,color:Ie.frost}),d(P,.28,L,.98,7,Ie.frost);return;case"engineStrike":u(Se.flash,P,.45,L,.82,2.2,.19,{color:Ie.orange,priority:!0}),u(Se.wave,P,.07,L,.34,2.63,.37,{flat:!0,color:Ie.gold}),d(P,.2,L,1.1,8,Ie.smoke),p(P,.3,L,1.08,12);return;case"finisher":p(P,Y,L,1.35,16),u(Se.flash,P,Y,L,.65,1.45,.13,{color:Ie.pearl});return;case"hit":if(f<1)return;f--,p(P,Y,L,.48,3),u(Se.glint,P,Y,L,.26,.47,.105,{color:Ie.aqua,angle:bt(0,Pi)});return;case"muzzle":u(Se.flash,P,Y,L,.47*W,.83*W,.105,{color:Ie.pearl,angle:bt(0,Pi),world:!1}),u(Se.glow,P,Y,L,.82*W,.38*W,.13,{color:Ie.orange,alpha:.7,world:!1});return;case"impact":case"slam":{let F=V==="slam",ee=W*(F?1.4:1),re=F?.16:Math.max(.17,Y*.58);if(F){m(P,.04,L,12,.61,!0);for(let Ne of[-1,1])u(Se.flash,P+Ne*.57,.12,L,.58,.93,.1,{color:Ie.pearl})}u(Se.crack,P,.035,L,2.02*ee,2.33*ee,F?2:1.42,{flat:!0,angle:bt(0,Pi),hold:.62}),u(Se.wave,P,.065,L,.42*ee,F?2*2.15/.81:3.16*ee,.32,{flat:!0,color:F?Ie.gold:Ie.pearl,alpha:.83}),u(Se.flash,P,re,L,.6*ee,1.85*ee,.16,{color:Ie.gold,angle:bt(0,Pi)}),u(Se.glow,P,re+.06,L,.39*ee,.93*ee,.1,{color:Ie.pearl}),d(P,.17,L,ee,F?12:7,F?Ie.dust:Ie.smoke),p(P,re,L,ee,F?10:5);return}case"wallHit":u(Se.flash,P,Math.max(Y,.4),L+.12,.38*W,1.12*W,.13,{color:Ie.pearl}),d(P,Math.max(.35,Y),L,.61*W,3,Ie.steel),p(P,Math.max(.4,Y),L,.59*W,3);return;case"wallBreak":m(P,.24,L,22,Math.min(1.17,W)),u(Se.flash,P,.72,L,.85*W,2.8*W,.19,{color:Ie.pearl}),u(Se.wave,P,.062,L,.6,4.7,.38,{flat:!0,color:Ie.dust});for(let F=-1;F<=1;F++)d(P+F*1.17,.3,L,.98,4,Ie.steel);p(P,.8,L,W,7);return;case"plus":{u(Se.wave,P,.09,L,.12,1.28,.23,{flat:!0,color:Ie.aqua});let F=Math.max(0,Y);u(Se.goldWave,P,.055,L,.22,.96,.34,{flat:!0,world:!1,color:Ie.gold}),u(Se.glow,P,F+.36,L,.45,.82,.28,{ratio:1.75,world:!1,color:Ie.gold}),u(Se.glint,P+.08,F+.57,L,.35,.14,.23,{world:!1,color:Ie.pearl}),u(Se.plus,P+bt(-.13,.13),F+.83,L,.8,1.04,.65,{world:!1,vy:1.1,hold:.62});return}case"merge":{if(I==="range"||I==="longshot"){for(let ee=0;ee<3;ee++)u(Se.arrow,P,.12,L-.8-ee*.68,.72-ee*.09,.22,.48+ee*.04,{flat:!0,color:te,vz:-3.3,world:!1});u(Se.wave,P,.07,L,.32,2.45,.35,{flat:!0,color:te});return}u(Se.goldWave,P,.12,L,2.15,.32,.27,{flat:!0,color:Ie.gold});let F=Oo(W*1.55,1.5,2.5);u(Se.goldWave,P,.061,L,.38,F,.46,{flat:!0,world:!1,color:Ie.aqua,hold:.3}),u(Se.goldWave,P,.077,L,.17,F*.72,.38,{flat:!0,world:!1,color:Ie.gold}),u(Se.glow,P,Y+.62,L,.77*W,1.6*W,.32,{color:Ie.gold,world:!1,ratio:1.3,alpha:.72});for(let ee=0;ee<3;ee++){let re=(ee+.16)*Pi/3;u(Se.arrow,P+Math.cos(re)*F*.31,Y+.3,L+Math.sin(re)*F*.34,.38,.65,.51+ee*.035,{color:Ie.white,hold:.42,vy:1.55+.15*ee,world:!1})}return}case"victory":case"vaultLand":u(Se.wave,P,.06,L,.55,V==="victory"?3.9:2.7,.33,{flat:!0,color:Ie.dust,alpha:.7});for(let F of[-1,1])d(P+F*.63,.12,L,.88,4,Ie.dust);return;case"bossBurst":S=0,_.position.set(P,.8,L),_.visible=!0,u(Se.goldWave,P,.08,L,.6,5.55,.48,{flat:!0,color:Ie.gold,priority:!0});for(let[F,ee,re]of[[0,0,2.85],[-.58,.23,1.65],[.67,-.2,1.9]])u(Se.glow,P+F,Y+.19,L+ee,re*.54,re*1.13,.34,{color:Ie.orange,vy:.83,priority:!0}),u(Se.flash,P+F,Y+.22,L+ee,re*.31,re,.22,{color:Ie.gold,angle:F*2.4,vy:.9,priority:!0});u(Se.glint,P,Y+.35,L,.8,2.65,.13,{color:Ie.pearl,priority:!0}),m(P,.42,L,17,.91,!0),p(P,Y+.38,L,1.57,24),d(P,.35,L,1.5,10,Ie.smoke);return;case"glassBreak":m(P,Y,L,18,.92,!1,x),u(Se.wave,P,.06,L,.5,4.85,.31,{flat:!0,color:Ie.aqua});for(let F of[-1.09,0,1.09])u(Se.glint,P+F,Y+.25,L,.19,.74,.2,{color:Ie.pearl});return;case"crateBreak":m(P,Y,L,16,1.04,!1,g),d(P,.32,L,.7,5,Ie.smoke);return;case"latchHit":p(P,Y,L,1.06,8);return;case"rally":u(Se.wave,P,.08,L,.46,3.05,.49,{flat:!0,color:Ie.aqua});return;case"chainSnap":for(let F of[-1,1])p(P+F*1.86,1.04,L,1.15,9);u(Se.flash,P,Y,L,.38,1.4,.15,{color:Ie.pearl});return;case"discharge":u(Se.wave,P,.1,L,.45,8.5,.35,{flat:!0,color:Ie.aqua}),u(Se.flash,P,Y+.45,L,.63,3.4,.23,{color:Ie.aqua});for(let F=0;F<7;F++){let ee=F*Pi/7;u(Se.glint,P+Math.cos(ee)*1.46,.5,L+Math.sin(ee)*1.46,.25,1.03,.26,{color:Ie.pearl,angle:ee})}return}}let b=new N(0,0,-1),A=new N,R=new N,D=new N,k=Yb(s,384);function X(V,P){let Y=0,L=0,J=0;for(let I of V){let te=I.kind==="rocket",W=I.profile===Us,F=I.profile===Go||W,ee=Math.max(0,I.distance-I.profile.tail+I.afterHit*I.profile.speed);if(dr(I,ee,R),I.distance-ee>.012&&J<384){dr(I,(ee+I.distance)*.5,D);let re=D.y-(R.y+I.y)*.5,Ne=I.range>4?Oo((I.range-ee)/1.6,0,1):1;k.write(J++,R,I,re,te?.093:W?.092:F?.066:.052,te?2:F?1:0,Ne*.91)}if(!I.finished){if(dr(I,I.distance+.015,D),A.set(D.x-I.x,D.y-I.y,D.z-I.z).normalize(),a.quaternion.setFromUnitVectors(b,A),a.position.set(I.x,I.y,I.z),!te&&Y<t.instanceMatrix.count)a.scale.set(F?1.54:1.13,F?1.54:1.13,F?.62:.83),a.updateMatrix(),t.setMatrixAt(Y++,a.matrix),I.age<.045&&e.write(I.startX,I.startY,I.startZ,.21,.21,!1,Se.flash,Ie.aqua,.65*(1-I.age/.045));else if(te&&L<n.instanceMatrix.count){let re=.63+Math.min(.19,I.power*.055);a.scale.setScalar(re),a.updateMatrix(),n.setMatrixAt(L,a.matrix),a.scale.z*=.9,a.updateMatrix(),i.setMatrixAt(L++,a.matrix),P>0&&Math.floor(I.age*16)!==Math.floor(Math.max(0,I.age-P)*16)&&u(Se.smoke,R.x,R.y,R.z,.14*re,.39*re,.19,{color:Ie.dust,alpha:.38,vy:.19,world:!1})}}}k.flush(J),t.count=Y,n.count=i.count=L,t.visible=Y>0,n.visible=i.visible=L>0,Y&&(t.instanceMatrix.needsUpdate=!0),L&&(n.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0)}function U(V,P,Y,L=[]){if(_.visible){S+=V;let te=Math.min(1,S/.44);_.position.z+=P,_.position.y+=.74*V,_.scale.setScalar(.28+.94*Math.sin(Math.PI*Math.sqrt(te))),M.uniforms.age.value=te,te>=1&&(_.visible=!1)}let J=Oo(V,0,.12);f=Math.min(6,f+J*21),e.clear(),X(Y,J);for(let te of L)e.write(te.x-te.vx*.038,te.y,te.z-te.vz*.038,.3,.52,!1,Se.glow,Ie.fire,.8),e.write(te.x,te.y,te.z,.3,.34,!1,Se.glint,Ie.gold,.98);for(let te=o.length-1;te>=0;te--){let W=o[te];if(W.age+=J,W.age>=W.life){l.push(W),o[te]=o[o.length-1],o.pop();continue}W.x+=W.vx*J,W.y+=W.vy*J,W.z+=W.vz*J+(W.world?P:0),W.vy-=W.gravity*J,W.angle+=W.spin*J}for(let te=0;te<2;te++)for(let W of o){if((W.tile===Se.plus||W.tile===Se.arrow)!==(te===1))continue;let ee=W.age/W.life,re=1-(1-ee)*(1-ee),Ne=Be.lerp(W.start,W.end,re),ye=1-Oo((ee-W.hold)/(1-W.hold),0,1);e.write(W.x,W.y,W.z,Ne,Ne*W.ratio,W.flat,W.tile,W.color,W.alpha*ye,W.angle)}e.flush();let I=0;for(let te=c.length-1;te>=0;te--){let W=c[te];if(W.age+=J,W.age>=W.life){h.push(W),c[te]=c[c.length-1],c.pop();continue}W.x+=W.vx*J,W.z+=W.vz*J+P,W.y+=W.vy*J,W.vy-=11*J,W.y<W.size*.4&&(W.y=W.size*.4,W.vy=Math.abs(W.vy)*.22,W.vx*=.78,W.vz*=.78);let F=Math.min(1,(W.life-W.age)*5);a.position.set(W.x,W.y,W.z),a.rotation.set(W.rx+W.age*W.spin,W.ry-W.age*W.spin*.56,W.age*W.spin*.77),a.scale.set(W.size*W.stretch*F,W.size*.74*F,W.size*F),a.updateMatrix(),r.setMatrixAt(I,a.matrix),r.setColorAt(I++,W.color)}r.count=I,r.visible=I>0,I&&(r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0)}function G(){_.visible=!1,l.push(...o),h.push(...c),o.length=c.length=0,f=5,k.flush(0);for(let V of[t,n,i,r])V.count=0,V.visible=!1;e.clear(),e.flush()}return G(),{update:U,burst:y,reset:G}}var jm={ally:{width:.467,height:.86,pivot:.49,pad:.008,capacity:180,grid:[6,8]},captain:{width:1.13,height:1.73,pivot:.43,pad:.009,capacity:1,grid:[13,16]},grunt:{width:.522,height:.86,pivot:.5,pad:.011,capacity:1800,grid:[6,8]}},ah=Be.clamp,da=Be.smoothstep,Zb=`
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
    float depthSwing = (boots*${oa/.86}-arms*.16)*swing*dimensions.y;
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
`,Kb=`
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
`;function Jb(s,e,t,n,i){let r=jm[e],a=new Float32Array(3),o=new Ft(1,1,...r.grid),c=new Ss().copy(o),l={};for(let[d,p]of[["anchor",3],["dimensions",2],["motion",4],["feet",3],["fallAngle",1],["treatment",4]]){let x=new Jt(new Float32Array(r.capacity*p),p);x.setUsage(cn),l[d]=x,c.setAttribute(d,x)}c.instanceCount=0,t.colorSpace=vt,t.magFilter=jt,t.minFilter=Hn,t.generateMipmaps=!0;let h=new Ot({uniforms:{portrait:{value:t},cameraRight:{value:n},cameraLift:{value:i},pivot:{value:r.pivot},padding:{value:r.pad}},defines:e==="captain"?{CAPTAIN:1}:e==="ally"?{ALLY:1}:{},vertexShader:Zb,fragmentShader:Kb,depthWrite:!0,transparent:!1,toneMapped:!1,alphaToCoverage:!0}),f=new Ke(c,h);f.name=`AI ${e}`,f.visible=!1,f.frustumCulled=!1,s.add(f);let u=0;return{begin(){u=0},clear(){u=0,c.instanceCount=0,f.visible=!1},add(d,p,x,g,m,v,M,_=0,E=0,S=0,y=0,b=0,A=0,R=0){u>=r.capacity||g<=.001||m<=.001||(l.fallAngle.setX(u,R),l.anchor.setXYZ(u,d,p,x),l.dimensions.setXY(u,r.width*g,r.height*m),l.motion.setXYZW(u,v,M,_,E),ws(v,M,a),l.feet.setXYZ(u,a[0],a[1],a[2]),l.treatment.setXYZW(u,S,y,b,A),u++)},flush(){if(c.instanceCount=u,f.visible=u>0,!!u)for(let d of Object.values(l))d.clearUpdateRanges(),d.addUpdateRange(0,u*d.itemSize),d.needsUpdate=!0}}}async function Qm(s){let e=new ts,t=Object.keys(jm),n=await Promise.allSettled(t.map(u=>e.loadAsync(`./art/${u}-field.webp`))),i=n.find(u=>u.status==="rejected");if(i){for(let u of n)u.status==="fulfilled"&&u.value.dispose();throw new Error("\u89D2\u8272\u63D2\u753B\u52A0\u8F7D\u5931\u8D25",{cause:i.reason})}let r=new N,a=new N,o=new N,c=Object.fromEntries(t.map((u,d)=>[u,Jb(s,u,n[d].value,r,a)])),l=Object.values(c),h=()=>l.forEach(u=>u.clear());function f(u,d,p,x){if(x!=="ai"&&x!=="hybrid"){h();return}for(let M of l)M.begin();d.updateWorldMatrix(!0,!1),r.setFromMatrixColumn(d.matrixWorld,0),r.y=0,r.normalize(),o.setFromMatrixColumn(d.matrixWorld,1),a.set(0,1,0).lerp(o,.42).normalize();let g=x==="ai",m=u.phase==="ready"?.3:u.playing||u.overrun||u.parade?1:0,v=p*10.8+(u.parade?u.endTime*5.6:0);for(let M of u.columns)for(let _ of M.units)_.alive&&c.grunt.add(_.x,_.lift||0,_.z,_.size,_.size,la(_),m);for(let M of u.runners)M.alive&&c.grunt.add(M.x,M.lift||0,M.z,M.size,M.size,la(M),m);for(let M of u.allies){let _=ah(M.age/.32,0,1),E=.81+.19*_+.095*Math.sin(_*Math.PI);c.ally.add(M.x,.035*Math.sin(_*Math.PI),M.z,E,E,v+M.phase,m,0,0,.8*(1-_),.22*(1-_))}for(let M of u.deliveries){if(M.slot==null||M.age<0)continue;let _=.65+.35*M.progress;c.ally.add(M.x,M.y,M.z,_,_,v+M.phase,.55,0,0,.42,.24)}{for(let M of u.falling){if(M.prone){let b=da(M.t,0,.42),A=M.size*(u.overrun?1:1-da(M.t,1.78,2.1));c.ally.add(M.x,.09*b,M.z,A,A,0,0,.1*b*M.dir,0,0,0,.3*b,0,1.5*b);continue}let _=ah(M.t/1.02,0,1),E=M.size*(1-da(_,.78,1)),S=M.roll*M.t+.16*Math.sin(M.spin*M.t);(M.side==="red"?c.grunt:c.ally).add(M.x,M.y,M.z,E,E,v+M.phase,0,S,0,0,.64*(1-da(_,.04,.31)),.72*da(_,.05,.31))}if(g&&(u.phase!=="lost"||u.overrun||u.endTime<.25)){let M=u.visualScale,_=u.overrun?da(u.endTime,0,.5):0,E=u.phase==="lost"&&!u.overrun?ah(u.endTime/.25,0,1):0;c.captain.add(u.x,u.rope?.68*Math.sin(Math.PI*u.rope.age/.58):.1*_,u.captainZ,M,M*(1-.55*E),v*.83,u.overrun?0:m,-.38*E-.12*_,u.recoil,.66*u.mergeGlow,.14*u.mergeGlow+.48*u.hurt+.32*E,0,ah(u.velocity*.007,-.095,.095),1.5*_)}}for(let M of l)M.flush()}return{draw:f,clear:h,captainTexture:n[t.indexOf("captain")].value,gruntTexture:n[t.indexOf("grunt")].value,allyTexture:n[t.indexOf("ally")].value}}var sn=new Rt;function eg(s,e,t){let n=new Float32Array(3),i=xm(e,"near"),r=new Jt(new Float32Array(t*4),4).setUsage(cn);i.setAttribute("stepPose",r);let a=new Bt({vertexColors:!0,shininess:37,specular:3225412});a.customProgramCacheKey=()=>"infantry-walk-"+e,a.onBeforeCompile=h=>{h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
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
        vec2 sole = position.yz + vec2(.118*lift,facing*${oa}*stride);
        transformed.yz = mix(transformed.yz,sole,boot);
        transformed.y += .022*abs(stepPose.w)*(1.0-boot);
        transformed.x += stepPose.y*.018*position.y + sign(limb)*arm*.009*stride;`),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
varying float vGlow;`).replace("#include <color_fragment>",`#include <color_fragment>
      if (vGlow <= -1.0) {
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.34)*.74;
        diffuseColor.rgb = mix(faded,vec3(1.,.85,.64),clamp(-vGlow-1.,0.,1.)*.64);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.72,.18), clamp(vGlow,0.0,1.0)*.94);`)};let o=new Yt(i,a,t),c;o.count=0,o.frustumCulled=!1,o.instanceMatrix.setUsage(cn),s.add(o);let l=0;return{paint(h,f){c=uf(e,h,f,r,t),c.instanceMatrix=o.instanceMatrix,s.add(c)},begin(){l=0},put(h,f,u,d,p=0,x=0,g=0,m=0,v=0,M=0){l>=t||(sn.position.set(h,f,u),sn.rotation.set(x,g,m),sn.scale.setScalar(d),sn.updateMatrix(),o.setMatrixAt(l,sn.matrix),ws(v,M,n),r.setXYZW(l,p,n[0],n[1],n[2]),l++)},end(){o.count=l,o.visible=l>0&&!c,c&&(c.count=l,c.visible=l>0),o.instanceMatrix.needsUpdate=!0,r.needsUpdate=!0}}}function $b(s){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(30,33,1,32,32,31);n.addColorStop(0,"rgba(22,23,45,.63)"),n.addColorStop(.5,"rgba(24,27,49,.47)"),n.addColorStop(.83,"rgba(32,32,53,.20)"),n.addColorStop(1,"rgba(32,32,53,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let i=new zn(e);i.colorSpace=vt;let r=new Ft(1,1);r.rotateX(-Math.PI/2);let a=new Yt(r,new yt({map:i,transparent:!0,depthWrite:!1,toneMapped:!1}),1600);a.frustumCulled=!1,a.instanceMatrix.setUsage(cn),a.renderOrder=1,s.add(a);let o=0;return{begin(){o=0},put(c,l,h,f=1){o>=1600||(sn.position.set(c+h*.3,.021,l-h*.2),sn.rotation.set(0,.65,0),sn.scale.set(h*1.4,.95,h*.79*f),sn.updateMatrix(),a.setMatrixAt(o++,sn.matrix))},end(){a.count=o,a.instanceMatrix.needsUpdate=!0}}}function oh(s,e,t,n,i){let r=new ys(e,s,64);r.rotateX(-Math.PI/2);let a=new Ke(r,new yt({color:t,transparent:!0,opacity:n,depthWrite:!1,toneMapped:!1}));return a.renderOrder=3,i.add(a),a}function tg(s,e){let t=new qc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});t.setClearColor(599616,0),t.outputColorSpace=vt;let n=new ka,i=Bm(t,n);n.add(new fo(16054527,8753847,1.55));let r=new bs(16772828,2);r.position.set(-8,16,6),n.add(r);let a=new bs(12839167,.63);a.position.set(7,8,-8),n.add(a);let o=new an(41,1,.15,150),c=new N,l=_m();n.add(l.root);let h=oh(2.15,2.15-.055,16748086,.82,n),f=oh(2.15,2.15-.115,16761949,.38,n),u,d=Dm().then(I=>{u=I,n.add(I.root)}),p=eg(n,"blue",180),x=eg(n,"red",1800),g=$b(n),m=oh(.68,.634,6618933,.94,n),v=oh(.72,.606,6749239,.21,n),M=new Ke(new fi(1,28,12,0,Math.PI*2,0,Math.PI/2),new Ot({transparent:!0,depthWrite:!1,vertexShader:"varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}",fragmentShader:"varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),2.1);gl_FragColor=vec4(.27,.86,1.,.024+.41*rim);}"}));n.add(M);let _=new Yt(new Js(.18),new Bt({color:7133695,emissive:1530771}),20);_.frustumCulled=!1,n.add(_);let E={},S=new Bt({vertexColors:!0});for(let I of["gunner","guard","bomber","standard","vault","courier"]){let te=new Yt(vm(I),S,32);te.frustumCulled=!1,n.add(te),E[I]=te}let y=Jm(n),b=Vm(n),A=Zm(n,i.curve),R=$m(n),D=null,k=Qm(n).then(I=>(D=I,l.paint(I.captainTexture,I.gruntTexture),p.paint(I.allyTexture,I.gruntTexture),x.paint(I.gruntTexture,I.allyTexture),!0)).catch(I=>(console.warn("\u89D2\u8272\u8D34\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u5DF2\u4F7F\u7528 3D \u6A21\u578B",I),!1)),X=Promise.all([d,k]).then(([,I])=>I),U=-3.72,G=0,V=1,P=1,Y=Math.min(devicePixelRatio||1,1.65),L=()=>{V=e.clientWidth,P=e.clientHeight,o.aspect=V/Math.max(1,P),o.fov=Be.clamp(41+(.54-o.aspect)*27,37,47),o.updateProjectionMatrix(),t.setPixelRatio(Y),t.setSize(V,P,!1)};L();function J(I,te,W,F,ee){D||(ee="3d");let re=I.playing,Ne=ee!=="ai",ye=1-Math.exp(-8.5*W);i.setRoute(I.route.theme,I.stage,I.distance);let Ce=I.boss.defeatAge,ct=I.boss.defeated?.18*Be.smoothstep(Ce,0,.42)*(1-Be.smoothstep(Ce,.82,1.65)):0,De=19.5*Math.tan(Be.degToRad(o.fov/2))*o.aspect,Je=Math.sign(I.x)*Math.max(0,Math.abs(I.x)-De*.54),$e=i.curve.x>0,se=$e?Be.clamp(Je,-1,1):Je,he=Be.lerp(se,I.boss.x+i.offset(I.boss.z),ct),le=(I.boss.z+5.4)*ct;$e&&!ct&&(U=Be.clamp(U,-1,1)),U+=(he-U)*ye,G=Math.max(0,G-W*1.75);let Ae=Math.sin(te*58)*G*G*.19,ge=Math.sin(te*72)*G*G*.12,Xe=$e?Be.clamp(19.5+(.5-o.aspect)*29,17.5,23.4):15,Le=13.2+(Xe-15)*.81,nt=$e?(U-i.offset(-22)*.45)/30:0,it=Be.degToRad(o.fov/2),mt=Math.atan2(14.88,20.65),z=13.2-15/Math.tan(mt-it),Kt=Math.atan2(Xe,Le-z)+it,st=Le-(Xe-.12)/Math.tan(Kt);o.position.set(U+Ae+nt*Le,Xe+ge-ct*1.2,Le+le),o.lookAt(U+.06+Ae+nt*st,.12,st+le),o.updateMatrixWorld(),i.setCamera(o);let St=re||I.overrun||I.parade?1:0,xe=te*10.8+(I.parade?I.endTime*5.6:0);A.update(I),g.begin(),p.begin(),x.begin();for(let H of I.columns)for(let K of H.units){if(!K.alive||K.z<I.entryZ-3)continue;ee==="3d"&&x.put(K.x,K.lift||0,K.z,K.size,0,0,K.yaw,0,la(K),St);let de=Be.smoothstep(K.z,-45,-30);de>0&&g.put(K.x,K.z,.64*de)}for(let H of Object.values(E))H.count=0;for(let H of I.runners){if(!H.alive)continue;let K=E[H.role];K&&K.count<K.instanceMatrix.count&&(sn.position.set(H.x,(H.lift||0)+.012,H.z),sn.rotation.set(0,H.yaw,0),sn.scale.setScalar(H.size),sn.updateMatrix(),K.setMatrixAt(K.count++,sn.matrix)),ee==="3d"&&x.put(H.x,H.lift||0,H.z,H.size,0,0,H.yaw,0,la(H),St),g.put(H.x,H.z,.67)}for(let H of Object.values(E))H.instanceMatrix.needsUpdate=H.count>0;for(let H of I.allies){let K=1;H.age<.25&&(K=.55+.45*Math.min(1,H.age/.15)+Math.sin(Math.PI*Math.min(1,H.age/.25))*.18),ee==="3d"&&p.put(H.x,0,H.z,K,Math.max(0,1-H.age*2.8),0,-I.velocity*.014,0,xe+H.phase,St),g.put(H.x,H.z,.71*K)}let Nt=0;function Ve(H,K,de,pe){Nt>=_.instanceMatrix.count||(sn.position.set(H,K,de),sn.rotation.set(.18,te*4,0),sn.scale.setScalar(pe),sn.updateMatrix(),_.setMatrixAt(Nt++,sn.matrix))}b.update(I.deliveries);for(let H of I.deliveries)H.age<0||H.slot==null||ee==="3d"&&p.put(H.x,H.y,H.z,.65+.35*H.progress,.42,0,0,0,xe+H.phase,.55);if(I.buffs.drone>0)for(let H of[-1,1])Ve(I.x+H*1.15,1.3+.06*Math.sin(te*6),I.captainZ-.32,1);_.count=Nt,_.instanceMatrix.needsUpdate=Nt>0,M.visible=re&&I.buffs.shield>0,M.visible&&(M.position.set(I.x,.06,I.captainZ),M.scale.set(1.52*I.scale,1.55,1.28*I.scale));for(let H of I.falling){let K=Be.smoothstep(H.t,0,.42),de=(H.size||1)*(H.prone?I.overrun?1:1-Be.smoothstep(H.t,1.78,2.1):1-Math.pow(Math.min(1,H.t/1.02),4));ee==="3d"&&(H.side==="red"?x:p).put(H.x,H.prone?.15*K:H.y,H.z,de,-2+Be.smoothstep(H.t,.018,.15),H.prone?1.48*K:H.spin*H.t,H.prone?.12*H.dir:H.phase,H.prone?.16*K*H.dir:H.roll*H.t),H.y<2&&g.put(H.x,H.z,.64*de)}let Ye=I.phase==="lost",C=I.visualScale,w=I.overrun?Be.smoothstep(I.endTime,0,.5):0,q=Ye&&!I.overrun;l.root.visible=Ne&&(!q||I.endTime<.4);let oe=I.rope?.68*Math.sin(Math.PI*I.rope.age/.58):0;l.root.position.set(I.x,I.overrun?.25*w:q?Math.sin(Math.min(1,I.endTime/.4)*Math.PI)*.64:oe,I.captainZ),l.root.rotation.set(1.45*w,Ye?0:-I.velocity*.018,q?-I.endTime*5:-.16*w),l.root.scale.setScalar(C*(q?Math.max(.05,1-I.endTime*2):1)),l.animate({time:te+(I.parade?I.endTime*.54:0),run:I.parade?1:re?.91:Ye?0:.09,recoil:I.recoil,merge:Math.max(I.mergeGlow,I.hurt*.62),lean:Be.clamp(I.velocity/9,-1,1)});let j=I.boss;u.root.visible=j.active&&!j.removed&&j.z<9;let ue=Be.smoothstep(Ce,.25,.92),ve=Ce>.92?Math.sin((Ce-.92)*19)*Math.exp(-9*(Ce-.92)):0,ie=j.lift*(1-Be.smoothstep(Ce,0,.3));u.root.position.set(j.x-.26*ue,ie+.27*ue+Math.max(0,ve)*.16,j.z-.62*ue),u.root.rotation.set(-1.49*ue+.13*ve,j.yaw*(1-ue),-.3*ue),y(j);let ne=j.skill,me=ne?Be.smoothstep(ne.age,0,ne.warm)*(1-Be.smoothstep(ne.age,ne.warm,ne.warm+.3)):0,O=ne?Math.sin(Math.PI*Be.clamp((ne.age-ne.warm)/.52,0,1)):0;u.pose({charge:me,release:O,mode:ee,time:te,walk:re&&j.active&&!j.defeated?1:0,march:j.marched,attack:j.attackT,hit:j.hit,defeat:Ce,kind:j.kind,vault:j.vault?.t||0,brace:j.brace,drive:j.special}),h.visible=f.visible=re&&!j.defeated&&j.attackT>0&&j.attackT<.91,h.visible&&(h.position.set(j.landX,.047,j.landZ),f.position.set(j.landX,.051,j.landZ),f.scale.setScalar(.3+.7*Be.smoothstep(j.attackT,0,.91))),(!Ye||I.overrun)&&g.put(I.x,I.captainZ+w*.4,1.3*C),u.root.visible&&g.put(j.x,j.z-ue,3.65-ie*.38,1.12+ue*.65);for(let H of[v,m])H.visible=!Ye&&!I.parade,H.position.set(I.x,.048,I.captainZ),H.scale.setScalar(C);g.end(),p.end(),x.end(),D&&D.draw(I,o,te,ee),R.update(W,F,I.shots,I.incoming),i.prepareScene(),t.render(n,o)}return{draw:J,assets:X,prepareBoss:I=>d.then(()=>u.prepare(I)),resize:L,entryZ(){let I=Math.atan2(14.88,20.65);return 13.2-15/Math.tan(I-Be.degToRad(o.fov/2))},project(I,te,W){return c.set(I+i.offset(W),te,W).project(o),{x:(c.x+1)*V/2,y:(1-c.y)*P/2}},feedback(I){R.burst(I.kind,I.x,I.y,I.z,I.strength,I.supply),I.kind==="slam"||I.kind==="wallBreak"||I.kind==="bossBurst"?G=.85:I.kind==="victory"||I.kind==="vaultLand"?G=Math.max(G,.5):I.kind==="impact"&&(G=Math.max(G,.25))},reset(I){U=I*.94,G=0,R.reset()},lowerResolution(){Y<=1||(Y=Math.max(1,Y-.22),L())}}}var ng=Math.PI*2,ig={muzzle:{duration:.25,gain:.33,interval:.18},smallShot:{duration:.08,gain:.076,interval:.105},impact:{duration:.31,gain:.28,interval:.12},wallHit:{duration:.16,gain:.16,interval:.13},cardHit:{duration:.1,gain:.11,interval:.13},supplyBreak:{duration:.25,gain:.21,interval:.1},shieldHit:{duration:.16,gain:.14,interval:.14},wallBreak:{duration:.43,gain:.35,interval:.4},plus:{duration:.22,gain:.18,interval:.105},longRange:{duration:.44,gain:.25,interval:.18},guardUp:{duration:.38,gain:.22,interval:.18},merge:{duration:.41,gain:.23,interval:.18},slam:{duration:.49,gain:.42,interval:.5},bruiserStrike:{duration:.31,gain:.28,interval:.22},diverStrike:{duration:.36,gain:.22,interval:.1},wardenCast:{duration:.68,gain:.26,interval:.5},drillStrike:{duration:.32,gain:.21,interval:.18},kestrelCast:{duration:.66,gain:.23,interval:.42},engineStrike:{duration:.44,gain:.3,interval:.24},bossBurst:{duration:.79,gain:.4,interval:.7},glassBreak:{duration:.39,gain:.24,interval:.17},crateBreak:{duration:.32,gain:.24,interval:.2},latchHit:{duration:.16,gain:.16,interval:.1},rally:{duration:.9,gain:.28,interval:1},chainSnap:{duration:.29,gain:.28,interval:.23},discharge:{duration:.41,gain:.26,interval:.23},vaultLand:{duration:.25,gain:.21,interval:.4},victory:{duration:.79,gain:.28,interval:.7},loss:{duration:.63,gain:.25,interval:.57},hit:{duration:.09,gain:.075,interval:.14}};function jb(s,e){let t=s.createBuffer(1,Math.ceil(ig[e].duration*24e3),24e3),n=t.getChannelData(0),i=981273;function r(h,f,u){let d=Math.floor(h*24e3),p=Math.min(n.length,d+Math.ceil(f*24e3)),x=Math.min(.005,f*.1),g=Math.min(.012,f*.16);for(let m=d;m<p;m++){let v=(m-d)/24e3,M=Math.min(1,v/x,(f-v)/g)*Math.exp(-3.35*v/f);n[m]+=u(v/f)*M}}function a(h,f,u,d,p,x=.12){let g=0;r(h,f,m=>{let v=d+(u-d)*(1-m)**3;return g+=ng*v/24e3,p*(Math.sin(g)+x*Math.sin(2*g+.15))})}function o(h,f,u,d){let p=0,x=0,g=1-Math.exp(-ng*u/24e3);r(h,f,()=>(i=Math.imul(1664525,i)+1013904223>>>0,p+=g*(i/2147483648-1-p),x+=.014*(p-x),d*(p-x*.65)))}function c(h,f,u,d){a(h,f,u*1.013,u,d,.16),a(h,f*.35,u*2.52,u*2.5,d*.11)}switch(e){case"cardHit":c(0,.09,1150,.42);break;case"supplyBreak":o(0,.068,4200,.51),c(.015,.18,906,.44),c(.07,.16,1326,.36);break;case"shieldHit":a(0,.15,740,365,.56,.18);break;case"muzzle":a(0,.2,213,61,.76,.48),o(0,.093,2400,.64),o(.023,.212,580,.57);break;case"smallShot":a(0,.054,1550,580,.33,.1),o(0,.042,3600,.56);break;case"impact":a(0,.23,115,49,.63,.52),o(.004,.25,1050,.89),o(.044,.23,370,.47);break;case"wallHit":o(0,.045,3100,.56),a(0,.124,650,440,.36),a(.008,.14,1050,750,.19);break;case"wallBreak":a(0,.23,174,57,.61,.33),o(0,.27,1970,.96);for(let[h,f]of[[.079,750],[.147,490],[.227,330]])o(h,.045,2850,.41),a(h,.13,f,f*.81,.22);break;case"plus":c(0,.107,622,.56),c(.06,.15,932,.68);break;case"longRange":c(0,.15,523,.48),c(.07,.17,784,.55),a(.14,.28,960,1175,.38);break;case"guardUp":a(0,.26,245,370,.45,.2),c(.055,.28,622,.57);break;case"merge":a(0,.24,320,752,.24),c(0,.16,523,.53),c(.075,.19,659,.59),c(.147,.24,988,.68);break;case"slam":o(0,.18,2e3,.78),a(0,.36,167,43,.96,.58),o(.035,.39,520,.84),o(.092,.13,1400,.44);break;case"bruiserStrike":o(0,.27,670,.7),a(0,.27,153,61,.74);break;case"diverStrike":o(0,.27,2300,.67),a(.01,.26,480,120,.42);break;case"wardenCast":a(0,.44,96,53,.77,.5),o(.05,.57,820,.68);break;case"drillStrike":c(0,.24,1450,.59),c(.05,.24,860,.5);break;case"kestrelCast":o(0,.56,3300,.58),a(.04,.52,830,1320,.35);break;case"engineStrike":a(0,.36,140,45,.81,.45),o(.015,.34,1350,.85);break;case"vaultLand":a(0,.2,115,49,.7),o(.01,.19,720,.61);break;case"glassBreak":o(0,.075,5100,.58);for(let[h,f]of[[0,2110],[.035,1560],[.075,2940],[.12,1020]])c(h,.19,f,.34);break;case"crateBreak":o(0,.17,1280,.8),o(.065,.14,2310,.43),a(0,.19,128,62,.39);break;case"latchHit":c(0,.14,1290,.58),o(0,.035,3e3,.3);break;case"rally":for(let[h,f]of[392,494,587,784].entries())c(h*.116,.34,f,.53);break;case"chainSnap":o(0,.048,4300,.65),c(.012,.19,1280,.45),c(.059,.18,711,.28);break;case"discharge":a(0,.29,1620,143,.66,.4),o(.05,.29,2900,.49);break;case"bossBurst":a(0,.5,182,41,1,.44),o(0,.12,4600,.85),o(.048,.54,850,.84),c(.23,.28,784,.32),c(.37,.39,1047,.33);break;case"victory":a(0,.35,144,48,.84,.37),o(.032,.31,720,.7);break;case"loss":c(0,.21,392,.57),c(.116,.22,330,.58),a(.246,.35,262,196,.64,.22);break;case"hit":o(0,.061,1290,.58),a(.003,.07,580,280,.24);break}let l=.001;for(let h of n)l=Math.max(l,Math.abs(h));for(let h=0;h<n.length;h++)n[h]*=.89/l;return t}function sg(){let s,e,t,n,i=!1,r=!1,a=new Map,o=new Map,c=new Set;function l(d){c.delete(d),d.source.onended=null,d.source.disconnect(),d.gain.disconnect()}function h(){for(let d of c)d.source.stop(),l(d);o.clear()}function f(){if(!s)return;let d=s.currentTime;t.gain.cancelScheduledValues(d),t.gain.setTargetAtTime(i&&!r?.8:0,d,.008)}function u(){if(i&&s&&s.state!=="closed")return s.resume().catch(()=>{})}return{unlock(){if(i=!0,!s){let p=window.AudioContext||window.webkitAudioContext;if(!p)return;try{s=new p({latencyHint:"interactive"})}catch{return}e=s.createDynamicsCompressor(),e.threshold.value=-12,e.knee.value=9,e.ratio.value=5,e.attack.value=.004,e.release.value=.12,t=s.createGain(),t.gain.value=0,e.connect(t),t.connect(s.destination)}f();let d=u();return n?n.then(u):d},setMuted(d){r=!!d,r&&h(),f()},play(d,p=1,x=null){d==="merge"&&(x==="range"||x==="longshot"?d="longRange":(x==="shield"||x==="medic")&&(d="guardUp"));let g=ig[d];if(!g||!i||r||!s||s.state!=="running"||!(p>0))return;let m=s.currentTime;if(m-(o.get(d)??-1/0)<g.interval||c.size>=16)return;o.set(d,m),a.has(d)||a.set(d,jb(s,d));let v=s.createBufferSource(),M=s.createGain(),_={source:v,gain:M};v.buffer=a.get(d);let E=d==="plus"||d==="merge"||d==="victory"||d==="loss";v.playbackRate.value=E?1:.95+Math.random()*.1,M.gain.value=g.gain*Math.min(1.36,.45+.55*Math.sqrt(p)),v.connect(M),M.connect(e),c.add(_),v.onended=()=>l(_),v.start()},pause(){if(i=!1,h(),f(),!s||s.state==="closed")return;let d=s.suspend().catch(()=>{});return n=d,d.then(()=>{n===d&&(n=void 0)}),d}}}var Pe=s=>document.getElementById(s),Ni=Pe("stage"),ga=Pe("game"),fd=Pe("start"),Bo=Pe("startButton"),ug=Pe("veil"),pa=Pe("bossbar"),Cs=Pe("tip"),fg={hybrid:"\u6DF7\u5408",ai:"AI \u8D34\u56FE","3d":"\u7EAF 3D"},dg={hybrid:"\u961F\u957F\u548C Boss \u4F7F\u7528 3D\uFF0C\u7EA2\u84DD\u5C0F\u5175\u4F7F\u7528\u52A8\u6001\u539F\u753B\u3002",ai:"\u4F7F\u7528\u539F\u753B\u89D2\u8272\u548C\u52A8\u6001\u8D34\u56FE\u3002","3d":"\u6240\u6709\u89D2\u8272\u90FD\u4F7F\u7528 3D \u6A21\u578B\uFF0C\u53EF\u770B\u6E05\u8DD1\u52A8\u3001\u70AE\u8EAB\u540E\u5750\u548C\u53CC\u62F3\u7838\u5730\u3002"},Qb=matchMedia("(pointer:coarse)").matches;Pe("instruction").textContent=Qb?"\u5DE6\u53F3\u62D6\u52A8 \xB7 \u4E0B\u62C9\u540E\u64A4 \xB7 \u81EA\u52A8\u5F00\u706B":"\u65B9\u5411\u952E / WASD \u79FB\u52A8 \xB7 \u81EA\u52A8\u5F00\u706B";function pg(s){try{return localStorage.getItem(s)}catch{return null}}function mg(s,e){try{localStorage.setItem(s,e)}catch{}}var eS=new URL(location.href).searchParams.get("art"),os=[eS,pg("squad-art"),"hybrid"].find(s=>Object.prototype.hasOwnProperty.call(fg,s)),Is=pg("squad-mute")==="1",Wn=null,xa=!1,ad=!1,vn=null,hh=null,Ps=!0,ma=0,hr=0,od=0,sd=0,rd=0,gg=0,ld=!1,cd=!1,hd=!1,ud=0,Li=null,ur=new Set,ls=sg();ls.setMuted(Is);function xg(){let s=Is?"\u5F00\u542F\u58F0\u97F3":"\u5173\u95ED\u58F0\u97F3";Pe("soundIcon").setAttribute("href",Is?"#i-mute":"#i-sound"),Pe("sound").setAttribute("aria-label",s),Pe("sound").title=s}xg();var ae=new Ko(s=>{s.kind!=="smallShot"&&s.kind!=="loss"&&Wn?.feedback(s),ls.play(s.kind,s.strength,s.supply)}),lh=Number(new URL(location.href).searchParams.get("stage"));Number.isInteger(lh)&&lh>=1&&lh<=xi&&ae.reset(lh);function vg(s){return s.chapter.name+(s.number===10?" \xB7 \u9AD8\u96BE":"")}Pe("missionNumber").textContent=String(ae.stage).padStart(2,"0");Pe("missionChapter").textContent=vg(ae.route);Pe("missionName").textContent=ae.route.name;for(let s of gh){let e=document.createElement("section");e.className="chapter",e.dataset.theme=s.theme;let t=document.createElement("header");t.className="chapter-heading";let n=document.createElement("h3");n.textContent=s.name;let i=document.createElement("span");i.textContent=String(s.first).padStart(2,"0")+" \u2014 "+String(s.last).padStart(2,"0"),t.append(n,i);let r=document.createElement("div");r.className="chapter-stages";for(let a of Fi.slice(s.first-1,s.last)){let o=document.createElement("button"),c=document.createElement("b");c.textContent=String(a.number).padStart(2,"0");let l=document.createElement("span");if(l.className="stop-name",l.textContent=a.name,o.dataset.level=a.number,o.setAttribute("aria-label","\u7B2C "+a.number+" \u5173 "+a.name),o.append(c,l),a.number===10){let h=document.createElement("small");h.className="siege-label",h.textContent="\u9AD8\u96BE",o.append(h),o.dataset.hard="",o.setAttribute("aria-label","\u7B2C 10 \u5173 "+a.name+" \u9AD8\u96BE")}o.addEventListener("click",()=>md(a.number)),r.append(o)}e.append(t,r),Pe("stageList").append(e)}Pe("stageList").addEventListener("keydown",s=>{let e={ArrowLeft:-1,ArrowRight:1,ArrowUp:-5,ArrowDown:5};if(!Object.prototype.hasOwnProperty.call(e,s.code)||!s.target.dataset.level)return;let t=Math.min(xi,Math.max(1,+s.target.dataset.level+e[s.code]));s.preventDefault(),Pe("stageList").querySelector('[data-level="'+t+'"]').focus()});function dd(){ur.clear(),Li=null}function ch(s,e){Cs.textContent=s,Cs.hidden=!1,gg=ae.elapsed+e}function pd(s,e){if(Object.prototype.hasOwnProperty.call(fg,s)){os=ad?s:"3d",Ni.dataset.art=os,Ps=!0,e&&mg("squad-art",os);for(let t of Pe("options").children)t.setAttribute("aria-pressed",String(t.dataset.art===os)),t.disabled=!ad&&t.dataset.art!=="3d";vn==="art"&&(Pe("detail").textContent=dg[os])}}function zo(){xa&&(_g(),ae.start(),ls.unlock(),fd.hidden=!0,Pe("pause").hidden=!1,Ni.dataset.phase=ae.phase)}function md(s=ae.stage){dd(),ae.reset(s),Wn.prepareBoss(ae.boss.kind).then(()=>{Ps=!0}),Wn.reset(ae.x),ma=0,od=0,Cs.hidden=!0,ld=!1,cd=!1,hd=!1,ud=0;let e=new URL(location.href);e.searchParams.set("stage",ae.stage),history.replaceState(null,"",e),zo()}function fr(s){if(!xa)return;dd(),ma=0,vn=s,Ps=!0,ug.hidden=!1,Ni.querySelector(".hud").inert=!0,fd.inert=!0;let e=s==="result"?ae.phase:s,t={art:"art",levels:"map",pause:"pause",won:"medal",lost:"retreat"};if(Pe("dialog").dataset.panel=e,Pe("dialogIcon").setAttribute("href","#i-"+t[e]),Pe("dialogChapter").textContent=s==="levels"?"\u6E2F\u533A\u8FDC\u5F81":vg(ae.route),Pe("resultStats").hidden=s!=="result",Pe("options").hidden=s!=="art",Pe("stageList").hidden=s!=="levels",Pe("dialog").classList.toggle("levels",s==="levels"),Pe("selectStage").hidden=s!=="pause"&&s!=="result",s==="levels"){ls.pause(),Pe("dialogTitle").textContent="\u6218\u5F79\u5730\u56FE",Pe("detail").textContent="",Pe("continue").textContent="\u8FD4\u56DE";for(let n of Pe("stageList").querySelectorAll("[data-level]"))n.setAttribute("aria-current",String(+n.dataset.level===ae.stage))}if(Pe("secondary").hidden=s!=="pause",s==="art"&&(ls.pause(),Pe("dialogTitle").textContent="\u89D2\u8272\u753B\u9762",Pe("detail").textContent=dg[os],Pe("continue").textContent="\u786E\u5B9A",pd(os,!1)),s==="pause"&&(ls.pause(),Pe("dialogTitle").textContent="\u5DF2\u6682\u505C",Pe("detail").textContent="\u7B2C "+ae.stage+" \u5173 \xB7 "+ae.route.name,Pe("continue").textContent="\u7EE7\u7EED\u6E38\u620F"),s==="result"){let n=ae.phase==="won",i=Math.floor(ae.elapsed);if(Pe("resultKills").textContent=ae.score,Pe("resultTime").textContent=Math.floor(i/60)+":"+String(i%60).padStart(2,"0"),n)Pe("dialogTitle").textContent=ae.stage===xi?"\u5168\u90E8\u901A\u5173":`\u7B2C ${ae.stage} \u5173\u901A\u8FC7`,Pe("detail").textContent=ae.stage<xi?"\u4E0B\u4E00\u7AD9 \xB7 "+Fi[ae.stage].name:"\u5C0F\u961F\u5DF2\u5B8C\u6210\u5168\u90E8\u822A\u7EBF\u3002";else{let r={signature:["\u961F\u957F\u51FA\u5C40",Rn[ae.boss.kind].name+"\u7684"+Rn[ae.boss.kind].skill+"\u547D\u4E2D\u4E86\u961F\u957F\u3002"],bossShot:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u5F39\u5E55\u51FB\u5012\u3002"],gap:["\u961F\u957F\u5760\u6865","\u9047\u5230\u7F3A\u53E3\u65F6\uFF0C\u63D0\u524D\u6362\u9053\uFF0C\u6216\u5E26\u4E0A\u67B6\u6865\u8865\u7ED9\u3002"],infantry:["\u5C0F\u961F\u5168\u706D","\u7EA2\u5175\u5DF2\u8D8A\u8FC7\u9632\u7EBF\u3002"],skyfall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u843D\u4E0B\u7684\u91CD\u7269\u51FB\u4E2D\u3002"],wall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u786C\u5899\u63A8\u51FA\u4E86\u8DD1\u9053\u3002"],breach:["\u9632\u7EBF\u5931\u5B88","Boss \u7A81\u7834\u4E86\u9632\u7EBF\u3002"],slam:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u843D\u5730\u51B2\u51FB\u51FB\u5012\u3002"]},a=ae.boss.active&&!ae.boss.defeated?`Boss \u8FD8\u5269 ${Math.ceil(ae.boss.hp)} / ${ae.boss.maxHp} \u751F\u547D`:"\u7EA2\u5175\u7A81\u7834\u4E86\u961F\u4F0D\u3002",[o,c]=r[ae.lossReason]||["\u5C0F\u961F\u5168\u706D",a];Pe("dialogTitle").textContent=o,Pe("detail").textContent=c}Pe("continue").textContent=n&&ae.stage<xi?"\u4E0B\u4E00\u5173":"\u518D\u73A9\u4E00\u6B21"}if(s==="levels"){let n=Pe("stageList").querySelector("[aria-current=true]");n.focus({preventScroll:!0}),n.scrollIntoView({block:"nearest"})}else Pe("continue").focus({preventScroll:!0})}function _g(){Ps=!0,vn=null,hh=null,ug.hidden=!0,Ni.querySelector(".hud").inert=!1,fd.inert=!1,ma=0}function yg(){let s=vn,e=hh;if(_g(),s==="result"){md(ae.phase==="won"?ae.stage<xi?ae.stage+1:1:ae.stage);return}if((s==="art"||s==="levels")&&e){fr(e);return}ae.playing?ls.unlock():ae.phase==="ready"&&Bo.focus({preventScroll:!0})}function Mg(){!xa||!ae.playing&&ae.phase!=="ready"&&!ae.resultReady||(hh=vn,fr("levels"))}Pe("level").addEventListener("click",Mg);Pe("selectStage").addEventListener("click",Mg);Pe("continue").addEventListener("click",yg);Pe("secondary").addEventListener("click",()=>md());Bo.addEventListener("click",zo);Pe("sound").addEventListener("click",()=>{Is=!Is,mg("squad-mute",Is?"1":"0"),ls.setMuted(Is),Is||ls.unlock(),xg()});Pe("pause").addEventListener("click",()=>{ae.playing&&fr("pause")});Pe("styles").addEventListener("click",()=>{hh=vn,fr("art")});for(let s of Pe("options").children)s.addEventListener("click",()=>pd(s.dataset.art,!0));ga.addEventListener("pointerdown",s=>{!xa||vn||!s.isPrimary||s.button!==0||(ae.phase==="ready"&&zo(),ae.playing&&(s.preventDefault(),Li={id:s.pointerId,x:s.clientX,y:s.clientY},ga.setPointerCapture(s.pointerId)))});ga.addEventListener("pointermove",s=>{!Li||s.pointerId!==Li.id||vn||(ae.aim(ae.targetX+(s.clientX-Li.x)*14.8/Ni.clientWidth,ae.targetZ+(s.clientY-Li.y)*11/Ni.clientHeight),Li.x=s.clientX,Li.y=s.clientY)});function tS(s){s.pointerId===Li?.id&&(Li=null)}for(let s of["pointerup","pointercancel","lostpointercapture"])ga.addEventListener(s,tS);var bg=["ArrowLeft","KeyA"],Sg=["ArrowRight","KeyD"],Eg=["ArrowUp","KeyW"],wg=["ArrowDown","KeyS"];window.addEventListener("keydown",s=>{if(!xa||s.altKey||s.ctrlKey||s.metaKey)return;let e=s.code;if(vn){vn!=="result"&&(e==="Escape"||e==="KeyP")&&!s.repeat&&(s.preventDefault(),yg());return}if(bg.includes(e)||Sg.includes(e)||Eg.includes(e)||wg.includes(e)){s.preventDefault(),ae.phase==="ready"&&zo(),ur.add(e);return}s.repeat||((e==="Space"||e==="Enter")&&ae.phase==="ready"&&!(s.target instanceof HTMLButtonElement&&s.target!==Bo)?(s.preventDefault(),zo()):(e==="KeyP"||e==="Escape"||e==="Space")&&ae.playing&&!(e==="Space"&&s.target instanceof HTMLButtonElement)&&(s.preventDefault(),fr("pause")))});window.addEventListener("keyup",s=>ur.delete(s.code));function gd(){dd(),ae.playing&&!vn&&fr("pause")}window.addEventListener("blur",gd);document.addEventListener("visibilitychange",()=>{hr=0,document.hidden&&gd()});var rg=-1,ag=-1,og=-1,lg=-1,nS=matchMedia("(prefers-reduced-motion: reduce)");function cg(s,e,t){if(e===t)return;let n=Pe(s);if(n.textContent=e,!(!ae.playing||t<0||nS.matches||!n.animate)){for(let i of n.getAnimations())i.cancel();n.animate([{transform:"scale(1.17)",color:e>t?"#ffe097":"#ffa488"},{transform:"scale(1)",color:"#fff9e9"}],{duration:240,easing:"ease-out"})}}function iS(){let s=ae.allies.length,e=ae.cannonDamage,t=Pe("level"),n="\u7B2C "+ae.stage+" \u5173";Pe("levelText").textContent!==n&&(Pe("levelText").textContent=n);let i=Math.min(100,Math.floor(100*ae.row/ae.finaleRow));i!==lg&&(Pe("progress").firstElementChild.style.transform="scaleX("+i/100+")",Pe("progress").setAttribute("aria-valuenow",String(i)),lg=i),t.title=ae.route.name+" \xB7 \u9009\u62E9\u5173\u5361";let o=[Object.entries(ae.buffs).filter(([,f])=>f>0).map(([f,u])=>xn[f].label+" "+Math.ceil(u)+"\u79D2").join(" \xB7 "),ae.planks?"\u4FBF\u6865 \xD7"+ae.planks:"",ae.chill>0?"\u971C\u51BB "+Math.ceil(ae.chill)+"\u79D2":""].filter(Boolean).join(" \xB7 "),c=Pe("buffs");c.textContent!==o&&(c.textContent=o),c.hidden=!o||!ae.playing,cg("count",s,rg),cg("power",e,ag),rg=s,ag=e,Ni.dataset.phase=ae.phase;let l=Pe("armorMeter");if(l.hidden=!ae.playing||ae.armor===3,!l.hidden){let f=Wn.project(ae.x,1.94*ae.visualScale,ae.captainZ);l.style.transform="translate("+f.x.toFixed(1)+"px,"+f.y.toFixed(1)+"px)",l.dataset.value!==String(ae.armor)&&(l.dataset.value=ae.armor,l.setAttribute("aria-label","\u961F\u957F\u62A4\u7532 "+ae.armor+" / 3"))}let h=ae.boss;if(pa.hidden=!h.active||h.defeated||Wn.project(h.x,0,h.z).y<3,!pa.hidden){Pe("bossName").textContent!==Rn[h.kind].name&&(Pe("bossName").textContent=Rn[h.kind].name);let[f,u]=Rn[h.kind].crown,d=Wn.project(h.x,f+h.lift,h.z+u);pa.style.transform=`translate(${d.x.toFixed(1)}px,${Math.max(53,d.y).toFixed(1)}px)`}h.hp!==og&&(pa.firstElementChild.style.transform=`scaleX(${h.hp/h.maxHp})`,pa.lastElementChild.textContent=Math.ceil(h.hp),og=h.hp),ae.playing&&!vn&&(!ld&&ae.wall.hp>0&&ae.distance>=10&&ae.wall.z<0&&(ld=!0,ch("\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00",3)),ae.wall.hp<=0&&Cs.textContent==="\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00"&&(Cs.hidden=!0),!pa.hidden&&!cd&&(cd=!0,ch("\u5BF9\u51C6 Boss \u5F00\u706B\uFF0C\u8DF3\u8D77\u65F6\u907F\u5F00\u843D\u70B9",2.2)),h.defeated&&!hd&&h.defeatAge>=.92&&(hd=!0,ch("Boss \u5DF2\u5012\u4E0B\uFF0C\u6E05\u7406\u5269\u4F59\u7EA2\u5175",2.3)),ae.hint&&ae.hint.id!==ud&&(ud=ae.hint.id,ch(ae.hint.text,2.1)),!Cs.hidden&&ae.elapsed>=gg&&(Cs.hidden=!0)),!ae.playing&&ae.phase!=="ready"&&(Cs.hidden=!0,Pe("pause").hidden=!0,ae.resultReady&&!vn&&fr("result"))}function Tg(s){if(requestAnimationFrame(Tg),document.hidden)return;if(vn&&!Ps){hr=s;return}if(!vn&&ae.phase==="ready"&&hr&&s-hr<1e3/29&&!Ps)return;Ps=!1;let e=hr?(s-hr)/1e3:1/60;hr=s;let t=Math.min(.08,Math.max(0,e)),n=0;if(!vn){if(od+=t,ae.playing||ae.phase==="won"||ae.phase==="lost")for(ma+=t;ma>=1/60;){let i=Number(Sg.some(a=>ur.has(a)))-Number(bg.some(a=>ur.has(a))),r=Number(wg.some(a=>ur.has(a)))-Number(Eg.some(a=>ur.has(a)));ae.tick(1/60,i,r),n+=ae.worldAdvance,ma-=1/60}ae.playing&&(rd+=t,e>.031&&sd++,rd>2.1&&(sd>24&&Wn.lowerResolution(),sd=0,rd=0))}Wn.draw(ae,od,vn?0:t,n,os),iS()}function hg(s){let e=Pe("problem");e.hidden=!1,e.textContent=s;let t=document.createElement("button");t.textContent="\u91CD\u65B0\u8F7D\u5165",t.onclick=()=>location.reload(),e.append(t)}async function sS(){try{Wn=tg(ga,Ni),Wn.reset(ae.x);let s=()=>{Wn.resize(),ae.entryZ=Wn.entryZ(),Ps=!0};s(),new ResizeObserver(s).observe(Ni),window.addEventListener("resize",s),ga.addEventListener("webglcontextlost",e=>{e.preventDefault(),gd(),hg("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u6E38\u620F\u3002")}),ad=await Wn.assets,await Wn.prepareBoss(ae.boss.kind),pd(os,!1),xa=!0,Ni.dataset.phase="ready",Bo.disabled=!1,Bo.lastElementChild.textContent="\u5F00\u59CB\u51FA\u51FB",requestAnimationFrame(Tg)}catch(s){console.error(s),hg("\u6E38\u620F\u9700\u8981\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5728 Safari \u6216 Chrome \u4E2D\u6253\u5F00\u3002")}}sS();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
