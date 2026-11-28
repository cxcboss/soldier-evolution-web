var Nh={speed:27,lift:0,tail:1.05},tl={speed:23,lift:.34,tail:1.35},qs={speed:20,lift:.78,tail:2.05},xs={speed:40,lift:.08,tail:4.15},i0=22,s0=30;function nl(i,e){let t=Math.min(1,e/i.aimDistance);return i.startY+(i.endY-i.startY)*t+4*i.lift*t*(1-t)}function Rr(i,e,t){return t.x=i.startX+i.headingX*e,t.y=nl(i,e),t.z=i.startZ+i.headingZ*e,t}function Tt(i,e,t){let n=Math.max(0,Math.min(1,(i-e)/(t-e)));return n*n*(3-2*n)}function il(i){return Math.max(0,Math.min(1,(i-.3)/(.91-.3)))}var Dh=(i,e,t)=>Math.min(t,Math.max(e,i)),bn={bruiser:{crown:[4.91,0],name:"\u94C1\u62F3\u961F\u957F",skill:"\u9707\u6865\u91CD\u62F3",prompt:"\u91CD\u62F3\u84C4\u529B\uFF0C\u907F\u5F00\u62F3\u5370",color:"#ffc66c",height:4.5,aim:2.05,warm:.86,flight:.65,cooldown:6.3},diver:{crown:[3.74,-1.78],name:"\u6F6E\u94B3\u5DE8\u87F9",skill:"\u53CC\u94B3\u6F6E\u6C50",prompt:"\u53CC\u94B3\u5408\u51FB\uFF0C\u4E24\u9053\u6C34\u73AF\u4E4B\u95F4\u6709\u7A7A\u9699",color:"#39e4d5",height:2.32,aim:1.12,warm:.9,flight:.86,cooldown:6.3},warden:{crown:[3.47,-1.49],name:"\u91D1\u89D2\u91CD\u7280",skill:"\u94C1\u89D2\u51B2\u950B",prompt:"\u91CD\u7280\u538B\u4F4E\u4E86\u89D2\uFF0C\u95EA\u5F00\u91D1\u8272\u76F4\u9053",color:"#ffb847",height:2.84,aim:1.55,warm:1.12,flight:.82,cooldown:7.1},drill:{crown:[3.79,-1.65],name:"\u7D2B\u6676\u5730\u9F99",skill:"\u5730\u8109\u6676\u523A",prompt:"\u6676\u523A\u9010\u4E2A\u5192\u51FA\uFF0C\u79BB\u5F00\u7D2B\u5708",color:"#ce82ff",height:3.39,aim:1.6,warm:.89,flight:.52,cooldown:6.4},kestrel:{crown:[4.12,-2.03],name:"\u51B0\u7FFC\u98DE\u9F99",skill:"\u6781\u5BD2\u5410\u606F",prompt:"\u51B0\u9F99\u6B63\u5728\u5438\u6C14\uFF0C\u79BB\u5F00\u971C\u84DD\u6247\u5F62",color:"#78eaff",height:3.35,aim:1.92,warm:1.15,flight:.45,cooldown:6.5},engine:{crown:[3.72,-1.9],name:"\u7194\u7089\u86DB\u673A",skill:"\u7194\u82AF\u53CC\u70AE",prompt:"\u53CC\u70AE\u9501\u5B9A\uFF0C\u79BB\u5F00\u6A59\u7EA2\u843D\u70B9",color:"#ff8253",height:2.68,aim:1.33,warm:.94,flight:1.12,cooldown:6.8}},Uh=(i,e)=>Dh((i.age-i.warm-e.delay)/i.flight,0,1);function r0(i,e,t,n,s=0){if(e.shape==="circle")return Math.hypot(t-e.x,n-e.z)<e.radius+s;let r=e.x-i.x,a=e.z-i.z,o=Math.hypot(r,a)||1,c=((t-i.x)*r+(n-i.z)*a)/o,l=e.shape==="cone"?e.radius*Dh(c/o,.05,1):e.radius;return c>-.1&&c<o+1.65+s&&Math.abs((t-i.x)*a-(n-i.z)*r)/o<l+s}function R1(i){let e=i.boss,t=e.kind,n=bn[t],s=i.x,r=i.captainZ,a=s>.7?-1:1,o=[],c=(l,u,d,f=0,h="circle")=>o.push({x:Dh(l,-5.85,5.85),z:u,radius:d,delay:f,shape:h,hit:!1});return t==="diver"?(c(s-1.55,r,.96),c(s+1.55,r,.96,.13)):t==="warden"?c(e.x,r+.42,1.04,0,"strip"):t==="drill"?(c(s,r-.64,.89),c(s+a*.68,r+.07,.88,.26),c(s+a*1.45,r+.68,.91,.52)):t==="kestrel"?c(s,r+.74,1.31,0,"cone"):t==="engine"?(c(s,r-.17,1.12),c(s+a*2.42,r+.52,1.14,.37)):c(s,r-.44,1.16),e.skill={kind:t,x:e.x,z:e.z+.38,height:n.aim,age:0,warm:n.warm,flight:n.flight,marks:o,casualties:0,damagedCaptain:!1},i.notice(n.prompt),e.skill}function C1(i,e,t){let n=i.stage<7?2:3;if(i.event(e.kind+"Strike",t.x,.1,t.z),i.allies=i.allies.filter(s=>{if(e.casualties>=n||!r0(e,t,s.x,s.z,.12))return!0;let r=i.fall(s,"blue",.7,t.x);return r.vy=e.kind==="engine"?3.8:2.6,e.casualties++,!1}),!(e.damagedCaptain||!r0(e,t,i.x,i.captainZ,.16))){if(e.damagedCaptain=!0,i.buffs.shield>0){i.event("shieldHit",i.x,.6,i.captainZ);return}e.kind==="kestrel"&&(i.chill=1.6),!(i.hitGuard>0)&&(i.hurt=1,i.hitGuard=1.15,i.armor--,i.armor<=0&&(i.lossReason="signature",i.finish(!1)))}}function a0(i,e){let t=i.boss,n=t.hp>0&&t.hp<=t.maxHp*.5,s=i.route.siege&&n;if(n&&!t.enraged&&t.active&&!t.defeated&&(t.enraged=!0,t.nextCast=Math.min(t.nextCast,s?1.3:1.8),i.event("bossEnrage",t.x,1.2,t.z,1.25),i.notice(s?"\u5730\u9F99\u8FDB\u5165\u72C2\u653B\uFF0C\u8FDE\u7EED\u907F\u5F00\u6676\u523A":bn[t.kind].name+"\u8FDB\u5165\u72C2\u66B4\uFF0C\u653B\u52BF\u52A0\u5FEB\uFF01")),s&&!t.secondWind&&(t.secondWind=!0),!t.skill){t.nextCast-=e,t.z>=-30&&t.z<(s?-1.65:-5.2)&&!i.activeGround.some(a=>a.finale&&!a.crossed&&Math.abs(a.z-t.z)<7)&&!t.vault&&!t.attackT&&t.nextCast<=0&&R1(i);return}let r=t.skill;r.age+=e,!r.fired&&r.age>=r.warm&&(r.fired=!0,i.event(r.kind+"Cast",t.x,bn[r.kind].aim,t.z+.37));for(let a of r.marks)if(!a.hit&&Uh(r,a)>=1&&(a.hit=!0,C1(i,r,a),!i.playing))return;r.age>r.warm+r.flight+r.marks.at(-1).delay+.65&&(t.skill=null,t.nextCast=s?1.8:bn[t.kind].cooldown*(t.enraged?.76:1))}var Xi=i=>4.4*i,Cr=i=>["\u5DE6\u8DEF","\u4E2D\u8DEF","\u53F3\u8DEF"][i+1],$n={quay:{floor:"#d8d0c8",joint:"#b1a69e",line:"#8998a8",rim:"#fff4e6",deep:"#0a3356",glint:"#39a3b8",frame:"#4f627a",railTop:"#eef3f8",lampGlow:"#ffcf66",hemiSky:"#fff8ec",hemiGround:"#3d6988",hemiIntensity:1.42,keyLight:"#ffe8c2",keyIntensity:2.28,rimLight:"#6ad2ff",rimIntensity:.95,fog:"#15436b",fogDensity:.0072,skyTop:"#0d3163",skyHorizon:"#3f8bbd",sunColor:"#ffdf92",moteColor:"#fff3d4",moteStyle:"breeze",exposure:1.04},timber:{floor:"#c8a684",joint:"#8f6a4b",line:"#79593e",rim:"#f0d7b5",deep:"#0d3538",glint:"#3ca384",frame:"#6b4e38",railTop:"#d7b287",lampGlow:"#ffd87a",hemiSky:"#f7fce8",hemiGround:"#3a5c46",hemiIntensity:1.4,keyLight:"#ffecc0",keyIntensity:2.25,rimLight:"#82ebb8",rimIntensity:.92,fog:"#174240",fogDensity:.0076,skyTop:"#143c47",skyHorizon:"#4c8e78",sunColor:"#ffe79e",moteColor:"#e7ffaa",moteStyle:"breeze",exposure:1.03},quarry:{floor:"#d2b296",joint:"#9e7a5f",line:"#83634c",rim:"#f5dfc8",deep:"#24233b",glint:"#a86b52",frame:"#765748",railTop:"#dab491",lampGlow:"#ffad4d",hemiSky:"#fff0dc",hemiGround:"#63433b",hemiIntensity:1.38,keyLight:"#ffd296",keyIntensity:2.38,rimLight:"#ff9666",rimIntensity:.96,fog:"#3d2c36",fogDensity:.0078,skyTop:"#241f40",skyHorizon:"#b56d54",sunColor:"#ffb96b",moteColor:"#ffda9e",moteStyle:"breeze",exposure:1.03},forge:{floor:"#9eaab8",joint:"#637184",line:"#d6a449",rim:"#dce6f2",deep:"#0b1e33",glint:"#3a668a",frame:"#435368",railTop:"#b7c7d6",lampGlow:"#ff9538",hemiSky:"#d9ecff",hemiGround:"#3e4252",hemiIntensity:1.36,keyLight:"#ffe1be",keyIntensity:2.32,rimLight:"#ff8a42",rimIntensity:1.15,fog:"#152840",fogDensity:.008,skyTop:"#0d1d35",skyHorizon:"#3c5a7a",sunColor:"#ffa858",moteColor:"#ffb464",moteStyle:"embers",exposure:1.05},ice:{floor:"#cde2f2",joint:"#8db4cf",line:"#6a9ec4",rim:"#f2fbff",deep:"#0b2b4a",glint:"#5ce1f0",frame:"#567c9c",railTop:"#e3f7ff",lampGlow:"#7af4ff",hemiSky:"#e8f9ff",hemiGround:"#3e6f94",hemiIntensity:1.48,keyLight:"#eef9ff",keyIntensity:2.22,rimLight:"#68ffe0",rimIntensity:1.12,fog:"#143c5e",fogDensity:.0075,skyTop:"#081b38",skyHorizon:"#2b6c94",sunColor:"#b0f6ff",moteColor:"#e8fcff",moteStyle:"snow",exposure:1.02},cinder:{floor:"#786c75",joint:"#d95729",line:"#ff8838",rim:"#b8a8b2",deep:"#330c09",glint:"#ff6e24",frame:"#4d3a42",railTop:"#9c8691",lampGlow:"#ff6826",hemiSky:"#ffd9c4",hemiGround:"#7a2514",hemiIntensity:1.42,keyLight:"#ffd2a8",keyIntensity:2.35,rimLight:"#ff5e28",rimIntensity:1.38,fog:"#3d1514",fogDensity:.0085,skyTop:"#210a12",skyHorizon:"#9c361d",sunColor:"#ff7a33",moteColor:"#ff9640",moteStyle:"embers",exposure:1.08}},Fh=[["\u706F\u5854\u5916\u6E2F","quay"],["\u60AC\u7D22\u6797\u8C37","timber"],["\u56DE\u58F0\u77FF\u5CE1","quarry"],["\u94A2\u94C1\u8239\u575E","forge"],["\u6781\u5149\u51B0\u6CB3","ice"],["\u7194\u5FC3\u88C2\u8C37","cinder"]].map(([i,e],t)=>({number:t+1,name:i,theme:e,first:t*5+1,last:t*5+5})),Wt=(i,e)=>({kind:"skyfall",lane:i,at:e,radius:1.82}),Pt=(i,e,t=3.6)=>({kind:"gap",lane:i,at:e,length:t}),Ot=(i,e)=>({kind:"bridge",lane:i,at:e,length:4.4}),mt=(i,e,t="reserve")=>({kind:"cache",lane:i,at:e,reward:t}),ln=(i,e)=>({kind:"coil",lane:i,at:e}),un=(i,e,t)=>({kind:"belt",lane:i,at:e,direction:t,length:8.2}),P1=[["\u6E2F\u53E3\u5916\u6865","bruiser",!1,[mt(-1,59,"squad")]],["\u5378\u8D27\u6808\u6865","diver",!0,[Pt(1,42),mt(-1,75,"engineer")]],["\u540A\u7D22\u7801\u5934","warden",!1,[Ot(1,49),mt(-1,83,"medic")]],["\u6D77\u5824\u5C94\u53E3","drill",!1,[mt(1,37,"reserve"),Pt(-1,65),ln(0,94)]],["\u706F\u5854\u822A\u9053","kestrel",!0,[un(-1,41,1),Pt(1,69),mt(0,89,"frost")]],["\u6797\u573A\u540A\u8FD0\u7EBF","engine",!1,[Wt(1,55),ln(-1,39),Ot(1,68),mt(-1,96,"engineer")]],["\u6797\u95F4\u6D6E\u6865","bruiser",!0,[Pt(-1,35),mt(1,53,"engineer"),Pt(1,82),un(0,104,-1)]],["\u6728\u6599\u95F8\u53E3","diver",!1,[Wt(-1,73),mt(1,37,"medic"),Ot(-1,60),ln(1,82),Pt(0,105)]],["\u53CC\u7D22\u5CE1\u5ECA","warden",!1,[mt(-1,35,"reserve"),mt(1,55,"frost"),Pt(0,80),Ot(-1,105)]],["\u60AC\u7D22\u5C01\u9501\u6218","drill",!0,[Wt(1,51),Wt(0,74),Wt(-1,99),Ot(-1,40),ln(0,61),Ot(1,86),mt(1,107,"reserve")]],["\u6EAA\u8C37\u77FF\u53E3","diver",!0,[Pt(0,37),Ot(1,60),mt(-1,84,"engineer"),Pt(-1,107)]],["\u8FD0\u77FF\u659C\u5761","warden",!1,[Wt(1,64),un(0,34,1),mt(1,53,"medic"),Ot(-1,77),ln(0,106)]],["\u5CE1\u8C37\u6551\u63F4","kestrel",!1,[mt(-1,33,"medic"),Pt(1,58),un(0,80,-1),mt(-1,105,"reserve")]],["\u6C34\u95F8\u77FF\u9053","engine",!0,[Ot(-1,36),ln(1,54),Ot(1,81),mt(0,108,"frost")]],["\u788E\u77F3\u8F6C\u8FD0\u6865","drill",!0,[Wt(0,88),ln(1,35),Pt(-1,57),mt(0,78,"engineer"),Pt(1,99),un(-1,116,1)]],["\u7801\u5934\u88C5\u914D\u7EBF","bruiser",!1,[Wt(1,65),un(-1,38,1),mt(0,52,"reserve"),ln(1,75),Ot(-1,97),Pt(1,119)]],["\u56DE\u8F6C\u8239\u53F0","kestrel",!0,[un(0,35,-1),Pt(1,55),mt(-1,73,"engineer"),un(1,93,-1),Pt(0,116),mt(-1,138,"reserve")]],["\u91CD\u9524\u88C5\u914D\u7EBF","engine",!1,[Wt(0,62),Wt(1,110),mt(1,36,"frost"),un(-1,55,1),Ot(1,75),ln(0,98),mt(-1,121,"reserve")]],["\u8239\u575E\u540A\u67B6","warden",!0,[Ot(1,37),Pt(-1,56),mt(0,79,"medic"),Pt(1,101),ln(-1,123)]],["\u9F99\u95E8\u591C\u822A","diver",!0,[Wt(-1,65),Wt(0,108),ln(0,34),mt(-1,54,"engineer"),Ot(1,77),un(0,96,1),Pt(-1,120)]],["\u51BB\u6CB3\u6E21\u53E3","drill",!1,[Wt(0,67),Pt(1,37),un(0,56,-1),mt(-1,78,"frost"),Ot(1,102),ln(0,123)]],["\u6D6E\u51B0\u957F\u5824","engine",!0,[mt(-1,35,"reserve"),Ot(1,54),ln(-1,74),un(0,94,-1),Pt(1,119)]],["\u51B0\u810A\u53CC\u7D22","warden",!1,[Wt(1,64),Wt(-1,107),Ot(-1,34),mt(1,52,"engineer"),Pt(0,72),Ot(1,94),Pt(-1,124),mt(-1,143,"squad")]],["\u6781\u5730\u98CE\u5ECA","kestrel",!0,[un(1,35,-1),ln(0,55),un(-1,75,1),mt(1,95,"medic"),Ot(0,121)]],["\u51B0\u5CE1\u6700\u540E\u4E00\u8DE8","diver",!0,[Wt(1,65),Wt(0,104),Pt(-1,34),mt(1,52,"engineer"),Ot(0,72),Pt(1,93),ln(-1,114),mt(1,134,"reserve")]],["\u7070\u70EC\u5C01\u9501\u7EBF","bruiser",!1,[Wt(1,65),mt(1,35,"reserve"),Ot(-1,55),un(0,75,1),ln(1,95),Ot(1,115),Pt(-1,134)]],["\u7194\u5CA9\u7AD6\u4E95","drill",!0,[Wt(1,62),Wt(-1,105),ln(-1,33),mt(0,51,"frost"),Pt(1,72),un(-1,91,1),Ot(1,112),mt(-1,132,"medic")]],["\u9ED1\u66DC\u65AD\u5D16","kestrel",!0,[Pt(1,33),un(-1,51,1),Ot(0,73),mt(-1,92,"engineer"),Pt(0,114),un(1,136,-1)]],["\u7EA2\u7089\u4E09\u7EBF","warden",!1,[Wt(0,64),Wt(-1,108),Ot(1,35),ln(-1,53),mt(0,73,"reserve"),Pt(-1,93),Ot(0,114),ln(1,135)]],["\u7194\u5FC3\u7EC8\u6865","engine",!0,[Wt(0,63),Wt(-1,101),Wt(0,142),mt(-1,34,"engineer"),Pt(1,52),Ot(-1,72),ln(0,91),un(1,110,-1),Ot(1,132),mt(-1,151,"medic")]]],I1=[.45,.68,.53,.6,.65,.7,.76,.81,.93,1.62],qi=P1.map(([i,e,t,n],s)=>{let r=s+1,a=Fh[Math.floor(s/5)],o=I1[s]??.87+(r-11)*.019,c=r===10,l=.565/Math.sqrt(o),u=6.4/o,d=r<=3?[135,154,144][s]:151+s*2.55+(c?15:0),f=c?60:44,h=Math.round(d/(l+.38/11+u/f));return{number:r,name:i,chapter:a,theme:a.theme,boss:e,vault:t,features:n,pressure:o,siege:c,rowSpacing:l,restEvery:f,restLength:u,finale:h,bossHP:Math.round(3800+(385+s*26)*o*(c?6.45:2.2)),wallHP:Math.round((72+s*1.55)*Math.min(1.35,o)),contactGrace:1.24/Math.sqrt(o)}}),ai=qi.length;function Pa(i,e){let t={glass:21,crates:49,shutter:78},n=i.kind==="cover"?t[i.variant]:i.kind==="cache"?60:i.kind==="bridge"?42:29,s=Math.round((.56+.44*qi[e-1].pressure)*(n+(e-1)*(i.kind==="cover"?.75:1.15)));return{...i,x:Xi(i.lane),z:-i.at,hp:s,maxHp:s,state:"ready",age:0,flash:0,half:i.kind==="cover"?1.94:i.kind==="cache"?1.67:.74,depth:i.kind==="cover"?.46:i.kind==="cache"?.38:.34}}function Ys(i){return i.kind==="gap"&&i.state!=="repaired"||i.kind==="bridge"&&i.state==="cut"}function sl(i,e,t,n=0){return Ys(i)&&Math.abs(e-i.x)<4.4/2-.14-n&&Math.abs(t-i.z)<i.length/2-n}var gi=4.4-.4,Rn={plus:{label:"+3",hp:10,count:3,tone:"blue"},squad:{label:"+5",hp:39,count:5,tone:"blue"},merge:{label:"\u70AE+5",hp:45,tone:"gold"},range:{label:"\u8FDC\u5C04",hp:28,tone:"blue"},longshot:{label:"\u7A7F\u7532\u8FDC\u5C04",hp:37,tone:"gold"},rapid:{label:"\u8FDE\u5C04",hp:35,tone:"gold"},shield:{label:"\u62A4\u76FE",hp:41,tone:"blue"},blast:{label:"\u7206\u7834",hp:44,tone:"gold"},plasma:{label:"\u7535\u6D46",hp:45,tone:"blue"},spread:{label:"\u53CC\u53D1",hp:41,tone:"gold"},drone:{label:"\u652F\u63F4",hp:45,tone:"blue"},reserve:{label:"+6",hp:38,count:6,tone:"blue"},engineer:{label:"\u67B6\u6865",hp:35,tone:"gold"},medic:{label:"\u6551\u63F4",hp:30,tone:"blue"},frost:{label:"\u51B0\u5E55",hp:37,tone:"blue"},fever:{label:"\u72C2\u70ED",hp:48,tone:"gold"}};function Bh(i,e,t,n){let s=Rn[t].hp+(t==="plus"?Math.min(8,n-1):(n-1)*1.05),r=Math.round(s*(.66+.34*qi[n-1].pressure));return{x:i,at:e,z:-e,type:t,hp:r,maxHp:r,active:!0,flash:0}}var o0=[[0,1,"glass","range","plus"],[1,-1,"crates","spread","squad"],[-1,0,"shutter","longshot","shield"],[1,0,"glass","blast","reserve"],[0,-1,"crates","drone","range"],[-1,1,"shutter","fever","squad"],[0,1,"glass","plasma","medic"],[1,-1,"crates","reserve","rapid"],[-1,0,"shutter","longshot","range"]],Oh=[[0,1,"glass","range","plus"],[1,-1,null,"merge","squad"],[-1,0,"glass","blast","squad"],[0,1,null,"squad","range"]],l0=[[0,1,"glass","plasma","plus"],[1,0,"crates","squad","shield"],[0,-1,"shutter","longshot","blast"],[-1,1,"glass","drone","rapid"],[1,0,"shutter","reserve","range"],[0,-1,"crates","medic","shield"]];function c0(i,e=[]){let t=[];function n(s,r,a){let o=Bh(Xi(s),r,a,i);return t.push(o),o}n(0,11,"plus"),n(-1,16,"merge"),n(1,25,"squad"),i===1&&n(0,28,"blast"),i===8&&n(0,29,"reserve");for(let s=0;s<10;s++){let r=36+s*16.2,a=o0[(s+(i-1)*2)%o0.length];i===10&&(a=l0[s%l0.length]),i===1&&(a=Oh[s%Oh.length]),i===8&&s<2&&(a=Oh[s]);let[o,c,l,u]=a,d=(i===12||i===15)&&s===1?"reserve":a[4],f=i%2?1:-1,h=(v,_,y)=>!e.some(E=>E.lane===v&&E.at+(E.length||1)/2>=_-1.5&&E.at-(E.length||1)/2<=y+1.5),x=[...new Set([o*f,c*f,-1,0,1])].find(v=>h(v,r-3.6,r));if(x!==void 0){let v=n(x,r,u);l&&(v.coverSpec={kind:"cover",variant:l,lane:x,at:r-3.6,reward:u})}let g=r+(s%2?1.8:-.9),m=[c*f,0,-1,1].find(v=>v!==x&&h(v,g,g));m!==void 0&&n(m,g,d)}return t}var kh=(i,e,t)=>Math.min(t,Math.max(e,i)),zh=5.32,L1=.94;function Hh(i){let e=i.boss,t=i.x,n=i.captainZ,s=Math.hypot(t-e.x,n-e.z);for(let r of i.allies){let a=Math.hypot(r.x-e.x,r.z-e.z);a<s&&(s=a,t=r.x,n=r.z)}return{x:t,z:n,distance:s}}function Gh(i,e,t){let n=[];function s(r,a,o){r.z+o+.65<e||r.z-o-.65>t||n.push({x:r.x,z:r.z,half:a+L1,depth:o+.65})}for(let r of i.gates)r.active&&s(r,gi/2,.16);i.wall.hp>0&&s(i.wall,2.14,.32);for(let r of i.features)(r.kind==="cover"||r.kind==="cache")&&r.hp>0&&r.state==="ready"&&s(r,r.half,r.depth);return n}function Ia(i,e,t){let n=Gh(i,e,t),s=[...new Set([...i.wave||[0],0,-1,1])],r,a=1/0;for(let o of s){let c=o===0?-.42:Xi(o),l=n.filter(u=>Math.abs(c-u.x)<u.half+.12).length;if(l<a&&(r={lane:o,x:c,conflicts:l},a=l),!l)break}return r}function h0(i,e,t,n){let s=i.boss,r=s.z+i.worldAdvance,a=kh(s.pursuing?t.x:s.escortX??-.42,-zh,zh),o=s.pursuing?Math.min(r+n,Math.max(s.z-e*3.9,t.z-1.35)):r+n,c=Gh(i,Math.min(r,o)-.2,Math.max(r,o)+3),l=a,u=x=>c.every(g=>Math.abs(x-g.x)>=g.half+.025);if(!u(a)||!u(s.x)){let x=[a,s.x,Xi(-1),0,Xi(1)];for(let m of c)x.push(m.x-m.half-.07,m.x+m.half+.07);let g=1/0;for(let m of x){if(Math.abs(m)>zh||!u(m))continue;let v=Math.abs(m-s.x)+.48*Math.abs(m-a);v<g&&(g=v,l=m)}}let d=(s.pursuing?5.1:c.length?3.5:1.2)*e,f=s.x+kh(l-s.x,-d,d),h=o;for(let x of c)Math.abs(f-x.x)>=x.half||Math.abs(h-x.z)>=x.depth||(Math.abs(s.x-x.x)>=x.half?f=x.x+Math.sign(s.x-x.x)*(x.half+.002):r<=x.z?h=Math.min(h,x.z-x.depth-.002):h=Math.max(h,x.z+x.depth+.002));let p=f-s.x;s.marched+=Math.hypot(p,h-r),s.yaw+=(kh(Math.atan2(p,Math.max(e*2,h-r)),-.6,.6)-s.yaw)*(1-Math.exp(-8*e)),s.x=f,s.z=h}function u0(i,e,t){let n=i.worldAdvance>0?i.roadSpeed:0;return!Gh(i,t-n*1.55,t+.25).some(s=>Math.abs(e-s.x)<s.half&&s.z-s.depth<=t&&s.z+n*1.55+s.depth>=t)}var Pr=(i,e,t)=>Math.max(e,Math.min(t,i)),N1=new Set(["cache","bridge","coil","cover"]);function D1(i,e,t){let n=Bh(e.x,i.distance-e.z+.85,t,i.stage);n.z=i.distance-n.at,i.gates.push(n),i.event("supplyBreak",e.x,.65,n.z)}function f0(i,e,t){if(e.state!=="ready")return;let n=e.variant==="shutter"&&Math.abs(t.x-e.x)<.51,s=t.damage;if(n&&(s*=2.25),e.variant==="crates"&&t.kind==="rocket"&&(s*=1.4),e.hp=Math.max(0,e.hp-s),e.flash=1,e.hp>0){n&&i.addPopup&&i.addPopup(t.x,1.15,t.z,"\u5F31\u70B9 \xD72.2","crit"),i.event(n?"latchHit":"wallHit",t.x,.65,t.z,.55);return}if(i.addOverdrive&&i.addOverdrive(8),i.addCombo&&i.addCombo(2),e.age=0,e.kind==="cover")if(e.state="open",e.variant==="glass"){i.event("glassBreak",e.x,.48,e.z);let r=a=>{a.alive&&Math.hypot(a.x-e.x,a.z-e.z)<2.45&&i.kill(a,.82,e.x)};for(let a of i.columns)for(let o of a.units)r(o);for(let a of i.runners)r(a)}else i.event(e.variant==="crates"?"crateBreak":"wallBreak",e.x,.48,e.z);else if(e.kind==="cache")e.state="open",i.event("wallBreak",e.x,.57,e.z),D1(i,e,e.reward);else if(e.kind==="bridge")e.state="cut",i.event("chainSnap",e.x,.85,e.z),i.notice(Cr(e.lane)+"\u540A\u6865\u5DF2\u843D\uFF0C\u589E\u63F4\u88AB\u622A\u65AD");else if(e.kind==="coil"){e.state="discharged",i.event("discharge",e.x,.5,e.z,1.35);let r=a=>{a.alive&&Math.abs(a.z-e.z)<7&&Math.abs(a.x-e.x)<5.1&&i.kill(a,.9,e.x)};for(let a of i.columns)for(let o of a.units)r(o);for(let a of i.runners)r(a);i.boss.active&&!i.boss.defeated&&Math.abs(i.boss.z-e.z)<6&&Math.abs(i.boss.x-e.x)<5&&i.damageBoss(t,24)}}function d0(i){let e=i.boss,t=i.bossEntryStride,n=Math.max(4,(-23-e.z)*t/(2.3+t)),s=e.z+n+3,r=Ia(i,e.z-1.1,s+3.8);for(let o of[-2,-4,-6]){if(!r.conflicts)break;let c=Math.max(e.z+5,e.z+n+3+o),l=Ia(i,e.z-1.1,c+3.8);l.conflicts<r.conflicts&&(r=l,s=c)}e.x=e.escortX=r.x;let a=Pa({kind:"gap",lane:r.lane,length:4,at:i.distance-s},i.stage);a.z=i.distance-a.at,a.finale=!0,i.features.push(a)}function U1(i,e){let s=.66-e.z;if(e.state==="ready"&&i.phase!=="clear"&&s<=7.8&&(e.state="warning",e.age=0,i.notice(Cr(e.lane)+"\u540A\u8D27\u5760\u843D\uFF0C\u907F\u5F00\u5730\u6807")),e.state!=="warning"||(e.progress=Pr(1-s/7.8,0,1),e.fallProgress=Pr(1-s/(.55*i.roadSpeed),0,1),s>0))return;e.state="landed",e.age=0,i.event("impact",e.x,.18,e.z,1.35);let r=(o,c)=>Math.hypot(o-e.x,c-e.z)<=e.radius;function a(o){o.alive&&r(o.x,o.z)&&i.kill(o,1.08,e.x)}for(let o of i.columns)for(let c of o.units)a(c);for(let o of i.runners)a(o);if(i.allies=i.allies.filter(o=>r(o.x,o.z)?(i.fall(o,"blue",1.15,e.x),!1):!0),!!r(i.x,i.captainZ)){if(i.buffs.shield>0){i.event("shieldHit",i.x,.55,i.captainZ);return}i.hitGuard>0||(i.hurt=1,i.hitGuard=1.2,--i.armor<=0&&(i.lossReason="skyfall",i.finish(!1)))}}function p0(i,e){i.activeGround.length=0;for(let t of i.features)if(t.z=i.distance-t.at,t.age+=e,t.flash=Math.max(0,t.flash-e*6),!(t.z<i.entryZ-12||t.z>15)){if(t.kind==="skyfall"){if(U1(i,t),!i.playing)return;continue}if((t.kind==="bridge"||t.kind==="gap"||t.kind==="belt")&&i.activeGround.push(t),!t.warned&&t.z>-22&&t.z<-14&&t.state==="ready"&&!t.finale){t.warned=!0;let n=Cr(t.lane),s={gap:n+"\u65AD\u6865\uFF0C\u63D0\u524D\u6362\u9053",bridge:"\u6253\u65AD"+n+"\u540A\u7D22\uFF0C\u622A\u4F4F\u589E\u63F4",cache:"\u6253\u788E"+n+"\u7816\u5899\uFF0C\u53D6\u51FA\u8865\u7ED9",cover:t.variant==="glass"?n+"\u73BB\u7483\u74F6\uFF0C\u51FB\u788E\u53EF\u9707\u5012\u8FD1\u5175":t.variant==="crates"?n+"\u6728\u7BB1\uFF0C\u91CD\u70AE\u62C6\u5F97\u5FEB":n+"\u94A2\u95F8\uFF0C\u7784\u51C6\u6A59\u8272\u9501\u6263",coil:"\u51FB\u4E2D"+n+"\u7EBF\u5708\uFF0C\u653E\u7535\u6E05\u5175",belt:n+"\u4F20\u9001\u5E26\u5411"+(t.direction>0?"\u53F3":"\u5DE6")};i.notice(s[t.kind])}if(N1.has(t.kind)&&(t.target??(t.target={mechanism:t}),t.target.x=t.x,t.target.z=t.z+(t.kind==="bridge"?t.length/2+.24:0)),i.phase!=="clear"&&!t.escorted&&t.kind==="cache"&&t.z>=i.entryZ-5&&t.z<-8){t.escorted=!0;for(let n=0;n<2;n++)for(let s=-1;s<=1;s++){let r=i.grunt(t.x+s*.48,i.entryZ-.95-n*.59);r.speed=2.62,i.runners.push(r)}}if(i.phase!=="clear"&&t.kind==="bridge"&&t.state==="ready"&&t.z>=-7.1&&(t.state="linked",t.age=0,i.flanks.push({x:t.lane===0?4.44:t.x,remaining:i.route.siege?27:16+Math.floor(i.stage/3),next:0}),i.notice(Cr(t.lane)+"\u540A\u6865\u63A5\u901A\uFF0C\u589E\u63F4\u6765\u4E86")),t.kind==="belt"&&Math.abs(t.z-i.captainZ)<t.length/2&&Math.abs(i.x-t.x)<4.4/2-.1&&!i.rope&&i.aim(i.targetX+t.direction*e*1.32),Ys(t)&&i.planks&&t.z>-5.2&&t.z<1&&Math.abs(i.x-t.x)<4.4/2+.2&&!i.rope&&(i.planks--,t.state="repaired",t.age=0,i.event("plus",t.x,.24,t.z),i.notice(Cr(t.lane)+"\u5DF2\u642D\u597D\u4FBF\u6865")),Ys(t)&&Math.abs(t.z)<t.length/2+2.8&&(i.allies=i.allies.filter(n=>{if(!sl(t,n.x,n.z,.14))return!0;let s=i.fall(n,"blue",0);return s.intoGap=!0,s.vy=-.5,!1}),!i.rope&&sl(t,i.x,i.captainZ,.22))){if(i.armor--,i.hurt=1,i.armor<=0){i.lossReason="gap",i.finish(!1);return}let n=t.lane===-1?1:t.lane===1?-1:i.x>=t.x?1:-1;i.rope={age:0,from:i.x,to:t.x+n*(4.4/2+.75)},i.aim(i.rope.to),i.hitGuard=1.05,i.notice("\u5B89\u5168\u7EF3\u62C9\u56DE\u961F\u957F\uFF0C\u62A4\u7532 \u22121")}}for(let t of i.flanks)if(t.next-=e,t.remaining>0&&t.next<=0){t.next+=.16,t.remaining--;let n=i.grunt(t.x+(t.remaining%3-1)*.12,i.entryZ-.92);n.speed=3.18,n.flank=!0,i.route.siege&&t.remaining%5===0&&(n.role="guard",n.size*=1.32,n.hp=9),i.runners.push(n)}i.flanks=i.flanks.filter(t=>t.remaining>0)}function m0(i,e,t){e.lift=0;for(let n of i.activeGround){let s=e.z-n.z;if(n.kind==="belt"&&Math.abs(s)<n.length/2&&Math.abs(e.x-n.x)<4.4/2){e.x=Pr(e.x+n.direction*t*.65,-6,6);continue}if(!Ys(n)||s<-n.length/2-4.3||s>n.length/2+.45||Math.abs(e.x-n.x)>4.4/2+.16)continue;if(e.role==="vault"){let o=Pr((s+n.length/2+.55)/(n.length+1.1),0,1);e.lift=1.08*Math.sin(Math.PI*o);return}let r=n.lane===-1?1:n.lane===1||e.laneX<n.x?-1:1,a=n.x+r*(4.4/2+.24);if(e.x+=Pr(a-e.x,-3.8*t,3.8*t),sl(n,e.x,e.z,.22)){e.alive=!1;let o=i.fall(e,"red",0);o.intoGap=!0,o.vy=-.7}return}}function g0(i,e){let t=i.boss;t.vault={piece:e,t:0,from:t.z-e.z,to:e.length/2+1.08},t.attackT=0,t.recovery=.15,e.crossed=!0}function x0(i,e){let t=i.boss,n=t.vault;n.airDash&&(n.piece.z+=i.worldAdvance),n.t+=e;let s=Pr((n.t-.21)/.89,0,1),r=s*s*(3-2*s);t.z=n.piece.z+n.from+(n.to-n.from)*r,t.lift=2.5*4*s*(1-s),n.t>=1.1&&!n.landed&&(n.landed=!0,i.event("vaultLand",t.x,.06,t.z,.9)),n.t>=1.35&&(t.vault=null,t.lift=0,t.recovery=.34)}var Hn=(i,e,t)=>Math.max(e,Math.min(t,i)),ll=Math.PI*2,v0=21,_0=5.45,F1=1.38,rl=11,Vh=2.47,y0=[[-1,1],[1,0],[-1,0],[1],[0,-1],[1,-1],[0],[0,1],[-1]],al=11,Zs=[{tier:1,name:"\u767B\u9646\u65B0\u5175",need:0,fireRate:1,critBonus:0,blastBonus:1},{tier:2,name:"\u7A81\u51FB\u7CBE\u9510",need:14,fireRate:1.06,critBonus:.08,blastBonus:1.06},{tier:3,name:"\u91CD\u88C5\u8FDE\u961F",need:38,fireRate:1.12,critBonus:.14,blastBonus:1.16},{tier:4,name:"\u94A2\u94C1\u519B\u56E2",need:76,fireRate:1.18,critBonus:.2,blastBonus:1.24}];function ol(i,e){let t=0;for(let n=0;n<i.length;n++){let s=i[n];e(s)&&(i[t++]=s)}i.length=t}function Wh(i,e){let t=0,n=i,s=8;for(;n>=s;)n-=s,t++,s=8+6*t;let r=ll*n/s+.21+t*.18,a=.93+(e-1)*.46+t*.51;return[Math.cos(r)*a,Math.sin(r)*a*.92]}var cl=class{constructor(e=()=>{}){this.emit=e,this.reset()}reset(e=1){this.stage=Hn(Math.trunc(Number(e))||1,1,ai),this.route=qi[this.stage-1],this.features=this.route.features.map(s=>Pa(s,this.stage)),this.activeGround=[],this.flanks=[],this.rope=null,this.planks=0,this.overrun=null,this.parade=null,this.chill=0,this.hint=null,this.hintSequence=0,this.rallyZ=-100,this.seed=129920+(this.stage-1)*1141,this.sequence=0,this.phase="ready",this.elapsed=0,this.distance=0,this.captainZ=0,this.targetZ=0,this.caught=!1,this.caughtBy=null,this.lossReason=null,this.worldAdvance=0,this.x=0,this.targetX=this.x,this.velocity=0,this.upgrades=0,this.scale=1,this.visualScale=1,this.recoil=0,this.mergeGlow=0,this.hurt=0,this.armor=3,this.shots=[],this.incoming=[],this.enemyFireTimer=0,this.allies=[],this.falling=[],this.deliveries=[],this.runners=[],this.rocketTimer=.18,this.volleyTimer=.06,this.volley=0,this.buffs={rapid:0,shield:0,plasma:0,spread:0,drone:0,fever:0,frost:0,range:0,longshot:0},this.supportTimer=0,this.feverMeter=0,this.bonuses={extraAllies:0,cannonMult:1,critChanceBonus:0,overdriveRateMult:1,startingOverdrive:0},this.evoPoints=0,this.tier=1,this.combo=0,this.maxCombo=0,this.comboTimer=0,this.overdrive=0,this.overdriveActive=0,this.popups=[],this._frontage=[],this.row=0,this.toNextRow=0,this.entryZ??(this.entryZ=-46),this.finaleRow=this.route.finale,this.lastRow=this.finaleRow+(this.route.siege?30:18),this.hitGuard=0,this.score=0,this.recruits=0,this.endTime=0;let t=this.route.wallHP;this.wall={x:4.13,z:-v0,hp:t,maxHp:t,flash:0};let n=this.route.bossHP;this.boss={x:-.42,z:this.entryZ-1.4,hp:n,maxHp:n,marched:0,hit:0,lift:0,active:!1,defeated:!1,removed:!1,skill:null,nextCast:0,kind:this.route.boss,vault:null,moveClock:0,special:0,pattern:0,brace:0,defeatAge:0,enraged:!1,attackT:0,impactDone:!1,pursuing:!1,yaw:0,recovery:0,leapFromX:0,leapFromZ:0,landX:0,landZ:0},this.gates=c0(this.stage,this.features),this.gates[2].cover=this.wall;for(let s of this.gates)s.coverSpec&&(s.cover=Pa(s.coverSpec,this.stage),this.features.push(s.cover));this.bossEntryStride=8.15,this.bossStride=1.02+Math.min(.27,(this.stage-1)*.014),this.marchSpeed=Vh+Math.min(.28,(this.stage-1)*.012),this.wave=null,this.columns=Array.from({length:rl},(s,r)=>({index:r,minX:1/0,maxX:-1/0,units:[]})),this.recruit(this.x,!0)}rand(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}grunt(e,t){let n=e+(this.rand()-.5)*.16;return{x:n,laneX:n,z:t+(this.rand()-.5)*.08,id:++this.sequence,phase:this.rand()*ll,marched:0,yaw:0,size:.92+this.rand()*.13,alive:!0}}event(e,t,n,s,r=1,a=null){this.emit({kind:e,x:t,y:n,z:s,strength:r,supply:a})}notice(e){this.hint={id:++this.hintSequence,text:e}}start(){this.phase==="ready"&&(this.phase="run",this.stage===1&&this.notice("\u5DE6\u53F3\u79FB\u52A8\uFF0C\u5BF9\u51C6 +3 \u62DB\u52DF\u58EB\u5175"))}aim(e,t=this.targetZ){this.targetZ=Hn(t,0,F1),this.targetX=Hn(e,-_0,_0)}get playing(){return this.phase==="run"||this.phase==="boss"||this.phase==="clear"}get roadSpeed(){return this.boss.active?this.boss.defeated?2.3:2.3-1.48*Tt(this.boss.z,-16,-10):3.65}get cannonDamage(){let e=26+this.upgrades*5+Math.round((this.stage-1)*.88);return Math.round(e*(this.bonuses?.cannonMult||1))}applyBonuses(e){if(!e)return;this.bonuses={...this.bonuses,...e},e.startingOverdrive>0&&(this.overdrive=Math.min(100,e.startingOverdrive));let t=Math.max(0,Math.trunc(e.extraAllies||0));for(let n=0;n<t;n++)this.recruit(this.x,!0)}addPopup(e,t,n,s,r="dmg"){this.popups.length>=24||this.popups.push({x:e,y:t,z:n,text:s,kind:r})}addCombo(e=1){this.playing&&(this.combo+=e,this.combo>this.maxCombo&&(this.maxCombo=this.combo),this.comboTimer=3.2)}addOverdrive(e){if(!this.playing||this.overdriveActive>0)return;let t=this.bonuses?.overdriveRateMult||1;this.overdrive=Math.min(100,this.overdrive+e*t)}addEvo(e){if(!this.playing)return;this.evoPoints+=e;let t=this.tier;for(let n of Zs)this.evoPoints>=n.need&&(t=n.tier);if(t>this.tier){this.tier=t;let n=Zs[t-1];this.mergeGlow=1,this.scale=Math.max(this.scale,1+(t-1)*.1+Math.min(.45,this.upgrades*.1)),this.event("evolve",this.x,.35,this.captainZ,1.2),this.addPopup(this.x,2.25,this.captainZ,`\u8FDB\u5316 Lv.${t} ${n.name}`,"evolve"),this.notice(`\u519B\u56E2\u8FDB\u5316\uFF01Lv.${t} ${n.name}`)}}get comboDamageMult(){return this.combo>=80?1.18:this.combo>=40?1.12:this.combo>=15?1.06:1}get critChance(){let e=Zs[(this.tier||1)-1].critBonus,t=this.combo>=80?.16:this.combo>=40?.1:this.combo>=15?.05:0,n=this.overdriveActive>0?.35:0;return Math.min(.85,e+t+n+(this.bonuses?.critChanceBonus||0))}triggerOverdrive(){if(!this.playing||this.caught||this.overdrive<100||this.overdriveActive>0)return!1;this.overdrive=0,this.overdriveActive=4.2,this.buffs.shield=Math.max(this.buffs.shield,1.8),this.mergeGlow=1,this.recoil=1,this.event("overdrive",this.x,.4,this.captainZ,1.5),this.addPopup(this.x,2.35,this.captainZ,"\u6218\u672F\u8D85\u8F7D \xB7 \u9F50\u5C04!","evolve"),this.notice("\u6218\u672F\u8D85\u8F7D\u542F\u52A8\uFF01\u5168\u961F\u706B\u529B\u8D85\u9891");let e=(1+Math.min(1.7,this.upgrades*.28))*1.3,t=1.32*this.visualScale,n=this.captainZ-.55*this.visualScale;for(let s of[-.24,-.12,0,.12,.24]){let r=this.launch(this.x+s*1.1,t,n,qs,e,Math.round(this.cannonDamage*1.35),s);r&&(r.crit=!0)}return!0}nextSlot(){let e=new Set(this.allies.map(n=>n.slot));for(let n of this.deliveries)n.slot!=null&&e.add(n.slot);let t=0;for(;e.has(t);)t++;return t}recruit(e,t=!1,n=this.nextSlot()){if(this.allies.length>=48)return;let[s,r]=Wh(n,this.scale);this.allies.push({slot:n,x:Hn(e+s,-6.28,6.28),z:this.captainZ+r,age:t?2:0,phase:this.rand()*ll}),t||this.recruits++}openCard(e){if(!e.active||e.cover?.hp>0)return;if(e.active=!1,e.collectedAt=this.elapsed,e.pop=0,this.event("supplyBreak",e.x,.62,e.z,1,e.type),this.addOverdrive(6.5),this.addEvo(e.type==="merge"?8:3),e.type==="blast"){let n=e.x;this.blast({x:n,power:5.8},e.z-1.5),this.boss.active&&Math.hypot(this.boss.x-n,this.boss.z-e.z+1.5)<4.6&&this.damageBoss({kind:"rocket"},48);return}let t=Rn[e.type].count;for(let n=0;n<(t||1);n++){let s=t?this.nextSlot():null;if(s!=null&&s>=48)break;this.deliveries.push({type:e.type,slot:s,sx:e.x,sz:e.z,x:e.x,z:e.z,y:.46,age:-n*.065,progress:0,phase:this.rand()*ll})}}updateDeliveries(e){for(let t of this.deliveries){if(t.age+=e,t.age<0)continue;let n=Math.min(1,t.age/.58),s=n*(2-n),[r,a]=t.slot==null?[0,-.18]:Wh(t.slot,this.scale);if(t.progress=n,t.x=t.sx+(Hn(this.x+r,-6.28,6.28)-t.sx)*s,t.z=t.sz+(this.captainZ+a-t.sz)*s,t.y=.46*(1-n)+Math.sin(Math.PI*n)*(1.05+Math.min(1.25,Math.abs(t.sz)*.075)),!(n<1))if(t.slot!=null)this.recruit(this.x,!1,t.slot),this.addEvo(1.8),this.event("plus",t.x,.12,t.z,.7);else{if(t.type==="merge")this.upgrades++,this.scale=1+Math.min(.64,this.upgrades*.13),this.addPopup(this.x,2,this.captainZ,"\u70AE\u51FB +5","buff");else if(t.type==="engineer")this.planks=Math.min(2,this.planks+1),this.notice("\u4FBF\u6865 +1\uFF0C\u9760\u8FD1\u7F3A\u53E3\u81EA\u52A8\u67B6\u6865");else if(t.type==="medic"){this.armor=Math.min(3,this.armor+1);for(let o=0;o<2;o++)this.recruit(this.x);this.notice("\u6551\u63F4\u5230\u961F\uFF0C\u62A4\u7532 +1")}else if(t.type==="range"||t.type==="longshot")this.buffs[t.type]=t.type==="range"?7:5.5,this.notice(t.type==="range"?"\u5168\u961F\u8FDC\u5C04 \xB7 7\u79D2":"\u7A7F\u7532\u8FDC\u5C04 \xB7 5.5\u79D2");else{let o=t.type==="fever"?4.2:t.type==="shield"?5:6;this.buffs[t.type]=o}this.mergeGlow=1,this.event("merge",this.x,.23,this.captainZ,1,t.type)}}ol(this.deliveries,t=>t.progress<1)}crossGates(){for(let e of this.gates){if(e.z=this.distance-e.at,!e.active){e.pop=this.elapsed-e.collectedAt;continue}this.caught||Math.abs(e.z-this.captainZ)>.83||Math.abs(this.x-e.x)<=gi/2+this.scale*.16&&this.openCard(e)}}marchPastBoss(e,t){let n=this.boss,s=e.z-n.z;if(!e.passSide&&e.x===e.laneX&&(s<-3.3||s>6.4))return;let r=n.attackT>0?n.landZ:n.z+.45,a=1-Tt(Math.abs(s),1.45,3.25),o=n.attackT>0?1-Tt(Math.abs(e.z-r),1.25,3.45):0,c=Math.max(1.42*a,1.9*o*Tt(n.attackT,0,.31));if(c?e.passSide||(e.passSide=e.x<n.x?-1:1):e.passSide=0,!c&&e.x===e.laneX)return;let l=e.passSide||1,u=Math.max(.2,l>0?6.4-n.x:n.x+6.4),d=Hn(Math.abs(e.laneX-n.x)/u,0,1),f=e.laneX+l*c*(1-d);e.x+=(f-e.x)*(1-Math.exp(-9*t)),!c&&Math.abs(e.x-e.laneX)<.002&&(e.x=e.laneX)}spawnRow(){let e=Math.floor(this.row/al),t=this.row%al;if(!this.wave||this.row%(al*2)===0){let a=Math.floor(e/2)+(this.stage-1)*2,o=this.stage%2?1:-1;this.wave=y0[a%y0.length].map(u=>u*o);let c=this.distance+6+(-this.entryZ-6)*3.65/(3.65+this.marchSpeed),l=this.gates.find(u=>u.coverSpec&&Math.abs(u.at-c)<5.2);if(l&&a%3!==2){let u=l.coverSpec.lane;this.wave=this.wave.filter(d=>d!==u),this.wave.length||(this.wave=[u===0?o:0])}}let n=this.wave.length===1,r=this.row>=this.finaleRow-44?this.route.siege?.8:.52:1;for(let a of this.columns){let o=a.index,c=n?9:o<6?6:5,l=Math.max(2,Math.round(Math.min(c,c*(.32+.68*this.route.pressure))*r)),u=n||o<6?o:o-6,d=this.wave[n||o<6?0:1];if(u>=l||t<2&&(u===0||u===l-1))continue;let f=n?.43:.52,h=(this.row%2-.5)*.15,p=Xi(d)+(u-(l-1)/2)*f+h,x=this.entryZ-.86-.12*(u%2),g=a.units.at(-1),m=g?Math.min(x,g.z-.4):x,v=this.grunt(p,m);if(a.minX=Math.min(a.minX,v.x),a.maxX=Math.max(a.maxX,v.x),t===5&&a.index===e*7%rl&&this.stage>=2){let _=["gunner"];this.stage>=3&&_.push("weaver","brute","vault"),this.stage>=4&&_.push("guard"),this.stage>=5&&_.push("bomber","standard"),this.stage>=7&&_.push("courier"),v.role=_[(e+this.stage)%_.length];let y=v.role==="brute"||v.role==="guard";v.size*=y?1.42:1.1,v.hp=y?9+this.stage*.65:3.2+this.stage*.27,v.speed=y?2.02:v.role==="weaver"?3.47:2.77,this.runners.push(v)}else t===2&&(a.index===e*3%rl||a.index===(e*3+5)%rl)?(v.speed=3.4+this.rand()*.25,this.runners.push(v)):a.units.push(v)}this.row++}moveGrunt(e,t,n){if(this.phase==="clear"&&(e.spent||e.z>this.captainZ+.75)&&(!e.overBody||e.z>e.overBody.z+1.06)){e.spent=!0,e.overBody=null;let u=this.x+(e.id%5-2)*.28,d=this.captainZ-2.15-e.id%3*.28,f=Hn(u-e.x,-5.1*t,5.1*t),h=Hn(d-e.z,-4.7*t,4.7*t);e.x+=f,e.z+=h,e.marched+=Math.hypot(f,h-this.worldAdvance),Math.abs(h)+Math.abs(f)>.001&&(e.yaw+=(Math.atan2(f,h)-e.yaw)*(1-Math.exp(-7*t)));return}let s=e.speed>=3.12,r=!e.spent&&e.z>=this.captainZ+(s?-8.4:-6.9)&&e.z<this.captainZ+1.65,a=e.x,o=e.speed??this.marchSpeed,c=0;if(r){let u=this.x,d=this.captainZ,f=Math.abs(u-e.x);for(let g of n){let m=Math.abs(g.x-e.x);m<f&&(f=m,u=g.x,d=g.z)}o*=s?1.48:1.32;let h=Math.max(.075,(d-e.z-.32)/(this.worldAdvance/t+o)),p=s?12.2:11.6,x=(e.id%7-3)*.065;c=Hn((u+x-e.x)/h,-p,p)*t,e.role==="weaver"&&(c+=Math.sin(e.phase+e.marched*7)*t*.74),e.x+=c}else if(e.spent)e.overX!=null&&(e.x+=Hn(e.overX-e.x,-3.3*t,3.3*t));else if(this.boss.active&&!this.boss.defeated){let u=e.x;this.marchPastBoss(e,t),c=e.x-u}if(this.activeGround.length?m0(this,e,t):e.lift=0,!e.alive)return;this.buffs.frost>0&&(o*=.48,e.x=a+(e.x-a)*.6),Math.abs(e.z-this.rallyZ)<2.7&&(o*=1.17),c=e.x-a;let l=o*t;e.z+=this.worldAdvance+l,e.marched+=Math.hypot(l,c),e.yaw+=(Math.atan2(c,l)-e.yaw)*(1-Math.exp(-9*t)),e.role==="gunner"&&!e.fired&&e.z>=-14&&e.z<-4&&this.enemyFireTimer<=0&&(this.enemyRound(e.x,e.z,.65,0,e),e.fired=!0),!e.spent&&e.z>this.captainZ-2&&e.z<this.captainZ+2.3&&this.contact(e)}advanceCrowd(e){this.rallyZ=this.runners.find(n=>n.alive&&n.role==="standard"&&n.z>-10)?.z??-100;let t=this._frontage;t.length=0;for(let n=0;n<this.allies.length;n++){let s=this.allies[n];s.z<=this.captainZ+.18&&t.push(s)}for(let n of this.columns){n.minX=1/0,n.maxX=-1/0;let s=0,r=!1;for(let a of n.units)a.alive&&(this.moveGrunt(a,e,t),!(!a.alive||a.z>10&&this.phase!=="clear")&&(n.minX=Math.min(n.minX,a.x),n.maxX=Math.max(n.maxX,a.x),s&&n.units[s-1].z<a.z&&(r=!0),n.units[s++]=a));n.units.length=s,r&&n.units.sort((a,o)=>o.z-a.z)}for(let n of this.runners)n.alive&&this.moveGrunt(n,e,t);for(ol(this.runners,n=>n.alive&&(n.z<10||this.phase==="clear")),this.toNextRow-=this.worldAdvance+this.marchSpeed*e;this.row<this.lastRow&&this.toNextRow<=0;)this.spawnRow(),this.toNextRow+=this.route.rowSpacing+(this.row%al===0?.38:0),this.row>=70&&Math.abs(this.row-this.finaleRow)>10&&(this.row-70)%this.route.restEvery===0&&(this.toNextRow+=this.route.restLength)}contact(e){if(!this.playing||this.caught)return;let t=this.allies.findIndex(r=>Math.abs(r.x-e.x)<.32&&Math.abs(r.z-e.z)<.32),n=Math.abs(e.x-this.x)<.39*this.scale&&Math.abs(e.z-this.captainZ)<.4;if(t<0&&!n)return!1;let s=e.startZ!=null;if(s||e.role==="bomber"?e.alive=!1:(e.spent=!0,e.overX=t>=0?this.allies[t].x:this.x),this.hitGuard>0)return!0;if(this.hitGuard=this.buffs.shield>0?.46:this.route.contactGrace,this.buffs.shield>0)return this.event("shieldHit",e.x,.35,e.z),!0;if(this.hurt=1,this.combo>=5&&(this.combo=0,this.comboTimer=0),e.role==="bomber")return this.event("impact",e.x,.1,e.z,.87),this.allies=this.allies.filter(r=>Math.hypot(r.x-e.x,r.z-e.z)>.95?!0:(this.fall(r,"blue",1.2,e.x),!1)),n&&!this.allies.length&&--this.armor<=0&&(this.lossReason="infantry",this.finish(!1,e)),!0;if(t<0&&this.allies.length){let r=1/0;this.allies.forEach((a,o)=>{let c=(a.x-e.x)**2+(a.z-e.z)**2;c<r&&(r=c,t=o)})}if(t>=0){let r=this.allies.splice(t,1)[0],a=this.fall(r,"blue",0);a.prone=!0,a.dir=r.x>=e.x?1:-1,s||(e.overX=r.x,e.overBody=a)}else--this.armor<=0&&(this.lossReason=s&&e.shooter===this.boss?"bossShot":"infantry",this.finish(!1,s?e.shooter:e));return!0}enemyRound(e,t,n,s=0,r=this.boss){let o=this.x+s-e,c=Math.max(1,this.captainZ-t),l=Math.hypot(o,c);this.incoming.push({x:e,z:t,y:n,startY:n,startZ:t,shooter:r,vx:o*7.4/l,vz:c*7.4/l,alive:!0}),this.enemyFireTimer=1.35,this.event("hostileMuzzle",e,n,t)}advanceIncoming(e){this.enemyFireTimer=Math.max(0,this.enemyFireTimer-e);for(let t of this.incoming)t.x+=t.vx*e,t.z+=t.vz*e,t.y=.45+(t.startY-.45)*Hn(t.z/t.startZ,0,1),t.z>this.captainZ-2&&t.z<this.captainZ+2.3&&this.contact(t)&&this.event("hostileMuzzle",t.x,t.y,t.z);ol(this.incoming,t=>t.alive&&t.z<6)}pushWall(e,t=this.wall,n=2.14){let s=(r,a,o)=>t.hp>0&&Math.abs(r-t.x)<n+o&&Math.abs(a-t.z)<.32+o;this.allies=this.allies.filter(r=>{if(!s(r.x,r.z,.19))return!0;this.fall(r,"blue",0);let a=this.falling[this.falling.length-1];return a.pushed=!0,a.front=t.z+.55,!1}),!this.caught&&s(this.x,this.captainZ,.32*this.visualScale)&&(this.caught=!0,this.caughtBy=t),this.caught&&this.caughtBy===t&&(this.captainZ=Math.max(this.captainZ,t.z+.38),this.captainZ>=4.5&&(this.lossReason="wall",this.finish(!1)))}fall(e,t,n,s=e.x){if(this.falling.length>=96){let a=this.falling.findIndex(o=>o.side==="red");this.falling.splice(a<0?0:a,1)}let r={x:e.x,z:e.z,y:.07,t:0,side:t,phase:e.phase||0,size:e.size||1,id:e.id||0,vx:(e.x-s)*1.05+(this.rand()-.5)*2.8*n,vz:(this.rand()-.5)*2.4*n,vy:(1.65+this.rand()*2.3)*n,spin:(this.rand()-.5)*8,roll:(this.rand()-.5)*7};return this.falling.push(r),r}kill(e,t=1,n=e.x){if(!(!e.alive||e.overBody&&e.z<e.overBody.z+.84)&&(e.alive=!1,this.score++,this.addCombo(1),this.addOverdrive(.62),this.addEvo(.16),this.buffs.fever<=0&&(this.feverMeter+=.21,this.feverMeter>=100&&(this.feverMeter=0,this.buffs.fever=4.2,this.event("merge",this.x,.2,this.captainZ))),this.fall(e,"red",t,n),e.role==="courier"&&this.playing)){let s={x:e.x,z:e.z,type:"medic",active:!0};this.openCard(s)}}closeEnemy(e,t){let s=null,r=(a,o)=>{let c=t-a.z;c<0||c>2.35+o||Math.hypot(a.x-e,c)>2.35+o||(!s||a.z>s.z||a.z===s.z&&Math.abs(a.x-e)<Math.abs(s.x-e))&&(s=a)};this.boss.active&&!this.boss.defeated&&r(this.boss,.78);for(let a of this.columns)if(!(a.maxX<e-2.35-.25||a.minX>e+2.35+.25))for(let o of a.units){if(o.z<t-2.35-.25)break;o.alive&&r(o,.2)}for(let a of this.runners)a.alive&&r(a,.2);return s}launch(e,t,n,s,r,a,o=0){let c=1/Math.hypot(1,o),l={kind:s===qs?"rocket":"shot",profile:s,power:r,damage:a,headingX:o*c,headingZ:-c,startX:e,startY:t,startZ:n,x:e,y:t,z:n,distance:0,range:this.buffs.range>0||this.buffs.longshot>0?s0:i0,age:0,afterHit:0,finished:!1,pierce:s===xs?3:this.buffs.longshot>0&&s!==qs?1:0},u=this.firstHit(l,l.range);if(o===0&&(!u||u.distance>2.35)){let f=this.closeEnemy(e,n);if(f){let h=f.x-e,p=Math.min(-.06,f.z-n),x=Math.hypot(h,p);l.headingX=h/x,l.headingZ=p/x,l.range=Math.min(l.range,x+.75),u=this.firstHit(l,l.range)}}l.aimDistance=Math.max(.12,u?u.distance:l.range),l.endY=u?.target===this.boss?bn[this.boss.kind].aim:u?.target===this.wall||u?.target.type||u?.target.mechanism?.72:.48;let d=(this.boss.z-n)/l.headingZ;return s===qs&&this.boss.active&&!this.boss.defeated&&d>0&&d<l.range&&Math.abs(e+l.headingX*d-this.boss.x)<=1.26&&u?.target!==this.wall&&!u?.target.type&&!u?.target.mechanism&&(l.aimDistance=Math.max(.12,d),l.endY=bn[this.boss.kind].aim),l.lift=s.lift*Math.min(1,l.aimDistance/9),this.shots.push(l),l}shoot(e){let t=Zs[(this.tier||1)-1],n=this.buffs.fever>0||this.overdriveActive>0,s=(n?.62:this.buffs.rapid>0?.72:1)*(this.chill>0?1.32:1)/t.fireRate,r=this.critChance;if(this.rocketTimer-=e,this.rocketTimer<=0){this.rocketTimer+=.69*s,this.recoil=1;let a=this.x+.295*this.visualScale,o=1.31*this.visualScale,c=this.captainZ-.6*this.visualScale,l=(1+Math.min(1.7,this.upgrades*.28))*t.blastBonus,u=this.launch(a,o,c,qs,l,this.cannonDamage);if(u&&r>0&&this.rand()<r&&(u.crit=!0),this.tier>=4)for(let d of[-1,1]){let f=this.launch(this.x+d*.48*this.visualScale,o*.85,c+.1,xs,1,Math.round(this.cannonDamage*.28),d*.085);f&&(f.crit=!0)}this.event("muzzle",a,o,c,l)}if(this.volleyTimer-=e,this.volleyTimer<=0){this.volleyTimer+=.27*s,this.volley++;for(let a of this.allies){if(a.age<.12)continue;let o=a.x+.13,c=a.z-.22,l=this.tier>=4||this.tier===3&&a.slot%2===0||this.tier===2&&a.slot%4===0,u=(n||this.buffs.plasma>0)&&(a.slot+this.volley)%3===0,d=u?xs:l||a.slot%4===1?tl:Nh,f=u?6:l?3.2:2.8,h=this.launch(o,.58,c,d,1,f);h&&r>0&&this.rand()<r*(l?1.25:.7)&&(h.crit=!0),(n||this.buffs.spread>0)&&a.slot%2===0&&this.launch(o,.58,c,Nh,1,2.8,(this.volley%2?1:-1)*.09)}this.allies.length&&this.event("smallShot",this.x,.6,0,.7)}if(this.supportTimer-=e,(this.buffs.drone>0||this.overdriveActive>0)&&this.supportTimer<=0){this.supportTimer=.36;for(let a of[-1,1]){let o=this.launch(this.x+a*1.15,1.3,this.captainZ-.32,xs,1,6);o&&this.overdriveActive>0&&(o.crit=!0)}}}firstHit(e,t){let n=e.headingX,s=e.headingZ,r=e.x+n*t,a=e.z+s*t,o=e.kind==="rocket"?.15:.07,c=null,l=(f,h,p)=>{if(f.overBody&&f.z<f.overBody.z+.84)return;let x=h+o,g=p+o,m=Math.max(0,(f.z+g-e.z)/s),v=Math.min(t,(f.z-g-e.z)/s);if(Math.abs(n)<1e-6){if(Math.abs(e.x-f.x)>x)return}else{let _=(f.x-x-e.x)/n,y=(f.x+x-e.x)/n;m=Math.max(m,Math.min(_,y)),v=Math.min(v,Math.max(_,y))}if(!(m>v||c&&m>=c.distance)){if(e.aimDistance!==void 0&&f!==this.wall&&!f.type&&!f.mechanism){let _=f.lift||0,y=_+(f===this.boss?bn[f.kind].height:.92*(f.size||1))+o,E=nl(e,e.distance+m),b=nl(e,e.distance+v);if(Math.min(E,b)>y||Math.max(E,b)<_-o)return;E>y&&E>b&&(m+=(v-m)*(E-y)/(E-b))}c={target:f,distance:m}}},u=Math.min(e.x,r),d=Math.max(e.x,r);this.wall.hp>0&&this.wall.z>=a-.5&&this.wall.z<=e.z+.5&&l(this.wall,2.1,.32);for(let f of this.features)f.target&&f.state==="ready"&&f.target.z>=a-.7&&f.target.z<=e.z+.7&&f.target.x+f.half+o>=u&&f.target.x-f.half-o<=d&&l(f.target,f.half,f.depth);for(let f of this.gates)f.active&&!(f.cover?.hp>0)&&f.z>=a-.36&&f.z<=e.z+.36&&f.x+gi/2+o>=u&&f.x-gi/2-o<=d&&l(f,gi/2,.15);this.boss.active&&!this.boss.defeated&&l(this.boss,1.26,.7);for(let f of this.columns)if(!(f.maxX<u-.42||f.minX>d+.42))for(let h of f.units){if(h.z<a-.42)break;h.alive&&h.z<e.z+.42&&l(h,.245,.23)}for(let f of this.runners)f.alive&&f.z>=a-.5&&f.z<=e.z+.5&&f.x+.5>=u&&f.x-.5<=d&&l(f,.25*f.size,.23*f.size);return c}blast(e,t){let n=.95+e.power*.48;for(let s of this.columns)if(!(s.maxX<e.x-n||s.minX>e.x+n))for(let r of s.units){if(r.z<t-n)break;r.alive&&(r.x-e.x)**2+(r.z-t)**2<n*n&&this.kill(r,1.18,e.x)}for(let s of this.runners)s.alive&&(s.x-e.x)**2+(s.z-t)**2<n*n&&this.kill(s,1.18,e.x);this.event("impact",e.x,.06,t,e.power)}damageBoss(e,t){let n=this.boss;n.defeated||(n.hp=Math.max(0,n.hp-t*(n.brace>.6?.55:1)),n.hit=e.kind==="rocket"?.77:Math.max(n.hit,.1),n.hp<=0&&(n.defeated=!0,n.skill=null,n.defeatAge=0,this.phase="clear",this.lastRow=this.row,this.event("finisher",n.x,2.3,n.z,1.5)))}resolveHit(e,t){if(t.mechanism){f0(this,t.mechanism,e);return}if(t===this.wall)t.hp=Math.max(0,t.hp-e.damage*.72),t.flash=1,this.event(t.hp<=0?"wallBreak":"wallHit",e.x,.85,e.z,e.kind==="rocket"?1.15:.45);else if(t.type&&Rn[t.type])t.hp=Math.max(0,t.hp-e.damage),t.flash=1,t.hp<=0?this.openCard(t):this.event("cardHit",e.x,.6,e.z,.7,t.type);else if(t===this.boss){let n=!!e.crit,s=this.comboDamageMult*(n?1.48:1),r=e.damage*(e.profile===qs?4.2:1)*s,a=r*(this.boss.brace>.6?.55:1);this.event(e.kind==="rocket"?"impact":n?"critHit":"hit",e.x,e.y,e.z,e.kind==="rocket"?e.power*.75:n?.95:.7),(e.kind==="rocket"||n)&&this.addPopup(e.x+(this.rand()-.5)*.45,e.y+.42,e.z,n?`${Math.round(a)}!`:`${Math.round(a)}`,n?"crit":"rocket"),this.addOverdrive(e.kind==="rocket"?2.4:.35),e.kind==="rocket"?this.addCombo(1):this.comboTimer>0&&(this.comboTimer=Math.max(this.comboTimer,2.4)),this.damageBoss(e,r)}else if(e.kind==="rocket"){this.blast(e,t.z);let n=this.boss;n.active&&n.lift<.85&&Math.hypot(e.x-n.x,t.z-n.z)<1.65+e.power*.48&&this.damageBoss(e,e.damage*.65)}else{let n=!!e.crit,s=e.damage*(n?1.5:1);t.hp!=null&&(t.hp-=s*(t.role==="guard"&&e.profile!==xs?.65:1)),(t.hp==null||t.hp<=0)&&this.kill(t,n?1.05:.72),n&&t.role&&this.addPopup(e.x,.9,e.z,`${Math.round(s)}!`,"crit"),this.event(n?"critHit":"hit",e.x,.45,e.z,n?.85:.65)}}advanceShots(e){let t=[];for(let n of this.shots){if(n.age+=e,n.finished){n.afterHit+=e,n.afterHit*n.profile.speed<n.profile.tail&&t.push(n);continue}let s=Math.min(e*n.profile.speed,n.range-n.distance);for(;s>0&&!n.finished&&this.playing;){let r=this.firstHit(n,s),a=r?r.distance:s;n.distance+=a,!r&&n.range-n.distance<1e-8&&(n.distance=n.range),s-=a,Rr(n,n.distance,n),r&&this.resolveHit(n,r.target);let o=r&&n.pierce>0&&r.target.alive===!1;o&&n.pierce--,n.finished=!!r&&!o||n.distance>=n.range-1e-8}if(!this.playing)break;t.push(n)}this.shots=this.playing?t:[]}updateFalling(e){for(let t of this.falling){if(t.prone){t.t+=e,t.z+=this.worldAdvance;continue}if(t.intoGap){t.t+=e,t.vy-=e*8,t.y+=t.vy*e,t.z+=this.worldAdvance;continue}if(t.pushed){t.z=Math.max(t.z,t.front),t.z+=this.worldAdvance,t.y=0,t.z>7&&(t.t=2);continue}t.t+=e,t.x+=t.vx*e,t.z+=t.vz*e+this.worldAdvance*.38,t.y+=t.vy*e,t.vy-=(t.gravity??8.6)*e,t.y<.05&&(t.y=.05,t.vx*=.9,t.vz*=.9)}ol(this.falling,t=>t.t<(t.prone?this.overrun?4.9:2.1:1.02))}slamSquad(){let e=this.boss;if(this.event("slam",e.landX,.08,e.landZ,1.08),this.allies=this.allies.filter(t=>{let n=t.x-e.landX,s=t.z-e.landZ,r=Math.hypot(n,s);if(r>2.15+.19)return!0;let a=this.fall(t,"blue",0),o=r>.01?Math.atan2(s,n):t.phase,c=3+2.1*(1-Math.min(1,r/2.15));return a.vx=Math.cos(o)*c,a.vz=Math.sin(o)*c,a.vy=4+c*.38,a.gravity=13.5,a.spin=-Math.sin(o)*5,a.roll=Math.cos(o)*5,!1}),!(Math.hypot(this.x-e.landX,this.captainZ-e.landZ)>2.15+.26)){if(this.buffs.shield>0){this.buffs.shield=0,this.event("shieldHit",this.x,.7,this.captainZ);return}this.hurt=1,this.combo>=5&&(this.combo=0,this.comboTimer=0),this.hitGuard=1.15,this.armor--,this.armor<=0&&(this.lossReason="slam",this.finish(!1))}}advanceBoss(e){let t=this.boss;if(t.defeated){let f=t.defeatAge;t.defeatAge+=e,f<.92&&t.defeatAge>=.92&&this.landBoss(),t.removed||(t.z+=this.worldAdvance),f<1.62&&t.defeatAge>=1.62&&(t.removed=!0,this.event("bossBurst",t.x,.62,t.z-1.15,1.4)),t.removed&&t.defeatAge>2.05&&!this.flanks.length&&!this.deliveries.length&&this.row>=this.lastRow&&!this.runners.length&&this.columns.every(h=>h.units.length===0)&&this.finish(!0);return}if(!t.active){this.row>=this.finaleRow&&(t.z=this.entryZ-1.5,t.active=!0,this.phase="boss",this.route.vault?d0(this):t.x=t.escortX=Ia(this,t.z-1.3,t.z+6).x);return}if(a0(this,e),!this.playing)return;if(t.vault){x0(this,e);return}if(t.recovery=Math.max(0,t.recovery-e),t.attackT>0){t.attackT+=e;let f=il(t.attackT),h=Tt(f,0,1);t.x=t.leapFromX+(t.landX-t.leapFromX)*h,t.z=t.leapFromZ+(t.landZ-.68-t.leapFromZ)*h,t.lift=2.15*4*f*(1-f),t.attackT>=.91&&!t.impactDone&&(t.impactDone=!0,this.slamSquad()),t.attackT>=1.48&&(t.attackT=0,t.recovery=1.14);return}for(let f of this.activeGround){if(f.crossed||!Ys(f)||Math.abs(t.x-f.x)>1.9)continue;let h=f.z-f.length/2-t.z;if(h<=1.05&&h>=-.5){g0(this,f);return}}t.moveClock+=e;let n=t.moveClock%5.2;t.brace=t.kind==="warden"?Tt(n,.92,1.32)*(1-Tt(n,2.45,2.95)):0,t.special=t.kind==="drill"?Tt(n,1.1,1.55)*(1-Tt(n,2.35,2.85)):0;let s=t.skill?.kind==="warden"&&t.skill.fired&&!t.skill.marks[0].hit?2.2:0;!t.pursuing&&t.z>=this.captainZ-9.7&&(t.pursuing=!0);let r=t.pursuing?Hh(this):null,a=1-Tt(t.z,-23,-15),o=t.pursuing?2.75:this.bossStride+(this.bossEntryStride-this.bossStride)*a,c=e*o*(1-.38*t.brace+.78*t.special+s);if(h0(this,e,r,c),t.kind==="kestrel"&&t.z>-11&&t.z<-7&&!t.glided&&!t.skill){t.glided=!0,t.vault={piece:{z:t.z+2},from:-2,to:2.1,t:0,airDash:!0};return}if(!t.pursuing||t.recovery>0||t.skill)return;let l=Hh(this);if(l.distance>3.38)return;let u=Hn(l.x,-5.32,5.32),d=l.z;u0(this,u,d-.68)&&(t.leapFromX=t.x,t.leapFromZ=t.z,t.landX=u,t.landZ=d,t.attackT=.001,t.impactDone=!1)}landBoss(){this.event("victory",this.boss.x,.1,this.boss.z-1.35,1.05)}finish(e,t=null){if(this.playing){if(this.phase=e?"won":"lost",this.endTime=0,this.shots=[],this.incoming=[],e){let n=[...this.allies].sort((s,r)=>s.z-r.z);for(let s=0;s<n.length;s+=5){let r=n.slice(s,s+5).sort((a,o)=>a.x-o.x);r.forEach((a,o)=>{a.exitX=(o-(r.length-1)/2)*.58,a.exitZ=.98+Math.floor(s/5)*.64})}this.parade={complete:!1,originX:this.x},this.recoil=0,this.event("rally",this.x,.14,this.captainZ);return}if(this.event("loss",this.x,0,this.captainZ),this.lossReason==="infantry"){let n=t?.alive&&t.id?t:null;if(!n){let s=r=>{!r.alive||r.z>this.captainZ+.36||(!n||Math.hypot(r.x-this.x,r.z-this.captainZ)<Math.hypot(n.x-this.x,n.z-this.captainZ))&&(n=r)};for(let r of this.columns)for(let a of r.units)s(a);this.runners.forEach(s)}n||(n=this.grunt(this.x,this.entryZ-1),this.runners.push(n)),this.overrun={x:this.x,z:this.captainZ,crossed:!1,attacker:n.id,approach:Math.max(2.35,(this.captainZ-n.z+1.6)/4)};for(let s of this.allies){let r=this.fall(s,"blue",0);r.prone=!0,r.dir=s.x>=this.x?1:-1}this.allies=[]}else this.event("impact",this.x,0,this.captainZ,1.25)}}advanceOverrun(e){let t=this.overrun;this.worldAdvance=.36*e,this.distance+=this.worldAdvance,this.captainZ+=this.worldAdvance,t.z=this.captainZ,this.wall.z+=this.worldAdvance;for(let s of this.gates)s.z+=this.worldAdvance;for(let s of this.features)s.z+=this.worldAdvance;let n=s=>{if(!s.alive||s.z>10)return;let r=s.id===t.attacker,a=(r?Math.max((s.speed||Vh)*1.68,t.approach):(s.speed||Vh)*1.68)*e,o=0;if((r||s.z>t.z-7)&&s.z<t.z+.46){let l=s.id===t.attacker?0:(s.id%7-3)*.15,u=r?11:4.9;o=Hn(t.x+l-s.x,-u*e,u*e),s.x+=o}r&&Math.abs(s.x-t.x)>.43&&s.z<t.z+.48&&(a=Math.min(a,Math.max(0,t.z+.15-s.z)));let c=s.z;s.z+=a+this.worldAdvance,s.marched+=Math.hypot(o,a),s.yaw+=(Math.atan2(o,a)-s.yaw)*(1-Math.exp(-8*e)),c<t.z+1.05&&s.z>=t.z+1.05&&Math.abs(s.x-t.x)<1.15&&(t.crossed=!0)};for(let s of this.columns)for(let r of s.units)n(r);this.runners.forEach(n)}advanceParade(e){let t=this.parade;if(t.complete)return;let n=this.endTime,r=(7.4+Math.min(18,n*8.6))*Tt(n,.12,.58)*e;this.x=t.originX*(1-Tt(n,.16,1.65)),this.velocity=0,this.captainZ-=r;let a=this.captainZ;for(let o of this.allies)o.age+=e,o.x+=(this.x+o.exitX-o.x)*(1-Math.exp(-4.8*e)),o.z-=r,o.z+=(this.captainZ+o.exitZ-o.z)*(1-Math.exp(-4.2*e)),a=Math.max(a,o.z);t.complete=a<this.entryZ-2.8}get resultReady(){return this.parade?this.parade.complete:this.boss.defeated&&this.boss.defeatAge<2.05?!1:this.overrun?this.overrun.crossed&&this.endTime>=2.5:this.endTime>.86}tick(e,t=0,n=0){if(this.worldAdvance=0,!this.playing){(this.phase==="won"||this.phase==="lost")&&(this.endTime+=e,this.parade&&this.advanceParade(e),this.overrun&&this.advanceOverrun(e),this.phase==="lost"&&this.boss.defeated&&this.boss.defeatAge<2.05&&this.advanceBoss(e),this.boss.hit=Math.max(0,this.boss.hit-4*e),this.updateFalling(e));return}this.elapsed+=e,this.chill=Math.max(0,this.chill-e),this.overdriveActive=Math.max(0,this.overdriveActive-e),this.comboTimer>0&&(this.comboTimer=Math.max(0,this.comboTimer-e),this.comboTimer<=0&&(this.combo=0));for(let r of Object.keys(this.buffs))this.buffs[r]=Math.max(0,this.buffs[r]-e);for(let r of this.gates)r.flash=Math.max(0,r.flash-e*7);if(this.hitGuard=Math.max(0,this.hitGuard-e),this.hurt=Math.max(0,this.hurt-4*e),this.mergeGlow=Math.max(0,this.mergeGlow-2.25*e),this.recoil=Math.max(0,this.recoil-5.1*e),this.wall.flash=Math.max(0,this.wall.flash-4.6*e),this.boss.hit=Math.max(0,this.boss.hit-5.4*e),this.visualScale+=(this.scale-this.visualScale)*(1-Math.exp(-8*e)),this.caught&&this.caughtBy?.hp<=0&&(this.caught=!1,this.caughtBy=null),t||n){let r=t*(this.targetX-this.x)<0?this.x:this.targetX;this.aim(r+t*10.2*e,this.targetZ+n*3.1*e)}this.caught||(this.captainZ+=(this.targetZ-this.captainZ)*(1-Math.exp(-16*e)));let s=this.x;if(this.rope){let r=this.rope;r.age+=e,this.x=r.from+(r.to-r.from)*Tt(r.age,0,.58),r.age>=.58&&(this.rope=null,this.aim(r.to))}else this.caught||(this.x+=(this.targetX-this.x)*(1-Math.exp(-26*e)));if(this.velocity=(this.x-s)/Math.max(e,.001),this.worldAdvance=this.roadSpeed*e,this.distance+=this.worldAdvance,this.wall.z=this.distance-v0,p0(this,e),!!this.playing){this.crossGates(),this.updateDeliveries(e);for(let r of this.allies){r.age+=e;let[a,o]=Wh(r.slot,this.scale),c=Hn(this.x+a,-6.28,6.28);r.x+=(c-r.x)*(1-Math.exp(-19*e)),r.z+=(this.captainZ+o-r.z)*(1-Math.exp(-14*e))}this.pushWall(e);for(let r of this.features)(r.kind==="cache"||r.kind==="cover"&&r.variant!=="glass")&&r.state==="ready"&&r.z>-4&&r.z<11&&this.pushWall(e,r,r.half);this.playing&&(this.advanceCrowd(e),this.advanceIncoming(e),this.updateFalling(e),this.playing&&(this.advanceBoss(e),this.playing&&(this.caught||this.shoot(e),this.advanceShots(e))))}}};var dp=0,Nu=1,pp=2;var wo=1,mp=2,fa=3,hi=0,zn=1,qt=2,pr=0,Ls=1,bi=2,Du=3,Uu=4,gp=5;var mr=100,xp=101,vp=102,_p=103,yp=104,Mp=200,bp=201,Sp=202,Ep=203,Fu=204,Ou=205,wp=206,Tp=207,Ap=208,Rp=209,Cp=210,Pp=211,Ip=212,Lp=213,Np=214,zl=0,Hl=1,Gl=2,qr=3,Vl=4,Wl=5,Xl=6,ql=7,gc=0,Dp=1,Up=2,Oi=0,Bu=1,ku=2,zu=3,To=4,Hu=5,Gu=6,Vu=7,vu="attached",Fp="detached",Wu=300,gr=301,da=302,xc=303,vc=304,Mi=1e3,li=1001,Yr=1002,en=1003,_c=1004;var xr=1005;var tn=1006,pa=1007;var Xn=1008;var qn=1009,Xu=1010,qu=1011,ma=1012,yc=1013,Si=1014,si=1015,Ei=1016,Mc=1017,bc=1018,vr=1020,Yu=35902,Zu=35899,Ku=1021,$u=1022,ui=1023,es=1026,us=1027,Sc=1028,Ec=1029,Ns=1030,wc=1031;var Tc=1033,Ao=33776,Ro=33777,Co=33778,Po=33779,Ac=35840,Rc=35841,Cc=35842,Pc=35843,Ic=36196,Lc=37492,Nc=37496,Dc=37488,Uc=37489,Io=37490,Fc=37491,Oc=37808,Bc=37809,kc=37810,zc=37811,Hc=37812,Gc=37813,Vc=37814,Wc=37815,Xc=37816,qc=37817,Yc=37818,Zc=37819,Kc=37820,$c=37821,Jc=36492,jc=36494,Qc=36495,eh=36283,th=36284,Lo=36285,nh=36286;var tr=2300,nr=2301,Bl=2302,_u=2303,yu=2400,Mu=2401,bu=2402,Op=2500;var Ju=0,No=1,ga=2,Bp=3200;var Do=0,kp=1,fs="",Mt="srgb",Un="srgb-linear",qa="linear",It="srgb";var kl=7680;var zp=519,Hp=512,Gp=513,Vp=514,ju=515,Wp=516,Xp=517,Qu=518,ef=519,tf=35044,Yt=35048;var nf="300 es",ci=2e3,Zr=2001;function O1(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function B1(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qp(){let i=Kr("canvas");return i.style.display="block",i}var M0={},$r=null;function Ya(...i){let e="THREE."+i.shift();$r?$r("log",e,...i):console.log(e,...i)}function Yp(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=Yp(i);let e="THREE."+i.shift();if($r)$r("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Qe(...i){i=Yp(i);let e="THREE."+i.shift();if($r)$r("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function er(...i){let e=i.join(" ");e in M0||(M0[e]=!0,He(...i))}function Zp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Kp={[zl]:zl,[Gl]:Xl,[Vl]:Vl,[qr]:Wl,[Hl]:Hl,[Xl]:Gl,[ql]:ql,[Wl]:qr},Ni=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],b0=1234567,Ga=Math.PI/180,ir=180/Math.PI;function wi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Cn[i&255]+Cn[i>>8&255]+Cn[i>>16&255]+Cn[i>>24&255]+"-"+Cn[e&255]+Cn[e>>8&255]+"-"+Cn[e>>16&15|64]+Cn[e>>24&255]+"-"+Cn[t&63|128]+Cn[t>>8&255]+"-"+Cn[t>>16&255]+Cn[t>>24&255]+Cn[n&255]+Cn[n>>8&255]+Cn[n>>16&255]+Cn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function sf(i,e){return(i%e+e)%e}function k1(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function z1(i,e,t){return i!==e?(t-i)/(e-i):0}function Va(i,e,t){return(1-t)*i+t*e}function H1(i,e,t,n){return Va(i,e,1-Math.exp(-t*n))}function G1(i,e=1){return e-Math.abs(sf(i,e*2)-e)}function V1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function W1(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function X1(i,e){return i+Math.floor(Math.random()*(e-i+1))}function q1(i,e){return i+Math.random()*(e-i)}function Y1(i){return i*(.5-Math.random())}function Z1(i){i!==void 0&&(b0=i);let e=b0+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function K1(i){return i*Ga}function $1(i){return i*ir}function J1(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function j1(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function rf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Q1(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),f=a((e-n)/2),h=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*d,c*f,o*l);break;case"YZY":i.set(c*f,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*f,o*u,o*l);break;case"XZX":i.set(o*u,c*p,c*h,o*l);break;case"YXY":i.set(c*h,o*u,c*p,o*l);break;case"ZYZ":i.set(c*p,c*h,o*u,o*l);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ih(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function af(i,e){if(e.constructor===Float32Array)return i;let t=ih(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function of(i,e){if(e.constructor===Float32Array)return i;let t=ih(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Ne={DEG2RAD:Ga,RAD2DEG:ir,generateUUID:wi,clamp:ht,euclideanModulo:sf,mapLinear:k1,inverseLerp:z1,lerp:Va,damp:H1,pingpong:G1,smoothstep:V1,smootherstep:W1,randInt:X1,randFloat:q1,randFloatSpread:Y1,seededRandom:Z1,degToRad:K1,radToDeg:$1,isPowerOfTwo:J1,ceilPowerOfTwo:j1,floorPowerOfTwo:rf,setQuaternionFromProperEuler:Q1,normalize:of,denormalize:af},df=class df{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};df.prototype.isVector2=!0;var me=df,nn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],f=r[a+0],h=r[a+1],p=r[a+2],x=r[a+3];if(d!==x||c!==f||l!==h||u!==p){let g=c*f+l*h+u*p+d*x;g<0&&(f=-f,h=-h,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){let v=Math.acos(g),_=Math.sin(v);m=Math.sin(m*v)/_,o=Math.sin(o*v)/_,c=c*m+f*o,l=l*m+h*o,u=u*m+p*o,d=d*m+x*o}else{c=c*m+f*o,l=l*m+h*o,u=u*m+p*o,d=d*m+x*o;let v=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=v,l*=v,u*=v,d*=v}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[a],f=r[a+1],h=r[a+2],p=r[a+3];return e[t]=o*p+u*d+c*h-l*f,e[t+1]=c*p+u*f+l*d-o*h,e[t+2]=l*p+u*h+o*f-c*d,e[t+3]=u*p-o*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),d=o(r/2),f=c(n/2),h=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=f*u*d+l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d-f*h*p;break;case"YXZ":this._x=f*u*d+l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d+f*h*p;break;case"ZXY":this._x=f*u*d-l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d-f*h*p;break;case"ZYX":this._x=f*u*d-l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d+f*h*p;break;case"YZX":this._x=f*u*d+l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d-f*h*p;break;case"XZY":this._x=f*u*d-l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d+f*h*p;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(a-s)*h}else if(n>o&&n>d){let h=2*Math.sqrt(1+n-o-d);this._w=(u-c)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+l)/h}else if(o>d){let h=2*Math.sqrt(1+o-n-d);this._w=(r-l)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-n-o);this._w=(a-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},pf=class pf{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(S0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(S0.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xh.copy(this).projectOnVector(e),this.sub(Xh)}reflect(e){return this.sub(Xh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};pf.prototype.isVector3=!0;var N=pf,Xh=new N,S0=new nn,mf=class mf{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],h=n[5],p=n[8],x=s[0],g=s[3],m=s[6],v=s[1],_=s[4],y=s[7],E=s[2],b=s[5],M=s[8];return r[0]=a*x+o*v+c*E,r[3]=a*g+o*_+c*b,r[6]=a*m+o*y+c*M,r[1]=l*x+u*v+d*E,r[4]=l*g+u*_+d*b,r[7]=l*m+u*y+d*M,r[2]=f*x+h*v+p*E,r[5]=f*g+h*_+p*b,r[8]=f*m+h*y+p*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*c-u*r,h=l*r-a*c,p=t*d+n*f+s*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=d*x,e[1]=(s*l-u*n)*x,e[2]=(o*n-s*a)*x,e[3]=f*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=h*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return er("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qh.makeScale(e,t)),this}rotate(e){return er("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qh.makeRotation(-e)),this}translate(e,t){return er("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};mf.prototype.isMatrix3=!0;var et=mf,qh=new et,E0=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),w0=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ex(){let i={enabled:!0,workingColorSpace:Un,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===It&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===It&&(s.r=Xr(s.r),s.g=Xr(s.g),s.b=Xr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fs?qa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Un]:{primaries:e,whitePoint:n,transfer:qa,toXYZ:E0,fromXYZ:w0,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:n,transfer:It,toXYZ:E0,fromXYZ:w0,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),i}var dt=ex();function Qi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ir,Yl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ir===void 0&&(Ir=Kr("canvas")),Ir.width=e.width,Ir.height=e.height;let s=Ir.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ir}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Kr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Qi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qi(t[n]/255)*255):t[n]=Qi(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},tx=0,Jr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Yh(s[a].image)):r.push(Yh(s[a]))}else r=Yh(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Yh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var nx=0,Zh=new N,dn=class i extends Ni{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=li,s=li,r=tn,a=Xn,o=ui,c=qn,l=i.DEFAULT_ANISOTROPY,u=fs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nx++}),this.uuid=wi(),this.name="",this.source=new Jr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Zh).x}get height(){return this.source.getSize(Zh).y}get depth(){return this.source.getSize(Zh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mi:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case Yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mi:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case Yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Wu;dn.DEFAULT_ANISOTROPY=1;var gf=class gf{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,y=(h+1)/2,E=(m+1)/2,b=(u+f)/4,M=(d+x)/4,S=(p+g)/4;return _>y&&_>E?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=b/n,r=M/n):y>E?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=b/s,r=S/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=M/r,s=S/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-x)/v,this.z=(f-u)/v,this.w=Math.acos((l+h+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gf.prototype.isVector4=!0;var gt=gf,Zl=class extends Ni{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new dn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Jr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qn=class extends Zl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Za=class extends dn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kl=class extends dn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var mc=class mc{constructor(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,g)}set(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Lr.setFromMatrixColumn(e,0).length(),r=1/Lr.setFromMatrixColumn(e,1).length(),a=1/Lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=a*u,h=a*d,p=o*u,x=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+p*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=p+h*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,p=l*u,x=l*d;t[0]=f+x*o,t[4]=p*o-h,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=x+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,p=l*u,x=l*d;t[0]=f-x*o,t[4]=-a*d,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=x-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*u,h=a*d,p=o*u,x=o*d;t[0]=c*u,t[4]=p*l-h,t[8]=f*l+x,t[1]=c*d,t[5]=x*l+f,t[9]=h*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,h=a*l,p=o*c,x=o*l;t[0]=c*u,t[4]=x-f*d,t[8]=p*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=h*d+p,t[10]=f-x*d}else if(e.order==="XZY"){let f=a*c,h=a*l,p=o*c,x=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+x,t[5]=a*u,t[9]=h*d-p,t[2]=p*d-h,t[6]=o*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ix,e,sx)}lookAt(e,t,n){let s=this.elements;return Jn.subVectors(e,t),Jn.lengthSq()===0&&(Jn.z=1),Jn.normalize(),_s.crossVectors(n,Jn),_s.lengthSq()===0&&(Math.abs(n.z)===1?Jn.x+=1e-4:Jn.z+=1e-4,Jn.normalize(),_s.crossVectors(n,Jn)),_s.normalize(),ul.crossVectors(Jn,_s),s[0]=_s.x,s[4]=ul.x,s[8]=Jn.x,s[1]=_s.y,s[5]=ul.y,s[9]=Jn.y,s[2]=_s.z,s[6]=ul.z,s[10]=Jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],h=n[13],p=n[2],x=n[6],g=n[10],m=n[14],v=n[3],_=n[7],y=n[11],E=n[15],b=s[0],M=s[4],S=s[8],L=s[12],C=s[1],A=s[5],D=s[9],B=s[13],P=s[2],V=s[6],Z=s[10],X=s[14],se=s[3],W=s[7],U=s[11],R=s[15];return r[0]=a*b+o*C+c*P+l*se,r[4]=a*M+o*A+c*V+l*W,r[8]=a*S+o*D+c*Z+l*U,r[12]=a*L+o*B+c*X+l*R,r[1]=u*b+d*C+f*P+h*se,r[5]=u*M+d*A+f*V+h*W,r[9]=u*S+d*D+f*Z+h*U,r[13]=u*L+d*B+f*X+h*R,r[2]=p*b+x*C+g*P+m*se,r[6]=p*M+x*A+g*V+m*W,r[10]=p*S+x*D+g*Z+m*U,r[14]=p*L+x*B+g*X+m*R,r[3]=v*b+_*C+y*P+E*se,r[7]=v*M+_*A+y*V+E*W,r[11]=v*S+_*D+y*Z+E*U,r[15]=v*L+_*B+y*X+E*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],p=e[3],x=e[7],g=e[11],m=e[15],v=c*h-l*f,_=o*h-l*d,y=o*f-c*d,E=a*h-l*u,b=a*f-c*u,M=a*d-o*u;return t*(x*v-g*_+m*y)-n*(p*v-g*E+m*b)+s*(p*_-x*E+m*M)-r*(p*y-x*b+g*M)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],p=e[12],x=e[13],g=e[14],m=e[15],v=t*o-n*a,_=t*c-s*a,y=t*l-r*a,E=n*c-s*o,b=n*l-r*o,M=s*l-r*c,S=u*x-d*p,L=u*g-f*p,C=u*m-h*p,A=d*g-f*x,D=d*m-h*x,B=f*m-h*g,P=v*B-_*D+y*A+E*C-b*L+M*S;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/P;return e[0]=(o*B-c*D+l*A)*V,e[1]=(s*D-n*B-r*A)*V,e[2]=(x*M-g*b+m*E)*V,e[3]=(f*b-d*M-h*E)*V,e[4]=(c*C-a*B-l*L)*V,e[5]=(t*B-s*C+r*L)*V,e[6]=(g*y-p*M-m*_)*V,e[7]=(u*M-f*y+h*_)*V,e[8]=(a*D-o*C+l*S)*V,e[9]=(n*C-t*D-r*S)*V,e[10]=(p*b-x*y+m*v)*V,e[11]=(d*y-u*b-h*v)*V,e[12]=(o*L-a*A-c*S)*V,e[13]=(t*A-n*L+s*S)*V,e[14]=(x*_-p*E-g*v)*V,e[15]=(u*E-d*_+f*v)*V,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,d=o+o,f=r*l,h=r*u,p=r*d,x=a*u,g=a*d,m=o*d,v=c*l,_=c*u,y=c*d,E=n.x,b=n.y,M=n.z;return s[0]=(1-(x+m))*E,s[1]=(h+y)*E,s[2]=(p-_)*E,s[3]=0,s[4]=(h-y)*b,s[5]=(1-(f+m))*b,s[6]=(g+v)*b,s[7]=0,s[8]=(p+_)*M,s[9]=(g-v)*M,s[10]=(1-(f+x))*M,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Lr.set(s[0],s[1],s[2]).length(),o=Lr.set(s[4],s[5],s[6]).length(),c=Lr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),xi.copy(this);let l=1/a,u=1/o,d=1/c;return xi.elements[0]*=l,xi.elements[1]*=l,xi.elements[2]*=l,xi.elements[4]*=u,xi.elements[5]*=u,xi.elements[6]*=u,xi.elements[8]*=d,xi.elements[9]*=d,xi.elements[10]*=d,t.setFromRotationMatrix(xi),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=ci,c=!1){let l=this.elements,u=2*r/(t-e),d=2*r/(n-s),f=(t+e)/(t-e),h=(n+s)/(n-s),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===ci)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Zr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ci,c=!1){let l=this.elements,u=2/(t-e),d=2/(n-s),f=-(t+e)/(t-e),h=-(n+s)/(n-s),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===ci)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Zr)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};mc.prototype.isMatrix4=!0;var Ge=mc,Lr=new N,xi=new Ge,ix=new N(0,0,0),sx=new N(1,1,1),_s=new N,ul=new N,Jn=new N,T0=new Ge,A0=new nn,Xt=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return T0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(T0,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return A0.setFromEuler(this),this.setFromQuaternion(A0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xt.DEFAULT_ORDER="XYZ";var Ka=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},rx=0,R0=new N,Nr=new nn,Yi=new Ge,fl=new N,La=new N,ax=new N,ox=new nn,C0=new N(1,0,0),P0=new N(0,1,0),I0=new N(0,0,1),L0={type:"added"},lx={type:"removed"},Dr={type:"childadded",child:null},Kh={type:"childremoved",child:null},At=class i extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new N,t=new Xt,n=new nn,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ge},normalMatrix:{value:new et}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Nr.setFromAxisAngle(e,t),this.quaternion.multiply(Nr),this}rotateOnWorldAxis(e,t){return Nr.setFromAxisAngle(e,t),this.quaternion.premultiply(Nr),this}rotateX(e){return this.rotateOnAxis(C0,e)}rotateY(e){return this.rotateOnAxis(P0,e)}rotateZ(e){return this.rotateOnAxis(I0,e)}translateOnAxis(e,t){return R0.copy(e).applyQuaternion(this.quaternion),this.position.add(R0.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(C0,e)}translateY(e){return this.translateOnAxis(P0,e)}translateZ(e){return this.translateOnAxis(I0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fl.copy(e):fl.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),La.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yi.lookAt(La,fl,this.up):Yi.lookAt(fl,La,this.up),this.quaternion.setFromRotationMatrix(Yi),s&&(Yi.extractRotation(s.matrixWorld),Nr.setFromRotationMatrix(Yi),this.quaternion.premultiply(Nr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(L0),Dr.child=e,this.dispatchEvent(Dr),Dr.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lx),Kh.child=e,this.dispatchEvent(Kh),Kh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(L0),Dr.child=e,this.dispatchEvent(Dr),Dr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(La,e,ax),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(La,ox,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};At.DEFAULT_UP=new N(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ct=class extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}},cx={type:"move"},jr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,p=.005;l.inputState.pinching&&f>h+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cx)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},$p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ys={h:0,s:0,l:0},dl={h:0,s:0,l:0};function $h(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var _e=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=dt.workingColorSpace){if(e=sf(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=$h(a,r,e+1/3),this.g=$h(a,r,e),this.b=$h(a,r,e-1/3)}return dt.colorSpaceToWorking(this,s),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){let n=$p[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=Xr(e.r),this.g=Xr(e.g),this.b=Xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return dt.workingToColorSpace(Pn.copy(this),e),Math.round(ht(Pn.r*255,0,255))*65536+Math.round(ht(Pn.g*255,0,255))*256+Math.round(ht(Pn.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(Pn.copy(this),t);let n=Pn.r,s=Pn.g,r=Pn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(Pn.copy(this),t),e.r=Pn.r,e.g=Pn.g,e.b=Pn.b,e}getStyle(e=Mt){dt.workingToColorSpace(Pn.copy(this),e);let t=Pn.r,n=Pn.g,s=Pn.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ys),this.setHSL(ys.h+e,ys.s+t,ys.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ys),e.getHSL(dl);let n=Va(ys.h,dl.h,t),s=Va(ys.s,dl.s,t),r=Va(ys.l,dl.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new _e;_e.NAMES=$p;var $a=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new _e(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ja=class extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xt,this.environmentIntensity=1,this.environmentRotation=new Xt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},vi=new N,Zi=new N,Jh=new N,Ki=new N,Ur=new N,Fr=new N,N0=new N,jh=new N,Qh=new N,eu=new N,tu=new gt,nu=new gt,iu=new gt,ws=class i{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vi.subVectors(e,t),s.cross(vi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vi.subVectors(s,t),Zi.subVectors(n,t),Jh.subVectors(e,t);let a=vi.dot(vi),o=vi.dot(Zi),c=vi.dot(Jh),l=Zi.dot(Zi),u=Zi.dot(Jh),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,h=(l*c-o*u)*f,p=(a*u-o*c)*f;return r.set(1-h-p,p,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ki)===null?!1:Ki.x>=0&&Ki.y>=0&&Ki.x+Ki.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Ki)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ki.x),c.addScaledVector(a,Ki.y),c.addScaledVector(o,Ki.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return tu.setScalar(0),nu.setScalar(0),iu.setScalar(0),tu.fromBufferAttribute(e,t),nu.fromBufferAttribute(e,n),iu.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(tu,r.x),a.addScaledVector(nu,r.y),a.addScaledVector(iu,r.z),a}static isFrontFacing(e,t,n,s){return vi.subVectors(n,t),Zi.subVectors(e,t),vi.cross(Zi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vi.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),vi.cross(Zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ur.subVectors(s,n),Fr.subVectors(r,n),jh.subVectors(e,n);let c=Ur.dot(jh),l=Fr.dot(jh);if(c<=0&&l<=0)return t.copy(n);Qh.subVectors(e,s);let u=Ur.dot(Qh),d=Fr.dot(Qh);if(u>=0&&d<=u)return t.copy(s);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0&&c-u>0)return a=c/(c-u),t.copy(n).addScaledVector(Ur,a);eu.subVectors(e,r);let h=Ur.dot(eu),p=Fr.dot(eu);if(p>=0&&h<=p)return t.copy(r);let x=h*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(Fr,o);let g=u*p-h*d;if(g<=0&&d-u>=0&&h-p>=0)return N0.subVectors(r,s),o=(d-u)/(d-u+(h-p)),t.copy(s).addScaledVector(N0,o);let m=1/(g+x+f);return a=x*m,o=f*m,t.copy(n).addScaledVector(Ur,a).addScaledVector(Fr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ei=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_i.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_i.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_i.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,_i):_i.fromBufferAttribute(r,a),_i.applyMatrix4(e.matrixWorld),this.expandByPoint(_i);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),pl.copy(n.boundingBox)),pl.applyMatrix4(e.matrixWorld),this.union(pl)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_i),_i.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Na),ml.subVectors(this.max,Na),Or.subVectors(e.a,Na),Br.subVectors(e.b,Na),kr.subVectors(e.c,Na),Ms.subVectors(Br,Or),bs.subVectors(kr,Br),Ks.subVectors(Or,kr);let t=[0,-Ms.z,Ms.y,0,-bs.z,bs.y,0,-Ks.z,Ks.y,Ms.z,0,-Ms.x,bs.z,0,-bs.x,Ks.z,0,-Ks.x,-Ms.y,Ms.x,0,-bs.y,bs.x,0,-Ks.y,Ks.x,0];return!su(t,Or,Br,kr,ml)||(t=[1,0,0,0,1,0,0,0,1],!su(t,Or,Br,kr,ml))?!1:(gl.crossVectors(Ms,bs),t=[gl.x,gl.y,gl.z],su(t,Or,Br,kr,ml))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_i).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_i).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$i=[new N,new N,new N,new N,new N,new N,new N,new N],_i=new N,pl=new ei,Or=new N,Br=new N,kr=new N,Ms=new N,bs=new N,Ks=new N,Na=new N,ml=new N,gl=new N,$s=new N;function su(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){$s.fromArray(i,r);let o=s.x*Math.abs($s.x)+s.y*Math.abs($s.y)+s.z*Math.abs($s.z),c=e.dot($s),l=t.dot($s),u=n.dot($s);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var cn=new N,xl=new me,hx=0,zt=class extends Ni{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=tf,this.updateRanges=[],this.gpuType=si,this.version=0,this._normalizationScale=e!==void 0?ih(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xl.fromBufferAttribute(this,t),xl.applyMatrix3(e),this.setXY(t,xl.x,xl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix3(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):af(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):of(e,this.array)}};var Qr=class extends zt{constructor(e,t,n){super(new Uint8Array(e),t,n)}};var ja=class extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Qa=class extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ve=class extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},ux=new ei,Da=new N,ru=new N,Gn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ux.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Da.subVectors(e,this.center);let t=Da.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Da,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ru.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Da.copy(e.center).add(ru)),this.expandByPoint(Da.copy(e.center).sub(ru))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},fx=0,oi=new Ge,au=new At,zr=new N,jn=new ei,Ua=new ei,_n=new N,_t=class i extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fx++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(O1(e)?Qa:ja)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return oi.makeRotationFromQuaternion(e),this.applyMatrix4(oi),this}rotateX(e){return oi.makeRotationX(e),this.applyMatrix4(oi),this}rotateY(e){return oi.makeRotationY(e),this.applyMatrix4(oi),this}rotateZ(e){return oi.makeRotationZ(e),this.applyMatrix4(oi),this}translate(e,t,n){return oi.makeTranslation(e,t,n),this.applyMatrix4(oi),this}scale(e,t,n){return oi.makeScale(e,t,n),this.applyMatrix4(oi),this}lookAt(e){return au.lookAt(e),au.updateMatrix(),this.applyMatrix4(au.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zr).negate(),this.translate(zr.x,zr.y,zr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];jn.setFromBufferAttribute(r),this.morphTargetsRelative?(_n.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(_n),_n.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(_n)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ua.setFromBufferAttribute(o),this.morphTargetsRelative?(_n.addVectors(jn.min,Ua.min),jn.expandByPoint(_n),_n.addVectors(jn.max,Ua.max),jn.expandByPoint(_n)):(jn.expandByPoint(Ua.min),jn.expandByPoint(Ua.max))}jn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)_n.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(_n));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)_n.fromBufferAttribute(o,l),c&&(zr.fromBufferAttribute(e,l),_n.add(zr)),s=Math.max(s,n.distanceToSquared(_n))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let L=0;L<n.count;L++)o[L]=new N,c[L]=new N;let u=new N,d=new N,f=new N,h=new me,p=new me,x=new me,g=new N,m=new N;function v(L,C,A){l[L]=l[C]=l[A]=1,u.fromBufferAttribute(n,L),d.fromBufferAttribute(n,C),f.fromBufferAttribute(n,A),h.fromBufferAttribute(r,L),p.fromBufferAttribute(r,C),x.fromBufferAttribute(r,A),d.sub(u),f.sub(u),p.sub(h),x.sub(h);let D=1/(p.x*x.y-x.x*p.y);isFinite(D)&&(g.copy(d).multiplyScalar(x.y).addScaledVector(f,-p.y).multiplyScalar(D),m.copy(f).multiplyScalar(p.x).addScaledVector(d,-x.x).multiplyScalar(D),o[L].add(g),o[C].add(g),o[A].add(g),c[L].add(m),c[C].add(m),c[A].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let L=0,C=_.length;L<C;++L){let A=_[L],D=A.start,B=A.count;for(let P=D,V=D+B;P<V;P+=3)v(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let y=new N,E=new N,b=new N,M=new N;function S(L){b.fromBufferAttribute(s,L),M.copy(b);let C=o[L];y.copy(C),y.sub(b.multiplyScalar(b.dot(C))).normalize(),E.crossVectors(M,C);let D=E.dot(c[L])<0?-1:1;a.setXYZW(L,y.x,y.y,y.z,D)}for(let L=0,C=n.count;L<C;++L)l[L]&&S(L);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);let s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,u=new N,d=new N;if(e)for(let f=0,h=e.count;f<h;f+=3){let p=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_n.fromBufferAttribute(e,t),_n.normalize(),e.setXYZ(t,_n.x,_n.y,_n.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(c.length*u),h=0,p=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?h=c[x]*o.data.stride+o.offset:h=c[x]*u;for(let m=0;m<u;m++)f[p++]=l[h++]}return new zt(f,u,d)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,n);c.push(h)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],d=r[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ea=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=tf,this.updateRanges=[],this.version=0,this.uuid=wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=D0(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=D0(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function D0(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=wi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var Dn=new N,ta=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?ih(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.applyMatrix4(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.applyNormalMatrix(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dn.fromBufferAttribute(this,t),Dn.transformDirection(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ya("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ya("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):af(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):of(e,this.data.array)}},ou=new N,dx=new N,px=new et,yi=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=ou.subVectors(n,t).cross(dx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(ou),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||px.getNormalMatrix(e),s=this.coplanarPoint(ou).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},mx=0,Fn=class extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=Ls,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fu,this.blendDst=Ou,this.blendEquation=mr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _e(0,0,0),this.blendAlpha=0,this.depthFunc=qr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=kl,this.stencilZFail=kl,this.stencilZPass=kl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new _e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new yi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new me().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ji=new N,lu=new N,vl=new N,_l=new N,sr=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ji.copy(this.origin).addScaledVector(this.direction,t),Ji.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){lu.copy(e).add(t).multiplyScalar(.5),vl.copy(t).sub(e).normalize(),_l.copy(this.origin).sub(lu);let r=e.distanceTo(t)*.5,a=-this.direction.dot(vl),o=_l.dot(this.direction),c=-_l.dot(vl),l=_l.lengthSq(),u=Math.abs(1-a*a),d,f,h,p;if(u>0)if(d=a*c-o,f=a*o-c,p=r*u,d>=0)if(f>=-p)if(f<=p){let x=1/u;d*=x,f*=x,h=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;else f<=-p?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l):f<=p?(d=0,f=Math.min(Math.max(-r,-c),r),h=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(lu).addScaledVector(vl,f),h}intersectSphere(e,t){if(e.radius<0)return null;Ji.subVectors(e.center,this.origin);let n=Ji.dot(this.direction),s=Ji.dot(Ji)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ji)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,f=e.y-a.y,h=e.z-a.z,p=t.x-a.x,x=t.y-a.y,g=t.z-a.z,m=n.x-a.x,v=n.y-a.y,_=n.z-a.z,y=Math.abs(c),E=Math.abs(l),b=Math.abs(u),M,S,L,C,A,D,B,P,V,Z,X,se;if(y>=E&&y>=b?(L=c,D=d,V=p,se=m,c>=0?(M=l,S=u,C=f,A=h,B=x,P=g,Z=v,X=_):(M=u,S=l,C=h,A=f,B=g,P=x,Z=_,X=v)):E>=b?(L=l,D=f,V=x,se=v,l>=0?(M=u,S=c,C=h,A=d,B=g,P=p,Z=_,X=m):(M=c,S=u,C=d,A=h,B=p,P=g,Z=m,X=_)):(L=u,D=h,V=g,se=_,u>=0?(M=c,S=l,C=d,A=f,B=p,P=x,Z=m,X=v):(M=l,S=c,C=f,A=d,B=x,P=p,Z=v,X=m)),L===0)return null;let W=M/L,U=S/L,R=1/L,O=C-W*D,he=A-U*D,G=B-W*V,ee=P-U*V,H=Z-W*se,q=X-U*se,Q=H*ee-q*G,fe=O*q-he*H,tt=G*he-ee*O;if(s){if(Q<0||fe<0||tt<0)return null}else if((Q<0||fe<0||tt<0)&&(Q>0||fe>0||tt>0))return null;let Be=Q+fe+tt;if(Be===0)return null;let $e=R*(Q*D+fe*V+tt*se);return(Be>0?$e<0:$e>0)?null:this.at($e/Be,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},bt=class extends Fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},U0=new Ge,Js=new sr,yl=new Gn,F0=new N,Ml=new N,bl=new N,Sl=new N,cu=new N,El=new N,O0=new N,wl=new N,Ze=class extends At{constructor(e=new _t,t=new bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){El.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],d=r[c];u!==0&&(cu.fromBufferAttribute(d,e),a?El.addScaledVector(cu,u):El.addScaledVector(cu.sub(t),u))}t.add(El)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yl.copy(n.boundingSphere),yl.applyMatrix4(r),Js.copy(e.ray).recast(e.near),!(yl.containsPoint(Js.origin)===!1&&(Js.intersectSphere(yl,F0)===null||Js.origin.distanceToSquared(F0)>(e.far-e.near)**2))&&(U0.copy(r).invert(),Js.copy(e.ray).applyMatrix4(U0),!(n.boundingBox!==null&&Js.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Js)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let g=f[p],m=a[g.materialIndex],v=Math.max(g.start,h.start),_=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let y=v,E=_;y<E;y+=3){let b=o.getX(y),M=o.getX(y+1),S=o.getX(y+2);s=Tl(this,m,e,n,l,u,d,b,M,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){let v=o.getX(g),_=o.getX(g+1),y=o.getX(g+2);s=Tl(this,a,e,n,l,u,d,v,_,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let g=f[p],m=a[g.materialIndex],v=Math.max(g.start,h.start),_=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let y=v,E=_;y<E;y+=3){let b=y,M=y+1,S=y+2;s=Tl(this,m,e,n,l,u,d,b,M,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(c.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){let v=g,_=g+1,y=g+2;s=Tl(this,a,e,n,l,u,d,v,_,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function gx(i,e,t,n,s,r,a,o){let c;if(e.side===zn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===hi,o),c===null)return null;wl.copy(o),wl.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(wl);return l<t.near||l>t.far?null:{distance:l,point:wl.clone(),object:i}}function Tl(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ml),i.getVertexPosition(c,bl),i.getVertexPosition(l,Sl);let u=gx(i,e,t,n,Ml,bl,Sl,O0);if(u){let d=new N;ws.getBarycoord(O0,Ml,bl,Sl,d),s&&(u.uv=ws.getInterpolatedAttribute(s,o,c,l,d,new me)),r&&(u.uv1=ws.getInterpolatedAttribute(r,o,c,l,d,new me)),a&&(u.normal=ws.getInterpolatedAttribute(a,o,c,l,d,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new N,materialIndex:0};ws.getNormal(Ml,bl,Sl,f.normal),u.face=f,u.barycoord=d}return u}var Fa=new gt,B0=new gt,k0=new gt,xx=new gt,z0=new Ge,Al=new N,hu=new Gn,H0=new Ge,uu=new sr,rr=class extends Ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vu,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ei),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Al),this.boundingBox.expandByPoint(Al)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Al),this.boundingSphere.expandByPoint(Al)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hu.copy(this.boundingSphere),hu.applyMatrix4(s),e.ray.intersectsSphere(hu)!==!1&&(H0.copy(s).invert(),uu.copy(e.ray).applyMatrix4(H0),!(this.boundingBox!==null&&uu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,uu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new gt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Fp?this.bindMatrixInverse.copy(this.bindMatrix).invert():He("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;B0.fromBufferAttribute(s.attributes.skinIndex,e),k0.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Fa.copy(t),t.set(0,0,0,0)):(Fa.set(t.x,t.y,t.z,1),t.set(0,0,0)),Fa.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=k0.getComponent(r);if(a!==0){let o=B0.getComponent(r);z0.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(xx.copy(Fa).applyMatrix4(z0),a)}}return t.isVector4&&(t.w=Fa.w),t.applyMatrix4(this.bindMatrixInverse)}},Ts=class extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}},na=class extends dn{constructor(e=null,t=1,n=1,s,r,a,o,c,l=en,u=en,d,f){super(null,a,o,c,l,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},G0=new Ge,vx=new Ge,ar=class i{constructor(e=[],t=[]){this.uuid=wi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){He("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:vx;G0.multiplyMatrices(o,t[r]),G0.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new na(t,e,e,ui,si);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(He("Skeleton: No bone found with UUID:",r),a=new Ts),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Zt=class extends zt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Hr=new Ge,V0=new Ge,Rl=[],W0=new ei,_x=new Ge,Oa=new Ze,Ba=new Gn,Dt=class extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zt(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,_x)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ei),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hr),W0.copy(e.boundingBox).applyMatrix4(Hr),this.boundingBox.union(W0)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hr),Ba.copy(e.boundingSphere).applyMatrix4(Hr),this.boundingSphere.union(Ba)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Oa.geometry=this.geometry,Oa.material=this.material,Oa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ba.copy(this.boundingSphere),Ba.applyMatrix4(n),e.ray.intersectsSphere(Ba)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hr),V0.multiplyMatrices(n,Hr),Oa.matrixWorld=V0,Oa.raycast(e,Rl);for(let a=0,o=Rl.length;a<o;a++){let c=Rl[a];c.instanceId=r,c.object=this,t.push(c)}Rl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Zt(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new na(new Float32Array(s*this.count),s,this.count,Sc,si));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},js=new Gn,yx=new me(.5,.5),Cl=new N,As=class{constructor(e=new yi,t=new yi,n=new yi,s=new yi,r=new yi,a=new yi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ci,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],f=r[6],h=r[7],p=r[8],x=r[9],g=r[10],m=r[11],v=r[12],_=r[13],y=r[14],E=r[15];if(s[0].setComponents(l-a,h-u,m-p,E-v).normalize(),s[1].setComponents(l+a,h+u,m+p,E+v).normalize(),s[2].setComponents(l+o,h+d,m+x,E+_).normalize(),s[3].setComponents(l-o,h-d,m-x,E-_).normalize(),n)s[4].setComponents(c,f,g,y).normalize(),s[5].setComponents(l-c,h-f,m-g,E-y).normalize();else if(s[4].setComponents(l-c,h-f,m-g,E-y).normalize(),t===ci)s[5].setComponents(l+c,h+f,m+g,E+y).normalize();else if(t===Zr)s[5].setComponents(c,f,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),js.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),js.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(js)}intersectsSprite(e){js.center.set(0,0,0);let t=yx.distanceTo(e.center);return js.radius=.7071067811865476+t,js.applyMatrix4(e.matrixWorld),this.intersectsSphere(js)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Cl.x=s.normal.x>0?e.max.x:e.min.x,Cl.y=s.normal.y>0?e.max.y:e.min.y,Cl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Cl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},X0=new Ge,$l=class i{constructor(){this.coordinateSystem=ci,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];X0.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new As),n[s].setFromProjectionMatrix(X0,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new As),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var ia=class extends Fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Jl=new N,jl=new N,q0=new Ge,ka=new sr,Pl=new Gn,fu=new N,Y0=new N,or=class extends At{constructor(e=new _t,t=new ia){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Jl.fromBufferAttribute(t,s-1),jl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Jl.distanceTo(jl);e.setAttribute("lineDistance",new Ve(n,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pl.copy(n.boundingSphere),Pl.applyMatrix4(s),Pl.radius+=r,e.ray.intersectsSphere(Pl)===!1)return;q0.copy(s).invert(),ka.copy(e.ray).applyMatrix4(q0);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let h=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=h,g=p-1;x<g;x+=l){let m=u.getX(x),v=u.getX(x+1),_=Il(this,e,ka,c,m,v,x);_&&t.push(_)}if(this.isLineLoop){let x=u.getX(p-1),g=u.getX(h),m=Il(this,e,ka,c,x,g,p-1);m&&t.push(m)}}else{let h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let x=h,g=p-1;x<g;x+=l){let m=Il(this,e,ka,c,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=Il(this,e,ka,c,p-1,h,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Il(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Jl.fromBufferAttribute(o,s),jl.fromBufferAttribute(o,r),t.distanceSqToSegment(Jl,jl,fu,Y0)>n)return;fu.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(fu);if(!(l<e.near||l>e.far))return{distance:l,point:Y0.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Z0=new N,K0=new N,eo=class extends or{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Z0.fromBufferAttribute(t,s),K0.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Z0.distanceTo(K0);e.setAttribute("lineDistance",new Ve(n,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},to=class extends or{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},sa=class extends Fn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$0=new Ge,Su=new sr,Ll=new Gn,Nl=new N,no=class extends At{constructor(e=new _t,t=new sa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ll.copy(n.boundingSphere),Ll.applyMatrix4(s),Ll.radius+=r,e.ray.intersectsSphere(Ll)===!1)return;$0.copy(s).invert(),Su.copy(e.ray).applyMatrix4($0);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),h=Math.min(l.count,a.start+a.count);for(let p=f,x=h;p<x;p++){let g=l.getX(p);Nl.fromBufferAttribute(d,g),J0(Nl,g,c,s,e,t,this)}}else{let f=Math.max(0,a.start),h=Math.min(d.count,a.start+a.count);for(let p=f,x=h;p<x;p++)Nl.fromBufferAttribute(d,p),J0(Nl,p,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function J0(i,e,t,n,s,r,a){let o=Su.distanceSqToPoint(i);if(o<t){let c=new N;Su.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var io=class extends dn{constructor(e=[],t=gr,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},On=class extends dn{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ts=class extends dn{constructor(e,t,n=Si,s,r,a,o=en,c=en,l,u=es,d=1){if(u!==es&&u!==us)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},so=class extends ts{constructor(e,t=Si,n=gr,s,r,a=en,o=en,c,l=es){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ro=class extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Bn=class i extends _t{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],d=[],f=0,h=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(d,2));function p(x,g,m,v,_,y,E,b,M,S,L){let C=y/M,A=E/S,D=y/2,B=E/2,P=b/2,V=M+1,Z=S+1,X=0,se=0,W=new N;for(let U=0;U<Z;U++){let R=U*A-B;for(let O=0;O<V;O++){let he=O*C-D;W[x]=he*v,W[g]=R*_,W[m]=P,l.push(W.x,W.y,W.z),W[x]=0,W[g]=0,W[m]=b>0?1:-1,u.push(W.x,W.y,W.z),d.push(O/M),d.push(1-U/S),X+=1}}for(let U=0;U<S;U++)for(let R=0;R<M;R++){let O=f+R+V*U,he=f+R+V*(U+1),G=f+(R+1)+V*(U+1),ee=f+(R+1)+V*U;c.push(O,he,ee),c.push(he,G,ee),se+=6}o.addGroup(h,se,L),h+=se,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ao=class i extends _t{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new N,u=new me;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let h=n+d/t*s;l.x=e*Math.cos(h),l.y=e*Math.sin(h),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},sn=class i extends _t{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],f=[],h=[],p=0,x=[],g=n/2,m=0;v(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Ve(d,3)),this.setAttribute("normal",new Ve(f,3)),this.setAttribute("uv",new Ve(h,2));function v(){let y=new N,E=new N,b=0,M=(t-e)/n;for(let S=0;S<=r;S++){let L=[],C=S/r,A=C*(t-e)+e;for(let D=0;D<=s;D++){let B=D/s,P=B*c+o,V=Math.sin(P),Z=Math.cos(P);E.x=A*V,E.y=-C*n+g,E.z=A*Z,d.push(E.x,E.y,E.z),y.set(V,M,Z).normalize(),f.push(y.x,y.y,y.z),h.push(B,1-C),L.push(p++)}x.push(L)}for(let S=0;S<s;S++)for(let L=0;L<r;L++){let C=x[L][S],A=x[L+1][S],D=x[L+1][S+1],B=x[L][S+1];(e>0||L!==0)&&(u.push(C,A,B),b+=3),(t>0||L!==r-1)&&(u.push(A,D,B),b+=3)}l.addGroup(m,b,0),m+=b}function _(y){let E=p,b=new me,M=new N,S=0,L=y===!0?e:t,C=y===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,g*C,0),f.push(0,C,0),h.push(.5,.5),p++;let A=p;for(let D=0;D<=s;D++){let P=D/s*c+o,V=Math.cos(P),Z=Math.sin(P);M.x=L*Z,M.y=g*C,M.z=L*V,d.push(M.x,M.y,M.z),f.push(0,C,0),b.x=V*.5+.5,b.y=Z*.5*C+.5,h.push(b.x,b.y),p++}for(let D=0;D<s;D++){let B=E+D,P=A+D;y===!0?u.push(P,P+1,B):u.push(P+1,P,B),S+=3}l.addGroup(m,S,y===!0?1:2),m+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ns=class i extends sn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ra=class i extends _t{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new Ve(r,3)),this.setAttribute("normal",new Ve(r.slice(),3)),this.setAttribute("uv",new Ve(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let _=new N,y=new N,E=new N;for(let b=0;b<t.length;b+=3)h(t[b+0],_),h(t[b+1],y),h(t[b+2],E),c(_,y,E,v)}function c(v,_,y,E){let b=E+1,M=[];for(let S=0;S<=b;S++){M[S]=[];let L=v.clone().lerp(y,S/b),C=_.clone().lerp(y,S/b),A=b-S;for(let D=0;D<=A;D++)D===0&&S===b?M[S][D]=L:M[S][D]=L.clone().lerp(C,D/A)}for(let S=0;S<b;S++)for(let L=0;L<2*(b-S)-1;L++){let C=Math.floor(L/2);L%2===0?(f(M[S][C+1]),f(M[S+1][C]),f(M[S][C])):(f(M[S][C+1]),f(M[S+1][C+1]),f(M[S+1][C]))}}function l(v){let _=new N;for(let y=0;y<r.length;y+=3)_.x=r[y+0],_.y=r[y+1],_.z=r[y+2],_.normalize().multiplyScalar(v),r[y+0]=_.x,r[y+1]=_.y,r[y+2]=_.z}function u(){let v=new N;for(let _=0;_<r.length;_+=3){v.x=r[_+0],v.y=r[_+1],v.z=r[_+2];let y=g(v)/2/Math.PI+.5,E=m(v)/Math.PI+.5;a.push(y,1-E)}p(),d()}function d(){for(let v=0;v<a.length;v+=6){let _=a[v+0],y=a[v+2],E=a[v+4],b=Math.max(_,y,E),M=Math.min(_,y,E);b>.9&&M<.1&&(_<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),E<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function h(v,_){let y=v*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function p(){let v=new N,_=new N,y=new N,E=new N,b=new me,M=new me,S=new me;for(let L=0,C=0;L<r.length;L+=9,C+=6){v.set(r[L+0],r[L+1],r[L+2]),_.set(r[L+3],r[L+4],r[L+5]),y.set(r[L+6],r[L+7],r[L+8]),b.set(a[C+0],a[C+1]),M.set(a[C+2],a[C+3]),S.set(a[C+4],a[C+5]),E.copy(v).add(_).add(y).divideScalar(3);let A=g(E);x(b,C+0,v,A),x(M,C+2,_,A),x(S,C+4,y,A)}}function x(v,_,y,E){E<0&&v.x===1&&(a[_]=v.x-1),y.x===0&&y.z===0&&(a[_]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},oo=class i extends ra{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var ti=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let u=n[s],f=n[s+1]-u,h=(a-u)/f;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new me:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new N,s=[],r=[],a=[],o=new N,c=new Ge;for(let h=0;h<=e;h++){let p=h/e;s[h]=this.getTangentAt(p,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ht(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(o,p))}a[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(ht(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],h*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},aa=class extends ti{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new me){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,h=l-this.aY;c=f*u-h*d+this.aX,l=f*d+h*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ql=class extends aa{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function lf(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,d){let f=(a-r)/l-(o-r)/(l+u)+(o-a)/u,h=(o-a)/u-(c-a)/(u+d)+(c-o)/d;f*=u,h*=u,s(a,o,f,h)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var j0=new N,Q0=new N,du=new lf,pu=new lf,mu=new lf,is=class extends ti{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(Q0.subVectors(s[0],s[1]).add(s[0]),l=Q0);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(j0.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=j0),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(d),h),x=Math.pow(d.distanceToSquared(f),h),g=Math.pow(f.distanceToSquared(u),h);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),du.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,p,x,g),pu.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,p,x,g),mu.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,p,x,g)}else this.curveType==="catmullrom"&&(du.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),pu.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),mu.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return n.set(du.calc(c),pu.calc(c),mu.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ep(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function Mx(i,e){let t=1-i;return t*t*e}function bx(i,e){return 2*(1-i)*i*e}function Sx(i,e){return i*i*e}function Wa(i,e,t,n){return Mx(i,e)+bx(i,t)+Sx(i,n)}function Ex(i,e){let t=1-i;return t*t*t*e}function wx(i,e){let t=1-i;return 3*t*t*i*e}function Tx(i,e){return 3*(1-i)*i*i*e}function Ax(i,e){return i*i*i*e}function Xa(i,e,t,n,s){return Ex(i,e)+wx(i,t)+Tx(i,n)+Ax(i,s)}var lo=class extends ti{constructor(e=new me,t=new me,n=new me,s=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new me){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Xa(e,s.x,r.x,a.x,o.x),Xa(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ec=class extends ti{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Xa(e,s.x,r.x,a.x,o.x),Xa(e,s.y,r.y,a.y,o.y),Xa(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},co=class extends ti{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},tc=class extends ti{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ho=class extends ti{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Wa(e,s.x,r.x,a.x),Wa(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},uo=class extends ti{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Wa(e,s.x,r.x,a.x),Wa(e,s.y,r.y,a.y),Wa(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fo=class extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(ep(o,c.x,l.x,u.x,d.x),ep(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new me().fromArray(s))}return this}},nc=Object.freeze({__proto__:null,ArcCurve:Ql,CatmullRomCurve3:is,CubicBezierCurve:lo,CubicBezierCurve3:ec,EllipseCurve:aa,LineCurve:co,LineCurve3:tc,QuadraticBezierCurve:ho,QuadraticBezierCurve3:uo,SplineCurve:fo}),ic=class extends ti{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new nc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new nc[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},lr=class extends ic{constructor(e){super(),this.type="Path",this.currentPoint=new me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new co(this.currentPoint.clone(),new me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new ho(this.currentPoint.clone(),new me(e,t),new me(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new lo(this.currentPoint.clone(),new me(e,t),new me(n,s),new me(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new fo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new aa(e,t,n,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},oa=class extends lr{constructor(e){super(e),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new lr().fromJSON(s))}return this}};function Rx(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Jp(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Nx(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let u=o,d=c;for(let f=t;f<s;f+=t){let h=i[f],p=i[f+1];h<o&&(o=h),p<c&&(c=p),h>u&&(u=h),p>d&&(d=p)}l=Math.max(u-o,d-c),l=l!==0?32767/l:0}return po(r,a,t,o,c,l,0),a}function Jp(i,e,t,n,s){let r;if(s===Wx(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=tp(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=tp(a/n|0,i[a],i[a+1],r);return r&&la(r,r.next)&&(go(r),r=r.next),r}function cr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(la(t,t.next)||Jt(t.prev,t,t.next)===0)){if(go(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function po(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Bx(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Px(i,n,s,r):Cx(i)){e.push(c.i,i.i,l.i),go(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Ix(cr(i),e),po(i,e,t,n,s,r,2)):a===2&&Lx(i,e,t,n,s,r):po(cr(i),e,t,n,s,r,1);break}}}function Cx(i){let e=i.prev,t=i,n=i.next;if(Jt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),d=Math.min(o,c,l),f=Math.max(s,r,a),h=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=d&&p.y<=h&&za(s,o,r,c,a,l,p.x,p.y)&&Jt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Px(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Jt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,u=s.y,d=r.y,f=a.y,h=Math.min(o,c,l),p=Math.min(u,d,f),x=Math.max(o,c,l),g=Math.max(u,d,f),m=Eu(h,p,e,t,n),v=Eu(x,g,e,t,n),_=i.prevZ,y=i.nextZ;for(;_&&_.z>=m&&y&&y.z<=v;){if(_.x>=h&&_.x<=x&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&za(o,u,c,d,l,f,_.x,_.y)&&Jt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=h&&y.x<=x&&y.y>=p&&y.y<=g&&y!==s&&y!==a&&za(o,u,c,d,l,f,y.x,y.y)&&Jt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=m;){if(_.x>=h&&_.x<=x&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&za(o,u,c,d,l,f,_.x,_.y)&&Jt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=v;){if(y.x>=h&&y.x<=x&&y.y>=p&&y.y<=g&&y!==s&&y!==a&&za(o,u,c,d,l,f,y.x,y.y)&&Jt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Ix(i,e){let t=i;do{let n=t.prev,s=t.next.next;!la(n,s)&&Qp(n,t,t.next,s)&&mo(n,s)&&mo(s,n)&&(e.push(n.i,t.i,s.i),go(t),go(t.next),t=i=s),t=t.next}while(t!==i);return cr(t)}function Lx(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Hx(a,o)){let c=em(a,o);a=cr(a,a.next),c=cr(c,c.next),po(a,e,t,n,s,r,0),po(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Nx(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Jp(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(zx(l))}s.sort(Dx);for(let r=0;r<s.length;r++)t=Ux(s[r],t);return t}function Dx(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Ux(i,e){let t=Fx(i,e);if(!t)return e;let n=em(t,i);return cr(n,n.next),cr(t,t.next)}function Fx(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(la(i,t))return t;do{if(la(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&jp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);mo(t,i)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&Ox(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function Ox(i,e){return Jt(i.prev,i,e.prev)<0&&Jt(e.next,i,i.next)<0}function Bx(i,e,t,n){let s=i;do s.z===0&&(s.z=Eu(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,kx(s)}function kx(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Eu(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function zx(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function jp(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function za(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&jp(i,e,t,n,s,r,a,o)}function Hx(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Gx(i,e)&&(mo(i,e)&&mo(e,i)&&Vx(i,e)&&(Jt(i.prev,i,e.prev)||Jt(i,e.prev,e))||la(i,e)&&Jt(i.prev,i,i.next)>0&&Jt(e.prev,e,e.next)>0)}function Jt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function la(i,e){return i.x===e.x&&i.y===e.y}function Qp(i,e,t,n){let s=Ul(Jt(i,e,t)),r=Ul(Jt(i,e,n)),a=Ul(Jt(t,n,i)),o=Ul(Jt(t,n,e));return!!(s!==r&&a!==o||s===0&&Dl(i,t,e)||r===0&&Dl(i,n,e)||a===0&&Dl(t,i,n)||o===0&&Dl(t,e,n))}function Dl(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ul(i){return i>0?1:i<0?-1:0}function Gx(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Qp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function mo(i,e){return Jt(i.prev,i,i.next)<0?Jt(i,e,i.next)>=0&&Jt(i,i.prev,e)>=0:Jt(i,e,i.prev)<0||Jt(i,i.next,e)<0}function Vx(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function em(i,e){let t=wu(i.i,i.x,i.y),n=wu(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function tp(i,e,t,n){let s=wu(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function go(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function wu(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Wx(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Tu=class{static triangulate(e,t,n=2){return Rx(e,t,n)}},Qs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];np(e),ip(n,e);let a=e.length;t.forEach(np);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,ip(n,t[c]);let o=Tu.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function np(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ip(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var xo=class i extends _t{constructor(e=new oa([new me(.5,.5),new me(-.5,.5),new me(-.5,-.5),new me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new Ve(s,3)),this.setAttribute("uv",new Ve(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:h-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Xx,_,y=!1,E,b,M,S;if(m){_=m.getSpacedPoints(u),y=!0,f=!1;let oe=m.isCatmullRomCurve3?m.closed:!1;E=m.computeFrenetFrames(u,oe),b=new N,M=new N,S=new N}f||(g=0,h=0,p=0,x=0);let L=o.extractPoints(l),C=L.shape,A=L.holes;if(!Qs.isClockWise(C)){C=C.reverse();for(let oe=0,ge=A.length;oe<ge;oe++){let ye=A[oe];Qs.isClockWise(ye)&&(A[oe]=ye.reverse())}}function B(oe){let ye=10000000000000001e-36,Ie=oe[0];for(let Se=1;Se<=oe.length;Se++){let je=Se%oe.length,Ue=oe[je],st=Ue.x-Ie.x,ct=Ue.y-Ie.y,yt=st*st+ct*ct,z=Math.max(Math.abs(Ue.x),Math.abs(Ue.y),Math.abs(Ie.x),Math.abs(Ie.y)),Qt=ye*z*z;if(yt<=Qt){oe.splice(je,1),Se--;continue}Ie=Ue}}B(C),A.forEach(B);let P=A.length,V=C;for(let oe=0;oe<P;oe++){let ge=A[oe];C=C.concat(ge)}function Z(oe,ge,ye){return ge||Qe("ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(ge,ye)}let X=C.length;function se(oe,ge,ye){let Ie,Se,je,Ue=oe.x-ge.x,st=oe.y-ge.y,ct=ye.x-oe.x,yt=ye.y-oe.y,z=Ue*Ue+st*st,Qt=Ue*yt-st*ct;if(Math.abs(Qt)>Number.EPSILON){let ft=Math.sqrt(z),wt=Math.sqrt(ct*ct+yt*yt),Ee=ge.x-st/ft,Vt=ge.y+Ue/ft,Xe=ye.x-yt/wt,Je=ye.y+ct/wt,I=((Xe-Ee)*yt-(Je-Vt)*ct)/(Ue*yt-st*ct);Ie=Ee+Ue*I-oe.x,Se=Vt+st*I-oe.y;let w=Ie*Ie+Se*Se;if(w<=2)return new me(Ie,Se);je=Math.sqrt(w/2)}else{let ft=!1;Ue>Number.EPSILON?ct>Number.EPSILON&&(ft=!0):Ue<-Number.EPSILON?ct<-Number.EPSILON&&(ft=!0):Math.sign(st)===Math.sign(yt)&&(ft=!0),ft?(Ie=-st,Se=Ue,je=Math.sqrt(z)):(Ie=Ue,Se=st,je=Math.sqrt(z/2))}return new me(Ie/je,Se/je)}let W=[];for(let oe=0,ge=V.length,ye=ge-1,Ie=oe+1;oe<ge;oe++,ye++,Ie++)ye===ge&&(ye=0),Ie===ge&&(Ie=0),W[oe]=se(V[oe],V[ye],V[Ie]);let U=[],R,O=W.concat();for(let oe=0,ge=P;oe<ge;oe++){let ye=A[oe];R=[];for(let Ie=0,Se=ye.length,je=Se-1,Ue=Ie+1;Ie<Se;Ie++,je++,Ue++)je===Se&&(je=0),Ue===Se&&(Ue=0),R[Ie]=se(ye[Ie],ye[je],ye[Ue]);U.push(R),O=O.concat(R)}let he;if(g===0)he=Qs.triangulateShape(V,A);else{let oe=[],ge=[];for(let ye=0;ye<g;ye++){let Ie=ye/g,Se=h*Math.cos(Ie*Math.PI/2),je=p*Math.sin(Ie*Math.PI/2)+x;for(let Ue=0,st=V.length;Ue<st;Ue++){let ct=Z(V[Ue],W[Ue],je);fe(ct.x,ct.y,-Se),Ie===0&&oe.push(ct)}for(let Ue=0,st=P;Ue<st;Ue++){let ct=A[Ue];R=U[Ue];let yt=[];for(let z=0,Qt=ct.length;z<Qt;z++){let ft=Z(ct[z],R[z],je);fe(ft.x,ft.y,-Se),Ie===0&&yt.push(ft)}Ie===0&&ge.push(yt)}}he=Qs.triangulateShape(oe,ge)}let G=he.length,ee=p+x;for(let oe=0;oe<X;oe++){let ge=f?Z(C[oe],O[oe],ee):C[oe];y?(M.copy(E.normals[0]).multiplyScalar(ge.x),b.copy(E.binormals[0]).multiplyScalar(ge.y),S.copy(_[0]).add(M).add(b),fe(S.x,S.y,S.z)):fe(ge.x,ge.y,0)}for(let oe=1;oe<=u;oe++)for(let ge=0;ge<X;ge++){let ye=f?Z(C[ge],O[ge],ee):C[ge];y?(M.copy(E.normals[oe]).multiplyScalar(ye.x),b.copy(E.binormals[oe]).multiplyScalar(ye.y),S.copy(_[oe]).add(M).add(b),fe(S.x,S.y,S.z)):fe(ye.x,ye.y,d/u*oe)}for(let oe=g-1;oe>=0;oe--){let ge=oe/g,ye=h*Math.cos(ge*Math.PI/2),Ie=p*Math.sin(ge*Math.PI/2)+x;for(let Se=0,je=V.length;Se<je;Se++){let Ue=Z(V[Se],W[Se],Ie);fe(Ue.x,Ue.y,d+ye)}for(let Se=0,je=A.length;Se<je;Se++){let Ue=A[Se];R=U[Se];for(let st=0,ct=Ue.length;st<ct;st++){let yt=Z(Ue[st],R[st],Ie);y?fe(yt.x,yt.y+_[u-1].y,_[u-1].x+ye):fe(yt.x,yt.y,d+ye)}}}H(),q();function H(){let oe=s.length/3;if(f){let ge=0,ye=X*ge;for(let Ie=0;Ie<G;Ie++){let Se=he[Ie];tt(Se[2]+ye,Se[1]+ye,Se[0]+ye)}ge=u+g*2,ye=X*ge;for(let Ie=0;Ie<G;Ie++){let Se=he[Ie];tt(Se[0]+ye,Se[1]+ye,Se[2]+ye)}}else{for(let ge=0;ge<G;ge++){let ye=he[ge];tt(ye[2],ye[1],ye[0])}for(let ge=0;ge<G;ge++){let ye=he[ge];tt(ye[0]+X*u,ye[1]+X*u,ye[2]+X*u)}}n.addGroup(oe,s.length/3-oe,0)}function q(){let oe=s.length/3,ge=0;Q(V,ge),ge+=V.length;for(let ye=0,Ie=A.length;ye<Ie;ye++){let Se=A[ye];Q(Se,ge),ge+=Se.length}n.addGroup(oe,s.length/3-oe,1)}function Q(oe,ge){let ye=oe.length;for(;--ye>=0;){let Ie=ye,Se=ye-1;Se<0&&(Se=oe.length-1);for(let je=0,Ue=u+g*2;je<Ue;je++){let st=X*je,ct=X*(je+1),yt=ge+Ie+st,z=ge+Se+st,Qt=ge+Se+ct,ft=ge+Ie+ct;Be(yt,z,Qt,ft)}}}function fe(oe,ge,ye){c.push(oe),c.push(ge),c.push(ye)}function tt(oe,ge,ye){$e(oe),$e(ge),$e(ye);let Ie=s.length/3,Se=v.generateTopUV(n,s,Ie-3,Ie-2,Ie-1);nt(Se[0]),nt(Se[1]),nt(Se[2])}function Be(oe,ge,ye,Ie){$e(oe),$e(ge),$e(Ie),$e(ge),$e(ye),$e(Ie);let Se=s.length/3,je=v.generateSideWallUV(n,s,Se-6,Se-3,Se-2,Se-1);nt(je[0]),nt(je[1]),nt(je[3]),nt(je[1]),nt(je[2]),nt(je[3])}function $e(oe){s.push(c[oe*3+0]),s.push(c[oe*3+1]),s.push(c[oe*3+2])}function nt(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return qx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new nc[s.type]().fromJSON(s)),new i(n,e.options)}},Xx={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new me(r,a),new me(o,c),new me(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],d=e[n*3+2],f=e[s*3],h=e[s*3+1],p=e[s*3+2],x=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new me(a,1-c),new me(l,1-d),new me(f,1-p),new me(x,1-m)]:[new me(o,1-c),new me(u,1-d),new me(h,1-p),new me(g,1-m)]}};function qx(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ss=class i extends ra{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},vo=class i extends _t{constructor(e=[new me(0,-.5),new me(.5,0),new me(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=ht(s,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],u=1/t,d=new N,f=new me,h=new N,p=new N,x=new N,g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,h.x=m*1,h.y=-g,h.z=m*0,x.copy(h),h.normalize(),c.push(h.x,h.y,h.z);break;case e.length-1:x.normalize(),c.push(x.x,x.y,x.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,h.x=m*1,h.y=-g,h.z=m*0,p.copy(h),h.x+=x.x,h.y+=x.y,h.z+=x.z,h.normalize(),c.push(h.x,h.y,h.z),x.copy(p)}for(let v=0;v<=t;v++){let _=n+v*u*s,y=Math.sin(_),E=Math.cos(_);for(let b=0;b<=e.length-1;b++){d.x=e[b].x*y,d.y=e[b].y,d.z=e[b].x*E,a.push(d.x,d.y,d.z),f.x=v/t,f.y=b/(e.length-1),o.push(f.x,f.y);let M=c[3*b+0]*y,S=c[3*b+1],L=c[3*b+0]*E;l.push(M,S,L)}}for(let v=0;v<t;v++)for(let _=0;_<e.length-1;_++){let y=_+v*e.length,E=y,b=y+e.length,M=y+e.length+1,S=y+1;r.push(E,b,S),r.push(M,S,b)}this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("uv",new Ve(o,2)),this.setAttribute("normal",new Ve(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Di=class i extends ra{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ut=class i extends _t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,d=e/o,f=t/c,h=[],p=[],x=[],g=[];for(let m=0;m<u;m++){let v=m*f-a;for(let _=0;_<l;_++){let y=_*d-r;p.push(y,-v,0),x.push(0,0,1),g.push(_/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<o;v++){let _=v+l*m,y=v+l*(m+1),E=v+1+l*(m+1),b=v+1+l*m;h.push(_,y,b),h.push(y,E,b)}this.setIndex(h),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(x,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Rs=class i extends _t{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],u=[],d=e,f=(t-e)/s,h=new N,p=new me;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let m=r+g/n*a;h.x=d*Math.cos(m),h.y=d*Math.sin(m),c.push(h.x,h.y,h.z),l.push(0,0,1),p.x=(h.x/t+1)/2,p.y=(h.y/t+1)/2,u.push(p.x,p.y)}d+=f}for(let x=0;x<s;x++){let g=x*(n+1);for(let m=0;m<n;m++){let v=m+g,_=v,y=v+n+1,E=v+n+2,b=v+1;o.push(_,y,b),o.push(y,E,b)}}this.setIndex(o),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var ni=class i extends _t{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],d=new N,f=new N,h=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let v=[],_=m/n,y=a+_*o,E=e*Math.cos(y),b=Math.sqrt(e*e-E*E),M=0;m===0&&a===0?M=.5/t:m===n&&c===Math.PI&&(M=-.5/t);for(let S=0;S<=t;S++){let L=S/t,C=s+L*r;d.x=-b*Math.cos(C),d.y=E,d.z=b*Math.sin(C),p.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),g.push(L+M,1-_),v.push(l++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){let _=u[m][v+1],y=u[m][v],E=u[m+1][v],b=u[m+1][v+1];(m!==0||a>0)&&h.push(_,y,b),(m!==n-1||c<Math.PI)&&h.push(y,E,b)}this.setIndex(h),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(x,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ii=class i extends _t{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],u=[],d=[],f=new N,h=new N,p=new N;for(let x=0;x<=n;x++){let g=a+x/n*o;for(let m=0;m<=s;m++){let v=m/s*r;h.x=(e+t*Math.cos(g))*Math.cos(v),h.y=(e+t*Math.cos(g))*Math.sin(v),h.z=t*Math.sin(g),l.push(h.x,h.y,h.z),f.x=e*Math.cos(v),f.y=e*Math.sin(v),p.subVectors(h,f).normalize(),u.push(p.x,p.y,p.z),d.push(m/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=s;g++){let m=(s+1)*x+g-1,v=(s+1)*(x-1)+g-1,_=(s+1)*(x-1)+g,y=(s+1)*x+g;c.push(m,v,y),c.push(v,_,y)}this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var hr=class i extends _t{constructor(e=new uo(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new N,c=new N,l=new me,u=new N,d=[],f=[],h=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Ve(d,3)),this.setAttribute("normal",new Ve(f,3)),this.setAttribute("uv",new Ve(h,2));function x(){for(let _=0;_<t;_++)g(_);g(r===!1?t:0),v(),m()}function g(_){u=e.getPointAt(_/t,u);let y=a.normals[_],E=a.binormals[_];for(let b=0;b<=s;b++){let M=b/s*Math.PI*2,S=Math.sin(M),L=-Math.cos(M);c.x=L*y.x+S*E.x,c.y=L*y.y+S*E.y,c.z=L*y.z+S*E.z,c.normalize(),f.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,d.push(o.x,o.y,o.z)}}function m(){for(let _=1;_<=t;_++)for(let y=1;y<=s;y++){let E=(s+1)*(_-1)+(y-1),b=(s+1)*_+(y-1),M=(s+1)*_+y,S=(s+1)*(_-1)+y;p.push(E,b,S),p.push(b,M,S)}}function v(){for(let _=0;_<=t;_++)for(let y=0;y<=s;y++)l.x=_/t,l.y=y/s,h.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new nc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function _r(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(sp(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(sp(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function In(i){let e={};for(let t=0;t<i.length;t++){let n=_r(i[t]);for(let s in n)e[s]=n[s]}return e}function sp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Yx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function cf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}var tm={clone:_r,merge:In},Zx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Lt=class extends Fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zx,this.fragmentShader=Kx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=Yx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new _e().setHex(s.value);break;case"v2":this.uniforms[n].value=new me().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new gt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new et().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ge().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},sc=class extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Vn=class extends Fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Do,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},kn=class extends Vn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new me(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new _e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new _e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new _e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return er('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){er('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Kt=class extends Fn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new _e(16777215),this.specular=new _e(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Do,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=gc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var rc=class extends Fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ac=class extends Fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Es(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ha(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function $x(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function rp(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Jx(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var Ui=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},oc=class extends Ui{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yu,endingEnd:yu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Mu:r=e,o=2*t-n;break;case bu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Mu:a=e,c=2*n-t;break;case bu:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,p=(n-t)/(s-t),x=p*p,g=x*p,m=-f*g+2*f*x-f*p,v=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*p+1,_=(-1-h)*g+(1.5+h)*x+.5*p,y=h*g-h*x;for(let E=0;E!==o;++E)r[E]=m*a[u+E]+v*a[l+E]+_*a[c+E]+y*a[d+E];return r}},lc=class extends Ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),d=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*d+a[c+f]*u;return r}},cc=class extends Ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},hc=class extends Ui{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let p=(n-t)/(s-t),x=1-p;for(let g=0;g!==o;++g)r[g]=a[l+g]*x+a[c+g]*p;return r}let f=o*2,h=e-1;for(let p=0;p!==o;++p){let x=a[l+p],g=a[c+p],m=h*f+p*2,v=d[m],_=d[m+1],y=e*f+p*2,E=u[y],b=u[y+1],M=Qx(n,t,v,E,s);r[p]=nm(M,x,_,b,g)}return r}};function nm(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function jx(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Qx(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=nm(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=jx(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Wn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Es(t,this.TimeBufferType),this.values=Es(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Es(e.times,Array),values:Es(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ha(e.settings)&&(n.settings={inTangents:Es(e.settings.inTangents,Array),outTangents:Es(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new cc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new lc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new oc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new hc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case tr:t=this.InterpolantFactoryMethodDiscrete;break;case nr:t=this.InterpolantFactoryMethodLinear;break;case Bl:t=this.InterpolantFactoryMethodSmooth;break;case _u:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return nr;case this.InterpolantFactoryMethodSmooth:return Bl;case this.InterpolantFactoryMethodBezier:return _u}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Ha(this.settings)&&(ap(this.settings.inTangents,e),ap(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ha(this.settings)&&(op(this.settings.inTangents,e),op(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Qe("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Qe("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&B1(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Qe("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Bl,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,f=d-n,h=d+n;for(let p=0;p!==n;++p){let x=t[d+p];if(x!==t[f+p]||x!==t[h+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,f=a*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ha(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function ap(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function op(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Wn.prototype.ValueTypeName="";Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=nr;var rs=class extends Wn{constructor(e,t,n){super(e,t,n)}};rs.prototype.ValueTypeName="bool";rs.prototype.ValueBufferType=Array;rs.prototype.DefaultInterpolation=tr;rs.prototype.InterpolantFactoryMethodLinear=void 0;rs.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}};_o.prototype.ValueTypeName="color";var as=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}};as.prototype.ValueTypeName="number";var uc=class extends Ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)nn.slerpFlat(r,0,a,l-o,a,l,c);return r}},os=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new uc(this.times,this.values,this.getValueSize(),e)}};os.prototype.ValueTypeName="quaternion";os.prototype.InterpolantFactoryMethodSmooth=void 0;var ls=class extends Wn{constructor(e,t,n){super(e,t,n)}};ls.prototype.ValueTypeName="string";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=tr;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;var Cs=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}};Cs.prototype.ValueTypeName="vector";var yo=class{constructor(e="",t=-1,n=[],s=Op){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=wi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(tv(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Wn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let u=$x(c);c=rp(c,1,u),l=rp(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new as(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(r);if(u&&u.length>1){let d=u[1],f=s[d];f||(s[d]=f=[]),f.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function ev(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return as;case"vector":case"vector2":case"vector3":case"vector4":return Cs;case"color":return _o;case"quaternion":return os;case"bool":case"boolean":return rs;case"string":return ls}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function tv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=ev(i.type);if(i.times===void 0){let n=[],s=[];Jx(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Ha(i.settings)&&(t.settings={inTangents:Es(i.settings.inTangents,Float32Array),outTangents:Es(i.settings.outTangents,Float32Array)}),t}var Li={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(lp(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!lp(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function lp(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var fc=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let h=l[d],p=l[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},im=new fc,Fi=class{constructor(e){this.manager=e!==void 0?e:im,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Fi.DEFAULT_MATERIAL_NAME="__DEFAULT";var ji={},Au=class extends Error{constructor(e,t){super(e),this.response=t}},ca=class extends Fi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Li.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ji[e]!==void 0){ji[e].push({onLoad:t,onProgress:n,onError:s});return}ji[e]=[],ji[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&He("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=ji[e],d=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),h=f?parseInt(f):0,p=h!==0,x=0,g=new ReadableStream({start(m){v();function v(){d.read().then(({done:_,value:y})=>{if(_)m.close();else{x+=y.byteLength;let E=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:h});for(let b=0,M=u.length;b<M;b++){let S=u[b];S.onProgress&&S.onProgress(E)}m.enqueue(y),v()}},_=>{m.error(_)})}}});return new Response(g)}else throw new Au(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return l.arrayBuffer().then(p=>h.decode(p))}}}).then(l=>{Li.add(`file:${e}`,l);let u=ji[e];delete ji[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onLoad&&h.onLoad(l)}}).catch(l=>{let u=ji[e];if(u===void 0)throw this.manager.itemError(e),l;delete ji[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onError&&h.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Gr=new WeakMap,dc=class extends Fi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Li.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Gr.get(a);d===void 0&&(d=[],Gr.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=Kr("img");function c(){u(),t&&t(this);let d=Gr.get(this)||[];for(let f=0;f<d.length;f++){let h=d[f];h.onLoad&&h.onLoad(this)}Gr.delete(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),Li.remove(`image:${e}`);let f=Gr.get(this)||[];for(let h=0;h<f.length;h++){let p=f[h];p.onError&&p.onError(d)}Gr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Li.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var cs=class extends Fi{constructor(e){super(e)}load(e,t,n,s){let r=new dn,a=new dc(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ur=class extends At{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new _e(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Mo=class extends ur{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new _e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},gu=new Ge,cp=new N,hp=new N,ha=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new As,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;cp.setFromMatrixPosition(e.matrixWorld),t.position.copy(cp),hp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){gu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(gu,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Zr||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(gu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fl=new N,Ol=new nn,Ii=new N,bo=class extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fl,Ol,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fl,Ol,Ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fl,Ol,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fl,Ol,Ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ss=new N,up=new me,fp=new me,fn=class extends bo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ga*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(Ga*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ss.x,Ss.y).multiplyScalar(-e/Ss.z),Ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ss.x,Ss.y).multiplyScalar(-e/Ss.z)}getViewSize(e,t){return this.getViewBounds(e,up,fp),t.subVectors(fp,up)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ga*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ru=class extends ha{constructor(){super(new fn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ir*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},So=class extends ur{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ru}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Cu=class extends ha{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0}},fr=class extends ur{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Cu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},dr=class extends bo{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pu=class extends ha{constructor(){super(new dr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ps=class extends ur{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new Pu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var hs=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Is=class extends _t{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var xu=new WeakMap,Eo=class extends Fi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&He("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&He("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Li.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{xu.has(a)===!0?(s&&s(xu.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Li.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),xu.set(c,l),Li.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Li.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Vr=-90,Wr=1,ua=class extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new fn(Vr,Wr,e,t);s.layers=this.layers,this.add(s);let r=new fn(Vr,Wr,e,t);r.layers=this.layers,this.add(r);let a=new fn(Vr,Wr,e,t);a.layers=this.layers,this.add(a);let o=new fn(Vr,Wr,e,t);o.layers=this.layers,this.add(o);let c=new fn(Vr,Wr,e,t);c.layers=this.layers,this.add(c);let l=new fn(Vr,Wr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===ci)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},pc=class extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var hf="\\[\\]\\.:\\/",nv=new RegExp("["+hf+"]","g"),uf="[^"+hf+"]",iv="[^"+hf.replace("\\.","")+"]",sv=/((?:WC+[\/:])*)/.source.replace("WC",uf),rv=/(WCOD+)?/.source.replace("WCOD",iv),av=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uf),ov=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uf),lv=new RegExp("^"+sv+rv+av+ov+"$"),cv=["material","materials","bones","map"],Iu=class{constructor(e,t,n){let s=n||kt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},kt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(nv,"")}static parseTrackName(e){let t=lv.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);cv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Qe("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};kt.Composite=Iu;kt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};kt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};kt.prototype.GetterByBindingType=[kt.prototype._getValue_direct,kt.prototype._getValue_array,kt.prototype._getValue_arrayElement,kt.prototype._getValue_toArray];kt.prototype.SetterByBindingTypeAndVersioning=[[kt.prototype._setValue_direct,kt.prototype._setValue_direct_setNeedsUpdate,kt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_array,kt.prototype._setValue_array_setNeedsUpdate,kt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_arrayElement,kt.prototype._setValue_arrayElement_setNeedsUpdate,kt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[kt.prototype._setValue_fromArray,kt.prototype._setValue_fromArray_setNeedsUpdate,kt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var NS=new Float32Array(1);var xf=class xf{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};xf.prototype.isMatrix2=!0;var Lu=xf;function ff(i,e,t,n){let s=hv(n);switch(t){case Ku:return i*e;case Sc:return i*e/s.components*s.byteLength;case Ec:return i*e/s.components*s.byteLength;case Ns:return i*e*2/s.components*s.byteLength;case wc:return i*e*2/s.components*s.byteLength;case $u:return i*e*3/s.components*s.byteLength;case ui:return i*e*4/s.components*s.byteLength;case Tc:return i*e*4/s.components*s.byteLength;case Ao:case Ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Co:case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Rc:case Pc:return Math.max(i,16)*Math.max(e,8)/4;case Ac:case Cc:return Math.max(i,8)*Math.max(e,8)/2;case Ic:case Lc:case Dc:case Uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Nc:case Io:case Fc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case kc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case zc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Gc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Vc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Wc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Xc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Yc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Zc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Kc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case $c:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Jc:case jc:case Qc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case eh:case th:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Lo:case nh:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hv(i){switch(i){case qn:case Xu:return{byteLength:1,components:1};case ma:case qu:case Ei:return{byteLength:2,components:1};case Mc:case bc:return{byteLength:2,components:4};case Si:case yc:case si:return{byteLength:4,components:1};case Yu:case Zu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function wm(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function fv(i){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<d.length;h++){let p=d[f],x=d[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,p=d.length;h<p;h++){let x=d[h];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var dv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pv=`#ifdef USE_ALPHAHASH
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
#endif`,mv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_v=`#ifdef USE_AOMAP
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
#endif`,yv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mv=`#ifdef USE_BATCHING
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
#endif`,bv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ev=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tv=`#ifdef USE_IRIDESCENCE
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
#endif`,Av=`#ifdef USE_BUMPMAP
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
#endif`,Rv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Iv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Dv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Uv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Fv=`#define PI 3.141592653589793
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
} // validated`,Ov=`vec3 transformedNormal = objectNormal;
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
#endif`,Bv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wv=`#ifdef USE_ENVMAP
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
#endif`,Xv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,qv=`#ifdef USE_ENVMAP
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
#endif`,Yv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zv=`#ifdef USE_ENVMAP
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
#endif`,Kv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$v=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qv=`#ifdef USE_GRADIENTMAP
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
}`,e_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,t_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,n_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,i_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,s_=`#ifdef USE_ENVMAP
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
#endif`,r_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,a_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,l_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,c_=`PhysicalMaterial material;
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
#endif`,h_=`uniform sampler2D dfgLUT;
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
}`,u_=`
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
#endif`,f_=`#if defined( RE_IndirectDiffuse )
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
#endif`,d_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,p_=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,m_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,g_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,__=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,y_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,b_=`#if defined( USE_POINTS_UV )
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
#endif`,S_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,E_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,T_=`#if defined( USE_MORPHCOLORS )
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
#endif`,A_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R_=`#ifdef USE_MORPHTARGETS
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
#endif`,C_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,P_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,I_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,L_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,U_=`#ifdef USE_NORMALMAP
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
#endif`,F_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,O_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,B_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,z_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,H_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,G_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,V_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,W_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,X_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,q_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Z_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,J_=`float getShadowMask() {
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
}`,j_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Q_=`#ifdef USE_SKINNING
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
#endif`,ey=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ty=`#ifdef USE_SKINNING
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
#endif`,ny=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ry=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ay=`#ifdef USE_TRANSMISSION
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
#endif`,oy=`#ifdef USE_TRANSMISSION
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
#endif`,ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dy=`uniform sampler2D t2D;
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
}`,py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,my=`uniform float backgroundBlurriness;
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
}`,gy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vy=`#include <common>
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
}`,_y=`#if DEPTH_PACKING == 3200
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
}`,yy=`#define DISTANCE
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
}`,My=`#define DISTANCE
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
}`,by=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ey=`uniform float scale;
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
}`,wy=`uniform vec3 diffuse;
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
}`,Ty=`#include <common>
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
}`,Ay=`uniform vec3 diffuse;
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
}`,Ry=`#define LAMBERT
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
}`,Cy=`#define LAMBERT
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
}`,Py=`#define MATCAP
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
}`,Iy=`#define MATCAP
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
}`,Ly=`#define NORMAL
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
}`,Ny=`#define NORMAL
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
}`,Dy=`#define PHONG
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
}`,Uy=`#define PHONG
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
}`,Fy=`#define STANDARD
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
}`,Oy=`#define STANDARD
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
}`,By=`#define TOON
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
}`,ky=`#define TOON
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
}`,zy=`uniform float size;
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
}`,Hy=`uniform vec3 diffuse;
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
}`,Gy=`#include <common>
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
}`,Vy=`uniform vec3 color;
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
}`,Wy=`uniform float rotation;
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
}`,Xy=`uniform vec3 diffuse;
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
}`,ut={alphahash_fragment:dv,alphahash_pars_fragment:pv,alphamap_fragment:mv,alphamap_pars_fragment:gv,alphatest_fragment:xv,alphatest_pars_fragment:vv,aomap_fragment:_v,aomap_pars_fragment:yv,batching_pars_vertex:Mv,batching_vertex:bv,begin_vertex:Sv,beginnormal_vertex:Ev,bsdfs:wv,iridescence_fragment:Tv,bumpmap_pars_fragment:Av,clipping_planes_fragment:Rv,clipping_planes_pars_fragment:Cv,clipping_planes_pars_vertex:Pv,clipping_planes_vertex:Iv,color_fragment:Lv,color_pars_fragment:Nv,color_pars_vertex:Dv,color_vertex:Uv,common:Fv,defaultnormal_vertex:Ov,displacementmap_pars_vertex:Bv,displacementmap_vertex:kv,emissivemap_fragment:zv,emissivemap_pars_fragment:Hv,colorspace_fragment:Gv,colorspace_pars_fragment:Vv,envmap_fragment:Wv,envmap_common_pars_fragment:Xv,envmap_pars_fragment:qv,envmap_pars_vertex:Yv,envmap_physical_pars_fragment:s_,envmap_vertex:Zv,fog_vertex:Kv,fog_pars_vertex:$v,fog_fragment:Jv,fog_pars_fragment:jv,gradientmap_pars_fragment:Qv,lightmap_pars_fragment:e_,lights_lambert_fragment:t_,lights_lambert_pars_fragment:n_,lights_pars_begin:i_,lights_toon_fragment:r_,lights_toon_pars_fragment:a_,lights_phong_fragment:o_,lights_phong_pars_fragment:l_,lights_physical_fragment:c_,lights_physical_pars_fragment:h_,lights_fragment_begin:u_,lights_fragment_maps:f_,lights_fragment_end:d_,lightprobes_pars_fragment:p_,logdepthbuf_fragment:m_,logdepthbuf_pars_fragment:g_,logdepthbuf_pars_vertex:x_,logdepthbuf_vertex:v_,map_fragment:__,map_pars_fragment:y_,map_particle_fragment:M_,map_particle_pars_fragment:b_,metalnessmap_fragment:S_,metalnessmap_pars_fragment:E_,morphinstance_vertex:w_,morphcolor_vertex:T_,morphnormal_vertex:A_,morphtarget_pars_vertex:R_,morphtarget_vertex:C_,normal_fragment_begin:P_,normal_fragment_maps:I_,normal_pars_fragment:L_,normal_pars_vertex:N_,normal_vertex:D_,normalmap_pars_fragment:U_,clearcoat_normal_fragment_begin:F_,clearcoat_normal_fragment_maps:O_,clearcoat_pars_fragment:B_,iridescence_pars_fragment:k_,opaque_fragment:z_,packing:H_,premultiplied_alpha_fragment:G_,project_vertex:V_,dithering_fragment:W_,dithering_pars_fragment:X_,roughnessmap_fragment:q_,roughnessmap_pars_fragment:Y_,shadowmap_pars_fragment:Z_,shadowmap_pars_vertex:K_,shadowmap_vertex:$_,shadowmask_pars_fragment:J_,skinbase_vertex:j_,skinning_pars_vertex:Q_,skinning_vertex:ey,skinnormal_vertex:ty,specularmap_fragment:ny,specularmap_pars_fragment:iy,tonemapping_fragment:sy,tonemapping_pars_fragment:ry,transmission_fragment:ay,transmission_pars_fragment:oy,uv_pars_fragment:ly,uv_pars_vertex:cy,uv_vertex:hy,worldpos_vertex:uy,background_vert:fy,background_frag:dy,backgroundCube_vert:py,backgroundCube_frag:my,cube_vert:gy,cube_frag:xy,depth_vert:vy,depth_frag:_y,distance_vert:yy,distance_frag:My,equirect_vert:by,equirect_frag:Sy,linedashed_vert:Ey,linedashed_frag:wy,meshbasic_vert:Ty,meshbasic_frag:Ay,meshlambert_vert:Ry,meshlambert_frag:Cy,meshmatcap_vert:Py,meshmatcap_frag:Iy,meshnormal_vert:Ly,meshnormal_frag:Ny,meshphong_vert:Dy,meshphong_frag:Uy,meshphysical_vert:Fy,meshphysical_frag:Oy,meshtoon_vert:By,meshtoon_frag:ky,points_vert:zy,points_frag:Hy,shadow_vert:Gy,shadow_frag:Vy,sprite_vert:Wy,sprite_frag:Xy},Pe={common:{diffuse:{value:new _e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new _e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new _e(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},ki={basic:{uniforms:In([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:In([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new _e(0)},envMapIntensity:{value:1}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:In([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new _e(0)},specular:{value:new _e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:In([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new _e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:In([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new _e(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:In([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:In([Pe.points,Pe.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:In([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:In([Pe.common,Pe.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:In([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:In([Pe.sprite,Pe.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distance:{uniforms:In([Pe.common,Pe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distance_vert,fragmentShader:ut.distance_frag},shadow:{uniforms:In([Pe.lights,Pe.fog,{color:{value:new _e(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};ki.physical={uniforms:In([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new et},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new _e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new _e(0)},specularColor:{value:new _e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};var sh={r:0,b:0,g:0},qy=new Ge,Tm=new et;Tm.set(-1,0,0,0,1,0,0,0,1);function Yy(i,e,t,n,s,r){let a=new _e(0),o=s===!0?0:1,c,l,u=null,d=0,f=null;function h(v){let _=v.isScene===!0?v.background:null;if(_&&_.isTexture){let y=v.backgroundBlurriness>0;_=e.get(_,y)}return _}function p(v){let _=!1,y=h(v);y===null?g(a,o):y&&y.isColor&&(g(y,1),_=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(v,_){let y=h(_);y&&y.isCubeTexture?(l===void 0&&(l=new Ze(new Bn(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:_r(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,b,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(qy.makeRotationFromEuler(_.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Tm),l.material.toneMapped=dt.getTransfer(y.colorSpace)!==It,(u!==y||d!==y.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ze(new Ut(2,2),new Lt({name:"BackgroundMaterial",uniforms:_r(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=dt.getTransfer(y.colorSpace)!==It,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,_){v.getRGB(sh,cf(i)),t.buffers.color.setClear(sh.r,sh.g,sh.b,_,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),o=_,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:p,addToRenderList:x,dispose:m}}function Zy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(A,D,B,P,V){let Z=!1,X=d(A,P,B,D);r!==X&&(r=X,l(r.object)),Z=h(A,P,B,V),Z&&p(A,P,B,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,y(A,D,B,P),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function u(A){return i.deleteVertexArray(A)}function d(A,D,B,P){let V=P.wireframe===!0,Z=n[D.id];Z===void 0&&(Z={},n[D.id]=Z);let X=A.isInstancedMesh===!0?A.id:0,se=Z[X];se===void 0&&(se={},Z[X]=se);let W=se[B.id];W===void 0&&(W={},se[B.id]=W);let U=W[V];return U===void 0&&(U=f(c()),W[V]=U),U}function f(A){let D=[],B=[],P=[];for(let V=0;V<t;V++)D[V]=0,B[V]=0,P[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:P,object:A,attributes:{},index:null}}function h(A,D,B,P){let V=r.attributes,Z=D.attributes,X=0,se=B.getAttributes();for(let W in se)if(se[W].location>=0){let R=V[W],O=Z[W];if(O===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(O=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(O=A.instanceColor)),R===void 0||R.attribute!==O||O&&R.data!==O.data)return!0;X++}return r.attributesNum!==X||r.index!==P}function p(A,D,B,P){let V={},Z=D.attributes,X=0,se=B.getAttributes();for(let W in se)if(se[W].location>=0){let R=Z[W];R===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(R=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(R=A.instanceColor));let O={};O.attribute=R,R&&R.data&&(O.data=R.data),V[W]=O,X++}r.attributes=V,r.attributesNum=X,r.index=P}function x(){let A=r.newAttributes;for(let D=0,B=A.length;D<B;D++)A[D]=0}function g(A){m(A,0)}function m(A,D){let B=r.newAttributes,P=r.enabledAttributes,V=r.attributeDivisors;B[A]=1,P[A]===0&&(i.enableVertexAttribArray(A),P[A]=1),V[A]!==D&&(i.vertexAttribDivisor(A,D),V[A]=D)}function v(){let A=r.newAttributes,D=r.enabledAttributes;for(let B=0,P=D.length;B<P;B++)D[B]!==A[B]&&(i.disableVertexAttribArray(B),D[B]=0)}function _(A,D,B,P,V,Z,X){X===!0?i.vertexAttribIPointer(A,D,B,V,Z):i.vertexAttribPointer(A,D,B,P,V,Z)}function y(A,D,B,P){x();let V=P.attributes,Z=B.getAttributes(),X=D.defaultAttributeValues;for(let se in Z){let W=Z[se];if(W.location>=0){let U=V[se];if(U===void 0&&(se==="instanceMatrix"&&A.instanceMatrix&&(U=A.instanceMatrix),se==="instanceColor"&&A.instanceColor&&(U=A.instanceColor)),U!==void 0){let R=U.normalized,O=U.itemSize,he=e.get(U);if(he===void 0)continue;let G=he.buffer,ee=he.type,H=he.bytesPerElement,q=ee===i.INT||ee===i.UNSIGNED_INT||U.gpuType===yc;if(U.isInterleavedBufferAttribute){let Q=U.data,fe=Q.isInterleavedBuffer===!0?Q.stride:Q.itemSize,tt=U.offset;if(Q.isInstancedInterleavedBuffer||Q.isInstancedBufferAttribute){for(let Be=0;Be<W.locationSize;Be++)m(W.location+Be,Q.meshPerAttribute);A.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Be=0;Be<W.locationSize;Be++)g(W.location+Be);i.bindBuffer(i.ARRAY_BUFFER,G);for(let Be=0;Be<W.locationSize;Be++)_(W.location+Be,O/W.locationSize,ee,R,fe*H,(tt+O/W.locationSize*Be)*H,q)}else{if(U.isInstancedBufferAttribute){for(let Q=0;Q<W.locationSize;Q++)m(W.location+Q,U.meshPerAttribute);A.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=U.meshPerAttribute*U.count)}else for(let Q=0;Q<W.locationSize;Q++)g(W.location+Q);i.bindBuffer(i.ARRAY_BUFFER,G);for(let Q=0;Q<W.locationSize;Q++)_(W.location+Q,O/W.locationSize,ee,R,O*H,O/W.locationSize*Q*H,q)}}else if(X!==void 0){let R=X[se];if(R!==void 0)switch(R.length){case 2:i.vertexAttrib2fv(W.location,R);break;case 3:i.vertexAttrib3fv(W.location,R);break;case 4:i.vertexAttrib4fv(W.location,R);break;default:i.vertexAttrib1fv(W.location,R)}}}}v()}function E(){L();for(let A in n){let D=n[A];for(let B in D){let P=D[B];for(let V in P){let Z=P[V];for(let X in Z)u(Z[X].object),delete Z[X];delete P[V]}}delete n[A]}}function b(A){if(n[A.id]===void 0)return;let D=n[A.id];for(let B in D){let P=D[B];for(let V in P){let Z=P[V];for(let X in Z)u(Z[X].object),delete Z[X];delete P[V]}}delete n[A.id]}function M(A){for(let D in n){let B=n[D];for(let P in B){let V=B[P];if(V[A.id]===void 0)continue;let Z=V[A.id];for(let X in Z)u(Z[X].object),delete Z[X];delete V[A.id]}}}function S(A){for(let D in n){let B=n[D],P=A.isInstancedMesh===!0?A.id:0,V=B[P];if(V!==void 0){for(let Z in V){let X=V[Z];for(let se in X)u(X[se].object),delete X[se];delete V[Z]}delete B[P],Object.keys(B).length===0&&delete n[D]}}}function L(){C(),a=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:S,releaseStatesOfProgram:M,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function Ky(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let f=0;for(let h=0;h<u;h++)f+=l[h];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function $y(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let M=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(M){return!(M!==ui&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(M){let S=M===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(M!==qn&&M!==si&&!S&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(M){if(M==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(He("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&He("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:y,maxSamples:E,samples:b}}function Jy(i){let e=this,t=null,n=0,s=!1,r=!1,a=new yi,o=new et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||n!==0||s;return s=f,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?u(null):l();else{let v=r?0:n,_=v*4,y=m.clippingState||null;c.value=y,y=u(p,f,_,h);for(let E=0;E!==_;++E)y[E]=t[E];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,p){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=c.value,p!==!0||g===null){let m=h+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let _=0,y=h;_!==x;++_,y+=4)a.copy(d[_]).applyMatrix4(v,o),a.normal.toArray(g,y),g[y+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var Oo=class extends Qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new io(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Bn(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zn,blending:pr});r.uniforms.tEquirect.value=t;let a=new Ze(s,r),o=t.minFilter;return t.minFilter===Xn&&(t.minFilter=tn),new ua(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},sm=256,jy=3,Qy=20,Am=256,Rm=16,eM=3,tM=new N,nM=new _e,ah=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ua(1,10,null),this._boxMesh=new Ze(new Bn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=tM}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let d=c.autoClear,f=c.autoClearColor,h=c.autoClearDepth,p=c.autoClearStencil,x=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(e.background=c.getClearColor(nM));let g=new ua(n,s,u);return g.position.copy(o),g.update(c,e),c.autoClear=d,c.autoClearColor=f,c.autoClearDepth=h,c.autoClearStencil=p,e.background=x,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=om(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=am(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(sm,rf(e))}_fromTexture(e,t){e.mapping===gr||e.mapping===da?this._setSize(e.image.length===0?sm:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=rm(e,!1,!1),n=Math.log2(e)-jy;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=rm(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===gr||e.mapping===da?(this._cubemapMaterial===null&&(this._cubemapMaterial=om()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=am()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=iM(),this._integrationMaterial=sM());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Rm);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-eM)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(Am*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=rM());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function rm(i,e,t){return new Oo(i,{minFilter:Xn,generateMipmaps:e,type:Ei,colorSpace:Un,depthBuffer:t})}function Bo(i,e,t){return new Lt({name:i,uniforms:e,vertexShader:ut.cube_vert,fragmentShader:t,side:zn,blending:pr,depthTest:!1,depthWrite:!1})}function iM(){return Bo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Am}u

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
	`)}function sM(){return Bo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Rm}},`

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
	`)}function rM(){return Bo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Qy}
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
	`)}function am(){return Bo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function om(){return Bo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function aM(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,h=!1){return f==null?null:h?a(f):r(f)}function r(f){if(f&&f.isTexture){let h=f.mapping;if(h===xc||h===vc)if(e.has(f)){let p=e.get(f).texture;return o(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let x=new Oo(p.height);return x.fromEquirectangularTexture(i,f),e.set(f,x),f.addEventListener("dispose",l),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let h=f.mapping,p=h===xc||h===vc,x=h===gr||h===da;if(p||x){let g=t.get(f),m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new ah(i)),g=p?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let v=f.image;return p&&v&&v.height>0||x&&v&&c(v)?(n===null&&(n=new ah(i)),g=p?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function o(f,h){return h===xc?f.mapping=gr:h===vc&&(f.mapping=da),f}function c(f){let h=0,p=6;for(let x=0;x<p;x++)f[x]!==void 0&&h++;return h===p}function l(f){let h=f.target;h.removeEventListener("dispose",l);let p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function oM(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&er("WebGLRenderer: "+n+" extension not supported."),s}}}function lM(i,e,t,n){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){c(p.target)}function c(p){p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let x=r.get(p);x&&(e.remove(x),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function l(p,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function u(p){let x=p.attributes;for(let g in x)e.update(x[g],i.ARRAY_BUFFER)}function d(p){let x=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let v=x!==null?x.array.length:g.array.length/3-1,_=g.count>=65535?Qa:ja,y=new _(Math.ceil(v/3)*6,1),E=y.array;if(x!==null){let M=x.array;m=x.version;for(let S=0,L=0;S<v;S+=3){let C=M[S+0],A=M[S+1],D=M[S+2];E[L++]=C,E[L++]=A,E[L++]=A,E[L++]=D,E[L++]=D,E[L++]=C}}else{m=g.version;for(let M=0,S=0;M<v;M+=3){let L=M+0,C=M+1,A=M+2;E[S++]=L,E[S++]=C,E[S++]=C,E[S++]=A,E[S++]=A,E[S++]=L}}y.version=m;let b=r.get(p);b&&e.remove(b),r.set(p,y)}function f(p){let x=r.get(p);if(x){let g=p.index;g!==null&&x.version<g.version&&d(p)}else d(p);return r.get(p)}function h(){for(let p in s){let x=s[p].deref();x!==void 0&&c(x)}}return{get:l,update:u,getWireframeAttribute:f,dispose:h}}function cM(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,h){h!==0&&(i.drawElementsInstanced(n,f,r,d*a,h),t.update(f,n,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,h);let x=0;for(let g=0;g<h;g++)x+=f[g];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function hM(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function uM(i,e,t){let n=new WeakMap,s=new gt;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==d){let L=function(){M.dispose(),n.delete(o),o.removeEventListener("dispose",L)};f!==void 0&&f.texture.dispose();let h=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],_=0;h===!0&&(_=1),p===!0&&(_=2),x===!0&&(_=3);let y=o.attributes.position.count*_,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let b=new Float32Array(y*E*4*d),M=new Za(b,y,E,d);M.type=si,M.needsUpdate=!0;let S=_*4;for(let C=0;C<d;C++){let A=g[C],D=m[C],B=v[C],P=y*E*4*C;for(let V=0;V<A.count;V++){let Z=V*S;h===!0&&(s.fromBufferAttribute(A,V),b[P+Z+0]=s.x,b[P+Z+1]=s.y,b[P+Z+2]=s.z,b[P+Z+3]=0),p===!0&&(s.fromBufferAttribute(D,V),b[P+Z+4]=s.x,b[P+Z+5]=s.y,b[P+Z+6]=s.z,b[P+Z+7]=0),x===!0&&(s.fromBufferAttribute(B,V),b[P+Z+8]=s.x,b[P+Z+9]=s.y,b[P+Z+10]=s.z,b[P+Z+11]=B.itemSize===4?s.w:1)}}f={count:d,texture:M,size:new me(y,E)},n.set(o,f),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let x=0;x<l.length;x++)h+=l[x];let p=o.morphTargetsRelative?1:1-h;c.getUniforms().setValue(i,"morphTargetBaseInfluence",p),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function fM(i,e,t,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var dM={[Bu]:"LINEAR_TONE_MAPPING",[ku]:"REINHARD_TONE_MAPPING",[zu]:"CINEON_TONE_MAPPING",[To]:"ACES_FILMIC_TONE_MAPPING",[Gu]:"AGX_TONE_MAPPING",[Vu]:"NEUTRAL_TONE_MAPPING",[Hu]:"CUSTOM_TONE_MAPPING"};function pM(i,e,t,n,s,r){let a=new Qn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,u=new _t;u.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Ve([0,2,0,0,2,0],2));let d=new sc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ze(u,d),h=new dr(-1,1,1,-1,0,1),p=null,x=null,g=!1,m,v=null,_=[],y=!1;this.setSize=function(E,b){a.setSize(E,b),o!==null&&o.setSize(E,b),c!==null&&c.setSize(E,b);for(let M=0;M<_.length;M++){let S=_[M];S.setSize&&S.setSize(E,b)}},this.setEffects=function(E){_=E,y=_.length>0&&_[0].isRenderPass===!0;let b=a.width,M=a.height;_.length>0&&o===null&&(o=new Qn(b,M,{type:Ei,depthBuffer:!1,stencilBuffer:!1}),c=new Qn(b,M,{type:Ei,depthBuffer:!1,stencilBuffer:!1}));let S=s===!0&&_.some(L=>L.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&l===null&&(l=new ts(b,M),r===!0&&(l.format=us,l.type=vr)),a.dispose(),a.depthTexture=S?l:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let L=0;L<_.length;L++){let C=_[L];C.setSize&&C.setSize(b,M),S&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(l)}},this.begin=function(E,b){if(g||E.toneMapping===Oi&&_.length===0)return!1;if(v=b,b!==null){let M=b.width,S=b.height;(a.width!==M||a.height!==S)&&this.setSize(M,S)}return y===!1&&E.setRenderTarget(a),m=E.toneMapping,E.toneMapping=Oi,!0},this.hasRenderPass=function(){return y},this.end=function(E,b){E.toneMapping=m,g=!0;let M=a,S=o;for(let L=0;L<_.length;L++){let C=_[L];C.enabled!==!1&&(C.render(E,S,M,b),C.needsSwap!==!1&&(M=S,S=S===o?c:o))}if(p!==E.outputColorSpace||x!==E.toneMapping){p=E.outputColorSpace,x=E.toneMapping,d.defines={},dt.getTransfer(p)===It&&(d.defines.SRGB_TRANSFER="");let L=dM[x];L&&(d.defines[L]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=M.texture,E.setRenderTarget(v),E.render(f,h),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Cm=new dn,Pm=new ts(1,1),Im=new so(1),Lm=new Za,Nm=new Kl,Dm=new io,lm=[],cm=[],hm=new Float32Array(16),um=new Float32Array(9),fm=new Float32Array(4);function va(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=lm[s];if(r===void 0&&(r=new Float32Array(s),lm[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function pn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function lh(i,e){let t=cm[e];t===void 0&&(t=new Int32Array(e),cm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function mM(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;i.uniform2fv(this.addr,e),mn(t,e)}}function xM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pn(t,e))return;i.uniform3fv(this.addr,e),mn(t,e)}}function vM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;i.uniform4fv(this.addr,e),mn(t,e)}}function _M(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;fm.set(n),i.uniformMatrix2fv(this.addr,!1,fm),mn(t,n)}}function yM(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;um.set(n),i.uniformMatrix3fv(this.addr,!1,um),mn(t,n)}}function MM(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;hm.set(n),i.uniformMatrix4fv(this.addr,!1,hm),mn(t,n)}}function bM(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function SM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;i.uniform2iv(this.addr,e),mn(t,e)}}function EM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;i.uniform3iv(this.addr,e),mn(t,e)}}function wM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;i.uniform4iv(this.addr,e),mn(t,e)}}function TM(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function AM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;i.uniform2uiv(this.addr,e),mn(t,e)}}function RM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;i.uniform3uiv(this.addr,e),mn(t,e)}}function CM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;i.uniform4uiv(this.addr,e),mn(t,e)}}function ch(i){return i.version===0&&(i.compareFunction=ef,i.needsUpdate=!0),i}function PM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=ch(Pm):r=Cm,t.setTexture2D(e||r,s)}function IM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Nm,s)}function LM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=ch(Im):r=Dm,t.setTextureCube(e||r,s)}function NM(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Lm,s)}function DM(i){switch(i){case 5126:return mM;case 35664:return gM;case 35665:return xM;case 35666:return vM;case 35674:return _M;case 35675:return yM;case 35676:return MM;case 5124:case 35670:return bM;case 35667:case 35671:return SM;case 35668:case 35672:return EM;case 35669:case 35673:return wM;case 5125:return TM;case 36294:return AM;case 36295:return RM;case 36296:return CM;case 35678:case 36198:case 36298:case 36306:case 35682:return PM;case 35679:case 36299:case 36307:return IM;case 35680:case 36300:case 36308:case 36293:return LM;case 36289:case 36303:case 36311:case 36292:return NM}}function UM(i,e){i.uniform1fv(this.addr,e)}function FM(i,e){let t=va(e,this.size,2);i.uniform2fv(this.addr,t)}function OM(i,e){let t=va(e,this.size,3);i.uniform3fv(this.addr,t)}function BM(i,e){let t=va(e,this.size,4);i.uniform4fv(this.addr,t)}function kM(i,e){let t=va(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function zM(i,e){let t=va(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function HM(i,e){let t=va(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function GM(i,e){i.uniform1iv(this.addr,e)}function VM(i,e){i.uniform2iv(this.addr,e)}function WM(i,e){i.uniform3iv(this.addr,e)}function XM(i,e){i.uniform4iv(this.addr,e)}function qM(i,e){i.uniform1uiv(this.addr,e)}function YM(i,e){i.uniform2uiv(this.addr,e)}function ZM(i,e){i.uniform3uiv(this.addr,e)}function KM(i,e){i.uniform4uiv(this.addr,e)}function $M(i,e,t){let n=this.cache,s=e.length,r=lh(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ch(Pm):a=Cm;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function JM(i,e,t){let n=this.cache,s=e.length,r=lh(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Nm,r[a])}function jM(i,e,t){let n=this.cache,s=e.length,r=lh(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=ch(Im):a=Dm;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function QM(i,e,t){let n=this.cache,s=e.length,r=lh(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Lm,r[a])}function eb(i){switch(i){case 5126:return UM;case 35664:return FM;case 35665:return OM;case 35666:return BM;case 35674:return kM;case 35675:return zM;case 35676:return HM;case 5124:case 35670:return GM;case 35667:case 35671:return VM;case 35668:case 35672:return WM;case 35669:case 35673:return XM;case 5125:return qM;case 36294:return YM;case 36295:return ZM;case 36296:return KM;case 35678:case 36198:case 36298:case 36306:case 35682:return $M;case 35679:case 36299:case 36307:return JM;case 35680:case 36300:case 36308:case 36293:return jM;case 36289:case 36303:case 36311:case 36292:return QM}}var yf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=DM(t.type)}},Mf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=eb(t.type)}},bf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},vf=/(\w+)(\])?(\[|\.)?/g;function dm(i,e){i.seq.push(e),i.map[e.id]=e}function tb(i,e,t){let n=i.name,s=n.length;for(vf.lastIndex=0;;){let r=vf.exec(n),a=vf.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){dm(t,l===void 0?new yf(o,i,e):new Mf(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new bf(o),dm(t,d)),t=d}}}var xa=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);tb(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function pm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var nb=37297,ib=0;function sb(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var mm=new et;function rb(i){dt._getMatrix(mm,dt.workingColorSpace,i);let e=`mat3( ${mm.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case qa:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function gm(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+sb(i.getShaderSource(e),o)}else return r}function ab(i,e){let t=rb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var ob={[Bu]:"Linear",[ku]:"Reinhard",[zu]:"Cineon",[To]:"ACESFilmic",[Gu]:"AgX",[Vu]:"Neutral",[Hu]:"Custom"};function lb(i,e){let t=ob[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var rh=new N;function cb(){dt.getLuminanceCoefficients(rh);let i=rh.x.toFixed(4),e=rh.y.toFixed(4),t=rh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fo).join(`
`)}function ub(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Fo(i){return i!==""}function xm(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function vm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var db=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sf(i){return i.replace(db,pb)}function pb(i,e){let t=ut[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Sf(t)}var mb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _m(i){return i.replace(mb,gb)}function gb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ym(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var xb={[wo]:"SHADOWMAP_TYPE_PCF",[fa]:"SHADOWMAP_TYPE_VSM"};function vb(i){return xb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var _b={[da]:"ENVMAP_MODE_REFRACTION"};function yb(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":_b[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Mb={[gc]:"ENVMAP_BLENDING_MULTIPLY",[Dp]:"ENVMAP_BLENDING_MIX",[Up]:"ENVMAP_BLENDING_ADD"};function bb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Mb[i.combine]||"ENVMAP_BLENDING_NONE"}function Sb(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=vb(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=yb(t),d=bb(t),f=hb(t),h=ub(r),p=s.createProgram(),x,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Fo).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Fo).join(`
`),g.length>0&&(g+=`
`)):(x=[ym(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fo).join(`
`),g=[ym(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?ut.tonemapping_pars_fragment:"",t.toneMapping!==Oi?lb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,ab("linearToOutputTexel",t.outputColorSpace),cb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fo).join(`
`)),a=Sf(a),a=xm(a,t),a=vm(a,t),o=Sf(o),o=xm(o,t),o=vm(o,t),a=_m(a),o=_m(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===nf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let v=m+x+a,_=m+g+o,y=pm(s,s.VERTEX_SHADER,v),E=pm(s,s.FRAGMENT_SHADER,_);s.attachShader(p,y),s.attachShader(p,E),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function b(C){if(i.debug.checkShaderErrors){let A=s.getProgramInfoLog(p)||"",D=s.getShaderInfoLog(y)||"",B=s.getShaderInfoLog(E)||"",P=A.trim(),V=D.trim(),Z=B.trim(),X=!0,se=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,y,E);else{let W=gm(s,y,"vertex"),U=gm(s,E,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+P+`
`+W+`
`+U)}else P!==""?He("WebGLProgram: Program Info Log:",P):(V===""||Z==="")&&(se=!1);se&&(C.diagnostics={runnable:X,programLog:P,vertexShader:{log:V,prefix:x},fragmentShader:{log:Z,prefix:g}})}s.deleteShader(y),s.deleteShader(E),M=new xa(s,p),S=fb(s,p)}let M;this.getUniforms=function(){return M===void 0&&b(this),M};let S;this.getAttributes=function(){return S===void 0&&b(this),S};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(p,nb)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ib++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=y,this.fragmentShader=E,this}var Eb=0,Ef=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new wf(e),t.set(e,n)),n}},wf=class{constructor(e){this.id=Eb++,this.code=e,this.usedTimes=0}};function wb(i){return i===Ns||i===Io||i===Lo}function Tb(i,e,t,n,s,r){let a=new Ka,o=new Ef,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,S,L,C,A,D){let B=C.fog,P=A.geometry,V=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?C.environment:null,Z=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,X=e.get(M.envMap||V,Z),se=f[M.type],W=n.precision;M.precision!==null&&(W=n.getMaxPrecision(M.precision),W!==M.precision&&He("WebGLProgram.getParameters:",M.precision,"not supported, using",W,"instead."));let U=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,R=U!==void 0?U.length:0,O=0;P.morphAttributes.position!==void 0&&(O=1),P.morphAttributes.normal!==void 0&&(O=2),P.morphAttributes.color!==void 0&&(O=3);let he,G,ee,H;if(se){let J=ki[se];he=J.vertexShader,G=J.fragmentShader}else{he=M.vertexShader,G=M.fragmentShader;let J=o.getVertexShaderStage(M),We=o.getFragmentShaderStage(M);o.update(M,J,We),ee=J.id,H=We.id}let q=i.getRenderTarget(),Q=i.state.buffers.depth.getReversed(),fe=A.isInstancedMesh===!0,tt=A.isBatchedMesh===!0,Be=!!M.map,$e=!!M.matcap,nt=!!X,oe=nt&&X.isPMREMTexture===!0,ge=!!M.aoMap,ye=!!M.lightMap,Ie=!!M.bumpMap&&M.wireframe===!1,Se=!!M.normalMap,je=!!M.displacementMap,Ue=!!M.emissiveMap,st=!!M.metalnessMap,ct=!!M.roughnessMap,yt=M.anisotropy>0,z=M.clearcoat>0,Qt=M.diffuseRoughness>0,ft=M.dispersion>0,wt=M.retroreflectivity>0,Ee=M.iridescence>0,Vt=M.sheen>0,Xe=M.transmission>0,Je=yt&&!!M.anisotropyMap,I=z&&!!M.clearcoatMap,w=z&&!!M.clearcoatNormalMap,Y=z&&!!M.clearcoatRoughnessMap,pe=Qt&&!!M.diffuseRoughnessMap,le=Ee&&!!M.iridescenceMap,Me=Ee&&!!M.iridescenceThicknessMap,we=Vt&&!!M.sheenColorMap,ie=Vt&&!!M.sheenRoughnessMap,ae=!!M.specularMap,be=!!M.specularColorMap,F=!!M.specularIntensityMap,re=Xe&&!!M.transmissionMap,ne=Xe&&!!M.thicknessMap,Te=!!M.gradientMap,ce=!!M.alphaMap,ve=M.alphaTest>0,ke=!!M.alphaHash,rt=!!M.extensions,de=Oi;M.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(de=i.toneMapping);let qe=oe?X.isCompressedCubeTexture?X.image[0].mipmaps:X.mipmaps:null,at={shaderID:se,shaderType:M.type,shaderName:M.name,vertexShader:he,fragmentShader:G,defines:M.defines,customVertexShaderID:ee,customFragmentShaderID:H,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:W,batching:tt,batchingColor:tt&&A._colorsTexture!==null,instancing:fe,instancingColor:fe&&A.instanceColor!==null,instancingMorph:fe&&A.morphTexture!==null,outputColorSpace:q===null?i.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:dt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:Be,matcap:$e,envMap:nt,envMapMode:nt&&X.mapping,envMapPMREM:oe,envMapMaxLod:oe?qe.length-1:null,envMapSize:oe?qe[0].width:null,aoMap:ge,lightMap:ye,bumpMap:Ie,normalMap:Se,displacementMap:je,emissiveMap:Ue,normalMapObjectSpace:Se&&M.normalMapType===kp,normalMapTangentSpace:Se&&M.normalMapType===Do,packedNormalMap:Se&&M.normalMapType===Do&&wb(M.normalMap.format),metalnessMap:st,roughnessMap:ct,anisotropy:yt,anisotropyMap:Je,clearcoat:z,clearcoatMap:I,clearcoatNormalMap:w,clearcoatRoughnessMap:Y,diffuseRoughness:Qt,diffuseRoughnessMap:pe,dispersion:ft,retroreflection:wt,iridescence:Ee,iridescenceMap:le,iridescenceThicknessMap:Me,sheen:Vt,sheenColorMap:we,sheenRoughnessMap:ie,specularMap:ae,specularColorMap:be,specularIntensityMap:F,transmission:Xe,transmissionMap:re,thicknessMap:ne,gradientMap:Te,opaque:M.transparent===!1&&M.blending===Ls&&M.alphaToCoverage===!1,alphaMap:ce,alphaTest:ve,alphaHash:ke,combine:M.combine,mapUv:Be&&h(M.map.channel),aoMapUv:ge&&h(M.aoMap.channel),lightMapUv:ye&&h(M.lightMap.channel),bumpMapUv:Ie&&h(M.bumpMap.channel),normalMapUv:Se&&h(M.normalMap.channel),displacementMapUv:je&&h(M.displacementMap.channel),emissiveMapUv:Ue&&h(M.emissiveMap.channel),metalnessMapUv:st&&h(M.metalnessMap.channel),roughnessMapUv:ct&&h(M.roughnessMap.channel),anisotropyMapUv:Je&&h(M.anisotropyMap.channel),clearcoatMapUv:I&&h(M.clearcoatMap.channel),clearcoatNormalMapUv:w&&h(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&h(M.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:pe&&h(M.diffuseRoughnessMap.channel),iridescenceMapUv:le&&h(M.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&h(M.iridescenceThicknessMap.channel),sheenColorMapUv:we&&h(M.sheenColorMap.channel),sheenRoughnessMapUv:ie&&h(M.sheenRoughnessMap.channel),specularMapUv:ae&&h(M.specularMap.channel),specularColorMapUv:be&&h(M.specularColorMap.channel),specularIntensityMapUv:F&&h(M.specularIntensityMap.channel),transmissionMapUv:re&&h(M.transmissionMap.channel),thicknessMapUv:ne&&h(M.thicknessMap.channel),alphaMapUv:ce&&h(M.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(Se||yt),vertexNormals:!!P.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!P.attributes.uv&&(Be||ce),fog:!!B,useFog:M.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||P.attributes.normal===void 0&&Se===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Q,skinning:A.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:R,morphTextureStride:O,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:D.filter(J=>J.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:Be&&M.map.isVideoTexture===!0&&dt.getTransfer(M.map.colorSpace)===It,decodeVideoTextureEmissive:Ue&&M.emissiveMap.isVideoTexture===!0&&dt.getTransfer(M.emissiveMap.colorSpace)===It,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===qt,flipSided:M.side===zn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:rt&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&M.extensions.multiDraw===!0||tt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at}function x(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let L in M.defines)S.push(L),S.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(g(S,M),m(S,M),S.push(i.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function g(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapPMREM),M.push(S.envMapMaxLod),M.push(S.envMapSize),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.diffuseRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.numSunLights),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numSunLightShadows),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.numLightProbeGrids),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function m(M,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),M.push(a.mask)}function v(M){let S=f[M.type],L;if(S){let C=ki[S];L=tm.clone(C.uniforms)}else L=M.uniforms;return L}function _(M,S){let L=u.get(S);return L!==void 0?++L.usedTimes:(L=new Sb(i,S,M,s),l.push(L),u.set(S,L)),L}function y(M){if(--M.usedTimes===0){let S=l.indexOf(M);l[S]=l[l.length-1],l.pop(),u.delete(M.cacheKey),M.destroy()}}function E(M){o.remove(M)}function b(){o.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:v,acquireProgram:_,releaseProgram:y,releaseShaderCache:E,programs:l,dispose:b}}function Ab(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Rb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Mm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bm(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,p,x,g,m){let v=i[e];return v===void 0?(v={id:f.id,object:f,geometry:h,material:p,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:g,group:m},i[e]=v):(v.id=f.id,v.object=f,v.geometry=h,v.material=p,v.materialVariant=a(f),v.groupOrder=x,v.renderOrder=f.renderOrder,v.z=g,v.group=m),e++,v}function c(f,h,p,x,g,m,v){v.reversedDepth===!0&&(g=-g);let _=o(f,h,p,x,g,m);p.transmission>0?n.push(_):p.transparent===!0?s.push(_):t.push(_)}function l(f,h,p,x,g,m){let v=o(f,h,p,x,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?s.unshift(v):t.unshift(v)}function u(f,h){t.length>1&&t.sort(f||Rb),n.length>1&&n.sort(h||Mm),s.length>1&&s.sort(h||Mm)}function d(){for(let f=e,h=i.length;f<h;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function Cb(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new bm,i.set(n,[a])):s>=r.length?(a=new bm,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Pb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new _e};break;case"SpotLight":t={position:new N,direction:new N,color:new _e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new _e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new _e,groundColor:new _e};break;case"RectAreaLight":t={color:new _e,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function Ib(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Lb=0;function Nb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Db(i){let e=new Pb,t=Ib(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new Ge,a=new Ge;function o(l){let u=0,d=0,f=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let h=0,p=0,x=0,g=0,m=0,v=0,_=0,y=0,E=0,b=0,M=0,S=0,L=0,C=0;l.sort(Nb);for(let D=0,B=l.length;D<B;D++){let P=l[D],V=P.color,Z=P.intensity,X=P.distance,se=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ns?se=P.shadow.map.texture:se=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=V.r*Z,d+=V.g*Z,f+=V.b*Z;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],Z);C++}else if(P.isSunLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let U=P.shadow,R=t.get(P);R.shadowIntensity=U.intensity,R.shadowBias=U.bias,R.shadowNormalBias=U.normalBias,R.shadowRadius=U.radius,R.shadowMapSize.copy(U.mapSize).multiply(U.getFrameExtents()),n.sunShadow[p]=R,n.sunShadowMap[p]=se;let O=U.getViewportCount();for(let he=0;he<O;he++)n.sunShadowMatrix[x+he]=U.getMatrix(he),n.sunShadowCascade[x+he]=U._cascadeData[he];x+=O,p++}n.sun[h]=W,h++}else if(P.isDirectionalLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let U=P.shadow,R=t.get(P);R.shadowIntensity=U.intensity,R.shadowBias=U.bias,R.shadowNormalBias=U.normalBias,R.shadowRadius=U.radius,R.shadowMapSize=U.mapSize,n.directionalShadow[g]=R,n.directionalShadowMap[g]=se,n.directionalShadowMatrix[g]=P.shadow.matrix,E++}n.directional[g]=W,g++}else if(P.isSpotLight){let W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(V).multiplyScalar(Z),W.distance=X,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;let U=P.shadow;if(P.map&&(n.spotLightMap[S]=P.map,S++,U.updateMatrices(P),P.castShadow&&L++),n.spotLightMatrix[v]=U.matrix,P.castShadow){let R=t.get(P);R.shadowIntensity=U.intensity,R.shadowBias=U.bias,R.shadowNormalBias=U.normalBias,R.shadowRadius=U.radius,R.shadowMapSize=U.mapSize,n.spotShadow[v]=R,n.spotShadowMap[v]=se,M++}v++}else if(P.isRectAreaLight){let W=e.get(P);W.color.copy(V).multiplyScalar(Z),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[_]=W,_++}else if(P.isPointLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let U=P.shadow,R=t.get(P);R.shadowIntensity=U.intensity,R.shadowBias=U.bias,R.shadowNormalBias=U.normalBias,R.shadowRadius=U.radius,R.shadowMapSize=U.mapSize,R.shadowCameraNear=U.camera.near,R.shadowCameraFar=U.camera.far,n.pointShadow[m]=R,n.pointShadowMap[m]=se,n.pointShadowMatrix[m]=P.shadow.matrix,b++}n.point[m]=W,m++}else if(P.isHemisphereLight){let W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(Z),W.groundColor.copy(P.groundColor).multiplyScalar(Z),n.hemi[y]=W,y++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;let A=n.hash;(A.sunLength!==h||A.directionalLength!==g||A.pointLength!==m||A.spotLength!==v||A.rectAreaLength!==_||A.hemiLength!==y||A.numSunShadows!==p||A.numDirectionalShadows!==E||A.numPointShadows!==b||A.numSpotShadows!==M||A.numSpotMaps!==S||A.numLightProbes!==C)&&(n.sun.length=h,n.directional.length=g,n.spot.length=v,n.rectArea.length=_,n.point.length=m,n.hemi.length=y,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.spotLightMatrix.length=M+S-L,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=C,A.sunLength=h,A.directionalLength=g,A.pointLength=m,A.spotLength=v,A.rectAreaLength=_,A.hemiLength=y,A.numSunShadows=p,A.numDirectionalShadows=E,A.numPointShadows=b,A.numSpotShadows=M,A.numSpotMaps=S,A.numLightProbes=C,n.version=Lb++)}function c(l,u){let d=0,f=0,h=0,p=0,x=0,g=0,m=u.matrixWorldInverse;for(let v=0,_=l.length;v<_;v++){let y=l[v];if(y.isSunLight){let E=n.sun[d];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(m),d++}else if(y.isDirectionalLight){let E=n.directional[f];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),f++}else if(y.isSpotLight){let E=n.spot[p];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let E=n.rectArea[x];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let E=n.point[h];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),h++}else if(y.isHemisphereLight){let E=n.hemi[g];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function Sm(i){let e=new Db(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):t.push(d)}function o(d){n.push(d)}function c(){e.setup(t),s.sort((d,f)=>d.priority-f.priority||d.id-f.id)}function l(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Ub(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Sm(i),e.set(s,[o])):r>=a.length?(o=new Sm(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Fb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ob=`uniform sampler2D shadow_pass;
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
}`,Bb=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],kb=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Em=new Ge,Uo=new N,_f=new N;function zb(i,e,t){let n=new As,s=new me,r=new me,a=new gt,o=new rc,c=new ac,l={},u=t.maxTextureSize,d={[hi]:zn,[zn]:hi,[qt]:qt},f=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:Fb,fragmentShader:Ob}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let p=new _t;p.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ze(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wo;let m=this.type;this.render=function(b,M,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===mp&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=wo);let L=i.getRenderTarget(),C=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),D=i.state;D.setBlending(pr),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let B=m!==this.type;B&&M.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(V=>V.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,V=b.length;P<V;P++){let Z=b[P],X=Z.shadow;if(X===void 0){He("WebGLShadowMap:",Z,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let se=X.getFrameExtents();s.multiply(se),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/se.x),s.x=r.x*se.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/se.y),s.y=r.y*se.y,X.mapSize.y=r.y));let W=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=W,X.map===null||B===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===fa){if(Z.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Qn(s.x,s.y,{format:Ns,type:Ei,minFilter:tn,magFilter:tn,generateMipmaps:!1}),X.map.texture.name=Z.name+".shadowMap",X.map.depthTexture=new ts(s.x,s.y,si),X.map.depthTexture.name=Z.name+".shadowMapDepth",X.map.depthTexture.format=es,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=en,X.map.depthTexture.magFilter=en}else Z.isPointLight?(X.map=new Oo(s.x),X.map.depthTexture=new so(s.x,Si)):(X.map=new Qn(s.x,s.y),X.map.depthTexture=new ts(s.x,s.y,Si)),X.map.depthTexture.name=Z.name+".shadowMap",X.map.depthTexture.format=es,this.type===wo?(X.map.depthTexture.compareFunction=W?Qu:ju,X.map.depthTexture.minFilter=tn,X.map.depthTexture.magFilter=tn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=en,X.map.depthTexture.magFilter=en);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);let U=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();Z.isPointLight!==!0&&X.updateMatrices(Z,S);let R=(X.camera.layers.mask&4294967294)!==0?X.camera.layers:S.layers;for(let O=0;O<U;O++){let he=X.getCamera(O);if(Z.isPointLight){let G=X.camera,ee=X.matrix,H=Z.distance||G.far;H!==G.far&&(G.far=H,G.updateProjectionMatrix()),Uo.setFromMatrixPosition(Z.matrixWorld),G.position.copy(Uo),_f.copy(G.position),_f.add(Bb[O]),G.up.copy(kb[O]),G.lookAt(_f),G.updateMatrixWorld(),ee.makeTranslation(-Uo.x,-Uo.y,-Uo.z),Em.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Em,G.coordinateSystem,G.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,O),i.clear();else{O===0&&(i.setRenderTarget(X.map),i.clear());let G=X.getViewport(O);a.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),D.viewport(a)}n=X.getFrustum(O),y(M,S,he,Z,R,this.type)}X.isPointLightShadow!==!0&&this.type===fa&&v(X,S),X.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(L,C,A)};function v(b,M){let S=e.update(x);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,h.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),b.mapPass===null?b.mapPass=new Qn(s.x,s.y,{format:Ns,type:Ei}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(M,null,S,f,x,null),h.uniforms.shadow_pass.value=b.mapPass.texture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(M,null,S,h,x,null)}function _(b,M,S,L){let C=null,A=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)C=A;else if(C=S.isPointLight===!0?c:o,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0||M.alphaToCoverage===!0){let D=C.uuid,B=M.uuid,P=l[D];P===void 0&&(P={},l[D]=P);let V=P[B];V===void 0&&(V=C.clone(),P[B]=V,M.addEventListener("dispose",E)),C=V}if(C.visible=M.visible,C.wireframe=M.wireframe,L===fa?C.side=M.shadowSide!==null?M.shadowSide:M.side:C.side=M.shadowSide!==null?M.shadowSide:d[M.side],C.alphaMap=M.alphaMap,C.alphaTest=M.alphaToCoverage===!0?.5:M.alphaTest,C.map=M.map,C.clipShadows=M.clipShadows,C.clippingPlanes=M.clippingPlanes,C.clipIntersection=M.clipIntersection,C.displacementMap=M.displacementMap,C.displacementScale=M.displacementScale,C.displacementBias=M.displacementBias,C.wireframeLinewidth=M.wireframeLinewidth,C.linewidth=M.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let D=i.properties.get(C);D.light=S}return C}function y(b,M,S,L,C,A){if(b.visible===!1)return;if(b.layers.test(C)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&A===fa)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);let P=e.update(b),V=b.material;if(Array.isArray(V)){let Z=P.groups;for(let X=0,se=Z.length;X<se;X++){let W=Z[X],U=V[W.materialIndex];if(U&&U.visible){let R=_(b,U,L,A);b.onBeforeShadow(i,b,M,S,P,R,W),i.renderBufferDirect(S,null,P,R,b,W),b.onAfterShadow(i,b,M,S,P,R,W)}}}else if(V.visible){let Z=_(b,V,L,A);b.onBeforeShadow(i,b,M,S,P,Z,null),i.renderBufferDirect(S,null,P,Z,b,null),b.onAfterShadow(i,b,M,S,P,Z,null)}}let B=b.children;for(let P=0,V=B.length;P<V;P++)y(B[P],M,S,L,C,A)}function E(b){b.target.removeEventListener("dispose",E);for(let S in l){let L=l[S],C=b.target.uuid;C in L&&(L[C].dispose(),delete L[C])}}}function Hb(i,e){function t(){let F=!1,re=new gt,ne=null,Te=new gt(0,0,0,0);return{setMask:function(ce){ne!==ce&&!F&&(i.colorMask(ce,ce,ce,ce),ne=ce)},setLocked:function(ce){F=ce},setClear:function(ce,ve,ke,rt,de){de===!0&&(ce*=rt,ve*=rt,ke*=rt),re.set(ce,ve,ke,rt),Te.equals(re)===!1&&(i.clearColor(ce,ve,ke,rt),Te.copy(re))},reset:function(){F=!1,ne=null,Te.set(-1,0,0,0)}}}function n(){let F=!1,re=!1,ne=null,Te=null,ce=null;return{setReversed:function(ve){if(re!==ve){let ke=e.get("EXT_clip_control");ve?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),re=ve;let rt=ce;ce=null,this.setClear(rt)}},getReversed:function(){return re},setTest:function(ve){ve?Q(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(ve){ne!==ve&&!F&&(i.depthMask(ve),ne=ve)},setFunc:function(ve){if(re&&(ve=Kp[ve]),Te!==ve){switch(ve){case zl:i.depthFunc(i.NEVER);break;case Hl:i.depthFunc(i.ALWAYS);break;case Gl:i.depthFunc(i.LESS);break;case qr:i.depthFunc(i.LEQUAL);break;case Vl:i.depthFunc(i.EQUAL);break;case Wl:i.depthFunc(i.GEQUAL);break;case Xl:i.depthFunc(i.GREATER);break;case ql:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Te=ve}},setLocked:function(ve){F=ve},setClear:function(ve){ce!==ve&&(ce=ve,re&&(ve=1-ve),i.clearDepth(ve))},reset:function(){F=!1,ne=null,Te=null,ce=null,re=!1}}}function s(){let F=!1,re=null,ne=null,Te=null,ce=null,ve=null,ke=null,rt=null,de=null;return{setTest:function(qe){F||(qe?Q(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(qe){re!==qe&&!F&&(i.stencilMask(qe),re=qe)},setFunc:function(qe,at,J){(ne!==qe||Te!==at||ce!==J)&&(i.stencilFunc(qe,at,J),ne=qe,Te=at,ce=J)},setOp:function(qe,at,J){(ve!==qe||ke!==at||rt!==J)&&(i.stencilOp(qe,at,J),ve=qe,ke=at,rt=J)},setLocked:function(qe){F=qe},setClear:function(qe){de!==qe&&(i.clearStencil(qe),de=qe)},reset:function(){F=!1,re=null,ne=null,Te=null,ce=null,ve=null,ke=null,rt=null,de=null}}}let r=new t,a=new n,o=new s,c={},l=new WeakMap,u={},d={},f={},h=new WeakMap,p=[],x=null,g=!1,m=null,v=null,_=null,y=null,E=null,b=null,M=null,S=new _e(0,0,0),L=0,C=!1,A=null,D=null,B=null,P=null,V=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,se=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=se>=1):W.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=se>=2);let U=null,R={},O=i.getParameter(i.SCISSOR_BOX),he=i.getParameter(i.VIEWPORT),G=new gt().fromArray(O),ee=new gt().fromArray(he);function H(F,re,ne,Te){let ce=new Uint8Array(4),ve=i.createTexture();i.bindTexture(F,ve),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<ne;ke++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,ce):i.texImage2D(re+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ce);return ve}let q={};q[i.TEXTURE_2D]=H(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=H(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=H(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=H(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(qr),Ie(!1),Se(Nu),Q(i.CULL_FACE),ge(pr);function Q(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function fe(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function tt(F,re){return f[F]!==re?(i.bindFramebuffer(F,re),f[F]=re,F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=re),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Be(F,re){let ne=p,Te=!1;if(F){ne=h.get(re),ne===void 0&&(ne=[],h.set(re,ne));let ce=F.textures;if(ne.length!==ce.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,ke=ce.length;ve<ke;ve++)ne[ve]=i.COLOR_ATTACHMENT0+ve;ne.length=ce.length,Te=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,Te=!0);Te&&i.drawBuffers(ne)}function $e(F){return x!==F?(i.useProgram(F),x=F,!0):!1}let nt={[mr]:i.FUNC_ADD,[xp]:i.FUNC_SUBTRACT,[vp]:i.FUNC_REVERSE_SUBTRACT};nt[_p]=i.MIN,nt[yp]=i.MAX;let oe={[Mp]:i.ZERO,[bp]:i.ONE,[Sp]:i.SRC_COLOR,[Fu]:i.SRC_ALPHA,[Cp]:i.SRC_ALPHA_SATURATE,[Ap]:i.DST_COLOR,[wp]:i.DST_ALPHA,[Ep]:i.ONE_MINUS_SRC_COLOR,[Ou]:i.ONE_MINUS_SRC_ALPHA,[Rp]:i.ONE_MINUS_DST_COLOR,[Tp]:i.ONE_MINUS_DST_ALPHA,[Pp]:i.CONSTANT_COLOR,[Ip]:i.ONE_MINUS_CONSTANT_COLOR,[Lp]:i.CONSTANT_ALPHA,[Np]:i.ONE_MINUS_CONSTANT_ALPHA};function ge(F,re,ne,Te,ce,ve,ke,rt,de,qe){if(F===pr){g===!0&&(fe(i.BLEND),g=!1);return}if(g===!1&&(Q(i.BLEND),g=!0),F!==gp){if(F!==m||qe!==C){if((v!==mr||E!==mr)&&(i.blendEquation(i.FUNC_ADD),v=mr,E=mr),qe)switch(F){case Ls:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bi:i.blendFunc(i.ONE,i.ONE);break;case Du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",F);break}else switch(F){case Ls:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Du:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uu:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",F);break}_=null,y=null,b=null,M=null,S.set(0,0,0),L=0,m=F,C=qe}return}ce=ce||re,ve=ve||ne,ke=ke||Te,(re!==v||ce!==E)&&(i.blendEquationSeparate(nt[re],nt[ce]),v=re,E=ce),(ne!==_||Te!==y||ve!==b||ke!==M)&&(i.blendFuncSeparate(oe[ne],oe[Te],oe[ve],oe[ke]),_=ne,y=Te,b=ve,M=ke),(rt.equals(S)===!1||de!==L)&&(i.blendColor(rt.r,rt.g,rt.b,de),S.copy(rt),L=de),m=F,C=!1}function ye(F,re){F.side===qt?fe(i.CULL_FACE):Q(i.CULL_FACE);let ne=F.side===zn;re&&(ne=!ne),Ie(ne),F.blending===Ls&&F.transparent===!1?ge(pr):ge(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let Te=F.stencilWrite;o.setTest(Te),Te&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ue(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(F){A!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),A=F)}function Se(F){F!==dp?(Q(i.CULL_FACE),F!==D&&(F===Nu?i.cullFace(i.BACK):F===pp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),D=F}function je(F){F!==B&&(X&&i.lineWidth(F),B=F)}function Ue(F,re,ne){F?(Q(i.POLYGON_OFFSET_FILL),(P!==re||V!==ne)&&(P=re,V=ne,a.getReversed()&&(re=-re,ne=-ne),i.polygonOffset(re,ne))):fe(i.POLYGON_OFFSET_FILL)}function st(F){F?Q(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function ct(F){F===void 0&&(F=i.TEXTURE0+Z-1),U!==F&&(i.activeTexture(F),U=F)}function yt(F,re,ne){ne===void 0&&(U===null?ne=i.TEXTURE0+Z-1:ne=U);let Te=R[ne];Te===void 0&&(Te={type:void 0,texture:void 0},R[ne]=Te),(Te.type!==F||Te.texture!==re)&&(U!==ne&&(i.activeTexture(ne),U=ne),i.bindTexture(F,re||q[F]),Te.type=F,Te.texture=re)}function z(){let F=R[U];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function ft(){try{i.compressedTexImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function wt(){try{i.texSubImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Ee(){try{i.texSubImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Vt(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Xe(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Je(){try{i.texStorage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function I(){try{i.texStorage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function w(){try{i.texImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Y(){try{i.texImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function pe(F){return d[F]!==void 0?d[F]:i.getParameter(F)}function le(F,re){d[F]!==re&&(i.pixelStorei(F,re),d[F]=re)}function Me(F){G.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),G.copy(F))}function we(F){ee.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),ee.copy(F))}function ie(F,re){let ne=l.get(re);ne===void 0&&(ne=new WeakMap,l.set(re,ne));let Te=ne.get(F);Te===void 0&&(Te=i.getUniformBlockIndex(re,F.name),i.uniformBlockBinding(re,Te,Te),ne.set(F,Te))}function ae(F,re,ne){let ce=l.get(re).get(F);c[ce]!==ne&&(i.bindBufferBase(i.UNIFORM_BUFFER,ce,ne),c[ce]=ne)}function be(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},U=null,R={},f={},c={},h=new WeakMap,p=[],x=null,g=!1,m=null,v=null,_=null,y=null,E=null,b=null,M=null,S=new _e(0,0,0),L=0,C=!1,A=null,D=null,B=null,P=null,V=null,G.set(0,0,i.canvas.width,i.canvas.height),ee.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:fe,bindFramebuffer:tt,drawBuffers:Be,useProgram:$e,setBlending:ge,setMaterial:ye,setFlipSided:Ie,setCullFace:Se,setLineWidth:je,setPolygonOffset:Ue,setScissorTest:st,activeTexture:ct,bindTexture:yt,unbindTexture:z,compressedTexImage2D:Qt,compressedTexImage3D:ft,texImage2D:w,texImage3D:Y,pixelStorei:le,getParameter:pe,updateUBOMapping:ie,uniformBlockBinding:ae,texStorage2D:Je,texStorage3D:I,texSubImage2D:wt,texSubImage3D:Ee,compressedTexSubImage2D:Vt,compressedTexSubImage3D:Xe,scissor:Me,viewport:we,reset:be}}function Gb(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new me,u=new WeakMap,d=new Set,f,h=new WeakMap,p=new Set,x=new FinalizationRegistry(I=>p.delete(I)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,w){return g?new OffscreenCanvas(I,w):Kr("canvas")}function v(I,w,Y){let pe=1,le=Je(I);if((le.width>Y||le.height>Y)&&(pe=Y/Math.max(le.width,le.height)),pe<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let Me=Math.floor(pe*le.width),we=Math.floor(pe*le.height);f===void 0&&(f=m(Me,we));let ie=w?m(Me,we):f;return ie.width=Me,ie.height=we,ie.getContext("2d").drawImage(I,0,0,Me,we),He("WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+Me+"x"+we+")."),ie}else return"data"in I&&He("WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),I;return I}function _(I){return I.generateMipmaps}function y(I){i.generateMipmap(I)}function E(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(I,w,Y,pe,le,Me=!1){if(I!==null){if(i[I]!==void 0)return i[I];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let we;pe&&(we=e.get("EXT_texture_norm16"),we||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=w;if(w===i.RED&&(Y===i.FLOAT&&(ie=i.R32F),Y===i.HALF_FLOAT&&(ie=i.R16F),Y===i.UNSIGNED_BYTE&&(ie=i.R8),Y===i.UNSIGNED_SHORT&&we&&(ie=we.R16_EXT),Y===i.SHORT&&we&&(ie=we.R16_SNORM_EXT)),w===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.R8UI),Y===i.UNSIGNED_SHORT&&(ie=i.R16UI),Y===i.UNSIGNED_INT&&(ie=i.R32UI),Y===i.BYTE&&(ie=i.R8I),Y===i.SHORT&&(ie=i.R16I),Y===i.INT&&(ie=i.R32I)),w===i.RG&&(Y===i.FLOAT&&(ie=i.RG32F),Y===i.HALF_FLOAT&&(ie=i.RG16F),Y===i.UNSIGNED_BYTE&&(ie=i.RG8),Y===i.UNSIGNED_SHORT&&we&&(ie=we.RG16_EXT),Y===i.SHORT&&we&&(ie=we.RG16_SNORM_EXT)),w===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RG8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RG16UI),Y===i.UNSIGNED_INT&&(ie=i.RG32UI),Y===i.BYTE&&(ie=i.RG8I),Y===i.SHORT&&(ie=i.RG16I),Y===i.INT&&(ie=i.RG32I)),w===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),Y===i.UNSIGNED_INT&&(ie=i.RGB32UI),Y===i.BYTE&&(ie=i.RGB8I),Y===i.SHORT&&(ie=i.RGB16I),Y===i.INT&&(ie=i.RGB32I)),w===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),Y===i.UNSIGNED_INT&&(ie=i.RGBA32UI),Y===i.BYTE&&(ie=i.RGBA8I),Y===i.SHORT&&(ie=i.RGBA16I),Y===i.INT&&(ie=i.RGBA32I)),w===i.RGB&&(Y===i.UNSIGNED_SHORT&&we&&(ie=we.RGB16_EXT),Y===i.SHORT&&we&&(ie=we.RGB16_SNORM_EXT),Y===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(ie=i.R11F_G11F_B10F)),w===i.RGBA){let ae=Me?qa:dt.getTransfer(le);Y===i.FLOAT&&(ie=i.RGBA32F),Y===i.HALF_FLOAT&&(ie=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(ie=ae===It?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT&&we&&(ie=we.RGBA16_EXT),Y===i.SHORT&&we&&(ie=we.RGBA16_SNORM_EXT),Y===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function M(I,w){let Y;return I?w===null||w===Si||w===vr?Y=i.DEPTH24_STENCIL8:w===si?Y=i.DEPTH32F_STENCIL8:w===ma&&(Y=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Si||w===vr?Y=i.DEPTH_COMPONENT24:w===si?Y=i.DEPTH_COMPONENT32F:w===ma&&(Y=i.DEPTH_COMPONENT16),Y}function S(I,w){return _(I)===!0||I.isFramebufferTexture&&I.minFilter!==en&&I.minFilter!==tn?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function L(I){let w=new WeakRef(I);n.get(I).__ref=w,p.add(w),x.register(I,w,w)}function C(I){let w=n.get(I).__ref;w!==void 0&&(p.delete(w),x.unregister(w))}function A(I){B(I.target)}function D(I){P(I.target)}function B(I){I.removeEventListener("dispose",A),C(I),Z(I),I.isVideoTexture&&u.delete(I),I.isHTMLTexture&&d.delete(I)}function P(I){I.removeEventListener("dispose",D),C(I),se(I)}function V(){for(let I of p){let w=I.deref();w!==void 0&&(w.isRenderTarget===!0?P(w):B(w))}p.clear(),d.clear()}function Z(I){let w=n.get(I);if(w.__webglInit===void 0)return;let Y=I.source,pe=h.get(Y);if(pe){let le=pe[w.__cacheKey];le.usedTimes--,le.usedTimes===0&&X(I),Object.keys(pe).length===0&&h.delete(Y)}n.remove(I)}function X(I){let w=n.get(I);i.deleteTexture(w.__webglTexture);let Y=I.source,pe=h.get(Y);delete pe[w.__cacheKey],a.memory.textures--}function se(I){let w=n.get(I);w.__depthDisposeCallback&&w.__depthDisposeCallback();let Y=I.depthTexture;if(Y&&Y.renderTarget===I&&B(Y),I.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(w.__webglFramebuffer[le]))for(let Me=0;Me<w.__webglFramebuffer[le].length;Me++)i.deleteFramebuffer(w.__webglFramebuffer[le][Me]);else i.deleteFramebuffer(w.__webglFramebuffer[le]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[le])}else{if(Array.isArray(w.__webglFramebuffer))for(let le=0;le<w.__webglFramebuffer.length;le++)i.deleteFramebuffer(w.__webglFramebuffer[le]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let le=0;le<w.__webglColorRenderbuffer.length;le++)w.__webglColorRenderbuffer[le]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[le]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let pe=I.textures;for(let le=0,Me=pe.length;le<Me;le++){let we=n.get(pe[le]);we.__webglTexture&&(i.deleteTexture(we.__webglTexture),a.memory.textures--),n.remove(pe[le])}n.remove(I)}let W=0;function U(){W=0}function R(){return W}function O(I){W=I}function he(){let I=W;return I>=s.maxTextures&&He("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),W+=1,I}function G(I){let w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.mipmapsAutoUpdate),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function ee(I,w){let Y=n.get(I);if(I.isVideoTexture&&Vt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&Y.__version!==I.version){let pe=I.image;if(pe===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(Y,I,w);return}}else I.isExternalTexture&&(Y.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+w)}function H(I,w){let Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){ye(Y,I,w);return}else I.isExternalTexture&&(Y.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+w)}function q(I,w){let Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){ye(Y,I,w);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+w)}function Q(I,w){let Y=n.get(I);if(I.version>0&&Y.__version!==I.version){Ie(Y,I,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+w)}let fe={[Mi]:i.REPEAT,[li]:i.CLAMP_TO_EDGE,[Yr]:i.MIRRORED_REPEAT},tt={[en]:i.NEAREST,[_c]:i.NEAREST_MIPMAP_NEAREST,[xr]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[pa]:i.LINEAR_MIPMAP_NEAREST,[Xn]:i.LINEAR_MIPMAP_LINEAR},Be={[Hp]:i.NEVER,[ef]:i.ALWAYS,[Gp]:i.LESS,[ju]:i.LEQUAL,[Vp]:i.EQUAL,[Qu]:i.GEQUAL,[Wp]:i.GREATER,[Xp]:i.NOTEQUAL};function $e(I,w){if(w.type===si&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===tn||w.magFilter===pa||w.magFilter===xr||w.magFilter===Xn||w.minFilter===tn||w.minFilter===pa||w.minFilter===xr||w.minFilter===Xn)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,fe[w.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,fe[w.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,fe[w.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,tt[w.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,tt[w.minFilter]),w.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Be[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===en||w.minFilter!==xr&&w.minFilter!==Xn||w.type===si&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function nt(I,w){let Y=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",A),L(w));let pe=w.source,le=h.get(pe);le===void 0&&(le={},h.set(pe,le));let Me=G(w);if(Me!==I.__cacheKey){le[Me]===void 0&&(le[Me]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),le[Me].usedTimes++;let we=le[I.__cacheKey];we!==void 0&&(le[I.__cacheKey].usedTimes--,we.usedTimes===0&&X(w)),I.__cacheKey=Me,I.__webglTexture=le[Me].texture}return Y}function oe(I,w,Y){return Math.floor(Math.floor(I/Y)/w)}function ge(I,w,Y,pe){let Me=I.updateRanges;if(Me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,Y,pe,w.data);else{Me.sort((F,re)=>F.start-re.start);let we=0;for(let F=1;F<Me.length;F++){let re=Me[we],ne=Me[F],Te=re.start+re.count,ce=oe(ne.start,w.width,4),ve=oe(re.start,w.width,4);ne.start<=Te+1&&ce===ve&&oe(ne.start+ne.count-1,w.width,4)===ce?re.count=Math.max(re.count,ne.start+ne.count-re.start):(++we,Me[we]=ne)}Me.length=we+1;let ie=t.getParameter(i.UNPACK_ROW_LENGTH),ae=t.getParameter(i.UNPACK_SKIP_PIXELS),be=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let F=0,re=Me.length;F<re;F++){let ne=Me[F],Te=Math.floor(ne.start/4),ce=Math.ceil(ne.count/4),ve=Te%w.width,ke=Math.floor(Te/w.width),rt=ce,de=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),t.pixelStorei(i.UNPACK_SKIP_ROWS,ke),t.texSubImage2D(i.TEXTURE_2D,0,ve,ke,rt,de,Y,pe,w.data)}I.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ie),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ae),t.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function ye(I,w,Y){let pe=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(pe=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(pe=i.TEXTURE_3D);let le=nt(I,w),Me=w.source;t.bindTexture(pe,I.__webglTexture,i.TEXTURE0+Y);let we=n.get(Me);if(Me.version!==we.__version||le===!0){if(t.activeTexture(i.TEXTURE0+Y),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let de=dt.getPrimaries(dt.workingColorSpace),qe=w.colorSpace===fs?null:dt.getPrimaries(w.colorSpace),at=w.colorSpace===fs||de===qe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,at)}t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let ae=v(w.image,!1,s.maxTextureSize);ae=Xe(w,ae);let be=r.convert(w.format,w.colorSpace),F=r.convert(w.type),re=b(w.internalFormat,be,F,w.normalized,w.colorSpace,w.isVideoTexture);$e(pe,w);let ne,Te=w.mipmaps,ce=w.isVideoTexture!==!0,ve=we.__version===void 0||le===!0,ke=Me.dataReady,rt=S(w,ae);if(w.isDepthTexture)re=M(w.format===us,w.type),ve&&(ce?t.texStorage2D(i.TEXTURE_2D,1,re,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,re,ae.width,ae.height,0,be,F,null));else if(w.isDataTexture)if(Te.length>0){ce&&ve&&t.texStorage2D(i.TEXTURE_2D,rt,re,Te[0].width,Te[0].height);for(let de=0,qe=Te.length;de<qe;de++)ne=Te[de],ce?ke&&t.texSubImage2D(i.TEXTURE_2D,de,0,0,ne.width,ne.height,be,F,ne.data):t.texImage2D(i.TEXTURE_2D,de,re,ne.width,ne.height,0,be,F,ne.data);w.generateMipmaps=!1}else ce?(ve&&t.texStorage2D(i.TEXTURE_2D,rt,re,ae.width,ae.height),ke&&ge(w,ae,be,F)):t.texImage2D(i.TEXTURE_2D,0,re,ae.width,ae.height,0,be,F,ae.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ce&&ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,rt,re,Te[0].width,Te[0].height,ae.depth);for(let de=0,qe=Te.length;de<qe;de++)if(ne=Te[de],w.format!==ui)if(be!==null)if(ce){if(ke)if(w.layerUpdates.size>0){let at=ff(ne.width,ne.height,w.format,w.type);for(let J of w.layerUpdates){let We=ne.data.subarray(J*at/ne.data.BYTES_PER_ELEMENT,(J+1)*at/ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,J,ne.width,ne.height,1,be,We)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,0,ne.width,ne.height,ae.depth,be,ne.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,de,re,ne.width,ne.height,ae.depth,0,ne.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ce?ke&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,0,ne.width,ne.height,ae.depth,be,F,ne.data):t.texImage3D(i.TEXTURE_2D_ARRAY,de,re,ne.width,ne.height,ae.depth,0,be,F,ne.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{ce&&ve&&t.texStorage2D(i.TEXTURE_2D,rt,re,Te[0].width,Te[0].height);for(let de=0,qe=Te.length;de<qe;de++)ne=Te[de],w.format!==ui?be!==null?ce?ke&&t.compressedTexSubImage2D(i.TEXTURE_2D,de,0,0,ne.width,ne.height,be,ne.data):t.compressedTexImage2D(i.TEXTURE_2D,de,re,ne.width,ne.height,0,ne.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?ke&&t.texSubImage2D(i.TEXTURE_2D,de,0,0,ne.width,ne.height,be,F,ne.data):t.texImage2D(i.TEXTURE_2D,de,re,ne.width,ne.height,0,be,F,ne.data)}else if(w.isDataArrayTexture)if(ce){if(ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,rt,re,ae.width,ae.height,ae.depth),ke)if(w.layerUpdates.size>0){let de=ff(ae.width,ae.height,w.format,w.type);for(let qe of w.layerUpdates){let at=ae.data.subarray(qe*de/ae.data.BYTES_PER_ELEMENT,(qe+1)*de/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,qe,ae.width,ae.height,1,be,F,at)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,be,F,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,re,ae.width,ae.height,ae.depth,0,be,F,ae.data);else if(w.isData3DTexture)ce?(ve&&t.texStorage3D(i.TEXTURE_3D,rt,re,ae.width,ae.height,ae.depth),ke&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,be,F,ae.data)):t.texImage3D(i.TEXTURE_3D,0,re,ae.width,ae.height,ae.depth,0,be,F,ae.data);else if(w.isFramebufferTexture){if(ve)if(ce)t.texStorage2D(i.TEXTURE_2D,rt,re,ae.width,ae.height);else{let de=ae.width,qe=ae.height;for(let at=0;at<rt;at++)t.texImage2D(i.TEXTURE_2D,at,re,de,qe,0,be,F,null),de>>=1,qe>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){let de=i.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),ae.parentNode!==de){de.appendChild(ae),d.add(w),de.onpaint=qe=>{let at=qe.changedElements;for(let J of d)at.includes(J.image)&&(J.needsUpdate=!0)},de.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ae);else{let at=i.RGBA,J=i.RGBA,We=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,at,J,We,ae)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Te.length>0){if(ce&&ve){let de=Je(Te[0]);t.texStorage2D(i.TEXTURE_2D,rt,re,de.width,de.height)}for(let de=0,qe=Te.length;de<qe;de++)ne=Te[de],ce?ke&&t.texSubImage2D(i.TEXTURE_2D,de,0,0,be,F,ne):t.texImage2D(i.TEXTURE_2D,de,re,be,F,ne);w.generateMipmaps=!1}else if(ce){if(ve){let de=Je(ae);t.texStorage2D(i.TEXTURE_2D,rt,re,de.width,de.height)}ke&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,be,F,ae)}else t.texImage2D(i.TEXTURE_2D,0,re,be,F,ae);_(w)&&w.mipmapsAutoUpdate===!0&&y(pe),we.__version=Me.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Ie(I,w,Y){if(w.image.length!==6)return;let pe=nt(I,w),le=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+Y);let Me=n.get(le);if(le.version!==Me.__version||pe===!0){t.activeTexture(i.TEXTURE0+Y);let we=dt.getPrimaries(dt.workingColorSpace),ie=w.colorSpace===fs?null:dt.getPrimaries(w.colorSpace),ae=w.colorSpace===fs||we===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let be=w.isCompressedTexture||w.image[0].isCompressedTexture,F=w.image[0]&&w.image[0].isDataTexture,re=[];for(let J=0;J<6;J++)!be&&!F?re[J]=v(w.image[J],!0,s.maxCubemapSize):re[J]=F?w.image[J].image:w.image[J],re[J]=Xe(w,re[J]);let ne=re[0],Te=r.convert(w.format,w.colorSpace),ce=r.convert(w.type),ve=b(w.internalFormat,Te,ce,w.normalized,w.colorSpace),ke=w.isVideoTexture!==!0,rt=Me.__version===void 0||pe===!0,de=le.dataReady,qe=S(w,ne);$e(i.TEXTURE_CUBE_MAP,w);let at;if(w.isDepthTexture){if(ve=M(w.format===us,w.type),rt)if(ke)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ve,ne.width,ne.height);else for(let J=0;J<6;J++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ve,ne.width,ne.height,0,Te,ce,null)}else if(be){ke&&rt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,ve,ne.width,ne.height);for(let J=0;J<6;J++){at=re[J].mipmaps;for(let We=0;We<at.length;We++){let Nt=at[We];w.format!==ui?Te!==null?ke?de&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We,0,0,Nt.width,Nt.height,Te,Nt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We,ve,Nt.width,Nt.height,0,Nt.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We,0,0,Nt.width,Nt.height,Te,ce,Nt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We,ve,Nt.width,Nt.height,0,Te,ce,Nt.data)}}}else{if(at=w.mipmaps,ke&&rt){at.length>0&&qe++;let J=Je(re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,ve,J.width,J.height)}for(let J=0;J<6;J++)if(F){ke?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,re[J].width,re[J].height,Te,ce,re[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ve,re[J].width,re[J].height,0,Te,ce,re[J].data);for(let We=0;We<at.length;We++){let Ri=at[We].image[J].image;ke?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We+1,0,0,Ri.width,Ri.height,Te,ce,Ri.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We+1,ve,Ri.width,Ri.height,0,Te,ce,Ri.data)}}else{ke?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Te,ce,re[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ve,Te,ce,re[J]);for(let We=0;We<at.length;We++){let Nt=at[We];ke?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We+1,0,0,Te,ce,Nt.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,We+1,ve,Te,ce,Nt.image[J])}}}_(w)&&w.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),Me.__version=le.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Se(I,w,Y,pe,le,Me){let we=r.convert(Y.format,Y.colorSpace),ie=r.convert(Y.type),ae=b(Y.internalFormat,we,ie,Y.normalized,Y.colorSpace),be=n.get(w),F=n.get(Y);if(F.__renderTarget=w,!be.__hasExternalTextures){let re=Math.max(1,w.width>>Me),ne=Math.max(1,w.height>>Me);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,Me,ae,re,ne,w.depth,0,we,ie,null):t.texImage2D(le,Me,ae,re,ne,0,we,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),Ee(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pe,le,F.__webglTexture,0,wt(w)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,pe,le,F.__webglTexture,Me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(I,w,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,I),w.depthBuffer){let pe=w.depthTexture,le=pe&&pe.isDepthTexture?pe.type:null,Me=M(w.stencilBuffer,le),we=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ee(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,wt(w),Me,w.width,w.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,wt(w),Me,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Me,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,I)}else{let pe=w.textures;for(let le=0;le<pe.length;le++){let Me=pe[le],we=r.convert(Me.format,Me.colorSpace),ie=r.convert(Me.type),ae=b(Me.internalFormat,we,ie,Me.normalized,Me.colorSpace);Ee(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,wt(w),ae,w.width,w.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,wt(w),ae,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ae,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(I,w,Y){let pe=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let le=n.get(w.depthTexture);le.__renderTarget=w;let Me=pe?w.depthTexture.image[0]:w.depthTexture.image;(!le.__webglTexture||Me.width!==w.width||Me.height!==w.height)&&(Me.width=w.width,Me.height=w.height,w.depthTexture.needsUpdate=!0),pe?Q(w.depthTexture,0):ee(w.depthTexture,0);let we=le.__webglTexture,ie=wt(w),ae=pe?i.TEXTURE_CUBE_MAP_POSITIVE_X+Y:i.TEXTURE_2D,be=w.depthTexture.format===us?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===es)Ee(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,be,ae,we,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,be,ae,we,0);else if(w.depthTexture.format===us)Ee(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,be,ae,we,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,be,ae,we,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(I){let w=n.get(I),Y=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){let pe=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),pe){let le=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,pe.removeEventListener("dispose",le)};pe.addEventListener("dispose",le),w.__depthDisposeCallback=le}w.__boundDepthTexture=pe}if(I.depthTexture&&!w.__autoAllocateDepthBuffer)if(Y)for(let pe=0;pe<6;pe++)Ue(w.__webglFramebuffer[pe],I,pe);else I.texture.mipmaps.length>0?Ue(w.__webglFramebuffer[0],I,0):Ue(w.__webglFramebuffer,I,0);else if(Y){w.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[pe]),w.__webglDepthbuffer[pe]===void 0)w.__webglDepthbuffer[pe]=i.createRenderbuffer(),je(w.__webglDepthbuffer[pe],I,!1);else{let le=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=w.__webglDepthbuffer[pe];i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,Me)}}else if(I.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),je(w.__webglDepthbuffer,I,!1);else{let le=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,Me)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(I,w,Y){let pe=n.get(I);w!==void 0&&Se(pe.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&st(I)}function yt(I){let w=I.texture,Y=n.get(I),pe=n.get(w);I.addEventListener("dispose",D),L(I);let le=I.textures,Me=I.isWebGLCubeRenderTarget===!0,we=le.length>1;if(we||(pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture()),pe.__version=w.version,a.memory.textures++),Me){Y.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(w.mipmaps.length>0){Y.__webglFramebuffer[ie]=[];for(let ae=0;ae<w.mipmaps.length;ae++)Y.__webglFramebuffer[ie][ae]=i.createFramebuffer()}else Y.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(w.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ie=0;ie<w.mipmaps.length;ie++)Y.__webglFramebuffer[ie]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(we)for(let ie=0,ae=le.length;ie<ae;ie++){let be=n.get(le[ie]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&Ee(I)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ie=0;ie<le.length;ie++){let ae=le[ie];Y.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ie]);let be=r.convert(ae.format,ae.colorSpace),F=r.convert(ae.type),re=b(ae.internalFormat,be,F,ae.normalized,ae.colorSpace,I.isXRRenderTarget===!0),ne=wt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,re,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),je(Y.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Me){t.bindTexture(i.TEXTURE_CUBE_MAP,pe.__webglTexture),$e(i.TEXTURE_CUBE_MAP,w);for(let ie=0;ie<6;ie++)if(w.mipmaps.length>0)for(let ae=0;ae<w.mipmaps.length;ae++)Se(Y.__webglFramebuffer[ie][ae],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ae);else Se(Y.__webglFramebuffer[ie],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);_(w)?y(i.TEXTURE_CUBE_MAP):w.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}else if(we){for(let ie=0,ae=le.length;ie<ae;ie++){let be=le[ie],F=n.get(be),re=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(re=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,F.__webglTexture),$e(re,be),Se(Y.__webglFramebuffer,I,be,i.COLOR_ATTACHMENT0+ie,re,0),_(be)&&y(re)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ie=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,pe.__webglTexture),$e(ie,w),w.mipmaps.length>0)for(let ae=0;ae<w.mipmaps.length;ae++)Se(Y.__webglFramebuffer[ae],I,w,i.COLOR_ATTACHMENT0,ie,ae);else Se(Y.__webglFramebuffer,I,w,i.COLOR_ATTACHMENT0,ie,0);_(w)?y(ie):w.mipmaps.length>0&&i.texParameteri(ie,i.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}I.depthBuffer&&st(I)}function z(I){let w=I.textures;for(let Y=0,pe=w.length;Y<pe;Y++){let le=w[Y];if(_(le)&&le.mipmapsAutoUpdate===!0){let Me=E(I),we=n.get(le).__webglTexture;t.bindTexture(Me,we),y(Me),t.unbindTexture()}}}let Qt=[];function ft(I){if(I.samples>0){if(Ee(I)===!1){let w=I.textures,Y=I.width,pe=I.height,le=i.COLOR_BUFFER_BIT,Me=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(I),ie=w.length>1;if(ie)for(let be=0;be<w.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),I.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let be=0;be<w.length;be++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[be]);let F=n.get(w[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,F,0)}i.blitFramebuffer(0,0,Y,pe,0,0,Y,pe,le,i.NEAREST),c===!0&&(Qt.length=0,Qt.push(i.COLOR_ATTACHMENT0+be),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&Qt.push(Me),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Qt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let be=0;be<w.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,we.__webglColorRenderbuffer[be]);let F=n.get(w[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,F,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){let w=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function wt(I){return Math.min(s.maxSamples,I.samples)}function Ee(I){let w=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Vt(I){let w=a.render.frame;u.get(I)!==w&&(u.set(I,w),I.update())}function Xe(I,w){let Y=I.colorSpace,pe=I.format,le=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||Y!==Un&&Y!==fs&&(dt.getTransfer(Y)===It?(pe!==ui||le!==qn)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",Y)),w}function Je(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=he,this.resetTextureUnits=U,this.getTextureUnits=R,this.setTextureUnits=O,this.setTexture2D=ee,this.setTexture2DArray=H,this.setTexture3D=q,this.setTextureCube=Q,this.rebindTextures=ct,this.setupRenderTarget=yt,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ee,this.dispose=V}function Vb(i,e){function t(n,s=fs){let r,a=dt.getTransfer(s);if(n===qn)return i.UNSIGNED_BYTE;if(n===Mc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===bc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Yu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Xu)return i.BYTE;if(n===qu)return i.SHORT;if(n===ma)return i.UNSIGNED_SHORT;if(n===yc)return i.INT;if(n===Si)return i.UNSIGNED_INT;if(n===si)return i.FLOAT;if(n===Ei)return i.HALF_FLOAT;if(n===Ku)return i.ALPHA;if(n===$u)return i.RGB;if(n===ui)return i.RGBA;if(n===es)return i.DEPTH_COMPONENT;if(n===us)return i.DEPTH_STENCIL;if(n===Sc)return i.RED;if(n===Ec)return i.RED_INTEGER;if(n===Ns)return i.RG;if(n===wc)return i.RG_INTEGER;if(n===Tc)return i.RGBA_INTEGER;if(n===Ao||n===Ro||n===Co||n===Po)if(a===It)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ac||n===Rc||n===Cc||n===Pc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ac)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Rc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Cc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ic||n===Lc||n===Nc||n===Dc||n===Uc||n===Io||n===Fc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ic||n===Lc)return a===It?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Nc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Dc)return r.COMPRESSED_R11_EAC;if(n===Uc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Io)return r.COMPRESSED_RG11_EAC;if(n===Fc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oc||n===Bc||n===kc||n===zc||n===Hc||n===Gc||n===Vc||n===Wc||n===Xc||n===qc||n===Yc||n===Zc||n===Kc||n===$c)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===kc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Hc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Gc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Vc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Yc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Zc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Kc)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$c)return a===It?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jc||n===jc||n===Qc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Jc)return a===It?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===eh||n===th||n===Lo||n===nh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===eh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===th)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Wb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xb=`
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

}`,Tf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ro(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Lt({vertexShader:Wb,fragmentShader:Xb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new Ut(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Af=class extends Ni{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,p=null,x=typeof XRWebGLBinding<"u",g=new Tf,m={},v=t.getContextAttributes(),_=null,y=null,E=[],b=[],M=new me,S=null,L=null,C=new fn;C.viewport=new gt;let A=new fn;A.viewport=new gt;let D=[C,A],B=new pc,P=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let ee=E[G];return ee===void 0&&(ee=new jr,E[G]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(G){let ee=E[G];return ee===void 0&&(ee=new jr,E[G]=ee),ee.getGripSpace()},this.getHand=function(G){let ee=E[G];return ee===void 0&&(ee=new jr,E[G]=ee),ee.getHandSpace()};function Z(G){let ee=b.indexOf(G.inputSource);if(ee===-1)return;let H=E[ee];H!==void 0&&(H.update(G.inputSource,G.frame,l||a),H.dispatchEvent({type:G.type,data:G.inputSource}))}function X(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",se);for(let G=0;G<E.length;G++){let ee=b[G];ee!==null&&(b[G]=null,E[G].disconnect(ee))}P=null,V=null,g.reset();for(let G in m)delete m[G];if(e.setRenderTarget(_),h=null,f=null,d=null,s=null,y=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(M.width,M.height,!1),L!==null){let G=L.camera;G.fov=L.fov,G.zoom=L.zoom,G.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(G){l=G},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(_=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",se),v.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(M),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let H=null,q=null,Q=null;v.depth&&(Q=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,H=v.stencil?us:es,q=v.stencil?vr:Si);let fe={colorFormat:t.RGBA8,depthFormat:Q,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(fe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new Qn(f.textureWidth,f.textureHeight,{format:ui,type:qn,depthTexture:new ts(f.textureWidth,f.textureHeight,q,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let H={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,H),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),y=new Qn(h.framebufferWidth,h.framebufferHeight,{format:ui,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),he.setContext(s),he.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function se(G){for(let ee=0;ee<G.removed.length;ee++){let H=G.removed[ee],q=b.indexOf(H);q>=0&&(b[q]=null,E[q].disconnect(H))}for(let ee=0;ee<G.added.length;ee++){let H=G.added[ee],q=b.indexOf(H);if(q===-1){for(let fe=0;fe<E.length;fe++)if(fe>=b.length){b.push(H),q=fe;break}else if(b[fe]===null){b[fe]=H,q=fe;break}if(q===-1)break}let Q=E[q];Q&&Q.connect(H)}}function W(G,ee){ee===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(ee.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let ee=G.near,H=G.far;g.texture!==null&&(g.depthNear>0&&(ee=g.depthNear),g.depthFar>0&&(H=g.depthFar)),B.near=A.near=C.near=ee,B.far=A.far=C.far=H,(P!==B.near||V!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),P=B.near,V=B.far),B.layers.mask=G.layers.mask|6,C.layers.mask=B.layers.mask&-5,A.layers.mask=B.layers.mask&-3;let q=G.parent,Q=B.cameras;W(B,q);for(let fe=0;fe<Q.length;fe++)W(Q[fe],q);B.projectionMatrix.copy(C.projectionMatrix),B.projectionMatrixInverse.copy(C.projectionMatrixInverse),L===null&&G.isPerspectiveCamera&&(L={camera:G,fov:G.fov,zoom:G.zoom}),U(G,B,q)};function U(G,ee,H){H===null?G.matrix.copy(ee.matrixWorld):(G.matrix.copy(H.matrixWorld),G.matrix.invert(),G.matrix.multiply(ee.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(ee.projectionMatrix),G.projectionMatrixInverse.copy(ee.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=ir*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(G){c=G,f!==null&&(f.fixedFoveation=G),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=G)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(G){return m[G]};let R=null;function O(G,ee){if(u=ee.getViewerPose(l||a),p=ee,u!==null){let H=u.views;h!==null&&(e.setRenderTargetFramebuffer(y,h.framebuffer),e.setRenderTarget(y));let q=!1;H.length!==B.cameras.length&&(B.cameras.length=0,q=!0);for(let Be=0;Be<H.length;Be++){let $e=H[Be],nt=null;if(h!==null)nt=h.getViewport($e);else{let ge=d.getViewSubImage(f,$e);nt=ge.viewport,Be===0&&(e.setRenderTargetTextures(y,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(y))}let oe=D[Be];oe===void 0&&(oe=new fn,oe.layers.enable(Be),oe.viewport=new gt,D[Be]=oe),oe.matrix.fromArray($e.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray($e.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(nt.x,nt.y,nt.width,nt.height),Be===0&&(B.matrix.copy(oe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),q===!0&&B.cameras.push(oe)}let Q=s.enabledFeatures;if(Q&&Q.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let Be=d.getDepthInformation(H[0]);Be&&Be.isValid&&Be.texture&&g.init(Be,s.renderState)}if(Q&&Q.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let Be=0;Be<H.length;Be++){let $e=H[Be].camera;if($e){let nt=m[$e];nt||(nt=new ro,m[$e]=nt);let oe=d.getCameraImage($e);nt.sourceTexture=oe}}}}for(let H=0;H<E.length;H++){let q=b[H],Q=E[H];q!==null&&Q!==void 0&&Q.update(q,ee,l||a)}R&&R(G,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),p=null}let he=new wm;he.setAnimationLoop(O),this.setAnimationLoop=function(G){R=G},this.dispose=function(){}}},qb=new Ge,Um=new et;Um.set(-1,0,0,0,1,0,0,0,1);function Yb(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,cf(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,v,_,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&h(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,v,_):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===zn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===zn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let v=e.get(m),_=v.envMap,y=v.envMapRotation;_&&(g.envMap.value=_,g.envMapRotation.value.setFromMatrix4(qb.makeRotationFromEuler(y)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Um),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,_){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=_*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function h(g,m,v){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===zn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zb(i,e,t,n){let s={},r={};function a(v,_){let y=_.program;n.uniformBlockBinding(v,y,s[v.id])}function o(v,_){let y=s[v.id];y===void 0&&(p(v),y=c(v),s[v.id]=y,v.addEventListener("dispose",g));let E=_.program;n.updateUBOMapping(v,E);let b=e.render.frame;r[v.id]!==b&&(l(v),r[v.id]=b)}function c(v){let _=i.createBuffer(),y=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,y,E),i.bindBuffer(i.UNIFORM_BUFFER,null),_}function l(v){let _=s[v.id],y=v.uniforms,E=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let b=0,M=y.length;b<M;b++){let S=y[b];if(Array.isArray(S))for(let L=0,C=S.length;L<C;L++)u(S[L],b,L,E);else u(S,b,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(v,_,y,E){if(f(v,_,y,E)===!0){let b=v.__offset,M=v.value;if(Array.isArray(M)){let S=0;for(let L=0;L<M.length;L++){let C=M[L],A=x(C,!0);d(C,v.__data,S),S+=A.storage/Float32Array.BYTES_PER_ELEMENT}}else d(M,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,b,v.__data)}}function d(v,_,y){typeof v=="number"||typeof v=="boolean"?_[y]=v:v.isMatrix3?(_[y]=v.elements[0],_[y+1]=v.elements[1],_[y+2]=v.elements[2],_[y+3]=0,_[y+4]=v.elements[3],_[y+5]=v.elements[4],_[y+6]=v.elements[5],_[y+7]=0,_[y+8]=v.elements[6],_[y+9]=v.elements[7],_[y+10]=v.elements[8],_[y+11]=0):ArrayBuffer.isView(v)?_.set(v.subarray(0,_.length-y),y):v.toArray(_,y)}function f(v,_,y,E){let b=v.value,M=_+"_"+y;if(Array.isArray(b)){E[M]===void 0&&(E[M]=[]);let S=E[M],L=!1;for(let C=0;C<b.length;C++)h(b[C],S,C)===!0&&(L=!0);return L}return h(b,E,M)}function h(v,_,y){if(_[y]===void 0)return typeof v=="number"||typeof v=="boolean"?_[y]=v:ArrayBuffer.isView(v)?_[y]=v.slice():_[y]=v.clone(),!0;{let E=_[y];if(typeof v=="number"||typeof v=="boolean"){if(E!==v)return _[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(E.equals(v)===!1)return E.copy(v),!0}}return!1}function p(v){let _=v.uniforms,y=0,E=16;for(let M=0,S=_.length;M<S;M++){let L=Array.isArray(_[M])?_[M]:[_[M]];for(let C=0,A=L.length;C<A;C++){let D=L[C],B=Array.isArray(D.value)?D.value:[D.value],P=Array.isArray(_[M])||Array.isArray(D.value),V=y;for(let X=0,se=B.length;X<se;X++){let W=B[X],U=x(W,P),R=y%E,O=R%U.boundary,he=R+O;y+=O,he!==0&&E-he<U.storage&&(y+=E-he),X===0&&(V=y),y+=U.storage}let Z=D.type==="int"?Int32Array:D.type==="uint"?Uint32Array:Float32Array;D.__data=new Z((y-V)/Float32Array.BYTES_PER_ELEMENT),D.__offset=V}}let b=y%E;return b>0&&(y+=E-b),v.__size=y,v.__cache={},this}function x(v,_){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):He("WebGLRenderer: Unsupported uniform value type.",v),_===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function g(v){let _=v.target;_.removeEventListener("dispose",g),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function m(){for(let v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:m}}var Kb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bi=null;function $b(){return Bi===null&&(Bi=new na(Kb,16,16,Ns,Ei),Bi.name="DFG_LUT",Bi.minFilter=tn,Bi.magFilter=tn,Bi.wrapS=li,Bi.wrapT=li,Bi.generateMipmaps=!1,Bi.needsUpdate=!0),Bi}var oh=class{constructor(e={}){let{canvas:t=qp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=qn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=h,g=new Set([Tc,wc,Ec]),m=new Set([qn,Si,ma,vr,Mc,bc]),v=new Uint32Array(4),_=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},E=null,b=null,M=[],S=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,A=!1,D=null,B=null,P=null,V=null;this._outputColorSpace=Mt;let Z=0,X=0,se=null,W=-1,U=null,R=new gt,O=new gt,he=null,G=new _e(0),ee=0,H=t.width,q=t.height,Q=1,fe=null,tt=null,Be=new gt(0,0,H,q),$e=new gt(0,0,H,q),nt=!1,oe=new As,ge=new $l,ye=!1,Ie=!1,Se=new Ge,je=new N,Ue=new gt,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ct=!1;function yt(){return se===null?Q:1}let z=n;function Qt(T,k){return t.getContext(T,k)}let ft,wt,Ee,Vt,Xe,Je,I,w,Y,pe,le,Me,we,ie,ae,be,F,re,ne,Te,ce,ve,ke;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",qe,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",J,!1),z===null){let k="webgl2";if(z=Qt(k,T),z===null)throw Qt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}rt()}catch(T){throw t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",J,!1),Qe("WebGLRenderer: "+T.message),T}function rt(){ft=new oM(z),ft.init(),ce=new Vb(z,ft),wt=new $y(z,ft,e,ce),Ee=new Hb(z,ft),wt.reversedDepthBuffer&&f&&Ee.buffers.depth.setReversed(!0),B=z.createFramebuffer(),P=z.createFramebuffer(),V=z.createFramebuffer(),Vt=new hM(z),Xe=new Ab,Je=new Gb(z,ft,Ee,Xe,wt,ce,Vt),I=new aM(C),w=new fv(z),ve=new Zy(z,w),Y=new lM(z,w,Vt,ve),pe=new fM(z,Y,w,ve,Vt),re=new uM(z,wt,Je),ae=new Jy(Xe),le=new Tb(C,I,ft,wt,ve,ae),Me=new Yb(C,Xe),we=new Cb,ie=new Ub(ft),F=new Yy(C,I,Ee,pe,p,c),be=new zb(C,pe,wt),ke=new Zb(z,Vt,wt,Ee),ne=new Ky(z,ft,Vt),Te=new cM(z,ft,Vt),Vt.programs=le.programs,C.capabilities=wt,C.extensions=ft,C.properties=Xe,C.renderLists=we,C.shadowMap=be,C.state=Ee,C.info=Vt}x!==qn&&(L=new pM(x,t.width,t.height,o,s,r));let de=new Af(C,z);this.xr=de,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let T=ft.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ft.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(T){T!==void 0&&(Q=T,this.setSize(H,q,!1))},this.getSize=function(T){return T.set(H,q)},this.setSize=function(T,k,j=!0){if(de.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,q=k,t.width=Math.floor(T*Q),t.height=Math.floor(k*Q),j===!0&&(t.style.width=T+"px",t.style.height=k+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(H*Q,q*Q).floor()},this.setDrawingBufferSize=function(T,k,j){H=T,q=k,Q=j,t.width=Math.floor(T*j),t.height=Math.floor(k*j),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(x===qn){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(R)},this.getViewport=function(T){return T.copy(Be)},this.setViewport=function(T,k,j,K){T.isVector4?Be.set(T.x,T.y,T.z,T.w):Be.set(T,k,j,K),Ee.viewport(R.copy(Be).multiplyScalar(yt()).round())},this.getScissor=function(T){return T.copy($e)},this.setScissor=function(T,k,j,K){T.isVector4?$e.set(T.x,T.y,T.z,T.w):$e.set(T,k,j,K),Ee.scissor(O.copy($e).multiplyScalar(yt()).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(T){Ee.setScissorTest(nt=T)},this.setOpaqueSort=function(T){fe=T},this.setTransparentSort=function(T){tt=T},this.getClearColor=function(T){return T.copy(F.getClearColor())},this.setClearColor=function(){F.setClearColor(...arguments)},this.getClearAlpha=function(){return F.getClearAlpha()},this.setClearAlpha=function(){F.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,j=!0){let K=0;if(T){let $=!1;if(se!==null){let Re=se.texture.format;$=g.has(Re)}if($){let Re=se.texture.type,De=m.has(Re),Ae=F.getClearColor(),Le=F.getClearAlpha(),ze=Ae.r,it=Ae.g,xt=Ae.b;De?(v[0]=ze,v[1]=it,v[2]=xt,v[3]=Le,z.clearBufferuiv(z.COLOR,0,v)):(_[0]=ze,_[1]=it,_[2]=xt,_[3]=Le,z.clearBufferiv(z.COLOR,0,_))}else K|=z.COLOR_BUFFER_BIT}k&&(K|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(K|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&z.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),D=T},this.dispose=function(){t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",J,!1),F.dispose(),we.dispose(),ie.dispose(),Je.dispose(),Xe.dispose(),I.dispose(),pe.dispose(),Y.dispose(),ve.dispose(),ke.dispose(),le.dispose(),de.dispose(),de.removeEventListener("sessionstart",Yd),de.removeEventListener("sessionend",Zd),Vs.stop()};function qe(T){T.preventDefault(),Ya("WebGLRenderer: Context Lost."),A=!0}function at(){Ya("WebGLRenderer: Context Restored."),A=!1;let T=Vt.autoReset,k=be.enabled,j=be.autoUpdate,K=be.needsUpdate,$=be.type;rt(),Vt.autoReset=T,be.enabled=k,be.autoUpdate=j,be.needsUpdate=K,be.type=$}function J(T){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function We(T){let k=T.target;k.removeEventListener("dispose",We),Nt(k)}function Nt(T){Ri(T),Xe.remove(T)}function Ri(T){let k=Xe.get(T).programs;k!==void 0&&(k.forEach(function(j){le.releaseProgram(j)}),T.isShaderMaterial&&le.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,j,K,$,Re){k===null&&(k=st);let De=$.isMesh&&$.matrixWorld.determinantAffine()<0,Ae=w1(T,k,j,K,$);Ee.setMaterial(K,De);let Le=j.index,ze=1;if(K.wireframe===!0){if(Le=Y.getWireframeAttribute(j),Le===void 0)return;ze=2}let it=j.drawRange,xt=j.attributes.position,Fe=it.start*ze,vt=(it.start+it.count)*ze;Re!==null&&(Fe=Math.max(Fe,Re.start*ze),vt=Math.min(vt,(Re.start+Re.count)*ze)),Le!==null?(Fe=Math.max(Fe,0),vt=Math.min(vt,Le.count)):xt!=null&&(Fe=Math.max(Fe,0),vt=Math.min(vt,xt.count));let on=vt-Fe;if(on<0||on===1/0)return;ve.setup($,K,Ae,j,Le);let Gt,Bt=ne;if(Le!==null&&(Gt=w.get(Le),Bt=Te,Bt.setIndex(Gt)),$.isMesh)K.wireframe===!0?(Ee.setLineWidth(K.wireframeLinewidth*yt()),Bt.setMode(z.LINES)):Bt.setMode(z.TRIANGLES);else if($.isLine){let Tn=K.linewidth;Tn===void 0&&(Tn=1),Ee.setLineWidth(Tn*yt()),$.isLineSegments?Bt.setMode(z.LINES):$.isLineLoop?Bt.setMode(z.LINE_LOOP):Bt.setMode(z.LINE_STRIP)}else $.isPoints?Bt.setMode(z.POINTS):$.isSprite&&Bt.setMode(z.TRIANGLES);if($.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))Bt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Tn=$._multiDrawStarts,Oe=$._multiDrawCounts,Nn=$._multiDrawCount,Rt=Le?w.get(Le).bytesPerElement:1,Ws=Xe.get(K).currentProgram.getUniforms();for(let An=0;An<Nn;An++)Ws.setValue(z,"_gl_DrawID",An),Bt.render(Tn[An]/Rt,Oe[An])}else if($.isInstancedMesh)Bt.renderInstances(Fe,on,$.count);else if(j.isInstancedBufferGeometry){let Tn=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Oe=Math.min(j.instanceCount,Tn);Bt.renderInstances(Fe,on,Oe)}else Bt.render(Fe,on)};function qd(T,k,j,K){D!==null&&T.isNodeMaterial&&D.setObject(K,T),ye===!0&&ae.setState(T,j,!1),T.transparent===!0&&T.side===qt&&T.forceSinglePass===!1?(T.side=zn,T.needsUpdate=!0,Ca(T,k,K),T.side=hi,T.needsUpdate=!0,Ca(T,k,K),T.side=qt):Ca(T,k,K)}this.compile=function(T,k,j=null){j===null&&(j=T),D!==null&&D.renderStart(T,k,j),b=ie.get(j),b.init(k),S.push(b),j.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),T!==j&&T.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),b.setupLights(),D!==null&&D.updateLights(b.state.lightsArray),Ie=this.localClippingEnabled,ye=ae.init(this.clippingPlanes,Ie),ye===!0&&ae.setGlobalState(this.clippingPlanes,k),D!==null&&be.render(b.state.shadowsArray,j,k);let K=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let Re=$.material;if(Re)if(Array.isArray(Re))for(let De=0;De<Re.length;De++){let Ae=Re[De];qd(Ae,j,k,$),K.add(Ae)}else qd(Re,j,k,$),K.add(Re)}),b=S.pop(),D!==null&&D.renderEnd(),K},this.compileAsync=function(T,k,j=null){let K=this.compile(T,k,j);return new Promise($=>{function Re(){if(K.forEach(function(De){let Le=Xe.get(De).currentProgram;(Le===void 0||Le.isReady())&&K.delete(De)}),K.size===0){$(T);return}setTimeout(Re,10)}ft.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Ih=null;function S1(T){Ih&&Ih(T)}function Yd(){Vs.stop()}function Zd(){Vs.start()}let Vs=new wm;Vs.setAnimationLoop(S1),typeof self<"u"&&Vs.setContext(self),this.setAnimationLoop=function(T){Ih=T,de.setAnimationLoop(T),T===null?Vs.stop():Vs.start()},de.addEventListener("sessionstart",Yd),de.addEventListener("sessionend",Zd),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;D!==null&&D.renderStart(T,k);let j=de.enabled===!0&&de.isPresenting===!0,K=L!==null&&(se===null||j)&&L.begin(C,se);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(de.cameraAutoUpdate===!0&&de.updateCamera(k),k=de.getCamera()),T.isScene===!0&&T.onBeforeRender(C,T,k,se),b=ie.get(T,S.length),b.init(k),b.state.textureUnits=Je.getTextureUnits(),S.push(b),Se.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),k.isArrayCamera?ge.setFromArrayCamera(k):oe.setFromProjectionMatrix(Se,ci,k.reversedDepth),Ie=this.localClippingEnabled,ye=ae.init(this.clippingPlanes,Ie),E=we.get(T,M.length),E.init(),M.push(E),this.info.render.frame++,de.enabled===!0&&de.isPresenting===!0){let De=C.xr.getDepthSensingMesh();De!==null&&Lh(De,k,-1/0,C.sortObjects)}Lh(T,k,0,C.sortObjects),E.finish(),D!==null&&D.updateLights(b.state.lightsArray),C.sortObjects===!0&&E.sort(fe,tt),ct=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,ct&&F.addToRenderList(E,T),this.info.autoReset===!0&&this.info.reset(),ye===!0&&ae.beginShadows();let $=b.state.shadowsArray;if(be.render($,T,k),ye===!0&&ae.endShadows(),(K&&L.hasRenderPass())===!1){let De=E.opaque,Ae=E.transmissive;if(b.setupLights(),k.isArrayCamera){let Le=k.cameras;if(Ae.length>0)for(let ze=0,it=Le.length;ze<it;ze++){let xt=Le[ze];$d(De,Ae,T,xt)}ct&&F.render(T);for(let ze=0,it=Le.length;ze<it;ze++){let xt=Le[ze];Kd(E,T,xt,xt.viewport)}}else Ae.length>0&&$d(De,Ae,T,k),ct&&F.render(T),Kd(E,T,k)}se!==null&&X===0&&(Je.updateMultisampleRenderTarget(se),Je.updateRenderTargetMipmap(se)),K&&L.end(C),T.isScene===!0&&T.onAfterRender(C,T,k),ve.resetDefaultState(),W=-1,U=null,S.pop(),S.length>0?(b=S[S.length-1],Je.setTextureUnits(b.state.textureUnits),ye===!0&&ae.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,M.pop(),M.length>0?E=M[M.length-1]:E=null,D!==null&&D.renderEnd()};function Lh(T,k,j,K){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){let De=k.isArrayCamera?ge:oe;if(!T.frustumCulled||T.intersectsFrustum(De)){K&&Ue.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Se);let Ae=pe.update(T),Le=T.material;Le.visible&&E.push(T,Ae,Le,j,Ue.z,null,k)}}else if(T.isMesh||T.isLine||T.isPoints){let De=k.isArrayCamera?ge:oe;if(!T.frustumCulled||T.intersectsFrustum(De)){let Ae=pe.update(T),Le=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ue.copy(T.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ue.copy(Ae.boundingSphere.center)),Ue.applyMatrix4(T.matrixWorld).applyMatrix4(Se)),Array.isArray(Le)){let ze=Ae.groups;for(let it=0,xt=ze.length;it<xt;it++){let Fe=ze[it],vt=Le[Fe.materialIndex];vt&&vt.visible&&E.push(T,Ae,vt,j,Ue.z,Fe,k)}}else Le.visible&&E.push(T,Ae,Le,j,Ue.z,null,k)}}}let Re=T.children;for(let De=0,Ae=Re.length;De<Ae;De++)Lh(Re[De],k,j,K)}function Kd(T,k,j,K){let{opaque:$,transmissive:Re,transparent:De}=T;b.setupLightsView(j),ye===!0&&ae.setGlobalState(C.clippingPlanes,j),K&&Ee.viewport(R.copy(K)),$.length>0&&Qo($,k,j),Re.length>0&&Qo(Re,k,j),De.length>0&&Qo(De,k,j),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function $d(T,k,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[K.id]===void 0){let Fe=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[K.id]=new Qn(1,1,{generateMipmaps:!0,type:Fe?Ei:qn,minFilter:Xn,samples:Math.max(4,wt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:dt.workingColorSpace})}let Re=b.state.transmissionRenderTarget[K.id],De=K.viewport||R;Re.setSize(De.z*C.transmissionResolutionScale,De.w*C.transmissionResolutionScale);let Ae=C.getRenderTarget(),Le=C.getActiveCubeFace(),ze=C.getActiveMipmapLevel();C.setRenderTarget(Re),C.getClearColor(G),ee=C.getClearAlpha(),ee<1&&C.setClearColor(16777215,.5),C.clear(),ct&&F.render(j);let it=C.toneMapping;C.toneMapping=Oi;let xt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),b.setupLightsView(K),ye===!0&&ae.setGlobalState(C.clippingPlanes,K),Qo(T,j,K),Je.updateMultisampleRenderTarget(Re),Je.updateRenderTargetMipmap(Re),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let vt=0,on=k.length;vt<on;vt++){let Gt=k[vt],{object:Bt,geometry:Tn,material:Oe,group:Nn}=Gt;if(Oe.side===qt&&Bt.layers.test(K.layers)){let Rt=Oe.side;Oe.side=zn,Oe.needsUpdate=!0,Jd(Bt,j,K,Tn,Oe,Nn),Oe.side=Rt,Oe.needsUpdate=!0,Fe=!0}}Fe===!0&&(Je.updateMultisampleRenderTarget(Re),Je.updateRenderTargetMipmap(Re))}C.setRenderTarget(Ae,Le,ze),C.setClearColor(G,ee),xt!==void 0&&(K.viewport=xt),C.toneMapping=it}function Qo(T,k,j){let K=k.isScene===!0?k.overrideMaterial:null;for(let $=0,Re=T.length;$<Re;$++){let De=T[$],{object:Ae,geometry:Le,group:ze}=De,it=De.material;it.allowOverride===!0&&K!==null&&(it=K),Ae.layers.test(j.layers)&&Jd(Ae,k,j,Le,it,ze)}}function Jd(T,k,j,K,$,Re){D!==null&&$.isNodeMaterial&&D.setObject(T,$),T.onBeforeRender(C,k,j,K,$,Re),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(C,k,j,K,T,Re),$.transparent===!0&&$.side===qt&&$.forceSinglePass===!1?($.side=zn,$.needsUpdate=!0,C.renderBufferDirect(j,k,K,$,T,Re),$.side=hi,$.needsUpdate=!0,C.renderBufferDirect(j,k,K,$,T,Re),$.side=qt):C.renderBufferDirect(j,k,K,$,T,Re),T.onAfterRender(C,k,j,K,$,Re)}function jd(T){let k=0;for(let j of T)j.texture!==null&&k++;return k}function Ca(T,k,j){k.isScene!==!0&&(k=st);let K=Xe.get(T),$=b.state.lights,Re=b.state.shadowsArray,De=$.state.version,Ae=le.getParameters(T,$.state,Re,k,j,b.state.lightProbeGridArray),Le=le.getProgramCacheKey(Ae),ze=K.programs;K.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,K.fog=k.fog;let it=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;K.envMap=I.get(T.envMap||K.environment,it),K.envMapRotation=K.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",We),ze=new Map,K.programs=ze,K.programVariants=new Map);let xt=ze.get(Le);if(xt!==void 0){if(K.currentProgram===xt&&K.lightsStateVersion===De)return e0(T,Ae),xt}else Ae.uniforms=le.getUniforms(T),D!==null&&T.isNodeMaterial&&D.build(T,j,Ae),T.onBeforeCompile(Ae,C),xt=le.acquireProgram(Ae,Le),ze.set(Le,xt),K.uniforms=Ae.uniforms;let Fe=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=ae.uniform),e0(T,Ae),K.needsLights=A1(T),K.lightsStateVersion=De,K.needsLights&&(Fe.ambientLightColor.value=$.state.ambient,Fe.lightProbe.value=$.state.probe,Fe.sunLights.value=$.state.sun,Fe.sunLightShadows.value=$.state.sunShadow,Fe.directionalLights.value=$.state.directional,Fe.directionalLightShadows.value=$.state.directionalShadow,Fe.spotLights.value=$.state.spot,Fe.spotLightShadows.value=$.state.spotShadow,Fe.rectAreaLights.value=$.state.rectArea,Fe.ltc_1.value=$.state.rectAreaLTC1,Fe.ltc_2.value=$.state.rectAreaLTC2,Fe.pointLights.value=$.state.point,Fe.pointLightShadows.value=$.state.pointShadow,Fe.hemisphereLights.value=$.state.hemi,Fe.sunShadowMatrix.value=$.state.sunShadowMatrix,Fe.sunShadowCascade.value=$.state.sunShadowCascade,Fe.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Fe.spotLightMatrix.value=$.state.spotLightMatrix,Fe.spotLightMap.value=$.state.spotLightMap,Fe.pointShadowMatrix.value=$.state.pointShadowMatrix),K.numLightProbeGrids=jd(b.state.lightProbeGridArray),K.currentProgram=xt,K.uniformsList=null,xt}function E1(T,k,j,K,$){let Re=Xe.get(T),De=Re.currentProgram.id+","+K+","+$,Ae=Re.programVariants.get(De);return Ae===void 0?(Ae=Ca(T,k,j),Re.programVariants.set(De,Ae)):(Re.currentProgram=Ae,Re.uniformsList=null,Re.outputColorSpace=K,Re.toneMapping=$),Ae}function Qd(T){if(T.uniformsList===null){let k=T.currentProgram.getUniforms();T.uniformsList=xa.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function e0(T,k){let j=Xe.get(T);j.outputColorSpace=k.outputColorSpace,j.batching=k.batching,j.batchingColor=k.batchingColor,j.instancing=k.instancing,j.instancingColor=k.instancingColor,j.instancingMorph=k.instancingMorph,j.skinning=k.skinning,j.morphTargets=k.morphTargets,j.morphNormals=k.morphNormals,j.morphColors=k.morphColors,j.morphTargetsCount=k.morphTargetsCount,j.numClippingPlanes=k.numClippingPlanes,j.numIntersection=k.numClipIntersection,j.vertexAlphas=k.vertexAlphas,j.vertexTangents=k.vertexTangents,j.toneMapping=k.toneMapping}function w1(T,k,j,K,$){k.isScene!==!0&&(k=st),Je.resetTextureUnits();let Re=k.fog,De=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?k.environment:null,Ae=se===null?C.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:dt.workingColorSpace,Le=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,ze=I.get(K.envMap||De,Le),it=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,xt=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Fe=!!j.morphAttributes.position,vt=!!j.morphAttributes.normal,on=!!j.morphAttributes.color,Gt=Oi;K.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Gt=C.toneMapping);let Bt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Tn=Bt!==void 0?Bt.length:0,Oe=Xe.get(K),Nn=b.state.lights;if(ye===!0&&(Ie===!0||T!==U)){let $t=T===U&&K.id===W;ae.setState(K,T,$t)}let Rt=!1,Ws=!1;K.version===Oe.__version?Oe.needsLights&&Oe.lightsStateVersion!==Nn.state.version||$.isBatchedMesh&&Oe.batching===!1||!$.isBatchedMesh&&Oe.batching===!0||$.isBatchedMesh&&Oe.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Oe.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Oe.instancing===!1||!$.isInstancedMesh&&Oe.instancing===!0||$.isSkinnedMesh&&Oe.skinning===!1||!$.isSkinnedMesh&&Oe.skinning===!0||$.isInstancedMesh&&Oe.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Oe.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Oe.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Oe.instancingMorph===!1&&$.morphTexture!==null||Oe.envMap!==ze||K.fog===!0&&Oe.fog!==Re||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ae.numPlanes||Oe.numIntersection!==ae.numIntersection)||Oe.vertexAlphas!==it||Oe.vertexTangents!==xt||Oe.morphTargets!==Fe||Oe.morphNormals!==vt||Oe.morphColors!==on||Oe.morphTargetsCount!==Tn||Oe.numLightProbeGrids!==jd(b.state.lightProbeGridArray)?Rt=!0:(Oe.outputColorSpace!==Ae||Oe.toneMapping!==Gt)&&(Ws=!0):(Rt=!0,Oe.__version=K.version);let An=Oe.currentProgram;(Rt===!0||Ws===!0)&&(An=Ws===!0?E1(K,k,$,Ae,Gt):Ca(K,k,$),D&&K.isNodeMaterial&&D.onUpdateProgram(K,An,Oe));let el=!1,gs=!1,Xs=!1,St=An.getUniforms(),Mn=Oe.uniforms;if(Ee.useProgram(An.program)&&(el=!0,gs=!0,Xs=!0),K.id!==W&&(W=K.id,gs=!0),el||U!==T){Ee.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),St.setValue(z,"projectionMatrix",T.projectionMatrix),St.setValue(z,"viewMatrix",T.matrixWorldInverse);let vn=St.map.cameraPosition;vn!==void 0&&vn.setValue(z,je.setFromMatrixPosition(T.matrixWorld)),wt.logarithmicDepthBuffer&&St.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&St.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),U!==T&&(U=T,gs=!0,Xs=!0)}if(Oe.needsLights&&(Nn.state.sunShadowMap.length>0&&St.setValue(z,"sunShadowMap",Nn.state.sunShadowMap,Je),Nn.state.directionalShadowMap.length>0&&St.setValue(z,"directionalShadowMap",Nn.state.directionalShadowMap,Je),Nn.state.spotShadowMap.length>0&&St.setValue(z,"spotShadowMap",Nn.state.spotShadowMap,Je),Nn.state.pointShadowMap.length>0&&St.setValue(z,"pointShadowMap",Nn.state.pointShadowMap,Je)),$.isSkinnedMesh){St.setOptional(z,$,"bindMatrix"),St.setOptional(z,$,"bindMatrixInverse");let $t=$.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),St.setValue(z,"boneTexture",$t.boneTexture,Je))}$.isBatchedMesh&&(St.setOptional(z,$,"batchingTexture"),St.setValue(z,"batchingTexture",$._matricesTexture,Je),St.setOptional(z,$,"batchingIdTexture"),St.setValue(z,"batchingIdTexture",$._indirectTexture,Je),St.setOptional(z,$,"batchingColorTexture"),$._colorsTexture!==null&&St.setValue(z,"batchingColorTexture",$._colorsTexture,Je));let mi=j.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&re.update($,j,An),(gs||Oe.receiveShadow!==$.receiveShadow)&&(Oe.receiveShadow=$.receiveShadow,St.setValue(z,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&k.environment!==null&&(Mn.envMapIntensity.value=k.environmentIntensity),Mn.dfgLUT!==void 0&&(Mn.dfgLUT.value=$b()),gs){if(St.setValue(z,"toneMappingExposure",C.toneMappingExposure),Oe.needsLights&&T1(Mn,Xs),Re&&K.fog===!0&&Me.refreshFogUniforms(Mn,Re),Me.refreshMaterialUniforms(Mn,K,Q,q,b.state.transmissionRenderTarget[T.id]),Oe.needsLights&&Oe.numLightProbeGrids>0){let $t=y,vn=0;for(let Wi of b.state.lightProbeGridArray)Wi.texture!==null&&($t.textures[vn]=Wi.texture,$t.min[vn]=Wi.boundingBox.min,$t.max[vn]=Wi.boundingBox.max,$t.resolution[vn]=Wi.resolution,vn++);for(let Wi in $t)$t[Wi].length=vn;Mn.probesSH.value=$t.textures,Mn.probesMin.value=$t.min,Mn.probesMax.value=$t.max,Mn.probesResolution.value=$t.resolution}xa.upload(z,Qd(Oe),Mn,Je)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(xa.upload(z,Qd(Oe),Mn,Je),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&St.setValue(z,"center",$.center),St.setValue(z,"modelViewMatrix",$.modelViewMatrix),St.setValue(z,"normalMatrix",$.normalMatrix),St.setValue(z,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){let $t=K.uniformsGroups;for(let vn=0,Wi=$t.length;vn<Wi;vn++){let n0=$t[vn];ke.update(n0,An),ke.bind(n0,An)}}return An}function T1(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function A1(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(T,k,j){let K=Xe.get(T);K.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Xe.get(T.texture).__webglTexture=k,Xe.get(T.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:j,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){let j=Xe.get(T);j.__webglFramebuffer=k,j.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,j=0){se=T,Z=k,X=j;let K=null,$=!1,Re=!1;if(T){let Ae=Xe.get(T);if(Ae.__useDefaultFramebuffer!==void 0){Ee.bindFramebuffer(z.FRAMEBUFFER,Ae.__webglFramebuffer),R.copy(T.viewport),O.copy(T.scissor),he=T.scissorTest,Ee.viewport(R),Ee.scissor(O),Ee.setScissorTest(he),W=-1;return}else if(Ae.__webglFramebuffer===void 0)Je.setupRenderTarget(T);else if(Ae.__hasExternalTextures)Je.rebindTextures(T,Xe.get(T.texture).__webglTexture,Xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let it=T.depthTexture;if(Ae.__boundDepthTexture!==it){if(it!==null&&Xe.has(it)&&(T.width!==it.image.width||T.height!==it.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Je.setupDepthRenderbuffer(T)}}let Le=T.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(Re=!0);let ze=Xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[k])?K=ze[k][j]:K=ze[k],$=!0):T.samples>0&&Je.useMultisampledRTT(T)===!1?K=Xe.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?K=ze[j]:K=ze,R.copy(T.viewport),O.copy(T.scissor),he=T.scissorTest}else R.copy(Be).multiplyScalar(Q).floor(),O.copy($e).multiplyScalar(Q).floor(),he=nt;if(j!==0&&(K=B),Ee.bindFramebuffer(z.FRAMEBUFFER,K)&&Ee.drawBuffers(T,K),Ee.viewport(R),Ee.scissor(O),Ee.setScissorTest(he),$){let Ae=Xe.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ae.__webglTexture,j)}else if(Re){let Ae=k;for(let Le=0;Le<T.textures.length;Le++){let ze=Xe.get(T.textures[Le]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Le,ze.__webglTexture,j,Ae)}}else if(T!==null&&j!==0){let Ae=Xe.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ae.__webglTexture,j)}W=-1};function t0(T){let k=Xe.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=wt.textureFormatReadable(T.format),k.__typeReadable=wt.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,j,K,$,Re,De,Ae=0){if(!(T&&T.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Le=Le[De],Array.isArray(Le)&&(Le=Le[0])),Le){Ee.bindFramebuffer(z.FRAMEBUFFER,Le);try{let ze=T.textures[Ae],it=ze.format,xt=ze.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ae);let Fe=t0(ze);if(Fe.__formatReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Fe.__typeReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-K&&j>=0&&j<=T.height-$&&z.readPixels(k,j,K,$,ce.convert(it),ce.convert(xt),Re)}finally{let ze=se!==null?Xe.get(se).__webglFramebuffer:null;Ee.bindFramebuffer(z.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(T,k,j,K,$,Re,De,Ae=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(Le=Le[De],Array.isArray(Le)&&(Le=Le[0])),Le)if(k>=0&&k<=T.width-K&&j>=0&&j<=T.height-$){Ee.bindFramebuffer(z.FRAMEBUFFER,Le);let ze=T.textures[Ae],it=ze.format,xt=ze.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ae);let Fe=t0(ze);if(Fe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Fe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let vt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,vt),z.bufferData(z.PIXEL_PACK_BUFFER,Re.byteLength,z.STREAM_READ),z.readPixels(k,j,K,$,ce.convert(it),ce.convert(xt),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let on=se!==null?Xe.get(se).__webglFramebuffer:null;Ee.bindFramebuffer(z.FRAMEBUFFER,on);let Gt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Zp(z,Gt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,vt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Re),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(vt),z.deleteSync(Gt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,j=0){let K=Math.pow(2,-j),$=Math.floor(T.image.width*K),Re=Math.floor(T.image.height*K),De=k!==null?k.x:0,Ae=k!==null?k.y:0;Je.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,j,0,0,De,Ae,$,Re),Ee.unbindTexture()},this.copyTextureToTexture=function(T,k,j=null,K=null,$=0,Re=0){let De,Ae,Le,ze,it,xt,Fe,vt,on,Gt=T.isCompressedTexture?T.mipmaps[Re]:T.image;if(j!==null)De=j.max.x-j.min.x,Ae=j.max.y-j.min.y,Le=j.isBox3?j.max.z-j.min.z:1,ze=j.min.x,it=j.min.y,xt=j.isBox3?j.min.z:0;else{let St=Math.pow(2,-$);De=Math.floor(Gt.width*St),Ae=Math.floor(Gt.height*St),T.isDataArrayTexture?Le=Gt.depth:T.isData3DTexture?Le=Math.floor(Gt.depth*St):Le=1,ze=0,it=0,xt=0}K!==null?(Fe=K.x,vt=K.y,on=K.z):(Fe=0,vt=0,on=0);let Bt=ce.convert(k.format),Tn=ce.convert(k.type),Oe;k.isData3DTexture?(Je.setTexture3D(k,0),Oe=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Je.setTexture2DArray(k,0),Oe=z.TEXTURE_2D_ARRAY):(Je.setTexture2D(k,0),Oe=z.TEXTURE_2D),Ee.activeTexture(z.TEXTURE0),Ee.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),Ee.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),Ee.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);let Nn=Ee.getParameter(z.UNPACK_ROW_LENGTH),Rt=Ee.getParameter(z.UNPACK_IMAGE_HEIGHT),Ws=Ee.getParameter(z.UNPACK_SKIP_PIXELS),An=Ee.getParameter(z.UNPACK_SKIP_ROWS),el=Ee.getParameter(z.UNPACK_SKIP_IMAGES);Ee.pixelStorei(z.UNPACK_ROW_LENGTH,Gt.width),Ee.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Gt.height),Ee.pixelStorei(z.UNPACK_SKIP_PIXELS,ze),Ee.pixelStorei(z.UNPACK_SKIP_ROWS,it),Ee.pixelStorei(z.UNPACK_SKIP_IMAGES,xt);let gs=T.isDataArrayTexture||T.isData3DTexture,Xs=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){let St=Xe.get(T),Mn=Xe.get(k),mi=Xe.get(St.__renderTarget),$t=Xe.get(Mn.__renderTarget);Ee.bindFramebuffer(z.READ_FRAMEBUFFER,mi.__webglFramebuffer),Ee.bindFramebuffer(z.DRAW_FRAMEBUFFER,$t.__webglFramebuffer);for(let vn=0;vn<Le;vn++)gs&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Xe.get(T).__webglTexture,$,xt+vn),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Xe.get(k).__webglTexture,Re,on+vn)),z.blitFramebuffer(ze,it,ze+De,it+Ae,Fe,vt,Fe+De,vt+Ae,z.DEPTH_BUFFER_BIT,z.NEAREST);Ee.bindFramebuffer(z.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||Xe.has(T)){let St=Xe.get(T),Mn=Xe.get(k);Ee.bindFramebuffer(z.READ_FRAMEBUFFER,P),Ee.bindFramebuffer(z.DRAW_FRAMEBUFFER,V);for(let mi=0;mi<Le;mi++)gs?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,St.__webglTexture,$,xt+mi):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,St.__webglTexture,$),Xs?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Mn.__webglTexture,Re,on+mi):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Mn.__webglTexture,Re),$!==0?z.blitFramebuffer(ze,it,ze+De,it+Ae,Fe,vt,Fe+De,vt+Ae,z.COLOR_BUFFER_BIT,z.NEAREST):Xs?z.copyTexSubImage3D(Oe,Re,Fe,vt,on+mi,ze,it,De,Ae):z.copyTexSubImage2D(Oe,Re,Fe,vt,ze,it,De,Ae);Ee.bindFramebuffer(z.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Xs?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(Oe,Re,Fe,vt,on,De,Ae,Le,Bt,Tn,Gt.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(Oe,Re,Fe,vt,on,De,Ae,Le,Bt,Gt.data):z.texSubImage3D(Oe,Re,Fe,vt,on,De,Ae,Le,Bt,Tn,Gt):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Re,Fe,vt,De,Ae,Bt,Tn,Gt.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Re,Fe,vt,Gt.width,Gt.height,Bt,Gt.data):z.texSubImage2D(z.TEXTURE_2D,Re,Fe,vt,De,Ae,Bt,Tn,Gt);Ee.pixelStorei(z.UNPACK_ROW_LENGTH,Nn),Ee.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Rt),Ee.pixelStorei(z.UNPACK_SKIP_PIXELS,Ws),Ee.pixelStorei(z.UNPACK_SKIP_ROWS,An),Ee.pixelStorei(z.UNPACK_SKIP_IMAGES,el),Re===0&&k.generateMipmaps===!0&&k.mipmapsAutoUpdate===!0&&z.generateMipmap(Oe),Ee.unbindTexture()},this.initRenderTarget=function(T){Xe.get(T).__webglFramebuffer===void 0&&Je.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Je.setTextureCube(T,0):T.isData3DTexture?Je.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Je.setTexture2DArray(T,0):Je.setTexture2D(T,0),Ee.unbindTexture()},this.resetState=function(){Z=0,X=0,se=null,Ee.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}};var Rf=["diver","warden","drill","kestrel","engine"];function Fm(){let i=new cs,e=new Map,t=new Map;function n(s){if(!Rf.includes(s)||e.has(s))return Promise.resolve(!0);if(!t.has(s)){let r="./art/"+s+"-skin.webp",a=i.loadAsync(r).catch(()=>i.loadAsync(r)).then(o=>(o.colorSpace=Mt,e.set(s,o),!0)).catch(()=>!1).finally(()=>t.delete(s));t.set(s,a)}return t.get(s)}return{get:s=>e.get(s),prepare:n}}function Om(i,e,t,n){let s=t.clone(),r=[];i.updateMatrixWorld(!0);let a=i.matrixWorld.clone().invert(),o=new Ge,c=new N,l=.52,u=Math.cos(l),d=Math.sin(l),f=1/0,h=-1/0,p=1/0,x=-1/0;i.traverse(y=>{if(!y.isMesh||y.material!==t)return;let E=y.geometry,b=E.getAttribute("position"),M=E.getAttribute("normal"),S=new Float32Array(b.count*3);o.multiplyMatrices(a,y.matrixWorld);let L=new et().getNormalMatrix(o);for(let C=0;C<b.count;C++){c.fromBufferAttribute(b,C).applyMatrix4(o);let A=c.y*u-c.z*d;f=Math.min(f,c.x),h=Math.max(h,c.x),p=Math.min(p,A),x=Math.max(x,A),S[3*C]=c.x,S[3*C+1]=A,c.fromBufferAttribute(M,C).applyMatrix3(L).normalize(),S[3*C+2]=Ne.smoothstep(c.y*d+c.z*u,-.34,.35)}r.push([E,S,y])});for(let[y,E,b]of r){for(let M=0;M<E.length;M+=3)E[M]=.014+.972*(E[M]-f)/(h-f),E[M+1]=.015+.97*(E[M+1]-p)/(x-p);y.setAttribute("portraitUv",new zt(E,3)),b.material=s}let g={diver:[49,7775390],warden:[39,12360288],drill:[82,11772892],kestrel:[63,9025223],engine:[61,10586738]},[m,v]=g[n];s.shininess=m,s.specular.setHex(v);let _={value:0};return s.onBeforeCompile=y=>{y.uniforms.paintedSurface={value:e},y.uniforms.creatureImpact=_,y.uniforms.creatureFinish={value:Rf.indexOf(n)},y.vertexShader=y.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 portraitUv;varying vec3 paintCoord;varying vec3 sculpture;`).replace("#include <begin_vertex>",`#include <begin_vertex>
paintCoord=portraitUv;sculpture=position;`),y.fragmentShader=y.fragmentShader.replace("#include <common>",`#include <common>
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
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(1.,.75,.46),.36*creatureImpact);`)},_}var Jb=`
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
  }`,jb={captain:[[.43,.77,.31,.24,.99],[.44,.48,.34,.2,.83],[.16,.49,.16,.19,.65],[.8,.49,.18,.22,.71],[.84,.76,.13,.34,.92],[.43,.17,.18,.23,.74],[.65,.2,.14,.22,.69]],infantry:[[.5,.76,.38,.24,.98],[.5,.47,.28,.22,.85],[.19,.47,.15,.2,.6],[.82,.46,.14,.2,.62],[.37,.2,.19,.23,.69],[.66,.2,.17,.22,.65],[.46,.09,.17,.1,.76]],diver:[[.5,.64,.29,.27,1],[.2,.29,.17,.2,.82],[.82,.28,.17,.2,.82],[.5,.49,.15,.13,.62]],warden:[[.5,.7,.36,.32,1.04],[.53,.42,.22,.19,.75],[.64,.44,.12,.19,.98],[.24,.18,.15,.22,.59],[.76,.18,.14,.21,.59]],drill:[[.36,.47,.26,.27,1.02],[.68,.27,.25,.21,.72],[.7,.8,.25,.16,.65]],kestrel:[[.51,.48,.15,.27,.95],[.5,.34,.12,.13,.82],[.3,.18,.15,.17,.5],[.71,.26,.14,.13,.52]],engine:[[.5,.6,.3,.32,.95],[.5,.37,.18,.19,.83],[.31,.82,.14,.18,.65],[.69,.82,.14,.18,.65]]};function hh(i,e,t,n){let s=i==="infantry"||i==="captain",r=i==="captain"?44:s?22:80,o=Math.max(s?30:54,Math.round(r*e.image.height/e.image.width)),c=document.createElement("canvas");c.width=r+1,c.height=o+1;let l=c.getContext("2d",{willReadFrequently:!0});l.drawImage(e.image,0,0,r+1,o+1);let u=l.getImageData(0,0,r+1,o+1).data,d=(r+1)*(o+1),f=new Float32Array(d);for(let b=0;b<d;b++)f[b]=u[b*4+3]>88?1e3:0;for(let b=1;b<o;b++)for(let M=1;M<r;M++){let S=b*(r+1)+M;f[S]=Math.min(f[S],f[S-1]+1,f[S-r-1]+1,f[S-r-2]+1.414)}for(let b=o-1;b>0;b--)for(let M=r-1;M>0;M--){let S=b*(r+1)+M;f[S]=Math.min(f[S],f[S+1]+1,f[S+r+1]+1,f[S+r+2]+1.414)}let h=[],p=[],x=[],g=[],m=new Uint8Array(r*o),v=s?.43:.64,_=Math.cos(v),y=Math.sin(v);for(let b of[!0,!1])for(let M=0;M<=o;M++)for(let S=0;S<=r;S++){let L=M*(r+1)+S,C=S/r,A=1-M/o,D=0;for(let[W,U,R,O,he]of jb[i])D=Math.max(D,he*Math.exp(-1.6*(((C-W)/R)**2+((A-U)/O)**2)));let B=Math.min(1,f[L]/(r*.11)),P=s?Ne.smoothstep(B,0,1)*Ne.smoothstep(u[L*4+3],65,215):Math.pow(B,.6),V=(.28*u[L*4]+.55*u[L*4+1]+.17*u[L*4+2])/255,Z=(.023+P*((i==="kestrel"?.085:.2)+D*.86))*Math.min(1.26,t/3),X=b?Z*(.87+V*.13):-(s?.67:.99)*Z,se=A*n;h.push((C-.5)*t,se*_+X*y+.025,(s?.09:.46)-se*y+X*_),p.push(C,A),g.push(b?1:0)}for(let b=0;b<o;b++)for(let M=0;M<r;M++){let S=b*(r+1)+M;m[b*r+M]=[S,S+1,S+r+1,S+r+2].some(L=>u[L*4+3]>80)?1:0}for(let b=0;b<o;b++)for(let M=0;M<r;M++){if(!m[b*r+M])continue;let S=b*(r+1)+M,L=S+1,C=S+r+1,A=C+1;x.push(S,C,L,L,C,A,S+d,L+d,C+d,L+d,A+d,C+d);let D=(B,P)=>x.push(B,P,B+d,P,P+d,B+d);(!M||!m[b*r+M-1])&&D(C,S),(M===r-1||!m[b*r+M+1])&&D(L,A),(!b||!m[(b-1)*r+M])&&D(S,L),(b===o-1||!m[(b+1)*r+M])&&D(A,C)}let E=new _t;return E.setAttribute("position",new Ve(h,3)),E.setAttribute("uv",new Ve(p,2)),E.setAttribute("surface",new Ve(g,1)),E.setIndex(x),E.computeVertexNormals(),E}function Bm(i,e){let t={diver:4.12,warden:2.9,drill:3.15,kestrel:4.43,engine:4.08}[i],n=t*e.image.height/e.image.width,s=hh(i,e,t,n),r=new Lt({side:qt,alphaToCoverage:!0,uniforms:{paint:{value:e},motion:{value:new gt},kind:{value:Rf.indexOf(i)},fall:{value:0},bodyWidth:{value:t},bodyHeight:{value:n},hit:{value:0}},vertexShader:Jb.replace("varying vec2 tex;","attribute float surface;varying float cap;varying vec3 ns;varying vec2 tex;").replace("tex=uv;","tex=uv;cap=surface;ns=normalize(normalMatrix*normal);").replace("gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);",`
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
     }`}),a=new Ze(s,r);return a.frustumCulled=!1,{mesh:a,pose(o){r.uniforms.motion.value.set(i==="kestrel"?o.time*5:o.march*5.6,o.walk*(1-o.down),o.charge,o.release),r.uniforms.fall.value=o.down,r.uniforms.hit.value=o.hit}}}var ko=new N;function fi(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;ko.copy(e),ko[n]=0,ko.normalize();let l=.5*a/(a+o),u=1-ko.angleTo(i)/c;return Math.sign(ko[t])===1?u*l:o/(a+o)+l+l*(1-u)}var uh=class i extends Bn{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new N,l=new N,u=new N(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,f=this.attributes.normal.array,h=this.attributes.uv.array,p=d.length/6,x=new N,g=.5/a;for(let m=0,v=0;m<d.length;m+=3,v+=2)switch(c.fromArray(d,m),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[m+0]=u.x*Math.sign(c.x)+l.x*r,d[m+1]=u.y*Math.sign(c.y)+l.y*r,d[m+2]=u.z*Math.sign(c.z)+l.z*r,f[m+0]=l.x,f[m+1]=l.y,f[m+2]=l.z,Math.floor(m/p)){case 0:x.set(1,0,0),h[v+0]=fi(x,l,"z","y",r,n),h[v+1]=1-fi(x,l,"y","z",r,t);break;case 1:x.set(-1,0,0),h[v+0]=1-fi(x,l,"z","y",r,n),h[v+1]=1-fi(x,l,"y","z",r,t);break;case 2:x.set(0,1,0),h[v+0]=1-fi(x,l,"x","z",r,e),h[v+1]=fi(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),h[v+0]=1-fi(x,l,"x","z",r,e),h[v+1]=1-fi(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),h[v+0]=1-fi(x,l,"x","y",r,e),h[v+1]=1-fi(x,l,"y","x",r,t);break;case 5:x.set(0,0,-1),h[v+0]=fi(x,l,"x","y",r,e),h[v+1]=1-fi(x,l,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};function zo(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new _t;c.morphTargetsRelative=o;let l=0;for(let u=0;u<i.length;++u){let d=i[u],f=0,h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(d.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;if(d.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(d.morphAttributes[p]),h++}if(h!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(t){let u=0,d=[];for(let f=0;f<i.length;++f){let h=i[f].index;for(let p=0;p<h.count;++p)d.push(h.getX(p)+u);u+=i[f].attributes.position.count}c.setIndex(d)}for(let u in r){let d=km(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in a){let d=a[u][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<d;++f){let h=[];for(let x=0;x<a[u].length;++x)h.push(a[u][x][f]);let p=km(h);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function km(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let a=new e(r),o=new zt(a,t,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let d=c/t;for(let f=0,h=u.count;f<h;f++)for(let p=0;p<t;p++){let x=u.getComponent(f,p);o.setComponent(f+d,p,x)}}else a.set(u.array,c);c+=u.count*t}return s!==void 0&&(o.gpuType=s),o}function Cf(i,e){if(e===Ju)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===ga||e===No){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===ga)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function rn(i,e,t,n=0){return n?new uh(i,e,t,1,n):new Bn(i,e,t)}function Ke(i,e,t,n,s,r=null){let a=i.index?i.toNonIndexed():i;a!==i&&i.dispose(),a.deleteAttribute("uv"),r&&a.applyQuaternion(new nn().setFromEuler(r)),a.translate(t,n,s);let o=new _e(e),c=a.getAttribute("position").count,l=new Float32Array(c*3);for(let u=0;u<l.length;u+=3)o.toArray(l,u);return a.setAttribute("color",new zt(l,3)),a}function Sn(i){let e=zo(i,!1);for(let t of i)t.dispose();return e}function En(i,e,t,n,s=8){let r=new N(...i),a=new N(...e),o=a.clone().sub(r),c=new sn(t,t,o.length(),s);c.applyQuaternion(new nn().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.lerp(a,.5);return Ke(c,n,l.x,l.y,l.z)}var Gm=i=>new N(...i),Ft=(i=0,e=0,t=0)=>new Xt(i,e,t),Pf=Math.PI*2,Vm=new Kt({vertexColors:!0,shininess:51,specular:7366501,side:qt}),Qb=new bt({vertexColors:!0,toneMapped:!1,side:qt}),Ye=(i,e,t,n,s,r,a,o=null)=>{let c=Math.max(s,r,a),l=c<.11?10:c<.25?14:c<.56?20:28,u=new ni(1,l,Math.ceil(l*.55));return u.scale(s,r,a),Ke(u,i,e,t,n,o)},Ho=(i,e,t,n,s,r,a,o=.045,c=null)=>Ke(rn(s,r,a,o),i,e,t,n,c),Ds=(i,e,t,n,s,r,a,o=null,c=24)=>Ke(new sn(s,r,a,c),i,e,t,n,o),Go=(i,e,t,n,s,r,a=null)=>Ke(new ii(s,r,8,32),i,e,t,n,a);function _a(i,e,t=.04){return Ke(new hr(new is(e.map(Gm)),Math.max(9,e.length*5),t,8,!1),i,0,0,0)}function ot(i,e,t,n=14){let s=new is(e.map(Gm)),r=(e.length-1)*5,a=s.computeFrenetFrames(r,!1),o=[],c=[];for(let u=0;u<=r;u++){let d=u/r,f=s.getPointAt(d),h=d*(t.length-1),p=Math.min(t.length-2,Math.floor(h)),x=Ne.lerp(t[p],t[p+1],h-p);for(let g=0;g<n;g++){let m=g*Pf/n,v=f.clone().addScaledVector(a.normals[u],x*Math.cos(m)).addScaledVector(a.binormals[u],x*Math.sin(m));if(o.push(v.x,v.y,v.z),u){let _=u*n+g,y=u*n+(g+1)%n;c.push(_-n,y-n,_,y-n,y,_)}}}let l=new _t;return l.setAttribute("position",new Ve(o,3)),l.setIndex(c),l.computeVertexNormals(),Ke(l,i,0,0,0)}function zm(i,e){let t=[],n=[];for(let r=1;r<i.length-1;r++)for(let a of[0,r,r+1]){t.push(...i[a]);let o=new _e(e[a%e.length]);n.push(o.r,o.g,o.b)}let s=new _t;return s.setAttribute("position",new Ve(t,3)),s.setAttribute("color",new Ve(n,3)),s.computeVertexNormals(),s}function wn(i,e,t,n,s,r,a,o,c=null){let l=[[0,1],[.66,.64],[1,.08],[.82,-.53],[0,-1],[-.82,-.53],[-1,.08],[-.66,.64]],u=l.map(([E,b])=>[E*r,0,b*o]),d=l.map(([E,b])=>[E*r,a*.24,b*o]),f=l.map(([E,b])=>[E*r*.86,a*.53,b*o*.87]),h=[0,a,o*.06],p=[],x=[],g=new _e(i),m=new _e(e),v=g.clone().multiplyScalar(.48);function _(E,b,M,S){p.push(...E,...M,...b);for(let L=0;L<3;L++)x.push(S.r,S.g,S.b)}for(let E=0;E<l.length;E++){let b=(E+1)%l.length;_(u[E],d[E],u[b],v),_(u[b],d[E],d[b],v),_(d[E],f[E],d[b],m),_(d[b],f[E],f[b],m),_(f[E],h,f[b],g)}let y=new _t;return y.setAttribute("position",new Ve(p,3)),y.setAttribute("color",new Ve(x,3)),y.computeVertexNormals(),c&&y.applyQuaternion(new nn().setFromEuler(c)),y.translate(t,n,s)}function e2(i,e,t){let s=[],r=[],a=[],o=new _e("#307fa8"),c=new _e("#94ddec");for(let d=0;d<=5;d++)for(let f=0;f<=5;f++){let h=d/5,p=f/5,x=Math.sin(Math.PI*p),g=h*(1-.25*x*h*h);s.push(Ne.lerp(i[0],e[0],p)*g,Ne.lerp(i[1],e[1],p)*g-.19*x*h+.06*Math.sin(Math.PI*h),Ne.lerp(i[2],e[2],p)*g);let m=o.clone().lerp(c,.22+.51*(1-x)+.17*h);if(r.push(m.r,m.g,m.b),d&&f){let v=d*6+f,_=v-1,y=v-6,E=y-1;t<0?a.push(E,v,y,E,_,v):a.push(E,y,v,E,v,_)}}let l=new _t;l.setAttribute("position",new Ve(s,3)),l.setAttribute("color",new Ve(r,3)),l.setIndex(a),l.computeVertexNormals();let u=l.toNonIndexed();return l.dispose(),u}function yr(i,e,t,n,s,r,a=0){let o=new sn(.035,s,r,5,1);return o.translate(0,r/2,0),Ke(o,i,e,t,n,Ft(0,.2,a))}function t2(){let i=new Ct,e=[];function t(a,o=0,c=0,l=0){let u=new Ts;return u.position.set(o,c,l),a.add(u),u.userData.geometry=[],u.userData.light=[],e.push(u),u}let n=(a,...o)=>a.userData.geometry.push(...o),s=(a,...o)=>a.userData.light.push(...o);function r(){i.updateMatrixWorld(!0);let a=new ar(e);for(let[o,c]of[["geometry",Vm],["light",Qb]]){let l=[];if(e.forEach((d,f)=>{let h=d.userData[o];if(delete d.userData[o],!h.length)return;let p=Sn(h).applyMatrix4(d.matrixWorld),x=p.getAttribute("position").count,g=new Uint8Array(x*4),m=new Uint8Array(x*4);for(let v=0;v<g.length;v+=4)g[v]=f,m[v]=255;p.setAttribute("skinIndex",new Qr(g,4)),p.setAttribute("skinWeight",new Qr(m,4,!0)),l.push(p)}),!l.length)continue;let u=new rr(Sn(l),c);i.add(u),u.bind(a,new Ge),u.frustumCulled=!1}}return{root:i,joint:t,add:n,glow:s,finish:r}}function fh(i,e,t,n,s,r,a=!0){for(let o of[-1,1])i.add(e,Ye("#28313b",o*t,n,s,.15,.106,.095,Ft(0,o*.35,-o*.27))),i.glow(e,Ye(r,o*t,n+.006,s+.055,.114,.068,.06,Ft(0,o*.35,-o*.27))),a&&i.add(e,Ye("#271f2e",o*t,n,s+.11,.027,.052,.017))}function dh(i,e,t,n,s,r,a=!1){for(let o=0;o<r;o++){let c=n*(o/(r-1)-.5),l=.12+(o===0||o===r-1?.08:0);i.add(e,ot("#f7dfb0",[[c,s,t-Math.abs(c)*.15],[c*.98,s+(a?1:-1)*l,t+.035]],[.049,.004],8))}}function Wm(i,e,t,n,s,r=!1){let a=i.joint(e,...t),[o,c,l]=n,[u,d,f]=s;i.add(a,ot(d,[[0,0,0],o],[r?.17:.19,.12]),Ye(f,...o,.16,.15,.15));let h=i.joint(a,...o),p=c.map((g,m)=>g-o[m]),x=l.map((g,m)=>g-o[m]);if(i.add(h,ot(u,[[0,0,0],p,x],[.13,.092,.009],12)),r){let g=p.map(m=>m*.56);i.add(h,ot(d,[p.map(m=>m*.09),g,p.map(m=>m*.81)],[.145,.17,.105],10),En(p.map(m=>m*.25),p.map(m=>m*.32),.172,f,12),En(p.map(m=>m*.64),p.map(m=>m*.69),.143,f,12)),i.add(a,En([0,.09,.1],[o[0],o[1]+.085,o[2]+.08],.041,"#e9b277")),i.add(h,En([0,.03,.06],[p[0],p[1]+.12,p[2]+.05],.042,"#dba26b"),Ye(d,...p,.13,.09,.14))}else i.add(h,Ye(d,...p,.13,.095,.13));return{g:a,shank:h}}function n2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.04,-.12),a=t(r,0,-.06,.8),o=[],c=[],l="#176f70",u="#30a59a",d="#124e59",f="#f07846",h="#fcbb71";n(r,Ye(d,0,-.1,0,1.23,.55,1),Ye(l,0,.24,-.05,1.39,.77,1.06),Ye(u,0,.48,-.13,1.08,.55,.84));for(let p of[-1,1]){n(r,ot("#248d87",[[p*.15,.87,.13],[p*.56,1.01,-.17],[p*.72,1.12,-.42]],[.135,.12,.009]));for(let v=0;v<5;v++)n(r,Ye("#65ae96",p*(.26+v*.14),.88-v*.07,-.36+v*.032,.055,.039,.075));n(r,_a("#93c9ac",[[p*.18,.96,.09],[p*.58,.83,.31],[p*1.07,.59,.33],[p*1.26,.29,.19]],.036));for(let v=0;v<3;v++){let _=.4-v*.46;n(r,ot(u,[[p*1,.32,_],[p*1.36,.38,_-.13],[p*1.45,.58,_-.26]],[.21,.13,.006]));let y=[p*.92,-.09,_];o.push({...Wm(i,r,y,[[p*.58,.18,-.14],[p*.91,-.78,.02],[p*1,-.97,.31]],[d,l,f]),phase:v*.98+(p<0?Math.PI:0),s:p})}let x=t(r,p*.9,.06,.39),g=t(x,p*.41,.25,.5);n(x,ot(d,[[0,0,0],[p*.37,.05,.22],[p*.41,.25,.5]],[.27,.23,.24])),n(g,Ye(f,0,.05,.05,.45,.34,.49,Ft(.12,0,-p*.12)),ot(f,[[p*.23,.12,.2],[p*.39,.22,.55],[p*.33,.31,.89],[-p*.015,.33,1.08]],[.23,.19,.1,.008]),_a(h,[[p*.29,.23,.32],[p*.39,.33,.62],[p*.24,.37,.9]],.047));let m=t(g,-p*.13,.02,.24);n(m,ot("#e78954",[[0,0,0],[-p*.18,.02,.32],[-p*.19,.12,.62],[p*.033,.25,.8]],[.19,.16,.095,.007]));for(let v=0;v<4;v++)n(g,Ye(h,-p*.02,.29,.07+v*.11,.074,.054,.06));c.push({arm:x,palm:g,finger:m,s:p}),n(r,ot(d,[[p*.39,.45,.55],[p*.48,.71,.62],[p*.49,.85,.72]],[.13,.095,.08])),n(r,Ye(d,p*.49,.86,.74,.22,.16,.17)),s(r,Ye("#ffd777",p*.49,.88,.865,.146,.11,.077)),n(r,Ye("#333442",p*.49,.9,.927,.036,.078,.02));for(let v=0;v<3;v++)n(a,ot(h,[[p*(.14+v*.1),.07,.03],[p*(.16+v*.14),-.12,.21],[p*(.13+v*.14),-.29,.27]],[.078,.055,.007]));for(let v=0;v<3;v++){let _=-.39-v*.17;n(r,Go("#ded5a1",p*(.46+v*.1),.88-v*.06,_,.077,.025,Ft(Math.PI/2,0,0)))}}n(r,_a("#a7dac4",[[0,.59,.81],[0,.96,.21],[0,1.01,-.18],[0,.75,-.78]],.034));for(let p of[-1,1]){for(let x=0;x<2;x++){let g=p*(.36+x*.24),m=-.54+x*.18,v=[g+p*.2,1.57-x*.13,m-.11];n(r,ot("#e77648",[[g,.84,m],[g+p*.03,1.09,m],[g+p*.17,1.31-x*.06,m-.04],v],[.12,.092,.061,.022],10),ot("#ff9c5e",[[g+p*.09,1.19,m-.02],[g-p*.08,1.35,m+.025],[g-p*.06,1.47,m+.055]],[.062,.04,.011],9),ot("#f59853",[[g+p*.15,1.28-x*.04,m-.04],[g+p*.29,1.34,m-.11],[g+p*.33,1.46,m-.16]],[.055,.035,.01],9))}n(r,wn("#126d72","#91cba9",p*.48,.9,.7,.24,.1,.23,Ft(.15,p*.12,-p*.36))),n(a,ot("#efc69c",[[p*.26,.13,.15],[p*.37,.03,.38],[p*.2,-.13,.44]],[.115,.071,.004],12))}for(let p of[-1,1])n(r,ot("#195a5c",[[p*.27,.86,.9],[p*.47,.99,.865],[p*.68,1.02,.73]],[.052,.116,.033],12));n(a,Ye("#362a2f",0,.07,.27,.28,.12,.13)),dh(i,a,.36,.39,.11,5),n(r,wn("#209f95","#98dfbb",0,.86,-.03,.7,.27,.82));for(let p of[-1,1])n(r,wn("#197c7f","#7ecaaa",p*.79,.67,-.18,.39,.23,.55,Ft(.08,p*.28,-p*.35)));for(let{palm:p,finger:x,s:g}of c){g<0&&p.scale.set(1.24,1.28,1.15),n(p,wn("#fb7c3d","#ffd27a",0,.27,.2,.33,.13,.43,Ft(.04,0,-g*.16)));for(let m=0;m<3;m++){let v=.44+m*.17;n(p,ot("#ffda8e",[[g*.23,.19,v],[g*.09,.16,v+.04]],[.078,.007],9)),n(x,ot("#f6c583",[[-g*.13,.13,v-.23],[-g*.02,.14,v-.15]],[.065,.004],9))}}return p=>{a.rotation.x=.07+.12*Math.sin(p.time*3.2)+.28*p.cast-.18*p.fire,r.position.y=1.04+p.bob*.08-p.down*.29,r.rotation.z=p.stride*.044+p.down*.18,r.rotation.x=-p.cast*.14,o.forEach(({g:x,shank:g,phase:m,s:v})=>{let _=p.beat+m;x.rotation.y=v*.25*Math.sin(_)*p.walk,g.rotation.z=v*(Math.max(0,Math.cos(_))*.28*p.walk+p.down*.45)}),c.forEach(({arm:x,palm:g,finger:m,s:v})=>{x.rotation.x=-.14+.2*p.stride*v-.55*p.cast-.58*p.air+.5*p.down,g.rotation.y=v*(.1-.26*p.cast+.26*p.fire),m.rotation.y=v*(-.28-.32*p.cast+.64*p.fire+.09*Math.sin(p.time*3))})}}function i2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.24,-.26),a=t(r,0,.18,.7),o=[],c="#57484b",l="#b67b35",u="#e9b858",d="#ffe3a8";n(r,Ye(c,0,.03,-.17,.94,.77,1.36),Ye("#8e612f",0,.18,.18,1.04,.84,.94));for(let h=0;h<3;h++){let p=.36-h*.48,x=1-h*.12;n(r,Ye(h%2?l:"#c89348",0,.53-h*.09,p,.98*x,.53*x,.55));for(let g of[-1,1])n(r,En([g*.6*x,.9-h*.1,p+.12],[g*.92*x,.46-h*.1,p+.04],.048,u),Ye("#5b5052",g*.9*x,.49-h*.09,p+.11,.07,.07,.07))}n(a,Ye(c,0,.11,.27,.64,.63,.68),Ye("#866344",0,-.11,.72,.56,.37,.56),Ye("#624c41",0,-.2,1.03,.5,.25,.25),ot(d,[[0,.12,.88],[.04,.43,1.17],[.22,.86,1.47],[.46,1.48,1.35]],[.3,.22,.115,.004]),ot("#d6ae76",[[0,.45,.6],[0,.67,.69],[0,.87,.78]],[.16,.1,.005]));for(let h of[-1,1]){n(a,Ye("#493d42",h*.275,-.16,1.205,.105,.064,.038),ot(c,[[h*.41,.39,.1],[h*.62,.56,.04],[h*.69,.68,-.13]],[.16,.14,.015]),Ye(l,h*.46,.33,.63,.27,.11,.26,Ft(0,h*.42,-h*.31)));for(let p of[-.86,.62]){let x=t(r,h*.64,-.11,p),g=t(x,0,-.54,.05);n(x,Ye(c,h*.055,-.19,0,.3,.46,.34),Ye(l,h*.12,-.2,.045,.29,.23,.32)),n(g,Ye(c,0,-.13,0,.235,.33,.25),Ye("#423d43",0,-.39,.095,.267,.16,.34));for(let m=-1;m<=1;m++)n(g,Ye("#c3a580",m*.123,-.41,.29,.075,.074,.11));o.push({g:x,knee:g,phase:(p<0?Math.PI:0)+(h<0?Math.PI:0)})}}fh(i,a,.447,.22,.72,"#ffb333");let f=t(r,0,.12,-1.22);n(f,ot(c,[[0,0,0],[.13,-.22,-.34],[.12,-.45,-.47]],[.11,.073,.035]),Ye("#342f3a",.12,-.47,-.48,.08,.13,.085));for(let h=0;h<3;h++){let p=.38-h*.48,x=1-h*.12;n(r,wn("#cf9440","#ffe093",0,1-h*.1,p,x*.44,.14,.36))}for(let h=0;h<3;h++){let p=.31-h*.48,x=1-h*.12;for(let g of[-1,1])n(r,_a("#795533",[[g*.24*x,1.02-h*.09,p+.12],[g*.59*x,.91-h*.1,p+.24],[g*.9*x,.54-h*.1,p+.16]],.026))}fh(i,a,.488,.295,.8,"#e7a73e"),n(a,wn("#c28b3d","#ffd46b",0,.58,.34,.46,.18,.46,Ft(.35)));for(let h of[-1,1]){n(r,wn("#ba7827","#ffd473",h*.71,.7,.17,.48,.25,.69,Ft(.03,h*.1,-h*.61))),n(a,wn("#935b32","#ffd181",h*.51,.2,.44,.26,.12,.42,Ft(.38,h*.18,-h*.55))),n(a,_a("#ecd287",[[h*.08,.16,.89],[h*.14,.19,1],[h*.14,.25,1.08]],.035));for(let p=0;p<3;p++)n(r,Ye("#69484b",h*(.63+p*.09),.96-p*.102,.46-p*.03,.05,.042,.052))}return h=>{a.rotation.y=.065*h.stride-.1*Math.sin(h.time*3)*h.cast,r.position.y=1.24+.1*h.bob-.26*h.cast-.35*h.down,r.rotation.z=.06*h.stride+.25*h.down,a.rotation.x=.025+.18*h.stride+.48*h.cast-.47*h.fire+.2*h.down;for(let{g:p,knee:x,phase:g}of o){let m=Math.sin(h.beat+g)*h.walk;p.rotation.x=-m*.39+.25*h.down,x.rotation.x=Math.max(0,m)*.39+.35*h.air}f.rotation.z=.28*Math.sin(h.time*3)}}function s2(i){let{root:e,joint:t,add:n,glow:s}=i,r=[],a=[[-.32,1.76,.88,.69],[-.07,1.14,.63,.75],[.51,.63,.49,.73],[.91,.48,-.12,.68],[.72,.47,-.75,.63],[.19,.49,-1.1,.56],[-.4,.52,-1.12,.52],[-.85,.58,-.76,.46],[-.99,.77,-.27,.4],[-.85,1.16,-.14,.36],[-.64,1.59,-.35,.31],[-.3,1.95,-.62,.25],[.14,2.07,-.66,.19],[.46,1.95,-.64,.14],[.54,1.72,-.63,.078]];for(let l=0;l<a.length;l++){let[u,d,f,h]=a[l],p=t(e,u,d,f);n(p,Ye(l%2?"#623c81":"#654194",0,0,0,h,h*.78,h*.98),Ye(l%2?"#a969bd":"#9659af",0,h*.23,-.03,h*1.06,h*.71,h*.64));for(let x of[-1,1])n(p,Ye("#50365e",x*h*.78,-.09,.08,h*.21,h*.19,h*.5),yr(l%2?"#cc80ee":"#a17de8",x*h*.62,h*.43,-.1,h*.26,h*.78,-x*.5)),s(p,Ye("#edacff",x*h*.72,h*.5,.075,h*.22,h*.043,h*.09));if(n(p,yr("#e5b0ff",0,h*.62,-.14,h*.23,h*.67,-.12)),n(p,wn(l%2?"#9f62cb":"#8251b7","#d39ae8",0,h*.61,.025,h*.82,h*.32,h*.69)),l+1<a.length){let[x,g,m,v]=a[l+1],_=[x-u,g-d,m-f];n(p,ot(l%2?"#6e498c":"#8453a4",[[0,0,0],_.map(y=>y*.55),_],[h*.79,(h+v)*.44,v*.78],16))}r.push(p)}let o=t(r[0],0,.37,.34),c=t(o,0,-.12,.11);n(o,Ye("#75469a",0,.18,.02,.69,.49,.61),Ye("#9954af",0,.1,.4,.56,.23,.44),Ye("#392744",0,-.043,.41,.51,.11,.44)),n(c,Ye("#b579ab",0,-.19,.37,.47,.145,.45)),dh(i,o,.67,.83,-.012,7),dh(i,c,.62,.67,-.13,5,!0);for(let l of[-1,1])n(o,ot("#cea6ef",[[l*.45,.32,.1],[l*.65,.69,-.06],[l*.69,.91,-.32]],[.19,.135,.01]),ot("#a07ccf",[[l*.48,.11,-.04],[l*.78,.36,-.23],[l*.94,.44,-.49]],[.19,.1,.007]),Ye("#b17cba",l*.4,.32,.44,.24,.105,.19,Ft(0,l*.37,-l*.32)));for(let l of[-1,1])n(o,ot("#c491da",[[l*.18,.31,.63],[l*.39,.42,.54],[l*.66,.5,.24]],[.1,.16,.035]),ot("#cba7d1",[[l*.49,.09,.31],[l*.67,-.03,.53],[l*.57,-.19,.75]],[.12,.085,.005]));fh(i,o,.39,.235,.51,"#a3ffe6");for(let l of[-1,1])n(o,yr("#86bdf3",l*.43,.43,-.11,.16,.62,-l*.45),yr("#d6b8ff",l*.56,.36,-.21,.12,.41,-l*.67));n(c,wn("#713f83","#e19acd",0,-.16,.34,.44,.12,.34)),n(c,Ye("#512c4b",0,-.061,.4,.25,.05,.18));for(let l of[-1,1])n(o,ot("#ffe8c5",[[l*.36,.08,.61],[l*.37,-.1,.81],[l*.3,-.28,.87]],[.092,.06,.006],12)),n(o,wn("#754593","#cc8dee",l*.38,.35,.4,.25,.1,.25,Ft(.22,-l*.22,-l*.44)));return l=>{r.forEach((u,d)=>{let[,f,h]=a[d];u.position.x=a[d][0]+Math.sin(l.beat*.68-d*.71)*(.075+Math.min(4,d)*.026)*l.walk,u.position.y=f*(1-.57*l.down-.36*l.cast)+Math.sin(l.beat*.63-d*.73)*.074*l.walk,u.position.z=h+d*.035*l.cast+Math.max(0,1-d*.2)*.36*l.fire,u.rotation.z=.12*Math.sin(l.beat*.7-d*.61)*l.walk+.27*l.down}),o.rotation.x=-.22*l.cast-.36*l.fire+.1*Math.sin(l.beat)*l.walk,c.rotation.x=.4+.31*l.cast+.36*l.fire+.04*Math.sin(l.time*3)}}function r2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.72,-.26),a=t(r,0,.4,.8),o=t(a,0,-.16,.28),c=[],l=[],u=[];n(r,Ye("#387bab",0,.09,-.08,.65,.59,1.1),Ye("#a4d6df",0,-.18,.12,.48,.35,.8),Ye("#397aa7",0,.3,.58,.45,.49,.64)),n(a,Ye("#599fc2",0,.11,.14,.46,.39,.61),Ye("#92cbd6",0,-.01,.5,.38,.2,.47),Ye("#296382",0,-.14,.58,.35,.1,.38)),n(o,Ye("#b1e3e3",0,-.12,.3,.31,.12,.34)),dh(i,a,.76,.53,-.11,5);for(let h of[-1,1]){n(a,ot("#e1f3e6",[[h*.28,.27,0],[h*.45,.58,-.24],[h*.48,.72,-.51]],[.13,.085,.006]),ot("#80d5e1",[[h*.27,.07,-.08],[h*.54,.17,-.25],[h*.66,.22,-.47]],[.14,.08,.01]));let p=t(r,h*.39,.32,.04),x=t(p,h*.76,.72,-.26);n(p,ot("#5296b7",[[0,0,0],[h*.38,.26,-.08],[h*.76,.72,-.26]],[.18,.12,.095]),zm([[0,0,0],[h*.76,.72,-.26],[h*.82,.08,.74],[h*.14,-.08,.47]],["#4a9fc7","#8ddfe5","#3b81b0","#306d9c"]));let g=[[h*.98,.33,-.32],[h*1.2,-.005,.18],[h*1.16,-.36,.77],[h*.78,-.62,1.05],[h*.4,-.66,.98]];for(let m=0;m<g.length-1;m++){let v=g[m],_=g[m+1];n(x,e2(v,_,h),ot("#d0ecdc",[[0,0,0],[v[0]*.56,v[1]*.58+.05,v[2]*.47],v],[.055,.042,.009]))}n(x,ot("#c5e8df",[[0,0,0],g[g.length-1]],[.046,.008]),ot("#b2e8e2",[[0,0,0],[h*.09,.12,.1],[h*.12,.16,.22]],[.08,.05,.004])),c.push({arm:p,elbow:x,s:h});for(let m of[-.57,.41]){let v=t(r,h*.37,-.23,m);n(v,ot("#407ea5",[[0,0,0],[h*.12,-.32,.05],[h*.14,-.49,.23]],[.15,.095,.069]));for(let _ of[-1,0,1])n(v,ot("#dcebd5",[[h*.14,-.49,.23],[h*.15+_*.09,-.57,.38]],[.053,.006]));l.push({leg:v,s:h,z:m})}}for(let h of[-1,1])n(a,ot("#4b92af",[[h*.11,.24,.55],[h*.31,.32,.47],[h*.48,.39,.21]],[.052,.095,.021]));fh(i,a,.315,.14,.54,"#f9c45b");let d=r;for(let h=0;h<5;h++){let p=t(d,0,h?-.015:0,h?-.33:-.83),x=.28-h*.042;n(p,ot("#4789ad",[[0,0,.06],[0,-.025,-.27],[0,.01,-.4]],[x,x*.8,x*.64]),yr("#acdfe4",0,x*.59,-.16,.065,.17-h*.014)),u.push(p),d=p}for(let h=0;h<4;h++){let p=.47-h*.28;n(r,wn(h%2?"#68b4d3":"#559fc9","#d1eef0",0,.48,p,.39-h*.035,.13,.26))}n(a,wn("#4085a8","#a9dce8",0,.15,.52,.28,.12,.4,Ft(.17)));for(let h of[-1,1])n(a,ot("#316785",[[h*.16,.22,.63],[h*.34,.29,.52],[h*.48,.36,.22]],[.06,.1,.012],11),ot("#f6f2df",[[h*.25,-.045,.72],[h*.28,-.17,.85],[h*.25,-.28,.86]],[.066,.039,.005],10));n(a,yr("#b8eef8",0,.38,.1,.14,.44));let f=u[u.length-1];for(let h of[-1,1])n(f,zm([[0,.03,-.11],[h*.29,.12,-.32],[h*.35,.1,-.63],[0,-.02,-.49]],["#bbeffd","#2689ae","#b2eff7","#246c98"])),n(f,ot("#daeff3",[[0,.05,-.1],[h*.22,.12,-.33],[h*.35,.1,-.63]],[.06,.035,.006],10)),n(a,wn("#57a6ca","#b4edf1",h*.31,.27,.12,.2,.105,.31,Ft(.16,0,-h*.25)));for(let{arm:h,elbow:p,s:x}of c)n(h,wn("#3f8fba","#d7f1e8",x*.39,.27,-.05,.22,.1,.43,Ft(-.03,x*.94,-x*.28))),n(p,ot("#c1eafa",[[0,.04,.02],[x*.22,.22,.18],[x*.32,.33,.11]],[.1,.055,.005],10));for(let h=0;h<4;h++)n(r,yr("#d5ede7",0,.5,.41-h*.31,.084,.23));return h=>{let p=Math.sin(h.time*4.9);r.position.y=1.7+.1*p*(1-h.down)-.69*h.down-.3*h.cast,r.rotation.x=-.13*h.cast+.17*h.fire+.18*h.down,a.rotation.x=.1*Math.sin(h.time*2.4)+.32*h.fire,o.rotation.x=.08+.36*h.cast+.4*h.fire;for(let{arm:x,elbow:g,s:m}of c)x.rotation.z=m*(.06+.32*p*(1-h.down)+.39*h.cast-.65*h.down),g.rotation.z=m*(.21*Math.sin(h.time*4.9-.85)*(1-h.down)-.18*h.fire),g.rotation.y=m*(.12+.12*Math.sin(h.time*4.9-.6)+.7*h.down);for(let{leg:x,s:g,z:m}of l)x.rotation.x=.32+.13*Math.sin(h.beat+g+(m>0?Math.PI:0))+.35*h.air;u.forEach((x,g)=>x.rotation.y=.16*Math.sin(h.time*3-g*.6))}}function a2(i){let{root:e,joint:t,add:n,glow:s}=i,r=t(e,0,1.14,-.17),a=[],o=[],c=t(r,0,.14,.88),l="#394955",u="#8a4239",d="#d09253",f="#27313d",h="#ffc669";n(r,Ye(f,0,0,-.06,.99,.63,1.15),Ye(u,0,.24,-.15,1.06,.68,1.08));for(let x=0;x<3;x++)n(r,Ds(x===1?d:l,0,.6+x*.13,-.22,.71-x*.075,.74-x*.073,.15),Go("#c4874f",0,.65+x*.13,-.22,.705-x*.072,.043,Ft(Math.PI/2)));n(r,Ds(f,0,.98,-.22,.48,.56,.11)),s(r,Ds("#ff9642",0,1.035,-.22,.414,.414,.035));for(let x=-2;x<=2;x++)n(r,Ho(l,x*.14,1.07,-.22,.052,.04,.66-.09*Math.abs(x),.014));n(c,Ds(f,0,0,.1,.54,.54,.27,Ft(Math.PI/2)),Go(d,0,0,.265,.48,.077)),s(c,Ye("#ff8235",0,0,.245,.39,.39,.105),Ye("#ffe395",0,0,.326,.17,.17,.054));for(let x=0;x<8;x++){let g=x*Pf/8;n(c,Ho(l,Math.cos(g)*.32,Math.sin(g)*.32,.35,.24,.066,.053,.016,Ft(0,0,g+.32)))}for(let x of[-1,1]){for(let m=0;m<4;m++){let v=.62-m*.45,_=[x*(.5+Math.sin(m*Math.PI/3)*.12),.39,v*.42],y=[x*(.9+Math.sin(m*Math.PI/3)*.18),-.75,v*.78];a.push({...Wm(i,r,[x*.75,-.06,v],[_,y,[y[0]+x*.16,-1.04,y[2]+.27]],[l,u,d],!0),s:x,phase:m*1.5+(x<0?Math.PI:0)})}let g=t(r,x*.74,.56,-.25);o.push({g,s:x}),n(g,Ds(l,0,.28,0,.245,.265,.76,Ft(.26)),Ds(d,0,.62,.095,.258,.26,.13,Ft(.26)),Ds(f,0,.72,.118,.22,.22,.1,Ft(.26)),Go("#e4a361",0,.78,.132,.232,.045,Ft(Math.PI/2+.26)),_a(d,[[x*.17,0,-.1],[x*.27,.28,-.12],[x*.2,.46,-.06]],.05)),s(g,Ye(h,0,.742,.13,.142,.042,.14)),n(r,Ho(u,x*.76,.3,.45,.47,.43,.52,.1,Ft(0,x*.16,-x*.25)));for(let m=0;m<3;m++)s(r,Ho("#ffa64f",x*(.67+m*.075),.31,.72,.036,.18,.033,.007,Ft(0,0,-x*.18)))}for(let x of[-1,1])n(c,Ho(l,x*.142,0,.37,.066,.46,.06,.023));s(c,Ye("#ffe295",0,0,.391,.061,.236,.034));let p=t(r,0,1.11,-.22);n(p,Ds(d,0,.01,0,.094,.116,.06));for(let x=0;x<6;x++){let g=x*Pf/6;n(p,wn("#5b6970","#dda064",.21*Math.sin(g),0,.21*Math.cos(g),.085,.042,.17,Ft(0,g+.61,.13)))}for(let{g:x,s:g}of o){for(let m=0;m<3;m++)n(x,Go("#be8451",0,.39+m*.083,.04+m*.022,.253,.018,Ft(Math.PI/2+.26)));n(r,wn("#a64b36","#d8944f",g*.7,.65,.43,.4,.17,.4,Ft(.05,g*.2,-g*.42)))}return x=>{p.rotation.y=x.time*2.8+x.cast*1.2+x.fire*.7,r.position.y=1.14+.066*x.bob-.15*x.cast-.42*x.down,r.rotation.z=.042*x.stride+.21*x.down,c.rotation.z=.14*x.time+.67*x.cast,a.forEach(({g,shank:m,s:v,phase:_})=>{let y=x.beat+_;g.rotation.y=v*.22*Math.sin(y)*x.walk,m.rotation.z=v*(.25*Math.max(0,Math.cos(y))*x.walk+.36*x.down)}),o.forEach(({g,s:m})=>{g.rotation.x=.22+.54*x.cast-.34*x.fire,g.rotation.z=m*(.18+.12*x.down),g.position.y=.56-.14*x.fire})}}var If={diver:[[2.86,-.93,.74]],warden:[[2.85,-.79,.52],[3.5,2.1,.45]],drill:[[3.18,.69,.56],[2.38,-.83,.54]],kestrel:[[3.6,-.8,1.85],[3.3,.35,.44]],engine:[[2.77,-.49,.8],[2.29,-1.2,.44]]},o2={diver:1.08,warden:1.19,drill:1.03,kestrel:1.05,engine:1.09},Hm={diver:n2,warden:i2,drill:s2,kestrel:r2,engine:a2};function Xm(i,e){let t=new Map,n;return function(r,a){if(n!==r){let h=t.get(n);h&&(h.root&&(h.root.visible=!1),h.portrait&&(h.portrait.mesh.visible=!1)),Hm[r]&&!t.has(r)&&t.set(r,{}),n=r}let o=t.get(r);if(!o)return!1;let c=e.get(r),l=a.mode==="ai"&&c,u=a.march*4.35,d=Ne.smoothstep(a.defeat,.12,.94);if(l)return o.portrait||(o.portrait=Bm(r,c),i.add(o.portrait.mesh)),o.root&&(o.root.visible=!1),o.portrait.mesh.visible=!0,o.portrait.pose({...a,down:d}),!0;if(!o.root){let h=t2();o.sample=Hm[r](h),h.finish(),o.root=h.root,i.add(h.root)}!o.paintState&&c&&(o.paintState=Om(o.root,c,Vm,r)),o.portrait&&(o.portrait.mesh.visible=!1),o.root.visible=!0,o.root.scale.setScalar(o2[r]),o.paintState&&(o.paintState.value=Math.max(0,a.hit));let f=Math.sin(Math.PI*Ne.clamp((a.vault-.21)/.89,0,1))+Math.sin(Math.PI*Ne.clamp((a.attack-.23)/.65,0,1));return o.sample({time:a.time,beat:u,walk:a.walk*(1-d),stride:Math.sin(u)*a.walk*(1-d),bob:(.5-.5*Math.cos(u*2))*a.walk,down:d,air:f,cast:a.charge||0,fire:a.release||0}),!0}}var ph=`
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
`;var ya=.18700000000000003,Ym=Math.PI*2;function qm(i){if(i<.55)return 1-2*i/.55;let e=(i-.55)/(1-.55),t=e*e*(3-2*e),n=2*(1-.55)/.55*e*(1-e)*(1-2*e);return-1+2*t-n}function Us(i,e,t){let n=i/Ym%1,s=(n+.5)%1;t[0]=qm(n)*e,t[1]=qm(s)*e;let r=Math.max(n,s),a=r>.55?Math.sin(Math.PI*(r-.55)/(1-.55))**2:0;return t[2]=(r===n?1:-1)*a*e,t}function Ma(i){return i.phase+Ym*i.marched/(.68*i.size)}function l2(i,e){let t=e==="captain",n=t?1.16:e==="red"?.54:.49,s=i.attributes.position,r=i.attributes.uv,a=t?.42:.5,o=t?1.73:.88,c=Math.cos(.43),l=Math.sin(.43),u=t?.79:.65,d=Math.sin(u),f=Math.cos(u),h=Ne.smoothstep,p=(x,g,m,v,_,y)=>{let E=((x-m)/_)**2+((g-v)/y)**2;return 1-h(E,.13,1)};for(let x=0;x<s.count;x++){let g=r.getX(x),m=r.getY(x),v=i.attributes.surface.getX(x),_=p(g,m,a,.818,t?.285:.4,.19),y=p(g,m,a,.726,t?.33:.425,.055),E=p(g,m,.18,.552,.16,.135)+p(g,m,.82,.552,.16,.135),b=p(g,m,.33,.105,.155,.135)+p(g,m,.64,.118,.155,.13),M=p(g,m,.285,.34,.115,.076)+p(g,m,.69,.35,.11,.078),S=(1-h(Math.abs(g-(.82-.93*m)),.024,.075))*p(g,m,.47,.475,.35,.2),L=e==="blue"?p(g,m,.5,.452,.29,.145):0,C=t?p(g,m,.836,.754,.156,.29):0,A=t?Math.hypot((g-.842)/.139,(m-.666)/.086):2,D=(1-h(A,.6,.78))*v,B=h(A,.58,.78)*(1-h(A,.89,1.07)),P=n*(.14*_+.071*y+.075*E+.09*b+.069*M+.054*S+.13*L+.21*C+.092*B-.18*D),V=v?1:-.45,Z=m*o*c+.025,X=.09-m*o*l,se=(s.getY(x)-Z)*l+(s.getZ(x)-X)*c+P*V,W=s.getX(x)+(g-a)*n*(.079*y+.033*_)+(g-.5)*n*(.04*b+.065*E);s.setXYZ(x,W,Z+se*d,X+se*f)}i.computeVertexNormals()}function Lf(i,e,t,n,s){let r=i==="captain",a=i!=="red",o=r?hh("captain",e,1.16,1.73):hh("infantry",e,a?.49:.54,.88);l2(o,i),o.setAttribute("stepPose",n);let c=new Lt({side:hi,alphaToCoverage:!0,defines:r?{CAPTAIN:1}:{},uniforms:{recoil:{value:0},lean:{value:0},portrait:{value:e},reverse:{value:t},facing:{value:a?-1:1}},vertexShader:`
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
        p.z += facing * stride * (${ya} * leg - 0.105 * arm);
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
      ${ph}
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
      }`}),l=new Dt(o,c,s);return l.name=r?"\u84DD\u961F\u91CD\u70AE\u961F\u957F":a?"\u84DD\u961F\u91CE\u6218\u5236\u670D":"\u7EA2\u961F\u91CE\u6218\u5236\u670D",l.count=0,l.frustumCulled=!1,l}function Zm(i,e){let t=new Float32Array(3),n=new Zt(new Float32Array(4),4).setUsage(Yt),s=Lf("captain",i,e,n,1);return s.setMatrixAt(0,new Ge),s.count=1,{mesh:s,pose(r,a,o,c,l){Us(r*9.03,a,t),n.setXYZW(0,Math.min(.66,l*.55),t[0],t[1],t[2]),n.needsUpdate=!0,s.material.uniforms.lean.value=c,s.material.uniforms.recoil.value=o}}}var c2=Math.PI*2,an=[0,0,0],Fs={blue:1085152,blueShade:479381,ice:7985151,navy:1453392,skin:15840638,skinShade:13208928,khaki:13675111,tan:11960903,leather:5518632,dark:2434352,gun:2504008,steel:8492968,red:15150389,wine:9377830,orange:16756781,gold:15775821};function h2(i,e=16,t=1,n=null){let s=[],r=[],a=n?e+1:e,o=n?n[0]:0,c=n?n[1]-n[0]:c2;for(let[u,d,f,h=0,p=0]of i)for(let x=0;x<a;x++){let g=o+c*x/e,m=Math.sin(g),v=Math.cos(g);s.push(h+d*Math.sign(m)*Math.abs(m)**t,u,p+f*Math.sign(v)*Math.abs(v)**t)}for(let u=0;u<i.length-1;u++)for(let d=0;d<e;d++){let f=n?d+1:(d+1)%a,h=u*a+d,p=u*a+f;r.push(h,p,h+a,p,p+a,h+a)}if(!n)for(let u of[!1,!0]){let d=u?i.length-1:0,[f,,,h=0,p=0]=i[d],x=s.length/3;s.push(h,f,p);let g=d*a;for(let m=0;m<e;m++){let v=g+m,_=g+(m+1)%e;u?r.push(x,v,_):r.push(x,_,v)}}let l=new _t;return l.setAttribute("position",new Ve(s,3)),l.setIndex(r),l.computeVertexNormals(),l}function u2(i=12,e=8){return new ni(1,i,e)}function yn(i,e,t,n=t,s=8){let r=new N(...i),a=new N(...e),o=a.clone().sub(r),c=new sn(n,t,o.length(),s);c.applyQuaternion(new nn().setFromUnitVectors(new N(0,1,0),o.normalize()));let l=r.add(a).multiplyScalar(.5);return c.translate(l.x,l.y,l.z)}function Vo(i,e,t=6){let n=new is(i.map(s=>new N(...s)));return new hr(n,(i.length-1)*3,e,t,!1)}function f2(){let i=new Kt({vertexColors:!0,shininess:18,specular:3156007});return i.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <begin_vertex>",`#include <begin_vertex>
fabricPoint=position;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 fabricPoint;`).replace("#include <color_fragment>",`#include <color_fragment>
        vec2 stitch=vec2(fabricPoint.x+.42*fabricPoint.z,fabricPoint.y)*175.;
        vec2 weight=1.-smoothstep(vec2(.75),vec2(2.7),fwidth(stitch));
        float thread=dot(sin(stitch*3.14159),weight)*.024;
        diffuseColor.rgb*=1.+thread;`)},{cloth:i,lacquer:new Kt({vertexColors:!0,shininess:58,specular:7175302}),metal:new Kt({vertexColors:!0,shininess:78,specular:10201786})}}var ds=class{constructor(){this.byFinish=new Map}add(e,t,n=an,s=[1,1,1],r=an,a="cloth"){let o=new Ge().compose(new N(...n),new nn().setFromEuler(new Xt(...r)),new N(...s));e.applyMatrix4(o),e.deleteAttribute("uv"),e.clearGroups();let c=e.attributes.position.count;e.index===null&&e.setIndex(Array.from({length:c},(d,f)=>f));let l=new _e(t),u=new Float32Array(c*3);for(let d=0;d<c;d++){let f=d*3;u[f]=l.r,u[f+1]=l.g,u[f+2]=l.b}e.setAttribute("color",new zt(u,3)),this.limb!==void 0&&e.setAttribute("limb",new Ve(new Float32Array(c).fill(this.limb),1)),this.byFinish.has(a)||this.byFinish.set(a,[]),this.byFinish.get(a).push(e)}shape(e,t,n={}){let{sides:s=16,power:r=1,arc:a=null,at:o,scale:c,rotate:l,finish:u}=n;this.add(h2(e,s,r,a),t,o,c,l,u)}ell(e,t,n,s=an,r="cloth",a=14,o=8){this.add(u2(a,o),e,t,n,s,r)}box(e,t,n,s=an,r="cloth"){this.add(new Bn(1,1,1),e,t,n,s,r)}joinGeometry(){let e=zo([...this.byFinish.values()].flat(),!1);return e.computeBoundingSphere(),e.computeBoundingBox(),e}attach(e,t){for(let[n,s]of this.byFinish){let r=new Ze(zo(s,!1),t[n]);r.castShadow=!0,e.add(r)}}};function Os(i,e=0,t=0,n=0){let s=new Ct;return s.position.set(e,t,n),i.add(s),s}function $m(i,e="near"){let t=i==="red",n=e==="far",s=new ds,r=t?15873338:1351656,a=t?11542827:1399980,o=t?10829881:12949854,c=n?6:16,l=n?5:12;for(let d of[-1,1]){s.limb=d;let f=d*.081;s.shape([[.01,.058,.105,f,-.031],[.05,.068,.11,f,-.032],[.12,.05,.067,f]],3484976,{sides:n?4:6,power:.72}),n||(s.shape([[.009,.059,.107,f,-.031],[.028,.071,.114,f,-.035],[.046,.07,.111,f,-.035]],2370101,{sides:8,power:.74}),s.ell(t?6181198:3763096,[f,.19,-.052],[.052,.059,.03],an,"cloth",8,4)),s.shape([[.075,.055,.058,f],[.22,.068,.074,f*.91],[.3,.073,.078,f*.83]],t?6701875:2906496,{sides:n?4:6})}s.limb=0,s.shape([[.235,.117,.081],[.3,.151,.114],[.42,.153,.101],[.485,.118,.084]],o,{sides:n?5:8,power:.89}),n||(s.shape([[.274,.137,.11],[.307,.151,.117]],6899252,{sides:8}),s.box(10712389,[0,.365,.097],[.093,.118,.045],[.03,0,.08]));for(let d of[-1,1]){s.limb=d*2;let f=d*.166;s.shape([[.26,.037,.044,f*1.12,-.031],[.298,.055,.06,f*1.07,-.03],[.386,.052,.057,f,.007],[.444,.05,.058,f*.91]],15772528,{sides:n?4:6}),n||(s.ell(o,[f*.88,.427,.008],[.083,.078,.092],an,"cloth",8,4),s.ell(t?7880249:3494521,[f*.91,.456,.006],[.091,.048,.096],an,"metal",8,4),s.ell(t?12928064:3436462,[f*.91,.47,.008],[.084,.046,.089],an,"lacquer",8,4))}if(s.limb=0,s.shape([[.43,.072,.073,0,-.012],[.462,.127,.1,0,-.016],[.548,.161,.14],[.635,.162,.149]],16761484,{sides:l,power:.82}),n||(s.ell(14129257,[-.151,.546,.005],[.033,.046,.041],an,"cloth",5,3),s.ell(14129257,[.151,.546,.005],[.033,.046,.041],an,"cloth",5,3)),s.shape([[.548,.177,.162,0,.009],[.585,.221,.198],[.613,.215,.195]],a,{sides:c}),s.shape([[.595,.224,.2],[.644,.229,.211],[.744,.204,.19],[.818,.132,.124],[.847,.054,.052]],r,{sides:c}),!n){if(s.shape([[.589,.221,.201],[.605,.226,.205]],t?16145742:7194613,{sides:10}),s.limb=0,t){for(let d of[.66,.698])s.box(16768401,[0,d,-.203],[.09,.019,.017],[-.23,0,0]);s.add(yn([-.093,.449,-.096],[.107,.291,-.111],.017,.018,5),5847082),s.box(14923627,[.027,.356,-.127],[.041,.031,.014],[0,0,-.57]);for(let d of[-1,1])s.box(7422515,[d*.093,.302,-.098],[.067,.065,.04],[0,-d*.23,0]),s.box(12621402,[d*.093,.318,-.121],[.055,.018,.012]),s.box(14198113,[d*.11,.448,-.031],[.054,.019,.097],[0,0,-d*.28])}else{s.box(3690845,[0,.351,.116],[.194,.177,.086]),s.box(5010046,[0,.356,.163],[.159,.118,.02]),s.add(yn([-.109,.447,.13],[.109,.447,.13],.039,.039,8),14334075);for(let d of[-1,1])s.box(7031092,[d*.053,.372,.179],[.023,.171,.018]),s.box(14727549,[d*.053,.335,.189],[.036,.025,.014]);s.add(Vo([[0,.65,.205],[0,.739,.189],[0,.808,.127],[0,.845,.05],[0,.852,-.027]],.014,6),9558778)}t||(s.limb=2,s.add(yn([.163,.264,.032],[.173,.525,-.19],.026,.026,5),Fs.gun),s.add(yn([.173,.51,-.18],[.173,.656,-.268],.013,.013,5),2966610))}if(t){s.ell(a,[0,.583,-.12],[.18,.019,.133],[-.14,0,0],"cloth",8,3),s.ell(15706736,[0,.514,-.139],[.042,.042,.061],an,"cloth",5,3),n&&s.box(16762755,[0,.68,-.196],[.09,.027,.013],[-.28,0,0]);for(let d of[-1,1])s.ell(4336940,[d*.061,.536,-.14],[.026,.022,.015],[0,-d*.28,-d*.12],"cloth",5,3)}let u=s.joinGeometry();return u.scale(1.055,1.016,1),t&&u.rotateY(Math.PI),u.computeBoundingBox(),u}function Jm(i){let e=new ds;if(i==="guard"){e.box(5399670,[.12,.32,.155],[.25,.34,.065],[-.12,0,-.045]),e.box(11978175,[.12,.36,.194],[.2,.038,.014]),e.shape([[.088,.055,.029,.114,.16],[.188,.12,.034,.119,.167],[.27,.124,.033,.12,.167]],4675694,{sides:8,power:.65});for(let t of[-1,1])e.add(yn([.12+t*.121,.2,.183],[.12+t*.12,.477,.145],.012,.013,6),11842726),e.ell(14991228,[.12+t*.096,.426,.185],[.016,.016,.008],an,"metal",6,4)}else if(i==="gunner")e.add(yn([.14,.33,.07],[.13,.37,.39],.04,.03,6),3490385),e.add(yn([.13,.37,.38],[.13,.38,.47],.038,.038,8),8159365),e.box(5003622,[.14,.345,.203],[.095,.105,.19],[0,.03,0]),e.box(12752981,[.14,.411,.203],[.08,.033,.15]),e.add(yn([.13,.378,.464],[.13,.379,.478],.025,.023,8),2369586);else if(i==="standard")e.add(yn([-.18,.19,-.05],[-.18,1.09,-.05],.025,.02,6),7626823),e.box(15382366,[-.18,1.08,-.04],[.078,.06,.078]),e.box(10890041,[-.01,.93,-.05],[.33,.22,.043],[-.08,0,-.09]),e.box(16767874,[-.035,.92,-.02],[.18,.043,.02]),e.box(7218740,[.166,.916,-.054],[.064,.186,.034],[.05,-.36,-.11]),e.add(yn([-.178,1.1,-.051],[-.178,1.18,-.051],.034,.006,8),15843698);else if(i==="courier"){e.box(13744003,[.18,.34,.1],[.26,.22,.14],[0,0,-.16]),e.box(16773587,[.18,.34,.177],[.17,.145,.018]),e.box(12011077,[.18,.34,.196],[.035,.12,.01]),e.box(12011077,[.18,.34,.196],[.12,.035,.01]);for(let t of[.07,.285])e.box(7165760,[t,.342,.163],[.024,.19,.032]),e.box(15847304,[t,.385,.179],[.038,.032,.018]);e.add(yn([.109,.464,.101],[.232,.464,.101],.022,.022,8),5851958)}else if(i==="vault")e.add(yn([.22,.07,.46],[.16,1.19,-.53],.027,.017,8),16764021),e.add(yn([.2,.32,.24],[.195,.47,.11],.033,.033,8),4411998),e.add(yn([.164,1.1,-.45],[.159,1.175,-.517],.023,.029,8),5929882),e.ell(13856567,[.159,1.19,-.53],[.034,.039,.035],an,"lacquer",8,4);else{e.box(6636858,[0,.38,.12],[.23,.15,.082]);for(let t of[-.068,0,.068])e.add(yn([t,.32,.163],[t,.45,.17],.029,.029,8),14633778),e.add(yn([t,.43,.17],[t,.457,.171],.032,.027,8),13611132);e.box(4870755,[0,.374,.199],[.224,.031,.019]),e.box(15253895,[.034,.374,.21],[.041,.028,.012])}return e.joinGeometry()}function Km(i,e,t){let n=Os(i,e*.117,.607,0),s=new ds;return s.shape([[-.385,.063,.064,e*.013,.016],[-.29,.086,.082,e*.012,.012],[-.165,.103,.103,e*.007,-.005],[-.032,.111,.114],[.036,.079,.086]],3629962,{sides:12}),s.shape([[-.59,.078,.142,e*.013,-.045],[-.553,.091,.153,e*.012,-.044],[-.493,.092,.141,e*.012,-.036],[-.448,.079,.082,e*.012,.012],[-.299,.08,.077,e*.012,.018]],5586993,{sides:12,power:.74}),s.shape([[-.606,.081,.143,e*.013,-.045],[-.586,.092,.151,e*.013,-.046],[-.565,.092,.151,e*.013,-.045]],3485490,{sides:12,power:.7}),s.shape([[-.327,.081,.079,e*.012,.015],[-.291,.086,.084,e*.012,.014]],9134660,{sides:12}),s.attach(n,t),n}function jm(){let i=new Ct,e=f2(),t=Os(i),n=Km(t,-1,e),s=Km(t,1,e),r=Os(t,0,.62),a=new ds;a.shape([[-.075,.183,.122],[.005,.217,.15],[.102,.221,.156],[.264,.274,.19],[.367,.285,.177],[.416,.191,.131]],Fs.khaki,{power:.8}),a.shape([[-.046,.216,.146],[-.008,.226,.155],[.045,.227,.158]],Fs.leather,{sides:16,power:.8}),a.shape([[.358,.185,.128],[.392,.187,.136],[.431,.165,.12]],15977614,{sides:14}),a.shape([[.375,.102,.106],[.502,.106,.099]],Fs.skinShade);let o=[];for(let m of[-1,1]){let v=m*.158;a.add(Vo([[v*.8,.005,.155],[v*.85,.135,.179],[v,.29,.168],[v,.37,.126],[v*.85,.405,.014],[v*.81,.36,-.111]],.027),7950390),a.box(12164198,[v*.89,.22,.192],[.064,.035,.015],[0,0,m*.065],"metal");let _=Os(r,v*1.47,.34,0),y=Os(_,-v*1.47,-.34,0);o.push(_);let E=new ds;E.shape([[.144,.078,.084,v*1.62,.042],[.207,.102,.109,v*1.66,.022],[.307,.107,.112,v*1.6],[.342,.07,.073,v*1.47]],13210966,{sides:12}),E.add(yn([v*1.74,.18,.038],[v*1.88,.074,-.092],.066,.059,10),Fs.skin),E.ell(9069123,[v*1.88,.078,-.105],[.07,.068,.076],[.22,0,0]),E.attach(y,e)}for(let m of[-1,1])a.box(13015648,[m*.124,.22,-.157],[.126,.101,.03],[.08,m*.16,0]),a.box(15122300,[m*.124,.249,-.174],[.13,.037,.016],[.1,m*.16,0]);a.box(13280874,[0,-.011,-.153],[.1,.061,.021],an,"metal"),a.box(9987129,[0,.077,.144],[.17,.112,.074],[.08,0,0]),a.box(12289103,[0,.101,.184],[.172,.062,.02],[.12,0,0]),a.add(Vo([[-.165,.034,.158],[-.002,.169,.207],[.153,.292,.17]],.033),9463616),a.attach(r,e);let c=Os(r,-.027,.461,-.015),l=new ds;l.shape([[0,.093,.078],[.024,.142,.126,0,-.012],[.078,.189,.162,0,-.016],[.204,.211,.181,0,-.004],[.278,.203,.176],[.327,.142,.137]],Fs.skin,{sides:18,power:.83});for(let m of[-1,1])l.ell(14788213,[m*.201,.145,.001],[.037,.072,.053]),l.add(Vo([[m*.199,.245,.062],[m*.192,.112,.045],[m*.148,.014,-.001],[m*.068,-.005,-.052]],.019),7885632);l.shape([[.192,.18,.168,0,.009],[.219,.223,.202],[.264,.224,.202]],7229755,{sides:20,arc:[-.69*Math.PI,.69*Math.PI]}),l.ell(13996641,[0,.132,-.167],[.052,.049,.05]);for(let m of[-1,1])l.ell(5519405,[m*.08,.168,-.155],[.042,.013,.016],[0,-m*.31,-m*.09]),l.ell(3882042,[m*.076,.15,-.164],[.018,.021,.014],[0,-m*.28,0],"lacquer",9,5);l.add(Vo([[-.054,.079,-.157],[0,.07,-.169],[.053,.078,-.155]],.009),11892307),l.shape([[.207,.224,.212,0,.015],[.243,.273,.242,0,.011],[.279,.285,.253],[.302,.279,.248]],Fs.blueShade,{sides:24,finish:"lacquer"}),l.shape([[.255,.275,.251],[.272,.286,.258],[.288,.282,.253]],6867711,{sides:24,finish:"lacquer"}),l.shape([[.281,.278,.25],[.331,.288,.257],[.413,.275,.249],[.498,.23,.222],[.574,.144,.155],[.609,.055,.068],[.614,.014,.022]],Fs.blue,{sides:28,finish:"lacquer"}),l.shape([[.296,.281,.252],[.312,.289,.259],[.325,.292,.261]],12114656,{sides:30,finish:"metal"});for(let m of[-1,1])l.ell(14793848,[m*.255,.325,.114],[.013,.016,.014],an,"metal",8,5);l.attach(c,e);let u=Os(r,.295,.691,-.03),d=new ds;function f(m,v,_,y,E,b="metal",M=18){d.add(yn([0,0,y],[0,0,E],v,_,M),m,an,[1,1,1],an,b)}f(2505549,.106,.11,-.48,.367),f(3558238,.13,.12,-.5,-.375),f(6928350,.142,.142,-.495,-.471),f(2110276,.142,.142,-.549,-.498),f(7442078,.147,.147,-.558,-.541),f(1252139,.105,.105,-.561,-.56),f(2635849,.144,.134,-.275,-.12),f(5540523,.141,.135,-.254,-.205),f(3305115,.125,.129,-.044,.161);for(let m of[-.292,-.119,.148,.203,.249,.294])f(m<.15?8559533:6058374,.139,.139,m,m+.021);f(2504006,.146,.137,.178,.346),f(10005948,.154,.153,.322,.36),f(2503748,.127,.123,.359,.373),f(1319473,.087,.086,.374,.375),d.box(3756390,[0,.095,-.1],[.093,.09,.202],an,"metal"),d.box(7785452,[0,.147,-.12],[.103,.023,.105],an,"metal"),d.box(3229274,[.098,.066,.061],[.052,.047,.189],an,"metal"),d.ell(8701671,[.123,.065,.02],[.012,.022,.036],an,"lacquer"),d.attach(u,e);let h=Os(u,0,0,-.57),p;function x(m,v){p=Zm(m,v),t.visible=!1,i.add(p.mesh)}function g({time:m=0,run:v=0,recoil:_=0,merge:y=0,lean:E=0}={}){p&&p.pose(m,v,_,E,y);let b=m*10.9;n.rotation.x=Math.sin(b)*.53*v,s.rotation.x=-Math.sin(b)*.53*v;let M=Math.sin(b)*v;o[0].rotation.x=-M*.46,o[1].rotation.x=M*.15+_*.12,r.rotation.y=M*.055,t.position.y=(1-Math.cos(b*2))*.019*v,r.rotation.z=-E*.13+Math.sin(b)*.021*v,r.rotation.x=-.058*v+_*.085,c.rotation.z=E*.026,u.position.z=-.03+_*.155,u.rotation.x=_*.14,e.cloth.emissive.setRGB(y*.43,y*.21,y*.05),e.lacquer.emissive.setRGB(y*.37,y*.31,y*.11),e.metal.emissive.setRGB(y*.29,y*.22,y*.07)}return{root:i,animate:g,muzzle:h,paint:x}}function Qm(i){let e=new Map,t=new Map,n=i.clone();return eg(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function eg(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)eg(i.children[n],e.children[n],t)}var mh=class extends Fi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new kf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Hf(t)}),this.register(function(t){return new $f(t)}),this.register(function(t){return new Jf(t)}),this.register(function(t){return new jf(t)}),this.register(function(t){return new Vf(t)}),this.register(function(t){return new Wf(t)}),this.register(function(t){return new Xf(t)}),this.register(function(t){return new qf(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new Yf(t)}),this.register(function(t){return new Gf(t)}),this.register(function(t){return new Kf(t)}),this.register(function(t){return new Zf(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new gh(t,pt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new gh(t,pt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Qf(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=hs.extractUrlBase(e);a=hs.resolveURL(l,this.path)}else a=hs.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ca(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===rg){try{a[pt.KHR_BINARY_GLTF]=new ed(e)}catch(d){s&&s(d);return}r=JSON.parse(a[pt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new od(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(d){case pt.KHR_MATERIALS_UNLIT:a[d]=new Of;break;case pt.KHR_DRACO_MESH_COMPRESSION:a[d]=new td(r,this.dracoLoader);break;case pt.KHR_TEXTURE_TRANSFORM:a[d]=new nd;break;case pt.KHR_MESH_QUANTIZATION:a[d]=new id;break;default:f.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function d2(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function jt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var pt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Ff=class{constructor(e){this.parser=e,this.name=pt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new _e(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Un);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ps(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new fr(u),l.distance=d;break;case"spot":l=new So(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),zi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Of=class{constructor(){this.name=pt.KHR_MATERIALS_UNLIT}getMaterialType(){return bt}extendParams(e,t,n){let s=[];e.color=new _e(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Un),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Mt))}return Promise.all(s)}},Bf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},kf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new me(r,r)}return Promise.all(s)}},zf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(s)}},Hf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Gf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Vf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_SHEEN}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new _e(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Un)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Mt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Wf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Xf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_VOLUME}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new _e().setRGB(r[0],r[1],r[2],Un),Promise.all(s)}},qf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_IOR}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Yf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new _e().setRGB(r[0],r[1],r[2],Un),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Mt)),Promise.all(s)}},Zf=class{constructor(e){this.parser=e,this.name=pt.EXT_MATERIALS_BUMP}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Kf=class{constructor(e){this.parser=e,this.name=pt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return jt(this.parser,e,this.name)!==null?kn:null}extendMaterialParams(e,t){let n=jt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},$f=class{constructor(e){this.parser=e,this.name=pt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Jf=class{constructor(e){this.parser=e,this.name=pt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},jf=class{constructor(e){this.parser=e,this.name=pt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},gh=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,d=s.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,f,s.mode,s.filter).then(function(h){return h.buffer}):a.ready.then(function(){let h=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(h),u,d,f,s.mode,s.filter),h})})}else return null}},Qf=class{constructor(e){this.name=pt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==di.TRIANGLES&&l.mode!==di.TRIANGLE_STRIP&&l.mode!==di.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],f=l[0].count,h=[];for(let p of d){let x=new Ge,g=new N,m=new nn,v=new N(1,1,1),_=new Dt(p.geometry,p.material,f);for(let E=0;E<f;E++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,E),c.SCALE&&v.fromBufferAttribute(c.SCALE,E),_.setMatrixAt(E,x.compose(g,m,v));let y=null;for(let E in c)if(E==="_COLOR_0"){let b=c[E];_.instanceColor=new Zt(b.array,b.itemSize,b.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(y===null){let M=_.geometry;y=new _t,y.name=M.name;for(let S in M.attributes)y.setAttribute(S,M.attributes[S]);for(let S in M.morphAttributes)y.morphAttributes[S]=M.morphAttributes[S];M.index!==null&&y.setIndex(M.index),y.morphTargetsRelative=M.morphTargetsRelative;for(let S of M.groups)y.addGroup(S.start,S.count,S.materialIndex);M.boundingBox!==null&&(y.boundingBox=M.boundingBox.clone()),M.boundingSphere!==null&&(y.boundingSphere=M.boundingSphere.clone()),y.drawRange.start=M.drawRange.start,y.drawRange.count=M.drawRange.count,y.userData=Object.assign({},M.userData),_.geometry=y}let b=c[E];y.setAttribute(E,new Zt(b.array,b.itemSize,b.normalized))}At.prototype.copy.call(_,p),this.parser.assignFinalMaterial(_),h.push(_)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}},rg="glTF",Wo=12,tg={JSON:1313821514,BIN:5130562},ed=class{constructor(e){this.name=pt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Wo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==rg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Wo,r=new DataView(e,Wo),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===tg.JSON){let l=new Uint8Array(e,Wo+a,o);this.content=n.decode(l)}else if(c===tg.BIN){let l=Wo+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},td=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=pt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let d=rd[u]||u.toLowerCase();o[d]=a[u]}for(let u in e.attributes){let d=rd[u]||u.toLowerCase();if(a[u]!==void 0){let f=n.accessors[e.attributes[u]],h=ba[f.componentType];l[d]=h.name,c[d]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,f){s.decodeDracoFile(u,function(h){for(let p in h.attributes){let x=h.attributes[p],g=c[p];g!==void 0&&(x.normalized=g)}d(h)},o,l,Un,f)})})}},nd=class{constructor(){this.name=pt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},id=class{constructor(){this.name=pt.KHR_MESH_QUANTIZATION}},xh=class extends Ui{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,d=(n-t)/u,f=d*d,h=f*d,p=e*l,x=p-l,g=-2*h+3*f,m=h-f,v=1-g,_=m-f+d;for(let y=0;y!==o;y++){let E=a[x+y+o],b=a[x+y+c]*u,M=a[p+y+o],S=a[p+y]*u;r[y]=v*E+_*b+g*M+m*S}return r}},p2=new nn,sd=class extends xh{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return p2.fromArray(r).normalize().toArray(r),r}},di={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ba={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ng={9728:en,9729:tn,9984:_c,9985:pa,9986:xr,9987:Xn},ig={33071:li,33648:Yr,10497:Mi},Nf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},rd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Bs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},m2={CUBICSPLINE:void 0,LINEAR:nr,STEP:tr},Df={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function g2(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Vn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:hi})),i.DefaultMaterial}function Mr(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function zi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function x2(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(f)}if(s){let f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(f)}if(r){let f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],f=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function v2(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _2(i){let e,t=i.extensions&&i.extensions[pt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Uf(t.attributes):e=i.indices+":"+Uf(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Uf(i.targets[n]);return e}function Uf(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ad(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function y2(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var M2=new Ge,od=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new d2,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?(this.textureLoader=new cs(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Eo(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ca(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Mr(r,o,s),zi(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[pt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(hs.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Nf[s.type],o=ba[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new zt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Nf[s.type],l=ba[s.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,f=s.byteOffset||0,h=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0,x,g;if(h&&h!==d){let m=Math.floor(f/h),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,_=t.cache.get(v);_||(x=new l(o,m*h,s.count*h/u),_=new ea(x,h/u),t.cache.add(v,_)),g=new ta(_,c,f%h/u,p)}else o===null?x=new l(s.count*c):x=new l(o,f,s.count*c),g=new zt(x,c,p);if(s.sparse!==void 0){let m=Nf.SCALAR,v=ba[s.sparse.indices.componentType],_=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,E=new v(a[1],_,s.sparse.count*m),b=new l(a[2],y,s.sparse.count*c);o!==null&&(g=new zt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let M=0,S=E.length;M<S;M++){let L=E[M];if(g.setX(L,b[M*c]),c>=2&&g.setY(L,b[M*c+1]),c>=3&&g.setZ(L,b[M*c+2]),c>=4&&g.setW(L,b[M*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return u.magFilter=ng[f.magFilter]||tn,u.minFilter=ng[f.minFilter]||Xn,u.wrapS=ig[f.wrapS]||Mi,u.wrapT=ig[f.wrapT]||Mi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==en&&u.minFilter!==tn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1,u;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)u=n.getDependency("bufferView",a.bufferView).then(function(f){return new Promise(function(h,p){t.parse(f,h,p)})});else{if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(f){l=!0;let h=new Blob([f],{type:a.mimeType});return c=o.createObjectURL(h),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");u=Promise.resolve(c).then(function(f){return new Promise(function(h,p){let x=h;t.isImageBitmapLoader===!0&&(x=function(g){let m=new dn(g);m.needsUpdate=!0,h(m)}),t.load(hs.resolveURL(f,r.path),x,void 0,p)})})}let d=u.then(function(f){return l===!0&&o.revokeObjectURL(c),zi(f,a),f.userData.mimeType=a.mimeType||y2(a.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=d,d}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[pt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[pt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[pt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new sa,Fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ia,Fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Vn}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[pt.KHR_MATERIALS_UNLIT]){let d=s[pt.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new _e(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let f=d.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],Un),o.opacity=f[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,Mt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=qt);let u=r.alphaMode||Df.OPAQUE;if(u===Df.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Df.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==bt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new me(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==bt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==bt){let d=r.emissiveFactor;o.emissive=new _e().setRGB(d[0],d[1],d[2],Un)}return r.emissiveTexture!==void 0&&a!==bt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Mt)),Promise.all(l).then(function(){let d=new a(o);return r.name&&(d.name=r.name),zi(d,r),t.associations.set(d,{materials:e}),r.extensions&&Mr(s,d,r),d})}createUniqueName(e){let t=kt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[pt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return sg(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=_2(l),d=s[u];if(d)a.push(d.promise);else{let f;l.extensions&&l.extensions[pt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=sg(new _t,l,t),l.mode===di.TRIANGLE_STRIP?f=f.then(h=>Cf(h,No)):l.mode===di.TRIANGLE_FAN&&(f=f.then(h=>Cf(h,ga))),s[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?g2(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let h=0,p=u.length;h<p;h++){let x=u[h],g=a[h],m,v=l[h];if(g.mode===di.TRIANGLES||g.mode===di.TRIANGLE_STRIP||g.mode===di.TRIANGLE_FAN||g.mode===void 0){let _=r.isSkinnedMesh===!0,y=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");_&&y===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=_&&y?new rr(x,v):new Ze(x,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===di.LINES)m=new eo(x,v);else if(g.mode===di.LINE_STRIP)m=new or(x,v);else if(g.mode===di.LINE_LOOP)m=new to(x,v);else if(g.mode===di.POINTS)m=new no(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&v2(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),zi(m,r),g.extensions&&Mr(s,m,g),t.assignFinalMaterial(m),d.push(m)}for(let h=0,p=d.length;h<p;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return r.extensions&&Mr(s,d[0],r),d[0];let f=new Ct;r.extensions&&Mr(s,f,r),t.associations.set(f,{meshes:e});for(let h=0,p=d.length;h<p;h++)f.add(d[h]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new fn(Ne.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new dr(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),zi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let d=a[l];if(d){o.push(d);let f=new Ge;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ar(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let d=0,f=s.channels.length;d<f;d++){let h=s.channels[d],p=s.samplers[h.sampler],x=h.target,g=x.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,v=s.parameters!==void 0?s.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",v)),l.push(p),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let f=d[0],h=d[1],p=d[2],x=d[3],g=d[4],m=[];for(let _=0,y=f.length;_<y;_++){let E=f[_],b=h[_],M=p[_],S=x[_],L=g[_];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let C=n._createAnimationTracks(E,b,M,S,L);if(C)for(let A=0;A<C.length;A++)m.push(C[A])}let v=new yo(r,void 0,m);return zi(v,s),v})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let u=l[0],d=l[1],f=l[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,M2)});for(let h=0,p=d.length;h<p;h++)u.add(d[h]);if(u.userData.pivot!==void 0&&d.length>0){let h=u.userData.pivot,p=d[0];u.pivot=new N().fromArray(h),u.position.x-=h[0],u.position.y-=h[1],u.position.z-=h[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Ts:l.length>1?u=new Ct:l.length===1?u=l[0]:u=new At,u!==l[0])for(let d=0,f=l.length;d<f;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=a),zi(u,r),r.extensions&&Mr(n,u,r),r.matrix!==void 0){let d=new Ge;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Ct;n.name&&(r.name=s.createUniqueName(n.name)),zi(r,n),n.extensions&&Mr(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,d=c.length;u<d;u++){let f=c[u];f.parent!==null?r.add(Qm(f)):r.add(f)}let l=u=>{let d=new Map;for(let[f,h]of s.associations)(f instanceof Fn||f instanceof dn)&&d.set(f,h);return u.traverse(f=>{let h=s.associations.get(f);h!=null&&d.set(f,h)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}Bs[r.path]===Bs.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(Bs[r.path]){case Bs.weights:u=as;break;case Bs.rotation:u=os;break;case Bs.translation:case Bs.scale:u=Cs;break;default:n.itemSize===1?u=as:u=Cs;break}let d=s.interpolation!==void 0?m2[s.interpolation]:nr,f=this._getArrayFromAccessor(n);for(let h=0,p=c.length;h<p;h++){let x=new u(c[h]+"."+Bs[r.path],t.array,f,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ad(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof os?sd:xh;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function b2(i,e,t){let n=e.attributes,s=new ei;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){let u=ad(ba[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new N,c=new N;for(let l=0,u=r.length;l<u;l++){let d=r[l];if(d.POSITION!==void 0){let f=t.json.accessors[d.POSITION],h=f.min,p=f.max;if(h!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(p[2]))),f.normalized){let x=ad(ba[f.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new Gn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function sg(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=rd[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return dt.workingColorSpace!==Un&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${dt.workingColorSpace}" not supported.`),zi(i,e),b2(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?x2(i,e.targets,t):i})}function ag(){let i=new Ct,e=Fm(),t=Xm(i,e),n=new Float32Array(3),s=null,r=null;function a(){return s||(s=new mh().loadAsync("./art/brawler.glb?v=ringmaster2").then(({scene:l})=>{i.add(l);let u=E=>l.getObjectByName(E),d=u("Pelvis"),f=u("Spine"),h=u("Head"),p=d.position.y,x=["L","R"].map(E=>Object.fromEntries(["Hip","Knee","Ankle","Arm","Elbow","Wrist"].map(b=>[b,u(b+E)]))),g=u("Brawler");g.frustumCulled=!1;let m=g.material;m.color.setScalar(.84),m.emissiveMap=m.map,m.emissive.setScalar(.24);let v=new oa;v.moveTo(-.17,-.125),v.lineTo(.17,-.125),v.quadraticCurveTo(.21,-.125,.21,-.088),v.lineTo(.21,.092),v.quadraticCurveTo(.21,.125,.17,.125),v.lineTo(-.17,.125),v.quadraticCurveTo(-.21,.125,-.21,.086),v.lineTo(-.21,-.086),v.quadraticCurveTo(-.21,-.125,-.17,-.125);let _=new lr;_.moveTo(-.145,-.072),_.lineTo(-.145,.072),_.lineTo(.145,.072),_.lineTo(.145,-.072),_.closePath(),v.holes.push(_);let y=new Ze(new xo(v,{depth:.027,bevelThickness:.009,bevelSize:.009,bevelSegments:2}),new Vn({color:13217934,metalness:.48,roughness:.42}));return y.position.set(0,.15,.85),y.rotation.x=-.11,d.add(y),r={model:l,pelvis:d,spine:f,head:h,hipsY:p,limbs:x,skin:g,material:m,buckle:y},!0}),s)}function o(l){return l==="bruiser"?a():e.prepare(l)}function c({time:l,walk:u,march:d,attack:f,hit:h,defeat:p,kind:x="bruiser",vault:g=0,brace:m=0,drive:v=0,charge:_=0,release:y=0,mode:E}){let b=t(x,{time:l,walk:u,march:d,attack:f,defeat:p,vault:g,charge:_,release:y,mode:E,hit:h});if(r&&(r.skin.visible=r.buckle.visible=!b),b||!r)return;let{pelvis:M,spine:S,head:L,hipsY:C,limbs:A,material:D}=r,B=Math.min(1,g/1.35),P=Math.sin(Math.PI*Math.max(0,Math.min(1,(g-.21)/.89))),V=Tt(g,0,.14)*(1-Tt(g,.14,.32)),Z=Tt(g,1.04,1.13)*(1-Tt(g,1.14,1.35)),X=1-Tt(p,0,.38),se=X*Tt(f,0,.19)*(1-Tt(f,.2,.3+.1)),W=X*Math.sin(Math.PI*il(f)),U=X*Tt(f,.11,.53)*(1-Tt(f,.68,.91)),R=X*Tt(f,.68,.91)*(1-Tt(f,1.01,1.48)),O=X*Tt(f,.91,1)*(1-Tt(f,1.01,1.39)),he=Tt(p,.12,.58),G=Tt(p,.82,1.34),ee=u*(1-Tt(f,.015,.16)+Tt(f,1.32,1.48))*(1-he)*(1-.9*Math.sin(Math.PI*B)),H=.41,q=d==null?l*6.75:d*Math.PI*.55/H;Us(q,ee,n);let Q=n[0];M.position.y=C+(-.105+(.5-.5*Math.cos(2*q))*.047)*ee-.3*se-.48*O-.17*he-.32*V-.26*Z,M.rotation.set(.055*se-.075*W,Q*.105,Q*.043-he*.075),S.rotation.set(.06+.24*V+.19*Z-.14*P+.13*v+.24*se-.18*U+.42*R-.084*h,-Q*.16,-.057*Q-.16*he),x==="bruiser"&&(S.rotation.x+=.16*_+.31*y),L.rotation.set(-.29-.12*se+.07*U-.34*R+.21*he,Q*.052,.032*Q);for(let[fe,tt]of A.entries()){let Be=fe?1:-1,$e=n[fe],nt=Math.max(0,(fe===0?1:-1)*n[2]),oe=-tt.Knee.position.y,ge=-tt.Ankle.position.y,ye=oe+ge+M.position.y-C-nt*.22,Ie=H*$e,Se=Math.min(oe+ge-1e-5,Math.hypot(ye,Ie)),je=ct=>Math.acos(Ne.clamp(ct,-1,1)),Ue=Math.atan2(-Ie,ye)-je((oe*oe+Se*Se-ge*ge)/(2*oe*Se)),st=Math.PI-je((oe*oe+ge*ge-Se*Se)/(2*oe*ge));tt.Hip.rotation.x=Ue-(.62+fe*.13)*P-(.6+fe*.11)*W+Be*.27*he,tt.Knee.rotation.x=st+.78*P+.22*Z+.86*W+.22*he,tt.Ankle.rotation.x=-Ue-st+.19*$e-.31*W,tt.Arm.rotation.set(.37*$e-.76*P+.18*V-(fe?0:.82)*m-(fe?.65:0)*v-.24*se-(2.04+fe*.09)*U-.38*R,Be*(.23*U+.1*R+.22*P),Be*(.035+.12*se+.28*U+.055*R+.69*he-.26*G)),tt.Elbow.rotation.x=-.26-.17*Math.max(0,-$e)-.4*se-.65*U+.12*R-.4*he,tt.Arm.rotation.x-=1.36*_+.11*y,tt.Elbow.rotation.x-=.34*_,tt.Wrist.rotation.set(-.24-.13*U+.22*R,Be*.58*U,Be*(.075*$e+.11*U))}D.emissive.setRGB(.24+h*.52,.24+h*.3,.24+h*.16)}return{root:i,pose:c,prepare:o}}var w2={timber:[1.85,.077],quarry:[3.35,.105],forge:[3.7,.084],ice:[4.05,.069],cinder:[3.8,.119]},T2=[0,0],ld=`
  uniform vec4 roadCurve;
  float lateralBend(float z){
    float offset = roadCurve.x * (cos(roadCurve.z - z * roadCurve.y) - roadCurve.w)
                 * smoothstep(5.0, 21.0, -z);
    float limit = max(0.6, -z * 0.18 - 0.8);
    return offset * inversesqrt(1.0 + (offset / limit) * (offset / limit));
  }`,og=new WeakSet,cg=new WeakMap;function lg(i){if(og.has(i)||i.userData.unbent)return;og.add(i);let e=i.onBeforeCompile,t=i.customProgramCacheKey();i.customProgramCacheKey=()=>t+"-road-bend",i.onBeforeCompile=function(n,s){e.call(this,n,s),Object.assign(n.uniforms,cg.get(s));let r="if (roadCurve.x != 0.0) gl_Position += roadRight * lateralBend(dot(roadDepth, gl_Position));",a=n.vertexShader;a.includes("#include <project_vertex>")?a=a.replace("#include <project_vertex>",`#include <project_vertex>
`+r):a=a.replace(/gl_Position\s*=[^;]+;/g,o=>o+`
`+r),n.vertexShader=ld+`
uniform vec4 roadDepth, roadRight;
`+a},i.needsUpdate=!0}function hg(i,e){let t=new gt,n=new gt,s=new gt,r=new Ge;cg.set(i,{roadCurve:{value:t},roadRight:{value:n},roadDepth:{value:s}});let a=-1,o=!0;function c(u){u.material&&(Array.isArray(u.material)?u.material.forEach(lg):lg(u.material),u.frustumCulled=!1)}function l(u){u&&u.traverse(c)}return{markDirty(){o=!0},scanNode:l,prepareScene(){let u=e.children.length;for(let d=0;d<e.children.length;d++){let f=e.children[d];u=u*31+f.children.length+(f.visible?1:0)|0}!o&&u===a||(a=u,o=!1,e.traverseVisible(c))},setRoute(u,d,f){let[h,p]=w2[u]||T2,x=f*p+d%5*.69+.63;t.set(h,p,x,Math.cos(x))},offset(u){let d=t.x*(Math.cos(t.z-u*t.y)-t.w)*Ne.smoothstep(-u,5,21),f=Math.max(.6,-u*.18-.8);return d/Math.hypot(1,d/f)},setCamera(u){r.multiplyMatrices(u.projectionMatrix,u.matrixWorldInverse),n.fromArray(r.elements,0);let d=r.invert().elements;s.set(d[2],d[6],d[10],d[14])},curve:t}}var cd="M4 17h24v3H4z M6 16c0-6 4-11 10-11s10 5 10 11z M10 22h12c-1 4-3 6-6 6s-5-2-6-6z",A2={plus:cd,squad:cd,reserve:cd,merge:"M3 16l17-10 5 8-16 10z M6 23l5-3 4 7-6 2z M21 5l3-2 6 10-3 2z",range:"M3 20l14-10 3 4L7 25z M14 7l15-4-6 15-2-7z",longshot:"M3 20L18 9l3 4L7 25z M16 6l14-4-6 14-2-7z M3 12l8-6 2 2-8 7z M12 26l7-6 2 2-7 6z",rapid:"M3 11l8 5-8 5v-4l3-1-3-1z M11 8l12 8-12 8v-5l5-3-5-3z M22 9l8 7-8 7v-5l3-2-3-2z",shield:"M16 2l12 5v8c0 6-5 12-12 15C9 27 4 21 4 15V7z M16 7v17c5-3 7-6 7-10V10z",blast:"M14 12l5-2 1-5 4 1-2 6c5 3 6 8 3 13-3 5-12 6-17 1-4-4-4-12 1-15z M23 3l3-2 2 2-4 3z",plasma:"M17 1L5 18h9l-2 13 16-20H17l4-10z",spread:"M6 29V13H2l7-10 7 10h-4v16z M20 26V11h-4l7-9 7 9h-4v15z",drone:"M11 13h10l3 4-4 4h-8l-4-4z M3 6l8 5-2 3-8-5z M21 11l8-5 2 3-8 5z M1 24l8-5 2 3-8 5z M21 22l2-3 8 5-2 3z",engineer:"M2 23h28v4H2z M4 21V6h4v6c5 4 11 4 16 0V6h4v15h-4v-5l-4 2v3h-3v-2h-3v2h-3v-3l-3-2v5z",medic:"M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z",frost:"M14 1h4v10l8-5 2 4-9 6 9 6-2 4-8-5v10h-4V21l-8 5-2-4 9-6-9-6 2-4 8 5z",fever:"M15 1c2 8 8 8 7 15 3-1 4-4 4-6 8 16-5 23-12 20C4 28 2 21 7 13c0 4 2 5 3 5-1-7 5-10 5-17z"},ug={blue:{top:"#36acf9",bottom:"#0574e4",rim:"#81d7ff",light:"#f6fcff",ink:"#ffffff",shade:"#1150a9",badge:"#1678d2"},gold:{top:"#ffe336",bottom:"#efbf0c",rim:"#ffeb79",light:"#fff9ce",ink:"#ffffff",shade:"#916808",badge:"#c78b0d"}};function Sa(i,e,t){i.beginPath(),e.forEach(([n,s],r)=>r?i.lineTo(n,s):i.moveTo(n,s)),i.closePath(),i.fillStyle=t,i.fill()}function fg(i,e,t,n,s){let r=ug[Rn[e].tone];i.save(),i.translate(t,n),i.scale(s/100,s/100);let a=[[-34,-46],[34,-46],[48,-31],[48,21],[33,35],[0,49],[-33,35],[-48,21],[-48,-31]];Sa(i,a,r.shade),i.scale(.94,.94),Sa(i,a,r.rim),i.scale(.88,.88);let o=i.createLinearGradient(0,-45,0,45);o.addColorStop(0,r.badge),o.addColorStop(1,r.shade),Sa(i,a,o),i.scale(2,2),i.translate(-16,-16);let c=new Path2D(A2[e]);i.translate(0,1.3),i.fillStyle=r.shade,i.fill(c,"evenodd"),i.translate(0,-1.3),i.fillStyle=r.light,i.fill(c,"evenodd"),i.restore()}function dg(i){let e=new On(i);return e.colorSpace=Mt,e.anisotropy=4,e}function R2(i,e,t,n,s,r){i.save(),i.translate(t,n),i.scale(s/640,r/196);let a=ug[Rn[e].tone],o=i.createLinearGradient(0,0,0,196);o.addColorStop(0,a.top),o.addColorStop(.52,a.bottom),o.addColorStop(1,a.shade),i.fillStyle=o,i.fillRect(0,0,640,196),Sa(i,[[0,0],[152,0],[104,196],[0,196]],a.shade);let c=i.createLinearGradient(160,0,560,180);c.addColorStop(0,"rgba(255,255,255,0.22)"),c.addColorStop(.45,"rgba(255,255,255,0.04)"),c.addColorStop(.55,"rgba(255,255,255,0.16)"),c.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=c,i.fillRect(105,8,530,110),Sa(i,[[0,0],[640,0],[640,10],[14,10],[0,22]],a.rim),i.fillStyle="rgba(255,255,255,.18)",i.fillRect(14,178,612,4);for(let h of[14,626])for(let p of[23,175])i.fillStyle=a.shade,i.fillRect(h-4,p-3,8,6),i.fillStyle=a.light,i.fillRect(h-3,p-3,6,2);for(let h of[548,574,600])Sa(i,[[h,152],[h+14,152],[h+8,165],[h-6,165]],a.rim);fg(i,e,71,98,106);let l=Rn[e],u=l.count?150:124;i.font="900 "+u+'px "Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif',i.textAlign="center";let d=i.measureText(l.label),f=98+(d.actualBoundingBoxAscent-d.actualBoundingBoxDescent)/2;i.translate(362,f),i.scale(Math.min(1,405/d.width),1),i.lineJoin="round",i.lineWidth=l.count?16:12,i.strokeStyle="#14263b",i.strokeText(l.label,0,3),i.fillStyle=a.ink,i.fillText(l.label,0,0),i.restore()}function pg(){let i=Object.keys(Rn),e=4,t=Math.ceil(i.length/e),n=512,s=160,r=document.createElement("canvas");r.width=e*n,r.height=t*s;let a=r.getContext("2d"),o=new Map;return i.forEach((c,l)=>{let u=l%e,d=Math.floor(l/e);R2(a,c,u*n,d*s,n,s),o.set(c,[u/e,1-(d+1)/t])}),{map:dg(r),cells:o,scaleU:1/e,scaleV:1/t}}function mg(i){let e=Object.keys(Rn),t=Math.ceil(Math.sqrt(e.length)),n=128,s=document.createElement("canvas");s.width=s.height=t*n;let r=s.getContext("2d"),a=new Map;e.forEach((h,p)=>{let x=p%t,g=Math.floor(p/t);fg(r,h,(x+.5)*n,(g+.5)*n,118),a.set(h,[x/t,1-(g+1)/t])});let o=new bt({map:dg(s),side:qt,alphaTest:.26,toneMapped:!1});o.onBeforeCompile=h=>{h.vertexShader=`attribute vec2 badgeCell;
`+h.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
vMapUv = vMapUv * `+(1/t).toFixed(6)+" + badgeCell;")};let c=new Ut(.99,.99),l=40,u=new Zt(new Float32Array(l*2),2);u.setUsage(Yt),c.setAttribute("badgeCell",u);let d=new Dt(c,o,l);d.name="Flying supply insignia",d.count=0,d.frustumCulled=!1,d.instanceMatrix.setUsage(Yt),i.add(d);let f=new At;return{update(h){let p=0;for(let x of h){if(x.slot!=null||x.age<0||p>=l)continue;let g=x.progress;f.scale.setScalar(.65+.62*Math.sin(Math.PI*g)),f.rotation.set(-.57,Math.sin(g*Math.PI*2)*.48,.13*Math.sin(g*Math.PI*2)),f.position.set(x.x,x.y+.35,x.z),f.updateMatrix(),d.setMatrixAt(p,f.matrix);let m=a.get(x.type);u.setXY(p++,m[0],m[1])}d.count=p,d.visible=p>0,p&&(d.instanceMatrix.clearUpdateRanges(),d.instanceMatrix.addUpdateRange(0,p*16),d.instanceMatrix.needsUpdate=!0,u.clearUpdateRanges(),u.addUpdateRange(0,p*2),u.needsUpdate=!0)}}}function gg(i){let e=[],t="#386167",n="#394852",s="#d9a35c",r="#866047",a=(h,p,x,g,m,v,_,y=null)=>e.push(Ke(rn(h,p,x),g,m,v,_,y)),o=(h,p,x,g,m,v,_,y,E=null)=>e.push(Ke(new sn(h,p,x,g),m,v,_,y,E)),c=(h,p,x,g)=>e.push(En(h,p,x,g,6));function l(h,p,x,g,m,v,_,y){let E=new ss(1);E.scale(g,m,v),e.push(Ke(E,_,h,p,x,new Xt(.09,y,.15)))}function u(h,p,x){a(3.6,.38,x,"#806d5b",h,-1.8,p);for(let g of[-1,1]){a(.13,.19,x,"#c7a073",h+1.67*g,-1.52,p);for(let m of[-1,1])o(.16,.24,2.9,8,r,h+1.45*g,-2.65,p+m*(x/2-.25))}for(let g=0;g<x/.45;g++)a(3.25,.034,.026,"#a78869",h,-1.58,p-x/2+.2+g*.45)}function d(h,p){o(1.2,1.65,1.9,12,"#8c8e83",h,-2.72,p),o(.66,.9,2.55,14,"#ebe4c4",h,-.55,p),o(.72,.8,.68,14,"#b95843",h,-.42,p),o(.86,.66,.22,14,n,h,.82,p),o(.6,.6,.7,12,"#fbdc91",h,1.24,p);for(let x=0;x<8;x++){let g=x*Math.PI/4;o(.045,.045,.83,5,t,h+.61*Math.cos(g),1.25,p+.61*Math.sin(g))}o(.05,.9,.52,12,"#587579",h,1.92,p),o(.04,.04,.39,8,s,h,2.32,p)}function f(h,p,x){let g=h>0?-1:1,m=h+g*1.9,v=-1.5+x;a(.75,.48,.76,n,h,-1.25,p);for(let _ of[-.28,.28]){a(.12,x,.12,"#d4a354",h,-1.51+x/2,p+_),c([h,v-.77,p+_],[m,v+.32,p+_],.06,s),c([h,v+.34,p+_],[m,v+.32,p+_],.075,s);for(let y=0;y<4;y++)c([h,-1.37+y*x/4,p+_],[h,-1.37+(y+1)*x/4,p-_],.035,t)}a(.59,.57,.82,"#a47849",h-g*.28,v+.14,p),o(.14,.14,.75,10,n,m,v+.29,p,new Xt(Math.PI/2,0,0)),c([m,v+.26,p],[m,v-.79,p],.025,n),a(.7,.47,.69,"#b77749",m,v-1.02,p);for(let _ of[-.2,.2])a(.73,.5,.045,n,m,v-1.02,p+_)}if(i==="quay"){d(-8.95,-2);for(let h=0;h<4;h++)l(-9-.56*(h%2),-3.55,-.2+h*.65,.93,.55,1.1,"#87958b",h*.7);u(9.1,15,5.1),f(9.5,15.85,2.55);for(let[h,p]of[[8.38,13.6],[9.4,13.4],[8.43,14.36]])a(.8,.58,.65,"#bd906c",h,-1.28,p),a(.09,.61,.675,t,h-.23,-1.28,p)}else if(i==="timber"){for(let[h,p,x]of[[-9,-1,3.9],[-10.7,-3,4.6],[-9.4,1.2,3],[10,14,3.8],[11.1,16,4.1]]){l(h,-3.54,p,1.95,.85,2.1,"#73877a",h),o(.14,.25,x*.72,8,r,h,-2+x*.23,p);for(let g=0;g<3;g++)o(.02,(1.5-g*.28)*x/4,x*.51,8,["#3e6857","#4f8069","#74a186"][g],h,-2+x*(.38+g*.22),p)}u(8.65,17.5,4.1);for(let h of[16.4,18.6])for(let p of[8.1,9.2])a(.14,2.8,.14,r,p,-.18,h);a(1.72,.14,3.06,"#cb9760",8.65,1.18,17.5),o(0,1.83,.71,4,"#587c70",8.65,1.6,17.5,new Xt(0,.785,0))}else if(i==="quarry"||i==="cinder"||i==="ice"){let h=i==="ice",p=i==="cinder",x=h?["#8dbdcc","#b4d4db","#d5e9e7"]:p?["#433f49","#57505e","#736362"]:["#957765","#a7866d","#c1a383"];for(let[g,m]of[[-1,0],[1,17]])for(let v=0;v<6;v++){let _=g*(8.6+v%3*.98),y=m+(v%2*2-1)*(v*.64+.4),E=1.32+v%3*.77;l(_,-3.29,y,2.12,E,2.32,x[0],v*1.27),p?(o(.58,.8,E,6,x[v%3],_,-2+E*.26,y),o(.49,.51,.09,6,"#b96845",_,-2+E*.76,y)):(l(_,-3.25+E*.44,y,1.62,E*.68,1.95,x[1],v*1.27),l(_,-3.17+E*.72,y,1.18,E*.45,1.49,x[2],v*1.27)),h&&v%2===0&&o(.01,.44,1.75,5,"#a5edf0",_,-.95,y,new Xt(0,0,g*.24))}!p&&!h&&(u(9.7,10,4.3),f(9.6,10.5,3.4))}else if(i==="forge"){u(-9.4,0,6.1),f(-9.5,0,4.1),u(9.3,15,7.2);for(let[h,p,x]of[[8.8,16,3.8],[10,14.8,2.9]]){o(.37,.43,x,14,"#637d83",h,-1.4+x/2,p);for(let g of[.17,.57,.95])o(.42,.42,.12,14,s,h,-1.4+g*x,p);o(.29,.29,.06,14,n,h,-1.36+x,p)}for(let h of[12.1,13.2])a(2.2,.63,.82,"#a86c49",9.24,-1.26,h)}return Sn(e)}var hd=new Kt({vertexColors:!0,shininess:33,specular:5527131}),ri=(i=0,e=0,t=0)=>new Xt(i,e,t),lt=(i,e,t,n,s,r,a,o=0,c=null)=>Ke(rn(i,e,t,o),n,s,r,a,c),Ht=(i,e,t,n,s,r,a,o=null,c=16)=>Ke(new sn(i,e,t,c),n,s,r,a,o),_h=(i,e,t,n,s,r,a=null)=>Ke(new ii(i,e,7,30),t,n,s,r,a),br=i=>new Ze(Sn(i),hd),Yn="#506272",ps="#e4aa48",vh="#f6dda0",Ti="#394655",ud="#b78053",ZT=Ne.clamp;function C2(i){let e=[],t=[];if(i==="glass"){e.push(lt(3.87,.17,.83,ud,0,.11,0,.04),lt(3.83,.28,.075,Yn,0,.26,.38,.025));for(let n of[-1.79,1.79])e.push(lt(.15,.62,.77,Ti,n,.35,0,.03));for(let[n,s]of[0,-1.12,1.12].entries()){let r=n===0?1.14:.91,a=[Ht(.38,.32,.12,"#176c72",s,.23,0),Ht(.38,.38,r*.59,"#45bdb3",s,.28+r*.29,0),Ht(.13,.38,r*.32,"#7ae1cc",s,.28+r*.74,0),Ht(.13,.13,.22,"#309994",s,.34+r*.93,0),Ht(.167,.167,.09,"#f7cf7a",s,.46+r*.93,0),Ht(.39,.39,.14,"#f7edbe",s,.37+r*.3,0),lt(.06,r*.34,.045,"#ddfff2",s-.21,.48+r*.38,.3,.015,ri(0,0,-.12))];t.push(br(a))}}else if(i==="crates"){e.push(lt(3.89,.15,.91,Ti,0,.09,0,.035));for(let[n,s]of[0,-1.24,1.24].entries()){let r=n===0?1.35:.96,a=[lt(1.18,r,.78,n?"#b77d49":"#cf925c",s,.17+r/2,0,.065)];for(let o of[-1,1]){a.push(lt(.105,r,.085,"#f0c685",s+o*.48,.17+r/2,.4,.013),lt(1.14,.078,.085,"#704d3c",s,.17+r*(o>0?.9:.12),.405,.012),En([s+o*.46,.27,.46],[s-o*.46,r+.04,.46],.052,"#ebc188",6));for(let c of[.3,r+.01])a.push(Ht(.038,.038,.022,Yn,s+o*.48,c,.458,ri(Math.PI/2),8))}t.push(br(a))}}else{e.push(lt(3.89,.16,.92,Ti,0,.09,0,.05),lt(3.84,1.12,.6,"#56697b",0,.71,0,.06));for(let n=0;n<5;n++)e.push(lt(3.62,.12,.14,n%2?"#8ea3ad":"#a7b7bf",0,.29+n*.21,.3,.025));for(let n of[-1.79,1.79]){e.push(lt(.21,1.37,.7,Yn,n,.67,0,.04));for(let s of[.3,.73,1.14])e.push(lt(.22,.14,.06,"#f2bc59",n,s,.369,0,ri(0,0,.18)))}e.push(lt(.93,.74,.14,Ti,0,.8,.36,.055),_h(.258,.067,"#ffb94e",0,.83,.46),Ht(.15,.15,.06,"#ee702e",0,.83,.47,ri(Math.PI/2),16))}return e.push(lt(1.13,.32,.08,Ti,0,.23,.455,.035)),{base:br(e),sections:t}}function P2(){let i=[lt(1.52,1.19,1.24,"#a97748",0,.82,0,.055),lt(1.68,.15,1.39,Yn,0,.25,0,.033),lt(1.65,.12,1.38,"#66737b",0,1.46,0,.03),lt(1.58,.25,.074,"#ffc76c",0,1.12,.631),_h(.175,.046,ps,0,1.66,0)];for(let c of[-1,1]){i.push(lt(.18,1.34,1.32,"#495866",c*.61,.86,0,.025)),i.push(lt(.23,.17,1.48,Ti,c*.52,.11,0,.03));for(let l of[.39,1.32])i.push(Ht(.047,.047,.045,vh,c*.61,l,.669,ri(Math.PI/2),8));i.push(En([c*.48,.44,.644],[-c*.47,.95,.644],.046,"#ddbb89",6))}for(let c=-2;c<=2;c++)i.push(lt(.09,.24,.02,Ti,c*.22,1.12,.676,0,ri(0,0,-.42)));let e=[];for(let c=0;c<12;c++){let l=c*Math.PI/6,u=new Rs(.95,1,8,1,l+.035,Math.PI/6-.07);if(u.rotateX(-Math.PI/2),e.push(Ke(u,c%3?"#ffbb49":"#fff0aa",0,.013,0)),c%3===0){let d=new ns(.075,.17,3);d.rotateX(Math.PI/2),d.rotateY(Math.PI/2+l),e.push(Ke(d,"#fff0aa",Math.cos(l)*.87,.01,-Math.sin(l)*.87))}}let t=new bt({vertexColors:!0,toneMapped:!1,depthWrite:!1}),n=new Ze(Sn(e),t);n.renderOrder=3;let s=new ao(1,48);s.rotateX(-Math.PI/2);let r=new Ze(s,new bt({color:"#ff7e31",transparent:!0,opacity:.13,depthWrite:!1}));r.renderOrder=2;let a=new Rs(.96,1,48);a.rotateX(-Math.PI/2);let o=new Ze(a,new bt({color:"#fff0a4",transparent:!0,opacity:.77,depthWrite:!1}));return o.renderOrder=3,{base:br(i),halo:n,tint:r,sweep:o}}function I2(i,e=4.4,t=1,n){if(i==="cover")return C2(n);if(i==="skyfall")return P2();let s=[],r=[],a=[];if(i==="gap"||i==="bridge"){let o=e/2;for(let l of[-1,1]){s.push(lt(4.22,.43,.25,Yn,0,-.2,l*(o+.04),.035));for(let u=-3;u<=3;u++)s.push(lt(.29,.025,.19,u%2?ps:Ti,u*.53,.025,l*(o+.21),0,ri(0,.23,0)));for(let u of[-1,1]){let d=u*1.97;s.push(lt(.2,.83,.24,Ti,d,-.39,l*o,.025),En([d,-.85,l*o],[d,-.1,l*(o+.65)],.055,Yn))}}let c=Math.round(e/.4);for(let l=0;l<c;l++){let u=(l+.5)*e/c;r.push(lt(4.03,.14,e/c-.025,l%3===0?"#c59762":ud,0,.01,u,.018));for(let d of[-1.54,1.54])r.push(Ht(.056,.056,.015,Yn,d,.085,u,null,7))}for(let l of[-1.5,1.5])r.push(lt(.19,.28,e,Yn,l,-.14,o,.024));if(i==="bridge"){for(let l of[-1,1]){let u=l*1.92;s.push(lt(.21,1.72,.34,Yn,u,.82,-o,.04),Ht(.23,.23,.12,ps,u,1.68,-o,ri(0,0,Math.PI/2)),En([u,.12,-o-.42],[u,1.3,-o],.054,vh))}s.push(Ht(.16,.16,3.9,Yn,0,.11,-o,ri(0,0,Math.PI/2))),s.push(lt(1.33,.61,.41,Yn,0,.33,o+.24,.055),lt(1.45,.09,.48,ps,0,.64,o+.24,.025))}else for(let l=0;l<5;l++)s.push(En([l*.63-1.25,-.11,-o],[l*.63-1.21,-.18,-o+.28+l%2*.18],.024,Yn,6))}else if(i==="cache"){for(let o=0;o<3;o++)for(let c=0;c<5;c++){let l=["#af7149","#ba8051","#cf955f","#a56745"];s.push(lt(.643,.366,.65,l[(c+2*o)%4],(c-2)*.665,.22+o*.385,0,.033))}for(let o of[-1.53,1.53]){s.push(lt(.17,1.24,.75,ps,o,.6,0,.035));for(let c of[.19,.57,1.02])s.push(Ht(.047,.047,.034,vh,o,c,.389,ri(Math.PI/2),8))}s.push(lt(3.38,.11,.72,Ti,0,1.18,0,.025),lt(1.7,.61,.07,Ti,0,.63,.345,.055))}else if(i==="coil"){s.push(Ht(.78,.9,.22,Yn,0,.12,0,null,28),Ht(.26,.34,.96,"#b2d5ce",0,.68,0,null,28));for(let o=0;o<7;o++)s.push(_h(.39-o*.016,.044,o%2?"#cc8548":"#f3b867",0,.3+o*.115,0,ri(Math.PI/2)));s.push(Ht(.25,.3,.2,ps,0,1.19,0),Ke(new ss(.21,1),"#96ffff",0,1.39,0))}else if(i==="belt"){s.push(lt(3.9,.065,e,"#697981",0,.035,0,.045));for(let o of[-1.92,1.92])s.push(lt(.1,.11,e,ps,o,.074,0,.022));for(let o=0;o<11;o++)s.push(lt(3.74,.045,.055,"#475765",0,.08,(o-5)*e/11));for(let o=0;o<5;o++)for(let c of[-1,1])a.push(En([-.24*t,.107,(o-2)*1.53+c*.3],[.24*t,.107,(o-2)*1.53],.052,vh,6))}return{base:br(s),deck:r.length?br(r):null,arrows:a.length?br(a):null}}function L2(){let i=document.createElement("canvas");i.width=320,i.height=104;let e=i.getContext("2d"),t=new On(i);t.colorSpace=Mt;let n=new Ze(new Ut(1.56,.51),new bt({map:t,transparent:!0,depthWrite:!1,toneMapped:!1})),s="";return{mesh:n,label(r){r!==s&&(s=r,e.clearRect(0,0,320,104),e.font='900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif',e.textAlign="center",e.textBaseline="middle",e.lineWidth=9,e.strokeStyle="#2e3b48",e.strokeText(r,160,56),e.fillStyle="#fff3cf",e.fillText(r,160,56),t.needsUpdate=!0)},dispose(){t.dispose(),n.geometry.dispose(),n.material.dispose()}}}function xg(i,e){let t=i.getAttribute("color"),n=$n[e]||$n.quay,s=new _e(n.fog||"#14243d"),r=new _e(n.skyHorizon||"#8294ab"),a=new _e,o=new _e;for(let c=0;c<t.count;c++){a.fromBufferAttribute(t,c);let l=a.r*.213+a.g*.715+a.b*.072;o.lerpColors(s,r,Math.min(1,Math.sqrt(l)*1.12)),a.lerp(o,.22),t.setXYZ(c,a.r,a.g,a.b)}return i}function N2(i){let e=[];for(let t of[-1,1]){let n=t*6.68;i==="cinder"?e.push(Ht(.24,.2,.22,"#ff9838",n,.34,0,null,10),Ke(new Di(.22,0),"#ffe384",n,.56,0)):i==="ice"?e.push(Ke(new Di(.23,0),"#a8ffff",n,.58,0)):i==="forge"?e.push(lt(.32,.22,.26,"#ffaa44",n,.56,0,.04)):e.push(Ht(.2,.22,.28,"#ffd966",n,.56,0,null,12),Ke(new ni(.2,10,8),"#fff5b8",n,.7,0))}return Sn(e)}function D2(i){let e=$n[i],t=[];for(let n of[-1,1]){let s=n*6.68;if(t.push(lt(.32,4.7,.44,e.frame,s,-2.35,0,.03),En([s,-2.4,0],[s,-.25,2.3],.09,e.frame),lt(.56,.24,.56,e.frame,s,.22,0,.04),Ht(.26,.3,.14,ps,s,.36,0,null,10)),i==="timber"){for(let r of[0,.48])t.push(Ht(.13,.18,2,"#9d6e45",s+n*r,-.4,1.3+r,null,9));t.push(En([s,.32,1.3],[s,.28,4.9],.05,"#d1b586"));for(let[r,a]of[[2.3,1.9],[1.7,3.2]]){t.push(Ht(.16,.21,1.9,ud,s+n*a,-3,1+a,null,7));for(let o=0;o<3;o++)t.push(Ke(new ns(.84-o*.19,r*.58,8),["#2d7a56","#3d9968","#68be7f"][o],s+n*a,-2.62+o*.48,1+a))}}else if(i==="quarry"||i==="cinder"||i==="ice"){for(let r=0;r<4;r++){let a=new ns(.62+r*.15,1.6+r%2*1.4,i==="ice"?5:7);t.push(Ke(a,i==="ice"?["#67c7e8","#a6eef7"][r%2]:i==="cinder"?["#3d2b36","#5c3b3d"][r%2]:["#b8744e","#cf8d63"][r%2],s+n*(1.1+r*.6),-2.45+.3*r,r*1.35,ri(.09*r,.6*r,n*.16)))}i==="cinder"&&t.push(Ht(.28,.38,.44,"#59363a",s,.02,0),Ht(.24,.27,.12,"#ff7a33",s,.24,0))}else i==="forge"?t.push(Ht(.3,.3,3.6,"#5c788a",s+n*.38,-.53,.4,ri(Math.PI/2)),_h(.34,.06,ps,s+n*.38,-.53,1.75),lt(.52,.54,.48,Yn,s,.21,0,.045)):t.push(Ht(.06,.28,.16,"#395570",s,.84,0,null,10),Ht(.38,.52,.64,"#d9533f",s+n*1.85,-3.02,2.2),Ht(.22,.34,.26,"#fff2d2",s+n*1.85,-2.58,2.2))}return Sn(t)}function vg(i,e=new gt){let t=Array.from({length:10},()=>new gt(0,-1e3,0,0));function n(b){b.onBeforeCompile=M=>{M.uniforms.roadCuts={value:t},M.vertexShader=M.vertexShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
deckPosition=(modelMatrix*vec4(transformed,1.)).xyz;`),M.fragmentShader=M.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 deckPosition; uniform vec4 roadCuts[10];`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
for(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}`)}}let s=new Ze(new Ut(160,170),new Lt({uniforms:{deep:{value:new _e},crest:{value:new _e},fogColor:{value:new _e},clock:{value:0},origin:{value:0},biome:{value:0},roadCurve:{value:e}},vertexShader:"varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",fragmentShader:`${ld}
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
      }`}));s.rotation.x=-Math.PI/2,s.position.set(0,-3.7,-43),s.material.userData.unbent=!0,i.add(s);let r=new Map,a=new Map,o=new Map,c=new Map,l=new Map,u=new Ge,d=new bt({vertexColors:!0,toneMapped:!1}),f,h,p=new sn(.035,.035,1,8),x=new Kt({color:11246457}),g=new N,m=new N,v=new N,_=new N(0,1,0);function y(b){let M=[b.kind,b.variant||"",b.length||0,b.direction||0].join(":");r.has(M)||r.set(M,I2(b.kind,b.length,b.direction,b.variant));let S=r.get(M),L=new Ct,C=S.base.clone();L.add(C);let A=(S.sections||[]).map(X=>X.clone());for(let X of A)L.add(X);let D,B,P,V;if(S.halo){V={halo:S.halo.clone(),tint:S.tint.clone(),sweep:S.sweep.clone()};for(let X of Object.values(V))L.add(X);V.tint.position.y=.038,V.halo.position.y=.044,V.sweep.position.y=.048}let Z=[];if(S.deck&&(D=S.deck.clone(),D.position.z=-b.length/2,L.add(D)),S.arrows&&(B=S.arrows.clone(),L.add(B)),(b.kind==="cache"||b.kind==="bridge"||b.kind==="coil"||b.kind==="cover")&&(P=L2(),L.add(P.mesh),P.mesh.position.set(0,b.kind==="cover"?.25:b.kind==="cache"?.66:b.kind==="coil"?.55:.43,b.kind==="cover"?.512:b.kind==="bridge"?b.length/2+.48:b.kind==="coil"?.56:.397),b.kind==="cover"&&P.mesh.scale.setScalar(.78)),b.kind==="bridge")for(let X=0;X<2;X++){let se=new Ze(p,x);L.add(se),Z.push(se)}return i.add(L),{g:L,base:C,leaf:D,arrows:B,chains:Z,sections:A,label:P,drop:V}}function E(b){let M=b.route.theme;if(M!==f){if(f&&(a.get(f).visible=!1,o.get(f).visible=!1,c.get(f).visible=!1),f=M,!a.has(M)){let A=new Dt(xg(D2(M),M),hd,10);A.frustumCulled=!1;let D=new Dt(N2(M),d,10);D.frustumCulled=!1,D.instanceMatrix=A.instanceMatrix;let B=new Dt(xg(gg(M),M),hd,3);B.frustumCulled=!1,c.set(M,B),i.add(B),a.set(M,A),o.set(M,D),i.add(A,D)}a.get(M).visible=!0,o.get(M).visible=!0,c.get(M).visible=!0,s.material.uniforms.biome.value=M==="cinder"?2:M==="ice"?1:0,s.material.uniforms.deep.value.set($n[M].deep),s.material.uniforms.crest.value.set($n[M].glint),s.material.uniforms.fogColor.value.set($n[M].fog)}let S=c.get(M);for(let A=0;A<S.count;A++)S.setMatrixAt(A,u.makeTranslation(0,0,-36-A*47+b.distance%47));S.instanceMatrix.needsUpdate=!0;let L=a.get(M);for(let A=0;A<10;A++)L.setMatrixAt(A,u.makeTranslation(0,0,12-A*10+b.distance%10));if(L.instanceMatrix.needsUpdate=!0,s.material.uniforms.clock.value=b.elapsed,s.material.uniforms.origin.value=b.distance,b.features!==h){for(let A of l.values())A.g.removeFromParent(),A.label?.dispose();l.clear(),h=b.features}let C=0;for(let A of b.features){if(A.z<-68||A.z>14){let B=l.get(A);B&&(B.g.visible=!1);continue}let D=l.get(A)||y(A);if(l.set(A,D),D.g.visible=!0,D.g.position.set(A.x,0,A.z),D.drop){let B=A.state==="warning",P=A.state==="landed";if(D.g.visible=B||P&&A.age<.85,!D.g.visible)continue;let V=A.fallProgress||0,Z=A.age,X=A.radius;if(D.drop.halo.visible=D.drop.tint.visible=B,D.drop.halo.scale.setScalar(X),D.drop.tint.scale.setScalar(X),D.drop.sweep.visible=B||Z<.38,D.drop.sweep.scale.setScalar(X*(B?.1+.88*A.progress:1+.77*Ne.smoothstep(Z,0,.38))),D.base.visible=!0,B){let se=7.9+10*(1-Ne.smoothstep(A.progress,.08,.71));D.base.position.y=se*(1-V*V),D.base.rotation.set(.12*(1-V),.39*(1-V),.13*(1-V)),D.base.scale.setScalar(1)}else{let se=Math.sin(Z*20)*Math.exp(-Z*10);D.base.position.y=Math.abs(se)*.32,D.base.rotation.set(.08*se,0,.14*se),D.base.scale.setScalar(1-Ne.smoothstep(Z,.34,.83))}}if(A.kind==="cover"){let B=A.hp/A.maxHp;D.sections.forEach((P,V)=>{P.visible=B>V*.34}),D.g.rotation.z=Math.sin(A.age*95)*A.flash*.033}if(b.parade&&A.kind!=="bridge"&&A.kind!=="gap"&&(D.g.position.y-=1.8*Ne.smoothstep(b.endTime,0,.48),b.endTime>=.49&&(D.g.visible=!1)),A.kind==="gap"||A.kind==="bridge"){b.parade&&(D.exitAngle??(D.exitAngle=D.leaf.visible?D.leaf.rotation.x:Math.PI/2),D.leaf.position.y=.03),C<t.length&&t[C++].set(A.x,A.z,4.4/2-.055,A.length/2),D.leaf.visible=!!b.parade||A.kind==="bridge"||A.state==="repaired";let B=Ne.smoothstep(A.age,0,.58);D.leaf.rotation.x=b.parade?D.exitAngle*(1-Ne.smoothstep(b.endTime,0,.45)):A.state==="cut"?-.2+1.6*B:A.state==="ready"&&A.kind==="bridge"?-.2:A.state==="linked"?-.2*(1-B):0,A.state==="repaired"&&(D.leaf.position.y=.03+.22*(1-B));for(let P=0;P<D.chains.length;P++){let V=D.chains[P],Z=(P?1:-1)*1.83;V.visible=A.state!=="cut"&&A.state!=="repaired",g.set(Z,1.63,-A.length/2),m.set(Z,-Math.sin(D.leaf.rotation.x)*A.length+.1,-A.length/2+Math.cos(D.leaf.rotation.x)*A.length),v.subVectors(m,g),V.scale.y=v.length(),V.position.copy(g).lerp(m,.5),V.quaternion.setFromUnitVectors(_,v.normalize())}}D.arrows&&(D.arrows.position.x=Math.sin(b.elapsed*5)*.39*A.direction),D.label&&(D.label.mesh.visible=A.state==="ready",D.label.mesh.visible&&D.label.label((A.kind==="cover"?"":A.kind==="bridge"?"\u65AD\u7D22 ":A.kind==="coil"?"\u7535 ":"\u7BB1 ")+Math.ceil(A.hp))),(A.kind==="cache"||A.kind==="coil"||A.kind==="cover")&&A.state!=="ready"&&D.base.scale.setScalar(1-Ne.smoothstep(A.age,0,.24))}for(let A=C;A<t.length;A++)t[A].set(0,-1e3,0,0)}return{cutDeck:n,update:E}}var fd=13.2,wa=14,Xo=-110,yh=wa-Xo,Ea=(wa+Xo)/2,dd=-.18;function _g(i){let e=$n[i],t=parseInt(e.floor.slice(1),16),n=1024,s=768,r=document.createElement("canvas");r.width=n,r.height=s;let a=r.getContext("2d"),o=document.createElement("canvas");o.width=512,o.height=384;let c=o.getContext("2d");c.fillStyle="#a8a8a8",c.fillRect(0,0,512,384);let l=a.createImageData(n,s),u=t>>16&255,d=t>>8&255,f=t&255,h=941+i.charCodeAt(0)*31;for(let m=0;m<s;m++)for(let v=0;v<n;v++){h=Math.imul(1664525,h)+1013904223>>>0;let _=(h/4294967296-.5)*9,y=Math.min(v,n-1-v),E=Math.max(0,1-y/44)*28,b=2.6*Math.cos(v*.032+Math.sin(m*.025)),M=_+b-E,S=(m*n+v)*4;l.data[S]=Math.max(0,Math.min(255,u+M)),l.data[S+1]=Math.max(0,Math.min(255,d+M)),l.data[S+2]=Math.max(0,Math.min(255,f+M)),l.data[S+3]=255}a.putImageData(l,0,0),a.scale(4,4),c.scale(2,2);let p=(m,v,_,y,E,b,M=1)=>{m.strokeStyle=b,m.lineWidth=M,m.beginPath(),m.moveTo(v,_),m.lineTo(y,E),m.stroke()};if(a.fillStyle="rgba(35,38,54,.22)",a.fillRect(0,0,256,1.8),a.fillStyle="rgba(255,250,245,.34)",a.fillRect(0,2.2,256,1.1),c.fillStyle="#383838",c.fillRect(0,0,256,2.2),c.fillStyle="#dedede",c.fillRect(0,2.2,256,1.2),i==="quay"){for(let m of[24,61,108,148,195,232]){let v=a.createLinearGradient(m-8,0,m+8,0);v.addColorStop(0,"rgba(65,78,96,0)"),v.addColorStop(.5,"rgba(62,74,95,.075)"),v.addColorStop(1,"rgba(65,78,96,0)"),a.fillStyle=v,a.fillRect(m-8,0,16,192)}for(let m of[48,96,144])p(a,0,m,256,m,"rgba(72,76,92,.24)",1.1),p(a,0,m+1.4,256,m+1.4,"rgba(255,250,242,.38)",.9),p(c,0,m,256,m,"#4a4a4a",1.4),p(c,0,m+1.5,256,m+1.5,"#dcdcdc",.9);for(let[m,v]of[[7,42],[244,136]]){a.fillStyle="#798798",a.fillRect(m,v,5,15);for(let _=1.5;_<14;_+=2.2)p(a,m+.5,v+_,m+4.5,v+_,"#3e4c5e",.9)}}else if(i==="timber")for(let m=0;m<8;m++){let v=m*24;a.fillStyle=m%2?"rgba(92,58,32,.08)":"rgba(255,232,195,.07)",a.fillRect(0,v,256,24),p(a,0,v,256,v,e.joint,1.8),p(a,0,v+2,256,v+2,e.rim,.85),p(c,0,v,256,v,"#2c2c2c",2),p(c,0,v+2,256,v+2,"#e2e2e2",1);for(let _=0;_<5;_++){let y=(m*41+_*59)%236;a.strokeStyle="rgba(92,58,32,.22)",a.lineWidth=.85,a.beginPath(),a.moveTo(y,v+11),a.bezierCurveTo(y+14,v+5,y+22,v+17,y+42,v+11),a.stroke()}for(let _ of[12,82,174,244])a.fillStyle="#53453c",a.beginPath(),a.arc(_,v+12,1.7,0,Math.PI*2),a.fill()}else if(i==="forge")for(let m=0;m<3;m++)for(let v=0;v<4;v++){let _=m*85+6,y=v*48+5;a.fillStyle=(m+v)%2?"rgba(30,45,66,.09)":"rgba(235,245,255,.06)",a.fillRect(_,y,73,38),a.strokeStyle=e.joint,a.lineWidth=1.4,a.strokeRect(_,y,73,38),c.strokeStyle="#363636",c.lineWidth=1.6,c.strokeRect(_,y,73,38);for(let E=0;E<5;E++)p(a,_+8+E*11,y+27,_+14+E*11,y+18,"#c5d2df",1),p(c,_+8+E*11,y+27,_+14+E*11,y+18,"#eeeeee",1.2)}else if(i==="quarry")for(let m=0;m<4;m++){let v=m*48;p(a,0,v,256,v,e.joint,1.6),p(a,0,v+1.8,256,v+1.8,e.rim,.8),p(c,0,v,256,v,"#383838",1.8);for(let _=0;_<4;_++){let y=_*66+m%2*28;a.fillStyle=(_+m)%2?"rgba(130,75,45,.08)":"rgba(255,236,210,.06)",a.fillRect(y,v+2,64,44),p(a,y,v,y+1.5,v+48,e.joint,1.3),p(c,y,v,y+1.5,v+48,"#383838",1.5)}}else if(i==="cinder")for(let m=0;m<4;m++){let v=m*48;p(a,0,v,256,v,"#ff6e26",1.35),p(a,0,v+1.2,256,v+1.2,"#3d2224",1),p(c,0,v,256,v,"#242424",2);for(let _=0;_<4;_++){let y=_*68+m%2*30;a.fillStyle=(_+m)%2?"rgba(32,20,28,.16)":"rgba(255,120,60,.05)",a.fillRect(y,v+2,66,44),p(a,y,v,y+2,v+48,"rgba(255,108,42,.52)",1.2),p(c,y,v,y+2,v+48,"#282828",1.6)}}else if(i==="ice"){for(let m=0;m<192;m+=48)p(a,0,m,256,m,e.joint,1.2),p(a,0,m+1.5,256,m+1.5,"#ffffff",.9),p(c,0,m,256,m,"#505050",1.4);for(let m=0;m<14;m++){let v=m*61%244,_=m*43%176;p(a,v,_,v+18,_+16,"rgba(255,255,255,.72)",1.5),p(a,v+8,_+8,v+21,_+6,"rgba(110,195,235,.55)",1),p(c,v,_,v+18,_+16,"#f0f0f0",1.5)}}for(let m of[-1,1]){let v=m<0?1.6:250.4;a.fillStyle="rgba(24,34,48,.42)",a.fillRect(v,0,4,192),a.fillStyle="rgba(255,250,242,.55)",a.fillRect(v+.8,0,.9,192);for(let _ of[28,125])a.fillStyle="#5f6b7d",a.fillRect(v-.6,_,5.4,11),a.fillStyle=e.lampGlow||e.rim,a.fillRect(v+.7,_+2.2,2.8,4.2)}for(let m of[256/3,512/3]){a.fillStyle=e.line,a.fillRect(m-1.7,0,3.4,192),a.fillStyle=e.rim,a.fillRect(m-.3,0,1.15,192);for(let v=8;v<192;v+=32)a.fillStyle=e.rim,a.fillRect(m-1.5,v,3,9.5)}let x=new On(r);x.colorSpace=Mt,x.wrapT=Mi,x.anisotropy=4,x.repeat.y=yh/8;let g=new On(o);return g.wrapT=Mi,g.repeat.y=yh/8,{map:x,bumpMap:g}}function U2(i,e){let t=new Map,n,s=_g("quay");t.set("quay",s);let r=new Vn({map:s.map,bumpMap:s.bumpMap,bumpScale:.045,roughness:.76,metalness:.08}),a=new Ze(new Ut(fd,yh,1,100),r);a.rotation.x=-Math.PI/2,a.position.set(0,0,Ea),a.receiveShadow=!0,i.add(a);let o=(f,h)=>new Bn(f,h,yh,1,1,100),c=[Ke(o(fd+.16,.42),"#4e586e",0,-.22,Ea)];for(let f of[-1,1]){let h=f*fd/2;c.push(Ke(o(.16,.22),"#7e8699",h,.03,Ea)),c.push(Ke(o(.115,.052),"#d6dce8",h+f*.01,.148,Ea)),c.push(Ke(o(.06,.24),"#3b4356",h+f*.085,-.14,Ea)),c.push(Ke(o(.055,.025),"#9ea4b2",h-f*.09,.008,Ea))}let l=new Vn({vertexColors:!0,roughness:.56,metalness:.28}),u=new Ze(Sn(c),l);i.add(u),e.cutDeck(a.material),e.cutDeck(u.material);let d={quay:[.76,.08,.045],timber:[.84,.04,.06],quarry:[.86,.05,.065],forge:[.46,.42,.055],ice:[.34,.16,.04],cinder:[.74,.14,.065]};return f=>{let h=f.route.theme;if(t.has(h)||t.set(h,_g(h)),n!==h){let x=t.get(h);r.map=x.map,r.bumpMap=x.bumpMap;let[g,m,v]=d[h]||d.quay;r.roughness=g,r.metalness=m,r.bumpScale=v,r.needsUpdate=!0,l.color.set($n[h].railTop||"#ffffff"),n=h}let p=f.distance/8%1;r.map.offset.y=p,r.bumpMap.offset.y=p}}function yg(i,e){let t=[],n=[];function s(a,o,c,l,u,d,f,h){let p=c/2,x=[[-p,0],[p,0],[p+u,-l],[-p+u,-l]],g=[[-p+h,-h],[p-h,-h],[p+u-h,-l+h],[-p+u+h,-l+h]],m=[...x,...g],v=[0,0,0,0,d,d,f,f],_=[4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7];for(let y of _){let E=m[y];t.push(a+E[0],.008,o+E[1]),n.push(1,1,1,v[y])}}s(0,.1,i*1.01,e*.87,e*.92,.34,.22,.045),s(0,.17,i+.06,.32,.028,.22,.16,.07);let r=new _t;return r.setAttribute("position",new Ve(t,3)),r.setAttribute("color",new Ve(n,4)),r}function F2(i,e){let t=gi,n=1.09,s=.17;function r(_){let y=_?"#f5c218":"#1f83ec",E=_?"#9c7112":"#1b53a0",b=_?"#fff078":"#8fd5ff",M=[],S=[Ke(rn(t-.1,n,s,.047),y,0,n/2,0)];for(let C of[-1,1]){let A=C*(t/2-.046);S.push(Ke(rn(.085,n+.087,.205),b,A,n/2+.021,0)),M.push(Ke(rn(.23,.13,.4,.035),E,A,.065,.058)),S.push(Ke(rn(.13,.19,.23,.027),E,A,n-.04,0)),S.push(Ke(rn(.115,.044,.24),b,A,n-.09,0))}S.push(Ke(rn(t-.16,.047,.123),b,0,n-.012,-.003));let L=Sn(S);return L.rotateX(dd),L.translate(0,.059,.015),Sn([L,...M])}let a=new Ut(t-.19,n-.086);a.translate(0,n/2+.007,s/2+.004),a.rotateX(dd),a.translate(0,.059,.015);let o=yg(t,n),c=pg(),l=new Vn({vertexColors:!0,roughness:.36,metalness:.32}),u=new bt({map:c.map,toneMapped:!1});u.customProgramCacheKey=()=>"gate-sign-atlas",u.onBeforeCompile=_=>{_.vertexShader=`attribute vec2 signCell;
`+_.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
vMapUv = vMapUv * vec2(${c.scaleU.toFixed(6)}, ${c.scaleV.toFixed(6)}) + signCell;`)};let d=64,f=new Dt(r(!1),l,d),h=new Dt(r(!0),l,d),p=new Zt(new Float32Array(d*2),2);p.setUsage(Yt),a.setAttribute("signCell",p);let x=new Dt(a,u,d),g=new Dt(o,e,d);g.renderOrder=1;for(let _ of[f,h,x,g])_.count=0,_.visible=!1,_.frustumCulled=!1,_.instanceMatrix.setUsage(Yt),i.add(_);g.instanceMatrix=x.instanceMatrix;let m=new Ge;function v(_,y){_.count=y,_.visible=y>0,y>0&&(_.instanceMatrix.clearUpdateRanges(),_.instanceMatrix.addUpdateRange(0,y*16),_.instanceMatrix.needsUpdate=!0)}return(_,y)=>{let E=0,b=0,M=0;for(let S of _){if(M>=d)break;if(!S.active&&!(S.pop<.28)||S.z<Xo||S.z>=wa)continue;let L=c.cells.get(S.type);if(!L)continue;let C=S.active?0:S.pop/.28,A=(1+.24*Math.sin(Math.PI*C)+(S.flash||0)*.08)*(1-C*C);m.makeScale(A,A*(1-y)*(1+.18*Math.sin(C*Math.PI)),A),m.setPosition(S.x+.22*(S.x<0?1:-1)*C,Math.sin(C*Math.PI)*.38-y*.13,S.z),Rn[S.type].tone==="gold"?h.setMatrixAt(b++,m):f.setMatrixAt(E++,m),x.setMatrixAt(M,m),p.setXY(M,L[0],L[1]),M++}v(f,E),v(h,b),v(x,M),g.count=M,g.visible=M>0,M>0&&(p.clearUpdateRanges(),p.addUpdateRange(0,M*2),p.needsUpdate=!0)}}var O2=[[[[-.72,1.01],[-1.01,1.09],[-1.19,1.01],[-1.41,1.17]],[[-1.01,1.09],[-.93,1.24],[-1.02,1.39],[-.89,1.56]],[[-1.19,1.01],[-1.32,.86],[-1.51,.81]]],[[[-1.41,1.17],[-1.59,1.12],[-1.74,1.22],[-1.96,1.2]],[[-.72,1.01],[-.83,.82],[-.69,.66],[-.72,.53],[-.51,.31],[-.58,.15]],[[.48,1.18],[.65,1.33],[.82,1.36],[.95,1.56]],[[.65,1.33],[.72,1.08],[.98,.68],[1.19,.63],[1.38,.43]]],[[[.98,.68],[1.21,.88],[1.41,.8],[1.63,.97],[1.9,.9]],[[1.19,.63],[1.1,.42],[1.2,.31],[1.12,.12]],[[-.72,.53],[-1.03,.51],[-1.21,.37],[-1.47,.4]],[[-1.02,1.39],[-1.29,1.42],[-1.46,1.56]]]];function B2(i){let e=[];for(let t of i)for(let n=1;n<t.length;n++){let[s,r]=t[n-1],[a,o]=t[n],c=Math.hypot(a-s,o-r)+.018,l=new Xt(0,0,Math.atan2(o-r,a-s)),u=n===1?.042:.033;e.push(Ke(new Ut(c,u),"#25222f",(s+a)/2,(r+o)/2,.228,l)),e.push(Ke(new Ut(c,u*.4),"#f2e5d6",(s+a)/2,(r+o)/2+u*.42,.23,l))}return Sn(e)}function k2(i,e){let t=new Ct;i.add(t);let n=4.28,s=1.65,r=[Ke(rn(n-.08,s-.08,.41,.06),"#525969",0,s/2,0)];for(let x of[-1,1]){let g=x*(n/2-.085);r.push(Ke(rn(.18,s+.04,.5,.04),"#7b8496",g,s/2,0)),r.push(Ke(rn(.14,s-.14,.036),"#9aa4b5",g,s/2,.242));for(let m of[.16,s-.16]){let v=new Xt(Math.PI/2,0,0);r.push(Ke(new sn(.076,.076,.025,10),"#343a47",g,m,.265,v)),r.push(Ke(new sn(.052,.061,.036,6),"#d9b56c",g,m,.285,v))}}for(let x of[.11,s-.09]){r.push(Ke(rn(n-.26,.16,.45,.02),"#333947",0,x,0));for(let g=-5;g<=5;g++)(g+10)%2===0&&r.push(Ke(rn(.24,.135,.035),"#f7be31",g*.34,x,.228,new Xt(0,0,-.35)))}r.push(Ke(rn(1.96,.86,.04,.02),"#394152",0,.84,.215));let a=document.createElement("canvas");a.width=256,a.height=112;let o=a.getContext("2d"),c=new On(a);c.colorSpace=Mt;let l=new Ze(new Ut(1.8,.79),new bt({map:c,transparent:!0,depthWrite:!1,toneMapped:!1}));l.position.set(0,.84,.258),t.add(l);let u,d=new Vn({vertexColors:!0,roughness:.48,metalness:.38,emissive:16765606,emissiveIntensity:0});t.add(new Ze(Sn(r),d));let f=new Ze(yg(n,s),e);f.renderOrder=1,t.add(f);let h=new bt({vertexColors:!0}),p=O2.map(x=>{let g=new Ze(B2(x),h);return t.add(g),g});return x=>{if(t.visible=!!(x&&x.hp>0&&x.z>=Xo&&x.z<wa),!t.visible)return;let g=Ne.clamp(x.flash||0,0,1);t.position.set(x.x,0,x.z),t.scale.set(1+g*.026,1-g*.032,1+g*.04);let m=Math.ceil(x.hp);m!==u&&(o.clearRect(0,0,a.width,a.height),o.font='900 100px "Arial Black",sans-serif',o.textAlign="center",o.textBaseline="middle",o.lineWidth=10,o.strokeStyle="#1b2230",o.strokeText(String(m),128,59),o.fillStyle="#fff5dc",o.fillText(String(m),128,59),c.needsUpdate=!0,u=m);let v=x.hp/Math.max(1,x.maxHp);d.emissiveIntensity=Math.sqrt(g)*.55,p[0].visible=v<.93,p[1].visible=v<=.67,p[2].visible=v<=.36}}function Mg(i,e){let t=new Ct;t.name="Course",i.add(t);let n=vg(t,e),s=U2(t,n),r=new bt({color:2500930,vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1}),a=F2(t,r),o=new Dt(new Bn(1,.08,.07),new bt({toneMapped:!1}),80);o.frustumCulled=!1,o.instanceMatrix.setUsage(Yt),t.add(o);let c=new Ge,l=new _e("#1d2b3f"),u=new _e("#7dffdb"),d=Sn([Ke(rn(.43,.32,.1,.04),"#3e505d",0,0,.01),Ke(new ii(.132,.045,7,18,Math.PI),"#ffe3a2",0,.13,.04),Ke(rn(.12,.1,.022,.017),"#f3be63",0,0,.072)]),f=new Dt(d,new Kt({vertexColors:!0,shininess:48}),40);f.frustumCulled=!1,f.instanceMatrix.setUsage(Yt),t.add(f);let h=k2(t,r);return{update(p){let{gates:x,wall:g}=p;n.update(p),s(p);let m=p.parade?Ne.smoothstep(p.endTime,0,.4):0;a(m===1?[]:x,m);let v=0,_=0;for(let y of x){if(!p.parade&&y.active&&y.cover?.hp>0&&y.z>Xo&&y.z<wa&&_<40&&(c.makeRotationX(dd).setPosition(y.x+gi/2-.35,.72,y.z+.18),f.setMatrixAt(_++,c)),p.parade||!y.active||y.hp>=y.maxHp||y.z<-45||y.z>wa||v>78)continue;let E=gi-.38,b=E*y.hp/y.maxHp;for(let[M,S,L,C]of[[E,y.x,y.z+.18,l],[b,y.x-(E-b)/2,y.z+.22,u]])c.makeScale(M,1,1).setPosition(S,.13,L),o.setMatrixAt(v,c),o.setColorAt(v++,C)}f.count=_,f.visible=_>0,_&&(f.instanceMatrix.clearUpdateRanges(),f.instanceMatrix.addUpdateRange(0,_*16),f.instanceMatrix.needsUpdate=!0),o.count=v,o.visible=v>0,v&&(o.instanceMatrix.clearUpdateRanges(),o.instanceMatrix.addUpdateRange(0,v*16),o.instanceMatrix.needsUpdate=!0,o.instanceColor.clearUpdateRanges(),o.instanceColor.addUpdateRange(0,v*3),o.instanceColor.needsUpdate=!0),h(g)},dispose(){let p=new Set,x=new Set,g=new Set;t.traverse(m=>{m.isMesh&&(p.add(m.geometry),x.add(m.material),m.material.map&&g.add(m.material.map),m.material.bumpMap&&g.add(m.material.bumpMap),m.isInstancedMesh&&m.dispose())}),t.removeFromParent();for(let m of p)m.dispose();for(let m of x)m.dispose();for(let m of g)m.dispose()}}}var z2=new Ut(1,1),pd=new ni(1,16,10),qo=i=>new bt({color:i,toneMapped:!1}),H2=new Kt({color:4213080,shininess:65}),md=qo(16760162),bg=qo(13565951),gd=new N,i3=new N,G2=new N(0,1,0),xd=Ne.clamp;function V2(){return new Lt({uniforms:{ink:{value:new _e},style:{value:0},time:{value:0},progress:{value:0},after:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:"varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 tex;uniform vec3 ink;uniform float style,time,progress,after;
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
    }`})}function Hi(i,e,t){let n=new Ze(i,e);return t.add(n),n}function W2(i,e,t,n){gd.subVectors(t,e);let s=gd.length();i.position.copy(e).lerp(t,.5),i.scale.set(n,s,n),i.quaternion.setFromUnitVectors(G2,gd.normalize())}function X2(i){let e=new Ct;i.add(e);let t=V2(),n=Hi(z2,t,e);n.renderOrder=3;let s=new Ct;e.add(s);let r=new Kt({color:3330759,emissive:1210479,transparent:!0,opacity:.8,shininess:90});Hi(pd,r,s).scale.set(.42,.28,.45);let a=Hi(new ii(.46,.053,6,25,Math.PI*1.65),bg,s);a.rotation.x=-1.2;let o=new Ct;e.add(o),Hi(pd,H2,o).scale.set(.235,.29,.235),Hi(new ii(.235,.04,6,20),md,o).rotation.x=1.3;let l=Hi(pd,md,o);l.position.y=.22,l.scale.setScalar(.12);let u=Hi(new sn(1,.2,1,12,1,!0),new bt({color:6478335,transparent:!0,opacity:.41,toneMapped:!1,depthWrite:!1,side:qt}),e),d=new Ct;e.add(d);let f=[qo("#e8beff"),qo("#ab65dd"),qo("#83eaff")];for(let x=0;x<7;x++){let g=Hi(new ns(1,1,5),f[x%2],d),m=x*2.4;g.position.set(Math.cos(m)*(.27+x*.05),.4,Math.sin(m)*(.27+x*.05)),g.rotation.set(Math.sin(m)*.32,x*.9,Math.cos(m)*.38),g.scale.set(.13+x%3*.035,.66+x%3*.35,.17)}let h=new Ct;e.add(h);for(let x=0;x<7;x++)Hi(new Di(1),bg,h).scale.set(.055,.09,.28);let p=Hi(new ii(1,.09,6,32,Math.PI*1.4),md,e);return p.rotation.x=-Math.PI/2,{root:e,mat:t,mark:n,bubble:s,shell:o,beam:u,ridge:d,streaks:h,wave:p}}function Sg(i){let e=Array.from({length:3},()=>X2(i)),t=new N,n=new N;return function(r){let a=r.skill;e.forEach((o,c)=>{let l=a?.marks[c];if(o.root.visible=!!l&&!r.defeated,!o.root.visible)return;let u=a.age-l.delay,d=Uh(a,l),f=xd((u-a.warm-a.flight)/.62,0,1),h=u>=a.warm,p=d>=1,x=l.x-a.x,g=l.z-a.z,m=o.mat.uniforms;m.ink.value.set(bn[a.kind].color);let v=xd(u/a.warm,0,1);if(m.progress.value=h?d:v,m.after.value=f,m.time.value=a.age,m.style.value=l.shape==="circle"?0:l.shape==="strip"?1:2,o.mark.visible=u>=-.12&&f<1,l.shape==="circle")o.mark.rotation.set(-Math.PI/2,0,0),o.mark.scale.set(2*l.radius,2*l.radius,1),o.mark.position.set(l.x,.059,l.z);else{let b=Math.hypot(x,g),M=Math.atan2(x,g);o.mark.position.set((l.x+a.x)/2+Math.sin(M)*.82,.06,(l.z+a.z)/2+Math.cos(M)*.82),o.mark.rotation.order="YXZ",o.mark.rotation.set(Math.PI/2,M,0),o.mark.material.side=qt,o.mark.scale.set(2*l.radius,b+1.64,1)}let _=h&&!p;o.bubble.visible=_&&a.kind==="diver",o.shell.visible=_&&a.kind==="engine";let y=o.bubble.visible?o.bubble:o.shell;if(y.visible){let b=a.x+(c?1:-1)*.8,M=a.kind==="engine"?4.6:.57;y.position.set(Ne.lerp(b,l.x,d),a.height*(1-d)+.17+Math.sin(Math.PI*d)*M,Ne.lerp(a.z,l.z,d)),y.rotation.y=d*7}let E=a.kind==="kestrel";if(o.beam.visible=E&&h&&f<.82,o.streaks.visible=o.beam.visible,o.beam.visible){let b=xd(d*1.25,0,1);t.set(a.x,a.height,a.z+.59),n.set(l.x,.34,l.z).lerp(t,1-b),W2(o.beam,t,n,l.radius*(1-f*.55)),o.beam.material.opacity=(.31+.12*Math.sin(a.age*24))*(1-f),o.streaks.children.forEach((M,S)=>{let L=(a.age*1.9+S*.136)%1;M.position.copy(t).lerp(n,L),M.position.x+=Math.sin(S*1.8+a.age*11)*L*.78,M.position.y+=Math.cos(S*1.4+a.age*12)*L*.26})}o.ridge.visible=a.kind==="drill"&&p&&f<1,o.ridge.visible&&(o.ridge.position.set(l.x,.025,l.z),o.ridge.scale.set(1,Math.max(.02,Math.sin(Math.PI*Math.pow(f,.58))*1.35),1)),o.wave.visible=_&&(a.kind==="bruiser"||a.kind==="warden"),o.wave.visible&&(o.wave.position.set(a.x+x*d,.13,a.z+g*d),o.wave.scale.set(1.1+.37*d,.4+.25*d,1),o.wave.rotation.z=Math.atan2(x,g)-.59)})}}var vd=128,_d=4,xe={glow:0,smoke:1,glint:2,wave:3,crack:4,plus:5,arrow:6,flash:7,goldWave:8,ember:9};function q2(){let i=document.createElement("canvas");i.width=i.height=vd*_d;let e=i.getContext("2d");function t(a,o){e.save(),e.translate((a%_d+.5)*vd,(Math.floor(a/_d)+.5)*vd),o(),e.restore()}function n(a,o,c,l){let u=e.createRadialGradient(a,o,0,a,o,c);for(let[d,f]of l)u.addColorStop(d,f);e.fillStyle=u,e.fillRect(a-c,o-c,c*2,c*2)}let s="rgba(255,255,255,0)";t(xe.glow,()=>{n(0,0,57,[[0,"#fff"],[.18,"rgba(255,255,255,.94)"],[.43,"rgba(255,255,255,.41)"],[1,s]])}),t(xe.smoke,()=>{let a=[[-14,8,37],[18,8,32],[9,-13,32],[-15,-13,27],[3,3,40]];for(let[o,c,l]of a)n(o,c,l,[[0,"rgba(255,255,255,.62)"],[.38,"rgba(255,255,255,.42)"],[.77,"rgba(255,255,255,.13)"],[1,s]])}),t(xe.glint,()=>{n(0,0,44,[[0,"#fff"],[.16,"rgba(255,255,255,.9)"],[1,s]]),e.fillStyle="#fff",e.beginPath();for(let a=0;a<8;a++){let o=a*Math.PI/4,c=a%2?5:a%4?45:32,l=Math.cos(o)*c,u=Math.sin(o)*c;a===0?e.moveTo(l,u):e.lineTo(l,u)}e.closePath(),e.fill()}),t(xe.wave,()=>{n(0,0,60,[[0,s],[.7,s],[.78,"rgba(255,255,255,.26)"],[.86,"rgba(255,255,255,.94)"],[.9,"rgba(255,255,255,.60)"],[1,s]])}),t(xe.goldWave,()=>{n(0,0,58,[[0,"rgba(255,255,255,.25)"],[.41,"rgba(255,255,255,.08)"],[.66,s],[.81,"rgba(255,255,255,.18)"],[.88,"#fff"],[.92,"rgba(255,255,255,.65)"],[1,s]])}),t(xe.crack,()=>{n(0,0,40,[[0,"#c14d0d"],[.19,"rgba(158,63,22,.9)"],[.62,"rgba(80,52,51,.24)"],[1,"rgba(80,52,51,0)"]]);let a=783,o=()=>(a=a*16807%2147483647,a/2147483647);e.lineCap="round",e.lineJoin="round";for(let c=0;c<11;c++){let l=(c+o()*.55)*2*Math.PI/11,u=31+o()*29,d=0,f=0;for(let h=1;h<=4;h++){let p=l+(o()-.5)*.23,x=u*h/4,g=Math.cos(p)*x,m=Math.sin(p)*x;if(e.beginPath(),e.moveTo(d,f),e.lineTo(g,m),e.lineWidth=(5-h)*.62+.35,e.strokeStyle=h===1?"#793714":"#493e41",e.stroke(),h===2||h===3){let v=p+(o()>.5?.65:-.66);e.beginPath(),e.moveTo(g,m),e.lineTo(g+Math.cos(v)*9,m+Math.sin(v)*9),e.lineWidth=1,e.stroke()}d=g,f=m}}e.beginPath();for(let c=0;c<15;c++){let l=c*Math.PI*2/15,u=5+o()*10,d=Math.cos(l)*u,f=Math.sin(l)*u;c?e.lineTo(d,f):e.moveTo(d,f)}e.closePath(),e.fillStyle="#ff9021",e.fill()}),t(xe.plus,()=>{e.font="1000 80px Arial Black, Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.strokeStyle="#754508",e.lineWidth=9,e.strokeText("+1",0,6,110),e.strokeStyle="#422916",e.lineWidth=6.5,e.strokeText("+1",0,2,110);let a=e.createLinearGradient(0,-28,0,32);a.addColorStop(0,"#fff592"),a.addColorStop(.31,"#fff020"),a.addColorStop(1,"#ffbe00"),e.fillStyle=a,e.fillText("+1",0,2,110)}),t(xe.arrow,()=>{e.shadowColor="#00baff",e.shadowBlur=9,e.beginPath(),e.moveTo(0,-47),e.lineTo(35,-7),e.lineTo(16,-7),e.lineTo(16,40),e.lineTo(-16,40),e.lineTo(-16,-7),e.lineTo(-35,-7),e.closePath();let a=e.createLinearGradient(0,-45,0,40);a.addColorStop(0,"#f2ffff"),a.addColorStop(.45,"#67fff4"),a.addColorStop(1,"rgba(10,201,255,.38)"),e.fillStyle=a,e.fill(),e.shadowBlur=0,e.lineWidth=2,e.strokeStyle="rgba(227,255,255,.82)",e.stroke()}),t(xe.flash,()=>{n(0,0,58,[[0,"#fff"],[.21,"#fff"],[.36,"rgba(255,255,255,.85)"],[.71,"rgba(255,255,255,.18)"],[1,s]]);for(let a=0;a<9;a++){let o=a*Math.PI*2/9+.2,c=a%3===1?48:31;e.save(),e.rotate(o),e.beginPath(),e.moveTo(8,-4.2),e.lineTo(c,0),e.lineTo(8,4.2),e.closePath(),e.fillStyle="rgba(255,255,255,.76)",e.fill(),e.restore()}}),t(xe.ember,()=>{e.save(),e.scale(.45,1),n(0,0,53,[[0,"#fff"],[.37,"#fff"],[.65,"rgba(255,255,255,.58)"],[1,s]]),e.restore()});let r=new On(i);return r.colorSpace=Mt,r}function Eg(i,e,t,n=!1,s=8){let r=new Ut(1,1),a=new Is;a.setIndex(r.index),a.setAttribute("position",r.getAttribute("position")),a.setAttribute("uv",r.getAttribute("uv"));let o={};for(let[d,f]of[["anchor",3],["sizeModeTile",4],["tint",4],["rotation",1]]){let h=new Zt(new Float32Array(e*f),f);h.setUsage(Yt),a.setAttribute(d,h),o[d]=h}let c=new Lt({uniforms:{atlas:{value:t}},transparent:!0,depthWrite:!1,side:qt,toneMapped:!1,blending:n?bi:Ls,vertexShader:`
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
      }`});c.forceSinglePass=!0;let l=new Ze(a,c);l.frustumCulled=!1,l.renderOrder=s,a.instanceCount=0,i.add(l);let u=0;return{clear(){u=0},write(d,f,h,p,x,g,m,v,_,y=0){u>=e||_<.008||(o.anchor.setXYZ(u,d,f,h),o.sizeModeTile.setXYZW(u,p,x,g?1:0,m),o.tint.setXYZW(u,v.r,v.g,v.b,_),o.rotation.setX(u,y),u++)},flush(){if(l.visible=u>0,a.instanceCount=u,!!u)for(let d of Object.values(o))d.clearUpdateRanges(),d.addUpdateRange(0,u*d.itemSize),d.needsUpdate=!0}}}function yd(i,e){let t=i.map(([a,o])=>new me(o,a)),n=new vo(t,e),s=new Float32Array(n.attributes.position.count*3),r=i.map(([,,a])=>new _e(a));for(let a=0;a<n.attributes.position.count;a++)r[a%r.length].toArray(s,a*3);return n.setAttribute("color",new zt(s,3)),n.rotateX(-Math.PI/2),n}function Mh(i,e,t,n,s){let r=new Dt(e,t,n);return r.instanceMatrix.setUsage(Yt),r.count=0,r.frustumCulled=!1,r.renderOrder=s,i.add(r),r}var Ce=Object.fromEntries(Object.entries({white:"#ffffff",pearl:"#fff5dc",aqua:"#64ffff",blue:"#18ccff",gold:"#ffd02f",orange:"#ff861d",fire:"#ff5a16",violet:"#c181ff",frost:"#a0edff",surf:"#68f4d5",dust:"#ece0cd",smoke:"#928180",steel:"#8f99a3"}).map(([i,e])=>[i,new _e(e)])),Y2=["#555c69","#8e97a3","#abb4bc","#727986","#a5a7aa"].map(i=>new _e(i)),Et=(i,e)=>i+(e-i)*Math.random(),Yo=(i,e,t)=>Math.min(t,Math.max(e,i)),pi=Math.PI*2;function Z2(i,e){let t=new Ut(1,1,5,1),n=new Is().copy(t),s=new Zt(new Float32Array(e*3),3),r=new Zt(new Float32Array(e*3),3),a=new Zt(new Float32Array(e*4),4);for(let[l,u]of[["trailStart",s],["trailEnd",r],["trailStyle",a]])n.setAttribute(l,u.setUsage(Yt));let o=new Lt({transparent:!0,depthWrite:!1,toneMapped:!1,blending:bi,side:qt,vertexShader:`
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
      }`});o.forceSinglePass=!0;let c=new Ze(n,o);return c.frustumCulled=!1,c.renderOrder=4,n.instanceCount=0,i.add(c),{write(l,u,d,f,h,p,x){s.setXYZ(l,u.x,u.y,u.z),r.setXYZ(l,d.x,d.y,d.z),a.setXYZW(l,f,h,p,x)},flush(l){if(n.instanceCount=l,c.visible=l>0,!!l)for(let u of[s,r,a])u.clearUpdateRanges(),u.addUpdateRange(0,l*u.itemSize),u.needsUpdate=!0}}}function wg(i){let e=q2(),t=Eg(i,420,e,!1,8),n=Eg(i,560,e,!0,9),s=Mh(i,yd([[-.38,.006,"#13a8ff"],[-.16,.038,"#3de5ff"],[.12,.056,"#c4fdff"],[.28,.036,"#f2ffff"],[.36,.004,"#ffffff"]],7),new bt({vertexColors:!0,toneMapped:!1}),360,3),r=Mh(i,yd([[-.38,.003,"#b9430d"],[-.37,.127,"#dd7117"],[-.31,.18,"#ff9c1a"],[-.25,.19,"#ffc32d"],[-.21,.158,"#ef8d18"],[-.15,.166,"#ffb824"],[.23,.175,"#ffce36"],[.37,.16,"#ffcb2c"],[.48,.117,"#ffdb46"],[.54,.059,"#ffdc56"],[.56,.001,"#fff1a3"]],14),new Kt({vertexColors:!0,emissive:3609856,specular:16772528,shininess:62}),24,3),a=Mh(i,yd([[-1.52,.003,"#ef5615"],[-1.18,.07,"#fc641b"],[-.77,.114,"#ff9f13"],[-.49,.149,"#ffe039"],[-.31,.112,"#fff8af"]],10),new bt({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1}),24,6),o=Mh(i,new oo(1,0),new Kt({color:16777215,specular:5660779,shininess:18}),88,2),c=new At,l=[],u=[],d=[],f=[],h=5;function p(W,U,R,O,he,G,ee,H={}){if(l.length>=260){if(!H.priority&&W!==xe.plus&&W!==xe.arrow&&W!==xe.crack)return;let Q=l.findIndex(fe=>fe.tile===xe.smoke||fe.tile===xe.glint||fe.tile===xe.glow);if(Q<0)return;d.push(l[Q]),l[Q]=l[l.length-1],l.pop()}let q=d.pop()||{};q.tile=W,q.x=U,q.y=R,q.z=O,q.start=he,q.end=G,q.life=ee,q.age=0,q.color=H.color||Ce.white,q.alpha=H.alpha??1,q.ratio=H.ratio??1,q.vx=H.vx||0,q.vy=H.vy||0,q.vz=H.vz||0,q.gravity=H.gravity||0,q.angle=H.angle||0,q.spin=H.spin||0,q.flat=H.flat||!1,q.world=H.world??!0,q.hold=H.hold??.12,l.push(q)}function x(W,U,R,O,he,G){for(let ee=0;ee<he;ee++){let H=(ee+Math.random()*.5)*pi/he,q=Et(.12,.42)*O,Q=Et(.75,2.15)*O;p(xe.smoke,W+Math.cos(H)*q,U+Et(.02,.14),R+Math.sin(H)*q,Et(.23,.47)*O,Et(.71,1.12)*O,Et(.36,.6),{color:G,alpha:Et(.4,.63),vx:Math.cos(H)*Q,vz:Math.sin(H)*Q,vy:Et(.35,1.05),spin:Et(-1.5,1.5),angle:H})}}function g(W,U,R,O,he){for(let G=0;G<he;G++){let ee=(G+Math.random())*pi/he,H=Et(1.8,4.3)*O;p(xe.ember,W,U,R,Et(.22,.39)*O,.035,Et(.21,.42),{color:G%3?Ce.orange:Ce.pearl,vx:Math.cos(ee)*H,vz:Math.sin(ee)*H,vy:Et(.8,2.5)*O,gravity:5,angle:ee,spin:Et(-2,2),ratio:1.7})}}let m=["#65d8cd","#dafff3","#4cb9b2"].map(W=>new _e(W)),v=["#e4b879","#925c3b","#c28b57"].map(W=>new _e(W));function _(W,U,R,O,he,G=!1,ee=Y2){for(let H=0;H<O&&u.length<o.instanceMatrix.count;H++){let q=f.pop()||{};if(q.x=W+Et(-1.75,1.75)*he,q.y=U+Et(.14,.9),q.z=R+Et(-.24,.3),q.vx=Et(-2.8,2.8),q.vz=Et(-1.8,3.5),q.vy=Et(2.2,5.2),G){let Q=(H+Math.random())*pi/O,fe=Et(2.2,4.4);q.x=W+Math.cos(Q)*.48,q.z=R+Math.sin(Q)*.48,q.vx=Math.cos(Q)*fe,q.vz=Math.sin(Q)*fe}q.size=Et(.085,.245)*he,q.stretch=Et(.52,1.65),q.rx=Et(-2,2),q.ry=Et(-2,2),q.spin=Et(2,8),q.age=0,q.life=Et(.52,1.04),q.color=ee[H%ee.length],u.push(q)}}let y=new ss(1,2),E=new Lt({uniforms:{age:{value:0}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec3 orb; varying vec3 eye; varying vec3 n; void main(){
      orb=position;vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);
      eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,fragmentShader:`varying vec3 orb;varying vec3 eye;varying vec3 n;uniform float age;
      void main(){float swirl=sin(orb.y*9.+sin(orb.z*5.+age*8.))*sin(orb.x*6.-age*6.);
        float heat=clamp(max(0.,dot(normalize(n),normalize(eye)))+.13*swirl-age*.7,0.,1.);
        vec3 fire=mix(vec3(.94,.16,.026),vec3(1.,.80,.20),smoothstep(.12,.53,heat));
        fire=mix(fire,vec3(1.,.98,.77),smoothstep(.55,.86,heat));
        gl_FragColor=vec4(fire,1.-smoothstep(.52,1.,age));}`}),b=new Ct,M=[[0,.2,0,1.02],[-.62,.06,.08,.65],[.55,.14,-.2,.74],[-.16,.57,-.13,.64],[.33,.36,.36,.48]];for(let[W,U,R,O]of M){let he=new Ze(y,E);he.position.set(W,U,R),he.scale.setScalar(O),he.renderOrder=3,b.add(he)}b.visible=!1,i.add(b);let S=1;function L(W,U,R,O,he=1,G=null){let ee=Rn[G]?.tone==="gold"?Ce.gold:Ce.surf,H=Yo(he,.62,2.05);switch(W){case"cardHit":p(xe.glint,U,R,O+.1,.33,.72,.12,{color:ee}),g(U,R,O,.45,3);return;case"supplyBreak":p(xe.flash,U,R,O,.46,1.45,.13,{color:Ce.pearl}),p(xe.wave,U,.07,O,.42,2.9,.36,{flat:!0,color:ee});for(let q of[-1,1])p(xe.glint,U+q*1.44,R,O,.48,.1,.33,{color:ee,vx:-q*3.6,vy:1.1,ratio:1.6});g(U,R,O,.73,6);return;case"shieldHit":p(xe.wave,U,.1,O,.4,1.75,.26,{flat:!0,color:Ce.aqua}),p(xe.glint,U,R,O,.26,.68,.14,{color:Ce.pearl});return;case"hostileMuzzle":p(xe.flash,U,R,O,.32,.63,.14,{color:Ce.orange});return;case"bruiserCast":case"wardenCast":for(let q of[-1,1])x(U+q*.6,.16,O,1,4,Ce.dust);return;case"diverCast":for(let q of[-1,1])p(xe.wave,U+q*.95,R,O,.32,1.45,.32,{color:Ce.surf});return;case"drillCast":x(U,.2,O,1.21,7,Ce.violet);return;case"kestrelCast":p(xe.glow,U,R,O+.43,.32,1.37,.36,{color:Ce.frost});return;case"engineCast":for(let q of[-1,1])p(xe.flash,U+q*.72,R+.32,O-.2,.4,1.12,.17,{color:Ce.orange});return;case"bruiserStrike":case"wardenStrike":p(xe.crack,U,.043,O,1.4,2.55,.77,{flat:!0,hold:.31}),x(U,.16,O,1.18,8,Ce.dust),_(U,.12,O,7,.55,!0);return;case"diverStrike":p(xe.wave,U,.09,O,.31,2.29,.46,{flat:!0,color:Ce.surf});for(let q=0;q<9;q++){let Q=q*pi/9;p(xe.glow,U,.22,O,.18,.06,.43,{color:Ce.aqua,vx:Math.cos(Q)*2.1,vz:Math.sin(Q)*2.1,vy:1.5,gravity:3.6})}return;case"drillStrike":x(U,.17,O,.77,5,Ce.violet),p(xe.glint,U,.35,O,.26,1,.19,{color:Ce.violet});return;case"kestrelStrike":p(xe.wave,U,.08,O,.35,2.78,.54,{flat:!0,color:Ce.frost}),x(U,.28,O,.98,7,Ce.frost);return;case"engineStrike":p(xe.flash,U,.45,O,.82,2.2,.19,{color:Ce.orange,priority:!0}),p(xe.wave,U,.07,O,.34,2.63,.37,{flat:!0,color:Ce.gold}),x(U,.2,O,1.1,8,Ce.smoke),g(U,.3,O,1.08,12);return;case"finisher":g(U,R,O,1.35,16),p(xe.flash,U,R,O,.65,1.45,.13,{color:Ce.pearl});return;case"hit":if(h<1)return;h--,g(U,R,O,.48,3),p(xe.glint,U,R,O,.26,.47,.105,{color:Ce.aqua,angle:Et(0,pi)});return;case"muzzle":p(xe.flash,U,R,O,.47*H,.83*H,.105,{color:Ce.pearl,angle:Et(0,pi),world:!1}),p(xe.glow,U,R,O,.82*H,.38*H,.13,{color:Ce.orange,alpha:.7,world:!1});return;case"impact":case"slam":{let q=W==="slam",Q=H*(q?1.4:1),fe=q?.16:Math.max(.17,R*.58);if(q){_(U,.04,O,12,.61,!0);for(let tt of[-1,1])p(xe.flash,U+tt*.57,.12,O,.58,.93,.1,{color:Ce.pearl})}p(xe.crack,U,.035,O,2.02*Q,2.33*Q,q?2:1.42,{flat:!0,angle:Et(0,pi),hold:.62}),p(xe.wave,U,.065,O,.42*Q,q?2*2.15/.81:3.16*Q,.32,{flat:!0,color:q?Ce.gold:Ce.pearl,alpha:.83}),p(xe.flash,U,fe,O,.6*Q,1.85*Q,.16,{color:Ce.gold,angle:Et(0,pi)}),p(xe.glow,U,fe+.06,O,.39*Q,.93*Q,.1,{color:Ce.pearl}),x(U,.17,O,Q,q?12:7,q?Ce.dust:Ce.smoke),g(U,fe,O,Q,q?10:5);return}case"wallHit":p(xe.flash,U,Math.max(R,.4),O+.12,.38*H,1.12*H,.13,{color:Ce.pearl}),x(U,Math.max(.35,R),O,.61*H,3,Ce.steel),g(U,Math.max(.4,R),O,.59*H,3);return;case"wallBreak":_(U,.24,O,22,Math.min(1.17,H)),p(xe.flash,U,.72,O,.85*H,2.8*H,.19,{color:Ce.pearl}),p(xe.wave,U,.062,O,.6,4.7,.38,{flat:!0,color:Ce.dust});for(let q=-1;q<=1;q++)x(U+q*1.17,.3,O,.98,4,Ce.steel);g(U,.8,O,H,7);return;case"plus":{p(xe.wave,U,.09,O,.12,1.28,.23,{flat:!0,color:Ce.aqua});let q=Math.max(0,R);p(xe.goldWave,U,.055,O,.22,.96,.34,{flat:!0,world:!1,color:Ce.gold}),p(xe.glow,U,q+.36,O,.45,.82,.28,{ratio:1.75,world:!1,color:Ce.gold}),p(xe.glint,U+.08,q+.57,O,.35,.14,.23,{world:!1,color:Ce.pearl}),p(xe.plus,U+Et(-.13,.13),q+.83,O,.8,1.04,.65,{world:!1,vy:1.1,hold:.62});return}case"merge":{if(G==="range"||G==="longshot"){for(let Q=0;Q<3;Q++)p(xe.arrow,U,.12,O-.8-Q*.68,.72-Q*.09,.22,.48+Q*.04,{flat:!0,color:ee,vz:-3.3,world:!1});p(xe.wave,U,.07,O,.32,2.45,.35,{flat:!0,color:ee});return}p(xe.goldWave,U,.12,O,2.15,.32,.27,{flat:!0,color:Ce.gold});let q=Yo(H*1.55,1.5,2.5);p(xe.goldWave,U,.061,O,.38,q,.46,{flat:!0,world:!1,color:Ce.aqua,hold:.3}),p(xe.goldWave,U,.077,O,.17,q*.72,.38,{flat:!0,world:!1,color:Ce.gold}),p(xe.glow,U,R+.62,O,.77*H,1.6*H,.32,{color:Ce.gold,world:!1,ratio:1.3,alpha:.72});for(let Q=0;Q<3;Q++){let fe=(Q+.16)*pi/3;p(xe.arrow,U+Math.cos(fe)*q*.31,R+.3,O+Math.sin(fe)*q*.34,.38,.65,.51+Q*.035,{color:Ce.white,hold:.42,vy:1.55+.15*Q,world:!1})}return}case"victory":case"vaultLand":p(xe.wave,U,.06,O,.55,W==="victory"?3.9:2.7,.33,{flat:!0,color:Ce.dust,alpha:.7});for(let q of[-1,1])x(U+q*.63,.12,O,.88,4,Ce.dust);return;case"bossBurst":S=0,b.position.set(U,.8,O),b.visible=!0,p(xe.goldWave,U,.08,O,.6,5.55,.48,{flat:!0,color:Ce.gold,priority:!0});for(let[q,Q,fe]of[[0,0,2.85],[-.58,.23,1.65],[.67,-.2,1.9]])p(xe.glow,U+q,R+.19,O+Q,fe*.54,fe*1.13,.34,{color:Ce.orange,vy:.83,priority:!0}),p(xe.flash,U+q,R+.22,O+Q,fe*.31,fe,.22,{color:Ce.gold,angle:q*2.4,vy:.9,priority:!0});p(xe.glint,U,R+.35,O,.8,2.65,.13,{color:Ce.pearl,priority:!0}),_(U,.42,O,17,.91,!0),g(U,R+.38,O,1.57,24),x(U,.35,O,1.5,10,Ce.smoke);return;case"glassBreak":_(U,R,O,18,.92,!1,m),p(xe.wave,U,.06,O,.5,4.85,.31,{flat:!0,color:Ce.aqua});for(let q of[-1.09,0,1.09])p(xe.glint,U+q,R+.25,O,.19,.74,.2,{color:Ce.pearl});return;case"crateBreak":_(U,R,O,16,1.04,!1,v),x(U,.32,O,.7,5,Ce.smoke);return;case"latchHit":g(U,R,O,1.06,8);return;case"rally":p(xe.wave,U,.08,O,.46,3.05,.49,{flat:!0,color:Ce.aqua});return;case"chainSnap":for(let q of[-1,1])g(U+q*1.86,1.04,O,1.15,9);p(xe.flash,U,R,O,.38,1.4,.15,{color:Ce.pearl});return;case"evolve":p(xe.goldWave,U,.09,O,.5,4.8,.56,{flat:!0,world:!1,color:Ce.gold,priority:!0}),p(xe.wave,U,.11,O,.35,3.6,.45,{flat:!0,world:!1,color:Ce.aqua,priority:!0}),p(xe.flash,U,R+.9,O,.85,2.8,.25,{color:Ce.gold,world:!1,priority:!0}),g(U,R+.65,O,1.35,16);for(let q=0;q<4;q++){let Q=q*pi/4+.4;p(xe.arrow,U+Math.cos(Q)*.9,R+.45,O+Math.sin(Q)*.7,.55,.95,.62,{color:Ce.gold,vy:2.1,hold:.45,world:!1,priority:!0})}return;case"overdrive":p(xe.goldWave,U,.1,O,.6,8.2,.52,{flat:!0,world:!1,color:Ce.gold,priority:!0}),p(xe.wave,U,.12,O,.5,6.4,.42,{flat:!0,world:!1,color:Ce.orange,priority:!0}),p(xe.flash,U,R+.9,O,1.1,3.6,.26,{color:Ce.pearl,world:!1,priority:!0}),g(U,R+.7,O,1.7,22);return;case"critHit":p(xe.glint,U,R,O,.45,1.15,.18,{color:Ce.gold,angle:Et(0,pi),priority:!0}),p(xe.flash,U,R,O,.32,.95,.14,{color:Ce.pearl,priority:!0}),g(U,R,O,.85,7);return;case"bossEnrage":p(xe.wave,U,.12,O,.7,7.2,.55,{flat:!0,color:Ce.fire,priority:!0}),p(xe.flash,U,R+1.1,O,.9,3.4,.3,{color:Ce.orange,priority:!0}),g(U,R+.9,O,1.5,18);return;case"discharge":p(xe.wave,U,.1,O,.45,8.5,.35,{flat:!0,color:Ce.aqua}),p(xe.flash,U,R+.45,O,.63,3.4,.23,{color:Ce.aqua});for(let q=0;q<7;q++){let Q=q*pi/7;p(xe.glint,U+Math.cos(Q)*1.46,.5,O+Math.sin(Q)*1.46,.25,1.03,.26,{color:Ce.pearl,angle:Q})}return}}let C=new N(0,0,-1),A=new N,D=new N,B=new N,P=Z2(i,384);function V(W,U){let R=0,O=0,he=0;for(let G of W){let ee=G.kind==="rocket",H=G.profile===xs,q=G.profile===tl||H,Q=Math.max(0,G.distance-G.profile.tail+G.afterHit*G.profile.speed);if(Rr(G,Q,D),G.distance-Q>.012&&he<384){Rr(G,(Q+G.distance)*.5,B);let fe=B.y-(D.y+G.y)*.5,tt=G.range>4?Yo((G.range-Q)/1.6,0,1):1;P.write(he++,D,G,fe,ee?.128:H?.118:G.crit?.1:q?.085:.068,ee?2:G.crit?3:q?1:0,tt*.96)}if(!G.finished){if(Rr(G,G.distance+.015,B),A.set(B.x-G.x,B.y-G.y,B.z-G.z).normalize(),c.quaternion.setFromUnitVectors(C,A),c.position.set(G.x,G.y,G.z),!ee&&R<s.instanceMatrix.count){let fe=G.crit?1.75:q?1.58:1.2;c.scale.set(fe,fe,q?.75:.95),c.updateMatrix(),s.setMatrixAt(R++,c.matrix),G.age<.05&&n.write(G.startX,G.startY,G.startZ,G.crit?.36:.26,G.crit?.36:.26,!1,xe.flash,G.crit?Ce.gold:Ce.aqua,.78*(1-G.age/.05))}else if(ee&&O<r.instanceMatrix.count){let fe=.72+Math.min(.24,G.power*.068);c.scale.setScalar(fe),c.updateMatrix(),r.setMatrixAt(O,c.matrix),c.scale.z*=1.05,c.updateMatrix(),a.setMatrixAt(O++,c.matrix),U>0&&Math.floor(G.age*16)!==Math.floor(Math.max(0,G.age-U)*16)&&p(xe.smoke,D.x,D.y,D.z,.16*fe,.44*fe,.22,{color:Ce.dust,alpha:.42,vy:.22,world:!1})}}}P.flush(he),s.count=R,r.count=a.count=O,s.visible=R>0,r.visible=a.visible=O>0,R&&(s.instanceMatrix.clearUpdateRanges(),s.instanceMatrix.addUpdateRange(0,R*16),s.instanceMatrix.needsUpdate=!0),O&&(r.instanceMatrix.clearUpdateRanges(),r.instanceMatrix.addUpdateRange(0,O*16),r.instanceMatrix.needsUpdate=!0,a.instanceMatrix.clearUpdateRanges(),a.instanceMatrix.addUpdateRange(0,O*16),a.instanceMatrix.needsUpdate=!0)}let Z=W=>W===xe.glow||W===xe.glint||W===xe.wave||W===xe.goldWave||W===xe.flash||W===xe.ember;function X(W,U,R,O=[]){if(b.visible){S+=W;let ee=Math.min(1,S/.44);b.position.z+=U,b.position.y+=.74*W,b.scale.setScalar(.28+.94*Math.sin(Math.PI*Math.sqrt(ee))),E.uniforms.age.value=ee,ee>=1&&(b.visible=!1)}let he=Yo(W,0,.12);h=Math.min(8,h+he*26),t.clear(),n.clear(),V(R,he);for(let ee of O)n.write(ee.x-ee.vx*.038,ee.y,ee.z-ee.vz*.038,.36,.58,!1,xe.glow,Ce.fire,.88),n.write(ee.x,ee.y,ee.z,.34,.38,!1,xe.glint,Ce.gold,1);for(let ee=l.length-1;ee>=0;ee--){let H=l[ee];if(H.age+=he,H.age>=H.life){d.push(H),l[ee]=l[l.length-1],l.pop();continue}H.x+=H.vx*he,H.y+=H.vy*he,H.z+=H.vz*he+(H.world?U:0),H.vy-=H.gravity*he,H.angle+=H.spin*he}for(let ee=0;ee<2;ee++)for(let H of l){if((H.tile===xe.plus||H.tile===xe.arrow)!==(ee===1))continue;let Q=H.age/H.life,fe=1-(1-Q)*(1-Q),tt=Ne.lerp(H.start,H.end,fe),Be=1-Yo((Q-H.hold)/(1-H.hold),0,1);(Z(H.tile)?n:t).write(H.x,H.y,H.z,tt,tt*H.ratio,H.flat,H.tile,H.color,H.alpha*Be,H.angle)}t.flush(),n.flush();let G=0;for(let ee=u.length-1;ee>=0;ee--){let H=u[ee];if(H.age+=he,H.age>=H.life){f.push(H),u[ee]=u[u.length-1],u.pop();continue}H.x+=H.vx*he,H.z+=H.vz*he+U,H.y+=H.vy*he,H.vy-=11*he,H.y<H.size*.4&&(H.y=H.size*.4,H.vy=Math.abs(H.vy)*.22,H.vx*=.78,H.vz*=.78);let q=Math.min(1,(H.life-H.age)*5);c.position.set(H.x,H.y,H.z),c.rotation.set(H.rx+H.age*H.spin,H.ry-H.age*H.spin*.56,H.age*H.spin*.77),c.scale.set(H.size*H.stretch*q,H.size*.74*q,H.size*q),c.updateMatrix(),o.setMatrixAt(G,c.matrix),o.setColorAt(G++,H.color)}o.count=G,o.visible=G>0,G&&(o.instanceMatrix.clearUpdateRanges(),o.instanceMatrix.addUpdateRange(0,G*16),o.instanceMatrix.needsUpdate=!0,o.instanceColor.clearUpdateRanges(),o.instanceColor.addUpdateRange(0,G*3),o.instanceColor.needsUpdate=!0)}function se(){b.visible=!1,d.push(...l),f.push(...u),l.length=u.length=0,h=6,P.flush(0);for(let W of[s,r,a,o])W.count=0,W.visible=!1;t.clear(),t.flush(),n.clear(),n.flush()}return se(),{update:X,burst:L,reset:se}}var Tg={ally:{width:.49,height:.88,pivot:.49,pad:.008,capacity:180,grid:[7,10]},captain:{width:1.16,height:1.73,pivot:.43,pad:.009,capacity:1,grid:[16,20]},grunt:{width:.54,height:.88,pivot:.5,pad:.011,capacity:1800,grid:[7,10]}},bh=Ne.clamp,Sr=Ne.smoothstep,K2=`
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
    float depthSwing = stride*.033*(uv.x-pivot)*chest + (boots*${ya/.86}-arms*.16)*swing*dimensions.y;
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
`,$2=`
  ${ph}
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
`;function J2(i,e,t,n,s){let r=Tg[e],a=new Float32Array(3),o=new Ut(1,1,...r.grid),c=new Is().copy(o),l={};for(let[h,p]of[["anchor",3],["dimensions",2],["motion",4],["feet",3],["fallAngle",1],["treatment",4]]){let x=new Zt(new Float32Array(r.capacity*p),p);x.setUsage(Yt),l[h]=x,c.setAttribute(h,x)}c.instanceCount=0,t.colorSpace=Mt,t.magFilter=tn,t.minFilter=Xn,t.generateMipmaps=!0;let u=new Lt({uniforms:{portrait:{value:t},cameraRight:{value:n},cameraLift:{value:s},pivot:{value:r.pivot},padding:{value:r.pad}},defines:e==="captain"?{CAPTAIN:1}:e==="ally"?{ALLY:1}:{},vertexShader:K2,fragmentShader:$2,depthWrite:!0,transparent:!1,toneMapped:!1,alphaToCoverage:!0}),d=new Ze(c,u);d.name=`AI ${e}`,d.visible=!1,d.frustumCulled=!1,i.add(d);let f=0;return{begin(){f=0},clear(){f=0,c.instanceCount=0,d.visible=!1},add(h,p,x,g,m,v,_,y=0,E=0,b=0,M=0,S=0,L=0,C=0){f>=r.capacity||g<=.001||m<=.001||(l.fallAngle.setX(f,C),l.anchor.setXYZ(f,h,p,x),l.dimensions.setXY(f,r.width*g,r.height*m),l.motion.setXYZW(f,v,_,y,E),Us(v,_,a),l.feet.setXYZ(f,a[0],a[1],a[2]),l.treatment.setXYZW(f,b,M,S,L),f++)},flush(){if(c.instanceCount=f,d.visible=f>0,!!f)for(let h of Object.values(l))h.clearUpdateRanges(),h.addUpdateRange(0,f*h.itemSize),h.needsUpdate=!0}}}async function Ag(i){let e=new cs,t=Object.keys(Tg),n=await Promise.allSettled(t.map(f=>e.loadAsync(`./art/${f}-field.webp?v=kit2`))),s=n.find(f=>f.status==="rejected");if(s){for(let f of n)f.status==="fulfilled"&&f.value.dispose();throw new Error("\u89D2\u8272\u63D2\u753B\u52A0\u8F7D\u5931\u8D25",{cause:s.reason})}let r=new N,a=new N,o=new N,c=Object.fromEntries(t.map((f,h)=>[f,J2(i,f,n[h].value,r,a)])),l=Object.values(c),u=()=>l.forEach(f=>f.clear());function d(f,h,p,x){if(x!=="ai"&&x!=="hybrid"){u();return}for(let _ of l)_.begin();h.updateWorldMatrix(!0,!1),r.setFromMatrixColumn(h.matrixWorld,0),r.y=0,r.normalize(),o.setFromMatrixColumn(h.matrixWorld,1),a.set(0,1,0).lerp(o,.42).normalize();let g=x==="ai",m=f.phase==="ready"?.3:f.playing||f.overrun||f.parade?1:0,v=p*10.8+(f.parade?f.endTime*5.6:0);for(let _ of f.columns)for(let y of _.units)y.alive&&c.grunt.add(y.x,y.lift||0,y.z,y.size,y.size,Ma(y),m);for(let _ of f.runners)_.alive&&c.grunt.add(_.x,_.lift||0,_.z,_.size,_.size,Ma(_),m);for(let _ of f.allies){let y=bh(_.age/.32,0,1),E=.81+.19*y+.095*Math.sin(y*Math.PI),b=f.tier||1,M=b>=4||b===3&&_.slot%2===0||b===2&&_.slot%4===0?1:0,S=Math.max(.8*(1-y),M*(b>=4?.34:.2)),L=M?1.07:1;c.ally.add(_.x,.035*Math.sin(y*Math.PI),_.z,E*L,E*L,v+_.phase,m,0,0,S,.22*(1-y)+(f.buffs.fever>0?.14:0))}for(let _ of f.deliveries){if(_.slot==null||_.age<0)continue;let y=.65+.35*_.progress;c.ally.add(_.x,_.y,_.z,y,y,v+_.phase,.55,0,0,.42,.24)}{for(let _ of f.falling){if(_.prone){let S=Sr(_.t,0,.42),L=_.size*(f.overrun?1:1-Sr(_.t,1.78,2.1));c.ally.add(_.x,.09*S,_.z,L,L,0,0,.1*S*_.dir,0,0,0,.3*S,0,1.5*S);continue}let y=bh(_.t/.72,0,1),E=_.size*(1-Sr(y,.55,1)),b=_.roll*_.t+.16*Math.sin(_.spin*_.t);(_.side==="red"?c.grunt:c.ally).add(_.x,_.y,_.z,E,E,v+_.phase,0,b,0,.55*(1-Sr(y,.08,.45)),.72*(1-Sr(y,.03,.26)),.22*Sr(y,.25,.75))}if(g&&(f.phase!=="lost"||f.overrun||f.endTime<.25)){let _=f.visualScale,y=f.overrun?Sr(f.endTime,0,.5):0,E=f.phase==="lost"&&!f.overrun?bh(f.endTime/.25,0,1):0;c.captain.add(f.x,f.rope?.68*Math.sin(Math.PI*f.rope.age/.58):.1*y,f.captainZ,_,_*(1-.55*E),v*.83,f.overrun?0:m,-.38*E-.12*y,f.recoil,.66*f.mergeGlow,.14*f.mergeGlow+.48*f.hurt+.32*E,0,bh(f.velocity*.007,-.095,.095),1.5*y)}}for(let _ of l)_.flush()}return{draw:d,clear:u,captainTexture:n[t.indexOf("captain")].value,gruntTexture:n[t.indexOf("grunt")].value,allyTexture:n[t.indexOf("ally")].value}}var Md=72;function Rg(i,e){let t=new Mo(16184831,6452108,1.38);i.add(t);let n=new Ps(16773336,2.25);n.position.set(-9,17,7),i.add(n);let s=new Ps(8967423,.85);s.position.set(8,9,-10),i.add(s);let r=[0,1].map(()=>{let E=new fr(16751421,0,15,1.6);return E.visible=!0,i.add(E),{light:E,active:!1,age:1,life:.35,peak:0}}),a=0,o={topColor:{value:new _e("#0c2c57")},horizonColor:{value:new _e("#3b7cb0")},sunColor:{value:new _e("#ffe29c")},sunPos:{value:new me(-.42,.72)},aurora:{value:0},clock:{value:0}},c=new Lt({uniforms:o,depthWrite:!1,depthTest:!1,toneMapped:!1,vertexShader:`
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
    `});c.userData.unbent=!0;let l=new Ze(new Ut(2,2),c);l.frustumCulled=!1,l.renderOrder=-100,i.add(l);let u=new $a(1456219,.0085);i.fog=u;let d=new Ut(.16,.16),f=new Lt({transparent:!0,depthWrite:!1,toneMapped:!1,blending:bi,uniforms:{tint:{value:new _e("#fff1cc")}},vertexShader:`
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
    `}),h=new Dt(d,f,Md);h.frustumCulled=!1,h.renderOrder=7,h.instanceMatrix.setUsage(Yt),i.add(h);let p=Array.from({length:Md},(E,b)=>({x:(b*73%100/100-.5)*22,y:.4+b*37%100/100*6.5,z:-48+b*53%100/100*56,phase:b*1.13,size:.65+b*29%100/85})),x=new At,g=null,m="breeze";function v(E){if(E===g)return;g=E;let b=$n[E]||$n.quay;t.color.set(b.hemiSky),t.groundColor.set(b.hemiGround),t.intensity=b.hemiIntensity??1.38,n.color.set(b.keyLight),n.intensity=b.keyIntensity??2.25,s.color.set(b.rimLight),s.intensity=b.rimIntensity??.88,u.color.set(b.fog),u.density=b.fogDensity??.0082,e.setClearColor(b.deep,1),e.toneMappingExposure=b.exposure??1.06,o.topColor.value.set(b.skyTop),o.horizonColor.value.set(b.skyHorizon),o.sunColor.value.set(b.sunColor),o.aurora.value=E==="ice"?1:0,f.uniforms.tint.value.set(b.moteColor),m=b.moteStyle||"breeze"}function _(E,b,M,S,L=8,C=.28){let A=r[a++%r.length];A.light.position.set(E,Math.max(.6,b+.45),M),A.light.color.setHex(S),A.light.intensity=L,A.active=!0,A.peak=L,A.life=C,A.age=0}function y(E,b,M,S){v(E),o.clock.value=b;for(let B of r){if(!B.active)continue;B.age+=M,B.light.position.z+=S;let P=B.age/B.life;P>=1?(B.light.intensity=0,B.active=!1):B.light.intensity=B.peak*(1-P)*(1-P)}let L=m==="embers",C=m==="snow",A=L?2.1:C?-1.45:-.35,D=L?.65:C?1.15:.9;for(let B=0;B<Md;B++){let P=p[B];P.z+=S*.92+(C?1.6:.8)*M,P.y+=A*M,P.x+=Math.sin(b*1.4+P.phase)*D*M,P.z>9&&(P.z-=56),P.y<.25&&(P.y=6.8),P.y>7.2&&(P.y=.35),P.x>11.5&&(P.x=-11.5),P.x<-11.5&&(P.x=11.5);let V=.72+.28*Math.sin(b*4.2+P.phase);x.position.set(P.x,P.y,P.z),x.rotation.set(0,0,0),x.scale.setScalar(P.size*(L?1.15:C?1.1:.95)*V),x.updateMatrix(),h.setMatrixAt(B,x.matrix)}h.instanceMatrix.needsUpdate=!0}return{update:y,flashLight:_,applyTheme:v}}var hn=new At;function bd(i,e){i.count=e,i.visible=e>0,e>0&&(i.instanceMatrix.clearUpdateRanges(),i.instanceMatrix.addUpdateRange(0,e*16),i.instanceMatrix.needsUpdate=!0)}function Cg(i,e,t){let n=new Float32Array(3),s=$m(e,"near"),r=new Zt(new Float32Array(t*4),4).setUsage(Yt);s.setAttribute("stepPose",r);let a=new Kt({vertexColors:!0,shininess:42,specular:3884372});a.customProgramCacheKey=()=>"infantry-walk-"+e,a.onBeforeCompile=u=>{u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
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
        vec2 sole = position.yz + vec2(.118*lift,facing*${ya}*stride);
        transformed.yz = mix(transformed.yz,sole,boot);
        transformed.y += .022*abs(stepPose.w)*(1.0-boot);
        transformed.x += stepPose.y*.018*position.y + sign(limb)*arm*.009*stride;`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
varying float vGlow;`).replace("#include <color_fragment>",`#include <color_fragment>
      if (vGlow <= -1.0) {
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.18)*.86;
        diffuseColor.rgb = mix(faded,vec3(1.,.90,.66),clamp(-vGlow-1.,0.,1.)*.74);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.78,.24), clamp(vGlow,0.0,1.0)*.94);`)};let o=new Dt(s,a,t),c;o.count=0,o.visible=!1,o.frustumCulled=!1,o.instanceMatrix.setUsage(Yt),i.add(o);let l=0;return{paint(u,d){return c=Lf(e,u,d,r,t),c.instanceMatrix=o.instanceMatrix,i.add(c),c},begin(){l=0},put(u,d,f,h,p=0,x=0,g=0,m=0,v=0,_=0){l>=t||(hn.position.set(u,d,f),hn.rotation.set(x,g,m),hn.scale.setScalar(h),hn.updateMatrix(),o.setMatrixAt(l,hn.matrix),Us(v,_,n),r.setXYZW(l,p,n[0],n[1],n[2]),l++)},end(){o.count=l,o.visible=l>0&&!c,c&&(c.count=l,c.visible=l>0),l>0&&(o.instanceMatrix.clearUpdateRanges(),o.instanceMatrix.addUpdateRange(0,l*16),o.instanceMatrix.needsUpdate=!0,r.clearUpdateRanges(),r.addUpdateRange(0,l*4),r.needsUpdate=!0)}}}function j2(i){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(35,32,2,34,32,29);n.addColorStop(0,"rgba(24,28,50,.48)"),n.addColorStop(.53,"rgba(28,31,54,.34)"),n.addColorStop(.83,"rgba(36,39,62,.14)"),n.addColorStop(1,"rgba(36,39,62,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let s=t.createRadialGradient(23,32,1,24,32,17);s.addColorStop(0,"rgba(18,20,40,.52)"),s.addColorStop(.57,"rgba(22,25,46,.28)"),s.addColorStop(1,"rgba(22,25,46,0)"),t.fillStyle=s,t.fillRect(0,0,64,64);let r=new On(e);r.colorSpace=Mt;let a=new Ut(1,1);a.rotateX(-Math.PI/2);let o=new Dt(a,new bt({map:r,transparent:!0,depthWrite:!1,toneMapped:!1}),1600);o.count=0,o.visible=!1,o.frustumCulled=!1,o.instanceMatrix.setUsage(Yt),o.renderOrder=1,i.add(o);let c=0;return{begin(){c=0},put(l,u,d,f=1,h=1){c>=1600||(hn.position.set(l+d*.29*h,.021,u-d*.19*h),hn.rotation.set(0,.65,0),hn.scale.set(d*1.68*h,.95,d*.85*f),hn.updateMatrix(),o.setMatrixAt(c++,hn.matrix))},end(){bd(o,c)}}}function Pg(i,e,t,n,s){let r=new Rs(e,i,64);r.rotateX(-Math.PI/2);let a=new Ze(r,new bt({color:t,transparent:!0,opacity:n,depthWrite:!1,toneMapped:!1}));return a.renderOrder=3,s.add(a),a}function Q2(i){let e=new Ut(2.15,2.15);e.rotateX(-Math.PI/2);let t={uTime:{value:0},uColor:{value:new _e("#3af2c8")},uAccent:{value:new _e("#9effea")},uTier:{value:1},uBoost:{value:0}},n=new Lt({uniforms:t,transparent:!0,depthWrite:!1,toneMapped:!1,blending:bi,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
    `}),s=new Ze(e,n);s.renderOrder=3,i.add(s);let r=[["#36e6c4","#b6fff0"],["#3ab8ff","#b8ecff"],["#ffb82e","#fff099"],["#ff6d2e","#fff7b2"]];return{mesh:s,update(a,o){let c=a.phase==="lost";if(s.visible=!c&&!a.parade,!s.visible)return;let l=Math.max(1,Math.min(4,a.tier||1)),u=a.buffs.fever>0||a.overdriveActive>0?1:0,[d,f]=u?["#ffbe2e","#ffffff"]:r[l-1];t.uColor.value.set(d),t.uAccent.value.set(f),t.uTime.value=o,t.uTier.value=l,t.uBoost.value=u,s.position.set(a.x,.048,a.captainZ),s.scale.setScalar(a.visualScale*(1+u*.12))}}}function Ig(i,e){let t=new oh({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"});t.setClearColor(668502,1),t.outputColorSpace=Mt,t.toneMapping=To,t.toneMappingExposure=1.04;let n=new Ja,s=hg(t,n),r=Rg(n,t),a=new fn(41,1,.15,165),o=new N,c=jm();n.add(c.root);let l=Pg(2.15,2.15-.065,16743209,.88,n),u=Pg(2.15,2.15-.13,16764766,.44,n),d=ag();n.add(d.root);let f=Cg(n,"blue",180),h=Cg(n,"red",1800),p=j2(n),x=Q2(n),g=new Ze(new ni(1,28,12,0,Math.PI*2,0,Math.PI/2),new Lt({transparent:!0,depthWrite:!1,blending:bi,vertexShader:"varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}",fragmentShader:"varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),1.85);gl_FragColor=vec4(.28,.88,1.,.06+.62*rim);}"}));n.add(g);let m=new Dt(new Di(.21),new Kt({color:7661823,emissive:1931448,shininess:90}),20);m.count=0,m.visible=!1,m.frustumCulled=!1,m.instanceMatrix.setUsage(Yt),n.add(m);let v={},_=new Kt({vertexColors:!0,shininess:46});for(let R of["gunner","guard","bomber","standard","vault","courier"]){let O=new Dt(Jm(R),_,32);O.count=0,O.visible=!1,O.frustumCulled=!1,O.instanceMatrix.setUsage(Yt),n.add(O),v[R]=O}let y=Sg(n),E=mg(n),b=Mg(n,s.curve),M=wg(n),S=null,C=Ag(n).then(R=>(S=R,c.paint(R.captainTexture,R.gruntTexture),f.paint(R.allyTexture,R.gruntTexture),h.paint(R.gruntTexture,R.allyTexture),s.markDirty(),!0)).catch(R=>(console.warn("\u89D2\u8272\u8D34\u56FE\u52A0\u8F7D\u5931\u8D25\uFF0C\u5DF2\u4F7F\u7528 3D \u6A21\u578B",R),!1)),A=-3.72,D=0,B=0,P=0,V=41,Z=1,X=1,se=Math.min(devicePixelRatio||1,1.75),W=()=>{Z=e.clientWidth,X=e.clientHeight,a.aspect=Z/Math.max(1,X),V=Ne.clamp(41+(.54-a.aspect)*27,37,47),a.fov=V,a.updateProjectionMatrix(),t.setPixelRatio(se),t.setSize(Z,X,!1)};W();function U(R,O,he,G,ee){S||(ee="3d");let H=R.playing,q=ee!=="ai",Q=1-Math.exp(-8.5*he);s.setRoute(R.route.theme,R.stage,R.distance),r.update(R.route.theme,O,he,G);let fe=R.boss.defeatAge,tt=R.boss.defeated?.18*Ne.smoothstep(fe,0,.42)*(1-Ne.smoothstep(fe,.82,1.65)):0,Be=19.5*Math.tan(Ne.degToRad(V/2))*a.aspect,$e=Math.sign(R.x)*Math.max(0,Math.abs(R.x)-Be*.54),nt=s.curve.x>0,oe=nt?Ne.clamp($e,-1,1):$e,ge=R.boss.x+s.offset(R.boss.z),ye=1-Ne.smoothstep(a.aspect,.6,.92),Ie=R.boss.active?ye*Ne.smoothstep(R.boss.z,-16,-4)*(1-Ne.smoothstep(fe,1.45,2.05)):0,Se=Ne.lerp(R.x,ge,.55),je=Ne.lerp(oe,Se,Ie*.85),Ue=Ne.lerp(je,ge,tt),st=(R.boss.z+5.4)*tt;nt&&!R.boss.active&&(A=Ne.clamp(A,-1,1)),A+=(Ue-A)*Q;let ct=Ie*(3.1+Math.min(3.2,Math.abs(R.x-ge)*.48));D+=(ct-D)*Q,B=Math.max(0,B-he*1.9),P=Math.max(0,P-he*4.8);let yt=V+P*2.1;Math.abs(a.fov-yt)>.02&&(a.fov=yt,a.updateProjectionMatrix());let z=Math.sin(O*62)*B*B*.21,Qt=Math.sin(O*76)*B*B*.14,wt=(nt?Ne.clamp(19.5+(.5-a.aspect)*29,17.5,23.4):15.2)+D,Ee=13.2+(wt-15)*.81,Vt=nt?(A-s.offset(-22)*.45)/30:0,Xe=Ne.degToRad(V/2),Je=Math.atan2(14.88,20.65),I=13.2-15/Math.tan(Je-Xe),w=Math.atan2(wt,Ee-I)+Xe,Y=Ee-(wt-.12)/Math.tan(w);a.position.set(A+z+Vt*Ee,wt+Qt-tt*1.2,Ee+st),a.lookAt(A+.06+z+Vt*Y,.12,Y+st),a.updateMatrixWorld(),s.setCamera(a);let pe=H||R.overrun||R.parade?1:0,le=O*10.8+(R.parade?R.endTime*5.6:0);b.update(R),p.begin(),f.begin(),h.begin();for(let J of R.columns)for(let We of J.units){if(!We.alive||We.z<R.entryZ-3)continue;ee==="3d"&&h.put(We.x,We.lift||0,We.z,We.size,0,0,We.yaw,0,Ma(We),pe);let Nt=Ne.smoothstep(We.z,-45,-30);Nt>0&&p.put(We.x,We.z,.64*Nt)}let Me={gunner:0,guard:0,bomber:0,standard:0,vault:0,courier:0};for(let J of R.runners){if(!J.alive)continue;let We=v[J.role];We&&Me[J.role]<We.instanceMatrix.count&&(hn.position.set(J.x,(J.lift||0)+.012,J.z),hn.rotation.set(0,J.yaw,0),hn.scale.setScalar(J.size),hn.updateMatrix(),We.setMatrixAt(Me[J.role]++,hn.matrix)),ee==="3d"&&h.put(J.x,J.lift||0,J.z,J.size,0,0,J.yaw,0,Ma(J),pe),p.put(J.x,J.z,.67)}for(let[J,We]of Object.entries(v))bd(We,Me[J]);let we=R.tier||1;for(let J of R.allies){let We=1;J.age<.25&&(We=.55+.45*Math.min(1,J.age/.15)+Math.sin(Math.PI*Math.min(1,J.age/.25))*.18);let Nt=we>=4||we===3&&J.slot%2===0||we===2&&J.slot%4===0;Nt&&(We*=1.06),ee==="3d"&&f.put(J.x,0,J.z,We,Math.max(0,1-J.age*2.8,Nt?.22:0),0,-R.velocity*.014,0,le+J.phase,pe),p.put(J.x,J.z,.71*We)}let ie=0;function ae(J,We,Nt,Ri){ie>=m.instanceMatrix.count||(hn.position.set(J,We,Nt),hn.rotation.set(.18,O*4,0),hn.scale.setScalar(Ri),hn.updateMatrix(),m.setMatrixAt(ie++,hn.matrix))}E.update(R.deliveries);for(let J of R.deliveries)J.age<0||J.slot==null||ee==="3d"&&f.put(J.x,J.y,J.z,.65+.35*J.progress,.42,0,0,0,le+J.phase,.55);if(R.buffs.drone>0||R.overdriveActive>0)for(let J of[-1,1])ae(R.x+J*1.18,1.32+.08*Math.sin(O*6),R.captainZ-.32,1.08);bd(m,ie),g.visible=H&&(R.buffs.shield>0||R.overdriveActive>0),g.visible&&(g.position.set(R.x,.06,R.captainZ),g.scale.set(1.56*R.scale,1.58,1.32*R.scale));for(let J of R.falling){let We=Ne.smoothstep(J.t,0,.42),Nt=(J.size||1)*(J.prone?R.overrun?1:1-Ne.smoothstep(J.t,1.78,2.1):1-Math.pow(Math.min(1,J.t/.75),3.4));ee==="3d"&&(J.side==="red"?h:f).put(J.x,J.prone?.15*We:J.y,J.z,Nt,-2+Ne.smoothstep(J.t,.018,.16),J.prone?1.48*We:J.spin*J.t,J.prone?.12*J.dir:J.phase,J.prone?.16*We*J.dir:J.roll*J.t),J.y<2&&p.put(J.x,J.z,.64*Nt)}let be=R.phase==="lost",F=R.visualScale,re=R.overrun?Ne.smoothstep(R.endTime,0,.5):0,ne=be&&!R.overrun;c.root.visible=q&&(!ne||R.endTime<.4);let Te=R.rope?.68*Math.sin(Math.PI*R.rope.age/.58):0;c.root.position.set(R.x,R.overrun?.25*re:ne?Math.sin(Math.min(1,R.endTime/.4)*Math.PI)*.64:Te,R.captainZ),c.root.rotation.set(1.45*re,be?0:-R.velocity*.018,ne?-R.endTime*5:-.16*re),c.root.scale.setScalar(F*(ne?Math.max(.05,1-R.endTime*2):1)),c.animate({time:O+(R.parade?R.endTime*.54:0),run:R.parade?1:H?.91:be?0:.09,recoil:R.recoil,merge:Math.max(R.mergeGlow,R.hurt*.62,R.overdriveActive>0?.35:0),lean:Ne.clamp(R.velocity/9,-1,1)});let ce=R.boss;d.root.visible=ce.active&&!ce.removed&&ce.z<9;let ve=Ne.smoothstep(fe,.25,.92),ke=fe>.92?Math.sin((fe-.92)*19)*Math.exp(-9*(fe-.92)):0,rt=ce.lift*(1-Ne.smoothstep(fe,0,.3));d.root.position.set(ce.x-.26*ve,rt+.27*ve+Math.max(0,ke)*.16,ce.z-.62*ve),d.root.rotation.set(-1.49*ve+.13*ke,ce.yaw*(1-ve),-.3*ve),y(ce);let de=ce.skill,qe=de?Ne.smoothstep(de.age,0,de.warm)*(1-Ne.smoothstep(de.age,de.warm,de.warm+.3)):0,at=de?Math.sin(Math.PI*Ne.clamp((de.age-de.warm)/.52,0,1)):0;d.pose({charge:qe,release:at,mode:ee,time:O,walk:H&&ce.active&&!ce.defeated?1:0,march:ce.marched,attack:ce.attackT,hit:Math.max(ce.hit,ce.enraged?.16+.1*Math.sin(O*9):0),defeat:fe,kind:ce.kind,vault:ce.vault?.t||0,brace:ce.brace,drive:ce.special}),l.visible=u.visible=H&&!ce.defeated&&ce.attackT>0&&ce.attackT<.91,l.visible&&(l.position.set(ce.landX,.047,ce.landZ),u.position.set(ce.landX,.051,ce.landZ),u.scale.setScalar(.3+.7*Ne.smoothstep(ce.attackT,0,.91))),(!be||R.overrun)&&p.put(R.x,R.captainZ+re*.4,1.3*F,1,1.32),d.root.visible&&p.put(ce.x,ce.z-ve,3.65-rt*.38,1.12+ve*.65,1.15),x.update(R,O),p.end(),f.end(),h.end(),S&&S.draw(R,a,O,ee),M.update(he,G,R.shots,R.incoming),s.prepareScene(),t.render(n,a)}return{draw:U,assets:C,prepareBoss:R=>d.prepare(R).then(O=>(s.markDirty(),O)),resize:W,entryZ(){let R=Math.atan2(14.88,20.65);return 13.2-15/Math.tan(R-Ne.degToRad(V/2))},project(R,O,he){return o.set(R+s.offset(he),O,he).project(a),{x:(o.x+1)*Z/2,y:(1-o.y)*X/2}},feedback(R){M.burst(R.kind,R.x,R.y,R.z,R.strength,R.supply),R.kind==="slam"||R.kind==="wallBreak"||R.kind==="bossBurst"?(B=.92,P=.75,r.flashLight(R.x,R.y+.4,R.z,16747051,14,.36)):R.kind==="overdrive"||R.kind==="evolve"?(B=Math.max(B,.68),P=Math.max(P,.9),r.flashLight(R.x,1.1,R.z,16765509,16,.45)):R.kind==="bossEnrage"?(B=Math.max(B,.72),P=Math.max(P,.65),r.flashLight(R.x,1.4,R.z,16726822,15,.42)):R.kind==="victory"||R.kind==="vaultLand"?(B=Math.max(B,.55),r.flashLight(R.x,.5,R.z,16762460,9,.3)):R.kind==="impact"||R.kind==="discharge"?(B=Math.max(B,.3),P=Math.max(P,.22),r.flashLight(R.x,.4,R.z,R.kind==="discharge"?4583679:16749104,10,.22)):R.kind==="muzzle"?r.flashLight(R.x,R.y,R.z,16758861,6,.12):R.kind==="critHit"&&(B=Math.max(B,.22),r.flashLight(R.x,R.y,R.z,16768601,8,.15))},reset(R){A=R*.94,D=0,B=0,P=0,M.reset()},lowerResolution(){se<=1||(se=Math.max(1,se-.25),W())}}}var Lg=Math.PI*2,Ng={muzzle:{duration:.25,gain:.33,interval:.18},smallShot:{duration:.08,gain:.076,interval:.105},impact:{duration:.31,gain:.28,interval:.12},wallHit:{duration:.16,gain:.16,interval:.13},cardHit:{duration:.1,gain:.11,interval:.13},supplyBreak:{duration:.25,gain:.21,interval:.1},shieldHit:{duration:.16,gain:.14,interval:.14},wallBreak:{duration:.43,gain:.35,interval:.4},plus:{duration:.22,gain:.18,interval:.105},longRange:{duration:.44,gain:.25,interval:.18},guardUp:{duration:.38,gain:.22,interval:.18},merge:{duration:.41,gain:.23,interval:.18},slam:{duration:.49,gain:.42,interval:.5},bruiserStrike:{duration:.31,gain:.28,interval:.22},diverStrike:{duration:.36,gain:.22,interval:.1},wardenCast:{duration:.68,gain:.26,interval:.5},drillStrike:{duration:.32,gain:.21,interval:.18},kestrelCast:{duration:.66,gain:.23,interval:.42},engineStrike:{duration:.44,gain:.3,interval:.24},bossBurst:{duration:.79,gain:.4,interval:.7},glassBreak:{duration:.39,gain:.24,interval:.17},crateBreak:{duration:.32,gain:.24,interval:.2},latchHit:{duration:.16,gain:.16,interval:.1},rally:{duration:.9,gain:.28,interval:1},chainSnap:{duration:.29,gain:.28,interval:.23},discharge:{duration:.41,gain:.26,interval:.23},vaultLand:{duration:.25,gain:.21,interval:.4},victory:{duration:.79,gain:.28,interval:.7},loss:{duration:.63,gain:.25,interval:.57},hit:{duration:.09,gain:.075,interval:.14},critHit:{duration:.16,gain:.18,interval:.11},evolve:{duration:.82,gain:.32,interval:.6},overdrive:{duration:.76,gain:.38,interval:.6},bossEnrage:{duration:.72,gain:.34,interval:.8},buy:{duration:.32,gain:.24,interval:.12}};function eS(i,e){let t=i.createBuffer(1,Math.ceil(Ng[e].duration*24e3),24e3),n=t.getChannelData(0),s=981273;function r(u,d,f){let h=Math.floor(u*24e3),p=Math.min(n.length,h+Math.ceil(d*24e3)),x=Math.min(.005,d*.1),g=Math.min(.012,d*.16);for(let m=h;m<p;m++){let v=(m-h)/24e3,_=Math.min(1,v/x,(d-v)/g)*Math.exp(-3.35*v/d);n[m]+=f(v/d)*_}}function a(u,d,f,h,p,x=.12){let g=0;r(u,d,m=>{let v=h+(f-h)*(1-m)**3;return g+=Lg*v/24e3,p*(Math.sin(g)+x*Math.sin(2*g+.15))})}function o(u,d,f,h){let p=0,x=0,g=1-Math.exp(-Lg*f/24e3);r(u,d,()=>(s=Math.imul(1664525,s)+1013904223>>>0,p+=g*(s/2147483648-1-p),x+=.014*(p-x),h*(p-x*.65)))}function c(u,d,f,h){a(u,d,f*1.013,f,h,.16),a(u,d*.35,f*2.52,f*2.5,h*.11)}switch(e){case"cardHit":c(0,.09,1150,.42);break;case"supplyBreak":o(0,.068,4200,.51),c(.015,.18,906,.44),c(.07,.16,1326,.36);break;case"shieldHit":a(0,.15,740,365,.56,.18);break;case"muzzle":a(0,.2,213,61,.76,.48),o(0,.093,2400,.64),o(.023,.212,580,.57);break;case"smallShot":a(0,.054,1550,580,.33,.1),o(0,.042,3600,.56);break;case"impact":a(0,.23,115,49,.63,.52),o(.004,.25,1050,.89),o(.044,.23,370,.47);break;case"wallHit":o(0,.045,3100,.56),a(0,.124,650,440,.36),a(.008,.14,1050,750,.19);break;case"wallBreak":a(0,.23,174,57,.61,.33),o(0,.27,1970,.96);for(let[u,d]of[[.079,750],[.147,490],[.227,330]])o(u,.045,2850,.41),a(u,.13,d,d*.81,.22);break;case"plus":c(0,.107,622,.56),c(.06,.15,932,.68);break;case"longRange":c(0,.15,523,.48),c(.07,.17,784,.55),a(.14,.28,960,1175,.38);break;case"guardUp":a(0,.26,245,370,.45,.2),c(.055,.28,622,.57);break;case"merge":a(0,.24,320,752,.24),c(0,.16,523,.53),c(.075,.19,659,.59),c(.147,.24,988,.68);break;case"slam":o(0,.18,2e3,.78),a(0,.36,167,43,.96,.58),o(.035,.39,520,.84),o(.092,.13,1400,.44);break;case"bruiserStrike":o(0,.27,670,.7),a(0,.27,153,61,.74);break;case"diverStrike":o(0,.27,2300,.67),a(.01,.26,480,120,.42);break;case"wardenCast":a(0,.44,96,53,.77,.5),o(.05,.57,820,.68);break;case"drillStrike":c(0,.24,1450,.59),c(.05,.24,860,.5);break;case"kestrelCast":o(0,.56,3300,.58),a(.04,.52,830,1320,.35);break;case"engineStrike":a(0,.36,140,45,.81,.45),o(.015,.34,1350,.85);break;case"vaultLand":a(0,.2,115,49,.7),o(.01,.19,720,.61);break;case"glassBreak":o(0,.075,5100,.58);for(let[u,d]of[[0,2110],[.035,1560],[.075,2940],[.12,1020]])c(u,.19,d,.34);break;case"crateBreak":o(0,.17,1280,.8),o(.065,.14,2310,.43),a(0,.19,128,62,.39);break;case"latchHit":c(0,.14,1290,.58),o(0,.035,3e3,.3);break;case"rally":for(let[u,d]of[392,494,587,784].entries())c(u*.116,.34,d,.53);break;case"chainSnap":o(0,.048,4300,.65),c(.012,.19,1280,.45),c(.059,.18,711,.28);break;case"discharge":a(0,.29,1620,143,.66,.4),o(.05,.29,2900,.49);break;case"bossBurst":a(0,.5,182,41,1,.44),o(0,.12,4600,.85),o(.048,.54,850,.84),c(.23,.28,784,.32),c(.37,.39,1047,.33);break;case"victory":a(0,.35,144,48,.84,.37),o(.032,.31,720,.7);break;case"loss":c(0,.21,392,.57),c(.116,.22,330,.58),a(.246,.35,262,196,.64,.22);break;case"hit":o(0,.061,1290,.58),a(.003,.07,580,280,.24);break;case"critHit":c(0,.12,1760,.56),a(0,.1,880,1320,.36,.2),o(0,.045,4200,.35);break;case"evolve":for(let[u,d]of[523,659,784,1047,1319].entries())c(u*.072,.34,d,.56);a(.04,.45,262,523,.35,.22);break;case"overdrive":a(0,.52,220,46,.95,.52),o(0,.34,2400,.85),c(.06,.3,659,.42),c(.14,.34,988,.48);break;case"bossEnrage":a(0,.56,135,58,.88,.55),o(.04,.52,1150,.72),a(.18,.42,180,92,.52,.35);break;case"buy":c(0,.12,880,.52),c(.075,.2,1319,.62);break}let l=.001;for(let u of n)l=Math.max(l,Math.abs(u));for(let u=0;u<n.length;u++)n[u]*=.89/l;return t}function Dg(){let i,e,t,n,s=!1,r=!1,a=new Map,o=new Map,c=new Set;function l(h){c.delete(h),h.source.onended=null,h.source.disconnect(),h.gain.disconnect()}function u(){for(let h of c)h.source.stop(),l(h);o.clear()}function d(){if(!i)return;let h=i.currentTime;t.gain.cancelScheduledValues(h),t.gain.setTargetAtTime(s&&!r?.8:0,h,.008)}function f(){if(s&&i&&i.state!=="closed")return i.resume().catch(()=>{})}return{unlock(){if(s=!0,!i){let p=window.AudioContext||window.webkitAudioContext;if(!p)return;try{i=new p({latencyHint:"interactive"})}catch{return}e=i.createDynamicsCompressor(),e.threshold.value=-12,e.knee.value=9,e.ratio.value=5,e.attack.value=.004,e.release.value=.12,t=i.createGain(),t.gain.value=0,e.connect(t),t.connect(i.destination)}d();let h=f();return n?n.then(f):h},setMuted(h){r=!!h,r&&u(),d()},play(h,p=1,x=null){h==="merge"&&(x==="range"||x==="longshot"?h="longRange":(x==="shield"||x==="medic")&&(h="guardUp"));let g=Ng[h];if(!g||!s||r||!i||i.state!=="running"||!(p>0))return;let m=i.currentTime;if(m-(o.get(h)??-1/0)<g.interval||c.size>=16)return;o.set(h,m),a.has(h)||a.set(h,eS(i,h));let v=i.createBufferSource(),_=i.createGain(),y={source:v,gain:_};v.buffer=a.get(h);let E=h==="plus"||h==="merge"||h==="victory"||h==="loss";v.playbackRate.value=E?1:.95+Math.random()*.1,_.gain.value=g.gain*Math.min(1.36,.45+.55*Math.sqrt(p)),v.connect(_),_.connect(e),c.add(y),v.onended=()=>l(y),v.start()},pause(){if(s=!1,u(),d(),!i||i.state==="closed")return;let h=i.suspend().catch(()=>{});return n=h,h.then(()=>{n===h&&(n=void 0)}),h}}}var Ug="xiaobing-jinhua-save-v2",Sh=[{id:"squad",name:"\u8D77\u59CB\u7F16\u5236",desc:"\u5F00\u5C40\u989D\u5916\u643A\u5E26\u58EB\u5175\u51FA\u51FB",maxLevel:5,costs:[80,160,280,440,650],format:i=>i?`+${i*2} \u58EB\u5175`:"\u57FA\u7840\u7F16\u5236",nextText:i=>`+${(i+1)*2} \u58EB\u5175`},{id:"cannon",name:"\u91CD\u70AE\u53E3\u5F84",desc:"\u6C38\u4E45\u63D0\u5347\u961F\u957F\u4E3B\u70AE\u4E0E\u9F50\u5C04\u4F24\u5BB3",maxLevel:5,costs:[90,180,310,480,700],format:i=>i?`+${i*12}% \u70AE\u4F24`:"\u6807\u51C6\u53E3\u5F84",nextText:i=>`+${(i+1)*12}% \u70AE\u4F24`},{id:"crit",name:"\u9AD8\u7206\u88C5\u836F",desc:"\u63D0\u5347\u5168\u961F\u66B4\u51FB\u7387\u4E0E\u66B4\u51FB\u7A7F\u900F\u611F",maxLevel:5,costs:[100,190,320,500,720],format:i=>i?`+${i*6}% \u66B4\u51FB`:"\u6807\u51C6\u88C5\u836F",nextText:i=>`+${(i+1)*6}% \u66B4\u51FB`},{id:"charge",name:"\u8D85\u8F7D\u7535\u5BB9",desc:"\u52A0\u5FEB\u6218\u672F\u8D85\u8F7D\u5145\u80FD\u5E76\u63D0\u5347\u521D\u59CB\u80FD\u91CF",maxLevel:5,costs:[85,170,290,450,660],format:i=>i?`+${i*18}% \u5145\u80FD`:"\u6807\u51C6\u7535\u5BB9",nextText:i=>`+${(i+1)*18}% \u5145\u80FD`}];function tS(){return{coins:0,stars:{},bestCombo:0,totalKills:0,upgrades:{squad:0,cannon:0,crit:0,charge:0}}}function Fg(i=globalThis.localStorage){let e=tS();if(!i)return e;try{let t=i.getItem(Ug);if(!t)return e;let n=JSON.parse(t);if(!n||typeof n!="object")return e;if(e.coins=Math.max(0,Math.trunc(Number(n.coins)||0)),e.bestCombo=Math.max(0,Math.trunc(Number(n.bestCombo)||0)),e.totalKills=Math.max(0,Math.trunc(Number(n.totalKills)||0)),n.stars&&typeof n.stars=="object")for(let[s,r]of Object.entries(n.stars)){let a=Math.trunc(Number(r)||0);a>=1&&a<=3&&(e.stars[s]=a)}if(n.upgrades&&typeof n.upgrades=="object")for(let s of Sh){let r=Math.trunc(Number(n.upgrades[s.id])||0);e.upgrades[s.id]=Math.max(0,Math.min(s.maxLevel,r))}}catch{return e}return e}function Sd(i,e=globalThis.localStorage){if(e)try{e.setItem(Ug,JSON.stringify(i))}catch{}}function Eh(i){let e=i?.upgrades||{};return{extraAllies:(e.squad||0)*2,cannonMult:1+(e.cannon||0)*.12,critChanceBonus:(e.crit||0)*.06,overdriveRateMult:1+(e.charge||0)*.18,startingOverdrive:(e.charge||0)>=3?(e.charge-2)*14:0}}function Og(i,e,t){let n=String(e.stage),s=i.stars[n]||0,r=0,a=[];if(t){r=1,a.push({ok:!0,text:"\u51FB\u8D25\u9996\u9886\u901A\u8FC7\u5173\u5361"});let f=e.armor>=2;f&&r++,a.push({ok:f,text:"\u961F\u957F\u4FDD\u7559\u81F3\u5C11 2 \u683C\u62A4\u7532"});let h=(e.maxCombo||0)>=30||e.allies.length>=12;h&&r++,a.push({ok:h,text:"\u6700\u9AD8\u8FDE\u51FB \u2265 30 \u6216 \u5B58\u6D3B\u5175\u529B \u2265 12"})}let o=45+e.stage*10,c=Math.min(120,Math.floor((e.score||0)*.45)),l=Math.min(80,Math.floor((e.maxCombo||0)*.8)),u=t&&r>s?(r-s)*35:0,d=t?o+c+l+u:Math.max(20,Math.floor(o*.35+c*.55));return i.coins+=d,i.totalKills+=e.score||0,i.bestCombo=Math.max(i.bestCombo,e.maxCombo||0),t&&r>s&&(i.stars[n]=r),{stars:r,prevStars:s,isNewBest:t&&r>s,reward:d,firstStarBonus:u,criteria:a}}function Bg(i,e){let t=Sh.find(r=>r.id===e);if(!t)return!1;let n=i.upgrades[e]||0;if(n>=t.maxLevel)return!1;let s=t.costs[n];return i.coins<s?!1:(i.coins-=s,i.upgrades[e]=n+1,!0)}function Ed(i){return Object.values(i.stars||{}).reduce((e,t)=>e+t,0)}var ue=i=>document.getElementById(i),Vi=ue("stage"),Ra=ue("game"),Bd=ue("start"),$o=ue("startButton"),n1=ue("veil"),Er=ue("bossbar"),nS=ue("bossHud"),Ko=ue("bossAlert"),Zo=ue("evoBadge"),wh=ue("comboBox"),Rh=ue("overdriveBtn"),kg=ue("screenFx"),ks=ue("tip"),i1={hybrid:"\u6DF7\u5408",ai:"AI \u8D34\u56FE","3d":"\u7EAF 3D"},s1={hybrid:"\u961F\u957F\u548C Boss \u4F7F\u7528 3D\uFF0C\u7EA2\u84DD\u5C0F\u5175\u4F7F\u7528\u52A8\u6001\u539F\u753B\u3002",ai:"\u4F7F\u7528\u539F\u753B\u89D2\u8272\u548C\u52A8\u6001\u8D34\u56FE\u3002","3d":"\u6240\u6709\u89D2\u8272\u90FD\u4F7F\u7528 3D \u6A21\u578B\uFF0C\u53EF\u770B\u6E05\u8DD1\u52A8\u3001\u70AE\u8EAB\u540E\u5750\u548C\u53CC\u62F3\u7838\u5730\u3002"},iS=matchMedia("(pointer:coarse)").matches;ue("instruction").textContent=iS?"\u5DE6\u53F3\u62D6\u52A8 \xB7 \u4E0B\u62C9\u540E\u64A4 \xB7 \u6EE1\u80FD\u70B9\u8D85\u8F7D\u9F50\u5C04":"WASD / \u65B9\u5411\u952E\u79FB\u52A8 \xB7 \u7A7A\u683C\u6216 E \u952E\u8D85\u8F7D\u9F50\u5C04";function r1(i){try{return localStorage.getItem(i)}catch{return null}}function a1(i,e){try{localStorage.setItem(i,e)}catch{}}var Zn=Fg(),sS=new URL(location.href).searchParams.get("art"),Ai=[sS,r1("squad-art"),"hybrid"].find(i=>Object.prototype.hasOwnProperty.call(i1,i)),zs=r1("squad-mute")==="1",gn=null,Ar=!1,Rd=!1,xn=null,jo=null,ms=!0,Ta=0,wr=0,Ch=0,Hs=0,wd=0,Td=0,o1=0,Cd=0,Pd=!1,Id=!1,Ld=!1,Nd=0,Dd=!1,Gi=null,Aa=390,kd=844,l1=64;function c1(){Aa=Vi.clientWidth||390,kd=Vi.clientHeight||844;let i=ue("level")?.closest(".hud");l1=i?i.offsetTop+i.offsetHeight+22:64}var Tr=new Set,Kn=Dg();Kn.setMuted(zs);function h1(){let i=zs?"\u5F00\u542F\u58F0\u97F3":"\u5173\u95ED\u58F0\u97F3";ue("soundIcon").setAttribute("href",zs?"#i-mute":"#i-sound"),ue("sound").setAttribute("aria-label",i),ue("sound").title=i}h1();var zd=24,Hd=Array.from({length:zd},()=>{let i=document.createElement("span");return i.className="popup",i.hidden=!0,ue("popups").append(i),{el:i,active:!1,x:0,y:0,age:0,life:.72,vx:0,vy:0}}),rS=0;function aS(i){if(!gn)return;let e=gn.project(i.x,i.y,i.z);if(e.x<-40||e.x>Aa+40||e.y<10||e.y>kd)return;let t=Hd[rS++%zd];t.active=!0,t.x=e.x,t.y=e.y,t.age=0,t.life=i.kind==="evolve"?1.15:i.kind==="crit"?.78:.62,t.vx=(Math.random()-.5)*26,t.vy=i.kind==="evolve"?-52:-64,t.el.dataset.kind=i.kind||"rocket",t.el.textContent=i.text,t.el.hidden=!1,t.el.style.opacity="1",t.el.style.transform=`translate3d(${e.x.toFixed(1)}px,${e.y.toFixed(1)}px,0) translate(-50%,-50%) scale(1.18)`}function zg(i){for(let e=0;e<zd;e++){let t=Hd[e];if(!t.active)continue;t.age+=i;let n=t.age/t.life;if(n>=1){t.active=!1,t.el.hidden=!0;continue}t.x+=t.vx*i,t.y+=t.vy*i,t.vy*=Math.exp(-3.6*i);let s=n<.16?1.25-n:1-n*.16,r=n<.6?1:1-(n-.6)/.4;t.el.style.opacity=r.toFixed(2),t.el.style.transform=`translate3d(${t.x.toFixed(1)}px,${t.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${s.toFixed(2)})`}}function oS(){for(let i of Hd)i.active=!1,i.el.hidden=!0}var te=new cl(i=>{i.kind!=="smallShot"&&i.kind!=="loss"&&gn?.feedback(i),Kn.play(i.kind,i.strength,i.supply),i.kind==="overdrive"||i.kind==="bossBurst"||i.kind==="finisher"?Hs=Math.max(Hs,.048):(i.kind==="wallBreak"||i.kind==="evolve"||i.kind==="bossEnrage")&&(Hs=Math.max(Hs,.032))}),Th=Number(new URL(location.href).searchParams.get("stage"));Number.isInteger(Th)&&Th>=1&&Th<=ai&&te.reset(Th);te.applyBonuses(Eh(Zn));function u1(i){return i.chapter.name+(i.number===10?" \xB7 \u9AD8\u96BE":"")}function Ph(){ue("missionNumber").textContent=String(te.stage).padStart(2,"0"),ue("missionChapter").textContent=u1(te.route),ue("missionName").textContent=te.route.name,ue("homeStars").textContent=`${Ed(Zn)} / ${ai*3}`,ue("homeCoins").textContent=String(Zn.coins)}var f1=new Map;for(let i of Fh){let e=document.createElement("section");e.className="chapter",e.dataset.theme=i.theme;let t=document.createElement("header");t.className="chapter-heading";let n=document.createElement("h3");n.textContent=i.name;let s=document.createElement("span");s.textContent=String(i.first).padStart(2,"0")+" \u2014 "+String(i.last).padStart(2,"0"),t.append(n,s);let r=document.createElement("div");r.className="chapter-stages";for(let a of qi.slice(i.first-1,i.last)){let o=document.createElement("button"),c=document.createElement("b");c.textContent=String(a.number).padStart(2,"0");let l=document.createElement("span");l.className="stage-stars",f1.set(a.number,l);let u=document.createElement("span");if(u.className="stop-name",u.textContent=a.name,o.dataset.level=a.number,o.setAttribute("aria-label","\u7B2C "+a.number+" \u5173 "+a.name),o.append(c,l,u),a.number===10){let d=document.createElement("small");d.className="siege-label",d.textContent="\u9AD8\u96BE",o.append(d),o.dataset.hard="",o.setAttribute("aria-label","\u7B2C 10 \u5173 "+a.name+" \u9AD8\u96BE")}o.addEventListener("click",()=>Wd(a.number)),r.append(o)}e.append(t,r),ue("stageList").append(e)}function Ud(){for(let[i,e]of f1.entries()){let t=Zn.stars[String(i)]||0;e.textContent=t?"\u2605".repeat(t)+"\u2606".repeat(3-t):""}}Ud();Ph();function d1(){ue("armoryCoins").textContent=String(Zn.coins);let i=ue("armoryList");i.textContent="";for(let e of Sh){let t=Zn.upgrades[e.id]||0,n=t>=e.maxLevel,s=n?0:e.costs[t],r=document.createElement("div");r.className="armory-item";let a=document.createElement("div");a.className="armory-info";let o=document.createElement("h4");o.textContent=e.name;let c=document.createElement("span");c.textContent=`Lv.${t}/${e.maxLevel} \xB7 ${e.format(t)}`,o.append(c);let l=document.createElement("p");l.textContent=n?`${e.desc}\uFF08\u5DF2\u6EE1\u7EA7\uFF09`:`${e.desc} \u2192 ${e.nextText(t)}`,a.append(o,l);let u=document.createElement("button");u.className="armory-buy",u.disabled=n||Zn.coins<s,u.textContent=n?"\u5DF2\u6EE1\u7EA7":`${s} \u519B\u9977`,u.addEventListener("click",()=>{Bg(Zn,e.id)&&(Sd(Zn),Kn.unlock(),Kn.play("buy",1),d1(),Ph(),te.phase==="ready"&&(te.reset(te.stage),te.applyBonuses(Eh(Zn)),ms=!0))}),r.append(a,u),i.append(r)}}ue("stageList").addEventListener("keydown",i=>{let e={ArrowLeft:-1,ArrowRight:1,ArrowUp:-5,ArrowDown:5};if(!Object.prototype.hasOwnProperty.call(e,i.code)||!i.target.dataset.level)return;let t=Math.min(ai,Math.max(1,+i.target.dataset.level+e[i.code]));i.preventDefault(),ue("stageList").querySelector('[data-level="'+t+'"]').focus()});function Gd(){Tr.clear(),Gi=null}function Ah(i,e){ks.textContent=i,ks.hidden=!1,o1=te.elapsed+e}function Vd(i,e){if(Object.prototype.hasOwnProperty.call(i1,i)){Ai=Rd?i:"3d",Vi.dataset.art=Ai,ms=!0,e&&a1("squad-art",Ai);for(let t of ue("options").children)t.setAttribute("aria-pressed",String(t.dataset.art===Ai)),t.disabled=!Rd&&t.dataset.art!=="3d";xn==="art"&&(ue("detail").textContent=s1[Ai])}}function Jo(){Ar&&(p1(),te.start(),Kn.unlock(),Bd.hidden=!0,ue("pause").hidden=!1,Vi.dataset.phase=te.phase,c1())}function Wd(i=te.stage){Gd(),oS(),te.reset(i),te.applyBonuses(Eh(Zn)),Ph(),gn.prepareBoss(te.boss.kind).then(()=>{ms=!0}),gn.reset(te.x),Ta=0,Ch=0,Hs=0,ks.hidden=!0,Ko.hidden=!0,Cd=0,Pd=!1,Id=!1,Ld=!1,Nd=0,Dd=!1,Fd="";let e=new URL(location.href);e.searchParams.set("stage",te.stage),history.replaceState(null,"",e),Jo()}function Gs(i){if(!Ar)return;Gd(),Ta=0,xn=i,ms=!0,n1.hidden=!1,Vi.querySelector(".hud").inert=!0,Bd.inert=!0;let e=i==="result"?te.phase:i,t={art:"art",levels:"map",pause:"pause",won:"medal",lost:"retreat",armory:"wrench"};if(ue("dialog").dataset.panel=e,ue("dialogIcon").setAttribute("href","#i-"+(t[e]||"flag")),ue("dialogChapter").textContent=i==="levels"?`\u6E2F\u533A\u8FDC\u5F81 \xB7 \u5DF2\u6536\u96C6 ${Ed(Zn)} / ${ai*3} \u2605`:i==="armory"?"\u519B\u56E2\u6C38\u4E45\u5F3A\u5316":u1(te.route),ue("resultStats").hidden=i!=="result",ue("resultStars").hidden=i!=="result",ue("armoryPanel").hidden=i!=="armory",ue("options").hidden=i!=="art",ue("stageList").hidden=i!=="levels",ue("dialog").classList.toggle("levels",i==="levels"),ue("selectStage").hidden=i!=="pause"&&i!=="result",ue("armoryAction").hidden=i!=="result",ue("secondary").hidden=i!=="pause",i==="levels"){Kn.pause(),Ud(),ue("dialogTitle").textContent="\u6218\u5F79\u5730\u56FE",ue("detail").textContent="",ue("continue").textContent="\u8FD4\u56DE";for(let n of ue("stageList").querySelectorAll("[data-level]"))n.setAttribute("aria-current",String(+n.dataset.level===te.stage))}if(i==="armory"&&(Kn.pause(),d1(),ue("dialogTitle").textContent="\u519B\u68B0\u6574\u5907",ue("detail").textContent="\u6D88\u8017\u8FDC\u5F81\u519B\u9977\u6C38\u4E45\u5F3A\u5316\u5C0F\u961F\u521D\u59CB\u6218\u529B\uFF0C\u5BF9\u5168\u90E8 30 \u5173\u751F\u6548\u3002",ue("continue").textContent="\u5B8C\u6210\u6574\u5907"),i==="art"&&(Kn.pause(),ue("dialogTitle").textContent="\u89D2\u8272\u753B\u9762",ue("detail").textContent=s1[Ai],ue("continue").textContent="\u786E\u5B9A",Vd(Ai,!1)),i==="pause"&&(Kn.pause(),ue("dialogTitle").textContent="\u5DF2\u6682\u505C",ue("detail").textContent="\u7B2C "+te.stage+" \u5173 \xB7 "+te.route.name,ue("continue").textContent="\u7EE7\u7EED\u6E38\u620F"),i==="result"){let n=te.phase==="won",s=Math.floor(te.elapsed);if(ue("resultKills").textContent=te.score,ue("resultCombo").textContent=te.maxCombo,ue("resultTime").textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0"),!Dd){Dd=!0;let r=Og(Zn,te,n);Sd(Zn),Ph(),Ud();let a=ue("starRow").children;for(let o=0;o<3;o++)a[o].classList.toggle("lit",o<r.stars);ue("resultReward").textContent=`+${r.reward} \u519B\u9977`+(r.firstStarBonus?" (\u542B\u9996\u661F\u5956\u52B1)":"")}if(n)ue("dialogTitle").textContent=te.stage===ai?"\u5168\u90E8\u901A\u5173":`\u7B2C ${te.stage} \u5173\u901A\u8FC7`,ue("detail").textContent=te.stage<ai?"\u4E0B\u4E00\u7AD9 \xB7 "+qi[te.stage].name:"\u5C0F\u961F\u5DF2\u5B8C\u6210\u5168\u90E8\u822A\u7EBF\uFF0C\u53EF\u7EE7\u7EED\u51B2\u523A\u5168\u4E09\u661F\uFF01";else{let r={signature:["\u961F\u957F\u51FA\u5C40",bn[te.boss.kind].name+"\u7684"+bn[te.boss.kind].skill+"\u547D\u4E2D\u4E86\u961F\u957F\u3002"],bossShot:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u5F39\u5E55\u51FB\u5012\u3002"],gap:["\u961F\u957F\u5760\u6865","\u9047\u5230\u7F3A\u53E3\u65F6\uFF0C\u63D0\u524D\u6362\u9053\uFF0C\u6216\u5E26\u4E0A\u67B6\u6865\u8865\u7ED9\u3002"],infantry:["\u5C0F\u961F\u5168\u706D","\u7EA2\u5175\u5DF2\u8D8A\u8FC7\u9632\u7EBF\u3002"],skyfall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u843D\u4E0B\u7684\u91CD\u7269\u51FB\u4E2D\u3002"],wall:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB\u786C\u5899\u63A8\u51FA\u4E86\u8DD1\u9053\u3002"],breach:["\u9632\u7EBF\u5931\u5B88","Boss \u7A81\u7834\u4E86\u9632\u7EBF\u3002"],slam:["\u961F\u957F\u51FA\u5C40","\u961F\u957F\u88AB Boss \u7684\u843D\u5730\u51B2\u51FB\u51FB\u5012\u3002"]},a=te.boss.active&&!te.boss.defeated?`Boss \u8FD8\u5269 ${Math.ceil(te.boss.hp)} / ${te.boss.maxHp} \u751F\u547D`:"\u7EA2\u5175\u7A81\u7834\u4E86\u961F\u4F0D\u3002",[o,c]=r[te.lossReason]||["\u5C0F\u961F\u5168\u706D",a];ue("dialogTitle").textContent=o,ue("detail").textContent=c}ue("continue").textContent=n&&te.stage<ai?"\u4E0B\u4E00\u5173":"\u518D\u73A9\u4E00\u6B21"}if(i==="levels"){let n=ue("stageList").querySelector("[aria-current=true]");n.focus({preventScroll:!0}),n.scrollIntoView({block:"nearest"})}else ue("continue").focus({preventScroll:!0})}function p1(){ms=!0,xn=null,jo=null,n1.hidden=!0,Vi.querySelector(".hud").inert=!1,Bd.inert=!1,Ta=0}function m1(){let i=xn,e=jo;if(p1(),i==="result"){Wd(te.phase==="won"?te.stage<ai?te.stage+1:1:te.stage);return}if((i==="art"||i==="levels"||i==="armory")&&e){Gs(e);return}te.playing?Kn.unlock():te.phase==="ready"&&$o.focus({preventScroll:!0})}function g1(){!Ar||!te.playing&&te.phase!=="ready"&&!te.resultReady||(jo=xn,Gs("levels"))}function x1(){Ar&&(jo=xn,Gs("armory"))}ue("level").addEventListener("click",g1);ue("selectStage").addEventListener("click",g1);ue("openArmory").addEventListener("click",x1);ue("armoryAction").addEventListener("click",x1);ue("continue").addEventListener("click",m1);ue("secondary").addEventListener("click",()=>Wd());$o.addEventListener("click",Jo);Rh.addEventListener("pointerdown",i=>{i.stopPropagation(),!(!te.playing||xn)&&(Kn.unlock(),te.triggerOverdrive())});ue("sound").addEventListener("click",()=>{zs=!zs,a1("squad-mute",zs?"1":"0"),Kn.setMuted(zs),zs||Kn.unlock(),h1()});ue("pause").addEventListener("click",()=>{te.playing&&Gs("pause")});ue("styles").addEventListener("click",()=>{jo=xn,Gs("art")});for(let i of ue("options").children)i.addEventListener("click",()=>Vd(i.dataset.art,!0));Ra.addEventListener("pointerdown",i=>{!Ar||xn||!i.isPrimary||i.button!==0||(te.phase==="ready"&&Jo(),te.playing&&(i.preventDefault(),Gi={id:i.pointerId,x:i.clientX,y:i.clientY},Ra.setPointerCapture(i.pointerId)))});Ra.addEventListener("pointermove",i=>{!Gi||i.pointerId!==Gi.id||xn||(te.aim(te.targetX+(i.clientX-Gi.x)*14.8/Aa,te.targetZ+(i.clientY-Gi.y)*11/kd),Gi.x=i.clientX,Gi.y=i.clientY)});function lS(i){i.pointerId===Gi?.id&&(Gi=null)}for(let i of["pointerup","pointercancel","lostpointercapture"])Ra.addEventListener(i,lS);var v1=["ArrowLeft","KeyA"],_1=["ArrowRight","KeyD"],y1=["ArrowUp","KeyW"],M1=["ArrowDown","KeyS"];window.addEventListener("keydown",i=>{if(!Ar||i.altKey||i.ctrlKey||i.metaKey)return;let e=i.code;if(xn){xn!=="result"&&(e==="Escape"||e==="KeyP")&&!i.repeat&&(i.preventDefault(),m1());return}if(v1.includes(e)||_1.includes(e)||y1.includes(e)||M1.includes(e)){i.preventDefault(),te.phase==="ready"&&Jo(),Tr.add(e);return}i.repeat||((e==="Space"||e==="Enter")&&te.phase==="ready"&&!(i.target instanceof HTMLButtonElement&&i.target!==$o)?(i.preventDefault(),Jo()):(e==="KeyE"||e==="Space"||e==="ShiftLeft"||e==="ShiftRight")&&te.playing&&!(e==="Space"&&i.target instanceof HTMLButtonElement)?te.overdrive>=100&&(i.preventDefault(),Kn.unlock(),te.triggerOverdrive()):(e==="KeyP"||e==="Escape")&&te.playing&&(i.preventDefault(),Gs("pause")))});window.addEventListener("keyup",i=>Tr.delete(i.code));function Xd(){Gd(),te.playing&&!xn&&Gs("pause")}window.addEventListener("blur",Xd);document.addEventListener("visibilitychange",()=>{wr=0,document.hidden&&Xd()});var Hg=-1,Gg=-1,Vg=-1,Wg=-1,Xg=-1,qg=-1,Yg=-1,Zg=-1,Ad="",Kg="",Fd="",$g=1,Jg=null,jg=-1,Od=matchMedia("(prefers-reduced-motion: reduce)"),cS=2*Math.PI*27;function Qg(i,e,t){if(e===t)return;let n=ue(i);if(n.textContent=e,!(!te.playing||t<0||Od.matches||!n.animate)){for(let s of n.getAnimations())s.cancel();n.animate([{transform:"scale(1.2)",color:e>t?"#ffe097":"#ffa488"},{transform:"scale(1)",color:"#fff9e9"}],{duration:220,easing:"ease-out"})}}function e1(){if(te.popups.length){for(let h=0;h<te.popups.length;h++)aS(te.popups[h]);te.popups.length=0}let i=te.allies.length,e=te.cannonDamage,t=ue("level"),n="\u7B2C "+te.stage+" \u5173";ue("levelText").textContent!==n&&(ue("levelText").textContent=n);let s=Math.min(100,Math.floor(100*te.row/te.finaleRow));s!==jg&&(ue("progress").firstElementChild.style.transform="scaleX("+s/100+")",ue("progress").setAttribute("aria-valuenow",String(s)),jg=s),t.title=te.route.name+" \xB7 \u9009\u62E9\u5173\u5361";let r=te.playing;if(Zo.hidden=!r,r){let h=te.tier||1,p=Zs[h-1],x=Zs[h],g=x?Math.max(0,Math.min(1,(te.evoPoints-p.need)/(x.need-p.need))):1;h!==qg&&(Zo.dataset.tier=String(h),ue("evoLevel").textContent=`Lv.${h}`,ue("evoName").textContent=p.name,qg=h,!Od.matches&&Zo.animate&&Zo.animate([{transform:"scale(1.2)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"})),ue("evoFill").style.transform=`scaleX(${g.toFixed(3)})`}let a=[];te.overdriveActive>0&&a.push(["\u8D85\u8F7D\u8D85\u9891",Math.ceil(te.overdriveActive)+"s","gold"]);for(let[h,p]of Object.entries(te.buffs))if(p>0){let x=Rn[h];a.push([x.label,Math.ceil(p)+"s",h==="frost"?"ice":x.tone])}te.planks&&a.push(["\u4FBF\u6865","\xD7"+te.planks,"gold"]),te.chill>0&&a.push(["\u971C\u51BB\u51CF\u901F",Math.ceil(te.chill)+"s","ice"]);let o=r?a.map(h=>h.join(":")).join("|"):"";if(o!==Fd){Fd=o;let h=ue("buffs");h.hidden=!o,h.textContent="";for(let[p,x,g]of a){let m=document.createElement("span");m.className="buff-chip",m.dataset.tone=g;let v=document.createElement("small");v.textContent=x,m.append(p,v),h.append(m)}}let c=r&&te.combo>=3;if(wh.hidden=!c,c&&(te.combo!==Yg&&(Yg=te.combo,ue("comboCount").textContent=String(te.combo),ue("comboMult").textContent=`\xD7${te.comboDamageMult.toFixed(2)} \u706B\u529B`,wh.dataset.hot=te.combo>=80?"3":te.combo>=40?"2":te.combo>=15?"1":"0",!Od.matches&&wh.animate&&wh.animate([{transform:"scale(1.16)"},{transform:"scale(1)"}],{duration:150,easing:"ease-out"})),ue("comboFill").style.transform=`scaleX(${Math.max(0,Math.min(1,te.comboTimer/3.2)).toFixed(3)})`),Rh.hidden=!r,r){let h=te.overdriveActive>0,p=h?Math.round(te.overdriveActive/4.2*100):Math.floor(te.overdrive),x=!h&&te.overdrive>=100,g=h?"active":x?"ready":"charge";g!==Ad&&(Ad=g,Rh.dataset.ready=String(x),Rh.dataset.active=String(h)),(p!==Zg||g!==Ad)&&(Zg=p,ue("odArc").style.strokeDashoffset=(cS*(1-p/100)).toFixed(1),ue("odLabel").textContent=h?"\u8D85\u8F7D\u4E2D":x?"\u9F50\u5C04!":p+"%")}let l=r?te.hurt>.25?"hurt":te.overdriveActive>0||te.buffs.fever>0?"overdrive":te.chill>0?"chill":"":"";l!==Kg&&(Kg=l,l?kg.dataset.fx=l:delete kg.dataset.fx),Qg("count",i,Hg),Qg("power",e,Gg),Hg=i,Gg=e,Vi.dataset.phase=te.phase;let u=ue("armorMeter");if(u.hidden=!te.playing||te.armor===3,!u.hidden){let h=gn.project(te.x,1.94*te.visualScale,te.captainZ);u.style.transform="translate("+h.x.toFixed(1)+"px,"+h.y.toFixed(1)+"px)",u.dataset.value!==String(te.armor)&&(u.dataset.value=te.armor,u.setAttribute("aria-label","\u961F\u957F\u62A4\u7532 "+te.armor+" / 3"))}let d=te.boss,f=d.active&&!d.defeated&&gn.project(d.x,0,d.z).y>=4;if(Er.hidden=!f,nS.hidden=!f,f&&(Zo.hidden=!0),f){let h=bn[d.kind],[p,x]=h.crown,g=d.z+x*Math.cos(d.yaw),m=gn.project(d.x,p+d.lift,g);if(Ai!=="ai"&&If[d.kind]){m.y=1/0;for(let[C,A,D]of If[d.kind]){let B=d.z+A*Math.cos(d.yaw)-D*Math.abs(Math.sin(d.yaw));m.y=Math.min(m.y,gn.project(d.x,C+d.lift,B).y-9)}}let v=gn.project(d.x+1,p+d.lift,g).x-m.x,_=Math.round(Math.min(Aa*.28,114,Math.max(66,v*2.55)));Xg!==_&&(Er.style.setProperty("--hp-width",_+"px"),Xg=_),ue("bossName").textContent!==h.name&&(ue("bossName").textContent=h.name,ue("bossHudName").textContent=h.name,ue("bossHudSkill").textContent=h.skill),ue("bossHudRage").hidden=!d.enraged;let y=l1+44,E=1-Math.min(1,Math.max(0,(m.y+4-y)/27));Jg!==d&&($g=m.x<Aa/2?1:-1,Jg=d);let b=_/2+6,M=Math.max(b,Math.min(Aa-b,m.x+$g*E*(_/2+v*1.7))),S=Math.max(y,m.y+4);Er.style.transform=`translate(${M.toFixed(1)}px,${S.toFixed(1)}px) translate(-50%, -100%)`;let L=Math.ceil(d.hp);if(L!==Vg||d.maxHp!==Wg){let C=Math.max(0,d.hp/d.maxHp);Er.firstElementChild.style.transform=`scaleX(${C})`,Er.lastElementChild.textContent=L,Er.setAttribute("aria-valuenow",String(L)),Er.setAttribute("aria-valuemax",String(d.maxHp)),ue("bossHudFill").style.transform=`scaleX(${C})`,ue("bossHudHp").textContent=`${L} / ${d.maxHp}`,Vg=L,Wg=d.maxHp}}te.playing&&!xn&&(!Pd&&te.wall.hp>0&&te.distance>=10&&te.wall.z<0&&(Pd=!0,Ah("\u51FB\u788E\u88C5\u7532\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00",2.8)),te.wall.hp<=0&&ks.textContent==="\u51FB\u788E\u88C5\u7532\u5899\uFF0C\u6216\u5411\u5DE6\u907F\u5F00"&&(ks.hidden=!0),f&&!Id&&(Id=!0,ue("bossAlertName").textContent=`${bn[d.kind].name} \xB7 ${bn[d.kind].skill}`,Ko.hidden=!1,Cd=te.elapsed+1.9,Ah(bn[d.kind].name+" \xB7 \u91CD\u70AE\u76F4\u51FB\uFF0C\u907F\u5F00\u843D\u70B9",2.2)),!Ko.hidden&&te.elapsed>=Cd&&(Ko.hidden=!0),d.defeated&&!Ld&&d.defeatAge>=.92&&(Ld=!0,Ah("Boss \u5DF2\u5012\u4E0B\uFF0C\u6E05\u7406\u5269\u4F59\u7EA2\u5175",2.3)),te.hint&&te.hint.id!==Nd&&(Nd=te.hint.id,Ah(te.hint.text,2.1)),!ks.hidden&&te.elapsed>=o1&&(ks.hidden=!0)),!te.playing&&te.phase!=="ready"&&(ks.hidden=!0,Ko.hidden=!0,ue("pause").hidden=!0,te.resultReady&&!xn&&Gs("result"))}function b1(i){if(requestAnimationFrame(b1),document.hidden)return;if(xn&&!ms){wr=i;return}if(!xn&&te.phase==="ready"&&wr&&i-wr<1e3/29&&!ms)return;ms=!1;let e=wr?(i-wr)/1e3:1/60;wr=i;let t=Math.min(.08,Math.max(0,e)),n=0;if(!xn){if(Hs>0){Hs=Math.max(0,Hs-t),zg(t*.45),gn.draw(te,Ch,0,0,Ai),e1();return}if(Ch+=t,zg(t),te.playing||te.phase==="won"||te.phase==="lost")for(Ta+=t;Ta>=1/60;){let s=Number(_1.some(a=>Tr.has(a)))-Number(v1.some(a=>Tr.has(a))),r=Number(M1.some(a=>Tr.has(a)))-Number(y1.some(a=>Tr.has(a)));te.tick(1/60,s,r),n+=te.worldAdvance,Ta-=1/60}te.playing&&(Td+=t,e>.031&&wd++,Td>2.1&&(wd>24&&gn.lowerResolution(),wd=0,Td=0))}gn.draw(te,Ch,xn?0:t,n,Ai),e1()}function t1(i){let e=ue("problem");e.hidden=!1,e.textContent=i;let t=document.createElement("button");t.textContent="\u91CD\u65B0\u8F7D\u5165",t.onclick=()=>location.reload(),e.append(t)}async function hS(){try{gn=Ig(Ra,Vi),gn.reset(te.x);let i=()=>{gn.resize(),c1(),te.entryZ=gn.entryZ(),ms=!0};i(),new ResizeObserver(i).observe(Vi),window.addEventListener("resize",i),Ra.addEventListener("webglcontextlost",t=>{t.preventDefault(),Xd(),t1("\u56FE\u5F62\u4E0A\u4E0B\u6587\u5DF2\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u65B0\u8F7D\u5165\u6E38\u620F\u3002")});let[e]=await Promise.all([gn.assets,gn.prepareBoss(te.boss.kind)]);Rd=e,Vd(Ai,!1),Ar=!0,Vi.dataset.phase="ready",$o.disabled=!1,$o.lastElementChild.textContent="\u5F00\u59CB\u51FA\u51FB",requestAnimationFrame(b1)}catch(i){console.error(i),t1("\u6E38\u620F\u9700\u8981\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5728 Safari \u6216 Chrome \u4E2D\u6253\u5F00\u3002")}}hS();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
