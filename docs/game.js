var vh={speed:27,lift:0,tail:1.05},Zo={speed:23,lift:.34,tail:1.35},_r={speed:20,lift:.78,tail:2.05},zs={speed:40,lift:.08,tail:4.15},Nd=22,Dd=30;function Ko(s,e){let t=Math.min(1,e/s.aimDistance);return s.startY+(s.endY-s.startY)*t+4*s.lift*t*(1-t)}function yr(s,e,t){return t.x=s.startX+s.headingX*e,t.y=Ko(s,e),t.z=s.startZ+s.headingZ*e,t}function Et(s,e,t){let n=Math.max(0,Math.min(1,(s-e)/(t-e)));return n*n*(3-2*n)}function Jo(s){return Math.max(0,Math.min(1,(s-.3)/(.91-.3)))}var _h=(s,e,t)=>Math.min(t,Math.max(e,s)),zn={bruiser:{crown:[4.91,0],name:"\u94C1\u62F3\u961F\u957F",skill:"\u9707\u6865\u91CD\u62F3",prompt:"\u91CD\u62F3\u84C4\u529B\uFF0C\u907F\u5F00\u62F3\u5370",color:"#ffc66c",height:4.5,aim:2.05,warm:.86,flight:.65,cooldown:6.3},diver:{crown:[3.74,-1.78],name:"\u6F6E\u94B3\u5DE8\u87F9",skill:"\u53CC\u94B3\u6F6E\u6C50",prompt:"\u53CC\u94B3\u5408\u51FB\uFF0C\u4E24\u9053\u6C34\u73AF\u4E4B\u95F4\u6709\u7A7A\u9699",color:"#39e4d5",height:2.32,aim:1.12,warm:.9,flight:.86,cooldown:6.3},warden:{crown:[3.47,-1.49],name:"\u91D1\u89D2\u91CD\u7280",skill:"\u94C1\u89D2\u51B2\u950B",prompt:"\u91CD\u7280\u538B\u4F4E\u4E86\u89D2\uFF0C\u95EA\u5F00\u91D1\u8272\u76F4\u9053",color:"#ffb847",height:2.84,aim:1.55,warm:1.12,flight:.82,cooldown:7.1},drill:{crown:[3.79,-1.65],name:"\u7D2B\u6676\u5730\u9F99",skill:"\u5730\u8109\u6676\u523A",prompt:"\u6676\u523A\u9010\u4E2A\u5192\u51FA\uFF0C\u79BB\u5F00\u7D2B\u5708",color:"#ce82ff",height:3.39,aim:1.6,warm:.89,flight:.52,cooldown:6.4},kestrel:{crown:[4.12,-2.03],name:"\u51B0\u7FFC\u98DE\u9F99",skill:"\u6781\u5BD2\u5410\u606F",prompt:"\u51B0\u9F99\u6B63\u5728\u5438\u6C14\uFF0C\u79BB\u5F00\u971C\u84DD\u6247\u5F62",color:"#78eaff",height:3.35,aim:1.92,warm:1.15,flight:.45,cooldown:6.5},engine:{crown:[3.72,-1.9],name:"\u7194\u7089\u86DB\u673A",skill:"\u7194\u82AF\u53CC\u70AE",prompt:"\u53CC\u70AE\u9501\u5B9A\uFF0C\u79BB\u5F00\u6A59\u7EA2\u843D\u70B9",color:"#ff8253",height:2.68,aim:1.33,warm:.94,flight:1.12,cooldown:6.8}},yh=(s,e)=>_h((s.age-s.warm-e.delay)/s.flight,0,1);function Ud(s,e,t,n,i=0){if(e.shape==="circle")return Math.hypot(t-e.x,n-e.z)<e.radius+i;let r=e.x-s.x,a=e.z-s.z,o=Math.hypot(r,a)||1,c=((t-s.x)*r+(n-s.z)*a)/o,l=e.shape==="cone"?e.radius*_h(c/o,.05,1):e.radius;return c>-.1&&c<o+1.65+i&&Math.abs((t-s.x)*a-(n-s.z)*r)/o<l+i}function zg(s){let e=s.boss,t=e.kind,n=zn[t],i=s.x,r=s.captainZ,a=i>.7?-1:1,o=[],c=(l,h,d,f=0,u="circle")=>o.push({x:_h(l,-5.85,5.85),z:h,radius:d,delay:f,shape:u,hit:!1});return t==="diver"?(c(i-1.55,r,.96),c(i+1.55,r,.96,.13)):t==="warden"?c(e.x,r+.42,1.04,0,"strip"):t==="drill"?(c(i,r-.64,.89),c(i+a*.68,r+.07,.88,.26),c(i+a*1.45,r+.68,.91,.52)):t==="kestrel"?c(i,r+.74,1.31,0,"cone"):t==="engine"?(c(i,r-.17,1.12),c(i+a*2.42,r+.52,1.14,.37)):c(i,r-.44,1.16),e.skill={kind:t,x:e.x,z:e.z+.38,height:n.aim,age:0,warm:n.warm,flight:n.flight,marks:o,casualties:0,damagedCaptain:!1},s.notice(n.prompt),e.skill}function kg(s,e,t){let n=s.stage<7?2:3;if(s.event(e.kind+"Strike",t.x,.1,t.z),s.allies=s.allies.filter(i=>{if(e.casualties>=n||!Ud(e,t,i.x,i.z,.12))return!0;let r=s.fall(i,"blue",.7,t.x);return r.vy=e.kind==="engine"?3.8:2.6,e.casualties++,!1}),!(e.damagedCaptain||!Ud(e,t,s.x,s.captainZ,.16))){if(e.damagedCaptain=!0,s.buffs.shield>0){s.event("shieldHit",s.x,.6,s.captainZ);return}e.kind==="kestrel"&&(s.chill=1.6),!(s.hitGuard>0)&&(s.hurt=1,s.hitGuard=1.15,s.armor--,s.armor<=0&&(s.lossReason="signature",s.finish(!1)))}}function Fd(s,e){let t=s.boss,n=s.route.siege&&t.hp<=t.maxHp*.5;if(n&&!t.secondWind&&(t.secondWind=!0,t.nextCast=Math.min(t.nextCast,1.3),s.notice("\u5730\u9F99\u8FDB\u5165\u72C2\u653B\uFF0C\u8FDE\u7EED\u907F\u5F00\u6676\u523A")),!t.skill){t.nextCast-=e,t.z>=-30&&t.z<(n?-1.65:-5.2)&&!s.activeGround.some(r=>r.finale&&!r.crossed&&Math.abs(r.z-t.z)<7)&&!t.vault&&!t.attackT&&t.nextCast<=0&&zg(s);return}let i=t.skill;i.age+=e,!i.fired&&i.age>=i.warm&&(i.fired=!0,s.event(i.kind+"Cast",t.x,zn[i.kind].aim,t.z+.37));for(let r of i.marks)if(!r.hit&&yh(i,r)>=1&&(r.hit=!0,kg(s,i,r),!s.playing))return;i.age>i.warm+i.flight+i.marks.at(-1).delay+.65&&(t.skill=null,t.nextCast=n?1.8:zn[t.kind].cooldown)}var Oi=s=>4.4*s,Mr=s=>["\u5DE6\u8DEF","\u4E2D\u8DEF","\u53F3\u8DEF"][s+1],br={quay:{floor:"#b6b3b9",joint:"#aba2af",line:"#998f9f",rim:"#ddd5df",deep:"#071a32",glint:"#1c3854",frame:"#485267"},timber:{floor:"#b9b7b9",joint:"#aaa1a8",line:"#988f9c",rim:"#ded5d9",deep:"#091c33",glint:"#214257",frame:"#535b6c"},quarry:{floor:"#b9b6bc",joint:"#b0a5b3",line:"#9c92a2",rim:"#e1d6e3",deep:"#0a1931",glint:"#30445d",frame:"#54596d"},forge:{floor:"#b7b5be",joint:"#a0a1af",line:"#898d9e",rim:"#d7d7df",deep:"#071b31",glint:"#2a435e",frame:"#464f64"},ice:{floor:"#babdc5",joint:"#b0b9c7",line:"#969fb0",rim:"#e2e7f1",deep:"#0a1b34",glint:"#32506f",frame:"#58677e"},cinder:{floor:"#b7b2b9",joint:"#aaa0af",line:"#958b9d",rim:"#dcd4e0",deep:"#0e1932",glint:"#34435b",frame:"#534e65"}},Mh=[["\u706F\u5854\u5916\u6E2F","quay"],["\u60AC\u7D22\u6797\u8C37","timber"],["\u56DE\u58F0\u77FF\u5CE1","quarry"],["\u94A2\u94C1\u8239\u575E","forge"],["\u6781\u5149\u51B0\u6CB3","ice"],["\u7194\u5FC3\u88C2\u8C37","cinder"]].map(([s,e],t)=>({number:t+1,name:s,theme:e,first:t*5+1,last:t*5+5})),Ht=(s,e)=>({kind:"skyfall",lane:s,at:e,radius:1.82}),Rt=(s,e,t=3.6)=>({kind:"gap",lane:s,at:e,length:t}),Nt=(s,e)=>({kind:"bridge",lane:s,at:e,length:4.4}),pt=(s,e,t="reserve")=>({kind:"cache",lane:s,at:e,reward:t}),rn=(s,e)=>({kind:"coil",lane:s,at:e}),ln=(s,e,t)=>({kind:"belt",lane:s,at:e,direction:t,length:8.2}),Hg=[["\u6E2F\u53E3\u5916\u6865","bruiser",!1,[pt(-1,59,"squad")]],["\u5378\u8D27\u6808\u6865","diver",!0,[Rt(1,42),pt(-1,75,"engineer")]],["\u540A\u7D22\u7801\u5934","warden",!1,[Nt(1,49),pt(-1,83,"medic")]],["\u6D77\u5824\u5C94\u53E3","drill",!1,[pt(1,37,"reserve"),Rt(-1,65),rn(0,94)]],["\u706F\u5854\u822A\u9053","kestrel",!0,[ln(-1,41,1),Rt(1,69),pt(0,89,"frost")]],["\u6797\u573A\u540A\u8FD0\u7EBF","engine",!1,[Ht(1,55),rn(-1,39),Nt(1,68),pt(-1,96,"engineer")]],["\u6797\u95F4\u6D6E\u6865","bruiser",!0,[Rt(-1,35),pt(1,53,"engineer"),Rt(1,82),ln(0,104,-1)]],["\u6728\u6599\u95F8\u53E3","diver",!1,[Ht(-1,73),pt(1,37,"medic"),Nt(-1,60),rn(1,82),Rt(0,105)]],["\u53CC\u7D22\u5CE1\u5ECA","warden",!1,[pt(-1,35,"reserve"),pt(1,55,"frost"),Rt(0,80),Nt(-1,105)]],["\u60AC\u7D22\u5C01\u9501\u6218","drill",!0,[Ht(1,51),Ht(0,74),Ht(-1,99),Nt(-1,40),rn(0,61),Nt(1,86),pt(1,107,"reserve")]],["\u6EAA\u8C37\u77FF\u53E3","diver",!0,[Rt(0,37),Nt(1,60),pt(-1,84,"engineer"),Rt(-1,107)]],["\u8FD0\u77FF\u659C\u5761","warden",!1,[Ht(1,64),ln(0,34,1),pt(1,53,"medic"),Nt(-1,77),rn(0,106)]],["\u5CE1\u8C37\u6551\u63F4","kestrel",!1,[pt(-1,33,"medic"),Rt(1,58),ln(0,80,-1),pt(-1,105,"reserve")]],["\u6C34\u95F8\u77FF\u9053","engine",!0,[Nt(-1,36),rn(1,54),Nt(1,81),pt(0,108,"frost")]],["\u788E\u77F3\u8F6C\u8FD0\u6865","drill",!0,[Ht(0,88),rn(1,35),Rt(-1,57),pt(0,78,"engineer"),Rt(1,99),ln(-1,116,1)]],["\u7801\u5934\u88C5\u914D\u7EBF","bruiser",!1,[Ht(1,65),ln(-1,38,1),pt(0,52,"reserve"),rn(1,75),Nt(-1,97),Rt(1,119)]],["\u56DE\u8F6C\u8239\u53F0","kestrel",!0,[ln(0,35,-1),Rt(1,55),pt(-1,73,"engineer"),ln(1,93,-1),Rt(0,116),pt(-1,138,"reserve")]],["\u91CD\u9524\u88C5\u914D\u7EBF","engine",!1,[Ht(0,62),Ht(1,110),pt(1,36,"frost"),ln(-1,55,1),Nt(1,75),rn(0,98),pt(-1,121,"reserve")]],["\u8239\u575E\u540A\u67B6","warden",!0,[Nt(1,37),Rt(-1,56),pt(0,79,"medic"),Rt(1,101),rn(-1,123)]],["\u9F99\u95E8\u591C\u822A","diver",!0,[Ht(-1,65),Ht(0,108),rn(0,34),pt(-1,54,"engineer"),Nt(1,77),ln(0,96,1),Rt(-1,120)]],["\u51BB\u6CB3\u6E21\u53E3","drill",!1,[Ht(0,67),Rt(1,37),ln(0,56,-1),pt(-1,78,"frost"),Nt(1,102),rn(0,123)]],["\u6D6E\u51B0\u957F\u5824","engine",!0,[pt(-1,35,"reserve"),Nt(1,54),rn(-1,74),ln(0,94,-1),Rt(1,119)]],["\u51B0\u810A\u53CC\u7D22","warden",!1,[Ht(1,64),Ht(-1,107),Nt(-1,34),pt(1,52,"engineer"),Rt(0,72),Nt(1,94),Rt(-1,124),pt(-1,143,"squad")]],["\u6781\u5730\u98CE\u5ECA","kestrel",!0,[ln(1,35,-1),rn(0,55),ln(-1,75,1),pt(1,95,"medic"),Nt(0,121)]],["\u51B0\u5CE1\u6700\u540E\u4E00\u8DE8","diver",!0,[Ht(1,65),Ht(0,104),Rt(-1,34),pt(1,52,"engineer"),Nt(0,72),Rt(1,93),rn(-1,114),pt(1,134,"reserve")]],["\u7070\u70EC\u5C01\u9501\u7EBF","bruiser",!1,[Ht(1,65),pt(1,35,"reserve"),Nt(-1,55),ln(0,75,1),rn(1,95),Nt(1,115),Rt(-1,134)]],["\u7194\u5CA9\u7AD6\u4E95","drill",!0,[Ht(1,62),Ht(-1,105),rn(-1,33),pt(0,51,"frost"),Rt(1,72),ln(-1,91,1),Nt(1,112),pt(-1,132,"medic")]],["\u9ED1\u66DC\u65AD\u5D16","kestrel",!0,[Rt(1,33),ln(-1,51,1),Nt(0,73),pt(-1,92,"engineer"),Rt(0,114),ln(1,136,-1)]],["\u7EA2\u7089\u4E09\u7EBF","warden",!1,[Ht(0,64),Ht(-1,108),Nt(1,35),rn(-1,53),pt(0,73,"reserve"),Rt(-1,93),Nt(0,114),rn(1,135)]],["\u7194\u5FC3\u7EC8\u6865","engine",!0,[Ht(0,63),Ht(-1,101),Ht(0,142),pt(-1,34,"engineer"),Rt(1,52),Nt(-1,72),rn(0,91),ln(1,110,-1),Nt(1,132),pt(-1,151,"medic")]]],Gg=[.45,.68,.53,.6,.65,.7,.76,.81,.93,1.62],Bi=Hg.map(([s,e,t,n],i)=>{let r=i+1,a=Mh[Math.floor(i/5)],o=Gg[i]??.87+(r-11)*.019,c=r===10,l=.565/Math.sqrt(o),h=6.4/o,d=r<=3?[135,154,144][i]:151+i*2.55+(c?15:0),f=c?60:44,u=Math.round(d/(l+.38/11+h/f));return{number:r,name:s,chapter:a,theme:a.theme,boss:e,vault:t,features:n,pressure:o,siege:c,rowSpacing:l,restEvery:f,restLength:h,finale:u,bossHP:Math.round(3800+(385+i*26)*o*(c?6.45:2.2)),wallHP:Math.round((72+i*1.55)*Math.min(1.35,o)),contactGrace:1.24/Math.sqrt(o)}}),_i=Bi.length;function Ta(s,e){let t={glass:21,crates:49,shutter:78},n=s.kind==="cover"?t[s.variant]:s.kind==="cache"?60:s.kind==="bridge"?42:29,i=Math.round((.56+.44*Bi[e-1].pressure)*(n+(e-1)*(s.kind==="cover"?.75:1.15)));return{...s,x:Oi(s.lane),z:-s.at,hp:i,maxHp:i,state:"ready",age:0,flash:0,half:s.kind==="cover"?1.94:s.kind==="cache"?1.67:.74,depth:s.kind==="cover"?.46:s.kind==="cache"?.38:.34}}function ks(s){return s.kind==="gap"&&s.state!=="repaired"||s.kind==="bridge"&&s.state==="cut"}function $o(s,e,t,n=0){return ks(s)&&Math.abs(e-s.x)<4.4/2-.14-n&&Math.abs(t-s.z)<s.length/2-n}var zi=4.4-.4,wn={plus:{label:"+3",hp:10,count:3,tone:"blue"},squad:{label:"+5",hp:39,count:5,tone:"blue"},merge:{label:"\u70AE+5",hp:45,tone:"gold"},range:{label:"\u8FDC\u5C04",hp:28,tone:"blue"},longshot:{label:"\u7A7F\u7532\u8FDC\u5C04",hp:37,tone:"gold"},rapid:{label:"\u8FDE\u5C04",hp:35,tone:"gold"},shield:{label:"\u62A4\u76FE",hp:41,tone:"blue"},blast:{label:"\u7206\u7834",hp:44,tone:"gold"},plasma:{label:"\u7535\u6D46",hp:45,tone:"blue"},spread:{label:"\u53CC\u53D1",hp:41,tone:"gold"},drone:{label:"\u652F\u63F4",hp:45,tone:"blue"},reserve:{label:"+6",hp:38,count:6,tone:"blue"},engineer:{label:"\u67B6\u6865",hp:35,tone:"gold"},medic:{label:"\u6551\u63F4",hp:30,tone:"blue"},frost:{label:"\u51B0\u5E55",hp:37,tone:"blue"},fever:{label:"\u72C2\u70ED",hp:48,tone:"gold"}};function Sh(s,e,t,n){let i=wn[t].hp+(t==="plus"?Math.min(8,n-1):(n-1)*1.05),r=Math.round(i*(.66+.34*Bi[n-1].pressure));return{x:s,at:e,z:-e,type:t,hp:r,maxHp:r,active:!0,flash:0}}var Od=[[0,1,"glass","range","plus"],[1,-1,"crates","spread","squad"],[-1,0,"shutter","longshot","shield"],[1,0,"glass","blast","reserve"],[0,-1,"crates","drone","range"],[-1,1,"shutter","fever","squad"],[0,1,"glass","plasma","medic"],[1,-1,"crates","reserve","rapid"],[-1,0,"shutter","longshot","range"]],bh=[[0,1,"glass","range","plus"],[1,-1,null,"merge","squad"],[-1,0,"glass","blast","squad"],[0,1,null,"squad","range"]],Bd=[[0,1,"glass","plasma","plus"],[1,0,"crates","squad","shield"],[0,-1,"shutter","longshot","blast"],[-1,1,"glass","drone","rapid"],[1,0,"shutter","reserve","range"],[0,-1,"crates","medic","shield"]];function zd(s,e=[]){let t=[];function n(i,r,a){let o=Sh(Oi(i),r,a,s);return t.push(o),o}n(0,11,"plus"),n(-1,16,"merge"),n(1,25,"squad"),s===1&&n(0,28,"blast"),s===8&&n(0,29,"reserve");for(let i=0;i<10;i++){let r=36+i*16.2,a=Od[(i+(s-1)*2)%Od.length];s===10&&(a=Bd[i%Bd.length]),s===1&&(a=bh[i%bh.length]),s===8&&i<2&&(a=bh[i]);let[o,c,l,h]=a,d=(s===12||s===15)&&i===1?"reserve":a[4],f=s%2?1:-1,u=(v,M,_)=>!e.some(b=>b.lane===v&&b.at+(b.length||1)/2>=M-1.5&&b.at-(b.length||1)/2<=_+1.5),x=[...new Set([o*f,c*f,-1,0,1])].find(v=>u(v,r-3.6,r));if(x!==void 0){let v=n(x,r,h);l&&(v.coverSpec={kind:"cover",variant:l,lane:x,at:r-3.6,reward:h})}let g=r+(i%2?1.8:-.9),m=[c*f,0,-1,1].find(v=>v!==x&&u(v,g,g));m!==void 0&&n(m,g,d)}return t}var Eh=(s,e,t)=>Math.min(t,Math.max(e,s)),wh=5.32,Vg=.94;function Th(s){let e=s.boss,t=s.x,n=s.captainZ,i=Math.hypot(t-e.x,n-e.z);for(let r of s.allies){let a=Math.hypot(r.x-e.x,r.z-e.z);a<i&&(i=a,t=r.x,n=r.z)}return{x:t,z:n,distance:i}}function Ah(s,e,t){let n=[];function i(r,a,o){r.z+o+.65<e||r.z-o-.65>t||n.push({x:r.x,z:r.z,half:a+Vg,depth:o+.65})}for(let r of s.gates)r.active&&i(r,zi/2,.16);s.wall.hp>0&&i(s.wall,2.14,.32);for(let r of s.features)(r.kind==="cover"||r.kind==="cache")&&r.hp>0&&r.state==="ready"&&i(r,r.half,r.depth);return n}function Aa(s,e,t){let n=Ah(s,e,t),i=[...new Set([...s.wave||[0],0,-1,1])],r,a=1/0;for(let o of i){let c=o===0?-.42:Oi(o),l=n.filter(h=>Math.abs(c-h.x)<h.half+.12).length;if(l<a&&(r={lane:o,x:c,conflicts:l},a=l),!l)break}return r}function kd(s,e,t,n){let i=s.boss,r=i.z+s.worldAdvance,a=Eh(i.pursuing?t.x:i.escortX??-.42,-wh,wh),o=i.pursuing?Math.min(r+n,Math.max(i.z-e*3.9,t.z-1.35)):r+n,c=Ah(s,Math.min(r,o)-.2,Math.max(r,o)+3),l=a,h=x=>c.every(g=>Math.abs(x-g.x)>=g.half+.025);if(!h(a)||!h(i.x)){let x=[a,i.x,Oi(-1),0,Oi(1)];for(let m of c)x.push(m.x-m.half-.07,m.x+m.half+.07);let g=1/0;for(let m of x){if(Math.abs(m)>wh||!h(m))continue;let v=Math.abs(m-i.x)+.48*Math.abs(m-a);v<g&&(g=v,l=m)}}let d=(i.pursuing?5.1:c.length?3.5:1.2)*e,f=i.x+Eh(l-i.x,-d,d),u=o;for(let x of c)Math.abs(f-x.x)>=x.half||Math.abs(u-x.z)>=x.depth||(Math.abs(i.x-x.x)>=x.half?f=x.x+Math.sign(i.x-x.x)*(x.half+.002):r<=x.z?u=Math.min(u,x.z-x.depth-.002):u=Math.max(u,x.z+x.depth+.002));let p=f-i.x;i.marched+=Math.hypot(p,u-r),i.yaw+=(Eh(Math.atan2(p,Math.max(e*2,u-r)),-.6,.6)-i.yaw)*(1-Math.exp(-8*e)),i.x=f,i.z=u}function Hd(s,e,t){let n=s.worldAdvance>0?s.roadSpeed:0;return!Ah(s,t-n*1.55,t+.25).some(i=>Math.abs(e-i.x)<i.half&&i.z-i.depth<=t&&i.z+n*1.55+i.depth>=t)}var Sr=(s,e,t)=>Math.max(e,Math.min(t,s)),Wg=new Set(["cache","bridge","coil","cover"]);function Xg(s,e,t){let n=Sh(e.x,s.distance-e.z+.85,t,s.stage);n.z=s.distance-n.at,s.gates.push(n),s.event("supplyBreak",e.x,.65,n.z)}function Gd(s,e,t){if(e.state!=="ready")return;let n=e.variant==="shutter"&&Math.abs(t.x-e.x)<.51,i=t.damage;if(n&&(i*=2.25),e.variant==="crates"&&t.kind==="rocket"&&(i*=1.4),e.hp=Math.max(0,e.hp-i),e.flash=1,e.hp>0){s.event(n?"latchHit":"wallHit",t.x,.65,t.z,.55);return}if(e.age=0,e.kind==="cover")if(e.state="open",e.variant==="glass"){s.event("glassBreak",e.x,.48,e.z);let r=a=>{a.alive&&Math.hypot(a.x-e.x,a.z-e.z)<2.45&&s.kill(a,.82,e.x)};for(let a of s.columns)for(let o of a.units)r(o);for(let a of s.runners)r(a)}else s.event(e.variant==="crates"?"crateBreak":"wallBreak",e.x,.48,e.z);else if(e.kind==="cache")e.state="open",s.event("wallBreak",e.x,.57,e.z),Xg(s,e,e.reward);else if(e.kind==="bridge")e.state="cut",s.event("chainSnap",e.x,.85,e.z),s.notice(Mr(e.lane)+"\u540A\u6865\u5DF2\u843D\uFF0C\u589E\u63F4\u88AB\u622A\u65AD");else if(e.kind==="coil"){e.state="discharged",s.event("discharge",e.x,.5,e.z,1.35);let r=a=>{a.alive&&Math.abs(a.z-e.z)<7&&Math.abs(a.x-e.x)<5.1&&s.kill(a,.9,e.x)};for(let a of s.columns)for(let o of a.units)r(o);for(let a of s.runners)r(a);s.boss.active&&!s.boss.defeated&&Math.abs(s.boss.z-e.z)<6&&Math.abs(s.boss.x-e.x)<5&&s.damageBoss(t,24)}}function Vd(s){let e=s.boss,t=s.bossEntryStride,n=Math.max(4,(-23-e.z)*t/(2.3+t)),i=e.z+n+3,r=Aa(s,e.z-1.1,i+3.8);for(let o of[-2,-4,-6]){if(!r.conflicts)break;let c=Math.max(e.z+5,e.z+n+3+o),l=Aa(s,e.z-1.1,c+3.8);l.conflicts<r.conflicts&&(r=l,i=c)}e.x=e.escortX=r.x;let a=Ta({kind:"gap",lane:r.lane,length:4,at:s.distance-i},s.stage);a.z=s.distance-a.at,a.finale=!0,s.features.push(a)}function qg(s,e){let i=.66-e.z;if(e.state==="ready"&&s.phase!=="clear"&&i<=7.8&&(e.state="warning",e.age=0,s.notice(Mr(e.lane)+"\u540A\u8D27\u5760\u843D\uFF0C\u907F\u5F00\u5730\u6807")),e.state!=="warning"||(e.progress=Sr(1-i/7.8,0,1),e.fallProgress=Sr(1-i/(.55*s.roadSpeed),0,1),i>0))return;e.state="landed",e.age=0,s.event("impact",e.x,.18,e.z,1.35);let r=(o,c)=>Math.hypot(o-e.x,c-e.z)<=e.radius;function a(o){o.alive&&r(o.x,o.z)&&s.kill(o,1.08,e.x)}for(let o of s.columns)for(let c of o.units)a(c);for(let o of s.runners)a(o);if(s.allies=s.allies.filter(o=>r(o.x,o.z)?(s.fall(o,"blue",1.15,e.x),!1):!0),!!r(s.x,s.captainZ)){if(s.buffs.shield>0){s.event("shieldHit",s.x,.55,s.captainZ);return}s.hitGuard>0||(s.hurt=1,s.hitGuard=1.2,--s.armor<=0&&(s.lossReason="skyfall",s.finish(!1)))}}function Wd(s,e){s.activeGround.length=0;for(let t of s.features)if(t.z=s.distance-t.at,t.age+=e,t.flash=Math.max(0,t.flash-e*6),!(t.z<s.entryZ-12||t.z>15)){if(t.kind==="skyfall"){if(qg(s,t),!s.playing)return;continue}if((t.kind==="bridge"||t.kind==="gap"||t.kind==="belt")&&s.activeGround.push(t),!t.warned&&t.z>-22&&t.z<-14&&t.state==="ready"&&!t.finale){t.warned=!0;let n=Mr(t.lane),i={gap:n+"\u65AD\u6865\uFF0C\u63D0\u524D\u6362\u9053",bridge:"\u6253\u65AD"+n+"\u540A\u7D22\uFF0C\u622A\u4F4F\u589E\u63F4",cache:"\u6253\u788E"+n+"\u7816\u5899\uFF0C\u53D6\u51FA\u8865\u7ED9",cover:t.variant==="glass"?n+"\u73BB\u7483\u74F6\uFF0C\u51FB\u788E\u53EF\u9707\u5012\u8FD1\u5175":t.variant==="crates"?n+"\u6728\u7BB1\uFF0C\u91CD\u70AE\u62C6\u5F97\u5FEB":n+"\u94A2\u95F8\uFF0C\u7784\u51C6\u6A59\u8272\u9501\u6263",coil:"\u51FB\u4E2D"+n+"\u7EBF\u5708\uFF0C\u653E\u7535\u6E05\u5175",belt:n+"\u4F20\u9001\u5E26\u5411"+(t.direction>0?"\u53F3":"\u5DE6")};s.notice(i[t.kind])}if(Wg.has(t.kind)&&(t.target??(t.target={mechanism:t}),t.target.x=t.x,t.target.z=t.z+(t.kind==="bridge"?t.length/2+.24:0)),s.phase!=="clear"&&!t.escorted&&t.kind==="cache"&&t.z>=s.entryZ-5&&t.z<-8){t.escorted=!0;for(let n=0;n<2;n++)for(let i=-1;i<=1;i++){let r=s.grunt(t.x+i*.48,s.entryZ-.95-n*.59);r.speed=2.62,s.runners.push(r)}}if(s.phase!=="clear"&&t.kind==="bridge"&&t.state==="ready"&&t.z>=-7.1&&(t.state="linked",t.age=0,s.flanks.push({x:t.lane===0?4.44:t.x,remaining:s.route.siege?27:16+Math.floor(s.stage/3),next:0}),s.notice(Mr(t.lane)+"\u540A\u6865\u63A5\u901A\uFF0C\u589E\u63F4\u6765\u4E86")),t.kind==="belt"&&Math.abs(t.z-s.captainZ)<t.length/2&&Math.abs(s.x-t.x)<4.4/2-.1&&!s.rope&&s.aim(s.targetX+t.direction*e*1.32),ks(t)&&s.planks&&t.z>-5.2&&t.z<1&&Math.abs(s.x-t.x)<4.4/2+.2&&!s.rope&&(s.planks--,t.state="repaired",t.age=0,s.event("plus",t.x,.24,t.z),s.notice(Mr(t.lane)+"\u5DF2\u642D\u597D\u4FBF\u6865")),ks(t)&&Math.abs(t.z)<t.length/2+2.8&&(s.allies=s.allies.filter(n=>{if(!$o(t,n.x,n.z,.14))return!0;let i=s.fall(n,"blue",0);return i.intoGap=!0,i.vy=-.5,!1}),!s.rope&&$o(t,s.x,s.captainZ,.22))){if(s.armor--,s.hurt=1,s.armor<=0){s.lossReason="gap",s.finish(!1);return}let n=t.lane===-1?1:t.lane===1?-1:s.x>=t.x?1:-1;s.rope={age:0,from:s.x,to:t.x+n*(4.4/2+.75)},s.aim(s.rope.to),s.hitGuard=1.05,s.notice("\u5B89\u5168\u7EF3\u62C9\u56DE\u961F\u957F\uFF0C\u62A4\u7532 \u22121")}}for(let t of s.flanks)if(t.next-=e,t.remaining>0&&t.next<=0){t.next+=.16,t.remaining--;let n=s.grunt(t.x+(t.remaining%3-1)*.12,s.entryZ-.92);n.speed=3.18,n.flank=!0,s.route.siege&&t.remaining%5===0&&(n.role="guard",n.size*=1.32,n.hp=9),s.runners.push(n)}s.flanks=s.flanks.filter(t=>t.remaining>0)}function Xd(s,e,t){e.lift=0;for(let n of s.activeGround){let i=e.z-n.z;if(n.kind==="belt"&&Math.abs(i)<n.length/2&&Math.abs(e.x-n.x)<4.4/2){e.x=Sr(e.x+n.direction*t*.65,-6,6);continue}if(!ks(n)||i<-n.length/2-4.3||i>n.length/2+.45||Math.abs(e.x-n.x)>4.4/2+.16)continue;if(e.role==="vault"){let o=Sr((i+n.length/2+.55)/(n.length+1.1),0,1);e.lift=1.08*Math.sin(Math.PI*o);return}let r=n.lane===-1?1:n.lane===1||e.laneX<n.x?-1:1,a=n.x+r*(4.4/2+.24);if(e.x+=Sr(a-e.x,-3.8*t,3.8*t),$o(n,e.x,e.z,.22)){e.alive=!1;let o=s.fall(e,"red",0);o.intoGap=!0,o.vy=-.7}return}}function qd(s,e){let t=s.boss;t.vault={piece:e,t:0,from:t.z-e.z,to:e.length/2+1.08},t.attackT=0,t.recovery=.15,e.crossed=!0}function Yd(s,e){let t=s.boss,n=t.vault;n.airDash&&(n.piece.z+=s.worldAdvance),n.t+=e;let i=Sr((n.t-.21)/.89,0,1),r=i*i*(3-2*i);t.z=n.piece.z+n.from+(n.to-n.from)*r,t.lift=2.5*4*i*(1-i),n.t>=1.1&&!n.landed&&(n.landed=!0,s.event("vaultLand",t.x,.06,t.z,.9)),n.t>=1.35&&(t.vault=null,t.lift=0,t.recovery=.34)}var kn=(s,e,t)=>Math.max(e,Math.min(t,s)),el=Math.PI*2,Zd=21,Kd=5.45,Yg=1.38,jo=11,Rh=2.47,Jd=[[-1,1],[1,0],[-1,0],[1],[0,-1],[1,-1],[0],[0,1],[-1]],Qo=11;function Ch(s,e){let t=0,n=s,i=8;for(;n>=i;)n-=i,t++,i=8+6*t;let r=el*n/i+.21+t*.18,a=.93+(e-1)*.46+t*.51;return[Math.cos(r)*a,Math.sin(r)*a*.92]}var tl=class{constructor(e=()=>{}){this.emit=e,this.reset()}reset(e=1){this.stage=kn(Math.trunc(Number(e))||1,1,_i),this.route=Bi[this.stage-1],this.features=this.route.features.map(i=>Ta(i,this.stage)),this.activeGround=[],this.flanks=[],this.rope=null,this.planks=0,this.overrun=null,this.parade=null,this.chill=0,this.hint=null,this.hintSequence=0,this.rallyZ=-100,this.seed=129920+(this.stage-1)*1141,this.sequence=0,this.phase="ready",this.elapsed=0,this.distance=0,this.captainZ=0,this.targetZ=0,this.caught=!1,this.caughtBy=null,this.lossReason=null,this.worldAdvance=0,this.x=0,this.targetX=this.x,this.velocity=0,this.upgrades=0,this.scale=1,this.visualScale=1,this.recoil=0,this.mergeGlow=0,this.hurt=0,this.armor=3,this.shots=[],this.incoming=[],this.enemyFireTimer=0,this.allies=[],this.falling=[],this.deliveries=[],this.runners=[],this.rocketTimer=.18,this.volleyTimer=.06,this.volley=0,this.buffs={rapid:0,shield:0,plasma:0,spread:0,drone:0,fever:0,frost:0,range:0,longshot:0},this.supportTimer=0,this.feverMeter=0,this.row=0,this.toNextRow=0,this.entryZ??(this.entryZ=-46),this.finaleRow=this.route.finale,this.lastRow=this.finaleRow+(this.route.siege?30:18),this.hitGuard=0,this.score=0,this.recruits=0,this.endTime=0;let t=this.route.wallHP;this.wall={x:4.13,z:-Zd,hp:t,maxHp:t,flash:0};let n=this.route.bossHP;this.boss={x:-.42,z:this.entryZ-1.4,hp:n,maxHp:n,marched:0,hit:0,lift:0,active:!1,defeated:!1,removed:!1,skill:null,nextCast:0,kind:this.route.boss,vault:null,moveClock:0,special:0,pattern:0,brace:0,defeatAge:0,attackT:0,impactDone:!1,pursuing:!1,yaw:0,recovery:0,leapFromX:0,leapFromZ:0,landX:0,landZ:0},this.gates=zd(this.stage,this.features),this.gates[2].cover=this.wall;for(let i of this.gates)i.coverSpec&&(i.cover=Ta(i.coverSpec,this.stage),this.features.push(i.cover));this.bossEntryStride=8.15,this.bossStride=1.02+Math.min(.27,(this.stage-1)*.014),this.marchSpeed=Rh+Math.min(.28,(this.stage-1)*.012),this.wave=null,this.columns=Array.from({length:jo},(i,r)=>({index:r,minX:1/0,maxX:-1/0,units:[]})),this.recruit(this.x,!0)}rand(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}grunt(e,t){let n=e+(this.rand()-.5)*.16;return{x:n,laneX:n,z:t+(this.rand()-.5)*.08,id:++this.sequence,phase:this.rand()*el,marched:0,yaw:0,size:.92+this.rand()*.13,alive:!0}}event(e,t,n,i,r=1,a=null){this.emit({kind:e,x:t,y:n,z:i,strength:r,supply:a})}notice(e){this.hint={id:++this.hintSequence,text:e}}start(){this.phase==="ready"&&(this.phase="run",this.stage===1&&this.notice("\u5DE6\u53F3\u79FB\u52A8\uFF0C\u5BF9\u51C6 +3 \u62DB\u52DF\u58EB\u5175"))}aim(e,t=this.targetZ){this.targetZ=kn(t,0,Yg),this.targetX=kn(e,-Kd,Kd)}get playing(){return this.phase==="run"||this.phase==="boss"||this.phase==="clear"}get roadSpeed(){return this.boss.active?this.boss.defeated?2.3:2.3-1.48*Et(this.boss.z,-16,-10):3.65}get cannonDamage(){return 26+this.upgrades*5+Math.round((this.stage-1)*.88)}nextSlot(){let e=new Set(this.allies.map(n=>n.slot));for(let n of this.deliveries)n.slot!=null&&e.add(n.slot);let t=0;for(;e.has(t);)t++;return t}recruit(e,t=!1,n=this.nextSlot()){if(this.allies.length>=48)return;let[i,r]=Ch(n,this.scale);this.allies.push({slot:n,x:kn(e+i,-6.28,6.28),z:this.captainZ+r,age:t?2:0,phase:this.rand()*el}),t||this.recruits++}openCard(e){if(!e.active||e.cover?.hp>0)return;if(e.active=!1,e.collectedAt=this.elapsed,e.pop=0,this.event("supplyBreak",e.x,.62,e.z,1,e.type),e.type==="blast"){let n=e.x;this.blast({x:n,power:5.8},e.z-1.5),this.boss.active&&Math.hypot(this.boss.x-n,this.boss.z-e.z+1.5)<4.6&&this.damageBoss({kind:"rocket"},48);return}let t=wn[e.type].count;for(let n=0;n<(t||1);n++){let i=t?this.nextSlot():null;if(i!=null&&i>=48)break;this.deliveries.push({type:e.type,slot:i,sx:e.x,sz:e.z,x:e.x,z:e.z,y:.46,age:-n*.065,progress:0,phase:this.rand()*el})}}updateDeliveries(e){for(let t of this.deliveries){if(t.age+=e,t.age<0)continue;let n=Math.min(1,t.age/.58),i=n*(2-n),[r,a]=t.slot==null?[0,-.18]:Ch(t.slot,this.scale);if(t.progress=n,t.x=t.sx+(kn(this.x+r,-6.28,6.28)-t.sx)*i,t.z=t.sz+(this.captainZ+a-t.sz)*i,t.y=.46*(1-n)+Math.sin(Math.PI*n)*(1.05+Math.min(1.25,Math.abs(t.sz)*.075)),!(n<1))if(t.slot!=null)this.recruit(this.x,!1,t.slot),this.event("plus",t.x,.12,t.z,.7);else{if(t.type==="merge")this.upgrades++,this.scale=1+Math.min(.64,this.upgrades*.13);else if(t.type==="engineer")this.planks=Math.min(2,this.planks+1),this.notice("\u4FBF\u6865 +1\uFF0C\u9760\u8FD1\u7F3A\u53E3\u81EA\u52A8\u67B6\u6865");else if(t.type==="medic"){this.armor=Math.min(3,this.armor+1);for(let o=0;o<2;o++)this.recruit(this.x);this.notice("\u6551\u63F4\u5230\u961F\uFF0C\u62A4\u7532 +1")}else if(t.type==="range"||t.type==="longshot")this.buffs[t.type]=t.type==="range"?7:5.5,this.notice(t.type==="range"?"\u5168\u961F\u8FDC\u5C04 \xB7 7\u79D2":"\u7A7F\u7532\u8FDC\u5C04 \xB7 5.5\u79D2");else{let o=t.type==="fever"?4.2:t.type==="shield"?5:6;this.buffs[t.type]=o}this.mergeGlow=1,this.event("merge",this.x,.23,this.captainZ,1,t.type)}}this.deliveries=this.deliveries.filter(t=>t.progress<1)}crossGates(){for(let e of this.gates){if(e.z=this.distance-e.at,!e.active){e.pop=this.elapsed-e.collectedAt;continue}this.caught||Math.abs(e.z-this.captainZ)>.83||Math.abs(this.x-e.x)<=zi/2+this.scale*.16&&this.openCard(e)}}marchPastBoss(e,t){let n=this.boss,i=e.z-n.z;if(!e.passSide&&e.x===e.laneX&&(i<-3.3||i>6.4))return;let r=n.attackT>0?n.landZ:n.z+.45,a=1-Et(Math.abs(i),1.45,3.25),o=n.attackT>0?1-Et(Math.abs(e.z-r),1.25,3.45):0,c=Math.max(1.42*a,1.9*o*Et(n.attackT,0,.31));if(c?e.passSide||(e.passSide=e.x<n.x?-1:1):e.passSide=0,!c&&e.x===e.laneX)return;let l=e.passSide||1,h=Math.max(.2,l>0?6.4-n.x:n.x+6.4),d=kn(Math.abs(e.laneX-n.x)/h,0,1),f=e.laneX+l*c*(1-d);e.x+=(f-e.x)*(1-Math.exp(-9*t)),!c&&Math.abs(e.x-e.laneX)<.002&&(e.x=e.laneX)}spawnRow(){let e=Math.floor(this.row/Qo),t=this.row%Qo;if(!this.wave||this.row%(Qo*2)===0){let a=Math.floor(e/2)+(this.stage-1)*2,o=this.stage%2?1:-1;this.wave=Jd[a%Jd.length].map(h=>h*o);let c=this.distance+6+(-this.entryZ-6)*3.65/(3.65+this.marchSpeed),l=this.gates.find(h=>h.coverSpec&&Math.abs(h.at-c)<5.2);if(l&&a%3!==2){let h=l.coverSpec.lane;this.wave=this.wave.filter(d=>d!==h),this.wave.length||(this.wave=[h===0?o:0])}}let n=this.wave.length===1,r=this.row>=this.finaleRow-44?this.route.siege?.8:.52:1;for(let a of this.columns){let o=a.index,c=n?9:o<6?6:5,l=Math.max(2,Math.round(Math.min(c,c*(.32+.68*this.route.pressure))*r)),h=n||o<6?o:o-6,d=this.wave[n||o<6?0:1];if(h>=l||t<2&&(h===0||h===l-1))continue;let f=n?.43:.52,u=(this.row%2-.5)*.15,p=Oi(d)+(h-(l-1)/2)*f+u,x=this.entryZ-.86-.12*(h%2),g=a.units.at(-1),m=g?Math.min(x,g.z-.4):x,v=this.grunt(p,m);if(a.minX=Math.min(a.minX,v.x),a.maxX=Math.max(a.maxX,v.x),t===5&&a.index===e*7%jo&&this.stage>=2){let M=["gunner"];this.stage>=3&&M.push("weaver","brute","vault"),this.stage>=4&&M.push("guard"),this.stage>=5&&M.push("bomber","standard"),this.stage>=7&&M.push("courier"),v.role=M[(e+this.stage)%M.length];let _=v.role==="brute"||v.role==="guard";v.size*=_?1.42:1.1,v.hp=_?9+this.stage*.65:3.2+this.stage*.27,v.speed=_?2.02:v.role==="weaver"?3.47:2.77,this.runners.push(v)}else t===2&&(a.index===e*3%jo||a.index===(e*3+5)%jo)?(v.speed=3.4+this.rand()*.25,this.runners.push(v)):a.units.push(v)}this.row++}moveGrunt(e,t,n){if(this.phase==="clear"&&(e.spent||e.z>this.captainZ+.75)&&(!e.overBody||e.z>e.overBody.z+1.06)){e.spent=!0,e.overBody=null;let h=this.x+(e.id%5-2)*.28,d=this.captainZ-2.15-e.id%3*.28,f=kn(h-e.x,-5.1*t,5.1*t),u=kn(d-e.z,-4.7*t,4.7*t);e.x+=f,e.z+=u,e.marched+=Math.hypot(f,u-this.worldAdvance),Math.abs(u)+Math.abs(f)>.001&&(e.yaw+=(Math.atan2(f,u)-e.yaw)*(1-Math.exp(-7*t)));return}let i=e.speed>=3.12,r=!e.spent&&e.z>=this.captainZ+(i?-8.4:-6.9)&&e.z<this.captainZ+1.65,a=e.x,o=e.speed??this.marchSpeed,c=0;if(r){let h=this.x,d=this.captainZ,f=Math.abs(h-e.x);for(let g of n){let m=Math.abs(g.x-e.x);m<f&&(f=m,h=g.x,d=g.z)}o*=i?1.48:1.32;let u=Math.max(.075,(d-e.z-.32)/(this.worldAdvance/t+o)),p=i?12.2:11.6,x=(e.id%7-3)*.065;c=kn((h+x-e.x)/u,-p,p)*t,e.role==="weaver"&&(c+=Math.sin(e.phase+e.marched*7)*t*.74),e.x+=c}else if(e.spent)e.overX!=null&&(e.x+=kn(e.overX-e.x,-3.3*t,3.3*t));else if(this.boss.active&&!this.boss.defeated){let h=e.x;this.marchPastBoss(e,t),c=e.x-h}if(this.activeGround.length?Xd(this,e,t):e.lift=0,!e.alive)return;this.buffs.frost>0&&(o*=.48,e.x=a+(e.x-a)*.6),Math.abs(e.z-this.rallyZ)<2.7&&(o*=1.17),c=e.x-a;let l=o*t;e.z+=this.worldAdvance+l,e.marched+=Math.hypot(l,c),e.yaw+=(Math.atan2(c,l)-e.yaw)*(1-Math.exp(-9*t)),e.role==="gunner"&&!e.fired&&e.z>=-14&&e.z<-4&&this.enemyFireTimer<=0&&(this.enemyRound(e.x,e.z,.65,0,e),e.fired=!0),!e.spent&&e.z>this.captainZ-2&&e.z<this.captainZ+2.3&&this.contact(e)}advanceCrowd(e){this.rallyZ=this.runners.find(n=>n.alive&&n.role==="standard"&&n.z>-10)?.z??-100;let t=this.allies.filter(n=>n.z<=this.captainZ+.18);for(let n of this.columns){n.minX=1/0,n.maxX=-1/0;let i=0,r=!1;for(let a of n.units)a.alive&&(this.moveGrunt(a,e,t),!(!a.alive||a.z>10&&this.phase!=="clear")&&(n.minX=Math.min(n.minX,a.x),n.maxX=Math.max(n.maxX,a.x),i&&n.units[i-1].z<a.z&&(r=!0),n.units[i++]=a));n.units.length=i,r&&n.units.sort((a,o)=>o.z-a.z)}for(let n of this.runners)n.alive&&this.moveGrunt(n,e,t);for(this.runners=this.runners.filter(n=>n.alive&&(n.z<10||this.phase==="clear")),this.toNextRow-=this.worldAdvance+this.marchSpeed*e;this.row<this.lastRow&&this.toNextRow<=0;)this.spawnRow(),this.toNextRow+=this.route.rowSpacing+(this.row%Qo===0?.38:0),this.row>=70&&Math.abs(this.row-this.finaleRow)>10&&(this.row-70)%this.route.restEvery===0&&(this.toNextRow+=this.route.restLength)}contact(e){if(!this.playing||this.caught)return;let t=this.allies.findIndex(r=>Math.abs(r.x-e.x)<.32&&Math.abs(r.z-e.z)<.32),n=Math.abs(e.x-this.x)<.39*this.scale&&Math.abs(e.z-this.captainZ)<.4;if(t<0&&!n)return!1;let i=e.startZ!=null;if(i||e.role==="bomber"?e.alive=!1:(e.spent=!0,e.overX=t>=0?this.allies[t].x:this.x),this.hitGuard>0)return!0;if(this.hitGuard=this.buffs.shield>0?.46:this.route.contactGrace,this.buffs.shield>0)return this.event("shieldHit",e.x,.35,e.z),!0;if(this.hurt=1,e.role==="bomber")return this.event("impact",e.x,.1,e.z,.87),this.allies=this.allies.filter(r=>Math.hypot(r.x-e.x,r.z-e.z)>.95?!0:(this.fall(r,"blue",1.2,e.x),!1)),n&&!this.allies.length&&--this.armor<=0&&(this.lossReason="infantry",this.finish(!1,e)),!0;if(t<0&&this.allies.length){let r=1/0;this.allies.forEach((a,o)=>{let c=(a.x-e.x)**2+(a.z-e.z)**2;c<r&&(r=c,t=o)})}if(t>=0){let r=this.allies.splice(t,1)[0],a=this.fall(r,"blue",0);a.prone=!0,a.dir=r.x>=e.x?1:-1,i||(e.overX=r.x,e.overBody=a)}else--this.armor<=0&&(this.lossReason=i&&e.shooter===this.boss?"bossShot":"infantry",this.finish(!1,i?e.shooter:e));return!0}enemyRound(e,t,n,i=0,r=this.boss){let o=this.x+i-e,c=Math.max(1,this.captainZ-t),l=Math.hypot(o,c);this.incoming.push({x:e,z:t,y:n,startY:n,startZ:t,shooter:r,vx:o*7.4/l,vz:c*7.4/l,alive:!0}),this.enemyFireTimer=1.35,this.event("hostileMuzzle",e,n,t)}advanceIncoming(e){this.enemyFireTimer=Math.max(0,this.enemyFireTimer-e);for(let t of this.incoming)t.x+=t.vx*e,t.z+=t.vz*e,t.y=.45+(t.startY-.45)*kn(t.z/t.startZ,0,1),t.z>this.captainZ-2&&t.z<this.captainZ+2.3&&this.contact(t)&&this.event("hostileMuzzle",t.x,t.y,t.z);this.incoming=this.incoming.filter(t=>t.alive&&t.z<6)}pushWall(e,t=this.wall,n=2.14){let i=(r,a,o)=>t.hp>0&&Math.abs(r-t.x)<n+o&&Math.abs(a-t.z)<.32+o;this.allies=this.allies.filter(r=>{if(!i(r.x,r.z,.19))return!0;this.fall(r,"blue",0);let a=this.falling[this.falling.length-1];return a.pushed=!0,a.front=t.z+.55,!1}),!this.caught&&i(this.x,this.captainZ,.32*this.visualScale)&&(this.caught=!0,this.caughtBy=t),this.caught&&this.caughtBy===t&&(this.captainZ=Math.max(this.captainZ,t.z+.38),this.captainZ>=4.5&&(this.lossReason="wall",this.finish(!1)))}fall(e,t,n,i=e.x){if(this.falling.length>=96){let a=this.falling.findIndex(o=>o.side==="red");this.falling.splice(a<0?0:a,1)}let r={x:e.x,z:e.z,y:.07,t:0,side:t,phase:e.phase||0,size:e.size||1,id:e.id||0,vx:(e.x-i)*1.05+(this.rand()-.5)*2.8*n,vz:(this.rand()-.5)*2.4*n,vy:(1.65+this.rand()*2.3)*n,spin:(this.rand()-.5)*8,roll:(this.rand()-.5)*7};return this.falling.push(r),r}kill(e,t=1,n=e.x){if(!(!e.alive||e.overBody&&e.z<e.overBody.z+.84)&&(e.alive=!1,this.score++,this.buffs.fever<=0&&(this.feverMeter+=.21,this.feverMeter>=100&&(this.feverMeter=0,this.buffs.fever=4.2,this.event("merge",this.x,.2,this.captainZ))),this.fall(e,"red",t,n),e.role==="courier"&&this.playing)){let i={x:e.x,z:e.z,type:"medic",active:!0};this.openCard(i)}}closeEnemy(e,t){let i=null,r=(a,o)=>{let c=t-a.z;c<0||c>2.35+o||Math.hypot(a.x-e,c)>2.35+o||(!i||a.z>i.z||a.z===i.z&&Math.abs(a.x-e)<Math.abs(i.x-e))&&(i=a)};this.boss.active&&!this.boss.defeated&&r(this.boss,.78);for(let a of this.columns)if(!(a.maxX<e-2.35-.25||a.minX>e+2.35+.25))for(let o of a.units){if(o.z<t-2.35-.25)break;o.alive&&r(o,.2)}for(let a of this.runners)a.alive&&r(a,.2);return i}launch(e,t,n,i,r,a,o=0){let c=1/Math.hypot(1,o),l={kind:i===_r?"rocket":"shot",profile:i,power:r,damage:a,headingX:o*c,headingZ:-c,startX:e,startY:t,startZ:n,x:e,y:t,z:n,distance:0,range:this.buffs.range>0||this.buffs.longshot>0?Dd:Nd,age:0,afterHit:0,finished:!1,pierce:i===zs?3:this.buffs.longshot>0&&i!==_r?1:0},h=this.firstHit(l,l.range);if(o===0&&(!h||h.distance>2.35)){let f=this.closeEnemy(e,n);if(f){let u=f.x-e,p=Math.min(-.06,f.z-n),x=Math.hypot(u,p);l.headingX=u/x,l.headingZ=p/x,l.range=Math.min(l.range,x+.75),h=this.firstHit(l,l.range)}}l.aimDistance=Math.max(.12,h?h.distance:l.range),l.endY=h?.target===this.boss?zn[this.boss.kind].aim:h?.target===this.wall||h?.target.type||h?.target.mechanism?.72:.48;let d=(this.boss.z-n)/l.headingZ;i===_r&&this.boss.active&&!this.boss.defeated&&d>0&&d<l.range&&Math.abs(e+l.headingX*d-this.boss.x)<=1.26&&h?.target!==this.wall&&!h?.target.type&&!h?.target.mechanism&&(l.aimDistance=Math.max(.12,d),l.endY=zn[this.boss.kind].aim),l.lift=i.lift*Math.min(1,l.aimDistance/9),this.shots.push(l)}shoot(e){let t=this.buffs.fever>0,n=(t?.62:this.buffs.rapid>0?.72:1)*(this.chill>0?1.32:1);if(this.rocketTimer-=e,this.rocketTimer<=0){this.rocketTimer+=.69*n,this.recoil=1;let i=this.x+.295*this.visualScale,r=1.31*this.visualScale,a=this.captainZ-.6*this.visualScale,o=1+Math.min(1.7,this.upgrades*.28);this.launch(i,r,a,_r,o,this.cannonDamage),this.event("muzzle",i,r,a,o)}if(this.volleyTimer-=e,this.volleyTimer<=0){this.volleyTimer+=.27*n,this.volley++;for(let i of this.allies){if(i.age<.12)continue;let r=i.x+.13,a=i.z-.22,o=(t||this.buffs.plasma>0)&&(i.slot+this.volley)%3===0,c=o?zs:i.slot%4===1?Zo:vh;this.launch(r,.58,a,c,1,o?6:2.8),(t||this.buffs.spread>0)&&i.slot%2===0&&this.launch(r,.58,a,vh,1,2.8,(this.volley%2?1:-1)*.09)}this.allies.length&&this.event("smallShot",this.x,.6,0,.7)}if(this.supportTimer-=e,this.buffs.drone>0&&this.supportTimer<=0){this.supportTimer=.36;for(let i of[-1,1])this.launch(this.x+i*1.15,1.3,this.captainZ-.32,zs,1,6)}}firstHit(e,t){let n=e.headingX,i=e.headingZ,r=e.x+n*t,a=e.z+i*t,o=e.kind==="rocket"?.15:.07,c=null,l=(h,d,f)=>{if(h.overBody&&h.z<h.overBody.z+.84)return;let u=d+o,p=f+o,x=Math.max(0,(h.z+p-e.z)/i),g=Math.min(t,(h.z-p-e.z)/i);if(Math.abs(n)<1e-6){if(Math.abs(e.x-h.x)>u)return}else{let m=(h.x-u-e.x)/n,v=(h.x+u-e.x)/n;x=Math.max(x,Math.min(m,v)),g=Math.min(g,Math.max(m,v))}if(!(x>g||c&&x>=c.distance)){if(e.aimDistance!==void 0&&h!==this.wall&&!h.type&&!h.mechanism){let m=h.lift||0,v=m+(h===this.boss?zn[h.kind].height:.92*(h.size||1))+o,M=Ko(e,e.distance+x),_=Ko(e,e.distance+g);if(Math.min(M,_)>v||Math.max(M,_)<m-o)return;M>v&&M>_&&(x+=(g-x)*(M-v)/(M-_))}c={target:h,distance:x}}};this.wall.hp>0&&l(this.wall,2.1,.32);for(let h of this.features)h.target&&h.state==="ready"&&h.target.z>=a-.7&&h.target.z<=e.z+.7&&l(h.target,h.half,h.depth);for(let h of this.gates)h.active&&!(h.cover?.hp>0)&&h.z>=a-.36&&h.z<=e.z+.36&&l(h,zi/2,.15);this.boss.active&&!this.boss.defeated&&l(this.boss,1.26,.7);for(let h of this.columns)if(!(h.maxX<Math.min(e.x,r)-.42||h.minX>Math.max(e.x,r)+.42))for(let d of h.units){if(d.z<a-.42)break;d.alive&&d.z<e.z+.42&&l(d,.245,.23)}for(let h of this.runners)h.alive&&l(h,.25*h.size,.23*h.size);return c}blast(e,t){let n=.95+e.power*.48;for(let i of this.columns)if(!(i.maxX<e.x-n||i.minX>e.x+n))for(let r of i.units){if(r.z<t-n)break;r.alive&&(r.x-e.x)**2+(r.z-t)**2<n*n&&this.kill(r,1.18,e.x)}for(let i of this.runners)i.alive&&(i.x-e.x)**2+(i.z-t)**2<n*n&&this.kill(i,1.18,e.x);this.event("impact",e.x,.06,t,e.power)}damageBoss(e,t){let n=this.boss;n.defeated||(n.hp=Math.max(0,n.hp-t*(n.brace>.6?.55:1)),n.hit=e.kind==="rocket"?.77:Math.max(n.hit,.1),n.hp<=0&&(n.defeated=!0,n.skill=null,n.defeatAge=0,this.phase="clear",this.lastRow=this.row,this.event("finisher",n.x,2.3,n.z,1.5)))}resolveHit(e,t){if(t.mechanism){Gd(this,t.mechanism,e);return}if(t===this.wall)t.hp=Math.max(0,t.hp-e.damage*.72),t.flash=1,this.event(t.hp<=0?"wallBreak":"wallHit",e.x,.85,e.z,e.kind==="rocket"?1.15:.45);else if(t.type&&wn[t.type])t.hp=Math.max(0,t.hp-e.damage),t.flash=1,t.hp<=0?this.openCard(t):this.event("cardHit",e.x,.6,e.z,.7,t.type);else if(t===this.boss)this.event(e.kind==="rocket"?"impact":"hit",e.x,e.y,e.z,e.kind==="rocket"?e.power*.7:.7),this.damageBoss(e,e.damage*(e.profile===_r?4.2:1));else if(e.kind==="rocket"){this.blast(e,t.z);let n=this.boss;n.active&&n.lift<.85&&Math.hypot(e.x-n.x,t.z-n.z)<1.65+e.power*.48&&this.damageBoss(e,e.damage*.65)}else t.hp!=null&&(t.hp-=e.damage*(t.role==="guard"&&e.profile!==zs?.65:1)),(t.hp==null||t.hp<=0)&&this.kill(t,.72),this.event("hit",e.x,.45,e.z,.65)}advanceShots(e){let t=[];for(let n of this.shots){if(n.age+=e,n.finished){n.afterHit+=e,n.afterHit*n.profile.speed<n.profile.tail&&t.push(n);continue}let i=Math.min(e*n.profile.speed,n.range-n.distance);for(;i>0&&!n.finished&&this.playing;){let r=this.firstHit(n,i),a=r?r.distance:i;n.distance+=a,!r&&n.range-n.distance<1e-8&&(n.distance=n.range),i-=a,yr(n,n.distance,n),r&&this.resolveHit(n,r.target);let o=r&&n.pierce>0&&r.target.alive===!1;o&&n.pierce--,n.finished=!!r&&!o||n.distance>=n.range-1e-8}if(!this.playing)break;t.push(n)}this.shots=this.playing?t:[]}updateFalling(e){for(let t of this.falling){if(t.prone){t.t+=e,t.z+=this.worldAdvance;continue}if(t.intoGap){t.t+=e,t.vy-=e*8,t.y+=t.vy*e,t.z+=this.worldAdvance;continue}if(t.pushed){t.z=Math.max(t.z,t.front),t.z+=this.worldAdvance,t.y=0,t.z>7&&(t.t=2);continue}t.t+=e,t.x+=t.vx*e,t.z+=t.vz*e+this.worldAdvance*.38,t.y+=t.vy*e,t.vy-=(t.gravity??8.6)*e,t.y<.05&&(t.y=.05,t.vx*=.9,t.vz*=.9)}this.falling=this.falling.filter(t=>t.t<(t.prone?this.overrun?4.9:2.1:1.02))}slamSquad(){let e=this.boss;if(this.event("slam",e.landX,.08,e.landZ,1.08),this.allies=this.allies.filter(t=>{let n=t.x-e.landX,i=t.z-e.landZ,r=Math.hypot(n,i);if(r>2.15+.19)return!0;let a=this.fall(t,"blue",0),o=r>.01?Math.atan2(i,n):t.phase,c=3+2.1*(1-Math.min(1,r/2.15));return a.vx=Math.cos(o)*c,a.vz=Math.sin(o)*c,a.vy=4+c*.38,a.gravity=13.5,a.spin=-Math.sin(o)*5,a.roll=Math.cos(o)*5,!1}),!(Math.hypot(this.x-e.landX,this.captainZ-e.landZ)>2.15+.26)){if(this.buffs.shield>0){this.buffs.shield=0,this.event("shieldHit",this.x,.7,this.captainZ);return}this.hurt=1,this.hitGuard=1.15,this.armor--,this.armor<=0&&(this.lossReason="slam",this.finish(!1))}}advanceBoss(e){let t=this.boss;if(t.defeated){let f=t.defeatAge;t.defeatAge+=e,f<.92&&t.defeatAge>=.92&&this.landBoss(),t.removed||(t.z+=this.worldAdvance),f<1.62&&t.defeatAge>=1.62&&(t.removed=!0,this.event("bossBurst",t.x,.62,t.z-1.15,1.4)),t.removed&&t.defeatAge>2.05&&!this.flanks.length&&!this.deliveries.length&&this.row>=this.lastRow&&!this.runners.length&&this.columns.every(u=>u.units.length===0)&&this.finish(!0);return}if(!t.active){this.row>=this.finaleRow&&(t.z=this.entryZ-1.5,t.active=!0,this.phase="boss",this.route.vault?Vd(this):t.x=t.escortX=Aa(this,t.z-1.3,t.z+6).x);return}if(Fd(this,e),!this.playing)return;if(t.vault){Yd(this,e);return}if(t.recovery=Math.max(0,t.recovery-e),t.attackT>0){t.attackT+=e;let f=Jo(t.attackT),u=Et(f,0,1);t.x=t.leapFromX+(t.landX-t.leapFromX)*u,t.z=t.leapFromZ+(t.landZ-.68-t.leapFromZ)*u,t.lift=2.15*4*f*(1-f),t.attackT>=.91&&!t.impactDone&&(t.impactDone=!0,this.slamSquad()),t.attackT>=1.48&&(t.attackT=0,t.recovery=1.14);return}for(let f of this.activeGround){if(f.crossed||!ks(f)||Math.abs(t.x-f.x)>1.9)continue;let u=f.z-f.length/2-t.z;if(u<=1.05&&u>=-.5){qd(this,f);return}}t.moveClock+=e;let n=t.moveClock%5.2;t.brace=t.kind==="warden"?Et(n,.92,1.32)*(1-Et(n,2.45,2.95)):0,t.special=t.kind==="drill"?Et(n,1.1,1.55)*(1-Et(n,2.35,2.85)):0;let i=t.skill?.kind==="warden"&&t.skill.fired&&!t.skill.marks[0].hit?2.2:0;!t.pursuing&&t.z>=this.captainZ-9.7&&(t.pursuing=!0);let r=t.pursuing?Th(this):null,a=1-Et(t.z,-23,-15),o=t.pursuing?2.75:this.bossStride+(this.bossEntryStride-this.bossStride)*a,c=e*o*(1-.38*t.brace+.78*t.special+i);if(kd(this,e,r,c),t.kind==="kestrel"&&t.z>-11&&t.z<-7&&!t.glided&&!t.skill){t.glided=!0,t.vault={piece:{z:t.z+2},from:-2,to:2.1,t:0,airDash:!0};return}if(!t.pursuing||t.recovery>0||t.skill)return;let l=Th(this);if(l.distance>3.38)return;let h=kn(l.x,-5.32,5.32),d=l.z;Hd(this,h,d-.68)&&(t.leapFromX=t.x,t.leapFromZ=t.z,t.landX=h,t.landZ=d,t.attackT=.001,t.impactDone=!1)}landBoss(){this.event("victory",this.boss.x,.1,this.boss.z-1.35,1.05)}finish(e,t=null){if(this.playing){if(this.phase=e?"won":"lost",this.endTime=0,this.shots=[],this.incoming=[],e){let n=[...this.allies].sort((i,r)=>i.z-r.z);for(let i=0;i<n.length;i+=5){let r=n.slice(i,i+5).sort((a,o)=>a.x-o.x);r.forEach((a,o)=>{a.exitX=(o-(r.length-1)/2)*.58,a.exitZ=.98+Math.floor(i/5)*.64})}this.parade={complete:!1,originX:this.x},this.recoil=0,this.event("rally",this.x,.14,this.captainZ);return}if(this.event("loss",this.x,0,this.captainZ),this.lossReason==="infantry"){let n=t?.alive&&t.id?t:null;if(!n){let i=r=>{!r.alive||r.z>this.captainZ+.36||(!n||Math.hypot(r.x-this.x,r.z-this.captainZ)<Math.hypot(n.x-this.x,n.z-this.captainZ))&&(n=r)};for(let r of this.columns)for(let a of r.units)i(a);this.runners.forEach(i)}n||(n=this.grunt(this.x,this.entryZ-1),this.runners.push(n)),this.overrun={x:this.x,z:this.captainZ,crossed:!1,attacker:n.id,approach:Math.max(2.35,(this.captainZ-n.z+1.6)/4)};for(let i of this.allies){let r=this.fall(i,"blue",0);r.prone=!0,r.dir=i.x>=this.x?1:-1}this.allies=[]}else this.event("impact",this.x,0,this.captainZ,1.25)}}advanceOverrun(e){let t=this.overrun;this.worldAdvance=.36*e,this.distance+=this.worldAdvance,this.captainZ+=this.worldAdvance,t.z=this.captainZ,this.wall.z+=this.worldAdvance;for(let i of this.gates)i.z+=this.worldAdvance;for(let i of this.features)i.z+=this.worldAdvance;let n=i=>{if(!i.alive||i.z>10)return;let r=i.id===t.attacker,a=(r?Math.max((i.speed||Rh)*1.68,t.approach):(i.speed||Rh)*1.68)*e,o=0;if((r||i.z>t.z-7)&&i.z<t.z+.46){let l=i.id===t.attacker?0:(i.id%7-3)*.15,h=r?11:4.9;o=kn(t.x+l-i.x,-h*e,h*e),i.x+=o}r&&Math.abs(i.x-t.x)>.43&&i.z<t.z+.48&&(a=Math.min(a,Math.max(0,t.z+.15-i.z)));let c=i.z;i.z+=a+this.worldAdvance,i.marched+=Math.hypot(o,a),i.yaw+=(Math.atan2(o,a)-i.yaw)*(1-Math.exp(-8*e)),c<t.z+1.05&&i.z>=t.z+1.05&&Math.abs(i.x-t.x)<1.15&&(t.crossed=!0)};for(let i of this.columns)for(let r of i.units)n(r);this.runners.forEach(n)}advanceParade(e){let t=this.parade;if(t.complete)return;let n=this.endTime,r=(7.4+Math.min(18,n*8.6))*Et(n,.12,.58)*e;this.x=t.originX*(1-Et(n,.16,1.65)),this.velocity=0,this.captainZ-=r;let a=this.captainZ;for(let o of this.allies)o.age+=e,o.x+=(this.x+o.exitX-o.x)*(1-Math.exp(-4.8*e)),o.z-=r,o.z+=(this.captainZ+o.exitZ-o.z)*(1-Math.exp(-4.2*e)),a=Math.max(a,o.z);t.complete=a<this.entryZ-2.8}get resultReady(){return this.parade?this.parade.complete:this.boss.defeated&&this.boss.defeatAge<2.05?!1:this.overrun?this.overrun.crossed&&this.endTime>=2.5:this.endTime>.86}tick(e,t=0,n=0){if(this.worldAdvance=0,!this.playing){(this.phase==="won"||this.phase==="lost")&&(this.endTime+=e,this.parade&&this.advanceParade(e),this.overrun&&this.advanceOverrun(e),this.phase==="lost"&&this.boss.defeated&&this.boss.defeatAge<2.05&&this.advanceBoss(e),this.boss.hit=Math.max(0,this.boss.hit-4*e),this.updateFalling(e));return}this.elapsed+=e,this.chill=Math.max(0,this.chill-e);for(let r of Object.keys(this.buffs))this.buffs[r]=Math.max(0,this.buffs[r]-e);for(let r of this.gates)r.flash=Math.max(0,r.flash-e*7);if(this.hitGuard=Math.max(0,this.hitGuard-e),this.hurt=Math.max(0,this.hurt-4*e),this.mergeGlow=Math.max(0,this.mergeGlow-2.25*e),this.recoil=Math.max(0,this.recoil-5.1*e),this.wall.flash=Math.max(0,this.wall.flash-4.6*e),this.boss.hit=Math.max(0,this.boss.hit-5.4*e),this.visualScale+=(this.scale-this.visualScale)*(1-Math.exp(-8*e)),this.caught&&this.caughtBy?.hp<=0&&(this.caught=!1,this.caughtBy=null),t||n){let r=t*(this.targetX-this.x)<0?this.x:this.targetX;this.aim(r+t*10.2*e,this.targetZ+n*3.1*e)}this.caught||(this.captainZ+=(this.targetZ-this.captainZ)*(1-Math.exp(-16*e)));let i=this.x;if(this.rope){let r=this.rope;r.age+=e,this.x=r.from+(r.to-r.from)*Et(r.age,0,.58),r.age>=.58&&(this.rope=null,this.aim(r.to))}else this.caught||(this.x+=(this.targetX-this.x)*(1-Math.exp(-26*e)));if(this.velocity=(this.x-i)/Math.max(e,.001),this.worldAdvance=this.roadSpeed*e,this.distance+=this.worldAdvance,this.wall.z=this.distance-Zd,Wd(this,e),!!this.playing){this.crossGates(),this.updateDeliveries(e);for(let r of this.allies){r.age+=e;let[a,o]=Ch(r.slot,this.scale),c=kn(this.x+a,-6.28,6.28);r.x+=(c-r.x)*(1-Math.exp(-19*e)),r.z+=(this.captainZ+o-r.z)*(1-Math.exp(-14*e))}this.pushWall(e);for(let r of this.features)(r.kind==="cache"||r.kind==="cover"&&r.variant!=="glass")&&r.state==="ready"&&r.z>-4&&r.z<11&&this.pushWall(e,r,r.half);this.playing&&(this.advanceCrowd(e),this.advanceIncoming(e),this.updateFalling(e),this.playing&&(this.advanceBoss(e),this.playing&&(this.caught||this.shoot(e),this.advanceShots(e))))}}};var Vp=0,vu=1,Wp=2;var bo=1,Xp=2,ra=3,ri=0,On=1,Wt=2,ar=0,aa=1,_u=2,yu=3,Mu=4,qp=5;var or=100,Yp=101,Zp=102,Kp=103,Jp=104,$p=200,jp=201,Qp=202,e0=203,bu=204,Su=205,t0=206,n0=207,i0=208,s0=209,r0=210,a0=211,o0=212,l0=213,c0=214,Ll=0,Nl=1,Dl=2,zr=3,Ul=4,Fl=5,Ol=6,Bl=7,So=0,h0=1,u0=2,Ri=0,Eu=1,wu=2,Tu=3,Au=4,Ru=5,Cu=6,Pu=7,iu="attached",f0="detached",Iu=300,lr=301,oa=302,lc=303,cc=304,Ei=1e3,ii=1001,kr=1002,jt=1003,hc=1004;var cr=1005;var Qt=1006,la=1007;var Wn=1008;var Xn=1009,Lu=1010,Nu=1011,ca=1012,uc=1013,mi=1014,Qn=1015,gi=1016,fc=1017,dc=1018,hr=1020,Du=35902,Uu=35899,Fu=1021,Ou=1022,ai=1023,Yi=1026,rs=1027,pc=1028,mc=1029,As=1030,gc=1031;var xc=1033,Eo=33776,wo=33777,To=33778,Ao=33779,vc=35840,_c=35841,yc=35842,Mc=35843,bc=36196,Sc=37492,Ec=37496,wc=37488,Tc=37489,Ro=37490,Ac=37491,Rc=37808,Cc=37809,Pc=37810,Ic=37811,Lc=37812,Nc=37813,Dc=37814,Uc=37815,Fc=37816,Oc=37817,Bc=37818,zc=37819,kc=37820,Hc=37821,Gc=36492,Vc=36494,Wc=36495,Xc=36283,qc=36284,Co=36285,Yc=36286;var Ys=2300,Zs=2301,Pl=2302,su=2303,ru=2400,au=2401,ou=2402,d0=2500;var Bu=0,Po=1,ha=2,p0=3200;var ua=0,m0=1,as="",yt="srgb",Dn="srgb-linear",Ga="linear",Ct="srgb";var Il=7680;var g0=519,x0=512,v0=513,_0=514,zu=515,y0=516,M0=517,ku=518,Hu=519,Gu=35044,un=35048;var Vu="300 es",si=2e3,Hr=2001;function Zg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Kg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Gr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function b0(){let s=Gr("canvas");return s.style.display="block",s}var $d={},Vr=null;function Va(...s){let e="THREE."+s.shift();Vr?Vr("log",e,...s):console.log(e,...s)}function S0(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ve(...s){s=S0(s);let e="THREE."+s.shift();if(Vr)Vr("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Je(...s){s=S0(s);let e="THREE."+s.shift();if(Vr)Vr("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function qs(...s){let e=s.join(" ");e in $d||($d[e]=!0,Ve(...s))}function E0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var w0={[Ll]:Ll,[Dl]:Ol,[Ul]:Ul,[zr]:Fl,[Nl]:Nl,[Ol]:Dl,[Bl]:Bl,[Fl]:zr},wi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jd=1234567,Ba=Math.PI/180,Ks=180/Math.PI;function xi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tn[s&255]+Tn[s>>8&255]+Tn[s>>16&255]+Tn[s>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[t&63|128]+Tn[t>>8&255]+"-"+Tn[t>>16&255]+Tn[t>>24&255]+Tn[n&255]+Tn[n>>8&255]+Tn[n>>16&255]+Tn[n>>24&255]).toLowerCase()}function lt(s,e,t){return Math.max(e,Math.min(t,s))}function Wu(s,e){return(s%e+e)%e}function Jg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function $g(s,e,t){return s!==e?(t-s)/(e-s):0}function za(s,e,t){return(1-t)*s+t*e}function jg(s,e,t,n){return za(s,e,1-Math.exp(-t*n))}function Qg(s,e=1){return e-Math.abs(Wu(s,e*2)-e)}function e1(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function t1(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function n1(s,e){return s+Math.floor(Math.random()*(e-s+1))}function i1(s,e){return s+Math.random()*(e-s)}function s1(s){return s*(.5-Math.random())}function r1(s){s!==void 0&&(jd=s);let e=jd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function a1(s){return s*Ba}function o1(s){return s*Ks}function l1(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function c1(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Xu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function h1(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),f=a((e-n)/2),u=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*d,c*f,o*l);break;case"YZY":s.set(c*f,o*h,c*d,o*l);break;case"ZXZ":s.set(c*d,c*f,o*h,o*l);break;case"XZX":s.set(o*h,c*p,c*u,o*l);break;case"YXY":s.set(c*u,o*h,c*p,o*l);break;case"ZYZ":s.set(c*p,c*u,o*h,o*l);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Zc(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function qu(s,e){if(e.constructor===Float32Array)return s;let t=Zc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function Yu(s,e){if(e.constructor===Float32Array)return s;let t=Zc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}var Pe={DEG2RAD:Ba,RAD2DEG:Ks,generateUUID:xi,clamp:lt,euclideanModulo:Wu,mapLinear:Jg,inverseLerp:$g,lerp:za,damp:jg,pingpong:Qg,smoothstep:e1,smootherstep:t1,randInt:n1,randFloat:i1,randFloatSpread:s1,seededRandom:r1,degToRad:a1,radToDeg:o1,isPowerOfTwo:l1,ceilPowerOfTwo:c1,floorPowerOfTwo:Xu,setQuaternionFromProperEuler:h1,normalize:Yu,denormalize:qu},Qu=class Qu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Qu.prototype.isVector2=!0;var he=Qu,en=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3],f=r[a+0],u=r[a+1],p=r[a+2],x=r[a+3];if(d!==x||c!==f||l!==u||h!==p){let g=c*f+l*u+h*p+d*x;g<0&&(f=-f,u=-u,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){let v=Math.acos(g),M=Math.sin(v);m=Math.sin(m*v)/M,o=Math.sin(o*v)/M,c=c*m+f*o,l=l*m+u*o,h=h*m+p*o,d=d*m+x*o}else{c=c*m+f*o,l=l*m+u*o,h=h*m+p*o,d=d*m+x*o;let v=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=v,l*=v,h*=v,d*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[a],f=r[a+1],u=r[a+2],p=r[a+3];return e[t]=o*p+h*d+c*u-l*f,e[t+1]=c*p+h*f+l*d-o*u,e[t+2]=l*p+h*u+o*f-c*d,e[t+3]=h*p-o*d-c*f-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),d=o(r/2),f=c(n/2),u=c(i/2),p=c(r/2);switch(a){case"XYZ":this._x=f*h*d+l*u*p,this._y=l*u*d-f*h*p,this._z=l*h*p+f*u*d,this._w=l*h*d-f*u*p;break;case"YXZ":this._x=f*h*d+l*u*p,this._y=l*u*d-f*h*p,this._z=l*h*p-f*u*d,this._w=l*h*d+f*u*p;break;case"ZXY":this._x=f*h*d-l*u*p,this._y=l*u*d+f*h*p,this._z=l*h*p+f*u*d,this._w=l*h*d-f*u*p;break;case"ZYX":this._x=f*h*d-l*u*p,this._y=l*u*d+f*h*p,this._z=l*h*p-f*u*d,this._w=l*h*d+f*u*p;break;case"YZX":this._x=f*h*d+l*u*p,this._y=l*u*d+f*h*p,this._z=l*h*p-f*u*d,this._w=l*h*d-f*u*p;break;case"XZY":this._x=f*h*d-l*u*p,this._y=l*u*d-f*h*p,this._z=l*h*p+f*u*d,this._w=l*h*d+f*u*p;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-c)*u,this._y=(r-l)*u,this._z=(a-i)*u}else if(n>o&&n>d){let u=2*Math.sqrt(1+n-o-d);this._w=(h-c)/u,this._x=.25*u,this._y=(i+a)/u,this._z=(r+l)/u}else if(o>d){let u=2*Math.sqrt(1+o-n-d);this._w=(r-l)/u,this._x=(i+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+d-n-o);this._w=(a-i)/u,this._x=(r+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ef=class ef{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=i+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ph.copy(this).projectOnVector(e),this.sub(Ph)}reflect(e){return this.sub(Ph.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ef.prototype.isVector3=!0;var N=ef,Ph=new N,Qd=new en,tf=class tf{constructor(e,t,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],f=n[2],u=n[5],p=n[8],x=i[0],g=i[3],m=i[6],v=i[1],M=i[4],_=i[7],b=i[2],S=i[5],y=i[8];return r[0]=a*x+o*v+c*b,r[3]=a*g+o*M+c*S,r[6]=a*m+o*_+c*y,r[1]=l*x+h*v+d*b,r[4]=l*g+h*M+d*S,r[7]=l*m+h*_+d*y,r[2]=f*x+u*v+p*b,r[5]=f*g+u*M+p*S,r[8]=f*m+u*_+p*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,f=o*c-h*r,u=l*r-a*c,p=t*d+n*f+i*u;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=d*x,e[1]=(i*l-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=f*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-o*t)*x,e[6]=u*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return qs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ih.makeScale(e,t)),this}rotate(e){return qs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ih.makeRotation(-e)),this}translate(e,t){return qs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ih.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};tf.prototype.isMatrix3=!0;var $e=tf,Ih=new $e,ep=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tp=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function u1(){let s={enabled:!0,workingColorSpace:Dn,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ct&&(i.r=qi(i.r),i.g=qi(i.g),i.b=qi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ct&&(i.r=Br(i.r),i.g=Br(i.g),i.b=Br(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===as?Ga:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Dn]:{primaries:e,whitePoint:n,transfer:Ga,toXYZ:ep,fromXYZ:tp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:Ct,toXYZ:ep,fromXYZ:tp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),s}var ut=u1();function qi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Br(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Er,zl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Er===void 0&&(Er=Gr("canvas")),Er.width=e.width,Er.height=e.height;let i=Er.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Er}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Gr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=qi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qi(t[n]/255)*255):t[n]=qi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},f1=0,Wr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=xi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Lh(i[a].image)):r.push(Lh(i[a]))}else r=Lh(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Lh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?zl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}var d1=0,Nh=new N,hn=class s extends wi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=ii,i=ii,r=Qt,a=Wn,o=ai,c=Xn,l=s.DEFAULT_ANISOTROPY,h=as){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:d1++}),this.uuid=xi(),this.name="",this.source=new Wr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Nh).x}get height(){return this.source.getSize(Nh).y}get depth(){return this.source.getSize(Nh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Iu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case kr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case kr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Iu;hn.DEFAULT_ANISOTROPY=1;var nf=class nf{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],d=c[8],f=c[1],u=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+u+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,_=(u+1)/2,b=(m+1)/2,S=(h+f)/4,y=(d+x)/4,E=(p+g)/4;return M>_&&M>b?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=S/n,r=y/n):_>b?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=S/i,r=E/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=y/r,i=E/r),this.set(n,i,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-x)/v,this.z=(f-h)/v,this.w=Math.acos((l+u+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nf.prototype.isVector4=!0;var mt=nf,kl=class extends wi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new hn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Wr(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kn=class extends kl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Wa=class extends hn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=jt,this.minFilter=jt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Hl=class extends hn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=jt,this.minFilter=jt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var oc=class oc{constructor(e,t,n,i,r,a,o,c,l,h,d,f,u,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,d,f,u,p,x,g)}set(e,t,n,i,r,a,o,c,l,h,d,f,u,p,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=f,m[3]=u,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/wr.setFromMatrixColumn(e,0).length(),r=1/wr.setFromMatrixColumn(e,1).length(),a=1/wr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=a*h,u=a*d,p=o*h,x=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=u+p*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=p+u*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,u=c*d,p=l*h,x=l*d;t[0]=f+x*o,t[4]=p*o-u,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=u*o-p,t[6]=x+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,u=c*d,p=l*h,x=l*d;t[0]=f-x*o,t[4]=-a*d,t[8]=p+u*o,t[1]=u+p*o,t[5]=a*h,t[9]=x-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,u=a*d,p=o*h,x=o*d;t[0]=c*h,t[4]=p*l-u,t[8]=f*l+x,t[1]=c*d,t[5]=x*l+f,t[9]=u*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,u=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=x-f*d,t[8]=p*d+u,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=u*d+p,t[10]=f-x*d}else if(e.order==="XZY"){let f=a*c,u=a*l,p=o*c,x=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=f*d+x,t[5]=a*h,t[9]=u*d-p,t[2]=p*d-u,t[6]=o*h,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(p1,e,m1)}lookAt(e,t,n){let i=this.elements;return Yn.subVectors(e,t),Yn.lengthSq()===0&&(Yn.z=1),Yn.normalize(),ps.crossVectors(n,Yn),ps.lengthSq()===0&&(Math.abs(n.z)===1?Yn.x+=1e-4:Yn.z+=1e-4,Yn.normalize(),ps.crossVectors(n,Yn)),ps.normalize(),il.crossVectors(Yn,ps),i[0]=ps.x,i[4]=il.x,i[8]=Yn.x,i[1]=ps.y,i[5]=il.y,i[9]=Yn.y,i[2]=ps.z,i[6]=il.z,i[10]=Yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],f=n[9],u=n[13],p=n[2],x=n[6],g=n[10],m=n[14],v=n[3],M=n[7],_=n[11],b=n[15],S=i[0],y=i[4],E=i[8],A=i[12],R=i[1],L=i[5],z=i[9],X=i[13],U=i[2],V=i[6],H=i[10],P=i[14],q=i[3],I=i[7],J=i[11],W=i[15];return r[0]=a*S+o*R+c*U+l*q,r[4]=a*y+o*L+c*V+l*I,r[8]=a*E+o*z+c*H+l*J,r[12]=a*A+o*X+c*P+l*W,r[1]=h*S+d*R+f*U+u*q,r[5]=h*y+d*L+f*V+u*I,r[9]=h*E+d*z+f*H+u*J,r[13]=h*A+d*X+f*P+u*W,r[2]=p*S+x*R+g*U+m*q,r[6]=p*y+x*L+g*V+m*I,r[10]=p*E+x*z+g*H+m*J,r[14]=p*A+x*X+g*P+m*W,r[3]=v*S+M*R+_*U+b*q,r[7]=v*y+M*L+_*V+b*I,r[11]=v*E+M*z+_*H+b*J,r[15]=v*A+M*X+_*P+b*W,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],f=e[10],u=e[14],p=e[3],x=e[7],g=e[11],m=e[15],v=c*u-l*f,M=o*u-l*d,_=o*f-c*d,b=a*u-l*h,S=a*f-c*h,y=a*d-o*h;return t*(x*v-g*M+m*_)-n*(p*v-g*b+m*S)+i*(p*M-x*b+m*y)-r*(p*_-x*S+g*y)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+i*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],f=e[10],u=e[11],p=e[12],x=e[13],g=e[14],m=e[15],v=t*o-n*a,M=t*c-i*a,_=t*l-r*a,b=n*c-i*o,S=n*l-r*o,y=i*l-r*c,E=h*x-d*p,A=h*g-f*p,R=h*m-u*p,L=d*g-f*x,z=d*m-u*x,X=f*m-u*g,U=v*X-M*z+_*L+b*R-S*A+y*E;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/U;return e[0]=(o*X-c*z+l*L)*V,e[1]=(i*z-n*X-r*L)*V,e[2]=(x*y-g*S+m*b)*V,e[3]=(f*S-d*y-u*b)*V,e[4]=(c*R-a*X-l*A)*V,e[5]=(t*X-i*R+r*A)*V,e[6]=(g*_-p*y-m*M)*V,e[7]=(h*y-f*_+u*M)*V,e[8]=(a*z-o*R+l*E)*V,e[9]=(n*R-t*z-r*E)*V,e[10]=(p*S-x*_+m*v)*V,e[11]=(d*_-h*S-u*v)*V,e[12]=(o*A-a*L-c*E)*V,e[13]=(t*L-n*A+i*E)*V,e[14]=(x*M-p*b-g*v)*V,e[15]=(h*b-d*M+f*v)*V,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,f=r*l,u=r*h,p=r*d,x=a*h,g=a*d,m=o*d,v=c*l,M=c*h,_=c*d,b=n.x,S=n.y,y=n.z;return i[0]=(1-(x+m))*b,i[1]=(u+_)*b,i[2]=(p-M)*b,i[3]=0,i[4]=(u-_)*S,i[5]=(1-(f+m))*S,i[6]=(g+v)*S,i[7]=0,i[8]=(p+M)*y,i[9]=(g-v)*y,i[10]=(1-(f+x))*y,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=wr.set(i[0],i[1],i[2]).length(),o=wr.set(i[4],i[5],i[6]).length(),c=wr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),hi.copy(this);let l=1/a,h=1/o,d=1/c;return hi.elements[0]*=l,hi.elements[1]*=l,hi.elements[2]*=l,hi.elements[4]*=h,hi.elements[5]*=h,hi.elements[6]*=h,hi.elements[8]*=d,hi.elements[9]*=d,hi.elements[10]*=d,t.setFromRotationMatrix(hi),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,r,a,o=si,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(n-i),f=(t+e)/(t-e),u=(n+i)/(n-i),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===si)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Hr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=si,c=!1){let l=this.elements,h=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),u=-(n+i)/(n-i),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===si)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Hr)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};oc.prototype.isMatrix4=!0;var We=oc,wr=new N,hi=new We,p1=new N(0,0,0),m1=new N(1,1,1),ps=new N,il=new N,Yn=new N,np=new We,ip=new en,Gt=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],d=i[2],f=i[6],u=i[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return np.makeRotationFromQuaternion(e),this.setFromRotationMatrix(np,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ip.setFromEuler(this),this.setFromQuaternion(ip,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gt.DEFAULT_ORDER="XYZ";var Xa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},g1=0,sp=new N,Tr=new en,ki=new We,sl=new N,Ra=new N,x1=new N,v1=new en,rp=new N(1,0,0),ap=new N(0,1,0),op=new N(0,0,1),lp={type:"added"},_1={type:"removed"},Ar={type:"childadded",child:null},Dh={type:"childremoved",child:null},Pt=class s extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new N,t=new Gt,n=new en,i=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new We},normalMatrix:{value:new $e}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.multiply(Tr),this}rotateOnWorldAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.premultiply(Tr),this}rotateX(e){return this.rotateOnAxis(rp,e)}rotateY(e){return this.rotateOnAxis(ap,e)}rotateZ(e){return this.rotateOnAxis(op,e)}translateOnAxis(e,t){return sp.copy(e).applyQuaternion(this.quaternion),this.position.add(sp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rp,e)}translateY(e){return this.translateOnAxis(ap,e)}translateZ(e){return this.translateOnAxis(op,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ki.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sl.copy(e):sl.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ra.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ki.lookAt(Ra,sl,this.up):ki.lookAt(sl,Ra,this.up),this.quaternion.setFromRotationMatrix(ki),i&&(ki.extractRotation(i.matrixWorld),Tr.setFromRotationMatrix(ki),this.quaternion.premultiply(Tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lp),Ar.child=e,this.dispatchEvent(Ar),Ar.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_1),Dh.child=e,this.dispatchEvent(Dh),Dh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(ki),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lp),Ar.child=e,this.dispatchEvent(Ar),Ar.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ra,e,x1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ra,v1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),u=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new N(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var It=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},y1={type:"move"},Xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new It,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new It,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new It,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=h.position.distanceTo(d.position),u=.02,p=.005;l.inputState.pinching&&f>u+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=u-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(y1)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new It;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},T0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ms={h:0,s:0,l:0},rl={h:0,s:0,l:0};function Uh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Se=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ut.workingColorSpace){if(e=Wu(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Uh(a,r,e+1/3),this.g=Uh(a,r,e),this.b=Uh(a,r,e-1/3)}return ut.colorSpaceToWorking(this,i),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=T0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qi(e.r),this.g=qi(e.g),this.b=qi(e.b),this}copyLinearToSRGB(e){return this.r=Br(e.r),this.g=Br(e.g),this.b=Br(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return ut.workingToColorSpace(An.copy(this),e),Math.round(lt(An.r*255,0,255))*65536+Math.round(lt(An.g*255,0,255))*256+Math.round(lt(An.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(An.copy(this),t);let n=An.r,i=An.g,r=An.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=yt){ut.workingToColorSpace(An.copy(this),e);let t=An.r,n=An.g,i=An.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ms),this.setHSL(ms.h+e,ms.s+t,ms.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ms),e.getHSL(rl);let n=za(ms.h,rl.h,t),i=za(ms.s,rl.s,t),r=za(ms.l,rl.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},An=new Se;Se.NAMES=T0;var qa=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gt,this.environmentIntensity=1,this.environmentRotation=new Gt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ui=new N,Hi=new N,Fh=new N,Gi=new N,Rr=new N,Cr=new N,cp=new N,Oh=new N,Bh=new N,zh=new N,kh=new mt,Hh=new mt,Gh=new mt,ys=class s{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ui.subVectors(e,t),i.cross(ui);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){ui.subVectors(i,t),Hi.subVectors(n,t),Fh.subVectors(e,t);let a=ui.dot(ui),o=ui.dot(Hi),c=ui.dot(Fh),l=Hi.dot(Hi),h=Hi.dot(Fh),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,u=(l*c-o*h)*f,p=(a*h-o*c)*f;return r.set(1-u-p,p,u)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Gi)===null?!1:Gi.x>=0&&Gi.y>=0&&Gi.x+Gi.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Gi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Gi.x),c.addScaledVector(a,Gi.y),c.addScaledVector(o,Gi.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return kh.setScalar(0),Hh.setScalar(0),Gh.setScalar(0),kh.fromBufferAttribute(e,t),Hh.fromBufferAttribute(e,n),Gh.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(kh,r.x),a.addScaledVector(Hh,r.y),a.addScaledVector(Gh,r.z),a}static isFrontFacing(e,t,n,i){return ui.subVectors(n,t),Hi.subVectors(e,t),ui.cross(Hi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),Hi.subVectors(this.a,this.b),ui.cross(Hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Rr.subVectors(i,n),Cr.subVectors(r,n),Oh.subVectors(e,n);let c=Rr.dot(Oh),l=Cr.dot(Oh);if(c<=0&&l<=0)return t.copy(n);Bh.subVectors(e,i);let h=Rr.dot(Bh),d=Cr.dot(Bh);if(h>=0&&d<=h)return t.copy(i);let f=c*d-h*l;if(f<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),t.copy(n).addScaledVector(Rr,a);zh.subVectors(e,r);let u=Rr.dot(zh),p=Cr.dot(zh);if(p>=0&&u<=p)return t.copy(r);let x=u*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(Cr,o);let g=h*p-u*d;if(g<=0&&d-h>=0&&u-p>=0)return cp.subVectors(r,i),o=(d-h)/(d-h+(u-p)),t.copy(i).addScaledVector(cp,o);let m=1/(g+x+f);return a=x*m,o=f*m,t.copy(n).addScaledVector(Rr,a).addScaledVector(Cr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,fi):fi.fromBufferAttribute(r,a),fi.applyMatrix4(e.matrixWorld),this.expandByPoint(fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),al.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),al.copy(n.boundingBox)),al.applyMatrix4(e.matrixWorld),this.union(al)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fi),fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ca),ol.subVectors(this.max,Ca),Pr.subVectors(e.a,Ca),Ir.subVectors(e.b,Ca),Lr.subVectors(e.c,Ca),gs.subVectors(Ir,Pr),xs.subVectors(Lr,Ir),Hs.subVectors(Pr,Lr);let t=[0,-gs.z,gs.y,0,-xs.z,xs.y,0,-Hs.z,Hs.y,gs.z,0,-gs.x,xs.z,0,-xs.x,Hs.z,0,-Hs.x,-gs.y,gs.x,0,-xs.y,xs.x,0,-Hs.y,Hs.x,0];return!Vh(t,Pr,Ir,Lr,ol)||(t=[1,0,0,0,1,0,0,0,1],!Vh(t,Pr,Ir,Lr,ol))?!1:(ll.crossVectors(gs,xs),t=[ll.x,ll.y,ll.z],Vh(t,Pr,Ir,Lr,ol))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Vi=[new N,new N,new N,new N,new N,new N,new N,new N],fi=new N,al=new Jn,Pr=new N,Ir=new N,Lr=new N,gs=new N,xs=new N,Hs=new N,Ca=new N,ol=new N,ll=new N,Gs=new N;function Vh(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Gs.fromArray(s,r);let o=i.x*Math.abs(Gs.x)+i.y*Math.abs(Gs.y)+i.z*Math.abs(Gs.z),c=e.dot(Gs),l=t.dot(Gs),h=n.dot(Gs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var an=new N,cl=new he,M1=0,Ft=class extends wi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:M1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gu,this.updateRanges=[],this.gpuType=Qn,this.version=0,this._normalizationScale=e!==void 0?Zc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cl.fromBufferAttribute(this,t),cl.applyMatrix3(e),this.setXY(t,cl.x,cl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyMatrix3(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):qu(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Yu(e,this.array)}};var qr=class extends Ft{constructor(e,t,n){super(new Uint8Array(e),t,n)}};var Ya=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Za=class extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Xe=class extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}},b1=new Jn,Pa=new N,Wh=new N,Hn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):b1.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pa.subVectors(e,this.center);let t=Pa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Pa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pa.copy(e.center).add(Wh)),this.expandByPoint(Pa.copy(e.center).sub(Wh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},S1=0,ni=new We,Xh=new Pt,Nr=new N,Zn=new Jn,Ia=new Jn,xn=new N,_t=class s extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:S1++}),this.uuid=xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zg(e)?Za:Ya)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $e().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,n){return ni.makeTranslation(e,t,n),this.applyMatrix4(ni),this}scale(e,t,n){return ni.makeScale(e,t,n),this.applyMatrix4(ni),this}lookAt(e){return Xh.lookAt(e),Xh.updateMatrix(),this.applyMatrix4(Xh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nr).negate(),this.translate(Nr.x,Nr.y,Nr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xe(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Zn.setFromBufferAttribute(r),this.morphTargetsRelative?(xn.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint(xn),xn.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint(xn)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(Zn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ia.setFromBufferAttribute(o),this.morphTargetsRelative?(xn.addVectors(Zn.min,Ia.min),Zn.expandByPoint(xn),xn.addVectors(Zn.max,Ia.max),Zn.expandByPoint(xn)):(Zn.expandByPoint(Ia.min),Zn.expandByPoint(Ia.max))}Zn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)xn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(xn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)xn.fromBufferAttribute(o,l),c&&(Nr.fromBufferAttribute(e,l),xn.add(Nr)),i=Math.max(i,n.distanceToSquared(xn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ft(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let A=0;A<n.count;A++)o[A]=new N,c[A]=new N;let h=new N,d=new N,f=new N,u=new he,p=new he,x=new he,g=new N,m=new N;function v(A,R,L){l[A]=l[R]=l[L]=1,h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,R),f.fromBufferAttribute(n,L),u.fromBufferAttribute(r,A),p.fromBufferAttribute(r,R),x.fromBufferAttribute(r,L),d.sub(h),f.sub(h),p.sub(u),x.sub(u);let z=1/(p.x*x.y-x.x*p.y);isFinite(z)&&(g.copy(d).multiplyScalar(x.y).addScaledVector(f,-p.y).multiplyScalar(z),m.copy(f).multiplyScalar(p.x).addScaledVector(d,-x.x).multiplyScalar(z),o[A].add(g),o[R].add(g),o[L].add(g),c[A].add(m),c[R].add(m),c[L].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let A=0,R=M.length;A<R;++A){let L=M[A],z=L.start,X=L.count;for(let U=z,V=z+X;U<V;U+=3)v(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let _=new N,b=new N,S=new N,y=new N;function E(A){S.fromBufferAttribute(i,A),y.copy(S);let R=o[A];_.copy(R),_.sub(S.multiplyScalar(S.dot(R))).normalize(),b.crossVectors(y,R);let z=b.dot(c[A])<0?-1:1;a.setXYZW(A,_.x,_.y,_.z,z)}for(let A=0,R=n.count;A<R;++A)l[A]&&E(A);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);let i=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,d=new N;if(e)for(let f=0,u=e.count;f<u;f+=3){let p=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,u=t.count;f<u;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xn.fromBufferAttribute(e,t),xn.normalize(),e.setXYZ(t,xn.x,xn.y,xn.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,d=o.normalized,f=new l.constructor(c.length*h),u=0,p=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?u=c[x]*o.data.stride+o.offset:u=c[x]*h;for(let m=0;m<h;m++)f[p++]=l[u++]}return new Ft(f,h,d)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let f=l[h],u=e(f,n);c.push(u)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,f=l.length;d<f;d++){let u=l[d];h.push(u.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let f=0,u=d.length;f<u;f++)h.push(d[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gu,this.updateRanges=[],this.version=0,this.uuid=xi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=hp(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=hp(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function hp(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=xi()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}var Nn=new N,Zr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?Zc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Va("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Va("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):qu(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Yu(e,this.data.array)}},qh=new N,E1=new N,w1=new $e,di=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=qh.subVectors(n,t).cross(E1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(qh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||w1.getNormalMatrix(e),i=this.coplanarPoint(qh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},T1=0,Rn=class extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:T1++}),this.uuid=xi(),this.name="",this.type="Material",this.blending=aa,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bu,this.blendDst=Su,this.blendEquation=or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=g0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Il,this.stencilZFail=Il,this.stencilZPass=Il,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Se().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new di().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new he().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new he().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Wi=new N,Yh=new N,hl=new N,ul=new N,Js=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Yh.copy(e).add(t).multiplyScalar(.5),hl.copy(t).sub(e).normalize(),ul.copy(this.origin).sub(Yh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(hl),o=ul.dot(this.direction),c=-ul.dot(hl),l=ul.lengthSq(),h=Math.abs(1-a*a),d,f,u,p;if(h>0)if(d=a*c-o,f=a*o-c,p=r*h,d>=0)if(f>=-p)if(f<=p){let x=1/h;d*=x,f*=x,u=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*c)+l;else f<=-p?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),u=-d*d+f*(f+2*c)+l):f<=p?(d=0,f=Math.min(Math.max(-r,-c),r),u=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),u=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Yh).addScaledVector(hl,f),u}intersectSphere(e,t){if(e.radius<0)return null;Wi.subVectors(e.center,this.origin);let n=Wi.dot(this.direction),i=Wi.dot(Wi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,n,i,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=e.x-a.x,f=e.y-a.y,u=e.z-a.z,p=t.x-a.x,x=t.y-a.y,g=t.z-a.z,m=n.x-a.x,v=n.y-a.y,M=n.z-a.z,_=Math.abs(c),b=Math.abs(l),S=Math.abs(h),y,E,A,R,L,z,X,U,V,H,P,q;if(_>=b&&_>=S?(A=c,z=d,V=p,q=m,c>=0?(y=l,E=h,R=f,L=u,X=x,U=g,H=v,P=M):(y=h,E=l,R=u,L=f,X=g,U=x,H=M,P=v)):b>=S?(A=l,z=f,V=x,q=v,l>=0?(y=h,E=c,R=u,L=d,X=g,U=p,H=M,P=m):(y=c,E=h,R=d,L=u,X=p,U=g,H=m,P=M)):(A=h,z=u,V=g,q=M,h>=0?(y=c,E=l,R=d,L=f,X=p,U=x,H=m,P=v):(y=l,E=c,R=f,L=d,X=x,U=p,H=v,P=m)),A===0)return null;let I=y/A,J=E/A,W=1/A,F=R-I*z,G=L-J*z,D=X-I*V,Q=U-J*V,ae=H-I*q,Ie=P-J*q,ye=ae*Q-Ie*D,Be=F*Ie-G*ae,nt=D*G-Q*F;if(i){if(ye<0||Be<0||nt<0)return null}else if((ye<0||Be<0||nt<0)&&(ye>0||Be>0||nt>0))return null;let Fe=ye+Be+nt;if(Fe===0)return null;let je=W*(ye*z+Be*V+nt*q);return(Fe>0?je<0:je>0)?null:this.at(je/Fe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mt=class extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.combine=So,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},up=new We,Vs=new Js,fl=new Hn,fp=new N,dl=new N,pl=new N,ml=new N,Zh=new N,gl=new N,dp=new N,xl=new N,Qe=class extends Pt{constructor(e=new _t,t=new Mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){gl.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(Zh.fromBufferAttribute(d,e),a?gl.addScaledVector(Zh,h):gl.addScaledVector(Zh.sub(t),h))}t.add(gl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fl.copy(n.boundingSphere),fl.applyMatrix4(r),Vs.copy(e.ray).recast(e.near),!(fl.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(fl,fp)===null||Vs.origin.distanceToSquared(fp)>(e.far-e.near)**2))&&(up.copy(r).invert(),Vs.copy(e.ray).applyMatrix4(up),!(n.boundingBox!==null&&Vs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vs)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let g=f[p],m=a[g.materialIndex],v=Math.max(g.start,u.start),M=Math.min(o.count,Math.min(g.start+g.count,u.start+u.count));for(let _=v,b=M;_<b;_+=3){let S=o.getX(_),y=o.getX(_+1),E=o.getX(_+2);i=vl(this,m,e,n,l,h,d,S,y,E),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,u.start),x=Math.min(o.count,u.start+u.count);for(let g=p,m=x;g<m;g+=3){let v=o.getX(g),M=o.getX(g+1),_=o.getX(g+2);i=vl(this,a,e,n,l,h,d,v,M,_),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let g=f[p],m=a[g.materialIndex],v=Math.max(g.start,u.start),M=Math.min(c.count,Math.min(g.start+g.count,u.start+u.count));for(let _=v,b=M;_<b;_+=3){let S=_,y=_+1,E=_+2;i=vl(this,m,e,n,l,h,d,S,y,E),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,u.start),x=Math.min(c.count,u.start+u.count);for(let g=p,m=x;g<m;g+=3){let v=g,M=g+1,_=g+2;i=vl(this,a,e,n,l,h,d,v,M,_),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function A1(s,e,t,n,i,r,a,o){let c;if(e.side===On?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===ri,o),c===null)return null;xl.copy(o),xl.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(xl);return l<t.near||l>t.far?null:{distance:l,point:xl.clone(),object:s}}function vl(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,dl),s.getVertexPosition(c,pl),s.getVertexPosition(l,ml);let h=A1(s,e,t,n,dl,pl,ml,dp);if(h){let d=new N;ys.getBarycoord(dp,dl,pl,ml,d),i&&(h.uv=ys.getInterpolatedAttribute(i,o,c,l,d,new he)),r&&(h.uv1=ys.getInterpolatedAttribute(r,o,c,l,d,new he)),a&&(h.normal=ys.getInterpolatedAttribute(a,o,c,l,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new N,materialIndex:0};ys.getNormal(dl,pl,ml,f.normal),h.face=f,h.barycoord=d}return h}var La=new mt,pp=new mt,mp=new mt,R1=new mt,gp=new We,_l=new N,Kh=new Hn,xp=new We,Jh=new Js,$s=class extends Qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=iu,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,_l),this.boundingBox.expandByPoint(_l)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,_l),this.boundingSphere.expandByPoint(_l)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Kh.copy(this.boundingSphere),Kh.applyMatrix4(i),e.ray.intersectsSphere(Kh)!==!1&&(xp.copy(i).invert(),Jh.copy(e.ray).applyMatrix4(xp),!(this.boundingBox!==null&&Jh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Jh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new mt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===iu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===f0?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ve("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;pp.fromBufferAttribute(i.attributes.skinIndex,e),mp.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(La.copy(t),t.set(0,0,0,0)):(La.set(t.x,t.y,t.z,1),t.set(0,0,0)),La.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=mp.getComponent(r);if(a!==0){let o=pp.getComponent(r);gp.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(R1.copy(La).applyMatrix4(gp),a)}}return t.isVector4&&(t.w=La.w),t.applyMatrix4(this.bindMatrixInverse)}},Ms=class extends Pt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Kr=class extends hn{constructor(e=null,t=1,n=1,i,r,a,o,c,l=jt,h=jt,d,f){super(null,a,o,c,l,h,i,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vp=new We,C1=new We,js=class s{constructor(e=[],t=[]){this.uuid=xi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ve("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new We;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:C1;vp.multiplyMatrices(o,t[r]),vp.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Kr(t,e,e,ai,Qn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ve("Skeleton: No bone found with UUID:",r),a=new Ms),this.bones.push(a),this.boneInverses.push(new We().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},$t=class extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Dr=new We,_p=new We,yl=[],yp=new Jn,P1=new We,Na=new Qe,Da=new Hn,Zt=class extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $t(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,P1)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Dr),yp.copy(e.boundingBox).applyMatrix4(Dr),this.boundingBox.union(yp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Dr),Da.copy(e.boundingSphere).applyMatrix4(Dr),this.boundingSphere.union(Da)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Na.geometry=this.geometry,Na.material=this.material,Na.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Da.copy(this.boundingSphere),Da.applyMatrix4(n),e.ray.intersectsSphere(Da)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Dr),_p.multiplyMatrices(n,Dr),Na.matrixWorld=_p,Na.raycast(e,yl);for(let a=0,o=yl.length;a<o;a++){let c=yl[a];c.instanceId=r,c.object=this,t.push(c)}yl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new $t(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kr(new Float32Array(i*this.count),i,this.count,pc,Qn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ws=new Hn,I1=new he(.5,.5),Ml=new N,bs=class{constructor(e=new di,t=new di,n=new di,i=new di,r=new di,a=new di){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=si,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],f=r[6],u=r[7],p=r[8],x=r[9],g=r[10],m=r[11],v=r[12],M=r[13],_=r[14],b=r[15];if(i[0].setComponents(l-a,u-h,m-p,b-v).normalize(),i[1].setComponents(l+a,u+h,m+p,b+v).normalize(),i[2].setComponents(l+o,u+d,m+x,b+M).normalize(),i[3].setComponents(l-o,u-d,m-x,b-M).normalize(),n)i[4].setComponents(c,f,g,_).normalize(),i[5].setComponents(l-c,u-f,m-g,b-_).normalize();else if(i[4].setComponents(l-c,u-f,m-g,b-_).normalize(),t===si)i[5].setComponents(l+c,u+f,m+g,b+_).normalize();else if(t===Hr)i[5].setComponents(c,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ws.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ws.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ws)}intersectsSprite(e){Ws.center.set(0,0,0);let t=I1.distanceTo(e.center);return Ws.radius=.7071067811865476+t,Ws.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ws)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ml.x=i.normal.x>0?e.max.x:e.min.x,Ml.y=i.normal.y>0?e.max.y:e.min.y,Ml.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ml)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Mp=new We,Gl=class s{constructor(){this.coordinateSystem=si,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];Mp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new bs),n[i].setFromProjectionMatrix(Mp,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new bs),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};var Jr=class extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Vl=new N,Wl=new N,bp=new We,Ua=new Js,bl=new Hn,$h=new N,Sp=new N,Qs=class extends Pt{constructor(e=new _t,t=new Jr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Vl.fromBufferAttribute(t,i-1),Wl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Vl.distanceTo(Wl);e.setAttribute("lineDistance",new Xe(n,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bl.copy(n.boundingSphere),bl.applyMatrix4(i),bl.radius+=r,e.ray.intersectsSphere(bl)===!1)return;bp.copy(i).invert(),Ua.copy(e.ray).applyMatrix4(bp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=u,g=p-1;x<g;x+=l){let m=h.getX(x),v=h.getX(x+1),M=Sl(this,e,Ua,c,m,v,x);M&&t.push(M)}if(this.isLineLoop){let x=h.getX(p-1),g=h.getX(u),m=Sl(this,e,Ua,c,x,g,p-1);m&&t.push(m)}}else{let u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let x=u,g=p-1;x<g;x+=l){let m=Sl(this,e,Ua,c,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=Sl(this,e,Ua,c,p-1,u,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Sl(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(Vl.fromBufferAttribute(o,i),Wl.fromBufferAttribute(o,r),t.distanceSqToSegment(Vl,Wl,$h,Sp)>n)return;$h.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo($h);if(!(l<e.near||l>e.far))return{distance:l,point:Sp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Ep=new N,wp=new N,Ka=class extends Qs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Ep.fromBufferAttribute(t,i),wp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ep.distanceTo(wp);e.setAttribute("lineDistance",new Xe(n,1))}else Ve("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ja=class extends Qs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},$r=class extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Tp=new We,lu=new Js,El=new Hn,wl=new N,$a=class extends Pt{constructor(e=new _t,t=new $r){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),El.copy(n.boundingSphere),El.applyMatrix4(i),El.radius+=r,e.ray.intersectsSphere(El)===!1)return;Tp.copy(i).invert(),lu.copy(e.ray).applyMatrix4(Tp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),u=Math.min(l.count,a.start+a.count);for(let p=f,x=u;p<x;p++){let g=l.getX(p);wl.fromBufferAttribute(d,g),Ap(wl,g,c,i,e,t,this)}}else{let f=Math.max(0,a.start),u=Math.min(d.count,a.start+a.count);for(let p=f,x=u;p<x;p++)wl.fromBufferAttribute(d,p),Ap(wl,p,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ap(s,e,t,n,i,r,a){let o=lu.distanceSqToPoint(s);if(o<t){let c=new N;lu.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ja=class extends hn{constructor(e=[],t=lr,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Gn=class extends hn{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Zi=class extends hn{constructor(e,t,n=mi,i,r,a,o=jt,c=jt,l,h=Yi,d=1){if(h!==Yi&&h!==rs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Qa=class extends Zi{constructor(e,t=mi,n=lr,i,r,a=jt,o=jt,c,l=Yi){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},eo=class extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Un=class s extends _t{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],f=0,u=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(h,3)),this.setAttribute("uv",new Xe(d,2));function p(x,g,m,v,M,_,b,S,y,E,A){let R=_/y,L=b/E,z=_/2,X=b/2,U=S/2,V=y+1,H=E+1,P=0,q=0,I=new N;for(let J=0;J<H;J++){let W=J*L-X;for(let F=0;F<V;F++){let G=F*R-z;I[x]=G*v,I[g]=W*M,I[m]=U,l.push(I.x,I.y,I.z),I[x]=0,I[g]=0,I[m]=S>0?1:-1,h.push(I.x,I.y,I.z),d.push(F/y),d.push(1-J/E),P+=1}}for(let J=0;J<E;J++)for(let W=0;W<y;W++){let F=f+W+V*J,G=f+W+V*(J+1),D=f+(W+1)+V*(J+1),Q=f+(W+1)+V*J;c.push(F,G,Q),c.push(G,D,Q),q+=6}o.addGroup(u,q,A),u+=q,f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var to=class s extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new N,h=new he;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let u=n+d/t*i;l.x=e*Math.cos(u),l.y=e*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Xe(a,3)),this.setAttribute("normal",new Xe(o,3)),this.setAttribute("uv",new Xe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},tn=class s extends _t{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],f=[],u=[],p=0,x=[],g=n/2,m=0;v(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Xe(d,3)),this.setAttribute("normal",new Xe(f,3)),this.setAttribute("uv",new Xe(u,2));function v(){let _=new N,b=new N,S=0,y=(t-e)/n;for(let E=0;E<=r;E++){let A=[],R=E/r,L=R*(t-e)+e;for(let z=0;z<=i;z++){let X=z/i,U=X*c+o,V=Math.sin(U),H=Math.cos(U);b.x=L*V,b.y=-R*n+g,b.z=L*H,d.push(b.x,b.y,b.z),_.set(V,y,H).normalize(),f.push(_.x,_.y,_.z),u.push(X,1-R),A.push(p++)}x.push(A)}for(let E=0;E<i;E++)for(let A=0;A<r;A++){let R=x[A][E],L=x[A+1][E],z=x[A+1][E+1],X=x[A][E+1];(e>0||A!==0)&&(h.push(R,L,X),S+=3),(t>0||A!==r-1)&&(h.push(L,z,X),S+=3)}l.addGroup(m,S,0),m+=S}function M(_){let b=p,S=new he,y=new N,E=0,A=_===!0?e:t,R=_===!0?1:-1;for(let z=1;z<=i;z++)d.push(0,g*R,0),f.push(0,R,0),u.push(.5,.5),p++;let L=p;for(let z=0;z<=i;z++){let U=z/i*c+o,V=Math.cos(U),H=Math.sin(U);y.x=A*H,y.y=g*R,y.z=A*V,d.push(y.x,y.y,y.z),f.push(0,R,0),S.x=V*.5+.5,S.y=H*.5*R+.5,u.push(S.x,S.y),p++}for(let z=0;z<i;z++){let X=b+z,U=L+z;_===!0?h.push(U,U+1,X):h.push(U+1,U,X),E+=3}l.addGroup(m,E,_===!0?1:2),m+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ki=class s extends tn{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},jr=class s extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),l(n),h(),this.setAttribute("position",new Xe(r,3)),this.setAttribute("normal",new Xe(r.slice(),3)),this.setAttribute("uv",new Xe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let M=new N,_=new N,b=new N;for(let S=0;S<t.length;S+=3)u(t[S+0],M),u(t[S+1],_),u(t[S+2],b),c(M,_,b,v)}function c(v,M,_,b){let S=b+1,y=[];for(let E=0;E<=S;E++){y[E]=[];let A=v.clone().lerp(_,E/S),R=M.clone().lerp(_,E/S),L=S-E;for(let z=0;z<=L;z++)z===0&&E===S?y[E][z]=A:y[E][z]=A.clone().lerp(R,z/L)}for(let E=0;E<S;E++)for(let A=0;A<2*(S-E)-1;A++){let R=Math.floor(A/2);A%2===0?(f(y[E][R+1]),f(y[E+1][R]),f(y[E][R])):(f(y[E][R+1]),f(y[E+1][R+1]),f(y[E+1][R]))}}function l(v){let M=new N;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){let v=new N;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let _=g(v)/2/Math.PI+.5,b=m(v)/Math.PI+.5;a.push(_,1-b)}p(),d()}function d(){for(let v=0;v<a.length;v+=6){let M=a[v+0],_=a[v+2],b=a[v+4],S=Math.max(M,_,b),y=Math.min(M,_,b);S>.9&&y<.1&&(M<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),b<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function u(v,M){let _=v*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function p(){let v=new N,M=new N,_=new N,b=new N,S=new he,y=new he,E=new he;for(let A=0,R=0;A<r.length;A+=9,R+=6){v.set(r[A+0],r[A+1],r[A+2]),M.set(r[A+3],r[A+4],r[A+5]),_.set(r[A+6],r[A+7],r[A+8]),S.set(a[R+0],a[R+1]),y.set(a[R+2],a[R+3]),E.set(a[R+4],a[R+5]),b.copy(v).add(M).add(_).divideScalar(3);let L=g(b);x(S,R+0,v,L),x(y,R+2,M,L),x(E,R+4,_,L)}}function x(v,M,_,b){b<0&&v.x===1&&(a[M]=v.x-1),_.x===0&&_.z===0&&(a[M]=b/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},no=class s extends jr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var $n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ve("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);let h=n[i],f=n[i+1]-h,u=(a-h)/f;return(i+u)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),c=t||(a.isVector2?new he:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new N,i=[],r=[],a=[],o=new N,c=new We;for(let u=0;u<=e;u++){let p=u/e;i[u]=this.getTangentAt(p,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let u=1;u<=e;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(i[u-1],i[u]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(lt(i[u-1].dot(i[u]),-1,1));r[u].applyMatrix4(c.makeRotationAxis(o,p))}a[u].crossVectors(i[u],r[u])}if(t===!0){let u=Math.acos(lt(r[0].dot(r[e]),-1,1));u/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(u=-u);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(i[p],u*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Qr=class extends $n{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new he){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,u=l-this.aY;c=f*h-u*d+this.aX,l=f*d+u*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Xl=class extends Qr{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Zu(){let s=0,e=0,t=0,n=0;function i(r,a,o,c){s=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+d)+(c-o)/d;f*=h,u*=h,i(a,o,f,u)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var Rp=new N,Cp=new N,jh=new Zu,Qh=new Zu,eu=new Zu,Ji=class extends $n{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new N){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(Cp.subVectors(i[0],i[1]).add(i[0]),l=Cp);let d=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Rp.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Rp),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(d),u),x=Math.pow(d.distanceToSquared(f),u),g=Math.pow(f.distanceToSquared(h),u);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),jh.initNonuniformCatmullRom(l.x,d.x,f.x,h.x,p,x,g),Qh.initNonuniformCatmullRom(l.y,d.y,f.y,h.y,p,x,g),eu.initNonuniformCatmullRom(l.z,d.z,f.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(jh.initCatmullRom(l.x,d.x,f.x,h.x,this.tension),Qh.initCatmullRom(l.y,d.y,f.y,h.y,this.tension),eu.initCatmullRom(l.z,d.z,f.z,h.z,this.tension));return n.set(jh.calc(c),Qh.calc(c),eu.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new N().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Pp(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,c=s*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*s+t}function L1(s,e){let t=1-s;return t*t*e}function N1(s,e){return 2*(1-s)*s*e}function D1(s,e){return s*s*e}function ka(s,e,t,n){return L1(s,e)+N1(s,t)+D1(s,n)}function U1(s,e){let t=1-s;return t*t*t*e}function F1(s,e){let t=1-s;return 3*t*t*s*e}function O1(s,e){return 3*(1-s)*s*s*e}function B1(s,e){return s*s*s*e}function Ha(s,e,t,n,i){return U1(s,e)+F1(s,t)+O1(s,n)+B1(s,i)}var io=class extends $n{constructor(e=new he,t=new he,n=new he,i=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new he){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ha(e,i.x,r.x,a.x,o.x),Ha(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ql=class extends $n{constructor(e=new N,t=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new N){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ha(e,i.x,r.x,a.x,o.x),Ha(e,i.y,r.y,a.y,o.y),Ha(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},so=class extends $n{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yl=class extends $n{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ro=class extends $n{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ka(e,i.x,r.x,a.x),ka(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ao=class extends $n{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(ka(e,i.x,r.x,a.x),ka(e,i.y,r.y,a.y),ka(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oo=class extends $n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Pp(o,c.x,l.x,h.x,d.x),Pp(o,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new he().fromArray(i))}return this}},Zl=Object.freeze({__proto__:null,ArcCurve:Xl,CatmullRomCurve3:Ji,CubicBezierCurve:io,CubicBezierCurve3:ql,EllipseCurve:Qr,LineCurve:so,LineCurve3:Yl,QuadraticBezierCurve:ro,QuadraticBezierCurve3:ao,SplineCurve:oo}),Kl=class extends $n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Zl[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},er=class extends Kl{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new so(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new ro(this.currentPoint.clone(),new he(e,t),new he(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new io(this.currentPoint.clone(),new he(e,t),new he(n,i),new he(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new oo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,a,o,c),this}absellipse(e,t,n,i,r,a,o,c){let l=new Qr(e,t,n,i,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ea=class extends er{constructor(e){super(e),this.uuid=xi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new er().fromJSON(i))}return this}};function z1(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=A0(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=W1(s,e,r,t)),s.length>80*t){o=s[0],c=s[1];let h=o,d=c;for(let f=t;f<i;f+=t){let u=s[f],p=s[f+1];u<o&&(o=u),p<c&&(c=p),u>h&&(h=u),p>d&&(d=p)}l=Math.max(h-o,d-c),l=l!==0?32767/l:0}return lo(r,a,t,o,c,l,0),a}function A0(s,e,t,n,i){let r;if(i===tx(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=Ip(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Ip(a/n|0,s[a],s[a+1],r);return r&&ta(r,r.next)&&(ho(r),r=r.next),r}function tr(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(ta(t,t.next)||Yt(t.prev,t,t.next)===0)){if(ho(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function lo(s,e,t,n,i,r,a){if(!s)return;!a&&r&&K1(s,n,i,r);let o=s;for(;s.prev!==s.next;){let c=s.prev,l=s.next;if(r?H1(s,n,i,r):k1(s)){e.push(c.i,s.i,l.i),ho(s),s=l.next,o=l.next;continue}if(s=l,s===o){a?a===1?(s=G1(tr(s),e),lo(s,e,t,n,i,r,2)):a===2&&V1(s,e,t,n,i,r):lo(tr(s),e,t,n,i,r,1);break}}}function k1(s){let e=s.prev,t=s,n=s.next;if(Yt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,r,a),d=Math.min(o,c,l),f=Math.max(i,r,a),u=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=f&&p.y>=d&&p.y<=u&&Fa(i,o,r,c,a,l,p.x,p.y)&&Yt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function H1(s,e,t,n){let i=s.prev,r=s,a=s.next;if(Yt(i,r,a)>=0)return!1;let o=i.x,c=r.x,l=a.x,h=i.y,d=r.y,f=a.y,u=Math.min(o,c,l),p=Math.min(h,d,f),x=Math.max(o,c,l),g=Math.max(h,d,f),m=cu(u,p,e,t,n),v=cu(x,g,e,t,n),M=s.prevZ,_=s.nextZ;for(;M&&M.z>=m&&_&&_.z<=v;){if(M.x>=u&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Fa(o,h,c,d,l,f,M.x,M.y)&&Yt(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=u&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Fa(o,h,c,d,l,f,_.x,_.y)&&Yt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=m;){if(M.x>=u&&M.x<=x&&M.y>=p&&M.y<=g&&M!==i&&M!==a&&Fa(o,h,c,d,l,f,M.x,M.y)&&Yt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=u&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&Fa(o,h,c,d,l,f,_.x,_.y)&&Yt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function G1(s,e){let t=s;do{let n=t.prev,i=t.next.next;!ta(n,i)&&C0(n,t,t.next,i)&&co(n,i)&&co(i,n)&&(e.push(n.i,t.i,i.i),ho(t),ho(t.next),t=s=i),t=t.next}while(t!==s);return tr(t)}function V1(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&j1(a,o)){let c=P0(a,o);a=tr(a,a.next),c=tr(c,c.next),lo(a,e,t,n,i,r,0),lo(c,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function W1(s,e,t,n){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:s.length,l=A0(s,o,c,n,!1);l===l.next&&(l.steiner=!0),i.push($1(l))}i.sort(X1);for(let r=0;r<i.length;r++)t=q1(i[r],t);return t}function X1(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function q1(s,e){let t=Y1(s,e);if(!t)return e;let n=P0(t,s);return tr(n,n.next),tr(t,t.next)}function Y1(s,e){let t=e,n=s.x,i=s.y,r=-1/0,a;if(ta(s,t))return t;do{if(ta(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&R0(i<l?n:r,i,c,l,i<l?r:n,i,t.x,t.y)){let d=Math.abs(i-t.y)/(n-t.x);co(t,s)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&Z1(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function Z1(s,e){return Yt(s.prev,s,e.prev)<0&&Yt(e.next,s,s.next)<0}function K1(s,e,t,n){let i=s;do i.z===0&&(i.z=cu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,J1(i)}function J1(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function cu(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function $1(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function R0(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function Fa(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&R0(s,e,t,n,i,r,a,o)}function j1(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Q1(s,e)&&(co(s,e)&&co(e,s)&&ex(s,e)&&(Yt(s.prev,s,e.prev)||Yt(s,e.prev,e))||ta(s,e)&&Yt(s.prev,s,s.next)>0&&Yt(e.prev,e,e.next)>0)}function Yt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ta(s,e){return s.x===e.x&&s.y===e.y}function C0(s,e,t,n){let i=Al(Yt(s,e,t)),r=Al(Yt(s,e,n)),a=Al(Yt(t,n,s)),o=Al(Yt(t,n,e));return!!(i!==r&&a!==o||i===0&&Tl(s,t,e)||r===0&&Tl(s,n,e)||a===0&&Tl(t,s,n)||o===0&&Tl(t,e,n))}function Tl(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Al(s){return s>0?1:s<0?-1:0}function Q1(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&C0(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function co(s,e){return Yt(s.prev,s,s.next)<0?Yt(s,e,s.next)>=0&&Yt(s,s.prev,e)>=0:Yt(s,e,s.prev)<0||Yt(s,s.next,e)<0}function ex(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function P0(s,e){let t=hu(s.i,s.x,s.y),n=hu(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ip(s,e,t,n){let i=hu(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ho(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function hu(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function tx(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var uu=class{static triangulate(e,t,n=2){return z1(e,t,n)}},Xs=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Lp(e),Np(n,e);let a=e.length;t.forEach(Lp);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,Np(n,t[c]);let o=uu.triangulate(n,i);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Lp(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Np(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var uo=class s extends _t{constructor(e=new ea([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new Xe(i,3)),this.setAttribute("uv",new Xe(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,u=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:u-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:nx,M,_=!1,b,S,y,E;if(m){M=m.getSpacedPoints(h),_=!0,f=!1;let se=m.isCatmullRomCurve3?m.closed:!1;b=m.computeFrenetFrames(h,se),S=new N,y=new N,E=new N}f||(g=0,u=0,p=0,x=0);let A=o.extractPoints(l),R=A.shape,L=A.holes;if(!Xs.isClockWise(R)){R=R.reverse();for(let se=0,ue=L.length;se<ue;se++){let ce=L[se];Xs.isClockWise(ce)&&(L[se]=ce.reverse())}}function X(se){let ce=10000000000000001e-36,Re=se[0];for(let _e=1;_e<=se.length;_e++){let Ze=_e%se.length,ze=se[Ze],st=ze.x-Re.x,rt=ze.y-Re.y,gt=st*st+rt*rt,k=Math.max(Math.abs(ze.x),Math.abs(ze.y),Math.abs(Re.x),Math.abs(Re.y)),Jt=ce*k*k;if(gt<=Jt){se.splice(Ze,1),_e--;continue}Re=ze}}X(R),L.forEach(X);let U=L.length,V=R;for(let se=0;se<U;se++){let ue=L[se];R=R.concat(ue)}function H(se,ue,ce){return ue||Je("ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(ue,ce)}let P=R.length;function q(se,ue,ce){let Re,_e,Ze,ze=se.x-ue.x,st=se.y-ue.y,rt=ce.x-se.x,gt=ce.y-se.y,k=ze*ze+st*st,Jt=ze*gt-st*rt;if(Math.abs(Jt)>Number.EPSILON){let ht=Math.sqrt(k),St=Math.sqrt(rt*rt+gt*gt),ve=ue.x-st/ht,kt=ue.y+ze/ht,qe=ce.x-gt/St,Ke=ce.y+rt/St,C=((qe-ve)*gt-(Ke-kt)*rt)/(ze*gt-st*rt);Re=ve+ze*C-se.x,_e=kt+st*C-se.y;let w=Re*Re+_e*_e;if(w<=2)return new he(Re,_e);Ze=Math.sqrt(w/2)}else{let ht=!1;ze>Number.EPSILON?rt>Number.EPSILON&&(ht=!0):ze<-Number.EPSILON?rt<-Number.EPSILON&&(ht=!0):Math.sign(st)===Math.sign(gt)&&(ht=!0),ht?(Re=-st,_e=ze,Ze=Math.sqrt(k)):(Re=ze,_e=st,Ze=Math.sqrt(k/2))}return new he(Re/Ze,_e/Ze)}let I=[];for(let se=0,ue=V.length,ce=ue-1,Re=se+1;se<ue;se++,ce++,Re++)ce===ue&&(ce=0),Re===ue&&(Re=0),I[se]=q(V[se],V[ce],V[Re]);let J=[],W,F=I.concat();for(let se=0,ue=U;se<ue;se++){let ce=L[se];W=[];for(let Re=0,_e=ce.length,Ze=_e-1,ze=Re+1;Re<_e;Re++,Ze++,ze++)Ze===_e&&(Ze=0),ze===_e&&(ze=0),W[Re]=q(ce[Re],ce[Ze],ce[ze]);J.push(W),F=F.concat(W)}let G;if(g===0)G=Xs.triangulateShape(V,L);else{let se=[],ue=[];for(let ce=0;ce<g;ce++){let Re=ce/g,_e=u*Math.cos(Re*Math.PI/2),Ze=p*Math.sin(Re*Math.PI/2)+x;for(let ze=0,st=V.length;ze<st;ze++){let rt=H(V[ze],I[ze],Ze);Be(rt.x,rt.y,-_e),Re===0&&se.push(rt)}for(let ze=0,st=U;ze<st;ze++){let rt=L[ze];W=J[ze];let gt=[];for(let k=0,Jt=rt.length;k<Jt;k++){let ht=H(rt[k],W[k],Ze);Be(ht.x,ht.y,-_e),Re===0&&gt.push(ht)}Re===0&&ue.push(gt)}}G=Xs.triangulateShape(se,ue)}let D=G.length,Q=p+x;for(let se=0;se<P;se++){let ue=f?H(R[se],F[se],Q):R[se];_?(y.copy(b.normals[0]).multiplyScalar(ue.x),S.copy(b.binormals[0]).multiplyScalar(ue.y),E.copy(M[0]).add(y).add(S),Be(E.x,E.y,E.z)):Be(ue.x,ue.y,0)}for(let se=1;se<=h;se++)for(let ue=0;ue<P;ue++){let ce=f?H(R[ue],F[ue],Q):R[ue];_?(y.copy(b.normals[se]).multiplyScalar(ce.x),S.copy(b.binormals[se]).multiplyScalar(ce.y),E.copy(M[se]).add(y).add(S),Be(E.x,E.y,E.z)):Be(ce.x,ce.y,d/h*se)}for(let se=g-1;se>=0;se--){let ue=se/g,ce=u*Math.cos(ue*Math.PI/2),Re=p*Math.sin(ue*Math.PI/2)+x;for(let _e=0,Ze=V.length;_e<Ze;_e++){let ze=H(V[_e],I[_e],Re);Be(ze.x,ze.y,d+ce)}for(let _e=0,Ze=L.length;_e<Ze;_e++){let ze=L[_e];W=J[_e];for(let st=0,rt=ze.length;st<rt;st++){let gt=H(ze[st],W[st],Re);_?Be(gt.x,gt.y+M[h-1].y,M[h-1].x+ce):Be(gt.x,gt.y,d+ce)}}}ae(),Ie();function ae(){let se=i.length/3;if(f){let ue=0,ce=P*ue;for(let Re=0;Re<D;Re++){let _e=G[Re];nt(_e[2]+ce,_e[1]+ce,_e[0]+ce)}ue=h+g*2,ce=P*ue;for(let Re=0;Re<D;Re++){let _e=G[Re];nt(_e[0]+ce,_e[1]+ce,_e[2]+ce)}}else{for(let ue=0;ue<D;ue++){let ce=G[ue];nt(ce[2],ce[1],ce[0])}for(let ue=0;ue<D;ue++){let ce=G[ue];nt(ce[0]+P*h,ce[1]+P*h,ce[2]+P*h)}}n.addGroup(se,i.length/3-se,0)}function Ie(){let se=i.length/3,ue=0;ye(V,ue),ue+=V.length;for(let ce=0,Re=L.length;ce<Re;ce++){let _e=L[ce];ye(_e,ue),ue+=_e.length}n.addGroup(se,i.length/3-se,1)}function ye(se,ue){let ce=se.length;for(;--ce>=0;){let Re=ce,_e=ce-1;_e<0&&(_e=se.length-1);for(let Ze=0,ze=h+g*2;Ze<ze;Ze++){let st=P*Ze,rt=P*(Ze+1),gt=ue+Re+st,k=ue+_e+st,Jt=ue+_e+rt,ht=ue+Re+rt;Fe(gt,k,Jt,ht)}}}function Be(se,ue,ce){c.push(se),c.push(ue),c.push(ce)}function nt(se,ue,ce){je(se),je(ue),je(ce);let Re=i.length/3,_e=v.generateTopUV(n,i,Re-3,Re-2,Re-1);et(_e[0]),et(_e[1]),et(_e[2])}function Fe(se,ue,ce,Re){je(se),je(ue),je(Re),je(ue),je(ce),je(Re);let _e=i.length/3,Ze=v.generateSideWallUV(n,i,_e-6,_e-3,_e-2,_e-1);et(Ze[0]),et(Ze[1]),et(Ze[3]),et(Ze[1]),et(Ze[2]),et(Ze[3])}function je(se){i.push(c[se*3+0]),i.push(c[se*3+1]),i.push(c[se*3+2])}function et(se){r.push(se.x),r.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ix(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Zl[i.type]().fromJSON(i)),new s(n,e.options)}},nx={generateTopUV:function(s,e,t,n,i){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[i*3],h=e[i*3+1];return[new he(r,a),new he(o,c),new he(l,h)]},generateSideWallUV:function(s,e,t,n,i,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],d=e[n*3+2],f=e[i*3],u=e[i*3+1],p=e[i*3+2],x=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new he(a,1-c),new he(l,1-d),new he(f,1-p),new he(x,1-m)]:[new he(o,1-c),new he(h,1-d),new he(u,1-p),new he(g,1-m)]}};function ix(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var $i=class s extends jr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},fo=class s extends _t{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=lt(i,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,d=new N,f=new he,u=new N,p=new N,x=new N,g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,u.x=m*1,u.y=-g,u.z=m*0,x.copy(u),u.normalize(),c.push(u.x,u.y,u.z);break;case e.length-1:x.normalize(),c.push(x.x,x.y,x.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,u.x=m*1,u.y=-g,u.z=m*0,p.copy(u),u.x+=x.x,u.y+=x.y,u.z+=x.z,u.normalize(),c.push(u.x,u.y,u.z),x.copy(p)}for(let v=0;v<=t;v++){let M=n+v*h*i,_=Math.sin(M),b=Math.cos(M);for(let S=0;S<=e.length-1;S++){d.x=e[S].x*_,d.y=e[S].y,d.z=e[S].x*b,a.push(d.x,d.y,d.z),f.x=v/t,f.y=S/(e.length-1),o.push(f.x,f.y);let y=c[3*S+0]*_,E=c[3*S+1],A=c[3*S+0]*b;l.push(y,E,A)}}for(let v=0;v<t;v++)for(let M=0;M<e.length-1;M++){let _=M+v*e.length,b=_,S=_+e.length,y=_+e.length+1,E=_+1;r.push(b,S,E),r.push(y,E,S)}this.setIndex(r),this.setAttribute("position",new Xe(a,3)),this.setAttribute("uv",new Xe(o,2)),this.setAttribute("normal",new Xe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},nr=class s extends jr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Vt=class s extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,d=e/o,f=t/c,u=[],p=[],x=[],g=[];for(let m=0;m<h;m++){let v=m*f-a;for(let M=0;M<l;M++){let _=M*d-r;p.push(_,-v,0),x.push(0,0,1),g.push(M/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<o;v++){let M=v+l*m,_=v+l*(m+1),b=v+1+l*(m+1),S=v+1+l*m;u.push(M,_,S),u.push(_,b,S)}this.setIndex(u),this.setAttribute("position",new Xe(p,3)),this.setAttribute("normal",new Xe(x,3)),this.setAttribute("uv",new Xe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Ss=class s extends _t{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],c=[],l=[],h=[],d=e,f=(t-e)/i,u=new N,p=new he;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let m=r+g/n*a;u.x=d*Math.cos(m),u.y=d*Math.sin(m),c.push(u.x,u.y,u.z),l.push(0,0,1),p.x=(u.x/t+1)/2,p.y=(u.y/t+1)/2,h.push(p.x,p.y)}d+=f}for(let x=0;x<i;x++){let g=x*(n+1);for(let m=0;m<n;m++){let v=m+g,M=v,_=v+n+1,b=v+n+2,S=v+1;o.push(M,_,S),o.push(_,b,S)}}this.setIndex(o),this.setAttribute("position",new Xe(c,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var pi=class s extends _t{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new N,f=new N,u=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let v=[],M=m/n,_=a+M*o,b=e*Math.cos(_),S=Math.sqrt(e*e-b*b),y=0;m===0&&a===0?y=.5/t:m===n&&c===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){let A=E/t,R=i+A*r;d.x=-S*Math.cos(R),d.y=b,d.z=S*Math.sin(R),p.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),g.push(A+y,1-M),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){let M=h[m][v+1],_=h[m][v],b=h[m+1][v],S=h[m+1][v+1];(m!==0||a>0)&&u.push(M,_,S),(m!==n-1||c<Math.PI)&&u.push(_,b,S)}this.setIndex(u),this.setAttribute("position",new Xe(p,3)),this.setAttribute("normal",new Xe(x,3)),this.setAttribute("uv",new Xe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var jn=class s extends _t{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],h=[],d=[],f=new N,u=new N,p=new N;for(let x=0;x<=n;x++){let g=a+x/n*o;for(let m=0;m<=i;m++){let v=m/i*r;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),l.push(u.x,u.y,u.z),f.x=e*Math.cos(v),f.y=e*Math.sin(v),p.subVectors(u,f).normalize(),h.push(p.x,p.y,p.z),d.push(m/i),d.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){let m=(i+1)*x+g-1,v=(i+1)*(x-1)+g-1,M=(i+1)*(x-1)+g,_=(i+1)*x+g;c.push(m,v,_),c.push(v,M,_)}this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(h,3)),this.setAttribute("uv",new Xe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var ir=class s extends _t{constructor(e=new ao(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,c=new N,l=new he,h=new N,d=[],f=[],u=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Xe(d,3)),this.setAttribute("normal",new Xe(f,3)),this.setAttribute("uv",new Xe(u,2));function x(){for(let M=0;M<t;M++)g(M);g(r===!1?t:0),v(),m()}function g(M){h=e.getPointAt(M/t,h);let _=a.normals[M],b=a.binormals[M];for(let S=0;S<=i;S++){let y=S/i*Math.PI*2,E=Math.sin(y),A=-Math.cos(y);c.x=A*_.x+E*b.x,c.y=A*_.y+E*b.y,c.z=A*_.z+E*b.z,c.normalize(),f.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,d.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=t;M++)for(let _=1;_<=i;_++){let b=(i+1)*(M-1)+(_-1),S=(i+1)*M+(_-1),y=(i+1)*M+_,E=(i+1)*(M-1)+_;p.push(b,S,E),p.push(S,y,E)}}function v(){for(let M=0;M<=t;M++)for(let _=0;_<=i;_++)l.x=M/t,l.y=_/i,u.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Zl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function ur(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(Dp(i))i.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Dp(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Cn(s){let e={};for(let t=0;t<s.length;t++){let n=ur(s[t]);for(let i in n)e[i]=n[i]}return e}function Dp(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function sx(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Ku(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var I0={clone:ur,merge:Cn},rx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ax=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zt=class extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rx,this.fragmentShader=ax,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ur(e.uniforms),this.uniformsGroups=sx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Se().setHex(i.value);break;case"v2":this.uniforms[n].value=new he().fromArray(i.value);break;case"v3":this.uniforms[n].value=new N().fromArray(i.value);break;case"v4":this.uniforms[n].value=new mt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new $e().fromArray(i.value);break;case"m4":this.uniforms[n].value=new We().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Jl=class extends zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ji=class extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ua,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Fn=class extends ji{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return qs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){qs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ot=class extends Rn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Se(16777215),this.specular=new Se(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ua,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.combine=So,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var po=class extends Rn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ua,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gt,this.combine=So,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},$l=class extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=p0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},jl=class extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function _s(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Oa(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function ox(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Up(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function lx(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Ti=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ql=class extends Ti{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ru,endingEnd:ru}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case au:r=e,o=2*t-n;break;case ou:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case au:a=e,c=2*n-t;break;case ou:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,u=this._weightNext,p=(n-t)/(i-t),x=p*p,g=x*p,m=-f*g+2*f*x-f*p,v=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*p+1,M=(-1-u)*g+(1.5+u)*x+.5*p,_=u*g-u*x;for(let b=0;b!==o;++b)r[b]=m*a[h+b]+v*a[l+b]+M*a[c+b]+_*a[d+b];return r}},ec=class extends Ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),d=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*d+a[c+f]*h;return r}},tc=class extends Ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},nc=class extends Ti{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-t)/(i-t),x=1-p;for(let g=0;g!==o;++g)r[g]=a[l+g]*x+a[c+g]*p;return r}let f=o*2,u=e-1;for(let p=0;p!==o;++p){let x=a[l+p],g=a[c+p],m=u*f+p*2,v=d[m],M=d[m+1],_=e*f+p*2,b=h[_],S=h[_+1],y=hx(n,t,v,b,i);r[p]=L0(y,x,M,S,g)}return r}};function L0(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function cx(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function hx(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){let o=L0(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;let c=cx(r,e,t,n,i);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Vn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_s(t,this.TimeBufferType),this.values=_s(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_s(e.times,Array),values:_s(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Oa(e.settings)&&(n.settings={inTangents:_s(e.settings.inTangents,Array),outTangents:_s(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new tc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ec(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ql(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new nc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ys:t=this.InterpolantFactoryMethodDiscrete;break;case Zs:t=this.InterpolantFactoryMethodLinear;break;case Pl:t=this.InterpolantFactoryMethodSmooth;break;case su:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ve("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ys;case this.InterpolantFactoryMethodLinear:return Zs;case this.InterpolantFactoryMethodSmooth:return Pl;case this.InterpolantFactoryMethodBezier:return su}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;Oa(this.settings)&&(Fp(this.settings.inTangents,e),Fp(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Oa(this.settings)&&(Op(this.settings.inTangents,e),Op(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Je("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Je("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Kg(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){Je("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Pl,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let d=o*n,f=d-n,u=d+n;for(let p=0;p!==n;++p){let x=t[d+p];if(x!==t[f+p]||x!==t[u+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,f=a*n;for(let u=0;u!==n;++u)t[f+u]=t[d+u]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Oa(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Fp(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]+=e}function Op(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}Vn.prototype.ValueTypeName="";Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=Zs;var Qi=class extends Vn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="bool";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=Ys;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var mo=class extends Vn{constructor(e,t,n,i){super(e,t,n,i)}};mo.prototype.ValueTypeName="color";var es=class extends Vn{constructor(e,t,n,i){super(e,t,n,i)}};es.prototype.ValueTypeName="number";var ic=class extends Ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)en.slerpFlat(r,0,a,l-o,a,l,c);return r}},ts=class extends Vn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ic(this.times,this.values,this.getValueSize(),e)}};ts.prototype.ValueTypeName="quaternion";ts.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends Vn{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Ys;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var Es=class extends Vn{constructor(e,t,n,i){super(e,t,n,i)}};Es.prototype.ValueTypeName="vector";var go=class{constructor(e="",t=-1,n=[],i=d0){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=xi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(fx(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Vn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=ox(c);c=Up(c,1,h),l=Up(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new es(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let d=h[1],f=i[d];f||(i[d]=f=[]),f.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function ux(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return es;case"vector":case"vector2":case"vector3":case"vector4":return Es;case"color":return mo;case"quaternion":return ts;case"bool":case"boolean":return Qi;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function fx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=ux(s.type);if(s.times===void 0){let n=[],i=[];lx(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Oa(s.settings)&&(t.settings={inTangents:_s(s.settings.inTangents,Float32Array),outTangents:_s(s.settings.outTangents,Float32Array)}),t}var Si={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Bp(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Bp(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Bp(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var sc=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=l.length;d<f;d+=2){let u=l[d],p=l[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},N0=new sc,Ai=class{constructor(e){this.manager=e!==void 0?e:N0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Ai.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xi={},fu=class extends Error{constructor(e,t){super(e),this.response=t}},na=class extends Ai{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Si.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Xi[e]!==void 0){Xi[e].push({onLoad:t,onProgress:n,onError:i});return}Xi[e]=[],Xi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ve("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Xi[e],d=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),u=f?parseInt(f):0,p=u!==0,x=0,g=new ReadableStream({start(m){v();function v(){d.read().then(({done:M,value:_})=>{if(M)m.close();else{x+=_.byteLength;let b=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:u});for(let S=0,y=h.length;S<y;S++){let E=h[S];E.onProgress&&E.onProgress(b)}m.enqueue(_),v()}},M=>{m.error(M)})}}});return new Response(g)}else throw new fu(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),f=d&&d[1]?d[1].toLowerCase():void 0,u=new TextDecoder(f);return l.arrayBuffer().then(p=>u.decode(p))}}}).then(l=>{Si.add(`file:${e}`,l);let h=Xi[e];delete Xi[e];for(let d=0,f=h.length;d<f;d++){let u=h[d];u.onLoad&&u.onLoad(l)}}).catch(l=>{let h=Xi[e];if(h===void 0)throw this.manager.itemError(e),l;delete Xi[e];for(let d=0,f=h.length;d<f;d++){let u=h[d];u.onError&&u.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ur=new WeakMap,rc=class extends Ai{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Si.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Ur.get(a);d===void 0&&(d=[],Ur.set(a,d)),d.push({onLoad:t,onError:i})}return a}let o=Gr("img");function c(){h(),t&&t(this);let d=Ur.get(this)||[];for(let f=0;f<d.length;f++){let u=d[f];u.onLoad&&u.onLoad(this)}Ur.delete(this),r.manager.itemEnd(e)}function l(d){h(),i&&i(d),Si.remove(`image:${e}`);let f=Ur.get(this)||[];for(let u=0;u<f.length;u++){let p=f[u];p.onError&&p.onError(d)}Ur.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Si.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var is=class extends Ai{constructor(e){super(e)}load(e,t,n,i){let r=new hn,a=new rc(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},sr=class extends Pt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},xo=class extends sr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},tu=new We,zp=new N,kp=new N,ia=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=Xn,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bs,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;zp.setFromMatrixPosition(e.matrixWorld),t.position.copy(zp),kp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(kp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){tu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(tu,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,c=i?i.x/r.x:0,l=i?i.y/r.y:0;e.coordinateSystem===Hr||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(tu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Rl=new N,Cl=new en,bi=new N,vo=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Rl,Cl,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rl,Cl,bi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Rl,Cl,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rl,Cl,bi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},vs=new N,Hp=new he,Gp=new he,cn=class extends vo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ks*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ba*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(Ba*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vs.x,vs.y).multiplyScalar(-e/vs.z),vs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vs.x,vs.y).multiplyScalar(-e/vs.z)}getViewSize(e,t){return this.getViewBounds(e,Hp,Gp),t.subVectors(Gp,Hp)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ba*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},du=class extends ia{constructor(){super(new cn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ks*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},_o=class extends sr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new du}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},pu=class extends ia{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0}},yo=class extends sr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new pu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},rr=class extends vo{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},mu=class extends ia{constructor(){super(new rr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ws=class extends sr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new mu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ss=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ts=class extends _t{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var nu=new WeakMap,Mo=class extends Ai{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ve("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ve("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Si.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{nu.has(a)===!0?(i&&i(nu.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Si.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),nu.set(c,l),Si.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Si.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Fr=-90,Or=1,sa=class extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new cn(Fr,Or,e,t);i.layers=this.layers,this.add(i);let r=new cn(Fr,Or,e,t);r.layers=this.layers,this.add(r);let a=new cn(Fr,Or,e,t);a.layers=this.layers,this.add(a);let o=new cn(Fr,Or,e,t);o.layers=this.layers,this.add(o);let c=new cn(Fr,Or,e,t);c.layers=this.layers,this.add(c);let l=new cn(Fr,Or,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===si)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,f,u),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ac=class extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Ju="\\[\\]\\.:\\/",dx=new RegExp("["+Ju+"]","g"),$u="[^"+Ju+"]",px="[^"+Ju.replace("\\.","")+"]",mx=/((?:WC+[\/:])*)/.source.replace("WC",$u),gx=/(WCOD+)?/.source.replace("WCOD",px),xx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$u),vx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$u),_x=new RegExp("^"+mx+gx+xx+vx+"$"),yx=["material","materials","bones","map"],gu=class{constructor(e,t,n){let i=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(dx,"")}static parseTrackName(e){let t=_x.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);yx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ve("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=gu;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var BS=new Float32Array(1);var sf=class sf{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};sf.prototype.isMatrix2=!0;var xu=sf;function ju(s,e,t,n){let i=Mx(n);switch(t){case Fu:return s*e;case pc:return s*e/i.components*i.byteLength;case mc:return s*e/i.components*i.byteLength;case As:return s*e*2/i.components*i.byteLength;case gc:return s*e*2/i.components*i.byteLength;case Ou:return s*e*3/i.components*i.byteLength;case ai:return s*e*4/i.components*i.byteLength;case xc:return s*e*4/i.components*i.byteLength;case Eo:case wo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case To:case Ao:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case _c:case Mc:return Math.max(s,16)*Math.max(e,8)/4;case vc:case yc:return Math.max(s,8)*Math.max(e,8)/2;case bc:case Sc:case wc:case Tc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ec:case Ro:case Ac:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Rc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Cc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Pc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Lc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Dc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Uc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Fc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Bc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case zc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case kc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Hc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Gc:case Vc:case Wc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Xc:case qc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Co:case Yc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Mx(s){switch(s){case Xn:case Lu:return{byteLength:1,components:1};case ca:case Nu:case gi:return{byteLength:2,components:1};case fc:case dc:return{byteLength:2,components:4};case mi:case uc:case Qn:return{byteLength:4,components:1};case Du:case Uu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function tm(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Sx(s){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,d=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,h),o.onUploadCallback();let u;if(l instanceof Float32Array)u=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)u=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?u=s.HALF_FLOAT:u=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=s.SHORT;else if(l instanceof Uint32Array)u=s.UNSIGNED_INT;else if(l instanceof Int32Array)u=s.INT;else if(l instanceof Int8Array)u=s.BYTE;else if(l instanceof Uint8Array)u=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let h=c.array,d=c.updateRanges;if(s.bindBuffer(l,o),d.length===0)s.bufferSubData(l,0,h);else{d.sort((u,p)=>u.start-p.start);let f=0;for(let u=1;u<d.length;u++){let p=d[f],x=d[u];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,d[f]=x)}d.length=f+1;for(let u=0,p=d.length;u<p;u++){let x=d[u];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var Ex=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wx=`#ifdef USE_ALPHAHASH
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
#endif`,Tx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ax=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Px=`#ifdef USE_AOMAP
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
#endif`,Ix=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lx=`#ifdef USE_BATCHING
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
#endif`,Nx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ux=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ox=`#ifdef USE_IRIDESCENCE
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
#endif`,Bx=`#ifdef USE_BUMPMAP
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
#endif`,zx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Wx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Xx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Yx=`#define PI 3.141592653589793
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
} // validated`,Zx=`vec3 transformedNormal = objectNormal;
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
#endif`,Kx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$x=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qx="gl_FragColor = linearToOutputTexel( gl_FragColor );",ev=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tv=`#ifdef USE_ENVMAP
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
#endif`,nv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,iv=`#ifdef USE_ENVMAP
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
#endif`,sv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rv=`#ifdef USE_ENVMAP
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
#endif`,av=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ov=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hv=`#ifdef USE_GRADIENTMAP
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
}`,uv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,mv=`#ifdef USE_ENVMAP
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
#endif`,gv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_v=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yv=`PhysicalMaterial material;
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
#endif`,Mv=`uniform sampler2D dfgLUT;
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
}`,bv=`
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
#endif`,Sv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ev=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wv=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Tv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Av=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Iv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Nv=`#if defined( USE_POINTS_UV )
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
#endif`,Dv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ov=`#if defined( USE_MORPHCOLORS )
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
#endif`,Bv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zv=`#ifdef USE_MORPHTARGETS
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
#endif`,kv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,qv=`#ifdef USE_NORMALMAP
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
#endif`,Yv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$v=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,e_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,t_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,n_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,i_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,s_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,r_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,a_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,o_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,l_=`float getShadowMask() {
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
}`,c_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,h_=`#ifdef USE_SKINNING
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
#endif`,u_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,f_=`#ifdef USE_SKINNING
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
#endif`,d_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,p_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,m_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,g_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,x_=`#ifdef USE_TRANSMISSION
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
#endif`,v_=`#ifdef USE_TRANSMISSION
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
#endif`,__=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,M_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,S_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E_=`uniform sampler2D t2D;
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
}`,w_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T_=`uniform float backgroundBlurriness;
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
}`,A_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,R_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C_=`#include <common>
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
}`,P_=`#if DEPTH_PACKING == 3200
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
}`,I_=`#define DISTANCE
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
}`,L_=`#define DISTANCE
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
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,D_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U_=`uniform float scale;
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
}`,F_=`uniform vec3 diffuse;
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
}`,O_=`#include <common>
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
}`,B_=`uniform vec3 diffuse;
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
}`,z_=`#define LAMBERT
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
}`,k_=`#define LAMBERT
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
}`,H_=`#define MATCAP
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
}`,G_=`#define MATCAP
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
}`,V_=`#define NORMAL
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
}`,W_=`#define NORMAL
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
}`,X_=`#define PHONG
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
}`,q_=`#define PHONG
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
}`,Y_=`#define STANDARD
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
}`,Z_=`#define STANDARD
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
}`,K_=`#define TOON
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
}`,J_=`#define TOON
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
}`,$_=`uniform float size;
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
}`,j_=`uniform vec3 diffuse;
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
}`,Q_=`#include <common>
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
}`,ey=`uniform vec3 color;
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
}`,ty=`uniform float rotation;
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
}`,ny=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:Ex,alphahash_pars_fragment:wx,alphamap_fragment:Tx,alphamap_pars_fragment:Ax,alphatest_fragment:Rx,alphatest_pars_fragment:Cx,aomap_fragment:Px,aomap_pars_fragment:Ix,batching_pars_vertex:Lx,batching_vertex:Nx,begin_vertex:Dx,beginnormal_vertex:Ux,bsdfs:Fx,iridescence_fragment:Ox,bumpmap_pars_fragment:Bx,clipping_planes_fragment:zx,clipping_planes_pars_fragment:kx,clipping_planes_pars_vertex:Hx,clipping_planes_vertex:Gx,color_fragment:Vx,color_pars_fragment:Wx,color_pars_vertex:Xx,color_vertex:qx,common:Yx,defaultnormal_vertex:Zx,displacementmap_pars_vertex:Kx,displacementmap_vertex:Jx,emissivemap_fragment:$x,emissivemap_pars_fragment:jx,colorspace_fragment:Qx,colorspace_pars_fragment:ev,envmap_fragment:tv,envmap_common_pars_fragment:nv,envmap_pars_fragment:iv,envmap_pars_vertex:sv,envmap_physical_pars_fragment:mv,envmap_vertex:rv,fog_vertex:av,fog_pars_vertex:ov,fog_fragment:lv,fog_pars_fragment:cv,gradientmap_pars_fragment:hv,lightmap_pars_fragment:uv,lights_lambert_fragment:fv,lights_lambert_pars_fragment:dv,lights_pars_begin:pv,lights_toon_fragment:gv,lights_toon_pars_fragment:xv,lights_phong_fragment:vv,lights_phong_pars_fragment:_v,lights_physical_fragment:yv,lights_physical_pars_fragment:Mv,lights_fragment_begin:bv,lights_fragment_maps:Sv,lights_fragment_end:Ev,lightprobes_pars_fragment:wv,logdepthbuf_fragment:Tv,logdepthbuf_pars_fragment:Av,logdepthbuf_pars_vertex:Rv,logdepthbuf_vertex:Cv,map_fragment:Pv,map_pars_fragment:Iv,map_particle_fragment:Lv,map_particle_pars_fragment:Nv,metalnessmap_fragment:Dv,metalnessmap_pars_fragment:Uv,morphinstance_vertex:Fv,morphcolor_vertex:Ov,morphnormal_vertex:Bv,morphtarget_pars_vertex:zv,morphtarget_vertex:kv,normal_fragment_begin:Hv,normal_fragment_maps:Gv,normal_pars_fragment:Vv,normal_pars_vertex:Wv,normal_vertex:Xv,normalmap_pars_fragment:qv,clearcoat_normal_fragment_begin:Yv,clearcoat_normal_fragment_maps:Zv,clearcoat_pars_fragment:Kv,iridescence_pars_fragment:Jv,opaque_fragment:$v,packing:jv,premultiplied_alpha_fragment:Qv,project_vertex:e_,dithering_fragment:t_,dithering_pars_fragment:n_,roughnessmap_fragment:i_,roughnessmap_pars_fragment:s_,shadowmap_pars_fragment:r_,shadowmap_pars_vertex:a_,shadowmap_vertex:o_,shadowmask_pars_fragment:l_,skinbase_vertex:c_,skinning_pars_vertex:h_,skinning_vertex:u_,skinnormal_vertex:f_,specularmap_fragment:d_,specularmap_pars_fragment:p_,tonemapping_fragment:m_,tonemapping_pars_fragment:g_,transmission_fragment:x_,transmission_pars_fragment:v_,uv_pars_fragment:__,uv_pars_vertex:y_,uv_vertex:M_,worldpos_vertex:b_,background_vert:S_,background_frag:E_,backgroundCube_vert:w_,backgroundCube_frag:T_,cube_vert:A_,cube_frag:R_,depth_vert:C_,depth_frag:P_,distance_vert:I_,distance_frag:L_,equirect_vert:N_,equirect_frag:D_,linedashed_vert:U_,linedashed_frag:F_,meshbasic_vert:O_,meshbasic_frag:B_,meshlambert_vert:z_,meshlambert_frag:k_,meshmatcap_vert:H_,meshmatcap_frag:G_,meshnormal_vert:V_,meshnormal_frag:W_,meshphong_vert:X_,meshphong_frag:q_,meshphysical_vert:Y_,meshphysical_frag:Z_,meshtoon_vert:K_,meshtoon_frag:J_,points_vert:$_,points_frag:j_,shadow_vert:Q_,shadow_frag:ey,sprite_vert:ty,sprite_frag:ny},Ae={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Pi={basic:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Se(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:Cn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:Cn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Se(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:Cn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:Cn([Ae.points,Ae.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:Cn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:Cn([Ae.common,Ae.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:Cn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:Cn([Ae.sprite,Ae.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:Cn([Ae.common,Ae.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:Cn([Ae.lights,Ae.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Pi.physical={uniforms:Cn([Pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};var Kc={r:0,b:0,g:0},iy=new We,nm=new $e;nm.set(-1,0,0,0,1,0,0,0,1);function sy(s,e,t,n,i,r){let a=new Se(0),o=i===!0?0:1,c,l,h=null,d=0,f=null;function u(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){let _=v.backgroundBlurriness>0;M=e.get(M,_)}return M}function p(v){let M=!1,_=u(v);_===null?g(a,o):_&&_.isColor&&(g(_,1),M=!0);let b=s.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(v,M){let _=u(M);_&&_.isCubeTexture?(l===void 0&&(l=new Qe(new Un(1,1,1),new zt({name:"BackgroundCubeMaterial",uniforms:ur(Pi.backgroundCube.uniforms),vertexShader:Pi.backgroundCube.vertexShader,fragmentShader:Pi.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,S,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(iy.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(nm),l.material.toneMapped=ut.getTransfer(_.colorSpace)!==Ct,(h!==_||d!==_.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Qe(new Vt(2,2),new zt({name:"BackgroundMaterial",uniforms:ur(Pi.background.uniforms),vertexShader:Pi.background.vertexShader,fragmentShader:Pi.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=ut.getTransfer(_.colorSpace)!==Ct,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,M){v.getRGB(Kc,Ku(s)),t.buffers.color.setClear(Kc.r,Kc.g,Kc.b,M,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),o=M,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:p,addToRenderList:x,dispose:m}}function ry(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null),r=i,a=!1;function o(L,z,X,U,V){let H=!1,P=d(L,U,X,z);r!==P&&(r=P,l(r.object)),H=u(L,U,X,V),H&&p(L,U,X,V),V!==null&&e.update(V,s.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,_(L,z,X,U),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return s.createVertexArray()}function l(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function d(L,z,X,U){let V=U.wireframe===!0,H=n[z.id];H===void 0&&(H={},n[z.id]=H);let P=L.isInstancedMesh===!0?L.id:0,q=H[P];q===void 0&&(q={},H[P]=q);let I=q[X.id];I===void 0&&(I={},q[X.id]=I);let J=I[V];return J===void 0&&(J=f(c()),I[V]=J),J}function f(L){let z=[],X=[],U=[];for(let V=0;V<t;V++)z[V]=0,X[V]=0,U[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:X,attributeDivisors:U,object:L,attributes:{},index:null}}function u(L,z,X,U){let V=r.attributes,H=z.attributes,P=0,q=X.getAttributes();for(let I in q)if(q[I].location>=0){let W=V[I],F=H[I];if(F===void 0&&(I==="instanceMatrix"&&L.instanceMatrix&&(F=L.instanceMatrix),I==="instanceColor"&&L.instanceColor&&(F=L.instanceColor)),W===void 0||W.attribute!==F||F&&W.data!==F.data)return!0;P++}return r.attributesNum!==P||r.index!==U}function p(L,z,X,U){let V={},H=z.attributes,P=0,q=X.getAttributes();for(let I in q)if(q[I].location>=0){let W=H[I];W===void 0&&(I==="instanceMatrix"&&L.instanceMatrix&&(W=L.instanceMatrix),I==="instanceColor"&&L.instanceColor&&(W=L.instanceColor));let F={};F.attribute=W,W&&W.data&&(F.data=W.data),V[I]=F,P++}r.attributes=V,r.attributesNum=P,r.index=U}function x(){let L=r.newAttributes;for(let z=0,X=L.length;z<X;z++)L[z]=0}function g(L){m(L,0)}function m(L,z){let X=r.newAttributes,U=r.enabledAttributes,V=r.attributeDivisors;X[L]=1,U[L]===0&&(s.enableVertexAttribArray(L),U[L]=1),V[L]!==z&&(s.vertexAttribDivisor(L,z),V[L]=z)}function v(){let L=r.newAttributes,z=r.enabledAttributes;for(let X=0,U=z.length;X<U;X++)z[X]!==L[X]&&(s.disableVertexAttribArray(X),z[X]=0)}function M(L,z,X,U,V,H,P){P===!0?s.vertexAttribIPointer(L,z,X,V,H):s.vertexAttribPointer(L,z,X,U,V,H)}function _(L,z,X,U){x();let V=U.attributes,H=X.getAttributes(),P=z.defaultAttributeValues;for(let q in H){let I=H[q];if(I.location>=0){let J=V[q];if(J===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(J=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(J=L.instanceColor)),J!==void 0){let W=J.normalized,F=J.itemSize,G=e.get(J);if(G===void 0)continue;let D=G.buffer,Q=G.type,ae=G.bytesPerElement,Ie=Q===s.INT||Q===s.UNSIGNED_INT||J.gpuType===uc;if(J.isInterleavedBufferAttribute){let ye=J.data,Be=ye.isInterleavedBuffer===!0?ye.stride:ye.itemSize,nt=J.offset;if(ye.isInstancedInterleavedBuffer||ye.isInstancedBufferAttribute){for(let Fe=0;Fe<I.locationSize;Fe++)m(I.location+Fe,ye.meshPerAttribute);L.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Fe=0;Fe<I.locationSize;Fe++)g(I.location+Fe);s.bindBuffer(s.ARRAY_BUFFER,D);for(let Fe=0;Fe<I.locationSize;Fe++)M(I.location+Fe,F/I.locationSize,Q,W,Be*ae,(nt+F/I.locationSize*Fe)*ae,Ie)}else{if(J.isInstancedBufferAttribute){for(let ye=0;ye<I.locationSize;ye++)m(I.location+ye,J.meshPerAttribute);L.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ye=0;ye<I.locationSize;ye++)g(I.location+ye);s.bindBuffer(s.ARRAY_BUFFER,D);for(let ye=0;ye<I.locationSize;ye++)M(I.location+ye,F/I.locationSize,Q,W,F*ae,F/I.locationSize*ye*ae,Ie)}}else if(P!==void 0){let W=P[q];if(W!==void 0)switch(W.length){case 2:s.vertexAttrib2fv(I.location,W);break;case 3:s.vertexAttrib3fv(I.location,W);break;case 4:s.vertexAttrib4fv(I.location,W);break;default:s.vertexAttrib1fv(I.location,W)}}}}v()}function b(){A();for(let L in n){let z=n[L];for(let X in z){let U=z[X];for(let V in U){let H=U[V];for(let P in H)h(H[P].object),delete H[P];delete U[V]}}delete n[L]}}function S(L){if(n[L.id]===void 0)return;let z=n[L.id];for(let X in z){let U=z[X];for(let V in U){let H=U[V];for(let P in H)h(H[P].object),delete H[P];delete U[V]}}delete n[L.id]}function y(L){for(let z in n){let X=n[z];for(let U in X){let V=X[U];if(V[L.id]===void 0)continue;let H=V[L.id];for(let P in H)h(H[P].object),delete H[P];delete V[L.id]}}}function E(L){for(let z in n){let X=n[z],U=L.isInstancedMesh===!0?L.id:0,V=X[U];if(V!==void 0){for(let H in V){let P=V[H];for(let q in P)h(P[q].object),delete P[q];delete V[H]}delete X[U],Object.keys(X).length===0&&delete n[z]}}}function A(){R(),a=!0,r!==i&&(r=i,l(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfObject:E,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function ay(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let u=0;u<h;u++)f+=l[u];t.update(f,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function oy(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(y){return!(y!==ai&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(y){let E=y===gi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==Xn&&y!==Qn&&!E&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ve("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&Ve("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,maxSamples:b,samples:S}}function ly(s){let e=this,t=null,n=0,i=!1,r=!1,a=new di,o=new $e,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let u=d.length!==0||f||n!==0||i;return i=f,n=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,u){let p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!g)r?h(null):l();else{let v=r?0:n,M=v*4,_=m.clippingState||null;c.value=_,_=h(p,f,M,u);for(let b=0;b!==M;++b)_[b]=t[b];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,u,p){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=c.value,p!==!0||g===null){let m=u+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,_=u;M!==x;++M,_+=4)a.copy(d[M]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var No=class extends Kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new ja(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Un(5,5,5),r=new zt({name:"CubemapFromEquirect",uniforms:ur(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:On,blending:ar});r.uniforms.tEquirect.value=t;let a=new Qe(i,r),o=t.minFilter;return t.minFilter===Wn&&(t.minFilter=Qt),new sa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}},D0=256,cy=3,hy=20,im=256,sm=16,uy=3,fy=new N,dy=new Se,$c=class s{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new sa(1,10,null),this._boxMesh=new Qe(new Un(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=fy}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let d=c.autoClear,f=c.autoClearColor,u=c.autoClearDepth,p=c.autoClearStencil,x=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(e.background=c.getClearColor(dy));let g=new sa(n,i,h);return g.position.copy(o),g.update(c,e),c.autoClear=d,c.autoClearColor=f,c.autoClearDepth=u,c.autoClearStencil=p,e.background=x,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=O0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=F0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(D0,Xu(e))}_fromTexture(e,t){e.mapping===lr||e.mapping===oa?this._setSize(e.image.length===0?D0:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=U0(e,!1,!1),n=Math.log2(e)-cy;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=U0(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===lr||e.mapping===oa?(this._cubemapMaterial===null&&(this._cubemapMaterial=O0()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=F0()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=py(),this._integrationMaterial=my());let t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/sm);for(let a=0;a<=n;a++){let o=s.lodToRoughness(a,n);if(a>n-uy)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(im*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=gy());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(r,0,n)}};function U0(s,e,t){return new No(s,{minFilter:Wn,generateMipmaps:e,type:gi,colorSpace:Dn,depthBuffer:t})}function Do(s,e,t){return new zt({name:s,uniforms:e,vertexShader:ct.cube_vert,fragmentShader:t,side:On,blending:ar,depthTest:!1,depthWrite:!1})}function py(){return Do("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${im}u

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
	`)}function my(){return Do("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:sm}},`

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
	`)}function gy(){return Do("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${hy}
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
	`)}function F0(){return Do("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function O0(){return Do("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function xy(s){let e=new WeakMap,t=new WeakMap,n=null;function i(f,u=!1){return f==null?null:u?a(f):r(f)}function r(f){if(f&&f.isTexture){let u=f.mapping;if(u===lc||u===cc)if(e.has(f)){let p=e.get(f).texture;return o(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let x=new No(p.height);return x.fromEquirectangularTexture(s,f),e.set(f,x),f.addEventListener("dispose",l),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let u=f.mapping,p=u===lc||u===cc,x=u===lr||u===oa;if(p||x){let g=t.get(f),m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new $c(s)),g=p?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let v=f.image;return p&&v&&v.height>0||x&&v&&c(v)?(n===null&&(n=new $c(s)),g=p?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function o(f,u){return u===lc?f.mapping=lr:u===cc&&(f.mapping=oa),f}function c(f){let u=0,p=6;for(let x=0;x<p;x++)f[x]!==void 0&&u++;return u===p}function l(f){let u=f.target;u.removeEventListener("dispose",l);let p=e.get(u);p!==void 0&&(e.delete(u),p.dispose())}function h(f){let u=f.target;u.removeEventListener("dispose",h);let p=t.get(u);p!==void 0&&(t.delete(u),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function vy(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&qs("WebGLRenderer: "+n+" extension not supported."),i}}}function _y(s,e,t,n){let i={},r=new WeakMap,a=new FinalizationRegistry(p=>delete i[p]);function o(p){c(p.target)}function c(p){p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete i[p.id],a.unregister(p);let x=r.get(p);x&&(e.remove(x),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function l(p,x){return i[x.id]!==void 0||(x.addEventListener("dispose",o),i[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function h(p){let x=p.attributes;for(let g in x)e.update(x[g],s.ARRAY_BUFFER)}function d(p){let x=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let v=x!==null?x.array.length:g.array.length/3-1,M=g.count>=65535?Za:Ya,_=new M(Math.ceil(v/3)*6,1),b=_.array;if(x!==null){let y=x.array;m=x.version;for(let E=0,A=0;E<v;E+=3){let R=y[E+0],L=y[E+1],z=y[E+2];b[A++]=R,b[A++]=L,b[A++]=L,b[A++]=z,b[A++]=z,b[A++]=R}}else{m=g.version;for(let y=0,E=0;y<v;y+=3){let A=y+0,R=y+1,L=y+2;b[E++]=A,b[E++]=R,b[E++]=R,b[E++]=L,b[E++]=L,b[E++]=A}}_.version=m;let S=r.get(p);S&&e.remove(S),r.set(p,_)}function f(p){let x=r.get(p);if(x){let g=p.index;g!==null&&x.version<g.version&&d(p)}else d(p);return r.get(p)}function u(){for(let p in i){let x=i[p].deref();x!==void 0&&c(x)}}return{get:l,update:h,getWireframeAttribute:f,dispose:u}}function yy(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,u){u!==0&&(s.drawElementsInstanced(n,f,r,d*a,u),t.update(f,n,u))}function h(d,f,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,u);let x=0;for(let g=0;g<u;g++)x+=f[g];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function My(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function by(s,e,t){let n=new WeakMap,i=new mt;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==d){let A=function(){y.dispose(),n.delete(o),o.removeEventListener("dispose",A)};f!==void 0&&f.texture.dispose();let u=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],M=0;u===!0&&(M=1),p===!0&&(M=2),x===!0&&(M=3);let _=o.attributes.position.count*M,b=1;_>e.maxTextureSize&&(b=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let S=new Float32Array(_*b*4*d),y=new Wa(S,_,b,d);y.type=Qn,y.needsUpdate=!0;let E=M*4;for(let R=0;R<d;R++){let L=g[R],z=m[R],X=v[R],U=_*b*4*R;for(let V=0;V<L.count;V++){let H=V*E;u===!0&&(i.fromBufferAttribute(L,V),S[U+H+0]=i.x,S[U+H+1]=i.y,S[U+H+2]=i.z,S[U+H+3]=0),p===!0&&(i.fromBufferAttribute(z,V),S[U+H+4]=i.x,S[U+H+5]=i.y,S[U+H+6]=i.z,S[U+H+7]=0),x===!0&&(i.fromBufferAttribute(X,V),S[U+H+8]=i.x,S[U+H+9]=i.y,S[U+H+10]=i.z,S[U+H+11]=X.itemSize===4?i.w:1)}}f={count:d,texture:y,size:new he(_,b)},n.set(o,f),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let u=0;for(let x=0;x<l.length;x++)u+=l[x];let p=o.morphTargetsRelative?1:1-u;c.getUniforms().setValue(s,"morphTargetBaseInfluence",p),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Sy(s,e,t,n,i){let r=new WeakMap;function a(l){let h=i.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let u=l.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return f}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Ey={[Eu]:"LINEAR_TONE_MAPPING",[wu]:"REINHARD_TONE_MAPPING",[Tu]:"CINEON_TONE_MAPPING",[Au]:"ACES_FILMIC_TONE_MAPPING",[Cu]:"AGX_TONE_MAPPING",[Pu]:"NEUTRAL_TONE_MAPPING",[Ru]:"CUSTOM_TONE_MAPPING"};function wy(s,e,t,n,i,r){let a=new Kn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,h=new _t;h.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Xe([0,2,0,0,2,0],2));let d=new Jl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Qe(h,d),u=new rr(-1,1,1,-1,0,1),p=null,x=null,g=!1,m,v=null,M=[],_=!1;this.setSize=function(b,S){a.setSize(b,S),o!==null&&o.setSize(b,S),c!==null&&c.setSize(b,S);for(let y=0;y<M.length;y++){let E=M[y];E.setSize&&E.setSize(b,S)}},this.setEffects=function(b){M=b,_=M.length>0&&M[0].isRenderPass===!0;let S=a.width,y=a.height;M.length>0&&o===null&&(o=new Kn(S,y,{type:gi,depthBuffer:!1,stencilBuffer:!1}),c=new Kn(S,y,{type:gi,depthBuffer:!1,stencilBuffer:!1}));let E=i===!0&&M.some(A=>A.needsDepthTexture===!0);E!==(a.depthTexture!==null)&&(E===!0&&l===null&&(l=new Zi(S,y),r===!0&&(l.format=rs,l.type=hr)),a.dispose(),a.depthTexture=E?l:null,a.resolveDepthBuffer=E,a.storeMultisampledDepthBuffer=E);for(let A=0;A<M.length;A++){let R=M[A];R.setSize&&R.setSize(S,y),E&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(l)}},this.begin=function(b,S){if(g||b.toneMapping===Ri&&M.length===0)return!1;if(v=S,S!==null){let y=S.width,E=S.height;(a.width!==y||a.height!==E)&&this.setSize(y,E)}return _===!1&&b.setRenderTarget(a),m=b.toneMapping,b.toneMapping=Ri,!0},this.hasRenderPass=function(){return _},this.end=function(b,S){b.toneMapping=m,g=!0;let y=a,E=o;for(let A=0;A<M.length;A++){let R=M[A];R.enabled!==!1&&(R.render(b,E,y,S),R.needsSwap!==!1&&(y=E,E=E===o?c:o))}if(p!==b.outputColorSpace||x!==b.toneMapping){p=b.outputColorSpace,x=b.toneMapping,d.defines={},ut.getTransfer(p)===Ct&&(d.defines.SRGB_TRANSFER="");let A=Ey[x];A&&(d.defines[A]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=y.texture,b.setRenderTarget(v),b.render(f,u),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),d.dispose()}}var rm=new hn,am=new Zi(1,1),om=new Qa(1),lm=new Wa,cm=new Hl,hm=new ja,B0=[],z0=[],k0=new Float32Array(16),H0=new Float32Array(9),G0=new Float32Array(4);function da(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=B0[i];if(r===void 0&&(r=new Float32Array(i),B0[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function fn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function dn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Qc(s,e){let t=z0[e];t===void 0&&(t=new Int32Array(e),z0[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Ty(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Ay(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;s.uniform2fv(this.addr,e),dn(t,e)}}function Ry(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(fn(t,e))return;s.uniform3fv(this.addr,e),dn(t,e)}}function Cy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;s.uniform4fv(this.addr,e),dn(t,e)}}function Py(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),dn(t,e)}else{if(fn(t,n))return;G0.set(n),s.uniformMatrix2fv(this.addr,!1,G0),dn(t,n)}}function Iy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),dn(t,e)}else{if(fn(t,n))return;H0.set(n),s.uniformMatrix3fv(this.addr,!1,H0),dn(t,n)}}function Ly(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(fn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),dn(t,e)}else{if(fn(t,n))return;k0.set(n),s.uniformMatrix4fv(this.addr,!1,k0),dn(t,n)}}function Ny(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Dy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;s.uniform2iv(this.addr,e),dn(t,e)}}function Uy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;s.uniform3iv(this.addr,e),dn(t,e)}}function Fy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;s.uniform4iv(this.addr,e),dn(t,e)}}function Oy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function By(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(fn(t,e))return;s.uniform2uiv(this.addr,e),dn(t,e)}}function zy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(fn(t,e))return;s.uniform3uiv(this.addr,e),dn(t,e)}}function ky(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(fn(t,e))return;s.uniform4uiv(this.addr,e),dn(t,e)}}function eh(s){return s.version===0&&(s.compareFunction=Hu,s.needsUpdate=!0),s}function Hy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=eh(am):r=rm,t.setTexture2D(e||r,i)}function Gy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||cm,i)}function Vy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=eh(om):r=hm,t.setTextureCube(e||r,i)}function Wy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||lm,i)}function Xy(s){switch(s){case 5126:return Ty;case 35664:return Ay;case 35665:return Ry;case 35666:return Cy;case 35674:return Py;case 35675:return Iy;case 35676:return Ly;case 5124:case 35670:return Ny;case 35667:case 35671:return Dy;case 35668:case 35672:return Uy;case 35669:case 35673:return Fy;case 5125:return Oy;case 36294:return By;case 36295:return zy;case 36296:return ky;case 35678:case 36198:case 36298:case 36306:case 35682:return Hy;case 35679:case 36299:case 36307:return Gy;case 35680:case 36300:case 36308:case 36293:return Vy;case 36289:case 36303:case 36311:case 36292:return Wy}}function qy(s,e){s.uniform1fv(this.addr,e)}function Yy(s,e){let t=da(e,this.size,2);s.uniform2fv(this.addr,t)}function Zy(s,e){let t=da(e,this.size,3);s.uniform3fv(this.addr,t)}function Ky(s,e){let t=da(e,this.size,4);s.uniform4fv(this.addr,t)}function Jy(s,e){let t=da(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function $y(s,e){let t=da(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function jy(s,e){let t=da(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Qy(s,e){s.uniform1iv(this.addr,e)}function eM(s,e){s.uniform2iv(this.addr,e)}function tM(s,e){s.uniform3iv(this.addr,e)}function nM(s,e){s.uniform4iv(this.addr,e)}function iM(s,e){s.uniform1uiv(this.addr,e)}function sM(s,e){s.uniform2uiv(this.addr,e)}function rM(s,e){s.uniform3uiv(this.addr,e)}function aM(s,e){s.uniform4uiv(this.addr,e)}function oM(s,e,t){let n=this.cache,i=e.length,r=Qc(t,i);fn(n,r)||(s.uniform1iv(this.addr,r),dn(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=eh(am):a=rm;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function lM(s,e,t){let n=this.cache,i=e.length,r=Qc(t,i);fn(n,r)||(s.uniform1iv(this.addr,r),dn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||cm,r[a])}function cM(s,e,t){let n=this.cache,i=e.length,r=Qc(t,i);fn(n,r)||(s.uniform1iv(this.addr,r),dn(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=eh(om):a=hm;for(let o=0;o!==i;++o)t.setTextureCube(e[o]||a,r[o])}function hM(s,e,t){let n=this.cache,i=e.length,r=Qc(t,i);fn(n,r)||(s.uniform1iv(this.addr,r),dn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||lm,r[a])}function uM(s){switch(s){case 5126:return qy;case 35664:return Yy;case 35665:return Zy;case 35666:return Ky;case 35674:return Jy;case 35675:return $y;case 35676:return jy;case 5124:case 35670:return Qy;case 35667:case 35671:return eM;case 35668:case 35672:return tM;case 35669:case 35673:return nM;case 5125:return iM;case 36294:return sM;case 36295:return rM;case 36296:return aM;case 35678:case 36198:case 36298:case 36306:case 35682:return oM;case 35679:case 36299:case 36307:return lM;case 35680:case 36300:case 36308:case 36293:return cM;case 36289:case 36303:case 36311:case 36292:return hM}}var of=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xy(t.type)}},lf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uM(t.type)}},cf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},rf=/(\w+)(\])?(\[|\.)?/g;function V0(s,e){s.seq.push(e),s.map[e.id]=e}function fM(s,e,t){let n=s.name,i=n.length;for(rf.lastIndex=0;;){let r=rf.exec(n),a=rf.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){V0(t,l===void 0?new of(o,s,e):new lf(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new cf(o),V0(t,d)),t=d}}}var fa=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);fM(o,c,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function W0(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var dM=37297,pM=0;function mM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var X0=new $e;function gM(s){ut._getMatrix(X0,ut.workingColorSpace,s);let e=`mat3( ${X0.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(s)){case Ga:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function q0(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+mM(s.getShaderSource(e),o)}else return r}function xM(s,e){let t=gM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var vM={[Eu]:"Linear",[wu]:"Reinhard",[Tu]:"Cineon",[Au]:"ACESFilmic",[Cu]:"AgX",[Pu]:"Neutral",[Ru]:"Custom"};function _M(s,e){let t=vM[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jc=new N;function yM(){ut.getLuminanceCoefficients(Jc);let s=Jc.x.toFixed(4),e=Jc.y.toFixed(4),t=Jc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function MM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lo).join(`
`)}function bM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function SM(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Lo(s){return s!==""}function Y0(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Z0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var EM=/^[ \t]*#include +<([\w\d./]+)>/gm;function hf(s){return s.replace(EM,wM)}function wM(s,e){let t=ct[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return hf(t)}var TM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function K0(s){return s.replace(TM,AM)}function AM(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function J0(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var RM={[bo]:"SHADOWMAP_TYPE_PCF",[ra]:"SHADOWMAP_TYPE_VSM"};function CM(s){return RM[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var PM={[oa]:"ENVMAP_MODE_REFRACTION"};function IM(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":PM[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var LM={[So]:"ENVMAP_BLENDING_MULTIPLY",[h0]:"ENVMAP_BLENDING_MIX",[u0]:"ENVMAP_BLENDING_ADD"};function NM(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":LM[s.combine]||"ENVMAP_BLENDING_NONE"}function DM(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=CM(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=IM(t),d=NM(t),f=MM(t),u=bM(r),p=i.createProgram(),x,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u].filter(Lo).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u].filter(Lo).join(`
`),g.length>0&&(g+=`
`)):(x=[J0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),g=[J0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?ct.tonemapping_pars_fragment:"",t.toneMapping!==Ri?_M("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,xM("linearToOutputTexel",t.outputColorSpace),yM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lo).join(`
`)),a=hf(a),a=Y0(a,t),a=Z0(a,t),o=hf(o),o=Y0(o,t),o=Z0(o,t),a=K0(a),o=K0(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===Vu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let v=m+x+a,M=m+g+o,_=W0(i,i.VERTEX_SHADER,v),b=W0(i,i.FRAGMENT_SHADER,M);i.attachShader(p,_),i.attachShader(p,b),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function S(R){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(p)||"",z=i.getShaderInfoLog(_)||"",X=i.getShaderInfoLog(b)||"",U=L.trim(),V=z.trim(),H=X.trim(),P=!0,q=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(P=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,_,b);else{let I=q0(i,_,"vertex"),J=q0(i,b,"fragment");Je("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+I+`
`+J)}else U!==""?Ve("WebGLProgram: Program Info Log:",U):(V===""||H==="")&&(q=!1);q&&(R.diagnostics={runnable:P,programLog:U,vertexShader:{log:V,prefix:x},fragmentShader:{log:H,prefix:g}})}i.deleteShader(_),i.deleteShader(b),y=new fa(i,p),E=SM(i,p)}let y;this.getUniforms=function(){return y===void 0&&S(this),y};let E;this.getAttributes=function(){return E===void 0&&S(this),E};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(p,dM)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pM++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=_,this.fragmentShader=b,this}var UM=0,uf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ff(e),t.set(e,n)),n}},ff=class{constructor(e){this.id=UM++,this.code=e,this.usedTimes=0}};function FM(s){return s===As||s===Ro||s===Co}function OM(s,e,t,n,i,r){let a=new Xa,o=new uf,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(y){return c.add(y),y===0?"uv":`uv${y}`}function p(y,E,A,R,L,z){let X=R.fog,U=L.geometry,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,P=e.get(y.envMap||V,H),q=f[y.type],I=n.precision;y.precision!==null&&(I=n.getMaxPrecision(y.precision),I!==y.precision&&Ve("WebGLProgram.getParameters:",y.precision,"not supported, using",I,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,W=J!==void 0?J.length:0,F=0;U.morphAttributes.position!==void 0&&(F=1),U.morphAttributes.normal!==void 0&&(F=2),U.morphAttributes.color!==void 0&&(F=3);let G,D,Q,ae;if(q){let be=Pi[q];G=be.vertexShader,D=be.fragmentShader}else{G=y.vertexShader,D=y.fragmentShader;let be=o.getVertexShaderStage(y),Tt=o.getFragmentShaderStage(y);o.update(y,be,Tt),Q=be.id,ae=Tt.id}let Ie=s.getRenderTarget(),ye=s.state.buffers.depth.getReversed(),Be=L.isInstancedMesh===!0,nt=L.isBatchedMesh===!0,Fe=!!y.map,je=!!y.matcap,et=!!P,se=et&&P.isPMREMTexture===!0,ue=!!y.aoMap,ce=!!y.lightMap,Re=!!y.bumpMap&&y.wireframe===!1,_e=!!y.normalMap,Ze=!!y.displacementMap,ze=!!y.emissiveMap,st=!!y.metalnessMap,rt=!!y.roughnessMap,gt=y.anisotropy>0,k=y.clearcoat>0,Jt=y.diffuseRoughness>0,ht=y.dispersion>0,St=y.retroreflectivity>0,ve=y.iridescence>0,kt=y.sheen>0,qe=y.transmission>0,Ke=gt&&!!y.anisotropyMap,C=k&&!!y.clearcoatMap,w=k&&!!y.clearcoatNormalMap,Y=k&&!!y.clearcoatRoughnessMap,oe=Jt&&!!y.diffuseRoughnessMap,re=ve&&!!y.iridescenceMap,me=ve&&!!y.iridescenceThicknessMap,Me=kt&&!!y.sheenColorMap,ee=kt&&!!y.sheenRoughnessMap,te=!!y.specularMap,ge=!!y.specularColorMap,O=!!y.specularIntensityMap,ie=qe&&!!y.transmissionMap,K=qe&&!!y.thicknessMap,de=!!y.gradientMap,pe=!!y.alphaMap,xe=y.alphaTest>0,Ue=!!y.alphaHash,at=!!y.extensions,fe=Ri;y.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(fe=s.toneMapping);let ne=se?P.isCompressedCubeTexture?P.image[0].mipmaps:P.mipmaps:null,Le={shaderID:q,shaderType:y.type,shaderName:y.name,vertexShader:G,fragmentShader:D,defines:y.defines,customVertexShaderID:Q,customFragmentShaderID:ae,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:I,batching:nt,batchingColor:nt&&L._colorsTexture!==null,instancing:Be,instancingColor:Be&&L.instanceColor!==null,instancingMorph:Be&&L.morphTexture!==null,outputColorSpace:Ie===null?s.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:ut.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Fe,matcap:je,envMap:et,envMapMode:et&&P.mapping,envMapPMREM:se,envMapMaxLod:se?ne.length-1:null,envMapSize:se?ne[0].width:null,aoMap:ue,lightMap:ce,bumpMap:Re,normalMap:_e,displacementMap:Ze,emissiveMap:ze,normalMapObjectSpace:_e&&y.normalMapType===m0,normalMapTangentSpace:_e&&y.normalMapType===ua,packedNormalMap:_e&&y.normalMapType===ua&&FM(y.normalMap.format),metalnessMap:st,roughnessMap:rt,anisotropy:gt,anisotropyMap:Ke,clearcoat:k,clearcoatMap:C,clearcoatNormalMap:w,clearcoatRoughnessMap:Y,diffuseRoughness:Jt,diffuseRoughnessMap:oe,dispersion:ht,retroreflection:St,iridescence:ve,iridescenceMap:re,iridescenceThicknessMap:me,sheen:kt,sheenColorMap:Me,sheenRoughnessMap:ee,specularMap:te,specularColorMap:ge,specularIntensityMap:O,transmission:qe,transmissionMap:ie,thicknessMap:K,gradientMap:de,opaque:y.transparent===!1&&y.blending===aa&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:xe,alphaHash:Ue,combine:y.combine,mapUv:Fe&&u(y.map.channel),aoMapUv:ue&&u(y.aoMap.channel),lightMapUv:ce&&u(y.lightMap.channel),bumpMapUv:Re&&u(y.bumpMap.channel),normalMapUv:_e&&u(y.normalMap.channel),displacementMapUv:Ze&&u(y.displacementMap.channel),emissiveMapUv:ze&&u(y.emissiveMap.channel),metalnessMapUv:st&&u(y.metalnessMap.channel),roughnessMapUv:rt&&u(y.roughnessMap.channel),anisotropyMapUv:Ke&&u(y.anisotropyMap.channel),clearcoatMapUv:C&&u(y.clearcoatMap.channel),clearcoatNormalMapUv:w&&u(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&u(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&u(y.diffuseRoughnessMap.channel),iridescenceMapUv:re&&u(y.iridescenceMap.channel),iridescenceThicknessMapUv:me&&u(y.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&u(y.sheenColorMap.channel),sheenRoughnessMapUv:ee&&u(y.sheenRoughnessMap.channel),specularMapUv:te&&u(y.specularMap.channel),specularColorMapUv:ge&&u(y.specularColorMap.channel),specularIntensityMapUv:O&&u(y.specularIntensityMap.channel),transmissionMapUv:ie&&u(y.transmissionMap.channel),thicknessMapUv:K&&u(y.thicknessMap.channel),alphaMapUv:pe&&u(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(_e||gt),vertexNormals:!!U.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(Fe||pe),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||U.attributes.normal===void 0&&_e===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ye,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:W,morphTextureStride:F,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:z.filter(be=>be.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&A.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:Fe&&y.map.isVideoTexture===!0&&ut.getTransfer(y.map.colorSpace)===Ct,decodeVideoTextureEmissive:ze&&y.emissiveMap.isVideoTexture===!0&&ut.getTransfer(y.emissiveMap.colorSpace)===Ct,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Wt,flipSided:y.side===On,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:at&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&y.extensions.multiDraw===!0||nt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function x(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let A in y.defines)E.push(A),E.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(g(E,y),m(E,y),E.push(s.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function g(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapPMREM),y.push(E.envMapMaxLod),y.push(E.envMapSize),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.diffuseRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.numSunLights),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numSunLightShadows),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.numLightProbeGrids),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function m(y,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.diffuseRoughness&&a.enable(25),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function v(y){let E=f[y.type],A;if(E){let R=Pi[E];A=I0.clone(R.uniforms)}else A=y.uniforms;return A}function M(y,E){let A=h.get(E);return A!==void 0?++A.usedTimes:(A=new DM(s,E,y,i),l.push(A),h.set(E,A)),A}function _(y){if(--y.usedTimes===0){let E=l.indexOf(y);l[E]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function b(y){o.remove(y)}function S(){o.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:v,acquireProgram:M,releaseProgram:_,releaseShaderCache:b,programs:l,dispose:S}}function BM(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function zM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function $0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function j0(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(f){let u=0;return f.isInstancedMesh&&(u+=2),f.isSkinnedMesh&&(u+=1),u}function o(f,u,p,x,g,m){let v=s[e];return v===void 0?(v={id:f.id,object:f,geometry:u,material:p,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:g,group:m},s[e]=v):(v.id=f.id,v.object=f,v.geometry=u,v.material=p,v.materialVariant=a(f),v.groupOrder=x,v.renderOrder=f.renderOrder,v.z=g,v.group=m),e++,v}function c(f,u,p,x,g,m,v){v.reversedDepth===!0&&(g=-g);let M=o(f,u,p,x,g,m);p.transmission>0?n.push(M):p.transparent===!0?i.push(M):t.push(M)}function l(f,u,p,x,g,m){let v=o(f,u,p,x,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):t.unshift(v)}function h(f,u){t.length>1&&t.sort(f||zM),n.length>1&&n.sort(u||$0),i.length>1&&i.sort(u||$0)}function d(){for(let f=e,u=s.length;f<u;f++){let p=s[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:d,sort:h}}function kM(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new j0,s.set(n,[a])):i>=r.length?(a=new j0,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function HM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new Se};break;case"SpotLight":t={position:new N,direction:new N,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new N,halfWidth:new N,halfHeight:new N};break}return s[e.id]=t,t}}}function GM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var VM=0;function WM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function XM(s){let e=new HM,t=GM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let i=new N,r=new We,a=new We;function o(l){let h=0,d=0,f=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let u=0,p=0,x=0,g=0,m=0,v=0,M=0,_=0,b=0,S=0,y=0,E=0,A=0,R=0;l.sort(WM);for(let z=0,X=l.length;z<X;z++){let U=l[z],V=U.color,H=U.intensity,P=U.distance,q=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===As?q=U.shadow.map.texture:q=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=V.r*H,d+=V.g*H,f+=V.b*H;else if(U.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(U.sh.coefficients[I],H);R++}else if(U.isSunLight){let I=e.get(U);if(I.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let J=U.shadow,W=t.get(U);W.shadowIntensity=J.intensity,W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[p]=W,n.sunShadowMap[p]=q;let F=J.getViewportCount();for(let G=0;G<F;G++)n.sunShadowMatrix[x+G]=J.getMatrix(G),n.sunShadowCascade[x+G]=J._cascadeData[G];x+=F,p++}n.sun[u]=I,u++}else if(U.isDirectionalLight){let I=e.get(U);if(I.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let J=U.shadow,W=t.get(U);W.shadowIntensity=J.intensity,W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,n.directionalShadow[g]=W,n.directionalShadowMap[g]=q,n.directionalShadowMatrix[g]=U.shadow.matrix,b++}n.directional[g]=I,g++}else if(U.isSpotLight){let I=e.get(U);I.position.setFromMatrixPosition(U.matrixWorld),I.color.copy(V).multiplyScalar(H),I.distance=P,I.coneCos=Math.cos(U.angle),I.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),I.decay=U.decay,n.spot[v]=I;let J=U.shadow;if(U.map&&(n.spotLightMap[E]=U.map,E++,J.updateMatrices(U),U.castShadow&&A++),n.spotLightMatrix[v]=J.matrix,U.castShadow){let W=t.get(U);W.shadowIntensity=J.intensity,W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,n.spotShadow[v]=W,n.spotShadowMap[v]=q,y++}v++}else if(U.isRectAreaLight){let I=e.get(U);I.color.copy(V).multiplyScalar(H),I.halfWidth.set(U.width*.5,0,0),I.halfHeight.set(0,U.height*.5,0),n.rectArea[M]=I,M++}else if(U.isPointLight){let I=e.get(U);if(I.color.copy(U.color).multiplyScalar(U.intensity),I.distance=U.distance,I.decay=U.decay,U.castShadow){let J=U.shadow,W=t.get(U);W.shadowIntensity=J.intensity,W.shadowBias=J.bias,W.shadowNormalBias=J.normalBias,W.shadowRadius=J.radius,W.shadowMapSize=J.mapSize,W.shadowCameraNear=J.camera.near,W.shadowCameraFar=J.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=q,n.pointShadowMatrix[m]=U.shadow.matrix,S++}n.point[m]=I,m++}else if(U.isHemisphereLight){let I=e.get(U);I.skyColor.copy(U.color).multiplyScalar(H),I.groundColor.copy(U.groundColor).multiplyScalar(H),n.hemi[_]=I,_++}}M>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;let L=n.hash;(L.sunLength!==u||L.directionalLength!==g||L.pointLength!==m||L.spotLength!==v||L.rectAreaLength!==M||L.hemiLength!==_||L.numSunShadows!==p||L.numDirectionalShadows!==b||L.numPointShadows!==S||L.numSpotShadows!==y||L.numSpotMaps!==E||L.numLightProbes!==R)&&(n.sun.length=u,n.directional.length=g,n.spot.length=v,n.rectArea.length=M,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+E-A,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,L.sunLength=u,L.directionalLength=g,L.pointLength=m,L.spotLength=v,L.rectAreaLength=M,L.hemiLength=_,L.numSunShadows=p,L.numDirectionalShadows=b,L.numPointShadows=S,L.numSpotShadows=y,L.numSpotMaps=E,L.numLightProbes=R,n.version=VM++)}function c(l,h){let d=0,f=0,u=0,p=0,x=0,g=0,m=h.matrixWorldInverse;for(let v=0,M=l.length;v<M;v++){let _=l[v];if(_.isSunLight){let b=n.sun[d];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(m),d++}else if(_.isDirectionalLight){let b=n.directional[f];b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),f++}else if(_.isSpotLight){let b=n.spot[p];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(_.width*.5,0,0),b.halfHeight.set(0,_.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){let b=n.point[u];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){let b=n.hemi[g];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function Q0(s){let e=new XM(s),t=[],n=[],i=[];function r(d){h.camera=d,t.length=0,n.length=0,i.length=0}function a(d){d.isLightProbeGrid?i.push(d):t.push(d)}function o(d){n.push(d)}function c(){e.setup(t),i.sort((d,f)=>d.priority-f.priority||d.id-f.id)}function l(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function qM(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Q0(s),e.set(i,[o])):r>=a.length?(o=new Q0(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var YM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZM=`uniform sampler2D shadow_pass;
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
}`,KM=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],JM=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],em=new We,Io=new N,af=new N;function $M(s,e,t){let n=new bs,i=new he,r=new he,a=new mt,o=new $l,c=new jl,l={},h=t.maxTextureSize,d={[ri]:On,[On]:ri,[Wt]:Wt},f=new zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:YM,fragmentShader:ZM}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let p=new _t;p.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Qe(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bo;let m=this.type;this.render=function(S,y,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Xp&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=bo);let A=s.getRenderTarget(),R=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),z=s.state;z.setBlending(ar),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let X=m!==this.type;X&&y.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(V=>V.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,V=S.length;U<V;U++){let H=S[U],P=H.shadow;if(P===void 0){Ve("WebGLShadowMap:",H,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;i.copy(P.mapSize);let q=P.getFrameExtents();i.multiply(q),r.copy(P.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/q.x),i.x=r.x*q.x,P.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/q.y),i.y=r.y*q.y,P.mapSize.y=r.y));let I=s.state.buffers.depth.getReversed();if(P.camera._reversedDepth=I,P.map===null||X===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===ra){if(H.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new Kn(i.x,i.y,{format:As,type:gi,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),P.map.texture.name=H.name+".shadowMap",P.map.depthTexture=new Zi(i.x,i.y,Qn),P.map.depthTexture.name=H.name+".shadowMapDepth",P.map.depthTexture.format=Yi,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=jt,P.map.depthTexture.magFilter=jt}else H.isPointLight?(P.map=new No(i.x),P.map.depthTexture=new Qa(i.x,mi)):(P.map=new Kn(i.x,i.y),P.map.depthTexture=new Zi(i.x,i.y,mi)),P.map.depthTexture.name=H.name+".shadowMap",P.map.depthTexture.format=Yi,this.type===bo?(P.map.depthTexture.compareFunction=I?ku:zu,P.map.depthTexture.minFilter=Qt,P.map.depthTexture.magFilter=Qt):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=jt,P.map.depthTexture.magFilter=jt);P.camera.updateProjectionMatrix()}P.map.isWebGLCubeRenderTarget!==!0&&(P.map.width!==i.x||P.map.height!==i.y)&&P.map.setSize(i.x,i.y);let J=P.map.isWebGLCubeRenderTarget?6:P.getViewportCount();H.isPointLight!==!0&&P.updateMatrices(H,E);let W=(P.camera.layers.mask&4294967294)!==0?P.camera.layers:E.layers;for(let F=0;F<J;F++){let G=P.getCamera(F);if(H.isPointLight){let D=P.camera,Q=P.matrix,ae=H.distance||D.far;ae!==D.far&&(D.far=ae,D.updateProjectionMatrix()),Io.setFromMatrixPosition(H.matrixWorld),D.position.copy(Io),af.copy(D.position),af.add(KM[F]),D.up.copy(JM[F]),D.lookAt(af),D.updateMatrixWorld(),Q.makeTranslation(-Io.x,-Io.y,-Io.z),em.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),P._frustum.setFromProjectionMatrix(em,D.coordinateSystem,D.reversedDepth)}if(P.map.isWebGLCubeRenderTarget)s.setRenderTarget(P.map,F),s.clear();else{F===0&&(s.setRenderTarget(P.map),s.clear());let D=P.getViewport(F);a.set(r.x*D.x,r.y*D.y,r.x*D.z,r.y*D.w),z.viewport(a)}n=P.getFrustum(F),_(y,E,G,H,W,this.type)}P.isPointLightShadow!==!0&&this.type===ra&&v(P,E),P.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(A,R,L)};function v(S,y){let E=e.update(x);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,u.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),S.mapPass===null?S.mapPass=new Kn(i.x,i.y,{format:As,type:gi}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(y,null,E,f,x,null),u.uniforms.shadow_pass.value=S.mapPass.texture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(y,null,E,u,x,null)}function M(S,y,E,A){let R=null,L=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(L!==void 0)R=L;else if(R=E.isPointLight===!0?c:o,s.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let z=R.uuid,X=y.uuid,U=l[z];U===void 0&&(U={},l[z]=U);let V=U[X];V===void 0&&(V=R.clone(),U[X]=V,y.addEventListener("dispose",b)),R=V}if(R.visible=y.visible,R.wireframe=y.wireframe,A===ra?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:d[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,E.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let z=s.properties.get(R);z.light=E}return R}function _(S,y,E,A,R,L){if(S.visible===!1)return;if(S.layers.test(R)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&L===ra)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);let U=e.update(S),V=S.material;if(Array.isArray(V)){let H=U.groups;for(let P=0,q=H.length;P<q;P++){let I=H[P],J=V[I.materialIndex];if(J&&J.visible){let W=M(S,J,A,L);S.onBeforeShadow(s,S,y,E,U,W,I),s.renderBufferDirect(E,null,U,W,S,I),S.onAfterShadow(s,S,y,E,U,W,I)}}}else if(V.visible){let H=M(S,V,A,L);S.onBeforeShadow(s,S,y,E,U,H,null),s.renderBufferDirect(E,null,U,H,S,null),S.onAfterShadow(s,S,y,E,U,H,null)}}let X=S.children;for(let U=0,V=X.length;U<V;U++)_(X[U],y,E,A,R,L)}function b(S){S.target.removeEventListener("dispose",b);for(let E in l){let A=l[E],R=S.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function jM(s,e){function t(){let O=!1,ie=new mt,K=null,de=new mt(0,0,0,0);return{setMask:function(pe){K!==pe&&!O&&(s.colorMask(pe,pe,pe,pe),K=pe)},setLocked:function(pe){O=pe},setClear:function(pe,xe,Ue,at,fe){fe===!0&&(pe*=at,xe*=at,Ue*=at),ie.set(pe,xe,Ue,at),de.equals(ie)===!1&&(s.clearColor(pe,xe,Ue,at),de.copy(ie))},reset:function(){O=!1,K=null,de.set(-1,0,0,0)}}}function n(){let O=!1,ie=!1,K=null,de=null,pe=null;return{setReversed:function(xe){if(ie!==xe){let Ue=e.get("EXT_clip_control");xe?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ie=xe;let at=pe;pe=null,this.setClear(at)}},getReversed:function(){return ie},setTest:function(xe){xe?ye(s.DEPTH_TEST):Be(s.DEPTH_TEST)},setMask:function(xe){K!==xe&&!O&&(s.depthMask(xe),K=xe)},setFunc:function(xe){if(ie&&(xe=w0[xe]),de!==xe){switch(xe){case Ll:s.depthFunc(s.NEVER);break;case Nl:s.depthFunc(s.ALWAYS);break;case Dl:s.depthFunc(s.LESS);break;case zr:s.depthFunc(s.LEQUAL);break;case Ul:s.depthFunc(s.EQUAL);break;case Fl:s.depthFunc(s.GEQUAL);break;case Ol:s.depthFunc(s.GREATER);break;case Bl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}de=xe}},setLocked:function(xe){O=xe},setClear:function(xe){pe!==xe&&(pe=xe,ie&&(xe=1-xe),s.clearDepth(xe))},reset:function(){O=!1,K=null,de=null,pe=null,ie=!1}}}function i(){let O=!1,ie=null,K=null,de=null,pe=null,xe=null,Ue=null,at=null,fe=null;return{setTest:function(ne){O||(ne?ye(s.STENCIL_TEST):Be(s.STENCIL_TEST))},setMask:function(ne){ie!==ne&&!O&&(s.stencilMask(ne),ie=ne)},setFunc:function(ne,Le,be){(K!==ne||de!==Le||pe!==be)&&(s.stencilFunc(ne,Le,be),K=ne,de=Le,pe=be)},setOp:function(ne,Le,be){(xe!==ne||Ue!==Le||at!==be)&&(s.stencilOp(ne,Le,be),xe=ne,Ue=Le,at=be)},setLocked:function(ne){O=ne},setClear:function(ne){fe!==ne&&(s.clearStencil(ne),fe=ne)},reset:function(){O=!1,ie=null,K=null,de=null,pe=null,xe=null,Ue=null,at=null,fe=null}}}let r=new t,a=new n,o=new i,c={},l=new WeakMap,h={},d={},f={},u=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,b=null,S=null,y=null,E=new Se(0,0,0),A=0,R=!1,L=null,z=null,X=null,U=null,V=null,H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,q=0,I=s.getParameter(s.VERSION);I.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(I)[1]),P=q>=1):I.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),P=q>=2);let J=null,W={},F=s.getParameter(s.SCISSOR_BOX),G=s.getParameter(s.VIEWPORT),D=new mt().fromArray(F),Q=new mt().fromArray(G);function ae(O,ie,K,de){let pe=new Uint8Array(4),xe=s.createTexture();s.bindTexture(O,xe),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ue=0;Ue<K;Ue++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(ie,0,s.RGBA,1,1,de,0,s.RGBA,s.UNSIGNED_BYTE,pe):s.texImage2D(ie+Ue,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pe);return xe}let Ie={};Ie[s.TEXTURE_2D]=ae(s.TEXTURE_2D,s.TEXTURE_2D,1),Ie[s.TEXTURE_CUBE_MAP]=ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ie[s.TEXTURE_2D_ARRAY]=ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ie[s.TEXTURE_3D]=ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(s.DEPTH_TEST),a.setFunc(zr),Re(!1),_e(vu),ye(s.CULL_FACE),ue(ar);function ye(O){h[O]!==!0&&(s.enable(O),h[O]=!0)}function Be(O){h[O]!==!1&&(s.disable(O),h[O]=!1)}function nt(O,ie){return f[O]!==ie?(s.bindFramebuffer(O,ie),f[O]=ie,O===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=ie),O===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=ie),!0):!1}function Fe(O,ie){let K=p,de=!1;if(O){K=u.get(ie),K===void 0&&(K=[],u.set(ie,K));let pe=O.textures;if(K.length!==pe.length||K[0]!==s.COLOR_ATTACHMENT0){for(let xe=0,Ue=pe.length;xe<Ue;xe++)K[xe]=s.COLOR_ATTACHMENT0+xe;K.length=pe.length,de=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,de=!0);de&&s.drawBuffers(K)}function je(O){return x!==O?(s.useProgram(O),x=O,!0):!1}let et={[or]:s.FUNC_ADD,[Yp]:s.FUNC_SUBTRACT,[Zp]:s.FUNC_REVERSE_SUBTRACT};et[Kp]=s.MIN,et[Jp]=s.MAX;let se={[$p]:s.ZERO,[jp]:s.ONE,[Qp]:s.SRC_COLOR,[bu]:s.SRC_ALPHA,[r0]:s.SRC_ALPHA_SATURATE,[i0]:s.DST_COLOR,[t0]:s.DST_ALPHA,[e0]:s.ONE_MINUS_SRC_COLOR,[Su]:s.ONE_MINUS_SRC_ALPHA,[s0]:s.ONE_MINUS_DST_COLOR,[n0]:s.ONE_MINUS_DST_ALPHA,[a0]:s.CONSTANT_COLOR,[o0]:s.ONE_MINUS_CONSTANT_COLOR,[l0]:s.CONSTANT_ALPHA,[c0]:s.ONE_MINUS_CONSTANT_ALPHA};function ue(O,ie,K,de,pe,xe,Ue,at,fe,ne){if(O===ar){g===!0&&(Be(s.BLEND),g=!1);return}if(g===!1&&(ye(s.BLEND),g=!0),O!==qp){if(O!==m||ne!==R){if((v!==or||b!==or)&&(s.blendEquation(s.FUNC_ADD),v=or,b=or),ne)switch(O){case aa:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case _u:s.blendFunc(s.ONE,s.ONE);break;case yu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Mu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Je("WebGLState: Invalid blending: ",O);break}else switch(O){case aa:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case _u:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case yu:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mu:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",O);break}M=null,_=null,S=null,y=null,E.set(0,0,0),A=0,m=O,R=ne}return}pe=pe||ie,xe=xe||K,Ue=Ue||de,(ie!==v||pe!==b)&&(s.blendEquationSeparate(et[ie],et[pe]),v=ie,b=pe),(K!==M||de!==_||xe!==S||Ue!==y)&&(s.blendFuncSeparate(se[K],se[de],se[xe],se[Ue]),M=K,_=de,S=xe,y=Ue),(at.equals(E)===!1||fe!==A)&&(s.blendColor(at.r,at.g,at.b,fe),E.copy(at),A=fe),m=O,R=!1}function ce(O,ie){O.side===Wt?Be(s.CULL_FACE):ye(s.CULL_FACE);let K=O.side===On;ie&&(K=!K),Re(K),O.blending===aa&&O.transparent===!1?ue(ar):ue(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);let de=O.stencilWrite;o.setTest(de),de&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ze(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ye(s.SAMPLE_ALPHA_TO_COVERAGE):Be(s.SAMPLE_ALPHA_TO_COVERAGE)}function Re(O){L!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),L=O)}function _e(O){O!==Vp?(ye(s.CULL_FACE),O!==z&&(O===vu?s.cullFace(s.BACK):O===Wp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Be(s.CULL_FACE),z=O}function Ze(O){O!==X&&(P&&s.lineWidth(O),X=O)}function ze(O,ie,K){O?(ye(s.POLYGON_OFFSET_FILL),(U!==ie||V!==K)&&(U=ie,V=K,a.getReversed()&&(ie=-ie,K=-K),s.polygonOffset(ie,K))):Be(s.POLYGON_OFFSET_FILL)}function st(O){O?ye(s.SCISSOR_TEST):Be(s.SCISSOR_TEST)}function rt(O){O===void 0&&(O=s.TEXTURE0+H-1),J!==O&&(s.activeTexture(O),J=O)}function gt(O,ie,K){K===void 0&&(J===null?K=s.TEXTURE0+H-1:K=J);let de=W[K];de===void 0&&(de={type:void 0,texture:void 0},W[K]=de),(de.type!==O||de.texture!==ie)&&(J!==K&&(s.activeTexture(K),J=K),s.bindTexture(O,ie||Ie[O]),de.type=O,de.texture=ie)}function k(){let O=W[J];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Jt(){try{s.compressedTexImage2D(...arguments)}catch(O){Je("WebGLState:",O)}}function ht(){try{s.compressedTexImage3D(...arguments)}catch(O){Je("WebGLState:",O)}}function St(){try{s.texSubImage2D(...arguments)}catch(O){Je("WebGLState:",O)}}function ve(){try{s.texSubImage3D(...arguments)}catch(O){Je("WebGLState:",O)}}function kt(){try{s.compressedTexSubImage2D(...arguments)}catch(O){Je("WebGLState:",O)}}function qe(){try{s.compressedTexSubImage3D(...arguments)}catch(O){Je("WebGLState:",O)}}function Ke(){try{s.texStorage2D(...arguments)}catch(O){Je("WebGLState:",O)}}function C(){try{s.texStorage3D(...arguments)}catch(O){Je("WebGLState:",O)}}function w(){try{s.texImage2D(...arguments)}catch(O){Je("WebGLState:",O)}}function Y(){try{s.texImage3D(...arguments)}catch(O){Je("WebGLState:",O)}}function oe(O){return d[O]!==void 0?d[O]:s.getParameter(O)}function re(O,ie){d[O]!==ie&&(s.pixelStorei(O,ie),d[O]=ie)}function me(O){D.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),D.copy(O))}function Me(O){Q.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),Q.copy(O))}function ee(O,ie){let K=l.get(ie);K===void 0&&(K=new WeakMap,l.set(ie,K));let de=K.get(O);de===void 0&&(de=s.getUniformBlockIndex(ie,O.name),s.uniformBlockBinding(ie,de,de),K.set(O,de))}function te(O,ie,K){let pe=l.get(ie).get(O);c[pe]!==K&&(s.bindBufferBase(s.UNIFORM_BUFFER,pe,K),c[pe]=K)}function ge(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},J=null,W={},f={},c={},u=new WeakMap,p=[],x=null,g=!1,m=null,v=null,M=null,_=null,b=null,S=null,y=null,E=new Se(0,0,0),A=0,R=!1,L=null,z=null,X=null,U=null,V=null,D.set(0,0,s.canvas.width,s.canvas.height),Q.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:Be,bindFramebuffer:nt,drawBuffers:Fe,useProgram:je,setBlending:ue,setMaterial:ce,setFlipSided:Re,setCullFace:_e,setLineWidth:Ze,setPolygonOffset:ze,setScissorTest:st,activeTexture:rt,bindTexture:gt,unbindTexture:k,compressedTexImage2D:Jt,compressedTexImage3D:ht,texImage2D:w,texImage3D:Y,pixelStorei:re,getParameter:oe,updateUBOMapping:ee,uniformBlockBinding:te,texStorage2D:Ke,texStorage3D:C,texSubImage2D:St,texSubImage3D:ve,compressedTexSubImage2D:kt,compressedTexSubImage3D:qe,scissor:me,viewport:Me,reset:ge}}function QM(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new he,h=new WeakMap,d=new Set,f,u=new WeakMap,p=new Set,x=new FinalizationRegistry(C=>p.delete(C)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,w){return g?new OffscreenCanvas(C,w):Gr("canvas")}function v(C,w,Y){let oe=1,re=Ke(C);if((re.width>Y||re.height>Y)&&(oe=Y/Math.max(re.width,re.height)),oe<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let me=Math.floor(oe*re.width),Me=Math.floor(oe*re.height);f===void 0&&(f=m(me,Me));let ee=w?m(me,Me):f;return ee.width=me,ee.height=Me,ee.getContext("2d").drawImage(C,0,0,me,Me),Ve("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+me+"x"+Me+")."),ee}else return"data"in C&&Ve("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),C;return C}function M(C){return C.generateMipmaps}function _(C){s.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function S(C,w,Y,oe,re,me=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Me;oe&&(Me=e.get("EXT_texture_norm16"),Me||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=w;if(w===s.RED&&(Y===s.FLOAT&&(ee=s.R32F),Y===s.HALF_FLOAT&&(ee=s.R16F),Y===s.UNSIGNED_BYTE&&(ee=s.R8),Y===s.UNSIGNED_SHORT&&Me&&(ee=Me.R16_EXT),Y===s.SHORT&&Me&&(ee=Me.R16_SNORM_EXT)),w===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.R8UI),Y===s.UNSIGNED_SHORT&&(ee=s.R16UI),Y===s.UNSIGNED_INT&&(ee=s.R32UI),Y===s.BYTE&&(ee=s.R8I),Y===s.SHORT&&(ee=s.R16I),Y===s.INT&&(ee=s.R32I)),w===s.RG&&(Y===s.FLOAT&&(ee=s.RG32F),Y===s.HALF_FLOAT&&(ee=s.RG16F),Y===s.UNSIGNED_BYTE&&(ee=s.RG8),Y===s.UNSIGNED_SHORT&&Me&&(ee=Me.RG16_EXT),Y===s.SHORT&&Me&&(ee=Me.RG16_SNORM_EXT)),w===s.RG_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.RG8UI),Y===s.UNSIGNED_SHORT&&(ee=s.RG16UI),Y===s.UNSIGNED_INT&&(ee=s.RG32UI),Y===s.BYTE&&(ee=s.RG8I),Y===s.SHORT&&(ee=s.RG16I),Y===s.INT&&(ee=s.RG32I)),w===s.RGB_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),Y===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),Y===s.UNSIGNED_INT&&(ee=s.RGB32UI),Y===s.BYTE&&(ee=s.RGB8I),Y===s.SHORT&&(ee=s.RGB16I),Y===s.INT&&(ee=s.RGB32I)),w===s.RGBA_INTEGER&&(Y===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),Y===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),Y===s.UNSIGNED_INT&&(ee=s.RGBA32UI),Y===s.BYTE&&(ee=s.RGBA8I),Y===s.SHORT&&(ee=s.RGBA16I),Y===s.INT&&(ee=s.RGBA32I)),w===s.RGB&&(Y===s.UNSIGNED_SHORT&&Me&&(ee=Me.RGB16_EXT),Y===s.SHORT&&Me&&(ee=Me.RGB16_SNORM_EXT),Y===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),Y===s.UNSIGNED_INT_10F_11F_11F_REV&&(ee=s.R11F_G11F_B10F)),w===s.RGBA){let te=me?Ga:ut.getTransfer(re);Y===s.FLOAT&&(ee=s.RGBA32F),Y===s.HALF_FLOAT&&(ee=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(ee=te===Ct?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT&&Me&&(ee=Me.RGBA16_EXT),Y===s.SHORT&&Me&&(ee=Me.RGBA16_SNORM_EXT),Y===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function y(C,w){let Y;return C?w===null||w===mi||w===hr?Y=s.DEPTH24_STENCIL8:w===Qn?Y=s.DEPTH32F_STENCIL8:w===ca&&(Y=s.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===mi||w===hr?Y=s.DEPTH_COMPONENT24:w===Qn?Y=s.DEPTH_COMPONENT32F:w===ca&&(Y=s.DEPTH_COMPONENT16),Y}function E(C,w){return M(C)===!0||C.isFramebufferTexture&&C.minFilter!==jt&&C.minFilter!==Qt?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function A(C){let w=new WeakRef(C);n.get(C).__ref=w,p.add(w),x.register(C,w,w)}function R(C){let w=n.get(C).__ref;w!==void 0&&(p.delete(w),x.unregister(w))}function L(C){X(C.target)}function z(C){U(C.target)}function X(C){C.removeEventListener("dispose",L),R(C),H(C),C.isVideoTexture&&h.delete(C),C.isHTMLTexture&&d.delete(C)}function U(C){C.removeEventListener("dispose",z),R(C),q(C)}function V(){for(let C of p){let w=C.deref();w!==void 0&&(w.isRenderTarget===!0?U(w):X(w))}p.clear(),d.clear()}function H(C){let w=n.get(C);if(w.__webglInit===void 0)return;let Y=C.source,oe=u.get(Y);if(oe){let re=oe[w.__cacheKey];re.usedTimes--,re.usedTimes===0&&P(C),Object.keys(oe).length===0&&u.delete(Y)}n.remove(C)}function P(C){let w=n.get(C);s.deleteTexture(w.__webglTexture);let Y=C.source,oe=u.get(Y);delete oe[w.__cacheKey],a.memory.textures--}function q(C){let w=n.get(C);w.__depthDisposeCallback&&w.__depthDisposeCallback();let Y=C.depthTexture;if(Y&&Y.renderTarget===C&&X(Y),C.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(w.__webglFramebuffer[re]))for(let me=0;me<w.__webglFramebuffer[re].length;me++)s.deleteFramebuffer(w.__webglFramebuffer[re][me]);else s.deleteFramebuffer(w.__webglFramebuffer[re]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[re])}else{if(Array.isArray(w.__webglFramebuffer))for(let re=0;re<w.__webglFramebuffer.length;re++)s.deleteFramebuffer(w.__webglFramebuffer[re]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let re=0;re<w.__webglColorRenderbuffer.length;re++)w.__webglColorRenderbuffer[re]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[re]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let oe=C.textures;for(let re=0,me=oe.length;re<me;re++){let Me=n.get(oe[re]);Me.__webglTexture&&(s.deleteTexture(Me.__webglTexture),a.memory.textures--),n.remove(oe[re])}n.remove(C)}let I=0;function J(){I=0}function W(){return I}function F(C){I=C}function G(){let C=I;return C>=i.maxTextures&&Ve("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),I+=1,C}function D(C){let w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.mipmapsAutoUpdate),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function Q(C,w){let Y=n.get(C);if(C.isVideoTexture&&kt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&Y.__version!==C.version){let oe=C.image;if(oe===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{ce(Y,C,w);return}}else C.isExternalTexture&&(Y.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+w)}function ae(C,w){let Y=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&Y.__version!==C.version){ce(Y,C,w);return}else C.isExternalTexture&&(Y.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+w)}function Ie(C,w){let Y=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&Y.__version!==C.version){ce(Y,C,w);return}t.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+w)}function ye(C,w){let Y=n.get(C);if(C.version>0&&Y.__version!==C.version){Re(Y,C,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+w)}let Be={[Ei]:s.REPEAT,[ii]:s.CLAMP_TO_EDGE,[kr]:s.MIRRORED_REPEAT},nt={[jt]:s.NEAREST,[hc]:s.NEAREST_MIPMAP_NEAREST,[cr]:s.NEAREST_MIPMAP_LINEAR,[Qt]:s.LINEAR,[la]:s.LINEAR_MIPMAP_NEAREST,[Wn]:s.LINEAR_MIPMAP_LINEAR},Fe={[x0]:s.NEVER,[Hu]:s.ALWAYS,[v0]:s.LESS,[zu]:s.LEQUAL,[_0]:s.EQUAL,[ku]:s.GEQUAL,[y0]:s.GREATER,[M0]:s.NOTEQUAL};function je(C,w){if(w.type===Qn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Qt||w.magFilter===la||w.magFilter===cr||w.magFilter===Wn||w.minFilter===Qt||w.minFilter===la||w.minFilter===cr||w.minFilter===Wn)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Be[w.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Be[w.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Be[w.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,nt[w.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,nt[w.minFilter]),w.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,Fe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===jt||w.minFilter!==cr&&w.minFilter!==Wn||w.type===Qn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function et(C,w){let Y=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",L),A(w));let oe=w.source,re=u.get(oe);re===void 0&&(re={},u.set(oe,re));let me=D(w);if(me!==C.__cacheKey){re[me]===void 0&&(re[me]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),re[me].usedTimes++;let Me=re[C.__cacheKey];Me!==void 0&&(re[C.__cacheKey].usedTimes--,Me.usedTimes===0&&P(w)),C.__cacheKey=me,C.__webglTexture=re[me].texture}return Y}function se(C,w,Y){return Math.floor(Math.floor(C/Y)/w)}function ue(C,w,Y,oe){let me=C.updateRanges;if(me.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,Y,oe,w.data);else{me.sort((O,ie)=>O.start-ie.start);let Me=0;for(let O=1;O<me.length;O++){let ie=me[Me],K=me[O],de=ie.start+ie.count,pe=se(K.start,w.width,4),xe=se(ie.start,w.width,4);K.start<=de+1&&pe===xe&&se(K.start+K.count-1,w.width,4)===pe?ie.count=Math.max(ie.count,K.start+K.count-ie.start):(++Me,me[Me]=K)}me.length=Me+1;let ee=t.getParameter(s.UNPACK_ROW_LENGTH),te=t.getParameter(s.UNPACK_SKIP_PIXELS),ge=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let O=0,ie=me.length;O<ie;O++){let K=me[O],de=Math.floor(K.start/4),pe=Math.ceil(K.count/4),xe=de%w.width,Ue=Math.floor(de/w.width),at=pe,fe=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,xe),t.pixelStorei(s.UNPACK_SKIP_ROWS,Ue),t.texSubImage2D(s.TEXTURE_2D,0,xe,Ue,at,fe,Y,oe,w.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,ee),t.pixelStorei(s.UNPACK_SKIP_PIXELS,te),t.pixelStorei(s.UNPACK_SKIP_ROWS,ge)}}function ce(C,w,Y){let oe=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(oe=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(oe=s.TEXTURE_3D);let re=et(C,w),me=w.source;t.bindTexture(oe,C.__webglTexture,s.TEXTURE0+Y);let Me=n.get(me);if(me.version!==Me.__version||re===!0){if(t.activeTexture(s.TEXTURE0+Y),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let fe=ut.getPrimaries(ut.workingColorSpace),ne=w.colorSpace===as?null:ut.getPrimaries(w.colorSpace),Le=w.colorSpace===as||fe===ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let te=v(w.image,!1,i.maxTextureSize);te=qe(w,te);let ge=r.convert(w.format,w.colorSpace),O=r.convert(w.type),ie=S(w.internalFormat,ge,O,w.normalized,w.colorSpace,w.isVideoTexture);je(oe,w);let K,de=w.mipmaps,pe=w.isVideoTexture!==!0,xe=Me.__version===void 0||re===!0,Ue=me.dataReady,at=E(w,te);if(w.isDepthTexture)ie=y(w.format===rs,w.type),xe&&(pe?t.texStorage2D(s.TEXTURE_2D,1,ie,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,ie,te.width,te.height,0,ge,O,null));else if(w.isDataTexture)if(de.length>0){pe&&xe&&t.texStorage2D(s.TEXTURE_2D,at,ie,de[0].width,de[0].height);for(let fe=0,ne=de.length;fe<ne;fe++)K=de[fe],pe?Ue&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,K.width,K.height,ge,O,K.data):t.texImage2D(s.TEXTURE_2D,fe,ie,K.width,K.height,0,ge,O,K.data);w.generateMipmaps=!1}else pe?(xe&&t.texStorage2D(s.TEXTURE_2D,at,ie,te.width,te.height),Ue&&ue(w,te,ge,O)):t.texImage2D(s.TEXTURE_2D,0,ie,te.width,te.height,0,ge,O,te.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){pe&&xe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,at,ie,de[0].width,de[0].height,te.depth);for(let fe=0,ne=de.length;fe<ne;fe++)if(K=de[fe],w.format!==ai)if(ge!==null)if(pe){if(Ue)if(w.layerUpdates.size>0){let Le=ju(K.width,K.height,w.format,w.type);for(let be of w.layerUpdates){let Tt=K.data.subarray(be*Le/K.data.BYTES_PER_ELEMENT,(be+1)*Le/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,be,K.width,K.height,1,ge,Tt)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,K.width,K.height,te.depth,ge,K.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,fe,ie,K.width,K.height,te.depth,0,K.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pe?Ue&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,K.width,K.height,te.depth,ge,O,K.data):t.texImage3D(s.TEXTURE_2D_ARRAY,fe,ie,K.width,K.height,te.depth,0,ge,O,K.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{pe&&xe&&t.texStorage2D(s.TEXTURE_2D,at,ie,de[0].width,de[0].height);for(let fe=0,ne=de.length;fe<ne;fe++)K=de[fe],w.format!==ai?ge!==null?pe?Ue&&t.compressedTexSubImage2D(s.TEXTURE_2D,fe,0,0,K.width,K.height,ge,K.data):t.compressedTexImage2D(s.TEXTURE_2D,fe,ie,K.width,K.height,0,K.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pe?Ue&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,K.width,K.height,ge,O,K.data):t.texImage2D(s.TEXTURE_2D,fe,ie,K.width,K.height,0,ge,O,K.data)}else if(w.isDataArrayTexture)if(pe){if(xe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,at,ie,te.width,te.height,te.depth),Ue)if(w.layerUpdates.size>0){let fe=ju(te.width,te.height,w.format,w.type);for(let ne of w.layerUpdates){let Le=te.data.subarray(ne*fe/te.data.BYTES_PER_ELEMENT,(ne+1)*fe/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ne,te.width,te.height,1,ge,O,Le)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ge,O,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ie,te.width,te.height,te.depth,0,ge,O,te.data);else if(w.isData3DTexture)pe?(xe&&t.texStorage3D(s.TEXTURE_3D,at,ie,te.width,te.height,te.depth),Ue&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ge,O,te.data)):t.texImage3D(s.TEXTURE_3D,0,ie,te.width,te.height,te.depth,0,ge,O,te.data);else if(w.isFramebufferTexture){if(xe)if(pe)t.texStorage2D(s.TEXTURE_2D,at,ie,te.width,te.height);else{let fe=te.width,ne=te.height;for(let Le=0;Le<at;Le++)t.texImage2D(s.TEXTURE_2D,Le,ie,fe,ne,0,ge,O,null),fe>>=1,ne>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){let fe=s.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),te.parentNode!==fe){fe.appendChild(te),d.add(w),fe.onpaint=ne=>{let Le=ne.changedElements;for(let be of d)Le.includes(be.image)&&(be.needsUpdate=!0)},fe.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,te);else{let Le=s.RGBA,be=s.RGBA,Tt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Le,be,Tt,te)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(de.length>0){if(pe&&xe){let fe=Ke(de[0]);t.texStorage2D(s.TEXTURE_2D,at,ie,fe.width,fe.height)}for(let fe=0,ne=de.length;fe<ne;fe++)K=de[fe],pe?Ue&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,ge,O,K):t.texImage2D(s.TEXTURE_2D,fe,ie,ge,O,K);w.generateMipmaps=!1}else if(pe){if(xe){let fe=Ke(te);t.texStorage2D(s.TEXTURE_2D,at,ie,fe.width,fe.height)}Ue&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ge,O,te)}else t.texImage2D(s.TEXTURE_2D,0,ie,ge,O,te);M(w)&&w.mipmapsAutoUpdate===!0&&_(oe),Me.__version=me.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Re(C,w,Y){if(w.image.length!==6)return;let oe=et(C,w),re=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+Y);let me=n.get(re);if(re.version!==me.__version||oe===!0){t.activeTexture(s.TEXTURE0+Y);let Me=ut.getPrimaries(ut.workingColorSpace),ee=w.colorSpace===as?null:ut.getPrimaries(w.colorSpace),te=w.colorSpace===as||Me===ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ge=w.isCompressedTexture||w.image[0].isCompressedTexture,O=w.image[0]&&w.image[0].isDataTexture,ie=[];for(let be=0;be<6;be++)!ge&&!O?ie[be]=v(w.image[be],!0,i.maxCubemapSize):ie[be]=O?w.image[be].image:w.image[be],ie[be]=qe(w,ie[be]);let K=ie[0],de=r.convert(w.format,w.colorSpace),pe=r.convert(w.type),xe=S(w.internalFormat,de,pe,w.normalized,w.colorSpace),Ue=w.isVideoTexture!==!0,at=me.__version===void 0||oe===!0,fe=re.dataReady,ne=E(w,K);je(s.TEXTURE_CUBE_MAP,w);let Le;if(w.isDepthTexture){if(xe=y(w.format===rs,w.type),at)if(Ue)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,xe,K.width,K.height);else for(let be=0;be<6;be++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,xe,K.width,K.height,0,de,pe,null)}else if(ge){Ue&&at&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,xe,K.width,K.height);for(let be=0;be<6;be++){Le=ie[be].mipmaps;for(let Tt=0;Tt<Le.length;Tt++){let mn=Le[Tt];w.format!==ai?de!==null?Ue?fe&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt,0,0,mn.width,mn.height,de,mn.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt,xe,mn.width,mn.height,0,mn.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt,0,0,mn.width,mn.height,de,pe,mn.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt,xe,mn.width,mn.height,0,de,pe,mn.data)}}}else{if(Le=w.mipmaps,Ue&&at){Le.length>0&&ne++;let be=Ke(ie[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ne,xe,be.width,be.height)}for(let be=0;be<6;be++)if(O){Ue?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,ie[be].width,ie[be].height,de,pe,ie[be].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,xe,ie[be].width,ie[be].height,0,de,pe,ie[be].data);for(let Tt=0;Tt<Le.length;Tt++){let us=Le[Tt].image[be].image;Ue?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt+1,0,0,us.width,us.height,de,pe,us.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt+1,xe,us.width,us.height,0,de,pe,us.data)}}else{Ue?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,de,pe,ie[be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,xe,de,pe,ie[be]);for(let Tt=0;Tt<Le.length;Tt++){let mn=Le[Tt];Ue?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt+1,0,0,de,pe,mn.image[be]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Tt+1,xe,de,pe,mn.image[be])}}}M(w)&&w.mipmapsAutoUpdate===!0&&_(s.TEXTURE_CUBE_MAP),me.__version=re.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function _e(C,w,Y,oe,re,me){let Me=r.convert(Y.format,Y.colorSpace),ee=r.convert(Y.type),te=S(Y.internalFormat,Me,ee,Y.normalized,Y.colorSpace),ge=n.get(w),O=n.get(Y);if(O.__renderTarget=w,!ge.__hasExternalTextures){let ie=Math.max(1,w.width>>me),K=Math.max(1,w.height>>me);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,me,te,ie,K,w.depth,0,Me,ee,null):t.texImage2D(re,me,te,ie,K,0,Me,ee,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),ve(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,oe,re,O.__webglTexture,0,St(w)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,oe,re,O.__webglTexture,me),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ze(C,w,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,C),w.depthBuffer){let oe=w.depthTexture,re=oe&&oe.isDepthTexture?oe.type:null,me=y(w.stencilBuffer,re),Me=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ve(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(w),me,w.width,w.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(w),me,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,me,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Me,s.RENDERBUFFER,C)}else{let oe=w.textures;for(let re=0;re<oe.length;re++){let me=oe[re],Me=r.convert(me.format,me.colorSpace),ee=r.convert(me.type),te=S(me.internalFormat,Me,ee,me.normalized,me.colorSpace);ve(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,St(w),te,w.width,w.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,St(w),te,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,te,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ze(C,w,Y){let oe=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let re=n.get(w.depthTexture);re.__renderTarget=w;let me=oe?w.depthTexture.image[0]:w.depthTexture.image;(!re.__webglTexture||me.width!==w.width||me.height!==w.height)&&(me.width=w.width,me.height=w.height,w.depthTexture.needsUpdate=!0),oe?ye(w.depthTexture,0):Q(w.depthTexture,0);let Me=re.__webglTexture,ee=St(w),te=oe?s.TEXTURE_CUBE_MAP_POSITIVE_X+Y:s.TEXTURE_2D,ge=w.depthTexture.format===rs?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===Yi)ve(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ge,te,Me,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,ge,te,Me,0);else if(w.depthTexture.format===rs)ve(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ge,te,Me,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,ge,te,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(C){let w=n.get(C),Y=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){let oe=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),oe){let re=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,oe.removeEventListener("dispose",re)};oe.addEventListener("dispose",re),w.__depthDisposeCallback=re}w.__boundDepthTexture=oe}if(C.depthTexture&&!w.__autoAllocateDepthBuffer)if(Y)for(let oe=0;oe<6;oe++)ze(w.__webglFramebuffer[oe],C,oe);else C.texture.mipmaps.length>0?ze(w.__webglFramebuffer[0],C,0):ze(w.__webglFramebuffer,C,0);else if(Y){w.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[oe]),w.__webglDepthbuffer[oe]===void 0)w.__webglDepthbuffer[oe]=s.createRenderbuffer(),Ze(w.__webglDepthbuffer[oe],C,!1);else{let re=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,me=w.__webglDepthbuffer[oe];s.bindRenderbuffer(s.RENDERBUFFER,me),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,me)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Ze(w.__webglDepthbuffer,C,!1);else{let re=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,me=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,me),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,me)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function rt(C,w,Y){let oe=n.get(C);w!==void 0&&_e(oe.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&st(C)}function gt(C){let w=C.texture,Y=n.get(C),oe=n.get(w);C.addEventListener("dispose",z),A(C);let re=C.textures,me=C.isWebGLCubeRenderTarget===!0,Me=re.length>1;if(Me||(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=w.version,a.memory.textures++),me){Y.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(w.mipmaps.length>0){Y.__webglFramebuffer[ee]=[];for(let te=0;te<w.mipmaps.length;te++)Y.__webglFramebuffer[ee][te]=s.createFramebuffer()}else Y.__webglFramebuffer[ee]=s.createFramebuffer()}else{if(w.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ee=0;ee<w.mipmaps.length;ee++)Y.__webglFramebuffer[ee]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(Me)for(let ee=0,te=re.length;ee<te;ee++){let ge=n.get(re[ee]);ge.__webglTexture===void 0&&(ge.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&ve(C)===!1){Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ee=0;ee<re.length;ee++){let te=re[ee];Y.__webglColorRenderbuffer[ee]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[ee]);let ge=r.convert(te.format,te.colorSpace),O=r.convert(te.type),ie=S(te.internalFormat,ge,O,te.normalized,te.colorSpace,C.isXRRenderTarget===!0),K=St(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,K,ie,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ee,s.RENDERBUFFER,Y.__webglColorRenderbuffer[ee])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),Ze(Y.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(me){t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture),je(s.TEXTURE_CUBE_MAP,w);for(let ee=0;ee<6;ee++)if(w.mipmaps.length>0)for(let te=0;te<w.mipmaps.length;te++)_e(Y.__webglFramebuffer[ee][te],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,te);else _e(Y.__webglFramebuffer[ee],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);M(w)?_(s.TEXTURE_CUBE_MAP):w.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}else if(Me){for(let ee=0,te=re.length;ee<te;ee++){let ge=re[ee],O=n.get(ge),ie=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ie,O.__webglTexture),je(ie,ge),_e(Y.__webglFramebuffer,C,ge,s.COLOR_ATTACHMENT0+ee,ie,0),M(ge)&&_(ie)}t.unbindTexture()}else{let ee=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ee=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ee,oe.__webglTexture),je(ee,w),w.mipmaps.length>0)for(let te=0;te<w.mipmaps.length;te++)_e(Y.__webglFramebuffer[te],C,w,s.COLOR_ATTACHMENT0,ee,te);else _e(Y.__webglFramebuffer,C,w,s.COLOR_ATTACHMENT0,ee,0);M(w)?_(ee):w.mipmaps.length>0&&s.texParameteri(ee,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&st(C)}function k(C){let w=C.textures;for(let Y=0,oe=w.length;Y<oe;Y++){let re=w[Y];if(M(re)&&re.mipmapsAutoUpdate===!0){let me=b(C),Me=n.get(re).__webglTexture;t.bindTexture(me,Me),_(me),t.unbindTexture()}}}let Jt=[];function ht(C){if(C.samples>0){if(ve(C)===!1){let w=C.textures,Y=C.width,oe=C.height,re=s.COLOR_BUFFER_BIT,me=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Me=n.get(C),ee=w.length>1;if(ee)for(let ge=0;ge<w.length;ge++)t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ge=0;ge<w.length;ge++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),ee){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Me.__webglColorRenderbuffer[ge]);let O=n.get(w[ge]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,O,0)}s.blitFramebuffer(0,0,Y,oe,0,0,Y,oe,re,s.NEAREST),c===!0&&(Jt.length=0,Jt.push(s.COLOR_ATTACHMENT0+ge),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&Jt.push(me),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Jt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ee)for(let ge=0;ge<w.length;ge++){t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,Me.__webglColorRenderbuffer[ge]);let O=n.get(w[ge]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,O,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let w=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function St(C){return Math.min(i.maxSamples,C.samples)}function ve(C){let w=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function kt(C){let w=a.render.frame;h.get(C)!==w&&(h.set(C,w),C.update())}function qe(C,w){let Y=C.colorSpace,oe=C.format,re=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||Y!==Dn&&Y!==as&&(ut.getTransfer(Y)===Ct?(oe!==ai||re!==Xn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",Y)),w}function Ke(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=J,this.getTextureUnits=W,this.setTextureUnits=F,this.setTexture2D=Q,this.setTexture2DArray=ae,this.setTexture3D=Ie,this.setTextureCube=ye,this.rebindTextures=rt,this.setupRenderTarget=gt,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=ht,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=ve,this.dispose=V}function eb(s,e){function t(n,i=as){let r,a=ut.getTransfer(i);if(n===Xn)return s.UNSIGNED_BYTE;if(n===fc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===dc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Du)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Uu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Lu)return s.BYTE;if(n===Nu)return s.SHORT;if(n===ca)return s.UNSIGNED_SHORT;if(n===uc)return s.INT;if(n===mi)return s.UNSIGNED_INT;if(n===Qn)return s.FLOAT;if(n===gi)return s.HALF_FLOAT;if(n===Fu)return s.ALPHA;if(n===Ou)return s.RGB;if(n===ai)return s.RGBA;if(n===Yi)return s.DEPTH_COMPONENT;if(n===rs)return s.DEPTH_STENCIL;if(n===pc)return s.RED;if(n===mc)return s.RED_INTEGER;if(n===As)return s.RG;if(n===gc)return s.RG_INTEGER;if(n===xc)return s.RGBA_INTEGER;if(n===Eo||n===wo||n===To||n===Ao)if(a===Ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ao)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vc||n===_c||n===yc||n===Mc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_c)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===yc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bc||n===Sc||n===Ec||n===wc||n===Tc||n===Ro||n===Ac)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bc||n===Sc)return a===Ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ec)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===wc)return r.COMPRESSED_R11_EAC;if(n===Tc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ro)return r.COMPRESSED_RG11_EAC;if(n===Ac)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Nc||n===Dc||n===Uc||n===Fc||n===Oc||n===Bc||n===zc||n===kc||n===Hc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Rc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Cc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ic)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Nc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Dc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Oc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===kc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Hc)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gc||n===Vc||n===Wc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Gc)return a===Ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xc||n===qc||n===Co||n===Yc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Co)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===hr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var tb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nb=`
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

}`,df=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new eo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new zt({vertexShader:tb,fragmentShader:nb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new Vt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pf=class extends wi{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,f=null,u=null,p=null,x=typeof XRWebGLBinding<"u",g=new df,m={},v=t.getContextAttributes(),M=null,_=null,b=[],S=[],y=new he,E=null,A=null,R=new cn;R.viewport=new mt;let L=new cn;L.viewport=new mt;let z=[R,L],X=new ac,U=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let Q=b[D];return Q===void 0&&(Q=new Xr,b[D]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(D){let Q=b[D];return Q===void 0&&(Q=new Xr,b[D]=Q),Q.getGripSpace()},this.getHand=function(D){let Q=b[D];return Q===void 0&&(Q=new Xr,b[D]=Q),Q.getHandSpace()};function H(D){let Q=S.indexOf(D.inputSource);if(Q===-1)return;let ae=b[Q];ae!==void 0&&(ae.update(D.inputSource,D.frame,l||a),ae.dispatchEvent({type:D.type,data:D.inputSource}))}function P(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",P),i.removeEventListener("inputsourceschange",q);for(let D=0;D<b.length;D++){let Q=S[D];Q!==null&&(S[D]=null,b[D].disconnect(Q))}U=null,V=null,g.reset();for(let D in m)delete m[D];if(e.setRenderTarget(M),u=null,f=null,d=null,i=null,_=null,G.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(y.width,y.height,!1),A!==null){let D=A.camera;D.fov=A.fov,D.zoom=A.zoom,D.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){r=D,n.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){o=D,n.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(D){l=D},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(D){if(i=D,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",P),i.addEventListener("inputsourceschange",q),v.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Ie=null,ye=null;v.depth&&(ye=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=v.stencil?rs:Yi,Ie=v.stencil?hr:mi);let Be={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(Be),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Kn(f.textureWidth,f.textureHeight,{format:ai,type:Xn,depthTexture:new Zi(f.textureWidth,f.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ae={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(i,t,ae),i.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),_=new Kn(u.framebufferWidth,u.framebufferHeight,{format:ai,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),G.setContext(i),G.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(D){for(let Q=0;Q<D.removed.length;Q++){let ae=D.removed[Q],Ie=S.indexOf(ae);Ie>=0&&(S[Ie]=null,b[Ie].disconnect(ae))}for(let Q=0;Q<D.added.length;Q++){let ae=D.added[Q],Ie=S.indexOf(ae);if(Ie===-1){for(let Be=0;Be<b.length;Be++)if(Be>=S.length){S.push(ae),Ie=Be;break}else if(S[Be]===null){S[Be]=ae,Ie=Be;break}if(Ie===-1)break}let ye=b[Ie];ye&&ye.connect(ae)}}function I(D,Q){Q===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(Q.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(i===null)return;let Q=D.near,ae=D.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(ae=g.depthFar)),X.near=L.near=R.near=Q,X.far=L.far=R.far=ae,(U!==X.near||V!==X.far)&&(i.updateRenderState({depthNear:X.near,depthFar:X.far}),U=X.near,V=X.far),X.layers.mask=D.layers.mask|6,R.layers.mask=X.layers.mask&-5,L.layers.mask=X.layers.mask&-3;let Ie=D.parent,ye=X.cameras;I(X,Ie);for(let Be=0;Be<ye.length;Be++)I(ye[Be],Ie);X.projectionMatrix.copy(R.projectionMatrix),X.projectionMatrixInverse.copy(R.projectionMatrixInverse),A===null&&D.isPerspectiveCamera&&(A={camera:D,fov:D.fov,zoom:D.zoom}),J(D,X,Ie)};function J(D,Q,ae){ae===null?D.matrix.copy(Q.matrixWorld):(D.matrix.copy(ae.matrixWorld),D.matrix.invert(),D.matrix.multiply(Q.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(Q.projectionMatrix),D.projectionMatrixInverse.copy(Q.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=Ks*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(f===null&&u===null))return c},this.setFoveation=function(D){c=D,f!==null&&(f.fixedFoveation=D),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=D)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function(D){return m[D]};let W=null;function F(D,Q){if(h=Q.getViewerPose(l||a),p=Q,h!==null){let ae=h.views;u!==null&&(e.setRenderTargetFramebuffer(_,u.framebuffer),e.setRenderTarget(_));let Ie=!1;ae.length!==X.cameras.length&&(X.cameras.length=0,Ie=!0);for(let Fe=0;Fe<ae.length;Fe++){let je=ae[Fe],et=null;if(u!==null)et=u.getViewport(je);else{let ue=d.getViewSubImage(f,je);et=ue.viewport,Fe===0&&(e.setRenderTargetTextures(_,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(_))}let se=z[Fe];se===void 0&&(se=new cn,se.layers.enable(Fe),se.viewport=new mt,z[Fe]=se),se.matrix.fromArray(je.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(je.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(et.x,et.y,et.width,et.height),Fe===0&&(X.matrix.copy(se.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ie===!0&&X.cameras.push(se)}let ye=i.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let Fe=d.getDepthInformation(ae[0]);Fe&&Fe.isValid&&Fe.texture&&g.init(Fe,i.renderState)}if(ye&&ye.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let Fe=0;Fe<ae.length;Fe++){let je=ae[Fe].camera;if(je){let et=m[je];et||(et=new eo,m[je]=et);let se=d.getCameraImage(je);et.sourceTexture=se}}}}for(let ae=0;ae<b.length;ae++){let Ie=S[ae],ye=b[ae];Ie!==null&&ye!==void 0&&ye.update(Ie,Q,l||a)}W&&W(D,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),p=null}let G=new tm;G.setAnimationLoop(F),this.setAnimationLoop=function(D){W=D},this.dispose=function(){}}},ib=new We,um=new $e;um.set(-1,0,0,0,1,0,0,0,1);function sb(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Ku(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,M,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&u(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,v,M):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===On&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===On&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let v=e.get(m),M=v.envMap,_=v.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(ib.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(um),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function u(g,m,v){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===On&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function rb(s,e,t,n){let i={},r={};function a(v,M){let _=M.program;n.uniformBlockBinding(v,_,i[v.id])}function o(v,M){let _=i[v.id];_===void 0&&(p(v),_=c(v),i[v.id]=_,v.addEventListener("dispose",g));let b=M.program;n.updateUBOMapping(v,b);let S=e.render.frame;r[v.id]!==S&&(l(v),r[v.id]=S)}function c(v){let M=s.createBuffer(),_=v.__size,b=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,_,b),s.bindBuffer(s.UNIFORM_BUFFER,null),M}function l(v){let M=i[v.id],_=v.uniforms,b=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let S=0,y=_.length;S<y;S++){let E=_[S];if(Array.isArray(E))for(let A=0,R=E.length;A<R;A++)h(E[A],S,A,b);else h(E,S,0,b)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(v,M,_,b){if(f(v,M,_,b)===!0){let S=v.__offset,y=v.value;if(Array.isArray(y)){let E=0;for(let A=0;A<y.length;A++){let R=y[A],L=x(R,!0);d(R,v.__data,E),E+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else d(y,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,S,v.__data)}}function d(v,M,_){typeof v=="number"||typeof v=="boolean"?M[_]=v:v.isMatrix3?(M[_]=v.elements[0],M[_+1]=v.elements[1],M[_+2]=v.elements[2],M[_+3]=0,M[_+4]=v.elements[3],M[_+5]=v.elements[4],M[_+6]=v.elements[5],M[_+7]=0,M[_+8]=v.elements[6],M[_+9]=v.elements[7],M[_+10]=v.elements[8],M[_+11]=0):ArrayBuffer.isView(v)?M.set(v.subarray(0,M.length-_),_):v.toArray(M,_)}function f(v,M,_,b){let S=v.value,y=M+"_"+_;if(Array.isArray(S)){b[y]===void 0&&(b[y]=[]);let E=b[y],A=!1;for(let R=0;R<S.length;R++)u(S[R],E,R)===!0&&(A=!0);return A}return u(S,b,y)}function u(v,M,_){if(M[_]===void 0)return typeof v=="number"||typeof v=="boolean"?M[_]=v:ArrayBuffer.isView(v)?M[_]=v.slice():M[_]=v.clone(),!0;{let b=M[_];if(typeof v=="number"||typeof v=="boolean"){if(b!==v)return M[_]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(b.equals(v)===!1)return b.copy(v),!0}}return!1}function p(v){let M=v.uniforms,_=0,b=16;for(let y=0,E=M.length;y<E;y++){let A=Array.isArray(M[y])?M[y]:[M[y]];for(let R=0,L=A.length;R<L;R++){let z=A[R],X=Array.isArray(z.value)?z.value:[z.value],U=Array.isArray(M[y])||Array.isArray(z.value),V=_;for(let P=0,q=X.length;P<q;P++){let I=X[P],J=x(I,U),W=_%b,F=W%J.boundary,G=W+F;_+=F,G!==0&&b-G<J.storage&&(_+=b-G),P===0&&(V=_),_+=J.storage}let H=z.type==="int"?Int32Array:z.type==="uint"?Uint32Array:Float32Array;z.__data=new H((_-V)/Float32Array.BYTES_PER_ELEMENT),z.__offset=V}}let S=_%b;return S>0&&(_+=b-S),v.__size=_,v.__cache={},this}function x(v,M){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=16,_.storage=48):v.isMatrix4?(_.boundary=16,_.storage=64):v.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(_.boundary=16,_.storage=v.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",v),M===!0&&(_.boundary=16,_.storage=Math.ceil(_.storage/16)*16),_}function g(v){let M=v.target;M.removeEventListener("dispose",g),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function m(){for(let v in i)s.deleteBuffer(i[v]);i={},r={}}return{bind:a,update:o,dispose:m}}var ab=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ci=null;function ob(){return Ci===null&&(Ci=new Kr(ab,16,16,As,gi),Ci.name="DFG_LUT",Ci.minFilter=Qt,Ci.magFilter=Qt,Ci.wrapS=ii,Ci.wrapT=ii,Ci.generateMipmaps=!1,Ci.needsUpdate=!0),Ci}var jc=class{constructor(e={}){let{canvas:t=b0(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:u=Xn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=u,g=new Set([xc,gc,mc]),m=new Set([Xn,mi,ca,hr,fc,dc]),v=new Uint32Array(4),M=new Int32Array(4),_={textures:[],min:[],max:[],resolution:[]},b=null,S=null,y=[],E=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,z=null,X=null,U=null,V=null;this._outputColorSpace=yt;let H=0,P=0,q=null,I=-1,J=null,W=new mt,F=new mt,G=null,D=new Se(0),Q=0,ae=t.width,Ie=t.height,ye=1,Be=null,nt=null,Fe=new mt(0,0,ae,Ie),je=new mt(0,0,ae,Ie),et=!1,se=new bs,ue=new Gl,ce=!1,Re=!1,_e=new We,Ze=new N,ze=new mt,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},rt=!1;function gt(){return q===null?ye:1}let k=n;function Jt(T,B){return t.getContext(T,B)}let ht,St,ve,kt,qe,Ke,C,w,Y,oe,re,me,Me,ee,te,ge,O,ie,K,de,pe,xe,Ue;try{let T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",be,!1),k===null){let B="webgl2";if(k=Jt(B,T),k===null)throw Jt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}at()}catch(T){throw t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Je("WebGLRenderer: "+T.message),T}function at(){ht=new vy(k),ht.init(),pe=new eb(k,ht),St=new oy(k,ht,e,pe),ve=new jM(k,ht),St.reversedDepthBuffer&&f&&ve.buffers.depth.setReversed(!0),X=k.createFramebuffer(),U=k.createFramebuffer(),V=k.createFramebuffer(),kt=new My(k),qe=new BM,Ke=new QM(k,ht,ve,qe,St,pe,kt),C=new xy(R),w=new Sx(k),xe=new ry(k,w),Y=new _y(k,w,kt,xe),oe=new Sy(k,Y,w,xe,kt),ie=new by(k,St,Ke),te=new ly(qe),re=new OM(R,C,ht,St,xe,te),me=new sb(R,qe),Me=new kM,ee=new qM(ht),O=new sy(R,C,ve,oe,p,c),ge=new $M(R,oe,St),Ue=new rb(k,kt,St,ve),K=new ay(k,ht,kt),de=new yy(k,ht,kt),kt.programs=re.programs,R.capabilities=St,R.extensions=ht,R.properties=qe,R.renderLists=Me,R.shadowMap=ge,R.state=ve,R.info=kt}x!==Xn&&(A=new wy(x,t.width,t.height,o,i,r));let fe=new pf(R,k);this.xr=fe,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let T=ht.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ht.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(T){T!==void 0&&(ye=T,this.setSize(ae,Ie,!1))},this.getSize=function(T){return T.set(ae,Ie)},this.setSize=function(T,B,j=!0){if(fe.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=T,Ie=B,t.width=Math.floor(T*ye),t.height=Math.floor(B*ye),j===!0&&(t.style.width=T+"px",t.style.height=B+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(ae*ye,Ie*ye).floor()},this.setDrawingBufferSize=function(T,B,j){ae=T,Ie=B,ye=j,t.width=Math.floor(T*j),t.height=Math.floor(B*j),this.setViewport(0,0,T,B)},this.setEffects=function(T){if(x===Xn){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let B=0;B<T.length;B++)if(T[B].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(W)},this.getViewport=function(T){return T.copy(Fe)},this.setViewport=function(T,B,j,Z){T.isVector4?Fe.set(T.x,T.y,T.z,T.w):Fe.set(T,B,j,Z),ve.viewport(W.copy(Fe).multiplyScalar(gt()).round())},this.getScissor=function(T){return T.copy(je)},this.setScissor=function(T,B,j,Z){T.isVector4?je.set(T.x,T.y,T.z,T.w):je.set(T,B,j,Z),ve.scissor(F.copy(je).multiplyScalar(gt()).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(T){ve.setScissorTest(et=T)},this.setOpaqueSort=function(T){Be=T},this.setTransparentSort=function(T){nt=T},this.getClearColor=function(T){return T.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(T=!0,B=!0,j=!0){let Z=0;if(T){let $=!1;if(q!==null){let we=q.texture.format;$=g.has(we)}if($){let we=q.texture.type,Oe=m.has(we),Ee=O.getClearColor(),Ce=O.getClearAlpha(),Ge=Ee.r,it=Ee.g,xt=Ee.b;Oe?(v[0]=Ge,v[1]=it,v[2]=xt,v[3]=Ce,k.clearBufferuiv(k.COLOR,0,v)):(M[0]=Ge,M[1]=it,M[2]=xt,M[3]=Ce,k.clearBufferiv(k.COLOR,0,M))}else Z|=k.COLOR_BUFFER_BIT}B&&(Z|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Z|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&k.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),z=T},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",be,!1),O.dispose(),Me.dispose(),ee.dispose(),Ke.dispose(),qe.dispose(),C.dispose(),oe.dispose(),Y.dispose(),xe.dispose(),Ue.dispose(),re.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",Sd),fe.removeEventListener("sessionend",Ed),Fs.stop()};function ne(T){T.preventDefault(),Va("WebGLRenderer: Context Lost."),L=!0}function Le(){Va("WebGLRenderer: Context Restored."),L=!1;let T=kt.autoReset,B=ge.enabled,j=ge.autoUpdate,Z=ge.needsUpdate,$=ge.type;at(),kt.autoReset=T,ge.enabled=B,ge.autoUpdate=j,ge.needsUpdate=Z,ge.type=$}function be(T){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Tt(T){let B=T.target;B.removeEventListener("dispose",Tt),mn(B)}function mn(T){us(T),qe.remove(T)}function us(T){let B=qe.get(T).programs;B!==void 0&&(B.forEach(function(j){re.releaseProgram(j)}),T.isShaderMaterial&&re.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,j,Z,$,we){B===null&&(B=st);let Oe=$.isMesh&&$.matrixWorld.determinantAffine()<0,Ee=Fg(T,B,j,Z,$);ve.setMaterial(Z,Oe);let Ce=j.index,Ge=1;if(Z.wireframe===!0){if(Ce=Y.getWireframeAttribute(j),Ce===void 0)return;Ge=2}let it=j.drawRange,xt=j.attributes.position,ke=it.start*Ge,vt=(it.start+it.count)*Ge;we!==null&&(ke=Math.max(ke,we.start*Ge),vt=Math.min(vt,(we.start+we.count)*Ge)),Ce!==null?(ke=Math.max(ke,0),vt=Math.min(vt,Ce.count)):xt!=null&&(ke=Math.max(ke,0),vt=Math.min(vt,xt.count));let sn=vt-ke;if(sn<0||sn===1/0)return;xe.setup($,Z,Ee,j,Ce);let Bt,Dt=K;if(Ce!==null&&(Bt=w.get(Ce),Dt=de,Dt.setIndex(Bt)),$.isMesh)Z.wireframe===!0?(ve.setLineWidth(Z.wireframeLinewidth*gt()),Dt.setMode(k.LINES)):Dt.setMode(k.TRIANGLES);else if($.isLine){let Sn=Z.linewidth;Sn===void 0&&(Sn=1),ve.setLineWidth(Sn*gt()),$.isLineSegments?Dt.setMode(k.LINES):$.isLineLoop?Dt.setMode(k.LINE_LOOP):Dt.setMode(k.LINE_STRIP)}else $.isPoints?Dt.setMode(k.POINTS):$.isSprite&&Dt.setMode(k.TRIANGLES);if($.isBatchedMesh)if(ht.get("WEBGL_multi_draw"))Dt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Sn=$._multiDrawStarts,He=$._multiDrawCounts,Ln=$._multiDrawCount,At=Ce?w.get(Ce).bytesPerElement:1,Os=qe.get(Z).currentProgram.getUniforms();for(let En=0;En<Ln;En++)Os.setValue(k,"_gl_DrawID",En),Dt.render(Sn[En]/At,He[En])}else if($.isInstancedMesh)Dt.renderInstances(ke,sn,$.count);else if(j.isInstancedBufferGeometry){let Sn=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,He=Math.min(j.instanceCount,Sn);Dt.renderInstances(ke,sn,He)}else Dt.render(ke,sn)};function bd(T,B,j,Z){z!==null&&T.isNodeMaterial&&z.setObject(Z,T),ce===!0&&te.setState(T,j,!1),T.transparent===!0&&T.side===Wt&&T.forceSinglePass===!1?(T.side=On,T.needsUpdate=!0,wa(T,B,Z),T.side=ri,T.needsUpdate=!0,wa(T,B,Z),T.side=Wt):wa(T,B,Z)}this.compile=function(T,B,j=null){j===null&&(j=T),z!==null&&z.renderStart(T,B,j),S=ee.get(j),S.init(B),E.push(S),j.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),T!==j&&T.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),S.setupLights(),z!==null&&z.updateLights(S.state.lightsArray),Re=this.localClippingEnabled,ce=te.init(this.clippingPlanes,Re),ce===!0&&te.setGlobalState(this.clippingPlanes,B),z!==null&&ge.render(S.state.shadowsArray,j,B);let Z=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let we=$.material;if(we)if(Array.isArray(we))for(let Oe=0;Oe<we.length;Oe++){let Ee=we[Oe];bd(Ee,j,B,$),Z.add(Ee)}else bd(we,j,B,$),Z.add(we)}),S=E.pop(),z!==null&&z.renderEnd(),Z},this.compileAsync=function(T,B,j=null){let Z=this.compile(T,B,j);return new Promise($=>{function we(){if(Z.forEach(function(Oe){let Ce=qe.get(Oe).currentProgram;(Ce===void 0||Ce.isReady())&&Z.delete(Oe)}),Z.size===0){$(T);return}setTimeout(we,10)}ht.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let gh=null;function Dg(T){gh&&gh(T)}function Sd(){Fs.stop()}function Ed(){Fs.start()}let Fs=new tm;Fs.setAnimationLoop(Dg),typeof self<"u"&&Fs.setContext(self),this.setAnimationLoop=function(T){gh=T,fe.setAnimationLoop(T),T===null?Fs.stop():Fs.start()},fe.addEventListener("sessionstart",Sd),fe.addEventListener("sessionend",Ed),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;z!==null&&z.renderStart(T,B);let j=fe.enabled===!0&&fe.isPresenting===!0,Z=A!==null&&(q===null||j)&&A.begin(R,q);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(B),B=fe.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,B,q),S=ee.get(T,E.length),S.init(B),S.state.textureUnits=Ke.getTextureUnits(),E.push(S),_e.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?ue.setFromArrayCamera(B):se.setFromProjectionMatrix(_e,si,B.reversedDepth),Re=this.localClippingEnabled,ce=te.init(this.clippingPlanes,Re),b=Me.get(T,y.length),b.init(),y.push(b),this.info.render.frame++,fe.enabled===!0&&fe.isPresenting===!0){let Oe=R.xr.getDepthSensingMesh();Oe!==null&&xh(Oe,B,-1/0,R.sortObjects)}xh(T,B,0,R.sortObjects),b.finish(),z!==null&&z.updateLights(S.state.lightsArray),R.sortObjects===!0&&b.sort(Be,nt),rt=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,rt&&O.addToRenderList(b,T),this.info.autoReset===!0&&this.info.reset(),ce===!0&&te.beginShadows();let $=S.state.shadowsArray;if(ge.render($,T,B),ce===!0&&te.endShadows(),(Z&&A.hasRenderPass())===!1){let Oe=b.opaque,Ee=b.transmissive;if(S.setupLights(),B.isArrayCamera){let Ce=B.cameras;if(Ee.length>0)for(let Ge=0,it=Ce.length;Ge<it;Ge++){let xt=Ce[Ge];Td(Oe,Ee,T,xt)}rt&&O.render(T);for(let Ge=0,it=Ce.length;Ge<it;Ge++){let xt=Ce[Ge];wd(b,T,xt,xt.viewport)}}else Ee.length>0&&Td(Oe,Ee,T,B),rt&&O.render(T),wd(b,T,B)}q!==null&&P===0&&(Ke.updateMultisampleRenderTarget(q),Ke.updateRenderTargetMipmap(q)),Z&&A.end(R),T.isScene===!0&&T.onAfterRender(R,T,B),xe.resetDefaultState(),I=-1,J=null,E.pop(),E.length>0?(S=E[E.length-1],Ke.setTextureUnits(S.state.textureUnits),ce===!0&&te.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,y.pop(),y.length>0?b=y[y.length-1]:b=null,z!==null&&z.renderEnd()};function xh(T,B,j,Z){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)S.pushLight(T),T.castShadow&&S.pushShadow(T);else if(T.isSprite){let Oe=B.isArrayCamera?ue:se;if(!T.frustumCulled||T.intersectsFrustum(Oe)){Z&&ze.setFromMatrixPosition(T.matrixWorld).applyMatrix4(_e);let Ee=oe.update(T),Ce=T.material;Ce.visible&&b.push(T,Ee,Ce,j,ze.z,null,B)}}else if(T.isMesh||T.isLine||T.isPoints){let Oe=B.isArrayCamera?ue:se;if(!T.frustumCulled||T.intersectsFrustum(Oe)){let Ee=oe.update(T),Ce=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ze.copy(T.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ze.copy(Ee.boundingSphere.center)),ze.applyMatrix4(T.matrixWorld).applyMatrix4(_e)),Array.isArray(Ce)){let Ge=Ee.groups;for(let it=0,xt=Ge.length;it<xt;it++){let ke=Ge[it],vt=Ce[ke.materialIndex];vt&&vt.visible&&b.push(T,Ee,vt,j,ze.z,ke,B)}}else Ce.visible&&b.push(T,Ee,Ce,j,ze.z,null,B)}}}let we=T.children;for(let Oe=0,Ee=we.length;Oe<Ee;Oe++)xh(we[Oe],B,j,Z)}function wd(T,B,j,Z){let{opaque:$,transmissive:we,transparent:Oe}=T;S.setupLightsView(j),ce===!0&&te.setGlobalState(R.clippingPlanes,j),Z&&ve.viewport(W.copy(Z)),$.length>0&&qo($,B,j),we.length>0&&qo(we,B,j),Oe.length>0&&qo(Oe,B,j),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Td(T,B,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[Z.id]===void 0){let ke=ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[Z.id]=new Kn(1,1,{generateMipmaps:!0,type:ke?gi:Xn,minFilter:Wn,samples:Math.max(4,St.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ut.workingColorSpace})}let we=S.state.transmissionRenderTarget[Z.id],Oe=Z.viewport||W;we.setSize(Oe.z*R.transmissionResolutionScale,Oe.w*R.transmissionResolutionScale);let Ee=R.getRenderTarget(),Ce=R.getActiveCubeFace(),Ge=R.getActiveMipmapLevel();R.setRenderTarget(we),R.getClearColor(D),Q=R.getClearAlpha(),Q<1&&R.setClearColor(16777215,.5),R.clear(),rt&&O.render(j);let it=R.toneMapping;R.toneMapping=Ri;let xt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),S.setupLightsView(Z),ce===!0&&te.setGlobalState(R.clippingPlanes,Z),qo(T,j,Z),Ke.updateMultisampleRenderTarget(we),Ke.updateRenderTargetMipmap(we),ht.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let vt=0,sn=B.length;vt<sn;vt++){let Bt=B[vt],{object:Dt,geometry:Sn,material:He,group:Ln}=Bt;if(He.side===Wt&&Dt.layers.test(Z.layers)){let At=He.side;He.side=On,He.needsUpdate=!0,Ad(Dt,j,Z,Sn,He,Ln),He.side=At,He.needsUpdate=!0,ke=!0}}ke===!0&&(Ke.updateMultisampleRenderTarget(we),Ke.updateRenderTargetMipmap(we))}R.setRenderTarget(Ee,Ce,Ge),R.setClearColor(D,Q),xt!==void 0&&(Z.viewport=xt),R.toneMapping=it}function qo(T,B,j){let Z=B.isScene===!0?B.overrideMaterial:null;for(let $=0,we=T.length;$<we;$++){let Oe=T[$],{object:Ee,geometry:Ce,group:Ge}=Oe,it=Oe.material;it.allowOverride===!0&&Z!==null&&(it=Z),Ee.layers.test(j.layers)&&Ad(Ee,B,j,Ce,it,Ge)}}function Ad(T,B,j,Z,$,we){z!==null&&$.isNodeMaterial&&z.setObject(T,$),T.onBeforeRender(R,B,j,Z,$,we),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(R,B,j,Z,T,we),$.transparent===!0&&$.side===Wt&&$.forceSinglePass===!1?($.side=On,$.needsUpdate=!0,R.renderBufferDirect(j,B,Z,$,T,we),$.side=ri,$.needsUpdate=!0,R.renderBufferDirect(j,B,Z,$,T,we),$.side=Wt):R.renderBufferDirect(j,B,Z,$,T,we),T.onAfterRender(R,B,j,Z,$,we)}function Rd(T){let B=0;for(let j of T)j.texture!==null&&B++;return B}function wa(T,B,j){B.isScene!==!0&&(B=st);let Z=qe.get(T),$=S.state.lights,we=S.state.shadowsArray,Oe=$.state.version,Ee=re.getParameters(T,$.state,we,B,j,S.state.lightProbeGridArray),Ce=re.getProgramCacheKey(Ee),Ge=Z.programs;Z.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?B.environment:null,Z.fog=B.fog;let it=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;Z.envMap=C.get(T.envMap||Z.environment,it),Z.envMapRotation=Z.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Ge===void 0&&(T.addEventListener("dispose",Tt),Ge=new Map,Z.programs=Ge,Z.programVariants=new Map);let xt=Ge.get(Ce);if(xt!==void 0){if(Z.currentProgram===xt&&Z.lightsStateVersion===Oe)return Pd(T,Ee),xt}else Ee.uniforms=re.getUniforms(T),z!==null&&T.isNodeMaterial&&z.build(T,j,Ee),T.onBeforeCompile(Ee,R),xt=re.acquireProgram(Ee,Ce),Ge.set(Ce,xt),Z.uniforms=Ee.uniforms;let ke=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(ke.clippingPlanes=te.uniform),Pd(T,Ee),Z.needsLights=Bg(T),Z.lightsStateVersion=Oe,Z.needsLights&&(ke.ambientLightColor.value=$.state.ambient,ke.lightProbe.value=$.state.probe,ke.sunLights.value=$.state.sun,ke.sunLightShadows.value=$.state.sunShadow,ke.directionalLights.value=$.state.directional,ke.directionalLightShadows.value=$.state.directionalShadow,ke.spotLights.value=$.state.spot,ke.spotLightShadows.value=$.state.spotShadow,ke.rectAreaLights.value=$.state.rectArea,ke.ltc_1.value=$.state.rectAreaLTC1,ke.ltc_2.value=$.state.rectAreaLTC2,ke.pointLights.value=$.state.point,ke.pointLightShadows.value=$.state.pointShadow,ke.hemisphereLights.value=$.state.hemi,ke.sunShadowMatrix.value=$.state.sunShadowMatrix,ke.sunShadowCascade.value=$.state.sunShadowCascade,ke.directionalShadowMatrix.value=$.state.directionalShadowMatrix,ke.spotLightMatrix.value=$.state.spotLightMatrix,ke.spotLightMap.value=$.state.spotLightMap,ke.pointShadowMatrix.value=$.state.pointShadowMatrix),Z.numLightProbeGrids=Rd(S.state.lightProbeGridArray),Z.currentProgram=xt,Z.uniformsList=null,xt}function Ug(T,B,j,Z,$){let we=qe.get(T),Oe=we.currentProgram.id+","+Z+","+$,Ee=we.programVariants.get(Oe);return Ee===void 0?(Ee=wa(T,B,j),we.programVariants.set(Oe,Ee)):(we.currentProgram=Ee,we.uniformsList=null,we.outputColorSpace=Z,we.toneMapping=$),Ee}function Cd(T){if(T.uniformsList===null){let B=T.currentProgram.getUniforms();T.uniformsList=fa.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function Pd(T,B){let j=qe.get(T);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function Fg(T,B,j,Z,$){B.isScene!==!0&&(B=st),Ke.resetTextureUnits();let we=B.fog,Oe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?B.environment:null,Ee=q===null?R.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:ut.workingColorSpace,Ce=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Ge=C.get(Z.envMap||Oe,Ce),it=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,xt=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),ke=!!j.morphAttributes.position,vt=!!j.morphAttributes.normal,sn=!!j.morphAttributes.color,Bt=Ri;Z.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Bt=R.toneMapping);let Dt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Sn=Dt!==void 0?Dt.length:0,He=qe.get(Z),Ln=S.state.lights;if(ce===!0&&(Re===!0||T!==J)){let qt=T===J&&Z.id===I;te.setState(Z,T,qt)}let At=!1,Os=!1;Z.version===He.__version?He.needsLights&&He.lightsStateVersion!==Ln.state.version||$.isBatchedMesh&&He.batching===!1||!$.isBatchedMesh&&He.batching===!0||$.isBatchedMesh&&He.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&He.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&He.instancing===!1||!$.isInstancedMesh&&He.instancing===!0||$.isSkinnedMesh&&He.skinning===!1||!$.isSkinnedMesh&&He.skinning===!0||$.isInstancedMesh&&He.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&He.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&He.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&He.instancingMorph===!1&&$.morphTexture!==null||He.envMap!==Ge||Z.fog===!0&&He.fog!==we||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==te.numPlanes||He.numIntersection!==te.numIntersection)||He.vertexAlphas!==it||He.vertexTangents!==xt||He.morphTargets!==ke||He.morphNormals!==vt||He.morphColors!==sn||He.morphTargetsCount!==Sn||He.numLightProbeGrids!==Rd(S.state.lightProbeGridArray)?At=!0:(He.outputColorSpace!==Ee||He.toneMapping!==Bt)&&(Os=!0):(At=!0,He.__version=Z.version);let En=He.currentProgram;(At===!0||Os===!0)&&(En=Os===!0?Ug(Z,B,$,Ee,Bt):wa(Z,B,$),z&&Z.isNodeMaterial&&z.onUpdateProgram(Z,En,He));let Yo=!1,fs=!1,Bs=!1,bt=En.getUniforms(),_n=He.uniforms;if(ve.useProgram(En.program)&&(Yo=!0,fs=!0,Bs=!0),Z.id!==I&&(I=Z.id,fs=!0),Yo||J!==T){ve.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),bt.setValue(k,"projectionMatrix",T.projectionMatrix),bt.setValue(k,"viewMatrix",T.matrixWorldInverse);let gn=bt.map.cameraPosition;gn!==void 0&&gn.setValue(k,Ze.setFromMatrixPosition(T.matrixWorld)),St.logarithmicDepthBuffer&&bt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&bt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),J!==T&&(J=T,fs=!0,Bs=!0)}if(He.needsLights&&(Ln.state.sunShadowMap.length>0&&bt.setValue(k,"sunShadowMap",Ln.state.sunShadowMap,Ke),Ln.state.directionalShadowMap.length>0&&bt.setValue(k,"directionalShadowMap",Ln.state.directionalShadowMap,Ke),Ln.state.spotShadowMap.length>0&&bt.setValue(k,"spotShadowMap",Ln.state.spotShadowMap,Ke),Ln.state.pointShadowMap.length>0&&bt.setValue(k,"pointShadowMap",Ln.state.pointShadowMap,Ke)),$.isSkinnedMesh){bt.setOptional(k,$,"bindMatrix"),bt.setOptional(k,$,"bindMatrixInverse");let qt=$.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),bt.setValue(k,"boneTexture",qt.boneTexture,Ke))}$.isBatchedMesh&&(bt.setOptional(k,$,"batchingTexture"),bt.setValue(k,"batchingTexture",$._matricesTexture,Ke),bt.setOptional(k,$,"batchingIdTexture"),bt.setValue(k,"batchingIdTexture",$._indirectTexture,Ke),bt.setOptional(k,$,"batchingColorTexture"),$._colorsTexture!==null&&bt.setValue(k,"batchingColorTexture",$._colorsTexture,Ke));let ci=j.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&ie.update($,j,En),(fs||He.receiveShadow!==$.receiveShadow)&&(He.receiveShadow=$.receiveShadow,bt.setValue(k,"receiveShadow",$.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&B.environment!==null&&(_n.envMapIntensity.value=B.environmentIntensity),_n.dfgLUT!==void 0&&(_n.dfgLUT.value=ob()),fs){if(bt.setValue(k,"toneMappingExposure",R.toneMappingExposure),He.needsLights&&Og(_n,Bs),we&&Z.fog===!0&&me.refreshFogUniforms(_n,we),me.refreshMaterialUniforms(_n,Z,ye,Ie,S.state.transmissionRenderTarget[T.id]),He.needsLights&&He.numLightProbeGrids>0){let qt=_,gn=0;for(let Fi of S.state.lightProbeGridArray)Fi.texture!==null&&(qt.textures[gn]=Fi.texture,qt.min[gn]=Fi.boundingBox.min,qt.max[gn]=Fi.boundingBox.max,qt.resolution[gn]=Fi.resolution,gn++);for(let Fi in qt)qt[Fi].length=gn;_n.probesSH.value=qt.textures,_n.probesMin.value=qt.min,_n.probesMax.value=qt.max,_n.probesResolution.value=qt.resolution}fa.upload(k,Cd(He),_n,Ke)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(fa.upload(k,Cd(He),_n,Ke),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&bt.setValue(k,"center",$.center),bt.setValue(k,"modelViewMatrix",$.modelViewMatrix),bt.setValue(k,"normalMatrix",$.normalMatrix),bt.setValue(k,"modelMatrix",$.matrixWorld),Z.uniformsGroups!==void 0){let qt=Z.uniformsGroups;for(let gn=0,Fi=qt.length;gn<Fi;gn++){let Ld=qt[gn];Ue.update(Ld,En),Ue.bind(Ld,En)}}return En}function Og(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.sunLights.needsUpdate=B,T.sunLightShadows.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Bg(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(T,B,j){let Z=qe.get(T);Z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),qe.get(T.texture).__webglTexture=B,qe.get(T.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:j,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,B){let j=qe.get(T);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,j=0){q=T,H=B,P=j;let Z=null,$=!1,we=!1;if(T){let Ee=qe.get(T);if(Ee.__useDefaultFramebuffer!==void 0){ve.bindFramebuffer(k.FRAMEBUFFER,Ee.__webglFramebuffer),W.copy(T.viewport),F.copy(T.scissor),G=T.scissorTest,ve.viewport(W),ve.scissor(F),ve.setScissorTest(G),I=-1;return}else if(Ee.__webglFramebuffer===void 0)Ke.setupRenderTarget(T);else if(Ee.__hasExternalTextures)Ke.rebindTextures(T,qe.get(T.texture).__webglTexture,qe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let it=T.depthTexture;if(Ee.__boundDepthTexture!==it){if(it!==null&&qe.has(it)&&(T.width!==it.image.width||T.height!==it.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ke.setupDepthRenderbuffer(T)}}let Ce=T.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(we=!0);let Ge=qe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[B])?Z=Ge[B][j]:Z=Ge[B],$=!0):T.samples>0&&Ke.useMultisampledRTT(T)===!1?Z=qe.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?Z=Ge[j]:Z=Ge,W.copy(T.viewport),F.copy(T.scissor),G=T.scissorTest}else W.copy(Fe).multiplyScalar(ye).floor(),F.copy(je).multiplyScalar(ye).floor(),G=et;if(j!==0&&(Z=X),ve.bindFramebuffer(k.FRAMEBUFFER,Z)&&ve.drawBuffers(T,Z),ve.viewport(W),ve.scissor(F),ve.setScissorTest(G),$){let Ee=qe.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ee.__webglTexture,j)}else if(we){let Ee=B;for(let Ce=0;Ce<T.textures.length;Ce++){let Ge=qe.get(T.textures[Ce]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ce,Ge.__webglTexture,j,Ee)}}else if(T!==null&&j!==0){let Ee=qe.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ee.__webglTexture,j)}I=-1};function Id(T){let B=qe.get(T);return(B.__readFormat!==T.format||B.__readType!==T.type)&&(B.__readFormat=T.format,B.__readType=T.type,B.__formatReadable=St.textureFormatReadable(T.format),B.__typeReadable=St.textureTypeReadable(T.type)),B}this.readRenderTargetPixels=function(T,B,j,Z,$,we,Oe,Ee=0){if(!(T&&T.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ce=Ce[Oe],Array.isArray(Ce)&&(Ce=Ce[0])),Ce){ve.bindFramebuffer(k.FRAMEBUFFER,Ce);try{let Ge=T.textures[Ee],it=Ge.format,xt=Ge.type;T.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ee);let ke=Id(Ge);if(ke.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ke.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-Z&&j>=0&&j<=T.height-$&&k.readPixels(B,j,Z,$,pe.convert(it),pe.convert(xt),we)}finally{let Ge=q!==null?qe.get(q).__webglFramebuffer:null;ve.bindFramebuffer(k.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(T,B,j,Z,$,we,Oe,Ee=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ce=Ce[Oe],Array.isArray(Ce)&&(Ce=Ce[0])),Ce)if(B>=0&&B<=T.width-Z&&j>=0&&j<=T.height-$){ve.bindFramebuffer(k.FRAMEBUFFER,Ce);let Ge=T.textures[Ee],it=Ge.format,xt=Ge.type;T.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ee);let ke=Id(Ge);if(ke.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ke.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let vt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,vt),k.bufferData(k.PIXEL_PACK_BUFFER,we.byteLength,k.STREAM_READ),k.readPixels(B,j,Z,$,pe.convert(it),pe.convert(xt),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let sn=q!==null?qe.get(q).__webglFramebuffer:null;ve.bindFramebuffer(k.FRAMEBUFFER,sn);let Bt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await E0(k,Bt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,vt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,we),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(vt),k.deleteSync(Bt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,B=null,j=0){let Z=Math.pow(2,-j),$=Math.floor(T.image.width*Z),we=Math.floor(T.image.height*Z),Oe=B!==null?B.x:0,Ee=B!==null?B.y:0;Ke.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,j,0,0,Oe,Ee,$,we),ve.unbindTexture()},this.copyTextureToTexture=function(T,B,j=null,Z=null,$=0,we=0){let Oe,Ee,Ce,Ge,it,xt,ke,vt,sn,Bt=T.isCompressedTexture?T.mipmaps[we]:T.image;if(j!==null)Oe=j.max.x-j.min.x,Ee=j.max.y-j.min.y,Ce=j.isBox3?j.max.z-j.min.z:1,Ge=j.min.x,it=j.min.y,xt=j.isBox3?j.min.z:0;else{let bt=Math.pow(2,-$);Oe=Math.floor(Bt.width*bt),Ee=Math.floor(Bt.height*bt),T.isDataArrayTexture?Ce=Bt.depth:T.isData3DTexture?Ce=Math.floor(Bt.depth*bt):Ce=1,Ge=0,it=0,xt=0}Z!==null?(ke=Z.x,vt=Z.y,sn=Z.z):(ke=0,vt=0,sn=0);let Dt=pe.convert(B.format),Sn=pe.convert(B.type),He;B.isData3DTexture?(Ke.setTexture3D(B,0),He=k.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Ke.setTexture2DArray(B,0),He=k.TEXTURE_2D_ARRAY):(Ke.setTexture2D(B,0),He=k.TEXTURE_2D),ve.activeTexture(k.TEXTURE0),ve.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),ve.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),ve.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment);let Ln=ve.getParameter(k.UNPACK_ROW_LENGTH),At=ve.getParameter(k.UNPACK_IMAGE_HEIGHT),Os=ve.getParameter(k.UNPACK_SKIP_PIXELS),En=ve.getParameter(k.UNPACK_SKIP_ROWS),Yo=ve.getParameter(k.UNPACK_SKIP_IMAGES);ve.pixelStorei(k.UNPACK_ROW_LENGTH,Bt.width),ve.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Bt.height),ve.pixelStorei(k.UNPACK_SKIP_PIXELS,Ge),ve.pixelStorei(k.UNPACK_SKIP_ROWS,it),ve.pixelStorei(k.UNPACK_SKIP_IMAGES,xt);let fs=T.isDataArrayTexture||T.isData3DTexture,Bs=B.isDataArrayTexture||B.isData3DTexture;if(T.isDepthTexture){let bt=qe.get(T),_n=qe.get(B),ci=qe.get(bt.__renderTarget),qt=qe.get(_n.__renderTarget);ve.bindFramebuffer(k.READ_FRAMEBUFFER,ci.__webglFramebuffer),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,qt.__webglFramebuffer);for(let gn=0;gn<Ce;gn++)fs&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,qe.get(T).__webglTexture,$,xt+gn),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,qe.get(B).__webglTexture,we,sn+gn)),k.blitFramebuffer(Ge,it,Ge+Oe,it+Ee,ke,vt,ke+Oe,vt+Ee,k.DEPTH_BUFFER_BIT,k.NEAREST);ve.bindFramebuffer(k.READ_FRAMEBUFFER,null),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||qe.has(T)){let bt=qe.get(T),_n=qe.get(B);ve.bindFramebuffer(k.READ_FRAMEBUFFER,U),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,V);for(let ci=0;ci<Ce;ci++)fs?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,bt.__webglTexture,$,xt+ci):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,bt.__webglTexture,$),Bs?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,_n.__webglTexture,we,sn+ci):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,_n.__webglTexture,we),$!==0?k.blitFramebuffer(Ge,it,Ge+Oe,it+Ee,ke,vt,ke+Oe,vt+Ee,k.COLOR_BUFFER_BIT,k.NEAREST):Bs?k.copyTexSubImage3D(He,we,ke,vt,sn+ci,Ge,it,Oe,Ee):k.copyTexSubImage2D(He,we,ke,vt,Ge,it,Oe,Ee);ve.bindFramebuffer(k.READ_FRAMEBUFFER,null),ve.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Bs?T.isDataTexture||T.isData3DTexture?k.texSubImage3D(He,we,ke,vt,sn,Oe,Ee,Ce,Dt,Sn,Bt.data):B.isCompressedArrayTexture?k.compressedTexSubImage3D(He,we,ke,vt,sn,Oe,Ee,Ce,Dt,Bt.data):k.texSubImage3D(He,we,ke,vt,sn,Oe,Ee,Ce,Dt,Sn,Bt):T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,we,ke,vt,Oe,Ee,Dt,Sn,Bt.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,we,ke,vt,Bt.width,Bt.height,Dt,Bt.data):k.texSubImage2D(k.TEXTURE_2D,we,ke,vt,Oe,Ee,Dt,Sn,Bt);ve.pixelStorei(k.UNPACK_ROW_LENGTH,Ln),ve.pixelStorei(k.UNPACK_IMAGE_HEIGHT,At),ve.pixelStorei(k.UNPACK_SKIP_PIXELS,Os),ve.pixelStorei(k.UNPACK_SKIP_ROWS,En),ve.pixelStorei(k.UNPACK_SKIP_IMAGES,Yo),we===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&k.generateMipmap(He),ve.unbindTexture()},this.initRenderTarget=function(T){qe.get(T).__webglFramebuffer===void 0&&Ke.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ke.setTextureCube(T,0):T.isData3DTexture?Ke.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ke.setTexture2DArray(T,0):Ke.setTexture2D(T,0),ve.unbindTexture()},this.resetState=function(){H=0,P=0,q=null,ve.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var mf=["diver","warden","drill","kestrel","engine"];function fm(){let s=new is,e=new Map,t=new Map;function n(i){if(!mf.includes(i)||e.has(i))return Promise.resolve(!0);if(!t.has(i)){let r="./art/"+i+"-skin.webp",a=s.loadAsync(r).catch(()=>s.loadAsync(r)).then(o=>(o.colorSpace=yt,e.set(i,o),!0)).catch(()=>!1).finally(()=>t.delete(i));t.set(i,a)}return t.get(i)}return{get:i=>e.get(i),prepare:n}}function dm(s,e,t,n){let i=t.clone(),r=[];s.updateMatrixWorld(!0);let a=s.matrixWorld.clone().invert(),o=new We,c=new N,l=.52,h=Math.cos(l),d=Math.sin(l),f=1/0,u=-1/0,p=1/0,x=-1/0;s.traverse(_=>{if(!_.isMesh||_.material!==t)return;let b=_.geometry,S=b.getAttribute("position"),y=b.getAttribute("normal"),E=new Float32Array(S.count*3);o.multiplyMatrices(a,_.matrixWorld);let A=new $e().getNormalMatrix(o);for(let R=0;R<S.count;R++){c.fromBufferAttribute(S,R).applyMatrix4(o);let L=c.y*h-c.z*d;f=Math.min(f,c.x),u=Math.max(u,c.x),p=Math.min(p,L),x=Math.max(x,L),E[3*R]=c.x,E[3*R+1]=L,c.fromBufferAttribute(y,R).applyMatrix3(A).normalize(),E[3*R+2]=Pe.smoothstep(c.y*d+c.z*h,-.34,.35)}r.push([b,E,_])});for(let[_,b,S]of r){for(let y=0;y<b.length;y+=3)b[y]=.014+.972*(b[y]-f)/(u-f),b[y+1]=.015+.97*(b[y+1]-p)/(x-p);_.setAttribute("portraitUv",new Ft(b,3)),S.material=i}let g={diver:[49,7775390],warden:[39,12360288],drill:[82,11772892],kestrel:[63,9025223],engine:[61,10586738]},[m,v]=g[n];i.shininess=m,i.specular.setHex(v);let M={value:0};return i.onBeforeCompile=_=>{_.uniforms.paintedSurface={value:e},_.uniforms.creatureImpact=M,_.uniforms.creatureFinish={value:mf.indexOf(n)},_.vertexShader=_.vertexShader.replace("#include <common>",`#include <common>
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
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(1.,.75,.46),.36*creatureImpact);`)},M}var lb=`
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
  }`,cb={captain:[[.43,.77,.31,.24,.99],[.44,.48,.34,.2,.83],[.16,.49,.16,.19,.65],[.8,.49,.18,.22,.71],[.84,.76,.13,.34,.92],[.43,.17,.18,.23,.74],[.65,.2,.14,.22,.69]],infantry:[[.5,.76,.38,.24,.98],[.5,.47,.28,.22,.85],[.19,.47,.15,.2,.6],[.82,.46,.14,.2,.62],[.37,.2,.19,.23,.69],[.66,.2,.17,.22,.65],[.46,.09,.17,.1,.76]],diver:[[.5,.64,.29,.27,1],[.2,.29,.17,.2,.82],[.82,.28,.17,.2,.82],[.5,.49,.15,.13,.62]],warden:[[.5,.7,.36,.32,1.04],[.53,.42,.22,.19,.75],[.64,.44,.12,.19,.98],[.24,.18,.15,.22,.59],[.76,.18,.14,.21,.59]],drill:[[.36,.47,.26,.27,1.02],[.68,.27,.25,.21,.72],[.7,.8,.25,.16,.65]],kestrel:[[.51,.48,.15,.27,.95],[.5,.34,.12,.13,.82],[.3,.18,.15,.17,.5],[.71,.26,.14,.13,.52]],engine:[[.5,.6,.3,.32,.95],[.5,.37,.18,.19,.83],[.31,.82,.14,.18,.65],[.69,.82,.14,.18,.65]]};function th(s,e,t,n){let i=s==="infantry"||s==="captain",r=s==="captain"?44:i?22:80,o=Math.max(i?30:54,Math.round(r*e.image.height/e.image.width)),c=document.createElement("canvas");c.width=r+1,c.height=o+1;let l=c.getContext("2d",{willReadFrequently:!0});l.drawImage(e.image,0,0,r+1,o+1);let h=l.getImageData(0,0,r+1,o+1).data,d=(r+1)*(o+1),f=new Float32Array(d);for(let S=0;S<d;S++)f[S]=h[S*4+3]>88?1e3:0;for(let S=1;S<o;S++)for(let y=1;y<r;y++){let E=S*(r+1)+y;f[E]=Math.min(f[E],f[E-1]+1,f[E-r-1]+1,f[E-r-2]+1.414)}for(let S=o-1;S>0;S--)for(let y=r-1;y>0;y--){let E=S*(r+1)+y;f[E]=Math.min(f[E],f[E+1]+1,f[E+r+1]+1,f[E+r+2]+1.414)}let u=[],p=[],x=[],g=[],m=new Uint8Array(r*o),v=i?.43:.64,M=Math.cos(v),_=Math.sin(v);for(let S of[!0,!1])for(let y=0;y<=o;y++)for(let E=0;E<=r;E++){let A=y*(r+1)+E,R=E/r,L=1-y/o,z=0;for(let[I,J,W,F,G]of cb[s])z=Math.max(z,G*Math.exp(-1.6*(((R-I)/W)**2+((L-J)/F)**2)));let X=Math.min(1,f[A]/(r*.11)),U=i?Pe.smoothstep(X,0,1)*Pe.smoothstep(h[A*4+3],65,215):Math.pow(X,.6),V=(.28*h[A*4]+.55*h[A*4+1]+.17*h[A*4+2])/255,H=(.023+U*((s==="kestrel"?.085:.2)+z*.86))*Math.min(1.26,t/3),P=S?H*(.87+V*.13):-(i?.67:.99)*H,q=L*n;u.push((R-.5)*t,q*M+P*_+.025,(i?.09:.46)-q*_+P*M),p.push(R,L),g.push(S?1:0)}for(let S=0;S<o;S++)for(let y=0;y<r;y++){let E=S*(r+1)+y;m[S*r+y]=[E,E+1,E+r+1,E+r+2].some(A=>h[A*4+3]>80)?1:0}for(let S=0;S<o;S++)for(let y=0;y<r;y++){if(!m[S*r+y])continue;let E=S*(r+1)+y,A=E+1,R=E+r+1,L=R+1;x.push(E,R,A,A,R,L,E+d,A+d,R+d,A+d,L+d,R+d);let z=(X,U)=>x.push(X,U,X+d,U,U+d,X+d);(!y||!m[S*r+y-1])&&z(R,E),(y===r-1||!m[S*r+y+1])&&z(A,L),(!S||!m[(S-1)*r+y])&&z(E,A),(S===o-1||!m[(S+1)*r+y])&&z(L,R)}let b=new _t;return b.setAttribute("position",new Xe(u,3)),b.setAttribute("uv",new Xe(p,2)),b.setAttribute("surface",new Xe(g,1)),b.setIndex(x),b.computeVertexNormals(),b}function pm(s,e){let t={diver:4.12,warden:2.9,drill:3.15,kestrel:4.43,engine:4.08}[s],n=t*e.image.height/e.image.width,i=th(s,e,t,n),r=new zt({side:Wt,alphaToCoverage:!0,uniforms:{paint:{value:e},motion:{value:new mt},kind:{value:mf.indexOf(s)},fall:{value:0},bodyWidth:{value:t},bodyHeight:{value:n},hit:{value:0}},vertexShader:lb.replace("varying vec2 tex;","attribute float surface;varying float cap;varying vec3 ns;varying vec2 tex;").replace("tex=uv;","tex=uv;cap=surface;ns=normalize(normalMatrix*normal);").replace("gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);",`
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
     }`}),a=new Qe(i,r);return a.frustumCulled=!1,{mesh:a,pose(o){r.uniforms.motion.value.set(s==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),r.uniforms.fall.value=o.down,r.uniforms.hit.value=o.hit}}}var Uo=new N;function oi(s,e,t,n,i,r){let a=2*Math.PI*i/4,o=Math.max(r-2*i,0),c=Math.PI/4;Uo.copy(e),Uo[n]=0,Uo.normalize();let l=.5*a/(a+o),h=1-Uo.angleTo(s)/c;return Math.sign(Uo[t])===1?h*l:o/(a+o)+l+l*(1-h)}var nh=class s extends Un{constructor(e=1,t=1,n=1,i=2,r=.1){let a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new N,l=new N,h=new N(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,f=this.attributes.normal.array,u=this.attributes.uv.array,p=d.length/6,x=new N,g=.5/a;for(let m=0,v=0;m<d.length;m+=3,v+=2)switch(c.fromArray(d,m),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[m+0]=h.x*Math.sign(c.x)+l.x*r,d[m+1]=h.y*Math.sign(c.y)+l.y*r,d[m+2]=h.z*Math.sign(c.z)+l.z*r,f[m+0]=l.x,f[m+1]=l.y,f[m+2]=l.z,Math.floor(m/p)){case 0:x.set(1,0,0),u[v+0]=oi(x,l,"z","y",r,n),u[v+1]=1-oi(x,l,"y","z",r,t);break;case 1:x.set(-1,0,0),u[v+0]=1-oi(x,l,"z","y",r,n),u[v+1]=1-oi(x,l,"y","z",r,t);break;case 2:x.set(0,1,0),u[v+0]=1-oi(x,l,"x","z",r,e),u[v+1]=oi(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),u[v+0]=1-oi(x,l,"x","z",r,e),u[v+1]=1-oi(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),u[v+0]=1-oi(x,l,"x","y",r,e),u[v+1]=1-oi(x,l,"y","x",r,t);break;case 5:x.set(0,0,-1),u[v+0]=oi(x,l,"x","y",r,e),u[v+1]=1-oi(x,l,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};function Fo(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,c=new _t;c.morphTargetsRelative=o;let l=0;for(let h=0;h<s.length;++h){let d=s[h],f=0,u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(d.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(d.morphAttributes[p].length!==s[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(d.morphAttributes[p]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(t){let h=0,d=[];for(let f=0;f<s.length;++f){let u=s[f].index;for(let p=0;p<u.count;++p)d.push(u.getX(p)+h);h+=s[f].attributes.position.count}c.setIndex(d)}for(let h in r){let d=mm(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<d;++f){let u=[];for(let x=0;x<a[h].length;++x)u.push(a[h][x][f]);let p=mm(u);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function mm(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Ft(a,t,n),c=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute){let d=c/t;for(let f=0,u=h.count;f<u;f++)for(let p=0;p<t;p++){let x=h.getComponent(f,p);o.setComponent(f+d,p,x)}}else a.set(h.array,c);c+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function gf(s,e){if(e===Bu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ha||e===Po){let t=s.getIndex();if(t===null){let r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ha)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function pn(s,e,t,n=0){return n?new nh(s,e,t,1,n):new Un(s,e,t)}function tt(s,e,t,n,i,r=null){let a=s.index?s.toNonIndexed():s;a!==s&&s.dispose(),a.deleteAttribute("uv"),r&&a.applyQuaternion(new en().setFromEuler(r)),a.translate(t,n,i);let o=new Se(e),c=a.getAttribute("position").count,l=new Float32Array(c*3);for(let h=0;h<l.length;h+=3)o.toArray(l,h);return a.setAttribute("color",new Ft(l,3)),a}function Pn(s){let e=Fo(s,!1);for(let t of s)t.dispose();return e}function yn(s,e,t,n,i=8){let r=new N(...s),a=new N(...e),o=a.clone().sub(r),c=new tn(t,t,o.length(),i);c.applyQuaternion(new en().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.lerp(a,.5);return tt(c,n,l.x,l.y,l.z)}var vm=s=>new N(...s),Lt=(s=0,e=0,t=0)=>new Gt(s,e,t),xf=Math.PI*2,_m=new Ot({vertexColors:!0,shininess:51,specular:7366501,side:Wt}),hb=new Mt({vertexColors:!0,toneMapped:!1,side:Wt}),Ye=(s,e,t,n,i,r,a,o=null)=>{let c=Math.max(i,r,a),l=c<.11?10:c<.25?14:c<.56?20:28,h=new pi(1,l,Math.ceil(l*.55));return h.scale(i,r,a),tt(h,s,e,t,n,o)},Oo=(s,e,t,n,i,r,a,o=.045,c=null)=>tt(pn(i,r,a,o),s,e,t,n,c),Rs=(s,e,t,n,i,r,a,o=null,c=24)=>tt(new tn(i,r,a,c),s,e,t,n,o),Bo=(s,e,t,n,i,r,a=null)=>tt(new jn(i,r,8,32),s,e,t,n,a);function pa(s,e,t=.04){return tt(new ir(new Ji(e.map(vm)),Math.max(9,e.length*5),t,8,!1),s,0,0,0)}function ot(s,e,t,n=14){let i=new Ji(e.map(vm)),r=(e.length-1)*5,a=i.computeFrenetFrames(r,!1),o=[],c=[];for(let h=0;h<=r;h++){let d=h/r,f=i.getPointAt(d),u=d*(t.length-1),p=Math.min(t.length-2,Math.floor(u)),x=Pe.lerp(t[p],t[p+1],u-p);for(let g=0;g<n;g++){let m=g*xf/n,v=f.clone().addScaledVector(a.normals[h],x*Math.cos(m)).addScaledVector(a.binormals[h],x*Math.sin(m));if(o.push(v.x,v.y,v.z),h){let M=h*n+g,_=h*n+(g+1)%n;c.push(M-n,_-n,M,_-n,_,M)}}}let l=new _t;return l.setAttribute("position",new Xe(o,3)),l.setIndex(c),l.computeVertexNormals(),tt(l,s,0,0,0)}function gm(s,e){let t=[],n=[];for(let r=1;r<s.length-1;r++)for(let a of[0,r,r+1]){t.push(...s[a]);let o=new Se(e[a%e.length]);n.push(o.r,o.g,o.b)}let i=new _t;return i.setAttribute("position",new Xe(t,3)),i.setAttribute("color",new Xe(n,3)),i.computeVertexNormals(),i}function Mn(s,e,t,n,i,r,a,o,c=null){let l=[[0,1],[.66,.64],[1,.08],[.82,-.53],[0,-1],[-.82,-.53],[-1,.08],[-.66,.64]],h=l.map(([b,S])=>[b*r,0,S*o]),d=l.map(([b,S])=>[b*r,a*.24,S*o]),f=l.map(([b,S])=>[b*r*.86,a*.53,S*o*.87]),u=[0,a,o*.06],p=[],x=[],g=new Se(s),m=new Se(e),v=g.clone().multiplyScalar(.48);function M(b,S,y,E){p.push(...b,...y,...S);for(let A=0;A<3;A++)x.push(E.r,E.g,E.b)}for(let b=0;b<l.length;b++){let S=(b+1)%l.length;M(h[b],d[b],h[S],v),M(h[S],d[b],d[S],v),M(d[b],f[b],d[S],m),M(d[S],f[b],f[S],m),M(f[b],u,f[S],g)}let _=new _t;return _.setAttribute("position",new Xe(p,3)),_.setAttribute("color",new Xe(x,3)),_.computeVertexNormals(),c&&_.applyQuaternion(new en().setFromEuler(c)),_.translate(t,n,i)}function ub(s,e,t){let i=[],r=[],a=[],o=new Se("#307fa8"),c=new Se("#94ddec");for(let d=0;d<=5;d++)for(let f=0;f<=5;f++){let u=d/5,p=f/5,x=Math.sin(Math.PI*p),g=u*(1-.25*x*u*u);i.push(Pe.lerp(s[0],e[0],p)*g,Pe.lerp(s[1],e[1],p)*g-.19*x*u+.06*Math.sin(Math.PI*u),Pe.lerp(s[2],e[2],p)*g);let m=o.clone().lerp(c,.22+.51*(1-x)+.17*u);if(r.push(m.r,m.g,m.b),d&&f){let v=d*6+f,M=v-1,_=v-6,b=_-1;t<0?a.push(b,v,_,b,M,v):a.push(b,_,v,b,v,M)}}let l=new _t;l.setAttribute("position",new Xe(i,3)),l.setAttribute("color",new Xe(r,3)),l.setIndex(a),l.computeVertexNormals();let h=l.toNonIndexed();return l.dispose(),h}function fr(s,e,t,n,i,r,a=0){let o=new tn(.035,i,r,5,1);return o.translate(0,r/2,0),tt(o,s,e,t,n,Lt(0,.2,a))}function fb(){let s=new It,e=[];function t(a,o=0,c=0,l=0){let h=new Ms;return h.position.set(o,c,l),a.add(h),h.userData.geometry=[],h.userData.light=[],e.push(h),h}let n=(a,...o)=>a.userData.geometry.push(...o),i=(a,...o)=>a.userData.light.push(...o);function r(){s.updateMatrixWorld(!0);let a=new js(e);for(let[o,c]of[["geometry",_m],["light",hb]]){let l=[];if(e.forEach((d,f)=>{let u=d.userData[o];if(delete d.userData[o],!u.length)return;let p=Pn(u).applyMatrix4(d.matrixWorld),x=p.getAttribute("position").count,g=new Uint8Array(x*4),m=new Uint8Array(x*4);for(let v=0;v<g.length;v+=4)g[v]=f,m[v]=255;p.setAttribute("skinIndex",new qr(g,4)),p.setAttribute("skinWeight",new qr(m,4,!0)),l.push(p)}),!l.length)continue;let h=new $s(Pn(l),c);s.add(h),h.bind(a,new We),h.frustumCulled=!1}}return{root:s,joint:t,add:n,glow:i,finish:r}}function ih(s,e,t,n,i,r,a=!0){for(let o of[-1,1])s.add(e,Ye("#28313b",o*t,n,i,.15,.106,.095,Lt(0,o*.35,-o*.27))),s.glow(e,Ye(r,o*t,n+.006,i+.055,.114,.068,.06,Lt(0,o*.35,-o*.27))),a&&s.add(e,Ye("#271f2e",o*t,n,i+.11,.027,.052,.017))}function sh(s,e,t,n,i,r,a=!1){for(let o=0;o<r;o++){let c=n*(o/(r-1)-.5),l=.12+(o===0||o===r-1?.08:0);s.add(e,ot("#f7dfb0",[[c,i,t-Math.abs(c)*.15],[c*.98,i+(a?1:-1)*l,t+.035]],[.049,.004],8))}}function ym(s,e,t,n,i,r=!1){let a=s.joint(e,...t),[o,c,l]=n,[h,d,f]=i;s.add(a,ot(d,[[0,0,0],o],[r?.17:.19,.12]),Ye(f,...o,.16,.15,.15));let u=s.joint(a,...o),p=c.map((g,m)=>g-o[m]),x=l.map((g,m)=>g-o[m]);if(s.add(u,ot(h,[[0,0,0],p,x],[.13,.092,.009],12)),r){let g=p.map(m=>m*.56);s.add(u,ot(d,[p.map(m=>m*.09),g,p.map(m=>m*.81)],[.145,.17,.105],10),yn(p.map(m=>m*.25),p.map(m=>m*.32),.172,f,12),yn(p.map(m=>m*.64),p.map(m=>m*.69),.143,f,12)),s.add(a,yn([0,.09,.1],[o[0],o[1]+.085,o[2]+.08],.041,"#e9b277")),s.add(u,yn([0,.03,.06],[p[0],p[1]+.12,p[2]+.05],.042,"#dba26b"),Ye(d,...p,.13,.09,.14))}else s.add(u,Ye(d,...p,.13,.095,.13));return{g:a,shank:u}}function db(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.04,-.12),a=t(r,0,-.06,.8),o=[],c=[],l="#176f70",h="#30a59a",d="#124e59",f="#f07846",u="#fcbb71";n(r,Ye(d,0,-.1,0,1.23,.55,1),Ye(l,0,.24,-.05,1.39,.77,1.06),Ye(h,0,.48,-.13,1.08,.55,.84));for(let p of[-1,1]){n(r,ot("#248d87",[[p*.15,.87,.13],[p*.56,1.01,-.17],[p*.72,1.12,-.42]],[.135,.12,.009]));for(let v=0;v<5;v++)n(r,Ye("#65ae96",p*(.26+v*.14),.88-v*.07,-.36+v*.032,.055,.039,.075));n(r,pa("#93c9ac",[[p*.18,.96,.09],[p*.58,.83,.31],[p*1.07,.59,.33],[p*1.26,.29,.19]],.036));for(let v=0;v<3;v++){let M=.4-v*.46;n(r,ot(h,[[p*1,.32,M],[p*1.36,.38,M-.13],[p*1.45,.58,M-.26]],[.21,.13,.006]));let _=[p*.92,-.09,M];o.push({...ym(s,r,_,[[p*.58,.18,-.14],[p*.91,-.78,.02],[p*1,-.97,.31]],[d,l,f]),phase:v*.98+(p<0?Math.PI:0),s:p})}let x=t(r,p*.9,.06,.39),g=t(x,p*.41,.25,.5);n(x,ot(d,[[0,0,0],[p*.37,.05,.22],[p*.41,.25,.5]],[.27,.23,.24])),n(g,Ye(f,0,.05,.05,.45,.34,.49,Lt(.12,0,-p*.12)),ot(f,[[p*.23,.12,.2],[p*.39,.22,.55],[p*.33,.31,.89],[-p*.015,.33,1.08]],[.23,.19,.1,.008]),pa(u,[[p*.29,.23,.32],[p*.39,.33,.62],[p*.24,.37,.9]],.047));let m=t(g,-p*.13,.02,.24);n(m,ot("#e78954",[[0,0,0],[-p*.18,.02,.32],[-p*.19,.12,.62],[p*.033,.25,.8]],[.19,.16,.095,.007]));for(let v=0;v<4;v++)n(g,Ye(u,-p*.02,.29,.07+v*.11,.074,.054,.06));c.push({arm:x,palm:g,finger:m,s:p}),n(r,ot(d,[[p*.39,.45,.55],[p*.48,.71,.62],[p*.49,.85,.72]],[.13,.095,.08])),n(r,Ye(d,p*.49,.86,.74,.22,.16,.17)),i(r,Ye("#ffd777",p*.49,.88,.865,.146,.11,.077)),n(r,Ye("#333442",p*.49,.9,.927,.036,.078,.02));for(let v=0;v<3;v++)n(a,ot(u,[[p*(.14+v*.1),.07,.03],[p*(.16+v*.14),-.12,.21],[p*(.13+v*.14),-.29,.27]],[.078,.055,.007]));for(let v=0;v<3;v++){let M=-.39-v*.17;n(r,Bo("#ded5a1",p*(.46+v*.1),.88-v*.06,M,.077,.025,Lt(Math.PI/2,0,0)))}}n(r,pa("#a7dac4",[[0,.59,.81],[0,.96,.21],[0,1.01,-.18],[0,.75,-.78]],.034));for(let p of[-1,1]){for(let x=0;x<2;x++){let g=p*(.36+x*.24),m=-.54+x*.18,v=[g+p*.2,1.57-x*.13,m-.11];n(r,ot("#e77648",[[g,.84,m],[g+p*.03,1.09,m],[g+p*.17,1.31-x*.06,m-.04],v],[.12,.092,.061,.022],10),ot("#ff9c5e",[[g+p*.09,1.19,m-.02],[g-p*.08,1.35,m+.025],[g-p*.06,1.47,m+.055]],[.062,.04,.011],9),ot("#f59853",[[g+p*.15,1.28-x*.04,m-.04],[g+p*.29,1.34,m-.11],[g+p*.33,1.46,m-.16]],[.055,.035,.01],9))}n(r,Mn("#126d72","#91cba9",p*.48,.9,.7,.24,.1,.23,Lt(.15,p*.12,-p*.36))),n(a,ot("#efc69c",[[p*.26,.13,.15],[p*.37,.03,.38],[p*.2,-.13,.44]],[.115,.071,.004],12))}for(let p of[-1,1])n(r,ot("#195a5c",[[p*.27,.86,.9],[p*.47,.99,.865],[p*.68,1.02,.73]],[.052,.116,.033],12));n(a,Ye("#362a2f",0,.07,.27,.28,.12,.13)),sh(s,a,.36,.39,.11,5),n(r,Mn("#209f95","#98dfbb",0,.86,-.03,.7,.27,.82));for(let p of[-1,1])n(r,Mn("#197c7f","#7ecaaa",p*.79,.67,-.18,.39,.23,.55,Lt(.08,p*.28,-p*.35)));for(let{palm:p,finger:x,s:g}of c){g<0&&p.scale.set(1.24,1.28,1.15),n(p,Mn("#fb7c3d","#ffd27a",0,.27,.2,.33,.13,.43,Lt(.04,0,-g*.16)));for(let m=0;m<3;m++){let v=.44+m*.17;n(p,ot("#ffda8e",[[g*.23,.19,v],[g*.09,.16,v+.04]],[.078,.007],9)),n(x,ot("#f6c583",[[-g*.13,.13,v-.23],[-g*.02,.14,v-.15]],[.065,.004],9))}}return p=>{a.rotation.x=.07+.12*Math.sin(p.time*3.2)+.28*p.cast-.18*p.fire,r.position.y=1.04+p.bob*.08-p.down*.29,r.rotation.z=p.stride*.044+p.down*.18,r.rotation.x=-p.cast*.14,o.forEach(({g:x,shank:g,phase:m,s:v})=>{let M=p.beat+m;x.rotation.y=v*.25*Math.sin(M)*p.walk,g.rotation.z=v*(Math.max(0,Math.cos(M))*.28*p.walk+p.down*.45)}),c.forEach(({arm:x,palm:g,finger:m,s:v})=>{x.rotation.x=-.14+.2*p.stride*v-.55*p.cast-.58*p.air+.5*p.down,g.rotation.y=v*(.1-.26*p.cast+.26*p.fire),m.rotation.y=v*(-.28-.32*p.cast+.64*p.fire+.09*Math.sin(p.time*3))})}}function pb(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.24,-.26),a=t(r,0,.18,.7),o=[],c="#57484b",l="#b67b35",h="#e9b858",d="#ffe3a8";n(r,Ye(c,0,.03,-.17,.94,.77,1.36),Ye("#8e612f",0,.18,.18,1.04,.84,.94));for(let u=0;u<3;u++){let p=.36-u*.48,x=1-u*.12;n(r,Ye(u%2?l:"#c89348",0,.53-u*.09,p,.98*x,.53*x,.55));for(let g of[-1,1])n(r,yn([g*.6*x,.9-u*.1,p+.12],[g*.92*x,.46-u*.1,p+.04],.048,h),Ye("#5b5052",g*.9*x,.49-u*.09,p+.11,.07,.07,.07))}n(a,Ye(c,0,.11,.27,.64,.63,.68),Ye("#866344",0,-.11,.72,.56,.37,.56),Ye("#624c41",0,-.2,1.03,.5,.25,.25),ot(d,[[0,.12,.88],[.04,.43,1.17],[.22,.86,1.47],[.46,1.48,1.35]],[.3,.22,.115,.004]),ot("#d6ae76",[[0,.45,.6],[0,.67,.69],[0,.87,.78]],[.16,.1,.005]));for(let u of[-1,1]){n(a,Ye("#493d42",u*.275,-.16,1.205,.105,.064,.038),ot(c,[[u*.41,.39,.1],[u*.62,.56,.04],[u*.69,.68,-.13]],[.16,.14,.015]),Ye(l,u*.46,.33,.63,.27,.11,.26,Lt(0,u*.42,-u*.31)));for(let p of[-.86,.62]){let x=t(r,u*.64,-.11,p),g=t(x,0,-.54,.05);n(x,Ye(c,u*.055,-.19,0,.3,.46,.34),Ye(l,u*.12,-.2,.045,.29,.23,.32)),n(g,Ye(c,0,-.13,0,.235,.33,.25),Ye("#423d43",0,-.39,.095,.267,.16,.34));for(let m=-1;m<=1;m++)n(g,Ye("#c3a580",m*.123,-.41,.29,.075,.074,.11));o.push({g:x,knee:g,phase:(p<0?Math.PI:0)+(u<0?Math.PI:0)})}}ih(s,a,.447,.22,.72,"#ffb333");let f=t(r,0,.12,-1.22);n(f,ot(c,[[0,0,0],[.13,-.22,-.34],[.12,-.45,-.47]],[.11,.073,.035]),Ye("#342f3a",.12,-.47,-.48,.08,.13,.085));for(let u=0;u<3;u++){let p=.38-u*.48,x=1-u*.12;n(r,Mn("#cf9440","#ffe093",0,1-u*.1,p,x*.44,.14,.36))}for(let u=0;u<3;u++){let p=.31-u*.48,x=1-u*.12;for(let g of[-1,1])n(r,pa("#795533",[[g*.24*x,1.02-u*.09,p+.12],[g*.59*x,.91-u*.1,p+.24],[g*.9*x,.54-u*.1,p+.16]],.026))}ih(s,a,.488,.295,.8,"#e7a73e"),n(a,Mn("#c28b3d","#ffd46b",0,.58,.34,.46,.18,.46,Lt(.35)));for(let u of[-1,1]){n(r,Mn("#ba7827","#ffd473",u*.71,.7,.17,.48,.25,.69,Lt(.03,u*.1,-u*.61))),n(a,Mn("#935b32","#ffd181",u*.51,.2,.44,.26,.12,.42,Lt(.38,u*.18,-u*.55))),n(a,pa("#ecd287",[[u*.08,.16,.89],[u*.14,.19,1],[u*.14,.25,1.08]],.035));for(let p=0;p<3;p++)n(r,Ye("#69484b",u*(.63+p*.09),.96-p*.102,.46-p*.03,.05,.042,.052))}return u=>{a.rotation.y=.065*u.stride-.1*Math.sin(u.time*3)*u.cast,r.position.y=1.24+.1*u.bob-.26*u.cast-.35*u.down,r.rotation.z=.06*u.stride+.25*u.down,a.rotation.x=.025+.18*u.stride+.48*u.cast-.47*u.fire+.2*u.down;for(let{g:p,knee:x,phase:g}of o){let m=Math.sin(u.beat+g)*u.walk;p.rotation.x=-m*.39+.25*u.down,x.rotation.x=Math.max(0,m)*.39+.35*u.air}f.rotation.z=.28*Math.sin(u.time*3)}}function mb(s){let{root:e,joint:t,add:n,glow:i}=s,r=[],a=[[-.32,1.76,.88,.69],[-.07,1.14,.63,.75],[.51,.63,.49,.73],[.91,.48,-.12,.68],[.72,.47,-.75,.63],[.19,.49,-1.1,.56],[-.4,.52,-1.12,.52],[-.85,.58,-.76,.46],[-.99,.77,-.27,.4],[-.85,1.16,-.14,.36],[-.64,1.59,-.35,.31],[-.3,1.95,-.62,.25],[.14,2.07,-.66,.19],[.46,1.95,-.64,.14],[.54,1.72,-.63,.078]];for(let l=0;l<a.length;l++){let[h,d,f,u]=a[l],p=t(e,h,d,f);n(p,Ye(l%2?"#623c81":"#654194",0,0,0,u,u*.78,u*.98),Ye(l%2?"#a969bd":"#9659af",0,u*.23,-.03,u*1.06,u*.71,u*.64));for(let x of[-1,1])n(p,Ye("#50365e",x*u*.78,-.09,.08,u*.21,u*.19,u*.5),fr(l%2?"#cc80ee":"#a17de8",x*u*.62,u*.43,-.1,u*.26,u*.78,-x*.5)),i(p,Ye("#edacff",x*u*.72,u*.5,.075,u*.22,u*.043,u*.09));if(n(p,fr("#e5b0ff",0,u*.62,-.14,u*.23,u*.67,-.12)),n(p,Mn(l%2?"#9f62cb":"#8251b7","#d39ae8",0,u*.61,.025,u*.82,u*.32,u*.69)),l+1<a.length){let[x,g,m,v]=a[l+1],M=[x-h,g-d,m-f];n(p,ot(l%2?"#6e498c":"#8453a4",[[0,0,0],M.map(_=>_*.55),M],[u*.79,(u+v)*.44,v*.78],16))}r.push(p)}let o=t(r[0],0,.37,.34),c=t(o,0,-.12,.11);n(o,Ye("#75469a",0,.18,.02,.69,.49,.61),Ye("#9954af",0,.1,.4,.56,.23,.44),Ye("#392744",0,-.043,.41,.51,.11,.44)),n(c,Ye("#b579ab",0,-.19,.37,.47,.145,.45)),sh(s,o,.67,.83,-.012,7),sh(s,c,.62,.67,-.13,5,!0);for(let l of[-1,1])n(o,ot("#cea6ef",[[l*.45,.32,.1],[l*.65,.69,-.06],[l*.69,.91,-.32]],[.19,.135,.01]),ot("#a07ccf",[[l*.48,.11,-.04],[l*.78,.36,-.23],[l*.94,.44,-.49]],[.19,.1,.007]),Ye("#b17cba",l*.4,.32,.44,.24,.105,.19,Lt(0,l*.37,-l*.32)));for(let l of[-1,1])n(o,ot("#c491da",[[l*.18,.31,.63],[l*.39,.42,.54],[l*.66,.5,.24]],[.1,.16,.035]),ot("#cba7d1",[[l*.49,.09,.31],[l*.67,-.03,.53],[l*.57,-.19,.75]],[.12,.085,.005]));ih(s,o,.39,.235,.51,"#a3ffe6");for(let l of[-1,1])n(o,fr("#86bdf3",l*.43,.43,-.11,.16,.62,-l*.45),fr("#d6b8ff",l*.56,.36,-.21,.12,.41,-l*.67));n(c,Mn("#713f83","#e19acd",0,-.16,.34,.44,.12,.34)),n(c,Ye("#512c4b",0,-.061,.4,.25,.05,.18));for(let l of[-1,1])n(o,ot("#ffe8c5",[[l*.36,.08,.61],[l*.37,-.1,.81],[l*.3,-.28,.87]],[.092,.06,.006],12)),n(o,Mn("#754593","#cc8dee",l*.38,.35,.4,.25,.1,.25,Lt(.22,-l*.22,-l*.44)));return l=>{r.forEach((h,d)=>{let[,f,u]=a[d];h.position.x=a[d][0]+Math.sin(l.beat*.68-d*.71)*(.075+Math.min(4,d)*.026)*l.walk,h.position.y=f*(1-.57*l.down-.36*l.cast)+Math.sin(l.beat*.63-d*.73)*.074*l.walk,h.position.z=u+d*.035*l.cast+Math.max(0,1-d*.2)*.36*l.fire,h.rotation.z=.12*Math.sin(l.beat*.7-d*.61)*l.walk+.27*l.down}),o.rotation.x=-.22*l.cast-.36*l.fire+.1*Math.sin(l.beat)*l.walk,c.rotation.x=.4+.31*l.cast+.36*l.fire+.04*Math.sin(l.time*3)}}function gb(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.72,-.26),a=t(r,0,.4,.8),o=t(a,0,-.16,.28),c=[],l=[],h=[];n(r,Ye("#387bab",0,.09,-.08,.65,.59,1.1),Ye("#a4d6df",0,-.18,.12,.48,.35,.8),Ye("#397aa7",0,.3,.58,.45,.49,.64)),n(a,Ye("#599fc2",0,.11,.14,.46,.39,.61),Ye("#92cbd6",0,-.01,.5,.38,.2,.47),Ye("#296382",0,-.14,.58,.35,.1,.38)),n(o,Ye("#b1e3e3",0,-.12,.3,.31,.12,.34)),sh(s,a,.76,.53,-.11,5);for(let u of[-1,1]){n(a,ot("#e1f3e6",[[u*.28,.27,0],[u*.45,.58,-.24],[u*.48,.72,-.51]],[.13,.085,.006]),ot("#80d5e1",[[u*.27,.07,-.08],[u*.54,.17,-.25],[u*.66,.22,-.47]],[.14,.08,.01]));let p=t(r,u*.39,.32,.04),x=t(p,u*.76,.72,-.26);n(p,ot("#5296b7",[[0,0,0],[u*.38,.26,-.08],[u*.76,.72,-.26]],[.18,.12,.095]),gm([[0,0,0],[u*.76,.72,-.26],[u*.82,.08,.74],[u*.14,-.08,.47]],["#4a9fc7","#8ddfe5","#3b81b0","#306d9c"]));let g=[[u*.98,.33,-.32],[u*1.2,-.005,.18],[u*1.16,-.36,.77],[u*.78,-.62,1.05],[u*.4,-.66,.98]];for(let m=0;m<g.length-1;m++){let v=g[m],M=g[m+1];n(x,ub(v,M,u),ot("#d0ecdc",[[0,0,0],[v[0]*.56,v[1]*.58+.05,v[2]*.47],v],[.055,.042,.009]))}n(x,ot("#c5e8df",[[0,0,0],g[g.length-1]],[.046,.008]),ot("#b2e8e2",[[0,0,0],[u*.09,.12,.1],[u*.12,.16,.22]],[.08,.05,.004])),c.push({arm:p,elbow:x,s:u});for(let m of[-.57,.41]){let v=t(r,u*.37,-.23,m);n(v,ot("#407ea5",[[0,0,0],[u*.12,-.32,.05],[u*.14,-.49,.23]],[.15,.095,.069]));for(let M of[-1,0,1])n(v,ot("#dcebd5",[[u*.14,-.49,.23],[u*.15+M*.09,-.57,.38]],[.053,.006]));l.push({leg:v,s:u,z:m})}}for(let u of[-1,1])n(a,ot("#4b92af",[[u*.11,.24,.55],[u*.31,.32,.47],[u*.48,.39,.21]],[.052,.095,.021]));ih(s,a,.315,.14,.54,"#f9c45b");let d=r;for(let u=0;u<5;u++){let p=t(d,0,u?-.015:0,u?-.33:-.83),x=.28-u*.042;n(p,ot("#4789ad",[[0,0,.06],[0,-.025,-.27],[0,.01,-.4]],[x,x*.8,x*.64]),fr("#acdfe4",0,x*.59,-.16,.065,.17-u*.014)),h.push(p),d=p}for(let u=0;u<4;u++){let p=.47-u*.28;n(r,Mn(u%2?"#68b4d3":"#559fc9","#d1eef0",0,.48,p,.39-u*.035,.13,.26))}n(a,Mn("#4085a8","#a9dce8",0,.15,.52,.28,.12,.4,Lt(.17)));for(let u of[-1,1])n(a,ot("#316785",[[u*.16,.22,.63],[u*.34,.29,.52],[u*.48,.36,.22]],[.06,.1,.012],11),ot("#f6f2df",[[u*.25,-.045,.72],[u*.28,-.17,.85],[u*.25,-.28,.86]],[.066,.039,.005],10));n(a,fr("#b8eef8",0,.38,.1,.14,.44));let f=h[h.length-1];for(let u of[-1,1])n(f,gm([[0,.03,-.11],[u*.29,.12,-.32],[u*.35,.1,-.63],[0,-.02,-.49]],["#bbeffd","#2689ae","#b2eff7","#246c98"])),n(f,ot("#daeff3",[[0,.05,-.1],[u*.22,.12,-.33],[u*.35,.1,-.63]],[.06,.035,.006],10)),n(a,Mn("#57a6ca","#b4edf1",u*.31,.27,.12,.2,.105,.31,Lt(.16,0,-u*.25)));for(let{arm:u,elbow:p,s:x}of c)n(u,Mn("#3f8fba","#d7f1e8",x*.39,.27,-.05,.22,.1,.43,Lt(-.03,x*.94,-x*.28))),n(p,ot("#c1eafa",[[0,.04,.02],[x*.22,.22,.18],[x*.32,.33,.11]],[.1,.055,.005],10));for(let u=0;u<4;u++)n(r,fr("#d5ede7",0,.5,.41-u*.31,.084,.23));return u=>{let p=Math.sin(u.time*4.9);r.position.y=1.7+.1*p*(1-u.down)-.69*u.down-.3*u.cast,r.rotation.x=-.13*u.cast+.17*u.fire+.18*u.down,a.rotation.x=.1*Math.sin(u.time*2.4)+.32*u.fire,o.rotation.x=.08+.36*u.cast+.4*u.fire;for(let{arm:x,elbow:g,s:m}of c)x.rotation.z=m*(.06+.32*p*(1-u.down)+.39*u.cast-.65*u.down),g.rotation.z=m*(.21*Math.sin(u.time*4.9-.85)*(1-u.down)-.18*u.fire),g.rotation.y=m*(.12+.12*Math.sin(u.time*4.9-.6)+.7*u.down);for(let{leg:x,s:g,z:m}of l)x.rotation.x=.32+.13*Math.sin(u.beat+g+(m>0?Math.PI:0))+.35*u.air;h.forEach((x,g)=>x.rotation.y=.16*Math.sin(u.time*3-g*.6))}}function xb(s){let{root:e,joint:t,add:n,glow:i}=s,r=t(e,0,1.14,-.17),a=[],o=[],c=t(r,0,.14,.88),l="#394955",h="#8a4239",d="#d09253",f="#27313d",u="#ffc669";n(r,Ye(f,0,0,-.06,.99,.63,1.15),Ye(h,0,.24,-.15,1.06,.68,1.08));for(let x=0;x<3;x++)n(r,Rs(x===1?d:l,0,.6+x*.13,-.22,.71-x*.075,.74-x*.073,.15),Bo("#c4874f",0,.65+x*.13,-.22,.705-x*.072,.043,Lt(Math.PI/2)));n(r,Rs(f,0,.98,-.22,.48,.56,.11)),i(r,Rs("#ff9642",0,1.035,-.22,.414,.414,.035));for(let x=-2;x<=2;x++)n(r,Oo(l,x*.14,1.07,-.22,.052,.04,.66-.09*Math.abs(x),.014));n(c,Rs(f,0,0,.1,.54,.54,.27,Lt(Math.PI/2)),Bo(d,0,0,.265,.48,.077)),i(c,Ye("#ff8235",0,0,.245,.39,.39,.105),Ye("#ffe395",0,0,.326,.17,.17,.054));for(let x=0;x<8;x++){let g=x*xf/8;n(c,Oo(l,Math.cos(g)*.32,Math.sin(g)*.32,.35,.24,.066,.053,.016,Lt(0,0,g+.32)))}for(let x of[-1,1]){for(let m=0;m<4;m++){let v=.62-m*.45,M=[x*(.5+Math.sin(m*Math.PI/3)*.12),.39,v*.42],_=[x*(.9+Math.sin(m*Math.PI/3)*.18),-.75,v*.78];a.push({...ym(s,r,[x*.75,-.06,v],[M,_,[_[0]+x*.16,-1.04,_[2]+.27]],[l,h,d],!0),s:x,phase:m*1.5+(x<0?Math.PI:0)})}let g=t(r,x*.74,.56,-.25);o.push({g,s:x}),n(g,Rs(l,0,.28,0,.245,.265,.76,Lt(.26)),Rs(d,0,.62,.095,.258,.26,.13,Lt(.26)),Rs(f,0,.72,.118,.22,.22,.1,Lt(.26)),Bo("#e4a361",0,.78,.132,.232,.045,Lt(Math.PI/2+.26)),pa(d,[[x*.17,0,-.1],[x*.27,.28,-.12],[x*.2,.46,-.06]],.05)),i(g,Ye(u,0,.742,.13,.142,.042,.14)),n(r,Oo(h,x*.76,.3,.45,.47,.43,.52,.1,Lt(0,x*.16,-x*.25)));for(let m=0;m<3;m++)i(r,Oo("#ffa64f",x*(.67+m*.075),.31,.72,.036,.18,.033,.007,Lt(0,0,-x*.18)))}for(let x of[-1,1])n(c,Oo(l,x*.142,0,.37,.066,.46,.06,.023));i(c,Ye("#ffe295",0,0,.391,.061,.236,.034));let p=t(r,0,1.11,-.22);n(p,Rs(d,0,.01,0,.094,.116,.06));for(let x=0;x<6;x++){let g=x*xf/6;n(p,Mn("#5b6970","#dda064",.21*Math.sin(g),0,.21*Math.cos(g),.085,.042,.17,Lt(0,g+.61,.13)))}for(let{g:x,s:g}of o){for(let m=0;m<3;m++)n(x,Bo("#be8451",0,.39+m*.083,.04+m*.022,.253,.018,Lt(Math.PI/2+.26)));n(r,Mn("#a64b36","#d8944f",g*.7,.65,.43,.4,.17,.4,Lt(.05,g*.2,-g*.42)))}return x=>{p.rotation.y=x.time*2.8+x.cast*1.2+x.fire*.7,r.position.y=1.14+.066*x.bob-.15*x.cast-.42*x.down,r.rotation.z=.042*x.stride+.21*x.down,c.rotation.z=.14*x.time+.67*x.cast,a.forEach(({g,shank:m,s:v,phase:M})=>{let _=x.beat+M;g.rotation.y=v*.22*Math.sin(_)*x.walk,m.rotation.z=v*(.25*Math.max(0,Math.cos(_))*x.walk+.36*x.down)}),o.forEach(({g,s:m})=>{g.rotation.x=.22+.54*x.cast-.34*x.fire,g.rotation.z=m*(.18+.12*x.down),g.position.y=.56-.14*x.fire})}}var vf={diver:[[2.86,-.93,.74]],warden:[[2.85,-.79,.52],[3.5,2.1,.45]],drill:[[3.18,.69,.56],[2.38,-.83,.54]],kestrel:[[3.6,-.8,1.85],[3.3,.35,.44]],engine:[[2.77,-.49,.8],[2.29,-1.2,.44]]},vb={diver:1.08,warden:1.19,drill:1.03,kestrel:1.05,engine:1.09},xm={diver:db,warden:pb,drill:mb,kestrel:gb,engine:xb};function Mm(s,e){let t=new Map,n;return function(r,a){if(n!==r){let u=t.get(n);u&&(u.root&&(u.root.visible=!1),u.portrait&&(u.portrait.mesh.visible=!1)),xm[r]&&!t.has(r)&&t.set(r,{}),n=r}let o=t.get(r);if(!o)return!1;let c=e.get(r),l=a.mode==="ai"&&c,h=a.march*4.35,d=Pe.smoothstep(a.defeat,.12,.94);if(l)return o.portrait||(o.portrait=pm(r,c),s.add(o.portrait.mesh)),o.root&&(o.root.visible=!1),o.portrait.mesh.visible=!0,o.portrait.pose({...a,down:d}),!0;if(!o.root){let u=fb();o.sample=xm[r](u),u.finish(),o.root=u.root,s.add(u.root)}!o.paintState&&c&&(o.paintState=dm(o.root,c,_m,r)),o.portrait&&(o.portrait.mesh.visible=!1),o.root.visible=!0,o.root.scale.setScalar(vb[r]),o.paintState&&(o.paintState.value=Math.max(0,a.hit));let f=Math.sin(Math.PI*Pe.clamp((a.vault-.21)/.89,0,1))+Math.sin(Math.PI*Pe.clamp((a.attack-.23)/.65,0,1));return o.sample({time:a.time,beat:h,walk:a.walk*(1-d),stride:Math.sin(h)*a.walk*(1-d),bob:(.5-.5*Math.cos(h*2))*a.walk,down:d,air:f,cast:a.charge||0,fire:a.release||0}),!0}}var rh=`
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
`;var ma=.18700000000000003,Sm=Math.PI*2;function bm(s){if(s<.55)return 1-2*s/.55;let e=(s-.55)/(1-.55),t=e*e*(3-2*e),n=2*(1-.55)/.55*e*(1-e)*(1-2*e);return-1+2*t-n}function Cs(s,e,t){let n=s/Sm%1,i=(n+.5)%1;t[0]=bm(n)*e,t[1]=bm(i)*e;let r=Math.max(n,i),a=r>.55?Math.sin(Math.PI*(r-.55)/(1-.55))**2:0;return t[2]=(r===n?1:-1)*a*e,t}function ga(s){return s.phase+Sm*s.marched/(.68*s.size)}function _b(s,e){let t=e==="captain",n=t?1.16:e==="red"?.54:.49,i=s.attributes.position,r=s.attributes.uv,a=t?.42:.5,o=t?1.73:.88,c=Math.cos(.43),l=Math.sin(.43),h=t?.79:.65,d=Math.sin(h),f=Math.cos(h),u=Pe.smoothstep,p=(x,g,m,v,M,_)=>{let b=((x-m)/M)**2+((g-v)/_)**2;return 1-u(b,.13,1)};for(let x=0;x<i.count;x++){let g=r.getX(x),m=r.getY(x),v=s.attributes.surface.getX(x),M=p(g,m,a,.818,t?.285:.4,.19),_=p(g,m,a,.726,t?.33:.425,.055),b=p(g,m,.18,.552,.16,.135)+p(g,m,.82,.552,.16,.135),S=p(g,m,.33,.105,.155,.135)+p(g,m,.64,.118,.155,.13),y=p(g,m,.285,.34,.115,.076)+p(g,m,.69,.35,.11,.078),E=(1-u(Math.abs(g-(.82-.93*m)),.024,.075))*p(g,m,.47,.475,.35,.2),A=e==="blue"?p(g,m,.5,.452,.29,.145):0,R=t?p(g,m,.836,.754,.156,.29):0,L=t?Math.hypot((g-.842)/.139,(m-.666)/.086):2,z=(1-u(L,.6,.78))*v,X=u(L,.58,.78)*(1-u(L,.89,1.07)),U=n*(.14*M+.071*_+.075*b+.09*S+.069*y+.054*E+.13*A+.21*R+.092*X-.18*z),V=v?1:-.45,H=m*o*c+.025,P=.09-m*o*l,q=(i.getY(x)-H)*l+(i.getZ(x)-P)*c+U*V,I=i.getX(x)+(g-a)*n*(.079*_+.033*M)+(g-.5)*n*(.04*S+.065*b);i.setXYZ(x,I,H+q*d,P+q*f)}s.computeVertexNormals()}function _f(s,e,t,n,i){let r=s==="captain",a=s!=="red",o=r?th("captain",e,1.16,1.73):th("infantry",e,a?.49:.54,.88);_b(o,s),o.setAttribute("stepPose",n);let c=new zt({side:ri,alphaToCoverage:!0,defines:r?{CAPTAIN:1}:{},uniforms:{recoil:{value:0},lean:{value:0},portrait:{value:e},reverse:{value:t},facing:{value:a?-1:1}},vertexShader:`
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
        // Boots bend at the ankle; the shoulders counter-rotate over planted hips.
        float heel = leg * (1. - smoothstep(.085,.20,uv.y));
        float chest = smoothstep(.28,.48,uv.y) * (1.-smoothstep(.58,.72,uv.y));
        p.x += (isRight-.5) * .026 * lift * heel + .017 * stepPose.y * chest;
        p.z += .046 * facing * stepPose.y * lateral * chest;
        p.y += heel * max(.0, -stride) * .024;
        p.z += facing * stride * (${ma} * leg - 0.105 * arm);
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
      ${rh}
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
      }`}),l=new Zt(o,c,i);return l.name=r?"\u84DD\u961F\u91CD\u70AE\u961F\u957F":a?"\u84DD\u961F\u91CE\u6218\u5236\u670D":"\u7EA2\u961F\u91CE\u6218\u5236\u670D",l.count=0,l.frustumCulled=!1,l}function Em(s,e){let t=new Float32Array(3),n=new $t(new Float32Array(4),4).setUsage(un),i=_f("captain",s,e,n,1);return i.setMatrixAt(0,new We),i.count=1,{mesh:i,pose(r,a,o,c,l){Cs(r*9.03,a,t),n.setXYZW(0,Math.min(.66,l*.55),t[0],t[1],t[2]),n.needsUpdate=!0,i.material.uniforms.lean.value=c,i.material.uniforms.recoil.value=o}}}var yb=Math.PI*2,nn=[0,0,0],Ps={blue:1085152,blueShade:479381,ice:7985151,navy:1453392,skin:15840638,skinShade:13208928,khaki:13675111,tan:11960903,leather:5518632,dark:2434352,gun:2504008,steel:8492968,red:15150389,wine:9377830,orange:16756781,gold:15775821};function Mb(s,e=16,t=1,n=null){let i=[],r=[],a=n?e+1:e,o=n?n[0]:0,c=n?n[1]-n[0]:yb;for(let[h,d,f,u=0,p=0]of s)for(let x=0;x<a;x++){let g=o+c*x/e,m=Math.sin(g),v=Math.cos(g);i.push(u+d*Math.sign(m)*Math.abs(m)**t,h,p+f*Math.sign(v)*Math.abs(v)**t)}for(let h=0;h<s.length-1;h++)for(let d=0;d<e;d++){let f=n?d+1:(d+1)%a,u=h*a+d,p=h*a+f;r.push(u,p,u+a,p,p+a,u+a)}if(!n)for(let h of[!1,!0]){let d=h?s.length-1:0,[f,,,u=0,p=0]=s[d],x=i.length/3;i.push(u,f,p);let g=d*a;for(let m=0;m<e;m++){let v=g+m,M=g+(m+1)%e;h?r.push(x,v,M):r.push(x,M,v)}}let l=new _t;return l.setAttribute("position",new Xe(i,3)),l.setIndex(r),l.computeVertexNormals(),l}function bb(s=12,e=8){return new pi(1,s,e)}function vn(s,e,t,n=t,i=8){let r=new N(...s),a=new N(...e),o=a.clone().sub(r),c=new tn(n,t,o.length(),i);c.applyQuaternion(new en().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.add(a).multiplyScalar(.5);return c.translate(l.x,l.y,l.z)}function zo(s,e,t=6){let n=new Ji(s.map(i=>new N(...i)));return new ir(n,(s.length-1)*3,e,t,!1)}function Sb(){let s=new Ot({vertexColors:!0,shininess:18,specular:3156007});return s.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <begin_vertex>",`#include <begin_vertex>
fabricPoint=position;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec2 stitch=vec2(fabricPoint.x+.42*fabricPoint.z,fabricPoint.y)*175.;
        vec2 weight=1.-smoothstep(vec2(.75),vec2(2.7),fwidth(stitch));
        float thread=dot(sin(stitch*3.14159),weight)*.024;
        diffuseColor.rgb*=1.+thread;`)},{cloth:s,lacquer:new Ot({vertexColors:!0,shininess:58,specular:7175302}),metal:new Ot({vertexColors:!0,shininess:78,specular:10201786})}}var os=class{constructor(){this.byFinish=new Map}add(e,t,n=nn,i=[1,1,1],r=nn,a="cloth"){let o=new We().compose(new N(...n),new en().setFromEuler(new Gt(...r)),new N(...i));e.applyMatrix4(o),e.deleteAttribute("uv"),e.clearGroups();let c=e.attributes.position.count;e.index===null&&e.setIndex(Array.from({length:c},(d,f)=>f));let l=new Se(t),h=new Float32Array(c*3);for(let d=0;d<c;d++){let f=d*3;h[f]=l.r,h[f+1]=l.g,h[f+2]=l.b}e.setAttribute("color",new Ft(h,3)),this.limb!==void 0&&e.setAttribute("limb",new Xe(new Float32Array(c).fill(this.limb),1)),this.byFinish.has(a)||this.byFinish.set(a,[]),this.byFinish.get(a).push(e)}shape(e,t,n={}){let{sides:i=16,power:r=1,arc:a=null,at:o,scale:c,rotate:l,finish:h}=n;this.add(Mb(e,i,r,a),t,o,c,l,h)}ell(e,t,n,i=nn,r="cloth",a=14,o=8){this.add(bb(a,o),e,t,n,i,r)}box(e,t,n,i=nn,r="cloth"){this.add(new Un(1,1,1),e,t,n,i,r)}joinGeometry(){let e=Fo([...this.byFinish.values()].flat(),!1);return e.computeBoundingSphere(),e.computeBoundingBox(),e}attach(e,t){for(let[n,i]of this.byFinish){let r=new Qe(Fo(i,!1),t[n]);r.castShadow=!0,e.add(r)}}};function Is(s,e=0,t=0,n=0){let i=new It;return i.position.set(e,t,n),s.add(i),i}function Tm(s,e="near"){let t=s==="red",n=e==="far",i=new os,r=t?15873338:1351656,a=t?11542827:1399980,o=t?10829881:12949854,c=n?6:16,l=n?5:12;for(let d of[-1,1]){i.limb=d;let f=d*.081;i.shape([[.01,.058,.105,f,-.031],[.05,.068,.11,f,-.032],[.12,.05,.067,f]],3484976,{sides:n?4:6,power:.72}),n||(i.shape([[.009,.059,.107,f,-.031],[.028,.071,.114,f,-.035],[.046,.07,.111,f,-.035]],2370101,{sides:8,power:.74}),i.ell(t?6181198:3763096,[f,.19,-.052],[.052,.059,.03],nn,"cloth",8,4)),i.shape([[.075,.055,.058,f],[.22,.068,.074,f*.91],[.3,.073,.078,f*.83]],t?6701875:2906496,{sides:n?4:6})}i.limb=0,i.shape([[.235,.117,.081],[.3,.151,.114],[.42,.153,.101],[.485,.118,.084]],o,{sides:n?5:8,power:.89}),n||(i.shape([[.274,.137,.11],[.307,.151,.117]],6899252,{sides:8}),i.box(10712389,[0,.365,.097],[.093,.118,.045],[.03,0,.08]));for(let d of[-1,1]){i.limb=d*2;let f=d*.166;i.shape([[.26,.037,.044,f*1.12,-.031],[.298,.055,.06,f*1.07,-.03],[.386,.052,.057,f,.007],[.444,.05,.058,f*.91]],15772528,{sides:n?4:6}),n||(i.ell(o,[f*.88,.427,.008],[.083,.078,.092],nn,"cloth",8,4),i.ell(t?7880249:3494521,[f*.91,.456,.006],[.091,.048,.096],nn,"metal",8,4),i.ell(t?12928064:3436462,[f*.91,.47,.008],[.084,.046,.089],nn,"lacquer",8,4))}if(i.limb=0,i.shape([[.43,.072,.073,0,-.012],[.462,.127,.1,0,-.016],[.548,.161,.14],[.635,.162,.149]],16761484,{sides:l,power:.82}),n||(i.ell(14129257,[-.151,.546,.005],[.033,.046,.041],nn,"cloth",5,3),i.ell(14129257,[.151,.546,.005],[.033,.046,.041],nn,"cloth",5,3)),i.shape([[.548,.177,.162,0,.009],[.585,.221,.198],[.613,.215,.195]],a,{sides:c}),i.shape([[.595,.224,.2],[.644,.229,.211],[.744,.204,.19],[.818,.132,.124],[.847,.054,.052]],r,{sides:c}),!n){if(i.shape([[.589,.221,.201],[.605,.226,.205]],t?16145742:7194613,{sides:10}),i.limb=0,t){for(let d of[.66,.698])i.box(16768401,[0,d,-.203],[.09,.019,.017],[-.23,0,0]);i.add(vn([-.093,.449,-.096],[.107,.291,-.111],.017,.018,5),5847082),i.box(14923627,[.027,.356,-.127],[.041,.031,.014],[0,0,-.57]);for(let d of[-1,1])i.box(7422515,[d*.093,.302,-.098],[.067,.065,.04],[0,-d*.23,0]),i.box(12621402,[d*.093,.318,-.121],[.055,.018,.012]),i.box(14198113,[d*.11,.448,-.031],[.054,.019,.097],[0,0,-d*.28])}else{i.box(3690845,[0,.351,.116],[.194,.177,.086]),i.box(5010046,[0,.356,.163],[.159,.118,.02]),i.add(vn([-.109,.447,.13],[.109,.447,.13],.039,.039,8),14334075);for(let d of[-1,1])i.box(7031092,[d*.053,.372,.179],[.023,.171,.018]),i.box(14727549,[d*.053,.335,.189],[.036,.025,.014]);i.add(zo([[0,.65,.205],[0,.739,.189],[0,.808,.127],[0,.845,.05],[0,.852,-.027]],.014,6),9558778)}t||(i.limb=2,i.add(vn([.163,.264,.032],[.173,.525,-.19],.026,.026,5),Ps.gun),i.add(vn([.173,.51,-.18],[.173,.656,-.268],.013,.013,5),2966610))}if(t){i.ell(a,[0,.583,-.12],[.18,.019,.133],[-.14,0,0],"cloth",8,3),i.ell(15706736,[0,.514,-.139],[.042,.042,.061],nn,"cloth",5,3),n&&i.box(16762755,[0,.68,-.196],[.09,.027,.013],[-.28,0,0]);for(let d of[-1,1])i.ell(4336940,[d*.061,.536,-.14],[.026,.022,.015],[0,-d*.28,-d*.12],"cloth",5,3)}let h=i.joinGeometry();return h.scale(1.055,1.016,1),t&&h.rotateY(Math.PI),h.computeBoundingBox(),h}function Am(s){let e=new os;if(s==="guard"){e.box(5399670,[.12,.32,.155],[.25,.34,.065],[-.12,0,-.045]),e.box(11978175,[.12,.36,.194],[.2,.038,.014]),e.shape([[.088,.055,.029,.114,.16],[.188,.12,.034,.119,.167],[.27,.124,.033,.12,.167]],4675694,{sides:8,power:.65});for(let t of[-1,1])e.add(vn([.12+t*.121,.2,.183],[.12+t*.12,.477,.145],.012,.013,6),11842726),e.ell(14991228,[.12+t*.096,.426,.185],[.016,.016,.008],nn,"metal",6,4)}else if(s==="gunner")e.add(vn([.14,.33,.07],[.13,.37,.39],.04,.03,6),3490385),e.add(vn([.13,.37,.38],[.13,.38,.47],.038,.038,8),8159365),e.box(5003622,[.14,.345,.203],[.095,.105,.19],[0,.03,0]),e.box(12752981,[.14,.411,.203],[.08,.033,.15]),e.add(vn([.13,.378,.464],[.13,.379,.478],.025,.023,8),2369586);else if(s==="standard")e.add(vn([-.18,.19,-.05],[-.18,1.09,-.05],.025,.02,6),7626823),e.box(15382366,[-.18,1.08,-.04],[.078,.06,.078]),e.box(10890041,[-.01,.93,-.05],[.33,.22,.043],[-.08,0,-.09]),e.box(16767874,[-.035,.92,-.02],[.18,.043,.02]),e.box(7218740,[.166,.916,-.054],[.064,.186,.034],[.05,-.36,-.11]),e.add(vn([-.178,1.1,-.051],[-.178,1.18,-.051],.034,.006,8),15843698);else if(s==="courier"){e.box(13744003,[.18,.34,.1],[.26,.22,.14],[0,0,-.16]),e.box(16773587,[.18,.34,.177],[.17,.145,.018]),e.box(12011077,[.18,.34,.196],[.035,.12,.01]),e.box(12011077,[.18,.34,.196],[.12,.035,.01]);for(let t of[.07,.285])e.box(7165760,[t,.342,.163],[.024,.19,.032]),e.box(15847304,[t,.385,.179],[.038,.032,.018]);e.add(vn([.109,.464,.101],[.232,.464,.101],.022,.022,8),5851958)}else if(s==="vault")e.add(vn([.22,.07,.46],[.16,1.19,-.53],.027,.017,8),16764021),e.add(vn([.2,.32,.24],[.195,.47,.11],.033,.033,8),4411998),e.add(vn([.164,1.1,-.45],[.159,1.175,-.517],.023,.029,8),5929882),e.ell(13856567,[.159,1.19,-.53],[.034,.039,.035],nn,"lacquer",8,4);else{e.box(6636858,[0,.38,.12],[.23,.15,.082]);for(let t of[-.068,0,.068])e.add(vn([t,.32,.163],[t,.45,.17],.029,.029,8),14633778),e.add(vn([t,.43,.17],[t,.457,.171],.032,.027,8),13611132);e.box(4870755,[0,.374,.199],[.224,.031,.019]),e.box(15253895,[.034,.374,.21],[.041,.028,.012])}return e.joinGeometry()}function wm(s,e,t){let n=Is(s,e*.117,.607,0),i=new os;return i.shape([[-.385,.063,.064,e*.013,.016],[-.29,.086,.082,e*.012,.012],[-.165,.103,.103,e*.007,-.005],[-.032,.111,.114],[.036,.079,.086]],3629962,{sides:12}),i.shape([[-.59,.078,.142,e*.013,-.045],[-.553,.091,.153,e*.012,-.044],[-.493,.092,.141,e*.012,-.036],[-.448,.079,.082,e*.012,.012],[-.299,.08,.077,e*.012,.018]],5586993,{sides:12,power:.74}),i.shape([[-.606,.081,.143,e*.013,-.045],[-.586,.092,.151,e*.013,-.046],[-.565,.092,.151,e*.013,-.045]],3485490,{sides:12,power:.7}),i.shape([[-.327,.081,.079,e*.012,.015],[-.291,.086,.084,e*.012,.014]],9134660,{sides:12}),i.attach(n,t),n}function Rm(){let s=new It,e=Sb(),t=Is(s),n=wm(t,-1,e),i=wm(t,1,e),r=Is(t,0,.62),a=new os;a.shape([[-.075,.183,.122],[.005,.217,.15],[.102,.221,.156],[.264,.274,.19],[.367,.285,.177],[.416,.191,.131]],Ps.khaki,{power:.8}),a.shape([[-.046,.216,.146],[-.008,.226,.155],[.045,.227,.158]],Ps.leather,{sides:16,power:.8}),a.shape([[.358,.185,.128],[.392,.187,.136],[.431,.165,.12]],15977614,{sides:14}),a.shape([[.375,.102,.106],[.502,.106,.099]],Ps.skinShade);let o=[];for(let m of[-1,1]){let v=m*.158;a.add(zo([[v*.8,.005,.155],[v*.85,.135,.179],[v,.29,.168],[v,.37,.126],[v*.85,.405,.014],[v*.81,.36,-.111]],.027),7950390),a.box(12164198,[v*.89,.22,.192],[.064,.035,.015],[0,0,m*.065],"metal");let M=Is(r,v*1.47,.34,0),_=Is(M,-v*1.47,-.34,0);o.push(M);let b=new os;b.shape([[.144,.078,.084,v*1.62,.042],[.207,.102,.109,v*1.66,.022],[.307,.107,.112,v*1.6],[.342,.07,.073,v*1.47]],13210966,{sides:12}),b.add(vn([v*1.74,.18,.038],[v*1.88,.074,-.092],.066,.059,10),Ps.skin),b.ell(9069123,[v*1.88,.078,-.105],[.07,.068,.076],[.22,0,0]),b.attach(_,e)}for(let m of[-1,1])a.box(13015648,[m*.124,.22,-.157],[.126,.101,.03],[.08,m*.16,0]),a.box(15122300,[m*.124,.249,-.174],[.13,.037,.016],[.1,m*.16,0]);a.box(13280874,[0,-.011,-.153],[.1,.061,.021],nn,"metal"),a.box(9987129,[0,.077,.144],[.17,.112,.074],[.08,0,0]),a.box(12289103,[0,.101,.184],[.172,.062,.02],[.12,0,0]),a.add(zo([[-.165,.034,.158],[-.002,.169,.207],[.153,.292,.17]],.033),9463616),a.attach(r,e);let c=Is(r,-.027,.461,-.015),l=new os;l.shape([[0,.093,.078],[.024,.142,.126,0,-.012],[.078,.189,.162,0,-.016],[.204,.211,.181,0,-.004],[.278,.203,.176],[.327,.142,.137]],Ps.skin,{sides:18,power:.83});for(let m of[-1,1])l.ell(14788213,[m*.201,.145,.001],[.037,.072,.053]),l.add(zo([[m*.199,.245,.062],[m*.192,.112,.045],[m*.148,.014,-.001],[m*.068,-.005,-.052]],.019),7885632);l.shape([[.192,.18,.168,0,.009],[.219,.223,.202],[.264,.224,.202]],7229755,{sides:20,arc:[-.69*Math.PI,.69*Math.PI]}),l.ell(13996641,[0,.132,-.167],[.052,.049,.05]);for(let m of[-1,1])l.ell(5519405,[m*.08,.168,-.155],[.042,.013,.016],[0,-m*.31,-m*.09]),l.ell(3882042,[m*.076,.15,-.164],[.018,.021,.014],[0,-m*.28,0],"lacquer",9,5);l.add(zo([[-.054,.079,-.157],[0,.07,-.169],[.053,.078,-.155]],.009),11892307),l.shape([[.207,.224,.212,0,.015],[.243,.273,.242,0,.011],[.279,.285,.253],[.302,.279,.248]],Ps.blueShade,{sides:24,finish:"lacquer"}),l.shape([[.255,.275,.251],[.272,.286,.258],[.288,.282,.253]],6867711,{sides:24,finish:"lacquer"}),l.shape([[.281,.278,.25],[.331,.288,.257],[.413,.275,.249],[.498,.23,.222],[.574,.144,.155],[.609,.055,.068],[.614,.014,.022]],Ps.blue,{sides:28,finish:"lacquer"}),l.shape([[.296,.281,.252],[.312,.289,.259],[.325,.292,.261]],12114656,{sides:30,finish:"metal"});for(let m of[-1,1])l.ell(14793848,[m*.255,.325,.114],[.013,.016,.014],nn,"metal",8,5);l.attach(c,e);let h=Is(r,.295,.691,-.03),d=new os;function f(m,v,M,_,b,S="metal",y=18){d.add(vn([0,0,_],[0,0,b],v,M,y),m,nn,[1,1,1],nn,S)}f(2505549,.106,.11,-.48,.367),f(3558238,.13,.12,-.5,-.375),f(6928350,.142,.142,-.495,-.471),f(2110276,.142,.142,-.549,-.498),f(7442078,.147,.147,-.558,-.541),f(1252139,.105,.105,-.561,-.56),f(2635849,.144,.134,-.275,-.12),f(5540523,.141,.135,-.254,-.205),f(3305115,.125,.129,-.044,.161);for(let m of[-.292,-.119,.148,.203,.249,.294])f(m<.15?8559533:6058374,.139,.139,m,m+.021);f(2504006,.146,.137,.178,.346),f(10005948,.154,.153,.322,.36),f(2503748,.127,.123,.359,.373),f(1319473,.087,.086,.374,.375),d.box(3756390,[0,.095,-.1],[.093,.09,.202],nn,"metal"),d.box(7785452,[0,.147,-.12],[.103,.023,.105],nn,"metal"),d.box(3229274,[.098,.066,.061],[.052,.047,.189],nn,"metal"),d.ell(8701671,[.123,.065,.02],[.012,.022,.036],nn,"lacquer"),d.attach(h,e);let u=Is(h,0,0,-.57),p;function x(m,v){p=Em(m,v),t.visible=!1,s.add(p.mesh)}function g({time:m=0,run:v=0,recoil:M=0,merge:_=0,lean:b=0}={}){p&&p.pose(m,v,M,b,_);let S=m*10.9;n.rotation.x=Math.sin(S)*.53*v,i.rotation.x=-Math.sin(S)*.53*v;let y=Math.sin(S)*v;o[0].rotation.x=-y*.46,o[1].rotation.x=y*.15+M*.12,r.rotation.y=y*.055,t.position.y=(1-Math.cos(S*2))*.019*v,r.rotation.z=-b*.13+Math.sin(S)*.021*v,r.rotation.x=-.058*v+M*.085,c.rotation.z=b*.026,h.position.z=-.03+M*.155,h.rotation.x=M*.14,e.cloth.emissive.setRGB(_*.43,_*.21,_*.05),e.lacquer.emissive.setRGB(_*.37,_*.31,_*.11),e.metal.emissive.setRGB(_*.29,_*.22,_*.07)}return{root:s,animate:g,muzzle:u,paint:x}}function Cm(s){let e=new Map,t=new Map,n=s.clone();return Pm(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Pm(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Pm(s.children[n],e.children[n],t)}var ah=class extends Ai{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Tf(t)}),this.register(function(t){return new Af(t)}),this.register(function(t){return new Rf(t)}),this.register(function(t){return new Of(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Pf(t)}),this.register(function(t){return new If(t)}),this.register(function(t){return new Lf(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new wf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Sf(t)}),this.register(function(t){return new oh(t,ft.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new oh(t,ft.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new kf(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=ss.extractUrlBase(e);a=ss.resolveURL(l,this.path)}else a=ss.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new na(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Um){try{a[ft.KHR_BINARY_GLTF]=new Hf(e)}catch(d){i&&i(d);return}r=JSON.parse(a[ft.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Zf(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let d=this.pluginCallbacks[h](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let d=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(d){case ft.KHR_MATERIALS_UNLIT:a[d]=new Ef;break;case ft.KHR_DRACO_MESH_COMPRESSION:a[d]=new Gf(r,this.dracoLoader);break;case ft.KHR_TEXTURE_TRANSFORM:a[d]=new Vf;break;case ft.KHR_MESH_QUANTIZATION:a[d]=new Wf;break;default:f.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function Eb(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Kt(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var ft={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Sf=class{constructor(e){this.parser=e,this.name=ft.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Se(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Dn);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ws(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new yo(h),l.distance=d;break;case"spot":l=new _o(h),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ii(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Ef=class{constructor(){this.name=ft.KHR_MATERIALS_UNLIT}getMaterialType(){return Mt}extendParams(e,t,n){let i=[];e.color=new Se(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Dn),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(i)}},wf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Tf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new he(r,r)}return Promise.all(i)}},Af=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(i)}},Rf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Cf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},Pf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SHEEN}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new Se(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Dn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,yt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},If=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Lf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_VOLUME}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Se().setRGB(r[0],r[1],r[2],Dn),Promise.all(i)}},Nf=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_IOR}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Df=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Se().setRGB(r[0],r[1],r[2],Dn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,yt)),Promise.all(i)}},Uf=class{constructor(e){this.parser=e,this.name=ft.EXT_MATERIALS_BUMP}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Ff=class{constructor(e){this.parser=e,this.name=ft.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Kt(this.parser,e,this.name)!==null?Fn:null}extendMaterialParams(e,t){let n=Kt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Of=class{constructor(e){this.parser=e,this.name=ft.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Bf=class{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},zf=class{constructor(e){this.parser=e,this.name=ft.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},oh=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,d=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,f,i.mode,i.filter).then(function(u){return u.buffer}):a.ready.then(function(){let u=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(u),h,d,f,i.mode,i.filter),u})})}else return null}},kf=class{constructor(e){this.name=ft.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==li.TRIANGLES&&l.mode!==li.TRIANGLE_STRIP&&l.mode!==li.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),d=h.isGroup?h.children:[h],f=l[0].count,u=[];for(let p of d){let x=new We,g=new N,m=new en,v=new N(1,1,1),M=new Zt(p.geometry,p.material,f);for(let b=0;b<f;b++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,b),c.SCALE&&v.fromBufferAttribute(c.SCALE,b),M.setMatrixAt(b,x.compose(g,m,v));let _=null;for(let b in c)if(b==="_COLOR_0"){let S=c[b];M.instanceColor=new $t(S.array,S.itemSize,S.normalized)}else if(b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"){if(_===null){let y=M.geometry;_=new _t,_.name=y.name;for(let E in y.attributes)_.setAttribute(E,y.attributes[E]);for(let E in y.morphAttributes)_.morphAttributes[E]=y.morphAttributes[E];y.index!==null&&_.setIndex(y.index),_.morphTargetsRelative=y.morphTargetsRelative;for(let E of y.groups)_.addGroup(E.start,E.count,E.materialIndex);y.boundingBox!==null&&(_.boundingBox=y.boundingBox.clone()),y.boundingSphere!==null&&(_.boundingSphere=y.boundingSphere.clone()),_.drawRange.start=y.drawRange.start,_.drawRange.count=y.drawRange.count,_.userData=Object.assign({},y.userData),M.geometry=_}let S=c[b];_.setAttribute(b,new $t(S.array,S.itemSize,S.normalized))}Pt.prototype.copy.call(M,p),this.parser.assignFinalMaterial(M),u.push(M)}return h.isGroup?(h.clear(),h.add(...u),h):u[0]}))}},Um="glTF",ko=12,Im={JSON:1313821514,BIN:5130562},Hf=class{constructor(e){this.name=ft.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ko),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Um)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-ko,r=new DataView(e,ko),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Im.JSON){let l=new Uint8Array(e,ko+a,o);this.content=n.decode(l)}else if(c===Im.BIN){let l=ko+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Gf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ft.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let d=qf[h]||h.toLowerCase();o[d]=a[h]}for(let h in e.attributes){let d=qf[h]||h.toLowerCase();if(a[h]!==void 0){let f=n.accessors[e.attributes[h]],u=xa[f.componentType];l[d]=u.name,c[d]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,f){i.decodeDracoFile(h,function(u){for(let p in u.attributes){let x=u.attributes[p],g=c[p];g!==void 0&&(x.normalized=g)}d(u)},o,l,Dn,f)})})}},Vf=class{constructor(){this.name=ft.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Wf=class{constructor(){this.name=ft.KHR_MESH_QUANTIZATION}},lh=class extends Ti{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,d=(n-t)/h,f=d*d,u=f*d,p=e*l,x=p-l,g=-2*u+3*f,m=u-f,v=1-g,M=m-f+d;for(let _=0;_!==o;_++){let b=a[x+_+o],S=a[x+_+c]*h,y=a[p+_+o],E=a[p+_]*h;r[_]=v*b+M*S+g*y+m*E}return r}},wb=new en,Xf=class extends lh{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return wb.fromArray(r).normalize().toArray(r),r}},li={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},xa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Lm={9728:jt,9729:Qt,9984:hc,9985:la,9986:cr,9987:Wn},Nm={33071:ii,33648:kr,10497:Ei},yf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},qf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ls={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Tb={CUBICSPLINE:void 0,LINEAR:Zs,STEP:Ys},Mf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ab(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new ji({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ri})),s.DefaultMaterial}function dr(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ii(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Rb(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let d=e[l];if(n){let f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):s.attributes.position;a.push(f)}if(i){let f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):s.attributes.normal;o.push(f)}if(r){let f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],d=l[1],f=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=d),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function Cb(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Pb(s){let e,t=s.extensions&&s.extensions[ft.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+bf(t.attributes):e=s.indices+":"+bf(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+bf(s.targets[n]);return e}function bf(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Yf(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ib(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Lb=new We,Zf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Eb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?(this.textureLoader=new is(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Mo(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new na(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return dr(r,o,i),Ii(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ft.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(ss.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=yf[i.type],o=xa[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Ft(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=yf[i.type],l=xa[i.componentType],h=l.BYTES_PER_ELEMENT,d=h*c,f=i.byteOffset||0,u=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,x,g;if(u&&u!==d){let m=Math.floor(f/u),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,M=t.cache.get(v);M||(x=new l(o,m*u,i.count*u/h),M=new Yr(x,u/h),t.cache.add(v,M)),g=new Zr(M,c,f%u/h,p)}else o===null?x=new l(i.count*c):x=new l(o,f,i.count*c),g=new Ft(x,c,p);if(i.sparse!==void 0){let m=yf.SCALAR,v=xa[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,b=new v(a[1],M,i.sparse.count*m),S=new l(a[2],_,i.sparse.count*c);o!==null&&(g=new Ft(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let y=0,E=b.length;y<E;y++){let A=b[y];if(g.setX(A,S[y*c]),c>=2&&g.setY(A,S[y*c+1]),c>=3&&g.setZ(A,S[y*c+2]),c>=4&&g.setW(A,S[y*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return h.magFilter=Lm[f.magFilter]||Qt,h.minFilter=Lm[f.minFilter]||Wn,h.wrapS=Nm[f.wrapS]||Ei,h.wrapT=Nm[f.wrapT]||Ei,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==jt&&h.minFilter!==Qt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1,h;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)h=n.getDependency("bufferView",a.bufferView).then(function(f){return new Promise(function(u,p){t.parse(f,u,p)})});else{if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(f){l=!0;let u=new Blob([f],{type:a.mimeType});return c=o.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(c).then(function(f){return new Promise(function(u,p){let x=u;t.isImageBitmapLoader===!0&&(x=function(g){let m=new hn(g);m.needsUpdate=!0,u(m)}),t.load(ss.resolveURL(f,r.path),x,void 0,p)})})}let d=h.then(function(f){return l===!0&&o.revokeObjectURL(c),Ii(f,a),f.userData.mimeType=a.mimeType||Ib(a.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=d,d}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ft.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ft.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[ft.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new $r,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Jr,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ji}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[ft.KHR_MATERIALS_UNLIT]){let d=i[ft.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new Se(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let f=d.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],Dn),o.opacity=f[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,yt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Wt);let h=r.alphaMode||Mf.OPAQUE;if(h===Mf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Mf.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Mt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new he(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==Mt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Mt){let d=r.emissiveFactor;o.emissive=new Se().setRGB(d[0],d[1],d[2],Dn)}return r.emissiveTexture!==void 0&&a!==Mt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,yt)),Promise.all(l).then(function(){let d=new a(o);return r.name&&(d.name=r.name),Ii(d,r),t.associations.set(d,{materials:e}),r.extensions&&dr(i,d,r),d})}createUniqueName(e){let t=Ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[ft.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Dm(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=Pb(l),d=i[h];if(d)a.push(d.promise);else{let f;l.extensions&&l.extensions[ft.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Dm(new _t,l,t),l.mode===li.TRIANGLE_STRIP?f=f.then(u=>gf(u,Po)):l.mode===li.TRIANGLE_FAN&&(f=f.then(u=>gf(u,ha))),i[h]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?Ab(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],d=[];for(let u=0,p=h.length;u<p;u++){let x=h[u],g=a[u],m,v=l[u];if(g.mode===li.TRIANGLES||g.mode===li.TRIANGLE_STRIP||g.mode===li.TRIANGLE_FAN||g.mode===void 0){let M=r.isSkinnedMesh===!0,_=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");M&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=M&&_?new $s(x,v):new Qe(x,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===li.LINES)m=new Ka(x,v);else if(g.mode===li.LINE_STRIP)m=new Qs(x,v);else if(g.mode===li.LINE_LOOP)m=new Ja(x,v);else if(g.mode===li.POINTS)m=new $a(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&Cb(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Ii(m,r),g.extensions&&dr(i,m,g),t.assignFinalMaterial(m),d.push(m)}for(let u=0,p=d.length;u<p;u++)t.associations.set(d[u],{meshes:e,primitives:u});if(d.length===1)return r.extensions&&dr(i,d[0],r),d[0];let f=new It;r.extensions&&dr(i,f,r),t.associations.set(f,{meshes:e});for(let u=0,p=d.length;u<p;u++)f.add(d[u]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new cn(Pe.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new rr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ii(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let d=a[l];if(d){o.push(d);let f=new We;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new js(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let d=0,f=i.channels.length;d<f;d++){let u=i.channels[d],p=i.samplers[u.sampler],x=u.target,g=x.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,v=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",v)),l.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(d){let f=d[0],u=d[1],p=d[2],x=d[3],g=d[4],m=[];for(let M=0,_=f.length;M<_;M++){let b=f[M],S=u[M],y=p[M],E=x[M],A=g[M];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();let R=n._createAnimationTracks(b,S,y,E,A);if(R)for(let L=0;L<R.length;L++)m.push(R[L])}let v=new go(r,void 0,m);return Ii(v,i),v})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],d=l[1],f=l[2];f!==null&&h.traverse(function(u){u.isSkinnedMesh&&u.bind(f,Lb)});for(let u=0,p=d.length;u<p;u++)h.add(d[u]);if(h.userData.pivot!==void 0&&d.length>0){let u=h.userData.pivot,p=d[0];h.pivot=new N().fromArray(u),h.position.x-=u[0],h.position.y-=u[1],h.position.z-=u[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Ms:l.length>1?h=new It:l.length===1?h=l[0]:h=new Pt,h!==l[0])for(let d=0,f=l.length;d<f;d++)h.add(l[d]);if(r.name&&(h.userData.name=r.name,h.name=a),Ii(h,r),r.extensions&&dr(n,h,r),r.matrix!==void 0){let d=new We;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let d=i.associations.get(h);i.associations.set(h,{...d})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new It;n.name&&(r.name=i.createUniqueName(n.name)),Ii(r,n),n.extensions&&dr(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,d=c.length;h<d;h++){let f=c[h];f.parent!==null?r.add(Cm(f)):r.add(f)}let l=h=>{let d=new Map;for(let[f,u]of i.associations)(f instanceof Rn||f instanceof hn)&&d.set(f,u);return h.traverse(f=>{let u=i.associations.get(f);u!=null&&d.set(f,u)}),d};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}Ls[r.path]===Ls.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(Ls[r.path]){case Ls.weights:h=es;break;case Ls.rotation:h=ts;break;case Ls.translation:case Ls.scale:h=Es;break;default:n.itemSize===1?h=es:h=Es;break}let d=i.interpolation!==void 0?Tb[i.interpolation]:Zs,f=this._getArrayFromAccessor(n);for(let u=0,p=c.length;u<p;u++){let x=new h(c[u]+"."+Ls[r.path],t.array,f,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Yf(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof ts?Xf:lh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Nb(s,e,t){let n=e.attributes,i=new Jn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){let h=Yf(xa[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new N,c=new N;for(let l=0,h=r.length;l<h;l++){let d=r[l];if(d.POSITION!==void 0){let f=t.json.accessors[d.POSITION],u=f.min,p=f.max;if(u!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(u[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(u[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(u[2]),Math.abs(p[2]))),f.normalized){let x=Yf(xa[f.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new Hn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Dm(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=qf[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return ut.workingColorSpace!==Dn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ut.workingColorSpace}" not supported.`),Ii(s,e),Nb(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Rb(s,e.targets,t):s})}async function Fm(){let{scene:s}=await new ah().loadAsync("./art/brawler.glb?v=ringmaster2"),e=fm(),t=g=>s.getObjectByName(g),n=t("Pelvis"),i=t("Spine"),r=t("Head"),a=n.position.y,o=["L","R"].map(g=>Object.fromEntries(["Hip","Knee","Ankle","Arm","Elbow","Wrist"].map(m=>[m,t(m+g)]))),c=t("Brawler");c.frustumCulled=!1;let l=c.material;l.color.setScalar(.78),l.emissiveMap=l.map,l.emissive.setScalar(.22);let h=new ea;h.moveTo(-.17,-.125),h.lineTo(.17,-.125),h.quadraticCurveTo(.21,-.125,.21,-.088),h.lineTo(.21,.092),h.quadraticCurveTo(.21,.125,.17,.125),h.lineTo(-.17,.125),h.quadraticCurveTo(-.21,.125,-.21,.086),h.lineTo(-.21,-.086),h.quadraticCurveTo(-.21,-.125,-.17,-.125);let d=new er;d.moveTo(-.145,-.072),d.lineTo(-.145,.072),d.lineTo(.145,.072),d.lineTo(.145,-.072),d.closePath(),h.holes.push(d);let f=new Qe(new uo(h,{depth:.027,bevelThickness:.009,bevelSize:.009,bevelSegments:2}),new ji({color:12166028,metalness:.37,roughness:.52}));f.position.set(0,.15,.85),f.rotation.x=-.11,n.add(f);let u=Mm(s,e),p=new Float32Array(3);function x({time:g,walk:m,march:v,attack:M,hit:_,defeat:b,kind:S="bruiser",vault:y=0,brace:E=0,drive:A=0,charge:R=0,release:L=0,mode:z}){let X=u(S,{time:g,walk:m,march:v,attack:M,defeat:b,vault:y,charge:R,release:L,mode:z,hit:_});if(c.visible=f.visible=!X,X)return;let U=Math.min(1,y/1.35),V=Math.sin(Math.PI*Math.max(0,Math.min(1,(y-.21)/.89))),H=Et(y,0,.14)*(1-Et(y,.14,.32)),P=Et(y,1.04,1.13)*(1-Et(y,1.14,1.35)),q=1-Et(b,0,.38),I=q*Et(M,0,.19)*(1-Et(M,.2,.3+.1)),J=q*Math.sin(Math.PI*Jo(M)),W=q*Et(M,.11,.53)*(1-Et(M,.68,.91)),F=q*Et(M,.68,.91)*(1-Et(M,1.01,1.48)),G=q*Et(M,.91,1)*(1-Et(M,1.01,1.39)),D=Et(b,.12,.58),Q=Et(b,.82,1.34),ae=m*(1-Et(M,.015,.16)+Et(M,1.32,1.48))*(1-D)*(1-.9*Math.sin(Math.PI*U)),Ie=.41,ye=v==null?g*6.75:v*Math.PI*.55/Ie;Cs(ye,ae,p);let Be=p[0];n.position.y=a+(-.105+(.5-.5*Math.cos(2*ye))*.047)*ae-.3*I-.48*G-.17*D-.32*H-.26*P,n.rotation.set(.055*I-.075*J,Be*.105,Be*.043-D*.075),i.rotation.set(.06+.24*H+.19*P-.14*V+.13*A+.24*I-.18*W+.42*F-.084*_,-Be*.16,-.057*Be-.16*D),S==="bruiser"&&(i.rotation.x+=.16*R+.31*L),r.rotation.set(-.29-.12*I+.07*W-.34*F+.21*D,Be*.052,.032*Be);for(let[nt,Fe]of o.entries()){let je=nt?1:-1,et=p[nt],se=Math.max(0,(nt===0?1:-1)*p[2]),ue=-Fe.Knee.position.y,ce=-Fe.Ankle.position.y,Re=ue+ce+n.position.y-a-se*.22,_e=Ie*et,Ze=Math.min(ue+ce-1e-5,Math.hypot(Re,_e)),ze=gt=>Math.acos(Pe.clamp(gt,-1,1)),st=Math.atan2(-_e,Re)-ze((ue*ue+Ze*Ze-ce*ce)/(2*ue*Ze)),rt=Math.PI-ze((ue*ue+ce*ce-Ze*Ze)/(2*ue*ce));Fe.Hip.rotation.x=st-(.62+nt*.13)*V-(.6+nt*.11)*J+je*.27*D,Fe.Knee.rotation.x=rt+.78*V+.22*P+.86*J+.22*D,Fe.Ankle.rotation.x=-st-rt+.19*et-.31*J,Fe.Arm.rotation.set(.37*et-.76*V+.18*H-(nt?0:.82)*E-(nt?.65:0)*A-.24*I-(2.04+nt*.09)*W-.38*F,je*(.23*W+.1*F+.22*V),je*(.035+.12*I+.28*W+.055*F+.69*D-.26*Q)),Fe.Elbow.rotation.x=-.26-.17*Math.max(0,-et)-.4*I-.65*W+.12*F-.4*D,Fe.Arm.rotation.x-=1.36*R+.11*L,Fe.Elbow.rotation.x-=.34*R,Fe.Wrist.rotation.set(-.24-.13*W+.22*F,je*.58*W,je*(.075*et+.11*W))}l.emissive.setRGB(.22+_*.36,.22+_*.21,.22+_*.12)}return{root:s,pose:x,prepare:e.prepare}}var Fb={timber:[1.85,.077],quarry:[3.35,.105],forge:[3.7,.084],ice:[4.05,.069],cinder:[3.8,.119]},Ob=[0,0],Kf=`
  uniform vec4 roadCurve;
  float lateralBend(float z){
    float offset = roadCurve.x * (cos(roadCurve.z - z * roadCurve.y) - roadCurve.w)
                 * smoothstep(5.0, 21.0, -z);
    float limit = max(0.6, -z * 0.18 - 0.8);
    return offset * inversesqrt(1.0 + (offset / limit) * (offset / limit));
  }`,Om=new WeakSet,zm=new WeakMap;function Bm(s){if(Om.has(s)||s.userData.unbent)return;Om.add(s);let e=s.onBeforeCompile,t=s.customProgramCacheKey();s.customProgramCacheKey=()=>t+"-road-bend",s.onBeforeCompile=function(n,i){e.call(this,n,i),Object.assign(n.uniforms,zm.get(i));let r="if (roadCurve.x != 0.0) gl_Position += roadRight * lateralBend(dot(roadDepth, gl_Position));",a=n.vertexShader;a.includes("#include <project_vertex>")?a=a.replace("#include <project_vertex>",`#include <project_vertex>
`+r):a=a.replace(/gl_Position\s*=[^;]+;/g,o=>o+`
`+r),n.vertexShader=Kf+`
uniform vec4 roadDepth, roadRight;
`+a},s.needsUpdate=!0}function km(s,e){let t=new mt,n=new mt,i=new mt,r=new We;zm.set(s,{roadCurve:{value:t},roadRight:{value:n},roadDepth:{value:i}});function a(o){o.material&&(Array.isArray(o.material)?o.material.forEach(Bm):Bm(o.material),o.frustumCulled=!1)}return{prepareScene(){e.traverseVisible(a)},setRoute(o,c,l){let[h,d]=Fb[o]||Ob,f=l*d+c%5*.69+.63;t.set(h,d,f,Math.cos(f))},offset(o){let c=t.x*(Math.cos(t.z-o*t.y)-t.w)*Pe.smoothstep(-o,5,21),l=Math.max(.6,-o*.18-.8);return c/Math.hypot(1,c/l)},setCamera(o){r.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),n.fromArray(r.elements,0);let c=r.invert().elements;i.set(c[2],c[6],c[10],c[14])},curve:t}}var Jf="M4 17h24v3H4z M6 16c0-6 4-11 10-11s10 5 10 11z M10 22h12c-1 4-3 6-6 6s-5-2-6-6z",Bb={plus:Jf,squad:Jf,reserve:Jf,merge:"M3 16l17-10 5 8-16 10z M6 23l5-3 4 7-6 2z M21 5l3-2 6 10-3 2z",range:"M3 20l14-10 3 4L7 25z M14 7l15-4-6 15-2-7z",longshot:"M3 20L18 9l3 4L7 25z M16 6l14-4-6 14-2-7z M3 12l8-6 2 2-8 7z M12 26l7-6 2 2-7 6z",rapid:"M3 11l8 5-8 5v-4l3-1-3-1z M11 8l12 8-12 8v-5l5-3-5-3z M22 9l8 7-8 7v-5l3-2-3-2z",shield:"M16 2l12 5v8c0 6-5 12-12 15C9 27 4 21 4 15V7z M16 7v17c5-3 7-6 7-10V10z",blast:"M14 12l5-2 1-5 4 1-2 6c5 3 6 8 3 13-3 5-12 6-17 1-4-4-4-12 1-15z M23 3l3-2 2 2-4 3z",plasma:"M17 1L5 18h9l-2 13 16-20H17l4-10z",spread:"M6 29V13H2l7-10 7 10h-4v16z M20 26V11h-4l7-9 7 9h-4v15z",drone:"M11 13h10l3 4-4 4h-8l-4-4z M3 6l8 5-2 3-8-5z M21 11l8-5 2 3-8 5z M1 24l8-5 2 3-8 5z M21 22l2-3 8 5-2 3z",engineer:"M2 23h28v4H2z M4 21V6h4v6c5 4 11 4 16 0V6h4v15h-4v-5l-4 2v3h-3v-2h-3v2h-3v-3l-3-2v5z",medic:"M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z",frost:"M14 1h4v10l8-5 2 4-9 6 9 6-2 4-8-5v10h-4V21l-8 5-2-4 9-6-9-6 2-4 8 5z",fever:"M15 1c2 8 8 8 7 15 3-1 4-4 4-6 8 16-5 23-12 20C4 28 2 21 7 13c0 4 2 5 3 5-1-7 5-10 5-17z"},Hm={blue:{top:"#36acf9",bottom:"#0574e4",rim:"#81d7ff",light:"#f6fcff",ink:"#ffffff",shade:"#1150a9",badge:"#1678d2"},gold:{top:"#ffe336",bottom:"#efbf0c",rim:"#ffeb79",light:"#fff9ce",ink:"#ffffff",shade:"#916808",badge:"#c78b0d"}};function va(s,e,t){s.beginPath(),e.forEach(([n,i],r)=>r?s.lineTo(n,i):s.moveTo(n,i)),s.closePath(),s.fillStyle=t,s.fill()}function Gm(s,e,t,n,i){let r=Hm[wn[e].tone];s.save(),s.translate(t,n),s.scale(i/100,i/100);let a=[[-34,-46],[34,-46],[48,-31],[48,21],[33,35],[0,49],[-33,35],[-48,21],[-48,-31]];va(s,a,r.shade),s.scale(.94,.94),va(s,a,r.rim),s.scale(.88,.88);let o=s.createLinearGradient(0,-45,0,45);o.addColorStop(0,r.badge),o.addColorStop(1,r.shade),va(s,a,o),s.scale(2,2),s.translate(-16,-16);let c=new Path2D(Bb[e]);s.translate(0,1.3),s.fillStyle=r.shade,s.fill(c,"evenodd"),s.translate(0,-1.3),s.fillStyle=r.light,s.fill(c,"evenodd"),s.restore()}function Vm(s){let e=new Gn(s);return e.colorSpace=yt,e.anisotropy=4,e}function Wm(s){let e=document.createElement("canvas");e.width=640,e.height=196;let t=e.getContext("2d"),n=Hm[wn[s].tone],i=t.createLinearGradient(0,0,0,196);i.addColorStop(0,n.top),i.addColorStop(.64,n.bottom),i.addColorStop(1,n.bottom),t.fillStyle=i,t.fillRect(0,0,640,196),va(t,[[0,0],[143,0],[99,196],[0,196]],n.shade),va(t,[[0,0],[640,0],[640,8],[12,8],[0,20]],n.rim),t.fillStyle="rgba(255,255,255,.10)",t.fillRect(13,177,614,3);for(let l of[13,627])for(let h of[22,175])t.fillStyle=n.shade,t.fillRect(l-4,h-3,8,6),t.fillStyle=n.light,t.fillRect(l-3,h-3,6,2);for(let l of[551,576,601])va(t,[[l,154],[l+13,154],[l+7,164],[l-6,164]],n.rim);Gm(t,s,69,96,100);let r=wn[s],a=r.count?150:125;t.font="900 "+a+'px "Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif',t.textAlign="center";let o=t.measureText(r.label),c=96+(o.actualBoundingBoxAscent-o.actualBoundingBoxDescent)/2;return t.translate(357,c),t.scale(Math.min(1,412/o.width),1),t.lineJoin="round",t.lineWidth=r.count?14:11,t.strokeStyle="#172d42",t.strokeText(r.label,0,2),t.fillStyle=n.ink,t.fillText(r.label,0,0),Vm(e)}function Xm(s){let e=Object.keys(wn),t=Math.ceil(Math.sqrt(e.length)),n=128,i=document.createElement("canvas");i.width=i.height=t*n;let r=i.getContext("2d"),a=new Map;e.forEach((u,p)=>{let x=p%t,g=Math.floor(p/t);Gm(r,u,(x+.5)*n,(g+.5)*n,118),a.set(u,[x/t,1-(g+1)/t])});let o=new Mt({map:Vm(i),side:Wt,alphaTest:.26,toneMapped:!1});o.onBeforeCompile=u=>{u.vertexShader=`attribute vec2 badgeCell;
`+u.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
vMapUv = vMapUv * `+(1/t).toFixed(6)+" + badgeCell;")};let c=new Vt(.99,.99),l=40,h=new $t(new Float32Array(l*2),2);h.setUsage(un),c.setAttribute("badgeCell",h);let d=new Zt(c,o,l);d.name="Flying supply insignia",d.count=0,d.frustumCulled=!1,d.instanceMatrix.setUsage(un),s.add(d);let f=new Pt;return{update(u){let p=0;for(let x of u){if(x.slot!=null||x.age<0||p>=l)continue;let g=x.progress;f.scale.setScalar(.65+.62*Math.sin(Math.PI*g)),f.rotation.set(-.57,Math.sin(g*Math.PI*2)*.48,.13*Math.sin(g*Math.PI*2)),f.position.set(x.x,x.y+.35,x.z),f.updateMatrix(),d.setMatrixAt(p,f.matrix);let m=a.get(x.type);h.setXY(p++,m[0],m[1])}d.count=p,p&&(d.instanceMatrix.needsUpdate=!0,h.needsUpdate=!0)}}}function qm(s){let e=[],t="#386167",n="#394852",i="#d9a35c",r="#866047",a=(u,p,x,g,m,v,M,_=null)=>e.push(tt(pn(u,p,x),g,m,v,M,_)),o=(u,p,x,g,m,v,M,_,b=null)=>e.push(tt(new tn(u,p,x,g),m,v,M,_,b)),c=(u,p,x,g)=>e.push(yn(u,p,x,g,6));function l(u,p,x,g,m,v,M,_){let b=new $i(1);b.scale(g,m,v),e.push(tt(b,M,u,p,x,new Gt(.09,_,.15)))}function h(u,p,x){a(3.6,.38,x,"#806d5b",u,-1.8,p);for(let g of[-1,1]){a(.13,.19,x,"#c7a073",u+1.67*g,-1.52,p);for(let m of[-1,1])o(.16,.24,2.9,8,r,u+1.45*g,-2.65,p+m*(x/2-.25))}for(let g=0;g<x/.45;g++)a(3.25,.034,.026,"#a78869",u,-1.58,p-x/2+.2+g*.45)}function d(u,p){o(1.2,1.65,1.9,12,"#8c8e83",u,-2.72,p),o(.66,.9,2.55,14,"#ebe4c4",u,-.55,p),o(.72,.8,.68,14,"#b95843",u,-.42,p),o(.86,.66,.22,14,n,u,.82,p),o(.6,.6,.7,12,"#fbdc91",u,1.24,p);for(let x=0;x<8;x++){let g=x*Math.PI/4;o(.045,.045,.83,5,t,u+.61*Math.cos(g),1.25,p+.61*Math.sin(g))}o(.05,.9,.52,12,"#587579",u,1.92,p),o(.04,.04,.39,8,i,u,2.32,p)}function f(u,p,x){let g=u>0?-1:1,m=u+g*1.9,v=-1.5+x;a(.75,.48,.76,n,u,-1.25,p);for(let M of[-.28,.28]){a(.12,x,.12,"#d4a354",u,-1.51+x/2,p+M),c([u,v-.77,p+M],[m,v+.32,p+M],.06,i),c([u,v+.34,p+M],[m,v+.32,p+M],.075,i);for(let _=0;_<4;_++)c([u,-1.37+_*x/4,p+M],[u,-1.37+(_+1)*x/4,p-M],.035,t)}a(.59,.57,.82,"#a47849",u-g*.28,v+.14,p),o(.14,.14,.75,10,n,m,v+.29,p,new Gt(Math.PI/2,0,0)),c([m,v+.26,p],[m,v-.79,p],.025,n),a(.7,.47,.69,"#b77749",m,v-1.02,p);for(let M of[-.2,.2])a(.73,.5,.045,n,m,v-1.02,p+M)}if(s==="quay"){d(-8.95,-2);for(let u=0;u<4;u++)l(-9-.56*(u%2),-3.55,-.2+u*.65,.93,.55,1.1,"#87958b",u*.7);h(9.1,15,5.1),f(9.5,15.85,2.55);for(let[u,p]of[[8.38,13.6],[9.4,13.4],[8.43,14.36]])a(.8,.58,.65,"#bd906c",u,-1.28,p),a(.09,.61,.675,t,u-.23,-1.28,p)}else if(s==="timber"){for(let[u,p,x]of[[-9,-1,3.9],[-10.7,-3,4.6],[-9.4,1.2,3],[10,14,3.8],[11.1,16,4.1]]){l(u,-3.54,p,1.95,.85,2.1,"#73877a",u),o(.14,.25,x*.72,8,r,u,-2+x*.23,p);for(let g=0;g<3;g++)o(.02,(1.5-g*.28)*x/4,x*.51,8,["#3e6857","#4f8069","#74a186"][g],u,-2+x*(.38+g*.22),p)}h(8.65,17.5,4.1);for(let u of[16.4,18.6])for(let p of[8.1,9.2])a(.14,2.8,.14,r,p,-.18,u);a(1.72,.14,3.06,"#cb9760",8.65,1.18,17.5),o(0,1.83,.71,4,"#587c70",8.65,1.6,17.5,new Gt(0,.785,0))}else if(s==="quarry"||s==="cinder"||s==="ice"){let u=s==="ice",p=s==="cinder",x=u?["#8dbdcc","#b4d4db","#d5e9e7"]:p?["#433f49","#57505e","#736362"]:["#957765","#a7866d","#c1a383"];for(let[g,m]of[[-1,0],[1,17]])for(let v=0;v<6;v++){let M=g*(8.6+v%3*.98),_=m+(v%2*2-1)*(v*.64+.4),b=1.32+v%3*.77;l(M,-3.29,_,2.12,b,2.32,x[0],v*1.27),p?(o(.58,.8,b,6,x[v%3],M,-2+b*.26,_),o(.49,.51,.09,6,"#b96845",M,-2+b*.76,_)):(l(M,-3.25+b*.44,_,1.62,b*.68,1.95,x[1],v*1.27),l(M,-3.17+b*.72,_,1.18,b*.45,1.49,x[2],v*1.27)),u&&v%2===0&&o(.01,.44,1.75,5,"#a5edf0",M,-.95,_,new Gt(0,0,g*.24))}!p&&!u&&(h(9.7,10,4.3),f(9.6,10.5,3.4))}else if(s==="forge"){h(-9.4,0,6.1),f(-9.5,0,4.1),h(9.3,15,7.2);for(let[u,p,x]of[[8.8,16,3.8],[10,14.8,2.9]]){o(.37,.43,x,14,"#637d83",u,-1.4+x/2,p);for(let g of[.17,.57,.95])o(.42,.42,.12,14,i,u,-1.4+g*x,p);o(.29,.29,.06,14,n,u,-1.36+x,p)}for(let u of[12.1,13.2])a(2.2,.63,.82,"#a86c49",9.24,-1.26,u)}return Pn(e)}var $f=new Ot({vertexColors:!0,shininess:33,specular:5527131}),ei=(s=0,e=0,t=0)=>new Gt(s,e,t),dt=(s,e,t,n,i,r,a,o=0,c=null)=>tt(pn(s,e,t,o),n,i,r,a,c),Xt=(s,e,t,n,i,r,a,o=null,c=16)=>tt(new tn(s,e,t,c),n,i,r,a,o),ch=(s,e,t,n,i,r,a=null)=>tt(new jn(s,e,7,30),t,n,i,r,a),pr=s=>new Qe(Pn(s),$f),qn="#506272",ls="#e4aa48",Ho="#f6dda0",vi="#394655",jf="#b78053",Qw=Pe.clamp;function zb(s){let e=[],t=[];if(s==="glass"){e.push(dt(3.87,.17,.83,jf,0,.11,0,.04),dt(3.83,.28,.075,qn,0,.26,.38,.025));for(let n of[-1.79,1.79])e.push(dt(.15,.62,.77,vi,n,.35,0,.03));for(let[n,i]of[0,-1.12,1.12].entries()){let r=n===0?1.14:.91,a=[Xt(.38,.32,.12,"#176c72",i,.23,0),Xt(.38,.38,r*.59,"#45bdb3",i,.28+r*.29,0),Xt(.13,.38,r*.32,"#7ae1cc",i,.28+r*.74,0),Xt(.13,.13,.22,"#309994",i,.34+r*.93,0),Xt(.167,.167,.09,"#f7cf7a",i,.46+r*.93,0),Xt(.39,.39,.14,"#f7edbe",i,.37+r*.3,0),dt(.06,r*.34,.045,"#ddfff2",i-.21,.48+r*.38,.3,.015,ei(0,0,-.12))];t.push(pr(a))}}else if(s==="crates"){e.push(dt(3.89,.15,.91,vi,0,.09,0,.035));for(let[n,i]of[0,-1.24,1.24].entries()){let r=n===0?1.35:.96,a=[dt(1.18,r,.78,n?"#b77d49":"#cf925c",i,.17+r/2,0,.065)];for(let o of[-1,1]){a.push(dt(.105,r,.085,"#f0c685",i+o*.48,.17+r/2,.4,.013),dt(1.14,.078,.085,"#704d3c",i,.17+r*(o>0?.9:.12),.405,.012),yn([i+o*.46,.27,.46],[i-o*.46,r+.04,.46],.052,"#ebc188",6));for(let c of[.3,r+.01])a.push(Xt(.038,.038,.022,qn,i+o*.48,c,.458,ei(Math.PI/2),8))}t.push(pr(a))}}else{e.push(dt(3.89,.16,.92,vi,0,.09,0,.05),dt(3.84,1.12,.6,"#56697b",0,.71,0,.06));for(let n=0;n<5;n++)e.push(dt(3.62,.12,.14,n%2?"#8ea3ad":"#a7b7bf",0,.29+n*.21,.3,.025));for(let n of[-1.79,1.79]){e.push(dt(.21,1.37,.7,qn,n,.67,0,.04));for(let i of[.3,.73,1.14])e.push(dt(.22,.14,.06,"#f2bc59",n,i,.369,0,ei(0,0,.18)))}e.push(dt(.93,.74,.14,vi,0,.8,.36,.055),ch(.258,.067,"#ffb94e",0,.83,.46),Xt(.15,.15,.06,"#ee702e",0,.83,.47,ei(Math.PI/2),16))}return e.push(dt(1.13,.32,.08,vi,0,.23,.455,.035)),{base:pr(e),sections:t}}function kb(){let s=[dt(1.52,1.19,1.24,"#a97748",0,.82,0,.055),dt(1.68,.15,1.39,qn,0,.25,0,.033),dt(1.65,.12,1.38,"#66737b",0,1.46,0,.03),dt(1.58,.25,.074,"#ffc76c",0,1.12,.631),ch(.175,.046,ls,0,1.66,0)];for(let c of[-1,1]){s.push(dt(.18,1.34,1.32,"#495866",c*.61,.86,0,.025)),s.push(dt(.23,.17,1.48,vi,c*.52,.11,0,.03));for(let l of[.39,1.32])s.push(Xt(.047,.047,.045,Ho,c*.61,l,.669,ei(Math.PI/2),8));s.push(yn([c*.48,.44,.644],[-c*.47,.95,.644],.046,"#ddbb89",6))}for(let c=-2;c<=2;c++)s.push(dt(.09,.24,.02,vi,c*.22,1.12,.676,0,ei(0,0,-.42)));let e=[];for(let c=0;c<12;c++){let l=c*Math.PI/6,h=new Ss(.95,1,8,1,l+.035,Math.PI/6-.07);if(h.rotateX(-Math.PI/2),e.push(tt(h,c%3?"#ffbb49":"#fff0aa",0,.013,0)),c%3===0){let d=new Ki(.075,.17,3);d.rotateX(Math.PI/2),d.rotateY(Math.PI/2+l),e.push(tt(d,"#fff0aa",Math.cos(l)*.87,.01,-Math.sin(l)*.87))}}let t=new Mt({vertexColors:!0,toneMapped:!1,depthWrite:!1}),n=new Qe(Pn(e),t);n.renderOrder=3;let i=new to(1,48);i.rotateX(-Math.PI/2);let r=new Qe(i,new Mt({color:"#ff7e31",transparent:!0,opacity:.13,depthWrite:!1}));r.renderOrder=2;let a=new Ss(.96,1,48);a.rotateX(-Math.PI/2);let o=new Qe(a,new Mt({color:"#fff0a4",transparent:!0,opacity:.77,depthWrite:!1}));return o.renderOrder=3,{base:pr(s),halo:n,tint:r,sweep:o}}function Hb(s,e=4.4,t=1,n){if(s==="cover")return zb(n);if(s==="skyfall")return kb();let i=[],r=[],a=[];if(s==="gap"||s==="bridge"){let o=e/2;for(let l of[-1,1]){i.push(dt(4.22,.43,.25,qn,0,-.2,l*(o+.04),.035));for(let h=-3;h<=3;h++)i.push(dt(.29,.025,.19,h%2?ls:vi,h*.53,.025,l*(o+.21),0,ei(0,.23,0)));for(let h of[-1,1]){let d=h*1.97;i.push(dt(.2,.83,.24,vi,d,-.39,l*o,.025),yn([d,-.85,l*o],[d,-.1,l*(o+.65)],.055,qn))}}let c=Math.round(e/.4);for(let l=0;l<c;l++){let h=(l+.5)*e/c;r.push(dt(4.03,.14,e/c-.025,l%3===0?"#c59762":jf,0,.01,h,.018));for(let d of[-1.54,1.54])r.push(Xt(.056,.056,.015,qn,d,.085,h,null,7))}for(let l of[-1.5,1.5])r.push(dt(.19,.28,e,qn,l,-.14,o,.024));if(s==="bridge"){for(let l of[-1,1]){let h=l*1.92;i.push(dt(.21,1.72,.34,qn,h,.82,-o,.04),Xt(.23,.23,.12,ls,h,1.68,-o,ei(0,0,Math.PI/2)),yn([h,.12,-o-.42],[h,1.3,-o],.054,Ho))}i.push(Xt(.16,.16,3.9,qn,0,.11,-o,ei(0,0,Math.PI/2))),i.push(dt(1.33,.61,.41,qn,0,.33,o+.24,.055),dt(1.45,.09,.48,ls,0,.64,o+.24,.025))}else for(let l=0;l<5;l++)i.push(yn([l*.63-1.25,-.11,-o],[l*.63-1.21,-.18,-o+.28+l%2*.18],.024,qn,6))}else if(s==="cache"){for(let o=0;o<3;o++)for(let c=0;c<5;c++){let l=["#af7149","#ba8051","#cf955f","#a56745"];i.push(dt(.643,.366,.65,l[(c+2*o)%4],(c-2)*.665,.22+o*.385,0,.033))}for(let o of[-1.53,1.53]){i.push(dt(.17,1.24,.75,ls,o,.6,0,.035));for(let c of[.19,.57,1.02])i.push(Xt(.047,.047,.034,Ho,o,c,.389,ei(Math.PI/2),8))}i.push(dt(3.38,.11,.72,vi,0,1.18,0,.025),dt(1.7,.61,.07,vi,0,.63,.345,.055))}else if(s==="coil"){i.push(Xt(.78,.9,.22,qn,0,.12,0,null,28),Xt(.26,.34,.96,"#b2d5ce",0,.68,0,null,28));for(let o=0;o<7;o++)i.push(ch(.39-o*.016,.044,o%2?"#cc8548":"#f3b867",0,.3+o*.115,0,ei(Math.PI/2)));i.push(Xt(.25,.3,.2,ls,0,1.19,0),tt(new $i(.21,1),"#96ffff",0,1.39,0))}else if(s==="belt"){i.push(dt(3.9,.065,e,"#697981",0,.035,0,.045));for(let o of[-1.92,1.92])i.push(dt(.1,.11,e,ls,o,.074,0,.022));for(let o=0;o<11;o++)i.push(dt(3.74,.045,.055,"#475765",0,.08,(o-5)*e/11));for(let o=0;o<5;o++)for(let c of[-1,1])a.push(yn([-.24*t,.107,(o-2)*1.53+c*.3],[.24*t,.107,(o-2)*1.53],.052,Ho,6))}return{base:pr(i),deck:r.length?pr(r):null,arrows:a.length?pr(a):null}}function Gb(){let s=document.createElement("canvas");s.width=320,s.height=104;let e=s.getContext("2d"),t=new Gn(s);t.colorSpace=yt;let n=new Qe(new Vt(1.56,.51),new Mt({map:t,transparent:!0,depthWrite:!1,toneMapped:!1})),i="";return{mesh:n,label(r){r!==i&&(i=r,e.clearRect(0,0,320,104),e.font='900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif',e.textAlign="center",e.textBaseline="middle",e.lineWidth=9,e.strokeStyle="#2e3b48",e.strokeText(r,160,56),e.fillStyle="#fff3cf",e.fillText(r,160,56),t.needsUpdate=!0)},dispose(){t.dispose(),n.geometry.dispose(),n.material.dispose()}}}function Ym(s){let e=s.getAttribute("color"),t=new Se("#14243d"),n=new Se("#8294ab"),i=new Se,r=new Se;for(let a=0;a<e.count;a++){i.fromBufferAttribute(e,a);let o=i.r*.213+i.g*.715+i.b*.072;r.lerpColors(t,n,Math.sqrt(o)),i.lerp(r,.79),e.setXYZ(a,i.r,i.g,i.b)}return s}function Vb(s){let e=br[s],t=[];for(let n of[-1,1]){let i=n*6.68;if(t.push(dt(.25,4.6,.38,e.frame,i,-2.36,0,.025),yn([i,-2.4,0],[i,-.3,2.1],.085,e.frame)),s==="timber"){for(let r of[0,.45])t.push(Xt(.13,.18,2,"#956b48",i+n*r,-.4,1.3+r,null,9));t.push(yn([i,.32,1.3],[i,.28,4.9],.046,"#bda77e"));for(let[r,a]of[[2.1,1.8],[1.5,3]]){t.push(Xt(.15,.19,1.8,jf,i+n*a,-3,1+a,null,7));for(let o=0;o<3;o++)t.push(tt(new Ki(.77-o*.18,r*.57,8),["#477b62","#599170","#79a181"][o],i+n*a,-2.65+o*.45,1+a))}}else if(s==="quarry"||s==="cinder"||s==="ice"){for(let r=0;r<4;r++){let a=new Ki(.58+r*.13,1.4+r%2*1.3,s==="ice"?5:7);t.push(tt(a,s==="ice"?["#85bdce","#b2dce4"][r%2]:r%2?e.frame:e.joint,i+n*(1+r*.55),-2.5+.28*r,r*1.35,ei(.09*r,.6*r,n*.16)))}s==="cinder"&&t.push(Xt(.23,.34,.49,"#c78047",i,-.02,0),Xt(.18,.21,.14,"#ffcb76",i,.28,0))}else s==="forge"?t.push(Xt(.28,.28,3.5,"#657f8e",i+n*.36,-.53,.4,ei(Math.PI/2)),ch(.32,.056,ls,i+n*.36,-.53,1.75),dt(.46,.51,.44,qn,i,.21,0,.045)):(t.push(Xt(.18,.24,.48,"#737f85",i,.13,0),Xt(.27,.25,.11,ls,i,.42,0)),t.push(Xt(.34,.48,.58,"#c16649",i+n*1.6,-3.07,1.6),Xt(.18,.3,.23,Ho,i+n*1.6,-2.68,1.6)))}return Pn(t)}function Zm(s,e=new mt){let t=Array.from({length:10},()=>new mt(0,-1e3,0,0));function n(_){_.onBeforeCompile=b=>{b.uniforms.roadCuts={value:t},b.vertexShader=b.vertexShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
deckPosition=(modelMatrix*vec4(transformed,1.)).xyz;`),b.fragmentShader=b.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition; uniform vec4 roadCuts[10];`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
for(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}`)}}let i=new Qe(new Vt(140,154),new zt({uniforms:{deep:{value:new Se},crest:{value:new Se},clock:{value:0},origin:{value:0},biome:{value:0},roadCurve:{value:e}},vertexShader:"varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",fragmentShader:`${Kf}
      varying vec3 pos; uniform vec3 deep, crest; uniform float clock, origin, biome;
      void main(){
        vec2 q=vec2(pos.x,pos.z-origin);
        float swell=sin(q.x*.78+clock*.30)*.9+sin(q.x*.29-q.y*.19)*.54;
        float wave=sin(q.y*2.1+swell+clock*.56)+.45*sin(q.x*.82-q.y*1.8-clock*.31);
        float shelf=smoothstep(-.8,.95,sin(q.x*.27+q.y*.21)+.47*sin(q.x*.5-q.y*.24));
        float foam=smoothstep(1.17,1.44,wave)*(.06+.13*shelf);
        float gleam=.05+.11*shelf+foam;
        if(biome>1.5){
          float seam=abs(sin(q.x*.68+sin(q.y*.91)+q.y*.64));
          gleam=.035+.09*shelf+(.28+.115*sin(clock*.9+q.y*.7))*(1.-smoothstep(0.,.085,seam));
        }else if(biome>.5){
          float seam=abs(sin(q.x*.82+q.y*.6+sin(q.y*.55)));
          gleam=.10+.17*shelf+.12*(1.-smoothstep(0.,.075,seam))+foam*.2;
        }
        float shore=abs(q.x-lateralBend(pos.z));
        vec3 c=mix(deep,crest,clamp(gleam,0.,1.));
        c*=mix(.62,1.,smoothstep(5.6,9.7,shore));
        gl_FragColor=vec4(c,1.);
      #include <colorspace_fragment>
      }`}));i.rotation.x=-Math.PI/2,i.position.set(0,-3.7,-43),i.material.userData.unbent=!0,s.add(i);let r=new Map,a=new Map,o=new Map,c=new Map,l=new We,h,d,f=new tn(.035,.035,1,8),u=new Ot({color:11246457}),p=new N,x=new N,g=new N,m=new N(0,1,0);function v(_){let b=[_.kind,_.variant||"",_.length||0,_.direction||0].join(":");r.has(b)||r.set(b,Hb(_.kind,_.length,_.direction,_.variant));let S=r.get(b),y=new It,E=S.base.clone();y.add(E);let A=(S.sections||[]).map(V=>V.clone());for(let V of A)y.add(V);let R,L,z,X;if(S.halo){X={halo:S.halo.clone(),tint:S.tint.clone(),sweep:S.sweep.clone()};for(let V of Object.values(X))y.add(V);X.tint.position.y=.038,X.halo.position.y=.044,X.sweep.position.y=.048}let U=[];if(S.deck&&(R=S.deck.clone(),R.position.z=-_.length/2,y.add(R)),S.arrows&&(L=S.arrows.clone(),y.add(L)),(_.kind==="cache"||_.kind==="bridge"||_.kind==="coil"||_.kind==="cover")&&(z=Gb(),y.add(z.mesh),z.mesh.position.set(0,_.kind==="cover"?.25:_.kind==="cache"?.66:_.kind==="coil"?.55:.43,_.kind==="cover"?.512:_.kind==="bridge"?_.length/2+.48:_.kind==="coil"?.56:.397),_.kind==="cover"&&z.mesh.scale.setScalar(.78)),_.kind==="bridge")for(let V=0;V<2;V++){let H=new Qe(f,u);y.add(H),U.push(H)}return s.add(y),{g:y,base:E,leaf:R,arrows:L,chains:U,sections:A,label:z,drop:X}}function M(_){let b=_.route.theme;if(b!==h){if(h&&(a.get(h).visible=!1,o.get(h).visible=!1),h=b,!a.has(b)){let A=new Zt(Ym(Vb(b)),$f,10);A.frustumCulled=!1;let R=new Zt(Ym(qm(b)),$f,3);R.frustumCulled=!1,o.set(b,R),s.add(R),a.set(b,A),s.add(A)}a.get(b).visible=!0,o.get(b).visible=!0,i.material.uniforms.biome.value=b==="cinder"?2:b==="ice"?1:0,i.material.uniforms.deep.value.set(br[b].deep),i.material.uniforms.crest.value.set(br[b].glint)}let S=o.get(b);for(let A=0;A<S.count;A++)S.setMatrixAt(A,l.makeTranslation(0,0,-36-A*47+_.distance%47));S.instanceMatrix.needsUpdate=!0;let y=a.get(b);for(let A=0;A<10;A++)y.setMatrixAt(A,l.makeTranslation(0,0,12-A*10+_.distance%10));if(y.instanceMatrix.needsUpdate=!0,i.material.uniforms.clock.value=_.elapsed,i.material.uniforms.origin.value=_.distance,_.features!==d){for(let A of c.values())A.g.removeFromParent(),A.label?.dispose();c.clear(),d=_.features}let E=0;for(let A of _.features){if(A.z<-68||A.z>14){let L=c.get(A);L&&(L.g.visible=!1);continue}let R=c.get(A)||v(A);if(c.set(A,R),R.g.visible=!0,R.g.position.set(A.x,0,A.z),R.drop){let L=A.state==="warning",z=A.state==="landed";if(R.g.visible=L||z&&A.age<.85,!R.g.visible)continue;let X=A.fallProgress||0,U=A.age,V=A.radius;if(R.drop.halo.visible=R.drop.tint.visible=L,R.drop.halo.scale.setScalar(V),R.drop.tint.scale.setScalar(V),R.drop.sweep.visible=L||U<.38,R.drop.sweep.scale.setScalar(V*(L?.1+.88*A.progress:1+.77*Pe.smoothstep(U,0,.38))),R.base.visible=!0,L){let H=7.9+10*(1-Pe.smoothstep(A.progress,.08,.71));R.base.position.y=H*(1-X*X),R.base.rotation.set(.12*(1-X),.39*(1-X),.13*(1-X)),R.base.scale.setScalar(1)}else{let H=Math.sin(U*20)*Math.exp(-U*10);R.base.position.y=Math.abs(H)*.32,R.base.rotation.set(.08*H,0,.14*H),R.base.scale.setScalar(1-Pe.smoothstep(U,.34,.83))}}if(A.kind==="cover"){let L=A.hp/A.maxHp;R.sections.forEach((z,X)=>{z.visible=L>X*.34}),R.g.rotation.z=Math.sin(A.age*95)*A.flash*.033}if(_.parade&&A.kind!=="bridge"&&A.kind!=="gap"&&(R.g.position.y-=1.8*Pe.smoothstep(_.endTime,0,.48),_.endTime>=.49&&(R.g.visible=!1)),A.kind==="gap"||A.kind==="bridge"){_.parade&&(R.exitAngle??(R.exitAngle=R.leaf.visible?R.leaf.rotation.x:Math.PI/2),R.leaf.position.y=.03),E<t.length&&t[E++].set(A.x,A.z,4.4/2-.055,A.length/2),R.leaf.visible=!!_.parade||A.kind==="bridge"||A.state==="repaired";let L=Pe.smoothstep(A.age,0,.58);R.leaf.rotation.x=_.parade?R.exitAngle*(1-Pe.smoothstep(_.endTime,0,.45)):A.state==="cut"?-.2+1.6*L:A.state==="ready"&&A.kind==="bridge"?-.2:A.state==="linked"?-.2*(1-L):0,A.state==="repaired"&&(R.leaf.position.y=.03+.22*(1-L));for(let z=0;z<R.chains.length;z++){let X=R.chains[z],U=(z?1:-1)*1.83;X.visible=A.state!=="cut"&&A.state!=="repaired",p.set(U,1.63,-A.length/2),x.set(U,-Math.sin(R.leaf.rotation.x)*A.length+.1,-A.length/2+Math.cos(R.leaf.rotation.x)*A.length),g.subVectors(x,p),X.scale.y=g.length(),X.position.copy(p).lerp(x,.5),X.quaternion.setFromUnitVectors(m,g.normalize())}}R.arrows&&(R.arrows.position.x=Math.sin(_.elapsed*5)*.39*A.direction),R.label&&(R.label.mesh.visible=A.state==="ready",R.label.mesh.visible&&R.label.label((A.kind==="cover"?"":A.kind==="bridge"?"\u65AD\u7D22 ":A.kind==="coil"?"\u7535 ":"\u7BB1 ")+Math.ceil(A.hp))),(A.kind==="cache"||A.kind==="coil"||A.kind==="cover")&&A.state!=="ready"&&R.base.scale.setScalar(1-Pe.smoothstep(A.age,0,.24))}for(let A=E;A<t.length;A++)t[A].set(0,-1e3,0,0)}return{cutDeck:n,update:M}}var Qf=13.2,mr=14,ya=-110,ed=mr-ya,_a=(mr+ya)/2,td=-.18;function Km(s){let e=br[s],t=parseInt(e.floor.slice(1),16),n=document.createElement("canvas");n.width=512,n.height=384;let i=n.getContext("2d"),r=i.createImageData(n.width,n.height),a=941;for(let l=0;l<n.height;l++)for(let h=0;h<n.width;h++){a=Math.imul(1664525,a)+1013904223>>>0;let d=(a/4294967296-.5)*3,f=Math.min(h,n.width-1-h),u=d+.7*Math.cos(h*.069+Math.sin(l*.049))-Math.max(0,1-f/12)*16,p=(l*n.width+h)*4;r.data[p]=(t>>16)+u,r.data[p+1]=(t>>8&255)+u,r.data[p+2]=(t&255)+u,r.data[p+3]=255}i.putImageData(r,0,0),i.scale(2,2),i.fillStyle="rgba(81,74,91,.13)",i.fillRect(0,0,n.width,1.5),i.fillStyle="rgba(249,243,249,.20)",i.fillRect(0,2,n.width,1);for(let l of[7,249])for(let h of[9,183])i.fillStyle="#a59aa4",i.fillRect(l-1,h-1,2.5,2.5);let o=(l,h,d,f,u,p=1)=>{i.strokeStyle=u,i.lineWidth=p,i.beginPath(),i.moveTo(l,h),i.lineTo(d,f),i.stroke()};if(s==="quay"){for(let l of[21,63,105,149,193,235]){let h=i.createLinearGradient(l-6,0,l+6,0);h.addColorStop(0,"rgba(93,91,91,0)"),h.addColorStop(.48,"rgba(76,72,94,.043)"),h.addColorStop(1,"rgba(93,91,91,0)"),i.fillStyle=h,i.fillRect(l-6,0,12,192)}o(0,96,256,96,"rgba(91,87,102,.18)",1.05),o(0,97.5,256,97.5,"rgba(255,249,248,.24)");for(let[l,h]of[[6,41],[246,137]]){i.fillStyle="#92909e",i.fillRect(l,h,4.1,13);for(let d=1;d<13;d+=2)o(l+.45,h+d,l+3.7,h+d,"#6e7180",.72)}for(let[l,h]of[[28,5],[112,100],[228,100]])o(l,h,l+3,h+2,"rgba(84,87,92,.24)",.75),o(l+3,h+2,l+6,h+1,"rgba(84,87,92,.19)",.6)}else if(s==="timber")for(let l=0;l<8;l++){let h=l*24;o(0,h,256,h,e.joint,1.35),o(0,h+2,256,h+2,e.rim,.7);for(let d=0;d<4;d++){let f=(l*41+d*71)%244;i.strokeStyle="rgba(102,91,110,.15)",i.beginPath(),i.moveTo(f,h+12),i.bezierCurveTo(f+13,h+6,f+17,h+15,f+38,h+10),i.stroke()}}else if(s==="forge")for(let l=0;l<3;l++)for(let h=0;h<4;h++){let d=l*85+7,f=h*48+5;i.strokeStyle=e.joint,i.strokeRect(d,f,71,35);for(let u=0;u<4;u++)o(d+7+u*4,f+26,d+12+u*4,f+19,"#9a99aa")}else if(s==="quarry"||s==="cinder")for(let l=0;l<4;l++){let h=l*48;o(0,h,256,h+1,e.joint,1.1);for(let d=0;d<4;d++){let f=d*76+l%2*32;o(f,h,f+2,h+48,e.joint)}}else if(s==="ice")for(let l=0;l<12;l++){let h=l*63%249,d=l*47%175;o(h,d,h+14,d+13,"#d8dfe9",1.4),o(h+7,d+7,h+17,d+6,"#adb9c9")}for(let l of[-1,1]){let h=l<0?1.6:250.6;i.fillStyle="rgba(46,55,64,.32)",i.fillRect(h,0,3.8,192),i.fillStyle="rgba(228,224,237,.42)",i.fillRect(h+.7,0,.8,192);for(let d of[28,125])i.fillStyle="#737784",i.fillRect(h-.5,d,5.2,10),i.fillStyle=e.rim,i.fillRect(h+.65,d+2.1,2.7,3.7)}for(let l of[256/3,512/3]){i.fillStyle=e.line,i.fillRect(l-1.45,0,2.9,192),i.fillStyle=e.rim,i.fillRect(l-.15,0,.96,192);for(let h=7;h<192;h+=48)i.fillRect(l-1.25,h,2.5,9)}let c=new Gn(n);return c.colorSpace=yt,c.wrapT=Ei,c.anisotropy=4,c.repeat.y=ed/8,c}function Wb(s,e){let t=new Map,n,i=Km("quay");t.set("quay",i);let r=new Qe(new Vt(Qf,ed,1,100),new po({map:i}));r.rotation.x=-Math.PI/2,r.position.set(0,0,_a),r.receiveShadow=!0,s.add(r);let a=(l,h)=>new Un(l,h,ed,1,1,100),o=[tt(a(Qf+.13,.38),"#535568",0,-.205,_a)];for(let l of[-1,1]){let h=l*Qf/2;o.push(tt(a(.13,.19),"#7c7b8a",h,.018,_a)),o.push(tt(a(.095,.042),"#a6a1af",h+l*.01,.121,_a)),o.push(tt(a(.055,.22),"#444759",h+l*.074,-.14,_a)),o.push(tt(a(.048,.022),"#8b8391",h-l*.085,.006,_a))}let c=new Qe(Pn(o),new Ot({vertexColors:!0,shininess:18}));return s.add(c),e.cutDeck(r.material),e.cutDeck(c.material),l=>{let h=l.route.theme;t.has(h)||t.set(h,Km(h)),n!==h&&(r.material.map=t.get(h),n=h),r.material.map.offset.y=l.distance/8%1}}function Jm(s,e){let t=[],n=[];function i(a,o,c,l,h,d,f,u){let p=c/2,x=[[-p,0],[p,0],[p+h,-l],[-p+h,-l]],g=[[-p+u,-u],[p-u,-u],[p+h-u,-l+u],[-p+h+u,-l+u]],m=[...x,...g],v=[0,0,0,0,d,d,f,f],M=[4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7];for(let _ of M){let b=m[_];t.push(a+b[0],.008,o+b[1]),n.push(1,1,1,v[_])}}i(0,.1,s*1.01,e*.87,e*.92,.32,.22,.045),i(0,.17,s+.06,.32,.028,.2,.16,.07);let r=new _t;return r.setAttribute("position",new Xe(t,3)),r.setAttribute("color",new Xe(n,4)),r}function Xb(s,e,t){let n=wn[e].tone==="gold",i=zi,r=1.09,a=.17,o=n?"#efbf12":"#217cde",c=n?"#9c7a19":"#245ba4",l=n?"#ffec66":"#83ceff",h=[],d=[tt(pn(i-.1,r,a,.047),o,0,r/2,0)];for(let b of[-1,1]){let S=b*(i/2-.046);d.push(tt(pn(.085,r+.087,.205),l,S,r/2+.021,0)),h.push(tt(pn(.23,.13,.4,.035),c,S,.065,.058)),d.push(tt(pn(.13,.19,.23,.027),c,S,r-.04,0)),d.push(tt(pn(.115,.044,.24),l,S,r-.09,0))}d.push(tt(pn(i-.16,.047,.123),l,0,r-.012,-.003));let f=Pn(d);f.rotateX(td),f.translate(0,.059,.015);let u=Pn([f,...h]),p=new Vt(i-.19,r-.086);p.translate(0,r/2+.007,a/2+.004),p.rotateX(td),p.translate(0,.059,.015);let x=[u,p,Jm(i,r)],g=[new Ot({vertexColors:!0,shininess:52,specular:6775634}),new Mt({map:Wm(e),toneMapped:!1}),t],m=16,v,M=new We;function _(b){if(v)for(let S of v)s.remove(S),S.dispose();m=b,v=x.map((S,y)=>{let E=new Zt(S,g[y],m);return E.count=0,E.frustumCulled=!1,y===2&&(E.renderOrder=1),s.add(E),E}),v[0].instanceMatrix.setUsage(un);for(let S of v.slice(1))S.instanceMatrix=v[0].instanceMatrix}return _(m),(b,S)=>{let y=0;for(let A of b)(A.active||A.pop<.28)&&A.type===e&&A.z>=ya&&A.z<mr&&y++;y>m&&_(Pe.ceilPowerOfTwo(y));let E=0;for(let A of b){if(!A.active&&!(A.pop<.28)||A.type!==e||A.z<ya||A.z>=mr)continue;let R=A.active?0:A.pop/.28,L=(1+.24*Math.sin(Math.PI*R)+A.flash*.065)*(1-R*R);M.makeScale(L,L*(1-S)*(1+.18*Math.sin(R*Math.PI)),L),M.setPosition(A.x+.22*(A.x<0?1:-1)*R,Math.sin(R*Math.PI)*.38-S*.13,A.z),v[0].setMatrixAt(E++,M)}for(let A of v)A.count=E;v[0].instanceMatrix.needsUpdate=E>0}}var qb=[[[[-.72,1.01],[-1.01,1.09],[-1.19,1.01],[-1.41,1.17]],[[-1.01,1.09],[-.93,1.24],[-1.02,1.39],[-.89,1.56]],[[-1.19,1.01],[-1.32,.86],[-1.51,.81]]],[[[-1.41,1.17],[-1.59,1.12],[-1.74,1.22],[-1.96,1.2]],[[-.72,1.01],[-.83,.82],[-.69,.66],[-.72,.53],[-.51,.31],[-.58,.15]],[[.48,1.18],[.65,1.33],[.82,1.36],[.95,1.56]],[[.65,1.33],[.72,1.08],[.98,.68],[1.19,.63],[1.38,.43]]],[[[.98,.68],[1.21,.88],[1.41,.8],[1.63,.97],[1.9,.9]],[[1.19,.63],[1.1,.42],[1.2,.31],[1.12,.12]],[[-.72,.53],[-1.03,.51],[-1.21,.37],[-1.47,.4]],[[-1.02,1.39],[-1.29,1.42],[-1.46,1.56]]]];function Yb(s){let e=[];for(let t of s)for(let n=1;n<t.length;n++){let[i,r]=t[n-1],[a,o]=t[n],c=Math.hypot(a-i,o-r)+.018,l=new Gt(0,0,Math.atan2(o-r,a-i)),h=n===1?.039:.031;e.push(tt(new Vt(c,h),"#302e39",(i+a)/2,(r+o)/2,.227,l)),e.push(tt(new Vt(c,h*.38),"#e3dee1",(i+a)/2,(r+o)/2+h*.41,.229,l))}return Pn(e)}function Zb(s,e){let t=new It;s.add(t);let n=4.28,i=1.65,r=[tt(pn(n-.08,i-.08,.39,.057),"#61616d",0,i/2,0)];for(let x of[-1,1]){let g=x*(n/2-.085);r.push(tt(pn(.165,i,.47,.038),"#858493",g,i/2,0)),r.push(tt(pn(.14,i-.12,.032),"#9998a4",g,i/2,.228));for(let m of[.15,i-.16]){let v=new Gt(Math.PI/2,0,0);r.push(tt(new tn(.074,.074,.023,10),"#40414e",g,m,.254,v)),r.push(tt(new tn(.052,.061,.032,6),"#a9a8af",g,m,.273,v))}}for(let x of[.084,i-.079])r.push(tt(pn(n-.28,.11,.43,.019),"#898795",0,x,0));let a=document.createElement("canvas");a.width=256,a.height=112;let o=a.getContext("2d"),c=new Gn(a);c.colorSpace=yt;let l=new Qe(new Vt(1.8,.79),new Mt({map:c,transparent:!0,depthWrite:!1,toneMapped:!1}));l.position.set(0,.84,.253),t.add(l);let h,d=new Ot({vertexColors:!0,shininess:36,specular:6841713,emissive:16774637,emissiveIntensity:0});t.add(new Qe(Pn(r),d));let f=new Qe(Jm(n,i),e);f.renderOrder=1,t.add(f);let u=new Mt({vertexColors:!0}),p=qb.map(x=>{let g=new Qe(Yb(x),u);return t.add(g),g});return x=>{if(t.visible=!!(x&&x.hp>0&&x.z>=ya&&x.z<mr),!t.visible)return;t.position.set(x.x,0,x.z);let g=Math.ceil(x.hp);g!==h&&(o.clearRect(0,0,a.width,a.height),o.font='900 102px "Arial Black",sans-serif',o.textAlign="center",o.textBaseline="middle",o.lineWidth=9,o.strokeStyle="#333340",o.strokeText(String(g),128,60),o.fillStyle="#f4edf0",o.fillText(String(g),128,60),c.needsUpdate=!0,h=g);let m=x.hp/Math.max(1,x.maxHp);d.emissiveIntensity=Math.sqrt(Pe.clamp(x.flash||0,0,1))*.35,p[0].visible=m<.93,p[1].visible=m<=.67,p[2].visible=m<=.36}}function $m(s,e){let t=new It;t.name="Course",s.add(t);let n=Zm(t,e),i=Wb(t,n),r=new Mt({color:3158603,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),a=Object.keys(wn).map(p=>Xb(t,p,r)),o=new Zt(new Un(1,.073,.065),new Mt,80);o.frustumCulled=!1,t.add(o);let c=new We,l=new Se("#253347"),h=new Se("#9ff9d9"),d=Pn([tt(pn(.43,.32,.1,.04),"#3e505d",0,0,.01),tt(new jn(.132,.045,7,18,Math.PI),"#ffe3a2",0,.13,.04),tt(pn(.12,.1,.022,.017),"#f3be63",0,0,.072)]),f=new Zt(d,new Ot({vertexColors:!0}),40);f.frustumCulled=!1,f.instanceMatrix.setUsage(un),t.add(f);let u=Zb(t,r);return{update(p){let{gates:x,wall:g}=p;n.update(p),i(p);let m=p.parade?Pe.smoothstep(p.endTime,0,.4):0;for(let _ of a)_(m===1?[]:x,m);let v=0,M=0;for(let _ of x){if(!p.parade&&_.active&&_.cover?.hp>0&&_.z>ya&&_.z<mr&&(c.makeRotationX(td).setPosition(_.x+zi/2-.35,.72,_.z+.18),f.setMatrixAt(M++,c)),p.parade||!_.active||_.hp>=_.maxHp||_.z<-45||_.z>mr)continue;let b=zi-.38,S=b*_.hp/_.maxHp;for(let[y,E,A,R]of[[b,_.x,_.z+.18,l],[S,_.x-(b-S)/2,_.z+.22,h]])c.makeScale(y,1,1).setPosition(E,.13,A),o.setMatrixAt(v,c),o.setColorAt(v++,R)}f.count=M,f.instanceMatrix.needsUpdate=M>0,o.count=v,v&&(o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0),u(g)},dispose(){let p=new Set,x=new Set,g=new Set;t.traverse(m=>{m.isMesh&&(p.add(m.geometry),x.add(m.material),m.material.map&&g.add(m.material.map),m.isInstancedMesh&&m.dispose())}),t.removeFromParent();for(let m of p)m.dispose();for(let m of x)m.dispose();for(let m of g)m.dispose()}}}var Kb=new Vt(1,1),nd=new pi(1,16,10),Go=s=>new Mt({color:s,toneMapped:!1}),Jb=new Ot({color:4213080,shininess:65}),id=Go(16760162),jm=Go(13565951),sd=new N,lT=new N,$b=new N(0,1,0),rd=Pe.clamp;function jb(){return new zt({uniforms:{ink:{value:new Se},style:{value:0},time:{value:0},progress:{value:0},after:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 tex;uniform vec3 ink;uniform float style,time,progress,after;
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
    }`})}function Li(s,e,t){let n=new Qe(s,e);return t.add(n),n}function Qb(s,e,t,n){sd.subVectors(t,e);let i=sd.length();s.position.copy(e).lerp(t,.5),s.scale.set(n,i,n),s.quaternion.setFromUnitVectors($b,sd.normalize())}function eS(s){let e=new It;s.add(e);let t=jb(),n=Li(Kb,t,e);n.renderOrder=3;let i=new It;e.add(i);let r=new Ot({color:3330759,emissive:1210479,transparent:!0,opacity:.8,shininess:90});Li(nd,r,i).scale.set(.42,.28,.45);let a=Li(new jn(.46,.053,6,25,Math.PI*1.65),jm,i);a.rotation.x=-1.2;let o=new It;e.add(o),Li(nd,Jb,o).scale.set(.235,.29,.235),Li(new jn(.235,.04,6,20),id,o).rotation.x=1.3;let l=Li(nd,id,o);l.position.y=.22,l.scale.setScalar(.12);let h=Li(new tn(1,.2,1,12,1,!0),new Mt({color:6478335,transparent:!0,opacity:.41,toneMapped:!1,depthWrite:!1,side:Wt}),e),d=new It;e.add(d);let f=[Go("#e8beff"),Go("#ab65dd"),Go("#83eaff")];for(let x=0;x<7;x++){let g=Li(new Ki(1,1,5),f[x%2],d),m=x*2.4;g.position.set(Math.cos(m)*(.27+x*.05),.4,Math.sin(m)*(.27+x*.05)),g.rotation.set(Math.sin(m)*.32,x*.9,Math.cos(m)*.38),g.scale.set(.13+x%3*.035,.66+x%3*.35,.17)}let u=new It;e.add(u);for(let x=0;x<7;x++)Li(new nr(1),jm,u).scale.set(.055,.09,.28);let p=Li(new jn(1,.09,6,32,Math.PI*1.4),id,e);return p.rotation.x=-Math.PI/2,{root:e,mat:t,mark:n,bubble:i,shell:o,beam:h,ridge:d,streaks:u,wave:p}}function Qm(s){let e=Array.from({length:3},()=>eS(s)),t=new N,n=new N;return function(r){let a=r.skill;e.forEach((o,c)=>{let l=a?.marks[c];if(o.root.visible=!!l&&!r.defeated,!o.root.visible)return;let h=a.age-l.delay,d=yh(a,l),f=rd((h-a.warm-a.flight)/.62,0,1),u=h>=a.warm,p=d>=1,x=l.x-a.x,g=l.z-a.z,m=o.mat.uniforms;m.ink.value.set(zn[a.kind].color);let v=rd(h/a.warm,0,1);if(m.progress.value=u?d:v,m.after.value=f,m.time.value=a.age,m.style.value=l.shape==="circle"?0:l.shape==="strip"?1:2,o.mark.visible=h>=-.12&&f<1,l.shape==="circle")o.mark.rotation.set(-Math.PI/2,0,0),o.mark.scale.set(2*l.radius,2*l.radius,1),o.mark.position.set(l.x,.059,l.z);else{let S=Math.hypot(x,g),y=Math.atan2(x,g);o.mark.position.set((l.x+a.x)/2+Math.sin(y)*.82,.06,(l.z+a.z)/2+Math.cos(y)*.82),o.mark.rotation.order="YXZ",o.mark.rotation.set(Math.PI/2,y,0),o.mark.material.side=Wt,o.mark.scale.set(2*l.radius,S+1.64,1)}let M=u&&!p;o.bubble.visible=M&&a.kind==="diver",o.shell.visible=M&&a.kind==="engine";let _=o.bubble.visible?o.bubble:o.shell;if(_.visible){let S=a.x+(c?1:-1)*.8,y=a.kind==="engine"?4.6:.57;_.position.set(Pe.lerp(S,l.x,d),a.height*(1-d)+.17+Math.sin(Math.PI*d)*y,Pe.lerp(a.z,l.z,d)),_.rotation.y=d*7}let b=a.kind==="kestrel";if(o.beam.visible=b&&u&&f<.82,o.streaks.visible=o.beam.visible,o.beam.visible){let S=rd(d*1.25,0,1);t.set(a.x,a.height,a.z+.59),n.set(l.x,.34,l.z).lerp(t,1-S),Qb(o.beam,t,n,l.radius*(1-f*.55)),o.beam.material.opacity=(.31+.12*Math.sin(a.age*24))*(1-f),o.streaks.children.forEach((y,E)=>{let A=(a.age*1.9+E*.136)%1;y.position.copy(t).lerp(n,A),y.position.x+=Math.sin(E*1.8+a.age*11)*A*.78,y.position.y+=Math.cos(E*1.4+a.age*12)*A*.26})}o.ridge.visible=a.kind==="drill"&&p&&f<1,o.ridge.visible&&(o.ridge.position.set(l.x,.025,l.z),o.ridge.scale.set(1,Math.max(.02,Math.sin(Math.PI*Math.pow(f,.58))*1.35),1)),o.wave.visible=M&&(a.kind==="bruiser"||a.kind==="warden"),o.wave.visible&&(o.wave.position.set(a.x+x*d,.13,a.z+g*d),o.wave.scale.set(1.1+.37*d,.4+.25*d,1),o.wave.rotation.z=Math.atan2(x,g)-.59)})}}var ad=128,od=4,Te={glow:0,smoke:1,glint:2,wave:3,crack:4,plus:5,arrow:6,flash:7,goldWave:8,ember:9};function tS(){let s=document.createElement("canvas");s.width=s.height=ad*od;let e=s.getContext("2d");function t(a,o){e.save(),e.translate((a%od+.5)*ad,(Math.floor(a/od)+.5)*ad),o(),e.restore()}function n(a,o,c,l){let h=e.createRadialGradient(a,o,0,a,o,c);for(let[d,f]of l)h.addColorStop(d,f);e.fillStyle=h,e.fillRect(a-c,o-c,c*2,c*2)}let i="rgba(255,255,255,0)";t(Te.glow,()=>{n(0,0,57,[[0,"#fff"],[.18,"rgba(255,255,255,.94)"],[.43,"rgba(255,255,255,.41)"],[1,i]])}),t(Te.smoke,()=>{let a=[[-14,8,37],[18,8,32],[9,-13,32],[-15,-13,27],[3,3,40]];for(let[o,c,l]of a)n(o,c,l,[[0,"rgba(255,255,255,.62)"],[.38,"rgba(255,255,255,.42)"],[.77,"rgba(255,255,255,.13)"],[1,i]])}),t(Te.glint,()=>{n(0,0,44,[[0,"#fff"],[.16,"rgba(255,255,255,.9)"],[1,i]]),e.fillStyle="#fff",e.beginPath();for(let a=0;a<8;a++){let o=a*Math.PI/4,c=a%2?5:a%4?45:32,l=Math.cos(o)*c,h=Math.sin(o)*c;a===0?e.moveTo(l,h):e.lineTo(l,h)}e.closePath(),e.fill()}),t(Te.wave,()=>{n(0,0,60,[[0,i],[.7,i],[.78,"rgba(255,255,255,.26)"],[.86,"rgba(255,255,255,.94)"],[.9,"rgba(255,255,255,.60)"],[1,i]])}),t(Te.goldWave,()=>{n(0,0,58,[[0,"rgba(255,255,255,.25)"],[.41,"rgba(255,255,255,.08)"],[.66,i],[.81,"rgba(255,255,255,.18)"],[.88,"#fff"],[.92,"rgba(255,255,255,.65)"],[1,i]])}),t(Te.crack,()=>{n(0,0,40,[[0,"#c14d0d"],[.19,"rgba(158,63,22,.9)"],[.62,"rgba(80,52,51,.24)"],[1,"rgba(80,52,51,0)"]]);let a=783,o=()=>(a=a*16807%2147483647,a/2147483647);e.lineCap="round",e.lineJoin="round";for(let c=0;c<11;c++){let l=(c+o()*.55)*2*Math.PI/11,h=31+o()*29,d=0,f=0;for(let u=1;u<=4;u++){let p=l+(o()-.5)*.23,x=h*u/4,g=Math.cos(p)*x,m=Math.sin(p)*x;if(e.beginPath(),e.moveTo(d,f),e.lineTo(g,m),e.lineWidth=(5-u)*.62+.35,e.strokeStyle=u===1?"#793714":"#493e41",e.stroke(),u===2||u===3){let v=p+(o()>.5?.65:-.66);e.beginPath(),e.moveTo(g,m),e.lineTo(g+Math.cos(v)*9,m+Math.sin(v)*9),e.lineWidth=1,e.stroke()}d=g,f=m}}e.beginPath();for(let c=0;c<15;c++){let l=c*Math.PI*2/15,h=5+o()*10,d=Math.cos(l)*h,f=Math.sin(l)*h;c?e.lineTo(d,f):e.moveTo(d,f)}e.closePath(),e.fillStyle="#ff9021",e.fill()}),t(Te.plus,()=>{e.font="1000 80px Arial Black, Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.strokeStyle="#754508",e.lineWidth=9,e.strokeText("+1",0,6,110),e.strokeStyle="#422916",e.lineWidth=6.5,e.strokeText("+1",0,2,110);let a=e.createLinearGradient(0,-28,0,32);a.addColorStop(0,"#fff592"),a.addColorStop(.31,"#fff020"),a.addColorStop(1,"#ffbe00"),e.fillStyle=a,e.fillText("+1",0,2,110)}),t(Te.arrow,()=>{e.shadowColor="#00baff",e.shadowBlur=9,e.beginPath(),e.moveTo(0,-47),e.lineTo(35,-7),e.lineTo(16,-7),e.lineTo(16,40),e.lineTo(-16,40),e.lineTo(-16,-7),e.lineTo(-35,-7),e.closePath();let a=e.createLinearGradient(0,-45,0,40);a.addColorStop(0,"#f2ffff"),a.addColorStop(.45,"#67fff4"),a.addColorStop(1,"rgba(10,201,255,.38)"),e.fillStyle=a,e.fill(),e.shadowBlur=0,e.lineWidth=2,e.strokeStyle="rgba(227,255,255,.82)",e.stroke()}),t(Te.flash,()=>{n(0,0,58,[[0,"#fff"],[.21,"#fff"],[.36,"rgba(255,255,255,.85)"],[.71,"rgba(255,255,255,.18)"],[1,i]]);for(let a=0;a<9;a++){let o=a*Math.PI*2/9+.2,c=a%3===1?48:31;e.save(),e.rotate(o),e.beginPath(),e.moveTo(8,-4.2),e.lineTo(c,0),e.lineTo(8,4.2),e.closePath(),e.fillStyle="rgba(255,255,255,.76)",e.fill(),e.restore()}}),t(Te.ember,()=>{e.save(),e.scale(.45,1),n(0,0,53,[[0,"#fff"],[.37,"#fff"],[.65,"rgba(255,255,255,.58)"],[1,i]]),e.restore()});let r=new Gn(s);return r.colorSpace=yt,r}function nS(s,e){let t=new Vt(1,1),n=new Ts;n.setIndex(t.index),n.setAttribute("position",t.getAttribute("position")),n.setAttribute("uv",t.getAttribute("uv"));let i={};for(let[c,l]of[["anchor",3],["sizeModeTile",4],["tint",4],["rotation",1]]){let h=new $t(new Float32Array(e*l),l);h.setUsage(un),n.setAttribute(c,h),i[c]=h}let r=new zt({uniforms:{atlas:{value:tS()}},transparent:!0,depthWrite:!1,side:Wt,toneMapped:!1,vertexShader:`
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
      }`});r.forceSinglePass=!0;let a=new Qe(n,r);a.frustumCulled=!1,a.renderOrder=8,n.instanceCount=0,s.add(a);let o=0;return{clear(){o=0},write(c,l,h,d,f,u,p,x,g,m=0){o>=e||g<.008||(i.anchor.setXYZ(o,c,l,h),i.sizeModeTile.setXYZW(o,d,f,u?1:0,p),i.tint.setXYZW(o,x.r,x.g,x.b,g),i.rotation.setX(o,m),o++)},flush(){a.visible=o>0,n.instanceCount=o;for(let c of Object.values(i))c.clearUpdateRanges(),o&&c.addUpdateRange(0,o*c.itemSize),c.needsUpdate=!0}}}function ld(s,e){let t=s.map(([a,o])=>new he(o,a)),n=new fo(t,e),i=new Float32Array(n.attributes.position.count*3),r=s.map(([,,a])=>new Se(a));for(let a=0;a<n.attributes.position.count;a++)r[a%r.length].toArray(i,a*3);return n.setAttribute("color",new Ft(i,3)),n.rotateX(-Math.PI/2),n}function hh(s,e,t,n,i){let r=new Zt(e,t,n);return r.instanceMatrix.setUsage(un),r.count=0,r.frustumCulled=!1,r.renderOrder=i,s.add(r),r}var De=Object.fromEntries(Object.entries({white:"#ffffff",pearl:"#fff5dc",aqua:"#64ffff",blue:"#18ccff",gold:"#ffd02f",orange:"#ff861d",fire:"#ff5a16",violet:"#c181ff",frost:"#a0edff",surf:"#68f4d5",dust:"#ece0cd",smoke:"#928180",steel:"#8f99a3"}).map(([s,e])=>[s,new Se(e)])),iS=["#555c69","#8e97a3","#abb4bc","#727986","#a5a7aa"].map(s=>new Se(s)),wt=(s,e)=>s+(e-s)*Math.random(),Vo=(s,e,t)=>Math.min(t,Math.max(e,s)),Ni=Math.PI*2;function sS(s,e){let t=new Vt(1,1,5,1),n=new Ts().copy(t),i=new $t(new Float32Array(e*3),3),r=new $t(new Float32Array(e*3),3),a=new $t(new Float32Array(e*4),4);for(let[l,h]of[["trailStart",i],["trailEnd",r],["trailStyle",a]])n.setAttribute(l,h.setUsage(un));let o=new zt({transparent:!0,depthWrite:!1,toneMapped:!1,side:Wt,vertexShader:`
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
      }`});o.forceSinglePass=!0;let c=new Qe(n,o);return c.frustumCulled=!1,c.renderOrder=4,n.instanceCount=0,s.add(c),{write(l,h,d,f,u,p,x){i.setXYZ(l,h.x,h.y,h.z),r.setXYZ(l,d.x,d.y,d.z),a.setXYZW(l,f,u,p,x)},flush(l){if(n.instanceCount=l,c.visible=l>0,!!l)for(let h of[i,r,a])h.clearUpdateRanges(),h.addUpdateRange(0,l*h.itemSize),h.needsUpdate=!0}}}function eg(s){let e=nS(s,650),t=hh(s,ld([[-.33,.004,"#1395ec"],[-.14,.026,"#28d7ff"],[.1,.039,"#b4fbff"],[.24,.025,"#e8ffff"],[.3,.002,"#ebffff"]],7),new Mt({vertexColors:!0,toneMapped:!1}),320,3),n=hh(s,ld([[-.38,.003,"#b9430d"],[-.37,.127,"#dd7117"],[-.31,.18,"#ff9c1a"],[-.25,.19,"#ffc32d"],[-.21,.158,"#ef8d18"],[-.15,.166,"#ffb824"],[.23,.175,"#ffce36"],[.37,.16,"#ffcb2c"],[.48,.117,"#ffdb46"],[.54,.059,"#ffdc56"],[.56,.001,"#fff1a3"]],14),new Ot({vertexColors:!0,emissive:3609856,specular:16772528,shininess:62}),24,3),i=hh(s,ld([[-1.52,.003,"#ef5615"],[-1.18,.07,"#fc641b"],[-.77,.114,"#ff9f13"],[-.49,.149,"#ffe039"],[-.31,.112,"#fff8af"]],10),new Mt({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1}),24,6),r=hh(s,new no(1,0),new Ot({color:16777215,specular:5660779,shininess:18}),88,2),a=new Pt,o=[],c=[],l=[],h=[],d=5;function f(H,P,q,I,J,W,F,G={}){if(o.length>=260){if(!G.priority&&H!==Te.plus&&H!==Te.arrow&&H!==Te.crack)return;let Q=o.findIndex(ae=>ae.tile===Te.smoke||ae.tile===Te.glint||ae.tile===Te.glow);if(Q<0)return;l.push(o[Q]),o[Q]=o[o.length-1],o.pop()}let D=l.pop()||{};D.tile=H,D.x=P,D.y=q,D.z=I,D.start=J,D.end=W,D.life=F,D.age=0,D.color=G.color||De.white,D.alpha=G.alpha??1,D.ratio=G.ratio??1,D.vx=G.vx||0,D.vy=G.vy||0,D.vz=G.vz||0,D.gravity=G.gravity||0,D.angle=G.angle||0,D.spin=G.spin||0,D.flat=G.flat||!1,D.world=G.world??!0,D.hold=G.hold??.12,o.push(D)}function u(H,P,q,I,J,W){for(let F=0;F<J;F++){let G=(F+Math.random()*.5)*Ni/J,D=wt(.12,.42)*I,Q=wt(.75,2.15)*I;f(Te.smoke,H+Math.cos(G)*D,P+wt(.02,.14),q+Math.sin(G)*D,wt(.23,.47)*I,wt(.71,1.12)*I,wt(.36,.6),{color:W,alpha:wt(.4,.63),vx:Math.cos(G)*Q,vz:Math.sin(G)*Q,vy:wt(.35,1.05),spin:wt(-1.5,1.5),angle:G})}}function p(H,P,q,I,J){for(let W=0;W<J;W++){let F=(W+Math.random())*Ni/J,G=wt(1.8,4.3)*I;f(Te.ember,H,P,q,wt(.22,.39)*I,.035,wt(.21,.42),{color:W%3?De.orange:De.pearl,vx:Math.cos(F)*G,vz:Math.sin(F)*G,vy:wt(.8,2.5)*I,gravity:5,angle:F,spin:wt(-2,2),ratio:1.7})}}let x=["#65d8cd","#dafff3","#4cb9b2"].map(H=>new Se(H)),g=["#e4b879","#925c3b","#c28b57"].map(H=>new Se(H));function m(H,P,q,I,J,W=!1,F=iS){for(let G=0;G<I&&c.length<r.instanceMatrix.count;G++){let D=h.pop()||{};if(D.x=H+wt(-1.75,1.75)*J,D.y=P+wt(.14,.9),D.z=q+wt(-.24,.3),D.vx=wt(-2.8,2.8),D.vz=wt(-1.8,3.5),D.vy=wt(2.2,5.2),W){let Q=(G+Math.random())*Ni/I,ae=wt(2.2,4.4);D.x=H+Math.cos(Q)*.48,D.z=q+Math.sin(Q)*.48,D.vx=Math.cos(Q)*ae,D.vz=Math.sin(Q)*ae}D.size=wt(.085,.245)*J,D.stretch=wt(.52,1.65),D.rx=wt(-2,2),D.ry=wt(-2,2),D.spin=wt(2,8),D.age=0,D.life=wt(.52,1.04),D.color=F[G%F.length],c.push(D)}}let v=new $i(1,2),M=new zt({uniforms:{age:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec3 orb; varying vec3 eye; varying vec3 n; void main(){
      orb=position;vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);
      eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,fragmentShader:`varying vec3 orb;varying vec3 eye;varying vec3 n;uniform float age;
      void main(){float swirl=sin(orb.y*9.+sin(orb.z*5.+age*8.))*sin(orb.x*6.-age*6.);
        float heat=clamp(max(0.,dot(normalize(n),normalize(eye)))+.13*swirl-age*.7,0.,1.);
        vec3 fire=mix(vec3(.94,.16,.026),vec3(1.,.80,.20),smoothstep(.12,.53,heat));
        fire=mix(fire,vec3(1.,.98,.77),smoothstep(.55,.86,heat));
        gl_FragColor=vec4(fire,1.-smoothstep(.52,1.,age));}`}),_=new It,b=[[0,.2,0,1.02],[-.62,.06,.08,.65],[.55,.14,-.2,.74],[-.16,.57,-.13,.64],[.33,.36,.36,.48]];for(let[H,P,q,I]of b){let J=new Qe(v,M);J.position.set(H,P,q),J.scale.setScalar(I),J.renderOrder=3,_.add(J)}_.visible=!1,s.add(_);let S=1;function y(H,P,q,I,J=1,W=null){let F=wn[W]?.tone==="gold"?De.gold:De.surf,G=Vo(J,.62,2.05);switch(H){case"cardHit":f(Te.glint,P,q,I+.1,.33,.72,.12,{color:F}),p(P,q,I,.45,3);return;case"supplyBreak":f(Te.flash,P,q,I,.46,1.45,.13,{color:De.pearl}),f(Te.wave,P,.07,I,.42,2.9,.36,{flat:!0,color:F});for(let D of[-1,1])f(Te.glint,P+D*1.44,q,I,.48,.1,.33,{color:F,vx:-D*3.6,vy:1.1,ratio:1.6});p(P,q,I,.73,6);return;case"shieldHit":f(Te.wave,P,.1,I,.4,1.75,.26,{flat:!0,color:De.aqua}),f(Te.glint,P,q,I,.26,.68,.14,{color:De.pearl});return;case"hostileMuzzle":f(Te.flash,P,q,I,.32,.63,.14,{color:De.orange});return;case"bruiserCast":case"wardenCast":for(let D of[-1,1])u(P+D*.6,.16,I,1,4,De.dust);return;case"diverCast":for(let D of[-1,1])f(Te.wave,P+D*.95,q,I,.32,1.45,.32,{color:De.surf});return;case"drillCast":u(P,.2,I,1.21,7,De.violet);return;case"kestrelCast":f(Te.glow,P,q,I+.43,.32,1.37,.36,{color:De.frost});return;case"engineCast":for(let D of[-1,1])f(Te.flash,P+D*.72,q+.32,I-.2,.4,1.12,.17,{color:De.orange});return;case"bruiserStrike":case"wardenStrike":f(Te.crack,P,.043,I,1.4,2.55,.77,{flat:!0,hold:.31}),u(P,.16,I,1.18,8,De.dust),m(P,.12,I,7,.55,!0);return;case"diverStrike":f(Te.wave,P,.09,I,.31,2.29,.46,{flat:!0,color:De.surf});for(let D=0;D<9;D++){let Q=D*Ni/9;f(Te.glow,P,.22,I,.18,.06,.43,{color:De.aqua,vx:Math.cos(Q)*2.1,vz:Math.sin(Q)*2.1,vy:1.5,gravity:3.6})}return;case"drillStrike":u(P,.17,I,.77,5,De.violet),f(Te.glint,P,.35,I,.26,1,.19,{color:De.violet});return;case"kestrelStrike":f(Te.wave,P,.08,I,.35,2.78,.54,{flat:!0,color:De.frost}),u(P,.28,I,.98,7,De.frost);return;case"engineStrike":f(Te.flash,P,.45,I,.82,2.2,.19,{color:De.orange,priority:!0}),f(Te.wave,P,.07,I,.34,2.63,.37,{flat:!0,color:De.gold}),u(P,.2,I,1.1,8,De.smoke),p(P,.3,I,1.08,12);return;case"finisher":p(P,q,I,1.35,16),f(Te.flash,P,q,I,.65,1.45,.13,{color:De.pearl});return;case"hit":if(d<1)return;d--,p(P,q,I,.48,3),f(Te.glint,P,q,I,.26,.47,.105,{color:De.aqua,angle:wt(0,Ni)});return;case"muzzle":f(Te.flash,P,q,I,.47*G,.83*G,.105,{color:De.pearl,angle:wt(0,Ni),world:!1}),f(Te.glow,P,q,I,.82*G,.38*G,.13,{color:De.orange,alpha:.7,world:!1});return;case"impact":case"slam":{let D=H==="slam",Q=G*(D?1.4:1),ae=D?.16:Math.max(.17,q*.58);if(D){m(P,.04,I,12,.61,!0);for(let Ie of[-1,1])f(Te.flash,P+Ie*.57,.12,I,.58,.93,.1,{color:De.pearl})}f(Te.crack,P,.035,I,2.02*Q,2.33*Q,D?2:1.42,{flat:!0,angle:wt(0,Ni),hold:.62}),f(Te.wave,P,.065,I,.42*Q,D?2*2.15/.81:3.16*Q,.32,{flat:!0,color:D?De.gold:De.pearl,alpha:.83}),f(Te.flash,P,ae,I,.6*Q,1.85*Q,.16,{color:De.gold,angle:wt(0,Ni)}),f(Te.glow,P,ae+.06,I,.39*Q,.93*Q,.1,{color:De.pearl}),u(P,.17,I,Q,D?12:7,D?De.dust:De.smoke),p(P,ae,I,Q,D?10:5);return}case"wallHit":f(Te.flash,P,Math.max(q,.4),I+.12,.38*G,1.12*G,.13,{color:De.pearl}),u(P,Math.max(.35,q),I,.61*G,3,De.steel),p(P,Math.max(.4,q),I,.59*G,3);return;case"wallBreak":m(P,.24,I,22,Math.min(1.17,G)),f(Te.flash,P,.72,I,.85*G,2.8*G,.19,{color:De.pearl}),f(Te.wave,P,.062,I,.6,4.7,.38,{flat:!0,color:De.dust});for(let D=-1;D<=1;D++)u(P+D*1.17,.3,I,.98,4,De.steel);p(P,.8,I,G,7);return;case"plus":{f(Te.wave,P,.09,I,.12,1.28,.23,{flat:!0,color:De.aqua});let D=Math.max(0,q);f(Te.goldWave,P,.055,I,.22,.96,.34,{flat:!0,world:!1,color:De.gold}),f(Te.glow,P,D+.36,I,.45,.82,.28,{ratio:1.75,world:!1,color:De.gold}),f(Te.glint,P+.08,D+.57,I,.35,.14,.23,{world:!1,color:De.pearl}),f(Te.plus,P+wt(-.13,.13),D+.83,I,.8,1.04,.65,{world:!1,vy:1.1,hold:.62});return}case"merge":{if(W==="range"||W==="longshot"){for(let Q=0;Q<3;Q++)f(Te.arrow,P,.12,I-.8-Q*.68,.72-Q*.09,.22,.48+Q*.04,{flat:!0,color:F,vz:-3.3,world:!1});f(Te.wave,P,.07,I,.32,2.45,.35,{flat:!0,color:F});return}f(Te.goldWave,P,.12,I,2.15,.32,.27,{flat:!0,color:De.gold});let D=Vo(G*1.55,1.5,2.5);f(Te.goldWave,P,.061,I,.38,D,.46,{flat:!0,world:!1,color:De.aqua,hold:.3}),f(Te.goldWave,P,.077,I,.17,D*.72,.38,{flat:!0,world:!1,color:De.gold}),f(Te.glow,P,q+.62,I,.77*G,1.6*G,.32,{color:De.gold,world:!1,ratio:1.3,alpha:.72});for(let Q=0;Q<3;Q++){let ae=(Q+.16)*Ni/3;f(Te.arrow,P+Math.cos(ae)*D*.31,q+.3,I+Math.sin(ae)*D*.34,.38,.65,.51+Q*.035,{color:De.white,hold:.42,vy:1.55+.15*Q,world:!1})}return}case"victory":case"vaultLand":f(Te.wave,P,.06,I,.55,H==="victory"?3.9:2.7,.33,{flat:!0,color:De.dust,alpha:.7});for(let D of[-1,1])u(P+D*.63,.12,I,.88,4,De.dust);return;case"bossBurst":S=0,_.position.set(P,.8,I),_.visible=!0,f(Te.goldWave,P,.08,I,.6,5.55,.48,{flat:!0,color:De.gold,priority:!0});for(let[D,Q,ae]of[[0,0,2.85],[-.58,.23,1.65],[.67,-.2,1.9]])f(Te.glow,P+D,q+.19,I+Q,ae*.54,ae*1.13,.34,{color:De.orange,vy:.83,priority:!0}),f(Te.flash,P+D,q+.22,I+Q,ae*.31,ae,.22,{color:De.gold,angle:D*2.4,vy:.9,priority:!0});f(Te.glint,P,q+.35,I,.8,2.65,.13,{color:De.pearl,priority:!0}),m(P,.42,I,17,.91,!0),p(P,q+.38,I,1.57,24),u(P,.35,I,1.5,10,De.smoke);return;case"glassBreak":m(P,q,I,18,.92,!1,x),f(Te.wave,P,.06,I,.5,4.85,.31,{flat:!0,color:De.aqua});for(let D of[-1.09,0,1.09])f(Te.glint,P+D,q+.25,I,.19,.74,.2,{color:De.pearl});return;case"crateBreak":m(P,q,I,16,1.04,!1,g),u(P,.32,I,.7,5,De.smoke);return;case"latchHit":p(P,q,I,1.06,8);return;case"rally":f(Te.wave,P,.08,I,.46,3.05,.49,{flat:!0,color:De.aqua});return;case"chainSnap":for(let D of[-1,1])p(P+D*1.86,1.04,I,1.15,9);f(Te.flash,P,q,I,.38,1.4,.15,{color:De.pearl});return;case"discharge":f(Te.wave,P,.1,I,.45,8.5,.35,{flat:!0,color:De.aqua}),f(Te.flash,P,q+.45,I,.63,3.4,.23,{color:De.aqua});for(let D=0;D<7;D++){let Q=D*Ni/7;f(Te.glint,P+Math.cos(Q)*1.46,.5,I+Math.sin(Q)*1.46,.25,1.03,.26,{color:De.pearl,angle:Q})}return}}let E=new N(0,0,-1),A=new N,R=new N,L=new N,z=sS(s,384);function X(H,P){let q=0,I=0,J=0;for(let W of H){let F=W.kind==="rocket",G=W.profile===zs,D=W.profile===Zo||G,Q=Math.max(0,W.distance-W.profile.tail+W.afterHit*W.profile.speed);if(yr(W,Q,R),W.distance-Q>.012&&J<384){yr(W,(Q+W.distance)*.5,L);let ae=L.y-(R.y+W.y)*.5,Ie=W.range>4?Vo((W.range-Q)/1.6,0,1):1;z.write(J++,R,W,ae,F?.093:G?.092:D?.066:.052,F?2:D?1:0,Ie*.91)}if(!W.finished){if(yr(W,W.distance+.015,L),A.set(L.x-W.x,L.y-W.y,L.z-W.z).normalize(),a.quaternion.setFromUnitVectors(E,A),a.position.set(W.x,W.y,W.z),!F&&q<t.instanceMatrix.count)a.scale.set(D?1.54:1.13,D?1.54:1.13,D?.62:.83),a.updateMatrix(),t.setMatrixAt(q++,a.matrix),W.age<.045&&e.write(W.startX,W.startY,W.startZ,.21,.21,!1,Te.flash,De.aqua,.65*(1-W.age/.045));else if(F&&I<n.instanceMatrix.count){let ae=.63+Math.min(.19,W.power*.055);a.scale.setScalar(ae),a.updateMatrix(),n.setMatrixAt(I,a.matrix),a.scale.z*=.9,a.updateMatrix(),i.setMatrixAt(I++,a.matrix),P>0&&Math.floor(W.age*16)!==Math.floor(Math.max(0,W.age-P)*16)&&f(Te.smoke,R.x,R.y,R.z,.14*ae,.39*ae,.19,{color:De.dust,alpha:.38,vy:.19,world:!1})}}}z.flush(J),t.count=q,n.count=i.count=I,t.visible=q>0,n.visible=i.visible=I>0,q&&(t.instanceMatrix.needsUpdate=!0),I&&(n.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0)}function U(H,P,q,I=[]){if(_.visible){S+=H;let F=Math.min(1,S/.44);_.position.z+=P,_.position.y+=.74*H,_.scale.setScalar(.28+.94*Math.sin(Math.PI*Math.sqrt(F))),M.uniforms.age.value=F,F>=1&&(_.visible=!1)}let J=Vo(H,0,.12);d=Math.min(6,d+J*21),e.clear(),X(q,J);for(let F of I)e.write(F.x-F.vx*.038,F.y,F.z-F.vz*.038,.3,.52,!1,Te.glow,De.fire,.8),e.write(F.x,F.y,F.z,.3,.34,!1,Te.glint,De.gold,.98);for(let F=o.length-1;F>=0;F--){let G=o[F];if(G.age+=J,G.age>=G.life){l.push(G),o[F]=o[o.length-1],o.pop();continue}G.x+=G.vx*J,G.y+=G.vy*J,G.z+=G.vz*J+(G.world?P:0),G.vy-=G.gravity*J,G.angle+=G.spin*J}for(let F=0;F<2;F++)for(let G of o){if((G.tile===Te.plus||G.tile===Te.arrow)!==(F===1))continue;let Q=G.age/G.life,ae=1-(1-Q)*(1-Q),Ie=Pe.lerp(G.start,G.end,ae),ye=1-Vo((Q-G.hold)/(1-G.hold),0,1);e.write(G.x,G.y,G.z,Ie,Ie*G.ratio,G.flat,G.tile,G.color,G.alpha*ye,G.angle)}e.flush();let W=0;for(let F=c.length-1;F>=0;F--){let G=c[F];if(G.age+=J,G.age>=G.life){h.push(G),c[F]=c[c.length-1],c.pop();continue}G.x+=G.vx*J,G.z+=G.vz*J+P,G.y+=G.vy*J,G.vy-=11*J,G.y<G.size*.4&&(G.y=G.size*.4,G.vy=Math.abs(G.vy)*.22,G.vx*=.78,G.vz*=.78);let D=Math.min(1,(G.life-G.age)*5);a.position.set(G.x,G.y,G.z),a.rotation.set(G.rx+G.age*G.spin,G.ry-G.age*G.spin*.56,G.age*G.spin*.77),a.scale.set(G.size*G.stretch*D,G.size*.74*D,G.size*D),a.updateMatrix(),r.setMatrixAt(W,a.matrix),r.setColorAt(W++,G.color)}r.count=W,r.visible=W>0,W&&(r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0)}function V(){_.visible=!1,l.push(...o),h.push(...c),o.length=c.length=0,d=5,z.flush(0);for(let H of[t,n,i,r])H.count=0,H.visible=!1;e.clear(),e.flush()}return V(),{update:U,burst:y,reset:V}}var tg={ally:{width:.49,height:.88,pivot:.49,pad:.008,capacity:180,grid:[7,10]},captain:{width:1.16,height:1.73,pivot:.43,pad:.009,capacity:1,grid:[16,20]},grunt:{width:.54,height:.88,pivot:.5,pad:.011,capacity:1800,grid:[7,10]}},uh=Pe.clamp,Ma=Pe.smoothstep,rS=`
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
    float ankle = 1.0-smoothstep(.08,.21,uv.y);
    float chest = smoothstep(.28,.49,uv.y)*(1.0-smoothstep(.58,.72,uv.y));
    point.x += sideSign*.017*lift*ankle + stride*.026*chest;
    point.y += ankle*max(0.,-swing)*.024;
    point.y += .141*lift*boots + .026*abs(feet.z)*(1.0-boots) + swing*.058*arms;
    float depthSwing = stride*.033*(uv.x-pivot)*chest + (boots*${ma/.86}-arms*.16)*swing*dimensions.y;
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
`,aS=`
  ${rh}
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
`;function oS(s,e,t,n,i){let r=tg[e],a=new Float32Array(3),o=new Vt(1,1,...r.grid),c=new Ts().copy(o),l={};for(let[u,p]of[["anchor",3],["dimensions",2],["motion",4],["feet",3],["fallAngle",1],["treatment",4]]){let x=new $t(new Float32Array(r.capacity*p),p);x.setUsage(un),l[u]=x,c.setAttribute(u,x)}c.instanceCount=0,t.colorSpace=yt,t.magFilter=Qt,t.minFilter=Wn,t.generateMipmaps=!0;let h=new zt({uniforms:{portrait:{value:t},cameraRight:{value:n},cameraLift:{value:i},pivot:{value:r.pivot},padding:{value:r.pad}},defines:e==="captain"?{CAPTAIN:1}:e==="ally"?{ALLY:1}:{},vertexShader:rS,fragmentShader:aS,depthWrite:!0,transparent:!1,toneMapped:!1,alphaToCoverage:!0}),d=new Qe(c,h);d.name=`AI ${e}`,d.visible=!1,d.frustumCulled=!1,s.add(d);let f=0;return{begin(){f=0},clear(){f=0,c.instanceCount=0,d.visible=!1},add(u,p,x,g,m,v,M,_=0,b=0,S=0,y=0,E=0,A=0,R=0){f>=r.capacity||g<=.001||m<=.001||(l.fallAngle.setX(f,R),l.anchor.setXYZ(f,u,p,x),l.dimensions.setXY(f,r.width*g,r.height*m),l.motion.setXYZW(f,v,M,_,b),Cs(v,M,a),l.feet.setXYZ(f,a[0],a[1],a[2]),l.treatment.setXYZW(f,S,y,E,A),f++)},flush(){if(c.instanceCount=f,d.visible=f>0,!!f)for(let u of Object.values(l))u.clearUpdateRanges(),u.addUpdateRange(0,f*u.itemSize),u.needsUpdate=!0}}}async function ng(s){let e=new is,t=Object.keys(tg),n=await Promise.allSettled(t.map(f=>e.loadAsync(`./art/${f}-field.webp?v=kit2`))),i=n.find(f=>f.status==="rejected");if(i){for(let f of n)f.status==="fulfilled"&&f.value.dispose();throw new Error("\u89D2\u8272\u63D2\u753B\u52A0\u8F7D\u5931\u8D25",{cause:i.reason})}let r=new N,a=new N,o=new N,c=Object.fromEntries(t.map((f,u)=>[f,oS(s,f,n[u].value,r,a)])),l=Object.values(c),h=()=>l.forEach(f=>f.clear());function d(f,u,p,x){if(x!=="ai"&&x!=="hybrid"){h();return}for(let M of l)M.begin();u.updateWorldMatrix(!0,!1),r.setFromMatrixColumn(u.matrixWorld,0),r.y=0,r.normalize(),o.setFromMatrixColumn(u.matrixWorld,1),a.set(0,1,0).lerp(o,.42).normalize();let g=x==="ai",m=f.phase==="ready"?.3:f.playing||f.overrun||f.parade?1:0,v=p*10.8+(f.parade?f.endTime*5.6:0);for(let M of f.columns)for(let _ of M.units)_.alive&&c.grunt.add(_.x,_.lift||0,_.z,_.size,_.size,ga(_),m);for(let M of f.runners)M.alive&&c.grunt.add(M.x,M.lift||0,M.z,M.size,M.size,ga(M),m);for(let M of f.allies){let _=uh(M.age/.32,0,1),b=.81+.19*_+.095*Math.sin(_*Math.PI);c.ally.add(M.x,.035*Math.sin(_*Math.PI),M.z,b,b,v+M.phase,m,0,0,.8*(1-_),.22*(1-_))}for(let M of f.deliveries){if(M.slot==null||M.age<0)continue;let _=.65+.35*M.progress;c.ally.add(M.x,M.y,M.z,_,_,v+M.phase,.55,0,0,.42,.24)}{for(let M of f.falling){if(M.prone){let E=Ma(M.t,0,.42),A=M.size*(f.overrun?1:1-Ma(M.t,1.78,2.1));c.ally.add(M.x,.09*E,M.z,A,A,0,0,.1*E*M.dir,0,0,0,.3*E,0,1.5*E);continue}let _=uh(M.t/1.02,0,1),b=M.size*(1-Ma(_,.78,1)),S=M.roll*M.t+.16*Math.sin(M.spin*M.t);(M.side==="red"?c.grunt:c.ally).add(M.x,M.y,M.z,b,b,v+M.phase,0,S,0,0,.64*(1-Ma(_,.04,.31)),.72*Ma(_,.05,.31))}if(g&&(f.phase!=="lost"||f.overrun||f.endTime<.25)){let M=f.visualScale,_=f.overrun?Ma(f.endTime,0,.5):0,b=f.phase==="lost"&&!f.overrun?uh(f.endTime/.25,0,1):0;c.captain.add(f.x,f.rope?.68*Math.sin(Math.PI*f.rope.age/.58):.1*_,f.captainZ,M,M*(1-.55*b),v*.83,f.overrun?0:m,-.38*b-.12*_,f.recoil,.66*f.mergeGlow,.14*f.mergeGlow+.48*f.hurt+.32*b,0,uh(f.velocity*.007,-.095,.095),1.5*_)}}for(let M of l)M.flush()}return{draw:d,clear:h,captainTexture:n[t.indexOf("captain")].value,gruntTexture:n[t.indexOf("grunt")].value,allyTexture:n[t.indexOf("ally")].value}}var on=new Pt;function ig(s,e,t){let n=new Float32Array(3),i=Tm(e,"near"),r=new $t(new Float32Array(t*4),4).setUsage(un);i.setAttribute("stepPose",r);let a=new Ot({vertexColors:!0,shininess:37,specular:3225412});a.customProgramCacheKey=()=>"infantry-walk-"+e,a.onBeforeCompile=h=>{h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
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
        vec2 sole = position.yz + vec2(.118*lift,facing*${ma}*stride);
        transformed.yz = mix(transformed.yz,sole,boot);
        transformed.y += .022*abs(stepPose.w)*(1.0-boot);
        transformed.x += stepPose.y*.018*position.y + sign(limb)*arm*.009*stride;`),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
varying float vGlow;`).replace("#include <color_fragment>",`#include <color_fragment>
      if (vGlow <= -1.0) {
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.34)*.74;
        diffuseColor.rgb = mix(faded,vec3(1.,.85,.64),clamp(-vGlow-1.,0.,1.)*.64);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.72,.18), clamp(vGlow,0.0,1.0)*.94);`)};let o=new Zt(i,a,t),c;o.count=0,o.frustumCulled=!1,o.instanceMatrix.setUsage(un),s.add(o);let l=0;return{paint(h,d){c=_f(e,h,d,r,t),c.instanceMatrix=o.instanceMatrix,s.add(c)},begin(){l=0},put(h,d,f,u,p=0,x=0,g=0,m=0,v=0,M=0){l>=t||(on.position.set(h,d,f),on.rotation.set(x,g,m),on.scale.setScalar(u),on.updateMatrix(),o.setMatrixAt(l,on.matrix),Cs(v,M,n),r.setXYZW(l,p,n[0],n[1],n[2]),l++)},end(){o.count=l,o.visible=l>0&&!c,c&&(c.count=l,c.visible=l>0),o.instanceMatrix.needsUpdate=!0,r.needsUpdate=!0}}}function lS(s){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(35,32,2,34,32,29);n.addColorStop(0,"rgba(36,35,57,.44)"),n.addColorStop(.53,"rgba(38,36,58,.33)"),n.addColorStop(.83,"rgba(44,41,63,.14)"),n.addColorStop(1,"rgba(44,41,63,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let i=t.createRadialGradient(23,32,1,24,32,17);i.addColorStop(0,"rgba(25,24,46,.46)"),i.addColorStop(.57,"rgba(28,27,49,.26)"),i.addColorStop(1,"rgba(28,27,49,0)"),t.fillStyle=i,t.fillRect(0,0,64,64);let r=new Gn(e);r.colorSpace=yt;let a=new Vt(1,1);a.rotateX(-Math.PI/2);let o=new Zt(a,new Mt({map:r,transparent:!0,depthWrite:!1,toneMapped:!1}),1600);o.frustumCulled=!1,o.instanceMatrix.setUsage(un),o.renderOrder=1,s.add(o);let c=0;return{begin(){c=0},put(l,h,d,f=1,u=1){c>=1600||(on.position.set(l+d*.29*u,.021,h-d*.19*u),on.rotation.set(0,.65,0),on.scale.set(d*1.68*u,.95,d*.85*f),on.updateMatrix(),o.setMatrixAt(c++,on.matrix))},end(){o.count=c,o.instanceMatrix.needsUpdate=!0}}}function fh(s,e,t,n,i){let r=new Ss(e,s,64);r.rotateX(-Math.PI/2);let a=new Qe(r,new Mt({color:t,transparent:!0,opacity:n,depthWrite:!1,toneMapped:!1}));return a.renderOrder=3,i.add(a),a}function sg(s,e){let t=new jc({canvas:s,antialias:!0,alpha:!0,powerPreference:"high-performance"});t.setClearColor(860987,1),t.outputColorSpace=yt;let n=new qa,i=km(t,n);n.add(new xo(16184831,8750235,1.46));let r=new ws(16773350,2.02);r.position.set(-8,16,6),n.add(r);let a=new ws(13097727,.57);a.position.set(7,8,-8),n.add(a);let o=new cn(41,1,.15,150),c=new N,l=Rm();n.add(l.root);let h=fh(2.15,2.15-.055,16748086,.82,n),d=fh(2.15,2.15-.115,16761949,.38,n),f,u=Fm().then(F=>{f=F,n.add(F.root)}),p=ig(n,"blue",180),x=ig(n,"red",1800),g=lS(n),m=fh(.68,.634,6618933,.94,n),v=fh(.72,.606,6749239,.21,n),M=new Qe(new pi(1,28,12,0,Math.PI*2,0,Math.PI/2),new zt({transparent:!0,depthWrite:!1,vertexShader:"varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}",fragmentShader:"varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),2.1);gl_FragColor=vec4(.27,.86,1.,.024+.41*rim);}"}));n.add(M);let _=new Zt(new nr(.18),new Ot({color:7133695,emissive:1530771}),20);_.frustumCulled=!1,n.add(_);let b={},S=new Ot({vertexColors:!0});for(let F of["gunner","guard","bomber","standard","vault","courier"]){let G=new Zt(Am(F),S,32);G.frustumCulled=!1,n.add(G),b[F]=G}let y=Qm(n),E=Xm(n),A=$m(n,i.curve),R=eg(n),L=null,z=ng(n).then(F=>(L=F,l.paint(F.captainTexture,F.gruntTexture),p.paint(F.allyTexture,F.gruntTexture),x.paint(F.gruntTexture,F.allyTexture),!0)).catch(F=>(console.warn("\u89D2\u8272\u8D34\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u5DF2\u4F7F\u7528 3D \u6A21\u578B",F),!1)),X=Promise.all([u,z]).then(([,F])=>F),U=-3.72,V=0,H=0,P=1,q=1,I=Math.min(devicePixelRatio||1,1.65),J=()=>{P=e.clientWidth,q=e.clientHeight,o.aspect=P/Math.max(1,q),o.fov=Pe.clamp(41+(.54-o.aspect)*27,37,47),o.updateProjectionMatrix(),t.setPixelRatio(I),t.setSize(P,q,!1)};J();function W(F,G,D,Q,ae){L||(ae="3d");let Ie=F.playing,ye=ae!=="ai",Be=1-Math.exp(-8.5*D);i.setRoute(F.route.theme,F.stage,F.distance);let nt=F.boss.defeatAge,Fe=F.boss.defeated?.18*Pe.smoothstep(nt,0,.42)*(1-Pe.smoothstep(nt,.82,1.65)):0,je=19.5*Math.tan(Pe.degToRad(o.fov/2))*o.aspect,et=Math.sign(F.x)*Math.max(0,Math.abs(F.x)-je*.54),se=i.curve.x>0,ue=se?Pe.clamp(et,-1,1):et,ce=F.boss.x+i.offset(F.boss.z),Re=1-Pe.smoothstep(o.aspect,.6,.92),_e=F.boss.active?Re*Pe.smoothstep(F.boss.z,-16,-4)*(1-Pe.smoothstep(nt,1.45,2.05)):0,Ze=Pe.lerp(F.x,ce,.55),ze=Pe.lerp(ue,Ze,_e*.85),st=Pe.lerp(ze,ce,Fe),rt=(F.boss.z+5.4)*Fe;se&&!F.boss.active&&(U=Pe.clamp(U,-1,1)),U+=(st-U)*Be;let gt=_e*(2.4+Math.min(3,Math.abs(F.x-ce)*.46));V+=(gt-V)*Be,H=Math.max(0,H-D*1.75);let k=Math.sin(G*58)*H*H*.19,Jt=Math.sin(G*72)*H*H*.12,St=(se?Pe.clamp(19.5+(.5-o.aspect)*29,17.5,23.4):15)+V,ve=13.2+(St-15)*.81,kt=se?(U-i.offset(-22)*.45)/30:0,qe=Pe.degToRad(o.fov/2),Ke=Math.atan2(14.88,20.65),C=13.2-15/Math.tan(Ke-qe),w=Math.atan2(St,ve-C)+qe,Y=ve-(St-.12)/Math.tan(w);o.position.set(U+k+kt*ve,St+Jt-Fe*1.2,ve+rt),o.lookAt(U+.06+k+kt*Y,.12,Y+rt),o.updateMatrixWorld(),i.setCamera(o);let oe=Ie||F.overrun||F.parade?1:0,re=G*10.8+(F.parade?F.endTime*5.6:0);A.update(F),g.begin(),p.begin(),x.begin();for(let ne of F.columns)for(let Le of ne.units){if(!Le.alive||Le.z<F.entryZ-3)continue;ae==="3d"&&x.put(Le.x,Le.lift||0,Le.z,Le.size,0,0,Le.yaw,0,ga(Le),oe);let be=Pe.smoothstep(Le.z,-45,-30);be>0&&g.put(Le.x,Le.z,.64*be)}for(let ne of Object.values(b))ne.count=0;for(let ne of F.runners){if(!ne.alive)continue;let Le=b[ne.role];Le&&Le.count<Le.instanceMatrix.count&&(on.position.set(ne.x,(ne.lift||0)+.012,ne.z),on.rotation.set(0,ne.yaw,0),on.scale.setScalar(ne.size),on.updateMatrix(),Le.setMatrixAt(Le.count++,on.matrix)),ae==="3d"&&x.put(ne.x,ne.lift||0,ne.z,ne.size,0,0,ne.yaw,0,ga(ne),oe),g.put(ne.x,ne.z,.67)}for(let ne of Object.values(b))ne.instanceMatrix.needsUpdate=ne.count>0;for(let ne of F.allies){let Le=1;ne.age<.25&&(Le=.55+.45*Math.min(1,ne.age/.15)+Math.sin(Math.PI*Math.min(1,ne.age/.25))*.18),ae==="3d"&&p.put(ne.x,0,ne.z,Le,Math.max(0,1-ne.age*2.8),0,-F.velocity*.014,0,re+ne.phase,oe),g.put(ne.x,ne.z,.71*Le)}let me=0;function Me(ne,Le,be,Tt){me>=_.instanceMatrix.count||(on.position.set(ne,Le,be),on.rotation.set(.18,G*4,0),on.scale.setScalar(Tt),on.updateMatrix(),_.setMatrixAt(me++,on.matrix))}E.update(F.deliveries);for(let ne of F.deliveries)ne.age<0||ne.slot==null||ae==="3d"&&p.put(ne.x,ne.y,ne.z,.65+.35*ne.progress,.42,0,0,0,re+ne.phase,.55);if(F.buffs.drone>0)for(let ne of[-1,1])Me(F.x+ne*1.15,1.3+.06*Math.sin(G*6),F.captainZ-.32,1);_.count=me,_.instanceMatrix.needsUpdate=me>0,M.visible=Ie&&F.buffs.shield>0,M.visible&&(M.position.set(F.x,.06,F.captainZ),M.scale.set(1.52*F.scale,1.55,1.28*F.scale));for(let ne of F.falling){let Le=Pe.smoothstep(ne.t,0,.42),be=(ne.size||1)*(ne.prone?F.overrun?1:1-Pe.smoothstep(ne.t,1.78,2.1):1-Math.pow(Math.min(1,ne.t/1.02),4));ae==="3d"&&(ne.side==="red"?x:p).put(ne.x,ne.prone?.15*Le:ne.y,ne.z,be,-2+Pe.smoothstep(ne.t,.018,.15),ne.prone?1.48*Le:ne.spin*ne.t,ne.prone?.12*ne.dir:ne.phase,ne.prone?.16*Le*ne.dir:ne.roll*ne.t),ne.y<2&&g.put(ne.x,ne.z,.64*be)}let ee=F.phase==="lost",te=F.visualScale,ge=F.overrun?Pe.smoothstep(F.endTime,0,.5):0,O=ee&&!F.overrun;l.root.visible=ye&&(!O||F.endTime<.4);let ie=F.rope?.68*Math.sin(Math.PI*F.rope.age/.58):0;l.root.position.set(F.x,F.overrun?.25*ge:O?Math.sin(Math.min(1,F.endTime/.4)*Math.PI)*.64:ie,F.captainZ),l.root.rotation.set(1.45*ge,ee?0:-F.velocity*.018,O?-F.endTime*5:-.16*ge),l.root.scale.setScalar(te*(O?Math.max(.05,1-F.endTime*2):1)),l.animate({time:G+(F.parade?F.endTime*.54:0),run:F.parade?1:Ie?.91:ee?0:.09,recoil:F.recoil,merge:Math.max(F.mergeGlow,F.hurt*.62),lean:Pe.clamp(F.velocity/9,-1,1)});let K=F.boss;f.root.visible=K.active&&!K.removed&&K.z<9;let de=Pe.smoothstep(nt,.25,.92),pe=nt>.92?Math.sin((nt-.92)*19)*Math.exp(-9*(nt-.92)):0,xe=K.lift*(1-Pe.smoothstep(nt,0,.3));f.root.position.set(K.x-.26*de,xe+.27*de+Math.max(0,pe)*.16,K.z-.62*de),f.root.rotation.set(-1.49*de+.13*pe,K.yaw*(1-de),-.3*de),y(K);let Ue=K.skill,at=Ue?Pe.smoothstep(Ue.age,0,Ue.warm)*(1-Pe.smoothstep(Ue.age,Ue.warm,Ue.warm+.3)):0,fe=Ue?Math.sin(Math.PI*Pe.clamp((Ue.age-Ue.warm)/.52,0,1)):0;f.pose({charge:at,release:fe,mode:ae,time:G,walk:Ie&&K.active&&!K.defeated?1:0,march:K.marched,attack:K.attackT,hit:K.hit,defeat:nt,kind:K.kind,vault:K.vault?.t||0,brace:K.brace,drive:K.special}),h.visible=d.visible=Ie&&!K.defeated&&K.attackT>0&&K.attackT<.91,h.visible&&(h.position.set(K.landX,.047,K.landZ),d.position.set(K.landX,.051,K.landZ),d.scale.setScalar(.3+.7*Pe.smoothstep(K.attackT,0,.91))),(!ee||F.overrun)&&g.put(F.x,F.captainZ+ge*.4,1.3*te,1,1.32),f.root.visible&&g.put(K.x,K.z-de,3.65-xe*.38,1.12+de*.65,1.15);for(let ne of[v,m])ne.visible=!ee&&!F.parade,ne.position.set(F.x,.048,F.captainZ),ne.scale.setScalar(te);g.end(),p.end(),x.end(),L&&L.draw(F,o,G,ae),R.update(D,Q,F.shots,F.incoming),i.prepareScene(),t.render(n,o)}return{draw:W,assets:X,prepareBoss:F=>u.then(()=>f.prepare(F)),resize:J,entryZ(){let F=Math.atan2(14.88,20.65);return 13.2-15/Math.tan(F-Pe.degToRad(o.fov/2))},project(F,G,D){return c.set(F+i.offset(D),G,D).project(o),{x:(c.x+1)*P/2,y:(1-c.y)*q/2}},feedback(F){R.burst(F.kind,F.x,F.y,F.z,F.strength,F.supply),F.kind==="slam"||F.kind==="wallBreak"||F.kind==="bossBurst"?H=.85:F.kind==="victory"||F.kind==="vaultLand"?H=Math.max(H,.5):F.kind==="impact"&&(H=Math.max(H,.25))},reset(F){U=F*.94,V=0,H=0,R.reset()},lowerResolution(){I<=1||(I=Math.max(1,I-.22),J())}}}var rg=Math.PI*2,ag={muzzle:{duration:.25,gain:.33,interval:.18},smallShot:{duration:.08,gain:.076,interval:.105},impact:{duration:.31,gain:.28,interval:.12},wallHit:{duration:.16,gain:.16,interval:.13},cardHit:{duration:.1,gain:.11,interval:.13},supplyBreak:{duration:.25,gain:.21,interval:.1},shieldHit:{duration:.16,gain:.14,interval:.14},wallBreak:{duration:.43,gain:.35,interval:.4},plus:{duration:.22,gain:.18,interval:.105},longRange:{duration:.44,gain:.25,interval:.18},guardUp:{duration:.38,gain:.22,interval:.18},merge:{duration:.41,gain:.23,interval:.18},slam:{duration:.49,gain:.42,interval:.5},bruiserStrike:{duration:.31,gain:.28,interval:.22},diverStrike:{duration:.36,gain:.22,interval:.1},wardenCast:{duration:.68,gain:.26,interval:.5},drillStrike:{duration:.32,gain:.21,interval:.18},kestrelCast:{duration:.66,gain:.23,interval:.42},engineStrike:{duration:.44,gain:.3,interval:.24},bossBurst:{duration:.79,gain:.4,interval:.7},glassBreak:{duration:.39,gain:.24,interval:.17},crateBreak:{duration:.32,gain:.24,interval:.2},latchHit:{duration:.16,gain:.16,interval:.1},rally:{duration:.9,gain:.28,interval:1},chainSnap:{duration:.29,gain:.28,interval:.23},discharge:{duration:.41,gain:.26,interval:.23},vaultLand:{duration:.25,gain:.21,interval:.4},victory:{duration:.79,gain:.28,interval:.7},loss:{duration:.63,gain:.25,interval:.57},hit:{duration:.09,gain:.075,interval:.14}};function cS(s,e){let t=s.createBuffer(1,Math.ceil(ag[e].duration*24e3),24e3),n=t.getChannelData(0),i=981273;function r(h,d,f){let u=Math.floor(h*24e3),p=Math.min(n.length,u+Math.ceil(d*24e3)),x=Math.min(.005,d*.1),g=Math.min(.012,d*.16);for(let m=u;m<p;m++){let v=(m-u)/24e3,M=Math.min(1,v/x,(d-v)/g)*Math.exp(-3.35*v/d);n[m]+=f(v/d)*M}}function a(h,d,f,u,p,x=.12){let g=0;r(h,d,m=>{let v=u+(f-u)*(1-m)**3;return g+=rg*v/24e3,p*(Math.sin(g)+x*Math.sin(2*g+.15))})}function o(h,d,f,u){let p=0,x=0,g=1-Math.exp(-rg*f/24e3);r(h,d,()=>(i=Math.imul(1664525,i)+1013904223>>>0,p+=g*(i/2147483648-1-p),x+=.014*(p-x),u*(p-x*.65)))}function c(h,d,f,u){a(h,d,f*1.013,f,u,.16),a(h,d*.35,f*2.52,f*2.5,u*.11)}switch(e){case"cardHit":c(0,.09,1150,.42);break;case"supplyBreak":o(0,.068,4200,.51),c(.015,.18,906,.44),c(.07,.16,1326,.36);break;case"shieldHit":a(0,.15,740,365,.56,.18);break;case"muzzle":a(0,.2,213,61,.76,.48),o(0,.093,2400,.64),o(.023,.212,580,.57);break;case"smallShot":a(0,.054,1550,580,.33,.1),o(0,.042,3600,.56);break;case"impact":a(0,.23,115,49,.63,.52),o(.004,.25,1050,.89),o(.044,.23,370,.47);break;case"wallHit":o(0,.045,3100,.56),a(0,.124,650,440,.36),a(.008,.14,1050,750,.19);break;case"wallBreak":a(0,.23,174,57,.61,.33),o(0,.27,1970,.96);for(let[h,d]of[[.079,750],[.147,490],[.227,330]])o(h,.045,2850,.41),a(h,.13,d,d*.81,.22);break;case"plus":c(0,.107,622,.56),c(.06,.15,932,.68);break;case"longRange":c(0,.15,523,.48),c(.07,.17,784,.55),a(.14,.28,960,1175,.38);break;case"guardUp":a(0,.26,245,370,.45,.2),c(.055,.28,622,.57);break;case"merge":a(0,.24,320,752,.24),c(0,.16,523,.53),c(.075,.19,659,.59),c(.147,.24,988,.68);break;case"slam":o(0,.18,2e3,.78),a(0,.36,167,43,.96,.58),o(.035,.39,520,.84),o(.092,.13,1400,.44);break;case"bruiserStrike":o(0,.27,670,.7),a(0,.27,153,61,.74);break;case"diverStrike":o(0,.27,2300,.67),a(.01,.26,480,120,.42);break;case"wardenCast":a(0,.44,96,53,.77,.5),o(.05,.57,820,.68);break;case"drillStrike":c(0,.24,1450,.59),c(.05,.24,860,.5);break;case"kestrelCast":o(0,.56,3300,.58),a(.04,.52,830,1320,.35);break;case"engineStrike":a(0,.36,140,45,.81,.45),o(.015,.34,1350,.85);break;case"vaultLand":a(0,.2,115,49,.7),o(.01,.19,720,.61);break;case"glassBreak":o(0,.075,5100,.58);for(let[h,d]of[[0,2110],[.035,1560],[.075,2940],[.12,1020]])c(h,.19,d,.34);break;case"crateBreak":o(0,.17,1280,.8),o(.065,.14,2310,.43),a(0,.19,128,62,.39);break;case"latchHit":c(0,.14,1290,.58),o(0,.035,3e3,.3);break;case"rally":for(let[h,d]of[392,494,587,784].entries())c(h*.116,.34,d,.53);break;case"chainSnap":o(0,.048,4300,.65),c(.012,.19,1280,.45),c(.059,.18,711,.28);break;case"discharge":a(0,.29,1620,143,.66,.4),o(.05,.29,2900,.49);break;case"bossBurst":a(0,.5,182,41,1,.44),o(0,.12,4600,.85),o(.048,.54,850,.84),c(.23,.28,784,.32),c(.37,.39,1047,.33);break;case"victory":a(0,.35,144,48,.84,.37),o(.032,.31,720,.7);break;case"loss":c(0,.21,392,.57),c(.116,.22,330,.58),a(.246,.35,262,196,.64,.22);break;case"hit":o(0,.061,1290,.58),a(.003,.07,580,280,.24);break}let l=.001;for(let h of n)l=Math.max(l,Math.abs(h));for(let h=0;h<n.length;h++)n[h]*=.89/l;return t}function og(){let s,e,t,n,i=!1,r=!1,a=new Map,o=new Map,c=new Set;function l(u){c.delete(u),u.source.onended=null,u.source.disconnect(),u.gain.disconnect()}function h(){for(let u of c)u.source.stop(),l(u);o.clear()}function d(){if(!s)return;let u=s.currentTime;t.gain.cancelScheduledValues(u),t.gain.setTargetAtTime(i&&!r?.8:0,u,.008)}function f(){if(i&&s&&s.state!=="closed")return s.resume().catch(()=>{})}return{unlock(){if(i=!0,!s){let p=window.AudioContext||window.webkitAudioContext;if(!p)return;try{s=new p({latencyHint:"interactive"})}catch{return}e=s.createDynamicsCompressor(),e.threshold.value=-12,e.knee.value=9,e.ratio.value=5,e.attack.value=.004,e.release.value=.12,t=s.createGain(),t.gain.value=0,e.connect(t),t.connect(s.destination)}d();let u=f();return n?n.then(f):u},setMuted(u){r=!!u,r&&h(),d()},play(u,p=1,x=null){u==="merge"&&(x==="range"||x==="longshot"?u="longRange":(x==="shield"||x==="medic")&&(u="guardUp"));let g=ag[u];if(!g||!i||r||!s||s.state!=="running"||!(p>0))return;let m=s.currentTime;if(m-(o.get(u)??-1/0)<g.interval||c.size>=16)return;o.set(u,m),a.has(u)||a.set(u,cS(s,u));let v=s.createBufferSource(),M=s.createGain(),_={source:v,gain:M};v.buffer=a.get(u);let b=u==="plus"||u==="merge"||u==="victory"||u==="loss";v.playbackRate.value=b?1:.95+Math.random()*.1,M.gain.value=g.gain*Math.min(1.36,.45+.55*Math.sqrt(p)),v.connect(M),M.connect(e),c.add(_),v.onended=()=>l(_),v.start()},pause(){if(i=!1,h(),d(),!s||s.state==="closed")return;let u=s.suspend().catch(()=>{});return n=u,u.then(()=>{n===u&&(n=void 0)}),u}}}var Ne=s=>document.getElementById(s),ti=Ne("stage"),Sa=Ne("game"),xd=Ne("start"),Wo=Ne("startButton"),vg=Ne("veil"),cs=Ne("bossbar"),Ns=Ne("tip"),_g={hybrid:"\u6DF7\u5408",ai:"AI \u8D34\u56FE","3d":"\u7EAF 3D"},yg={hybrid:"\u961F\u957F\u548C Boss \u4F7F\u7528 3D\uFF0C\u7EA2\u84DD\u5C0F\u5175\u4F7F\u7528\u52A8\u6001\u539F\u753B\u3002",ai:"\u4F7F\u7528\u539F\u753B\u89D2\u8272\u548C\u52A8\u6001\u8D34\u56FE\u3002","3d":"\u6240\u6709\u89D2\u8272\u90FD\u4F7F\u7528 3D \u6A21\u578B\uFF0C\u53EF\u770B\u6E05\u8DD1\u52A8\u3001\u70AE\u8EAB\u540E\u5750\u548C\u53CC\u62F3\u7838\u5730\u3002"},hS=matchMedia("(pointer:coarse)").matches;Ne("instruction").textContent=hS?"\u5DE6\u53F3\u62D6\u52A8 \xB7 \u4E0B\u62C9\u540E\u64A4 \xB7 \u81EA\u52A8\u5F00\u706B":"\u65B9\u5411\u952E / WASD \u79FB\u52A8 \xB7 \u81EA\u52A8\u5F00\u706B";function Mg(s){try{return localStorage.getItem(s)}catch{return null}}function bg(s,e){try{localStorage.setItem(s,e)}catch{}}var uS=new URL(location.href).searchParams.get("art"),Ui=[uS,Mg("squad-art"),"hybrid"].find(s=>Object.prototype.hasOwnProperty.call(_g,s)),Ds=Mg("squad-mute")==="1",In=null,Ea=!1,ud=!1,bn=null,mh=null,Us=!0,ba=0,gr=0,fd=0,cd=0,hd=0,Sg=0,dd=!1,pd=!1,md=!1,gd=0,Di=null,xr=new Set,hs=og();hs.setMuted(Ds);function Eg(){let s=Ds?"\u5F00\u542F\u58F0\u97F3":"\u5173\u95ED\u58F0\u97F3";Ne("soundIcon").setAttribute("href",Ds?"#i-mute":"#i-sound"),Ne("sound").setAttribute("aria-label",s),Ne("sound").title=s}Eg();var le=new tl(s=>{s.kind!=="smallShot"&&s.kind!=="loss"&&In?.feedback(s),hs.play(s.kind,s.strength,s.supply)}),dh=Number(new URL(location.href).searchParams.get("stage"));Number.isInteger(dh)&&dh>=1&&dh<=_i&&le.reset(dh);function wg(s){return s.chapter.name+(s.number===10?" \xB7 \u9AD8\u96BE":"")}Ne("missionNumber").textContent=String(le.stage).padStart(2,"0");Ne("missionChapter").textContent=wg(le.route);Ne("missionName").textContent=le.route.name;for(let s of Mh){let e=document.createElement("section");e.className="chapter",e.dataset.theme=s.theme;let t=document.createElement("header");t.className="chapter-heading";let n=document.createElement("h3");n.textContent=s.name;let i=document.createElement("span");i.textContent=String(s.first).padStart(2,"0")+" \u2014 "+String(s.last).padStart(2,"0"),t.append(n,i);let r=document.createElement("div");r.className="chapter-stages";for(let a of Bi.slice(s.first-1,s.last)){let o=document.createElement("button"),c=document.createElement("b");c.textContent=String(a.number).padStart(2,"0");let l=document.createElement("span");if(l.className="stop-name",l.textContent=a.name,o.dataset.level=a.number,o.setAttribute("aria-label","\u7B2C "+a.number+" \u5173 "+a.name),o.append(c,l),a.number===10){let h=document.createElement("small");h.className="siege-label",h.textContent="\u9AD8\u96BE",o.append(h),o.dataset.hard="",o.setAttribute("aria-label","\u7B2C 10 \u5173 "+a.name+" \u9AD8\u96BE")}o.addEventListener("click",()=>yd(a.number)),r.append(o)}e.append(t,r),Ne("stageList").append(e)}Ne("stageList").addEventListener("keydown",s=>{let e={ArrowLeft:-1,ArrowRight:1,ArrowUp:-5,ArrowDown:5};if(!Object.prototype.hasOwnProperty.call(e,s.code)||!s.target.dataset.level)return;let t=Math.min(_i,Math.max(1,+s.target.dataset.level+e[s.code]));s.preventDefault(),Ne("stageList").querySelector('[data-level="'+t+'"]').focus()});function vd(){xr.clear(),Di=null}function ph(s,e){Ns.textContent=s,Ns.hidden=!1,Sg=le.elapsed+e}function _d(s,e){if(Object.prototype.hasOwnProperty.call(_g,s)){Ui=ud?s:"3d",ti.dataset.art=Ui,Us=!0,e&&bg("squad-art",Ui);for(let t of Ne("options").children)t.setAttribute("aria-pressed",String(t.dataset.art===Ui)),t.disabled=!ud&&t.dataset.art!=="3d";bn==="art"&&(Ne("detail").textContent=yg[Ui])}}function Xo(){Ea&&(Tg(),le.start(),hs.unlock(),xd.hidden=!0,Ne("pause").hidden=!1,ti.dataset.phase=le.phase)}function yd(s=le.stage){vd(),le.reset(s),In.prepareBoss(le.boss.kind).then(()=>{Us=!0}),In.reset(le.x),ba=0,fd=0,Ns.hidden=!0,dd=!1,pd=!1,md=!1,gd=0;let e=new URL(location.href);e.searchParams.set("stage",le.stage),history.replaceState(null,"",e),Xo()}function vr(s){if(!Ea)return;vd(),ba=0,bn=s,Us=!0,vg.hidden=!1,ti.querySelector(".hud").inert=!0,xd.inert=!0;let e=s==="result"?le.phase:s,t={art:"art",levels:"map",pause:"pause",won:"medal",lost:"retreat"};if(Ne("dialog").dataset.panel=e,Ne("dialogIcon").setAttribute("href","#i-"+t[e]),Ne("dialogChapter").textContent=s==="levels"?"\u6E2F\u533A\u8FDC\u5F81":wg(le.route),Ne("resultStats").hidden=s!=="result",Ne("options").hidden=s!=="art",Ne("stageList").hidden=s!=="levels",Ne("dialog").classList.toggle("levels",s==="levels"),Ne("selectStage").hidden=s!=="pause"&&s!=="result",s==="levels"){hs.pause(),Ne("dialogTitle").textContent="\u6218\u5F79\u5730\u56FE",Ne("detail").textContent="",Ne("continue").textContent="\u8FD4\u56DE";for(let n of Ne("stageList").querySelectorAll("[data-level]"))n.setAttribute("aria-current",String(+n.dataset.level===le.stage))}if(Ne("secondary").hidden=s!=="pause",s==="art"&&(hs.pause(),Ne("dialogTitle").textContent="\u89D2\u8272\u753B\u9762",Ne("detail").textContent=yg[Ui],Ne("continue").textContent="\u786E\u5B9A",_d(Ui,!1)),s==="pause"&&(hs.pause(),Ne("dialogTitle").textContent="\u5DF2\u6682\u505C",Ne("detail").textContent="\u7B2C "+le.stage+" \u5173 \xB7 "+le.route.name,Ne("continue").textContent="\u7EE7\u7EED\u6E38\u620F"),s==="result"){let n=le.phase==="won",i=Math.floor(le.elapsed);if(Ne("resultKills").textContent=le.score,Ne("resultTime").textContent=Math.floor(i/60)+":"+String(i%60).padStart(2,"0"),n)Ne("dialogTitle").textContent=le.stage===_i?"\u5168\u90E8\u901A\u5173":`\u7B2C ${le.stage} \u5173\u901A\u8FC7`,Ne("detail").textContent=le.stage<_i?"\u4E0B\u4E00\u7AD9 \xB7 "+Bi[le.stage].name:"\u5C0F\u961F\u5DF2\u5B8C\u6210\u5168\u90E8\u822A\u7EBF\u3002";else{let r={signature:["\u961F\u957F\u51FA\u5C40",zn[le.boss.kind].name+"\u7684"+zn[le.boss.kind].skill+"\u547D\u4E2D\u4E86\u961F\u957F\u3002"],bossShot:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u5F39\u5E55\u51FB\u5012\u3002"],gap:["\u961F\u957F\u5760\u6865","\u9047\u5230\u7F3A\u53E3\u65F6\uFF0C\u63D0\u524D\u6362\u9053\uFF0C\u6216\u5E26\u4E0A\u67B6\u6865\u8865\u7ED9\u3002"],infantry:["\u5C0F\u961F\u5168\u706D","\u7EA2\u5175\u5DF2\u8D8A\u8FC7\u9632\u7EBF\u3002"],skyfall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u843D\u4E0B\u7684\u91CD\u7269\u51FB\u4E2D\u3002"],wall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u786C\u5899\u63A8\u51FA\u4E86\u8DD1\u9053\u3002"],breach:["\u9632\u7EBF\u5931\u5B88","Boss \u7A81\u7834\u4E86\u9632\u7EBF\u3002"],slam:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u843D\u5730\u51B2\u51FB\u51FB\u5012\u3002"]},a=le.boss.active&&!le.boss.defeated?`Boss \u8FD8\u5269 ${Math.ceil(le.boss.hp)} / ${le.boss.maxHp} \u751F\u547D`:"\u7EA2\u5175\u7A81\u7834\u4E86\u961F\u4F0D\u3002",[o,c]=r[le.lossReason]||["\u5C0F\u961F\u5168\u706D",a];Ne("dialogTitle").textContent=o,Ne("detail").textContent=c}Ne("continue").textContent=n&&le.stage<_i?"\u4E0B\u4E00\u5173":"\u518D\u73A9\u4E00\u6B21"}if(s==="levels"){let n=Ne("stageList").querySelector("[aria-current=true]");n.focus({preventScroll:!0}),n.scrollIntoView({block:"nearest"})}else Ne("continue").focus({preventScroll:!0})}function Tg(){Us=!0,bn=null,mh=null,vg.hidden=!0,ti.querySelector(".hud").inert=!1,xd.inert=!1,ba=0}function Ag(){let s=bn,e=mh;if(Tg(),s==="result"){yd(le.phase==="won"?le.stage<_i?le.stage+1:1:le.stage);return}if((s==="art"||s==="levels")&&e){vr(e);return}le.playing?hs.unlock():le.phase==="ready"&&Wo.focus({preventScroll:!0})}function Rg(){!Ea||!le.playing&&le.phase!=="ready"&&!le.resultReady||(mh=bn,vr("levels"))}Ne("level").addEventListener("click",Rg);Ne("selectStage").addEventListener("click",Rg);Ne("continue").addEventListener("click",Ag);Ne("secondary").addEventListener("click",()=>yd());Wo.addEventListener("click",Xo);Ne("sound").addEventListener("click",()=>{Ds=!Ds,bg("squad-mute",Ds?"1":"0"),hs.setMuted(Ds),Ds||hs.unlock(),Eg()});Ne("pause").addEventListener("click",()=>{le.playing&&vr("pause")});Ne("styles").addEventListener("click",()=>{mh=bn,vr("art")});for(let s of Ne("options").children)s.addEventListener("click",()=>_d(s.dataset.art,!0));Sa.addEventListener("pointerdown",s=>{!Ea||bn||!s.isPrimary||s.button!==0||(le.phase==="ready"&&Xo(),le.playing&&(s.preventDefault(),Di={id:s.pointerId,x:s.clientX,y:s.clientY},Sa.setPointerCapture(s.pointerId)))});Sa.addEventListener("pointermove",s=>{!Di||s.pointerId!==Di.id||bn||(le.aim(le.targetX+(s.clientX-Di.x)*14.8/ti.clientWidth,le.targetZ+(s.clientY-Di.y)*11/ti.clientHeight),Di.x=s.clientX,Di.y=s.clientY)});function fS(s){s.pointerId===Di?.id&&(Di=null)}for(let s of["pointerup","pointercancel","lostpointercapture"])Sa.addEventListener(s,fS);var Cg=["ArrowLeft","KeyA"],Pg=["ArrowRight","KeyD"],Ig=["ArrowUp","KeyW"],Lg=["ArrowDown","KeyS"];window.addEventListener("keydown",s=>{if(!Ea||s.altKey||s.ctrlKey||s.metaKey)return;let e=s.code;if(bn){bn!=="result"&&(e==="Escape"||e==="KeyP")&&!s.repeat&&(s.preventDefault(),Ag());return}if(Cg.includes(e)||Pg.includes(e)||Ig.includes(e)||Lg.includes(e)){s.preventDefault(),le.phase==="ready"&&Xo(),xr.add(e);return}s.repeat||((e==="Space"||e==="Enter")&&le.phase==="ready"&&!(s.target instanceof HTMLButtonElement&&s.target!==Wo)?(s.preventDefault(),Xo()):(e==="KeyP"||e==="Escape"||e==="Space")&&le.playing&&!(e==="Space"&&s.target instanceof HTMLButtonElement)&&(s.preventDefault(),vr("pause")))});window.addEventListener("keyup",s=>xr.delete(s.code));function Md(){vd(),le.playing&&!bn&&vr("pause")}window.addEventListener("blur",Md);document.addEventListener("visibilitychange",()=>{gr=0,document.hidden&&Md()});var lg=-1,cg=-1,hg=-1,ug=-1,fg=-1,dg=1,pg=null,mg=-1,dS=matchMedia("(prefers-reduced-motion: reduce)");function gg(s,e,t){if(e===t)return;let n=Ne(s);if(n.textContent=e,!(!le.playing||t<0||dS.matches||!n.animate)){for(let i of n.getAnimations())i.cancel();n.animate([{transform:"scale(1.17)",color:e>t?"#ffe097":"#ffa488"},{transform:"scale(1)",color:"#fff9e9"}],{duration:240,easing:"ease-out"})}}function pS(){let s=le.allies.length,e=le.cannonDamage,t=Ne("level"),n="\u7B2C "+le.stage+" \u5173";Ne("levelText").textContent!==n&&(Ne("levelText").textContent=n);let i=Math.min(100,Math.floor(100*le.row/le.finaleRow));i!==mg&&(Ne("progress").firstElementChild.style.transform="scaleX("+i/100+")",Ne("progress").setAttribute("aria-valuenow",String(i)),mg=i),t.title=le.route.name+" \xB7 \u9009\u62E9\u5173\u5361";let o=[Object.entries(le.buffs).filter(([,d])=>d>0).map(([d,f])=>wn[d].label+" "+Math.ceil(f)+"\u79D2").join(" \xB7 "),le.planks?"\u4FBF\u6865 \xD7"+le.planks:"",le.chill>0?"\u971C\u51BB "+Math.ceil(le.chill)+"\u79D2":""].filter(Boolean).join(" \xB7 "),c=Ne("buffs");c.textContent!==o&&(c.textContent=o),c.hidden=!o||!le.playing,gg("count",s,lg),gg("power",e,cg),lg=s,cg=e,ti.dataset.phase=le.phase;let l=Ne("armorMeter");if(l.hidden=!le.playing||le.armor===3,!l.hidden){let d=In.project(le.x,1.94*le.visualScale,le.captainZ);l.style.transform="translate("+d.x.toFixed(1)+"px,"+d.y.toFixed(1)+"px)",l.dataset.value!==String(le.armor)&&(l.dataset.value=le.armor,l.setAttribute("aria-label","\u961F\u957F\u62A4\u7532 "+le.armor+" / 3"))}let h=le.boss;if(cs.hidden=!h.active||h.defeated||In.project(h.x,0,h.z).y<4,!cs.hidden){let d=zn[h.kind],[f,u]=d.crown,p=h.z+u*Math.cos(h.yaw),x=In.project(h.x,f+h.lift,p);if(Ui!=="ai"&&vf[h.kind]){x.y=1/0;for(let[A,R,L]of vf[h.kind]){let z=h.z+R*Math.cos(h.yaw)-L*Math.abs(Math.sin(h.yaw));x.y=Math.min(x.y,In.project(h.x,A+h.lift,z).y-9)}}let g=In.project(h.x+1,f+h.lift,p).x-x.x,m=Math.round(Math.min(ti.clientWidth*.28,114,Math.max(66,g*2.55)));fg!==m&&(cs.style.setProperty("--hp-width",m+"px"),fg=m),Ne("bossName").textContent!==d.name&&(Ne("bossName").textContent=d.name);let v=Ne("level").closest(".hud"),M=v.offsetTop+v.offsetHeight+22,_=1-Math.min(1,Math.max(0,(x.y+4-M)/27));pg!==h&&(dg=x.x<ti.clientWidth/2?1:-1,pg=h);let b=m/2+6,S=Math.max(b,Math.min(ti.clientWidth-b,x.x+dg*_*(m/2+g*1.7))),y=Math.max(M,x.y+4);cs.style.transform=`translate(${S.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%, -100%)`;let E=Math.ceil(h.hp);(E!==hg||h.maxHp!==ug)&&(cs.firstElementChild.style.transform=`scaleX(${h.hp/h.maxHp})`,cs.lastElementChild.textContent=E,cs.setAttribute("aria-valuenow",String(E)),cs.setAttribute("aria-valuemax",String(h.maxHp)),hg=E,ug=h.maxHp)}le.playing&&!bn&&(!dd&&le.wall.hp>0&&le.distance>=10&&le.wall.z<0&&(dd=!0,ph("\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00",3)),le.wall.hp<=0&&Ns.textContent==="\u51FB\u788E\u786C\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00"&&(Ns.hidden=!0),!cs.hidden&&!pd&&(pd=!0,ph(zn[h.kind].name+" \xB7 \u91CD\u70AE\u76F4\u51FB\uFF0C\u907F\u5F00\u843D\u70B9",2.2)),h.defeated&&!md&&h.defeatAge>=.92&&(md=!0,ph("Boss \u5DF2\u5012\u4E0B\uFF0C\u6E05\u7406\u5269\u4F59\u7EA2\u5175",2.3)),le.hint&&le.hint.id!==gd&&(gd=le.hint.id,ph(le.hint.text,2.1)),!Ns.hidden&&le.elapsed>=Sg&&(Ns.hidden=!0)),!le.playing&&le.phase!=="ready"&&(Ns.hidden=!0,Ne("pause").hidden=!0,le.resultReady&&!bn&&vr("result"))}function Ng(s){if(requestAnimationFrame(Ng),document.hidden)return;if(bn&&!Us){gr=s;return}if(!bn&&le.phase==="ready"&&gr&&s-gr<1e3/29&&!Us)return;Us=!1;let e=gr?(s-gr)/1e3:1/60;gr=s;let t=Math.min(.08,Math.max(0,e)),n=0;if(!bn){if(fd+=t,le.playing||le.phase==="won"||le.phase==="lost")for(ba+=t;ba>=1/60;){let i=Number(Pg.some(a=>xr.has(a)))-Number(Cg.some(a=>xr.has(a))),r=Number(Lg.some(a=>xr.has(a)))-Number(Ig.some(a=>xr.has(a)));le.tick(1/60,i,r),n+=le.worldAdvance,ba-=1/60}le.playing&&(hd+=t,e>.031&&cd++,hd>2.1&&(cd>24&&In.lowerResolution(),cd=0,hd=0))}In.draw(le,fd,bn?0:t,n,Ui),pS()}function xg(s){let e=Ne("problem");e.hidden=!1,e.textContent=s;let t=document.createElement("button");t.textContent="\u91CD\u65B0\u8F7D\u5165",t.onclick=()=>location.reload(),e.append(t)}async function mS(){try{In=sg(Sa,ti),In.reset(le.x);let s=()=>{In.resize(),le.entryZ=In.entryZ(),Us=!0};s(),new ResizeObserver(s).observe(ti),window.addEventListener("resize",s),Sa.addEventListener("webglcontextlost",e=>{e.preventDefault(),Md(),xg("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u6E38\u620F\u3002")}),ud=await In.assets,await In.prepareBoss(le.boss.kind),_d(Ui,!1),Ea=!0,ti.dataset.phase="ready",Wo.disabled=!1,Wo.lastElementChild.textContent="\u5F00\u59CB\u51FA\u51FB",requestAnimationFrame(Ng)}catch(s){console.error(s),xg("\u6E38\u620F\u9700\u8981\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5728 Safari \u6216 Chrome \u4E2D\u6253\u5F00\u3002")}}mS();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
